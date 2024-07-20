import { BlockchainApiController, ConnectionController, ConnectorController, CoreHelperUtil, EventsController, ModalController, NetworkController, OptionsController, PublicStateController, ThemeController, SnackController, RouterController, EnsController, ChainController, AccountController } from '@web3modal/core';
import { setColorTheme, setThemeVariables } from '@web3modal/ui';
import { ConstantsUtil } from '@web3modal/common';
let isInitialized = false;
export class Web3ModalScaffold {
    constructor(options) {
        this.initPromise = undefined;
        this.setIsConnected = (isConnected, chain) => {
            AccountController.setIsConnected(isConnected, chain);
        };
        this.getIsConnectedState = () => AccountController.state.isConnected;
        this.setAllAccounts = (addresses = []) => {
            AccountController.setAllAccounts(addresses);
            OptionsController.setHasMultipleAddresses(addresses?.length > 1);
        };
        this.addAddressLabel = (address, label) => {
            AccountController.addAddressLabel(address, label);
        };
        this.removeAddressLabel = address => {
            AccountController.removeAddressLabel(address);
        };
        this.setCaipAddress = (caipAddress, chain) => {
            AccountController.setCaipAddress(caipAddress, chain);
        };
        this.setBalance = (balance, balanceSymbol, chain) => {
            AccountController.setBalance(balance, balanceSymbol, chain);
        };
        this.setProfileName = (profileName, chain) => {
            AccountController.setProfileName(profileName, chain);
        };
        this.setProfileImage = (profileImage, chain) => {
            AccountController.setProfileImage(profileImage, chain);
        };
        this.resetAccount = chain => {
            AccountController.resetAccount(chain);
        };
        this.setCaipNetwork = caipNetwork => {
            NetworkController.setCaipNetwork(caipNetwork);
        };
        this.getCaipNetwork = () => NetworkController.state.caipNetwork;
        this.setRequestedCaipNetworks = (requestedCaipNetworks, chain) => {
            NetworkController.setRequestedCaipNetworks(requestedCaipNetworks, chain);
        };
        this.getApprovedCaipNetworkIds = () => NetworkController.getApprovedCaipNetworkIds();
        this.setApprovedCaipNetworksData = () => NetworkController.setApprovedCaipNetworksData();
        this.resetNetwork = () => {
            NetworkController.resetNetwork();
        };
        this.setConnectors = connectors => {
            ConnectorController.setConnectors(connectors);
        };
        this.addConnector = connector => {
            ConnectorController.addConnector(connector);
        };
        this.getConnectors = () => ConnectorController.getConnectors();
        this.resetWcConnection = () => {
            ConnectionController.resetWcConnection();
        };
        this.fetchIdentity = request => BlockchainApiController.fetchIdentity(request);
        this.setAddressExplorerUrl = (addressExplorerUrl, chain) => {
            AccountController.setAddressExplorerUrl(addressExplorerUrl, chain);
        };
        this.setSmartAccountDeployed = (isDeployed, chain) => {
            AccountController.setSmartAccountDeployed(isDeployed, chain);
        };
        this.setConnectedWalletInfo = (connectedWalletInfo, chain) => {
            AccountController.setConnectedWalletInfo(connectedWalletInfo, chain);
        };
        this.setSmartAccountEnabledNetworks = (smartAccountEnabledNetworks, chain) => {
            NetworkController.setSmartAccountEnabledNetworks(smartAccountEnabledNetworks, chain);
        };
        this.setPreferredAccountType = (preferredAccountType, chain) => {
            AccountController.setPreferredAccountType(preferredAccountType, chain);
        };
        this.getWalletConnectName = address => EnsController.getNamesForAddress(address);
        this.resolveWalletConnectName = async (name) => {
            const trimmedName = name.replace(ConstantsUtil.WC_NAME_SUFFIX, '');
            const wcNameAddress = await EnsController.resolveName(trimmedName);
            const networkNameAddresses = Object.values(wcNameAddress?.addresses) || [];
            return networkNameAddresses[0]?.address || false;
        };
        this.setEIP6963Enabled = enabled => {
            OptionsController.setEIP6963Enabled(enabled);
        };
        this.initControllers(options);
        this.initOrContinue();
    }
    async open(options) {
        await this.initOrContinue();
        ModalController.open(options);
    }
    async close() {
        await this.initOrContinue();
        ModalController.close();
    }
    setLoading(loading) {
        ModalController.setLoading(loading);
    }
    getThemeMode() {
        return ThemeController.state.themeMode;
    }
    getThemeVariables() {
        return ThemeController.state.themeVariables;
    }
    setThemeMode(themeMode) {
        ThemeController.setThemeMode(themeMode);
        setColorTheme(ThemeController.state.themeMode);
    }
    setThemeVariables(themeVariables) {
        ThemeController.setThemeVariables(themeVariables);
        setThemeVariables(ThemeController.state.themeVariables);
    }
    subscribeTheme(callback) {
        return ThemeController.subscribe(callback);
    }
    getWalletInfo() {
        return AccountController.state.connectedWalletInfo;
    }
    subscribeWalletInfo(callback) {
        return AccountController.subscribeKey('connectedWalletInfo', callback);
    }
    subscribeShouldUpdateToAddress(callback) {
        AccountController.subscribeKey('shouldUpdateToAddress', callback);
    }
    subscribeCaipNetworkChange(callback) {
        NetworkController.subscribeKey('caipNetwork', callback);
    }
    getState() {
        return PublicStateController.state;
    }
    subscribeState(callback) {
        return PublicStateController.subscribe(callback);
    }
    showErrorMessage(message) {
        SnackController.showError(message);
    }
    showSuccessMessage(message) {
        SnackController.showSuccess(message);
    }
    getEvent() {
        return { ...EventsController.state };
    }
    subscribeEvents(callback) {
        return EventsController.subscribe(callback);
    }
    replace(route) {
        RouterController.replace(route);
    }
    redirect(route) {
        RouterController.push(route);
    }
    popTransactionStack(cancel) {
        RouterController.popTransactionStack(cancel);
    }
    isOpen() {
        return ModalController.state.open;
    }
    isTransactionStackEmpty() {
        return RouterController.state.transactionStack.length === 0;
    }
    isTransactionShouldReplaceView() {
        return RouterController.state.transactionStack[RouterController.state.transactionStack.length - 1]?.replace;
    }
    async initControllers(options) {
        ChainController.initialize([
            {
                networkControllerClient: options.networkControllerClient,
                connectionControllerClient: options.connectionControllerClient,
                chain: options.chain
            }
        ]);
        NetworkController.setDefaultCaipNetwork(options.defaultChain, options.chain);
        OptionsController.setProjectId(options.projectId);
        OptionsController.setAllWallets(options.allWallets);
        OptionsController.setIncludeWalletIds(options.includeWalletIds);
        OptionsController.setExcludeWalletIds(options.excludeWalletIds);
        OptionsController.setFeaturedWalletIds(options.featuredWalletIds);
        OptionsController.setTokens(options.tokens);
        OptionsController.setTermsConditionsUrl(options.termsConditionsUrl);
        OptionsController.setPrivacyPolicyUrl(options.privacyPolicyUrl);
        OptionsController.setEnableAnalytics(options.enableAnalytics);
        OptionsController.setCustomWallets(options.customWallets);
        OptionsController.setIsUniversalProvider(options.isUniversalProvider);
        OptionsController.setSdkVersion(options._sdkVersion);
        OptionsController.setOnrampEnabled(options.enableOnramp !== false);
        if (options.metadata) {
            OptionsController.setMetadata(options.metadata);
        }
        if (options.themeMode) {
            ThemeController.setThemeMode(options.themeMode);
        }
        if (options.themeVariables) {
            ThemeController.setThemeVariables(options.themeVariables);
        }
        if (options.disableAppend) {
            OptionsController.setDisableAppend(Boolean(options.disableAppend));
        }
        if (options.allowUnsupportedChain) {
            NetworkController.setAllowUnsupportedChain(options.allowUnsupportedChain);
        }
        if (options.siweControllerClient) {
            const { SIWEController } = await import('@web3modal/siwe');
            SIWEController.setSIWEClient(options.siweControllerClient);
        }
    }
    async initOrContinue() {
        if (!this.initPromise && !isInitialized && CoreHelperUtil.isClient()) {
            isInitialized = true;
            this.initPromise = new Promise(async (resolve) => {
                await Promise.all([import('@web3modal/ui'), import('@web3modal/scaffold-ui/w3m-modal')]);
                const modal = document.createElement('w3m-modal');
                if (!OptionsController.state.disableAppend) {
                    document.body.insertAdjacentElement('beforeend', modal);
                }
                resolve();
            });
        }
        return this.initPromise;
    }
}
//# sourceMappingURL=client.js.map