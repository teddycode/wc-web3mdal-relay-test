import { Connection } from '@solana/web3.js';
import UniversalProvider from '@walletconnect/universal-provider';
import type { Chain, CombinedProvider, Provider } from './SolanaTypesUtil.js';
export interface SolStoreUtilState {
    provider?: Provider | CombinedProvider | UniversalProvider;
    providerType?: 'walletConnect' | `injected_${string}` | `announced_${string}`;
    address?: string;
    chainId?: string;
    caipChainId?: string;
    currentChain?: Chain;
    requestId?: number;
    error?: unknown;
    connection: Connection | null;
    isConnected: boolean;
}
export declare const SolStoreUtil: {
    state: SolStoreUtilState;
    subscribeKey<K extends keyof SolStoreUtilState>(key: K, callback: (value: SolStoreUtilState[K]) => void): () => void;
    subscribe(callback: (newState: SolStoreUtilState) => void): () => void;
    setProvider(provider: SolStoreUtilState['provider']): void;
    setProviderType(providerType: SolStoreUtilState['providerType']): void;
    setAddress(address: string): void;
    setConnection(connection: Connection): void;
    setCaipChainId(caipChainId: SolStoreUtilState['caipChainId']): void;
    setIsConnected(isConnected: SolStoreUtilState['isConnected']): void;
    setError(error: SolStoreUtilState['error']): void;
    setCurrentChain(chain: Chain): void;
    getCluster(): {
        name: string;
        id: string;
        endpoint: string;
    };
    getNewRequestId(): number;
    reset(): void;
};
