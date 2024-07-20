import { proxy, ref, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { Connection } from '@solana/web3.js';
import { OptionsController } from '@web3modal/core';
import UniversalProvider from '@walletconnect/universal-provider';
import { SolConstantsUtil } from './SolanaConstantsUtil.js';
import { SolHelpersUtil } from './SolanaHelpersUtils.js';
const state = proxy({
    provider: undefined,
    providerType: undefined,
    address: undefined,
    currentChain: undefined,
    chainId: undefined,
    caipChainId: undefined,
    connection: null,
    isConnected: false
});
export const SolStoreUtil = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    setProvider(provider) {
        if (provider) {
            state.provider = ref(provider);
        }
    },
    setProviderType(providerType) {
        state.providerType = providerType;
    },
    setAddress(address) {
        state.address = address;
    },
    setConnection(connection) {
        state.connection = ref(connection);
    },
    setCaipChainId(caipChainId) {
        state.caipChainId = caipChainId;
    },
    setIsConnected(isConnected) {
        state.isConnected = isConnected;
    },
    setError(error) {
        state.error = error;
    },
    setCurrentChain(chain) {
        state.currentChain = chain;
    },
    getCluster() {
        const chain = state.currentChain ?? SolConstantsUtil.DEFAULT_CHAIN;
        return {
            name: chain.name,
            id: chain.chainId,
            endpoint: SolHelpersUtil.detectRpcUrl(chain, OptionsController.state.projectId)
        };
    },
    getNewRequestId() {
        const curId = state.requestId ?? 0;
        state.requestId = curId + 1;
        return state.requestId;
    },
    reset() {
        state.provider = undefined;
        state.address = undefined;
        state.chainId = undefined;
        state.providerType = undefined;
        state.isConnected = false;
        state.error = undefined;
    }
};
//# sourceMappingURL=SolanaStoreUtil.js.map