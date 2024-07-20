var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RouterController, TooltipController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import styles from './styles.js';
let W3mRouter = class W3mRouter extends LitElement {
    constructor() {
        super();
        this.resizeObserver = undefined;
        this.prevHeight = '0px';
        this.prevHistoryLength = 1;
        this.unsubscribe = [];
        this.view = RouterController.state.view;
        this.unsubscribe.push(RouterController.subscribeKey('view', val => this.onViewChange(val)));
    }
    firstUpdated() {
        this.resizeObserver = new ResizeObserver(async ([content]) => {
            const height = `${content?.contentRect.height}px`;
            if (this.prevHeight !== '0px') {
                await this.animate([{ height: this.prevHeight }, { height }], {
                    duration: 150,
                    easing: 'ease',
                    fill: 'forwards'
                }).finished;
                this.style.height = 'auto';
            }
            this.prevHeight = height;
        });
        this.resizeObserver.observe(this.getWrapper());
    }
    disconnectedCallback() {
        this.resizeObserver?.unobserve(this.getWrapper());
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        return html `<div>${this.viewTemplate()}</div>`;
    }
    viewTemplate() {
        switch (this.view) {
            case 'AccountSettings':
                return html `<w3m-account-settings-view></w3m-account-settings-view>`;
            case 'Account':
                return html `<w3m-account-view></w3m-account-view>`;
            case 'AllWallets':
                return html `<w3m-all-wallets-view></w3m-all-wallets-view>`;
            case 'ApproveTransaction':
                return html `<w3m-approve-transaction-view></w3m-approve-transaction-view>`;
            case 'BuyInProgress':
                return html `<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;
            case 'ChooseAccountName':
                return html `<w3m-choose-account-name-view></w3m-choose-account-name-view>`;
            case 'Connect':
                return html `<w3m-connect-view></w3m-connect-view>`;
            case 'ConnectingWalletConnect':
                return html `<w3m-connecting-wc-view></w3m-connecting-wc-view>`;
            case 'ConnectingExternal':
                return html `<w3m-connecting-external-view></w3m-connecting-external-view>`;
            case 'ConnectingSiwe':
                return html `<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;
            case 'ConnectWallets':
                return html `<w3m-connect-wallets-view></w3m-connect-wallets-view>`;
            case 'ConnectSocials':
                return html `<w3m-connect-socials-view></w3m-connect-socials-view>`;
            case 'ConnectingSocial':
                return html `<w3m-connecting-social-view></w3m-connecting-social-view>`;
            case 'Downloads':
                return html `<w3m-downloads-view></w3m-downloads-view>`;
            case 'EmailVerifyOtp':
                return html `<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;
            case 'EmailVerifyDevice':
                return html `<w3m-email-verify-device-view></w3m-email-verify-device-view>`;
            case 'GetWallet':
                return html `<w3m-get-wallet-view></w3m-get-wallet-view>`;
            case 'Networks':
                return html `<w3m-networks-view></w3m-networks-view>`;
            case 'SwitchNetwork':
                return html `<w3m-network-switch-view></w3m-network-switch-view>`;
            case 'Profile':
                return html `<w3m-profile-view></w3m-profile-view>`;
            case 'SelectAddresses':
                return html `<w3m-select-addresses-view></w3m-select-addresses-view>`;
            case 'SwitchAddress':
                return html `<w3m-switch-address-view></w3m-switch-address-view>`;
            case 'Transactions':
                return html `<w3m-transactions-view></w3m-transactions-view>`;
            case 'OnRampProviders':
                return html `<w3m-onramp-providers-view></w3m-onramp-providers-view>`;
            case 'OnRampActivity':
                return html `<w3m-onramp-activity-view></w3m-onramp-activity-view>`;
            case 'OnRampTokenSelect':
                return html `<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;
            case 'OnRampFiatSelect':
                return html `<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;
            case 'UpgradeEmailWallet':
                return html `<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;
            case 'UpgradeToSmartAccount':
                return html `<w3m-upgrade-to-smart-account-view></w3m-upgrade-to-smart-account-view>`;
            case 'UpdateEmailWallet':
                return html `<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;
            case 'UpdateEmailPrimaryOtp':
                return html `<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;
            case 'UpdateEmailSecondaryOtp':
                return html `<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;
            case 'UnsupportedChain':
                return html `<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;
            case 'Swap':
                return html `<w3m-swap-view></w3m-swap-view>`;
            case 'SwapSelectToken':
                return html `<w3m-swap-select-token-view></w3m-swap-select-token-view>`;
            case 'SwapPreview':
                return html `<w3m-swap-preview-view></w3m-swap-preview-view>`;
            case 'WalletSend':
                return html `<w3m-wallet-send-view></w3m-wallet-send-view>`;
            case 'WalletSendSelectToken':
                return html `<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;
            case 'WalletSendPreview':
                return html `<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;
            case 'WhatIsABuy':
                return html `<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;
            case 'WalletReceive':
                return html `<w3m-wallet-receive-view></w3m-wallet-receive-view>`;
            case 'WalletCompatibleNetworks':
                return html `<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;
            case 'WhatIsAWallet':
                return html `<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;
            case 'WhatIsANetwork':
                return html `<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;
            default:
                return html `<w3m-connect-view></w3m-connect-view>`;
        }
    }
    async onViewChange(newView) {
        TooltipController.hide();
        const { history } = RouterController.state;
        let xOut = -10;
        let xIn = 10;
        if (history.length < this.prevHistoryLength) {
            xOut = 10;
            xIn = -10;
        }
        this.prevHistoryLength = history.length;
        await this.animate([
            { opacity: 1, transform: 'translateX(0px)' },
            { opacity: 0, transform: `translateX(${xOut}px)` }
        ], { duration: 150, easing: 'ease', fill: 'forwards' }).finished;
        this.view = newView;
        await this.animate([
            { opacity: 0, transform: `translateX(${xIn}px)` },
            { opacity: 1, transform: 'translateX(0px)' }
        ], { duration: 150, easing: 'ease', fill: 'forwards', delay: 50 }).finished;
    }
    getWrapper() {
        return this.shadowRoot?.querySelector('div');
    }
};
W3mRouter.styles = styles;
__decorate([
    state()
], W3mRouter.prototype, "view", void 0);
W3mRouter = __decorate([
    customElement('w3m-router')
], W3mRouter);
export { W3mRouter };
//# sourceMappingURL=index.js.map