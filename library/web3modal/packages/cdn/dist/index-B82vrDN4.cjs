"use strict";const i=require("./client-BYmlJJQZ.cjs"),n=i.proxy({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),U={state:n,subscribe(e){return i.subscribe(n,()=>e(n))},push(e,t){e!==n.view&&(n.view=e,t&&(n.data=t),n.history.push(e))},reset(e){n.view=e,n.history=[e]},replace(e){n.history.length>1&&(n.history[n.history.length-1]=e,n.view=e)},goBack(){if(n.history.length>1){n.history.pop();const[e]=n.history.slice(-1);n.view=e}},setData(e){n.data=e}},r={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return r.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return r.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,s){if(r.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let o=e;o.includes("://")||(o=e.replaceAll("/","").replaceAll(":",""),o=`${o}://`),o.endsWith("/")||(o=`${o}/`),this.setWalletConnectDeepLink(o,s);const l=encodeURIComponent(t);return`${o}wc?uri=${l}`},formatUniversalUrl(e,t,s){if(!r.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let o=e;o.endsWith("/")||(o=`${o}/`),this.setWalletConnectDeepLink(o,s);const l=encodeURIComponent(t);return`${o}wc?uri=${l}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(r.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(r.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(r.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(r.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=U.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},R=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),a=i.proxy({enabled:R,userSessionId:"",events:[],connectedWalletId:void 0}),P={state:a,subscribe(e){return i.subscribe(a.events,()=>e(i.snapshot(a.events[a.events.length-1])))},initialize(){a.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(a.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){a.connectedWalletId=e},click(e){if(a.enabled){const t={type:"CLICK",name:e.name,userSessionId:a.userSessionId,timestamp:Date.now(),data:e};a.events.push(t)}},track(e){if(a.enabled){const t={type:"TRACK",name:e.name,userSessionId:a.userSessionId,timestamp:Date.now(),data:e};a.events.push(t)}},view(e){if(a.enabled){const t={type:"VIEW",name:e.name,userSessionId:a.userSessionId,timestamp:Date.now(),data:e};a.events.push(t)}}},p=i.proxy({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),c={state:p,subscribe(e){return i.subscribe(p,()=>e(p))},setChains(e){p.chains=e},setWalletConnectUri(e){p.walletConnectUri=e},setIsCustomDesktop(e){p.isCustomDesktop=e},setIsCustomMobile(e){p.isCustomMobile=e},setIsDataLoaded(e){p.isDataLoaded=e},setIsUiLoaded(e){p.isUiLoaded=e},setIsAuth(e){p.isAuth=e}},C=i.proxy({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),b={state:C,subscribe(e){return i.subscribe(C,()=>e(C))},setConfig(e){var t,s;P.initialize(),c.setChains(e.chains),c.setIsAuth(!!e.enableAuthMode),c.setIsCustomMobile(!!((t=e.mobileWallets)!=null&&t.length)),c.setIsCustomDesktop(!!((s=e.desktopWallets)!=null&&s.length)),r.setModalVersionInStorage(),Object.assign(C,e)}};var V=Object.defineProperty,D=Object.getOwnPropertySymbols,H=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,k=(e,t,s)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,K=(e,t)=>{for(var s in t||(t={}))H.call(t,s)&&k(e,s,t[s]);if(D)for(var s of D(t))B.call(t,s)&&k(e,s,t[s]);return e};const L="https://explorer-api.walletconnect.com",O="wcm",E="js-2.6.2";async function w(e,t){const s=K({sdkType:O,sdkVersion:E},t),o=new URL(e,L);return o.searchParams.append("projectId",b.state.projectId),Object.entries(s).forEach(([l,d])=>{d&&o.searchParams.append(l,String(d))}),(await fetch(o)).json()}const m={async getDesktopListings(e){return w("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return w("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return w("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return w("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${L}/w3m/v1/getWalletImage/${e}?projectId=${b.state.projectId}&sdkType=${O}&sdkVersion=${E}`},getAssetImageUrl(e){return`${L}/w3m/v1/getAssetImage/${e}?projectId=${b.state.projectId}&sdkType=${O}&sdkVersion=${E}`}};var z=Object.defineProperty,S=Object.getOwnPropertySymbols,q=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable,x=(e,t,s)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,F=(e,t)=>{for(var s in t||(t={}))q.call(t,s)&&x(e,s,t[s]);if(S)for(var s of S(t))J.call(t,s)&&x(e,s,t[s]);return e};const N=r.isMobile(),u=i.proxy({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),G={state:u,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=b.state;if(e==="NONE"||t==="ALL"&&!e)return u.recomendedWallets;if(r.isArray(e)){const s={recommendedIds:e.join(",")},{listings:o}=await m.getAllListings(s),l=Object.values(o);l.sort((d,h)=>{const I=e.indexOf(d.id),f=e.indexOf(h.id);return I-f}),u.recomendedWallets=l}else{const{chains:s,isAuth:o}=c.state,l=s==null?void 0:s.join(","),d=r.isArray(t),h={page:1,sdks:o?"auth_v1":void 0,entries:r.RECOMMENDED_WALLET_AMOUNT,chains:l,version:2,excludedIds:d?t.join(","):void 0},{listings:I}=N?await m.getMobileListings(h):await m.getDesktopListings(h);u.recomendedWallets=Object.values(I)}return u.recomendedWallets},async getWallets(e){const t=F({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:o}=b.state,{recomendedWallets:l}=u;if(o==="ALL")return u.wallets;l.length?t.excludedIds=l.map($=>$.id).join(","):r.isArray(s)&&(t.excludedIds=s.join(",")),r.isArray(o)&&(t.excludedIds=[t.excludedIds,o].filter(Boolean).join(",")),c.state.isAuth&&(t.sdks="auth_v1");const{page:d,search:h}=e,{listings:I,total:f}=N?await m.getMobileListings(t):await m.getDesktopListings(t),M=Object.values(I),j=h?"search":"wallets";return u[j]={listings:[...u[j].listings,...M],total:f,page:d??1},{listings:M,total:f}},getWalletImageUrl(e){return m.getWalletImageUrl(e)},getAssetImageUrl(e){return m.getAssetImageUrl(e)},resetSearch(){u.search={listings:[],total:0,page:1}}},y=i.proxy({open:!1}),W={state:y,subscribe(e){return i.subscribe(y,()=>e(y))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:o}=c.state;if(r.removeWalletConnectDeepLink(),c.setWalletConnectUri(e==null?void 0:e.uri),c.setChains(e==null?void 0:e.chains),U.reset("ConnectWallet"),s&&o)y.open=!0,t();else{const l=setInterval(()=>{const d=c.state;d.isUiLoaded&&d.isDataLoaded&&(clearInterval(l),y.open=!0,t())},200)}})},close(){y.open=!1}};var Q=Object.defineProperty,T=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable,_=(e,t,s)=>t in e?Q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Z=(e,t)=>{for(var s in t||(t={}))X.call(t,s)&&_(e,s,t[s]);if(T)for(var s of T(t))Y.call(t,s)&&_(e,s,t[s]);return e};function ee(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const v=i.proxy({themeMode:ee()?"dark":"light"}),A={state:v,subscribe(e){return i.subscribe(v,()=>e(v))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(v.themeMode=t),s&&(v.themeVariables=Z({},s))}},g=i.proxy({open:!1,message:"",variant:"success"}),te={state:g,subscribe(e){return i.subscribe(g,()=>e(g))},openToast(e,t){g.open=!0,g.message=e,g.variant=t},closeToast(){g.open=!1}};class se{constructor(t){this.openModal=W.open,this.closeModal=W.close,this.subscribeModal=W.subscribe,this.setTheme=A.setThemeConfig,A.setThemeConfig(t),b.setConfig(t),this.initUi()}async initUi(){if(typeof window<"u"){await Promise.resolve().then(()=>require("./index-Df1g14jz.cjs"));const t=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",t),c.setIsUiLoaded(!0)}}}const oe=Object.freeze(Object.defineProperty({__proto__:null,WalletConnectModal:se},Symbol.toStringTag,{value:"Module"}));exports.R=P;exports.T=U;exports.a=r;exports.index=oe;exports.ne=A;exports.oe=te;exports.p=c;exports.se=W;exports.te=G;exports.y=b;
