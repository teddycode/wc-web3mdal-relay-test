import { createConnector } from '@wagmi/core';
import { W3mFrameProvider } from '@web3modal/wallet';
import { SwitchChainError, getAddress } from 'viem';
import { ConstantsUtil } from '@web3modal/scaffold-utils';
export function authConnector(parameters) {
    return createConnector(config => ({
        id: ConstantsUtil.AUTH_CONNECTOR_ID,
        name: 'Web3Modal Auth',
        type: 'w3mAuth',
        socials: parameters.socials,
        email: parameters.email,
        showWallets: parameters.showWallets,
        walletFeatures: parameters.walletFeatures,
        async connect(options = {}) {
            const provider = await this.getProvider();
            const { address, chainId } = await provider.connect({ chainId: options.chainId });
            await provider.getSmartAccountEnabledNetworks();
            return {
                accounts: [address],
                account: address,
                chainId,
                chain: {
                    id: chainId,
                    unsuported: false
                }
            };
        },
        async disconnect() {
            const provider = await this.getProvider();
            await provider.disconnect();
        },
        async getAccounts() {
            const provider = await this.getProvider();
            const { address } = await provider.connect();
            config.emitter.emit('change', { accounts: [address] });
            return [address];
        },
        async getProvider() {
            if (!this.provider) {
                this.provider = new W3mFrameProvider(parameters.options.projectId);
            }
            return Promise.resolve(this.provider);
        },
        async getChainId() {
            const provider = await this.getProvider();
            const { chainId } = await provider.getChainId();
            return chainId;
        },
        async isAuthorized() {
            const provider = await this.getProvider();
            const { isConnected } = await provider.isConnected();
            return isConnected;
        },
        async switchChain({ chainId }) {
            try {
                const chain = config.chains.find(c => c.id === chainId);
                if (!chain) {
                    throw new SwitchChainError(new Error('chain not found on connector.'));
                }
                const provider = await this.getProvider();
                await provider.switchNetwork(chainId);
                config.emitter.emit('change', { chainId: Number(chainId) });
                return chain;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new SwitchChainError(error);
                }
                throw error;
            }
        },
        onAccountsChanged(accounts) {
            if (accounts.length === 0) {
                this.onDisconnect();
            }
            else {
                config.emitter.emit('change', { accounts: accounts.map(getAddress) });
            }
        },
        onChainChanged(chain) {
            const chainId = Number(chain);
            config.emitter.emit('change', { chainId });
        },
        async onConnect(connectInfo) {
            const chainId = Number(connectInfo.chainId);
            const accounts = await this.getAccounts();
            config.emitter.emit('connect', { accounts, chainId });
        },
        async onDisconnect(_error) {
            const provider = await this.getProvider();
            await provider.disconnect();
        }
    }));
}
//# sourceMappingURL=AuthConnector.js.map