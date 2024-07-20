import { PublicKey } from '@solana/web3.js';
import { ConstantsUtil } from '@web3modal/common';
export const SolConstantsUtil = {
    HASH_PREFIX: 'SPL Name Service',
    ROOT_DOMAIN_ACCOUNT: new PublicKey('58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx'),
    NAME_PROGRAM_ID: new PublicKey('namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX'),
    REVERSE_LOOKUP_CLASS: new PublicKey('33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z'),
    WALLET_ID: '@w3m/solana_wallet',
    CAIP_CHAIN_ID: '@w3m/solana_caip_chain',
    ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
    ERROR_CODE_DEFAULT: 5000,
    DEFAULT_CHAIN: {
        chainId: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
        name: 'Solana',
        currency: 'SOL',
        explorerUrl: 'https://solscan.io',
        rpcUrl: `${ConstantsUtil.BLOCKCHAIN_API_RPC_URL}/v1`,
        chain: ConstantsUtil.CHAIN.SOLANA
    }
};
//# sourceMappingURL=SolanaConstantsUtil.js.map