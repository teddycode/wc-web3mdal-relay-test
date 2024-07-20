import { EthereumProvider, OPTIONAL_METHODS } from '@walletconnect/ethereum-provider';
import { connect, disconnect, signMessage, getBalance, getEnsAvatar as wagmiGetEnsAvatar, getEnsName, switchChain, watchAccount, watchConnectors, waitForTransactionReceipt, estimateGas as wagmiEstimateGas, writeContract as wagmiWriteContract, getAccount, getEnsAddress as wagmiGetEnsAddress, reconnect, getConnections, switchAccount } from '@wagmi/core';
import { mainnet } from 'viem/chains';
import { prepareTransactionRequest, sendTransaction as wagmiSendTransaction } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';
import { Web3ModalScaffold } from '@web3modal/scaffold';
import { ConstantsUtil, PresetsUtil, HelpersUtil } from '@web3modal/scaffold-utils';
import { ConstantsUtil as CommonConstantsUtil } from '@web3modal/common';
import { getCaipDefaultChain, getEmailCaipNetworks, getWalletConnectCaipNetworks } from './utils/helpers.js';
import { W3mFrameConstants, W3mFrameHelpers, W3mFrameRpcConstants } from '@web3modal/wallet';
import { NetworkUtil } from '@web3modal/common';
import { normalize } from 'viem/ens';
export class Web3Modal extends Web3ModalScaffold {
    constructor(options) {
        const { wagmiConfig, siweConfig, defaultChain, tokens, _sdkVersion, ...w3mOptions } = options;
        if (!wagmiConfig) {
            throw new Error('web3modal:constructor - wagmiConfig is undefined');
        }
        if (!w3mOptions.projectId) {
            throw new Error('web3modal:constructor - projectId is undefined');
        }
        const networkControllerClient = {
            switchCaipNetwork: async (caipNetwork) => {
                const chainId = NetworkUtil.caipNetworkIdToNumber(caipNetwork?.id);
                if (chainId) {
                    await switchChain(this.wagmiConfig, { chainId });
                }
            },
            getApprovedCaipNetworksData: async () => new Promise(resolve => {
                const connections = new Map(wagmiConfig.state.connections);
                const connection = connections.get(wagmiConfig.state.current || '');
                if (connection?.connector?.id === ConstantsUtil.AUTH_CONNECTOR_ID) {
                    resolve(getEmailCaipNetworks());
                }
                else if (connection?.connector?.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID) {
                    const connector = wagmiConfig.connectors.find(c => c.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID);
                    resolve(getWalletConnectCaipNetworks(connector));
                }
                resolve({ approvedCaipNetworkIds: undefined, supportsAllNetworks: true });
            })
        };
        const connectionControllerClient = {
            connectWalletConnect: async (onUri) => {
                const connector = wagmiConfig.connectors.find(c => c.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID);
                if (!connector) {
                    throw new Error('connectionControllerClient:getWalletConnectUri - connector is undefined');
                }
                const provider = (await connector.getProvider());
                provider.on('display_uri', data => {
                    onUri(data);
                });
                const chainId = NetworkUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                const siweParams = await siweConfig?.getMessageParams?.();
                if (siweConfig?.options?.enabled &&
                    typeof provider?.authenticate === 'function' &&
                    siweParams &&
                    Object.keys(siweParams || {}).length > 0) {
                    const { SIWEController, getDidChainId, getDidAddress } = await import('@web3modal/siwe');
                    await connector.setRequestedChainsIds(siweParams.chains);
                    let reorderedChains = siweParams.chains;
                    if (chainId) {
                        reorderedChains = [chainId, ...siweParams.chains.filter(c => c !== chainId)];
                    }
                    const result = await provider.authenticate({
                        nonce: await siweConfig.getNonce(),
                        methods: [...OPTIONAL_METHODS],
                        ...siweParams,
                        chains: reorderedChains
                    });
                    const signedCacao = result?.auths?.[0];
                    if (signedCacao) {
                        const { p, s } = signedCacao;
                        const cacaoChainId = getDidChainId(p.iss) || '';
                        const address = getDidAddress(p.iss);
                        if (address && cacaoChainId) {
                            SIWEController.setSession({
                                address,
                                chainId: parseInt(cacaoChainId, 10)
                            });
                        }
                        try {
                            const message = provider.signer.client.formatAuthMessage({
                                request: p,
                                iss: p.iss
                            });
                            await SIWEController.verifyMessage({
                                message,
                                signature: s.s,
                                cacao: signedCacao
                            });
                        }
                        catch (error) {
                            console.error('Error verifying message', error);
                            await provider.disconnect().catch(console.error);
                            await SIWEController.signOut().catch(console.error);
                            throw error;
                        }
                        this.wagmiConfig.state.current = '';
                    }
                }
                await connect(this.wagmiConfig, { connector, chainId });
            },
            connectExternal: async ({ id, provider, info }) => {
                const connector = wagmiConfig.connectors.find(c => c.id === id);
                if (!connector) {
                    throw new Error('connectionControllerClient:connectExternal - connector is undefined');
                }
                if (provider && info && connector.id === ConstantsUtil.EIP6963_CONNECTOR_ID) {
                    connector.setEip6963Wallet?.({ provider, info });
                }
                const chainId = NetworkUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                await connect(this.wagmiConfig, { connector, chainId });
            },
            reconnectExternal: async ({ id }) => {
                const connector = wagmiConfig.connectors.find(c => c.id === id);
                if (!connector) {
                    throw new Error('connectionControllerClient:connectExternal - connector is undefined');
                }
                await reconnect(this.wagmiConfig, { connectors: [connector] });
            },
            checkInstalled: ids => {
                const injectedConnector = this.getConnectors().find(c => c.type === 'INJECTED');
                if (!ids) {
                    return Boolean(window.ethereum);
                }
                if (injectedConnector) {
                    if (!window?.ethereum) {
                        return false;
                    }
                    return ids.some(id => Boolean(window.ethereum?.[String(id)]));
                }
                return false;
            },
            disconnect: async () => {
                await disconnect(this.wagmiConfig);
                if (siweConfig?.options?.signOutOnDisconnect) {
                    const { SIWEController } = await import('@web3modal/siwe');
                    await SIWEController.signOut();
                }
            },
            signMessage: async (message) => signMessage(this.wagmiConfig, { message }),
            estimateGas: async (args) => {
                try {
                    return await wagmiEstimateGas(this.wagmiConfig, {
                        account: args.address,
                        to: args.to,
                        data: args.data,
                        type: 'legacy'
                    });
                }
                catch (error) {
                    return 0n;
                }
            },
            sendTransaction: async (data) => {
                const { chainId } = getAccount(this.wagmiConfig);
                const txParams = {
                    account: data.address,
                    to: data.to,
                    value: data.value,
                    gas: data.gas,
                    gasPrice: data.gasPrice,
                    data: data.data,
                    chainId,
                    type: 'legacy'
                };
                await prepareTransactionRequest(this.wagmiConfig, txParams);
                const tx = await wagmiSendTransaction(this.wagmiConfig, txParams);
                await waitForTransactionReceipt(this.wagmiConfig, { hash: tx, timeout: 25000 });
                return tx;
            },
            writeContract: async (data) => {
                const chainId = NetworkUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                const tx = await wagmiWriteContract(wagmiConfig, {
                    chainId,
                    address: data.tokenAddress,
                    abi: data.abi,
                    functionName: data.method,
                    args: [data.receiverAddress, data.tokenAmount]
                });
                return tx;
            },
            getEnsAddress: async (value) => {
                try {
                    const chainId = NetworkUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                    let ensName = false;
                    let wcName = false;
                    if (value?.endsWith(CommonConstantsUtil.WC_NAME_SUFFIX)) {
                        wcName = await this.resolveWalletConnectName(value);
                    }
                    if (chainId === mainnet.id) {
                        ensName = await wagmiGetEnsAddress(this.wagmiConfig, {
                            name: normalize(value),
                            chainId
                        });
                    }
                    return ensName || wcName || false;
                }
                catch {
                    return false;
                }
            },
            getEnsAvatar: async (value) => {
                const chainId = NetworkUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id);
                if (chainId !== mainnet.id) {
                    return false;
                }
                const avatar = await wagmiGetEnsAvatar(this.wagmiConfig, {
                    name: normalize(value),
                    chainId
                });
                return avatar || false;
            },
            parseUnits,
            formatUnits
        };
        super({
            chain: CommonConstantsUtil.CHAIN.EVM,
            networkControllerClient,
            connectionControllerClient,
            siweControllerClient: siweConfig,
            defaultChain: getCaipDefaultChain(defaultChain),
            tokens: HelpersUtil.getCaipTokens(tokens),
            _sdkVersion: _sdkVersion ?? `html-wagmi-${ConstantsUtil.VERSION}`,
            ...w3mOptions
        });
        this.hasSyncedConnectedAccount = false;
        this.options = undefined;
        this.chain = CommonConstantsUtil.CHAIN.EVM;
        this.options = options;
        this.wagmiConfig = wagmiConfig;
        this.syncRequestedNetworks([...wagmiConfig.chains]);
        this.syncConnectors([...wagmiConfig.connectors]);
        this.initAuthConnectorListeners([...wagmiConfig.connectors]);
        watchConnectors(this.wagmiConfig, {
            onChange: connectors => this.syncConnectors(connectors)
        });
        watchAccount(this.wagmiConfig, {
            onChange: accountData => this.syncAccount({ ...accountData })
        });
        this.setEIP6963Enabled(w3mOptions.enableEIP6963 !== false);
        this.subscribeShouldUpdateToAddress((newAddress) => {
            if (newAddress) {
                const connections = getConnections(this.wagmiConfig);
                const connector = connections[0]?.connector;
                if (connector) {
                    switchAccount(this.wagmiConfig, {
                        connector
                    }).then(response => this.syncAccount({
                        address: newAddress,
                        isConnected: true,
                        addresses: response.accounts,
                        connector,
                        chainId: response.chainId
                    }));
                }
            }
        });
    }
    getState() {
        const state = super.getState();
        return {
            ...state,
            selectedNetworkId: NetworkUtil.caipNetworkIdToNumber(state.selectedNetworkId)
        };
    }
    subscribeState(callback) {
        return super.subscribeState(state => callback({
            ...state,
            selectedNetworkId: NetworkUtil.caipNetworkIdToNumber(state.selectedNetworkId)
        }));
    }
    syncRequestedNetworks(chains) {
        const requestedCaipNetworks = chains?.map(chain => ({
            id: `${ConstantsUtil.EIP155}:${chain.id}`,
            name: chain.name,
            imageId: PresetsUtil.EIP155NetworkImageIds[chain.id],
            imageUrl: this.options?.chainImages?.[chain.id]
        }));
        this.setRequestedCaipNetworks(requestedCaipNetworks ?? []);
    }
    async syncAccount({ address, isConnected, chainId, connector, addresses }) {
        this.resetAccount();
        this.syncNetwork(address, chainId, isConnected);
        const isAuthConnecor = connector?.id === ConstantsUtil.AUTH_CONNECTOR_ID;
        if (isConnected && address && chainId) {
            const caipAddress = `${ConstantsUtil.EIP155}:${chainId}:${address}`;
            this.setIsConnected(isConnected);
            this.setCaipAddress(caipAddress);
            await Promise.all([
                this.syncProfile(address, chainId),
                this.syncBalance(address, chainId),
                this.setApprovedCaipNetworksData()
            ]);
            if (connector) {
                this.syncConnectedWalletInfo(connector);
            }
            if (!isAuthConnecor && addresses?.length) {
                this.setAllAccounts(addresses.map(addr => ({ address: addr, type: 'eoa' })));
            }
            this.hasSyncedConnectedAccount = true;
        }
        else if (!isConnected && this.hasSyncedConnectedAccount) {
            this.resetWcConnection();
            this.resetNetwork();
            this.setAllAccounts([]);
        }
    }
    async syncNetwork(address, chainId, isConnected) {
        const chain = this.wagmiConfig.chains.find((c) => c.id === chainId);
        if (chain || chainId) {
            const name = chain?.name ?? chainId?.toString();
            const id = Number(chain?.id ?? chainId);
            const caipChainId = `${ConstantsUtil.EIP155}:${id}`;
            this.setCaipNetwork({
                id: caipChainId,
                name,
                imageId: PresetsUtil.EIP155NetworkImageIds[id],
                imageUrl: this.options?.chainImages?.[id],
                chain: this.chain
            });
            if (isConnected && address && chainId) {
                const caipAddress = `${ConstantsUtil.EIP155}:${id}:${address}`;
                this.setCaipAddress(caipAddress);
                if (chain?.blockExplorers?.default?.url) {
                    const url = `${chain.blockExplorers.default.url}/address/${address}`;
                    this.setAddressExplorerUrl(url);
                }
                else {
                    this.setAddressExplorerUrl(undefined);
                }
                if (this.hasSyncedConnectedAccount) {
                    await this.syncBalance(address, chainId);
                }
            }
        }
    }
    async syncWalletConnectName(address) {
        try {
            const registeredWcNames = await this.getWalletConnectName(address);
            if (registeredWcNames[0]) {
                const wcName = registeredWcNames[0];
                this.setProfileName(wcName.name);
            }
            else {
                this.setProfileName(null);
            }
        }
        catch {
            this.setProfileName(null);
        }
    }
    async syncProfile(address, chainId) {
        try {
            const { name, avatar } = await this.fetchIdentity({
                address
            });
            this.setProfileName(name);
            this.setProfileImage(avatar);
            if (!name) {
                await this.syncWalletConnectName(address);
            }
        }
        catch {
            if (chainId === mainnet.id) {
                const profileName = await getEnsName(this.wagmiConfig, { address, chainId });
                if (profileName) {
                    this.setProfileName(profileName);
                    const profileImage = await wagmiGetEnsAvatar(this.wagmiConfig, {
                        name: profileName,
                        chainId
                    });
                    if (profileImage) {
                        this.setProfileImage(profileImage);
                    }
                }
                else {
                    await this.syncWalletConnectName(address);
                    this.setProfileImage(null);
                }
            }
            else {
                await this.syncWalletConnectName(address);
                this.setProfileImage(null);
            }
        }
    }
    async syncBalance(address, chainId) {
        const chain = this.wagmiConfig.chains.find((c) => c.id === chainId);
        if (chain) {
            const balance = await getBalance(this.wagmiConfig, {
                address,
                chainId: chain.id,
                token: this.options?.tokens?.[chain.id]?.address
            });
            this.setBalance(balance.formatted, balance.symbol);
            return;
        }
        this.setBalance(undefined, undefined);
    }
    async syncConnectedWalletInfo(connector) {
        if (!connector) {
            throw Error('syncConnectedWalletInfo - connector is undefined');
        }
        if (connector.id === ConstantsUtil.WALLET_CONNECT_CONNECTOR_ID && connector.getProvider) {
            const walletConnectProvider = (await connector.getProvider());
            if (walletConnectProvider.session) {
                this.setConnectedWalletInfo({
                    ...walletConnectProvider.session.peer.metadata,
                    name: walletConnectProvider.session.peer.metadata.name,
                    icon: walletConnectProvider.session.peer.metadata.icons?.[0]
                }, this.chain);
            }
        }
        else {
            this.setConnectedWalletInfo({ name: connector.name, icon: connector.icon }, this.chain);
        }
    }
    syncConnectors(connectors) {
        const uniqueIds = new Set();
        const filteredConnectors = connectors.filter(item => !uniqueIds.has(item.id) && uniqueIds.add(item.id));
        const w3mConnectors = [];
        const coinbaseSDKId = ConstantsUtil.COINBASE_SDK_CONNECTOR_ID;
        const coinbaseConnector = filteredConnectors.find(c => c.id === coinbaseSDKId);
        filteredConnectors.forEach(({ id, name, type, icon }) => {
            const isCoinbaseRepeated = coinbaseConnector &&
                id === ConstantsUtil.CONNECTOR_RDNS_MAP[ConstantsUtil.COINBASE_CONNECTOR_ID];
            const shouldSkip = isCoinbaseRepeated || ConstantsUtil.AUTH_CONNECTOR_ID === id;
            if (!shouldSkip) {
                w3mConnectors.push({
                    id,
                    explorerId: PresetsUtil.ConnectorExplorerIds[id],
                    imageUrl: this.options?.connectorImages?.[id] ?? icon,
                    name: PresetsUtil.ConnectorNamesMap[id] ?? name,
                    imageId: PresetsUtil.ConnectorImageIds[id],
                    type: PresetsUtil.ConnectorTypesMap[type] ?? 'EXTERNAL',
                    info: {
                        rdns: id
                    },
                    chain: this.chain
                });
            }
        });
        this.setConnectors(w3mConnectors);
        this.syncAuthConnector(filteredConnectors);
    }
    async syncAuthConnector(connectors) {
        const authConnector = connectors.find(({ id }) => id === ConstantsUtil.AUTH_CONNECTOR_ID);
        if (authConnector) {
            const provider = await authConnector.getProvider();
            this.addConnector({
                id: ConstantsUtil.AUTH_CONNECTOR_ID,
                type: 'AUTH',
                name: 'Auth',
                provider,
                email: authConnector.email,
                socials: authConnector.socials,
                showWallets: authConnector.showWallets,
                chain: this.chain,
                walletFeatures: authConnector.walletFeatures
            });
        }
    }
    async initAuthConnectorListeners(connectors) {
        const authConnector = connectors.find(({ id }) => id === ConstantsUtil.AUTH_CONNECTOR_ID);
        if (authConnector) {
            await this.listenAuthConnector(authConnector);
            await this.listenModal(authConnector);
        }
    }
    async listenAuthConnector(connector) {
        if (typeof window !== 'undefined' && connector) {
            super.setLoading(true);
            const provider = (await connector.getProvider());
            const isLoginEmailUsed = provider.getLoginEmailUsed();
            super.setLoading(isLoginEmailUsed);
            if (isLoginEmailUsed) {
                this.setIsConnected(false);
            }
            provider.onRpcRequest(request => {
                if (W3mFrameHelpers.checkIfRequestExists(request)) {
                    if (!W3mFrameHelpers.checkIfRequestIsAllowed(request)) {
                        if (super.isOpen()) {
                            if (super.isTransactionStackEmpty()) {
                                return;
                            }
                            if (super.isTransactionShouldReplaceView()) {
                                super.replace('ApproveTransaction');
                            }
                            else {
                                super.redirect('ApproveTransaction');
                            }
                        }
                        else {
                            super.open({ view: 'ApproveTransaction' });
                        }
                    }
                }
                else {
                    super.open();
                    const method = W3mFrameHelpers.getRequestMethod(request);
                    console.error(W3mFrameRpcConstants.RPC_METHOD_NOT_ALLOWED_MESSAGE, { method });
                    setTimeout(() => {
                        this.showErrorMessage(W3mFrameRpcConstants.RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
                    }, 300);
                    provider.rejectRpcRequest();
                }
            });
            provider.onRpcResponse(response => {
                const responseType = W3mFrameHelpers.getResponseType(response);
                switch (responseType) {
                    case W3mFrameConstants.RPC_RESPONSE_TYPE_ERROR: {
                        const isModalOpen = super.isOpen();
                        if (isModalOpen) {
                            if (super.isTransactionStackEmpty()) {
                                super.close();
                            }
                            else {
                                super.popTransactionStack(true);
                            }
                        }
                        break;
                    }
                    case W3mFrameConstants.RPC_RESPONSE_TYPE_TX: {
                        if (super.isTransactionStackEmpty()) {
                            super.close();
                        }
                        else {
                            super.popTransactionStack();
                        }
                        break;
                    }
                    default:
                        break;
                }
            });
            provider.onNotConnected(() => {
                const isConnected = this.getIsConnectedState();
                if (!isConnected) {
                    this.setIsConnected(false);
                    super.setLoading(false);
                }
            });
            provider.onIsConnected(req => {
                this.setIsConnected(true);
                this.setSmartAccountDeployed(Boolean(req.smartAccountDeployed), this.chain);
                this.setPreferredAccountType(req.preferredAccountType, this.chain);
                super.setLoading(false);
                this.setAllAccounts(req.accounts || [
                    {
                        address: req.address,
                        type: (req.preferredAccountType || 'eoa')
                    }
                ]);
            });
            provider.onGetSmartAccountEnabledNetworks(networks => {
                this.setSmartAccountEnabledNetworks(networks);
            });
            provider.onSetPreferredAccount(({ address, type }) => {
                if (!address) {
                    return;
                }
                this.setPreferredAccountType(type, this.chain);
                this.syncAccount({
                    address: address,
                    isConnected: true,
                    chainId: NetworkUtil.caipNetworkIdToNumber(this.getCaipNetwork()?.id),
                    connector
                });
            });
        }
    }
    async listenModal(connector) {
        const provider = (await connector.getProvider());
        this.subscribeState(val => {
            if (!val.open) {
                provider.rejectRpcRequest();
            }
        });
    }
}
//# sourceMappingURL=client.js.map