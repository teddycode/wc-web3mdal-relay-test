import type { CaipNetwork } from '@web3modal/core';
import type { Chain, Provider } from './SolanaTypesUtil.js';
import type { ExtendedBaseWalletAdapter } from '../../client.js';
export declare const SolHelpersUtil: {
    detectRpcUrl(chain: Chain, projectId: string): string;
    getChain(chains: Chain[], chainId: string | null): Chain;
    getChainFromCaip(chains: Chain[], chainCaipId?: string | undefined | null): {
        id: string;
        imageId: string | undefined;
        chain: import("@web3modal/common").Chain;
        rpcUrl: string;
        explorerUrl: string;
        currency: string;
        name: string;
        chainId: string;
    };
    getCaipDefaultChain(chain?: Chain): CaipNetwork | undefined;
    hexStringToNumber(value: string): number;
    getAddress(provider: Provider): Promise<string | undefined>;
    addSolanaChain(provider: Provider, chain: Chain): Promise<void>;
    getStorageInjectedId: (adapter: ExtendedBaseWalletAdapter) => "walletConnect" | `injected_${string}` | `announced_${string}`;
};
