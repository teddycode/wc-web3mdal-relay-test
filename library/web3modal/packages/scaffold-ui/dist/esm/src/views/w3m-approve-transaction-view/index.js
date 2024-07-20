var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import styles from './styles.js';
import { ModalController, ConnectorController, ThemeController, RouterController } from '@web3modal/core';
import { getW3mThemeVariables } from '@web3modal/common';
const PAGE_HEIGHT = 400;
const PAGE_WIDTH = 360;
const HEADER_HEIGHT = 64;
let W3mApproveTransactionView = class W3mApproveTransactionView extends LitElement {
    constructor() {
        super();
        this.bodyObserver = undefined;
        this.unsubscribe = [];
        this.iframe = document.getElementById('w3m-iframe');
        this.ready = false;
        this.unsubscribe.push(...[
            ModalController.subscribeKey('open', isOpen => {
                if (!isOpen) {
                    this.onHideIframe();
                    RouterController.popTransactionStack();
                }
            })
        ]);
    }
    disconnectedCallback() {
        this.onHideIframe();
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
        this.bodyObserver?.unobserve(window.document.body);
    }
    async firstUpdated() {
        await this.syncTheme();
        this.iframe.style.display = 'block';
        this.bodyObserver = new ResizeObserver(entries => {
            const contentBoxSize = entries?.[0]?.contentBoxSize;
            const width = contentBoxSize?.[0]?.inlineSize;
            this.iframe.style.height = `${PAGE_HEIGHT}px`;
            if (width && width <= 430) {
                this.iframe.style.width = '100%';
                this.iframe.style.left = '0px';
                this.iframe.style.bottom = '0px';
                this.iframe.style.top = 'unset';
            }
            else {
                this.iframe.style.width = `${PAGE_WIDTH}px`;
                this.iframe.style.left = `calc(50% - ${PAGE_WIDTH / 2}px)`;
                this.iframe.style.top = `calc(50% - ${PAGE_HEIGHT / 2}px + ${HEADER_HEIGHT / 2}px)`;
                this.iframe.style.bottom = 'unset';
            }
            this.ready = true;
        });
        this.bodyObserver.observe(window.document.body);
    }
    render() {
        if (this.ready) {
            this.onShowIframe();
        }
        return html `<div data-ready=${this.ready}></div>`;
    }
    onShowIframe() {
        const isMobile = window.innerWidth <= 430;
        this.iframe.animate([
            { opacity: 0, transform: isMobile ? 'translateY(50px)' : 'scale(.95)' },
            { opacity: 1, transform: isMobile ? 'translateY(0)' : 'scale(1)' }
        ], { duration: 200, easing: 'ease', fill: 'forwards' });
    }
    async onHideIframe() {
        this.iframe.style.display = 'none';
        await this.iframe.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            easing: 'ease',
            fill: 'forwards'
        }).finished;
    }
    async syncTheme() {
        const authConnector = ConnectorController.getAuthConnector();
        if (authConnector) {
            const themeMode = ThemeController.getSnapshot().themeMode;
            const themeVariables = ThemeController.getSnapshot().themeVariables;
            await authConnector.provider.syncTheme({
                themeVariables,
                w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
            });
        }
    }
};
W3mApproveTransactionView.styles = styles;
__decorate([
    state()
], W3mApproveTransactionView.prototype, "ready", void 0);
W3mApproveTransactionView = __decorate([
    customElement('w3m-approve-transaction-view')
], W3mApproveTransactionView);
export { W3mApproveTransactionView };
//# sourceMappingURL=index.js.map