import type { Web3ModalOptions } from '../src/client.js';
import { Web3Modal } from '../src/client.js';
import type { Eip1193Provider } from 'ethers';
export type { Web3ModalOptions } from '../src/client.js';
export declare function createWeb3Modal(options: Web3ModalOptions): Web3Modal;
export declare function useWeb3ModalProvider(): {
    walletProvider: Eip1193Provider | undefined;
    walletProviderType: "walletConnect" | "injected" | "coinbaseWallet" | "eip6963" | "w3mAuth" | "coinbaseWalletSDK" | undefined;
};
export declare function useDisconnect(): {
    disconnect: () => Promise<void>;
};
export declare function useSwitchNetwork(): {
    switchNetwork: (chainId: number) => Promise<void>;
};
export declare function useWeb3ModalAccount(): {
    address: `0x${string}` | undefined;
    isConnected: boolean;
    chainId: number | undefined;
    status: import("@web3modal/scaffold-utils/ethers").Status;
};
export declare function useWeb3ModalError(): {
    error: unknown;
};
export { useWeb3ModalTheme, useWeb3Modal, useWeb3ModalState, useWeb3ModalEvents, useWalletInfo } from '@web3modal/scaffold-react';
export { defaultConfig } from '../src/utils/defaultConfig.js';
