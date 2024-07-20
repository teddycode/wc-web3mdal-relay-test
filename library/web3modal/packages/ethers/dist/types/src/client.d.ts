import type { LibraryOptions, PublicStateControllerState, Token } from '@web3modal/scaffold';
import { Web3ModalScaffold } from '@web3modal/scaffold';
import type { Web3ModalSIWEClient } from '@web3modal/siwe';
import type { ProviderType, Chain, EthersStoreUtilState } from '@web3modal/scaffold-utils/ethers';
import type { Eip1193Provider } from 'ethers';
export interface Web3ModalClientOptions extends Omit<LibraryOptions, 'defaultChain' | 'tokens'> {
    ethersConfig: ProviderType;
    chains: Chain[];
    siweConfig?: Web3ModalSIWEClient;
    defaultChain?: Chain;
    chainImages?: Record<number, string>;
    connectorImages?: Record<string, string>;
    tokens?: Record<number, Token>;
}
export type Web3ModalOptions = Omit<Web3ModalClientOptions, '_sdkVersion' | 'isUniversalProvider'>;
declare global {
    interface Window {
        ethereum?: Record<string, unknown>;
    }
}
interface Web3ModalState extends PublicStateControllerState {
    selectedNetworkId: number | undefined;
}
export declare class Web3Modal extends Web3ModalScaffold {
    private hasSyncedConnectedAccount;
    private EIP6963Providers;
    private walletConnectProvider?;
    private walletConnectProviderInitPromise?;
    private projectId;
    private chains;
    private chain;
    private metadata?;
    private options;
    private authProvider?;
    constructor(options: Web3ModalClientOptions);
    getState(): {
        selectedNetworkId: number | undefined;
        loading: boolean;
        open: boolean;
        activeChain?: string | undefined;
    };
    subscribeState(callback: (state: Web3ModalState) => void): () => void;
    setAddress(address?: string): void;
    getAddress(): string | undefined;
    getError(): unknown;
    getChainId(): number | undefined;
    getStatus(): import("@web3modal/scaffold-utils/ethers").Status;
    getIsConnected(): boolean;
    getWalletProvider(): Eip1193Provider | undefined;
    getWalletProviderType(): "walletConnect" | "injected" | "coinbaseWallet" | "eip6963" | "w3mAuth" | "coinbaseWalletSDK" | undefined;
    subscribeProvider(callback: (newState: EthersStoreUtilState) => void): () => void;
    disconnect(): Promise<void>;
    private createProvider;
    private initWalletConnectProvider;
    private disconnectProvider;
    private getWalletConnectProvider;
    private syncRequestedNetworks;
    private checkActiveWalletConnectProvider;
    private checkActiveInjectedProvider;
    private checkActiveCoinbaseProvider;
    private checkActive6963Provider;
    private setWalletConnectProvider;
    private setInjectedProvider;
    private setEIP6963Provider;
    private setCoinbaseProvider;
    private setAuthProvider;
    private watchWalletConnect;
    private watchInjected;
    private watchEIP6963;
    private watchCoinbase;
    private watchAuth;
    private watchModal;
    private syncAccount;
    private syncNetwork;
    private syncWalletConnectName;
    private syncProfile;
    private syncBalance;
    private syncConnectedWalletInfo;
    switchNetwork(chainId: number): Promise<void>;
    private syncConnectors;
    private syncAuthConnector;
    private eip6963EventHandler;
    private listenConnectors;
}
export {};
