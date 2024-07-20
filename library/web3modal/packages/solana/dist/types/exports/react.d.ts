/// <reference types="node" />
/// <reference types="@solana/web3.js" />
import { Web3Modal } from '../src/client.js';
import type { Web3ModalOptions } from '../src/client.js';
import type { Provider } from '../src/utils/scaffold/index.js';
export type { Web3Modal, Web3ModalOptions } from '../src/client.js';
export declare function createWeb3Modal(options: Web3ModalOptions): Web3Modal;
export declare function useWeb3ModalProvider(): {
    walletProvider: Provider;
    walletProviderType: "walletConnect" | `injected_${string}` | `announced_${string}` | undefined;
    connection: {
        readonly commitment: import("@solana/web3.js").Commitment | undefined;
        readonly rpcEndpoint: string;
        readonly getBalanceAndContext: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBalanceConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<number>>;
        readonly getBalance: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBalanceConfig | undefined) => Promise<number>;
        readonly getBlockTime: (slot: number) => Promise<number | null>;
        readonly getMinimumLedgerSlot: () => Promise<number>;
        readonly getFirstAvailableBlock: () => Promise<number>;
        readonly getSupply: (config?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetSupplyConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").Supply>>;
        readonly getTokenSupply: (tokenMintAddress: import("@solana/web3.js").PublicKey, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").TokenAmount>>;
        readonly getTokenAccountBalance: (tokenAddress: import("@solana/web3.js").PublicKey, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").TokenAmount>>;
        readonly getTokenAccountsByOwner: (ownerAddress: import("@solana/web3.js").PublicKey, filter: import("@solana/web3.js").TokenAccountsFilter, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetTokenAccountsByOwnerConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").GetProgramAccountsResponse>>;
        readonly getParsedTokenAccountsByOwner: (ownerAddress: import("@solana/web3.js").PublicKey, filter: import("@solana/web3.js").TokenAccountsFilter, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<{
            pubkey: import("@solana/web3.js").PublicKey;
            account: import("@solana/web3.js").AccountInfo<import("@solana/web3.js").ParsedAccountData>;
        }[]>>;
        readonly getLargestAccounts: (config?: import("@solana/web3.js").GetLargestAccountsConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AccountBalancePair[]>>;
        readonly getTokenLargestAccounts: (mintAddress: import("@solana/web3.js").PublicKey, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").TokenAccountBalancePair[]>>;
        readonly getAccountInfoAndContext: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AccountInfo<Buffer> | null>>;
        readonly getParsedAccountInfo: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AccountInfo<Buffer | import("@solana/web3.js").ParsedAccountData> | null>>;
        readonly getAccountInfo: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").AccountInfo<Buffer> | null>;
        readonly getMultipleParsedAccounts: (publicKeys: import("@solana/web3.js").PublicKey[], rawConfig?: import("@solana/web3.js").GetMultipleAccountsConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<(import("@solana/web3.js").AccountInfo<Buffer | import("@solana/web3.js").ParsedAccountData> | null)[]>>;
        readonly getMultipleAccountsInfoAndContext: (publicKeys: import("@solana/web3.js").PublicKey[], commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetMultipleAccountsConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<(import("@solana/web3.js").AccountInfo<Buffer> | null)[]>>;
        readonly getMultipleAccountsInfo: (publicKeys: import("@solana/web3.js").PublicKey[], commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetMultipleAccountsConfig | undefined) => Promise<(import("@solana/web3.js").AccountInfo<Buffer> | null)[]>;
        readonly getStakeActivation: (publicKey: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetStakeActivationConfig | undefined, epoch?: number | undefined) => Promise<import("@solana/web3.js").StakeActivationData>;
        readonly getProgramAccounts: {
            (programId: import("@solana/web3.js").PublicKey, configOrCommitment: import("@solana/web3.js").GetProgramAccountsConfig & Readonly<{
                withContext: true;
            }>): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").GetProgramAccountsResponse>>;
            (programId: import("@solana/web3.js").PublicKey, configOrCommitment?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetProgramAccountsConfig | undefined): Promise<import("@solana/web3.js").GetProgramAccountsResponse>;
        };
        readonly getParsedProgramAccounts: (programId: import("@solana/web3.js").PublicKey, configOrCommitment?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetParsedProgramAccountsConfig | undefined) => Promise<{
            pubkey: import("@solana/web3.js").PublicKey;
            account: import("@solana/web3.js").AccountInfo<Buffer | import("@solana/web3.js").ParsedAccountData>;
        }[]>;
        readonly confirmTransaction: {
            (strategy: import("@solana/web3.js").TransactionConfirmationStrategy, commitment?: import("@solana/web3.js").Commitment | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>>;
            (strategy: string, commitment?: import("@solana/web3.js").Commitment | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>>;
        };
        readonly getClusterNodes: () => Promise<import("@solana/web3.js").ContactInfo[]>;
        readonly getVoteAccounts: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").VoteAccountStatus>;
        readonly getSlot: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetSlotConfig | undefined) => Promise<number>;
        readonly getSlotLeader: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetSlotLeaderConfig | undefined) => Promise<string>;
        readonly getSlotLeaders: (startSlot: number, limit: number) => Promise<import("@solana/web3.js").PublicKey[]>;
        readonly getSignatureStatus: (signature: string, config?: import("@solana/web3.js").SignatureStatusConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureStatus | null>>;
        readonly getSignatureStatuses: (signatures: string[], config?: import("@solana/web3.js").SignatureStatusConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<(import("@solana/web3.js").SignatureStatus | null)[]>>;
        readonly getTransactionCount: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetTransactionCountConfig | undefined) => Promise<number>;
        readonly getTotalSupply: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<number>;
        readonly getInflationGovernor: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").InflationGovernor>;
        readonly getInflationReward: (addresses: import("@solana/web3.js").PublicKey[], epoch?: number | undefined, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetInflationRewardConfig | undefined) => Promise<(import("@solana/web3.js").InflationReward | null)[]>;
        readonly getInflationRate: () => Promise<import("@solana/web3.js").InflationRate>;
        readonly getEpochInfo: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetEpochInfoConfig | undefined) => Promise<import("@solana/web3.js").EpochInfo>;
        readonly getEpochSchedule: () => Promise<import("@solana/web3.js").EpochSchedule>;
        readonly getLeaderSchedule: () => Promise<import("@solana/web3.js").LeaderSchedule>;
        readonly getMinimumBalanceForRentExemption: (dataLength: number, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<number>;
        readonly getRecentBlockhashAndContext: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<{
            blockhash: string;
            feeCalculator: import("@solana/web3.js").FeeCalculator;
        }>>;
        readonly getRecentPerformanceSamples: (limit?: number | undefined) => Promise<import("@solana/web3.js").PerfSample[]>;
        readonly getFeeCalculatorForBlockhash: (blockhash: string, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").FeeCalculator | null>>;
        readonly getFeeForMessage: (message: import("@solana/web3.js").VersionedMessage, commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<number | null>>;
        readonly getRecentPrioritizationFees: (config?: import("@solana/web3.js").GetRecentPrioritizationFeesConfig | undefined) => Promise<import("@solana/web3.js").RecentPrioritizationFees[]>;
        readonly getRecentBlockhash: (commitment?: import("@solana/web3.js").Commitment | undefined) => Promise<{
            blockhash: string;
            feeCalculator: import("@solana/web3.js").FeeCalculator;
        }>;
        readonly getLatestBlockhash: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetLatestBlockhashConfig | undefined) => Promise<Readonly<{
            blockhash: string;
            lastValidBlockHeight: number;
        }>>;
        readonly getLatestBlockhashAndContext: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetLatestBlockhashConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<Readonly<{
            blockhash: string;
            lastValidBlockHeight: number;
        }>>>;
        readonly isBlockhashValid: (blockhash: string, rawConfig?: import("@solana/web3.js").IsBlockhashValidConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<boolean>>;
        readonly getVersion: () => Promise<import("@solana/web3.js").Version>;
        readonly getGenesisHash: () => Promise<string>;
        readonly getBlock: {
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
        readonly getParsedBlock: {
            (slot: number, rawConfig?: import("@solana/web3.js").GetVersionedBlockConfig | undefined): Promise<import("@solana/web3.js").ParsedAccountsModeBlockResponse>;
            (slot: number, rawConfig: import("@solana/web3.js").GetVersionedBlockConfig & {
                transactionDetails: "accounts";
            }): Promise<import("@solana/web3.js").ParsedAccountsModeBlockResponse>;
            (slot: number, rawConfig: import("@solana/web3.js").GetVersionedBlockConfig & {
                transactionDetails: "none";
            }): Promise<import("@solana/web3.js").ParsedNoneModeBlockResponse>;
        };
        readonly getBlockHeight: (commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBlockHeightConfig | undefined) => Promise<number>;
        readonly getBlockProduction: (configOrCommitment?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetBlockProductionConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<Readonly<{
            byIdentity: Readonly<Record<string, readonly number[]>>;
            range: Readonly<{
                firstSlot: number;
                lastSlot: number;
            }>;
        }>>>;
        readonly getTransaction: {
            (signature: string, rawConfig?: import("@solana/web3.js").GetTransactionConfig | undefined): Promise<import("@solana/web3.js").TransactionResponse | null>;
            (signature: string, rawConfig: import("@solana/web3.js").GetVersionedTransactionConfig): Promise<import("@solana/web3.js").VersionedTransactionResponse | null>;
        };
        readonly getParsedTransaction: (signature: string, commitmentOrConfig?: import("@solana/web3.js").GetVersionedTransactionConfig | import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ParsedTransactionWithMeta | null>;
        readonly getParsedTransactions: (signatures: string[], commitmentOrConfig?: import("@solana/web3.js").GetVersionedTransactionConfig | import("@solana/web3.js").Finality | undefined) => Promise<(import("@solana/web3.js").ParsedTransactionWithMeta | null)[]>;
        readonly getTransactions: {
            (signatures: string[], commitmentOrConfig?: import("@solana/web3.js").GetTransactionConfig | import("@solana/web3.js").Finality | undefined): Promise<(import("@solana/web3.js").TransactionResponse | null)[]>;
            (signatures: string[], commitmentOrConfig: import("@solana/web3.js").GetVersionedTransactionConfig | import("@solana/web3.js").Finality): Promise<(import("@solana/web3.js").VersionedTransactionResponse | null)[]>;
        };
        readonly getConfirmedBlock: (slot: number, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedBlock>;
        readonly getBlocks: (startSlot: number, endSlot?: number | undefined, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<number[]>;
        readonly getBlockSignatures: (slot: number, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").BlockSignatures>;
        readonly getConfirmedBlockSignatures: (slot: number, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").BlockSignatures>;
        readonly getConfirmedTransaction: (signature: string, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedTransaction | null>;
        readonly getParsedConfirmedTransaction: (signature: string, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ParsedTransactionWithMeta | null>;
        readonly getParsedConfirmedTransactions: (signatures: string[], commitment?: import("@solana/web3.js").Finality | undefined) => Promise<(import("@solana/web3.js").ParsedTransactionWithMeta | null)[]>;
        readonly getConfirmedSignaturesForAddress: (address: import("@solana/web3.js").PublicKey, startSlot: number, endSlot: number) => Promise<string[]>;
        readonly getConfirmedSignaturesForAddress2: (address: import("@solana/web3.js").PublicKey, options?: import("@solana/web3.js").ConfirmedSignaturesForAddress2Options | undefined, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedSignatureInfo[]>;
        readonly getSignaturesForAddress: (address: import("@solana/web3.js").PublicKey, options?: import("@solana/web3.js").SignaturesForAddressOptions | undefined, commitment?: import("@solana/web3.js").Finality | undefined) => Promise<import("@solana/web3.js").ConfirmedSignatureInfo[]>;
        readonly getAddressLookupTable: (accountKey: import("@solana/web3.js").PublicKey, config?: import("@solana/web3.js").GetAccountInfoConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").AddressLookupTableAccount | null>>;
        readonly getNonceAndContext: (nonceAccount: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetNonceAndContextConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").NonceAccount | null>>;
        readonly getNonce: (nonceAccount: import("@solana/web3.js").PublicKey, commitmentOrConfig?: import("@solana/web3.js").Commitment | import("@solana/web3.js").GetNonceConfig | undefined) => Promise<import("@solana/web3.js").NonceAccount | null>;
        readonly requestAirdrop: (to: import("@solana/web3.js").PublicKey, lamports: number) => Promise<string>;
        readonly getStakeMinimumDelegation: (config?: import("@solana/web3.js").GetStakeMinimumDelegationConfig | undefined) => Promise<import("@solana/web3.js").RpcResponseAndContext<number>>;
        readonly simulateTransaction: {
            (transactionOrMessage: import("@solana/web3.js").Transaction | import("@solana/web3.js").Message, signers?: import("@solana/web3.js").Signer[] | undefined, includeAccounts?: boolean | import("@solana/web3.js").PublicKey[] | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SimulatedTransactionResponse>>;
            (transaction: import("@solana/web3.js").VersionedTransaction, config?: import("@solana/web3.js").SimulateTransactionConfig | undefined): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SimulatedTransactionResponse>>;
        };
        readonly sendTransaction: {
            (transaction: import("@solana/web3.js").Transaction, signers: import("@solana/web3.js").Signer[], options?: import("@solana/web3.js").SendOptions | undefined): Promise<string>;
            (transaction: import("@solana/web3.js").VersionedTransaction, options?: import("@solana/web3.js").SendOptions | undefined): Promise<string>;
        };
        readonly sendRawTransaction: (rawTransaction: Uint8Array | number[] | Buffer, options?: import("@solana/web3.js").SendOptions | undefined) => Promise<string>;
        readonly sendEncodedTransaction: (encodedTransaction: string, options?: import("@solana/web3.js").SendOptions | undefined) => Promise<string>;
        readonly onAccountChange: (publicKey: import("@solana/web3.js").PublicKey, callback: import("@solana/web3.js").AccountChangeCallback, commitment?: import("@solana/web3.js").Commitment | undefined) => number;
        readonly removeAccountChangeListener: (clientSubscriptionId: number) => Promise<void>;
        readonly onProgramAccountChange: (programId: import("@solana/web3.js").PublicKey, callback: import("@solana/web3.js").ProgramAccountChangeCallback, commitment?: import("@solana/web3.js").Commitment | undefined, filters?: import("@solana/web3.js").GetProgramAccountsFilter[] | undefined) => number;
        readonly removeProgramAccountChangeListener: (clientSubscriptionId: number) => Promise<void>;
        readonly onLogs: (filter: import("@solana/web3.js").LogsFilter, callback: import("@solana/web3.js").LogsCallback, commitment?: import("@solana/web3.js").Commitment | undefined) => number;
        readonly removeOnLogsListener: (clientSubscriptionId: number) => Promise<void>;
        readonly onSlotChange: (callback: import("@solana/web3.js").SlotChangeCallback) => number;
        readonly removeSlotChangeListener: (clientSubscriptionId: number) => Promise<void>;
        readonly onSlotUpdate: (callback: import("@solana/web3.js").SlotUpdateCallback) => number;
        readonly removeSlotUpdateListener: (clientSubscriptionId: number) => Promise<void>;
        readonly _buildArgs: (args: any[], override?: import("@solana/web3.js").Commitment | undefined, encoding?: "base64" | "jsonParsed" | undefined, extra?: any) => any[];
        readonly onSignature: (signature: string, callback: import("@solana/web3.js").SignatureResultCallback, commitment?: import("@solana/web3.js").Commitment | undefined) => number;
        readonly onSignatureWithOptions: (signature: string, callback: import("@solana/web3.js").SignatureSubscriptionCallback, options?: import("@solana/web3.js").SignatureSubscriptionOptions | undefined) => number;
        readonly removeSignatureListener: (clientSubscriptionId: number) => Promise<void>;
        readonly onRootChange: (callback: import("@solana/web3.js").RootChangeCallback) => number;
        readonly removeRootChangeListener: (clientSubscriptionId: number) => Promise<void>;
    } | null;
};
export declare function useDisconnect(): {
    disconnect: () => void;
};
export declare function useWeb3ModalAccount(): {
    address: string | undefined;
    isConnected: boolean;
    currentChain: {
        readonly rpcUrl: string;
        readonly explorerUrl: string;
        readonly currency: string;
        readonly name: string;
        readonly chainId: string;
    } | undefined;
    chainId: string | undefined;
};
export { useWeb3ModalTheme, useWeb3Modal, useWeb3ModalState, useWeb3ModalEvents } from '@web3modal/scaffold-react';
export { defaultSolanaConfig } from '../src/utils/defaultConfig.js';
