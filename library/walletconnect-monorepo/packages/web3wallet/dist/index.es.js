import{AuthClient as N}from"@walletconnect/auth-client";import{SignClient as W,SessionStore as I}from"@walletconnect/sign-client";import{Core as m}from"@walletconnect/core";var l={exports:{}},c=typeof Reflect=="object"?Reflect:null,y=c&&typeof c.apply=="function"?c.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)},f;c&&typeof c.ownKeys=="function"?f=c.ownKeys:Object.getOwnPropertySymbols?f=function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:f=function(t){return Object.getOwnPropertyNames(t)};function k(s){console&&console.warn&&console.warn(s)}var w=Number.isNaN||function(t){return t!==t};function o(){o.init.call(this)}l.exports=o,l.exports.once=K,o.EventEmitter=o,o.prototype._events=void 0,o.prototype._eventsCount=0,o.prototype._maxListeners=void 0;var L=10;function g(s){if(typeof s!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof s)}Object.defineProperty(o,"defaultMaxListeners",{enumerable:!0,get:function(){return L},set:function(s){if(typeof s!="number"||s<0||w(s))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+s+".");L=s}}),o.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},o.prototype.setMaxListeners=function(t){if(typeof t!="number"||t<0||w(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this};function _(s){return s._maxListeners===void 0?o.defaultMaxListeners:s._maxListeners}o.prototype.getMaxListeners=function(){return _(this)},o.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var i=t==="error",a=this._events;if(a!==void 0)i=i&&a.error===void 0;else if(!i)return!1;if(i){var r;if(e.length>0&&(r=e[0]),r instanceof Error)throw r;var h=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw h.context=r,h}var u=a[t];if(u===void 0)return!1;if(typeof u=="function")y(u,this,e);else for(var d=u.length,M=O(u,d),n=0;n<d;++n)y(M[n],this,e);return!0};function S(s,t,e,n){var i,a,r;if(g(e),a=s._events,a===void 0?(a=s._events=Object.create(null),s._eventsCount=0):(a.newListener!==void 0&&(s.emit("newListener",t,e.listener?e.listener:e),a=s._events),r=a[t]),r===void 0)r=a[t]=e,++s._eventsCount;else if(typeof r=="function"?r=a[t]=n?[e,r]:[r,e]:n?r.unshift(e):r.push(e),i=_(s),i>0&&r.length>i&&!r.warned){r.warned=!0;var h=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");h.name="MaxListenersExceededWarning",h.emitter=s,h.type=t,h.count=r.length,k(h)}return s}o.prototype.addListener=function(t,e){return S(this,t,e,!1)},o.prototype.on=o.prototype.addListener,o.prototype.prependListener=function(t,e){return S(this,t,e,!0)};function D(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function C(s,t,e){var n={fired:!1,wrapFn:void 0,target:s,type:t,listener:e},i=D.bind(n);return i.listener=e,n.wrapFn=i,i}o.prototype.once=function(t,e){return g(e),this.on(t,C(this,t,e)),this},o.prototype.prependOnceListener=function(t,e){return g(e),this.prependListener(t,C(this,t,e)),this},o.prototype.removeListener=function(t,e){var n,i,a,r,h;if(g(e),i=this._events,i===void 0)return this;if(n=i[t],n===void 0)return this;if(n===e||n.listener===e)--this._eventsCount===0?this._events=Object.create(null):(delete i[t],i.removeListener&&this.emit("removeListener",t,n.listener||e));else if(typeof n!="function"){for(a=-1,r=n.length-1;r>=0;r--)if(n[r]===e||n[r].listener===e){h=n[r].listener,a=r;break}if(a<0)return this;a===0?n.shift():F(n,a),n.length===1&&(i[t]=n[0]),i.removeListener!==void 0&&this.emit("removeListener",t,h||e)}return this},o.prototype.off=o.prototype.removeListener,o.prototype.removeAllListeners=function(t){var e,n,i;if(n=this._events,n===void 0)return this;if(n.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):n[t]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete n[t]),this;if(arguments.length===0){var a=Object.keys(n),r;for(i=0;i<a.length;++i)r=a[i],r!=="removeListener"&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(e=n[t],typeof e=="function")this.removeListener(t,e);else if(e!==void 0)for(i=e.length-1;i>=0;i--)this.removeListener(t,e[i]);return this};function b(s,t,e){var n=s._events;if(n===void 0)return[];var i=n[t];return i===void 0?[]:typeof i=="function"?e?[i.listener||i]:[i]:e?z(i):O(i,i.length)}o.prototype.listeners=function(t){return b(this,t,!0)},o.prototype.rawListeners=function(t){return b(this,t,!1)},o.listenerCount=function(s,t){return typeof s.listenerCount=="function"?s.listenerCount(t):E.call(s,t)},o.prototype.listenerCount=E;function E(s){var t=this._events;if(t!==void 0){var e=t[s];if(typeof e=="function")return 1;if(e!==void 0)return e.length}return 0}o.prototype.eventNames=function(){return this._eventsCount>0?f(this._events):[]};function O(s,t){for(var e=new Array(t),n=0;n<t;++n)e[n]=s[n];return e}function F(s,t){for(;t+1<s.length;t++)s[t]=s[t+1];s.pop()}function z(s){for(var t=new Array(s.length),e=0;e<t.length;++e)t[e]=s[e].listener||s[e];return t}function K(s,t){return new Promise(function(e,n){function i(r){s.removeListener(t,a),n(r)}function a(){typeof s.removeListener=="function"&&s.removeListener("error",i),e([].slice.call(arguments))}R(s,t,a,{once:!0}),t!=="error"&&U(s,i,{once:!0})})}function U(s,t,e){typeof s.on=="function"&&R(s,"error",t,e)}function R(s,t,e,n){if(typeof s.on=="function")n.once?s.once(t,e):s.on(t,e);else if(typeof s.addEventListener=="function")s.addEventListener(t,function i(a){n.once&&s.removeEventListener(t,i),e(a)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof s)}const A="wc",X=2,p="Web3Wallet",$=`${A}@2:${p}:`,G={database:":memory:"},H="request";class Q extends l.exports{constructor(){super()}}class x{constructor(t){this.opts=t}}class P{constructor(t){this.client=t}}var V=Object.defineProperty,B=Object.defineProperties,J=Object.getOwnPropertyDescriptors,q=Object.getOwnPropertySymbols,Y=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable,j=(s,t,e)=>t in s?V(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,ee=(s,t)=>{for(var e in t||(t={}))Y.call(t,e)&&j(s,e,t[e]);if(q)for(var e of q(t))Z.call(t,e)&&j(s,e,t[e]);return s},te=(s,t)=>B(s,J(t));class se extends P{constructor(t){super(t),this.init=async()=>{this.signClient=await W.init({core:this.client.core,metadata:this.client.metadata,signConfig:this.client.signConfig}),this.authClient=await N.init({core:this.client.core,projectId:"",metadata:this.client.metadata})},this.pair=async e=>{await this.client.core.pairing.pair(e)},this.approveSession=async e=>{const{topic:n,acknowledged:i}=await this.signClient.approve(te(ee({},e),{id:e.id,namespaces:e.namespaces,sessionProperties:e.sessionProperties,sessionConfig:e.sessionConfig}));return await i(),this.signClient.session.get(n)},this.rejectSession=async e=>await this.signClient.reject(e),this.updateSession=async e=>await this.signClient.update(e),this.extendSession=async e=>await this.signClient.extend(e),this.respondSessionRequest=async e=>await this.signClient.respond(e),this.disconnectSession=async e=>await this.signClient.disconnect(e),this.emitSessionEvent=async e=>await this.signClient.emit(e),this.getActiveSessions=()=>this.signClient.session.getAll().reduce((e,n)=>(e[n.topic]=n,e),{}),this.getPendingSessionProposals=()=>this.signClient.proposal.getAll(),this.getPendingSessionRequests=()=>this.signClient.getPendingSessionRequests(),this.respondAuthRequest=async(e,n)=>await this.authClient.respond(e,n),this.getPendingAuthRequests=()=>this.authClient.requests.getAll().filter(e=>"requester"in e),this.formatMessage=(e,n)=>this.authClient.formatMessage(e,n),this.approveSessionAuthenticate=async e=>await this.signClient.approveSessionAuthenticate(e),this.rejectSessionAuthenticate=async e=>await this.signClient.rejectSessionAuthenticate(e),this.formatAuthMessage=e=>this.signClient.formatAuthMessage(e),this.registerDeviceToken=e=>this.client.core.echoClient.registerDeviceToken(e),this.on=(e,n)=>(this.setEvent(e,"off"),this.setEvent(e,"on"),this.client.events.on(e,n)),this.once=(e,n)=>(this.setEvent(e,"off"),this.setEvent(e,"once"),this.client.events.once(e,n)),this.off=(e,n)=>(this.setEvent(e,"off"),this.client.events.off(e,n)),this.removeListener=(e,n)=>(this.setEvent(e,"removeListener"),this.client.events.removeListener(e,n)),this.onSessionRequest=e=>{this.client.events.emit("session_request",e)},this.onSessionProposal=e=>{this.client.events.emit("session_proposal",e)},this.onSessionDelete=e=>{this.client.events.emit("session_delete",e)},this.onAuthRequest=e=>{this.client.events.emit("auth_request",e)},this.onProposalExpire=e=>{this.client.events.emit("proposal_expire",e)},this.onSessionRequestExpire=e=>{this.client.events.emit("session_request_expire",e)},this.onSessionRequestAuthenticate=e=>{this.client.events.emit("session_authenticate",e)},this.setEvent=(e,n)=>{switch(e){case"session_request":this.signClient.events[n]("session_request",this.onSessionRequest);break;case"session_proposal":this.signClient.events[n]("session_proposal",this.onSessionProposal);break;case"session_delete":this.signClient.events[n]("session_delete",this.onSessionDelete);break;case"auth_request":this.authClient[n]("auth_request",this.onAuthRequest);break;case"proposal_expire":this.signClient.events[n]("proposal_expire",this.onProposalExpire);break;case"session_request_expire":this.signClient.events[n]("session_request_expire",this.onSessionRequestExpire);break;case"session_authenticate":this.signClient.events[n]("session_authenticate",this.onSessionRequestAuthenticate);break}},this.signClient={},this.authClient={}}}const ne={decryptMessage:async s=>{const t={core:new m({storageOptions:s.storageOptions,storage:s.storage})};await t.core.crypto.init();const e=t.core.crypto.decode(s.topic,s.encryptedMessage);return t.core=null,e},getMetadata:async s=>{const t={core:new m({storageOptions:s.storageOptions,storage:s.storage}),sessionStore:null};t.sessionStore=new I(t.core,t.core.logger),await t.sessionStore.init();const e=t.sessionStore.get(s.topic),n=e?.peer.metadata;return t.core=null,t.sessionStore=null,n}},T=class extends x{constructor(s){super(s),this.events=new l.exports,this.on=(t,e)=>this.engine.on(t,e),this.once=(t,e)=>this.engine.once(t,e),this.off=(t,e)=>this.engine.off(t,e),this.removeListener=(t,e)=>this.engine.removeListener(t,e),this.pair=async t=>{try{return await this.engine.pair(t)}catch(e){throw this.logger.error(e.message),e}},this.approveSession=async t=>{try{return await this.engine.approveSession(t)}catch(e){throw this.logger.error(e.message),e}},this.rejectSession=async t=>{try{return await this.engine.rejectSession(t)}catch(e){throw this.logger.error(e.message),e}},this.updateSession=async t=>{try{return await this.engine.updateSession(t)}catch(e){throw this.logger.error(e.message),e}},this.extendSession=async t=>{try{return await this.engine.extendSession(t)}catch(e){throw this.logger.error(e.message),e}},this.respondSessionRequest=async t=>{try{return await this.engine.respondSessionRequest(t)}catch(e){throw this.logger.error(e.message),e}},this.disconnectSession=async t=>{try{return await this.engine.disconnectSession(t)}catch(e){throw this.logger.error(e.message),e}},this.emitSessionEvent=async t=>{try{return await this.engine.emitSessionEvent(t)}catch(e){throw this.logger.error(e.message),e}},this.getActiveSessions=()=>{try{return this.engine.getActiveSessions()}catch(t){throw this.logger.error(t.message),t}},this.getPendingSessionProposals=()=>{try{return this.engine.getPendingSessionProposals()}catch(t){throw this.logger.error(t.message),t}},this.getPendingSessionRequests=()=>{try{return this.engine.getPendingSessionRequests()}catch(t){throw this.logger.error(t.message),t}},this.respondAuthRequest=async(t,e)=>{try{return await this.engine.respondAuthRequest(t,e)}catch(n){throw this.logger.error(n.message),n}},this.getPendingAuthRequests=()=>{try{return this.engine.getPendingAuthRequests()}catch(t){throw this.logger.error(t.message),t}},this.formatMessage=(t,e)=>{try{return this.engine.formatMessage(t,e)}catch(n){throw this.logger.error(n.message),n}},this.registerDeviceToken=t=>{try{return this.engine.registerDeviceToken(t)}catch(e){throw this.logger.error(e.message),e}},this.approveSessionAuthenticate=t=>{try{return this.engine.approveSessionAuthenticate(t)}catch(e){throw this.logger.error(e.message),e}},this.rejectSessionAuthenticate=t=>{try{return this.engine.rejectSessionAuthenticate(t)}catch(e){throw this.logger.error(e.message),e}},this.formatAuthMessage=t=>{try{return this.engine.formatAuthMessage(t)}catch(e){throw this.logger.error(e.message),e}},this.metadata=s.metadata,this.name=s.name||p,this.signConfig=s.signConfig,this.core=s.core,this.logger=this.core.logger,this.engine=new se(this)}static async init(s){const t=new T(s);return await t.initialize(),t}async initialize(){this.logger.trace("Initialized");try{await this.engine.init(),this.logger.info("Web3Wallet Initialization Success")}catch(s){throw this.logger.info("Web3Wallet Initialization Failure"),this.logger.error(s.message),s}}};let v=T;v.notifications=ne;const ie=v;export{p as CLIENT_CONTEXT,G as CLIENT_STORAGE_OPTIONS,$ as CLIENT_STORAGE_PREFIX,x as IWeb3Wallet,P as IWeb3WalletEngine,Q as IWeb3WalletEvents,A as PROTOCOL,X as PROTOCOL_VERSION,H as REQUEST_CONTEXT,ie as Web3Wallet,v as default};
//# sourceMappingURL=index.es.js.map
