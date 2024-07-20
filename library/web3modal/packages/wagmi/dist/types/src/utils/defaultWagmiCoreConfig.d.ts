import '@web3modal/polyfills';
import type { CreateConfigParameters, Config } from '@wagmi/core';
import type { SocialProvider } from '@web3modal/scaffold-utils';
export type ConfigOptions = Partial<CreateConfigParameters> & {
    chains: CreateConfigParameters['chains'];
    projectId: string;
    enableEIP6963?: boolean;
    enableCoinbase?: boolean;
    auth?: {
        email?: boolean;
        socials?: SocialProvider[];
        showWallets?: boolean;
        walletFeatures?: boolean;
    };
    enableInjected?: boolean;
    enableWalletConnect?: boolean;
    metadata: {
        name: string;
        description: string;
        url: string;
        icons: string[];
    };
    coinbasePreference?: 'all' | 'smartWalletOnly' | 'eoaOnly';
};
export declare function defaultWagmiConfig({ projectId, chains, metadata, enableCoinbase, enableInjected, auth, enableWalletConnect, enableEIP6963, ...wagmiConfig }: ConfigOptions): Config;
