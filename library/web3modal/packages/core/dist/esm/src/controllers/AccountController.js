import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { BlockchainApiController } from './BlockchainApiController.js';
import { SnackController } from './SnackController.js';
import { SwapController } from './SwapController.js';
import { SwapApiUtil } from '../utils/SwapApiUtil.js';
import { ChainController } from './ChainController.js';
import { NetworkController } from './NetworkController.js';
import { proxy, ref } from 'valtio';
const state = proxy({
    isConnected: false,
    currentTab: 0,
    tokenBalance: [],
    smartAccountDeployed: false,
    addressLabels: new Map(),
    allAccounts: []
});
export const AccountController = {
    state,
    replaceState(newState) {
        Object.assign(state, newState);
    },
    subscribe(callback) {
        return ChainController.subscribeChainProp('accountState', accountState => {
            if (accountState) {
                return callback(accountState);
            }
            return undefined;
        });
    },
    subscribeKey(property, callback) {
        let prev = undefined;
        return ChainController.subscribeChainProp('accountState', accountState => {
            if (accountState) {
                const nextValue = accountState[property];
                if (prev !== nextValue) {
                    prev = nextValue;
                    callback(nextValue);
                }
            }
        });
    },
    setIsConnected(isConnected, chain) {
        ChainController.setAccountProp('isConnected', isConnected, chain);
    },
    setCaipAddress(caipAddress, chain) {
        const newCaipAddress = caipAddress ? CoreHelperUtil.getPlainAddress(caipAddress) : undefined;
        ChainController.setAccountProp('caipAddress', caipAddress, chain);
        ChainController.setAccountProp('address', newCaipAddress, chain);
    },
    setBalance(balance, balanceSymbol, chain) {
        ChainController.setAccountProp('balance', balance, chain);
        ChainController.setAccountProp('balanceSymbol', balanceSymbol, chain);
    },
    setProfileName(profileName, chain) {
        ChainController.setAccountProp('profileName', profileName, chain);
    },
    setProfileImage(profileImage, chain) {
        ChainController.setAccountProp('profileImage', profileImage, chain);
    },
    setAddressExplorerUrl(explorerUrl, chain) {
        ChainController.setAccountProp('addressExplorerUrl', explorerUrl, chain);
    },
    setSmartAccountDeployed(isDeployed, chain) {
        ChainController.setAccountProp('smartAccountDeployed', isDeployed, chain);
    },
    setCurrentTab(currentTab, chain) {
        ChainController.setAccountProp('currentTab', currentTab, chain);
    },
    setTokenBalance(tokenBalance, chain) {
        if (tokenBalance) {
            ChainController.setAccountProp('tokenBalance', tokenBalance, chain);
        }
    },
    setShouldUpdateToAddress(address) {
        ChainController.setAccountProp('shouldUpdateToAddress', address);
    },
    setAllAccounts(accounts, chain) {
        ChainController.setAccountProp('allAccounts', accounts, chain);
    },
    addAddressLabel(address, label) {
        const map = ChainController.getAccountProp('addressLabels') || new Map();
        map.set(address, label);
        ChainController.setAccountProp('addressLabels', map);
    },
    removeAddressLabel(address) {
        const map = ChainController.getAccountProp('addressLabels') || new Map();
        map.delete(address);
        ChainController.setAccountProp('addressLabels', map);
    },
    setConnectedWalletInfo(connectedWalletInfo, chain) {
        ChainController.setAccountProp('connectedWalletInfo', connectedWalletInfo, chain);
    },
    setPreferredAccountType(preferredAccountType, chain) {
        ChainController.setAccountProp('preferredAccountType', preferredAccountType, chain);
    },
    setSocialProvider(socialProvider, chain) {
        if (socialProvider) {
            ChainController.setAccountProp('socialProvider', socialProvider, chain);
        }
    },
    setSocialWindow(socialWindow, chain) {
        if (socialWindow) {
            ChainController.setAccountProp('socialWindow', ref(socialWindow), chain);
        }
    },
    async fetchTokenBalance() {
        const chainId = NetworkController.state.caipNetwork?.id;
        const chain = NetworkController.state.caipNetwork?.chain;
        const address = AccountController.state.address;
        try {
            if (address && chainId) {
                const response = await BlockchainApiController.getBalance(address, chainId);
                const filteredBalances = response.balances.filter(balance => balance.quantity.decimals !== '0');
                this.setTokenBalance(filteredBalances, chain);
                SwapController.setBalances(SwapApiUtil.mapBalancesToSwapTokens(response.balances));
            }
        }
        catch (error) {
            SnackController.showError('Failed to fetch token balance');
        }
    },
    resetAccount(chain) {
        ChainController.resetAccount(chain);
    }
};
//# sourceMappingURL=AccountController.js.map