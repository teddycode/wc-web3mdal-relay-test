var jd = Object.defineProperty;
var Vd = (r, e, t) => e in r ? jd(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var w = (r, e, t) => (Vd(r, typeof e != "symbol" ? e + "" : e, t), t), Mo = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var l = (r, e, t) => (Mo(r, e, "read from private field"), t ? t.call(r) : e.get(r)), y = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, f = (r, e, t, n) => (Mo(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t);
var ni = (r, e, t, n) => ({
  set _(s) {
    f(r, e, s, t);
  },
  get _() {
    return l(r, e, n);
  }
}), v = (r, e, t) => (Mo(r, e, "access private method"), t);
import { w as Kd, S as Qd, u as M, s as zd, i as Oa, k as Jd, a as Dn, b as k, P as ge, p as qd, j as Zd, l as Yd, r as $d, W as Xd, c as Do, H as ef, N as cn, m as tf, d as ia, f as ol, g as cl, h as nf, y as rf, B as z, n as sf, o as Xe, q as af } from "./client-CWmvRiz4.js";
import { j as of, r as Bu, a as cf, b as lf } from "./hooks.module-sSeeCr2O.js";
const uf = "6.13.0";
function hf(r, e, t) {
  const n = e.split("|").map((i) => i.trim());
  for (let i = 0; i < n.length; i++)
    switch (e) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof r === e)
          return;
    }
  const s = new Error(`invalid value for type ${e}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${t}`, s.value = r, s;
}
async function Pe(r) {
  const e = Object.keys(r);
  return (await Promise.all(e.map((n) => Promise.resolve(r[n])))).reduce((n, s, i) => (n[e[i]] = s, n), {});
}
function O(r, e, t) {
  for (let n in e) {
    let s = e[n];
    const i = t ? t[n] : null;
    i && hf(s, i, n), Object.defineProperty(r, n, { enumerable: !0, value: s, writable: !1 });
  }
}
function Wr(r) {
  if (r == null)
    return "null";
  if (Array.isArray(r))
    return "[ " + r.map(Wr).join(", ") + " ]";
  if (r instanceof Uint8Array) {
    const e = "0123456789abcdef";
    let t = "0x";
    for (let n = 0; n < r.length; n++)
      t += e[r[n] >> 4], t += e[r[n] & 15];
    return t;
  }
  if (typeof r == "object" && typeof r.toJSON == "function")
    return Wr(r.toJSON());
  switch (typeof r) {
    case "boolean":
    case "symbol":
      return r.toString();
    case "bigint":
      return BigInt(r).toString();
    case "number":
      return r.toString();
    case "string":
      return JSON.stringify(r);
    case "object": {
      const e = Object.keys(r);
      return e.sort(), "{ " + e.map((t) => `${Wr(t)}: ${Wr(r[t])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Ae(r, e) {
  return r && r.code === e;
}
function Mc(r) {
  return Ae(r, "CALL_EXCEPTION");
}
function J(r, e, t) {
  let n = r;
  {
    const i = [];
    if (t) {
      if ("message" in t || "code" in t || "name" in t)
        throw new Error(`value will overwrite populated values: ${Wr(t)}`);
      for (const a in t) {
        if (a === "shortMessage")
          continue;
        const o = t[a];
        i.push(a + "=" + Wr(o));
      }
    }
    i.push(`code=${e}`), i.push(`version=${uf}`), i.length && (r += " (" + i.join(", ") + ")");
  }
  let s;
  switch (e) {
    case "INVALID_ARGUMENT":
      s = new TypeError(r);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(r);
      break;
    default:
      s = new Error(r);
  }
  return O(s, { code: e }), t && Object.assign(s, t), s.shortMessage == null && O(s, { shortMessage: n }), s;
}
function E(r, e, t, n) {
  if (!r)
    throw J(e, t, n);
}
function m(r, e, t, n) {
  E(r, e, "INVALID_ARGUMENT", { argument: t, value: n });
}
function Uu(r, e, t) {
  t == null && (t = ""), t && (t = ": " + t), E(r >= e, "missing arguemnt" + t, "MISSING_ARGUMENT", {
    count: r,
    expectedCount: e
  }), E(r <= e, "too many arguments" + t, "UNEXPECTED_ARGUMENT", {
    count: r,
    expectedCount: e
  });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((r, e) => {
  try {
    if ("test".normalize(e) !== "test")
      throw new Error("bad");
    if (e === "NFD" && "é".normalize("NFD") !== "é")
      throw new Error("broken");
    r.push(e);
  } catch {
  }
  return r;
}, []);
function qi(r, e, t) {
  if (t == null && (t = ""), r !== e) {
    let n = t, s = "new";
    t && (n += ".", s += " " + t), E(!1, `private constructor; use ${n}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: s
    });
  }
}
function Fu(r, e, t) {
  if (r instanceof Uint8Array)
    return t ? new Uint8Array(r) : r;
  if (typeof r == "string" && r.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const n = new Uint8Array((r.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < n.length; i++)
      n[i] = parseInt(r.substring(s, s + 2), 16), s += 2;
    return n;
  }
  m(!1, "invalid BytesLike value", e || "value", r);
}
function H(r, e) {
  return Fu(r, e, !1);
}
function ke(r, e) {
  return Fu(r, e, !0);
}
function V(r, e) {
  return !(typeof r != "string" || !r.match(/^0x[0-9A-Fa-f]*$/) || typeof e == "number" && r.length !== 2 + 2 * e || e === !0 && r.length % 2 !== 0);
}
function Dc(r) {
  return V(r, !0) || r instanceof Uint8Array;
}
const ll = "0123456789abcdef";
function P(r) {
  const e = H(r);
  let t = "0x";
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    t += ll[(s & 240) >> 4] + ll[s & 15];
  }
  return t;
}
function ne(r) {
  return "0x" + r.map((e) => P(e).substring(2)).join("");
}
function Zr(r) {
  return V(r, !0) ? (r.length - 2) / 2 : H(r).length;
}
function Y(r, e, t) {
  const n = H(r);
  return t != null && t > n.length && E(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: n,
    length: n.length,
    offset: t
  }), P(n.slice(e ?? 0, t ?? n.length));
}
function Hu(r, e, t) {
  const n = H(r);
  E(e >= n.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(n),
    length: e,
    offset: e + 1
  });
  const s = new Uint8Array(e);
  return s.fill(0), t ? s.set(n, e - n.length) : s.set(n, 0), P(s);
}
function Ar(r, e) {
  return Hu(r, e, !0);
}
function df(r, e) {
  return Hu(r, e, !1);
}
const no = BigInt(0), ut = BigInt(1), jr = 9007199254740991;
function _a(r, e) {
  const t = ro(r, "value"), n = BigInt(L(e, "width"));
  if (E(t >> n === no, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: r
  }), t >> n - ut) {
    const s = (ut << n) - ut;
    return -((~t & s) + ut);
  }
  return t;
}
function Gu(r, e) {
  let t = R(r, "value");
  const n = BigInt(L(e, "width")), s = ut << n - ut;
  if (t < no) {
    t = -t, E(t <= s, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r
    });
    const i = (ut << n) - ut;
    return (~t & i) + ut;
  } else
    E(t < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r
    });
  return t;
}
function Vn(r, e) {
  const t = ro(r, "value"), n = BigInt(L(e, "bits"));
  return t & (ut << n) - ut;
}
function R(r, e) {
  switch (typeof r) {
    case "bigint":
      return r;
    case "number":
      return m(Number.isInteger(r), "underflow", e || "value", r), m(r >= -jr && r <= jr, "overflow", e || "value", r), BigInt(r);
    case "string":
      try {
        if (r === "")
          throw new Error("empty string");
        return r[0] === "-" && r[1] !== "-" ? -BigInt(r.substring(1)) : BigInt(r);
      } catch (t) {
        m(!1, `invalid BigNumberish string: ${t.message}`, e || "value", r);
      }
  }
  m(!1, "invalid BigNumberish value", e || "value", r);
}
function ro(r, e) {
  const t = R(r, e);
  return E(t >= no, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: r
  }), t;
}
const ul = "0123456789abcdef";
function so(r) {
  if (r instanceof Uint8Array) {
    let e = "0x0";
    for (const t of r)
      e += ul[t >> 4], e += ul[t & 15];
    return BigInt(e);
  }
  return R(r);
}
function L(r, e) {
  switch (typeof r) {
    case "bigint":
      return m(r >= -jr && r <= jr, "overflow", e || "value", r), Number(r);
    case "number":
      return m(Number.isInteger(r), "underflow", e || "value", r), m(r >= -jr && r <= jr, "overflow", e || "value", r), r;
    case "string":
      try {
        if (r === "")
          throw new Error("empty string");
        return L(BigInt(r), e);
      } catch (t) {
        m(!1, `invalid numeric string: ${t.message}`, e || "value", r);
      }
  }
  m(!1, "invalid numeric value", e || "value", r);
}
function ff(r) {
  return L(so(r));
}
function _n(r, e) {
  let n = ro(r, "value").toString(16);
  if (e == null)
    n.length % 2 && (n = "0" + n);
  else {
    const s = L(e, "width");
    for (E(s * 2 >= n.length, `value exceeds width (${s} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: r
    }); n.length < s * 2; )
      n = "0" + n;
  }
  return "0x" + n;
}
function Re(r) {
  const e = ro(r, "value");
  if (e === no)
    return new Uint8Array([]);
  let t = e.toString(16);
  t.length % 2 && (t = "0" + t);
  const n = new Uint8Array(t.length / 2);
  for (let s = 0; s < n.length; s++) {
    const i = s * 2;
    n[s] = parseInt(t.substring(i, i + 2), 16);
  }
  return n;
}
function Vr(r) {
  let e = P(Dc(r) ? r : Re(r)).substring(2);
  for (; e.startsWith("0"); )
    e = e.substring(1);
  return e === "" && (e = "0"), "0x" + e;
}
const hl = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
BigInt(0);
const dl = BigInt(58);
function pf(r) {
  const e = H(r);
  let t = so(e), n = "";
  for (; t; )
    n = hl[Number(t % dl)] + n, t /= dl;
  for (let s = 0; s < e.length && !e[s]; s++)
    n = hl[0] + n;
  return n;
}
function gf(r) {
  r = atob(r);
  const e = new Uint8Array(r.length);
  for (let t = 0; t < r.length; t++)
    e[t] = r.charCodeAt(t);
  return H(e);
}
function mf(r) {
  const e = H(r);
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += String.fromCharCode(e[n]);
  return btoa(t);
}
var rs;
class Wu {
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(e, t, n) {
    /**
     *  The event filter.
     */
    w(this, "filter");
    /**
     *  The **EventEmitterable**.
     */
    w(this, "emitter");
    y(this, rs, void 0);
    f(this, rs, t), O(this, { emitter: e, filter: n });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    l(this, rs) != null && await this.emitter.off(this.filter, l(this, rs));
  }
}
rs = new WeakMap();
function yf(r, e, t, n, s) {
  m(!1, `invalid codepoint at offset ${e}; ${r}`, "bytes", t);
}
function ju(r, e, t, n, s) {
  if (r === "BAD_PREFIX" || r === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let a = e + 1; a < t.length && t[a] >> 6 === 2; a++)
      i++;
    return i;
  }
  return r === "OVERRUN" ? t.length - e - 1 : 0;
}
function wf(r, e, t, n, s) {
  return r === "OVERLONG" ? (m(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), n.push(s), 0) : (n.push(65533), ju(r, e, t));
}
const bf = Object.freeze({
  error: yf,
  ignore: ju,
  replace: wf
});
function Af(r, e) {
  e == null && (e = bf.error);
  const t = H(r, "bytes"), n = [];
  let s = 0;
  for (; s < t.length; ) {
    const i = t[s++];
    if (!(i >> 7)) {
      n.push(i);
      continue;
    }
    let a = null, o = null;
    if ((i & 224) === 192)
      a = 1, o = 127;
    else if ((i & 240) === 224)
      a = 2, o = 2047;
    else if ((i & 248) === 240)
      a = 3, o = 65535;
    else {
      (i & 192) === 128 ? s += e("UNEXPECTED_CONTINUE", s - 1, t, n) : s += e("BAD_PREFIX", s - 1, t, n);
      continue;
    }
    if (s - 1 + a >= t.length) {
      s += e("OVERRUN", s - 1, t, n);
      continue;
    }
    let c = i & (1 << 8 - a - 1) - 1;
    for (let u = 0; u < a; u++) {
      let h = t[s];
      if ((h & 192) != 128) {
        s += e("MISSING_CONTINUE", s, t, n), c = null;
        break;
      }
      c = c << 6 | h & 63, s++;
    }
    if (c !== null) {
      if (c > 1114111) {
        s += e("OUT_OF_RANGE", s - 1 - a, t, n, c);
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        s += e("UTF16_SURROGATE", s - 1 - a, t, n, c);
        continue;
      }
      if (c <= o) {
        s += e("OVERLONG", s - 1 - a, t, n, c);
        continue;
      }
      n.push(c);
    }
  }
  return n;
}
function xt(r, e) {
  m(typeof r == "string", "invalid string value", "str", r);
  let t = [];
  for (let n = 0; n < r.length; n++) {
    const s = r.charCodeAt(n);
    if (s < 128)
      t.push(s);
    else if (s < 2048)
      t.push(s >> 6 | 192), t.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      n++;
      const i = r.charCodeAt(n);
      m(n < r.length && (i & 64512) === 56320, "invalid surrogate pair", "str", r);
      const a = 65536 + ((s & 1023) << 10) + (i & 1023);
      t.push(a >> 18 | 240), t.push(a >> 12 & 63 | 128), t.push(a >> 6 & 63 | 128), t.push(a & 63 | 128);
    } else
      t.push(s >> 12 | 224), t.push(s >> 6 & 63 | 128), t.push(s & 63 | 128);
  }
  return new Uint8Array(t);
}
function Ef(r) {
  return r.map((e) => e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10 & 1023) + 55296, (e & 1023) + 56320))).join("");
}
function La(r, e) {
  return Ef(Af(r, e));
}
function Vu(r) {
  async function e(t, n) {
    E(n == null || !n.cancelled, "request cancelled before sending", "CANCELLED");
    const s = t.url.split(":")[0].toLowerCase();
    E(s === "http" || s === "https", `unsupported protocol ${s}`, "UNSUPPORTED_OPERATION", {
      info: { protocol: s },
      operation: "request"
    }), E(s === "https" || !t.credentials || t.allowInsecureAuthentication, "insecure authorized connections unsupported", "UNSUPPORTED_OPERATION", {
      operation: "request"
    });
    let i = null;
    const a = new AbortController(), o = setTimeout(() => {
      i = J("request timeout", "TIMEOUT"), a.abort();
    }, t.timeout);
    n && n.addListener(() => {
      i = J("request cancelled", "CANCELLED"), a.abort();
    });
    const c = {
      method: t.method,
      headers: new Headers(Array.from(t)),
      body: t.body || void 0,
      signal: a.signal
    };
    let u;
    try {
      u = await fetch(t.url, c);
    } catch (g) {
      throw clearTimeout(o), i || g;
    }
    clearTimeout(o);
    const h = {};
    u.headers.forEach((g, b) => {
      h[b.toLowerCase()] = g;
    });
    const p = await u.arrayBuffer(), d = p == null ? null : new Uint8Array(p);
    return {
      statusCode: u.status,
      statusMessage: u.statusText,
      headers: h,
      body: d
    };
  }
  return e;
}
const Cf = 12, vf = 250;
let fl = Vu();
const If = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), Nf = new RegExp("^ipfs://(ipfs/)?(.*)$", "i");
let Bo = !1;
async function Ku(r, e) {
  try {
    const t = r.match(If);
    if (!t)
      throw new Error("invalid data");
    return new On(200, "OK", {
      "content-type": t[1] || "text/plain"
    }, t[2] ? gf(t[3]) : Sf(t[3]));
  } catch {
    return new On(599, "BAD REQUEST (invalid data: URI)", {}, null, new _t(r));
  }
}
function Qu(r) {
  async function e(t, n) {
    try {
      const s = t.match(Nf);
      if (!s)
        throw new Error("invalid link");
      return new _t(`${r}${s[2]}`);
    } catch {
      return new On(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new _t(t));
    }
  }
  return e;
}
const aa = {
  data: Ku,
  ipfs: Qu("https://gateway.ipfs.io/ipfs/")
}, zu = /* @__PURE__ */ new WeakMap();
var zn, dn;
class Pf {
  constructor(e) {
    y(this, zn, void 0);
    y(this, dn, void 0);
    f(this, zn, []), f(this, dn, !1), zu.set(e, () => {
      if (!l(this, dn)) {
        f(this, dn, !0);
        for (const t of l(this, zn))
          setTimeout(() => {
            t();
          }, 0);
        f(this, zn, []);
      }
    });
  }
  addListener(e) {
    E(!l(this, dn), "singal already cancelled", "UNSUPPORTED_OPERATION", {
      operation: "fetchCancelSignal.addCancelListener"
    }), l(this, zn).push(e);
  }
  get cancelled() {
    return l(this, dn);
  }
  checkSignal() {
    E(!this.cancelled, "cancelled", "CANCELLED", {});
  }
}
zn = new WeakMap(), dn = new WeakMap();
function oa(r) {
  if (r == null)
    throw new Error("missing signal; should not happen");
  return r.checkSignal(), r;
}
var ss, is, rt, jt, as, os, ce, Fe, Vt, Jn, qn, Zn, wt, st, fn, Yn, ai;
const Ja = class Ja {
  /**
   *  Create a new FetchRequest instance with default values.
   *
   *  Once created, each property may be set before issuing a
   *  ``.send()`` to make the request.
   */
  constructor(e) {
    y(this, Yn);
    y(this, ss, void 0);
    y(this, is, void 0);
    y(this, rt, void 0);
    y(this, jt, void 0);
    y(this, as, void 0);
    y(this, os, void 0);
    y(this, ce, void 0);
    y(this, Fe, void 0);
    y(this, Vt, void 0);
    // Hooks
    y(this, Jn, void 0);
    y(this, qn, void 0);
    y(this, Zn, void 0);
    y(this, wt, void 0);
    y(this, st, void 0);
    y(this, fn, void 0);
    f(this, os, String(e)), f(this, ss, !1), f(this, is, !0), f(this, rt, {}), f(this, jt, ""), f(this, as, 3e5), f(this, st, {
      slotInterval: vf,
      maxAttempts: Cf
    }), f(this, fn, null);
  }
  /**
   *  The fetch URL to request.
   */
  get url() {
    return l(this, os);
  }
  set url(e) {
    f(this, os, String(e));
  }
  /**
   *  The fetch body, if any, to send as the request body. //(default: null)//
   *
   *  When setting a body, the intrinsic ``Content-Type`` is automatically
   *  set and will be used if **not overridden** by setting a custom
   *  header.
   *
   *  If %%body%% is null, the body is cleared (along with the
   *  intrinsic ``Content-Type``).
   *
   *  If %%body%% is a string, the intrinsic ``Content-Type`` is set to
   *  ``text/plain``.
   *
   *  If %%body%% is a Uint8Array, the intrinsic ``Content-Type`` is set to
   *  ``application/octet-stream``.
   *
   *  If %%body%% is any other object, the intrinsic ``Content-Type`` is
   *  set to ``application/json``.
   */
  get body() {
    return l(this, ce) == null ? null : new Uint8Array(l(this, ce));
  }
  set body(e) {
    if (e == null)
      f(this, ce, void 0), f(this, Fe, void 0);
    else if (typeof e == "string")
      f(this, ce, xt(e)), f(this, Fe, "text/plain");
    else if (e instanceof Uint8Array)
      f(this, ce, e), f(this, Fe, "application/octet-stream");
    else if (typeof e == "object")
      f(this, ce, xt(JSON.stringify(e))), f(this, Fe, "application/json");
    else
      throw new Error("invalid body");
  }
  /**
   *  Returns true if the request has a body.
   */
  hasBody() {
    return l(this, ce) != null;
  }
  /**
   *  The HTTP method to use when requesting the URI. If no method
   *  has been explicitly set, then ``GET`` is used if the body is
   *  null and ``POST`` otherwise.
   */
  get method() {
    return l(this, jt) ? l(this, jt) : this.hasBody() ? "POST" : "GET";
  }
  set method(e) {
    e == null && (e = ""), f(this, jt, String(e).toUpperCase());
  }
  /**
   *  The headers that will be used when requesting the URI. All
   *  keys are lower-case.
   *
   *  This object is a copy, so any changes will **NOT** be reflected
   *  in the ``FetchRequest``.
   *
   *  To set a header entry, use the ``setHeader`` method.
   */
  get headers() {
    const e = Object.assign({}, l(this, rt));
    return l(this, Vt) && (e.authorization = `Basic ${mf(xt(l(this, Vt)))}`), this.allowGzip && (e["accept-encoding"] = "gzip"), e["content-type"] == null && l(this, Fe) && (e["content-type"] = l(this, Fe)), this.body && (e["content-length"] = String(this.body.length)), e;
  }
  /**
   *  Get the header for %%key%%, ignoring case.
   */
  getHeader(e) {
    return this.headers[e.toLowerCase()];
  }
  /**
   *  Set the header for %%key%% to %%value%%. All values are coerced
   *  to a string.
   */
  setHeader(e, t) {
    l(this, rt)[String(e).toLowerCase()] = String(t);
  }
  /**
   *  Clear all headers, resetting all intrinsic headers.
   */
  clearHeaders() {
    f(this, rt, {});
  }
  [Symbol.iterator]() {
    const e = this.headers, t = Object.keys(e);
    let n = 0;
    return {
      next: () => {
        if (n < t.length) {
          const s = t[n++];
          return {
            value: [s, e[s]],
            done: !1
          };
        }
        return { value: void 0, done: !0 };
      }
    };
  }
  /**
   *  The value that will be sent for the ``Authorization`` header.
   *
   *  To set the credentials, use the ``setCredentials`` method.
   */
  get credentials() {
    return l(this, Vt) || null;
  }
  /**
   *  Sets an ``Authorization`` for %%username%% with %%password%%.
   */
  setCredentials(e, t) {
    m(!e.match(/:/), "invalid basic authentication username", "username", "[REDACTED]"), f(this, Vt, `${e}:${t}`);
  }
  /**
   *  Enable and request gzip-encoded responses. The response will
   *  automatically be decompressed. //(default: true)//
   */
  get allowGzip() {
    return l(this, is);
  }
  set allowGzip(e) {
    f(this, is, !!e);
  }
  /**
   *  Allow ``Authentication`` credentials to be sent over insecure
   *  channels. //(default: false)//
   */
  get allowInsecureAuthentication() {
    return !!l(this, ss);
  }
  set allowInsecureAuthentication(e) {
    f(this, ss, !!e);
  }
  /**
   *  The timeout (in milliseconds) to wait for a complete response.
   *  //(default: 5 minutes)//
   */
  get timeout() {
    return l(this, as);
  }
  set timeout(e) {
    m(e >= 0, "timeout must be non-zero", "timeout", e), f(this, as, e);
  }
  /**
   *  This function is called prior to each request, for example
   *  during a redirection or retry in case of server throttling.
   *
   *  This offers an opportunity to populate headers or update
   *  content before sending a request.
   */
  get preflightFunc() {
    return l(this, Jn) || null;
  }
  set preflightFunc(e) {
    f(this, Jn, e);
  }
  /**
   *  This function is called after each response, offering an
   *  opportunity to provide client-level throttling or updating
   *  response data.
   *
   *  Any error thrown in this causes the ``send()`` to throw.
   *
   *  To schedule a retry attempt (assuming the maximum retry limit
   *  has not been reached), use [[response.throwThrottleError]].
   */
  get processFunc() {
    return l(this, qn) || null;
  }
  set processFunc(e) {
    f(this, qn, e);
  }
  /**
   *  This function is called on each retry attempt.
   */
  get retryFunc() {
    return l(this, Zn) || null;
  }
  set retryFunc(e) {
    f(this, Zn, e);
  }
  /**
   *  This function is called to fetch content from HTTP and
   *  HTTPS URLs and is platform specific (e.g. nodejs vs
   *  browsers).
   *
   *  This is by default the currently registered global getUrl
   *  function, which can be changed using [[registerGetUrl]].
   *  If this has been set, setting is to ``null`` will cause
   *  this FetchRequest (and any future clones) to revert back to
   *  using the currently registered global getUrl function.
   *
   *  Setting this is generally not necessary, but may be useful
   *  for developers that wish to intercept requests or to
   *  configurege a proxy or other agent.
   */
  get getUrlFunc() {
    return l(this, fn) || fl;
  }
  set getUrlFunc(e) {
    f(this, fn, e);
  }
  toString() {
    return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${l(this, ce) ? P(l(this, ce)) : "null"}>`;
  }
  /**
   *  Update the throttle parameters used to determine maximum
   *  attempts and exponential-backoff properties.
   */
  setThrottleParams(e) {
    e.slotInterval != null && (l(this, st).slotInterval = e.slotInterval), e.maxAttempts != null && (l(this, st).maxAttempts = e.maxAttempts);
  }
  /**
   *  Resolves to the response by sending the request.
   */
  send() {
    return E(l(this, wt) == null, "request already sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.send" }), f(this, wt, new Pf(this)), v(this, Yn, ai).call(this, 0, pl() + this.timeout, 0, this, new On(0, "", {}, null, this));
  }
  /**
   *  Cancels the inflight response, causing a ``CANCELLED``
   *  error to be rejected from the [[send]].
   */
  cancel() {
    E(l(this, wt) != null, "request has not been sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.cancel" });
    const e = zu.get(this);
    if (!e)
      throw new Error("missing signal; should not happen");
    e();
  }
  /**
   *  Returns a new [[FetchRequest]] that represents the redirection
   *  to %%location%%.
   */
  redirect(e) {
    const t = this.url.split(":")[0].toLowerCase(), n = e.split(":")[0].toLowerCase();
    E(this.method === "GET" && (t !== "https" || n !== "http") && e.match(/^https?:/), "unsupported redirect", "UNSUPPORTED_OPERATION", {
      operation: `redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(e)})`
    });
    const s = new Ja(e);
    return s.method = "GET", s.allowGzip = this.allowGzip, s.timeout = this.timeout, f(s, rt, Object.assign({}, l(this, rt))), l(this, ce) && f(s, ce, new Uint8Array(l(this, ce))), f(s, Fe, l(this, Fe)), s;
  }
  /**
   *  Create a new copy of this request.
   */
  clone() {
    const e = new Ja(this.url);
    return f(e, jt, l(this, jt)), l(this, ce) && f(e, ce, l(this, ce)), f(e, Fe, l(this, Fe)), f(e, rt, Object.assign({}, l(this, rt))), f(e, Vt, l(this, Vt)), this.allowGzip && (e.allowGzip = !0), e.timeout = this.timeout, this.allowInsecureAuthentication && (e.allowInsecureAuthentication = !0), f(e, Jn, l(this, Jn)), f(e, qn, l(this, qn)), f(e, Zn, l(this, Zn)), f(e, st, Object.assign({}, l(this, st))), f(e, fn, l(this, fn)), e;
  }
  /**
   *  Locks all static configuration for gateways and FetchGetUrlFunc
   *  registration.
   */
  static lockConfig() {
    Bo = !0;
  }
  /**
   *  Get the current Gateway function for %%scheme%%.
   */
  static getGateway(e) {
    return aa[e.toLowerCase()] || null;
  }
  /**
   *  Use the %%func%% when fetching URIs using %%scheme%%.
   *
   *  This method affects all requests globally.
   *
   *  If [[lockConfig]] has been called, no change is made and this
   *  throws.
   */
  static registerGateway(e, t) {
    if (e = e.toLowerCase(), e === "http" || e === "https")
      throw new Error(`cannot intercept ${e}; use registerGetUrl`);
    if (Bo)
      throw new Error("gateways locked");
    aa[e] = t;
  }
  /**
   *  Use %%getUrl%% when fetching URIs over HTTP and HTTPS requests.
   *
   *  This method affects all requests globally.
   *
   *  If [[lockConfig]] has been called, no change is made and this
   *  throws.
   */
  static registerGetUrl(e) {
    if (Bo)
      throw new Error("gateways locked");
    fl = e;
  }
  /**
   *  Creates a getUrl function that fetches content from HTTP and
   *  HTTPS URLs.
   *
   *  The available %%options%% are dependent on the platform
   *  implementation of the default getUrl function.
   *
   *  This is not generally something that is needed, but is useful
   *  when trying to customize simple behaviour when fetching HTTP
   *  content.
   */
  static createGetUrlFunc(e) {
    return Vu();
  }
  /**
   *  Creates a function that can "fetch" data URIs.
   *
   *  Note that this is automatically done internally to support
   *  data URIs, so it is not necessary to register it.
   *
   *  This is not generally something that is needed, but may
   *  be useful in a wrapper to perfom custom data URI functionality.
   */
  static createDataGateway() {
    return Ku;
  }
  /**
   *  Creates a function that will fetch IPFS (unvalidated) from
   *  a custom gateway baseUrl.
   *
   *  The default IPFS gateway used internally is
   *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
   */
  static createIpfsGatewayFunc(e) {
    return Qu(e);
  }
};
ss = new WeakMap(), is = new WeakMap(), rt = new WeakMap(), jt = new WeakMap(), as = new WeakMap(), os = new WeakMap(), ce = new WeakMap(), Fe = new WeakMap(), Vt = new WeakMap(), Jn = new WeakMap(), qn = new WeakMap(), Zn = new WeakMap(), wt = new WeakMap(), st = new WeakMap(), fn = new WeakMap(), Yn = new WeakSet(), ai = async function(e, t, n, s, i) {
  var h, p, d;
  if (e >= l(this, st).maxAttempts)
    return i.makeServerError("exceeded maximum retry limit");
  E(pl() <= t, "timeout", "TIMEOUT", {
    operation: "request.send",
    reason: "timeout",
    request: s
  }), n > 0 && await kf(n);
  let a = this.clone();
  const o = (a.url.split(":")[0] || "").toLowerCase();
  if (o in aa) {
    const g = await aa[o](a.url, oa(l(s, wt)));
    if (g instanceof On) {
      let b = g;
      if (this.processFunc) {
        oa(l(s, wt));
        try {
          b = await this.processFunc(a, b);
        } catch (A) {
          (A.throttle == null || typeof A.stall != "number") && b.makeServerError("error in post-processing function", A).assertOk();
        }
      }
      return b;
    }
    a = g;
  }
  this.preflightFunc && (a = await this.preflightFunc(a));
  const c = await this.getUrlFunc(a, oa(l(s, wt)));
  let u = new On(c.statusCode, c.statusMessage, c.headers, c.body, s);
  if (u.statusCode === 301 || u.statusCode === 302) {
    try {
      const g = u.headers.location || "";
      return v(h = a.redirect(g), Yn, ai).call(h, e + 1, t, 0, s, u);
    } catch {
    }
    return u;
  } else if (u.statusCode === 429 && (this.retryFunc == null || await this.retryFunc(a, u, e))) {
    const g = u.headers["retry-after"];
    let b = l(this, st).slotInterval * Math.trunc(Math.random() * Math.pow(2, e));
    return typeof g == "string" && g.match(/^[1-9][0-9]*$/) && (b = parseInt(g)), v(p = a.clone(), Yn, ai).call(p, e + 1, t, b, s, u);
  }
  if (this.processFunc) {
    oa(l(s, wt));
    try {
      u = await this.processFunc(a, u);
    } catch (g) {
      (g.throttle == null || typeof g.stall != "number") && u.makeServerError("error in post-processing function", g).assertOk();
      let b = l(this, st).slotInterval * Math.trunc(Math.random() * Math.pow(2, e));
      return g.stall >= 0 && (b = g.stall), v(d = a.clone(), Yn, ai).call(d, e + 1, t, b, s, u);
    }
  }
  return u;
};
let _t = Ja;
var Ni, Pi, Si, He, cs, $n;
const rl = class rl {
  constructor(e, t, n, s, i) {
    y(this, Ni, void 0);
    y(this, Pi, void 0);
    y(this, Si, void 0);
    y(this, He, void 0);
    y(this, cs, void 0);
    y(this, $n, void 0);
    f(this, Ni, e), f(this, Pi, t), f(this, Si, Object.keys(n).reduce((a, o) => (a[o.toLowerCase()] = String(n[o]), a), {})), f(this, He, s == null ? null : new Uint8Array(s)), f(this, cs, i || null), f(this, $n, { message: "" });
  }
  toString() {
    return `<FetchResponse status=${this.statusCode} body=${l(this, He) ? P(l(this, He)) : "null"}>`;
  }
  /**
   *  The response status code.
   */
  get statusCode() {
    return l(this, Ni);
  }
  /**
   *  The response status message.
   */
  get statusMessage() {
    return l(this, Pi);
  }
  /**
   *  The response headers. All keys are lower-case.
   */
  get headers() {
    return Object.assign({}, l(this, Si));
  }
  /**
   *  The response body, or ``null`` if there was no body.
   */
  get body() {
    return l(this, He) == null ? null : new Uint8Array(l(this, He));
  }
  /**
   *  The response body as a UTF-8 encoded string, or the empty
   *  string (i.e. ``""``) if there was no body.
   *
   *  An error is thrown if the body is invalid UTF-8 data.
   */
  get bodyText() {
    try {
      return l(this, He) == null ? "" : La(l(this, He));
    } catch {
      E(!1, "response body is not valid UTF-8 data", "UNSUPPORTED_OPERATION", {
        operation: "bodyText",
        info: { response: this }
      });
    }
  }
  /**
   *  The response body, decoded as JSON.
   *
   *  An error is thrown if the body is invalid JSON-encoded data
   *  or if there was no body.
   */
  get bodyJson() {
    try {
      return JSON.parse(this.bodyText);
    } catch {
      E(!1, "response body is not valid JSON", "UNSUPPORTED_OPERATION", {
        operation: "bodyJson",
        info: { response: this }
      });
    }
  }
  [Symbol.iterator]() {
    const e = this.headers, t = Object.keys(e);
    let n = 0;
    return {
      next: () => {
        if (n < t.length) {
          const s = t[n++];
          return {
            value: [s, e[s]],
            done: !1
          };
        }
        return { value: void 0, done: !0 };
      }
    };
  }
  /**
   *  Return a Response with matching headers and body, but with
   *  an error status code (i.e. 599) and %%message%% with an
   *  optional %%error%%.
   */
  makeServerError(e, t) {
    let n;
    e ? n = `CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${e})` : (e = `${this.statusCode} ${this.statusMessage}`, n = `CLIENT ESCALATED SERVER ERROR (${e})`);
    const s = new rl(599, n, this.headers, this.body, l(this, cs) || void 0);
    return f(s, $n, { message: e, error: t }), s;
  }
  /**
   *  If called within a [request.processFunc](FetchRequest-processFunc)
   *  call, causes the request to retry as if throttled for %%stall%%
   *  milliseconds.
   */
  throwThrottleError(e, t) {
    t == null ? t = -1 : m(Number.isInteger(t) && t >= 0, "invalid stall timeout", "stall", t);
    const n = new Error(e || "throttling requests");
    throw O(n, { stall: t, throttle: !0 }), n;
  }
  /**
   *  Get the header value for %%key%%, ignoring case.
   */
  getHeader(e) {
    return this.headers[e.toLowerCase()];
  }
  /**
   *  Returns true if the response has a body.
   */
  hasBody() {
    return l(this, He) != null;
  }
  /**
   *  The request made for this response.
   */
  get request() {
    return l(this, cs);
  }
  /**
   *  Returns true if this response was a success statusCode.
   */
  ok() {
    return l(this, $n).message === "" && this.statusCode >= 200 && this.statusCode < 300;
  }
  /**
   *  Throws a ``SERVER_ERROR`` if this response is not ok.
   */
  assertOk() {
    if (this.ok())
      return;
    let { message: e, error: t } = l(this, $n);
    e === "" && (e = `server response ${this.statusCode} ${this.statusMessage}`);
    let n = null;
    this.request && (n = this.request.url);
    let s = null;
    try {
      l(this, He) && (s = La(l(this, He)));
    } catch {
    }
    E(!1, e, "SERVER_ERROR", {
      request: this.request || "unknown request",
      response: this,
      error: t,
      info: {
        requestUrl: n,
        responseBody: s,
        responseStatus: `${this.statusCode} ${this.statusMessage}`
      }
    });
  }
};
Ni = new WeakMap(), Pi = new WeakMap(), Si = new WeakMap(), He = new WeakMap(), cs = new WeakMap(), $n = new WeakMap();
let On = rl;
function pl() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function Sf(r) {
  return xt(r.replace(/%([0-9a-f][0-9a-f])/gi, (e, t) => String.fromCharCode(parseInt(t, 16))));
}
function kf(r) {
  return new Promise((e) => setTimeout(e, r));
}
const Rf = BigInt(-1), tt = BigInt(0), Kr = BigInt(1), xf = BigInt(5), Tr = {};
let Yr = "0000";
for (; Yr.length < 80; )
  Yr += Yr;
function Bn(r) {
  let e = Yr;
  for (; e.length < r; )
    e += e;
  return BigInt("1" + e.substring(0, r));
}
function ri(r, e, t) {
  const n = BigInt(e.width);
  if (e.signed) {
    const s = Kr << n - Kr;
    E(t == null || r >= -s && r < s, "overflow", "NUMERIC_FAULT", {
      operation: t,
      fault: "overflow",
      value: r
    }), r > tt ? r = _a(Vn(r, n), n) : r = -_a(Vn(-r, n), n);
  } else {
    const s = Kr << n;
    E(t == null || r >= 0 && r < s, "overflow", "NUMERIC_FAULT", {
      operation: t,
      fault: "overflow",
      value: r
    }), r = (r % s + s) % s & s - Kr;
  }
  return r;
}
function Uo(r) {
  typeof r == "number" && (r = `fixed128x${r}`);
  let e = !0, t = 128, n = 18;
  if (typeof r == "string") {
    if (r !== "fixed")
      if (r === "ufixed")
        e = !1;
      else {
        const i = r.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
        m(i, "invalid fixed format", "format", r), e = i[1] !== "u", t = parseInt(i[2]), n = parseInt(i[3]);
      }
  } else if (r) {
    const i = r, a = (o, c, u) => i[o] == null ? u : (m(typeof i[o] === c, "invalid fixed format (" + o + " not " + c + ")", "format." + o, i[o]), i[o]);
    e = a("signed", "boolean", e), t = a("width", "number", t), n = a("decimals", "number", n);
  }
  m(t % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", t), m(n <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", n);
  const s = (e ? "" : "u") + "fixed" + String(t) + "x" + String(n);
  return { signed: e, width: t, decimals: n, name: s };
}
function Tf(r, e) {
  let t = "";
  r < tt && (t = "-", r *= Rf);
  let n = r.toString();
  if (e === 0)
    return t + n;
  for (; n.length <= e; )
    n = Yr + n;
  const s = n.length - e;
  for (n = n.substring(0, s) + "." + n.substring(s); n[0] === "0" && n[1] !== "."; )
    n = n.substring(1);
  for (; n[n.length - 1] === "0" && n[n.length - 2] !== "."; )
    n = n.substring(0, n.length - 1);
  return t + n;
}
var it, j, ve, Kt, Un, at, Bt, ki, sc, Ri, ic, xi, ac, Ti, oc;
const hn = class hn {
  // Use this when changing this file to get some typing info,
  // but then switch to any to mask the internal type
  //constructor(guard: any, value: bigint, format: _FixedFormat) {
  /**
   *  @private
   */
  constructor(e, t, n) {
    y(this, Kt);
    y(this, at);
    y(this, ki);
    y(this, Ri);
    y(this, xi);
    y(this, Ti);
    /**
     *  The specific fixed-point arithmetic field for this value.
     */
    w(this, "format");
    y(this, it, void 0);
    // The actual value (accounting for decimals)
    y(this, j, void 0);
    // A base-10 value to multiple values by to maintain the magnitude
    y(this, ve, void 0);
    /**
     *  This is a property so console.log shows a human-meaningful value.
     *
     *  @private
     */
    w(this, "_value");
    qi(e, Tr, "FixedNumber"), f(this, j, t), f(this, it, n);
    const s = Tf(t, n.decimals);
    O(this, { format: n.name, _value: s }), f(this, ve, Bn(n.decimals));
  }
  /**
   *  If true, negative values are permitted, otherwise only
   *  positive values and zero are allowed.
   */
  get signed() {
    return l(this, it).signed;
  }
  /**
   *  The number of bits available to store the value.
   */
  get width() {
    return l(this, it).width;
  }
  /**
   *  The number of decimal places in the fixed-point arithment field.
   */
  get decimals() {
    return l(this, it).decimals;
  }
  /**
   *  The value as an integer, based on the smallest unit the
   *  [[decimals]] allow.
   */
  get value() {
    return l(this, j);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%, ignoring overflow.
   */
  addUnsafe(e) {
    return v(this, ki, sc).call(this, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  add(e) {
    return v(this, ki, sc).call(this, e, "add");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%, ignoring overflow.
   */
  subUnsafe(e) {
    return v(this, Ri, ic).call(this, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  sub(e) {
    return v(this, Ri, ic).call(this, e, "sub");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%, ignoring overflow and underflow (precision loss).
   */
  mulUnsafe(e) {
    return v(this, xi, ac).call(this, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  mul(e) {
    return v(this, xi, ac).call(this, e, "mul");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs or if underflow (precision loss) occurs.
   */
  mulSignal(e) {
    v(this, Kt, Un).call(this, e);
    const t = l(this, j) * l(e, j);
    return E(t % l(this, ve) === tt, "precision lost during signalling mul", "NUMERIC_FAULT", {
      operation: "mulSignal",
      fault: "underflow",
      value: this
    }), v(this, at, Bt).call(this, t / l(this, ve), "mulSignal");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  divUnsafe(e) {
    return v(this, Ti, oc).call(this, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  div(e) {
    return v(this, Ti, oc).call(this, e, "div");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%. A [[NumericFaultError]] is thrown if underflow
   *  (precision loss) occurs.
   */
  divSignal(e) {
    E(l(e, j) !== tt, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    }), v(this, Kt, Un).call(this, e);
    const t = l(this, j) * l(this, ve);
    return E(t % l(e, j) === tt, "precision lost during signalling div", "NUMERIC_FAULT", {
      operation: "divSignal",
      fault: "underflow",
      value: this
    }), v(this, at, Bt).call(this, t / l(e, j), "divSignal");
  }
  /**
   *  Returns a comparison result between %%this%% and %%other%%.
   *
   *  This is suitable for use in sorting, where ``-1`` implies %%this%%
   *  is smaller, ``1`` implies %%this%% is larger and ``0`` implies
   *  both are equal.
   */
  cmp(e) {
    let t = this.value, n = e.value;
    const s = this.decimals - e.decimals;
    return s > 0 ? n *= Bn(s) : s < 0 && (t *= Bn(-s)), t < n ? -1 : t > n ? 1 : 0;
  }
  /**
   *  Returns true if %%other%% is equal to %%this%%.
   */
  eq(e) {
    return this.cmp(e) === 0;
  }
  /**
   *  Returns true if %%other%% is less than to %%this%%.
   */
  lt(e) {
    return this.cmp(e) < 0;
  }
  /**
   *  Returns true if %%other%% is less than or equal to %%this%%.
   */
  lte(e) {
    return this.cmp(e) <= 0;
  }
  /**
   *  Returns true if %%other%% is greater than to %%this%%.
   */
  gt(e) {
    return this.cmp(e) > 0;
  }
  /**
   *  Returns true if %%other%% is greater than or equal to %%this%%.
   */
  gte(e) {
    return this.cmp(e) >= 0;
  }
  /**
   *  Returns a new [[FixedNumber]] which is the largest **integer**
   *  that is less than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  floor() {
    let e = l(this, j);
    return l(this, j) < tt && (e -= l(this, ve) - Kr), e = l(this, j) / l(this, ve) * l(this, ve), v(this, at, Bt).call(this, e, "floor");
  }
  /**
   *  Returns a new [[FixedNumber]] which is the smallest **integer**
   *  that is greater than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  ceiling() {
    let e = l(this, j);
    return l(this, j) > tt && (e += l(this, ve) - Kr), e = l(this, j) / l(this, ve) * l(this, ve), v(this, at, Bt).call(this, e, "ceiling");
  }
  /**
   *  Returns a new [[FixedNumber]] with the decimal component
   *  rounded up on ties at %%decimals%% places.
   */
  round(e) {
    if (e == null && (e = 0), e >= this.decimals)
      return this;
    const t = this.decimals - e, n = xf * Bn(t - 1);
    let s = this.value + n;
    const i = Bn(t);
    return s = s / i * i, ri(s, l(this, it), "round"), new hn(Tr, s, l(this, it));
  }
  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero() {
    return l(this, j) === tt;
  }
  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative() {
    return l(this, j) < tt;
  }
  /**
   *  Returns the string representation of %%this%%.
   */
  toString() {
    return this._value;
  }
  /**
   *  Returns a float approximation.
   *
   *  Due to IEEE 754 precission (or lack thereof), this function
   *  can only return an approximation and most values will contain
   *  rounding errors.
   */
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  /**
   *  Return a new [[FixedNumber]] with the same value but has had
   *  its field set to %%format%%.
   *
   *  This will throw if the value cannot fit into %%format%%.
   */
  toFormat(e) {
    return hn.fromString(this.toString(), e);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% divided by
   *  %%decimal%% places with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% (once adjusted
   *  for %%decimals%%) cannot fit in %%format%%, either due to overflow
   *  or underflow (precision loss).
   */
  static fromValue(e, t, n) {
    const s = t == null ? 0 : L(t), i = Uo(n);
    let a = R(e, "value");
    const o = s - i.decimals;
    if (o > 0) {
      const c = Bn(o);
      E(a % c === tt, "value loses precision for format", "NUMERIC_FAULT", {
        operation: "fromValue",
        fault: "underflow",
        value: e
      }), a /= c;
    } else
      o < 0 && (a *= Bn(-o));
    return ri(a, i, "fromValue"), new hn(Tr, a, i);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%%, either due to overflow or underflow (precision loss).
   */
  static fromString(e, t) {
    const n = e.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
    m(n && n[2].length + n[3].length > 0, "invalid FixedNumber string value", "value", e);
    const s = Uo(t);
    let i = n[2] || "0", a = n[3] || "";
    for (; a.length < s.decimals; )
      a += Yr;
    E(a.substring(s.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
      operation: "fromString",
      fault: "underflow",
      value: e
    }), a = a.substring(0, s.decimals);
    const o = BigInt(n[1] + i + a);
    return ri(o, s, "fromString"), new hn(Tr, o, s);
  }
  /**
   *  Creates a new [[FixedNumber]] with the big-endian representation
   *  %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%% due to overflow.
   */
  static fromBytes(e, t) {
    let n = so(H(e, "value"));
    const s = Uo(t);
    return s.signed && (n = _a(n, s.width)), ri(n, s, "fromBytes"), new hn(Tr, n, s);
  }
};
it = new WeakMap(), j = new WeakMap(), ve = new WeakMap(), Kt = new WeakSet(), Un = function(e) {
  m(this.format === e.format, "incompatible format; use fixedNumber.toFormat", "other", e);
}, at = new WeakSet(), Bt = function(e, t) {
  return e = ri(e, l(this, it), t), new hn(Tr, e, l(this, it));
}, ki = new WeakSet(), sc = function(e, t) {
  return v(this, Kt, Un).call(this, e), v(this, at, Bt).call(this, l(this, j) + l(e, j), t);
}, Ri = new WeakSet(), ic = function(e, t) {
  return v(this, Kt, Un).call(this, e), v(this, at, Bt).call(this, l(this, j) - l(e, j), t);
}, xi = new WeakSet(), ac = function(e, t) {
  return v(this, Kt, Un).call(this, e), v(this, at, Bt).call(this, l(this, j) * l(e, j) / l(this, ve), t);
}, Ti = new WeakSet(), oc = function(e, t) {
  return E(l(e, j) !== tt, "division by zero", "NUMERIC_FAULT", {
    operation: "div",
    fault: "divide-by-zero",
    value: this
  }), v(this, Kt, Un).call(this, e), v(this, at, Bt).call(this, l(this, j) * l(this, ve) / l(e, j), t);
};
let Ma = hn;
function Of(r) {
  let e = r.toString(16);
  for (; e.length < 2; )
    e = "0" + e;
  return "0x" + e;
}
function gl(r, e, t) {
  let n = 0;
  for (let s = 0; s < t; s++)
    n = n * 256 + r[e + s];
  return n;
}
function ml(r, e, t, n) {
  const s = [];
  for (; t < e + 1 + n; ) {
    const i = Ju(r, t);
    s.push(i.result), t += i.consumed, E(t <= e + 1 + n, "child data too short", "BUFFER_OVERRUN", {
      buffer: r,
      length: n,
      offset: e
    });
  }
  return { consumed: 1 + n, result: s };
}
function Ju(r, e) {
  E(r.length !== 0, "data too short", "BUFFER_OVERRUN", {
    buffer: r,
    length: 0,
    offset: 1
  });
  const t = (n) => {
    E(n <= r.length, "data short segment too short", "BUFFER_OVERRUN", {
      buffer: r,
      length: r.length,
      offset: n
    });
  };
  if (r[e] >= 248) {
    const n = r[e] - 247;
    t(e + 1 + n);
    const s = gl(r, e + 1, n);
    return t(e + 1 + n + s), ml(r, e, e + 1 + n, n + s);
  } else if (r[e] >= 192) {
    const n = r[e] - 192;
    return t(e + 1 + n), ml(r, e, e + 1, n);
  } else if (r[e] >= 184) {
    const n = r[e] - 183;
    t(e + 1 + n);
    const s = gl(r, e + 1, n);
    t(e + 1 + n + s);
    const i = P(r.slice(e + 1 + n, e + 1 + n + s));
    return { consumed: 1 + n + s, result: i };
  } else if (r[e] >= 128) {
    const n = r[e] - 128;
    t(e + 1 + n);
    const s = P(r.slice(e + 1, e + 1 + n));
    return { consumed: 1 + n, result: s };
  }
  return { consumed: 1, result: Of(r[e]) };
}
function io(r) {
  const e = H(r, "data"), t = Ju(e, 0);
  return m(t.consumed === e.length, "unexpected junk after rlp payload", "data", r), t.result;
}
function yl(r) {
  const e = [];
  for (; r; )
    e.unshift(r & 255), r >>= 8;
  return e;
}
function qu(r) {
  if (Array.isArray(r)) {
    let n = [];
    if (r.forEach(function(i) {
      n = n.concat(qu(i));
    }), n.length <= 55)
      return n.unshift(192 + n.length), n;
    const s = yl(n.length);
    return s.unshift(247 + s.length), s.concat(n);
  }
  const e = Array.prototype.slice.call(H(r, "object"));
  if (e.length === 1 && e[0] <= 127)
    return e;
  if (e.length <= 55)
    return e.unshift(128 + e.length), e;
  const t = yl(e.length);
  return t.unshift(183 + t.length), t.concat(e);
}
const wl = "0123456789abcdef";
function Er(r) {
  let e = "0x";
  for (const t of qu(r))
    e += wl[t >> 4], e += wl[t & 15];
  return e;
}
const Zu = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function Yu(r, e) {
  let t = 18;
  if (typeof e == "string") {
    const n = Zu.indexOf(e);
    m(n >= 0, "invalid unit", "unit", e), t = 3 * n;
  } else
    e != null && (t = L(e, "unit"));
  return Ma.fromValue(r, t, { decimals: t, width: 512 }).toString();
}
function _f(r, e) {
  m(typeof r == "string", "value must be a string", "value", r);
  let t = 18;
  if (typeof e == "string") {
    const n = Zu.indexOf(e);
    m(n >= 0, "invalid unit", "unit", e), t = 3 * n;
  } else
    e != null && (t = L(e, "unit"));
  return Ma.fromString(r, { decimals: t, width: 512 }).value;
}
function Lf(r) {
  return Yu(r, 18);
}
const xe = 32, cc = new Uint8Array(xe), Mf = ["then"], ca = {}, $u = /* @__PURE__ */ new WeakMap();
function Hn(r) {
  return $u.get(r);
}
function bl(r, e) {
  $u.set(r, e);
}
function si(r, e) {
  const t = new Error(`deferred error during ABI decoding triggered accessing ${r}`);
  throw t.error = e, t;
}
function lc(r, e, t) {
  return r.indexOf(null) >= 0 ? e.map((n, s) => n instanceof zs ? lc(Hn(n), n, t) : n) : r.reduce((n, s, i) => {
    let a = e.getValue(s);
    return s in n || (t && a instanceof zs && (a = lc(Hn(a), a, t)), n[s] = a), n;
  }, {});
}
var ls;
const zr = class zr extends Array {
  /**
   *  @private
   */
  constructor(...t) {
    const n = t[0];
    let s = t[1], i = (t[2] || []).slice(), a = !0;
    n !== ca && (s = t, i = [], a = !1);
    super(s.length);
    // No longer used; but cannot be removed as it will remove the
    // #private field from the .d.ts which may break backwards
    // compatibility
    y(this, ls, void 0);
    s.forEach((u, h) => {
      this[h] = u;
    });
    const o = i.reduce((u, h) => (typeof h == "string" && u.set(h, (u.get(h) || 0) + 1), u), /* @__PURE__ */ new Map());
    if (bl(this, Object.freeze(s.map((u, h) => {
      const p = i[h];
      return p != null && o.get(p) === 1 ? p : null;
    }))), f(this, ls, []), l(this, ls) == null && l(this, ls), !a)
      return;
    Object.freeze(this);
    const c = new Proxy(this, {
      get: (u, h, p) => {
        if (typeof h == "string") {
          if (h.match(/^[0-9]+$/)) {
            const g = L(h, "%index");
            if (g < 0 || g >= this.length)
              throw new RangeError("out of result range");
            const b = u[g];
            return b instanceof Error && si(`index ${g}`, b), b;
          }
          if (Mf.indexOf(h) >= 0)
            return Reflect.get(u, h, p);
          const d = u[h];
          if (d instanceof Function)
            return function(...g) {
              return d.apply(this === p ? u : this, g);
            };
          if (!(h in u))
            return u.getValue.apply(this === p ? u : this, [h]);
        }
        return Reflect.get(u, h, p);
      }
    });
    return bl(c, Hn(this)), c;
  }
  /**
   *  Returns the Result as a normal Array. If %%deep%%, any children
   *  which are Result objects are also converted to a normal Array.
   *
   *  This will throw if there are any outstanding deferred
   *  errors.
   */
  toArray(t) {
    const n = [];
    return this.forEach((s, i) => {
      s instanceof Error && si(`index ${i}`, s), t && s instanceof zr && (s = s.toArray(t)), n.push(s);
    }), n;
  }
  /**
   *  Returns the Result as an Object with each name-value pair. If
   *  %%deep%%, any children which are Result objects are also
   *  converted to an Object.
   *
   *  This will throw if any value is unnamed, or if there are
   *  any outstanding deferred errors.
   */
  toObject(t) {
    const n = Hn(this);
    return n.reduce((s, i, a) => (E(i != null, `value at index ${a} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), lc(n, this, t)), {});
  }
  /**
   *  @_ignore
   */
  slice(t, n) {
    t == null && (t = 0), t < 0 && (t += this.length, t < 0 && (t = 0)), n == null && (n = this.length), n < 0 && (n += this.length, n < 0 && (n = 0)), n > this.length && (n = this.length);
    const s = Hn(this), i = [], a = [];
    for (let o = t; o < n; o++)
      i.push(this[o]), a.push(s[o]);
    return new zr(ca, i, a);
  }
  /**
   *  @_ignore
   */
  filter(t, n) {
    const s = Hn(this), i = [], a = [];
    for (let o = 0; o < this.length; o++) {
      const c = this[o];
      c instanceof Error && si(`index ${o}`, c), t.call(n, c, o, this) && (i.push(c), a.push(s[o]));
    }
    return new zr(ca, i, a);
  }
  /**
   *  @_ignore
   */
  map(t, n) {
    const s = [];
    for (let i = 0; i < this.length; i++) {
      const a = this[i];
      a instanceof Error && si(`index ${i}`, a), s.push(t.call(n, a, i, this));
    }
    return s;
  }
  /**
   *  Returns the value for %%name%%.
   *
   *  Since it is possible to have a key whose name conflicts with
   *  a method on a [[Result]] or its superclass Array, or any
   *  JavaScript keyword, this ensures all named values are still
   *  accessible by name.
   */
  getValue(t) {
    const n = Hn(this).indexOf(t);
    if (n === -1)
      return;
    const s = this[n];
    return s instanceof Error && si(`property ${JSON.stringify(t)}`, s.error), s;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(t, n) {
    return new zr(ca, t, n);
  }
};
ls = new WeakMap();
let zs = zr;
function Al(r) {
  let e = Re(r);
  return E(e.length <= xe, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: e, length: xe, offset: e.length }), e.length !== xe && (e = ke(ne([cc.slice(e.length % xe), e]))), e;
}
class on {
  constructor(e, t, n, s) {
    // The coder name:
    //   - address, uint256, tuple, array, etc.
    w(this, "name");
    // The fully expanded type, including composite types:
    //   - address, uint256, tuple(address,bytes), uint256[3][4][],  etc.
    w(this, "type");
    // The localName bound in the signature, in this example it is "baz":
    //   - tuple(address foo, uint bar) baz
    w(this, "localName");
    // Whether this type is dynamic:
    //  - Dynamic: bytes, string, address[], tuple(boolean[]), etc.
    //  - Not Dynamic: address, uint256, boolean[3], tuple(address, uint8)
    w(this, "dynamic");
    O(this, { name: e, type: t, localName: n, dynamic: s }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(e, t) {
    m(!1, e, this.localName, t);
  }
}
var Qt, Xn, us, Ea;
class uc {
  constructor() {
    y(this, us);
    // An array of WordSize lengthed objects to concatenation
    y(this, Qt, void 0);
    y(this, Xn, void 0);
    f(this, Qt, []), f(this, Xn, 0);
  }
  get data() {
    return ne(l(this, Qt));
  }
  get length() {
    return l(this, Xn);
  }
  appendWriter(e) {
    return v(this, us, Ea).call(this, ke(e.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(e) {
    let t = ke(e);
    const n = t.length % xe;
    return n && (t = ke(ne([t, cc.slice(n)]))), v(this, us, Ea).call(this, t);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(e) {
    return v(this, us, Ea).call(this, Al(e));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const e = l(this, Qt).length;
    return l(this, Qt).push(cc), f(this, Xn, l(this, Xn) + xe), (t) => {
      l(this, Qt)[e] = Al(t);
    };
  }
}
Qt = new WeakMap(), Xn = new WeakMap(), us = new WeakSet(), Ea = function(e) {
  return l(this, Qt).push(e), f(this, Xn, l(this, Xn) + e.length), e.length;
};
var _e, Ge, er, tr, pn, Oi, dc, qa, Xu;
const sl = class sl {
  constructor(e, t, n) {
    y(this, Oi);
    y(this, qa);
    // Allows incomplete unpadded data to be read; otherwise an error
    // is raised if attempting to overrun the buffer. This is required
    // to deal with an old Solidity bug, in which event data for
    // external (not public thoguh) was tightly packed.
    w(this, "allowLoose");
    y(this, _e, void 0);
    y(this, Ge, void 0);
    y(this, er, void 0);
    y(this, tr, void 0);
    y(this, pn, void 0);
    O(this, { allowLoose: !!t }), f(this, _e, ke(e)), f(this, er, 0), f(this, tr, null), f(this, pn, n ?? 1024), f(this, Ge, 0);
  }
  get data() {
    return P(l(this, _e));
  }
  get dataLength() {
    return l(this, _e).length;
  }
  get consumed() {
    return l(this, Ge);
  }
  get bytes() {
    return new Uint8Array(l(this, _e));
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(e) {
    const t = new sl(l(this, _e).slice(l(this, Ge) + e), this.allowLoose, l(this, pn));
    return f(t, tr, this), t;
  }
  // Read bytes
  readBytes(e, t) {
    let n = v(this, qa, Xu).call(this, 0, e, !!t);
    return v(this, Oi, dc).call(this, e), f(this, Ge, l(this, Ge) + n.length), n.slice(0, e);
  }
  // Read a numeric values
  readValue() {
    return so(this.readBytes(xe));
  }
  readIndex() {
    return ff(this.readBytes(xe));
  }
};
_e = new WeakMap(), Ge = new WeakMap(), er = new WeakMap(), tr = new WeakMap(), pn = new WeakMap(), Oi = new WeakSet(), dc = function(e) {
  var t;
  if (l(this, tr))
    return v(t = l(this, tr), Oi, dc).call(t, e);
  f(this, er, l(this, er) + e), E(l(this, pn) < 1 || l(this, er) <= l(this, pn) * this.dataLength, `compressed ABI data exceeds inflation ratio of ${l(this, pn)} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
    buffer: ke(l(this, _e)),
    offset: l(this, Ge),
    length: e,
    info: {
      bytesRead: l(this, er),
      dataLength: this.dataLength
    }
  });
}, qa = new WeakSet(), Xu = function(e, t, n) {
  let s = Math.ceil(t / xe) * xe;
  return l(this, Ge) + s > l(this, _e).length && (this.allowLoose && n && l(this, Ge) + t <= l(this, _e).length ? s = t : E(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
    buffer: ke(l(this, _e)),
    length: l(this, _e).length,
    offset: l(this, Ge) + s
  })), l(this, _e).slice(l(this, Ge), l(this, Ge) + s);
};
let hc = sl;
const [Df, Bf] = M.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((r) => BigInt(r))), ln = /* @__PURE__ */ new Uint32Array(80), un = /* @__PURE__ */ new Uint32Array(80);
class Uf extends Qd {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: e, Al: t, Bh: n, Bl: s, Ch: i, Cl: a, Dh: o, Dl: c, Eh: u, El: h, Fh: p, Fl: d, Gh: g, Gl: b, Hh: A, Hl: I } = this;
    return [e, t, n, s, i, a, o, c, u, h, p, d, g, b, A, I];
  }
  // prettier-ignore
  set(e, t, n, s, i, a, o, c, u, h, p, d, g, b, A, I) {
    this.Ah = e | 0, this.Al = t | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = c | 0, this.Eh = u | 0, this.El = h | 0, this.Fh = p | 0, this.Fl = d | 0, this.Gh = g | 0, this.Gl = b | 0, this.Hh = A | 0, this.Hl = I | 0;
  }
  process(e, t) {
    for (let x = 0; x < 16; x++, t += 4)
      ln[x] = e.getUint32(t), un[x] = e.getUint32(t += 4);
    for (let x = 16; x < 80; x++) {
      const D = ln[x - 15] | 0, K = un[x - 15] | 0, ue = M.rotrSH(D, K, 1) ^ M.rotrSH(D, K, 8) ^ M.shrSH(D, K, 7), gt = M.rotrSL(D, K, 1) ^ M.rotrSL(D, K, 8) ^ M.shrSL(D, K, 7), Z = ln[x - 2] | 0, $ = un[x - 2] | 0, Ce = M.rotrSH(Z, $, 19) ^ M.rotrBH(Z, $, 61) ^ M.shrSH(Z, $, 6), ti = M.rotrSL(Z, $, 19) ^ M.rotrBL(Z, $, 61) ^ M.shrSL(Z, $, 6), Mn = M.add4L(gt, ti, un[x - 7], un[x - 16]), Rr = M.add4H(Mn, ue, Ce, ln[x - 7], ln[x - 16]);
      ln[x] = Rr | 0, un[x] = Mn | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: a, Ch: o, Cl: c, Dh: u, Dl: h, Eh: p, El: d, Fh: g, Fl: b, Gh: A, Gl: I, Hh: S, Hl: _ } = this;
    for (let x = 0; x < 80; x++) {
      const D = M.rotrSH(p, d, 14) ^ M.rotrSH(p, d, 18) ^ M.rotrBH(p, d, 41), K = M.rotrSL(p, d, 14) ^ M.rotrSL(p, d, 18) ^ M.rotrBL(p, d, 41), ue = p & g ^ ~p & A, gt = d & b ^ ~d & I, Z = M.add5L(_, K, gt, Bf[x], un[x]), $ = M.add5H(Z, S, D, ue, Df[x], ln[x]), Ce = Z | 0, ti = M.rotrSH(n, s, 28) ^ M.rotrBH(n, s, 34) ^ M.rotrBH(n, s, 39), Mn = M.rotrSL(n, s, 28) ^ M.rotrBL(n, s, 34) ^ M.rotrBL(n, s, 39), Rr = n & i ^ n & o ^ i & o, xr = s & a ^ s & c ^ a & c;
      S = A | 0, _ = I | 0, A = g | 0, I = b | 0, g = p | 0, b = d | 0, { h: p, l: d } = M.add(u | 0, h | 0, $ | 0, Ce | 0), u = o | 0, h = c | 0, o = i | 0, c = a | 0, i = n | 0, a = s | 0;
      const al = M.add3L(Ce, Mn, xr);
      n = M.add3H(al, $, ti, Rr), s = al | 0;
    }
    ({ h: n, l: s } = M.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: a } = M.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: o, l: c } = M.add(this.Ch | 0, this.Cl | 0, o | 0, c | 0), { h: u, l: h } = M.add(this.Dh | 0, this.Dl | 0, u | 0, h | 0), { h: p, l: d } = M.add(this.Eh | 0, this.El | 0, p | 0, d | 0), { h: g, l: b } = M.add(this.Fh | 0, this.Fl | 0, g | 0, b | 0), { h: A, l: I } = M.add(this.Gh | 0, this.Gl | 0, A | 0, I | 0), { h: S, l: _ } = M.add(this.Hh | 0, this.Hl | 0, S | 0, _ | 0), this.set(n, s, i, a, o, c, u, h, p, d, g, b, A, I, S, _);
  }
  roundClean() {
    ln.fill(0), un.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Ff = /* @__PURE__ */ Kd(() => new Uf());
function Hf() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof Oa < "u")
    return Oa;
  throw new Error("unable to locate global object");
}
const El = Hf();
El.crypto || El.msCrypto;
function Gf(r) {
  switch (r) {
    case "sha256":
      return zd.create();
    case "sha512":
      return Ff.create();
  }
  m(!1, "invalid hashing algorithm name", "algorithm", r);
}
let eh = !1;
const th = function(r) {
  return Jd(r);
};
let nh = th;
function se(r) {
  const e = H(r, "data");
  return P(nh(e));
}
se._ = th;
se.lock = function() {
  eh = !0;
};
se.register = function(r) {
  if (eh)
    throw new TypeError("keccak256 is locked");
  nh = r;
};
Object.freeze(se);
const rh = function(r) {
  return Gf("sha256").update(r).digest();
};
let sh = rh, ih = !1;
function Xs(r) {
  const e = H(r, "data");
  return P(sh(e));
}
Xs._ = rh;
Xs.lock = function() {
  ih = !0;
};
Xs.register = function(r) {
  if (ih)
    throw new Error("sha256 is locked");
  sh = r;
};
Object.freeze(Xs);
Object.freeze(Xs);
const gi = "0x0000000000000000000000000000000000000000", Cl = "0x0000000000000000000000000000000000000000000000000000000000000000", vl = BigInt(0), Il = BigInt(1), Nl = BigInt(2), Pl = BigInt(27), Sl = BigInt(28), la = BigInt(35), Or = {};
function kl(r) {
  return Ar(Re(r), 32);
}
var hs, ds, fs, nr;
const nt = class nt {
  /**
   *  @private
   */
  constructor(e, t, n, s) {
    y(this, hs, void 0);
    y(this, ds, void 0);
    y(this, fs, void 0);
    y(this, nr, void 0);
    qi(e, Or, "Signature"), f(this, hs, t), f(this, ds, n), f(this, fs, s), f(this, nr, null);
  }
  /**
   *  The ``r`` value for a signautre.
   *
   *  This represents the ``x`` coordinate of a "reference" or
   *  challenge point, from which the ``y`` can be computed.
   */
  get r() {
    return l(this, hs);
  }
  set r(e) {
    m(Zr(e) === 32, "invalid r", "value", e), f(this, hs, P(e));
  }
  /**
   *  The ``s`` value for a signature.
   */
  get s() {
    return l(this, ds);
  }
  set s(e) {
    m(Zr(e) === 32, "invalid s", "value", e);
    const t = P(e);
    m(parseInt(t.substring(0, 3)) < 8, "non-canonical s", "value", t), f(this, ds, t);
  }
  /**
   *  The ``v`` value for a signature.
   *
   *  Since a given ``x`` value for ``r`` has two possible values for
   *  its correspondin ``y``, the ``v`` indicates which of the two ``y``
   *  values to use.
   *
   *  It is normalized to the values ``27`` or ``28`` for legacy
   *  purposes.
   */
  get v() {
    return l(this, fs);
  }
  set v(e) {
    const t = L(e, "value");
    m(t === 27 || t === 28, "invalid v", "v", e), f(this, fs, t);
  }
  /**
   *  The EIP-155 ``v`` for legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get networkV() {
    return l(this, nr);
  }
  /**
   *  The chain ID for EIP-155 legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get legacyChainId() {
    const e = this.networkV;
    return e == null ? null : nt.getChainId(e);
  }
  /**
   *  The ``yParity`` for the signature.
   *
   *  See ``v`` for more details on how this value is used.
   */
  get yParity() {
    return this.v === 27 ? 0 : 1;
  }
  /**
   *  The [[link-eip-2098]] compact representation of the ``yParity``
   *  and ``s`` compacted into a single ``bytes32``.
   */
  get yParityAndS() {
    const e = H(this.s);
    return this.yParity && (e[0] |= 128), P(e);
  }
  /**
   *  The [[link-eip-2098]] compact representation.
   */
  get compactSerialized() {
    return ne([this.r, this.yParityAndS]);
  }
  /**
   *  The serialized representation.
   */
  get serialized() {
    return ne([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Signature { r: "${this.r}", s: "${this.s}", yParity: ${this.yParity}, networkV: ${this.networkV} }`;
  }
  /**
   *  Returns a new identical [[Signature]].
   */
  clone() {
    const e = new nt(Or, this.r, this.s, this.v);
    return this.networkV && f(e, nr, this.networkV), e;
  }
  /**
   *  Returns a representation that is compatible with ``JSON.stringify``.
   */
  toJSON() {
    const e = this.networkV;
    return {
      _type: "signature",
      networkV: e != null ? e.toString() : null,
      r: this.r,
      s: this.s,
      v: this.v
    };
  }
  /**
   *  Compute the chain ID from the ``v`` in a legacy EIP-155 transactions.
   *
   *  @example:
   *    Signature.getChainId(45)
   *    //_result:
   *
   *    Signature.getChainId(46)
   *    //_result:
   */
  static getChainId(e) {
    const t = R(e, "v");
    return t == Pl || t == Sl ? vl : (m(t >= la, "invalid EIP-155 v", "v", e), (t - la) / Nl);
  }
  /**
   *  Compute the ``v`` for a chain ID for a legacy EIP-155 transactions.
   *
   *  Legacy transactions which use [[link-eip-155]] hijack the ``v``
   *  property to include the chain ID.
   *
   *  @example:
   *    Signature.getChainIdV(5, 27)
   *    //_result:
   *
   *    Signature.getChainIdV(5, 28)
   *    //_result:
   *
   */
  static getChainIdV(e, t) {
    return R(e) * Nl + BigInt(35 + t - 27);
  }
  /**
   *  Compute the normalized legacy transaction ``v`` from a ``yParirty``,
   *  a legacy transaction ``v`` or a legacy [[link-eip-155]] transaction.
   *
   *  @example:
   *    // The values 0 and 1 imply v is actually yParity
   *    Signature.getNormalizedV(0)
   *    //_result:
   *
   *    // Legacy non-EIP-1559 transaction (i.e. 27 or 28)
   *    Signature.getNormalizedV(27)
   *    //_result:
   *
   *    // Legacy EIP-155 transaction (i.e. >= 35)
   *    Signature.getNormalizedV(46)
   *    //_result:
   *
   *    // Invalid values throw
   *    Signature.getNormalizedV(5)
   *    //_error:
   */
  static getNormalizedV(e) {
    const t = R(e);
    return t === vl || t === Pl ? 27 : t === Il || t === Sl ? 28 : (m(t >= la, "invalid v", "v", e), t & Il ? 27 : 28);
  }
  /**
   *  Creates a new [[Signature]].
   *
   *  If no %%sig%% is provided, a new [[Signature]] is created
   *  with default values.
   *
   *  If %%sig%% is a string, it is parsed.
   */
  static from(e) {
    function t(u, h) {
      m(u, h, "signature", e);
    }
    if (e == null)
      return new nt(Or, Cl, Cl, 27);
    if (typeof e == "string") {
      const u = H(e, "signature");
      if (u.length === 64) {
        const h = P(u.slice(0, 32)), p = u.slice(32, 64), d = p[0] & 128 ? 28 : 27;
        return p[0] &= 127, new nt(Or, h, P(p), d);
      }
      if (u.length === 65) {
        const h = P(u.slice(0, 32)), p = u.slice(32, 64);
        t((p[0] & 128) === 0, "non-canonical s");
        const d = nt.getNormalizedV(u[64]);
        return new nt(Or, h, P(p), d);
      }
      t(!1, "invalid raw signature length");
    }
    if (e instanceof nt)
      return e.clone();
    const n = e.r;
    t(n != null, "missing r");
    const s = kl(n), i = function(u, h) {
      if (u != null)
        return kl(u);
      if (h != null) {
        t(V(h, 32), "invalid yParityAndS");
        const p = H(h);
        return p[0] &= 127, P(p);
      }
      t(!1, "missing s");
    }(e.s, e.yParityAndS);
    t((H(i)[0] & 128) == 0, "non-canonical s");
    const { networkV: a, v: o } = function(u, h, p) {
      if (u != null) {
        const d = R(u);
        return {
          networkV: d >= la ? d : void 0,
          v: nt.getNormalizedV(d)
        };
      }
      if (h != null)
        return t(V(h, 32), "invalid yParityAndS"), { v: H(h)[0] & 128 ? 28 : 27 };
      if (p != null) {
        switch (L(p, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        t(!1, "invalid yParity");
      }
      t(!1, "missing v");
    }(e.v, e.yParityAndS, e.yParity), c = new nt(Or, s, i, o);
    return a && f(c, nr, a), t(e.yParity == null || L(e.yParity, "sig.yParity") === c.yParity, "yParity mismatch"), t(e.yParityAndS == null || e.yParityAndS === c.yParityAndS, "yParityAndS mismatch"), c;
  }
};
hs = new WeakMap(), ds = new WeakMap(), fs = new WeakMap(), nr = new WeakMap();
let dt = nt;
var zt;
const Wn = class Wn {
  /**
   *  Creates a new **SigningKey** for %%privateKey%%.
   */
  constructor(e) {
    y(this, zt, void 0);
    m(Zr(e) === 32, "invalid private key", "privateKey", "[REDACTED]"), f(this, zt, P(e));
  }
  /**
   *  The private key.
   */
  get privateKey() {
    return l(this, zt);
  }
  /**
   *  The uncompressed public key.
   *
   * This will always begin with the prefix ``0x04`` and be 132
   * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
   */
  get publicKey() {
    return Wn.computePublicKey(l(this, zt));
  }
  /**
   *  The compressed public key.
   *
   *  This will always begin with either the prefix ``0x02`` or ``0x03``
   *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
   *  nibbles)
   */
  get compressedPublicKey() {
    return Wn.computePublicKey(l(this, zt), !0);
  }
  /**
   *  Return the signature of the signed %%digest%%.
   */
  sign(e) {
    m(Zr(e) === 32, "invalid digest length", "digest", e);
    const t = Dn.sign(ke(e), ke(l(this, zt)), {
      lowS: !0
    });
    return dt.from({
      r: _n(t.r, 32),
      s: _n(t.s, 32),
      v: t.recovery ? 28 : 27
    });
  }
  /**
   *  Returns the [[link-wiki-ecdh]] shared secret between this
   *  private key and the %%other%% key.
   *
   *  The %%other%% key may be any type of key, a raw public key,
   *  a compressed/uncompressed pubic key or aprivate key.
   *
   *  Best practice is usually to use a cryptographic hash on the
   *  returned value before using it as a symetric secret.
   *
   *  @example:
   *    sign1 = new SigningKey(id("some-secret-1"))
   *    sign2 = new SigningKey(id("some-secret-2"))
   *
   *    // Notice that privA.computeSharedSecret(pubB)...
   *    sign1.computeSharedSecret(sign2.publicKey)
   *    //_result:
   *
   *    // ...is equal to privB.computeSharedSecret(pubA).
   *    sign2.computeSharedSecret(sign1.publicKey)
   *    //_result:
   */
  computeSharedSecret(e) {
    const t = Wn.computePublicKey(e);
    return P(Dn.getSharedSecret(ke(l(this, zt)), H(t), !1));
  }
  /**
   *  Compute the public key for %%key%%, optionally %%compressed%%.
   *
   *  The %%key%% may be any type of key, a raw public key, a
   *  compressed/uncompressed public key or private key.
   *
   *  @example:
   *    sign = new SigningKey(id("some-secret"));
   *
   *    // Compute the uncompressed public key for a private key
   *    SigningKey.computePublicKey(sign.privateKey)
   *    //_result:
   *
   *    // Compute the compressed public key for a private key
   *    SigningKey.computePublicKey(sign.privateKey, true)
   *    //_result:
   *
   *    // Compute the uncompressed public key
   *    SigningKey.computePublicKey(sign.publicKey, false);
   *    //_result:
   *
   *    // Compute the Compressed a public key
   *    SigningKey.computePublicKey(sign.publicKey, true);
   *    //_result:
   */
  static computePublicKey(e, t) {
    let n = H(e, "key");
    if (n.length === 32) {
      const i = Dn.getPublicKey(n, !!t);
      return P(i);
    }
    if (n.length === 64) {
      const i = new Uint8Array(65);
      i[0] = 4, i.set(n, 1), n = i;
    }
    const s = Dn.ProjectivePoint.fromHex(n);
    return P(s.toRawBytes(t));
  }
  /**
   *  Returns the public key for the private key which produced the
   *  %%signature%% for the given %%digest%%.
   *
   *  @example:
   *    key = new SigningKey(id("some-secret"))
   *    digest = id("hello world")
   *    sig = key.sign(digest)
   *
   *    // Notice the signer public key...
   *    key.publicKey
   *    //_result:
   *
   *    // ...is equal to the recovered public key
   *    SigningKey.recoverPublicKey(digest, sig)
   *    //_result:
   *
   */
  static recoverPublicKey(e, t) {
    m(Zr(e) === 32, "invalid digest length", "digest", e);
    const n = dt.from(t);
    let s = Dn.Signature.fromCompact(ke(ne([n.r, n.s])));
    s = s.addRecoveryBit(n.yParity);
    const i = s.recoverPublicKey(ke(e));
    return m(i != null, "invalid signautre for digest", "signature", t), "0x" + i.toHex(!1);
  }
  /**
   *  Returns the point resulting from adding the ellipic curve points
   *  %%p0%% and %%p1%%.
   *
   *  This is not a common function most developers should require, but
   *  can be useful for certain privacy-specific techniques.
   *
   *  For example, it is used by [[HDNodeWallet]] to compute child
   *  addresses from parent public keys and chain codes.
   */
  static addPoints(e, t, n) {
    const s = Dn.ProjectivePoint.fromHex(Wn.computePublicKey(e).substring(2)), i = Dn.ProjectivePoint.fromHex(Wn.computePublicKey(t).substring(2));
    return "0x" + s.add(i).toHex(!!n);
  }
};
zt = new WeakMap();
let mi = Wn;
const Wf = BigInt(0), jf = BigInt(36);
function Rl(r) {
  r = r.toLowerCase();
  const e = r.substring(2).split(""), t = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    t[s] = e[s].charCodeAt(0);
  const n = H(se(t));
  for (let s = 0; s < 40; s += 2)
    n[s >> 1] >> 4 >= 8 && (e[s] = e[s].toUpperCase()), (n[s >> 1] & 15) >= 8 && (e[s + 1] = e[s + 1].toUpperCase());
  return "0x" + e.join("");
}
const Bc = {};
for (let r = 0; r < 10; r++)
  Bc[String(r)] = String(r);
for (let r = 0; r < 26; r++)
  Bc[String.fromCharCode(65 + r)] = String(10 + r);
const xl = 15;
function Vf(r) {
  r = r.toUpperCase(), r = r.substring(4) + r.substring(0, 2) + "00";
  let e = r.split("").map((n) => Bc[n]).join("");
  for (; e.length >= xl; ) {
    let n = e.substring(0, xl);
    e = parseInt(n, 10) % 97 + e.substring(n.length);
  }
  let t = String(98 - parseInt(e, 10) % 97);
  for (; t.length < 2; )
    t = "0" + t;
  return t;
}
const Kf = function() {
  const r = {};
  for (let e = 0; e < 36; e++) {
    const t = "0123456789abcdefghijklmnopqrstuvwxyz"[e];
    r[t] = BigInt(e);
  }
  return r;
}();
function Qf(r) {
  r = r.toLowerCase();
  let e = Wf;
  for (let t = 0; t < r.length; t++)
    e = e * jf + Kf[r[t]];
  return e;
}
function F(r) {
  if (m(typeof r == "string", "invalid address", "address", r), r.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    r.startsWith("0x") || (r = "0x" + r);
    const e = Rl(r);
    return m(!r.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || e === r, "bad address checksum", "address", r), e;
  }
  if (r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    m(r.substring(2, 4) === Vf(r), "bad icap checksum", "address", r);
    let e = Qf(r.substring(4)).toString(16);
    for (; e.length < 40; )
      e = "0" + e;
    return Rl("0x" + e);
  }
  m(!1, "invalid address", "address", r);
}
function zf(r) {
  const e = F(r.from);
  let n = R(r.nonce, "tx.nonce").toString(16);
  return n === "0" ? n = "0x" : n.length % 2 ? n = "0x0" + n : n = "0x" + n, F(Y(se(Er([e, n])), 12));
}
function ah(r) {
  return r && typeof r.getAddress == "function";
}
async function Fo(r, e) {
  const t = await e;
  return (t == null || t === "0x0000000000000000000000000000000000000000") && (E(typeof r != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: r }), m(!1, "invalid AddressLike value; did not resolve to a value address", "target", r)), F(t);
}
function Te(r, e) {
  if (typeof r == "string")
    return r.match(/^0x[0-9a-f]{40}$/i) ? F(r) : (E(e != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), Fo(r, e.resolveName(r)));
  if (ah(r))
    return Fo(r, r.getAddress());
  if (r && typeof r.then == "function")
    return Fo(r, r);
  m(!1, "unsupported addressable value", "target", r);
}
const Ut = {};
function N(r, e) {
  let t = !1;
  return e < 0 && (t = !0, e *= -1), new Ee(Ut, `${t ? "" : "u"}int${e}`, r, { signed: t, width: e });
}
function G(r, e) {
  return new Ee(Ut, `bytes${e || ""}`, r, { size: e });
}
const Tl = Symbol.for("_ethers_typed");
var rr;
const Ft = class Ft {
  /**
   *  @_ignore:
   */
  constructor(e, t, n, s) {
    /**
     *  The type, as a Solidity-compatible type.
     */
    w(this, "type");
    /**
     *  The actual value.
     */
    w(this, "value");
    y(this, rr, void 0);
    /**
     *  @_ignore:
     */
    w(this, "_typedSymbol");
    s == null && (s = null), qi(Ut, e, "Typed"), O(this, { _typedSymbol: Tl, type: t, value: n }), f(this, rr, s), this.format();
  }
  /**
   *  Format the type as a Human-Readable type.
   */
  format() {
    if (this.type === "array")
      throw new Error("");
    if (this.type === "dynamicArray")
      throw new Error("");
    return this.type === "tuple" ? `tuple(${this.value.map((e) => e.format()).join(",")})` : this.type;
  }
  /**
   *  The default value returned by this type.
   */
  defaultValue() {
    return 0;
  }
  /**
   *  The minimum value for numeric types.
   */
  minValue() {
    return 0;
  }
  /**
   *  The maximum value for numeric types.
   */
  maxValue() {
    return 0;
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedBigInt]].
   */
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedData]].
   */
  isData() {
    return this.type.startsWith("bytes");
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedString]].
   */
  isString() {
    return this.type === "string";
  }
  /**
   *  Returns the tuple name, if this is a tuple. Throws otherwise.
   */
  get tupleName() {
    if (this.type !== "tuple")
      throw TypeError("not a tuple");
    return l(this, rr);
  }
  // Returns the length of this type as an array
  // - `null` indicates the length is unforced, it could be dynamic
  // - `-1` indicates the length is dynamic
  // - any other value indicates it is a static array and is its length
  /**
   *  Returns the length of the array type or ``-1`` if it is dynamic.
   *
   *  Throws if the type is not an array.
   */
  get arrayLength() {
    if (this.type !== "array")
      throw TypeError("not an array");
    return l(this, rr) === !0 ? -1 : l(this, rr) === !1 ? this.value.length : null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(e, t) {
    return new Ft(Ut, e, t);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(e) {
    return N(e, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(e) {
    return N(e, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(e) {
    return N(e, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(e) {
    return N(e, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(e) {
    return N(e, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(e) {
    return N(e, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(e) {
    return N(e, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(e) {
    return N(e, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(e) {
    return N(e, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(e) {
    return N(e, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(e) {
    return N(e, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(e) {
    return N(e, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(e) {
    return N(e, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(e) {
    return N(e, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(e) {
    return N(e, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(e) {
    return N(e, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(e) {
    return N(e, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(e) {
    return N(e, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(e) {
    return N(e, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(e) {
    return N(e, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(e) {
    return N(e, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(e) {
    return N(e, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(e) {
    return N(e, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(e) {
    return N(e, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(e) {
    return N(e, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(e) {
    return N(e, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(e) {
    return N(e, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(e) {
    return N(e, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(e) {
    return N(e, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(e) {
    return N(e, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(e) {
    return N(e, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(e) {
    return N(e, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(e) {
    return N(e, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(e) {
    return N(e, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(e) {
    return N(e, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(e) {
    return N(e, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(e) {
    return N(e, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(e) {
    return N(e, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(e) {
    return N(e, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(e) {
    return N(e, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(e) {
    return N(e, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(e) {
    return N(e, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(e) {
    return N(e, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(e) {
    return N(e, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(e) {
    return N(e, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(e) {
    return N(e, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(e) {
    return N(e, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(e) {
    return N(e, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(e) {
    return N(e, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(e) {
    return N(e, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(e) {
    return N(e, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(e) {
    return N(e, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(e) {
    return N(e, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(e) {
    return N(e, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(e) {
    return N(e, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(e) {
    return N(e, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(e) {
    return N(e, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(e) {
    return N(e, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(e) {
    return N(e, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(e) {
    return N(e, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(e) {
    return N(e, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(e) {
    return N(e, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(e) {
    return N(e, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(e) {
    return N(e, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(e) {
    return N(e, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(e) {
    return N(e, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(e) {
    return G(e, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(e) {
    return G(e, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(e) {
    return G(e, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(e) {
    return G(e, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(e) {
    return G(e, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(e) {
    return G(e, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(e) {
    return G(e, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(e) {
    return G(e, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(e) {
    return G(e, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(e) {
    return G(e, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(e) {
    return G(e, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(e) {
    return G(e, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(e) {
    return G(e, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(e) {
    return G(e, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(e) {
    return G(e, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(e) {
    return G(e, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(e) {
    return G(e, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(e) {
    return G(e, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(e) {
    return G(e, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(e) {
    return G(e, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(e) {
    return G(e, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(e) {
    return G(e, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(e) {
    return G(e, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(e) {
    return G(e, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(e) {
    return G(e, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(e) {
    return G(e, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(e) {
    return G(e, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(e) {
    return G(e, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(e) {
    return G(e, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(e) {
    return G(e, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(e) {
    return G(e, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(e) {
    return G(e, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(e) {
    return new Ft(Ut, "address", e);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(e) {
    return new Ft(Ut, "bool", !!e);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(e) {
    return new Ft(Ut, "bytes", e);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(e) {
    return new Ft(Ut, "string", e);
  }
  /**
   *  Return a new ``array`` type for %%v%%, allowing %%dynamic%% length.
   */
  static array(e, t) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``tuple`` type for %%v%%, with the optional %%name%%.
   */
  static tuple(e, t) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static overrides(e) {
    return new Ft(Ut, "overrides", Object.assign({}, e));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(e) {
    return e && typeof e == "object" && "_typedSymbol" in e && e._typedSymbol === Tl;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(e, t) {
    if (Ft.isTyped(e)) {
      if (e.type !== t)
        throw new Error(`invalid type: expecetd ${t}, got ${e.type}`);
      return e.value;
    }
    return e;
  }
};
rr = new WeakMap();
let Ee = Ft;
class Jf extends on {
  constructor(e) {
    super("address", "address", e, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(e, t) {
    let n = Ee.dereference(t, "string");
    try {
      n = F(n);
    } catch (s) {
      return this._throwError(s.message, t);
    }
    return e.writeValue(n);
  }
  decode(e) {
    return F(_n(e.readValue(), 20));
  }
}
class qf extends on {
  constructor(t) {
    super(t.name, t.type, "_", t.dynamic);
    w(this, "coder");
    this.coder = t;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(t, n) {
    return this.coder.encode(t, n);
  }
  decode(t) {
    return this.coder.decode(t);
  }
}
function oh(r, e, t) {
  let n = [];
  if (Array.isArray(t))
    n = t;
  else if (t && typeof t == "object") {
    let c = {};
    n = e.map((u) => {
      const h = u.localName;
      return E(h, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: u }, value: t }), E(!c[h], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: u }, value: t }), c[h] = !0, t[h];
    });
  } else
    m(!1, "invalid tuple value", "tuple", t);
  m(e.length === n.length, "types/value length mismatch", "tuple", t);
  let s = new uc(), i = new uc(), a = [];
  e.forEach((c, u) => {
    let h = n[u];
    if (c.dynamic) {
      let p = i.length;
      c.encode(i, h);
      let d = s.writeUpdatableValue();
      a.push((g) => {
        d(g + p);
      });
    } else
      c.encode(s, h);
  }), a.forEach((c) => {
    c(s.length);
  });
  let o = r.appendWriter(s);
  return o += r.appendWriter(i), o;
}
function ch(r, e) {
  let t = [], n = [], s = r.subReader(0);
  return e.forEach((i) => {
    let a = null;
    if (i.dynamic) {
      let o = r.readIndex(), c = s.subReader(o);
      try {
        a = i.decode(c);
      } catch (u) {
        if (Ae(u, "BUFFER_OVERRUN"))
          throw u;
        a = u, a.baseType = i.name, a.name = i.localName, a.type = i.type;
      }
    } else
      try {
        a = i.decode(r);
      } catch (o) {
        if (Ae(o, "BUFFER_OVERRUN"))
          throw o;
        a = o, a.baseType = i.name, a.name = i.localName, a.type = i.type;
      }
    if (a == null)
      throw new Error("investigate");
    t.push(a), n.push(i.localName || null);
  }), zs.fromItems(t, n);
}
class Zf extends on {
  constructor(t, n, s) {
    const i = t.type + "[" + (n >= 0 ? n : "") + "]", a = n === -1 || t.dynamic;
    super("array", i, s, a);
    w(this, "coder");
    w(this, "length");
    O(this, { coder: t, length: n });
  }
  defaultValue() {
    const t = this.coder.defaultValue(), n = [];
    for (let s = 0; s < this.length; s++)
      n.push(t);
    return n;
  }
  encode(t, n) {
    const s = Ee.dereference(n, "array");
    Array.isArray(s) || this._throwError("expected array value", s);
    let i = this.length;
    i === -1 && (i = s.length, t.writeValue(s.length)), Uu(s.length, i, "coder array" + (this.localName ? " " + this.localName : ""));
    let a = [];
    for (let o = 0; o < s.length; o++)
      a.push(this.coder);
    return oh(t, a, s);
  }
  decode(t) {
    let n = this.length;
    n === -1 && (n = t.readIndex(), E(n * xe <= t.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: t.bytes, offset: n * xe, length: t.dataLength }));
    let s = [];
    for (let i = 0; i < n; i++)
      s.push(new qf(this.coder));
    return ch(t, s);
  }
}
class Yf extends on {
  constructor(e) {
    super("bool", "bool", e, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(e, t) {
    const n = Ee.dereference(t, "bool");
    return e.writeValue(n ? 1 : 0);
  }
  decode(e) {
    return !!e.readValue();
  }
}
class lh extends on {
  constructor(e, t) {
    super(e, e, t, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(e, t) {
    t = ke(t);
    let n = e.writeValue(t.length);
    return n += e.writeBytes(t), n;
  }
  decode(e) {
    return e.readBytes(e.readIndex(), !0);
  }
}
class $f extends lh {
  constructor(e) {
    super("bytes", e);
  }
  decode(e) {
    return P(super.decode(e));
  }
}
class Xf extends on {
  constructor(t, n) {
    let s = "bytes" + String(t);
    super(s, s, n, !1);
    w(this, "size");
    O(this, { size: t }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(t, n) {
    let s = ke(Ee.dereference(n, this.type));
    return s.length !== this.size && this._throwError("incorrect data length", n), t.writeBytes(s);
  }
  decode(t) {
    return P(t.readBytes(this.size));
  }
}
const ep = new Uint8Array([]);
class tp extends on {
  constructor(e) {
    super("null", "", e, !1);
  }
  defaultValue() {
    return null;
  }
  encode(e, t) {
    return t != null && this._throwError("not null", t), e.writeBytes(ep);
  }
  decode(e) {
    return e.readBytes(0), null;
  }
}
const np = BigInt(0), rp = BigInt(1), sp = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class ip extends on {
  constructor(t, n, s) {
    const i = (n ? "int" : "uint") + t * 8;
    super(i, i, s, !1);
    w(this, "size");
    w(this, "signed");
    O(this, { size: t, signed: n }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(t, n) {
    let s = R(Ee.dereference(n, this.type)), i = Vn(sp, xe * 8);
    if (this.signed) {
      let a = Vn(i, this.size * 8 - 1);
      (s > a || s < -(a + rp)) && this._throwError("value out-of-bounds", n), s = Gu(s, 8 * xe);
    } else
      (s < np || s > Vn(i, this.size * 8)) && this._throwError("value out-of-bounds", n);
    return t.writeValue(s);
  }
  decode(t) {
    let n = Vn(t.readValue(), this.size * 8);
    return this.signed && (n = _a(n, this.size * 8)), n;
  }
}
class ap extends lh {
  constructor(e) {
    super("string", e);
  }
  defaultValue() {
    return "";
  }
  encode(e, t) {
    return super.encode(e, xt(Ee.dereference(t, "string")));
  }
  decode(e) {
    return La(super.decode(e));
  }
}
class ua extends on {
  constructor(t, n) {
    let s = !1;
    const i = [];
    t.forEach((o) => {
      o.dynamic && (s = !0), i.push(o.type);
    });
    const a = "tuple(" + i.join(",") + ")";
    super("tuple", a, n, s);
    w(this, "coders");
    O(this, { coders: Object.freeze(t.slice()) });
  }
  defaultValue() {
    const t = [];
    this.coders.forEach((s) => {
      t.push(s.defaultValue());
    });
    const n = this.coders.reduce((s, i) => {
      const a = i.localName;
      return a && (s[a] || (s[a] = 0), s[a]++), s;
    }, {});
    return this.coders.forEach((s, i) => {
      let a = s.localName;
      !a || n[a] !== 1 || (a === "length" && (a = "_length"), t[a] == null && (t[a] = t[i]));
    }), Object.freeze(t);
  }
  encode(t, n) {
    const s = Ee.dereference(n, "tuple");
    return oh(t, this.coders, s);
  }
  decode(t) {
    return ch(t, this.coders);
  }
}
function Cr(r) {
  return se(xt(r));
}
var op = "AEEUdwmgDS8BxQKKAP4BOgDjATAAngDUAIMAoABoAOAAagCOAEQAhABMAHIAOwA9ACsANgAmAGIAHgAuACgAJwAXAC0AGgAjAB8ALwAUACkAEgAeAAkAGwARABkAFgA5ACgALQArADcAFQApABAAHgAiABAAGgAeABMAGAUhBe8BFxREN8sF2wC5AK5HAW8ArQkDzQCuhzc3NzcBP68NEfMABQdHBuw5BV8FYAA9MzkI9r4ZBg7QyQAWA9CeOwLNCjcCjqkChuA/lm+RAsXTAoP6ASfnEQDytQFJAjWVCkeXAOsA6godAB/cwdAUE0WlBCN/AQUCQRjFD/MRBjHxDQSJbw0jBzUAswBxme+tnIcAYwabAysG8QAjAEMMmxcDqgPKQyDXCMMxA7kUQwD3NXOrAKmFIAAfBC0D3x4BJQDBGdUFAhEgVD8JnwmQJiNWYUzrg0oAGwAUAB0AFnNcACkAFgBP9h3gPfsDOWDKneY2ChglX1UDYD30ABsAFAAdABZzIGRAnwDD8wAjAEEMzRbDqgMB2sAFYwXqAtCnAsS4AwpUJKRtFHsadUz9AMMVbwLpABM1NJEX0ZkCgYMBEyMAxRVvAukAEzUBUFAtmUwSAy4DBTER33EftQHfSwB5MxJ/AjkWKQLzL8E/cwBB6QH9LQDPDtO9ASNriQC5DQANAwCK21EFI91zHwCoL9kBqQcHBwcHKzUDowBvAQohPvU3fAQgHwCyAc8CKQMA5zMSezr7ULgFmDp/LzVQBgEGAi8FYQVgt8AFcTtlQhpCWEmfe5tmZ6IAExsDzQ8t+X8rBKtTAltbAn0jsy8Bl6utPWMDTR8Ei2kRANkDBrNHNysDBzECQWUAcwFpJ3kAiyUhAJ0BUb8AL3EfAbfNAz81KUsFWwF3YQZtAm0A+VEfAzEJDQBRSQCzAQBlAHsAM70GD/v3IZWHBwARKQAxALsjTwHZAeMPEzmXgIHwABIAGQA8AEUAQDt3gdvIEGcQZAkGTRFMdEIVEwK0D64L7REdDNkq09PgADSxB/MDWwfzA1sDWwfzB/MDWwfzA1sDWwNbA1scEvAi28gQZw9QBHUFlgWTBN4IiyZREYkHMAjaVBV0JhxPA00BBCMtSSQ7mzMTJUpMFE0LCAQ2SmyvfUADTzGzVP2QqgPTMlc5dAkGHnkSqAAyD3skNb1OhnpPcagKU0+2tYdJak5vAsY6sEAACikJm2/Dd1YGRRAfJ6kQ+ww3AbkBPw3xS9wE9QY/BM0fgRkdD9GVoAipLeEM8SbnLqWAXiP5KocF8Uv4POELUVFsD10LaQnnOmeBUgMlAREijwrhDT0IcRD3Cs1vDekRSQc9A9lJngCpBwULFR05FbkmFGKwCw05ewb/GvoLkyazEy17AAXXGiUGUQEtGwMA0y7rhbRaNVwgT2MGBwspI8sUrFAkDSlAu3hMGh8HGSWtApVDdEqLUToelyH6PEENai4XUYAH+TwJGVMLhTyiRq9FEhHWPpE9TCJNTDAEOYMsMyePCdMPiQy9fHYBXQklCbUMdRM1ERs3yQg9Bx0xlygnGQglRplgngT7owP3E9UDDwVDCUUHFwO5HDETMhUtBRGBKNsC9zbZLrcCk1aEARsFzw8pH+MQVEfkDu0InwJpA4cl7wAxFSUAGyKfCEdnAGOP3FMJLs8Iy2pwI3gDaxTrZRF3B5UOWwerHDcVwxzlcMxeD4YMKKezCV8BeQmdAWME5wgNNV+MpCBFZ1eLXBifIGVBQ14AAjUMaRWjRMGHfAKPD28SHwE5AXcHPQ0FAnsR8RFvEJkI74YINbkz/DopBFMhhyAVCisDU2zSCysm/Qz8bQGnEmYDEDRBd/Jnr2C6KBgBBx0yyUFkIfULlk/RDKAaxRhGVDIZ6AfDA/ca9yfuQVsGAwOnBxc6UTPyBMELbQiPCUMATQ6nGwfbGG4KdYzUATWPAbudA1uVhwJzkwY7Bw8Aaw+LBX3pACECqwinAAkA0wNbAD0CsQehAB0AiUUBQQMrMwEl6QKTA5cINc8BmTMB9y0EH8cMGQD7O25OAsO1AoBuZqYF4VwCkgJNOQFRKQQJUktVA7N15QDfAE8GF+NLARmvTs8e50cB43MvAMsA/wAJOQcJRQHRAfdxALsBYws1Caa3uQFR7S0AhwAZbwHbAo0A4QA5AIP1AVcAUQVd/QXXAlNNARU1HC9bZQG/AyMBNwERAH0Gz5GpzQsjBHEH1wIQHxXlAu8yB7kFAyLjE9FCyQK94lkAMhoKPAqrCqpgX2Q3CjV2PVQAEh+sPss/UgVVO1c7XDtXO1w7VztcO1c7XDtXO1wDm8Pmw+YKcF9JYe8Mqg3YRMw6TRPfYFVgNhPMLbsUxRXSJVoZQRrAJwkl6FUNDwgt12Y0CDA0eRfAAEMpbINFY4oeNApPHOtTlVT8LR8AtUumM7MNsBsZREQFS3XxYi4WEgomAmSFAmJGX1GzAV83JAKh+wJonAJmDQKfiDgfDwJmPwJmKgRyBIMDfxcDfpY5Cjl7GzmGOicnAmwhAjI6OA4CbcsCbbLzjgM3a0kvAWsA4gDlAE4JB5wMkQECD8YAEbkCdzMCdqZDAnlPRwJ4viFg30WyRvcCfEMCeswCfQ0CfPRIBEiBZygALxlJXEpfGRtK0ALRBQLQ0EsrA4hTA4fqRMmRNgLypV0HAwOyS9JMMSkH001QTbMCi0MCitzFHwshR2sJuwKOOwKOYESbhQKO3QKOYHxRuFM5AQ5S2FSJApP/ApMQAO0AIFUiVbNV1AosHymZijLleGpFPz0Cl6MC77ZYJawAXSkClpMCloCgAK1ZsFoNhVEAPwKWuQKWUlxIXNUCmc8CmWhczl0LHQKcnznGOqECnBoCn58CnryOACETNS4TAp31Ap6WALlBYThh8wKe1wKgcgGtAp6jIwKeUqljzGQrKS8CJ7MCJoICoP8CoFDbAqYzAqXSAqgDAIECp/ZogGi1AAdNaiBq1QKs5wKssgKtawKtBgJXIQJV4AKx5dsDH1JsmwKywRECsuwbbORtZ21MYwMl0QK2YD9DbpQDKUkCuGICuUsZArkue3A6cOUCvR0DLbYDMhUCvoxyBgMzdQK+HnMmc1MCw88CwwhzhnRPOUl05AM8qwEDPJ4DPcMCxYACxksCxhSNAshtVQLISALJUwLJMgJkoQLd1nh9ZXiyeSlL1AMYp2cGAmH4GfeVKHsPXpZevxUCz28Cz3AzT1fW9xejAMqxAs93AS3uA04Wfk8JAtwrAtuOAtJTA1JgA1NjAQUDVZCAjUMEzxrxZEl5A4LSg5EC2ssC2eKEFIRNp0ADhqkAMwNkEoZ1Xf0AWQLfaQLevHd7AuIz7RgB8zQrAfSfAfLWiwLr9wLpdH0DAur9AuroAP1LAb0C7o0C66CWrpcHAu5DA4XkmH1w5HGlAvMHAG0DjhqZlwL3FwORcgOSiwL3nAL53QL4apogmq+/O5siA52HAv7+AR8APZ8gAZ+3AwWRA6ZuA6bdANXJAwZuoYyiCQ0DDE0BEwEjB3EGZb1rCQC/BG/DFY8etxEAG3k9ACcDNxJRA42DAWcrJQCM8wAlAOanC6OVCLsGI6fJBgCvBRnDBvElRUYFFoAFcD9GSDNCKUK8X3kZX8QAls0FOgCQVCGbwTsuYDoZutcONxjOGJHJ/gVfBWAFXwVgBWsFYAVfBWAFXwVgBV8FYAVfBWBOHQjfjW8KCgoKbF7xMwTRA7kGN8PDAMMEr8MA70gxFroFTj5xPnhCR0K+X30/X/AAWBkzswCNBsxzzASm70aCRS4rDDMeLz49fnXfcsH5GcoscQFz13Y4HwVnBXLJycnACNdRYwgICAqEXoWTxgA7P4kACxbZBu21Kw0AjMsTAwkVAOVtJUUsJ1JCuULESUArXy9gPi9AKwnJRQYKTD9LPoA+iT54PnkCkULEUUpDX9NWV3JVEjQAc1w3A3IBE3YnX+g7QiMJb6MKaiszRCUuQrNCxDPMCcwEX9EWJzYREBEEBwIHKn6l33JCNVIfybPJtAltydPUCmhBZw/tEKsZAJOVJU1CLRuxbUHOQAo7P0s+eEJHHA8SJVRPdGM0NVrpvBoKhfUlM0JHHGUQUhEWO1xLSj8MO0ucNAqJIzVCRxv9EFsqKyA4OQgNj2nwZgp5ZNFgE2A1K3YHS2AhQQojJmC7DgpzGG1WYFUZCQYHZO9gHWCdYIVgu2BTYJlwFh8GvRbcXbG8YgtDHrMBwzPVyQonHQgkCyYBgQJ0Ajc4nVqIAwGSCsBPIgDsK3SWEtIVBa5N8gGjAo+kVwVIZwD/AEUSCDweX4ITrRQsJ8K3TwBXFDwEAB0TvzVcAtoTS20RIwDgVgZ9BBImYgA5AL4Coi8LFnezOkCnIQFjAY4KBAPh9RcGsgZSBsEAJctdsWIRu2kTkQstRw7DAcMBKgpPBGIGMDAwKCYnKTQaLg4AKRSVAFwCdl+YUZ0JdicFD3lPAdt1F9ZZKCGxuE3yBxkFVGcA/wBFEgiCBwAOLHQSjxOtQDg1z7deFRMAZ8QTAGtKb1ApIiPHADkAvgKiLy1DFtYCmBiDAlDDWNB0eo7fpaMO/aEVRRv0ATEQZBIODyMEAc8JQhCbDRgzFD4TAEMAu9YBCgCsAOkAm5I3ABwAYxvONnR+MhXJAxgKQyxL2+kkJhMbhQKDBMkSsvF0AD9BNQ6uQC7WqSQHwxEAEEIu1hkhAH2z4iQPwyJPHNWpdyYBRSpnJALzoBAEVPPsH20MxA0CCEQKRgAFyAtFAlMNwwjEDUQJRArELtapMg7DDZgJIw+TGukEIwvDFkMAqAtDEMMMBhioe+QAO3MMRAACrgnEBSPY9Q0FDnbSBoMAB8MSYxkSxAEJAPIJAAB8FWMOFtMc/HcXwxhDAC7DAvOowwAewwJdKDKHAAHDAALrFUQVwwAbwyvzpWMWv8wA/ABpAy++bcYDUKPD0KhDCwKmJ1MAAmMA5+UZwxAagwipBRL/eADfw6fDGOMCGsOjk3l6BwOpo4sAEsMOGxMAA5sAbcMOAAvDp0MJGkMDwgipnNIPAwfIqUMGAOGDAAPzABXDAAcDAAnDAGmTABrDAA7DChjDjnEWAwABYwAOcwAuUyYABsMAF8MIKQANUgC6wy4AA8MADqMq8wCyYgAcIwAB8wqpAAXOCx0V4wAHowBCwwEKAGnDAAuDAB3DAAjDCakABdIAbqcZ3QCZCCkABdIAAAFDAAfjAB2jCCkABqIACYMAGzMAbSMA5sOIAAhjAAhDABTDBAkpAAbSAOOTAAlDC6kOzPtnAAdDAG6kQFAATwAKwwwAA0MACbUDPwAHIwAZgwACE6cDAAojAApDAAoDp/MGwwAJIwADEwAQQwgAFEMAEXMAD5MADfMADcMAGRMOFiMAFUMAbqMWuwHDAMIAE0MLAGkzEgDhUwACQwAEWgAXgwUjAAbYABjDBSYBgzBaAEFNALcQBxUMegAwMngBrA0IZgJ0KxQHBREPd1N0ZzKRJwaIHAZqNT4DqQq8BwngAB4DAwt2AX56T1ocKQNXAh1GATQGC3tOxYNagkgAMQA5CQADAQEAWxLjAIOYNAEzAH7tFRk6TglSAF8NAAlYAQ+S1ACAQwQorQBiAN4dAJ1wPyeTANVzuQDX3AIeEMp9eyMgXiUAEdkBkJizKltbVVAaRMqRAAEAhyQ/SDEz6BmfVwB6ATEsOClKIRcDOF0E/832AFNt5AByAnkCRxGCOs94NjXdAwINGBonDBwPALW2AwICAgAAAAAAAAYDBQMDARrUAwAtAAAAAgEGBgYGBgYFBQUFBQUEBQYHCAkEBQUFBQQAAAICAAAAIgCNAJAAlT0A6gC7ANwApEQAwgCyAK0AqADuAKYA2gCjAOcBCAEDAMcAgQBiANIA1AEDAN4A8gCQAKkBMQDqAN8A3AsBCQ8yO9ra2tq8xuLT1tRJOB0BUgFcNU0BWgFpAWgBWwFMUUlLbhMBUxsNEAs6PhMOACcUKy0vMj5AQENDQ0RFFEYGJFdXV1dZWVhZL1pbXVxcI2NnZ2ZoZypsbnZ1eHh4eHh4enp6enp6enp6enp8fH18e2IARPIASQCaAHgAMgBm+ACOAFcAVwA3AnbvAIsABfj4AGQAk/IAnwBPAGIAZP//sACFAIUAaQBWALEAJAC2AIMCQAJDAPwA5wD+AP4A6AD/AOkA6QDoAOYALwJ7AVEBQAE+AVQBPgE+AT4BOQE4ATgBOAEcAVgXADEQCAEAUx8SHgsdHhYAjgCWAKYAUQBqIAIxAHYAbwCXAxUDJzIDIUlGTzEAkQJPAMcCVwKkAMAClgKWApYClgKWApYCiwKWApYClgKWApYClgKVApUCmAKgApcClgKWApQClAKUApQCkgKVAnUB1AKXAp8ClgKWApUeAIETBQD+DQOfAmECOh8BVBg9AuIZEjMbAU4/G1WZAXusRAFpYQEFA0FPAQYAmTEeIJdyADFoAHEANgCRA5zMk/C2jGINwjMWygIZCaXdfDILBCs5dAE7YnQBugDlhoiHhoiGiYqKhouOjIaNkI6Ij4qQipGGkoaThpSSlYaWhpeKmIaZhpqGm4aci52QnoqfhuIC4XTpAt90AIp0LHSoAIsAdHQEQwRABEIERQRDBEkERgRBBEcESQRIBEQERgRJAJ5udACrA490ALxuAQ10ANFZdHQA13QCFHQA/mJ0AP4BIQD+APwA/AD9APwDhGZ03ASMK23HAP4A/AD8AP0A/CR0dACRYnQA/gCRASEA/gCRAvQA/gCRA4RmdNwEjCttxyR0AP9idAEhAP4A/gD8APwA/QD8AP8A/AD8AP0A/AOEZnTcBIwrbcckdHQAkWJ0ASEA/gCRAP4AkQL0AP4AkQOEZnTcBIwrbcckdAJLAT50AlIBQXQCU8l0dAJfdHQDpgL0A6YDpgOnA6cDpwOnA4RmdNwEjCttxyR0dACRYnQBIQOmAJEDpgCRAvQDpgCRA4RmdNwEjCttxyR0BDh0AJEEOQCRDpU5dSgCADR03gV2CwArdAEFAM5iCnR0AF1iAAYcOgp0dACRCnQAXAEIwWZ0CnRmdHQAkWZ0CnRmdEXgAFF03gp0dEY0tlT2u3SOAQTwscwhjZZKrhYcBSfFp9XNbKiVDOD2b+cpe4/Z17mQnbtzzhaeQtE2GGj0IDNTjRUSyTxxw/RPHW/+vS7d1NfRt9z9QPZg4X7QFfhCnkvgNPIItOsC2eV6hPannZNHlZ9xrwZXIMOlu3jSoQSq78WEjwLjw1ELSlF1aBvfzwk5ZX7AUvQzjPQKbDuQ+sm4wNOp4A6AdVuRS0t1y/DZpg4R6m7FNjM9HgvW7Bi88zaMjOo6lM8wtBBdj8LP4ylv3zCXPhebMKJc066o9sF71oFW/8JXu86HJbwDID5lzw5GWLR/LhT0Qqnp2JQxNZNfcbLIzPy+YypqRm/lBmGmex+82+PisxUumSeJkALIT6rJezxMH+CTJmQtt5uwTVbL3ptmjDUQzlSIvWi8Tl7ng1NpuRn1Ng4n14Qc+3Iil7OwkvNWogLSPkn3pihIFytyIGmMhOe3n1tWsuMy9BdKyqF4Z3v2SgggTL9KVvMXPnCbRe+oOuFFP3HejBG/w9gvmfNYvg6JuWia2lcSSN1uIjBktzoIazOHPJZ7kKHPz8mRWVdW3lA8WGF9dQF6Bm673boov3BUWDU2JNcahR23GtfHKLOz/viZ+rYnZFaIznXO67CYEJ1fXuTRpZhYZkKe54xeoagkNGLs+NTZHE0rX45/XvQ2RGADX6vcAvdxIUBV27wxGm2zjZo4X3ILgAlrOFheuZ6wtsvaIj4yLY7qqawlliaIcrz2G+c3vscAnCkCuMzMmZvMfu9lLwTvfX+3cVSyPdN9ZwgDZhfjRgNJcLiJ67b9xx8JHswprbiE3v9UphotAPIgnXVIN5KmMc0piXhc6cChPnN+MRhG9adtdttQTTwSIpl8I4/j//d3sz1326qTBTpPRM/Hgh3kzqEXs8ZAk4ErQhNO8hzrQ0DLkWMA/N+91tn2MdOJnWC2FCZehkQrwzwbKOjhvZsbM95QoeL9skYyMf4srVPVJSgg7pOLUtr/n9eT99oe9nLtFRpjA9okV2Kj8h9k5HaC0oivRD8VyXkJ81tcd4fHNXPCfloIQasxsuO18/46dR2jgul/UIet2G0kRvnyONMKhHs6J26FEoqSqd+rfYjeEGwHWVDpX1fh1jBBcKGMqRepju9Y00mDVHC+Xdij/j44rKfvfjGinNs1jO/0F3jB83XCDINN/HB84axlP+3E/klktRo+vl3U/aiyMJbIodE1XSsDn6UAzIoMtUObY2+k/4gY/l+AkZJ5Sj2vQrkyLm3FoxjhDX+31UXBFf9XrAH31fFqoBmDEZvhvvpnZ87N+oZEu7U9O/nnk+QWj3x8uyoRbEnf+O5UMr9i0nHP38IF5AvzrBW8YWBUR0mIAzIvndQq9N3v/Jto3aPjPXUPl8ASdPPyAp7jENf8bk7VMM9ol9XGmlBmeDMuGqt+WzuL6CXAxXjIhCPM5vACchgMJ/8XBGLO/D1isVvGhwwHHr1DLaI5mn2Jr/b1pUD90uciDaS8cXNDzCWvNmT/PhQe5e8nTnnnkt8Ds/SIjibcum/fqDhKopxAY8AkSrPn+IGDEKOO+U3XOP6djFs2H5N9+orhOahiQk5KnEUWa+CzkVzhp8bMHRbg81qhjjXuIKbHjSLSIBKWqockGtKinY+z4/RdBUF6pcc3JmnlxVcNgrI4SEzKUZSwcD2QCyxzKve+gAmg6ZuSRkpPFa6mfThu7LJNu3H5K42uCpNvPAsoedolKV/LHe/eJ+BbaG5MG0NaSGVPRUmNFMFFSSpXEcXwbVh7UETOZZtoVNRGOIbbkig3McEtR68cG0RZAoJevWYo7Dg/lZ1CQzblWeUvVHmr8fY4Nqd9JJiH/zEX24mJviH60fAyFr0A3c4bC1j3yZU60VgJxXn8JgJXLUIsiBnmKmMYz+7yBQFBvqb2eYnuW59joZBf56/wXvWIR4R8wTmV80i1mZy+S4+BUES+hzjk0uXpC///z/IlqHZ1monzlXp8aCfhGKMti73FI1KbL1q6IKO4fuBuZ59gagjn5xU79muMpHXg6S+e+gDM/U9BKLHbl9l6o8czQKl4RUkJJiqftQG2i3BMg/TQlUYFkJDYBOOvAugYuzYSDnZbDDd/aSd9x0Oe6F+bJcHfl9+gp6L5/TgA+BdFFovbfCrQ40s5vMPw8866pNX8zyFGeFWdxIpPVp9Rg1UPOVFbFZrvaFq/YAzHQgqMWpahMYfqHpmwXfHL1/kpYmGuHFwT55mQu0dylfNuq2Oq0hTMCPwqfxnuBIPLXfci4Y1ANy+1CUipQxld/izVh16WyG2Q0CQQ9NqtAnx1HCHwDj7sYxOSB0wopZSnOzxQOcExmxrVTF2BkOthVpGfuhaGECfCJpJKpjnihY+xOT2QJxN61+9K6QSqtv2Shr82I3jgJrqBg0wELFZPjvHpvzTtaJnLK6Vb97Yn933koO/saN7fsjwNKzp4l2lJVx2orjCGzC/4ZL4zCver6aQYtC5sdoychuFE6ufOiog+VWi5UDkbmvmtah/3aArEBIi39s5ILUnlFLgilcGuz9CQshEY7fw2ouoILAYPVT/gyAIq3TFAIwVsl+ktkRz/qGfnCDGrm5gsl/l9QdvCWGsjPz3dU7XuqKfdUrr/6XIgjp4rey6AJBmCmUJMjITHVdFb5m1p+dLMCL8t55zD42cmftmLEJC0Da04YiRCVUBLLa8D071/N5UBNBXDh0LFsmhV/5B5ExOB4j3WVG/S3lfK5o+V6ELHvy6RR9n4ac+VsK4VE4yphPvV+kG9FegTBH4ZRXL2HytUHCduJazB/KykjfetYxOXTLws267aGOd+I+JhKP//+VnXmS90OD/jvLcVu0asyqcuYN1mSb6XTlCkqv1vigZPIYwNF/zpWcT1GR/6aEIRjkh0yhg4LXJfaGobYJTY4JI58KiAKgmmgAKWdl5nYCeLqavRJGQNuYuZtZFGx+IkI4w4NS2xwbetNMunOjBu/hmKCI/w7tfiiyUd//4rbTeWt4izBY8YvGIN6vyKYmP/8X8wHKCeN+WRcKM70+tXKNGyevU9H2Dg5BsljnTf8YbsJ1TmMs74Ce2XlHisleguhyeg44rQOHZuw/6HTkhnnurK2d62q6yS7210SsAIaR+jXMQA+svkrLpsUY+F30Uw89uOdGAR6vo4FIME0EfVVeHTu6eKicfhSqOeXJhbftcd08sWEnNUL1C9fnprTgd83IMut8onVUF0hvqzZfHduPjbjwEXIcoYmy+P6tcJZHmeOv6VrvEdkHDJecjHuHeWANe79VG662qTjA/HCvumVv3qL+LrOcpqGps2ZGwQdFJ7PU4iuyRlBrwfO+xnPyr47s2cXVbWzAyznDiBGjCM3ksxjjqM62GE9C8f5U38kB3VjtabKp/nRdvMESPGDG90bWRLAt1Qk5DyLuazRR1YzdC1c+hZXvAWV8xA72S4A8B67vjVhbba3MMop293FeEXpe7zItMWrJG/LOH9ByOXmYnNJfjmfuX9KbrpgLOba4nZ+fl8Gbdv/ihv+6wFGKHCYrVwmhFC0J3V2bn2tIB1wCc1CST3d3X2OyxhguXcs4sm679UngzofuSeBewMFJboIQHbUh/m2JhW2hG9DIvG2t7yZIzKBTz9wBtnNC+2pCRYhSIuQ1j8xsz5VvqnyUIthvuoyyu7fNIrg/KQUVmGQaqkqZk/Vx5b33/gsEs8yX7SC1J+NV4icz6bvIE7C5G6McBaI8rVg56q5QBJWxn/87Q1sPK4+sQa8fLU5gXo4paaq4cOcQ4wR0VBHPGjKh+UlPCbA1nLXyEUX45qZ8J7/Ln4FPJE2TdzD0Z8MLSNQiykMMmSyOCiFfy84Rq60emYB2vD09KjYwsoIpeDcBDTElBbXxND72yhd9pC/1CMid/5HUMvAL27OtcIJDzNKpRPNqPOpyt2aPGz9QWIs9hQ9LiX5s8m9hjTUu/f7MyIatjjd+tSfQ3ufZxPpmJhTaBtZtKLUcfOCUqADuO+QoH8B9v6U+P0HV1GLQmtoNFTb3s74ivZgjES0qfK+8RdGgBbcCMSy8eBvh98+et1KIFqSe1KQPyXULBMTsIYnysIwiZBJYdI20vseV+wuJkcqGemehKjaAb9L57xZm3g2zX0bZ2xk/fU+bCo7TlnbW7JuF1YdURo/2Gw7VclDG1W7LOtas2LX4upifZ/23rzpsnY/ALfRgrcWP5hYmV9VxVOQA1fZvp9F2UNU+7d7xRyVm5wiLp3/0dlV7vdw1PMiZrbDAYzIVqEjRY2YU03sJhPnlwIPcZUG5ltL6S8XCxU1eYS5cjr34veBmXAvy7yN4ZjArIG0dfD/5UpBNlX1ZPoxJOwyqRi3wQWtOzd4oNKh0LkoTm8cwqgIfKhqqGOhwo71I+zXnMemTv2B2AUzABWyFztGgGULjDDzWYwJUVBTjKCn5K2QGMK1CQT7SzziOjo+BhAmqBjzuc3xYym2eedGeOIRJVyTwDw37iCMe4g5Vbnsb5ZBdxOAnMT7HU4DHpxWGuQ7GeiY30Cpbvzss55+5Km1YsbD5ea3NI9QNYIXol5apgSu9dZ8f8xS5dtHpido5BclDuLWY4lhik0tbJa07yJhH0BOyEut/GRbYTS6RfiTYWGMCkNpfSHi7HvdiTglEVHKZXaVhezH4kkXiIvKopYAlPusftpE4a5IZwvw1x/eLvoDIh/zpo9FiQInsTb2SAkKHV42XYBjpJDg4374XiVb3ws4qM0s9eSQ5HzsMU4OZJKuopFjBM+dAZEl8RUMx5uU2N486Kr141tVsGQfGjORYMCJAMsxELeNT4RmWjRcpdTGBwcx6XN9drWqPmJzcrGrH4+DRc7+n1w3kPZwu0BkNr6hQrqgo7JTB9A5kdJ/H7P4cWBMwsmuixAzJB3yrQpnGIq90lxAXLzDCdn1LPibsRt7rHNjgQBklRgPZ8vTbjXdgXrTWQsK5MdrXXQVPp0Rinq3frzZKJ0qD6Qhc40VzAraUXlob1gvkhK3vpmHgI6FRlQZNx6eRqkp0zy4AQlX813fAPtL3jMRaitGFFjo0zmErloC+h+YYdVQ6k4F/epxAoF0BmqEoKNTt6j4vQZNQ2BoqF9Vj53TOIoNmDiu9Xp15RkIgQIGcoLpfoIbenzpGUAtqFJp5W+LLnx38jHeECTJ/navKY1NWfN0sY1T8/pB8kIH3DU3DX+u6W3YwpypBMYOhbSxGjq84RZ84fWJow8pyHqn4S/9J15EcCMsXqrfwyd9mhiu3+rEo9pPpoJkdZqHjra4NvzFwuThNKy6hao/SlLw3ZADUcUp3w3SRVfW2rhl80zOgTYnKE0Hs2qp1J6H3xqPqIkvUDRMFDYyRbsFI3M9MEyovPk8rlw7/0a81cDVLmBsR2ze2pBuKb23fbeZC0uXoIvDppfTwIDxk1Oq2dGesGc+oJXWJLGkOha3CX+DUnzgAp9HGH9RsPZN63Hn4RMA5eSVhPHO+9RcRb/IOgtW31V1Q5IPGtoxPjC+MEJbVlIMYADd9aHYWUIQKopuPOHmoqSkubnAKnzgKHqgIOfW5RdAgotN6BN+O2ZYHkuemLnvQ8U9THVrS1RtLmKbcC7PeeDsYznvqzeg6VCNwmr0Yyx1wnLjyT84BZz3EJyCptD3yeueAyDWIs0L2qs/VQ3HUyqfrja0V1LdDzqAikeWuV4sc7RLIB69jEIBjCkyZedoUHqCrOvShVzyd73OdrJW0hPOuQv2qOoHDc9xVb6Yu6uq3Xqp2ZaH46A7lzevbxQEmfrzvAYSJuZ4WDk1Hz3QX1LVdiUK0EvlAGAYlG3Md30r7dcPN63yqBCIj25prpvZP0nI4+EgWoFG95V596CurXpKRBGRjQlHCvy5Ib/iW8nZJWwrET3mgd6mEhfP4KCuaLjopWs7h+MdXFdIv8dHQJgg1xi1eYqB0uDYjxwVmri0Sv5XKut/onqapC+FQiC2C1lvYJ9MVco6yDYsS3AANUfMtvtbYI2hfwZatiSsnoUeMZd34GVjkMMKA+XnjJpXgRW2SHTZplVowPmJsvXy6w3cfO1AK2dvtZEKTkC/TY9LFiKHCG0DnrMQdGm2lzlBHM9iEYynH2UcVMhUEjsc0oDBTgo2ZSQ1gzkAHeWeBXYFjYLuuf8yzTCy7/RFR81WDjXMbq2BOH5dURnxo6oivmxL3cKzKInlZkD31nvpHB9Kk7GfcfE1t+1V64b9LtgeJGlpRFxQCAqWJ5DoY77ski8gsOEOr2uywZaoO/NGa0X0y1pNQHBi3b2SUGNpcZxDT7rLbBf1FSnQ8guxGW3W+36BW0gBje4DOz6Ba6SVk0xiKgt+q2JOFyr4SYfnu+Ic1QZYIuwHBrgzr6UvOcSCzPTOo7D6IC4ISeS7zkl4h+2VoeHpnG/uWR3+ysNgPcOIXQbv0n4mr3BwQcdKJxgPSeyuP/z1Jjg4e9nUvoXegqQVIE30EHx5GHv+FAVUNTowYDJgyFhf5IvlYmEqRif6+WN1MkEJmDcQITx9FX23a4mxy1AQRsOHO/+eImX9l8EMJI3oPWzVXxSOeHU1dUWYr2uAA7AMb+vAEZSbU3qob9ibCyXeypEMpZ6863o6QPqlqGHZkuWABSTVNd4cOh9hv3qEpSx2Zy/DJMP6cItEmiBJ5PFqQnDEIt3NrA3COlOSgz43D7gpNFNJ5MBh4oFzhDPiglC2ypsNU4ISywY2erkyb1NC3Qh/IfWj0eDgZI4/ln8WPfBsT3meTjq1Uqt1E7Zl/qftqkx6aM9KueMCekSnMrcHj1CqTWWzEzPsZGcDe3Ue4Ws+XFYVxNbOFF8ezkvQGR6ZOtOLU2lQEnMBStx47vE6Pb7AYMBRj2OOfZXfisjJnpTfSNjo6sZ6qSvNxZNmDeS7Gk3yYyCk1HtKN2UnhMIjOXUzAqDv90lx9O/q/AT1ZMnit5XQe9wmQxnE/WSH0CqZ9/2Hy+Sfmpeg8RwsHI5Z8kC8H293m/LHVVM/BA7HaTJYg5Enk7M/xWpq0192ACfBai2LA/qrCjCr6Dh1BIMzMXINBmX96MJ5Hn2nxln/RXPFhwHxUmSV0EV2V0jm86/dxxuYSU1W7sVkEbN9EzkG0QFwPhyHKyb3t+Fj5WoUUTErcazE/N6EW6Lvp0d//SDPj7EV9UdJN+Amnf3Wwk3A0SlJ9Z00yvXZ7n3z70G47Hfsow8Wq1JXcfwnA+Yxa5mFsgV464KKP4T31wqIgzFPd3eCe3j5ory5fBF2hgCFyVFrLzI9eetNXvM7oQqyFgDo4CTp/hDV9NMX9JDHQ/nyHTLvZLNLF6ftn2OxjGm8+PqOwhxnPHWipkE/8wbtyri80Sr7pMNkQGMfo4ZYK9OcCC4ESVFFbLMIvlxSoRqWie0wxqnLfcLSXMSpMMQEJYDVObYsXIQNv4TGNwjq1kvT1UOkicTrG3IaBZ3XdScS3u8sgeZPVpOLkbiF940FjbCeNRINNvDbd01EPBrTCPpm12m43ze1bBB59Ia6Ovhnur/Nvx3IxwSWol+3H2qfCJR8df6aQf4v6WiONxkK+IqT4pKQrZK/LplgDI/PJZbOep8dtbV7oCr6CgfpWa8NczOkPx81iSHbsNhVSJBOtrLIMrL31LK9TqHqAbAHe0RLmmV806kRLDLNEhUEJfm9u0sxpkL93Zgd6rw+tqBfTMi59xqXHLXSHwSbSBl0EK0+loECOPtrl+/nsaFe197di4yUgoe4jKoAJDXc6DGDjrQOoFDWZJ9HXwt8xDrQP+7aRwWKWI1GF8s8O4KzxWBBcwnl3vnl1Oez3oh6Ea1vjR7/z7DDTrFtqU2W/KAEzAuXDNZ7MY73MF216dzdSbWmUp4lcm7keJfWaMHgut9x5C9mj66Z0lJ+yhsjVvyiWrfk1lzPOTdhG15Y7gQlXtacvI7qv/XNSscDwqkgwHT/gUsD5yB7LdRRvJxQGYINn9hTpodKFVSTPrtGvyQw+HlRFXIkodErAGu9Iy1YpfSPc3jkFh5CX3lPxv7aqjE/JAfTIpEjGb/H7MO0e2vsViSW1qa/Lmi4/n4DEI3g7lYrcanspDfEpKkdV1OjSLOy0BCUqVoECaB55vs06rXl4jqmLsPsFM/7vYJ0vrBhDCm/00A/H81l1uekJ/6Lml3Hb9+NKiLqATJmDpyzfYZFHumEjC662L0Bwkxi7E9U4cQA0XMVDuMYAIeLMPgQaMVOd8fmt5SflFIfuBoszeAw7ow5gXPE2Y/yBc/7jExARUf/BxIHQBF5Sn3i61w4z5xJdCyO1F1X3+3ax+JSvMeZ7S6QSKp1Fp/sjYz6Z+VgCZzibGeEoujryfMulH7Rai5kAft9ebcW50DyJr2uo2z97mTWIu45YsSnNSMrrNUuG1XsYBtD9TDYzQffKB87vWbkM4EbPAFgoBV4GQS+vtFDUqOFAoi1nTtmIOvg38N4hT2Sn8r8clmBCXspBlMBYTnrqFJGBT3wZOzAyJDre9dHH7+x7qaaKDOB4UQALD5ecS0DE4obubQEiuJZ0EpBVpLuYcce8Aa4PYd/V4DLDAJBYKQPCWTcrEaZ5HYbJi11Gd6hjGom1ii18VHYnG28NKpkz2UKVPxlhYSp8uZr367iOmoy7zsxehW9wzcy2zG0a80PBMCRQMb32hnaHeOR8fnNDzZhaNYhkOdDsBUZ3loDMa1YP0uS0cjUP3b/6DBlqmZOeNABDsLl5BI5QJups8uxAuWJdkUB/pO6Zax6tsg7fN5mjjDgMGngO+DPcKqiHIDbFIGudxtPTIyDi9SFMKBDcfdGQRv41q1AqmxgkVfJMnP8w/Bc7N9/TR6C7mGObFqFkIEom8sKi2xYqJLTCHK7cxzaZvqODo22c3wisBCP4HeAgcRbNPAsBkNRhSmD48dHupdBRw4mIvtS5oeF6zeT1KMCyhMnmhpkFAGWnGscoNkwvQ8ZM5lE/vgTHFYL99OuNxdFBxTEDd5v2qLR8y9WkXsWgG6kZNndFG+pO/UAkOCipqIhL3hq7cRSdrCq7YhUsTocEcnaFa6nVkhnSeRYUA1YO0z5itF9Sly3VlxYDw239TJJH6f3EUfYO5lb7bcFcz8Bp7Oo8QmnsUHOz/fagVUBtKEw1iT88j+aKkv8cscKNkMxjYr8344D1kFoZ7/td1W6LCNYN594301tUGRmFjAzeRg5vyoM1F6+bJZ/Q54jN/k8SFd3DxPTYaAUsivsBfgTn7Mx8H2SpPt4GOdYRnEJOH6jHM2p6SgB0gzIRq6fHxGMmSmqaPCmlfwxiuloaVIitLGN8wie2CDWhkzLoCJcODh7KIOAqbHEvXdUxaS4TTTs07Clzj/6GmVs9kiZDerMxEnhUB6QQPlcfqkG9882RqHoLiHGBoHfQuXIsAG8GTAtao2KVwRnvvam8jo1e312GQAKWEa4sUVEAMG4G6ckcONDwRcg1e2D3+ohXgY4UAWF8wHKQMrSnzCgfFpsxh+aHXMGtPQroQasRY4U6UdG0rz1Vjbka0MekOGRZQEvqQFlxseFor8zWFgHek3v29+WqN6gaK5gZOTOMZzpQIC1201LkMCXild3vWXSc5UX9xcFYfbRPzGFa1FDcPfPB/jUEq/FeGt419CI3YmBlVoHsa4KdcwQP5ZSwHHhFJ7/Ph/Rap/4vmG91eDwPP0lDfCDRCLszTqfzM71xpmiKi2HwS4WlqvGNwtvwF5Dqpn6KTq8ax00UMPkxDcZrEEEsIvHiUXXEphdb4GB4FymlPwBz4Gperqq5pW7TQ6/yNRhW8VT5NhuP0udlxo4gILq5ZxAZk8ZGh3g4CqxJlPKY7AQxupfUcVpWT5VItp1+30UqoyP4wWsRo3olRRgkWZZ2ZN6VC3OZFeXB8NbnUrSdikNptD1QiGuKkr8EmSR/AK9Rw+FF3s5uwuPbvHGiPeFOViltMK7AUaOsq9+x9cndk3iJEE5LKZRlWJbKOZweROzmPNVPkjE3K/TyA57Rs68TkZ3MR8akKpm7cFjnjPd/DdkWjgYoKHSr5Wu5ssoBYU4acRs5g2DHxUmdq8VXOXRbunD8QN0LhgkssgahcdoYsNvuXGUK/KXD/7oFb+VGdhqIn02veuM5bLudJOc2Ky0GMaG4W/xWBxIJcL7yliJOXOpx0AkBqUgzlDczmLT4iILXDxxtRR1oZa2JWFgiAb43obrJnG/TZC2KSK2wqOzRZTXavZZFMb1f3bXvVaNaK828w9TO610gk8JNf3gMfETzXXsbcvRGCG9JWQZ6+cDPqc4466Yo2RcKH+PILeKOqtnlbInR3MmBeGG3FH10yzkybuqEC2HSQwpA0An7d9+73BkDUTm30bZmoP/RGbgFN+GrCOfADgqr0WbI1a1okpFms8iHYw9hm0zUvlEMivBRxModrbJJ+9/p3jUdQQ9BCtQdxnOGrT5dzRUmw0593/mbRSdBg0nRvRZM5/E16m7ZHmDEtWhwvfdZCZ8J8M12W0yRMszXamWfQTwIZ4ayYktrnscQuWr8idp3PjT2eF/jmtdhIfcpMnb+IfZY2FebW6UY/AK3jP4u3Tu4zE4qlnQgLFbM19EBIsNf7KhjdbqQ/D6yiDb+NlEi2SKD+ivXVUK8ib0oBo366gXkR8ZxGjpJIDcEgZPa9TcYe0TIbiPl/rPUQDu3XBJ9X/GNq3FAUsKsll57DzaGMrjcT+gctp+9MLYXCq+sqP81eVQ0r9lt+gcQfZbACRbEjvlMskztZG8gbC8Qn9tt26Q7y7nDrbZq/LEz7kR6Jc6pg3N9rVX8Y5MJrGlML9p9lU4jbTkKqCveeZUJjHB03m2KRKR2TytoFkTXOLg7keU1s1lrPMQJpoOKLuAAC+y1HlJucU6ysB5hsXhvSPPLq5J7JtnqHKZ4vYjC4Vy8153QY+6780xDuGARsGbOs1WqzH0QS765rnSKEbbKlkO8oI/VDwUd0is13tKpqILu1mDJFNy/iJAWcvDgjxvusIT+PGz3ST/J9r9Mtfd0jpaGeiLYIqXc7DiHSS8TcjFVksi66PEkxW1z6ujbLLUGNNYnzOWpH8BZGK4bCK7iR+MbIv8ncDAz1u4StN3vTTzewr9IQjk9wxFxn+6N1ddKs0vffJiS08N3a4G1SVrlZ97Q/M+8G9fe5AP6d9/Qq4WRnORVhofPIKEdCr3llspUfE0oKIIYoByBRPh+bX1HLS3JWGJRhIvE1aW4NTd8ePi4Z+kXb+Z8snYfSNcqijhAgVsx4RCM54cXUiYkjeBmmC4ajOHrChoELscJJC7+9jjMjw5BagZKlgRMiSNYz7h7vvZIoQqbtQmspc0cUk1G/73iXtSpROl5wtLgQi0mW2Ex8i3WULhcggx6E1LMVHUsdc9GHI1PH3U2Ko0PyGdn9KdVOLm7FPBui0i9a0HpA60MsewVE4z8CAt5d401Gv6zXlIT5Ybit1VIA0FCs7wtvYreru1fUyW3oLAZ/+aTnZrOcYRNVA8spoRtlRoWflsRClFcgzkqiHOrf0/SVw+EpVaFlJ0g4Kxq1MMOmiQdpMNpte8lMMQqm6cIFXlnGbfJllysKDi+0JJMotkqgIxOSQgU9dn/lWkeVf8nUm3iwX2Nl3WDw9i6AUK3vBAbZZrcJpDQ/N64AVwjT07Jef30GSSmtNu2WlW7YoyW2FlWfZFQUwk867EdLYKk9VG6JgEnBiBxkY7LMo4YLQJJlAo9l/oTvJkSARDF/XtyAzM8O2t3eT/iXa6wDN3WewNmQHdPfsxChU/KtLG2Mn8i4ZqKdSlIaBZadxJmRzVS/o4yA65RTSViq60oa395Lqw0pzY4SipwE0SXXsKV+GZraGSkr/RW08wPRvqvSUkYBMA9lPx4m24az+IHmCbXA+0faxTRE9wuGeO06DIXa6QlKJ3puIyiuAVfPr736vzo2pBirS+Vxel3TMm3JKhz9o2ZoRvaFVpIkykb0Hcm4oHFBMcNSNj7/4GJt43ogonY2Vg4nsDQIWxAcorpXACzgBqQPjYsE/VUpXpwNManEru4NwMCFPkXvMoqvoeLN3qyu/N1eWEHttMD65v19l/0kH2mR35iv/FI+yjoHJ9gPMz67af3Mq/BoWXqu3rphiWMXVkmnPSEkpGpUI2h1MThideGFEOK6YZHPwYzMBvpNC7+ZHxPb7epfefGyIB4JzO9DTNEYnDLVVHdQyvOEVefrk6Uv5kTQYVYWWdqrdcIl7yljwwIWdfQ/y+2QB3eR/qxYObuYyB4gTbo2in4PzarU1sO9nETkmj9/AoxDA+JM3GMqQtJR4jtduHtnoCLxd1gQUscHRB/MoRYIEsP2pDZ9KvHgtlk1iTbWWbHhohwFEYX7y51fUV2nuUmnoUcqnWIQAAgl9LTVX+Bc0QGNEhChxHR4YjfE51PUdGfsSFE6ck7BL3/hTf9jLq4G1IafINxOLKeAtO7quulYvH5YOBc+zX7CrMgWnW47/jfRsWnJjYYoE7xMfWV2HN2iyIqLI";
const Ol = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), _l = 4;
function cp(r) {
  let e = 0;
  function t() {
    return r[e++] << 8 | r[e++];
  }
  let n = t(), s = 1, i = [0, 1];
  for (let K = 1; K < n; K++)
    i.push(s += t());
  let a = t(), o = e;
  e += a;
  let c = 0, u = 0;
  function h() {
    return c == 0 && (u = u << 8 | r[e++], c = 8), u >> --c & 1;
  }
  const p = 31, d = 2 ** p, g = d >>> 1, b = g >> 1, A = d - 1;
  let I = 0;
  for (let K = 0; K < p; K++)
    I = I << 1 | h();
  let S = [], _ = 0, x = d;
  for (; ; ) {
    let K = Math.floor(((I - _ + 1) * s - 1) / x), ue = 0, gt = n;
    for (; gt - ue > 1; ) {
      let Ce = ue + gt >>> 1;
      K < i[Ce] ? gt = Ce : ue = Ce;
    }
    if (ue == 0)
      break;
    S.push(ue);
    let Z = _ + Math.floor(x * i[ue] / s), $ = _ + Math.floor(x * i[ue + 1] / s) - 1;
    for (; !((Z ^ $) & g); )
      I = I << 1 & A | h(), Z = Z << 1 & A, $ = $ << 1 & A | 1;
    for (; Z & ~$ & b; )
      I = I & g | I << 1 & A >>> 1 | h(), Z = Z << 1 ^ g, $ = ($ ^ g) << 1 | g | 1;
    _ = Z, x = 1 + $ - Z;
  }
  let D = n - 4;
  return S.map((K) => {
    switch (K - D) {
      case 3:
        return D + 65792 + (r[o++] << 16 | r[o++] << 8 | r[o++]);
      case 2:
        return D + 256 + (r[o++] << 8 | r[o++]);
      case 1:
        return D + r[o++];
      default:
        return K - 1;
    }
  });
}
function lp(r) {
  let e = 0;
  return () => r[e++];
}
function uh(r) {
  return lp(cp(up(r)));
}
function up(r) {
  let e = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((s, i) => e[s.charCodeAt(0)] = i);
  let t = r.length, n = new Uint8Array(6 * t >> 3);
  for (let s = 0, i = 0, a = 0, o = 0; s < t; s++)
    o = o << 6 | e[r.charCodeAt(s)], a += 6, a >= 8 && (n[i++] = o >> (a -= 8));
  return n;
}
function hp(r) {
  return r & 1 ? ~r >> 1 : r >> 1;
}
function dp(r, e) {
  let t = Array(r);
  for (let n = 0, s = 0; n < r; n++)
    t[n] = s += hp(e());
  return t;
}
function yi(r, e = 0) {
  let t = [];
  for (; ; ) {
    let n = r(), s = r();
    if (!s)
      break;
    e += n;
    for (let i = 0; i < s; i++)
      t.push(e + i);
    e += s + 1;
  }
  return t;
}
function hh(r) {
  return wi(() => {
    let e = yi(r);
    if (e.length)
      return e;
  });
}
function dh(r) {
  let e = [];
  for (; ; ) {
    let t = r();
    if (t == 0)
      break;
    e.push(fp(t, r));
  }
  for (; ; ) {
    let t = r() - 1;
    if (t < 0)
      break;
    e.push(pp(t, r));
  }
  return e.flat();
}
function wi(r) {
  let e = [];
  for (; ; ) {
    let t = r(e.length);
    if (!t)
      break;
    e.push(t);
  }
  return e;
}
function fh(r, e, t) {
  let n = Array(r).fill().map(() => []);
  for (let s = 0; s < e; s++)
    dp(r, t).forEach((i, a) => n[a].push(i));
  return n;
}
function fp(r, e) {
  let t = 1 + e(), n = e(), s = wi(e);
  return fh(s.length, 1 + r, e).flatMap((a, o) => {
    let [c, ...u] = a;
    return Array(s[o]).fill().map((h, p) => {
      let d = p * n;
      return [c + p * t, u.map((g) => g + d)];
    });
  });
}
function pp(r, e) {
  let t = 1 + e();
  return fh(t, 1 + r, e).map((s) => [s[0], s.slice(1)]);
}
function gp(r) {
  let e = [], t = yi(r);
  return s(n([]), []), e;
  function n(i) {
    let a = r(), o = wi(() => {
      let c = yi(r).map((u) => t[u]);
      if (c.length)
        return n(c);
    });
    return { S: a, B: o, Q: i };
  }
  function s({ S: i, B: a }, o, c) {
    if (!(i & 4 && c === o[o.length - 1])) {
      i & 2 && (c = o[o.length - 1]), i & 1 && e.push(o);
      for (let u of a)
        for (let h of u.Q)
          s(u, [...o, h], c);
    }
  }
}
function mp(r) {
  return r.toString(16).toUpperCase().padStart(2, "0");
}
function ph(r) {
  return `{${mp(r)}}`;
}
function yp(r) {
  let e = [];
  for (let t = 0, n = r.length; t < n; ) {
    let s = r.codePointAt(t);
    t += s < 65536 ? 1 : 2, e.push(s);
  }
  return e;
}
function Js(r) {
  let t = r.length;
  if (t < 4096)
    return String.fromCodePoint(...r);
  let n = [];
  for (let s = 0; s < t; )
    n.push(String.fromCodePoint(...r.slice(s, s += 4096)));
  return n.join("");
}
function wp(r, e) {
  let t = r.length, n = t - e.length;
  for (let s = 0; n == 0 && s < t; s++)
    n = r[s] - e[s];
  return n;
}
var bp = "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";
const bi = 44032, Da = 4352, Ba = 4449, Ua = 4519, gh = 19, mh = 21, qs = 28, Fa = mh * qs, Ap = gh * Fa, Ep = bi + Ap, Cp = Da + gh, vp = Ba + mh, Ip = Ua + qs;
function oi(r) {
  return r >> 24 & 255;
}
function yh(r) {
  return r & 16777215;
}
let fc, Ll, pc, Ca;
function Np() {
  let r = uh(bp);
  fc = new Map(hh(r).flatMap((e, t) => e.map((n) => [n, t + 1 << 24]))), Ll = new Set(yi(r)), pc = /* @__PURE__ */ new Map(), Ca = /* @__PURE__ */ new Map();
  for (let [e, t] of dh(r)) {
    if (!Ll.has(e) && t.length == 2) {
      let [n, s] = t, i = Ca.get(n);
      i || (i = /* @__PURE__ */ new Map(), Ca.set(n, i)), i.set(s, e);
    }
    pc.set(e, t.reverse());
  }
}
function wh(r) {
  return r >= bi && r < Ep;
}
function Pp(r, e) {
  if (r >= Da && r < Cp && e >= Ba && e < vp)
    return bi + (r - Da) * Fa + (e - Ba) * qs;
  if (wh(r) && e > Ua && e < Ip && (r - bi) % qs == 0)
    return r + (e - Ua);
  {
    let t = Ca.get(r);
    return t && (t = t.get(e), t) ? t : -1;
  }
}
function bh(r) {
  fc || Np();
  let e = [], t = [], n = !1;
  function s(i) {
    let a = fc.get(i);
    a && (n = !0, i |= a), e.push(i);
  }
  for (let i of r)
    for (; ; ) {
      if (i < 128)
        e.push(i);
      else if (wh(i)) {
        let a = i - bi, o = a / Fa | 0, c = a % Fa / qs | 0, u = a % qs;
        s(Da + o), s(Ba + c), u > 0 && s(Ua + u);
      } else {
        let a = pc.get(i);
        a ? t.push(...a) : s(i);
      }
      if (!t.length)
        break;
      i = t.pop();
    }
  if (n && e.length > 1) {
    let i = oi(e[0]);
    for (let a = 1; a < e.length; a++) {
      let o = oi(e[a]);
      if (o == 0 || i <= o) {
        i = o;
        continue;
      }
      let c = a - 1;
      for (; ; ) {
        let u = e[c + 1];
        if (e[c + 1] = e[c], e[c] = u, !c || (i = oi(e[--c]), i <= o))
          break;
      }
      i = oi(e[a]);
    }
  }
  return e;
}
function Sp(r) {
  let e = [], t = [], n = -1, s = 0;
  for (let i of r) {
    let a = oi(i), o = yh(i);
    if (n == -1)
      a == 0 ? n = o : e.push(o);
    else if (s > 0 && s >= a)
      a == 0 ? (e.push(n, ...t), t.length = 0, n = o) : t.push(o), s = a;
    else {
      let c = Pp(n, o);
      c >= 0 ? n = c : s == 0 && a == 0 ? (e.push(n), n = o) : (t.push(o), s = a);
    }
  }
  return n >= 0 && e.push(n, ...t), e;
}
function Ah(r) {
  return bh(r).map(yh);
}
function kp(r) {
  return Sp(bh(r));
}
const Ml = 45, Eh = ".", Ch = 65039, vh = 1, Ha = (r) => Array.from(r);
function Ai(r, e) {
  return r.P.has(e) || r.Q.has(e);
}
class Rp extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let gc, Ih, Kn, mc, Nh, $r, Ho, Fr, Fn, Dl, yc;
function Uc() {
  if (gc)
    return;
  let r = uh(op);
  const e = () => yi(r), t = () => new Set(e()), n = (h, p) => p.forEach((d) => h.add(d));
  gc = new Map(dh(r)), Ih = t(), Kn = e(), mc = new Set(e().map((h) => Kn[h])), Kn = new Set(Kn), Nh = t(), t();
  let s = hh(r), i = r();
  const a = () => {
    let h = /* @__PURE__ */ new Set();
    return e().forEach((p) => n(h, s[p])), n(h, e()), h;
  };
  $r = wi((h) => {
    let p = wi(r).map((d) => d + 96);
    if (p.length) {
      let d = h >= i;
      p[0] -= 32, p = Js(p), d && (p = `Restricted[${p}]`);
      let g = a(), b = a(), A = !r();
      return { N: p, P: g, Q: b, M: A, R: d };
    }
  }), Ho = t(), Fr = /* @__PURE__ */ new Map();
  let o = e().concat(Ha(Ho)).sort((h, p) => h - p);
  o.forEach((h, p) => {
    let d = r(), g = o[p] = d ? o[p - d] : { V: [], M: /* @__PURE__ */ new Map() };
    g.V.push(h), Ho.has(h) || Fr.set(h, g);
  });
  for (let { V: h, M: p } of new Set(Fr.values())) {
    let d = [];
    for (let b of h) {
      let A = $r.filter((S) => Ai(S, b)), I = d.find(({ G: S }) => A.some((_) => S.has(_)));
      I || (I = { G: /* @__PURE__ */ new Set(), V: [] }, d.push(I)), I.V.push(b), n(I.G, A);
    }
    let g = d.flatMap((b) => Ha(b.G));
    for (let { G: b, V: A } of d) {
      let I = new Set(g.filter((S) => !b.has(S)));
      for (let S of A)
        p.set(S, I);
    }
  }
  Fn = /* @__PURE__ */ new Set();
  let c = /* @__PURE__ */ new Set();
  const u = (h) => Fn.has(h) ? c.add(h) : Fn.add(h);
  for (let h of $r) {
    for (let p of h.P)
      u(p);
    for (let p of h.Q)
      u(p);
  }
  for (let h of Fn)
    !Fr.has(h) && !c.has(h) && Fr.set(h, vh);
  n(Fn, Ah(Fn)), Dl = gp(r).map((h) => Rp.from(h)).sort(wp), yc = /* @__PURE__ */ new Map();
  for (let h of Dl) {
    let p = [yc];
    for (let d of h) {
      let g = p.map((b) => {
        let A = b.get(d);
        return A || (A = /* @__PURE__ */ new Map(), b.set(d, A)), A;
      });
      d === Ch ? p.push(...g) : p = g;
    }
    for (let d of p)
      d.V = h;
  }
}
function Fc(r) {
  return (Ph(r) ? "" : `${Hc(ao([r]))} `) + ph(r);
}
function Hc(r) {
  return `"${r}"‎`;
}
function xp(r) {
  if (r.length >= 4 && r[2] == Ml && r[3] == Ml)
    throw new Error(`invalid label extension: "${Js(r.slice(0, 4))}"`);
}
function Tp(r) {
  for (let t = r.lastIndexOf(95); t > 0; )
    if (r[--t] !== 95)
      throw new Error("underscore allowed only at start");
}
function Op(r) {
  let e = r[0], t = Ol.get(e);
  if (t)
    throw di(`leading ${t}`);
  let n = r.length, s = -1;
  for (let i = 1; i < n; i++) {
    e = r[i];
    let a = Ol.get(e);
    if (a) {
      if (s == i)
        throw di(`${t} + ${a}`);
      s = i + 1, t = a;
    }
  }
  if (s == n)
    throw di(`trailing ${t}`);
}
function ao(r, e = 1 / 0, t = ph) {
  let n = [];
  _p(r[0]) && n.push("◌"), r.length > e && (e >>= 1, r = [...r.slice(0, e), 8230, ...r.slice(-e)]);
  let s = 0, i = r.length;
  for (let a = 0; a < i; a++) {
    let o = r[a];
    Ph(o) && (n.push(Js(r.slice(s, a))), n.push(t(o)), s = a + 1);
  }
  return n.push(Js(r.slice(s, i))), n.join("");
}
function _p(r) {
  return Uc(), Kn.has(r);
}
function Ph(r) {
  return Uc(), Nh.has(r);
}
function Lp(r) {
  return Up(Mp(r, kp, Gp));
}
function Mp(r, e, t) {
  if (!r)
    return [];
  Uc();
  let n = 0;
  return r.split(Eh).map((s) => {
    let i = yp(s), a = {
      input: i,
      offset: n
      // codepoint, not substring!
    };
    n += i.length + 1;
    try {
      let o = a.tokens = Hp(i, e, t), c = o.length, u;
      if (!c)
        throw new Error("empty label");
      let h = a.output = o.flat();
      if (Tp(h), !(a.emoji = c > 1 || o[0].is_emoji) && h.every((d) => d < 128))
        xp(h), u = "ASCII";
      else {
        let d = o.flatMap((g) => g.is_emoji ? [] : g);
        if (!d.length)
          u = "Emoji";
        else {
          if (Kn.has(h[0]))
            throw di("leading combining mark");
          for (let A = 1; A < c; A++) {
            let I = o[A];
            if (!I.is_emoji && Kn.has(I[0]))
              throw di(`emoji + combining mark: "${Js(o[A - 1])} + ${ao([I[0]])}"`);
          }
          Op(h);
          let g = Ha(new Set(d)), [b] = Bp(g);
          Fp(b, d), Dp(b, g), u = b.N;
        }
      }
      a.type = u;
    } catch (o) {
      a.error = o;
    }
    return a;
  });
}
function Dp(r, e) {
  let t, n = [];
  for (let s of e) {
    let i = Fr.get(s);
    if (i === vh)
      return;
    if (i) {
      let a = i.M.get(s);
      if (t = t ? t.filter((o) => a.has(o)) : Ha(a), !t.length)
        return;
    } else
      n.push(s);
  }
  if (t) {
    for (let s of t)
      if (n.every((i) => Ai(s, i)))
        throw new Error(`whole-script confusable: ${r.N}/${s.N}`);
  }
}
function Bp(r) {
  let e = $r;
  for (let t of r) {
    let n = e.filter((s) => Ai(s, t));
    if (!n.length)
      throw $r.some((s) => Ai(s, t)) ? kh(e[0], t) : Sh(t);
    if (e = n, n.length == 1)
      break;
  }
  return e;
}
function Up(r) {
  return r.map(({ input: e, error: t, output: n }) => {
    if (t) {
      let s = t.message;
      throw new Error(r.length == 1 ? s : `Invalid label ${Hc(ao(e, 63))}: ${s}`);
    }
    return Js(n);
  }).join(Eh);
}
function Sh(r) {
  return new Error(`disallowed character: ${Fc(r)}`);
}
function kh(r, e) {
  let t = Fc(e), n = $r.find((s) => s.P.has(e));
  return n && (t = `${n.N} ${t}`), new Error(`illegal mixture: ${r.N} + ${t}`);
}
function di(r) {
  return new Error(`illegal placement: ${r}`);
}
function Fp(r, e) {
  for (let t of e)
    if (!Ai(r, t))
      throw kh(r, t);
  if (r.M) {
    let t = Ah(e);
    for (let n = 1, s = t.length; n < s; n++)
      if (mc.has(t[n])) {
        let i = n + 1;
        for (let a; i < s && mc.has(a = t[i]); i++)
          for (let o = n; o < i; o++)
            if (t[o] == a)
              throw new Error(`duplicate non-spacing marks: ${Fc(a)}`);
        if (i - n > _l)
          throw new Error(`excessive non-spacing marks: ${Hc(ao(t.slice(n - 1, i)))} (${i - n}/${_l})`);
        n = i;
      }
  }
}
function Hp(r, e, t) {
  let n = [], s = [];
  for (r = r.slice().reverse(); r.length; ) {
    let i = Wp(r);
    if (i)
      s.length && (n.push(e(s)), s = []), n.push(t(i));
    else {
      let a = r.pop();
      if (Fn.has(a))
        s.push(a);
      else {
        let o = gc.get(a);
        if (o)
          s.push(...o);
        else if (!Ih.has(a))
          throw Sh(a);
      }
    }
  }
  return s.length && n.push(e(s)), n;
}
function Gp(r) {
  return r.filter((e) => e != Ch);
}
function Wp(r, e) {
  let t = yc, n, s = r.length;
  for (; s && (t = t.get(r[--s]), !!t); ) {
    let { V: i } = t;
    i && (n = i, r.length = s);
  }
  return n;
}
const Rh = new Uint8Array(32);
Rh.fill(0);
function Bl(r) {
  return m(r.length !== 0, "invalid ENS name; empty component", "comp", r), r;
}
function xh(r) {
  const e = xt(jp(r)), t = [];
  if (r.length === 0)
    return t;
  let n = 0;
  for (let s = 0; s < e.length; s++)
    e[s] === 46 && (t.push(Bl(e.slice(n, s))), n = s + 1);
  return m(n < e.length, "invalid ENS name; empty component", "name", r), t.push(Bl(e.slice(n))), t;
}
function jp(r) {
  try {
    if (r.length === 0)
      throw new Error("empty label");
    return Lp(r);
  } catch (e) {
    m(!1, `invalid ENS name (${e.message})`, "name", r);
  }
}
function wc(r) {
  m(typeof r == "string", "invalid ENS name; not a string", "name", r), m(r.length, "invalid ENS name (empty label)", "name", r);
  let e = Rh;
  const t = xh(r);
  for (; t.length; )
    e = se(ne([e, se(t.pop())]));
  return P(e);
}
function Vp(r, e) {
  const t = e;
  return m(t <= 255, "DNS encoded label cannot exceed 255", "length", t), P(ne(xh(r).map((n) => {
    m(n.length <= t, `label ${JSON.stringify(r)} exceeds ${t} bytes`, "name", r);
    const s = new Uint8Array(n.length + 1);
    return s.set(n, 1), s[0] = s.length - 1, s;
  }))) + "00";
}
function Go(r, e) {
  return {
    address: F(r),
    storageKeys: e.map((t, n) => (m(V(t, 32), "invalid slot", `storageKeys[${n}]`, t), t.toLowerCase()))
  };
}
function Pr(r) {
  if (Array.isArray(r))
    return r.map((t, n) => Array.isArray(t) ? (m(t.length === 2, "invalid slot set", `value[${n}]`, t), Go(t[0], t[1])) : (m(t != null && typeof t == "object", "invalid address-slot set", "value", r), Go(t.address, t.storageKeys)));
  m(r != null && typeof r == "object", "invalid access list", "value", r);
  const e = Object.keys(r).map((t) => {
    const n = r[t].reduce((s, i) => (s[i] = !0, s), {});
    return Go(t, Object.keys(n).sort());
  });
  return e.sort((t, n) => t.address.localeCompare(n.address)), e;
}
function Kp(r) {
  let e;
  return typeof r == "string" ? e = mi.computePublicKey(r, !1) : e = r.publicKey, F(se("0x" + e.substring(4)).substring(26));
}
function Qp(r, e) {
  return Kp(mi.recoverPublicKey(r, e));
}
const le = BigInt(0), zp = BigInt(2), Jp = BigInt(27), qp = BigInt(28), Zp = BigInt(35), Yp = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), Wo = 4096 * 32;
function Ul(r, e) {
  let t = r.toString(16);
  for (; t.length < 2; )
    t = "0" + t;
  return t += Xs(e).substring(4), "0x" + t;
}
function oo(r) {
  return r === "0x" ? null : F(r);
}
function Gc(r, e) {
  try {
    return Pr(r);
  } catch (t) {
    m(!1, t.message, e, r);
  }
}
function Zi(r, e) {
  return r === "0x" ? 0 : L(r, e);
}
function te(r, e) {
  if (r === "0x")
    return le;
  const t = R(r, e);
  return m(t <= Yp, "value exceeds uint size", e, t), t;
}
function Q(r, e) {
  const t = R(r, "value"), n = Re(t);
  return m(n.length <= 32, "value too large", `tx.${e}`, t), n;
}
function Wc(r) {
  return Pr(r).map((e) => [e.address, e.storageKeys]);
}
function $p(r, e) {
  m(Array.isArray(r), `invalid ${e}`, "value", r);
  for (let t = 0; t < r.length; t++)
    m(V(r[t], 32), "invalid ${ param } hash", `value[${t}]`, r[t]);
  return r;
}
function Xp(r) {
  const e = io(r);
  m(Array.isArray(e) && (e.length === 9 || e.length === 6), "invalid field count for legacy transaction", "data", r);
  const t = {
    type: 0,
    nonce: Zi(e[0], "nonce"),
    gasPrice: te(e[1], "gasPrice"),
    gasLimit: te(e[2], "gasLimit"),
    to: oo(e[3]),
    value: te(e[4], "value"),
    data: P(e[5]),
    chainId: le
  };
  if (e.length === 6)
    return t;
  const n = te(e[6], "v"), s = te(e[7], "r"), i = te(e[8], "s");
  if (s === le && i === le)
    t.chainId = n;
  else {
    let a = (n - Zp) / zp;
    a < le && (a = le), t.chainId = a, m(a !== le || n === Jp || n === qp, "non-canonical legacy v", "v", e[6]), t.signature = dt.from({
      r: Ar(e[7], 32),
      s: Ar(e[8], 32),
      v: n
    });
  }
  return t;
}
function eg(r, e) {
  const t = [
    Q(r.nonce, "nonce"),
    Q(r.gasPrice || 0, "gasPrice"),
    Q(r.gasLimit, "gasLimit"),
    r.to || "0x",
    Q(r.value, "value"),
    r.data
  ];
  let n = le;
  if (r.chainId != le)
    n = R(r.chainId, "tx.chainId"), m(!e || e.networkV == null || e.legacyChainId === n, "tx.chainId/sig.v mismatch", "sig", e);
  else if (r.signature) {
    const i = r.signature.legacyChainId;
    i != null && (n = i);
  }
  if (!e)
    return n !== le && (t.push(Re(n)), t.push("0x"), t.push("0x")), Er(t);
  let s = BigInt(27 + e.yParity);
  return n !== le ? s = dt.getChainIdV(n, e.v) : BigInt(e.v) !== s && m(!1, "tx.chainId/sig.v mismatch", "sig", e), t.push(Re(s)), t.push(Re(e.r)), t.push(Re(e.s)), Er(t);
}
function jc(r, e) {
  let t;
  try {
    if (t = Zi(e[0], "yParity"), t !== 0 && t !== 1)
      throw new Error("bad yParity");
  } catch {
    m(!1, "invalid yParity", "yParity", e[0]);
  }
  const n = Ar(e[1], 32), s = Ar(e[2], 32), i = dt.from({ r: n, s, yParity: t });
  r.signature = i;
}
function tg(r) {
  const e = io(H(r).slice(1));
  m(Array.isArray(e) && (e.length === 9 || e.length === 12), "invalid field count for transaction type: 2", "data", P(r));
  const t = {
    type: 2,
    chainId: te(e[0], "chainId"),
    nonce: Zi(e[1], "nonce"),
    maxPriorityFeePerGas: te(e[2], "maxPriorityFeePerGas"),
    maxFeePerGas: te(e[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: te(e[4], "gasLimit"),
    to: oo(e[5]),
    value: te(e[6], "value"),
    data: P(e[7]),
    accessList: Gc(e[8], "accessList")
  };
  return e.length === 9 || jc(t, e.slice(9)), t;
}
function ng(r, e) {
  const t = [
    Q(r.chainId, "chainId"),
    Q(r.nonce, "nonce"),
    Q(r.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    Q(r.maxFeePerGas || 0, "maxFeePerGas"),
    Q(r.gasLimit, "gasLimit"),
    r.to || "0x",
    Q(r.value, "value"),
    r.data,
    Wc(r.accessList || [])
  ];
  return e && (t.push(Q(e.yParity, "yParity")), t.push(Re(e.r)), t.push(Re(e.s))), ne(["0x02", Er(t)]);
}
function rg(r) {
  const e = io(H(r).slice(1));
  m(Array.isArray(e) && (e.length === 8 || e.length === 11), "invalid field count for transaction type: 1", "data", P(r));
  const t = {
    type: 1,
    chainId: te(e[0], "chainId"),
    nonce: Zi(e[1], "nonce"),
    gasPrice: te(e[2], "gasPrice"),
    gasLimit: te(e[3], "gasLimit"),
    to: oo(e[4]),
    value: te(e[5], "value"),
    data: P(e[6]),
    accessList: Gc(e[7], "accessList")
  };
  return e.length === 8 || jc(t, e.slice(8)), t;
}
function sg(r, e) {
  const t = [
    Q(r.chainId, "chainId"),
    Q(r.nonce, "nonce"),
    Q(r.gasPrice || 0, "gasPrice"),
    Q(r.gasLimit, "gasLimit"),
    r.to || "0x",
    Q(r.value, "value"),
    r.data,
    Wc(r.accessList || [])
  ];
  return e && (t.push(Q(e.yParity, "recoveryParam")), t.push(Re(e.r)), t.push(Re(e.s))), ne(["0x01", Er(t)]);
}
function ig(r) {
  let e = io(H(r).slice(1)), t = "3", n = null;
  if (e.length === 4 && Array.isArray(e[0])) {
    t = "3 (network format)";
    const i = e[1], a = e[2], o = e[3];
    m(Array.isArray(i), "invalid network format: blobs not an array", "fields[1]", i), m(Array.isArray(a), "invalid network format: commitments not an array", "fields[2]", a), m(Array.isArray(o), "invalid network format: proofs not an array", "fields[3]", o), m(i.length === a.length, "invalid network format: blobs/commitments length mismatch", "fields", e), m(i.length === o.length, "invalid network format: blobs/proofs length mismatch", "fields", e), n = [];
    for (let c = 0; c < e[1].length; c++)
      n.push({
        data: i[c],
        commitment: a[c],
        proof: o[c]
      });
    e = e[0];
  }
  m(Array.isArray(e) && (e.length === 11 || e.length === 14), `invalid field count for transaction type: ${t}`, "data", P(r));
  const s = {
    type: 3,
    chainId: te(e[0], "chainId"),
    nonce: Zi(e[1], "nonce"),
    maxPriorityFeePerGas: te(e[2], "maxPriorityFeePerGas"),
    maxFeePerGas: te(e[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: te(e[4], "gasLimit"),
    to: oo(e[5]),
    value: te(e[6], "value"),
    data: P(e[7]),
    accessList: Gc(e[8], "accessList"),
    maxFeePerBlobGas: te(e[9], "maxFeePerBlobGas"),
    blobVersionedHashes: e[10]
  };
  n && (s.blobs = n), m(s.to != null, `invalid address for transaction type: ${t}`, "data", r), m(Array.isArray(s.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", r);
  for (let i = 0; i < s.blobVersionedHashes.length; i++)
    m(V(s.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", r);
  return e.length === 11 || jc(s, e.slice(11)), s;
}
function ag(r, e, t) {
  const n = [
    Q(r.chainId, "chainId"),
    Q(r.nonce, "nonce"),
    Q(r.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    Q(r.maxFeePerGas || 0, "maxFeePerGas"),
    Q(r.gasLimit, "gasLimit"),
    r.to || gi,
    Q(r.value, "value"),
    r.data,
    Wc(r.accessList || []),
    Q(r.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
    $p(r.blobVersionedHashes || [], "blobVersionedHashes")
  ];
  return e && (n.push(Q(e.yParity, "yParity")), n.push(Re(e.r)), n.push(Re(e.s)), t) ? ne([
    "0x03",
    Er([
      n,
      t.map((s) => s.data),
      t.map((s) => s.commitment),
      t.map((s) => s.proof)
    ])
  ]) : ne(["0x03", Er(n)]);
}
var bt, ps, gs, ms, ys, ws, bs, As, Es, Cs, vs, Is, sr, gn, Jt, mn, Ns, va;
const Ht = class Ht {
  /**
   *  Creates a new Transaction with default values.
   */
  constructor() {
    y(this, Ns);
    y(this, bt, void 0);
    y(this, ps, void 0);
    y(this, gs, void 0);
    y(this, ms, void 0);
    y(this, ys, void 0);
    y(this, ws, void 0);
    y(this, bs, void 0);
    y(this, As, void 0);
    y(this, Es, void 0);
    y(this, Cs, void 0);
    y(this, vs, void 0);
    y(this, Is, void 0);
    y(this, sr, void 0);
    y(this, gn, void 0);
    y(this, Jt, void 0);
    y(this, mn, void 0);
    f(this, bt, null), f(this, ps, null), f(this, ms, 0), f(this, ys, le), f(this, ws, null), f(this, bs, null), f(this, As, null), f(this, gs, "0x"), f(this, Es, le), f(this, Cs, le), f(this, vs, null), f(this, Is, null), f(this, sr, null), f(this, gn, null), f(this, mn, null), f(this, Jt, null);
  }
  /**
   *  The transaction type.
   *
   *  If null, the type will be automatically inferred based on
   *  explicit properties.
   */
  get type() {
    return l(this, bt);
  }
  set type(e) {
    switch (e) {
      case null:
        f(this, bt, null);
        break;
      case 0:
      case "legacy":
        f(this, bt, 0);
        break;
      case 1:
      case "berlin":
      case "eip-2930":
        f(this, bt, 1);
        break;
      case 2:
      case "london":
      case "eip-1559":
        f(this, bt, 2);
        break;
      case 3:
      case "cancun":
      case "eip-4844":
        f(this, bt, 3);
        break;
      default:
        m(!1, "unsupported transaction type", "type", e);
    }
  }
  /**
   *  The name of the transaction type.
   */
  get typeName() {
    switch (this.type) {
      case 0:
        return "legacy";
      case 1:
        return "eip-2930";
      case 2:
        return "eip-1559";
      case 3:
        return "eip-4844";
    }
    return null;
  }
  /**
   *  The ``to`` address for the transaction or ``null`` if the
   *  transaction is an ``init`` transaction.
   */
  get to() {
    const e = l(this, ps);
    return e == null && this.type === 3 ? gi : e;
  }
  set to(e) {
    f(this, ps, e == null ? null : F(e));
  }
  /**
   *  The transaction nonce.
   */
  get nonce() {
    return l(this, ms);
  }
  set nonce(e) {
    f(this, ms, L(e, "value"));
  }
  /**
   *  The gas limit.
   */
  get gasLimit() {
    return l(this, ys);
  }
  set gasLimit(e) {
    f(this, ys, R(e));
  }
  /**
   *  The gas price.
   *
   *  On legacy networks this defines the fee that will be paid. On
   *  EIP-1559 networks, this should be ``null``.
   */
  get gasPrice() {
    const e = l(this, ws);
    return e == null && (this.type === 0 || this.type === 1) ? le : e;
  }
  set gasPrice(e) {
    f(this, ws, e == null ? null : R(e, "gasPrice"));
  }
  /**
   *  The maximum priority fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxPriorityFeePerGas() {
    const e = l(this, bs);
    return e ?? (this.type === 2 || this.type === 3 ? le : null);
  }
  set maxPriorityFeePerGas(e) {
    f(this, bs, e == null ? null : R(e, "maxPriorityFeePerGas"));
  }
  /**
   *  The maximum total fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxFeePerGas() {
    const e = l(this, As);
    return e ?? (this.type === 2 || this.type === 3 ? le : null);
  }
  set maxFeePerGas(e) {
    f(this, As, e == null ? null : R(e, "maxFeePerGas"));
  }
  /**
   *  The transaction data. For ``init`` transactions this is the
   *  deployment code.
   */
  get data() {
    return l(this, gs);
  }
  set data(e) {
    f(this, gs, P(e));
  }
  /**
   *  The amount of ether (in wei) to send in this transactions.
   */
  get value() {
    return l(this, Es);
  }
  set value(e) {
    f(this, Es, R(e, "value"));
  }
  /**
   *  The chain ID this transaction is valid on.
   */
  get chainId() {
    return l(this, Cs);
  }
  set chainId(e) {
    f(this, Cs, R(e));
  }
  /**
   *  If signed, the signature for this transaction.
   */
  get signature() {
    return l(this, vs) || null;
  }
  set signature(e) {
    f(this, vs, e == null ? null : dt.from(e));
  }
  /**
   *  The access list.
   *
   *  An access list permits discounted (but pre-paid) access to
   *  bytecode and state variable access within contract execution.
   */
  get accessList() {
    const e = l(this, Is) || null;
    return e ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(e) {
    f(this, Is, e == null ? null : Pr(e));
  }
  /**
   *  The max fee per blob gas for Cancun transactions.
   */
  get maxFeePerBlobGas() {
    const e = l(this, sr);
    return e == null && this.type === 3 ? le : e;
  }
  set maxFeePerBlobGas(e) {
    f(this, sr, e == null ? null : R(e, "maxFeePerBlobGas"));
  }
  /**
   *  The BLOb versioned hashes for Cancun transactions.
   */
  get blobVersionedHashes() {
    let e = l(this, gn);
    return e == null && this.type === 3 ? [] : e;
  }
  set blobVersionedHashes(e) {
    if (e != null) {
      m(Array.isArray(e), "blobVersionedHashes must be an Array", "value", e), e = e.slice();
      for (let t = 0; t < e.length; t++)
        m(V(e[t], 32), "invalid blobVersionedHash", `value[${t}]`, e[t]);
    }
    f(this, gn, e);
  }
  /**
   *  The BLObs for the Transaction, if any.
   *
   *  If ``blobs`` is non-``null``, then the [[seriailized]]
   *  will return the network formatted sidecar, otherwise it
   *  will return the standard [[link-eip-2718]] payload. The
   *  [[unsignedSerialized]] is unaffected regardless.
   *
   *  When setting ``blobs``, either fully valid [[Blob]] objects
   *  may be specified (i.e. correctly padded, with correct
   *  committments and proofs) or a raw [[BytesLike]] may
   *  be provided.
   *
   *  If raw [[BytesLike]] are provided, the [[kzg]] property **must**
   *  be already set. The blob will be correctly padded and the
   *  [[KzgLibrary]] will be used to compute the committment and
   *  proof for the blob.
   *
   *  A BLOb is a sequence of field elements, each of which must
   *  be within the BLS field modulo, so some additional processing
   *  may be required to encode arbitrary data to ensure each 32 byte
   *  field is within the valid range.
   *
   *  Setting this automatically populates [[blobVersionedHashes]],
   *  overwriting any existing values. Setting this to ``null``
   *  does **not** remove the [[blobVersionedHashes]], leaving them
   *  present.
   */
  get blobs() {
    return l(this, mn) == null ? null : l(this, mn).map((e) => Object.assign({}, e));
  }
  set blobs(e) {
    if (e == null) {
      f(this, mn, null);
      return;
    }
    const t = [], n = [];
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      if (Dc(i)) {
        E(l(this, Jt), "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
          operation: "set blobs()"
        });
        let a = H(i);
        if (m(a.length <= Wo, "blob is too large", `blobs[${s}]`, i), a.length !== Wo) {
          const u = new Uint8Array(Wo);
          u.set(a), a = u;
        }
        const o = l(this, Jt).blobToKzgCommitment(a), c = P(l(this, Jt).computeBlobKzgProof(a, o));
        t.push({
          data: P(a),
          commitment: P(o),
          proof: c
        }), n.push(Ul(1, o));
      } else {
        const a = P(i.commitment);
        t.push({
          data: P(i.data),
          commitment: a,
          proof: P(i.proof)
        }), n.push(Ul(1, a));
      }
    }
    f(this, mn, t), f(this, gn, n);
  }
  get kzg() {
    return l(this, Jt);
  }
  set kzg(e) {
    f(this, Jt, e);
  }
  /**
   *  The transaction hash, if signed. Otherwise, ``null``.
   */
  get hash() {
    return this.signature == null ? null : se(v(this, Ns, va).call(this, !0, !1));
  }
  /**
   *  The pre-image hash of this transaction.
   *
   *  This is the digest that a [[Signer]] must sign to authorize
   *  this transaction.
   */
  get unsignedHash() {
    return se(this.unsignedSerialized);
  }
  /**
   *  The sending address, if signed. Otherwise, ``null``.
   */
  get from() {
    return this.signature == null ? null : Qp(this.unsignedHash, this.signature);
  }
  /**
   *  The public key of the sender, if signed. Otherwise, ``null``.
   */
  get fromPublicKey() {
    return this.signature == null ? null : mi.recoverPublicKey(this.unsignedHash, this.signature);
  }
  /**
   *  Returns true if signed.
   *
   *  This provides a Type Guard that properties requiring a signed
   *  transaction are non-null.
   */
  isSigned() {
    return this.signature != null;
  }
  /**
   *  The serialized transaction.
   *
   *  This throws if the transaction is unsigned. For the pre-image,
   *  use [[unsignedSerialized]].
   */
  get serialized() {
    return v(this, Ns, va).call(this, !0, !0);
  }
  /**
   *  The transaction pre-image.
   *
   *  The hash of this is the digest which needs to be signed to
   *  authorize this transaction.
   */
  get unsignedSerialized() {
    return v(this, Ns, va).call(this, !1, !1);
  }
  /**
   *  Return the most "likely" type; currently the highest
   *  supported transaction type.
   */
  inferType() {
    const e = this.inferTypes();
    return e.indexOf(2) >= 0 ? 2 : e.pop();
  }
  /**
   *  Validates the explicit properties and returns a list of compatible
   *  transaction types.
   */
  inferTypes() {
    const e = this.gasPrice != null, t = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, n = this.accessList != null, s = l(this, sr) != null || l(this, gn);
    this.maxFeePerGas != null && this.maxPriorityFeePerGas != null && E(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this }), E(!t || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this }), E(this.type !== 0 || !n, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
    const i = [];
    return this.type != null ? i.push(this.type) : t ? i.push(2) : e ? (i.push(1), n || i.push(0)) : n ? (i.push(1), i.push(2)) : (s && this.to || (i.push(0), i.push(1), i.push(2)), i.push(3)), i.sort(), i;
  }
  /**
   *  Returns true if this transaction is a legacy transaction (i.e.
   *  ``type === 0``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if this transaction is berlin hardform transaction (i.e.
   *  ``type === 1``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if this transaction is london hardform transaction (i.e.
   *  ``type === 2``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if this transaction is an [[link-eip-4844]] BLOB
   *  transaction.
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Create a copy of this transaciton.
   */
  clone() {
    return Ht.from(this);
  }
  /**
   *  Return a JSON-friendly object.
   */
  toJSON() {
    const e = (t) => t == null ? null : t.toString();
    return {
      type: this.type,
      to: this.to,
      //            from: this.from,
      data: this.data,
      nonce: this.nonce,
      gasLimit: e(this.gasLimit),
      gasPrice: e(this.gasPrice),
      maxPriorityFeePerGas: e(this.maxPriorityFeePerGas),
      maxFeePerGas: e(this.maxFeePerGas),
      value: e(this.value),
      chainId: e(this.chainId),
      sig: this.signature ? this.signature.toJSON() : null,
      accessList: this.accessList
    };
  }
  /**
   *  Create a **Transaction** from a serialized transaction or a
   *  Transaction-like object.
   */
  static from(e) {
    if (e == null)
      return new Ht();
    if (typeof e == "string") {
      const n = H(e);
      if (n[0] >= 127)
        return Ht.from(Xp(n));
      switch (n[0]) {
        case 1:
          return Ht.from(rg(n));
        case 2:
          return Ht.from(tg(n));
        case 3:
          return Ht.from(ig(n));
      }
      E(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const t = new Ht();
    return e.type != null && (t.type = e.type), e.to != null && (t.to = e.to), e.nonce != null && (t.nonce = e.nonce), e.gasLimit != null && (t.gasLimit = e.gasLimit), e.gasPrice != null && (t.gasPrice = e.gasPrice), e.maxPriorityFeePerGas != null && (t.maxPriorityFeePerGas = e.maxPriorityFeePerGas), e.maxFeePerGas != null && (t.maxFeePerGas = e.maxFeePerGas), e.maxFeePerBlobGas != null && (t.maxFeePerBlobGas = e.maxFeePerBlobGas), e.data != null && (t.data = e.data), e.value != null && (t.value = e.value), e.chainId != null && (t.chainId = e.chainId), e.signature != null && (t.signature = dt.from(e.signature)), e.accessList != null && (t.accessList = e.accessList), e.blobVersionedHashes != null && (t.blobVersionedHashes = e.blobVersionedHashes), e.kzg != null && (t.kzg = e.kzg), e.blobs != null && (t.blobs = e.blobs), e.hash != null && (m(t.isSigned(), "unsigned transaction cannot define '.hash'", "tx", e), m(t.hash === e.hash, "hash mismatch", "tx", e)), e.from != null && (m(t.isSigned(), "unsigned transaction cannot define '.from'", "tx", e), m(t.from.toLowerCase() === (e.from || "").toLowerCase(), "from mismatch", "tx", e)), t;
  }
};
bt = new WeakMap(), ps = new WeakMap(), gs = new WeakMap(), ms = new WeakMap(), ys = new WeakMap(), ws = new WeakMap(), bs = new WeakMap(), As = new WeakMap(), Es = new WeakMap(), Cs = new WeakMap(), vs = new WeakMap(), Is = new WeakMap(), sr = new WeakMap(), gn = new WeakMap(), Jt = new WeakMap(), mn = new WeakMap(), Ns = new WeakSet(), va = function(e, t) {
  E(!e || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
  const n = e ? this.signature : null;
  switch (this.inferType()) {
    case 0:
      return eg(this, n);
    case 1:
      return sg(this, n);
    case 2:
      return ng(this, n);
    case 3:
      return ag(this, n, t ? this.blobs : null);
  }
  E(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
};
let Ga = Ht;
const Th = new Uint8Array(32);
Th.fill(0);
const og = BigInt(-1), Oh = BigInt(0), _h = BigInt(1), cg = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function lg(r) {
  const e = H(r), t = e.length % 32;
  return t ? ne([e, Th.slice(t)]) : P(e);
}
const ug = _n(_h, 32), hg = _n(Oh, 32), Fl = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, jo = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function Hl(r) {
  return function(e) {
    return m(typeof e == "string", `invalid domain value for ${JSON.stringify(r)}`, `domain.${r}`, e), e;
  };
}
const dg = {
  name: Hl("name"),
  version: Hl("version"),
  chainId: function(r) {
    const e = R(r, "domain.chainId");
    return m(e >= 0, "invalid chain ID", "domain.chainId", r), Number.isSafeInteger(e) ? Number(e) : Vr(e);
  },
  verifyingContract: function(r) {
    try {
      return F(r).toLowerCase();
    } catch {
    }
    m(!1, 'invalid domain value "verifyingContract"', "domain.verifyingContract", r);
  },
  salt: function(r) {
    const e = H(r, "domain.salt");
    return m(e.length === 32, 'invalid domain value "salt"', "domain.salt", r), P(e);
  }
};
function Vo(r) {
  {
    const e = r.match(/^(u?)int(\d+)$/);
    if (e) {
      const t = e[1] === "", n = parseInt(e[2]);
      m(n % 8 === 0 && n !== 0 && n <= 256 && e[2] === String(n), "invalid numeric width", "type", r);
      const s = Vn(cg, t ? n - 1 : n), i = t ? (s + _h) * og : Oh;
      return function(a) {
        const o = R(a, "value");
        return m(o >= i && o <= s, `value out-of-bounds for ${r}`, "value", o), _n(t ? Gu(o, 256) : o, 32);
      };
    }
  }
  {
    const e = r.match(/^bytes(\d+)$/);
    if (e) {
      const t = parseInt(e[1]);
      return m(t !== 0 && t <= 32 && e[1] === String(t), "invalid bytes width", "type", r), function(n) {
        const s = H(n);
        return m(s.length === t, `invalid length for ${r}`, "value", n), lg(n);
      };
    }
  }
  switch (r) {
    case "address":
      return function(e) {
        return Ar(F(e), 32);
      };
    case "bool":
      return function(e) {
        return e ? ug : hg;
      };
    case "bytes":
      return function(e) {
        return se(e);
      };
    case "string":
      return function(e) {
        return Cr(e);
      };
  }
  return null;
}
function Gl(r, e) {
  return `${r}(${e.map(({ name: t, type: n }) => n + " " + t).join(",")})`;
}
function ha(r) {
  const e = r.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
  return e ? {
    base: e[1],
    index: e[2] + e[4],
    array: {
      base: e[1],
      prefix: e[1] + e[2],
      count: e[5] ? parseInt(e[5]) : -1
    }
  } : { base: r };
}
var _i, qt, Ps, Za, Lh;
const Ke = class Ke {
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   *
   *  This performs all necessary checking that types are valid and
   *  do not violate the [[link-eip-712]] structural constraints as
   *  well as computes the [[primaryType]].
   */
  constructor(e) {
    y(this, Za);
    /**
     *  The primary type for the structured [[types]].
     *
     *  This is derived automatically from the [[types]], since no
     *  recursion is possible, once the DAG for the types is consturcted
     *  internally, the primary type must be the only remaining type with
     *  no parent nodes.
     */
    w(this, "primaryType");
    y(this, _i, void 0);
    y(this, qt, void 0);
    y(this, Ps, void 0);
    f(this, qt, /* @__PURE__ */ new Map()), f(this, Ps, /* @__PURE__ */ new Map());
    const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = {};
    Object.keys(e).forEach((c) => {
      i[c] = e[c].map(({ name: u, type: h }) => {
        let { base: p, index: d } = ha(h);
        return p === "int" && !e.int && (p = "int256"), p === "uint" && !e.uint && (p = "uint256"), { name: u, type: p + (d || "") };
      }), t.set(c, /* @__PURE__ */ new Set()), n.set(c, []), s.set(c, /* @__PURE__ */ new Set());
    }), f(this, _i, JSON.stringify(i));
    for (const c in i) {
      const u = /* @__PURE__ */ new Set();
      for (const h of i[c]) {
        m(!u.has(h.name), `duplicate variable name ${JSON.stringify(h.name)} in ${JSON.stringify(c)}`, "types", e), u.add(h.name);
        const p = ha(h.type).base;
        m(p !== c, `circular type reference to ${JSON.stringify(p)}`, "types", e), !Vo(p) && (m(n.has(p), `unknown type ${JSON.stringify(p)}`, "types", e), n.get(p).push(c), t.get(c).add(p));
      }
    }
    const a = Array.from(n.keys()).filter((c) => n.get(c).length === 0);
    m(a.length !== 0, "missing primary type", "types", e), m(a.length === 1, `ambiguous primary types or unused types: ${a.map((c) => JSON.stringify(c)).join(", ")}`, "types", e), O(this, { primaryType: a[0] });
    function o(c, u) {
      m(!u.has(c), `circular type reference to ${JSON.stringify(c)}`, "types", e), u.add(c);
      for (const h of t.get(c))
        if (n.has(h)) {
          o(h, u);
          for (const p of u)
            s.get(p).add(h);
        }
      u.delete(c);
    }
    o(this.primaryType, /* @__PURE__ */ new Set());
    for (const [c, u] of s) {
      const h = Array.from(u);
      h.sort(), l(this, qt).set(c, Gl(c, i[c]) + h.map((p) => Gl(p, i[p])).join(""));
    }
  }
  /**
   *  The types.
   */
  get types() {
    return JSON.parse(l(this, _i));
  }
  /**
   *  Returnthe encoder for the specific %%type%%.
   */
  getEncoder(e) {
    let t = l(this, Ps).get(e);
    return t || (t = v(this, Za, Lh).call(this, e), l(this, Ps).set(e, t)), t;
  }
  /**
   *  Return the full type for %%name%%.
   */
  encodeType(e) {
    const t = l(this, qt).get(e);
    return m(t, `unknown type: ${JSON.stringify(e)}`, "name", e), t;
  }
  /**
   *  Return the encoded %%value%% for the %%type%%.
   */
  encodeData(e, t) {
    return this.getEncoder(e)(t);
  }
  /**
   *  Returns the hash of %%value%% for the type of %%name%%.
   */
  hashStruct(e, t) {
    return se(this.encodeData(e, t));
  }
  /**
   *  Return the fulled encoded %%value%% for the [[types]].
   */
  encode(e) {
    return this.encodeData(this.primaryType, e);
  }
  /**
   *  Return the hash of the fully encoded %%value%% for the [[types]].
   */
  hash(e) {
    return this.hashStruct(this.primaryType, e);
  }
  /**
   *  @_ignore:
   */
  _visit(e, t, n) {
    if (Vo(e))
      return n(e, t);
    const s = ha(e).array;
    if (s)
      return m(s.count === -1 || s.count === t.length, `array length mismatch; expected length ${s.count}`, "value", t), t.map((a) => this._visit(s.prefix, a, n));
    const i = this.types[e];
    if (i)
      return i.reduce((a, { name: o, type: c }) => (a[o] = this._visit(c, t[o], n), a), {});
    m(!1, `unknown type: ${e}`, "type", e);
  }
  /**
   *  Call %%calback%% for each value in %%value%%, passing the type and
   *  component within %%value%%.
   *
   *  This is useful for replacing addresses or other transformation that
   *  may be desired on each component, based on its type.
   */
  visit(e, t) {
    return this._visit(this.primaryType, e, t);
  }
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   */
  static from(e) {
    return new Ke(e);
  }
  /**
   *  Return the primary type for %%types%%.
   */
  static getPrimaryType(e) {
    return Ke.from(e).primaryType;
  }
  /**
   *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
   */
  static hashStruct(e, t, n) {
    return Ke.from(t).hashStruct(e, n);
  }
  /**
   *  Return the domain hash for %%domain%%.
   */
  static hashDomain(e) {
    const t = [];
    for (const n in e) {
      if (e[n] == null)
        continue;
      const s = Fl[n];
      m(s, `invalid typed-data domain key: ${JSON.stringify(n)}`, "domain", e), t.push({ name: n, type: s });
    }
    return t.sort((n, s) => jo.indexOf(n.name) - jo.indexOf(s.name)), Ke.hashStruct("EIP712Domain", { EIP712Domain: t }, e);
  }
  /**
   *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static encode(e, t, n) {
    return ne([
      "0x1901",
      Ke.hashDomain(e),
      Ke.from(t).hash(n)
    ]);
  }
  /**
   *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static hash(e, t, n) {
    return se(Ke.encode(e, t, n));
  }
  // Replaces all address types with ENS names with their looked up address
  /**
   * Resolves to the value from resolving all addresses in %%value%% for
   * %%types%% and the %%domain%%.
   */
  static async resolveNames(e, t, n, s) {
    e = Object.assign({}, e);
    for (const o in e)
      e[o] == null && delete e[o];
    const i = {};
    e.verifyingContract && !V(e.verifyingContract, 20) && (i[e.verifyingContract] = "0x");
    const a = Ke.from(t);
    a.visit(n, (o, c) => (o === "address" && !V(c, 20) && (i[c] = "0x"), c));
    for (const o in i)
      i[o] = await s(o);
    return e.verifyingContract && i[e.verifyingContract] && (e.verifyingContract = i[e.verifyingContract]), n = a.visit(n, (o, c) => o === "address" && i[c] ? i[c] : c), { domain: e, value: n };
  }
  /**
   *  Returns the JSON-encoded payload expected by nodes which implement
   *  the JSON-RPC [[link-eip-712]] method.
   */
  static getPayload(e, t, n) {
    Ke.hashDomain(e);
    const s = {}, i = [];
    jo.forEach((c) => {
      const u = e[c];
      u != null && (s[c] = dg[c](u), i.push({ name: c, type: Fl[c] }));
    });
    const a = Ke.from(t);
    t = a.types;
    const o = Object.assign({}, t);
    return m(o.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", t), o.EIP712Domain = i, a.encode(n), {
      types: o,
      domain: s,
      primaryType: a.primaryType,
      message: a.visit(n, (c, u) => {
        if (c.match(/^bytes(\d*)/))
          return P(H(u));
        if (c.match(/^u?int/))
          return R(u).toString();
        switch (c) {
          case "address":
            return u.toLowerCase();
          case "bool":
            return !!u;
          case "string":
            return m(typeof u == "string", "invalid string", "value", u), u;
        }
        m(!1, "unsupported type", "type", c);
      })
    };
  }
};
_i = new WeakMap(), qt = new WeakMap(), Ps = new WeakMap(), Za = new WeakSet(), Lh = function(e) {
  {
    const s = Vo(e);
    if (s)
      return s;
  }
  const t = ha(e).array;
  if (t) {
    const s = t.prefix, i = this.getEncoder(s);
    return (a) => {
      m(t.count === -1 || t.count === a.length, `array length mismatch; expected length ${t.count}`, "value", a);
      let o = a.map(i);
      return l(this, qt).has(s) && (o = o.map(se)), se(ne(o));
    };
  }
  const n = this.types[e];
  if (n) {
    const s = Cr(l(this, qt).get(e));
    return (i) => {
      const a = n.map(({ name: o, type: c }) => {
        const u = this.getEncoder(c)(i[o]);
        return l(this, qt).has(c) ? se(u) : u;
      });
      return a.unshift(s), ne(a);
    };
  }
  m(!1, `unknown type: ${e}`, "type", e);
};
let Wa = Ke;
function Oe(r) {
  const e = /* @__PURE__ */ new Set();
  return r.forEach((t) => e.add(t)), Object.freeze(e);
}
const fg = "external public payable override", pg = Oe(fg.split(" ")), Mh = "constant external internal payable private public pure view override", gg = Oe(Mh.split(" ")), Dh = "constructor error event fallback function receive struct", Bh = Oe(Dh.split(" ")), Uh = "calldata memory storage payable indexed", mg = Oe(Uh.split(" ")), yg = "tuple returns", wg = [Dh, Uh, yg, Mh].join(" "), bg = Oe(wg.split(" ")), Ag = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, Eg = new RegExp("^(\\s*)"), Cg = new RegExp("^([0-9]+)"), vg = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), Fh = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), Hh = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var de, ot, Li, bc;
const Ya = class Ya {
  constructor(e) {
    y(this, Li);
    y(this, de, void 0);
    y(this, ot, void 0);
    f(this, de, 0), f(this, ot, e.slice());
  }
  get offset() {
    return l(this, de);
  }
  get length() {
    return l(this, ot).length - l(this, de);
  }
  clone() {
    return new Ya(l(this, ot));
  }
  reset() {
    f(this, de, 0);
  }
  // Pops and returns the value of the next token, if it is a keyword in allowed; throws if out of tokens
  popKeyword(e) {
    const t = this.peek();
    if (t.type !== "KEYWORD" || !e.has(t.text))
      throw new Error(`expected keyword ${t.text}`);
    return this.pop().text;
  }
  // Pops and returns the value of the next token if it is `type`; throws if out of tokens
  popType(e) {
    if (this.peek().type !== e) {
      const t = this.peek();
      throw new Error(`expected ${e}; got ${t.type} ${JSON.stringify(t.text)}`);
    }
    return this.pop().text;
  }
  // Pops and returns a "(" TOKENS ")"
  popParen() {
    const e = this.peek();
    if (e.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const t = v(this, Li, bc).call(this, l(this, de) + 1, e.match + 1);
    return f(this, de, e.match + 1), t;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const e = this.peek();
    if (e.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const t = [];
    for (; l(this, de) < e.match - 1; ) {
      const n = this.peek().linkNext;
      t.push(v(this, Li, bc).call(this, l(this, de) + 1, n)), f(this, de, n);
    }
    return f(this, de, e.match + 1), t;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (l(this, de) >= l(this, ot).length)
      throw new Error("out-of-bounds");
    return l(this, ot)[l(this, de)];
  }
  // Returns the next value, if it is a keyword in `allowed`
  peekKeyword(e) {
    const t = this.peekType("KEYWORD");
    return t != null && e.has(t) ? t : null;
  }
  // Returns the value of the next token if it is `type`
  peekType(e) {
    if (this.length === 0)
      return null;
    const t = this.peek();
    return t.type === e ? t.text : null;
  }
  // Returns the next token; throws if out of tokens
  pop() {
    const e = this.peek();
    return ni(this, de)._++, e;
  }
  toString() {
    const e = [];
    for (let t = l(this, de); t < l(this, ot).length; t++) {
      const n = l(this, ot)[t];
      e.push(`${n.type}:${n.text}`);
    }
    return `<TokenString ${e.join(" ")}>`;
  }
};
de = new WeakMap(), ot = new WeakMap(), Li = new WeakSet(), bc = function(e = 0, t = 0) {
  return new Ya(l(this, ot).slice(e, t).map((n) => Object.freeze(Object.assign({}, n, {
    match: n.match - e,
    linkBack: n.linkBack - e,
    linkNext: n.linkNext - e
  }))));
};
let ft = Ya;
function Ln(r) {
  const e = [], t = (a) => {
    const o = i < r.length ? JSON.stringify(r[i]) : "$EOI";
    throw new Error(`invalid token ${o} at ${i}: ${a}`);
  };
  let n = [], s = [], i = 0;
  for (; i < r.length; ) {
    let a = r.substring(i), o = a.match(Eg);
    o && (i += o[1].length, a = r.substring(i));
    const c = { depth: n.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    e.push(c);
    let u = Ag[a[0]] || "";
    if (u) {
      if (c.type = u, c.text = a[0], i++, u === "OPEN_PAREN")
        n.push(e.length - 1), s.push(e.length - 1);
      else if (u == "CLOSE_PAREN")
        n.length === 0 && t("no matching open bracket"), c.match = n.pop(), e[c.match].match = e.length - 1, c.depth--, c.linkBack = s.pop(), e[c.linkBack].linkNext = e.length - 1;
      else if (u === "COMMA")
        c.linkBack = s.pop(), e[c.linkBack].linkNext = e.length - 1, s.push(e.length - 1);
      else if (u === "OPEN_BRACKET")
        c.type = "BRACKET";
      else if (u === "CLOSE_BRACKET") {
        let h = e.pop().text;
        if (e.length > 0 && e[e.length - 1].type === "NUMBER") {
          const p = e.pop().text;
          h = p + h, e[e.length - 1].value = L(p);
        }
        if (e.length === 0 || e[e.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        e[e.length - 1].text += h;
      }
      continue;
    }
    if (o = a.match(vg), o) {
      if (c.text = o[1], i += c.text.length, bg.has(c.text)) {
        c.type = "KEYWORD";
        continue;
      }
      if (c.text.match(Hh)) {
        c.type = "TYPE";
        continue;
      }
      c.type = "ID";
      continue;
    }
    if (o = a.match(Cg), o) {
      c.text = o[1], c.type = "NUMBER", i += c.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${i}`);
  }
  return new ft(e.map((a) => Object.freeze(a)));
}
function Wl(r, e) {
  let t = [];
  for (const n in e.keys())
    r.has(n) && t.push(n);
  if (t.length > 1)
    throw new Error(`conflicting types: ${t.join(", ")}`);
}
function co(r, e) {
  if (e.peekKeyword(Bh)) {
    const t = e.pop().text;
    if (t !== r)
      throw new Error(`expected ${r}, got ${t}`);
  }
  return e.popType("ID");
}
function sn(r, e) {
  const t = /* @__PURE__ */ new Set();
  for (; ; ) {
    const n = r.peekType("KEYWORD");
    if (n == null || e && !e.has(n))
      break;
    if (r.pop(), t.has(n))
      throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);
    t.add(n);
  }
  return Object.freeze(t);
}
function Gh(r) {
  let e = sn(r, gg);
  return Wl(e, Oe("constant payable nonpayable".split(" "))), Wl(e, Oe("pure view payable nonpayable".split(" "))), e.has("view") ? "view" : e.has("pure") ? "pure" : e.has("payable") ? "payable" : e.has("nonpayable") ? "nonpayable" : e.has("constant") ? "view" : "nonpayable";
}
function rn(r, e) {
  return r.popParams().map((t) => pe.from(t, e));
}
function Wh(r) {
  if (r.peekType("AT")) {
    if (r.pop(), r.peekType("NUMBER"))
      return R(r.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function vr(r) {
  if (r.length)
    throw new Error(`unexpected tokens at offset ${r.offset}: ${r.toString()}`);
}
const Ig = new RegExp(/^(.*)\[([0-9]*)\]$/);
function jl(r) {
  const e = r.match(Hh);
  if (m(e, "invalid type", "type", r), r === "uint")
    return "uint256";
  if (r === "int")
    return "int256";
  if (e[2]) {
    const t = parseInt(e[2]);
    m(t !== 0 && t <= 32, "invalid bytes length", "type", r);
  } else if (e[3]) {
    const t = parseInt(e[3]);
    m(t !== 0 && t <= 256 && t % 8 === 0, "invalid numeric width", "type", r);
  }
  return r;
}
const q = {}, De = Symbol.for("_ethers_internal"), Vl = "_ParamTypeInternal", Kl = "_ErrorInternal", Ql = "_EventInternal", zl = "_ConstructorInternal", Jl = "_FallbackInternal", ql = "_FunctionInternal", Zl = "_StructInternal";
var Ss, Ia;
const Qe = class Qe {
  /**
   *  @private
   */
  constructor(e, t, n, s, i, a, o, c) {
    y(this, Ss);
    /**
     *  The local name of the parameter (or ``""`` if unbound)
     */
    w(this, "name");
    /**
     *  The fully qualified type (e.g. ``"address"``, ``"tuple(address)"``,
     *  ``"uint256[3][]"``)
     */
    w(this, "type");
    /**
     *  The base type (e.g. ``"address"``, ``"tuple"``, ``"array"``)
     */
    w(this, "baseType");
    /**
     *  True if the parameters is indexed.
     *
     *  For non-indexable types this is ``null``.
     */
    w(this, "indexed");
    /**
     *  The components for the tuple.
     *
     *  For non-tuple types this is ``null``.
     */
    w(this, "components");
    /**
     *  The array length, or ``-1`` for dynamic-lengthed arrays.
     *
     *  For non-array types this is ``null``.
     */
    w(this, "arrayLength");
    /**
     *  The type of each child in the array.
     *
     *  For non-array types this is ``null``.
     */
    w(this, "arrayChildren");
    if (qi(e, q, "ParamType"), Object.defineProperty(this, De, { value: Vl }), a && (a = Object.freeze(a.slice())), s === "array") {
      if (o == null || c == null)
        throw new Error("");
    } else if (o != null || c != null)
      throw new Error("");
    if (s === "tuple") {
      if (a == null)
        throw new Error("");
    } else if (a != null)
      throw new Error("");
    O(this, {
      name: t,
      type: n,
      baseType: s,
      indexed: i,
      components: a,
      arrayLength: o,
      arrayChildren: c
    });
  }
  /**
   *  Return a string representation of this type.
   *
   *  For example,
   *
   *  ``sighash" => "(uint256,address)"``
   *
   *  ``"minimal" => "tuple(uint256,address) indexed"``
   *
   *  ``"full" => "tuple(uint256 foo, address bar) indexed baz"``
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json") {
      const n = this.name || "";
      if (this.isArray()) {
        const i = JSON.parse(this.arrayChildren.format("json"));
        return i.name = n, i.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(i);
      }
      const s = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: n
      };
      return typeof this.indexed == "boolean" && (s.indexed = this.indexed), this.isTuple() && (s.components = this.components.map((i) => JSON.parse(i.format(e)))), JSON.stringify(s);
    }
    let t = "";
    return this.isArray() ? (t += this.arrayChildren.format(e), t += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? t += "(" + this.components.map((n) => n.format(e)).join(e === "full" ? ", " : ",") + ")" : t += this.type, e !== "sighash" && (this.indexed === !0 && (t += " indexed"), e === "full" && this.name && (t += " " + this.name)), t;
  }
  /**
   *  Returns true if %%this%% is an Array type.
   *
   *  This provides a type gaurd ensuring that [[arrayChildren]]
   *  and [[arrayLength]] are non-null.
   */
  isArray() {
    return this.baseType === "array";
  }
  /**
   *  Returns true if %%this%% is a Tuple type.
   *
   *  This provides a type gaurd ensuring that [[components]]
   *  is non-null.
   */
  isTuple() {
    return this.baseType === "tuple";
  }
  /**
   *  Returns true if %%this%% is an Indexable type.
   *
   *  This provides a type gaurd ensuring that [[indexed]]
   *  is non-null.
   */
  isIndexable() {
    return this.indexed != null;
  }
  /**
   *  Walks the **ParamType** with %%value%%, calling %%process%%
   *  on each type, destructing the %%value%% recursively.
   */
  walk(e, t) {
    if (this.isArray()) {
      if (!Array.isArray(e))
        throw new Error("invalid array value");
      if (this.arrayLength !== -1 && e.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const n = this;
      return e.map((s) => n.arrayChildren.walk(s, t));
    }
    if (this.isTuple()) {
      if (!Array.isArray(e))
        throw new Error("invalid tuple value");
      if (e.length !== this.components.length)
        throw new Error("array is wrong length");
      const n = this;
      return e.map((s, i) => n.components[i].walk(s, t));
    }
    return t(this.type, e);
  }
  /**
   *  Walks the **ParamType** with %%value%%, asynchronously calling
   *  %%process%% on each type, destructing the %%value%% recursively.
   *
   *  This can be used to resolve ENS names by walking and resolving each
   *  ``"address"`` type.
   */
  async walkAsync(e, t) {
    const n = [], s = [e];
    return v(this, Ss, Ia).call(this, n, e, t, (i) => {
      s[0] = i;
    }), n.length && await Promise.all(n), s[0];
  }
  /**
   *  Creates a new **ParamType** for %%obj%%.
   *
   *  If %%allowIndexed%% then the ``indexed`` keyword is permitted,
   *  otherwise the ``indexed`` keyword will throw an error.
   */
  static from(e, t) {
    if (Qe.isParamType(e))
      return e;
    if (typeof e == "string")
      try {
        return Qe.from(Ln(e), t);
      } catch {
        m(!1, "invalid param type", "obj", e);
      }
    else if (e instanceof ft) {
      let o = "", c = "", u = null;
      sn(e, Oe(["tuple"])).has("tuple") || e.peekType("OPEN_PAREN") ? (c = "tuple", u = e.popParams().map((A) => Qe.from(A)), o = `tuple(${u.map((A) => A.format()).join(",")})`) : (o = jl(e.popType("TYPE")), c = o);
      let h = null, p = null;
      for (; e.length && e.peekType("BRACKET"); ) {
        const A = e.pop();
        h = new Qe(q, "", o, c, null, u, p, h), p = A.value, o += A.text, c = "array", u = null;
      }
      let d = null;
      if (sn(e, mg).has("indexed")) {
        if (!t)
          throw new Error("");
        d = !0;
      }
      const b = e.peekType("ID") ? e.pop().text : "";
      if (e.length)
        throw new Error("leftover tokens");
      return new Qe(q, b, o, c, d, u, p, h);
    }
    const n = e.name;
    m(!n || typeof n == "string" && n.match(Fh), "invalid name", "obj.name", n);
    let s = e.indexed;
    s != null && (m(t, "parameter cannot be indexed", "obj.indexed", e.indexed), s = !!s);
    let i = e.type, a = i.match(Ig);
    if (a) {
      const o = parseInt(a[2] || "-1"), c = Qe.from({
        type: a[1],
        components: e.components
      });
      return new Qe(q, n || "", i, "array", s, null, o, c);
    }
    if (i === "tuple" || i.startsWith(
      "tuple("
      /* fix: ) */
    ) || i.startsWith(
      "("
      /* fix: ) */
    )) {
      const o = e.components != null ? e.components.map((u) => Qe.from(u)) : null;
      return new Qe(q, n || "", i, "tuple", s, o, null, null);
    }
    return i = jl(e.type), new Qe(q, n || "", i, i, s, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(e) {
    return e && e[De] === Vl;
  }
};
Ss = new WeakSet(), Ia = function(e, t, n, s) {
  if (this.isArray()) {
    if (!Array.isArray(t))
      throw new Error("invalid array value");
    if (this.arrayLength !== -1 && t.length !== this.arrayLength)
      throw new Error("array is wrong length");
    const a = this.arrayChildren, o = t.slice();
    o.forEach((c, u) => {
      var h;
      v(h = a, Ss, Ia).call(h, e, c, n, (p) => {
        o[u] = p;
      });
    }), s(o);
    return;
  }
  if (this.isTuple()) {
    const a = this.components;
    let o;
    if (Array.isArray(t))
      o = t.slice();
    else {
      if (t == null || typeof t != "object")
        throw new Error("invalid tuple value");
      o = a.map((c) => {
        if (!c.name)
          throw new Error("cannot use object value with unnamed components");
        if (!(c.name in t))
          throw new Error(`missing value for component ${c.name}`);
        return t[c.name];
      });
    }
    if (o.length !== this.components.length)
      throw new Error("array is wrong length");
    o.forEach((c, u) => {
      var h;
      v(h = a[u], Ss, Ia).call(h, e, c, n, (p) => {
        o[u] = p;
      });
    }), s(o);
    return;
  }
  const i = n(this.type, t);
  i.then ? e.push(async function() {
    s(await i);
  }()) : s(i);
};
let pe = Qe;
class Ir {
  /**
   *  @private
   */
  constructor(e, t, n) {
    /**
     *  The type of the fragment.
     */
    w(this, "type");
    /**
     *  The inputs for the fragment.
     */
    w(this, "inputs");
    qi(e, q, "Fragment"), n = Object.freeze(n.slice()), O(this, { type: t, inputs: n });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(e) {
    if (typeof e == "string") {
      try {
        Ir.from(JSON.parse(e));
      } catch {
      }
      return Ir.from(Ln(e));
    }
    if (e instanceof ft)
      switch (e.peekKeyword(Bh)) {
        case "constructor":
          return nn.from(e);
        case "error":
          return Me.from(e);
        case "event":
          return St.from(e);
        case "fallback":
        case "receive":
          return Gt.from(e);
        case "function":
          return kt.from(e);
        case "struct":
          return wr.from(e);
      }
    else if (typeof e == "object") {
      switch (e.type) {
        case "constructor":
          return nn.from(e);
        case "error":
          return Me.from(e);
        case "event":
          return St.from(e);
        case "fallback":
        case "receive":
          return Gt.from(e);
        case "function":
          return kt.from(e);
        case "struct":
          return wr.from(e);
      }
      E(!1, `unsupported type: ${e.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    m(!1, "unsupported frgament object", "obj", e);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(e) {
    return nn.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(e) {
    return Me.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(e) {
    return St.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(e) {
    return kt.isFragment(e);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(e) {
    return wr.isFragment(e);
  }
}
class lo extends Ir {
  /**
   *  @private
   */
  constructor(t, n, s, i) {
    super(t, n, i);
    /**
     *  The name of the fragment.
     */
    w(this, "name");
    m(typeof s == "string" && s.match(Fh), "invalid identifier", "name", s), i = Object.freeze(i.slice()), O(this, { name: s });
  }
}
function Ei(r, e) {
  return "(" + e.map((t) => t.format(r)).join(r === "full" ? ", " : ",") + ")";
}
class Me extends lo {
  /**
   *  @private
   */
  constructor(e, t, n) {
    super(e, "error", t, n), Object.defineProperty(this, De, { value: Kl });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return Cr(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this fragment as %%format%%.
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json")
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((n) => JSON.parse(n.format(e)))
      });
    const t = [];
    return e !== "sighash" && t.push("error"), t.push(this.name + Ei(e, this.inputs)), t.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(e) {
    if (Me.isFragment(e))
      return e;
    if (typeof e == "string")
      return Me.from(Ln(e));
    if (e instanceof ft) {
      const t = co("error", e), n = rn(e);
      return vr(e), new Me(q, t, n);
    }
    return new Me(q, e.name, e.inputs ? e.inputs.map(pe.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(e) {
    return e && e[De] === Kl;
  }
}
class St extends lo {
  /**
   *  @private
   */
  constructor(t, n, s, i) {
    super(t, "event", n, s);
    /**
     *  Whether this event is anonymous.
     */
    w(this, "anonymous");
    Object.defineProperty(this, De, { value: Ql }), O(this, { anonymous: i });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return Cr(this.format("sighash"));
  }
  /**
   *  Returns a string representation of this event as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((s) => JSON.parse(s.format(t)))
      });
    const n = [];
    return t !== "sighash" && n.push("event"), n.push(this.name + Ei(t, this.inputs)), t !== "sighash" && this.anonymous && n.push("anonymous"), n.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(t, n) {
    return n = (n || []).map((i) => pe.from(i)), new St(q, t, n, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(t) {
    if (St.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return St.from(Ln(t));
      } catch {
        m(!1, "invalid event fragment", "obj", t);
      }
    else if (t instanceof ft) {
      const n = co("event", t), s = rn(t, !0), i = !!sn(t, Oe(["anonymous"])).has("anonymous");
      return vr(t), new St(q, n, s, i);
    }
    return new St(q, t.name, t.inputs ? t.inputs.map((n) => pe.from(n, !0)) : [], !!t.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(t) {
    return t && t[De] === Ql;
  }
}
class nn extends Ir {
  /**
   *  @private
   */
  constructor(t, n, s, i, a) {
    super(t, n, s);
    /**
     *  Whether the constructor can receive an endowment.
     */
    w(this, "payable");
    /**
     *  The recommended gas limit for deployment or ``null``.
     */
    w(this, "gas");
    Object.defineProperty(this, De, { value: zl }), O(this, { payable: i, gas: a });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(t) {
    if (E(t != null && t !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), t === "json")
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(t)))
      });
    const n = [`constructor${Ei(t, this.inputs)}`];
    return this.payable && n.push("payable"), this.gas != null && n.push(`@${this.gas.toString()}`), n.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(t) {
    if (nn.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return nn.from(Ln(t));
      } catch {
        m(!1, "invalid constuctor fragment", "obj", t);
      }
    else if (t instanceof ft) {
      sn(t, Oe(["constructor"]));
      const n = rn(t), s = !!sn(t, pg).has("payable"), i = Wh(t);
      return vr(t), new nn(q, "constructor", n, s, i);
    }
    return new nn(q, "constructor", t.inputs ? t.inputs.map(pe.from) : [], !!t.payable, t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(t) {
    return t && t[De] === zl;
  }
}
class Gt extends Ir {
  constructor(t, n, s) {
    super(t, "fallback", n);
    /**
     *  If the function can be sent value during invocation.
     */
    w(this, "payable");
    Object.defineProperty(this, De, { value: Jl }), O(this, { payable: s });
  }
  /**
   *  Returns a string representation of this fallback as %%format%%.
   */
  format(t) {
    const n = this.inputs.length === 0 ? "receive" : "fallback";
    if (t === "json") {
      const s = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: n, stateMutability: s });
    }
    return `${n}()${this.payable ? " payable" : ""}`;
  }
  /**
   *  Returns a new **FallbackFragment** for %%obj%%.
   */
  static from(t) {
    if (Gt.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return Gt.from(Ln(t));
      } catch {
        m(!1, "invalid fallback fragment", "obj", t);
      }
    else if (t instanceof ft) {
      const n = t.toString(), s = t.peekKeyword(Oe(["fallback", "receive"]));
      if (m(s, "type must be fallback or receive", "obj", n), t.popKeyword(Oe(["fallback", "receive"])) === "receive") {
        const c = rn(t);
        return m(c.length === 0, "receive cannot have arguments", "obj.inputs", c), sn(t, Oe(["payable"])), vr(t), new Gt(q, [], !0);
      }
      let a = rn(t);
      a.length ? m(a.length === 1 && a[0].type === "bytes", "invalid fallback inputs", "obj.inputs", a.map((c) => c.format("minimal")).join(", ")) : a = [pe.from("bytes")];
      const o = Gh(t);
      if (m(o === "nonpayable" || o === "payable", "fallback cannot be constants", "obj.stateMutability", o), sn(t, Oe(["returns"])).has("returns")) {
        const c = rn(t);
        m(c.length === 1 && c[0].type === "bytes", "invalid fallback outputs", "obj.outputs", c.map((u) => u.format("minimal")).join(", "));
      }
      return vr(t), new Gt(q, a, o === "payable");
    }
    if (t.type === "receive")
      return new Gt(q, [], !0);
    if (t.type === "fallback") {
      const n = [pe.from("bytes")], s = t.stateMutability === "payable";
      return new Gt(q, n, s);
    }
    m(!1, "invalid fallback description", "obj", t);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(t) {
    return t && t[De] === Jl;
  }
}
class kt extends lo {
  /**
   *  @private
   */
  constructor(t, n, s, i, a, o) {
    super(t, "function", n, i);
    /**
     *  If the function is constant (e.g. ``pure`` or ``view`` functions).
     */
    w(this, "constant");
    /**
     *  The returned types for the result of calling this function.
     */
    w(this, "outputs");
    /**
     *  The state mutability (e.g. ``payable``, ``nonpayable``, ``view``
     *  or ``pure``)
     */
    w(this, "stateMutability");
    /**
     *  If the function can be sent value during invocation.
     */
    w(this, "payable");
    /**
     *  The recommended gas limit to send when calling this function.
     */
    w(this, "gas");
    Object.defineProperty(this, De, { value: ql }), a = Object.freeze(a.slice()), O(this, { constant: s === "view" || s === "pure", gas: o, outputs: a, payable: s === "payable", stateMutability: s });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return Cr(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this function as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(t))),
        outputs: this.outputs.map((s) => JSON.parse(s.format(t)))
      });
    const n = [];
    return t !== "sighash" && n.push("function"), n.push(this.name + Ei(t, this.inputs)), t !== "sighash" && (this.stateMutability !== "nonpayable" && n.push(this.stateMutability), this.outputs && this.outputs.length && (n.push("returns"), n.push(Ei(t, this.outputs))), this.gas != null && n.push(`@${this.gas.toString()}`)), n.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(t, n) {
    return n = (n || []).map((i) => pe.from(i)), new kt(q, t, "view", n, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(t) {
    if (kt.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return kt.from(Ln(t));
      } catch {
        m(!1, "invalid function fragment", "obj", t);
      }
    else if (t instanceof ft) {
      const s = co("function", t), i = rn(t), a = Gh(t);
      let o = [];
      sn(t, Oe(["returns"])).has("returns") && (o = rn(t));
      const c = Wh(t);
      return vr(t), new kt(q, s, a, i, o, c);
    }
    let n = t.stateMutability;
    return n == null && (n = "payable", typeof t.constant == "boolean" ? (n = "view", t.constant || (n = "payable", typeof t.payable == "boolean" && !t.payable && (n = "nonpayable"))) : typeof t.payable == "boolean" && !t.payable && (n = "nonpayable")), new kt(q, t.name, n, t.inputs ? t.inputs.map(pe.from) : [], t.outputs ? t.outputs.map(pe.from) : [], t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(t) {
    return t && t[De] === ql;
  }
}
class wr extends lo {
  /**
   *  @private
   */
  constructor(e, t, n) {
    super(e, "struct", t, n), Object.defineProperty(this, De, { value: Zl });
  }
  /**
   *  Returns a string representation of this struct as %%format%%.
   */
  format() {
    throw new Error("@TODO");
  }
  /**
   *  Returns a new **StructFragment** for %%obj%%.
   */
  static from(e) {
    if (typeof e == "string")
      try {
        return wr.from(Ln(e));
      } catch {
        m(!1, "invalid struct fragment", "obj", e);
      }
    else if (e instanceof ft) {
      const t = co("struct", e), n = rn(e);
      return vr(e), new wr(q, t, n);
    }
    return new wr(q, e.name, e.inputs ? e.inputs.map(pe.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(e) {
    return e && e[De] === Zl;
  }
}
const pt = /* @__PURE__ */ new Map();
pt.set(0, "GENERIC_PANIC");
pt.set(1, "ASSERT_FALSE");
pt.set(17, "OVERFLOW");
pt.set(18, "DIVIDE_BY_ZERO");
pt.set(33, "ENUM_RANGE_ERROR");
pt.set(34, "BAD_STORAGE_DATA");
pt.set(49, "STACK_UNDERFLOW");
pt.set(50, "ARRAY_RANGE_ERROR");
pt.set(65, "OUT_OF_MEMORY");
pt.set(81, "UNINITIALIZED_FUNCTION_CALL");
const Ng = new RegExp(/^bytes([0-9]*)$/), Pg = new RegExp(/^(u?int)([0-9]*)$/);
let Ko = null, Yl = 1024;
function Sg(r, e, t, n) {
  let s = "missing revert data", i = null;
  const a = null;
  let o = null;
  if (t) {
    s = "execution reverted";
    const u = H(t);
    if (t = P(t), u.length === 0)
      s += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (u.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (P(u.slice(0, 4)) === "0x08c379a0")
      try {
        i = n.decode(["string"], u.slice(4))[0], o = {
          signature: "Error(string)",
          name: "Error",
          args: [i]
        }, s += `: ${JSON.stringify(i)}`;
      } catch {
        s += " (could not decode reason; invalid string data)";
      }
    else if (P(u.slice(0, 4)) === "0x4e487b71")
      try {
        const h = Number(n.decode(["uint256"], u.slice(4))[0]);
        o = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [h]
        }, i = `Panic due to ${pt.get(h) || "UNKNOWN"}(${h})`, s += `: ${i}`;
      } catch {
        s += " (could not decode panic code)";
      }
    else
      s += " (unknown custom error)";
  }
  const c = {
    to: e.to ? F(e.to) : null,
    data: e.data || "0x"
  };
  return e.from && (c.from = F(e.from)), J(s, "CALL_EXCEPTION", {
    action: r,
    data: t,
    reason: i,
    transaction: c,
    invocation: a,
    revert: o
  });
}
var yn, Hr;
const $a = class $a {
  constructor() {
    y(this, yn);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(e) {
    const t = e.map((s) => v(this, yn, Hr).call(this, pe.from(s)));
    return new ua(t, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(e, t) {
    Uu(t.length, e.length, "types/values length mismatch");
    const n = e.map((a) => v(this, yn, Hr).call(this, pe.from(a))), s = new ua(n, "_"), i = new uc();
    return s.encode(i, t), i.data;
  }
  /**
   *  Decode the ABI %%data%% as the %%types%% into values.
   *
   *  If %%loose%% decoding is enabled, then strict padding is
   *  not enforced. Some older versions of Solidity incorrectly
   *  padded event data emitted from ``external`` functions.
   */
  decode(e, t, n) {
    const s = e.map((a) => v(this, yn, Hr).call(this, pe.from(a)));
    return new ua(s, "_").decode(new hc(t, n, Yl));
  }
  static _setDefaultMaxInflation(e) {
    m(typeof e == "number" && Number.isInteger(e), "invalid defaultMaxInflation factor", "value", e), Yl = e;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return Ko == null && (Ko = new $a()), Ko;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(e, t, n) {
    return Sg(e, t, n, $a.defaultAbiCoder());
  }
};
yn = new WeakSet(), Hr = function(e) {
  if (e.isArray())
    return new Zf(v(this, yn, Hr).call(this, e.arrayChildren), e.arrayLength, e.name);
  if (e.isTuple())
    return new ua(e.components.map((n) => v(this, yn, Hr).call(this, n)), e.name);
  switch (e.baseType) {
    case "address":
      return new Jf(e.name);
    case "bool":
      return new Yf(e.name);
    case "string":
      return new ap(e.name);
    case "bytes":
      return new $f(e.name);
    case "":
      return new tp(e.name);
  }
  let t = e.type.match(Pg);
  if (t) {
    let n = parseInt(t[2] || "256");
    return m(n !== 0 && n <= 256 && n % 8 === 0, "invalid " + t[1] + " bit length", "param", e), new ip(n / 8, t[1] === "int", e.name);
  }
  if (t = e.type.match(Ng), t) {
    let n = parseInt(t[1]);
    return m(n !== 0 && n <= 32, "invalid bytes length", "param", e), new Xf(n, e.name);
  }
  m(!1, "invalid type", "type", e.type);
};
let Ci = $a;
class kg {
  /**
   *  @_ignore:
   */
  constructor(e, t, n) {
    /**
     *  The matching fragment for the ``topic0``.
     */
    w(this, "fragment");
    /**
     *  The name of the Event.
     */
    w(this, "name");
    /**
     *  The full Event signature.
     */
    w(this, "signature");
    /**
     *  The topic hash for the Event.
     */
    w(this, "topic");
    /**
     *  The arguments passed into the Event with ``emit``.
     */
    w(this, "args");
    const s = e.name, i = e.format();
    O(this, {
      fragment: e,
      name: s,
      signature: i,
      topic: t,
      args: n
    });
  }
}
class Rg {
  /**
   *  @_ignore:
   */
  constructor(e, t, n, s) {
    /**
     *  The matching fragment from the transaction ``data``.
     */
    w(this, "fragment");
    /**
     *  The name of the Function from the transaction ``data``.
     */
    w(this, "name");
    /**
     *  The arguments passed to the Function from the transaction ``data``.
     */
    w(this, "args");
    /**
     *  The full Function signature from the transaction ``data``.
     */
    w(this, "signature");
    /**
     *  The selector for the Function from the transaction ``data``.
     */
    w(this, "selector");
    /**
     *  The ``value`` (in wei) from the transaction.
     */
    w(this, "value");
    const i = e.name, a = e.format();
    O(this, {
      fragment: e,
      name: i,
      args: n,
      signature: a,
      selector: t,
      value: s
    });
  }
}
class xg {
  /**
   *  @_ignore:
   */
  constructor(e, t, n) {
    /**
     *  The matching fragment.
     */
    w(this, "fragment");
    /**
     *  The name of the Error.
     */
    w(this, "name");
    /**
     *  The arguments passed to the Error with ``revert``.
     */
    w(this, "args");
    /**
     *  The full Error signature.
     */
    w(this, "signature");
    /**
     *  The selector for the Error.
     */
    w(this, "selector");
    const s = e.name, i = e.format();
    O(this, {
      fragment: e,
      name: s,
      args: n,
      signature: i,
      selector: t
    });
  }
}
class $l {
  /**
   *  @_ignore:
   */
  constructor(e) {
    /**
     *  The ``keccak256`` of the value logged.
     */
    w(this, "hash");
    /**
     *  @_ignore:
     */
    w(this, "_isIndexed");
    O(this, { hash: e, _isIndexed: !0 });
  }
  /**
   *  Returns ``true`` if %%value%% is an **Indexed**.
   *
   *  This provides a Type Guard for property access.
   */
  static isIndexed(e) {
    return !!(e && e._isIndexed);
  }
}
const Xl = {
  0: "generic panic",
  1: "assert(false)",
  17: "arithmetic overflow",
  18: "division or modulo by zero",
  33: "enum overflow",
  34: "invalid encoded storage byte array accessed",
  49: "out-of-bounds array access; popping on an empty array",
  50: "out-of-bounds access of an array or bytesN",
  65: "out of memory",
  81: "uninitialized function"
}, eu = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: (r) => `reverted with reason string ${JSON.stringify(r)}`
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"],
    reason: (r) => {
      let e = "unknown panic code";
      return r >= 0 && r <= 255 && Xl[r.toString()] && (e = Xl[r.toString()]), `reverted with panic code 0x${r.toString(16)} (${e})`;
    }
  }
};
var At, Et, Ct, me, ks, Na, Rs, Pa;
const jn = class jn {
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(e) {
    // Find a function definition by any means necessary (unless it is ambiguous)
    y(this, ks);
    // Find an event definition by any means necessary (unless it is ambiguous)
    y(this, Rs);
    /**
     *  All the Contract ABI members (i.e. methods, events, errors, etc).
     */
    w(this, "fragments");
    /**
     *  The Contract constructor.
     */
    w(this, "deploy");
    /**
     *  The Fallback method, if any.
     */
    w(this, "fallback");
    /**
     *  If receiving ether is supported.
     */
    w(this, "receive");
    y(this, At, void 0);
    y(this, Et, void 0);
    y(this, Ct, void 0);
    //    #structs: Map<string, StructFragment>;
    y(this, me, void 0);
    let t = [];
    typeof e == "string" ? t = JSON.parse(e) : t = e, f(this, Ct, /* @__PURE__ */ new Map()), f(this, At, /* @__PURE__ */ new Map()), f(this, Et, /* @__PURE__ */ new Map());
    const n = [];
    for (const a of t)
      try {
        n.push(Ir.from(a));
      } catch (o) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`, o.message);
      }
    O(this, {
      fragments: Object.freeze(n)
    });
    let s = null, i = !1;
    f(this, me, this.getAbiCoder()), this.fragments.forEach((a, o) => {
      let c;
      switch (a.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          O(this, { deploy: a });
          return;
        case "fallback":
          a.inputs.length === 0 ? i = !0 : (m(!s || a.payable !== s.payable, "conflicting fallback fragments", `fragments[${o}]`, a), s = a, i = s.payable);
          return;
        case "function":
          c = l(this, Ct);
          break;
        case "event":
          c = l(this, Et);
          break;
        case "error":
          c = l(this, At);
          break;
        default:
          return;
      }
      const u = a.format();
      c.has(u) || c.set(u, a);
    }), this.deploy || O(this, {
      deploy: nn.from("constructor()")
    }), O(this, { fallback: s, receive: i });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(e) {
    const t = e ? "minimal" : "full";
    return this.fragments.map((s) => s.format(t));
  }
  /**
   *  Return the JSON-encoded ABI. This is the format Solidiy
   *  returns.
   */
  formatJson() {
    const e = this.fragments.map((t) => t.format("json"));
    return JSON.stringify(e.map((t) => JSON.parse(t)));
  }
  /**
   *  The ABI coder that will be used to encode and decode binary
   *  data.
   */
  getAbiCoder() {
    return Ci.defaultAbiCoder();
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(e) {
    const t = v(this, ks, Na).call(this, e, null, !1);
    return m(t, "no matching function", "key", e), t.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(e) {
    return !!v(this, ks, Na).call(this, e, null, !1);
  }
  /**
   *  Get the [[FunctionFragment]] for %%key%%, which may be a function
   *  selector, function name or function signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple functions match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single function in
   *  the ABI, this will throw.
   */
  getFunction(e, t) {
    return v(this, ks, Na).call(this, e, t || null, !0);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(e) {
    const t = Array.from(l(this, Ct).keys());
    t.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < t.length; n++) {
      const s = t[n];
      e(l(this, Ct).get(s), n);
    }
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(e) {
    const t = v(this, Rs, Pa).call(this, e, null, !1);
    return m(t, "no matching event", "key", e), t.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(e) {
    return !!v(this, Rs, Pa).call(this, e, null, !1);
  }
  /**
   *  Get the [[EventFragment]] for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple events match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single event in
   *  the ABI, this will throw.
   */
  getEvent(e, t) {
    return v(this, Rs, Pa).call(this, e, t || null, !0);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(e) {
    const t = Array.from(l(this, Et).keys());
    t.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < t.length; n++) {
      const s = t[n];
      e(l(this, Et).get(s), n);
    }
  }
  /**
   *  Get the [[ErrorFragment]] for %%key%%, which may be an error
   *  selector, error name or error signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple errors match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single error in
   *  the ABI, this will throw.
   */
  getError(e, t) {
    if (V(e)) {
      const s = e.toLowerCase();
      if (eu[s])
        return Me.from(eu[s].signature);
      for (const i of l(this, At).values())
        if (s === i.selector)
          return i;
      return null;
    }
    if (e.indexOf("(") === -1) {
      const s = [];
      for (const [i, a] of l(this, At))
        i.split(
          "("
          /* fix:) */
        )[0] === e && s.push(a);
      if (s.length === 0)
        return e === "Error" ? Me.from("error Error(string)") : e === "Panic" ? Me.from("error Panic(uint256)") : null;
      if (s.length > 1) {
        const i = s.map((a) => JSON.stringify(a.format())).join(", ");
        m(!1, `ambiguous error description (i.e. ${i})`, "name", e);
      }
      return s[0];
    }
    if (e = Me.from(e).format(), e === "Error(string)")
      return Me.from("error Error(string)");
    if (e === "Panic(uint256)")
      return Me.from("error Panic(uint256)");
    const n = l(this, At).get(e);
    return n || null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(e) {
    const t = Array.from(l(this, At).keys());
    t.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < t.length; n++) {
      const s = t[n];
      e(l(this, At).get(s), n);
    }
  }
  // Get the 4-byte selector used by Solidity to identify a function
  /*
  getSelector(fragment: ErrorFragment | FunctionFragment): string {
      if (typeof(fragment) === "string") {
          const matches: Array<Fragment> = [ ];
  
          try { matches.push(this.getFunction(fragment)); } catch (error) { }
          try { matches.push(this.getError(<string>fragment)); } catch (_) { }
  
          if (matches.length === 0) {
              logger.throwArgumentError("unknown fragment", "key", fragment);
          } else if (matches.length > 1) {
              logger.throwArgumentError("ambiguous fragment matches function and error", "key", fragment);
          }
  
          fragment = matches[0];
      }
  
      return dataSlice(id(fragment.format()), 0, 4);
  }
      */
  // Get the 32-byte topic hash used by Solidity to identify an event
  /*
  getEventTopic(fragment: EventFragment): string {
      //if (typeof(fragment) === "string") { fragment = this.getEvent(eventFragment); }
      return id(fragment.format());
  }
  */
  _decodeParams(e, t) {
    return l(this, me).decode(e, t);
  }
  _encodeParams(e, t) {
    return l(this, me).encode(e, t);
  }
  /**
   *  Encodes a ``tx.data`` object for deploying the Contract with
   *  the %%values%% as the constructor arguments.
   */
  encodeDeploy(e) {
    return this._encodeParams(this.deploy.inputs, e || []);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified error (see [[getError]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeErrorResult(e, t) {
    if (typeof e == "string") {
      const n = this.getError(e);
      m(n, "unknown error", "fragment", e), e = n;
    }
    return m(Y(t, 0, 4) === e.selector, `data signature does not match error ${e.name}.`, "data", t), this._decodeParams(e.inputs, Y(t, 4));
  }
  /**
   *  Encodes the transaction revert data for a call result that
   *  reverted from the the Contract with the sepcified %%error%%
   *  (see [[getError]] for valid values for %%fragment%%) with the %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeErrorResult(e, t) {
    if (typeof e == "string") {
      const n = this.getError(e);
      m(n, "unknown error", "fragment", e), e = n;
    }
    return ne([
      e.selector,
      this._encodeParams(e.inputs, t || [])
    ]);
  }
  /**
   *  Decodes the %%data%% from a transaction ``tx.data`` for
   *  the function specified (see [[getFunction]] for valid values
   *  for %%fragment%%).
   *
   *  Most developers should prefer the [[parseTransaction]] method
   *  instead, which will automatically detect the fragment.
   */
  decodeFunctionData(e, t) {
    if (typeof e == "string") {
      const n = this.getFunction(e);
      m(n, "unknown function", "fragment", e), e = n;
    }
    return m(Y(t, 0, 4) === e.selector, `data signature does not match function ${e.name}.`, "data", t), this._decodeParams(e.inputs, Y(t, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(e, t) {
    if (typeof e == "string") {
      const n = this.getFunction(e);
      m(n, "unknown function", "fragment", e), e = n;
    }
    return ne([
      e.selector,
      this._encodeParams(e.inputs, t || [])
    ]);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeFunctionResult(e, t) {
    if (typeof e == "string") {
      const i = this.getFunction(e);
      m(i, "unknown function", "fragment", e), e = i;
    }
    let n = "invalid length for result data";
    const s = ke(t);
    if (s.length % 32 === 0)
      try {
        return l(this, me).decode(e.outputs, s);
      } catch {
        n = "could not decode result data";
      }
    E(!1, n, "BAD_DATA", {
      value: P(s),
      info: { method: e.name, signature: e.format() }
    });
  }
  makeError(e, t) {
    const n = H(e, "data"), s = Ci.getBuiltinCallException("call", t, n);
    if (s.message.startsWith("execution reverted (unknown custom error)")) {
      const o = P(n.slice(0, 4)), c = this.getError(o);
      if (c)
        try {
          const u = l(this, me).decode(c.inputs, n.slice(4));
          s.revert = {
            name: c.name,
            signature: c.format(),
            args: u
          }, s.reason = s.revert.signature, s.message = `execution reverted: ${s.reason}`;
        } catch {
          s.message = "execution reverted (coult not decode custom error)";
        }
    }
    const a = this.parseTransaction(t);
    return a && (s.invocation = {
      method: a.name,
      signature: a.signature,
      args: a.args
    }), s;
  }
  /**
   *  Encodes the result data (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values
   *  for %%fragment%%) with %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeFunctionResult(e, t) {
    if (typeof e == "string") {
      const n = this.getFunction(e);
      m(n, "unknown function", "fragment", e), e = n;
    }
    return P(l(this, me).encode(e.outputs, t || []));
  }
  /*
      spelunk(inputs: Array<ParamType>, values: ReadonlyArray<any>, processfunc: (type: string, value: any) => Promise<any>): Promise<Array<any>> {
          const promises: Array<Promise<>> = [ ];
          const process = function(type: ParamType, value: any): any {
              if (type.baseType === "array") {
                  return descend(type.child
              }
              if (type. === "address") {
              }
          };
  
          const descend = function (inputs: Array<ParamType>, values: ReadonlyArray<any>) {
              if (inputs.length !== values.length) { throw new Error("length mismatch"); }
              
          };
  
          const result: Array<any> = [ ];
          values.forEach((value, index) => {
              if (value == null) {
                  topics.push(null);
              } else if (param.baseType === "array" || param.baseType === "tuple") {
                  logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
              } else if (Array.isArray(value)) {
                  topics.push(value.map((value) => encodeTopic(param, value)));
              } else {
                  topics.push(encodeTopic(param, value));
              }
          });
      }
  */
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(e, t) {
    if (typeof e == "string") {
      const i = this.getEvent(e);
      m(i, "unknown event", "eventFragment", e), e = i;
    }
    E(t.length <= e.inputs.length, `too many arguments for ${e.format()}`, "UNEXPECTED_ARGUMENT", { count: t.length, expectedCount: e.inputs.length });
    const n = [];
    e.anonymous || n.push(e.topicHash);
    const s = (i, a) => i.type === "string" ? Cr(a) : i.type === "bytes" ? se(P(a)) : (i.type === "bool" && typeof a == "boolean" ? a = a ? "0x01" : "0x00" : i.type.match(/^u?int/) ? a = _n(a) : i.type.match(/^bytes/) ? a = df(a, 32) : i.type === "address" && l(this, me).encode(["address"], [a]), Ar(P(a), 32));
    for (t.forEach((i, a) => {
      const o = e.inputs[a];
      if (!o.indexed) {
        m(i == null, "cannot filter non-indexed parameters; must be null", "contract." + o.name, i);
        return;
      }
      i == null ? n.push(null) : o.baseType === "array" || o.baseType === "tuple" ? m(!1, "filtering with tuples or arrays not supported", "contract." + o.name, i) : Array.isArray(i) ? n.push(i.map((c) => s(o, c))) : n.push(s(o, i));
    }); n.length && n[n.length - 1] === null; )
      n.pop();
    return n;
  }
  encodeEventLog(e, t) {
    if (typeof e == "string") {
      const a = this.getEvent(e);
      m(a, "unknown event", "eventFragment", e), e = a;
    }
    const n = [], s = [], i = [];
    return e.anonymous || n.push(e.topicHash), m(t.length === e.inputs.length, "event arguments/values mismatch", "values", t), e.inputs.forEach((a, o) => {
      const c = t[o];
      if (a.indexed)
        if (a.type === "string")
          n.push(Cr(c));
        else if (a.type === "bytes")
          n.push(se(c));
        else {
          if (a.baseType === "tuple" || a.baseType === "array")
            throw new Error("not implemented");
          n.push(l(this, me).encode([a.type], [c]));
        }
      else
        s.push(a), i.push(c);
    }), {
      data: l(this, me).encode(s, i),
      topics: n
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(e, t, n) {
    if (typeof e == "string") {
      const g = this.getEvent(e);
      m(g, "unknown event", "eventFragment", e), e = g;
    }
    if (n != null && !e.anonymous) {
      const g = e.topicHash;
      m(V(n[0], 32) && n[0].toLowerCase() === g, "fragment/topic mismatch", "topics[0]", n[0]), n = n.slice(1);
    }
    const s = [], i = [], a = [];
    e.inputs.forEach((g, b) => {
      g.indexed ? g.type === "string" || g.type === "bytes" || g.baseType === "tuple" || g.baseType === "array" ? (s.push(pe.from({ type: "bytes32", name: g.name })), a.push(!0)) : (s.push(g), a.push(!1)) : (i.push(g), a.push(!1));
    });
    const o = n != null ? l(this, me).decode(s, ne(n)) : null, c = l(this, me).decode(i, t, !0), u = [], h = [];
    let p = 0, d = 0;
    return e.inputs.forEach((g, b) => {
      let A = null;
      if (g.indexed)
        if (o == null)
          A = new $l(null);
        else if (a[b])
          A = new $l(o[d++]);
        else
          try {
            A = o[d++];
          } catch (I) {
            A = I;
          }
      else
        try {
          A = c[p++];
        } catch (I) {
          A = I;
        }
      u.push(A), h.push(g.name || null);
    }), zs.fromItems(u, h);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(e) {
    const t = H(e.data, "tx.data"), n = R(e.value != null ? e.value : 0, "tx.value"), s = this.getFunction(P(t.slice(0, 4)));
    if (!s)
      return null;
    const i = l(this, me).decode(s.inputs, t.slice(4));
    return new Rg(s, s.selector, i, n);
  }
  parseCallResult(e) {
    throw new Error("@TODO");
  }
  /**
   *  Parses a receipt log, finding the matching event and extracts
   *  the parameter values along with other useful event details.
   *
   *  If the matching event cannot be found, returns null.
   */
  parseLog(e) {
    const t = this.getEvent(e.topics[0]);
    return !t || t.anonymous ? null : new kg(t, t.topicHash, this.decodeEventLog(t, e.data, e.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(e) {
    const t = P(e), n = this.getError(Y(t, 0, 4));
    if (!n)
      return null;
    const s = l(this, me).decode(n.inputs, Y(t, 4));
    return new xg(n, n.selector, s);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(e) {
    return e instanceof jn ? e : typeof e == "string" ? new jn(JSON.parse(e)) : typeof e.formatJson == "function" ? new jn(e.formatJson()) : typeof e.format == "function" ? new jn(e.format("json")) : new jn(e);
  }
};
At = new WeakMap(), Et = new WeakMap(), Ct = new WeakMap(), me = new WeakMap(), ks = new WeakSet(), Na = function(e, t, n) {
  if (V(e)) {
    const i = e.toLowerCase();
    for (const a of l(this, Ct).values())
      if (i === a.selector)
        return a;
    return null;
  }
  if (e.indexOf("(") === -1) {
    const i = [];
    for (const [a, o] of l(this, Ct))
      a.split(
        "("
        /* fix:) */
      )[0] === e && i.push(o);
    if (t) {
      const a = t.length > 0 ? t[t.length - 1] : null;
      let o = t.length, c = !0;
      Ee.isTyped(a) && a.type === "overrides" && (c = !1, o--);
      for (let u = i.length - 1; u >= 0; u--) {
        const h = i[u].inputs.length;
        h !== o && (!c || h !== o - 1) && i.splice(u, 1);
      }
      for (let u = i.length - 1; u >= 0; u--) {
        const h = i[u].inputs;
        for (let p = 0; p < t.length; p++)
          if (Ee.isTyped(t[p])) {
            if (p >= h.length) {
              if (t[p].type === "overrides")
                continue;
              i.splice(u, 1);
              break;
            }
            if (t[p].type !== h[p].baseType) {
              i.splice(u, 1);
              break;
            }
          }
      }
    }
    if (i.length === 1 && t && t.length !== i[0].inputs.length) {
      const a = t[t.length - 1];
      (a == null || Array.isArray(a) || typeof a != "object") && i.splice(0, 1);
    }
    if (i.length === 0)
      return null;
    if (i.length > 1 && n) {
      const a = i.map((o) => JSON.stringify(o.format())).join(", ");
      m(!1, `ambiguous function description (i.e. matches ${a})`, "key", e);
    }
    return i[0];
  }
  const s = l(this, Ct).get(kt.from(e).format());
  return s || null;
}, Rs = new WeakSet(), Pa = function(e, t, n) {
  if (V(e)) {
    const i = e.toLowerCase();
    for (const a of l(this, Et).values())
      if (i === a.topicHash)
        return a;
    return null;
  }
  if (e.indexOf("(") === -1) {
    const i = [];
    for (const [a, o] of l(this, Et))
      a.split(
        "("
        /* fix:) */
      )[0] === e && i.push(o);
    if (t) {
      for (let a = i.length - 1; a >= 0; a--)
        i[a].inputs.length < t.length && i.splice(a, 1);
      for (let a = i.length - 1; a >= 0; a--) {
        const o = i[a].inputs;
        for (let c = 0; c < t.length; c++)
          if (Ee.isTyped(t[c]) && t[c].type !== o[c].baseType) {
            i.splice(a, 1);
            break;
          }
      }
    }
    if (i.length === 0)
      return null;
    if (i.length > 1 && n) {
      const a = i.map((o) => JSON.stringify(o.format())).join(", ");
      m(!1, `ambiguous event description (i.e. matches ${a})`, "key", e);
    }
    return i[0];
  }
  const s = l(this, Et).get(St.from(e).format());
  return s || null;
};
let Ac = jn;
const jh = BigInt(0);
function Xr(r) {
  return r ?? null;
}
function ee(r) {
  return r == null ? null : r.toString();
}
class tu {
  /**
   *  Creates a new FeeData for %%gasPrice%%, %%maxFeePerGas%% and
   *  %%maxPriorityFeePerGas%%.
   */
  constructor(e, t, n) {
    /**
     *  The gas price for legacy networks.
     */
    w(this, "gasPrice");
    /**
     *  The maximum fee to pay per gas.
     *
     *  The base fee per gas is defined by the network and based on
     *  congestion, increasing the cost during times of heavy load
     *  and lowering when less busy.
     *
     *  The actual fee per gas will be the base fee for the block
     *  and the priority fee, up to the max fee per gas.
     *
     *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
     */
    w(this, "maxFeePerGas");
    /**
     *  The additional amout to pay per gas to encourage a validator
     *  to include the transaction.
     *
     *  The purpose of this is to compensate the validator for the
     *  adjusted risk for including a given transaction.
     *
     *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
     */
    w(this, "maxPriorityFeePerGas");
    O(this, {
      gasPrice: Xr(e),
      maxFeePerGas: Xr(t),
      maxPriorityFeePerGas: Xr(n)
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { gasPrice: e, maxFeePerGas: t, maxPriorityFeePerGas: n } = this;
    return {
      _type: "FeeData",
      gasPrice: ee(e),
      maxFeePerGas: ee(t),
      maxPriorityFeePerGas: ee(n)
    };
  }
}
function ja(r) {
  const e = {};
  r.to && (e.to = r.to), r.from && (e.from = r.from), r.data && (e.data = P(r.data));
  const t = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const s of t)
    !(s in r) || r[s] == null || (e[s] = R(r[s], `request.${s}`));
  const n = "type,nonce".split(/,/);
  for (const s of n)
    !(s in r) || r[s] == null || (e[s] = L(r[s], `request.${s}`));
  return r.accessList && (e.accessList = Pr(r.accessList)), "blockTag" in r && (e.blockTag = r.blockTag), "enableCcipRead" in r && (e.enableCcipRead = !!r.enableCcipRead), "customData" in r && (e.customData = r.customData), "blobVersionedHashes" in r && r.blobVersionedHashes && (e.blobVersionedHashes = r.blobVersionedHashes.slice()), "kzg" in r && (e.kzg = r.kzg), "blobs" in r && r.blobs && (e.blobs = r.blobs.map((s) => Dc(s) ? P(s) : Object.assign({}, s))), e;
}
var Zt;
class Tg {
  /**
   *  Create a new **Block** object.
   *
   *  This should generally not be necessary as the unless implementing a
   *  low-level library.
   */
  constructor(e, t) {
    /**
     *  The provider connected to the block used to fetch additional details
     *  if necessary.
     */
    w(this, "provider");
    /**
     *  The block number, sometimes called the block height. This is a
     *  sequential number that is one higher than the parent block.
     */
    w(this, "number");
    /**
     *  The block hash.
     *
     *  This hash includes all properties, so can be safely used to identify
     *  an exact set of block properties.
     */
    w(this, "hash");
    /**
     *  The timestamp for this block, which is the number of seconds since
     *  epoch that this block was included.
     */
    w(this, "timestamp");
    /**
     *  The block hash of the parent block.
     */
    w(this, "parentHash");
    /**
     *  The hash tree root of the parent beacon block for the given
     *  execution block. See [[link-eip-4788]].
     */
    w(this, "parentBeaconBlockRoot");
    /**
     *  The nonce.
     *
     *  On legacy networks, this is the random number inserted which
     *  permitted the difficulty target to be reached.
     */
    w(this, "nonce");
    /**
     *  The difficulty target.
     *
     *  On legacy networks, this is the proof-of-work target required
     *  for a block to meet the protocol rules to be included.
     *
     *  On modern networks, this is a random number arrived at using
     *  randao.  @TODO: Find links?
     */
    w(this, "difficulty");
    /**
     *  The total gas limit for this block.
     */
    w(this, "gasLimit");
    /**
     *  The total gas used in this block.
     */
    w(this, "gasUsed");
    /**
     *  The root hash for the global state after applying changes
     *  in this block.
     */
    w(this, "stateRoot");
    /**
     *  The hash of the transaction receipts trie.
     */
    w(this, "receiptsRoot");
    /**
     *  The total amount of blob gas consumed by the transactions
     *  within the block. See [[link-eip-4844]].
     */
    w(this, "blobGasUsed");
    /**
     *  The running total of blob gas consumed in excess of the
     *  target, prior to the block. See [[link-eip-4844]].
     */
    w(this, "excessBlobGas");
    /**
     *  The miner coinbase address, wihch receives any subsidies for
     *  including this block.
     */
    w(this, "miner");
    /**
     *  The latest RANDAO mix of the post beacon state of
     *  the previous block.
     */
    w(this, "prevRandao");
    /**
     *  Any extra data the validator wished to include.
     */
    w(this, "extraData");
    /**
     *  The base fee per gas that all transactions in this block were
     *  charged.
     *
     *  This adjusts after each block, depending on how congested the network
     *  is.
     */
    w(this, "baseFeePerGas");
    y(this, Zt, void 0);
    f(this, Zt, e.transactions.map((n) => typeof n != "string" ? new vi(n, t) : n)), O(this, {
      provider: t,
      hash: Xr(e.hash),
      number: e.number,
      timestamp: e.timestamp,
      parentHash: e.parentHash,
      parentBeaconBlockRoot: e.parentBeaconBlockRoot,
      nonce: e.nonce,
      difficulty: e.difficulty,
      gasLimit: e.gasLimit,
      gasUsed: e.gasUsed,
      blobGasUsed: e.blobGasUsed,
      excessBlobGas: e.excessBlobGas,
      miner: e.miner,
      prevRandao: Xr(e.prevRandao),
      extraData: e.extraData,
      baseFeePerGas: Xr(e.baseFeePerGas),
      stateRoot: e.stateRoot,
      receiptsRoot: e.receiptsRoot
    });
  }
  /**
   *  Returns the list of transaction hashes, in the order
   *  they were executed within the block.
   */
  get transactions() {
    return l(this, Zt).map((e) => typeof e == "string" ? e : e.hash);
  }
  /**
   *  Returns the complete transactions, in the order they
   *  were executed within the block.
   *
   *  This is only available for blocks which prefetched
   *  transactions, by passing ``true`` to %%prefetchTxs%%
   *  into [[Provider-getBlock]].
   */
  get prefetchedTransactions() {
    const e = l(this, Zt).slice();
    return e.length === 0 ? [] : (E(typeof e[0] == "object", "transactions were not prefetched with block request", "UNSUPPORTED_OPERATION", {
      operation: "transactionResponses()"
    }), e);
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { baseFeePerGas: e, difficulty: t, extraData: n, gasLimit: s, gasUsed: i, hash: a, miner: o, prevRandao: c, nonce: u, number: h, parentHash: p, parentBeaconBlockRoot: d, stateRoot: g, receiptsRoot: b, timestamp: A, transactions: I } = this;
    return {
      _type: "Block",
      baseFeePerGas: ee(e),
      difficulty: ee(t),
      extraData: n,
      gasLimit: ee(s),
      gasUsed: ee(i),
      blobGasUsed: ee(this.blobGasUsed),
      excessBlobGas: ee(this.excessBlobGas),
      hash: a,
      miner: o,
      prevRandao: c,
      nonce: u,
      number: h,
      parentHash: p,
      timestamp: A,
      parentBeaconBlockRoot: d,
      stateRoot: g,
      receiptsRoot: b,
      transactions: I
    };
  }
  [Symbol.iterator]() {
    let e = 0;
    const t = this.transactions;
    return {
      next: () => e < this.length ? {
        value: t[e++],
        done: !1
      } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The number of transactions in this block.
   */
  get length() {
    return l(this, Zt).length;
  }
  /**
   *  The [[link-js-date]] this block was included at.
   */
  get date() {
    return this.timestamp == null ? null : new Date(this.timestamp * 1e3);
  }
  /**
   *  Get the transaction at %%indexe%% within this block.
   */
  async getTransaction(e) {
    let t;
    if (typeof e == "number")
      t = l(this, Zt)[e];
    else {
      const n = e.toLowerCase();
      for (const s of l(this, Zt))
        if (typeof s == "string") {
          if (s !== n)
            continue;
          t = s;
          break;
        } else {
          if (s.hash === n)
            continue;
          t = s;
          break;
        }
    }
    if (t == null)
      throw new Error("no such tx");
    return typeof t == "string" ? await this.provider.getTransaction(t) : t;
  }
  /**
   *  If a **Block** was fetched with a request to include the transactions
   *  this will allow synchronous access to those transactions.
   *
   *  If the transactions were not prefetched, this will throw.
   */
  getPrefetchedTransaction(e) {
    const t = this.prefetchedTransactions;
    if (typeof e == "number")
      return t[e];
    e = e.toLowerCase();
    for (const n of t)
      if (n.hash === e)
        return n;
    m(!1, "no matching transaction", "indexOrHash", e);
  }
  /**
   *  Returns true if this block been mined. This provides a type guard
   *  for all properties on a [[MinedBlock]].
   */
  isMined() {
    return !!this.hash;
  }
  /**
   *  Returns true if this block is an [[link-eip-2930]] block.
   */
  isLondon() {
    return !!this.baseFeePerGas;
  }
  /**
   *  @_ignore:
   */
  orphanedEvent() {
    if (!this.isMined())
      throw new Error("");
    return Og(this);
  }
}
Zt = new WeakMap();
class Yi {
  /**
   *  @_ignore:
   */
  constructor(e, t) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    w(this, "provider");
    /**
     *  The transaction hash of the transaction this log occurred in. Use the
     *  [[Log-getTransaction]] to get the [[TransactionResponse]].
     */
    w(this, "transactionHash");
    /**
     *  The block hash of the block this log occurred in. Use the
     *  [[Log-getBlock]] to get the [[Block]].
     */
    w(this, "blockHash");
    /**
     *  The block number of the block this log occurred in. It is preferred
     *  to use the [[Block-hash]] when fetching the related [[Block]],
     *  since in the case of an orphaned block, the block at that height may
     *  have changed.
     */
    w(this, "blockNumber");
    /**
     *  If the **Log** represents a block that was removed due to an orphaned
     *  block, this will be true.
     *
     *  This can only happen within an orphan event listener.
     */
    w(this, "removed");
    /**
     *  The address of the contract that emitted this log.
     */
    w(this, "address");
    /**
     *  The data included in this log when it was emitted.
     */
    w(this, "data");
    /**
     *  The indexed topics included in this log when it was emitted.
     *
     *  All topics are included in the bloom filters, so they can be
     *  efficiently filtered using the [[Provider-getLogs]] method.
     */
    w(this, "topics");
    /**
     *  The index within the block this log occurred at. This is generally
     *  not useful to developers, but can be used with the various roots
     *  to proof inclusion within a block.
     */
    w(this, "index");
    /**
     *  The index within the transaction of this log.
     */
    w(this, "transactionIndex");
    this.provider = t;
    const n = Object.freeze(e.topics.slice());
    O(this, {
      transactionHash: e.transactionHash,
      blockHash: e.blockHash,
      blockNumber: e.blockNumber,
      removed: e.removed,
      address: e.address,
      data: e.data,
      topics: n,
      index: e.index,
      transactionIndex: e.transactionIndex
    });
  }
  /**
   *  Returns a JSON-compatible object.
   */
  toJSON() {
    const { address: e, blockHash: t, blockNumber: n, data: s, index: i, removed: a, topics: o, transactionHash: c, transactionIndex: u } = this;
    return {
      _type: "log",
      address: e,
      blockHash: t,
      blockNumber: n,
      data: s,
      index: i,
      removed: a,
      topics: o,
      transactionHash: c,
      transactionIndex: u
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const e = await this.provider.getBlock(this.blockHash);
    return E(!!e, "failed to find transaction", "UNKNOWN_ERROR", {}), e;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const e = await this.provider.getTransaction(this.transactionHash);
    return E(!!e, "failed to find transaction", "UNKNOWN_ERROR", {}), e;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const e = await this.provider.getTransactionReceipt(this.transactionHash);
    return E(!!e, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), e;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return _g(this);
  }
}
var Mi;
class Vh {
  /**
   *  @_ignore:
   */
  constructor(e, t) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    w(this, "provider");
    /**
     *  The address the transaction was sent to.
     */
    w(this, "to");
    /**
     *  The sender of the transaction.
     */
    w(this, "from");
    /**
     *  The address of the contract if the transaction was directly
     *  responsible for deploying one.
     *
     *  This is non-null **only** if the ``to`` is empty and the ``data``
     *  was successfully executed as initcode.
     */
    w(this, "contractAddress");
    /**
     *  The transaction hash.
     */
    w(this, "hash");
    /**
     *  The index of this transaction within the block transactions.
     */
    w(this, "index");
    /**
     *  The block hash of the [[Block]] this transaction was included in.
     */
    w(this, "blockHash");
    /**
     *  The block number of the [[Block]] this transaction was included in.
     */
    w(this, "blockNumber");
    /**
     *  The bloom filter bytes that represent all logs that occurred within
     *  this transaction. This is generally not useful for most developers,
     *  but can be used to validate the included logs.
     */
    w(this, "logsBloom");
    /**
     *  The actual amount of gas used by this transaction.
     *
     *  When creating a transaction, the amount of gas that will be used can
     *  only be approximated, but the sender must pay the gas fee for the
     *  entire gas limit. After the transaction, the difference is refunded.
     */
    w(this, "gasUsed");
    /**
     *  The gas used for BLObs. See [[link-eip-4844]].
     */
    w(this, "blobGasUsed");
    /**
     *  The amount of gas used by all transactions within the block for this
     *  and all transactions with a lower ``index``.
     *
     *  This is generally not useful for developers but can be used to
     *  validate certain aspects of execution.
     */
    w(this, "cumulativeGasUsed");
    /**
     *  The actual gas price used during execution.
     *
     *  Due to the complexity of [[link-eip-1559]] this value can only
     *  be caluclated after the transaction has been mined, snce the base
     *  fee is protocol-enforced.
     */
    w(this, "gasPrice");
    /**
     *  The price paid per BLOB in gas. See [[link-eip-4844]].
     */
    w(this, "blobGasPrice");
    /**
     *  The [[link-eip-2718]] transaction type.
     */
    w(this, "type");
    //readonly byzantium!: boolean;
    /**
     *  The status of this transaction, indicating success (i.e. ``1``) or
     *  a revert (i.e. ``0``).
     *
     *  This is available in post-byzantium blocks, but some backends may
     *  backfill this value.
     */
    w(this, "status");
    /**
     *  The root hash of this transaction.
     *
     *  This is no present and was only included in pre-byzantium blocks, but
     *  could be used to validate certain parts of the receipt.
     */
    w(this, "root");
    y(this, Mi, void 0);
    f(this, Mi, Object.freeze(e.logs.map((s) => new Yi(s, t))));
    let n = jh;
    e.effectiveGasPrice != null ? n = e.effectiveGasPrice : e.gasPrice != null && (n = e.gasPrice), O(this, {
      provider: t,
      to: e.to,
      from: e.from,
      contractAddress: e.contractAddress,
      hash: e.hash,
      index: e.index,
      blockHash: e.blockHash,
      blockNumber: e.blockNumber,
      logsBloom: e.logsBloom,
      gasUsed: e.gasUsed,
      cumulativeGasUsed: e.cumulativeGasUsed,
      blobGasUsed: e.blobGasUsed,
      gasPrice: n,
      blobGasPrice: e.blobGasPrice,
      type: e.type,
      //byzantium: tx.byzantium,
      status: e.status,
      root: e.root
    });
  }
  /**
   *  The logs for this transaction.
   */
  get logs() {
    return l(this, Mi);
  }
  /**
   *  Returns a JSON-compatible representation.
   */
  toJSON() {
    const {
      to: e,
      from: t,
      contractAddress: n,
      hash: s,
      index: i,
      blockHash: a,
      blockNumber: o,
      logsBloom: c,
      logs: u,
      //byzantium, 
      status: h,
      root: p
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: a,
      blockNumber: o,
      //byzantium, 
      contractAddress: n,
      cumulativeGasUsed: ee(this.cumulativeGasUsed),
      from: t,
      gasPrice: ee(this.gasPrice),
      blobGasUsed: ee(this.blobGasUsed),
      blobGasPrice: ee(this.blobGasPrice),
      gasUsed: ee(this.gasUsed),
      hash: s,
      index: i,
      logs: u,
      logsBloom: c,
      root: p,
      status: h,
      to: e
    };
  }
  /**
   *  @_ignore:
   */
  get length() {
    return this.logs.length;
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () => e < this.length ? { value: this.logs[e++], done: !1 } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The total fee for this transaction, in wei.
   */
  get fee() {
    return this.gasUsed * this.gasPrice;
  }
  /**
   *  Resolves to the block this transaction occurred in.
   */
  async getBlock() {
    const e = await this.provider.getBlock(this.blockHash);
    if (e == null)
      throw new Error("TODO");
    return e;
  }
  /**
   *  Resolves to the transaction this transaction occurred in.
   */
  async getTransaction() {
    const e = await this.provider.getTransaction(this.hash);
    if (e == null)
      throw new Error("TODO");
    return e;
  }
  /**
   *  Resolves to the return value of the execution of this transaction.
   *
   *  Support for this feature is limited, as it requires an archive node
   *  with the ``debug_`` or ``trace_`` API enabled.
   */
  async getResult() {
    return await this.provider.getTransactionResult(this.hash);
  }
  /**
   *  Resolves to the number of confirmations this transaction has.
   */
  async confirmations() {
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return Qh(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(e) {
    return E(!e || e.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), Kh(this, e);
  }
}
Mi = new WeakMap();
var wn;
const il = class il {
  /**
   *  @_ignore:
   */
  constructor(e, t) {
    /**
     *  The provider this is connected to, which will influence how its
     *  methods will resolve its async inspection methods.
     */
    w(this, "provider");
    /**
     *  The block number of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    w(this, "blockNumber");
    /**
     *  The blockHash of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    w(this, "blockHash");
    /**
     *  The index within the block that this transaction resides at.
     */
    w(this, "index");
    /**
     *  The transaction hash.
     */
    w(this, "hash");
    /**
     *  The [[link-eip-2718]] transaction envelope type. This is
     *  ``0`` for legacy transactions types.
     */
    w(this, "type");
    /**
     *  The receiver of this transaction.
     *
     *  If ``null``, then the transaction is an initcode transaction.
     *  This means the result of executing the [[data]] will be deployed
     *  as a new contract on chain (assuming it does not revert) and the
     *  address may be computed using [[getCreateAddress]].
     */
    w(this, "to");
    /**
     *  The sender of this transaction. It is implicitly computed
     *  from the transaction pre-image hash (as the digest) and the
     *  [[signature]] using ecrecover.
     */
    w(this, "from");
    /**
     *  The nonce, which is used to prevent replay attacks and offer
     *  a method to ensure transactions from a given sender are explicitly
     *  ordered.
     *
     *  When sending a transaction, this must be equal to the number of
     *  transactions ever sent by [[from]].
     */
    w(this, "nonce");
    /**
     *  The maximum units of gas this transaction can consume. If execution
     *  exceeds this, the entries transaction is reverted and the sender
     *  is charged for the full amount, despite not state changes being made.
     */
    w(this, "gasLimit");
    /**
     *  The gas price can have various values, depending on the network.
     *
     *  In modern networks, for transactions that are included this is
     *  the //effective gas price// (the fee per gas that was actually
     *  charged), while for transactions that have not been included yet
     *  is the [[maxFeePerGas]].
     *
     *  For legacy transactions, or transactions on legacy networks, this
     *  is the fee that will be charged per unit of gas the transaction
     *  consumes.
     */
    w(this, "gasPrice");
    /**
     *  The maximum priority fee (per unit of gas) to allow a
     *  validator to charge the sender. This is inclusive of the
     *  [[maxFeeFeePerGas]].
     */
    w(this, "maxPriorityFeePerGas");
    /**
     *  The maximum fee (per unit of gas) to allow this transaction
     *  to charge the sender.
     */
    w(this, "maxFeePerGas");
    /**
     *  The [[link-eip-4844]] max fee per BLOb gas.
     */
    w(this, "maxFeePerBlobGas");
    /**
     *  The data.
     */
    w(this, "data");
    /**
     *  The value, in wei. Use [[formatEther]] to format this value
     *  as ether.
     */
    w(this, "value");
    /**
     *  The chain ID.
     */
    w(this, "chainId");
    /**
     *  The signature.
     */
    w(this, "signature");
    /**
     *  The [[link-eip-2930]] access list for transaction types that
     *  support it, otherwise ``null``.
     */
    w(this, "accessList");
    /**
     *  The [[link-eip-4844]] BLOb versioned hashes.
     */
    w(this, "blobVersionedHashes");
    y(this, wn, void 0);
    this.provider = t, this.blockNumber = e.blockNumber != null ? e.blockNumber : null, this.blockHash = e.blockHash != null ? e.blockHash : null, this.hash = e.hash, this.index = e.index, this.type = e.type, this.from = e.from, this.to = e.to || null, this.gasLimit = e.gasLimit, this.nonce = e.nonce, this.data = e.data, this.value = e.value, this.gasPrice = e.gasPrice, this.maxPriorityFeePerGas = e.maxPriorityFeePerGas != null ? e.maxPriorityFeePerGas : null, this.maxFeePerGas = e.maxFeePerGas != null ? e.maxFeePerGas : null, this.maxFeePerBlobGas = e.maxFeePerBlobGas != null ? e.maxFeePerBlobGas : null, this.chainId = e.chainId, this.signature = e.signature, this.accessList = e.accessList != null ? e.accessList : null, this.blobVersionedHashes = e.blobVersionedHashes != null ? e.blobVersionedHashes : null, f(this, wn, -1);
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber: e, blockHash: t, index: n, hash: s, type: i, to: a, from: o, nonce: c, data: u, signature: h, accessList: p, blobVersionedHashes: d } = this;
    return {
      _type: "TransactionResponse",
      accessList: p,
      blockNumber: e,
      blockHash: t,
      blobVersionedHashes: d,
      chainId: ee(this.chainId),
      data: u,
      from: o,
      gasLimit: ee(this.gasLimit),
      gasPrice: ee(this.gasPrice),
      hash: s,
      maxFeePerGas: ee(this.maxFeePerGas),
      maxPriorityFeePerGas: ee(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: ee(this.maxFeePerBlobGas),
      nonce: c,
      signature: h,
      to: a,
      index: n,
      type: i,
      value: ee(this.value)
    };
  }
  /**
   *  Resolves to the Block that this transaction was included in.
   *
   *  This will return null if the transaction has not been included yet.
   */
  async getBlock() {
    let e = this.blockNumber;
    if (e == null) {
      const n = await this.getTransaction();
      n && (e = n.blockNumber);
    }
    if (e == null)
      return null;
    const t = this.provider.getBlock(e);
    if (t == null)
      throw new Error("TODO");
    return t;
  }
  /**
   *  Resolves to this transaction being re-requested from the
   *  provider. This can be used if you have an unmined transaction
   *  and wish to get an up-to-date populated instance.
   */
  async getTransaction() {
    return this.provider.getTransaction(this.hash);
  }
  /**
   *  Resolve to the number of confirmations this transaction has.
   */
  async confirmations() {
    if (this.blockNumber == null) {
      const { tx: t, blockNumber: n } = await Pe({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber()
      });
      return t == null || t.blockNumber == null ? 0 : n - t.blockNumber + 1;
    }
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(e, t) {
    const n = e ?? 1, s = t ?? 0;
    let i = l(this, wn), a = -1, o = i === -1;
    const c = async () => {
      if (o)
        return null;
      const { blockNumber: d, nonce: g } = await Pe({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (g < this.nonce) {
        i = d;
        return;
      }
      if (o)
        return null;
      const b = await this.getTransaction();
      if (!(b && b.blockNumber != null))
        for (a === -1 && (a = i - 3, a < l(this, wn) && (a = l(this, wn))); a <= d; ) {
          if (o)
            return null;
          const A = await this.provider.getBlock(a, !0);
          if (A == null)
            return;
          for (const I of A)
            if (I === this.hash)
              return;
          for (let I = 0; I < A.length; I++) {
            const S = await A.getTransaction(I);
            if (S.from === this.from && S.nonce === this.nonce) {
              if (o)
                return null;
              const _ = await this.provider.getTransactionReceipt(S.hash);
              if (_ == null || d - _.blockNumber + 1 < n)
                return;
              let x = "replaced";
              S.data === this.data && S.to === this.to && S.value === this.value ? x = "repriced" : S.data === "0x" && S.from === S.to && S.value === jh && (x = "cancelled"), E(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: x === "replaced" || x === "cancelled",
                reason: x,
                replacement: S.replaceableTransaction(i),
                hash: S.hash,
                receipt: _
              });
            }
          }
          a++;
        }
    }, u = (d) => {
      if (d == null || d.status !== 0)
        return d;
      E(!1, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: d.to,
          from: d.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: d
      });
    }, h = await this.provider.getTransactionReceipt(this.hash);
    if (n === 0)
      return u(h);
    if (h) {
      if (await h.confirmations() >= n)
        return u(h);
    } else if (await c(), n === 0)
      return null;
    return await new Promise((d, g) => {
      const b = [], A = () => {
        b.forEach((S) => S());
      };
      if (b.push(() => {
        o = !0;
      }), s > 0) {
        const S = setTimeout(() => {
          A(), g(J("wait for transaction timeout", "TIMEOUT"));
        }, s);
        b.push(() => {
          clearTimeout(S);
        });
      }
      const I = async (S) => {
        if (await S.confirmations() >= n) {
          A();
          try {
            d(u(S));
          } catch (_) {
            g(_);
          }
        }
      };
      if (b.push(() => {
        this.provider.off(this.hash, I);
      }), this.provider.on(this.hash, I), i >= 0) {
        const S = async () => {
          try {
            await c();
          } catch (_) {
            if (Ae(_, "TRANSACTION_REPLACED")) {
              A(), g(_);
              return;
            }
          }
          o || this.provider.once("block", S);
        };
        b.push(() => {
          this.provider.off("block", S);
        }), this.provider.once("block", S);
      }
    });
  }
  /**
   *  Returns ``true`` if this transaction has been included.
   *
   *  This is effective only as of the time the TransactionResponse
   *  was instantiated. To get up-to-date information, use
   *  [[getTransaction]].
   *
   *  This provides a Type Guard that this transaction will have
   *  non-null property values for properties that are null for
   *  unmined transactions.
   */
  isMined() {
    return this.blockHash != null;
  }
  /**
   *  Returns true if the transaction is a legacy (i.e. ``type == 0``)
   *  transaction.
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if the transaction is a Berlin (i.e. ``type == 1``)
   *  transaction. See [[link-eip-2070]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if the transaction is a London (i.e. ``type == 2``)
   *  transaction. See [[link-eip-1559]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
   *  transaction. See [[link-eip-4844]].
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that evict this transaction.
   */
  removedEvent() {
    return E(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Qh(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(e) {
    return E(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), E(!e || e.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Kh(this, e);
  }
  /**
   *  Returns a new TransactionResponse instance which has the ability to
   *  detect (and throw an error) if the transaction is replaced, which
   *  will begin scanning at %%startBlock%%.
   *
   *  This should generally not be used by developers and is intended
   *  primarily for internal use. Setting an incorrect %%startBlock%% can
   *  have devastating performance consequences if used incorrectly.
   */
  replaceableTransaction(e) {
    m(Number.isInteger(e) && e >= 0, "invalid startBlock", "startBlock", e);
    const t = new il(this, this.provider);
    return f(t, wn, e), t;
  }
};
wn = new WeakMap();
let vi = il;
function Og(r) {
  return { orphan: "drop-block", hash: r.hash, number: r.number };
}
function Kh(r, e) {
  return { orphan: "reorder-transaction", tx: r, other: e };
}
function Qh(r) {
  return { orphan: "drop-transaction", tx: r };
}
function _g(r) {
  return { orphan: "drop-log", log: {
    transactionHash: r.transactionHash,
    blockHash: r.blockHash,
    blockNumber: r.blockNumber,
    address: r.address,
    data: r.data,
    topics: Object.freeze(r.topics.slice()),
    index: r.index
  } };
}
class Vc extends Yi {
  /**
   * @_ignore:
   */
  constructor(t, n, s) {
    super(t, t.provider);
    /**
     *  The Contract Interface.
     */
    w(this, "interface");
    /**
     *  The matching event.
     */
    w(this, "fragment");
    /**
     *  The parsed arguments passed to the event by ``emit``.
     */
    w(this, "args");
    const i = n.decodeEventLog(s, t.data, t.topics);
    O(this, { args: i, fragment: s, interface: n });
  }
  /**
   *  The name of the event.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The signature of the event.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
class zh extends Yi {
  /**
   * @_ignore:
   */
  constructor(t, n) {
    super(t, t.provider);
    /**
     *  The error encounted when trying to decode the log.
     */
    w(this, "error");
    O(this, { error: n });
  }
}
var xs;
class Lg extends Vh {
  /**
   *  @_ignore:
   */
  constructor(t, n, s) {
    super(s, n);
    y(this, xs, void 0);
    f(this, xs, t);
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((t) => {
      const n = t.topics.length ? l(this, xs).getEvent(t.topics[0]) : null;
      if (n)
        try {
          return new Vc(t, l(this, xs), n);
        } catch (s) {
          return new zh(t, s);
        }
      return t;
    });
  }
}
xs = new WeakMap();
var Di;
class Kc extends vi {
  /**
   *  @_ignore:
   */
  constructor(t, n, s) {
    super(s, n);
    y(this, Di, void 0);
    f(this, Di, t);
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(t, n) {
    const s = await super.wait(t, n);
    return s == null ? null : new Lg(l(this, Di), this.provider, s);
  }
}
Di = new WeakMap();
class Jh extends Wu {
  /**
   *  @_event:
   */
  constructor(t, n, s, i) {
    super(t, n, s);
    /**
     *  The log with no matching events.
     */
    w(this, "log");
    O(this, { log: i });
  }
  /**
   *  Resolves to the block the event occured in.
   */
  async getBlock() {
    return await this.log.getBlock();
  }
  /**
   *  Resolves to the transaction the event occured in.
   */
  async getTransaction() {
    return await this.log.getTransaction();
  }
  /**
   *  Resolves to the transaction receipt the event occured in.
   */
  async getTransactionReceipt() {
    return await this.log.getTransactionReceipt();
  }
}
class Mg extends Jh {
  /**
   *  @_ignore:
   */
  constructor(e, t, n, s, i) {
    super(e, t, n, new Vc(i, e.interface, s));
    const a = e.interface.decodeEventLog(s, this.log.data, this.log.topics);
    O(this, { args: a, fragment: s });
  }
  /**
   *  The event name.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The event signature.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
const nu = BigInt(0);
function qh(r) {
  return r && typeof r.call == "function";
}
function Zh(r) {
  return r && typeof r.estimateGas == "function";
}
function uo(r) {
  return r && typeof r.resolveName == "function";
}
function Yh(r) {
  return r && typeof r.sendTransaction == "function";
}
function $h(r) {
  if (r != null) {
    if (uo(r))
      return r;
    if (r.provider)
      return r.provider;
  }
}
var Bi;
class Dg {
  constructor(e, t, n) {
    y(this, Bi, void 0);
    w(this, "fragment");
    if (O(this, { fragment: t }), t.inputs.length < n.length)
      throw new Error("too many arguments");
    const s = Nr(e.runner, "resolveName"), i = uo(s) ? s : null;
    f(this, Bi, async function() {
      const a = await Promise.all(t.inputs.map((o, c) => n[c] == null ? null : o.walkAsync(n[c], (h, p) => h === "address" ? Array.isArray(p) ? Promise.all(p.map((d) => Te(d, i))) : Te(p, i) : p)));
      return e.interface.encodeFilterTopics(t, a);
    }());
  }
  getTopicFilter() {
    return l(this, Bi);
  }
}
Bi = new WeakMap();
function Nr(r, e) {
  return r == null ? null : typeof r[e] == "function" ? r : r.provider && typeof r.provider[e] == "function" ? r.provider : null;
}
function Qn(r) {
  return r == null ? null : r.provider || null;
}
async function Xh(r, e) {
  const t = Ee.dereference(r, "overrides");
  m(typeof t == "object", "invalid overrides parameter", "overrides", r);
  const n = ja(t);
  return m(n.to == null || (e || []).indexOf("to") >= 0, "cannot override to", "overrides.to", n.to), m(n.data == null || (e || []).indexOf("data") >= 0, "cannot override data", "overrides.data", n.data), n.from && (n.from = n.from), n;
}
async function Bg(r, e, t) {
  const n = Nr(r, "resolveName"), s = uo(n) ? n : null;
  return await Promise.all(e.map((i, a) => i.walkAsync(t[a], (o, c) => (c = Ee.dereference(c, o), o === "address" ? Te(c, s) : c))));
}
function Ug(r) {
  const e = async function(a) {
    const o = await Xh(a, ["data"]);
    o.to = await r.getAddress(), o.from && (o.from = await Te(o.from, $h(r.runner)));
    const c = r.interface, u = R(o.value || nu, "overrides.value") === nu, h = (o.data || "0x") === "0x";
    c.fallback && !c.fallback.payable && c.receive && !h && !u && m(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", a), m(c.fallback || h, "cannot send data to receive-only contract", "overrides.data", o.data);
    const p = c.receive || c.fallback && c.fallback.payable;
    return m(p || u, "cannot send value to non-payable fallback", "overrides.value", o.value), m(c.fallback || h, "cannot send data to receive-only contract", "overrides.data", o.data), o;
  }, t = async function(a) {
    const o = Nr(r.runner, "call");
    E(qh(o), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const c = await e(a);
    try {
      return await o.call(c);
    } catch (u) {
      throw Mc(u) && u.data ? r.interface.makeError(u.data, c) : u;
    }
  }, n = async function(a) {
    const o = r.runner;
    E(Yh(o), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const c = await o.sendTransaction(await e(a)), u = Qn(r.runner);
    return new Kc(r.interface, u, c);
  }, s = async function(a) {
    const o = Nr(r.runner, "estimateGas");
    return E(Zh(o), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await o.estimateGas(await e(a));
  }, i = async (a) => await n(a);
  return O(i, {
    _contract: r,
    estimateGas: s,
    populateTransaction: e,
    send: n,
    staticCall: t
  }), i;
}
function Fg(r, e) {
  const t = function(...u) {
    const h = r.interface.getFunction(e, u);
    return E(h, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: e, args: u }
    }), h;
  }, n = async function(...u) {
    const h = t(...u);
    let p = {};
    if (h.inputs.length + 1 === u.length && (p = await Xh(u.pop()), p.from && (p.from = await Te(p.from, $h(r.runner)))), h.inputs.length !== u.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const d = await Bg(r.runner, h.inputs, u);
    return Object.assign({}, p, await Pe({
      to: r.getAddress(),
      data: r.interface.encodeFunctionData(h, d)
    }));
  }, s = async function(...u) {
    const h = await o(...u);
    return h.length === 1 ? h[0] : h;
  }, i = async function(...u) {
    const h = r.runner;
    E(Yh(h), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const p = await h.sendTransaction(await n(...u)), d = Qn(r.runner);
    return new Kc(r.interface, d, p);
  }, a = async function(...u) {
    const h = Nr(r.runner, "estimateGas");
    return E(Zh(h), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await h.estimateGas(await n(...u));
  }, o = async function(...u) {
    const h = Nr(r.runner, "call");
    E(qh(h), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const p = await n(...u);
    let d = "0x";
    try {
      d = await h.call(p);
    } catch (b) {
      throw Mc(b) && b.data ? r.interface.makeError(b.data, p) : b;
    }
    const g = t(...u);
    return r.interface.decodeFunctionResult(g, d);
  }, c = async (...u) => t(...u).constant ? await s(...u) : await i(...u);
  return O(c, {
    name: r.interface.getFunctionName(e),
    _contract: r,
    _key: e,
    getFragment: t,
    estimateGas: a,
    populateTransaction: n,
    send: i,
    staticCall: s,
    staticCallResult: o
  }), Object.defineProperty(c, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const u = r.interface.getFunction(e);
      return E(u, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: e }
      }), u;
    }
  }), c;
}
function Hg(r, e) {
  const t = function(...s) {
    const i = r.interface.getEvent(e, s);
    return E(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: e, args: s }
    }), i;
  }, n = function(...s) {
    return new Dg(r, t(...s), s);
  };
  return O(n, {
    name: r.interface.getEventName(e),
    _contract: r,
    _key: e,
    getFragment: t
  }), Object.defineProperty(n, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const s = r.interface.getEvent(e);
      return E(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: e }
      }), s;
    }
  }), n;
}
const Va = Symbol.for("_ethersInternal_contract"), ed = /* @__PURE__ */ new WeakMap();
function Gg(r, e) {
  ed.set(r[Va], e);
}
function Ue(r) {
  return ed.get(r[Va]);
}
function Wg(r) {
  return r && typeof r == "object" && "getTopicFilter" in r && typeof r.getTopicFilter == "function" && r.fragment;
}
async function Qc(r, e) {
  let t, n = null;
  if (Array.isArray(e)) {
    const i = function(a) {
      if (V(a, 32))
        return a;
      const o = r.interface.getEvent(a);
      return m(o, "unknown fragment", "name", a), o.topicHash;
    };
    t = e.map((a) => a == null ? null : Array.isArray(a) ? a.map(i) : i(a));
  } else
    e === "*" ? t = [null] : typeof e == "string" ? V(e, 32) ? t = [e] : (n = r.interface.getEvent(e), m(n, "unknown fragment", "event", e), t = [n.topicHash]) : Wg(e) ? t = await e.getTopicFilter() : "fragment" in e ? (n = e.fragment, t = [n.topicHash]) : m(!1, "unknown event name", "event", e);
  t = t.map((i) => {
    if (i == null)
      return null;
    if (Array.isArray(i)) {
      const a = Array.from(new Set(i.map((o) => o.toLowerCase())).values());
      return a.length === 1 ? a[0] : (a.sort(), a);
    }
    return i.toLowerCase();
  });
  const s = t.map((i) => i == null ? "null" : Array.isArray(i) ? i.join("|") : i).join("&");
  return { fragment: n, tag: s, topics: t };
}
async function ci(r, e) {
  const { subs: t } = Ue(r);
  return t.get((await Qc(r, e)).tag) || null;
}
async function ru(r, e, t) {
  const n = Qn(r.runner);
  E(n, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: e });
  const { fragment: s, tag: i, topics: a } = await Qc(r, t), { addr: o, subs: c } = Ue(r);
  let u = c.get(i);
  if (!u) {
    const p = { address: o || r, topics: a }, d = (I) => {
      let S = s;
      if (S == null)
        try {
          S = r.interface.getEvent(I.topics[0]);
        } catch {
        }
      if (S) {
        const _ = S, x = s ? r.interface.decodeEventLog(s, I.data, I.topics) : [];
        Cc(r, t, x, (D) => new Mg(r, D, t, _, I));
      } else
        Cc(r, t, [], (_) => new Jh(r, _, t, I));
    };
    let g = [];
    u = { tag: i, listeners: [], start: () => {
      g.length || g.push(n.on(p, d));
    }, stop: async () => {
      if (g.length == 0)
        return;
      let I = g;
      g = [], await Promise.all(I), n.off(p, d);
    } }, c.set(i, u);
  }
  return u;
}
let Ec = Promise.resolve();
async function jg(r, e, t, n) {
  await Ec;
  const s = await ci(r, e);
  if (!s)
    return !1;
  const i = s.listeners.length;
  return s.listeners = s.listeners.filter(({ listener: a, once: o }) => {
    const c = Array.from(t);
    n && c.push(n(o ? null : a));
    try {
      a.call(r, ...c);
    } catch {
    }
    return !o;
  }), s.listeners.length === 0 && (s.stop(), Ue(r).subs.delete(s.tag)), i > 0;
}
async function Cc(r, e, t, n) {
  try {
    await Ec;
  } catch {
  }
  const s = jg(r, e, t, n);
  return Ec = s, await s;
}
const da = ["then"];
var cw;
const pi = class pi {
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(e, t, n, s) {
    /**
     *  The target to connect to.
     *
     *  This can be an address, ENS name or any [[Addressable]], such as
     *  another contract. To get the resovled address, use the ``getAddress``
     *  method.
     */
    w(this, "target");
    /**
     *  The contract Interface.
     */
    w(this, "interface");
    /**
     *  The connected runner. This is generally a [[Provider]] or a
     *  [[Signer]], which dictates what operations are supported.
     *
     *  For example, a **Contract** connected to a [[Provider]] may
     *  only execute read-only operations.
     */
    w(this, "runner");
    /**
     *  All the Events available on this contract.
     */
    w(this, "filters");
    /**
     *  @_ignore:
     */
    w(this, cw);
    /**
     *  The fallback or receive function if any.
     */
    w(this, "fallback");
    m(typeof e == "string" || ah(e), "invalid value for Contract target", "target", e), n == null && (n = null);
    const i = Ac.from(t);
    O(this, { target: e, runner: n, interface: i }), Object.defineProperty(this, Va, { value: {} });
    let a, o = null, c = null;
    if (s) {
      const p = Qn(n);
      c = new Kc(this.interface, p, s);
    }
    let u = /* @__PURE__ */ new Map();
    if (typeof e == "string")
      if (V(e))
        o = e, a = Promise.resolve(e);
      else {
        const p = Nr(n, "resolveName");
        if (!uo(p))
          throw J("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        a = p.resolveName(e).then((d) => {
          if (d == null)
            throw J("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: e
            });
          return Ue(this).addr = d, d;
        });
      }
    else
      a = e.getAddress().then((p) => {
        if (p == null)
          throw new Error("TODO");
        return Ue(this).addr = p, p;
      });
    Gg(this, { addrPromise: a, addr: o, deployTx: c, subs: u });
    const h = new Proxy({}, {
      get: (p, d, g) => {
        if (typeof d == "symbol" || da.indexOf(d) >= 0)
          return Reflect.get(p, d, g);
        try {
          return this.getEvent(d);
        } catch (b) {
          if (!Ae(b, "INVALID_ARGUMENT") || b.argument !== "key")
            throw b;
        }
      },
      has: (p, d) => da.indexOf(d) >= 0 ? Reflect.has(p, d) : Reflect.has(p, d) || this.interface.hasEvent(String(d))
    });
    return O(this, { filters: h }), O(this, {
      fallback: i.receive || i.fallback ? Ug(this) : null
    }), new Proxy(this, {
      get: (p, d, g) => {
        if (typeof d == "symbol" || d in p || da.indexOf(d) >= 0)
          return Reflect.get(p, d, g);
        try {
          return p.getFunction(d);
        } catch (b) {
          if (!Ae(b, "INVALID_ARGUMENT") || b.argument !== "key")
            throw b;
        }
      },
      has: (p, d) => typeof d == "symbol" || d in p || da.indexOf(d) >= 0 ? Reflect.has(p, d) : p.interface.hasFunction(d)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(e) {
    return new pi(this.target, this.interface, e);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(e) {
    return new pi(e, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await Ue(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const e = Qn(this.runner);
    E(e, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
    const t = await e.getCode(await this.getAddress());
    return t === "0x" ? null : t;
  }
  /**
   *  Resolve to this Contract once the bytecode has been deployed, or
   *  resolve immediately if already deployed.
   */
  async waitForDeployment() {
    const e = this.deploymentTransaction();
    if (e)
      return await e.wait(), this;
    if (await this.getDeployedCode() != null)
      return this;
    const n = Qn(this.runner);
    return E(n != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" }), new Promise((s, i) => {
      const a = async () => {
        try {
          if (await this.getDeployedCode() != null)
            return s(this);
          n.once("block", a);
        } catch (o) {
          i(o);
        }
      };
      a();
    });
  }
  /**
   *  Return the transaction used to deploy this contract.
   *
   *  This is only available if this instance was returned from a
   *  [[ContractFactory]].
   */
  deploymentTransaction() {
    return Ue(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(e) {
    return typeof e != "string" && (e = e.format()), Fg(this, e);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(e) {
    return typeof e != "string" && (e = e.format()), Hg(this, e);
  }
  /**
   *  @_ignore:
   */
  async queryTransaction(e) {
    throw new Error("@TODO");
  }
  /*
      // @TODO: this is a non-backwards compatible change, but will be added
      //        in v7 and in a potential SmartContract class in an upcoming
      //        v6 release
      async getTransactionReceipt(hash: string): Promise<null | ContractTransactionReceipt> {
          const provider = getProvider(this.runner);
          assert(provider, "contract runner does not have a provider",
              "UNSUPPORTED_OPERATION", { operation: "queryTransaction" });
  
          const receipt = await provider.getTransactionReceipt(hash);
          if (receipt == null) { return null; }
  
          return new ContractTransactionReceipt(this.interface, provider, receipt);
      }
      */
  /**
   *  Provide historic access to event data for %%event%% in the range
   *  %%fromBlock%% (default: ``0``) to %%toBlock%% (default: ``"latest"``)
   *  inclusive.
   */
  async queryFilter(e, t, n) {
    t == null && (t = 0), n == null && (n = "latest");
    const { addr: s, addrPromise: i } = Ue(this), a = s || await i, { fragment: o, topics: c } = await Qc(this, e), u = { address: a, topics: c, fromBlock: t, toBlock: n }, h = Qn(this.runner);
    return E(h, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await h.getLogs(u)).map((p) => {
      let d = o;
      if (d == null)
        try {
          d = this.interface.getEvent(p.topics[0]);
        } catch {
        }
      if (d)
        try {
          return new Vc(p, this.interface, d);
        } catch (g) {
          return new zh(p, g);
        }
      return new Yi(p, h);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(e, t) {
    const n = await ru(this, "on", e);
    return n.listeners.push({ listener: t, once: !1 }), n.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(e, t) {
    const n = await ru(this, "once", e);
    return n.listeners.push({ listener: t, once: !0 }), n.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(e, ...t) {
    return await Cc(this, e, t, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(e) {
    if (e) {
      const s = await ci(this, e);
      return s ? s.listeners.length : 0;
    }
    const { subs: t } = Ue(this);
    let n = 0;
    for (const { listeners: s } of t.values())
      n += s.length;
    return n;
  }
  /**
   *  Resolves to the listeners subscribed to %%event%% or all listeners
   *  if unspecified.
   */
  async listeners(e) {
    if (e) {
      const s = await ci(this, e);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: t } = Ue(this);
    let n = [];
    for (const { listeners: s } of t.values())
      n = n.concat(s.map(({ listener: i }) => i));
    return n;
  }
  /**
   *  Remove the %%listener%% from the listeners for %%event%% or remove
   *  all listeners if unspecified.
   */
  async off(e, t) {
    const n = await ci(this, e);
    if (!n)
      return this;
    if (t) {
      const s = n.listeners.map(({ listener: i }) => i).indexOf(t);
      s >= 0 && n.listeners.splice(s, 1);
    }
    return (t == null || n.listeners.length === 0) && (n.stop(), Ue(this).subs.delete(n.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(e) {
    if (e) {
      const t = await ci(this, e);
      if (!t)
        return this;
      t.stop(), Ue(this).subs.delete(t.tag);
    } else {
      const { subs: t } = Ue(this);
      for (const { tag: n, stop: s } of t.values())
        s(), t.delete(n);
    }
    return this;
  }
  /**
   *  Alias for [on].
   */
  async addListener(e, t) {
    return await this.on(e, t);
  }
  /**
   *  Alias for [off].
   */
  async removeListener(e, t) {
    return await this.off(e, t);
  }
  /**
   *  Create a new Class for the %%abi%%.
   */
  static buildClass(e) {
    class t extends pi {
      constructor(s, i = null) {
        super(s, e, i);
      }
    }
    return t;
  }
  /**
   *  Create a new BaseContract with a specified Interface.
   */
  static from(e, t, n) {
    return n == null && (n = null), new this(e, t, n);
  }
};
cw = Va;
let vc = pi;
function Vg() {
  return vc;
}
class es extends Vg() {
}
function Qo(r) {
  return r.match(/^ipfs:\/\/ipfs\//i) ? r = r.substring(12) : r.match(/^ipfs:\/\//i) ? r = r.substring(7) : m(!1, "unsupported IPFS format", "link", r), `https://gateway.ipfs.io/ipfs/${r}`;
}
class Kg {
  /**
   *  Creates a new **MulticoinProviderPluing** for %%name%%.
   */
  constructor(e) {
    /**
     *  The name.
     */
    w(this, "name");
    O(this, { name: e });
  }
  connect(e) {
    return this;
  }
  /**
   *  Returns ``true`` if %%coinType%% is supported by this plugin.
   */
  supportsCoinType(e) {
    return !1;
  }
  /**
   *  Resolves to the encoded %%address%% for %%coinType%%.
   */
  async encodeAddress(e, t) {
    throw new Error("unsupported coin");
  }
  /**
   *  Resolves to the decoded %%data%% for %%coinType%%.
   */
  async decodeAddress(e, t) {
    throw new Error("unsupported coin");
  }
}
const td = new RegExp("^(ipfs)://(.*)$", "i"), su = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  td,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
var bn, ir, An, Gr, Xa, nd;
const Jr = class Jr {
  constructor(e, t, n) {
    y(this, An);
    /**
     *  The connected provider.
     */
    w(this, "provider");
    /**
     *  The address of the resolver.
     */
    w(this, "address");
    /**
     *  The name this resolver was resolved against.
     */
    w(this, "name");
    // For EIP-2544 names, the ancestor that provided the resolver
    y(this, bn, void 0);
    y(this, ir, void 0);
    O(this, { provider: e, address: t, name: n }), f(this, bn, null), f(this, ir, new es(t, [
      "function supportsInterface(bytes4) view returns (bool)",
      "function resolve(bytes, bytes) view returns (bytes)",
      "function addr(bytes32) view returns (address)",
      "function addr(bytes32, uint) view returns (bytes)",
      "function text(bytes32, string) view returns (string)",
      "function contenthash(bytes32) view returns (bytes)"
    ], e));
  }
  /**
   *  Resolves to true if the resolver supports wildcard resolution.
   */
  async supportsWildcard() {
    return l(this, bn) == null && f(this, bn, (async () => {
      try {
        return await l(this, ir).supportsInterface("0x9061b923");
      } catch (e) {
        if (Ae(e, "CALL_EXCEPTION"))
          return !1;
        throw f(this, bn, null), e;
      }
    })()), await l(this, bn);
  }
  /**
   *  Resolves to the address for %%coinType%% or null if the
   *  provided %%coinType%% has not been configured.
   */
  async getAddress(e) {
    if (e == null && (e = 60), e === 60)
      try {
        const i = await v(this, An, Gr).call(this, "addr(bytes32)");
        return i == null || i === gi ? null : i;
      } catch (i) {
        if (Ae(i, "CALL_EXCEPTION"))
          return null;
        throw i;
      }
    if (e >= 0 && e < 2147483648) {
      let i = e + 2147483648;
      const a = await v(this, An, Gr).call(this, "addr(bytes32,uint)", [i]);
      if (V(a, 20))
        return F(a);
    }
    let t = null;
    for (const i of this.provider.plugins)
      if (i instanceof Kg && i.supportsCoinType(e)) {
        t = i;
        break;
      }
    if (t == null)
      return null;
    const n = await v(this, An, Gr).call(this, "addr(bytes32,uint)", [e]);
    if (n == null || n === "0x")
      return null;
    const s = await t.decodeAddress(e, n);
    if (s != null)
      return s;
    E(!1, "invalid coin data", "UNSUPPORTED_OPERATION", {
      operation: `getAddress(${e})`,
      info: { coinType: e, data: n }
    });
  }
  /**
   *  Resolves to the EIP-634 text record for %%key%%, or ``null``
   *  if unconfigured.
   */
  async getText(e) {
    const t = await v(this, An, Gr).call(this, "text(bytes32,string)", [e]);
    return t == null || t === "0x" ? null : t;
  }
  /**
   *  Rsolves to the content-hash or ``null`` if unconfigured.
   */
  async getContentHash() {
    const e = await v(this, An, Gr).call(this, "contenthash(bytes32)");
    if (e == null || e === "0x")
      return null;
    const t = e.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
    if (t) {
      const s = t[1] === "e3010170" ? "ipfs" : "ipns", i = parseInt(t[4], 16);
      if (t[5].length === i * 2)
        return `${s}://${pf("0x" + t[2])}`;
    }
    const n = e.match(/^0xe40101fa011b20([0-9a-f]*)$/);
    if (n && n[1].length === 64)
      return `bzz://${n[1]}`;
    E(!1, "invalid or unsupported content hash data", "UNSUPPORTED_OPERATION", {
      operation: "getContentHash()",
      info: { data: e }
    });
  }
  /**
   *  Resolves to the avatar url or ``null`` if the avatar is either
   *  unconfigured or incorrectly configured (e.g. references an NFT
   *  not owned by the address).
   *
   *  If diagnosing issues with configurations, the [[_getAvatar]]
   *  method may be useful.
   */
  async getAvatar() {
    return (await this._getAvatar()).url;
  }
  /**
   *  When resolving an avatar, there are many steps involved, such
   *  fetching metadata and possibly validating ownership of an
   *  NFT.
   *
   *  This method can be used to examine each step and the value it
   *  was working from.
   */
  async _getAvatar() {
    const e = [{ type: "name", value: this.name }];
    try {
      const t = await this.getText("avatar");
      if (t == null)
        return e.push({ type: "!avatar", value: "" }), { url: null, linkage: e };
      e.push({ type: "avatar", value: t });
      for (let n = 0; n < su.length; n++) {
        const s = t.match(su[n]);
        if (s == null)
          continue;
        const i = s[1].toLowerCase();
        switch (i) {
          case "https":
          case "data":
            return e.push({ type: "url", value: t }), { linkage: e, url: t };
          case "ipfs": {
            const a = Qo(t);
            return e.push({ type: "ipfs", value: t }), e.push({ type: "url", value: a }), { linkage: e, url: a };
          }
          case "erc721":
          case "erc1155": {
            const a = i === "erc721" ? "tokenURI(uint256)" : "uri(uint256)";
            e.push({ type: i, value: t });
            const o = await this.getAddress();
            if (o == null)
              return e.push({ type: "!owner", value: "" }), { url: null, linkage: e };
            const c = (s[2] || "").split("/");
            if (c.length !== 2)
              return e.push({ type: `!${i}caip`, value: s[2] || "" }), { url: null, linkage: e };
            const u = c[1], h = new es(c[0], [
              // ERC-721
              "function tokenURI(uint) view returns (string)",
              "function ownerOf(uint) view returns (address)",
              // ERC-1155
              "function uri(uint) view returns (string)",
              "function balanceOf(address, uint256) view returns (uint)"
            ], this.provider);
            if (i === "erc721") {
              const A = await h.ownerOf(u);
              if (o !== A)
                return e.push({ type: "!owner", value: A }), { url: null, linkage: e };
              e.push({ type: "owner", value: A });
            } else if (i === "erc1155") {
              const A = await h.balanceOf(o, u);
              if (!A)
                return e.push({ type: "!balance", value: "0" }), { url: null, linkage: e };
              e.push({ type: "balance", value: A.toString() });
            }
            let p = await h[a](u);
            if (p == null || p === "0x")
              return e.push({ type: "!metadata-url", value: "" }), { url: null, linkage: e };
            e.push({ type: "metadata-url-base", value: p }), i === "erc1155" && (p = p.replace("{id}", _n(u, 32).substring(2)), e.push({ type: "metadata-url-expanded", value: p })), p.match(/^ipfs:/i) && (p = Qo(p)), e.push({ type: "metadata-url", value: p });
            let d = {};
            const g = await new _t(p).send();
            g.assertOk();
            try {
              d = g.bodyJson;
            } catch {
              try {
                e.push({ type: "!metadata", value: g.bodyText });
              } catch {
                const S = g.body;
                return S && e.push({ type: "!metadata", value: P(S) }), { url: null, linkage: e };
              }
              return { url: null, linkage: e };
            }
            if (!d)
              return e.push({ type: "!metadata", value: "" }), { url: null, linkage: e };
            e.push({ type: "metadata", value: JSON.stringify(d) });
            let b = d.image;
            if (typeof b != "string")
              return e.push({ type: "!imageUrl", value: "" }), { url: null, linkage: e };
            if (!b.match(/^(https:\/\/|data:)/i)) {
              if (b.match(td) == null)
                return e.push({ type: "!imageUrl-ipfs", value: b }), { url: null, linkage: e };
              e.push({ type: "imageUrl-ipfs", value: b }), b = Qo(b);
            }
            return e.push({ type: "url", value: b }), { linkage: e, url: b };
          }
        }
      }
    } catch {
    }
    return { linkage: e, url: null };
  }
  static async getEnsAddress(e) {
    const t = await e.getNetwork(), n = t.getPlugin("org.ethers.plugins.network.Ens");
    return E(n, "network does not support ENS", "UNSUPPORTED_OPERATION", {
      operation: "getEnsAddress",
      info: { network: t }
    }), n.address;
  }
  /**
   *  Resolve to the ENS resolver for %%name%% using %%provider%% or
   *  ``null`` if unconfigured.
   */
  static async fromName(e, t) {
    var s;
    let n = t;
    for (; ; ) {
      if (n === "" || n === "." || t !== "eth" && n === "eth")
        return null;
      const i = await v(s = Jr, Xa, nd).call(s, e, n);
      if (i != null) {
        const a = new Jr(e, i, t);
        return n !== t && !await a.supportsWildcard() ? null : a;
      }
      n = n.split(".").slice(1).join(".");
    }
  }
};
bn = new WeakMap(), ir = new WeakMap(), An = new WeakSet(), Gr = async function(e, t) {
  t = (t || []).slice();
  const n = l(this, ir).interface;
  t.unshift(wc(this.name));
  let s = null;
  await this.supportsWildcard() && (s = n.getFunction(e), E(s, "missing fragment", "UNKNOWN_ERROR", {
    info: { funcName: e }
  }), t = [
    Vp(this.name, 255),
    n.encodeFunctionData(s, t)
  ], e = "resolve(bytes,bytes)"), t.push({
    enableCcipRead: !0
  });
  try {
    const i = await l(this, ir)[e](...t);
    return s ? n.decodeFunctionResult(s, i)[0] : i;
  } catch (i) {
    if (!Ae(i, "CALL_EXCEPTION"))
      throw i;
  }
  return null;
}, Xa = new WeakSet(), nd = async function(e, t) {
  const n = await Jr.getEnsAddress(e);
  try {
    const i = await new es(n, [
      "function resolver(bytes32) view returns (address)"
    ], e).resolver(wc(t), {
      enableCcipRead: !0
    });
    return i === gi ? null : i;
  } catch (s) {
    throw s;
  }
  return null;
}, y(Jr, Xa);
let Ka = Jr;
const iu = BigInt(0);
function U(r, e) {
  return function(t) {
    return t == null ? e : r(t);
  };
}
function ho(r, e) {
  return (t) => {
    if (e && t == null)
      return null;
    if (!Array.isArray(t))
      throw new Error("not an array");
    return t.map((n) => r(n));
  };
}
function $i(r, e) {
  return (t) => {
    const n = {};
    for (const s in r) {
      let i = s;
      if (e && s in e && !(i in t)) {
        for (const a of e[s])
          if (a in t) {
            i = a;
            break;
          }
      }
      try {
        const a = r[s](t[i]);
        a !== void 0 && (n[s] = a);
      } catch (a) {
        const o = a instanceof Error ? a.message : "not-an-error";
        E(!1, `invalid value for value.${s} (${o})`, "BAD_DATA", { value: t });
      }
    }
    return n;
  };
}
function Qg(r) {
  switch (r) {
    case !0:
    case "true":
      return !0;
    case !1:
    case "false":
      return !1;
  }
  m(!1, `invalid boolean; ${JSON.stringify(r)}`, "value", r);
}
function Zs(r) {
  return m(V(r, !0), "invalid data", "value", r), r;
}
function fe(r) {
  return m(V(r, 32), "invalid hash", "value", r), r;
}
const zg = $i({
  address: F,
  blockHash: fe,
  blockNumber: L,
  data: Zs,
  index: L,
  removed: U(Qg, !1),
  topics: ho(fe),
  transactionHash: fe,
  transactionIndex: L
}, {
  index: ["logIndex"]
});
function Jg(r) {
  return zg(r);
}
const qg = $i({
  hash: U(fe),
  parentHash: fe,
  parentBeaconBlockRoot: U(fe, null),
  number: L,
  timestamp: L,
  nonce: U(Zs),
  difficulty: R,
  gasLimit: R,
  gasUsed: R,
  stateRoot: U(fe, null),
  receiptsRoot: U(fe, null),
  blobGasUsed: U(R, null),
  excessBlobGas: U(R, null),
  miner: U(F),
  prevRandao: U(fe, null),
  extraData: Zs,
  baseFeePerGas: U(R)
}, {
  prevRandao: ["mixHash"]
});
function Zg(r) {
  const e = qg(r);
  return e.transactions = r.transactions.map((t) => typeof t == "string" ? t : rd(t)), e;
}
const Yg = $i({
  transactionIndex: L,
  blockNumber: L,
  transactionHash: fe,
  address: F,
  topics: ho(fe),
  data: Zs,
  index: L,
  blockHash: fe
}, {
  index: ["logIndex"]
});
function $g(r) {
  return Yg(r);
}
const Xg = $i({
  to: U(F, null),
  from: U(F, null),
  contractAddress: U(F, null),
  // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
  index: L,
  root: U(P),
  gasUsed: R,
  blobGasUsed: U(R, null),
  logsBloom: U(Zs),
  blockHash: fe,
  hash: fe,
  logs: ho($g),
  blockNumber: L,
  //confirmations: allowNull(getNumber, null),
  cumulativeGasUsed: R,
  effectiveGasPrice: U(R),
  blobGasPrice: U(R, null),
  status: U(L),
  type: U(L, 0)
}, {
  effectiveGasPrice: ["gasPrice"],
  hash: ["transactionHash"],
  index: ["transactionIndex"]
});
function em(r) {
  return Xg(r);
}
function rd(r) {
  r.to && R(r.to) === iu && (r.to = "0x0000000000000000000000000000000000000000");
  const e = $i({
    hash: fe,
    // Some nodes do not return this, usually test nodes (like Ganache)
    index: U(L, void 0),
    type: (t) => t === "0x" || t == null ? 0 : L(t),
    accessList: U(Pr, null),
    blobVersionedHashes: U(ho(fe, !0), null),
    blockHash: U(fe, null),
    blockNumber: U(L, null),
    transactionIndex: U(L, null),
    from: F,
    // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas) must be set
    gasPrice: U(R),
    maxPriorityFeePerGas: U(R),
    maxFeePerGas: U(R),
    maxFeePerBlobGas: U(R, null),
    gasLimit: R,
    to: U(F, null),
    value: R,
    nonce: L,
    data: Zs,
    creates: U(F, null),
    chainId: U(R, null)
  }, {
    data: ["input"],
    gasLimit: ["gas"],
    index: ["transactionIndex"]
  })(r);
  if (e.to == null && e.creates == null && (e.creates = zf(e)), (r.type === 1 || r.type === 2) && r.accessList == null && (e.accessList = []), r.signature ? e.signature = dt.from(r.signature) : e.signature = dt.from(r), e.chainId == null) {
    const t = e.signature.legacyChainId;
    t != null && (e.chainId = t);
  }
  return e.blockHash && R(e.blockHash) === iu && (e.blockHash = null), e;
}
const tm = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class Xi {
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(e) {
    /**
     *  The name of the plugin.
     *
     *  It is recommended to use reverse-domain-notation, which permits
     *  unique names with a known authority as well as hierarchal entries.
     */
    w(this, "name");
    O(this, { name: e });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new Xi(this.name);
  }
}
class fo extends Xi {
  /**
   *  Creates a new GasCostPlugin from %%effectiveBlock%% until the
   *  latest block or another GasCostPlugin supercedes that block number,
   *  with the associated %%costs%%.
   */
  constructor(t, n) {
    t == null && (t = 0);
    super(`org.ethers.network.plugins.GasCost#${t || 0}`);
    /**
     *  The block number to treat these values as valid from.
     *
     *  This allows a hardfork to have updated values included as well as
     *  mulutiple hardforks to be supported.
     */
    w(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    w(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    w(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    w(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    w(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    w(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    w(this, "txAccessListAddress");
    const s = { effectiveBlock: t };
    function i(a, o) {
      let c = (n || {})[a];
      c == null && (c = o), m(typeof c == "number", `invalud value for ${a}`, "costs", n), s[a] = c;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), O(this, s);
  }
  clone() {
    return new fo(this.effectiveBlock, this);
  }
}
class po extends Xi {
  /**
   *  Creates a new **EnsPlugin** connected to %%address%% on the
   *  %%targetNetwork%%. The default ENS address and mainnet is used
   *  if unspecified.
   */
  constructor(t, n) {
    super("org.ethers.plugins.network.Ens");
    /**
     *  The ENS Registrty Contract address.
     */
    w(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    w(this, "targetNetwork");
    O(this, {
      address: t || tm,
      targetNetwork: n ?? 1
    });
  }
  clone() {
    return new po(this.address, this.targetNetwork);
  }
}
var Ui, Fi;
class nm extends Xi {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(t, n) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    y(this, Ui, void 0);
    y(this, Fi, void 0);
    f(this, Ui, t), f(this, Fi, n);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return l(this, Ui);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return l(this, Fi);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Ui = new WeakMap(), Fi = new WeakMap();
const zo = /* @__PURE__ */ new Map();
var Ts, Os, En;
const qr = class qr {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(e, t) {
    y(this, Ts, void 0);
    y(this, Os, void 0);
    y(this, En, void 0);
    f(this, Ts, e), f(this, Os, R(t)), f(this, En, /* @__PURE__ */ new Map());
  }
  /**
   *  Returns a JSON-compatible representation of a Network.
   */
  toJSON() {
    return { name: this.name, chainId: String(this.chainId) };
  }
  /**
   *  The network common name.
   *
   *  This is the canonical name, as networks migh have multiple
   *  names.
   */
  get name() {
    return l(this, Ts);
  }
  set name(e) {
    f(this, Ts, e);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return l(this, Os);
  }
  set chainId(e) {
    f(this, Os, R(e, "chainId"));
  }
  /**
   *  Returns true if %%other%% matches this network. Any chain ID
   *  must match, and if no chain ID is present, the name must match.
   *
   *  This method does not currently check for additional properties,
   *  such as ENS address or plug-in compatibility.
   */
  matches(e) {
    if (e == null)
      return !1;
    if (typeof e == "string") {
      try {
        return this.chainId === R(e);
      } catch {
      }
      return this.name === e;
    }
    if (typeof e == "number" || typeof e == "bigint") {
      try {
        return this.chainId === R(e);
      } catch {
      }
      return !1;
    }
    if (typeof e == "object") {
      if (e.chainId != null) {
        try {
          return this.chainId === R(e.chainId);
        } catch {
        }
        return !1;
      }
      return e.name != null ? this.name === e.name : !1;
    }
    return !1;
  }
  /**
   *  Returns the list of plugins currently attached to this Network.
   */
  get plugins() {
    return Array.from(l(this, En).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(e) {
    if (l(this, En).get(e.name))
      throw new Error(`cannot replace existing plugin: ${e.name} `);
    return l(this, En).set(e.name, e.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(e) {
    return l(this, En).get(e) || null;
  }
  /**
   *  Gets a list of all plugins that match %%name%%, with otr without
   *  a fragment.
   */
  getPlugins(e) {
    return this.plugins.filter((t) => t.name.split("#")[0] === e);
  }
  /**
   *  Create a copy of this Network.
   */
  clone() {
    const e = new qr(this.name, this.chainId);
    return this.plugins.forEach((t) => {
      e.attachPlugin(t.clone());
    }), e;
  }
  /**
   *  Compute the intrinsic gas required for a transaction.
   *
   *  A GasCostPlugin can be attached to override the default
   *  values.
   */
  computeIntrinsicGas(e) {
    const t = this.getPlugin("org.ethers.plugins.network.GasCost") || new fo();
    let n = t.txBase;
    if (e.to == null && (n += t.txCreate), e.data)
      for (let s = 2; s < e.data.length; s += 2)
        e.data.substring(s, s + 2) === "00" ? n += t.txDataZero : n += t.txDataNonzero;
    if (e.accessList) {
      const s = Pr(e.accessList);
      for (const i in s)
        n += t.txAccessListAddress + t.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return n;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(e) {
    if (rm(), e == null)
      return qr.from("mainnet");
    if (typeof e == "number" && (e = BigInt(e)), typeof e == "string" || typeof e == "bigint") {
      const t = zo.get(e);
      if (t)
        return t();
      if (typeof e == "bigint")
        return new qr("unknown", e);
      m(!1, "unknown network", "network", e);
    }
    if (typeof e.clone == "function")
      return e.clone();
    if (typeof e == "object") {
      m(typeof e.name == "string" && typeof e.chainId == "number", "invalid network object name or chainId", "network", e);
      const t = new qr(e.name, e.chainId);
      return (e.ensAddress || e.ensNetwork != null) && t.attachPlugin(new po(e.ensAddress, e.ensNetwork)), t;
    }
    m(!1, "invalid network", "network", e);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(e, t) {
    typeof e == "number" && (e = BigInt(e));
    const n = zo.get(e);
    n && m(!1, `conflicting network for ${JSON.stringify(n.name)}`, "nameOrChainId", e), zo.set(e, t);
  }
};
Ts = new WeakMap(), Os = new WeakMap(), En = new WeakMap();
let ht = qr;
function au(r, e) {
  const t = String(r);
  if (!t.match(/^[0-9.]+$/))
    throw new Error(`invalid gwei value: ${r}`);
  const n = t.split(".");
  if (n.length === 1 && n.push(""), n.length !== 2)
    throw new Error(`invalid gwei value: ${r}`);
  for (; n[1].length < e; )
    n[1] += "0";
  if (n[1].length > 9) {
    let s = BigInt(n[1].substring(0, 9));
    n[1].substring(9).match(/^0+$/) || s++, n[1] = s.toString();
  }
  return BigInt(n[0] + n[1]);
}
function ou(r) {
  return new nm(r, async (e, t, n) => {
    n.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, a] = await Promise.all([
        n.send(),
        e()
      ]);
      s = i;
      const o = s.bodyJson.standard;
      return {
        gasPrice: a.gasPrice,
        maxFeePerGas: au(o.maxFee, 9),
        maxPriorityFeePerGas: au(o.maxPriorityFee, 9)
      };
    } catch (i) {
      E(!1, `error encountered with polygon gas station (${JSON.stringify(n.url)})`, "SERVER_ERROR", { request: n, response: s, error: i });
    }
  });
}
let cu = !1;
function rm() {
  if (cu)
    return;
  cu = !0;
  function r(e, t, n) {
    const s = function() {
      const i = new ht(e, t);
      return n.ensNetwork != null && i.attachPlugin(new po(null, n.ensNetwork)), i.attachPlugin(new fo()), (n.plugins || []).forEach((a) => {
        i.attachPlugin(a);
      }), i;
    };
    ht.register(e, s), ht.register(t, s), n.altNames && n.altNames.forEach((i) => {
      ht.register(i, s);
    });
  }
  r("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), r("ropsten", 3, { ensNetwork: 3 }), r("rinkeby", 4, { ensNetwork: 4 }), r("goerli", 5, { ensNetwork: 5 }), r("kovan", 42, { ensNetwork: 42 }), r("sepolia", 11155111, { ensNetwork: 11155111 }), r("holesky", 17e3, { ensNetwork: 17e3 }), r("classic", 61, {}), r("classicKotti", 6, {}), r("arbitrum", 42161, {
    ensNetwork: 1
  }), r("arbitrum-goerli", 421613, {}), r("arbitrum-sepolia", 421614, {}), r("base", 8453, { ensNetwork: 1 }), r("base-goerli", 84531, {}), r("base-sepolia", 84532, {}), r("bnb", 56, { ensNetwork: 1 }), r("bnbt", 97, {}), r("linea", 59144, { ensNetwork: 1 }), r("linea-goerli", 59140, {}), r("linea-sepolia", 59141, {}), r("matic", 137, {
    ensNetwork: 1,
    plugins: [
      ou("https://gasstation.polygon.technology/v2")
    ]
  }), r("matic-amoy", 80002, {}), r("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      ou("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), r("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), r("optimism-goerli", 420, {}), r("optimism-sepolia", 11155420, {}), r("xdai", 100, { ensNetwork: 1 });
}
function Ic(r) {
  return JSON.parse(JSON.stringify(r));
}
var Yt, ze, Cn, vt, _s, Sa;
class sm {
  /**
   *  Create a new **PollingBlockSubscriber** attached to %%provider%%.
   */
  constructor(e) {
    y(this, _s);
    y(this, Yt, void 0);
    y(this, ze, void 0);
    y(this, Cn, void 0);
    // The most recent block we have scanned for events. The value -2
    // indicates we still need to fetch an initial block number
    y(this, vt, void 0);
    f(this, Yt, e), f(this, ze, null), f(this, Cn, 4e3), f(this, vt, -2);
  }
  /**
   *  The polling interval.
   */
  get pollingInterval() {
    return l(this, Cn);
  }
  set pollingInterval(e) {
    f(this, Cn, e);
  }
  start() {
    l(this, ze) || (f(this, ze, l(this, Yt)._setTimeout(v(this, _s, Sa).bind(this), l(this, Cn))), v(this, _s, Sa).call(this));
  }
  stop() {
    l(this, ze) && (l(this, Yt)._clearTimeout(l(this, ze)), f(this, ze, null));
  }
  pause(e) {
    this.stop(), e && f(this, vt, -2);
  }
  resume() {
    this.start();
  }
}
Yt = new WeakMap(), ze = new WeakMap(), Cn = new WeakMap(), vt = new WeakMap(), _s = new WeakSet(), Sa = async function() {
  try {
    const e = await l(this, Yt).getBlockNumber();
    if (l(this, vt) === -2) {
      f(this, vt, e);
      return;
    }
    if (e !== l(this, vt)) {
      for (let t = l(this, vt) + 1; t <= e; t++) {
        if (l(this, ze) == null)
          return;
        await l(this, Yt).emit("block", t);
      }
      f(this, vt, e);
    }
  } catch {
  }
  l(this, ze) != null && f(this, ze, l(this, Yt)._setTimeout(v(this, _s, Sa).bind(this), l(this, Cn)));
};
var ar, or, vn;
class zc {
  /**
   *  Create a new **OnBlockSubscriber** attached to %%provider%%.
   */
  constructor(e) {
    y(this, ar, void 0);
    y(this, or, void 0);
    y(this, vn, void 0);
    f(this, ar, e), f(this, vn, !1), f(this, or, (t) => {
      this._poll(t, l(this, ar));
    });
  }
  /**
   *  Called on every new block.
   */
  async _poll(e, t) {
    throw new Error("sub-classes must override this");
  }
  start() {
    l(this, vn) || (f(this, vn, !0), l(this, or).call(this, -2), l(this, ar).on("block", l(this, or)));
  }
  stop() {
    l(this, vn) && (f(this, vn, !1), l(this, ar).off("block", l(this, or)));
  }
  pause(e) {
    this.stop();
  }
  resume() {
    this.start();
  }
}
ar = new WeakMap(), or = new WeakMap(), vn = new WeakMap();
var Ls, $t;
class im extends zc {
  constructor(t, n) {
    super(t);
    y(this, Ls, void 0);
    y(this, $t, void 0);
    f(this, Ls, n), f(this, $t, -2);
  }
  pause(t) {
    t && f(this, $t, -2), super.pause(t);
  }
  async _poll(t, n) {
    const s = await n.getBlock(l(this, Ls));
    s != null && (l(this, $t) === -2 ? f(this, $t, s.number) : s.number > l(this, $t) && (n.emit(l(this, Ls), s.number), f(this, $t, s.number)));
  }
}
Ls = new WeakMap(), $t = new WeakMap();
var eo;
class am extends zc {
  constructor(t, n) {
    super(t);
    y(this, eo, void 0);
    f(this, eo, Ic(n));
  }
  async _poll(t, n) {
    throw new Error("@TODO");
  }
}
eo = new WeakMap();
var Ms;
class om extends zc {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%hash%%.
   */
  constructor(t, n) {
    super(t);
    y(this, Ms, void 0);
    f(this, Ms, n);
  }
  async _poll(t, n) {
    const s = await n.getTransactionReceipt(l(this, Ms));
    s && n.emit(l(this, Ms), s);
  }
}
Ms = new WeakMap();
var Xt, Ds, Bs, In, Je, to, sd;
class Jc {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%filter%%.
   */
  constructor(e, t) {
    y(this, to);
    y(this, Xt, void 0);
    y(this, Ds, void 0);
    y(this, Bs, void 0);
    y(this, In, void 0);
    // The most recent block we have scanned for events. The value -2
    // indicates we still need to fetch an initial block number
    y(this, Je, void 0);
    f(this, Xt, e), f(this, Ds, Ic(t)), f(this, Bs, v(this, to, sd).bind(this)), f(this, In, !1), f(this, Je, -2);
  }
  start() {
    l(this, In) || (f(this, In, !0), l(this, Je) === -2 && l(this, Xt).getBlockNumber().then((e) => {
      f(this, Je, e);
    }), l(this, Xt).on("block", l(this, Bs)));
  }
  stop() {
    l(this, In) && (f(this, In, !1), l(this, Xt).off("block", l(this, Bs)));
  }
  pause(e) {
    this.stop(), e && f(this, Je, -2);
  }
  resume() {
    this.start();
  }
}
Xt = new WeakMap(), Ds = new WeakMap(), Bs = new WeakMap(), In = new WeakMap(), Je = new WeakMap(), to = new WeakSet(), sd = async function(e) {
  if (l(this, Je) === -2)
    return;
  const t = Ic(l(this, Ds));
  t.fromBlock = l(this, Je) + 1, t.toBlock = e;
  const n = await l(this, Xt).getLogs(t);
  if (n.length === 0) {
    l(this, Je) < e - 60 && f(this, Je, e - 60);
    return;
  }
  for (const s of n)
    l(this, Xt).emit(l(this, Ds), s), f(this, Je, s.blockNumber);
};
const cm = BigInt(2), lm = 10;
function fa(r) {
  return r && typeof r.then == "function";
}
function ka(r, e) {
  return r + ":" + JSON.stringify(e, (t, n) => {
    if (n == null)
      return "null";
    if (typeof n == "bigint")
      return `bigint:${n.toString()}`;
    if (typeof n == "string")
      return n.toLowerCase();
    if (typeof n == "object" && !Array.isArray(n)) {
      const s = Object.keys(n);
      return s.sort(), s.reduce((i, a) => (i[a] = n[a], i), {});
    }
    return n;
  });
}
class Qa {
  /**
   *  Create a new UnmanagedSubscriber with %%name%%.
   */
  constructor(e) {
    /**
     *  The name fof the event.
     */
    w(this, "name");
    O(this, { name: e });
  }
  start() {
  }
  stop() {
  }
  pause(e) {
  }
  resume() {
  }
}
function um(r) {
  return JSON.parse(JSON.stringify(r));
}
function Nc(r) {
  return r = Array.from(new Set(r).values()), r.sort(), r;
}
async function Jo(r, e) {
  if (r == null)
    throw new Error("invalid event");
  if (Array.isArray(r) && (r = { topics: r }), typeof r == "string")
    switch (r) {
      case "block":
      case "debug":
      case "error":
      case "finalized":
      case "network":
      case "pending":
      case "safe":
        return { type: r, tag: r };
    }
  if (V(r, 32)) {
    const t = r.toLowerCase();
    return { type: "transaction", tag: ka("tx", { hash: t }), hash: t };
  }
  if (r.orphan) {
    const t = r;
    return { type: "orphan", tag: ka("orphan", t), filter: um(t) };
  }
  if (r.address || r.topics) {
    const t = r, n = {
      topics: (t.topics || []).map((s) => s == null ? null : Array.isArray(s) ? Nc(s.map((i) => i.toLowerCase())) : s.toLowerCase())
    };
    if (t.address) {
      const s = [], i = [], a = (o) => {
        V(o) ? s.push(o) : i.push((async () => {
          s.push(await Te(o, e));
        })());
      };
      Array.isArray(t.address) ? t.address.forEach(a) : a(t.address), i.length && await Promise.all(i), n.address = Nc(s.map((o) => o.toLowerCase()));
    }
    return { filter: n, tag: ka("event", n), type: "event" };
  }
  m(!1, "unknown ProviderEvent", "event", r);
}
function qo() {
  return (/* @__PURE__ */ new Date()).getTime();
}
const hm = {
  cacheTimeout: 250,
  pollingInterval: 4e3
};
var ye, Nn, we, Us, We, cr, Pn, en, Hi, qe, Fs, Hs, Ie, Be, Gi, Pc, Wi, Sc, lr, li, ji, kc, ur, ui, Gs, Ra;
class dm {
  /**
   *  Create a new **AbstractProvider** connected to %%network%%, or
   *  use the various network detection capabilities to discover the
   *  [[Network]] if necessary.
   */
  constructor(e, t) {
    // Shares multiple identical requests made during the same 250ms
    y(this, Ie);
    y(this, Gi);
    y(this, Wi);
    // Account
    y(this, lr);
    y(this, ji);
    y(this, ur);
    y(this, Gs);
    y(this, ye, void 0);
    y(this, Nn, void 0);
    // null=unpaused, true=paused+dropWhilePaused, false=paused
    y(this, we, void 0);
    y(this, Us, void 0);
    y(this, We, void 0);
    y(this, cr, void 0);
    y(this, Pn, void 0);
    // The most recent block number if running an event or -1 if no "block" event
    y(this, en, void 0);
    y(this, Hi, void 0);
    y(this, qe, void 0);
    y(this, Fs, void 0);
    y(this, Hs, void 0);
    if (f(this, Hs, Object.assign({}, hm, t || {})), e === "any")
      f(this, cr, !0), f(this, We, null);
    else if (e) {
      const n = ht.from(e);
      f(this, cr, !1), f(this, We, Promise.resolve(n)), setTimeout(() => {
        this.emit("network", n, null);
      }, 0);
    } else
      f(this, cr, !1), f(this, We, null);
    f(this, en, -1), f(this, Pn, /* @__PURE__ */ new Map()), f(this, ye, /* @__PURE__ */ new Map()), f(this, Nn, /* @__PURE__ */ new Map()), f(this, we, null), f(this, Us, !1), f(this, Hi, 1), f(this, qe, /* @__PURE__ */ new Map()), f(this, Fs, !1);
  }
  get pollingInterval() {
    return l(this, Hs).pollingInterval;
  }
  /**
   *  Returns ``this``, to allow an **AbstractProvider** to implement
   *  the [[ContractRunner]] interface.
   */
  get provider() {
    return this;
  }
  /**
   *  Returns all the registered plug-ins.
   */
  get plugins() {
    return Array.from(l(this, Nn).values());
  }
  /**
   *  Attach a new plug-in.
   */
  attachPlugin(e) {
    if (l(this, Nn).get(e.name))
      throw new Error(`cannot replace existing plugin: ${e.name} `);
    return l(this, Nn).set(e.name, e.connect(this)), this;
  }
  /**
   *  Get a plugin by name.
   */
  getPlugin(e) {
    return l(this, Nn).get(e) || null;
  }
  /**
   *  Prevent any CCIP-read operation, regardless of whether requested
   *  in a [[call]] using ``enableCcipRead``.
   */
  get disableCcipRead() {
    return l(this, Fs);
  }
  set disableCcipRead(e) {
    f(this, Fs, !!e);
  }
  /**
   *  Resolves to the data for executing the CCIP-read operations.
   */
  async ccipReadFetch(e, t, n) {
    if (this.disableCcipRead || n.length === 0 || e.to == null)
      return null;
    const s = e.to.toLowerCase(), i = t.toLowerCase(), a = [];
    for (let o = 0; o < n.length; o++) {
      const c = n[o], u = c.replace("{sender}", s).replace("{data}", i), h = new _t(u);
      c.indexOf("{data}") === -1 && (h.body = { data: i, sender: s }), this.emit("debug", { action: "sendCcipReadFetchRequest", request: h, index: o, urls: n });
      let p = "unknown error";
      const d = await h.send();
      try {
        const g = d.bodyJson;
        if (g.data)
          return this.emit("debug", { action: "receiveCcipReadFetchResult", request: h, result: g }), g.data;
        g.message && (p = g.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: h, result: g });
      } catch {
      }
      E(d.statusCode < 400 || d.statusCode >= 500, `response not found during CCIP fetch: ${p}`, "OFFCHAIN_FAULT", { reason: "404_MISSING_RESOURCE", transaction: e, info: { url: c, errorMessage: p } }), a.push(p);
    }
    E(!1, `error encountered during CCIP fetch: ${a.map((o) => JSON.stringify(o)).join(", ")}`, "OFFCHAIN_FAULT", {
      reason: "500_SERVER_ERROR",
      transaction: e,
      info: { urls: n, errorMessages: a }
    });
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a block before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Block]].
   */
  _wrapBlock(e, t) {
    return new Tg(Zg(e), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a log before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Log]].
   */
  _wrapLog(e, t) {
    return new Yi(Jg(e), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  receipt before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionReceipt]].
   */
  _wrapTransactionReceipt(e, t) {
    return new Vh(em(e), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  response before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionResponse]].
   */
  _wrapTransactionResponse(e, t) {
    return new vi(rd(e), this);
  }
  /**
   *  Resolves to the Network, forcing a network detection using whatever
   *  technique the sub-class requires.
   *
   *  Sub-classes **must** override this.
   */
  _detectNetwork() {
    E(!1, "sub-classes must implement this", "UNSUPPORTED_OPERATION", {
      operation: "_detectNetwork"
    });
  }
  /**
   *  Sub-classes should use this to perform all built-in operations. All
   *  methods sanitizes and normalizes the values passed into this.
   *
   *  Sub-classes **must** override this.
   */
  async _perform(e) {
    E(!1, `unsupported method: ${e.method}`, "UNSUPPORTED_OPERATION", {
      operation: e.method,
      info: e
    });
  }
  // State
  async getBlockNumber() {
    const e = L(await v(this, Ie, Be).call(this, { method: "getBlockNumber" }), "%response");
    return l(this, en) >= 0 && f(this, en, e), e;
  }
  /**
   *  Returns or resolves to the address for %%address%%, resolving ENS
   *  names and [[Addressable]] objects and returning if already an
   *  address.
   */
  _getAddress(e) {
    return Te(e, this);
  }
  /**
   *  Returns or resolves to a valid block tag for %%blockTag%%, resolving
   *  negative values and returning if already a valid block tag.
   */
  _getBlockTag(e) {
    if (e == null)
      return "latest";
    switch (e) {
      case "earliest":
        return "0x0";
      case "finalized":
      case "latest":
      case "pending":
      case "safe":
        return e;
    }
    if (V(e))
      return V(e, 32) ? e : Vr(e);
    if (typeof e == "bigint" && (e = L(e, "blockTag")), typeof e == "number")
      return e >= 0 ? Vr(e) : l(this, en) >= 0 ? Vr(l(this, en) + e) : this.getBlockNumber().then((t) => Vr(t + e));
    m(!1, "invalid blockTag", "blockTag", e);
  }
  /**
   *  Returns or resolves to a filter for %%filter%%, resolving any ENS
   *  names or [[Addressable]] object and returning if already a valid
   *  filter.
   */
  _getFilter(e) {
    const t = (e.topics || []).map((c) => c == null ? null : Array.isArray(c) ? Nc(c.map((u) => u.toLowerCase())) : c.toLowerCase()), n = "blockHash" in e ? e.blockHash : void 0, s = (c, u, h) => {
      let p;
      switch (c.length) {
        case 0:
          break;
        case 1:
          p = c[0];
          break;
        default:
          c.sort(), p = c;
      }
      if (n && (u != null || h != null))
        throw new Error("invalid filter");
      const d = {};
      return p && (d.address = p), t.length && (d.topics = t), u && (d.fromBlock = u), h && (d.toBlock = h), n && (d.blockHash = n), d;
    };
    let i = [];
    if (e.address)
      if (Array.isArray(e.address))
        for (const c of e.address)
          i.push(this._getAddress(c));
      else
        i.push(this._getAddress(e.address));
    let a;
    "fromBlock" in e && (a = this._getBlockTag(e.fromBlock));
    let o;
    return "toBlock" in e && (o = this._getBlockTag(e.toBlock)), i.filter((c) => typeof c != "string").length || a != null && typeof a != "string" || o != null && typeof o != "string" ? Promise.all([Promise.all(i), a, o]).then((c) => s(c[0], c[1], c[2])) : s(i, a, o);
  }
  /**
   *  Returns or resolves to a transaction for %%request%%, resolving
   *  any ENS names or [[Addressable]] and returning if already a valid
   *  transaction.
   */
  _getTransactionRequest(e) {
    const t = ja(e), n = [];
    if (["to", "from"].forEach((s) => {
      if (t[s] == null)
        return;
      const i = Te(t[s], this);
      fa(i) ? n.push(async function() {
        t[s] = await i;
      }()) : t[s] = i;
    }), t.blockTag != null) {
      const s = this._getBlockTag(t.blockTag);
      fa(s) ? n.push(async function() {
        t.blockTag = await s;
      }()) : t.blockTag = s;
    }
    return n.length ? async function() {
      return await Promise.all(n), t;
    }() : t;
  }
  async getNetwork() {
    if (l(this, We) == null) {
      const s = (async () => {
        try {
          const i = await this._detectNetwork();
          return this.emit("network", i, null), i;
        } catch (i) {
          throw l(this, We) === s && f(this, We, null), i;
        }
      })();
      return f(this, We, s), (await s).clone();
    }
    const e = l(this, We), [t, n] = await Promise.all([
      e,
      this._detectNetwork()
      // The actual connected network
    ]);
    return t.chainId !== n.chainId && (l(this, cr) ? (this.emit("network", n, t), l(this, We) === e && f(this, We, Promise.resolve(n))) : E(!1, `network changed: ${t.chainId} => ${n.chainId} `, "NETWORK_ERROR", {
      event: "changed"
    })), t.clone();
  }
  async getFeeData() {
    const e = await this.getNetwork(), t = async () => {
      const { _block: s, gasPrice: i, priorityFee: a } = await Pe({
        _block: v(this, ji, kc).call(this, "latest", !1),
        gasPrice: (async () => {
          try {
            const h = await v(this, Ie, Be).call(this, { method: "getGasPrice" });
            return R(h, "%response");
          } catch {
          }
          return null;
        })(),
        priorityFee: (async () => {
          try {
            const h = await v(this, Ie, Be).call(this, { method: "getPriorityFee" });
            return R(h, "%response");
          } catch {
          }
          return null;
        })()
      });
      let o = null, c = null;
      const u = this._wrapBlock(s, e);
      return u && u.baseFeePerGas && (c = a ?? BigInt("1000000000"), o = u.baseFeePerGas * cm + c), new tu(i, o, c);
    }, n = e.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    if (n) {
      const s = new _t(n.url), i = await n.processFunc(t, this, s);
      return new tu(i.gasPrice, i.maxFeePerGas, i.maxPriorityFeePerGas);
    }
    return await t();
  }
  async estimateGas(e) {
    let t = this._getTransactionRequest(e);
    return fa(t) && (t = await t), R(await v(this, Ie, Be).call(this, {
      method: "estimateGas",
      transaction: t
    }), "%response");
  }
  async call(e) {
    const { tx: t, blockTag: n } = await Pe({
      tx: this._getTransactionRequest(e),
      blockTag: this._getBlockTag(e.blockTag)
    });
    return await v(this, Wi, Sc).call(this, v(this, Gi, Pc).call(this, t, n, e.enableCcipRead ? 0 : -1));
  }
  async getBalance(e, t) {
    return R(await v(this, lr, li).call(this, { method: "getBalance" }, e, t), "%response");
  }
  async getTransactionCount(e, t) {
    return L(await v(this, lr, li).call(this, { method: "getTransactionCount" }, e, t), "%response");
  }
  async getCode(e, t) {
    return P(await v(this, lr, li).call(this, { method: "getCode" }, e, t));
  }
  async getStorage(e, t, n) {
    const s = R(t, "position");
    return P(await v(this, lr, li).call(this, { method: "getStorage", position: s }, e, n));
  }
  // Write
  async broadcastTransaction(e) {
    const { blockNumber: t, hash: n, network: s } = await Pe({
      blockNumber: this.getBlockNumber(),
      hash: this._perform({
        method: "broadcastTransaction",
        signedTransaction: e
      }),
      network: this.getNetwork()
    }), i = Ga.from(e);
    if (i.hash !== n)
      throw new Error("@TODO: the returned hash did not match");
    return this._wrapTransactionResponse(i, s).replaceableTransaction(t);
  }
  // Queries
  async getBlock(e, t) {
    const { network: n, params: s } = await Pe({
      network: this.getNetwork(),
      params: v(this, ji, kc).call(this, e, !!t)
    });
    return s == null ? null : this._wrapBlock(s, n);
  }
  async getTransaction(e) {
    const { network: t, params: n } = await Pe({
      network: this.getNetwork(),
      params: v(this, Ie, Be).call(this, { method: "getTransaction", hash: e })
    });
    return n == null ? null : this._wrapTransactionResponse(n, t);
  }
  async getTransactionReceipt(e) {
    const { network: t, params: n } = await Pe({
      network: this.getNetwork(),
      params: v(this, Ie, Be).call(this, { method: "getTransactionReceipt", hash: e })
    });
    if (n == null)
      return null;
    if (n.gasPrice == null && n.effectiveGasPrice == null) {
      const s = await v(this, Ie, Be).call(this, { method: "getTransaction", hash: e });
      if (s == null)
        throw new Error("report this; could not find tx or effectiveGasPrice");
      n.effectiveGasPrice = s.gasPrice;
    }
    return this._wrapTransactionReceipt(n, t);
  }
  async getTransactionResult(e) {
    const { result: t } = await Pe({
      network: this.getNetwork(),
      result: v(this, Ie, Be).call(this, { method: "getTransactionResult", hash: e })
    });
    return t == null ? null : P(t);
  }
  // Bloom-filter Queries
  async getLogs(e) {
    let t = this._getFilter(e);
    fa(t) && (t = await t);
    const { network: n, params: s } = await Pe({
      network: this.getNetwork(),
      params: v(this, Ie, Be).call(this, { method: "getLogs", filter: t })
    });
    return s.map((i) => this._wrapLog(i, n));
  }
  // ENS
  _getProvider(e) {
    E(!1, "provider cannot connect to target network", "UNSUPPORTED_OPERATION", {
      operation: "_getProvider()"
    });
  }
  async getResolver(e) {
    return await Ka.fromName(this, e);
  }
  async getAvatar(e) {
    const t = await this.getResolver(e);
    return t ? await t.getAvatar() : null;
  }
  async resolveName(e) {
    const t = await this.getResolver(e);
    return t ? await t.getAddress() : null;
  }
  async lookupAddress(e) {
    e = F(e);
    const t = wc(e.substring(2).toLowerCase() + ".addr.reverse");
    try {
      const n = await Ka.getEnsAddress(this), i = await new es(n, [
        "function resolver(bytes32) view returns (address)"
      ], this).resolver(t);
      if (i == null || i === gi)
        return null;
      const o = await new es(i, [
        "function name(bytes32) view returns (string)"
      ], this).name(t);
      return await this.resolveName(o) !== e ? null : o;
    } catch (n) {
      if (Ae(n, "BAD_DATA") && n.value === "0x" || Ae(n, "CALL_EXCEPTION"))
        return null;
      throw n;
    }
    return null;
  }
  async waitForTransaction(e, t, n) {
    const s = t ?? 1;
    return s === 0 ? this.getTransactionReceipt(e) : new Promise(async (i, a) => {
      let o = null;
      const c = async (u) => {
        try {
          const h = await this.getTransactionReceipt(e);
          if (h != null && u - h.blockNumber + 1 >= s) {
            i(h), o && (clearTimeout(o), o = null);
            return;
          }
        } catch (h) {
          console.log("EEE", h);
        }
        this.once("block", c);
      };
      n != null && (o = setTimeout(() => {
        o != null && (o = null, this.off("block", c), a(J("timeout", "TIMEOUT", { reason: "timeout" })));
      }, n)), c(await this.getBlockNumber());
    });
  }
  async waitForBlock(e) {
    E(!1, "not implemented yet", "NOT_IMPLEMENTED", {
      operation: "waitForBlock"
    });
  }
  /**
   *  Clear a timer created using the [[_setTimeout]] method.
   */
  _clearTimeout(e) {
    const t = l(this, qe).get(e);
    t && (t.timer && clearTimeout(t.timer), l(this, qe).delete(e));
  }
  /**
   *  Create a timer that will execute %%func%% after at least %%timeout%%
   *  (in ms). If %%timeout%% is unspecified, then %%func%% will execute
   *  in the next event loop.
   *
   *  [Pausing](AbstractProvider-paused) the provider will pause any
   *  associated timers.
   */
  _setTimeout(e, t) {
    t == null && (t = 0);
    const n = ni(this, Hi)._++, s = () => {
      l(this, qe).delete(n), e();
    };
    if (this.paused)
      l(this, qe).set(n, { timer: null, func: s, time: t });
    else {
      const i = setTimeout(s, t);
      l(this, qe).set(n, { timer: i, func: s, time: qo() });
    }
    return n;
  }
  /**
   *  Perform %%func%% on each subscriber.
   */
  _forEachSubscriber(e) {
    for (const t of l(this, ye).values())
      e(t.subscriber);
  }
  /**
   *  Sub-classes may override this to customize subscription
   *  implementations.
   */
  _getSubscriber(e) {
    switch (e.type) {
      case "debug":
      case "error":
      case "network":
        return new Qa(e.type);
      case "block": {
        const t = new sm(this);
        return t.pollingInterval = this.pollingInterval, t;
      }
      case "safe":
      case "finalized":
        return new im(this, e.type);
      case "event":
        return new Jc(this, e.filter);
      case "transaction":
        return new om(this, e.hash);
      case "orphan":
        return new am(this, e.filter);
    }
    throw new Error(`unsupported event: ${e.type}`);
  }
  /**
   *  If a [[Subscriber]] fails and needs to replace itself, this
   *  method may be used.
   *
   *  For example, this is used for providers when using the
   *  ``eth_getFilterChanges`` method, which can return null if state
   *  filters are not supported by the backend, allowing the Subscriber
   *  to swap in a [[PollingEventSubscriber]].
   */
  _recoverSubscriber(e, t) {
    for (const n of l(this, ye).values())
      if (n.subscriber === e) {
        n.started && n.subscriber.stop(), n.subscriber = t, n.started && t.start(), l(this, we) != null && t.pause(l(this, we));
        break;
      }
  }
  async on(e, t) {
    const n = await v(this, Gs, Ra).call(this, e);
    return n.listeners.push({ listener: t, once: !1 }), n.started || (n.subscriber.start(), n.started = !0, l(this, we) != null && n.subscriber.pause(l(this, we))), this;
  }
  async once(e, t) {
    const n = await v(this, Gs, Ra).call(this, e);
    return n.listeners.push({ listener: t, once: !0 }), n.started || (n.subscriber.start(), n.started = !0, l(this, we) != null && n.subscriber.pause(l(this, we))), this;
  }
  async emit(e, ...t) {
    const n = await v(this, ur, ui).call(this, e, t);
    if (!n || n.listeners.length === 0)
      return !1;
    const s = n.listeners.length;
    return n.listeners = n.listeners.filter(({ listener: i, once: a }) => {
      const o = new Wu(this, a ? null : i, e);
      try {
        i.call(this, ...t, o);
      } catch {
      }
      return !a;
    }), n.listeners.length === 0 && (n.started && n.subscriber.stop(), l(this, ye).delete(n.tag)), s > 0;
  }
  async listenerCount(e) {
    if (e) {
      const n = await v(this, ur, ui).call(this, e);
      return n ? n.listeners.length : 0;
    }
    let t = 0;
    for (const { listeners: n } of l(this, ye).values())
      t += n.length;
    return t;
  }
  async listeners(e) {
    if (e) {
      const n = await v(this, ur, ui).call(this, e);
      return n ? n.listeners.map(({ listener: s }) => s) : [];
    }
    let t = [];
    for (const { listeners: n } of l(this, ye).values())
      t = t.concat(n.map(({ listener: s }) => s));
    return t;
  }
  async off(e, t) {
    const n = await v(this, ur, ui).call(this, e);
    if (!n)
      return this;
    if (t) {
      const s = n.listeners.map(({ listener: i }) => i).indexOf(t);
      s >= 0 && n.listeners.splice(s, 1);
    }
    return (!t || n.listeners.length === 0) && (n.started && n.subscriber.stop(), l(this, ye).delete(n.tag)), this;
  }
  async removeAllListeners(e) {
    if (e) {
      const { tag: t, started: n, subscriber: s } = await v(this, Gs, Ra).call(this, e);
      n && s.stop(), l(this, ye).delete(t);
    } else
      for (const [t, { started: n, subscriber: s }] of l(this, ye))
        n && s.stop(), l(this, ye).delete(t);
    return this;
  }
  // Alias for "on"
  async addListener(e, t) {
    return await this.on(e, t);
  }
  // Alias for "off"
  async removeListener(e, t) {
    return this.off(e, t);
  }
  /**
   *  If this provider has been destroyed using the [[destroy]] method.
   *
   *  Once destroyed, all resources are reclaimed, internal event loops
   *  and timers are cleaned up and no further requests may be sent to
   *  the provider.
   */
  get destroyed() {
    return l(this, Us);
  }
  /**
   *  Sub-classes may use this to shutdown any sockets or release their
   *  resources and reject any pending requests.
   *
   *  Sub-classes **must** call ``super.destroy()``.
   */
  destroy() {
    this.removeAllListeners();
    for (const e of l(this, qe).keys())
      this._clearTimeout(e);
    f(this, Us, !0);
  }
  /**
   *  Whether the provider is currently paused.
   *
   *  A paused provider will not emit any events, and generally should
   *  not make any requests to the network, but that is up to sub-classes
   *  to manage.
   *
   *  Setting ``paused = true`` is identical to calling ``.pause(false)``,
   *  which will buffer any events that occur while paused until the
   *  provider is unpaused.
   */
  get paused() {
    return l(this, we) != null;
  }
  set paused(e) {
    !!e !== this.paused && (this.paused ? this.resume() : this.pause(!1));
  }
  /**
   *  Pause the provider. If %%dropWhilePaused%%, any events that occur
   *  while paused are dropped, otherwise all events will be emitted once
   *  the provider is unpaused.
   */
  pause(e) {
    if (f(this, en, -1), l(this, we) != null) {
      if (l(this, we) == !!e)
        return;
      E(!1, "cannot change pause type; resume first", "UNSUPPORTED_OPERATION", {
        operation: "pause"
      });
    }
    this._forEachSubscriber((t) => t.pause(e)), f(this, we, !!e);
    for (const t of l(this, qe).values())
      t.timer && clearTimeout(t.timer), t.time = qo() - t.time;
  }
  /**
   *  Resume the provider.
   */
  resume() {
    if (l(this, we) != null) {
      this._forEachSubscriber((e) => e.resume()), f(this, we, null);
      for (const e of l(this, qe).values()) {
        let t = e.time;
        t < 0 && (t = 0), e.time = qo(), setTimeout(e.func, t);
      }
    }
  }
}
ye = new WeakMap(), Nn = new WeakMap(), we = new WeakMap(), Us = new WeakMap(), We = new WeakMap(), cr = new WeakMap(), Pn = new WeakMap(), en = new WeakMap(), Hi = new WeakMap(), qe = new WeakMap(), Fs = new WeakMap(), Hs = new WeakMap(), Ie = new WeakSet(), Be = async function(e) {
  const t = l(this, Hs).cacheTimeout;
  if (t < 0)
    return await this._perform(e);
  const n = ka(e.method, e);
  let s = l(this, Pn).get(n);
  return s || (s = this._perform(e), l(this, Pn).set(n, s), setTimeout(() => {
    l(this, Pn).get(n) === s && l(this, Pn).delete(n);
  }, t)), await s;
}, Gi = new WeakSet(), Pc = async function(e, t, n) {
  E(n < lm, "CCIP read exceeded maximum redirections", "OFFCHAIN_FAULT", {
    reason: "TOO_MANY_REDIRECTS",
    transaction: Object.assign({}, e, { blockTag: t, enableCcipRead: !0 })
  });
  const s = ja(e);
  try {
    return P(await this._perform({ method: "call", transaction: s, blockTag: t }));
  } catch (i) {
    if (!this.disableCcipRead && Mc(i) && i.data && n >= 0 && t === "latest" && s.to != null && Y(i.data, 0, 4) === "0x556f1830") {
      const a = i.data, o = await Te(s.to, this);
      let c;
      try {
        c = ym(Y(i.data, 4));
      } catch (p) {
        E(!1, p.message, "OFFCHAIN_FAULT", {
          reason: "BAD_DATA",
          transaction: s,
          info: { data: a }
        });
      }
      E(c.sender.toLowerCase() === o.toLowerCase(), "CCIP Read sender mismatch", "CALL_EXCEPTION", {
        action: "call",
        data: a,
        reason: "OffchainLookup",
        transaction: s,
        invocation: null,
        revert: {
          signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
          name: "OffchainLookup",
          args: c.errorArgs
        }
      });
      const u = await this.ccipReadFetch(s, c.calldata, c.urls);
      E(u != null, "CCIP Read failed to fetch data", "OFFCHAIN_FAULT", {
        reason: "FETCH_FAILED",
        transaction: s,
        info: { data: i.data, errorArgs: c.errorArgs }
      });
      const h = {
        to: o,
        data: ne([c.selector, mm([u, c.extraData])])
      };
      this.emit("debug", { action: "sendCcipReadCall", transaction: h });
      try {
        const p = await v(this, Gi, Pc).call(this, h, t, n + 1);
        return this.emit("debug", { action: "receiveCcipReadCallResult", transaction: Object.assign({}, h), result: p }), p;
      } catch (p) {
        throw this.emit("debug", { action: "receiveCcipReadCallError", transaction: Object.assign({}, h), error: p }), p;
      }
    }
    throw i;
  }
}, Wi = new WeakSet(), Sc = async function(e) {
  const { value: t } = await Pe({
    network: this.getNetwork(),
    value: e
  });
  return t;
}, lr = new WeakSet(), li = async function(e, t, n) {
  let s = this._getAddress(t), i = this._getBlockTag(n);
  return (typeof s != "string" || typeof i != "string") && ([s, i] = await Promise.all([s, i])), await v(this, Wi, Sc).call(this, v(this, Ie, Be).call(this, Object.assign(e, { address: s, blockTag: i })));
}, ji = new WeakSet(), kc = async function(e, t) {
  if (V(e, 32))
    return await v(this, Ie, Be).call(this, {
      method: "getBlock",
      blockHash: e,
      includeTransactions: t
    });
  let n = this._getBlockTag(e);
  return typeof n != "string" && (n = await n), await v(this, Ie, Be).call(this, {
    method: "getBlock",
    blockTag: n,
    includeTransactions: t
  });
}, ur = new WeakSet(), ui = async function(e, t) {
  let n = await Jo(e, this);
  return n.type === "event" && t && t.length > 0 && t[0].removed === !0 && (n = await Jo({ orphan: "drop-log", log: t[0] }, this)), l(this, ye).get(n.tag) || null;
}, Gs = new WeakSet(), Ra = async function(e) {
  const t = await Jo(e, this), n = t.tag;
  let s = l(this, ye).get(n);
  return s || (s = { subscriber: this._getSubscriber(t), tag: n, addressableMap: /* @__PURE__ */ new WeakMap(), nameMap: /* @__PURE__ */ new Map(), started: !1, listeners: [] }, l(this, ye).set(n, s)), s;
};
function fm(r, e) {
  try {
    const t = Rc(r, e);
    if (t)
      return La(t);
  } catch {
  }
  return null;
}
function Rc(r, e) {
  if (r === "0x")
    return null;
  try {
    const t = L(Y(r, e, e + 32)), n = L(Y(r, t, t + 32));
    return Y(r, t + 32, t + 32 + n);
  } catch {
  }
  return null;
}
function lu(r) {
  const e = Re(r);
  if (e.length > 32)
    throw new Error("internal; should not happen");
  const t = new Uint8Array(32);
  return t.set(e, 32 - e.length), t;
}
function pm(r) {
  if (r.length % 32 === 0)
    return r;
  const e = new Uint8Array(Math.ceil(r.length / 32) * 32);
  return e.set(r), e;
}
const gm = new Uint8Array([]);
function mm(r) {
  const e = [];
  let t = 0;
  for (let n = 0; n < r.length; n++)
    e.push(gm), t += 32;
  for (let n = 0; n < r.length; n++) {
    const s = H(r[n]);
    e[n] = lu(t), e.push(lu(s.length)), e.push(pm(s)), t += 32 + Math.ceil(s.length / 32) * 32;
  }
  return ne(e);
}
const uu = "0x0000000000000000000000000000000000000000000000000000000000000000";
function ym(r) {
  const e = {
    sender: "",
    urls: [],
    calldata: "",
    selector: "",
    extraData: "",
    errorArgs: []
  };
  E(Zr(r) >= 5 * 32, "insufficient OffchainLookup data", "OFFCHAIN_FAULT", {
    reason: "insufficient OffchainLookup data"
  });
  const t = Y(r, 0, 32);
  E(Y(t, 0, 12) === Y(uu, 0, 12), "corrupt OffchainLookup sender", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup sender"
  }), e.sender = Y(t, 12);
  try {
    const n = [], s = L(Y(r, 32, 64)), i = L(Y(r, s, s + 32)), a = Y(r, s + 32);
    for (let o = 0; o < i; o++) {
      const c = fm(a, o * 32);
      if (c == null)
        throw new Error("abort");
      n.push(c);
    }
    e.urls = n;
  } catch {
    E(!1, "corrupt OffchainLookup urls", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup urls"
    });
  }
  try {
    const n = Rc(r, 64);
    if (n == null)
      throw new Error("abort");
    e.calldata = n;
  } catch {
    E(!1, "corrupt OffchainLookup calldata", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup calldata"
    });
  }
  E(Y(r, 100, 128) === Y(uu, 0, 28), "corrupt OffchainLookup callbaackSelector", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup callbaackSelector"
  }), e.selector = Y(r, 96, 100);
  try {
    const n = Rc(r, 128);
    if (n == null)
      throw new Error("abort");
    e.extraData = n;
  } catch {
    E(!1, "corrupt OffchainLookup extraData", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup extraData"
    });
  }
  return e.errorArgs = "sender,urls,calldata,selector,extraData".split(/,/).map((n) => e[n]), e;
}
function _r(r, e) {
  if (r.provider)
    return r.provider;
  E(!1, "missing provider", "UNSUPPORTED_OPERATION", { operation: e });
}
async function hu(r, e) {
  let t = ja(e);
  if (t.to != null && (t.to = Te(t.to, r)), t.from != null) {
    const n = t.from;
    t.from = Promise.all([
      r.getAddress(),
      Te(n, r)
    ]).then(([s, i]) => (m(s.toLowerCase() === i.toLowerCase(), "transaction from mismatch", "tx.from", i), s));
  } else
    t.from = r.getAddress();
  return await Pe(t);
}
class wm {
  /**
   *  Creates a new Signer connected to %%provider%%.
   */
  constructor(e) {
    /**
     *  The provider this signer is connected to.
     */
    w(this, "provider");
    O(this, { provider: e || null });
  }
  async getNonce(e) {
    return _r(this, "getTransactionCount").getTransactionCount(await this.getAddress(), e);
  }
  async populateCall(e) {
    return await hu(this, e);
  }
  async populateTransaction(e) {
    const t = _r(this, "populateTransaction"), n = await hu(this, e);
    n.nonce == null && (n.nonce = await this.getNonce("pending")), n.gasLimit == null && (n.gasLimit = await this.estimateGas(n));
    const s = await this.provider.getNetwork();
    if (n.chainId != null) {
      const a = R(n.chainId);
      m(a === s.chainId, "transaction chainId mismatch", "tx.chainId", e.chainId);
    } else
      n.chainId = s.chainId;
    const i = n.maxFeePerGas != null || n.maxPriorityFeePerGas != null;
    if (n.gasPrice != null && (n.type === 2 || i) ? m(!1, "eip-1559 transaction do not support gasPrice", "tx", e) : (n.type === 0 || n.type === 1) && i && m(!1, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", e), (n.type === 2 || n.type == null) && n.maxFeePerGas != null && n.maxPriorityFeePerGas != null)
      n.type = 2;
    else if (n.type === 0 || n.type === 1) {
      const a = await t.getFeeData();
      E(a.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", {
        operation: "getGasPrice"
      }), n.gasPrice == null && (n.gasPrice = a.gasPrice);
    } else {
      const a = await t.getFeeData();
      if (n.type == null)
        if (a.maxFeePerGas != null && a.maxPriorityFeePerGas != null)
          if (n.type = 2, n.gasPrice != null) {
            const o = n.gasPrice;
            delete n.gasPrice, n.maxFeePerGas = o, n.maxPriorityFeePerGas = o;
          } else
            n.maxFeePerGas == null && (n.maxFeePerGas = a.maxFeePerGas), n.maxPriorityFeePerGas == null && (n.maxPriorityFeePerGas = a.maxPriorityFeePerGas);
        else
          a.gasPrice != null ? (E(!i, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", {
            operation: "populateTransaction"
          }), n.gasPrice == null && (n.gasPrice = a.gasPrice), n.type = 0) : E(!1, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", {
            operation: "signer.getFeeData"
          });
      else
        (n.type === 2 || n.type === 3) && (n.maxFeePerGas == null && (n.maxFeePerGas = a.maxFeePerGas), n.maxPriorityFeePerGas == null && (n.maxPriorityFeePerGas = a.maxPriorityFeePerGas));
    }
    return await Pe(n);
  }
  async estimateGas(e) {
    return _r(this, "estimateGas").estimateGas(await this.populateCall(e));
  }
  async call(e) {
    return _r(this, "call").call(await this.populateCall(e));
  }
  async resolveName(e) {
    return await _r(this, "resolveName").resolveName(e);
  }
  async sendTransaction(e) {
    const t = _r(this, "sendTransaction"), n = await this.populateTransaction(e);
    delete n.from;
    const s = Ga.from(n);
    return await t.broadcastTransaction(await this.signTransaction(s));
  }
}
const du = /* @__PURE__ */ new Set();
function bm(r) {
  du.has(r) || (du.add(r), console.log("========= NOTICE ========="), console.log(`Request-Rate Exceeded for ${r} (this message will not be repeated)`), console.log(""), console.log("The default API keys for each service are provided as a highly-throttled,"), console.log("community resource for low-traffic projects and early prototyping."), console.log(""), console.log("While your application will continue to function, we highly recommended"), console.log("signing up for your own API keys to improve performance, increase your"), console.log("request rate/limit and enable other perks, such as metrics and advanced APIs."), console.log(""), console.log("For more details: https://docs.ethers.org/api-keys/"), console.log("=========================="));
}
function Am(r) {
  return JSON.parse(JSON.stringify(r));
}
var Ne, It, hr, Sn, dr, Ws, Vi, xc, Ki, Tc;
class id {
  /**
   *  Creates a new **FilterIdSubscriber** which will used [[_subscribe]]
   *  and [[_emitResults]] to setup the subscription and provide the event
   *  to the %%provider%%.
   */
  constructor(e) {
    y(this, Vi);
    y(this, Ki);
    y(this, Ne, void 0);
    y(this, It, void 0);
    y(this, hr, void 0);
    y(this, Sn, void 0);
    y(this, dr, void 0);
    y(this, Ws, void 0);
    f(this, Ne, e), f(this, It, null), f(this, hr, v(this, Vi, xc).bind(this)), f(this, Sn, !1), f(this, dr, null), f(this, Ws, !1);
  }
  /**
   *  Sub-classes **must** override this to begin the subscription.
   */
  _subscribe(e) {
    throw new Error("subclasses must override this");
  }
  /**
   *  Sub-classes **must** override this handle the events.
   */
  _emitResults(e, t) {
    throw new Error("subclasses must override this");
  }
  /**
   *  Sub-classes **must** override this handle recovery on errors.
   */
  _recover(e) {
    throw new Error("subclasses must override this");
  }
  start() {
    l(this, Sn) || (f(this, Sn, !0), v(this, Vi, xc).call(this, -2));
  }
  stop() {
    l(this, Sn) && (f(this, Sn, !1), f(this, Ws, !0), v(this, Ki, Tc).call(this), l(this, Ne).off("block", l(this, hr)));
  }
  pause(e) {
    e && v(this, Ki, Tc).call(this), l(this, Ne).off("block", l(this, hr));
  }
  resume() {
    this.start();
  }
}
Ne = new WeakMap(), It = new WeakMap(), hr = new WeakMap(), Sn = new WeakMap(), dr = new WeakMap(), Ws = new WeakMap(), Vi = new WeakSet(), xc = async function(e) {
  try {
    l(this, It) == null && f(this, It, this._subscribe(l(this, Ne)));
    let t = null;
    try {
      t = await l(this, It);
    } catch (i) {
      if (!Ae(i, "UNSUPPORTED_OPERATION") || i.operation !== "eth_newFilter")
        throw i;
    }
    if (t == null) {
      f(this, It, null), l(this, Ne)._recoverSubscriber(this, this._recover(l(this, Ne)));
      return;
    }
    const n = await l(this, Ne).getNetwork();
    if (l(this, dr) || f(this, dr, n), l(this, dr).chainId !== n.chainId)
      throw new Error("chaid changed");
    if (l(this, Ws))
      return;
    const s = await l(this, Ne).send("eth_getFilterChanges", [t]);
    await this._emitResults(l(this, Ne), s);
  } catch (t) {
    console.log("@TODO", t);
  }
  l(this, Ne).once("block", l(this, hr));
}, Ki = new WeakSet(), Tc = function() {
  const e = l(this, It);
  e && (f(this, It, null), e.then((t) => {
    l(this, Ne).destroyed || l(this, Ne).send("eth_uninstallFilter", [t]);
  }));
};
var fr;
class Em extends id {
  /**
   *  Creates a new **FilterIdEventSubscriber** attached to %%provider%%
   *  listening for %%filter%%.
   */
  constructor(t, n) {
    super(t);
    y(this, fr, void 0);
    f(this, fr, Am(n));
  }
  _recover(t) {
    return new Jc(t, l(this, fr));
  }
  async _subscribe(t) {
    return await t.send("eth_newFilter", [l(this, fr)]);
  }
  async _emitResults(t, n) {
    for (const s of n)
      t.emit(l(this, fr), t._wrapLog(s, t._network));
  }
}
fr = new WeakMap();
class Cm extends id {
  async _subscribe(e) {
    return await e.send("eth_newPendingTransactionFilter", []);
  }
  async _emitResults(e, t) {
    for (const n of t)
      e.emit("pending", n);
  }
}
const vm = "bigint,boolean,function,number,string,symbol".split(/,/g);
function xa(r) {
  if (r == null || vm.indexOf(typeof r) >= 0 || typeof r.getAddress == "function")
    return r;
  if (Array.isArray(r))
    return r.map(xa);
  if (typeof r == "object")
    return Object.keys(r).reduce((e, t) => (e[t] = r[t], e), {});
  throw new Error(`should not happen: ${r} (${typeof r})`);
}
function Im(r) {
  return new Promise((e) => {
    setTimeout(e, r);
  });
}
function Lr(r) {
  return r && r.toLowerCase();
}
function fu(r) {
  return r && typeof r.pollingInterval == "number";
}
const ad = {
  polling: !1,
  staticNetwork: null,
  batchStallTime: 10,
  batchMaxSize: 1 << 20,
  batchMaxCount: 100,
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class ts extends wm {
  constructor(t, n) {
    super(t);
    w(this, "address");
    n = F(n), O(this, { address: n });
  }
  connect(t) {
    E(!1, "cannot reconnect JsonRpcSigner", "UNSUPPORTED_OPERATION", {
      operation: "signer.connect"
    });
  }
  async getAddress() {
    return this.address;
  }
  // JSON-RPC will automatially fill in nonce, etc. so we just check from
  async populateTransaction(t) {
    return await this.populateCall(t);
  }
  // Returns just the hash of the transaction after sent, which is what
  // the bare JSON-RPC API does;
  async sendUncheckedTransaction(t) {
    const n = xa(t), s = [];
    if (n.from) {
      const a = n.from;
      s.push((async () => {
        const o = await Te(a, this.provider);
        m(o != null && o.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), n.from = o;
      })());
    } else
      n.from = this.address;
    if (n.gasLimit == null && s.push((async () => {
      n.gasLimit = await this.provider.estimateGas({ ...n, from: this.address });
    })()), n.to != null) {
      const a = n.to;
      s.push((async () => {
        n.to = await Te(a, this.provider);
      })());
    }
    s.length && await Promise.all(s);
    const i = this.provider.getRpcTransaction(n);
    return this.provider.send("eth_sendTransaction", [i]);
  }
  async sendTransaction(t) {
    const n = await this.provider.getBlockNumber(), s = await this.sendUncheckedTransaction(t);
    return await new Promise((i, a) => {
      const o = [1e3, 100];
      let c = 0;
      const u = async () => {
        try {
          const h = await this.provider.getTransaction(s);
          if (h != null) {
            i(h.replaceableTransaction(n));
            return;
          }
        } catch (h) {
          if (Ae(h, "CANCELLED") || Ae(h, "BAD_DATA") || Ae(h, "NETWORK_ERROR")) {
            h.info == null && (h.info = {}), h.info.sendTransactionHash = s, a(h);
            return;
          }
          if (Ae(h, "INVALID_ARGUMENT") && (c++, h.info == null && (h.info = {}), h.info.sendTransactionHash = s, c > 10)) {
            a(h);
            return;
          }
          this.provider.emit("error", J("failed to fetch transation after sending (will try again)", "UNKNOWN_ERROR", { error: h }));
        }
        this.provider._setTimeout(() => {
          u();
        }, o.pop() || 4e3);
      };
      u();
    });
  }
  async signTransaction(t) {
    const n = xa(t);
    if (n.from) {
      const i = await Te(n.from, this.provider);
      m(i != null && i.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), n.from = i;
    } else
      n.from = this.address;
    const s = this.provider.getRpcTransaction(n);
    return await this.provider.send("eth_signTransaction", [s]);
  }
  async signMessage(t) {
    const n = typeof t == "string" ? xt(t) : t;
    return await this.provider.send("personal_sign", [
      P(n),
      this.address.toLowerCase()
    ]);
  }
  async signTypedData(t, n, s) {
    const i = xa(s), a = await Wa.resolveNames(t, n, i, async (o) => {
      const c = await Te(o);
      return m(c != null, "TypedData does not support null address", "value", o), c;
    });
    return await this.provider.send("eth_signTypedData_v4", [
      this.address.toLowerCase(),
      JSON.stringify(Wa.getPayload(a.domain, n, a.value))
    ]);
  }
  async unlock(t) {
    return this.provider.send("personal_unlockAccount", [
      this.address.toLowerCase(),
      t,
      null
    ]);
  }
  // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
  async _legacySignMessage(t) {
    const n = typeof t == "string" ? xt(t) : t;
    return await this.provider.send("eth_sign", [
      this.address.toLowerCase(),
      P(n)
    ]);
  }
}
var pr, js, tn, Nt, ct, Ze, Le, Qi, Oc;
class od extends dm {
  constructor(t, n) {
    super(t, n);
    y(this, Qi);
    y(this, pr, void 0);
    // The next ID to use for the JSON-RPC ID field
    y(this, js, void 0);
    // Payloads are queued and triggered in batches using the drainTimer
    y(this, tn, void 0);
    y(this, Nt, void 0);
    y(this, ct, void 0);
    y(this, Ze, void 0);
    y(this, Le, void 0);
    f(this, js, 1), f(this, pr, Object.assign({}, ad, n || {})), f(this, tn, []), f(this, Nt, null), f(this, Ze, null), f(this, Le, null);
    {
      let i = null;
      const a = new Promise((o) => {
        i = o;
      });
      f(this, ct, { promise: a, resolve: i });
    }
    const s = this._getOption("staticNetwork");
    typeof s == "boolean" ? (m(!s || t !== "any", "staticNetwork cannot be used on special network 'any'", "options", n), s && t != null && f(this, Ze, ht.from(t))) : s && (m(t == null || s.matches(t), "staticNetwork MUST match network object", "options", n), f(this, Ze, s));
  }
  /**
   *  Returns the value associated with the option %%key%%.
   *
   *  Sub-classes can use this to inquire about configuration options.
   */
  _getOption(t) {
    return l(this, pr)[t];
  }
  /**
   *  Gets the [[Network]] this provider has committed to. On each call, the network
   *  is detected, and if it has changed, the call will reject.
   */
  get _network() {
    return E(l(this, Ze), "network is not available yet", "NETWORK_ERROR"), l(this, Ze);
  }
  /**
   *  Resolves to the non-normalized value by performing %%req%%.
   *
   *  Sub-classes may override this to modify behavior of actions,
   *  and should generally call ``super._perform`` as a fallback.
   */
  async _perform(t) {
    if (t.method === "call" || t.method === "estimateGas") {
      let s = t.transaction;
      if (s && s.type != null && R(s.type) && s.maxFeePerGas == null && s.maxPriorityFeePerGas == null) {
        const i = await this.getFeeData();
        i.maxFeePerGas == null && i.maxPriorityFeePerGas == null && (t = Object.assign({}, t, {
          transaction: Object.assign({}, s, { type: void 0 })
        }));
      }
    }
    const n = this.getRpcRequest(t);
    return n != null ? await this.send(n.method, n.args) : super._perform(t);
  }
  /**
   *  Sub-classes may override this; it detects the *actual* network that
   *  we are **currently** connected to.
   *
   *  Keep in mind that [[send]] may only be used once [[ready]], otherwise the
   *  _send primitive must be used instead.
   */
  async _detectNetwork() {
    const t = this._getOption("staticNetwork");
    if (t)
      if (t === !0) {
        if (l(this, Ze))
          return l(this, Ze);
      } else
        return t;
    return l(this, Le) ? await l(this, Le) : this.ready ? (f(this, Le, (async () => {
      try {
        const n = ht.from(R(await this.send("eth_chainId", [])));
        return f(this, Le, null), n;
      } catch (n) {
        throw f(this, Le, null), n;
      }
    })()), await l(this, Le)) : (f(this, Le, (async () => {
      const n = {
        id: ni(this, js)._++,
        method: "eth_chainId",
        params: [],
        jsonrpc: "2.0"
      };
      this.emit("debug", { action: "sendRpcPayload", payload: n });
      let s;
      try {
        s = (await this._send(n))[0], f(this, Le, null);
      } catch (i) {
        throw f(this, Le, null), this.emit("debug", { action: "receiveRpcError", error: i }), i;
      }
      if (this.emit("debug", { action: "receiveRpcResult", result: s }), "result" in s)
        return ht.from(R(s.result));
      throw this.getRpcError(n, s);
    })()), await l(this, Le));
  }
  /**
   *  Sub-classes **MUST** call this. Until [[_start]] has been called, no calls
   *  will be passed to [[_send]] from [[send]]. If it is overridden, then
   *  ``super._start()`` **MUST** be called.
   *
   *  Calling it multiple times is safe and has no effect.
   */
  _start() {
    l(this, ct) == null || l(this, ct).resolve == null || (l(this, ct).resolve(), f(this, ct, null), (async () => {
      for (; l(this, Ze) == null && !this.destroyed; )
        try {
          f(this, Ze, await this._detectNetwork());
        } catch (t) {
          if (this.destroyed)
            break;
          console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"), this.emit("error", J("failed to bootstrap network detection", "NETWORK_ERROR", { event: "initial-network-discovery", info: { error: t } })), await Im(1e3);
        }
      v(this, Qi, Oc).call(this);
    })());
  }
  /**
   *  Resolves once the [[_start]] has been called. This can be used in
   *  sub-classes to defer sending data until the connection has been
   *  established.
   */
  async _waitUntilReady() {
    if (l(this, ct) != null)
      return await l(this, ct).promise;
  }
  /**
   *  Return a Subscriber that will manage the %%sub%%.
   *
   *  Sub-classes may override this to modify the behavior of
   *  subscription management.
   */
  _getSubscriber(t) {
    return t.type === "pending" ? new Cm(this) : t.type === "event" ? this._getOption("polling") ? new Jc(this, t.filter) : new Em(this, t.filter) : t.type === "orphan" && t.filter.orphan === "drop-log" ? new Qa("orphan") : super._getSubscriber(t);
  }
  /**
   *  Returns true only if the [[_start]] has been called.
   */
  get ready() {
    return l(this, ct) == null;
  }
  /**
   *  Returns %%tx%% as a normalized JSON-RPC transaction request,
   *  which has all values hexlified and any numeric values converted
   *  to Quantity values.
   */
  getRpcTransaction(t) {
    const n = {};
    return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach((s) => {
      if (t[s] == null)
        return;
      let i = s;
      s === "gasLimit" && (i = "gas"), n[i] = Vr(R(t[s], `tx.${s}`));
    }), ["from", "to", "data"].forEach((s) => {
      t[s] != null && (n[s] = P(t[s]));
    }), t.accessList && (n.accessList = Pr(t.accessList)), t.blobVersionedHashes && (n.blobVersionedHashes = t.blobVersionedHashes.map((s) => s.toLowerCase())), n;
  }
  /**
   *  Returns the request method and arguments required to perform
   *  %%req%%.
   */
  getRpcRequest(t) {
    switch (t.method) {
      case "chainId":
        return { method: "eth_chainId", args: [] };
      case "getBlockNumber":
        return { method: "eth_blockNumber", args: [] };
      case "getGasPrice":
        return { method: "eth_gasPrice", args: [] };
      case "getPriorityFee":
        return { method: "eth_maxPriorityFeePerGas", args: [] };
      case "getBalance":
        return {
          method: "eth_getBalance",
          args: [Lr(t.address), t.blockTag]
        };
      case "getTransactionCount":
        return {
          method: "eth_getTransactionCount",
          args: [Lr(t.address), t.blockTag]
        };
      case "getCode":
        return {
          method: "eth_getCode",
          args: [Lr(t.address), t.blockTag]
        };
      case "getStorage":
        return {
          method: "eth_getStorageAt",
          args: [
            Lr(t.address),
            "0x" + t.position.toString(16),
            t.blockTag
          ]
        };
      case "broadcastTransaction":
        return {
          method: "eth_sendRawTransaction",
          args: [t.signedTransaction]
        };
      case "getBlock":
        if ("blockTag" in t)
          return {
            method: "eth_getBlockByNumber",
            args: [t.blockTag, !!t.includeTransactions]
          };
        if ("blockHash" in t)
          return {
            method: "eth_getBlockByHash",
            args: [t.blockHash, !!t.includeTransactions]
          };
        break;
      case "getTransaction":
        return {
          method: "eth_getTransactionByHash",
          args: [t.hash]
        };
      case "getTransactionReceipt":
        return {
          method: "eth_getTransactionReceipt",
          args: [t.hash]
        };
      case "call":
        return {
          method: "eth_call",
          args: [this.getRpcTransaction(t.transaction), t.blockTag]
        };
      case "estimateGas":
        return {
          method: "eth_estimateGas",
          args: [this.getRpcTransaction(t.transaction)]
        };
      case "getLogs":
        return t.filter && t.filter.address != null && (Array.isArray(t.filter.address) ? t.filter.address = t.filter.address.map(Lr) : t.filter.address = Lr(t.filter.address)), { method: "eth_getLogs", args: [t.filter] };
    }
    return null;
  }
  /**
   *  Returns an ethers-style Error for the given JSON-RPC error
   *  %%payload%%, coalescing the various strings and error shapes
   *  that different nodes return, coercing them into a machine-readable
   *  standardized error.
   */
  getRpcError(t, n) {
    const { method: s } = t, { error: i } = n;
    if (s === "eth_estimateGas" && i.message) {
      const c = i.message;
      if (!c.match(/revert/i) && c.match(/insufficient funds/i))
        return J("insufficient funds", "INSUFFICIENT_FUNDS", {
          transaction: t.params[0],
          info: { payload: t, error: i }
        });
    }
    if (s === "eth_call" || s === "eth_estimateGas") {
      const c = _c(i), u = Ci.getBuiltinCallException(s === "eth_call" ? "call" : "estimateGas", t.params[0], c ? c.data : null);
      return u.info = { error: i, payload: t }, u;
    }
    const a = JSON.stringify(Nm(i));
    if (typeof i.message == "string" && i.message.match(/user denied|ethers-user-denied/i))
      return J("user rejected action", "ACTION_REJECTED", {
        action: {
          eth_sign: "signMessage",
          personal_sign: "signMessage",
          eth_signTypedData_v4: "signTypedData",
          eth_signTransaction: "signTransaction",
          eth_sendTransaction: "sendTransaction",
          eth_requestAccounts: "requestAccess",
          wallet_requestAccounts: "requestAccess"
        }[s] || "unknown",
        reason: "rejected",
        info: { payload: t, error: i }
      });
    if (s === "eth_sendRawTransaction" || s === "eth_sendTransaction") {
      const c = t.params[0];
      if (a.match(/insufficient funds|base fee exceeds gas limit/i))
        return J("insufficient funds for intrinsic transaction cost", "INSUFFICIENT_FUNDS", {
          transaction: c,
          info: { error: i }
        });
      if (a.match(/nonce/i) && a.match(/too low/i))
        return J("nonce has already been used", "NONCE_EXPIRED", { transaction: c, info: { error: i } });
      if (a.match(/replacement transaction/i) && a.match(/underpriced/i))
        return J("replacement fee too low", "REPLACEMENT_UNDERPRICED", { transaction: c, info: { error: i } });
      if (a.match(/only replay-protected/i))
        return J("legacy pre-eip-155 transactions not supported", "UNSUPPORTED_OPERATION", {
          operation: s,
          info: { transaction: c, info: { error: i } }
        });
    }
    let o = !!a.match(/the method .* does not exist/i);
    return o || i && i.details && i.details.startsWith("Unauthorized method:") && (o = !0), o ? J("unsupported operation", "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: { error: i, payload: t }
    }) : J("could not coalesce error", "UNKNOWN_ERROR", { error: i, payload: t });
  }
  /**
   *  Requests the %%method%% with %%params%% via the JSON-RPC protocol
   *  over the underlying channel. This can be used to call methods
   *  on the backend that do not have a high-level API within the Provider
   *  API.
   *
   *  This method queues requests according to the batch constraints
   *  in the options, assigns the request a unique ID.
   *
   *  **Do NOT override** this method in sub-classes; instead
   *  override [[_send]] or force the options values in the
   *  call to the constructor to modify this method's behavior.
   */
  send(t, n) {
    if (this.destroyed)
      return Promise.reject(J("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t }));
    const s = ni(this, js)._++, i = new Promise((a, o) => {
      l(this, tn).push({
        resolve: a,
        reject: o,
        payload: { method: t, params: n, id: s, jsonrpc: "2.0" }
      });
    });
    return v(this, Qi, Oc).call(this), i;
  }
  /**
   *  Resolves to the [[Signer]] account for  %%address%% managed by
   *  the client.
   *
   *  If the %%address%% is a number, it is used as an index in the
   *  the accounts from [[listAccounts]].
   *
   *  This can only be used on clients which manage accounts (such as
   *  Geth with imported account or MetaMask).
   *
   *  Throws if the account doesn't exist.
   */
  async getSigner(t) {
    t == null && (t = 0);
    const n = this.send("eth_accounts", []);
    if (typeof t == "number") {
      const i = await n;
      if (t >= i.length)
        throw new Error("no such account");
      return new ts(this, i[t]);
    }
    const { accounts: s } = await Pe({
      network: this.getNetwork(),
      accounts: n
    });
    t = F(t);
    for (const i of s)
      if (F(i) === t)
        return new ts(this, t);
    throw new Error("invalid account");
  }
  async listAccounts() {
    return (await this.send("eth_accounts", [])).map((n) => new ts(this, n));
  }
  destroy() {
    l(this, Nt) && (clearTimeout(l(this, Nt)), f(this, Nt, null));
    for (const { payload: t, reject: n } of l(this, tn))
      n(J("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t.method }));
    f(this, tn, []), super.destroy();
  }
}
pr = new WeakMap(), js = new WeakMap(), tn = new WeakMap(), Nt = new WeakMap(), ct = new WeakMap(), Ze = new WeakMap(), Le = new WeakMap(), Qi = new WeakSet(), Oc = function() {
  if (l(this, Nt))
    return;
  const t = this._getOption("batchMaxCount") === 1 ? 0 : this._getOption("batchStallTime");
  f(this, Nt, setTimeout(() => {
    f(this, Nt, null);
    const n = l(this, tn);
    for (f(this, tn, []); n.length; ) {
      const s = [n.shift()];
      for (; n.length && s.length !== l(this, pr).batchMaxCount; )
        if (s.push(n.shift()), JSON.stringify(s.map((a) => a.payload)).length > l(this, pr).batchMaxSize) {
          n.unshift(s.pop());
          break;
        }
      (async () => {
        const i = s.length === 1 ? s[0].payload : s.map((a) => a.payload);
        this.emit("debug", { action: "sendRpcPayload", payload: i });
        try {
          const a = await this._send(i);
          this.emit("debug", { action: "receiveRpcResult", result: a });
          for (const { resolve: o, reject: c, payload: u } of s) {
            if (this.destroyed) {
              c(J("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: u.method }));
              continue;
            }
            const h = a.filter((p) => p.id === u.id)[0];
            if (h == null) {
              const p = J("missing response for request", "BAD_DATA", {
                value: a,
                info: { payload: u }
              });
              this.emit("error", p), c(p);
              continue;
            }
            if ("error" in h) {
              c(this.getRpcError(u, h));
              continue;
            }
            o(h.result);
          }
        } catch (a) {
          this.emit("debug", { action: "receiveRpcError", error: a });
          for (const { reject: o } of s)
            o(a);
        }
      })();
    }
  }, t));
};
var kn;
class cd extends od {
  constructor(t, n) {
    super(t, n);
    y(this, kn, void 0);
    let s = this._getOption("pollingInterval");
    s == null && (s = ad.pollingInterval), f(this, kn, s);
  }
  _getSubscriber(t) {
    const n = super._getSubscriber(t);
    return fu(n) && (n.pollingInterval = l(this, kn)), n;
  }
  /**
   *  The polling interval (default: 4000 ms)
   */
  get pollingInterval() {
    return l(this, kn);
  }
  set pollingInterval(t) {
    if (!Number.isInteger(t) || t < 0)
      throw new Error("invalid interval");
    f(this, kn, t), this._forEachSubscriber((n) => {
      fu(n) && (n.pollingInterval = l(this, kn));
    });
  }
}
kn = new WeakMap();
var Vs;
class ld extends cd {
  constructor(t, n, s) {
    t == null && (t = "http://localhost:8545");
    super(n, s);
    y(this, Vs, void 0);
    typeof t == "string" ? f(this, Vs, new _t(t)) : f(this, Vs, t.clone());
  }
  _getConnection() {
    return l(this, Vs).clone();
  }
  async send(t, n) {
    return await this._start(), await super.send(t, n);
  }
  async _send(t) {
    const n = this._getConnection();
    n.body = JSON.stringify(t), n.setHeader("content-type", "application/json");
    const s = await n.send();
    s.assertOk();
    let i = s.bodyJson;
    return Array.isArray(i) || (i = [i]), i;
  }
}
Vs = new WeakMap();
function _c(r) {
  if (r == null)
    return null;
  if (typeof r.message == "string" && r.message.match(/revert/i) && V(r.data))
    return { message: r.message, data: r.data };
  if (typeof r == "object") {
    for (const e in r) {
      const t = _c(r[e]);
      if (t)
        return t;
    }
    return null;
  }
  if (typeof r == "string")
    try {
      return _c(JSON.parse(r));
    } catch {
    }
  return null;
}
function Lc(r, e) {
  if (r != null) {
    if (typeof r.message == "string" && e.push(r.message), typeof r == "object")
      for (const t in r)
        Lc(r[t], e);
    if (typeof r == "string")
      try {
        return Lc(JSON.parse(r), e);
      } catch {
      }
  }
}
function Nm(r) {
  const e = [];
  return Lc(r, e), e;
}
function Pm() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof Oa < "u")
    return Oa;
  throw new Error("unable to locate global object");
}
const Sm = Pm().WebSocket;
var Pt, zi, Rn, gr, xn;
class qc {
  /**
   *  Creates a new **SocketSubscriber** attached to %%provider%% listening
   *  to %%filter%%.
   */
  constructor(e, t) {
    y(this, Pt, void 0);
    y(this, zi, void 0);
    y(this, Rn, void 0);
    y(this, gr, void 0);
    y(this, xn, void 0);
    f(this, Pt, e), f(this, zi, JSON.stringify(t)), f(this, Rn, null), f(this, gr, null), f(this, xn, null);
  }
  /**
   *  The filter.
   */
  get filter() {
    return JSON.parse(l(this, zi));
  }
  start() {
    f(this, Rn, l(this, Pt).send("eth_subscribe", this.filter).then((e) => (l(this, Pt)._register(e, this), e)));
  }
  stop() {
    l(this, Rn).then((e) => {
      l(this, Pt).destroyed || l(this, Pt).send("eth_unsubscribe", [e]);
    }), f(this, Rn, null);
  }
  // @TODO: pause should trap the current blockNumber, unsub, and on resume use getLogs
  //        and resume
  pause(e) {
    E(e, "preserve logs while paused not supported by SocketSubscriber yet", "UNSUPPORTED_OPERATION", { operation: "pause(false)" }), f(this, gr, !!e);
  }
  resume() {
    f(this, gr, null);
  }
  /**
   *  @_ignore:
   */
  _handleMessage(e) {
    if (l(this, Rn) != null && l(this, gr) === null) {
      let t = l(this, xn);
      t == null ? t = this._emit(l(this, Pt), e) : t = t.then(async () => {
        await this._emit(l(this, Pt), e);
      }), f(this, xn, t.then(() => {
        l(this, xn) === t && f(this, xn, null);
      }));
    }
  }
  /**
   *  Sub-classes **must** override this to emit the events on the
   *  provider.
   */
  async _emit(e, t) {
    throw new Error("sub-classes must implemente this; _emit");
  }
}
Pt = new WeakMap(), zi = new WeakMap(), Rn = new WeakMap(), gr = new WeakMap(), xn = new WeakMap();
class km extends qc {
  /**
   *  @_ignore:
   */
  constructor(e) {
    super(e, ["newHeads"]);
  }
  async _emit(e, t) {
    e.emit("block", parseInt(t.number));
  }
}
class Rm extends qc {
  /**
   *  @_ignore:
   */
  constructor(e) {
    super(e, ["newPendingTransactions"]);
  }
  async _emit(e, t) {
    e.emit("pending", t);
  }
}
var Ji;
class xm extends qc {
  /**
   *  @_ignore:
   */
  constructor(t, n) {
    super(t, ["logs", n]);
    y(this, Ji, void 0);
    f(this, Ji, JSON.stringify(n));
  }
  /**
   *  The filter.
   */
  get logFilter() {
    return JSON.parse(l(this, Ji));
  }
  async _emit(t, n) {
    t.emit(this.logFilter, t._wrapLog(n, t._network));
  }
}
Ji = new WeakMap();
var mr, Ks, Tn;
class Tm extends od {
  /**
   *  Creates a new **SocketProvider** connected to %%network%%.
   *
   *  If unspecified, the network will be discovered.
   */
  constructor(t, n) {
    const s = Object.assign({}, n ?? {});
    m(s.batchMaxCount == null || s.batchMaxCount === 1, "sockets-based providers do not support batches", "options.batchMaxCount", n), s.batchMaxCount = 1, s.staticNetwork == null && (s.staticNetwork = !0);
    super(t, s);
    y(this, mr, void 0);
    // Maps each filterId to its subscriber
    y(this, Ks, void 0);
    // If any events come in before a subscriber has finished
    // registering, queue them
    y(this, Tn, void 0);
    f(this, mr, /* @__PURE__ */ new Map()), f(this, Ks, /* @__PURE__ */ new Map()), f(this, Tn, /* @__PURE__ */ new Map());
  }
  // This value is only valid after _start has been called
  /*
  get _network(): Network {
      if (this.#network == null) {
          throw new Error("this shouldn't happen");
      }
      return this.#network.clone();
  }
  */
  _getSubscriber(t) {
    switch (t.type) {
      case "close":
        return new Qa("close");
      case "block":
        return new km(this);
      case "pending":
        return new Rm(this);
      case "event":
        return new xm(this, t.filter);
      case "orphan":
        if (t.filter.orphan === "drop-log")
          return new Qa("drop-log");
    }
    return super._getSubscriber(t);
  }
  /**
   *  Register a new subscriber. This is used internalled by Subscribers
   *  and generally is unecessary unless extending capabilities.
   */
  _register(t, n) {
    l(this, Ks).set(t, n);
    const s = l(this, Tn).get(t);
    if (s) {
      for (const i of s)
        n._handleMessage(i);
      l(this, Tn).delete(t);
    }
  }
  async _send(t) {
    m(!Array.isArray(t), "WebSocket does not support batch send", "payload", t);
    const n = new Promise((s, i) => {
      l(this, mr).set(t.id, { payload: t, resolve: s, reject: i });
    });
    return await this._waitUntilReady(), await this._write(JSON.stringify(t)), [await n];
  }
  // Sub-classes must call this once they are connected
  /*
      async _start(): Promise<void> {
          if (this.#ready) { return; }
  
          for (const { payload } of this.#callbacks.values()) {
              await this._write(JSON.stringify(payload));
          }
  
          this.#ready = (async function() {
              await super._start();
          })();
      }
      */
  /**
   *  Sub-classes **must** call this with messages received over their
   *  transport to be processed and dispatched.
   */
  async _processMessage(t) {
    const n = JSON.parse(t);
    if (n && typeof n == "object" && "id" in n) {
      const s = l(this, mr).get(n.id);
      if (s == null) {
        this.emit("error", J("received result for unknown id", "UNKNOWN_ERROR", {
          reasonCode: "UNKNOWN_ID",
          result: n
        }));
        return;
      }
      l(this, mr).delete(n.id), s.resolve(n);
    } else if (n && n.method === "eth_subscription") {
      const s = n.params.subscription, i = l(this, Ks).get(s);
      if (i)
        i._handleMessage(n.params.result);
      else {
        let a = l(this, Tn).get(s);
        a == null && (a = [], l(this, Tn).set(s, a)), a.push(n.params.result);
      }
    } else {
      this.emit("error", J("received unexpected message", "UNKNOWN_ERROR", {
        reasonCode: "UNEXPECTED_MESSAGE",
        result: n
      }));
      return;
    }
  }
  /**
   *  Sub-classes **must** override this to send %%message%% over their
   *  transport.
   */
  async _write(t) {
    throw new Error("sub-classes must override this");
  }
}
mr = new WeakMap(), Ks = new WeakMap(), Tn = new WeakMap();
var yr, lt;
class Om extends Tm {
  constructor(t, n, s) {
    super(n, s);
    y(this, yr, void 0);
    y(this, lt, void 0);
    typeof t == "string" ? (f(this, yr, () => new Sm(t)), f(this, lt, l(this, yr).call(this))) : typeof t == "function" ? (f(this, yr, t), f(this, lt, t())) : (f(this, yr, null), f(this, lt, t)), this.websocket.onopen = async () => {
      try {
        await this._start(), this.resume();
      } catch (i) {
        console.log("failed to start WebsocketProvider", i);
      }
    }, this.websocket.onmessage = (i) => {
      this._processMessage(i.data);
    };
  }
  get websocket() {
    if (l(this, lt) == null)
      throw new Error("websocket closed");
    return l(this, lt);
  }
  async _write(t) {
    this.websocket.send(t);
  }
  async destroy() {
    l(this, lt) != null && (l(this, lt).close(), f(this, lt, null)), super.destroy();
  }
}
yr = new WeakMap(), lt = new WeakMap();
const hi = "84842078b09946638c03157f83405213";
function _m(r) {
  switch (r) {
    case "mainnet":
      return "mainnet.infura.io";
    case "goerli":
      return "goerli.infura.io";
    case "sepolia":
      return "sepolia.infura.io";
    case "arbitrum":
      return "arbitrum-mainnet.infura.io";
    case "arbitrum-goerli":
      return "arbitrum-goerli.infura.io";
    case "arbitrum-sepolia":
      return "arbitrum-sepolia.infura.io";
    case "base":
      return "base-mainnet.infura.io";
    case "base-goerlia":
      return "base-goerli.infura.io";
    case "base-sepolia":
      return "base-sepolia.infura.io";
    case "bnb":
      return "bnbsmartchain-mainnet.infura.io";
    case "bnbt":
      return "bnbsmartchain-testnet.infura.io";
    case "linea":
      return "linea-mainnet.infura.io";
    case "linea-goerli":
      return "linea-goerli.infura.io";
    case "linea-sepolia":
      return "linea-sepolia.infura.io";
    case "matic":
      return "polygon-mainnet.infura.io";
    case "matic-amoy":
      return "polygon-amoy.infura.io";
    case "matic-mumbai":
      return "polygon-mumbai.infura.io";
    case "optimism":
      return "optimism-mainnet.infura.io";
    case "optimism-goerli":
      return "optimism-goerli.infura.io";
    case "optimism-sepolia":
      return "optimism-sepolia.infura.io";
  }
  m(!1, "unsupported network", "network", r);
}
class Lm extends Om {
  /**
   *  Creates a new **InfuraWebSocketProvider**.
   */
  constructor(t, n) {
    const s = new br(t, n), i = s._getConnection();
    E(!i.credentials, "INFURA WebSocket project secrets unsupported", "UNSUPPORTED_OPERATION", { operation: "InfuraProvider.getWebSocketProvider()" });
    const a = i.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
    super(a, s._network);
    /**
     *  The Project ID for the INFURA connection.
     */
    w(this, "projectId");
    /**
     *  The Project Secret.
     *
     *  If null, no authenticated requests are made. This should not
     *  be used outside of private contexts.
     */
    w(this, "projectSecret");
    O(this, {
      projectId: s.projectId,
      projectSecret: s.projectSecret
    });
  }
  isCommunityResource() {
    return this.projectId === hi;
  }
}
class br extends ld {
  /**
   *  Creates a new **InfuraProvider**.
   */
  constructor(t, n, s) {
    t == null && (t = "mainnet");
    const i = ht.from(t);
    n == null && (n = hi), s == null && (s = null);
    const a = br.getRequest(i, n, s);
    super(a, i, { staticNetwork: i });
    /**
     *  The Project ID for the INFURA connection.
     */
    w(this, "projectId");
    /**
     *  The Project Secret.
     *
     *  If null, no authenticated requests are made. This should not
     *  be used outside of private contexts.
     */
    w(this, "projectSecret");
    O(this, { projectId: n, projectSecret: s });
  }
  _getProvider(t) {
    try {
      return new br(t, this.projectId, this.projectSecret);
    } catch {
    }
    return super._getProvider(t);
  }
  isCommunityResource() {
    return this.projectId === hi;
  }
  /**
   *  Creates a new **InfuraWebSocketProvider**.
   */
  static getWebSocketProvider(t, n) {
    return new Lm(t, n);
  }
  /**
   *  Returns a prepared request for connecting to %%network%%
   *  with %%projectId%% and %%projectSecret%%.
   */
  static getRequest(t, n, s) {
    n == null && (n = hi), s == null && (s = null);
    const i = new _t(`https://${_m(t.name)}/v3/${n}`);
    return i.allowGzip = !0, s && i.setCredentials("", s), n === hi && (i.retryFunc = async (a, o, c) => (bm("InfuraProvider"), !0)), i;
  }
}
var Qs;
class Zo extends cd {
  /**
   *  Connnect to the %%ethereum%% provider, optionally forcing the
   *  %%network%%.
   */
  constructor(t, n, s) {
    const i = Object.assign({}, s ?? {}, { batchMaxCount: 1 });
    m(t && t.request, "invalid EIP-1193 provider", "ethereum", t);
    super(n, i);
    y(this, Qs, void 0);
    f(this, Qs, async (a, o) => {
      const c = { method: a, params: o };
      this.emit("debug", { action: "sendEip1193Request", payload: c });
      try {
        const u = await t.request(c);
        return this.emit("debug", { action: "receiveEip1193Result", result: u }), u;
      } catch (u) {
        const h = new Error(u.message);
        throw h.code = u.code, h.data = u.data, h.payload = c, this.emit("debug", { action: "receiveEip1193Error", error: h }), h;
      }
    });
  }
  async send(t, n) {
    return await this._start(), await super.send(t, n);
  }
  async _send(t) {
    m(!Array.isArray(t), "EIP-1193 does not support batch request", "payload", t);
    try {
      const n = await l(this, Qs).call(this, t.method, t.params || []);
      return [{ id: t.id, result: n }];
    } catch (n) {
      return [{
        id: t.id,
        error: { code: n.code, data: n.data, message: n.message }
      }];
    }
  }
  getRpcError(t, n) {
    switch (n = JSON.parse(JSON.stringify(n)), n.error.code || -1) {
      case 4001:
        n.error.message = `ethers-user-denied: ${n.error.message}`;
        break;
      case 4200:
        n.error.message = `ethers-unsupported: ${n.error.message}`;
        break;
    }
    return super.getRpcError(t, n);
  }
  /**
   *  Resolves to ``true`` if the provider manages the %%address%%.
   */
  async hasSigner(t) {
    t == null && (t = 0);
    const n = await this.send("eth_accounts", []);
    return typeof t == "number" ? n.length > t : (t = t.toLowerCase(), n.filter((s) => s.toLowerCase() === t).length !== 0);
  }
  async getSigner(t) {
    if (t == null && (t = 0), !await this.hasSigner(t))
      try {
        await l(this, Qs).call(this, "eth_requestAccounts", []);
      } catch (n) {
        const s = n.payload;
        throw this.getRpcError(s, { id: s.id, error: n });
      }
    return await super.getSigner(t);
  }
}
Qs = new WeakMap();
const W = {
  WALLET_ID: "@w3m/wallet_id",
  ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
  ERROR_CODE_DEFAULT: 5e3
}, oe = {
  getCaipDefaultChain(r) {
    if (r)
      return {
        id: `${k.EIP155}:${r.chainId}`,
        name: r.name,
        imageId: ge.EIP155NetworkImageIds[r.chainId]
      };
  },
  hexStringToNumber(r) {
    const e = r.startsWith("0x") ? r.slice(2) : r;
    return parseInt(e, 16);
  },
  numberToHexString(r) {
    return `0x${r.toString(16)}`;
  },
  async getUserInfo(r) {
    const [e, t] = await Promise.all([
      oe.getAddresses(r),
      oe.getChainId(r)
    ]);
    return { chainId: t, addresses: e };
  },
  async getChainId(r) {
    const e = await r.request({ method: "eth_chainId" });
    return Number(e);
  },
  async getAddress(r) {
    const [e] = await r.request({ method: "eth_accounts" });
    return e;
  },
  async getAddresses(r) {
    return await r.request({ method: "eth_accounts" });
  },
  async addEthereumChain(r, e) {
    await r.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: oe.numberToHexString(e.chainId),
          rpcUrls: [e.rpcUrl],
          chainName: e.name,
          nativeCurrency: {
            name: e.currency,
            decimals: 18,
            symbol: e.currency
          },
          blockExplorerUrls: [e.explorerUrl],
          iconUrls: [ge.EIP155NetworkImageIds[e.chainId]]
        }
      ]
    });
  }
}, re = qd({
  provider: void 0,
  providerType: void 0,
  address: void 0,
  chainId: void 0,
  status: "reconnecting",
  isConnected: !1
}), C = {
  state: re,
  subscribeKey(r, e) {
    return Zd(re, r, e);
  },
  subscribe(r) {
    return Yd(re, () => r(re));
  },
  setProvider(r) {
    r && (re.provider = $d(r));
  },
  setProviderType(r) {
    re.providerType = r;
  },
  setAddress(r) {
    re.address = r;
  },
  setPreferredAccountType(r) {
    re.preferredAccountType = r;
  },
  setChainId(r) {
    re.chainId = r;
  },
  setStatus(r) {
    re.status = r;
  },
  setIsConnected(r) {
    re.isConnected = r;
  },
  setError(r) {
    re.error = r;
  },
  reset() {
    re.provider = void 0, re.address = void 0, re.chainId = void 0, re.providerType = void 0, re.status = "disconnected", re.isConnected = !1, re.error = void 0, re.preferredAccountType = void 0;
  }
};
class Mm extends Xd {
  constructor(e) {
    const { ethersConfig: t, siweConfig: n, chains: s, defaultChain: i, tokens: a, chainImages: o, _sdkVersion: c, ...u } = e;
    if (!t)
      throw new Error("web3modal:constructor - ethersConfig is undefined");
    if (!u.projectId)
      throw new Error("web3modal:constructor - projectId is undefined");
    const h = {
      switchCaipNetwork: async (d) => {
        const g = cn.caipNetworkIdToNumber(d == null ? void 0 : d.id);
        if (g)
          try {
            C.setError(void 0), await this.switchNetwork(g);
          } catch (b) {
            throw C.setError(b), new Error("networkControllerClient:switchCaipNetwork - unable to switch chain");
          }
      },
      getApprovedCaipNetworksData: async () => new Promise(async (d) => {
        var b, A, I, S;
        const g = localStorage.getItem(W.WALLET_ID);
        if (g != null && g.includes(k.WALLET_CONNECT_CONNECTOR_ID)) {
          const _ = await this.getWalletConnectProvider();
          if (!_)
            throw new Error("networkControllerClient:getApprovedCaipNetworks - connector is undefined");
          const x = (A = (b = _.signer) == null ? void 0 : b.session) == null ? void 0 : A.namespaces, D = (I = x == null ? void 0 : x[k.EIP155]) == null ? void 0 : I.methods, K = (S = x == null ? void 0 : x[k.EIP155]) == null ? void 0 : S.chains, ue = {
            supportsAllNetworks: (D == null ? void 0 : D.includes(k.ADD_CHAIN_METHOD)) ?? !1,
            approvedCaipNetworkIds: K
          };
          d(ue);
        } else
          d({
            approvedCaipNetworkIds: void 0,
            supportsAllNetworks: !0
          });
      })
    }, p = {
      connectWalletConnect: async (d) => {
        var A, I, S, _;
        const g = await this.getWalletConnectProvider();
        if (!g)
          throw new Error("connectionControllerClient:getWalletConnectUri - provider is undefined");
        g.on("display_uri", (x) => {
          d(x);
        });
        const b = await ((A = n == null ? void 0 : n.getMessageParams) == null ? void 0 : A.call(n));
        if ((I = n == null ? void 0 : n.options) != null && I.enabled && b && Object.keys(b || {}).length > 0) {
          const { SIWEController: x, getDidChainId: D, getDidAddress: K } = await import("./index-w--wEpYe.js"), ue = cn.caipNetworkIdToNumber((S = this.getCaipNetwork()) == null ? void 0 : S.id);
          let gt = b.chains;
          ue && (gt = [ue, ...b.chains.filter((Ce) => Ce !== ue)]);
          const Z = await g.authenticate({
            nonce: await n.getNonce(),
            methods: [...rf],
            ...b,
            chains: gt
          }), $ = (_ = Z == null ? void 0 : Z.auths) == null ? void 0 : _[0];
          if ($) {
            const { p: Ce, s: ti } = $, Mn = D(Ce.iss), Rr = K(Ce.iss);
            Rr && Mn && x.setSession({
              address: Rr,
              chainId: parseInt(Mn, 10)
            });
            try {
              const xr = g.signer.client.formatAuthMessage({
                request: Ce,
                iss: Ce.iss
              });
              await x.verifyMessage({
                message: xr,
                signature: ti.s,
                cacao: $
              });
            } catch (xr) {
              throw console.error("Error verifying message", xr), await g.disconnect().catch(console.error), await x.signOut().catch(console.error), xr;
            }
          }
        } else
          await g.connect({ optionalChains: this.chains.map((x) => x.chainId) });
        await this.setWalletConnectProvider();
      },
      connectExternal: async ({ id: d, info: g, provider: b }) => {
        if (d === k.INJECTED_CONNECTOR_ID) {
          const A = t.injected;
          if (!A)
            throw new Error("connectionControllerClient:connectInjected - provider is undefined");
          try {
            C.setError(void 0), await A.request({ method: "eth_requestAccounts" }), this.setInjectedProvider(t);
          } catch (I) {
            C.setError(I);
          }
        } else if (d === k.EIP6963_CONNECTOR_ID && g && b)
          try {
            C.setError(void 0), await b.request({ method: "eth_requestAccounts" }), this.setEIP6963Provider(b, g.name);
          } catch (A) {
            C.setError(A);
          }
        else if (d === k.COINBASE_SDK_CONNECTOR_ID) {
          const A = t.coinbase;
          if (!A)
            throw new Error("connectionControllerClient:connectCoinbase - connector is undefined");
          try {
            C.setError(void 0), await A.request({ method: "eth_requestAccounts" }), this.setCoinbaseProvider(t);
          } catch (I) {
            throw C.setError(I), new Error(I.message);
          }
        } else
          d === k.AUTH_CONNECTOR_ID && this.setAuthProvider();
      },
      checkInstalled: (d) => d ? t.injected && !(window != null && window.ethereum) ? !1 : d.some((g) => {
        var b;
        return !!((b = window.ethereum) != null && b[String(g)]);
      }) : !!window.ethereum,
      disconnect: async () => {
        var b, A;
        const { provider: d, providerType: g } = C.state;
        if ((b = n == null ? void 0 : n.options) != null && b.signOutOnDisconnect) {
          const { SIWEController: I } = await import("./index-w--wEpYe.js");
          await I.signOut();
        }
        if (g === k.WALLET_CONNECT_CONNECTOR_ID || g === "coinbaseWalletSDK")
          await d.disconnect();
        else if (g === k.AUTH_CONNECTOR_ID)
          await ((A = this.authProvider) == null ? void 0 : A.disconnect());
        else if (g === k.EIP6963_CONNECTOR_ID && d)
          await this.disconnectProvider(d), d.emit("disconnect");
        else if (g === k.INJECTED_CONNECTOR_ID) {
          const I = t.injected;
          I && (await this.disconnectProvider(I), I.emit("disconnect"));
        } else
          d == null || d.emit("disconnect");
        localStorage.removeItem(W.WALLET_ID), C.reset();
      },
      signMessage: async (d) => {
        const g = C.state.provider;
        if (!g)
          throw new Error("connectionControllerClient:signMessage - provider is undefined");
        const b = V(d) ? d : P(xt(d));
        return await g.request({
          method: "personal_sign",
          params: [b, this.getAddress()]
        });
      },
      parseUnits: (d, g) => _f(d, g),
      formatUnits: (d, g) => Yu(d, g),
      async estimateGas(d) {
        const { chainId: g, provider: b, address: A } = C.state;
        if (!b)
          throw new Error("connectionControllerClient:sendTransaction - provider is undefined");
        if (!A)
          throw new Error("connectionControllerClient:sendTransaction - address is undefined");
        const I = {
          from: d.address,
          to: d.to,
          data: d.data,
          type: 0
        }, S = new Zo(b, g);
        return await new ts(S, A).estimateGas(I);
      },
      sendTransaction: async (d) => {
        const { chainId: g, provider: b, address: A } = C.state;
        if (!b)
          throw new Error("ethersClient:sendTransaction - provider is undefined");
        if (!A)
          throw new Error("ethersClient:sendTransaction - address is undefined");
        const I = {
          to: d.to,
          value: d.value,
          gasLimit: d.gas,
          gasPrice: d.gasPrice,
          data: d.data,
          type: 0
        }, S = new Zo(b, g), D = await (await new ts(S, A).sendTransaction(I)).wait();
        return (D == null ? void 0 : D.hash) || null;
      },
      writeContract: async (d) => {
        const { chainId: g, provider: b, address: A } = C.state;
        if (!b)
          throw new Error("ethersClient:writeContract - provider is undefined");
        if (!A)
          throw new Error("ethersClient:writeContract - address is undefined");
        const I = new Zo(b, g), S = new ts(I, A), _ = new es(d.tokenAddress, d.abi, S);
        if (!_ || !d.method)
          throw new Error("Contract method is undefined");
        const x = _[d.method];
        if (x)
          return await x(d.receiverAddress, d.tokenAmount);
        throw new Error("Contract method is undefined");
      },
      getEnsAddress: async (d) => {
        var g;
        try {
          const b = cn.caipNetworkIdToNumber((g = this.getCaipNetwork()) == null ? void 0 : g.id);
          let A = null, I = !1;
          return d != null && d.endsWith(Do.WC_NAME_SUFFIX) && (I = await this.resolveWalletConnectName(d)), b === 1 && (A = await new br("mainnet").resolveName(d)), A || I || !1;
        } catch {
          return !1;
        }
      },
      getEnsAvatar: async (d) => {
        const { chainId: g } = C.state;
        if (g && g === 1) {
          const A = await new br("mainnet").getAvatar(d);
          return A || !1;
        }
        return !1;
      }
    };
    super({
      chain: Do.CHAIN.EVM,
      networkControllerClient: h,
      connectionControllerClient: p,
      siweControllerClient: n,
      defaultChain: oe.getCaipDefaultChain(i),
      tokens: ef.getCaipTokens(a),
      _sdkVersion: c ?? `html-ethers-${k.VERSION}`,
      ...u
    }), this.hasSyncedConnectedAccount = !1, this.EIP6963Providers = [], this.chain = Do.CHAIN.EVM, this.options = void 0, this.options = e, this.metadata = t.metadata, this.projectId = u.projectId, this.chains = s, this.createProvider(), C.subscribeKey("address", () => {
      this.syncAccount();
    }), C.subscribeKey("chainId", () => {
      this.syncNetwork(o);
    }), this.subscribeCaipNetworkChange((d) => {
      !this.getChainId() && d && C.setChainId(cn.caipNetworkIdToNumber(d.id));
    }), this.subscribeShouldUpdateToAddress((d) => {
      d && C.setAddress(F(d));
    }), this.syncRequestedNetworks(s, o), this.syncConnectors(t), typeof window < "u" && (this.listenConnectors(!0), this.checkActive6963Provider()), this.setEIP6963Enabled(t.EIP6963), t.injected && this.checkActiveInjectedProvider(t), t.auth && this.syncAuthConnector(u.projectId, t.auth), t.coinbase && this.checkActiveCoinbaseProvider(t);
  }
  getState() {
    const e = super.getState();
    return {
      ...e,
      selectedNetworkId: cn.caipNetworkIdToNumber(e.selectedNetworkId)
    };
  }
  subscribeState(e) {
    return super.subscribeState((t) => e({
      ...t,
      selectedNetworkId: cn.caipNetworkIdToNumber(t.selectedNetworkId)
    }));
  }
  setAddress(e) {
    const t = e ? F(e) : void 0;
    C.setAddress(t);
  }
  getAddress() {
    const { address: e } = C.state;
    return e ? F(e) : void 0;
  }
  getError() {
    return C.state.error;
  }
  getChainId() {
    var n;
    const e = C.state.chainId, t = cn.caipNetworkIdToNumber((n = this.getCaipNetwork()) == null ? void 0 : n.id);
    return e ?? t;
  }
  getStatus() {
    return C.state.status;
  }
  getIsConnected() {
    return C.state.isConnected;
  }
  getWalletProvider() {
    return C.state.provider;
  }
  getWalletProviderType() {
    return C.state.providerType;
  }
  subscribeProvider(e) {
    return C.subscribe(e);
  }
  async disconnect() {
    var n;
    const { provider: e, providerType: t } = C.state;
    if (localStorage.removeItem(W.WALLET_ID), C.reset(), t === k.AUTH_CONNECTOR_ID)
      await ((n = this.authProvider) == null ? void 0 : n.disconnect());
    else if (e && (t === "injected" || t === "eip6963"))
      await this.disconnectProvider(e), e == null || e.emit("disconnect");
    else if (t === "walletConnect" || t === "coinbaseWalletSDK") {
      const s = e;
      if (s)
        try {
          C.setError(void 0), await s.disconnect();
        } catch (i) {
          C.setError(i);
        }
    }
  }
  createProvider() {
    return !this.walletConnectProviderInitPromise && typeof window < "u" && (this.walletConnectProviderInitPromise = this.initWalletConnectProvider()), this.walletConnectProviderInitPromise;
  }
  async initWalletConnectProvider() {
    const e = {
      projectId: this.projectId,
      showQrModal: !1,
      rpcMap: this.chains ? this.chains.reduce((t, n) => (t[n.chainId] = n.rpcUrl, t), {}) : {},
      optionalChains: [...this.chains.map((t) => t.chainId)],
      metadata: {
        name: this.metadata ? this.metadata.name : "",
        description: this.metadata ? this.metadata.description : "",
        url: this.metadata ? this.metadata.url : "",
        icons: this.metadata ? this.metadata.icons : [""]
      }
    };
    this.walletConnectProvider = await tf.init(e), await this.checkActiveWalletConnectProvider();
  }
  async disconnectProvider(e) {
    try {
      (await e.request({
        method: "wallet_getPermissions"
      })).find((s) => s.parentCapability === "eth_accounts") && await e.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }]
      });
    } catch {
      throw new Error("Error revoking permissions:");
    }
  }
  async getWalletConnectProvider() {
    if (!this.walletConnectProvider)
      try {
        C.setError(void 0), await this.createProvider();
      } catch (e) {
        C.setError(e);
      }
    return this.walletConnectProvider;
  }
  syncRequestedNetworks(e, t) {
    const n = e == null ? void 0 : e.map((s) => ({
      id: `${k.EIP155}:${s.chainId}`,
      name: s.name,
      imageId: ge.EIP155NetworkImageIds[s.chainId],
      imageUrl: t == null ? void 0 : t[s.chainId]
    }));
    this.setRequestedCaipNetworks(n ?? []);
  }
  async checkActiveWalletConnectProvider() {
    const e = await this.getWalletConnectProvider(), t = localStorage.getItem(W.WALLET_ID);
    e && t === k.WALLET_CONNECT_CONNECTOR_ID && await this.setWalletConnectProvider();
    const n = C.state.isConnected;
    C.setStatus(n ? "connected" : "disconnected");
  }
  checkActiveInjectedProvider(e) {
    const t = e.injected, n = localStorage.getItem(W.WALLET_ID);
    t && n === k.INJECTED_CONNECTOR_ID && (this.setInjectedProvider(e), this.watchInjected(e));
  }
  checkActiveCoinbaseProvider(e) {
    var s;
    const t = e.coinbase, n = localStorage.getItem(W.WALLET_ID);
    t && n === k.COINBASE_SDK_CONNECTOR_ID && (t.accounts && ((s = t.accounts) == null ? void 0 : s.length) > 0 ? (this.setCoinbaseProvider(e), this.watchCoinbase(e)) : (localStorage.removeItem(W.WALLET_ID), C.reset()));
  }
  checkActive6963Provider() {
    const e = window == null ? void 0 : window.localStorage.getItem(W.WALLET_ID);
    if (e) {
      const t = this.EIP6963Providers.find((n) => n.info.name === e);
      t && this.setEIP6963Provider(t.provider, t.info.name);
    }
  }
  async setWalletConnectProvider() {
    var t, n, s;
    window == null || window.localStorage.setItem(W.WALLET_ID, k.WALLET_CONNECT_CONNECTOR_ID);
    const e = await this.getWalletConnectProvider();
    if (e) {
      C.setChainId(e.chainId), C.setProviderType("walletConnect"), C.setProvider(e), C.setStatus("connected"), C.setIsConnected(!0), this.setAllAccounts(e.accounts.map((a) => ({ address: a, type: "eoa" })));
      const i = (t = e.signer) == null ? void 0 : t.session;
      for (const a of e.accounts) {
        const o = (n = i == null ? void 0 : i.sessionProperties) == null ? void 0 : n[a];
        o && this.addAddressLabel(a, o);
      }
      this.setAddress((s = e.accounts) == null ? void 0 : s[0]), this.watchWalletConnect();
    }
  }
  async setInjectedProvider(e) {
    window == null || window.localStorage.setItem(W.WALLET_ID, k.INJECTED_CONNECTOR_ID);
    const t = e.injected;
    if (t) {
      const { addresses: n, chainId: s } = await oe.getUserInfo(t);
      n != null && n[0] && s && (C.setChainId(s), C.setProviderType("injected"), C.setProvider(e.injected), C.setStatus("connected"), C.setIsConnected(!0), this.setAllAccounts(n.map((i) => ({ address: i, type: "eoa" }))), this.setAddress(n[0]), this.watchCoinbase(e));
    }
  }
  async setEIP6963Provider(e, t) {
    if (window == null || window.localStorage.setItem(W.WALLET_ID, t), e) {
      const { addresses: n, chainId: s } = await oe.getUserInfo(e);
      n != null && n[0] && s && (C.setChainId(s), C.setProviderType("eip6963"), C.setProvider(e), C.setStatus("connected"), C.setIsConnected(!0), this.setAllAccounts(n.map((i) => ({ address: i, type: "eoa" }))), this.setAddress(n[0]), this.watchEIP6963(e));
    }
  }
  async setCoinbaseProvider(e) {
    window == null || window.localStorage.setItem(W.WALLET_ID, k.COINBASE_SDK_CONNECTOR_ID);
    const t = e.coinbase;
    if (t) {
      const { addresses: n, chainId: s } = await oe.getUserInfo(t);
      n != null && n[0] && s && (C.setChainId(s), C.setProviderType("coinbaseWalletSDK"), C.setProvider(e.coinbase), C.setStatus("connected"), C.setIsConnected(!0), this.setAllAccounts(n.map((i) => ({ address: i, type: "eoa" }))), this.setAddress(n[0]), this.watchCoinbase(e));
    }
  }
  async setAuthProvider() {
    if (window == null || window.localStorage.setItem(W.WALLET_ID, k.AUTH_CONNECTOR_ID), this.authProvider) {
      super.setLoading(!0);
      const { address: e, chainId: t, smartAccountDeployed: n, preferredAccountType: s, accounts: i = [] } = await this.authProvider.connect({ chainId: this.getChainId() }), { smartAccountEnabledNetworks: a } = await this.authProvider.getSmartAccountEnabledNetworks();
      this.setSmartAccountEnabledNetworks(a), e && t && (this.setAllAccounts(i.length > 0 ? i : [{ address: e, type: s }]), C.setChainId(t), C.setProviderType(k.AUTH_CONNECTOR_ID), C.setProvider(this.authProvider), C.setStatus("connected"), C.setIsConnected(!0), C.setAddress(e), C.setPreferredAccountType(s), this.setSmartAccountDeployed(!!n, this.chain), this.watchAuth(), this.watchModal()), super.setLoading(!1);
    }
  }
  async watchWalletConnect() {
    const e = await this.getWalletConnectProvider();
    function t() {
      localStorage.removeItem(W.WALLET_ID), C.reset(), e == null || e.removeListener("disconnect", t), e == null || e.removeListener("accountsChanged", s), e == null || e.removeListener("chainChanged", n);
    }
    function n(i) {
      if (i) {
        const a = oe.hexStringToNumber(i);
        C.setChainId(a);
      }
    }
    const s = async (i) => {
      i.length > 0 && await this.setWalletConnectProvider();
    };
    e && (e.on("disconnect", t), e.on("accountsChanged", s), e.on("chainChanged", n));
  }
  watchInjected(e) {
    const t = e.injected;
    function n() {
      localStorage.removeItem(W.WALLET_ID), C.reset(), t == null || t.removeListener("disconnect", n), t == null || t.removeListener("accountsChanged", s), t == null || t.removeListener("chainChanged", i);
    }
    function s(a) {
      const o = a == null ? void 0 : a[0];
      o ? C.setAddress(F(o)) : (localStorage.removeItem(W.WALLET_ID), C.reset());
    }
    function i(a) {
      if (a) {
        const o = typeof a == "string" ? oe.hexStringToNumber(a) : Number(a);
        C.setChainId(o);
      }
    }
    t && (t.on("disconnect", n), t.on("accountsChanged", s), t.on("chainChanged", i));
  }
  watchEIP6963(e) {
    function t() {
      localStorage.removeItem(W.WALLET_ID), C.reset(), e.removeListener("disconnect", t), e.removeListener("accountsChanged", n), e.removeListener("chainChanged", s);
    }
    const n = (i) => {
      const a = i == null ? void 0 : i[0];
      a ? (C.setAddress(F(a)), this.setAllAccounts(i.map((o) => ({ address: o, type: "eoa" })))) : (this.setAllAccounts([]), localStorage.removeItem(W.WALLET_ID), C.reset());
    };
    function s(i) {
      if (i) {
        const a = typeof i == "string" ? oe.hexStringToNumber(i) : Number(i);
        C.setChainId(a);
      }
    }
    e && (e.on("disconnect", t), e.on("accountsChanged", n), e.on("chainChanged", s));
  }
  watchCoinbase(e) {
    const t = e.coinbase, n = localStorage.getItem(W.WALLET_ID);
    function s() {
      localStorage.removeItem(W.WALLET_ID), C.reset(), t == null || t.removeListener("disconnect", s), t == null || t.removeListener("accountsChanged", i), t == null || t.removeListener("chainChanged", a);
    }
    function i(o) {
      const c = o == null ? void 0 : o[0];
      c ? C.setAddress(F(c)) : (localStorage.removeItem(W.WALLET_ID), C.reset());
    }
    function a(o) {
      if (o && n === k.COINBASE_SDK_CONNECTOR_ID) {
        const c = Number(o);
        C.setChainId(c);
      }
    }
    t && (t.on("disconnect", s), t.on("accountsChanged", i), t.on("chainChanged", a));
  }
  watchAuth() {
    this.authProvider && (this.authProvider.onRpcRequest((e) => {
      if (ia.checkIfRequestExists(e)) {
        if (!ia.checkIfRequestIsAllowed(e))
          if (super.isOpen()) {
            if (super.isTransactionStackEmpty())
              return;
            super.isTransactionShouldReplaceView() ? super.replace("ApproveTransaction") : super.redirect("ApproveTransaction");
          } else
            super.open({ view: "ApproveTransaction" });
      } else {
        super.open();
        const t = ia.getRequestMethod(e);
        console.error(ol.RPC_METHOD_NOT_ALLOWED_MESSAGE, { method: t }), setTimeout(() => {
          this.showErrorMessage(ol.RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
        }, 300);
      }
    }), this.authProvider.onRpcResponse((e) => {
      switch (ia.getResponseType(e)) {
        case cl.RPC_RESPONSE_TYPE_ERROR: {
          super.isOpen() && (super.isTransactionStackEmpty() ? super.close() : super.popTransactionStack(!0));
          break;
        }
        case cl.RPC_RESPONSE_TYPE_TX: {
          super.isTransactionStackEmpty() ? super.close() : super.popTransactionStack();
          break;
        }
      }
    }), this.authProvider.onNotConnected(() => {
      this.setIsConnected(!1), super.setLoading(!1);
    }), this.authProvider.onIsConnected(({ preferredAccountType: e }) => {
      this.setIsConnected(!0), super.setLoading(!1), C.setPreferredAccountType(e);
    }), this.authProvider.onSetPreferredAccount(({ address: e, type: t }) => {
      var s;
      if (!e)
        return;
      super.setLoading(!0);
      const n = cn.caipNetworkIdToNumber((s = this.getCaipNetwork()) == null ? void 0 : s.id);
      C.setAddress(e), C.setChainId(n), C.setStatus("connected"), C.setIsConnected(!0), C.setPreferredAccountType(t), this.syncAccount().then(() => super.setLoading(!1));
    }));
  }
  watchModal() {
    this.authProvider && this.subscribeState((e) => {
      var t;
      e.open || (t = this.authProvider) == null || t.rejectRpcRequest();
    });
  }
  async syncAccount() {
    const e = C.state.address, t = C.state.chainId, n = C.state.isConnected, s = C.state.preferredAccountType;
    if (this.resetAccount(), n && e && t) {
      const i = `${k.EIP155}:${t}:${e}`;
      this.setIsConnected(n), this.setPreferredAccountType(s, this.chain), this.setCaipAddress(i), this.syncConnectedWalletInfo();
      const a = this.chains.find((o) => o.chainId === t);
      a != null && a.explorerUrl && this.setAddressExplorerUrl(`${a.explorerUrl}/address/${e}`), await Promise.all([
        this.syncProfile(e),
        this.syncBalance(e),
        this.setApprovedCaipNetworksData()
      ]), this.hasSyncedConnectedAccount = !0;
    } else
      !n && this.hasSyncedConnectedAccount && (this.resetWcConnection(), this.resetNetwork(), this.setAllAccounts([]));
  }
  async syncNetwork(e) {
    const t = C.state.address, n = C.state.chainId, s = C.state.isConnected;
    if (this.chains) {
      const i = this.chains.find((a) => a.chainId === n);
      if (i) {
        const a = `${k.EIP155}:${i.chainId}`;
        if (this.setCaipNetwork({
          id: a,
          name: i.name,
          imageId: ge.EIP155NetworkImageIds[i.chainId],
          imageUrl: e == null ? void 0 : e[i.chainId],
          chain: this.chain
        }), s && t) {
          const o = `${k.EIP155}:${n}:${t}`;
          if (this.setCaipAddress(o), i.explorerUrl) {
            const c = `${i.explorerUrl}/address/${t}`;
            this.setAddressExplorerUrl(c);
          } else
            this.setAddressExplorerUrl(void 0);
          this.hasSyncedConnectedAccount && (await this.syncProfile(t), await this.syncBalance(t));
        }
      } else
        s && this.setCaipNetwork({
          id: `${k.EIP155}:${n}`,
          chain: this.chain
        });
    }
  }
  async syncWalletConnectName(e) {
    try {
      const t = await this.getWalletConnectName(e);
      if (t[0]) {
        const n = t[0];
        this.setProfileName(n.name);
      } else
        this.setProfileName(null);
    } catch {
      this.setProfileName(null);
    }
  }
  async syncProfile(e) {
    const t = C.state.chainId;
    try {
      const { name: n, avatar: s } = await this.fetchIdentity({
        address: e
      });
      this.setProfileName(n), this.setProfileImage(s), n || await this.syncWalletConnectName(e);
    } catch {
      if (t === 1) {
        const n = new br("mainnet"), s = await n.lookupAddress(e), i = await n.getAvatar(e);
        s ? this.setProfileName(s) : await this.syncWalletConnectName(e), i && this.setProfileImage(i);
      } else
        await this.syncWalletConnectName(e), this.setProfileImage(null);
    }
  }
  async syncBalance(e) {
    const t = C.state.chainId;
    if (t && this.chains) {
      const n = this.chains.find((s) => s.chainId === t);
      if (n) {
        const s = new ld(n.rpcUrl, {
          chainId: t,
          name: n.name
        });
        if (s) {
          const i = await s.getBalance(e), a = Lf(i);
          this.setBalance(a, n.currency);
        }
      }
    }
  }
  syncConnectedWalletInfo() {
    var n;
    const e = window == null ? void 0 : window.localStorage.getItem(W.WALLET_ID), t = C.state.providerType;
    if (t === k.EIP6963_CONNECTOR_ID) {
      if (e) {
        const s = this.EIP6963Providers.find((i) => i.info.name === e);
        s && this.setConnectedWalletInfo({ ...s.info }, this.chain);
      }
    } else if (t === k.WALLET_CONNECT_CONNECTOR_ID) {
      const s = C.state.provider;
      s.session && this.setConnectedWalletInfo({
        ...s.session.peer.metadata,
        name: s.session.peer.metadata.name,
        icon: (n = s.session.peer.metadata.icons) == null ? void 0 : n[0]
      }, this.chain);
    } else
      e && this.setConnectedWalletInfo({ name: e }, this.chain);
  }
  async switchNetwork(e) {
    var s, i, a, o, c, u;
    const t = C.state.provider, n = C.state.providerType;
    if (this.chains) {
      const h = this.chains.find((p) => p.chainId === e);
      if (n === k.WALLET_CONNECT_CONNECTOR_ID && h) {
        const p = t;
        if (p)
          try {
            await p.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: oe.numberToHexString(h.chainId) }]
            }), C.setChainId(e);
          } catch (d) {
            const g = d == null ? void 0 : d.message;
            if (/(?<temp1>user rejected)/u.test(g == null ? void 0 : g.toLowerCase()))
              throw new Error("Chain is not supported");
            await oe.addEthereumChain(p, h);
          }
      } else if (n === k.INJECTED_CONNECTOR_ID && h) {
        const p = t;
        if (p)
          try {
            await p.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: oe.numberToHexString(h.chainId) }]
            }), C.setChainId(h.chainId);
          } catch (d) {
            if (d.code === W.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || d.code === W.ERROR_CODE_DEFAULT || ((i = (s = d == null ? void 0 : d.data) == null ? void 0 : s.originalError) == null ? void 0 : i.code) === W.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
              await oe.addEthereumChain(p, h);
            else
              throw new Error("Chain is not supported");
          }
      } else if (n === k.EIP6963_CONNECTOR_ID && h) {
        const p = t;
        if (p)
          try {
            await p.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: oe.numberToHexString(h.chainId) }]
            }), C.setChainId(h.chainId);
          } catch (d) {
            if (d.code === W.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || d.code === W.ERROR_CODE_DEFAULT || ((o = (a = d == null ? void 0 : d.data) == null ? void 0 : a.originalError) == null ? void 0 : o.code) === W.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
              await oe.addEthereumChain(p, h);
            else
              throw new Error("Chain is not supported");
          }
      } else if (n === k.COINBASE_SDK_CONNECTOR_ID && h) {
        const p = t;
        if (p)
          try {
            await p.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: oe.numberToHexString(h.chainId) }]
            }), C.setChainId(h.chainId);
          } catch (d) {
            if (d.code === W.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || d.code === W.ERROR_CODE_DEFAULT || ((u = (c = d == null ? void 0 : d.data) == null ? void 0 : c.originalError) == null ? void 0 : u.code) === W.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
              await oe.addEthereumChain(p, h);
            else
              throw new Error("Error switching network");
          }
      } else if (n === k.AUTH_CONNECTOR_ID && this.authProvider && h != null && h.chainId)
        try {
          super.setLoading(!0), await this.authProvider.switchNetwork(h == null ? void 0 : h.chainId), C.setChainId(h.chainId);
          const { address: p, preferredAccountType: d } = await this.authProvider.connect({
            chainId: h == null ? void 0 : h.chainId
          });
          C.setAddress(p), C.setPreferredAccountType(d), await this.syncAccount();
        } catch {
          throw new Error("Switching chain failed");
        } finally {
          super.setLoading(!1);
        }
    }
  }
  syncConnectors(e) {
    var s, i, a, o, c, u;
    const t = [], n = ge.ConnectorTypesMap[k.WALLET_CONNECT_CONNECTOR_ID];
    if (t.push({
      id: k.WALLET_CONNECT_CONNECTOR_ID,
      explorerId: ge.ConnectorExplorerIds[k.WALLET_CONNECT_CONNECTOR_ID],
      imageId: ge.ConnectorImageIds[k.WALLET_CONNECT_CONNECTOR_ID],
      imageUrl: (i = (s = this.options) == null ? void 0 : s.connectorImages) == null ? void 0 : i[k.WALLET_CONNECT_CONNECTOR_ID],
      name: ge.ConnectorNamesMap[k.WALLET_CONNECT_CONNECTOR_ID],
      type: n,
      chain: this.chain
    }), e.injected) {
      const h = ge.ConnectorTypesMap[k.INJECTED_CONNECTOR_ID];
      t.push({
        id: k.INJECTED_CONNECTOR_ID,
        explorerId: ge.ConnectorExplorerIds[k.INJECTED_CONNECTOR_ID],
        imageId: ge.ConnectorImageIds[k.INJECTED_CONNECTOR_ID],
        imageUrl: (o = (a = this.options) == null ? void 0 : a.connectorImages) == null ? void 0 : o[k.INJECTED_CONNECTOR_ID],
        name: ge.ConnectorNamesMap[k.INJECTED_CONNECTOR_ID],
        type: h,
        chain: this.chain
      });
    }
    e.coinbase && t.push({
      id: k.COINBASE_SDK_CONNECTOR_ID,
      explorerId: ge.ConnectorExplorerIds[k.COINBASE_SDK_CONNECTOR_ID],
      imageId: ge.ConnectorImageIds[k.COINBASE_SDK_CONNECTOR_ID],
      imageUrl: (u = (c = this.options) == null ? void 0 : c.connectorImages) == null ? void 0 : u[k.COINBASE_SDK_CONNECTOR_ID],
      name: ge.ConnectorNamesMap[k.COINBASE_SDK_CONNECTOR_ID],
      type: "EXTERNAL",
      chain: this.chain
    }), this.setConnectors(t);
  }
  async syncAuthConnector(e, t) {
    if (typeof window < "u") {
      this.authProvider = new nf(e), this.addConnector({
        id: k.AUTH_CONNECTOR_ID,
        type: "AUTH",
        name: "Auth",
        provider: this.authProvider,
        email: t == null ? void 0 : t.email,
        socials: t == null ? void 0 : t.socials,
        showWallets: (t == null ? void 0 : t.showWallets) === void 0 ? !0 : t.showWallets,
        chain: this.chain,
        walletFeatures: t == null ? void 0 : t.walletFeatures
      }), super.setLoading(!0);
      const n = this.authProvider.getLoginEmailUsed();
      super.setLoading(n);
      const { isConnected: s } = await this.authProvider.isConnected();
      s ? await this.setAuthProvider() : super.setLoading(!1);
    }
  }
  eip6963EventHandler(e) {
    var t, n;
    if (e.detail) {
      const { info: s, provider: i } = e.detail, a = this.getConnectors(), o = a.find((h) => h.name === s.name), u = a.find((h) => h.id === k.COINBASE_SDK_CONNECTOR_ID) && e.detail.info.rdns === k.CONNECTOR_RDNS_MAP[k.COINBASE_SDK_CONNECTOR_ID];
      if (!o && !u) {
        const h = ge.ConnectorTypesMap[k.EIP6963_CONNECTOR_ID];
        {
          this.addConnector({
            id: k.EIP6963_CONNECTOR_ID,
            type: h,
            imageUrl: s.icon ?? ((n = (t = this.options) == null ? void 0 : t.connectorImages) == null ? void 0 : n[k.EIP6963_CONNECTOR_ID]),
            name: s.name,
            provider: i,
            info: s,
            chain: this.chain
          });
          const p = {
            provider: i,
            info: s
          };
          this.EIP6963Providers.push(p);
        }
      }
    }
  }
  listenConnectors(e) {
    if (typeof window < "u" && e) {
      const t = this.eip6963EventHandler.bind(this);
      window.addEventListener(k.EIP6963_ANNOUNCE_EVENT, t), window.dispatchEvent(new Event(k.EIP6963_REQUEST_EVENT));
    }
  }
}
var ud = {}, Ii = {}, go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
go.walletLogo = void 0;
const Dm = (r, e) => {
  let t;
  switch (r) {
    case "standard":
      return t = e, `data:image/svg+xml,%3Csvg width='${e}' height='${t}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
    case "circle":
      return t = e, `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${t}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`;
    case "text":
      return t = (0.1 * e).toFixed(2), `data:image/svg+xml,%3Csvg width='${e}' height='${t}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
    case "textWithLogo":
      return t = (0.25 * e).toFixed(2), `data:image/svg+xml,%3Csvg width='${e}' height='${t}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
    case "textLight":
      return t = (0.1 * e).toFixed(2), `data:image/svg+xml,%3Csvg width='${e}' height='${t}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`;
    case "textWithLogoLight":
      return t = (0.25 * e).toFixed(2), `data:image/svg+xml,%3Csvg width='${e}' height='${t}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`;
    default:
      return t = e, `data:image/svg+xml,%3Csvg width='${e}' height='${t}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `;
  }
};
go.walletLogo = Dm;
var mo = {}, Lt = {}, an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
an.errorValues = an.standardErrorCodes = void 0;
an.standardErrorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
    unsupportedChain: 4902
  }
};
an.errorValues = {
  "-32700": {
    standard: "JSON RPC 2.0",
    message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
  },
  "-32600": {
    standard: "JSON RPC 2.0",
    message: "The JSON sent is not a valid Request object."
  },
  "-32601": {
    standard: "JSON RPC 2.0",
    message: "The method does not exist / is not available."
  },
  "-32602": {
    standard: "JSON RPC 2.0",
    message: "Invalid method parameter(s)."
  },
  "-32603": {
    standard: "JSON RPC 2.0",
    message: "Internal JSON-RPC error."
  },
  "-32000": {
    standard: "EIP-1474",
    message: "Invalid input."
  },
  "-32001": {
    standard: "EIP-1474",
    message: "Resource not found."
  },
  "-32002": {
    standard: "EIP-1474",
    message: "Resource unavailable."
  },
  "-32003": {
    standard: "EIP-1474",
    message: "Transaction rejected."
  },
  "-32004": {
    standard: "EIP-1474",
    message: "Method not supported."
  },
  "-32005": {
    standard: "EIP-1474",
    message: "Request limit exceeded."
  },
  4001: {
    standard: "EIP-1193",
    message: "User rejected the request."
  },
  4100: {
    standard: "EIP-1193",
    message: "The requested account and/or method has not been authorized by the user."
  },
  4200: {
    standard: "EIP-1193",
    message: "The requested method is not supported by this Ethereum provider."
  },
  4900: {
    standard: "EIP-1193",
    message: "The provider is disconnected from all chains."
  },
  4901: {
    standard: "EIP-1193",
    message: "The provider is disconnected from the specified chain."
  },
  4902: {
    standard: "EIP-3085",
    message: "Unrecognized chain ID."
  }
};
var yo = {}, Zc = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.serialize = r.getErrorCode = r.isValidCode = r.getMessageFromCode = r.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
  const e = an, t = "Unspecified error message.";
  r.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
  function n(d, g = t) {
    if (d && Number.isInteger(d)) {
      const b = d.toString();
      if (h(e.errorValues, b))
        return e.errorValues[b].message;
      if (c(d))
        return r.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
    return g;
  }
  r.getMessageFromCode = n;
  function s(d) {
    if (!Number.isInteger(d))
      return !1;
    const g = d.toString();
    return !!(e.errorValues[g] || c(d));
  }
  r.isValidCode = s;
  function i(d) {
    var g;
    if (typeof d == "number")
      return d;
    if (a(d))
      return (g = d.code) !== null && g !== void 0 ? g : d.errorCode;
  }
  r.getErrorCode = i;
  function a(d) {
    return typeof d == "object" && d !== null && (typeof d.code == "number" || typeof d.errorCode == "number");
  }
  function o(d, { shouldIncludeStack: g = !1 } = {}) {
    const b = {};
    if (d && typeof d == "object" && !Array.isArray(d) && h(d, "code") && s(d.code)) {
      const A = d;
      b.code = A.code, A.message && typeof A.message == "string" ? (b.message = A.message, h(A, "data") && (b.data = A.data)) : (b.message = n(b.code), b.data = { originalError: u(d) });
    } else
      b.code = e.standardErrorCodes.rpc.internal, b.message = p(d, "message") ? d.message : t, b.data = { originalError: u(d) };
    return g && (b.stack = p(d, "stack") ? d.stack : void 0), b;
  }
  r.serialize = o;
  function c(d) {
    return d >= -32099 && d <= -32e3;
  }
  function u(d) {
    return d && typeof d == "object" && !Array.isArray(d) ? Object.assign({}, d) : d;
  }
  function h(d, g) {
    return Object.prototype.hasOwnProperty.call(d, g);
  }
  function p(d, g) {
    return typeof d == "object" && d !== null && g in d && typeof d[g] == "string";
  }
})(Zc);
Object.defineProperty(yo, "__esModule", { value: !0 });
yo.standardErrors = void 0;
const he = an, hd = Zc;
yo.standardErrors = {
  rpc: {
    parse: (r) => Ve(he.standardErrorCodes.rpc.parse, r),
    invalidRequest: (r) => Ve(he.standardErrorCodes.rpc.invalidRequest, r),
    invalidParams: (r) => Ve(he.standardErrorCodes.rpc.invalidParams, r),
    methodNotFound: (r) => Ve(he.standardErrorCodes.rpc.methodNotFound, r),
    internal: (r) => Ve(he.standardErrorCodes.rpc.internal, r),
    server: (r) => {
      if (!r || typeof r != "object" || Array.isArray(r))
        throw new Error("Ethereum RPC Server errors must provide single object argument.");
      const { code: e } = r;
      if (!Number.isInteger(e) || e > -32005 || e < -32099)
        throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
      return Ve(e, r);
    },
    invalidInput: (r) => Ve(he.standardErrorCodes.rpc.invalidInput, r),
    resourceNotFound: (r) => Ve(he.standardErrorCodes.rpc.resourceNotFound, r),
    resourceUnavailable: (r) => Ve(he.standardErrorCodes.rpc.resourceUnavailable, r),
    transactionRejected: (r) => Ve(he.standardErrorCodes.rpc.transactionRejected, r),
    methodNotSupported: (r) => Ve(he.standardErrorCodes.rpc.methodNotSupported, r),
    limitExceeded: (r) => Ve(he.standardErrorCodes.rpc.limitExceeded, r)
  },
  provider: {
    userRejectedRequest: (r) => Mr(he.standardErrorCodes.provider.userRejectedRequest, r),
    unauthorized: (r) => Mr(he.standardErrorCodes.provider.unauthorized, r),
    unsupportedMethod: (r) => Mr(he.standardErrorCodes.provider.unsupportedMethod, r),
    disconnected: (r) => Mr(he.standardErrorCodes.provider.disconnected, r),
    chainDisconnected: (r) => Mr(he.standardErrorCodes.provider.chainDisconnected, r),
    unsupportedChain: (r) => Mr(he.standardErrorCodes.provider.unsupportedChain, r),
    custom: (r) => {
      if (!r || typeof r != "object" || Array.isArray(r))
        throw new Error("Ethereum Provider custom errors must provide single object argument.");
      const { code: e, message: t, data: n } = r;
      if (!t || typeof t != "string")
        throw new Error('"message" must be a nonempty string');
      return new pd(e, t, n);
    }
  }
};
function Ve(r, e) {
  const [t, n] = dd(e);
  return new fd(r, t || (0, hd.getMessageFromCode)(r), n);
}
function Mr(r, e) {
  const [t, n] = dd(e);
  return new pd(r, t || (0, hd.getMessageFromCode)(r), n);
}
function dd(r) {
  if (r) {
    if (typeof r == "string")
      return [r];
    if (typeof r == "object" && !Array.isArray(r)) {
      const { message: e, data: t } = r;
      if (e && typeof e != "string")
        throw new Error("Must specify string message.");
      return [e || void 0, t];
    }
  }
  return [];
}
class fd extends Error {
  constructor(e, t, n) {
    if (!Number.isInteger(e))
      throw new Error('"code" must be an integer.');
    if (!t || typeof t != "string")
      throw new Error('"message" must be a nonempty string.');
    super(t), this.code = e, n !== void 0 && (this.data = n);
  }
}
class pd extends fd {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(e, t, n) {
    if (!Bm(e))
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    super(e, t, n);
  }
}
function Bm(r) {
  return Number.isInteger(r) && r >= 1e3 && r <= 4999;
}
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.standardErrors = r.standardErrorCodes = void 0;
  var e = an;
  Object.defineProperty(r, "standardErrorCodes", { enumerable: !0, get: function() {
    return e.standardErrorCodes;
  } });
  var t = yo;
  Object.defineProperty(r, "standardErrors", { enumerable: !0, get: function() {
    return t.standardErrors;
  } });
})(Lt);
var wo = {}, ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.isErrorResponse = void 0;
function Um(r) {
  return r.errorMessage !== void 0;
}
ei.isErrorResponse = Um;
var Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.LIB_VERSION = void 0;
Sr.LIB_VERSION = "4.0.3";
Object.defineProperty(wo, "__esModule", { value: !0 });
wo.serializeError = void 0;
const Fm = ei, Hm = Sr, Gm = an, Wm = Zc;
function jm(r, e) {
  const t = (0, Wm.serialize)(Vm(r), {
    shouldIncludeStack: !0
  }), n = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
  n.searchParams.set("version", Hm.LIB_VERSION), n.searchParams.set("code", t.code.toString());
  const s = Km(t.data, e);
  return s && n.searchParams.set("method", s), n.searchParams.set("message", t.message), Object.assign(Object.assign({}, t), { docUrl: n.href });
}
wo.serializeError = jm;
function Vm(r) {
  return typeof r == "string" ? {
    message: r,
    code: Gm.standardErrorCodes.rpc.internal
  } : (0, Fm.isErrorResponse)(r) ? Object.assign(Object.assign({}, r), { message: r.errorMessage, code: r.errorCode, data: { method: r.method } }) : r;
}
function Km(r, e) {
  const t = r == null ? void 0 : r.method;
  if (t)
    return t;
  if (e !== void 0) {
    if (typeof e == "string")
      return e;
    if (Array.isArray(e)) {
      if (e.length > 0)
        return e[0].method;
    } else
      return e.method;
  }
}
var be = {};
Object.defineProperty(be, "__esModule", { value: !0 });
be.RegExpString = be.IntNumber = be.BigIntString = be.AddressString = be.HexString = be.OpaqueType = void 0;
function ea() {
  return (r) => r;
}
be.OpaqueType = ea;
be.HexString = ea();
be.AddressString = ea();
be.BigIntString = ea();
function Qm(r) {
  return Math.floor(r);
}
be.IntNumber = Qm;
be.RegExpString = ea();
var T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
T.areAddressArraysEqual = T.getFavicon = T.range = T.isBigNumber = T.ensureParsedJSONObject = T.ensureBigInt = T.ensureRegExpString = T.ensureIntNumber = T.ensureBuffer = T.ensureAddressString = T.ensureEvenLengthHexString = T.ensureHexString = T.isHexString = T.prepend0x = T.strip0x = T.has0xPrefix = T.hexStringFromIntNumber = T.intNumberFromHexString = T.bigIntStringFromBigInt = T.hexStringFromBuffer = T.hexStringToUint8Array = T.uint8ArrayToHex = T.randomBytesHex = void 0;
const kr = Lt, $e = be, gd = /^[0-9]*$/, md = /^[a-f0-9]*$/;
function zm(r) {
  return yd(crypto.getRandomValues(new Uint8Array(r)));
}
T.randomBytesHex = zm;
function yd(r) {
  return [...r].map((e) => e.toString(16).padStart(2, "0")).join("");
}
T.uint8ArrayToHex = yd;
function Jm(r) {
  return new Uint8Array(r.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
T.hexStringToUint8Array = Jm;
function qm(r, e = !1) {
  const t = r.toString("hex");
  return (0, $e.HexString)(e ? `0x${t}` : t);
}
T.hexStringFromBuffer = qm;
function Zm(r) {
  return (0, $e.BigIntString)(r.toString(10));
}
T.bigIntStringFromBigInt = Zm;
function Ym(r) {
  return (0, $e.IntNumber)(Number(BigInt(na(r, !0))));
}
T.intNumberFromHexString = Ym;
function $m(r) {
  return (0, $e.HexString)(`0x${BigInt(r).toString(16)}`);
}
T.hexStringFromIntNumber = $m;
function Yc(r) {
  return r.startsWith("0x") || r.startsWith("0X");
}
T.has0xPrefix = Yc;
function bo(r) {
  return Yc(r) ? r.slice(2) : r;
}
T.strip0x = bo;
function wd(r) {
  return Yc(r) ? `0x${r.slice(2)}` : `0x${r}`;
}
T.prepend0x = wd;
function ta(r) {
  if (typeof r != "string")
    return !1;
  const e = bo(r).toLowerCase();
  return md.test(e);
}
T.isHexString = ta;
function bd(r, e = !1) {
  if (typeof r == "string") {
    const t = bo(r).toLowerCase();
    if (md.test(t))
      return (0, $e.HexString)(e ? `0x${t}` : t);
  }
  throw kr.standardErrors.rpc.invalidParams(`"${String(r)}" is not a hexadecimal string`);
}
T.ensureHexString = bd;
function na(r, e = !1) {
  let t = bd(r, !1);
  return t.length % 2 === 1 && (t = (0, $e.HexString)(`0${t}`)), e ? (0, $e.HexString)(`0x${t}`) : t;
}
T.ensureEvenLengthHexString = na;
function Xm(r) {
  if (typeof r == "string") {
    const e = bo(r).toLowerCase();
    if (ta(e) && e.length === 40)
      return (0, $e.AddressString)(wd(e));
  }
  throw kr.standardErrors.rpc.invalidParams(`Invalid Ethereum address: ${String(r)}`);
}
T.ensureAddressString = Xm;
function e0(r) {
  if (z.isBuffer(r))
    return r;
  if (typeof r == "string") {
    if (ta(r)) {
      const e = na(r, !1);
      return z.from(e, "hex");
    }
    return z.from(r, "utf8");
  }
  throw kr.standardErrors.rpc.invalidParams(`Not binary data: ${String(r)}`);
}
T.ensureBuffer = e0;
function Ad(r) {
  if (typeof r == "number" && Number.isInteger(r))
    return (0, $e.IntNumber)(r);
  if (typeof r == "string") {
    if (gd.test(r))
      return (0, $e.IntNumber)(Number(r));
    if (ta(r))
      return (0, $e.IntNumber)(Number(BigInt(na(r, !0))));
  }
  throw kr.standardErrors.rpc.invalidParams(`Not an integer: ${String(r)}`);
}
T.ensureIntNumber = Ad;
function t0(r) {
  if (r instanceof RegExp)
    return (0, $e.RegExpString)(r.toString());
  throw kr.standardErrors.rpc.invalidParams(`Not a RegExp: ${String(r)}`);
}
T.ensureRegExpString = t0;
function n0(r) {
  if (r !== null && (typeof r == "bigint" || Ed(r)))
    return BigInt(r.toString(10));
  if (typeof r == "number")
    return BigInt(Ad(r));
  if (typeof r == "string") {
    if (gd.test(r))
      return BigInt(r);
    if (ta(r))
      return BigInt(na(r, !0));
  }
  throw kr.standardErrors.rpc.invalidParams(`Not an integer: ${String(r)}`);
}
T.ensureBigInt = n0;
function r0(r) {
  if (typeof r == "string")
    return JSON.parse(r);
  if (typeof r == "object")
    return r;
  throw kr.standardErrors.rpc.invalidParams(`Not a JSON string or an object: ${String(r)}`);
}
T.ensureParsedJSONObject = r0;
function Ed(r) {
  if (r == null || typeof r.constructor != "function")
    return !1;
  const { constructor: e } = r;
  return typeof e.config == "function" && typeof e.EUCLID == "number";
}
T.isBigNumber = Ed;
function s0(r, e) {
  return Array.from({ length: e - r }, (t, n) => r + n);
}
T.range = s0;
function i0() {
  const r = document.querySelector('link[sizes="192x192"]') || document.querySelector('link[sizes="180x180"]') || document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]'), { protocol: e, host: t } = document.location, n = r ? r.getAttribute("href") : null;
  return !n || n.startsWith("javascript:") || n.startsWith("vbscript:") ? null : n.startsWith("http://") || n.startsWith("https://") || n.startsWith("data:") ? n : n.startsWith("//") ? e + n : `${e}//${t}${n}`;
}
T.getFavicon = i0;
function a0(r, e) {
  return r.length === e.length && r.every((t, n) => t === e[n]);
}
T.areAddressArraysEqual = a0;
var Rt = {}, Ao = {}, Eo = {}, ie = {};
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.decryptContent = ie.encryptContent = ie.importKeyFromHexString = ie.exportKeyToHexString = ie.decrypt = ie.encrypt = ie.deriveSharedSecret = ie.generateKeyPair = void 0;
const Cd = T;
async function o0() {
  return crypto.subtle.generateKey({
    name: "ECDH",
    namedCurve: "P-256"
  }, !0, ["deriveKey"]);
}
ie.generateKeyPair = o0;
async function c0(r, e) {
  return crypto.subtle.deriveKey({
    name: "ECDH",
    public: e
  }, r, {
    name: "AES-GCM",
    length: 256
  }, !1, ["encrypt", "decrypt"]);
}
ie.deriveSharedSecret = c0;
async function vd(r, e) {
  const t = crypto.getRandomValues(new Uint8Array(12)), n = await crypto.subtle.encrypt({
    name: "AES-GCM",
    iv: t
  }, r, new TextEncoder().encode(e));
  return { iv: t, cipherText: n };
}
ie.encrypt = vd;
async function Id(r, { iv: e, cipherText: t }) {
  const n = await crypto.subtle.decrypt({
    name: "AES-GCM",
    iv: e
  }, r, t);
  return new TextDecoder().decode(n);
}
ie.decrypt = Id;
function Nd(r) {
  switch (r) {
    case "public":
      return "spki";
    case "private":
      return "pkcs8";
  }
}
async function l0(r, e) {
  const t = Nd(r), n = await crypto.subtle.exportKey(t, e);
  return (0, Cd.uint8ArrayToHex)(new Uint8Array(n));
}
ie.exportKeyToHexString = l0;
async function u0(r, e) {
  const t = Nd(r), n = (0, Cd.hexStringToUint8Array)(e).buffer;
  return await crypto.subtle.importKey(t, n, {
    name: "ECDH",
    namedCurve: "P-256"
  }, !0, r === "private" ? ["deriveKey"] : []);
}
ie.importKeyFromHexString = u0;
async function h0(r, e) {
  const t = JSON.stringify(r, (n, s) => {
    if (!(s instanceof Error))
      return s;
    const i = s;
    return Object.assign(Object.assign({}, i.code ? { code: i.code } : {}), { message: i.message });
  });
  return vd(e, t);
}
ie.encryptContent = h0;
async function d0(r, e) {
  return JSON.parse(await Id(e, r));
}
ie.decryptContent = d0;
var Mt = {};
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.ScopedLocalStorage = void 0;
class za {
  constructor(e, t) {
    this.scope = e, this.module = t;
  }
  setItem(e, t) {
    localStorage.setItem(this.scopedKey(e), t);
  }
  getItem(e) {
    return localStorage.getItem(this.scopedKey(e));
  }
  removeItem(e) {
    localStorage.removeItem(this.scopedKey(e));
  }
  clear() {
    const e = this.scopedKey(""), t = [];
    for (let n = 0; n < localStorage.length; n++) {
      const s = localStorage.key(n);
      typeof s == "string" && s.startsWith(e) && t.push(s);
    }
    t.forEach((n) => localStorage.removeItem(n));
  }
  scopedKey(e) {
    return `-${this.scope}${this.module ? `:${this.module}` : ""}:${e}`;
  }
  static clearAll() {
    new za("CBWSDK").clear(), new za("walletlink").clear();
  }
}
Mt.ScopedLocalStorage = za;
Object.defineProperty(Eo, "__esModule", { value: !0 });
Eo.SCWKeyManager = void 0;
const pa = ie, f0 = Mt, Yo = {
  storageKey: "ownPrivateKey",
  keyType: "private"
}, $o = {
  storageKey: "ownPublicKey",
  keyType: "public"
}, Xo = {
  storageKey: "peerPublicKey",
  keyType: "public"
};
class p0 {
  constructor() {
    this.storage = new f0.ScopedLocalStorage("CBWSDK", "SCWKeyManager"), this.ownPrivateKey = null, this.ownPublicKey = null, this.peerPublicKey = null, this.sharedSecret = null;
  }
  async getOwnPublicKey() {
    return await this.loadKeysIfNeeded(), this.ownPublicKey;
  }
  // returns null if the shared secret is not yet derived
  async getSharedSecret() {
    return await this.loadKeysIfNeeded(), this.sharedSecret;
  }
  async setPeerPublicKey(e) {
    this.sharedSecret = null, this.peerPublicKey = e, await this.storeKey(Xo, e), await this.loadKeysIfNeeded();
  }
  async clear() {
    this.ownPrivateKey = null, this.ownPublicKey = null, this.peerPublicKey = null, this.sharedSecret = null, this.storage.removeItem($o.storageKey), this.storage.removeItem(Yo.storageKey), this.storage.removeItem(Xo.storageKey);
  }
  async generateKeyPair() {
    const e = await (0, pa.generateKeyPair)();
    this.ownPrivateKey = e.privateKey, this.ownPublicKey = e.publicKey, await this.storeKey(Yo, e.privateKey), await this.storeKey($o, e.publicKey);
  }
  async loadKeysIfNeeded() {
    if (this.ownPrivateKey === null && (this.ownPrivateKey = await this.loadKey(Yo)), this.ownPublicKey === null && (this.ownPublicKey = await this.loadKey($o)), (this.ownPrivateKey === null || this.ownPublicKey === null) && await this.generateKeyPair(), this.peerPublicKey === null && (this.peerPublicKey = await this.loadKey(Xo)), this.sharedSecret === null) {
      if (this.ownPrivateKey === null || this.peerPublicKey === null)
        return;
      this.sharedSecret = await (0, pa.deriveSharedSecret)(this.ownPrivateKey, this.peerPublicKey);
    }
  }
  // storage methods
  async loadKey(e) {
    const t = this.storage.getItem(e.storageKey);
    return t ? (0, pa.importKeyFromHexString)(e.keyType, t) : null;
  }
  async storeKey(e, t) {
    const n = await (0, pa.exportKeyToHexString)(e.keyType, t);
    this.storage.setItem(e.storageKey, n);
  }
}
Eo.SCWKeyManager = p0;
var Co = {};
Object.defineProperty(Co, "__esModule", { value: !0 });
Co.SCWStateManager = void 0;
const g0 = Mt, pu = "accounts", gu = "activeChain", mu = "availableChains", yu = "walletCapabilities";
class m0 {
  get accounts() {
    return this._accounts;
  }
  get activeChain() {
    return this._activeChain;
  }
  get walletCapabilities() {
    return this._walletCapabilities;
  }
  constructor(e) {
    var t, n;
    this.storage = new g0.ScopedLocalStorage("CBWSDK", "SCWStateManager"), this.updateListener = e.updateListener, this.availableChains = this.loadItemFromStorage(mu), this._walletCapabilities = this.loadItemFromStorage(yu);
    const s = this.loadItemFromStorage(pu), i = this.loadItemFromStorage(gu);
    s && this.updateListener.onAccountsUpdate({
      accounts: s,
      source: "storage"
    }), i && this.updateListener.onChainUpdate({
      chain: i,
      source: "storage"
    }), this._accounts = s || [], this._activeChain = i || { id: (n = (t = e.appChainIds) === null || t === void 0 ? void 0 : t[0]) !== null && n !== void 0 ? n : 1 };
  }
  updateAccounts(e) {
    this._accounts = e, this.storeItemToStorage(pu, e), this.updateListener.onAccountsUpdate({
      accounts: e,
      source: "wallet"
    });
  }
  switchChain(e) {
    var t;
    const n = (t = this.availableChains) === null || t === void 0 ? void 0 : t.find((s) => s.id === e);
    return n ? (n === this._activeChain || (this._activeChain = n, this.storeItemToStorage(gu, n), this.updateListener.onChainUpdate({
      chain: n,
      source: "wallet"
    })), !0) : !1;
  }
  updateAvailableChains(e) {
    if (!e || Object.keys(e).length === 0)
      return;
    const t = Object.entries(e).map(([n, s]) => ({ id: Number(n), rpcUrl: s }));
    this.availableChains = t, this.storeItemToStorage(mu, t), this.switchChain(this._activeChain.id);
  }
  updateWalletCapabilities(e) {
    this._walletCapabilities = e, this.storeItemToStorage(yu, e);
  }
  storeItemToStorage(e, t) {
    this.storage.setItem(e, JSON.stringify(t));
  }
  loadItemFromStorage(e) {
    const t = this.storage.getItem(e);
    return t ? JSON.parse(t) : void 0;
  }
  clear() {
    this.storage.clear();
  }
}
Co.SCWStateManager = m0;
Object.defineProperty(Ao, "__esModule", { value: !0 });
Ao.SCWSigner = void 0;
const y0 = Eo, w0 = Co, ga = Lt, wu = T, ma = ie;
class b0 {
  constructor(e) {
    this.metadata = e.metadata, this.communicator = e.communicator, this.keyManager = new y0.SCWKeyManager(), this.stateManager = new w0.SCWStateManager({
      appChainIds: this.metadata.appChainIds,
      updateListener: e.updateListener
    }), this.handshake = this.handshake.bind(this), this.request = this.request.bind(this), this.createRequestMessage = this.createRequestMessage.bind(this), this.decryptResponseMessage = this.decryptResponseMessage.bind(this);
  }
  async handshake() {
    const e = await this.createRequestMessage({
      handshake: {
        method: "eth_requestAccounts",
        params: this.metadata
      }
    }), t = await this.communicator.postRequestAndWaitForResponse(e);
    if ("failure" in t.content)
      throw t.content.failure;
    const n = await (0, ma.importKeyFromHexString)("public", t.sender);
    await this.keyManager.setPeerPublicKey(n);
    const s = await this.decryptResponseMessage(t);
    this.updateInternalState({ method: "eth_requestAccounts" }, s);
    const i = s.result;
    if ("error" in i)
      throw i.error;
    return this.stateManager.accounts;
  }
  async request(e) {
    const t = this.tryLocalHandling(e);
    if (t !== void 0) {
      if (t instanceof Error)
        throw t;
      return t;
    }
    await this.communicator.waitForPopupLoaded();
    const n = await this.sendEncryptedRequest(e), s = await this.decryptResponseMessage(n);
    this.updateInternalState(e, s);
    const i = s.result;
    if ("error" in i)
      throw i.error;
    return i.value;
  }
  async disconnect() {
    this.stateManager.clear(), await this.keyManager.clear();
  }
  tryLocalHandling(e) {
    var t;
    switch (e.method) {
      case "wallet_switchEthereumChain": {
        const n = e.params;
        if (!n || !(!((t = n[0]) === null || t === void 0) && t.chainId))
          throw ga.standardErrors.rpc.invalidParams();
        const s = (0, wu.ensureIntNumber)(n[0].chainId);
        return this.stateManager.switchChain(s) ? null : void 0;
      }
      case "wallet_getCapabilities": {
        const n = this.stateManager.walletCapabilities;
        if (!n)
          throw ga.standardErrors.provider.unauthorized("No wallet capabilities found, please disconnect and reconnect");
        return n;
      }
      default:
        return;
    }
  }
  async sendEncryptedRequest(e) {
    const t = await this.keyManager.getSharedSecret();
    if (!t)
      throw ga.standardErrors.provider.unauthorized("No valid session found, try requestAccounts before other methods");
    const n = await (0, ma.encryptContent)({
      action: e,
      chainId: this.stateManager.activeChain.id
    }, t), s = await this.createRequestMessage({ encrypted: n });
    return this.communicator.postRequestAndWaitForResponse(s);
  }
  async createRequestMessage(e) {
    const t = await (0, ma.exportKeyToHexString)("public", await this.keyManager.getOwnPublicKey());
    return {
      id: crypto.randomUUID(),
      sender: t,
      content: e,
      timestamp: /* @__PURE__ */ new Date()
    };
  }
  async decryptResponseMessage(e) {
    const t = e.content;
    if ("failure" in t)
      throw t.failure;
    const n = await this.keyManager.getSharedSecret();
    if (!n)
      throw ga.standardErrors.provider.unauthorized("Invalid session");
    return (0, ma.decryptContent)(t.encrypted, n);
  }
  updateInternalState(e, t) {
    var n, s;
    const i = (n = t.data) === null || n === void 0 ? void 0 : n.chains;
    i && this.stateManager.updateAvailableChains(i);
    const a = (s = t.data) === null || s === void 0 ? void 0 : s.capabilities;
    a && this.stateManager.updateWalletCapabilities(a);
    const o = t.result;
    if (!("error" in o))
      switch (e.method) {
        case "eth_requestAccounts": {
          const c = o.value;
          this.stateManager.updateAccounts(c);
          break;
        }
        case "wallet_switchEthereumChain": {
          if (o.value !== null)
            return;
          const c = e.params, u = (0, wu.ensureIntNumber)(c[0].chainId);
          this.stateManager.switchChain(u);
          break;
        }
      }
  }
}
Ao.SCWSigner = b0;
var vo = {};
const A0 = of;
function Pd(r) {
  return z.allocUnsafe(r).fill(0);
}
function E0(r) {
  return r.toString(2).length;
}
function Sd(r, e) {
  let t = r.toString(16);
  t.length % 2 !== 0 && (t = "0" + t);
  const n = t.match(/.{1,2}/g).map((s) => parseInt(s, 16));
  for (; n.length < e; )
    n.unshift(0);
  return z.from(n);
}
function C0(r, e) {
  const t = r < 0n;
  let n;
  if (t) {
    const s = (1n << BigInt(e)) - 1n;
    n = (~r & s) + 1n;
  } else
    n = r;
  return n &= (1n << BigInt(e)) - 1n, n;
}
function kd(r, e, t) {
  const n = Pd(e);
  return r = Io(r), t ? r.length < e ? (r.copy(n), n) : r.slice(0, e) : r.length < e ? (r.copy(n, e - r.length), n) : r.slice(-e);
}
function v0(r, e) {
  return kd(r, e, !0);
}
function Io(r) {
  if (!z.isBuffer(r))
    if (Array.isArray(r))
      r = z.from(r);
    else if (typeof r == "string")
      Rd(r) ? r = z.from(P0(xd(r)), "hex") : r = z.from(r);
    else if (typeof r == "number")
      r = intToBuffer(r);
    else if (r == null)
      r = z.allocUnsafe(0);
    else if (typeof r == "bigint")
      r = Sd(r);
    else if (r.toArray)
      r = z.from(r.toArray());
    else
      throw new Error("invalid type");
  return r;
}
function I0(r) {
  return r = Io(r), "0x" + r.toString("hex");
}
function N0(r, e) {
  return r = Io(r), e || (e = 256), A0("keccak" + e).update(r).digest();
}
function P0(r) {
  return r.length % 2 ? "0" + r : r;
}
function Rd(r) {
  return typeof r == "string" && r.match(/^0x[0-9A-Fa-f]*$/);
}
function xd(r) {
  return typeof r == "string" && r.startsWith("0x") ? r.slice(2) : r;
}
var Td = {
  zeros: Pd,
  setLength: kd,
  setLengthRight: v0,
  isHexString: Rd,
  stripHexPrefix: xd,
  toBuffer: Io,
  bufferToHex: I0,
  keccak: N0,
  bitLengthFromBigInt: E0,
  bufferBEFromBigInt: Sd,
  twosFromBigInt: C0
};
const Se = Td;
function Od(r) {
  return r.startsWith("int[") ? "int256" + r.slice(3) : r === "int" ? "int256" : r.startsWith("uint[") ? "uint256" + r.slice(4) : r === "uint" ? "uint256" : r.startsWith("fixed[") ? "fixed128x128" + r.slice(5) : r === "fixed" ? "fixed128x128" : r.startsWith("ufixed[") ? "ufixed128x128" + r.slice(6) : r === "ufixed" ? "ufixed128x128" : r;
}
function ns(r) {
  return parseInt(/^\D+(\d+)$/.exec(r)[1], 10);
}
function bu(r) {
  var e = /^\D+(\d+)x(\d+)$/.exec(r);
  return [parseInt(e[1], 10), parseInt(e[2], 10)];
}
function _d(r) {
  var e = r.match(/(.*)\[(.*?)\]$/);
  return e ? e[2] === "" ? "dynamic" : parseInt(e[2], 10) : null;
}
function Gn(r) {
  var e = typeof r;
  if (e === "string" || e === "number")
    return BigInt(r);
  if (e === "bigint")
    return r;
  throw new Error("Argument is not a number");
}
function mt(r, e) {
  var t, n, s, i;
  if (r === "address")
    return mt("uint160", Gn(e));
  if (r === "bool")
    return mt("uint8", e ? 1 : 0);
  if (r === "string")
    return mt("bytes", new z(e, "utf8"));
  if (k0(r)) {
    if (typeof e.length > "u")
      throw new Error("Not an array?");
    if (t = _d(r), t !== "dynamic" && t !== 0 && e.length > t)
      throw new Error("Elements exceed array size: " + t);
    s = [], r = r.slice(0, r.lastIndexOf("[")), typeof e == "string" && (e = JSON.parse(e));
    for (i in e)
      s.push(mt(r, e[i]));
    if (t === "dynamic") {
      var a = mt("uint256", e.length);
      s.unshift(a);
    }
    return z.concat(s);
  } else {
    if (r === "bytes")
      return e = new z(e), s = z.concat([mt("uint256", e.length), e]), e.length % 32 !== 0 && (s = z.concat([s, Se.zeros(32 - e.length % 32)])), s;
    if (r.startsWith("bytes")) {
      if (t = ns(r), t < 1 || t > 32)
        throw new Error("Invalid bytes<N> width: " + t);
      return Se.setLengthRight(e, 32);
    } else if (r.startsWith("uint")) {
      if (t = ns(r), t % 8 || t < 8 || t > 256)
        throw new Error("Invalid uint<N> width: " + t);
      n = Gn(e);
      const o = Se.bitLengthFromBigInt(n);
      if (o > t)
        throw new Error("Supplied uint exceeds width: " + t + " vs " + o);
      if (n < 0)
        throw new Error("Supplied uint is negative");
      return Se.bufferBEFromBigInt(n, 32);
    } else if (r.startsWith("int")) {
      if (t = ns(r), t % 8 || t < 8 || t > 256)
        throw new Error("Invalid int<N> width: " + t);
      n = Gn(e);
      const o = Se.bitLengthFromBigInt(n);
      if (o > t)
        throw new Error("Supplied int exceeds width: " + t + " vs " + o);
      const c = Se.twosFromBigInt(n, 256);
      return Se.bufferBEFromBigInt(c, 32);
    } else if (r.startsWith("ufixed")) {
      if (t = bu(r), n = Gn(e), n < 0)
        throw new Error("Supplied ufixed is negative");
      return mt("uint256", n * BigInt(2) ** BigInt(t[1]));
    } else if (r.startsWith("fixed"))
      return t = bu(r), mt("int256", Gn(e) * BigInt(2) ** BigInt(t[1]));
  }
  throw new Error("Unsupported or invalid type: " + r);
}
function S0(r) {
  return r === "string" || r === "bytes" || _d(r) === "dynamic";
}
function k0(r) {
  return r.lastIndexOf("]") === r.length - 1;
}
function R0(r, e) {
  var t = [], n = [], s = 32 * r.length;
  for (var i in r) {
    var a = Od(r[i]), o = e[i], c = mt(a, o);
    S0(a) ? (t.push(mt("uint256", s)), n.push(c), s += c.length) : t.push(c);
  }
  return z.concat(t.concat(n));
}
function Ld(r, e) {
  if (r.length !== e.length)
    throw new Error("Number of types are not matching the values");
  for (var t, n, s = [], i = 0; i < r.length; i++) {
    var a = Od(r[i]), o = e[i];
    if (a === "bytes")
      s.push(o);
    else if (a === "string")
      s.push(new z(o, "utf8"));
    else if (a === "bool")
      s.push(new z(o ? "01" : "00", "hex"));
    else if (a === "address")
      s.push(Se.setLength(o, 20));
    else if (a.startsWith("bytes")) {
      if (t = ns(a), t < 1 || t > 32)
        throw new Error("Invalid bytes<N> width: " + t);
      s.push(Se.setLengthRight(o, t));
    } else if (a.startsWith("uint")) {
      if (t = ns(a), t % 8 || t < 8 || t > 256)
        throw new Error("Invalid uint<N> width: " + t);
      n = Gn(o);
      const c = Se.bitLengthFromBigInt(n);
      if (c > t)
        throw new Error("Supplied uint exceeds width: " + t + " vs " + c);
      s.push(Se.bufferBEFromBigInt(n, t / 8));
    } else if (a.startsWith("int")) {
      if (t = ns(a), t % 8 || t < 8 || t > 256)
        throw new Error("Invalid int<N> width: " + t);
      n = Gn(o);
      const c = Se.bitLengthFromBigInt(n);
      if (c > t)
        throw new Error("Supplied int exceeds width: " + t + " vs " + c);
      const u = Se.twosFromBigInt(n, t);
      s.push(Se.bufferBEFromBigInt(u, t / 8));
    } else
      throw new Error("Unsupported or invalid type: " + a);
  }
  return z.concat(s);
}
function x0(r, e) {
  return Se.keccak(Ld(r, e));
}
var T0 = {
  rawEncode: R0,
  solidityPack: Ld,
  soliditySHA3: x0
};
const et = Td, fi = T0, Md = {
  type: "object",
  properties: {
    types: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" }
          },
          required: ["name", "type"]
        }
      }
    },
    primaryType: { type: "string" },
    domain: { type: "object" },
    message: { type: "object" }
  },
  required: ["types", "primaryType", "domain", "message"]
}, ec = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of an object
   */
  encodeData(r, e, t, n = !0) {
    const s = ["bytes32"], i = [this.hashType(r, t)];
    if (n) {
      const a = (o, c, u) => {
        if (t[c] !== void 0)
          return ["bytes32", u == null ? "0x0000000000000000000000000000000000000000000000000000000000000000" : et.keccak(this.encodeData(c, u, t, n))];
        if (u === void 0)
          throw new Error(`missing value for field ${o} of type ${c}`);
        if (c === "bytes")
          return ["bytes32", et.keccak(u)];
        if (c === "string")
          return typeof u == "string" && (u = z.from(u, "utf8")), ["bytes32", et.keccak(u)];
        if (c.lastIndexOf("]") === c.length - 1) {
          const h = c.slice(0, c.lastIndexOf("[")), p = u.map((d) => a(o, h, d));
          return ["bytes32", et.keccak(fi.rawEncode(
            p.map(([d]) => d),
            p.map(([, d]) => d)
          ))];
        }
        return [c, u];
      };
      for (const o of t[r]) {
        const [c, u] = a(o.name, o.type, e[o.name]);
        s.push(c), i.push(u);
      }
    } else
      for (const a of t[r]) {
        let o = e[a.name];
        if (o !== void 0)
          if (a.type === "bytes")
            s.push("bytes32"), o = et.keccak(o), i.push(o);
          else if (a.type === "string")
            s.push("bytes32"), typeof o == "string" && (o = z.from(o, "utf8")), o = et.keccak(o), i.push(o);
          else if (t[a.type] !== void 0)
            s.push("bytes32"), o = et.keccak(this.encodeData(a.type, o, t, n)), i.push(o);
          else {
            if (a.type.lastIndexOf("]") === a.type.length - 1)
              throw new Error("Arrays currently unimplemented in encodeData");
            s.push(a.type), i.push(o);
          }
      }
    return fi.rawEncode(s, i);
  },
  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType(r, e) {
    let t = "", n = this.findTypeDependencies(r, e).filter((s) => s !== r);
    n = [r].concat(n.sort());
    for (const s of n) {
      if (!e[s])
        throw new Error("No type definition specified: " + s);
      t += s + "(" + e[s].map(({ name: a, type: o }) => o + " " + a).join(",") + ")";
    }
    return t;
  },
  /**
   * Finds all types within a type definition object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies(r, e, t = []) {
    if (r = r.match(/^\w*/)[0], t.includes(r) || e[r] === void 0)
      return t;
    t.push(r);
    for (const n of e[r])
      for (const s of this.findTypeDependencies(n.type, e, t))
        !t.includes(s) && t.push(s);
    return t;
  },
  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */
  hashStruct(r, e, t, n = !0) {
    return et.keccak(this.encodeData(r, e, t, n));
  },
  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashType(r, e) {
    return et.keccak(this.encodeType(r, e));
  },
  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData(r) {
    const e = {};
    for (const t in Md.properties)
      r[t] && (e[t] = r[t]);
    return e.types && (e.types = Object.assign({ EIP712Domain: [] }, e.types)), e;
  },
  /**
   * Returns the hash of a typed message as per EIP-712 for signing
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {string} - sha3 hash for signing
   */
  hash(r, e = !0) {
    const t = this.sanitizeData(r), n = [z.from("1901", "hex")];
    return n.push(this.hashStruct("EIP712Domain", t.domain, t.types, e)), t.primaryType !== "EIP712Domain" && n.push(this.hashStruct(t.primaryType, t.message, t.types, e)), et.keccak(z.concat(n));
  }
};
var O0 = {
  TYPED_MESSAGE_SCHEMA: Md,
  TypedDataUtils: ec,
  hashForSignTypedDataLegacy: function(r) {
    return _0(r.data);
  },
  hashForSignTypedData_v3: function(r) {
    return ec.hash(r.data, !1);
  },
  hashForSignTypedData_v4: function(r) {
    return ec.hash(r.data);
  }
};
function _0(r) {
  const e = new Error("Expect argument to be non-empty array");
  if (typeof r != "object" || !r.length)
    throw e;
  const t = r.map(function(i) {
    return i.type === "bytes" ? et.toBuffer(i.value) : i.value;
  }), n = r.map(function(i) {
    return i.type;
  }), s = r.map(function(i) {
    if (!i.name)
      throw e;
    return i.type + " " + i.name;
  });
  return fi.soliditySHA3(
    ["bytes32", "bytes32"],
    [
      fi.soliditySHA3(new Array(r.length).fill("string"), s),
      fi.soliditySHA3(n, t)
    ]
  );
}
var Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.APP_VERSION_KEY = Tt.LOCAL_STORAGE_ADDRESSES_KEY = Tt.WALLET_USER_NAME_KEY = void 0;
Tt.WALLET_USER_NAME_KEY = "walletUsername";
Tt.LOCAL_STORAGE_ADDRESSES_KEY = "Addresses";
Tt.APP_VERSION_KEY = "AppVersion";
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
ra.RelayEventManager = void 0;
const L0 = T;
class M0 {
  constructor() {
    this._nextRequestId = 0, this.callbacks = /* @__PURE__ */ new Map();
  }
  makeRequestId() {
    this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
    const e = this._nextRequestId, t = (0, L0.prepend0x)(e.toString(16));
    return this.callbacks.get(t) && this.callbacks.delete(t), e;
  }
}
ra.RelayEventManager = M0;
var No = {}, Po = {}, So = {};
Object.defineProperty(So, "__esModule", { value: !0 });
So.WalletLinkCipher = void 0;
const ya = T;
class D0 {
  // @param secret hex representation of 32-byte secret
  constructor(e) {
    this.secret = e;
  }
  /**
   *
   * @param plainText string to be encrypted
   * returns hex string representation of bytes in the order: initialization vector (iv),
   * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes. Remaining bytes are the
   * encrypted plainText.
   */
  async encrypt(e) {
    const t = this.secret;
    if (t.length !== 64)
      throw Error("secret must be 256 bits");
    const n = crypto.getRandomValues(new Uint8Array(12)), s = await crypto.subtle.importKey("raw", (0, ya.hexStringToUint8Array)(t), { name: "aes-gcm" }, !1, ["encrypt", "decrypt"]), i = new TextEncoder(), a = await window.crypto.subtle.encrypt({
      name: "AES-GCM",
      iv: n
    }, s, i.encode(e)), o = 16, c = a.slice(a.byteLength - o), u = a.slice(0, a.byteLength - o), h = new Uint8Array(c), p = new Uint8Array(u), d = new Uint8Array([...n, ...h, ...p]);
    return (0, ya.uint8ArrayToHex)(d);
  }
  /**
   *
   * @param cipherText hex string representation of bytes in the order: initialization vector (iv),
   * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes.
   */
  async decrypt(e) {
    const t = this.secret;
    if (t.length !== 64)
      throw Error("secret must be 256 bits");
    return new Promise((n, s) => {
      (async function() {
        const i = await crypto.subtle.importKey("raw", (0, ya.hexStringToUint8Array)(t), { name: "aes-gcm" }, !1, ["encrypt", "decrypt"]), a = (0, ya.hexStringToUint8Array)(e), o = a.slice(0, 12), c = a.slice(12, 28), u = a.slice(28), h = new Uint8Array([...u, ...c]), p = {
          name: "AES-GCM",
          iv: new Uint8Array(o)
        };
        try {
          const d = await window.crypto.subtle.decrypt(p, i, h), g = new TextDecoder();
          n(g.decode(d));
        } catch (d) {
          s(d);
        }
      })();
    });
  }
}
So.WalletLinkCipher = D0;
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
ko.WalletLinkHTTP = void 0;
class B0 {
  constructor(e, t, n) {
    this.linkAPIUrl = e, this.sessionId = t;
    const s = `${t}:${n}`;
    this.auth = `Basic ${btoa(s)}`;
  }
  // mark unseen events as seen
  async markUnseenEventsAsSeen(e) {
    return Promise.all(e.map((t) => fetch(`${this.linkAPIUrl}/events/${t.eventId}/seen`, {
      method: "POST",
      headers: {
        Authorization: this.auth
      }
    }))).catch((t) => console.error("Unabled to mark event as failed:", t));
  }
  async fetchUnseenEvents() {
    var e;
    const t = await fetch(`${this.linkAPIUrl}/events?unseen=true`, {
      headers: {
        Authorization: this.auth
      }
    });
    if (t.ok) {
      const { events: n, error: s } = await t.json();
      if (s)
        throw new Error(`Check unseen events failed: ${s}`);
      const i = (e = n == null ? void 0 : n.filter((a) => a.event === "Web3Response").map((a) => ({
        type: "Event",
        sessionId: this.sessionId,
        eventId: a.id,
        event: a.event,
        data: a.data
      }))) !== null && e !== void 0 ? e : [];
      return this.markUnseenEventsAsSeen(i), i;
    }
    throw new Error(`Check unseen events failed: ${t.status}`);
  }
}
ko.WalletLinkHTTP = B0;
var Ys = {};
Object.defineProperty(Ys, "__esModule", { value: !0 });
Ys.WalletLinkWebSocket = Ys.ConnectionState = void 0;
var Qr;
(function(r) {
  r[r.DISCONNECTED = 0] = "DISCONNECTED", r[r.CONNECTING = 1] = "CONNECTING", r[r.CONNECTED = 2] = "CONNECTED";
})(Qr || (Ys.ConnectionState = Qr = {}));
class U0 {
  setConnectionStateListener(e) {
    this.connectionStateListener = e;
  }
  setIncomingDataListener(e) {
    this.incomingDataListener = e;
  }
  /**
   * Constructor
   * @param url WebSocket server URL
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  constructor(e, t = WebSocket) {
    this.WebSocketClass = t, this.webSocket = null, this.pendingData = [], this.url = e.replace(/^http/, "ws");
  }
  /**
   * Make a websocket connection
   * @returns a Promise that resolves when connected
   */
  async connect() {
    if (this.webSocket)
      throw new Error("webSocket object is not null");
    return new Promise((e, t) => {
      var n;
      let s;
      try {
        this.webSocket = s = new this.WebSocketClass(this.url);
      } catch (i) {
        t(i);
        return;
      }
      (n = this.connectionStateListener) === null || n === void 0 || n.call(this, Qr.CONNECTING), s.onclose = (i) => {
        var a;
        this.clearWebSocket(), t(new Error(`websocket error ${i.code}: ${i.reason}`)), (a = this.connectionStateListener) === null || a === void 0 || a.call(this, Qr.DISCONNECTED);
      }, s.onopen = (i) => {
        var a;
        e(), (a = this.connectionStateListener) === null || a === void 0 || a.call(this, Qr.CONNECTED), this.pendingData.length > 0 && ([...this.pendingData].forEach((c) => this.sendData(c)), this.pendingData = []);
      }, s.onmessage = (i) => {
        var a, o;
        if (i.data === "h")
          (a = this.incomingDataListener) === null || a === void 0 || a.call(this, {
            type: "Heartbeat"
          });
        else
          try {
            const c = JSON.parse(i.data);
            (o = this.incomingDataListener) === null || o === void 0 || o.call(this, c);
          } catch {
          }
      };
    });
  }
  /**
   * Disconnect from server
   */
  disconnect() {
    var e;
    const { webSocket: t } = this;
    if (t) {
      this.clearWebSocket(), (e = this.connectionStateListener) === null || e === void 0 || e.call(this, Qr.DISCONNECTED), this.connectionStateListener = void 0, this.incomingDataListener = void 0;
      try {
        t.close();
      } catch {
      }
    }
  }
  /**
   * Send data to server
   * @param data text to send
   */
  sendData(e) {
    const { webSocket: t } = this;
    if (!t) {
      this.pendingData.push(e), this.connect();
      return;
    }
    t.send(e);
  }
  clearWebSocket() {
    const { webSocket: e } = this;
    e && (this.webSocket = null, e.onclose = null, e.onerror = null, e.onmessage = null, e.onopen = null);
  }
}
Ys.WalletLinkWebSocket = U0;
Object.defineProperty(Po, "__esModule", { value: !0 });
Po.WalletLinkConnection = void 0;
const Au = Tt, F0 = So, H0 = ko, wa = Ys, Dr = be, Eu = 1e4, G0 = 6e4;
class W0 {
  /**
   * Constructor
   * @param session Session
   * @param linkAPIUrl Coinbase Wallet link server URL
   * @param listener WalletLinkConnectionUpdateListener
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  constructor({ session: e, linkAPIUrl: t, listener: n, WebSocketClass: s = WebSocket }) {
    this.destroyed = !1, this.lastHeartbeatResponse = 0, this.nextReqId = (0, Dr.IntNumber)(1), this._connected = !1, this._linked = !1, this.shouldFetchUnseenEventsOnConnect = !1, this.requestResolutions = /* @__PURE__ */ new Map(), this.handleSessionMetadataUpdated = (a) => {
      if (!a)
        return;
      (/* @__PURE__ */ new Map([
        ["__destroyed", this.handleDestroyed],
        ["EthereumAddress", this.handleAccountUpdated],
        ["WalletUsername", this.handleWalletUsernameUpdated],
        ["AppVersion", this.handleAppVersionUpdated],
        [
          "ChainId",
          (c) => a.JsonRpcUrl && this.handleChainUpdated(c, a.JsonRpcUrl)
        ]
      ])).forEach((c, u) => {
        const h = a[u];
        h !== void 0 && c(h);
      });
    }, this.handleDestroyed = (a) => {
      var o;
      a === "1" && ((o = this.listener) === null || o === void 0 || o.resetAndReload());
    }, this.handleAccountUpdated = async (a) => {
      var o;
      {
        const c = await this.cipher.decrypt(a);
        (o = this.listener) === null || o === void 0 || o.accountUpdated(c);
      }
    }, this.handleMetadataUpdated = async (a, o) => {
      var c;
      {
        const u = await this.cipher.decrypt(o);
        (c = this.listener) === null || c === void 0 || c.metadataUpdated(a, u);
      }
    }, this.handleWalletUsernameUpdated = async (a) => {
      this.handleMetadataUpdated(Au.WALLET_USER_NAME_KEY, a);
    }, this.handleAppVersionUpdated = async (a) => {
      this.handleMetadataUpdated(Au.APP_VERSION_KEY, a);
    }, this.handleChainUpdated = async (a, o) => {
      var c;
      {
        const u = await this.cipher.decrypt(a), h = await this.cipher.decrypt(o);
        (c = this.listener) === null || c === void 0 || c.chainUpdated(u, h);
      }
    }, this.session = e, this.cipher = new F0.WalletLinkCipher(e.secret), this.listener = n;
    const i = new wa.WalletLinkWebSocket(`${t}/rpc`, s);
    i.setConnectionStateListener(async (a) => {
      let o = !1;
      switch (a) {
        case wa.ConnectionState.DISCONNECTED:
          if (!this.destroyed) {
            const c = async () => {
              await new Promise((u) => setTimeout(u, 5e3)), this.destroyed || i.connect().catch(() => {
                c();
              });
            };
            c();
          }
          break;
        case wa.ConnectionState.CONNECTED:
          try {
            await this.authenticate(), this.sendIsLinked(), this.sendGetSessionConfig(), o = !0;
          } catch {
          }
          this.updateLastHeartbeat(), setInterval(() => {
            this.heartbeat();
          }, Eu), this.shouldFetchUnseenEventsOnConnect && this.fetchUnseenEventsAPI();
          break;
        case wa.ConnectionState.CONNECTING:
          break;
      }
      this.connected !== o && (this.connected = o);
    }), i.setIncomingDataListener((a) => {
      var o;
      switch (a.type) {
        case "Heartbeat":
          this.updateLastHeartbeat();
          return;
        case "IsLinkedOK":
        case "Linked": {
          const c = a.type === "IsLinkedOK" ? a.linked : void 0;
          this.linked = c || a.onlineGuests > 0;
          break;
        }
        case "GetSessionConfigOK":
        case "SessionConfigUpdated": {
          this.handleSessionMetadataUpdated(a.metadata);
          break;
        }
        case "Event": {
          this.handleIncomingEvent(a);
          break;
        }
      }
      a.id !== void 0 && ((o = this.requestResolutions.get(a.id)) === null || o === void 0 || o(a));
    }), this.ws = i, this.http = new H0.WalletLinkHTTP(t, e.id, e.key);
  }
  /**
   * Make a connection to the server
   */
  connect() {
    if (this.destroyed)
      throw new Error("instance is destroyed");
    this.ws.connect();
  }
  /**
   * Terminate connection, and mark as destroyed. To reconnect, create a new
   * instance of WalletSDKConnection
   */
  destroy() {
    this.destroyed = !0, this.ws.disconnect(), this.listener = void 0;
  }
  get isDestroyed() {
    return this.destroyed;
  }
  get connected() {
    return this._connected;
  }
  set connected(e) {
    var t;
    this._connected = e, e && ((t = this.onceConnected) === null || t === void 0 || t.call(this));
  }
  setOnceConnected(e) {
    return new Promise((t) => {
      this.connected ? e().then(t) : this.onceConnected = () => {
        e().then(t), this.onceConnected = void 0;
      };
    });
  }
  get linked() {
    return this._linked;
  }
  set linked(e) {
    var t, n;
    this._linked = e, e && ((t = this.onceLinked) === null || t === void 0 || t.call(this)), (n = this.listener) === null || n === void 0 || n.linkedUpdated(e);
  }
  setOnceLinked(e) {
    return new Promise((t) => {
      this.linked ? e().then(t) : this.onceLinked = () => {
        e().then(t), this.onceLinked = void 0;
      };
    });
  }
  async handleIncomingEvent(e) {
    var t;
    if (!(e.type !== "Event" || e.event !== "Web3Response")) {
      const n = await this.cipher.decrypt(e.data), s = JSON.parse(n);
      if (s.type !== "WEB3_RESPONSE")
        return;
      (t = this.listener) === null || t === void 0 || t.handleWeb3ResponseMessage(s);
    }
  }
  async checkUnseenEvents() {
    if (!this.connected) {
      this.shouldFetchUnseenEventsOnConnect = !0;
      return;
    }
    await new Promise((e) => setTimeout(e, 250));
    try {
      await this.fetchUnseenEventsAPI();
    } catch (e) {
      console.error("Unable to check for unseen events", e);
    }
  }
  async fetchUnseenEventsAPI() {
    this.shouldFetchUnseenEventsOnConnect = !1, (await this.http.fetchUnseenEvents()).forEach((t) => this.handleIncomingEvent(t));
  }
  /**
   * Set session metadata in SessionConfig object
   * @param key
   * @param value
   * @returns a Promise that completes when successful
   */
  async setSessionMetadata(e, t) {
    const n = {
      type: "SetSessionConfig",
      id: (0, Dr.IntNumber)(this.nextReqId++),
      sessionId: this.session.id,
      metadata: { [e]: t }
    };
    return this.setOnceConnected(async () => {
      const s = await this.makeRequest(n);
      if (s.type === "Fail")
        throw new Error(s.error || "failed to set session metadata");
    });
  }
  /**
   * Publish an event and emit event ID when successful
   * @param event event name
   * @param unencryptedData unencrypted event data
   * @param callWebhook whether the webhook should be invoked
   * @returns a Promise that emits event ID when successful
   */
  async publishEvent(e, t, n = !1) {
    const s = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, t), { origin: location.origin, relaySource: "coinbaseWalletExtension" in window && window.coinbaseWalletExtension ? "injected_sdk" : "sdk" }))), i = {
      type: "PublishEvent",
      id: (0, Dr.IntNumber)(this.nextReqId++),
      sessionId: this.session.id,
      event: e,
      data: s,
      callWebhook: n
    };
    return this.setOnceLinked(async () => {
      const a = await this.makeRequest(i);
      if (a.type === "Fail")
        throw new Error(a.error || "failed to publish event");
      return a.eventId;
    });
  }
  sendData(e) {
    this.ws.sendData(JSON.stringify(e));
  }
  updateLastHeartbeat() {
    this.lastHeartbeatResponse = Date.now();
  }
  heartbeat() {
    if (Date.now() - this.lastHeartbeatResponse > Eu * 2) {
      this.ws.disconnect();
      return;
    }
    try {
      this.ws.sendData("h");
    } catch {
    }
  }
  async makeRequest(e, t = G0) {
    const n = e.id;
    this.sendData(e);
    let s;
    return Promise.race([
      new Promise((i, a) => {
        s = window.setTimeout(() => {
          a(new Error(`request ${n} timed out`));
        }, t);
      }),
      new Promise((i) => {
        this.requestResolutions.set(n, (a) => {
          clearTimeout(s), i(a), this.requestResolutions.delete(n);
        });
      })
    ]);
  }
  async authenticate() {
    const e = {
      type: "HostSession",
      id: (0, Dr.IntNumber)(this.nextReqId++),
      sessionId: this.session.id,
      sessionKey: this.session.key
    }, t = await this.makeRequest(e);
    if (t.type === "Fail")
      throw new Error(t.error || "failed to authenticate");
  }
  sendIsLinked() {
    const e = {
      type: "IsLinked",
      id: (0, Dr.IntNumber)(this.nextReqId++),
      sessionId: this.session.id
    };
    this.sendData(e);
  }
  sendGetSessionConfig() {
    const e = {
      type: "GetSessionConfig",
      id: (0, Dr.IntNumber)(this.nextReqId++),
      sessionId: this.session.id
    };
    this.sendData(e);
  }
}
Po.WalletLinkConnection = W0;
var Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
Ro.WalletLinkSession = void 0;
const j0 = sf, Cu = T, vu = "session:id", Iu = "session:secret", Nu = "session:linked";
class $c {
  constructor(e, t, n, s) {
    this._storage = e, this._id = t || (0, Cu.randomBytesHex)(16), this._secret = n || (0, Cu.randomBytesHex)(32), this._key = new j0.sha256().update(`${this._id}, ${this._secret} WalletLink`).digest("hex"), this._linked = !!s;
  }
  static load(e) {
    const t = e.getItem(vu), n = e.getItem(Nu), s = e.getItem(Iu);
    return t && s ? new $c(e, t, s, n === "1") : null;
  }
  get id() {
    return this._id;
  }
  get secret() {
    return this._secret;
  }
  get key() {
    return this._key;
  }
  get linked() {
    return this._linked;
  }
  set linked(e) {
    this._linked = e, this.persistLinked();
  }
  save() {
    return this._storage.setItem(vu, this._id), this._storage.setItem(Iu, this._secret), this.persistLinked(), this;
  }
  persistLinked() {
    this._storage.setItem(Nu, this._linked ? "1" : "0");
  }
}
Ro.WalletLinkSession = $c;
var je = {};
Object.defineProperty(je, "__esModule", { value: !0 });
je.isDarkMode = je.isMobileWeb = je.getLocation = je.createQrUrl = void 0;
function V0(r, e, t, n, s, i) {
  const a = n ? "parent-id" : "id", o = new URLSearchParams({
    [a]: r,
    secret: e,
    server: t,
    v: s,
    chainId: i.toString()
  }).toString();
  return `${t}/#/link?${o}`;
}
je.createQrUrl = V0;
function K0() {
  try {
    return window.frameElement !== null;
  } catch {
    return !1;
  }
}
function Q0() {
  try {
    return K0() && window.top ? window.top.location : window.location;
  } catch {
    return window.location;
  }
}
je.getLocation = Q0;
function z0() {
  var r;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((r = window == null ? void 0 : window.navigator) === null || r === void 0 ? void 0 : r.userAgent);
}
je.isMobileWeb = z0;
function J0() {
  var r, e;
  return (e = (r = window == null ? void 0 : window.matchMedia) === null || r === void 0 ? void 0 : r.call(window, "(prefers-color-scheme: dark)").matches) !== null && e !== void 0 ? e : !1;
}
je.isDarkMode = J0;
var xo = {}, sa = {}, Xc = {};
Object.defineProperty(Xc, "__esModule", { value: !0 });
Xc.default = '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}';
var q0 = Xe && Xe.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(sa, "__esModule", { value: !0 });
sa.injectCssReset = void 0;
const Z0 = q0(Xc);
function Y0() {
  const r = document.createElement("style");
  r.type = "text/css", r.appendChild(document.createTextNode(Z0.default)), document.documentElement.appendChild(r);
}
sa.injectCssReset = Y0;
var el = {};
function Dd(r) {
  var e, t, n = "";
  if (typeof r == "string" || typeof r == "number")
    n += r;
  else if (typeof r == "object")
    if (Array.isArray(r))
      for (e = 0; e < r.length; e++)
        r[e] && (t = Dd(r[e])) && (n && (n += " "), n += t);
    else
      for (e in r)
        r[e] && (n && (n += " "), n += e);
  return n;
}
function Pu() {
  for (var r, e, t = 0, n = ""; t < arguments.length; )
    (r = arguments[t++]) && (e = Dd(r)) && (n && (n += " "), n += e);
  return n;
}
const $0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clsx: Pu,
  default: Pu
}, Symbol.toStringTag, { value: "Module" })), Bd = /* @__PURE__ */ af($0);
var tl = {};
Object.defineProperty(tl, "__esModule", { value: !0 });
tl.default = ".-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}";
(function(r) {
  var e = Xe && Xe.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(r, "__esModule", { value: !0 }), r.SnackbarInstance = r.SnackbarContainer = r.Snackbar = void 0;
  const t = e(Bd), n = Bu, s = cf, i = je, a = e(tl), o = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+", c = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=";
  class u {
    constructor() {
      this.items = /* @__PURE__ */ new Map(), this.nextItemKey = 0, this.root = null, this.darkMode = (0, i.isDarkMode)();
    }
    attach(g) {
      this.root = document.createElement("div"), this.root.className = "-cbwsdk-snackbar-root", g.appendChild(this.root), this.render();
    }
    presentItem(g) {
      const b = this.nextItemKey++;
      return this.items.set(b, g), this.render(), () => {
        this.items.delete(b), this.render();
      };
    }
    clear() {
      this.items.clear(), this.render();
    }
    render() {
      this.root && (0, n.render)((0, n.h)(
        "div",
        null,
        (0, n.h)(r.SnackbarContainer, { darkMode: this.darkMode }, Array.from(this.items.entries()).map(([g, b]) => (0, n.h)(r.SnackbarInstance, Object.assign({}, b, { key: g }))))
      ), this.root);
    }
  }
  r.Snackbar = u;
  const h = (d) => (0, n.h)(
    "div",
    { class: (0, t.default)("-cbwsdk-snackbar-container") },
    (0, n.h)("style", null, a.default),
    (0, n.h)("div", { class: "-cbwsdk-snackbar" }, d.children)
  );
  r.SnackbarContainer = h;
  const p = ({ autoExpand: d, message: g, menuItems: b }) => {
    const [A, I] = (0, s.useState)(!0), [S, _] = (0, s.useState)(d ?? !1);
    (0, s.useEffect)(() => {
      const D = [
        window.setTimeout(() => {
          I(!1);
        }, 1),
        window.setTimeout(() => {
          _(!0);
        }, 1e4)
      ];
      return () => {
        D.forEach(window.clearTimeout);
      };
    });
    const x = () => {
      _(!S);
    };
    return (0, n.h)(
      "div",
      { class: (0, t.default)("-cbwsdk-snackbar-instance", A && "-cbwsdk-snackbar-instance-hidden", S && "-cbwsdk-snackbar-instance-expanded") },
      (0, n.h)(
        "div",
        { class: "-cbwsdk-snackbar-instance-header", onClick: x },
        (0, n.h)("img", { src: o, class: "-cbwsdk-snackbar-instance-header-cblogo" }),
        " ",
        (0, n.h)("div", { class: "-cbwsdk-snackbar-instance-header-message" }, g),
        (0, n.h)(
          "div",
          { class: "-gear-container" },
          !S && (0, n.h)(
            "svg",
            { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            (0, n.h)("circle", { cx: "12", cy: "12", r: "12", fill: "#F5F7F8" })
          ),
          (0, n.h)("img", { src: c, class: "-gear-icon", title: "Expand" })
        )
      ),
      b && b.length > 0 && (0, n.h)("div", { class: "-cbwsdk-snackbar-instance-menu" }, b.map((D, K) => (0, n.h)(
        "div",
        { class: (0, t.default)("-cbwsdk-snackbar-instance-menu-item", D.isRed && "-cbwsdk-snackbar-instance-menu-item-is-red"), onClick: D.onClick, key: K },
        (0, n.h)(
          "svg",
          { width: D.svgWidth, height: D.svgHeight, viewBox: "0 0 10 11", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
          (0, n.h)("path", { "fill-rule": D.defaultFillRule, "clip-rule": D.defaultClipRule, d: D.path, fill: "#AAAAAA" })
        ),
        (0, n.h)("span", { class: (0, t.default)("-cbwsdk-snackbar-instance-menu-item-info", D.isRed && "-cbwsdk-snackbar-instance-menu-item-info-is-red") }, D.info)
      )))
    );
  };
  r.SnackbarInstance = p;
})(el);
Object.defineProperty(xo, "__esModule", { value: !0 });
xo.WalletLinkRelayUI = void 0;
const X0 = sa, ey = el;
class ty {
  constructor() {
    this.attached = !1, this.snackbar = new ey.Snackbar();
  }
  attach() {
    if (this.attached)
      throw new Error("Coinbase Wallet SDK UI is already attached");
    const e = document.documentElement, t = document.createElement("div");
    t.className = "-cbwsdk-css-reset", e.appendChild(t), this.snackbar.attach(t), this.attached = !0, (0, X0.injectCssReset)();
  }
  showConnecting(e) {
    let t;
    return e.isUnlinkedErrorState ? t = {
      autoExpand: !0,
      message: "Connection lost",
      menuItems: [
        {
          isRed: !1,
          info: "Reset connection",
          svgWidth: "10",
          svgHeight: "11",
          path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
          defaultFillRule: "evenodd",
          defaultClipRule: "evenodd",
          onClick: e.onResetConnection
        }
      ]
    } : t = {
      message: "Confirm on phone",
      menuItems: [
        {
          isRed: !0,
          info: "Cancel transaction",
          svgWidth: "11",
          svgHeight: "11",
          path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
          defaultFillRule: "inherit",
          defaultClipRule: "inherit",
          onClick: e.onCancel
        },
        {
          isRed: !1,
          info: "Reset connection",
          svgWidth: "10",
          svgHeight: "11",
          path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
          defaultFillRule: "evenodd",
          defaultClipRule: "evenodd",
          onClick: e.onResetConnection
        }
      ]
    }, this.snackbar.presentItem(t);
  }
}
xo.WalletLinkRelayUI = ty;
var To = {}, Oo = {}, nl = {};
Object.defineProperty(nl, "__esModule", { value: !0 });
nl.default = ".-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s;background-color:rgba(10,11,13,.5)}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box{display:block;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:8px;background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box p{display:block;font-weight:400;font-size:14px;line-height:20px;padding-bottom:12px;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box button{appearance:none;border:none;background:none;color:#0052ff;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark{background-color:#0a0b0d;color:#fff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark button{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light{background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light button{color:#0052ff}";
var Ud = Xe && Xe.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.RedirectDialog = void 0;
const ny = Ud(Bd), yt = Bu, ry = sa, sy = el, iy = je, ay = Ud(nl);
class oy {
  constructor() {
    this.root = null, this.darkMode = (0, iy.isDarkMode)();
  }
  attach() {
    const e = document.documentElement;
    this.root = document.createElement("div"), this.root.className = "-cbwsdk-css-reset", e.appendChild(this.root), (0, ry.injectCssReset)();
  }
  present(e) {
    this.render(e);
  }
  clear() {
    this.render(null);
  }
  render(e) {
    this.root && ((0, yt.render)(null, this.root), e && (0, yt.render)((0, yt.h)(cy, Object.assign({}, e, { onDismiss: () => {
      this.clear();
    }, darkMode: this.darkMode })), this.root));
  }
}
Oo.RedirectDialog = oy;
const cy = ({ title: r, buttonText: e, darkMode: t, onButtonClick: n, onDismiss: s }) => {
  const i = t ? "dark" : "light";
  return (0, yt.h)(
    sy.SnackbarContainer,
    { darkMode: t },
    (0, yt.h)(
      "div",
      { class: "-cbwsdk-redirect-dialog" },
      (0, yt.h)("style", null, ay.default),
      (0, yt.h)("div", { class: "-cbwsdk-redirect-dialog-backdrop", onClick: s }),
      (0, yt.h)(
        "div",
        { class: (0, ny.default)("-cbwsdk-redirect-dialog-box", i) },
        (0, yt.h)("p", null, r),
        (0, yt.h)("button", { onClick: n }, e)
      )
    )
  );
};
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.CBW_MOBILE_DEEPLINK_URL = Ot.WALLETLINK_URL = Ot.CB_KEYS_URL = void 0;
Ot.CB_KEYS_URL = "https://keys.coinbase.com/connect";
Ot.WALLETLINK_URL = "https://www.walletlink.org";
Ot.CBW_MOBILE_DEEPLINK_URL = "https://go.cb-w.com/walletlink";
Object.defineProperty(To, "__esModule", { value: !0 });
To.WLMobileRelayUI = void 0;
const ly = Oo, uy = je, hy = Ot;
class dy {
  constructor() {
    this.attached = !1, this.redirectDialog = new ly.RedirectDialog();
  }
  attach() {
    if (this.attached)
      throw new Error("Coinbase Wallet SDK UI is already attached");
    this.redirectDialog.attach(), this.attached = !0;
  }
  redirectToCoinbaseWallet(e) {
    const t = new URL(hy.CBW_MOBILE_DEEPLINK_URL);
    t.searchParams.append("redirect_url", (0, uy.getLocation)().href), e && t.searchParams.append("wl_url", e);
    const n = document.createElement("a");
    n.target = "cbw-opener", n.href = t.href, n.rel = "noreferrer noopener", n.click();
  }
  openCoinbaseWalletDeeplink(e) {
    this.redirectDialog.present({
      title: "Redirecting to Coinbase Wallet...",
      buttonText: "Open",
      onButtonClick: () => {
        this.redirectToCoinbaseWallet(e);
      }
    }), setTimeout(() => {
      this.redirectToCoinbaseWallet(e);
    }, 99);
  }
  showConnecting(e) {
    return () => {
      this.redirectDialog.clear();
    };
  }
}
To.WLMobileRelayUI = dy;
Object.defineProperty(No, "__esModule", { value: !0 });
No.WalletLinkRelay = void 0;
const fy = Po, py = Tt, gy = ra, tc = Ro, Br = ei, my = je, yy = xo, Su = To, wy = Lt, X = T, by = Mt;
class Wt {
  constructor(e) {
    this.accountsCallback = null, this.chainCallbackParams = { chainId: "", jsonRpcUrl: "" }, this.chainCallback = null, this.dappDefaultChain = 1, this.isMobileWeb = (0, my.isMobileWeb)(), this.appName = "", this.appLogoUrl = null, this.linkedUpdated = (i) => {
      this.isLinked = i;
      const a = this.storage.getItem(py.LOCAL_STORAGE_ADDRESSES_KEY);
      if (i && (this._session.linked = i), this.isUnlinkedErrorState = !1, a) {
        const o = a.split(" "), c = this.storage.getItem("IsStandaloneSigning") === "true";
        o[0] !== "" && !i && this._session.linked && !c && (this.isUnlinkedErrorState = !0);
      }
    }, this.metadataUpdated = (i, a) => {
      this.storage.setItem(i, a);
    }, this.chainUpdated = (i, a) => {
      this.chainCallbackParams.chainId === i && this.chainCallbackParams.jsonRpcUrl === a || (this.chainCallbackParams = {
        chainId: i,
        jsonRpcUrl: a
      }, this.chainCallback && this.chainCallback(i, a));
    }, this.accountUpdated = (i) => {
      this.accountsCallback && this.accountsCallback([i]), Wt.accountRequestCallbackIds.size > 0 && (Array.from(Wt.accountRequestCallbackIds.values()).forEach((a) => {
        const o = {
          type: "WEB3_RESPONSE",
          id: a,
          response: {
            method: "requestEthereumAccounts",
            result: [i]
          }
        };
        this.invokeCallback(Object.assign(Object.assign({}, o), { id: a }));
      }), Wt.accountRequestCallbackIds.clear());
    }, this.resetAndReload = this.resetAndReload.bind(this), this.linkAPIUrl = e.linkAPIUrl, this.storage = e.storage;
    const { session: t, ui: n, connection: s } = this.subscribe();
    this._session = t, this.connection = s, this.relayEventManager = new gy.RelayEventManager(), this.ui = n;
  }
  subscribe() {
    const e = tc.WalletLinkSession.load(this.storage) || new tc.WalletLinkSession(this.storage).save(), { linkAPIUrl: t } = this, n = new fy.WalletLinkConnection({
      session: e,
      linkAPIUrl: t,
      listener: this
    }), s = this.isMobileWeb ? new Su.WLMobileRelayUI() : new yy.WalletLinkRelayUI();
    return n.connect(), { session: e, ui: s, connection: n };
  }
  attachUI() {
    this.ui.attach();
  }
  resetAndReload() {
    Promise.race([
      this.connection.setSessionMetadata("__destroyed", "1"),
      new Promise((e) => setTimeout(() => e(null), 1e3))
    ]).then(() => {
      this.connection.destroy();
      const e = tc.WalletLinkSession.load(this.storage);
      (e == null ? void 0 : e.id) === this._session.id && by.ScopedLocalStorage.clearAll(), document.location.reload();
    }).catch((e) => {
    });
  }
  setAppInfo(e, t) {
    this.appName = e, this.appLogoUrl = t;
  }
  getStorageItem(e) {
    return this.storage.getItem(e);
  }
  setStorageItem(e, t) {
    this.storage.setItem(e, t);
  }
  signEthereumMessage(e, t, n, s) {
    return this.sendRequest({
      method: "signEthereumMessage",
      params: {
        message: (0, X.hexStringFromBuffer)(e, !0),
        address: t,
        addPrefix: n,
        typedDataJson: s || null
      }
    });
  }
  ethereumAddressFromSignedMessage(e, t, n) {
    return this.sendRequest({
      method: "ethereumAddressFromSignedMessage",
      params: {
        message: (0, X.hexStringFromBuffer)(e, !0),
        signature: (0, X.hexStringFromBuffer)(t, !0),
        addPrefix: n
      }
    });
  }
  signEthereumTransaction(e) {
    return this.sendRequest({
      method: "signEthereumTransaction",
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, X.bigIntStringFromBigInt)(e.weiValue),
        data: (0, X.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei ? (0, X.bigIntStringFromBigInt)(e.gasPriceInWei) : null,
        maxFeePerGas: e.gasPriceInWei ? (0, X.bigIntStringFromBigInt)(e.gasPriceInWei) : null,
        maxPriorityFeePerGas: e.gasPriceInWei ? (0, X.bigIntStringFromBigInt)(e.gasPriceInWei) : null,
        gasLimit: e.gasLimit ? (0, X.bigIntStringFromBigInt)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !1
      }
    });
  }
  signAndSubmitEthereumTransaction(e) {
    return this.sendRequest({
      method: "signEthereumTransaction",
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: (0, X.bigIntStringFromBigInt)(e.weiValue),
        data: (0, X.hexStringFromBuffer)(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei ? (0, X.bigIntStringFromBigInt)(e.gasPriceInWei) : null,
        maxFeePerGas: e.maxFeePerGas ? (0, X.bigIntStringFromBigInt)(e.maxFeePerGas) : null,
        maxPriorityFeePerGas: e.maxPriorityFeePerGas ? (0, X.bigIntStringFromBigInt)(e.maxPriorityFeePerGas) : null,
        gasLimit: e.gasLimit ? (0, X.bigIntStringFromBigInt)(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !0
      }
    });
  }
  submitEthereumTransaction(e, t) {
    return this.sendRequest({
      method: "submitEthereumTransaction",
      params: {
        signedTransaction: (0, X.hexStringFromBuffer)(e, !0),
        chainId: t
      }
    });
  }
  scanQRCode(e) {
    return this.sendRequest({
      method: "scanQRCode",
      params: {
        regExp: e
      }
    });
  }
  getWalletLinkSession() {
    return this._session;
  }
  genericRequest(e, t) {
    return this.sendRequest({
      method: "generic",
      params: {
        action: t,
        data: e
      }
    });
  }
  sendGenericMessage(e) {
    return this.sendRequest(e);
  }
  sendRequest(e) {
    let t = null;
    const n = (0, X.randomBytesHex)(8), s = (i) => {
      this.publishWeb3RequestCanceledEvent(n), this.handleErrorResponse(n, e.method, i), t == null || t();
    };
    return new Promise((i, a) => {
      t = this.ui.showConnecting({
        isUnlinkedErrorState: this.isUnlinkedErrorState,
        onCancel: s,
        onResetConnection: this.resetAndReload
        // eslint-disable-line @typescript-eslint/unbound-method
      }), this.relayEventManager.callbacks.set(n, (o) => {
        if (t == null || t(), (0, Br.isErrorResponse)(o))
          return a(new Error(o.errorMessage));
        i(o);
      }), this.publishWeb3RequestEvent(n, e);
    });
  }
  setAccountsCallback(e) {
    this.accountsCallback = e;
  }
  setChainCallback(e) {
    this.chainCallback = e;
  }
  setDappDefaultChainCallback(e) {
    this.dappDefaultChain = e;
  }
  publishWeb3RequestEvent(e, t) {
    const n = { type: "WEB3_REQUEST", id: e, request: t };
    this.publishEvent("Web3Request", n, !0).then((s) => {
    }).catch((s) => {
      this.handleWeb3ResponseMessage({
        type: "WEB3_RESPONSE",
        id: n.id,
        response: {
          method: t.method,
          errorMessage: s.message
        }
      });
    }), this.isMobileWeb && this.openCoinbaseWalletDeeplink(t.method);
  }
  // copied from MobileRelay
  openCoinbaseWalletDeeplink(e) {
    if (this.ui instanceof Su.WLMobileRelayUI)
      switch (e) {
        case "requestEthereumAccounts":
        case "switchEthereumChain":
          return;
        default:
          window.addEventListener("blur", () => {
            window.addEventListener("focus", () => {
              this.connection.checkUnseenEvents();
            }, { once: !0 });
          }, { once: !0 }), this.ui.openCoinbaseWalletDeeplink();
          break;
      }
  }
  publishWeb3RequestCanceledEvent(e) {
    const t = {
      type: "WEB3_REQUEST_CANCELED",
      id: e
    };
    this.publishEvent("Web3RequestCanceled", t, !1).then();
  }
  publishEvent(e, t, n) {
    return this.connection.publishEvent(e, t, n);
  }
  handleWeb3ResponseMessage(e) {
    const { response: t } = e;
    if (t.method === "requestEthereumAccounts") {
      Wt.accountRequestCallbackIds.forEach((n) => this.invokeCallback(Object.assign(Object.assign({}, e), { id: n }))), Wt.accountRequestCallbackIds.clear();
      return;
    }
    this.invokeCallback(e);
  }
  handleErrorResponse(e, t, n) {
    var s;
    const i = (s = n == null ? void 0 : n.message) !== null && s !== void 0 ? s : "Unspecified error message.";
    this.handleWeb3ResponseMessage({
      type: "WEB3_RESPONSE",
      id: e,
      response: {
        method: t,
        errorMessage: i
      }
    });
  }
  invokeCallback(e) {
    const t = this.relayEventManager.callbacks.get(e.id);
    t && (t(e.response), this.relayEventManager.callbacks.delete(e.id));
  }
  requestEthereumAccounts() {
    const e = {
      method: "requestEthereumAccounts",
      params: {
        appName: this.appName,
        appLogoUrl: this.appLogoUrl || null
      }
    }, t = (0, X.randomBytesHex)(8);
    return new Promise((n, s) => {
      this.relayEventManager.callbacks.set(t, (i) => {
        if ((0, Br.isErrorResponse)(i))
          return s(new Error(i.errorMessage));
        n(i);
      }), Wt.accountRequestCallbackIds.add(t), this.publishWeb3RequestEvent(t, e);
    });
  }
  watchAsset(e, t, n, s, i, a) {
    const o = {
      method: "watchAsset",
      params: {
        type: e,
        options: {
          address: t,
          symbol: n,
          decimals: s,
          image: i
        },
        chainId: a
      }
    };
    let c = null;
    const u = (0, X.randomBytesHex)(8), h = (p) => {
      this.publishWeb3RequestCanceledEvent(u), this.handleErrorResponse(u, o.method, p), c == null || c();
    };
    return c = this.ui.showConnecting({
      isUnlinkedErrorState: this.isUnlinkedErrorState,
      onCancel: h,
      onResetConnection: this.resetAndReload
      // eslint-disable-line @typescript-eslint/unbound-method
    }), new Promise((p, d) => {
      this.relayEventManager.callbacks.set(u, (g) => {
        if (c == null || c(), (0, Br.isErrorResponse)(g))
          return d(new Error(g.errorMessage));
        p(g);
      }), this.publishWeb3RequestEvent(u, o);
    });
  }
  addEthereumChain(e, t, n, s, i, a) {
    const o = {
      method: "addEthereumChain",
      params: {
        chainId: e,
        rpcUrls: t,
        blockExplorerUrls: s,
        chainName: i,
        iconUrls: n,
        nativeCurrency: a
      }
    };
    let c = null;
    const u = (0, X.randomBytesHex)(8), h = (p) => {
      this.publishWeb3RequestCanceledEvent(u), this.handleErrorResponse(u, o.method, p), c == null || c();
    };
    return c = this.ui.showConnecting({
      isUnlinkedErrorState: this.isUnlinkedErrorState,
      onCancel: h,
      onResetConnection: this.resetAndReload
      // eslint-disable-line @typescript-eslint/unbound-method
    }), new Promise((p, d) => {
      this.relayEventManager.callbacks.set(u, (g) => {
        if (c == null || c(), (0, Br.isErrorResponse)(g))
          return d(new Error(g.errorMessage));
        p(g);
      }), this.publishWeb3RequestEvent(u, o);
    });
  }
  switchEthereumChain(e, t) {
    const n = {
      method: "switchEthereumChain",
      params: Object.assign({ chainId: e }, { address: t })
    }, s = (0, X.randomBytesHex)(8);
    return new Promise((i, a) => {
      this.relayEventManager.callbacks.set(s, (o) => {
        if ((0, Br.isErrorResponse)(o) && o.errorCode)
          return a(wy.standardErrors.provider.custom({
            code: o.errorCode,
            message: "Unrecognized chain ID. Try adding the chain using addEthereumChain first."
          }));
        if ((0, Br.isErrorResponse)(o))
          return a(new Error(o.errorMessage));
        i(o);
      }), this.publishWeb3RequestEvent(s, n);
    });
  }
}
No.WalletLinkRelay = Wt;
Wt.accountRequestCallbackIds = /* @__PURE__ */ new Set();
var Ay = Xe && Xe.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(vo, "__esModule", { value: !0 });
vo.WalletLinkSigner = void 0;
const nc = Ay(O0), ku = Tt, Ey = ra, Dt = ei, Cy = No, Ru = Ot, ae = Lt, B = T, vy = Mt, rc = "DefaultChainId", xu = "DefaultJsonRpcUrl";
class Iy {
  constructor(e) {
    var t, n;
    this._relay = null, this._addresses = [], this.hasMadeFirstChainChangedEmission = !1;
    const { appName: s, appLogoUrl: i } = e.metadata;
    this._appName = s, this._appLogoUrl = i, this._storage = new vy.ScopedLocalStorage("walletlink", Ru.WALLETLINK_URL), this.updateListener = e.updateListener, this._relayEventManager = new Ey.RelayEventManager(), this._jsonRpcUrlFromOpts = "";
    const a = this._storage.getItem(ku.LOCAL_STORAGE_ADDRESSES_KEY);
    if (a) {
      const c = a.split(" ");
      c[0] !== "" && (this._addresses = c.map((u) => (0, B.ensureAddressString)(u)), (t = this.updateListener) === null || t === void 0 || t.onAccountsUpdate({
        accounts: this._addresses,
        source: "storage"
      }));
    }
    this._storage.getItem(rc) && ((n = this.updateListener) === null || n === void 0 || n.onChainUpdate({
      chain: {
        id: this.getChainId(),
        rpcUrl: this.jsonRpcUrl
      },
      source: "storage"
    }), this.hasMadeFirstChainChangedEmission = !0), this.initializeRelay();
  }
  getSession() {
    const e = this.initializeRelay(), { id: t, secret: n } = e.getWalletLinkSession();
    return { id: t, secret: n };
  }
  async handshake() {
    return await this.request({ method: "eth_requestAccounts" });
  }
  get selectedAddress() {
    return this._addresses[0] || void 0;
  }
  get jsonRpcUrl() {
    var e;
    return (e = this._storage.getItem(xu)) !== null && e !== void 0 ? e : this._jsonRpcUrlFromOpts;
  }
  set jsonRpcUrl(e) {
    this._storage.setItem(xu, e);
  }
  updateProviderInfo(e, t) {
    var n;
    this.jsonRpcUrl = e;
    const s = this.getChainId();
    this._storage.setItem(rc, t.toString(10)), ((0, B.ensureIntNumber)(t) !== s || !this.hasMadeFirstChainChangedEmission) && ((n = this.updateListener) === null || n === void 0 || n.onChainUpdate({
      chain: { id: t, rpcUrl: e },
      source: "wallet"
    }), this.hasMadeFirstChainChangedEmission = !0);
  }
  async watchAsset(e, t, n, s, i, a) {
    const c = await this.initializeRelay().watchAsset(e, t, n, s, i, a == null ? void 0 : a.toString());
    return (0, Dt.isErrorResponse)(c) ? !1 : !!c.result;
  }
  async addEthereumChain(e, t, n, s, i, a) {
    var o, c;
    if ((0, B.ensureIntNumber)(e) === this.getChainId())
      return !1;
    const u = this.initializeRelay();
    this._isAuthorized() || await u.requestEthereumAccounts();
    const h = await u.addEthereumChain(e.toString(), t, i, n, s, a);
    return (0, Dt.isErrorResponse)(h) ? !1 : (((o = h.result) === null || o === void 0 ? void 0 : o.isApproved) === !0 && this.updateProviderInfo(t[0], e), ((c = h.result) === null || c === void 0 ? void 0 : c.isApproved) === !0);
  }
  async switchEthereumChain(e) {
    const n = await this.initializeRelay().switchEthereumChain(e.toString(10), this.selectedAddress || void 0);
    if ((0, Dt.isErrorResponse)(n)) {
      if (!n.errorCode)
        return;
      throw n.errorCode === ae.standardErrorCodes.provider.unsupportedChain ? ae.standardErrors.provider.unsupportedChain() : ae.standardErrors.provider.custom({
        message: n.errorMessage,
        code: n.errorCode
      });
    }
    const s = n.result;
    s.isApproved && s.rpcUrl.length > 0 && this.updateProviderInfo(s.rpcUrl, e);
  }
  async disconnect() {
    this._relay && this._relay.resetAndReload(), this._storage.clear();
  }
  async request(e) {
    try {
      return this._request(e).catch((t) => {
        throw t;
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }
  async _request(e) {
    if (!e || typeof e != "object" || Array.isArray(e))
      throw ae.standardErrors.rpc.invalidRequest({
        message: "Expected a single, non-array, object argument.",
        data: e
      });
    const { method: t, params: n } = e;
    if (typeof t != "string" || t.length === 0)
      throw ae.standardErrors.rpc.invalidRequest({
        message: "'args.method' must be a non-empty string.",
        data: e
      });
    if (n !== void 0 && !Array.isArray(n) && (typeof n != "object" || n === null))
      throw ae.standardErrors.rpc.invalidRequest({
        message: "'args.params' must be an object or array if provided.",
        data: e
      });
    const s = n === void 0 ? [] : n, i = this._relayEventManager.makeRequestId();
    return (await this._sendRequestAsync({
      method: t,
      params: s,
      jsonrpc: "2.0",
      id: i
    })).result;
  }
  _setAddresses(e, t) {
    var n;
    if (!Array.isArray(e))
      throw new Error("addresses is not an array");
    const s = e.map((i) => (0, B.ensureAddressString)(i));
    JSON.stringify(s) !== JSON.stringify(this._addresses) && (this._addresses = s, (n = this.updateListener) === null || n === void 0 || n.onAccountsUpdate({
      accounts: s,
      source: "wallet"
    }), this._storage.setItem(ku.LOCAL_STORAGE_ADDRESSES_KEY, s.join(" ")));
  }
  _sendRequestAsync(e) {
    return new Promise((t, n) => {
      try {
        const s = this._handleSynchronousMethods(e);
        if (s !== void 0)
          return t({
            jsonrpc: "2.0",
            id: e.id,
            result: s
          });
      } catch (s) {
        return n(s);
      }
      this._handleAsynchronousMethods(e).then((s) => s && t(Object.assign(Object.assign({}, s), { id: e.id }))).catch((s) => n(s));
    });
  }
  _handleSynchronousMethods(e) {
    const { method: t } = e;
    switch (t) {
      case "eth_accounts":
        return this._eth_accounts();
      case "eth_coinbase":
        return this._eth_coinbase();
      case "net_version":
        return this._net_version();
      case "eth_chainId":
        return this._eth_chainId();
      default:
        return;
    }
  }
  async _handleAsynchronousMethods(e) {
    const { method: t } = e, n = e.params || [];
    switch (t) {
      case "eth_requestAccounts":
        return this._eth_requestAccounts();
      case "eth_sign":
        return this._eth_sign(n);
      case "eth_ecRecover":
        return this._eth_ecRecover(n);
      case "personal_sign":
        return this._personal_sign(n);
      case "personal_ecRecover":
        return this._personal_ecRecover(n);
      case "eth_signTransaction":
        return this._eth_signTransaction(n);
      case "eth_sendRawTransaction":
        return this._eth_sendRawTransaction(n);
      case "eth_sendTransaction":
        return this._eth_sendTransaction(n);
      case "eth_signTypedData_v1":
        return this._eth_signTypedData_v1(n);
      case "eth_signTypedData_v2":
        return this._throwUnsupportedMethodError();
      case "eth_signTypedData_v3":
        return this._eth_signTypedData_v3(n);
      case "eth_signTypedData_v4":
      case "eth_signTypedData":
        return this._eth_signTypedData_v4(n);
      case "wallet_addEthereumChain":
        return this._wallet_addEthereumChain(n);
      case "wallet_switchEthereumChain":
        return this._wallet_switchEthereumChain(n);
      case "wallet_watchAsset":
        return this._wallet_watchAsset(n);
      default:
        return this._throwUnsupportedMethodError();
    }
  }
  _isKnownAddress(e) {
    try {
      const t = (0, B.ensureAddressString)(e);
      return this._addresses.map((s) => (0, B.ensureAddressString)(s)).includes(t);
    } catch {
    }
    return !1;
  }
  _ensureKnownAddress(e) {
    if (!this._isKnownAddress(e))
      throw new Error("Unknown Ethereum address");
  }
  _prepareTransactionParams(e) {
    const t = e.from ? (0, B.ensureAddressString)(e.from) : this.selectedAddress;
    if (!t)
      throw new Error("Ethereum address is unavailable");
    this._ensureKnownAddress(t);
    const n = e.to ? (0, B.ensureAddressString)(e.to) : null, s = e.value != null ? (0, B.ensureBigInt)(e.value) : BigInt(0), i = e.data ? (0, B.ensureBuffer)(e.data) : z.alloc(0), a = e.nonce != null ? (0, B.ensureIntNumber)(e.nonce) : null, o = e.gasPrice != null ? (0, B.ensureBigInt)(e.gasPrice) : null, c = e.maxFeePerGas != null ? (0, B.ensureBigInt)(e.maxFeePerGas) : null, u = e.maxPriorityFeePerGas != null ? (0, B.ensureBigInt)(e.maxPriorityFeePerGas) : null, h = e.gas != null ? (0, B.ensureBigInt)(e.gas) : null, p = e.chainId ? (0, B.ensureIntNumber)(e.chainId) : this.getChainId();
    return {
      fromAddress: t,
      toAddress: n,
      weiValue: s,
      data: i,
      nonce: a,
      gasPriceInWei: o,
      maxFeePerGas: c,
      maxPriorityFeePerGas: u,
      gasLimit: h,
      chainId: p
    };
  }
  _isAuthorized() {
    return this._addresses.length > 0;
  }
  _requireAuthorization() {
    if (!this._isAuthorized())
      throw ae.standardErrors.provider.unauthorized({});
  }
  _throwUnsupportedMethodError() {
    throw ae.standardErrors.provider.unsupportedMethod({});
  }
  async _signEthereumMessage(e, t, n, s) {
    this._ensureKnownAddress(t);
    try {
      const a = await this.initializeRelay().signEthereumMessage(e, t, n, s);
      if ((0, Dt.isErrorResponse)(a))
        throw new Error(a.errorMessage);
      return { jsonrpc: "2.0", id: 0, result: a.result };
    } catch (i) {
      throw typeof i.message == "string" && i.message.match(/(denied|rejected)/i) ? ae.standardErrors.provider.userRejectedRequest("User denied message signature") : i;
    }
  }
  async _ethereumAddressFromSignedMessage(e, t, n) {
    const i = await this.initializeRelay().ethereumAddressFromSignedMessage(e, t, n);
    if ((0, Dt.isErrorResponse)(i))
      throw new Error(i.errorMessage);
    return { jsonrpc: "2.0", id: 0, result: i.result };
  }
  _eth_accounts() {
    return [...this._addresses];
  }
  _eth_coinbase() {
    return this.selectedAddress || null;
  }
  _net_version() {
    return this.getChainId().toString(10);
  }
  _eth_chainId() {
    return (0, B.hexStringFromIntNumber)(this.getChainId());
  }
  getChainId() {
    const e = this._storage.getItem(rc);
    if (!e)
      return (0, B.ensureIntNumber)(1);
    const t = parseInt(e, 10);
    return (0, B.ensureIntNumber)(t);
  }
  async _eth_requestAccounts() {
    if (this._isAuthorized())
      return Promise.resolve({
        jsonrpc: "2.0",
        id: 0,
        result: this._addresses
      });
    let e;
    try {
      if (e = await this.initializeRelay().requestEthereumAccounts(), (0, Dt.isErrorResponse)(e))
        throw new Error(e.errorMessage);
    } catch (t) {
      throw typeof t.message == "string" && t.message.match(/(denied|rejected)/i) ? ae.standardErrors.provider.userRejectedRequest("User denied account authorization") : t;
    }
    if (!e.result)
      throw new Error("accounts received is empty");
    return this._setAddresses(e.result), { jsonrpc: "2.0", id: 0, result: this._addresses };
  }
  _eth_sign(e) {
    this._requireAuthorization();
    const t = (0, B.ensureAddressString)(e[0]), n = (0, B.ensureBuffer)(e[1]);
    return this._signEthereumMessage(n, t, !1);
  }
  _eth_ecRecover(e) {
    const t = (0, B.ensureBuffer)(e[0]), n = (0, B.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(t, n, !1);
  }
  _personal_sign(e) {
    this._requireAuthorization();
    const t = (0, B.ensureBuffer)(e[0]), n = (0, B.ensureAddressString)(e[1]);
    return this._signEthereumMessage(t, n, !0);
  }
  _personal_ecRecover(e) {
    const t = (0, B.ensureBuffer)(e[0]), n = (0, B.ensureBuffer)(e[1]);
    return this._ethereumAddressFromSignedMessage(t, n, !0);
  }
  async _eth_signTransaction(e) {
    this._requireAuthorization();
    const t = this._prepareTransactionParams(e[0] || {});
    try {
      const s = await this.initializeRelay().signEthereumTransaction(t);
      if ((0, Dt.isErrorResponse)(s))
        throw new Error(s.errorMessage);
      return { jsonrpc: "2.0", id: 0, result: s.result };
    } catch (n) {
      throw typeof n.message == "string" && n.message.match(/(denied|rejected)/i) ? ae.standardErrors.provider.userRejectedRequest("User denied transaction signature") : n;
    }
  }
  async _eth_sendRawTransaction(e) {
    const t = (0, B.ensureBuffer)(e[0]), s = await this.initializeRelay().submitEthereumTransaction(t, this.getChainId());
    if ((0, Dt.isErrorResponse)(s))
      throw new Error(s.errorMessage);
    return { jsonrpc: "2.0", id: 0, result: s.result };
  }
  async _eth_sendTransaction(e) {
    this._requireAuthorization();
    const t = this._prepareTransactionParams(e[0] || {});
    try {
      const s = await this.initializeRelay().signAndSubmitEthereumTransaction(t);
      if ((0, Dt.isErrorResponse)(s))
        throw new Error(s.errorMessage);
      return { jsonrpc: "2.0", id: 0, result: s.result };
    } catch (n) {
      throw typeof n.message == "string" && n.message.match(/(denied|rejected)/i) ? ae.standardErrors.provider.userRejectedRequest("User denied transaction signature") : n;
    }
  }
  async _eth_signTypedData_v1(e) {
    this._requireAuthorization();
    const t = (0, B.ensureParsedJSONObject)(e[0]), n = (0, B.ensureAddressString)(e[1]);
    this._ensureKnownAddress(n);
    const s = nc.default.hashForSignTypedDataLegacy({ data: t }), i = JSON.stringify(t, null, 2);
    return this._signEthereumMessage(s, n, !1, i);
  }
  async _eth_signTypedData_v3(e) {
    this._requireAuthorization();
    const t = (0, B.ensureAddressString)(e[0]), n = (0, B.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(t);
    const s = nc.default.hashForSignTypedData_v3({ data: n }), i = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(s, t, !1, i);
  }
  async _eth_signTypedData_v4(e) {
    this._requireAuthorization();
    const t = (0, B.ensureAddressString)(e[0]), n = (0, B.ensureParsedJSONObject)(e[1]);
    this._ensureKnownAddress(t);
    const s = nc.default.hashForSignTypedData_v4({ data: n }), i = JSON.stringify(n, null, 2);
    return this._signEthereumMessage(s, t, !1, i);
  }
  async _wallet_addEthereumChain(e) {
    var t, n, s, i;
    const a = e[0];
    if (((t = a.rpcUrls) === null || t === void 0 ? void 0 : t.length) === 0)
      return {
        jsonrpc: "2.0",
        id: 0,
        error: { code: 2, message: "please pass in at least 1 rpcUrl" }
      };
    if (!a.chainName || a.chainName.trim() === "")
      throw ae.standardErrors.rpc.invalidParams("chainName is a required field");
    if (!a.nativeCurrency)
      throw ae.standardErrors.rpc.invalidParams("nativeCurrency is a required field");
    const o = parseInt(a.chainId, 16);
    return await this.addEthereumChain(o, (n = a.rpcUrls) !== null && n !== void 0 ? n : [], (s = a.blockExplorerUrls) !== null && s !== void 0 ? s : [], a.chainName, (i = a.iconUrls) !== null && i !== void 0 ? i : [], a.nativeCurrency) ? { jsonrpc: "2.0", id: 0, result: null } : {
      jsonrpc: "2.0",
      id: 0,
      error: { code: 2, message: "unable to add ethereum chain" }
    };
  }
  async _wallet_switchEthereumChain(e) {
    const t = e[0];
    return await this.switchEthereumChain(parseInt(t.chainId, 16)), { jsonrpc: "2.0", id: 0, result: null };
  }
  async _wallet_watchAsset(e) {
    const t = Array.isArray(e) ? e[0] : e;
    if (!t.type)
      throw ae.standardErrors.rpc.invalidParams("Type is required");
    if ((t == null ? void 0 : t.type) !== "ERC20")
      throw ae.standardErrors.rpc.invalidParams(`Asset of type '${t.type}' is not supported`);
    if (!(t != null && t.options))
      throw ae.standardErrors.rpc.invalidParams("Options are required");
    if (!(t != null && t.options.address))
      throw ae.standardErrors.rpc.invalidParams("Address is required");
    const n = this.getChainId(), { address: s, symbol: i, image: a, decimals: o } = t.options;
    return { jsonrpc: "2.0", id: 0, result: await this.watchAsset(t.type, s, i, o, a, n) };
  }
  initializeRelay() {
    if (!this._relay) {
      const e = new Cy.WalletLinkRelay({
        linkAPIUrl: Ru.WALLETLINK_URL,
        storage: this._storage
      });
      e.setAppInfo(this._appName, this._appLogoUrl), e.attachUI(), e.setAccountsCallback((t, n) => this._setAddresses(t, n)), e.setChainCallback((t, n) => {
        this.updateProviderInfo(n, parseInt(t, 10));
      }), this._relay = e;
    }
    return this._relay;
  }
}
vo.WalletLinkSigner = Iy;
var Ye = {};
Object.defineProperty(Ye, "__esModule", { value: !0 });
Ye.checkErrorForInvalidRequestArgs = Ye.getCoinbaseInjectedProvider = Ye.getCoinbaseInjectedSigner = Ye.fetchRPCRequest = void 0;
const Ny = Sr, Ta = Lt;
async function Py(r, e) {
  if (!e.rpcUrl)
    throw Ta.standardErrors.rpc.internal("No RPC URL set for chain");
  const t = Object.assign(Object.assign({}, r), { jsonrpc: "2.0", id: crypto.randomUUID() });
  return (await (await window.fetch(e.rpcUrl, {
    method: "POST",
    body: JSON.stringify(t),
    mode: "cors",
    headers: { "Content-Type": "application/json", "X-Cbw-Sdk-Version": Ny.LIB_VERSION }
  })).json()).result;
}
Ye.fetchRPCRequest = Py;
function Fd() {
  return globalThis.coinbaseWalletSigner;
}
Ye.getCoinbaseInjectedSigner = Fd;
function Sy({ metadata: r, preference: e }) {
  var t, n, s;
  const i = globalThis;
  if (e.options !== "smartWalletOnly") {
    if (Fd())
      return;
    const c = i.coinbaseWalletExtension;
    if (c) {
      const { appName: u, appLogoUrl: h, appChainIds: p } = r;
      return (t = c.setAppInfo) === null || t === void 0 || t.call(c, u, h, p), c;
    }
  }
  const a = (n = i.ethereum) !== null && n !== void 0 ? n : (s = i.top) === null || s === void 0 ? void 0 : s.ethereum;
  if (a != null && a.isCoinbaseBrowser)
    return a;
}
Ye.getCoinbaseInjectedProvider = Sy;
function ky(r) {
  if (!r || typeof r != "object" || Array.isArray(r))
    return Ta.standardErrors.rpc.invalidParams({
      message: "Expected a single, non-array, object argument.",
      data: r
    });
  const { method: e, params: t } = r;
  if (typeof e != "string" || e.length === 0)
    return Ta.standardErrors.rpc.invalidParams({
      message: "'args.method' must be a non-empty string.",
      data: r
    });
  if (t !== void 0 && !Array.isArray(t) && (typeof t != "object" || t === null))
    return Ta.standardErrors.rpc.invalidParams({
      message: "'args.params' must be an object or array if provided.",
      data: r
    });
}
Ye.checkErrorForInvalidRequestArgs = ky;
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.createSigner = Rt.fetchSignerType = Rt.storeSignerType = Rt.loadSignerType = void 0;
const Ry = Ao, Hd = vo, xy = Lt, Ty = Ye, Oy = Mt, Gd = "SignerType", Wd = new Oy.ScopedLocalStorage("CBWSDK", "SignerConfigurator");
function _y() {
  return Wd.getItem(Gd);
}
Rt.loadSignerType = _y;
function Ly(r) {
  Wd.setItem(Gd, r);
}
Rt.storeSignerType = Ly;
async function My(r) {
  const { communicator: e, metadata: t } = r;
  By(e, t).catch(() => {
  });
  const n = {
    id: crypto.randomUUID(),
    event: "selectSignerType",
    data: r.preference
  }, { data: s } = await e.postRequestAndWaitForResponse(n);
  return s;
}
Rt.fetchSignerType = My;
function Dy(r) {
  const { signerType: e, metadata: t, communicator: n, updateListener: s } = r;
  switch (e) {
    case "scw":
      return new Ry.SCWSigner({
        metadata: t,
        updateListener: s,
        communicator: n
      });
    case "walletlink":
      return new Hd.WalletLinkSigner({
        metadata: t,
        updateListener: s
      });
    case "extension": {
      const i = (0, Ty.getCoinbaseInjectedSigner)();
      if (!i)
        throw xy.standardErrors.rpc.internal("injected signer not found");
      return i;
    }
  }
}
Rt.createSigner = Dy;
async function By(r, e) {
  await r.onMessage(({ event: n }) => n === "WalletLinkSessionRequest");
  const t = new Hd.WalletLinkSigner({
    metadata: e
  });
  r.postMessage({
    event: "WalletLinkUpdate",
    data: { session: t.getSession() }
  }), await t.handshake(), r.postMessage({
    event: "WalletLinkUpdate",
    data: { connected: !0 }
  });
}
var _o = {}, $s = {};
Object.defineProperty($s, "__esModule", { value: !0 });
$s.closePopup = $s.openPopup = void 0;
const Uy = Lt, Tu = 420, Ou = 540;
function Fy(r) {
  const e = (window.innerWidth - Tu) / 2 + window.screenX, t = (window.innerHeight - Ou) / 2 + window.screenY, n = window.open(r, "Smart Wallet", `width=${Tu}, height=${Ou}, left=${e}, top=${t}`);
  if (n == null || n.focus(), !n)
    throw Uy.standardErrors.rpc.internal("Pop up window failed to open");
  return n;
}
$s.openPopup = Fy;
function Hy(r) {
  r && !r.closed && r.close();
}
$s.closePopup = Hy;
Object.defineProperty(_o, "__esModule", { value: !0 });
_o.Communicator = void 0;
const Gy = Sr, _u = $s, Wy = Ot, Lu = Lt;
class jy {
  constructor(e = Wy.CB_KEYS_URL) {
    this.popup = null, this.listeners = /* @__PURE__ */ new Map(), this.postMessage = async (t) => {
      (await this.waitForPopupLoaded()).postMessage(t, this.url.origin);
    }, this.postRequestAndWaitForResponse = async (t) => {
      const n = this.onMessage(({ requestId: s }) => s === t.id);
      return this.postMessage(t), await n;
    }, this.onMessage = async (t) => new Promise((n, s) => {
      const i = (a) => {
        if (a.origin !== this.url.origin)
          return;
        const o = a.data;
        t(o) && (n(o), window.removeEventListener("message", i), this.listeners.delete(i));
      };
      window.addEventListener("message", i), this.listeners.set(i, { reject: s });
    }), this.disconnect = () => {
      (0, _u.closePopup)(this.popup), this.popup = null, this.listeners.forEach(({ reject: t }, n) => {
        t(Lu.standardErrors.provider.userRejectedRequest("Request rejected")), window.removeEventListener("message", n);
      }), this.listeners.clear();
    }, this.waitForPopupLoaded = async () => this.popup && !this.popup.closed ? this.popup : (this.popup = (0, _u.openPopup)(this.url), this.onMessage(({ event: t }) => t === "PopupUnload").then(this.disconnect).catch(() => {
    }), this.onMessage(({ event: t }) => t === "PopupLoaded").then((t) => {
      this.postMessage({
        requestId: t.id,
        data: { version: Gy.LIB_VERSION }
      });
    }).then(() => {
      if (!this.popup)
        throw Lu.standardErrors.rpc.internal();
      return this.popup;
    })), this.url = new URL(e);
  }
}
_o.Communicator = jy;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
Lo.determineMethodCategory = void 0;
const Mu = {
  handshake: ["eth_requestAccounts"],
  sign: [
    "eth_ecRecover",
    "personal_sign",
    "personal_ecRecover",
    "eth_signTransaction",
    "eth_sendTransaction",
    "eth_signTypedData_v1",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_signTypedData",
    "wallet_addEthereumChain",
    "wallet_switchEthereumChain",
    "wallet_watchAsset",
    "wallet_getCapabilities",
    "wallet_sendCalls",
    "wallet_showCallsStatus"
  ],
  state: [
    // internal state
    "eth_chainId",
    "eth_accounts",
    "eth_coinbase",
    "net_version"
  ],
  deprecated: ["eth_sign", "eth_signTypedData_v2"],
  unsupported: ["eth_subscribe", "eth_unsubscribe"],
  fetch: []
};
function Vy(r) {
  for (const e in Mu) {
    const t = e;
    if (Mu[t].includes(r))
      return t;
  }
}
Lo.determineMethodCategory = Vy;
var Ky = Xe && Xe.__rest || function(r, e) {
  var t = {};
  for (var n in r)
    Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, n = Object.getOwnPropertySymbols(r); s < n.length; s++)
      e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[s]) && (t[n[s]] = r[n[s]]);
  return t;
}, Qy = Xe && Xe.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(mo, "__esModule", { value: !0 });
mo.CoinbaseWalletProvider = void 0;
const zy = Qy(lf), Ur = Lt, Jy = wo, ba = be, ii = T, Aa = Rt, Du = Ye, qy = _o, Zy = Lo, Yy = Mt;
class $y extends zy.default {
  constructor(e) {
    var t, n, { metadata: s } = e, i = e.preference, { keysUrl: a } = i, o = Ky(i, ["keysUrl"]);
    super(), this.accounts = [], this.handlers = {
      // eth_requestAccounts
      handshake: async (u) => {
        try {
          if (this.connected)
            return this.emit("connect", { chainId: (0, ii.hexStringFromIntNumber)((0, ba.IntNumber)(this.chain.id)) }), this.accounts;
          const h = await this.requestSignerSelection(), p = this.initSigner(h), d = await p.handshake();
          return this.signer = p, (0, Aa.storeSignerType)(h), this.emit("connect", { chainId: (0, ii.hexStringFromIntNumber)((0, ba.IntNumber)(this.chain.id)) }), d;
        } catch (h) {
          throw this.handleUnauthorizedError(h), h;
        }
      },
      sign: async (u) => {
        if (!this.connected || !this.signer)
          throw Ur.standardErrors.provider.unauthorized("Must call 'eth_requestAccounts' before other methods");
        try {
          return await this.signer.request(u);
        } catch (h) {
          throw this.handleUnauthorizedError(h), h;
        }
      },
      fetch: (u) => (0, Du.fetchRPCRequest)(u, this.chain),
      state: (u) => {
        const h = () => {
          if (this.connected)
            return this.accounts;
          throw Ur.standardErrors.provider.unauthorized("Must call 'eth_requestAccounts' before other methods");
        };
        switch (u.method) {
          case "eth_chainId":
            return (0, ii.hexStringFromIntNumber)((0, ba.IntNumber)(this.chain.id));
          case "net_version":
            return this.chain.id;
          case "eth_accounts":
            return h();
          case "eth_coinbase":
            return h()[0];
          default:
            return this.handlers.unsupported(u);
        }
      },
      deprecated: ({ method: u }) => {
        throw Ur.standardErrors.rpc.methodNotSupported(`Method ${u} is deprecated.`);
      },
      unsupported: ({ method: u }) => {
        throw Ur.standardErrors.rpc.methodNotSupported(`Method ${u} is not supported.`);
      }
    }, this.isCoinbaseWallet = !0, this.updateListener = {
      onAccountsUpdate: ({ accounts: u, source: h }) => {
        (0, ii.areAddressArraysEqual)(this.accounts, u) || (this.accounts = u, h !== "storage" && this.emit("accountsChanged", this.accounts));
      },
      onChainUpdate: ({ chain: u, source: h }) => {
        u.id === this.chain.id && u.rpcUrl === this.chain.rpcUrl || (this.chain = u, h !== "storage" && this.emit("chainChanged", (0, ii.hexStringFromIntNumber)((0, ba.IntNumber)(u.id))));
      }
    }, this.metadata = s, this.preference = o, this.communicator = new qy.Communicator(a), this.chain = {
      id: (n = (t = s.appChainIds) === null || t === void 0 ? void 0 : t[0]) !== null && n !== void 0 ? n : 1
    };
    const c = (0, Aa.loadSignerType)();
    this.signer = c ? this.initSigner(c) : null;
  }
  get connected() {
    return this.accounts.length > 0;
  }
  async request(e) {
    var t;
    try {
      const n = (0, Du.checkErrorForInvalidRequestArgs)(e);
      if (n)
        throw n;
      const s = (t = (0, Zy.determineMethodCategory)(e.method)) !== null && t !== void 0 ? t : "fetch";
      return this.handlers[s](e);
    } catch (n) {
      return Promise.reject((0, Jy.serializeError)(n, e.method));
    }
  }
  handleUnauthorizedError(e) {
    e.code === Ur.standardErrorCodes.provider.unauthorized && this.disconnect();
  }
  /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */
  async enable() {
    return console.warn('.enable() has been deprecated. Please use .request({ method: "eth_requestAccounts" }) instead.'), await this.request({
      method: "eth_requestAccounts"
    });
  }
  async disconnect() {
    this.accounts = [], this.chain = { id: 1 }, Yy.ScopedLocalStorage.clearAll(), this.emit("disconnect", Ur.standardErrors.provider.disconnected("User initiated disconnection"));
  }
  requestSignerSelection() {
    return (0, Aa.fetchSignerType)({
      communicator: this.communicator,
      preference: this.preference,
      metadata: this.metadata
    });
  }
  initSigner(e) {
    return (0, Aa.createSigner)({
      signerType: e,
      metadata: this.metadata,
      communicator: this.communicator,
      updateListener: this.updateListener
    });
  }
}
mo.CoinbaseWalletProvider = $y;
Object.defineProperty(Ii, "__esModule", { value: !0 });
Ii.CoinbaseWalletSDK = void 0;
const Xy = go, ew = mo, tw = Mt, nw = Sr, rw = T, sw = Ye;
class iw {
  constructor(e) {
    this.metadata = {
      appName: e.appName || "Dapp",
      appLogoUrl: e.appLogoUrl || (0, rw.getFavicon)(),
      appChainIds: e.appChainIds || []
    }, this.storeLatestVersion();
  }
  makeWeb3Provider(e = { options: "all" }) {
    var t;
    const n = { metadata: this.metadata, preference: e };
    return (t = (0, sw.getCoinbaseInjectedProvider)(n)) !== null && t !== void 0 ? t : new ew.CoinbaseWalletProvider(n);
  }
  /**
   * Official Coinbase Wallet logo for developers to use on their frontend
   * @param type Type of wallet logo: "standard" | "circle" | "text" | "textWithLogo" | "textLight" | "textWithLogoLight"
   * @param width Width of the logo (Optional)
   * @returns SVG Data URI
   */
  getCoinbaseWalletLogo(e, t = 240) {
    return (0, Xy.walletLogo)(e, t);
  }
  storeLatestVersion() {
    new tw.ScopedLocalStorage("CBWSDK").setItem("VERSION", nw.LIB_VERSION);
  }
}
Ii.CoinbaseWalletSDK = iw;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.CoinbaseWalletSDK = void 0;
  const e = Ii;
  r.default = e.CoinbaseWalletSDK;
  var t = Ii;
  Object.defineProperty(r, "CoinbaseWalletSDK", { enumerable: !0, get: function() {
    return t.CoinbaseWalletSDK;
  } });
})(ud);
function aw(r) {
  const { enableEIP6963: e = !0, enableCoinbase: t = !0, enableInjected: n = !0, auth: s = {
    email: !0,
    showWallets: !0,
    walletFeatures: !0
  }, metadata: i } = r;
  let a, o;
  const c = { metadata: i };
  function u() {
    if (a)
      return a;
    if (!(typeof window > "u") && window.ethereum)
      return a = window.ethereum, a;
  }
  function h() {
    var d;
    return o || (typeof window > "u" ? void 0 : (o = new ud.CoinbaseWalletSDK({
      appName: i.name,
      appLogoUrl: i.icons[0],
      appChainIds: ((d = r.chains) == null ? void 0 : d.map((g) => g.chainId)) || [1, 84532]
    }).makeWeb3Provider({
      options: r.coinbasePreference || "all"
    }), o));
  }
  return n && (c.injected = u()), t && (c.coinbase = h()), e && (c.EIP6963 = !0), s && (s.email ?? (s.email = !0), s.showWallets ?? (s.showWallets = !0), s.walletFeatures ?? (s.walletFeatures = !0), c.auth = s), c;
}
function ow(r) {
  return new Mm({ ...r, _sdkVersion: `html-ethers-${k.VERSION}` });
}
const dw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createWeb3Modal: ow,
  defaultConfig: aw
}, Symbol.toStringTag, { value: "Module" }));
export {
  dw as Web3modal
};
