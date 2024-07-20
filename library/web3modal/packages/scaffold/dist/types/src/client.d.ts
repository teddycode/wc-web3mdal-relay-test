import type { ConnectionControllerClient, EventsControllerState, NetworkControllerClient, NetworkControllerState, OptionsControllerState, PublicStateControllerState, ThemeControllerState, ThemeMode, ThemeVariables, ModalControllerState, ConnectedWalletInfo, RouterControllerState, CaipNetwork } from '@web3modal/core';
import { BlockchainApiController, ConnectionController, ConnectorController, NetworkController, OptionsController, EnsController, AccountController } from '@web3modal/core';
import type { SIWEControllerClient } from '@web3modal/siwe';
import { type Chain } from '@web3modal/common';
export interface LibraryOptions {
    projectId: OptionsControllerState['projectId'];
    themeMode?: ThemeMode;
    themeVariables?: ThemeVariables;
    allWallets?: OptionsControllerState['allWallets'];
    includeWalletIds?: OptionsControllerState['includeWalletIds'];
    excludeWalletIds?: OptionsControllerState['excludeWalletIds'];
    featuredWalletIds?: OptionsControllerState['featuredWalletIds'];
    defaultChain?: NetworkControllerState['caipNetwork'];
    tokens?: OptionsControllerState['tokens'];
    termsConditionsUrl?: OptionsControllerState['termsConditionsUrl'];
    privacyPolicyUrl?: OptionsControllerState['privacyPolicyUrl'];
    customWallets?: OptionsControllerState['customWallets'];
    isUniversalProvider?: OptionsControllerState['isUniversalProvider'];
    enableAnalytics?: OptionsControllerState['enableAnalytics'];
    metadata?: OptionsControllerState['metadata'];
    enableOnramp?: OptionsControllerState['enableOnramp'];
    disableAppend?: OptionsControllerState['disableAppend'];
    allowUnsupportedChain?: NetworkControllerState['allowUnsupportedChain'];
    _sdkVersion: OptionsControllerState['sdkVersion'];
    enableEIP6963?: OptionsControllerState['enableEIP6963'];
}
export interface ScaffoldOptions extends LibraryOptions {
    chain: Chain;
    networkControllerClient: NetworkControllerClient;
    connectionControllerClient: ConnectionControllerClient;
    siweControllerClient?: SIWEControllerClient;
}
export interface OpenOptions {
    view: 'Account' | 'Connect' | 'Networks' | 'ApproveTransaction' | 'OnRampProviders';
}
export declare class Web3ModalScaffold {
    private initPromise?;
    constructor(options: ScaffoldOptions);
    open(options?: OpenOptions): Promise<void>;
    close(): Promise<void>;
    setLoading(loading: ModalControllerState['loading']): void;
    getThemeMode(): ThemeMode;
    getThemeVariables(): ThemeVariables;
    setThemeMode(themeMode: ThemeControllerState['themeMode']): void;
    setThemeVariables(themeVariables: ThemeControllerState['themeVariables']): void;
    subscribeTheme(callback: (newState: ThemeControllerState) => void): () => void;
    getWalletInfo(): ConnectedWalletInfo;
    subscribeWalletInfo(callback: (newState: ConnectedWalletInfo) => void): () => void;
    subscribeShouldUpdateToAddress(callback: (newState?: string) => void): void;
    subscribeCaipNetworkChange(callback: (newState?: CaipNetwork) => void): void;
    getState(): PublicStateControllerState;
    subscribeState(callback: (newState: PublicStateControllerState) => void): () => void;
    showErrorMessage(message: string): void;
    showSuccessMessage(message: string): void;
    getEvent(): {
        timestamp: number;
        data: import("@web3modal/core").Event;
    };
    subscribeEvents(callback: (newEvent: EventsControllerState) => void): () => void;
    protected replace(route: RouterControllerState['view']): void;
    protected redirect(route: RouterControllerState['view']): void;
    protected popTransactionStack(cancel?: boolean): void;
    protected isOpen(): boolean;
    protected isTransactionStackEmpty(): boolean;
    protected isTransactionShouldReplaceView(): boolean | undefined;
    protected setIsConnected: (typeof AccountController)['setIsConnected'];
    protected getIsConnectedState: () => boolean;
    protected setAllAccounts: (typeof AccountController)['setAllAccounts'];
    protected addAddressLabel: (typeof AccountController)['addAddressLabel'];
    protected removeAddressLabel: (typeof AccountController)['removeAddressLabel'];
    protected setCaipAddress: (typeof AccountController)['setCaipAddress'];
    protected setBalance: (typeof AccountController)['setBalance'];
    protected setProfileName: (typeof AccountController)['setProfileName'];
    protected setProfileImage: (typeof AccountController)['setProfileImage'];
    protected resetAccount: (typeof AccountController)['resetAccount'];
    protected setCaipNetwork: (typeof NetworkController)['setCaipNetwork'];
    protected getCaipNetwork: () => CaipNetwork | undefined;
    protected setRequestedCaipNetworks: (typeof NetworkController)['setRequestedCaipNetworks'];
    protected getApprovedCaipNetworkIds: (typeof NetworkController)['getApprovedCaipNetworkIds'];
    protected setApprovedCaipNetworksData: (typeof NetworkController)['setApprovedCaipNetworksData'];
    protected resetNetwork: (typeof NetworkController)['resetNetwork'];
    protected setConnectors: (typeof ConnectorController)['setConnectors'];
    protected addConnector: (typeof ConnectorController)['addConnector'];
    protected getConnectors: (typeof ConnectorController)['getConnectors'];
    protected resetWcConnection: (typeof ConnectionController)['resetWcConnection'];
    protected fetchIdentity: (typeof BlockchainApiController)['fetchIdentity'];
    protected setAddressExplorerUrl: (typeof AccountController)['setAddressExplorerUrl'];
    protected setSmartAccountDeployed: (typeof AccountController)['setSmartAccountDeployed'];
    protected setConnectedWalletInfo: (typeof AccountController)['setConnectedWalletInfo'];
    protected setSmartAccountEnabledNetworks: (typeof NetworkController)['setSmartAccountEnabledNetworks'];
    protected setPreferredAccountType: (typeof AccountController)['setPreferredAccountType'];
    protected getWalletConnectName: (typeof EnsController)['getNamesForAddress'];
    protected resolveWalletConnectName: (name: string) => Promise<string | false>;
    protected setEIP6963Enabled: (typeof OptionsController)['setEIP6963Enabled'];
    private initControllers;
    private initOrContinue;
}
