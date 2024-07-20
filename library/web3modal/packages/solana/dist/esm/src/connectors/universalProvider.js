import { UniversalProvider as Provider } from '@walletconnect/universal-provider';
import { SolStoreUtil } from '../utils/scaffold/SolanaStoreUtil.js';
const DEFAULT_LOGGER = 'error';
export class UniversalProviderFactory {
    static setSettings(params) {
        UniversalProviderFactory.relayerRegion = params.relayerRegion;
        UniversalProviderFactory.projectId = params.projectId;
        UniversalProviderFactory.metadata = params.metadata;
    }
    static async init() {
        UniversalProviderFactory.provider = await Provider.init({
            logger: DEFAULT_LOGGER,
            relayUrl: UniversalProviderFactory.relayerRegion,
            projectId: UniversalProviderFactory.projectId,
            metadata: UniversalProviderFactory.metadata
        });
        UniversalProviderFactory.provider.on('session_delete', () => {
            SolStoreUtil.setAddress('');
        });
    }
    static async getProvider() {
        if (!UniversalProviderFactory.provider) {
            await UniversalProviderFactory.init();
            if (!UniversalProviderFactory.provider) {
                throw new Error('Failed to initialize universal provider');
            }
        }
        return UniversalProviderFactory.provider;
    }
}
//# sourceMappingURL=universalProvider.js.map