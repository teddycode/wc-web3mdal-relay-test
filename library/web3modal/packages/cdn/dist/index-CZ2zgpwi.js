import { o as J, q as qr, V as tb, i as eu, X as rb, Y as nb, Z as ab, Q as ob } from "./client-CWmvRiz4.js";
import { r as ib } from "./wagmi-_wo0ICoL.js";
var Vd = {}, ro = {}, Kd = {}, Kn = {}, Zn = {};
const sb = "@safe-global/safe-apps-sdk", cb = "8.1.0", ub = "SDK developed to integrate third-party apps with Safe app.", db = "dist/src/index.js", lb = "dist/src/index.d.ts", fb = [
  "dist/**/*",
  "src/**/*",
  "CHANGELOG.md",
  "README.md"
], bb = !1, mb = [
  "Safe",
  "sdk",
  "apps"
], gb = {
  test: "jest",
  "format-dist": `sed -i '' 's/"files":/"_files":/' dist/package.json`,
  build: "yarn rimraf dist && tsc && yarn format-dist"
}, yb = "Safe (https://safe.global)", _b = "MIT", hb = {
  "@safe-global/safe-gateway-typescript-sdk": "^3.5.3",
  viem: "^1.0.0"
}, pb = {
  type: "git",
  url: "git+https://github.com/safe-global/safe-apps-sdk.git"
}, vb = {
  url: "https://github.com/safe-global/safe-apps-sdk/issues"
}, Eb = "https://github.com/safe-global/safe-apps-sdk#readme", jb = {
  access: "public"
}, Pb = {
  name: sb,
  version: cb,
  description: ub,
  main: db,
  typings: lb,
  _files: fb,
  sideEffects: bb,
  keywords: mb,
  scripts: gb,
  author: yb,
  license: _b,
  dependencies: hb,
  repository: pb,
  bugs: vb,
  homepage: Eb,
  publishConfig: jb
};
var Tb = J && J.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.getSDKVersion = void 0;
const Ab = Tb(Pb), wb = () => Ab.default.version.split("-")[0];
Zn.getSDKVersion = wb;
var bo = {};
Object.defineProperty(bo, "__esModule", { value: !0 });
bo.generateRequestId = void 0;
const Ob = (e) => e.toString(16).padStart(2, "0"), Ib = (e) => {
  const t = new Uint8Array(e / 2);
  return window.crypto.getRandomValues(t), Array.from(t, Ob).join("");
}, $b = () => typeof window < "u" ? Ib(10) : (/* @__PURE__ */ new Date()).getTime().toString(36);
bo.generateRequestId = $b;
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.MessageFormatter = void 0;
const Cb = Zn, Sb = bo;
class mo {
}
Kn.MessageFormatter = mo;
mo.makeRequest = (e, t) => ({
  id: (0, Sb.generateRequestId)(),
  method: e,
  params: t,
  env: {
    sdkVersion: (0, Cb.getSDKVersion)()
  }
});
mo.makeResponse = (e, t, r) => ({
  id: e,
  success: !0,
  version: r,
  data: t
});
mo.makeErrorResponse = (e, t, r) => ({
  id: e,
  success: !1,
  error: t,
  version: r
});
var mr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.RestrictedMethods = e.Methods = void 0, function(t) {
    t.sendTransactions = "sendTransactions", t.rpcCall = "rpcCall", t.getChainInfo = "getChainInfo", t.getSafeInfo = "getSafeInfo", t.getTxBySafeTxHash = "getTxBySafeTxHash", t.getSafeBalances = "getSafeBalances", t.signMessage = "signMessage", t.signTypedMessage = "signTypedMessage", t.getEnvironmentInfo = "getEnvironmentInfo", t.getOffChainSignature = "getOffChainSignature", t.requestAddressBook = "requestAddressBook", t.wallet_getPermissions = "wallet_getPermissions", t.wallet_requestPermissions = "wallet_requestPermissions";
  }(e.Methods || (e.Methods = {})), function(t) {
    t.requestAddressBook = "requestAddressBook";
  }(e.RestrictedMethods || (e.RestrictedMethods = {}));
})(mr);
(function(e) {
  var t = J && J.__createBinding || (Object.create ? function(o, i, s, c) {
    c === void 0 && (c = s);
    var m = Object.getOwnPropertyDescriptor(i, s);
    (!m || ("get" in m ? !i.__esModule : m.writable || m.configurable)) && (m = { enumerable: !0, get: function() {
      return i[s];
    } }), Object.defineProperty(o, c, m);
  } : function(o, i, s, c) {
    c === void 0 && (c = s), o[c] = i[s];
  }), r = J && J.__exportStar || function(o, i) {
    for (var s in o)
      s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && t(i, o, s);
  };
  Object.defineProperty(e, "__esModule", { value: !0 });
  const n = Kn;
  class a {
    constructor(i = null, s = !1) {
      this.allowedOrigins = null, this.callbacks = /* @__PURE__ */ new Map(), this.debugMode = !1, this.isServer = typeof window > "u", this.isValidMessage = ({ origin: c, data: m, source: u }) => {
        const d = !m, l = !this.isServer && u === window.parent, b = (typeof m.version < "u" && parseInt(m.version.split(".")[0])) >= 1;
        let y = !0;
        return Array.isArray(this.allowedOrigins) && (y = this.allowedOrigins.find((h) => h.test(c)) !== void 0), !d && l && b && y;
      }, this.logIncomingMessage = (c) => {
        console.info(`Safe Apps SDK v1: A message was received from origin ${c.origin}. `, c.data);
      }, this.onParentMessage = (c) => {
        this.isValidMessage(c) && (this.debugMode && this.logIncomingMessage(c), this.handleIncomingMessage(c.data));
      }, this.handleIncomingMessage = (c) => {
        const { id: m } = c, u = this.callbacks.get(m);
        u && (u(c), this.callbacks.delete(m));
      }, this.send = (c, m) => {
        const u = n.MessageFormatter.makeRequest(c, m);
        if (this.isServer)
          throw new Error("Window doesn't exist");
        return window.parent.postMessage(u, "*"), new Promise((d, l) => {
          this.callbacks.set(u.id, (f) => {
            if (!f.success) {
              l(new Error(f.error));
              return;
            }
            d(f);
          });
        });
      }, this.allowedOrigins = i, this.debugMode = s, this.isServer || window.addEventListener("message", this.onParentMessage);
    }
  }
  e.default = a, r(mr, e);
})(Kd);
var go = {}, yo = {}, _o = {};
Object.defineProperty(_o, "__esModule", { value: !0 });
_o.isObjectEIP712TypedData = void 0;
const Rb = (e) => typeof e == "object" && e != null && "domain" in e && "types" in e && "message" in e;
_o.isObjectEIP712TypedData = Rb;
var Zd = {};
Object.defineProperty(Zd, "__esModule", { value: !0 });
var Jd = {}, Xd = {}, st = {}, ct = {}, Cc = J && J.__awaiter || function(e, t, r, n) {
  function a(o) {
    return o instanceof r ? o : new r(function(i) {
      i(o);
    });
  }
  return new (r || (r = Promise))(function(o, i) {
    function s(u) {
      try {
        m(n.next(u));
      } catch (d) {
        i(d);
      }
    }
    function c(u) {
      try {
        m(n.throw(u));
      } catch (d) {
        i(d);
      }
    }
    function m(u) {
      u.done ? o(u.value) : a(u.value).then(s, c);
    }
    m((n = n.apply(e, t || [])).next());
  });
};
Object.defineProperty(ct, "__esModule", { value: !0 });
ct.getData = ct.fetchData = ct.stringifyQuery = ct.insertParams = void 0;
const Bb = (e) => typeof e == "object" && e !== null && "code" in e && "message" in e;
function Mb(e, t, r) {
  return e.replace(new RegExp(`\\{${t}\\}`, "g"), r);
}
function Fb(e, t) {
  return t ? Object.keys(t).reduce((r, n) => Mb(r, n, String(t[n])), e) : e;
}
ct.insertParams = Fb;
function Nb(e) {
  if (!e)
    return "";
  const t = new URLSearchParams();
  Object.keys(e).forEach((n) => {
    e[n] != null && t.append(n, String(e[n]));
  });
  const r = t.toString();
  return r ? `?${r}` : "";
}
ct.stringifyQuery = Nb;
function Qd(e) {
  return Cc(this, void 0, void 0, function* () {
    let t;
    try {
      t = e.status === 204 ? {} : yield e.json();
    } catch {
      if (e.headers && e.headers.get("content-length") !== "0")
        throw new Error(`Invalid response content: ${e.statusText}`);
    }
    if (!e.ok) {
      const r = Bb(t) ? `${t.code}: ${t.message}` : e.statusText;
      throw new Error(r);
    }
    return t;
  });
}
function kb(e, t, r, n, a) {
  return Cc(this, void 0, void 0, function* () {
    const o = Object.assign({ "Content-Type": "application/json" }, n), i = {
      method: t ?? "POST",
      headers: o
    };
    a && (i.credentials = a), r != null && (i.body = typeof r == "string" ? r : JSON.stringify(r));
    const s = yield fetch(e, i);
    return Qd(s);
  });
}
ct.fetchData = kb;
function Db(e, t, r) {
  return Cc(this, void 0, void 0, function* () {
    const n = {
      method: "GET"
    };
    t && (n.headers = Object.assign(Object.assign({}, t), { "Content-Type": "application/json" })), r && (n.credentials = r);
    const a = yield fetch(e, n);
    return Qd(a);
  });
}
ct.getData = Db;
Object.defineProperty(st, "__esModule", { value: !0 });
st.getEndpoint = st.deleteEndpoint = st.putEndpoint = st.postEndpoint = void 0;
const ur = ct;
function ho(e, t, r, n) {
  const a = (0, ur.insertParams)(t, r), o = (0, ur.stringifyQuery)(n);
  return `${e}${a}${o}`;
}
function Hb(e, t, r) {
  const n = ho(e, t, r == null ? void 0 : r.path, r == null ? void 0 : r.query);
  return (0, ur.fetchData)(n, "POST", r == null ? void 0 : r.body, r == null ? void 0 : r.headers, r == null ? void 0 : r.credentials);
}
st.postEndpoint = Hb;
function Ub(e, t, r) {
  const n = ho(e, t, r == null ? void 0 : r.path, r == null ? void 0 : r.query);
  return (0, ur.fetchData)(n, "PUT", r == null ? void 0 : r.body, r == null ? void 0 : r.headers, r == null ? void 0 : r.credentials);
}
st.putEndpoint = Ub;
function Lb(e, t, r) {
  const n = ho(e, t, r == null ? void 0 : r.path, r == null ? void 0 : r.query);
  return (0, ur.fetchData)(n, "DELETE", r == null ? void 0 : r.body, r == null ? void 0 : r.headers, r == null ? void 0 : r.credentials);
}
st.deleteEndpoint = Lb;
function qb(e, t, r, n) {
  if (n)
    return (0, ur.getData)(n, void 0, r == null ? void 0 : r.credentials);
  const a = ho(e, t, r == null ? void 0 : r.path, r == null ? void 0 : r.query);
  return (0, ur.getData)(a, r == null ? void 0 : r.headers, r == null ? void 0 : r.credentials);
}
st.getEndpoint = qb;
var po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
po.DEFAULT_BASE_URL = void 0;
po.DEFAULT_BASE_URL = "https://safe-client.safe.global";
var Yd = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ImplementationVersionState = void 0, function(t) {
    t.UP_TO_DATE = "UP_TO_DATE", t.OUTDATED = "OUTDATED", t.UNKNOWN = "UNKNOWN";
  }(e.ImplementationVersionState || (e.ImplementationVersionState = {}));
})(Yd);
var el = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.SafeAppSocialPlatforms = e.SafeAppFeatures = e.SafeAppAccessPolicyTypes = void 0, function(t) {
    t.NoRestrictions = "NO_RESTRICTIONS", t.DomainAllowlist = "DOMAIN_ALLOWLIST";
  }(e.SafeAppAccessPolicyTypes || (e.SafeAppAccessPolicyTypes = {})), function(t) {
    t.BATCHED_TRANSACTIONS = "BATCHED_TRANSACTIONS";
  }(e.SafeAppFeatures || (e.SafeAppFeatures = {})), function(t) {
    t.TWITTER = "TWITTER", t.GITHUB = "GITHUB", t.DISCORD = "DISCORD";
  }(e.SafeAppSocialPlatforms || (e.SafeAppSocialPlatforms = {}));
})(el);
var tl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.LabelValue = e.StartTimeValue = e.DurationType = e.DetailedExecutionInfoType = e.TransactionListItemType = e.ConflictType = e.TransactionInfoType = e.SettingsInfoType = e.TransactionTokenType = e.TransferDirection = e.TransactionStatus = e.Operation = void 0, function(t) {
    t[t.CALL = 0] = "CALL", t[t.DELEGATE = 1] = "DELEGATE";
  }(e.Operation || (e.Operation = {})), function(t) {
    t.AWAITING_CONFIRMATIONS = "AWAITING_CONFIRMATIONS", t.AWAITING_EXECUTION = "AWAITING_EXECUTION", t.CANCELLED = "CANCELLED", t.FAILED = "FAILED", t.SUCCESS = "SUCCESS";
  }(e.TransactionStatus || (e.TransactionStatus = {})), function(t) {
    t.INCOMING = "INCOMING", t.OUTGOING = "OUTGOING", t.UNKNOWN = "UNKNOWN";
  }(e.TransferDirection || (e.TransferDirection = {})), function(t) {
    t.ERC20 = "ERC20", t.ERC721 = "ERC721", t.NATIVE_COIN = "NATIVE_COIN";
  }(e.TransactionTokenType || (e.TransactionTokenType = {})), function(t) {
    t.SET_FALLBACK_HANDLER = "SET_FALLBACK_HANDLER", t.ADD_OWNER = "ADD_OWNER", t.REMOVE_OWNER = "REMOVE_OWNER", t.SWAP_OWNER = "SWAP_OWNER", t.CHANGE_THRESHOLD = "CHANGE_THRESHOLD", t.CHANGE_IMPLEMENTATION = "CHANGE_IMPLEMENTATION", t.ENABLE_MODULE = "ENABLE_MODULE", t.DISABLE_MODULE = "DISABLE_MODULE", t.SET_GUARD = "SET_GUARD", t.DELETE_GUARD = "DELETE_GUARD";
  }(e.SettingsInfoType || (e.SettingsInfoType = {})), function(t) {
    t.TRANSFER = "Transfer", t.SETTINGS_CHANGE = "SettingsChange", t.CUSTOM = "Custom", t.CREATION = "Creation", t.SWAP_ORDER = "SwapOrder", t.TWAP_ORDER = "TwapOrder", t.SWAP_TRANSFER = "SwapTransfer";
  }(e.TransactionInfoType || (e.TransactionInfoType = {})), function(t) {
    t.NONE = "None", t.HAS_NEXT = "HasNext", t.END = "End";
  }(e.ConflictType || (e.ConflictType = {})), function(t) {
    t.TRANSACTION = "TRANSACTION", t.LABEL = "LABEL", t.CONFLICT_HEADER = "CONFLICT_HEADER", t.DATE_LABEL = "DATE_LABEL";
  }(e.TransactionListItemType || (e.TransactionListItemType = {})), function(t) {
    t.MULTISIG = "MULTISIG", t.MODULE = "MODULE";
  }(e.DetailedExecutionInfoType || (e.DetailedExecutionInfoType = {})), function(t) {
    t.AUTO = "AUTO", t.LIMIT_DURATION = "LIMIT_DURATION";
  }(e.DurationType || (e.DurationType = {})), function(t) {
    t.AT_MINING_TIME = "AT_MINING_TIME", t.AT_EPOCH = "AT_EPOCH";
  }(e.StartTimeValue || (e.StartTimeValue = {})), function(t) {
    t.Queued = "Queued", t.Next = "Next";
  }(e.LabelValue || (e.LabelValue = {}));
})(tl);
var rl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.FEATURES = e.GAS_PRICE_TYPE = e.RPC_AUTHENTICATION = void 0, function(t) {
    t.API_KEY_PATH = "API_KEY_PATH", t.NO_AUTHENTICATION = "NO_AUTHENTICATION", t.UNKNOWN = "UNKNOWN";
  }(e.RPC_AUTHENTICATION || (e.RPC_AUTHENTICATION = {})), function(t) {
    t.ORACLE = "ORACLE", t.FIXED = "FIXED", t.FIXED_1559 = "FIXED1559", t.UNKNOWN = "UNKNOWN";
  }(e.GAS_PRICE_TYPE || (e.GAS_PRICE_TYPE = {})), function(t) {
    t.ERC721 = "ERC721", t.SAFE_APPS = "SAFE_APPS", t.CONTRACT_INTERACTION = "CONTRACT_INTERACTION", t.DOMAIN_LOOKUP = "DOMAIN_LOOKUP", t.SPENDING_LIMIT = "SPENDING_LIMIT", t.EIP1559 = "EIP1559", t.SAFE_TX_GAS_OPTIONAL = "SAFE_TX_GAS_OPTIONAL", t.TX_SIMULATION = "TX_SIMULATION", t.EIP1271 = "EIP1271";
  }(e.FEATURES || (e.FEATURES = {}));
})(rl);
var nl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.TokenType = void 0, function(t) {
    t.ERC20 = "ERC20", t.ERC721 = "ERC721", t.NATIVE_TOKEN = "NATIVE_TOKEN";
  }(e.TokenType || (e.TokenType = {}));
})(nl);
var al = {};
Object.defineProperty(al, "__esModule", { value: !0 });
var ol = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ConfirmationViewTypes = void 0, function(t) {
    t.COW_SWAP_ORDER = "COW_SWAP_ORDER", t.COW_SWAP_TWAP_ORDER = "COW_SWAP_TWAP_ORDER";
  }(e.ConfirmationViewTypes || (e.ConfirmationViewTypes = {}));
})(ol);
var il = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.SafeMessageStatus = e.SafeMessageListItemType = void 0, function(t) {
    t.DATE_LABEL = "DATE_LABEL", t.MESSAGE = "MESSAGE";
  }(e.SafeMessageListItemType || (e.SafeMessageListItemType = {})), function(t) {
    t.NEEDS_CONFIRMATION = "NEEDS_CONFIRMATION", t.CONFIRMED = "CONFIRMED";
  }(e.SafeMessageStatus || (e.SafeMessageStatus = {}));
})(il);
var sl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DeviceType = void 0, function(t) {
    t.ANDROID = "ANDROID", t.IOS = "IOS", t.WEB = "WEB";
  }(e.DeviceType || (e.DeviceType = {}));
})(sl);
var cl = {};
Object.defineProperty(cl, "__esModule", { value: !0 });
(function(e) {
  var t = J && J.__createBinding || (Object.create ? function(T, O, C, D) {
    D === void 0 && (D = C);
    var qe = Object.getOwnPropertyDescriptor(O, C);
    (!qe || ("get" in qe ? !O.__esModule : qe.writable || qe.configurable)) && (qe = { enumerable: !0, get: function() {
      return O[C];
    } }), Object.defineProperty(T, D, qe);
  } : function(T, O, C, D) {
    D === void 0 && (D = C), T[D] = O[C];
  }), r = J && J.__exportStar || function(T, O) {
    for (var C in T)
      C !== "default" && !Object.prototype.hasOwnProperty.call(O, C) && t(O, T, C);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.verifyAuth = e.getAuthNonce = e.getContract = e.getSafeOverviews = e.unsubscribeAll = e.unsubscribeSingle = e.registerRecoveryModule = e.deleteRegisteredEmail = e.getRegisteredEmail = e.verifyEmail = e.resendEmailVerificationCode = e.changeEmail = e.registerEmail = e.unregisterDevice = e.unregisterSafe = e.registerDevice = e.getDelegates = e.confirmSafeMessage = e.proposeSafeMessage = e.getSafeMessage = e.getSafeMessages = e.getDecodedData = e.getMasterCopies = e.getSafeApps = e.getChainConfig = e.getChainsConfig = e.getConfirmationView = e.proposeTransaction = e.getNonces = e.postSafeGasEstimation = e.deleteTransaction = e.getTransactionDetails = e.getTransactionQueue = e.getTransactionHistory = e.getCollectiblesPage = e.getCollectibles = e.getAllOwnedSafes = e.getOwnedSafes = e.getFiatCurrencies = e.getBalances = e.getMultisigTransactions = e.getModuleTransactions = e.getIncomingTransfers = e.getSafeInfo = e.getRelayCount = e.relayTransaction = e.setBaseUrl = void 0;
  const n = st, a = po;
  r(Yd, e), r(el, e), r(tl, e), r(rl, e), r(nl, e), r(al, e), r(ol, e), r(il, e), r(sl, e), r(cl, e);
  let o = a.DEFAULT_BASE_URL;
  const i = (T) => {
    o = T;
  };
  e.setBaseUrl = i;
  function s(T, O) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/relay", { path: { chainId: T }, body: O });
  }
  e.relayTransaction = s;
  function c(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/relay/{address}", { path: { chainId: T, address: O } });
  }
  e.getRelayCount = c;
  function m(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{address}", { path: { chainId: T, address: O } });
  }
  e.getSafeInfo = m;
  function u(T, O, C, D) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{address}/incoming-transfers/", {
      path: { chainId: T, address: O },
      query: C
    }, D);
  }
  e.getIncomingTransfers = u;
  function d(T, O, C, D) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{address}/module-transactions/", {
      path: { chainId: T, address: O },
      query: C
    }, D);
  }
  e.getModuleTransactions = d;
  function l(T, O, C, D) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{address}/multisig-transactions/", {
      path: { chainId: T, address: O },
      query: C
    }, D);
  }
  e.getMultisigTransactions = l;
  function f(T, O, C = "usd", D = {}) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{address}/balances/{currency}", {
      path: { chainId: T, address: O, currency: C },
      query: D
    });
  }
  e.getBalances = f;
  function b() {
    return (0, n.getEndpoint)(o, "/v1/balances/supported-fiat-codes");
  }
  e.getFiatCurrencies = b;
  function y(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/owners/{address}/safes", { path: { chainId: T, address: O } });
  }
  e.getOwnedSafes = y;
  function h(T) {
    return (0, n.getEndpoint)(o, "/v1/owners/{address}/safes", { path: { address: T } });
  }
  e.getAllOwnedSafes = h;
  function p(T, O, C = {}) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{address}/collectibles", {
      path: { chainId: T, address: O },
      query: C
    });
  }
  e.getCollectibles = p;
  function g(T, O, C = {}, D) {
    return (0, n.getEndpoint)(o, "/v2/chains/{chainId}/safes/{address}/collectibles", { path: { chainId: T, address: O }, query: C }, D);
  }
  e.getCollectiblesPage = g;
  function v(T, O, C = {}, D) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/transactions/history", { path: { chainId: T, safe_address: O }, query: C }, D);
  }
  e.getTransactionHistory = v;
  function j(T, O, C = {}, D) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/transactions/queued", { path: { chainId: T, safe_address: O }, query: C }, D);
  }
  e.getTransactionQueue = j;
  function E(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/transactions/{transactionId}", {
      path: { chainId: T, transactionId: O }
    });
  }
  e.getTransactionDetails = E;
  function P(T, O, C) {
    return (0, n.deleteEndpoint)(o, "/v1/chains/{chainId}/transactions/{safeTxHash}", {
      path: { chainId: T, safeTxHash: O },
      body: { signature: C }
    });
  }
  e.deleteTransaction = P;
  function $(T, O, C) {
    return (0, n.postEndpoint)(o, "/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations", {
      path: { chainId: T, safe_address: O },
      body: C
    });
  }
  e.postSafeGasEstimation = $;
  function k(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/nonces", {
      path: { chainId: T, safe_address: O }
    });
  }
  e.getNonces = k;
  function L(T, O, C) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/transactions/{safe_address}/propose", {
      path: { chainId: T, safe_address: O },
      body: C
    });
  }
  e.proposeTransaction = L;
  function N(T, O, C, D) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation", {
      path: { chainId: T, safe_address: O },
      body: { data: C, to: D }
    });
  }
  e.getConfirmationView = N;
  function K(T) {
    return (0, n.getEndpoint)(o, "/v1/chains", {
      query: T
    });
  }
  e.getChainsConfig = K;
  function x(T) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}", {
      path: { chainId: T }
    });
  }
  e.getChainConfig = x;
  function R(T, O = {}) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safe-apps", {
      path: { chainId: T },
      query: O
    });
  }
  e.getSafeApps = R;
  function w(T) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/about/master-copies", {
      path: { chainId: T }
    });
  }
  e.getMasterCopies = w;
  function I(T, O, C) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/data-decoder", {
      path: { chainId: T },
      body: { data: O, to: C }
    });
  }
  e.getDecodedData = I;
  function z(T, O, C) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/messages", { path: { chainId: T, safe_address: O }, query: {} }, C);
  }
  e.getSafeMessages = z;
  function W(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/messages/{message_hash}", {
      path: { chainId: T, message_hash: O }
    });
  }
  e.getSafeMessage = W;
  function ee(T, O, C) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/messages", {
      path: { chainId: T, safe_address: O },
      body: C
    });
  }
  e.proposeSafeMessage = ee;
  function H(T, O, C) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/messages/{message_hash}/signatures", {
      path: { chainId: T, message_hash: O },
      body: C
    });
  }
  e.confirmSafeMessage = H;
  function Z(T, O = {}) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/delegates", {
      path: { chainId: T },
      query: O
    });
  }
  e.getDelegates = Z;
  function ne(T) {
    return (0, n.postEndpoint)(o, "/v1/register/notifications", {
      body: T
    });
  }
  e.registerDevice = ne;
  function ie(T, O, C) {
    return (0, n.deleteEndpoint)(o, "/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}", {
      path: { chainId: T, safe_address: O, uuid: C }
    });
  }
  e.unregisterSafe = ie;
  function me(T, O) {
    return (0, n.deleteEndpoint)(o, "/v1/chains/{chainId}/notifications/devices/{uuid}", {
      path: { chainId: T, uuid: O }
    });
  }
  e.unregisterDevice = me;
  function Te(T, O, C, D) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/emails", {
      path: { chainId: T, safe_address: O },
      body: C,
      headers: D
    });
  }
  e.registerEmail = Te;
  function he(T, O, C, D, qe) {
    return (0, n.putEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId: T, safe_address: O, signer: C },
      body: D,
      headers: qe
    });
  }
  e.changeEmail = he;
  function Se(T, O, C) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend", {
      path: { chainId: T, safe_address: O, signer: C },
      body: ""
    });
  }
  e.resendEmailVerificationCode = Se;
  function at(T, O, C, D) {
    return (0, n.putEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify", {
      path: { chainId: T, safe_address: O, signer: C },
      body: D
    });
  }
  e.verifyEmail = at;
  function Le(T, O, C, D) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId: T, safe_address: O, signer: C },
      headers: D
    });
  }
  e.getRegisteredEmail = Le;
  function Ke(T, O, C, D) {
    return (0, n.deleteEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId: T, safe_address: O, signer: C },
      headers: D
    });
  }
  e.deleteRegisteredEmail = Ke;
  function Ze(T, O, C) {
    return (0, n.postEndpoint)(o, "/v1/chains/{chainId}/safes/{safe_address}/recovery", {
      path: { chainId: T, safe_address: O },
      body: C
    });
  }
  e.registerRecoveryModule = Ze;
  function B(T) {
    return (0, n.deleteEndpoint)(o, "/v1/subscriptions", { query: T });
  }
  e.unsubscribeSingle = B;
  function A(T) {
    return (0, n.deleteEndpoint)(o, "/v1/subscriptions/all", { query: T });
  }
  e.unsubscribeAll = A;
  function jt(T, O) {
    return (0, n.getEndpoint)(o, "/v1/safes", {
      query: Object.assign(Object.assign({}, O), { safes: T.join(",") })
    });
  }
  e.getSafeOverviews = jt;
  function ot(T, O) {
    return (0, n.getEndpoint)(o, "/v1/chains/{chainId}/contracts/{contractAddress}", {
      path: {
        chainId: T,
        contractAddress: O
      }
    });
  }
  e.getContract = ot;
  function Pt() {
    return (0, n.getEndpoint)(o, "/v1/auth/nonce", { credentials: "include" });
  }
  e.getAuthNonce = Pt;
  function _n(T) {
    return (0, n.postEndpoint)(o, "/v1/auth/verify", {
      body: T,
      credentials: "include"
    });
  }
  e.verifyAuth = _n;
})(Xd);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.TransferDirection = e.TransactionStatus = e.TokenType = e.Operation = void 0;
  var t = Xd;
  Object.defineProperty(e, "Operation", { enumerable: !0, get: function() {
    return t.Operation;
  } }), Object.defineProperty(e, "TokenType", { enumerable: !0, get: function() {
    return t.TokenType;
  } }), Object.defineProperty(e, "TransactionStatus", { enumerable: !0, get: function() {
    return t.TransactionStatus;
  } }), Object.defineProperty(e, "TransferDirection", { enumerable: !0, get: function() {
    return t.TransferDirection;
  } });
})(Jd);
var ul = {};
Object.defineProperty(ul, "__esModule", { value: !0 });
(function(e) {
  var t = J && J.__createBinding || (Object.create ? function(n, a, o, i) {
    i === void 0 && (i = o);
    var s = Object.getOwnPropertyDescriptor(a, o);
    (!s || ("get" in s ? !a.__esModule : s.writable || s.configurable)) && (s = { enumerable: !0, get: function() {
      return a[o];
    } }), Object.defineProperty(n, i, s);
  } : function(n, a, o, i) {
    i === void 0 && (i = o), n[i] = a[o];
  }), r = J && J.__exportStar || function(n, a) {
    for (var o in n)
      o !== "default" && !Object.prototype.hasOwnProperty.call(a, o) && t(a, n, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), r(_o, e), r(Zd, e), r(Jd, e), r(ul, e);
})(yo);
Object.defineProperty(go, "__esModule", { value: !0 });
go.TXs = void 0;
const Wa = mr, xb = yo;
class zb {
  constructor(t) {
    this.communicator = t;
  }
  async getBySafeTxHash(t) {
    if (!t)
      throw new Error("Invalid safeTxHash");
    return (await this.communicator.send(Wa.Methods.getTxBySafeTxHash, { safeTxHash: t })).data;
  }
  async signMessage(t) {
    const r = {
      message: t
    };
    return (await this.communicator.send(Wa.Methods.signMessage, r)).data;
  }
  async signTypedMessage(t) {
    if (!(0, xb.isObjectEIP712TypedData)(t))
      throw new Error("Invalid typed data");
    return (await this.communicator.send(Wa.Methods.signTypedMessage, { typedData: t })).data;
  }
  async send({ txs: t, params: r }) {
    if (!t || !t.length)
      throw new Error("No transactions were passed");
    const n = {
      txs: t,
      params: r
    };
    return (await this.communicator.send(Wa.Methods.sendTransactions, n)).data;
  }
}
go.TXs = zb;
var vo = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.RPC_CALLS = void 0;
Jn.RPC_CALLS = {
  eth_call: "eth_call",
  eth_gasPrice: "eth_gasPrice",
  eth_getLogs: "eth_getLogs",
  eth_getBalance: "eth_getBalance",
  eth_getCode: "eth_getCode",
  eth_getBlockByHash: "eth_getBlockByHash",
  eth_getBlockByNumber: "eth_getBlockByNumber",
  eth_getStorageAt: "eth_getStorageAt",
  eth_getTransactionByHash: "eth_getTransactionByHash",
  eth_getTransactionReceipt: "eth_getTransactionReceipt",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_estimateGas: "eth_estimateGas",
  safe_setSettings: "safe_setSettings"
};
Object.defineProperty(vo, "__esModule", { value: !0 });
vo.Eth = void 0;
const Me = Jn, Gb = mr, Tt = {
  defaultBlockParam: (e = "latest") => e,
  returnFullTxObjectParam: (e = !1) => e,
  blockNumberToHex: (e) => Number.isInteger(e) ? `0x${e.toString(16)}` : e
};
class Wb {
  constructor(t) {
    this.communicator = t, this.call = this.buildRequest({
      call: Me.RPC_CALLS.eth_call,
      formatters: [null, Tt.defaultBlockParam]
    }), this.getBalance = this.buildRequest({
      call: Me.RPC_CALLS.eth_getBalance,
      formatters: [null, Tt.defaultBlockParam]
    }), this.getCode = this.buildRequest({
      call: Me.RPC_CALLS.eth_getCode,
      formatters: [null, Tt.defaultBlockParam]
    }), this.getStorageAt = this.buildRequest({
      call: Me.RPC_CALLS.eth_getStorageAt,
      formatters: [null, Tt.blockNumberToHex, Tt.defaultBlockParam]
    }), this.getPastLogs = this.buildRequest({
      call: Me.RPC_CALLS.eth_getLogs
    }), this.getBlockByHash = this.buildRequest({
      call: Me.RPC_CALLS.eth_getBlockByHash,
      formatters: [null, Tt.returnFullTxObjectParam]
    }), this.getBlockByNumber = this.buildRequest({
      call: Me.RPC_CALLS.eth_getBlockByNumber,
      formatters: [Tt.blockNumberToHex, Tt.returnFullTxObjectParam]
    }), this.getTransactionByHash = this.buildRequest({
      call: Me.RPC_CALLS.eth_getTransactionByHash
    }), this.getTransactionReceipt = this.buildRequest({
      call: Me.RPC_CALLS.eth_getTransactionReceipt
    }), this.getTransactionCount = this.buildRequest({
      call: Me.RPC_CALLS.eth_getTransactionCount,
      formatters: [null, Tt.defaultBlockParam]
    }), this.getGasPrice = this.buildRequest({
      call: Me.RPC_CALLS.eth_gasPrice
    }), this.getEstimateGas = (r) => this.buildRequest({
      call: Me.RPC_CALLS.eth_estimateGas
    })([r]), this.setSafeSettings = this.buildRequest({
      call: Me.RPC_CALLS.safe_setSettings
    });
  }
  buildRequest(t) {
    const { call: r, formatters: n } = t;
    return async (a) => {
      n && Array.isArray(a) && n.forEach((s, c) => {
        s && (a[c] = s(a[c]));
      });
      const o = {
        call: r,
        params: a || []
      };
      return (await this.communicator.send(Gb.Methods.rpcCall, o)).data;
    };
  }
}
vo.Eth = Wb;
var Eo = {}, Ws = {}, Vs = {}, St = {}, jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
jo.version = void 0;
jo.version = "0.9.8";
Object.defineProperty(St, "__esModule", { value: !0 });
St.BaseError = void 0;
const Vb = jo;
let Kb = class Tc extends Error {
  constructor(t, r = {}) {
    var i;
    const n = r.cause instanceof Tc ? r.cause.details : (i = r.cause) != null && i.message ? r.cause.message : r.details, a = r.cause instanceof Tc && r.cause.docsPath || r.docsPath, o = [
      t || "An error occurred.",
      "",
      ...r.metaMessages ? [...r.metaMessages, ""] : [],
      ...a ? [`Docs: https://abitype.dev${a}`] : [],
      ...n ? [`Details: ${n}`] : [],
      `Version: abitype@${Vb.version}`
    ].join(`
`);
    super(o), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiTypeError"
    }), r.cause && (this.cause = r.cause), this.details = n, this.docsPath = a, this.metaMessages = r.metaMessages, this.shortMessage = t;
  }
};
St.BaseError = Kb;
var Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
Po.narrow = void 0;
function Zb(e) {
  return e;
}
Po.narrow = Zb;
var To = {}, Xn = {}, Qn = {}, Yn = {}, De = {};
Object.defineProperty(De, "__esModule", { value: !0 });
De.isTupleRegex = De.integerRegex = De.bytesRegex = De.execTyped = void 0;
function Jb(e, t) {
  const r = e.exec(t);
  return r == null ? void 0 : r.groups;
}
De.execTyped = Jb;
De.bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
De.integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
De.isTupleRegex = /^\(.+?\).*?$/;
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.formatAbiParameter = void 0;
const Xb = De, tu = /^tuple(?<array>(\[(\d*)\])*)$/;
function Ac(e) {
  let t = e.type;
  if (tu.test(e.type) && "components" in e) {
    t = "(";
    const r = e.components.length;
    for (let a = 0; a < r; a++) {
      const o = e.components[a];
      t += Ac(o), a < r - 1 && (t += ", ");
    }
    const n = (0, Xb.execTyped)(tu, e.type);
    return t += `)${(n == null ? void 0 : n.array) ?? ""}`, Ac({
      ...e,
      type: t
    });
  }
  return "indexed" in e && e.indexed && (t = `${t} indexed`), e.name ? `${t} ${e.name}` : t;
}
Yn.formatAbiParameter = Ac;
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.formatAbiParameters = void 0;
const Qb = Yn;
function Yb(e) {
  let t = "";
  const r = e.length;
  for (let n = 0; n < r; n++) {
    const a = e[n];
    t += (0, Qb.formatAbiParameter)(a), n !== r - 1 && (t += ", ");
  }
  return t;
}
Qn.formatAbiParameters = Yb;
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.formatAbiItem = void 0;
const jn = Qn;
function em(e) {
  return e.type === "function" ? `function ${e.name}(${(0, jn.formatAbiParameters)(e.inputs)})${e.stateMutability && e.stateMutability !== "nonpayable" ? ` ${e.stateMutability}` : ""}${e.outputs.length ? ` returns (${(0, jn.formatAbiParameters)(e.outputs)})` : ""}` : e.type === "event" ? `event ${e.name}(${(0, jn.formatAbiParameters)(e.inputs)})` : e.type === "error" ? `error ${e.name}(${(0, jn.formatAbiParameters)(e.inputs)})` : e.type === "constructor" ? `constructor(${(0, jn.formatAbiParameters)(e.inputs)})${e.stateMutability === "payable" ? " payable" : ""}` : e.type === "fallback" ? "fallback()" : "receive() external payable";
}
Xn.formatAbiItem = em;
Object.defineProperty(To, "__esModule", { value: !0 });
To.formatAbi = void 0;
const tm = Xn;
function rm(e) {
  const t = [], r = e.length;
  for (let n = 0; n < r; n++) {
    const a = e[n], o = (0, tm.formatAbiItem)(a);
    t.push(o);
  }
  return t;
}
To.formatAbi = rm;
var Ao = {}, U = {};
Object.defineProperty(U, "__esModule", { value: !0 });
U.functionModifiers = U.eventModifiers = U.modifiers = U.isReceiveSignature = U.isFallbackSignature = U.execConstructorSignature = U.isConstructorSignature = U.execStructSignature = U.isStructSignature = U.execFunctionSignature = U.isFunctionSignature = U.execEventSignature = U.isEventSignature = U.execErrorSignature = U.isErrorSignature = void 0;
const ea = De, dl = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function nm(e) {
  return dl.test(e);
}
U.isErrorSignature = nm;
function am(e) {
  return (0, ea.execTyped)(dl, e);
}
U.execErrorSignature = am;
const ll = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function om(e) {
  return ll.test(e);
}
U.isEventSignature = om;
function im(e) {
  return (0, ea.execTyped)(ll, e);
}
U.execEventSignature = im;
const fl = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function sm(e) {
  return fl.test(e);
}
U.isFunctionSignature = sm;
function cm(e) {
  return (0, ea.execTyped)(fl, e);
}
U.execFunctionSignature = cm;
const bl = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function um(e) {
  return bl.test(e);
}
U.isStructSignature = um;
function dm(e) {
  return (0, ea.execTyped)(bl, e);
}
U.execStructSignature = dm;
const ml = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function lm(e) {
  return ml.test(e);
}
U.isConstructorSignature = lm;
function fm(e) {
  return (0, ea.execTyped)(ml, e);
}
U.execConstructorSignature = fm;
const bm = /^fallback\(\)$/;
function mm(e) {
  return bm.test(e);
}
U.isFallbackSignature = mm;
const gm = /^receive\(\) external payable$/;
function ym(e) {
  return gm.test(e);
}
U.isReceiveSignature = ym;
U.modifiers = /* @__PURE__ */ new Set([
  "memory",
  "indexed",
  "storage",
  "calldata"
]);
U.eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
U.functionModifiers = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);
var gr = {}, dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.UnknownSolidityTypeError = dt.UnknownTypeError = dt.InvalidAbiItemError = void 0;
const Sc = St;
class _m extends Sc.BaseError {
  constructor({ signature: t }) {
    super("Failed to parse ABI item.", {
      details: `parseAbiItem(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human.html#parseabiitem-1"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiItemError"
    });
  }
}
dt.InvalidAbiItemError = _m;
class hm extends Sc.BaseError {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [
        `Type "${t}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownTypeError"
    });
  }
}
dt.UnknownTypeError = hm;
class pm extends Sc.BaseError {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [`Type "${t}" is not a valid ABI type.`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownSolidityTypeError"
    });
  }
}
dt.UnknownSolidityTypeError = pm;
var fe = {};
Object.defineProperty(fe, "__esModule", { value: !0 });
fe.InvalidAbiTypeParameterError = fe.InvalidFunctionModifierError = fe.InvalidModifierError = fe.SolidityProtectedKeywordError = fe.InvalidParameterError = fe.InvalidAbiParametersError = fe.InvalidAbiParameterError = void 0;
const yr = St;
class vm extends yr.BaseError {
  constructor({ param: t }) {
    super("Failed to parse ABI parameter.", {
      details: `parseAbiParameter(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human.html#parseabiparameter-1"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiParameterError"
    });
  }
}
fe.InvalidAbiParameterError = vm;
class Em extends yr.BaseError {
  constructor({ params: t }) {
    super("Failed to parse ABI parameters.", {
      details: `parseAbiParameters(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human.html#parseabiparameters-1"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiParametersError"
    });
  }
}
fe.InvalidAbiParametersError = Em;
class jm extends yr.BaseError {
  constructor({ param: t }) {
    super("Invalid ABI parameter.", {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidParameterError"
    });
  }
}
fe.InvalidParameterError = jm;
class Pm extends yr.BaseError {
  constructor({ param: t, name: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `"${r}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SolidityProtectedKeywordError"
    });
  }
}
fe.SolidityProtectedKeywordError = Pm;
class Tm extends yr.BaseError {
  constructor({ param: t, type: r, modifier: n }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${n}" not allowed${r ? ` in "${r}" type` : ""}.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidModifierError"
    });
  }
}
fe.InvalidModifierError = Tm;
class Am extends yr.BaseError {
  constructor({ param: t, type: r, modifier: n }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${n}" not allowed${r ? ` in "${r}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${n}" was given.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidFunctionModifierError"
    });
  }
}
fe.InvalidFunctionModifierError = Am;
class wm extends yr.BaseError {
  constructor({ abiParameter: t }) {
    super("Invalid ABI parameter.", {
      details: JSON.stringify(t, null, 2),
      metaMessages: ["ABI parameter type is invalid."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiTypeParameterError"
    });
  }
}
fe.InvalidAbiTypeParameterError = wm;
var lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.InvalidStructSignatureError = lt.UnknownSignatureError = lt.InvalidSignatureError = void 0;
const Rc = St;
class Om extends Rc.BaseError {
  constructor({ signature: t, type: r }) {
    super(`Invalid ${r} signature.`, {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidSignatureError"
    });
  }
}
lt.InvalidSignatureError = Om;
class Im extends Rc.BaseError {
  constructor({ signature: t }) {
    super("Unknown signature.", {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownSignatureError"
    });
  }
}
lt.UnknownSignatureError = Im;
class $m extends Rc.BaseError {
  constructor({ signature: t }) {
    super("Invalid struct signature.", {
      details: t,
      metaMessages: ["No properties exist."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidStructSignatureError"
    });
  }
}
lt.InvalidStructSignatureError = $m;
var ta = {};
Object.defineProperty(ta, "__esModule", { value: !0 });
ta.CircularReferenceError = void 0;
const Cm = St;
class Sm extends Cm.BaseError {
  constructor({ type: t }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${t}" is a circular reference.`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "CircularReferenceError"
    });
  }
}
ta.CircularReferenceError = Sm;
var se = {}, ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
ra.InvalidParenthesisError = void 0;
const Rm = St;
class Bm extends Rm.BaseError {
  constructor({ current: t, depth: r }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${t.trim()}" has too many ${r > 0 ? "opening" : "closing"} parentheses.`
      ],
      details: `Depth "${r}"`
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidParenthesisError"
    });
  }
}
ra.InvalidParenthesisError = Bm;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.parameterCache = Fr.getParameterCacheKey = void 0;
function Mm(e, t) {
  return t ? `${t}:${e}` : e;
}
Fr.getParameterCacheKey = Mm;
Fr.parameterCache = /* @__PURE__ */ new Map([
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: !0 }
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 }
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 }
  ]
]);
Object.defineProperty(se, "__esModule", { value: !0 });
se.isValidDataLocation = se.isSolidityKeyword = se.isSolidityType = se.splitParameters = se.parseAbiParameter = se.parseSignature = void 0;
const Nr = De, Fm = dt, Va = fe, Pn = lt, Nm = ra, Ka = Fr, Re = U;
function km(e, t = {}) {
  if ((0, Re.isFunctionSignature)(e)) {
    const r = (0, Re.execFunctionSignature)(e);
    if (!r)
      throw new Pn.InvalidSignatureError({ signature: e, type: "function" });
    const n = xe(r.parameters), a = [], o = n.length;
    for (let s = 0; s < o; s++)
      a.push(sr(n[s], {
        modifiers: Re.functionModifiers,
        structs: t,
        type: "function"
      }));
    const i = [];
    if (r.returns) {
      const s = xe(r.returns), c = s.length;
      for (let m = 0; m < c; m++)
        i.push(sr(s[m], {
          modifiers: Re.functionModifiers,
          structs: t,
          type: "function"
        }));
    }
    return {
      name: r.name,
      type: "function",
      stateMutability: r.stateMutability ?? "nonpayable",
      inputs: a,
      outputs: i
    };
  }
  if ((0, Re.isEventSignature)(e)) {
    const r = (0, Re.execEventSignature)(e);
    if (!r)
      throw new Pn.InvalidSignatureError({ signature: e, type: "event" });
    const n = xe(r.parameters), a = [], o = n.length;
    for (let i = 0; i < o; i++)
      a.push(sr(n[i], {
        modifiers: Re.eventModifiers,
        structs: t,
        type: "event"
      }));
    return { name: r.name, type: "event", inputs: a };
  }
  if ((0, Re.isErrorSignature)(e)) {
    const r = (0, Re.execErrorSignature)(e);
    if (!r)
      throw new Pn.InvalidSignatureError({ signature: e, type: "error" });
    const n = xe(r.parameters), a = [], o = n.length;
    for (let i = 0; i < o; i++)
      a.push(sr(n[i], { structs: t, type: "error" }));
    return { name: r.name, type: "error", inputs: a };
  }
  if ((0, Re.isConstructorSignature)(e)) {
    const r = (0, Re.execConstructorSignature)(e);
    if (!r)
      throw new Pn.InvalidSignatureError({ signature: e, type: "constructor" });
    const n = xe(r.parameters), a = [], o = n.length;
    for (let i = 0; i < o; i++)
      a.push(sr(n[i], { structs: t, type: "constructor" }));
    return {
      type: "constructor",
      stateMutability: r.stateMutability ?? "nonpayable",
      inputs: a
    };
  }
  if ((0, Re.isFallbackSignature)(e))
    return { type: "fallback" };
  if ((0, Re.isReceiveSignature)(e))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new Pn.UnknownSignatureError({ signature: e });
}
se.parseSignature = km;
const Dm = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, Hm = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, Um = /^u?int$/;
function sr(e, t) {
  var d, l;
  const r = (0, Ka.getParameterCacheKey)(e, t == null ? void 0 : t.type);
  if (Ka.parameterCache.has(r))
    return Ka.parameterCache.get(r);
  const n = Nr.isTupleRegex.test(e), a = (0, Nr.execTyped)(n ? Hm : Dm, e);
  if (!a)
    throw new Va.InvalidParameterError({ param: e });
  if (a.name && yl(a.name))
    throw new Va.SolidityProtectedKeywordError({ param: e, name: a.name });
  const o = a.name ? { name: a.name } : {}, i = a.modifier === "indexed" ? { indexed: !0 } : {}, s = (t == null ? void 0 : t.structs) ?? {};
  let c, m = {};
  if (n) {
    c = "tuple";
    const f = xe(a.type), b = [], y = f.length;
    for (let h = 0; h < y; h++)
      b.push(sr(f[h], { structs: s }));
    m = { components: b };
  } else if (a.type in s)
    c = "tuple", m = { components: s[a.type] };
  else if (Um.test(a.type))
    c = `${a.type}256`;
  else if (c = a.type, (t == null ? void 0 : t.type) !== "struct" && !gl(c))
    throw new Fm.UnknownSolidityTypeError({ type: c });
  if (a.modifier) {
    if (!((l = (d = t == null ? void 0 : t.modifiers) == null ? void 0 : d.has) != null && l.call(d, a.modifier)))
      throw new Va.InvalidModifierError({
        param: e,
        type: t == null ? void 0 : t.type,
        modifier: a.modifier
      });
    if (Re.functionModifiers.has(a.modifier) && !_l(c, !!a.array))
      throw new Va.InvalidFunctionModifierError({
        param: e,
        type: t == null ? void 0 : t.type,
        modifier: a.modifier
      });
  }
  const u = {
    type: `${c}${a.array ?? ""}`,
    ...o,
    ...i,
    ...m
  };
  return Ka.parameterCache.set(r, u), u;
}
se.parseAbiParameter = sr;
function xe(e, t = [], r = "", n = 0) {
  if (e === "") {
    if (r === "")
      return t;
    if (n !== 0)
      throw new Nm.InvalidParenthesisError({ current: r, depth: n });
    return t.push(r.trim()), t;
  }
  const a = e.length;
  for (let o = 0; o < a; o++) {
    const i = e[o], s = e.slice(o + 1);
    switch (i) {
      case ",":
        return n === 0 ? xe(s, [...t, r.trim()]) : xe(s, t, `${r}${i}`, n);
      case "(":
        return xe(s, t, `${r}${i}`, n + 1);
      case ")":
        return xe(s, t, `${r}${i}`, n - 1);
      default:
        return xe(s, t, `${r}${i}`, n);
    }
  }
  return [];
}
se.splitParameters = xe;
function gl(e) {
  return e === "address" || e === "bool" || e === "function" || e === "string" || Nr.bytesRegex.test(e) || Nr.integerRegex.test(e);
}
se.isSolidityType = gl;
const Lm = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function yl(e) {
  return e === "address" || e === "bool" || e === "function" || e === "string" || e === "tuple" || Nr.bytesRegex.test(e) || Nr.integerRegex.test(e) || Lm.test(e);
}
se.isSolidityKeyword = yl;
function _l(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
se.isValidDataLocation = _l;
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.parseStructs = void 0;
const ru = De, qm = dt, xm = fe, nu = lt, zm = ta, au = U, hl = se;
function Gm(e) {
  const t = {}, r = e.length;
  for (let i = 0; i < r; i++) {
    const s = e[i];
    if (!(0, au.isStructSignature)(s))
      continue;
    const c = (0, au.execStructSignature)(s);
    if (!c)
      throw new nu.InvalidSignatureError({ signature: s, type: "struct" });
    const m = c.properties.split(";"), u = [], d = m.length;
    for (let l = 0; l < d; l++) {
      const b = m[l].trim();
      if (!b)
        continue;
      const y = (0, hl.parseAbiParameter)(b, {
        type: "struct"
      });
      u.push(y);
    }
    if (!u.length)
      throw new nu.InvalidStructSignatureError({ signature: s });
    t[c.name] = u;
  }
  const n = {}, a = Object.entries(t), o = a.length;
  for (let i = 0; i < o; i++) {
    const [s, c] = a[i];
    n[s] = pl(c, t);
  }
  return n;
}
gr.parseStructs = Gm;
const Wm = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function pl(e, t, r = /* @__PURE__ */ new Set()) {
  const n = [], a = e.length;
  for (let o = 0; o < a; o++) {
    const i = e[o];
    if (ru.isTupleRegex.test(i.type))
      n.push(i);
    else {
      const c = (0, ru.execTyped)(Wm, i.type);
      if (!(c != null && c.type))
        throw new xm.InvalidAbiTypeParameterError({ abiParameter: i });
      const { array: m, type: u } = c;
      if (u in t) {
        if (r.has(u))
          throw new zm.CircularReferenceError({ type: u });
        n.push({
          ...i,
          type: `tuple${m ?? ""}`,
          components: pl(t[u] ?? [], t, /* @__PURE__ */ new Set([...r, u]))
        });
      } else if ((0, hl.isSolidityType)(u))
        n.push(i);
      else
        throw new qm.UnknownTypeError({ type: u });
    }
  }
  return n;
}
Object.defineProperty(Ao, "__esModule", { value: !0 });
Ao.parseAbi = void 0;
const Vm = U, Km = gr, Zm = se;
function Jm(e) {
  const t = (0, Km.parseStructs)(e), r = [], n = e.length;
  for (let a = 0; a < n; a++) {
    const o = e[a];
    (0, Vm.isStructSignature)(o) || r.push((0, Zm.parseSignature)(o, t));
  }
  return r;
}
Ao.parseAbi = Jm;
var Tn = {}, ou;
function Xm() {
  if (ou)
    return Tn;
  ou = 1, Object.defineProperty(Tn, "__esModule", { value: !0 }), Tn.parseAbiItem = void 0;
  const e = xr(), t = U, r = gr, n = se;
  function a(o) {
    let i;
    if (typeof o == "string")
      i = (0, n.parseSignature)(o);
    else {
      const s = (0, r.parseStructs)(o), c = o.length;
      for (let m = 0; m < c; m++) {
        const u = o[m];
        if (!(0, t.isStructSignature)(u)) {
          i = (0, n.parseSignature)(u, s);
          break;
        }
      }
    }
    if (!i)
      throw new e.InvalidAbiItemError({ signature: o });
    return i;
  }
  return Tn.parseAbiItem = a, Tn;
}
var An = {}, iu;
function Qm() {
  if (iu)
    return An;
  iu = 1, Object.defineProperty(An, "__esModule", { value: !0 }), An.parseAbiParameter = void 0;
  const e = xr(), t = U, r = gr, n = se;
  function a(o) {
    let i;
    if (typeof o == "string")
      i = (0, n.parseAbiParameter)(o, {
        modifiers: t.modifiers
      });
    else {
      const s = (0, r.parseStructs)(o), c = o.length;
      for (let m = 0; m < c; m++) {
        const u = o[m];
        if (!(0, t.isStructSignature)(u)) {
          i = (0, n.parseAbiParameter)(u, { modifiers: t.modifiers, structs: s });
          break;
        }
      }
    }
    if (!i)
      throw new e.InvalidAbiParameterError({ param: o });
    return i;
  }
  return An.parseAbiParameter = a, An;
}
var wn = {}, su;
function Ym() {
  if (su)
    return wn;
  su = 1, Object.defineProperty(wn, "__esModule", { value: !0 }), wn.parseAbiParameters = void 0;
  const e = xr(), t = U, r = gr, n = se, a = se;
  function o(i) {
    const s = [];
    if (typeof i == "string") {
      const c = (0, n.splitParameters)(i), m = c.length;
      for (let u = 0; u < m; u++)
        s.push((0, a.parseAbiParameter)(c[u], { modifiers: t.modifiers }));
    } else {
      const c = (0, r.parseStructs)(i), m = i.length;
      for (let u = 0; u < m; u++) {
        const d = i[u];
        if ((0, t.isStructSignature)(d))
          continue;
        const l = (0, n.splitParameters)(d), f = l.length;
        for (let b = 0; b < f; b++)
          s.push((0, a.parseAbiParameter)(l[b], { modifiers: t.modifiers, structs: c }));
      }
    }
    if (s.length === 0)
      throw new e.InvalidAbiParametersError({ params: i });
    return s;
  }
  return wn.parseAbiParameters = o, wn;
}
var cu;
function xr() {
  return cu || (cu = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CircularReferenceError = e.InvalidParenthesisError = e.UnknownSignatureError = e.InvalidSignatureError = e.InvalidStructSignatureError = e.InvalidAbiParameterError = e.InvalidAbiParametersError = e.InvalidParameterError = e.SolidityProtectedKeywordError = e.InvalidModifierError = e.InvalidFunctionModifierError = e.InvalidAbiTypeParameterError = e.UnknownSolidityTypeError = e.InvalidAbiItemError = e.UnknownTypeError = e.parseAbiParameters = e.parseAbiParameter = e.parseAbiItem = e.parseAbi = e.formatAbiParameters = e.formatAbiParameter = e.formatAbiItem = e.formatAbi = e.narrow = e.BaseError = void 0;
    var t = St;
    Object.defineProperty(e, "BaseError", { enumerable: !0, get: function() {
      return t.BaseError;
    } });
    var r = Po;
    Object.defineProperty(e, "narrow", { enumerable: !0, get: function() {
      return r.narrow;
    } });
    var n = To;
    Object.defineProperty(e, "formatAbi", { enumerable: !0, get: function() {
      return n.formatAbi;
    } });
    var a = Xn;
    Object.defineProperty(e, "formatAbiItem", { enumerable: !0, get: function() {
      return a.formatAbiItem;
    } });
    var o = Yn;
    Object.defineProperty(e, "formatAbiParameter", { enumerable: !0, get: function() {
      return o.formatAbiParameter;
    } });
    var i = Qn;
    Object.defineProperty(e, "formatAbiParameters", { enumerable: !0, get: function() {
      return i.formatAbiParameters;
    } });
    var s = Ao;
    Object.defineProperty(e, "parseAbi", { enumerable: !0, get: function() {
      return s.parseAbi;
    } });
    var c = Xm();
    Object.defineProperty(e, "parseAbiItem", { enumerable: !0, get: function() {
      return c.parseAbiItem;
    } });
    var m = Qm();
    Object.defineProperty(e, "parseAbiParameter", { enumerable: !0, get: function() {
      return m.parseAbiParameter;
    } });
    var u = Ym();
    Object.defineProperty(e, "parseAbiParameters", { enumerable: !0, get: function() {
      return u.parseAbiParameters;
    } });
    var d = dt;
    Object.defineProperty(e, "UnknownTypeError", { enumerable: !0, get: function() {
      return d.UnknownTypeError;
    } }), Object.defineProperty(e, "InvalidAbiItemError", { enumerable: !0, get: function() {
      return d.InvalidAbiItemError;
    } }), Object.defineProperty(e, "UnknownSolidityTypeError", { enumerable: !0, get: function() {
      return d.UnknownSolidityTypeError;
    } });
    var l = fe;
    Object.defineProperty(e, "InvalidAbiTypeParameterError", { enumerable: !0, get: function() {
      return l.InvalidAbiTypeParameterError;
    } }), Object.defineProperty(e, "InvalidFunctionModifierError", { enumerable: !0, get: function() {
      return l.InvalidFunctionModifierError;
    } }), Object.defineProperty(e, "InvalidModifierError", { enumerable: !0, get: function() {
      return l.InvalidModifierError;
    } }), Object.defineProperty(e, "SolidityProtectedKeywordError", { enumerable: !0, get: function() {
      return l.SolidityProtectedKeywordError;
    } }), Object.defineProperty(e, "InvalidParameterError", { enumerable: !0, get: function() {
      return l.InvalidParameterError;
    } }), Object.defineProperty(e, "InvalidAbiParametersError", { enumerable: !0, get: function() {
      return l.InvalidAbiParametersError;
    } }), Object.defineProperty(e, "InvalidAbiParameterError", { enumerable: !0, get: function() {
      return l.InvalidAbiParameterError;
    } });
    var f = lt;
    Object.defineProperty(e, "InvalidStructSignatureError", { enumerable: !0, get: function() {
      return f.InvalidStructSignatureError;
    } }), Object.defineProperty(e, "InvalidSignatureError", { enumerable: !0, get: function() {
      return f.InvalidSignatureError;
    } }), Object.defineProperty(e, "UnknownSignatureError", { enumerable: !0, get: function() {
      return f.UnknownSignatureError;
    } });
    var b = ra;
    Object.defineProperty(e, "InvalidParenthesisError", { enumerable: !0, get: function() {
      return b.InvalidParenthesisError;
    } });
    var y = ta;
    Object.defineProperty(e, "CircularReferenceError", { enumerable: !0, get: function() {
      return y.CircularReferenceError;
    } });
  }(Vs)), Vs;
}
var Ut = {}, X = {};
Object.defineProperty(X, "__esModule", { value: !0 });
X.getAction = void 0;
function eg(e, t, r) {
  return (n) => {
    var a;
    return ((a = e[t.name || r]) == null ? void 0 : a.call(e, n)) ?? t(e, n);
  };
}
X.getAction = eg;
var zr = {}, Rt = {}, S = {}, rr = {}, uu;
function Bt() {
  if (uu)
    return rr;
  uu = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.formatAbiParams = rr.formatAbiItem = void 0;
  const e = Y();
  function t(a, { includeName: o = !1 } = {}) {
    if (a.type !== "function" && a.type !== "event" && a.type !== "error")
      throw new e.InvalidDefinitionTypeError(a.type);
    return `${a.name}(${r(a.inputs, { includeName: o })})`;
  }
  rr.formatAbiItem = t;
  function r(a, { includeName: o = !1 } = {}) {
    return a ? a.map((i) => n(i, { includeName: o })).join(o ? ", " : ",") : "";
  }
  rr.formatAbiParams = r;
  function n(a, { includeName: o }) {
    return a.type.startsWith("tuple") ? `(${r(a.components, { includeName: o })})${a.type.slice(5)}` : a.type + (o && a.name ? ` ${a.name}` : "");
  }
  return rr;
}
var We = {}, ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.isHex = void 0;
function tg(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x");
}
ce.isHex = tg;
Object.defineProperty(We, "__esModule", { value: !0 });
We.size = void 0;
const rg = ce;
function ng(e) {
  return (0, rg.isHex)(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
We.size = ng;
var G = {}, Xe = {}, wo = {};
Object.defineProperty(wo, "__esModule", { value: !0 });
wo.version = void 0;
wo.version = "1.21.3";
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.getVersion = Xe.getUrl = Xe.getContractAddress = void 0;
const ag = wo, og = (e) => e;
Xe.getContractAddress = og;
const ig = (e) => e;
Xe.getUrl = ig;
const sg = () => `viem@${ag.version}`;
Xe.getVersion = sg;
Object.defineProperty(G, "__esModule", { value: !0 });
G.BaseError = void 0;
const cg = Xe;
class no extends Error {
  constructor(t, r = {}) {
    var o;
    super(), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ViemError"
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: (0, cg.getVersion)()
    });
    const n = r.cause instanceof no ? r.cause.details : (o = r.cause) != null && o.message ? r.cause.message : r.details, a = r.cause instanceof no && r.cause.docsPath || r.docsPath;
    this.message = [
      t || "An error occurred.",
      "",
      ...r.metaMessages ? [...r.metaMessages, ""] : [],
      ...a ? [
        `Docs: https://viem.sh${a}.html${r.docsSlug ? `#${r.docsSlug}` : ""}`
      ] : [],
      ...n ? [`Details: ${n}`] : [],
      `Version: ${this.version}`
    ].join(`
`), r.cause && (this.cause = r.cause), this.details = n, this.docsPath = a, this.metaMessages = r.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return vl(this, t);
  }
}
G.BaseError = no;
function vl(e, t) {
  return t != null && t(e) ? e : e && typeof e == "object" && "cause" in e ? vl(e.cause, t) : t ? null : e;
}
var du;
function Y() {
  if (du)
    return S;
  du = 1, Object.defineProperty(S, "__esModule", { value: !0 }), S.UnsupportedPackedAbiType = S.InvalidDefinitionTypeError = S.InvalidArrayError = S.InvalidAbiDecodingTypeError = S.InvalidAbiEncodingTypeError = S.DecodeLogTopicsMismatch = S.DecodeLogDataMismatch = S.BytesSizeMismatchError = S.AbiItemAmbiguityError = S.AbiFunctionSignatureNotFoundError = S.AbiFunctionOutputsNotFoundError = S.AbiFunctionNotFoundError = S.AbiEventNotFoundError = S.AbiEventSignatureNotFoundError = S.AbiEventSignatureEmptyTopicsError = S.AbiErrorSignatureNotFoundError = S.AbiErrorNotFoundError = S.AbiErrorInputsNotFoundError = S.AbiEncodingLengthMismatchError = S.AbiEncodingBytesSizeMismatchError = S.AbiEncodingArrayLengthMismatchError = S.AbiDecodingZeroDataError = S.AbiDecodingDataSizeTooSmallError = S.AbiDecodingDataSizeInvalidError = S.AbiConstructorParamsNotFoundError = S.AbiConstructorNotFoundError = void 0;
  const e = Bt(), t = We, r = G;
  class n extends r.BaseError {
    constructor({ docsPath: w }) {
      super([
        "A constructor was not found on the ABI.",
        "Make sure you are using the correct ABI and that the constructor exists on it."
      ].join(`
`), {
        docsPath: w
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiConstructorNotFoundError"
      });
    }
  }
  S.AbiConstructorNotFoundError = n;
  class a extends r.BaseError {
    constructor({ docsPath: w }) {
      super([
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
        "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
      ].join(`
`), {
        docsPath: w
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiConstructorParamsNotFoundError"
      });
    }
  }
  S.AbiConstructorParamsNotFoundError = a;
  class o extends r.BaseError {
    constructor({ data: w, size: I }) {
      super([
        `Data size of ${I} bytes is invalid.`,
        "Size must be in increments of 32 bytes (size % 32 === 0)."
      ].join(`
`), { metaMessages: [`Data: ${w} (${I} bytes)`] }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingDataSizeInvalidError"
      });
    }
  }
  S.AbiDecodingDataSizeInvalidError = o;
  class i extends r.BaseError {
    constructor({ data: w, params: I, size: z }) {
      super([`Data size of ${z} bytes is too small for given parameters.`].join(`
`), {
        metaMessages: [
          `Params: (${(0, e.formatAbiParams)(I, { includeName: !0 })})`,
          `Data:   ${w} (${z} bytes)`
        ]
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingDataSizeTooSmallError"
      }), Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.data = w, this.params = I, this.size = z;
    }
  }
  S.AbiDecodingDataSizeTooSmallError = i;
  class s extends r.BaseError {
    constructor() {
      super('Cannot decode zero data ("0x") with ABI parameters.'), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingZeroDataError"
      });
    }
  }
  S.AbiDecodingZeroDataError = s;
  class c extends r.BaseError {
    constructor({ expectedLength: w, givenLength: I, type: z }) {
      super([
        `ABI encoding array length mismatch for type ${z}.`,
        `Expected length: ${w}`,
        `Given length: ${I}`
      ].join(`
`)), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEncodingArrayLengthMismatchError"
      });
    }
  }
  S.AbiEncodingArrayLengthMismatchError = c;
  class m extends r.BaseError {
    constructor({ expectedSize: w, value: I }) {
      super(`Size of bytes "${I}" (bytes${(0, t.size)(I)}) does not match expected size (bytes${w}).`), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEncodingBytesSizeMismatchError"
      });
    }
  }
  S.AbiEncodingBytesSizeMismatchError = m;
  class u extends r.BaseError {
    constructor({ expectedLength: w, givenLength: I }) {
      super([
        "ABI encoding params/values length mismatch.",
        `Expected length (params): ${w}`,
        `Given length (values): ${I}`
      ].join(`
`)), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEncodingLengthMismatchError"
      });
    }
  }
  S.AbiEncodingLengthMismatchError = u;
  class d extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Arguments (\`args\`) were provided to "${w}", but "${w}" on the ABI does not contain any parameters (\`inputs\`).`,
        "Cannot encode error result without knowing what the parameter types are.",
        "Make sure you are using the correct ABI and that the inputs exist on it."
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiErrorInputsNotFoundError"
      });
    }
  }
  S.AbiErrorInputsNotFoundError = d;
  class l extends r.BaseError {
    constructor(w, { docsPath: I } = {}) {
      super([
        `Error ${w ? `"${w}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it."
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiErrorNotFoundError"
      });
    }
  }
  S.AbiErrorNotFoundError = l;
  class f extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Encoded error signature "${w}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${w}.`
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiErrorSignatureNotFoundError"
      }), Object.defineProperty(this, "signature", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.signature = w;
    }
  }
  S.AbiErrorSignatureNotFoundError = f;
  class b extends r.BaseError {
    constructor({ docsPath: w }) {
      super("Cannot extract event signature from empty topics.", {
        docsPath: w
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEventSignatureEmptyTopicsError"
      });
    }
  }
  S.AbiEventSignatureEmptyTopicsError = b;
  class y extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Encoded event signature "${w}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the event exists on it.",
        `You can look up the signature here: https://openchain.xyz/signatures?query=${w}.`
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEventSignatureNotFoundError"
      });
    }
  }
  S.AbiEventSignatureNotFoundError = y;
  class h extends r.BaseError {
    constructor(w, { docsPath: I } = {}) {
      super([
        `Event ${w ? `"${w}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the event exists on it."
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEventNotFoundError"
      });
    }
  }
  S.AbiEventNotFoundError = h;
  class p extends r.BaseError {
    constructor(w, { docsPath: I } = {}) {
      super([
        `Function ${w ? `"${w}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the function exists on it."
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiFunctionNotFoundError"
      });
    }
  }
  S.AbiFunctionNotFoundError = p;
  class g extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Function "${w}" does not contain any \`outputs\` on ABI.`,
        "Cannot decode function result without knowing what the parameter types are.",
        "Make sure you are using the correct ABI and that the function exists on it."
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiFunctionOutputsNotFoundError"
      });
    }
  }
  S.AbiFunctionOutputsNotFoundError = g;
  class v extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Encoded function signature "${w}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the function exists on it.",
        `You can look up the signature here: https://openchain.xyz/signatures?query=${w}.`
      ].join(`
`), {
        docsPath: I
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiFunctionSignatureNotFoundError"
      });
    }
  }
  S.AbiFunctionSignatureNotFoundError = v;
  class j extends r.BaseError {
    constructor(w, I) {
      super("Found ambiguous types in overloaded ABI items.", {
        metaMessages: [
          `\`${w.type}\` in \`${(0, e.formatAbiItem)(w.abiItem)}\`, and`,
          `\`${I.type}\` in \`${(0, e.formatAbiItem)(I.abiItem)}\``,
          "",
          "These types encode differently and cannot be distinguished at runtime.",
          "Remove one of the ambiguous items in the ABI."
        ]
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiItemAmbiguityError"
      });
    }
  }
  S.AbiItemAmbiguityError = j;
  class E extends r.BaseError {
    constructor({ expectedSize: w, givenSize: I }) {
      super(`Expected bytes${w}, got bytes${I}.`), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "BytesSizeMismatchError"
      });
    }
  }
  S.BytesSizeMismatchError = E;
  class P extends r.BaseError {
    constructor({ abiItem: w, data: I, params: z, size: W }) {
      super([
        `Data size of ${W} bytes is too small for non-indexed event parameters.`
      ].join(`
`), {
        metaMessages: [
          `Params: (${(0, e.formatAbiParams)(z, { includeName: !0 })})`,
          `Data:   ${I} (${W} bytes)`
        ]
      }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "DecodeLogDataMismatch"
      }), Object.defineProperty(this, "abiItem", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.abiItem = w, this.data = I, this.params = z, this.size = W;
    }
  }
  S.DecodeLogDataMismatch = P;
  class $ extends r.BaseError {
    constructor({ abiItem: w, param: I }) {
      super([
        `Expected a topic for indexed event parameter${I.name ? ` "${I.name}"` : ""} on event "${(0, e.formatAbiItem)(w, { includeName: !0 })}".`
      ].join(`
`)), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "DecodeLogTopicsMismatch"
      }), Object.defineProperty(this, "abiItem", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.abiItem = w;
    }
  }
  S.DecodeLogTopicsMismatch = $;
  class k extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Type "${w}" is not a valid encoding type.`,
        "Please provide a valid ABI type."
      ].join(`
`), { docsPath: I }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiEncodingType"
      });
    }
  }
  S.InvalidAbiEncodingTypeError = k;
  class L extends r.BaseError {
    constructor(w, { docsPath: I }) {
      super([
        `Type "${w}" is not a valid decoding type.`,
        "Please provide a valid ABI type."
      ].join(`
`), { docsPath: I }), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiDecodingType"
      });
    }
  }
  S.InvalidAbiDecodingTypeError = L;
  class N extends r.BaseError {
    constructor(w) {
      super([`Value "${w}" is not a valid array.`].join(`
`)), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidArrayError"
      });
    }
  }
  S.InvalidArrayError = N;
  class K extends r.BaseError {
    constructor(w) {
      super([
        `"${w}" is not a valid definition type.`,
        'Valid types: "function", "event", "error"'
      ].join(`
`)), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidDefinitionTypeError"
      });
    }
  }
  S.InvalidDefinitionTypeError = K;
  class x extends r.BaseError {
    constructor(w) {
      super(`Type "${w}" is not supported for packed encoding.`), Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnsupportedPackedAbiType"
      });
    }
  }
  return S.UnsupportedPackedAbiType = x, S;
}
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
na.FilterTypeNotSupportedError = void 0;
const ug = G;
class dg extends ug.BaseError {
  constructor(t) {
    super(`Filter type "${t}" is not supported.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FilterTypeNotSupportedError"
    });
  }
}
na.FilterTypeNotSupportedError = dg;
var Fe = {}, we = {}, qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.SizeExceedsPaddingSizeError = qt.SliceOffsetOutOfBoundsError = void 0;
const El = G;
class lg extends El.BaseError {
  constructor({ offset: t, position: r, size: n }) {
    super(`Slice ${r === "start" ? "starting" : "ending"} at offset "${t}" is out-of-bounds (size: ${n}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SliceOffsetOutOfBoundsError"
    });
  }
}
qt.SliceOffsetOutOfBoundsError = lg;
class fg extends El.BaseError {
  constructor({ size: t, targetSize: r, type: n }) {
    super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (${t}) exceeds padding size (${r}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeExceedsPaddingSizeError"
    });
  }
}
qt.SizeExceedsPaddingSizeError = fg;
Object.defineProperty(we, "__esModule", { value: !0 });
we.padBytes = we.padHex = we.pad = void 0;
const jl = qt;
function bg(e, { dir: t, size: r = 32 } = {}) {
  return typeof e == "string" ? Pl(e, { dir: t, size: r }) : Tl(e, { dir: t, size: r });
}
we.pad = bg;
function Pl(e, { dir: t, size: r = 32 } = {}) {
  if (r === null)
    return e;
  const n = e.replace("0x", "");
  if (n.length > r * 2)
    throw new jl.SizeExceedsPaddingSizeError({
      size: Math.ceil(n.length / 2),
      targetSize: r,
      type: "hex"
    });
  return `0x${n[t === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
we.padHex = Pl;
function Tl(e, { dir: t, size: r = 32 } = {}) {
  if (r === null)
    return e;
  if (e.length > r)
    throw new jl.SizeExceedsPaddingSizeError({
      size: e.length,
      targetSize: r,
      type: "bytes"
    });
  const n = new Uint8Array(r);
  for (let a = 0; a < r; a++) {
    const o = t === "right";
    n[o ? a : r - a - 1] = e[o ? a : e.length - a - 1];
  }
  return n;
}
we.padBytes = Tl;
var Ae = {}, te = {};
Object.defineProperty(te, "__esModule", { value: !0 });
te.SizeOverflowError = te.OffsetOutOfBoundsError = te.InvalidHexValueError = te.InvalidHexBooleanError = te.InvalidBytesBooleanError = te.IntegerOutOfRangeError = te.DataLengthTooShortError = te.DataLengthTooLongError = void 0;
const zt = G;
class mg extends zt.BaseError {
  constructor({ consumed: t, length: r }) {
    super(`Consumed bytes (${t}) is shorter than data length (${r - 1}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "DataLengthTooLongError"
    });
  }
}
te.DataLengthTooLongError = mg;
class gg extends zt.BaseError {
  constructor({ length: t, dataLength: r }) {
    super(`Data length (${r - 1}) is shorter than consumed bytes length (${t - 1}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "DataLengthTooShortError"
    });
  }
}
te.DataLengthTooShortError = gg;
class yg extends zt.BaseError {
  constructor({ max: t, min: r, signed: n, size: a, value: o }) {
    super(`Number "${o}" is not in safe ${a ? `${a * 8}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${r} to ${t})` : `(above ${r})`}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntegerOutOfRangeError"
    });
  }
}
te.IntegerOutOfRangeError = yg;
class _g extends zt.BaseError {
  constructor(t) {
    super(`Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidBytesBooleanError"
    });
  }
}
te.InvalidBytesBooleanError = _g;
class hg extends zt.BaseError {
  constructor(t) {
    super(`Hex value "${t}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidHexBooleanError"
    });
  }
}
te.InvalidHexBooleanError = hg;
class pg extends zt.BaseError {
  constructor(t) {
    super(`Hex value "${t}" is an odd length (${t.length}). It must be an even length.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidHexValueError"
    });
  }
}
te.InvalidHexValueError = pg;
class vg extends zt.BaseError {
  constructor({ nextOffset: t, offset: r }) {
    super(`Next offset (${t}) is greater than previous offset + consumed bytes (${r})`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "OffsetOutOfBoundsError"
    });
  }
}
te.OffsetOutOfBoundsError = vg;
class Eg extends zt.BaseError {
  constructor({ givenSize: t, maxSize: r }) {
    super(`Size cannot exceed ${r} bytes. Given size: ${t} bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeOverflowError"
    });
  }
}
te.SizeOverflowError = Eg;
var et = {};
Object.defineProperty(et, "__esModule", { value: !0 });
et.trim = void 0;
function jg(e, { dir: t = "left" } = {}) {
  let r = typeof e == "string" ? e.replace("0x", "") : e, n = 0;
  for (let a = 0; a < r.length - 1 && r[t === "left" ? a : r.length - a - 1].toString() === "0"; a++)
    n++;
  return r = t === "left" ? r.slice(n) : r.slice(0, r.length - n), typeof e == "string" ? (r.length === 1 && t === "right" && (r = `${r}0`), `0x${r.length % 2 === 1 ? `0${r}` : r}`) : r;
}
et.trim = jg;
var lu;
function ue() {
  if (lu)
    return Ae;
  lu = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.hexToString = Ae.hexToNumber = Ae.hexToBool = Ae.hexToBigInt = Ae.fromHex = Ae.assertSize = void 0;
  const e = te, t = We, r = et, n = de();
  function a(u, { size: d }) {
    if ((0, t.size)(u) > d)
      throw new e.SizeOverflowError({
        givenSize: (0, t.size)(u),
        maxSize: d
      });
  }
  Ae.assertSize = a;
  function o(u, d) {
    const l = typeof d == "string" ? { to: d } : d, f = l.to;
    return f === "number" ? c(u, l) : f === "bigint" ? i(u, l) : f === "string" ? m(u, l) : f === "boolean" ? s(u, l) : (0, n.hexToBytes)(u, l);
  }
  Ae.fromHex = o;
  function i(u, d = {}) {
    const { signed: l } = d;
    d.size && a(u, { size: d.size });
    const f = BigInt(u);
    if (!l)
      return f;
    const b = (u.length - 2) / 2, y = (1n << BigInt(b) * 8n - 1n) - 1n;
    return f <= y ? f : f - BigInt(`0x${"f".padStart(b * 2, "f")}`) - 1n;
  }
  Ae.hexToBigInt = i;
  function s(u, d = {}) {
    let l = u;
    if (d.size && (a(l, { size: d.size }), l = (0, r.trim)(l)), (0, r.trim)(l) === "0x00")
      return !1;
    if ((0, r.trim)(l) === "0x01")
      return !0;
    throw new e.InvalidHexBooleanError(l);
  }
  Ae.hexToBool = s;
  function c(u, d = {}) {
    return Number(i(u, d));
  }
  Ae.hexToNumber = c;
  function m(u, d = {}) {
    let l = (0, n.hexToBytes)(u);
    return d.size && (a(l, { size: d.size }), l = (0, r.trim)(l, { dir: "right" })), new TextDecoder().decode(l);
  }
  return Ae.hexToString = m, Ae;
}
var Ne = {}, fu;
function M() {
  if (fu)
    return Ne;
  fu = 1, Object.defineProperty(Ne, "__esModule", { value: !0 }), Ne.stringToHex = Ne.numberToHex = Ne.bytesToHex = Ne.boolToHex = Ne.toHex = void 0;
  const e = te, t = we, r = ue(), n = Array.from({ length: 256 }, (u, d) => d.toString(16).padStart(2, "0"));
  function a(u, d = {}) {
    return typeof u == "number" || typeof u == "bigint" ? s(u, d) : typeof u == "string" ? m(u, d) : typeof u == "boolean" ? o(u, d) : i(u, d);
  }
  Ne.toHex = a;
  function o(u, d = {}) {
    const l = `0x${Number(u)}`;
    return typeof d.size == "number" ? ((0, r.assertSize)(l, { size: d.size }), (0, t.pad)(l, { size: d.size })) : l;
  }
  Ne.boolToHex = o;
  function i(u, d = {}) {
    let l = "";
    for (let b = 0; b < u.length; b++)
      l += n[u[b]];
    const f = `0x${l}`;
    return typeof d.size == "number" ? ((0, r.assertSize)(f, { size: d.size }), (0, t.pad)(f, { dir: "right", size: d.size })) : f;
  }
  Ne.bytesToHex = i;
  function s(u, d = {}) {
    const { signed: l, size: f } = d, b = BigInt(u);
    let y;
    f ? l ? y = (1n << BigInt(f) * 8n - 1n) - 1n : y = 2n ** (BigInt(f) * 8n) - 1n : typeof u == "number" && (y = BigInt(Number.MAX_SAFE_INTEGER));
    const h = typeof y == "bigint" && l ? -y - 1n : 0;
    if (y && b > y || b < h) {
      const g = typeof u == "bigint" ? "n" : "";
      throw new e.IntegerOutOfRangeError({
        max: y ? `${y}${g}` : void 0,
        min: `${h}${g}`,
        signed: l,
        size: f,
        value: `${u}${g}`
      });
    }
    const p = `0x${(l && b < 0 ? (1n << BigInt(f * 8)) + BigInt(b) : b).toString(16)}`;
    return f ? (0, t.pad)(p, { size: f }) : p;
  }
  Ne.numberToHex = s;
  const c = new TextEncoder();
  function m(u, d = {}) {
    const l = c.encode(u);
    return i(l, d);
  }
  return Ne.stringToHex = m, Ne;
}
var bu;
function de() {
  if (bu)
    return Fe;
  bu = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.stringToBytes = Fe.numberToBytes = Fe.hexToBytes = Fe.boolToBytes = Fe.toBytes = void 0;
  const e = G, t = ce, r = we, n = ue(), a = M(), o = new TextEncoder();
  function i(f, b = {}) {
    return typeof f == "number" || typeof f == "bigint" ? d(f, b) : typeof f == "boolean" ? s(f, b) : (0, t.isHex)(f) ? u(f, b) : l(f, b);
  }
  Fe.toBytes = i;
  function s(f, b = {}) {
    const y = new Uint8Array(1);
    return y[0] = Number(f), typeof b.size == "number" ? ((0, n.assertSize)(y, { size: b.size }), (0, r.pad)(y, { size: b.size })) : y;
  }
  Fe.boolToBytes = s;
  const c = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
  };
  function m(f) {
    if (f >= c.zero && f <= c.nine)
      return f - c.zero;
    if (f >= c.A && f <= c.F)
      return f - (c.A - 10);
    if (f >= c.a && f <= c.f)
      return f - (c.a - 10);
  }
  function u(f, b = {}) {
    let y = f;
    b.size && ((0, n.assertSize)(y, { size: b.size }), y = (0, r.pad)(y, { dir: "right", size: b.size }));
    let h = y.slice(2);
    h.length % 2 && (h = `0${h}`);
    const p = h.length / 2, g = new Uint8Array(p);
    for (let v = 0, j = 0; v < p; v++) {
      const E = m(h.charCodeAt(j++)), P = m(h.charCodeAt(j++));
      if (E === void 0 || P === void 0)
        throw new e.BaseError(`Invalid byte sequence ("${h[j - 2]}${h[j - 1]}" in "${h}").`);
      g[v] = E * 16 + P;
    }
    return g;
  }
  Fe.hexToBytes = u;
  function d(f, b) {
    const y = (0, a.numberToHex)(f, b);
    return u(y);
  }
  Fe.numberToBytes = d;
  function l(f, b = {}) {
    const y = o.encode(f);
    return typeof b.size == "number" ? ((0, n.assertSize)(y, { size: b.size }), (0, r.pad)(y, { dir: "right", size: b.size })) : y;
  }
  return Fe.stringToBytes = l, Fe;
}
var Gt = {}, aa = {}, Gr = {}, Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.normalizeSignature = void 0;
const Pg = G;
function Tg(e) {
  let t = !0, r = "", n = 0, a = "", o = !1;
  for (let i = 0; i < e.length; i++) {
    const s = e[i];
    if (["(", ")", ","].includes(s) && (t = !0), s === "(" && n++, s === ")" && n--, !!t) {
      if (n === 0) {
        if (s === " " && ["event", "function", ""].includes(a))
          a = "";
        else if (a += s, s === ")") {
          o = !0;
          break;
        }
        continue;
      }
      if (s === " ") {
        e[i - 1] !== "," && r !== "," && r !== ",(" && (r = "", t = !1);
        continue;
      }
      a += s, r += s;
    }
  }
  if (!o)
    throw new Pg.BaseError("Unable to normalize signature.");
  return a;
}
Oo.normalizeSignature = Tg;
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.getFunctionSignature = void 0;
const Ag = xr(), wg = Oo, Og = (e) => {
  const t = typeof e == "string" ? e : (0, Ag.formatAbiItem)(e);
  return (0, wg.normalizeSignature)(t);
};
Gr.getFunctionSignature = Og;
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.getEventSignature = void 0;
const Ig = Gr, $g = (e) => (0, Ig.getFunctionSignature)(e);
aa.getEventSignature = $g;
var Ie = {};
const Cg = /* @__PURE__ */ qr(tb);
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.keccak256 = void 0;
const Sg = Cg, Rg = ce, Bg = de(), Mg = M();
function Fg(e, t) {
  const r = t || "hex", n = (0, Sg.keccak_256)((0, Rg.isHex)(e, { strict: !1 }) ? (0, Bg.toBytes)(e) : e);
  return r === "bytes" ? n : (0, Mg.toHex)(n);
}
Ie.keccak256 = Fg;
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.getEventSelector = void 0;
const Ng = de(), kg = aa, Dg = Ie, Hg = (e) => (0, Dg.keccak256)((0, Ng.toBytes)(e)), Ug = (e) => Hg((0, kg.getEventSignature)(e));
Gt.getEventSelector = Ug;
var Oe = {}, He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.InvalidAddressError = void 0;
const Lg = G;
class qg extends Lg.BaseError {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAddressError"
    });
  }
}
He.InvalidAddressError = qg;
var $e = {};
Object.defineProperty($e, "__esModule", { value: !0 });
$e.isAddress = void 0;
const xg = /^0x[a-fA-F0-9]{40}$/;
function zg(e) {
  return xg.test(e);
}
$e.isAddress = zg;
var oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.concatHex = oe.concatBytes = oe.concat = void 0;
function Gg(e) {
  return typeof e[0] == "string" ? wl(e) : Al(e);
}
oe.concat = Gg;
function Al(e) {
  let t = 0;
  for (const a of e)
    t += a.length;
  const r = new Uint8Array(t);
  let n = 0;
  for (const a of e)
    r.set(a, n), n += a.length;
  return r;
}
oe.concatBytes = Al;
function wl(e) {
  return `0x${e.reduce((t, r) => t + r.replace("0x", ""), "")}`;
}
oe.concatHex = wl;
var Ee = {};
Object.defineProperty(Ee, "__esModule", { value: !0 });
Ee.sliceHex = Ee.sliceBytes = Ee.slice = void 0;
const Ol = qt, Wg = ce, ao = We;
function Vg(e, t, r, { strict: n } = {}) {
  return (0, Wg.isHex)(e, { strict: !1 }) ? Sl(e, t, r, {
    strict: n
  }) : Cl(e, t, r, {
    strict: n
  });
}
Ee.slice = Vg;
function Il(e, t) {
  if (typeof t == "number" && t > 0 && t > (0, ao.size)(e) - 1)
    throw new Ol.SliceOffsetOutOfBoundsError({
      offset: t,
      position: "start",
      size: (0, ao.size)(e)
    });
}
function $l(e, t, r) {
  if (typeof t == "number" && typeof r == "number" && (0, ao.size)(e) !== r - t)
    throw new Ol.SliceOffsetOutOfBoundsError({
      offset: r,
      position: "end",
      size: (0, ao.size)(e)
    });
}
function Cl(e, t, r, { strict: n } = {}) {
  Il(e, t);
  const a = e.slice(t, r);
  return n && $l(a, t, r), a;
}
Ee.sliceBytes = Cl;
function Sl(e, t, r, { strict: n } = {}) {
  Il(e, t);
  const a = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (r ?? e.length) * 2)}`;
  return n && $l(a, t, r), a;
}
Ee.sliceHex = Sl;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.getArrayComponents = Oe.encodeAbiParameters = void 0;
const Wn = Y(), Kg = He, Zg = $e, kr = oe, cr = we, Vn = We, Jg = Ee, dr = M();
function Xg(e, t) {
  if (e.length !== t.length)
    throw new Wn.AbiEncodingLengthMismatchError({
      expectedLength: e.length,
      givenLength: t.length
    });
  const r = Qg({
    params: e,
    values: t
  }), n = Mc(r);
  return n.length === 0 ? "0x" : n;
}
Oe.encodeAbiParameters = Xg;
function Qg({ params: e, values: t }) {
  const r = [];
  for (let n = 0; n < e.length; n++)
    r.push(Bc({ param: e[n], value: t[n] }));
  return r;
}
function Bc({ param: e, value: t }) {
  const r = Rl(e.type);
  if (r) {
    const [n, a] = r;
    return e0(t, { length: n, param: { ...e, type: a } });
  }
  if (e.type === "tuple")
    return o0(t, {
      param: e
    });
  if (e.type === "address")
    return Yg(t);
  if (e.type === "bool")
    return r0(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    const n = e.type.startsWith("int");
    return n0(t, { signed: n });
  }
  if (e.type.startsWith("bytes"))
    return t0(t, { param: e });
  if (e.type === "string")
    return a0(t);
  throw new Wn.InvalidAbiEncodingTypeError(e.type, {
    docsPath: "/docs/contract/encodeAbiParameters"
  });
}
function Mc(e) {
  let t = 0;
  for (let o = 0; o < e.length; o++) {
    const { dynamic: i, encoded: s } = e[o];
    i ? t += 32 : t += (0, Vn.size)(s);
  }
  const r = [], n = [];
  let a = 0;
  for (let o = 0; o < e.length; o++) {
    const { dynamic: i, encoded: s } = e[o];
    i ? (r.push((0, dr.numberToHex)(t + a, { size: 32 })), n.push(s), a += (0, Vn.size)(s)) : r.push(s);
  }
  return (0, kr.concat)([...r, ...n]);
}
function Yg(e) {
  if (!(0, Zg.isAddress)(e))
    throw new Kg.InvalidAddressError({ address: e });
  return { dynamic: !1, encoded: (0, cr.padHex)(e.toLowerCase()) };
}
function e0(e, { length: t, param: r }) {
  const n = t === null;
  if (!Array.isArray(e))
    throw new Wn.InvalidArrayError(e);
  if (!n && e.length !== t)
    throw new Wn.AbiEncodingArrayLengthMismatchError({
      expectedLength: t,
      givenLength: e.length,
      type: `${r.type}[${t}]`
    });
  let a = !1;
  const o = [];
  for (let i = 0; i < e.length; i++) {
    const s = Bc({ param: r, value: e[i] });
    s.dynamic && (a = !0), o.push(s);
  }
  if (n || a) {
    const i = Mc(o);
    if (n) {
      const s = (0, dr.numberToHex)(o.length, { size: 32 });
      return {
        dynamic: !0,
        encoded: o.length > 0 ? (0, kr.concat)([s, i]) : s
      };
    }
    if (a)
      return { dynamic: !0, encoded: i };
  }
  return {
    dynamic: !1,
    encoded: (0, kr.concat)(o.map(({ encoded: i }) => i))
  };
}
function t0(e, { param: t }) {
  const [, r] = t.type.split("bytes"), n = (0, Vn.size)(e);
  if (!r) {
    let a = e;
    return n % 32 !== 0 && (a = (0, cr.padHex)(a, {
      dir: "right",
      size: Math.ceil((e.length - 2) / 2 / 32) * 32
    })), {
      dynamic: !0,
      encoded: (0, kr.concat)([(0, cr.padHex)((0, dr.numberToHex)(n, { size: 32 })), a])
    };
  }
  if (n !== parseInt(r))
    throw new Wn.AbiEncodingBytesSizeMismatchError({
      expectedSize: parseInt(r),
      value: e
    });
  return { dynamic: !1, encoded: (0, cr.padHex)(e, { dir: "right" }) };
}
function r0(e) {
  return { dynamic: !1, encoded: (0, cr.padHex)((0, dr.boolToHex)(e)) };
}
function n0(e, { signed: t }) {
  return {
    dynamic: !1,
    encoded: (0, dr.numberToHex)(e, {
      size: 32,
      signed: t
    })
  };
}
function a0(e) {
  const t = (0, dr.stringToHex)(e), r = Math.ceil((0, Vn.size)(t) / 32), n = [];
  for (let a = 0; a < r; a++)
    n.push((0, cr.padHex)((0, Jg.slice)(t, a * 32, (a + 1) * 32), {
      dir: "right"
    }));
  return {
    dynamic: !0,
    encoded: (0, kr.concat)([
      (0, cr.padHex)((0, dr.numberToHex)((0, Vn.size)(t), { size: 32 })),
      ...n
    ])
  };
}
function o0(e, { param: t }) {
  let r = !1;
  const n = [];
  for (let a = 0; a < t.components.length; a++) {
    const o = t.components[a], i = Array.isArray(e) ? a : o.name, s = Bc({
      param: o,
      value: e[i]
    });
    n.push(s), s.dynamic && (r = !0);
  }
  return {
    dynamic: r,
    encoded: r ? Mc(n) : (0, kr.concat)(n.map(({ encoded: a }) => a))
  };
}
function Rl(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
Oe.getArrayComponents = Rl;
var je = {}, yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.getFunctionSelector = void 0;
const i0 = Ee, s0 = de(), c0 = Gr, u0 = Ie, d0 = (e) => (0, u0.keccak256)((0, s0.toBytes)(e)), l0 = (e) => (0, i0.slice)(d0((0, c0.getFunctionSignature)(e)), 0, 4);
yt.getFunctionSelector = l0;
Object.defineProperty(je, "__esModule", { value: !0 });
je.getAmbiguousTypes = je.isArgOfType = je.getAbiItem = void 0;
const f0 = Y(), b0 = ce, m0 = Gt, g0 = yt, wc = $e;
function y0({ abi: e, args: t = [], name: r }) {
  const n = (0, b0.isHex)(r, { strict: !1 }), a = e.filter((i) => n ? i.type === "function" ? (0, g0.getFunctionSelector)(i) === r : i.type === "event" ? (0, m0.getEventSelector)(i) === r : !1 : "name" in i && i.name === r);
  if (a.length === 0)
    return;
  if (a.length === 1)
    return a[0];
  let o;
  for (const i of a) {
    if (!("inputs" in i))
      continue;
    if (!t || t.length === 0) {
      if (!i.inputs || i.inputs.length === 0)
        return i;
      continue;
    }
    if (!i.inputs || i.inputs.length === 0 || i.inputs.length !== t.length)
      continue;
    if (t.every((c, m) => {
      const u = "inputs" in i && i.inputs[m];
      return u ? oo(c, u) : !1;
    })) {
      if (o && "inputs" in o && o.inputs) {
        const c = Fc(i.inputs, o.inputs, t);
        if (c)
          throw new f0.AbiItemAmbiguityError({
            abiItem: i,
            type: c[0]
          }, {
            abiItem: o,
            type: c[1]
          });
      }
      o = i;
    }
  }
  return o || a[0];
}
je.getAbiItem = y0;
function oo(e, t) {
  const r = typeof e, n = t.type;
  switch (n) {
    case "address":
      return (0, wc.isAddress)(e);
    case "bool":
      return r === "boolean";
    case "function":
      return r === "string";
    case "string":
      return r === "string";
    default:
      return n === "tuple" && "components" in t ? Object.values(t.components).every((a, o) => oo(Object.values(e)[o], a)) : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(n) ? r === "number" || r === "bigint" : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(n) ? r === "string" || e instanceof Uint8Array : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(n) ? Array.isArray(e) && e.every((a) => oo(a, {
        ...t,
        type: n.replace(/(\[[0-9]{0,}\])$/, "")
      })) : !1;
  }
}
je.isArgOfType = oo;
function Fc(e, t, r) {
  for (const n in e) {
    const a = e[n], o = t[n];
    if (a.type === "tuple" && o.type === "tuple" && "components" in a && "components" in o)
      return Fc(a.components, o.components, r[n]);
    const i = [a.type, o.type];
    if (i.includes("address") && i.includes("bytes20") ? !0 : i.includes("address") && i.includes("string") || i.includes("address") && i.includes("bytes") ? (0, wc.isAddress)(r[n]) : !1)
      return i;
  }
}
je.getAmbiguousTypes = Fc;
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.encodeEventTopics = void 0;
const mu = Y(), _0 = na, h0 = de(), p0 = Gt, v0 = Ie, E0 = Oe, j0 = Bt(), P0 = je;
function T0({ abi: e, eventName: t, args: r }) {
  var s;
  let n = e[0];
  if (t && (n = (0, P0.getAbiItem)({
    abi: e,
    args: r,
    name: t
  }), !n))
    throw new mu.AbiEventNotFoundError(t, {
      docsPath: "/docs/contract/encodeEventTopics"
    });
  if (n.type !== "event")
    throw new mu.AbiEventNotFoundError(void 0, {
      docsPath: "/docs/contract/encodeEventTopics"
    });
  const a = (0, j0.formatAbiItem)(n), o = (0, p0.getEventSelector)(a);
  let i = [];
  if (r && "inputs" in n) {
    const c = (s = n.inputs) == null ? void 0 : s.filter((u) => "indexed" in u && u.indexed), m = Array.isArray(r) ? r : Object.values(r).length > 0 ? (c == null ? void 0 : c.map((u) => r[u.name])) ?? [] : [];
    m.length > 0 && (i = (c == null ? void 0 : c.map((u, d) => Array.isArray(m[d]) ? m[d].map((l, f) => gu({ param: u, value: m[d][f] })) : m[d] ? gu({ param: u, value: m[d] }) : null)) ?? []);
  }
  return [o, ...i];
}
Rt.encodeEventTopics = T0;
function gu({ param: e, value: t }) {
  if (e.type === "string" || e.type === "bytes")
    return (0, v0.keccak256)((0, h0.toBytes)(t));
  if (e.type === "tuple" || e.type.match(/^(.*)\[(\d+)?\]$/))
    throw new _0.FilterTypeNotSupportedError(e.type);
  return (0, E0.encodeAbiParameters)([e], [t]);
}
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.createFilterRequestScope = void 0;
function A0(e, { method: t }) {
  var n, a;
  const r = {};
  return e.transport.type === "fallback" && ((a = (n = e.transport).onResponse) == null || a.call(n, ({ method: o, response: i, status: s, transport: c }) => {
    s === "success" && t === o && (r[i] = c.request);
  })), (o) => r[o] || e.request;
}
_r.createFilterRequestScope = A0;
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.createContractEventFilter = void 0;
const w0 = Rt, yu = M(), O0 = _r;
async function I0(e, { address: t, abi: r, args: n, eventName: a, fromBlock: o, strict: i, toBlock: s }) {
  const c = (0, O0.createFilterRequestScope)(e, {
    method: "eth_newFilter"
  }), m = a ? (0, w0.encodeEventTopics)({
    abi: r,
    args: n,
    eventName: a
  }) : void 0, u = await e.request({
    method: "eth_newFilter",
    params: [
      {
        address: t,
        fromBlock: typeof o == "bigint" ? (0, yu.numberToHex)(o) : o,
        toBlock: typeof s == "bigint" ? (0, yu.numberToHex)(s) : s,
        topics: m
      }
    ]
  });
  return {
    abi: r,
    args: n,
    eventName: a,
    id: u,
    request: c(u),
    strict: i,
    type: "event"
  };
}
zr.createContractEventFilter = I0;
var oa = {}, Pe = {};
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.parseAccount = void 0;
function $0(e) {
  return typeof e == "string" ? { address: e, type: "json-rpc" } : e;
}
Pe.parseAccount = $0;
var Ue = {};
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.encodeFunctionData = void 0;
const _u = Y(), C0 = oe, S0 = yt, R0 = Oe, B0 = Bt(), M0 = je;
function F0({ abi: e, args: t, functionName: r }) {
  let n = e[0];
  if (r && (n = (0, M0.getAbiItem)({
    abi: e,
    args: t,
    name: r
  }), !n))
    throw new _u.AbiFunctionNotFoundError(r, {
      docsPath: "/docs/contract/encodeFunctionData"
    });
  if (n.type !== "function")
    throw new _u.AbiFunctionNotFoundError(void 0, {
      docsPath: "/docs/contract/encodeFunctionData"
    });
  const a = (0, B0.formatAbiItem)(n), o = (0, S0.getFunctionSelector)(a), i = "inputs" in n && n.inputs ? (0, R0.encodeAbiParameters)(n.inputs, t ?? []) : void 0;
  return (0, C0.concatHex)([o, i ?? "0x"]);
}
Ue.encodeFunctionData = F0;
var Mt = {}, be = {}, ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.solidityPanic = ft.solidityError = ft.panicReasons = void 0;
ft.panicReasons = {
  1: "An `assert` condition failed.",
  17: "Arithmic operation resulted in underflow or overflow.",
  18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
  33: "Attempted to convert to an invalid type.",
  34: "Attempted to access a storage byte array that is incorrectly encoded.",
  49: "Performed `.pop()` on an empty array",
  50: "Array index is out of bounds.",
  65: "Allocated too much memory or created an array which is too large.",
  81: "Attempted to call a zero-initialized variable of internal function type."
};
ft.solidityError = {
  inputs: [
    {
      name: "message",
      type: "string"
    }
  ],
  name: "Error",
  type: "error"
};
ft.solidityPanic = {
  inputs: [
    {
      name: "reason",
      type: "uint256"
    }
  ],
  name: "Panic",
  type: "error"
};
var hr = {}, _t = {}, Be = {};
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.getAddress = Be.checksumAddress = void 0;
const N0 = He, k0 = de(), D0 = Ie, H0 = $e;
function Bl(e, t) {
  const r = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(), n = (0, D0.keccak256)((0, k0.stringToBytes)(r), "bytes"), a = (t ? r.substring(`${t}0x`.length) : r).split("");
  for (let o = 0; o < 40; o += 2)
    n[o >> 1] >> 4 >= 8 && a[o] && (a[o] = a[o].toUpperCase()), (n[o >> 1] & 15) >= 8 && a[o + 1] && (a[o + 1] = a[o + 1].toUpperCase());
  return `0x${a.join("")}`;
}
Be.checksumAddress = Bl;
function U0(e, t) {
  if (!(0, H0.isAddress)(e))
    throw new N0.InvalidAddressError({ address: e });
  return Bl(e, t);
}
Be.getAddress = U0;
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.decodeAbiParameters = void 0;
const io = Y(), L0 = Be, Gn = We, pe = Ee, q0 = et, ze = ue(), Nc = Oe;
function x0(e, t) {
  if (t === "0x" && e.length > 0)
    throw new io.AbiDecodingZeroDataError();
  if ((0, Gn.size)(t) && (0, Gn.size)(t) < 32)
    throw new io.AbiDecodingDataSizeTooSmallError({
      data: t,
      params: e,
      size: (0, Gn.size)(t)
    });
  return z0({
    data: t,
    params: e
  });
}
_t.decodeAbiParameters = x0;
function z0({ data: e, params: t }) {
  const r = [];
  let n = 0;
  for (let a = 0; a < t.length; a++) {
    if (n >= (0, Gn.size)(e))
      throw new io.AbiDecodingDataSizeTooSmallError({
        data: e,
        params: t,
        size: (0, Gn.size)(e)
      });
    const o = t[a], { consumed: i, value: s } = Mr({ data: e, param: o, position: n });
    r.push(s), n += i;
  }
  return r;
}
function Mr({ data: e, param: t, position: r }) {
  const n = (0, Nc.getArrayComponents)(t.type);
  if (n) {
    const [o, i] = n;
    return W0(e, {
      length: o,
      param: { ...t, type: i },
      position: r
    });
  }
  if (t.type === "tuple")
    return X0(e, { param: t, position: r });
  if (t.type === "string")
    return J0(e, { position: r });
  if (t.type.startsWith("bytes"))
    return K0(e, { param: t, position: r });
  const a = (0, pe.slice)(e, r, r + 32, { strict: !0 });
  if (t.type.startsWith("uint") || t.type.startsWith("int"))
    return Z0(a, { param: t });
  if (t.type === "address")
    return G0(a);
  if (t.type === "bool")
    return V0(a);
  throw new io.InvalidAbiDecodingTypeError(t.type, {
    docsPath: "/docs/contract/decodeAbiParameters"
  });
}
function G0(e) {
  return { consumed: 32, value: (0, L0.checksumAddress)((0, pe.slice)(e, -20)) };
}
function W0(e, { param: t, length: r, position: n }) {
  if (!r) {
    const i = (0, ze.hexToNumber)((0, pe.slice)(e, n, n + 32, { strict: !0 })), s = (0, ze.hexToNumber)((0, pe.slice)(e, i, i + 32, { strict: !0 }));
    let c = 0;
    const m = [];
    for (let u = 0; u < s; ++u) {
      const d = Mr({
        data: (0, pe.slice)(e, i + 32),
        param: t,
        position: c
      });
      c += d.consumed, m.push(d.value);
    }
    return { value: m, consumed: 32 };
  }
  if (so(t)) {
    const i = (0, Nc.getArrayComponents)(t.type), s = !(i != null && i[0]);
    let c = 0;
    const m = [];
    for (let u = 0; u < r; ++u) {
      const d = (0, ze.hexToNumber)((0, pe.slice)(e, n, n + 32, { strict: !0 })), l = Mr({
        data: (0, pe.slice)(e, d),
        param: t,
        position: s ? c : u * 32
      });
      c += l.consumed, m.push(l.value);
    }
    return { value: m, consumed: 32 };
  }
  let a = 0;
  const o = [];
  for (let i = 0; i < r; ++i) {
    const s = Mr({
      data: e,
      param: t,
      position: n + a
    });
    a += s.consumed, o.push(s.value);
  }
  return { value: o, consumed: a };
}
function V0(e) {
  return { consumed: 32, value: (0, ze.hexToBool)(e) };
}
function K0(e, { param: t, position: r }) {
  const [n, a] = t.type.split("bytes");
  if (!a) {
    const i = (0, ze.hexToNumber)((0, pe.slice)(e, r, r + 32, { strict: !0 })), s = (0, ze.hexToNumber)((0, pe.slice)(e, i, i + 32, { strict: !0 }));
    return s === 0 ? { consumed: 32, value: "0x" } : { consumed: 32, value: (0, pe.slice)(e, i + 32, i + 32 + s, {
      strict: !0
    }) };
  }
  return { consumed: 32, value: (0, pe.slice)(e, r, r + parseInt(a), {
    strict: !0
  }) };
}
function Z0(e, { param: t }) {
  const r = t.type.startsWith("int");
  return {
    consumed: 32,
    value: parseInt(t.type.split("int")[1] || "256") > 48 ? (0, ze.hexToBigInt)(e, { signed: r }) : (0, ze.hexToNumber)(e, { signed: r })
  };
}
function J0(e, { position: t }) {
  const r = (0, ze.hexToNumber)((0, pe.slice)(e, t, t + 32, { strict: !0 })), n = (0, ze.hexToNumber)((0, pe.slice)(e, r, r + 32, { strict: !0 }));
  return n === 0 ? { consumed: 32, value: "" } : { consumed: 32, value: (0, ze.hexToString)((0, q0.trim)((0, pe.slice)(e, r + 32, r + 32 + n, { strict: !0 }))) };
}
function X0(e, { param: t, position: r }) {
  const n = t.components.length === 0 || t.components.some(({ name: i }) => !i), a = n ? [] : {};
  let o = 0;
  if (so(t)) {
    const i = (0, ze.hexToNumber)((0, pe.slice)(e, r, r + 32, { strict: !0 }));
    for (let s = 0; s < t.components.length; ++s) {
      const c = t.components[s], m = Mr({
        data: (0, pe.slice)(e, i),
        param: c,
        position: o
      });
      o += m.consumed, a[n ? s : c == null ? void 0 : c.name] = m.value;
    }
    return { consumed: 32, value: a };
  }
  for (let i = 0; i < t.components.length; ++i) {
    const s = t.components[i], c = Mr({
      data: e,
      param: s,
      position: r + o
    });
    o += c.consumed, a[n ? i : s == null ? void 0 : s.name] = c.value;
  }
  return { consumed: o, value: a };
}
function so(e) {
  var n;
  const { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]"))
    return !0;
  if (t === "tuple")
    return (n = e.components) == null ? void 0 : n.some(so);
  const r = (0, Nc.getArrayComponents)(e.type);
  return !!(r && so({ ...e, type: r[1] }));
}
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.decodeErrorResult = void 0;
const hu = ft, pu = Y(), vu = Ee, Q0 = yt, Y0 = _t, ey = Bt();
function ty({ abi: e, data: t }) {
  const r = (0, vu.slice)(t, 0, 4);
  if (r === "0x")
    throw new pu.AbiDecodingZeroDataError();
  const a = [...e || [], hu.solidityError, hu.solidityPanic].find((o) => o.type === "error" && r === (0, Q0.getFunctionSelector)((0, ey.formatAbiItem)(o)));
  if (!a)
    throw new pu.AbiErrorSignatureNotFoundError(r, {
      docsPath: "/docs/contract/decodeErrorResult"
    });
  return {
    abiItem: a,
    args: "inputs" in a && a.inputs && a.inputs.length > 0 ? (0, Y0.decodeAbiParameters)(a.inputs, (0, vu.slice)(t, 4)) : void 0,
    errorName: a.name
  };
}
hr.decodeErrorResult = ty;
var ia = {}, _e = {};
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.stringify = void 0;
const ry = (e, t, r) => JSON.stringify(e, (n, a) => {
  const o = typeof a == "bigint" ? a.toString() : a;
  return typeof t == "function" ? t(n, o) : o;
}, r);
_e.stringify = ry;
Object.defineProperty(ia, "__esModule", { value: !0 });
ia.formatAbiItemWithArgs = void 0;
const ny = _e;
function ay({ abiItem: e, args: t, includeFunctionName: r = !0, includeName: n = !1 }) {
  if ("name" in e && "inputs" in e && e.inputs)
    return `${r ? e.name : ""}(${e.inputs.map((a, o) => `${n && a.name ? `${a.name}: ` : ""}${typeof t[o] == "object" ? (0, ny.stringify)(t[o]) : t[o]}`).join(", ")})`;
}
ia.formatAbiItemWithArgs = ay;
var Wt = {}, Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.weiUnits = Ge.gweiUnits = Ge.etherUnits = void 0;
Ge.etherUnits = {
  gwei: 9,
  wei: 18
};
Ge.gweiUnits = {
  ether: -9,
  wei: 9
};
Ge.weiUnits = {
  ether: -18,
  gwei: -9
};
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.formatUnits = void 0;
function oy(e, t) {
  let r = e.toString();
  const n = r.startsWith("-");
  n && (r = r.slice(1)), r = r.padStart(t, "0");
  let [a, o] = [
    r.slice(0, r.length - t),
    r.slice(r.length - t)
  ];
  return o = o.replace(/(0+)$/, ""), `${n ? "-" : ""}${a || "0"}${o ? `.${o}` : ""}`;
}
pr.formatUnits = oy;
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.formatEther = void 0;
const iy = Ge, sy = pr;
function cy(e, t = "wei") {
  return (0, sy.formatUnits)(e, iy.etherUnits[t]);
}
Wt.formatEther = cy;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.formatGwei = void 0;
const uy = Ge, dy = pr;
function ly(e, t = "wei") {
  return (0, dy.formatUnits)(e, uy.gweiUnits[t]);
}
ht.formatGwei = ly;
var q = {};
Object.defineProperty(q, "__esModule", { value: !0 });
q.WaitForTransactionReceiptTimeoutError = q.TransactionReceiptNotFoundError = q.TransactionNotFoundError = q.TransactionExecutionError = q.InvalidStorageKeySizeError = q.InvalidSerializedTransactionError = q.InvalidSerializedTransactionTypeError = q.InvalidSerializableTransactionError = q.InvalidLegacyVError = q.FeeConflictError = q.prettyPrint = void 0;
const fy = Wt, Ks = ht, pt = G;
function kc(e) {
  const t = Object.entries(e).map(([n, a]) => a === void 0 || a === !1 ? null : [n, a]).filter(Boolean), r = t.reduce((n, [a]) => Math.max(n, a.length), 0);
  return t.map(([n, a]) => `  ${`${n}:`.padEnd(r + 1)}  ${a}`).join(`
`);
}
q.prettyPrint = kc;
class by extends pt.BaseError {
  constructor() {
    super([
      "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
      "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
    ].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FeeConflictError"
    });
  }
}
q.FeeConflictError = by;
class my extends pt.BaseError {
  constructor({ v: t }) {
    super(`Invalid \`v\` value "${t}". Expected 27 or 28.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidLegacyVError"
    });
  }
}
q.InvalidLegacyVError = my;
class gy extends pt.BaseError {
  constructor({ transaction: t }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        kc(t),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidSerializableTransactionError"
    });
  }
}
q.InvalidSerializableTransactionError = gy;
class yy extends pt.BaseError {
  constructor({ serializedType: t }) {
    super(`Serialized transaction type "${t}" is invalid.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidSerializedTransactionType"
    }), Object.defineProperty(this, "serializedType", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.serializedType = t;
  }
}
q.InvalidSerializedTransactionTypeError = yy;
class _y extends pt.BaseError {
  constructor({ attributes: t, serializedTransaction: r, type: n }) {
    const a = Object.entries(t).map(([o, i]) => typeof i > "u" ? o : void 0).filter(Boolean);
    super(`Invalid serialized transaction of type "${n}" was provided.`, {
      metaMessages: [
        `Serialized Transaction: "${r}"`,
        a.length > 0 ? `Missing Attributes: ${a.join(", ")}` : ""
      ].filter(Boolean)
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidSerializedTransactionError"
    }), Object.defineProperty(this, "serializedTransaction", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.serializedTransaction = r, this.type = n;
  }
}
q.InvalidSerializedTransactionError = _y;
class hy extends pt.BaseError {
  constructor({ storageKey: t }) {
    super(`Size for storage key "${t}" is invalid. Expected 32 bytes. Got ${Math.floor((t.length - 2) / 2)} bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidStorageKeySizeError"
    });
  }
}
q.InvalidStorageKeySizeError = hy;
class py extends pt.BaseError {
  constructor(t, { account: r, docsPath: n, chain: a, data: o, gas: i, gasPrice: s, maxFeePerGas: c, maxPriorityFeePerGas: m, nonce: u, to: d, value: l }) {
    var b;
    const f = kc({
      chain: a && `${a == null ? void 0 : a.name} (id: ${a == null ? void 0 : a.id})`,
      from: r == null ? void 0 : r.address,
      to: d,
      value: typeof l < "u" && `${(0, fy.formatEther)(l)} ${((b = a == null ? void 0 : a.nativeCurrency) == null ? void 0 : b.symbol) || "ETH"}`,
      data: o,
      gas: i,
      gasPrice: typeof s < "u" && `${(0, Ks.formatGwei)(s)} gwei`,
      maxFeePerGas: typeof c < "u" && `${(0, Ks.formatGwei)(c)} gwei`,
      maxPriorityFeePerGas: typeof m < "u" && `${(0, Ks.formatGwei)(m)} gwei`,
      nonce: u
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: n,
      metaMessages: [
        ...t.metaMessages ? [...t.metaMessages, " "] : [],
        "Request Arguments:",
        f
      ].filter(Boolean)
    }), Object.defineProperty(this, "cause", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionExecutionError"
    }), this.cause = t;
  }
}
q.TransactionExecutionError = py;
class vy extends pt.BaseError {
  constructor({ blockHash: t, blockNumber: r, blockTag: n, hash: a, index: o }) {
    let i = "Transaction";
    n && o !== void 0 && (i = `Transaction at block time "${n}" at index "${o}"`), t && o !== void 0 && (i = `Transaction at block hash "${t}" at index "${o}"`), r && o !== void 0 && (i = `Transaction at block number "${r}" at index "${o}"`), a && (i = `Transaction with hash "${a}"`), super(`${i} could not be found.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionNotFoundError"
    });
  }
}
q.TransactionNotFoundError = vy;
class Ey extends pt.BaseError {
  constructor({ hash: t }) {
    super(`Transaction receipt with hash "${t}" could not be found. The Transaction may not be processed on a block yet.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionReceiptNotFoundError"
    });
  }
}
q.TransactionReceiptNotFoundError = Ey;
class jy extends pt.BaseError {
  constructor({ hash: t }) {
    super(`Timed out while waiting for transaction with hash "${t}" to be confirmed.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "WaitForTransactionReceiptTimeoutError"
    });
  }
}
q.WaitForTransactionReceiptTimeoutError = jy;
Object.defineProperty(be, "__esModule", { value: !0 });
be.RawContractError = be.ContractFunctionZeroDataError = be.ContractFunctionRevertedError = be.ContractFunctionExecutionError = be.CallExecutionError = void 0;
const Py = Pe, Ty = ft, Ay = hr, Ml = Bt(), Fl = ia, wy = je, Oy = Wt, Zs = ht, Iy = Y(), sa = G, Nl = q, $y = Xe;
class Cy extends sa.BaseError {
  constructor(t, { account: r, docsPath: n, chain: a, data: o, gas: i, gasPrice: s, maxFeePerGas: c, maxPriorityFeePerGas: m, nonce: u, to: d, value: l }) {
    var y;
    const f = r ? (0, Py.parseAccount)(r) : void 0, b = (0, Nl.prettyPrint)({
      from: f == null ? void 0 : f.address,
      to: d,
      value: typeof l < "u" && `${(0, Oy.formatEther)(l)} ${((y = a == null ? void 0 : a.nativeCurrency) == null ? void 0 : y.symbol) || "ETH"}`,
      data: o,
      gas: i,
      gasPrice: typeof s < "u" && `${(0, Zs.formatGwei)(s)} gwei`,
      maxFeePerGas: typeof c < "u" && `${(0, Zs.formatGwei)(c)} gwei`,
      maxPriorityFeePerGas: typeof m < "u" && `${(0, Zs.formatGwei)(m)} gwei`,
      nonce: u
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: n,
      metaMessages: [
        ...t.metaMessages ? [...t.metaMessages, " "] : [],
        "Raw Call Arguments:",
        b
      ].filter(Boolean)
    }), Object.defineProperty(this, "cause", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "CallExecutionError"
    }), this.cause = t;
  }
}
be.CallExecutionError = Cy;
class Sy extends sa.BaseError {
  constructor(t, { abi: r, args: n, contractAddress: a, docsPath: o, functionName: i, sender: s }) {
    const c = (0, wy.getAbiItem)({ abi: r, args: n, name: i }), m = c ? (0, Fl.formatAbiItemWithArgs)({
      abiItem: c,
      args: n,
      includeFunctionName: !1,
      includeName: !1
    }) : void 0, u = c ? (0, Ml.formatAbiItem)(c, { includeName: !0 }) : void 0, d = (0, Nl.prettyPrint)({
      address: a && (0, $y.getContractAddress)(a),
      function: u,
      args: m && m !== "()" && `${[...Array((i == null ? void 0 : i.length) ?? 0).keys()].map(() => " ").join("")}${m}`,
      sender: s
    });
    super(t.shortMessage || `An unknown error occurred while executing the contract function "${i}".`, {
      cause: t,
      docsPath: o,
      metaMessages: [
        ...t.metaMessages ? [...t.metaMessages, " "] : [],
        "Contract Call:",
        d
      ].filter(Boolean)
    }), Object.defineProperty(this, "abi", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "args", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "cause", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "contractAddress", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "formattedArgs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "functionName", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "sender", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ContractFunctionExecutionError"
    }), this.abi = r, this.args = n, this.cause = t, this.contractAddress = a, this.functionName = i, this.sender = s;
  }
}
be.ContractFunctionExecutionError = Sy;
class Ry extends sa.BaseError {
  constructor({ abi: t, data: r, functionName: n, message: a }) {
    let o, i, s, c;
    if (r && r !== "0x")
      try {
        i = (0, Ay.decodeErrorResult)({ abi: t, data: r });
        const { abiItem: u, errorName: d, args: l } = i;
        if (d === "Error")
          c = l[0];
        else if (d === "Panic") {
          const [f] = l;
          c = Ty.panicReasons[f];
        } else {
          const f = u ? (0, Ml.formatAbiItem)(u, { includeName: !0 }) : void 0, b = u && l ? (0, Fl.formatAbiItemWithArgs)({
            abiItem: u,
            args: l,
            includeFunctionName: !1,
            includeName: !1
          }) : void 0;
          s = [
            f ? `Error: ${f}` : "",
            b && b !== "()" ? `       ${[...Array((d == null ? void 0 : d.length) ?? 0).keys()].map(() => " ").join("")}${b}` : ""
          ];
        }
      } catch (u) {
        o = u;
      }
    else
      a && (c = a);
    let m;
    o instanceof Iy.AbiErrorSignatureNotFoundError && (m = o.signature, s = [
      `Unable to decode signature "${m}" as it was not found on the provided ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it.",
      `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${m}.`
    ]), super(c && c !== "execution reverted" || m ? [
      `The contract function "${n}" reverted with the following ${m ? "signature" : "reason"}:`,
      c || m
    ].join(`
`) : `The contract function "${n}" reverted.`, {
      cause: o,
      metaMessages: s
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ContractFunctionRevertedError"
    }), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "reason", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "signature", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.data = i, this.reason = c, this.signature = m;
  }
}
be.ContractFunctionRevertedError = Ry;
class By extends sa.BaseError {
  constructor({ functionName: t }) {
    super(`The contract function "${t}" returned no data ("0x").`, {
      metaMessages: [
        "This could be due to any of the following:",
        `  - The contract does not have the function "${t}",`,
        "  - The parameters passed to the contract function may be invalid, or",
        "  - The address is not a contract."
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ContractFunctionZeroDataError"
    });
  }
}
be.ContractFunctionZeroDataError = By;
class My extends sa.BaseError {
  constructor({ data: t, message: r }) {
    super(r || ""), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 3
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "RawContractError"
    }), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.data = t;
  }
}
be.RawContractError = My;
var F = {}, ye = {};
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.TimeoutError = ye.RpcRequestError = ye.WebSocketRequestError = ye.HttpRequestError = void 0;
const Io = _e, $o = G, Co = Xe;
class Fy extends $o.BaseError {
  constructor({ body: t, details: r, headers: n, status: a, url: o }) {
    super("HTTP request failed.", {
      details: r,
      metaMessages: [
        a && `Status: ${a}`,
        `URL: ${(0, Co.getUrl)(o)}`,
        t && `Request body: ${(0, Io.stringify)(t)}`
      ].filter(Boolean)
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "HttpRequestError"
    }), Object.defineProperty(this, "body", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "headers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "status", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "url", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.body = t, this.headers = n, this.status = a, this.url = o;
  }
}
ye.HttpRequestError = Fy;
class Ny extends $o.BaseError {
  constructor({ body: t, details: r, url: n }) {
    super("WebSocket request failed.", {
      details: r,
      metaMessages: [`URL: ${(0, Co.getUrl)(n)}`, `Request body: ${(0, Io.stringify)(t)}`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "WebSocketRequestError"
    });
  }
}
ye.WebSocketRequestError = Ny;
class ky extends $o.BaseError {
  constructor({ body: t, error: r, url: n }) {
    super("RPC Request failed.", {
      cause: r,
      details: r.message,
      metaMessages: [`URL: ${(0, Co.getUrl)(n)}`, `Request body: ${(0, Io.stringify)(t)}`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "RpcRequestError"
    }), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.code = r.code;
  }
}
ye.RpcRequestError = ky;
class Dy extends $o.BaseError {
  constructor({ body: t, url: r }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${(0, Co.getUrl)(r)}`, `Request body: ${(0, Io.stringify)(t)}`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TimeoutError"
    });
  }
}
ye.TimeoutError = Dy;
Object.defineProperty(F, "__esModule", { value: !0 });
F.UnknownRpcError = F.SwitchChainError = F.ChainDisconnectedError = F.ProviderDisconnectedError = F.UnsupportedProviderMethodError = F.UnauthorizedProviderError = F.UserRejectedRequestError = F.JsonRpcVersionUnsupportedError = F.LimitExceededRpcError = F.MethodNotSupportedRpcError = F.TransactionRejectedRpcError = F.ResourceUnavailableRpcError = F.ResourceNotFoundRpcError = F.InvalidInputRpcError = F.InternalRpcError = F.InvalidParamsRpcError = F.MethodNotFoundRpcError = F.InvalidRequestRpcError = F.ParseRpcError = F.ProviderRpcError = F.RpcError = void 0;
const Hy = G, Uy = ye, Ly = -1;
class Ce extends Hy.BaseError {
  constructor(t, { code: r, docsPath: n, metaMessages: a, shortMessage: o }) {
    super(o, {
      cause: t,
      docsPath: n,
      metaMessages: a || (t == null ? void 0 : t.metaMessages)
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "RpcError"
    }), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.name = t.name, this.code = t instanceof Uy.RpcRequestError ? t.code : r ?? Ly;
  }
}
F.RpcError = Ce;
class vr extends Ce {
  constructor(t, r) {
    super(t, r), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderRpcError"
    }), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.data = r.data;
  }
}
F.ProviderRpcError = vr;
class So extends Ce {
  constructor(t) {
    super(t, {
      code: So.code,
      shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ParseRpcError"
    });
  }
}
Object.defineProperty(So, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32700
});
F.ParseRpcError = So;
class Ro extends Ce {
  constructor(t) {
    super(t, {
      code: Ro.code,
      shortMessage: "JSON is not a valid request object."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidRequestRpcError"
    });
  }
}
Object.defineProperty(Ro, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32600
});
F.InvalidRequestRpcError = Ro;
class Bo extends Ce {
  constructor(t) {
    super(t, {
      code: Bo.code,
      shortMessage: "The method does not exist / is not available."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "MethodNotFoundRpcError"
    });
  }
}
Object.defineProperty(Bo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32601
});
F.MethodNotFoundRpcError = Bo;
class Mo extends Ce {
  constructor(t) {
    super(t, {
      code: Mo.code,
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters."
      ].join(`
`)
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidParamsRpcError"
    });
  }
}
Object.defineProperty(Mo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32602
});
F.InvalidParamsRpcError = Mo;
class Fo extends Ce {
  constructor(t) {
    super(t, {
      code: Fo.code,
      shortMessage: "An internal error was received."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InternalRpcError"
    });
  }
}
Object.defineProperty(Fo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32603
});
F.InternalRpcError = Fo;
class No extends Ce {
  constructor(t) {
    super(t, {
      code: No.code,
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters."
      ].join(`
`)
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidInputRpcError"
    });
  }
}
Object.defineProperty(No, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32e3
});
F.InvalidInputRpcError = No;
class ko extends Ce {
  constructor(t) {
    super(t, {
      code: ko.code,
      shortMessage: "Requested resource not found."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ResourceNotFoundRpcError"
    });
  }
}
Object.defineProperty(ko, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32001
});
F.ResourceNotFoundRpcError = ko;
class Do extends Ce {
  constructor(t) {
    super(t, {
      code: Do.code,
      shortMessage: "Requested resource not available."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ResourceUnavailableRpcError"
    });
  }
}
Object.defineProperty(Do, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32002
});
F.ResourceUnavailableRpcError = Do;
class Ho extends Ce {
  constructor(t) {
    super(t, {
      code: Ho.code,
      shortMessage: "Transaction creation failed."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionRejectedRpcError"
    });
  }
}
Object.defineProperty(Ho, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32003
});
F.TransactionRejectedRpcError = Ho;
class Uo extends Ce {
  constructor(t) {
    super(t, {
      code: Uo.code,
      shortMessage: "Method is not implemented."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "MethodNotSupportedRpcError"
    });
  }
}
Object.defineProperty(Uo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32004
});
F.MethodNotSupportedRpcError = Uo;
class Lo extends Ce {
  constructor(t) {
    super(t, {
      code: Lo.code,
      shortMessage: "Request exceeds defined limit."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "LimitExceededRpcError"
    });
  }
}
Object.defineProperty(Lo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32005
});
F.LimitExceededRpcError = Lo;
class qo extends Ce {
  constructor(t) {
    super(t, {
      code: qo.code,
      shortMessage: "Version of JSON-RPC protocol is not supported."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "JsonRpcVersionUnsupportedError"
    });
  }
}
Object.defineProperty(qo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32006
});
F.JsonRpcVersionUnsupportedError = qo;
class xo extends vr {
  constructor(t) {
    super(t, {
      code: xo.code,
      shortMessage: "User rejected the request."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UserRejectedRequestError"
    });
  }
}
Object.defineProperty(xo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4001
});
F.UserRejectedRequestError = xo;
class zo extends vr {
  constructor(t) {
    super(t, {
      code: zo.code,
      shortMessage: "The requested method and/or account has not been authorized by the user."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnauthorizedProviderError"
    });
  }
}
Object.defineProperty(zo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4100
});
F.UnauthorizedProviderError = zo;
class Go extends vr {
  constructor(t) {
    super(t, {
      code: Go.code,
      shortMessage: "The Provider does not support the requested method."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnsupportedProviderMethodError"
    });
  }
}
Object.defineProperty(Go, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4200
});
F.UnsupportedProviderMethodError = Go;
class Wo extends vr {
  constructor(t) {
    super(t, {
      code: Wo.code,
      shortMessage: "The Provider is disconnected from all chains."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderDisconnectedError"
    });
  }
}
Object.defineProperty(Wo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4900
});
F.ProviderDisconnectedError = Wo;
class Vo extends vr {
  constructor(t) {
    super(t, {
      code: Vo.code,
      shortMessage: "The Provider is not connected to the requested chain."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainDisconnectedError"
    });
  }
}
Object.defineProperty(Vo, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4901
});
F.ChainDisconnectedError = Vo;
class Ko extends vr {
  constructor(t) {
    super(t, {
      code: Ko.code,
      shortMessage: "An error occurred when attempting to switch chain."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SwitchChainError"
    });
  }
}
Object.defineProperty(Ko, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4902
});
F.SwitchChainError = Ko;
class qy extends Ce {
  constructor(t) {
    super(t, {
      shortMessage: "An unknown RPC error occurred."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownRpcError"
    });
  }
}
F.UnknownRpcError = qy;
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.getContractError = void 0;
const xy = Y(), zy = G, Za = be, Gy = F, Wy = 3;
function Vy(e, { abi: t, address: r, args: n, docsPath: a, functionName: o, sender: i }) {
  const { code: s, data: c, message: m, shortMessage: u } = e instanceof Za.RawContractError ? e : e instanceof zy.BaseError ? e.walk((l) => "data" in l) || e.walk() : {}, d = e instanceof xy.AbiDecodingZeroDataError ? new Za.ContractFunctionZeroDataError({ functionName: o }) : [Wy, Gy.InternalRpcError.code].includes(s) && (c || m || u) ? new Za.ContractFunctionRevertedError({
    abi: t,
    data: typeof c == "object" ? c.data : c,
    functionName: o,
    message: u ?? m
  }) : e;
  return new Za.ContractFunctionExecutionError(d, {
    abi: t,
    args: n,
    contractAddress: r,
    docsPath: a,
    functionName: o,
    sender: i
  });
}
Mt.getContractError = Vy;
var On = {}, Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.AccountNotFoundError = void 0;
const Ky = G;
class Zy extends Ky.BaseError {
  constructor({ docsPath: t } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."
    ].join(`
`), {
      docsPath: t,
      docsSlug: "account"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AccountNotFoundError"
    });
  }
}
Ft.AccountNotFoundError = Zy;
var ca = {}, ua = {};
Object.defineProperty(ua, "__esModule", { value: !0 });
ua.EstimateGasExecutionError = void 0;
const Jy = Wt, Js = ht, Xy = G, Qy = q;
class Yy extends Xy.BaseError {
  constructor(t, { account: r, docsPath: n, chain: a, data: o, gas: i, gasPrice: s, maxFeePerGas: c, maxPriorityFeePerGas: m, nonce: u, to: d, value: l }) {
    var b;
    const f = (0, Qy.prettyPrint)({
      from: r == null ? void 0 : r.address,
      to: d,
      value: typeof l < "u" && `${(0, Jy.formatEther)(l)} ${((b = a == null ? void 0 : a.nativeCurrency) == null ? void 0 : b.symbol) || "ETH"}`,
      data: o,
      gas: i,
      gasPrice: typeof s < "u" && `${(0, Js.formatGwei)(s)} gwei`,
      maxFeePerGas: typeof c < "u" && `${(0, Js.formatGwei)(c)} gwei`,
      maxPriorityFeePerGas: typeof m < "u" && `${(0, Js.formatGwei)(m)} gwei`,
      nonce: u
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: n,
      metaMessages: [
        ...t.metaMessages ? [...t.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        f
      ].filter(Boolean)
    }), Object.defineProperty(this, "cause", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EstimateGasExecutionError"
    }), this.cause = t;
  }
}
ua.EstimateGasExecutionError = Yy;
var V = {};
Object.defineProperty(V, "__esModule", { value: !0 });
V.UnknownNodeError = V.TipAboveFeeCapError = V.TransactionTypeNotSupportedError = V.IntrinsicGasTooLowError = V.IntrinsicGasTooHighError = V.InsufficientFundsError = V.NonceMaxValueError = V.NonceTooLowError = V.NonceTooHighError = V.FeeCapTooLowError = V.FeeCapTooHighError = V.ExecutionRevertedError = void 0;
const co = ht, Ve = G;
class Dc extends Ve.BaseError {
  constructor({ cause: t, message: r } = {}) {
    var a;
    const n = (a = r == null ? void 0 : r.replace("execution reverted: ", "")) == null ? void 0 : a.replace("execution reverted", "");
    super(`Execution reverted ${n ? `with reason: ${n}` : "for an unknown reason"}.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ExecutionRevertedError"
    });
  }
}
Object.defineProperty(Dc, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3
});
Object.defineProperty(Dc, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/
});
V.ExecutionRevertedError = Dc;
class kl extends Ve.BaseError {
  constructor({ cause: t, maxFeePerGas: r } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${r ? ` = ${(0, co.formatGwei)(r)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FeeCapTooHigh"
    });
  }
}
Object.defineProperty(kl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
V.FeeCapTooHighError = kl;
class Dl extends Ve.BaseError {
  constructor({ cause: t, maxFeePerGas: r } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${r ? ` = ${(0, co.formatGwei)(r)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FeeCapTooLow"
    });
  }
}
Object.defineProperty(Dl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
V.FeeCapTooLowError = Dl;
class Hl extends Ve.BaseError {
  constructor({ cause: t, nonce: r } = {}) {
    super(`Nonce provided for the transaction ${r ? `(${r}) ` : ""}is higher than the next one expected.`, { cause: t }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NonceTooHighError"
    });
  }
}
Object.defineProperty(Hl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too high/
});
V.NonceTooHighError = Hl;
class Ul extends Ve.BaseError {
  constructor({ cause: t, nonce: r } = {}) {
    super([
      `Nonce provided for the transaction ${r ? `(${r}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join(`
`), { cause: t }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NonceTooLowError"
    });
  }
}
Object.defineProperty(Ul, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too low|transaction already imported|already known/
});
V.NonceTooLowError = Ul;
class Ll extends Ve.BaseError {
  constructor({ cause: t, nonce: r } = {}) {
    super(`Nonce provided for the transaction ${r ? `(${r}) ` : ""}exceeds the maximum allowed nonce.`, { cause: t }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NonceMaxValueError"
    });
  }
}
Object.defineProperty(Ll, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce has max value/
});
V.NonceMaxValueError = Ll;
class ql extends Ve.BaseError {
  constructor({ cause: t } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join(`
`), {
      cause: t,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InsufficientFundsError"
    });
  }
}
Object.defineProperty(ql, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /insufficient funds/
});
V.InsufficientFundsError = ql;
class xl extends Ve.BaseError {
  constructor({ cause: t, gas: r } = {}) {
    super(`The amount of gas ${r ? `(${r}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntrinsicGasTooHighError"
    });
  }
}
Object.defineProperty(xl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too high|gas limit reached/
});
V.IntrinsicGasTooHighError = xl;
class zl extends Ve.BaseError {
  constructor({ cause: t, gas: r } = {}) {
    super(`The amount of gas ${r ? `(${r}) ` : ""}provided for the transaction is too low.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntrinsicGasTooLowError"
    });
  }
}
Object.defineProperty(zl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too low/
});
V.IntrinsicGasTooLowError = zl;
class Gl extends Ve.BaseError {
  constructor({ cause: t }) {
    super("The transaction type is not supported for this chain.", {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionTypeNotSupportedError"
    });
  }
}
Object.defineProperty(Gl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /transaction type not valid/
});
V.TransactionTypeNotSupportedError = Gl;
class Wl extends Ve.BaseError {
  constructor({ cause: t, maxPriorityFeePerGas: r, maxFeePerGas: n } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${r ? ` = ${(0, co.formatGwei)(r)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${n ? ` = ${(0, co.formatGwei)(n)} gwei` : ""}).`
    ].join(`
`), {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TipAboveFeeCapError"
    });
  }
}
Object.defineProperty(Wl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
V.TipAboveFeeCapError = Wl;
class e_ extends Ve.BaseError {
  constructor({ cause: t }) {
    super(`An error occurred while executing: ${t == null ? void 0 : t.shortMessage}`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownNodeError"
    });
  }
}
V.UnknownNodeError = e_;
var $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.getNodeError = $t.containsNodeError = void 0;
const t_ = G, Q = V, r_ = ye, Eu = F;
function n_(e) {
  return e instanceof Eu.TransactionRejectedRpcError || e instanceof Eu.InvalidInputRpcError || e instanceof r_.RpcRequestError && e.code === Q.ExecutionRevertedError.code;
}
$t.containsNodeError = n_;
function a_(e, t) {
  const r = (e.details || "").toLowerCase(), n = e.walk((a) => a.code === Q.ExecutionRevertedError.code);
  return n instanceof t_.BaseError ? new Q.ExecutionRevertedError({
    cause: e,
    message: n.details
  }) : Q.ExecutionRevertedError.nodeMessage.test(r) ? new Q.ExecutionRevertedError({
    cause: e,
    message: e.details
  }) : Q.FeeCapTooHighError.nodeMessage.test(r) ? new Q.FeeCapTooHighError({
    cause: e,
    maxFeePerGas: t == null ? void 0 : t.maxFeePerGas
  }) : Q.FeeCapTooLowError.nodeMessage.test(r) ? new Q.FeeCapTooLowError({
    cause: e,
    maxFeePerGas: t == null ? void 0 : t.maxFeePerGas
  }) : Q.NonceTooHighError.nodeMessage.test(r) ? new Q.NonceTooHighError({ cause: e, nonce: t == null ? void 0 : t.nonce }) : Q.NonceTooLowError.nodeMessage.test(r) ? new Q.NonceTooLowError({ cause: e, nonce: t == null ? void 0 : t.nonce }) : Q.NonceMaxValueError.nodeMessage.test(r) ? new Q.NonceMaxValueError({ cause: e, nonce: t == null ? void 0 : t.nonce }) : Q.InsufficientFundsError.nodeMessage.test(r) ? new Q.InsufficientFundsError({ cause: e }) : Q.IntrinsicGasTooHighError.nodeMessage.test(r) ? new Q.IntrinsicGasTooHighError({ cause: e, gas: t == null ? void 0 : t.gas }) : Q.IntrinsicGasTooLowError.nodeMessage.test(r) ? new Q.IntrinsicGasTooLowError({ cause: e, gas: t == null ? void 0 : t.gas }) : Q.TransactionTypeNotSupportedError.nodeMessage.test(r) ? new Q.TransactionTypeNotSupportedError({ cause: e }) : Q.TipAboveFeeCapError.nodeMessage.test(r) ? new Q.TipAboveFeeCapError({
    cause: e,
    maxFeePerGas: t == null ? void 0 : t.maxFeePerGas,
    maxPriorityFeePerGas: t == null ? void 0 : t.maxPriorityFeePerGas
  }) : new Q.UnknownNodeError({
    cause: e
  });
}
$t.getNodeError = a_;
Object.defineProperty(ca, "__esModule", { value: !0 });
ca.getEstimateGasError = void 0;
const o_ = ua, i_ = V, s_ = $t;
function c_(e, { docsPath: t, ...r }) {
  const n = (() => {
    const a = (0, s_.getNodeError)(e, r);
    return a instanceof i_.UnknownNodeError ? e : a;
  })();
  return new o_.EstimateGasExecutionError(n, {
    docsPath: t,
    ...r
  });
}
ca.getEstimateGasError = c_;
var Vt = {};
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.extract = void 0;
function u_(e, { format: t }) {
  if (!t)
    return {};
  const r = {};
  function n(o) {
    const i = Object.keys(o);
    for (const s of i)
      s in e && (r[s] = e[s]), o[s] && typeof o[s] == "object" && !Array.isArray(o[s]) && n(o[s]);
  }
  const a = t(e || {});
  return n(a), r;
}
Vt.extract = u_;
var Kt = {}, Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.defineFormatter = void 0;
function d_(e, t) {
  return ({ exclude: r, format: n }) => ({
    exclude: r,
    format: (a) => {
      const o = t(a);
      if (r)
        for (const i of r)
          delete o[i];
      return {
        ...o,
        ...n(a)
      };
    },
    type: e
  });
}
Zt.defineFormatter = d_;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.defineTransactionRequest = e.formatTransactionRequest = e.rpcTransactionType = void 0;
  const t = M(), r = Zt;
  e.rpcTransactionType = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2"
  };
  function n(a) {
    return {
      ...a,
      gas: typeof a.gas < "u" ? (0, t.numberToHex)(a.gas) : void 0,
      gasPrice: typeof a.gasPrice < "u" ? (0, t.numberToHex)(a.gasPrice) : void 0,
      maxFeePerGas: typeof a.maxFeePerGas < "u" ? (0, t.numberToHex)(a.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: typeof a.maxPriorityFeePerGas < "u" ? (0, t.numberToHex)(a.maxPriorityFeePerGas) : void 0,
      nonce: typeof a.nonce < "u" ? (0, t.numberToHex)(a.nonce) : void 0,
      type: typeof a.type < "u" ? e.rpcTransactionType[a.type] : void 0,
      value: typeof a.value < "u" ? (0, t.numberToHex)(a.value) : void 0
    };
  }
  e.formatTransactionRequest = n, e.defineTransactionRequest = (0, r.defineFormatter)("transactionRequest", n);
})(Kt);
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.assertRequest = void 0;
const l_ = Pe, ju = He, Pu = V, f_ = q, Tu = $e;
function b_(e) {
  const { account: t, gasPrice: r, maxFeePerGas: n, maxPriorityFeePerGas: a, to: o } = e, i = t ? (0, l_.parseAccount)(t) : void 0;
  if (i && !(0, Tu.isAddress)(i.address))
    throw new ju.InvalidAddressError({ address: i.address });
  if (o && !(0, Tu.isAddress)(o))
    throw new ju.InvalidAddressError({ address: o });
  if (typeof r < "u" && (typeof n < "u" || typeof a < "u"))
    throw new f_.FeeConflictError();
  if (n && n > 2n ** 256n - 1n)
    throw new Pu.FeeCapTooHighError({ maxFeePerGas: n });
  if (a && n && a > n)
    throw new Pu.TipAboveFeeCapError({ maxFeePerGas: n, maxPriorityFeePerGas: a });
}
vt.assertRequest = b_;
var In = {}, lr = {}, Qe = {};
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.MaxFeePerGasTooLowError = Qe.Eip1559FeesNotSupportedError = Qe.BaseFeeScalarError = void 0;
const m_ = ht, Hc = G;
class g_ extends Hc.BaseError {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseFeeScalarError"
    });
  }
}
Qe.BaseFeeScalarError = g_;
class y_ extends Hc.BaseError {
  constructor() {
    super("Chain does not support EIP-1559 fees."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Eip1559FeesNotSupportedError"
    });
  }
}
Qe.Eip1559FeesNotSupportedError = y_;
class __ extends Hc.BaseError {
  constructor({ maxPriorityFeePerGas: t }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${(0, m_.formatGwei)(t)} gwei).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "MaxFeePerGasTooLowError"
    });
  }
}
Qe.MaxFeePerGasTooLowError = __;
var fr = {}, Nt = {}, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.BlockNotFoundError = void 0;
const h_ = G;
class p_ extends h_.BaseError {
  constructor({ blockHash: t, blockNumber: r }) {
    let n = "Block";
    t && (n = `Block at hash "${t}"`), r && (n = `Block at number "${r}"`), super(`${n} could not be found.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BlockNotFoundError"
    });
  }
}
Wr.BlockNotFoundError = p_;
var Ct = {}, Vr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.defineTransaction = e.formatTransaction = e.transactionType = void 0;
  const t = ue(), r = Zt;
  e.transactionType = {
    "0x0": "legacy",
    "0x1": "eip2930",
    "0x2": "eip1559"
  };
  function n(a) {
    const o = {
      ...a,
      blockHash: a.blockHash ? a.blockHash : null,
      blockNumber: a.blockNumber ? BigInt(a.blockNumber) : null,
      chainId: a.chainId ? (0, t.hexToNumber)(a.chainId) : void 0,
      gas: a.gas ? BigInt(a.gas) : void 0,
      gasPrice: a.gasPrice ? BigInt(a.gasPrice) : void 0,
      maxFeePerGas: a.maxFeePerGas ? BigInt(a.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: a.maxPriorityFeePerGas ? BigInt(a.maxPriorityFeePerGas) : void 0,
      nonce: a.nonce ? (0, t.hexToNumber)(a.nonce) : void 0,
      to: a.to ? a.to : null,
      transactionIndex: a.transactionIndex ? Number(a.transactionIndex) : null,
      type: a.type ? e.transactionType[a.type] : void 0,
      typeHex: a.type ? a.type : void 0,
      value: a.value ? BigInt(a.value) : void 0,
      v: a.v ? BigInt(a.v) : void 0
    };
    return o.yParity = (() => {
      if (a.yParity)
        return Number(a.yParity);
      if (typeof o.v == "bigint") {
        if (o.v === 0n || o.v === 27n)
          return 0;
        if (o.v === 1n || o.v === 28n)
          return 1;
        if (o.v >= 35n)
          return o.v % 2n === 0n ? 1 : 0;
      }
    })(), o.type === "legacy" && (delete o.accessList, delete o.maxFeePerGas, delete o.maxPriorityFeePerGas, delete o.yParity), o.type === "eip2930" && (delete o.maxFeePerGas, delete o.maxPriorityFeePerGas), o;
  }
  e.formatTransaction = n, e.defineTransaction = (0, r.defineFormatter)("transaction", n);
})(Vr);
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.defineBlock = Ct.formatBlock = void 0;
const v_ = Zt, E_ = Vr;
function Vl(e) {
  var r;
  const t = (r = e.transactions) == null ? void 0 : r.map((n) => typeof n == "string" ? n : (0, E_.formatTransaction)(n));
  return {
    ...e,
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
    hash: e.hash ? e.hash : null,
    logsBloom: e.logsBloom ? e.logsBloom : null,
    nonce: e.nonce ? e.nonce : null,
    number: e.number ? BigInt(e.number) : null,
    size: e.size ? BigInt(e.size) : void 0,
    timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
    transactions: t,
    totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null
  };
}
Ct.formatBlock = Vl;
Ct.defineBlock = (0, v_.defineFormatter)("block", Vl);
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.getBlock = void 0;
const j_ = Wr, P_ = M(), T_ = Ct;
async function A_(e, { blockHash: t, blockNumber: r, blockTag: n, includeTransactions: a } = {}) {
  var u, d, l;
  const o = n ?? "latest", i = a ?? !1, s = r !== void 0 ? (0, P_.numberToHex)(r) : void 0;
  let c = null;
  if (t ? c = await e.request({
    method: "eth_getBlockByHash",
    params: [t, i]
  }) : c = await e.request({
    method: "eth_getBlockByNumber",
    params: [s || o, i]
  }), !c)
    throw new j_.BlockNotFoundError({ blockHash: t, blockNumber: r });
  return (((l = (d = (u = e.chain) == null ? void 0 : u.formatters) == null ? void 0 : d.block) == null ? void 0 : l.format) || T_.formatBlock)(c);
}
Nt.getBlock = A_;
var Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.getGasPrice = void 0;
async function w_(e) {
  const t = await e.request({
    method: "eth_gasPrice"
  });
  return BigInt(t);
}
Kr.getGasPrice = w_;
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.internal_estimateMaxPriorityFeePerGas = fr.estimateMaxPriorityFeePerGas = void 0;
const O_ = Qe, I_ = ue(), Xs = X, Au = Nt, $_ = Kr;
async function C_(e, t) {
  return Kl(e, t);
}
fr.estimateMaxPriorityFeePerGas = C_;
async function Kl(e, t) {
  var o, i, s;
  const { block: r, chain: n = e.chain, request: a } = t || {};
  if (typeof ((o = n == null ? void 0 : n.fees) == null ? void 0 : o.defaultPriorityFee) == "function") {
    const c = r || await (0, Xs.getAction)(e, Au.getBlock, "getBlock")({});
    return n.fees.defaultPriorityFee({
      block: c,
      client: e,
      request: a
    });
  }
  if (typeof ((i = n == null ? void 0 : n.fees) == null ? void 0 : i.defaultPriorityFee) < "u")
    return (s = n == null ? void 0 : n.fees) == null ? void 0 : s.defaultPriorityFee;
  try {
    const c = await e.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return (0, I_.hexToBigInt)(c);
  } catch {
    const [c, m] = await Promise.all([
      r ? Promise.resolve(r) : (0, Xs.getAction)(e, Au.getBlock, "getBlock")({}),
      (0, Xs.getAction)(e, $_.getGasPrice, "getGasPrice")({})
    ]);
    if (typeof c.baseFeePerGas != "bigint")
      throw new O_.Eip1559FeesNotSupportedError();
    const u = m - c.baseFeePerGas;
    return u < 0n ? 0n : u;
  }
}
fr.internal_estimateMaxPriorityFeePerGas = Kl;
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.internal_estimateFeesPerGas = lr.estimateFeesPerGas = void 0;
const wu = Qe, Ou = X, S_ = fr, R_ = Nt, B_ = Kr;
async function M_(e, t) {
  return Zl(e, t);
}
lr.estimateFeesPerGas = M_;
async function Zl(e, t) {
  var l, f;
  const { block: r, chain: n = e.chain, request: a, type: o = "eip1559" } = t || {}, i = await (async () => {
    var b, y;
    return typeof ((b = n == null ? void 0 : n.fees) == null ? void 0 : b.baseFeeMultiplier) == "function" ? n.fees.baseFeeMultiplier({
      block: r,
      client: e,
      request: a
    }) : ((y = n == null ? void 0 : n.fees) == null ? void 0 : y.baseFeeMultiplier) ?? 1.2;
  })();
  if (i < 1)
    throw new wu.BaseFeeScalarError();
  const c = 10 ** (((l = i.toString().split(".")[1]) == null ? void 0 : l.length) ?? 0), m = (b) => b * BigInt(Math.ceil(i * c)) / BigInt(c), u = r || await (0, Ou.getAction)(e, R_.getBlock, "getBlock")({});
  if (typeof ((f = n == null ? void 0 : n.fees) == null ? void 0 : f.estimateFeesPerGas) == "function")
    return n.fees.estimateFeesPerGas({
      block: r,
      client: e,
      multiply: m,
      request: a,
      type: o
    });
  if (o === "eip1559") {
    if (typeof u.baseFeePerGas != "bigint")
      throw new wu.Eip1559FeesNotSupportedError();
    const b = a != null && a.maxPriorityFeePerGas ? a.maxPriorityFeePerGas : await (0, S_.internal_estimateMaxPriorityFeePerGas)(e, {
      block: u,
      chain: n,
      request: a
    }), y = m(u.baseFeePerGas);
    return {
      maxFeePerGas: (a == null ? void 0 : a.maxFeePerGas) ?? y + b,
      maxPriorityFeePerGas: b
    };
  }
  return {
    gasPrice: (a == null ? void 0 : a.gasPrice) ?? m(await (0, Ou.getAction)(e, B_.getGasPrice, "getGasPrice")({}))
  };
}
lr.internal_estimateFeesPerGas = Zl;
var da = {};
Object.defineProperty(da, "__esModule", { value: !0 });
da.getTransactionCount = void 0;
const F_ = ue(), N_ = M();
async function k_(e, { address: t, blockTag: r = "latest", blockNumber: n }) {
  const a = await e.request({
    method: "eth_getTransactionCount",
    params: [t, n ? (0, N_.numberToHex)(n) : r]
  });
  return (0, F_.hexToNumber)(a);
}
da.getTransactionCount = k_;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
Er.getTransactionType = void 0;
const D_ = q;
function H_(e) {
  if (e.type)
    return e.type;
  if (typeof e.maxFeePerGas < "u" || typeof e.maxPriorityFeePerGas < "u")
    return "eip1559";
  if (typeof e.gasPrice < "u")
    return typeof e.accessList < "u" ? "eip2930" : "legacy";
  throw new D_.InvalidSerializableTransactionError({ transaction: e });
}
Er.getTransactionType = H_;
var Iu;
function la() {
  if (Iu)
    return In;
  Iu = 1, Object.defineProperty(In, "__esModule", { value: !0 }), In.prepareTransactionRequest = void 0;
  const e = Pe, t = lr, r = Uc(), n = Nt, a = da, o = Ft, i = Qe, s = X, c = vt, m = Er;
  async function u(d, l) {
    const { account: f = d.account, chain: b, gas: y, nonce: h, type: p } = l;
    if (!f)
      throw new o.AccountNotFoundError();
    const g = (0, e.parseAccount)(f), v = await (0, s.getAction)(d, n.getBlock, "getBlock")({ blockTag: "latest" }), j = { ...l, from: g.address };
    if (typeof h > "u" && (j.nonce = await (0, s.getAction)(d, a.getTransactionCount, "getTransactionCount")({
      address: g.address,
      blockTag: "pending"
    })), typeof p > "u")
      try {
        j.type = (0, m.getTransactionType)(j);
      } catch {
        j.type = typeof v.baseFeePerGas == "bigint" ? "eip1559" : "legacy";
      }
    if (j.type === "eip1559") {
      const { maxFeePerGas: E, maxPriorityFeePerGas: P } = await (0, t.internal_estimateFeesPerGas)(d, {
        block: v,
        chain: b,
        request: j
      });
      if (typeof l.maxPriorityFeePerGas > "u" && l.maxFeePerGas && l.maxFeePerGas < P)
        throw new i.MaxFeePerGasTooLowError({
          maxPriorityFeePerGas: P
        });
      j.maxPriorityFeePerGas = P, j.maxFeePerGas = E;
    } else {
      if (typeof l.maxFeePerGas < "u" || typeof l.maxPriorityFeePerGas < "u")
        throw new i.Eip1559FeesNotSupportedError();
      const { gasPrice: E } = await (0, t.internal_estimateFeesPerGas)(d, {
        block: v,
        chain: b,
        request: j,
        type: "legacy"
      });
      j.gasPrice = E;
    }
    return typeof y > "u" && (j.gas = await (0, s.getAction)(d, r.estimateGas, "estimateGas")({
      ...j,
      account: { address: g.address, type: "json-rpc" }
    })), (0, c.assertRequest)(j), j;
  }
  return In.prepareTransactionRequest = u, In;
}
var $u;
function Uc() {
  if ($u)
    return On;
  $u = 1, Object.defineProperty(On, "__esModule", { value: !0 }), On.estimateGas = void 0;
  const e = Pe, t = Ft, r = M(), n = ca, a = Vt, o = Kt, i = vt, s = la();
  async function c(m, u) {
    var f, b, y;
    const d = u.account ?? m.account;
    if (!d)
      throw new t.AccountNotFoundError({
        docsPath: "/docs/actions/public/estimateGas"
      });
    const l = (0, e.parseAccount)(d);
    try {
      const { accessList: h, blockNumber: p, blockTag: g, data: v, gas: j, gasPrice: E, maxFeePerGas: P, maxPriorityFeePerGas: $, nonce: k, to: L, value: N, ...K } = l.type === "local" ? await (0, s.prepareTransactionRequest)(m, u) : u, R = (p ? (0, r.numberToHex)(p) : void 0) || g;
      (0, i.assertRequest)(u);
      const w = (y = (b = (f = m.chain) == null ? void 0 : f.formatters) == null ? void 0 : b.transactionRequest) == null ? void 0 : y.format, z = (w || o.formatTransactionRequest)({
        ...(0, a.extract)(K, { format: w }),
        from: l.address,
        accessList: h,
        data: v,
        gas: j,
        gasPrice: E,
        maxFeePerGas: P,
        maxPriorityFeePerGas: $,
        nonce: k,
        to: L,
        value: N
      }), W = await m.request({
        method: "eth_estimateGas",
        params: R ? [z, R] : [z]
      });
      return BigInt(W);
    } catch (h) {
      throw (0, n.getEstimateGasError)(h, {
        ...u,
        account: l,
        chain: m.chain
      });
    }
  }
  return On.estimateGas = c, On;
}
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.estimateContractGas = void 0;
const U_ = Pe, L_ = Ue, q_ = Mt, x_ = X, z_ = Uc();
async function G_(e, { abi: t, address: r, args: n, functionName: a, ...o }) {
  const i = (0, L_.encodeFunctionData)({
    abi: t,
    args: n,
    functionName: a
  });
  try {
    return await (0, x_.getAction)(e, z_.estimateGas, "estimateGas")({
      data: i,
      to: r,
      ...o
    });
  } catch (s) {
    const c = o.account ? (0, U_.parseAccount)(o.account) : void 0;
    throw (0, q_.getContractError)(s, {
      abi: t,
      address: r,
      args: n,
      docsPath: "/docs/contract/estimateContractGas",
      functionName: a,
      sender: c == null ? void 0 : c.address
    });
  }
}
oa.estimateContractGas = G_;
var Zr = {}, Jr = {}, kt = {};
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.decodeEventLog = void 0;
const Rr = Y(), W_ = Gt, Jl = _t, V_ = Bt(), Cu = "/docs/contract/decodeEventLog";
function K_({ abi: e, data: t, strict: r, topics: n }) {
  const a = r ?? !0, [o, ...i] = n;
  if (!o)
    throw new Rr.AbiEventSignatureEmptyTopicsError({
      docsPath: Cu
    });
  const s = e.find((b) => b.type === "event" && o === (0, W_.getEventSelector)((0, V_.formatAbiItem)(b)));
  if (!(s && "name" in s) || s.type !== "event")
    throw new Rr.AbiEventSignatureNotFoundError(o, {
      docsPath: Cu
    });
  const { name: c, inputs: m } = s, u = m == null ? void 0 : m.some((b) => !("name" in b && b.name));
  let d = u ? [] : {};
  const l = m.filter((b) => "indexed" in b && b.indexed);
  for (let b = 0; b < l.length; b++) {
    const y = l[b], h = i[b];
    if (!h)
      throw new Rr.DecodeLogTopicsMismatch({
        abiItem: s,
        param: y
      });
    d[y.name || b] = Z_({ param: y, value: h });
  }
  const f = m.filter((b) => !("indexed" in b && b.indexed));
  if (f.length > 0) {
    if (t && t !== "0x")
      try {
        const b = (0, Jl.decodeAbiParameters)(f, t);
        if (b)
          if (u)
            d = [...d, ...b];
          else
            for (let y = 0; y < f.length; y++)
              d[f[y].name] = b[y];
      } catch (b) {
        if (a)
          throw b instanceof Rr.AbiDecodingDataSizeTooSmallError ? new Rr.DecodeLogDataMismatch({
            abiItem: s,
            data: b.data,
            params: b.params,
            size: b.size
          }) : b;
      }
    else if (a)
      throw new Rr.DecodeLogDataMismatch({
        abiItem: s,
        data: "0x",
        params: f,
        size: 0
      });
  }
  return {
    eventName: c,
    args: Object.values(d).length > 0 ? d : void 0
  };
}
kt.decodeEventLog = K_;
function Z_({ param: e, value: t }) {
  return e.type === "string" || e.type === "bytes" || e.type === "tuple" || e.type.match(/^(.*)\[(\d+)?\]$/) ? t : ((0, Jl.decodeAbiParameters)([e], t) || [])[0];
}
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.formatLog = void 0;
function J_(e, { args: t, eventName: r } = {}) {
  return {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    logIndex: e.logIndex ? Number(e.logIndex) : null,
    transactionHash: e.transactionHash ? e.transactionHash : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    ...r ? { args: t, eventName: r } : {}
  };
}
Et.formatLog = J_;
Object.defineProperty(Jr, "__esModule", { value: !0 });
Jr.getLogs = void 0;
const Su = Y(), X_ = kt, Q_ = Rt, Ru = M(), Bu = Et;
async function Y_(e, { address: t, blockHash: r, fromBlock: n, toBlock: a, event: o, events: i, args: s, strict: c } = {}) {
  const m = c ?? !1, u = i ?? (o ? [o] : void 0);
  let d = [];
  u && (d = [
    u.flatMap((f) => (0, Q_.encodeEventTopics)({
      abi: [f],
      eventName: f.name,
      args: s
    }))
  ], o && (d = d[0]));
  let l;
  return r ? l = await e.request({
    method: "eth_getLogs",
    params: [{ address: t, topics: d, blockHash: r }]
  }) : l = await e.request({
    method: "eth_getLogs",
    params: [
      {
        address: t,
        topics: d,
        fromBlock: typeof n == "bigint" ? (0, Ru.numberToHex)(n) : n,
        toBlock: typeof a == "bigint" ? (0, Ru.numberToHex)(a) : a
      }
    ]
  }), l.map((f) => {
    var b;
    try {
      const { eventName: y, args: h } = u ? (0, X_.decodeEventLog)({
        abi: u,
        data: f.data,
        topics: f.topics,
        strict: m
      }) : { eventName: void 0, args: void 0 };
      return (0, Bu.formatLog)(f, { args: h, eventName: y });
    } catch (y) {
      let h, p;
      if (y instanceof Su.DecodeLogDataMismatch || y instanceof Su.DecodeLogTopicsMismatch) {
        if (m)
          return;
        h = y.abiItem.name, p = (b = y.abiItem.inputs) == null ? void 0 : b.some((g) => !("name" in g && g.name));
      }
      return (0, Bu.formatLog)(f, { args: p ? [] : {}, eventName: h });
    }
  }).filter(Boolean);
}
Jr.getLogs = Y_;
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.getContractEvents = void 0;
const eh = je, th = X, rh = Jr;
async function nh(e, { abi: t, address: r, args: n, blockHash: a, eventName: o, fromBlock: i, toBlock: s, strict: c }) {
  const m = o ? (0, eh.getAbiItem)({ abi: t, name: o }) : void 0, u = m ? void 0 : t.filter((d) => d.type === "event");
  return (0, th.getAction)(e, rh.getLogs, "getLogs")({
    address: r,
    args: n,
    blockHash: a,
    event: m,
    events: u,
    fromBlock: i,
    toBlock: s,
    strict: c
  });
}
Zr.getContractEvents = nh;
var tt = {}, rt = {};
Object.defineProperty(rt, "__esModule", { value: !0 });
rt.decodeFunctionResult = void 0;
const Qs = Y(), ah = _t, oh = je, Ys = "/docs/contract/decodeFunctionResult";
function ih({ abi: e, args: t, functionName: r, data: n }) {
  let a = e[0];
  if (r && (a = (0, oh.getAbiItem)({
    abi: e,
    args: t,
    name: r
  }), !a))
    throw new Qs.AbiFunctionNotFoundError(r, { docsPath: Ys });
  if (a.type !== "function")
    throw new Qs.AbiFunctionNotFoundError(void 0, { docsPath: Ys });
  if (!a.outputs)
    throw new Qs.AbiFunctionOutputsNotFoundError(a.name, { docsPath: Ys });
  const o = (0, ah.decodeAbiParameters)(a.outputs, n);
  if (o && o.length > 1)
    return o;
  if (o && o.length === 1)
    return o[0];
}
rt.decodeFunctionResult = ih;
var nr = {}, re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.universalSignatureValidatorAbi = re.smartAccountAbi = re.addressResolverAbi = re.textResolverAbi = re.universalResolverReverseAbi = re.universalResolverResolveAbi = re.multicall3Abi = void 0;
re.multicall3Abi = [
  {
    inputs: [
      {
        components: [
          {
            name: "target",
            type: "address"
          },
          {
            name: "allowFailure",
            type: "bool"
          },
          {
            name: "callData",
            type: "bytes"
          }
        ],
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            name: "success",
            type: "bool"
          },
          {
            name: "returnData",
            type: "bytes"
          }
        ],
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
const Xl = [
  {
    inputs: [],
    name: "ResolverNotFound",
    type: "error"
  },
  {
    inputs: [],
    name: "ResolverWildcardNotSupported",
    type: "error"
  }
];
re.universalResolverResolveAbi = [
  ...Xl,
  {
    name: "resolve",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes" },
      { name: "data", type: "bytes" }
    ],
    outputs: [
      { name: "", type: "bytes" },
      { name: "address", type: "address" }
    ]
  }
];
re.universalResolverReverseAbi = [
  ...Xl,
  {
    name: "reverse",
    type: "function",
    stateMutability: "view",
    inputs: [{ type: "bytes", name: "reverseName" }],
    outputs: [
      { type: "string", name: "resolvedName" },
      { type: "address", name: "resolvedAddress" },
      { type: "address", name: "reverseResolver" },
      { type: "address", name: "resolver" }
    ]
  }
];
re.textResolverAbi = [
  {
    name: "text",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes32" },
      { name: "key", type: "string" }
    ],
    outputs: [{ name: "", type: "string" }]
  }
];
re.addressResolverAbi = [
  {
    name: "addr",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "name", type: "bytes32" }],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "addr",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes32" },
      { name: "coinType", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bytes" }]
  }
];
re.smartAccountAbi = [
  {
    name: "isValidSignature",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "hash", type: "bytes32" },
      { name: "signature", type: "bytes" }
    ],
    outputs: [{ name: "", type: "bytes4" }]
  }
];
re.universalSignatureValidatorAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  }
];
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
Zo.aggregate3Signature = void 0;
Zo.aggregate3Signature = "0x82ad56cb";
var ve = {};
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.InvalidChainIdError = ve.ClientChainNotConfiguredError = ve.ChainNotFoundError = ve.ChainMismatchError = ve.ChainDoesNotSupportContract = void 0;
const fa = G;
class sh extends fa.BaseError {
  constructor({ blockNumber: t, chain: r, contract: n }) {
    super(`Chain "${r.name}" does not support contract "${n.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...t && n.blockCreated && n.blockCreated > t ? [
          `- The contract "${n.name}" was not deployed until block ${n.blockCreated} (current block ${t}).`
        ] : [
          `- The chain does not have the contract "${n.name}" configured.`
        ]
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainDoesNotSupportContract"
    });
  }
}
ve.ChainDoesNotSupportContract = sh;
class ch extends fa.BaseError {
  constructor({ chain: t, currentChainId: r }) {
    super(`The current chain of the wallet (id: ${r}) does not match the target chain for the transaction (id: ${t.id} – ${t.name}).`, {
      metaMessages: [
        `Current Chain ID:  ${r}`,
        `Expected Chain ID: ${t.id} – ${t.name}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainMismatchError"
    });
  }
}
ve.ChainMismatchError = ch;
class uh extends fa.BaseError {
  constructor() {
    super([
      "No chain was provided to the request.",
      "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."
    ].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainNotFoundError"
    });
  }
}
ve.ChainNotFoundError = uh;
class dh extends fa.BaseError {
  constructor() {
    super("No chain was provided to the Client."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ClientChainNotConfiguredError"
    });
  }
}
ve.ClientChainNotConfiguredError = dh;
class lh extends fa.BaseError {
  constructor({ chainId: t }) {
    super(`Chain ID "${t}" is invalid.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidChainIdError"
    });
  }
}
ve.InvalidChainIdError = lh;
var nt = {};
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.getChainContractAddress = void 0;
const Mu = ve;
function fh({ blockNumber: e, chain: t, contract: r }) {
  var a;
  const n = (a = t == null ? void 0 : t.contracts) == null ? void 0 : a[r];
  if (!n)
    throw new Mu.ChainDoesNotSupportContract({
      chain: t,
      contract: { name: r }
    });
  if (e && n.blockCreated && n.blockCreated > e)
    throw new Mu.ChainDoesNotSupportContract({
      blockNumber: e,
      chain: t,
      contract: {
        name: r,
        blockCreated: n.blockCreated
      }
    });
  return n.address;
}
nt.getChainContractAddress = fh;
var ba = {};
Object.defineProperty(ba, "__esModule", { value: !0 });
ba.getCallError = void 0;
const bh = be, mh = V, gh = $t;
function yh(e, { docsPath: t, ...r }) {
  const n = (() => {
    const a = (0, gh.getNodeError)(e, r);
    return a instanceof mh.UnknownNodeError ? e : a;
  })();
  return new bh.CallExecutionError(n, {
    docsPath: t,
    ...r
  });
}
ba.getCallError = yh;
var Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.createBatchScheduler = void 0;
const ec = /* @__PURE__ */ new Map();
function _h({ fn: e, id: t, shouldSplitBatch: r, wait: n = 0, sort: a }) {
  const o = async () => {
    const u = c();
    i();
    const d = u.map(({ args: l }) => l);
    d.length !== 0 && e(d).then((l) => {
      var f;
      a && Array.isArray(l) && l.sort(a);
      for (let b = 0; b < u.length; b++) {
        const { pendingPromise: y } = u[b];
        (f = y.resolve) == null || f.call(y, [l[b], l]);
      }
    }).catch((l) => {
      var f;
      for (let b = 0; b < u.length; b++) {
        const { pendingPromise: y } = u[b];
        (f = y.reject) == null || f.call(y, l);
      }
    });
  }, i = () => ec.delete(t), s = () => c().map(({ args: u }) => u), c = () => ec.get(t) || [], m = (u) => ec.set(t, [...c(), u]);
  return {
    flush: i,
    async schedule(u) {
      const d = {}, l = new Promise((y, h) => {
        d.resolve = y, d.reject = h;
      });
      return (r == null ? void 0 : r([...s(), u])) && o(), c().length > 0 ? (m({ args: u, pendingPromise: d }), l) : (m({ args: u, pendingPromise: d }), setTimeout(o, n), l);
    }
  };
}
Xr.createBatchScheduler = _h;
var tc = {}, Lt = {};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.OffchainLookupSenderMismatchError = Lt.OffchainLookupResponseMalformedError = Lt.OffchainLookupError = void 0;
const hh = _e, Lc = G, Ql = Xe;
class ph extends Lc.BaseError {
  constructor({ callbackSelector: t, cause: r, data: n, extraData: a, sender: o, urls: i }) {
    var s;
    super(r.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause: r,
      metaMessages: [
        ...r.metaMessages || [],
        (s = r.metaMessages) != null && s.length ? "" : [],
        "Offchain Gateway Call:",
        i && [
          "  Gateway URL(s):",
          ...i.map((c) => `    ${(0, Ql.getUrl)(c)}`)
        ],
        `  Sender: ${o}`,
        `  Data: ${n}`,
        `  Callback selector: ${t}`,
        `  Extra data: ${a}`
      ].flat()
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "OffchainLookupError"
    });
  }
}
Lt.OffchainLookupError = ph;
class vh extends Lc.BaseError {
  constructor({ result: t, url: r }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${(0, Ql.getUrl)(r)}`,
        `Response: ${(0, hh.stringify)(t)}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "OffchainLookupResponseMalformedError"
    });
  }
}
Lt.OffchainLookupResponseMalformedError = vh;
class Eh extends Lc.BaseError {
  constructor({ sender: t, to: r }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${r}`,
        `OffchainLookup sender address: ${t}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "OffchainLookupSenderMismatchError"
    });
  }
}
Lt.OffchainLookupSenderMismatchError = Eh;
var Jt = {};
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.isAddressEqual = void 0;
const Fu = He, Nu = $e;
function jh(e, t) {
  if (!(0, Nu.isAddress)(e))
    throw new Fu.InvalidAddressError({ address: e });
  if (!(0, Nu.isAddress)(t))
    throw new Fu.InvalidAddressError({ address: t });
  return e.toLowerCase() === t.toLowerCase();
}
Jt.isAddressEqual = jh;
var ku;
function qc() {
  return ku || (ku = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ccipFetch = e.offchainLookup = e.offchainLookupAbiItem = e.offchainLookupSignature = void 0;
    const t = ma(), r = Lt, n = ye, a = hr, o = Oe, i = Jt, s = oe, c = ce, m = _e;
    e.offchainLookupSignature = "0x556f1830", e.offchainLookupAbiItem = {
      name: "OffchainLookup",
      type: "error",
      inputs: [
        {
          name: "sender",
          type: "address"
        },
        {
          name: "urls",
          type: "string[]"
        },
        {
          name: "callData",
          type: "bytes"
        },
        {
          name: "callbackFunction",
          type: "bytes4"
        },
        {
          name: "extraData",
          type: "bytes"
        }
      ]
    };
    async function u(l, { blockNumber: f, blockTag: b, data: y, to: h }) {
      const { args: p } = (0, a.decodeErrorResult)({
        data: y,
        abi: [e.offchainLookupAbiItem]
      }), [g, v, j, E, P] = p;
      try {
        if (!(0, i.isAddressEqual)(h, g))
          throw new r.OffchainLookupSenderMismatchError({ sender: g, to: h });
        const $ = await d({ data: j, sender: g, urls: v }), { data: k } = await (0, t.call)(l, {
          blockNumber: f,
          blockTag: b,
          data: (0, s.concat)([
            E,
            (0, o.encodeAbiParameters)([{ type: "bytes" }, { type: "bytes" }], [$, P])
          ]),
          to: h
        });
        return k;
      } catch ($) {
        throw new r.OffchainLookupError({
          callbackSelector: E,
          cause: $,
          data: y,
          extraData: P,
          sender: g,
          urls: v
        });
      }
    }
    e.offchainLookup = u;
    async function d({ data: l, sender: f, urls: b }) {
      var h;
      let y = new Error("An unknown error occurred.");
      for (let p = 0; p < b.length; p++) {
        const g = b[p], v = g.includes("{data}") ? "GET" : "POST", j = v === "POST" ? { data: l, sender: f } : void 0;
        try {
          const E = await fetch(g.replace("{sender}", f).replace("{data}", l), {
            body: JSON.stringify(j),
            method: v
          });
          let P;
          if ((h = E.headers.get("Content-Type")) != null && h.startsWith("application/json") ? P = (await E.json()).data : P = await E.text(), !E.ok) {
            y = new n.HttpRequestError({
              body: j,
              details: P != null && P.error ? (0, m.stringify)(P.error) : E.statusText,
              headers: E.headers,
              status: E.status,
              url: g
            });
            continue;
          }
          if (!(0, c.isHex)(P)) {
            y = new r.OffchainLookupResponseMalformedError({
              result: P,
              url: g
            });
            continue;
          }
          return P;
        } catch (E) {
          y = new n.HttpRequestError({
            body: j,
            details: E.message,
            url: g
          });
        }
      }
      throw y;
    }
    e.ccipFetch = d;
  }(tc)), tc;
}
var Du;
function ma() {
  if (Du)
    return nr;
  Du = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.getRevertErrorData = nr.call = void 0;
  const e = Pe, t = re, r = Zo, n = G, a = ve, o = be, i = rt, s = Ue, c = nt, m = M(), u = ba, d = Vt, l = Kt, f = Xr, b = vt;
  async function y(v, j) {
    var Z, ne, ie, me;
    const { account: E = v.account, batch: P = !!((Z = v.batch) != null && Z.multicall), blockNumber: $, blockTag: k = "latest", accessList: L, data: N, gas: K, gasPrice: x, maxFeePerGas: R, maxPriorityFeePerGas: w, nonce: I, to: z, value: W, ...ee } = j, H = E ? (0, e.parseAccount)(E) : void 0;
    try {
      (0, b.assertRequest)(j);
      const he = ($ ? (0, m.numberToHex)($) : void 0) || k, Se = (me = (ie = (ne = v.chain) == null ? void 0 : ne.formatters) == null ? void 0 : ie.transactionRequest) == null ? void 0 : me.format, Le = (Se || l.formatTransactionRequest)({
        ...(0, d.extract)(ee, { format: Se }),
        from: H == null ? void 0 : H.address,
        accessList: L,
        data: N,
        gas: K,
        gasPrice: x,
        maxFeePerGas: R,
        maxPriorityFeePerGas: w,
        nonce: I,
        to: z,
        value: W
      });
      if (P && h({ request: Le }))
        try {
          return await p(v, {
            ...Le,
            blockNumber: $,
            blockTag: k
          });
        } catch (Ze) {
          if (!(Ze instanceof a.ClientChainNotConfiguredError) && !(Ze instanceof a.ChainDoesNotSupportContract))
            throw Ze;
        }
      const Ke = await v.request({
        method: "eth_call",
        params: he ? [Le, he] : [Le]
      });
      return Ke === "0x" ? { data: void 0 } : { data: Ke };
    } catch (Te) {
      const he = g(Te), { offchainLookup: Se, offchainLookupSignature: at } = await Promise.resolve().then(() => qc());
      if ((he == null ? void 0 : he.slice(0, 10)) === at && z)
        return { data: await Se(v, { data: he, to: z }) };
      throw (0, u.getCallError)(Te, {
        ...j,
        account: H,
        chain: v.chain
      });
    }
  }
  nr.call = y;
  function h({ request: v }) {
    const { data: j, to: E, ...P } = v;
    return !(!j || j.startsWith(r.aggregate3Signature) || !E || Object.values(P).filter(($) => typeof $ < "u").length > 0);
  }
  async function p(v, j) {
    var ee;
    const { batchSize: E = 1024, wait: P = 0 } = typeof ((ee = v.batch) == null ? void 0 : ee.multicall) == "object" ? v.batch.multicall : {}, { blockNumber: $, blockTag: k = "latest", data: L, multicallAddress: N, to: K } = j;
    let x = N;
    if (!x) {
      if (!v.chain)
        throw new a.ClientChainNotConfiguredError();
      x = (0, c.getChainContractAddress)({
        blockNumber: $,
        chain: v.chain,
        contract: "multicall3"
      });
    }
    const w = ($ ? (0, m.numberToHex)($) : void 0) || k, { schedule: I } = (0, f.createBatchScheduler)({
      id: `${v.uid}.${w}`,
      wait: P,
      shouldSplitBatch(H) {
        return H.reduce((ne, { data: ie }) => ne + (ie.length - 2), 0) > E * 2;
      },
      fn: async (H) => {
        const Z = H.map((me) => ({
          allowFailure: !0,
          callData: me.data,
          target: me.to
        })), ne = (0, s.encodeFunctionData)({
          abi: t.multicall3Abi,
          args: [Z],
          functionName: "aggregate3"
        }), ie = await v.request({
          method: "eth_call",
          params: [
            {
              data: ne,
              to: x
            },
            w
          ]
        });
        return (0, i.decodeFunctionResult)({
          abi: t.multicall3Abi,
          args: [Z],
          functionName: "aggregate3",
          data: ie || "0x"
        });
      }
    }), [{ returnData: z, success: W }] = await I({ data: L, to: K });
    if (!W)
      throw new o.RawContractError({ data: z });
    return z === "0x" ? { data: void 0 } : { data: z };
  }
  function g(v) {
    if (!(v instanceof n.BaseError))
      return;
    const j = v.walk();
    return typeof j.data == "object" ? j.data.data : j.data;
  }
  return nr.getRevertErrorData = g, nr;
}
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.readContract = void 0;
const Ph = rt, Th = Ue, Ah = Mt, wh = X, Oh = ma();
async function Ih(e, { abi: t, address: r, args: n, functionName: a, ...o }) {
  const i = (0, Th.encodeFunctionData)({
    abi: t,
    args: n,
    functionName: a
  });
  try {
    const { data: s } = await (0, wh.getAction)(e, Oh.call, "call")({
      data: i,
      to: r,
      ...o
    });
    return (0, Ph.decodeFunctionResult)({
      abi: t,
      args: n,
      functionName: a,
      data: s || "0x"
    });
  } catch (s) {
    throw (0, Ah.getContractError)(s, {
      abi: t,
      address: r,
      args: n,
      docsPath: "/docs/contract/readContract",
      functionName: a
    });
  }
}
tt.readContract = Ih;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: !0 });
ga.simulateContract = void 0;
const $h = Pe, Ch = rt, Sh = Ue, Rh = Mt, Bh = X, Mh = ma();
async function Fh(e, { abi: t, address: r, args: n, dataSuffix: a, functionName: o, ...i }) {
  const s = i.account ? (0, $h.parseAccount)(i.account) : void 0, c = (0, Sh.encodeFunctionData)({
    abi: t,
    args: n,
    functionName: o
  });
  try {
    const { data: m } = await (0, Bh.getAction)(e, Mh.call, "call")({
      batch: !1,
      data: `${c}${a ? a.replace("0x", "") : ""}`,
      to: r,
      ...i
    });
    return {
      result: (0, Ch.decodeFunctionResult)({
        abi: t,
        args: n,
        functionName: o,
        data: m || "0x"
      }),
      request: {
        abi: t,
        address: r,
        args: n,
        dataSuffix: a,
        functionName: o,
        ...i
      }
    };
  } catch (m) {
    throw (0, Rh.getContractError)(m, {
      abi: t,
      address: r,
      args: n,
      docsPath: "/docs/contract/simulateContract",
      functionName: o,
      sender: s == null ? void 0 : s.address
    });
  }
}
ga.simulateContract = Fh;
var ya = {}, jr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.observe = e.cleanupCache = e.listenersCache = void 0, e.listenersCache = /* @__PURE__ */ new Map(), e.cleanupCache = /* @__PURE__ */ new Map();
  let t = 0;
  function r(n, a, o) {
    const i = ++t, s = () => e.listenersCache.get(n) || [], c = () => {
      const f = s();
      e.listenersCache.set(n, f.filter((b) => b.id !== i));
    }, m = () => {
      const f = e.cleanupCache.get(n);
      s().length === 1 && f && f(), c();
    }, u = s();
    if (e.listenersCache.set(n, [
      ...u,
      { id: i, fns: a }
    ]), u && u.length > 0)
      return m;
    const d = {};
    for (const f in a)
      d[f] = (...b) => {
        var h, p;
        const y = s();
        if (y.length !== 0)
          for (const g of y)
            (p = (h = g.fns)[f]) == null || p.call(h, ...b);
      };
    const l = o(d);
    return typeof l == "function" && e.cleanupCache.set(n, l), m;
  }
  e.observe = r;
})(jr);
var Xt = {}, Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.wait = void 0;
async function Nh(e) {
  return new Promise((t) => setTimeout(t, e));
}
Qr.wait = Nh;
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.poll = void 0;
const Hu = Qr;
function kh(e, { emitOnBegin: t, initialWaitTime: r, interval: n }) {
  let a = !0;
  const o = () => a = !1;
  return (async () => {
    let s;
    t && (s = await e({ unpoll: o }));
    const c = await (r == null ? void 0 : r(s)) ?? n;
    await (0, Hu.wait)(c);
    const m = async () => {
      a && (await e({ unpoll: o }), await (0, Hu.wait)(n), m());
    };
    m();
  })(), o;
}
Xt.poll = kh;
var gt = {}, Yl = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.withCache = e.getCache = e.responseCache = e.promiseCache = void 0, e.promiseCache = /* @__PURE__ */ new Map(), e.responseCache = /* @__PURE__ */ new Map();
  function t(n) {
    const a = (s, c) => ({
      clear: () => c.delete(s),
      get: () => c.get(s),
      set: (m) => c.set(s, m)
    }), o = a(n, e.promiseCache), i = a(n, e.responseCache);
    return {
      clear: () => {
        o.clear(), i.clear();
      },
      promise: o,
      response: i
    };
  }
  e.getCache = t;
  async function r(n, { cacheKey: a, cacheTime: o = 1 / 0 }) {
    const i = t(a), s = i.response.get();
    if (s && o > 0 && (/* @__PURE__ */ new Date()).getTime() - s.created.getTime() < o)
      return s.data;
    let c = i.promise.get();
    c || (c = n(), i.promise.set(c));
    try {
      const m = await c;
      return i.response.set({ created: /* @__PURE__ */ new Date(), data: m }), m;
    } finally {
      i.promise.clear();
    }
  }
  e.withCache = r;
})(Yl);
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.getBlockNumber = gt.getBlockNumberCache = void 0;
const ef = Yl, tf = (e) => `blockNumber.${e}`;
function Dh(e) {
  return (0, ef.getCache)(tf(e));
}
gt.getBlockNumberCache = Dh;
async function Hh(e, { cacheTime: t = e.cacheTime, maxAge: r } = {}) {
  const n = await (0, ef.withCache)(() => e.request({
    method: "eth_blockNumber"
  }), { cacheKey: tf(e.uid), cacheTime: r ?? t });
  return BigInt(n);
}
gt.getBlockNumber = Hh;
var Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.getFilterChanges = void 0;
const Uu = Y(), Uh = kt, Lu = Et;
async function Lh(e, { filter: t }) {
  const r = "strict" in t && t.strict;
  return (await t.request({
    method: "eth_getFilterChanges",
    params: [t.id]
  })).map((a) => {
    var o;
    if (typeof a == "string")
      return a;
    try {
      const { eventName: i, args: s } = "abi" in t && t.abi ? (0, Uh.decodeEventLog)({
        abi: t.abi,
        data: a.data,
        topics: a.topics,
        strict: r
      }) : { eventName: void 0, args: void 0 };
      return (0, Lu.formatLog)(a, { args: s, eventName: i });
    } catch (i) {
      let s, c;
      if (i instanceof Uu.DecodeLogDataMismatch || i instanceof Uu.DecodeLogTopicsMismatch) {
        if ("strict" in t && t.strict)
          return;
        s = i.abiItem.name, c = (o = i.abiItem.inputs) == null ? void 0 : o.some((m) => !("name" in m && m.name));
      }
      return (0, Lu.formatLog)(a, { args: c ? [] : {}, eventName: s });
    }
  }).filter(Boolean);
}
Pr.getFilterChanges = Lh;
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.uninstallFilter = void 0;
async function qh(e, { filter: t }) {
  return t.request({
    method: "eth_uninstallFilter",
    params: [t.id]
  });
}
Tr.uninstallFilter = qh;
Object.defineProperty(ya, "__esModule", { value: !0 });
ya.watchContractEvent = void 0;
const xh = jr, zh = Xt, Gh = _e, qu = Y(), Wh = F, Vh = kt, Kh = Rt, xu = Et, $n = X, Zh = zr, Jh = gt, Xh = Zr, Qh = Pr, Yh = Tr;
function ep(e, { abi: t, address: r, args: n, batch: a = !0, eventName: o, onError: i, onLogs: s, poll: c, pollingInterval: m = e.pollingInterval, strict: u }) {
  return (typeof c < "u" ? c : e.transport.type !== "webSocket") ? (() => {
    const b = (0, Gh.stringify)([
      "watchContractEvent",
      r,
      n,
      a,
      e.uid,
      o,
      m
    ]), y = u ?? !1;
    return (0, xh.observe)(b, { onLogs: s, onError: i }, (h) => {
      let p, g, v = !1;
      const j = (0, zh.poll)(async () => {
        var E;
        if (!v) {
          try {
            g = await (0, $n.getAction)(e, Zh.createContractEventFilter, "createContractEventFilter")({
              abi: t,
              address: r,
              args: n,
              eventName: o,
              strict: y
            });
          } catch {
          }
          v = !0;
          return;
        }
        try {
          let P;
          if (g)
            P = await (0, $n.getAction)(e, Qh.getFilterChanges, "getFilterChanges")({ filter: g });
          else {
            const $ = await (0, $n.getAction)(e, Jh.getBlockNumber, "getBlockNumber")({});
            p && p !== $ ? P = await (0, $n.getAction)(e, Xh.getContractEvents, "getContractEvents")({
              abi: t,
              address: r,
              args: n,
              eventName: o,
              fromBlock: p + 1n,
              toBlock: $,
              strict: y
            }) : P = [], p = $;
          }
          if (P.length === 0)
            return;
          if (a)
            h.onLogs(P);
          else
            for (const $ of P)
              h.onLogs([$]);
        } catch (P) {
          g && P instanceof Wh.InvalidInputRpcError && (v = !1), (E = h.onError) == null || E.call(h, P);
        }
      }, {
        emitOnBegin: !0,
        interval: m
      });
      return async () => {
        g && await (0, $n.getAction)(e, Yh.uninstallFilter, "uninstallFilter")({ filter: g }), j();
      };
    });
  })() : (() => {
    let b = !0, y = () => b = !1;
    return (async () => {
      try {
        const h = o ? (0, Kh.encodeEventTopics)({
          abi: t,
          eventName: o,
          args: n
        }) : [], { unsubscribe: p } = await e.transport.subscribe({
          params: ["logs", { address: r, topics: h }],
          onData(g) {
            var j;
            if (!b)
              return;
            const v = g.result;
            try {
              const { eventName: E, args: P } = (0, Vh.decodeEventLog)({
                abi: t,
                data: v.data,
                topics: v.topics,
                strict: u
              }), $ = (0, xu.formatLog)(v, {
                args: P,
                eventName: E
              });
              s([$]);
            } catch (E) {
              let P, $;
              if (E instanceof qu.DecodeLogDataMismatch || E instanceof qu.DecodeLogTopicsMismatch) {
                if (u)
                  return;
                P = E.abiItem.name, $ = (j = E.abiItem.inputs) == null ? void 0 : j.some((L) => !("name" in L && L.name));
              }
              const k = (0, xu.formatLog)(v, {
                args: $ ? [] : {},
                eventName: P
              });
              s([k]);
            }
          },
          onError(g) {
            i == null || i(g);
          }
        });
        y = p, b || y();
      } catch (h) {
        i == null || i(h);
      }
    })(), y;
  })();
}
ya.watchContractEvent = ep;
var _a = {}, Yr = {}, Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.assertCurrentChain = void 0;
const zu = ve;
function tp({ chain: e, currentChainId: t }) {
  if (!e)
    throw new zu.ChainNotFoundError();
  if (t !== e.id)
    throw new zu.ChainMismatchError({ chain: e, currentChainId: t });
}
Ar.assertCurrentChain = tp;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
ha.getTransactionError = void 0;
const rp = V, np = q, ap = $t;
function op(e, { docsPath: t, ...r }) {
  const n = (() => {
    const a = (0, ap.getNodeError)(e, r);
    return a instanceof rp.UnknownNodeError ? e : a;
  })();
  return new np.TransactionExecutionError(n, {
    docsPath: t,
    ...r
  });
}
ha.getTransactionError = op;
var wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.getChainId = void 0;
const ip = ue();
async function sp(e) {
  const t = await e.request({
    method: "eth_chainId"
  });
  return (0, ip.hexToNumber)(t);
}
wr.getChainId = sp;
var en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
en.sendRawTransaction = void 0;
async function cp(e, { serializedTransaction: t }) {
  return e.request({
    method: "eth_sendRawTransaction",
    params: [t]
  });
}
en.sendRawTransaction = cp;
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.sendTransaction = void 0;
const up = Pe, dp = Ft, lp = Ar, fp = ha, bp = Vt, mp = Kt, Ja = X, gp = vt, Gu = wr, yp = la(), _p = en;
async function hp(e, t) {
  var y, h, p, g;
  const { account: r = e.account, chain: n = e.chain, accessList: a, data: o, gas: i, gasPrice: s, maxFeePerGas: c, maxPriorityFeePerGas: m, nonce: u, to: d, value: l, ...f } = t;
  if (!r)
    throw new dp.AccountNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  const b = (0, up.parseAccount)(r);
  try {
    (0, gp.assertRequest)(t);
    let v;
    if (n !== null && (v = await (0, Ja.getAction)(e, Gu.getChainId, "getChainId")({}), (0, lp.assertCurrentChain)({
      currentChainId: v,
      chain: n
    })), b.type === "local") {
      const $ = await (0, Ja.getAction)(e, yp.prepareTransactionRequest, "prepareTransactionRequest")({
        account: b,
        accessList: a,
        chain: n,
        data: o,
        gas: i,
        gasPrice: s,
        maxFeePerGas: c,
        maxPriorityFeePerGas: m,
        nonce: u,
        to: d,
        value: l,
        ...f
      });
      v || (v = await (0, Ja.getAction)(e, Gu.getChainId, "getChainId")({}));
      const k = (y = n == null ? void 0 : n.serializers) == null ? void 0 : y.transaction, L = await b.signTransaction({
        ...$,
        chainId: v
      }, { serializer: k });
      return await (0, Ja.getAction)(e, _p.sendRawTransaction, "sendRawTransaction")({
        serializedTransaction: L
      });
    }
    const j = (g = (p = (h = e.chain) == null ? void 0 : h.formatters) == null ? void 0 : p.transactionRequest) == null ? void 0 : g.format, P = (j || mp.formatTransactionRequest)({
      ...(0, bp.extract)(f, { format: j }),
      accessList: a,
      data: o,
      from: b.address,
      gas: i,
      gasPrice: s,
      maxFeePerGas: c,
      maxPriorityFeePerGas: m,
      nonce: u,
      to: d,
      value: l
    });
    return await e.request({
      method: "eth_sendTransaction",
      params: [P]
    });
  } catch (v) {
    throw (0, fp.getTransactionError)(v, {
      ...t,
      account: b,
      chain: t.chain || void 0
    });
  }
}
Yr.sendTransaction = hp;
Object.defineProperty(_a, "__esModule", { value: !0 });
_a.writeContract = void 0;
const pp = Ue, vp = X, Ep = Yr;
async function jp(e, { abi: t, address: r, args: n, dataSuffix: a, functionName: o, ...i }) {
  const s = (0, pp.encodeFunctionData)({
    abi: t,
    args: n,
    functionName: o
  });
  return await (0, vp.getAction)(e, Ep.sendTransaction, "sendTransaction")({
    data: `${s}${a ? a.replace("0x", "") : ""}`,
    to: r,
    ...i
  });
}
_a.writeContract = jp;
Object.defineProperty(Ut, "__esModule", { value: !0 });
Ut.getEventParameters = Ut.getFunctionParameters = Ut.getContract = void 0;
const ar = X, Pp = zr, Tp = oa, Ap = Zr, wp = tt, Op = ga, Ip = ya, $p = _a;
function Cp({ abi: e, address: t, publicClient: r, walletClient: n }) {
  const a = r != null, o = n != null, i = {};
  let s = !1, c = !1, m = !1;
  for (const u of e)
    if (u.type === "function" ? u.stateMutability === "view" || u.stateMutability === "pure" ? s = !0 : c = !0 : u.type === "event" && (m = !0), s && c && m)
      break;
  return a && (s && (i.read = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const { args: f, options: b } = zn(l);
        return (0, ar.getAction)(r, wp.readContract, "readContract")({
          abi: e,
          address: t,
          functionName: d,
          args: f,
          ...b
        });
      };
    }
  })), c && (i.simulate = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const { args: f, options: b } = zn(l);
        return (0, ar.getAction)(r, Op.simulateContract, "simulateContract")({
          abi: e,
          address: t,
          functionName: d,
          args: f,
          ...b
        });
      };
    }
  })), m && (i.createEventFilter = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const f = e.find((h) => h.type === "event" && h.name === d), { args: b, options: y } = to(l, f);
        return (0, ar.getAction)(r, Pp.createContractEventFilter, "createContractEventFilter")({
          abi: e,
          address: t,
          eventName: d,
          args: b,
          ...y
        });
      };
    }
  }), i.getEvents = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const f = e.find((h) => h.type === "event" && h.name === d), { args: b, options: y } = to(l, f);
        return (0, ar.getAction)(r, Ap.getContractEvents, "getContractEvents")({
          abi: e,
          address: t,
          eventName: d,
          args: b,
          ...y
        });
      };
    }
  }), i.watchEvent = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const f = e.find((h) => h.type === "event" && h.name === d), { args: b, options: y } = to(l, f);
        return (0, ar.getAction)(r, Ip.watchContractEvent, "watchContractEvent")({
          abi: e,
          address: t,
          eventName: d,
          args: b,
          ...y
        });
      };
    }
  }))), o && c && (i.write = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const { args: f, options: b } = zn(l);
        return (0, ar.getAction)(n, $p.writeContract, "writeContract")({
          abi: e,
          address: t,
          functionName: d,
          args: f,
          ...b
        });
      };
    }
  })), (a || o) && c && (i.estimateGas = new Proxy({}, {
    get(u, d) {
      return (...l) => {
        const { args: f, options: b } = zn(l), y = r ?? n;
        return (0, ar.getAction)(y, Tp.estimateContractGas, "estimateContractGas")({
          abi: e,
          address: t,
          functionName: d,
          args: f,
          ...b,
          account: b.account ?? n.account
        });
      };
    }
  })), i.address = t, i.abi = e, i;
}
Ut.getContract = Cp;
function zn(e) {
  const t = e.length && Array.isArray(e[0]), r = t ? e[0] : [], n = (t ? e[1] : e[0]) ?? {};
  return { args: r, options: n };
}
Ut.getFunctionParameters = zn;
function to(e, t) {
  let r = !1;
  Array.isArray(e[0]) ? r = !0 : e.length === 1 ? r = t.inputs.some((o) => o.indexed) : e.length === 2 && (r = !0);
  const n = r ? e[0] : void 0, a = (r ? e[1] : e[0]) ?? {};
  return { args: n, options: a };
}
Ut.getEventParameters = to;
var Or = {}, rf = {}, tn = {};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.publicKeyToAddress = void 0;
const Sp = Be, Rp = Ie;
function Bp(e) {
  const t = (0, Rp.keccak256)(`0x${e.substring(4)}`).substring(26);
  return (0, Sp.checksumAddress)(`0x${t}`);
}
tn.publicKeyToAddress = Bp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.publicKeyToAddress = e.parseAccount = void 0;
  var t = Pe;
  Object.defineProperty(e, "parseAccount", { enumerable: !0, get: function() {
    return t.parseAccount;
  } });
  var r = tn;
  Object.defineProperty(e, "publicKeyToAddress", { enumerable: !0, get: function() {
    return r.publicKeyToAddress;
  } });
})(rf);
var Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
Jo.uid = void 0;
const Oc = 256;
let Xa = Oc, Qa;
function Mp(e = 11) {
  if (!Qa || Xa + e > Oc * 2) {
    Qa = "", Xa = 0;
    for (let t = 0; t < Oc; t++)
      Qa += (256 + Math.random() * 256 | 0).toString(16).substring(1);
  }
  return Qa.substring(Xa, Xa++ + e);
}
Jo.uid = Mp;
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.createClient = void 0;
const Fp = rf, Np = Jo;
function kp(e) {
  const { batch: t, cacheTime: r = e.pollingInterval ?? 4e3, key: n = "base", name: a = "Base Client", pollingInterval: o = 4e3, type: i = "base" } = e, s = e.chain, c = e.account ? (0, Fp.parseAccount)(e.account) : void 0, { config: m, request: u, value: d } = e.transport({
    chain: s,
    pollingInterval: o
  }), l = { ...m, ...d }, f = {
    account: c,
    batch: t,
    cacheTime: r,
    chain: s,
    key: n,
    name: a,
    pollingInterval: o,
    request: u,
    transport: l,
    type: i,
    uid: (0, Np.uid)()
  };
  function b(y) {
    return (h) => {
      const p = h(y);
      for (const v in f)
        delete p[v];
      const g = { ...y, ...p };
      return Object.assign(g, { extend: b(g) });
    };
  }
  return Object.assign(f, { extend: b(f) });
}
Or.createClient = kp;
var Xo = {}, Qt = {}, Qo = {}, pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
pa.withRetry = void 0;
const Dp = Qr;
function Hp(e, { delay: t = 100, retryCount: r = 2, shouldRetry: n = () => !0 } = {}) {
  return new Promise((a, o) => {
    const i = async ({ count: s = 0 } = {}) => {
      const c = async ({ error: m }) => {
        const u = typeof t == "function" ? t({ count: s, error: m }) : t;
        u && await (0, Dp.wait)(u), i({ count: s + 1 });
      };
      try {
        const m = await e();
        a(m);
      } catch (m) {
        if (s < r && await n({ count: s, error: m }))
          return c({ error: m });
        o(m);
      }
    };
    i();
  });
}
pa.withRetry = Hp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.buildRequest = e.isDeterministicError = void 0;
  const t = G, r = ye, n = F, a = pa, o = (s) => "code" in s ? s.code !== -1 && s.code !== -32004 && s.code !== -32005 && s.code !== -32042 && s.code !== -32603 : s instanceof r.HttpRequestError && s.status ? s.status !== 403 && s.status !== 408 && s.status !== 413 && s.status !== 429 && s.status !== 500 && s.status !== 502 && s.status !== 503 && s.status !== 504 : !1;
  e.isDeterministicError = o;
  function i(s, { retryDelay: c = 150, retryCount: m = 3 } = {}) {
    return async (u) => (0, a.withRetry)(async () => {
      try {
        return await s(u);
      } catch (d) {
        const l = d;
        switch (l.code) {
          case n.ParseRpcError.code:
            throw new n.ParseRpcError(l);
          case n.InvalidRequestRpcError.code:
            throw new n.InvalidRequestRpcError(l);
          case n.MethodNotFoundRpcError.code:
            throw new n.MethodNotFoundRpcError(l);
          case n.InvalidParamsRpcError.code:
            throw new n.InvalidParamsRpcError(l);
          case n.InternalRpcError.code:
            throw new n.InternalRpcError(l);
          case n.InvalidInputRpcError.code:
            throw new n.InvalidInputRpcError(l);
          case n.ResourceNotFoundRpcError.code:
            throw new n.ResourceNotFoundRpcError(l);
          case n.ResourceUnavailableRpcError.code:
            throw new n.ResourceUnavailableRpcError(l);
          case n.TransactionRejectedRpcError.code:
            throw new n.TransactionRejectedRpcError(l);
          case n.MethodNotSupportedRpcError.code:
            throw new n.MethodNotSupportedRpcError(l);
          case n.LimitExceededRpcError.code:
            throw new n.LimitExceededRpcError(l);
          case n.JsonRpcVersionUnsupportedError.code:
            throw new n.JsonRpcVersionUnsupportedError(l);
          case n.UserRejectedRequestError.code:
            throw new n.UserRejectedRequestError(l);
          case n.UnauthorizedProviderError.code:
            throw new n.UnauthorizedProviderError(l);
          case n.UnsupportedProviderMethodError.code:
            throw new n.UnsupportedProviderMethodError(l);
          case n.ProviderDisconnectedError.code:
            throw new n.ProviderDisconnectedError(l);
          case n.ChainDisconnectedError.code:
            throw new n.ChainDisconnectedError(l);
          case n.SwitchChainError.code:
            throw new n.SwitchChainError(l);
          case 5e3:
            throw new n.UserRejectedRequestError(l);
          default:
            throw d instanceof t.BaseError ? d : new n.UnknownRpcError(l);
        }
      }
    }, {
      delay: ({ count: d, error: l }) => {
        var f;
        if (l && l instanceof r.HttpRequestError) {
          const b = (f = l == null ? void 0 : l.headers) == null ? void 0 : f.get("Retry-After");
          if (b != null && b.match(/\d/))
            return parseInt(b) * 1e3;
        }
        return ~~(1 << d) * c;
      },
      retryCount: m,
      shouldRetry: ({ error: d }) => !(0, e.isDeterministicError)(d)
    });
  }
  e.buildRequest = i;
})(Qo);
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.createTransport = void 0;
const Up = Qo;
function Lp({ key: e, name: t, request: r, retryCount: n = 3, retryDelay: a = 150, timeout: o, type: i }, s) {
  return {
    config: { key: e, name: t, request: r, retryCount: n, retryDelay: a, timeout: o, type: i },
    request: (0, Up.buildRequest)(r, { retryCount: n, retryDelay: a }),
    value: s
  };
}
Qt.createTransport = Lp;
Object.defineProperty(Xo, "__esModule", { value: !0 });
Xo.custom = void 0;
const qp = Qt;
function xp(e, t = {}) {
  const { key: r = "custom", name: n = "Custom Provider", retryDelay: a } = t;
  return ({ retryCount: o }) => (0, qp.createTransport)({
    key: r,
    name: n,
    request: e.request.bind(e),
    retryCount: t.retryCount ?? o,
    retryDelay: a,
    type: "custom"
  });
}
Xo.custom = xp;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.rankTransports = Dr.fallback = void 0;
const zp = Qo, Gp = Qr, Wp = Qt;
function Vp(e, t = {}) {
  const { key: r = "fallback", name: n = "Fallback", rank: a = !1, retryCount: o, retryDelay: i } = t;
  return ({ chain: s, pollingInterval: c = 4e3, timeout: m }) => {
    let u = e, d = () => {
    };
    const l = (0, Wp.createTransport)({
      key: r,
      name: n,
      async request({ method: f, params: b }) {
        const y = async (h = 0) => {
          const p = u[h]({ chain: s, retryCount: 0, timeout: m });
          try {
            const g = await p.request({
              method: f,
              params: b
            });
            return d({
              method: f,
              params: b,
              response: g,
              transport: p,
              status: "success"
            }), g;
          } catch (g) {
            if (d({
              error: g,
              method: f,
              params: b,
              transport: p,
              status: "error"
            }), (0, zp.isDeterministicError)(g) || h === u.length - 1)
              throw g;
            return y(h + 1);
          }
        };
        return y();
      },
      retryCount: o,
      retryDelay: i,
      type: "fallback"
    }, {
      onResponse: (f) => d = f,
      transports: u.map((f) => f({ chain: s, retryCount: 0 }))
    });
    if (a) {
      const f = typeof a == "object" ? a : {};
      nf({
        chain: s,
        interval: f.interval ?? c,
        onTransports: (b) => u = b,
        sampleCount: f.sampleCount,
        timeout: f.timeout,
        transports: u,
        weights: f.weights
      });
    }
    return l;
  };
}
Dr.fallback = Vp;
function nf({ chain: e, interval: t = 4e3, onTransports: r, sampleCount: n = 10, timeout: a = 1e3, transports: o, weights: i = {} }) {
  const { stability: s = 0.7, latency: c = 0.3 } = i, m = [], u = async () => {
    const d = await Promise.all(o.map(async (b) => {
      const y = b({ chain: e, retryCount: 0, timeout: a }), h = Date.now();
      let p, g;
      try {
        await y.request({ method: "net_listening" }), g = 1;
      } catch {
        g = 0;
      } finally {
        p = Date.now();
      }
      return { latency: p - h, success: g };
    }));
    m.push(d), m.length > n && m.shift();
    const l = Math.max(...m.map((b) => Math.max(...b.map(({ latency: y }) => y)))), f = o.map((b, y) => {
      const h = m.map((E) => E[y].latency), g = 1 - h.reduce((E, P) => E + P, 0) / h.length / l, v = m.map((E) => E[y].success), j = v.reduce((E, P) => E + P, 0) / v.length;
      return j === 0 ? [0, y] : [
        c * g + s * j,
        y
      ];
    }).sort((b, y) => y[0] - b[0]);
    r(f.map(([, b]) => o[b])), await (0, Gp.wait)(t), u();
  };
  u();
}
Dr.rankTransports = nf;
var Yo = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.UrlRequiredError = void 0;
const Kp = G;
class Zp extends Kp.BaseError {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro"
    });
  }
}
rn.UrlRequiredError = Zp;
var ei = {};
function Jp() {
  if (typeof WebSocket < "u")
    return WebSocket;
  if (typeof eu.WebSocket < "u")
    return eu.WebSocket;
  if (typeof window.WebSocket < "u")
    return window.WebSocket;
  if (typeof self.WebSocket < "u")
    return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}
const Xp = Jp(), Qp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WebSocket: Xp
}, Symbol.toStringTag, { value: "Module" })), Yp = /* @__PURE__ */ qr(Qp);
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.withTimeout = void 0;
function ev(e, { errorInstance: t = new Error("timed out"), timeout: r, signal: n }) {
  return new Promise((a, o) => {
    (async () => {
      let i;
      try {
        const s = new AbortController();
        r > 0 && (i = setTimeout(() => {
          n ? s.abort() : o(t);
        }, r)), a(await e({ signal: s == null ? void 0 : s.signal }));
      } catch (s) {
        s.name === "AbortError" && o(t), o(s);
      } finally {
        clearTimeout(i);
      }
    })();
  });
}
ti.withTimeout = ev;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.rpc = e.getSocket = e.socketsCache = void 0;
  const t = Yp, r = ye, n = Xr, a = ti, o = _e;
  let i = 0;
  async function s(d, { body: l, fetchOptions: f = {}, timeout: b = 1e4 }) {
    var g;
    const { headers: y, method: h, signal: p } = f;
    try {
      const v = await (0, a.withTimeout)(async ({ signal: E }) => await fetch(d, {
        ...f,
        body: Array.isArray(l) ? (0, o.stringify)(l.map(($) => ({
          jsonrpc: "2.0",
          id: $.id ?? i++,
          ...$
        }))) : (0, o.stringify)({ jsonrpc: "2.0", id: l.id ?? i++, ...l }),
        headers: {
          ...y,
          "Content-Type": "application/json"
        },
        method: h || "POST",
        signal: p || (b > 0 ? E : void 0)
      }), {
        errorInstance: new r.TimeoutError({ body: l, url: d }),
        timeout: b,
        signal: !0
      });
      let j;
      if ((g = v.headers.get("Content-Type")) != null && g.startsWith("application/json") ? j = await v.json() : j = await v.text(), !v.ok)
        throw new r.HttpRequestError({
          body: l,
          details: (0, o.stringify)(j.error) || v.statusText,
          headers: v.headers,
          status: v.status,
          url: d
        });
      return j;
    } catch (v) {
      throw v instanceof r.HttpRequestError || v instanceof r.TimeoutError ? v : new r.HttpRequestError({
        body: l,
        details: v.message,
        url: d
      });
    }
  }
  e.socketsCache = /* @__PURE__ */ new Map();
  async function c(d) {
    let l = e.socketsCache.get(d);
    if (l)
      return l;
    const { schedule: f } = (0, n.createBatchScheduler)({
      id: d,
      fn: async () => {
        const h = new t.WebSocket(d), p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), v = ({ data: E }) => {
          const P = JSON.parse(E), $ = P.method === "eth_subscription", k = $ ? P.params.subscription : P.id, L = $ ? g : p, N = L.get(k);
          N && N({ data: E }), $ || L.delete(k);
        }, j = () => {
          e.socketsCache.delete(d), h.removeEventListener("close", j), h.removeEventListener("message", v);
        };
        return h.addEventListener("close", j), h.addEventListener("message", v), h.readyState === t.WebSocket.CONNECTING && await new Promise((E, P) => {
          h && (h.onopen = E, h.onerror = P);
        }), l = Object.assign(h, {
          requests: p,
          subscriptions: g
        }), e.socketsCache.set(d, l), [l];
      }
    }), [b, [y]] = await f();
    return y;
  }
  e.getSocket = c;
  function m(d, { body: l, onResponse: f }) {
    if (d.readyState === d.CLOSED || d.readyState === d.CLOSING)
      throw new r.WebSocketRequestError({
        body: l,
        url: d.url,
        details: "Socket is closed."
      });
    const b = i++, y = ({ data: h }) => {
      var g;
      const p = JSON.parse(h);
      typeof p.id == "number" && b !== p.id || (f == null || f(p), l.method === "eth_subscribe" && typeof p.result == "string" && d.subscriptions.set(p.result, y), l.method === "eth_unsubscribe" && d.subscriptions.delete((g = l.params) == null ? void 0 : g[0]));
    };
    return d.requests.set(b, y), d.send(JSON.stringify({ jsonrpc: "2.0", ...l, id: b })), d;
  }
  async function u(d, { body: l, timeout: f = 1e4 }) {
    return (0, a.withTimeout)(() => new Promise((b) => e.rpc.webSocket(d, {
      body: l,
      onResponse: b
    })), {
      errorInstance: new r.TimeoutError({ body: l, url: d.url }),
      timeout: f
    });
  }
  e.rpc = {
    http: s,
    webSocket: m,
    webSocketAsync: u
  };
})(ei);
Object.defineProperty(Yo, "__esModule", { value: !0 });
Yo.http = void 0;
const tv = ye, rv = rn, nv = Xr, Wu = ei, av = Qt;
function ov(e, t = {}) {
  const { batch: r, fetchOptions: n, key: a = "http", name: o = "HTTP JSON-RPC", retryDelay: i } = t;
  return ({ chain: s, retryCount: c, timeout: m }) => {
    const { batchSize: u = 1e3, wait: d = 0 } = typeof r == "object" ? r : {}, l = t.retryCount ?? c, f = m ?? t.timeout ?? 1e4, b = e || (s == null ? void 0 : s.rpcUrls.default.http[0]);
    if (!b)
      throw new rv.UrlRequiredError();
    return (0, av.createTransport)({
      key: a,
      name: o,
      async request({ method: y, params: h }) {
        const p = { method: y, params: h }, { schedule: g } = (0, nv.createBatchScheduler)({
          id: `${e}`,
          wait: d,
          shouldSplitBatch(P) {
            return P.length > u;
          },
          fn: (P) => Wu.rpc.http(b, {
            body: P,
            fetchOptions: n,
            timeout: f
          }),
          sort: (P, $) => P.id - $.id
        }), v = async (P) => r ? g(P) : [await Wu.rpc.http(b, { body: P, fetchOptions: n, timeout: f })], [{ error: j, result: E }] = await v(p);
        if (j)
          throw new tv.RpcRequestError({
            body: p,
            error: j,
            url: b
          });
        return E;
      },
      retryCount: l,
      retryDelay: i,
      timeout: f,
      type: "http"
    }, {
      fetchOptions: n,
      url: e
    });
  };
}
Yo.http = ov;
var Cn = {}, Sn = {}, ri = {}, nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.isNullUniversalResolverError = void 0;
const iv = ft, sv = G, Vu = be;
function cv(e, t) {
  var n, a, o;
  if (!(e instanceof sv.BaseError))
    return !1;
  const r = e.walk((i) => i instanceof Vu.ContractFunctionRevertedError);
  return r instanceof Vu.ContractFunctionRevertedError ? !!(((n = r.data) == null ? void 0 : n.errorName) === "ResolverNotFound" || ((a = r.data) == null ? void 0 : a.errorName) === "ResolverWildcardNotSupported" || (o = r.reason) != null && o.includes("Wildcard on non-extended resolvers is not supported") || t === "reverse" && r.reason === iv.panicReasons[50]) : !1;
}
nn.isNullUniversalResolverError = cv;
var an = {}, va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
va.encodedLabelToLabelhash = void 0;
const uv = ce;
function dv(e) {
  if (e.length !== 66 || e.indexOf("[") !== 0 || e.indexOf("]") !== 65)
    return null;
  const t = `0x${e.slice(1, 65)}`;
  return (0, uv.isHex)(t) ? t : null;
}
va.encodedLabelToLabelhash = dv;
Object.defineProperty(an, "__esModule", { value: !0 });
an.namehash = void 0;
const lv = oe, Ku = de(), Zu = M(), Ju = Ie, fv = va;
function bv(e) {
  let t = new Uint8Array(32).fill(0);
  if (!e)
    return (0, Zu.bytesToHex)(t);
  const r = e.split(".");
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const a = (0, fv.encodedLabelToLabelhash)(r[n]), o = a ? (0, Ku.toBytes)(a) : (0, Ju.keccak256)((0, Ku.stringToBytes)(r[n]), "bytes");
    t = (0, Ju.keccak256)((0, lv.concat)([t, o]), "bytes");
  }
  return (0, Zu.bytesToHex)(t);
}
an.namehash = bv;
var Ir = {}, ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.encodeLabelhash = void 0;
function mv(e) {
  return `[${e.slice(2)}]`;
}
ni.encodeLabelhash = mv;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
Ea.labelhash = void 0;
const gv = de(), yv = M(), _v = Ie, hv = va;
function pv(e) {
  const t = new Uint8Array(32).fill(0);
  return e ? (0, hv.encodedLabelToLabelhash)(e) || (0, _v.keccak256)((0, gv.stringToBytes)(e)) : (0, yv.bytesToHex)(t);
}
Ea.labelhash = pv;
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.packetToBytes = void 0;
const rc = de(), vv = ni, Ev = Ea;
function jv(e) {
  const t = e.replace(/^\.|\.$/gm, "");
  if (t.length === 0)
    return new Uint8Array(1);
  const r = new Uint8Array((0, rc.stringToBytes)(t).byteLength + 2);
  let n = 0;
  const a = t.split(".");
  for (let o = 0; o < a.length; o++) {
    let i = (0, rc.stringToBytes)(a[o]);
    i.byteLength > 255 && (i = (0, rc.stringToBytes)((0, vv.encodeLabelhash)((0, Ev.labelhash)(a[o])))), r[n] = i.length, r.set(i, n + 1), n += i.length + 1;
  }
  return r.byteLength !== n + 1 ? r.slice(0, n + 1) : r;
}
Ir.packetToBytes = jv;
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.getEnsAddress = void 0;
const nc = re, Pv = rt, Tv = Ue, Av = nt, wv = et, Ov = M(), Iv = nn, ac = an, $v = Ir, Cv = X, Sv = tt;
async function Rv(e, { blockNumber: t, blockTag: r, coinType: n, name: a, universalResolverAddress: o }) {
  let i = o;
  if (!i) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    i = (0, Av.getChainContractAddress)({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const s = (0, Tv.encodeFunctionData)({
      abi: nc.addressResolverAbi,
      functionName: "addr",
      ...n != null ? { args: [(0, ac.namehash)(a), BigInt(n)] } : { args: [(0, ac.namehash)(a)] }
    }), c = await (0, Cv.getAction)(e, Sv.readContract, "readContract")({
      address: i,
      abi: nc.universalResolverResolveAbi,
      functionName: "resolve",
      args: [(0, Ov.toHex)((0, $v.packetToBytes)(a)), s],
      blockNumber: t,
      blockTag: r
    });
    if (c[0] === "0x")
      return null;
    const m = (0, Pv.decodeFunctionResult)({
      abi: nc.addressResolverAbi,
      args: n != null ? [(0, ac.namehash)(a), BigInt(n)] : void 0,
      functionName: "addr",
      data: c[0]
    });
    return m === "0x" || (0, wv.trim)(m) === "0x00" ? null : m;
  } catch (s) {
    if ((0, Iv.isNullUniversalResolverError)(s, "resolve"))
      return null;
    throw s;
  }
}
ri.getEnsAddress = Rv;
var ai = {}, oi = {}, le = {}, Je = {};
Object.defineProperty(Je, "__esModule", { value: !0 });
Je.EnsAvatarUnsupportedNamespaceError = Je.EnsAvatarUriResolutionError = Je.EnsAvatarInvalidNftUriError = Je.EnsAvatarInvalidMetadataError = void 0;
const ii = G;
class Bv extends ii.BaseError {
  constructor({ data: t }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(t)}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarInvalidMetadataError"
    });
  }
}
Je.EnsAvatarInvalidMetadataError = Bv;
class Mv extends ii.BaseError {
  constructor({ reason: t }) {
    super(`ENS NFT avatar URI is invalid. ${t}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarInvalidNftUriError"
    });
  }
}
Je.EnsAvatarInvalidNftUriError = Mv;
class Fv extends ii.BaseError {
  constructor({ uri: t }) {
    super(`Unable to resolve ENS avatar URI "${t}". The URI may be malformed, invalid, or does not respond with a valid image.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarUriResolutionError"
    });
  }
}
Je.EnsAvatarUriResolutionError = Fv;
class Nv extends ii.BaseError {
  constructor({ namespace: t }) {
    super(`ENS NFT avatar namespace "${t}" is not supported. Must be "erc721" or "erc1155".`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarUnsupportedNamespaceError"
    });
  }
}
Je.EnsAvatarUnsupportedNamespaceError = Nv;
Object.defineProperty(le, "__esModule", { value: !0 });
le.getNftTokenUri = le.parseNftUri = le.parseAvatarUri = le.getMetadataAvatarUri = le.getJsonImage = le.resolveAvatarUri = le.getGateway = le.isImageUri = void 0;
const Xu = tt, it = Je, kv = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/, Dv = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/, Hv = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/, Uv = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function af(e) {
  try {
    const t = await fetch(e, { method: "HEAD" });
    if (t.status === 200) {
      const r = t.headers.get("content-type");
      return r == null ? void 0 : r.startsWith("image/");
    }
    return !1;
  } catch (t) {
    return typeof t == "object" && typeof t.response < "u" || !globalThis.hasOwnProperty("Image") ? !1 : new Promise((r) => {
      const n = new Image();
      n.onload = () => {
        r(!0);
      }, n.onerror = () => {
        r(!1);
      }, n.src = e;
    });
  }
}
le.isImageUri = af;
function Ic(e, t) {
  return e ? e.endsWith("/") ? e.slice(0, -1) : e : t;
}
le.getGateway = Ic;
function of({ uri: e, gatewayUrls: t }) {
  const r = Hv.test(e);
  if (r)
    return { uri: e, isOnChain: !0, isEncoded: r };
  const n = Ic(t == null ? void 0 : t.ipfs, "https://ipfs.io"), a = Ic(t == null ? void 0 : t.arweave, "https://arweave.net"), o = e.match(kv), { protocol: i, subpath: s, target: c, subtarget: m = "" } = (o == null ? void 0 : o.groups) || {}, u = i === "ipns:/" || s === "ipns/", d = i === "ipfs:/" || s === "ipfs/" || Dv.test(e);
  if (e.startsWith("http") && !u && !d) {
    let f = e;
    return t != null && t.arweave && (f = e.replace(/https:\/\/arweave.net/g, t == null ? void 0 : t.arweave)), { uri: f, isOnChain: !1, isEncoded: !1 };
  }
  if ((u || d) && c)
    return {
      uri: `${n}/${u ? "ipns" : "ipfs"}/${c}${m}`,
      isOnChain: !1,
      isEncoded: !1
    };
  if (i === "ar:/" && c)
    return {
      uri: `${a}/${c}${m || ""}`,
      isOnChain: !1,
      isEncoded: !1
    };
  let l = e.replace(Uv, "");
  if (l.startsWith("<svg") && (l = `data:image/svg+xml;base64,${btoa(l)}`), l.startsWith("data:") || l.startsWith("{"))
    return {
      uri: l,
      isOnChain: !0,
      isEncoded: !1
    };
  throw new it.EnsAvatarUriResolutionError({ uri: e });
}
le.resolveAvatarUri = of;
function sf(e) {
  if (typeof e != "object" || !("image" in e) && !("image_url" in e) && !("image_data" in e))
    throw new it.EnsAvatarInvalidMetadataError({ data: e });
  return e.image || e.image_url || e.image_data;
}
le.getJsonImage = sf;
async function Lv({ gatewayUrls: e, uri: t }) {
  try {
    const r = await fetch(t).then((a) => a.json());
    return await cf({
      gatewayUrls: e,
      uri: sf(r)
    });
  } catch {
    throw new it.EnsAvatarUriResolutionError({ uri: t });
  }
}
le.getMetadataAvatarUri = Lv;
async function cf({ gatewayUrls: e, uri: t }) {
  const { uri: r, isOnChain: n } = of({ uri: t, gatewayUrls: e });
  if (n || await af(r))
    return r;
  throw new it.EnsAvatarUriResolutionError({ uri: t });
}
le.parseAvatarUri = cf;
function qv(e) {
  let t = e;
  t.startsWith("did:nft:") && (t = t.replace("did:nft:", "").replace(/_/g, "/"));
  const [r, n, a] = t.split("/"), [o, i] = r.split(":"), [s, c] = n.split(":");
  if (!o || o.toLowerCase() !== "eip155")
    throw new it.EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!i)
    throw new it.EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!c)
    throw new it.EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!a)
    throw new it.EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!s)
    throw new it.EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: parseInt(i),
    namespace: s.toLowerCase(),
    contractAddress: c,
    tokenID: a
  };
}
le.parseNftUri = qv;
async function xv(e, { nft: t }) {
  if (t.namespace === "erc721")
    return (0, Xu.readContract)(e, {
      address: t.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(t.tokenID)]
    });
  if (t.namespace === "erc1155")
    return (0, Xu.readContract)(e, {
      address: t.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(t.tokenID)]
    });
  throw new it.EnsAvatarUnsupportedNamespaceError({ namespace: t.namespace });
}
le.getNftTokenUri = xv;
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.parseAvatarRecord = void 0;
const ir = le;
async function zv(e, { gatewayUrls: t, record: r }) {
  return /eip155:/i.test(r) ? Gv(e, { gatewayUrls: t, record: r }) : (0, ir.parseAvatarUri)({ uri: r, gatewayUrls: t });
}
oi.parseAvatarRecord = zv;
async function Gv(e, { gatewayUrls: t, record: r }) {
  const n = (0, ir.parseNftUri)(r), a = await (0, ir.getNftTokenUri)(e, { nft: n }), { uri: o, isOnChain: i, isEncoded: s } = (0, ir.resolveAvatarUri)({ uri: a, gatewayUrls: t });
  if (i && (o.includes("data:application/json;base64,") || o.startsWith("{"))) {
    const m = s ? atob(o.replace("data:application/json;base64,", "")) : o, u = JSON.parse(m);
    return (0, ir.parseAvatarUri)({ uri: (0, ir.getJsonImage)(u), gatewayUrls: t });
  }
  let c = n.tokenID;
  return n.namespace === "erc1155" && (c = c.replace("0x", "").padStart(64, "0")), (0, ir.getMetadataAvatarUri)({
    gatewayUrls: t,
    uri: o.replace(/(?:0x)?{id}/, c)
  });
}
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
ja.getEnsText = void 0;
const oc = re, Wv = rt, Vv = Ue, Kv = nt, Zv = M(), Jv = nn, Xv = an, Qv = Ir, Yv = X, e1 = tt;
async function t1(e, { blockNumber: t, blockTag: r, name: n, key: a, universalResolverAddress: o }) {
  let i = o;
  if (!i) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    i = (0, Kv.getChainContractAddress)({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const s = await (0, Yv.getAction)(e, e1.readContract, "readContract")({
      address: i,
      abi: oc.universalResolverResolveAbi,
      functionName: "resolve",
      args: [
        (0, Zv.toHex)((0, Qv.packetToBytes)(n)),
        (0, Vv.encodeFunctionData)({
          abi: oc.textResolverAbi,
          functionName: "text",
          args: [(0, Xv.namehash)(n), a]
        })
      ],
      blockNumber: t,
      blockTag: r
    });
    if (s[0] === "0x")
      return null;
    const c = (0, Wv.decodeFunctionResult)({
      abi: oc.textResolverAbi,
      functionName: "text",
      data: s[0]
    });
    return c === "" ? null : c;
  } catch (s) {
    if ((0, Jv.isNullUniversalResolverError)(s, "resolve"))
      return null;
    throw s;
  }
}
ja.getEnsText = t1;
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.getEnsAvatar = void 0;
const r1 = oi, n1 = X, a1 = ja;
async function o1(e, { blockNumber: t, blockTag: r, gatewayUrls: n, name: a, universalResolverAddress: o }) {
  const i = await (0, n1.getAction)(e, a1.getEnsText, "getEnsText")({
    blockNumber: t,
    blockTag: r,
    key: "avatar",
    name: a,
    universalResolverAddress: o
  });
  if (!i)
    return null;
  try {
    return await (0, r1.parseAvatarRecord)(e, { record: i, gatewayUrls: n });
  } catch {
    return null;
  }
}
ai.getEnsAvatar = o1;
var si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.getEnsName = void 0;
const i1 = re, s1 = nt, c1 = M(), u1 = nn, d1 = Ir, l1 = X, f1 = tt;
async function b1(e, { address: t, blockNumber: r, blockTag: n, universalResolverAddress: a }) {
  let o = a;
  if (!o) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    o = (0, s1.getChainContractAddress)({
      blockNumber: r,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  const i = `${t.toLowerCase().substring(2)}.addr.reverse`;
  try {
    const [s, c] = await (0, l1.getAction)(e, f1.readContract, "readContract")({
      address: o,
      abi: i1.universalResolverReverseAbi,
      functionName: "reverse",
      args: [(0, c1.toHex)((0, d1.packetToBytes)(i))],
      blockNumber: r,
      blockTag: n
    });
    return t.toLowerCase() !== c.toLowerCase() ? null : s;
  } catch (s) {
    if ((0, u1.isNullUniversalResolverError)(s, "reverse"))
      return null;
    throw s;
  }
}
si.getEnsName = b1;
var ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.getEnsResolver = void 0;
const m1 = nt, g1 = M(), y1 = Ir, _1 = X, h1 = tt;
async function p1(e, { blockNumber: t, blockTag: r, name: n, universalResolverAddress: a }) {
  let o = a;
  if (!o) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    o = (0, m1.getChainContractAddress)({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  const [i] = await (0, _1.getAction)(e, h1.readContract, "readContract")({
    address: o,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [{ type: "address" }, { type: "bytes32" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [(0, g1.toHex)((0, y1.packetToBytes)(n))],
    blockNumber: t,
    blockTag: r
  });
  return i;
}
ci.getEnsResolver = p1;
var ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.createBlockFilter = void 0;
const v1 = _r;
async function E1(e) {
  const t = (0, v1.createFilterRequestScope)(e, {
    method: "eth_newBlockFilter"
  }), r = await e.request({
    method: "eth_newBlockFilter"
  });
  return { id: r, request: t(r), type: "block" };
}
ui.createBlockFilter = E1;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: !0 });
Pa.createEventFilter = void 0;
const j1 = Rt, Qu = M(), P1 = _r;
async function T1(e, { address: t, args: r, event: n, events: a, fromBlock: o, strict: i, toBlock: s } = {}) {
  const c = a ?? (n ? [n] : void 0), m = (0, P1.createFilterRequestScope)(e, {
    method: "eth_newFilter"
  });
  let u = [];
  c && (u = [
    c.flatMap((l) => (0, j1.encodeEventTopics)({
      abi: [l],
      eventName: l.name,
      args: r
    }))
  ], n && (u = u[0]));
  const d = await e.request({
    method: "eth_newFilter",
    params: [
      {
        address: t,
        fromBlock: typeof o == "bigint" ? (0, Qu.numberToHex)(o) : o,
        toBlock: typeof s == "bigint" ? (0, Qu.numberToHex)(s) : s,
        ...u.length ? { topics: u } : {}
      }
    ]
  });
  return {
    abi: c,
    args: r,
    eventName: n ? n.name : void 0,
    fromBlock: o,
    id: d,
    request: m(d),
    strict: i,
    toBlock: s,
    type: "event"
  };
}
Pa.createEventFilter = T1;
var Ta = {};
Object.defineProperty(Ta, "__esModule", { value: !0 });
Ta.createPendingTransactionFilter = void 0;
const A1 = _r;
async function w1(e) {
  const t = (0, A1.createFilterRequestScope)(e, {
    method: "eth_newPendingTransactionFilter"
  }), r = await e.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id: r, request: t(r), type: "transaction" };
}
Ta.createPendingTransactionFilter = w1;
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.getBalance = void 0;
const O1 = M();
async function I1(e, { address: t, blockNumber: r, blockTag: n = "latest" }) {
  const a = r ? (0, O1.numberToHex)(r) : void 0, o = await e.request({
    method: "eth_getBalance",
    params: [t, a || n]
  });
  return BigInt(o);
}
di.getBalance = I1;
var li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.getBlockTransactionCount = void 0;
const $1 = ue(), C1 = M();
async function S1(e, { blockHash: t, blockNumber: r, blockTag: n = "latest" } = {}) {
  const a = r !== void 0 ? (0, C1.numberToHex)(r) : void 0;
  let o;
  return t ? o = await e.request({
    method: "eth_getBlockTransactionCountByHash",
    params: [t]
  }) : o = await e.request({
    method: "eth_getBlockTransactionCountByNumber",
    params: [a || n]
  }), (0, $1.hexToNumber)(o);
}
li.getBlockTransactionCount = S1;
var fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.getBytecode = void 0;
const R1 = M();
async function B1(e, { address: t, blockNumber: r, blockTag: n = "latest" }) {
  const a = r !== void 0 ? (0, R1.numberToHex)(r) : void 0, o = await e.request({
    method: "eth_getCode",
    params: [t, a || n]
  });
  if (o !== "0x")
    return o;
}
fi.getBytecode = B1;
var bi = {}, mi = {};
Object.defineProperty(mi, "__esModule", { value: !0 });
mi.formatFeeHistory = void 0;
function M1(e) {
  var t;
  return {
    baseFeePerGas: e.baseFeePerGas.map((r) => BigInt(r)),
    gasUsedRatio: e.gasUsedRatio,
    oldestBlock: BigInt(e.oldestBlock),
    reward: (t = e.reward) == null ? void 0 : t.map((r) => r.map((n) => BigInt(n)))
  };
}
mi.formatFeeHistory = M1;
Object.defineProperty(bi, "__esModule", { value: !0 });
bi.getFeeHistory = void 0;
const Yu = M(), F1 = mi;
async function N1(e, { blockCount: t, blockNumber: r, blockTag: n = "latest", rewardPercentiles: a }) {
  const o = r ? (0, Yu.numberToHex)(r) : void 0, i = await e.request({
    method: "eth_feeHistory",
    params: [
      (0, Yu.numberToHex)(t),
      o || n,
      a
    ]
  });
  return (0, F1.formatFeeHistory)(i);
}
bi.getFeeHistory = N1;
var gi = {};
Object.defineProperty(gi, "__esModule", { value: !0 });
gi.getFilterLogs = void 0;
const ed = Y(), k1 = kt, td = Et;
async function D1(e, { filter: t }) {
  const r = t.strict ?? !1;
  return (await t.request({
    method: "eth_getFilterLogs",
    params: [t.id]
  })).map((a) => {
    var o;
    try {
      const { eventName: i, args: s } = "abi" in t && t.abi ? (0, k1.decodeEventLog)({
        abi: t.abi,
        data: a.data,
        topics: a.topics,
        strict: r
      }) : { eventName: void 0, args: void 0 };
      return (0, td.formatLog)(a, { args: s, eventName: i });
    } catch (i) {
      let s, c;
      if (i instanceof ed.DecodeLogDataMismatch || i instanceof ed.DecodeLogTopicsMismatch) {
        if ("strict" in t && t.strict)
          return;
        s = i.abiItem.name, c = (o = i.abiItem.inputs) == null ? void 0 : o.some((m) => !("name" in m && m.name));
      }
      return (0, td.formatLog)(a, { args: c ? [] : {}, eventName: s });
    }
  }).filter(Boolean);
}
gi.getFilterLogs = D1;
var Rn = {}, Bn = {}, ic = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
Aa.defineChain = void 0;
function H1(e, t = {}) {
  const { fees: r = e.fees, formatters: n = e.formatters, serializers: a = e.serializers } = t;
  return {
    ...e,
    fees: r,
    formatters: n,
    serializers: a
  };
}
Aa.defineChain = H1;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
wa.extractChain = void 0;
function U1({ chains: e, id: t }) {
  return e.find((r) => r.id === t);
}
wa.extractChain = U1;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.integerRegex = bt.bytesRegex = bt.arrayRegex = void 0;
bt.arrayRegex = /^(.*)\[([0-9]*)\]$/;
bt.bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
bt.integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var At = {}, or = {}, rd;
function Oa() {
  if (rd)
    return or;
  rd = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.hashDomain = or.hashTypedData = void 0;
  const e = Oe, t = oe, r = M(), n = Ie, a = yi();
  function o({ domain: f, message: b, primaryType: y, types: h }) {
    const p = typeof f > "u" ? {} : f, g = {
      EIP712Domain: (0, a.getTypesForEIP712Domain)({ domain: p }),
      ...h
    };
    (0, a.validateTypedData)({
      domain: p,
      message: b,
      primaryType: y,
      types: g
    });
    const v = ["0x1901"];
    return p && v.push(i({
      domain: p,
      types: g
    })), y !== "EIP712Domain" && v.push(s({
      data: b,
      primaryType: y,
      types: g
    })), (0, n.keccak256)((0, t.concat)(v));
  }
  or.hashTypedData = o;
  function i({ domain: f, types: b }) {
    return s({
      data: f,
      primaryType: "EIP712Domain",
      types: b
    });
  }
  or.hashDomain = i;
  function s({ data: f, primaryType: b, types: y }) {
    const h = c({
      data: f,
      primaryType: b,
      types: y
    });
    return (0, n.keccak256)(h);
  }
  function c({ data: f, primaryType: b, types: y }) {
    const h = [{ type: "bytes32" }], p = [m({ primaryType: b, types: y })];
    for (const g of y[b]) {
      const [v, j] = l({
        types: y,
        name: g.name,
        type: g.type,
        value: f[g.name]
      });
      h.push(v), p.push(j);
    }
    return (0, e.encodeAbiParameters)(h, p);
  }
  function m({ primaryType: f, types: b }) {
    const y = (0, r.toHex)(u({ primaryType: f, types: b }));
    return (0, n.keccak256)(y);
  }
  function u({ primaryType: f, types: b }) {
    let y = "";
    const h = d({ primaryType: f, types: b });
    h.delete(f);
    const p = [f, ...Array.from(h).sort()];
    for (const g of p)
      y += `${g}(${b[g].map(({ name: v, type: j }) => `${j} ${v}`).join(",")})`;
    return y;
  }
  function d({ primaryType: f, types: b }, y = /* @__PURE__ */ new Set()) {
    const h = f.match(/^\w*/u), p = h == null ? void 0 : h[0];
    if (y.has(p) || b[p] === void 0)
      return y;
    y.add(p);
    for (const g of b[p])
      d({ primaryType: g.type, types: b }, y);
    return y;
  }
  function l({ types: f, name: b, type: y, value: h }) {
    if (f[y] !== void 0)
      return [
        { type: "bytes32" },
        (0, n.keccak256)(c({ data: h, primaryType: y, types: f }))
      ];
    if (y === "bytes")
      return h = `0x${(h.length % 2 ? "0" : "") + h.slice(2)}`, [{ type: "bytes32" }, (0, n.keccak256)(h)];
    if (y === "string")
      return [{ type: "bytes32" }, (0, n.keccak256)((0, r.toHex)(h))];
    if (y.lastIndexOf("]") === y.length - 1) {
      const p = y.slice(0, y.lastIndexOf("[")), g = h.map((v) => l({
        name: b,
        type: p,
        types: f,
        value: v
      }));
      return [
        { type: "bytes32" },
        (0, n.keccak256)((0, e.encodeAbiParameters)(g.map(([v]) => v), g.map(([, v]) => v)))
      ];
    }
    return [{ type: y }, h];
  }
  return or;
}
var nd;
function yi() {
  if (nd)
    return At;
  nd = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.domainSeparator = At.getTypesForEIP712Domain = At.validateTypedData = void 0;
  const e = Y(), t = He, r = $e, n = We, a = M(), o = bt, i = Oa();
  function s({ domain: u, message: d, primaryType: l, types: f }) {
    const b = f, y = (h, p) => {
      for (const g of h) {
        const { name: v, type: j } = g, E = j, P = p[v], $ = E.match(o.integerRegex);
        if ($ && (typeof P == "number" || typeof P == "bigint")) {
          const [N, K, x] = $;
          (0, a.numberToHex)(P, {
            signed: K === "int",
            size: parseInt(x) / 8
          });
        }
        if (E === "address" && typeof P == "string" && !(0, r.isAddress)(P))
          throw new t.InvalidAddressError({ address: P });
        const k = E.match(o.bytesRegex);
        if (k) {
          const [N, K] = k;
          if (K && (0, n.size)(P) !== parseInt(K))
            throw new e.BytesSizeMismatchError({
              expectedSize: parseInt(K),
              givenSize: (0, n.size)(P)
            });
        }
        const L = b[E];
        L && y(L, P);
      }
    };
    if (b.EIP712Domain && u && y(b.EIP712Domain, u), l !== "EIP712Domain") {
      const h = b[l];
      y(h, d);
    }
  }
  At.validateTypedData = s;
  function c({ domain: u }) {
    return [
      typeof (u == null ? void 0 : u.name) == "string" && { name: "name", type: "string" },
      (u == null ? void 0 : u.version) && { name: "version", type: "string" },
      typeof (u == null ? void 0 : u.chainId) == "number" && {
        name: "chainId",
        type: "uint256"
      },
      (u == null ? void 0 : u.verifyingContract) && {
        name: "verifyingContract",
        type: "address"
      },
      (u == null ? void 0 : u.salt) && { name: "salt", type: "bytes32" }
    ].filter(Boolean);
  }
  At.getTypesForEIP712Domain = c;
  function m({ domain: u }) {
    return (0, i.hashDomain)({
      domain: u,
      types: {
        EIP712Domain: c({ domain: u })
      }
    });
  }
  return At.domainSeparator = m, At;
}
var Ia = {};
Object.defineProperty(Ia, "__esModule", { value: !0 });
Ia.decodeFunctionData = void 0;
const L1 = Y(), ad = Ee, q1 = yt, x1 = _t, z1 = Bt();
function G1({ abi: e, data: t }) {
  const r = (0, ad.slice)(t, 0, 4), n = e.find((a) => a.type === "function" && r === (0, q1.getFunctionSelector)((0, z1.formatAbiItem)(a)));
  if (!n)
    throw new L1.AbiFunctionSignatureNotFoundError(r, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: n.name,
    args: "inputs" in n && n.inputs && n.inputs.length > 0 ? (0, x1.decodeAbiParameters)(n.inputs, (0, ad.slice)(t, 4)) : void 0
  };
}
Ia.decodeFunctionData = G1;
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.encodeDeployData = void 0;
const sc = Y(), W1 = oe, V1 = Oe, cc = "/docs/contract/encodeDeployData";
function K1({ abi: e, args: t, bytecode: r }) {
  if (!t || t.length === 0)
    return r;
  const n = e.find((o) => "type" in o && o.type === "constructor");
  if (!n)
    throw new sc.AbiConstructorNotFoundError({ docsPath: cc });
  if (!("inputs" in n))
    throw new sc.AbiConstructorParamsNotFoundError({ docsPath: cc });
  if (!n.inputs || n.inputs.length === 0)
    throw new sc.AbiConstructorParamsNotFoundError({ docsPath: cc });
  const a = (0, V1.encodeAbiParameters)(n.inputs, t);
  return (0, W1.concatHex)([r, a]);
}
on.encodeDeployData = K1;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
$a.encodeErrorResult = void 0;
const uc = Y(), Z1 = oe, J1 = yt, X1 = Oe, Q1 = Bt(), Y1 = je, dc = "/docs/contract/encodeErrorResult";
function eE({ abi: e, errorName: t, args: r }) {
  let n = e[0];
  if (t && (n = (0, Y1.getAbiItem)({
    abi: e,
    args: r,
    name: t
  }), !n))
    throw new uc.AbiErrorNotFoundError(t, { docsPath: dc });
  if (n.type !== "error")
    throw new uc.AbiErrorNotFoundError(void 0, { docsPath: dc });
  const a = (0, Q1.formatAbiItem)(n), o = (0, J1.getFunctionSelector)(a);
  let i = "0x";
  if (r && r.length > 0) {
    if (!n.inputs)
      throw new uc.AbiErrorInputsNotFoundError(n.name, { docsPath: dc });
    i = (0, X1.encodeAbiParameters)(n.inputs, r);
  }
  return (0, Z1.concatHex)([o, i]);
}
$a.encodeErrorResult = eE;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
Ca.encodeFunctionResult = void 0;
const lc = Y(), tE = Oe, rE = je, nE = "/docs/contract/encodeFunctionResult";
function aE({ abi: e, functionName: t, result: r }) {
  let n = e[0];
  if (t && (n = (0, rE.getAbiItem)({
    abi: e,
    name: t
  }), !n))
    throw new lc.AbiFunctionNotFoundError(t, {
      docsPath: "/docs/contract/encodeFunctionResult"
    });
  if (n.type !== "function")
    throw new lc.AbiFunctionNotFoundError(void 0, {
      docsPath: "/docs/contract/encodeFunctionResult"
    });
  if (!n.outputs)
    throw new lc.AbiFunctionOutputsNotFoundError(n.name, { docsPath: nE });
  let a = Array.isArray(r) ? r : [r];
  return n.outputs.length === 0 && !a[0] && (a = []), (0, tE.encodeAbiParameters)(n.outputs, a);
}
Ca.encodeFunctionResult = aE;
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: !0 });
Sa.encodePacked = void 0;
const $c = Y(), oE = He, iE = $e, uf = oe, fc = we, bc = M(), mc = bt;
function sE(e, t) {
  if (e.length !== t.length)
    throw new $c.AbiEncodingLengthMismatchError({
      expectedLength: e.length,
      givenLength: t.length
    });
  const r = [];
  for (let n = 0; n < e.length; n++) {
    const a = e[n], o = t[n];
    r.push(df(a, o));
  }
  return (0, uf.concatHex)(r);
}
Sa.encodePacked = sE;
function df(e, t, r = !1) {
  if (e === "address") {
    const i = t;
    if (!(0, iE.isAddress)(i))
      throw new oE.InvalidAddressError({ address: i });
    return (0, fc.pad)(i.toLowerCase(), {
      size: r ? 32 : null
    });
  }
  if (e === "string")
    return (0, bc.stringToHex)(t);
  if (e === "bytes")
    return t;
  if (e === "bool")
    return (0, fc.pad)((0, bc.boolToHex)(t), { size: r ? 32 : 1 });
  const n = e.match(mc.integerRegex);
  if (n) {
    const [i, s, c = "256"] = n, m = parseInt(c) / 8;
    return (0, bc.numberToHex)(t, {
      size: r ? 32 : m,
      signed: s === "int"
    });
  }
  const a = e.match(mc.bytesRegex);
  if (a) {
    const [i, s] = a;
    if (parseInt(s) !== (t.length - 2) / 2)
      throw new $c.BytesSizeMismatchError({
        expectedSize: parseInt(s),
        givenSize: (t.length - 2) / 2
      });
    return (0, fc.pad)(t, { dir: "right", size: r ? 32 : null });
  }
  const o = e.match(mc.arrayRegex);
  if (o && Array.isArray(t)) {
    const [i, s] = o, c = [];
    for (let m = 0; m < t.length; m++)
      c.push(df(s, t[m], !0));
    return c.length === 0 ? "0x" : (0, uf.concatHex)(c);
  }
  throw new $c.UnsupportedPackedAbiType(e);
}
var wt = {}, sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.isBytes = void 0;
function cE(e) {
  return !e || typeof e != "object" || !("BYTES_PER_ELEMENT" in e) ? !1 : e.BYTES_PER_ELEMENT === 1 && e.constructor.name === "Uint8Array";
}
sn.isBytes = cE;
var Ot = {}, Ra = {}, Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.PositionOutOfBoundsError = Hr.NegativeOffsetError = void 0;
const lf = G;
class uE extends lf.BaseError {
  constructor({ offset: t }) {
    super(`Offset \`${t}\` cannot be negative.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NegativeOffsetError"
    });
  }
}
Hr.NegativeOffsetError = uE;
class dE extends lf.BaseError {
  constructor({ length: t, position: r }) {
    super(`Position \`${r}\` is out of bounds (\`0 < position < ${t}\`).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PositionOutOfBoundsError"
    });
  }
}
Hr.PositionOutOfBoundsError = dE;
Object.defineProperty(Ra, "__esModule", { value: !0 });
Ra.createCursor = void 0;
const gc = Hr, lE = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new gc.PositionOutOfBoundsError({
        length: this.bytes.length,
        position: e
      });
  },
  decrementPosition(e) {
    if (e < 0)
      throw new gc.NegativeOffsetError({ offset: e });
    const t = this.position - e;
    this.assertPosition(t), this.position = t;
  },
  incrementPosition(e) {
    if (e < 0)
      throw new gc.NegativeOffsetError({ offset: e });
    const t = this.position + e;
    this.assertPosition(t), this.position = t;
  },
  inspectByte(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectBytes(e, t) {
    const r = t ?? this.position;
    return this.assertPosition(r + e - 1), this.bytes.subarray(r, r + e);
  },
  inspectUint8(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectUint16(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 1), this.dataView.getUint16(t);
  },
  inspectUint24(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 2), (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2);
  },
  inspectUint32(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 3), this.dataView.getUint32(t);
  },
  pushByte(e) {
    this.assertPosition(this.position), this.bytes[this.position] = e, this.position++;
  },
  pushBytes(e) {
    this.assertPosition(this.position + e.length - 1), this.bytes.set(e, this.position), this.position += e.length;
  },
  pushUint8(e) {
    this.assertPosition(this.position), this.bytes[this.position] = e, this.position++;
  },
  pushUint16(e) {
    this.assertPosition(this.position + 1), this.dataView.setUint16(this.position, e), this.position += 2;
  },
  pushUint24(e) {
    this.assertPosition(this.position + 2), this.dataView.setUint16(this.position, e >> 8), this.dataView.setUint8(this.position + 2, e & 255), this.position += 3;
  },
  pushUint32(e) {
    this.assertPosition(this.position + 3), this.dataView.setUint32(this.position, e), this.position += 4;
  },
  readByte() {
    const e = this.inspectByte();
    return this.position++, e;
  },
  readBytes(e) {
    const t = this.inspectBytes(e);
    return this.position += e, t;
  },
  readUint8() {
    const e = this.inspectUint8();
    return this.position += 1, e;
  },
  readUint16() {
    const e = this.inspectUint16();
    return this.position += 2, e;
  },
  readUint24() {
    const e = this.inspectUint24();
    return this.position += 3, e;
  },
  readUint32() {
    const e = this.inspectUint32();
    return this.position += 4, e;
  },
  setPosition(e) {
    this.assertPosition(e), this.position = e;
  }
};
function fE(e) {
  const t = Object.create(lE);
  return t.bytes = e, t.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength), t;
}
Ra.createCursor = fE;
var od;
function _i() {
  if (od)
    return Ot;
  od = 1, Object.defineProperty(Ot, "__esModule", { value: !0 }), Ot.hexToRlp = Ot.bytesToRlp = Ot.toRlp = void 0;
  const e = wf(), t = Ra, r = de(), n = M();
  function a(d, l = "hex") {
    const f = s(d), b = (0, t.createCursor)(new Uint8Array(f.length));
    return f.encode(b), l === "hex" ? (0, n.bytesToHex)(b.bytes) : b.bytes;
  }
  Ot.toRlp = a;
  function o(d, l = "bytes") {
    return a(d, l);
  }
  Ot.bytesToRlp = o;
  function i(d, l = "hex") {
    return a(d, l);
  }
  Ot.hexToRlp = i;
  function s(d) {
    return Array.isArray(d) ? c(d.map((l) => s(l))) : m(d);
  }
  function c(d) {
    const l = d.reduce((y, h) => y + h.length, 0), f = u(l);
    return {
      length: l <= 55 ? 1 + l : 1 + f + l,
      encode(y) {
        l <= 55 ? y.pushByte(192 + l) : (y.pushByte(247 + f), f === 1 ? y.pushUint8(l) : f === 2 ? y.pushUint16(l) : f === 3 ? y.pushUint24(l) : y.pushUint32(l));
        for (const { encode: h } of d)
          h(y);
      }
    };
  }
  function m(d) {
    const l = typeof d == "string" ? (0, r.hexToBytes)(d) : d, f = u(l.length);
    return {
      length: l.length === 1 && l[0] < 128 ? 1 : l.length <= 55 ? 1 + l.length : 1 + f + l.length,
      encode(y) {
        l.length === 1 && l[0] < 128 ? y.pushBytes(l) : l.length <= 55 ? (y.pushByte(128 + l.length), y.pushBytes(l)) : (y.pushByte(183 + f), f === 1 ? y.pushUint8(l.length) : f === 2 ? y.pushUint16(l.length) : f === 3 ? y.pushUint24(l.length) : y.pushUint32(l.length), y.pushBytes(l));
      }
    };
  }
  function u(d) {
    if (d < 2 ** 8)
      return 1;
    if (d < 2 ** 16)
      return 2;
    if (d < 2 ** 24)
      return 3;
    if (d < 2 ** 32)
      return 4;
    throw new e.BaseError("Length is too large.");
  }
  return Ot;
}
var id;
function ff() {
  if (id)
    return wt;
  id = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.getCreate2Address = wt.getCreateAddress = wt.getContractAddress = void 0;
  const e = oe, t = sn, r = we, n = Ee, a = de(), o = _i(), i = Ie, s = Be;
  function c(d) {
    return d.opcode === "CREATE2" ? u(d) : m(d);
  }
  wt.getContractAddress = c;
  function m(d) {
    const l = (0, a.toBytes)((0, s.getAddress)(d.from));
    let f = (0, a.toBytes)(d.nonce);
    return f[0] === 0 && (f = new Uint8Array([])), (0, s.getAddress)(`0x${(0, i.keccak256)((0, o.toRlp)([l, f], "bytes")).slice(26)}`);
  }
  wt.getCreateAddress = m;
  function u(d) {
    const l = (0, a.toBytes)((0, s.getAddress)(d.from)), f = (0, r.pad)((0, t.isBytes)(d.salt) ? d.salt : (0, a.toBytes)(d.salt), {
      size: 32
    }), b = "bytecodeHash" in d ? (0, t.isBytes)(d.bytecodeHash) ? d.bytecodeHash : (0, a.toBytes)(d.bytecodeHash) : (0, i.keccak256)(d.bytecode, "bytes");
    return (0, s.getAddress)((0, n.slice)((0, i.keccak256)((0, e.concat)([(0, a.toBytes)("0xff"), l, f, b])), 12));
  }
  return wt.getCreate2Address = u, wt;
}
var ut = {};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.extractFunctionType = ut.extractFunctionParams = ut.extractFunctionName = ut.extractFunctionParts = void 0;
const bE = /((function|event)\s)?(.*)(\((.*)\))/;
function hi(e) {
  const t = e.match(bE), r = (t == null ? void 0 : t[2]) || void 0, n = t == null ? void 0 : t[3], a = (t == null ? void 0 : t[5]) || void 0;
  return { type: r, name: n, params: a };
}
ut.extractFunctionParts = hi;
function mE(e) {
  return hi(e).name;
}
ut.extractFunctionName = mE;
function gE(e) {
  const t = hi(e).params, r = t == null ? void 0 : t.split(",").map((n) => n.trim().split(" "));
  return r == null ? void 0 : r.map((n) => ({
    type: n[0],
    name: n[1] === "indexed" ? n[2] : n[1],
    ...n[1] === "indexed" ? { indexed: !0 } : {}
  }));
}
ut.extractFunctionParams = gE;
function yE(e) {
  return hi(e).type;
}
ut.extractFunctionType = yE;
var xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.defineTransactionReceipt = xt.formatTransactionReceipt = void 0;
const _E = ue(), hE = Zt, pE = Et, vE = Vr, EE = {
  "0x0": "reverted",
  "0x1": "success"
};
function bf(e) {
  return {
    ...e,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((t) => (0, pE.formatLog)(t)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? (0, _E.hexToNumber)(e.transactionIndex) : null,
    status: e.status ? EE[e.status] : null,
    type: e.type ? vE.transactionType[e.type] || e.type : null
  };
}
xt.formatTransactionReceipt = bf;
xt.defineTransactionReceipt = (0, hE.defineFormatter)("transactionReceipt", bf);
var ke = {};
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.bytesToString = ke.bytesToNumber = ke.bytesToBool = ke.bytesToBigInt = ke.fromBytes = void 0;
const jE = te, mf = et, Ur = ue(), xc = M();
function PE(e, t) {
  const r = typeof t == "string" ? { to: t } : t, n = r.to;
  return n === "number" ? _f(e, r) : n === "bigint" ? gf(e, r) : n === "boolean" ? yf(e, r) : n === "string" ? hf(e, r) : (0, xc.bytesToHex)(e, r);
}
ke.fromBytes = PE;
function gf(e, t = {}) {
  typeof t.size < "u" && (0, Ur.assertSize)(e, { size: t.size });
  const r = (0, xc.bytesToHex)(e, t);
  return (0, Ur.hexToBigInt)(r);
}
ke.bytesToBigInt = gf;
function yf(e, t = {}) {
  let r = e;
  if (typeof t.size < "u" && ((0, Ur.assertSize)(r, { size: t.size }), r = (0, mf.trim)(r)), r.length > 1 || r[0] > 1)
    throw new jE.InvalidBytesBooleanError(r);
  return !!r[0];
}
ke.bytesToBool = yf;
function _f(e, t = {}) {
  typeof t.size < "u" && (0, Ur.assertSize)(e, { size: t.size });
  const r = (0, xc.bytesToHex)(e, t);
  return (0, Ur.hexToNumber)(r);
}
ke.bytesToNumber = _f;
function hf(e, t = {}) {
  let r = e;
  return typeof t.size < "u" && ((0, Ur.assertSize)(r, { size: t.size }), r = (0, mf.trim)(r, { dir: "right" })), new TextDecoder().decode(r);
}
ke.bytesToString = hf;
var mt = {};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.rlpToHex = mt.rlpToBytes = mt.fromRlp = void 0;
const TE = G, AE = te, wE = Ra, OE = de(), sd = M();
function zc(e, t = "hex") {
  const r = (() => {
    if (typeof e == "string") {
      if (e.length > 3 && e.length % 2 !== 0)
        throw new AE.InvalidHexValueError(e);
      return (0, OE.hexToBytes)(e);
    }
    return e;
  })(), n = (0, wE.createCursor)(r);
  return pf(n, t);
}
mt.fromRlp = zc;
function IE(e, t = "bytes") {
  return zc(e, t);
}
mt.rlpToBytes = IE;
function $E(e, t = "hex") {
  return zc(e, t);
}
mt.rlpToHex = $E;
function pf(e, t = "hex") {
  if (e.bytes.length === 0)
    return t === "hex" ? (0, sd.bytesToHex)(e.bytes) : e.bytes;
  const r = e.readByte();
  if (r < 128 && e.decrementPosition(1), r < 192) {
    const a = cd(e, r, 128), o = e.readBytes(a);
    return t === "hex" ? (0, sd.bytesToHex)(o) : o;
  }
  const n = cd(e, r, 192);
  return CE(e, n, t);
}
function cd(e, t, r) {
  if (r === 128 && t < 128)
    return 1;
  if (t <= r + 55)
    return t - r;
  if (t === r + 55 + 1)
    return e.readUint8();
  if (t === r + 55 + 2)
    return e.readUint16();
  if (t === r + 55 + 3)
    return e.readUint24();
  if (t === r + 55 + 4)
    return e.readUint32();
  throw new TE.BaseError("Invalid RLP prefix");
}
function CE(e, t, r) {
  const n = e.position, a = [];
  for (; e.position - n < t; )
    a.push(pf(e, r));
  return a;
}
var cn = {};
Object.defineProperty(cn, "__esModule", { value: !0 });
cn.isHash = void 0;
const SE = ce, RE = We;
function BE(e) {
  return (0, SE.isHex)(e) && (0, RE.size)(e) === 32;
}
cn.isHash = BE;
var Ba = {};
const ME = /* @__PURE__ */ qr(rb);
Object.defineProperty(Ba, "__esModule", { value: !0 });
Ba.sha256 = void 0;
const FE = ME, NE = ce, kE = de(), DE = M();
function HE(e, t) {
  const r = t || "hex", n = (0, FE.sha256)((0, NE.isHex)(e, { strict: !1 }) ? (0, kE.toBytes)(e) : e);
  return r === "bytes" ? n : (0, DE.toHex)(n);
}
Ba.sha256 = HE;
var Ma = {};
const UE = /* @__PURE__ */ qr(ib);
Object.defineProperty(Ma, "__esModule", { value: !0 });
Ma.ripemd160 = void 0;
const LE = UE, qE = ce, xE = de(), zE = M();
function GE(e, t) {
  const r = t || "hex", n = (0, LE.ripemd160)((0, qE.isHex)(e, { strict: !1 }) ? (0, xE.toBytes)(e) : e);
  return r === "bytes" ? n : (0, zE.toHex)(n);
}
Ma.ripemd160 = GE;
var $r = {}, un = {};
const Fa = /* @__PURE__ */ qr(nb);
Object.defineProperty(un, "__esModule", { value: !0 });
un.recoverPublicKey = void 0;
const ud = ce, WE = ue(), dd = M();
async function VE({ hash: e, signature: t }) {
  const r = (0, ud.isHex)(t) ? t : (0, dd.toHex)(t), n = (0, ud.isHex)(e) ? e : (0, dd.toHex)(e);
  let a = (0, WE.hexToNumber)(`0x${r.slice(130)}`);
  (a === 0 || a === 1) && (a += 27);
  const { secp256k1: o } = await Promise.resolve().then(() => Fa);
  return `0x${o.Signature.fromCompact(r.substring(2, 130)).addRecoveryBit(a - 27).recoverPublicKey(n.substring(2)).toHex(!1)}`;
}
un.recoverPublicKey = VE;
Object.defineProperty($r, "__esModule", { value: !0 });
$r.recoverAddress = void 0;
const KE = tn, ZE = un;
async function JE({ hash: e, signature: t }) {
  return (0, KE.publicKeyToAddress)(await (0, ZE.recoverPublicKey)({ hash: e, signature: t }));
}
$r.recoverAddress = JE;
var dn = {}, ln = {}, Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
Na.presignMessagePrefix = void 0;
Na.presignMessagePrefix = `Ethereum Signed Message:
`;
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.hashMessage = void 0;
const XE = Na, QE = oe, yc = de(), YE = Ie;
function ej(e, t) {
  const r = typeof e == "string" ? (0, yc.stringToBytes)(e) : e.raw instanceof Uint8Array ? e.raw : (0, yc.toBytes)(e.raw), n = (0, yc.stringToBytes)(`${XE.presignMessagePrefix}${r.length}`);
  return (0, YE.keccak256)((0, QE.concat)([n, r]), t);
}
ln.hashMessage = ej;
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.recoverMessageAddress = void 0;
const tj = ln, rj = $r;
async function nj({ message: e, signature: t }) {
  return (0, rj.recoverAddress)({ hash: (0, tj.hashMessage)(e), signature: t });
}
dn.recoverMessageAddress = nj;
var fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.recoverTypedDataAddress = void 0;
const aj = Oa(), oj = $r;
async function ij({ domain: e, message: t, primaryType: r, signature: n, types: a }) {
  return (0, oj.recoverAddress)({
    hash: (0, aj.hashTypedData)({
      domain: e,
      message: t,
      primaryType: r,
      types: a
    }),
    signature: n
  });
}
fn.recoverTypedDataAddress = ij;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: !0 });
ka.verifyMessage = void 0;
const sj = Be, cj = Jt, uj = dn;
async function dj({ address: e, message: t, signature: r }) {
  return (0, cj.isAddressEqual)((0, sj.getAddress)(e), await (0, uj.recoverMessageAddress)({ message: t, signature: r }));
}
ka.verifyMessage = dj;
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
Da.verifyTypedData = void 0;
const lj = Be, fj = Jt, bj = fn;
async function mj({ address: e, domain: t, message: r, primaryType: n, signature: a, types: o }) {
  return (0, fj.isAddressEqual)((0, lj.getAddress)(e), await (0, bj.recoverTypedDataAddress)({
    domain: t,
    message: r,
    primaryType: n,
    signature: a,
    types: o
  }));
}
Da.verifyTypedData = mj;
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.getSerializedTransactionType = void 0;
const gj = q, yj = Ee, _j = ue();
function hj(e) {
  const t = (0, yj.sliceHex)(e, 0, 1);
  if (t === "0x02")
    return "eip1559";
  if (t === "0x01")
    return "eip2930";
  if (t !== "0x" && (0, _j.hexToNumber)(t) >= 192)
    return "legacy";
  throw new gj.InvalidSerializedTransactionTypeError({ serializedType: t });
}
bn.getSerializedTransactionType = hj;
var Ye = {};
Object.defineProperty(Ye, "__esModule", { value: !0 });
Ye.assertTransactionLegacy = Ye.assertTransactionEIP2930 = Ye.assertTransactionEIP1559 = void 0;
const Gc = He, uo = G, Wc = ve, lo = V, Vc = $e;
function pj(e) {
  const { chainId: t, maxPriorityFeePerGas: r, gasPrice: n, maxFeePerGas: a, to: o } = e;
  if (t <= 0)
    throw new Wc.InvalidChainIdError({ chainId: t });
  if (o && !(0, Vc.isAddress)(o))
    throw new Gc.InvalidAddressError({ address: o });
  if (n)
    throw new uo.BaseError("`gasPrice` is not a valid EIP-1559 Transaction attribute.");
  if (a && a > 2n ** 256n - 1n)
    throw new lo.FeeCapTooHighError({ maxFeePerGas: a });
  if (r && a && r > a)
    throw new lo.TipAboveFeeCapError({ maxFeePerGas: a, maxPriorityFeePerGas: r });
}
Ye.assertTransactionEIP1559 = pj;
function vj(e) {
  const { chainId: t, maxPriorityFeePerGas: r, gasPrice: n, maxFeePerGas: a, to: o } = e;
  if (t <= 0)
    throw new Wc.InvalidChainIdError({ chainId: t });
  if (o && !(0, Vc.isAddress)(o))
    throw new Gc.InvalidAddressError({ address: o });
  if (r || a)
    throw new uo.BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (n && n > 2n ** 256n - 1n)
    throw new lo.FeeCapTooHighError({ maxFeePerGas: n });
}
Ye.assertTransactionEIP2930 = vj;
function Ej(e) {
  const { chainId: t, maxPriorityFeePerGas: r, gasPrice: n, maxFeePerGas: a, to: o, accessList: i } = e;
  if (o && !(0, Vc.isAddress)(o))
    throw new Gc.InvalidAddressError({ address: o });
  if (typeof t < "u" && t <= 0)
    throw new Wc.InvalidChainIdError({ chainId: t });
  if (r || a)
    throw new uo.BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (n && n > 2n ** 256n - 1n)
    throw new lo.FeeCapTooHighError({ maxFeePerGas: n });
  if (i)
    throw new uo.BaseError("`accessList` is not a valid Legacy Transaction attribute.");
}
Ye.assertTransactionLegacy = Ej;
var It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.parseAccessList = It.toTransactionArray = It.parseTransaction = void 0;
const jj = He, fo = q, Pj = $e, ae = ce, ld = we, Tj = et, ge = ue(), vf = mt, Aj = cn, Kc = Ye, wj = bn;
function Oj(e) {
  const t = (0, wj.getSerializedTransactionType)(e);
  return t === "eip1559" ? Ij(e) : t === "eip2930" ? $j(e) : Cj(e);
}
It.parseTransaction = Oj;
function Ij(e) {
  const t = Zc(e), [r, n, a, o, i, s, c, m, u, d, l, f] = t;
  if (!(t.length === 9 || t.length === 12))
    throw new fo.InvalidSerializedTransactionError({
      attributes: {
        chainId: r,
        nonce: n,
        maxPriorityFeePerGas: a,
        maxFeePerGas: o,
        gas: i,
        to: s,
        value: c,
        data: m,
        accessList: u,
        ...t.length > 9 ? {
          v: d,
          r: l,
          s: f
        } : {}
      },
      serializedTransaction: e,
      type: "eip1559"
    });
  const b = {
    chainId: (0, ge.hexToNumber)(r),
    type: "eip1559"
  };
  return (0, ae.isHex)(s) && s !== "0x" && (b.to = s), (0, ae.isHex)(i) && i !== "0x" && (b.gas = (0, ge.hexToBigInt)(i)), (0, ae.isHex)(m) && m !== "0x" && (b.data = m), (0, ae.isHex)(n) && n !== "0x" && (b.nonce = (0, ge.hexToNumber)(n)), (0, ae.isHex)(c) && c !== "0x" && (b.value = (0, ge.hexToBigInt)(c)), (0, ae.isHex)(o) && o !== "0x" && (b.maxFeePerGas = (0, ge.hexToBigInt)(o)), (0, ae.isHex)(a) && a !== "0x" && (b.maxPriorityFeePerGas = (0, ge.hexToBigInt)(a)), u.length !== 0 && u !== "0x" && (b.accessList = Jc(u)), (0, Kc.assertTransactionEIP1559)(b), { ...t.length === 12 ? Ef(t) : void 0, ...b };
}
function $j(e) {
  const t = Zc(e), [r, n, a, o, i, s, c, m, u, d, l] = t;
  if (!(t.length === 8 || t.length === 11))
    throw new fo.InvalidSerializedTransactionError({
      attributes: {
        chainId: r,
        nonce: n,
        gasPrice: a,
        gas: o,
        to: i,
        value: s,
        data: c,
        accessList: m,
        ...t.length > 8 ? {
          v: u,
          r: d,
          s: l
        } : {}
      },
      serializedTransaction: e,
      type: "eip2930"
    });
  const f = {
    chainId: (0, ge.hexToNumber)(r),
    type: "eip2930"
  };
  return (0, ae.isHex)(i) && i !== "0x" && (f.to = i), (0, ae.isHex)(o) && o !== "0x" && (f.gas = (0, ge.hexToBigInt)(o)), (0, ae.isHex)(c) && c !== "0x" && (f.data = c), (0, ae.isHex)(n) && n !== "0x" && (f.nonce = (0, ge.hexToNumber)(n)), (0, ae.isHex)(s) && s !== "0x" && (f.value = (0, ge.hexToBigInt)(s)), (0, ae.isHex)(a) && a !== "0x" && (f.gasPrice = (0, ge.hexToBigInt)(a)), m.length !== 0 && m !== "0x" && (f.accessList = Jc(m)), (0, Kc.assertTransactionEIP2930)(f), { ...t.length === 11 ? Ef(t) : void 0, ...f };
}
function Cj(e) {
  const t = (0, vf.fromRlp)(e, "hex"), [r, n, a, o, i, s, c, m, u] = t;
  if (!(t.length === 6 || t.length === 9))
    throw new fo.InvalidSerializedTransactionError({
      attributes: {
        nonce: r,
        gasPrice: n,
        gas: a,
        to: o,
        value: i,
        data: s,
        ...t.length > 6 ? {
          v: c,
          r: m,
          s: u
        } : {}
      },
      serializedTransaction: e,
      type: "legacy"
    });
  const d = {
    type: "legacy"
  };
  if ((0, ae.isHex)(o) && o !== "0x" && (d.to = o), (0, ae.isHex)(a) && a !== "0x" && (d.gas = (0, ge.hexToBigInt)(a)), (0, ae.isHex)(s) && s !== "0x" && (d.data = s), (0, ae.isHex)(r) && r !== "0x" && (d.nonce = (0, ge.hexToNumber)(r)), (0, ae.isHex)(i) && i !== "0x" && (d.value = (0, ge.hexToBigInt)(i)), (0, ae.isHex)(n) && n !== "0x" && (d.gasPrice = (0, ge.hexToBigInt)(n)), (0, Kc.assertTransactionLegacy)(d), t.length === 6)
    return d;
  const l = (0, ae.isHex)(c) && c !== "0x" ? (0, ge.hexToBigInt)(c) : 0n;
  if (u === "0x" && m === "0x")
    return l > 0 && (d.chainId = Number(l)), d;
  const f = l, b = Number((f - 35n) / 2n);
  if (b > 0)
    d.chainId = b;
  else if (f !== 27n && f !== 28n)
    throw new fo.InvalidLegacyVError({ v: f });
  return d.v = f, d.s = u, d.r = m, d;
}
function Zc(e) {
  return (0, vf.fromRlp)(`0x${e.slice(4)}`, "hex");
}
It.toTransactionArray = Zc;
function Jc(e) {
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const [n, a] = e[r];
    if (!(0, Pj.isAddress)(n))
      throw new jj.InvalidAddressError({ address: n });
    t.push({
      address: n,
      storageKeys: a.map((o) => (0, Aj.isHash)(o) ? o : (0, Tj.trim)(o))
    });
  }
  return t;
}
It.parseAccessList = Jc;
function Ef(e) {
  const t = e.slice(-3), r = t[0] === "0x" || (0, ge.hexToBigInt)(t[0]) === 0n ? 27n : 28n;
  return {
    r: (0, ld.padHex)(t[1], { size: 32 }),
    s: (0, ld.padHex)(t[2], { size: 32 }),
    v: r,
    yParity: r === 27n ? 0 : 1
  };
}
var Mn = {}, mn = {};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.serializeAccessList = void 0;
const Sj = He, Rj = q, Bj = $e;
function Mj(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const { address: n, storageKeys: a } = e[r];
    for (let o = 0; o < a.length; o++)
      if (a[o].length - 2 !== 64)
        throw new Rj.InvalidStorageKeySizeError({ storageKey: a[o] });
    if (!(0, Bj.isAddress)(n))
      throw new Sj.InvalidAddressError({ address: n });
    t.push([n, a]);
  }
  return t;
}
mn.serializeAccessList = Mj;
var fd;
function jf() {
  if (fd)
    return Mn;
  fd = 1, Object.defineProperty(Mn, "__esModule", { value: !0 }), Mn.serializeTransaction = void 0;
  const e = q, t = oe, r = et, n = M(), a = _i(), o = Ye, i = Er, s = mn;
  function c(l, f) {
    const b = (0, i.getTransactionType)(l);
    return b === "eip1559" ? m(l, f) : b === "eip2930" ? u(l, f) : d(l, f);
  }
  Mn.serializeTransaction = c;
  function m(l, f) {
    const { chainId: b, gas: y, nonce: h, to: p, value: g, maxFeePerGas: v, maxPriorityFeePerGas: j, accessList: E, data: P } = l;
    (0, o.assertTransactionEIP1559)(l);
    const $ = (0, s.serializeAccessList)(E), k = [
      (0, n.toHex)(b),
      h ? (0, n.toHex)(h) : "0x",
      j ? (0, n.toHex)(j) : "0x",
      v ? (0, n.toHex)(v) : "0x",
      y ? (0, n.toHex)(y) : "0x",
      p ?? "0x",
      g ? (0, n.toHex)(g) : "0x",
      P ?? "0x",
      $
    ];
    if (f) {
      const L = f.v === 0n ? "0x" : f.v === 1n ? (0, n.toHex)(1) : f.v === 27n ? "0x" : (0, n.toHex)(1);
      k.push(L, (0, r.trim)(f.r), (0, r.trim)(f.s));
    }
    return (0, t.concatHex)([
      "0x02",
      (0, a.toRlp)(k)
    ]);
  }
  function u(l, f) {
    const { chainId: b, gas: y, data: h, nonce: p, to: g, value: v, accessList: j, gasPrice: E } = l;
    (0, o.assertTransactionEIP2930)(l);
    const P = (0, s.serializeAccessList)(j), $ = [
      (0, n.toHex)(b),
      p ? (0, n.toHex)(p) : "0x",
      E ? (0, n.toHex)(E) : "0x",
      y ? (0, n.toHex)(y) : "0x",
      g ?? "0x",
      v ? (0, n.toHex)(v) : "0x",
      h ?? "0x",
      P
    ];
    if (f) {
      const k = f.v === 0n ? "0x" : f.v === 1n ? (0, n.toHex)(1) : f.v === 27n ? "0x" : (0, n.toHex)(1);
      $.push(k, (0, r.trim)(f.r), (0, r.trim)(f.s));
    }
    return (0, t.concatHex)([
      "0x01",
      (0, a.toRlp)($)
    ]);
  }
  function d(l, f) {
    const { chainId: b = 0, gas: y, data: h, nonce: p, to: g, value: v, gasPrice: j } = l;
    (0, o.assertTransactionLegacy)(l);
    let E = [
      p ? (0, n.toHex)(p) : "0x",
      j ? (0, n.toHex)(j) : "0x",
      y ? (0, n.toHex)(y) : "0x",
      g ?? "0x",
      v ? (0, n.toHex)(v) : "0x",
      h ?? "0x"
    ];
    if (f) {
      const P = (() => {
        if (b > 0)
          return BigInt(b * 2) + BigInt(35n + f.v - 27n);
        if (f.v >= 35n)
          return (f.v - 35n) / 2n > 0 ? f.v : 27n + (f.v === 35n ? 0n : 1n);
        const $ = 27n + (f.v === 27n ? 0n : 1n);
        if (f.v !== $)
          throw new e.InvalidLegacyVError({ v: f.v });
        return $;
      })();
      E = [
        ...E,
        (0, n.toHex)(P),
        f.r,
        f.s
      ];
    } else
      b > 0 && (E = [
        ...E,
        (0, n.toHex)(b),
        "0x",
        "0x"
      ]);
    return (0, a.toRlp)(E);
  }
  return Mn;
}
var Cr = {};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.parseUnits = void 0;
function Fj(e, t) {
  let [r, n = "0"] = e.split(".");
  const a = r.startsWith("-");
  if (a && (r = r.slice(1)), n = n.replace(/(0+)$/, ""), t === 0)
    Math.round(+`.${n}`) === 1 && (r = `${BigInt(r) + 1n}`), n = "";
  else if (n.length > t) {
    const [o, i, s] = [
      n.slice(0, t - 1),
      n.slice(t - 1, t),
      n.slice(t)
    ], c = Math.round(+`${i}.${s}`);
    c > 9 ? n = `${BigInt(o) + BigInt(1)}0`.padStart(o.length + 1, "0") : n = `${o}${c}`, n.length > t && (n = n.slice(1), r = `${BigInt(r) + 1n}`), n = n.slice(0, t);
  } else
    n = n.padEnd(t, "0");
  return BigInt(`${a ? "-" : ""}${r}${n}`);
}
Cr.parseUnits = Fj;
var Ha = {};
Object.defineProperty(Ha, "__esModule", { value: !0 });
Ha.parseEther = void 0;
const Nj = Ge, kj = Cr;
function Dj(e, t = "wei") {
  return (0, kj.parseUnits)(e, Nj.etherUnits[t]);
}
Ha.parseEther = Dj;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: !0 });
Ua.parseGwei = void 0;
const Hj = Ge, Uj = Cr;
function Lj(e, t = "wei") {
  return (0, Uj.parseUnits)(e, Hj.gweiUnits[t]);
}
Ua.parseGwei = Lj;
var bd;
function gn() {
  return bd || (bd = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.concat = e.extractFunctionParts = e.extractFunctionType = e.extractFunctionParams = e.extractFunctionName = e.isAddressEqual = e.isAddress = e.getAddress = e.getCreate2Address = e.getCreateAddress = e.getContractAddress = e.publicKeyToAddress = e.parseAccount = e.formatAbiParams = e.formatAbiItem = e.formatAbiItemWithArgs = e.encodePacked = e.parseAbiParameters = e.parseAbiParameter = e.parseAbiItem = e.parseAbi = e.getAbiItem = e.encodeFunctionResult = e.encodeFunctionData = e.encodeEventTopics = e.encodeErrorResult = e.encodeDeployData = e.encodeAbiParameters = e.decodeFunctionResult = e.decodeFunctionData = e.decodeEventLog = e.decodeErrorResult = e.decodeAbiParameters = e.validateTypedData = e.stringify = e.rpc = e.getSocket = e.integerRegex = e.bytesRegex = e.arrayRegex = e.getChainContractAddress = e.extractChain = e.defineChain = e.assertCurrentChain = e.offchainLookupSignature = e.offchainLookupAbiItem = e.offchainLookup = e.ccipFetch = e.buildRequest = e.isDeterministicError = void 0, e.getEstimateGasError = e.getContractError = e.getCallError = e.getNodeError = e.containsNodeError = e.fromRlp = e.hexToString = e.hexToNumber = e.hexToBigInt = e.hexToBool = e.fromHex = e.fromBytes = e.bytesToString = e.bytesToNumber = e.bytesToBool = e.bytesToBigint = e.bytesToBigInt = e.stringToHex = e.numberToHex = e.toHex = e.bytesToHex = e.boolToHex = e.stringToBytes = e.numberToBytes = e.hexToBytes = e.toBytes = e.boolToBytes = e.toRlp = e.extract = e.formatTransactionRequest = e.defineTransactionRequest = e.defineTransactionReceipt = e.formatLog = e.transactionType = e.formatTransaction = e.defineTransaction = e.formatBlock = e.defineBlock = e.trim = e.sliceHex = e.sliceBytes = e.slice = e.size = e.padHex = e.padBytes = e.pad = e.isHex = e.isBytes = e.concatHex = e.concatBytes = void 0, e.parseGwei = e.parseEther = e.parseUnits = e.formatUnits = e.formatGwei = e.formatEther = e.serializeAccessList = e.serializeTransaction = e.prepareTransactionRequest = e.parseTransaction = e.assertTransactionLegacy = e.assertTransactionEIP2930 = e.assertTransactionEIP1559 = e.assertRequest = e.getTransactionType = e.getSerializedTransactionType = e.hashMessage = e.verifyTypedData = e.verifyMessage = e.recoverTypedDataAddress = e.recoverPublicKey = e.recoverMessageAddress = e.recoverAddress = e.hashTypedData = e.ripemd160 = e.sha256 = e.keccak256 = e.isHash = e.getFunctionSelector = e.getEventSelector = e.defineFormatter = e.getTransactionError = void 0;
    var t = Qo;
    Object.defineProperty(e, "isDeterministicError", { enumerable: !0, get: function() {
      return t.isDeterministicError;
    } }), Object.defineProperty(e, "buildRequest", { enumerable: !0, get: function() {
      return t.buildRequest;
    } });
    var r = qc();
    Object.defineProperty(e, "ccipFetch", { enumerable: !0, get: function() {
      return r.ccipFetch;
    } }), Object.defineProperty(e, "offchainLookup", { enumerable: !0, get: function() {
      return r.offchainLookup;
    } }), Object.defineProperty(e, "offchainLookupAbiItem", { enumerable: !0, get: function() {
      return r.offchainLookupAbiItem;
    } }), Object.defineProperty(e, "offchainLookupSignature", { enumerable: !0, get: function() {
      return r.offchainLookupSignature;
    } });
    var n = Ar;
    Object.defineProperty(e, "assertCurrentChain", { enumerable: !0, get: function() {
      return n.assertCurrentChain;
    } });
    var a = Aa;
    Object.defineProperty(e, "defineChain", { enumerable: !0, get: function() {
      return a.defineChain;
    } });
    var o = wa;
    Object.defineProperty(e, "extractChain", { enumerable: !0, get: function() {
      return o.extractChain;
    } });
    var i = nt;
    Object.defineProperty(e, "getChainContractAddress", { enumerable: !0, get: function() {
      return i.getChainContractAddress;
    } });
    var s = bt;
    Object.defineProperty(e, "arrayRegex", { enumerable: !0, get: function() {
      return s.arrayRegex;
    } }), Object.defineProperty(e, "bytesRegex", { enumerable: !0, get: function() {
      return s.bytesRegex;
    } }), Object.defineProperty(e, "integerRegex", { enumerable: !0, get: function() {
      return s.integerRegex;
    } });
    var c = ei;
    Object.defineProperty(e, "getSocket", { enumerable: !0, get: function() {
      return c.getSocket;
    } }), Object.defineProperty(e, "rpc", { enumerable: !0, get: function() {
      return c.rpc;
    } });
    var m = _e;
    Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return m.stringify;
    } });
    var u = yi();
    Object.defineProperty(e, "validateTypedData", { enumerable: !0, get: function() {
      return u.validateTypedData;
    } });
    var d = _t;
    Object.defineProperty(e, "decodeAbiParameters", { enumerable: !0, get: function() {
      return d.decodeAbiParameters;
    } });
    var l = hr;
    Object.defineProperty(e, "decodeErrorResult", { enumerable: !0, get: function() {
      return l.decodeErrorResult;
    } });
    var f = kt;
    Object.defineProperty(e, "decodeEventLog", { enumerable: !0, get: function() {
      return f.decodeEventLog;
    } });
    var b = Ia;
    Object.defineProperty(e, "decodeFunctionData", { enumerable: !0, get: function() {
      return b.decodeFunctionData;
    } });
    var y = rt;
    Object.defineProperty(e, "decodeFunctionResult", { enumerable: !0, get: function() {
      return y.decodeFunctionResult;
    } });
    var h = Oe;
    Object.defineProperty(e, "encodeAbiParameters", { enumerable: !0, get: function() {
      return h.encodeAbiParameters;
    } });
    var p = on;
    Object.defineProperty(e, "encodeDeployData", { enumerable: !0, get: function() {
      return p.encodeDeployData;
    } });
    var g = $a;
    Object.defineProperty(e, "encodeErrorResult", { enumerable: !0, get: function() {
      return g.encodeErrorResult;
    } });
    var v = Rt;
    Object.defineProperty(e, "encodeEventTopics", { enumerable: !0, get: function() {
      return v.encodeEventTopics;
    } });
    var j = Ue;
    Object.defineProperty(e, "encodeFunctionData", { enumerable: !0, get: function() {
      return j.encodeFunctionData;
    } });
    var E = Ca;
    Object.defineProperty(e, "encodeFunctionResult", { enumerable: !0, get: function() {
      return E.encodeFunctionResult;
    } });
    var P = je;
    Object.defineProperty(e, "getAbiItem", { enumerable: !0, get: function() {
      return P.getAbiItem;
    } });
    var $ = xr();
    Object.defineProperty(e, "parseAbi", { enumerable: !0, get: function() {
      return $.parseAbi;
    } }), Object.defineProperty(e, "parseAbiItem", { enumerable: !0, get: function() {
      return $.parseAbiItem;
    } }), Object.defineProperty(e, "parseAbiParameter", { enumerable: !0, get: function() {
      return $.parseAbiParameter;
    } }), Object.defineProperty(e, "parseAbiParameters", { enumerable: !0, get: function() {
      return $.parseAbiParameters;
    } });
    var k = Sa;
    Object.defineProperty(e, "encodePacked", { enumerable: !0, get: function() {
      return k.encodePacked;
    } });
    var L = ia;
    Object.defineProperty(e, "formatAbiItemWithArgs", { enumerable: !0, get: function() {
      return L.formatAbiItemWithArgs;
    } });
    var N = Bt();
    Object.defineProperty(e, "formatAbiItem", { enumerable: !0, get: function() {
      return N.formatAbiItem;
    } }), Object.defineProperty(e, "formatAbiParams", { enumerable: !0, get: function() {
      return N.formatAbiParams;
    } });
    var K = Pe;
    Object.defineProperty(e, "parseAccount", { enumerable: !0, get: function() {
      return K.parseAccount;
    } });
    var x = tn;
    Object.defineProperty(e, "publicKeyToAddress", { enumerable: !0, get: function() {
      return x.publicKeyToAddress;
    } });
    var R = ff();
    Object.defineProperty(e, "getContractAddress", { enumerable: !0, get: function() {
      return R.getContractAddress;
    } }), Object.defineProperty(e, "getCreateAddress", { enumerable: !0, get: function() {
      return R.getCreateAddress;
    } }), Object.defineProperty(e, "getCreate2Address", { enumerable: !0, get: function() {
      return R.getCreate2Address;
    } });
    var w = Be;
    Object.defineProperty(e, "getAddress", { enumerable: !0, get: function() {
      return w.getAddress;
    } });
    var I = $e;
    Object.defineProperty(e, "isAddress", { enumerable: !0, get: function() {
      return I.isAddress;
    } });
    var z = Jt;
    Object.defineProperty(e, "isAddressEqual", { enumerable: !0, get: function() {
      return z.isAddressEqual;
    } });
    var W = ut;
    Object.defineProperty(e, "extractFunctionName", { enumerable: !0, get: function() {
      return W.extractFunctionName;
    } }), Object.defineProperty(e, "extractFunctionParams", { enumerable: !0, get: function() {
      return W.extractFunctionParams;
    } }), Object.defineProperty(e, "extractFunctionType", { enumerable: !0, get: function() {
      return W.extractFunctionType;
    } }), Object.defineProperty(e, "extractFunctionParts", { enumerable: !0, get: function() {
      return W.extractFunctionParts;
    } });
    var ee = oe;
    Object.defineProperty(e, "concat", { enumerable: !0, get: function() {
      return ee.concat;
    } }), Object.defineProperty(e, "concatBytes", { enumerable: !0, get: function() {
      return ee.concatBytes;
    } }), Object.defineProperty(e, "concatHex", { enumerable: !0, get: function() {
      return ee.concatHex;
    } });
    var H = sn;
    Object.defineProperty(e, "isBytes", { enumerable: !0, get: function() {
      return H.isBytes;
    } });
    var Z = ce;
    Object.defineProperty(e, "isHex", { enumerable: !0, get: function() {
      return Z.isHex;
    } });
    var ne = we;
    Object.defineProperty(e, "pad", { enumerable: !0, get: function() {
      return ne.pad;
    } }), Object.defineProperty(e, "padBytes", { enumerable: !0, get: function() {
      return ne.padBytes;
    } }), Object.defineProperty(e, "padHex", { enumerable: !0, get: function() {
      return ne.padHex;
    } });
    var ie = We;
    Object.defineProperty(e, "size", { enumerable: !0, get: function() {
      return ie.size;
    } });
    var me = Ee;
    Object.defineProperty(e, "slice", { enumerable: !0, get: function() {
      return me.slice;
    } }), Object.defineProperty(e, "sliceBytes", { enumerable: !0, get: function() {
      return me.sliceBytes;
    } }), Object.defineProperty(e, "sliceHex", { enumerable: !0, get: function() {
      return me.sliceHex;
    } });
    var Te = et;
    Object.defineProperty(e, "trim", { enumerable: !0, get: function() {
      return Te.trim;
    } });
    var he = Ct;
    Object.defineProperty(e, "defineBlock", { enumerable: !0, get: function() {
      return he.defineBlock;
    } }), Object.defineProperty(e, "formatBlock", { enumerable: !0, get: function() {
      return he.formatBlock;
    } });
    var Se = Vr;
    Object.defineProperty(e, "defineTransaction", { enumerable: !0, get: function() {
      return Se.defineTransaction;
    } }), Object.defineProperty(e, "formatTransaction", { enumerable: !0, get: function() {
      return Se.formatTransaction;
    } }), Object.defineProperty(e, "transactionType", { enumerable: !0, get: function() {
      return Se.transactionType;
    } });
    var at = Et;
    Object.defineProperty(e, "formatLog", { enumerable: !0, get: function() {
      return at.formatLog;
    } });
    var Le = xt;
    Object.defineProperty(e, "defineTransactionReceipt", { enumerable: !0, get: function() {
      return Le.defineTransactionReceipt;
    } });
    var Ke = Kt;
    Object.defineProperty(e, "defineTransactionRequest", { enumerable: !0, get: function() {
      return Ke.defineTransactionRequest;
    } }), Object.defineProperty(e, "formatTransactionRequest", { enumerable: !0, get: function() {
      return Ke.formatTransactionRequest;
    } });
    var Ze = Vt;
    Object.defineProperty(e, "extract", { enumerable: !0, get: function() {
      return Ze.extract;
    } });
    var B = _i();
    Object.defineProperty(e, "toRlp", { enumerable: !0, get: function() {
      return B.toRlp;
    } });
    var A = de();
    Object.defineProperty(e, "boolToBytes", { enumerable: !0, get: function() {
      return A.boolToBytes;
    } }), Object.defineProperty(e, "toBytes", { enumerable: !0, get: function() {
      return A.toBytes;
    } }), Object.defineProperty(e, "hexToBytes", { enumerable: !0, get: function() {
      return A.hexToBytes;
    } }), Object.defineProperty(e, "numberToBytes", { enumerable: !0, get: function() {
      return A.numberToBytes;
    } }), Object.defineProperty(e, "stringToBytes", { enumerable: !0, get: function() {
      return A.stringToBytes;
    } });
    var jt = M();
    Object.defineProperty(e, "boolToHex", { enumerable: !0, get: function() {
      return jt.boolToHex;
    } }), Object.defineProperty(e, "bytesToHex", { enumerable: !0, get: function() {
      return jt.bytesToHex;
    } }), Object.defineProperty(e, "toHex", { enumerable: !0, get: function() {
      return jt.toHex;
    } }), Object.defineProperty(e, "numberToHex", { enumerable: !0, get: function() {
      return jt.numberToHex;
    } }), Object.defineProperty(e, "stringToHex", { enumerable: !0, get: function() {
      return jt.stringToHex;
    } });
    var ot = ke;
    Object.defineProperty(e, "bytesToBigInt", { enumerable: !0, get: function() {
      return ot.bytesToBigInt;
    } }), Object.defineProperty(e, "bytesToBigint", { enumerable: !0, get: function() {
      return ot.bytesToBigInt;
    } }), Object.defineProperty(e, "bytesToBool", { enumerable: !0, get: function() {
      return ot.bytesToBool;
    } }), Object.defineProperty(e, "bytesToNumber", { enumerable: !0, get: function() {
      return ot.bytesToNumber;
    } }), Object.defineProperty(e, "bytesToString", { enumerable: !0, get: function() {
      return ot.bytesToString;
    } }), Object.defineProperty(e, "fromBytes", { enumerable: !0, get: function() {
      return ot.fromBytes;
    } });
    var Pt = ue();
    Object.defineProperty(e, "fromHex", { enumerable: !0, get: function() {
      return Pt.fromHex;
    } }), Object.defineProperty(e, "hexToBool", { enumerable: !0, get: function() {
      return Pt.hexToBool;
    } }), Object.defineProperty(e, "hexToBigInt", { enumerable: !0, get: function() {
      return Pt.hexToBigInt;
    } }), Object.defineProperty(e, "hexToNumber", { enumerable: !0, get: function() {
      return Pt.hexToNumber;
    } }), Object.defineProperty(e, "hexToString", { enumerable: !0, get: function() {
      return Pt.hexToString;
    } });
    var _n = mt;
    Object.defineProperty(e, "fromRlp", { enumerable: !0, get: function() {
      return _n.fromRlp;
    } });
    var T = $t;
    Object.defineProperty(e, "containsNodeError", { enumerable: !0, get: function() {
      return T.containsNodeError;
    } }), Object.defineProperty(e, "getNodeError", { enumerable: !0, get: function() {
      return T.getNodeError;
    } });
    var O = ba;
    Object.defineProperty(e, "getCallError", { enumerable: !0, get: function() {
      return O.getCallError;
    } });
    var C = Mt;
    Object.defineProperty(e, "getContractError", { enumerable: !0, get: function() {
      return C.getContractError;
    } });
    var D = ca;
    Object.defineProperty(e, "getEstimateGasError", { enumerable: !0, get: function() {
      return D.getEstimateGasError;
    } });
    var qe = ha;
    Object.defineProperty(e, "getTransactionError", { enumerable: !0, get: function() {
      return qe.getTransactionError;
    } });
    var hn = Zt;
    Object.defineProperty(e, "defineFormatter", { enumerable: !0, get: function() {
      return hn.defineFormatter;
    } });
    var Ps = Gt;
    Object.defineProperty(e, "getEventSelector", { enumerable: !0, get: function() {
      return Ps.getEventSelector;
    } });
    var Ts = yt;
    Object.defineProperty(e, "getFunctionSelector", { enumerable: !0, get: function() {
      return Ts.getFunctionSelector;
    } });
    var Ga = cn;
    Object.defineProperty(e, "isHash", { enumerable: !0, get: function() {
      return Ga.isHash;
    } });
    var As = Ie;
    Object.defineProperty(e, "keccak256", { enumerable: !0, get: function() {
      return As.keccak256;
    } });
    var ws = Ba;
    Object.defineProperty(e, "sha256", { enumerable: !0, get: function() {
      return ws.sha256;
    } });
    var Os = Ma;
    Object.defineProperty(e, "ripemd160", { enumerable: !0, get: function() {
      return Os.ripemd160;
    } });
    var Is = Oa();
    Object.defineProperty(e, "hashTypedData", { enumerable: !0, get: function() {
      return Is.hashTypedData;
    } });
    var $s = $r;
    Object.defineProperty(e, "recoverAddress", { enumerable: !0, get: function() {
      return $s.recoverAddress;
    } });
    var Cs = dn;
    Object.defineProperty(e, "recoverMessageAddress", { enumerable: !0, get: function() {
      return Cs.recoverMessageAddress;
    } });
    var Ss = un;
    Object.defineProperty(e, "recoverPublicKey", { enumerable: !0, get: function() {
      return Ss.recoverPublicKey;
    } });
    var Rs = fn;
    Object.defineProperty(e, "recoverTypedDataAddress", { enumerable: !0, get: function() {
      return Rs.recoverTypedDataAddress;
    } });
    var Bs = ka;
    Object.defineProperty(e, "verifyMessage", { enumerable: !0, get: function() {
      return Bs.verifyMessage;
    } });
    var Ms = Da;
    Object.defineProperty(e, "verifyTypedData", { enumerable: !0, get: function() {
      return Ms.verifyTypedData;
    } });
    var pn = ln;
    Object.defineProperty(e, "hashMessage", { enumerable: !0, get: function() {
      return pn.hashMessage;
    } });
    var Fs = bn;
    Object.defineProperty(e, "getSerializedTransactionType", { enumerable: !0, get: function() {
      return Fs.getSerializedTransactionType;
    } });
    var Ns = Er;
    Object.defineProperty(e, "getTransactionType", { enumerable: !0, get: function() {
      return Ns.getTransactionType;
    } });
    var ks = vt;
    Object.defineProperty(e, "assertRequest", { enumerable: !0, get: function() {
      return ks.assertRequest;
    } });
    var Yt = Ye;
    Object.defineProperty(e, "assertTransactionEIP1559", { enumerable: !0, get: function() {
      return Yt.assertTransactionEIP1559;
    } }), Object.defineProperty(e, "assertTransactionEIP2930", { enumerable: !0, get: function() {
      return Yt.assertTransactionEIP2930;
    } }), Object.defineProperty(e, "assertTransactionLegacy", { enumerable: !0, get: function() {
      return Yt.assertTransactionLegacy;
    } });
    var er = It;
    Object.defineProperty(e, "parseTransaction", { enumerable: !0, get: function() {
      return er.parseTransaction;
    } });
    var tr = la();
    Object.defineProperty(e, "prepareTransactionRequest", { enumerable: !0, get: function() {
      return tr.prepareTransactionRequest;
    } });
    var Dt = jf();
    Object.defineProperty(e, "serializeTransaction", { enumerable: !0, get: function() {
      return Dt.serializeTransaction;
    } });
    var Sr = mn;
    Object.defineProperty(e, "serializeAccessList", { enumerable: !0, get: function() {
      return Sr.serializeAccessList;
    } });
    var vn = Wt;
    Object.defineProperty(e, "formatEther", { enumerable: !0, get: function() {
      return vn.formatEther;
    } });
    var Ds = ht;
    Object.defineProperty(e, "formatGwei", { enumerable: !0, get: function() {
      return Ds.formatGwei;
    } });
    var Hs = pr;
    Object.defineProperty(e, "formatUnits", { enumerable: !0, get: function() {
      return Hs.formatUnits;
    } });
    var Us = Cr;
    Object.defineProperty(e, "parseUnits", { enumerable: !0, get: function() {
      return Us.parseUnits;
    } });
    var Ls = Ha;
    Object.defineProperty(e, "parseEther", { enumerable: !0, get: function() {
      return Ls.parseEther;
    } });
    var qs = Ua;
    Object.defineProperty(e, "parseGwei", { enumerable: !0, get: function() {
      return qs.parseGwei;
    } });
  }(ic)), ic;
}
var md;
function qj() {
  if (md)
    return Bn;
  md = 1, Object.defineProperty(Bn, "__esModule", { value: !0 }), Bn.formatProof = void 0;
  const e = gn();
  function t(n) {
    return n.map((a) => ({
      ...a,
      value: BigInt(a.value)
    }));
  }
  function r(n) {
    return {
      ...n,
      balance: n.balance ? BigInt(n.balance) : void 0,
      nonce: n.nonce ? (0, e.hexToNumber)(n.nonce) : void 0,
      storageProof: n.storageProof ? t(n.storageProof) : void 0
    };
  }
  return Bn.formatProof = r, Bn;
}
var gd;
function xj() {
  if (gd)
    return Rn;
  gd = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.getProof = void 0;
  const e = M(), t = qj();
  async function r(n, { address: a, blockNumber: o, blockTag: i, storageKeys: s }) {
    const c = i ?? "latest", m = o !== void 0 ? (0, e.numberToHex)(o) : void 0, u = await n.request({
      method: "eth_getProof",
      params: [a, s, m || c]
    });
    return (0, t.formatProof)(u);
  }
  return Rn.getProof = r, Rn;
}
var pi = {};
Object.defineProperty(pi, "__esModule", { value: !0 });
pi.getStorageAt = void 0;
const zj = M();
async function Gj(e, { address: t, blockNumber: r, blockTag: n = "latest", slot: a }) {
  const o = r !== void 0 ? (0, zj.numberToHex)(r) : void 0;
  return await e.request({
    method: "eth_getStorageAt",
    params: [t, a, o || n]
  });
}
pi.getStorageAt = Gj;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.getTransaction = void 0;
const Wj = q, _c = M(), Vj = Vr;
async function Kj(e, { blockHash: t, blockNumber: r, blockTag: n, hash: a, index: o }) {
  var u, d, l;
  const i = n || "latest", s = r !== void 0 ? (0, _c.numberToHex)(r) : void 0;
  let c = null;
  if (a ? c = await e.request({
    method: "eth_getTransactionByHash",
    params: [a]
  }) : t ? c = await e.request({
    method: "eth_getTransactionByBlockHashAndIndex",
    params: [t, (0, _c.numberToHex)(o)]
  }) : (s || i) && (c = await e.request({
    method: "eth_getTransactionByBlockNumberAndIndex",
    params: [s || i, (0, _c.numberToHex)(o)]
  })), !c)
    throw new Wj.TransactionNotFoundError({
      blockHash: t,
      blockNumber: r,
      blockTag: i,
      hash: a,
      index: o
    });
  return (((l = (d = (u = e.chain) == null ? void 0 : u.formatters) == null ? void 0 : d.transaction) == null ? void 0 : l.format) || Vj.formatTransaction)(c);
}
yn.getTransaction = Kj;
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.getTransactionConfirmations = void 0;
const yd = X, Zj = gt, Jj = yn;
async function Xj(e, { hash: t, transactionReceipt: r }) {
  const [n, a] = await Promise.all([
    (0, yd.getAction)(e, Zj.getBlockNumber, "getBlockNumber")({}),
    t ? (0, yd.getAction)(e, Jj.getTransaction, "getBlockNumber")({ hash: t }) : void 0
  ]), o = (r == null ? void 0 : r.blockNumber) || (a == null ? void 0 : a.blockNumber);
  return o ? n - o + 1n : 0n;
}
vi.getTransactionConfirmations = Xj;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
La.getTransactionReceipt = void 0;
const Qj = q, Yj = xt;
async function eP(e, { hash: t }) {
  var a, o, i;
  const r = await e.request({
    method: "eth_getTransactionReceipt",
    params: [t]
  });
  if (!r)
    throw new Qj.TransactionReceiptNotFoundError({ hash: t });
  return (((i = (o = (a = e.chain) == null ? void 0 : a.formatters) == null ? void 0 : o.transactionReceipt) == null ? void 0 : i.format) || Yj.formatTransactionReceipt)(r);
}
La.getTransactionReceipt = eP;
var Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
Ei.multicall = void 0;
const tP = re, rP = Y(), nP = G, aP = be, oP = rt, iP = Ue, sP = nt, _d = Mt, cP = X, uP = tt;
async function dP(e, t) {
  var y;
  const { allowFailure: r = !0, batchSize: n, blockNumber: a, blockTag: o, contracts: i, multicallAddress: s } = t, c = n ?? (typeof ((y = e.batch) == null ? void 0 : y.multicall) == "object" && e.batch.multicall.batchSize || 1024);
  let m = s;
  if (!m) {
    if (!e.chain)
      throw new Error("client chain not configured. multicallAddress is required.");
    m = (0, sP.getChainContractAddress)({
      blockNumber: a,
      chain: e.chain,
      contract: "multicall3"
    });
  }
  const u = [[]];
  let d = 0, l = 0;
  for (let h = 0; h < i.length; h++) {
    const { abi: p, address: g, args: v, functionName: j } = i[h];
    try {
      const E = (0, iP.encodeFunctionData)({
        abi: p,
        args: v,
        functionName: j
      });
      l += (E.length - 2) / 2, c > 0 && l > c && u[d].length > 0 && (d++, l = (E.length - 2) / 2, u[d] = []), u[d] = [
        ...u[d],
        {
          allowFailure: !0,
          callData: E,
          target: g
        }
      ];
    } catch (E) {
      const P = (0, _d.getContractError)(E, {
        abi: p,
        address: g,
        args: v,
        docsPath: "/docs/contract/multicall",
        functionName: j
      });
      if (!r)
        throw P;
      u[d] = [
        ...u[d],
        {
          allowFailure: !0,
          callData: "0x",
          target: g
        }
      ];
    }
  }
  const f = await Promise.allSettled(u.map((h) => (0, cP.getAction)(e, uP.readContract, "readContract")({
    abi: tP.multicall3Abi,
    address: m,
    args: [h],
    blockNumber: a,
    blockTag: o,
    functionName: "aggregate3"
  }))), b = [];
  for (let h = 0; h < f.length; h++) {
    const p = f[h];
    if (p.status === "rejected") {
      if (!r)
        throw p.reason;
      for (let v = 0; v < u[h].length; v++)
        b.push({
          status: "failure",
          error: p.reason,
          result: void 0
        });
      continue;
    }
    const g = p.value;
    for (let v = 0; v < g.length; v++) {
      const { returnData: j, success: E } = g[v], { callData: P } = u[h][v], { abi: $, address: k, functionName: L, args: N } = i[b.length];
      try {
        if (P === "0x")
          throw new rP.AbiDecodingZeroDataError();
        if (!E)
          throw new aP.RawContractError({ data: j });
        const K = (0, oP.decodeFunctionResult)({
          abi: $,
          args: N,
          data: j,
          functionName: L
        });
        b.push(r ? { result: K, status: "success" } : K);
      } catch (K) {
        const x = (0, _d.getContractError)(K, {
          abi: $,
          address: k,
          args: N,
          docsPath: "/docs/contract/multicall",
          functionName: L
        });
        if (!r)
          throw x;
        b.push({ error: x, result: void 0, status: "failure" });
      }
    }
  }
  if (b.length !== i.length)
    throw new nP.BaseError("multicall results mismatch");
  return b;
}
Ei.multicall = dP;
var Fn = {}, Nn = {}, ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
ji.universalSignatureValidatorByteCode = void 0;
ji.universalSignatureValidatorByteCode = "0x60806040523480156200001157600080fd5b50604051620007003803806200070083398101604081905262000034916200056f565b6000620000438484846200004f565b9050806000526001601ff35b600080846001600160a01b0316803b806020016040519081016040528181526000908060200190933c90507f6492649264926492649264926492649264926492649264926492649264926492620000a68462000451565b036200021f57600060608085806020019051810190620000c79190620005ce565b8651929550909350915060000362000192576000836001600160a01b031683604051620000f5919062000643565b6000604051808303816000865af19150503d806000811462000134576040519150601f19603f3d011682016040523d82523d6000602084013e62000139565b606091505b5050905080620001905760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b505b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90620001c4908b90869060040162000661565b602060405180830381865afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200020891906200069d565b6001600160e01b031916149450505050506200044a565b805115620002b157604051630b135d3f60e11b808252906001600160a01b03871690631626ba7e9062000259908890889060040162000661565b602060405180830381865afa15801562000277573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029d91906200069d565b6001600160e01b031916149150506200044a565b8251604114620003195760405162461bcd60e51b815260206004820152603a6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e677468000000000000606482015260840162000187565b620003236200046b565b506020830151604080850151855186939260009185919081106200034b576200034b620006c9565b016020015160f81c9050601b81148015906200036b57508060ff16601c14155b15620003cf5760405162461bcd60e51b815260206004820152603b6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c75650000000000606482015260840162000187565b6040805160008152602081018083528a905260ff83169181019190915260608101849052608081018390526001600160a01b038a169060019060a0016020604051602081039080840390855afa1580156200042e573d6000803e3d6000fd5b505050602060405103516001600160a01b031614955050505050505b9392505050565b60006020825110156200046357600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b03811681146200049f57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620004d5578181015183820152602001620004bb565b50506000910152565b600082601f830112620004f057600080fd5b81516001600160401b03808211156200050d576200050d620004a2565b604051601f8301601f19908116603f01168101908282118183101715620005385762000538620004a2565b816040528381528660208588010111156200055257600080fd5b62000565846020830160208901620004b8565b9695505050505050565b6000806000606084860312156200058557600080fd5b8351620005928162000489565b6020850151604086015191945092506001600160401b03811115620005b657600080fd5b620005c486828701620004de565b9150509250925092565b600080600060608486031215620005e457600080fd5b8351620005f18162000489565b60208501519093506001600160401b03808211156200060f57600080fd5b6200061d87838801620004de565b935060408601519150808211156200063457600080fd5b50620005c486828701620004de565b6000825162000657818460208701620004b8565b9190910192915050565b828152604060208201526000825180604084015262000688816060850160208701620004b8565b601f01601f1916919091016060019392505050565b600060208284031215620006b057600080fd5b81516001600160e01b0319811681146200044a57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
var Pi = {};
const lP = /* @__PURE__ */ qr(ab);
Object.defineProperty(Pi, "__esModule", { value: !0 });
Pi.isBytesEqual = void 0;
const fP = lP, hd = de(), pd = ce;
function bP(e, t) {
  const r = (0, pd.isHex)(e) ? (0, hd.toBytes)(e) : e, n = (0, pd.isHex)(t) ? (0, hd.toBytes)(t) : t;
  return (0, fP.equalBytes)(r, n);
}
Pi.isBytesEqual = bP;
var vd;
function Pf() {
  if (vd)
    return Nn;
  vd = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.verifyHash = void 0;
  const e = re, t = ji, r = be, n = Pi, a = X, o = gn(), i = ma();
  async function s(c, { address: m, hash: u, signature: d, ...l }) {
    const f = (0, o.isHex)(d) ? d : (0, o.toHex)(d);
    try {
      const { data: b } = await (0, a.getAction)(c, i.call, "call")({
        data: (0, o.encodeDeployData)({
          abi: e.universalSignatureValidatorAbi,
          args: [m, u, f],
          bytecode: t.universalSignatureValidatorByteCode
        }),
        ...l
      });
      return (0, n.isBytesEqual)(b ?? "0x0", "0x1");
    } catch (b) {
      if (b instanceof r.CallExecutionError)
        return !1;
      throw b;
    }
  }
  return Nn.verifyHash = s, Nn;
}
var Ed;
function mP() {
  if (Ed)
    return Fn;
  Ed = 1, Object.defineProperty(Fn, "__esModule", { value: !0 }), Fn.verifyMessage = void 0;
  const e = gn(), t = Pf();
  async function r(n, { address: a, message: o, signature: i, ...s }) {
    const c = (0, e.hashMessage)(o);
    return (0, t.verifyHash)(n, {
      address: a,
      hash: c,
      signature: i,
      ...s
    });
  }
  return Fn.verifyMessage = r, Fn;
}
var kn = {}, jd;
function gP() {
  if (jd)
    return kn;
  jd = 1, Object.defineProperty(kn, "__esModule", { value: !0 }), kn.verifyTypedData = void 0;
  const e = Oa(), t = Pf();
  async function r(n, { address: a, signature: o, message: i, primaryType: s, types: c, domain: m, ...u }) {
    const d = (0, e.hashTypedData)({ message: i, primaryType: s, types: c, domain: m });
    return (0, t.verifyHash)(n, {
      address: a,
      hash: d,
      signature: o,
      ...u
    });
  }
  return kn.verifyTypedData = r, kn;
}
var Ti = {}, qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
qa.watchBlockNumber = void 0;
const yP = ue(), _P = X, hP = jr, pP = Xt, vP = _e, EP = gt;
function jP(e, { emitOnBegin: t = !1, emitMissed: r = !1, onBlockNumber: n, onError: a, poll: o, pollingInterval: i = e.pollingInterval }) {
  const s = typeof o < "u" ? o : e.transport.type !== "webSocket";
  let c;
  return s ? (() => {
    const d = (0, vP.stringify)([
      "watchBlockNumber",
      e.uid,
      t,
      r,
      i
    ]);
    return (0, hP.observe)(d, { onBlockNumber: n, onError: a }, (l) => (0, pP.poll)(async () => {
      var f;
      try {
        const b = await (0, _P.getAction)(e, EP.getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (c) {
          if (b === c)
            return;
          if (b - c > 1 && r)
            for (let y = c + 1n; y < b; y++)
              l.onBlockNumber(y, c), c = y;
        }
        (!c || b > c) && (l.onBlockNumber(b, c), c = b);
      } catch (b) {
        (f = l.onError) == null || f.call(l, b);
      }
    }, {
      emitOnBegin: t,
      interval: i
    }));
  })() : (() => {
    let d = !0, l = () => d = !1;
    return (async () => {
      try {
        const { unsubscribe: f } = await e.transport.subscribe({
          params: ["newHeads"],
          onData(b) {
            var h;
            if (!d)
              return;
            const y = (0, yP.hexToBigInt)((h = b.result) == null ? void 0 : h.number);
            n(y, c), c = y;
          },
          onError(b) {
            a == null || a(b);
          }
        });
        l = f, d || l();
      } catch (f) {
        a == null || a(f);
      }
    })(), l;
  })();
}
qa.watchBlockNumber = jP;
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.waitForTransactionReceipt = void 0;
const PP = Wr, hc = q, Dn = X, TP = jr, Pd = pa, AP = _e, wP = Nt, OP = yn, Td = La, IP = qa;
async function $P(e, { confirmations: t = 1, hash: r, onReplaced: n, pollingInterval: a = e.pollingInterval, timeout: o }) {
  const i = (0, AP.stringify)(["waitForTransactionReceipt", e.uid, r]);
  let s, c, m, u = !1;
  return new Promise((d, l) => {
    o && setTimeout(() => l(new hc.WaitForTransactionReceiptTimeoutError({ hash: r })), o);
    const f = (0, TP.observe)(i, { onReplaced: n, resolve: d, reject: l }, (b) => {
      const y = (0, Dn.getAction)(e, IP.watchBlockNumber, "watchBlockNumber")({
        emitMissed: !0,
        emitOnBegin: !0,
        poll: !0,
        pollingInterval: a,
        async onBlockNumber(h) {
          if (u)
            return;
          let p = h;
          const g = (v) => {
            y(), v(), f();
          };
          try {
            if (m) {
              if (t > 1 && (!m.blockNumber || p - m.blockNumber + 1n < t))
                return;
              g(() => b.resolve(m));
              return;
            }
            if (s || (u = !0, await (0, Pd.withRetry)(async () => {
              s = await (0, Dn.getAction)(e, OP.getTransaction, "getTransaction")({ hash: r }), s.blockNumber && (p = s.blockNumber);
            }, {
              delay: ({ count: v }) => ~~(1 << v) * 200,
              retryCount: 6
            }), u = !1), m = await (0, Dn.getAction)(e, Td.getTransactionReceipt, "getTransactionReceipt")({ hash: r }), t > 1 && (!m.blockNumber || p - m.blockNumber + 1n < t))
              return;
            g(() => b.resolve(m));
          } catch (v) {
            if (s && (v instanceof hc.TransactionNotFoundError || v instanceof hc.TransactionReceiptNotFoundError))
              try {
                c = s, u = !0;
                const j = await (0, Pd.withRetry)(() => (0, Dn.getAction)(e, wP.getBlock, "getBlock")({
                  blockNumber: p,
                  includeTransactions: !0
                }), {
                  delay: ({ count: $ }) => ~~(1 << $) * 200,
                  retryCount: 6,
                  shouldRetry: ({ error: $ }) => $ instanceof PP.BlockNotFoundError
                });
                u = !1;
                const E = j.transactions.find(({ from: $, nonce: k }) => $ === c.from && k === c.nonce);
                if (!E || (m = await (0, Dn.getAction)(e, Td.getTransactionReceipt, "getTransactionReceipt")({
                  hash: E.hash
                }), t > 1 && (!m.blockNumber || p - m.blockNumber + 1n < t)))
                  return;
                let P = "replaced";
                E.to === c.to && E.value === c.value ? P = "repriced" : E.from === E.to && E.value === 0n && (P = "cancelled"), g(() => {
                  var $;
                  ($ = b.onReplaced) == null || $.call(b, {
                    reason: P,
                    replacedTransaction: c,
                    transaction: E,
                    transactionReceipt: m
                  }), b.resolve(m);
                });
              } catch (j) {
                g(() => b.reject(j));
              }
            else
              g(() => b.reject(v));
          }
        }
      });
    });
  });
}
Ti.waitForTransactionReceipt = $P;
var Ai = {};
Object.defineProperty(Ai, "__esModule", { value: !0 });
Ai.watchBlocks = void 0;
const CP = Ct, Ad = X, SP = jr, RP = Xt, BP = _e, wd = Nt;
function MP(e, { blockTag: t = "latest", emitMissed: r = !1, emitOnBegin: n = !1, onBlock: a, onError: o, includeTransactions: i, poll: s, pollingInterval: c = e.pollingInterval }) {
  const m = typeof s < "u" ? s : e.transport.type !== "webSocket", u = i ?? !1;
  let d;
  return m ? (() => {
    const b = (0, BP.stringify)([
      "watchBlocks",
      e.uid,
      r,
      n,
      u,
      c
    ]);
    return (0, SP.observe)(b, { onBlock: a, onError: o }, (y) => (0, RP.poll)(async () => {
      var h;
      try {
        const p = await (0, Ad.getAction)(e, wd.getBlock, "getBlock")({
          blockTag: t,
          includeTransactions: u
        });
        if (p.number && (d != null && d.number)) {
          if (p.number === d.number)
            return;
          if (p.number - d.number > 1 && r)
            for (let g = (d == null ? void 0 : d.number) + 1n; g < p.number; g++) {
              const v = await (0, Ad.getAction)(e, wd.getBlock, "getBlock")({
                blockNumber: g,
                includeTransactions: u
              });
              y.onBlock(v, d), d = v;
            }
        }
        (!(d != null && d.number) || t === "pending" && !(p != null && p.number) || p.number && p.number > d.number) && (y.onBlock(p, d), d = p);
      } catch (p) {
        (h = y.onError) == null || h.call(y, p);
      }
    }, {
      emitOnBegin: n,
      interval: c
    }));
  })() : (() => {
    let b = !0, y = () => b = !1;
    return (async () => {
      try {
        const { unsubscribe: h } = await e.transport.subscribe({
          params: ["newHeads"],
          onData(p) {
            var j, E, P;
            if (!b)
              return;
            const v = (((P = (E = (j = e.chain) == null ? void 0 : j.formatters) == null ? void 0 : E.block) == null ? void 0 : P.format) || CP.formatBlock)(p.result);
            a(v, d), d = v;
          },
          onError(p) {
            o == null || o(p);
          }
        });
        y = h, b || y();
      } catch (h) {
        o == null || o(h);
      }
    })(), y;
  })();
}
Ai.watchBlocks = MP;
var Hn = {}, Od;
function FP() {
  if (Od)
    return Hn;
  Od = 1, Object.defineProperty(Hn, "__esModule", { value: !0 }), Hn.watchEvent = void 0;
  const e = jr, t = Xt, r = _e, n = Y(), a = F, o = X, i = gn(), s = Pa, c = gt, m = Pr, u = Jr, d = Tr;
  function l(f, { address: b, args: y, batch: h = !0, event: p, events: g, onError: v, onLogs: j, poll: E, pollingInterval: P = f.pollingInterval, strict: $ }) {
    const k = typeof E < "u" ? E : f.transport.type !== "webSocket", L = $ ?? !1;
    return k ? (() => {
      const x = (0, r.stringify)([
        "watchEvent",
        b,
        y,
        h,
        f.uid,
        p,
        P
      ]);
      return (0, e.observe)(x, { onLogs: j, onError: v }, (R) => {
        let w, I, z = !1;
        const W = (0, t.poll)(async () => {
          var ee;
          if (!z) {
            try {
              I = await (0, o.getAction)(f, s.createEventFilter, "createEventFilter")({
                address: b,
                args: y,
                event: p,
                events: g,
                strict: L
              });
            } catch {
            }
            z = !0;
            return;
          }
          try {
            let H;
            if (I)
              H = await (0, o.getAction)(f, m.getFilterChanges, "getFilterChanges")({ filter: I });
            else {
              const Z = await (0, o.getAction)(f, c.getBlockNumber, "getBlockNumber")({});
              w && w !== Z ? H = await (0, o.getAction)(f, u.getLogs, "getLogs")({
                address: b,
                args: y,
                event: p,
                events: g,
                fromBlock: w + 1n,
                toBlock: Z
              }) : H = [], w = Z;
            }
            if (H.length === 0)
              return;
            if (h)
              R.onLogs(H);
            else
              for (const Z of H)
                R.onLogs([Z]);
          } catch (H) {
            I && H instanceof a.InvalidInputRpcError && (z = !1), (ee = R.onError) == null || ee.call(R, H);
          }
        }, {
          emitOnBegin: !0,
          interval: P
        });
        return async () => {
          I && await (0, o.getAction)(f, d.uninstallFilter, "uninstallFilter")({ filter: I }), W();
        };
      });
    })() : (() => {
      let x = !0, R = () => x = !1;
      return (async () => {
        try {
          const w = g ?? (p ? [p] : void 0);
          let I = [];
          w && (I = [
            w.flatMap((W) => (0, i.encodeEventTopics)({
              abi: [W],
              eventName: W.name,
              args: y
            }))
          ], p && (I = I[0]));
          const { unsubscribe: z } = await f.transport.subscribe({
            params: ["logs", { address: b, topics: I }],
            onData(W) {
              var H;
              if (!x)
                return;
              const ee = W.result;
              try {
                const { eventName: Z, args: ne } = (0, i.decodeEventLog)({
                  abi: w,
                  data: ee.data,
                  topics: ee.topics,
                  strict: L
                }), ie = (0, i.formatLog)(ee, {
                  args: ne,
                  eventName: Z
                });
                j([ie]);
              } catch (Z) {
                let ne, ie;
                if (Z instanceof n.DecodeLogDataMismatch || Z instanceof n.DecodeLogTopicsMismatch) {
                  if ($)
                    return;
                  ne = Z.abiItem.name, ie = (H = Z.abiItem.inputs) == null ? void 0 : H.some((Te) => !("name" in Te && Te.name));
                }
                const me = (0, i.formatLog)(ee, {
                  args: ie ? [] : {},
                  eventName: ne
                });
                j([me]);
              }
            },
            onError(W) {
              v == null || v(W);
            }
          });
          R = z, x || R();
        } catch (w) {
          v == null || v(w);
        }
      })(), R;
    })();
  }
  return Hn.watchEvent = l, Hn;
}
var wi = {};
Object.defineProperty(wi, "__esModule", { value: !0 });
wi.watchPendingTransactions = void 0;
const pc = X, NP = jr, kP = Xt, DP = _e, HP = Ta, UP = Pr, LP = Tr;
function qP(e, { batch: t = !0, onError: r, onTransactions: n, poll: a, pollingInterval: o = e.pollingInterval }) {
  return (typeof a < "u" ? a : e.transport.type !== "webSocket") ? (() => {
    const m = (0, DP.stringify)([
      "watchPendingTransactions",
      e.uid,
      t,
      o
    ]);
    return (0, NP.observe)(m, { onTransactions: n, onError: r }, (u) => {
      let d;
      const l = (0, kP.poll)(async () => {
        var f;
        try {
          if (!d)
            try {
              d = await (0, pc.getAction)(e, HP.createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (y) {
              throw l(), y;
            }
          const b = await (0, pc.getAction)(e, UP.getFilterChanges, "getFilterChanges")({ filter: d });
          if (b.length === 0)
            return;
          if (t)
            u.onTransactions(b);
          else
            for (const y of b)
              u.onTransactions([y]);
        } catch (b) {
          (f = u.onError) == null || f.call(u, b);
        }
      }, {
        emitOnBegin: !0,
        interval: o
      });
      return async () => {
        d && await (0, pc.getAction)(e, LP.uninstallFilter, "uninstallFilter")({ filter: d }), l();
      };
    });
  })() : (() => {
    let m = !0, u = () => m = !1;
    return (async () => {
      try {
        const { unsubscribe: d } = await e.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(l) {
            if (!m)
              return;
            const f = l.result;
            n([f]);
          },
          onError(l) {
            r == null || r(l);
          }
        });
        u = d, m || u();
      } catch (d) {
        r == null || r(d);
      }
    })(), u;
  })();
}
wi.watchPendingTransactions = qP;
var Id;
function Tf() {
  if (Id)
    return Sn;
  Id = 1, Object.defineProperty(Sn, "__esModule", { value: !0 }), Sn.publicActions = void 0;
  const e = ri, t = ai, r = si, n = ci, a = ja, o = ma(), i = ui, s = zr, c = Pa, m = Ta, u = oa, d = lr, l = Uc(), f = fr, b = di, y = Nt, h = gt, p = li, g = fi, v = wr, j = Zr, E = bi, P = Pr, $ = gi, k = Kr, L = Jr, N = xj(), K = pi, x = yn, R = vi, w = da, I = La, z = Ei, W = tt, ee = ga, H = Tr, Z = mP(), ne = gP(), ie = Ti, me = qa, Te = Ai, he = ya, Se = FP(), at = wi, Le = la(), Ke = en;
  function Ze(B) {
    return {
      call: (A) => (0, o.call)(B, A),
      createBlockFilter: () => (0, i.createBlockFilter)(B),
      createContractEventFilter: (A) => (0, s.createContractEventFilter)(B, A),
      createEventFilter: (A) => (0, c.createEventFilter)(B, A),
      createPendingTransactionFilter: () => (0, m.createPendingTransactionFilter)(B),
      estimateContractGas: (A) => (0, u.estimateContractGas)(B, A),
      estimateGas: (A) => (0, l.estimateGas)(B, A),
      getBalance: (A) => (0, b.getBalance)(B, A),
      getBlock: (A) => (0, y.getBlock)(B, A),
      getBlockNumber: (A) => (0, h.getBlockNumber)(B, A),
      getBlockTransactionCount: (A) => (0, p.getBlockTransactionCount)(B, A),
      getBytecode: (A) => (0, g.getBytecode)(B, A),
      getChainId: () => (0, v.getChainId)(B),
      getContractEvents: (A) => (0, j.getContractEvents)(B, A),
      getEnsAddress: (A) => (0, e.getEnsAddress)(B, A),
      getEnsAvatar: (A) => (0, t.getEnsAvatar)(B, A),
      getEnsName: (A) => (0, r.getEnsName)(B, A),
      getEnsResolver: (A) => (0, n.getEnsResolver)(B, A),
      getEnsText: (A) => (0, a.getEnsText)(B, A),
      getFeeHistory: (A) => (0, E.getFeeHistory)(B, A),
      estimateFeesPerGas: (A) => (0, d.estimateFeesPerGas)(B, A),
      getFilterChanges: (A) => (0, P.getFilterChanges)(B, A),
      getFilterLogs: (A) => (0, $.getFilterLogs)(B, A),
      getGasPrice: () => (0, k.getGasPrice)(B),
      getLogs: (A) => (0, L.getLogs)(B, A),
      getProof: (A) => (0, N.getProof)(B, A),
      estimateMaxPriorityFeePerGas: (A) => (0, f.estimateMaxPriorityFeePerGas)(B, A),
      getStorageAt: (A) => (0, K.getStorageAt)(B, A),
      getTransaction: (A) => (0, x.getTransaction)(B, A),
      getTransactionConfirmations: (A) => (0, R.getTransactionConfirmations)(B, A),
      getTransactionCount: (A) => (0, w.getTransactionCount)(B, A),
      getTransactionReceipt: (A) => (0, I.getTransactionReceipt)(B, A),
      multicall: (A) => (0, z.multicall)(B, A),
      prepareTransactionRequest: (A) => (0, Le.prepareTransactionRequest)(B, A),
      readContract: (A) => (0, W.readContract)(B, A),
      sendRawTransaction: (A) => (0, Ke.sendRawTransaction)(B, A),
      simulateContract: (A) => (0, ee.simulateContract)(B, A),
      verifyMessage: (A) => (0, Z.verifyMessage)(B, A),
      verifyTypedData: (A) => (0, ne.verifyTypedData)(B, A),
      uninstallFilter: (A) => (0, H.uninstallFilter)(B, A),
      waitForTransactionReceipt: (A) => (0, ie.waitForTransactionReceipt)(B, A),
      watchBlocks: (A) => (0, Te.watchBlocks)(B, A),
      watchBlockNumber: (A) => (0, me.watchBlockNumber)(B, A),
      watchContractEvent: (A) => (0, he.watchContractEvent)(B, A),
      watchEvent: (A) => (0, Se.watchEvent)(B, A),
      watchPendingTransactions: (A) => (0, at.watchPendingTransactions)(B, A)
    };
  }
  return Sn.publicActions = Ze, Sn;
}
var $d;
function xP() {
  if ($d)
    return Cn;
  $d = 1, Object.defineProperty(Cn, "__esModule", { value: !0 }), Cn.createPublicClient = void 0;
  const e = Or, t = Tf();
  function r(n) {
    const { key: a = "public", name: o = "Public Client" } = n;
    return (0, e.createClient)({
      ...n,
      key: a,
      name: o,
      type: "publicClient"
    }).extend(t.publicActions);
  }
  return Cn.createPublicClient = r, Cn;
}
var Oi = {}, xa = {}, Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
Ii.dropTransaction = void 0;
async function zP(e, { hash: t }) {
  await e.request({
    method: `${e.mode}_dropTransaction`,
    params: [t]
  });
}
Ii.dropTransaction = zP;
var $i = {};
Object.defineProperty($i, "__esModule", { value: !0 });
$i.dumpState = void 0;
async function GP(e) {
  return e.request({
    method: `${e.mode}_dumpState`
  });
}
$i.dumpState = GP;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
Ci.getAutomine = void 0;
async function WP(e) {
  return e.mode === "ganache" ? await e.request({
    method: "eth_mining"
  }) : await e.request({
    method: `${e.mode}_getAutomine`
  });
}
Ci.getAutomine = WP;
var Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
Si.getTxpoolContent = void 0;
async function VP(e) {
  return await e.request({
    method: "txpool_content"
  });
}
Si.getTxpoolContent = VP;
var Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
Ri.getTxpoolStatus = void 0;
const Cd = ue();
async function KP(e) {
  const { pending: t, queued: r } = await e.request({
    method: "txpool_status"
  });
  return {
    pending: (0, Cd.hexToNumber)(t),
    queued: (0, Cd.hexToNumber)(r)
  };
}
Ri.getTxpoolStatus = KP;
var Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
Bi.impersonateAccount = void 0;
async function ZP(e, { address: t }) {
  await e.request({
    method: `${e.mode}_impersonateAccount`,
    params: [t]
  });
}
Bi.impersonateAccount = ZP;
var Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.increaseTime = void 0;
const JP = M();
async function XP(e, { seconds: t }) {
  return await e.request({
    method: "evm_increaseTime",
    params: [(0, JP.numberToHex)(t)]
  });
}
Mi.increaseTime = XP;
var Fi = {};
Object.defineProperty(Fi, "__esModule", { value: !0 });
Fi.inspectTxpool = void 0;
async function QP(e) {
  return await e.request({
    method: "txpool_inspect"
  });
}
Fi.inspectTxpool = QP;
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
Ni.loadState = void 0;
async function YP(e, { state: t }) {
  await e.request({
    method: `${e.mode}_loadState`,
    params: [t]
  });
}
Ni.loadState = YP;
var ki = {};
Object.defineProperty(ki, "__esModule", { value: !0 });
ki.mine = void 0;
const vc = M();
async function eT(e, { blocks: t, interval: r }) {
  e.mode === "ganache" ? await e.request({
    method: "evm_mine",
    params: [{ blocks: (0, vc.numberToHex)(t) }]
  }) : await e.request({
    method: `${e.mode}_mine`,
    params: [(0, vc.numberToHex)(t), (0, vc.numberToHex)(r || 0)]
  });
}
ki.mine = eT;
var Di = {};
Object.defineProperty(Di, "__esModule", { value: !0 });
Di.removeBlockTimestampInterval = void 0;
async function tT(e) {
  await e.request({
    method: `${e.mode}_removeBlockTimestampInterval`
  });
}
Di.removeBlockTimestampInterval = tT;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
Hi.reset = void 0;
async function rT(e, { blockNumber: t, jsonRpcUrl: r } = {}) {
  await e.request({
    method: `${e.mode}_reset`,
    params: [{ forking: { blockNumber: Number(t), jsonRpcUrl: r } }]
  });
}
Hi.reset = rT;
var Ui = {};
Object.defineProperty(Ui, "__esModule", { value: !0 });
Ui.revert = void 0;
async function nT(e, { id: t }) {
  await e.request({
    method: "evm_revert",
    params: [t]
  });
}
Ui.revert = nT;
var Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
Li.sendUnsignedTransaction = void 0;
const aT = Vt, oT = Kt;
async function iT(e, t) {
  var p, g, v;
  const { accessList: r, data: n, from: a, gas: o, gasPrice: i, maxFeePerGas: s, maxPriorityFeePerGas: c, nonce: m, to: u, value: d, ...l } = t, f = (v = (g = (p = e.chain) == null ? void 0 : p.formatters) == null ? void 0 : g.transactionRequest) == null ? void 0 : v.format, y = (f || oT.formatTransactionRequest)({
    ...(0, aT.extract)(l, { format: f }),
    accessList: r,
    data: n,
    from: a,
    gas: o,
    gasPrice: i,
    maxFeePerGas: s,
    maxPriorityFeePerGas: c,
    nonce: m,
    to: u,
    value: d
  });
  return await e.request({
    method: "eth_sendUnsignedTransaction",
    params: [y]
  });
}
Li.sendUnsignedTransaction = iT;
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.setAutomine = void 0;
async function sT(e, t) {
  e.mode === "ganache" ? t ? await e.request({ method: "miner_start" }) : await e.request({ method: "miner_stop" }) : await e.request({
    method: "evm_setAutomine",
    params: [t]
  });
}
qi.setAutomine = sT;
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.setBalance = void 0;
const Sd = M();
async function cT(e, { address: t, value: r }) {
  e.mode === "ganache" ? await e.request({
    method: "evm_setAccountBalance",
    params: [t, (0, Sd.numberToHex)(r)]
  }) : await e.request({
    method: `${e.mode}_setBalance`,
    params: [t, (0, Sd.numberToHex)(r)]
  });
}
xi.setBalance = cT;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.setBlockGasLimit = void 0;
const uT = M();
async function dT(e, { gasLimit: t }) {
  await e.request({
    method: "evm_setBlockGasLimit",
    params: [(0, uT.numberToHex)(t)]
  });
}
zi.setBlockGasLimit = dT;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.setBlockTimestampInterval = void 0;
async function lT(e, { interval: t }) {
  const r = e.mode === "hardhat" ? t * 1e3 : t;
  await e.request({
    method: `${e.mode}_setBlockTimestampInterval`,
    params: [r]
  });
}
Gi.setBlockTimestampInterval = lT;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.setCode = void 0;
async function fT(e, { address: t, bytecode: r }) {
  await e.request({
    method: `${e.mode}_setCode`,
    params: [t, r]
  });
}
Wi.setCode = fT;
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.setCoinbase = void 0;
async function bT(e, { address: t }) {
  await e.request({
    method: `${e.mode}_setCoinbase`,
    params: [t]
  });
}
Vi.setCoinbase = bT;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
Ki.setIntervalMining = void 0;
async function mT(e, { interval: t }) {
  const r = e.mode === "hardhat" ? t * 1e3 : t;
  await e.request({
    method: "evm_setIntervalMining",
    params: [r]
  });
}
Ki.setIntervalMining = mT;
var Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.setLoggingEnabled = void 0;
async function gT(e, t) {
  await e.request({
    method: `${e.mode}_setLoggingEnabled`,
    params: [t]
  });
}
Zi.setLoggingEnabled = gT;
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.setMinGasPrice = void 0;
const yT = M();
async function _T(e, { gasPrice: t }) {
  await e.request({
    method: `${e.mode}_setMinGasPrice`,
    params: [(0, yT.numberToHex)(t)]
  });
}
Ji.setMinGasPrice = _T;
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.setNextBlockBaseFeePerGas = void 0;
const hT = M();
async function pT(e, { baseFeePerGas: t }) {
  await e.request({
    method: `${e.mode}_setNextBlockBaseFeePerGas`,
    params: [(0, hT.numberToHex)(t)]
  });
}
Xi.setNextBlockBaseFeePerGas = pT;
var Qi = {};
Object.defineProperty(Qi, "__esModule", { value: !0 });
Qi.setNextBlockTimestamp = void 0;
const vT = M();
async function ET(e, { timestamp: t }) {
  await e.request({
    method: "evm_setNextBlockTimestamp",
    params: [(0, vT.numberToHex)(t)]
  });
}
Qi.setNextBlockTimestamp = ET;
var Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.setNonce = void 0;
const jT = M();
async function PT(e, { address: t, nonce: r }) {
  await e.request({
    method: `${e.mode}_setNonce`,
    params: [t, (0, jT.numberToHex)(r)]
  });
}
Yi.setNonce = PT;
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.setRpcUrl = void 0;
async function TT(e, t) {
  await e.request({
    method: `${e.mode}_setRpcUrl`,
    params: [t]
  });
}
es.setRpcUrl = TT;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.setStorageAt = void 0;
const AT = M();
async function wT(e, { address: t, index: r, value: n }) {
  await e.request({
    method: `${e.mode}_setStorageAt`,
    params: [
      t,
      typeof r == "number" ? (0, AT.numberToHex)(r) : r,
      n
    ]
  });
}
ts.setStorageAt = wT;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.snapshot = void 0;
async function OT(e) {
  return await e.request({
    method: "evm_snapshot"
  });
}
rs.snapshot = OT;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.stopImpersonatingAccount = void 0;
async function IT(e, { address: t }) {
  await e.request({
    method: `${e.mode}_stopImpersonatingAccount`,
    params: [t]
  });
}
ns.stopImpersonatingAccount = IT;
Object.defineProperty(xa, "__esModule", { value: !0 });
xa.testActions = void 0;
const $T = Ii, CT = $i, ST = Ci, RT = Si, BT = Ri, MT = Bi, FT = Mi, NT = Fi, kT = Ni, DT = ki, HT = Di, UT = Hi, LT = Ui, qT = Li, xT = qi, zT = xi, GT = zi, WT = Gi, VT = Wi, KT = Vi, ZT = Ki, JT = Zi, XT = Ji, QT = Xi, YT = Qi, eA = Yi, tA = es, rA = ts, nA = rs, aA = ns;
function oA({ mode: e }) {
  return (t) => {
    const r = t.extend(() => ({
      mode: e
    }));
    return {
      dropTransaction: (n) => (0, $T.dropTransaction)(r, n),
      dumpState: () => (0, CT.dumpState)(r),
      getAutomine: () => (0, ST.getAutomine)(r),
      getTxpoolContent: () => (0, RT.getTxpoolContent)(r),
      getTxpoolStatus: () => (0, BT.getTxpoolStatus)(r),
      impersonateAccount: (n) => (0, MT.impersonateAccount)(r, n),
      increaseTime: (n) => (0, FT.increaseTime)(r, n),
      inspectTxpool: () => (0, NT.inspectTxpool)(r),
      loadState: (n) => (0, kT.loadState)(r, n),
      mine: (n) => (0, DT.mine)(r, n),
      removeBlockTimestampInterval: () => (0, HT.removeBlockTimestampInterval)(r),
      reset: (n) => (0, UT.reset)(r, n),
      revert: (n) => (0, LT.revert)(r, n),
      sendUnsignedTransaction: (n) => (0, qT.sendUnsignedTransaction)(r, n),
      setAutomine: (n) => (0, xT.setAutomine)(r, n),
      setBalance: (n) => (0, zT.setBalance)(r, n),
      setBlockGasLimit: (n) => (0, GT.setBlockGasLimit)(r, n),
      setBlockTimestampInterval: (n) => (0, WT.setBlockTimestampInterval)(r, n),
      setCode: (n) => (0, VT.setCode)(r, n),
      setCoinbase: (n) => (0, KT.setCoinbase)(r, n),
      setIntervalMining: (n) => (0, ZT.setIntervalMining)(r, n),
      setLoggingEnabled: (n) => (0, JT.setLoggingEnabled)(r, n),
      setMinGasPrice: (n) => (0, XT.setMinGasPrice)(r, n),
      setNextBlockBaseFeePerGas: (n) => (0, QT.setNextBlockBaseFeePerGas)(r, n),
      setNextBlockTimestamp: (n) => (0, YT.setNextBlockTimestamp)(r, n),
      setNonce: (n) => (0, eA.setNonce)(r, n),
      setRpcUrl: (n) => (0, tA.setRpcUrl)(r, n),
      setStorageAt: (n) => (0, rA.setStorageAt)(r, n),
      snapshot: () => (0, nA.snapshot)(r),
      stopImpersonatingAccount: (n) => (0, aA.stopImpersonatingAccount)(r, n)
    };
  };
}
xa.testActions = oA;
Object.defineProperty(Oi, "__esModule", { value: !0 });
Oi.createTestClient = void 0;
const iA = Or, sA = xa;
function cA(e) {
  const { key: t = "test", name: r = "Test Client", mode: n } = e;
  return (0, iA.createClient)({
    ...e,
    key: t,
    name: r,
    type: "testClient"
  }).extend((o) => ({
    mode: n,
    ...(0, sA.testActions)({ mode: n })(o)
  }));
}
Oi.createTestClient = cA;
var Un = {}, as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.addChain = void 0;
const uA = M();
async function dA(e, { chain: t }) {
  const { id: r, name: n, nativeCurrency: a, rpcUrls: o, blockExplorers: i } = t;
  await e.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: (0, uA.numberToHex)(r),
        chainName: n,
        nativeCurrency: a,
        rpcUrls: o.default.http,
        blockExplorerUrls: i ? Object.values(i).map(({ url: s }) => s) : void 0
      }
    ]
  });
}
as.addChain = dA;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
os.deployContract = void 0;
const lA = on, fA = Yr;
function bA(e, { abi: t, args: r, bytecode: n, ...a }) {
  const o = (0, lA.encodeDeployData)({
    abi: t,
    args: r,
    bytecode: n
  });
  return (0, fA.sendTransaction)(e, {
    ...a,
    data: o
  });
}
os.deployContract = bA;
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
is.getAddresses = void 0;
const mA = Be;
async function gA(e) {
  var r;
  return ((r = e.account) == null ? void 0 : r.type) === "local" ? [e.account.address] : (await e.request({ method: "eth_accounts" })).map((n) => (0, mA.checksumAddress)(n));
}
is.getAddresses = gA;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.getPermissions = void 0;
async function yA(e) {
  return await e.request({ method: "wallet_getPermissions" });
}
ss.getPermissions = yA;
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.requestAddresses = void 0;
const _A = Be;
async function hA(e) {
  return (await e.request({ method: "eth_requestAccounts" })).map((r) => (0, _A.getAddress)(r));
}
cs.requestAddresses = hA;
var us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
us.requestPermissions = void 0;
async function pA(e, t) {
  return e.request({
    method: "wallet_requestPermissions",
    params: [t]
  });
}
us.requestPermissions = pA;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.signMessage = void 0;
const vA = Pe, EA = Ft, Rd = M();
async function jA(e, { account: t = e.account, message: r }) {
  if (!t)
    throw new EA.AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const n = (0, vA.parseAccount)(t);
  if (n.type === "local")
    return n.signMessage({ message: r });
  const a = typeof r == "string" ? (0, Rd.stringToHex)(r) : r.raw instanceof Uint8Array ? (0, Rd.toHex)(r.raw) : r.raw;
  return e.request({
    method: "personal_sign",
    params: [a, n.address]
  });
}
ds.signMessage = jA;
var Ln = {}, Bd;
function PA() {
  if (Bd)
    return Ln;
  Bd = 1, Object.defineProperty(Ln, "__esModule", { value: !0 }), Ln.signTransaction = void 0;
  const e = Pe, t = Ft, r = Ar, n = Kt, a = X, o = gn(), i = vt, s = wr;
  async function c(m, u) {
    var g, v, j, E;
    const { account: d = m.account, chain: l = m.chain, ...f } = u;
    if (!d)
      throw new t.AccountNotFoundError({
        docsPath: "/docs/actions/wallet/signTransaction"
      });
    const b = (0, e.parseAccount)(d);
    (0, i.assertRequest)({
      account: b,
      ...u
    });
    const y = await (0, a.getAction)(m, s.getChainId, "getChainId")({});
    l !== null && (0, r.assertCurrentChain)({
      currentChainId: y,
      chain: l
    });
    const h = (l == null ? void 0 : l.formatters) || ((g = m.chain) == null ? void 0 : g.formatters), p = ((v = h == null ? void 0 : h.transactionRequest) == null ? void 0 : v.format) || n.formatTransactionRequest;
    return b.type === "local" ? b.signTransaction({
      ...f,
      chainId: y
    }, { serializer: (E = (j = m.chain) == null ? void 0 : j.serializers) == null ? void 0 : E.transaction }) : await m.request({
      method: "eth_signTransaction",
      params: [
        {
          ...p(f),
          chainId: (0, o.numberToHex)(y),
          from: b.address
        }
      ]
    });
  }
  return Ln.signTransaction = c, Ln;
}
var ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.signTypedData = void 0;
const TA = Pe, AA = Ft, wA = ce, OA = _e, Md = yi();
async function IA(e, { account: t = e.account, domain: r, message: n, primaryType: a, types: o }) {
  if (!t)
    throw new AA.AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signTypedData"
    });
  const i = (0, TA.parseAccount)(t), s = {
    EIP712Domain: (0, Md.getTypesForEIP712Domain)({ domain: r }),
    ...o
  };
  if ((0, Md.validateTypedData)({
    domain: r,
    message: n,
    primaryType: a,
    types: s
  }), i.type === "local")
    return i.signTypedData({
      domain: r,
      primaryType: a,
      types: s,
      message: n
    });
  const c = (0, OA.stringify)({ domain: r ?? {}, primaryType: a, types: s, message: n }, (m, u) => (0, wA.isHex)(u) ? u.toLowerCase() : u);
  return e.request({
    method: "eth_signTypedData_v4",
    params: [i.address, c]
  });
}
ls.signTypedData = IA;
var fs = {};
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.switchChain = void 0;
const $A = M();
async function CA(e, { id: t }) {
  await e.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: (0, $A.numberToHex)(t)
      }
    ]
  });
}
fs.switchChain = CA;
var bs = {};
Object.defineProperty(bs, "__esModule", { value: !0 });
bs.watchAsset = void 0;
async function SA(e, t) {
  return await e.request({
    method: "wallet_watchAsset",
    params: t
  });
}
bs.watchAsset = SA;
var Fd;
function Af() {
  if (Fd)
    return Un;
  Fd = 1, Object.defineProperty(Un, "__esModule", { value: !0 }), Un.walletActions = void 0;
  const e = wr, t = as, r = os, n = is, a = ss, o = la(), i = cs, s = us, c = en, m = Yr, u = ds, d = PA(), l = ls, f = fs, b = bs, y = _a;
  function h(p) {
    return {
      addChain: (g) => (0, t.addChain)(p, g),
      deployContract: (g) => (0, r.deployContract)(p, g),
      getAddresses: () => (0, n.getAddresses)(p),
      getChainId: () => (0, e.getChainId)(p),
      getPermissions: () => (0, a.getPermissions)(p),
      prepareTransactionRequest: (g) => (0, o.prepareTransactionRequest)(p, g),
      requestAddresses: () => (0, i.requestAddresses)(p),
      requestPermissions: (g) => (0, s.requestPermissions)(p, g),
      sendRawTransaction: (g) => (0, c.sendRawTransaction)(p, g),
      sendTransaction: (g) => (0, m.sendTransaction)(p, g),
      signMessage: (g) => (0, u.signMessage)(p, g),
      signTransaction: (g) => (0, d.signTransaction)(p, g),
      signTypedData: (g) => (0, l.signTypedData)(p, g),
      switchChain: (g) => (0, f.switchChain)(p, g),
      watchAsset: (g) => (0, b.watchAsset)(p, g),
      writeContract: (g) => (0, y.writeContract)(p, g)
    };
  }
  return Un.walletActions = h, Un;
}
var qn = {}, Nd;
function RA() {
  if (Nd)
    return qn;
  Nd = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.createWalletClient = void 0;
  const e = Or, t = Af();
  function r(n) {
    const { key: a = "wallet", name: o = "Wallet Client", transport: i } = n;
    return (0, e.createClient)({
      ...n,
      key: a,
      name: o,
      transport: (c) => i({ ...c, retryCount: 0 }),
      type: "walletClient"
    }).extend(t.walletActions);
  }
  return qn.createWalletClient = r, qn;
}
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
ms.webSocket = void 0;
const BA = ye, MA = rn, Br = ei, FA = Qt;
function NA(e, t = {}) {
  const { key: r = "webSocket", name: n = "WebSocket JSON-RPC", retryDelay: a } = t;
  return ({ chain: o, retryCount: i, timeout: s }) => {
    var d;
    const c = t.retryCount ?? i, m = s ?? t.timeout ?? 1e4, u = e || ((d = o == null ? void 0 : o.rpcUrls.default.webSocket) == null ? void 0 : d[0]);
    if (!u)
      throw new MA.UrlRequiredError();
    return (0, FA.createTransport)({
      key: r,
      name: n,
      async request({ method: l, params: f }) {
        const b = { method: l, params: f }, y = await (0, Br.getSocket)(u), { error: h, result: p } = await Br.rpc.webSocketAsync(y, {
          body: b,
          timeout: m
        });
        if (h)
          throw new BA.RpcRequestError({
            body: b,
            error: h,
            url: u
          });
        return p;
      },
      retryCount: c,
      retryDelay: a,
      timeout: m,
      type: "webSocket"
    }, {
      getSocket() {
        return (0, Br.getSocket)(u);
      },
      async subscribe({ params: l, onData: f, onError: b }) {
        const y = await (0, Br.getSocket)(u), { result: h } = await new Promise((p, g) => Br.rpc.webSocket(y, {
          body: {
            method: "eth_subscribe",
            params: l
          },
          onResponse(v) {
            if (v.error) {
              g(v.error), b == null || b(v.error);
              return;
            }
            if (typeof v.id == "number") {
              p(v);
              return;
            }
            v.method === "eth_subscription" && f(v.params);
          }
        }));
        return {
          subscriptionId: h,
          async unsubscribe() {
            return new Promise((p) => Br.rpc.webSocket(y, {
              body: {
                method: "eth_unsubscribe",
                params: [h]
              },
              onResponse: p
            }));
          }
        };
      }
    });
  };
}
ms.webSocket = NA;
var gs = {};
Object.defineProperty(gs, "__esModule", { value: !0 });
gs.zeroAddress = void 0;
gs.zeroAddress = "0x0000000000000000000000000000000000000000";
var _ = {};
Object.defineProperty(_, "__esModule", { value: !0 });
_.minInt144 = _.minInt136 = _.minInt128 = _.minInt120 = _.minInt112 = _.minInt104 = _.minInt96 = _.minInt88 = _.minInt80 = _.minInt72 = _.minInt64 = _.minInt56 = _.minInt48 = _.minInt40 = _.minInt32 = _.minInt24 = _.minInt16 = _.minInt8 = _.maxInt256 = _.maxInt248 = _.maxInt240 = _.maxInt232 = _.maxInt224 = _.maxInt216 = _.maxInt208 = _.maxInt200 = _.maxInt192 = _.maxInt184 = _.maxInt176 = _.maxInt168 = _.maxInt160 = _.maxInt152 = _.maxInt144 = _.maxInt136 = _.maxInt128 = _.maxInt120 = _.maxInt112 = _.maxInt104 = _.maxInt96 = _.maxInt88 = _.maxInt80 = _.maxInt72 = _.maxInt64 = _.maxInt56 = _.maxInt48 = _.maxInt40 = _.maxInt32 = _.maxInt24 = _.maxInt16 = _.maxInt8 = void 0;
_.maxUint256 = _.maxUint248 = _.maxUint240 = _.maxUint232 = _.maxUint224 = _.maxUint216 = _.maxUint208 = _.maxUint200 = _.maxUint192 = _.maxUint184 = _.maxUint176 = _.maxUint168 = _.maxUint160 = _.maxUint152 = _.maxUint144 = _.maxUint136 = _.maxUint128 = _.maxUint120 = _.maxUint112 = _.maxUint104 = _.maxUint96 = _.maxUint88 = _.maxUint80 = _.maxUint72 = _.maxUint64 = _.maxUint56 = _.maxUint48 = _.maxUint40 = _.maxUint32 = _.maxUint24 = _.maxUint16 = _.maxUint8 = _.minInt256 = _.minInt248 = _.minInt240 = _.minInt232 = _.minInt224 = _.minInt216 = _.minInt208 = _.minInt200 = _.minInt192 = _.minInt184 = _.minInt176 = _.minInt168 = _.minInt160 = _.minInt152 = void 0;
_.maxInt8 = 2n ** (8n - 1n) - 1n;
_.maxInt16 = 2n ** (16n - 1n) - 1n;
_.maxInt24 = 2n ** (24n - 1n) - 1n;
_.maxInt32 = 2n ** (32n - 1n) - 1n;
_.maxInt40 = 2n ** (40n - 1n) - 1n;
_.maxInt48 = 2n ** (48n - 1n) - 1n;
_.maxInt56 = 2n ** (56n - 1n) - 1n;
_.maxInt64 = 2n ** (64n - 1n) - 1n;
_.maxInt72 = 2n ** (72n - 1n) - 1n;
_.maxInt80 = 2n ** (80n - 1n) - 1n;
_.maxInt88 = 2n ** (88n - 1n) - 1n;
_.maxInt96 = 2n ** (96n - 1n) - 1n;
_.maxInt104 = 2n ** (104n - 1n) - 1n;
_.maxInt112 = 2n ** (112n - 1n) - 1n;
_.maxInt120 = 2n ** (120n - 1n) - 1n;
_.maxInt128 = 2n ** (128n - 1n) - 1n;
_.maxInt136 = 2n ** (136n - 1n) - 1n;
_.maxInt144 = 2n ** (144n - 1n) - 1n;
_.maxInt152 = 2n ** (152n - 1n) - 1n;
_.maxInt160 = 2n ** (160n - 1n) - 1n;
_.maxInt168 = 2n ** (168n - 1n) - 1n;
_.maxInt176 = 2n ** (176n - 1n) - 1n;
_.maxInt184 = 2n ** (184n - 1n) - 1n;
_.maxInt192 = 2n ** (192n - 1n) - 1n;
_.maxInt200 = 2n ** (200n - 1n) - 1n;
_.maxInt208 = 2n ** (208n - 1n) - 1n;
_.maxInt216 = 2n ** (216n - 1n) - 1n;
_.maxInt224 = 2n ** (224n - 1n) - 1n;
_.maxInt232 = 2n ** (232n - 1n) - 1n;
_.maxInt240 = 2n ** (240n - 1n) - 1n;
_.maxInt248 = 2n ** (248n - 1n) - 1n;
_.maxInt256 = 2n ** (256n - 1n) - 1n;
_.minInt8 = -(2n ** (8n - 1n));
_.minInt16 = -(2n ** (16n - 1n));
_.minInt24 = -(2n ** (24n - 1n));
_.minInt32 = -(2n ** (32n - 1n));
_.minInt40 = -(2n ** (40n - 1n));
_.minInt48 = -(2n ** (48n - 1n));
_.minInt56 = -(2n ** (56n - 1n));
_.minInt64 = -(2n ** (64n - 1n));
_.minInt72 = -(2n ** (72n - 1n));
_.minInt80 = -(2n ** (80n - 1n));
_.minInt88 = -(2n ** (88n - 1n));
_.minInt96 = -(2n ** (96n - 1n));
_.minInt104 = -(2n ** (104n - 1n));
_.minInt112 = -(2n ** (112n - 1n));
_.minInt120 = -(2n ** (120n - 1n));
_.minInt128 = -(2n ** (128n - 1n));
_.minInt136 = -(2n ** (136n - 1n));
_.minInt144 = -(2n ** (144n - 1n));
_.minInt152 = -(2n ** (152n - 1n));
_.minInt160 = -(2n ** (160n - 1n));
_.minInt168 = -(2n ** (168n - 1n));
_.minInt176 = -(2n ** (176n - 1n));
_.minInt184 = -(2n ** (184n - 1n));
_.minInt192 = -(2n ** (192n - 1n));
_.minInt200 = -(2n ** (200n - 1n));
_.minInt208 = -(2n ** (208n - 1n));
_.minInt216 = -(2n ** (216n - 1n));
_.minInt224 = -(2n ** (224n - 1n));
_.minInt232 = -(2n ** (232n - 1n));
_.minInt240 = -(2n ** (240n - 1n));
_.minInt248 = -(2n ** (248n - 1n));
_.minInt256 = -(2n ** (256n - 1n));
_.maxUint8 = 2n ** 8n - 1n;
_.maxUint16 = 2n ** 16n - 1n;
_.maxUint24 = 2n ** 24n - 1n;
_.maxUint32 = 2n ** 32n - 1n;
_.maxUint40 = 2n ** 40n - 1n;
_.maxUint48 = 2n ** 48n - 1n;
_.maxUint56 = 2n ** 56n - 1n;
_.maxUint64 = 2n ** 64n - 1n;
_.maxUint72 = 2n ** 72n - 1n;
_.maxUint80 = 2n ** 80n - 1n;
_.maxUint88 = 2n ** 88n - 1n;
_.maxUint96 = 2n ** 96n - 1n;
_.maxUint104 = 2n ** 104n - 1n;
_.maxUint112 = 2n ** 112n - 1n;
_.maxUint120 = 2n ** 120n - 1n;
_.maxUint128 = 2n ** 128n - 1n;
_.maxUint136 = 2n ** 136n - 1n;
_.maxUint144 = 2n ** 144n - 1n;
_.maxUint152 = 2n ** 152n - 1n;
_.maxUint160 = 2n ** 160n - 1n;
_.maxUint168 = 2n ** 168n - 1n;
_.maxUint176 = 2n ** 176n - 1n;
_.maxUint184 = 2n ** 184n - 1n;
_.maxUint192 = 2n ** 192n - 1n;
_.maxUint200 = 2n ** 200n - 1n;
_.maxUint208 = 2n ** 208n - 1n;
_.maxUint216 = 2n ** 216n - 1n;
_.maxUint224 = 2n ** 224n - 1n;
_.maxUint232 = 2n ** 232n - 1n;
_.maxUint240 = 2n ** 240n - 1n;
_.maxUint248 = 2n ** 248n - 1n;
_.maxUint256 = 2n ** 256n - 1n;
var ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
ys.zeroHash = void 0;
ys.zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
var _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
_s.decodeDeployData = void 0;
const Ec = Y(), kA = _t, jc = "/docs/contract/decodeDeployData";
function DA({ abi: e, bytecode: t, data: r }) {
  if (r === t)
    return { bytecode: t };
  const n = e.find((o) => "type" in o && o.type === "constructor");
  if (!n)
    throw new Ec.AbiConstructorNotFoundError({ docsPath: jc });
  if (!("inputs" in n))
    throw new Ec.AbiConstructorParamsNotFoundError({ docsPath: jc });
  if (!n.inputs || n.inputs.length === 0)
    throw new Ec.AbiConstructorParamsNotFoundError({ docsPath: jc });
  return { args: (0, kA.decodeAbiParameters)(n.inputs, `0x${r.replace(t, "")}`), bytecode: t };
}
_s.decodeDeployData = DA;
var hs = {};
Object.defineProperty(hs, "__esModule", { value: !0 });
hs.compactSignatureToSignature = void 0;
const HA = de(), UA = M();
function LA({ r: e, yParityAndS: t }) {
  const r = (0, HA.hexToBytes)(t), n = r[0] & 128 ? 28n : 27n, a = r;
  return n === 28n && (a[0] &= 127), { r: e, s: (0, UA.bytesToHex)(a), v: n };
}
hs.compactSignatureToSignature = LA;
var ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.hexToCompactSignature = void 0;
const qA = Fa, kd = M();
function xA(e) {
  const { r: t, s: r } = qA.secp256k1.Signature.fromCompact(e.slice(2, 130));
  return {
    r: (0, kd.numberToHex)(t, { size: 32 }),
    yParityAndS: (0, kd.numberToHex)(r, { size: 32 })
  };
}
ps.hexToCompactSignature = xA;
var vs = {};
Object.defineProperty(vs, "__esModule", { value: !0 });
vs.hexToSignature = void 0;
const zA = Fa, Dd = M();
function GA(e) {
  const { r: t, s: r } = zA.secp256k1.Signature.fromCompact(e.slice(2, 130)), n = BigInt(`0x${e.slice(130)}`);
  return { r: (0, Dd.numberToHex)(t, { size: 32 }), s: (0, Dd.numberToHex)(r, { size: 32 }), v: n };
}
vs.hexToSignature = GA;
var xn = {}, Hd;
function WA() {
  if (Hd)
    return xn;
  Hd = 1, Object.defineProperty(xn, "__esModule", { value: !0 }), xn.signatureToCompactSignature = void 0;
  const e = gn();
  function t(r) {
    const { r: n, s: a, v: o } = r, i = o - 27n;
    let s = a;
    if (i === 1n) {
      const c = (0, e.hexToBytes)(a);
      c[0] |= 128, s = (0, e.bytesToHex)(c);
    }
    return { r: n, yParityAndS: s };
  }
  return xn.signatureToCompactSignature = t, xn;
}
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
Es.compactSignatureToHex = void 0;
const VA = Fa, Ud = ue();
function KA({ r: e, yParityAndS: t }) {
  return `0x${new VA.secp256k1.Signature((0, Ud.hexToBigInt)(e), (0, Ud.hexToBigInt)(t)).toCompactHex()}`;
}
Es.compactSignatureToHex = KA;
var js = {};
Object.defineProperty(js, "__esModule", { value: !0 });
js.signatureToHex = void 0;
const ZA = Fa, Ld = ue(), JA = M();
function XA({ r: e, s: t, v: r }) {
  return `0x${new ZA.secp256k1.Signature((0, Ld.hexToBigInt)(e), (0, Ld.hexToBigInt)(t)).toCompactHex()}${(0, JA.toHex)(r).slice(2)}`;
}
js.signatureToHex = XA;
var qd;
function wf() {
  return qd || (qd = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.maxInt112 = e.maxInt104 = e.maxInt96 = e.maxInt88 = e.maxInt80 = e.maxInt72 = e.maxInt64 = e.maxInt56 = e.maxInt48 = e.maxInt40 = e.maxInt32 = e.maxInt24 = e.maxInt16 = e.maxInt8 = e.weiUnits = e.gweiUnits = e.etherUnits = e.zeroAddress = e.multicall3Abi = e.webSocket = e.createWalletClient = e.createTransport = e.walletActions = e.testActions = e.publicActions = e.createTestClient = e.createPublicClient = e.http = e.fallback = e.custom = e.createClient = e.getContract = e.parseAbiParameters = e.parseAbiParameter = e.parseAbiItem = e.parseAbi = e.UnknownSignatureError = e.UnknownTypeError = e.SolidityProtectedKeywordError = e.InvalidStructSignatureError = e.InvalidSignatureError = e.InvalidParenthesisError = e.InvalidParameterError = e.InvalidModifierError = e.InvalidFunctionModifierError = e.InvalidAbiTypeParameterError = e.InvalidAbiItemError = e.InvalidAbiParametersError = e.InvalidAbiParameterError = e.CircularReferenceError = void 0, e.maxUint256 = e.maxUint248 = e.maxUint240 = e.maxUint232 = e.maxUint224 = e.maxUint216 = e.maxUint208 = e.maxUint200 = e.maxUint192 = e.maxUint184 = e.maxUint176 = e.maxUint168 = e.maxUint160 = e.maxUint152 = e.maxUint144 = e.maxUint136 = e.maxUint128 = e.maxUint120 = e.maxUint112 = e.maxUint104 = e.maxUint96 = e.maxUint88 = e.maxUint80 = e.maxUint72 = e.maxUint64 = e.maxUint56 = e.maxUint48 = e.maxUint40 = e.maxUint32 = e.maxUint24 = e.maxUint16 = e.maxUint8 = e.maxInt256 = e.maxInt248 = e.maxInt240 = e.maxInt232 = e.maxInt224 = e.maxInt216 = e.maxInt208 = e.maxInt200 = e.maxInt192 = e.maxInt184 = e.maxInt176 = e.maxInt168 = e.maxInt160 = e.maxInt152 = e.maxInt144 = e.maxInt136 = e.maxInt128 = e.maxInt120 = void 0, e.AbiFunctionOutputsNotFoundError = e.AbiFunctionNotFoundError = e.AbiEventSignatureNotFoundError = e.AbiEventSignatureEmptyTopicsError = e.AbiEventNotFoundError = e.AbiErrorSignatureNotFoundError = e.AbiErrorNotFoundError = e.AbiErrorInputsNotFoundError = e.AbiEncodingBytesSizeMismatchError = e.AbiEncodingLengthMismatchError = e.AbiEncodingArrayLengthMismatchError = e.AbiDecodingZeroDataError = e.AbiDecodingDataSizeTooSmallError = e.AbiDecodingDataSizeInvalidError = e.AbiConstructorParamsNotFoundError = e.AbiConstructorNotFoundError = e.presignMessagePrefix = e.zeroHash = e.minInt256 = e.minInt248 = e.minInt240 = e.minInt232 = e.minInt224 = e.minInt216 = e.minInt208 = e.minInt200 = e.minInt192 = e.minInt184 = e.minInt176 = e.minInt168 = e.minInt160 = e.minInt152 = e.minInt144 = e.minInt136 = e.minInt128 = e.minInt120 = e.minInt112 = e.minInt104 = e.minInt96 = e.minInt88 = e.minInt80 = e.minInt72 = e.minInt64 = e.minInt56 = e.minInt48 = e.minInt40 = e.minInt32 = e.minInt24 = e.minInt16 = e.minInt8 = void 0, e.InvalidHexBooleanError = e.IntegerOutOfRangeError = e.InvalidBytesBooleanError = e.DataLengthTooShortError = e.DataLengthTooLongError = e.InvalidChainIdError = e.ClientChainNotConfiguredError = e.ChainNotFoundError = e.ChainMismatchError = e.ChainDoesNotSupportContract = e.UserRejectedRequestError = e.UnsupportedProviderMethodError = e.UnknownRpcError = e.UnauthorizedProviderError = e.TransactionRejectedRpcError = e.SwitchChainError = e.RpcError = e.ResourceUnavailableRpcError = e.ResourceNotFoundRpcError = e.ProviderRpcError = e.ProviderDisconnectedError = e.ParseRpcError = e.MethodNotSupportedRpcError = e.MethodNotFoundRpcError = e.LimitExceededRpcError = e.JsonRpcVersionUnsupportedError = e.InvalidRequestRpcError = e.InvalidParamsRpcError = e.InvalidInputRpcError = e.InternalRpcError = e.ChainDisconnectedError = e.MaxFeePerGasTooLowError = e.Eip1559FeesNotSupportedError = e.BaseFeeScalarError = e.RawContractError = e.ContractFunctionZeroDataError = e.ContractFunctionRevertedError = e.ContractFunctionExecutionError = e.CallExecutionError = e.BlockNotFoundError = e.BaseError = e.UnsupportedPackedAbiType = e.InvalidDefinitionTypeError = e.InvalidArrayError = e.InvalidAbiEncodingTypeError = e.InvalidAbiDecodingTypeError = e.DecodeLogTopicsMismatch = e.DecodeLogDataMismatch = e.BytesSizeMismatchError = e.AbiFunctionSignatureNotFoundError = void 0, e.encodeAbiParameters = e.decodeFunctionResult = e.decodeFunctionData = e.decodeEventLog = e.decodeErrorResult = e.decodeDeployData = e.decodeAbiParameters = e.formatLog = e.formatBlock = e.defineBlock = e.namehash = e.labelhash = e.UrlRequiredError = e.SliceOffsetOutOfBoundsError = e.SizeExceedsPaddingSizeError = e.WaitForTransactionReceiptTimeoutError = e.TransactionReceiptNotFoundError = e.TransactionNotFoundError = e.TransactionExecutionError = e.InvalidStorageKeySizeError = e.InvalidSerializedTransactionTypeError = e.InvalidSerializedTransactionError = e.InvalidSerializableTransactionError = e.InvalidLegacyVError = e.FeeConflictError = e.InvalidAddressError = e.WebSocketRequestError = e.TimeoutError = e.RpcRequestError = e.HttpRequestError = e.FilterTypeNotSupportedError = e.UnknownNodeError = e.TransactionTypeNotSupportedError = e.TipAboveFeeCapError = e.NonceTooLowError = e.NonceTooHighError = e.NonceMaxValueError = e.IntrinsicGasTooLowError = e.IntrinsicGasTooHighError = e.InsufficientFundsError = e.FeeCapTooLowError = e.FeeCapTooHighError = e.ExecutionRevertedError = e.EstimateGasExecutionError = e.EnsAvatarUnsupportedNamespaceError = e.EnsAvatarInvalidNftUriError = e.EnsAvatarUriResolutionError = e.SizeOverflowError = e.OffsetOutOfBoundsError = e.InvalidHexValueError = void 0, e.toHex = e.stringToHex = e.numberToHex = e.bytesToHex = e.boolToHex = e.toBytes = e.stringToBytes = e.numberToBytes = e.hexToBytes = e.boolToBytes = e.assertTransactionLegacy = e.assertTransactionEIP2930 = e.assertTransactionEIP1559 = e.assertRequest = e.verifyTypedData = e.verifyMessage = e.toRlp = e.hexToRlp = e.bytesToRlp = e.signatureToHex = e.compactSignatureToHex = e.signatureToCompactSignature = e.recoverTypedDataAddress = e.recoverPublicKey = e.recoverMessageAddress = e.recoverAddress = e.hexToSignature = e.hexToCompactSignature = e.compactSignatureToSignature = e.hashTypedData = e.hashDomain = e.getTransactionType = e.getSerializedTransactionType = e.getCreateAddress = e.getCreate2Address = e.getContractAddress = e.getAbiItem = e.rpcTransactionType = e.formatTransactionRequest = e.defineTransactionRequest = e.formatTransactionReceipt = e.defineTransactionReceipt = e.transactionType = e.formatTransaction = e.defineTransaction = e.encodeFunctionResult = e.encodeFunctionData = e.encodeEventTopics = e.encodeErrorResult = e.encodeDeployData = void 0, e.parseUnits = e.parseTransaction = e.parseGwei = e.parseEther = e.padHex = e.padBytes = e.pad = e.ripemd160 = e.sha256 = e.keccak256 = e.isHex = e.isHash = e.isBytes = e.isAddressEqual = e.isAddress = e.hashMessage = e.getFunctionSignature = e.getFunctionSelector = e.getEventSignature = e.getEventSelector = e.getContractError = e.getAddress = e.checksumAddress = e.fromRlp = e.hexToString = e.hexToNumber = e.hexToBool = e.hexToBigInt = e.fromHex = e.formatUnits = e.formatGwei = e.formatEther = e.encodePacked = e.getChainContractAddress = e.extractChain = e.defineChain = e.assertCurrentChain = e.concatHex = e.concatBytes = e.concat = e.offchainLookupSignature = e.offchainLookupAbiItem = e.offchainLookup = e.ccipFetch = e.fromBytes = e.bytesToString = e.bytesToNumber = e.bytesToBool = e.bytesToBigint = e.bytesToBigInt = void 0, e.getTypesForEIP712Domain = e.domainSeparator = e.validateTypedData = e.trim = e.stringify = e.sliceHex = e.sliceBytes = e.slice = e.size = e.serializeTransaction = e.serializeAccessList = void 0;
    var t = xr();
    Object.defineProperty(e, "CircularReferenceError", { enumerable: !0, get: function() {
      return t.CircularReferenceError;
    } }), Object.defineProperty(e, "InvalidAbiParameterError", { enumerable: !0, get: function() {
      return t.InvalidAbiParameterError;
    } }), Object.defineProperty(e, "InvalidAbiParametersError", { enumerable: !0, get: function() {
      return t.InvalidAbiParametersError;
    } }), Object.defineProperty(e, "InvalidAbiItemError", { enumerable: !0, get: function() {
      return t.InvalidAbiItemError;
    } }), Object.defineProperty(e, "InvalidAbiTypeParameterError", { enumerable: !0, get: function() {
      return t.InvalidAbiTypeParameterError;
    } }), Object.defineProperty(e, "InvalidFunctionModifierError", { enumerable: !0, get: function() {
      return t.InvalidFunctionModifierError;
    } }), Object.defineProperty(e, "InvalidModifierError", { enumerable: !0, get: function() {
      return t.InvalidModifierError;
    } }), Object.defineProperty(e, "InvalidParameterError", { enumerable: !0, get: function() {
      return t.InvalidParameterError;
    } }), Object.defineProperty(e, "InvalidParenthesisError", { enumerable: !0, get: function() {
      return t.InvalidParenthesisError;
    } }), Object.defineProperty(e, "InvalidSignatureError", { enumerable: !0, get: function() {
      return t.InvalidSignatureError;
    } }), Object.defineProperty(e, "InvalidStructSignatureError", { enumerable: !0, get: function() {
      return t.InvalidStructSignatureError;
    } }), Object.defineProperty(e, "SolidityProtectedKeywordError", { enumerable: !0, get: function() {
      return t.SolidityProtectedKeywordError;
    } }), Object.defineProperty(e, "UnknownTypeError", { enumerable: !0, get: function() {
      return t.UnknownTypeError;
    } }), Object.defineProperty(e, "UnknownSignatureError", { enumerable: !0, get: function() {
      return t.UnknownSignatureError;
    } }), Object.defineProperty(e, "parseAbi", { enumerable: !0, get: function() {
      return t.parseAbi;
    } }), Object.defineProperty(e, "parseAbiItem", { enumerable: !0, get: function() {
      return t.parseAbiItem;
    } }), Object.defineProperty(e, "parseAbiParameter", { enumerable: !0, get: function() {
      return t.parseAbiParameter;
    } }), Object.defineProperty(e, "parseAbiParameters", { enumerable: !0, get: function() {
      return t.parseAbiParameters;
    } });
    var r = Ut;
    Object.defineProperty(e, "getContract", { enumerable: !0, get: function() {
      return r.getContract;
    } });
    var n = Or;
    Object.defineProperty(e, "createClient", { enumerable: !0, get: function() {
      return n.createClient;
    } });
    var a = Xo;
    Object.defineProperty(e, "custom", { enumerable: !0, get: function() {
      return a.custom;
    } });
    var o = Dr;
    Object.defineProperty(e, "fallback", { enumerable: !0, get: function() {
      return o.fallback;
    } });
    var i = Yo;
    Object.defineProperty(e, "http", { enumerable: !0, get: function() {
      return i.http;
    } });
    var s = xP();
    Object.defineProperty(e, "createPublicClient", { enumerable: !0, get: function() {
      return s.createPublicClient;
    } });
    var c = Oi;
    Object.defineProperty(e, "createTestClient", { enumerable: !0, get: function() {
      return c.createTestClient;
    } });
    var m = Tf();
    Object.defineProperty(e, "publicActions", { enumerable: !0, get: function() {
      return m.publicActions;
    } });
    var u = xa;
    Object.defineProperty(e, "testActions", { enumerable: !0, get: function() {
      return u.testActions;
    } });
    var d = Af();
    Object.defineProperty(e, "walletActions", { enumerable: !0, get: function() {
      return d.walletActions;
    } });
    var l = Qt;
    Object.defineProperty(e, "createTransport", { enumerable: !0, get: function() {
      return l.createTransport;
    } });
    var f = RA();
    Object.defineProperty(e, "createWalletClient", { enumerable: !0, get: function() {
      return f.createWalletClient;
    } });
    var b = ms;
    Object.defineProperty(e, "webSocket", { enumerable: !0, get: function() {
      return b.webSocket;
    } });
    var y = re;
    Object.defineProperty(e, "multicall3Abi", { enumerable: !0, get: function() {
      return y.multicall3Abi;
    } });
    var h = gs;
    Object.defineProperty(e, "zeroAddress", { enumerable: !0, get: function() {
      return h.zeroAddress;
    } });
    var p = Ge;
    Object.defineProperty(e, "etherUnits", { enumerable: !0, get: function() {
      return p.etherUnits;
    } }), Object.defineProperty(e, "gweiUnits", { enumerable: !0, get: function() {
      return p.gweiUnits;
    } }), Object.defineProperty(e, "weiUnits", { enumerable: !0, get: function() {
      return p.weiUnits;
    } });
    var g = _;
    Object.defineProperty(e, "maxInt8", { enumerable: !0, get: function() {
      return g.maxInt8;
    } }), Object.defineProperty(e, "maxInt16", { enumerable: !0, get: function() {
      return g.maxInt16;
    } }), Object.defineProperty(e, "maxInt24", { enumerable: !0, get: function() {
      return g.maxInt24;
    } }), Object.defineProperty(e, "maxInt32", { enumerable: !0, get: function() {
      return g.maxInt32;
    } }), Object.defineProperty(e, "maxInt40", { enumerable: !0, get: function() {
      return g.maxInt40;
    } }), Object.defineProperty(e, "maxInt48", { enumerable: !0, get: function() {
      return g.maxInt48;
    } }), Object.defineProperty(e, "maxInt56", { enumerable: !0, get: function() {
      return g.maxInt56;
    } }), Object.defineProperty(e, "maxInt64", { enumerable: !0, get: function() {
      return g.maxInt64;
    } }), Object.defineProperty(e, "maxInt72", { enumerable: !0, get: function() {
      return g.maxInt72;
    } }), Object.defineProperty(e, "maxInt80", { enumerable: !0, get: function() {
      return g.maxInt80;
    } }), Object.defineProperty(e, "maxInt88", { enumerable: !0, get: function() {
      return g.maxInt88;
    } }), Object.defineProperty(e, "maxInt96", { enumerable: !0, get: function() {
      return g.maxInt96;
    } }), Object.defineProperty(e, "maxInt104", { enumerable: !0, get: function() {
      return g.maxInt104;
    } }), Object.defineProperty(e, "maxInt112", { enumerable: !0, get: function() {
      return g.maxInt112;
    } }), Object.defineProperty(e, "maxInt120", { enumerable: !0, get: function() {
      return g.maxInt120;
    } }), Object.defineProperty(e, "maxInt128", { enumerable: !0, get: function() {
      return g.maxInt128;
    } }), Object.defineProperty(e, "maxInt136", { enumerable: !0, get: function() {
      return g.maxInt136;
    } }), Object.defineProperty(e, "maxInt144", { enumerable: !0, get: function() {
      return g.maxInt144;
    } }), Object.defineProperty(e, "maxInt152", { enumerable: !0, get: function() {
      return g.maxInt152;
    } }), Object.defineProperty(e, "maxInt160", { enumerable: !0, get: function() {
      return g.maxInt160;
    } }), Object.defineProperty(e, "maxInt168", { enumerable: !0, get: function() {
      return g.maxInt168;
    } }), Object.defineProperty(e, "maxInt176", { enumerable: !0, get: function() {
      return g.maxInt176;
    } }), Object.defineProperty(e, "maxInt184", { enumerable: !0, get: function() {
      return g.maxInt184;
    } }), Object.defineProperty(e, "maxInt192", { enumerable: !0, get: function() {
      return g.maxInt192;
    } }), Object.defineProperty(e, "maxInt200", { enumerable: !0, get: function() {
      return g.maxInt200;
    } }), Object.defineProperty(e, "maxInt208", { enumerable: !0, get: function() {
      return g.maxInt208;
    } }), Object.defineProperty(e, "maxInt216", { enumerable: !0, get: function() {
      return g.maxInt216;
    } }), Object.defineProperty(e, "maxInt224", { enumerable: !0, get: function() {
      return g.maxInt224;
    } }), Object.defineProperty(e, "maxInt232", { enumerable: !0, get: function() {
      return g.maxInt232;
    } }), Object.defineProperty(e, "maxInt240", { enumerable: !0, get: function() {
      return g.maxInt240;
    } }), Object.defineProperty(e, "maxInt248", { enumerable: !0, get: function() {
      return g.maxInt248;
    } }), Object.defineProperty(e, "maxInt256", { enumerable: !0, get: function() {
      return g.maxInt256;
    } }), Object.defineProperty(e, "maxUint8", { enumerable: !0, get: function() {
      return g.maxUint8;
    } }), Object.defineProperty(e, "maxUint16", { enumerable: !0, get: function() {
      return g.maxUint16;
    } }), Object.defineProperty(e, "maxUint24", { enumerable: !0, get: function() {
      return g.maxUint24;
    } }), Object.defineProperty(e, "maxUint32", { enumerable: !0, get: function() {
      return g.maxUint32;
    } }), Object.defineProperty(e, "maxUint40", { enumerable: !0, get: function() {
      return g.maxUint40;
    } }), Object.defineProperty(e, "maxUint48", { enumerable: !0, get: function() {
      return g.maxUint48;
    } }), Object.defineProperty(e, "maxUint56", { enumerable: !0, get: function() {
      return g.maxUint56;
    } }), Object.defineProperty(e, "maxUint64", { enumerable: !0, get: function() {
      return g.maxUint64;
    } }), Object.defineProperty(e, "maxUint72", { enumerable: !0, get: function() {
      return g.maxUint72;
    } }), Object.defineProperty(e, "maxUint80", { enumerable: !0, get: function() {
      return g.maxUint80;
    } }), Object.defineProperty(e, "maxUint88", { enumerable: !0, get: function() {
      return g.maxUint88;
    } }), Object.defineProperty(e, "maxUint96", { enumerable: !0, get: function() {
      return g.maxUint96;
    } }), Object.defineProperty(e, "maxUint104", { enumerable: !0, get: function() {
      return g.maxUint104;
    } }), Object.defineProperty(e, "maxUint112", { enumerable: !0, get: function() {
      return g.maxUint112;
    } }), Object.defineProperty(e, "maxUint120", { enumerable: !0, get: function() {
      return g.maxUint120;
    } }), Object.defineProperty(e, "maxUint128", { enumerable: !0, get: function() {
      return g.maxUint128;
    } }), Object.defineProperty(e, "maxUint136", { enumerable: !0, get: function() {
      return g.maxUint136;
    } }), Object.defineProperty(e, "maxUint144", { enumerable: !0, get: function() {
      return g.maxUint144;
    } }), Object.defineProperty(e, "maxUint152", { enumerable: !0, get: function() {
      return g.maxUint152;
    } }), Object.defineProperty(e, "maxUint160", { enumerable: !0, get: function() {
      return g.maxUint160;
    } }), Object.defineProperty(e, "maxUint168", { enumerable: !0, get: function() {
      return g.maxUint168;
    } }), Object.defineProperty(e, "maxUint176", { enumerable: !0, get: function() {
      return g.maxUint176;
    } }), Object.defineProperty(e, "maxUint184", { enumerable: !0, get: function() {
      return g.maxUint184;
    } }), Object.defineProperty(e, "maxUint192", { enumerable: !0, get: function() {
      return g.maxUint192;
    } }), Object.defineProperty(e, "maxUint200", { enumerable: !0, get: function() {
      return g.maxUint200;
    } }), Object.defineProperty(e, "maxUint208", { enumerable: !0, get: function() {
      return g.maxUint208;
    } }), Object.defineProperty(e, "maxUint216", { enumerable: !0, get: function() {
      return g.maxUint216;
    } }), Object.defineProperty(e, "maxUint224", { enumerable: !0, get: function() {
      return g.maxUint224;
    } }), Object.defineProperty(e, "maxUint232", { enumerable: !0, get: function() {
      return g.maxUint232;
    } }), Object.defineProperty(e, "maxUint240", { enumerable: !0, get: function() {
      return g.maxUint240;
    } }), Object.defineProperty(e, "maxUint248", { enumerable: !0, get: function() {
      return g.maxUint248;
    } }), Object.defineProperty(e, "maxUint256", { enumerable: !0, get: function() {
      return g.maxUint256;
    } }), Object.defineProperty(e, "minInt8", { enumerable: !0, get: function() {
      return g.minInt8;
    } }), Object.defineProperty(e, "minInt16", { enumerable: !0, get: function() {
      return g.minInt16;
    } }), Object.defineProperty(e, "minInt24", { enumerable: !0, get: function() {
      return g.minInt24;
    } }), Object.defineProperty(e, "minInt32", { enumerable: !0, get: function() {
      return g.minInt32;
    } }), Object.defineProperty(e, "minInt40", { enumerable: !0, get: function() {
      return g.minInt40;
    } }), Object.defineProperty(e, "minInt48", { enumerable: !0, get: function() {
      return g.minInt48;
    } }), Object.defineProperty(e, "minInt56", { enumerable: !0, get: function() {
      return g.minInt56;
    } }), Object.defineProperty(e, "minInt64", { enumerable: !0, get: function() {
      return g.minInt64;
    } }), Object.defineProperty(e, "minInt72", { enumerable: !0, get: function() {
      return g.minInt72;
    } }), Object.defineProperty(e, "minInt80", { enumerable: !0, get: function() {
      return g.minInt80;
    } }), Object.defineProperty(e, "minInt88", { enumerable: !0, get: function() {
      return g.minInt88;
    } }), Object.defineProperty(e, "minInt96", { enumerable: !0, get: function() {
      return g.minInt96;
    } }), Object.defineProperty(e, "minInt104", { enumerable: !0, get: function() {
      return g.minInt104;
    } }), Object.defineProperty(e, "minInt112", { enumerable: !0, get: function() {
      return g.minInt112;
    } }), Object.defineProperty(e, "minInt120", { enumerable: !0, get: function() {
      return g.minInt120;
    } }), Object.defineProperty(e, "minInt128", { enumerable: !0, get: function() {
      return g.minInt128;
    } }), Object.defineProperty(e, "minInt136", { enumerable: !0, get: function() {
      return g.minInt136;
    } }), Object.defineProperty(e, "minInt144", { enumerable: !0, get: function() {
      return g.minInt144;
    } }), Object.defineProperty(e, "minInt152", { enumerable: !0, get: function() {
      return g.minInt152;
    } }), Object.defineProperty(e, "minInt160", { enumerable: !0, get: function() {
      return g.minInt160;
    } }), Object.defineProperty(e, "minInt168", { enumerable: !0, get: function() {
      return g.minInt168;
    } }), Object.defineProperty(e, "minInt176", { enumerable: !0, get: function() {
      return g.minInt176;
    } }), Object.defineProperty(e, "minInt184", { enumerable: !0, get: function() {
      return g.minInt184;
    } }), Object.defineProperty(e, "minInt192", { enumerable: !0, get: function() {
      return g.minInt192;
    } }), Object.defineProperty(e, "minInt200", { enumerable: !0, get: function() {
      return g.minInt200;
    } }), Object.defineProperty(e, "minInt208", { enumerable: !0, get: function() {
      return g.minInt208;
    } }), Object.defineProperty(e, "minInt216", { enumerable: !0, get: function() {
      return g.minInt216;
    } }), Object.defineProperty(e, "minInt224", { enumerable: !0, get: function() {
      return g.minInt224;
    } }), Object.defineProperty(e, "minInt232", { enumerable: !0, get: function() {
      return g.minInt232;
    } }), Object.defineProperty(e, "minInt240", { enumerable: !0, get: function() {
      return g.minInt240;
    } }), Object.defineProperty(e, "minInt248", { enumerable: !0, get: function() {
      return g.minInt248;
    } }), Object.defineProperty(e, "minInt256", { enumerable: !0, get: function() {
      return g.minInt256;
    } });
    var v = ys;
    Object.defineProperty(e, "zeroHash", { enumerable: !0, get: function() {
      return v.zeroHash;
    } });
    var j = Na;
    Object.defineProperty(e, "presignMessagePrefix", { enumerable: !0, get: function() {
      return j.presignMessagePrefix;
    } });
    var E = Y();
    Object.defineProperty(e, "AbiConstructorNotFoundError", { enumerable: !0, get: function() {
      return E.AbiConstructorNotFoundError;
    } }), Object.defineProperty(e, "AbiConstructorParamsNotFoundError", { enumerable: !0, get: function() {
      return E.AbiConstructorParamsNotFoundError;
    } }), Object.defineProperty(e, "AbiDecodingDataSizeInvalidError", { enumerable: !0, get: function() {
      return E.AbiDecodingDataSizeInvalidError;
    } }), Object.defineProperty(e, "AbiDecodingDataSizeTooSmallError", { enumerable: !0, get: function() {
      return E.AbiDecodingDataSizeTooSmallError;
    } }), Object.defineProperty(e, "AbiDecodingZeroDataError", { enumerable: !0, get: function() {
      return E.AbiDecodingZeroDataError;
    } }), Object.defineProperty(e, "AbiEncodingArrayLengthMismatchError", { enumerable: !0, get: function() {
      return E.AbiEncodingArrayLengthMismatchError;
    } }), Object.defineProperty(e, "AbiEncodingLengthMismatchError", { enumerable: !0, get: function() {
      return E.AbiEncodingLengthMismatchError;
    } }), Object.defineProperty(e, "AbiEncodingBytesSizeMismatchError", { enumerable: !0, get: function() {
      return E.AbiEncodingBytesSizeMismatchError;
    } }), Object.defineProperty(e, "AbiErrorInputsNotFoundError", { enumerable: !0, get: function() {
      return E.AbiErrorInputsNotFoundError;
    } }), Object.defineProperty(e, "AbiErrorNotFoundError", { enumerable: !0, get: function() {
      return E.AbiErrorNotFoundError;
    } }), Object.defineProperty(e, "AbiErrorSignatureNotFoundError", { enumerable: !0, get: function() {
      return E.AbiErrorSignatureNotFoundError;
    } }), Object.defineProperty(e, "AbiEventNotFoundError", { enumerable: !0, get: function() {
      return E.AbiEventNotFoundError;
    } }), Object.defineProperty(e, "AbiEventSignatureEmptyTopicsError", { enumerable: !0, get: function() {
      return E.AbiEventSignatureEmptyTopicsError;
    } }), Object.defineProperty(e, "AbiEventSignatureNotFoundError", { enumerable: !0, get: function() {
      return E.AbiEventSignatureNotFoundError;
    } }), Object.defineProperty(e, "AbiFunctionNotFoundError", { enumerable: !0, get: function() {
      return E.AbiFunctionNotFoundError;
    } }), Object.defineProperty(e, "AbiFunctionOutputsNotFoundError", { enumerable: !0, get: function() {
      return E.AbiFunctionOutputsNotFoundError;
    } }), Object.defineProperty(e, "AbiFunctionSignatureNotFoundError", { enumerable: !0, get: function() {
      return E.AbiFunctionSignatureNotFoundError;
    } }), Object.defineProperty(e, "BytesSizeMismatchError", { enumerable: !0, get: function() {
      return E.BytesSizeMismatchError;
    } }), Object.defineProperty(e, "DecodeLogDataMismatch", { enumerable: !0, get: function() {
      return E.DecodeLogDataMismatch;
    } }), Object.defineProperty(e, "DecodeLogTopicsMismatch", { enumerable: !0, get: function() {
      return E.DecodeLogTopicsMismatch;
    } }), Object.defineProperty(e, "InvalidAbiDecodingTypeError", { enumerable: !0, get: function() {
      return E.InvalidAbiDecodingTypeError;
    } }), Object.defineProperty(e, "InvalidAbiEncodingTypeError", { enumerable: !0, get: function() {
      return E.InvalidAbiEncodingTypeError;
    } }), Object.defineProperty(e, "InvalidArrayError", { enumerable: !0, get: function() {
      return E.InvalidArrayError;
    } }), Object.defineProperty(e, "InvalidDefinitionTypeError", { enumerable: !0, get: function() {
      return E.InvalidDefinitionTypeError;
    } }), Object.defineProperty(e, "UnsupportedPackedAbiType", { enumerable: !0, get: function() {
      return E.UnsupportedPackedAbiType;
    } });
    var P = G;
    Object.defineProperty(e, "BaseError", { enumerable: !0, get: function() {
      return P.BaseError;
    } });
    var $ = Wr;
    Object.defineProperty(e, "BlockNotFoundError", { enumerable: !0, get: function() {
      return $.BlockNotFoundError;
    } });
    var k = be;
    Object.defineProperty(e, "CallExecutionError", { enumerable: !0, get: function() {
      return k.CallExecutionError;
    } }), Object.defineProperty(e, "ContractFunctionExecutionError", { enumerable: !0, get: function() {
      return k.ContractFunctionExecutionError;
    } }), Object.defineProperty(e, "ContractFunctionRevertedError", { enumerable: !0, get: function() {
      return k.ContractFunctionRevertedError;
    } }), Object.defineProperty(e, "ContractFunctionZeroDataError", { enumerable: !0, get: function() {
      return k.ContractFunctionZeroDataError;
    } }), Object.defineProperty(e, "RawContractError", { enumerable: !0, get: function() {
      return k.RawContractError;
    } });
    var L = Qe;
    Object.defineProperty(e, "BaseFeeScalarError", { enumerable: !0, get: function() {
      return L.BaseFeeScalarError;
    } }), Object.defineProperty(e, "Eip1559FeesNotSupportedError", { enumerable: !0, get: function() {
      return L.Eip1559FeesNotSupportedError;
    } }), Object.defineProperty(e, "MaxFeePerGasTooLowError", { enumerable: !0, get: function() {
      return L.MaxFeePerGasTooLowError;
    } });
    var N = F;
    Object.defineProperty(e, "ChainDisconnectedError", { enumerable: !0, get: function() {
      return N.ChainDisconnectedError;
    } }), Object.defineProperty(e, "InternalRpcError", { enumerable: !0, get: function() {
      return N.InternalRpcError;
    } }), Object.defineProperty(e, "InvalidInputRpcError", { enumerable: !0, get: function() {
      return N.InvalidInputRpcError;
    } }), Object.defineProperty(e, "InvalidParamsRpcError", { enumerable: !0, get: function() {
      return N.InvalidParamsRpcError;
    } }), Object.defineProperty(e, "InvalidRequestRpcError", { enumerable: !0, get: function() {
      return N.InvalidRequestRpcError;
    } }), Object.defineProperty(e, "JsonRpcVersionUnsupportedError", { enumerable: !0, get: function() {
      return N.JsonRpcVersionUnsupportedError;
    } }), Object.defineProperty(e, "LimitExceededRpcError", { enumerable: !0, get: function() {
      return N.LimitExceededRpcError;
    } }), Object.defineProperty(e, "MethodNotFoundRpcError", { enumerable: !0, get: function() {
      return N.MethodNotFoundRpcError;
    } }), Object.defineProperty(e, "MethodNotSupportedRpcError", { enumerable: !0, get: function() {
      return N.MethodNotSupportedRpcError;
    } }), Object.defineProperty(e, "ParseRpcError", { enumerable: !0, get: function() {
      return N.ParseRpcError;
    } }), Object.defineProperty(e, "ProviderDisconnectedError", { enumerable: !0, get: function() {
      return N.ProviderDisconnectedError;
    } }), Object.defineProperty(e, "ProviderRpcError", { enumerable: !0, get: function() {
      return N.ProviderRpcError;
    } }), Object.defineProperty(e, "ResourceNotFoundRpcError", { enumerable: !0, get: function() {
      return N.ResourceNotFoundRpcError;
    } }), Object.defineProperty(e, "ResourceUnavailableRpcError", { enumerable: !0, get: function() {
      return N.ResourceUnavailableRpcError;
    } }), Object.defineProperty(e, "RpcError", { enumerable: !0, get: function() {
      return N.RpcError;
    } }), Object.defineProperty(e, "SwitchChainError", { enumerable: !0, get: function() {
      return N.SwitchChainError;
    } }), Object.defineProperty(e, "TransactionRejectedRpcError", { enumerable: !0, get: function() {
      return N.TransactionRejectedRpcError;
    } }), Object.defineProperty(e, "UnauthorizedProviderError", { enumerable: !0, get: function() {
      return N.UnauthorizedProviderError;
    } }), Object.defineProperty(e, "UnknownRpcError", { enumerable: !0, get: function() {
      return N.UnknownRpcError;
    } }), Object.defineProperty(e, "UnsupportedProviderMethodError", { enumerable: !0, get: function() {
      return N.UnsupportedProviderMethodError;
    } }), Object.defineProperty(e, "UserRejectedRequestError", { enumerable: !0, get: function() {
      return N.UserRejectedRequestError;
    } });
    var K = ve;
    Object.defineProperty(e, "ChainDoesNotSupportContract", { enumerable: !0, get: function() {
      return K.ChainDoesNotSupportContract;
    } }), Object.defineProperty(e, "ChainMismatchError", { enumerable: !0, get: function() {
      return K.ChainMismatchError;
    } }), Object.defineProperty(e, "ChainNotFoundError", { enumerable: !0, get: function() {
      return K.ChainNotFoundError;
    } }), Object.defineProperty(e, "ClientChainNotConfiguredError", { enumerable: !0, get: function() {
      return K.ClientChainNotConfiguredError;
    } }), Object.defineProperty(e, "InvalidChainIdError", { enumerable: !0, get: function() {
      return K.InvalidChainIdError;
    } });
    var x = te;
    Object.defineProperty(e, "DataLengthTooLongError", { enumerable: !0, get: function() {
      return x.DataLengthTooLongError;
    } }), Object.defineProperty(e, "DataLengthTooShortError", { enumerable: !0, get: function() {
      return x.DataLengthTooShortError;
    } }), Object.defineProperty(e, "InvalidBytesBooleanError", { enumerable: !0, get: function() {
      return x.InvalidBytesBooleanError;
    } }), Object.defineProperty(e, "IntegerOutOfRangeError", { enumerable: !0, get: function() {
      return x.IntegerOutOfRangeError;
    } }), Object.defineProperty(e, "InvalidHexBooleanError", { enumerable: !0, get: function() {
      return x.InvalidHexBooleanError;
    } }), Object.defineProperty(e, "InvalidHexValueError", { enumerable: !0, get: function() {
      return x.InvalidHexValueError;
    } }), Object.defineProperty(e, "OffsetOutOfBoundsError", { enumerable: !0, get: function() {
      return x.OffsetOutOfBoundsError;
    } }), Object.defineProperty(e, "SizeOverflowError", { enumerable: !0, get: function() {
      return x.SizeOverflowError;
    } });
    var R = Je;
    Object.defineProperty(e, "EnsAvatarUriResolutionError", { enumerable: !0, get: function() {
      return R.EnsAvatarUriResolutionError;
    } }), Object.defineProperty(e, "EnsAvatarInvalidNftUriError", { enumerable: !0, get: function() {
      return R.EnsAvatarInvalidNftUriError;
    } }), Object.defineProperty(e, "EnsAvatarUnsupportedNamespaceError", { enumerable: !0, get: function() {
      return R.EnsAvatarUnsupportedNamespaceError;
    } });
    var w = ua;
    Object.defineProperty(e, "EstimateGasExecutionError", { enumerable: !0, get: function() {
      return w.EstimateGasExecutionError;
    } });
    var I = V;
    Object.defineProperty(e, "ExecutionRevertedError", { enumerable: !0, get: function() {
      return I.ExecutionRevertedError;
    } }), Object.defineProperty(e, "FeeCapTooHighError", { enumerable: !0, get: function() {
      return I.FeeCapTooHighError;
    } }), Object.defineProperty(e, "FeeCapTooLowError", { enumerable: !0, get: function() {
      return I.FeeCapTooLowError;
    } }), Object.defineProperty(e, "InsufficientFundsError", { enumerable: !0, get: function() {
      return I.InsufficientFundsError;
    } }), Object.defineProperty(e, "IntrinsicGasTooHighError", { enumerable: !0, get: function() {
      return I.IntrinsicGasTooHighError;
    } }), Object.defineProperty(e, "IntrinsicGasTooLowError", { enumerable: !0, get: function() {
      return I.IntrinsicGasTooLowError;
    } }), Object.defineProperty(e, "NonceMaxValueError", { enumerable: !0, get: function() {
      return I.NonceMaxValueError;
    } }), Object.defineProperty(e, "NonceTooHighError", { enumerable: !0, get: function() {
      return I.NonceTooHighError;
    } }), Object.defineProperty(e, "NonceTooLowError", { enumerable: !0, get: function() {
      return I.NonceTooLowError;
    } }), Object.defineProperty(e, "TipAboveFeeCapError", { enumerable: !0, get: function() {
      return I.TipAboveFeeCapError;
    } }), Object.defineProperty(e, "TransactionTypeNotSupportedError", { enumerable: !0, get: function() {
      return I.TransactionTypeNotSupportedError;
    } }), Object.defineProperty(e, "UnknownNodeError", { enumerable: !0, get: function() {
      return I.UnknownNodeError;
    } });
    var z = na;
    Object.defineProperty(e, "FilterTypeNotSupportedError", { enumerable: !0, get: function() {
      return z.FilterTypeNotSupportedError;
    } });
    var W = ye;
    Object.defineProperty(e, "HttpRequestError", { enumerable: !0, get: function() {
      return W.HttpRequestError;
    } }), Object.defineProperty(e, "RpcRequestError", { enumerable: !0, get: function() {
      return W.RpcRequestError;
    } }), Object.defineProperty(e, "TimeoutError", { enumerable: !0, get: function() {
      return W.TimeoutError;
    } }), Object.defineProperty(e, "WebSocketRequestError", { enumerable: !0, get: function() {
      return W.WebSocketRequestError;
    } });
    var ee = He;
    Object.defineProperty(e, "InvalidAddressError", { enumerable: !0, get: function() {
      return ee.InvalidAddressError;
    } });
    var H = q;
    Object.defineProperty(e, "FeeConflictError", { enumerable: !0, get: function() {
      return H.FeeConflictError;
    } }), Object.defineProperty(e, "InvalidLegacyVError", { enumerable: !0, get: function() {
      return H.InvalidLegacyVError;
    } }), Object.defineProperty(e, "InvalidSerializableTransactionError", { enumerable: !0, get: function() {
      return H.InvalidSerializableTransactionError;
    } }), Object.defineProperty(e, "InvalidSerializedTransactionError", { enumerable: !0, get: function() {
      return H.InvalidSerializedTransactionError;
    } }), Object.defineProperty(e, "InvalidSerializedTransactionTypeError", { enumerable: !0, get: function() {
      return H.InvalidSerializedTransactionTypeError;
    } }), Object.defineProperty(e, "InvalidStorageKeySizeError", { enumerable: !0, get: function() {
      return H.InvalidStorageKeySizeError;
    } }), Object.defineProperty(e, "TransactionExecutionError", { enumerable: !0, get: function() {
      return H.TransactionExecutionError;
    } }), Object.defineProperty(e, "TransactionNotFoundError", { enumerable: !0, get: function() {
      return H.TransactionNotFoundError;
    } }), Object.defineProperty(e, "TransactionReceiptNotFoundError", { enumerable: !0, get: function() {
      return H.TransactionReceiptNotFoundError;
    } }), Object.defineProperty(e, "WaitForTransactionReceiptTimeoutError", { enumerable: !0, get: function() {
      return H.WaitForTransactionReceiptTimeoutError;
    } });
    var Z = qt;
    Object.defineProperty(e, "SizeExceedsPaddingSizeError", { enumerable: !0, get: function() {
      return Z.SizeExceedsPaddingSizeError;
    } }), Object.defineProperty(e, "SliceOffsetOutOfBoundsError", { enumerable: !0, get: function() {
      return Z.SliceOffsetOutOfBoundsError;
    } });
    var ne = rn;
    Object.defineProperty(e, "UrlRequiredError", { enumerable: !0, get: function() {
      return ne.UrlRequiredError;
    } });
    var ie = Ea;
    Object.defineProperty(e, "labelhash", { enumerable: !0, get: function() {
      return ie.labelhash;
    } });
    var me = an;
    Object.defineProperty(e, "namehash", { enumerable: !0, get: function() {
      return me.namehash;
    } });
    var Te = Ct;
    Object.defineProperty(e, "defineBlock", { enumerable: !0, get: function() {
      return Te.defineBlock;
    } }), Object.defineProperty(e, "formatBlock", { enumerable: !0, get: function() {
      return Te.formatBlock;
    } });
    var he = Et;
    Object.defineProperty(e, "formatLog", { enumerable: !0, get: function() {
      return he.formatLog;
    } });
    var Se = _t;
    Object.defineProperty(e, "decodeAbiParameters", { enumerable: !0, get: function() {
      return Se.decodeAbiParameters;
    } });
    var at = _s;
    Object.defineProperty(e, "decodeDeployData", { enumerable: !0, get: function() {
      return at.decodeDeployData;
    } });
    var Le = hr;
    Object.defineProperty(e, "decodeErrorResult", { enumerable: !0, get: function() {
      return Le.decodeErrorResult;
    } });
    var Ke = kt;
    Object.defineProperty(e, "decodeEventLog", { enumerable: !0, get: function() {
      return Ke.decodeEventLog;
    } });
    var Ze = Ia;
    Object.defineProperty(e, "decodeFunctionData", { enumerable: !0, get: function() {
      return Ze.decodeFunctionData;
    } });
    var B = rt;
    Object.defineProperty(e, "decodeFunctionResult", { enumerable: !0, get: function() {
      return B.decodeFunctionResult;
    } });
    var A = Oe;
    Object.defineProperty(e, "encodeAbiParameters", { enumerable: !0, get: function() {
      return A.encodeAbiParameters;
    } });
    var jt = on;
    Object.defineProperty(e, "encodeDeployData", { enumerable: !0, get: function() {
      return jt.encodeDeployData;
    } });
    var ot = $a;
    Object.defineProperty(e, "encodeErrorResult", { enumerable: !0, get: function() {
      return ot.encodeErrorResult;
    } });
    var Pt = Rt;
    Object.defineProperty(e, "encodeEventTopics", { enumerable: !0, get: function() {
      return Pt.encodeEventTopics;
    } });
    var _n = Ue;
    Object.defineProperty(e, "encodeFunctionData", { enumerable: !0, get: function() {
      return _n.encodeFunctionData;
    } });
    var T = Ca;
    Object.defineProperty(e, "encodeFunctionResult", { enumerable: !0, get: function() {
      return T.encodeFunctionResult;
    } });
    var O = Vr;
    Object.defineProperty(e, "defineTransaction", { enumerable: !0, get: function() {
      return O.defineTransaction;
    } }), Object.defineProperty(e, "formatTransaction", { enumerable: !0, get: function() {
      return O.formatTransaction;
    } }), Object.defineProperty(e, "transactionType", { enumerable: !0, get: function() {
      return O.transactionType;
    } });
    var C = xt;
    Object.defineProperty(e, "defineTransactionReceipt", { enumerable: !0, get: function() {
      return C.defineTransactionReceipt;
    } }), Object.defineProperty(e, "formatTransactionReceipt", { enumerable: !0, get: function() {
      return C.formatTransactionReceipt;
    } });
    var D = Kt;
    Object.defineProperty(e, "defineTransactionRequest", { enumerable: !0, get: function() {
      return D.defineTransactionRequest;
    } }), Object.defineProperty(e, "formatTransactionRequest", { enumerable: !0, get: function() {
      return D.formatTransactionRequest;
    } }), Object.defineProperty(e, "rpcTransactionType", { enumerable: !0, get: function() {
      return D.rpcTransactionType;
    } });
    var qe = je;
    Object.defineProperty(e, "getAbiItem", { enumerable: !0, get: function() {
      return qe.getAbiItem;
    } });
    var hn = ff();
    Object.defineProperty(e, "getContractAddress", { enumerable: !0, get: function() {
      return hn.getContractAddress;
    } }), Object.defineProperty(e, "getCreate2Address", { enumerable: !0, get: function() {
      return hn.getCreate2Address;
    } }), Object.defineProperty(e, "getCreateAddress", { enumerable: !0, get: function() {
      return hn.getCreateAddress;
    } });
    var Ps = bn;
    Object.defineProperty(e, "getSerializedTransactionType", { enumerable: !0, get: function() {
      return Ps.getSerializedTransactionType;
    } });
    var Ts = Er;
    Object.defineProperty(e, "getTransactionType", { enumerable: !0, get: function() {
      return Ts.getTransactionType;
    } });
    var Ga = Oa();
    Object.defineProperty(e, "hashDomain", { enumerable: !0, get: function() {
      return Ga.hashDomain;
    } }), Object.defineProperty(e, "hashTypedData", { enumerable: !0, get: function() {
      return Ga.hashTypedData;
    } });
    var As = hs;
    Object.defineProperty(e, "compactSignatureToSignature", { enumerable: !0, get: function() {
      return As.compactSignatureToSignature;
    } });
    var ws = ps;
    Object.defineProperty(e, "hexToCompactSignature", { enumerable: !0, get: function() {
      return ws.hexToCompactSignature;
    } });
    var Os = vs;
    Object.defineProperty(e, "hexToSignature", { enumerable: !0, get: function() {
      return Os.hexToSignature;
    } });
    var Is = $r;
    Object.defineProperty(e, "recoverAddress", { enumerable: !0, get: function() {
      return Is.recoverAddress;
    } });
    var $s = dn;
    Object.defineProperty(e, "recoverMessageAddress", { enumerable: !0, get: function() {
      return $s.recoverMessageAddress;
    } });
    var Cs = un;
    Object.defineProperty(e, "recoverPublicKey", { enumerable: !0, get: function() {
      return Cs.recoverPublicKey;
    } });
    var Ss = fn;
    Object.defineProperty(e, "recoverTypedDataAddress", { enumerable: !0, get: function() {
      return Ss.recoverTypedDataAddress;
    } });
    var Rs = WA();
    Object.defineProperty(e, "signatureToCompactSignature", { enumerable: !0, get: function() {
      return Rs.signatureToCompactSignature;
    } });
    var Bs = Es;
    Object.defineProperty(e, "compactSignatureToHex", { enumerable: !0, get: function() {
      return Bs.compactSignatureToHex;
    } });
    var Ms = js;
    Object.defineProperty(e, "signatureToHex", { enumerable: !0, get: function() {
      return Ms.signatureToHex;
    } });
    var pn = _i();
    Object.defineProperty(e, "bytesToRlp", { enumerable: !0, get: function() {
      return pn.bytesToRlp;
    } }), Object.defineProperty(e, "hexToRlp", { enumerable: !0, get: function() {
      return pn.hexToRlp;
    } }), Object.defineProperty(e, "toRlp", { enumerable: !0, get: function() {
      return pn.toRlp;
    } });
    var Fs = ka;
    Object.defineProperty(e, "verifyMessage", { enumerable: !0, get: function() {
      return Fs.verifyMessage;
    } });
    var Ns = Da;
    Object.defineProperty(e, "verifyTypedData", { enumerable: !0, get: function() {
      return Ns.verifyTypedData;
    } });
    var ks = vt;
    Object.defineProperty(e, "assertRequest", { enumerable: !0, get: function() {
      return ks.assertRequest;
    } });
    var Yt = Ye;
    Object.defineProperty(e, "assertTransactionEIP1559", { enumerable: !0, get: function() {
      return Yt.assertTransactionEIP1559;
    } }), Object.defineProperty(e, "assertTransactionEIP2930", { enumerable: !0, get: function() {
      return Yt.assertTransactionEIP2930;
    } }), Object.defineProperty(e, "assertTransactionLegacy", { enumerable: !0, get: function() {
      return Yt.assertTransactionLegacy;
    } });
    var er = de();
    Object.defineProperty(e, "boolToBytes", { enumerable: !0, get: function() {
      return er.boolToBytes;
    } }), Object.defineProperty(e, "hexToBytes", { enumerable: !0, get: function() {
      return er.hexToBytes;
    } }), Object.defineProperty(e, "numberToBytes", { enumerable: !0, get: function() {
      return er.numberToBytes;
    } }), Object.defineProperty(e, "stringToBytes", { enumerable: !0, get: function() {
      return er.stringToBytes;
    } }), Object.defineProperty(e, "toBytes", { enumerable: !0, get: function() {
      return er.toBytes;
    } });
    var tr = M();
    Object.defineProperty(e, "boolToHex", { enumerable: !0, get: function() {
      return tr.boolToHex;
    } }), Object.defineProperty(e, "bytesToHex", { enumerable: !0, get: function() {
      return tr.bytesToHex;
    } }), Object.defineProperty(e, "numberToHex", { enumerable: !0, get: function() {
      return tr.numberToHex;
    } }), Object.defineProperty(e, "stringToHex", { enumerable: !0, get: function() {
      return tr.stringToHex;
    } }), Object.defineProperty(e, "toHex", { enumerable: !0, get: function() {
      return tr.toHex;
    } });
    var Dt = ke;
    Object.defineProperty(e, "bytesToBigInt", { enumerable: !0, get: function() {
      return Dt.bytesToBigInt;
    } }), Object.defineProperty(e, "bytesToBigint", { enumerable: !0, get: function() {
      return Dt.bytesToBigInt;
    } }), Object.defineProperty(e, "bytesToBool", { enumerable: !0, get: function() {
      return Dt.bytesToBool;
    } }), Object.defineProperty(e, "bytesToNumber", { enumerable: !0, get: function() {
      return Dt.bytesToNumber;
    } }), Object.defineProperty(e, "bytesToString", { enumerable: !0, get: function() {
      return Dt.bytesToString;
    } }), Object.defineProperty(e, "fromBytes", { enumerable: !0, get: function() {
      return Dt.fromBytes;
    } });
    var Sr = qc();
    Object.defineProperty(e, "ccipFetch", { enumerable: !0, get: function() {
      return Sr.ccipFetch;
    } }), Object.defineProperty(e, "offchainLookup", { enumerable: !0, get: function() {
      return Sr.offchainLookup;
    } }), Object.defineProperty(e, "offchainLookupAbiItem", { enumerable: !0, get: function() {
      return Sr.offchainLookupAbiItem;
    } }), Object.defineProperty(e, "offchainLookupSignature", { enumerable: !0, get: function() {
      return Sr.offchainLookupSignature;
    } });
    var vn = oe;
    Object.defineProperty(e, "concat", { enumerable: !0, get: function() {
      return vn.concat;
    } }), Object.defineProperty(e, "concatBytes", { enumerable: !0, get: function() {
      return vn.concatBytes;
    } }), Object.defineProperty(e, "concatHex", { enumerable: !0, get: function() {
      return vn.concatHex;
    } });
    var Ds = Ar;
    Object.defineProperty(e, "assertCurrentChain", { enumerable: !0, get: function() {
      return Ds.assertCurrentChain;
    } });
    var Hs = Aa;
    Object.defineProperty(e, "defineChain", { enumerable: !0, get: function() {
      return Hs.defineChain;
    } });
    var Us = wa;
    Object.defineProperty(e, "extractChain", { enumerable: !0, get: function() {
      return Us.extractChain;
    } });
    var Ls = nt;
    Object.defineProperty(e, "getChainContractAddress", { enumerable: !0, get: function() {
      return Ls.getChainContractAddress;
    } });
    var qs = Sa;
    Object.defineProperty(e, "encodePacked", { enumerable: !0, get: function() {
      return qs.encodePacked;
    } });
    var If = Wt;
    Object.defineProperty(e, "formatEther", { enumerable: !0, get: function() {
      return If.formatEther;
    } });
    var $f = ht;
    Object.defineProperty(e, "formatGwei", { enumerable: !0, get: function() {
      return $f.formatGwei;
    } });
    var Cf = pr;
    Object.defineProperty(e, "formatUnits", { enumerable: !0, get: function() {
      return Cf.formatUnits;
    } });
    var En = ue();
    Object.defineProperty(e, "fromHex", { enumerable: !0, get: function() {
      return En.fromHex;
    } }), Object.defineProperty(e, "hexToBigInt", { enumerable: !0, get: function() {
      return En.hexToBigInt;
    } }), Object.defineProperty(e, "hexToBool", { enumerable: !0, get: function() {
      return En.hexToBool;
    } }), Object.defineProperty(e, "hexToNumber", { enumerable: !0, get: function() {
      return En.hexToNumber;
    } }), Object.defineProperty(e, "hexToString", { enumerable: !0, get: function() {
      return En.hexToString;
    } });
    var Sf = mt;
    Object.defineProperty(e, "fromRlp", { enumerable: !0, get: function() {
      return Sf.fromRlp;
    } });
    var Yc = Be;
    Object.defineProperty(e, "checksumAddress", { enumerable: !0, get: function() {
      return Yc.checksumAddress;
    } }), Object.defineProperty(e, "getAddress", { enumerable: !0, get: function() {
      return Yc.getAddress;
    } });
    var Rf = Mt;
    Object.defineProperty(e, "getContractError", { enumerable: !0, get: function() {
      return Rf.getContractError;
    } });
    var Bf = Gt;
    Object.defineProperty(e, "getEventSelector", { enumerable: !0, get: function() {
      return Bf.getEventSelector;
    } });
    var Mf = aa;
    Object.defineProperty(e, "getEventSignature", { enumerable: !0, get: function() {
      return Mf.getEventSignature;
    } });
    var Ff = yt;
    Object.defineProperty(e, "getFunctionSelector", { enumerable: !0, get: function() {
      return Ff.getFunctionSelector;
    } });
    var Nf = Gr;
    Object.defineProperty(e, "getFunctionSignature", { enumerable: !0, get: function() {
      return Nf.getFunctionSignature;
    } });
    var kf = ln;
    Object.defineProperty(e, "hashMessage", { enumerable: !0, get: function() {
      return kf.hashMessage;
    } });
    var Df = $e;
    Object.defineProperty(e, "isAddress", { enumerable: !0, get: function() {
      return Df.isAddress;
    } });
    var Hf = Jt;
    Object.defineProperty(e, "isAddressEqual", { enumerable: !0, get: function() {
      return Hf.isAddressEqual;
    } });
    var Uf = sn;
    Object.defineProperty(e, "isBytes", { enumerable: !0, get: function() {
      return Uf.isBytes;
    } });
    var Lf = cn;
    Object.defineProperty(e, "isHash", { enumerable: !0, get: function() {
      return Lf.isHash;
    } });
    var qf = ce;
    Object.defineProperty(e, "isHex", { enumerable: !0, get: function() {
      return qf.isHex;
    } });
    var xf = Ie;
    Object.defineProperty(e, "keccak256", { enumerable: !0, get: function() {
      return xf.keccak256;
    } });
    var zf = Ba;
    Object.defineProperty(e, "sha256", { enumerable: !0, get: function() {
      return zf.sha256;
    } });
    var Gf = Ma;
    Object.defineProperty(e, "ripemd160", { enumerable: !0, get: function() {
      return Gf.ripemd160;
    } });
    var xs = we;
    Object.defineProperty(e, "pad", { enumerable: !0, get: function() {
      return xs.pad;
    } }), Object.defineProperty(e, "padBytes", { enumerable: !0, get: function() {
      return xs.padBytes;
    } }), Object.defineProperty(e, "padHex", { enumerable: !0, get: function() {
      return xs.padHex;
    } });
    var Wf = Ha;
    Object.defineProperty(e, "parseEther", { enumerable: !0, get: function() {
      return Wf.parseEther;
    } });
    var Vf = Ua;
    Object.defineProperty(e, "parseGwei", { enumerable: !0, get: function() {
      return Vf.parseGwei;
    } });
    var Kf = It;
    Object.defineProperty(e, "parseTransaction", { enumerable: !0, get: function() {
      return Kf.parseTransaction;
    } });
    var Zf = Cr;
    Object.defineProperty(e, "parseUnits", { enumerable: !0, get: function() {
      return Zf.parseUnits;
    } });
    var Jf = mn;
    Object.defineProperty(e, "serializeAccessList", { enumerable: !0, get: function() {
      return Jf.serializeAccessList;
    } });
    var Xf = jf();
    Object.defineProperty(e, "serializeTransaction", { enumerable: !0, get: function() {
      return Xf.serializeTransaction;
    } });
    var Qf = We;
    Object.defineProperty(e, "size", { enumerable: !0, get: function() {
      return Qf.size;
    } });
    var zs = Ee;
    Object.defineProperty(e, "slice", { enumerable: !0, get: function() {
      return zs.slice;
    } }), Object.defineProperty(e, "sliceBytes", { enumerable: !0, get: function() {
      return zs.sliceBytes;
    } }), Object.defineProperty(e, "sliceHex", { enumerable: !0, get: function() {
      return zs.sliceHex;
    } });
    var Yf = _e;
    Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return Yf.stringify;
    } });
    var eb = et;
    Object.defineProperty(e, "trim", { enumerable: !0, get: function() {
      return eb.trim;
    } });
    var Gs = yi();
    Object.defineProperty(e, "validateTypedData", { enumerable: !0, get: function() {
      return Gs.validateTypedData;
    } }), Object.defineProperty(e, "domainSeparator", { enumerable: !0, get: function() {
      return Gs.domainSeparator;
    } }), Object.defineProperty(e, "getTypesForEIP712Domain", { enumerable: !0, get: function() {
      return Gs.getTypesForEIP712Domain;
    } });
  }(Ws)), Ws;
}
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.MAGIC_VALUE_BYTES = Lr.MAGIC_VALUE = void 0;
const QA = "0x1626ba7e";
Lr.MAGIC_VALUE = QA;
const YA = "0x20c13b0b";
Lr.MAGIC_VALUE_BYTES = YA;
var Xc = {}, za = {}, br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.PermissionsError = br.PERMISSIONS_REQUEST_REJECTED = void 0;
br.PERMISSIONS_REQUEST_REJECTED = 4001;
class Qc extends Error {
  constructor(t, r, n) {
    super(t), this.code = r, this.data = n, Object.setPrototypeOf(this, Qc.prototype);
  }
}
br.PermissionsError = Qc;
Object.defineProperty(za, "__esModule", { value: !0 });
za.Wallet = void 0;
const Pc = mr, Ya = br;
class ew {
  constructor(t) {
    this.communicator = t;
  }
  async getPermissions() {
    return (await this.communicator.send(Pc.Methods.wallet_getPermissions, void 0)).data;
  }
  async requestPermissions(t) {
    if (!this.isPermissionRequestValid(t))
      throw new Ya.PermissionsError("Permissions request is invalid", Ya.PERMISSIONS_REQUEST_REJECTED);
    try {
      return (await this.communicator.send(Pc.Methods.wallet_requestPermissions, t)).data;
    } catch {
      throw new Ya.PermissionsError("Permissions rejected", Ya.PERMISSIONS_REQUEST_REJECTED);
    }
  }
  isPermissionRequestValid(t) {
    return t.every((r) => typeof r == "object" ? Object.keys(r).every((n) => !!Object.values(Pc.RestrictedMethods).includes(n)) : !1);
  }
}
za.Wallet = ew;
Object.defineProperty(Xc, "__esModule", { value: !0 });
const tw = za, xd = br, zd = (e, t) => t.some((r) => r.parentCapability === e), rw = () => (e, t, r) => {
  const n = r.value;
  return r.value = async function() {
    const a = new tw.Wallet(this.communicator);
    let o = await a.getPermissions();
    if (zd(t, o) || (o = await a.requestPermissions([{ [t]: {} }])), !zd(t, o))
      throw new xd.PermissionsError("Permissions rejected", xd.PERMISSIONS_REQUEST_REJECTED);
    return n.apply(this);
  }, r;
};
Xc.default = rw;
var nw = J && J.__decorate || function(e, t, r, n) {
  var a = arguments.length, o = a < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n, i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    o = Reflect.decorate(e, t, r, n);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (i = e[s]) && (o = (a < 3 ? i(o) : a > 3 ? i(t, r, o) : i(t, r)) || o);
  return a > 3 && o && Object.defineProperty(t, r, o), o;
}, aw = J && J.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Eo, "__esModule", { value: !0 });
Eo.Safe = void 0;
const eo = wf(), Gd = Lr, Ht = mr, Wd = Jn, ow = yo, iw = aw(Xc);
class Of {
  constructor(t) {
    this.communicator = t;
  }
  async getChainInfo() {
    return (await this.communicator.send(Ht.Methods.getChainInfo, void 0)).data;
  }
  async getInfo() {
    return (await this.communicator.send(Ht.Methods.getSafeInfo, void 0)).data;
  }
  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency: t = "usd" } = {}) {
    return (await this.communicator.send(Ht.Methods.getSafeBalances, {
      currency: t
    })).data;
  }
  async check1271Signature(t, r = "0x") {
    const n = await this.getInfo(), a = (0, eo.encodeFunctionData)({
      abi: [
        {
          constant: !1,
          inputs: [
            {
              name: "_dataHash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: !1,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [t, r]
    }), o = {
      call: Wd.RPC_CALLS.eth_call,
      params: [
        {
          to: n.safeAddress,
          data: a
        },
        "latest"
      ]
    };
    try {
      return (await this.communicator.send(Ht.Methods.rpcCall, o)).data.slice(0, 10).toLowerCase() === Gd.MAGIC_VALUE;
    } catch {
      return !1;
    }
  }
  async check1271SignatureBytes(t, r = "0x") {
    const n = await this.getInfo(), a = (0, eo.encodeFunctionData)({
      abi: [
        {
          constant: !1,
          inputs: [
            {
              name: "_data",
              type: "bytes"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: !1,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [t, r]
    }), o = {
      call: Wd.RPC_CALLS.eth_call,
      params: [
        {
          to: n.safeAddress,
          data: a
        },
        "latest"
      ]
    };
    try {
      return (await this.communicator.send(Ht.Methods.rpcCall, o)).data.slice(0, 10).toLowerCase() === Gd.MAGIC_VALUE_BYTES;
    } catch {
      return !1;
    }
  }
  calculateMessageHash(t) {
    return (0, eo.hashMessage)(t);
  }
  calculateTypedMessageHash(t) {
    const r = typeof t.domain.chainId == "object" ? t.domain.chainId.toNumber() : Number(t.domain.chainId);
    let n = t.primaryType;
    if (!n) {
      const a = Object.values(t.types), o = Object.keys(t.types).filter((i) => a.every((s) => s.every(({ type: c }) => c.replace("[", "").replace("]", "") !== i)));
      if (o.length === 0 || o.length > 1)
        throw new Error("Please specify primaryType");
      n = o[0];
    }
    return (0, eo.hashTypedData)({
      message: t.message,
      domain: Object.assign(Object.assign({}, t.domain), { chainId: r, verifyingContract: t.domain.verifyingContract, salt: t.domain.salt }),
      types: t.types,
      primaryType: n
    });
  }
  async getOffChainSignature(t) {
    return (await this.communicator.send(Ht.Methods.getOffChainSignature, t)).data;
  }
  async isMessageSigned(t, r = "0x") {
    let n;
    if (typeof t == "string" && (n = async () => {
      const a = this.calculateMessageHash(t);
      return await this.isMessageHashSigned(a, r);
    }), (0, ow.isObjectEIP712TypedData)(t) && (n = async () => {
      const a = this.calculateTypedMessageHash(t);
      return await this.isMessageHashSigned(a, r);
    }), n)
      return await n();
    throw new Error("Invalid message type");
  }
  async isMessageHashSigned(t, r = "0x") {
    const n = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
    for (const a of n)
      if (await a(t, r))
        return !0;
    return !1;
  }
  async getEnvironmentInfo() {
    return (await this.communicator.send(Ht.Methods.getEnvironmentInfo, void 0)).data;
  }
  async requestAddressBook() {
    return (await this.communicator.send(Ht.Methods.requestAddressBook, void 0)).data;
  }
}
nw([
  (0, iw.default)()
], Of.prototype, "requestAddressBook", null);
Eo.Safe = Of;
var sw = J && J.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ro, "__esModule", { value: !0 });
const cw = sw(Kd), uw = go, dw = vo, lw = Eo, fw = za;
class bw {
  constructor(t = {}) {
    const { allowedDomains: r = null, debug: n = !1 } = t;
    this.communicator = new cw.default(r, n), this.eth = new dw.Eth(this.communicator), this.txs = new uw.TXs(this.communicator), this.safe = new lw.Safe(this.communicator), this.wallet = new fw.Wallet(this.communicator);
  }
}
ro.default = bw;
(function(e) {
  var t = J && J.__createBinding || (Object.create ? function(i, s, c, m) {
    m === void 0 && (m = c);
    var u = Object.getOwnPropertyDescriptor(s, c);
    (!u || ("get" in u ? !s.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
      return s[c];
    } }), Object.defineProperty(i, m, u);
  } : function(i, s, c, m) {
    m === void 0 && (m = c), i[m] = s[c];
  }), r = J && J.__exportStar || function(i, s) {
    for (var c in i)
      c !== "default" && !Object.prototype.hasOwnProperty.call(s, c) && t(s, i, c);
  }, n = J && J.__importDefault || function(i) {
    return i && i.__esModule ? i : { default: i };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getSDKVersion = void 0;
  const a = n(ro);
  e.default = a.default, r(ro, e), r(yo, e), r(mr, e), r(Kn, e);
  var o = Zn;
  Object.defineProperty(e, "getSDKVersion", { enumerable: !0, get: function() {
    return o.getSDKVersion;
  } });
})(Vd);
const mw = /* @__PURE__ */ ob(Vd), _w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mw
}, Symbol.toStringTag, { value: "Module" }));
export {
  _w as i
};
