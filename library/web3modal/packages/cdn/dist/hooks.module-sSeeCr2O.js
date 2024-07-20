import { E as We, q as te, bh as $n, bi as xn, bj as zn, bk as Cn, bl as En, bm as Pn, bn as Hn, B as q } from "./client-CWmvRiz4.js";
const Tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventEmitter: We,
  default: We
}, Symbol.toStringTag, { value: "Module" })), s_ = /* @__PURE__ */ te(Tn);
var Vt = { exports: {} };
(function(t, e) {
  e = t.exports = $n(), e.Stream = e, e.Readable = e, e.Writable = xn(), e.Duplex = zn(), e.Transform = Cn, e.PassThrough = En, e.finished = Pn, e.pipeline = Hn;
})(Vt, Vt.exports);
var en = Vt.exports;
const { Transform: qn } = en;
var Dn = (t) => class nn extends qn {
  constructor(n, _, o, i, c) {
    super(c), this._rate = n, this._capacity = _, this._delimitedSuffix = o, this._hashBitLength = i, this._options = c, this._state = new t(), this._state.initialize(n, _), this._finalized = !1;
  }
  _transform(n, _, o) {
    let i = null;
    try {
      this.update(n, _);
    } catch (c) {
      i = c;
    }
    o(i);
  }
  _flush(n) {
    let _ = null;
    try {
      this.push(this.digest());
    } catch (o) {
      _ = o;
    }
    n(_);
  }
  update(n, _) {
    if (!q.isBuffer(n) && typeof n != "string")
      throw new TypeError("Data must be a string or a buffer");
    if (this._finalized)
      throw new Error("Digest already called");
    return q.isBuffer(n) || (n = q.from(n, _)), this._state.absorb(n), this;
  }
  digest(n) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = !0, this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
    let _ = this._state.squeeze(this._hashBitLength / 8);
    return n !== void 0 && (_ = _.toString(n)), this._resetState(), _;
  }
  // remove result from memory
  _resetState() {
    return this._state.initialize(this._rate, this._capacity), this;
  }
  // because sometimes we need hash right now and little later
  _clone() {
    const n = new nn(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);
    return this._state.copy(n._state), n._finalized = this._finalized, n;
  }
};
const { Transform: Nn } = en;
var Un = (t) => class _n extends Nn {
  constructor(n, _, o, i) {
    super(i), this._rate = n, this._capacity = _, this._delimitedSuffix = o, this._options = i, this._state = new t(), this._state.initialize(n, _), this._finalized = !1;
  }
  _transform(n, _, o) {
    let i = null;
    try {
      this.update(n, _);
    } catch (c) {
      i = c;
    }
    o(i);
  }
  _flush() {
  }
  _read(n) {
    this.push(this.squeeze(n));
  }
  update(n, _) {
    if (!q.isBuffer(n) && typeof n != "string")
      throw new TypeError("Data must be a string or a buffer");
    if (this._finalized)
      throw new Error("Squeeze already called");
    return q.isBuffer(n) || (n = q.from(n, _)), this._state.absorb(n), this;
  }
  squeeze(n, _) {
    this._finalized || (this._finalized = !0, this._state.absorbLastFewBits(this._delimitedSuffix));
    let o = this._state.squeeze(n);
    return _ !== void 0 && (o = o.toString(_)), o;
  }
  _resetState() {
    return this._state.initialize(this._rate, this._capacity), this;
  }
  _clone() {
    const n = new _n(this._rate, this._capacity, this._delimitedSuffix, this._options);
    return this._state.copy(n._state), n._finalized = this._finalized, n;
  }
};
const Bn = Dn, Ln = Un;
var Fn = function(t) {
  const e = Bn(t), n = Ln(t);
  return function(_, o) {
    switch (typeof _ == "string" ? _.toLowerCase() : _) {
      case "keccak224":
        return new e(1152, 448, null, 224, o);
      case "keccak256":
        return new e(1088, 512, null, 256, o);
      case "keccak384":
        return new e(832, 768, null, 384, o);
      case "keccak512":
        return new e(576, 1024, null, 512, o);
      case "sha3-224":
        return new e(1152, 448, 6, 224, o);
      case "sha3-256":
        return new e(1088, 512, 6, 256, o);
      case "sha3-384":
        return new e(832, 768, 6, 384, o);
      case "sha3-512":
        return new e(576, 1024, 6, 512, o);
      case "shake128":
        return new n(1344, 256, 31, o);
      case "shake256":
        return new n(1088, 512, 31, o);
      default:
        throw new Error("Invald algorithm: " + _);
    }
  };
}, on = {};
const je = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
on.p1600 = function(t) {
  for (let e = 0; e < 24; ++e) {
    const n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40], _ = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41], o = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42], i = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43], c = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44], l = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45], h = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46], u = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47], f = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48], r = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49];
    let a = f ^ (o << 1 | i >>> 31), s = r ^ (i << 1 | o >>> 31);
    const b = t[0] ^ a, k = t[1] ^ s, g = t[10] ^ a, p = t[11] ^ s, v = t[20] ^ a, z = t[21] ^ s, S = t[30] ^ a, E = t[31] ^ s, C = t[40] ^ a, F = t[41] ^ s;
    a = n ^ (c << 1 | l >>> 31), s = _ ^ (l << 1 | c >>> 31);
    const P = t[2] ^ a, U = t[3] ^ s, w = t[12] ^ a, H = t[13] ^ s, re = t[22] ^ a, se = t[23] ^ s, ce = t[32] ^ a, le = t[33] ^ s, ue = t[42] ^ a, ae = t[43] ^ s;
    a = o ^ (h << 1 | u >>> 31), s = i ^ (u << 1 | h >>> 31);
    const he = t[4] ^ a, fe = t[5] ^ s, pe = t[14] ^ a, de = t[15] ^ s, ve = t[24] ^ a, me = t[25] ^ s, ye = t[34] ^ a, ge = t[35] ^ s, be = t[44] ^ a, ke = t[45] ^ s;
    a = c ^ (f << 1 | r >>> 31), s = l ^ (r << 1 | f >>> 31);
    const we = t[6] ^ a, Se = t[7] ^ s, $e = t[16] ^ a, xe = t[17] ^ s, ze = t[26] ^ a, Ce = t[27] ^ s, Ee = t[36] ^ a, Pe = t[37] ^ s, He = t[46] ^ a, Te = t[47] ^ s;
    a = h ^ (n << 1 | _ >>> 31), s = u ^ (_ << 1 | n >>> 31);
    const qe = t[8] ^ a, De = t[9] ^ s, Ne = t[18] ^ a, Ue = t[19] ^ s, Be = t[28] ^ a, Le = t[29] ^ s, Fe = t[38] ^ a, Me = t[39] ^ s, Ae = t[48] ^ a, Oe = t[49] ^ s, J = b, Q = k, X = p << 4 | g >>> 28, Y = g << 4 | p >>> 28, Z = v << 3 | z >>> 29, tt = z << 3 | v >>> 29, et = E << 9 | S >>> 23, nt = S << 9 | E >>> 23, _t = C << 18 | F >>> 14, ot = F << 18 | C >>> 14, it = P << 1 | U >>> 31, rt = U << 1 | P >>> 31, st = H << 12 | w >>> 20, ct = w << 12 | H >>> 20, lt = re << 10 | se >>> 22, ut = se << 10 | re >>> 22, at = le << 13 | ce >>> 19, ht = ce << 13 | le >>> 19, ft = ue << 2 | ae >>> 30, pt = ae << 2 | ue >>> 30, dt = fe << 30 | he >>> 2, vt = he << 30 | fe >>> 2, mt = pe << 6 | de >>> 26, yt = de << 6 | pe >>> 26, gt = me << 11 | ve >>> 21, bt = ve << 11 | me >>> 21, kt = ye << 15 | ge >>> 17, wt = ge << 15 | ye >>> 17, St = ke << 29 | be >>> 3, $t = be << 29 | ke >>> 3, xt = we << 28 | Se >>> 4, zt = Se << 28 | we >>> 4, Ct = xe << 23 | $e >>> 9, Et = $e << 23 | xe >>> 9, Pt = ze << 25 | Ce >>> 7, Ht = Ce << 25 | ze >>> 7, Tt = Ee << 21 | Pe >>> 11, qt = Pe << 21 | Ee >>> 11, Dt = Te << 24 | He >>> 8, Nt = He << 24 | Te >>> 8, Ut = qe << 27 | De >>> 5, Bt = De << 27 | qe >>> 5, Lt = Ne << 20 | Ue >>> 12, Ft = Ue << 20 | Ne >>> 12, Mt = Le << 7 | Be >>> 25, At = Be << 7 | Le >>> 25, Ot = Fe << 8 | Me >>> 24, Wt = Me << 8 | Fe >>> 24, jt = Ae << 14 | Oe >>> 18, It = Oe << 14 | Ae >>> 18;
    t[0] = J ^ ~st & gt, t[1] = Q ^ ~ct & bt, t[10] = xt ^ ~Lt & Z, t[11] = zt ^ ~Ft & tt, t[20] = it ^ ~mt & Pt, t[21] = rt ^ ~yt & Ht, t[30] = Ut ^ ~X & lt, t[31] = Bt ^ ~Y & ut, t[40] = dt ^ ~Ct & Mt, t[41] = vt ^ ~Et & At, t[2] = st ^ ~gt & Tt, t[3] = ct ^ ~bt & qt, t[12] = Lt ^ ~Z & at, t[13] = Ft ^ ~tt & ht, t[22] = mt ^ ~Pt & Ot, t[23] = yt ^ ~Ht & Wt, t[32] = X ^ ~lt & kt, t[33] = Y ^ ~ut & wt, t[42] = Ct ^ ~Mt & et, t[43] = Et ^ ~At & nt, t[4] = gt ^ ~Tt & jt, t[5] = bt ^ ~qt & It, t[14] = Z ^ ~at & St, t[15] = tt ^ ~ht & $t, t[24] = Pt ^ ~Ot & _t, t[25] = Ht ^ ~Wt & ot, t[34] = lt ^ ~kt & Dt, t[35] = ut ^ ~wt & Nt, t[44] = Mt ^ ~et & ft, t[45] = At ^ ~nt & pt, t[6] = Tt ^ ~jt & J, t[7] = qt ^ ~It & Q, t[16] = at ^ ~St & xt, t[17] = ht ^ ~$t & zt, t[26] = Ot ^ ~_t & it, t[27] = Wt ^ ~ot & rt, t[36] = kt ^ ~Dt & Ut, t[37] = wt ^ ~Nt & Bt, t[46] = et ^ ~ft & dt, t[47] = nt ^ ~pt & vt, t[8] = jt ^ ~J & st, t[9] = It ^ ~Q & ct, t[18] = St ^ ~xt & Lt, t[19] = $t ^ ~zt & Ft, t[28] = _t ^ ~it & mt, t[29] = ot ^ ~rt & yt, t[38] = Dt ^ ~Ut & X, t[39] = Nt ^ ~Bt & Y, t[48] = ft ^ ~dt & Ct, t[49] = pt ^ ~vt & Et, t[0] ^= je[e * 2], t[1] ^= je[e * 2 + 1];
  }
};
const V = on;
function L() {
  this.state = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ], this.blockSize = null, this.count = 0, this.squeezing = !1;
}
L.prototype.initialize = function(t, e) {
  for (let n = 0; n < 50; ++n)
    this.state[n] = 0;
  this.blockSize = t / 8, this.count = 0, this.squeezing = !1;
};
L.prototype.absorb = function(t) {
  for (let e = 0; e < t.length; ++e)
    this.state[~~(this.count / 4)] ^= t[e] << 8 * (this.count % 4), this.count += 1, this.count === this.blockSize && (V.p1600(this.state), this.count = 0);
};
L.prototype.absorbLastFewBits = function(t) {
  this.state[~~(this.count / 4)] ^= t << 8 * (this.count % 4), t & 128 && this.count === this.blockSize - 1 && V.p1600(this.state), this.state[~~((this.blockSize - 1) / 4)] ^= 128 << 8 * ((this.blockSize - 1) % 4), V.p1600(this.state), this.count = 0, this.squeezing = !0;
};
L.prototype.squeeze = function(t) {
  this.squeezing || this.absorbLastFewBits(1);
  const e = q.alloc(t);
  for (let n = 0; n < t; ++n)
    e[n] = this.state[~~(this.count / 4)] >>> 8 * (this.count % 4) & 255, this.count += 1, this.count === this.blockSize && (V.p1600(this.state), this.count = 0);
  return e;
};
L.prototype.copy = function(t) {
  for (let e = 0; e < 50; ++e)
    t.state[e] = this.state[e];
  t.blockSize = this.blockSize, t.count = this.count, t.squeezing = this.squeezing;
};
var Mn = L, c_ = Fn(Mn), W, m, rn, sn, T, Ie, cn, Kt, ee, Gt, Jt, ln, O = {}, un = [], An = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, G = Array.isArray;
function $(t, e) {
  for (var n in e)
    t[n] = e[n];
  return t;
}
function an(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function Qt(t, e, n) {
  var _, o, i, c = {};
  for (i in e)
    i == "key" ? _ = e[i] : i == "ref" ? o = e[i] : c[i] = e[i];
  if (arguments.length > 2 && (c.children = arguments.length > 3 ? W.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null)
    for (i in t.defaultProps)
      c[i] === void 0 && (c[i] = t.defaultProps[i]);
  return M(t, c, _, o, null);
}
function M(t, e, n, _, o) {
  var i = { type: t, props: e, key: n, ref: _, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: o ?? ++rn, __i: -1, __u: 0 };
  return o == null && m.vnode != null && m.vnode(i), i;
}
function On() {
  return { current: null };
}
function j(t) {
  return t.children;
}
function A(t, e) {
  this.props = t, this.context = e;
}
function D(t, e) {
  if (e == null)
    return t.__ ? D(t.__, t.__i + 1) : null;
  for (var n; e < t.__k.length; e++)
    if ((n = t.__k[e]) != null && n.__e != null)
      return n.__e;
  return typeof t.type == "function" ? D(t) : null;
}
function hn(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
      if ((n = t.__k[e]) != null && n.__e != null) {
        t.__e = t.__c.base = n.__e;
        break;
      }
    return hn(t);
  }
}
function Xt(t) {
  (!t.__d && (t.__d = !0) && T.push(t) && !K.__r++ || Ie !== m.debounceRendering) && ((Ie = m.debounceRendering) || cn)(K);
}
function K() {
  var t, e, n, _, o, i, c, l;
  for (T.sort(Kt); t = T.shift(); )
    t.__d && (e = T.length, _ = void 0, i = (o = (n = t).__v).__e, c = [], l = [], n.__P && ((_ = $({}, o)).__v = o.__v + 1, m.vnode && m.vnode(_), ne(n.__P, _, o, n.__n, n.__P.namespaceURI, 32 & o.__u ? [i] : null, c, i ?? D(o), !!(32 & o.__u), l), _.__v = o.__v, _.__.__k[_.__i] = _, vn(c, _, l), _.__e != i && hn(_)), T.length > e && T.sort(Kt));
  K.__r = 0;
}
function fn(t, e, n, _, o, i, c, l, h, u, f) {
  var r, a, s, b, k, g = _ && _.__k || un, p = e.length;
  for (n.__d = h, Wn(n, e, g), h = n.__d, r = 0; r < p; r++)
    (s = n.__k[r]) != null && typeof s != "boolean" && typeof s != "function" && (a = s.__i === -1 ? O : g[s.__i] || O, s.__i = r, ne(t, s, a, o, i, c, l, h, u, f), b = s.__e, s.ref && a.ref != s.ref && (a.ref && _e(a.ref, null, s), f.push(s.ref, s.__c || b, s)), k == null && b != null && (k = b), 65536 & s.__u || a.__k === s.__k ? (h && typeof s.type == "string" && !t.contains(h) && (h = D(a)), h = pn(s, h, t)) : typeof s.type == "function" && s.__d !== void 0 ? h = s.__d : b && (h = b.nextSibling), s.__d = void 0, s.__u &= -196609);
  n.__d = h, n.__e = k;
}
function Wn(t, e, n) {
  var _, o, i, c, l, h = e.length, u = n.length, f = u, r = 0;
  for (t.__k = [], _ = 0; _ < h; _++)
    c = _ + r, (o = t.__k[_] = (o = e[_]) == null || typeof o == "boolean" || typeof o == "function" ? null : typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? M(null, o, null, null, null) : G(o) ? M(j, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? M(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) != null ? (o.__ = t, o.__b = t.__b + 1, l = jn(o, n, c, f), o.__i = l, i = null, l !== -1 && (f--, (i = n[l]) && (i.__u |= 131072)), i == null || i.__v === null ? (l == -1 && r--, typeof o.type != "function" && (o.__u |= 65536)) : l !== c && (l == c - 1 ? r = l - c : l == c + 1 ? r++ : l > c ? f > h - c ? r += l - c : r-- : l < c && r++, l !== _ + r && (o.__u |= 65536))) : (i = n[c]) && i.key == null && i.__e && !(131072 & i.__u) && (i.__e == t.__d && (t.__d = D(i)), Yt(i, i, !1), n[c] = null, f--);
  if (f)
    for (_ = 0; _ < u; _++)
      (i = n[_]) != null && !(131072 & i.__u) && (i.__e == t.__d && (t.__d = D(i)), Yt(i, i));
}
function pn(t, e, n) {
  var _, o;
  if (typeof t.type == "function") {
    for (_ = t.__k, o = 0; _ && o < _.length; o++)
      _[o] && (_[o].__ = t, e = pn(_[o], e, n));
    return e;
  }
  t.__e != e && (n.insertBefore(t.__e, e || null), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType === 8);
  return e;
}
function dn(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (G(t) ? t.some(function(n) {
    dn(n, e);
  }) : e.push(t)), e;
}
function jn(t, e, n, _) {
  var o = t.key, i = t.type, c = n - 1, l = n + 1, h = e[n];
  if (h === null || h && o == h.key && i === h.type && !(131072 & h.__u))
    return n;
  if (_ > (h != null && !(131072 & h.__u) ? 1 : 0))
    for (; c >= 0 || l < e.length; ) {
      if (c >= 0) {
        if ((h = e[c]) && !(131072 & h.__u) && o == h.key && i === h.type)
          return c;
        c--;
      }
      if (l < e.length) {
        if ((h = e[l]) && !(131072 & h.__u) && o == h.key && i === h.type)
          return l;
        l++;
      }
    }
  return -1;
}
function Re(t, e, n) {
  e[0] === "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || An.test(e) ? n : n + "px";
}
function I(t, e, n, _, o) {
  var i;
  t:
    if (e === "style")
      if (typeof n == "string")
        t.style.cssText = n;
      else {
        if (typeof _ == "string" && (t.style.cssText = _ = ""), _)
          for (e in _)
            n && e in n || Re(t.style, e, "");
        if (n)
          for (e in n)
            _ && n[e] === _[e] || Re(t.style, e, n[e]);
      }
    else if (e[0] === "o" && e[1] === "n")
      i = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")), e = e.toLowerCase() in t || e === "onFocusOut" || e === "onFocusIn" ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + i] = n, n ? _ ? n.u = _.u : (n.u = ee, t.addEventListener(e, i ? Jt : Gt, i)) : t.removeEventListener(e, i ? Jt : Gt, i);
    else {
      if (o == "http://www.w3.org/2000/svg")
        e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t)
        try {
          t[e] = n ?? "";
          break t;
        } catch {
        }
      typeof n == "function" || (n == null || n === !1 && e[4] !== "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
    }
}
function Ve(t) {
  return function(e) {
    if (this.l) {
      var n = this.l[e.type + t];
      if (e.t == null)
        e.t = ee++;
      else if (e.t < n.u)
        return;
      return n(m.event ? m.event(e) : e);
    }
  };
}
function ne(t, e, n, _, o, i, c, l, h, u) {
  var f, r, a, s, b, k, g, p, v, z, S, E, C, F, P, U, w = e.type;
  if (e.constructor !== void 0)
    return null;
  128 & n.__u && (h = !!(32 & n.__u), i = [l = e.__e = n.__e]), (f = m.__b) && f(e);
  t:
    if (typeof w == "function")
      try {
        if (p = e.props, v = "prototype" in w && w.prototype.render, z = (f = w.contextType) && _[f.__c], S = f ? z ? z.props.value : f.__ : _, n.__c ? g = (r = e.__c = n.__c).__ = r.__E : (v ? e.__c = r = new w(p, S) : (e.__c = r = new A(p, S), r.constructor = w, r.render = Rn), z && z.sub(r), r.props = p, r.state || (r.state = {}), r.context = S, r.__n = _, a = r.__d = !0, r.__h = [], r._sb = []), v && r.__s == null && (r.__s = r.state), v && w.getDerivedStateFromProps != null && (r.__s == r.state && (r.__s = $({}, r.__s)), $(r.__s, w.getDerivedStateFromProps(p, r.__s))), s = r.props, b = r.state, r.__v = e, a)
          v && w.getDerivedStateFromProps == null && r.componentWillMount != null && r.componentWillMount(), v && r.componentDidMount != null && r.__h.push(r.componentDidMount);
        else {
          if (v && w.getDerivedStateFromProps == null && p !== s && r.componentWillReceiveProps != null && r.componentWillReceiveProps(p, S), !r.__e && (r.shouldComponentUpdate != null && r.shouldComponentUpdate(p, r.__s, S) === !1 || e.__v === n.__v)) {
            for (e.__v !== n.__v && (r.props = p, r.state = r.__s, r.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach(function(H) {
              H && (H.__ = e);
            }), E = 0; E < r._sb.length; E++)
              r.__h.push(r._sb[E]);
            r._sb = [], r.__h.length && c.push(r);
            break t;
          }
          r.componentWillUpdate != null && r.componentWillUpdate(p, r.__s, S), v && r.componentDidUpdate != null && r.__h.push(function() {
            r.componentDidUpdate(s, b, k);
          });
        }
        if (r.context = S, r.props = p, r.__P = t, r.__e = !1, C = m.__r, F = 0, v) {
          for (r.state = r.__s, r.__d = !1, C && C(e), f = r.render(r.props, r.state, r.context), P = 0; P < r._sb.length; P++)
            r.__h.push(r._sb[P]);
          r._sb = [];
        } else
          do
            r.__d = !1, C && C(e), f = r.render(r.props, r.state, r.context), r.state = r.__s;
          while (r.__d && ++F < 25);
        r.state = r.__s, r.getChildContext != null && (_ = $($({}, _), r.getChildContext())), v && !a && r.getSnapshotBeforeUpdate != null && (k = r.getSnapshotBeforeUpdate(s, b)), fn(t, G(U = f != null && f.type === j && f.key == null ? f.props.children : f) ? U : [U], e, n, _, o, i, c, l, h, u), r.base = e.__e, e.__u &= -161, r.__h.length && c.push(r), g && (r.__E = r.__ = null);
      } catch (H) {
        e.__v = null, h || i != null ? (e.__e = l, e.__u |= h ? 160 : 32, i[i.indexOf(l)] = null) : (e.__e = n.__e, e.__k = n.__k), m.__e(H, e, n);
      }
    else
      i == null && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = In(n.__e, e, n, _, o, i, c, h, u);
  (f = m.diffed) && f(e);
}
function vn(t, e, n) {
  e.__d = void 0;
  for (var _ = 0; _ < n.length; _++)
    _e(n[_], n[++_], n[++_]);
  m.__c && m.__c(e, t), t.some(function(o) {
    try {
      t = o.__h, o.__h = [], t.some(function(i) {
        i.call(o);
      });
    } catch (i) {
      m.__e(i, o.__v);
    }
  });
}
function In(t, e, n, _, o, i, c, l, h) {
  var u, f, r, a, s, b, k, g = n.props, p = e.props, v = e.type;
  if (v === "svg" ? o = "http://www.w3.org/2000/svg" : v === "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), i != null) {
    for (u = 0; u < i.length; u++)
      if ((s = i[u]) && "setAttribute" in s == !!v && (v ? s.localName === v : s.nodeType === 3)) {
        t = s, i[u] = null;
        break;
      }
  }
  if (t == null) {
    if (v === null)
      return document.createTextNode(p);
    t = document.createElementNS(o, v, p.is && p), i = null, l = !1;
  }
  if (v === null)
    g === p || l && t.data === p || (t.data = p);
  else {
    if (i = i && W.call(t.childNodes), g = n.props || O, !l && i != null)
      for (g = {}, u = 0; u < t.attributes.length; u++)
        g[(s = t.attributes[u]).name] = s.value;
    for (u in g)
      if (s = g[u], u != "children") {
        if (u == "dangerouslySetInnerHTML")
          r = s;
        else if (u !== "key" && !(u in p)) {
          if (u == "value" && "defaultValue" in p || u == "checked" && "defaultChecked" in p)
            continue;
          I(t, u, null, s, o);
        }
      }
    for (u in p)
      s = p[u], u == "children" ? a = s : u == "dangerouslySetInnerHTML" ? f = s : u == "value" ? b = s : u == "checked" ? k = s : u === "key" || l && typeof s != "function" || g[u] === s || I(t, u, s, g[u], o);
    if (f)
      l || r && (f.__html === r.__html || f.__html === t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
    else if (r && (t.innerHTML = ""), fn(t, G(a) ? a : [a], e, n, _, v === "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, i, c, i ? i[0] : n.__k && D(n, 0), l, h), i != null)
      for (u = i.length; u--; )
        i[u] != null && an(i[u]);
    l || (u = "value", b !== void 0 && (b !== t[u] || v === "progress" && !b || v === "option" && b !== g[u]) && I(t, u, b, g[u], o), u = "checked", k !== void 0 && k !== t[u] && I(t, u, k, g[u], o));
  }
  return t;
}
function _e(t, e, n) {
  try {
    typeof t == "function" ? t(e) : t.current = e;
  } catch (_) {
    m.__e(_, n);
  }
}
function Yt(t, e, n) {
  var _, o;
  if (m.unmount && m.unmount(t), (_ = t.ref) && (_.current && _.current !== t.__e || _e(_, null, e)), (_ = t.__c) != null) {
    if (_.componentWillUnmount)
      try {
        _.componentWillUnmount();
      } catch (i) {
        m.__e(i, e);
      }
    _.base = _.__P = null;
  }
  if (_ = t.__k)
    for (o = 0; o < _.length; o++)
      _[o] && Yt(_[o], e, n || typeof t.type != "function");
  n || t.__e == null || an(t.__e), t.__c = t.__ = t.__e = t.__d = void 0;
}
function Rn(t, e, n) {
  return this.constructor(t, n);
}
function mn(t, e, n) {
  var _, o, i, c;
  m.__ && m.__(t, e), o = (_ = typeof n == "function") ? null : n && n.__k || e.__k, i = [], c = [], ne(e, t = (!_ && n || e).__k = Qt(j, null, [t]), o || O, O, e.namespaceURI, !_ && n ? [n] : o ? null : e.firstChild ? W.call(e.childNodes) : null, i, !_ && n ? n : o ? o.__e : e.firstChild, _, c), vn(i, t, c);
}
function yn(t, e) {
  mn(t, e, yn);
}
function Vn(t, e, n) {
  var _, o, i, c, l = $({}, t.props);
  for (i in t.type && t.type.defaultProps && (c = t.type.defaultProps), e)
    i == "key" ? _ = e[i] : i == "ref" ? o = e[i] : l[i] = e[i] === void 0 && c !== void 0 ? c[i] : e[i];
  return arguments.length > 2 && (l.children = arguments.length > 3 ? W.call(arguments, 2) : n), M(t.type, l, _ || t.key, o || t.ref, null);
}
function Kn(t, e) {
  var n = { __c: e = "__cC" + ln++, __: t, Consumer: function(_, o) {
    return _.children(o);
  }, Provider: function(_) {
    var o, i;
    return this.getChildContext || (o = [], (i = {})[e] = this, this.getChildContext = function() {
      return i;
    }, this.componentWillUnmount = function() {
      o = null;
    }, this.shouldComponentUpdate = function(c) {
      this.props.value !== c.value && o.some(function(l) {
        l.__e = !0, Xt(l);
      });
    }, this.sub = function(c) {
      o.push(c);
      var l = c.componentWillUnmount;
      c.componentWillUnmount = function() {
        o && o.splice(o.indexOf(c), 1), l && l.call(c);
      };
    }), _.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
W = un.slice, m = { __e: function(t, e, n, _) {
  for (var o, i, c; e = e.__; )
    if ((o = e.__c) && !o.__)
      try {
        if ((i = o.constructor) && i.getDerivedStateFromError != null && (o.setState(i.getDerivedStateFromError(t)), c = o.__d), o.componentDidCatch != null && (o.componentDidCatch(t, _ || {}), c = o.__d), c)
          return o.__E = o;
      } catch (l) {
        t = l;
      }
  throw t;
} }, rn = 0, sn = function(t) {
  return t != null && t.constructor == null;
}, A.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = $({}, this.state), typeof t == "function" && (t = t($({}, n), this.props)), t && $(n, t), t != null && this.__v && (e && this._sb.push(e), Xt(this));
}, A.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Xt(this));
}, A.prototype.render = j, T = [], cn = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Kt = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, K.__r = 0, ee = 0, Gt = Ve(!1), Jt = Ve(!0), ln = 0;
const Gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component: A,
  Fragment: j,
  cloneElement: Vn,
  createContext: Kn,
  createElement: Qt,
  createRef: On,
  h: Qt,
  hydrate: yn,
  get isValidElement() {
    return sn;
  },
  get options() {
    return m;
  },
  render: mn,
  toChildArray: dn
}, Symbol.toStringTag, { value: "Module" })), l_ = /* @__PURE__ */ te(Gn);
var x, d, Rt, Ke, B = 0, gn = [], y = m, Ge = y.__b, Je = y.__r, Qe = y.diffed, Xe = y.__c, Ye = y.unmount, Ze = y.__;
function N(t, e) {
  y.__h && y.__h(d, t, B || e), B = 0;
  var n = d.__H || (d.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function bn(t) {
  return B = 1, kn(Sn, t);
}
function kn(t, e, n) {
  var _ = N(x++, 2);
  if (_.t = t, !_.__c && (_.__ = [n ? n(e) : Sn(void 0, e), function(l) {
    var h = _.__N ? _.__N[0] : _.__[0], u = _.t(h, l);
    h !== u && (_.__N = [u, _.__[1]], _.__c.setState({}));
  }], _.__c = d, !d.u)) {
    var o = function(l, h, u) {
      if (!_.__c.__H)
        return !0;
      var f = _.__c.__H.__.filter(function(a) {
        return !!a.__c;
      });
      if (f.every(function(a) {
        return !a.__N;
      }))
        return !i || i.call(this, l, h, u);
      var r = !1;
      return f.forEach(function(a) {
        if (a.__N) {
          var s = a.__[0];
          a.__ = a.__N, a.__N = void 0, s !== a.__[0] && (r = !0);
        }
      }), !(!r && _.__c.props === l) && (!i || i.call(this, l, h, u));
    };
    d.u = !0;
    var i = d.shouldComponentUpdate, c = d.componentWillUpdate;
    d.componentWillUpdate = function(l, h, u) {
      if (this.__e) {
        var f = i;
        i = void 0, o(l, h, u), i = f;
      }
      c && c.call(this, l, h, u);
    }, d.shouldComponentUpdate = o;
  }
  return _.__N || _.__;
}
function Jn(t, e) {
  var n = N(x++, 3);
  !y.__s && ie(n.__H, e) && (n.__ = t, n.i = e, d.__H.__h.push(n));
}
function wn(t, e) {
  var n = N(x++, 4);
  !y.__s && ie(n.__H, e) && (n.__ = t, n.i = e, d.__h.push(n));
}
function Qn(t) {
  return B = 5, oe(function() {
    return { current: t };
  }, []);
}
function Xn(t, e, n) {
  B = 6, wn(function() {
    return typeof t == "function" ? (t(e()), function() {
      return t(null);
    }) : t ? (t.current = e(), function() {
      return t.current = null;
    }) : void 0;
  }, n == null ? n : n.concat(t));
}
function oe(t, e) {
  var n = N(x++, 7);
  return ie(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__;
}
function Yn(t, e) {
  return B = 8, oe(function() {
    return t;
  }, e);
}
function Zn(t) {
  var e = d.context[t.__c], n = N(x++, 9);
  return n.c = t, e ? (n.__ == null && (n.__ = !0, e.sub(d)), e.props.value) : t.__;
}
function t_(t, e) {
  y.useDebugValue && y.useDebugValue(e ? e(t) : t);
}
function e_(t) {
  var e = N(x++, 10), n = bn();
  return e.__ = t, d.componentDidCatch || (d.componentDidCatch = function(_, o) {
    e.__ && e.__(_, o), n[1](_);
  }), [n[0], function() {
    n[1](void 0);
  }];
}
function n_() {
  var t = N(x++, 11);
  if (!t.__) {
    for (var e = d.__v; e !== null && !e.__m && e.__ !== null; )
      e = e.__;
    var n = e.__m || (e.__m = [0, 0]);
    t.__ = "P" + n[0] + "-" + n[1]++;
  }
  return t.__;
}
function __() {
  for (var t; t = gn.shift(); )
    if (t.__P && t.__H)
      try {
        t.__H.__h.forEach(R), t.__H.__h.forEach(Zt), t.__H.__h = [];
      } catch (e) {
        t.__H.__h = [], y.__e(e, t.__v);
      }
}
y.__b = function(t) {
  d = null, Ge && Ge(t);
}, y.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Ze && Ze(t, e);
}, y.__r = function(t) {
  Je && Je(t), x = 0;
  var e = (d = t.__c).__H;
  e && (Rt === d ? (e.__h = [], d.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.i = n.__N = void 0;
  })) : (e.__h.forEach(R), e.__h.forEach(Zt), e.__h = [], x = 0)), Rt = d;
}, y.diffed = function(t) {
  Qe && Qe(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (gn.push(e) !== 1 && Ke === y.requestAnimationFrame || ((Ke = y.requestAnimationFrame) || o_)(__)), e.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.i = void 0;
  })), Rt = d = null;
}, y.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(R), n.__h = n.__h.filter(function(_) {
        return !_.__ || Zt(_);
      });
    } catch (_) {
      e.some(function(o) {
        o.__h && (o.__h = []);
      }), e = [], y.__e(_, n.__v);
    }
  }), Xe && Xe(t, e);
}, y.unmount = function(t) {
  Ye && Ye(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(_) {
    try {
      R(_);
    } catch (o) {
      e = o;
    }
  }), n.__H = void 0, e && y.__e(e, n.__v));
};
var tn = typeof requestAnimationFrame == "function";
function o_(t) {
  var e, n = function() {
    clearTimeout(_), tn && cancelAnimationFrame(e), setTimeout(t);
  }, _ = setTimeout(n, 100);
  tn && (e = requestAnimationFrame(n));
}
function R(t) {
  var e = d, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), d = e;
}
function Zt(t) {
  var e = d;
  t.__c = t.__(), d = e;
}
function ie(t, e) {
  return !t || t.length !== e.length || e.some(function(n, _) {
    return n !== t[_];
  });
}
function Sn(t, e) {
  return typeof e == "function" ? e(t) : e;
}
const i_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useCallback: Yn,
  useContext: Zn,
  useDebugValue: t_,
  useEffect: Jn,
  useErrorBoundary: e_,
  useId: n_,
  useImperativeHandle: Xn,
  useLayoutEffect: wn,
  useMemo: oe,
  useReducer: kn,
  useRef: Qn,
  useState: bn
}, Symbol.toStringTag, { value: "Module" })), u_ = /* @__PURE__ */ te(i_);
export {
  u_ as a,
  s_ as b,
  c_ as j,
  l_ as r
};
