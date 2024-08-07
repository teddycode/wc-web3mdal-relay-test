import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { proxy, ref } from 'valtio/vanilla';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { StorageUtil } from '../utils/StorageUtil.js';
import { TransactionsController } from './TransactionsController.js';
import { ChainController } from './ChainController.js';
import {} from '@web3modal/wallet';
import { ModalController } from './ModalController.js';
import { ConnectorController } from './ConnectorController.js';
import { EventsController } from './EventsController.js';
import { NetworkController } from './NetworkController.js';
const state = proxy({
    wcError: false,
    buffering: false
});
export const ConnectionController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    _getClient() {
        return ChainController.getConnectionControllerClient();
    },
    setClient(client) {
        state._client = ref(client);
    },
    async connectWalletConnect() {
        StorageUtil.setConnectedConnector('WALLET_CONNECT');
        await this._getClient().connectWalletConnect(uri => {
            state.wcUri = uri;
            state.wcPairingExpiry = CoreHelperUtil.getPairingExpiry();
        });
    },
    async connectExternal(options, chain) {
        await this._getClient().connectExternal?.(options);
        ChainController.setActiveChain(chain);
        StorageUtil.setConnectedConnector(options.type);
    },
    async reconnectExternal(options) {
        await this._getClient().reconnectExternal?.(options);
        StorageUtil.setConnectedConnector(options.type);
    },
    async setPreferredAccountType(accountType) {
        ModalController.setLoading(true);
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector) {
            return;
        }
        await authConnector?.provider.setPreferredAccount(accountType);
        await this.reconnectExternal(authConnector);
        ModalController.setLoading(false);
        EventsController.sendEvent({
            type: 'track',
            event: 'SET_PREFERRED_ACCOUNT_TYPE',
            properties: { accountType, network: NetworkController.state.caipNetwork?.id || '' }
        });
    },
    async signMessage(message) {
        return this._getClient().signMessage(message);
    },
    parseUnits(value, decimals) {
        return this._getClient().parseUnits(value, decimals);
    },
    formatUnits(value, decimals) {
        return this._getClient().formatUnits(value, decimals);
    },
    async sendTransaction(args) {
        return this._getClient().sendTransaction(args);
    },
    async estimateGas(args) {
        return this._getClient().estimateGas(args);
    },
    async writeContract(args) {
        return this._getClient().writeContract(args);
    },
    async getEnsAddress(value) {
        return this._getClient().getEnsAddress(value);
    },
    async getEnsAvatar(value) {
        return this._getClient().getEnsAvatar(value);
    },
    checkInstalled(ids) {
        return this._getClient().checkInstalled?.(ids);
    },
    resetWcConnection() {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        state.wcLinking = undefined;
        state.recentWallet = undefined;
        TransactionsController.resetTransactions();
        StorageUtil.deleteWalletConnectDeepLink();
    },
    setWcLinking(wcLinking) {
        state.wcLinking = wcLinking;
    },
    setWcError(wcError) {
        state.wcError = wcError;
        state.buffering = false;
    },
    setRecentWallet(wallet) {
        state.recentWallet = wallet;
    },
    setBuffering(buffering) {
        state.buffering = buffering;
    },
    async disconnect() {
        const client = this._getClient();
        try {
            await client.disconnect();
            StorageUtil.removeConnectedWalletImageUrl();
            this.resetWcConnection();
        }
        catch (error) {
            throw new Error('Failed to disconnect');
        }
    }
};
//# sourceMappingURL=ConnectionController.js.map