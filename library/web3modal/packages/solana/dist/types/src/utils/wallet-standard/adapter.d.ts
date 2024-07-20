import { BaseWalletAdapter, type SendTransactionOptions, type StandardWalletAdapter as StandardWalletAdapterType, type SupportedTransactionVersions, type WalletAdapterCompatibleStandardWallet, type WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { type SolanaSignInInput, type SolanaSignInOutput } from '@solana/wallet-standard-features';
import type { Connection, TransactionSignature } from '@solana/web3.js';
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { type StandardConnectInput } from '@wallet-standard/features';
export interface StandardWalletAdapterConfig {
    wallet: WalletAdapterCompatibleStandardWallet;
}
export declare class StandardWalletAdapter extends BaseWalletAdapter implements StandardWalletAdapterType {
    #private;
    get name(): WalletName;
    readonly url = "https://github.com/solana-labs/wallet-standard";
    readonly isAnnounced = true;
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get readyState(): WalletReadyState;
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get supportedTransactionVersions(): SupportedTransactionVersions;
    get wallet(): WalletAdapterCompatibleStandardWallet;
    get standard(): true;
    constructor({ wallet }: StandardWalletAdapterConfig);
    destroy(): void;
    autoConnect(): Promise<void>;
    connect(params?: StandardConnectInput): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined;
    signAllTransactions: (<T extends Transaction | VersionedTransaction>(transaction: T[]) => Promise<T[]>) | undefined;
    signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
    signIn: ((input?: SolanaSignInInput) => Promise<SolanaSignInOutput>) | undefined;
}