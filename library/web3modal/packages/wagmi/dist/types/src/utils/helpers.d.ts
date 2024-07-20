import type { CaipNetwork } from '@web3modal/scaffold';
import type { Chain } from '@wagmi/core/chains';
import type { Connector } from '@wagmi/core';
export declare function getCaipDefaultChain(chain?: Chain): CaipNetwork | undefined;
export declare function getWalletConnectCaipNetworks(connector?: Connector): Promise<{
    supportsAllNetworks: boolean;
    approvedCaipNetworkIds: `${string}:${string}`[];
}>;
export declare function getEmailCaipNetworks(): {
    supportsAllNetworks: boolean;
    approvedCaipNetworkIds: `${string}:${string}`[];
};
export declare function getTransport({ chain, projectId }: {
    chain: Chain;
    projectId: string;
}): import("viem").HttpTransport | import("viem").FallbackTransport<readonly [import("viem").HttpTransport, import("viem").HttpTransport]>;
