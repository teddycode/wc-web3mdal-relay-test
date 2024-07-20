import { getWallets } from '@wallet-standard/app';
import { StandardWalletAdapter } from './adapter';
import { isWalletAdapterCompatibleStandardWallet } from '@solana/wallet-adapter-base';
const { get, on } = getWallets();
let standardAdapters = [...wrapWalletsWithAdapters(get())];
export function watchStandard(callback) {
    const listeners = [
        on('register', (...wallets) => {
            if (!standardAdapters || standardAdapters.length === 0) {
                standardAdapters = [...wrapWalletsWithAdapters(wallets)];
            }
            else {
                standardAdapters = [...standardAdapters, ...wrapWalletsWithAdapters(wallets)];
            }
            callback(standardAdapters);
        }),
        on('unregister', (...wallets) => {
            standardAdapters = standardAdapters.filter(standardAdapter => wallets.some(wallet => wallet.name === standardAdapter.wallet.name));
            callback(standardAdapters);
        })
    ];
    return () => listeners.forEach(off => off());
}
function wrapWalletsWithAdapters(wallets) {
    return wallets
        .filter(isWalletAdapterCompatibleStandardWallet)
        .map(wallet => new StandardWalletAdapter({ wallet }));
}
//# sourceMappingURL=watchStandard.js.map