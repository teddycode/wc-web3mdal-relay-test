"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./client-BYmlJJQZ.cjs"),m=t.i`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation-duration: 0.2s;
    animation-name: zoom-in;
    animation-fill-mode: backwards;
    animation-timing-function: var(--wui-ease-out-power-2);
    outline: none;
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation-name: slide-in;
    }
  }
`;var l=function(c,e,o,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,o):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(c,e,o,i);else for(var a=c.length-1;a>=0;a--)(s=c[a])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r};const u="scroll-lock";exports.W3mModal=class extends t.s{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=t.ModalController.state.open,this.caipAddress=t.AccountController.state.caipAddress,this.isSiweEnabled=t.OptionsController.state.isSiweEnabled,this.connected=t.AccountController.state.isConnected,this.loading=t.ModalController.state.loading,this.initializeTheming(),t.ApiController.prefetch(),this.unsubscribe.push(t.ModalController.subscribeKey("open",e=>e?this.onOpen():this.onClose()),t.ModalController.subscribeKey("loading",e=>{this.loading=e,this.onNewAddress(t.AccountController.state.caipAddress)}),t.AccountController.subscribeKey("isConnected",e=>this.connected=e),t.AccountController.subscribeKey("caipAddress",e=>this.onNewAddress(e)),t.OptionsController.subscribeKey("isSiweEnabled",e=>this.isSiweEnabled=e)),t.EventsController.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?t.x`
          <wui-flex @click=${this.onOverlayClick.bind(this)}>
            <wui-card role="alertdialog" aria-modal="true" tabindex="0">
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){if(this.isSiweEnabled){const{SIWEController:e}=await Promise.resolve().then(()=>require("./index-DNTJAw_t.cjs"));e.state.status!=="success"&&this.connected&&await t.ConnectionController.disconnect()}t.ModalController.close()}initializeTheming(){const{themeVariables:e,themeMode:o}=t.ThemeController.state,i=t.UiHelperUtil.getColorTheme(o);t.initializeTheming(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),t.SnackController.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=u,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${u}"]`);e&&e.remove()}onAddKeyboardListener(){var o;this.abortController=new AbortController;const e=(o=this.shadowRoot)==null?void 0:o.querySelector("wui-card");e==null||e.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:n}=i.target;n&&!n.includes("W3M-")&&!n.includes("WUI-")&&(e==null||e.focus())}},this.abortController)}onRemoveKeyboardListener(){var e;(e=this.abortController)==null||e.abort(),this.abortController=void 0}async onNewAddress(e){var s,a;if(!this.connected||this.loading)return;const o=t.CoreHelperUtil.getPlainAddress(this.caipAddress),i=t.CoreHelperUtil.getPlainAddress(e),n=t.CoreHelperUtil.getNetworkId(this.caipAddress),r=t.CoreHelperUtil.getNetworkId(e);if(this.caipAddress=e,this.isSiweEnabled){const{SIWEController:d}=await Promise.resolve().then(()=>require("./index-DNTJAw_t.cjs")),h=await d.getSession();if(h&&o&&i&&o!==i){(s=d.state._client)!=null&&s.options.signOutOnAccountChange&&(await d.signOut(),this.onSiweNavigation());return}if(h&&n&&r&&n!==r){(a=d.state._client)!=null&&a.options.signOutOnNetworkChange&&(await d.signOut(),this.onSiweNavigation());return}this.onSiweNavigation()}}onSiweNavigation(){this.open?t.RouterController.push("ConnectingSiwe"):t.ModalController.open({view:"ConnectingSiwe"})}};exports.W3mModal.styles=m;l([t.r()],exports.W3mModal.prototype,"open",void 0);l([t.r()],exports.W3mModal.prototype,"caipAddress",void 0);l([t.r()],exports.W3mModal.prototype,"isSiweEnabled",void 0);l([t.r()],exports.W3mModal.prototype,"connected",void 0);l([t.r()],exports.W3mModal.prototype,"loading",void 0);exports.W3mModal=l([t.customElement("w3m-modal")],exports.W3mModal);
