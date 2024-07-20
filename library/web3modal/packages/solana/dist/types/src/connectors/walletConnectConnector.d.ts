import { Transaction, VersionedTransaction } from '@solana/web3.js';
import { BaseConnector } from './baseConnector.js';
import type { Signer } from '@solana/web3.js';
import type UniversalProvider from '@walletconnect/universal-provider';
import type { Connector } from './baseConnector.js';
import type { Chain } from '../utils/scaffold/SolanaTypesUtil.js';
import { type ChainIDType } from '../utils/chainPath/index.js';
export interface WalletConnectAppMetadata {
    name: string;
    description: string;
    url: string;
    icons: string[];
}
export declare class WalletConnectConnector extends BaseConnector implements Connector {
    id: string;
    name: string;
    ready: boolean;
    chains: Chain[];
    protected provider: UniversalProvider | undefined;
    protected qrcode: boolean;
    constructor({ relayerRegion, metadata, qrcode, chains }: {
        relayerRegion: string;
        metadata: WalletConnectAppMetadata;
        qrcode?: boolean;
        chains: Chain[];
    });
    static readonly connectorName = "walletconnect";
    disconnect(): Promise<void>;
    getConnectorName(): string;
    getProvider(): Promise<UniversalProvider>;
    signMessage(message: Uint8Array): Promise<string>;
    signVersionedTransaction(transaction: VersionedTransaction): Promise<{
        signatures: {
            signature: string;
        }[];
    }>;
    signTransaction(transactionParam: Transaction | VersionedTransaction): Promise<{
        signatures: {
            signature: string;
        }[];
    }>;
    private _sendTransaction;
    sendTransaction(transactionParam: Transaction | VersionedTransaction): Promise<string>;
    signAndSendTransaction(transactionParam: Transaction | VersionedTransaction, signers: Signer[]): Promise<string>;
    generateNamespaces(chainId: string): {
        solana: {
            chains: ChainIDType[];
            methods: string[];
            events: never[];
            rpcMap: {
                [x: string]: string;
            };
        };
    };
    connect(): Promise<string>;
    onConnector(): Promise<void>;
}
