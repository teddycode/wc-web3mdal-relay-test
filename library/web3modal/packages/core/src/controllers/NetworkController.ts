import { proxy } from 'valtio/vanilla'
import type { CaipNetwork, CaipNetworkId } from '../utils/TypeUtil.js'
import { PublicStateController } from './PublicStateController.js'
import { EventsController } from './EventsController.js'
import { ModalController } from './ModalController.js'
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js'
import { NetworkUtil, type Chain } from '@web3modal/common'
import { ChainController } from './ChainController.js'

// -- Types --------------------------------------------- //
export interface NetworkControllerClient {
  switchCaipNetwork: (network: NetworkControllerState['caipNetwork']) => Promise<void>
  getApprovedCaipNetworksData: () => Promise<{
    approvedCaipNetworkIds: NetworkControllerState['approvedCaipNetworkIds']
    supportsAllNetworks: NetworkControllerState['supportsAllNetworks']
  }>
}

export interface NetworkControllerState {
  supportsAllNetworks: boolean
  isDefaultCaipNetwork: boolean
  isUnsupportedChain?: boolean
  _client?: NetworkControllerClient
  caipNetwork?: CaipNetwork
  requestedCaipNetworks?: CaipNetwork[]
  approvedCaipNetworkIds?: CaipNetworkId[]
  allowUnsupportedChain?: boolean
  smartAccountEnabledNetworks?: number[]
}

// -- State --------------------------------------------- //
const state = proxy<NetworkControllerState>({
  supportsAllNetworks: true,
  isDefaultCaipNetwork: false,
  smartAccountEnabledNetworks: []
})

