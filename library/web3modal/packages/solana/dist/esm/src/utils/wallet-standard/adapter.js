var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _StandardWalletAdapter_instances, _StandardWalletAdapter_account, _StandardWalletAdapter_publicKey, _StandardWalletAdapter_connecting, _StandardWalletAdapter_disconnecting, _StandardWalletAdapter_off, _StandardWalletAdapter_supportedTransactionVersions, _StandardWalletAdapter_wallet, _StandardWalletAdapter_readyState, _StandardWalletAdapter_connect, _StandardWalletAdapter_connected, _StandardWalletAdapter_disconnected, _StandardWalletAdapter_reset, _StandardWalletAdapter_changed, _StandardWalletAdapter_signTransaction, _StandardWalletAdapter_signAllTransactions, _StandardWalletAdapter_signMessage, _StandardWalletAdapter_signIn;
import { BaseWalletAdapter, isVersionedTransaction, WalletAccountError, WalletConfigError, WalletConnectionError, WalletDisconnectedError, WalletDisconnectionError, WalletError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSendTransactionError, WalletSignInError, WalletSignMessageError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { SolanaSignAndSendTransaction, SolanaSignIn, SolanaSignMessage, SolanaSignTransaction } from '@solana/wallet-standard-features';
import { getChainForEndpoint, getCommitment } from '@solana/wallet-standard-util';
import { PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { StandardConnect, StandardDisconnect, StandardEvents } from '@wallet-standard/features';
import { arraysEqual } from '@wallet-standard/wallet';
import bs58 from 'bs58';
export class StandardWalletAdapter extends BaseWalletAdapter {
    get name() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").name;
    }
    get icon() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").icon;
    }
    get readyState() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_readyState, "f");
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_publicKey, "f");
    }
    get connecting() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_connecting, "f");
    }
    get supportedTransactionVersions() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_supportedTransactionVersions, "f");
    }
    get wallet() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f");
    }
    get standard() {
        return true;
    }
    constructor({ wallet }) {
        super();
        _StandardWalletAdapter_instances.add(this);
        _StandardWalletAdapter_account.set(this, void 0);
        _StandardWalletAdapter_publicKey.set(this, void 0);
        _StandardWalletAdapter_connecting.set(this, void 0);
        _StandardWalletAdapter_disconnecting.set(this, void 0);
        _StandardWalletAdapter_off.set(this, void 0);
        _StandardWalletAdapter_supportedTransactionVersions.set(this, void 0);
        _StandardWalletAdapter_wallet.set(this, void 0);
        _StandardWalletAdapter_readyState.set(this, typeof window === 'undefined' || typeof document === 'undefined'
            ? WalletReadyState.Unsupported
            : WalletReadyState.Installed);
        this.url = 'https://github.com/solana-labs/wallet-standard';
        this.isAnnounced = true;
        _StandardWalletAdapter_changed.set(this, properties => {
            if ('accounts' in properties) {
                const account = __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts[0];
                if (__classPrivateFieldGet(this, _StandardWalletAdapter_account, "f") && !__classPrivateFieldGet(this, _StandardWalletAdapter_disconnecting, "f") && account !== __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f")) {
                    if (account) {
                        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account);
                    }
                    else {
                        this.emit('error', new WalletDisconnectedError());
                        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
                    }
                }
            }
            if ('features' in properties) {
                __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
            }
        });
        __classPrivateFieldSet(this, _StandardWalletAdapter_wallet, wallet, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_account, null, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, null, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, false, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, false, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_off, __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[StandardEvents].on('change', __classPrivateFieldGet(this, _StandardWalletAdapter_changed, "f")), "f");
        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
    }
    destroy() {
        __classPrivateFieldSet(this, _StandardWalletAdapter_account, null, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, null, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, false, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, false, "f");
        const off = __classPrivateFieldGet(this, _StandardWalletAdapter_off, "f");
        if (off) {
            __classPrivateFieldSet(this, _StandardWalletAdapter_off, null, "f");
            off();
        }
    }
    async autoConnect() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connect).call(this, { silent: true });
    }
    async connect(params) {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connect).call(this, params);
    }
    async disconnect() {
        if (StandardDisconnect in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
            try {
                __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, true, "f");
                await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[StandardDisconnect].disconnect();
            }
            catch (error) {
                this.emit('error', new WalletDisconnectionError(error?.message, error));
            }
            finally {
                __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, false, "f");
            }
        }
        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
    }
    async sendTransaction(transaction, connection, options = {}) {
        try {
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
            if (!account) {
                throw new WalletNotConnectedError();
            }
            let feature = undefined;
            if (SolanaSignAndSendTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                if (account.features.includes(SolanaSignAndSendTransaction)) {
                    feature = SolanaSignAndSendTransaction;
                }
                else if (SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features &&
                    account.features.includes(SolanaSignTransaction)) {
                    feature = SolanaSignTransaction;
                }
                else {
                    throw new WalletAccountError();
                }
            }
            else if (SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                if (!account.features.includes(SolanaSignTransaction)) {
                    throw new WalletAccountError();
                }
                feature = SolanaSignTransaction;
            }
            else {
                throw new WalletConfigError();
            }
            const chain = getChainForEndpoint(connection.rpcEndpoint);
            if (!account.chains.includes(chain)) {
                throw new WalletSendTransactionError();
            }
            try {
                const { signers, ...sendOptions } = options;
                let serializedTransaction = undefined;
                if (isVersionedTransaction(transaction)) {
                    if (signers?.length) {
                        transaction.sign(signers);
                    }
                    serializedTransaction = transaction.serialize();
                }
                else {
                    const _transaction = (await this.prepareTransaction(transaction, connection, sendOptions));
                    if (signers?.length) {
                        ;
                        _transaction.partialSign(...signers);
                    }
                    serializedTransaction = new Uint8Array(_transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false
                    }));
                }
                if (feature === SolanaSignAndSendTransaction) {
                    const [output] = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignAndSendTransaction].signAndSendTransaction({
                        account,
                        chain,
                        transaction: serializedTransaction,
                        options: {
                            preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
                            skipPreflight: sendOptions.skipPreflight,
                            maxRetries: sendOptions.maxRetries,
                            minContextSlot: sendOptions.minContextSlot
                        }
                    });
                    return bs58.encode(output.signature);
                }
                const [output] = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction({
                    account,
                    chain,
                    transaction: serializedTransaction,
                    options: {
                        preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
                        minContextSlot: sendOptions.minContextSlot
                    }
                });
                return await connection.sendRawTransaction(output.signedTransaction, {
                    ...sendOptions,
                    preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment)
                });
            }
            catch (error) {
                if (error instanceof WalletError) {
                    throw error;
                }
                throw new WalletSendTransactionError(error?.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}
_StandardWalletAdapter_account = new WeakMap(), _StandardWalletAdapter_publicKey = new WeakMap(), _StandardWalletAdapter_connecting = new WeakMap(), _StandardWalletAdapter_disconnecting = new WeakMap(), _StandardWalletAdapter_off = new WeakMap(), _StandardWalletAdapter_supportedTransactionVersions = new WeakMap(), _StandardWalletAdapter_wallet = new WeakMap(), _StandardWalletAdapter_readyState = new WeakMap(), _StandardWalletAdapter_changed = new WeakMap(), _StandardWalletAdapter_instances = new WeakSet(), _StandardWalletAdapter_connect = async function _StandardWalletAdapter_connect(input) {
    try {
        if (this.connected || this.connecting) {
            return;
        }
        if (__classPrivateFieldGet(this, _StandardWalletAdapter_readyState, "f") !== WalletReadyState.Installed) {
            throw new WalletNotReadyError();
        }
        __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, true, "f");
        if (!__classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts.length) {
            try {
                await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[StandardConnect].connect(input);
            }
            catch (error) {
                throw new WalletConnectionError(error?.message, error);
            }
        }
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts[0];
        if (!account) {
            throw new WalletAccountError();
        }
        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account);
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
    finally {
        __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, false, "f");
    }
}, _StandardWalletAdapter_connected = function _StandardWalletAdapter_connected(account) {
    let publicKey = undefined;
    try {
        publicKey = new PublicKey(account.address);
    }
    catch (error) {
        throw new WalletPublicKeyError(error?.message, error);
    }
    __classPrivateFieldSet(this, _StandardWalletAdapter_account, account, "f");
    __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, publicKey, "f");
    __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
    this.emit('connect', publicKey);
}, _StandardWalletAdapter_disconnected = function _StandardWalletAdapter_disconnected() {
    __classPrivateFieldSet(this, _StandardWalletAdapter_account, null, "f");
    __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, null, "f");
    __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_reset).call(this);
    this.emit('disconnect');
}, _StandardWalletAdapter_reset = function _StandardWalletAdapter_reset() {
    const supportedTransactionVersions = SolanaSignAndSendTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features
        ? __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignAndSendTransaction].supportedTransactionVersions
        : __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].supportedTransactionVersions;
    __classPrivateFieldSet(this, _StandardWalletAdapter_supportedTransactionVersions, arraysEqual(supportedTransactionVersions, ['legacy'])
        ? null
        : new Set(supportedTransactionVersions), "f");
    if (SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features &&
        __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f")?.features.includes(SolanaSignTransaction)) {
        this.signTransaction = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signTransaction);
        this.signAllTransactions = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signAllTransactions);
    }
    else {
        delete this.signTransaction;
        delete this.signAllTransactions;
    }
    if (SolanaSignMessage in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features &&
        __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f")?.features.includes(SolanaSignMessage)) {
        this.signMessage = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signMessage);
    }
    else {
        delete this.signMessage;
    }
    if (SolanaSignIn in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
        this.signIn = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signIn);
    }
    else {
        delete this.signIn;
    }
}, _StandardWalletAdapter_signTransaction = async function _StandardWalletAdapter_signTransaction(transaction) {
    try {
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
        if (!account) {
            throw new WalletNotConnectedError();
        }
        if (!(SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features)) {
            throw new WalletConfigError();
        }
        if (!account.features.includes(SolanaSignTransaction)) {
            throw new WalletAccountError();
        }
        try {
            const signedTransactions = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction({
                account,
                transaction: isVersionedTransaction(transaction)
                    ? transaction.serialize()
                    : new Uint8Array(transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false
                    }))
            });
            const serializedTransaction = signedTransactions[0].signedTransaction;
            return (isVersionedTransaction(transaction)
                ? VersionedTransaction.deserialize(serializedTransaction)
                : Transaction.from(serializedTransaction));
        }
        catch (error) {
            if (error instanceof WalletError) {
                throw error;
            }
            throw new WalletSignTransactionError(error?.message, error);
        }
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
}, _StandardWalletAdapter_signAllTransactions = async function _StandardWalletAdapter_signAllTransactions(transactions) {
    try {
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
        if (!account) {
            throw new WalletNotConnectedError();
        }
        if (!(SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features)) {
            throw new WalletConfigError();
        }
        if (!account.features.includes(SolanaSignTransaction)) {
            throw new WalletAccountError();
        }
        try {
            const signedTransactions = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction(...transactions.map(transaction => ({
                account,
                transaction: isVersionedTransaction(transaction)
                    ? transaction.serialize()
                    : new Uint8Array(transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false
                    }))
            })));
            return transactions.map((transaction, index) => {
                const signedTransaction = signedTransactions[index].signedTransaction;
                return (isVersionedTransaction(transaction)
                    ? VersionedTransaction.deserialize(signedTransaction)
                    : Transaction.from(signedTransaction));
            });
        }
        catch (error) {
            throw new WalletSignTransactionError(error?.message, error);
        }
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
}, _StandardWalletAdapter_signMessage = async function _StandardWalletAdapter_signMessage(message) {
    try {
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
        if (!account) {
            throw new WalletNotConnectedError();
        }
        if (!(SolanaSignMessage in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features)) {
            throw new WalletConfigError();
        }
        if (!account.features.includes(SolanaSignMessage)) {
            throw new WalletAccountError();
        }
        try {
            const signedMessages = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignMessage].signMessage({
                account,
                message
            });
            return signedMessages[0].signature;
        }
        catch (error) {
            throw new WalletSignMessageError(error?.message, error);
        }
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
}, _StandardWalletAdapter_signIn = async function _StandardWalletAdapter_signIn(input = {}) {
    try {
        if (!(SolanaSignIn in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features)) {
            throw new WalletConfigError();
        }
        let output = undefined;
        try {
            ;
            [output] = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignIn].signIn(input);
        }
        catch (error) {
            throw new WalletSignInError(error?.message, error);
        }
        if (!output) {
            throw new WalletSignInError();
        }
        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, output.account);
        return output;
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
};
//# sourceMappingURL=adapter.js.map