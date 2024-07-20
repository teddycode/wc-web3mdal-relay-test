import base58 from 'bs58';
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { OptionsController } from '@web3modal/core';
import { SolStoreUtil } from '../utils/scaffold/index.js';
import { UniversalProviderFactory } from './universalProvider.js';
import { BaseConnector } from './baseConnector.js';
import { getChainsFromChainId, getDefaultChainFromSession } from '../utils/chainPath/index.js';
export class WalletConnectConnector extends BaseConnector {
    constructor({ relayerRegion, metadata, qrcode, chains }) {
        super();
        this.id = 'WalletConnect';
        this.name = 'WalletConnect';
        this.ready = true;
        this.chains = chains;
        this.qrcode = Boolean(qrcode);
        UniversalProviderFactory.setSettings({
            projectId: OptionsController.state.projectId,
            relayerRegion,
            metadata,
            qrcode: this.qrcode
        });
        UniversalProviderFactory.init();
    }
    async disconnect() {
        const provider = await UniversalProviderFactory.getProvider();
        await provider.disconnect();
        SolStoreUtil.setAddress('');
    }
    getConnectorName() {
        return WalletConnectConnector.connectorName;
    }
    async getProvider() {
        const provider = await UniversalProviderFactory.getProvider();
        return provider;
    }
    async signMessage(message) {
        const address = SolStoreUtil.state.address;
        if (!address) {
            throw new Error('No signer connected');
        }
        const signedMessage = await this.request('solana_signMessage', {
            message: base58.encode(message),
            pubkey: address
        });
        const { signature } = signedMessage;
        return signature;
    }
    async signVersionedTransaction(transaction) {
        if (!SolStoreUtil.state.address) {
            throw new Error('No signer connected');
        }
        const transactionParams = {
            feePayer: new PublicKey(SolStoreUtil.state.address).toBase58(),
            instructions: transaction.message.compiledInstructions.map(instruction => ({
                ...instruction,
                data: base58.encode(instruction.data)
            })),
            recentBlockhash: transaction.message.recentBlockhash ?? ''
        };
        await this.request('solana_signTransaction', transactionParams);
        return { signatures: [{ signature: base58.encode(transaction.serialize()) }] };
    }
    async signTransaction(transactionParam) {
        const version = transactionParam.version;
        if (typeof version === 'number') {
            return this.signVersionedTransaction(transactionParam);
        }
        const transaction = transactionParam;
        const transactionParams = {
            feePayer: transaction.feePayer?.toBase58() ?? '',
            instructions: transaction.instructions.map(instruction => ({
                data: base58.encode(instruction.data),
                keys: instruction.keys.map(key => ({
                    isWritable: key.isWritable,
                    isSigner: key.isSigner,
                    pubkey: key.pubkey.toBase58()
                })),
                programId: instruction.programId.toBase58()
            })),
            recentBlockhash: transaction.recentBlockhash ?? ''
        };
        const res = await this.request('solana_signTransaction', transactionParams);
        transaction.addSignature(new PublicKey(SolStoreUtil.state.address ?? ''), Buffer.from(base58.decode(res.signature)));
        const validSig = transaction.verifySignatures();
        if (!validSig) {
            throw new Error('Signature invalid.');
        }
        return { signatures: [{ signature: base58.encode(transaction.serialize()) }] };
    }
    async _sendTransaction(transactionParam) {
        const encodedTransaction = (await this.signTransaction(transactionParam));
        const signedTransaction = base58.decode(encodedTransaction.signatures[0]?.signature ?? '');
        const txHash = await SolStoreUtil.state.connection?.sendRawTransaction(signedTransaction);
        return {
            tx: txHash,
            signature: base58.encode(signedTransaction)
        };
    }
    async sendTransaction(transactionParam) {
        const { signature } = await this._sendTransaction(transactionParam);
        return signature;
    }
    async signAndSendTransaction(transactionParam, signers) {
        if (transactionParam instanceof VersionedTransaction) {
            throw Error('Versioned transactions are not supported');
        }
        if (signers.length) {
            transactionParam.partialSign(...signers);
        }
        const { tx } = await this._sendTransaction(transactionParam);
        if (tx) {
            const latestBlockHash = await SolStoreUtil.state.connection?.getLatestBlockhash();
            if (latestBlockHash?.blockhash) {
                await SolStoreUtil.state.connection?.confirmTransaction({
                    blockhash: latestBlockHash.blockhash,
                    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                    signature: tx
                });
                return tx;
            }
        }
        throw Error('Transaction Failed');
    }
    generateNamespaces(chainId) {
        const rpcs = this.chains.reduce((acc, chain) => {
            acc[chain.chainId] = chain.rpcUrl;
            return acc;
        }, {});
        const rpcMap = {
            [chainId]: rpcs[chainId] ?? ''
        };
        return {
            solana: {
                chains: getChainsFromChainId(`solana:${chainId}`),
                methods: ['solana_signMessage', 'solana_signTransaction'],
                events: [],
                rpcMap
            }
        };
    }
    async connect() {
        const currentChainId = SolStoreUtil.state.currentChain?.chainId;
        const solanaNamespace = this.generateNamespaces(currentChainId ?? '');
        const provider = await UniversalProviderFactory.getProvider();
        return new Promise((resolve, reject) => {
            provider
                .connect({
                optionalNamespaces: solanaNamespace
            })
                .then(session => {
                if (!session) {
                    throw new Error('Failed connection.');
                }
                const address = session.namespaces['solana']?.accounts[0]?.split(':')[2] ?? null;
                if (address && this.qrcode) {
                    const defaultChain = getDefaultChainFromSession(session, `solana:${currentChainId}`);
                    provider.setDefaultChain(defaultChain);
                    resolve(address);
                }
                else {
                    reject(new Error('Could not resolve address'));
                }
            });
        });
    }
    async onConnector() {
        await this.connect();
    }
}
WalletConnectConnector.connectorName = 'walletconnect';
//# sourceMappingURL=walletConnectConnector.js.map