import { PublicKey } from '@solana/web3.js';
export declare const SolConstantsUtil: {
    HASH_PREFIX: string;
    ROOT_DOMAIN_ACCOUNT: PublicKey;
    NAME_PROGRAM_ID: PublicKey;
    REVERSE_LOOKUP_CLASS: PublicKey;
    WALLET_ID: string;
    CAIP_CHAIN_ID: string;
    ERROR_CODE_UNRECOGNIZED_CHAIN_ID: number;
    ERROR_CODE_DEFAULT: number;
    DEFAULT_CHAIN: {
        chainId: string;
        name: string;
        currency: string;
        explorerUrl: string;
        rpcUrl: string;
        chain: import("@web3modal/common").Chain;
    };
};
