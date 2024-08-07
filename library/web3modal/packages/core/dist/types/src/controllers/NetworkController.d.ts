import type { CaipNetwork, CaipNetworkId } from '../utils/TypeUtil.js';
import { type Chain } from '@web3modal/common';
export interface NetworkControllerClient {
    switchCaipNetwork: (network: NetworkControllerState['caipNetwork']) => Promise<void>;
    getApprovedCaipNetworksData: () => Promise<{
        approvedCaipNetworkIds: NetworkControllerState['approvedCaipNetworkIds'];
        supportsAllNetworks: NetworkControllerState['supportsAllNetworks'];
    }>;
}
export interface NetworkControllerState {
    supportsAllNetworks: boolean;
    isDefaultCaipNetwork: boolean;
    isUnsupportedChain?: boolean;
    _client?: NetworkControllerClient;
    caipNetwork?: CaipNetwork;
    requestedCaipNetworks?: CaipNetwork[];
    approvedCaipNetworkIds?: CaipNetworkId[];
    allowUnsupportedChain?: boolean;
    smartAccountEnabledNetworks?: number[];
}
export declare const NetworkController: {
    state: NetworkControllerState;
    replaceState(newState: NetworkControllerState): void;
    subscribeKey<K extends keyof NetworkControllerState>(property: K, callback: (val: NetworkControllerState[K]) => void): () => void;
    _getClient(): NetworkControllerClient;
    initializeDefaultNetwork(): void;
    setCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork']): void;
    setDefaultCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork'], chain?: Chain): void;
    setRequestedCaipNetworks(requestedNetworks: NetworkControllerState['requestedCaipNetworks'], chain?: Chain): void;
    setAllowUnsupportedChain(allowUnsupportedChain: NetworkControllerState['allowUnsupportedChain'], chain?: Chain): void;
    setSmartAccountEnabledNetworks(smartAccountEnabledNetworks: NetworkControllerState['smartAccountEnabledNetworks'], chain?: Chain): void;
    getRequestedCaipNetworks(chainToFilter?: Chain): CaipNetwork[];
    switchActiveNetwork(network: NetworkControllerState['caipNetwork']): Promise<void>;
    getApprovedCaipNetworkIds(chainToFilter?: Chain): `${string}:${string}`[] | undefined;
    setApprovedCaipNetworksData(_chain?: Chain): Promise<void>;
    checkIfSupportedNetwork(): boolean;
    checkIfSmartAccountEnabled(): boolean;
    resetNetwork(): void;
    getSupportsAllNetworks(): boolean | undefined;
    showUnsupportedChainUI(): void;
};
