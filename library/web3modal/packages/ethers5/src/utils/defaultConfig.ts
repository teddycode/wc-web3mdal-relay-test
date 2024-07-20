import '@web3modal/polyfills'
import type { Chain, Metadata, Provider, ProviderType } from '@web3modal/scaffold-utils/ethers'
import { CoinbaseWalletSDK, type ProviderInterface } from '@coinbase/wallet-sdk'

export interface ConfigOptions {
  enableEIP6963?: boolean
  enableCoinbase?: boolean
  enableInjected?: boolean
  rpcUrl?: string
  defaultChainId?: number
  metadata: Metadata
  chains?: Chain[]
  coinbasePreference?: 'all' | 'smartWalletOnly' | 'eoaOnly'
}

export function defaultConfig(options: ConfigOptions) {
  const { enableEIP6963 = true, enableInjected = true, enableCoinbase = true, metadata } = options

  let injectedProvider: Provider | undefined = undefined
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  let coinbaseProvider: ProviderInterface | undefined = undefined

  const providers: ProviderType = { metadata }

  function getInjectedProvider() {
    if (injectedProvider) {
      return injectedProvider
    }

    if (typeof window === 'undefined') {
      return undefined
    }

    if (!window.ethereum) {
      return undefined
    }

    //  @ts-expect-error window.ethereum satisfies Provider
    injectedProvider = window.ethereum

    return injectedProvider
  }

  function getCoinbaseProvider() {
    if (coinbaseProvider) {
      return coinbaseProvider
    }

    if (typeof window === 'undefined') {
      return undefined
    }

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
      appChainIds: options.chains?.map(chain => chain.chainId) || [1, 84532]
    })

    coinbaseProvider = coinbaseWallet.makeWeb3Provider({
      /**
       * Determines which wallet options to display in Coinbase Wallet SDK.
       * @property options
       *   - `all`: Show both smart wallet and EOA options.
       *   - `smartWalletOnly`: Show only smart wallet options.
       *   - `eoaOnly`: Show only EOA options.
       * @see https://www.smartwallet.dev/sdk/v3-to-v4-changes#parameters
       */
      options: options.coinbasePreference || 'all'
    })

    return coinbaseProvider
  }

  if (enableCoinbase) {
    providers.coinbase = getCoinbaseProvider()
  }

  if (enableInjected) {
    providers.injected = getInjectedProvider()
  }

  if (enableEIP6963) {
    providers.EIP6963 = true
  }

  return providers
}
