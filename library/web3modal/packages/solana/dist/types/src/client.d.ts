import { Connection } from '@solana/web3.js';
import { Web3ModalScaffold } from '@web3modal/scaffold';
import type { BaseWalletAdapter, StandardWalletAdapter } from '@solana/wallet-adapter-base';
import type { Commitment, ConnectionConfig } from '@solana/web3.js';
import type UniversalProvider from '@walletconnect/universal-provider';
import type { LibraryOptions, Token, CaipNetwork } from '@web3modal/scaffold';
import type { ProviderType, Chain, Provider, SolStoreUtilState } from './utils/scaffold/index.js';
export interface Web3ModalClientOptions extends Omit<LibraryOptions, 'defaultChain' | 'tokens'> {
    solanaConfig: ProviderType;
    chains: Chain[];
    connectionSettings?: Commitment | ConnectionConfig;
    defaultChain?: Chain;
    chainImages?: Record<number | string, string>;
    connectorImages?: Record<string, string>;
    tokens?: Record<number, Token>;
    wallets: BaseWalletAdapter[];
}
export type ExtendedBaseWalletAdapter = BaseWalletAdapter & {
    isAnnounced: boolean;
};
export type Web3ModalOptions = Omit<Web3ModalClientOptions, '_sdkVersion' | 'isUniversalProvider'>;
export declare class Web3Modal extends Web3ModalScaffold {
    private hasSyncedConnectedAccount;
    private WalletConnectConnector;
    private walletAdapters;
    private filteredWalletAdapters;
    private chains;
    private chain;
    connectionSettings: Commitment | ConnectionConfig;
    constructor(options: Web3ModalClientOptions);
    setAddress(address?: string): void;
    disconnect(): void;
    getAddress(): string | undefined;
    getWalletProvider(): Provider | import("./utils/scaffold/SolanaTypesUtil.js").CombinedProvider | UniversalProvider | undefined;
    getWalletProviderType(): "walletConnect" | `injected_${string}` | `announced_${string}` | undefined;
    getWalletConnection(): Connection | null;
    checkActiveProviders(standardAdapters?: StandardWalletAdapter[]): Promise<void>;
    private syncStandardAdapters;
    private syncAccount;
    private syncBalance;
    private syncRequestedNetworks;
    switchNetwork(caipNetwork: CaipNetwork): Promise<void>;
    private syncNetwork;
    subscribeProvider(callback: (newState: SolStoreUtilState) => void): () => void;
    private setWalletConnectProvider;
    private setInjectedProvider;
    private watchInjected;
}
