import {
  AssetUtil,
  ChainController,
  CoreHelperUtil,
  NetworkController,
  RouterController,
  type CaipNetwork
} from '@web3modal/core'
import { customElement } from '@web3modal/ui'

import { html, LitElement } from 'lit'
import { state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import styles from './styles.js'
import { ConstantsUtil } from '@web3modal/common'

@customElement('w3m-connecting-multi-chain-view')
export class W3mConnectingMultiChainView extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @state() protected activeConnector = ChainController.state.activeConnector

  public constructor() {
    super()
    this.unsubscribe.push(
      ...[ChainController.subscribeKey('activeConnector', val => (this.activeConnector = val))]
    )
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['m', 'xl', 'xl', 'xl'] as const}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${ifDefined(this.activeConnector?.imageUrl)}
          ></wui-wallet-image>
        </wui-flex>

        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${['0', 's', '0', 's'] as const}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${['xs', '0', 'xs', '0'] as const}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `
  }

  // Private Methods ------------------------------------- //
  private networksTemplate() {
    const requestedCaipNetworks = NetworkController.getRequestedCaipNetworks()
    const approvedCaipNetworkIds = NetworkController.state.approvedCaipNetworkIds
    const supportsAllNetworks = NetworkController.state.supportsAllNetworks
    const chains = ChainController.state.chains

    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(
      approvedCaipNetworkIds,
      requestedCaipNetworks
    )

    const networks: CaipNetwork[] | null | undefined = []

    if (chains.get(ConstantsUtil.CHAIN.EVM)) {
      const network = sortedNetworks.find(element => element.name === 'Ethereum')
      if (network) {
        networks.push(network)
      }
    }
    if (chains.get(ConstantsUtil.CHAIN.SOLANA)) {
      const network = sortedNetworks.find(element => element.name === 'Solana')
      if (network) {
        networks.push(network)
      }
    }

    return networks?.map(
      network => html`
        <wui-list-wallet
          imageSrc=${ifDefined(AssetUtil.getNetworkImage(network))}
          type="network"
          tagLabel="installed"
          tagVariant="main"
          name=${network.name ?? network.id}
          @click=${() => this.onSwitchNetwork(network)}
          .disabled=${!supportsAllNetworks && !approvedCaipNetworkIds?.includes(network.id)}
        ></wui-list-wallet>
      `
    )
  }

  private onSwitchNetwork(network: CaipNetwork) {
    NetworkController.setCaipNetwork(network)
    if (network.name === ConstantsUtil.CHAIN_NAME.EVM) {
      const connector = this.activeConnector?.providers?.find(
        provider => provider.chain === ConstantsUtil.CHAIN.EVM
      )
      RouterController.push('ConnectingExternal', { connector })
    } else if (network.name === ConstantsUtil.CHAIN_NAME.SOLANA) {
      const connector = this.activeConnector?.providers?.find(
        provider => provider.chain === ConstantsUtil.CHAIN.SOLANA
      )
      RouterController.push('ConnectingExternal', { connector })
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-connecting-multi-chain-view': W3mConnectingMultiChainView
  }
}