// -- Controller ---------------------------------------- //
export const NetworkController = {
  state,

  replaceState(newState: NetworkControllerState) {
    Object.assign(state, newState)
  },

  subscribeKey<K extends keyof NetworkControllerState>(
    property: K,
    callback: (val: NetworkControllerState[K]) => void
  ) {
    let prev: NetworkControllerState[K] | undefined = undefined

    return ChainController.subscribeChainProp('networkState', networkState => {
      if (networkState) {
        const nextValue = networkState[property]
        if (prev !== nextValue) {
          prev = nextValue
          callback(nextValue)
        }
      }
    })
  },

  _getClient() {
    return ChainController.getNetworkControllerClient()
  },

  initializeDefaultNetwork() {
    const networks = this.getRequestedCaipNetworks()

    if (networks.length > 0) {
      this.setCaipNetwork(networks[0])
    }
  },

  setCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork']) {
    const chain = ChainController.state.multiChainEnabled
      ? caipNetwork?.chain
      : ChainController.state.activeChain

    if (!chain) {
      throw new Error('chain is required to set active network')
    }

    if (!caipNetwork) {
      throw new Error('caipNetwork is required to set active network')
    }

    ChainController.state.activeCaipNetwork = caipNetwork
    ChainController.state.activeChain = chain
    ChainController.setChainNetworkData(chain, { caipNetwork })
    PublicStateController.set({ activeChain: chain, selectedNetworkId: caipNetwork?.id })

    if (!ChainController.state.chains.get(chain)?.networkState?.allowUnsupportedChain) {
      this.checkIfSupportedNetwork()
    }
  },

  setDefaultCaipNetwork(caipNetwork: NetworkControllerState['caipNetwork'], chain?: Chain) {
    const chainToSet = ChainController.state.multiChainEnabled
      ? chain
      : ChainController.state.activeChain

    if (!chainToSet) {
      throw new Error('chain is required to set default network')
    }

    ChainController.state.activeCaipNetwork = caipNetwork
    ChainController.state.activeChain = chainToSet
    ChainController.setChainNetworkData(chainToSet, { caipNetwork, isDefaultCaipNetwork: true })
    PublicStateController.set({ selectedNetworkId: caipNetwork?.id, activeChain: chain })
  },

  setRequestedCaipNetworks(
    requestedNetworks: NetworkControllerState['requestedCaipNetworks'],
    chain?: Chain
  ) {
    ChainController.setChainNetworkData(
      ChainController.state.multiChainEnabled ? chain : ChainController.state.activeChain,
      { requestedCaipNetworks: requestedNetworks }
    )
  },

  setAllowUnsupportedChain(
    allowUnsupportedChain: NetworkControllerState['allowUnsupportedChain'],
    chain?: Chain
  ) {
    ChainController.setChainNetworkData(chain || ChainController.state.activeChain, {
      allowUnsupportedChain
    })
  },

  setSmartAccountEnabledNetworks(
    smartAccountEnabledNetworks: NetworkControllerState['smartAccountEnabledNetworks'],
    chain?: Chain
  ) {
    ChainController.setChainNetworkData(
      ChainController.state.multiChainEnabled ? chain : ChainController.state.activeChain,
      { smartAccountEnabledNetworks }
    )
  },

  getRequestedCaipNetworks(chainToFilter?: Chain) {
    let chainAdapters: Chain[] | undefined = undefined

    if (!ChainController.state.activeChain) {
      throw new Error('activeChain is required to get requested networks')
    }

    if (chainToFilter) {
      const chain = ChainController.state.multiChainEnabled
        ? chainToFilter
        : ChainController.state.activeChain

      if (!chain) {
        throw new Error('chain is required to get requested networks')
      }

      chainAdapters = [chain]
    } else {
      const chains = ChainController.state.multiChainEnabled
        ? [...ChainController.state.chains.keys()]
        : [ChainController.state.activeChain]

      chainAdapters = chains
    }

    const approvedIds: `${string}:${string}`[] = []
    const requestedNetworks: CaipNetwork[] = []

    chainAdapters.forEach((chn: Chain) => {
      if (ChainController.state.chains.get(chn)?.networkState?.approvedCaipNetworkIds) {
        approvedIds.push(
          ...(ChainController.state.chains.get(chn)?.networkState?.approvedCaipNetworkIds || [])
        )
      }
      if (ChainController.state.chains.get(chn)?.networkState?.requestedCaipNetworks) {
        requestedNetworks.push(
          ...(ChainController.state.chains.get(chn)?.networkState?.requestedCaipNetworks || [])
        )
      }
    })

    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedIds, requestedNetworks)

    return sortedNetworks
  },

  async switchActiveNetwork(network: NetworkControllerState['caipNetwork']) {
    const networkControllerClient = ChainController.getNetworkControllerClient()
    await networkControllerClient.switchCaipNetwork(network)

    const chain = ChainController.state.multiChainEnabled
      ? network?.chain
      : ChainController.state.activeChain

    if (!chain) {
      throw new Error('chain is required to switch active network')
    }

    if (!network) {
      throw new Error('network is required to switch active network')
    }

    ChainController.state.activeCaipNetwork = network
    ChainController.state.activeChain = chain
    ChainController.setChainNetworkData(chain, { caipNetwork: network })
    PublicStateController.set({ activeChain: chain, selectedNetworkId: network.id })

    if (network) {
      EventsController.sendEvent({
        type: 'track',
        event: 'SWITCH_NETWORK',
        properties: { network: network.id }
      })
    }
  },

  getApprovedCaipNetworkIds(chainToFilter?: Chain) {
    if (chainToFilter) {
      const chain = ChainController.state.multiChainEnabled
        ? chainToFilter
        : ChainController.state.activeChain

      if (!chain) {
        throw new Error('chain is required to get approved network IDs')
      }

      return ChainController.state.chains.get(chain)?.networkState?.approvedCaipNetworkIds
    }

    const allCaipNetworkIds: CaipNetworkId[] = []

    Object.values(ChainController.state.chains).forEach(adapter => {
      if (adapter.networkState.approvedCaipNetworkIds) {
        allCaipNetworkIds.push(...(adapter.networkState?.approvedCaipNetworkIds || []))
      }
    })

    return allCaipNetworkIds
  },

  async setApprovedCaipNetworksData(_chain?: Chain) {
    const networkControllerClient = ChainController.getNetworkControllerClient()
    const data = await networkControllerClient.getApprovedCaipNetworksData()

    const chain = ChainController.state.multiChainEnabled
      ? _chain
      : ChainController.state.activeChain

    if (!chain) {
      throw new Error('chain is required to set approved network data')
    }

    ChainController.setChainNetworkData(chain, {
      approvedCaipNetworkIds: data?.approvedCaipNetworkIds,
      supportsAllNetworks: data?.supportsAllNetworks || false
    })
  },

  checkIfSupportedNetwork() {
    const chain = ChainController.state.multiChainEnabled
      ? ChainController.state.activeChain
      : ChainController.state.activeChain

    if (!chain) {
      return false
    }

    const activeCaipNetwork = ChainController.state.chains.get(chain)?.networkState?.caipNetwork

    const requestedCaipNetworks = this.getRequestedCaipNetworks()

    return requestedCaipNetworks?.some(network => network.id === activeCaipNetwork?.id)
  },

  checkIfSmartAccountEnabled() {
    const networkId = NetworkUtil.caipNetworkIdToNumber(ChainController.state.activeCaipNetwork?.id)
    const activeChain = ChainController.state.activeChain

    if (!activeChain) {
      throw new Error('activeChain is required to check if smart account is enabled')
    }

    if (!networkId) {
      return false
    }

    const smartAccountEnabledNetworks =
      ChainController.state.chains.get(activeChain)?.networkState?.smartAccountEnabledNetworks || []

    return Boolean(smartAccountEnabledNetworks?.includes(networkId))
  },

  resetNetwork() {
    const chain = ChainController.state.activeChain

    if (!chain) {
      throw new Error('chain is required to reset network')
    }

    if (!ChainController.state.chains.get(chain)?.networkState?.isDefaultCaipNetwork) {
      ChainController.setChainNetworkData(chain, { caipNetwork: undefined })
    }

    ChainController.setChainNetworkData(chain, {
      approvedCaipNetworkIds: undefined,
      supportsAllNetworks: true,
      smartAccountEnabledNetworks: []
    })
  },

  getSupportsAllNetworks() {
    const chain = ChainController.state.multiChainEnabled
      ? ChainController.state.activeChain
      : ChainController.state.activeChain

    if (!chain) {
      throw new Error('chain is required to check if network supports all networks')
    }

    return ChainController.state.chains.get(chain)?.networkState?.supportsAllNetworks
  },

  showUnsupportedChainUI() {
    setTimeout(() => {
      ModalController.open({ view: 'UnsupportedChain' })
    }, 300)
  }
}
