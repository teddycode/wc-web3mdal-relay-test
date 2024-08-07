var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AccountController, ConnectionController, ModalController, OptionsController, RouterController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './styles.js';
let W3mSelectAddressesView = class W3mSelectAddressesView extends LitElement {
    constructor() {
        super();
        this.metadata = OptionsController.state.metadata;
        this.allAccounts = AccountController.state.allAccounts;
        this.selectedAccounts = AccountController.state.allAccounts;
        this.selectAll = true;
        this.approved = false;
        this.isApproving = false;
        this.getAddressTemplate = (account) => {
            const checked = this.selectedAccounts.some(_account => _account.address === account.address);
            return html `<wui-list-account accountAddress="${account.address}" accountType="${account.type}">
      <input
        id="${account.address}"
        slot="action"
        type="checkbox"
        .checked="${checked}"
        @change="${this.handleClick(account)}"
      />
    </wui-list-account>`;
        };
        this.onSelectAll = (event) => {
            const checked = event.target.checked;
            this.selectAll = this.selectedAccounts.length === this.allAccounts.length;
            this.allAccounts.forEach(account => {
                this.onSelect(account, checked);
            });
        };
        this.onSelect = (account, add) => {
            if (add) {
                this.selectedAccounts.push(account);
            }
            else {
                this.selectedAccounts = this.selectedAccounts.filter(a => a.address !== account.address);
            }
            if (this.selectedAccounts.length > 0) {
                this.selectAll = this.selectedAccounts.length === this.allAccounts.length;
            }
        };
        AccountController.subscribeKey('allAccounts', allAccounts => {
            this.allAccounts = allAccounts;
        });
    }
    render() {
        return html `
    <wui-flex justifyContent="center" .padding=${['xl', '0', 'xl', '0']}>
      <wui-banner-img imageSrc="${ifDefined(this.metadata?.icons[0])}" text="${ifDefined(this.metadata?.url)}" size="sm"></wui-banner>
    </wui-flex>
    <wui-flex .padding=${['0', 'xl', '0', 'xl']} flexDirection="row" justifyContent="space-between">
        <wui-text variant="paragraph-400" color="fg-200">Select all</wui-text>
        <input type="checkbox" .checked=${this.selectAll}  @click=${this.onSelectAll.bind(this)} />
    </wui-flex>
      <wui-flex flexDirection="column" .padding=${['l', 'xl', 'xl', 'xl']}>
        ${this.allAccounts.map(account => this.getAddressTemplate(account))}
      </wui-flex>
      <wui-flex .padding=${['l', 'xl', 'xl', 'xl']} gap="s" justifyContent="space-between">
        <wui-button
          size="md"
          ?fullwidth=${true}
          variant="neutral"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="md"
          ?fullwidth=${true}
          variant="main"
          .disabled=${this.selectedAccounts.length === 0}
          @click=${this.onContinue.bind(this)}
          ?loading=${this.isApproving}
        >
          ${this.isApproving ? 'Signing...' : 'Continue'}
        </wui-button>
      </wui-flex>
    `;
    }
    handleClick(account) {
        return (event) => {
            const target = event.target;
            this.onSelect?.({ ...account }, target?.checked);
        };
    }
    onContinue() {
        if (this.selectedAccounts.length > 0) {
            this.isApproving = true;
            AccountController.setAllAccounts(this.selectedAccounts);
            AccountController.setShouldUpdateToAddress(this.selectedAccounts[0]?.address ?? '');
            this.approved = true;
            this.isApproving = false;
            ModalController.close();
        }
        else {
            this.onCancel();
        }
    }
    async onCancel() {
        const { isConnected } = AccountController.state;
        if (isConnected) {
            await ConnectionController.disconnect();
            ModalController.close();
        }
        else {
            RouterController.push('Connect');
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (!this.approved) {
            this.onCancel();
        }
    }
};
W3mSelectAddressesView.styles = styles;
__decorate([
    state()
], W3mSelectAddressesView.prototype, "allAccounts", void 0);
__decorate([
    state()
], W3mSelectAddressesView.prototype, "selectedAccounts", void 0);
__decorate([
    state()
], W3mSelectAddressesView.prototype, "selectAll", void 0);
__decorate([
    state()
], W3mSelectAddressesView.prototype, "approved", void 0);
__decorate([
    state()
], W3mSelectAddressesView.prototype, "isApproving", void 0);
W3mSelectAddressesView = __decorate([
    customElement('w3m-select-addresses-view')
], W3mSelectAddressesView);
export { W3mSelectAddressesView };
//# sourceMappingURL=index.js.map