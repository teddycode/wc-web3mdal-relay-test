import { CoreHelperUtil } from '@web3modal/scaffold';
import { ConstantsUtil, PresetsUtil } from '@web3modal/scaffold-utils';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { fallback, http } from 'viem';
export function getCaipDefaultChain(chain) {
    if (!chain) {
        return undefined;
    }
    return {
        id: `${ConstantsUtil.EIP155}:${chain.id}`,
        name: chain.name,
        imageId: PresetsUtil.EIP155NetworkImageIds[chain.id]
    };
}
export async function getWalletConnectCaipNetworks(connector) {
    if (!connector) {
        throw new Error('networkControllerClient:getApprovedCaipNetworks - connector is undefined');
    }
    const provider = (await connector?.getProvider());
    const ns = provider?.signer?.session?.namespaces;
    const nsMethods = ns?.[ConstantsUtil.EIP155]?.methods;
    const nsChains = ns?.[ConstantsUtil.EIP155]?.chains;
    return {
        supportsAllNetworks: Boolean(nsMethods?.includes(ConstantsUtil.ADD_CHAIN_METHOD)),
        approvedCaipNetworkIds: nsChains
    };
}
export function getEmailCaipNetworks() {
    return {
        supportsAllNetworks: false,
        approvedCaipNetworkIds: PresetsUtil.WalletConnectRpcChainIds.map(id => `${ConstantsUtil.EIP155}:${id}`)
    };
}
export function getTransport({ chain, projectId }) {
    const RPC_URL = CoreHelperUtil.getBlockchainApiUrl();
    const chainDefaultUrl = chain.rpcUrls[0]?.http?.[0];
    if (!PresetsUtil.WalletConnectRpcChainIds.includes(chain.id)) {
        return http(chainDefaultUrl);
    }
    return fallback([
        http(`${RPC_URL}/v1/?chainId=${ConstantsUtil.EIP155}:${chain.id}&projectId=${projectId}`),
        http(chainDefaultUrl)
    ]);
}
//# sourceMappingURL=helpers.js.map