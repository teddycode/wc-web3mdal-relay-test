import { t as Fe, i as ni, p as ln, j as dn, l as cn, r as pn, O as $e, v as mn, x as Ni, z as xi, A as gn, D as Ri, F as An, M as oi, G as ne, I as oe, J as Wr, f as se, K as si, L as vn, R as wn } from "./client-CWmvRiz4.js";
var j = {};
Object.defineProperty(j, "__esModule", { value: !0 });
j.getLocalStorage = j.getLocalStorageOrThrow = j.getCrypto = j.getCryptoOrThrow = j.getLocation = j.getLocationOrThrow = j.getNavigator = j.getNavigatorOrThrow = j.getDocument = j.getDocumentOrThrow = j.getFromWindowOrThrow = j.getFromWindow = void 0;
function Dr(t) {
  let r;
  return typeof window < "u" && typeof window[t] < "u" && (r = window[t]), r;
}
j.getFromWindow = Dr;
function Kr(t) {
  const r = Dr(t);
  if (!r)
    throw new Error(`${t} is not defined in Window`);
  return r;
}
j.getFromWindowOrThrow = Kr;
function bn() {
  return Kr("document");
}
j.getDocumentOrThrow = bn;
function yn() {
  return Dr("document");
}
j.getDocument = yn;
function Mn() {
  return Kr("navigator");
}
j.getNavigatorOrThrow = Mn;
function Sn() {
  return Dr("navigator");
}
j.getNavigator = Sn;
function En() {
  return Kr("location");
}
j.getLocationOrThrow = En;
function Bn() {
  return Dr("location");
}
j.getLocation = Bn;
function In() {
  return Kr("crypto");
}
j.getCryptoOrThrow = In;
function Cn() {
  return Dr("crypto");
}
j.getCrypto = Cn;
function Nn() {
  return Kr("localStorage");
}
j.getLocalStorageOrThrow = Nn;
function xn() {
  return Dr("localStorage");
}
j.getLocalStorage = xn;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.getWindowMetadata = void 0;
const hi = j;
function Rn() {
  let t, r;
  try {
    t = hi.getDocumentOrThrow(), r = hi.getLocationOrThrow();
  } catch {
    return null;
  }
  function e() {
    const M = t.getElementsByTagName("link"), B = [];
    for (let C = 0; C < M.length; C++) {
      const N = M[C], O = N.getAttribute("rel");
      if (O && O.toLowerCase().indexOf("icon") > -1) {
        const x = N.getAttribute("href");
        if (x)
          if (x.toLowerCase().indexOf("https:") === -1 && x.toLowerCase().indexOf("http:") === -1 && x.indexOf("//") !== 0) {
            let q = r.protocol + "//" + r.host;
            if (x.indexOf("/") === 0)
              q += x;
            else {
              const X = r.pathname.split("/");
              X.pop();
              const _t = X.join("/");
              q += _t + "/" + x;
            }
            B.push(q);
          } else if (x.indexOf("//") === 0) {
            const q = r.protocol + x;
            B.push(q);
          } else
            B.push(x);
      }
    }
    return B;
  }
  function n(...M) {
    const B = t.getElementsByTagName("meta");
    for (let C = 0; C < B.length; C++) {
      const N = B[C], O = ["itemprop", "property", "name"].map((x) => N.getAttribute(x)).filter((x) => x ? M.includes(x) : !1);
      if (O.length && O) {
        const x = N.getAttribute("content");
        if (x)
          return x;
      }
    }
    return "";
  }
  function f() {
    let M = n("name", "og:site_name", "og:title", "twitter:title");
    return M || (M = t.title), M;
  }
  function s() {
    return n("description", "og:description", "twitter:description", "keywords");
  }
  const d = f(), v = s(), w = r.origin, g = e();
  return {
    description: v,
    url: w,
    icons: g,
    name: d
  };
}
ti.getWindowMetadata = Rn;
var _i = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof ni < "u" ? ni : typeof self < "u" ? self : {};
function _n(t) {
  var r = t.default;
  if (typeof r == "function") {
    var e = function() {
      return r.apply(this, arguments);
    };
    e.prototype = r.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var f = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(e, n, f.get ? f : { enumerable: !0, get: function() {
      return t[n];
    } });
  }), e;
}
var Tn = { exports: {} };
/**
* [js-sha3]{@link https://github.com/emn178/js-sha3}
*
* @version 0.8.0
* @author Chen, Yi-Cyuan [emn178@gmail.com]
* @copyright Chen, Yi-Cyuan 2015-2018
* @license MIT
*/
(function(t) {
  (function() {
    var r = "input is invalid type", e = "finalize already called", n = typeof window == "object", f = n ? window : {};
    f.JS_SHA3_NO_WINDOW && (n = !1);
    var s = !n && typeof self == "object", d = !f.JS_SHA3_NO_NODE_JS && typeof Fe == "object" && Fe.versions && Fe.versions.node;
    d ? f = _i : s && (f = self);
    var v = !f.JS_SHA3_NO_COMMON_JS && !0 && t.exports, w = !f.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", g = "0123456789abcdef".split(""), y = [31, 7936, 2031616, 520093696], M = [4, 1024, 262144, 67108864], B = [1, 256, 65536, 16777216], C = [6, 1536, 393216, 100663296], N = [0, 8, 16, 24], O = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648], x = [224, 256, 384, 512], q = [128, 256], X = ["hex", "buffer", "arrayBuffer", "array", "digest"], _t = { 128: 168, 256: 136 };
    (f.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(a) {
      return Object.prototype.toString.call(a) === "[object Array]";
    }), w && (f.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(a) {
      return typeof a == "object" && a.buffer && a.buffer.constructor === ArrayBuffer;
    });
    for (var J = function(a, E, S) {
      return function(I) {
        return new l(a, E, a).update(I)[S]();
      };
    }, K = function(a, E, S) {
      return function(I, F) {
        return new l(a, E, F).update(I)[S]();
      };
    }, H = function(a, E, S) {
      return function(I, F, R, _) {
        return h["cshake" + a].update(I, F, R, _)[S]();
      };
    }, Tt = function(a, E, S) {
      return function(I, F, R, _) {
        return h["kmac" + a].update(I, F, R, _)[S]();
      };
    }, Z = function(a, E, S, I) {
      for (var F = 0; F < X.length; ++F) {
        var R = X[F];
        a[R] = E(S, I, R);
      }
      return a;
    }, Ut = function(a, E) {
      var S = J(a, E, "hex");
      return S.create = function() {
        return new l(a, E, a);
      }, S.update = function(I) {
        return S.create().update(I);
      }, Z(S, J, a, E);
    }, Ht = function(a, E) {
      var S = K(a, E, "hex");
      return S.create = function(I) {
        return new l(a, E, I);
      }, S.update = function(I, F) {
        return S.create(F).update(I);
      }, Z(S, K, a, E);
    }, G = function(a, E) {
      var S = _t[a], I = H(a, E, "hex");
      return I.create = function(F, R, _) {
        return !R && !_ ? h["shake" + a].create(F) : new l(a, E, F).bytepad([R, _], S);
      }, I.update = function(F, R, _, U) {
        return I.create(R, _, U).update(F);
      }, Z(I, H, a, E);
    }, Yt = function(a, E) {
      var S = _t[a], I = Tt(a, E, "hex");
      return I.create = function(F, R, _) {
        return new D(a, E, R).bytepad(["KMAC", _], S).bytepad([F], S);
      }, I.update = function(F, R, _, U) {
        return I.create(F, _, U).update(R);
      }, Z(I, Tt, a, E);
    }, i = [{ name: "keccak", padding: B, bits: x, createMethod: Ut }, { name: "sha3", padding: C, bits: x, createMethod: Ut }, { name: "shake", padding: y, bits: q, createMethod: Ht }, { name: "cshake", padding: M, bits: q, createMethod: G }, { name: "kmac", padding: M, bits: q, createMethod: Yt }], h = {}, u = [], c = 0; c < i.length; ++c)
      for (var m = i[c], A = m.bits, b = 0; b < A.length; ++b) {
        var p = m.name + "_" + A[b];
        if (u.push(p), h[p] = m.createMethod(A[b], m.padding), m.name !== "sha3") {
          var o = m.name + A[b];
          u.push(o), h[o] = h[p];
        }
      }
    function l(a, E, S) {
      this.blocks = [], this.s = [], this.padding = E, this.outputBits = S, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (a << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = S >> 5, this.extraBytes = (S & 31) >> 3;
      for (var I = 0; I < 50; ++I)
        this.s[I] = 0;
    }
    l.prototype.update = function(a) {
      if (this.finalized)
        throw new Error(e);
      var E, S = typeof a;
      if (S !== "string") {
        if (S === "object") {
          if (a === null)
            throw new Error(r);
          if (w && a.constructor === ArrayBuffer)
            a = new Uint8Array(a);
          else if (!Array.isArray(a) && (!w || !ArrayBuffer.isView(a)))
            throw new Error(r);
        } else
          throw new Error(r);
        E = !0;
      }
      for (var I = this.blocks, F = this.byteCount, R = a.length, _ = this.blockCount, U = 0, P = this.s, T, V; U < R; ) {
        if (this.reset)
          for (this.reset = !1, I[0] = this.block, T = 1; T < _ + 1; ++T)
            I[T] = 0;
        if (E)
          for (T = this.start; U < R && T < F; ++U)
            I[T >> 2] |= a[U] << N[T++ & 3];
        else
          for (T = this.start; U < R && T < F; ++U)
            V = a.charCodeAt(U), V < 128 ? I[T >> 2] |= V << N[T++ & 3] : V < 2048 ? (I[T >> 2] |= (192 | V >> 6) << N[T++ & 3], I[T >> 2] |= (128 | V & 63) << N[T++ & 3]) : V < 55296 || V >= 57344 ? (I[T >> 2] |= (224 | V >> 12) << N[T++ & 3], I[T >> 2] |= (128 | V >> 6 & 63) << N[T++ & 3], I[T >> 2] |= (128 | V & 63) << N[T++ & 3]) : (V = 65536 + ((V & 1023) << 10 | a.charCodeAt(++U) & 1023), I[T >> 2] |= (240 | V >> 18) << N[T++ & 3], I[T >> 2] |= (128 | V >> 12 & 63) << N[T++ & 3], I[T >> 2] |= (128 | V >> 6 & 63) << N[T++ & 3], I[T >> 2] |= (128 | V & 63) << N[T++ & 3]);
        if (this.lastByteIndex = T, T >= F) {
          for (this.start = T - F, this.block = I[_], T = 0; T < _; ++T)
            P[T] ^= I[T];
          k(P), this.reset = !0;
        } else
          this.start = T;
      }
      return this;
    }, l.prototype.encode = function(a, E) {
      var S = a & 255, I = 1, F = [S];
      for (a = a >> 8, S = a & 255; S > 0; )
        F.unshift(S), a = a >> 8, S = a & 255, ++I;
      return E ? F.push(I) : F.unshift(I), this.update(F), F.length;
    }, l.prototype.encodeString = function(a) {
      var E, S = typeof a;
      if (S !== "string") {
        if (S === "object") {
          if (a === null)
            throw new Error(r);
          if (w && a.constructor === ArrayBuffer)
            a = new Uint8Array(a);
          else if (!Array.isArray(a) && (!w || !ArrayBuffer.isView(a)))
            throw new Error(r);
        } else
          throw new Error(r);
        E = !0;
      }
      var I = 0, F = a.length;
      if (E)
        I = F;
      else
        for (var R = 0; R < a.length; ++R) {
          var _ = a.charCodeAt(R);
          _ < 128 ? I += 1 : _ < 2048 ? I += 2 : _ < 55296 || _ >= 57344 ? I += 3 : (_ = 65536 + ((_ & 1023) << 10 | a.charCodeAt(++R) & 1023), I += 4);
        }
      return I += this.encode(I * 8), this.update(a), I;
    }, l.prototype.bytepad = function(a, E) {
      for (var S = this.encode(E), I = 0; I < a.length; ++I)
        S += this.encodeString(a[I]);
      var F = E - S % E, R = [];
      return R.length = F, this.update(R), this;
    }, l.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var a = this.blocks, E = this.lastByteIndex, S = this.blockCount, I = this.s;
        if (a[E >> 2] |= this.padding[E & 3], this.lastByteIndex === this.byteCount)
          for (a[0] = a[S], E = 1; E < S + 1; ++E)
            a[E] = 0;
        for (a[S - 1] |= 2147483648, E = 0; E < S; ++E)
          I[E] ^= a[E];
        k(I);
      }
    }, l.prototype.toString = l.prototype.hex = function() {
      this.finalize();
      for (var a = this.blockCount, E = this.s, S = this.outputBlocks, I = this.extraBytes, F = 0, R = 0, _ = "", U; R < S; ) {
        for (F = 0; F < a && R < S; ++F, ++R)
          U = E[F], _ += g[U >> 4 & 15] + g[U & 15] + g[U >> 12 & 15] + g[U >> 8 & 15] + g[U >> 20 & 15] + g[U >> 16 & 15] + g[U >> 28 & 15] + g[U >> 24 & 15];
        R % a === 0 && (k(E), F = 0);
      }
      return I && (U = E[F], _ += g[U >> 4 & 15] + g[U & 15], I > 1 && (_ += g[U >> 12 & 15] + g[U >> 8 & 15]), I > 2 && (_ += g[U >> 20 & 15] + g[U >> 16 & 15])), _;
    }, l.prototype.arrayBuffer = function() {
      this.finalize();
      var a = this.blockCount, E = this.s, S = this.outputBlocks, I = this.extraBytes, F = 0, R = 0, _ = this.outputBits >> 3, U;
      I ? U = new ArrayBuffer(S + 1 << 2) : U = new ArrayBuffer(_);
      for (var P = new Uint32Array(U); R < S; ) {
        for (F = 0; F < a && R < S; ++F, ++R)
          P[R] = E[F];
        R % a === 0 && k(E);
      }
      return I && (P[F] = E[F], U = U.slice(0, _)), U;
    }, l.prototype.buffer = l.prototype.arrayBuffer, l.prototype.digest = l.prototype.array = function() {
      this.finalize();
      for (var a = this.blockCount, E = this.s, S = this.outputBlocks, I = this.extraBytes, F = 0, R = 0, _ = [], U, P; R < S; ) {
        for (F = 0; F < a && R < S; ++F, ++R)
          U = R << 2, P = E[F], _[U] = P & 255, _[U + 1] = P >> 8 & 255, _[U + 2] = P >> 16 & 255, _[U + 3] = P >> 24 & 255;
        R % a === 0 && k(E);
      }
      return I && (U = R << 2, P = E[F], _[U] = P & 255, I > 1 && (_[U + 1] = P >> 8 & 255), I > 2 && (_[U + 2] = P >> 16 & 255)), _;
    };
    function D(a, E, S) {
      l.call(this, a, E, S);
    }
    D.prototype = new l(), D.prototype.finalize = function() {
      return this.encode(this.outputBits, !0), l.prototype.finalize.call(this);
    };
    var k = function(a) {
      var E, S, I, F, R, _, U, P, T, V, $, tt, yr, rt, et, Mr, it, nt, Sr, ot, st, Er, ht, ft, Br, at, ut, Ir, lt, dt, Cr, ct, pt, Nr, mt, gt, xr, At, vt, Rr, wt, bt, _r, yt, Mt, Tr, St, Et, Fr, Bt, It, kr, Ct, Nt, Or, xt, Rt, lr, dr, cr, pr, mr, gr;
      for (I = 0; I < 48; I += 2)
        F = a[0] ^ a[10] ^ a[20] ^ a[30] ^ a[40], R = a[1] ^ a[11] ^ a[21] ^ a[31] ^ a[41], _ = a[2] ^ a[12] ^ a[22] ^ a[32] ^ a[42], U = a[3] ^ a[13] ^ a[23] ^ a[33] ^ a[43], P = a[4] ^ a[14] ^ a[24] ^ a[34] ^ a[44], T = a[5] ^ a[15] ^ a[25] ^ a[35] ^ a[45], V = a[6] ^ a[16] ^ a[26] ^ a[36] ^ a[46], $ = a[7] ^ a[17] ^ a[27] ^ a[37] ^ a[47], tt = a[8] ^ a[18] ^ a[28] ^ a[38] ^ a[48], yr = a[9] ^ a[19] ^ a[29] ^ a[39] ^ a[49], E = tt ^ (_ << 1 | U >>> 31), S = yr ^ (U << 1 | _ >>> 31), a[0] ^= E, a[1] ^= S, a[10] ^= E, a[11] ^= S, a[20] ^= E, a[21] ^= S, a[30] ^= E, a[31] ^= S, a[40] ^= E, a[41] ^= S, E = F ^ (P << 1 | T >>> 31), S = R ^ (T << 1 | P >>> 31), a[2] ^= E, a[3] ^= S, a[12] ^= E, a[13] ^= S, a[22] ^= E, a[23] ^= S, a[32] ^= E, a[33] ^= S, a[42] ^= E, a[43] ^= S, E = _ ^ (V << 1 | $ >>> 31), S = U ^ ($ << 1 | V >>> 31), a[4] ^= E, a[5] ^= S, a[14] ^= E, a[15] ^= S, a[24] ^= E, a[25] ^= S, a[34] ^= E, a[35] ^= S, a[44] ^= E, a[45] ^= S, E = P ^ (tt << 1 | yr >>> 31), S = T ^ (yr << 1 | tt >>> 31), a[6] ^= E, a[7] ^= S, a[16] ^= E, a[17] ^= S, a[26] ^= E, a[27] ^= S, a[36] ^= E, a[37] ^= S, a[46] ^= E, a[47] ^= S, E = V ^ (F << 1 | R >>> 31), S = $ ^ (R << 1 | F >>> 31), a[8] ^= E, a[9] ^= S, a[18] ^= E, a[19] ^= S, a[28] ^= E, a[29] ^= S, a[38] ^= E, a[39] ^= S, a[48] ^= E, a[49] ^= S, rt = a[0], et = a[1], Tr = a[11] << 4 | a[10] >>> 28, St = a[10] << 4 | a[11] >>> 28, Ir = a[20] << 3 | a[21] >>> 29, lt = a[21] << 3 | a[20] >>> 29, cr = a[31] << 9 | a[30] >>> 23, pr = a[30] << 9 | a[31] >>> 23, bt = a[40] << 18 | a[41] >>> 14, _r = a[41] << 18 | a[40] >>> 14, Nr = a[2] << 1 | a[3] >>> 31, mt = a[3] << 1 | a[2] >>> 31, Mr = a[13] << 12 | a[12] >>> 20, it = a[12] << 12 | a[13] >>> 20, Et = a[22] << 10 | a[23] >>> 22, Fr = a[23] << 10 | a[22] >>> 22, dt = a[33] << 13 | a[32] >>> 19, Cr = a[32] << 13 | a[33] >>> 19, mr = a[42] << 2 | a[43] >>> 30, gr = a[43] << 2 | a[42] >>> 30, Nt = a[5] << 30 | a[4] >>> 2, Or = a[4] << 30 | a[5] >>> 2, gt = a[14] << 6 | a[15] >>> 26, xr = a[15] << 6 | a[14] >>> 26, nt = a[25] << 11 | a[24] >>> 21, Sr = a[24] << 11 | a[25] >>> 21, Bt = a[34] << 15 | a[35] >>> 17, It = a[35] << 15 | a[34] >>> 17, ct = a[45] << 29 | a[44] >>> 3, pt = a[44] << 29 | a[45] >>> 3, ft = a[6] << 28 | a[7] >>> 4, Br = a[7] << 28 | a[6] >>> 4, xt = a[17] << 23 | a[16] >>> 9, Rt = a[16] << 23 | a[17] >>> 9, At = a[26] << 25 | a[27] >>> 7, vt = a[27] << 25 | a[26] >>> 7, ot = a[36] << 21 | a[37] >>> 11, st = a[37] << 21 | a[36] >>> 11, kr = a[47] << 24 | a[46] >>> 8, Ct = a[46] << 24 | a[47] >>> 8, yt = a[8] << 27 | a[9] >>> 5, Mt = a[9] << 27 | a[8] >>> 5, at = a[18] << 20 | a[19] >>> 12, ut = a[19] << 20 | a[18] >>> 12, lr = a[29] << 7 | a[28] >>> 25, dr = a[28] << 7 | a[29] >>> 25, Rr = a[38] << 8 | a[39] >>> 24, wt = a[39] << 8 | a[38] >>> 24, Er = a[48] << 14 | a[49] >>> 18, ht = a[49] << 14 | a[48] >>> 18, a[0] = rt ^ ~Mr & nt, a[1] = et ^ ~it & Sr, a[10] = ft ^ ~at & Ir, a[11] = Br ^ ~ut & lt, a[20] = Nr ^ ~gt & At, a[21] = mt ^ ~xr & vt, a[30] = yt ^ ~Tr & Et, a[31] = Mt ^ ~St & Fr, a[40] = Nt ^ ~xt & lr, a[41] = Or ^ ~Rt & dr, a[2] = Mr ^ ~nt & ot, a[3] = it ^ ~Sr & st, a[12] = at ^ ~Ir & dt, a[13] = ut ^ ~lt & Cr, a[22] = gt ^ ~At & Rr, a[23] = xr ^ ~vt & wt, a[32] = Tr ^ ~Et & Bt, a[33] = St ^ ~Fr & It, a[42] = xt ^ ~lr & cr, a[43] = Rt ^ ~dr & pr, a[4] = nt ^ ~ot & Er, a[5] = Sr ^ ~st & ht, a[14] = Ir ^ ~dt & ct, a[15] = lt ^ ~Cr & pt, a[24] = At ^ ~Rr & bt, a[25] = vt ^ ~wt & _r, a[34] = Et ^ ~Bt & kr, a[35] = Fr ^ ~It & Ct, a[44] = lr ^ ~cr & mr, a[45] = dr ^ ~pr & gr, a[6] = ot ^ ~Er & rt, a[7] = st ^ ~ht & et, a[16] = dt ^ ~ct & ft, a[17] = Cr ^ ~pt & Br, a[26] = Rr ^ ~bt & Nr, a[27] = wt ^ ~_r & mt, a[36] = Bt ^ ~kr & yt, a[37] = It ^ ~Ct & Mt, a[46] = cr ^ ~mr & Nt, a[47] = pr ^ ~gr & Or, a[8] = Er ^ ~rt & Mr, a[9] = ht ^ ~et & it, a[18] = ct ^ ~ft & at, a[19] = pt ^ ~Br & ut, a[28] = bt ^ ~Nr & gt, a[29] = _r ^ ~mt & xr, a[38] = kr ^ ~yt & Tr, a[39] = Ct ^ ~Mt & St, a[48] = mr ^ ~Nt & xt, a[49] = gr ^ ~Or & Rt, a[0] ^= O[I], a[1] ^= O[I + 1];
    };
    if (v)
      t.exports = h;
    else
      for (c = 0; c < u.length; ++c)
        f[u[c]] = h[u[c]];
  })();
})(Tn);
const Fn = "logger/5.7.0";
let fi = !1, ai = !1;
const de = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let ui = de.default, ke = null;
function kn() {
  try {
    const t = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((r) => {
      try {
        if ("test".normalize(r) !== "test")
          throw new Error("bad normalize");
      } catch {
        t.push(r);
      }
    }), t.length)
      throw new Error("missing " + t.join(", "));
    if ("é".normalize("NFD") !== "é")
      throw new Error("broken implementation");
  } catch (t) {
    return t.message;
  }
  return null;
}
const li = kn();
var Je;
(function(t) {
  t.DEBUG = "DEBUG", t.INFO = "INFO", t.WARNING = "WARNING", t.ERROR = "ERROR", t.OFF = "OFF";
})(Je || (Je = {}));
var Xt;
(function(t) {
  t.UNKNOWN_ERROR = "UNKNOWN_ERROR", t.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", t.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", t.NETWORK_ERROR = "NETWORK_ERROR", t.SERVER_ERROR = "SERVER_ERROR", t.TIMEOUT = "TIMEOUT", t.BUFFER_OVERRUN = "BUFFER_OVERRUN", t.NUMERIC_FAULT = "NUMERIC_FAULT", t.MISSING_NEW = "MISSING_NEW", t.INVALID_ARGUMENT = "INVALID_ARGUMENT", t.MISSING_ARGUMENT = "MISSING_ARGUMENT", t.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", t.CALL_EXCEPTION = "CALL_EXCEPTION", t.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", t.NONCE_EXPIRED = "NONCE_EXPIRED", t.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", t.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", t.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", t.ACTION_REJECTED = "ACTION_REJECTED";
})(Xt || (Xt = {}));
const di = "0123456789abcdef";
class Y {
  constructor(r) {
    Object.defineProperty(this, "version", { enumerable: !0, value: r, writable: !1 });
  }
  _log(r, e) {
    const n = r.toLowerCase();
    de[n] == null && this.throwArgumentError("invalid log level name", "logLevel", r), !(ui > de[n]) && console.log.apply(console, e);
  }
  debug(...r) {
    this._log(Y.levels.DEBUG, r);
  }
  info(...r) {
    this._log(Y.levels.INFO, r);
  }
  warn(...r) {
    this._log(Y.levels.WARNING, r);
  }
  makeError(r, e, n) {
    if (ai)
      return this.makeError("censored error", e, {});
    e || (e = Y.errors.UNKNOWN_ERROR), n || (n = {});
    const f = [];
    Object.keys(n).forEach((w) => {
      const g = n[w];
      try {
        if (g instanceof Uint8Array) {
          let y = "";
          for (let M = 0; M < g.length; M++)
            y += di[g[M] >> 4], y += di[g[M] & 15];
          f.push(w + "=Uint8Array(0x" + y + ")");
        } else
          f.push(w + "=" + JSON.stringify(g));
      } catch {
        f.push(w + "=" + JSON.stringify(n[w].toString()));
      }
    }), f.push(`code=${e}`), f.push(`version=${this.version}`);
    const s = r;
    let d = "";
    switch (e) {
      case Xt.NUMERIC_FAULT: {
        d = "NUMERIC_FAULT";
        const w = r;
        switch (w) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            d += "-" + w;
            break;
          case "negative-power":
          case "negative-width":
            d += "-unsupported";
            break;
          case "unbound-bitwise-result":
            d += "-unbound-result";
            break;
        }
        break;
      }
      case Xt.CALL_EXCEPTION:
      case Xt.INSUFFICIENT_FUNDS:
      case Xt.MISSING_NEW:
      case Xt.NONCE_EXPIRED:
      case Xt.REPLACEMENT_UNDERPRICED:
      case Xt.TRANSACTION_REPLACED:
      case Xt.UNPREDICTABLE_GAS_LIMIT:
        d = e;
        break;
    }
    d && (r += " [ See: https://links.ethers.org/v5-errors-" + d + " ]"), f.length && (r += " (" + f.join(", ") + ")");
    const v = new Error(r);
    return v.reason = s, v.code = e, Object.keys(n).forEach(function(w) {
      v[w] = n[w];
    }), v;
  }
  throwError(r, e, n) {
    throw this.makeError(r, e, n);
  }
  throwArgumentError(r, e, n) {
    return this.throwError(r, Y.errors.INVALID_ARGUMENT, { argument: e, value: n });
  }
  assert(r, e, n, f) {
    r || this.throwError(e, n, f);
  }
  assertArgument(r, e, n, f) {
    r || this.throwArgumentError(e, n, f);
  }
  checkNormalize(r) {
    li && this.throwError("platform missing String.prototype.normalize", Y.errors.UNSUPPORTED_OPERATION, { operation: "String.prototype.normalize", form: li });
  }
  checkSafeUint53(r, e) {
    typeof r == "number" && (e == null && (e = "value not safe"), (r < 0 || r >= 9007199254740991) && this.throwError(e, Y.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "out-of-safe-range", value: r }), r % 1 && this.throwError(e, Y.errors.NUMERIC_FAULT, { operation: "checkSafeInteger", fault: "non-integer", value: r }));
  }
  checkArgumentCount(r, e, n) {
    n ? n = ": " + n : n = "", r < e && this.throwError("missing argument" + n, Y.errors.MISSING_ARGUMENT, { count: r, expectedCount: e }), r > e && this.throwError("too many arguments" + n, Y.errors.UNEXPECTED_ARGUMENT, { count: r, expectedCount: e });
  }
  checkNew(r, e) {
    (r === Object || r == null) && this.throwError("missing new", Y.errors.MISSING_NEW, { name: e.name });
  }
  checkAbstract(r, e) {
    r === e ? this.throwError("cannot instantiate abstract class " + JSON.stringify(e.name) + " directly; use a sub-class", Y.errors.UNSUPPORTED_OPERATION, { name: r.name, operation: "new" }) : (r === Object || r == null) && this.throwError("missing new", Y.errors.MISSING_NEW, { name: e.name });
  }
  static globalLogger() {
    return ke || (ke = new Y(Fn)), ke;
  }
  static setCensorship(r, e) {
    if (!r && e && this.globalLogger().throwError("cannot permanently disable censorship", Y.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" }), fi) {
      if (!r)
        return;
      this.globalLogger().throwError("error censorship permanent", Y.errors.UNSUPPORTED_OPERATION, { operation: "setCensorship" });
    }
    ai = !!r, fi = !!e;
  }
  static setLogLevel(r) {
    const e = de[r.toLowerCase()];
    if (e == null) {
      Y.globalLogger().warn("invalid log level - " + r);
      return;
    }
    ui = e;
  }
  static from(r) {
    return new Y(r);
  }
}
Y.errors = Xt, Y.levels = Je;
const On = "bytes/5.7.0", br = new Y(On);
function Ti(t) {
  return !!t.toHexString;
}
function ce(t) {
  return t.slice || (t.slice = function() {
    const r = Array.prototype.slice.call(arguments);
    return ce(new Uint8Array(Array.prototype.slice.apply(t, r)));
  }), t;
}
function ci(t) {
  return typeof t == "number" && t == t && t % 1 === 0;
}
function ee(t) {
  if (t == null)
    return !1;
  if (t.constructor === Uint8Array)
    return !0;
  if (typeof t == "string" || !ci(t.length) || t.length < 0)
    return !1;
  for (let r = 0; r < t.length; r++) {
    const e = t[r];
    if (!ci(e) || e < 0 || e >= 256)
      return !1;
  }
  return !0;
}
function Fi(t, r) {
  if (r || (r = {}), typeof t == "number") {
    br.checkSafeUint53(t, "invalid arrayify value");
    const e = [];
    for (; t; )
      e.unshift(t & 255), t = parseInt(String(t / 256));
    return e.length === 0 && e.push(0), ce(new Uint8Array(e));
  }
  if (r.allowMissingPrefix && typeof t == "string" && t.substring(0, 2) !== "0x" && (t = "0x" + t), Ti(t) && (t = t.toHexString()), Qr(t)) {
    let e = t.substring(2);
    e.length % 2 && (r.hexPad === "left" ? e = "0" + e : r.hexPad === "right" ? e += "0" : br.throwArgumentError("hex data is odd-length", "value", t));
    const n = [];
    for (let f = 0; f < e.length; f += 2)
      n.push(parseInt(e.substring(f, f + 2), 16));
    return ce(new Uint8Array(n));
  }
  return ee(t) ? ce(new Uint8Array(t)) : br.throwArgumentError("invalid arrayify value", "value", t);
}
function Qr(t, r) {
  return !(typeof t != "string" || !t.match(/^0x[0-9A-Fa-f]*$/) || r);
}
const Oe = "0123456789abcdef";
function ki(t, r) {
  if (r || (r = {}), typeof t == "number") {
    br.checkSafeUint53(t, "invalid hexlify value");
    let e = "";
    for (; t; )
      e = Oe[t & 15] + e, t = Math.floor(t / 16);
    return e.length ? (e.length % 2 && (e = "0" + e), "0x" + e) : "0x00";
  }
  if (typeof t == "bigint")
    return t = t.toString(16), t.length % 2 ? "0x0" + t : "0x" + t;
  if (r.allowMissingPrefix && typeof t == "string" && t.substring(0, 2) !== "0x" && (t = "0x" + t), Ti(t))
    return t.toHexString();
  if (Qr(t))
    return t.length % 2 && (r.hexPad === "left" ? t = "0x0" + t.substring(2) : r.hexPad === "right" ? t += "0" : br.throwArgumentError("hex data is odd-length", "value", t)), t.toLowerCase();
  if (ee(t)) {
    let e = "0x";
    for (let n = 0; n < t.length; n++) {
      let f = t[n];
      e += Oe[(f & 240) >> 4] + Oe[f & 15];
    }
    return e;
  }
  return br.throwArgumentError("invalid hexlify value", "value", t);
}
function ge(t, r) {
  for (typeof t != "string" ? t = ki(t) : Qr(t) || br.throwArgumentError("invalid hex string", "value", t), t.length > 2 * r + 2 && br.throwArgumentError("value out of range", "value", arguments[1]); t.length < 2 * r + 2; )
    t = "0x0" + t.substring(2);
  return t;
}
var Oi = { exports: {} }, Un = {}, Dn = Object.freeze({ __proto__: null, default: Un }), zn = _n(Dn);
(function(t) {
  (function(r, e) {
    function n(i, h) {
      if (!i)
        throw new Error(h || "Assertion failed");
    }
    function f(i, h) {
      i.super_ = h;
      var u = function() {
      };
      u.prototype = h.prototype, i.prototype = new u(), i.prototype.constructor = i;
    }
    function s(i, h, u) {
      if (s.isBN(i))
        return i;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, i !== null && ((h === "le" || h === "be") && (u = h, h = 10), this._init(i || 0, h || 10, u || "be"));
    }
    typeof r == "object" ? r.exports = s : e.BN = s, s.BN = s, s.wordSize = 26;
    var d;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? d = window.Buffer : d = zn.Buffer;
    } catch {
    }
    s.isBN = function(i) {
      return i instanceof s ? !0 : i !== null && typeof i == "object" && i.constructor.wordSize === s.wordSize && Array.isArray(i.words);
    }, s.max = function(i, h) {
      return i.cmp(h) > 0 ? i : h;
    }, s.min = function(i, h) {
      return i.cmp(h) < 0 ? i : h;
    }, s.prototype._init = function(i, h, u) {
      if (typeof i == "number")
        return this._initNumber(i, h, u);
      if (typeof i == "object")
        return this._initArray(i, h, u);
      h === "hex" && (h = 16), n(h === (h | 0) && h >= 2 && h <= 36), i = i.toString().replace(/\s+/g, "");
      var c = 0;
      i[0] === "-" && (c++, this.negative = 1), c < i.length && (h === 16 ? this._parseHex(i, c, u) : (this._parseBase(i, h, c), u === "le" && this._initArray(this.toArray(), h, u)));
    }, s.prototype._initNumber = function(i, h, u) {
      i < 0 && (this.negative = 1, i = -i), i < 67108864 ? (this.words = [i & 67108863], this.length = 1) : i < 4503599627370496 ? (this.words = [i & 67108863, i / 67108864 & 67108863], this.length = 2) : (n(i < 9007199254740992), this.words = [i & 67108863, i / 67108864 & 67108863, 1], this.length = 3), u === "le" && this._initArray(this.toArray(), h, u);
    }, s.prototype._initArray = function(i, h, u) {
      if (n(typeof i.length == "number"), i.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(i.length / 3), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var m, A, b = 0;
      if (u === "be")
        for (c = i.length - 1, m = 0; c >= 0; c -= 3)
          A = i[c] | i[c - 1] << 8 | i[c - 2] << 16, this.words[m] |= A << b & 67108863, this.words[m + 1] = A >>> 26 - b & 67108863, b += 24, b >= 26 && (b -= 26, m++);
      else if (u === "le")
        for (c = 0, m = 0; c < i.length; c += 3)
          A = i[c] | i[c + 1] << 8 | i[c + 2] << 16, this.words[m] |= A << b & 67108863, this.words[m + 1] = A >>> 26 - b & 67108863, b += 24, b >= 26 && (b -= 26, m++);
      return this._strip();
    };
    function v(i, h) {
      var u = i.charCodeAt(h);
      if (u >= 48 && u <= 57)
        return u - 48;
      if (u >= 65 && u <= 70)
        return u - 55;
      if (u >= 97 && u <= 102)
        return u - 87;
      n(!1, "Invalid character in " + i);
    }
    function w(i, h, u) {
      var c = v(i, u);
      return u - 1 >= h && (c |= v(i, u - 1) << 4), c;
    }
    s.prototype._parseHex = function(i, h, u) {
      this.length = Math.ceil((i.length - h) / 6), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var m = 0, A = 0, b;
      if (u === "be")
        for (c = i.length - 1; c >= h; c -= 2)
          b = w(i, h, c) << m, this.words[A] |= b & 67108863, m >= 18 ? (m -= 18, A += 1, this.words[A] |= b >>> 26) : m += 8;
      else {
        var p = i.length - h;
        for (c = p % 2 === 0 ? h + 1 : h; c < i.length; c += 2)
          b = w(i, h, c) << m, this.words[A] |= b & 67108863, m >= 18 ? (m -= 18, A += 1, this.words[A] |= b >>> 26) : m += 8;
      }
      this._strip();
    };
    function g(i, h, u, c) {
      for (var m = 0, A = 0, b = Math.min(i.length, u), p = h; p < b; p++) {
        var o = i.charCodeAt(p) - 48;
        m *= c, o >= 49 ? A = o - 49 + 10 : o >= 17 ? A = o - 17 + 10 : A = o, n(o >= 0 && A < c, "Invalid character"), m += A;
      }
      return m;
    }
    s.prototype._parseBase = function(i, h, u) {
      this.words = [0], this.length = 1;
      for (var c = 0, m = 1; m <= 67108863; m *= h)
        c++;
      c--, m = m / h | 0;
      for (var A = i.length - u, b = A % c, p = Math.min(A, A - b) + u, o = 0, l = u; l < p; l += c)
        o = g(i, l, l + c, h), this.imuln(m), this.words[0] + o < 67108864 ? this.words[0] += o : this._iaddn(o);
      if (b !== 0) {
        var D = 1;
        for (o = g(i, l, i.length, h), l = 0; l < b; l++)
          D *= h;
        this.imuln(D), this.words[0] + o < 67108864 ? this.words[0] += o : this._iaddn(o);
      }
      this._strip();
    }, s.prototype.copy = function(i) {
      i.words = new Array(this.length);
      for (var h = 0; h < this.length; h++)
        i.words[h] = this.words[h];
      i.length = this.length, i.negative = this.negative, i.red = this.red;
    };
    function y(i, h) {
      i.words = h.words, i.length = h.length, i.negative = h.negative, i.red = h.red;
    }
    if (s.prototype._move = function(i) {
      y(i, this);
    }, s.prototype.clone = function() {
      var i = new s(null);
      return this.copy(i), i;
    }, s.prototype._expand = function(i) {
      for (; this.length < i; )
        this.words[this.length++] = 0;
      return this;
    }, s.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, s.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        s.prototype[Symbol.for("nodejs.util.inspect.custom")] = M;
      } catch {
        s.prototype.inspect = M;
      }
    else
      s.prototype.inspect = M;
    function M() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var B = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"], C = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], N = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
    s.prototype.toString = function(i, h) {
      i = i || 10, h = h | 0 || 1;
      var u;
      if (i === 16 || i === "hex") {
        u = "";
        for (var c = 0, m = 0, A = 0; A < this.length; A++) {
          var b = this.words[A], p = ((b << c | m) & 16777215).toString(16);
          m = b >>> 24 - c & 16777215, c += 2, c >= 26 && (c -= 26, A--), m !== 0 || A !== this.length - 1 ? u = B[6 - p.length] + p + u : u = p + u;
        }
        for (m !== 0 && (u = m.toString(16) + u); u.length % h !== 0; )
          u = "0" + u;
        return this.negative !== 0 && (u = "-" + u), u;
      }
      if (i === (i | 0) && i >= 2 && i <= 36) {
        var o = C[i], l = N[i];
        u = "";
        var D = this.clone();
        for (D.negative = 0; !D.isZero(); ) {
          var k = D.modrn(l).toString(i);
          D = D.idivn(l), D.isZero() ? u = k + u : u = B[o - k.length] + k + u;
        }
        for (this.isZero() && (u = "0" + u); u.length % h !== 0; )
          u = "0" + u;
        return this.negative !== 0 && (u = "-" + u), u;
      }
      n(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var i = this.words[0];
      return this.length === 2 ? i += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? i += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -i : i;
    }, s.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, d && (s.prototype.toBuffer = function(i, h) {
      return this.toArrayLike(d, i, h);
    }), s.prototype.toArray = function(i, h) {
      return this.toArrayLike(Array, i, h);
    };
    var O = function(i, h) {
      return i.allocUnsafe ? i.allocUnsafe(h) : new i(h);
    };
    s.prototype.toArrayLike = function(i, h, u) {
      this._strip();
      var c = this.byteLength(), m = u || Math.max(1, c);
      n(c <= m, "byte array longer than desired length"), n(m > 0, "Requested array length <= 0");
      var A = O(i, m), b = h === "le" ? "LE" : "BE";
      return this["_toArrayLike" + b](A, c), A;
    }, s.prototype._toArrayLikeLE = function(i, h) {
      for (var u = 0, c = 0, m = 0, A = 0; m < this.length; m++) {
        var b = this.words[m] << A | c;
        i[u++] = b & 255, u < i.length && (i[u++] = b >> 8 & 255), u < i.length && (i[u++] = b >> 16 & 255), A === 6 ? (u < i.length && (i[u++] = b >> 24 & 255), c = 0, A = 0) : (c = b >>> 24, A += 2);
      }
      if (u < i.length)
        for (i[u++] = c; u < i.length; )
          i[u++] = 0;
    }, s.prototype._toArrayLikeBE = function(i, h) {
      for (var u = i.length - 1, c = 0, m = 0, A = 0; m < this.length; m++) {
        var b = this.words[m] << A | c;
        i[u--] = b & 255, u >= 0 && (i[u--] = b >> 8 & 255), u >= 0 && (i[u--] = b >> 16 & 255), A === 6 ? (u >= 0 && (i[u--] = b >> 24 & 255), c = 0, A = 0) : (c = b >>> 24, A += 2);
      }
      if (u >= 0)
        for (i[u--] = c; u >= 0; )
          i[u--] = 0;
    }, Math.clz32 ? s.prototype._countBits = function(i) {
      return 32 - Math.clz32(i);
    } : s.prototype._countBits = function(i) {
      var h = i, u = 0;
      return h >= 4096 && (u += 13, h >>>= 13), h >= 64 && (u += 7, h >>>= 7), h >= 8 && (u += 4, h >>>= 4), h >= 2 && (u += 2, h >>>= 2), u + h;
    }, s.prototype._zeroBits = function(i) {
      if (i === 0)
        return 26;
      var h = i, u = 0;
      return h & 8191 || (u += 13, h >>>= 13), h & 127 || (u += 7, h >>>= 7), h & 15 || (u += 4, h >>>= 4), h & 3 || (u += 2, h >>>= 2), h & 1 || u++, u;
    }, s.prototype.bitLength = function() {
      var i = this.words[this.length - 1], h = this._countBits(i);
      return (this.length - 1) * 26 + h;
    };
    function x(i) {
      for (var h = new Array(i.bitLength()), u = 0; u < h.length; u++) {
        var c = u / 26 | 0, m = u % 26;
        h[u] = i.words[c] >>> m & 1;
      }
      return h;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var i = 0, h = 0; h < this.length; h++) {
        var u = this._zeroBits(this.words[h]);
        if (i += u, u !== 26)
          break;
      }
      return i;
    }, s.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, s.prototype.toTwos = function(i) {
      return this.negative !== 0 ? this.abs().inotn(i).iaddn(1) : this.clone();
    }, s.prototype.fromTwos = function(i) {
      return this.testn(i - 1) ? this.notn(i).iaddn(1).ineg() : this.clone();
    }, s.prototype.isNeg = function() {
      return this.negative !== 0;
    }, s.prototype.neg = function() {
      return this.clone().ineg();
    }, s.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, s.prototype.iuor = function(i) {
      for (; this.length < i.length; )
        this.words[this.length++] = 0;
      for (var h = 0; h < i.length; h++)
        this.words[h] = this.words[h] | i.words[h];
      return this._strip();
    }, s.prototype.ior = function(i) {
      return n((this.negative | i.negative) === 0), this.iuor(i);
    }, s.prototype.or = function(i) {
      return this.length > i.length ? this.clone().ior(i) : i.clone().ior(this);
    }, s.prototype.uor = function(i) {
      return this.length > i.length ? this.clone().iuor(i) : i.clone().iuor(this);
    }, s.prototype.iuand = function(i) {
      var h;
      this.length > i.length ? h = i : h = this;
      for (var u = 0; u < h.length; u++)
        this.words[u] = this.words[u] & i.words[u];
      return this.length = h.length, this._strip();
    }, s.prototype.iand = function(i) {
      return n((this.negative | i.negative) === 0), this.iuand(i);
    }, s.prototype.and = function(i) {
      return this.length > i.length ? this.clone().iand(i) : i.clone().iand(this);
    }, s.prototype.uand = function(i) {
      return this.length > i.length ? this.clone().iuand(i) : i.clone().iuand(this);
    }, s.prototype.iuxor = function(i) {
      var h, u;
      this.length > i.length ? (h = this, u = i) : (h = i, u = this);
      for (var c = 0; c < u.length; c++)
        this.words[c] = h.words[c] ^ u.words[c];
      if (this !== h)
        for (; c < h.length; c++)
          this.words[c] = h.words[c];
      return this.length = h.length, this._strip();
    }, s.prototype.ixor = function(i) {
      return n((this.negative | i.negative) === 0), this.iuxor(i);
    }, s.prototype.xor = function(i) {
      return this.length > i.length ? this.clone().ixor(i) : i.clone().ixor(this);
    }, s.prototype.uxor = function(i) {
      return this.length > i.length ? this.clone().iuxor(i) : i.clone().iuxor(this);
    }, s.prototype.inotn = function(i) {
      n(typeof i == "number" && i >= 0);
      var h = Math.ceil(i / 26) | 0, u = i % 26;
      this._expand(h), u > 0 && h--;
      for (var c = 0; c < h; c++)
        this.words[c] = ~this.words[c] & 67108863;
      return u > 0 && (this.words[c] = ~this.words[c] & 67108863 >> 26 - u), this._strip();
    }, s.prototype.notn = function(i) {
      return this.clone().inotn(i);
    }, s.prototype.setn = function(i, h) {
      n(typeof i == "number" && i >= 0);
      var u = i / 26 | 0, c = i % 26;
      return this._expand(u + 1), h ? this.words[u] = this.words[u] | 1 << c : this.words[u] = this.words[u] & ~(1 << c), this._strip();
    }, s.prototype.iadd = function(i) {
      var h;
      if (this.negative !== 0 && i.negative === 0)
        return this.negative = 0, h = this.isub(i), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && i.negative !== 0)
        return i.negative = 0, h = this.isub(i), i.negative = 1, h._normSign();
      var u, c;
      this.length > i.length ? (u = this, c = i) : (u = i, c = this);
      for (var m = 0, A = 0; A < c.length; A++)
        h = (u.words[A] | 0) + (c.words[A] | 0) + m, this.words[A] = h & 67108863, m = h >>> 26;
      for (; m !== 0 && A < u.length; A++)
        h = (u.words[A] | 0) + m, this.words[A] = h & 67108863, m = h >>> 26;
      if (this.length = u.length, m !== 0)
        this.words[this.length] = m, this.length++;
      else if (u !== this)
        for (; A < u.length; A++)
          this.words[A] = u.words[A];
      return this;
    }, s.prototype.add = function(i) {
      var h;
      return i.negative !== 0 && this.negative === 0 ? (i.negative = 0, h = this.sub(i), i.negative ^= 1, h) : i.negative === 0 && this.negative !== 0 ? (this.negative = 0, h = i.sub(this), this.negative = 1, h) : this.length > i.length ? this.clone().iadd(i) : i.clone().iadd(this);
    }, s.prototype.isub = function(i) {
      if (i.negative !== 0) {
        i.negative = 0;
        var h = this.iadd(i);
        return i.negative = 1, h._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(i), this.negative = 1, this._normSign();
      var u = this.cmp(i);
      if (u === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var c, m;
      u > 0 ? (c = this, m = i) : (c = i, m = this);
      for (var A = 0, b = 0; b < m.length; b++)
        h = (c.words[b] | 0) - (m.words[b] | 0) + A, A = h >> 26, this.words[b] = h & 67108863;
      for (; A !== 0 && b < c.length; b++)
        h = (c.words[b] | 0) + A, A = h >> 26, this.words[b] = h & 67108863;
      if (A === 0 && b < c.length && c !== this)
        for (; b < c.length; b++)
          this.words[b] = c.words[b];
      return this.length = Math.max(this.length, b), c !== this && (this.negative = 1), this._strip();
    }, s.prototype.sub = function(i) {
      return this.clone().isub(i);
    };
    function q(i, h, u) {
      u.negative = h.negative ^ i.negative;
      var c = i.length + h.length | 0;
      u.length = c, c = c - 1 | 0;
      var m = i.words[0] | 0, A = h.words[0] | 0, b = m * A, p = b & 67108863, o = b / 67108864 | 0;
      u.words[0] = p;
      for (var l = 1; l < c; l++) {
        for (var D = o >>> 26, k = o & 67108863, a = Math.min(l, h.length - 1), E = Math.max(0, l - i.length + 1); E <= a; E++) {
          var S = l - E | 0;
          m = i.words[S] | 0, A = h.words[E] | 0, b = m * A + k, D += b / 67108864 | 0, k = b & 67108863;
        }
        u.words[l] = k | 0, o = D | 0;
      }
      return o !== 0 ? u.words[l] = o | 0 : u.length--, u._strip();
    }
    var X = function(i, h, u) {
      var c = i.words, m = h.words, A = u.words, b = 0, p, o, l, D = c[0] | 0, k = D & 8191, a = D >>> 13, E = c[1] | 0, S = E & 8191, I = E >>> 13, F = c[2] | 0, R = F & 8191, _ = F >>> 13, U = c[3] | 0, P = U & 8191, T = U >>> 13, V = c[4] | 0, $ = V & 8191, tt = V >>> 13, yr = c[5] | 0, rt = yr & 8191, et = yr >>> 13, Mr = c[6] | 0, it = Mr & 8191, nt = Mr >>> 13, Sr = c[7] | 0, ot = Sr & 8191, st = Sr >>> 13, Er = c[8] | 0, ht = Er & 8191, ft = Er >>> 13, Br = c[9] | 0, at = Br & 8191, ut = Br >>> 13, Ir = m[0] | 0, lt = Ir & 8191, dt = Ir >>> 13, Cr = m[1] | 0, ct = Cr & 8191, pt = Cr >>> 13, Nr = m[2] | 0, mt = Nr & 8191, gt = Nr >>> 13, xr = m[3] | 0, At = xr & 8191, vt = xr >>> 13, Rr = m[4] | 0, wt = Rr & 8191, bt = Rr >>> 13, _r = m[5] | 0, yt = _r & 8191, Mt = _r >>> 13, Tr = m[6] | 0, St = Tr & 8191, Et = Tr >>> 13, Fr = m[7] | 0, Bt = Fr & 8191, It = Fr >>> 13, kr = m[8] | 0, Ct = kr & 8191, Nt = kr >>> 13, Or = m[9] | 0, xt = Or & 8191, Rt = Or >>> 13;
      u.negative = i.negative ^ h.negative, u.length = 19, p = Math.imul(k, lt), o = Math.imul(k, dt), o = o + Math.imul(a, lt) | 0, l = Math.imul(a, dt);
      var lr = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, p = Math.imul(S, lt), o = Math.imul(S, dt), o = o + Math.imul(I, lt) | 0, l = Math.imul(I, dt), p = p + Math.imul(k, ct) | 0, o = o + Math.imul(k, pt) | 0, o = o + Math.imul(a, ct) | 0, l = l + Math.imul(a, pt) | 0;
      var dr = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, p = Math.imul(R, lt), o = Math.imul(R, dt), o = o + Math.imul(_, lt) | 0, l = Math.imul(_, dt), p = p + Math.imul(S, ct) | 0, o = o + Math.imul(S, pt) | 0, o = o + Math.imul(I, ct) | 0, l = l + Math.imul(I, pt) | 0, p = p + Math.imul(k, mt) | 0, o = o + Math.imul(k, gt) | 0, o = o + Math.imul(a, mt) | 0, l = l + Math.imul(a, gt) | 0;
      var cr = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, p = Math.imul(P, lt), o = Math.imul(P, dt), o = o + Math.imul(T, lt) | 0, l = Math.imul(T, dt), p = p + Math.imul(R, ct) | 0, o = o + Math.imul(R, pt) | 0, o = o + Math.imul(_, ct) | 0, l = l + Math.imul(_, pt) | 0, p = p + Math.imul(S, mt) | 0, o = o + Math.imul(S, gt) | 0, o = o + Math.imul(I, mt) | 0, l = l + Math.imul(I, gt) | 0, p = p + Math.imul(k, At) | 0, o = o + Math.imul(k, vt) | 0, o = o + Math.imul(a, At) | 0, l = l + Math.imul(a, vt) | 0;
      var pr = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, p = Math.imul($, lt), o = Math.imul($, dt), o = o + Math.imul(tt, lt) | 0, l = Math.imul(tt, dt), p = p + Math.imul(P, ct) | 0, o = o + Math.imul(P, pt) | 0, o = o + Math.imul(T, ct) | 0, l = l + Math.imul(T, pt) | 0, p = p + Math.imul(R, mt) | 0, o = o + Math.imul(R, gt) | 0, o = o + Math.imul(_, mt) | 0, l = l + Math.imul(_, gt) | 0, p = p + Math.imul(S, At) | 0, o = o + Math.imul(S, vt) | 0, o = o + Math.imul(I, At) | 0, l = l + Math.imul(I, vt) | 0, p = p + Math.imul(k, wt) | 0, o = o + Math.imul(k, bt) | 0, o = o + Math.imul(a, wt) | 0, l = l + Math.imul(a, bt) | 0;
      var mr = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (mr >>> 26) | 0, mr &= 67108863, p = Math.imul(rt, lt), o = Math.imul(rt, dt), o = o + Math.imul(et, lt) | 0, l = Math.imul(et, dt), p = p + Math.imul($, ct) | 0, o = o + Math.imul($, pt) | 0, o = o + Math.imul(tt, ct) | 0, l = l + Math.imul(tt, pt) | 0, p = p + Math.imul(P, mt) | 0, o = o + Math.imul(P, gt) | 0, o = o + Math.imul(T, mt) | 0, l = l + Math.imul(T, gt) | 0, p = p + Math.imul(R, At) | 0, o = o + Math.imul(R, vt) | 0, o = o + Math.imul(_, At) | 0, l = l + Math.imul(_, vt) | 0, p = p + Math.imul(S, wt) | 0, o = o + Math.imul(S, bt) | 0, o = o + Math.imul(I, wt) | 0, l = l + Math.imul(I, bt) | 0, p = p + Math.imul(k, yt) | 0, o = o + Math.imul(k, Mt) | 0, o = o + Math.imul(a, yt) | 0, l = l + Math.imul(a, Mt) | 0;
      var gr = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (gr >>> 26) | 0, gr &= 67108863, p = Math.imul(it, lt), o = Math.imul(it, dt), o = o + Math.imul(nt, lt) | 0, l = Math.imul(nt, dt), p = p + Math.imul(rt, ct) | 0, o = o + Math.imul(rt, pt) | 0, o = o + Math.imul(et, ct) | 0, l = l + Math.imul(et, pt) | 0, p = p + Math.imul($, mt) | 0, o = o + Math.imul($, gt) | 0, o = o + Math.imul(tt, mt) | 0, l = l + Math.imul(tt, gt) | 0, p = p + Math.imul(P, At) | 0, o = o + Math.imul(P, vt) | 0, o = o + Math.imul(T, At) | 0, l = l + Math.imul(T, vt) | 0, p = p + Math.imul(R, wt) | 0, o = o + Math.imul(R, bt) | 0, o = o + Math.imul(_, wt) | 0, l = l + Math.imul(_, bt) | 0, p = p + Math.imul(S, yt) | 0, o = o + Math.imul(S, Mt) | 0, o = o + Math.imul(I, yt) | 0, l = l + Math.imul(I, Mt) | 0, p = p + Math.imul(k, St) | 0, o = o + Math.imul(k, Et) | 0, o = o + Math.imul(a, St) | 0, l = l + Math.imul(a, Et) | 0;
      var be = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, p = Math.imul(ot, lt), o = Math.imul(ot, dt), o = o + Math.imul(st, lt) | 0, l = Math.imul(st, dt), p = p + Math.imul(it, ct) | 0, o = o + Math.imul(it, pt) | 0, o = o + Math.imul(nt, ct) | 0, l = l + Math.imul(nt, pt) | 0, p = p + Math.imul(rt, mt) | 0, o = o + Math.imul(rt, gt) | 0, o = o + Math.imul(et, mt) | 0, l = l + Math.imul(et, gt) | 0, p = p + Math.imul($, At) | 0, o = o + Math.imul($, vt) | 0, o = o + Math.imul(tt, At) | 0, l = l + Math.imul(tt, vt) | 0, p = p + Math.imul(P, wt) | 0, o = o + Math.imul(P, bt) | 0, o = o + Math.imul(T, wt) | 0, l = l + Math.imul(T, bt) | 0, p = p + Math.imul(R, yt) | 0, o = o + Math.imul(R, Mt) | 0, o = o + Math.imul(_, yt) | 0, l = l + Math.imul(_, Mt) | 0, p = p + Math.imul(S, St) | 0, o = o + Math.imul(S, Et) | 0, o = o + Math.imul(I, St) | 0, l = l + Math.imul(I, Et) | 0, p = p + Math.imul(k, Bt) | 0, o = o + Math.imul(k, It) | 0, o = o + Math.imul(a, Bt) | 0, l = l + Math.imul(a, It) | 0;
      var ye = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, p = Math.imul(ht, lt), o = Math.imul(ht, dt), o = o + Math.imul(ft, lt) | 0, l = Math.imul(ft, dt), p = p + Math.imul(ot, ct) | 0, o = o + Math.imul(ot, pt) | 0, o = o + Math.imul(st, ct) | 0, l = l + Math.imul(st, pt) | 0, p = p + Math.imul(it, mt) | 0, o = o + Math.imul(it, gt) | 0, o = o + Math.imul(nt, mt) | 0, l = l + Math.imul(nt, gt) | 0, p = p + Math.imul(rt, At) | 0, o = o + Math.imul(rt, vt) | 0, o = o + Math.imul(et, At) | 0, l = l + Math.imul(et, vt) | 0, p = p + Math.imul($, wt) | 0, o = o + Math.imul($, bt) | 0, o = o + Math.imul(tt, wt) | 0, l = l + Math.imul(tt, bt) | 0, p = p + Math.imul(P, yt) | 0, o = o + Math.imul(P, Mt) | 0, o = o + Math.imul(T, yt) | 0, l = l + Math.imul(T, Mt) | 0, p = p + Math.imul(R, St) | 0, o = o + Math.imul(R, Et) | 0, o = o + Math.imul(_, St) | 0, l = l + Math.imul(_, Et) | 0, p = p + Math.imul(S, Bt) | 0, o = o + Math.imul(S, It) | 0, o = o + Math.imul(I, Bt) | 0, l = l + Math.imul(I, It) | 0, p = p + Math.imul(k, Ct) | 0, o = o + Math.imul(k, Nt) | 0, o = o + Math.imul(a, Ct) | 0, l = l + Math.imul(a, Nt) | 0;
      var Me = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, p = Math.imul(at, lt), o = Math.imul(at, dt), o = o + Math.imul(ut, lt) | 0, l = Math.imul(ut, dt), p = p + Math.imul(ht, ct) | 0, o = o + Math.imul(ht, pt) | 0, o = o + Math.imul(ft, ct) | 0, l = l + Math.imul(ft, pt) | 0, p = p + Math.imul(ot, mt) | 0, o = o + Math.imul(ot, gt) | 0, o = o + Math.imul(st, mt) | 0, l = l + Math.imul(st, gt) | 0, p = p + Math.imul(it, At) | 0, o = o + Math.imul(it, vt) | 0, o = o + Math.imul(nt, At) | 0, l = l + Math.imul(nt, vt) | 0, p = p + Math.imul(rt, wt) | 0, o = o + Math.imul(rt, bt) | 0, o = o + Math.imul(et, wt) | 0, l = l + Math.imul(et, bt) | 0, p = p + Math.imul($, yt) | 0, o = o + Math.imul($, Mt) | 0, o = o + Math.imul(tt, yt) | 0, l = l + Math.imul(tt, Mt) | 0, p = p + Math.imul(P, St) | 0, o = o + Math.imul(P, Et) | 0, o = o + Math.imul(T, St) | 0, l = l + Math.imul(T, Et) | 0, p = p + Math.imul(R, Bt) | 0, o = o + Math.imul(R, It) | 0, o = o + Math.imul(_, Bt) | 0, l = l + Math.imul(_, It) | 0, p = p + Math.imul(S, Ct) | 0, o = o + Math.imul(S, Nt) | 0, o = o + Math.imul(I, Ct) | 0, l = l + Math.imul(I, Nt) | 0, p = p + Math.imul(k, xt) | 0, o = o + Math.imul(k, Rt) | 0, o = o + Math.imul(a, xt) | 0, l = l + Math.imul(a, Rt) | 0;
      var Se = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, p = Math.imul(at, ct), o = Math.imul(at, pt), o = o + Math.imul(ut, ct) | 0, l = Math.imul(ut, pt), p = p + Math.imul(ht, mt) | 0, o = o + Math.imul(ht, gt) | 0, o = o + Math.imul(ft, mt) | 0, l = l + Math.imul(ft, gt) | 0, p = p + Math.imul(ot, At) | 0, o = o + Math.imul(ot, vt) | 0, o = o + Math.imul(st, At) | 0, l = l + Math.imul(st, vt) | 0, p = p + Math.imul(it, wt) | 0, o = o + Math.imul(it, bt) | 0, o = o + Math.imul(nt, wt) | 0, l = l + Math.imul(nt, bt) | 0, p = p + Math.imul(rt, yt) | 0, o = o + Math.imul(rt, Mt) | 0, o = o + Math.imul(et, yt) | 0, l = l + Math.imul(et, Mt) | 0, p = p + Math.imul($, St) | 0, o = o + Math.imul($, Et) | 0, o = o + Math.imul(tt, St) | 0, l = l + Math.imul(tt, Et) | 0, p = p + Math.imul(P, Bt) | 0, o = o + Math.imul(P, It) | 0, o = o + Math.imul(T, Bt) | 0, l = l + Math.imul(T, It) | 0, p = p + Math.imul(R, Ct) | 0, o = o + Math.imul(R, Nt) | 0, o = o + Math.imul(_, Ct) | 0, l = l + Math.imul(_, Nt) | 0, p = p + Math.imul(S, xt) | 0, o = o + Math.imul(S, Rt) | 0, o = o + Math.imul(I, xt) | 0, l = l + Math.imul(I, Rt) | 0;
      var Ee = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, p = Math.imul(at, mt), o = Math.imul(at, gt), o = o + Math.imul(ut, mt) | 0, l = Math.imul(ut, gt), p = p + Math.imul(ht, At) | 0, o = o + Math.imul(ht, vt) | 0, o = o + Math.imul(ft, At) | 0, l = l + Math.imul(ft, vt) | 0, p = p + Math.imul(ot, wt) | 0, o = o + Math.imul(ot, bt) | 0, o = o + Math.imul(st, wt) | 0, l = l + Math.imul(st, bt) | 0, p = p + Math.imul(it, yt) | 0, o = o + Math.imul(it, Mt) | 0, o = o + Math.imul(nt, yt) | 0, l = l + Math.imul(nt, Mt) | 0, p = p + Math.imul(rt, St) | 0, o = o + Math.imul(rt, Et) | 0, o = o + Math.imul(et, St) | 0, l = l + Math.imul(et, Et) | 0, p = p + Math.imul($, Bt) | 0, o = o + Math.imul($, It) | 0, o = o + Math.imul(tt, Bt) | 0, l = l + Math.imul(tt, It) | 0, p = p + Math.imul(P, Ct) | 0, o = o + Math.imul(P, Nt) | 0, o = o + Math.imul(T, Ct) | 0, l = l + Math.imul(T, Nt) | 0, p = p + Math.imul(R, xt) | 0, o = o + Math.imul(R, Rt) | 0, o = o + Math.imul(_, xt) | 0, l = l + Math.imul(_, Rt) | 0;
      var Be = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, p = Math.imul(at, At), o = Math.imul(at, vt), o = o + Math.imul(ut, At) | 0, l = Math.imul(ut, vt), p = p + Math.imul(ht, wt) | 0, o = o + Math.imul(ht, bt) | 0, o = o + Math.imul(ft, wt) | 0, l = l + Math.imul(ft, bt) | 0, p = p + Math.imul(ot, yt) | 0, o = o + Math.imul(ot, Mt) | 0, o = o + Math.imul(st, yt) | 0, l = l + Math.imul(st, Mt) | 0, p = p + Math.imul(it, St) | 0, o = o + Math.imul(it, Et) | 0, o = o + Math.imul(nt, St) | 0, l = l + Math.imul(nt, Et) | 0, p = p + Math.imul(rt, Bt) | 0, o = o + Math.imul(rt, It) | 0, o = o + Math.imul(et, Bt) | 0, l = l + Math.imul(et, It) | 0, p = p + Math.imul($, Ct) | 0, o = o + Math.imul($, Nt) | 0, o = o + Math.imul(tt, Ct) | 0, l = l + Math.imul(tt, Nt) | 0, p = p + Math.imul(P, xt) | 0, o = o + Math.imul(P, Rt) | 0, o = o + Math.imul(T, xt) | 0, l = l + Math.imul(T, Rt) | 0;
      var Ie = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, p = Math.imul(at, wt), o = Math.imul(at, bt), o = o + Math.imul(ut, wt) | 0, l = Math.imul(ut, bt), p = p + Math.imul(ht, yt) | 0, o = o + Math.imul(ht, Mt) | 0, o = o + Math.imul(ft, yt) | 0, l = l + Math.imul(ft, Mt) | 0, p = p + Math.imul(ot, St) | 0, o = o + Math.imul(ot, Et) | 0, o = o + Math.imul(st, St) | 0, l = l + Math.imul(st, Et) | 0, p = p + Math.imul(it, Bt) | 0, o = o + Math.imul(it, It) | 0, o = o + Math.imul(nt, Bt) | 0, l = l + Math.imul(nt, It) | 0, p = p + Math.imul(rt, Ct) | 0, o = o + Math.imul(rt, Nt) | 0, o = o + Math.imul(et, Ct) | 0, l = l + Math.imul(et, Nt) | 0, p = p + Math.imul($, xt) | 0, o = o + Math.imul($, Rt) | 0, o = o + Math.imul(tt, xt) | 0, l = l + Math.imul(tt, Rt) | 0;
      var Ce = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Ce >>> 26) | 0, Ce &= 67108863, p = Math.imul(at, yt), o = Math.imul(at, Mt), o = o + Math.imul(ut, yt) | 0, l = Math.imul(ut, Mt), p = p + Math.imul(ht, St) | 0, o = o + Math.imul(ht, Et) | 0, o = o + Math.imul(ft, St) | 0, l = l + Math.imul(ft, Et) | 0, p = p + Math.imul(ot, Bt) | 0, o = o + Math.imul(ot, It) | 0, o = o + Math.imul(st, Bt) | 0, l = l + Math.imul(st, It) | 0, p = p + Math.imul(it, Ct) | 0, o = o + Math.imul(it, Nt) | 0, o = o + Math.imul(nt, Ct) | 0, l = l + Math.imul(nt, Nt) | 0, p = p + Math.imul(rt, xt) | 0, o = o + Math.imul(rt, Rt) | 0, o = o + Math.imul(et, xt) | 0, l = l + Math.imul(et, Rt) | 0;
      var Ne = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, p = Math.imul(at, St), o = Math.imul(at, Et), o = o + Math.imul(ut, St) | 0, l = Math.imul(ut, Et), p = p + Math.imul(ht, Bt) | 0, o = o + Math.imul(ht, It) | 0, o = o + Math.imul(ft, Bt) | 0, l = l + Math.imul(ft, It) | 0, p = p + Math.imul(ot, Ct) | 0, o = o + Math.imul(ot, Nt) | 0, o = o + Math.imul(st, Ct) | 0, l = l + Math.imul(st, Nt) | 0, p = p + Math.imul(it, xt) | 0, o = o + Math.imul(it, Rt) | 0, o = o + Math.imul(nt, xt) | 0, l = l + Math.imul(nt, Rt) | 0;
      var xe = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (xe >>> 26) | 0, xe &= 67108863, p = Math.imul(at, Bt), o = Math.imul(at, It), o = o + Math.imul(ut, Bt) | 0, l = Math.imul(ut, It), p = p + Math.imul(ht, Ct) | 0, o = o + Math.imul(ht, Nt) | 0, o = o + Math.imul(ft, Ct) | 0, l = l + Math.imul(ft, Nt) | 0, p = p + Math.imul(ot, xt) | 0, o = o + Math.imul(ot, Rt) | 0, o = o + Math.imul(st, xt) | 0, l = l + Math.imul(st, Rt) | 0;
      var Re = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (Re >>> 26) | 0, Re &= 67108863, p = Math.imul(at, Ct), o = Math.imul(at, Nt), o = o + Math.imul(ut, Ct) | 0, l = Math.imul(ut, Nt), p = p + Math.imul(ht, xt) | 0, o = o + Math.imul(ht, Rt) | 0, o = o + Math.imul(ft, xt) | 0, l = l + Math.imul(ft, Rt) | 0;
      var _e = (b + p | 0) + ((o & 8191) << 13) | 0;
      b = (l + (o >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, p = Math.imul(at, xt), o = Math.imul(at, Rt), o = o + Math.imul(ut, xt) | 0, l = Math.imul(ut, Rt);
      var Te = (b + p | 0) + ((o & 8191) << 13) | 0;
      return b = (l + (o >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, A[0] = lr, A[1] = dr, A[2] = cr, A[3] = pr, A[4] = mr, A[5] = gr, A[6] = be, A[7] = ye, A[8] = Me, A[9] = Se, A[10] = Ee, A[11] = Be, A[12] = Ie, A[13] = Ce, A[14] = Ne, A[15] = xe, A[16] = Re, A[17] = _e, A[18] = Te, b !== 0 && (A[19] = b, u.length++), u;
    };
    Math.imul || (X = q);
    function _t(i, h, u) {
      u.negative = h.negative ^ i.negative, u.length = i.length + h.length;
      for (var c = 0, m = 0, A = 0; A < u.length - 1; A++) {
        var b = m;
        m = 0;
        for (var p = c & 67108863, o = Math.min(A, h.length - 1), l = Math.max(0, A - i.length + 1); l <= o; l++) {
          var D = A - l, k = i.words[D] | 0, a = h.words[l] | 0, E = k * a, S = E & 67108863;
          b = b + (E / 67108864 | 0) | 0, S = S + p | 0, p = S & 67108863, b = b + (S >>> 26) | 0, m += b >>> 26, b &= 67108863;
        }
        u.words[A] = p, c = b, b = m;
      }
      return c !== 0 ? u.words[A] = c : u.length--, u._strip();
    }
    function J(i, h, u) {
      return _t(i, h, u);
    }
    s.prototype.mulTo = function(i, h) {
      var u, c = this.length + i.length;
      return this.length === 10 && i.length === 10 ? u = X(this, i, h) : c < 63 ? u = q(this, i, h) : c < 1024 ? u = _t(this, i, h) : u = J(this, i, h), u;
    }, s.prototype.mul = function(i) {
      var h = new s(null);
      return h.words = new Array(this.length + i.length), this.mulTo(i, h);
    }, s.prototype.mulf = function(i) {
      var h = new s(null);
      return h.words = new Array(this.length + i.length), J(this, i, h);
    }, s.prototype.imul = function(i) {
      return this.clone().mulTo(i, this);
    }, s.prototype.imuln = function(i) {
      var h = i < 0;
      h && (i = -i), n(typeof i == "number"), n(i < 67108864);
      for (var u = 0, c = 0; c < this.length; c++) {
        var m = (this.words[c] | 0) * i, A = (m & 67108863) + (u & 67108863);
        u >>= 26, u += m / 67108864 | 0, u += A >>> 26, this.words[c] = A & 67108863;
      }
      return u !== 0 && (this.words[c] = u, this.length++), h ? this.ineg() : this;
    }, s.prototype.muln = function(i) {
      return this.clone().imuln(i);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(i) {
      var h = x(i);
      if (h.length === 0)
        return new s(1);
      for (var u = this, c = 0; c < h.length && h[c] === 0; c++, u = u.sqr())
        ;
      if (++c < h.length)
        for (var m = u.sqr(); c < h.length; c++, m = m.sqr())
          h[c] !== 0 && (u = u.mul(m));
      return u;
    }, s.prototype.iushln = function(i) {
      n(typeof i == "number" && i >= 0);
      var h = i % 26, u = (i - h) / 26, c = 67108863 >>> 26 - h << 26 - h, m;
      if (h !== 0) {
        var A = 0;
        for (m = 0; m < this.length; m++) {
          var b = this.words[m] & c, p = (this.words[m] | 0) - b << h;
          this.words[m] = p | A, A = b >>> 26 - h;
        }
        A && (this.words[m] = A, this.length++);
      }
      if (u !== 0) {
        for (m = this.length - 1; m >= 0; m--)
          this.words[m + u] = this.words[m];
        for (m = 0; m < u; m++)
          this.words[m] = 0;
        this.length += u;
      }
      return this._strip();
    }, s.prototype.ishln = function(i) {
      return n(this.negative === 0), this.iushln(i);
    }, s.prototype.iushrn = function(i, h, u) {
      n(typeof i == "number" && i >= 0);
      var c;
      h ? c = (h - h % 26) / 26 : c = 0;
      var m = i % 26, A = Math.min((i - m) / 26, this.length), b = 67108863 ^ 67108863 >>> m << m, p = u;
      if (c -= A, c = Math.max(0, c), p) {
        for (var o = 0; o < A; o++)
          p.words[o] = this.words[o];
        p.length = A;
      }
      if (A !== 0)
        if (this.length > A)
          for (this.length -= A, o = 0; o < this.length; o++)
            this.words[o] = this.words[o + A];
        else
          this.words[0] = 0, this.length = 1;
      var l = 0;
      for (o = this.length - 1; o >= 0 && (l !== 0 || o >= c); o--) {
        var D = this.words[o] | 0;
        this.words[o] = l << 26 - m | D >>> m, l = D & b;
      }
      return p && l !== 0 && (p.words[p.length++] = l), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, s.prototype.ishrn = function(i, h, u) {
      return n(this.negative === 0), this.iushrn(i, h, u);
    }, s.prototype.shln = function(i) {
      return this.clone().ishln(i);
    }, s.prototype.ushln = function(i) {
      return this.clone().iushln(i);
    }, s.prototype.shrn = function(i) {
      return this.clone().ishrn(i);
    }, s.prototype.ushrn = function(i) {
      return this.clone().iushrn(i);
    }, s.prototype.testn = function(i) {
      n(typeof i == "number" && i >= 0);
      var h = i % 26, u = (i - h) / 26, c = 1 << h;
      if (this.length <= u)
        return !1;
      var m = this.words[u];
      return !!(m & c);
    }, s.prototype.imaskn = function(i) {
      n(typeof i == "number" && i >= 0);
      var h = i % 26, u = (i - h) / 26;
      if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= u)
        return this;
      if (h !== 0 && u++, this.length = Math.min(u, this.length), h !== 0) {
        var c = 67108863 ^ 67108863 >>> h << h;
        this.words[this.length - 1] &= c;
      }
      return this._strip();
    }, s.prototype.maskn = function(i) {
      return this.clone().imaskn(i);
    }, s.prototype.iaddn = function(i) {
      return n(typeof i == "number"), n(i < 67108864), i < 0 ? this.isubn(-i) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= i ? (this.words[0] = i - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(i), this.negative = 1, this) : this._iaddn(i);
    }, s.prototype._iaddn = function(i) {
      this.words[0] += i;
      for (var h = 0; h < this.length && this.words[h] >= 67108864; h++)
        this.words[h] -= 67108864, h === this.length - 1 ? this.words[h + 1] = 1 : this.words[h + 1]++;
      return this.length = Math.max(this.length, h + 1), this;
    }, s.prototype.isubn = function(i) {
      if (n(typeof i == "number"), n(i < 67108864), i < 0)
        return this.iaddn(-i);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(i), this.negative = 1, this;
      if (this.words[0] -= i, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var h = 0; h < this.length && this.words[h] < 0; h++)
          this.words[h] += 67108864, this.words[h + 1] -= 1;
      return this._strip();
    }, s.prototype.addn = function(i) {
      return this.clone().iaddn(i);
    }, s.prototype.subn = function(i) {
      return this.clone().isubn(i);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(i, h, u) {
      var c = i.length + u, m;
      this._expand(c);
      var A, b = 0;
      for (m = 0; m < i.length; m++) {
        A = (this.words[m + u] | 0) + b;
        var p = (i.words[m] | 0) * h;
        A -= p & 67108863, b = (A >> 26) - (p / 67108864 | 0), this.words[m + u] = A & 67108863;
      }
      for (; m < this.length - u; m++)
        A = (this.words[m + u] | 0) + b, b = A >> 26, this.words[m + u] = A & 67108863;
      if (b === 0)
        return this._strip();
      for (n(b === -1), b = 0, m = 0; m < this.length; m++)
        A = -(this.words[m] | 0) + b, b = A >> 26, this.words[m] = A & 67108863;
      return this.negative = 1, this._strip();
    }, s.prototype._wordDiv = function(i, h) {
      var u = this.length - i.length, c = this.clone(), m = i, A = m.words[m.length - 1] | 0, b = this._countBits(A);
      u = 26 - b, u !== 0 && (m = m.ushln(u), c.iushln(u), A = m.words[m.length - 1] | 0);
      var p = c.length - m.length, o;
      if (h !== "mod") {
        o = new s(null), o.length = p + 1, o.words = new Array(o.length);
        for (var l = 0; l < o.length; l++)
          o.words[l] = 0;
      }
      var D = c.clone()._ishlnsubmul(m, 1, p);
      D.negative === 0 && (c = D, o && (o.words[p] = 1));
      for (var k = p - 1; k >= 0; k--) {
        var a = (c.words[m.length + k] | 0) * 67108864 + (c.words[m.length + k - 1] | 0);
        for (a = Math.min(a / A | 0, 67108863), c._ishlnsubmul(m, a, k); c.negative !== 0; )
          a--, c.negative = 0, c._ishlnsubmul(m, 1, k), c.isZero() || (c.negative ^= 1);
        o && (o.words[k] = a);
      }
      return o && o._strip(), c._strip(), h !== "div" && u !== 0 && c.iushrn(u), { div: o || null, mod: c };
    }, s.prototype.divmod = function(i, h, u) {
      if (n(!i.isZero()), this.isZero())
        return { div: new s(0), mod: new s(0) };
      var c, m, A;
      return this.negative !== 0 && i.negative === 0 ? (A = this.neg().divmod(i, h), h !== "mod" && (c = A.div.neg()), h !== "div" && (m = A.mod.neg(), u && m.negative !== 0 && m.iadd(i)), { div: c, mod: m }) : this.negative === 0 && i.negative !== 0 ? (A = this.divmod(i.neg(), h), h !== "mod" && (c = A.div.neg()), { div: c, mod: A.mod }) : this.negative & i.negative ? (A = this.neg().divmod(i.neg(), h), h !== "div" && (m = A.mod.neg(), u && m.negative !== 0 && m.isub(i)), { div: A.div, mod: m }) : i.length > this.length || this.cmp(i) < 0 ? { div: new s(0), mod: this } : i.length === 1 ? h === "div" ? { div: this.divn(i.words[0]), mod: null } : h === "mod" ? { div: null, mod: new s(this.modrn(i.words[0])) } : { div: this.divn(i.words[0]), mod: new s(this.modrn(i.words[0])) } : this._wordDiv(i, h);
    }, s.prototype.div = function(i) {
      return this.divmod(i, "div", !1).div;
    }, s.prototype.mod = function(i) {
      return this.divmod(i, "mod", !1).mod;
    }, s.prototype.umod = function(i) {
      return this.divmod(i, "mod", !0).mod;
    }, s.prototype.divRound = function(i) {
      var h = this.divmod(i);
      if (h.mod.isZero())
        return h.div;
      var u = h.div.negative !== 0 ? h.mod.isub(i) : h.mod, c = i.ushrn(1), m = i.andln(1), A = u.cmp(c);
      return A < 0 || m === 1 && A === 0 ? h.div : h.div.negative !== 0 ? h.div.isubn(1) : h.div.iaddn(1);
    }, s.prototype.modrn = function(i) {
      var h = i < 0;
      h && (i = -i), n(i <= 67108863);
      for (var u = (1 << 26) % i, c = 0, m = this.length - 1; m >= 0; m--)
        c = (u * c + (this.words[m] | 0)) % i;
      return h ? -c : c;
    }, s.prototype.modn = function(i) {
      return this.modrn(i);
    }, s.prototype.idivn = function(i) {
      var h = i < 0;
      h && (i = -i), n(i <= 67108863);
      for (var u = 0, c = this.length - 1; c >= 0; c--) {
        var m = (this.words[c] | 0) + u * 67108864;
        this.words[c] = m / i | 0, u = m % i;
      }
      return this._strip(), h ? this.ineg() : this;
    }, s.prototype.divn = function(i) {
      return this.clone().idivn(i);
    }, s.prototype.egcd = function(i) {
      n(i.negative === 0), n(!i.isZero());
      var h = this, u = i.clone();
      h.negative !== 0 ? h = h.umod(i) : h = h.clone();
      for (var c = new s(1), m = new s(0), A = new s(0), b = new s(1), p = 0; h.isEven() && u.isEven(); )
        h.iushrn(1), u.iushrn(1), ++p;
      for (var o = u.clone(), l = h.clone(); !h.isZero(); ) {
        for (var D = 0, k = 1; !(h.words[0] & k) && D < 26; ++D, k <<= 1)
          ;
        if (D > 0)
          for (h.iushrn(D); D-- > 0; )
            (c.isOdd() || m.isOdd()) && (c.iadd(o), m.isub(l)), c.iushrn(1), m.iushrn(1);
        for (var a = 0, E = 1; !(u.words[0] & E) && a < 26; ++a, E <<= 1)
          ;
        if (a > 0)
          for (u.iushrn(a); a-- > 0; )
            (A.isOdd() || b.isOdd()) && (A.iadd(o), b.isub(l)), A.iushrn(1), b.iushrn(1);
        h.cmp(u) >= 0 ? (h.isub(u), c.isub(A), m.isub(b)) : (u.isub(h), A.isub(c), b.isub(m));
      }
      return { a: A, b, gcd: u.iushln(p) };
    }, s.prototype._invmp = function(i) {
      n(i.negative === 0), n(!i.isZero());
      var h = this, u = i.clone();
      h.negative !== 0 ? h = h.umod(i) : h = h.clone();
      for (var c = new s(1), m = new s(0), A = u.clone(); h.cmpn(1) > 0 && u.cmpn(1) > 0; ) {
        for (var b = 0, p = 1; !(h.words[0] & p) && b < 26; ++b, p <<= 1)
          ;
        if (b > 0)
          for (h.iushrn(b); b-- > 0; )
            c.isOdd() && c.iadd(A), c.iushrn(1);
        for (var o = 0, l = 1; !(u.words[0] & l) && o < 26; ++o, l <<= 1)
          ;
        if (o > 0)
          for (u.iushrn(o); o-- > 0; )
            m.isOdd() && m.iadd(A), m.iushrn(1);
        h.cmp(u) >= 0 ? (h.isub(u), c.isub(m)) : (u.isub(h), m.isub(c));
      }
      var D;
      return h.cmpn(1) === 0 ? D = c : D = m, D.cmpn(0) < 0 && D.iadd(i), D;
    }, s.prototype.gcd = function(i) {
      if (this.isZero())
        return i.abs();
      if (i.isZero())
        return this.abs();
      var h = this.clone(), u = i.clone();
      h.negative = 0, u.negative = 0;
      for (var c = 0; h.isEven() && u.isEven(); c++)
        h.iushrn(1), u.iushrn(1);
      do {
        for (; h.isEven(); )
          h.iushrn(1);
        for (; u.isEven(); )
          u.iushrn(1);
        var m = h.cmp(u);
        if (m < 0) {
          var A = h;
          h = u, u = A;
        } else if (m === 0 || u.cmpn(1) === 0)
          break;
        h.isub(u);
      } while (!0);
      return u.iushln(c);
    }, s.prototype.invm = function(i) {
      return this.egcd(i).a.umod(i);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(i) {
      return this.words[0] & i;
    }, s.prototype.bincn = function(i) {
      n(typeof i == "number");
      var h = i % 26, u = (i - h) / 26, c = 1 << h;
      if (this.length <= u)
        return this._expand(u + 1), this.words[u] |= c, this;
      for (var m = c, A = u; m !== 0 && A < this.length; A++) {
        var b = this.words[A] | 0;
        b += m, m = b >>> 26, b &= 67108863, this.words[A] = b;
      }
      return m !== 0 && (this.words[A] = m, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(i) {
      var h = i < 0;
      if (this.negative !== 0 && !h)
        return -1;
      if (this.negative === 0 && h)
        return 1;
      this._strip();
      var u;
      if (this.length > 1)
        u = 1;
      else {
        h && (i = -i), n(i <= 67108863, "Number is too big");
        var c = this.words[0] | 0;
        u = c === i ? 0 : c < i ? -1 : 1;
      }
      return this.negative !== 0 ? -u | 0 : u;
    }, s.prototype.cmp = function(i) {
      if (this.negative !== 0 && i.negative === 0)
        return -1;
      if (this.negative === 0 && i.negative !== 0)
        return 1;
      var h = this.ucmp(i);
      return this.negative !== 0 ? -h | 0 : h;
    }, s.prototype.ucmp = function(i) {
      if (this.length > i.length)
        return 1;
      if (this.length < i.length)
        return -1;
      for (var h = 0, u = this.length - 1; u >= 0; u--) {
        var c = this.words[u] | 0, m = i.words[u] | 0;
        if (c !== m) {
          c < m ? h = -1 : c > m && (h = 1);
          break;
        }
      }
      return h;
    }, s.prototype.gtn = function(i) {
      return this.cmpn(i) === 1;
    }, s.prototype.gt = function(i) {
      return this.cmp(i) === 1;
    }, s.prototype.gten = function(i) {
      return this.cmpn(i) >= 0;
    }, s.prototype.gte = function(i) {
      return this.cmp(i) >= 0;
    }, s.prototype.ltn = function(i) {
      return this.cmpn(i) === -1;
    }, s.prototype.lt = function(i) {
      return this.cmp(i) === -1;
    }, s.prototype.lten = function(i) {
      return this.cmpn(i) <= 0;
    }, s.prototype.lte = function(i) {
      return this.cmp(i) <= 0;
    }, s.prototype.eqn = function(i) {
      return this.cmpn(i) === 0;
    }, s.prototype.eq = function(i) {
      return this.cmp(i) === 0;
    }, s.red = function(i) {
      return new G(i);
    }, s.prototype.toRed = function(i) {
      return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), i.convertTo(this)._forceRed(i);
    }, s.prototype.fromRed = function() {
      return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(i) {
      return this.red = i, this;
    }, s.prototype.forceRed = function(i) {
      return n(!this.red, "Already a number in reduction context"), this._forceRed(i);
    }, s.prototype.redAdd = function(i) {
      return n(this.red, "redAdd works only with red numbers"), this.red.add(this, i);
    }, s.prototype.redIAdd = function(i) {
      return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, i);
    }, s.prototype.redSub = function(i) {
      return n(this.red, "redSub works only with red numbers"), this.red.sub(this, i);
    }, s.prototype.redISub = function(i) {
      return n(this.red, "redISub works only with red numbers"), this.red.isub(this, i);
    }, s.prototype.redShl = function(i) {
      return n(this.red, "redShl works only with red numbers"), this.red.shl(this, i);
    }, s.prototype.redMul = function(i) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, i), this.red.mul(this, i);
    }, s.prototype.redIMul = function(i) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, i), this.red.imul(this, i);
    }, s.prototype.redSqr = function() {
      return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(i) {
      return n(this.red && !i.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, i);
    };
    var K = { k256: null, p224: null, p192: null, p25519: null };
    function H(i, h) {
      this.name = i, this.p = new s(h, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    H.prototype._tmp = function() {
      var i = new s(null);
      return i.words = new Array(Math.ceil(this.n / 13)), i;
    }, H.prototype.ireduce = function(i) {
      var h = i, u;
      do
        this.split(h, this.tmp), h = this.imulK(h), h = h.iadd(this.tmp), u = h.bitLength();
      while (u > this.n);
      var c = u < this.n ? -1 : h.ucmp(this.p);
      return c === 0 ? (h.words[0] = 0, h.length = 1) : c > 0 ? h.isub(this.p) : h.strip !== void 0 ? h.strip() : h._strip(), h;
    }, H.prototype.split = function(i, h) {
      i.iushrn(this.n, 0, h);
    }, H.prototype.imulK = function(i) {
      return i.imul(this.k);
    };
    function Tt() {
      H.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
    }
    f(Tt, H), Tt.prototype.split = function(i, h) {
      for (var u = 4194303, c = Math.min(i.length, 9), m = 0; m < c; m++)
        h.words[m] = i.words[m];
      if (h.length = c, i.length <= 9) {
        i.words[0] = 0, i.length = 1;
        return;
      }
      var A = i.words[9];
      for (h.words[h.length++] = A & u, m = 10; m < i.length; m++) {
        var b = i.words[m] | 0;
        i.words[m - 10] = (b & u) << 4 | A >>> 22, A = b;
      }
      A >>>= 22, i.words[m - 10] = A, A === 0 && i.length > 10 ? i.length -= 10 : i.length -= 9;
    }, Tt.prototype.imulK = function(i) {
      i.words[i.length] = 0, i.words[i.length + 1] = 0, i.length += 2;
      for (var h = 0, u = 0; u < i.length; u++) {
        var c = i.words[u] | 0;
        h += c * 977, i.words[u] = h & 67108863, h = c * 64 + (h / 67108864 | 0);
      }
      return i.words[i.length - 1] === 0 && (i.length--, i.words[i.length - 1] === 0 && i.length--), i;
    };
    function Z() {
      H.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
    }
    f(Z, H);
    function Ut() {
      H.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
    }
    f(Ut, H);
    function Ht() {
      H.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
    }
    f(Ht, H), Ht.prototype.imulK = function(i) {
      for (var h = 0, u = 0; u < i.length; u++) {
        var c = (i.words[u] | 0) * 19 + h, m = c & 67108863;
        c >>>= 26, i.words[u] = m, h = c;
      }
      return h !== 0 && (i.words[i.length++] = h), i;
    }, s._prime = function(i) {
      if (K[i])
        return K[i];
      var h;
      if (i === "k256")
        h = new Tt();
      else if (i === "p224")
        h = new Z();
      else if (i === "p192")
        h = new Ut();
      else if (i === "p25519")
        h = new Ht();
      else
        throw new Error("Unknown prime " + i);
      return K[i] = h, h;
    };
    function G(i) {
      if (typeof i == "string") {
        var h = s._prime(i);
        this.m = h.p, this.prime = h;
      } else
        n(i.gtn(1), "modulus must be greater than 1"), this.m = i, this.prime = null;
    }
    G.prototype._verify1 = function(i) {
      n(i.negative === 0, "red works only with positives"), n(i.red, "red works only with red numbers");
    }, G.prototype._verify2 = function(i, h) {
      n((i.negative | h.negative) === 0, "red works only with positives"), n(i.red && i.red === h.red, "red works only with red numbers");
    }, G.prototype.imod = function(i) {
      return this.prime ? this.prime.ireduce(i)._forceRed(this) : (y(i, i.umod(this.m)._forceRed(this)), i);
    }, G.prototype.neg = function(i) {
      return i.isZero() ? i.clone() : this.m.sub(i)._forceRed(this);
    }, G.prototype.add = function(i, h) {
      this._verify2(i, h);
      var u = i.add(h);
      return u.cmp(this.m) >= 0 && u.isub(this.m), u._forceRed(this);
    }, G.prototype.iadd = function(i, h) {
      this._verify2(i, h);
      var u = i.iadd(h);
      return u.cmp(this.m) >= 0 && u.isub(this.m), u;
    }, G.prototype.sub = function(i, h) {
      this._verify2(i, h);
      var u = i.sub(h);
      return u.cmpn(0) < 0 && u.iadd(this.m), u._forceRed(this);
    }, G.prototype.isub = function(i, h) {
      this._verify2(i, h);
      var u = i.isub(h);
      return u.cmpn(0) < 0 && u.iadd(this.m), u;
    }, G.prototype.shl = function(i, h) {
      return this._verify1(i), this.imod(i.ushln(h));
    }, G.prototype.imul = function(i, h) {
      return this._verify2(i, h), this.imod(i.imul(h));
    }, G.prototype.mul = function(i, h) {
      return this._verify2(i, h), this.imod(i.mul(h));
    }, G.prototype.isqr = function(i) {
      return this.imul(i, i.clone());
    }, G.prototype.sqr = function(i) {
      return this.mul(i, i);
    }, G.prototype.sqrt = function(i) {
      if (i.isZero())
        return i.clone();
      var h = this.m.andln(3);
      if (n(h % 2 === 1), h === 3) {
        var u = this.m.add(new s(1)).iushrn(2);
        return this.pow(i, u);
      }
      for (var c = this.m.subn(1), m = 0; !c.isZero() && c.andln(1) === 0; )
        m++, c.iushrn(1);
      n(!c.isZero());
      var A = new s(1).toRed(this), b = A.redNeg(), p = this.m.subn(1).iushrn(1), o = this.m.bitLength();
      for (o = new s(2 * o * o).toRed(this); this.pow(o, p).cmp(b) !== 0; )
        o.redIAdd(b);
      for (var l = this.pow(o, c), D = this.pow(i, c.addn(1).iushrn(1)), k = this.pow(i, c), a = m; k.cmp(A) !== 0; ) {
        for (var E = k, S = 0; E.cmp(A) !== 0; S++)
          E = E.redSqr();
        n(S < a);
        var I = this.pow(l, new s(1).iushln(a - S - 1));
        D = D.redMul(I), l = I.redSqr(), k = k.redMul(l), a = S;
      }
      return D;
    }, G.prototype.invm = function(i) {
      var h = i._invmp(this.m);
      return h.negative !== 0 ? (h.negative = 0, this.imod(h).redNeg()) : this.imod(h);
    }, G.prototype.pow = function(i, h) {
      if (h.isZero())
        return new s(1).toRed(this);
      if (h.cmpn(1) === 0)
        return i.clone();
      var u = 4, c = new Array(1 << u);
      c[0] = new s(1).toRed(this), c[1] = i;
      for (var m = 2; m < c.length; m++)
        c[m] = this.mul(c[m - 1], i);
      var A = c[0], b = 0, p = 0, o = h.bitLength() % 26;
      for (o === 0 && (o = 26), m = h.length - 1; m >= 0; m--) {
        for (var l = h.words[m], D = o - 1; D >= 0; D--) {
          var k = l >> D & 1;
          if (A !== c[0] && (A = this.sqr(A)), k === 0 && b === 0) {
            p = 0;
            continue;
          }
          b <<= 1, b |= k, p++, !(p !== u && (m !== 0 || D !== 0)) && (A = this.mul(A, c[b]), p = 0, b = 0);
        }
        o = 26;
      }
      return A;
    }, G.prototype.convertTo = function(i) {
      var h = i.umod(this.m);
      return h === i ? h.clone() : h;
    }, G.prototype.convertFrom = function(i) {
      var h = i.clone();
      return h.red = null, h;
    }, s.mont = function(i) {
      return new Yt(i);
    };
    function Yt(i) {
      G.call(this, i), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    f(Yt, G), Yt.prototype.convertTo = function(i) {
      return this.imod(i.ushln(this.shift));
    }, Yt.prototype.convertFrom = function(i) {
      var h = this.imod(i.mul(this.rinv));
      return h.red = null, h;
    }, Yt.prototype.imul = function(i, h) {
      if (i.isZero() || h.isZero())
        return i.words[0] = 0, i.length = 1, i;
      var u = i.imul(h), c = u.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m = u.isub(c).iushrn(this.shift), A = m;
      return m.cmp(this.m) >= 0 ? A = m.isub(this.m) : m.cmpn(0) < 0 && (A = m.iadd(this.m)), A._forceRed(this);
    }, Yt.prototype.mul = function(i, h) {
      if (i.isZero() || h.isZero())
        return new s(0)._forceRed(this);
      var u = i.mul(h), c = u.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), m = u.isub(c).iushrn(this.shift), A = m;
      return m.cmp(this.m) >= 0 ? A = m.isub(this.m) : m.cmpn(0) < 0 && (A = m.iadd(this.m)), A._forceRed(this);
    }, Yt.prototype.invm = function(i) {
      var h = this.imod(i._invmp(this.m).mul(this.r2));
      return h._forceRed(this);
    };
  })(t, _i);
})(Oi);
var z = Oi.exports;
const Ui = "bignumber/5.7.0";
var Ge = z.BN;
const fr = new Y(Ui), Ue = {}, pi = 9007199254740991;
function Pn(t) {
  return t != null && (W.isBigNumber(t) || typeof t == "number" && t % 1 === 0 || typeof t == "string" && !!t.match(/^-?[0-9]+$/) || Qr(t) || typeof t == "bigint" || ee(t));
}
let mi = !1;
class W {
  constructor(r, e) {
    r !== Ue && fr.throwError("cannot call constructor directly; use BigNumber.from", Y.errors.UNSUPPORTED_OPERATION, { operation: "new (BigNumber)" }), this._hex = e, this._isBigNumber = !0, Object.freeze(this);
  }
  fromTwos(r) {
    return Pt(L(this).fromTwos(r));
  }
  toTwos(r) {
    return Pt(L(this).toTwos(r));
  }
  abs() {
    return this._hex[0] === "-" ? W.from(this._hex.substring(1)) : this;
  }
  add(r) {
    return Pt(L(this).add(L(r)));
  }
  sub(r) {
    return Pt(L(this).sub(L(r)));
  }
  div(r) {
    return W.from(r).isZero() && Kt("division-by-zero", "div"), Pt(L(this).div(L(r)));
  }
  mul(r) {
    return Pt(L(this).mul(L(r)));
  }
  mod(r) {
    const e = L(r);
    return e.isNeg() && Kt("division-by-zero", "mod"), Pt(L(this).umod(e));
  }
  pow(r) {
    const e = L(r);
    return e.isNeg() && Kt("negative-power", "pow"), Pt(L(this).pow(e));
  }
  and(r) {
    const e = L(r);
    return (this.isNegative() || e.isNeg()) && Kt("unbound-bitwise-result", "and"), Pt(L(this).and(e));
  }
  or(r) {
    const e = L(r);
    return (this.isNegative() || e.isNeg()) && Kt("unbound-bitwise-result", "or"), Pt(L(this).or(e));
  }
  xor(r) {
    const e = L(r);
    return (this.isNegative() || e.isNeg()) && Kt("unbound-bitwise-result", "xor"), Pt(L(this).xor(e));
  }
  mask(r) {
    return (this.isNegative() || r < 0) && Kt("negative-width", "mask"), Pt(L(this).maskn(r));
  }
  shl(r) {
    return (this.isNegative() || r < 0) && Kt("negative-width", "shl"), Pt(L(this).shln(r));
  }
  shr(r) {
    return (this.isNegative() || r < 0) && Kt("negative-width", "shr"), Pt(L(this).shrn(r));
  }
  eq(r) {
    return L(this).eq(L(r));
  }
  lt(r) {
    return L(this).lt(L(r));
  }
  lte(r) {
    return L(this).lte(L(r));
  }
  gt(r) {
    return L(this).gt(L(r));
  }
  gte(r) {
    return L(this).gte(L(r));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return L(this).isZero();
  }
  toNumber() {
    try {
      return L(this).toNumber();
    } catch {
      Kt("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch {
    }
    return fr.throwError("this platform does not support BigInt", Y.errors.UNSUPPORTED_OPERATION, { value: this.toString() });
  }
  toString() {
    return arguments.length > 0 && (arguments[0] === 10 ? mi || (mi = !0, fr.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : arguments[0] === 16 ? fr.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Y.errors.UNEXPECTED_ARGUMENT, {}) : fr.throwError("BigNumber.toString does not accept parameters", Y.errors.UNEXPECTED_ARGUMENT, {})), L(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(r) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(r) {
    if (r instanceof W)
      return r;
    if (typeof r == "string")
      return r.match(/^-?0x[0-9a-f]+$/i) ? new W(Ue, re(r)) : r.match(/^-?[0-9]+$/) ? new W(Ue, re(new Ge(r))) : fr.throwArgumentError("invalid BigNumber string", "value", r);
    if (typeof r == "number")
      return r % 1 && Kt("underflow", "BigNumber.from", r), (r >= pi || r <= -pi) && Kt("overflow", "BigNumber.from", r), W.from(String(r));
    const e = r;
    if (typeof e == "bigint")
      return W.from(e.toString());
    if (ee(e))
      return W.from(ki(e));
    if (e)
      if (e.toHexString) {
        const n = e.toHexString();
        if (typeof n == "string")
          return W.from(n);
      } else {
        let n = e._hex;
        if (n == null && e.type === "BigNumber" && (n = e.hex), typeof n == "string" && (Qr(n) || n[0] === "-" && Qr(n.substring(1))))
          return W.from(n);
      }
    return fr.throwArgumentError("invalid BigNumber value", "value", r);
  }
  static isBigNumber(r) {
    return !!(r && r._isBigNumber);
  }
}
function re(t) {
  if (typeof t != "string")
    return re(t.toString(16));
  if (t[0] === "-")
    return t = t.substring(1), t[0] === "-" && fr.throwArgumentError("invalid hex", "value", t), t = re(t), t === "0x00" ? t : "-" + t;
  if (t.substring(0, 2) !== "0x" && (t = "0x" + t), t === "0x")
    return "0x00";
  for (t.length % 2 && (t = "0x0" + t.substring(2)); t.length > 4 && t.substring(0, 4) === "0x00"; )
    t = "0x" + t.substring(4);
  return t;
}
function Pt(t) {
  return W.from(re(t));
}
function L(t) {
  const r = W.from(t).toHexString();
  return r[0] === "-" ? new Ge("-" + r.substring(3), 16) : new Ge(r.substring(2), 16);
}
function Kt(t, r, e) {
  const n = { fault: t, operation: r };
  return e != null && (n.value = e), fr.throwError(t, Y.errors.NUMERIC_FAULT, n);
}
const zt = new Y(Ui), $r = {}, Di = W.from(0), zi = W.from(-1);
function Pi(t, r, e, n) {
  const f = { fault: r, operation: e };
  return n !== void 0 && (f.value = n), zt.throwError(t, Y.errors.NUMERIC_FAULT, f);
}
let te = "0";
for (; te.length < 256; )
  te += te;
function ri(t) {
  if (typeof t != "number")
    try {
      t = W.from(t).toNumber();
    } catch {
    }
  return typeof t == "number" && t >= 0 && t <= 256 && !(t % 1) ? "1" + te.substring(0, t) : zt.throwArgumentError("invalid decimal size", "decimals", t);
}
function De(t, r) {
  r == null && (r = 0);
  const e = ri(r);
  t = W.from(t);
  const n = t.lt(Di);
  n && (t = t.mul(zi));
  let f = t.mod(e).toString();
  for (; f.length < e.length - 1; )
    f = "0" + f;
  f = f.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  const s = t.div(e).toString();
  return e.length === 1 ? t = s : t = s + "." + f, n && (t = "-" + t), t;
}
function hr(t, r) {
  r == null && (r = 0);
  const e = ri(r);
  (typeof t != "string" || !t.match(/^-?[0-9.]+$/)) && zt.throwArgumentError("invalid decimal value", "value", t);
  const n = t.substring(0, 1) === "-";
  n && (t = t.substring(1)), t === "." && zt.throwArgumentError("missing value", "value", t);
  const f = t.split(".");
  f.length > 2 && zt.throwArgumentError("too many decimal points", "value", t);
  let s = f[0], d = f[1];
  for (s || (s = "0"), d || (d = "0"); d[d.length - 1] === "0"; )
    d = d.substring(0, d.length - 1);
  for (d.length > e.length - 1 && Pi("fractional component exceeds decimals", "underflow", "parseFixed"), d === "" && (d = "0"); d.length < e.length - 1; )
    d += "0";
  const v = W.from(s), w = W.from(d);
  let g = v.mul(e).add(w);
  return n && (g = g.mul(zi)), g;
}
class qr {
  constructor(r, e, n, f) {
    r !== $r && zt.throwError("cannot use FixedFormat constructor; use FixedFormat.from", Y.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.signed = e, this.width = n, this.decimals = f, this.name = (e ? "" : "u") + "fixed" + String(n) + "x" + String(f), this._multiplier = ri(f), Object.freeze(this);
  }
  static from(r) {
    if (r instanceof qr)
      return r;
    typeof r == "number" && (r = `fixed128x${r}`);
    let e = !0, n = 128, f = 18;
    if (typeof r == "string") {
      if (r !== "fixed")
        if (r === "ufixed")
          e = !1;
        else {
          const s = r.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
          s || zt.throwArgumentError("invalid fixed format", "format", r), e = s[1] !== "u", n = parseInt(s[2]), f = parseInt(s[3]);
        }
    } else if (r) {
      const s = (d, v, w) => r[d] == null ? w : (typeof r[d] !== v && zt.throwArgumentError("invalid fixed format (" + d + " not " + v + ")", "format." + d, r[d]), r[d]);
      e = s("signed", "boolean", e), n = s("width", "number", n), f = s("decimals", "number", f);
    }
    return n % 8 && zt.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", n), f > 80 && zt.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", f), new qr($r, e, n, f);
  }
}
class Ot {
  constructor(r, e, n, f) {
    r !== $r && zt.throwError("cannot use FixedNumber constructor; use FixedNumber.from", Y.errors.UNSUPPORTED_OPERATION, { operation: "new FixedFormat" }), this.format = f, this._hex = e, this._value = n, this._isFixedNumber = !0, Object.freeze(this);
  }
  _checkFormat(r) {
    this.format.name !== r.format.name && zt.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", r);
  }
  addUnsafe(r) {
    this._checkFormat(r);
    const e = hr(this._value, this.format.decimals), n = hr(r._value, r.format.decimals);
    return Ot.fromValue(e.add(n), this.format.decimals, this.format);
  }
  subUnsafe(r) {
    this._checkFormat(r);
    const e = hr(this._value, this.format.decimals), n = hr(r._value, r.format.decimals);
    return Ot.fromValue(e.sub(n), this.format.decimals, this.format);
  }
  mulUnsafe(r) {
    this._checkFormat(r);
    const e = hr(this._value, this.format.decimals), n = hr(r._value, r.format.decimals);
    return Ot.fromValue(e.mul(n).div(this.format._multiplier), this.format.decimals, this.format);
  }
  divUnsafe(r) {
    this._checkFormat(r);
    const e = hr(this._value, this.format.decimals), n = hr(r._value, r.format.decimals);
    return Ot.fromValue(e.mul(this.format._multiplier).div(n), this.format.decimals, this.format);
  }
  floor() {
    const r = this.toString().split(".");
    r.length === 1 && r.push("0");
    let e = Ot.from(r[0], this.format);
    const n = !r[1].match(/^(0*)$/);
    return this.isNegative() && n && (e = e.subUnsafe(gi.toFormat(e.format))), e;
  }
  ceiling() {
    const r = this.toString().split(".");
    r.length === 1 && r.push("0");
    let e = Ot.from(r[0], this.format);
    const n = !r[1].match(/^(0*)$/);
    return !this.isNegative() && n && (e = e.addUnsafe(gi.toFormat(e.format))), e;
  }
  round(r) {
    r == null && (r = 0);
    const e = this.toString().split(".");
    if (e.length === 1 && e.push("0"), (r < 0 || r > 80 || r % 1) && zt.throwArgumentError("invalid decimal count", "decimals", r), e[1].length <= r)
      return this;
    const n = Ot.from("1" + te.substring(0, r), this.format), f = qn.toFormat(this.format);
    return this.mulUnsafe(n).addUnsafe(f).floor().divUnsafe(n);
  }
  isZero() {
    return this._value === "0.0" || this._value === "0";
  }
  isNegative() {
    return this._value[0] === "-";
  }
  toString() {
    return this._value;
  }
  toHexString(r) {
    if (r == null)
      return this._hex;
    r % 8 && zt.throwArgumentError("invalid byte width", "width", r);
    const e = W.from(this._hex).fromTwos(this.format.width).toTwos(r).toHexString();
    return ge(e, r / 8);
  }
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  toFormat(r) {
    return Ot.fromString(this._value, r);
  }
  static fromValue(r, e, n) {
    return n == null && e != null && !Pn(e) && (n = e, e = null), e == null && (e = 0), n == null && (n = "fixed"), Ot.fromString(De(r, e), qr.from(n));
  }
  static fromString(r, e) {
    e == null && (e = "fixed");
    const n = qr.from(e), f = hr(r, n.decimals);
    !n.signed && f.lt(Di) && Pi("unsigned value cannot be negative", "overflow", "value", r);
    let s = null;
    n.signed ? s = f.toTwos(n.width).toHexString() : (s = f.toHexString(), s = ge(s, n.width / 8));
    const d = De(f, n.decimals);
    return new Ot($r, s, d, n);
  }
  static fromBytes(r, e) {
    e == null && (e = "fixed");
    const n = qr.from(e);
    if (Fi(r).length > n.width / 8)
      throw new Error("overflow");
    let f = W.from(r);
    n.signed && (f = f.fromTwos(n.width));
    const s = f.toTwos((n.signed ? 0 : 1) + n.width).toHexString(), d = De(f, n.decimals);
    return new Ot($r, s, d, n);
  }
  static from(r, e) {
    if (typeof r == "string")
      return Ot.fromString(r, e);
    if (ee(r))
      return Ot.fromBytes(r, e);
    try {
      return Ot.fromValue(r, 0, e);
    } catch (n) {
      if (n.code !== Y.errors.INVALID_ARGUMENT)
        throw n;
    }
    return zt.throwArgumentError("invalid FixedNumber value", "value", r);
  }
  static isFixedNumber(r) {
    return !!(r && r._isFixedNumber);
  }
}
const gi = Ot.from(1), qn = Ot.from("0.5");
var Ai;
(function(t) {
  t.current = "", t.NFC = "NFC", t.NFD = "NFD", t.NFKC = "NFKC", t.NFKD = "NFKD";
})(Ai || (Ai = {}));
var vi;
(function(t) {
  t.UNEXPECTED_CONTINUE = "unexpected continuation byte", t.BAD_PREFIX = "bad codepoint prefix", t.OVERRUN = "string overrun", t.MISSING_CONTINUE = "missing continuation byte", t.OUT_OF_RANGE = "out of UTF-8 range", t.UTF16_SURROGATE = "UTF-16 surrogate", t.OVERLONG = "overlong representation";
})(vi || (vi = {}));
function Ln(t) {
  if (t.length % 4 !== 0)
    throw new Error("bad data");
  let r = [];
  for (let e = 0; e < t.length; e += 4)
    r.push(parseInt(t.substring(e, e + 4), 16));
  return r;
}
function ze(t, r) {
  r || (r = function(f) {
    return [parseInt(f, 16)];
  });
  let e = 0, n = {};
  return t.split(",").forEach((f) => {
    let s = f.split(":");
    e += parseInt(s[0], 16), n[e] = r(s[1]);
  }), n;
}
function wi(t) {
  let r = 0;
  return t.split(",").map((e) => {
    let n = e.split("-");
    n.length === 1 ? n[1] = "0" : n[1] === "" && (n[1] = "1");
    let f = r + parseInt(n[0], 16);
    return r = parseInt(n[1], 16), { l: f, h: r };
  });
}
wi("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((t) => parseInt(t, 16)), ze("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), ze("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), ze("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", Ln), wi("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
function Qn(t) {
  t = atob(t);
  const r = [];
  for (let e = 0; e < t.length; e++)
    r.push(t.charCodeAt(e));
  return Fi(r);
}
function qi(t, r) {
  r == null && (r = 1);
  const e = [], n = e.forEach, f = function(s, d) {
    n.call(s, function(v) {
      d > 0 && Array.isArray(v) ? f(v, d - 1) : e.push(v);
    });
  };
  return f(t, r), e;
}
function Hn(t) {
  const r = {};
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    r[n[0]] = n[1];
  }
  return r;
}
function Yn(t) {
  let r = 0;
  function e() {
    return t[r++] << 8 | t[r++];
  }
  let n = e(), f = 1, s = [0, 1];
  for (let K = 1; K < n; K++)
    s.push(f += e());
  let d = e(), v = r;
  r += d;
  let w = 0, g = 0;
  function y() {
    return w == 0 && (g = g << 8 | t[r++], w = 8), g >> --w & 1;
  }
  const M = 31, B = Math.pow(2, M), C = B >>> 1, N = C >> 1, O = B - 1;
  let x = 0;
  for (let K = 0; K < M; K++)
    x = x << 1 | y();
  let q = [], X = 0, _t = B;
  for (; ; ) {
    let K = Math.floor(((x - X + 1) * f - 1) / _t), H = 0, Tt = n;
    for (; Tt - H > 1; ) {
      let Ht = H + Tt >>> 1;
      K < s[Ht] ? Tt = Ht : H = Ht;
    }
    if (H == 0)
      break;
    q.push(H);
    let Z = X + Math.floor(_t * s[H] / f), Ut = X + Math.floor(_t * s[H + 1] / f) - 1;
    for (; !((Z ^ Ut) & C); )
      x = x << 1 & O | y(), Z = Z << 1 & O, Ut = Ut << 1 & O | 1;
    for (; Z & ~Ut & N; )
      x = x & C | x << 1 & O >>> 1 | y(), Z = Z << 1 ^ C, Ut = (Ut ^ C) << 1 | C | 1;
    X = Z, _t = 1 + Ut - Z;
  }
  let J = n - 4;
  return q.map((K) => {
    switch (K - J) {
      case 3:
        return J + 65792 + (t[v++] << 16 | t[v++] << 8 | t[v++]);
      case 2:
        return J + 256 + (t[v++] << 8 | t[v++]);
      case 1:
        return J + t[v++];
      default:
        return K - 1;
    }
  });
}
function Kn(t) {
  let r = 0;
  return () => t[r++];
}
function Jn(t) {
  return Kn(Yn(t));
}
function Gn(t) {
  return t & 1 ? ~t >> 1 : t >> 1;
}
function jn(t, r) {
  let e = Array(t);
  for (let n = 0; n < t; n++)
    e[n] = 1 + r();
  return e;
}
function bi(t, r) {
  let e = Array(t);
  for (let n = 0, f = -1; n < t; n++)
    e[n] = f += 1 + r();
  return e;
}
function Wn(t, r) {
  let e = Array(t);
  for (let n = 0, f = 0; n < t; n++)
    e[n] = f += Gn(r());
  return e;
}
function Ae(t, r) {
  let e = bi(t(), t), n = t(), f = bi(n, t), s = jn(n, t);
  for (let d = 0; d < n; d++)
    for (let v = 0; v < s[d]; v++)
      e.push(f[d] + v);
  return r ? e.map((d) => r[d]) : e;
}
function Xn(t) {
  let r = [];
  for (; ; ) {
    let e = t();
    if (e == 0)
      break;
    r.push(Vn(e, t));
  }
  for (; ; ) {
    let e = t() - 1;
    if (e < 0)
      break;
    r.push($n(e, t));
  }
  return Hn(qi(r));
}
function Zn(t) {
  let r = [];
  for (; ; ) {
    let e = t();
    if (e == 0)
      break;
    r.push(e);
  }
  return r;
}
function Li(t, r, e) {
  let n = Array(t).fill(void 0).map(() => []);
  for (let f = 0; f < r; f++)
    Wn(t, e).forEach((s, d) => n[d].push(s));
  return n;
}
function Vn(t, r) {
  let e = 1 + r(), n = r(), f = Zn(r), s = Li(f.length, 1 + t, r);
  return qi(s.map((d, v) => {
    const w = d[0], g = d.slice(1);
    return Array(f[v]).fill(void 0).map((y, M) => {
      let B = M * n;
      return [w + M * e, g.map((C) => C + B)];
    });
  }));
}
function $n(t, r) {
  let e = 1 + r();
  return Li(e, 1 + t, r).map((n) => [n[0], n.slice(1)]);
}
function to(t) {
  let r = Ae(t).sort((n, f) => n - f);
  return e();
  function e() {
    let n = [];
    for (; ; ) {
      let g = Ae(t, r);
      if (g.length == 0)
        break;
      n.push({ set: new Set(g), node: e() });
    }
    n.sort((g, y) => y.set.size - g.set.size);
    let f = t(), s = f % 3;
    f = f / 3 | 0;
    let d = !!(f & 1);
    f >>= 1;
    let v = f == 1, w = f == 2;
    return { branches: n, valid: s, fe0f: d, save: v, check: w };
  }
}
function ro() {
  return Jn(Qn("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"));
}
const he = ro();
new Set(Ae(he)), new Set(Ae(he)), Xn(he), to(he);
const eo = new Uint8Array(32);
eo.fill(0);
const io = new Uint8Array(32);
io.fill(0), W.from(-1);
const no = W.from(0), oo = W.from(1);
W.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), ge(oo.toHexString(), 32), ge(no.toHexString(), 32);
var $t = {}, Q = {}, ie = Qi;
function Qi(t, r) {
  if (!t)
    throw new Error(r || "Assertion failed");
}
Qi.equal = function(t, r, e) {
  if (t != r)
    throw new Error(e || "Assertion failed: " + t + " != " + r);
};
var je = { exports: {} };
typeof Object.create == "function" ? je.exports = function(t, r) {
  r && (t.super_ = r, t.prototype = Object.create(r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }));
} : je.exports = function(t, r) {
  if (r) {
    t.super_ = r;
    var e = function() {
    };
    e.prototype = r.prototype, t.prototype = new e(), t.prototype.constructor = t;
  }
};
var so = ie, ho = je.exports;
Q.inherits = ho;
function fo(t, r) {
  return (t.charCodeAt(r) & 64512) !== 55296 || r < 0 || r + 1 >= t.length ? !1 : (t.charCodeAt(r + 1) & 64512) === 56320;
}
function ao(t, r) {
  if (Array.isArray(t))
    return t.slice();
  if (!t)
    return [];
  var e = [];
  if (typeof t == "string")
    if (r) {
      if (r === "hex")
        for (t = t.replace(/[^a-z0-9]+/ig, ""), t.length % 2 !== 0 && (t = "0" + t), f = 0; f < t.length; f += 2)
          e.push(parseInt(t[f] + t[f + 1], 16));
    } else
      for (var n = 0, f = 0; f < t.length; f++) {
        var s = t.charCodeAt(f);
        s < 128 ? e[n++] = s : s < 2048 ? (e[n++] = s >> 6 | 192, e[n++] = s & 63 | 128) : fo(t, f) ? (s = 65536 + ((s & 1023) << 10) + (t.charCodeAt(++f) & 1023), e[n++] = s >> 18 | 240, e[n++] = s >> 12 & 63 | 128, e[n++] = s >> 6 & 63 | 128, e[n++] = s & 63 | 128) : (e[n++] = s >> 12 | 224, e[n++] = s >> 6 & 63 | 128, e[n++] = s & 63 | 128);
      }
  else
    for (f = 0; f < t.length; f++)
      e[f] = t[f] | 0;
  return e;
}
Q.toArray = ao;
function uo(t) {
  for (var r = "", e = 0; e < t.length; e++)
    r += Yi(t[e].toString(16));
  return r;
}
Q.toHex = uo;
function Hi(t) {
  var r = t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (t & 255) << 24;
  return r >>> 0;
}
Q.htonl = Hi;
function lo(t, r) {
  for (var e = "", n = 0; n < t.length; n++) {
    var f = t[n];
    r === "little" && (f = Hi(f)), e += Ki(f.toString(16));
  }
  return e;
}
Q.toHex32 = lo;
function Yi(t) {
  return t.length === 1 ? "0" + t : t;
}
Q.zero2 = Yi;
function Ki(t) {
  return t.length === 7 ? "0" + t : t.length === 6 ? "00" + t : t.length === 5 ? "000" + t : t.length === 4 ? "0000" + t : t.length === 3 ? "00000" + t : t.length === 2 ? "000000" + t : t.length === 1 ? "0000000" + t : t;
}
Q.zero8 = Ki;
function co(t, r, e, n) {
  var f = e - r;
  so(f % 4 === 0);
  for (var s = new Array(f / 4), d = 0, v = r; d < s.length; d++, v += 4) {
    var w;
    n === "big" ? w = t[v] << 24 | t[v + 1] << 16 | t[v + 2] << 8 | t[v + 3] : w = t[v + 3] << 24 | t[v + 2] << 16 | t[v + 1] << 8 | t[v], s[d] = w >>> 0;
  }
  return s;
}
Q.join32 = co;
function po(t, r) {
  for (var e = new Array(t.length * 4), n = 0, f = 0; n < t.length; n++, f += 4) {
    var s = t[n];
    r === "big" ? (e[f] = s >>> 24, e[f + 1] = s >>> 16 & 255, e[f + 2] = s >>> 8 & 255, e[f + 3] = s & 255) : (e[f + 3] = s >>> 24, e[f + 2] = s >>> 16 & 255, e[f + 1] = s >>> 8 & 255, e[f] = s & 255);
  }
  return e;
}
Q.split32 = po;
function mo(t, r) {
  return t >>> r | t << 32 - r;
}
Q.rotr32 = mo;
function go(t, r) {
  return t << r | t >>> 32 - r;
}
Q.rotl32 = go;
function Ao(t, r) {
  return t + r >>> 0;
}
Q.sum32 = Ao;
function vo(t, r, e) {
  return t + r + e >>> 0;
}
Q.sum32_3 = vo;
function wo(t, r, e, n) {
  return t + r + e + n >>> 0;
}
Q.sum32_4 = wo;
function bo(t, r, e, n, f) {
  return t + r + e + n + f >>> 0;
}
Q.sum32_5 = bo;
function yo(t, r, e, n) {
  var f = t[r], s = t[r + 1], d = n + s >>> 0, v = (d < n ? 1 : 0) + e + f;
  t[r] = v >>> 0, t[r + 1] = d;
}
Q.sum64 = yo;
function Mo(t, r, e, n) {
  var f = r + n >>> 0, s = (f < r ? 1 : 0) + t + e;
  return s >>> 0;
}
Q.sum64_hi = Mo;
function So(t, r, e, n) {
  var f = r + n;
  return f >>> 0;
}
Q.sum64_lo = So;
function Eo(t, r, e, n, f, s, d, v) {
  var w = 0, g = r;
  g = g + n >>> 0, w += g < r ? 1 : 0, g = g + s >>> 0, w += g < s ? 1 : 0, g = g + v >>> 0, w += g < v ? 1 : 0;
  var y = t + e + f + d + w;
  return y >>> 0;
}
Q.sum64_4_hi = Eo;
function Bo(t, r, e, n, f, s, d, v) {
  var w = r + n + s + v;
  return w >>> 0;
}
Q.sum64_4_lo = Bo;
function Io(t, r, e, n, f, s, d, v, w, g) {
  var y = 0, M = r;
  M = M + n >>> 0, y += M < r ? 1 : 0, M = M + s >>> 0, y += M < s ? 1 : 0, M = M + v >>> 0, y += M < v ? 1 : 0, M = M + g >>> 0, y += M < g ? 1 : 0;
  var B = t + e + f + d + w + y;
  return B >>> 0;
}
Q.sum64_5_hi = Io;
function Co(t, r, e, n, f, s, d, v, w, g) {
  var y = r + n + s + v + g;
  return y >>> 0;
}
Q.sum64_5_lo = Co;
function No(t, r, e) {
  var n = r << 32 - e | t >>> e;
  return n >>> 0;
}
Q.rotr64_hi = No;
function xo(t, r, e) {
  var n = t << 32 - e | r >>> e;
  return n >>> 0;
}
Q.rotr64_lo = xo;
function Ro(t, r, e) {
  return t >>> e;
}
Q.shr64_hi = Ro;
function _o(t, r, e) {
  var n = t << 32 - e | r >>> e;
  return n >>> 0;
}
Q.shr64_lo = _o;
var Jr = {}, yi = Q, To = ie;
function fe() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
Jr.BlockHash = fe, fe.prototype.update = function(t, r) {
  if (t = yi.toArray(t, r), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
    t = this.pending;
    var e = t.length % this._delta8;
    this.pending = t.slice(t.length - e, t.length), this.pending.length === 0 && (this.pending = null), t = yi.join32(t, 0, t.length - e, this.endian);
    for (var n = 0; n < t.length; n += this._delta32)
      this._update(t, n, n + this._delta32);
  }
  return this;
}, fe.prototype.digest = function(t) {
  return this.update(this._pad()), To(this.pending === null), this._digest(t);
}, fe.prototype._pad = function() {
  var t = this.pendingTotal, r = this._delta8, e = r - (t + this.padLength) % r, n = new Array(e + this.padLength);
  n[0] = 128;
  for (var f = 1; f < e; f++)
    n[f] = 0;
  if (t <<= 3, this.endian === "big") {
    for (var s = 8; s < this.padLength; s++)
      n[f++] = 0;
    n[f++] = 0, n[f++] = 0, n[f++] = 0, n[f++] = 0, n[f++] = t >>> 24 & 255, n[f++] = t >>> 16 & 255, n[f++] = t >>> 8 & 255, n[f++] = t & 255;
  } else
    for (n[f++] = t & 255, n[f++] = t >>> 8 & 255, n[f++] = t >>> 16 & 255, n[f++] = t >>> 24 & 255, n[f++] = 0, n[f++] = 0, n[f++] = 0, n[f++] = 0, s = 8; s < this.padLength; s++)
      n[f++] = 0;
  return n;
};
var Pr = {}, sr = {}, Fo = Q, ir = Fo.rotr32;
function ko(t, r, e, n) {
  if (t === 0)
    return Ji(r, e, n);
  if (t === 1 || t === 3)
    return ji(r, e, n);
  if (t === 2)
    return Gi(r, e, n);
}
sr.ft_1 = ko;
function Ji(t, r, e) {
  return t & r ^ ~t & e;
}
sr.ch32 = Ji;
function Gi(t, r, e) {
  return t & r ^ t & e ^ r & e;
}
sr.maj32 = Gi;
function ji(t, r, e) {
  return t ^ r ^ e;
}
sr.p32 = ji;
function Oo(t) {
  return ir(t, 2) ^ ir(t, 13) ^ ir(t, 22);
}
sr.s0_256 = Oo;
function Uo(t) {
  return ir(t, 6) ^ ir(t, 11) ^ ir(t, 25);
}
sr.s1_256 = Uo;
function Do(t) {
  return ir(t, 7) ^ ir(t, 18) ^ t >>> 3;
}
sr.g0_256 = Do;
function zo(t) {
  return ir(t, 17) ^ ir(t, 19) ^ t >>> 10;
}
sr.g1_256 = zo;
var Hr = Q, Po = Jr, qo = sr, Pe = Hr.rotl32, Xr = Hr.sum32, Lo = Hr.sum32_5, Qo = qo.ft_1, Wi = Po.BlockHash, Ho = [1518500249, 1859775393, 2400959708, 3395469782];
function rr() {
  if (!(this instanceof rr))
    return new rr();
  Wi.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
}
Hr.inherits(rr, Wi);
var Yo = rr;
rr.blockSize = 512, rr.outSize = 160, rr.hmacStrength = 80, rr.padLength = 64, rr.prototype._update = function(t, r) {
  for (var e = this.W, n = 0; n < 16; n++)
    e[n] = t[r + n];
  for (; n < e.length; n++)
    e[n] = Pe(e[n - 3] ^ e[n - 8] ^ e[n - 14] ^ e[n - 16], 1);
  var f = this.h[0], s = this.h[1], d = this.h[2], v = this.h[3], w = this.h[4];
  for (n = 0; n < e.length; n++) {
    var g = ~~(n / 20), y = Lo(Pe(f, 5), Qo(g, s, d, v), w, e[n], Ho[g]);
    w = v, v = d, d = Pe(s, 30), s = f, f = y;
  }
  this.h[0] = Xr(this.h[0], f), this.h[1] = Xr(this.h[1], s), this.h[2] = Xr(this.h[2], d), this.h[3] = Xr(this.h[3], v), this.h[4] = Xr(this.h[4], w);
}, rr.prototype._digest = function(t) {
  return t === "hex" ? Hr.toHex32(this.h, "big") : Hr.split32(this.h, "big");
};
var Yr = Q, Ko = Jr, Gr = sr, Jo = ie, Wt = Yr.sum32, Go = Yr.sum32_4, jo = Yr.sum32_5, Wo = Gr.ch32, Xo = Gr.maj32, Zo = Gr.s0_256, Vo = Gr.s1_256, $o = Gr.g0_256, ts = Gr.g1_256, Xi = Ko.BlockHash, rs = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function er() {
  if (!(this instanceof er))
    return new er();
  Xi.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = rs, this.W = new Array(64);
}
Yr.inherits(er, Xi);
var Zi = er;
er.blockSize = 512, er.outSize = 256, er.hmacStrength = 192, er.padLength = 64, er.prototype._update = function(t, r) {
  for (var e = this.W, n = 0; n < 16; n++)
    e[n] = t[r + n];
  for (; n < e.length; n++)
    e[n] = Go(ts(e[n - 2]), e[n - 7], $o(e[n - 15]), e[n - 16]);
  var f = this.h[0], s = this.h[1], d = this.h[2], v = this.h[3], w = this.h[4], g = this.h[5], y = this.h[6], M = this.h[7];
  for (Jo(this.k.length === e.length), n = 0; n < e.length; n++) {
    var B = jo(M, Vo(w), Wo(w, g, y), this.k[n], e[n]), C = Wt(Zo(f), Xo(f, s, d));
    M = y, y = g, g = w, w = Wt(v, B), v = d, d = s, s = f, f = Wt(B, C);
  }
  this.h[0] = Wt(this.h[0], f), this.h[1] = Wt(this.h[1], s), this.h[2] = Wt(this.h[2], d), this.h[3] = Wt(this.h[3], v), this.h[4] = Wt(this.h[4], w), this.h[5] = Wt(this.h[5], g), this.h[6] = Wt(this.h[6], y), this.h[7] = Wt(this.h[7], M);
}, er.prototype._digest = function(t) {
  return t === "hex" ? Yr.toHex32(this.h, "big") : Yr.split32(this.h, "big");
};
var We = Q, Vi = Zi;
function ar() {
  if (!(this instanceof ar))
    return new ar();
  Vi.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
}
We.inherits(ar, Vi);
var es = ar;
ar.blockSize = 512, ar.outSize = 224, ar.hmacStrength = 192, ar.padLength = 64, ar.prototype._digest = function(t) {
  return t === "hex" ? We.toHex32(this.h.slice(0, 7), "big") : We.split32(this.h.slice(0, 7), "big");
};
var qt = Q, is = Jr, ns = ie, nr = qt.rotr64_hi, or = qt.rotr64_lo, $i = qt.shr64_hi, tn = qt.shr64_lo, Ar = qt.sum64, qe = qt.sum64_hi, Le = qt.sum64_lo, os = qt.sum64_4_hi, ss = qt.sum64_4_lo, hs = qt.sum64_5_hi, fs = qt.sum64_5_lo, rn = is.BlockHash, as = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
function Zt() {
  if (!(this instanceof Zt))
    return new Zt();
  rn.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = as, this.W = new Array(160);
}
qt.inherits(Zt, rn);
var en = Zt;
Zt.blockSize = 1024, Zt.outSize = 512, Zt.hmacStrength = 192, Zt.padLength = 128, Zt.prototype._prepareBlock = function(t, r) {
  for (var e = this.W, n = 0; n < 32; n++)
    e[n] = t[r + n];
  for (; n < e.length; n += 2) {
    var f = bs(e[n - 4], e[n - 3]), s = ys(e[n - 4], e[n - 3]), d = e[n - 14], v = e[n - 13], w = vs(e[n - 30], e[n - 29]), g = ws(e[n - 30], e[n - 29]), y = e[n - 32], M = e[n - 31];
    e[n] = os(f, s, d, v, w, g, y, M), e[n + 1] = ss(f, s, d, v, w, g, y, M);
  }
}, Zt.prototype._update = function(t, r) {
  this._prepareBlock(t, r);
  var e = this.W, n = this.h[0], f = this.h[1], s = this.h[2], d = this.h[3], v = this.h[4], w = this.h[5], g = this.h[6], y = this.h[7], M = this.h[8], B = this.h[9], C = this.h[10], N = this.h[11], O = this.h[12], x = this.h[13], q = this.h[14], X = this.h[15];
  ns(this.k.length === e.length);
  for (var _t = 0; _t < e.length; _t += 2) {
    var J = q, K = X, H = gs(M, B), Tt = As(M, B), Z = us(M, B, C, N, O), Ut = ls(M, B, C, N, O, x), Ht = this.k[_t], G = this.k[_t + 1], Yt = e[_t], i = e[_t + 1], h = hs(J, K, H, Tt, Z, Ut, Ht, G, Yt, i), u = fs(J, K, H, Tt, Z, Ut, Ht, G, Yt, i);
    J = ps(n, f), K = ms(n, f), H = ds(n, f, s, d, v), Tt = cs(n, f, s, d, v, w);
    var c = qe(J, K, H, Tt), m = Le(J, K, H, Tt);
    q = O, X = x, O = C, x = N, C = M, N = B, M = qe(g, y, h, u), B = Le(y, y, h, u), g = v, y = w, v = s, w = d, s = n, d = f, n = qe(h, u, c, m), f = Le(h, u, c, m);
  }
  Ar(this.h, 0, n, f), Ar(this.h, 2, s, d), Ar(this.h, 4, v, w), Ar(this.h, 6, g, y), Ar(this.h, 8, M, B), Ar(this.h, 10, C, N), Ar(this.h, 12, O, x), Ar(this.h, 14, q, X);
}, Zt.prototype._digest = function(t) {
  return t === "hex" ? qt.toHex32(this.h, "big") : qt.split32(this.h, "big");
};
function us(t, r, e, n, f) {
  var s = t & e ^ ~t & f;
  return s < 0 && (s += 4294967296), s;
}
function ls(t, r, e, n, f, s) {
  var d = r & n ^ ~r & s;
  return d < 0 && (d += 4294967296), d;
}
function ds(t, r, e, n, f) {
  var s = t & e ^ t & f ^ e & f;
  return s < 0 && (s += 4294967296), s;
}
function cs(t, r, e, n, f, s) {
  var d = r & n ^ r & s ^ n & s;
  return d < 0 && (d += 4294967296), d;
}
function ps(t, r) {
  var e = nr(t, r, 28), n = nr(r, t, 2), f = nr(r, t, 7), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function ms(t, r) {
  var e = or(t, r, 28), n = or(r, t, 2), f = or(r, t, 7), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function gs(t, r) {
  var e = nr(t, r, 14), n = nr(t, r, 18), f = nr(r, t, 9), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function As(t, r) {
  var e = or(t, r, 14), n = or(t, r, 18), f = or(r, t, 9), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function vs(t, r) {
  var e = nr(t, r, 1), n = nr(t, r, 8), f = $i(t, r, 7), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function ws(t, r) {
  var e = or(t, r, 1), n = or(t, r, 8), f = tn(t, r, 7), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function bs(t, r) {
  var e = nr(t, r, 19), n = nr(r, t, 29), f = $i(t, r, 6), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
function ys(t, r) {
  var e = or(t, r, 19), n = or(r, t, 29), f = tn(t, r, 6), s = e ^ n ^ f;
  return s < 0 && (s += 4294967296), s;
}
var Xe = Q, nn = en;
function ur() {
  if (!(this instanceof ur))
    return new ur();
  nn.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
}
Xe.inherits(ur, nn);
var Ms = ur;
ur.blockSize = 1024, ur.outSize = 384, ur.hmacStrength = 192, ur.padLength = 128, ur.prototype._digest = function(t) {
  return t === "hex" ? Xe.toHex32(this.h.slice(0, 12), "big") : Xe.split32(this.h.slice(0, 12), "big");
}, Pr.sha1 = Yo, Pr.sha224 = es, Pr.sha256 = Zi, Pr.sha384 = Ms, Pr.sha512 = en;
var on = {}, Ur = Q, Ss = Jr, ae = Ur.rotl32, Mi = Ur.sum32, Zr = Ur.sum32_3, Si = Ur.sum32_4, sn = Ss.BlockHash;
function tr() {
  if (!(this instanceof tr))
    return new tr();
  sn.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Ur.inherits(tr, sn), on.ripemd160 = tr, tr.blockSize = 512, tr.outSize = 160, tr.hmacStrength = 192, tr.padLength = 64, tr.prototype._update = function(t, r) {
  for (var e = this.h[0], n = this.h[1], f = this.h[2], s = this.h[3], d = this.h[4], v = e, w = n, g = f, y = s, M = d, B = 0; B < 80; B++) {
    var C = Mi(ae(Si(e, Ei(B, n, f, s), t[Is[B] + r], Es(B)), Ns[B]), d);
    e = d, d = s, s = ae(f, 10), f = n, n = C, C = Mi(ae(Si(v, Ei(79 - B, w, g, y), t[Cs[B] + r], Bs(B)), xs[B]), M), v = M, M = y, y = ae(g, 10), g = w, w = C;
  }
  C = Zr(this.h[1], f, y), this.h[1] = Zr(this.h[2], s, M), this.h[2] = Zr(this.h[3], d, v), this.h[3] = Zr(this.h[4], e, w), this.h[4] = Zr(this.h[0], n, g), this.h[0] = C;
}, tr.prototype._digest = function(t) {
  return t === "hex" ? Ur.toHex32(this.h, "little") : Ur.split32(this.h, "little");
};
function Ei(t, r, e, n) {
  return t <= 15 ? r ^ e ^ n : t <= 31 ? r & e | ~r & n : t <= 47 ? (r | ~e) ^ n : t <= 63 ? r & n | e & ~n : r ^ (e | ~n);
}
function Es(t) {
  return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838;
}
function Bs(t) {
  return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0;
}
var Is = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], Cs = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], Ns = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], xs = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11], Rs = Q, _s = ie;
function Lr(t, r, e) {
  if (!(this instanceof Lr))
    return new Lr(t, r, e);
  this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer = null, this._init(Rs.toArray(r, e));
}
var Ts = Lr;
Lr.prototype._init = function(t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()), _s(t.length <= this.blockSize);
  for (var r = t.length; r < this.blockSize; r++)
    t.push(0);
  for (r = 0; r < t.length; r++)
    t[r] ^= 54;
  for (this.inner = new this.Hash().update(t), r = 0; r < t.length; r++)
    t[r] ^= 106;
  this.outer = new this.Hash().update(t);
}, Lr.prototype.update = function(t, r) {
  return this.inner.update(t, r), this;
}, Lr.prototype.digest = function(t) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t);
}, function(t) {
  var r = t;
  r.utils = Q, r.common = Jr, r.sha = Pr, r.ripemd = on, r.hmac = Ts, r.sha1 = r.sha.sha1, r.sha256 = r.sha.sha256, r.sha224 = r.sha.sha224, r.sha384 = r.sha.sha384, r.sha512 = r.sha.sha512, r.ripemd160 = r.ripemd.ripemd160;
}($t);
function jr(t, r, e) {
  return e = { path: r, exports: {}, require: function(n, f) {
    return Fs(n, f ?? e.path);
  } }, t(e, e.exports), e.exports;
}
function Fs() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var ei = hn;
function hn(t, r) {
  if (!t)
    throw new Error(r || "Assertion failed");
}
hn.equal = function(t, r, e) {
  if (t != r)
    throw new Error(e || "Assertion failed: " + t + " != " + r);
};
var Vt = jr(function(t, r) {
  var e = r;
  function n(d, v) {
    if (Array.isArray(d))
      return d.slice();
    if (!d)
      return [];
    var w = [];
    if (typeof d != "string") {
      for (var g = 0; g < d.length; g++)
        w[g] = d[g] | 0;
      return w;
    }
    if (v === "hex") {
      d = d.replace(/[^a-z0-9]+/ig, ""), d.length % 2 !== 0 && (d = "0" + d);
      for (var g = 0; g < d.length; g += 2)
        w.push(parseInt(d[g] + d[g + 1], 16));
    } else
      for (var g = 0; g < d.length; g++) {
        var y = d.charCodeAt(g), M = y >> 8, B = y & 255;
        M ? w.push(M, B) : w.push(B);
      }
    return w;
  }
  e.toArray = n;
  function f(d) {
    return d.length === 1 ? "0" + d : d;
  }
  e.zero2 = f;
  function s(d) {
    for (var v = "", w = 0; w < d.length; w++)
      v += f(d[w].toString(16));
    return v;
  }
  e.toHex = s, e.encode = function(d, v) {
    return v === "hex" ? s(d) : d;
  };
}), Qt = jr(function(t, r) {
  var e = r;
  e.assert = ei, e.toArray = Vt.toArray, e.zero2 = Vt.zero2, e.toHex = Vt.toHex, e.encode = Vt.encode;
  function n(w, g, y) {
    var M = new Array(Math.max(w.bitLength(), y) + 1);
    M.fill(0);
    for (var B = 1 << g + 1, C = w.clone(), N = 0; N < M.length; N++) {
      var O, x = C.andln(B - 1);
      C.isOdd() ? (x > (B >> 1) - 1 ? O = (B >> 1) - x : O = x, C.isubn(O)) : O = 0, M[N] = O, C.iushrn(1);
    }
    return M;
  }
  e.getNAF = n;
  function f(w, g) {
    var y = [[], []];
    w = w.clone(), g = g.clone();
    for (var M = 0, B = 0, C; w.cmpn(-M) > 0 || g.cmpn(-B) > 0; ) {
      var N = w.andln(3) + M & 3, O = g.andln(3) + B & 3;
      N === 3 && (N = -1), O === 3 && (O = -1);
      var x;
      N & 1 ? (C = w.andln(7) + M & 7, (C === 3 || C === 5) && O === 2 ? x = -N : x = N) : x = 0, y[0].push(x);
      var q;
      O & 1 ? (C = g.andln(7) + B & 7, (C === 3 || C === 5) && N === 2 ? q = -O : q = O) : q = 0, y[1].push(q), 2 * M === x + 1 && (M = 1 - M), 2 * B === q + 1 && (B = 1 - B), w.iushrn(1), g.iushrn(1);
    }
    return y;
  }
  e.getJSF = f;
  function s(w, g, y) {
    var M = "_" + g;
    w.prototype[g] = function() {
      return this[M] !== void 0 ? this[M] : this[M] = y.call(this);
    };
  }
  e.cachedProperty = s;
  function d(w) {
    return typeof w == "string" ? e.toArray(w, "hex") : w;
  }
  e.parseBytes = d;
  function v(w) {
    return new z(w, "hex", "le");
  }
  e.intFromLE = v;
}), ue = Qt.getNAF, ks = Qt.getJSF, ve = Qt.assert;
function vr(t, r) {
  this.type = t, this.p = new z(r.p, 16), this.red = r.prime ? z.red(r.prime) : z.mont(this.p), this.zero = new z(0).toRed(this.red), this.one = new z(1).toRed(this.red), this.two = new z(2).toRed(this.red), this.n = r.n && new z(r.n, 16), this.g = r.g && this.pointFromJSON(r.g, r.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var e = this.n && this.p.div(this.n);
  !e || e.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var zr = vr;
vr.prototype.point = function() {
  throw new Error("Not implemented");
}, vr.prototype.validate = function() {
  throw new Error("Not implemented");
}, vr.prototype._fixedNafMul = function(t, r) {
  ve(t.precomputed);
  var e = t._getDoubles(), n = ue(r, 1, this._bitLength), f = (1 << e.step + 1) - (e.step % 2 === 0 ? 2 : 1);
  f /= 3;
  var s = [], d, v;
  for (d = 0; d < n.length; d += e.step) {
    v = 0;
    for (var w = d + e.step - 1; w >= d; w--)
      v = (v << 1) + n[w];
    s.push(v);
  }
  for (var g = this.jpoint(null, null, null), y = this.jpoint(null, null, null), M = f; M > 0; M--) {
    for (d = 0; d < s.length; d++)
      v = s[d], v === M ? y = y.mixedAdd(e.points[d]) : v === -M && (y = y.mixedAdd(e.points[d].neg()));
    g = g.add(y);
  }
  return g.toP();
}, vr.prototype._wnafMul = function(t, r) {
  var e = 4, n = t._getNAFPoints(e);
  e = n.wnd;
  for (var f = n.points, s = ue(r, e, this._bitLength), d = this.jpoint(null, null, null), v = s.length - 1; v >= 0; v--) {
    for (var w = 0; v >= 0 && s[v] === 0; v--)
      w++;
    if (v >= 0 && w++, d = d.dblp(w), v < 0)
      break;
    var g = s[v];
    ve(g !== 0), t.type === "affine" ? g > 0 ? d = d.mixedAdd(f[g - 1 >> 1]) : d = d.mixedAdd(f[-g - 1 >> 1].neg()) : g > 0 ? d = d.add(f[g - 1 >> 1]) : d = d.add(f[-g - 1 >> 1].neg());
  }
  return t.type === "affine" ? d.toP() : d;
}, vr.prototype._wnafMulAdd = function(t, r, e, n, f) {
  var s = this._wnafT1, d = this._wnafT2, v = this._wnafT3, w = 0, g, y, M;
  for (g = 0; g < n; g++) {
    M = r[g];
    var B = M._getNAFPoints(t);
    s[g] = B.wnd, d[g] = B.points;
  }
  for (g = n - 1; g >= 1; g -= 2) {
    var C = g - 1, N = g;
    if (s[C] !== 1 || s[N] !== 1) {
      v[C] = ue(e[C], s[C], this._bitLength), v[N] = ue(e[N], s[N], this._bitLength), w = Math.max(v[C].length, w), w = Math.max(v[N].length, w);
      continue;
    }
    var O = [r[C], null, null, r[N]];
    r[C].y.cmp(r[N].y) === 0 ? (O[1] = r[C].add(r[N]), O[2] = r[C].toJ().mixedAdd(r[N].neg())) : r[C].y.cmp(r[N].y.redNeg()) === 0 ? (O[1] = r[C].toJ().mixedAdd(r[N]), O[2] = r[C].add(r[N].neg())) : (O[1] = r[C].toJ().mixedAdd(r[N]), O[2] = r[C].toJ().mixedAdd(r[N].neg()));
    var x = [-3, -1, -5, -7, 0, 7, 5, 1, 3], q = ks(e[C], e[N]);
    for (w = Math.max(q[0].length, w), v[C] = new Array(w), v[N] = new Array(w), y = 0; y < w; y++) {
      var X = q[0][y] | 0, _t = q[1][y] | 0;
      v[C][y] = x[(X + 1) * 3 + (_t + 1)], v[N][y] = 0, d[C] = O;
    }
  }
  var J = this.jpoint(null, null, null), K = this._wnafT4;
  for (g = w; g >= 0; g--) {
    for (var H = 0; g >= 0; ) {
      var Tt = !0;
      for (y = 0; y < n; y++)
        K[y] = v[y][g] | 0, K[y] !== 0 && (Tt = !1);
      if (!Tt)
        break;
      H++, g--;
    }
    if (g >= 0 && H++, J = J.dblp(H), g < 0)
      break;
    for (y = 0; y < n; y++) {
      var Z = K[y];
      Z !== 0 && (Z > 0 ? M = d[y][Z - 1 >> 1] : Z < 0 && (M = d[y][-Z - 1 >> 1].neg()), M.type === "affine" ? J = J.mixedAdd(M) : J = J.add(M));
    }
  }
  for (g = 0; g < n; g++)
    d[g] = null;
  return f ? J : J.toP();
};
function Jt(t, r) {
  this.curve = t, this.type = r, this.precomputed = null;
}
vr.BasePoint = Jt, Jt.prototype.eq = function() {
  throw new Error("Not implemented");
}, Jt.prototype.validate = function() {
  return this.curve.validate(this);
}, vr.prototype.decodePoint = function(t, r) {
  t = Qt.toArray(t, r);
  var e = this.p.byteLength();
  if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * e) {
    t[0] === 6 ? ve(t[t.length - 1] % 2 === 0) : t[0] === 7 && ve(t[t.length - 1] % 2 === 1);
    var n = this.point(t.slice(1, 1 + e), t.slice(1 + e, 1 + 2 * e));
    return n;
  } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === e)
    return this.pointFromX(t.slice(1, 1 + e), t[0] === 3);
  throw new Error("Unknown point format");
}, Jt.prototype.encodeCompressed = function(t) {
  return this.encode(t, !0);
}, Jt.prototype._encode = function(t) {
  var r = this.curve.p.byteLength(), e = this.getX().toArray("be", r);
  return t ? [this.getY().isEven() ? 2 : 3].concat(e) : [4].concat(e, this.getY().toArray("be", r));
}, Jt.prototype.encode = function(t, r) {
  return Qt.encode(this._encode(r), t);
}, Jt.prototype.precompute = function(t) {
  if (this.precomputed)
    return this;
  var r = { doubles: null, naf: null, beta: null };
  return r.naf = this._getNAFPoints(8), r.doubles = this._getDoubles(4, t), r.beta = this._getBeta(), this.precomputed = r, this;
}, Jt.prototype._hasDoubles = function(t) {
  if (!this.precomputed)
    return !1;
  var r = this.precomputed.doubles;
  return r ? r.points.length >= Math.ceil((t.bitLength() + 1) / r.step) : !1;
}, Jt.prototype._getDoubles = function(t, r) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var e = [this], n = this, f = 0; f < r; f += t) {
    for (var s = 0; s < t; s++)
      n = n.dbl();
    e.push(n);
  }
  return { step: t, points: e };
}, Jt.prototype._getNAFPoints = function(t) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var r = [this], e = (1 << t) - 1, n = e === 1 ? null : this.dbl(), f = 1; f < e; f++)
    r[f] = r[f - 1].add(n);
  return { wnd: t, points: r };
}, Jt.prototype._getBeta = function() {
  return null;
}, Jt.prototype.dblp = function(t) {
  for (var r = this, e = 0; e < t; e++)
    r = r.dbl();
  return r;
};
var ii = jr(function(t) {
  typeof Object.create == "function" ? t.exports = function(r, e) {
    e && (r.super_ = e, r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }));
  } : t.exports = function(r, e) {
    if (e) {
      r.super_ = e;
      var n = function() {
      };
      n.prototype = e.prototype, r.prototype = new n(), r.prototype.constructor = r;
    }
  };
}), Os = Qt.assert;
function jt(t) {
  zr.call(this, "short", t), this.a = new z(t.a, 16).toRed(this.red), this.b = new z(t.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(t), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
ii(jt, zr);
var Us = jt;
jt.prototype._getEndomorphism = function(t) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var r, e;
    if (t.beta)
      r = new z(t.beta, 16).toRed(this.red);
    else {
      var n = this._getEndoRoots(this.p);
      r = n[0].cmp(n[1]) < 0 ? n[0] : n[1], r = r.toRed(this.red);
    }
    if (t.lambda)
      e = new z(t.lambda, 16);
    else {
      var f = this._getEndoRoots(this.n);
      this.g.mul(f[0]).x.cmp(this.g.x.redMul(r)) === 0 ? e = f[0] : (e = f[1], Os(this.g.mul(e).x.cmp(this.g.x.redMul(r)) === 0));
    }
    var s;
    return t.basis ? s = t.basis.map(function(d) {
      return { a: new z(d.a, 16), b: new z(d.b, 16) };
    }) : s = this._getEndoBasis(e), { beta: r, lambda: e, basis: s };
  }
}, jt.prototype._getEndoRoots = function(t) {
  var r = t === this.p ? this.red : z.mont(t), e = new z(2).toRed(r).redInvm(), n = e.redNeg(), f = new z(3).toRed(r).redNeg().redSqrt().redMul(e), s = n.redAdd(f).fromRed(), d = n.redSub(f).fromRed();
  return [s, d];
}, jt.prototype._getEndoBasis = function(t) {
  for (var r = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), e = t, n = this.n.clone(), f = new z(1), s = new z(0), d = new z(0), v = new z(1), w, g, y, M, B, C, N, O = 0, x, q; e.cmpn(0) !== 0; ) {
    var X = n.div(e);
    x = n.sub(X.mul(e)), q = d.sub(X.mul(f));
    var _t = v.sub(X.mul(s));
    if (!y && x.cmp(r) < 0)
      w = N.neg(), g = f, y = x.neg(), M = q;
    else if (y && ++O === 2)
      break;
    N = x, n = e, e = x, d = f, f = q, v = s, s = _t;
  }
  B = x.neg(), C = q;
  var J = y.sqr().add(M.sqr()), K = B.sqr().add(C.sqr());
  return K.cmp(J) >= 0 && (B = w, C = g), y.negative && (y = y.neg(), M = M.neg()), B.negative && (B = B.neg(), C = C.neg()), [{ a: y, b: M }, { a: B, b: C }];
}, jt.prototype._endoSplit = function(t) {
  var r = this.endo.basis, e = r[0], n = r[1], f = n.b.mul(t).divRound(this.n), s = e.b.neg().mul(t).divRound(this.n), d = f.mul(e.a), v = s.mul(n.a), w = f.mul(e.b), g = s.mul(n.b), y = t.sub(d).sub(v), M = w.add(g).neg();
  return { k1: y, k2: M };
}, jt.prototype.pointFromX = function(t, r) {
  t = new z(t, 16), t.red || (t = t.toRed(this.red));
  var e = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), n = e.redSqrt();
  if (n.redSqr().redSub(e).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var f = n.fromRed().isOdd();
  return (r && !f || !r && f) && (n = n.redNeg()), this.point(t, n);
}, jt.prototype.validate = function(t) {
  if (t.inf)
    return !0;
  var r = t.x, e = t.y, n = this.a.redMul(r), f = r.redSqr().redMul(r).redIAdd(n).redIAdd(this.b);
  return e.redSqr().redISub(f).cmpn(0) === 0;
}, jt.prototype._endoWnafMulAdd = function(t, r, e) {
  for (var n = this._endoWnafT1, f = this._endoWnafT2, s = 0; s < t.length; s++) {
    var d = this._endoSplit(r[s]), v = t[s], w = v._getBeta();
    d.k1.negative && (d.k1.ineg(), v = v.neg(!0)), d.k2.negative && (d.k2.ineg(), w = w.neg(!0)), n[s * 2] = v, n[s * 2 + 1] = w, f[s * 2] = d.k1, f[s * 2 + 1] = d.k2;
  }
  for (var g = this._wnafMulAdd(1, n, f, s * 2, e), y = 0; y < s * 2; y++)
    n[y] = null, f[y] = null;
  return g;
};
function Ft(t, r, e, n) {
  zr.BasePoint.call(this, t, "affine"), r === null && e === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new z(r, 16), this.y = new z(e, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
ii(Ft, zr.BasePoint), jt.prototype.point = function(t, r, e) {
  return new Ft(this, t, r, e);
}, jt.prototype.pointFromJSON = function(t, r) {
  return Ft.fromJSON(this, t, r);
}, Ft.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t = this.precomputed;
    if (t && t.beta)
      return t.beta;
    var r = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t) {
      var e = this.curve, n = function(f) {
        return e.point(f.x.redMul(e.endo.beta), f.y);
      };
      t.beta = r, r.precomputed = { beta: null, naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(n) }, doubles: t.doubles && { step: t.doubles.step, points: t.doubles.points.map(n) } };
    }
    return r;
  }
}, Ft.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && { doubles: this.precomputed.doubles && { step: this.precomputed.doubles.step, points: this.precomputed.doubles.points.slice(1) }, naf: this.precomputed.naf && { wnd: this.precomputed.naf.wnd, points: this.precomputed.naf.points.slice(1) } }] : [this.x, this.y];
}, Ft.fromJSON = function(t, r, e) {
  typeof r == "string" && (r = JSON.parse(r));
  var n = t.point(r[0], r[1], e);
  if (!r[2])
    return n;
  function f(d) {
    return t.point(d[0], d[1], e);
  }
  var s = r[2];
  return n.precomputed = { beta: null, doubles: s.doubles && { step: s.doubles.step, points: [n].concat(s.doubles.points.map(f)) }, naf: s.naf && { wnd: s.naf.wnd, points: [n].concat(s.naf.points.map(f)) } }, n;
}, Ft.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
}, Ft.prototype.isInfinity = function() {
  return this.inf;
}, Ft.prototype.add = function(t) {
  if (this.inf)
    return t;
  if (t.inf)
    return this;
  if (this.eq(t))
    return this.dbl();
  if (this.neg().eq(t))
    return this.curve.point(null, null);
  if (this.x.cmp(t.x) === 0)
    return this.curve.point(null, null);
  var r = this.y.redSub(t.y);
  r.cmpn(0) !== 0 && (r = r.redMul(this.x.redSub(t.x).redInvm()));
  var e = r.redSqr().redISub(this.x).redISub(t.x), n = r.redMul(this.x.redSub(e)).redISub(this.y);
  return this.curve.point(e, n);
}, Ft.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t = this.y.redAdd(this.y);
  if (t.cmpn(0) === 0)
    return this.curve.point(null, null);
  var r = this.curve.a, e = this.x.redSqr(), n = t.redInvm(), f = e.redAdd(e).redIAdd(e).redIAdd(r).redMul(n), s = f.redSqr().redISub(this.x.redAdd(this.x)), d = f.redMul(this.x.redSub(s)).redISub(this.y);
  return this.curve.point(s, d);
}, Ft.prototype.getX = function() {
  return this.x.fromRed();
}, Ft.prototype.getY = function() {
  return this.y.fromRed();
}, Ft.prototype.mul = function(t) {
  return t = new z(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t);
}, Ft.prototype.mulAdd = function(t, r, e) {
  var n = [this, r], f = [t, e];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, f) : this.curve._wnafMulAdd(1, n, f, 2);
}, Ft.prototype.jmulAdd = function(t, r, e) {
  var n = [this, r], f = [t, e];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, f, !0) : this.curve._wnafMulAdd(1, n, f, 2, !0);
}, Ft.prototype.eq = function(t) {
  return this === t || this.inf === t.inf && (this.inf || this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0);
}, Ft.prototype.neg = function(t) {
  if (this.inf)
    return this;
  var r = this.curve.point(this.x, this.y.redNeg());
  if (t && this.precomputed) {
    var e = this.precomputed, n = function(f) {
      return f.neg();
    };
    r.precomputed = { naf: e.naf && { wnd: e.naf.wnd, points: e.naf.points.map(n) }, doubles: e.doubles && { step: e.doubles.step, points: e.doubles.points.map(n) } };
  }
  return r;
}, Ft.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t;
};
function kt(t, r, e, n) {
  zr.BasePoint.call(this, t, "jacobian"), r === null && e === null && n === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new z(0)) : (this.x = new z(r, 16), this.y = new z(e, 16), this.z = new z(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
ii(kt, zr.BasePoint), jt.prototype.jpoint = function(t, r, e) {
  return new kt(this, t, r, e);
}, kt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t = this.z.redInvm(), r = t.redSqr(), e = this.x.redMul(r), n = this.y.redMul(r).redMul(t);
  return this.curve.point(e, n);
}, kt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
}, kt.prototype.add = function(t) {
  if (this.isInfinity())
    return t;
  if (t.isInfinity())
    return this;
  var r = t.z.redSqr(), e = this.z.redSqr(), n = this.x.redMul(r), f = t.x.redMul(e), s = this.y.redMul(r.redMul(t.z)), d = t.y.redMul(e.redMul(this.z)), v = n.redSub(f), w = s.redSub(d);
  if (v.cmpn(0) === 0)
    return w.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var g = v.redSqr(), y = g.redMul(v), M = n.redMul(g), B = w.redSqr().redIAdd(y).redISub(M).redISub(M), C = w.redMul(M.redISub(B)).redISub(s.redMul(y)), N = this.z.redMul(t.z).redMul(v);
  return this.curve.jpoint(B, C, N);
}, kt.prototype.mixedAdd = function(t) {
  if (this.isInfinity())
    return t.toJ();
  if (t.isInfinity())
    return this;
  var r = this.z.redSqr(), e = this.x, n = t.x.redMul(r), f = this.y, s = t.y.redMul(r).redMul(this.z), d = e.redSub(n), v = f.redSub(s);
  if (d.cmpn(0) === 0)
    return v.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var w = d.redSqr(), g = w.redMul(d), y = e.redMul(w), M = v.redSqr().redIAdd(g).redISub(y).redISub(y), B = v.redMul(y.redISub(M)).redISub(f.redMul(g)), C = this.z.redMul(d);
  return this.curve.jpoint(M, B, C);
}, kt.prototype.dblp = function(t) {
  if (t === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t)
    return this.dbl();
  var r;
  if (this.curve.zeroA || this.curve.threeA) {
    var e = this;
    for (r = 0; r < t; r++)
      e = e.dbl();
    return e;
  }
  var n = this.curve.a, f = this.curve.tinv, s = this.x, d = this.y, v = this.z, w = v.redSqr().redSqr(), g = d.redAdd(d);
  for (r = 0; r < t; r++) {
    var y = s.redSqr(), M = g.redSqr(), B = M.redSqr(), C = y.redAdd(y).redIAdd(y).redIAdd(n.redMul(w)), N = s.redMul(M), O = C.redSqr().redISub(N.redAdd(N)), x = N.redISub(O), q = C.redMul(x);
    q = q.redIAdd(q).redISub(B);
    var X = g.redMul(v);
    r + 1 < t && (w = w.redMul(B)), s = O, v = X, g = q;
  }
  return this.curve.jpoint(s, g.redMul(f), v);
}, kt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
}, kt.prototype._zeroDbl = function() {
  var t, r, e;
  if (this.zOne) {
    var n = this.x.redSqr(), f = this.y.redSqr(), s = f.redSqr(), d = this.x.redAdd(f).redSqr().redISub(n).redISub(s);
    d = d.redIAdd(d);
    var v = n.redAdd(n).redIAdd(n), w = v.redSqr().redISub(d).redISub(d), g = s.redIAdd(s);
    g = g.redIAdd(g), g = g.redIAdd(g), t = w, r = v.redMul(d.redISub(w)).redISub(g), e = this.y.redAdd(this.y);
  } else {
    var y = this.x.redSqr(), M = this.y.redSqr(), B = M.redSqr(), C = this.x.redAdd(M).redSqr().redISub(y).redISub(B);
    C = C.redIAdd(C);
    var N = y.redAdd(y).redIAdd(y), O = N.redSqr(), x = B.redIAdd(B);
    x = x.redIAdd(x), x = x.redIAdd(x), t = O.redISub(C).redISub(C), r = N.redMul(C.redISub(t)).redISub(x), e = this.y.redMul(this.z), e = e.redIAdd(e);
  }
  return this.curve.jpoint(t, r, e);
}, kt.prototype._threeDbl = function() {
  var t, r, e;
  if (this.zOne) {
    var n = this.x.redSqr(), f = this.y.redSqr(), s = f.redSqr(), d = this.x.redAdd(f).redSqr().redISub(n).redISub(s);
    d = d.redIAdd(d);
    var v = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), w = v.redSqr().redISub(d).redISub(d);
    t = w;
    var g = s.redIAdd(s);
    g = g.redIAdd(g), g = g.redIAdd(g), r = v.redMul(d.redISub(w)).redISub(g), e = this.y.redAdd(this.y);
  } else {
    var y = this.z.redSqr(), M = this.y.redSqr(), B = this.x.redMul(M), C = this.x.redSub(y).redMul(this.x.redAdd(y));
    C = C.redAdd(C).redIAdd(C);
    var N = B.redIAdd(B);
    N = N.redIAdd(N);
    var O = N.redAdd(N);
    t = C.redSqr().redISub(O), e = this.y.redAdd(this.z).redSqr().redISub(M).redISub(y);
    var x = M.redSqr();
    x = x.redIAdd(x), x = x.redIAdd(x), x = x.redIAdd(x), r = C.redMul(N.redISub(t)).redISub(x);
  }
  return this.curve.jpoint(t, r, e);
}, kt.prototype._dbl = function() {
  var t = this.curve.a, r = this.x, e = this.y, n = this.z, f = n.redSqr().redSqr(), s = r.redSqr(), d = e.redSqr(), v = s.redAdd(s).redIAdd(s).redIAdd(t.redMul(f)), w = r.redAdd(r);
  w = w.redIAdd(w);
  var g = w.redMul(d), y = v.redSqr().redISub(g.redAdd(g)), M = g.redISub(y), B = d.redSqr();
  B = B.redIAdd(B), B = B.redIAdd(B), B = B.redIAdd(B);
  var C = v.redMul(M).redISub(B), N = e.redAdd(e).redMul(n);
  return this.curve.jpoint(y, C, N);
}, kt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t = this.x.redSqr(), r = this.y.redSqr(), e = this.z.redSqr(), n = r.redSqr(), f = t.redAdd(t).redIAdd(t), s = f.redSqr(), d = this.x.redAdd(r).redSqr().redISub(t).redISub(n);
  d = d.redIAdd(d), d = d.redAdd(d).redIAdd(d), d = d.redISub(s);
  var v = d.redSqr(), w = n.redIAdd(n);
  w = w.redIAdd(w), w = w.redIAdd(w), w = w.redIAdd(w);
  var g = f.redIAdd(d).redSqr().redISub(s).redISub(v).redISub(w), y = r.redMul(g);
  y = y.redIAdd(y), y = y.redIAdd(y);
  var M = this.x.redMul(v).redISub(y);
  M = M.redIAdd(M), M = M.redIAdd(M);
  var B = this.y.redMul(g.redMul(w.redISub(g)).redISub(d.redMul(v)));
  B = B.redIAdd(B), B = B.redIAdd(B), B = B.redIAdd(B);
  var C = this.z.redAdd(d).redSqr().redISub(e).redISub(v);
  return this.curve.jpoint(M, B, C);
}, kt.prototype.mul = function(t, r) {
  return t = new z(t, r), this.curve._wnafMul(this, t);
}, kt.prototype.eq = function(t) {
  if (t.type === "affine")
    return this.eq(t.toJ());
  if (this === t)
    return !0;
  var r = this.z.redSqr(), e = t.z.redSqr();
  if (this.x.redMul(e).redISub(t.x.redMul(r)).cmpn(0) !== 0)
    return !1;
  var n = r.redMul(this.z), f = e.redMul(t.z);
  return this.y.redMul(f).redISub(t.y.redMul(n)).cmpn(0) === 0;
}, kt.prototype.eqXToP = function(t) {
  var r = this.z.redSqr(), e = t.toRed(this.curve.red).redMul(r);
  if (this.x.cmp(e) === 0)
    return !0;
  for (var n = t.clone(), f = this.curve.redN.redMul(r); ; ) {
    if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
      return !1;
    if (e.redIAdd(f), this.x.cmp(e) === 0)
      return !0;
  }
}, kt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
}, kt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var pe = jr(function(t, r) {
  var e = r;
  e.base = zr, e.short = Us, e.mont = null, e.edwards = null;
}), me = jr(function(t, r) {
  var e = r, n = Qt.assert;
  function f(v) {
    v.type === "short" ? this.curve = new pe.short(v) : v.type === "edwards" ? this.curve = new pe.edwards(v) : this.curve = new pe.mont(v), this.g = this.curve.g, this.n = this.curve.n, this.hash = v.hash, n(this.g.validate(), "Invalid curve"), n(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  e.PresetCurve = f;
  function s(v, w) {
    Object.defineProperty(e, v, { configurable: !0, enumerable: !0, get: function() {
      var g = new f(w);
      return Object.defineProperty(e, v, { configurable: !0, enumerable: !0, value: g }), g;
    } });
  }
  s("p192", { type: "short", prime: "p192", p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff", a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc", b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1", n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831", hash: $t.sha256, gRed: !1, g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"] }), s("p224", { type: "short", prime: "p224", p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001", a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe", b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4", n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d", hash: $t.sha256, gRed: !1, g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"] }), s("p256", { type: "short", prime: null, p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff", a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc", b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b", n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551", hash: $t.sha256, gRed: !1, g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"] }), s("p384", { type: "short", prime: null, p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff", a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc", b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef", n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973", hash: $t.sha384, gRed: !1, g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"] }), s("p521", { type: "short", prime: null, p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff", a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc", b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00", n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409", hash: $t.sha512, gRed: !1, g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"] }), s("curve25519", { type: "mont", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "76d06", b: "1", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: $t.sha256, gRed: !1, g: ["9"] }), s("ed25519", { type: "edwards", prime: "p25519", p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed", a: "-1", c: "1", d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3", n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed", hash: $t.sha256, gRed: !1, g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"] });
  var d;
  try {
    d = null.crash();
  } catch {
    d = void 0;
  }
  s("secp256k1", { type: "short", prime: "k256", p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f", a: "0", b: "7", n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141", h: "1", hash: $t.sha256, beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee", lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72", basis: [{ a: "3086d221a7d46bcde86c90e49284eb15", b: "-e4437ed6010e88286f547fa90abfe4c3" }, { a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15" }], gRed: !1, g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", d] });
});
function wr(t) {
  if (!(this instanceof wr))
    return new wr(t);
  this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var r = Vt.toArray(t.entropy, t.entropyEnc || "hex"), e = Vt.toArray(t.nonce, t.nonceEnc || "hex"), n = Vt.toArray(t.pers, t.persEnc || "hex");
  ei(r.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(r, e, n);
}
var Bi = wr;
wr.prototype._init = function(t, r, e) {
  var n = t.concat(r).concat(e);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var f = 0; f < this.V.length; f++)
    this.K[f] = 0, this.V[f] = 1;
  this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656;
}, wr.prototype._hmac = function() {
  return new $t.hmac(this.hash, this.K);
}, wr.prototype._update = function(t) {
  var r = this._hmac().update(this.V).update([0]);
  t && (r = r.update(t)), this.K = r.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
}, wr.prototype.reseed = function(t, r, e, n) {
  typeof r != "string" && (n = e, e = r, r = null), t = Vt.toArray(t, r), e = Vt.toArray(e, n), ei(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(e || [])), this._reseed = 1;
}, wr.prototype.generate = function(t, r, e, n) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof r != "string" && (n = e, e = r, r = null), e && (e = Vt.toArray(e, n || "hex"), this._update(e));
  for (var f = []; f.length < t; )
    this.V = this._hmac().update(this.V).digest(), f = f.concat(this.V);
  var s = f.slice(0, t);
  return this._update(e), this._reseed++, Vt.encode(s, r);
};
var Qe = Qt.assert;
function Dt(t, r) {
  this.ec = t, this.priv = null, this.pub = null, r.priv && this._importPrivate(r.priv, r.privEnc), r.pub && this._importPublic(r.pub, r.pubEnc);
}
var He = Dt;
Dt.fromPublic = function(t, r, e) {
  return r instanceof Dt ? r : new Dt(t, { pub: r, pubEnc: e });
}, Dt.fromPrivate = function(t, r, e) {
  return r instanceof Dt ? r : new Dt(t, { priv: r, privEnc: e });
}, Dt.prototype.validate = function() {
  var t = this.getPublic();
  return t.isInfinity() ? { result: !1, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
}, Dt.prototype.getPublic = function(t, r) {
  return typeof t == "string" && (r = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), r ? this.pub.encode(r, t) : this.pub;
}, Dt.prototype.getPrivate = function(t) {
  return t === "hex" ? this.priv.toString(16, 2) : this.priv;
}, Dt.prototype._importPrivate = function(t, r) {
  this.priv = new z(t, r || 16), this.priv = this.priv.umod(this.ec.curve.n);
}, Dt.prototype._importPublic = function(t, r) {
  if (t.x || t.y) {
    this.ec.curve.type === "mont" ? Qe(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && Qe(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t, r);
}, Dt.prototype.derive = function(t) {
  return t.validate() || Qe(t.validate(), "public point not validated"), t.mul(this.priv).getX();
}, Dt.prototype.sign = function(t, r, e) {
  return this.ec.sign(t, this, r, e);
}, Dt.prototype.verify = function(t, r) {
  return this.ec.verify(t, r, this);
}, Dt.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Ds = Qt.assert;
function we(t, r) {
  if (t instanceof we)
    return t;
  this._importDER(t, r) || (Ds(t.r && t.s, "Signature without r or s"), this.r = new z(t.r, 16), this.s = new z(t.s, 16), t.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam);
}
var le = we;
function zs() {
  this.place = 0;
}
function Ye(t, r) {
  var e = t[r.place++];
  if (!(e & 128))
    return e;
  var n = e & 15;
  if (n === 0 || n > 4)
    return !1;
  for (var f = 0, s = 0, d = r.place; s < n; s++, d++)
    f <<= 8, f |= t[d], f >>>= 0;
  return f <= 127 ? !1 : (r.place = d, f);
}
function Ii(t) {
  for (var r = 0, e = t.length - 1; !t[r] && !(t[r + 1] & 128) && r < e; )
    r++;
  return r === 0 ? t : t.slice(r);
}
we.prototype._importDER = function(t, r) {
  t = Qt.toArray(t, r);
  var e = new zs();
  if (t[e.place++] !== 48)
    return !1;
  var n = Ye(t, e);
  if (n === !1 || n + e.place !== t.length || t[e.place++] !== 2)
    return !1;
  var f = Ye(t, e);
  if (f === !1)
    return !1;
  var s = t.slice(e.place, f + e.place);
  if (e.place += f, t[e.place++] !== 2)
    return !1;
  var d = Ye(t, e);
  if (d === !1 || t.length !== d + e.place)
    return !1;
  var v = t.slice(e.place, d + e.place);
  if (s[0] === 0)
    if (s[1] & 128)
      s = s.slice(1);
    else
      return !1;
  if (v[0] === 0)
    if (v[1] & 128)
      v = v.slice(1);
    else
      return !1;
  return this.r = new z(s), this.s = new z(v), this.recoveryParam = null, !0;
};
function Ke(t, r) {
  if (r < 128) {
    t.push(r);
    return;
  }
  var e = 1 + (Math.log(r) / Math.LN2 >>> 3);
  for (t.push(e | 128); --e; )
    t.push(r >>> (e << 3) & 255);
  t.push(r);
}
we.prototype.toDER = function(t) {
  var r = this.r.toArray(), e = this.s.toArray();
  for (r[0] & 128 && (r = [0].concat(r)), e[0] & 128 && (e = [0].concat(e)), r = Ii(r), e = Ii(e); !e[0] && !(e[1] & 128); )
    e = e.slice(1);
  var n = [2];
  Ke(n, r.length), n = n.concat(r), n.push(2), Ke(n, e.length);
  var f = n.concat(e), s = [48];
  return Ke(s, f.length), s = s.concat(f), Qt.encode(s, t);
};
var Ps = function() {
  throw new Error("unsupported");
}, fn = Qt.assert;
function Gt(t) {
  if (!(this instanceof Gt))
    return new Gt(t);
  typeof t == "string" && (fn(Object.prototype.hasOwnProperty.call(me, t), "Unknown curve " + t), t = me[t]), t instanceof me.PresetCurve && (t = { curve: t }), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash;
}
var qs = Gt;
Gt.prototype.keyPair = function(t) {
  return new He(this, t);
}, Gt.prototype.keyFromPrivate = function(t, r) {
  return He.fromPrivate(this, t, r);
}, Gt.prototype.keyFromPublic = function(t, r) {
  return He.fromPublic(this, t, r);
}, Gt.prototype.genKeyPair = function(t) {
  t || (t = {});
  for (var r = new Bi({ hash: this.hash, pers: t.pers, persEnc: t.persEnc || "utf8", entropy: t.entropy || Ps(this.hash.hmacStrength), entropyEnc: t.entropy && t.entropyEnc || "utf8", nonce: this.n.toArray() }), e = this.n.byteLength(), n = this.n.sub(new z(2)); ; ) {
    var f = new z(r.generate(e));
    if (!(f.cmp(n) > 0))
      return f.iaddn(1), this.keyFromPrivate(f);
  }
}, Gt.prototype._truncateToN = function(t, r) {
  var e = t.byteLength() * 8 - this.n.bitLength();
  return e > 0 && (t = t.ushrn(e)), !r && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
}, Gt.prototype.sign = function(t, r, e, n) {
  typeof e == "object" && (n = e, e = null), n || (n = {}), r = this.keyFromPrivate(r, e), t = this._truncateToN(new z(t, 16));
  for (var f = this.n.byteLength(), s = r.getPrivate().toArray("be", f), d = t.toArray("be", f), v = new Bi({ hash: this.hash, entropy: s, nonce: d, pers: n.pers, persEnc: n.persEnc || "utf8" }), w = this.n.sub(new z(1)), g = 0; ; g++) {
    var y = n.k ? n.k(g) : new z(v.generate(this.n.byteLength()));
    if (y = this._truncateToN(y, !0), !(y.cmpn(1) <= 0 || y.cmp(w) >= 0)) {
      var M = this.g.mul(y);
      if (!M.isInfinity()) {
        var B = M.getX(), C = B.umod(this.n);
        if (C.cmpn(0) !== 0) {
          var N = y.invm(this.n).mul(C.mul(r.getPrivate()).iadd(t));
          if (N = N.umod(this.n), N.cmpn(0) !== 0) {
            var O = (M.getY().isOdd() ? 1 : 0) | (B.cmp(C) !== 0 ? 2 : 0);
            return n.canonical && N.cmp(this.nh) > 0 && (N = this.n.sub(N), O ^= 1), new le({ r: C, s: N, recoveryParam: O });
          }
        }
      }
    }
  }
}, Gt.prototype.verify = function(t, r, e, n) {
  t = this._truncateToN(new z(t, 16)), e = this.keyFromPublic(e, n), r = new le(r, "hex");
  var f = r.r, s = r.s;
  if (f.cmpn(1) < 0 || f.cmp(this.n) >= 0 || s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return !1;
  var d = s.invm(this.n), v = d.mul(t).umod(this.n), w = d.mul(f).umod(this.n), g;
  return this.curve._maxwellTrick ? (g = this.g.jmulAdd(v, e.getPublic(), w), g.isInfinity() ? !1 : g.eqXToP(f)) : (g = this.g.mulAdd(v, e.getPublic(), w), g.isInfinity() ? !1 : g.getX().umod(this.n).cmp(f) === 0);
}, Gt.prototype.recoverPubKey = function(t, r, e, n) {
  fn((3 & e) === e, "The recovery param is more than two bits"), r = new le(r, n);
  var f = this.n, s = new z(t), d = r.r, v = r.s, w = e & 1, g = e >> 1;
  if (d.cmp(this.curve.p.umod(this.curve.n)) >= 0 && g)
    throw new Error("Unable to find sencond key candinate");
  g ? d = this.curve.pointFromX(d.add(this.curve.n), w) : d = this.curve.pointFromX(d, w);
  var y = r.r.invm(f), M = f.sub(s).mul(y).umod(f), B = v.mul(y).umod(f);
  return this.g.mulAdd(M, d, B);
}, Gt.prototype.getKeyRecoveryParam = function(t, r, e, n) {
  if (r = new le(r, n), r.recoveryParam !== null)
    return r.recoveryParam;
  for (var f = 0; f < 4; f++) {
    var s;
    try {
      s = this.recoverPubKey(t, r, f);
    } catch {
      continue;
    }
    if (s.eq(e))
      return f;
  }
  throw new Error("Unable to find valid recovery factor");
};
var Ls = jr(function(t, r) {
  var e = r;
  e.version = "6.5.4", e.utils = Qt, e.rand = function() {
    throw new Error("unsupported");
  }, e.curve = pe, e.curves = me, e.ec = qs, e.eddsa = null;
});
Ls.ec;
var Ci;
(function(t) {
  t[t.legacy = 0] = "legacy", t[t.eip2930 = 1] = "eip2930", t[t.eip1559 = 2] = "eip1559";
})(Ci || (Ci = {}));
const Qs = "did:pkh:", an = (t) => t == null ? void 0 : t.split(":"), Js = (t) => {
  const r = t && an(t);
  if (r)
    return t.includes(Qs) ? r[3] : r[1];
}, Gs = (t) => {
  const r = t && an(t);
  if (r)
    return r.pop();
}, Lt = ln({
  status: "uninitialized"
}), Vr = {
  state: Lt,
  subscribeKey(t, r) {
    return dn(Lt, t, r);
  },
  subscribe(t) {
    return cn(Lt, () => t(Lt));
  },
  _getClient() {
    if (!Lt._client)
      throw new Error("SIWEController client not set");
    return Lt._client;
  },
  async getNonce(t) {
    const e = await this._getClient().getNonce(t);
    return this.setNonce(e), e;
  },
  async getSession() {
    try {
      const r = await this._getClient().getSession();
      return r && (this.setSession(r), this.setStatus("success")), r;
    } catch {
      return;
    }
  },
  createMessage(t) {
    const e = this._getClient().createMessage(t);
    return this.setMessage(e), e;
  },
  async verifyMessage(t) {
    return await this._getClient().verifyMessage(t);
  },
  async signIn() {
    return await this._getClient().signIn();
  },
  async signOut() {
    var r;
    const t = this._getClient();
    await t.signOut(), this.setStatus("ready"), this.setSession(void 0), (r = t.onSignOut) == null || r.call(t);
  },
  onSignIn(t) {
    var e;
    const r = this._getClient();
    (e = r.onSignIn) == null || e.call(r, t);
  },
  onSignOut() {
    var r;
    const t = this._getClient();
    (r = t.onSignOut) == null || r.call(t);
  },
  setSIWEClient(t) {
    Lt._client = pn(t), Lt.status = "ready", $e.setIsSiweEnabled(t.options.enabled);
  },
  setNonce(t) {
    Lt.nonce = t;
  },
  setStatus(t) {
    Lt.status = t;
  },
  setMessage(t) {
    Lt.message = t;
  },
  setSession(t) {
    Lt.session = t, Lt.status = t ? "success" : "ready";
  }
}, Hs = mn`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;
var Ys = function(t, r, e, n) {
  var f = arguments.length, s = f < 3 ? r : n === null ? n = Object.getOwnPropertyDescriptor(r, e) : n, d;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    s = Reflect.decorate(t, r, e, n);
  else
    for (var v = t.length - 1; v >= 0; v--)
      (d = t[v]) && (s = (f < 3 ? d(s) : f > 3 ? d(r, e, s) : d(r, e)) || s);
  return f > 3 && s && Object.defineProperty(r, e, s), s;
};
let Ze = class extends xi {
  constructor() {
    var r;
    super(...arguments), this.dappImageUrl = (r = $e.state.metadata) == null ? void 0 : r.icons, this.walletImageUrl = gn.getConnectedWalletImageUrl();
  }
  firstUpdated() {
    var e;
    const r = (e = this.shadowRoot) == null ? void 0 : e.querySelectorAll("wui-visual-thumbnail");
    r != null && r[0] && this.createAnimation(r[0], "translate(18px)"), r != null && r[1] && this.createAnimation(r[1], "translate(-18px)");
  }
  render() {
    var r;
    return Ri`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${(r = this.dappImageUrl) == null ? void 0 : r[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
  }
  createAnimation(r, e) {
    r.animate([{ transform: "translateX(0px)" }, { transform: e }], {
      duration: 1600,
      easing: "cubic-bezier(0.56, 0, 0.48, 1)",
      direction: "alternate",
      iterations: 1 / 0
    });
  }
};
Ze.styles = Hs;
Ze = Ys([
  Ni("w3m-connecting-siwe")
], Ze);
var un = function(t, r, e, n) {
  var f = arguments.length, s = f < 3 ? r : n === null ? n = Object.getOwnPropertyDescriptor(r, e) : n, d;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    s = Reflect.decorate(t, r, e, n);
  else
    for (var v = t.length - 1; v >= 0; v--)
      (d = t[v]) && (s = (f < 3 ? d(s) : f > 3 ? d(r, e, s) : d(r, e)) || s);
  return f > 3 && s && Object.defineProperty(r, e, s), s;
};
let Ve = class extends xi {
  constructor() {
    var r;
    super(...arguments), this.dappName = (r = $e.state.metadata) == null ? void 0 : r.name, this.isSigning = !1;
  }
  render() {
    return this.onRender(), Ri`
      <wui-flex justifyContent="center" .padding=${["2xl", "0", "xxl", "0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0", "4xl", "l", "4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName ?? "Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0", "3xl", "l", "3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l", "xl", "xl", "xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning ? "Signing..." : "Sign"}
        </wui-button>
      </wui-flex>
    `;
  }
  onRender() {
    Vr.state.session && oi.close();
  }
  async onSign() {
    var r, e, n;
    this.isSigning = !0, ne.sendEvent({
      event: "CLICK_SIGN_SIWE_MESSAGE",
      type: "track",
      properties: {
        network: ((r = oe.state.caipNetwork) == null ? void 0 : r.id) || "",
        isSmartAccount: Wr.state.preferredAccountType === se.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    try {
      Vr.setStatus("loading");
      const f = await Vr.signIn();
      return Vr.setStatus("success"), ne.sendEvent({
        event: "SIWE_AUTH_SUCCESS",
        type: "track",
        properties: {
          network: ((e = oe.state.caipNetwork) == null ? void 0 : e.id) || "",
          isSmartAccount: Wr.state.preferredAccountType === se.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), f;
    } catch {
      const d = Wr.state.preferredAccountType === se.ACCOUNT_TYPES.SMART_ACCOUNT;
      return d ? si.showError("This application might not support Smart Accounts") : si.showError("Signature declined"), Vr.setStatus("error"), ne.sendEvent({
        event: "SIWE_AUTH_ERROR",
        type: "track",
        properties: {
          network: ((n = oe.state.caipNetwork) == null ? void 0 : n.id) || "",
          isSmartAccount: d
        }
      });
    } finally {
      this.isSigning = !1;
    }
  }
  async onCancel() {
    var e;
    Wr.state.isConnected ? (await vn.disconnect(), oi.close()) : wn.push("Connect"), ne.sendEvent({
      event: "CLICK_CANCEL_SIWE",
      type: "track",
      properties: {
        network: ((e = oe.state.caipNetwork) == null ? void 0 : e.id) || "",
        isSmartAccount: Wr.state.preferredAccountType === se.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
  }
};
un([
  An()
], Ve.prototype, "isSigning", void 0);
Ve = un([
  Ni("w3m-connecting-siwe-view")
], Ve);
export {
  Vr as SIWEController,
  Ze as W3mConnectingSiwe,
  Ve as W3mConnectingSiweView,
  Gs as getDidAddress,
  Js as getDidChainId
};
