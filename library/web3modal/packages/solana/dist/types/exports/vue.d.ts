/// <reference types="node" />
/// <reference types="@solana/web3.js" />
import type { Web3ModalOptions } from '../src/client.js';
import { Web3Modal } from '../src/client.js';
export type { Web3ModalOptions } from '../src/client.js';
export declare function createWeb3Modal(options: Web3ModalOptions): Web3Modal;
export declare function useWeb3ModalProvider(): {
    walletProvider: import("vue").Ref<{
        isConnected: () => boolean;
        publicKey: {
            equals: (publicKey: import("@solana/web3.js").PublicKey) => boolean;
            toBase58: () => string;
            toJSON: () => string;
            toBytes: () => Uint8Array;
            toBuffer: () => Buffer;
            toString: () => string;
            readonly [Symbol.toStringTag]: string;
            encode: () => Buffer;
        };
        name: string;
        on: <T>(event: string, listener: (data: T) => void) => void;
        wallet: any;
        removeListener: <T_1>(event: string, listener: (data: T_1) => void) => void;
        emit: (event: string) => void;
        connect: () => Promise<void>;
        disconnect: () => Promise<void>;
        request: <T_2>(config: {
            method: string;
            params?: object | undefined;
        }) => Promise<T_2>;
        signAllTransactions: (transactions: import("@solana/web3.js").Transaction[]) => Promise<import("@solana/web3.js").Transaction[]>;
        signAndSendAllTransactions: (transactions: import("@solana/web3.js").Transaction[]) => Promise<string[]>;
        signAndSendTransaction: (transaction: import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction, signers: import("@solana/web3.js").Signer[], confirmOptions?: import("@solana/web3.js").ConfirmOptions | undefined) => Promise<string>;
        signMessage: (message: Uint8Array) => Promise<Uint8Array> | Promise<{
            signature: Uint8Array;
        }>;
        signTransaction: (transaction: import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction) => Promise<{
            signatures: {
                signature: Uint8Array;
            }[];
        }>;
        sendTransaction: (transaction: import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction, connection: import("@solana/web3.js").Connection, options?: import("@solana/wallet-adapter-base").SendTransactionOptions | undefined) => Promise<string>;
        sendAndConfirm: (transaction: import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction, connection: import("@solana/web3.js").Connection, options?: import("@solana/wallet-adapter-base").SendTransactionOptions | undefined) => Promise<string>;
    }>;
    walletProviderType: import("vue").Ref<"walletConnect" | `injected_${string}` | `announced_${string}` | undefined>;
    connection: import("vue").Ref<{
        readonly commitment: import("@solana/web3.js").Commitment | undefined;
        readonly rpcEndpoint: string;
        getBalanceAndContext: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBalanceConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<number>>;
        getBalance: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBalanceConfig | undefined) => Promise<number>;
        getBlockTime: (slot: number) => Promise<number | null>;
        getMinimumLedgerSlot: () => Promise<number>;
        getFirstAvailableBlock: () => Promise<number>;
        getSupply: (config?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetSupplyConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").Supply>>;
        getTokenSupply: (tokenMintAddress: import("@solana/web3.js").PublicKey, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").TokenAmount>>;
        getTokenAccountBalance: (tokenAddress: import("@solana/web3.js").PublicKey, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").TokenAmount>>;
        getTokenAccountsByOwner: (ownerAddress: import("@solana/web3.js").PublicKey, filter: import("@solana/web3.js").TokenAccountsFilter, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetTokenAccountsByOwnerConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").GetProgramAccountsResponse>>;
        getParsedTokenAccountsByOwner: (ownerAddress: import("@solana/web3.js").PublicKey, filter: import("@solana/web3.js").TokenAccountsFilter, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<{
            pubkey: import("@solana/web3.js").PublicKey;
            account: import("@solana/web3.js").AccountInfo<import("@solana/web3.js").ParsedAccountData>;
        }[]>>;
        getLargestAccounts: (config?: import("@solana/web3.js").GetLargestAccountsConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AccountBalancePair[]>>;
        getTokenLargestAccounts: (mintAddress: import("@solana/web3.js").PublicKey, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").TokenAccountBalancePair[]>>;
        getAccountInfoAndContext: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AccountInfo<Buffer> | null>>;
        getParsedAccountInfo: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AccountInfo<Buffer | import("@solana/web3.js").ParsedAccountData> | null>>;
        getAccountInfo: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").AccountInfo<Buffer> | null>;
        getMultipleParsedAccounts: (publicKeys: import("@solana/web3.js").PublicKey[], rawConfig?: import("@solana/web3.js").GetMultipleAccountsConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<(import("@solana/web3.js").AccountInfo<Buffer | import("@solana/web3.js").ParsedAccountData> | null)[]>>;
        getMultipleAccountsInfoAndContext: (publicKeys: import("@solana/web3.js").PublicKey[], commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetMultipleAccountsConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<(import("@solana/web3.js").AccountInfo<Buffer> | null)[]>>;
        getMultipleAccountsInfo: (publicKeys: import("@solana/web3.js").PublicKey[], commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetMultipleAccountsConfig | undefined) => Promise<(import("@solana/web3.js").AccountInfo<Buffer> | null)[]>;
        getStakeActivation: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetStakeActivationConfig | undefined, epoch?: number | undefined) => Promise<import("@solana/web3.js").StakeActivationData>;
        getProgramAccounts: {
            (programId: import("@solana/web3.js").PublicKey, configOrCommitment: import("@solana/web3.js").GetProgramAccountsConfig & Readonly<{
                withContext: true;
            }>): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").GetProgramAccountsResponse>>;
            (programId: import("@solana/web3.js").PublicKey, configOrCommitment?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetProgramAccountsConfig | undefined): Promise<import("@solana/web3.js").GetProgramAccountsResponse>;
        };
        getParsedProgramAccounts: (programId: import("@solana/web3.js").PublicKey, configOrCommitment?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetParsedProgramAccountsConfig | undefined) => Promise<{
            pubkey: import("@solana/web3.js").PublicKey;
            account: import("@solana/web3.js").AccountInfo<Buffer | import("@solana/web3.js").ParsedAccountData>;
        }[]>;
        confirmTransaction: {
            (strategy: import("@solana/web3.js").TransactionConfirmationStrategy, commitment?: import("@solana/web3.js").Commitment | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>>;
            (strategy: string, commitment?: import("@solana/web3.js").Commitment | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>>;
        };
        getClusterNodes: () => Promise<import("@solana/web3.js").ContactInfo[]>;
        getVoteAccounts: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").VoteAccountStatus>;
        getSlot: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetSlotConfig | undefined) => Promise<number>;
        getSlotLeader: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetSlotLeaderConfig | undefined) => Promise<string>;
        getSlotLeaders: (startSlot: number, limit: number) => Promise<import("@solana/web3.js").PublicKey[]>;
        getSignatureStatus: (signature: string, config?: import("@solana/web3.js").SignatureStatusConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureStatus | null>>;
        getSignatureStatuses: (signatures: string[], config?: import("@solana/web3.js").SignatureStatusConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<(import("@solana/web3.js").SignatureStatus | null)[]>>;
        getTransactionCount: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetTransactionCountConfig | undefined) => Promise<number>;
        getTotalSupply: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<number>;
        getInflationGovernor: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").InflationGovernor>;
        getInflationReward: (addresses: import("@solana/web3.js").PublicKey[], epoch?: number | undefined, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetInflationRewardConfig | undefined) => Promise<(import("@solana/web3.js").InflationReward | null)[]>;
        getInflationRate: () => Promise<import("@solana/web3.js").InflationRate>;
        getEpochInfo: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetEpochInfoConfig | undefined) => Promise<import("@solana/web3.js").EpochInfo>;
        getEpochSchedule: () => Promise<import("@solana/web3.js").EpochSchedule>;
        getLeaderSchedule: () => Promise<import("@solana/web3.js").LeaderSchedule>;
        getMinimumBalanceForRentExemption: (dataLength: number, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<number>;
        getRecentBlockhashAndContext: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<{
            blockhash: string;
            feeCalculator: import("@solana/web3.js").FeeCalculator;
        }>>;
        getRecentPerformanceSamples: (limit?: number | undefined) => Promise<import("@solana/web3.js").PerfSample[]>;
        getFeeCalculatorForBlockhash: (blockhash: string, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").FeeCalculator | null>>;
        getFeeForMessage: (message: import("@solana/web3.js").VersionedMessage, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<number | null>>;
        getRecentPrioritizationFees: (config?: import("@solana/web3.js").GetRecentPrioritizationFeesConfig | undefined) => Promise<import("@solana/web3.js").RecentPrioritizationFees[]>;
        getRecentBlockhash: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<{
            blockhash: string;
            feeCalculator: import("@solana/web3.js").FeeCalculator;
        }>;
        getLatestBlockhash: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetLatestBlockhashConfig | undefined) => Promise<Readonly<{
            blockhash: string;
            lastValidBlockHeight: number;
        }>>;
        getLatestBlockhashAndContext: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetLatestBlockhashConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<Readonly<{
            blockhash: string;
            lastValidBlockHeight: number;
        }>>>;
        isBlockhashValid: (blockhash: string, rawConfig?: import("@solana/web3.js").IsBlockhashValidConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<boolean>>;
        getVersion: () => Promise<import("@solana/web3.js").Version>;
        getGenesisHash: () => Promise<string>;
        getBlock: {
            (slot: number, rawConfig?: import("@solana/web3.js").GetBlockConfig | undefined): Promise<import("@solana/web3.js").BlockResponse | null>;
            (slot: number, rawConfig: import("@solana/web3.js").GetBlockConfig & {
                transactionDetails: "accounts";
            }): Promise<import("@solana/web3.js").VersionedAccountsModeBlockResponse | null>;
            (slot: number, rawConfig: import("@solana/web3.js").GetBlockConfig & {
                transactionDetails: "none";
            }): Promise<import("@solana/web3.js").VersionedNoneModeBlockResponse | null>;
            (slot: number, rawConfig?: import("@solana/web3.js").GetVersionedBlockConfig | undefined): Promise<import("@solana/web3.js").VersionedBlockResponse | null>;
            (slot: number, rawConfig: import("@solana/web3.js").GetVersionedBlockConfig & {
                transactionDetails: "accounts";
            }): Promise<import("@solana/web3.js").VersionedAccountsModeBlockResponse | null>;
            (slot: number, rawConfig: import("@solana/web3.js").GetVersionedBlockConfig & {
                transactionDetails: "none";
            }): Promise<import("@solana/web3.js").VersionedNoneModeBlockResponse | null>;
        };
        getParsedBlock: {
            (slot: number, rawConfig?: import("@solana/web3.js").GetVersionedBlockConfig | undefined): Promise<import("@solana/web3.js").ParsedAccountsModeBlockResponse>;
            (slot: number, rawConfig: import("@solana/web3.js").GetVersionedBlockConfig & {
                transactionDetails: "accounts";
            }): Promise<import("@solana/web3.js").ParsedAccountsModeBlockResponse>;
            (slot: number, rawConfig: import("@solana/web3.js").GetVersionedBlockConfig & {
                transactionDetails: "none";
            }): Promise<import("@solana/web3.js").ParsedNoneModeBlockResponse>;
        };
        getBlockHeight: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBlockHeightConfig | undefined) => Promise<number>;
        getBlockProduction: (configOrCommitment?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBlockProductionConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<Readonly<{
            byIdentity: Readonly<Record<string, readonly number[]>>;
            range: Readonly<{
                firstSlot: number;
                lastSlot: number;
            }>;
        }>>>;
        getTransaction: {
            (signature: string, rawConfig?: import("@solana/web3.js").GetTransactionConfig | undefined): Promise<import("@solana/web3.js").TransactionResponse | null>;
            (signature: string, rawConfig: import("@solana/web3.js").GetVersionedTransactionConfig): Promise<import("@solana/web3.js").VersionedTransactionResponse | null>;
        };
        getParsedTransaction: (signature: string, commitmentOrConfig?: import("@solana/web3.js").GetVersionedTransactionConfig | import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ParsedTransactionWithMeta | null>;
        getParsedTransactions: (signatures: string[], commitmentOrConfig?: import("@solana/web3.js").GetVersionedTransactionConfig | import("@solana/web3.js").Finality | undefined) => Promise<(import("@solana/web3.js").ParsedTransactionWithMeta | null)[]>;
        getTransactions: {
            (signatures: string[], commitmentOrConfig?: import("@solana/web3.js").GetTransactionConfig | import("@solana/web3.js").Finality | undefined): Promise<(import("@solana/web3.js").TransactionResponse | null)[]>;
            (signatures: string[], commitmentOrConfig: import("@solana/web3.js").GetVersionedTransactionConfig | import("@solana/web3.js").Finality): Promise<(import("@solana/web3.js").VersionedTransactionResponse | null)[]>;
        };
        getConfirmedBlock: (slot: number, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedBlock>;
        getBlocks: (startSlot: number, endSlot?: number | undefined, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<number[]>;
        getBlockSignatures: (slot: number, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").BlockSignatures>;
        getConfirmedBlockSignatures: (slot: number, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").BlockSignatures>;
        getConfirmedTransaction: (signature: string, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedTransaction | null>;
        getParsedConfirmedTransaction: (signature: string, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ParsedTransactionWithMeta | null>;
        getParsedConfirmedTransactions: (signatures: string[], commitment?: import("@solana/web3.js").Finality | undefined) => Promise<(import("@solana/web3.js").ParsedTransactionWithMeta | null)[]>;
        getConfirmedSignaturesForAddress: (address: import("@solana/web3.js").PublicKey, startSlot: number, endSlot: number) => Promise<string[]>;
        getConfirmedSignaturesForAddress2: (address: import("@solana/web3.js").PublicKey, options?: import("@solana/web3.js").ConfirmedSignaturesForAddress2Options | undefined, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedSignatureInfo[]>;
        getSignaturesForAddress: (address: import("@solana/web3.js").PublicKey, options?: import("@solana/web3.js").SignaturesForAddressOptions | undefined, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedSignatureInfo[]>;
        getAddressLookupTable: (accountKey: import("@solana/web3.js").PublicKey, config?: import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AddressLookupTableAccount | null>>;
        getNonceAndContext: (nonceAccount: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetNonceAndContextConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").NonceAccount | null>>;
        getNonce: (nonceAccount: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetNonceConfig | undefined) => Promise<import("@solana/web3.js").NonceAccount | null>;
        requestAirdrop: (to: import("@solana/web3.js").PublicKey, lamports: number) => Promise<string>;
        getStakeMinimumDelegation: (config?: import("@solana/web3.js").GetStakeMinimumDelegationConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<number>>;
        simulateTransaction: {
            (transactionOrMessage: import("@solana/web3.js").Transaction | import("@solana/web3.js").Message, signers?: import("@solana/web3.js").Signer[] | undefined, includeAccounts?: boolean | import("@solana/web3.js").PublicKey[] | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SimulatedTransactionResponse>>;
            (transaction: import("@solana/web3.js").VersionedTransaction, config?: import("@solana/web3.js").SimulateTransactionConfig | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SimulatedTransactionResponse>>;
        };
        sendTransaction: {
            (transaction: import("@solana/web3.js").Transaction, signers: import("@solana/web3.js").Signer[], options?: import("@solana/web3.js").SendOptions | undefined): Promise<string>;
            (transaction: import("@solana/web3.js").VersionedTransaction, options?: import("@solana/web3.js").SendOptions | undefined): Promise<string>;
        };
        sendRawTransaction: (rawTransaction: Uint8Array | number[] | Buffer, options?: import("@solana/web3.js").SendOptions | undefined) => Promise<string>;
        sendEncodedTransaction: (encodedTransaction: string, options?: import("@solana/web3.js").SendOptions | undefined) => Promise<string>;
        onAccountChange: (publicKey: import("@solana/web3.js").PublicKey, callback: import("@solana/web3.js").AccountChangeCallback, commitment?: import("@solana/web3.js").Commitment | undefined) => number;
        removeAccountChangeListener: (clientSubscriptionId: number) => Promise<void>;
        onProgramAccountChange: (programId: import("@solana/web3.js").PublicKey, callback: import("@solana/web3.js").ProgramAccountChangeCallback, commitment?: import("@solana/web3.js").Commitment | undefined, filters?: import("@solana/web3.js").GetProgramAccountsFilter[] | undefined) => number;
        removeProgramAccountChangeListener: (clientSubscriptionId: number) => Promise<void>;
        onLogs: (filter: import("@solana/web3.js").LogsFilter, callback: import("@solana/web3.js").LogsCallback, commitment?: import("@solana/web3.js").Commitment | undefined) => number;
        removeOnLogsListener: (clientSubscriptionId: number) => Promise<void>;
        onSlotChange: (callback: import("@solana/web3.js").SlotChangeCallback) => number;
        removeSlotChangeListener: (clientSubscriptionId: number) => Promise<void>;
        onSlotUpdate: (callback: import("@solana/web3.js").SlotUpdateCallback) => number;
        removeSlotUpdateListener: (clientSubscriptionId: number) => Promise<void>;
        _buildArgs: (args: any[], override?: import("@solana/web3.js").Commitment | undefined, encoding?: "base64" | "jsonParsed" | undefined, extra?: any) => any[];
        onSignature: (signature: string, callback: import("@solana/web3.js").SignatureResultCallback, commitment?: import("@solana/web3.js").Commitment | undefined) => number;
        onSignatureWithOptions: (signature: string, callback: import("@solana/web3.js").SignatureSubscriptionCallback, options?: import("@solana/web3.js").SignatureSubscriptionOptions | undefined) => number;
        removeSignatureListener: (clientSubscriptionId: number) => Promise<void>;
        onRootChange: (callback: import("@solana/web3.js").RootChangeCallback) => number;
        removeRootChangeListener: (clientSubscriptionId: number) => Promise<void>;
    } | null>;
};
export declare function useDisconnect(): {
    disconnect: () => void;
};
export declare function useSwitchNetwork(): {
    switchNetwork: (chainId: string) => Promise<void>;
};
export declare function useWeb3ModalAccount(): {
    address: import("vue").Ref<string | undefined>;
    isConnected: import("vue").Ref<boolean>;
    chainId: import("vue").Ref<string | undefined>;
};
export declare function useWeb3ModalError(): {
    error: import("vue").Ref<unknown>;
};
export { useWeb3ModalTheme, useWeb3Modal, useWeb3ModalState, useWeb3ModalEvents } from '@web3modal/scaffold-vue';
export { defaultSolanaConfig } from '../src/utils/defaultConfig.js';
