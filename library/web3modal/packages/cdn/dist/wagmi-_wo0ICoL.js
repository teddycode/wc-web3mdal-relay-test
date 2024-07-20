import { k as Ad, s as kd, w as Ed, S as Id, e as Sd, a as _r, E as Yi, C as Td, P as Ie, b as _, W as Pd, c as Ps, H as Bd, N as ke, d as Mn, f as Yo, g as ei, y as Ud, h as Md } from "./client-CWmvRiz4.js";
const Fd = "2.16.2", Nd = (e) => e, Nt = (e) => e, Dd = () => `viem@${Fd}`;
let k = class Js extends Error {
  constructor(t, n = {}) {
    var a;
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
      value: Dd()
    });
    const r = n.cause instanceof Js ? n.cause.details : (a = n.cause) != null && a.message ? n.cause.message : n.details, s = n.cause instanceof Js && n.cause.docsPath || n.docsPath;
    this.message = [
      t || "An error occurred.",
      "",
      ...n.metaMessages ? [...n.metaMessages, ""] : [],
      ...s ? [
        `Docs: ${n.docsBaseUrl ?? "https://viem.sh"}${s}${n.docsSlug ? `#${n.docsSlug}` : ""}`
      ] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: ${this.version}`
    ].join(`
`), n.cause && (this.cause = n.cause), this.details = r, this.docsPath = s, this.metaMessages = n.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return ec(this, t);
  }
};
function ec(e, t) {
  return t != null && t(e) ? e : e && typeof e == "object" && "cause" in e ? ec(e.cause, t) : t ? null : e;
}
class tc extends k {
  constructor({ max: t, min: n, signed: r, size: s, value: a }) {
    super(`Number "${a}" is not in safe ${s ? `${s * 8}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntegerOutOfRangeError"
    });
  }
}
class nc extends k {
  constructor(t) {
    super(`Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidBytesBooleanError"
    });
  }
}
class rc extends k {
  constructor(t) {
    super(`Hex value "${t}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidHexBooleanError"
    });
  }
}
class sc extends k {
  constructor(t) {
    super(`Hex value "${t}" is an odd length (${t.length}). It must be an even length.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidHexValueError"
    });
  }
}
class ac extends k {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeOverflowError"
    });
  }
}
class va extends k {
  constructor({ offset: t, position: n, size: r }) {
    super(`Slice ${n === "start" ? "starting" : "ending"} at offset "${t}" is out-of-bounds (size: ${r}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SliceOffsetOutOfBoundsError"
    });
  }
}
class Ca extends k {
  constructor({ size: t, targetSize: n, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${t}) exceeds padding size (${n}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeExceedsPaddingSizeError"
    });
  }
}
class ti extends k {
  constructor({ size: t, targetSize: n, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} is expected to be ${n} ${r} long, but is ${t} ${r} long.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidBytesLengthError"
    });
  }
}
function le(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string" ? be(e, { dir: t, size: n }) : oc(e, { dir: t, size: n });
}
function be(e, { dir: t, size: n = 32 } = {}) {
  if (n === null)
    return e;
  const r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new Ca({
      size: Math.ceil(r.length / 2),
      targetSize: n,
      type: "hex"
    });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function oc(e, { dir: t, size: n = 32 } = {}) {
  if (n === null)
    return e;
  if (e.length > n)
    throw new Ca({
      size: e.length,
      targetSize: n,
      type: "bytes"
    });
  const r = new Uint8Array(n);
  for (let s = 0; s < n; s++) {
    const a = t === "right";
    r[a ? s : n - s - 1] = e[a ? s : e.length - s - 1];
  }
  return r;
}
function D(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x");
}
function q(e) {
  return D(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
function Z(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e, r = 0;
  for (let s = 0; s < n.length - 1 && n[t === "left" ? s : n.length - s - 1].toString() === "0"; s++)
    r++;
  return n = t === "left" ? n.slice(r) : n.slice(0, n.length - r), typeof e == "string" ? (n.length === 1 && t === "right" && (n = `${n}0`), `0x${n.length % 2 === 1 ? `0${n}` : n}`) : n;
}
const Od = /* @__PURE__ */ new TextEncoder();
function J(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? cc(e, t) : typeof e == "boolean" ? ic(e, t) : D(e) ? X(e, t) : De(e, t);
}
function ic(e, t = {}) {
  const n = new Uint8Array(1);
  return n[0] = Number(e), typeof t.size == "number" ? (he(n, { size: t.size }), le(n, { size: t.size })) : n;
}
const Ee = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function ni(e) {
  if (e >= Ee.zero && e <= Ee.nine)
    return e - Ee.zero;
  if (e >= Ee.A && e <= Ee.F)
    return e - (Ee.A - 10);
  if (e >= Ee.a && e <= Ee.f)
    return e - (Ee.a - 10);
}
function X(e, t = {}) {
  let n = e;
  t.size && (he(n, { size: t.size }), n = le(n, { dir: "right", size: t.size }));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  const s = r.length / 2, a = new Uint8Array(s);
  for (let o = 0, i = 0; o < s; o++) {
    const c = ni(r.charCodeAt(i++)), l = ni(r.charCodeAt(i++));
    if (c === void 0 || l === void 0)
      throw new k(`Invalid byte sequence ("${r[i - 2]}${r[i - 1]}" in "${r}").`);
    a[o] = c * 16 + l;
  }
  return a;
}
function cc(e, t) {
  const n = S(e, t);
  return X(n);
}
function De(e, t = {}) {
  const n = Od.encode(e);
  return typeof t.size == "number" ? (he(n, { size: t.size }), le(n, { dir: "right", size: t.size })) : n;
}
function he(e, { size: t }) {
  if (q(e) > t)
    throw new ac({
      givenSize: q(e),
      maxSize: t
    });
}
function Zs(e, t) {
  const n = typeof t == "string" ? { to: t } : t, r = n.to;
  return r === "number" ? Q(e, n) : r === "bigint" ? F(e, n) : r === "string" ? Re(e, n) : r === "boolean" ? lc(e, n) : X(e, n);
}
function F(e, t = {}) {
  const { signed: n } = t;
  t.size && he(e, { size: t.size });
  const r = BigInt(e);
  if (!n)
    return r;
  const s = (e.length - 2) / 2, a = (1n << BigInt(s) * 8n - 1n) - 1n;
  return r <= a ? r : r - BigInt(`0x${"f".padStart(s * 2, "f")}`) - 1n;
}
function lc(e, t = {}) {
  let n = e;
  if (t.size && (he(n, { size: t.size }), n = Z(n)), Z(n) === "0x00")
    return !1;
  if (Z(n) === "0x01")
    return !0;
  throw new rc(n);
}
function Q(e, t = {}) {
  return Number(F(e, t));
}
function Re(e, t = {}) {
  let n = X(e);
  return t.size && (he(n, { size: t.size }), n = Z(n, { dir: "right" })), new TextDecoder().decode(n);
}
const Rd = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function P(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? S(e, t) : typeof e == "string" ? Te(e, t) : typeof e == "boolean" ? $r(e, t) : $(e, t);
}
function $r(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number" ? (he(n, { size: t.size }), le(n, { size: t.size })) : n;
}
function $(e, t = {}) {
  let n = "";
  for (let s = 0; s < e.length; s++)
    n += Rd[e[s]];
  const r = `0x${n}`;
  return typeof t.size == "number" ? (he(r, { size: t.size }), le(r, { dir: "right", size: t.size })) : r;
}
function S(e, t = {}) {
  const { signed: n, size: r } = t, s = BigInt(e);
  let a;
  r ? n ? a = (1n << BigInt(r) * 8n - 1n) - 1n : a = 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (a = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof a == "bigint" && n ? -a - 1n : 0;
  if (a && s > a || s < o) {
    const c = typeof e == "bigint" ? "n" : "";
    throw new tc({
      max: a ? `${a}${c}` : void 0,
      min: `${o}${c}`,
      signed: n,
      size: r,
      value: `${e}${c}`
    });
  }
  const i = `0x${(n && s < 0 ? (1n << BigInt(r * 8)) + BigInt(s) : s).toString(16)}`;
  return r ? le(i, { size: r }) : i;
}
const zd = /* @__PURE__ */ new TextEncoder();
function Te(e, t = {}) {
  const n = zd.encode(e);
  return $(n, t);
}
async function jd(e, { chain: t }) {
  const { id: n, name: r, nativeCurrency: s, rpcUrls: a, blockExplorers: o } = t;
  await e.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: S(n),
        chainName: r,
        nativeCurrency: s,
        rpcUrls: a.default.http,
        blockExplorerUrls: o ? Object.values(o).map(({ url: i }) => i) : void 0
      }
    ]
  }, { dedupe: !0, retryCount: 0 });
}
function we(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new wc(e.type);
  return `${e.name}(${Hr(e.inputs, { includeName: t })})`;
}
function Hr(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => Ld(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function Ld(e, { includeName: t }) {
  return e.type.startsWith("tuple") ? `(${Hr(e.components, { includeName: t })})${e.type.slice(5)}` : e.type + (t && e.name ? ` ${e.name}` : "");
}
class xa extends k {
  constructor({ docsPath: t }) {
    super([
      "A constructor was not found on the ABI.",
      "Make sure you are using the correct ABI and that the constructor exists on it."
    ].join(`
`), {
      docsPath: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiConstructorNotFoundError"
    });
  }
}
class tn extends k {
  constructor({ docsPath: t }) {
    super([
      "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
      "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
    ].join(`
`), {
      docsPath: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiConstructorParamsNotFoundError"
    });
  }
}
class _d extends k {
  constructor({ data: t, size: n }) {
    super([
      `Data size of ${n} bytes is invalid.`,
      "Size must be in increments of 32 bytes (size % 32 === 0)."
    ].join(`
`), { metaMessages: [`Data: ${t} (${n} bytes)`] }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiDecodingDataSizeInvalidError"
    });
  }
}
class Aa extends k {
  constructor({ data: t, params: n, size: r }) {
    super([`Data size of ${r} bytes is too small for given parameters.`].join(`
`), {
      metaMessages: [
        `Params: (${Hr(n, { includeName: !0 })})`,
        `Data:   ${t} (${r} bytes)`
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
    }), this.data = t, this.params = n, this.size = r;
  }
}
class pn extends k {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.'), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiDecodingZeroDataError"
    });
  }
}
class uc extends k {
  constructor({ expectedLength: t, givenLength: n, type: r }) {
    super([
      `ABI encoding array length mismatch for type ${r}.`,
      `Expected length: ${t}`,
      `Given length: ${n}`
    ].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEncodingArrayLengthMismatchError"
    });
  }
}
class dc extends k {
  constructor({ expectedSize: t, value: n }) {
    super(`Size of bytes "${n}" (bytes${q(n)}) does not match expected size (bytes${t}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEncodingBytesSizeMismatchError"
    });
  }
}
class ka extends k {
  constructor({ expectedLength: t, givenLength: n }) {
    super([
      "ABI encoding params/values length mismatch.",
      `Expected length (params): ${t}`,
      `Given length (values): ${n}`
    ].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEncodingLengthMismatchError"
    });
  }
}
class pc extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Arguments (\`args\`) were provided to "${t}", but "${t}" on the ABI does not contain any parameters (\`inputs\`).`,
      "Cannot encode error result without knowing what the parameter types are.",
      "Make sure you are using the correct ABI and that the inputs exist on it."
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiErrorInputsNotFoundError"
    });
  }
}
class Xs extends k {
  constructor(t, { docsPath: n } = {}) {
    super([
      `Error ${t ? `"${t}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it."
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiErrorNotFoundError"
    });
  }
}
class Ea extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Encoded error signature "${t}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it.",
      `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${t}.`
    ].join(`
`), {
      docsPath: n
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
    }), this.signature = t;
  }
}
class fc extends k {
  constructor({ docsPath: t }) {
    super("Cannot extract event signature from empty topics.", {
      docsPath: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEventSignatureEmptyTopicsError"
    });
  }
}
class Ia extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Encoded event signature "${t}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it.",
      `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEventSignatureNotFoundError"
    });
  }
}
class Ys extends k {
  constructor(t, { docsPath: n } = {}) {
    super([
      `Event ${t ? `"${t}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it."
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiEventNotFoundError"
    });
  }
}
class Ye extends k {
  constructor(t, { docsPath: n } = {}) {
    super([
      `Function ${t ? `"${t}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiFunctionNotFoundError"
    });
  }
}
class Sa extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Function "${t}" does not contain any \`outputs\` on ABI.`,
      "Cannot decode function result without knowing what the parameter types are.",
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiFunctionOutputsNotFoundError"
    });
  }
}
class hc extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Encoded function signature "${t}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it.",
      `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`
    ].join(`
`), {
      docsPath: n
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AbiFunctionSignatureNotFoundError"
    });
  }
}
class $d extends k {
  constructor(t, n) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [
        `\`${t.type}\` in \`${we(t.abiItem)}\`, and`,
        `\`${n.type}\` in \`${we(n.abiItem)}\``,
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
class Ta extends k {
  constructor({ expectedSize: t, givenSize: n }) {
    super(`Expected bytes${t}, got bytes${n}.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BytesSizeMismatchError"
    });
  }
}
class vt extends k {
  constructor({ abiItem: t, data: n, params: r, size: s }) {
    super([
      `Data size of ${s} bytes is too small for non-indexed event parameters.`
    ].join(`
`), {
      metaMessages: [
        `Params: (${Hr(r, { includeName: !0 })})`,
        `Data:   ${n} (${s} bytes)`
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
    }), this.abiItem = t, this.data = n, this.params = r, this.size = s;
  }
}
class fn extends k {
  constructor({ abiItem: t, param: n }) {
    super([
      `Expected a topic for indexed event parameter${n.name ? ` "${n.name}"` : ""} on event "${we(t, { includeName: !0 })}".`
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
    }), this.abiItem = t;
  }
}
class mc extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Type "${t}" is not a valid encoding type.`,
      "Please provide a valid ABI type."
    ].join(`
`), { docsPath: n }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiEncodingType"
    });
  }
}
class bc extends k {
  constructor(t, { docsPath: n }) {
    super([
      `Type "${t}" is not a valid decoding type.`,
      "Please provide a valid ABI type."
    ].join(`
`), { docsPath: n }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiDecodingType"
    });
  }
}
class yc extends k {
  constructor(t) {
    super([`Value "${t}" is not a valid array.`].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidArrayError"
    });
  }
}
class wc extends k {
  constructor(t) {
    super([
      `"${t}" is not a valid definition type.`,
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
class gc extends k {
  constructor(t) {
    super(`Type "${t}" is not supported for packed encoding.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnsupportedPackedAbiType"
    });
  }
}
function ue(e) {
  return typeof e[0] == "string" ? se(e) : vc(e);
}
function vc(e) {
  let t = 0;
  for (const s of e)
    t += s.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const s of e)
    n.set(s, r), r += s.length;
  return n;
}
function se(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
class K extends k {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAddressError"
    });
  }
}
class Gr extends Map {
  constructor(t) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = t;
  }
  set(t, n) {
    return super.set(t, n), this.maxSize && this.size > this.maxSize && this.delete(this.keys().next().value), this;
  }
}
function V(e, t) {
  const n = t || "hex", r = Ad(D(e, { strict: !1 }) ? J(e) : e);
  return n === "bytes" ? r : P(r);
}
const Bs = /* @__PURE__ */ new Gr(8192);
function Dt(e, t) {
  if (Bs.has(`${e}.${t}`))
    return Bs.get(`${e}.${t}`);
  const n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(), r = V(De(n), "bytes"), s = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let o = 0; o < 40; o += 2)
    r[o >> 1] >> 4 >= 8 && s[o] && (s[o] = s[o].toUpperCase()), (r[o >> 1] & 15) >= 8 && s[o + 1] && (s[o + 1] = s[o + 1].toUpperCase());
  const a = `0x${s.join("")}`;
  return Bs.set(`${e}.${t}`, a), a;
}
function O(e, t) {
  if (!H(e, { strict: !1 }))
    throw new K({ address: e });
  return Dt(e, t);
}
const Hd = /^0x[a-fA-F0-9]{40}$/, Us = /* @__PURE__ */ new Gr(8192);
function H(e, t) {
  const { strict: n = !0 } = t ?? {}, r = `${e}.${n}`;
  if (Us.has(r))
    return Us.get(r);
  const s = Hd.test(e) ? e.toLowerCase() === e ? !0 : n ? Dt(e) === e : !0 : !1;
  return Us.set(r, s), s;
}
function Pe(e, t, n, { strict: r } = {}) {
  return D(e, { strict: !1 }) ? qr(e, t, n, {
    strict: r
  }) : Pa(e, t, n, {
    strict: r
  });
}
function Cc(e, t) {
  if (typeof t == "number" && t > 0 && t > q(e) - 1)
    throw new va({
      offset: t,
      position: "start",
      size: q(e)
    });
}
function xc(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && q(e) !== n - t)
    throw new va({
      offset: n,
      position: "end",
      size: q(e)
    });
}
function Pa(e, t, n, { strict: r } = {}) {
  Cc(e, t);
  const s = e.slice(t, n);
  return r && xc(s, t, n), s;
}
function qr(e, t, n, { strict: r } = {}) {
  Cc(e, t);
  const s = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && xc(s, t, n), s;
}
function Ae(e, t) {
  if (e.length !== t.length)
    throw new ka({
      expectedLength: e.length,
      givenLength: t.length
    });
  const n = Gd({
    params: e,
    values: t
  }), r = Ua(n);
  return r.length === 0 ? "0x" : r;
}
function Gd({ params: e, values: t }) {
  const n = [];
  for (let r = 0; r < e.length; r++)
    n.push(Ba({ param: e[r], value: t[r] }));
  return n;
}
function Ba({ param: e, value: t }) {
  const n = Ma(e.type);
  if (n) {
    const [r, s] = n;
    return Qd(t, { length: r, param: { ...e, type: s } });
  }
  if (e.type === "tuple")
    return Zd(t, {
      param: e
    });
  if (e.type === "address")
    return qd(t);
  if (e.type === "bool")
    return Kd(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    const r = e.type.startsWith("int");
    return Wd(t, { signed: r });
  }
  if (e.type.startsWith("bytes"))
    return Vd(t, { param: e });
  if (e.type === "string")
    return Jd(t);
  throw new mc(e.type, {
    docsPath: "/docs/contract/encodeAbiParameters"
  });
}
function Ua(e) {
  let t = 0;
  for (let a = 0; a < e.length; a++) {
    const { dynamic: o, encoded: i } = e[a];
    o ? t += 32 : t += q(i);
  }
  const n = [], r = [];
  let s = 0;
  for (let a = 0; a < e.length; a++) {
    const { dynamic: o, encoded: i } = e[a];
    o ? (n.push(S(t + s, { size: 32 })), r.push(i), s += q(i)) : n.push(i);
  }
  return ue([...n, ...r]);
}
function qd(e) {
  if (!H(e))
    throw new K({ address: e });
  return { dynamic: !1, encoded: be(e.toLowerCase()) };
}
function Qd(e, { length: t, param: n }) {
  const r = t === null;
  if (!Array.isArray(e))
    throw new yc(e);
  if (!r && e.length !== t)
    throw new uc({
      expectedLength: t,
      givenLength: e.length,
      type: `${n.type}[${t}]`
    });
  let s = !1;
  const a = [];
  for (let o = 0; o < e.length; o++) {
    const i = Ba({ param: n, value: e[o] });
    i.dynamic && (s = !0), a.push(i);
  }
  if (r || s) {
    const o = Ua(a);
    if (r) {
      const i = S(a.length, { size: 32 });
      return {
        dynamic: !0,
        encoded: a.length > 0 ? ue([i, o]) : i
      };
    }
    if (s)
      return { dynamic: !0, encoded: o };
  }
  return {
    dynamic: !1,
    encoded: ue(a.map(({ encoded: o }) => o))
  };
}
function Vd(e, { param: t }) {
  const [, n] = t.type.split("bytes"), r = q(e);
  if (!n) {
    let s = e;
    return r % 32 !== 0 && (s = be(s, {
      dir: "right",
      size: Math.ceil((e.length - 2) / 2 / 32) * 32
    })), {
      dynamic: !0,
      encoded: ue([be(S(r, { size: 32 })), s])
    };
  }
  if (r !== Number.parseInt(n))
    throw new dc({
      expectedSize: Number.parseInt(n),
      value: e
    });
  return { dynamic: !1, encoded: be(e, { dir: "right" }) };
}
function Kd(e) {
  if (typeof e != "boolean")
    throw new k(`Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`);
  return { dynamic: !1, encoded: be($r(e)) };
}
function Wd(e, { signed: t }) {
  return {
    dynamic: !1,
    encoded: S(e, {
      size: 32,
      signed: t
    })
  };
}
function Jd(e) {
  const t = Te(e), n = Math.ceil(q(t) / 32), r = [];
  for (let s = 0; s < n; s++)
    r.push(be(Pe(t, s * 32, (s + 1) * 32), {
      dir: "right"
    }));
  return {
    dynamic: !0,
    encoded: ue([
      be(S(q(t), { size: 32 })),
      ...r
    ])
  };
}
function Zd(e, { param: t }) {
  let n = !1;
  const r = [];
  for (let s = 0; s < t.components.length; s++) {
    const a = t.components[s], o = Array.isArray(e) ? s : a.name, i = Ba({
      param: a,
      value: e[o]
    });
    r.push(i), i.dynamic && (n = !0);
  }
  return {
    dynamic: n,
    encoded: n ? Ua(r) : ue(r.map(({ encoded: s }) => s))
  };
}
function Ma(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? (
    // Return `null` if the array is dynamic.
    [t[2] ? Number(t[2]) : null, t[1]]
  ) : void 0;
}
const Ms = "/docs/contract/encodeDeployData";
function hn(e) {
  const { abi: t, args: n, bytecode: r } = e;
  if (!n || n.length === 0)
    return r;
  const s = t.find((o) => "type" in o && o.type === "constructor");
  if (!s)
    throw new xa({ docsPath: Ms });
  if (!("inputs" in s))
    throw new tn({ docsPath: Ms });
  if (!s.inputs || s.inputs.length === 0)
    throw new tn({ docsPath: Ms });
  const a = Ae(s.inputs, n);
  return se([r, a]);
}
function ae(e) {
  return typeof e == "string" ? { address: e, type: "json-rpc" } : e;
}
class Qr extends k {
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
class hr extends k {
  constructor({ blockNumber: t, chain: n, contract: r }) {
    super(`Chain "${n.name}" does not support contract "${r.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...t && r.blockCreated && r.blockCreated > t ? [
          `- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${t}).`
        ] : [
          `- The chain does not have the contract "${r.name}" configured.`
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
class Ac extends k {
  constructor({ chain: t, currentChainId: n }) {
    super(`The current chain of the wallet (id: ${n}) does not match the target chain for the transaction (id: ${t.id} – ${t.name}).`, {
      metaMessages: [
        `Current Chain ID:  ${n}`,
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
class kc extends k {
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
class Fa extends k {
  constructor() {
    super("No chain was provided to the Client."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ClientChainNotConfiguredError"
    });
  }
}
class Ot extends k {
  constructor({ chainId: t }) {
    super(typeof t == "number" ? `Chain ID "${t}" is invalid.` : "Chain ID is invalid."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidChainIdError"
    });
  }
}
function Na({ chain: e, currentChainId: t }) {
  if (!e)
    throw new kc();
  if (t !== e.id)
    throw new Ac({ chain: e, currentChainId: t });
}
const Da = {
  gwei: 9,
  wei: 18
}, Oa = {
  ether: -9,
  wei: 9
}, Ra = {
  ether: -18,
  gwei: -9
};
function ce(e, t) {
  let n = e.toString();
  const r = n.startsWith("-");
  r && (n = n.slice(1)), n = n.padStart(t, "0");
  let [s, a] = [
    n.slice(0, n.length - t),
    n.slice(n.length - t)
  ];
  return a = a.replace(/(0+)$/, ""), `${r ? "-" : ""}${s || "0"}${a ? `.${a}` : ""}`;
}
function ee(e, t = "wei") {
  return ce(e, Oa[t]);
}
class Je extends k {
  constructor({ cause: t, message: n } = {}) {
    var s;
    const r = (s = n == null ? void 0 : n.replace("execution reverted: ", "")) == null ? void 0 : s.replace("execution reverted", "");
    super(`Execution reverted ${r ? `with reason: ${r}` : "for an unknown reason"}.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ExecutionRevertedError"
    });
  }
}
Object.defineProperty(Je, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3
});
Object.defineProperty(Je, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/
});
class Be extends k {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${n ? ` = ${ee(n)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FeeCapTooHigh"
    });
  }
}
Object.defineProperty(Be, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
class mr extends k {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${n ? ` = ${ee(n)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FeeCapTooLow"
    });
  }
}
Object.defineProperty(mr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
class br extends k {
  constructor({ cause: t, nonce: n } = {}) {
    super(`Nonce provided for the transaction ${n ? `(${n}) ` : ""}is higher than the next one expected.`, { cause: t }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NonceTooHighError"
    });
  }
}
Object.defineProperty(br, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too high/
});
class yr extends k {
  constructor({ cause: t, nonce: n } = {}) {
    super([
      `Nonce provided for the transaction ${n ? `(${n}) ` : ""}is lower than the current nonce of the account.`,
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
Object.defineProperty(yr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too low|transaction already imported|already known/
});
class wr extends k {
  constructor({ cause: t, nonce: n } = {}) {
    super(`Nonce provided for the transaction ${n ? `(${n}) ` : ""}exceeds the maximum allowed nonce.`, { cause: t }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NonceMaxValueError"
    });
  }
}
Object.defineProperty(wr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce has max value/
});
class gr extends k {
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
Object.defineProperty(gr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /insufficient funds/
});
class vr extends k {
  constructor({ cause: t, gas: n } = {}) {
    super(`The amount of gas ${n ? `(${n}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntrinsicGasTooHighError"
    });
  }
}
Object.defineProperty(vr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too high|gas limit reached/
});
class Cr extends k {
  constructor({ cause: t, gas: n } = {}) {
    super(`The amount of gas ${n ? `(${n}) ` : ""}provided for the transaction is too low.`, {
      cause: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntrinsicGasTooLowError"
    });
  }
}
Object.defineProperty(Cr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too low/
});
class xr extends k {
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
Object.defineProperty(xr, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /transaction type not valid/
});
class et extends k {
  constructor({ cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${n ? ` = ${ee(n)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r ? ` = ${ee(r)} gwei` : ""}).`
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
Object.defineProperty(et, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
class mn extends k {
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
function Vr(e, t = "wei") {
  return ce(e, Da[t]);
}
function bn(e) {
  const t = Object.entries(e).map(([r, s]) => s === void 0 || s === !1 ? null : [r, s]).filter(Boolean), n = t.reduce((r, [s]) => Math.max(r, s.length), 0);
  return t.map(([r, s]) => `  ${`${r}:`.padEnd(n + 1)}  ${s}`).join(`
`);
}
class Ec extends k {
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
class za extends k {
  constructor({ v: t }) {
    super(`Invalid \`v\` value "${t}". Expected 27 or 28.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidLegacyVError"
    });
  }
}
class Ic extends k {
  constructor({ transaction: t }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        bn(t),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
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
class Sc extends k {
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
class yn extends k {
  constructor({ attributes: t, serializedTransaction: n, type: r }) {
    const s = Object.entries(t).map(([a, o]) => typeof o > "u" ? a : void 0).filter(Boolean);
    super(`Invalid serialized transaction of type "${r}" was provided.`, {
      metaMessages: [
        `Serialized Transaction: "${n}"`,
        s.length > 0 ? `Missing Attributes: ${s.join(", ")}` : ""
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
    }), this.serializedTransaction = n, this.type = r;
  }
}
class Tc extends k {
  constructor({ storageKey: t }) {
    super(`Size for storage key "${t}" is invalid. Expected 32 bytes. Got ${Math.floor((t.length - 2) / 2)} bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidStorageKeySizeError"
    });
  }
}
class Pc extends k {
  constructor(t, { account: n, docsPath: r, chain: s, data: a, gas: o, gasPrice: i, maxFeePerGas: c, maxPriorityFeePerGas: l, nonce: u, to: d, value: p }) {
    var h;
    const f = bn({
      chain: s && `${s == null ? void 0 : s.name} (id: ${s == null ? void 0 : s.id})`,
      from: n == null ? void 0 : n.address,
      to: d,
      value: typeof p < "u" && `${Vr(p)} ${((h = s == null ? void 0 : s.nativeCurrency) == null ? void 0 : h.symbol) || "ETH"}`,
      data: a,
      gas: o,
      gasPrice: typeof i < "u" && `${ee(i)} gwei`,
      maxFeePerGas: typeof c < "u" && `${ee(c)} gwei`,
      maxPriorityFeePerGas: typeof l < "u" && `${ee(l)} gwei`,
      nonce: u
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
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
class ja extends k {
  constructor({ blockHash: t, blockNumber: n, blockTag: r, hash: s, index: a }) {
    let o = "Transaction";
    r && a !== void 0 && (o = `Transaction at block time "${r}" at index "${a}"`), t && a !== void 0 && (o = `Transaction at block hash "${t}" at index "${a}"`), n && a !== void 0 && (o = `Transaction at block number "${n}" at index "${a}"`), s && (o = `Transaction with hash "${s}"`), super(`${o} could not be found.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionNotFoundError"
    });
  }
}
class La extends k {
  constructor({ hash: t }) {
    super(`Transaction receipt with hash "${t}" could not be found. The Transaction may not be processed on a block yet.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionReceiptNotFoundError"
    });
  }
}
class ea extends k {
  constructor({ hash: t }) {
    super(`Timed out while waiting for transaction with hash "${t}" to be confirmed.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "WaitForTransactionReceiptTimeoutError"
    });
  }
}
const W = (e, t, n) => JSON.stringify(e, (r, s) => {
  const a = typeof s == "bigint" ? s.toString() : s;
  return typeof t == "function" ? t(r, a) : a;
}, n);
class Oe extends k {
  constructor({ body: t, details: n, headers: r, status: s, url: a }) {
    super("HTTP request failed.", {
      details: n,
      metaMessages: [
        s && `Status: ${s}`,
        `URL: ${Nt(a)}`,
        t && `Request body: ${W(t)}`
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
    }), this.body = t, this.headers = r, this.status = s, this.url = a;
  }
}
class Bc extends k {
  constructor({ body: t, details: n, url: r }) {
    super("WebSocket request failed.", {
      details: n,
      metaMessages: [`URL: ${Nt(r)}`, `Request body: ${W(t)}`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "WebSocketRequestError"
    });
  }
}
class Xe extends k {
  constructor({ body: t, error: n, url: r }) {
    super("RPC Request failed.", {
      cause: n,
      details: n.message,
      metaMessages: [`URL: ${Nt(r)}`, `Request body: ${W(t)}`]
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
    }), this.code = n.code;
  }
}
class Ar extends k {
  constructor({ body: t, url: n }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${Nt(n)}`, `Request body: ${W(t)}`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TimeoutError"
    });
  }
}
const Xd = -1;
class te extends k {
  constructor(t, { code: n, docsPath: r, metaMessages: s, shortMessage: a }) {
    super(a, {
      cause: t,
      docsPath: r,
      metaMessages: s || (t == null ? void 0 : t.metaMessages)
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
    }), this.name = t.name, this.code = t instanceof Xe ? t.code : n ?? Xd;
  }
}
let ot = class extends te {
  constructor(t, n) {
    super(t, n), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderRpcError"
    }), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.data = n.data;
  }
};
class Ct extends te {
  constructor(t) {
    super(t, {
      code: Ct.code,
      shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ParseRpcError"
    });
  }
}
Object.defineProperty(Ct, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32700
});
class xt extends te {
  constructor(t) {
    super(t, {
      code: xt.code,
      shortMessage: "JSON is not a valid request object."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidRequestRpcError"
    });
  }
}
Object.defineProperty(xt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32600
});
class At extends te {
  constructor(t) {
    super(t, {
      code: At.code,
      shortMessage: "The method does not exist / is not available."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "MethodNotFoundRpcError"
    });
  }
}
Object.defineProperty(At, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32601
});
class kt extends te {
  constructor(t) {
    super(t, {
      code: kt.code,
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
Object.defineProperty(kt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32602
});
class ze extends te {
  constructor(t) {
    super(t, {
      code: ze.code,
      shortMessage: "An internal error was received."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InternalRpcError"
    });
  }
}
Object.defineProperty(ze, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32603
});
class je extends te {
  constructor(t) {
    super(t, {
      code: je.code,
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
Object.defineProperty(je, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32e3
});
class Et extends te {
  constructor(t) {
    super(t, {
      code: Et.code,
      shortMessage: "Requested resource not found."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ResourceNotFoundRpcError"
    });
  }
}
Object.defineProperty(Et, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32001
});
class re extends te {
  constructor(t) {
    super(t, {
      code: re.code,
      shortMessage: "Requested resource not available."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ResourceUnavailableRpcError"
    });
  }
}
Object.defineProperty(re, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32002
});
class tt extends te {
  constructor(t) {
    super(t, {
      code: tt.code,
      shortMessage: "Transaction creation failed."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "TransactionRejectedRpcError"
    });
  }
}
Object.defineProperty(tt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32003
});
class It extends te {
  constructor(t) {
    super(t, {
      code: It.code,
      shortMessage: "Method is not implemented."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "MethodNotSupportedRpcError"
    });
  }
}
Object.defineProperty(It, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32004
});
class nt extends te {
  constructor(t) {
    super(t, {
      code: nt.code,
      shortMessage: "Request exceeds defined limit."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "LimitExceededRpcError"
    });
  }
}
Object.defineProperty(nt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32005
});
class St extends te {
  constructor(t) {
    super(t, {
      code: St.code,
      shortMessage: "Version of JSON-RPC protocol is not supported."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "JsonRpcVersionUnsupportedError"
    });
  }
}
Object.defineProperty(St, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32006
});
class U extends ot {
  constructor(t) {
    super(t, {
      code: U.code,
      shortMessage: "User rejected the request."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UserRejectedRequestError"
    });
  }
}
Object.defineProperty(U, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4001
});
class Tt extends ot {
  constructor(t) {
    super(t, {
      code: Tt.code,
      shortMessage: "The requested method and/or account has not been authorized by the user."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnauthorizedProviderError"
    });
  }
}
Object.defineProperty(Tt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4100
});
class Pt extends ot {
  constructor(t) {
    super(t, {
      code: Pt.code,
      shortMessage: "The Provider does not support the requested method."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnsupportedProviderMethodError"
    });
  }
}
Object.defineProperty(Pt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4200
});
class Le extends ot {
  constructor(t) {
    super(t, {
      code: Le.code,
      shortMessage: "The Provider is disconnected from all chains."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderDisconnectedError"
    });
  }
}
Object.defineProperty(Le, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4900
});
class rt extends ot {
  constructor(t) {
    super(t, {
      code: rt.code,
      shortMessage: "The Provider is not connected to the requested chain."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainDisconnectedError"
    });
  }
}
Object.defineProperty(rt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4901
});
class G extends ot {
  constructor(t) {
    super(t, {
      code: G.code,
      shortMessage: "An error occurred when attempting to switch chain."
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SwitchChainError"
    });
  }
}
Object.defineProperty(G, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4902
});
class Uc extends te {
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
function _a(e, t) {
  const n = (e.details || "").toLowerCase(), r = e instanceof k ? e.walk((s) => s.code === Je.code) : e;
  return r instanceof k ? new Je({
    cause: e,
    message: r.details
  }) : Je.nodeMessage.test(n) ? new Je({
    cause: e,
    message: e.details
  }) : Be.nodeMessage.test(n) ? new Be({
    cause: e,
    maxFeePerGas: t == null ? void 0 : t.maxFeePerGas
  }) : mr.nodeMessage.test(n) ? new mr({
    cause: e,
    maxFeePerGas: t == null ? void 0 : t.maxFeePerGas
  }) : br.nodeMessage.test(n) ? new br({ cause: e, nonce: t == null ? void 0 : t.nonce }) : yr.nodeMessage.test(n) ? new yr({ cause: e, nonce: t == null ? void 0 : t.nonce }) : wr.nodeMessage.test(n) ? new wr({ cause: e, nonce: t == null ? void 0 : t.nonce }) : gr.nodeMessage.test(n) ? new gr({ cause: e }) : vr.nodeMessage.test(n) ? new vr({ cause: e, gas: t == null ? void 0 : t.gas }) : Cr.nodeMessage.test(n) ? new Cr({ cause: e, gas: t == null ? void 0 : t.gas }) : xr.nodeMessage.test(n) ? new xr({ cause: e }) : et.nodeMessage.test(n) ? new et({
    cause: e,
    maxFeePerGas: t == null ? void 0 : t.maxFeePerGas,
    maxPriorityFeePerGas: t == null ? void 0 : t.maxPriorityFeePerGas
  }) : new mn({
    cause: e
  });
}
function Yd(e, { docsPath: t, ...n }) {
  const r = (() => {
    const s = _a(e, n);
    return s instanceof mn ? e : s;
  })();
  return new Pc(r, {
    docsPath: t,
    ...n
  });
}
function Kr(e, { format: t }) {
  if (!t)
    return {};
  const n = {};
  function r(a) {
    const o = Object.keys(a);
    for (const i of o)
      i in e && (n[i] = e[i]), a[i] && typeof a[i] == "object" && !Array.isArray(a[i]) && r(a[i]);
  }
  const s = t(e || {});
  return r(s), n;
}
function Wr(e, t) {
  return ({ exclude: n, format: r }) => ({
    exclude: n,
    format: (s) => {
      const a = t(s);
      if (n)
        for (const o of n)
          delete a[o];
      return {
        ...a,
        ...r(s)
      };
    },
    type: e
  });
}
const Mc = {
  legacy: "0x0",
  eip2930: "0x1",
  eip1559: "0x2",
  eip4844: "0x3"
};
function it(e) {
  const t = {};
  return typeof e.accessList < "u" && (t.accessList = e.accessList), typeof e.blobVersionedHashes < "u" && (t.blobVersionedHashes = e.blobVersionedHashes), typeof e.blobs < "u" && (typeof e.blobs[0] != "string" ? t.blobs = e.blobs.map((n) => $(n)) : t.blobs = e.blobs), typeof e.data < "u" && (t.data = e.data), typeof e.from < "u" && (t.from = e.from), typeof e.gas < "u" && (t.gas = S(e.gas)), typeof e.gasPrice < "u" && (t.gasPrice = S(e.gasPrice)), typeof e.maxFeePerBlobGas < "u" && (t.maxFeePerBlobGas = S(e.maxFeePerBlobGas)), typeof e.maxFeePerGas < "u" && (t.maxFeePerGas = S(e.maxFeePerGas)), typeof e.maxPriorityFeePerGas < "u" && (t.maxPriorityFeePerGas = S(e.maxPriorityFeePerGas)), typeof e.nonce < "u" && (t.nonce = S(e.nonce)), typeof e.to < "u" && (t.to = e.to), typeof e.type < "u" && (t.type = Mc[e.type]), typeof e.value < "u" && (t.value = S(e.value)), t;
}
const $a = /* @__PURE__ */ Wr("transactionRequest", it);
function B(e, t, n) {
  const r = e[t.name];
  if (typeof r == "function")
    return r;
  const s = e[n];
  return typeof s == "function" ? s : (a) => t(e, a);
}
function Rt(e) {
  const { account: t, gasPrice: n, maxFeePerGas: r, maxPriorityFeePerGas: s, to: a } = e, o = t ? ae(t) : void 0;
  if (o && !H(o.address))
    throw new K({ address: o.address });
  if (a && !H(a))
    throw new K({ address: a });
  if (typeof n < "u" && (typeof r < "u" || typeof s < "u"))
    throw new Ec();
  if (r && r > 2n ** 256n - 1n)
    throw new Be({ maxFeePerGas: r });
  if (s && r && s > r)
    throw new et({ maxFeePerGas: r, maxPriorityFeePerGas: s });
}
async function wn(e) {
  const t = await e.request({
    method: "eth_chainId"
  }, { dedupe: !0 });
  return Q(t);
}
class Fc extends k {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseFeeScalarError"
    });
  }
}
class Jr extends k {
  constructor() {
    super("Chain does not support EIP-1559 fees."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Eip1559FeesNotSupportedError"
    });
  }
}
class Nc extends k {
  constructor({ maxPriorityFeePerGas: t }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${ee(t)} gwei).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "MaxFeePerGasTooLowError"
    });
  }
}
class Ha extends k {
  constructor({ blockHash: t, blockNumber: n }) {
    let r = "Block";
    t && (r = `Block at hash "${t}"`), n && (r = `Block at number "${n}"`), super(`${r} could not be found.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BlockNotFoundError"
    });
  }
}
const Ga = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844"
};
function zt(e) {
  const t = {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    chainId: e.chainId ? Q(e.chainId) : void 0,
    gas: e.gas ? BigInt(e.gas) : void 0,
    gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
    maxFeePerBlobGas: e.maxFeePerBlobGas ? BigInt(e.maxFeePerBlobGas) : void 0,
    maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: e.maxPriorityFeePerGas ? BigInt(e.maxPriorityFeePerGas) : void 0,
    nonce: e.nonce ? Q(e.nonce) : void 0,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    type: e.type ? Ga[e.type] : void 0,
    typeHex: e.type ? e.type : void 0,
    value: e.value ? BigInt(e.value) : void 0,
    v: e.v ? BigInt(e.v) : void 0
  };
  return t.yParity = (() => {
    if (e.yParity)
      return Number(e.yParity);
    if (typeof t.v == "bigint") {
      if (t.v === 0n || t.v === 27n)
        return 0;
      if (t.v === 1n || t.v === 28n)
        return 1;
      if (t.v >= 35n)
        return t.v % 2n === 0n ? 1 : 0;
    }
  })(), t.type === "legacy" && (delete t.accessList, delete t.maxFeePerBlobGas, delete t.maxFeePerGas, delete t.maxPriorityFeePerGas, delete t.yParity), t.type === "eip2930" && (delete t.maxFeePerBlobGas, delete t.maxFeePerGas, delete t.maxPriorityFeePerGas), t.type === "eip1559" && delete t.maxFeePerBlobGas, t;
}
const Zr = /* @__PURE__ */ Wr("transaction", zt);
function Xr(e) {
  var n;
  const t = (n = e.transactions) == null ? void 0 : n.map((r) => typeof r == "string" ? r : zt(r));
  return {
    ...e,
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
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
const Yr = /* @__PURE__ */ Wr("block", Xr);
async function Ue(e, { blockHash: t, blockNumber: n, blockTag: r, includeTransactions: s } = {}) {
  var u, d, p;
  const a = r ?? "latest", o = s ?? !1, i = n !== void 0 ? S(n) : void 0;
  let c = null;
  if (t ? c = await e.request({
    method: "eth_getBlockByHash",
    params: [t, o]
  }, { dedupe: !0 }) : c = await e.request({
    method: "eth_getBlockByNumber",
    params: [i || a, o]
  }, { dedupe: !!i }), !c)
    throw new Ha({ blockHash: t, blockNumber: n });
  return (((p = (d = (u = e.chain) == null ? void 0 : u.formatters) == null ? void 0 : d.block) == null ? void 0 : p.format) || Xr)(c);
}
async function es(e) {
  const t = await e.request({
    method: "eth_gasPrice"
  });
  return BigInt(t);
}
async function Dc(e, t) {
  return Oc(e, t);
}
async function Oc(e, t) {
  var a, o, i;
  const { block: n, chain: r = e.chain, request: s } = t || {};
  if (typeof ((a = r == null ? void 0 : r.fees) == null ? void 0 : a.defaultPriorityFee) == "function") {
    const c = n || await B(e, Ue, "getBlock")({});
    return r.fees.defaultPriorityFee({
      block: c,
      client: e,
      request: s
    });
  }
  if (typeof ((o = r == null ? void 0 : r.fees) == null ? void 0 : o.defaultPriorityFee) < "u")
    return (i = r == null ? void 0 : r.fees) == null ? void 0 : i.defaultPriorityFee;
  try {
    const c = await e.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return F(c);
  } catch {
    const [c, l] = await Promise.all([
      n ? Promise.resolve(n) : B(e, Ue, "getBlock")({}),
      B(e, es, "getGasPrice")({})
    ]);
    if (typeof c.baseFeePerGas != "bigint")
      throw new Jr();
    const u = l - c.baseFeePerGas;
    return u < 0n ? 0n : u;
  }
}
async function Rc(e, t) {
  return ta(e, t);
}
async function ta(e, t) {
  var p, f;
  const { block: n, chain: r = e.chain, request: s, type: a = "eip1559" } = t || {}, o = await (async () => {
    var h, m;
    return typeof ((h = r == null ? void 0 : r.fees) == null ? void 0 : h.baseFeeMultiplier) == "function" ? r.fees.baseFeeMultiplier({
      block: n,
      client: e,
      request: s
    }) : ((m = r == null ? void 0 : r.fees) == null ? void 0 : m.baseFeeMultiplier) ?? 1.2;
  })();
  if (o < 1)
    throw new Fc();
  const c = 10 ** (((p = o.toString().split(".")[1]) == null ? void 0 : p.length) ?? 0), l = (h) => h * BigInt(Math.ceil(o * c)) / BigInt(c), u = n || await B(e, Ue, "getBlock")({});
  if (typeof ((f = r == null ? void 0 : r.fees) == null ? void 0 : f.estimateFeesPerGas) == "function") {
    const h = await r.fees.estimateFeesPerGas({
      block: n,
      client: e,
      multiply: l,
      request: s,
      type: a
    });
    if (h !== null)
      return h;
  }
  if (a === "eip1559") {
    if (typeof u.baseFeePerGas != "bigint")
      throw new Jr();
    const h = typeof (s == null ? void 0 : s.maxPriorityFeePerGas) == "bigint" ? s.maxPriorityFeePerGas : await Oc(e, {
      block: u,
      chain: r,
      request: s
    }), m = l(u.baseFeePerGas);
    return {
      maxFeePerGas: (s == null ? void 0 : s.maxFeePerGas) ?? m + h,
      maxPriorityFeePerGas: h
    };
  }
  return {
    gasPrice: (s == null ? void 0 : s.gasPrice) ?? l(await B(e, es, "getGasPrice")({}))
  };
}
class zc extends k {
  constructor(t, { account: n, docsPath: r, chain: s, data: a, gas: o, gasPrice: i, maxFeePerGas: c, maxPriorityFeePerGas: l, nonce: u, to: d, value: p }) {
    var h;
    const f = bn({
      from: n == null ? void 0 : n.address,
      to: d,
      value: typeof p < "u" && `${Vr(p)} ${((h = s == null ? void 0 : s.nativeCurrency) == null ? void 0 : h.symbol) || "ETH"}`,
      data: a,
      gas: o,
      gasPrice: typeof i < "u" && `${ee(i)} gwei`,
      maxFeePerGas: typeof c < "u" && `${ee(c)} gwei`,
      maxPriorityFeePerGas: typeof l < "u" && `${ee(l)} gwei`,
      nonce: u
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
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
function ep(e, { docsPath: t, ...n }) {
  const r = (() => {
    const s = _a(e, n);
    return s instanceof mn ? e : s;
  })();
  return new zc(r, {
    docsPath: t,
    ...n
  });
}
class jc extends k {
  constructor({ address: t }) {
    super(`State for account "${t}" is set multiple times.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "AccountStateConflictError"
    });
  }
}
class Lc extends k {
  constructor() {
    super("state and stateDiff are set on the same account."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "StateAssignmentConflictError"
    });
  }
}
function ri(e) {
  return e.reduce((t, { slot: n, value: r }) => `${t}        ${n}: ${r}
`, "");
}
function tp(e) {
  return e.reduce((t, { address: n, ...r }) => {
    let s = `${t}    ${n}:
`;
    return r.nonce && (s += `      nonce: ${r.nonce}
`), r.balance && (s += `      balance: ${r.balance}
`), r.code && (s += `      code: ${r.code}
`), r.state && (s += `      state:
`, s += ri(r.state)), r.stateDiff && (s += `      stateDiff:
`, s += ri(r.stateDiff)), s;
  }, `  State Override:
`).slice(0, -1);
}
function si(e) {
  if (!(!e || e.length === 0))
    return e.reduce((t, { slot: n, value: r }) => {
      if (n.length !== 66)
        throw new ti({
          size: n.length,
          targetSize: 66,
          type: "hex"
        });
      if (r.length !== 66)
        throw new ti({
          size: r.length,
          targetSize: 66,
          type: "hex"
        });
      return t[n] = r, t;
    }, {});
}
function np(e) {
  const { balance: t, nonce: n, state: r, stateDiff: s, code: a } = e, o = {};
  if (a !== void 0 && (o.code = a), t !== void 0 && (o.balance = S(t)), n !== void 0 && (o.nonce = S(n)), r !== void 0 && (o.state = si(r)), s !== void 0) {
    if (o.state)
      throw new Lc();
    o.stateDiff = si(s);
  }
  return o;
}
function _c(e) {
  if (!e)
    return;
  const t = {};
  for (const { address: n, ...r } of e) {
    if (!H(n, { strict: !1 }))
      throw new K({ address: n });
    if (t[n])
      throw new jc({ address: n });
    t[n] = np(r);
  }
  return t;
}
async function ct(e, t) {
  var s, a, o;
  const n = t.account ?? e.account, r = n ? ae(n) : void 0;
  try {
    const { accessList: i, blobs: c, blobVersionedHashes: l, blockNumber: u, blockTag: d, data: p, gas: f, gasPrice: h, maxFeePerBlobGas: m, maxFeePerGas: b, maxPriorityFeePerGas: y, nonce: g, to: A, value: v, stateOverride: x, ...C } = await jt(e, {
      ...t,
      parameters: (
        // Some RPC Providers do not compute versioned hashes from blobs. We will need
        // to compute them.
        (r == null ? void 0 : r.type) === "local" ? void 0 : ["blobVersionedHashes"]
      )
    }), E = (u ? S(u) : void 0) || d, T = _c(x);
    Rt(t);
    const M = (o = (a = (s = e.chain) == null ? void 0 : s.formatters) == null ? void 0 : a.transactionRequest) == null ? void 0 : o.format, N = (M || it)({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...Kr(C, { format: M }),
      from: r == null ? void 0 : r.address,
      accessList: i,
      blobs: c,
      blobVersionedHashes: l,
      data: p,
      gas: f,
      gasPrice: h,
      maxFeePerBlobGas: m,
      maxFeePerGas: b,
      maxPriorityFeePerGas: y,
      nonce: g,
      to: A,
      value: v
    }), j = await e.request({
      method: "eth_estimateGas",
      params: T ? [N, E ?? "latest", T] : E ? [N, E] : [N]
    });
    return BigInt(j);
  } catch (i) {
    throw ep(i, {
      ...t,
      account: r,
      chain: e.chain
    });
  }
}
async function ts(e, { address: t, blockTag: n = "latest", blockNumber: r }) {
  const s = await e.request({
    method: "eth_getTransactionCount",
    params: [t, r ? S(r) : n]
  }, { dedupe: !!r });
  return Q(s);
}
function ns(e) {
  const { kzg: t } = e, n = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"), r = typeof e.blobs[0] == "string" ? e.blobs.map((a) => X(a)) : e.blobs, s = [];
  for (const a of r)
    s.push(Uint8Array.from(t.blobToKzgCommitment(a)));
  return n === "bytes" ? s : s.map((a) => $(a));
}
function rs(e) {
  const { kzg: t } = e, n = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"), r = typeof e.blobs[0] == "string" ? e.blobs.map((o) => X(o)) : e.blobs, s = typeof e.commitments[0] == "string" ? e.commitments.map((o) => X(o)) : e.commitments, a = [];
  for (let o = 0; o < r.length; o++) {
    const i = r[o], c = s[o];
    a.push(Uint8Array.from(t.computeBlobKzgProof(i, c)));
  }
  return n === "bytes" ? a : a.map((o) => $(o));
}
function qa(e, t) {
  const n = t || "hex", r = kd(D(e, { strict: !1 }) ? J(e) : e);
  return n === "bytes" ? r : P(r);
}
function Qa(e) {
  const { commitment: t, version: n = 1 } = e, r = e.to ?? (typeof t == "string" ? "hex" : "bytes"), s = qa(t, "bytes");
  return s.set([n], 0), r === "bytes" ? s : $(s);
}
function Va(e) {
  const { commitments: t, version: n } = e, r = e.to ?? (typeof t[0] == "string" ? "hex" : "bytes"), s = [];
  for (const a of t)
    s.push(Qa({
      commitment: a,
      to: r,
      version: n
    }));
  return s;
}
const ai = 6, $c = 32, Ka = 4096, Hc = $c * Ka, oi = Hc * ai - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * Ka * ai, Gc = 1;
class rp extends k {
  constructor({ maxSize: t, size: n }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${t} bytes`, `Given: ${n} bytes`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BlobSizeTooLargeError"
    });
  }
}
class qc extends k {
  constructor() {
    super("Blob data must not be empty."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EmptyBlobError"
    });
  }
}
class sp extends k {
  constructor({ hash: t, size: n }) {
    super(`Versioned hash "${t}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${n}`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidVersionedHashSizeError"
    });
  }
}
class ap extends k {
  constructor({ hash: t, version: n }) {
    super(`Versioned hash "${t}" version is invalid.`, {
      metaMessages: [
        `Expected: ${Gc}`,
        `Received: ${n}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidVersionedHashVersionError"
    });
  }
}
class ii extends k {
  constructor({ offset: t }) {
    super(`Offset \`${t}\` cannot be negative.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "NegativeOffsetError"
    });
  }
}
class Qc extends k {
  constructor({ length: t, position: n }) {
    super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "PositionOutOfBoundsError"
    });
  }
}
class op extends k {
  constructor({ count: t, limit: n }) {
    super(`Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "RecursiveReadLimitExceededError"
    });
  }
}
const ip = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new op({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new Qc({
        length: this.bytes.length,
        position: e
      });
  },
  decrementPosition(e) {
    if (e < 0)
      throw new ii({ offset: e });
    const t = this.position - e;
    this.assertPosition(t), this.position = t;
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0)
      throw new ii({ offset: e });
    const t = this.position + e;
    this.assertPosition(t), this.position = t;
  },
  inspectByte(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectBytes(e, t) {
    const n = t ?? this.position;
    return this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e);
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
    this.assertReadLimit(), this._touch();
    const e = this.inspectByte();
    return this.position++, e;
  },
  readBytes(e, t) {
    this.assertReadLimit(), this._touch();
    const n = this.inspectBytes(e);
    return this.position += t ?? e, n;
  },
  readUint8() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint8();
    return this.position += 1, e;
  },
  readUint16() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint16();
    return this.position += 2, e;
  },
  readUint24() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint24();
    return this.position += 3, e;
  },
  readUint32() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint32();
    return this.position += 4, e;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(e) {
    const t = this.position;
    return this.assertPosition(e), this.position = e, () => this.position = t;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const e = this.getReadCount();
    this.positionReadCount.set(this.position, e + 1), e > 0 && this.recursiveReadCount++;
  }
};
function Bt(e, { recursiveReadLimit: t = 8192 } = {}) {
  const n = Object.create(ip);
  return n.bytes = e, n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength), n.positionReadCount = /* @__PURE__ */ new Map(), n.recursiveReadLimit = t, n;
}
function Vc(e) {
  const t = e.to ?? (typeof e.data == "string" ? "hex" : "bytes"), n = typeof e.data == "string" ? X(e.data) : e.data, r = q(n);
  if (!r)
    throw new qc();
  if (r > oi)
    throw new rp({
      maxSize: oi,
      size: r
    });
  const s = [];
  let a = !0, o = 0;
  for (; a; ) {
    const i = Bt(new Uint8Array(Hc));
    let c = 0;
    for (; c < Ka; ) {
      const l = n.slice(o, o + ($c - 1));
      if (i.pushByte(0), i.pushBytes(l), l.length < 31) {
        i.pushByte(128), a = !1;
        break;
      }
      c++, o += 31;
    }
    s.push(i);
  }
  return t === "bytes" ? s.map((i) => i.bytes) : s.map((i) => $(i.bytes));
}
function ss(e) {
  const { data: t, kzg: n, to: r } = e, s = e.blobs ?? Vc({ data: t, to: r }), a = e.commitments ?? ns({ blobs: s, kzg: n, to: r }), o = e.proofs ?? rs({ blobs: s, commitments: a, kzg: n, to: r }), i = [];
  for (let c = 0; c < s.length; c++)
    i.push({
      blob: s[c],
      commitment: a[c],
      proof: o[c]
    });
  return i;
}
function Wa(e) {
  if (e.type)
    return e.type;
  if (typeof e.blobs < "u" || typeof e.blobVersionedHashes < "u" || typeof e.maxFeePerBlobGas < "u" || typeof e.sidecars < "u")
    return "eip4844";
  if (typeof e.maxFeePerGas < "u" || typeof e.maxPriorityFeePerGas < "u")
    return "eip1559";
  if (typeof e.gasPrice < "u")
    return typeof e.accessList < "u" ? "eip2930" : "legacy";
  throw new Ic({ transaction: e });
}
const Kc = [
  "blobVersionedHashes",
  "chainId",
  "fees",
  "gas",
  "nonce",
  "type"
];
async function jt(e, t) {
  const { account: n = e.account, blobs: r, chain: s, gas: a, kzg: o, nonce: i, parameters: c = Kc, type: l } = t, u = n ? ae(n) : void 0, d = { ...t, ...u ? { from: u == null ? void 0 : u.address } : {} };
  let p;
  async function f() {
    return p || (p = await B(e, Ue, "getBlock")({ blockTag: "latest" }), p);
  }
  let h;
  async function m() {
    return h || (s ? s.id : typeof t.chainId < "u" ? t.chainId : (h = await B(e, wn, "getChainId")({}), h));
  }
  if ((c.includes("blobVersionedHashes") || c.includes("sidecars")) && r && o) {
    const b = ns({ blobs: r, kzg: o });
    if (c.includes("blobVersionedHashes")) {
      const y = Va({
        commitments: b,
        to: "hex"
      });
      d.blobVersionedHashes = y;
    }
    if (c.includes("sidecars")) {
      const y = rs({ blobs: r, commitments: b, kzg: o }), g = ss({
        blobs: r,
        commitments: b,
        proofs: y,
        to: "hex"
      });
      d.sidecars = g;
    }
  }
  if (c.includes("chainId") && (d.chainId = await m()), c.includes("nonce") && typeof i > "u" && u)
    if (u.nonceManager) {
      const b = await m();
      d.nonce = await u.nonceManager.consume({
        address: u.address,
        chainId: b,
        client: e
      });
    } else
      d.nonce = await B(e, ts, "getTransactionCount")({
        address: u.address,
        blockTag: "pending"
      });
  if ((c.includes("fees") || c.includes("type")) && typeof l > "u")
    try {
      d.type = Wa(d);
    } catch {
      const b = await f();
      d.type = typeof (b == null ? void 0 : b.baseFeePerGas) == "bigint" ? "eip1559" : "legacy";
    }
  if (c.includes("fees"))
    if (d.type !== "legacy" && d.type !== "eip2930") {
      if (typeof d.maxFeePerGas > "u" || typeof d.maxPriorityFeePerGas > "u") {
        const b = await f(), { maxFeePerGas: y, maxPriorityFeePerGas: g } = await ta(e, {
          block: b,
          chain: s,
          request: d
        });
        if (typeof t.maxPriorityFeePerGas > "u" && t.maxFeePerGas && t.maxFeePerGas < g)
          throw new Nc({
            maxPriorityFeePerGas: g
          });
        d.maxPriorityFeePerGas = g, d.maxFeePerGas = y;
      }
    } else {
      if (typeof t.maxFeePerGas < "u" || typeof t.maxPriorityFeePerGas < "u")
        throw new Jr();
      const b = await f(), { gasPrice: y } = await ta(e, {
        block: b,
        chain: s,
        request: d,
        type: "legacy"
      });
      d.gasPrice = y;
    }
  return c.includes("gas") && typeof a > "u" && (d.gas = await B(e, ct, "estimateGas")({
    ...d,
    account: u ? { address: u.address, type: "json-rpc" } : void 0
  })), Rt(d), delete d.parameters, d;
}
async function Ja(e, { serializedTransaction: t }) {
  return e.request({
    method: "eth_sendRawTransaction",
    params: [t]
  }, { retryCount: 0 });
}
async function gn(e, t) {
  var y, g, A, v;
  const { account: n = e.account, chain: r = e.chain, accessList: s, blobs: a, data: o, gas: i, gasPrice: c, maxFeePerBlobGas: l, maxFeePerGas: u, maxPriorityFeePerGas: d, nonce: p, to: f, value: h, ...m } = t;
  if (!n)
    throw new Qr({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  const b = ae(n);
  try {
    Rt(t);
    let x;
    if (r !== null && (x = await B(e, wn, "getChainId")({}), Na({
      currentChainId: x,
      chain: r
    })), b.type === "local") {
      const T = await B(e, jt, "prepareTransactionRequest")({
        account: b,
        accessList: s,
        blobs: a,
        chain: r,
        chainId: x,
        data: o,
        gas: i,
        gasPrice: c,
        maxFeePerBlobGas: l,
        maxFeePerGas: u,
        maxPriorityFeePerGas: d,
        nonce: p,
        parameters: [...Kc, "sidecars"],
        to: f,
        value: h,
        ...m
      }), M = (y = r == null ? void 0 : r.serializers) == null ? void 0 : y.transaction, L = await b.signTransaction(T, {
        serializer: M
      });
      return await B(e, Ja, "sendRawTransaction")({
        serializedTransaction: L
      });
    }
    const C = (v = (A = (g = e.chain) == null ? void 0 : g.formatters) == null ? void 0 : A.transactionRequest) == null ? void 0 : v.format, E = (C || it)({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...Kr(m, { format: C }),
      accessList: s,
      blobs: a,
      chainId: x,
      data: o,
      from: b.address,
      gas: i,
      gasPrice: c,
      maxFeePerBlobGas: l,
      maxFeePerGas: u,
      maxPriorityFeePerGas: d,
      nonce: p,
      to: f,
      value: h
    });
    return await e.request({
      method: "eth_sendTransaction",
      params: [E]
    }, { retryCount: 0 });
  } catch (x) {
    throw Yd(x, {
      ...t,
      account: b,
      chain: t.chain || void 0
    });
  }
}
function Wc(e, t) {
  const { abi: n, args: r, bytecode: s, ...a } = t, o = hn({ abi: n, args: r, bytecode: s });
  return gn(e, {
    ...a,
    data: o
  });
}
const kr = [
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
], Jc = [
  {
    inputs: [],
    name: "ResolverNotFound",
    type: "error"
  },
  {
    inputs: [],
    name: "ResolverWildcardNotSupported",
    type: "error"
  },
  {
    inputs: [],
    name: "ResolverNotContract",
    type: "error"
  },
  {
    inputs: [
      {
        name: "returnData",
        type: "bytes"
      }
    ],
    name: "ResolverError",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          {
            name: "status",
            type: "uint16"
          },
          {
            name: "message",
            type: "string"
          }
        ],
        name: "errors",
        type: "tuple[]"
      }
    ],
    name: "HttpError",
    type: "error"
  }
], Zc = [
  ...Jc,
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
  },
  {
    name: "resolve",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "bytes" },
      { name: "data", type: "bytes" },
      { name: "gateways", type: "string[]" }
    ],
    outputs: [
      { name: "", type: "bytes" },
      { name: "address", type: "address" }
    ]
  }
], cp = [
  ...Jc,
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
  },
  {
    name: "reverse",
    type: "function",
    stateMutability: "view",
    inputs: [
      { type: "bytes", name: "reverseName" },
      { type: "string[]", name: "gateways" }
    ],
    outputs: [
      { type: "string", name: "resolvedName" },
      { type: "address", name: "resolvedAddress" },
      { type: "address", name: "reverseResolver" },
      { type: "address", name: "resolver" }
    ]
  }
], ci = [
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
], li = [
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
], lp = [
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
], up = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: !0,
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        name: "spender",
        type: "address"
      },
      {
        indexed: !1,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: !0,
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint8"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  }
], dp = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: !0,
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        name: "spender",
        type: "address"
      },
      {
        indexed: !1,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: !0,
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        name: "value",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint8"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "bytes32"
      }
    ]
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "bytes32"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  }
], pp = [
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        indexed: !0,
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        name: "spender",
        type: "address"
      },
      {
        indexed: !0,
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        indexed: !0,
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        name: "operator",
        type: "address"
      },
      {
        indexed: !1,
        name: "approved",
        type: "bool"
      }
    ]
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        indexed: !0,
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        name: "to",
        type: "address"
      },
      {
        indexed: !0,
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "payable",
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "getApproved",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "isApprovedForAll",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "operator",
        type: "address"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "ownerOf",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "owner",
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "payable",
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "id",
        type: "uint256"
      },
      {
        name: "data",
        type: "bytes"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "setApprovalForAll",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "operator",
        type: "address"
      },
      {
        name: "approved",
        type: "bool"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "tokenByIndex",
    stateMutability: "view",
    inputs: [
      {
        name: "index",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "tokenByIndex",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "index",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "tokenURI",
    stateMutability: "view",
    inputs: [
      {
        name: "tokenId",
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "string"
      }
    ]
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "payable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "tokeId",
        type: "uint256"
      }
    ],
    outputs: []
  }
], fp = [
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        name: "spender",
        type: "address"
      },
      {
        indexed: !1,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        name: "sender",
        type: "address"
      },
      {
        indexed: !0,
        name: "receiver",
        type: "address"
      },
      {
        indexed: !1,
        name: "assets",
        type: "uint256"
      },
      {
        indexed: !1,
        name: "shares",
        type: "uint256"
      }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        name: "sender",
        type: "address"
      },
      {
        indexed: !0,
        name: "receiver",
        type: "address"
      },
      {
        indexed: !0,
        name: "owner",
        type: "address"
      },
      {
        indexed: !1,
        name: "assets",
        type: "uint256"
      },
      {
        indexed: !1,
        name: "shares",
        type: "uint256"
      }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        name: "assetTokenAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "convertToAssets",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "convertToShares",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      }
    ],
    name: "deposit",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "caller",
        type: "address"
      }
    ],
    name: "maxDeposit",
    outputs: [
      {
        name: "maxAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "caller",
        type: "address"
      }
    ],
    name: "maxMint",
    outputs: [
      {
        name: "maxShares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "maxRedeem",
    outputs: [
      {
        name: "maxShares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "maxWithdraw",
    outputs: [
      {
        name: "maxAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      }
    ],
    name: "mint",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "previewDeposit",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "previewMint",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    name: "previewRedeem",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    name: "previewWithdraw",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "shares",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      },
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "redeem",
    outputs: [
      {
        name: "assets",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [
      {
        name: "totalManagedAssets",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "to",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "assets",
        type: "uint256"
      },
      {
        name: "receiver",
        type: "address"
      },
      {
        name: "owner",
        type: "address"
      }
    ],
    name: "withdraw",
    outputs: [
      {
        name: "shares",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
function hp(e, t) {
  const n = typeof t == "string" ? { to: t } : t, r = n.to;
  return r === "number" ? ye(e, n) : r === "bigint" ? Za(e, n) : r === "boolean" ? Xa(e, n) : r === "string" ? Ya(e, n) : $(e, n);
}
function Za(e, t = {}) {
  typeof t.size < "u" && he(e, { size: t.size });
  const n = $(e, t);
  return F(n, t);
}
function Xa(e, t = {}) {
  let n = e;
  if (typeof t.size < "u" && (he(n, { size: t.size }), n = Z(n)), n.length > 1 || n[0] > 1)
    throw new nc(n);
  return !!n[0];
}
function ye(e, t = {}) {
  typeof t.size < "u" && he(e, { size: t.size });
  const n = $(e, t);
  return Q(n, t);
}
function Ya(e, t = {}) {
  let n = e;
  return typeof t.size < "u" && (he(n, { size: t.size }), n = Z(n, { dir: "right" })), new TextDecoder().decode(n);
}
function Ge(e, t) {
  const n = typeof t == "string" ? X(t) : t, r = Bt(n);
  if (q(n) === 0 && e.length > 0)
    throw new pn();
  if (q(t) && q(t) < 32)
    throw new Aa({
      data: typeof t == "string" ? t : $(t),
      params: e,
      size: q(t)
    });
  let s = 0;
  const a = [];
  for (let o = 0; o < e.length; ++o) {
    const i = e[o];
    r.setPosition(s);
    const [c, l] = wt(r, i, {
      staticPosition: 0
    });
    s += l, a.push(c);
  }
  return a;
}
function wt(e, t, { staticPosition: n }) {
  const r = Ma(t.type);
  if (r) {
    const [s, a] = r;
    return bp(e, { ...t, type: a }, { length: s, staticPosition: n });
  }
  if (t.type === "tuple")
    return vp(e, t, { staticPosition: n });
  if (t.type === "address")
    return mp(e);
  if (t.type === "bool")
    return yp(e);
  if (t.type.startsWith("bytes"))
    return wp(e, t, { staticPosition: n });
  if (t.type.startsWith("uint") || t.type.startsWith("int"))
    return gp(e, t);
  if (t.type === "string")
    return Cp(e, { staticPosition: n });
  throw new bc(t.type, {
    docsPath: "/docs/contract/decodeAbiParameters"
  });
}
const ui = 32, na = 32;
function mp(e) {
  const t = e.readBytes(32);
  return [Dt($(Pa(t, -20))), 32];
}
function bp(e, t, { length: n, staticPosition: r }) {
  if (!n) {
    const o = ye(e.readBytes(na)), i = r + o, c = i + ui;
    e.setPosition(i);
    const l = ye(e.readBytes(ui)), u = nn(t);
    let d = 0;
    const p = [];
    for (let f = 0; f < l; ++f) {
      e.setPosition(c + (u ? f * 32 : d));
      const [h, m] = wt(e, t, {
        staticPosition: c
      });
      d += m, p.push(h);
    }
    return e.setPosition(r + 32), [p, 32];
  }
  if (nn(t)) {
    const o = ye(e.readBytes(na)), i = r + o, c = [];
    for (let l = 0; l < n; ++l) {
      e.setPosition(i + l * 32);
      const [u] = wt(e, t, {
        staticPosition: i
      });
      c.push(u);
    }
    return e.setPosition(r + 32), [c, 32];
  }
  let s = 0;
  const a = [];
  for (let o = 0; o < n; ++o) {
    const [i, c] = wt(e, t, {
      staticPosition: r + s
    });
    s += c, a.push(i);
  }
  return [a, s];
}
function yp(e) {
  return [Xa(e.readBytes(32), { size: 32 }), 32];
}
function wp(e, t, { staticPosition: n }) {
  const [r, s] = t.type.split("bytes");
  if (!s) {
    const o = ye(e.readBytes(32));
    e.setPosition(n + o);
    const i = ye(e.readBytes(32));
    if (i === 0)
      return e.setPosition(n + 32), ["0x", 32];
    const c = e.readBytes(i);
    return e.setPosition(n + 32), [$(c), 32];
  }
  return [$(e.readBytes(Number.parseInt(s), 32)), 32];
}
function gp(e, t) {
  const n = t.type.startsWith("int"), r = Number.parseInt(t.type.split("int")[1] || "256"), s = e.readBytes(32);
  return [
    r > 48 ? Za(s, { signed: n }) : ye(s, { signed: n }),
    32
  ];
}
function vp(e, t, { staticPosition: n }) {
  const r = t.components.length === 0 || t.components.some(({ name: o }) => !o), s = r ? [] : {};
  let a = 0;
  if (nn(t)) {
    const o = ye(e.readBytes(na)), i = n + o;
    for (let c = 0; c < t.components.length; ++c) {
      const l = t.components[c];
      e.setPosition(i + a);
      const [u, d] = wt(e, l, {
        staticPosition: i
      });
      a += d, s[r ? c : l == null ? void 0 : l.name] = u;
    }
    return e.setPosition(n + 32), [s, 32];
  }
  for (let o = 0; o < t.components.length; ++o) {
    const i = t.components[o], [c, l] = wt(e, i, {
      staticPosition: n
    });
    s[r ? o : i == null ? void 0 : i.name] = c, a += l;
  }
  return [s, a];
}
function Cp(e, { staticPosition: t }) {
  const n = ye(e.readBytes(32)), r = t + n;
  e.setPosition(r);
  const s = ye(e.readBytes(32));
  if (s === 0)
    return e.setPosition(t + 32), ["", 32];
  const a = e.readBytes(s, 32), o = Ya(Z(a));
  return e.setPosition(t + 32), [o, 32];
}
function nn(e) {
  var r;
  const { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]"))
    return !0;
  if (t === "tuple")
    return (r = e.components) == null ? void 0 : r.some(nn);
  const n = Ma(e.type);
  return !!(n && nn({ ...e, type: n[1] }));
}
const xp = (e) => V(J(e));
function Ap(e) {
  return xp(e);
}
const kp = "1.0.4";
let ne = class ra extends Error {
  constructor(t, n = {}) {
    var o;
    const r = n.cause instanceof ra ? n.cause.details : (o = n.cause) != null && o.message ? n.cause.message : n.details, s = n.cause instanceof ra && n.cause.docsPath || n.docsPath, a = [
      t || "An error occurred.",
      "",
      ...n.metaMessages ? [...n.metaMessages, ""] : [],
      ...s ? [`Docs: https://abitype.dev${s}`] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: abitype@${kp}`
    ].join(`
`);
    super(a), Object.defineProperty(this, "details", {
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
    }), n.cause && (this.cause = n.cause), this.details = r, this.docsPath = s, this.metaMessages = n.metaMessages, this.shortMessage = t;
  }
};
function qe(e, t) {
  const n = e.exec(t);
  return n == null ? void 0 : n.groups;
}
const Xc = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, Yc = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/, el = /^\(.+?\).*?$/, di = /^tuple(?<array>(\[(\d*)\])*)$/;
function sa(e) {
  let t = e.type;
  if (di.test(e.type) && "components" in e) {
    t = "(";
    const n = e.components.length;
    for (let s = 0; s < n; s++) {
      const a = e.components[s];
      t += sa(a), s < n - 1 && (t += ", ");
    }
    const r = qe(di, e.type);
    return t += `)${(r == null ? void 0 : r.array) ?? ""}`, sa({
      ...e,
      type: t
    });
  }
  return "indexed" in e && e.indexed && (t = `${t} indexed`), e.name ? `${t} ${e.name}` : t;
}
function qt(e) {
  let t = "";
  const n = e.length;
  for (let r = 0; r < n; r++) {
    const s = e[r];
    t += sa(s), r !== n - 1 && (t += ", ");
  }
  return t;
}
function Ep(e) {
  return e.type === "function" ? `function ${e.name}(${qt(e.inputs)})${e.stateMutability && e.stateMutability !== "nonpayable" ? ` ${e.stateMutability}` : ""}${e.outputs.length ? ` returns (${qt(e.outputs)})` : ""}` : e.type === "event" ? `event ${e.name}(${qt(e.inputs)})` : e.type === "error" ? `error ${e.name}(${qt(e.inputs)})` : e.type === "constructor" ? `constructor(${qt(e.inputs)})${e.stateMutability === "payable" ? " payable" : ""}` : e.type === "fallback" ? "fallback()" : "receive() external payable";
}
const tl = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function Ip(e) {
  return tl.test(e);
}
function Sp(e) {
  return qe(tl, e);
}
const nl = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function Tp(e) {
  return nl.test(e);
}
function Pp(e) {
  return qe(nl, e);
}
const rl = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function Bp(e) {
  return rl.test(e);
}
function Up(e) {
  return qe(rl, e);
}
const sl = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function vn(e) {
  return sl.test(e);
}
function Mp(e) {
  return qe(sl, e);
}
const al = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function Fp(e) {
  return al.test(e);
}
function Np(e) {
  return qe(al, e);
}
const Dp = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function Op(e) {
  return Dp.test(e);
}
const Rp = /^receive\(\) external payable$/;
function zp(e) {
  return Rp.test(e);
}
const Er = /* @__PURE__ */ new Set([
  "memory",
  "indexed",
  "storage",
  "calldata"
]), jp = /* @__PURE__ */ new Set(["indexed"]), aa = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);
class ol extends ne {
  constructor({ signature: t }) {
    super("Failed to parse ABI item.", {
      details: `parseAbiItem(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human#parseabiitem-1"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiItemError"
    });
  }
}
class il extends ne {
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
class Lp extends ne {
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
class cl extends ne {
  constructor({ param: t }) {
    super("Failed to parse ABI parameter.", {
      details: `parseAbiParameter(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human#parseabiparameter-1"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiParameterError"
    });
  }
}
class ll extends ne {
  constructor({ params: t }) {
    super("Failed to parse ABI parameters.", {
      details: `parseAbiParameters(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human#parseabiparameters-1"
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiParametersError"
    });
  }
}
class ul extends ne {
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
class dl extends ne {
  constructor({ param: t, name: n }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `"${n}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SolidityProtectedKeywordError"
    });
  }
}
class pl extends ne {
  constructor({ param: t, type: n, modifier: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidModifierError"
    });
  }
}
class fl extends ne {
  constructor({ param: t, type: n, modifier: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${r}" was given.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidFunctionModifierError"
    });
  }
}
class hl extends ne {
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
class bt extends ne {
  constructor({ signature: t, type: n }) {
    super(`Invalid ${n} signature.`, {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidSignatureError"
    });
  }
}
class ml extends ne {
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
class bl extends ne {
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
class yl extends ne {
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
class wl extends ne {
  constructor({ current: t, depth: n }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${t.trim()}" has too many ${n > 0 ? "opening" : "closing"} parentheses.`
      ],
      details: `Depth "${n}"`
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidParenthesisError"
    });
  }
}
function _p(e, t) {
  return t ? `${t}:${e}` : e;
}
const Fs = /* @__PURE__ */ new Map([
  // Unnamed
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
  // Named
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
  // Indexed
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
function oa(e, t = {}) {
  if (Bp(e)) {
    const n = Up(e);
    if (!n)
      throw new bt({ signature: e, type: "function" });
    const r = ie(n.parameters), s = [], a = r.length;
    for (let i = 0; i < a; i++)
      s.push(me(r[i], {
        modifiers: aa,
        structs: t,
        type: "function"
      }));
    const o = [];
    if (n.returns) {
      const i = ie(n.returns), c = i.length;
      for (let l = 0; l < c; l++)
        o.push(me(i[l], {
          modifiers: aa,
          structs: t,
          type: "function"
        }));
    }
    return {
      name: n.name,
      type: "function",
      stateMutability: n.stateMutability ?? "nonpayable",
      inputs: s,
      outputs: o
    };
  }
  if (Tp(e)) {
    const n = Pp(e);
    if (!n)
      throw new bt({ signature: e, type: "event" });
    const r = ie(n.parameters), s = [], a = r.length;
    for (let o = 0; o < a; o++)
      s.push(me(r[o], {
        modifiers: jp,
        structs: t,
        type: "event"
      }));
    return { name: n.name, type: "event", inputs: s };
  }
  if (Ip(e)) {
    const n = Sp(e);
    if (!n)
      throw new bt({ signature: e, type: "error" });
    const r = ie(n.parameters), s = [], a = r.length;
    for (let o = 0; o < a; o++)
      s.push(me(r[o], { structs: t, type: "error" }));
    return { name: n.name, type: "error", inputs: s };
  }
  if (Fp(e)) {
    const n = Np(e);
    if (!n)
      throw new bt({ signature: e, type: "constructor" });
    const r = ie(n.parameters), s = [], a = r.length;
    for (let o = 0; o < a; o++)
      s.push(me(r[o], { structs: t, type: "constructor" }));
    return {
      type: "constructor",
      stateMutability: n.stateMutability ?? "nonpayable",
      inputs: s
    };
  }
  if (Op(e))
    return { type: "fallback" };
  if (zp(e))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new ml({ signature: e });
}
const $p = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, Hp = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, Gp = /^u?int$/;
function me(e, t) {
  var d, p;
  const n = _p(e, t == null ? void 0 : t.type);
  if (Fs.has(n))
    return Fs.get(n);
  const r = el.test(e), s = qe(r ? Hp : $p, e);
  if (!s)
    throw new ul({ param: e });
  if (s.name && Qp(s.name))
    throw new dl({ param: e, name: s.name });
  const a = s.name ? { name: s.name } : {}, o = s.modifier === "indexed" ? { indexed: !0 } : {}, i = (t == null ? void 0 : t.structs) ?? {};
  let c, l = {};
  if (r) {
    c = "tuple";
    const f = ie(s.type), h = [], m = f.length;
    for (let b = 0; b < m; b++)
      h.push(me(f[b], { structs: i }));
    l = { components: h };
  } else if (s.type in i)
    c = "tuple", l = { components: i[s.type] };
  else if (Gp.test(s.type))
    c = `${s.type}256`;
  else if (c = s.type, (t == null ? void 0 : t.type) !== "struct" && !gl(c))
    throw new Lp({ type: c });
  if (s.modifier) {
    if (!((p = (d = t == null ? void 0 : t.modifiers) == null ? void 0 : d.has) != null && p.call(d, s.modifier)))
      throw new pl({
        param: e,
        type: t == null ? void 0 : t.type,
        modifier: s.modifier
      });
    if (aa.has(s.modifier) && !Vp(c, !!s.array))
      throw new fl({
        param: e,
        type: t == null ? void 0 : t.type,
        modifier: s.modifier
      });
  }
  const u = {
    type: `${c}${s.array ?? ""}`,
    ...a,
    ...o,
    ...l
  };
  return Fs.set(n, u), u;
}
function ie(e, t = [], n = "", r = 0) {
  const s = e.trim().length;
  for (let a = 0; a < s; a++) {
    const o = e[a], i = e.slice(a + 1);
    switch (o) {
      case ",":
        return r === 0 ? ie(i, [...t, n.trim()]) : ie(i, t, `${n}${o}`, r);
      case "(":
        return ie(i, t, `${n}${o}`, r + 1);
      case ")":
        return ie(i, t, `${n}${o}`, r - 1);
      default:
        return ie(i, t, `${n}${o}`, r);
    }
  }
  if (n === "")
    return t;
  if (r !== 0)
    throw new wl({ current: n, depth: r });
  return t.push(n.trim()), t;
}
function gl(e) {
  return e === "address" || e === "bool" || e === "function" || e === "string" || Xc.test(e) || Yc.test(e);
}
const qp = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function Qp(e) {
  return e === "address" || e === "bool" || e === "function" || e === "string" || e === "tuple" || Xc.test(e) || Yc.test(e) || qp.test(e);
}
function Vp(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
function as(e) {
  const t = {}, n = e.length;
  for (let o = 0; o < n; o++) {
    const i = e[o];
    if (!vn(i))
      continue;
    const c = Mp(i);
    if (!c)
      throw new bt({ signature: i, type: "struct" });
    const l = c.properties.split(";"), u = [], d = l.length;
    for (let p = 0; p < d; p++) {
      const h = l[p].trim();
      if (!h)
        continue;
      const m = me(h, {
        type: "struct"
      });
      u.push(m);
    }
    if (!u.length)
      throw new bl({ signature: i });
    t[c.name] = u;
  }
  const r = {}, s = Object.entries(t), a = s.length;
  for (let o = 0; o < a; o++) {
    const [i, c] = s[o];
    r[i] = vl(c, t);
  }
  return r;
}
const Kp = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function vl(e, t, n = /* @__PURE__ */ new Set()) {
  const r = [], s = e.length;
  for (let a = 0; a < s; a++) {
    const o = e[a];
    if (el.test(o.type))
      r.push(o);
    else {
      const c = qe(Kp, o.type);
      if (!(c != null && c.type))
        throw new hl({ abiParameter: o });
      const { array: l, type: u } = c;
      if (u in t) {
        if (n.has(u))
          throw new yl({ type: u });
        r.push({
          ...o,
          type: `tuple${l ?? ""}`,
          components: vl(t[u] ?? [], t, /* @__PURE__ */ new Set([...n, u]))
        });
      } else if (gl(u))
        r.push(o);
      else
        throw new il({ type: u });
    }
  }
  return r;
}
function eo(e) {
  const t = as(e), n = [], r = e.length;
  for (let s = 0; s < r; s++) {
    const a = e[s];
    vn(a) || n.push(oa(a, t));
  }
  return n;
}
function Wp(e) {
  let t;
  if (typeof e == "string")
    t = oa(e);
  else {
    const n = as(e), r = e.length;
    for (let s = 0; s < r; s++) {
      const a = e[s];
      if (!vn(a)) {
        t = oa(a, n);
        break;
      }
    }
  }
  if (!t)
    throw new ol({ signature: e });
  return t;
}
function Jp(e) {
  let t;
  if (typeof e == "string")
    t = me(e, {
      modifiers: Er
    });
  else {
    const n = as(e), r = e.length;
    for (let s = 0; s < r; s++) {
      const a = e[s];
      if (!vn(a)) {
        t = me(a, { modifiers: Er, structs: n });
        break;
      }
    }
  }
  if (!t)
    throw new cl({ param: e });
  return t;
}
function Zp(e) {
  const t = [];
  if (typeof e == "string") {
    const n = ie(e), r = n.length;
    for (let s = 0; s < r; s++)
      t.push(me(n[s], { modifiers: Er }));
  } else {
    const n = as(e), r = e.length;
    for (let s = 0; s < r; s++) {
      const a = e[s];
      if (vn(a))
        continue;
      const o = ie(a), i = o.length;
      for (let c = 0; c < i; c++)
        t.push(me(o[c], { modifiers: Er, structs: n }));
    }
  }
  if (t.length === 0)
    throw new ll({ params: e });
  return t;
}
function Xp(e) {
  let t = !0, n = "", r = 0, s = "", a = !1;
  for (let o = 0; o < e.length; o++) {
    const i = e[o];
    if (["(", ")", ","].includes(i) && (t = !0), i === "(" && r++, i === ")" && r--, !!t) {
      if (r === 0) {
        if (i === " " && ["event", "function", ""].includes(s))
          s = "";
        else if (s += i, i === ")") {
          a = !0;
          break;
        }
        continue;
      }
      if (i === " ") {
        e[o - 1] !== "," && n !== "," && n !== ",(" && (n = "", t = !1);
        continue;
      }
      s += i, n += i;
    }
  }
  if (!a)
    throw new k("Unable to normalize signature.");
  return s;
}
const Kt = (e) => {
  const t = typeof e == "string" ? e : Ep(e);
  return Xp(t);
};
function Ir(e) {
  return Ap(Kt(e));
}
const rn = Ir, st = (e) => Pe(Ir(e), 0, 4);
function Qe(e) {
  const { abi: t, args: n = [], name: r } = e, s = D(r, { strict: !1 }), a = t.filter((i) => s ? i.type === "function" ? st(i) === r : i.type === "event" ? rn(i) === r : !1 : "name" in i && i.name === r);
  if (a.length === 0)
    return;
  if (a.length === 1)
    return a[0];
  let o;
  for (const i of a) {
    if (!("inputs" in i))
      continue;
    if (!n || n.length === 0) {
      if (!i.inputs || i.inputs.length === 0)
        return i;
      continue;
    }
    if (!i.inputs || i.inputs.length === 0 || i.inputs.length !== n.length)
      continue;
    if (n.every((l, u) => {
      const d = "inputs" in i && i.inputs[u];
      return d ? ia(l, d) : !1;
    })) {
      if (o && "inputs" in o && o.inputs) {
        const l = Cl(i.inputs, o.inputs, n);
        if (l)
          throw new $d({
            abiItem: i,
            type: l[0]
          }, {
            abiItem: o,
            type: l[1]
          });
      }
      o = i;
    }
  }
  return o || a[0];
}
function ia(e, t) {
  const n = typeof e, r = t.type;
  switch (r) {
    case "address":
      return H(e, { strict: !1 });
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return r === "tuple" && "components" in t ? Object.values(t.components).every((s, a) => ia(Object.values(e)[a], s)) : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(r) ? n === "number" || n === "bigint" : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r) ? n === "string" || e instanceof Uint8Array : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r) ? Array.isArray(e) && e.every((s) => ia(s, {
        ...t,
        // Pop off `[]` or `[M]` from end of type
        type: r.replace(/(\[[0-9]{0,}\])$/, "")
      })) : !1;
  }
}
function Cl(e, t, n) {
  for (const r in e) {
    const s = e[r], a = t[r];
    if (s.type === "tuple" && a.type === "tuple" && "components" in s && "components" in a)
      return Cl(s.components, a.components, n[r]);
    const o = [s.type, a.type];
    if (o.includes("address") && o.includes("bytes20") ? !0 : o.includes("address") && o.includes("string") ? H(n[r], { strict: !1 }) : o.includes("address") && o.includes("bytes") ? H(n[r], { strict: !1 }) : !1)
      return o;
  }
}
const Ns = "/docs/contract/decodeFunctionResult";
function lt(e) {
  const { abi: t, args: n, functionName: r, data: s } = e;
  let a = t[0];
  if (r) {
    const i = Qe({ abi: t, args: n, name: r });
    if (!i)
      throw new Ye(r, { docsPath: Ns });
    a = i;
  }
  if (a.type !== "function")
    throw new Ye(void 0, { docsPath: Ns });
  if (!a.outputs)
    throw new Sa(a.name, { docsPath: Ns });
  const o = Ge(a.outputs, s);
  if (o && o.length > 1)
    return o;
  if (o && o.length === 1)
    return o[0];
}
const pi = "/docs/contract/encodeFunctionData";
function xl(e) {
  const { abi: t, args: n, functionName: r } = e;
  let s = t[0];
  if (r) {
    const a = Qe({
      abi: t,
      args: n,
      name: r
    });
    if (!a)
      throw new Ye(r, { docsPath: pi });
    s = a;
  }
  if (s.type !== "function")
    throw new Ye(void 0, { docsPath: pi });
  return {
    abi: [s],
    functionName: st(we(s))
  };
}
function Me(e) {
  const { args: t } = e, { abi: n, functionName: r } = (() => {
    var i;
    return e.abi.length === 1 && ((i = e.functionName) != null && i.startsWith("0x")) ? e : xl(e);
  })(), s = n[0], a = r, o = "inputs" in s && s.inputs ? Ae(s.inputs, t ?? []) : void 0;
  return se([a, o ?? "0x"]);
}
function ut({ blockNumber: e, chain: t, contract: n }) {
  var s;
  const r = (s = t == null ? void 0 : t.contracts) == null ? void 0 : s[n];
  if (!r)
    throw new hr({
      chain: t,
      contract: { name: n }
    });
  if (e && r.blockCreated && r.blockCreated > e)
    throw new hr({
      blockNumber: e,
      chain: t,
      contract: {
        name: n,
        blockCreated: r.blockCreated
      }
    });
  return r.address;
}
const Al = {
  1: "An `assert` condition failed.",
  17: "Arithmetic operation resulted in underflow or overflow.",
  18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
  33: "Attempted to convert to an invalid type.",
  34: "Attempted to access a storage byte array that is incorrectly encoded.",
  49: "Performed `.pop()` on an empty array",
  50: "Array index is out of bounds.",
  65: "Allocated too much memory or created an array which is too large.",
  81: "Attempted to call a zero-initialized variable of internal function type."
}, Yp = {
  inputs: [
    {
      name: "message",
      type: "string"
    }
  ],
  name: "Error",
  type: "error"
}, ef = {
  inputs: [
    {
      name: "reason",
      type: "uint256"
    }
  ],
  name: "Panic",
  type: "error"
};
function to(e) {
  const { abi: t, data: n } = e, r = Pe(n, 0, 4);
  if (r === "0x")
    throw new pn();
  const a = [...t || [], Yp, ef].find((o) => o.type === "error" && r === st(we(o)));
  if (!a)
    throw new Ea(r, {
      docsPath: "/docs/contract/decodeErrorResult"
    });
  return {
    abiItem: a,
    args: "inputs" in a && a.inputs && a.inputs.length > 0 ? Ge(a.inputs, Pe(n, 4)) : void 0,
    errorName: a.name
  };
}
function kl({ abiItem: e, args: t, includeFunctionName: n = !0, includeName: r = !1 }) {
  if ("name" in e && "inputs" in e && e.inputs)
    return `${n ? e.name : ""}(${e.inputs.map((s, a) => `${r && s.name ? `${s.name}: ` : ""}${typeof t[a] == "object" ? W(t[a]) : t[a]}`).join(", ")})`;
}
class no extends k {
  constructor(t, { account: n, docsPath: r, chain: s, data: a, gas: o, gasPrice: i, maxFeePerGas: c, maxPriorityFeePerGas: l, nonce: u, to: d, value: p, stateOverride: f }) {
    var b;
    const h = n ? ae(n) : void 0;
    let m = bn({
      from: h == null ? void 0 : h.address,
      to: d,
      value: typeof p < "u" && `${Vr(p)} ${((b = s == null ? void 0 : s.nativeCurrency) == null ? void 0 : b.symbol) || "ETH"}`,
      data: a,
      gas: o,
      gasPrice: typeof i < "u" && `${ee(i)} gwei`,
      maxFeePerGas: typeof c < "u" && `${ee(c)} gwei`,
      maxPriorityFeePerGas: typeof l < "u" && `${ee(l)} gwei`,
      nonce: u
    });
    f && (m += `
${tp(f)}`), super(t.shortMessage, {
      cause: t,
      docsPath: r,
      metaMessages: [
        ...t.metaMessages ? [...t.metaMessages, " "] : [],
        "Raw Call Arguments:",
        m
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
class Se extends k {
  constructor(t, { abi: n, args: r, contractAddress: s, docsPath: a, functionName: o, sender: i }) {
    const c = Qe({ abi: n, args: r, name: o }), l = c ? kl({
      abiItem: c,
      args: r,
      includeFunctionName: !1,
      includeName: !1
    }) : void 0, u = c ? we(c, { includeName: !0 }) : void 0, d = bn({
      address: s && Nd(s),
      function: u,
      args: l && l !== "()" && `${[...Array((o == null ? void 0 : o.length) ?? 0).keys()].map(() => " ").join("")}${l}`,
      sender: i
    });
    super(t.shortMessage || `An unknown error occurred while executing the contract function "${o}".`, {
      cause: t,
      docsPath: a,
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
    }), this.abi = n, this.args = r, this.cause = t, this.contractAddress = s, this.functionName = o, this.sender = i;
  }
}
class Sr extends k {
  constructor({ abi: t, data: n, functionName: r, message: s }) {
    let a, o, i, c;
    if (n && n !== "0x")
      try {
        o = to({ abi: t, data: n });
        const { abiItem: u, errorName: d, args: p } = o;
        if (d === "Error")
          c = p[0];
        else if (d === "Panic") {
          const [f] = p;
          c = Al[f];
        } else {
          const f = u ? we(u, { includeName: !0 }) : void 0, h = u && p ? kl({
            abiItem: u,
            args: p,
            includeFunctionName: !1,
            includeName: !1
          }) : void 0;
          i = [
            f ? `Error: ${f}` : "",
            h && h !== "()" ? `       ${[...Array((d == null ? void 0 : d.length) ?? 0).keys()].map(() => " ").join("")}${h}` : ""
          ];
        }
      } catch (u) {
        a = u;
      }
    else
      s && (c = s);
    let l;
    a instanceof Ea && (l = a.signature, i = [
      `Unable to decode signature "${l}" as it was not found on the provided ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it.",
      `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${l}.`
    ]), super(c && c !== "execution reverted" || l ? [
      `The contract function "${r}" reverted with the following ${l ? "signature" : "reason"}:`,
      c || l
    ].join(`
`) : `The contract function "${r}" reverted.`, {
      cause: a,
      metaMessages: i
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
    }), this.data = o, this.reason = c, this.signature = l;
  }
}
class El extends k {
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
class Il extends k {
  constructor({ factory: t }) {
    super(`Deployment for counterfactual contract call failed${t ? ` for factory "${t}".` : ""}`, {
      metaMessages: [
        "Please ensure:",
        "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
        "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "CounterfactualDeploymentFailedError"
    });
  }
}
class os extends k {
  constructor({ data: t, message: n }) {
    super(n || ""), Object.defineProperty(this, "code", {
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
function ro(e, t) {
  var r, s, a, o, i, c;
  if (!(e instanceof k))
    return !1;
  const n = e.walk((l) => l instanceof Sr);
  return n instanceof Sr ? !!(((r = n.data) == null ? void 0 : r.errorName) === "ResolverNotFound" || ((s = n.data) == null ? void 0 : s.errorName) === "ResolverWildcardNotSupported" || ((a = n.data) == null ? void 0 : a.errorName) === "ResolverNotContract" || ((o = n.data) == null ? void 0 : o.errorName) === "ResolverError" || ((i = n.data) == null ? void 0 : i.errorName) === "HttpError" || (c = n.reason) != null && c.includes("Wildcard on non-extended resolvers is not supported") || t === "reverse" && n.reason === Al[50]) : !1;
}
function Sl(e) {
  if (e.length !== 66 || e.indexOf("[") !== 0 || e.indexOf("]") !== 65)
    return null;
  const t = `0x${e.slice(1, 65)}`;
  return D(t) ? t : null;
}
function Zt(e) {
  let t = new Uint8Array(32).fill(0);
  if (!e)
    return $(t);
  const n = e.split(".");
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = Sl(n[r]), a = s ? J(s) : V(De(n[r]), "bytes");
    t = V(ue([t, a]), "bytes");
  }
  return $(t);
}
function tf(e) {
  return `[${e.slice(2)}]`;
}
function Tl(e) {
  const t = new Uint8Array(32).fill(0);
  return e ? Sl(e) || V(De(e)) : $(t);
}
function is(e) {
  const t = e.replace(/^\.|\.$/gm, "");
  if (t.length === 0)
    return new Uint8Array(1);
  const n = new Uint8Array(De(t).byteLength + 2);
  let r = 0;
  const s = t.split(".");
  for (let a = 0; a < s.length; a++) {
    let o = De(s[a]);
    o.byteLength > 255 && (o = De(tf(Tl(s[a])))), n[r] = o.length, n.set(o, r + 1), r += o.length + 1;
  }
  return n.byteLength !== r + 1 ? n.slice(0, r + 1) : n;
}
const nf = 3;
function Ut(e, { abi: t, address: n, args: r, docsPath: s, functionName: a, sender: o }) {
  const { code: i, data: c, message: l, shortMessage: u } = e instanceof os ? e : e instanceof k ? e.walk((p) => "data" in p) || e.walk() : {}, d = e instanceof pn ? new El({ functionName: a }) : [nf, ze.code].includes(i) && (c || l || u) ? new Sr({
    abi: t,
    data: typeof c == "object" ? c.data : c,
    functionName: a,
    message: u ?? l
  }) : e;
  return new Se(d, {
    abi: t,
    args: r,
    contractAddress: n,
    docsPath: s,
    functionName: a,
    sender: o
  });
}
const rf = "0x82ad56cb", sf = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe", af = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe", of = "0x60806040523480156200001157600080fd5b50604051620007003803806200070083398101604081905262000034916200056f565b6000620000438484846200004f565b9050806000526001601ff35b600080846001600160a01b0316803b806020016040519081016040528181526000908060200190933c90507f6492649264926492649264926492649264926492649264926492649264926492620000a68462000451565b036200021f57600060608085806020019051810190620000c79190620005ce565b8651929550909350915060000362000192576000836001600160a01b031683604051620000f5919062000643565b6000604051808303816000865af19150503d806000811462000134576040519150601f19603f3d011682016040523d82523d6000602084013e62000139565b606091505b5050905080620001905760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b505b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90620001c4908b90869060040162000661565b602060405180830381865afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200020891906200069d565b6001600160e01b031916149450505050506200044a565b805115620002b157604051630b135d3f60e11b808252906001600160a01b03871690631626ba7e9062000259908890889060040162000661565b602060405180830381865afa15801562000277573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029d91906200069d565b6001600160e01b031916149150506200044a565b8251604114620003195760405162461bcd60e51b815260206004820152603a6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e677468000000000000606482015260840162000187565b620003236200046b565b506020830151604080850151855186939260009185919081106200034b576200034b620006c9565b016020015160f81c9050601b81148015906200036b57508060ff16601c14155b15620003cf5760405162461bcd60e51b815260206004820152603b6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c75650000000000606482015260840162000187565b6040805160008152602081018083528a905260ff83169181019190915260608101849052608081018390526001600160a01b038a169060019060a0016020604051602081039080840390855afa1580156200042e573d6000803e3d6000fd5b505050602060405103516001600160a01b031614955050505050505b9392505050565b60006020825110156200046357600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b03811681146200049f57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620004d5578181015183820152602001620004bb565b50506000910152565b600082601f830112620004f057600080fd5b81516001600160401b03808211156200050d576200050d620004a2565b604051601f8301601f19908116603f01168101908282118183101715620005385762000538620004a2565b816040528381528660208588010111156200055257600080fd5b62000565846020830160208901620004b8565b9695505050505050565b6000806000606084860312156200058557600080fd5b8351620005928162000489565b6020850151604086015191945092506001600160401b03811115620005b657600080fd5b620005c486828701620004de565b9150509250925092565b600080600060608486031215620005e457600080fd5b8351620005f18162000489565b60208501519093506001600160401b03808211156200060f57600080fd5b6200061d87838801620004de565b935060408601519150808211156200063457600080fd5b50620005c486828701620004de565b6000825162000657818460208701620004b8565b9190910192915050565b828152604060208201526000825180604084015262000688816060850160208701620004b8565b601f01601f1916919091016060019392505050565b600060208284031215620006b057600080fd5b81516001600160e01b0319811681146200044a57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
function cf(e, { docsPath: t, ...n }) {
  const r = (() => {
    const s = _a(e, n);
    return s instanceof mn ? e : s;
  })();
  return new no(r, {
    docsPath: t,
    ...n
  });
}
const Ds = /* @__PURE__ */ new Map();
function so({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0, sort: s }) {
  const a = async () => {
    const u = c();
    o();
    const d = u.map(({ args: p }) => p);
    d.length !== 0 && e(d).then((p) => {
      var f;
      s && Array.isArray(p) && p.sort(s);
      for (let h = 0; h < u.length; h++) {
        const { pendingPromise: m } = u[h];
        (f = m.resolve) == null || f.call(m, [p[h], p]);
      }
    }).catch((p) => {
      var f;
      for (let h = 0; h < u.length; h++) {
        const { pendingPromise: m } = u[h];
        (f = m.reject) == null || f.call(m, p);
      }
    });
  }, o = () => Ds.delete(t), i = () => c().map(({ args: u }) => u), c = () => Ds.get(t) || [], l = (u) => Ds.set(t, [...c(), u]);
  return {
    flush: o,
    async schedule(u) {
      const d = {}, p = new Promise((m, b) => {
        d.resolve = m, d.reject = b;
      });
      return (n == null ? void 0 : n([...i(), u])) && a(), c().length > 0 ? (l({ args: u, pendingPromise: d }), p) : (l({ args: u, pendingPromise: d }), setTimeout(a, r), p);
    }
  };
}
async function Ve(e, t) {
  var L, N, j, ft;
  const { account: n = e.account, batch: r = !!((L = e.batch) != null && L.multicall), blockNumber: s, blockTag: a = "latest", accessList: o, blobs: i, code: c, data: l, factory: u, factoryData: d, gas: p, gasPrice: f, maxFeePerBlobGas: h, maxFeePerGas: m, maxPriorityFeePerGas: b, nonce: y, to: g, value: A, stateOverride: v, ...x } = t, C = n ? ae(n) : void 0;
  if (c && (u || d))
    throw new k("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
  if (c && g)
    throw new k("Cannot provide both `code` & `to` as parameters.");
  const I = c && l, E = u && d && g && l, T = I || E, M = I ? df({
    code: c,
    data: l
  }) : E ? pf({
    data: l,
    factory: u,
    factoryData: d,
    to: g
  }) : l;
  try {
    Rt(t);
    const ve = (s ? S(s) : void 0) || a, Gt = _c(v), Bn = (ft = (j = (N = e.chain) == null ? void 0 : N.formatters) == null ? void 0 : j.transactionRequest) == null ? void 0 : ft.format, Un = (Bn || it)({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...Kr(x, { format: Bn }),
      from: C == null ? void 0 : C.address,
      accessList: o,
      blobs: i,
      data: M,
      gas: p,
      gasPrice: f,
      maxFeePerBlobGas: h,
      maxFeePerGas: m,
      maxPriorityFeePerGas: b,
      nonce: y,
      to: T ? void 0 : g,
      value: A
    });
    if (r && lf({ request: Un }) && !Gt)
      try {
        return await uf(e, {
          ...Un,
          blockNumber: s,
          blockTag: a
        });
      } catch (Ts) {
        if (!(Ts instanceof Fa) && !(Ts instanceof hr))
          throw Ts;
      }
    const Xo = await e.request({
      method: "eth_call",
      params: Gt ? [
        Un,
        ve,
        Gt
      ] : [Un, ve]
    });
    return Xo === "0x" ? { data: void 0 } : { data: Xo };
  } catch (ge) {
    const ve = ff(ge), { offchainLookup: Gt, offchainLookupSignature: Bn } = await Promise.resolve().then(() => eh);
    if (e.ccipRead !== !1 && (ve == null ? void 0 : ve.slice(0, 10)) === Bn && g)
      return { data: await Gt(e, { data: ve, to: g }) };
    throw T && (ve == null ? void 0 : ve.slice(0, 10)) === "0x101bb98d" ? new Il({ factory: u }) : cf(ge, {
      ...t,
      account: C,
      chain: e.chain
    });
  }
}
function lf({ request: e }) {
  const { data: t, to: n, ...r } = e;
  return !(!t || t.startsWith(rf) || !n || Object.values(r).filter((s) => typeof s < "u").length > 0);
}
async function uf(e, t) {
  var m;
  const { batchSize: n = 1024, wait: r = 0 } = typeof ((m = e.batch) == null ? void 0 : m.multicall) == "object" ? e.batch.multicall : {}, { blockNumber: s, blockTag: a = "latest", data: o, multicallAddress: i, to: c } = t;
  let l = i;
  if (!l) {
    if (!e.chain)
      throw new Fa();
    l = ut({
      blockNumber: s,
      chain: e.chain,
      contract: "multicall3"
    });
  }
  const d = (s ? S(s) : void 0) || a, { schedule: p } = so({
    id: `${e.uid}.${d}`,
    wait: r,
    shouldSplitBatch(b) {
      return b.reduce((g, { data: A }) => g + (A.length - 2), 0) > n * 2;
    },
    fn: async (b) => {
      const y = b.map((v) => ({
        allowFailure: !0,
        callData: v.data,
        target: v.to
      })), g = Me({
        abi: kr,
        args: [y],
        functionName: "aggregate3"
      }), A = await e.request({
        method: "eth_call",
        params: [
          {
            data: g,
            to: l
          },
          d
        ]
      });
      return lt({
        abi: kr,
        args: [y],
        functionName: "aggregate3",
        data: A || "0x"
      });
    }
  }), [{ returnData: f, success: h }] = await p({ data: o, to: c });
  if (!h)
    throw new os({ data: f });
  return f === "0x" ? { data: void 0 } : { data: f };
}
function df(e) {
  const { code: t, data: n } = e;
  return hn({
    abi: eo(["constructor(bytes, bytes)"]),
    bytecode: sf,
    args: [t, n]
  });
}
function pf(e) {
  const { data: t, factory: n, factoryData: r, to: s } = e;
  return hn({
    abi: eo(["constructor(address, bytes, address, bytes)"]),
    bytecode: af,
    args: [s, t, n, r]
  });
}
function ff(e) {
  var n;
  if (!(e instanceof k))
    return;
  const t = e.walk();
  return typeof (t == null ? void 0 : t.data) == "object" ? (n = t.data) == null ? void 0 : n.data : t.data;
}
async function de(e, t) {
  const { abi: n, address: r, args: s, functionName: a, ...o } = t, i = Me({
    abi: n,
    args: s,
    functionName: a
  });
  try {
    const { data: c } = await B(e, Ve, "call")({
      ...o,
      data: i,
      to: r
    });
    return lt({
      abi: n,
      args: s,
      functionName: a,
      data: c || "0x"
    });
  } catch (c) {
    throw Ut(c, {
      abi: n,
      address: r,
      args: s,
      docsPath: "/docs/contract/readContract",
      functionName: a
    });
  }
}
async function ao(e, { blockNumber: t, blockTag: n, coinType: r, name: s, gatewayUrls: a, strict: o, universalResolverAddress: i }) {
  let c = i;
  if (!c) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    c = ut({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const l = Me({
      abi: li,
      functionName: "addr",
      ...r != null ? { args: [Zt(s), BigInt(r)] } : { args: [Zt(s)] }
    }), u = {
      address: c,
      abi: Zc,
      functionName: "resolve",
      args: [P(is(s)), l],
      blockNumber: t,
      blockTag: n
    }, d = B(e, de, "readContract"), p = a ? await d({
      ...u,
      args: [...u.args, a]
    }) : await d(u);
    if (p[0] === "0x")
      return null;
    const f = lt({
      abi: li,
      args: r != null ? [Zt(s), BigInt(r)] : void 0,
      functionName: "addr",
      data: p[0]
    });
    return f === "0x" || Z(f) === "0x00" ? null : f;
  } catch (l) {
    if (o)
      throw l;
    if (ro(l, "resolve"))
      return null;
    throw l;
  }
}
class hf extends k {
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
class ht extends k {
  constructor({ reason: t }) {
    super(`ENS NFT avatar URI is invalid. ${t}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarInvalidNftUriError"
    });
  }
}
class cs extends k {
  constructor({ uri: t }) {
    super(`Unable to resolve ENS avatar URI "${t}". The URI may be malformed, invalid, or does not respond with a valid image.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarUriResolutionError"
    });
  }
}
class Pl extends k {
  constructor({ namespace: t }) {
    super(`ENS NFT avatar namespace "${t}" is not supported. Must be "erc721" or "erc1155".`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "EnsAvatarUnsupportedNamespaceError"
    });
  }
}
const mf = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/, bf = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/, yf = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/, wf = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function gf(e) {
  try {
    const t = await fetch(e, { method: "HEAD" });
    if (t.status === 200) {
      const n = t.headers.get("content-type");
      return n == null ? void 0 : n.startsWith("image/");
    }
    return !1;
  } catch (t) {
    return typeof t == "object" && typeof t.response < "u" || !globalThis.hasOwnProperty("Image") ? !1 : new Promise((n) => {
      const r = new Image();
      r.onload = () => {
        n(!0);
      }, r.onerror = () => {
        n(!1);
      }, r.src = e;
    });
  }
}
function fi(e, t) {
  return e ? e.endsWith("/") ? e.slice(0, -1) : e : t;
}
function Bl({ uri: e, gatewayUrls: t }) {
  const n = yf.test(e);
  if (n)
    return { uri: e, isOnChain: !0, isEncoded: n };
  const r = fi(t == null ? void 0 : t.ipfs, "https://ipfs.io"), s = fi(t == null ? void 0 : t.arweave, "https://arweave.net"), a = e.match(mf), { protocol: o, subpath: i, target: c, subtarget: l = "" } = (a == null ? void 0 : a.groups) || {}, u = o === "ipns:/" || i === "ipns/", d = o === "ipfs:/" || i === "ipfs/" || bf.test(e);
  if (e.startsWith("http") && !u && !d) {
    let f = e;
    return t != null && t.arweave && (f = e.replace(/https:\/\/arweave.net/g, t == null ? void 0 : t.arweave)), { uri: f, isOnChain: !1, isEncoded: !1 };
  }
  if ((u || d) && c)
    return {
      uri: `${r}/${u ? "ipns" : "ipfs"}/${c}${l}`,
      isOnChain: !1,
      isEncoded: !1
    };
  if (o === "ar:/" && c)
    return {
      uri: `${s}/${c}${l || ""}`,
      isOnChain: !1,
      isEncoded: !1
    };
  let p = e.replace(wf, "");
  if (p.startsWith("<svg") && (p = `data:image/svg+xml;base64,${btoa(p)}`), p.startsWith("data:") || p.startsWith("{"))
    return {
      uri: p,
      isOnChain: !0,
      isEncoded: !1
    };
  throw new cs({ uri: e });
}
function Ul(e) {
  if (typeof e != "object" || !("image" in e) && !("image_url" in e) && !("image_data" in e))
    throw new hf({ data: e });
  return e.image || e.image_url || e.image_data;
}
async function vf({ gatewayUrls: e, uri: t }) {
  try {
    const n = await fetch(t).then((s) => s.json());
    return await oo({
      gatewayUrls: e,
      uri: Ul(n)
    });
  } catch {
    throw new cs({ uri: t });
  }
}
async function oo({ gatewayUrls: e, uri: t }) {
  const { uri: n, isOnChain: r } = Bl({ uri: t, gatewayUrls: e });
  if (r || await gf(n))
    return n;
  throw new cs({ uri: t });
}
function Cf(e) {
  let t = e;
  t.startsWith("did:nft:") && (t = t.replace("did:nft:", "").replace(/_/g, "/"));
  const [n, r, s] = t.split("/"), [a, o] = n.split(":"), [i, c] = r.split(":");
  if (!a || a.toLowerCase() !== "eip155")
    throw new ht({ reason: "Only EIP-155 supported" });
  if (!o)
    throw new ht({ reason: "Chain ID not found" });
  if (!c)
    throw new ht({
      reason: "Contract address not found"
    });
  if (!s)
    throw new ht({ reason: "Token ID not found" });
  if (!i)
    throw new ht({ reason: "ERC namespace not found" });
  return {
    chainID: Number.parseInt(o),
    namespace: i.toLowerCase(),
    contractAddress: c,
    tokenID: s
  };
}
async function xf(e, { nft: t }) {
  if (t.namespace === "erc721")
    return de(e, {
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
    return de(e, {
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
  throw new Pl({ namespace: t.namespace });
}
async function Af(e, { gatewayUrls: t, record: n }) {
  return /eip155:/i.test(n) ? kf(e, { gatewayUrls: t, record: n }) : oo({ uri: n, gatewayUrls: t });
}
async function kf(e, { gatewayUrls: t, record: n }) {
  const r = Cf(n), s = await xf(e, { nft: r }), { uri: a, isOnChain: o, isEncoded: i } = Bl({ uri: s, gatewayUrls: t });
  if (o && (a.includes("data:application/json;base64,") || a.startsWith("{"))) {
    const l = i ? (
      // if it is encoded, decode it
      atob(a.replace("data:application/json;base64,", ""))
    ) : (
      // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
      a
    ), u = JSON.parse(l);
    return oo({ uri: Ul(u), gatewayUrls: t });
  }
  let c = r.tokenID;
  return r.namespace === "erc1155" && (c = c.replace("0x", "").padStart(64, "0")), vf({
    gatewayUrls: t,
    uri: a.replace(/(?:0x)?{id}/, c)
  });
}
async function io(e, { blockNumber: t, blockTag: n, name: r, key: s, gatewayUrls: a, strict: o, universalResolverAddress: i }) {
  let c = i;
  if (!c) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    c = ut({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const l = {
      address: c,
      abi: Zc,
      functionName: "resolve",
      args: [
        P(is(r)),
        Me({
          abi: ci,
          functionName: "text",
          args: [Zt(r), s]
        })
      ],
      blockNumber: t,
      blockTag: n
    }, u = B(e, de, "readContract"), d = a ? await u({
      ...l,
      args: [...l.args, a]
    }) : await u(l);
    if (d[0] === "0x")
      return null;
    const p = lt({
      abi: ci,
      functionName: "text",
      data: d[0]
    });
    return p === "" ? null : p;
  } catch (l) {
    if (o)
      throw l;
    if (ro(l, "resolve"))
      return null;
    throw l;
  }
}
async function co(e, { blockNumber: t, blockTag: n, assetGatewayUrls: r, name: s, gatewayUrls: a, strict: o, universalResolverAddress: i }) {
  const c = await B(e, io, "getEnsText")({
    blockNumber: t,
    blockTag: n,
    key: "avatar",
    name: s,
    universalResolverAddress: i,
    gatewayUrls: a,
    strict: o
  });
  if (!c)
    return null;
  try {
    return await Af(e, {
      record: c,
      gatewayUrls: r
    });
  } catch {
    return null;
  }
}
async function lo(e, { address: t, blockNumber: n, blockTag: r, gatewayUrls: s, strict: a, universalResolverAddress: o }) {
  let i = o;
  if (!i) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    i = ut({
      blockNumber: n,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  const c = `${t.toLowerCase().substring(2)}.addr.reverse`;
  try {
    const l = {
      address: i,
      abi: cp,
      functionName: "reverse",
      args: [P(is(c))],
      blockNumber: n,
      blockTag: r
    }, u = B(e, de, "readContract"), [d, p] = s ? await u({
      ...l,
      args: [...l.args, s]
    }) : await u(l);
    return t.toLowerCase() !== p.toLowerCase() ? null : d;
  } catch (l) {
    if (a)
      throw l;
    if (ro(l, "reverse"))
      return null;
    throw l;
  }
}
async function Ml(e, { blockNumber: t, blockTag: n, name: r, universalResolverAddress: s }) {
  let a = s;
  if (!a) {
    if (!e.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    a = ut({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver"
    });
  }
  const [o] = await B(e, de, "readContract")({
    address: a,
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
    args: [P(is(r))],
    blockNumber: t,
    blockTag: n
  });
  return o;
}
function ls(e, { method: t }) {
  var r, s;
  const n = {};
  return e.transport.type === "fallback" && ((s = (r = e.transport).onResponse) == null || s.call(r, ({ method: a, response: o, status: i, transport: c }) => {
    i === "success" && t === a && (n[o] = c.request);
  })), (a) => n[a] || e.request;
}
async function Ef(e) {
  const t = ls(e, {
    method: "eth_newBlockFilter"
  }), n = await e.request({
    method: "eth_newBlockFilter"
  });
  return { id: n, request: t(n), type: "block" };
}
class Fl extends k {
  constructor(t) {
    super(`Filter type "${t}" is not supported.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "FilterTypeNotSupportedError"
    });
  }
}
const hi = "/docs/contract/encodeEventTopics";
function Lt(e) {
  var c;
  const { abi: t, eventName: n, args: r } = e;
  let s = t[0];
  if (n) {
    const l = Qe({ abi: t, name: n });
    if (!l)
      throw new Ys(n, { docsPath: hi });
    s = l;
  }
  if (s.type !== "event")
    throw new Ys(void 0, { docsPath: hi });
  const a = we(s), o = rn(a);
  let i = [];
  if (r && "inputs" in s) {
    const l = (c = s.inputs) == null ? void 0 : c.filter((d) => "indexed" in d && d.indexed), u = Array.isArray(r) ? r : Object.values(r).length > 0 ? (l == null ? void 0 : l.map((d) => r[d.name])) ?? [] : [];
    u.length > 0 && (i = (l == null ? void 0 : l.map((d, p) => Array.isArray(u[p]) ? u[p].map((f, h) => mi({ param: d, value: u[p][h] })) : u[p] ? mi({ param: d, value: u[p] }) : null)) ?? []);
  }
  return [o, ...i];
}
function mi({ param: e, value: t }) {
  if (e.type === "string" || e.type === "bytes")
    return V(J(t));
  if (e.type === "tuple" || e.type.match(/^(.*)\[(\d+)?\]$/))
    throw new Fl(e.type);
  return Ae([e], [t]);
}
async function uo(e, t) {
  const { address: n, abi: r, args: s, eventName: a, fromBlock: o, strict: i, toBlock: c } = t, l = ls(e, {
    method: "eth_newFilter"
  }), u = a ? Lt({
    abi: r,
    args: s,
    eventName: a
  }) : void 0, d = await e.request({
    method: "eth_newFilter",
    params: [
      {
        address: n,
        fromBlock: typeof o == "bigint" ? S(o) : o,
        toBlock: typeof c == "bigint" ? S(c) : c,
        topics: u
      }
    ]
  });
  return {
    abi: r,
    args: s,
    eventName: a,
    id: d,
    request: l(d),
    strict: !!i,
    type: "event"
  };
}
async function Nl(e, { address: t, args: n, event: r, events: s, fromBlock: a, strict: o, toBlock: i } = {}) {
  const c = s ?? (r ? [r] : void 0), l = ls(e, {
    method: "eth_newFilter"
  });
  let u = [];
  c && (u = [c.flatMap((f) => Lt({
    abi: [f],
    eventName: f.name,
    args: n
  }))], r && (u = u[0]));
  const d = await e.request({
    method: "eth_newFilter",
    params: [
      {
        address: t,
        fromBlock: typeof a == "bigint" ? S(a) : a,
        toBlock: typeof i == "bigint" ? S(i) : i,
        ...u.length ? { topics: u } : {}
      }
    ]
  });
  return {
    abi: c,
    args: n,
    eventName: r ? r.name : void 0,
    fromBlock: a,
    id: d,
    request: l(d),
    strict: !!o,
    toBlock: i,
    type: "event"
  };
}
async function Dl(e) {
  const t = ls(e, {
    method: "eth_newPendingTransactionFilter"
  }), n = await e.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id: n, request: t(n), type: "transaction" };
}
async function If(e) {
  return e.request({
    method: `${e.mode}_dumpState`
  });
}
async function Ol(e, t) {
  const { abi: n, address: r, args: s, functionName: a, ...o } = t, i = Me({
    abi: n,
    args: s,
    functionName: a
  });
  try {
    return await B(e, ct, "estimateGas")({
      data: i,
      to: r,
      ...o
    });
  } catch (c) {
    const l = o.account ? ae(o.account) : void 0;
    throw Ut(c, {
      abi: n,
      address: r,
      args: s,
      docsPath: "/docs/contract/estimateContractGas",
      functionName: a,
      sender: l == null ? void 0 : l.address
    });
  }
}
async function po(e, { address: t, blockNumber: n, blockTag: r = "latest" }) {
  const s = n ? S(n) : void 0, a = await e.request({
    method: "eth_getBalance",
    params: [t, s || r]
  });
  return BigInt(a);
}
async function Sf(e) {
  const t = await e.request({
    method: "eth_blobBaseFee"
  });
  return BigInt(t);
}
const Tf = /* @__PURE__ */ new Map(), Pf = /* @__PURE__ */ new Map();
function Bf(e) {
  const t = (s, a) => ({
    clear: () => a.delete(s),
    get: () => a.get(s),
    set: (o) => a.set(s, o)
  }), n = t(e, Tf), r = t(e, Pf);
  return {
    clear: () => {
      n.clear(), r.clear();
    },
    promise: n,
    response: r
  };
}
async function Uf(e, { cacheKey: t, cacheTime: n = Number.POSITIVE_INFINITY }) {
  const r = Bf(t), s = r.response.get();
  if (s && n > 0 && (/* @__PURE__ */ new Date()).getTime() - s.created.getTime() < n)
    return s.data;
  let a = r.promise.get();
  a || (a = e(), r.promise.set(a));
  try {
    const o = await a;
    return r.response.set({ created: /* @__PURE__ */ new Date(), data: o }), o;
  } finally {
    r.promise.clear();
  }
}
const Mf = (e) => `blockNumber.${e}`;
async function _t(e, { cacheTime: t = e.cacheTime } = {}) {
  const n = await Uf(() => e.request({
    method: "eth_blockNumber"
  }), { cacheKey: Mf(e.uid), cacheTime: t });
  return BigInt(n);
}
async function Rl(e, { blockHash: t, blockNumber: n, blockTag: r = "latest" } = {}) {
  const s = n !== void 0 ? S(n) : void 0;
  let a;
  return t ? a = await e.request({
    method: "eth_getBlockTransactionCountByHash",
    params: [t]
  }, { dedupe: !0 }) : a = await e.request({
    method: "eth_getBlockTransactionCountByNumber",
    params: [s || r]
  }, { dedupe: !!s }), Q(a);
}
async function Tr(e, { address: t, blockNumber: n, blockTag: r = "latest" }) {
  const s = n !== void 0 ? S(n) : void 0, a = await e.request({
    method: "eth_getCode",
    params: [t, s || r]
  }, { dedupe: !!s });
  if (a !== "0x")
    return a;
}
const bi = "/docs/contract/decodeEventLog";
function us(e) {
  const { abi: t, data: n, strict: r, topics: s } = e, a = r ?? !0, [o, ...i] = s;
  if (!o)
    throw new fc({ docsPath: bi });
  const c = t.find((m) => m.type === "event" && o === rn(we(m)));
  if (!(c && "name" in c) || c.type !== "event")
    throw new Ia(o, { docsPath: bi });
  const { name: l, inputs: u } = c, d = u == null ? void 0 : u.some((m) => !("name" in m && m.name));
  let p = d ? [] : {};
  const f = u.filter((m) => "indexed" in m && m.indexed);
  for (let m = 0; m < f.length; m++) {
    const b = f[m], y = i[m];
    if (!y)
      throw new fn({
        abiItem: c,
        param: b
      });
    p[d ? m : b.name || m] = Ff({ param: b, value: y });
  }
  const h = u.filter((m) => !("indexed" in m && m.indexed));
  if (h.length > 0) {
    if (n && n !== "0x")
      try {
        const m = Ge(h, n);
        if (m)
          if (d)
            p = [...p, ...m];
          else
            for (let b = 0; b < h.length; b++)
              p[h[b].name] = m[b];
      } catch (m) {
        if (a)
          throw m instanceof Aa || m instanceof Qc ? new vt({
            abiItem: c,
            data: n,
            params: h,
            size: q(n)
          }) : m;
      }
    else if (a)
      throw new vt({
        abiItem: c,
        data: "0x",
        params: h,
        size: 0
      });
  }
  return {
    eventName: l,
    args: Object.values(p).length > 0 ? p : void 0
  };
}
function Ff({ param: e, value: t }) {
  return e.type === "string" || e.type === "bytes" || e.type === "tuple" || e.type.match(/^(.*)\[(\d+)?\]$/) ? t : (Ge([e], t) || [])[0];
}
function ds({ abi: e, eventName: t, logs: n, strict: r = !0 }) {
  return n.map((s) => {
    var a;
    try {
      const o = us({
        ...s,
        abi: e,
        strict: r
      });
      return t && !t.includes(o.eventName) ? null : { ...o, ...s };
    } catch (o) {
      let i, c;
      if (o instanceof Ia)
        return null;
      if (o instanceof vt || o instanceof fn) {
        if (r)
          return null;
        i = o.abiItem.name, c = (a = o.abiItem.inputs) == null ? void 0 : a.some((l) => !("name" in l && l.name));
      }
      return { ...s, args: c ? [] : {}, eventName: i };
    }
  }).filter(Boolean);
}
function Ce(e, { args: t, eventName: n } = {}) {
  return {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    logIndex: e.logIndex ? Number(e.logIndex) : null,
    transactionHash: e.transactionHash ? e.transactionHash : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    ...n ? { args: t, eventName: n } : {}
  };
}
async function fo(e, { address: t, blockHash: n, fromBlock: r, toBlock: s, event: a, events: o, args: i, strict: c } = {}) {
  const l = c ?? !1, u = o ?? (a ? [a] : void 0);
  let d = [];
  u && (d = [u.flatMap((m) => Lt({
    abi: [m],
    eventName: m.name,
    args: i
  }))], a && (d = d[0]));
  let p;
  n ? p = await e.request({
    method: "eth_getLogs",
    params: [{ address: t, topics: d, blockHash: n }]
  }) : p = await e.request({
    method: "eth_getLogs",
    params: [
      {
        address: t,
        topics: d,
        fromBlock: typeof r == "bigint" ? S(r) : r,
        toBlock: typeof s == "bigint" ? S(s) : s
      }
    ]
  });
  const f = p.map((h) => Ce(h));
  return u ? ds({
    abi: u,
    logs: f,
    strict: l
  }) : f;
}
async function ho(e, t) {
  const { abi: n, address: r, args: s, blockHash: a, eventName: o, fromBlock: i, toBlock: c, strict: l } = t, u = o ? Qe({ abi: n, name: o }) : void 0, d = u ? void 0 : n.filter((p) => p.type === "event");
  return B(e, fo, "getLogs")({
    address: r,
    args: s,
    blockHash: a,
    event: u,
    events: d,
    fromBlock: i,
    toBlock: c,
    strict: l
  });
}
class Nf extends k {
  constructor({ address: t }) {
    super(`No EIP-712 domain found on contract "${t}".`, {
      metaMessages: [
        "Ensure that:",
        `- The contract is deployed at the address "${t}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification."
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "Eip712DomainNotFoundError"
    });
  }
}
async function Df(e, t) {
  const { address: n, factory: r, factoryData: s } = t;
  try {
    const [a, o, i, c, l, u, d] = await B(e, de, "readContract")({
      abi: Of,
      address: n,
      functionName: "eip712Domain",
      factory: r,
      factoryData: s
    });
    return {
      domain: {
        name: o,
        version: i,
        chainId: Number(c),
        verifyingContract: l,
        salt: u
      },
      extensions: d,
      fields: a
    };
  } catch (a) {
    const o = a;
    throw o.name === "ContractFunctionExecutionError" && o.cause.name === "ContractFunctionZeroDataError" ? new Nf({ address: n }) : o;
  }
}
const Of = [
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  }
];
function Rf(e) {
  var t;
  return {
    baseFeePerGas: e.baseFeePerGas.map((n) => BigInt(n)),
    gasUsedRatio: e.gasUsedRatio,
    oldestBlock: BigInt(e.oldestBlock),
    reward: (t = e.reward) == null ? void 0 : t.map((n) => n.map((r) => BigInt(r)))
  };
}
async function zl(e, { blockCount: t, blockNumber: n, blockTag: r = "latest", rewardPercentiles: s }) {
  const a = n ? S(n) : void 0, o = await e.request({
    method: "eth_feeHistory",
    params: [
      S(t),
      a || r,
      s
    ]
  }, { dedupe: !!a });
  return Rf(o);
}
async function ps(e, { filter: t }) {
  const n = "strict" in t && t.strict, r = await t.request({
    method: "eth_getFilterChanges",
    params: [t.id]
  });
  if (typeof r[0] == "string")
    return r;
  const s = r.map((a) => Ce(a));
  return !("abi" in t) || !t.abi ? s : ds({
    abi: t.abi,
    logs: s,
    strict: n
  });
}
async function zf(e, { filter: t }) {
  const n = t.strict ?? !1, s = (await t.request({
    method: "eth_getFilterLogs",
    params: [t.id]
  })).map((a) => Ce(a));
  return t.abi ? ds({
    abi: t.abi,
    logs: s,
    strict: n
  }) : s;
}
async function jl(e, { address: t, blockNumber: n, blockTag: r = "latest", slot: s }) {
  const a = n !== void 0 ? S(n) : void 0;
  return await e.request({
    method: "eth_getStorageAt",
    params: [t, s, a || r]
  });
}
async function $t(e, { blockHash: t, blockNumber: n, blockTag: r, hash: s, index: a }) {
  var u, d, p;
  const o = r || "latest", i = n !== void 0 ? S(n) : void 0;
  let c = null;
  if (s ? c = await e.request({
    method: "eth_getTransactionByHash",
    params: [s]
  }, { dedupe: !0 }) : t ? c = await e.request({
    method: "eth_getTransactionByBlockHashAndIndex",
    params: [t, S(a)]
  }, { dedupe: !0 }) : (i || o) && (c = await e.request({
    method: "eth_getTransactionByBlockNumberAndIndex",
    params: [i || o, S(a)]
  }, { dedupe: !!i })), !c)
    throw new ja({
      blockHash: t,
      blockNumber: n,
      blockTag: o,
      hash: s,
      index: a
    });
  return (((p = (d = (u = e.chain) == null ? void 0 : u.formatters) == null ? void 0 : d.transaction) == null ? void 0 : p.format) || zt)(c);
}
async function Ll(e, { hash: t, transactionReceipt: n }) {
  const [r, s] = await Promise.all([
    B(e, _t, "getBlockNumber")({}),
    t ? B(e, $t, "getTransaction")({ hash: t }) : void 0
  ]), a = (n == null ? void 0 : n.blockNumber) || (s == null ? void 0 : s.blockNumber);
  return a ? r - a + 1n : 0n;
}
const jf = {
  "0x0": "reverted",
  "0x1": "success"
};
function mo(e) {
  const t = {
    ...e,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((n) => Ce(n)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Q(e.transactionIndex) : null,
    status: e.status ? jf[e.status] : null,
    type: e.type ? Ga[e.type] || e.type : null
  };
  return e.blobGasPrice && (t.blobGasPrice = BigInt(e.blobGasPrice)), e.blobGasUsed && (t.blobGasUsed = BigInt(e.blobGasUsed)), t;
}
const bo = /* @__PURE__ */ Wr("transactionReceipt", mo);
async function Pr(e, { hash: t }) {
  var s, a, o;
  const n = await e.request({
    method: "eth_getTransactionReceipt",
    params: [t]
  }, { dedupe: !0 });
  if (!n)
    throw new La({ hash: t });
  return (((o = (a = (s = e.chain) == null ? void 0 : s.formatters) == null ? void 0 : a.transactionReceipt) == null ? void 0 : o.format) || mo)(n);
}
async function Lf(e, { address: t }) {
  await e.request({
    method: `${e.mode}_impersonateAccount`,
    params: [t]
  });
}
async function _f(e, { seconds: t }) {
  return await e.request({
    method: "evm_increaseTime",
    params: [S(t)]
  });
}
async function $f(e, { state: t }) {
  await e.request({
    method: `${e.mode}_loadState`,
    params: [t]
  });
}
async function Hf(e, { blocks: t, interval: n }) {
  e.mode === "ganache" ? await e.request({
    method: "evm_mine",
    params: [{ blocks: S(t) }]
  }) : await e.request({
    method: `${e.mode}_mine`,
    params: [S(t), S(n || 0)]
  });
}
async function yo(e, t) {
  var b;
  const { allowFailure: n = !0, batchSize: r, blockNumber: s, blockTag: a, multicallAddress: o, stateOverride: i } = t, c = t.contracts, l = r ?? (typeof ((b = e.batch) == null ? void 0 : b.multicall) == "object" && e.batch.multicall.batchSize || 1024);
  let u = o;
  if (!u) {
    if (!e.chain)
      throw new Error("client chain not configured. multicallAddress is required.");
    u = ut({
      blockNumber: s,
      chain: e.chain,
      contract: "multicall3"
    });
  }
  const d = [[]];
  let p = 0, f = 0;
  for (let y = 0; y < c.length; y++) {
    const { abi: g, address: A, args: v, functionName: x } = c[y];
    try {
      const C = Me({ abi: g, args: v, functionName: x });
      f += (C.length - 2) / 2, // Check if batching is enabled.
      l > 0 && // Check if the current size of the batch exceeds the size limit.
      f > l && // Check if the current chunk is not already empty.
      d[p].length > 0 && (p++, f = (C.length - 2) / 2, d[p] = []), d[p] = [
        ...d[p],
        {
          allowFailure: !0,
          callData: C,
          target: A
        }
      ];
    } catch (C) {
      const I = Ut(C, {
        abi: g,
        address: A,
        args: v,
        docsPath: "/docs/contract/multicall",
        functionName: x
      });
      if (!n)
        throw I;
      d[p] = [
        ...d[p],
        {
          allowFailure: !0,
          callData: "0x",
          target: A
        }
      ];
    }
  }
  const h = await Promise.allSettled(d.map((y) => B(e, de, "readContract")({
    abi: kr,
    address: u,
    args: [y],
    blockNumber: s,
    blockTag: a,
    functionName: "aggregate3",
    stateOverride: i
  }))), m = [];
  for (let y = 0; y < h.length; y++) {
    const g = h[y];
    if (g.status === "rejected") {
      if (!n)
        throw g.reason;
      for (let v = 0; v < d[y].length; v++)
        m.push({
          status: "failure",
          error: g.reason,
          result: void 0
        });
      continue;
    }
    const A = g.value;
    for (let v = 0; v < A.length; v++) {
      const { returnData: x, success: C } = A[v], { callData: I } = d[y][v], { abi: E, address: T, functionName: M, args: L } = c[m.length];
      try {
        if (I === "0x")
          throw new pn();
        if (!C)
          throw new os({ data: x });
        const N = lt({
          abi: E,
          args: L,
          data: x,
          functionName: M
        });
        m.push(n ? { result: N, status: "success" } : N);
      } catch (N) {
        const j = Ut(N, {
          abi: E,
          address: T,
          args: L,
          docsPath: "/docs/contract/multicall",
          functionName: M
        });
        if (!n)
          throw j;
        m.push({ error: j, result: void 0, status: "failure" });
      }
    }
  }
  if (m.length !== c.length)
    throw new k("multicall results mismatch");
  return m;
}
const Os = /* @__PURE__ */ new Map(), yi = /* @__PURE__ */ new Map();
let Gf = 0;
function _e(e, t, n) {
  const r = ++Gf, s = () => Os.get(e) || [], a = () => {
    const u = s();
    Os.set(e, u.filter((d) => d.id !== r));
  }, o = () => {
    const u = yi.get(e);
    s().length === 1 && u && u(), a();
  }, i = s();
  if (Os.set(e, [
    ...i,
    { id: r, fns: t }
  ]), i && i.length > 0)
    return o;
  const c = {};
  for (const u in t)
    c[u] = (...d) => {
      var f, h;
      const p = s();
      if (p.length !== 0)
        for (const m of p)
          (h = (f = m.fns)[u]) == null || h.call(f, ...d);
    };
  const l = n(c);
  return typeof l == "function" && yi.set(e, l), o;
}
async function Br(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Cn(e, { emitOnBegin: t, initialWaitTime: n, interval: r }) {
  let s = !0;
  const a = () => s = !1;
  return (async () => {
    let i;
    t && (i = await e({ unpoll: a }));
    const c = await (n == null ? void 0 : n(i)) ?? r;
    await Br(c);
    const l = async () => {
      s && (await e({ unpoll: a }), await Br(r), l());
    };
    l();
  })(), a;
}
function _l(e, { blockTag: t = "latest", emitMissed: n = !1, emitOnBegin: r = !1, onBlock: s, onError: a, includeTransactions: o, poll: i, pollingInterval: c = e.pollingInterval }) {
  const l = typeof i < "u" ? i : !(e.transport.type === "webSocket" || e.transport.type === "fallback" && e.transport.transports[0].config.type === "webSocket"), u = o ?? !1;
  let d;
  return l ? (() => {
    const h = W([
      "watchBlocks",
      e.uid,
      t,
      n,
      r,
      u,
      c
    ]);
    return _e(h, { onBlock: s, onError: a }, (m) => Cn(async () => {
      var b;
      try {
        const y = await B(e, Ue, "getBlock")({
          blockTag: t,
          includeTransactions: u
        });
        if (y.number && (d != null && d.number)) {
          if (y.number === d.number)
            return;
          if (y.number - d.number > 1 && n)
            for (let g = (d == null ? void 0 : d.number) + 1n; g < y.number; g++) {
              const A = await B(e, Ue, "getBlock")({
                blockNumber: g,
                includeTransactions: u
              });
              m.onBlock(A, d), d = A;
            }
        }
        // If no previous block exists, emit.
        (!(d != null && d.number) || // If the block tag is "pending" with no block number, emit.
        t === "pending" && !(y != null && y.number) || // If the next block number is greater than the previous block number, emit.
        // We don't want to emit blocks in the past.
        y.number && y.number > d.number) && (m.onBlock(y, d), d = y);
      } catch (y) {
        (b = m.onError) == null || b.call(m, y);
      }
    }, {
      emitOnBegin: r,
      interval: c
    }));
  })() : (() => {
    let h = !0, m = () => h = !1;
    return (async () => {
      try {
        const b = (() => {
          if (e.transport.type === "fallback") {
            const g = e.transport.transports.find((A) => A.config.type === "webSocket");
            return g ? g.value : e.transport;
          }
          return e.transport;
        })(), { unsubscribe: y } = await b.subscribe({
          params: ["newHeads"],
          onData(g) {
            var x, C, I;
            if (!h)
              return;
            const v = (((I = (C = (x = e.chain) == null ? void 0 : x.formatters) == null ? void 0 : C.block) == null ? void 0 : I.format) || Xr)(g.result);
            s(v, d), d = v;
          },
          onError(g) {
            a == null || a(g);
          }
        });
        m = y, h || m();
      } catch (b) {
        a == null || a(b);
      }
    })(), () => m();
  })();
}
function wo(e, { emitOnBegin: t = !1, emitMissed: n = !1, onBlockNumber: r, onError: s, poll: a, pollingInterval: o = e.pollingInterval }) {
  const i = typeof a < "u" ? a : !(e.transport.type === "webSocket" || e.transport.type === "fallback" && e.transport.transports[0].config.type === "webSocket");
  let c;
  return i ? (() => {
    const d = W([
      "watchBlockNumber",
      e.uid,
      t,
      n,
      o
    ]);
    return _e(d, { onBlockNumber: r, onError: s }, (p) => Cn(async () => {
      var f;
      try {
        const h = await B(e, _t, "getBlockNumber")({ cacheTime: 0 });
        if (c) {
          if (h === c)
            return;
          if (h - c > 1 && n)
            for (let m = c + 1n; m < h; m++)
              p.onBlockNumber(m, c), c = m;
        }
        (!c || h > c) && (p.onBlockNumber(h, c), c = h);
      } catch (h) {
        (f = p.onError) == null || f.call(p, h);
      }
    }, {
      emitOnBegin: t,
      interval: o
    }));
  })() : (() => {
    const d = W([
      "watchBlockNumber",
      e.uid,
      t,
      n
    ]);
    return _e(d, { onBlockNumber: r, onError: s }, (p) => {
      let f = !0, h = () => f = !1;
      return (async () => {
        try {
          const m = (() => {
            if (e.transport.type === "fallback") {
              const y = e.transport.transports.find((g) => g.config.type === "webSocket");
              return y ? y.value : e.transport;
            }
            return e.transport;
          })(), { unsubscribe: b } = await m.subscribe({
            params: ["newHeads"],
            onData(y) {
              var A;
              if (!f)
                return;
              const g = F((A = y.result) == null ? void 0 : A.number);
              p.onBlockNumber(g, c), c = g;
            },
            onError(y) {
              var g;
              (g = p.onError) == null || g.call(p, y);
            }
          });
          h = b, f || h();
        } catch (m) {
          s == null || s(m);
        }
      })(), () => h();
    });
  })();
}
async function fs(e, { filter: t }) {
  return t.request({
    method: "eth_uninstallFilter",
    params: [t.id]
  });
}
function qf(e, { address: t, args: n, batch: r = !0, event: s, events: a, fromBlock: o, onError: i, onLogs: c, poll: l, pollingInterval: u = e.pollingInterval, strict: d }) {
  const p = typeof l < "u" ? l : typeof o == "bigint" ? !0 : !(e.transport.type === "webSocket" || e.transport.type === "fallback" && e.transport.transports[0].config.type === "webSocket"), f = d ?? !1;
  return p ? (() => {
    const b = W([
      "watchEvent",
      t,
      n,
      r,
      e.uid,
      s,
      u,
      o
    ]);
    return _e(b, { onLogs: c, onError: i }, (y) => {
      let g;
      o !== void 0 && (g = o - 1n);
      let A, v = !1;
      const x = Cn(async () => {
        var C;
        if (!v) {
          try {
            A = await B(e, Nl, "createEventFilter")({
              address: t,
              args: n,
              event: s,
              events: a,
              strict: f,
              fromBlock: o
            });
          } catch {
          }
          v = !0;
          return;
        }
        try {
          let I;
          if (A)
            I = await B(e, ps, "getFilterChanges")({ filter: A });
          else {
            const E = await B(e, _t, "getBlockNumber")({});
            g && g !== E ? I = await B(e, fo, "getLogs")({
              address: t,
              args: n,
              event: s,
              events: a,
              fromBlock: g + 1n,
              toBlock: E
            }) : I = [], g = E;
          }
          if (I.length === 0)
            return;
          if (r)
            y.onLogs(I);
          else
            for (const E of I)
              y.onLogs([E]);
        } catch (I) {
          A && I instanceof je && (v = !1), (C = y.onError) == null || C.call(y, I);
        }
      }, {
        emitOnBegin: !0,
        interval: u
      });
      return async () => {
        A && await B(e, fs, "uninstallFilter")({ filter: A }), x();
      };
    });
  })() : (() => {
    let b = !0, y = () => b = !1;
    return (async () => {
      try {
        const g = (() => {
          if (e.transport.type === "fallback") {
            const C = e.transport.transports.find((I) => I.config.type === "webSocket");
            return C ? C.value : e.transport;
          }
          return e.transport;
        })(), A = a ?? (s ? [s] : void 0);
        let v = [];
        A && (v = [A.flatMap((I) => Lt({
          abi: [I],
          eventName: I.name,
          args: n
        }))], s && (v = v[0]));
        const { unsubscribe: x } = await g.subscribe({
          params: ["logs", { address: t, topics: v }],
          onData(C) {
            var E;
            if (!b)
              return;
            const I = C.result;
            try {
              const { eventName: T, args: M } = us({
                abi: A ?? [],
                data: I.data,
                topics: I.topics,
                strict: f
              }), L = Ce(I, { args: M, eventName: T });
              c([L]);
            } catch (T) {
              let M, L;
              if (T instanceof vt || T instanceof fn) {
                if (d)
                  return;
                M = T.abiItem.name, L = (E = T.abiItem.inputs) == null ? void 0 : E.some((j) => !("name" in j && j.name));
              }
              const N = Ce(I, {
                args: L ? [] : {},
                eventName: M
              });
              c([N]);
            }
          },
          onError(C) {
            i == null || i(C);
          }
        });
        y = x, b || y();
      } catch (g) {
        i == null || i(g);
      }
    })(), () => y();
  })();
}
function $l(e, { batch: t = !0, onError: n, onTransactions: r, poll: s, pollingInterval: a = e.pollingInterval }) {
  return (typeof s < "u" ? s : e.transport.type !== "webSocket") ? (() => {
    const l = W([
      "watchPendingTransactions",
      e.uid,
      t,
      a
    ]);
    return _e(l, { onTransactions: r, onError: n }, (u) => {
      let d;
      const p = Cn(async () => {
        var f;
        try {
          if (!d)
            try {
              d = await B(e, Dl, "createPendingTransactionFilter")({});
              return;
            } catch (m) {
              throw p(), m;
            }
          const h = await B(e, ps, "getFilterChanges")({ filter: d });
          if (h.length === 0)
            return;
          if (t)
            u.onTransactions(h);
          else
            for (const m of h)
              u.onTransactions([m]);
        } catch (h) {
          (f = u.onError) == null || f.call(u, h);
        }
      }, {
        emitOnBegin: !0,
        interval: a
      });
      return async () => {
        d && await B(e, fs, "uninstallFilter")({ filter: d }), p();
      };
    });
  })() : (() => {
    let l = !0, u = () => l = !1;
    return (async () => {
      try {
        const { unsubscribe: d } = await e.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(p) {
            if (!l)
              return;
            const f = p.result;
            r([f]);
          },
          onError(p) {
            n == null || n(p);
          }
        });
        u = d, l || u();
      } catch (d) {
        n == null || n(d);
      }
    })(), () => u();
  })();
}
async function Qf(e) {
  var n;
  return ((n = e.account) == null ? void 0 : n.type) === "local" ? [e.account.address] : (await e.request({ method: "eth_accounts" }, { dedupe: !0 })).map((r) => Dt(r));
}
async function Vf(e) {
  return await e.request({ method: "wallet_getPermissions" }, { dedupe: !0 });
}
const Fn = /* @__PURE__ */ new Gr(8192);
function Kf(e, { enabled: t = !0, id: n }) {
  if (!t || !n)
    return e();
  if (Fn.get(n))
    return Fn.get(n);
  const r = e().finally(() => Fn.delete(n));
  return Fn.set(n, r), r;
}
function $e(e, { delay: t = 100, retryCount: n = 2, shouldRetry: r = () => !0 } = {}) {
  return new Promise((s, a) => {
    const o = async ({ count: i = 0 } = {}) => {
      const c = async ({ error: l }) => {
        const u = typeof t == "function" ? t({ count: i, error: l }) : t;
        u && await Br(u), o({ count: i + 1 });
      };
      try {
        const l = await e();
        s(l);
      } catch (l) {
        if (i < n && await r({ count: i, error: l }))
          return c({ error: l });
        a(l);
      }
    };
    o();
  });
}
function Wf(e, t = {}) {
  return async (n, r = {}) => {
    const { dedupe: s = !1, retryDelay: a = 150, retryCount: o = 3, uid: i } = {
      ...t,
      ...r
    }, c = s ? V(Te(`${i}.${W(n)}`)) : void 0;
    return Kf(() => $e(async () => {
      try {
        return await e(n);
      } catch (l) {
        const u = l;
        switch (u.code) {
          case Ct.code:
            throw new Ct(u);
          case xt.code:
            throw new xt(u);
          case At.code:
            throw new At(u);
          case kt.code:
            throw new kt(u);
          case ze.code:
            throw new ze(u);
          case je.code:
            throw new je(u);
          case Et.code:
            throw new Et(u);
          case re.code:
            throw new re(u);
          case tt.code:
            throw new tt(u);
          case It.code:
            throw new It(u);
          case nt.code:
            throw new nt(u);
          case St.code:
            throw new St(u);
          case U.code:
            throw new U(u);
          case Tt.code:
            throw new Tt(u);
          case Pt.code:
            throw new Pt(u);
          case Le.code:
            throw new Le(u);
          case rt.code:
            throw new rt(u);
          case G.code:
            throw new G(u);
          case 5e3:
            throw new U(u);
          default:
            throw l instanceof k ? l : new Uc(u);
        }
      }
    }, {
      delay: ({ count: l, error: u }) => {
        var d;
        if (u && u instanceof Oe) {
          const p = (d = u == null ? void 0 : u.headers) == null ? void 0 : d.get("Retry-After");
          if (p != null && p.match(/\d/))
            return Number.parseInt(p) * 1e3;
        }
        return ~~(1 << l) * a;
      },
      retryCount: o,
      shouldRetry: ({ error: l }) => Jf(l)
    }), { enabled: s, id: c });
  };
}
function Jf(e) {
  return "code" in e && typeof e.code == "number" ? e.code === -1 || e.code === nt.code || e.code === ze.code : e instanceof Oe && e.status ? e.status === 403 || e.status === 408 || e.status === 413 || e.status === 429 || e.status === 500 || e.status === 502 || e.status === 503 || e.status === 504 : !0;
}
class Zf extends k {
  constructor({ callbackSelector: t, cause: n, data: r, extraData: s, sender: a, urls: o }) {
    var i;
    super(n.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause: n,
      metaMessages: [
        ...n.metaMessages || [],
        (i = n.metaMessages) != null && i.length ? "" : [],
        "Offchain Gateway Call:",
        o && [
          "  Gateway URL(s):",
          ...o.map((c) => `    ${Nt(c)}`)
        ],
        `  Sender: ${a}`,
        `  Data: ${r}`,
        `  Callback selector: ${t}`,
        `  Extra data: ${s}`
      ].flat()
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "OffchainLookupError"
    });
  }
}
class Xf extends k {
  constructor({ result: t, url: n }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${Nt(n)}`,
        `Response: ${W(t)}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "OffchainLookupResponseMalformedError"
    });
  }
}
class Yf extends k {
  constructor({ sender: t, to: n }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${n}`,
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
function xn(e, t) {
  if (!H(e, { strict: !1 }))
    throw new K({ address: e });
  if (!H(t, { strict: !1 }))
    throw new K({ address: t });
  return e.toLowerCase() === t.toLowerCase();
}
const Hl = "0x556f1830", go = {
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
async function Gl(e, { blockNumber: t, blockTag: n, data: r, to: s }) {
  const { args: a } = to({
    data: r,
    abi: [go]
  }), [o, i, c, l, u] = a, { ccipRead: d } = e, p = d && typeof (d == null ? void 0 : d.request) == "function" ? d.request : Ur;
  try {
    if (!xn(s, o))
      throw new Yf({ sender: o, to: s });
    const f = await p({ data: c, sender: o, urls: i }), { data: h } = await Ve(e, {
      blockNumber: t,
      blockTag: n,
      data: ue([
        l,
        Ae([{ type: "bytes" }, { type: "bytes" }], [f, u])
      ]),
      to: s
    });
    return h;
  } catch (f) {
    throw new Zf({
      callbackSelector: l,
      cause: f,
      data: r,
      extraData: u,
      sender: o,
      urls: i
    });
  }
}
async function Ur({ data: e, sender: t, urls: n }) {
  var s;
  let r = new Error("An unknown error occurred.");
  for (let a = 0; a < n.length; a++) {
    const o = n[a], i = o.includes("{data}") ? "GET" : "POST", c = i === "POST" ? { data: e, sender: t } : void 0;
    try {
      const l = await fetch(o.replace("{sender}", t).replace("{data}", e), {
        body: JSON.stringify(c),
        method: i
      });
      let u;
      if ((s = l.headers.get("Content-Type")) != null && s.startsWith("application/json") ? u = (await l.json()).data : u = await l.text(), !l.ok) {
        r = new Oe({
          body: c,
          details: u != null && u.error ? W(u.error) : l.statusText,
          headers: l.headers,
          status: l.status,
          url: o
        });
        continue;
      }
      if (!D(u)) {
        r = new Xf({
          result: u,
          url: o
        });
        continue;
      }
      return u;
    } catch (l) {
      r = new Oe({
        body: c,
        details: l.message,
        url: o
      });
    }
  }
  throw r;
}
const eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ccipRequest: Ur,
  offchainLookup: Gl,
  offchainLookupAbiItem: go,
  offchainLookupSignature: Hl
}, Symbol.toStringTag, { value: "Module" }));
function w(e) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...e
  };
}
function th({ chains: e, id: t }) {
  return e.find((n) => n.id === t);
}
const nh = /^(.*)\[([0-9]*)\]$/, ql = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, Ql = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function Ke(e, { errorInstance: t = new Error("timed out"), timeout: n, signal: r }) {
  return new Promise((s, a) => {
    (async () => {
      let o;
      try {
        const i = new AbortController();
        n > 0 && (o = setTimeout(() => {
          r ? i.abort() : a(t);
        }, n)), s(await e({ signal: (i == null ? void 0 : i.signal) || null }));
      } catch (i) {
        (i == null ? void 0 : i.name) === "AbortError" && a(t), a(i);
      } finally {
        clearTimeout(o);
      }
    })();
  });
}
function rh() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
const ca = /* @__PURE__ */ rh();
function Vl(e, t = {}) {
  return {
    async request(n) {
      var d;
      const { body: r, onRequest: s = t.onRequest, onResponse: a = t.onResponse, timeout: o = t.timeout ?? 1e4 } = n, i = {
        ...t.fetchOptions ?? {},
        ...n.fetchOptions ?? {}
      }, { headers: c, method: l, signal: u } = i;
      try {
        const p = await Ke(async ({ signal: h }) => {
          const m = {
            ...i,
            body: Array.isArray(r) ? W(r.map((g) => ({
              jsonrpc: "2.0",
              id: g.id ?? ca.take(),
              ...g
            }))) : W({
              jsonrpc: "2.0",
              id: r.id ?? ca.take(),
              ...r
            }),
            headers: {
              ...c,
              "Content-Type": "application/json"
            },
            method: l || "POST",
            signal: u || (o > 0 ? h : null)
          }, b = new Request(e, m);
          return s && await s(b), await fetch(e, m);
        }, {
          errorInstance: new Ar({ body: r, url: e }),
          timeout: o,
          signal: !0
        });
        a && await a(p);
        let f;
        if ((d = p.headers.get("Content-Type")) != null && d.startsWith("application/json") ? f = await p.json() : (f = await p.text(), f = JSON.parse(f || "{}")), !p.ok)
          throw new Oe({
            body: r,
            details: W(f.error) || p.statusText,
            headers: p.headers,
            status: p.status,
            url: e
          });
        return f;
      } catch (p) {
        throw p instanceof Oe || p instanceof Ar ? p : new Oe({
          body: r,
          details: p.message,
          url: e
        });
      }
    }
  };
}
const Rs = /* @__PURE__ */ new Map();
async function sh(e) {
  const { getSocket: t, key: n = "socket", reconnect: r = !0, url: s } = e, { attempts: a = 5, delay: o = 2e3 } = typeof r == "object" ? r : {};
  let i = Rs.get(`${n}:${s}`);
  if (i)
    return i;
  let c = 0;
  const { schedule: l } = so({
    id: `${n}:${s}`,
    fn: async () => {
      const p = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
      let h, m;
      async function b() {
        return t({
          onError(y) {
            var g, A;
            h = y;
            for (const v of p.values())
              (g = v.onError) == null || g.call(v, h);
            for (const v of f.values())
              (A = v.onError) == null || A.call(v, h);
            p.clear(), f.clear(), r && c < a && setTimeout(async () => {
              c++, m = await b().catch(console.error);
            }, o);
          },
          onOpen() {
            h = void 0, c = 0;
          },
          onResponse(y) {
            const g = y.method === "eth_subscription", A = g ? y.params.subscription : y.id, v = g ? f : p, x = v.get(A);
            x && x.onResponse(y), g || v.delete(A);
          }
        });
      }
      return m = await b(), h = void 0, i = {
        close() {
          m.close(), Rs.delete(`${n}:${s}`);
        },
        socket: m,
        request({ body: y, onError: g, onResponse: A }) {
          h && g && g(h);
          const v = y.id ?? ca.take(), x = (C) => {
            var I;
            typeof C.id == "number" && v !== C.id || (y.method === "eth_subscribe" && typeof C.result == "string" && f.set(C.result, {
              onResponse: x,
              onError: g
            }), y.method === "eth_unsubscribe" && f.delete((I = y.params) == null ? void 0 : I[0]), A(C));
          };
          p.set(v, { onResponse: x, onError: g });
          try {
            m.request({
              body: {
                jsonrpc: "2.0",
                id: v,
                ...y
              }
            });
          } catch (C) {
            g == null || g(C);
          }
        },
        requestAsync({ body: y, timeout: g = 1e4 }) {
          return Ke(() => new Promise((A, v) => this.request({
            body: y,
            onError: v,
            onResponse: A
          })), {
            errorInstance: new Ar({ body: y, url: s }),
            timeout: g
          });
        },
        requests: p,
        subscriptions: f,
        url: s
      }, Rs.set(`${n}:${s}`, i), [i];
    }
  }), [u, [d]] = await l();
  return d;
}
async function cr(e, t = {}) {
  const { reconnect: n } = t;
  return sh({
    async getSocket({ onError: r, onOpen: s, onResponse: a }) {
      const o = await import("./native-K6sQt7s8.js").then((d) => d.WebSocket), i = new o(e);
      function c() {
        i.removeEventListener("close", c), i.removeEventListener("message", l), i.removeEventListener("error", r), i.removeEventListener("open", s);
      }
      function l({ data: d }) {
        a(JSON.parse(d));
      }
      i.addEventListener("close", c), i.addEventListener("message", l), i.addEventListener("error", r), i.addEventListener("open", s), i.readyState === o.CONNECTING && await new Promise((d, p) => {
        i && (i.onopen = d, i.onerror = p);
      });
      const { close: u } = i;
      return Object.assign(i, {
        close() {
          u.bind(i)(), c();
        },
        request({ body: d }) {
          if (i.readyState === i.CLOSED || i.readyState === i.CLOSING)
            throw new Bc({
              body: d,
              url: i.url,
              details: "Socket is closed."
            });
          return i.send(JSON.stringify(d));
        }
      });
    },
    reconnect: n,
    url: e
  });
}
function ah(e, { body: t, onError: n, onResponse: r }) {
  return e.request({
    body: t,
    onError: n,
    onResponse: r
  }), e;
}
async function oh(e, { body: t, timeout: n = 1e4 }) {
  return e.requestAsync({
    body: t,
    timeout: n
  });
}
async function ih(e) {
  const t = await cr(e);
  return Object.assign(t.socket, {
    requests: t.requests,
    subscriptions: t.subscriptions
  });
}
const zs = {
  /**
   * @deprecated use `getHttpRpcClient` instead.
   *
   * ```diff
   * -import { rpc } from 'viem/utils'
   * +import { getHttpRpcClient } from 'viem/utils'
   *
   * -rpc.http(url, params)
   * +const httpClient = getHttpRpcClient(url)
   * +httpClient.request(params)
   * ```
   */
  http(e, t) {
    return Vl(e).request(t);
  },
  /**
   * @deprecated use `getWebSocketRpcClient` instead.
   *
   * ```diff
   * -import { rpc } from 'viem/utils'
   * +import { getWebSocketRpcClient } from 'viem/utils'
   *
   * -rpc.webSocket(url, params)
   * +const webSocketClient = getWebSocketRpcClient(url)
   * +webSocketClient.request(params)
   * ```
   */
  webSocket: ah,
  /**
   * @deprecated use `getWebSocketRpcClient` instead.
   *
   * ```diff
   * -import { rpc } from 'viem/utils'
   * +import { getWebSocketRpcClient } from 'viem/utils'
   *
   * -const response = await rpc.webSocketAsync(url, params)
   * +const webSocketClient = getWebSocketRpcClient(url)
   * +const response = await webSocketClient.requestAsync(params)
   * ```
   */
  webSocketAsync: oh
};
function vo(e) {
  const { domain: t = {}, message: n, primaryType: r } = e, s = {
    EIP712Domain: hs({ domain: t }),
    ...e.types
  };
  xo({
    domain: t,
    message: n,
    primaryType: r,
    types: s
  });
  const a = ["0x1901"];
  return t && a.push(Co({
    domain: t,
    types: s
  })), r !== "EIP712Domain" && a.push(Kl({
    data: n,
    primaryType: r,
    types: s
  })), V(ue(a));
}
function Co({ domain: e, types: t }) {
  return Kl({
    data: e,
    primaryType: "EIP712Domain",
    types: t
  });
}
function Kl({ data: e, primaryType: t, types: n }) {
  const r = Wl({
    data: e,
    primaryType: t,
    types: n
  });
  return V(r);
}
function Wl({ data: e, primaryType: t, types: n }) {
  const r = [{ type: "bytes32" }], s = [ch({ primaryType: t, types: n })];
  for (const a of n[t]) {
    const [o, i] = Zl({
      types: n,
      name: a.name,
      type: a.type,
      value: e[a.name]
    });
    r.push(o), s.push(i);
  }
  return Ae(r, s);
}
function ch({ primaryType: e, types: t }) {
  const n = P(lh({ primaryType: e, types: t }));
  return V(n);
}
function lh({ primaryType: e, types: t }) {
  let n = "";
  const r = Jl({ primaryType: e, types: t });
  r.delete(e);
  const s = [e, ...Array.from(r).sort()];
  for (const a of s)
    n += `${a}(${t[a].map(({ name: o, type: i }) => `${i} ${o}`).join(",")})`;
  return n;
}
function Jl({ primaryType: e, types: t }, n = /* @__PURE__ */ new Set()) {
  const r = e.match(/^\w*/u), s = r == null ? void 0 : r[0];
  if (n.has(s) || t[s] === void 0)
    return n;
  n.add(s);
  for (const a of t[s])
    Jl({ primaryType: a.type, types: t }, n);
  return n;
}
function Zl({ types: e, name: t, type: n, value: r }) {
  if (e[n] !== void 0)
    return [
      { type: "bytes32" },
      V(Wl({ data: r, primaryType: n, types: e }))
    ];
  if (n === "bytes")
    return r = `0x${(r.length % 2 ? "0" : "") + r.slice(2)}`, [{ type: "bytes32" }, V(r)];
  if (n === "string")
    return [{ type: "bytes32" }, V(P(r))];
  if (n.lastIndexOf("]") === n.length - 1) {
    const s = n.slice(0, n.lastIndexOf("[")), a = r.map((o) => Zl({
      name: t,
      type: s,
      types: e,
      value: o
    }));
    return [
      { type: "bytes32" },
      V(Ae(a.map(([o]) => o), a.map(([, o]) => o)))
    ];
  }
  return [{ type: n }, r];
}
function Xl(e) {
  const { domain: t, message: n, primaryType: r, types: s } = e, a = (c, l) => {
    const u = { ...l };
    for (const d of c) {
      const { name: p, type: f } = d;
      f === "address" && (u[p] = u[p].toLowerCase());
    }
    return u;
  }, o = s.EIP712Domain ? t ? a(s.EIP712Domain, t) : {} : {}, i = (() => {
    if (r !== "EIP712Domain")
      return a(s[r], n);
  })();
  return W({ domain: o, message: i, primaryType: r, types: s });
}
function xo(e) {
  const { domain: t, message: n, primaryType: r, types: s } = e, a = (o, i) => {
    for (const c of o) {
      const { name: l, type: u } = c, d = i[l], p = u.match(Ql);
      if (p && (typeof d == "number" || typeof d == "bigint")) {
        const [m, b, y] = p;
        S(d, {
          signed: b === "int",
          size: Number.parseInt(y) / 8
        });
      }
      if (u === "address" && typeof d == "string" && !H(d))
        throw new K({ address: d });
      const f = u.match(ql);
      if (f) {
        const [m, b] = f;
        if (b && q(d) !== Number.parseInt(b))
          throw new Ta({
            expectedSize: Number.parseInt(b),
            givenSize: q(d)
          });
      }
      const h = s[u];
      h && a(h, d);
    }
  };
  s.EIP712Domain && t && a(s.EIP712Domain, t), r !== "EIP712Domain" && a(s[r], n);
}
function hs({ domain: e }) {
  return [
    typeof (e == null ? void 0 : e.name) == "string" && { name: "name", type: "string" },
    (e == null ? void 0 : e.version) && { name: "version", type: "string" },
    typeof (e == null ? void 0 : e.chainId) == "number" && {
      name: "chainId",
      type: "uint256"
    },
    (e == null ? void 0 : e.verifyingContract) && {
      name: "verifyingContract",
      type: "address"
    },
    (e == null ? void 0 : e.salt) && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
function uh({ domain: e }) {
  return Co({
    domain: e,
    types: {
      EIP712Domain: hs({ domain: e })
    }
  });
}
function dh(e) {
  const { abi: t, data: n } = e, r = Pe(n, 0, 4), s = t.find((a) => a.type === "function" && r === st(we(a)));
  if (!s)
    throw new hc(r, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: s.name,
    args: "inputs" in s && s.inputs && s.inputs.length > 0 ? Ge(s.inputs, Pe(n, 4)) : void 0
  };
}
const js = "/docs/contract/encodeErrorResult";
function ph(e) {
  const { abi: t, errorName: n, args: r } = e;
  let s = t[0];
  if (n) {
    const c = Qe({ abi: t, args: r, name: n });
    if (!c)
      throw new Xs(n, { docsPath: js });
    s = c;
  }
  if (s.type !== "error")
    throw new Xs(void 0, { docsPath: js });
  const a = we(s), o = st(a);
  let i = "0x";
  if (r && r.length > 0) {
    if (!s.inputs)
      throw new pc(s.name, { docsPath: js });
    i = Ae(s.inputs, r);
  }
  return se([o, i]);
}
const Ls = "/docs/contract/encodeFunctionResult";
function fh(e) {
  const { abi: t, functionName: n, result: r } = e;
  let s = t[0];
  if (n) {
    const o = Qe({ abi: t, name: n });
    if (!o)
      throw new Ye(n, { docsPath: Ls });
    s = o;
  }
  if (s.type !== "function")
    throw new Ye(void 0, { docsPath: Ls });
  if (!s.outputs)
    throw new Sa(s.name, { docsPath: Ls });
  let a = Array.isArray(r) ? r : [r];
  return s.outputs.length === 0 && !a[0] && (a = []), Ae(s.outputs, a);
}
function hh(e, t) {
  if (e.length !== t.length)
    throw new ka({
      expectedLength: e.length,
      givenLength: t.length
    });
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r], a = t[r];
    n.push(Yl(s, a));
  }
  return se(n);
}
function Yl(e, t, n = !1) {
  if (e === "address") {
    const o = t;
    if (!H(o))
      throw new K({ address: o });
    return le(o.toLowerCase(), {
      size: n ? 32 : null
    });
  }
  if (e === "string")
    return Te(t);
  if (e === "bytes")
    return t;
  if (e === "bool")
    return le($r(t), { size: n ? 32 : 1 });
  const r = e.match(Ql);
  if (r) {
    const [o, i, c = "256"] = r, l = Number.parseInt(c) / 8;
    return S(t, {
      size: n ? 32 : l,
      signed: i === "int"
    });
  }
  const s = e.match(ql);
  if (s) {
    const [o, i] = s;
    if (Number.parseInt(i) !== (t.length - 2) / 2)
      throw new Ta({
        expectedSize: Number.parseInt(i),
        givenSize: (t.length - 2) / 2
      });
    return le(t, { dir: "right", size: n ? 32 : null });
  }
  const a = e.match(nh);
  if (a && Array.isArray(t)) {
    const [o, i] = a, c = [];
    for (let l = 0; l < t.length; l++)
      c.push(Yl(i, t[l], !0));
    return c.length === 0 ? "0x" : se(c);
  }
  throw new gc(e);
}
function mh(e) {
  const t = V(`0x${e.substring(4)}`).substring(26);
  return Dt(`0x${t}`);
}
function la(e) {
  return !e || typeof e != "object" || !("BYTES_PER_ELEMENT" in e) ? !1 : e.BYTES_PER_ELEMENT === 1 && e.constructor.name === "Uint8Array";
}
function pe(e, t = "hex") {
  const n = eu(e), r = Bt(new Uint8Array(n.length));
  return n.encode(r), t === "hex" ? $(r.bytes) : r.bytes;
}
function bh(e, t = "bytes") {
  return pe(e, t);
}
function yh(e, t = "hex") {
  return pe(e, t);
}
function eu(e) {
  return Array.isArray(e) ? wh(e.map((t) => eu(t))) : gh(e);
}
function wh(e) {
  const t = e.reduce((s, a) => s + a.length, 0), n = tu(t);
  return {
    length: t <= 55 ? 1 + t : 1 + n + t,
    encode(s) {
      t <= 55 ? s.pushByte(192 + t) : (s.pushByte(247 + n), n === 1 ? s.pushUint8(t) : n === 2 ? s.pushUint16(t) : n === 3 ? s.pushUint24(t) : s.pushUint32(t));
      for (const { encode: a } of e)
        a(s);
    }
  };
}
function gh(e) {
  const t = typeof e == "string" ? X(e) : e, n = tu(t.length);
  return {
    length: t.length === 1 && t[0] < 128 ? 1 : t.length <= 55 ? 1 + t.length : 1 + n + t.length,
    encode(s) {
      t.length === 1 && t[0] < 128 ? s.pushBytes(t) : t.length <= 55 ? (s.pushByte(128 + t.length), s.pushBytes(t)) : (s.pushByte(183 + n), n === 1 ? s.pushUint8(t.length) : n === 2 ? s.pushUint16(t.length) : n === 3 ? s.pushUint24(t.length) : s.pushUint32(t.length), s.pushBytes(t));
    }
  };
}
function tu(e) {
  if (e < 2 ** 8)
    return 1;
  if (e < 2 ** 16)
    return 2;
  if (e < 2 ** 24)
    return 3;
  if (e < 2 ** 32)
    return 4;
  throw new k("Length is too large.");
}
function vh(e) {
  return e.opcode === "CREATE2" ? ru(e) : nu(e);
}
function nu(e) {
  const t = J(O(e.from));
  let n = J(e.nonce);
  return n[0] === 0 && (n = new Uint8Array([])), O(`0x${V(pe([t, n], "bytes")).slice(26)}`);
}
function ru(e) {
  const t = J(O(e.from)), n = le(la(e.salt) ? e.salt : J(e.salt), {
    size: 32
  }), r = "bytecodeHash" in e ? la(e.bytecodeHash) ? e.bytecodeHash : J(e.bytecodeHash) : V(e.bytecode, "bytes");
  return O(Pe(V(ue([J("0xff"), t, n, r])), 12));
}
function Ao(e, t = "hex") {
  const n = (() => {
    if (typeof e == "string") {
      if (e.length > 3 && e.length % 2 !== 0)
        throw new sc(e);
      return X(e);
    }
    return e;
  })(), r = Bt(n, {
    recursiveReadLimit: Number.POSITIVE_INFINITY
  });
  return su(r, t);
}
function su(e, t = "hex") {
  if (e.bytes.length === 0)
    return t === "hex" ? $(e.bytes) : e.bytes;
  const n = e.readByte();
  if (n < 128 && e.decrementPosition(1), n < 192) {
    const s = wi(e, n, 128), a = e.readBytes(s);
    return t === "hex" ? $(a) : a;
  }
  const r = wi(e, n, 192);
  return Ch(e, r, t);
}
function wi(e, t, n) {
  if (n === 128 && t < 128)
    return 1;
  if (t <= n + 55)
    return t - n;
  if (t === n + 55 + 1)
    return e.readUint8();
  if (t === n + 55 + 2)
    return e.readUint16();
  if (t === n + 55 + 3)
    return e.readUint24();
  if (t === n + 55 + 4)
    return e.readUint32();
  throw new k("Invalid RLP prefix");
}
function Ch(e, t, n) {
  const r = e.position, s = [];
  for (; e.position - r < t; )
    s.push(su(e, n));
  return s;
}
function au(e) {
  return D(e) && q(e) === 32;
}
const xh = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), ou = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), Ah = /* @__PURE__ */ ou.map((e) => (9 * e + 5) % 16);
let ko = [ou], Eo = [Ah];
for (let e = 0; e < 4; e++)
  for (let t of [ko, Eo])
    t.push(t[e].map((n) => xh[n]));
const iu = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), kh = /* @__PURE__ */ ko.map((e, t) => e.map((n) => iu[t][n])), Eh = /* @__PURE__ */ Eo.map((e, t) => e.map((n) => iu[t][n])), Ih = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Sh = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), Nn = (e, t) => e << t | e >>> 32 - t;
function gi(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Dn = /* @__PURE__ */ new Uint32Array(16);
class cu extends Id {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: n, h2: r, h3: s, h4: a } = this;
    return [t, n, r, s, a];
  }
  set(t, n, r, s, a) {
    this.h0 = t | 0, this.h1 = n | 0, this.h2 = r | 0, this.h3 = s | 0, this.h4 = a | 0;
  }
  process(t, n) {
    for (let f = 0; f < 16; f++, n += 4)
      Dn[f] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, a = this.h1 | 0, o = a, i = this.h2 | 0, c = i, l = this.h3 | 0, u = l, d = this.h4 | 0, p = d;
    for (let f = 0; f < 5; f++) {
      const h = 4 - f, m = Ih[f], b = Sh[f], y = ko[f], g = Eo[f], A = kh[f], v = Eh[f];
      for (let x = 0; x < 16; x++) {
        const C = Nn(r + gi(f, a, i, l) + Dn[y[x]] + m, A[x]) + d | 0;
        r = d, d = l, l = Nn(i, 10) | 0, i = a, a = C;
      }
      for (let x = 0; x < 16; x++) {
        const C = Nn(s + gi(h, o, c, u) + Dn[g[x]] + b, v[x]) + p | 0;
        s = p, p = u, u = Nn(c, 10) | 0, c = o, o = C;
      }
    }
    this.set(this.h1 + i + u | 0, this.h2 + l + p | 0, this.h3 + d + s | 0, this.h4 + r + o | 0, this.h0 + a + c | 0);
  }
  roundClean() {
    Dn.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const lu = /* @__PURE__ */ Ed(() => new cu()), EA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RIPEMD160: cu,
  ripemd160: lu
}, Symbol.toStringTag, { value: "Module" }));
function Th(e, t) {
  const n = t || "hex", r = lu(D(e, { strict: !1 }) ? J(e) : e);
  return n === "bytes" ? r : P(r);
}
async function uu({ hash: e, signature: t }) {
  const n = D(e) ? e : P(e), { secp256k1: r } = await import("./client-CWmvRiz4.js").then((o) => o.Y);
  return `0x${(() => {
    if (typeof t == "object" && "r" in t && "s" in t) {
      const { r: l, s: u, v: d, yParity: p } = t, f = Number(p ?? d), h = vi(f);
      return new r.Signature(F(l), F(u)).addRecoveryBit(h);
    }
    const o = D(t) ? t : P(t), i = Q(`0x${o.slice(130)}`), c = vi(i);
    return r.Signature.fromCompact(o.substring(2, 130)).addRecoveryBit(c);
  })().recoverPublicKey(n.substring(2)).toHex(!1)}`;
}
function vi(e) {
  if (e === 0 || e === 1)
    return e;
  if (e === 27)
    return 0;
  if (e === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}
async function ms({ hash: e, signature: t }) {
  return mh(await uu({ hash: e, signature: t }));
}
const du = `Ethereum Signed Message:
`;
function pu(e) {
  const t = typeof e == "string" ? Te(e) : typeof e.raw == "string" ? e.raw : $(e.raw), n = Te(`${du}${q(t)}`);
  return ue([n, t]);
}
function bs(e, t) {
  return V(pu(e), t);
}
async function fu({ message: e, signature: t }) {
  return ms({ hash: bs(e), signature: t });
}
async function hu(e) {
  const { domain: t, message: n, primaryType: r, signature: s, types: a } = e;
  return ms({
    hash: vo({
      domain: t,
      message: n,
      primaryType: r,
      types: a
    }),
    signature: s
  });
}
async function Ph({ address: e, message: t, signature: n }) {
  return xn(O(e), await fu({ message: t, signature: n }));
}
async function Bh(e) {
  const { address: t, domain: n, message: r, primaryType: s, signature: a, types: o } = e;
  return xn(O(t), await hu({
    domain: n,
    message: r,
    primaryType: s,
    signature: a,
    types: o
  }));
}
const mu = "0x6492649264926492649264926492649264926492649264926492649264926492", Uh = "0x0000000000000000000000000000000000000000000000000000000000000000";
function Io(e) {
  return qr(e, -32) === mu;
}
function Mh(e) {
  if (!Io(e))
    return { signature: e };
  const [t, n, r] = Ge([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], e);
  return { address: t, data: n, signature: r };
}
function bu(e) {
  const { address: t, data: n, signature: r } = e;
  return se([
    Ae([{ type: "address" }, { type: "bytes" }, { type: "bytes" }], [t, n, r]),
    mu
  ]);
}
function yu(e) {
  const t = qr(e, 0, 1);
  if (t === "0x03")
    return "eip4844";
  if (t === "0x02")
    return "eip1559";
  if (t === "0x01")
    return "eip2930";
  if (t !== "0x" && Q(t) >= 192)
    return "legacy";
  throw new Sc({ serializedType: t });
}
function wu(e) {
  const { blobVersionedHashes: t } = e;
  if (t) {
    if (t.length === 0)
      throw new qc();
    for (const n of t) {
      const r = q(n), s = Q(Pe(n, 0, 1));
      if (r !== 32)
        throw new sp({ hash: n, size: r });
      if (s !== Gc)
        throw new ap({
          hash: n,
          version: s
        });
    }
  }
  ys(e);
}
function ys(e) {
  const { chainId: t, maxPriorityFeePerGas: n, maxFeePerGas: r, to: s } = e;
  if (t <= 0)
    throw new Ot({ chainId: t });
  if (s && !H(s))
    throw new K({ address: s });
  if (r && r > 2n ** 256n - 1n)
    throw new Be({ maxFeePerGas: r });
  if (n && r && n > r)
    throw new et({ maxFeePerGas: r, maxPriorityFeePerGas: n });
}
function So(e) {
  const { chainId: t, maxPriorityFeePerGas: n, gasPrice: r, maxFeePerGas: s, to: a } = e;
  if (t <= 0)
    throw new Ot({ chainId: t });
  if (a && !H(a))
    throw new K({ address: a });
  if (n || s)
    throw new k("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (r && r > 2n ** 256n - 1n)
    throw new Be({ maxFeePerGas: r });
}
function To(e) {
  const { chainId: t, maxPriorityFeePerGas: n, gasPrice: r, maxFeePerGas: s, to: a, accessList: o } = e;
  if (a && !H(a))
    throw new K({ address: a });
  if (typeof t < "u" && t <= 0)
    throw new Ot({ chainId: t });
  if (n || s)
    throw new k("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (r && r > 2n ** 256n - 1n)
    throw new Be({ maxFeePerGas: r });
  if (o)
    throw new k("`accessList` is not a valid Legacy Transaction attribute.");
}
function gu(e) {
  const t = yu(e);
  return t === "eip1559" ? Nh(e) : t === "eip2930" ? Dh(e) : t === "eip4844" ? Fh(e) : Oh(e);
}
function Fh(e) {
  const t = Po(e), n = t.length === 4, r = n ? t[0] : t, s = n ? t.slice(1) : [], [a, o, i, c, l, u, d, p, f, h, m, b, y, g] = r, [A, v, x] = s;
  if (!(r.length === 11 || r.length === 14))
    throw new yn({
      attributes: {
        chainId: a,
        nonce: o,
        maxPriorityFeePerGas: i,
        maxFeePerGas: c,
        gas: l,
        to: u,
        value: d,
        data: p,
        accessList: f,
        ...r.length > 9 ? {
          v: b,
          r: y,
          s: g
        } : {}
      },
      serializedTransaction: e,
      type: "eip4844"
    });
  const C = {
    blobVersionedHashes: m,
    chainId: Q(a),
    type: "eip4844"
  };
  return D(u) && u !== "0x" && (C.to = u), D(l) && l !== "0x" && (C.gas = F(l)), D(p) && p !== "0x" && (C.data = p), D(o) && o !== "0x" && (C.nonce = Q(o)), D(d) && d !== "0x" && (C.value = F(d)), D(h) && h !== "0x" && (C.maxFeePerBlobGas = F(h)), D(c) && c !== "0x" && (C.maxFeePerGas = F(c)), D(i) && i !== "0x" && (C.maxPriorityFeePerGas = F(i)), f.length !== 0 && f !== "0x" && (C.accessList = Bo(f)), A && v && x && (C.sidecars = ss({
    blobs: A,
    commitments: v,
    proofs: x
  })), wu(C), { ...r.length === 14 ? Uo(r) : void 0, ...C };
}
function Nh(e) {
  const t = Po(e), [n, r, s, a, o, i, c, l, u, d, p, f] = t;
  if (!(t.length === 9 || t.length === 12))
    throw new yn({
      attributes: {
        chainId: n,
        nonce: r,
        maxPriorityFeePerGas: s,
        maxFeePerGas: a,
        gas: o,
        to: i,
        value: c,
        data: l,
        accessList: u,
        ...t.length > 9 ? {
          v: d,
          r: p,
          s: f
        } : {}
      },
      serializedTransaction: e,
      type: "eip1559"
    });
  const h = {
    chainId: Q(n),
    type: "eip1559"
  };
  return D(i) && i !== "0x" && (h.to = i), D(o) && o !== "0x" && (h.gas = F(o)), D(l) && l !== "0x" && (h.data = l), D(r) && r !== "0x" && (h.nonce = Q(r)), D(c) && c !== "0x" && (h.value = F(c)), D(a) && a !== "0x" && (h.maxFeePerGas = F(a)), D(s) && s !== "0x" && (h.maxPriorityFeePerGas = F(s)), u.length !== 0 && u !== "0x" && (h.accessList = Bo(u)), ys(h), { ...t.length === 12 ? Uo(t) : void 0, ...h };
}
function Dh(e) {
  const t = Po(e), [n, r, s, a, o, i, c, l, u, d, p] = t;
  if (!(t.length === 8 || t.length === 11))
    throw new yn({
      attributes: {
        chainId: n,
        nonce: r,
        gasPrice: s,
        gas: a,
        to: o,
        value: i,
        data: c,
        accessList: l,
        ...t.length > 8 ? {
          v: u,
          r: d,
          s: p
        } : {}
      },
      serializedTransaction: e,
      type: "eip2930"
    });
  const f = {
    chainId: Q(n),
    type: "eip2930"
  };
  return D(o) && o !== "0x" && (f.to = o), D(a) && a !== "0x" && (f.gas = F(a)), D(c) && c !== "0x" && (f.data = c), D(r) && r !== "0x" && (f.nonce = Q(r)), D(i) && i !== "0x" && (f.value = F(i)), D(s) && s !== "0x" && (f.gasPrice = F(s)), l.length !== 0 && l !== "0x" && (f.accessList = Bo(l)), So(f), { ...t.length === 11 ? Uo(t) : void 0, ...f };
}
function Oh(e) {
  const t = Ao(e, "hex"), [n, r, s, a, o, i, c, l, u] = t;
  if (!(t.length === 6 || t.length === 9))
    throw new yn({
      attributes: {
        nonce: n,
        gasPrice: r,
        gas: s,
        to: a,
        value: o,
        data: i,
        ...t.length > 6 ? {
          v: c,
          r: l,
          s: u
        } : {}
      },
      serializedTransaction: e,
      type: "legacy"
    });
  const d = {
    type: "legacy"
  };
  if (D(a) && a !== "0x" && (d.to = a), D(s) && s !== "0x" && (d.gas = F(s)), D(i) && i !== "0x" && (d.data = i), D(n) && n !== "0x" && (d.nonce = Q(n)), D(o) && o !== "0x" && (d.value = F(o)), D(r) && r !== "0x" && (d.gasPrice = F(r)), To(d), t.length === 6)
    return d;
  const p = D(c) && c !== "0x" ? F(c) : 0n;
  if (u === "0x" && l === "0x")
    return p > 0 && (d.chainId = Number(p)), d;
  const f = p, h = Number((f - 35n) / 2n);
  if (h > 0)
    d.chainId = h;
  else if (f !== 27n && f !== 28n)
    throw new za({ v: f });
  return d.v = f, d.s = u, d.r = l, d.yParity = f % 2n === 0n ? 1 : 0, d;
}
function Po(e) {
  return Ao(`0x${e.slice(4)}`, "hex");
}
function Bo(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const [r, s] = e[n];
    if (!H(r, { strict: !1 }))
      throw new K({ address: r });
    t.push({
      address: r,
      storageKeys: s.map((a) => au(a) ? a : Z(a))
    });
  }
  return t;
}
function Uo(e) {
  const t = e.slice(-3), n = t[0] === "0x" || F(t[0]) === 0n ? 27n : 28n;
  return {
    r: be(t[1], { size: 32 }),
    s: be(t[2], { size: 32 }),
    v: n,
    yParity: n === 27n ? 0 : 1
  };
}
function An(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const { address: r, storageKeys: s } = e[n];
    for (let a = 0; a < s.length; a++)
      if (s[a].length - 2 !== 64)
        throw new Tc({ storageKey: s[a] });
    if (!H(r, { strict: !1 }))
      throw new K({ address: r });
    t.push([r, s]);
  }
  return t;
}
function kn(e, t) {
  const n = Wa(e);
  return n === "eip1559" ? zh(e, t) : n === "eip2930" ? jh(e, t) : n === "eip4844" ? Rh(e, t) : Lh(e, t);
}
function Rh(e, t) {
  const { chainId: n, gas: r, nonce: s, to: a, value: o, maxFeePerBlobGas: i, maxFeePerGas: c, maxPriorityFeePerGas: l, accessList: u, data: d } = e;
  wu(e);
  let p = e.blobVersionedHashes, f = e.sidecars;
  if (e.blobs && (typeof p > "u" || typeof f > "u")) {
    const A = typeof e.blobs[0] == "string" ? e.blobs : e.blobs.map((C) => $(C)), v = e.kzg, x = ns({
      blobs: A,
      kzg: v
    });
    if (typeof p > "u" && (p = Va({
      commitments: x
    })), typeof f > "u") {
      const C = rs({ blobs: A, commitments: x, kzg: v });
      f = ss({ blobs: A, commitments: x, proofs: C });
    }
  }
  const h = An(u), m = [
    P(n),
    s ? P(s) : "0x",
    l ? P(l) : "0x",
    c ? P(c) : "0x",
    r ? P(r) : "0x",
    a ?? "0x",
    o ? P(o) : "0x",
    d ?? "0x",
    h,
    i ? P(i) : "0x",
    p ?? [],
    ...ws(e, t)
  ], b = [], y = [], g = [];
  if (f)
    for (let A = 0; A < f.length; A++) {
      const { blob: v, commitment: x, proof: C } = f[A];
      b.push(v), y.push(x), g.push(C);
    }
  return se([
    "0x03",
    // If sidecars are enabled, envelope turns into a "wrapper":
    pe(f ? [m, b, y, g] : m)
  ]);
}
function zh(e, t) {
  const { chainId: n, gas: r, nonce: s, to: a, value: o, maxFeePerGas: i, maxPriorityFeePerGas: c, accessList: l, data: u } = e;
  ys(e);
  const d = An(l), p = [
    P(n),
    s ? P(s) : "0x",
    c ? P(c) : "0x",
    i ? P(i) : "0x",
    r ? P(r) : "0x",
    a ?? "0x",
    o ? P(o) : "0x",
    u ?? "0x",
    d,
    ...ws(e, t)
  ];
  return se([
    "0x02",
    pe(p)
  ]);
}
function jh(e, t) {
  const { chainId: n, gas: r, data: s, nonce: a, to: o, value: i, accessList: c, gasPrice: l } = e;
  So(e);
  const u = An(c), d = [
    P(n),
    a ? P(a) : "0x",
    l ? P(l) : "0x",
    r ? P(r) : "0x",
    o ?? "0x",
    i ? P(i) : "0x",
    s ?? "0x",
    u,
    ...ws(e, t)
  ];
  return se([
    "0x01",
    pe(d)
  ]);
}
function Lh(e, t) {
  const { chainId: n = 0, gas: r, data: s, nonce: a, to: o, value: i, gasPrice: c } = e;
  To(e);
  let l = [
    a ? P(a) : "0x",
    c ? P(c) : "0x",
    r ? P(r) : "0x",
    o ?? "0x",
    i ? P(i) : "0x",
    s ?? "0x"
  ];
  if (t) {
    const u = (() => {
      if (t.v >= 35n)
        return (t.v - 35n) / 2n > 0 ? t.v : 27n + (t.v === 35n ? 0n : 1n);
      if (n > 0)
        return BigInt(n * 2) + BigInt(35n + t.v - 27n);
      const d = 27n + (t.v === 27n ? 0n : 1n);
      if (t.v !== d)
        throw new za({ v: t.v });
      return d;
    })();
    l = [
      ...l,
      P(u),
      t.r,
      t.s
    ];
  } else
    n > 0 && (l = [
      ...l,
      P(n),
      "0x",
      "0x"
    ]);
  return pe(l);
}
function ws(e, t) {
  const n = t ?? e, { v: r, yParity: s } = n;
  if (typeof n.r > "u")
    return [];
  if (typeof n.s > "u")
    return [];
  if (typeof r > "u" && typeof s > "u")
    return [];
  const a = Z(n.r), o = Z(n.s);
  return [typeof s == "number" ? s ? P(1) : "0x" : r === 0n ? "0x" : r === 1n ? P(1) : r === 27n ? "0x" : P(1), a === "0x00" ? "0x" : a, o === "0x00" ? "0x" : o];
}
function gs(e, t) {
  let [n, r = "0"] = e.split(".");
  const s = n.startsWith("-");
  if (s && (n = n.slice(1)), r = r.replace(/(0+)$/, ""), t === 0)
    Math.round(+`.${r}`) === 1 && (n = `${BigInt(n) + 1n}`), r = "";
  else if (r.length > t) {
    const [a, o, i] = [
      r.slice(0, t - 1),
      r.slice(t - 1, t),
      r.slice(t)
    ], c = Math.round(+`${o}.${i}`);
    c > 9 ? r = `${BigInt(a) + BigInt(1)}0`.padStart(a.length + 1, "0") : r = `${a}${c}`, r.length > t && (r = r.slice(1), n = `${BigInt(n) + 1n}`), r = r.slice(0, t);
  } else
    r = r.padEnd(t, "0");
  return BigInt(`${s ? "-" : ""}${n}${r}`);
}
function _h(e, t = "wei") {
  return gs(e, Da[t]);
}
function $h(e, t = "wei") {
  return gs(e, Oa[t]);
}
function vu(e) {
  const { source: t } = e, n = /* @__PURE__ */ new Map(), r = new Gr(8192), s = /* @__PURE__ */ new Map(), a = ({ address: o, chainId: i }) => `${o}.${i}`;
  return {
    async consume({ address: o, chainId: i, client: c }) {
      const l = a({ address: o, chainId: i }), u = this.get({ address: o, chainId: i, client: c });
      this.increment({ address: o, chainId: i });
      const d = await u;
      return await t.set({ address: o, chainId: i }, d), r.set(l, d), d;
    },
    async increment({ address: o, chainId: i }) {
      const c = a({ address: o, chainId: i }), l = n.get(c) ?? 0;
      n.set(c, l + 1);
    },
    async get({ address: o, chainId: i, client: c }) {
      const l = a({ address: o, chainId: i });
      let u = s.get(l);
      return u || (u = (async () => {
        try {
          const p = await t.get({ address: o, chainId: i, client: c }), f = r.get(l) ?? 0;
          return p <= f ? f + 1 : (r.delete(l), p);
        } finally {
          this.reset({ address: o, chainId: i });
        }
      })(), s.set(l, u)), (n.get(l) ?? 0) + await u;
    },
    reset({ address: o, chainId: i }) {
      const c = a({ address: o, chainId: i });
      n.delete(c), s.delete(c);
    }
  };
}
function Hh() {
  return {
    async get(e) {
      const { address: t, client: n } = e;
      return ts(n, {
        address: t,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
const Gh = /* @__PURE__ */ vu({
  source: Hh()
});
function qh(e) {
  return e.map((t) => ({
    ...t,
    value: BigInt(t.value)
  }));
}
function Qh(e) {
  return {
    ...e,
    balance: e.balance ? BigInt(e.balance) : void 0,
    nonce: e.nonce ? Q(e.nonce) : void 0,
    storageProof: e.storageProof ? qh(e.storageProof) : void 0
  };
}
async function Cu(e, { address: t, blockNumber: n, blockTag: r, storageKeys: s }) {
  const a = r ?? "latest", o = n !== void 0 ? S(n) : void 0, i = await e.request({
    method: "eth_getProof",
    params: [t, s, o || a]
  });
  return Qh(i);
}
async function Mo(e, {
  confirmations: t = 1,
  hash: n,
  onReplaced: r,
  pollingInterval: s = e.pollingInterval,
  retryCount: a = 6,
  retryDelay: o = ({ count: c }) => ~~(1 << c) * 200,
  // exponential backoff
  timeout: i
}) {
  const c = W(["waitForTransactionReceipt", e.uid, n]);
  let l = 0, u, d, p, f = !1;
  return new Promise((h, m) => {
    i && setTimeout(() => m(new ea({ hash: n })), i);
    const b = _e(c, { onReplaced: r, resolve: h, reject: m }, (y) => {
      const g = B(e, wo, "watchBlockNumber")({
        emitMissed: !0,
        emitOnBegin: !0,
        poll: !0,
        pollingInterval: s,
        async onBlockNumber(A) {
          const v = (C) => {
            g(), C(), b();
          };
          let x = A;
          if (!f) {
            l > a && v(() => y.reject(new ea({ hash: n })));
            try {
              if (p) {
                if (t > 1 && (!p.blockNumber || x - p.blockNumber + 1n < t))
                  return;
                v(() => y.resolve(p));
                return;
              }
              if (u || (f = !0, await $e(async () => {
                u = await B(e, $t, "getTransaction")({ hash: n }), u.blockNumber && (x = u.blockNumber);
              }, {
                delay: o,
                retryCount: a
              }), f = !1), p = await B(e, Pr, "getTransactionReceipt")({ hash: n }), t > 1 && (!p.blockNumber || x - p.blockNumber + 1n < t))
                return;
              v(() => y.resolve(p));
            } catch (C) {
              if (C instanceof ja || C instanceof La) {
                if (!u) {
                  f = !1;
                  return;
                }
                try {
                  d = u, f = !0;
                  const I = await $e(() => B(e, Ue, "getBlock")({
                    blockNumber: x,
                    includeTransactions: !0
                  }), {
                    delay: o,
                    retryCount: a,
                    shouldRetry: ({ error: M }) => M instanceof Ha
                  });
                  f = !1;
                  const E = I.transactions.find(({ from: M, nonce: L }) => M === d.from && L === d.nonce);
                  if (!E || (p = await B(e, Pr, "getTransactionReceipt")({
                    hash: E.hash
                  }), t > 1 && (!p.blockNumber || x - p.blockNumber + 1n < t)))
                    return;
                  let T = "replaced";
                  E.to === d.to && E.value === d.value ? T = "repriced" : E.from === E.to && E.value === 0n && (T = "cancelled"), v(() => {
                    var M;
                    (M = y.onReplaced) == null || M.call(y, {
                      reason: T,
                      replacedTransaction: d,
                      transaction: E,
                      transactionReceipt: p
                    }), y.resolve(p);
                  });
                } catch (I) {
                  v(() => y.reject(I));
                }
              } else
                v(() => y.reject(C));
            } finally {
              l++;
            }
          }
        }
      });
    });
  });
}
async function Vh(e) {
  return (await e.request({ method: "eth_requestAccounts" }, { dedupe: !0, retryCount: 0 })).map((n) => O(n));
}
async function Kh(e, t) {
  return e.request({
    method: "wallet_requestPermissions",
    params: [t]
  }, { retryCount: 0 });
}
async function Wh(e, { hash: t }) {
  await e.request({
    method: `${e.mode}_dropTransaction`,
    params: [t]
  });
}
async function Jh(e) {
  return e.mode === "ganache" ? await e.request({
    method: "eth_mining"
  }) : await e.request({
    method: `${e.mode}_getAutomine`
  });
}
async function Zh(e) {
  return await e.request({
    method: "txpool_content"
  });
}
async function Xh(e) {
  const { pending: t, queued: n } = await e.request({
    method: "txpool_status"
  });
  return {
    pending: Q(t),
    queued: Q(n)
  };
}
async function Yh(e) {
  return await e.request({
    method: "txpool_inspect"
  });
}
async function em(e) {
  await e.request({
    method: `${e.mode}_removeBlockTimestampInterval`
  });
}
async function tm(e, { blockNumber: t, jsonRpcUrl: n } = {}) {
  await e.request({
    method: `${e.mode}_reset`,
    params: [{ forking: { blockNumber: Number(t), jsonRpcUrl: n } }]
  });
}
async function nm(e, { id: t }) {
  await e.request({
    method: "evm_revert",
    params: [t]
  });
}
async function rm(e, t) {
  var l, u, d, p;
  const { account: n = e.account, chain: r = e.chain, ...s } = t;
  if (!n)
    throw new Qr({
      docsPath: "/docs/actions/wallet/signTransaction"
    });
  const a = ae(n);
  Rt({
    account: a,
    ...t
  });
  const o = await B(e, wn, "getChainId")({});
  r !== null && Na({
    currentChainId: o,
    chain: r
  });
  const i = (r == null ? void 0 : r.formatters) || ((l = e.chain) == null ? void 0 : l.formatters), c = ((u = i == null ? void 0 : i.transactionRequest) == null ? void 0 : u.format) || it;
  return a.type === "local" ? a.signTransaction({
    ...s,
    chainId: o
  }, { serializer: (p = (d = e.chain) == null ? void 0 : d.serializers) == null ? void 0 : p.transaction }) : await e.request({
    method: "eth_signTransaction",
    params: [
      {
        ...c(s),
        chainId: S(o),
        from: a.address
      }
    ]
  }, { retryCount: 0 });
}
async function sm(e, t) {
  var y, g, A;
  const { accessList: n, data: r, from: s, gas: a, gasPrice: o, maxFeePerGas: i, maxPriorityFeePerGas: c, nonce: l, to: u, value: d, ...p } = t, f = (A = (g = (y = e.chain) == null ? void 0 : y.formatters) == null ? void 0 : g.transactionRequest) == null ? void 0 : A.format, m = (f || it)({
    // Pick out extra data that might exist on the chain's transaction request type.
    ...Kr(p, { format: f }),
    accessList: n,
    data: r,
    from: s,
    gas: a,
    gasPrice: o,
    maxFeePerGas: i,
    maxPriorityFeePerGas: c,
    nonce: l,
    to: u,
    value: d
  });
  return await e.request({
    method: "eth_sendUnsignedTransaction",
    params: [m]
  });
}
async function am(e, { address: t, value: n }) {
  e.mode === "ganache" ? await e.request({
    method: "evm_setAccountBalance",
    params: [t, S(n)]
  }) : await e.request({
    method: `${e.mode}_setBalance`,
    params: [t, S(n)]
  });
}
async function om(e, t) {
  e.mode === "ganache" ? t ? await e.request({ method: "miner_start" }) : await e.request({ method: "miner_stop" }) : await e.request({
    method: "evm_setAutomine",
    params: [t]
  });
}
async function im(e, { gasLimit: t }) {
  await e.request({
    method: "evm_setBlockGasLimit",
    params: [S(t)]
  });
}
async function cm(e, { interval: t }) {
  const n = e.mode === "hardhat" ? t * 1e3 : t;
  await e.request({
    method: `${e.mode}_setBlockTimestampInterval`,
    params: [n]
  });
}
async function lm(e, { address: t, bytecode: n }) {
  await e.request({
    method: `${e.mode}_setCode`,
    params: [t, n]
  });
}
async function um(e, { address: t }) {
  await e.request({
    method: `${e.mode}_setCoinbase`,
    params: [t]
  });
}
async function dm(e, { interval: t }) {
  const n = e.mode === "hardhat" ? t * 1e3 : t;
  await e.request({
    method: "evm_setIntervalMining",
    params: [n]
  });
}
async function pm(e, t) {
  await e.request({
    method: `${e.mode}_setLoggingEnabled`,
    params: [t]
  });
}
async function fm(e, { gasPrice: t }) {
  await e.request({
    method: `${e.mode}_setMinGasPrice`,
    params: [S(t)]
  });
}
async function hm(e, { baseFeePerGas: t }) {
  await e.request({
    method: `${e.mode}_setNextBlockBaseFeePerGas`,
    params: [S(t)]
  });
}
async function mm(e, { timestamp: t }) {
  await e.request({
    method: "evm_setNextBlockTimestamp",
    params: [S(t)]
  });
}
async function bm(e, { address: t, nonce: n }) {
  await e.request({
    method: `${e.mode}_setNonce`,
    params: [t, S(n)]
  });
}
async function ym(e, t) {
  await e.request({
    method: `${e.mode}_setRpcUrl`,
    params: [t]
  });
}
async function wm(e, { address: t, index: n, value: r }) {
  await e.request({
    method: `${e.mode}_setStorageAt`,
    params: [
      t,
      typeof n == "number" ? S(n) : n,
      r
    ]
  });
}
async function gm(e) {
  return await e.request({
    method: "evm_snapshot"
  });
}
async function Fo(e, { account: t = e.account, message: n }) {
  if (!t)
    throw new Qr({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const r = ae(t);
  if (r.type === "local")
    return r.signMessage({ message: n });
  const s = typeof n == "string" ? Te(n) : n.raw instanceof Uint8Array ? P(n.raw) : n.raw;
  return e.request({
    method: "personal_sign",
    params: [s, r.address]
  }, { retryCount: 0 });
}
async function xu(e, t) {
  const { account: n = e.account, domain: r, message: s, primaryType: a } = t;
  if (!n)
    throw new Qr({
      docsPath: "/docs/actions/wallet/signTypedData"
    });
  const o = ae(n), i = {
    EIP712Domain: hs({ domain: r }),
    ...t.types
  };
  if (xo({ domain: r, message: s, primaryType: a, types: i }), o.type === "local")
    return o.signTypedData({ domain: r, message: s, primaryType: a, types: i });
  const c = Xl({ domain: r, message: s, primaryType: a, types: i });
  return e.request({
    method: "eth_signTypedData_v4",
    params: [o.address, c]
  }, { retryCount: 0 });
}
async function vs(e, t) {
  const { abi: n, address: r, args: s, dataSuffix: a, functionName: o, ...i } = t, c = i.account ? ae(i.account) : e.account, l = Me({ abi: n, args: s, functionName: o });
  try {
    const { data: u } = await B(e, Ve, "call")({
      batch: !1,
      data: `${l}${a ? a.replace("0x", "") : ""}`,
      to: r,
      ...i,
      account: c
    }), d = lt({
      abi: n,
      args: s,
      functionName: o,
      data: u || "0x"
    }), p = n.filter((f) => "name" in f && f.name === t.functionName);
    return {
      result: d,
      request: {
        abi: p,
        address: r,
        args: s,
        dataSuffix: a,
        functionName: o,
        ...i,
        account: c
      }
    };
  } catch (u) {
    throw Ut(u, {
      abi: n,
      address: r,
      args: s,
      docsPath: "/docs/contract/simulateContract",
      functionName: o,
      sender: c == null ? void 0 : c.address
    });
  }
}
async function vm(e, { address: t }) {
  await e.request({
    method: `${e.mode}_stopImpersonatingAccount`,
    params: [t]
  });
}
async function Cm(e, { id: t }) {
  await e.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: S(t)
      }
    ]
  }, { retryCount: 0 });
}
function xm(e, t) {
  const n = D(e) ? J(e) : e, r = D(t) ? J(t) : t;
  return Sd(n, r);
}
function ua({ r: e, s: t, v: n, yParity: r }) {
  const s = (() => {
    if (r === 0 || r === 1)
      return r;
    if (n && (n === 27n || n === 28n || n >= 35n))
      return n % 2n === 0n ? 1 : 0;
    throw new Error("Invalid `v` or `yParity` value");
  })();
  return `0x${new _r.Signature(F(e), F(t)).toCompactHex()}${s === 0 ? "1b" : "1c"}`;
}
async function No(e, t) {
  const { address: n, factory: r, factoryData: s, hash: a, signature: o, ...i } = t, c = D(o) ? o : typeof o == "object" && "r" in o && "s" in o ? ua(o) : $(o), l = await (async () => !r && !s || Io(c) || await B(e, Tr, "getCode")({ address: n }) ? c : bu({
    address: r,
    data: s,
    signature: c
  }))();
  try {
    const { data: u } = await B(e, Ve, "call")({
      data: hn({
        abi: lp,
        args: [n, a, l],
        bytecode: of
      }),
      ...i
    });
    return xm(u ?? "0x0", "0x1");
  } catch (u) {
    if (u instanceof no)
      return !1;
    throw u;
  }
}
async function Au(e, { address: t, message: n, factory: r, factoryData: s, signature: a, ...o }) {
  const i = bs(n);
  return No(e, {
    address: t,
    factory: r,
    factoryData: s,
    hash: i,
    signature: a,
    ...o
  });
}
async function ku(e, t) {
  const { address: n, factory: r, factoryData: s, signature: a, message: o, primaryType: i, types: c, domain: l, ...u } = t, d = vo({ message: o, primaryType: i, types: c, domain: l });
  return No(e, {
    address: n,
    factory: r,
    factoryData: s,
    hash: d,
    signature: a,
    ...u
  });
}
async function Am(e, t) {
  return await e.request({
    method: "wallet_watchAsset",
    params: t
  }, { retryCount: 0 });
}
function Do(e, t) {
  const { abi: n, address: r, args: s, batch: a = !0, eventName: o, fromBlock: i, onError: c, onLogs: l, poll: u, pollingInterval: d = e.pollingInterval, strict: p } = t;
  return (typeof u < "u" ? u : typeof i == "bigint" ? !0 : !(e.transport.type === "webSocket" || e.transport.type === "fallback" && e.transport.transports[0].config.type === "webSocket")) ? (() => {
    const b = p ?? !1, y = W([
      "watchContractEvent",
      r,
      s,
      a,
      e.uid,
      o,
      d,
      b,
      i
    ]);
    return _e(y, { onLogs: l, onError: c }, (g) => {
      let A;
      i !== void 0 && (A = i - 1n);
      let v, x = !1;
      const C = Cn(async () => {
        var I;
        if (!x) {
          try {
            v = await B(e, uo, "createContractEventFilter")({
              abi: n,
              address: r,
              args: s,
              eventName: o,
              strict: b,
              fromBlock: i
            });
          } catch {
          }
          x = !0;
          return;
        }
        try {
          let E;
          if (v)
            E = await B(e, ps, "getFilterChanges")({ filter: v });
          else {
            const T = await B(e, _t, "getBlockNumber")({});
            A && A !== T ? E = await B(e, ho, "getContractEvents")({
              abi: n,
              address: r,
              args: s,
              eventName: o,
              fromBlock: A + 1n,
              toBlock: T,
              strict: b
            }) : E = [], A = T;
          }
          if (E.length === 0)
            return;
          if (a)
            g.onLogs(E);
          else
            for (const T of E)
              g.onLogs([T]);
        } catch (E) {
          v && E instanceof je && (x = !1), (I = g.onError) == null || I.call(g, E);
        }
      }, {
        emitOnBegin: !0,
        interval: d
      });
      return async () => {
        v && await B(e, fs, "uninstallFilter")({ filter: v }), C();
      };
    });
  })() : (() => {
    const b = p ?? !1, y = W([
      "watchContractEvent",
      r,
      s,
      a,
      e.uid,
      o,
      d,
      b
    ]);
    let g = !0, A = () => g = !1;
    return _e(y, { onLogs: l, onError: c }, (v) => ((async () => {
      try {
        const x = (() => {
          if (e.transport.type === "fallback") {
            const E = e.transport.transports.find((T) => T.config.type === "webSocket");
            return E ? E.value : e.transport;
          }
          return e.transport;
        })(), C = o ? Lt({
          abi: n,
          eventName: o,
          args: s
        }) : [], { unsubscribe: I } = await x.subscribe({
          params: ["logs", { address: r, topics: C }],
          onData(E) {
            var M;
            if (!g)
              return;
            const T = E.result;
            try {
              const { eventName: L, args: N } = us({
                abi: n,
                data: T.data,
                topics: T.topics,
                strict: p
              }), j = Ce(T, {
                args: N,
                eventName: L
              });
              v.onLogs([j]);
            } catch (L) {
              let N, j;
              if (L instanceof vt || L instanceof fn) {
                if (p)
                  return;
                N = L.abiItem.name, j = (M = L.abiItem.inputs) == null ? void 0 : M.some((ge) => !("name" in ge && ge.name));
              }
              const ft = Ce(T, {
                args: j ? [] : {},
                eventName: N
              });
              v.onLogs([ft]);
            }
          },
          onError(E) {
            var T;
            (T = v.onError) == null || T.call(v, E);
          }
        });
        A = I, g || A();
      } catch (x) {
        c == null || c(x);
      }
    })(), () => A()));
  })();
}
async function Cs(e, t) {
  const { abi: n, address: r, args: s, dataSuffix: a, functionName: o, ...i } = t, c = Me({
    abi: n,
    args: s,
    functionName: o
  });
  return B(e, gn, "sendTransaction")({
    data: `${c}${a ? a.replace("0x", "") : ""}`,
    to: r,
    ...i
  });
}
function Y(e, t, n) {
  const r = e[t.name];
  if (typeof r == "function")
    return r;
  const s = e[n];
  return typeof s == "function" ? s : (a) => t(e, a);
}
const lr = "2.11.6", km = () => `@wagmi/core@${lr}`;
var Eu = function(e, t, n, r) {
  if (n === "a" && !r)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Mr, Iu;
let dt = class da extends Error {
  get docsBaseUrl() {
    return "https://wagmi.sh/core";
  }
  get version() {
    return km();
  }
  constructor(t, n = {}) {
    var a;
    super(), Mr.add(this), Object.defineProperty(this, "details", {
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
      value: "WagmiCoreError"
    });
    const r = n.cause instanceof da ? n.cause.details : (a = n.cause) != null && a.message ? n.cause.message : n.details, s = n.cause instanceof da && n.cause.docsPath || n.docsPath;
    this.message = [
      t || "An error occurred.",
      "",
      ...n.metaMessages ? [...n.metaMessages, ""] : [],
      ...s ? [
        `Docs: ${this.docsBaseUrl}${s}.html${n.docsSlug ? `#${n.docsSlug}` : ""}`
      ] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: ${this.version}`
    ].join(`
`), n.cause && (this.cause = n.cause), this.details = r, this.docsPath = s, this.metaMessages = n.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return Eu(this, Mr, "m", Iu).call(this, this, t);
  }
};
Mr = /* @__PURE__ */ new WeakSet(), Iu = function e(t, n) {
  return n != null && n(t) ? t : t.cause ? Eu(this, Mr, "m", e).call(this, t.cause, n) : t;
};
let at = class extends dt {
  constructor() {
    super("Chain not configured."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainNotConfiguredError"
    });
  }
}, Em = class extends dt {
  constructor() {
    super("Connector already connected."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorAlreadyConnectedError"
    });
  }
}, Su = class extends dt {
  constructor() {
    super("Connector not connected."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorNotConnectedError"
    });
  }
}, Im = class extends dt {
  constructor({ address: t, connector: n }) {
    super(`Account "${t}" not found for connector "${n.name}".`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorAccountNotFoundError"
    });
  }
}, Sm = class extends dt {
  constructor({ connectionChainId: t, connectorChainId: n }) {
    super(`The current chain of the connector (id: ${n}) does not match the connection's chain (id: ${t}).`, {
      metaMessages: [
        `Current Chain ID:  ${n}`,
        `Expected Chain ID: ${t}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorChainMismatchError"
    });
  }
};
async function Ci(e, t) {
  var r;
  let n;
  if (typeof t.connector == "function" ? n = e._internal.connectors.setup(t.connector) : n = t.connector, n.uid === e.state.current)
    throw new Em();
  try {
    e.setState((o) => ({ ...o, status: "connecting" })), n.emitter.emit("message", { type: "connecting" });
    const s = await n.connect({ chainId: t.chainId }), a = s.accounts;
    return n.emitter.off("connect", e._internal.events.connect), n.emitter.on("change", e._internal.events.change), n.emitter.on("disconnect", e._internal.events.disconnect), await ((r = e.storage) == null ? void 0 : r.setItem("recentConnectorId", n.id)), e.setState((o) => ({
      ...o,
      connections: new Map(o.connections).set(n.uid, {
        accounts: a,
        chainId: s.chainId,
        connector: n
      }),
      current: n.uid,
      status: "connected"
    })), { accounts: a, chainId: s.chainId };
  } catch (s) {
    throw e.setState((a) => ({
      ...a,
      // Keep existing connector connected in case of error
      status: a.current ? "connected" : "disconnected"
    })), s;
  }
}
function Tm({ abi: e, address: t, client: n }) {
  const r = n, [s, a] = r ? "public" in r && "wallet" in r ? [r.public, r.wallet] : "public" in r ? [r.public, void 0] : "wallet" in r ? [void 0, r.wallet] : [r, r] : [void 0, void 0], o = s != null, i = a != null, c = {};
  let l = !1, u = !1, d = !1;
  for (const p of e)
    if (p.type === "function" ? p.stateMutability === "view" || p.stateMutability === "pure" ? l = !0 : u = !0 : p.type === "event" && (d = !0), l && u && d)
      break;
  return o && (l && (c.read = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const { args: m, options: b } = On(h);
        return B(s, de, "readContract")({
          abi: e,
          address: t,
          functionName: f,
          args: m,
          ...b
        });
      };
    }
  })), u && (c.simulate = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const { args: m, options: b } = On(h);
        return B(s, vs, "simulateContract")({
          abi: e,
          address: t,
          functionName: f,
          args: m,
          ...b
        });
      };
    }
  })), d && (c.createEventFilter = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const m = e.find((g) => g.type === "event" && g.name === f), { args: b, options: y } = _s(h, m);
        return B(s, uo, "createContractEventFilter")({
          abi: e,
          address: t,
          eventName: f,
          args: b,
          ...y
        });
      };
    }
  }), c.getEvents = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const m = e.find((g) => g.type === "event" && g.name === f), { args: b, options: y } = _s(h, m);
        return B(s, ho, "getContractEvents")({
          abi: e,
          address: t,
          eventName: f,
          args: b,
          ...y
        });
      };
    }
  }), c.watchEvent = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const m = e.find((g) => g.type === "event" && g.name === f), { args: b, options: y } = _s(h, m);
        return B(s, Do, "watchContractEvent")({
          abi: e,
          address: t,
          eventName: f,
          args: b,
          ...y
        });
      };
    }
  }))), i && u && (c.write = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const { args: m, options: b } = On(h);
        return B(a, Cs, "writeContract")({
          abi: e,
          address: t,
          functionName: f,
          args: m,
          ...b
        });
      };
    }
  })), (o || i) && u && (c.estimateGas = new Proxy({}, {
    get(p, f) {
      return (...h) => {
        const { args: m, options: b } = On(h);
        return B(s ?? a, Ol, "estimateContractGas")({
          abi: e,
          address: t,
          functionName: f,
          args: m,
          ...b,
          account: b.account ?? a.account
        });
      };
    }
  })), c.address = t, c.abi = e, c;
}
function On(e) {
  const t = e.length && Array.isArray(e[0]), n = t ? e[0] : [], r = (t ? e[1] : e[0]) ?? {};
  return { args: n, options: r };
}
function _s(e, t) {
  let n = !1;
  Array.isArray(e[0]) ? n = !0 : e.length === 1 ? n = t.inputs.some((a) => a.indexed) : e.length === 2 && (n = !0);
  const r = n ? e[0] : void 0, s = (n ? e[1] : e[0]) ?? {};
  return { args: r, options: s };
}
const pa = 256;
let Rn = pa, zn;
function Tu(e = 11) {
  if (!zn || Rn + e > pa * 2) {
    zn = "", Rn = 0;
    for (let t = 0; t < pa; t++)
      zn += (256 + Math.random() * 256 | 0).toString(16).substring(1);
  }
  return zn.substring(Rn, Rn++ + e);
}
function We(e) {
  const { batch: t, cacheTime: n = e.pollingInterval ?? 4e3, ccipRead: r, key: s = "base", name: a = "Base Client", pollingInterval: o = 4e3, type: i = "base" } = e, c = e.chain, l = e.account ? ae(e.account) : void 0, { config: u, request: d, value: p } = e.transport({
    chain: c,
    pollingInterval: o
  }), f = { ...u, ...p }, h = {
    account: l,
    batch: t,
    cacheTime: n,
    ccipRead: r,
    chain: c,
    key: s,
    name: a,
    pollingInterval: o,
    request: d,
    transport: f,
    type: i,
    uid: Tu()
  };
  function m(b) {
    return (y) => {
      const g = y(b);
      for (const v in h)
        delete g[v];
      const A = { ...b, ...g };
      return Object.assign(A, { extend: m(A) });
    };
  }
  return Object.assign(h, { extend: m(h) });
}
function Pm() {
  return null;
}
function Ht({ key: e, name: t, request: n, retryCount: r = 3, retryDelay: s = 150, timeout: a, type: o }, i) {
  const c = Tu();
  return {
    config: {
      key: e,
      name: t,
      request: n,
      retryCount: r,
      retryDelay: s,
      timeout: a,
      type: o
    },
    request: Wf(n, { retryCount: r, retryDelay: s, uid: c }),
    value: i
  };
}
function En(e, t = {}) {
  const { key: n = "custom", name: r = "Custom Provider", retryDelay: s } = t;
  return ({ retryCount: a }) => Ht({
    key: n,
    name: r,
    request: e.request.bind(e),
    retryCount: t.retryCount ?? a,
    retryDelay: s,
    type: "custom"
  });
}
function Oo(e, t = {}) {
  const { key: n = "fallback", name: r = "Fallback", rank: s = !1, retryCount: a, retryDelay: o } = t;
  return ({ chain: i, pollingInterval: c = 4e3, timeout: l, ...u }) => {
    let d = e, p = () => {
    };
    const f = Ht({
      key: n,
      name: r,
      async request({ method: h, params: m }) {
        const b = async (y = 0) => {
          const g = d[y]({
            ...u,
            chain: i,
            retryCount: 0,
            timeout: l
          });
          try {
            const A = await g.request({
              method: h,
              params: m
            });
            return p({
              method: h,
              params: m,
              response: A,
              transport: g,
              status: "success"
            }), A;
          } catch (A) {
            if (p({
              error: A,
              method: h,
              params: m,
              transport: g,
              status: "error"
            }), Bm(A) || y === d.length - 1)
              throw A;
            return b(y + 1);
          }
        };
        return b();
      },
      retryCount: a,
      retryDelay: o,
      type: "fallback"
    }, {
      onResponse: (h) => p = h,
      transports: d.map((h) => h({ chain: i, retryCount: 0 }))
    });
    if (s) {
      const h = typeof s == "object" ? s : {};
      Um({
        chain: i,
        interval: h.interval ?? c,
        onTransports: (m) => d = m,
        sampleCount: h.sampleCount,
        timeout: h.timeout,
        transports: d,
        weights: h.weights
      });
    }
    return f;
  };
}
function Bm(e) {
  return "code" in e && typeof e.code == "number" && (e.code === tt.code || e.code === U.code || e.code === 5e3);
}
function Um({ chain: e, interval: t = 4e3, onTransports: n, sampleCount: r = 10, timeout: s = 1e3, transports: a, weights: o = {} }) {
  const { stability: i = 0.7, latency: c = 0.3 } = o, l = [], u = async () => {
    const d = await Promise.all(a.map(async (h) => {
      const m = h({ chain: e, retryCount: 0, timeout: s }), b = Date.now();
      let y, g;
      try {
        await m.request({ method: "net_listening" }), g = 1;
      } catch {
        g = 0;
      } finally {
        y = Date.now();
      }
      return { latency: y - b, success: g };
    }));
    l.push(d), l.length > r && l.shift();
    const p = Math.max(...l.map((h) => Math.max(...h.map(({ latency: m }) => m)))), f = a.map((h, m) => {
      const b = l.map((x) => x[m].latency), g = 1 - b.reduce((x, C) => x + C, 0) / b.length / p, A = l.map((x) => x[m].success), v = A.reduce((x, C) => x + C, 0) / A.length;
      return v === 0 ? [0, m] : [
        c * g + i * v,
        m
      ];
    }).sort((h, m) => m[0] - h[0]);
    n(f.map(([, h]) => a[h])), await Br(t), u();
  };
  u();
}
class Ro extends k {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro"
    });
  }
}
function Xt(e, t = {}) {
  const { batch: n, fetchOptions: r, key: s = "http", name: a = "HTTP JSON-RPC", onFetchRequest: o, onFetchResponse: i, retryDelay: c } = t;
  return ({ chain: l, retryCount: u, timeout: d }) => {
    const { batchSize: p = 1e3, wait: f = 0 } = typeof n == "object" ? n : {}, h = t.retryCount ?? u, m = d ?? t.timeout ?? 1e4, b = e || (l == null ? void 0 : l.rpcUrls.default.http[0]);
    if (!b)
      throw new Ro();
    const y = Vl(b, {
      fetchOptions: r,
      onRequest: o,
      onResponse: i,
      timeout: m
    });
    return Ht({
      key: s,
      name: a,
      async request({ method: g, params: A }) {
        const v = { method: g, params: A }, { schedule: x } = so({
          id: b,
          wait: f,
          shouldSplitBatch(T) {
            return T.length > p;
          },
          fn: (T) => y.request({
            body: T
          }),
          sort: (T, M) => T.id - M.id
        }), C = async (T) => n ? x(T) : [
          await y.request({
            body: T
          })
        ], [{ error: I, result: E }] = await C(v);
        if (I)
          throw new Xe({
            body: v,
            error: I,
            url: b
          });
        return E;
      },
      retryCount: h,
      retryDelay: c,
      timeout: m,
      type: "http"
    }, {
      fetchOptions: r,
      url: b
    });
  };
}
function Mm(e) {
  var d, p, f;
  const { scheme: t, statement: n, ...r } = ((d = e.match(Fm)) == null ? void 0 : d.groups) ?? {}, { chainId: s, expirationTime: a, issuedAt: o, notBefore: i, requestId: c, ...l } = ((p = e.match(Nm)) == null ? void 0 : p.groups) ?? {}, u = (f = e.split("Resources:")[1]) == null ? void 0 : f.split(`
- `).slice(1);
  return {
    ...r,
    ...l,
    ...s ? { chainId: Number(s) } : {},
    ...a ? { expirationTime: new Date(a) } : {},
    ...o ? { issuedAt: new Date(o) } : {},
    ...i ? { notBefore: new Date(i) } : {},
    ...c ? { requestId: c } : {},
    ...u ? { resources: u } : {},
    ...t ? { scheme: t } : {},
    ...n ? { statement: n } : {}
  };
}
const Fm = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/, Nm = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
function Dm(e) {
  const { address: t, domain: n, message: r, nonce: s, scheme: a, time: o = /* @__PURE__ */ new Date() } = e;
  if (n && r.domain !== n || s && r.nonce !== s || a && r.scheme !== a || r.expirationTime && o >= r.expirationTime || r.notBefore && o < r.notBefore)
    return !1;
  try {
    if (!r.address || t && !xn(r.address, t))
      return !1;
  } catch {
    return !1;
  }
  return !0;
}
async function Om(e, t) {
  const { address: n, domain: r, message: s, nonce: a, scheme: o, signature: i, time: c = /* @__PURE__ */ new Date(), ...l } = t, u = Mm(s);
  if (!u.address || !Dm({
    address: n,
    domain: r,
    message: u,
    nonce: a,
    scheme: o,
    time: c
  }))
    return !1;
  const p = bs(s);
  return No(e, {
    address: u.address,
    hash: p,
    signature: i,
    ...l
  });
}
function zo(e) {
  return {
    call: (t) => Ve(e, t),
    createBlockFilter: () => Ef(e),
    createContractEventFilter: (t) => uo(e, t),
    createEventFilter: (t) => Nl(e, t),
    createPendingTransactionFilter: () => Dl(e),
    estimateContractGas: (t) => Ol(e, t),
    estimateGas: (t) => ct(e, t),
    getBalance: (t) => po(e, t),
    getBlobBaseFee: () => Sf(e),
    getBlock: (t) => Ue(e, t),
    getBlockNumber: (t) => _t(e, t),
    getBlockTransactionCount: (t) => Rl(e, t),
    getBytecode: (t) => Tr(e, t),
    getChainId: () => wn(e),
    getCode: (t) => Tr(e, t),
    getContractEvents: (t) => ho(e, t),
    getEip712Domain: (t) => Df(e, t),
    getEnsAddress: (t) => ao(e, t),
    getEnsAvatar: (t) => co(e, t),
    getEnsName: (t) => lo(e, t),
    getEnsResolver: (t) => Ml(e, t),
    getEnsText: (t) => io(e, t),
    getFeeHistory: (t) => zl(e, t),
    estimateFeesPerGas: (t) => Rc(e, t),
    getFilterChanges: (t) => ps(e, t),
    getFilterLogs: (t) => zf(e, t),
    getGasPrice: () => es(e),
    getLogs: (t) => fo(e, t),
    getProof: (t) => Cu(e, t),
    estimateMaxPriorityFeePerGas: (t) => Dc(e, t),
    getStorageAt: (t) => jl(e, t),
    getTransaction: (t) => $t(e, t),
    getTransactionConfirmations: (t) => Ll(e, t),
    getTransactionCount: (t) => ts(e, t),
    getTransactionReceipt: (t) => Pr(e, t),
    multicall: (t) => yo(e, t),
    prepareTransactionRequest: (t) => jt(e, t),
    readContract: (t) => de(e, t),
    sendRawTransaction: (t) => Ja(e, t),
    simulateContract: (t) => vs(e, t),
    verifyMessage: (t) => Au(e, t),
    verifySiweMessage: (t) => Om(e, t),
    verifyTypedData: (t) => ku(e, t),
    uninstallFilter: (t) => fs(e, t),
    waitForTransactionReceipt: (t) => Mo(e, t),
    watchBlocks: (t) => _l(e, t),
    watchBlockNumber: (t) => wo(e, t),
    watchContractEvent: (t) => Do(e, t),
    watchEvent: (t) => qf(e, t),
    watchPendingTransactions: (t) => $l(e, t)
  };
}
function Rm(e) {
  const { key: t = "public", name: n = "Public Client" } = e;
  return We({
    ...e,
    key: t,
    name: n,
    type: "publicClient"
  }).extend(zo);
}
function Pu({ mode: e }) {
  return (t) => {
    const n = t.extend(() => ({
      mode: e
    }));
    return {
      dropTransaction: (r) => Wh(n, r),
      dumpState: () => If(n),
      getAutomine: () => Jh(n),
      getTxpoolContent: () => Zh(n),
      getTxpoolStatus: () => Xh(n),
      impersonateAccount: (r) => Lf(n, r),
      increaseTime: (r) => _f(n, r),
      inspectTxpool: () => Yh(n),
      loadState: (r) => $f(n, r),
      mine: (r) => Hf(n, r),
      removeBlockTimestampInterval: () => em(n),
      reset: (r) => tm(n, r),
      revert: (r) => nm(n, r),
      sendUnsignedTransaction: (r) => sm(n, r),
      setAutomine: (r) => om(n, r),
      setBalance: (r) => am(n, r),
      setBlockGasLimit: (r) => im(n, r),
      setBlockTimestampInterval: (r) => cm(n, r),
      setCode: (r) => lm(n, r),
      setCoinbase: (r) => um(n, r),
      setIntervalMining: (r) => dm(n, r),
      setLoggingEnabled: (r) => pm(n, r),
      setMinGasPrice: (r) => fm(n, r),
      setNextBlockBaseFeePerGas: (r) => hm(n, r),
      setNextBlockTimestamp: (r) => mm(n, r),
      setNonce: (r) => bm(n, r),
      setRpcUrl: (r) => ym(n, r),
      setStorageAt: (r) => wm(n, r),
      snapshot: () => gm(n),
      stopImpersonatingAccount: (r) => vm(n, r)
    };
  };
}
function zm(e) {
  const { key: t = "test", name: n = "Test Client", mode: r } = e;
  return We({
    ...e,
    key: t,
    name: n,
    type: "testClient"
  }).extend((a) => ({
    mode: r,
    ...Pu({ mode: r })(a)
  }));
}
function Fr(e) {
  return {
    addChain: (t) => jd(e, t),
    deployContract: (t) => Wc(e, t),
    getAddresses: () => Qf(e),
    getChainId: () => wn(e),
    getPermissions: () => Vf(e),
    prepareTransactionRequest: (t) => jt(e, t),
    requestAddresses: () => Vh(e),
    requestPermissions: (t) => Kh(e, t),
    sendRawTransaction: (t) => Ja(e, t),
    sendTransaction: (t) => gn(e, t),
    signMessage: (t) => Fo(e, t),
    signTransaction: (t) => rm(e, t),
    signTypedData: (t) => xu(e, t),
    switchChain: (t) => Cm(e, t),
    watchAsset: (t) => Am(e, t),
    writeContract: (t) => Cs(e, t)
  };
}
function jm(e) {
  const { key: t = "wallet", name: n = "Wallet Client", transport: r } = e;
  return We({
    ...e,
    key: t,
    name: n,
    transport: r,
    type: "walletClient"
  }).extend(Fr);
}
function Bu(e, t = {}) {
  const { key: n = "webSocket", name: r = "WebSocket JSON-RPC", reconnect: s, retryDelay: a } = t;
  return ({ chain: o, retryCount: i, timeout: c }) => {
    var p;
    const l = t.retryCount ?? i, u = c ?? t.timeout ?? 1e4, d = e || ((p = o == null ? void 0 : o.rpcUrls.default.webSocket) == null ? void 0 : p[0]);
    if (!d)
      throw new Ro();
    return Ht({
      key: n,
      name: r,
      async request({ method: f, params: h }) {
        const m = { method: f, params: h }, b = await cr(d, { reconnect: s }), { error: y, result: g } = await b.requestAsync({
          body: m,
          timeout: u
        });
        if (y)
          throw new Xe({
            body: m,
            error: y,
            url: d
          });
        return g;
      },
      retryCount: l,
      retryDelay: a,
      timeout: u,
      type: "webSocket"
    }, {
      getSocket() {
        return ih(d);
      },
      getRpcClient() {
        return cr(d);
      },
      async subscribe({ params: f, onData: h, onError: m }) {
        const b = await cr(d), { result: y } = await new Promise((g, A) => b.request({
          body: {
            method: "eth_subscribe",
            params: f
          },
          onResponse(v) {
            if (v.error) {
              A(v.error), m == null || m(v.error);
              return;
            }
            if (typeof v.id == "number") {
              g(v);
              return;
            }
            v.method === "eth_subscription" && h(v.params);
          }
        }));
        return {
          subscriptionId: y,
          async unsubscribe() {
            return new Promise((g) => b.request({
              body: {
                method: "eth_unsubscribe",
                params: [y]
              },
              onResponse: g
            }));
          }
        };
      }
    });
  };
}
const Lm = "0x0000000000000000000000000000000000000000", _m = 2n ** (8n - 1n) - 1n, $m = 2n ** (16n - 1n) - 1n, Hm = 2n ** (24n - 1n) - 1n, Gm = 2n ** (32n - 1n) - 1n, qm = 2n ** (40n - 1n) - 1n, Qm = 2n ** (48n - 1n) - 1n, Vm = 2n ** (56n - 1n) - 1n, Km = 2n ** (64n - 1n) - 1n, Wm = 2n ** (72n - 1n) - 1n, Jm = 2n ** (80n - 1n) - 1n, Zm = 2n ** (88n - 1n) - 1n, Xm = 2n ** (96n - 1n) - 1n, Ym = 2n ** (104n - 1n) - 1n, eb = 2n ** (112n - 1n) - 1n, tb = 2n ** (120n - 1n) - 1n, nb = 2n ** (128n - 1n) - 1n, rb = 2n ** (136n - 1n) - 1n, sb = 2n ** (144n - 1n) - 1n, ab = 2n ** (152n - 1n) - 1n, ob = 2n ** (160n - 1n) - 1n, ib = 2n ** (168n - 1n) - 1n, cb = 2n ** (176n - 1n) - 1n, lb = 2n ** (184n - 1n) - 1n, ub = 2n ** (192n - 1n) - 1n, db = 2n ** (200n - 1n) - 1n, pb = 2n ** (208n - 1n) - 1n, fb = 2n ** (216n - 1n) - 1n, hb = 2n ** (224n - 1n) - 1n, mb = 2n ** (232n - 1n) - 1n, bb = 2n ** (240n - 1n) - 1n, yb = 2n ** (248n - 1n) - 1n, wb = 2n ** (256n - 1n) - 1n, gb = -(2n ** (8n - 1n)), vb = -(2n ** (16n - 1n)), Cb = -(2n ** (24n - 1n)), xb = -(2n ** (32n - 1n)), Ab = -(2n ** (40n - 1n)), kb = -(2n ** (48n - 1n)), Eb = -(2n ** (56n - 1n)), Ib = -(2n ** (64n - 1n)), Sb = -(2n ** (72n - 1n)), Tb = -(2n ** (80n - 1n)), Pb = -(2n ** (88n - 1n)), Bb = -(2n ** (96n - 1n)), Ub = -(2n ** (104n - 1n)), Mb = -(2n ** (112n - 1n)), Fb = -(2n ** (120n - 1n)), Nb = -(2n ** (128n - 1n)), Db = -(2n ** (136n - 1n)), Ob = -(2n ** (144n - 1n)), Rb = -(2n ** (152n - 1n)), zb = -(2n ** (160n - 1n)), jb = -(2n ** (168n - 1n)), Lb = -(2n ** (176n - 1n)), _b = -(2n ** (184n - 1n)), $b = -(2n ** (192n - 1n)), Hb = -(2n ** (200n - 1n)), Gb = -(2n ** (208n - 1n)), qb = -(2n ** (216n - 1n)), Qb = -(2n ** (224n - 1n)), Vb = -(2n ** (232n - 1n)), Kb = -(2n ** (240n - 1n)), Wb = -(2n ** (248n - 1n)), Jb = -(2n ** (256n - 1n)), Zb = 2n ** 8n - 1n, Uu = 2n ** 16n - 1n, Xb = 2n ** 24n - 1n, Yb = 2n ** 32n - 1n, e0 = 2n ** 40n - 1n, t0 = 2n ** 48n - 1n, n0 = 2n ** 56n - 1n, r0 = 2n ** 64n - 1n, s0 = 2n ** 72n - 1n, a0 = 2n ** 80n - 1n, o0 = 2n ** 88n - 1n, i0 = 2n ** 96n - 1n, c0 = 2n ** 104n - 1n, l0 = 2n ** 112n - 1n, u0 = 2n ** 120n - 1n, d0 = 2n ** 128n - 1n, p0 = 2n ** 136n - 1n, f0 = 2n ** 144n - 1n, h0 = 2n ** 152n - 1n, m0 = 2n ** 160n - 1n, b0 = 2n ** 168n - 1n, y0 = 2n ** 176n - 1n, w0 = 2n ** 184n - 1n, g0 = 2n ** 192n - 1n, v0 = 2n ** 200n - 1n, C0 = 2n ** 208n - 1n, x0 = 2n ** 216n - 1n, A0 = 2n ** 224n - 1n, k0 = 2n ** 232n - 1n, E0 = 2n ** 240n - 1n, I0 = 2n ** 248n - 1n, S0 = 2n ** 256n - 1n;
class T0 extends Error {
  constructor(t, n) {
    super(n), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.code = t, this.details = n;
  }
}
const $s = "/docs/contract/decodeDeployData";
function P0(e) {
  const { abi: t, bytecode: n, data: r } = e;
  if (r === n)
    return { bytecode: n };
  const s = t.find((o) => "type" in o && o.type === "constructor");
  if (!s)
    throw new xa({ docsPath: $s });
  if (!("inputs" in s))
    throw new tn({ docsPath: $s });
  if (!s.inputs || s.inputs.length === 0)
    throw new tn({ docsPath: $s });
  return { args: Ge(s.inputs, `0x${r.replace(n, "")}`), bytecode: n };
}
function B0({ r: e, yParityAndS: t }) {
  const n = X(t), r = n[0] & 128 ? 1 : 0, s = n;
  return r === 1 && (s[0] &= 127), { r: e, s: $(s), yParity: r };
}
function xi(e) {
  const { r: t, s: n } = _r.Signature.fromCompact(e.slice(2, 130));
  return {
    r: S(t, { size: 32 }),
    yParityAndS: S(n, { size: 32 })
  };
}
function Ai(e) {
  const { r: t, s: n } = _r.Signature.fromCompact(e.slice(2, 130)), r = +`0x${e.slice(130)}`, [s, a] = (() => {
    if (r === 0 || r === 1)
      return [void 0, r];
    if (r === 27)
      return [BigInt(r), 0];
    if (r === 28)
      return [BigInt(r), 1];
    throw new Error("Invalid yParityOrV value");
  })();
  return typeof s < "u" ? {
    r: S(t, { size: 32 }),
    s: S(n, { size: 32 }),
    v: s,
    yParity: a
  } : {
    r: S(t, { size: 32 }),
    s: S(n, { size: 32 }),
    yParity: a
  };
}
async function U0(e) {
  const { serializedTransaction: t, signature: n } = e, r = gu(t), s = n ?? {
    r: r.r,
    s: r.s,
    v: r.v,
    yParity: r.yParity
  }, a = kn({
    ...r,
    r: void 0,
    s: void 0,
    v: void 0,
    yParity: void 0,
    sidecars: void 0
  });
  return await ms({
    hash: V(a),
    signature: s
  });
}
function M0(e) {
  const { r: t, s: n, v: r, yParity: s } = e, a = Number(s ?? r - 27n);
  let o = n;
  if (a === 1) {
    const i = X(n);
    i[0] |= 128, o = $(i);
  }
  return { r: t, yParityAndS: o };
}
function ki({ r: e, yParityAndS: t }) {
  return `0x${new _r.Signature(F(e), F(t)).toCompactHex()}`;
}
function F0(e) {
  const { sidecars: t, version: n } = e, r = e.to ?? (typeof t[0].blob == "string" ? "hex" : "bytes"), s = [];
  for (const { commitment: a } of t)
    s.push(Qa({
      commitment: a,
      to: r,
      version: n
    }));
  return s;
}
function N0(e) {
  const t = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"), n = typeof e.blobs[0] == "string" ? e.blobs.map((i) => X(i)) : e.blobs, r = n.reduce((i, c) => i + c.length, 0), s = Bt(new Uint8Array(r));
  let a = !0;
  for (const i of n) {
    const c = Bt(i);
    for (; a && c.position < i.length; ) {
      c.incrementPosition(1);
      let l = 31;
      i.length - c.position < 31 && (l = i.length - c.position);
      for (const u in Array.from({ length: l })) {
        const d = c.readByte();
        if (d === 128 && !c.inspectBytes(c.remaining).includes(128)) {
          a = !1;
          break;
        }
        s.pushByte(d);
      }
    }
  }
  const o = s.bytes.slice(0, s.position);
  return t === "hex" ? $(o) : o;
}
function Mu({ blobToKzgCommitment: e, computeBlobKzgProof: t }) {
  return {
    blobToKzgCommitment: e,
    computeBlobKzgProof: t
  };
}
function D0(e, t) {
  try {
    e.loadTrustedSetup(t);
  } catch (n) {
    const r = n;
    if (!r.message.includes("trusted setup is already loaded"))
      throw r;
  }
  return Mu(e);
}
const UA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbiConstructorNotFoundError: xa,
  AbiConstructorParamsNotFoundError: tn,
  AbiDecodingDataSizeInvalidError: _d,
  AbiDecodingDataSizeTooSmallError: Aa,
  AbiDecodingZeroDataError: pn,
  AbiEncodingArrayLengthMismatchError: uc,
  AbiEncodingBytesSizeMismatchError: dc,
  AbiEncodingLengthMismatchError: ka,
  AbiErrorInputsNotFoundError: pc,
  AbiErrorNotFoundError: Xs,
  AbiErrorSignatureNotFoundError: Ea,
  AbiEventNotFoundError: Ys,
  AbiEventSignatureEmptyTopicsError: fc,
  AbiEventSignatureNotFoundError: Ia,
  AbiFunctionNotFoundError: Ye,
  AbiFunctionOutputsNotFoundError: Sa,
  AbiFunctionSignatureNotFoundError: hc,
  AccountStateConflictError: jc,
  BaseError: k,
  BaseFeeScalarError: Fc,
  BlockNotFoundError: Ha,
  BytesSizeMismatchError: Ta,
  CallExecutionError: no,
  ChainDisconnectedError: rt,
  ChainDoesNotSupportContract: hr,
  ChainMismatchError: Ac,
  ChainNotFoundError: kc,
  CircularReferenceError: yl,
  ClientChainNotConfiguredError: Fa,
  ContractFunctionExecutionError: Se,
  ContractFunctionRevertedError: Sr,
  ContractFunctionZeroDataError: El,
  CounterfactualDeploymentFailedError: Il,
  DecodeLogDataMismatch: vt,
  DecodeLogTopicsMismatch: fn,
  EIP1193ProviderRpcError: T0,
  Eip1559FeesNotSupportedError: Jr,
  EnsAvatarInvalidNftUriError: ht,
  EnsAvatarUnsupportedNamespaceError: Pl,
  EnsAvatarUriResolutionError: cs,
  EstimateGasExecutionError: zc,
  ExecutionRevertedError: Je,
  FeeCapTooHighError: Be,
  FeeCapTooLowError: mr,
  FeeConflictError: Ec,
  FilterTypeNotSupportedError: Fl,
  HttpRequestError: Oe,
  InsufficientFundsError: gr,
  IntegerOutOfRangeError: tc,
  InternalRpcError: ze,
  IntrinsicGasTooHighError: vr,
  IntrinsicGasTooLowError: Cr,
  InvalidAbiDecodingTypeError: bc,
  InvalidAbiEncodingTypeError: mc,
  InvalidAbiItemError: ol,
  InvalidAbiParameterError: cl,
  InvalidAbiParametersError: ll,
  InvalidAbiTypeParameterError: hl,
  InvalidAddressError: K,
  InvalidArrayError: yc,
  InvalidBytesBooleanError: nc,
  InvalidChainIdError: Ot,
  InvalidDefinitionTypeError: wc,
  InvalidFunctionModifierError: fl,
  InvalidHexBooleanError: rc,
  InvalidHexValueError: sc,
  InvalidInputRpcError: je,
  InvalidLegacyVError: za,
  InvalidModifierError: pl,
  InvalidParameterError: ul,
  InvalidParamsRpcError: kt,
  InvalidParenthesisError: wl,
  InvalidRequestRpcError: xt,
  InvalidSerializableTransactionError: Ic,
  InvalidSerializedTransactionError: yn,
  InvalidSerializedTransactionTypeError: Sc,
  InvalidSignatureError: bt,
  InvalidStorageKeySizeError: Tc,
  InvalidStructSignatureError: bl,
  JsonRpcVersionUnsupportedError: St,
  LimitExceededRpcError: nt,
  MaxFeePerGasTooLowError: Nc,
  MethodNotFoundRpcError: At,
  MethodNotSupportedRpcError: It,
  NonceMaxValueError: wr,
  NonceTooHighError: br,
  NonceTooLowError: yr,
  ParseRpcError: Ct,
  ProviderDisconnectedError: Le,
  ProviderRpcError: ot,
  RawContractError: os,
  ResourceNotFoundRpcError: Et,
  ResourceUnavailableRpcError: re,
  RpcError: te,
  RpcRequestError: Xe,
  SizeExceedsPaddingSizeError: Ca,
  SizeOverflowError: ac,
  SliceOffsetOutOfBoundsError: va,
  SolidityProtectedKeywordError: dl,
  StateAssignmentConflictError: Lc,
  SwitchChainError: G,
  TimeoutError: Ar,
  TipAboveFeeCapError: et,
  TransactionExecutionError: Pc,
  TransactionNotFoundError: ja,
  TransactionReceiptNotFoundError: La,
  TransactionRejectedRpcError: tt,
  TransactionTypeNotSupportedError: xr,
  UnauthorizedProviderError: Tt,
  UnknownNodeError: mn,
  UnknownRpcError: Uc,
  UnknownSignatureError: ml,
  UnknownTypeError: il,
  UnsupportedPackedAbiType: gc,
  UnsupportedProviderMethodError: Pt,
  UrlRequiredError: Ro,
  UserRejectedRequestError: U,
  WaitForTransactionReceiptTimeoutError: ea,
  WebSocketRequestError: Bc,
  assertCurrentChain: Na,
  assertRequest: Rt,
  assertTransactionEIP1559: ys,
  assertTransactionEIP2930: So,
  assertTransactionLegacy: To,
  blobsToCommitments: ns,
  blobsToProofs: rs,
  boolToBytes: ic,
  boolToHex: $r,
  bytesToBigInt: Za,
  bytesToBool: Xa,
  bytesToHex: $,
  bytesToNumber: ye,
  bytesToRlp: bh,
  bytesToString: Ya,
  ccipFetch: Ur,
  ccipRequest: Ur,
  checksumAddress: Dt,
  commitmentToVersionedHash: Qa,
  commitmentsToVersionedHashes: Va,
  compactSignatureToHex: ki,
  compactSignatureToSignature: B0,
  concat: ue,
  concatBytes: vc,
  concatHex: se,
  createClient: We,
  createNonceManager: vu,
  createPublicClient: Rm,
  createTestClient: zm,
  createTransport: Ht,
  createWalletClient: jm,
  custom: En,
  decodeAbiParameters: Ge,
  decodeDeployData: P0,
  decodeErrorResult: to,
  decodeEventLog: us,
  decodeFunctionData: dh,
  decodeFunctionResult: lt,
  defineBlock: Yr,
  defineChain: w,
  defineKzg: Mu,
  defineTransaction: Zr,
  defineTransactionReceipt: bo,
  defineTransactionRequest: $a,
  domainSeparator: uh,
  encodeAbiParameters: Ae,
  encodeDeployData: hn,
  encodeErrorResult: ph,
  encodeEventTopics: Lt,
  encodeFunctionData: Me,
  encodeFunctionResult: fh,
  encodePacked: hh,
  erc20Abi: up,
  erc20Abi_bytes32: dp,
  erc4626Abi: fp,
  erc721Abi: pp,
  etherUnits: Da,
  extractChain: th,
  fallback: Oo,
  formatBlock: Xr,
  formatEther: Vr,
  formatGwei: ee,
  formatLog: Ce,
  formatTransaction: zt,
  formatTransactionReceipt: mo,
  formatTransactionRequest: it,
  formatUnits: ce,
  fromBlobs: N0,
  fromBytes: hp,
  fromHex: Zs,
  fromRlp: Ao,
  getAbiItem: Qe,
  getAddress: O,
  getChainContractAddress: ut,
  getContract: Tm,
  getContractAddress: vh,
  getContractError: Ut,
  getCreate2Address: ru,
  getCreateAddress: nu,
  getEventSelector: rn,
  getEventSignature: Kt,
  getFunctionSelector: st,
  getFunctionSignature: Kt,
  getSerializedTransactionType: yu,
  getTransactionType: Wa,
  getTypesForEIP712Domain: hs,
  gweiUnits: Oa,
  hashDomain: Co,
  hashMessage: bs,
  hashTypedData: vo,
  hexToBigInt: F,
  hexToBool: lc,
  hexToBytes: X,
  hexToCompactSignature: xi,
  hexToNumber: Q,
  hexToRlp: yh,
  hexToSignature: Ai,
  hexToString: Re,
  http: Xt,
  isAddress: H,
  isAddressEqual: xn,
  isBytes: la,
  isErc6492Signature: Io,
  isHash: au,
  isHex: D,
  keccak256: V,
  labelhash: Tl,
  maxInt104: Ym,
  maxInt112: eb,
  maxInt120: tb,
  maxInt128: nb,
  maxInt136: rb,
  maxInt144: sb,
  maxInt152: ab,
  maxInt16: $m,
  maxInt160: ob,
  maxInt168: ib,
  maxInt176: cb,
  maxInt184: lb,
  maxInt192: ub,
  maxInt200: db,
  maxInt208: pb,
  maxInt216: fb,
  maxInt224: hb,
  maxInt232: mb,
  maxInt24: Hm,
  maxInt240: bb,
  maxInt248: yb,
  maxInt256: wb,
  maxInt32: Gm,
  maxInt40: qm,
  maxInt48: Qm,
  maxInt56: Vm,
  maxInt64: Km,
  maxInt72: Wm,
  maxInt8: _m,
  maxInt80: Jm,
  maxInt88: Zm,
  maxInt96: Xm,
  maxUint104: c0,
  maxUint112: l0,
  maxUint120: u0,
  maxUint128: d0,
  maxUint136: p0,
  maxUint144: f0,
  maxUint152: h0,
  maxUint16: Uu,
  maxUint160: m0,
  maxUint168: b0,
  maxUint176: y0,
  maxUint184: w0,
  maxUint192: g0,
  maxUint200: v0,
  maxUint208: C0,
  maxUint216: x0,
  maxUint224: A0,
  maxUint232: k0,
  maxUint24: Xb,
  maxUint240: E0,
  maxUint248: I0,
  maxUint256: S0,
  maxUint32: Yb,
  maxUint40: e0,
  maxUint48: t0,
  maxUint56: n0,
  maxUint64: r0,
  maxUint72: s0,
  maxUint8: Zb,
  maxUint80: a0,
  maxUint88: o0,
  maxUint96: i0,
  minInt104: Ub,
  minInt112: Mb,
  minInt120: Fb,
  minInt128: Nb,
  minInt136: Db,
  minInt144: Ob,
  minInt152: Rb,
  minInt16: vb,
  minInt160: zb,
  minInt168: jb,
  minInt176: Lb,
  minInt184: _b,
  minInt192: $b,
  minInt200: Hb,
  minInt208: Gb,
  minInt216: qb,
  minInt224: Qb,
  minInt232: Vb,
  minInt24: Cb,
  minInt240: Kb,
  minInt248: Wb,
  minInt256: Jb,
  minInt32: xb,
  minInt40: Ab,
  minInt48: kb,
  minInt56: Eb,
  minInt64: Ib,
  minInt72: Sb,
  minInt8: gb,
  minInt80: Tb,
  minInt88: Pb,
  minInt96: Bb,
  multicall3Abi: kr,
  namehash: Zt,
  nonceManager: Gh,
  numberToBytes: cc,
  numberToHex: S,
  offchainLookup: Gl,
  offchainLookupAbiItem: go,
  offchainLookupSignature: Hl,
  pad: le,
  padBytes: oc,
  padHex: be,
  parseAbi: eo,
  parseAbiItem: Wp,
  parseAbiParameter: Jp,
  parseAbiParameters: Zp,
  parseCompactSignature: xi,
  parseErc6492Signature: Mh,
  parseEther: _h,
  parseEventLogs: ds,
  parseGwei: $h,
  parseSignature: Ai,
  parseTransaction: gu,
  parseUnits: gs,
  prepareEncodeFunctionData: xl,
  presignMessagePrefix: du,
  publicActions: zo,
  recoverAddress: ms,
  recoverMessageAddress: fu,
  recoverPublicKey: uu,
  recoverTransactionAddress: U0,
  recoverTypedDataAddress: hu,
  ripemd160: Th,
  rpcSchema: Pm,
  rpcTransactionType: Mc,
  serializeAccessList: An,
  serializeCompactSignature: ki,
  serializeErc6492Signature: bu,
  serializeSignature: ua,
  serializeTransaction: kn,
  serializeTypedData: Xl,
  setupKzg: D0,
  sha256: qa,
  sidecarsToVersionedHashes: F0,
  signatureToCompactSignature: M0,
  signatureToHex: ua,
  size: q,
  slice: Pe,
  sliceBytes: Pa,
  sliceHex: qr,
  stringToBytes: De,
  stringToHex: Te,
  stringify: W,
  testActions: Pu,
  toBlobSidecars: ss,
  toBlobs: Vc,
  toBytes: J,
  toEventHash: Ir,
  toEventSelector: rn,
  toEventSignature: Kt,
  toFunctionHash: Ir,
  toFunctionSelector: st,
  toFunctionSignature: Kt,
  toHex: P,
  toPrefixedMessage: pu,
  toRlp: pe,
  transactionType: Ga,
  trim: Z,
  validateTypedData: xo,
  verifyMessage: Ph,
  verifyTypedData: Bh,
  walletActions: Fr,
  webSocket: Bu,
  weiUnits: Ra,
  withRetry: $e,
  withTimeout: Ke,
  zeroAddress: Lm,
  zeroHash: Uh
}, Symbol.toStringTag, { value: "Module" }));
async function In(e, t = {}) {
  let n;
  if (t.connector) {
    const { connector: l } = t, [u, d] = await Promise.all([
      l.getAccounts(),
      l.getChainId()
    ]);
    n = {
      accounts: u,
      chainId: d,
      connector: l
    };
  } else
    n = e.state.connections.get(e.state.current);
  if (!n)
    throw new Su();
  const r = t.chainId ?? n.chainId, s = await n.connector.getChainId();
  if (s !== n.chainId)
    throw new Sm({
      connectionChainId: n.chainId,
      connectorChainId: s
    });
  const a = n.connector;
  if (a.getClient)
    return a.getClient({ chainId: r });
  const o = ae(t.account ?? n.accounts[0]);
  o.address = O(o.address);
  const i = e.chains.find((l) => l.id === r), c = await n.connector.getProvider({ chainId: r });
  if (t.account && !n.accounts.some((l) => l.toLowerCase() === o.address.toLowerCase()))
    throw new Im({
      address: o.address,
      connector: a
    });
  return We({
    account: o,
    chain: i,
    name: "Connector Client",
    transport: (l) => En(c)({ ...l, retryCount: 0 })
  });
}
async function O0(e, t = {}) {
  var s, a;
  let n;
  if (t.connector)
    n = t.connector;
  else {
    const { connections: o, current: i } = e.state, c = o.get(i);
    n = c == null ? void 0 : c.connector;
  }
  const r = e.state.connections;
  n && (await n.disconnect(), n.emitter.off("change", e._internal.events.change), n.emitter.off("disconnect", e._internal.events.disconnect), n.emitter.on("connect", e._internal.events.connect), r.delete(n.uid)), e.setState((o) => {
    if (r.size === 0)
      return {
        ...o,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      };
    const i = r.values().next().value;
    return {
      ...o,
      connections: new Map(r),
      current: i.connector.uid
    };
  });
  {
    const o = e.state.current;
    if (!o)
      return;
    const i = (s = e.state.connections.get(o)) == null ? void 0 : s.connector;
    if (!i)
      return;
    await ((a = e.storage) == null ? void 0 : a.setItem("recentConnectorId", i.id));
  }
}
async function R0(e, t) {
  const { chainId: n, connector: r, ...s } = t;
  let a;
  t.account ? a = t.account : a = (await In(e, {
    account: t.account,
    chainId: n,
    connector: r
  })).account;
  const o = e.getClient({ chainId: n });
  return Y(o, ct, "estimateGas")({ ...s, account: a });
}
function Fu(e) {
  return typeof e == "number" ? e : e === "wei" ? 0 : Math.abs(Ra[e]);
}
function Sn(e) {
  const t = e.state.current, n = e.state.connections.get(t), r = n == null ? void 0 : n.accounts, s = r == null ? void 0 : r[0], a = e.chains.find((i) => i.id === (n == null ? void 0 : n.chainId)), o = e.state.status;
  switch (o) {
    case "connected":
      return {
        address: s,
        addresses: r,
        chain: a,
        chainId: n == null ? void 0 : n.chainId,
        connector: n == null ? void 0 : n.connector,
        isConnected: !0,
        isConnecting: !1,
        isDisconnected: !1,
        isReconnecting: !1,
        status: o
      };
    case "reconnecting":
      return {
        address: s,
        addresses: r,
        chain: a,
        chainId: n == null ? void 0 : n.chainId,
        connector: n == null ? void 0 : n.connector,
        isConnected: !!s,
        isConnecting: !1,
        isDisconnected: !1,
        isReconnecting: !0,
        status: o
      };
    case "connecting":
      return {
        address: s,
        addresses: r,
        chain: a,
        chainId: n == null ? void 0 : n.chainId,
        connector: n == null ? void 0 : n.connector,
        isConnected: !1,
        isConnecting: !0,
        isDisconnected: !1,
        isReconnecting: !1,
        status: o
      };
    case "disconnected":
      return {
        address: void 0,
        addresses: void 0,
        chain: void 0,
        chainId: void 0,
        connector: void 0,
        isConnected: !1,
        isConnecting: !1,
        isDisconnected: !0,
        isReconnecting: !1,
        status: o
      };
  }
}
async function z0(e, t) {
  const { allowFailure: n = !0, chainId: r, contracts: s, ...a } = t, o = e.getClient({ chainId: r });
  return Y(o, yo, "multicall")({
    allowFailure: n,
    contracts: s,
    ...a
  });
}
function j0(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return Y(s, de, "readContract")(r);
}
async function L0(e, t) {
  var i;
  const { allowFailure: n = !0, blockNumber: r, blockTag: s, ...a } = t, o = t.contracts;
  try {
    const c = {};
    for (const [p, f] of o.entries()) {
      const h = f.chainId ?? e.state.chainId;
      c[h] || (c[h] = []), (i = c[h]) == null || i.push({ contract: f, index: p });
    }
    const l = () => Object.entries(c).map(([p, f]) => z0(e, {
      ...a,
      allowFailure: n,
      blockNumber: r,
      blockTag: s,
      chainId: Number.parseInt(p),
      contracts: f.map(({ contract: h }) => h)
    })), u = (await Promise.all(l())).flat(), d = Object.values(c).flatMap((p) => p.map(({ index: f }) => f));
    return u.reduce((p, f, h) => (p && (p[d[h]] = f), p), []);
  } catch (c) {
    if (c instanceof Se)
      throw c;
    const l = () => o.map((u) => j0(e, { ...u, blockNumber: r, blockTag: s }));
    return n ? (await Promise.allSettled(l())).map((u) => u.status === "fulfilled" ? { result: u.value, status: "success" } : { error: u.reason, result: void 0, status: "failure" }) : await Promise.all(l());
  }
}
async function _0(e, t) {
  const { address: n, blockNumber: r, blockTag: s, chainId: a, token: o, unit: i = "ether" } = t;
  if (o)
    try {
      return Ei(e, {
        balanceAddress: n,
        chainId: a,
        symbolType: "string",
        tokenAddress: o
      });
    } catch (p) {
      if (p instanceof Se) {
        const f = await Ei(e, {
          balanceAddress: n,
          chainId: a,
          symbolType: "bytes32",
          tokenAddress: o
        }), h = Re(Z(f.symbol, { dir: "right" }));
        return { ...f, symbol: h };
      }
      throw p;
    }
  const c = e.getClient({ chainId: a }), u = await Y(c, po, "getBalance")(r ? { address: n, blockNumber: r } : { address: n, blockTag: s }), d = e.chains.find((p) => p.id === a) ?? c.chain;
  return {
    decimals: d.nativeCurrency.decimals,
    formatted: ce(u, Fu(i)),
    symbol: d.nativeCurrency.symbol,
    value: u
  };
}
async function Ei(e, t) {
  const { balanceAddress: n, chainId: r, symbolType: s, tokenAddress: a, unit: o } = t, i = {
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ type: "address" }],
        outputs: [{ type: "uint256" }]
      },
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: s }]
      }
    ],
    address: a
  }, [c, l, u] = await L0(e, {
    allowFailure: !1,
    contracts: [
      {
        ...i,
        functionName: "balanceOf",
        args: [n],
        chainId: r
      },
      { ...i, functionName: "decimals", chainId: r },
      { ...i, functionName: "symbol", chainId: r }
    ]
  }), d = ce(c ?? "0", Fu(o ?? l));
  return { decimals: l, formatted: d, symbol: u, value: c };
}
function Nr(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    let n, r;
    if (Array.isArray(e) && Array.isArray(t)) {
      if (n = e.length, n !== t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Nr(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const s = Object.keys(e);
    if (n = s.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = s[r];
      if (a && !Nr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
let jn = [];
function $0(e) {
  const t = [...e.state.connections.values()];
  return e.state.status === "reconnecting" || Nr(jn, t) ? jn : (jn = t, t);
}
function H0(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return Y(s, ao, "getEnsAddress")(r);
}
function Ii(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return Y(s, co, "getEnsAvatar")(r);
}
function G0(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return Y(s, lo, "getEnsName")(r);
}
async function q0(e, t) {
  const { account: n, chainId: r, ...s } = t, a = n ?? Sn(e).address, o = e.getClient({ chainId: r });
  return Y(o, jt, "prepareTransactionRequest")({
    ...s,
    ...a ? { account: a } : {}
  });
}
let Hs = !1;
async function Q0(e, t = {}) {
  var l, u;
  if (Hs)
    return [];
  Hs = !0, e.setState((d) => ({
    ...d,
    status: d.current ? "reconnecting" : "connecting"
  }));
  const n = [];
  if ((l = t.connectors) != null && l.length)
    for (const d of t.connectors) {
      let p;
      typeof d == "function" ? p = e._internal.connectors.setup(d) : p = d, n.push(p);
    }
  else
    n.push(...e.connectors);
  let r;
  try {
    r = await ((u = e.storage) == null ? void 0 : u.getItem("recentConnectorId"));
  } catch {
  }
  const s = {};
  for (const [, d] of e.state.connections)
    s[d.connector.id] = 1;
  r && (s[r] = 0);
  const a = Object.keys(s).length > 0 ? (
    // .toSorted()
    [...n].sort((d, p) => (s[d.id] ?? 10) - (s[p.id] ?? 10))
  ) : n;
  let o = !1;
  const i = [], c = [];
  for (const d of a) {
    const p = await d.getProvider().catch(() => {
    });
    if (!p || c.some((m) => m === p) || !await d.isAuthorized())
      continue;
    const h = await d.connect({ isReconnecting: !0 }).catch(() => null);
    h && (d.emitter.off("connect", e._internal.events.connect), d.emitter.on("change", e._internal.events.change), d.emitter.on("disconnect", e._internal.events.disconnect), e.setState((m) => {
      const b = new Map(o ? m.connections : /* @__PURE__ */ new Map()).set(d.uid, { accounts: h.accounts, chainId: h.chainId, connector: d });
      return {
        ...m,
        current: o ? m.current : d.uid,
        connections: b
      };
    }), i.push({
      accounts: h.accounts,
      chainId: h.chainId,
      connector: d
    }), c.push(p), o = !0);
  }
  return (e.state.status === "reconnecting" || e.state.status === "connecting") && (o ? e.setState((d) => ({ ...d, status: "connected" })) : e.setState((d) => ({
    ...d,
    connections: /* @__PURE__ */ new Map(),
    current: null,
    status: "disconnected"
  }))), Hs = !1, i;
}
async function V0(e, t) {
  const { account: n, chainId: r, connector: s, gas: a, ...o } = t;
  let i;
  typeof n == "object" && n.type === "local" ? i = e.getClient({ chainId: r }) : i = await In(e, { account: n, chainId: r, connector: s });
  const { connector: c } = Sn(e), l = await (async () => {
    var p;
    if (!(!("data" in t) || !t.data) && !((p = s ?? c) != null && p.supportsSimulation) && a !== null)
      return a === void 0 ? Y(i, ct, "estimateGas")({
        ...o,
        account: n,
        chain: r ? { id: r } : null
      }) : a;
  })();
  return await Y(i, gn, "sendTransaction")({
    ...o,
    ...n ? { account: n } : {},
    gas: l,
    chain: r ? { id: r } : null
  });
}
async function K0(e, t) {
  const { account: n, connector: r, ...s } = t;
  let a;
  return typeof n == "object" && n.type === "local" ? a = e.getClient() : a = await In(e, { account: n, connector: r }), Y(a, Fo, "signMessage")({
    ...s,
    ...n ? { account: n } : {}
  });
}
async function W0(e, t) {
  const { abi: n, chainId: r, connector: s, ...a } = t;
  let o;
  t.account ? o = t.account : o = (await In(e, {
    chainId: r,
    connector: s
  })).account;
  const i = e.getClient({ chainId: r }), c = Y(i, vs, "simulateContract"), { result: l, request: u } = await c({ ...a, abi: n, account: o });
  return {
    chainId: i.chain.id,
    result: l,
    request: { __mode: "prepared", ...u, chainId: r }
  };
}
async function J0(e, t) {
  var s;
  const { connector: n } = t, r = e.state.connections.get(n.uid);
  if (!r)
    throw new Su();
  return await ((s = e.storage) == null ? void 0 : s.setItem("recentConnectorId", n.id)), e.setState((a) => ({
    ...a,
    current: n.uid
  })), {
    accounts: r.accounts,
    chainId: r.chainId
  };
}
let Ne = class extends dt {
  constructor() {
    super("Provider not found."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderNotFoundError"
    });
  }
}, Z0 = class extends dt {
  constructor({ connector: t }) {
    super(`"${t.name}" does not support programmatic chain switching.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SwitchChainNotSupportedError"
    });
  }
};
async function X0(e, t) {
  var o;
  const { addEthereumChainParameter: n, chainId: r } = t, s = e.state.connections.get(((o = t.connector) == null ? void 0 : o.uid) ?? e.state.current);
  if (s) {
    const i = s.connector;
    if (!i.switchChain)
      throw new Z0({ connector: i });
    return await i.switchChain({
      addEthereumChainParameter: n,
      chainId: r
    });
  }
  const a = e.chains.find((i) => i.id === r);
  if (!a)
    throw new at();
  return e.setState((i) => ({ ...i, chainId: r })), a;
}
function Y0(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => Sn(e), n, {
    equalityFn(r, s) {
      const { connector: a, ...o } = r, { connector: i, ...c } = s;
      return Nr(o, c) && // check connector separately
      (a == null ? void 0 : a.id) === (i == null ? void 0 : i.id) && (a == null ? void 0 : a.uid) === (i == null ? void 0 : i.uid);
    }
  });
}
function ey(e, t) {
  const { onChange: n } = t;
  return e._internal.connectors.subscribe((r, s) => {
    n(Object.values(r), s);
  });
}
async function ty(e, t) {
  const { chainId: n, timeout: r = 0, ...s } = t, a = e.getClient({ chainId: n }), i = await Y(a, Mo, "waitForTransactionReceipt")({ ...s, timeout: r });
  if (i.status === "reverted") {
    const l = await Y(a, $t, "getTransaction")({ hash: i.transactionHash }), d = await Y(a, Ve, "call")({
      ...l,
      gasPrice: l.type !== "eip1559" ? l.gasPrice : void 0,
      maxFeePerGas: l.type === "eip1559" ? l.maxFeePerGas : void 0,
      maxPriorityFeePerGas: l.type === "eip1559" ? l.maxPriorityFeePerGas : void 0
    }), p = d != null && d.data ? Re(`0x${d.data.substring(138)}`) : "unknown reason";
    throw new Error(p);
  }
  return {
    ...i,
    chainId: a.chain.id
  };
}
async function ny(e, t) {
  const { account: n, chainId: r, connector: s, __mode: a, ...o } = t;
  let i;
  typeof n == "object" && n.type === "local" ? i = e.getClient({ chainId: r }) : i = await In(e, { account: n, chainId: r, connector: s });
  const { connector: c } = Sn(e);
  let l;
  if (a === "prepared" || c != null && c.supportsSimulation)
    l = o;
  else {
    const { request: p } = await W0(e, {
      ...o,
      account: n,
      chainId: r
    });
    l = p;
  }
  return await Y(i, Cs, "writeContract")({
    ...l,
    ...n ? { account: n } : {},
    chain: r ? { id: r } : null
  });
}
const ry = /(rabby|trustwallet)/, sy = {
  coinbaseWallet: {
    id: "coinbaseWallet",
    name: "Coinbase Wallet",
    provider(e) {
      return e != null && e.coinbaseWalletExtension ? e.coinbaseWalletExtension : ur(e, "isCoinbaseWallet");
    }
  },
  metaMask: {
    id: "metaMask",
    name: "MetaMask",
    provider(e) {
      return ur(e, (t) => {
        if (!t.isMetaMask || t.isBraveWallet && !t._events && !t._state)
          return !1;
        const n = [
          "isApexWallet",
          "isAvalanche",
          "isBitKeep",
          "isBlockWallet",
          "isKuCoinWallet",
          "isMathWallet",
          "isOkxWallet",
          "isOKExWallet",
          "isOneInchIOSWallet",
          "isOneInchAndroidWallet",
          "isOpera",
          "isPortal",
          "isRabby",
          "isTokenPocket",
          "isTokenary",
          "isZerion"
        ];
        for (const r of n)
          if (t[r])
            return !1;
        return !0;
      });
    }
  },
  phantom: {
    id: "phantom",
    name: "Phantom",
    provider(e) {
      var t, n;
      return (t = e == null ? void 0 : e.phantom) != null && t.ethereum ? (n = e.phantom) == null ? void 0 : n.ethereum : ur(e, "isPhantom");
    }
  }
};
xs.type = "injected";
function xs(e = {}) {
  const { shimDisconnect: t = !0, unstable_shimAsyncInject: n } = e;
  function r() {
    const c = e.target;
    if (typeof c == "function") {
      const l = c();
      if (l)
        return l;
    }
    return typeof c == "object" ? c : typeof c == "string" ? {
      ...sy[c] ?? {
        id: c,
        name: `${c[0].toUpperCase()}${c.slice(1)}`,
        provider: `is${c[0].toUpperCase()}${c.slice(1)}`
      }
    } : {
      id: "injected",
      name: "Injected",
      provider(l) {
        return l == null ? void 0 : l.ethereum;
      }
    };
  }
  let s, a, o, i;
  return (c) => ({
    get icon() {
      return r().icon;
    },
    get id() {
      return r().id;
    },
    get name() {
      return r().name;
    },
    get supportsSimulation() {
      return ry.test(this.id.toLowerCase());
    },
    type: xs.type,
    async setup() {
      const l = await this.getProvider();
      l && e.target && (o || (o = this.onConnect.bind(this), l.on("connect", o)), s || (s = this.onAccountsChanged.bind(this), l.on("accountsChanged", s)));
    },
    async connect({ chainId: l, isReconnecting: u } = {}) {
      var f, h, m, b, y, g;
      const d = await this.getProvider();
      if (!d)
        throw new Ne();
      let p = [];
      if (u)
        p = await this.getAccounts().catch(() => []);
      else if (t)
        try {
          p = (b = (m = (h = (f = (await d.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          }))[0]) == null ? void 0 : f.caveats) == null ? void 0 : h[0]) == null ? void 0 : m.value) == null ? void 0 : b.map((v) => O(v));
        } catch (A) {
          const v = A;
          if (v.code === U.code)
            throw new U(v);
          if (v.code === re.code)
            throw v;
        }
      try {
        !(p != null && p.length) && !u && (p = (await d.request({
          method: "eth_requestAccounts"
        })).map((x) => O(x))), o && (d.removeListener("connect", o), o = void 0), s || (s = this.onAccountsChanged.bind(this), d.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), d.on("chainChanged", a)), i || (i = this.onDisconnect.bind(this), d.on("disconnect", i));
        let A = await this.getChainId();
        if (l && A !== l) {
          const v = await this.switchChain({ chainId: l }).catch((x) => {
            if (x.code === U.code)
              throw x;
            return { id: A };
          });
          A = (v == null ? void 0 : v.id) ?? A;
        }
        return t && await ((y = c.storage) == null ? void 0 : y.removeItem(`${this.id}.disconnected`)), e.target || await ((g = c.storage) == null ? void 0 : g.setItem("injected.connected", !0)), { accounts: p, chainId: A };
      } catch (A) {
        const v = A;
        throw v.code === U.code ? new U(v) : v.code === re.code ? new re(v) : v;
      }
    },
    async disconnect() {
      var u, d;
      const l = await this.getProvider();
      if (!l)
        throw new Ne();
      a && (l.removeListener("chainChanged", a), a = void 0), i && (l.removeListener("disconnect", i), i = void 0), o || (o = this.onConnect.bind(this), l.on("connect", o));
      try {
        await Ke(() => (
          // TODO: Remove explicit type for viem@3
          l.request({
            // `'wallet_revokePermissions'` added in `viem@2.10.3`
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
          })
        ), { timeout: 100 });
      } catch {
      }
      t && await ((u = c.storage) == null ? void 0 : u.setItem(`${this.id}.disconnected`, !0)), e.target || await ((d = c.storage) == null ? void 0 : d.removeItem("injected.connected"));
    },
    async getAccounts() {
      const l = await this.getProvider();
      if (!l)
        throw new Ne();
      return (await l.request({ method: "eth_accounts" })).map((d) => O(d));
    },
    async getChainId() {
      const l = await this.getProvider();
      if (!l)
        throw new Ne();
      const u = await l.request({ method: "eth_chainId" });
      return Number(u);
    },
    async getProvider() {
      if (typeof window > "u")
        return;
      let l;
      const u = r();
      return typeof u.provider == "function" ? l = u.provider(window) : typeof u.provider == "string" ? l = ur(window, u.provider) : l = u.provider, l && !l.removeListener && ("off" in l && typeof l.off == "function" ? l.removeListener = l.off : l.removeListener = () => {
      }), l;
    },
    async isAuthorized() {
      var l, u;
      try {
        if (t && // If shim exists in storage, connector is disconnected
        await ((l = c.storage) == null ? void 0 : l.getItem(`${this.id}.disconnected`)) || !e.target && !await ((u = c.storage) == null ? void 0 : u.getItem("injected.connected")))
          return !1;
        if (!await this.getProvider()) {
          if (n !== void 0 && n !== !1) {
            const h = async () => (typeof window < "u" && window.removeEventListener("ethereum#initialized", h), !!await this.getProvider()), m = typeof n == "number" ? n : 1e3;
            if (await Promise.race([
              ...typeof window < "u" ? [
                new Promise((y) => window.addEventListener("ethereum#initialized", () => y(h()), { once: !0 }))
              ] : [],
              new Promise((y) => setTimeout(() => y(h()), m))
            ]))
              return !0;
          }
          throw new Ne();
        }
        return !!(await $e(() => this.getAccounts())).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: l, chainId: u }) {
      var f, h, m, b;
      const d = await this.getProvider();
      if (!d)
        throw new Ne();
      const p = c.chains.find((y) => y.id === u);
      if (!p)
        throw new G(new at());
      try {
        return await Promise.all([
          d.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: S(u) }]
          }).then(async () => {
            await this.getChainId() === u && c.emitter.emit("change", { chainId: u });
          }),
          new Promise((y) => c.emitter.once("change", ({ chainId: g }) => {
            g === u && y();
          }))
        ]), p;
      } catch (y) {
        const g = y;
        if (g.code === 4902 || // Unwrapping for MetaMask Mobile
        // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
        ((h = (f = g == null ? void 0 : g.data) == null ? void 0 : f.originalError) == null ? void 0 : h.code) === 4902)
          try {
            const { default: A, ...v } = p.blockExplorers ?? {};
            let x;
            l != null && l.blockExplorerUrls ? x = l.blockExplorerUrls : A && (x = [
              A.url,
              ...Object.values(v).map((T) => T.url)
            ]);
            let C;
            (m = l == null ? void 0 : l.rpcUrls) != null && m.length ? C = l.rpcUrls : C = [((b = p.rpcUrls.default) == null ? void 0 : b.http[0]) ?? ""];
            const I = {
              blockExplorerUrls: x,
              chainId: S(u),
              chainName: (l == null ? void 0 : l.chainName) ?? p.name,
              iconUrls: l == null ? void 0 : l.iconUrls,
              nativeCurrency: (l == null ? void 0 : l.nativeCurrency) ?? p.nativeCurrency,
              rpcUrls: C
            };
            if (await d.request({
              method: "wallet_addEthereumChain",
              params: [I]
            }), await this.getChainId() !== u)
              throw new U(new Error("User rejected switch after adding network."));
            return p;
          } catch (A) {
            throw new U(A);
          }
        throw g.code === U.code ? new U(g) : new G(g);
      }
    },
    async onAccountsChanged(l) {
      var u;
      if (l.length === 0)
        this.onDisconnect();
      else if (c.emitter.listenerCount("connect")) {
        const d = (await this.getChainId()).toString();
        this.onConnect({ chainId: d }), t && await ((u = c.storage) == null ? void 0 : u.removeItem(`${this.id}.disconnected`));
      } else
        c.emitter.emit("change", {
          accounts: l.map((d) => O(d))
        });
    },
    onChainChanged(l) {
      const u = Number(l);
      c.emitter.emit("change", { chainId: u });
    },
    async onConnect(l) {
      const u = await this.getAccounts();
      if (u.length === 0)
        return;
      const d = Number(l.chainId);
      c.emitter.emit("connect", { accounts: u, chainId: d });
      const p = await this.getProvider();
      p && (o && (p.removeListener("connect", o), o = void 0), s || (s = this.onAccountsChanged.bind(this), p.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), p.on("chainChanged", a)), i || (i = this.onDisconnect.bind(this), p.on("disconnect", i)));
    },
    async onDisconnect(l) {
      const u = await this.getProvider();
      l && l.code === 1013 && u && (await this.getAccounts()).length || (c.emitter.emit("disconnect"), u && (a && (u.removeListener("chainChanged", a), a = void 0), i && (u.removeListener("disconnect", i), i = void 0), o || (o = this.onConnect.bind(this), u.on("connect", o))));
    }
  });
}
function ur(e, t) {
  function n(s) {
    return typeof t == "function" ? t(s) : typeof t == "string" ? s[t] : !0;
  }
  const r = e.ethereum;
  if (r != null && r.providers)
    return r.providers.find((s) => n(s));
  if (r && n(r))
    return r;
}
function ay(e) {
  const t = (n) => e(n.detail);
  return window.addEventListener("eip6963:announceProvider", t), window.dispatchEvent(new CustomEvent("eip6963:requestProvider")), () => window.removeEventListener("eip6963:announceProvider", t);
}
function Nu() {
  const e = /* @__PURE__ */ new Set();
  let t = [];
  const n = () => ay((s) => {
    t.some(({ info: a }) => a.uuid === s.info.uuid) || (t = [...t, s], e.forEach((a) => a(t, { added: [s] })));
  });
  let r = n();
  return {
    _listeners() {
      return e;
    },
    clear() {
      e.forEach((s) => s([], { removed: [...t] })), t = [];
    },
    destroy() {
      this.clear(), e.clear(), r();
    },
    findProvider({ rdns: s }) {
      return t.find((a) => a.info.rdns === s);
    },
    getProviders() {
      return t;
    },
    reset() {
      this.clear(), r(), r = n();
    },
    subscribe(s, { emitImmediately: a } = {}) {
      return e.add(s), a && s(t, { added: t }), () => e.delete(s);
    }
  };
}
var oy = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const iy = (e) => (t, n, r) => {
  const s = r.subscribe;
  return r.subscribe = (o, i, c) => {
    let l = o;
    if (i) {
      const u = (c == null ? void 0 : c.equalityFn) || Object.is;
      let d = o(r.getState());
      l = (p) => {
        const f = o(p);
        if (!u(d, f)) {
          const h = d;
          i(d = f, h);
        }
      }, c != null && c.fireImmediately && i(d, d);
    }
    return s(l);
  }, e(t, n, r);
}, cy = iy;
function ly(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (s) => {
      var a;
      const o = (c) => c === null ? null : JSON.parse(c, void 0), i = (a = n.getItem(s)) != null ? a : null;
      return i instanceof Promise ? i.then(o) : o(i);
    },
    setItem: (s, a) => n.setItem(
      s,
      JSON.stringify(a, void 0)
    ),
    removeItem: (s) => n.removeItem(s)
  };
}
const sn = (e) => (t) => {
  try {
    const n = e(t);
    return n instanceof Promise ? n : {
      then(r) {
        return sn(r)(n);
      },
      catch(r) {
        return this;
      }
    };
  } catch (n) {
    return {
      then(r) {
        return this;
      },
      catch(r) {
        return sn(r)(n);
      }
    };
  }
}, uy = (e, t) => (n, r, s) => {
  let a = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (b) => b,
    version: 0,
    merge: (b, y) => ({
      ...y,
      ...b
    }),
    ...t
  }, o = !1;
  const i = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  let l;
  try {
    l = a.getStorage();
  } catch {
  }
  if (!l)
    return e(
      (...b) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
        ), n(...b);
      },
      r,
      s
    );
  const u = sn(a.serialize), d = () => {
    const b = a.partialize({ ...r() });
    let y;
    const g = u({ state: b, version: a.version }).then(
      (A) => l.setItem(a.name, A)
    ).catch((A) => {
      y = A;
    });
    if (y)
      throw y;
    return g;
  }, p = s.setState;
  s.setState = (b, y) => {
    p(b, y), d();
  };
  const f = e(
    (...b) => {
      n(...b), d();
    },
    r,
    s
  );
  let h;
  const m = () => {
    var b;
    if (!l)
      return;
    o = !1, i.forEach((g) => g(r()));
    const y = ((b = a.onRehydrateStorage) == null ? void 0 : b.call(a, r())) || void 0;
    return sn(l.getItem.bind(l))(a.name).then((g) => {
      if (g)
        return a.deserialize(g);
    }).then((g) => {
      if (g)
        if (typeof g.version == "number" && g.version !== a.version) {
          if (a.migrate)
            return a.migrate(
              g.state,
              g.version
            );
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return g.state;
    }).then((g) => {
      var A;
      return h = a.merge(
        g,
        (A = r()) != null ? A : f
      ), n(h, !0), d();
    }).then(() => {
      y == null || y(h, void 0), o = !0, c.forEach((g) => g(h));
    }).catch((g) => {
      y == null || y(void 0, g);
    });
  };
  return s.persist = {
    setOptions: (b) => {
      a = {
        ...a,
        ...b
      }, b.getStorage && (l = b.getStorage());
    },
    clearStorage: () => {
      l == null || l.removeItem(a.name);
    },
    getOptions: () => a,
    rehydrate: () => m(),
    hasHydrated: () => o,
    onHydrate: (b) => (i.add(b), () => {
      i.delete(b);
    }),
    onFinishHydration: (b) => (c.add(b), () => {
      c.delete(b);
    })
  }, m(), h || f;
}, dy = (e, t) => (n, r, s) => {
  let a = {
    storage: ly(() => localStorage),
    partialize: (m) => m,
    version: 0,
    merge: (m, b) => ({
      ...b,
      ...m
    }),
    ...t
  }, o = !1;
  const i = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  let l = a.storage;
  if (!l)
    return e(
      (...m) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
        ), n(...m);
      },
      r,
      s
    );
  const u = () => {
    const m = a.partialize({ ...r() });
    return l.setItem(a.name, {
      state: m,
      version: a.version
    });
  }, d = s.setState;
  s.setState = (m, b) => {
    d(m, b), u();
  };
  const p = e(
    (...m) => {
      n(...m), u();
    },
    r,
    s
  );
  let f;
  const h = () => {
    var m, b;
    if (!l)
      return;
    o = !1, i.forEach((g) => {
      var A;
      return g((A = r()) != null ? A : p);
    });
    const y = ((b = a.onRehydrateStorage) == null ? void 0 : b.call(a, (m = r()) != null ? m : p)) || void 0;
    return sn(l.getItem.bind(l))(a.name).then((g) => {
      if (g)
        if (typeof g.version == "number" && g.version !== a.version) {
          if (a.migrate)
            return a.migrate(
              g.state,
              g.version
            );
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return g.state;
    }).then((g) => {
      var A;
      return f = a.merge(
        g,
        (A = r()) != null ? A : p
      ), n(f, !0), u();
    }).then(() => {
      y == null || y(f, void 0), f = r(), o = !0, c.forEach((g) => g(f));
    }).catch((g) => {
      y == null || y(void 0, g);
    });
  };
  return s.persist = {
    setOptions: (m) => {
      a = {
        ...a,
        ...m
      }, m.storage && (l = m.storage);
    },
    clearStorage: () => {
      l == null || l.removeItem(a.name);
    },
    getOptions: () => a,
    rehydrate: () => h(),
    hasHydrated: () => o,
    onHydrate: (m) => (i.add(m), () => {
      i.delete(m);
    }),
    onFinishHydration: (m) => (c.add(m), () => {
      c.delete(m);
    })
  }, a.skipHydration || h(), f || p;
}, py = (e, t) => "getStorage" in t || "serialize" in t || "deserialize" in t ? ((oy ? "production" : void 0) !== "production" && console.warn(
  "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
), uy(e, t)) : dy(e, t), fy = py;
var hy = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Si = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (c, l) => {
    const u = typeof c == "function" ? c(t) : c;
    if (!Object.is(u, t)) {
      const d = t;
      t = l ?? typeof u != "object" ? u : Object.assign({}, t, u), n.forEach((p) => p(t, d));
    }
  }, s = () => t, i = { setState: r, getState: s, subscribe: (c) => (n.add(c), () => n.delete(c)), destroy: () => {
    (hy ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } };
  return t = e(r, s, i), i;
}, Gs = (e) => e ? Si(e) : Si;
let my = class {
  constructor(t) {
    Object.defineProperty(this, "uid", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }), Object.defineProperty(this, "_emitter", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Yi()
    });
  }
  on(t, n) {
    this._emitter.on(t, n);
  }
  once(t, n) {
    this._emitter.once(t, n);
  }
  off(t, n) {
    this._emitter.off(t, n);
  }
  emit(t, ...n) {
    const r = n[0];
    this._emitter.emit(t, { uid: this.uid, ...r });
  }
  listenerCount(t) {
    return this._emitter.listenerCount(t);
  }
};
function by(e) {
  return new my(e);
}
function yy(e, t) {
  return JSON.parse(e, (n, r) => {
    let s = r;
    return (s == null ? void 0 : s.__type) === "bigint" && (s = BigInt(s.value)), (s == null ? void 0 : s.__type) === "Map" && (s = new Map(s.value)), (t == null ? void 0 : t(n, s)) ?? s;
  });
}
function Ti(e, t) {
  return e.slice(0, t).join(".") || ".";
}
function Pi(e, t) {
  const { length: n } = e;
  for (let r = 0; r < n; ++r)
    if (e[r] === t)
      return r + 1;
  return 0;
}
function wy(e, t) {
  const n = typeof e == "function", r = typeof t == "function", s = [], a = [];
  return function(i, c) {
    if (typeof c == "object")
      if (s.length) {
        const l = Pi(s, this);
        l === 0 ? s[s.length] = this : (s.splice(l), a.splice(l)), a[a.length] = i;
        const u = Pi(s, c);
        if (u !== 0)
          return r ? t.call(this, i, c, Ti(a, u)) : `[ref=${Ti(a, u)}]`;
      } else
        s[0] = c, a[0] = i;
    return n ? e.call(this, i, c) : c;
  };
}
function gy(e, t, n, r) {
  return JSON.stringify(e, wy((s, a) => {
    let o = a;
    return typeof o == "bigint" && (o = { __type: "bigint", value: a.toString() }), o instanceof Map && (o = { __type: "Map", value: Array.from(a.entries()) }), (t == null ? void 0 : t(s, o)) ?? o;
  }, r), n ?? void 0);
}
function vy(e) {
  const { deserialize: t = yy, key: n = "wagmi", serialize: r = gy, storage: s = Du } = e;
  function a(o) {
    return o instanceof Promise ? o.then((i) => i).catch(() => null) : o;
  }
  return {
    ...s,
    key: n,
    async getItem(o, i) {
      const c = s.getItem(`${n}.${o}`), l = await a(c);
      return l ? t(l) ?? null : i ?? null;
    },
    async setItem(o, i) {
      const c = `${n}.${o}`;
      i === null ? await a(s.removeItem(c)) : await a(s.setItem(c, r(i)));
    },
    async removeItem(o) {
      await a(s.removeItem(`${n}.${o}`));
    }
  };
}
const Du = {
  getItem: () => null,
  setItem: () => {
  },
  removeItem: () => {
  }
}, fa = 256;
let Ln = fa, _n;
function Cy(e = 11) {
  if (!_n || Ln + e > fa * 2) {
    _n = "", Ln = 0;
    for (let t = 0; t < fa; t++)
      _n += (256 + Math.random() * 256 | 0).toString(16).substring(1);
  }
  return _n.substring(Ln, Ln++ + e);
}
function xy(e) {
  const { multiInjectedProviderDiscovery: t = !0, storage: n = vy({
    storage: typeof window < "u" && window.localStorage ? window.localStorage : Du
  }), syncConnectedChain: r = !0, ssr: s, ...a } = e, o = typeof window < "u" && t ? Nu() : void 0, i = Gs(() => a.chains), c = Gs(() => [
    ...a.connectors ?? [],
    ...s ? [] : (o == null ? void 0 : o.getProviders().map(u)) ?? []
  ].map(l));
  function l(v) {
    var I;
    const x = by(Cy()), C = {
      ...v({ emitter: x, chains: i.getState(), storage: n }),
      emitter: x,
      uid: x.uid
    };
    return x.on("connect", g), (I = C.setup) == null || I.call(C), C;
  }
  function u(v) {
    const { info: x } = v, C = v.provider;
    return xs({ target: { ...x, id: x.rdns, provider: C } });
  }
  const d = /* @__PURE__ */ new Map();
  function p(v = {}) {
    const x = v.chainId ?? b.getState().chainId, C = i.getState().find((E) => E.id === x);
    if (v.chainId && !C)
      throw new at();
    {
      const E = d.get(b.getState().chainId);
      if (E && !C)
        return E;
      if (!C)
        throw new at();
    }
    {
      const E = d.get(x);
      if (E)
        return E;
    }
    let I;
    if (a.client)
      I = a.client({ chain: C });
    else {
      const E = C.id, T = i.getState().map((N) => N.id), M = {}, L = Object.entries(a);
      for (const [N, j] of L)
        if (!(N === "chains" || N === "client" || N === "connectors" || N === "transports"))
          if (typeof j == "object")
            if (E in j)
              M[N] = j[E];
            else {
              if (T.some((ge) => ge in j))
                continue;
              M[N] = j;
            }
          else
            M[N] = j;
      I = We({
        ...M,
        chain: C,
        batch: M.batch ?? { multicall: !0 },
        transport: (N) => a.transports[E]({ ...N, connectors: c })
      });
    }
    return d.set(x, I), I;
  }
  function f() {
    return {
      chainId: i.getState()[0].id,
      connections: /* @__PURE__ */ new Map(),
      current: null,
      status: "disconnected"
    };
  }
  let h;
  const m = "0.0.0-canary-";
  lr.startsWith(m) ? h = Number.parseInt(lr.replace(m, "")) : h = Number.parseInt(lr.split(".")[0] ?? "0");
  const b = Gs(cy(
    // only use persist middleware if storage exists
    n ? fy(f, {
      migrate(v, x) {
        if (x === h)
          return v;
        const C = f(), I = v && typeof v == "object" && "chainId" in v && typeof v.chainId == "number" && i.getState().some((E) => E.id === v.chainId) ? v.chainId : C.chainId;
        return { ...C, chainId: I };
      },
      name: "store",
      partialize(v) {
        return {
          connections: {
            __type: "Map",
            value: Array.from(v.connections.entries()).map(([x, C]) => {
              const { id: I, name: E, type: T, uid: M } = C.connector;
              return [x, { ...C, connector: { id: I, name: E, type: T, uid: M } }];
            })
          },
          chainId: v.chainId,
          current: v.current
        };
      },
      skipHydration: s,
      storage: n,
      version: h
    }) : f
  ));
  r && b.subscribe(({ connections: v, current: x }) => {
    var C;
    return x ? (C = v.get(x)) == null ? void 0 : C.chainId : void 0;
  }, (v) => {
    if (i.getState().some((C) => C.id === v))
      return b.setState((C) => ({
        ...C,
        chainId: v ?? C.chainId
      }));
  }), o == null || o.subscribe((v) => {
    const x = /* @__PURE__ */ new Map();
    for (const I of c.getState())
      x.set(I.id, !0);
    const C = [];
    for (const I of v) {
      const E = l(u(I));
      x.has(E.id) || C.push(E);
    }
    n && !b.persist.hasHydrated() || c.setState((I) => [...I, ...C], !0);
  });
  function y(v) {
    b.setState((x) => {
      const C = x.connections.get(v.uid);
      return C ? {
        ...x,
        connections: new Map(x.connections).set(v.uid, {
          accounts: v.accounts ?? C.accounts,
          chainId: v.chainId ?? C.chainId,
          connector: C.connector
        })
      } : x;
    });
  }
  function g(v) {
    b.getState().status === "connecting" || b.getState().status === "reconnecting" || b.setState((x) => {
      const C = c.getState().find((I) => I.uid === v.uid);
      return C ? (C.emitter.listenerCount("connect") && C.emitter.off("connect", y), C.emitter.listenerCount("change") || C.emitter.on("change", y), C.emitter.listenerCount("disconnect") || C.emitter.on("disconnect", A), {
        ...x,
        connections: new Map(x.connections).set(v.uid, {
          accounts: v.accounts,
          chainId: v.chainId,
          connector: C
        }),
        current: v.uid,
        status: "connected"
      }) : x;
    });
  }
  function A(v) {
    b.setState((x) => {
      const C = x.connections.get(v.uid);
      if (C) {
        const E = C.connector;
        E.emitter.listenerCount("change") && C.connector.emitter.off("change", y), E.emitter.listenerCount("disconnect") && C.connector.emitter.off("disconnect", A), E.emitter.listenerCount("connect") || C.connector.emitter.on("connect", g);
      }
      if (x.connections.delete(v.uid), x.connections.size === 0)
        return {
          ...x,
          connections: /* @__PURE__ */ new Map(),
          current: null,
          status: "disconnected"
        };
      const I = x.connections.values().next().value;
      return {
        ...x,
        connections: new Map(x.connections),
        current: I.connector.uid
      };
    });
  }
  return {
    get chains() {
      return i.getState();
    },
    get connectors() {
      return c.getState();
    },
    storage: n,
    getClient: p,
    get state() {
      return b.getState();
    },
    setState(v) {
      let x;
      typeof v == "function" ? x = v(b.getState()) : x = v;
      const C = f();
      typeof x != "object" && (x = C), Object.keys(C).some((E) => !(E in x)) && (x = C), b.setState(x, !0);
    },
    subscribe(v, x, C) {
      return b.subscribe(v, x, C ? { ...C, fireImmediately: C.emitImmediately } : void 0);
    },
    _internal: {
      mipd: o,
      store: b,
      ssr: !!s,
      syncConnectedChain: r,
      transports: a.transports,
      chains: {
        setState(v) {
          const x = typeof v == "function" ? v(i.getState()) : v;
          if (x.length !== 0)
            return i.setState(x, !0);
        },
        subscribe(v) {
          return i.subscribe(v);
        }
      },
      connectors: {
        providerDetailToConnector: u,
        setup: l,
        setState(v) {
          return c.setState(typeof v == "function" ? v(c.getState()) : v, !0);
        },
        subscribe(v) {
          return c.subscribe(v);
        }
      },
      events: { change: y, connect: g, disconnect: A }
    }
  };
}
const Ay = /* @__PURE__ */ w({
  id: 787,
  name: "Acala",
  network: "acala",
  nativeCurrency: {
    name: "Acala",
    symbol: "ACA",
    decimals: 18
  },
  rpcUrls: {
    public: {
      http: ["https://eth-rpc-acala.aca-api.network"],
      webSocket: ["wss://eth-rpc-acala.aca-api.network"]
    },
    default: {
      http: ["https://eth-rpc-acala.aca-api.network"],
      webSocket: ["wss://eth-rpc-acala.aca-api.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Acala Blockscout",
      url: "https://blockscout.acala.network",
      apiUrl: "https://blockscout.acala.network/api"
    }
  },
  testnet: !1
}), ky = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
}, jo = {
  block: /* @__PURE__ */ Yr({
    format(e) {
      var n;
      return {
        transactions: (n = e.transactions) == null ? void 0 : n.map((r) => {
          if (typeof r == "string")
            return r;
          const s = zt(r);
          return s.typeHex === "0x7e" && (s.isSystemTx = r.isSystemTx, s.mint = r.mint ? F(r.mint) : void 0, s.sourceHash = r.sourceHash, s.type = "deposit"), s;
        }),
        stateRoot: e.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ Zr({
    format(e) {
      const t = {};
      return e.type === "0x7e" && (t.isSystemTx = e.isSystemTx, t.mint = e.mint ? F(e.mint) : void 0, t.sourceHash = e.sourceHash, t.type = "deposit"), t;
    }
  }),
  transactionReceipt: /* @__PURE__ */ bo({
    format(e) {
      return {
        l1GasPrice: e.l1GasPrice ? F(e.l1GasPrice) : null,
        l1GasUsed: e.l1GasUsed ? F(e.l1GasUsed) : null,
        l1Fee: e.l1Fee ? F(e.l1Fee) : null,
        l1FeeScalar: e.l1FeeScalar ? Number(e.l1FeeScalar) : null
      };
    }
  })
};
function Ey(e, t) {
  return Ty(e) ? Sy(e) : kn(e, t);
}
const Iy = {
  transaction: Ey
};
function Sy(e) {
  Py(e);
  const { sourceHash: t, data: n, from: r, gas: s, isSystemTx: a, mint: o, to: i, value: c } = e, l = [
    t,
    r,
    i ?? "0x",
    o ? P(o) : "0x",
    c ? P(c) : "0x",
    s ? P(s) : "0x",
    a ? "0x1" : "0x",
    n ?? "0x"
  ];
  return se([
    "0x7e",
    pe(l)
  ]);
}
function Ty(e) {
  return e.type === "deposit" || typeof e.sourceHash < "u";
}
function Py(e) {
  const { from: t, to: n } = e;
  if (t && !H(t))
    throw new K({ address: t });
  if (n && !H(n))
    throw new K({ address: n });
}
const z = {
  contracts: ky,
  formatters: jo,
  serializers: Iy
}, $n = 1, By = /* @__PURE__ */ w({
  ...z,
  id: 888888888,
  name: "Ancient8",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ancient8.gg"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ancient8 explorer",
      url: "https://scan.ancient8.gg",
      apiUrl: "https://scan.ancient8.gg/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [$n]: {
        address: "0xB09DC08428C8b4EFB4ff9C0827386CDF34277996"
      }
    },
    portal: {
      [$n]: {
        address: "0x639F2AECE398Aa76b07e59eF6abe2cFe32bacb68",
        blockCreated: 19070571
      }
    },
    l1StandardBridge: {
      [$n]: {
        address: "0xd5e3eDf5b68135D559D572E26bF863FBC1950033",
        blockCreated: 19070571
      }
    }
  },
  sourceId: $n
}), Hn = 11155111, Uy = /* @__PURE__ */ w({
  ...z,
  id: 28122024,
  name: "Ancient8 Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpcv2-testnet.ancient8.gg"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ancient8 Celestia Testnet explorer",
      url: "https://scanv2-testnet.ancient8.gg",
      apiUrl: "https://scanv2-testnet.ancient8.gg/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Hn]: {
        address: "0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB"
      }
    },
    portal: {
      [Hn]: {
        address: "0xfa1d9E26A6aCD7b22115D27572c1221B9803c960",
        blockCreated: 4972908
      }
    },
    l1StandardBridge: {
      [Hn]: {
        address: "0xF6Bc0146d3c74D48306e79Ae134A260E418C9335",
        blockCreated: 4972908
      }
    }
  },
  sourceId: Hn
}), My = /* @__PURE__ */ w({
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
}), Fy = /* @__PURE__ */ w({
  id: 3993,
  name: "APEX Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.apexlayer.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp-testnet.apexlayer.xyz",
      apiUrl: "https://exp-testnet.apexlayer.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xf7642be33a6b18D16a995657adb5a68CD0438aE2",
      blockCreated: 283775
    }
  },
  testnet: !0
}), Ny = /* @__PURE__ */ w({
  id: 42161,
  name: "Arbitrum One",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
      apiUrl: "https://api.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
}), Dy = /* @__PURE__ */ w({
  id: 421613,
  name: "Arbitrum Goerli",
  nativeCurrency: {
    name: "Arbitrum Goerli Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://goerli-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://goerli.arbiscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 88114
    }
  },
  testnet: !0
}), Oy = /* @__PURE__ */ w({
  id: 42170,
  name: "Arbitrum Nova",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://nova.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://nova.arbiscan.io",
      apiUrl: "https://api-nova.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1746963
    }
  }
}), Ry = /* @__PURE__ */ w({
  id: 592,
  name: "Astar",
  network: "astar-mainnet",
  nativeCurrency: {
    name: "Astar",
    symbol: "ASTR",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://astar.api.onfinality.io/public"] }
  },
  blockExplorers: {
    default: {
      name: "Astar Subscan",
      url: "https://astar.subscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 761794
    }
  },
  testnet: !1
}), zy = /* @__PURE__ */ w({
  id: 3776,
  name: "Astar zkEVM",
  network: "AstarZkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.startale.com/astar-zkevm"]
    }
  },
  blockExplorers: {
    default: {
      name: "Astar zkEVM Explorer",
      url: "https://astar-zkevm.explorer.startale.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 93528
    }
  },
  testnet: !1
}), jy = /* @__PURE__ */ w({
  id: 6038361,
  name: "Astar zkEVM Testnet zKyoto",
  network: "zKyoto",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.startale.com/zkyoto"]
    }
  },
  blockExplorers: {
    default: {
      name: "zKyoto Explorer",
      url: "https://zkyoto.explorer.startale.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 196153
    }
  },
  testnet: !0
}), Ly = /* @__PURE__ */ w({
  id: 421614,
  name: "Arbitrum Sepolia",
  nativeCurrency: {
    name: "Arbitrum Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://sepolia.arbiscan.io",
      apiUrl: "https://api-sepolia.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 81930
    }
  },
  testnet: !0
}), _y = /* @__PURE__ */ w({
  id: 463,
  name: "Areon Network",
  nativeCurrency: { decimals: 18, name: "AREA", symbol: "AREA" },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.areon.network"],
      webSocket: ["wss://mainnet-ws.areon.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Areonscan",
      url: "https://areonscan.com"
    }
  },
  testnet: !1
}), $y = /* @__PURE__ */ w({
  id: 462,
  name: "Areon Network Testnet",
  nativeCurrency: { decimals: 18, name: "TAREA", symbol: "TAREA" },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.areon.network"],
      webSocket: ["wss://testnet-ws.areon.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Areonscan",
      url: "https://areonscan.com"
    }
  },
  testnet: !0
}), Hy = /* @__PURE__ */ w({
  id: 1313161554,
  name: "Aurora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.aurora.dev"] }
  },
  blockExplorers: {
    default: {
      name: "Aurorascan",
      url: "https://aurorascan.dev",
      apiUrl: "https://aurorascan.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 62907816
    }
  }
}), Gy = /* @__PURE__ */ w({
  id: 1313161555,
  name: "Aurora Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://testnet.aurora.dev"] }
  },
  blockExplorers: {
    default: {
      name: "Aurorascan",
      url: "https://testnet.aurorascan.dev",
      apiUrl: "https://testnet.aurorascan.dev/api"
    }
  },
  testnet: !0
}), qy = /* @__PURE__ */ w({
  id: 205205,
  name: "Auroria Testnet",
  network: "auroria",
  nativeCurrency: {
    name: "Auroria Stratis",
    symbol: "tSTRAX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://auroria.rpc.stratisevm.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Auroria Testnet Explorer",
      url: "https://auroria.explorer.stratisevm.com"
    }
  },
  testnet: !0
}), Qy = /* @__PURE__ */ w({
  id: 43114,
  name: "Avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX"
  },
  rpcUrls: {
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://snowtrace.io",
      apiUrl: "https://api.snowtrace.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11907934
    }
  }
}), Vy = /* @__PURE__ */ w({
  id: 43113,
  name: "Avalanche Fuji",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche Fuji",
    symbol: "AVAX"
  },
  rpcUrls: {
    default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io",
      apiUrl: "https://api-testnet.snowtrace.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7096959
    }
  },
  testnet: !0
}), Ky = /* @__PURE__ */ w({
  id: 5165,
  network: "bahamut",
  name: "Bahamut",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc1.bahamut.io",
        "https://bahamut-rpc.publicnode.com",
        "https://rpc2.bahamut.io"
      ],
      webSocket: [
        "wss://ws1.sahara.bahamutchain.com",
        "wss://bahamut-rpc.publicnode.com",
        "wss://ws2.sahara.bahamutchain.com"
      ]
    },
    public: {
      http: [
        "https://rpc1.bahamut.io",
        "https://bahamut-rpc.publicnode.com",
        "https://rpc2.bahamut.io"
      ],
      webSocket: [
        "wss://ws1.sahara.bahamutchain.com",
        "wss://bahamut-rpc.publicnode.com",
        "wss://ws2.sahara.bahamutchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://www.ftnscan.com",
      apiUrl: "https://www.ftnscan.com/api"
    }
  }
}), Gn = 1, Wy = /* @__PURE__ */ w({
  ...z,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Gn]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [Gn]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [Gn]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId: Gn
}), qn = 5, Jy = /* @__PURE__ */ w({
  ...z,
  id: 84531,
  name: "Base Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://goerli.base.org"] }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://goerli.basescan.org",
      apiUrl: "https://goerli.basescan.org/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [qn]: {
        address: "0x2A35891ff30313CcFa6CE88dcf3858bb075A2298"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1376988
    },
    portal: {
      [qn]: {
        address: "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA"
      }
    },
    l1StandardBridge: {
      [qn]: {
        address: "0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a"
      }
    }
  },
  testnet: !0,
  sourceId: qn
}), Qn = 11155111, Zy = /* @__PURE__ */ w({
  ...z,
  id: 84532,
  network: "base-sepolia",
  name: "Base Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia.basescan.org",
      apiUrl: "https://api-sepolia.basescan.org/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Qn]: {
        address: "0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254"
      }
    },
    portal: {
      [Qn]: {
        address: "0x49f53e41452c74589e85ca1677426ba426459e85",
        blockCreated: 4446677
      }
    },
    l1StandardBridge: {
      [Qn]: {
        address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
        blockCreated: 4446677
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1059647
    }
  },
  testnet: !0,
  sourceId: Qn
}), Xy = /* @__PURE__ */ w({
  id: 4337,
  name: "Beam",
  network: "beam",
  nativeCurrency: {
    decimals: 18,
    name: "Beam",
    symbol: "BEAM"
  },
  rpcUrls: {
    public: {
      http: ["https://build.onbeam.com/rpc"],
      webSocket: ["wss://build.onbeam.com/ws"]
    },
    default: {
      http: ["https://build.onbeam.com/rpc"],
      webSocket: ["wss://build.onbeam.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beam Explorer",
      url: "https://subnets.avax.network/beam"
    }
  },
  contracts: {
    multicall3: {
      address: "0x4956f15efdc3dc16645e90cc356eafa65ffc65ec",
      blockCreated: 1
    }
  }
}), Yy = /* @__PURE__ */ w({
  id: 13337,
  name: "Beam Testnet",
  network: "beam",
  nativeCurrency: {
    decimals: 18,
    name: "Beam",
    symbol: "BEAM"
  },
  rpcUrls: {
    public: {
      http: ["https://build.onbeam.com/rpc/testnet"],
      webSocket: ["wss://build.onbeam.com/ws/testnet"]
    },
    default: {
      http: ["https://build.onbeam.com/rpc/testnet"],
      webSocket: ["wss://build.onbeam.com/ws/testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beam Explorer",
      url: "https://subnets-test.avax.network/beam"
    }
  },
  contracts: {
    multicall3: {
      address: "0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e",
      blockCreated: 3
    }
  },
  testnet: !0
}), e1 = /* @__PURE__ */ w({
  id: 641230,
  name: "Bear Network Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BearNetworkChain",
    symbol: "BRNKC"
  },
  rpcUrls: {
    default: { http: ["https://brnkc-mainnet.bearnetwork.net"] }
  },
  blockExplorers: {
    default: {
      name: "BrnkScan",
      url: "https://brnkscan.bearnetwork.net",
      apiUrl: "https://brnkscan.bearnetwork.net/api"
    }
  }
}), t1 = /* @__PURE__ */ w({
  id: 751230,
  name: "Bear Network Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBRNKC",
    symbol: "tBRNKC"
  },
  rpcUrls: {
    default: { http: ["https://brnkc-test.bearnetwork.net"] }
  },
  blockExplorers: {
    default: {
      name: "BrnkTestScan",
      url: "https://brnktest-scan.bearnetwork.net",
      apiUrl: "https://brnktest-scan.bearnetwork.net/api"
    }
  },
  testnet: !0
}), n1 = /* @__PURE__ */ w({
  id: 80085,
  name: "Berachain Artio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA"
  },
  rpcUrls: {
    default: { http: ["https://artio.rpc.berachain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Berachain",
      url: "https://artio.beratrail.io"
    }
  },
  testnet: !0
}), r1 = /* @__PURE__ */ w({
  id: 80084,
  name: "Berachain bArtio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA"
  },
  rpcUrls: {
    default: { http: ["https://bartio.rpc.berachain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Berachain bArtio Beratrail",
      url: "https://bartio.beratrail.io"
    }
  },
  testnet: !0
}), s1 = /* @__PURE__ */ w({
  id: 11501,
  name: "BEVM Mainnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-mainnet-1.bevm.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bevmscan",
      url: "https://scan-mainnet.bevm.io",
      apiUrl: "https://scan-mainnet-api.bevm.io/api"
    }
  }
}), a1 = /* @__PURE__ */ w({
  id: 96,
  name: "Bitkub",
  nativeCurrency: { name: "Bitkub", symbol: "KUB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitkubchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitkub Chain Mainnet Explorer",
      url: "https://www.bkcscan.com",
      apiUrl: "https://www.bkcscan.com/api"
    }
  }
}), o1 = /* @__PURE__ */ w({
  id: 25925,
  name: "Bitkub Testnet",
  network: "Bitkub Testnet",
  nativeCurrency: { name: "Bitkub Test", symbol: "tKUB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.bitkubchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitkub Chain Testnet Explorer",
      url: "https://testnet.bkcscan.com",
      apiUrl: "https://testnet.bkcscan.com/api"
    }
  },
  testnet: !0
}), i1 = /* @__PURE__ */ w({
  id: 199,
  name: "BitTorrent",
  network: "bittorrent-chain-mainnet",
  nativeCurrency: { name: "BitTorrent", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.bittorrentchain.io"] },
    public: { http: ["https://rpc.bittorrentchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bttcscan",
      url: "https://bttcscan.com",
      apiUrl: "https://api.bttcscan.com/api"
    }
  }
}), c1 = /* @__PURE__ */ w({
  id: 1028,
  name: "BitTorrent Chain Testnet",
  network: "bittorrent-chain-testnet",
  nativeCurrency: { name: "BitTorrent", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testrpc.bittorrentchain.io"] },
    public: { http: ["https://testrpc.bittorrentchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bttcscan",
      url: "https://testnet.bttcscan.com",
      apiUrl: "https://testnet.bttcscan.com/api"
    }
  },
  testnet: !0
}), l1 = 1, u1 = /* @__PURE__ */ w({
  id: 81457,
  name: "Blast",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.blast.io"] }
  },
  blockExplorers: {
    default: {
      name: "Blastscan",
      url: "https://blastscan.io",
      apiUrl: "https://api.blastscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 212929
    }
  },
  sourceId: l1
}), d1 = 11155111, p1 = /* @__PURE__ */ w({
  id: 168587773,
  name: "Blast Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.blast.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blastscan",
      url: "https://sepolia.blastscan.io",
      apiUrl: "https://api-sepolia.blastscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 756690
    }
  },
  testnet: !0,
  sourceId: d1
}), f1 = w({
  id: 60808,
  name: "BOB",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gobob.xyz"],
      webSocket: ["wss://rpc.gobob.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.gobob.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0x63f8279bccDb75c0F38e0CD6B6A0c72a0a760FF9",
      blockCreated: 457045
    }
  },
  testnet: !1
}), h1 = /* @__PURE__ */ w({
  id: 288,
  name: "Boba Network",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.boba.network"] }
  },
  blockExplorers: {
    default: {
      name: "BOBAScan",
      url: "https://bobascan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 446859
    }
  }
}), m1 = /* @__PURE__ */ w({
  id: 1039,
  name: "Bronos",
  nativeCurrency: {
    decimals: 18,
    name: "BRO",
    symbol: "BRO"
  },
  rpcUrls: {
    default: { http: ["https://evm.bronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "BronoScan",
      url: "https://broscan.bronos.org"
    }
  }
}), b1 = /* @__PURE__ */ w({
  id: 1038,
  name: "Bronos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bronos Coin",
    symbol: "tBRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-testnet.bronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "BronoScan",
      url: "https://tbroscan.bronos.org"
    }
  },
  testnet: !0
}), y1 = /* @__PURE__ */ w({
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/bsc"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452
    }
  }
}), w1 = /* @__PURE__ */ w({
  id: 97,
  name: "Binance Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB"
  },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
      apiUrl: "https://testnet.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 17422483
    }
  },
  testnet: !0
}), g1 = /* @__PURE__ */ w({
  id: 1017,
  name: "BNB Greenfield Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://greenfield-chain.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "BNB Greenfield Mainnet Scan",
      url: "https://greenfieldscan.com"
    }
  },
  testnet: !1
}), v1 = /* @__PURE__ */ w({
  id: 200901,
  name: "Bitlayer",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.bitlayer.org",
        "https://rpc.bitlayer-rpc.com",
        "https://rpc.ankr.com/bitlayer"
      ],
      webSocket: ["wss://ws.bitlayer.org", "wss://ws.bitlayer-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "btrscan",
      url: "https://www.btrscan.com",
      apiUrl: "https://www.btrscan.com/apis"
    }
  }
}), C1 = /* @__PURE__ */ w({
  id: 200810,
  name: "Bitlayer Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer.org"],
      webSocket: [
        "wss://testnet-ws.bitlayer.org",
        "wss://testnet-ws.bitlayer-rpc.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "btrscan",
      url: "https://testnet-scan.bitlayer.org",
      apiUrl: "https://testnet-scan.bitlayer.org/apis"
    }
  },
  testnet: !0
}), x1 = /* @__PURE__ */ w({
  id: 4999,
  name: "BlackFort Exchange Network",
  nativeCurrency: { name: "BlackFort Token", symbol: "BXN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.blackfort.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.blackfort.network",
      apiUrl: "https://explorer.blackfort.network/api"
    }
  }
}), A1 = /* @__PURE__ */ w({
  id: 4777,
  name: "BlackFort Exchange Network Testnet",
  nativeCurrency: {
    name: "BlackFort Testnet Token",
    symbol: "TBXN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.blackfort.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.blackfort.network",
      apiUrl: "https://testnet-explorer.blackfort.network/api"
    }
  },
  testnet: !0
}), k1 = /* @__PURE__ */ w({
  id: 7700,
  name: "Canto",
  nativeCurrency: {
    decimals: 18,
    name: "Canto",
    symbol: "CANTO"
  },
  rpcUrls: {
    default: { http: ["https://canto.gravitychain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Tuber.Build (Blockscout)",
      url: "https://tuber.build"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2905789
    }
  }
}), E1 = {
  /*
     * Estimates the fees per gas for a transaction.
  
     * If the transaction is to be paid in a token (feeCurrency is present) then the fees
     * are estimated in the value of the token. Otherwise falls back to the default
     * estimation by returning null.
     *
     * @param params fee estimation function parameters
     */
  estimateFeesPerGas: async (e) => {
    var r;
    if (!((r = e.request) != null && r.feeCurrency))
      return null;
    const [t, n] = await Promise.all([
      I1(e.client, e.request.feeCurrency),
      S1(e.client, e.request.feeCurrency)
    ]);
    return {
      maxFeePerGas: t,
      maxPriorityFeePerGas: n
    };
  }
};
async function I1(e, t) {
  const n = await e.request({
    method: "eth_gasPrice",
    params: [t]
  });
  return BigInt(n);
}
async function S1(e, t) {
  const n = await e.request({
    method: "eth_maxPriorityFeePerGas",
    params: [t]
  });
  return BigInt(n);
}
function Ou(e) {
  return e === 0 || e === 0n || e === void 0 || e === null || e === "0" || e === "" || typeof e == "string" && (Z(e).toLowerCase() === "0x" || Z(e).toLowerCase() === "0x00");
}
function Wt(e) {
  return !Ou(e);
}
function T1(e) {
  return typeof e.maxFeePerGas < "u" && typeof e.maxPriorityFeePerGas < "u";
}
function Ru(e) {
  return e.type === "cip64" ? !0 : T1(e) && Wt(e.feeCurrency);
}
const P1 = {
  block: /* @__PURE__ */ Yr({
    exclude: ["difficulty", "gasLimit", "mixHash", "nonce", "uncles"],
    format(e) {
      var n;
      const t = (n = e.transactions) == null ? void 0 : n.map((r) => typeof r == "string" ? r : {
        ...zt(r),
        feeCurrency: r.feeCurrency,
        ...r.type !== "0x7b" ? {
          gatewayFee: r.gatewayFee ? F(r.gatewayFee) : null,
          gatewayFeeRecipient: r.gatewayFeeRecipient || null
        } : {}
      });
      return {
        randomness: e.randomness,
        transactions: t
      };
    }
  }),
  transaction: /* @__PURE__ */ Zr({
    format(e) {
      const t = { feeCurrency: e.feeCurrency };
      return e.type === "0x7b" ? t.type = "cip64" : (e.type === "0x7c" && (t.type = "cip42"), t.gatewayFee = e.gatewayFee ? F(e.gatewayFee) : null, t.gatewayFeeRecipient = e.gatewayFeeRecipient), t;
    }
  }),
  transactionRequest: /* @__PURE__ */ $a({
    format(e) {
      const t = {
        feeCurrency: e.feeCurrency
      };
      return Ru(e) && (t.type = "0x7b"), t;
    }
  })
};
function B1(e, t) {
  return Ru(e) ? M1(e, t) : kn(e, t);
}
const U1 = {
  transaction: B1
};
function M1(e, t) {
  N1(e);
  const { chainId: n, gas: r, nonce: s, to: a, value: o, maxFeePerGas: i, maxPriorityFeePerGas: c, accessList: l, feeCurrency: u, data: d } = e, p = [
    P(n),
    s ? P(s) : "0x",
    c ? P(c) : "0x",
    i ? P(i) : "0x",
    r ? P(r) : "0x",
    a ?? "0x",
    o ? P(o) : "0x",
    d ?? "0x",
    An(l),
    u,
    ...ws(e, t)
  ];
  return se([
    "0x7b",
    pe(p)
  ]);
}
const F1 = 2n ** 256n - 1n;
function N1(e) {
  const { chainId: t, maxPriorityFeePerGas: n, gasPrice: r, maxFeePerGas: s, to: a, feeCurrency: o } = e;
  if (t <= 0)
    throw new Ot({ chainId: t });
  if (a && !H(a))
    throw new K({ address: a });
  if (r)
    throw new k("`gasPrice` is not a valid CIP-64 Transaction attribute.");
  if (Wt(s) && s > F1)
    throw new Be({ maxFeePerGas: s });
  if (Wt(n) && Wt(s) && n > s)
    throw new et({ maxFeePerGas: s, maxPriorityFeePerGas: n });
  if (Wt(o) && !H(o))
    throw new k("`feeCurrency` MUST be a token address for CIP-64 transactions.");
  if (Ou(o))
    throw new k("`feeCurrency` must be provided for CIP-64 transactions.");
}
const zu = {
  formatters: P1,
  serializers: U1,
  fees: E1
}, D1 = /* @__PURE__ */ w({
  ...zu,
  id: 42220,
  name: "Celo",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO"
  },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] }
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://celoscan.io",
      apiUrl: "https://api.celoscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 13112599
    }
  },
  testnet: !1
}), O1 = /* @__PURE__ */ w({
  ...zu,
  id: 44787,
  name: "Alfajores",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "A-CELO"
  },
  rpcUrls: {
    default: {
      http: ["https://alfajores-forno.celo-testnet.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/alfajores",
      apiUrl: "https://explorer.celo.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 14569001
    }
  },
  testnet: !0
}), R1 = /* @__PURE__ */ w({
  id: 88888,
  name: "Chiliz Chain",
  network: "chiliz-chain",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ"
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.ankr.com/chiliz",
        "https://chiliz-rpc.publicnode.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "https://scan.chiliz.com",
      apiUrl: "https://scan.chiliz.com/api"
    }
  }
}), z1 = /* @__PURE__ */ w({
  id: 61,
  name: "Ethereum Classic",
  nativeCurrency: {
    decimals: 18,
    name: "ETC",
    symbol: "ETC"
  },
  rpcUrls: {
    default: { http: ["https://etc.rivet.link"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.com/etc/mainnet"
    }
  }
}), j1 = /* @__PURE__ */ w({
  id: 1030,
  name: "Conflux eSpace",
  nativeCurrency: { name: "Conflux", symbol: "CFX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm.confluxrpc.com"],
      webSocket: ["wss://evm.confluxrpc.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "ConfluxScan",
      url: "https://evm.confluxscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
      blockCreated: 68602935
    }
  }
}), L1 = /* @__PURE__ */ w({
  id: 71,
  name: "Conflux eSpace Testnet",
  network: "cfx-espace-testnet",
  testnet: !0,
  nativeCurrency: { name: "Conflux", symbol: "CFX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmtestnet.confluxrpc.com"],
      webSocket: ["wss://evmtestnet.confluxrpc.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "ConfluxScan",
      url: "https://evmtestnet.confluxscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
      blockCreated: 117499050
    }
  }
}), _1 = /* @__PURE__ */ w({
  id: 1116,
  name: "Core Dao",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "CORE"
  },
  rpcUrls: {
    default: { http: ["https://rpc.coredao.org"] }
  },
  blockExplorers: {
    default: {
      name: "CoreDao",
      url: "https://scan.coredao.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 11907934
    }
  },
  testnet: !1
}), $1 = /* @__PURE__ */ w({
  id: 25,
  name: "Cronos Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO"
  },
  rpcUrls: {
    default: { http: ["https://evm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://explorer.cronos.org",
      apiUrl: "https://explorer-api.cronos.org/mainnet/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1963112
    }
  }
}), H1 = /* @__PURE__ */ w({
  id: 338,
  name: "Cronos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CRO",
    symbol: "tCRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-t3.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://cronos.org/explorer/testnet3"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 10191251
    }
  },
  testnet: !0
}), G1 = /* @__PURE__ */ w({
  id: 3737,
  name: "Crossbell",
  nativeCurrency: {
    decimals: 18,
    name: "CSB",
    symbol: "CSB"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.crossbell.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "CrossScan",
      url: "https://scan.crossbell.io",
      apiUrl: "https://scan.crossbell.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 38246031
    }
  }
}), q1 = /* @__PURE__ */ w({
  id: 7560,
  name: "Cyber",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cyber.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://cyberscan.co",
      apiUrl: "https://cyberscan.co/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    }
  }
}), Q1 = /* @__PURE__ */ w({
  id: 111557560,
  name: "Cyber Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cyber-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet.cyberscan.co",
      apiUrl: "https://testnet.cyberscan.co/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xffc391F0018269d4758AEA1a144772E8FB99545E",
      blockCreated: 304545
    }
  },
  testnet: !0
}), V1 = /* @__PURE__ */ w({
  id: 46,
  name: "Darwinia Network",
  nativeCurrency: {
    decimals: 18,
    name: "RING",
    symbol: "RING"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.darwinia.network"],
      webSocket: ["wss://rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://darwinia.subscan.io" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 69420
    }
  }
}), K1 = /* @__PURE__ */ w({
  ...z,
  id: 2716446429837e3,
  name: "Dchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dchain-2716446429837000-1.jsonrpc.sagarpc.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Dchain Explorer",
      url: "https://dchain-2716446429837000-1.sagaexplorer.io",
      apiUrl: "https://api-dchain-2716446429837000-1.sagaexplorer.io/api"
    }
  },
  contracts: {
    ...z.contracts
  }
}), W1 = /* @__PURE__ */ w({
  ...z,
  id: 2713017997578e3,
  name: "Dchain Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Dchain Explorer",
      url: "https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io",
      apiUrl: "https://api-dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io/api"
    }
  },
  contracts: {
    ...z.contracts
  }
}), J1 = /* @__PURE__ */ w({
  id: 1130,
  network: "defichain-evm",
  name: "DeFiChain EVM Mainnet",
  nativeCurrency: {
    name: "DeFiChain",
    symbol: "DFI",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth.mainnet.ocean.jellyfishsdk.com"]
    },
    public: {
      http: ["https://eth.mainnet.ocean.jellyfishsdk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DeFiScan",
      url: "https://meta.defiscan.live"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 137852
    }
  }
}), Z1 = /* @__PURE__ */ w({
  id: 1131,
  network: "defichain-evm-testnet",
  name: "DeFiChain EVM Testnet",
  nativeCurrency: {
    name: "DeFiChain",
    symbol: "DFI",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth.testnet.ocean.jellyfishsdk.com"]
    },
    public: {
      http: ["https://eth.testnet.ocean.jellyfishsdk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DeFiScan",
      url: "https://meta.defiscan.live/?network=TestNet"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 156462
    }
  },
  testnet: !0
}), X1 = /* @__PURE__ */ w({
  id: 666666666,
  name: "Degen",
  nativeCurrency: {
    decimals: 18,
    name: "Degen",
    symbol: "DEGEN"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.degen.tips"],
      webSocket: ["wss://rpc.degen.tips"]
    }
  },
  blockExplorers: {
    default: {
      name: "Degen Chain Explorer",
      url: "https://explorer.degen.tips",
      apiUrl: "https://explorer.degen.tips/api/v2"
    }
  }
}), Y1 = /* @__PURE__ */ w({
  id: 53935,
  name: "DFK Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Jewel",
    symbol: "JEWEL"
  },
  rpcUrls: {
    default: {
      http: ["https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "DFKSubnetScan",
      url: "https://subnets.avax.network/defi-kingdoms"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14790551
    }
  }
}), ew = w({
  id: 53457,
  name: "DODOchain Testnet",
  nativeCurrency: { decimals: 18, name: "DODO", symbol: "DODO" },
  rpcUrls: {
    default: {
      http: ["https://dodochain-testnet.alt.technology"],
      webSocket: ["wss://dodochain-testnet.alt.technology/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "DODOchain Testnet (Sepolia) Explorer",
      url: "https://testnet-scan.dodochain.com"
    }
  },
  testnet: !0
}), tw = /* @__PURE__ */ w({
  id: 2e3,
  name: "Dogechain",
  nativeCurrency: {
    decimals: 18,
    name: "Dogechain",
    symbol: "DC"
  },
  rpcUrls: {
    default: { http: ["https://rpc.dogechain.dog"] }
  },
  blockExplorers: {
    default: {
      name: "DogeChainExplorer",
      url: "https://explorer.dogechain.dog",
      apiUrl: "https://explorer.dogechain.dog/api"
    }
  }
}), nw = /* @__PURE__ */ w({
  id: 23451,
  name: "DreyerX Mainnet",
  nativeCurrency: {
    name: "DreyerX",
    symbol: "DRX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.dreyerx.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DreyerX Scan",
      url: "https://scan.dreyerx.com"
    }
  }
}), rw = /* @__PURE__ */ w({
  id: 2026,
  name: "Edgeless Network",
  nativeCurrency: {
    name: "Edgeless Wrapped ETH",
    symbol: "EwETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.edgeless.network/http"],
      webSocket: ["wss://rpc.edgeless.network/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Edgeless Explorer",
      url: "https://explorer.edgeless.network"
    }
  }
}), sw = /* @__PURE__ */ w({
  id: 202,
  name: "Edgeless Testnet",
  nativeCurrency: {
    name: "Edgeless Wrapped ETH",
    symbol: "EwETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://edgeless-testnet.rpc.caldera.xyz/http"],
      webSocket: ["wss://edgeless-testnet.rpc.caldera.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Edgeless Testnet Explorer",
      url: "https://testnet.explorer.edgeless.network"
    }
  }
}), aw = /* @__PURE__ */ w({
  id: 2021,
  name: "Edgeware EdgeEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Edgeware",
    symbol: "EDG"
  },
  rpcUrls: {
    default: { http: ["https://edgeware-evm.jelliedowl.net"] }
  },
  blockExplorers: {
    default: {
      name: "Edgscan by Bharathcoorg",
      url: "https://edgscan.live",
      apiUrl: "https://edgscan.live/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 18117872
    }
  }
}), ow = /* @__PURE__ */ w({
  id: 2022,
  name: "Beresheet BereEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Testnet EDG",
    symbol: "tEDG"
  },
  rpcUrls: {
    default: { http: ["https://beresheet-evm.jelliedowl.net"] }
  },
  blockExplorers: {
    default: {
      name: "Edgscan by Bharathcoorg",
      url: "https://testnet.edgscan.live",
      apiUrl: "https://testnet.edgscan.live/api"
    }
  }
}), iw = /* @__PURE__ */ w({
  id: 7332,
  name: "Horizen EON",
  nativeCurrency: {
    decimals: 18,
    name: "ZEN",
    symbol: "ZEN"
  },
  rpcUrls: {
    default: { http: ["https://eon-rpc.horizenlabs.io/ethv1"] }
  },
  blockExplorers: {
    default: {
      name: "EON Explorer",
      url: "https://eon-explorer.horizenlabs.io"
    }
  },
  contracts: {}
}), cw = /* @__PURE__ */ w({
  id: 17777,
  name: "EOS EVM",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS"
  },
  rpcUrls: {
    default: { http: ["https://api.evm.eosnetwork.com"] }
  },
  blockExplorers: {
    default: {
      name: "EOS EVM Explorer",
      url: "https://explorer.evm.eosnetwork.com",
      apiUrl: "https://explorer.evm.eosnetwork.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7943933
    }
  }
}), lw = /* @__PURE__ */ w({
  id: 15557,
  name: "EOS EVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS"
  },
  rpcUrls: {
    default: { http: ["https://api.testnet.evm.eosnetwork.com"] }
  },
  blockExplorers: {
    default: {
      name: "EOS EVM Testnet Explorer",
      url: "https://explorer.testnet.evm.eosnetwork.com",
      apiUrl: "https://explorer.testnet.evm.eosnetwork.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9067940
    }
  },
  testnet: !0
}), uw = /* @__PURE__ */ w({
  id: 128123,
  name: "Etherlink Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ"
  },
  rpcUrls: {
    default: { http: ["https://node.ghostnet.etherlink.com"] }
  },
  blockExplorers: {
    default: {
      name: "Etherlink Testnet",
      url: "https://testnet-explorer.etherlink.com"
    }
  },
  testnet: !0
}), dw = /* @__PURE__ */ w({
  id: 9001,
  name: "Evmos",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS"
  },
  rpcUrls: {
    default: { http: ["https://eth.bd.evmos.org:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Evmos Block Explorer",
      url: "https://escan.live"
    }
  }
}), pw = /* @__PURE__ */ w({
  id: 9e3,
  name: "Evmos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS"
  },
  rpcUrls: {
    default: { http: ["https://eth.bd.evmos.dev:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Evmos Testnet Block Explorer",
      url: "https://evm.evmos.dev/"
    }
  }
}), fw = /* @__PURE__ */ w({
  id: 1994,
  name: "Ekta",
  nativeCurrency: {
    decimals: 18,
    name: "EKTA",
    symbol: "EKTA"
  },
  rpcUrls: {
    default: { http: ["https://main.ekta.io"] }
  },
  blockExplorers: {
    default: {
      name: "Ektascan",
      url: "https://ektascan.io",
      apiUrl: "https://ektascan.io/api"
    }
  }
}), hw = /* @__PURE__ */ w({
  id: 1004,
  name: "Ekta Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EKTA",
    symbol: "EKTA"
  },
  rpcUrls: {
    default: { http: ["https://test.ekta.io:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Test Ektascan",
      url: "https://test.ektascan.io",
      apiUrl: "https://test.ektascan.io/api"
    }
  },
  testnet: !0
}), mw = /* @__PURE__ */ w({
  id: 250,
  name: "Fantom",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/fantom"] }
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com",
      apiUrl: "https://api.ftmscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 33001987
    }
  }
}), bw = /* @__PURE__ */ w({
  id: 64240,
  name: "Fantom Sonic Open Testnet",
  network: "fantom-sonic-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpcapi.sonic.fantom.network"] }
  },
  blockExplorers: {
    default: {
      name: "Fantom Sonic Open Testnet Explorer",
      url: "https://public-sonic.fantom.network"
    }
  },
  testnet: !0
}), yw = /* @__PURE__ */ w({
  id: 4002,
  name: "Fantom Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.fantom.network"] }
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://testnet.ftmscan.com",
      apiUrl: "https://testnet.ftmscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 8328688
    }
  },
  testnet: !0
}), ww = /* @__PURE__ */ w({
  id: 12306,
  name: "Fibo Chain",
  nativeCurrency: {
    decimals: 18,
    name: "fibo",
    symbol: "FIBO"
  },
  rpcUrls: {
    default: { http: ["https://network.hzroc.art"] }
  },
  blockExplorers: {
    default: {
      name: "FiboScan",
      url: "https://scan.fibochain.org"
    }
  }
}), gw = /* @__PURE__ */ w({
  id: 314,
  name: "Filecoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "filecoin",
    symbol: "FIL"
  },
  rpcUrls: {
    default: { http: ["https://api.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://filfox.info/en"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3328594
    }
  }
}), vw = /* @__PURE__ */ w({
  id: 314159,
  name: "Filecoin Calibration",
  nativeCurrency: {
    decimals: 18,
    name: "testnet filecoin",
    symbol: "tFIL"
  },
  rpcUrls: {
    default: { http: ["https://api.calibration.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filscan",
      url: "https://calibration.filscan.io"
    }
  },
  testnet: !0
}), Cw = /* @__PURE__ */ w({
  id: 3141,
  name: "Filecoin Hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "testnet filecoin",
    symbol: "tFIL"
  },
  rpcUrls: {
    default: { http: ["https://api.hyperspace.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://hyperspace.filfox.info/en"
    }
  },
  testnet: !0
}), xw = /* @__PURE__ */ w({
  id: 14,
  name: "Flare Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "flare",
    symbol: "FLR"
  },
  rpcUrls: {
    default: { http: ["https://flare-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Flare Explorer",
      url: "https://flare-explorer.flare.network",
      apiUrl: "https://flare-explorer.flare.network/api"
    }
  }
}), Aw = /* @__PURE__ */ w({
  id: 114,
  name: "Coston2",
  nativeCurrency: {
    decimals: 18,
    name: "coston2flare",
    symbol: "C2FLR"
  },
  rpcUrls: {
    default: { http: ["https://coston2-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Coston2 Explorer",
      url: "https://coston2-explorer.flare.network",
      apiUrl: "https://coston2-explorer.flare.network/api"
    }
  },
  testnet: !0
}), kw = /* @__PURE__ */ w({
  id: 646,
  name: "FlowEVM Previewnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://previewnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Previewnet Explorer",
      url: "https://previewnet.flowdiver.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6205
    }
  }
}), Ew = /* @__PURE__ */ w({
  id: 747,
  name: "FlowEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mainnet Explorer",
      url: "https://flowdiver.io"
    }
  }
}), Iw = /* @__PURE__ */ w({
  id: 545,
  name: "FlowEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Flow Diver",
      url: "https://testnet.flowdiver.io"
    }
  }
}), Sw = /* @__PURE__ */ w({
  id: 31337,
  name: "Foundry",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
}), Vn = 1, Tw = /* @__PURE__ */ w({
  ...z,
  id: 252,
  name: "Fraxtal",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.frax.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "fraxscan",
      url: "https://fraxscan.com",
      apiUrl: "https://api.fraxscan.com/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Vn]: {
        address: "0x66CC916Ed5C6C2FA97014f7D1cD141528Ae171e4"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [Vn]: {
        address: "0x36cb65c1967A0Fb0EEE11569C51C2f2aA1Ca6f6D",
        blockCreated: 19135323
      }
    },
    l1StandardBridge: {
      [Vn]: {
        address: "0x34C0bD5877A5Ee7099D0f5688D65F4bB9158BDE2",
        blockCreated: 19135323
      }
    }
  },
  sourceId: Vn
}), Kn = 17e3, Pw = /* @__PURE__ */ w({
  ...z,
  id: 2522,
  name: "Fraxtal Testnet",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.frax.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "fraxscan testnet",
      url: "https://holesky.fraxscan.com",
      apiUrl: "https://api-holesky.fraxscan.com/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Kn]: {
        address: "0x715EA64DA13F4d0831ece4Ad3E8c1aa013167F32"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [Kn]: {
        address: "0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d",
        blockCreated: 318416
      }
    },
    l1StandardBridge: {
      [Kn]: {
        address: "0x0BaafC217162f64930909aD9f2B27125121d6332",
        blockCreated: 318416
      }
    }
  },
  sourceId: Kn
}), Bw = 11155111, Uw = w({
  ...z,
  id: 3397901,
  network: "funkiSepolia",
  name: "Funki Sepolia Sandbox",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://funki-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Funki Sepolia Sandbox Explorer",
      url: "https://sepolia-sandbox.funkichain.com/"
    }
  },
  testnet: !0,
  contracts: {
    ...z.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    }
  },
  sourceId: Bw
}), Mw = /* @__PURE__ */ w({
  id: 122,
  name: "Fuse",
  nativeCurrency: { name: "Fuse", symbol: "FUSE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.fuse.io"] }
  },
  blockExplorers: {
    default: {
      name: "Fuse Explorer",
      url: "https://explorer.fuse.io",
      apiUrl: "https://explorer.fuse.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 16146628
    }
  }
}), Fw = /* @__PURE__ */ w({
  id: 123,
  name: "Fuse Sparknet",
  nativeCurrency: { name: "Spark", symbol: "SPARK", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.fusespark.io"] }
  },
  blockExplorers: {
    default: {
      name: "Sparkent Explorer",
      url: "https://explorer.fusespark.io",
      apiUrl: "https://explorer.fusespark.io/api"
    }
  }
}), Nw = /* @__PURE__ */ w({
  id: 4689,
  name: "IoTeX",
  nativeCurrency: {
    decimals: 18,
    name: "IoTeX",
    symbol: "IOTX"
  },
  rpcUrls: {
    default: {
      http: ["https://babel-api.mainnet.iotex.io"],
      webSocket: ["wss://babel-api.mainnet.iotex.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "IoTeXScan",
      url: "https://iotexscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 22163670
    }
  }
}), Dw = /* @__PURE__ */ w({
  id: 4690,
  name: "IoTeX Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IoTeX",
    symbol: "IOTX"
  },
  rpcUrls: {
    default: {
      http: ["https://babel-api.testnet.iotex.io"],
      webSocket: ["wss://babel-api.testnet.iotex.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "IoTeXScan",
      url: "https://testnet.iotexscan.io"
    }
  },
  testnet: !0
}), Ow = /* @__PURE__ */ w({
  id: 8899,
  name: "JIBCHAIN L1",
  network: "jbc",
  nativeCurrency: { name: "JBC", symbol: "JBC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-l1.jibchain.net"]
    },
    public: {
      http: ["https://rpc-l1.jibchain.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp-l1.jibchain.net",
      apiUrl: "https://exp-l1.jibchain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC",
      blockCreated: 2299048
    }
  },
  testnet: !1
}), Rw = /* @__PURE__ */ w({
  id: 88991,
  name: "Jibchain Testnet",
  nativeCurrency: { name: "tJBC", symbol: "tJBC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.jibchain.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp.testnet.jibchain.net",
      apiUrl: "https://exp.testnet.jibchain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xa1a858ad9041B4741e620355a3F96B3c78e70ecE",
      blockCreated: 32848
    }
  },
  testnet: !0
}), zw = /* @__PURE__ */ w({
  id: 686,
  name: "Karura",
  network: "karura",
  nativeCurrency: {
    name: "Karura",
    symbol: "KAR",
    decimals: 18
  },
  rpcUrls: {
    public: {
      http: ["https://eth-rpc-karura.aca-api.network"],
      webSocket: ["wss://eth-rpc-karura.aca-api.network"]
    },
    default: {
      http: ["https://eth-rpc-karura.aca-api.network"],
      webSocket: ["wss://eth-rpc-karura.aca-api.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Karura Blockscout",
      url: "https://blockscout.karura.network",
      apiUrl: "https://blockscout.karura.network/api"
    }
  },
  testnet: !1
}), jw = /* @__PURE__ */ w({
  id: 1663,
  name: "Horizen Gobi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test ZEN",
    symbol: "tZEN"
  },
  rpcUrls: {
    default: { http: ["https://gobi-testnet.horizenlabs.io/ethv1"] }
  },
  blockExplorers: {
    default: {
      name: "Gobi Explorer",
      url: "https://gobi-explorer.horizen.io"
    }
  },
  contracts: {},
  testnet: !0
}), Lw = /* @__PURE__ */ w({
  id: 5,
  name: "Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/eth_goerli"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io",
      apiUrl: "https://api-goerli.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xfc4AC75C46C914aF5892d6d3eFFcebD7917293F1",
      blockCreated: 10339206
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6507670
    }
  },
  testnet: !0
}), _w = /* @__PURE__ */ w({
  id: 100,
  name: "Gnosis",
  nativeCurrency: {
    decimals: 18,
    name: "Gnosis",
    symbol: "xDAI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gnosischain.com"],
      webSocket: ["wss://rpc.gnosischain.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "Gnosisscan",
      url: "https://gnosisscan.io",
      apiUrl: "https://api.gnosisscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 21022491
    }
  }
}), $w = /* @__PURE__ */ w({
  id: 10200,
  name: "Gnosis Chiado",
  nativeCurrency: {
    decimals: 18,
    name: "Gnosis",
    symbol: "xDAI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.chiadochain.net"],
      webSocket: ["wss://rpc.chiadochain.net/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.chiadochain.net",
      apiUrl: "https://blockscout.chiadochain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4967313
    }
  },
  testnet: !0
}), Hw = /* @__PURE__ */ w({
  id: 5112,
  name: "Ham",
  nativeCurrency: {
    decimals: 18,
    name: "Ham",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ham.fun"],
      webSocket: ["wss://rpc.ham.fun"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ham Chain Explorer",
      url: "https://explorer.ham.fun",
      apiUrl: "https://explorer.ham.fun/api/v2"
    }
  }
}), Gw = /* @__PURE__ */ w({
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
}), qw = /* @__PURE__ */ w({
  id: 16666e5,
  name: "Harmony One",
  nativeCurrency: {
    name: "Harmony",
    symbol: "ONE",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/harmony"] }
  },
  blockExplorers: {
    default: {
      name: "Harmony Explorer",
      url: "https://explorer.harmony.one"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 24185753
    }
  }
}), Qw = /* @__PURE__ */ w({
  id: 11235,
  name: "HAQQ Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Islamic Coin",
    symbol: "ISLM"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.eth.haqq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "HAQQ Explorer",
      url: "https://explorer.haqq.network",
      apiUrl: "https://explorer.haqq.network/api"
    }
  }
}), Vw = /* @__PURE__ */ w({
  id: 54211,
  name: "HAQQ Testedge 2",
  nativeCurrency: {
    decimals: 18,
    name: "Islamic Coin",
    symbol: "ISLMT"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.eth.testedge2.haqq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "HAQQ Explorer",
      url: "https://explorer.testedge2.haqq.network",
      apiUrl: "https://explorer.testedge2.haqq.network/api"
    }
  }
}), Kw = /* @__PURE__ */ w({
  id: 295,
  name: "Hedera Mainnet",
  network: "hedera-mainnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/mainnet"
    }
  },
  testnet: !1
}), Ww = /* @__PURE__ */ w({
  id: 296,
  name: "Hedera Testnet",
  network: "hedera-testnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/testnet"
    }
  },
  testnet: !0
}), Jw = /* @__PURE__ */ w({
  id: 297,
  name: "Hedera Previewnet",
  network: "hedera-previewnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://previewnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/previewnet"
    }
  },
  testnet: !0
}), Zw = /* @__PURE__ */ w({
  id: 17e3,
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky-rpc.publicnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://holesky.etherscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 77
    },
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      blockCreated: 801613
    },
    ensUniversalResolver: {
      address: "0xa6AC935D4971E3CD133b950aE053bECD16fE7f3b",
      blockCreated: 973484
    }
  },
  testnet: !0
}), Xw = /* @__PURE__ */ w({
  id: 13371,
  name: "Immutable zkEVM",
  nativeCurrency: {
    decimals: 18,
    name: "Immutable Coin",
    symbol: "IMX"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.immutable.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Immutable Explorer",
      url: "https://explorer.immutable.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x236bdA4589e44e6850f5aC6a74BfCa398a86c6c0",
      blockCreated: 4335972
    }
  }
}), Yw = /* @__PURE__ */ w({
  id: 13473,
  name: "Immutable zkEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Immutable Coin",
    symbol: "IMX"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.immutable.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Immutable Testnet Explorer",
      url: "https://explorer.testnet.immutable.com/"
    }
  },
  contracts: {
    multicall3: {
      address: "0x2CC787Ed364600B0222361C4188308Fa8E68bA60",
      blockCreated: 5977391
    }
  },
  testnet: !0
}), eg = /* @__PURE__ */ w({
  id: 2525,
  name: "inEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Injective",
    symbol: "INJ"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.rpc.inevm.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "inEVM Explorer",
      url: "https://inevm.calderaexplorer.xyz",
      apiUrl: "https://inevm.calderaexplorer.xyz/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 118606
    }
  }
}), tg = /* @__PURE__ */ w({
  id: 1802203764,
  name: "Kakarot Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.kakarot.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kakarot Scan",
      url: "https://sepolia.kakarotscan.org"
    }
  },
  testnet: !0
}), ng = /* @__PURE__ */ w({
  id: 2222,
  name: "Kava EVM",
  network: "kava-mainnet",
  nativeCurrency: {
    name: "Kava",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://evm.kava.io"] }
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Explorer",
      url: "https://kavascan.com",
      apiUrl: "https://kavascan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3661165
    }
  },
  testnet: !1
}), rg = /* @__PURE__ */ w({
  id: 2221,
  name: "Kava EVM Testnet",
  network: "kava-testnet",
  nativeCurrency: {
    name: "Kava",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://evm.testnet.kava.io"] }
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Testnet Explorer",
      url: "https://testnet.kavascan.com/",
      apiUrl: "https://testnet.kavascan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xDf1D724A7166261eEB015418fe8c7679BBEa7fd6",
      blockCreated: 7242179
    }
  },
  testnet: !0
}), sg = /* @__PURE__ */ w({
  id: 321,
  name: "KCC Mainnet",
  network: "KCC Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "KCS",
    symbol: "KCS"
  },
  rpcUrls: {
    default: {
      http: ["https://kcc-rpc.com"]
    },
    public: {
      http: ["https://kcc-rpc.com"]
    }
  },
  blockExplorers: {
    default: { name: "KCC Explorer", url: "https://explorer.kcc.io" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11760430
    }
  },
  testnet: !1
}), ag = /* @__PURE__ */ w({
  id: 8217,
  name: "Klaytn",
  nativeCurrency: {
    decimals: 18,
    name: "Klaytn",
    symbol: "KLAY"
  },
  rpcUrls: {
    default: { http: ["https://public-en-cypress.klaytn.net"] }
  },
  blockExplorers: {
    default: {
      name: "KlaytnScope",
      url: "https://scope.klaytn.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96002415
    }
  }
}), og = /* @__PURE__ */ w({
  id: 1001,
  name: "Klaytn Baobab Testnet",
  network: "klaytn-baobab",
  nativeCurrency: {
    decimals: 18,
    name: "Baobab Klaytn",
    symbol: "KLAY"
  },
  rpcUrls: {
    default: { http: ["https://public-en-baobab.klaytn.net"] }
  },
  blockExplorers: {
    default: {
      name: "KlaytnScope",
      url: "https://baobab.klaytnscope.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 123390593
    }
  },
  testnet: !0
}), ig = /* @__PURE__ */ w({
  id: 255,
  name: "Kroma",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.kroma.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kroma Explorer",
      url: "https://blockscout.kroma.network",
      apiUrl: "https://blockscout.kroma.network/api"
    }
  },
  testnet: !1
}), cg = /* @__PURE__ */ w({
  id: 2358,
  name: "Kroma Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.sepolia.kroma.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kroma Sepolia Explorer",
      url: "https://blockscout.sepolia.kroma.network",
      apiUrl: "https://blockscout.sepolia.kroma.network/api"
    }
  },
  testnet: !0
}), lg = /* @__PURE__ */ w({
  id: 12324,
  name: "L3X Protocol",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet.l3x.com"],
      webSocket: ["wss://rpc-mainnet.l3x.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "L3X Mainnet Explorer",
      url: "https://explorer.l3x.com",
      apiUrl: "https://explorer.l3x.com/api/v2"
    }
  },
  testnet: !1
}), ug = /* @__PURE__ */ w({
  id: 12325,
  name: "L3X Protocol Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.l3x.com"],
      webSocket: ["wss://rpc-testnet.l3x.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "L3X Testnet Explorer",
      url: "https://explorer-testnet.l3x.com",
      apiUrl: "https://explorer-testnet.l3x.com/api/v2"
    }
  },
  testnet: !0
}), dg = /* @__PURE__ */ w({
  id: 1891,
  name: "LightLink Pegasus Testnet",
  network: "lightlink-pegasus",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://replicator.pegasus.lightlink.io/rpc/v1"]
    }
  },
  blockExplorers: {
    default: {
      name: "LightLink Pegasus Explorer",
      url: "https://pegasus.lightlink.io"
    }
  },
  testnet: !0
}), pg = /* @__PURE__ */ w({
  id: 1890,
  name: "LightLink Phoenix Mainnet",
  network: "lightlink-phoenix",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://replicator.phoenix.lightlink.io/rpc/v1"]
    }
  },
  blockExplorers: {
    default: {
      name: "LightLink Phoenix Explorer",
      url: "https://phoenix.lightlink.io"
    }
  },
  testnet: !1
}), fg = /* @__PURE__ */ w({
  id: 59144,
  name: "Linea Mainnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.linea.build"],
      webSocket: ["wss://rpc.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://lineascan.build",
      apiUrl: "https://api.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 42
    }
  },
  testnet: !1
}), hg = /* @__PURE__ */ w({
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.lineascan.build",
      apiUrl: "https://api-goerli.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 498623
    }
  },
  testnet: !0
}), mg = /* @__PURE__ */ w({
  id: 59141,
  name: "Linea Sepolia Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.linea.build"],
      webSocket: ["wss://rpc.sepolia.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.lineascan.build",
      apiUrl: "https://api-sepolia.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 227427
    }
  },
  testnet: !0
}), bg = /* @__PURE__ */ w({
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.lineascan.build",
      apiUrl: "https://goerli.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 498623
    }
  },
  testnet: !0
}), Lo = 50000n, Bi = Uu * 32n, ju = {
  block: /* @__PURE__ */ Yr({
    format(e) {
      var n;
      const t = (n = e.transactions) == null ? void 0 : n.map((r) => {
        var a;
        if (typeof r == "string")
          return r;
        const s = (a = ju.transaction) == null ? void 0 : a.format(r);
        return s.typeHex === "0x71" ? s.type = "eip712" : s.typeHex === "0xff" && (s.type = "priority"), s;
      });
      return {
        l1BatchNumber: e.l1BatchNumber ? F(e.l1BatchNumber) : null,
        l1BatchTimestamp: e.l1BatchTimestamp ? F(e.l1BatchTimestamp) : null,
        transactions: t
      };
    }
  }),
  transaction: /* @__PURE__ */ Zr({
    format(e) {
      const t = {};
      return e.type === "0x71" ? t.type = "eip712" : e.type === "0xff" && (t.type = "priority"), {
        ...t,
        l1BatchNumber: e.l1BatchNumber ? F(e.l1BatchNumber) : null,
        l1BatchTxIndex: e.l1BatchTxIndex ? F(e.l1BatchTxIndex) : null
      };
    }
  }),
  transactionReceipt: /* @__PURE__ */ bo({
    format(e) {
      return {
        l1BatchNumber: e.l1BatchNumber ? F(e.l1BatchNumber) : null,
        l1BatchTxIndex: e.l1BatchTxIndex ? F(e.l1BatchTxIndex) : null,
        logs: e.logs.map((t) => ({
          ...Ce(t),
          l1BatchNumber: t.l1BatchNumber ? F(t.l1BatchNumber) : null,
          transactionLogIndex: Q(t.transactionLogIndex),
          logType: t.logType
        })),
        l2ToL1Logs: e.l2ToL1Logs.map((t) => ({
          blockNumber: F(t.blockHash),
          blockHash: t.blockHash,
          l1BatchNumber: F(t.l1BatchNumber),
          transactionIndex: F(t.transactionIndex),
          shardId: F(t.shardId),
          isService: t.isService,
          sender: t.sender,
          key: t.key,
          value: t.value,
          transactionHash: t.transactionHash,
          logIndex: F(t.logIndex)
        }))
      };
    }
  }),
  transactionRequest: /* @__PURE__ */ $a({
    exclude: [
      "customSignature",
      "factoryDeps",
      "gasPerPubdata",
      "paymaster",
      "paymasterInput"
    ],
    format(e) {
      return e.gasPerPubdata || e.paymaster && e.paymasterInput || e.factoryDeps || e.customSignature ? {
        eip712Meta: {
          ...e.gasPerPubdata ? { gasPerPubdata: P(e.gasPerPubdata) } : { gasPerPubdata: P(Lo) },
          ...e.paymaster && e.paymasterInput ? {
            paymasterParams: {
              paymaster: e.paymaster,
              paymasterInput: Array.from(X(e.paymasterInput))
            }
          } : {},
          ...e.factoryDeps ? {
            factoryDeps: e.factoryDeps.map((t) => Array.from(X(t)))
          } : {},
          ...e.customSignature ? {
            customSignature: Array.from(X(e.customSignature))
          } : {}
        },
        type: "0x71"
      } : {};
    }
  })
};
class yg extends k {
  constructor() {
    super([
      "Transaction is not an EIP712 transaction.",
      "",
      "Transaction must:",
      '  - include `type: "eip712"`',
      "  - include one of the following: `customSignature`, `paymaster`, `paymasterInput`, `gasPerPubdata`, `factoryDeps`"
    ].join(`
`)), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidEip712TransactionError"
    });
  }
}
function Lu(e) {
  return !!(e.type === "eip712" || "customSignature" in e && e.customSignature || "paymaster" in e && e.paymaster || "paymasterInput" in e && e.paymasterInput || "gasPerPubdata" in e && typeof e.gasPerPubdata == "bigint" || "factoryDeps" in e && e.factoryDeps);
}
function _u(e) {
  const { chainId: t, to: n, from: r, paymaster: s, paymasterInput: a } = e;
  if (!Lu(e))
    throw new yg();
  if (!t || t <= 0)
    throw new Ot({ chainId: t });
  if (n && !H(n))
    throw new K({ address: n });
  if (r && !H(r))
    throw new K({ address: r });
  if (s && !H(s))
    throw new K({ address: s });
  if (s && !a)
    throw new k("`paymasterInput` must be provided when `paymaster` is defined");
  if (!s && a)
    throw new k("`paymaster` must be provided when `paymasterInput` is defined");
}
function wg(e, t) {
  return Lu(e) ? vg(e) : kn(e, t);
}
const gg = {
  transaction: wg
};
function vg(e) {
  const { chainId: t, gas: n, nonce: r, to: s, from: a, value: o, maxFeePerGas: i, maxPriorityFeePerGas: c, customSignature: l, factoryDeps: u, paymaster: d, paymasterInput: p, gasPerPubdata: f, data: h } = e;
  _u(e);
  const m = [
    r ? P(r) : "0x",
    c ? P(c) : "0x",
    i ? P(i) : "0x",
    n ? P(n) : "0x",
    s ?? "0x",
    o ? P(o) : "0x",
    h ?? "0x0",
    P(t),
    P(""),
    P(""),
    P(t),
    a ?? "0x",
    P(f || Lo),
    u ?? [],
    l ?? "0x",
    // EIP712 signature
    d && p ? [d, p] : []
  ];
  return se([
    "0x71",
    pe(m)
  ]);
}
class Cg extends k {
  constructor({ givenLength: t, maxBytecodeSize: n }) {
    super(`Bytecode cannot be longer than ${n} bytes. Given length: ${t}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BytecodeLengthExceedsMaxSizeError"
    });
  }
}
class xg extends k {
  constructor({ givenLengthInWords: t }) {
    super(`Bytecode length in 32-byte words must be odd. Given length in words: ${t}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BytecodeLengthInWordsMustBeOddError"
    });
  }
}
class Ag extends k {
  constructor({ givenLength: t }) {
    super(`The bytecode length in bytes must be divisible by 32. Given length: ${t}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BytecodeLengthMustBeDivisibleBy32Error"
    });
  }
}
function kg(e) {
  const t = J(e);
  if (t.length % 32 !== 0)
    throw new Ag({
      givenLength: t.length
    });
  if (t.length > Bi)
    throw new Cg({
      givenLength: t.length,
      maxBytecodeSize: Bi
    });
  const n = qa(t), r = J(n), s = t.length / 32;
  if (s % 2 === 0)
    throw new xg({
      givenLengthInWords: s
    });
  const a = J(s), o = le(a, { size: 2 }), i = new Uint8Array([1, 0]);
  return r.set(i, 0), r.set(o, 2), r;
}
const Eg = (e) => {
  _u(e);
  const t = Ig(e);
  return {
    domain: {
      name: "zkSync",
      version: "2",
      chainId: e.chainId
    },
    types: {
      Transaction: [
        { name: "txType", type: "uint256" },
        { name: "from", type: "uint256" },
        { name: "to", type: "uint256" },
        { name: "gasLimit", type: "uint256" },
        { name: "gasPerPubdataByteLimit", type: "uint256" },
        { name: "maxFeePerGas", type: "uint256" },
        { name: "maxPriorityFeePerGas", type: "uint256" },
        { name: "paymaster", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "factoryDeps", type: "bytes32[]" },
        { name: "paymasterInput", type: "bytes" }
      ]
    },
    primaryType: "Transaction",
    message: t
  };
};
function Ig(e) {
  const { gas: t, nonce: n, to: r, from: s, value: a, maxFeePerGas: o, maxPriorityFeePerGas: i, factoryDeps: c, paymaster: l, paymasterInput: u, gasPerPubdata: d, data: p } = e;
  return {
    txType: 113n,
    from: BigInt(s),
    to: r ? BigInt(r) : 0n,
    gasLimit: t ?? 0n,
    gasPerPubdataByteLimit: d ?? Lo,
    maxFeePerGas: o ?? 0n,
    maxPriorityFeePerGas: i ?? 0n,
    paymaster: l ? BigInt(l) : 0n,
    nonce: n ? BigInt(n) : 0n,
    value: a ?? 0n,
    data: p || "0x0",
    factoryDeps: (c == null ? void 0 : c.map((f) => P(kg(f)))) ?? [],
    paymasterInput: u || "0x"
  };
}
const pt = {
  formatters: ju,
  serializers: gg,
  custom: {
    getEip712Domain: Eg
  }
}, Sg = /* @__PURE__ */ w({
  ...pt,
  id: 1135,
  name: "Lisk",
  network: "lisk",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.lisk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.lisk.com",
      apiUrl: "https://blockscout.lisk.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xA9d71E1dd7ca26F26e656E66d6AA81ed7f745bf0"
    }
  }
}), Wn = 11155111, Tg = /* @__PURE__ */ w({
  ...z,
  id: 4202,
  network: "lisk-sepolia",
  name: "Lisk Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.lisk.com",
      apiUrl: "https://sepolia-blockscout.lisk.com/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Wn]: {
        address: "0xA0E35F56C318DE1bD5D9ca6A94Fe7e37C5663348"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [Wn]: {
        address: "0xe3d90F21490686Ec7eF37BE788E02dfC12787264"
      }
    },
    l1StandardBridge: {
      [Wn]: {
        address: "0x1Fb30e446eA791cd1f011675E5F3f5311b70faF5"
      }
    }
  },
  testnet: !0,
  sourceId: Wn
}), Pg = /* @__PURE__ */ w({
  id: 1337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
}), Bg = /* @__PURE__ */ w({
  id: 42,
  network: "lukso",
  name: "LUKSO",
  nativeCurrency: {
    name: "LUKSO",
    symbol: "LYX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.lukso.network"],
      webSocket: ["wss://ws-rpc.mainnet.lukso.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "LUKSO Mainnet Explorer",
      url: "https://explorer.execution.mainnet.lukso.network",
      apiUrl: "https://api.explorer.execution.mainnet.lukso.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 468183
    }
  }
}), Ug = /* @__PURE__ */ w({
  id: 4201,
  name: "LUKSO Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LUKSO Testnet",
    symbol: "LYXt"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lukso.network"],
      webSocket: ["wss://ws-rpc.testnet.lukso.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "LUKSO Testnet Explorer",
      url: "https://explorer.execution.testnet.lukso.network",
      apiUrl: "https://api.explorer.execution.testnet.lukso.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 605348
    }
  },
  testnet: !0
}), Mg = /* @__PURE__ */ w({
  id: 721,
  name: "Lycan",
  nativeCurrency: {
    decimals: 18,
    name: "Lycan",
    symbol: "LYC"
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.lycanchain.com",
        "https://us-east.lycanchain.com",
        "https://us-west.lycanchain.com",
        "https://eu-north.lycanchain.com",
        "https://eu-west.lycanchain.com",
        "https://asia-southeast.lycanchain.com"
      ],
      webSocket: [
        "wss://rpc.lycanchain.com",
        "wss://us-east.lycanchain.com",
        "wss://us-west.lycanchain.com",
        "wss://eu-north.lycanchain.com",
        "wss://eu-west.lycanchain.com",
        "wss://asia-southeast.lycanchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Lycan Explorer",
      url: "https://explorer.lycanchain.com"
    }
  }
}), dr = /* @__PURE__ */ w({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cloudflare-eth.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19258213
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
}), Fg = /* @__PURE__ */ w({
  id: 595,
  name: "Mandala TC9",
  network: "mandala",
  nativeCurrency: {
    name: "Mandala",
    symbol: "mACA",
    decimals: 18
  },
  rpcUrls: {
    public: {
      http: ["https://eth-rpc-tc9.aca-staging.network"],
      webSocket: ["wss://eth-rpc-tc9.aca-staging.network"]
    },
    default: {
      http: ["https://eth-rpc-tc9.aca-staging.network"],
      webSocket: ["wss://eth-rpc-tc9.aca-staging.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mandala Blockscout",
      url: "https://blockscout.mandala.aca-staging.network",
      apiUrl: "https://blockscout.mandala.aca-staging.network/api"
    }
  },
  testnet: !0
}), Ng = /* @__PURE__ */ w({
  id: 169,
  name: "Manta Pacific Mainnet",
  network: "manta",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://pacific-rpc.manta.network/http"] }
  },
  blockExplorers: {
    default: {
      name: "Manta Explorer",
      url: "https://pacific-explorer.manta.network",
      apiUrl: "https://pacific-explorer.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 332890
    }
  }
}), Dg = /* @__PURE__ */ w({
  id: 3441006,
  name: "Manta Pacific Sepolia Testnet",
  network: "manta-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://pacific-rpc.sepolia-testnet.manta.network/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Manta Sepolia Testnet Explorer",
      url: "https://pacific-explorer.sepolia-testnet.manta.network",
      apiUrl: "https://pacific-explorer.sepolia-testnet.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca54918f7B525C8df894668846506767412b53E3",
      blockCreated: 479584
    }
  },
  testnet: !0
}), Og = /* @__PURE__ */ w({
  id: 3441005,
  name: "Manta Pacific Testnet",
  network: "manta-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://manta-testnet.calderachain.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Manta Testnet Explorer",
      url: "https://pacific-explorer.testnet.manta.network",
      apiUrl: "https://pacific-explorer.testnet.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x211B1643b95Fe76f11eD8880EE810ABD9A4cf56C",
      blockCreated: 419915
    }
  },
  testnet: !0
}), Rg = /* @__PURE__ */ w({
  id: 5e3,
  name: "Mantle",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://mantlescan.xyz/",
      apiUrl: "https://api.mantlescan.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 304717
    }
  }
}), zg = /* @__PURE__ */ w({
  id: 5003,
  name: "Mantle Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.sepolia.mantle.xyz/",
      apiUrl: "https://explorer.sepolia.mantle.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4584012
    }
  },
  testnet: !0
}), jg = /* @__PURE__ */ w({
  id: 5001,
  name: "Mantle Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.testnet.mantle.xyz",
      apiUrl: "https://explorer.testnet.mantle.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 561333
    }
  },
  testnet: !0
}), Lg = /* @__PURE__ */ w({
  id: 4200,
  name: "Merlin",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.merlinchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://scan.merlinchain.io",
      apiUrl: "https://scan.merlinchain.io/api"
    }
  }
}), _g = /* @__PURE__ */ w({
  id: 571,
  name: "MetaChain Mainnet",
  nativeCurrency: { name: "Metatime Coin", symbol: "MTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.metatime.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "MetaExplorer",
      url: "https://explorer.metatime.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0000000000000000000000000000000000003001",
      blockCreated: 0
    }
  }
}), $g = /* @__PURE__ */ w({
  id: 1453,
  name: "MetaChain Istanbul",
  nativeCurrency: { name: "Metatime Coin", symbol: "MTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://istanbul-rpc.metachain.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "MetaExplorer",
      url: "https://istanbul-explorer.metachain.dev"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0000000000000000000000000000000000003001",
      blockCreated: 0
    }
  },
  testnet: !0
}), Jn = 1, Hg = /* @__PURE__ */ w({
  ...z,
  id: 1750,
  name: "Metal L2",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.metall2.com"],
      webSocket: ["wss://rpc.metall2.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.metall2.com",
      apiUrl: "https://explorer.metall2.com/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Jn]: {
        address: "0x3B1F7aDa0Fcc26B13515af752Dd07fB1CAc11426"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    },
    portal: {
      [Jn]: {
        address: "0x3F37aBdE2C6b5B2ed6F8045787Df1ED1E3753956"
      }
    },
    l1StandardBridge: {
      [Jn]: {
        address: "0x6d0f65D59b55B0FEC5d2d15365154DcADC140BF3"
      }
    }
  },
  sourceId: Jn
}), Gg = /* @__PURE__ */ w({
  id: 82,
  name: "Meter",
  nativeCurrency: {
    decimals: 18,
    name: "MTR",
    symbol: "MTR"
  },
  rpcUrls: {
    default: { http: ["https://rpc.meter.io"] }
  },
  blockExplorers: {
    default: {
      name: "MeterScan",
      url: "https://scan.meter.io"
    }
  }
}), qg = /* @__PURE__ */ w({
  id: 83,
  name: "Meter Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MTR",
    symbol: "MTR"
  },
  rpcUrls: {
    default: { http: ["https://rpctest.meter.io"] }
  },
  blockExplorers: {
    default: {
      name: "MeterTestnetScan",
      url: "https://scan-warringstakes.meter.io"
    }
  }
}), Qg = /* @__PURE__ */ w({
  id: 1088,
  name: "Metis",
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS"
  },
  rpcUrls: {
    default: { http: ["https://andromeda.metis.io/?owner=1088"] }
  },
  blockExplorers: {
    default: {
      name: "Metis Explorer",
      url: "https://explorer.metis.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan/api"
    },
    blockscout: {
      name: "Andromeda Explorer",
      url: "https://andromeda-explorer.metis.io",
      apiUrl: "https://andromeda-explorer.metis.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2338552
    }
  }
}), Vg = /* @__PURE__ */ w({
  id: 599,
  name: "Metis Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Metis Goerli",
    symbol: "METIS"
  },
  rpcUrls: {
    default: { http: ["https://goerli.gateway.metisdevops.link"] }
  },
  blockExplorers: {
    default: {
      name: "Metis Goerli Explorer",
      url: "https://goerli.explorer.metisdevops.link",
      apiUrl: "https://goerli.explorer.metisdevops.link/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1006207
    }
  }
}), Kg = /* @__PURE__ */ w({
  id: 7518,
  name: "MEVerse Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "MEVerse",
    symbol: "MEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.meversemainnet.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://www.meversescan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 86881340
    }
  }
}), Wg = /* @__PURE__ */ w({
  id: 4759,
  name: "MEVerse Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MEVerse",
    symbol: "MEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.meversetestnet.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.meversescan.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 64371115
    }
  },
  testnet: !0
}), Jg = /* @__PURE__ */ w({
  id: 1686,
  name: "Mint Sepolia Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.mintchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mintchain Testnet explorer",
      url: "https://testnet-explorer.mintchain.io"
    }
  },
  testnet: !0
}), Zn = 1, Zg = /* @__PURE__ */ w({
  id: 34443,
  name: "Mode Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.mode.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Modescan",
      url: "https://modescan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2465882
    },
    l2OutputOracle: {
      [Zn]: {
        address: "0x4317ba146D4933D889518a3e5E11Fe7a53199b04"
      }
    },
    portal: {
      [Zn]: {
        address: "0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07"
      }
    },
    l1StandardBridge: {
      [Zn]: {
        address: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21"
      }
    }
  },
  sourceId: Zn
}), Xg = 11155111, Yg = /* @__PURE__ */ w({
  id: 919,
  name: "Mode Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.mode.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.mode.network",
      apiUrl: "https://sepolia.explorer.mode.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xBAba8373113Fb7a68f195deF18732e01aF8eDfCF",
      blockCreated: 3019007
    }
  },
  testnet: !0,
  sourceId: Xg
}), ev = /* @__PURE__ */ w({
  id: 1287,
  name: "Moonbase Alpha",
  nativeCurrency: {
    decimals: 18,
    name: "DEV",
    symbol: "DEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.moonbase.moonbeam.network"],
      webSocket: ["wss://wss.api.moonbase.moonbeam.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonbase.moonscan.io",
      apiUrl: "https://moonbase.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1850686
    }
  },
  testnet: !0
}), tv = /* @__PURE__ */ w({
  id: 1284,
  name: "Moonbeam",
  nativeCurrency: {
    decimals: 18,
    name: "GLMR",
    symbol: "GLMR"
  },
  rpcUrls: {
    default: {
      http: ["https://moonbeam.public.blastapi.io"],
      webSocket: ["wss://moonbeam.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonscan.io",
      apiUrl: "https://api-moonbeam.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 609002
    }
  },
  testnet: !1
}), nv = /* @__PURE__ */ w({
  id: 1281,
  name: "Moonbeam Development Node",
  nativeCurrency: {
    decimals: 18,
    name: "DEV",
    symbol: "DEV"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:9944"],
      webSocket: ["wss://127.0.0.1:9944"]
    }
  }
}), rv = /* @__PURE__ */ w({
  id: 1285,
  name: "Moonriver",
  nativeCurrency: {
    decimals: 18,
    name: "MOVR",
    symbol: "MOVR"
  },
  rpcUrls: {
    default: {
      http: ["https://moonriver.public.blastapi.io"],
      webSocket: ["wss://moonriver.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonriver.moonscan.io",
      apiUrl: "https://api-moonriver.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1597904
    }
  },
  testnet: !1
}), sv = /* @__PURE__ */ w({
  id: 2710,
  name: "Morph Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.morphl2.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Testnet Explorer",
      url: "https://explorer-testnet.morphl2.io",
      apiUrl: "https://explorer-api-testnet.morphl2.io/api"
    }
  },
  testnet: !0
}), av = /* @__PURE__ */ w({
  id: 22222,
  name: "Nautilus Mainnet",
  nativeCurrency: { name: "ZBC", symbol: "ZBC", decimals: 9 },
  rpcUrls: {
    default: {
      http: ["https://api.nautilus.nautchain.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "NautScan",
      url: "https://nautscan.com"
    }
  }
}), ov = /* @__PURE__ */ w({
  id: 245022926,
  name: "Neon EVM DevNet",
  nativeCurrency: { name: "NEON", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://devnet.neonevm.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://devnet.neonscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 205206112
    }
  },
  testnet: !0
}), iv = /* @__PURE__ */ w({
  id: 245022934,
  network: "neonMainnet",
  name: "Neon EVM MainNet",
  nativeCurrency: { name: "NEON", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://neon-proxy-mainnet.solana.p2p.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://neonscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 206545524
    }
  },
  testnet: !1
}), cv = /* @__PURE__ */ w({
  id: 4242,
  name: "Nexi",
  nativeCurrency: { name: "Nexi", symbol: "NEXI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.chain.nexi.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "NexiScan",
      url: "https://www.nexiscan.com",
      apiUrl: "https://www.nexiscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0277A46Cc69A57eE3A6C8c158bA874832F718B8E",
      blockCreated: 25770160
    }
  }
}), lv = /* @__PURE__ */ w({
  id: 240,
  name: "Nexilix Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Nexilix",
    symbol: "NEXILIX"
  },
  rpcUrls: {
    default: { http: ["https://rpcurl.pos.nexilix.com"] }
  },
  blockExplorers: {
    default: {
      name: "NexilixScan",
      url: "https://scan.nexilix.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x58381c8e2BF9d0C2C4259cA14BdA9Afe02831244",
      blockCreated: 74448
    }
  }
}), uv = /* @__PURE__ */ w({
  id: 248,
  name: "Oasys",
  nativeCurrency: { name: "Oasys", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.oasys.games"]
    }
  },
  blockExplorers: {
    default: {
      name: "OasysScan",
      url: "https://scan.oasys.games",
      apiUrl: "https://scan.oasys.games/api"
    }
  }
}), dv = /* @__PURE__ */ w({
  id: 4090,
  network: "oasis-testnet",
  name: "Oasis Testnet",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc1.oasis.bahamutchain.com"] },
    public: { http: ["https://rpc1.oasis.bahamutchain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://oasis.ftnscan.com",
      apiUrl: "https://oasis.ftnscan.com/api"
    }
  },
  testnet: !0
}), pv = /* @__PURE__ */ w({
  id: 66,
  name: "OKC",
  nativeCurrency: {
    decimals: 18,
    name: "OKT",
    symbol: "OKT"
  },
  rpcUrls: {
    default: { http: ["https://exchainrpc.okex.org"] }
  },
  blockExplorers: {
    default: {
      name: "oklink",
      url: "https://www.oklink.com/okc"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10364792
    }
  }
}), Qt = 1, fv = /* @__PURE__ */ w({
  ...z,
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io",
      apiUrl: "https://api-optimistic.etherscan.io/api"
    }
  },
  contracts: {
    ...z.contracts,
    disputeGameFactory: {
      [Qt]: {
        address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9"
      }
    },
    l2OutputOracle: {
      [Qt]: {
        address: "0xdfe97868233d1aa22e815a266982f2cf17685a27"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4286263
    },
    portal: {
      [Qt]: {
        address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed"
      }
    },
    l1StandardBridge: {
      [Qt]: {
        address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
      }
    }
  },
  sourceId: Qt
}), Xn = 5, hv = /* @__PURE__ */ w({
  ...z,
  id: 420,
  name: "Optimism Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://goerli.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io",
      apiUrl: "https://goerli-optimism.etherscan.io/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [Xn]: {
        address: "0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 49461
    },
    portal: {
      [Xn]: {
        address: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383"
      }
    },
    l1StandardBridge: {
      [Xn]: {
        address: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8"
      }
    }
  },
  testnet: !0,
  sourceId: Xn
}), Vt = 11155111, mv = /* @__PURE__ */ w({
  ...z,
  id: 11155420,
  name: "OP Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://optimism-sepolia.blockscout.com",
      apiUrl: "https://optimism-sepolia.blockscout.com/api"
    }
  },
  contracts: {
    ...z.contracts,
    disputeGameFactory: {
      [Vt]: {
        address: "0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1"
      }
    },
    l2OutputOracle: {
      [Vt]: {
        address: "0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    },
    portal: {
      [Vt]: {
        address: "0x16Fc5058F25648194471939df75CF27A2fdC48BC"
      }
    },
    l1StandardBridge: {
      [Vt]: {
        address: "0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1"
      }
    }
  },
  testnet: !0,
  sourceId: Vt
}), bv = /* @__PURE__ */ w({
  id: 204,
  name: "opBNB",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://opbnb-mainnet-rpc.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "opbnbscan",
      url: "https://mainnet.opbnbscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 512881
    }
  }
}), yv = /* @__PURE__ */ w({
  id: 5611,
  name: "opBNB Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB"
  },
  rpcUrls: {
    default: { http: ["https://opbnb-testnet-rpc.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "opbnbscan",
      url: "https://testnet.opbnbscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3705108
    }
  },
  testnet: !0
}), wv = /* @__PURE__ */ w({
  id: 9700,
  name: "OORT MainnetDev",
  nativeCurrency: {
    decimals: 18,
    name: "OORT",
    symbol: "OORT"
  },
  rpcUrls: {
    default: { http: ["https://dev-rpc.oortech.com"] }
  },
  blockExplorers: {
    oort: {
      name: "OORT MainnetDev Explorer",
      url: "https://dev-scan.oortech.com"
    },
    default: {
      name: "OORT MainnetDev Explorer",
      url: "https://dev-scan.oortech.com"
    }
  }
}), gv = /* @__PURE__ */ w({
  id: 41144114,
  name: "Otim Devnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://devnet.otim.xyz"]
    }
  },
  contracts: {
    batchInvoker: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    }
  }
}), vv = /* @__PURE__ */ w({
  id: 11297108109,
  name: "Palm",
  nativeCurrency: {
    decimals: 18,
    name: "PALM",
    symbol: "PALM"
  },
  rpcUrls: {
    default: {
      http: ["https://palm-mainnet.public.blastapi.io"],
      webSocket: ["wss://palm-mainnet.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chainlens",
      url: "https://palm.chainlens.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15429248
    }
  }
}), Cv = /* @__PURE__ */ w({
  id: 11297108099,
  name: "Palm Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "PALM",
    symbol: "PALM"
  },
  rpcUrls: {
    default: {
      http: ["https://palm-mainnet.public.blastapi.io"],
      webSocket: ["wss://palm-mainnet.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chainlens",
      url: "https://palm.chainlens.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15429248
    }
  },
  testnet: !0
}), xv = /* @__PURE__ */ w({
  ...pt,
  id: 1612127,
  name: "PlayFi Albireo Testnet",
  network: "albireo",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://albireo-rpc.playfi.ai"],
      webSocket: ["wss://albireo-rpc-ws.playfi.ai/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "PlayFi Albireo Explorer",
      url: "https://albireo-explorer.playfi.ai"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    }
  },
  testnet: !0
}), Yn = 1, Av = /* @__PURE__ */ w({
  id: 424,
  network: "pgn",
  name: "PGN",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.publicgoods.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "PGN Explorer",
      url: "https://explorer.publicgoods.network",
      apiUrl: "https://explorer.publicgoods.network/api"
    },
    blocksout: {
      name: "PGN Explorer",
      url: "https://explorer.publicgoods.network",
      apiUrl: "https://explorer.publicgoods.network/api"
    }
  },
  contracts: {
    l2OutputOracle: {
      [Yn]: {
        address: "0x9E6204F750cD866b299594e2aC9eA824E2e5f95c"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3380209
    },
    portal: {
      [Yn]: {
        address: "0xb26Fd985c5959bBB382BAFdD0b879E149e48116c"
      }
    },
    l1StandardBridge: {
      [Yn]: {
        address: "0xD0204B9527C1bA7bD765Fa5CCD9355d38338272b"
      }
    }
  },
  formatters: jo,
  sourceId: Yn
}), er = 11155111, kv = /* @__PURE__ */ w({
  id: 58008,
  network: "pgn-testnet",
  name: "PGN ",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.publicgoods.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "PGN Testnet Explorer",
      url: "https://explorer.sepolia.publicgoods.network",
      apiUrl: "https://explorer.sepolia.publicgoods.network/api"
    },
    blocksout: {
      name: "PGN Testnet Explorer",
      url: "https://explorer.sepolia.publicgoods.network",
      apiUrl: "https://explorer.sepolia.publicgoods.network/api"
    }
  },
  contracts: {
    l2OutputOracle: {
      [er]: {
        address: "0xD5bAc3152ffC25318F848B3DD5dA6C85171BaEEe"
      }
    },
    portal: {
      [er]: {
        address: "0xF04BdD5353Bb0EFF6CA60CfcC78594278eBfE179"
      }
    },
    l1StandardBridge: {
      [er]: {
        address: "0xFaE6abCAF30D23e233AC7faF747F2fC3a5a6Bfa3"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3754925
    }
  },
  formatters: jo,
  sourceId: er,
  testnet: !0
}), Ev = /* @__PURE__ */ w({
  id: 13381,
  name: "Phoenix Blockchain",
  nativeCurrency: { name: "Phoenix", symbol: "PHX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.phoenixplorer.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Phoenixplorer",
      url: "https://phoenixplorer.com",
      apiUrl: "https://phoenixplorer.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x498cF757a575cFF2c2Ed9f532f56Efa797f86442",
      blockCreated: 5620192
    }
  }
}), Iv = /* @__PURE__ */ w({
  id: 242,
  name: "Plinga",
  nativeCurrency: { name: "Plinga", symbol: "PLINGA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpcurl.mainnet.plgchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Plgscan",
      url: "https://www.plgscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0989576160f2e7092908BB9479631b901060b6e4",
      blockCreated: 204489
    }
  }
}), Sv = 11155111, Tv = /* @__PURE__ */ w({
  id: 161221135,
  name: "Plume Testnet",
  nativeCurrency: {
    name: "Plume Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.plumenetwork.xyz/http"],
      webSocket: ["wss://testnet-rpc.plumenetwork.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.plumenetwork.xyz",
      apiUrl: "https://testnet-explorer.plumenetwork.xyz/api"
    }
  },
  testnet: !0,
  sourceId: Sv
}), Pv = /* @__PURE__ */ w({
  id: 137,
  name: "Polygon",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  }
}), Bv = /* @__PURE__ */ w({
  id: 80002,
  name: "Polygon Amoy",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-amoy.polygon.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://amoy.polygonscan.com",
      apiUrl: "https://api-amoy.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3127388
    }
  },
  testnet: !0
}), Uv = /* @__PURE__ */ w({
  id: 80001,
  name: "Polygon Mumbai",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/polygon_mumbai"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com",
      apiUrl: "https://api-testnet.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  },
  testnet: !0
}), Mv = /* @__PURE__ */ w({
  id: 1101,
  name: "Polygon zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://zkevm.polygonscan.com",
      apiUrl: "https://api-zkevm.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 57746
    }
  }
}), Fv = /* @__PURE__ */ w({
  id: 2442,
  name: "Polygon zkEVM Cardona",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.cardona.zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://cardona-zkevm.polygonscan.com",
      apiUrl: "https://cardona-zkevm.polygonscan.com/api"
    }
  },
  testnet: !0,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 114091
    }
  }
}), Nv = /* @__PURE__ */ w({
  id: 1442,
  name: "Polygon zkEVM Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.public.zkevm-test.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://testnet-zkevm.polygonscan.com",
      apiUrl: "https://testnet-zkevm.polygonscan.com/api"
    }
  },
  testnet: !0,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 525686
    }
  }
}), Dv = /* @__PURE__ */ w({
  id: 369,
  name: "PulseChain",
  nativeCurrency: { name: "Pulse", symbol: "PLS", decimals: 18 },
  testnet: !1,
  rpcUrls: {
    default: {
      http: ["https://rpc.pulsechain.com"],
      webSocket: ["wss://ws.pulsechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PulseScan",
      url: "https://scan.pulsechain.com",
      apiUrl: "https://api.scan.pulsechain.com/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
}), Ov = /* @__PURE__ */ w({
  id: 943,
  name: "PulseChain V4",
  testnet: !0,
  nativeCurrency: { name: "V4 Pulse", symbol: "v4PLS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.v4.testnet.pulsechain.com"],
      webSocket: ["wss://ws.v4.testnet.pulsechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PulseScan",
      url: "https://scan.v4.testnet.pulsechain.com",
      apiUrl: "https://scan.v4.testnet.pulsechain.com/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
}), Rv = /* @__PURE__ */ w({
  id: 35441,
  name: "Q Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Q",
    symbol: "Q"
  },
  rpcUrls: {
    default: { http: ["https://rpc.q.org"] }
  },
  blockExplorers: {
    default: {
      name: "Q Mainnet Explorer",
      url: "https://explorer.q.org",
      apiUrl: "https://explorer.q.org/api"
    }
  }
}), zv = /* @__PURE__ */ w({
  id: 35443,
  name: "Q Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Q",
    symbol: "Q"
  },
  rpcUrls: {
    default: { http: ["https://rpc.qtestnet.org"] }
  },
  blockExplorers: {
    default: {
      name: "Q Testnet Explorer",
      url: "https://explorer.qtestnet.org",
      apiUrl: "https://explorer.qtestnet.org/api"
    }
  },
  testnet: !0
}), jv = /* @__PURE__ */ w({
  id: 153,
  name: "Redbelly Network Testnet",
  nativeCurrency: {
    name: "Redbelly Native Coin",
    symbol: "RBNT",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://governors.testnet.redbelly.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://explorer.testnet.redbelly.network",
      apiUrl: "https://ethernal.fly.dev/api"
    }
  },
  testnet: !0
}), Lv = w({
  id: 690,
  name: "Redstone",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.redstonechain.com"],
      webSocket: ["wss://rpc.redstonechain.com"]
    }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "	https://explorer.redstone.xyz" }
  }
}), _v = /* @__PURE__ */ w({
  id: 1729,
  name: "Reya Network",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://rpc.reya.network"],
      webSocket: ["wss://ws.reya.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Reya Network Explorer",
      url: "https://explorer.reya.network"
    }
  },
  testnet: !1
}), $v = /* @__PURE__ */ w({
  id: 570,
  name: "Rollux Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.rollux.com"],
      webSocket: ["wss://rpc.rollux.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "RolluxExplorer",
      url: "https://explorer.rollux.com",
      apiUrl: "https://explorer.rollux.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 119222
    }
  }
}), Hv = /* @__PURE__ */ w({
  id: 57e3,
  name: "Rollux Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-tanenbaum.rollux.com/"],
      webSocket: ["wss://rpc-tanenbaum.rollux.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "RolluxTestnetExplorer",
      url: "https://rollux.tanenbaum.io",
      apiUrl: "https://rollux.tanenbaum.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1813675
    }
  }
}), Gv = /* @__PURE__ */ w({
  id: 2020,
  name: "Ronin",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.roninchain.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ronin Explorer",
      url: "https://app.roninchain.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 26023535
    }
  }
}), qv = /* @__PURE__ */ w({
  id: 30,
  name: "Rootstock Mainnet",
  network: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "RBTC"
  },
  rpcUrls: {
    default: { http: ["https://public-node.rsk.co"] }
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.rsk.co"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4249540
    }
  }
}), Qv = /* @__PURE__ */ w({
  id: 31,
  name: "Rootstock Testnet",
  network: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "tRBTC"
  },
  rpcUrls: {
    default: { http: ["https://public-node.testnet.rsk.co"] }
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.testnet.rootstock.io"
    }
  },
  testnet: !0
}), tr = 1, Vv = /* @__PURE__ */ w({
  ...z,
  id: 12553,
  name: "RSS3 VSL Mainnet",
  nativeCurrency: { name: "RSS3", symbol: "RSS3", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.rss3.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "RSS3 VSL Mainnet Scan",
      url: "https://scan.rss3.io",
      apiUrl: "https://scan.rss3.io/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [tr]: {
        address: "0xE6f24d2C32B3109B18ed33cF08eFb490b1e09C10"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14193
    },
    portal: {
      [tr]: {
        address: "0x6A12432491bbbE8d3babf75F759766774C778Db4",
        blockCreated: 19387057
      }
    },
    l1StandardBridge: {
      [tr]: {
        address: "0x4cbab69108Aa72151EDa5A3c164eA86845f18438"
      }
    }
  },
  sourceId: tr
}), nr = 11155111, Kv = /* @__PURE__ */ w({
  ...z,
  id: 2331,
  name: "RSS3 VSL Sepolia Testnet",
  nativeCurrency: { name: "RSS3", symbol: "RSS3", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.rss3.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "RSS3 VSL Sepolia Testnet Scan",
      url: "https://scan.testnet.rss3.io",
      apiUrl: "https://scan.testnet.rss3.io/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [nr]: {
        address: "0xDb5c46C3Eaa6Ed6aE8b2379785DF7dd029C0dC81"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 55697
    },
    portal: {
      [nr]: {
        address: "0xcBD77E8E1E7F06B25baDe67142cdE82652Da7b57",
        blockCreated: 5345035
      }
    },
    l1StandardBridge: {
      [nr]: {
        address: "0xdDD29bb63B0839FB1cE0eE439Ff027738595D07B"
      }
    }
  },
  testnet: !0,
  sourceId: nr
}), Wv = /* @__PURE__ */ w({
  id: 2021,
  name: "Saigon Testnet",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://saigon-testnet.roninchain.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Saigon Explorer",
      url: "https://saigon-app.roninchain.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 18736871
    }
  },
  testnet: !0
}), Jv = /* @__PURE__ */ w({
  id: 23294,
  name: "Oasis Sapphire",
  network: "sapphire",
  nativeCurrency: { name: "Sapphire Rose", symbol: "ROSE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sapphire.oasis.io"],
      webSocket: ["wss://sapphire.oasis.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Oasis Explorer",
      url: "https://explorer.oasis.io/mainnet/sapphire"
    },
    blockscout: {
      name: "Oasis Sapphire Explorer",
      url: "https://old-explorer.sapphire.oasis.io",
      apiUrl: "https://old-explorer.sapphire.oasis.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 734531
    }
  }
}), Zv = /* @__PURE__ */ w({
  id: 23295,
  name: "Oasis Sapphire Testnet",
  network: "sapphire-testnet",
  nativeCurrency: { name: "Sapphire Test Rose", symbol: "TEST", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.sapphire.oasis.dev"],
      webSocket: ["wss://testnet.sapphire.oasis.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Oasis Explorer",
      url: "https://explorer.oasis.io/testnet/sapphire"
    },
    blockscout: {
      name: "Oasis Sapphire Testnet Explorer",
      url: "https://testnet.old-explorer.sapphire.oasis.dev",
      apiUrl: "https://testnet.old-explorer.sapphire.oasis.dev/api"
    }
  },
  testnet: !0
}), Xv = /* @__PURE__ */ w({
  id: 3109,
  name: "SatoshiVM Alpha Mainnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://alpha-rpc-node-http.svmscan.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://svmscan.io",
      apiUrl: "https://svmscan.io/api"
    }
  }
}), Yv = /* @__PURE__ */ w({
  id: 3110,
  name: "SatoshiVM Testnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://test-rpc-node-http.svmscan.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://testnet.svmscan.io",
      apiUrl: "https://testnet.svmscan.io/api"
    }
  },
  testnet: !0
}), eC = /* @__PURE__ */ w({
  id: 534352,
  name: "Scroll",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.scroll.io"],
      webSocket: ["wss://wss-rpc.scroll.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://scrollscan.com",
      apiUrl: "https://api.scrollscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14
    }
  },
  testnet: !1
}), tC = /* @__PURE__ */ w({
  id: 534351,
  name: "Scroll Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://sepolia.scrollscan.com",
      apiUrl: "https://api-sepolia.scrollscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9473
    }
  },
  testnet: !0
}), nC = /* @__PURE__ */ w({
  id: 1329,
  name: "Sei Network",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc.sei-apis.com/"],
      webSocket: ["wss://evm-ws.sei-apis.com/"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com",
      apiUrl: "https://seitrace.com/pacific-1/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    }
  }
}), rC = /* @__PURE__ */ w({
  id: 713715,
  name: "Sei Devnet",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-arctic-1.sei-apis.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com"
    }
  },
  testnet: !0
}), sC = /* @__PURE__ */ w({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5317080
    }
  },
  testnet: !0
}), aC = /* @__PURE__ */ w({
  id: 148,
  name: "Shimmer",
  network: "shimmer",
  nativeCurrency: {
    decimals: 18,
    name: "Shimmer",
    symbol: "SMR"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.shimmer.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shimmer Network Explorer",
      url: "https://explorer.evm.shimmer.network",
      apiUrl: "https://explorer.evm.shimmer.network/api"
    }
  }
}), oC = /* @__PURE__ */ w({
  id: 1073,
  name: "Shimmer Testnet",
  network: "shimmer-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Shimmer",
    symbol: "SMR"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.testnet.shimmer.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shimmer Network Explorer",
      url: "https://explorer.evm.testnet.shimmer.network",
      apiUrl: "https://explorer.evm.testnet.shimmer.network/api"
    }
  },
  testnet: !0
}), iC = /* @__PURE__ */ w({
  id: 391845894,
  name: "SKALE | Block Brawlers",
  nativeCurrency: { name: "BRAWL", symbol: "BRAWL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/frayed-decent-antares"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/frayed-decent-antares"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://frayed-decent-antares.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
}), cC = /* @__PURE__ */ w({
  id: 1564830818,
  name: "SKALE | Calypso NFT Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"],
      webSocket: [
        "wss://mainnet.skalenodes.com/v1/ws/honorable-steel-rasalhague"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3107626
    }
  }
}), lC = /* @__PURE__ */ w({
  id: 974399131,
  name: "SKALE Calypso Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/giant-half-dual-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/giant-half-dual-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 103220
    }
  },
  testnet: !0
}), uC = /* @__PURE__ */ w({
  id: 1026062157,
  name: "SKALE | CryptoBlades",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux"],
      webSocket: [
        "wss://mainnet.skalenodes.com/v1/ws/affectionate-immediate-pollux"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
}), dC = /* @__PURE__ */ w({
  id: 1032942172,
  name: "SKALE | Crypto Colosseum",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/haunting-devoted-deneb"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/haunting-devoted-deneb"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
}), pC = /* @__PURE__ */ w({
  id: 2046399126,
  name: "SKALE | Europa Liquidity Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/elated-tan-skat"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/elated-tan-skat"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://elated-tan-skat.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3113495
    }
  }
}), fC = /* @__PURE__ */ w({
  id: 1444673419,
  name: "SKALE Europa Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/juicy-low-small-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/juicy-low-small-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://juicy-low-small-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 110858
    }
  },
  testnet: !0
}), hC = /* @__PURE__ */ w({
  id: 2139927552,
  name: "SKALE | Exorde",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/light-vast-diphda"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/light-vast-diphda"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://light-vast-diphda.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
}), mC = /* @__PURE__ */ w({
  id: 1273227453,
  name: "SKALE | Human Protocol",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/wan-red-ain"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/wan-red-ain"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://wan-red-ain.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
}), bC = /* @__PURE__ */ w({
  id: 1482601649,
  name: "SKALE | Nebula Gaming Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/green-giddy-denebola"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://green-giddy-denebola.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2372986
    }
  }
}), yC = /* @__PURE__ */ w({
  id: 37084624,
  name: "SKALE Nebula Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/lanky-ill-funny-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 105141
    }
  },
  testnet: !0
}), wC = /* @__PURE__ */ w({
  id: 278611351,
  name: "SKALE | Razor Network",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/turbulent-unique-scheat"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/turbulent-unique-scheat"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
}), gC = /* @__PURE__ */ w({
  id: 1350216234,
  name: "SKALE | Titan Community Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/parallel-stormy-spica"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/parallel-stormy-spica"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://parallel-stormy-spica.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2076458
    }
  }
}), vC = /* @__PURE__ */ w({
  id: 1020352220,
  name: "SKALE Titan Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/aware-fake-trim-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/aware-fake-trim-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://aware-fake-trim-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 104072
    }
  },
  testnet: !0
}), CC = /* @__PURE__ */ w({
  id: 19,
  name: "Songbird Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "songbird",
    symbol: "SGB"
  },
  rpcUrls: {
    default: { http: ["https://songbird-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Songbird Explorer",
      url: "https://songbird-explorer.flare.network",
      apiUrl: "https://songbird-explorer.flare.network/api"
    }
  }
}), xC = /* @__PURE__ */ w({
  id: 16,
  name: "Coston",
  nativeCurrency: {
    decimals: 18,
    name: "costonflare",
    symbol: "CFLR"
  },
  rpcUrls: {
    default: { http: ["https://coston-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Coston Explorer",
      url: "https://coston-explorer.flare.network",
      apiUrl: "https://coston-explorer.flare.network/api"
    }
  },
  testnet: !0
}), AC = /* @__PURE__ */ w({
  id: 88882,
  name: "Chiliz Spicy Testnet",
  network: "chiliz-spicy-Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ"
  },
  rpcUrls: {
    default: {
      http: [
        "https://spicy-rpc.chiliz.com",
        "https://chiliz-spicy-rpc.publicnode.com"
      ],
      webSocket: [
        "wss://spicy-rpc-ws.chiliz.com",
        "wss://chiliz-spicy-rpc.publicnode.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "http://spicy-explorer.chiliz.com",
      apiUrl: "http://spicy-explorer.chiliz.com/api"
    }
  },
  testnet: !0
}), kC = /* @__PURE__ */ w({
  id: 8082,
  name: "Shardeum Sphinx",
  nativeCurrency: { name: "SHARDEUM", symbol: "SHM", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sphinx.shardeum.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shardeum Explorer",
      url: "https://explorer-sphinx.shardeum.org"
    }
  },
  testnet: !0
}), EC = /* @__PURE__ */ w({
  id: 109,
  name: "Shibarium",
  network: "shibarium",
  nativeCurrency: { name: "Bone", symbol: "BONE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.shibrpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://shibariumscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0x864Bf681ADD6052395188A89101A1B37d3B4C961",
      blockCreated: 265900
    }
  }
}), IC = /* @__PURE__ */ w({
  id: 105105,
  name: "Stratis Mainnet",
  network: "stratis",
  nativeCurrency: {
    name: "Stratis",
    symbol: "STRAX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.stratisevm.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Stratis Explorer",
      url: "https://explorer.stratisevm.com"
    }
  }
}), SC = /* @__PURE__ */ w({
  id: 57,
  name: "Syscoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.syscoin.org"],
      webSocket: ["wss://rpc.syscoin.org/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "SyscoinExplorer",
      url: "https://explorer.syscoin.org",
      apiUrl: "https://explorer.syscoin.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 287139
    }
  }
}), TC = /* @__PURE__ */ w({
  id: 5700,
  name: "Syscoin Tanenbaum Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tanenbaum.io"],
      webSocket: ["wss://rpc.tanenbaum.io/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "SyscoinTestnetExplorer",
      url: "https://tanenbaum.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 271288
    }
  }
}), PC = /* @__PURE__ */ w({
  id: 841,
  name: "Taraxa Mainnet",
  nativeCurrency: { name: "Tara", symbol: "TARA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.taraxa.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taraxa Explorer",
      url: "https://explorer.mainnet.taraxa.io"
    }
  }
}), BC = /* @__PURE__ */ w({
  id: 167e3,
  name: "Taiko Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.taiko.xyz"],
      webSocket: ["wss://ws.mainnet.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taikoscan",
      url: "https://taikoscan.network",
      apiUrl: "https://taikoscan.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcb2436774C3e191c85056d248EF4260ce5f27A9D"
    }
  }
}), UC = /* @__PURE__ */ w({
  id: 167009,
  name: "Taiko Hekla L2",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.hekla.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taikoscan",
      url: "https://hekla.taikoscan.network"
    }
  }
}), MC = /* @__PURE__ */ w({
  id: 167007,
  name: "Taiko Jolnir (Alpha-5 Testnet)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.jolnir.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.jolnir.taiko.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 732706
    }
  },
  testnet: !0
}), FC = /* @__PURE__ */ w({
  id: 167008,
  name: "Taiko Katla (Alpha-6 Testnet)",
  network: "tko-katla",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.katla.taiko.xyz"]
    },
    public: {
      http: ["https://rpc.katla.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.katla.taiko.xyz"
    }
  }
}), NC = /* @__PURE__ */ w({
  id: 167005,
  name: "Taiko (Alpha-3 Testnet)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.test.taiko.xyz"
    }
  }
}), DC = /* @__PURE__ */ w({
  id: 842,
  name: "Taraxa Testnet",
  nativeCurrency: { name: "Tara", symbol: "TARA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.taraxa.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taraxa Explorer",
      url: "https://explorer.testnet.taraxa.io"
    }
  },
  testnet: !0
}), OC = /* @__PURE__ */ w({
  id: 2017,
  name: "Telcoin Adiri Testnet",
  nativeCurrency: { name: "Telcoin", symbol: "TEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.telcoin.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "telscan",
      url: "https://telscan.io"
    }
  },
  testnet: !0
}), RC = /* @__PURE__ */ w({
  id: 40,
  name: "Telos",
  nativeCurrency: {
    decimals: 18,
    name: "Telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.telos.net/evm"] }
  },
  blockExplorers: {
    default: {
      name: "Teloscan",
      url: "https://www.teloscan.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 246530709
    }
  }
}), zC = /* @__PURE__ */ w({
  id: 41,
  name: "Telos",
  nativeCurrency: {
    decimals: 18,
    name: "Telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    default: { http: ["https://testnet.telos.net/evm"] }
  },
  blockExplorers: {
    default: {
      name: "Teloscan (testnet)",
      url: "https://testnet.teloscan.io/"
    }
  },
  testnet: !0
}), jC = /* @__PURE__ */ w({
  id: 1559,
  name: "Tenet",
  network: "tenet-mainnet",
  nativeCurrency: {
    name: "TENET",
    symbol: "TENET",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.tenet.org"] }
  },
  blockExplorers: {
    default: {
      name: "TenetScan Mainnet",
      url: "https://tenetscan.io",
      apiUrl: "https://tenetscan.io/api"
    }
  },
  testnet: !1
}), LC = /* @__PURE__ */ w({
  id: 7,
  name: "ThaiChain",
  nativeCurrency: { name: "TCH", symbol: "TCH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.thaichain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp.thaichain.org",
      apiUrl: "https://exp.thaichain.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0DaD6130e832c21719C5CE3bae93454E16A84826",
      blockCreated: 4806386
    }
  },
  testnet: !1
}), _C = /* @__PURE__ */ w({
  id: 997,
  name: "5ireChain Thunder Testnet",
  nativeCurrency: { name: "5ire Token", symbol: "5IRE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.5ire.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "5ireChain Explorer",
      url: "https://explorer.5ire.network"
    }
  },
  testnet: !0
}), $C = /* @__PURE__ */ w({
  id: 100009,
  name: "Vechain",
  nativeCurrency: { name: "VeChain", symbol: "VET", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.vechain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vechain Explorer",
      url: "https://explore.vechain.org"
    },
    vechainStats: {
      name: "Vechain Stats",
      url: "https://vechainstats.com"
    }
  }
}), HC = /* @__PURE__ */ w({
  id: 888,
  name: "Wanchain",
  nativeCurrency: { name: "WANCHAIN", symbol: "WAN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://gwan-ssl.wandevs.org:56891",
        "https://gwan2-ssl.wandevs.org"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "WanScan",
      url: "https://wanscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB",
      blockCreated: 25312390
    }
  }
}), GC = /* @__PURE__ */ w({
  id: 999,
  name: "Wanchain Testnet",
  nativeCurrency: { name: "WANCHAIN", symbol: "WANt", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://gwan-ssl.wandevs.org:46891"]
    }
  },
  blockExplorers: {
    default: {
      name: "WanScanTest",
      url: "https://wanscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0x11c89bF4496c39FB80535Ffb4c92715839CC5324",
      blockCreated: 24743448
    }
  },
  testnet: !0
}), qC = /* @__PURE__ */ w({
  id: 1111,
  name: "WEMIX",
  network: "wemix-mainnet",
  nativeCurrency: { name: "WEMIX", symbol: "WEMIX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.wemix.com"] },
    public: { http: ["https://api.wemix.com"] }
  },
  blockExplorers: {
    default: {
      name: "wemixExplorer",
      url: "https://explorer.wemix.com"
    }
  }
}), QC = /* @__PURE__ */ w({
  id: 1112,
  name: "WEMIX Testnet",
  network: "wemix-testnet",
  nativeCurrency: { name: "WEMIX", symbol: "tWEMIX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.test.wemix.com"] },
    public: { http: ["https://api.test.wemix.com"] }
  },
  blockExplorers: {
    default: {
      name: "wemixExplorer",
      url: "https://testnet.wemixscan.com",
      apiUrl: "https://testnet.wemixscan.com/api"
    }
  },
  testnet: !0
}), Ui = /* @__PURE__ */ w({
  id: 195,
  name: "X1 Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: { http: ["https://x1testrpc.okx.com"] }
  },
  blockExplorers: {
    default: {
      name: "OKLink",
      url: "https://www.oklink.com/x1-test"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 624344
    }
  },
  testnet: !0
}), VC = /* @__PURE__ */ w({
  id: 196,
  name: "X Layer Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: { http: ["https://rpc.xlayer.tech"] }
  },
  blockExplorers: {
    default: {
      name: "OKLink",
      url: "https://www.oklink.com/xlayer"
    }
  }
}), KC = /* @__PURE__ */ w({
  id: 660279,
  name: "Xai Mainnet",
  nativeCurrency: { name: "Xai", symbol: "XAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://xai-chain.net/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.xai-chain.net"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 222549
    }
  },
  testnet: !1
}), WC = /* @__PURE__ */ w({
  id: 37714555429,
  name: "Xai Testnet",
  nativeCurrency: { name: "sXai", symbol: "sXAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-v2.xai-chain.net/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer-v2.xai-chain.net"
    }
  },
  testnet: !0
}), JC = /* @__PURE__ */ w({
  id: 50,
  name: "XinFin Network",
  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC"
  },
  rpcUrls: {
    default: { http: ["https://rpc.xinfin.network"] }
  },
  blockExplorers: {
    xinfin: {
      name: "XinFin",
      url: "https://explorer.xinfin.network"
    },
    default: {
      name: "Blocksscan",
      url: "https://xdc.blocksscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 71542788
    }
  }
}), ZC = /* @__PURE__ */ w({
  id: 51,
  name: "Apothem Network",
  nativeCurrency: {
    decimals: 18,
    name: "TXDC",
    symbol: "TXDC"
  },
  rpcUrls: {
    default: { http: ["https://erpc.apothem.network"] }
  },
  blockExplorers: {
    default: {
      name: "Blocksscan",
      url: "https://apothem.blocksscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 59765389
    }
  }
}), XC = /* @__PURE__ */ w({
  id: 50005,
  name: "Yooldo Verse",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.yooldo-verse.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Yooldo Verse Explorer",
      url: "https://explorer.yooldo-verse.xyz"
    }
  }
}), YC = /* @__PURE__ */ w({
  id: 50006,
  name: "Yooldo Verse Testnet",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.yooldo-verse.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Yooldo Verse Testnet Explorer",
      url: "https://explorer.testnet.yooldo-verse.xyz"
    }
  },
  testnet: !0
}), e2 = /* @__PURE__ */ w({
  id: 7e3,
  name: "ZetaChain",
  nativeCurrency: {
    decimals: 18,
    name: "Zeta",
    symbol: "ZETA"
  },
  rpcUrls: {
    default: {
      http: ["https://zetachain-evm.blockpi.network/v1/rpc/public"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1632781
    }
  },
  blockExplorers: {
    default: {
      name: "ZetaScan",
      url: "https://explorer.zetachain.com"
    }
  },
  testnet: !1
}), t2 = /* @__PURE__ */ w({
  id: 7001,
  name: "ZetaChain Athens Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zeta",
    symbol: "aZETA"
  },
  rpcUrls: {
    default: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2715217
    }
  },
  blockExplorers: {
    default: {
      name: "ZetaScan",
      url: "https://athens.explorer.zetachain.com"
    }
  },
  testnet: !0
}), n2 = /* @__PURE__ */ w({
  id: 1337803,
  name: "Zhejiang",
  nativeCurrency: { name: "Zhejiang Ether", symbol: "ZhejETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.zhejiang.ethpandaops.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beaconchain",
      url: "https://zhejiang.beaconcha.in"
    }
  },
  testnet: !0
}), r2 = /* @__PURE__ */ w({
  id: 32769,
  name: "Zilliqa",
  network: "zilliqa",
  nativeCurrency: { name: "Zilliqa", symbol: "ZIL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.zilliqa.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://evmx.zilliqa.com"
    }
  },
  testnet: !1
}), s2 = /* @__PURE__ */ w({
  id: 33101,
  name: "Zilliqa Testnet",
  network: "zilliqa-testnet",
  nativeCurrency: { name: "Zilliqa", symbol: "ZIL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dev-api.zilliqa.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://evmx.testnet.zilliqa.com"
    }
  },
  testnet: !0
}), a2 = /* @__PURE__ */ w({
  id: 42766,
  name: "ZKFair Mainnet",
  network: "zkfair-mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.zkfair.io"]
    },
    public: {
      http: ["https://rpc.zkfair.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkFair Explorer",
      url: "https://scan.zkfair.io",
      apiUrl: "https://scan.zkfair.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6090959
    }
  },
  testnet: !1
}), o2 = /* @__PURE__ */ w({
  id: 43851,
  name: "ZKFair Testnet",
  network: "zkfair-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.zkfair.io"]
    },
    public: {
      http: ["https://testnet-rpc.zkfair.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkFair Explorer",
      url: "https://testnet-scan.zkfair.io"
    }
  },
  testnet: !0
}), i2 = /* @__PURE__ */ w({
  ...pt,
  id: 324,
  name: "zkSync Era",
  network: "zksync-era",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.era.zksync.io"],
      webSocket: ["wss://mainnet.era.zksync.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://era.zksync.network/",
      apiUrl: "https://api-era.zksync.network/api"
    },
    native: {
      name: "zkSync Explorer",
      url: "https://explorer.zksync.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    }
  }
}), c2 = /* @__PURE__ */ w({
  ...pt,
  id: 260,
  name: "zkSync InMemory Node",
  network: "zksync-in-memory-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:8011"]
    }
  },
  testnet: !0
}), l2 = /* @__PURE__ */ w({
  ...pt,
  id: 270,
  name: "zkSync CLI Local Node",
  network: "zksync-cli-local-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:3050"]
    }
  },
  testnet: !0
}), u2 = /* @__PURE__ */ w({
  ...pt,
  id: 300,
  name: "zkSync Sepolia Testnet",
  network: "zksync-sepolia-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.era.zksync.dev"],
      webSocket: ["wss://sepolia.era.zksync.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia-era.zksync.network/"
    },
    native: {
      name: "zkSync Explorer",
      url: "https://sepolia.explorer.zksync.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    }
  },
  testnet: !0
}), d2 = /* @__PURE__ */ w({
  ...pt,
  id: 280,
  name: "zkSync Era Testnet",
  network: "zksync-era-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.era.zksync.dev"],
      webSocket: ["wss://testnet.era.zksync.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkExplorer",
      url: "https://goerli.explorer.zksync.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    }
  },
  testnet: !0
}), rr = 1, p2 = /* @__PURE__ */ w({
  ...z,
  id: 7777777,
  name: "Zora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.zora.energy"],
      webSocket: ["wss://rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.zora.energy",
      apiUrl: "https://explorer.zora.energy/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [rr]: {
        address: "0x9E6204F750cD866b299594e2aC9eA824E2e5f95c"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 5882
    },
    portal: {
      [rr]: {
        address: "0x1a0ad011913A150f69f6A19DF447A0CfD9551054"
      }
    },
    l1StandardBridge: {
      [rr]: {
        address: "0x3e2Ea9B92B7E48A52296fD261dc26fd995284631"
      }
    }
  },
  sourceId: rr
}), sr = 11155111, f2 = /* @__PURE__ */ w({
  ...z,
  id: 999999999,
  name: "Zora Sepolia",
  network: "zora-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Sepolia",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.rpc.zora.energy"],
      webSocket: ["wss://sepolia.rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Zora Sepolia Explorer",
      url: "https://sepolia.explorer.zora.energy/",
      apiUrl: "https://sepolia.explorer.zora.energy/api"
    }
  },
  contracts: {
    ...z.contracts,
    l2OutputOracle: {
      [sr]: {
        address: "0x2615B481Bd3E5A1C0C7Ca3Da1bdc663E8615Ade9"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 83160
    },
    portal: {
      [sr]: {
        address: "0xeffE2C6cA9Ab797D418f0D91eA60807713f3536f"
      }
    },
    l1StandardBridge: {
      [sr]: {
        address: "0x5376f1D543dcbB5BD416c56C189e4cB7399fCcCB"
      }
    }
  },
  sourceId: sr,
  testnet: !0
}), Mi = 5, h2 = /* @__PURE__ */ w({
  ...z,
  id: 999,
  name: "Zora Goerli Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Goerli",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.zora.energy"],
      webSocket: ["wss://testnet.rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.explorer.zora.energy",
      apiUrl: "https://testnet.explorer.zora.energy/api"
    }
  },
  contracts: {
    ...z.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 189123
    },
    portal: {
      [Mi]: {
        address: "0xDb9F51790365e7dc196e7D072728df39Be958ACe"
      }
    }
  },
  sourceId: Mi,
  testnet: !0
}), m2 = /* @__PURE__ */ w({
  id: 48899,
  name: "Zircuit Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://zircuit1.p2pify.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Zircuit Explorer",
      url: "https://explorer.zircuit.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 6040287
    }
  }
}), DA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  acala: Ay,
  ancient8: By,
  ancient8Sepolia: Uy,
  anvil: My,
  apexTestnet: Fy,
  arbitrum: Ny,
  arbitrumGoerli: Dy,
  arbitrumNova: Oy,
  arbitrumSepolia: Ly,
  areonNetwork: _y,
  areonNetworkTestnet: $y,
  astar: Ry,
  astarZkEVM: zy,
  astarZkyoto: jy,
  aurora: Hy,
  auroraTestnet: Gy,
  auroria: qy,
  avalanche: Qy,
  avalancheFuji: Vy,
  bahamut: Ky,
  base: Wy,
  baseGoerli: Jy,
  baseSepolia: Zy,
  beam: Xy,
  beamTestnet: Yy,
  bearNetworkChainMainnet: e1,
  bearNetworkChainTestnet: t1,
  berachainTestnet: n1,
  berachainTestnetbArtio: r1,
  bevmMainnet: s1,
  bitTorrent: i1,
  bitTorrentTestnet: c1,
  bitkub: a1,
  bitkubTestnet: o1,
  blast: u1,
  blastSepolia: p1,
  bob: f1,
  boba: h1,
  bronos: m1,
  bronosTestnet: b1,
  bsc: y1,
  bscGreenfield: g1,
  bscTestnet: w1,
  btr: v1,
  btrTestnet: C1,
  bxn: x1,
  bxnTestnet: A1,
  canto: k1,
  celo: D1,
  celoAlfajores: O1,
  chiliz: R1,
  classic: z1,
  confluxESpace: j1,
  confluxESpaceTestnet: L1,
  coreDao: _1,
  cronos: $1,
  cronosTestnet: H1,
  crossbell: G1,
  cyber: q1,
  cyberTestnet: Q1,
  darwinia: V1,
  dchain: K1,
  dchainTestnet: W1,
  defichainEvm: J1,
  defichainEvmTestnet: Z1,
  degen: X1,
  dfk: Y1,
  dodochainTestnet: ew,
  dogechain: tw,
  dreyerxMainnet: nw,
  edgeless: rw,
  edgelessTestnet: sw,
  edgeware: aw,
  edgewareTestnet: ow,
  ekta: fw,
  ektaTestnet: hw,
  eon: iw,
  eos: cw,
  eosTestnet: lw,
  etherlinkTestnet: uw,
  evmos: dw,
  evmosTestnet: pw,
  fantom: mw,
  fantomSonicTestnet: bw,
  fantomTestnet: yw,
  fibo: ww,
  filecoin: gw,
  filecoinCalibration: vw,
  filecoinHyperspace: Cw,
  flare: xw,
  flareTestnet: Aw,
  flowMainnet: Ew,
  flowPreviewnet: kw,
  flowTestnet: Iw,
  foundry: Sw,
  fraxtal: Tw,
  fraxtalTestnet: Pw,
  funkiSepolia: Uw,
  fuse: Mw,
  fuseSparknet: Fw,
  gnosis: _w,
  gnosisChiado: $w,
  gobi: jw,
  goerli: Lw,
  ham: Hw,
  haqqMainnet: Qw,
  haqqTestedge2: Vw,
  hardhat: Gw,
  harmonyOne: qw,
  hedera: Kw,
  hederaPreviewnet: Jw,
  hederaTestnet: Ww,
  holesky: Zw,
  immutableZkEvm: Xw,
  immutableZkEvmTestnet: Yw,
  inEVM: eg,
  iotex: Nw,
  iotexTestnet: Dw,
  jbc: Ow,
  jbcTestnet: Rw,
  kakarotSepolia: tg,
  karura: zw,
  kava: ng,
  kavaTestnet: rg,
  kcc: sg,
  klaytn: ag,
  klaytnBaobab: og,
  kroma: ig,
  kromaSepolia: cg,
  l3x: lg,
  l3xTestnet: ug,
  lightlinkPegasus: dg,
  lightlinkPhoenix: pg,
  linea: fg,
  lineaGoerli: hg,
  lineaSepolia: mg,
  lineaTestnet: bg,
  lisk: Sg,
  liskSepolia: Tg,
  localhost: Pg,
  lukso: Bg,
  luksoTestnet: Ug,
  lycan: Mg,
  mainnet: dr,
  mandala: Fg,
  manta: Ng,
  mantaSepoliaTestnet: Dg,
  mantaTestnet: Og,
  mantle: Rg,
  mantleSepoliaTestnet: zg,
  mantleTestnet: jg,
  merlin: Lg,
  metachain: _g,
  metachainIstanbul: $g,
  metalL2: Hg,
  meter: Gg,
  meterTestnet: qg,
  metis: Qg,
  metisGoerli: Vg,
  mev: Kg,
  mevTestnet: Wg,
  mintSepoliaTestnet: Jg,
  mode: Zg,
  modeTestnet: Yg,
  moonbaseAlpha: ev,
  moonbeam: tv,
  moonbeamDev: nv,
  moonriver: rv,
  morphSepolia: sv,
  nautilus: av,
  neonDevnet: ov,
  neonMainnet: iv,
  nexi: cv,
  nexilix: lv,
  oasisTestnet: dv,
  oasys: uv,
  okc: pv,
  oortMainnetDev: wv,
  opBNB: bv,
  opBNBTestnet: yv,
  optimism: fv,
  optimismGoerli: hv,
  optimismSepolia: mv,
  otimDevnet: gv,
  palm: vv,
  palmTestnet: Cv,
  pgn: Av,
  pgnTestnet: kv,
  phoenix: Ev,
  playfiAlbireo: xv,
  plinga: Iv,
  plumeTestnet: Tv,
  polygon: Pv,
  polygonAmoy: Bv,
  polygonMumbai: Uv,
  polygonZkEvm: Mv,
  polygonZkEvmCardona: Fv,
  polygonZkEvmTestnet: Nv,
  pulsechain: Dv,
  pulsechainV4: Ov,
  qMainnet: Rv,
  qTestnet: zv,
  redbellyTestnet: jv,
  redstone: Lv,
  reyaNetwork: _v,
  rollux: $v,
  rolluxTestnet: Hv,
  ronin: Gv,
  rootstock: qv,
  rootstockTestnet: Qv,
  rss3: Vv,
  rss3Sepolia: Kv,
  saigon: Wv,
  sapphire: Jv,
  sapphireTestnet: Zv,
  satoshiVM: Xv,
  satoshiVMTestnet: Yv,
  scroll: eC,
  scrollSepolia: tC,
  sei: nC,
  seiDevnet: rC,
  sepolia: sC,
  shardeumSphinx: kC,
  shibarium: EC,
  shimmer: aC,
  shimmerTestnet: oC,
  skaleBlockBrawlers: iC,
  skaleCalypso: cC,
  skaleCalypsoTestnet: lC,
  skaleCryptoBlades: uC,
  skaleCryptoColosseum: dC,
  skaleEuropa: pC,
  skaleEuropaTestnet: fC,
  skaleExorde: hC,
  skaleHumanProtocol: mC,
  skaleNebula: bC,
  skaleNebulaTestnet: yC,
  skaleRazor: wC,
  skaleTitan: gC,
  skaleTitanTestnet: vC,
  songbird: CC,
  songbirdTestnet: xC,
  spicy: AC,
  stratis: IC,
  syscoin: SC,
  syscoinTestnet: TC,
  taiko: BC,
  taikoHekla: UC,
  taikoJolnir: MC,
  taikoKatla: FC,
  taikoTestnetSepolia: NC,
  taraxa: PC,
  taraxaTestnet: DC,
  telcoinTestnet: OC,
  telos: RC,
  telosTestnet: zC,
  tenet: jC,
  thaiChain: LC,
  thunderTestnet: _C,
  vechain: $C,
  wanchain: HC,
  wanchainTestnet: GC,
  wemix: qC,
  wemixTestnet: QC,
  x1Testnet: Ui,
  xLayer: VC,
  xLayerTestnet: Ui,
  xai: KC,
  xaiTestnet: WC,
  xdc: JC,
  xdcTestnet: ZC,
  yooldoVerse: XC,
  yooldoVerseTestnet: YC,
  zetachain: e2,
  zetachainAthensTestnet: t2,
  zhejiang: n2,
  zilliqa: r2,
  zilliqaTestnet: s2,
  zircuitTestnet: m2,
  zkFair: a2,
  zkFairTestnet: o2,
  zkSync: i2,
  zkSyncInMemoryNode: c2,
  zkSyncLocalNode: l2,
  zkSyncSepoliaTestnet: u2,
  zkSyncTestnet: d2,
  zora: p2,
  zoraSepolia: f2,
  zoraTestnet: h2
}, Symbol.toStringTag, { value: "Module" }));
function b2(e) {
  if (e)
    return {
      id: `${_.EIP155}:${e.id}`,
      name: e.name,
      imageId: Ie.EIP155NetworkImageIds[e.id]
    };
}
async function y2(e) {
  var a, o, i, c;
  if (!e)
    throw new Error("networkControllerClient:getApprovedCaipNetworks - connector is undefined");
  const t = await (e == null ? void 0 : e.getProvider()), n = (o = (a = t == null ? void 0 : t.signer) == null ? void 0 : a.session) == null ? void 0 : o.namespaces, r = (i = n == null ? void 0 : n[_.EIP155]) == null ? void 0 : i.methods, s = (c = n == null ? void 0 : n[_.EIP155]) == null ? void 0 : c.chains;
  return {
    supportsAllNetworks: !!(r != null && r.includes(_.ADD_CHAIN_METHOD)),
    approvedCaipNetworkIds: s
  };
}
function w2() {
  return {
    supportsAllNetworks: !1,
    approvedCaipNetworkIds: Ie.WalletConnectRpcChainIds.map((e) => `${_.EIP155}:${e}`)
  };
}
function g2({ chain: e, projectId: t }) {
  var s, a;
  const n = Td.getBlockchainApiUrl(), r = (a = (s = e.rpcUrls[0]) == null ? void 0 : s.http) == null ? void 0 : a[0];
  return Ie.WalletConnectRpcChainIds.includes(e.id) ? Oo([
    Xt(`${n}/v1/?chainId=${_.EIP155}:${e.id}&projectId=${t}`),
    Xt(r)
  ]) : Xt(r);
}
var v2 = "AEEUdwmgDS8BxQKKAP4BOgDjATAAngDUAIMAoABoAOAAagCOAEQAhABMAHIAOwA9ACsANgAmAGIAHgAuACgAJwAXAC0AGgAjAB8ALwAUACkAEgAeAAkAGwARABkAFgA5ACgALQArADcAFQApABAAHgAiABAAGgAeABMAGAUhBe8BFxREN8sF2wC5AK5HAW8ArQkDzQCuhzc3NzcBP68NEfMABQdHBuw5BV8FYAA9MzkI9r4ZBg7QyQAWA9CeOwLNCjcCjqkChuA/lm+RAsXTAoP6ASfnEQDytQFJAjWVCkeXAOsA6godAB/cwdAUE0WlBCN/AQUCQRjFD/MRBjHxDQSJbw0jBzUAswBxme+tnIcAYwabAysG8QAjAEMMmxcDqgPKQyDXCMMxA7kUQwD3NXOrAKmFIAAfBC0D3x4BJQDBGdUFAhEgVD8JnwmQJiNWYUzrg0oAGwAUAB0AFnNcACkAFgBP9h3gPfsDOWDKneY2ChglX1UDYD30ABsAFAAdABZzIGRAnwDD8wAjAEEMzRbDqgMB2sAFYwXqAtCnAsS4AwpUJKRtFHsadUz9AMMVbwLpABM1NJEX0ZkCgYMBEyMAxRVvAukAEzUBUFAtmUwSAy4DBTER33EftQHfSwB5MxJ/AjkWKQLzL8E/cwBB6QH9LQDPDtO9ASNriQC5DQANAwCK21EFI91zHwCoL9kBqQcHBwcHKzUDowBvAQohPvU3fAQgHwCyAc8CKQMA5zMSezr7ULgFmDp/LzVQBgEGAi8FYQVgt8AFcTtlQhpCWEmfe5tmZ6IAExsDzQ8t+X8rBKtTAltbAn0jsy8Bl6utPWMDTR8Ei2kRANkDBrNHNysDBzECQWUAcwFpJ3kAiyUhAJ0BUb8AL3EfAbfNAz81KUsFWwF3YQZtAm0A+VEfAzEJDQBRSQCzAQBlAHsAM70GD/v3IZWHBwARKQAxALsjTwHZAeMPEzmXgIHwABIAGQA8AEUAQDt3gdvIEGcQZAkGTRFMdEIVEwK0D64L7REdDNkq09PgADSxB/MDWwfzA1sDWwfzB/MDWwfzA1sDWwNbA1scEvAi28gQZw9QBHUFlgWTBN4IiyZREYkHMAjaVBV0JhxPA00BBCMtSSQ7mzMTJUpMFE0LCAQ2SmyvfUADTzGzVP2QqgPTMlc5dAkGHnkSqAAyD3skNb1OhnpPcagKU0+2tYdJak5vAsY6sEAACikJm2/Dd1YGRRAfJ6kQ+ww3AbkBPw3xS9wE9QY/BM0fgRkdD9GVoAipLeEM8SbnLqWAXiP5KocF8Uv4POELUVFsD10LaQnnOmeBUgMlAREijwrhDT0IcRD3Cs1vDekRSQc9A9lJngCpBwULFR05FbkmFGKwCw05ewb/GvoLkyazEy17AAXXGiUGUQEtGwMA0y7rhbRaNVwgT2MGBwspI8sUrFAkDSlAu3hMGh8HGSWtApVDdEqLUToelyH6PEENai4XUYAH+TwJGVMLhTyiRq9FEhHWPpE9TCJNTDAEOYMsMyePCdMPiQy9fHYBXQklCbUMdRM1ERs3yQg9Bx0xlygnGQglRplgngT7owP3E9UDDwVDCUUHFwO5HDETMhUtBRGBKNsC9zbZLrcCk1aEARsFzw8pH+MQVEfkDu0InwJpA4cl7wAxFSUAGyKfCEdnAGOP3FMJLs8Iy2pwI3gDaxTrZRF3B5UOWwerHDcVwxzlcMxeD4YMKKezCV8BeQmdAWME5wgNNV+MpCBFZ1eLXBifIGVBQ14AAjUMaRWjRMGHfAKPD28SHwE5AXcHPQ0FAnsR8RFvEJkI74YINbkz/DopBFMhhyAVCisDU2zSCysm/Qz8bQGnEmYDEDRBd/Jnr2C6KBgBBx0yyUFkIfULlk/RDKAaxRhGVDIZ6AfDA/ca9yfuQVsGAwOnBxc6UTPyBMELbQiPCUMATQ6nGwfbGG4KdYzUATWPAbudA1uVhwJzkwY7Bw8Aaw+LBX3pACECqwinAAkA0wNbAD0CsQehAB0AiUUBQQMrMwEl6QKTA5cINc8BmTMB9y0EH8cMGQD7O25OAsO1AoBuZqYF4VwCkgJNOQFRKQQJUktVA7N15QDfAE8GF+NLARmvTs8e50cB43MvAMsA/wAJOQcJRQHRAfdxALsBYws1Caa3uQFR7S0AhwAZbwHbAo0A4QA5AIP1AVcAUQVd/QXXAlNNARU1HC9bZQG/AyMBNwERAH0Gz5GpzQsjBHEH1wIQHxXlAu8yB7kFAyLjE9FCyQK94lkAMhoKPAqrCqpgX2Q3CjV2PVQAEh+sPss/UgVVO1c7XDtXO1w7VztcO1c7XDtXO1wDm8Pmw+YKcF9JYe8Mqg3YRMw6TRPfYFVgNhPMLbsUxRXSJVoZQRrAJwkl6FUNDwgt12Y0CDA0eRfAAEMpbINFY4oeNApPHOtTlVT8LR8AtUumM7MNsBsZREQFS3XxYi4WEgomAmSFAmJGX1GzAV83JAKh+wJonAJmDQKfiDgfDwJmPwJmKgRyBIMDfxcDfpY5Cjl7GzmGOicnAmwhAjI6OA4CbcsCbbLzjgM3a0kvAWsA4gDlAE4JB5wMkQECD8YAEbkCdzMCdqZDAnlPRwJ4viFg30WyRvcCfEMCeswCfQ0CfPRIBEiBZygALxlJXEpfGRtK0ALRBQLQ0EsrA4hTA4fqRMmRNgLypV0HAwOyS9JMMSkH001QTbMCi0MCitzFHwshR2sJuwKOOwKOYESbhQKO3QKOYHxRuFM5AQ5S2FSJApP/ApMQAO0AIFUiVbNV1AosHymZijLleGpFPz0Cl6MC77ZYJawAXSkClpMCloCgAK1ZsFoNhVEAPwKWuQKWUlxIXNUCmc8CmWhczl0LHQKcnznGOqECnBoCn58CnryOACETNS4TAp31Ap6WALlBYThh8wKe1wKgcgGtAp6jIwKeUqljzGQrKS8CJ7MCJoICoP8CoFDbAqYzAqXSAqgDAIECp/ZogGi1AAdNaiBq1QKs5wKssgKtawKtBgJXIQJV4AKx5dsDH1JsmwKywRECsuwbbORtZ21MYwMl0QK2YD9DbpQDKUkCuGICuUsZArkue3A6cOUCvR0DLbYDMhUCvoxyBgMzdQK+HnMmc1MCw88CwwhzhnRPOUl05AM8qwEDPJ4DPcMCxYACxksCxhSNAshtVQLISALJUwLJMgJkoQLd1nh9ZXiyeSlL1AMYp2cGAmH4GfeVKHsPXpZevxUCz28Cz3AzT1fW9xejAMqxAs93AS3uA04Wfk8JAtwrAtuOAtJTA1JgA1NjAQUDVZCAjUMEzxrxZEl5A4LSg5EC2ssC2eKEFIRNp0ADhqkAMwNkEoZ1Xf0AWQLfaQLevHd7AuIz7RgB8zQrAfSfAfLWiwLr9wLpdH0DAur9AuroAP1LAb0C7o0C66CWrpcHAu5DA4XkmH1w5HGlAvMHAG0DjhqZlwL3FwORcgOSiwL3nAL53QL4apogmq+/O5siA52HAv7+AR8APZ8gAZ+3AwWRA6ZuA6bdANXJAwZuoYyiCQ0DDE0BEwEjB3EGZb1rCQC/BG/DFY8etxEAG3k9ACcDNxJRA42DAWcrJQCM8wAlAOanC6OVCLsGI6fJBgCvBRnDBvElRUYFFoAFcD9GSDNCKUK8X3kZX8QAls0FOgCQVCGbwTsuYDoZutcONxjOGJHJ/gVfBWAFXwVgBWsFYAVfBWAFXwVgBV8FYAVfBWBOHQjfjW8KCgoKbF7xMwTRA7kGN8PDAMMEr8MA70gxFroFTj5xPnhCR0K+X30/X/AAWBkzswCNBsxzzASm70aCRS4rDDMeLz49fnXfcsH5GcoscQFz13Y4HwVnBXLJycnACNdRYwgICAqEXoWTxgA7P4kACxbZBu21Kw0AjMsTAwkVAOVtJUUsJ1JCuULESUArXy9gPi9AKwnJRQYKTD9LPoA+iT54PnkCkULEUUpDX9NWV3JVEjQAc1w3A3IBE3YnX+g7QiMJb6MKaiszRCUuQrNCxDPMCcwEX9EWJzYREBEEBwIHKn6l33JCNVIfybPJtAltydPUCmhBZw/tEKsZAJOVJU1CLRuxbUHOQAo7P0s+eEJHHA8SJVRPdGM0NVrpvBoKhfUlM0JHHGUQUhEWO1xLSj8MO0ucNAqJIzVCRxv9EFsqKyA4OQgNj2nwZgp5ZNFgE2A1K3YHS2AhQQojJmC7DgpzGG1WYFUZCQYHZO9gHWCdYIVgu2BTYJlwFh8GvRbcXbG8YgtDHrMBwzPVyQonHQgkCyYBgQJ0Ajc4nVqIAwGSCsBPIgDsK3SWEtIVBa5N8gGjAo+kVwVIZwD/AEUSCDweX4ITrRQsJ8K3TwBXFDwEAB0TvzVcAtoTS20RIwDgVgZ9BBImYgA5AL4Coi8LFnezOkCnIQFjAY4KBAPh9RcGsgZSBsEAJctdsWIRu2kTkQstRw7DAcMBKgpPBGIGMDAwKCYnKTQaLg4AKRSVAFwCdl+YUZ0JdicFD3lPAdt1F9ZZKCGxuE3yBxkFVGcA/wBFEgiCBwAOLHQSjxOtQDg1z7deFRMAZ8QTAGtKb1ApIiPHADkAvgKiLy1DFtYCmBiDAlDDWNB0eo7fpaMO/aEVRRv0ATEQZBIODyMEAc8JQhCbDRgzFD4TAEMAu9YBCgCsAOkAm5I3ABwAYxvONnR+MhXJAxgKQyxL2+kkJhMbhQKDBMkSsvF0AD9BNQ6uQC7WqSQHwxEAEEIu1hkhAH2z4iQPwyJPHNWpdyYBRSpnJALzoBAEVPPsH20MxA0CCEQKRgAFyAtFAlMNwwjEDUQJRArELtapMg7DDZgJIw+TGukEIwvDFkMAqAtDEMMMBhioe+QAO3MMRAACrgnEBSPY9Q0FDnbSBoMAB8MSYxkSxAEJAPIJAAB8FWMOFtMc/HcXwxhDAC7DAvOowwAewwJdKDKHAAHDAALrFUQVwwAbwyvzpWMWv8wA/ABpAy++bcYDUKPD0KhDCwKmJ1MAAmMA5+UZwxAagwipBRL/eADfw6fDGOMCGsOjk3l6BwOpo4sAEsMOGxMAA5sAbcMOAAvDp0MJGkMDwgipnNIPAwfIqUMGAOGDAAPzABXDAAcDAAnDAGmTABrDAA7DChjDjnEWAwABYwAOcwAuUyYABsMAF8MIKQANUgC6wy4AA8MADqMq8wCyYgAcIwAB8wqpAAXOCx0V4wAHowBCwwEKAGnDAAuDAB3DAAjDCakABdIAbqcZ3QCZCCkABdIAAAFDAAfjAB2jCCkABqIACYMAGzMAbSMA5sOIAAhjAAhDABTDBAkpAAbSAOOTAAlDC6kOzPtnAAdDAG6kQFAATwAKwwwAA0MACbUDPwAHIwAZgwACE6cDAAojAApDAAoDp/MGwwAJIwADEwAQQwgAFEMAEXMAD5MADfMADcMAGRMOFiMAFUMAbqMWuwHDAMIAE0MLAGkzEgDhUwACQwAEWgAXgwUjAAbYABjDBSYBgzBaAEFNALcQBxUMegAwMngBrA0IZgJ0KxQHBREPd1N0ZzKRJwaIHAZqNT4DqQq8BwngAB4DAwt2AX56T1ocKQNXAh1GATQGC3tOxYNagkgAMQA5CQADAQEAWxLjAIOYNAEzAH7tFRk6TglSAF8NAAlYAQ+S1ACAQwQorQBiAN4dAJ1wPyeTANVzuQDX3AIeEMp9eyMgXiUAEdkBkJizKltbVVAaRMqRAAEAhyQ/SDEz6BmfVwB6ATEsOClKIRcDOF0E/832AFNt5AByAnkCRxGCOs94NjXdAwINGBonDBwPALW2AwICAgAAAAAAAAYDBQMDARrUAwAtAAAAAgEGBgYGBgYFBQUFBQUEBQYHCAkEBQUFBQQAAAICAAAAIgCNAJAAlT0A6gC7ANwApEQAwgCyAK0AqADuAKYA2gCjAOcBCAEDAMcAgQBiANIA1AEDAN4A8gCQAKkBMQDqAN8A3AsBCQ8yO9ra2tq8xuLT1tRJOB0BUgFcNU0BWgFpAWgBWwFMUUlLbhMBUxsNEAs6PhMOACcUKy0vMj5AQENDQ0RFFEYGJFdXV1dZWVhZL1pbXVxcI2NnZ2ZoZypsbnZ1eHh4eHh4enp6enp6enp6enp8fH18e2IARPIASQCaAHgAMgBm+ACOAFcAVwA3AnbvAIsABfj4AGQAk/IAnwBPAGIAZP//sACFAIUAaQBWALEAJAC2AIMCQAJDAPwA5wD+AP4A6AD/AOkA6QDoAOYALwJ7AVEBQAE+AVQBPgE+AT4BOQE4ATgBOAEcAVgXADEQCAEAUx8SHgsdHhYAjgCWAKYAUQBqIAIxAHYAbwCXAxUDJzIDIUlGTzEAkQJPAMcCVwKkAMAClgKWApYClgKWApYCiwKWApYClgKWApYClgKVApUCmAKgApcClgKWApQClAKUApQCkgKVAnUB1AKXAp8ClgKWApUeAIETBQD+DQOfAmECOh8BVBg9AuIZEjMbAU4/G1WZAXusRAFpYQEFA0FPAQYAmTEeIJdyADFoAHEANgCRA5zMk/C2jGINwjMWygIZCaXdfDILBCs5dAE7YnQBugDlhoiHhoiGiYqKhouOjIaNkI6Ij4qQipGGkoaThpSSlYaWhpeKmIaZhpqGm4aci52QnoqfhuIC4XTpAt90AIp0LHSoAIsAdHQEQwRABEIERQRDBEkERgRBBEcESQRIBEQERgRJAJ5udACrA490ALxuAQ10ANFZdHQA13QCFHQA/mJ0AP4BIQD+APwA/AD9APwDhGZ03ASMK23HAP4A/AD8AP0A/CR0dACRYnQA/gCRASEA/gCRAvQA/gCRA4RmdNwEjCttxyR0AP9idAEhAP4A/gD8APwA/QD8AP8A/AD8AP0A/AOEZnTcBIwrbcckdHQAkWJ0ASEA/gCRAP4AkQL0AP4AkQOEZnTcBIwrbcckdAJLAT50AlIBQXQCU8l0dAJfdHQDpgL0A6YDpgOnA6cDpwOnA4RmdNwEjCttxyR0dACRYnQBIQOmAJEDpgCRAvQDpgCRA4RmdNwEjCttxyR0BDh0AJEEOQCRDpU5dSgCADR03gV2CwArdAEFAM5iCnR0AF1iAAYcOgp0dACRCnQAXAEIwWZ0CnRmdHQAkWZ0CnRmdEXgAFF03gp0dEY0tlT2u3SOAQTwscwhjZZKrhYcBSfFp9XNbKiVDOD2b+cpe4/Z17mQnbtzzhaeQtE2GGj0IDNTjRUSyTxxw/RPHW/+vS7d1NfRt9z9QPZg4X7QFfhCnkvgNPIItOsC2eV6hPannZNHlZ9xrwZXIMOlu3jSoQSq78WEjwLjw1ELSlF1aBvfzwk5ZX7AUvQzjPQKbDuQ+sm4wNOp4A6AdVuRS0t1y/DZpg4R6m7FNjM9HgvW7Bi88zaMjOo6lM8wtBBdj8LP4ylv3zCXPhebMKJc066o9sF71oFW/8JXu86HJbwDID5lzw5GWLR/LhT0Qqnp2JQxNZNfcbLIzPy+YypqRm/lBmGmex+82+PisxUumSeJkALIT6rJezxMH+CTJmQtt5uwTVbL3ptmjDUQzlSIvWi8Tl7ng1NpuRn1Ng4n14Qc+3Iil7OwkvNWogLSPkn3pihIFytyIGmMhOe3n1tWsuMy9BdKyqF4Z3v2SgggTL9KVvMXPnCbRe+oOuFFP3HejBG/w9gvmfNYvg6JuWia2lcSSN1uIjBktzoIazOHPJZ7kKHPz8mRWVdW3lA8WGF9dQF6Bm673boov3BUWDU2JNcahR23GtfHKLOz/viZ+rYnZFaIznXO67CYEJ1fXuTRpZhYZkKe54xeoagkNGLs+NTZHE0rX45/XvQ2RGADX6vcAvdxIUBV27wxGm2zjZo4X3ILgAlrOFheuZ6wtsvaIj4yLY7qqawlliaIcrz2G+c3vscAnCkCuMzMmZvMfu9lLwTvfX+3cVSyPdN9ZwgDZhfjRgNJcLiJ67b9xx8JHswprbiE3v9UphotAPIgnXVIN5KmMc0piXhc6cChPnN+MRhG9adtdttQTTwSIpl8I4/j//d3sz1326qTBTpPRM/Hgh3kzqEXs8ZAk4ErQhNO8hzrQ0DLkWMA/N+91tn2MdOJnWC2FCZehkQrwzwbKOjhvZsbM95QoeL9skYyMf4srVPVJSgg7pOLUtr/n9eT99oe9nLtFRpjA9okV2Kj8h9k5HaC0oivRD8VyXkJ81tcd4fHNXPCfloIQasxsuO18/46dR2jgul/UIet2G0kRvnyONMKhHs6J26FEoqSqd+rfYjeEGwHWVDpX1fh1jBBcKGMqRepju9Y00mDVHC+Xdij/j44rKfvfjGinNs1jO/0F3jB83XCDINN/HB84axlP+3E/klktRo+vl3U/aiyMJbIodE1XSsDn6UAzIoMtUObY2+k/4gY/l+AkZJ5Sj2vQrkyLm3FoxjhDX+31UXBFf9XrAH31fFqoBmDEZvhvvpnZ87N+oZEu7U9O/nnk+QWj3x8uyoRbEnf+O5UMr9i0nHP38IF5AvzrBW8YWBUR0mIAzIvndQq9N3v/Jto3aPjPXUPl8ASdPPyAp7jENf8bk7VMM9ol9XGmlBmeDMuGqt+WzuL6CXAxXjIhCPM5vACchgMJ/8XBGLO/D1isVvGhwwHHr1DLaI5mn2Jr/b1pUD90uciDaS8cXNDzCWvNmT/PhQe5e8nTnnnkt8Ds/SIjibcum/fqDhKopxAY8AkSrPn+IGDEKOO+U3XOP6djFs2H5N9+orhOahiQk5KnEUWa+CzkVzhp8bMHRbg81qhjjXuIKbHjSLSIBKWqockGtKinY+z4/RdBUF6pcc3JmnlxVcNgrI4SEzKUZSwcD2QCyxzKve+gAmg6ZuSRkpPFa6mfThu7LJNu3H5K42uCpNvPAsoedolKV/LHe/eJ+BbaG5MG0NaSGVPRUmNFMFFSSpXEcXwbVh7UETOZZtoVNRGOIbbkig3McEtR68cG0RZAoJevWYo7Dg/lZ1CQzblWeUvVHmr8fY4Nqd9JJiH/zEX24mJviH60fAyFr0A3c4bC1j3yZU60VgJxXn8JgJXLUIsiBnmKmMYz+7yBQFBvqb2eYnuW59joZBf56/wXvWIR4R8wTmV80i1mZy+S4+BUES+hzjk0uXpC///z/IlqHZ1monzlXp8aCfhGKMti73FI1KbL1q6IKO4fuBuZ59gagjn5xU79muMpHXg6S+e+gDM/U9BKLHbl9l6o8czQKl4RUkJJiqftQG2i3BMg/TQlUYFkJDYBOOvAugYuzYSDnZbDDd/aSd9x0Oe6F+bJcHfl9+gp6L5/TgA+BdFFovbfCrQ40s5vMPw8866pNX8zyFGeFWdxIpPVp9Rg1UPOVFbFZrvaFq/YAzHQgqMWpahMYfqHpmwXfHL1/kpYmGuHFwT55mQu0dylfNuq2Oq0hTMCPwqfxnuBIPLXfci4Y1ANy+1CUipQxld/izVh16WyG2Q0CQQ9NqtAnx1HCHwDj7sYxOSB0wopZSnOzxQOcExmxrVTF2BkOthVpGfuhaGECfCJpJKpjnihY+xOT2QJxN61+9K6QSqtv2Shr82I3jgJrqBg0wELFZPjvHpvzTtaJnLK6Vb97Yn933koO/saN7fsjwNKzp4l2lJVx2orjCGzC/4ZL4zCver6aQYtC5sdoychuFE6ufOiog+VWi5UDkbmvmtah/3aArEBIi39s5ILUnlFLgilcGuz9CQshEY7fw2ouoILAYPVT/gyAIq3TFAIwVsl+ktkRz/qGfnCDGrm5gsl/l9QdvCWGsjPz3dU7XuqKfdUrr/6XIgjp4rey6AJBmCmUJMjITHVdFb5m1p+dLMCL8t55zD42cmftmLEJC0Da04YiRCVUBLLa8D071/N5UBNBXDh0LFsmhV/5B5ExOB4j3WVG/S3lfK5o+V6ELHvy6RR9n4ac+VsK4VE4yphPvV+kG9FegTBH4ZRXL2HytUHCduJazB/KykjfetYxOXTLws267aGOd+I+JhKP//+VnXmS90OD/jvLcVu0asyqcuYN1mSb6XTlCkqv1vigZPIYwNF/zpWcT1GR/6aEIRjkh0yhg4LXJfaGobYJTY4JI58KiAKgmmgAKWdl5nYCeLqavRJGQNuYuZtZFGx+IkI4w4NS2xwbetNMunOjBu/hmKCI/w7tfiiyUd//4rbTeWt4izBY8YvGIN6vyKYmP/8X8wHKCeN+WRcKM70+tXKNGyevU9H2Dg5BsljnTf8YbsJ1TmMs74Ce2XlHisleguhyeg44rQOHZuw/6HTkhnnurK2d62q6yS7210SsAIaR+jXMQA+svkrLpsUY+F30Uw89uOdGAR6vo4FIME0EfVVeHTu6eKicfhSqOeXJhbftcd08sWEnNUL1C9fnprTgd83IMut8onVUF0hvqzZfHduPjbjwEXIcoYmy+P6tcJZHmeOv6VrvEdkHDJecjHuHeWANe79VG662qTjA/HCvumVv3qL+LrOcpqGps2ZGwQdFJ7PU4iuyRlBrwfO+xnPyr47s2cXVbWzAyznDiBGjCM3ksxjjqM62GE9C8f5U38kB3VjtabKp/nRdvMESPGDG90bWRLAt1Qk5DyLuazRR1YzdC1c+hZXvAWV8xA72S4A8B67vjVhbba3MMop293FeEXpe7zItMWrJG/LOH9ByOXmYnNJfjmfuX9KbrpgLOba4nZ+fl8Gbdv/ihv+6wFGKHCYrVwmhFC0J3V2bn2tIB1wCc1CST3d3X2OyxhguXcs4sm679UngzofuSeBewMFJboIQHbUh/m2JhW2hG9DIvG2t7yZIzKBTz9wBtnNC+2pCRYhSIuQ1j8xsz5VvqnyUIthvuoyyu7fNIrg/KQUVmGQaqkqZk/Vx5b33/gsEs8yX7SC1J+NV4icz6bvIE7C5G6McBaI8rVg56q5QBJWxn/87Q1sPK4+sQa8fLU5gXo4paaq4cOcQ4wR0VBHPGjKh+UlPCbA1nLXyEUX45qZ8J7/Ln4FPJE2TdzD0Z8MLSNQiykMMmSyOCiFfy84Rq60emYB2vD09KjYwsoIpeDcBDTElBbXxND72yhd9pC/1CMid/5HUMvAL27OtcIJDzNKpRPNqPOpyt2aPGz9QWIs9hQ9LiX5s8m9hjTUu/f7MyIatjjd+tSfQ3ufZxPpmJhTaBtZtKLUcfOCUqADuO+QoH8B9v6U+P0HV1GLQmtoNFTb3s74ivZgjES0qfK+8RdGgBbcCMSy8eBvh98+et1KIFqSe1KQPyXULBMTsIYnysIwiZBJYdI20vseV+wuJkcqGemehKjaAb9L57xZm3g2zX0bZ2xk/fU+bCo7TlnbW7JuF1YdURo/2Gw7VclDG1W7LOtas2LX4upifZ/23rzpsnY/ALfRgrcWP5hYmV9VxVOQA1fZvp9F2UNU+7d7xRyVm5wiLp3/0dlV7vdw1PMiZrbDAYzIVqEjRY2YU03sJhPnlwIPcZUG5ltL6S8XCxU1eYS5cjr34veBmXAvy7yN4ZjArIG0dfD/5UpBNlX1ZPoxJOwyqRi3wQWtOzd4oNKh0LkoTm8cwqgIfKhqqGOhwo71I+zXnMemTv2B2AUzABWyFztGgGULjDDzWYwJUVBTjKCn5K2QGMK1CQT7SzziOjo+BhAmqBjzuc3xYym2eedGeOIRJVyTwDw37iCMe4g5Vbnsb5ZBdxOAnMT7HU4DHpxWGuQ7GeiY30Cpbvzss55+5Km1YsbD5ea3NI9QNYIXol5apgSu9dZ8f8xS5dtHpido5BclDuLWY4lhik0tbJa07yJhH0BOyEut/GRbYTS6RfiTYWGMCkNpfSHi7HvdiTglEVHKZXaVhezH4kkXiIvKopYAlPusftpE4a5IZwvw1x/eLvoDIh/zpo9FiQInsTb2SAkKHV42XYBjpJDg4374XiVb3ws4qM0s9eSQ5HzsMU4OZJKuopFjBM+dAZEl8RUMx5uU2N486Kr141tVsGQfGjORYMCJAMsxELeNT4RmWjRcpdTGBwcx6XN9drWqPmJzcrGrH4+DRc7+n1w3kPZwu0BkNr6hQrqgo7JTB9A5kdJ/H7P4cWBMwsmuixAzJB3yrQpnGIq90lxAXLzDCdn1LPibsRt7rHNjgQBklRgPZ8vTbjXdgXrTWQsK5MdrXXQVPp0Rinq3frzZKJ0qD6Qhc40VzAraUXlob1gvkhK3vpmHgI6FRlQZNx6eRqkp0zy4AQlX813fAPtL3jMRaitGFFjo0zmErloC+h+YYdVQ6k4F/epxAoF0BmqEoKNTt6j4vQZNQ2BoqF9Vj53TOIoNmDiu9Xp15RkIgQIGcoLpfoIbenzpGUAtqFJp5W+LLnx38jHeECTJ/navKY1NWfN0sY1T8/pB8kIH3DU3DX+u6W3YwpypBMYOhbSxGjq84RZ84fWJow8pyHqn4S/9J15EcCMsXqrfwyd9mhiu3+rEo9pPpoJkdZqHjra4NvzFwuThNKy6hao/SlLw3ZADUcUp3w3SRVfW2rhl80zOgTYnKE0Hs2qp1J6H3xqPqIkvUDRMFDYyRbsFI3M9MEyovPk8rlw7/0a81cDVLmBsR2ze2pBuKb23fbeZC0uXoIvDppfTwIDxk1Oq2dGesGc+oJXWJLGkOha3CX+DUnzgAp9HGH9RsPZN63Hn4RMA5eSVhPHO+9RcRb/IOgtW31V1Q5IPGtoxPjC+MEJbVlIMYADd9aHYWUIQKopuPOHmoqSkubnAKnzgKHqgIOfW5RdAgotN6BN+O2ZYHkuemLnvQ8U9THVrS1RtLmKbcC7PeeDsYznvqzeg6VCNwmr0Yyx1wnLjyT84BZz3EJyCptD3yeueAyDWIs0L2qs/VQ3HUyqfrja0V1LdDzqAikeWuV4sc7RLIB69jEIBjCkyZedoUHqCrOvShVzyd73OdrJW0hPOuQv2qOoHDc9xVb6Yu6uq3Xqp2ZaH46A7lzevbxQEmfrzvAYSJuZ4WDk1Hz3QX1LVdiUK0EvlAGAYlG3Md30r7dcPN63yqBCIj25prpvZP0nI4+EgWoFG95V596CurXpKRBGRjQlHCvy5Ib/iW8nZJWwrET3mgd6mEhfP4KCuaLjopWs7h+MdXFdIv8dHQJgg1xi1eYqB0uDYjxwVmri0Sv5XKut/onqapC+FQiC2C1lvYJ9MVco6yDYsS3AANUfMtvtbYI2hfwZatiSsnoUeMZd34GVjkMMKA+XnjJpXgRW2SHTZplVowPmJsvXy6w3cfO1AK2dvtZEKTkC/TY9LFiKHCG0DnrMQdGm2lzlBHM9iEYynH2UcVMhUEjsc0oDBTgo2ZSQ1gzkAHeWeBXYFjYLuuf8yzTCy7/RFR81WDjXMbq2BOH5dURnxo6oivmxL3cKzKInlZkD31nvpHB9Kk7GfcfE1t+1V64b9LtgeJGlpRFxQCAqWJ5DoY77ski8gsOEOr2uywZaoO/NGa0X0y1pNQHBi3b2SUGNpcZxDT7rLbBf1FSnQ8guxGW3W+36BW0gBje4DOz6Ba6SVk0xiKgt+q2JOFyr4SYfnu+Ic1QZYIuwHBrgzr6UvOcSCzPTOo7D6IC4ISeS7zkl4h+2VoeHpnG/uWR3+ysNgPcOIXQbv0n4mr3BwQcdKJxgPSeyuP/z1Jjg4e9nUvoXegqQVIE30EHx5GHv+FAVUNTowYDJgyFhf5IvlYmEqRif6+WN1MkEJmDcQITx9FX23a4mxy1AQRsOHO/+eImX9l8EMJI3oPWzVXxSOeHU1dUWYr2uAA7AMb+vAEZSbU3qob9ibCyXeypEMpZ6863o6QPqlqGHZkuWABSTVNd4cOh9hv3qEpSx2Zy/DJMP6cItEmiBJ5PFqQnDEIt3NrA3COlOSgz43D7gpNFNJ5MBh4oFzhDPiglC2ypsNU4ISywY2erkyb1NC3Qh/IfWj0eDgZI4/ln8WPfBsT3meTjq1Uqt1E7Zl/qftqkx6aM9KueMCekSnMrcHj1CqTWWzEzPsZGcDe3Ue4Ws+XFYVxNbOFF8ezkvQGR6ZOtOLU2lQEnMBStx47vE6Pb7AYMBRj2OOfZXfisjJnpTfSNjo6sZ6qSvNxZNmDeS7Gk3yYyCk1HtKN2UnhMIjOXUzAqDv90lx9O/q/AT1ZMnit5XQe9wmQxnE/WSH0CqZ9/2Hy+Sfmpeg8RwsHI5Z8kC8H293m/LHVVM/BA7HaTJYg5Enk7M/xWpq0192ACfBai2LA/qrCjCr6Dh1BIMzMXINBmX96MJ5Hn2nxln/RXPFhwHxUmSV0EV2V0jm86/dxxuYSU1W7sVkEbN9EzkG0QFwPhyHKyb3t+Fj5WoUUTErcazE/N6EW6Lvp0d//SDPj7EV9UdJN+Amnf3Wwk3A0SlJ9Z00yvXZ7n3z70G47Hfsow8Wq1JXcfwnA+Yxa5mFsgV464KKP4T31wqIgzFPd3eCe3j5ory5fBF2hgCFyVFrLzI9eetNXvM7oQqyFgDo4CTp/hDV9NMX9JDHQ/nyHTLvZLNLF6ftn2OxjGm8+PqOwhxnPHWipkE/8wbtyri80Sr7pMNkQGMfo4ZYK9OcCC4ESVFFbLMIvlxSoRqWie0wxqnLfcLSXMSpMMQEJYDVObYsXIQNv4TGNwjq1kvT1UOkicTrG3IaBZ3XdScS3u8sgeZPVpOLkbiF940FjbCeNRINNvDbd01EPBrTCPpm12m43ze1bBB59Ia6Ovhnur/Nvx3IxwSWol+3H2qfCJR8df6aQf4v6WiONxkK+IqT4pKQrZK/LplgDI/PJZbOep8dtbV7oCr6CgfpWa8NczOkPx81iSHbsNhVSJBOtrLIMrL31LK9TqHqAbAHe0RLmmV806kRLDLNEhUEJfm9u0sxpkL93Zgd6rw+tqBfTMi59xqXHLXSHwSbSBl0EK0+loECOPtrl+/nsaFe197di4yUgoe4jKoAJDXc6DGDjrQOoFDWZJ9HXwt8xDrQP+7aRwWKWI1GF8s8O4KzxWBBcwnl3vnl1Oez3oh6Ea1vjR7/z7DDTrFtqU2W/KAEzAuXDNZ7MY73MF216dzdSbWmUp4lcm7keJfWaMHgut9x5C9mj66Z0lJ+yhsjVvyiWrfk1lzPOTdhG15Y7gQlXtacvI7qv/XNSscDwqkgwHT/gUsD5yB7LdRRvJxQGYINn9hTpodKFVSTPrtGvyQw+HlRFXIkodErAGu9Iy1YpfSPc3jkFh5CX3lPxv7aqjE/JAfTIpEjGb/H7MO0e2vsViSW1qa/Lmi4/n4DEI3g7lYrcanspDfEpKkdV1OjSLOy0BCUqVoECaB55vs06rXl4jqmLsPsFM/7vYJ0vrBhDCm/00A/H81l1uekJ/6Lml3Hb9+NKiLqATJmDpyzfYZFHumEjC662L0Bwkxi7E9U4cQA0XMVDuMYAIeLMPgQaMVOd8fmt5SflFIfuBoszeAw7ow5gXPE2Y/yBc/7jExARUf/BxIHQBF5Sn3i61w4z5xJdCyO1F1X3+3ax+JSvMeZ7S6QSKp1Fp/sjYz6Z+VgCZzibGeEoujryfMulH7Rai5kAft9ebcW50DyJr2uo2z97mTWIu45YsSnNSMrrNUuG1XsYBtD9TDYzQffKB87vWbkM4EbPAFgoBV4GQS+vtFDUqOFAoi1nTtmIOvg38N4hT2Sn8r8clmBCXspBlMBYTnrqFJGBT3wZOzAyJDre9dHH7+x7qaaKDOB4UQALD5ecS0DE4obubQEiuJZ0EpBVpLuYcce8Aa4PYd/V4DLDAJBYKQPCWTcrEaZ5HYbJi11Gd6hjGom1ii18VHYnG28NKpkz2UKVPxlhYSp8uZr367iOmoy7zsxehW9wzcy2zG0a80PBMCRQMb32hnaHeOR8fnNDzZhaNYhkOdDsBUZ3loDMa1YP0uS0cjUP3b/6DBlqmZOeNABDsLl5BI5QJups8uxAuWJdkUB/pO6Zax6tsg7fN5mjjDgMGngO+DPcKqiHIDbFIGudxtPTIyDi9SFMKBDcfdGQRv41q1AqmxgkVfJMnP8w/Bc7N9/TR6C7mGObFqFkIEom8sKi2xYqJLTCHK7cxzaZvqODo22c3wisBCP4HeAgcRbNPAsBkNRhSmD48dHupdBRw4mIvtS5oeF6zeT1KMCyhMnmhpkFAGWnGscoNkwvQ8ZM5lE/vgTHFYL99OuNxdFBxTEDd5v2qLR8y9WkXsWgG6kZNndFG+pO/UAkOCipqIhL3hq7cRSdrCq7YhUsTocEcnaFa6nVkhnSeRYUA1YO0z5itF9Sly3VlxYDw239TJJH6f3EUfYO5lb7bcFcz8Bp7Oo8QmnsUHOz/fagVUBtKEw1iT88j+aKkv8cscKNkMxjYr8344D1kFoZ7/td1W6LCNYN594301tUGRmFjAzeRg5vyoM1F6+bJZ/Q54jN/k8SFd3DxPTYaAUsivsBfgTn7Mx8H2SpPt4GOdYRnEJOH6jHM2p6SgB0gzIRq6fHxGMmSmqaPCmlfwxiuloaVIitLGN8wie2CDWhkzLoCJcODh7KIOAqbHEvXdUxaS4TTTs07Clzj/6GmVs9kiZDerMxEnhUB6QQPlcfqkG9882RqHoLiHGBoHfQuXIsAG8GTAtao2KVwRnvvam8jo1e312GQAKWEa4sUVEAMG4G6ckcONDwRcg1e2D3+ohXgY4UAWF8wHKQMrSnzCgfFpsxh+aHXMGtPQroQasRY4U6UdG0rz1Vjbka0MekOGRZQEvqQFlxseFor8zWFgHek3v29+WqN6gaK5gZOTOMZzpQIC1201LkMCXild3vWXSc5UX9xcFYfbRPzGFa1FDcPfPB/jUEq/FeGt419CI3YmBlVoHsa4KdcwQP5ZSwHHhFJ7/Ph/Rap/4vmG91eDwPP0lDfCDRCLszTqfzM71xpmiKi2HwS4WlqvGNwtvwF5Dqpn6KTq8ax00UMPkxDcZrEEEsIvHiUXXEphdb4GB4FymlPwBz4Gperqq5pW7TQ6/yNRhW8VT5NhuP0udlxo4gILq5ZxAZk8ZGh3g4CqxJlPKY7AQxupfUcVpWT5VItp1+30UqoyP4wWsRo3olRRgkWZZ2ZN6VC3OZFeXB8NbnUrSdikNptD1QiGuKkr8EmSR/AK9Rw+FF3s5uwuPbvHGiPeFOViltMK7AUaOsq9+x9cndk3iJEE5LKZRlWJbKOZweROzmPNVPkjE3K/TyA57Rs68TkZ3MR8akKpm7cFjnjPd/DdkWjgYoKHSr5Wu5ssoBYU4acRs5g2DHxUmdq8VXOXRbunD8QN0LhgkssgahcdoYsNvuXGUK/KXD/7oFb+VGdhqIn02veuM5bLudJOc2Ky0GMaG4W/xWBxIJcL7yliJOXOpx0AkBqUgzlDczmLT4iILXDxxtRR1oZa2JWFgiAb43obrJnG/TZC2KSK2wqOzRZTXavZZFMb1f3bXvVaNaK828w9TO610gk8JNf3gMfETzXXsbcvRGCG9JWQZ6+cDPqc4466Yo2RcKH+PILeKOqtnlbInR3MmBeGG3FH10yzkybuqEC2HSQwpA0An7d9+73BkDUTm30bZmoP/RGbgFN+GrCOfADgqr0WbI1a1okpFms8iHYw9hm0zUvlEMivBRxModrbJJ+9/p3jUdQQ9BCtQdxnOGrT5dzRUmw0593/mbRSdBg0nRvRZM5/E16m7ZHmDEtWhwvfdZCZ8J8M12W0yRMszXamWfQTwIZ4ayYktrnscQuWr8idp3PjT2eF/jmtdhIfcpMnb+IfZY2FebW6UY/AK3jP4u3Tu4zE4qlnQgLFbM19EBIsNf7KhjdbqQ/D6yiDb+NlEi2SKD+ivXVUK8ib0oBo366gXkR8ZxGjpJIDcEgZPa9TcYe0TIbiPl/rPUQDu3XBJ9X/GNq3FAUsKsll57DzaGMrjcT+gctp+9MLYXCq+sqP81eVQ0r9lt+gcQfZbACRbEjvlMskztZG8gbC8Qn9tt26Q7y7nDrbZq/LEz7kR6Jc6pg3N9rVX8Y5MJrGlML9p9lU4jbTkKqCveeZUJjHB03m2KRKR2TytoFkTXOLg7keU1s1lrPMQJpoOKLuAAC+y1HlJucU6ysB5hsXhvSPPLq5J7JtnqHKZ4vYjC4Vy8153QY+6780xDuGARsGbOs1WqzH0QS765rnSKEbbKlkO8oI/VDwUd0is13tKpqILu1mDJFNy/iJAWcvDgjxvusIT+PGz3ST/J9r9Mtfd0jpaGeiLYIqXc7DiHSS8TcjFVksi66PEkxW1z6ujbLLUGNNYnzOWpH8BZGK4bCK7iR+MbIv8ncDAz1u4StN3vTTzewr9IQjk9wxFxn+6N1ddKs0vffJiS08N3a4G1SVrlZ97Q/M+8G9fe5AP6d9/Qq4WRnORVhofPIKEdCr3llspUfE0oKIIYoByBRPh+bX1HLS3JWGJRhIvE1aW4NTd8ePi4Z+kXb+Z8snYfSNcqijhAgVsx4RCM54cXUiYkjeBmmC4ajOHrChoELscJJC7+9jjMjw5BagZKlgRMiSNYz7h7vvZIoQqbtQmspc0cUk1G/73iXtSpROl5wtLgQi0mW2Ex8i3WULhcggx6E1LMVHUsdc9GHI1PH3U2Ko0PyGdn9KdVOLm7FPBui0i9a0HpA60MsewVE4z8CAt5d401Gv6zXlIT5Ybit1VIA0FCs7wtvYreru1fUyW3oLAZ/+aTnZrOcYRNVA8spoRtlRoWflsRClFcgzkqiHOrf0/SVw+EpVaFlJ0g4Kxq1MMOmiQdpMNpte8lMMQqm6cIFXlnGbfJllysKDi+0JJMotkqgIxOSQgU9dn/lWkeVf8nUm3iwX2Nl3WDw9i6AUK3vBAbZZrcJpDQ/N64AVwjT07Jef30GSSmtNu2WlW7YoyW2FlWfZFQUwk867EdLYKk9VG6JgEnBiBxkY7LMo4YLQJJlAo9l/oTvJkSARDF/XtyAzM8O2t3eT/iXa6wDN3WewNmQHdPfsxChU/KtLG2Mn8i4ZqKdSlIaBZadxJmRzVS/o4yA65RTSViq60oa395Lqw0pzY4SipwE0SXXsKV+GZraGSkr/RW08wPRvqvSUkYBMA9lPx4m24az+IHmCbXA+0faxTRE9wuGeO06DIXa6QlKJ3puIyiuAVfPr736vzo2pBirS+Vxel3TMm3JKhz9o2ZoRvaFVpIkykb0Hcm4oHFBMcNSNj7/4GJt43ogonY2Vg4nsDQIWxAcorpXACzgBqQPjYsE/VUpXpwNManEru4NwMCFPkXvMoqvoeLN3qyu/N1eWEHttMD65v19l/0kH2mR35iv/FI+yjoHJ9gPMz67af3Mq/BoWXqu3rphiWMXVkmnPSEkpGpUI2h1MThideGFEOK6YZHPwYzMBvpNC7+ZHxPb7epfefGyIB4JzO9DTNEYnDLVVHdQyvOEVefrk6Uv5kTQYVYWWdqrdcIl7yljwwIWdfQ/y+2QB3eR/qxYObuYyB4gTbo2in4PzarU1sO9nETkmj9/AoxDA+JM3GMqQtJR4jtduHtnoCLxd1gQUscHRB/MoRYIEsP2pDZ9KvHgtlk1iTbWWbHhohwFEYX7y51fUV2nuUmnoUcqnWIQAAgl9LTVX+Bc0QGNEhChxHR4YjfE51PUdGfsSFE6ck7BL3/hTf9jLq4G1IafINxOLKeAtO7quulYvH5YOBc+zX7CrMgWnW47/jfRsWnJjYYoE7xMfWV2HN2iyIqLI";
const Fi = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), Ni = 4;
function C2(e) {
  let t = 0;
  function n() {
    return e[t++] << 8 | e[t++];
  }
  let r = n(), s = 1, a = [0, 1];
  for (let x = 1; x < r; x++)
    a.push(s += n());
  let o = n(), i = t;
  t += o;
  let c = 0, l = 0;
  function u() {
    return c == 0 && (l = l << 8 | e[t++], c = 8), l >> --c & 1;
  }
  const d = 31, p = 2 ** d, f = p >>> 1, h = f >> 1, m = p - 1;
  let b = 0;
  for (let x = 0; x < d; x++)
    b = b << 1 | u();
  let y = [], g = 0, A = p;
  for (; ; ) {
    let x = Math.floor(((b - g + 1) * s - 1) / A), C = 0, I = r;
    for (; I - C > 1; ) {
      let M = C + I >>> 1;
      x < a[M] ? I = M : C = M;
    }
    if (C == 0)
      break;
    y.push(C);
    let E = g + Math.floor(A * a[C] / s), T = g + Math.floor(A * a[C + 1] / s) - 1;
    for (; !((E ^ T) & f); )
      b = b << 1 & m | u(), E = E << 1 & m, T = T << 1 & m | 1;
    for (; E & ~T & h; )
      b = b & f | b << 1 & m >>> 1 | u(), E = E << 1 ^ f, T = (T ^ f) << 1 | f | 1;
    g = E, A = 1 + T - E;
  }
  let v = r - 4;
  return y.map((x) => {
    switch (x - v) {
      case 3:
        return v + 65792 + (e[i++] << 16 | e[i++] << 8 | e[i++]);
      case 2:
        return v + 256 + (e[i++] << 8 | e[i++]);
      case 1:
        return v + e[i++];
      default:
        return x - 1;
    }
  });
}
function x2(e) {
  let t = 0;
  return () => e[t++];
}
function $u(e) {
  return x2(C2(A2(e)));
}
function A2(e) {
  let t = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((s, a) => t[s.charCodeAt(0)] = a);
  let n = e.length, r = new Uint8Array(6 * n >> 3);
  for (let s = 0, a = 0, o = 0, i = 0; s < n; s++)
    i = i << 6 | t[e.charCodeAt(s)], o += 6, o >= 8 && (r[a++] = i >> (o -= 8));
  return r;
}
function k2(e) {
  return e & 1 ? ~e >> 1 : e >> 1;
}
function E2(e, t) {
  let n = Array(e);
  for (let r = 0, s = 0; r < e; r++)
    n[r] = s += k2(t());
  return n;
}
function an(e, t = 0) {
  let n = [];
  for (; ; ) {
    let r = e(), s = e();
    if (!s)
      break;
    t += r;
    for (let a = 0; a < s; a++)
      n.push(t + a);
    t += s + 1;
  }
  return n;
}
function Hu(e) {
  return on(() => {
    let t = an(e);
    if (t.length)
      return t;
  });
}
function Gu(e) {
  let t = [];
  for (; ; ) {
    let n = e();
    if (n == 0)
      break;
    t.push(I2(n, e));
  }
  for (; ; ) {
    let n = e() - 1;
    if (n < 0)
      break;
    t.push(S2(n, e));
  }
  return t.flat();
}
function on(e) {
  let t = [];
  for (; ; ) {
    let n = e(t.length);
    if (!n)
      break;
    t.push(n);
  }
  return t;
}
function qu(e, t, n) {
  let r = Array(e).fill().map(() => []);
  for (let s = 0; s < t; s++)
    E2(e, n).forEach((a, o) => r[o].push(a));
  return r;
}
function I2(e, t) {
  let n = 1 + t(), r = t(), s = on(t);
  return qu(s.length, 1 + e, t).flatMap((o, i) => {
    let [c, ...l] = o;
    return Array(s[i]).fill().map((u, d) => {
      let p = d * r;
      return [c + d * n, l.map((f) => f + p)];
    });
  });
}
function S2(e, t) {
  let n = 1 + t();
  return qu(n, 1 + e, t).map((s) => [s[0], s.slice(1)]);
}
function T2(e) {
  let t = [], n = an(e);
  return s(r([]), []), t;
  function r(a) {
    let o = e(), i = on(() => {
      let c = an(e).map((l) => n[l]);
      if (c.length)
        return r(c);
    });
    return { S: o, B: i, Q: a };
  }
  function s({ S: a, B: o }, i, c) {
    if (!(a & 4 && c === i[i.length - 1])) {
      a & 2 && (c = i[i.length - 1]), a & 1 && t.push(i);
      for (let l of o)
        for (let u of l.Q)
          s(l, [...i, u], c);
    }
  }
}
function P2(e) {
  return e.toString(16).toUpperCase().padStart(2, "0");
}
function Qu(e) {
  return `{${P2(e)}}`;
}
function B2(e) {
  let t = [];
  for (let n = 0, r = e.length; n < r; ) {
    let s = e.codePointAt(n);
    n += s < 65536 ? 1 : 2, t.push(s);
  }
  return t;
}
function Mt(e) {
  let n = e.length;
  if (n < 4096)
    return String.fromCodePoint(...e);
  let r = [];
  for (let s = 0; s < n; )
    r.push(String.fromCodePoint(...e.slice(s, s += 4096)));
  return r.join("");
}
function U2(e, t) {
  let n = e.length, r = n - t.length;
  for (let s = 0; r == 0 && s < n; s++)
    r = e[s] - t[s];
  return r;
}
var M2 = "AEUDTAHBCFQATQDRADAAcgAgADQAFAAsABQAHwAOACQADQARAAoAFwAHABIACAAPAAUACwAFAAwABAAQAAMABwAEAAoABQAIAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACgANAA0AAwAKAAkABAAdAAYAZwDSAdsDJgC0CkMB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgsj26PTQyy8FfEQ8AY8IPAGcEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJF8AJpIBpob5AERSMAKNoAXqaQLUBMCzEiACnwRZEkkVsS7tANAsBG0RuAQLEPABv9HICTUBXigPZwRBApMDOwAamhtaABqEAY8KvKx3LQ4ArAB8UhwEBAVSagD8AEFZADkBIadVj2UMUgx5Il4ANQC9AxIB1BlbEPMAs30CGxlXAhwZKQIECBc6EbsCoxngzv7UzRQA8M0BawL6ZwkN7wABAD33OQRcsgLJCjMCjqUChtw/km+NAsXPAoP2BT84PwURAK0RAvptb6cApQS/OMMey5HJS84UdxpxTPkCogVFITaTOwERAK5pAvkNBOVyA7q3BKlOJSALAgUIBRcEdASpBXqzABXFSWZOawLCOqw//AolCZdvv3dSBkEQGyelEPcMMwG1ATsN7UvYBPEGOwTJH30ZGQ/NlZwIpS3dDO0m4y6hgFoj9SqDBe1L9DzdC01RaA9ZC2UJ4zpjgU4DIQENIosK3Q05CG0Q8wrJaw3lEUUHOQPVSZoApQcBCxEdNRW1JhBirAsJOXcG+xr2C48mrxMpevwF0xohBk0BKRr/AM8u54WwWjFcHE9fBgMLJSPHFKhQIA0lQLd4SBobBxUlqQKRQ3BKh1E2HpMh9jw9DWYuE1F8B/U8BRlPC4E8nkarRQ4R0j6NPUgiSUwsBDV/LC8niwnPD4UMuXxyAVkJIQmxDHETMREXN8UIOQcZLZckJxUIIUaVYJoE958D8xPRAwsFPwlBBxMDtRwtEy4VKQUNgSTXAvM21S6zAo9WgAEXBcsPJR/fEFBH4A7pCJsCZQODJesALRUhABcimwhDYwBfj9hTBS7LCMdqbCN0A2cU52ERcweRDlcHpxwzFb8c4XDIXguGCCijrwlbAXUJmQFfBOMICTVbjKAgQWdTi1gYmyBhQT9d/AIxDGUVn0S9h3gCiw9rEhsBNQFzBzkNAQJ3Ee0RaxCVCOuGBDW1M/g6JQRPIYMgEQonA09szgsnJvkM+GkBoxJiAww0PXfuZ6tgtiQX/QcZMsVBYCHxC5JPzQycGsEYQlQuGeQHvwPzGvMn6kFXBf8DowMTOk0z7gS9C2kIiwk/AEkOoxcH1xhqCnGM0AExiwG3mQNXkYMCb48GNwcLAGcLhwV55QAdAqcIowAFAM8DVwA5Aq0HnQAZAIVBAT0DJy8BIeUCjwOTCDHLAZUvAfMpBBvDDBUA9zduSgLDsQKAamaiBd1YAo4CSTUBTSUEBU5HUQOvceEA2wBLBhPfRwEVq0rLGuNDAd9vKwDHAPsABTUHBUEBzQHzbQC3AV8LMQmis7UBTekpAIMAFWsB1wKJAN0ANQB/8QFTAE0FWfkF0wJPSQERMRgrV2EBuwMfATMBDQB5BsuNpckHHwRtB9MCEBsV4QLvLge1AQMi3xPNQsUCvd5VoWACZIECYkJbTa9bNyACofcCaJgCZgkCn4Q4GwsCZjsCZiYEbgR/A38TA36SOQY5dxc5gjojIwJsHQIyNjgKAm3HAm2u74ozZ0UrAWcA3gDhAEoFB5gMjQD+C8IADbUCdy8CdqI/AnlLQwJ4uh1c20WuRtcCfD8CesgCfQkCfPAFWQUgSABIfWMkAoFtAoAAAoAFAn+uSVhKWxUXSswC0QEC0MxLJwOITwOH5kTFkTIC8qFdAwMDrkvOTC0lA89NTE2vAos/AorYwRsHHUNnBbcCjjcCjlxAl4ECjtkCjlx4UbRTNQpS1FSFApP7ApMMAOkAHFUeVa9V0AYsGymVhjLheGZFOzkCl58C77JYIagAWSUClo8ClnycAKlZrFoJgU0AOwKWtQKWTlxEXNECmcsCmWRcyl0HGQKcmznCOp0CnBYCn5sCnriKAB0PMSoPAp3xAp6SALU9YTRh7wKe0wKgbgGpAp6fHwKeTqVjyGQnJSsCJ68CJn4CoPsCoEwCot0CocQCpi8Cpc4Cp/8AfQKn8mh8aLEAA0lqHGrRAqzjAqyuAq1nAq0CAlcdAlXcArHh1wMfTmyXArK9DQKy6Bds4G1jbUhfAyXNArZcOz9ukAMpRQK4XgK5RxUCuSp3cDZw4QK9GQK72nCWAzIRAr6IcgIDM3ECvhpzInNPAsPLAsMEc4J0SzVFdOADPKcDPJoDPb8CxXwCxkcCxhCJAshpUQLIRALJTwLJLgJknQLd0nh5YXiueSVL0AMYo2cCAmH0GfOVJHsLXpJeuxECz2sCz2wvS1PS8xOfAMatAs9zASnqA04SfksFAtwnAtuKAtJPA1JcA1NfAQEDVYyAiT8AyxbtYEWCHILTgs6DjQLaxwLZ3oQQhEmnPAOGpQAvA2QOhnFZ+QBVAt9lAt64c3cC4i/tFAHzMCcB9JsB8tKHAuvzAulweQLq+QLq5AD5RwG5Au6JAuuclqqXAwLuPwOF4Jh5cOBxoQLzAwBpA44WmZMC9xMDkW4DkocC95gC+dkC+GaaHJqruzebHgOdgwL++gEbADmfHJ+zAwWNA6ZqA6bZANHFAwZqoYiiBQkDDEkCwAA/AwDhQRdTARHzA2sHl2cFAJMtK7evvdsBiZkUfxEEOQH7KQUhDp0JnwCS/SlXxQL3AZ0AtwW5AG8LbUEuFCaNLgFDAYD8AbUmAHUDDgRtACwCFgyhAAAKAj0CagPdA34EkQEgRQUhfAoABQBEABMANhICdwEABdUDa+8KxQIA9wqfJ7+xt+UBkSFBQgHpFH8RNMCJAAQAGwBaAkUChIsABjpTOpSNbQC4Oo860ACNOME63AClAOgAywE6gTo7Ofw5+Tt2iTpbO56JOm85GAFWATMBbAUvNV01njWtNWY1dTW2NcU1gjWRNdI14TWeNa017jX9NbI1wTYCNhE1xjXVNhY2JzXeNe02LjY9Ni41LSE2OjY9Njw2yTcIBJA8VzY4Nt03IDcPNsogN4k3MAoEsDxnNiQ3GTdsOo03IULUQwdC4EMLHA8PCZsobShRVQYA6X8A6bABFCnXAukBowC9BbcAbwNzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgBFLWZAu0BhQCjBcEAbykBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUABavAj626xQAJP0A3etzuf4NNRA7efy2Z9NQrCnC0OSyANz5BBIbJ5IFDR6miIavYS6tprjjmuKebxm5C74Q225X1pkaYYPb6f1DK4k3xMEBb9S2WMjEibTNWhsRJIA+vwNVEiXTE5iXs/wezV66oFLfp9NZGYW+Gk19J2+bCT6Ye2w6LDYdgzKMUabk595eLBCXANz9HUpWbATq9vqXVx9XDg+Pc9Xp4+bsS005SVM/BJBM4687WUuf+Uj9dEi8aDNaPxtpbDxcG1THTImUMZq4UCaaNYpsVqraNyKLJXDYsFZ/5jl7bLRtO88t7P3xZaAxhb5OdPMXqsSkp1WCieG8jXm1U99+blvLlXzPCS+M93VnJCiK+09LfaSaBAVBomyDgJua8dfUzR7ga34IvR2Nvj+A9heJ6lsl1KG4NkI1032Cnff1m1wof2B9oHJK4bi6JkEdSqeNeiuo6QoZZincoc73/TH9SXF8sCE7XyuYyW8WSgbGFCjPV0ihLKhdPs08Tx82fYAkLLc4I2wdl4apY7GU5lHRFzRWJep7Ww3wbeA3qmd59/86P4xuNaqDpygXt6M85glSBHOCGgJDnt+pN9bK7HApMguX6+06RZNjzVmcZJ+wcUrJ9//bpRNxNuKpNl9uFds+S9tdx7LaM5ZkIrPj6nIU9mnbFtVbs9s/uLgl8MVczAwet+iOEzzBlYW7RCMgE6gyNLeq6+1tIx4dpgZnd0DksJS5f+JNDpwwcPNXaaVspq1fbQajOrJgK0ofKtJ1Ne90L6VO4MOl5S886p7u6xo7OLjG8TGL+HU1JXGJgppg4nNbNJ5nlzSpuPYy21JUEcUA94PoFiZfjZue+QnyQ80ekOuZVkxx4g+cvhJfHgNl4hy1/a6+RKcKlar/J29y//EztlbVPHVUeQ1zX86eQVAjR/M3dA9w4W8LfaXp4EgM85wOWasli837PzVMOnsLzR+k3o75/lRPAJSE1xAKQzEi5v10ke+VBvRt1cwQRMd+U5mLCTGVd6XiZtgBG5cDi0w22GKcVNvHiu5LQbZEDVtz0onn7k5+heuKXVsZtSzilkLRAUmjMXEMB3J9YC50XBxPiz53SC+EhnPl9WsKCv92SM/OFFIMJZYfl0WW8tIO3UxYcwdMAj7FSmgrsZ2aAZO03BOhP1bNNZItyXYQFTpC3SG1VuPDqH9GkiCDmE+JwxyIVSO5siDErAOpEXFgjy6PQtOVDj+s6e1r8heWVvmZnTciuf4EiNZzCAd7SOMhXERIOlsHIMG399i9aLTy3m2hRLZjJVDNLS53iGIK11dPqQt0zBDyg6qc7YqkDm2M5Ve6dCWCaCbTXX2rToaIgz6+zh4lYUi/+6nqcFMAkQJKHYLK0wYk5N9szV6xihDbDDFr45lN1K4aCXBq/FitPSud9gLt5ZVn+ZqGX7cwm2z5EGMgfFpIFyhGGuDPmso6TItTMwny+7uPnLCf4W6goFQFV0oQSsc9VfMmVLcLr6ZetDZbaSFTLqnSO/bIPjA3/zAUoqgGFAEQS4IhuMzEp2I3jJzbzkk/IEmyax+rhZTwd6f+CGtwPixu8IvzACquPWPREu9ZvGkUzpRwvRRuaNN6cr0W1wWits9ICdYJ7ltbgMiSL3sTPeufgNcVqMVWFkCPDH4jG2jA0XcVgQj62Cb29v9f/z/+2KbYvIv/zzjpQAPkliaVDzNrW57TZ/ZOyZD0nlfMmAIBIAGAI0D3k/mdN4xr9v85ZbZbbqfH2jGd5hUqNZWwl5SPfoGmfElmazUIeNL1j/mkF7VNAzTq4jNt8JoQ11NQOcmhprXoxSxfRGJ9LDEOAQ+dmxAQH90iti9e2u/MoeuaGcDTHoC+xsmEeWmxEKefQuIzHbpw5Tc5cEocboAD09oipWQhtTO1wivf/O+DRe2rpl/E9wlrzBorjJsOeG1B/XPW4EaJEFdNlECEZga5ZoGRHXgYouGRuVkm8tDESiEyFNo+3s5M5puSdTyUL2llnINVHEt91XUNW4ewdMgJ4boJfEyt/iY5WXqbA+A2Fkt5Z0lutiWhe9nZIyIUjyXDC3UsaG1t+eNx6z4W/OYoTB7A6x+dNSTOi9AInctbESqm5gvOLww7OWXPrmHwVZasrl4eD113pm+JtT7JVOvnCXqdzzdTRHgJ0PiGTFYW5Gvt9R9LD6Lzfs0v/TZZHSmyVNq7viIHE6DBK7Qp07Iz55EM8SYtQvZf/obBniTWi5C2/ovHfw4VndkE5XYdjOhCMRjDeOEfXeN/CwfGduiUIfsoFeUxXeQXba7c7972XNv8w+dTjjUM0QeNAReW+J014dKAD/McQYXT7c0GQPIkn3Ll6R7gGjuiQoZD0TEeEqQpKoZ15g/0OPQI17QiSv9AUROa/V/TQN3dvLArec3RrsYlvBm1b8LWzltdugsC50lNKYLEp2a+ZZYqPejULRlOJh5zj/LVMyTDvwKhMxxwuDkxJ1QpoNI0OTWLom4Z71SNzI9TV1iXJrIu9Wcnd+MCaAw8o1jSXd94YU/1gnkrC9BUEOtQvEIQ7g0i6h+KL2JKk8Ydl7HruvgWMSAmNe+LshGhV4qnWHhO9/RIPQzY1tHRj2VqOyNsDpK0cww+56AdDC4gsWwY0XxoucIWIqs/GcwnWqlaT0KPr8mbK5U94/301i1WLt4YINTVvCFBrFZbIbY8eycOdeJ2teD5IfPLCRg7jjcFTwlMFNl9zdh/o3E/hHPwj7BWg0MU09pPrBLbrCgm54A6H+I6v27+jL5gkjWg/iYdks9jbfVP5y/n0dlgWEMlKasl7JvFZd56LfybW1eeaVO0gxTfXZwD8G4SI116yx7UKVRgui6Ya1YpixqXeNLc8IxtAwCU5IhwQgn+NqHnRaDv61CxKhOq4pOX7M6pkA+Pmpd4j1vn6ACUALoLLc4vpXci8VidLxzm7qFBe7s+quuJs6ETYmnpgS3LwSZxPIltgBDXz8M1k/W2ySNv2f9/NPhxLGK2D21dkHeSGmenRT3Yqcdl0m/h3OYr8V+lXNYGf8aCCpd4bWjE4QIPj7vUKN4Nrfs7ML6Y2OyS830JCnofg/k7lpFpt4SqZc5HGg1HCOrHvOdC8bP6FGDbE/VV0mX4IakzbdS/op+Kt3G24/8QbBV7y86sGSQ/vZzU8FXs7u6jIvwchsEP2BpIhW3G8uWNwa3HmjfH/ZjhhCWvluAcF+nMf14ClKg5hGgtPLJ98ueNAkc5Hs2WZlk2QHvfreCK1CCGO6nMZVSb99VM/ajr8WHTte9JSmkXq/i/U943HEbdzW6Re/S88dKgg8pGOLlAeNiqrcLkUR3/aClFpMXcOUP3rmETcWSfMXZE3TUOi8i+fqRnTYLflVx/Vb/6GJ7eIRZUA6k3RYR3iFSK9c4iDdNwJuZL2FKz/IK5VimcNWEqdXjSoxSgmF0UPlDoUlNrPcM7ftmA8Y9gKiqKEHuWN+AZRIwtVSxye2Kf8rM3lhJ5XcBXU9n4v0Oy1RU2M+4qM8AQPVwse8ErNSob5oFPWxuqZnVzo1qB/IBxkM3EVUKFUUlO3e51259GgNcJbCmlvrdjtoTW7rChm1wyCKzpCTwozUUEOIcWLneRLgMXh+SjGSFkAllzbGS5HK7LlfCMRNRDSvbQPjcXaenNYxCvu2Qyznz6StuxVj66SgI0T8B6/sfHAJYZaZ78thjOSIFumNWLQbeZixDCCC+v0YBtkxiBB3jefHqZ/dFHU+crbj6OvS1x/JDD7vlm7zOVPwpUC01nhxZuY/63E7g";
const cn = 44032, Dr = 4352, Or = 4449, Rr = 4519, Vu = 19, Ku = 21, Ft = 28, zr = Ku * Ft, F2 = Vu * zr, N2 = cn + F2, D2 = Dr + Vu, O2 = Or + Ku, R2 = Rr + Ft;
function Jt(e) {
  return e >> 24 & 255;
}
function Wu(e) {
  return e & 16777215;
}
let ha, Di, ma, pr;
function z2() {
  let e = $u(M2);
  ha = new Map(Hu(e).flatMap((t, n) => t.map((r) => [r, n + 1 << 24]))), Di = new Set(an(e)), ma = /* @__PURE__ */ new Map(), pr = /* @__PURE__ */ new Map();
  for (let [t, n] of Gu(e)) {
    if (!Di.has(t) && n.length == 2) {
      let [r, s] = n, a = pr.get(r);
      a || (a = /* @__PURE__ */ new Map(), pr.set(r, a)), a.set(s, t);
    }
    ma.set(t, n.reverse());
  }
}
function Ju(e) {
  return e >= cn && e < N2;
}
function j2(e, t) {
  if (e >= Dr && e < D2 && t >= Or && t < O2)
    return cn + (e - Dr) * zr + (t - Or) * Ft;
  if (Ju(e) && t > Rr && t < R2 && (e - cn) % Ft == 0)
    return e + (t - Rr);
  {
    let n = pr.get(e);
    return n && (n = n.get(t), n) ? n : -1;
  }
}
function Zu(e) {
  ha || z2();
  let t = [], n = [], r = !1;
  function s(a) {
    let o = ha.get(a);
    o && (r = !0, a |= o), t.push(a);
  }
  for (let a of e)
    for (; ; ) {
      if (a < 128)
        t.push(a);
      else if (Ju(a)) {
        let o = a - cn, i = o / zr | 0, c = o % zr / Ft | 0, l = o % Ft;
        s(Dr + i), s(Or + c), l > 0 && s(Rr + l);
      } else {
        let o = ma.get(a);
        o ? n.push(...o) : s(a);
      }
      if (!n.length)
        break;
      a = n.pop();
    }
  if (r && t.length > 1) {
    let a = Jt(t[0]);
    for (let o = 1; o < t.length; o++) {
      let i = Jt(t[o]);
      if (i == 0 || a <= i) {
        a = i;
        continue;
      }
      let c = o - 1;
      for (; ; ) {
        let l = t[c + 1];
        if (t[c + 1] = t[c], t[c] = l, !c || (a = Jt(t[--c]), a <= i))
          break;
      }
      a = Jt(t[o]);
    }
  }
  return t;
}
function L2(e) {
  let t = [], n = [], r = -1, s = 0;
  for (let a of e) {
    let o = Jt(a), i = Wu(a);
    if (r == -1)
      o == 0 ? r = i : t.push(i);
    else if (s > 0 && s >= o)
      o == 0 ? (t.push(r, ...n), n.length = 0, r = i) : n.push(i), s = o;
    else {
      let c = j2(r, i);
      c >= 0 ? r = c : s == 0 && o == 0 ? (t.push(r), r = i) : (n.push(i), s = o);
    }
  }
  return r >= 0 && t.push(r, ...n), t;
}
function Xu(e) {
  return Zu(e).map(Wu);
}
function _2(e) {
  return L2(Zu(e));
}
const Oi = 45, Yu = ".", ed = 65039, td = 1, yt = (e) => Array.from(e);
function ln(e, t) {
  return e.P.has(t) || e.Q.has(t);
}
class $2 extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let ba, nd, Ze, ya, rd, gt, qs, mt, sd, Ri, wa;
function _o() {
  if (ba)
    return;
  let e = $u(v2);
  const t = () => an(e), n = () => new Set(t());
  ba = new Map(Gu(e)), nd = n(), Ze = t(), ya = new Set(t().map((u) => Ze[u])), Ze = new Set(Ze), rd = n(), n();
  let r = Hu(e), s = e();
  const a = () => new Set(t().flatMap((u) => r[u]).concat(t()));
  gt = on((u) => {
    let d = on(e).map((p) => p + 96);
    if (d.length) {
      let p = u >= s;
      d[0] -= 32, d = Mt(d), p && (d = `Restricted[${d}]`);
      let f = a(), h = a(), m = !e();
      return { N: d, P: f, Q: h, M: m, R: p };
    }
  }), qs = n(), mt = /* @__PURE__ */ new Map();
  let o = t().concat(yt(qs)).sort((u, d) => u - d);
  o.forEach((u, d) => {
    let p = e(), f = o[d] = p ? o[d - p] : { V: [], M: /* @__PURE__ */ new Map() };
    f.V.push(u), qs.has(u) || mt.set(u, f);
  });
  for (let { V: u, M: d } of new Set(mt.values())) {
    let p = [];
    for (let h of u) {
      let m = gt.filter((y) => ln(y, h)), b = p.find(({ G: y }) => m.some((g) => y.has(g)));
      b || (b = { G: /* @__PURE__ */ new Set(), V: [] }, p.push(b)), b.V.push(h), m.forEach((y) => b.G.add(y));
    }
    let f = p.flatMap((h) => yt(h.G));
    for (let { G: h, V: m } of p) {
      let b = new Set(f.filter((y) => !h.has(y)));
      for (let y of m)
        d.set(y, b);
    }
  }
  let i = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  const l = (u) => i.has(u) ? c.add(u) : i.add(u);
  for (let u of gt) {
    for (let d of u.P)
      l(d);
    for (let d of u.Q)
      l(d);
  }
  for (let u of i)
    !mt.has(u) && !c.has(u) && mt.set(u, td);
  sd = new Set(yt(i).concat(yt(Xu(i)))), Ri = T2(e).map((u) => $2.from(u)).sort(U2), wa = /* @__PURE__ */ new Map();
  for (let u of Ri) {
    let d = [wa];
    for (let p of u) {
      let f = d.map((h) => {
        let m = h.get(p);
        return m || (m = /* @__PURE__ */ new Map(), h.set(p, m)), m;
      });
      p === ed ? d.push(...f) : d = f;
    }
    for (let p of d)
      p.V = u;
  }
}
function $o(e) {
  return (ad(e) ? "" : `${Ho(As([e]))} `) + Qu(e);
}
function Ho(e) {
  return `"${e}"‎`;
}
function H2(e) {
  if (e.length >= 4 && e[2] == Oi && e[3] == Oi)
    throw new Error(`invalid label extension: "${Mt(e.slice(0, 4))}"`);
}
function G2(e) {
  for (let n = e.lastIndexOf(95); n > 0; )
    if (e[--n] !== 95)
      throw new Error("underscore allowed only at start");
}
function q2(e) {
  let t = e[0], n = Fi.get(t);
  if (n)
    throw Yt(`leading ${n}`);
  let r = e.length, s = -1;
  for (let a = 1; a < r; a++) {
    t = e[a];
    let o = Fi.get(t);
    if (o) {
      if (s == a)
        throw Yt(`${n} + ${o}`);
      s = a + 1, n = o;
    }
  }
  if (s == r)
    throw Yt(`trailing ${n}`);
}
function As(e, t = Qu) {
  let n = [];
  Q2(e[0]) && n.push("◌");
  let r = 0, s = e.length;
  for (let a = 0; a < s; a++) {
    let o = e[a];
    ad(o) && (n.push(Mt(e.slice(r, a))), n.push(t(o)), r = a + 1);
  }
  return n.push(Mt(e.slice(r, s))), n.join("");
}
function Q2(e) {
  return _o(), Ze.has(e);
}
function ad(e) {
  return _o(), rd.has(e);
}
function V2(e) {
  return Z2(K2(e, _2, ex));
}
function K2(e, t, n) {
  if (!e)
    return [];
  _o();
  let r = 0;
  return e.split(Yu).map((s) => {
    let a = B2(s), o = {
      input: a,
      offset: r
      // codepoint, not substring!
    };
    r += a.length + 1;
    try {
      let i = o.tokens = Y2(a, t, n), c = i.length, l;
      if (!c)
        throw new Error("empty label");
      let u = o.output = i.flat();
      if (G2(u), !(o.emoji = c > 1 || i[0].is_emoji) && u.every((p) => p < 128))
        H2(u), l = "ASCII";
      else {
        let p = i.flatMap((f) => f.is_emoji ? [] : f);
        if (!p.length)
          l = "Emoji";
        else {
          if (Ze.has(u[0]))
            throw Yt("leading combining mark");
          for (let m = 1; m < c; m++) {
            let b = i[m];
            if (!b.is_emoji && Ze.has(b[0]))
              throw Yt(`emoji + combining mark: "${Mt(i[m - 1])} + ${As([b[0]])}"`);
          }
          q2(u);
          let f = yt(new Set(p)), [h] = J2(f);
          X2(h, p), W2(h, f), l = h.N;
        }
      }
      o.type = l;
    } catch (i) {
      o.error = i;
    }
    return o;
  });
}
function W2(e, t) {
  let n, r = [];
  for (let s of t) {
    let a = mt.get(s);
    if (a === td)
      return;
    if (a) {
      let o = a.M.get(s);
      if (n = n ? n.filter((i) => o.has(i)) : yt(o), !n.length)
        return;
    } else
      r.push(s);
  }
  if (n) {
    for (let s of n)
      if (r.every((a) => ln(s, a)))
        throw new Error(`whole-script confusable: ${e.N}/${s.N}`);
  }
}
function J2(e) {
  let t = gt;
  for (let n of e) {
    let r = t.filter((s) => ln(s, n));
    if (!r.length)
      throw gt.some((s) => ln(s, n)) ? id(t[0], n) : od(n);
    if (t = r, r.length == 1)
      break;
  }
  return t;
}
function Z2(e) {
  return e.map(({ input: t, error: n, output: r }) => {
    if (n) {
      let s = n.message;
      throw new Error(e.length == 1 ? s : `Invalid label ${Ho(As(t))}: ${s}`);
    }
    return Mt(r);
  }).join(Yu);
}
function od(e) {
  return new Error(`disallowed character: ${$o(e)}`);
}
function id(e, t) {
  let n = $o(t), r = gt.find((s) => s.P.has(t));
  return r && (n = `${r.N} ${n}`), new Error(`illegal mixture: ${e.N} + ${n}`);
}
function Yt(e) {
  return new Error(`illegal placement: ${e}`);
}
function X2(e, t) {
  for (let n of t)
    if (!ln(e, n))
      throw id(e, n);
  if (e.M) {
    let n = Xu(t);
    for (let r = 1, s = n.length; r < s; r++)
      if (ya.has(n[r])) {
        let a = r + 1;
        for (let o; a < s && ya.has(o = n[a]); a++)
          for (let i = r; i < a; i++)
            if (n[i] == o)
              throw new Error(`duplicate non-spacing marks: ${$o(o)}`);
        if (a - r > Ni)
          throw new Error(`excessive non-spacing marks: ${Ho(As(n.slice(r - 1, a)))} (${a - r}/${Ni})`);
        r = a;
      }
  }
}
function Y2(e, t, n) {
  let r = [], s = [];
  for (e = e.slice().reverse(); e.length; ) {
    let a = tx(e);
    if (a)
      s.length && (r.push(t(s)), s = []), r.push(n(a));
    else {
      let o = e.pop();
      if (sd.has(o))
        s.push(o);
      else {
        let i = ba.get(o);
        if (i)
          s.push(...i);
        else if (!nd.has(o))
          throw od(o);
      }
    }
  }
  return s.length && r.push(t(s)), r;
}
function ex(e) {
  return e.filter((t) => t != ed);
}
function tx(e, t) {
  let n = wa, r, s = e.length;
  for (; s && (n = n.get(e[--s]), !!n); ) {
    let { V: a } = n;
    a && (r = a, e.length = s);
  }
  return r;
}
function zi(e) {
  return V2(e);
}
class nx extends Pd {
  constructor(t) {
    const { wagmiConfig: n, siweConfig: r, defaultChain: s, tokens: a, _sdkVersion: o, ...i } = t;
    if (!n)
      throw new Error("web3modal:constructor - wagmiConfig is undefined");
    if (!i.projectId)
      throw new Error("web3modal:constructor - projectId is undefined");
    const c = {
      switchCaipNetwork: async (u) => {
        const d = ke.caipNetworkIdToNumber(u == null ? void 0 : u.id);
        d && await X0(this.wagmiConfig, { chainId: d });
      },
      getApprovedCaipNetworksData: async () => new Promise((u) => {
        var f, h;
        const p = new Map(n.state.connections).get(n.state.current || "");
        if (((f = p == null ? void 0 : p.connector) == null ? void 0 : f.id) === _.AUTH_CONNECTOR_ID)
          u(w2());
        else if (((h = p == null ? void 0 : p.connector) == null ? void 0 : h.id) === _.WALLET_CONNECT_CONNECTOR_ID) {
          const m = n.connectors.find((b) => b.id === _.WALLET_CONNECT_CONNECTOR_ID);
          u(y2(m));
        }
        u({ approvedCaipNetworkIds: void 0, supportsAllNetworks: !0 });
      })
    }, l = {
      connectWalletConnect: async (u) => {
        var m, b, y, g;
        const d = n.connectors.find((A) => A.id === _.WALLET_CONNECT_CONNECTOR_ID);
        if (!d)
          throw new Error("connectionControllerClient:getWalletConnectUri - connector is undefined");
        const p = await d.getProvider();
        p.on("display_uri", (A) => {
          u(A);
        });
        const f = ke.caipNetworkIdToNumber((m = this.getCaipNetwork()) == null ? void 0 : m.id), h = await ((b = r == null ? void 0 : r.getMessageParams) == null ? void 0 : b.call(r));
        if ((y = r == null ? void 0 : r.options) != null && y.enabled && typeof (p == null ? void 0 : p.authenticate) == "function" && h && Object.keys(h || {}).length > 0) {
          const { SIWEController: A, getDidChainId: v, getDidAddress: x } = await import("./index-w--wEpYe.js");
          await d.setRequestedChainsIds(h.chains);
          let C = h.chains;
          f && (C = [f, ...h.chains.filter((T) => T !== f)]);
          const I = await p.authenticate({
            nonce: await r.getNonce(),
            methods: [...Ud],
            ...h,
            chains: C
          }), E = (g = I == null ? void 0 : I.auths) == null ? void 0 : g[0];
          if (E) {
            const { p: T, s: M } = E, L = v(T.iss) || "", N = x(T.iss);
            N && L && A.setSession({
              address: N,
              chainId: parseInt(L, 10)
            });
            try {
              const j = p.signer.client.formatAuthMessage({
                request: T,
                iss: T.iss
              });
              await A.verifyMessage({
                message: j,
                signature: M.s,
                cacao: E
              });
            } catch (j) {
              throw console.error("Error verifying message", j), await p.disconnect().catch(console.error), await A.signOut().catch(console.error), j;
            }
            this.wagmiConfig.state.current = "";
          }
        }
        await Ci(this.wagmiConfig, { connector: d, chainId: f });
      },
      connectExternal: async ({ id: u, provider: d, info: p }) => {
        var m, b;
        const f = n.connectors.find((y) => y.id === u);
        if (!f)
          throw new Error("connectionControllerClient:connectExternal - connector is undefined");
        d && p && f.id === _.EIP6963_CONNECTOR_ID && ((m = f.setEip6963Wallet) == null || m.call(f, { provider: d, info: p }));
        const h = ke.caipNetworkIdToNumber((b = this.getCaipNetwork()) == null ? void 0 : b.id);
        await Ci(this.wagmiConfig, { connector: f, chainId: h });
      },
      reconnectExternal: async ({ id: u }) => {
        const d = n.connectors.find((p) => p.id === u);
        if (!d)
          throw new Error("connectionControllerClient:connectExternal - connector is undefined");
        await Q0(this.wagmiConfig, { connectors: [d] });
      },
      checkInstalled: (u) => {
        const d = this.getConnectors().find((p) => p.type === "INJECTED");
        return u ? d && window != null && window.ethereum ? u.some((p) => {
          var f;
          return !!((f = window.ethereum) != null && f[String(p)]);
        }) : !1 : !!window.ethereum;
      },
      disconnect: async () => {
        var u;
        if (await O0(this.wagmiConfig), (u = r == null ? void 0 : r.options) != null && u.signOutOnDisconnect) {
          const { SIWEController: d } = await import("./index-w--wEpYe.js");
          await d.signOut();
        }
      },
      signMessage: async (u) => K0(this.wagmiConfig, { message: u }),
      estimateGas: async (u) => {
        try {
          return await R0(this.wagmiConfig, {
            account: u.address,
            to: u.to,
            data: u.data,
            type: "legacy"
          });
        } catch {
          return 0n;
        }
      },
      sendTransaction: async (u) => {
        const { chainId: d } = Sn(this.wagmiConfig), p = {
          account: u.address,
          to: u.to,
          value: u.value,
          gas: u.gas,
          gasPrice: u.gasPrice,
          data: u.data,
          chainId: d,
          type: "legacy"
        };
        await q0(this.wagmiConfig, p);
        const f = await V0(this.wagmiConfig, p);
        return await ty(this.wagmiConfig, { hash: f, timeout: 25e3 }), f;
      },
      writeContract: async (u) => {
        var f;
        const d = ke.caipNetworkIdToNumber((f = this.getCaipNetwork()) == null ? void 0 : f.id);
        return await ny(n, {
          chainId: d,
          address: u.tokenAddress,
          abi: u.abi,
          functionName: u.method,
          args: [u.receiverAddress, u.tokenAmount]
        });
      },
      getEnsAddress: async (u) => {
        var d;
        try {
          const p = ke.caipNetworkIdToNumber((d = this.getCaipNetwork()) == null ? void 0 : d.id);
          let f = !1, h = !1;
          return u != null && u.endsWith(Ps.WC_NAME_SUFFIX) && (h = await this.resolveWalletConnectName(u)), p === dr.id && (f = await H0(this.wagmiConfig, {
            name: zi(u),
            chainId: p
          })), f || h || !1;
        } catch {
          return !1;
        }
      },
      getEnsAvatar: async (u) => {
        var f;
        const d = ke.caipNetworkIdToNumber((f = this.getCaipNetwork()) == null ? void 0 : f.id);
        return d !== dr.id ? !1 : await Ii(this.wagmiConfig, {
          name: zi(u),
          chainId: d
        }) || !1;
      },
      parseUnits: gs,
      formatUnits: ce
    };
    super({
      chain: Ps.CHAIN.EVM,
      networkControllerClient: c,
      connectionControllerClient: l,
      siweControllerClient: r,
      defaultChain: b2(s),
      tokens: Bd.getCaipTokens(a),
      _sdkVersion: o ?? `html-wagmi-${_.VERSION}`,
      ...i
    }), this.hasSyncedConnectedAccount = !1, this.options = void 0, this.chain = Ps.CHAIN.EVM, this.options = t, this.wagmiConfig = n, this.syncRequestedNetworks([...n.chains]), this.syncConnectors([...n.connectors]), this.initAuthConnectorListeners([...n.connectors]), ey(this.wagmiConfig, {
      onChange: (u) => this.syncConnectors(u)
    }), Y0(this.wagmiConfig, {
      onChange: (u) => this.syncAccount({ ...u })
    }), this.setEIP6963Enabled(i.enableEIP6963 !== !1), this.subscribeShouldUpdateToAddress((u) => {
      var d;
      if (u) {
        const f = (d = $0(this.wagmiConfig)[0]) == null ? void 0 : d.connector;
        f && J0(this.wagmiConfig, {
          connector: f
        }).then((h) => this.syncAccount({
          address: u,
          isConnected: !0,
          addresses: h.accounts,
          connector: f,
          chainId: h.chainId
        }));
      }
    });
  }
  getState() {
    const t = super.getState();
    return {
      ...t,
      selectedNetworkId: ke.caipNetworkIdToNumber(t.selectedNetworkId)
    };
  }
  subscribeState(t) {
    return super.subscribeState((n) => t({
      ...n,
      selectedNetworkId: ke.caipNetworkIdToNumber(n.selectedNetworkId)
    }));
  }
  syncRequestedNetworks(t) {
    const n = t == null ? void 0 : t.map((r) => {
      var s, a;
      return {
        id: `${_.EIP155}:${r.id}`,
        name: r.name,
        imageId: Ie.EIP155NetworkImageIds[r.id],
        imageUrl: (a = (s = this.options) == null ? void 0 : s.chainImages) == null ? void 0 : a[r.id]
      };
    });
    this.setRequestedCaipNetworks(n ?? []);
  }
  async syncAccount({ address: t, isConnected: n, chainId: r, connector: s, addresses: a }) {
    this.resetAccount(), this.syncNetwork(t, r, n);
    const o = (s == null ? void 0 : s.id) === _.AUTH_CONNECTOR_ID;
    if (n && t && r) {
      const i = `${_.EIP155}:${r}:${t}`;
      this.setIsConnected(n), this.setCaipAddress(i), await Promise.all([
        this.syncProfile(t, r),
        this.syncBalance(t, r),
        this.setApprovedCaipNetworksData()
      ]), s && this.syncConnectedWalletInfo(s), !o && (a != null && a.length) && this.setAllAccounts(a.map((c) => ({ address: c, type: "eoa" }))), this.hasSyncedConnectedAccount = !0;
    } else
      !n && this.hasSyncedConnectedAccount && (this.resetWcConnection(), this.resetNetwork(), this.setAllAccounts([]));
  }
  async syncNetwork(t, n, r) {
    var a, o, i, c;
    const s = this.wagmiConfig.chains.find((l) => l.id === n);
    if (s || n) {
      const l = (s == null ? void 0 : s.name) ?? (n == null ? void 0 : n.toString()), u = Number((s == null ? void 0 : s.id) ?? n), d = `${_.EIP155}:${u}`;
      if (this.setCaipNetwork({
        id: d,
        name: l,
        imageId: Ie.EIP155NetworkImageIds[u],
        imageUrl: (o = (a = this.options) == null ? void 0 : a.chainImages) == null ? void 0 : o[u],
        chain: this.chain
      }), r && t && n) {
        const p = `${_.EIP155}:${u}:${t}`;
        if (this.setCaipAddress(p), (c = (i = s == null ? void 0 : s.blockExplorers) == null ? void 0 : i.default) != null && c.url) {
          const f = `${s.blockExplorers.default.url}/address/${t}`;
          this.setAddressExplorerUrl(f);
        } else
          this.setAddressExplorerUrl(void 0);
        this.hasSyncedConnectedAccount && await this.syncBalance(t, n);
      }
    }
  }
  async syncWalletConnectName(t) {
    try {
      const n = await this.getWalletConnectName(t);
      if (n[0]) {
        const r = n[0];
        this.setProfileName(r.name);
      } else
        this.setProfileName(null);
    } catch {
      this.setProfileName(null);
    }
  }
  async syncProfile(t, n) {
    try {
      const { name: r, avatar: s } = await this.fetchIdentity({
        address: t
      });
      this.setProfileName(r), this.setProfileImage(s), r || await this.syncWalletConnectName(t);
    } catch {
      if (n === dr.id) {
        const r = await G0(this.wagmiConfig, { address: t, chainId: n });
        if (r) {
          this.setProfileName(r);
          const s = await Ii(this.wagmiConfig, {
            name: r,
            chainId: n
          });
          s && this.setProfileImage(s);
        } else
          await this.syncWalletConnectName(t), this.setProfileImage(null);
      } else
        await this.syncWalletConnectName(t), this.setProfileImage(null);
    }
  }
  async syncBalance(t, n) {
    var s, a, o;
    const r = this.wagmiConfig.chains.find((i) => i.id === n);
    if (r) {
      const i = await _0(this.wagmiConfig, {
        address: t,
        chainId: r.id,
        token: (o = (a = (s = this.options) == null ? void 0 : s.tokens) == null ? void 0 : a[r.id]) == null ? void 0 : o.address
      });
      this.setBalance(i.formatted, i.symbol);
      return;
    }
    this.setBalance(void 0, void 0);
  }
  async syncConnectedWalletInfo(t) {
    var n;
    if (!t)
      throw Error("syncConnectedWalletInfo - connector is undefined");
    if (t.id === _.WALLET_CONNECT_CONNECTOR_ID && t.getProvider) {
      const r = await t.getProvider();
      r.session && this.setConnectedWalletInfo({
        ...r.session.peer.metadata,
        name: r.session.peer.metadata.name,
        icon: (n = r.session.peer.metadata.icons) == null ? void 0 : n[0]
      }, this.chain);
    } else
      this.setConnectedWalletInfo({ name: t.name, icon: t.icon }, this.chain);
  }
  syncConnectors(t) {
    const n = /* @__PURE__ */ new Set(), r = t.filter((i) => !n.has(i.id) && n.add(i.id)), s = [], a = _.COINBASE_SDK_CONNECTOR_ID, o = r.find((i) => i.id === a);
    r.forEach(({ id: i, name: c, type: l, icon: u }) => {
      var f, h;
      o && i === _.CONNECTOR_RDNS_MAP[_.COINBASE_CONNECTOR_ID] || _.AUTH_CONNECTOR_ID === i || s.push({
        id: i,
        explorerId: Ie.ConnectorExplorerIds[i],
        imageUrl: ((h = (f = this.options) == null ? void 0 : f.connectorImages) == null ? void 0 : h[i]) ?? u,
        name: Ie.ConnectorNamesMap[i] ?? c,
        imageId: Ie.ConnectorImageIds[i],
        type: Ie.ConnectorTypesMap[l] ?? "EXTERNAL",
        info: {
          rdns: i
        },
        chain: this.chain
      });
    }), this.setConnectors(s), this.syncAuthConnector(r);
  }
  async syncAuthConnector(t) {
    const n = t.find(({ id: r }) => r === _.AUTH_CONNECTOR_ID);
    if (n) {
      const r = await n.getProvider();
      this.addConnector({
        id: _.AUTH_CONNECTOR_ID,
        type: "AUTH",
        name: "Auth",
        provider: r,
        email: n.email,
        socials: n.socials,
        showWallets: n.showWallets,
        chain: this.chain,
        walletFeatures: n.walletFeatures
      });
    }
  }
  async initAuthConnectorListeners(t) {
    const n = t.find(({ id: r }) => r === _.AUTH_CONNECTOR_ID);
    n && (await this.listenAuthConnector(n), await this.listenModal(n));
  }
  async listenAuthConnector(t) {
    if (typeof window < "u" && t) {
      super.setLoading(!0);
      const n = await t.getProvider(), r = n.getLoginEmailUsed();
      super.setLoading(r), r && this.setIsConnected(!1), n.onRpcRequest((s) => {
        if (Mn.checkIfRequestExists(s)) {
          if (!Mn.checkIfRequestIsAllowed(s))
            if (super.isOpen()) {
              if (super.isTransactionStackEmpty())
                return;
              super.isTransactionShouldReplaceView() ? super.replace("ApproveTransaction") : super.redirect("ApproveTransaction");
            } else
              super.open({ view: "ApproveTransaction" });
        } else {
          super.open();
          const a = Mn.getRequestMethod(s);
          console.error(Yo.RPC_METHOD_NOT_ALLOWED_MESSAGE, { method: a }), setTimeout(() => {
            this.showErrorMessage(Yo.RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
          }, 300), n.rejectRpcRequest();
        }
      }), n.onRpcResponse((s) => {
        switch (Mn.getResponseType(s)) {
          case ei.RPC_RESPONSE_TYPE_ERROR: {
            super.isOpen() && (super.isTransactionStackEmpty() ? super.close() : super.popTransactionStack(!0));
            break;
          }
          case ei.RPC_RESPONSE_TYPE_TX: {
            super.isTransactionStackEmpty() ? super.close() : super.popTransactionStack();
            break;
          }
        }
      }), n.onNotConnected(() => {
        this.getIsConnectedState() || (this.setIsConnected(!1), super.setLoading(!1));
      }), n.onIsConnected((s) => {
        this.setIsConnected(!0), this.setSmartAccountDeployed(!!s.smartAccountDeployed, this.chain), this.setPreferredAccountType(s.preferredAccountType, this.chain), super.setLoading(!1), this.setAllAccounts(s.accounts || [
          {
            address: s.address,
            type: s.preferredAccountType || "eoa"
          }
        ]);
      }), n.onGetSmartAccountEnabledNetworks((s) => {
        this.setSmartAccountEnabledNetworks(s);
      }), n.onSetPreferredAccount(({ address: s, type: a }) => {
        var o;
        s && (this.setPreferredAccountType(a, this.chain), this.syncAccount({
          address: s,
          isConnected: !0,
          chainId: ke.caipNetworkIdToNumber((o = this.getCaipNetwork()) == null ? void 0 : o.id),
          connector: t
        }));
      });
    }
  }
  async listenModal(t) {
    const n = await t.getProvider();
    this.subscribeState((r) => {
      r.open || n.rejectRpcRequest();
    });
  }
}
ks.type = "coinbaseWallet";
function ks(e = {}) {
  return e.version === "3" || e.headlessMode ? sx(e) : rx(e);
}
function rx(e) {
  let t, n, r, s, a;
  return (o) => ({
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    supportsSimulation: !0,
    type: ks.type,
    async connect({ chainId: i } = {}) {
      try {
        const c = await this.getProvider(), l = (await c.request({
          method: "eth_requestAccounts"
        })).map((d) => O(d));
        r || (r = this.onAccountsChanged.bind(this), c.on("accountsChanged", r)), s || (s = this.onChainChanged.bind(this), c.on("chainChanged", s)), a || (a = this.onDisconnect.bind(this), c.on("disconnect", a));
        let u = await this.getChainId();
        if (i && u !== i) {
          const d = await this.switchChain({ chainId: i }).catch((p) => {
            if (p.code === U.code)
              throw p;
            return { id: u };
          });
          u = (d == null ? void 0 : d.id) ?? u;
        }
        return { accounts: l, chainId: u };
      } catch (c) {
        throw /(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(c.message) ? new U(c) : c;
      }
    },
    async disconnect() {
      var c;
      const i = await this.getProvider();
      r && (i.removeListener("accountsChanged", r), r = void 0), s && (i.removeListener("chainChanged", s), s = void 0), a && (i.removeListener("disconnect", a), a = void 0), i.disconnect(), (c = i.close) == null || c.call(i);
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((c) => O(c));
    },
    async getChainId() {
      const c = await (await this.getProvider()).request({
        method: "eth_chainId"
      });
      return Number(c);
    },
    async getProvider() {
      if (!n) {
        const i = await (async () => {
          const { default: c } = await import("./index-C3olmUqo.js").then((l) => l.i);
          return typeof c != "function" && typeof c.default == "function" ? c.default : c;
        })();
        t = new i({
          ...e,
          appChainIds: o.chains.map((c) => c.id)
        }), n = t.makeWeb3Provider({
          ...e,
          options: e.preference ?? "all"
        });
      }
      return n;
    },
    async isAuthorized() {
      try {
        return !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: i, chainId: c }) {
      var d, p, f, h;
      const l = o.chains.find((m) => m.id === c);
      if (!l)
        throw new G(new at());
      const u = await this.getProvider();
      try {
        return await u.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: S(l.id) }]
        }), l;
      } catch (m) {
        if (m.code === 4902)
          try {
            let b;
            i != null && i.blockExplorerUrls ? b = i.blockExplorerUrls : b = (d = l.blockExplorers) != null && d.default.url ? [(p = l.blockExplorers) == null ? void 0 : p.default.url] : [];
            let y;
            (f = i == null ? void 0 : i.rpcUrls) != null && f.length ? y = i.rpcUrls : y = [((h = l.rpcUrls.default) == null ? void 0 : h.http[0]) ?? ""];
            const g = {
              blockExplorerUrls: b,
              chainId: S(c),
              chainName: (i == null ? void 0 : i.chainName) ?? l.name,
              iconUrls: i == null ? void 0 : i.iconUrls,
              nativeCurrency: (i == null ? void 0 : i.nativeCurrency) ?? l.nativeCurrency,
              rpcUrls: y
            };
            return await u.request({
              method: "wallet_addEthereumChain",
              params: [g]
            }), l;
          } catch (b) {
            throw new U(b);
          }
        throw new G(m);
      }
    },
    onAccountsChanged(i) {
      i.length === 0 ? this.onDisconnect() : o.emitter.emit("change", {
        accounts: i.map((c) => O(c))
      });
    },
    onChainChanged(i) {
      const c = Number(i);
      o.emitter.emit("change", { chainId: c });
    },
    async onDisconnect(i) {
      o.emitter.emit("disconnect");
      const c = await this.getProvider();
      r && (c.removeListener("accountsChanged", r), r = void 0), s && (c.removeListener("chainChanged", s), s = void 0), a && (c.removeListener("disconnect", a), a = void 0);
    }
  });
}
function sx(e) {
  let n, r, s, a, o;
  return (i) => ({
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    supportsSimulation: !0,
    type: ks.type,
    async connect({ chainId: c } = {}) {
      try {
        const l = await this.getProvider(), u = (await l.request({
          method: "eth_requestAccounts"
        })).map((p) => O(p));
        s || (s = this.onAccountsChanged.bind(this), l.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), l.on("chainChanged", a)), o || (o = this.onDisconnect.bind(this), l.on("disconnect", o));
        let d = await this.getChainId();
        if (c && d !== c) {
          const p = await this.switchChain({ chainId: c }).catch((f) => {
            if (f.code === U.code)
              throw f;
            return { id: d };
          });
          d = (p == null ? void 0 : p.id) ?? d;
        }
        return { accounts: u, chainId: d };
      } catch (l) {
        throw /(user closed modal|accounts received is empty|user denied account)/i.test(l.message) ? new U(l) : l;
      }
    },
    async disconnect() {
      const c = await this.getProvider();
      s && (c.removeListener("accountsChanged", s), s = void 0), a && (c.removeListener("chainChanged", a), a = void 0), o && (c.removeListener("disconnect", o), o = void 0), c.disconnect(), c.close();
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((l) => O(l));
    },
    async getChainId() {
      const l = await (await this.getProvider()).request({
        method: "eth_chainId"
      });
      return Number(l);
    },
    async getProvider() {
      var c;
      if (!r) {
        const l = await (async () => {
          const { default: h } = await import("./index-CzV9n6og.js").then((m) => m.i);
          return typeof h != "function" && typeof h.default == "function" ? h.default : h;
        })();
        n = new l({ reloadOnDisconnect: !1, ...e });
        const u = (c = n.walletExtension) == null ? void 0 : c.getChainId(), d = i.chains.find((h) => e.chainId ? h.id === e.chainId : h.id === u) || i.chains[0], p = e.chainId || (d == null ? void 0 : d.id), f = e.jsonRpcUrl || (d == null ? void 0 : d.rpcUrls.default.http[0]);
        r = n.makeWeb3Provider(f, p);
      }
      return r;
    },
    async isAuthorized() {
      try {
        return !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: c, chainId: l }) {
      var p, f, h, m;
      const u = i.chains.find((b) => b.id === l);
      if (!u)
        throw new G(new at());
      const d = await this.getProvider();
      try {
        return await d.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: S(u.id) }]
        }), u;
      } catch (b) {
        if (b.code === 4902)
          try {
            let y;
            c != null && c.blockExplorerUrls ? y = c.blockExplorerUrls : y = (p = u.blockExplorers) != null && p.default.url ? [(f = u.blockExplorers) == null ? void 0 : f.default.url] : [];
            let g;
            (h = c == null ? void 0 : c.rpcUrls) != null && h.length ? g = c.rpcUrls : g = [((m = u.rpcUrls.default) == null ? void 0 : m.http[0]) ?? ""];
            const A = {
              blockExplorerUrls: y,
              chainId: S(l),
              chainName: (c == null ? void 0 : c.chainName) ?? u.name,
              iconUrls: c == null ? void 0 : c.iconUrls,
              nativeCurrency: (c == null ? void 0 : c.nativeCurrency) ?? u.nativeCurrency,
              rpcUrls: g
            };
            return await d.request({
              method: "wallet_addEthereumChain",
              params: [A]
            }), u;
          } catch (y) {
            throw new U(y);
          }
        throw new G(b);
      }
    },
    onAccountsChanged(c) {
      c.length === 0 ? this.onDisconnect() : i.emitter.emit("change", {
        accounts: c.map((l) => O(l))
      });
    },
    onChainChanged(c) {
      const l = Number(c);
      i.emitter.emit("change", { chainId: l });
    },
    async onDisconnect(c) {
      i.emitter.emit("disconnect");
      const l = await this.getProvider();
      s && (l.removeListener("accountsChanged", s), s = void 0), a && (l.removeListener("chainChanged", a), a = void 0), o && (l.removeListener("disconnect", o), o = void 0);
    }
  });
}
Go.type = "walletConnect";
function Go(e) {
  const t = e.isNewChainsStale ?? !0;
  let n, r;
  const s = "eip155";
  let a, o, i, c, l, u;
  return (d) => ({
    id: "walletConnect",
    name: "WalletConnect",
    type: Go.type,
    async setup() {
      const p = await this.getProvider().catch(() => null);
      p && (i || (i = this.onConnect.bind(this), p.on("connect", i)), l || (l = this.onSessionDelete.bind(this), p.on("session_delete", l)));
    },
    async connect({ chainId: p, ...f } = {}) {
      var h, m;
      try {
        const b = await this.getProvider();
        if (!b)
          throw new Ne();
        c || (c = this.onDisplayUri, b.on("display_uri", c));
        let y = p;
        if (!y) {
          const x = await ((h = d.storage) == null ? void 0 : h.getItem("state")) ?? {};
          d.chains.some((I) => I.id === x.chainId) ? y = x.chainId : y = (m = d.chains[0]) == null ? void 0 : m.id;
        }
        if (!y)
          throw new Error("No chains found on connector.");
        const g = await this.isChainsStale();
        if (b.session && g && await b.disconnect(), !b.session || g) {
          const x = d.chains.filter((C) => C.id !== y).map((C) => C.id);
          await b.connect({
            optionalChains: [y, ...x],
            ..."pairingTopic" in f ? { pairingTopic: f.pairingTopic } : {}
          }), this.setRequestedChainsIds(d.chains.map((C) => C.id));
        }
        const A = (await b.enable()).map((x) => O(x)), v = await this.getChainId();
        return c && (b.removeListener("display_uri", c), c = void 0), i && (b.removeListener("connect", i), i = void 0), a || (a = this.onAccountsChanged.bind(this), b.on("accountsChanged", a)), o || (o = this.onChainChanged.bind(this), b.on("chainChanged", o)), u || (u = this.onDisconnect.bind(this), b.on("disconnect", u)), l || (l = this.onSessionDelete.bind(this), b.on("session_delete", l)), { accounts: A, chainId: v };
      } catch (b) {
        throw /(user rejected|connection request reset)/i.test(b == null ? void 0 : b.message) ? new U(b) : b;
      }
    },
    async disconnect() {
      const p = await this.getProvider();
      try {
        await (p == null ? void 0 : p.disconnect());
      } catch (f) {
        if (!/No matching key/i.test(f.message))
          throw f;
      } finally {
        o && (p == null || p.removeListener("chainChanged", o), o = void 0), u && (p == null || p.removeListener("disconnect", u), u = void 0), i || (i = this.onConnect.bind(this), p == null || p.on("connect", i)), a && (p == null || p.removeListener("accountsChanged", a), a = void 0), l && (p == null || p.removeListener("session_delete", l), l = void 0), this.setRequestedChainsIds([]);
      }
    },
    async getAccounts() {
      return (await this.getProvider()).accounts.map((f) => O(f));
    },
    async getProvider({ chainId: p } = {}) {
      var h;
      async function f() {
        const m = d.chains.map((y) => y.id);
        if (!m.length)
          return;
        const { EthereumProvider: b } = await import("./client-CWmvRiz4.js").then((y) => y.bp);
        return await b.init({
          ...e,
          disableProviderPing: !0,
          optionalChains: m,
          projectId: e.projectId,
          rpcMap: Object.fromEntries(d.chains.map((y) => [
            y.id,
            y.rpcUrls.default.http[0]
          ])),
          showQrModal: e.showQrModal ?? !0
        });
      }
      return n || (r || (r = f()), n = await r, n == null || n.events.setMaxListeners(Number.POSITIVE_INFINITY)), p && await ((h = this.switchChain) == null ? void 0 : h.call(this, { chainId: p })), n;
    },
    async getChainId() {
      return (await this.getProvider()).chainId;
    },
    async isAuthorized() {
      try {
        const [p, f] = await Promise.all([
          this.getAccounts(),
          this.getProvider()
        ]);
        return p.length ? await this.isChainsStale() && f.session ? (await f.disconnect().catch(() => {
        }), !1) : !0 : !1;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: p, chainId: f }) {
      var b, y, g;
      const h = await this.getProvider();
      if (!h)
        throw new Ne();
      const m = d.chains.find((A) => A.id === f);
      if (!m)
        throw new G(new at());
      try {
        await Promise.all([
          new Promise((v) => {
            const x = ({ chainId: C }) => {
              C === f && (d.emitter.off("change", x), v());
            };
            d.emitter.on("change", x);
          }),
          h.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: S(f) }]
          })
        ]);
        const A = await this.getRequestedChainsIds();
        return this.setRequestedChainsIds([...A, f]), m;
      } catch (A) {
        const v = A;
        if (/(user rejected)/i.test(v.message))
          throw new U(v);
        try {
          let x;
          p != null && p.blockExplorerUrls ? x = p.blockExplorerUrls : x = (b = m.blockExplorers) != null && b.default.url ? [(y = m.blockExplorers) == null ? void 0 : y.default.url] : [];
          let C;
          (g = p == null ? void 0 : p.rpcUrls) != null && g.length ? C = p.rpcUrls : C = [...m.rpcUrls.default.http];
          const I = {
            blockExplorerUrls: x,
            chainId: S(f),
            chainName: (p == null ? void 0 : p.chainName) ?? m.name,
            iconUrls: p == null ? void 0 : p.iconUrls,
            nativeCurrency: (p == null ? void 0 : p.nativeCurrency) ?? m.nativeCurrency,
            rpcUrls: C
          };
          await h.request({
            method: "wallet_addEthereumChain",
            params: [I]
          });
          const E = await this.getRequestedChainsIds();
          return this.setRequestedChainsIds([...E, f]), m;
        } catch (x) {
          throw new U(x);
        }
      }
    },
    onAccountsChanged(p) {
      p.length === 0 ? this.onDisconnect() : d.emitter.emit("change", {
        accounts: p.map((f) => O(f))
      });
    },
    onChainChanged(p) {
      const f = Number(p);
      d.emitter.emit("change", { chainId: f });
    },
    async onConnect(p) {
      const f = Number(p.chainId), h = await this.getAccounts();
      d.emitter.emit("connect", { accounts: h, chainId: f });
    },
    async onDisconnect(p) {
      this.setRequestedChainsIds([]), d.emitter.emit("disconnect");
      const f = await this.getProvider();
      a && (f.removeListener("accountsChanged", a), a = void 0), o && (f.removeListener("chainChanged", o), o = void 0), u && (f.removeListener("disconnect", u), u = void 0), l && (f.removeListener("session_delete", l), l = void 0), i || (i = this.onConnect.bind(this), f.on("connect", i));
    },
    onDisplayUri(p) {
      d.emitter.emit("message", { type: "display_uri", data: p });
    },
    onSessionDelete() {
      this.onDisconnect();
    },
    getNamespaceChainsIds() {
      var f, h, m;
      return n ? ((m = (h = (f = n.session) == null ? void 0 : f.namespaces[s]) == null ? void 0 : h.accounts) == null ? void 0 : m.map((b) => Number.parseInt(b.split(":")[1] || ""))) ?? [] : [];
    },
    async getRequestedChainsIds() {
      var p;
      return await ((p = d.storage) == null ? void 0 : p.getItem(this.requestedChainsStorageKey)) ?? [];
    },
    /**
     * Checks if the target chains match the chains that were
     * initially requested by the connector for the WalletConnect session.
     * If there is a mismatch, this means that the chains on the connector
     * are considered stale, and need to be revalidated at a later point (via
     * connection).
     *
     * There may be a scenario where a dapp adds a chain to the
     * connector later on, however, this chain will not have been approved or rejected
     * by the wallet. In this case, the chain is considered stale.
     */
    async isChainsStale() {
      if (!t)
        return !1;
      const p = d.chains.map((m) => m.id), f = this.getNamespaceChainsIds();
      if (f.length && !f.some((m) => p.includes(m)))
        return !1;
      const h = await this.getRequestedChainsIds();
      return !p.every((m) => h.includes(m));
    },
    async setRequestedChainsIds(p) {
      var f;
      await ((f = d.storage) == null ? void 0 : f.setItem(this.requestedChainsStorageKey, p));
    },
    get requestedChainsStorageKey() {
      return `${this.id}.requestedChains`;
    }
  });
}
function cd(e) {
  return (t) => ({
    id: _.AUTH_CONNECTOR_ID,
    name: "Web3Modal Auth",
    type: "w3mAuth",
    socials: e.socials,
    email: e.email,
    showWallets: e.showWallets,
    walletFeatures: e.walletFeatures,
    async connect(n = {}) {
      const r = await this.getProvider(), { address: s, chainId: a } = await r.connect({ chainId: n.chainId });
      return await r.getSmartAccountEnabledNetworks(), {
        accounts: [s],
        account: s,
        chainId: a,
        chain: {
          id: a,
          unsuported: !1
        }
      };
    },
    async disconnect() {
      await (await this.getProvider()).disconnect();
    },
    async getAccounts() {
      const n = await this.getProvider(), { address: r } = await n.connect();
      return t.emitter.emit("change", { accounts: [r] }), [r];
    },
    async getProvider() {
      return this.provider || (this.provider = new Md(e.options.projectId)), Promise.resolve(this.provider);
    },
    async getChainId() {
      const n = await this.getProvider(), { chainId: r } = await n.getChainId();
      return r;
    },
    async isAuthorized() {
      const n = await this.getProvider(), { isConnected: r } = await n.isConnected();
      return r;
    },
    async switchChain({ chainId: n }) {
      try {
        const r = t.chains.find((a) => a.id === n);
        if (!r)
          throw new G(new Error("chain not found on connector."));
        return await (await this.getProvider()).switchNetwork(n), t.emitter.emit("change", { chainId: Number(n) }), r;
      } catch (r) {
        throw r instanceof Error ? new G(r) : r;
      }
    },
    onAccountsChanged(n) {
      n.length === 0 ? this.onDisconnect() : t.emitter.emit("change", { accounts: n.map(O) });
    },
    onChainChanged(n) {
      const r = Number(n);
      t.emitter.emit("change", { chainId: r });
    },
    async onConnect(n) {
      const r = Number(n.chainId), s = await this.getAccounts();
      t.emitter.emit("connect", { accounts: s, chainId: r });
    },
    async onDisconnect(n) {
      await (await this.getProvider()).disconnect();
    }
  });
}
function ax({ projectId: e, chains: t, metadata: n, enableCoinbase: r, enableInjected: s, auth: a = {}, enableWalletConnect: o, enableEIP6963: i, ...c }) {
  const l = (c == null ? void 0 : c.connectors) ?? [], u = t.map((h) => [h, g2({ chain: h, projectId: e })]), d = Object.fromEntries(u), p = {
    email: !0,
    showWallets: !0,
    walletFeatures: !0
  };
  o !== !1 && l.push(Go({ projectId: e, metadata: n, showQrModal: !1 })), s !== !1 && l.push(xs({ shimDisconnect: !0 })), r !== !1 && l.push(ks({
    version: "4",
    appName: (n == null ? void 0 : n.name) ?? "Unknown",
    appLogoUrl: (n == null ? void 0 : n.icons[0]) ?? "Unknown",
    preference: c.coinbasePreference || "all"
  }));
  const f = {
    ...p,
    ...a
  };
  return (f.email || f.socials) && l.push(cd({
    chains: [...t],
    options: { projectId: e },
    socials: f.socials,
    email: f.email,
    showWallets: f.showWallets,
    walletFeatures: f.walletFeatures
  })), xy({
    chains: t,
    multiInjectedProviderDiscovery: i !== !1,
    transports: d,
    ...c,
    connectors: l
  });
}
function ox(e) {
  return cd({
    email: !0,
    showWallets: !0,
    walletFeatures: !0,
    ...e
  });
}
function ix(e) {
  return new nx({ ...e, _sdkVersion: `html-wagmi-${_.VERSION}` });
}
const OA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  authConnector: ox,
  createWeb3Modal: ix,
  defaultWagmiConfig: ax
}, Symbol.toStringTag, { value: "Module" }));
function R(e, t, n) {
  const r = e[t.name];
  if (typeof r == "function")
    return r;
  const s = e[n];
  return typeof s == "function" ? s : (a) => t(e, a);
}
async function cx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Ve, "call")(r);
}
const en = "2.11.6", lx = () => `@wagmi/core@${en}`;
var ld = function(e, t, n, r) {
  if (n === "a" && !r)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, jr, ud;
class fe extends Error {
  get docsBaseUrl() {
    return "https://wagmi.sh/core";
  }
  get version() {
    return lx();
  }
  constructor(t, n = {}) {
    var a;
    super(), jr.add(this), Object.defineProperty(this, "details", {
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
      value: "WagmiCoreError"
    });
    const r = n.cause instanceof fe ? n.cause.details : (a = n.cause) != null && a.message ? n.cause.message : n.details, s = n.cause instanceof fe && n.cause.docsPath || n.docsPath;
    this.message = [
      t || "An error occurred.",
      "",
      ...n.metaMessages ? [...n.metaMessages, ""] : [],
      ...s ? [
        `Docs: ${this.docsBaseUrl}${s}.html${n.docsSlug ? `#${n.docsSlug}` : ""}`
      ] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: ${this.version}`
    ].join(`
`), n.cause && (this.cause = n.cause), this.details = r, this.docsPath = s, this.metaMessages = n.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return ld(this, jr, "m", ud).call(this, this, t);
  }
}
jr = /* @__PURE__ */ new WeakSet(), ud = function e(t, n) {
  return n != null && n(t) ? t : t.cause ? ld(this, jr, "m", e).call(this, t.cause, n) : t;
};
class xe extends fe {
  constructor() {
    super("Chain not configured."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainNotConfiguredError"
    });
  }
}
class dd extends fe {
  constructor() {
    super("Connector already connected."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorAlreadyConnectedError"
    });
  }
}
class Es extends fe {
  constructor() {
    super("Connector not connected."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorNotConnectedError"
    });
  }
}
class ux extends fe {
  constructor() {
    super("Connector not found."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorNotFoundError"
    });
  }
}
class pd extends fe {
  constructor({ address: t, connector: n }) {
    super(`Account "${t}" not found for connector "${n.name}".`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorAccountNotFoundError"
    });
  }
}
class fd extends fe {
  constructor({ connectionChainId: t, connectorChainId: n }) {
    super(`The current chain of the connector (id: ${n}) does not match the connection's chain (id: ${t}).`, {
      metaMessages: [
        `Current Chain ID:  ${n}`,
        `Expected Chain ID: ${t}`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ConnectorChainMismatchError"
    });
  }
}
async function dx(e, t) {
  var r;
  let n;
  if (typeof t.connector == "function" ? n = e._internal.connectors.setup(t.connector) : n = t.connector, n.uid === e.state.current)
    throw new dd();
  try {
    e.setState((o) => ({ ...o, status: "connecting" })), n.emitter.emit("message", { type: "connecting" });
    const s = await n.connect({ chainId: t.chainId }), a = s.accounts;
    return n.emitter.off("connect", e._internal.events.connect), n.emitter.on("change", e._internal.events.change), n.emitter.on("disconnect", e._internal.events.disconnect), await ((r = e.storage) == null ? void 0 : r.setItem("recentConnectorId", n.id)), e.setState((o) => ({
      ...o,
      connections: new Map(o.connections).set(n.uid, {
        accounts: a,
        chainId: s.chainId,
        connector: n
      }),
      current: n.uid,
      status: "connected"
    })), { accounts: a, chainId: s.chainId };
  } catch (s) {
    throw e.setState((a) => ({
      ...a,
      // Keep existing connector connected in case of error
      status: a.current ? "connected" : "disconnected"
    })), s;
  }
}
async function Fe(e, t = {}) {
  let n;
  if (t.connector) {
    const { connector: l } = t, [u, d] = await Promise.all([
      l.getAccounts(),
      l.getChainId()
    ]);
    n = {
      accounts: u,
      chainId: d,
      connector: l
    };
  } else
    n = e.state.connections.get(e.state.current);
  if (!n)
    throw new Es();
  const r = t.chainId ?? n.chainId, s = await n.connector.getChainId();
  if (s !== n.chainId)
    throw new fd({
      connectionChainId: n.chainId,
      connectorChainId: s
    });
  const a = n.connector;
  if (a.getClient)
    return a.getClient({ chainId: r });
  const o = ae(t.account ?? n.accounts[0]);
  o.address = O(o.address);
  const i = e.chains.find((l) => l.id === r), c = await n.connector.getProvider({ chainId: r });
  if (t.account && !n.accounts.some((l) => l.toLowerCase() === o.address.toLowerCase()))
    throw new pd({
      address: o.address,
      connector: a
    });
  return We({
    account: o,
    chain: i,
    name: "Connector Client",
    transport: (l) => En(c)({ ...l, retryCount: 0 })
  });
}
async function px(e, t) {
  const { account: n, chainId: r, connector: s, ...a } = t;
  let o;
  return typeof n == "object" && n.type === "local" ? o = e.getClient({ chainId: r }) : o = await Fe(e, { account: n, chainId: r, connector: s }), await R(o, Wc, "deployContract")({
    ...a,
    ...n ? { account: n } : {},
    chain: r ? { id: r } : null
  });
}
async function fx(e, t = {}) {
  var s, a;
  let n;
  if (t.connector)
    n = t.connector;
  else {
    const { connections: o, current: i } = e.state, c = o.get(i);
    n = c == null ? void 0 : c.connector;
  }
  const r = e.state.connections;
  n && (await n.disconnect(), n.emitter.off("change", e._internal.events.change), n.emitter.off("disconnect", e._internal.events.disconnect), n.emitter.on("connect", e._internal.events.connect), r.delete(n.uid)), e.setState((o) => {
    if (r.size === 0)
      return {
        ...o,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      };
    const i = r.values().next().value;
    return {
      ...o,
      connections: new Map(r),
      current: i.connector.uid
    };
  });
  {
    const o = e.state.current;
    if (!o)
      return;
    const i = (s = e.state.connections.get(o)) == null ? void 0 : s.connector;
    if (!i)
      return;
    await ((a = e.storage) == null ? void 0 : a.setItem("recentConnectorId", i.id));
  }
}
async function hx(e, t) {
  const { chainId: n, connector: r, ...s } = t;
  let a;
  t.account ? a = t.account : a = (await Fe(e, {
    account: t.account,
    chainId: n,
    connector: r
  })).account;
  const o = e.getClient({ chainId: n });
  return R(o, ct, "estimateGas")({ ...s, account: a });
}
function un(e) {
  return typeof e == "number" ? e : e === "wei" ? 0 : Math.abs(Ra[e]);
}
async function mx(e, t = {}) {
  const { chainId: n, formatUnits: r = "gwei", ...s } = t, a = e.getClient({ chainId: n }), o = R(a, Rc, "estimateFeesPerGas"), { gasPrice: i, maxFeePerGas: c, maxPriorityFeePerGas: l } = await o({
    ...s,
    chain: a.chain
  }), u = un(r);
  return {
    formatted: {
      gasPrice: i ? ce(i, u) : void 0,
      maxFeePerGas: c ? ce(c, u) : void 0,
      maxPriorityFeePerGas: l ? ce(l, u) : void 0
    },
    gasPrice: i,
    maxFeePerGas: c,
    maxPriorityFeePerGas: l
  };
}
async function bx(e, t = {}) {
  const { chainId: n } = t, r = e.getClient({ chainId: n });
  return R(r, Dc, "estimateMaxPriorityFeePerGas")({ chain: r.chain });
}
function Tn(e) {
  const t = e.state.current, n = e.state.connections.get(t), r = n == null ? void 0 : n.accounts, s = r == null ? void 0 : r[0], a = e.chains.find((i) => i.id === (n == null ? void 0 : n.chainId)), o = e.state.status;
  switch (o) {
    case "connected":
      return {
        address: s,
        addresses: r,
        chain: a,
        chainId: n == null ? void 0 : n.chainId,
        connector: n == null ? void 0 : n.connector,
        isConnected: !0,
        isConnecting: !1,
        isDisconnected: !1,
        isReconnecting: !1,
        status: o
      };
    case "reconnecting":
      return {
        address: s,
        addresses: r,
        chain: a,
        chainId: n == null ? void 0 : n.chainId,
        connector: n == null ? void 0 : n.connector,
        isConnected: !!s,
        isConnecting: !1,
        isDisconnected: !1,
        isReconnecting: !0,
        status: o
      };
    case "connecting":
      return {
        address: s,
        addresses: r,
        chain: a,
        chainId: n == null ? void 0 : n.chainId,
        connector: n == null ? void 0 : n.connector,
        isConnected: !1,
        isConnecting: !0,
        isDisconnected: !1,
        isReconnecting: !1,
        status: o
      };
    case "disconnected":
      return {
        address: void 0,
        addresses: void 0,
        chain: void 0,
        chainId: void 0,
        connector: void 0,
        isConnected: !1,
        isConnecting: !1,
        isDisconnected: !0,
        isReconnecting: !1,
        status: o
      };
  }
}
async function hd(e, t) {
  const { allowFailure: n = !0, chainId: r, contracts: s, ...a } = t, o = e.getClient({ chainId: r });
  return R(o, yo, "multicall")({
    allowFailure: n,
    contracts: s,
    ...a
  });
}
function md(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, de, "readContract")(r);
}
async function Lr(e, t) {
  var i;
  const { allowFailure: n = !0, blockNumber: r, blockTag: s, ...a } = t, o = t.contracts;
  try {
    const c = {};
    for (const [p, f] of o.entries()) {
      const h = f.chainId ?? e.state.chainId;
      c[h] || (c[h] = []), (i = c[h]) == null || i.push({ contract: f, index: p });
    }
    const l = () => Object.entries(c).map(([p, f]) => hd(e, {
      ...a,
      allowFailure: n,
      blockNumber: r,
      blockTag: s,
      chainId: Number.parseInt(p),
      contracts: f.map(({ contract: h }) => h)
    })), u = (await Promise.all(l())).flat(), d = Object.values(c).flatMap((p) => p.map(({ index: f }) => f));
    return u.reduce((p, f, h) => (p && (p[d[h]] = f), p), []);
  } catch (c) {
    if (c instanceof Se)
      throw c;
    const l = () => o.map((u) => md(e, { ...u, blockNumber: r, blockTag: s }));
    return n ? (await Promise.allSettled(l())).map((u) => u.status === "fulfilled" ? { result: u.value, status: "success" } : { error: u.reason, result: void 0, status: "failure" }) : await Promise.all(l());
  }
}
async function ji(e, t) {
  const { address: n, blockNumber: r, blockTag: s, chainId: a, token: o, unit: i = "ether" } = t;
  if (o)
    try {
      return Li(e, {
        balanceAddress: n,
        chainId: a,
        symbolType: "string",
        tokenAddress: o
      });
    } catch (p) {
      if (p instanceof Se) {
        const f = await Li(e, {
          balanceAddress: n,
          chainId: a,
          symbolType: "bytes32",
          tokenAddress: o
        }), h = Re(Z(f.symbol, { dir: "right" }));
        return { ...f, symbol: h };
      }
      throw p;
    }
  const c = e.getClient({ chainId: a }), u = await R(c, po, "getBalance")(r ? { address: n, blockNumber: r } : { address: n, blockTag: s }), d = e.chains.find((p) => p.id === a) ?? c.chain;
  return {
    decimals: d.nativeCurrency.decimals,
    formatted: ce(u, un(i)),
    symbol: d.nativeCurrency.symbol,
    value: u
  };
}
async function Li(e, t) {
  const { balanceAddress: n, chainId: r, symbolType: s, tokenAddress: a, unit: o } = t, i = {
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ type: "address" }],
        outputs: [{ type: "uint256" }]
      },
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: s }]
      }
    ],
    address: a
  }, [c, l, u] = await Lr(e, {
    allowFailure: !1,
    contracts: [
      {
        ...i,
        functionName: "balanceOf",
        args: [n],
        chainId: r
      },
      { ...i, functionName: "decimals", chainId: r },
      { ...i, functionName: "symbol", chainId: r }
    ]
  }), d = ce(c ?? "0", un(o ?? l));
  return { decimals: l, formatted: d, symbol: u, value: c };
}
async function yx(e, t = {}) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return {
    ...await R(s, Ue, "getBlock")(r),
    chainId: s.chain.id
  };
}
function _i(e, t = {}) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, _t, "getBlockNumber")(r);
}
function wx(e, t = {}) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Rl, "getBlockTransactionCount")(r);
}
async function gx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Tr, "getBytecode")(r);
}
function vx(e) {
  return e.state.chainId;
}
function He(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    let n, r;
    if (Array.isArray(e) && Array.isArray(t)) {
      if (n = e.length, n !== t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!He(e[r], t[r]))
          return !1;
      return !0;
    }
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    const s = Object.keys(e);
    if (n = s.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = s[r];
      if (a && !He(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
let Qs = [];
function Cx(e) {
  const t = e.chains;
  return He(Qs, t) ? Qs : (Qs = t, t);
}
function qo(e, t = {}) {
  let n;
  try {
    n = e.getClient(t);
  } catch {
  }
  return n;
}
let ar = [];
function bd(e) {
  const t = [...e.state.connections.values()];
  return e.state.status === "reconnecting" || He(ar, t) ? ar : (ar = t, t);
}
let Vs = [];
function xx(e) {
  const t = e.connectors;
  return He(Vs, t) ? Vs : (Vs = t, t);
}
function $i(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, ao, "getEnsAddress")(r);
}
function Hi(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, co, "getEnsAvatar")(r);
}
function Gi(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, lo, "getEnsName")(r);
}
function qi(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Ml, "getEnsResolver")(r);
}
function Ax(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, io, "getEnsText")(r);
}
function kx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, zl, "getFeeHistory")(r);
}
function Ex(e, t = {}) {
  const { chainId: n } = t, r = e.getClient({ chainId: n });
  return R(r, es, "getGasPrice")({});
}
async function Ix(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Cu, "getProof")(r);
}
function yd(e, t = {}) {
  const n = qo(e, t);
  return n == null ? void 0 : n.extend(zo);
}
async function Sx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, jl, "getStorageAt")(r);
}
async function Qi(e, t) {
  const { address: n, chainId: r, formatUnits: s = 18 } = t;
  function a(o) {
    return [
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }]
      },
      {
        type: "function",
        name: "name",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: o }]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: o }]
      },
      {
        type: "function",
        name: "totalSupply",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }]
      }
    ];
  }
  try {
    const o = a("string"), i = { address: n, abi: o, chainId: r }, [c, l, u, d] = await Lr(e, {
      allowFailure: !0,
      contracts: [
        { ...i, functionName: "decimals" },
        { ...i, functionName: "name" },
        { ...i, functionName: "symbol" },
        { ...i, functionName: "totalSupply" }
      ]
    });
    if (l.error instanceof Se)
      throw l.error;
    if (u.error instanceof Se)
      throw u.error;
    if (c.error)
      throw c.error;
    if (d.error)
      throw d.error;
    return {
      address: n,
      decimals: c.result,
      name: l.result,
      symbol: u.result,
      totalSupply: {
        formatted: ce(d.result, un(s)),
        value: d.result
      }
    };
  } catch (o) {
    if (o instanceof Se) {
      const i = a("bytes32"), c = { address: n, abi: i, chainId: r }, [l, u, d, p] = await Lr(e, {
        allowFailure: !1,
        contracts: [
          { ...c, functionName: "decimals" },
          { ...c, functionName: "name" },
          { ...c, functionName: "symbol" },
          { ...c, functionName: "totalSupply" }
        ]
      });
      return {
        address: n,
        decimals: l,
        name: Re(Z(u, { dir: "right" })),
        symbol: Re(Z(d, { dir: "right" })),
        totalSupply: {
          formatted: ce(p, un(s)),
          value: p
        }
      };
    }
    throw o;
  }
}
function Vi(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, $t, "getTransaction")(r);
}
function Tx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Ll, "getTransactionConfirmations")(r);
}
async function Px(e, t) {
  const { address: n, blockNumber: r, blockTag: s, chainId: a } = t, o = e.getClient({ chainId: a });
  return R(o, ts, "getTransactionCount")(r ? { address: n, blockNumber: r } : { address: n, blockTag: s });
}
async function Bx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Pr, "getTransactionReceipt")(r);
}
async function Ux(e, t = {}) {
  const n = await Fe(e, t);
  return n.extend(Fr), n.extend(Fr);
}
async function Mx(e, t) {
  const { account: n, chainId: r, ...s } = t, a = n ?? Tn(e).address, o = e.getClient({ chainId: r });
  return R(o, jt, "prepareTransactionRequest")({
    ...s,
    ...a ? { account: a } : {}
  });
}
let Ks = !1;
async function wd(e, t = {}) {
  var l, u;
  if (Ks)
    return [];
  Ks = !0, e.setState((d) => ({
    ...d,
    status: d.current ? "reconnecting" : "connecting"
  }));
  const n = [];
  if ((l = t.connectors) != null && l.length)
    for (const d of t.connectors) {
      let p;
      typeof d == "function" ? p = e._internal.connectors.setup(d) : p = d, n.push(p);
    }
  else
    n.push(...e.connectors);
  let r;
  try {
    r = await ((u = e.storage) == null ? void 0 : u.getItem("recentConnectorId"));
  } catch {
  }
  const s = {};
  for (const [, d] of e.state.connections)
    s[d.connector.id] = 1;
  r && (s[r] = 0);
  const a = Object.keys(s).length > 0 ? (
    // .toSorted()
    [...n].sort((d, p) => (s[d.id] ?? 10) - (s[p.id] ?? 10))
  ) : n;
  let o = !1;
  const i = [], c = [];
  for (const d of a) {
    const p = await d.getProvider().catch(() => {
    });
    if (!p || c.some((m) => m === p) || !await d.isAuthorized())
      continue;
    const h = await d.connect({ isReconnecting: !0 }).catch(() => null);
    h && (d.emitter.off("connect", e._internal.events.connect), d.emitter.on("change", e._internal.events.change), d.emitter.on("disconnect", e._internal.events.disconnect), e.setState((m) => {
      const b = new Map(o ? m.connections : /* @__PURE__ */ new Map()).set(d.uid, { accounts: h.accounts, chainId: h.chainId, connector: d });
      return {
        ...m,
        current: o ? m.current : d.uid,
        connections: b
      };
    }), i.push({
      accounts: h.accounts,
      chainId: h.chainId,
      connector: d
    }), c.push(p), o = !0);
  }
  return (e.state.status === "reconnecting" || e.state.status === "connecting") && (o ? e.setState((d) => ({ ...d, status: "connected" })) : e.setState((d) => ({
    ...d,
    connections: /* @__PURE__ */ new Map(),
    current: null,
    status: "disconnected"
  }))), Ks = !1, i;
}
async function Fx(e, t) {
  const { account: n, chainId: r, connector: s, gas: a, ...o } = t;
  let i;
  typeof n == "object" && n.type === "local" ? i = e.getClient({ chainId: r }) : i = await Fe(e, { account: n, chainId: r, connector: s });
  const { connector: c } = Tn(e), l = await (async () => {
    var p;
    if (!(!("data" in t) || !t.data) && !((p = s ?? c) != null && p.supportsSimulation) && a !== null)
      return a === void 0 ? R(i, ct, "estimateGas")({
        ...o,
        account: n,
        chain: r ? { id: r } : null
      }) : a;
  })();
  return await R(i, gn, "sendTransaction")({
    ...o,
    ...n ? { account: n } : {},
    gas: l,
    chain: r ? { id: r } : null
  });
}
async function Nx(e, t) {
  const { account: n, connector: r, ...s } = t;
  let a;
  return typeof n == "object" && n.type === "local" ? a = e.getClient() : a = await Fe(e, { account: n, connector: r }), R(a, Fo, "signMessage")({
    ...s,
    ...n ? { account: n } : {}
  });
}
async function Dx(e, t) {
  const { account: n, connector: r, ...s } = t;
  let a;
  return typeof n == "object" && n.type === "local" ? a = e.getClient() : a = await Fe(e, { account: n, connector: r }), R(a, xu, "signTypedData")({
    ...s,
    ...n ? { account: n } : {}
  });
}
async function gd(e, t) {
  const { abi: n, chainId: r, connector: s, ...a } = t;
  let o;
  t.account ? o = t.account : o = (await Fe(e, {
    chainId: r,
    connector: s
  })).account;
  const i = e.getClient({ chainId: r }), c = R(i, vs, "simulateContract"), { result: l, request: u } = await c({ ...a, abi: n, account: o });
  return {
    chainId: i.chain.id,
    result: l,
    request: { __mode: "prepared", ...u, chainId: r }
  };
}
async function Ox(e, t) {
  var s;
  const { connector: n } = t, r = e.state.connections.get(n.uid);
  if (!r)
    throw new Es();
  return await ((s = e.storage) == null ? void 0 : s.setItem("recentConnectorId", n.id)), e.setState((a) => ({
    ...a,
    current: n.uid
  })), {
    accounts: r.accounts,
    chainId: r.chainId
  };
}
class oe extends fe {
  constructor() {
    super("Provider not found."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderNotFoundError"
    });
  }
}
class vd extends fe {
  constructor({ connector: t }) {
    super(`"${t.name}" does not support programmatic chain switching.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SwitchChainNotSupportedError"
    });
  }
}
async function Ki(e, t) {
  var o;
  const { addEthereumChainParameter: n, chainId: r } = t, s = e.state.connections.get(((o = t.connector) == null ? void 0 : o.uid) ?? e.state.current);
  if (s) {
    const i = s.connector;
    if (!i.switchChain)
      throw new vd({ connector: i });
    return await i.switchChain({
      addEthereumChainParameter: n,
      chainId: r
    });
  }
  const a = e.chains.find((i) => i.id === r);
  if (!a)
    throw new xe();
  return e.setState((i) => ({ ...i, chainId: r })), a;
}
async function Rx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, Au, "verifyMessage")(r);
}
async function zx(e, t) {
  const { chainId: n, ...r } = t, s = e.getClient({ chainId: n });
  return R(s, ku, "verifyTypedData")(r);
}
function jx(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => Tn(e), n, {
    equalityFn(r, s) {
      const { connector: a, ...o } = r, { connector: i, ...c } = s;
      return He(o, c) && // check connector separately
      (a == null ? void 0 : a.id) === (i == null ? void 0 : i.id) && (a == null ? void 0 : a.uid) === (i == null ? void 0 : i.uid);
    }
  });
}
function Lx(e, t) {
  const { syncConnectedChain: n = e._internal.syncConnectedChain, ...r } = t;
  let s;
  const a = (c) => {
    s && s();
    const l = e.getClient({ chainId: c });
    return s = R(l, _l, "watchBlocks")(r), s;
  }, o = a(t.chainId);
  let i;
  return n && !t.chainId && (i = e.subscribe(({ chainId: c }) => c, async (c) => a(c))), () => {
    o == null || o(), i == null || i();
  };
}
function _x(e, t) {
  const { syncConnectedChain: n = e._internal.syncConnectedChain, ...r } = t;
  let s;
  const a = (c) => {
    s && s();
    const l = e.getClient({ chainId: c });
    return s = R(l, wo, "watchBlockNumber")(r), s;
  }, o = a(t.chainId);
  let i;
  return n && !t.chainId && (i = e.subscribe(({ chainId: c }) => c, async (c) => a(c))), () => {
    o == null || o(), i == null || i();
  };
}
function $x(e, t) {
  const { onChange: n } = t;
  return e.subscribe((r) => r.chainId, n);
}
function Hx(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => qo(e), n, {
    equalityFn(r, s) {
      return (r == null ? void 0 : r.uid) === (s == null ? void 0 : s.uid);
    }
  });
}
function Gx(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => bd(e), n, {
    equalityFn: He
  });
}
function qx(e, t) {
  const { onChange: n } = t;
  return e._internal.connectors.subscribe((r, s) => {
    n(Object.values(r), s);
  });
}
function Qx(e, t) {
  const { syncConnectedChain: n = e._internal.syncConnectedChain, ...r } = t;
  let s;
  const a = (c) => {
    s && s();
    const l = e.getClient({ chainId: c });
    return s = R(l, Do, "watchContractEvent")(r), s;
  }, o = a(t.chainId);
  let i;
  return n && !t.chainId && (i = e.subscribe(({ chainId: c }) => c, async (c) => a(c))), () => {
    o == null || o(), i == null || i();
  };
}
function Vx(e, t) {
  const { syncConnectedChain: n = e._internal.syncConnectedChain, ...r } = t;
  let s;
  const a = (c) => {
    s && s();
    const l = e.getClient({ chainId: c });
    return s = R(l, $l, "watchPendingTransactions")(r), s;
  }, o = a(t.chainId);
  let i;
  return n && !t.chainId && (i = e.subscribe(({ chainId: c }) => c, async (c) => a(c))), () => {
    o == null || o(), i == null || i();
  };
}
function Kx(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => yd(e), n, {
    equalityFn(r, s) {
      return (r == null ? void 0 : r.uid) === (s == null ? void 0 : s.uid);
    }
  });
}
async function Wi(e, t) {
  const { chainId: n, timeout: r = 0, ...s } = t, a = e.getClient({ chainId: n }), i = await R(a, Mo, "waitForTransactionReceipt")({ ...s, timeout: r });
  if (i.status === "reverted") {
    const l = await R(a, $t, "getTransaction")({ hash: i.transactionHash }), d = await R(a, Ve, "call")({
      ...l,
      gasPrice: l.type !== "eip1559" ? l.gasPrice : void 0,
      maxFeePerGas: l.type === "eip1559" ? l.maxFeePerGas : void 0,
      maxPriorityFeePerGas: l.type === "eip1559" ? l.maxPriorityFeePerGas : void 0
    }), p = d != null && d.data ? Re(`0x${d.data.substring(138)}`) : "unknown reason";
    throw new Error(p);
  }
  return {
    ...i,
    chainId: a.chain.id
  };
}
async function Wx(e, t) {
  const { account: n, chainId: r, connector: s, __mode: a, ...o } = t;
  let i;
  typeof n == "object" && n.type === "local" ? i = e.getClient({ chainId: r }) : i = await Fe(e, { account: n, chainId: r, connector: s });
  const { connector: c } = Tn(e);
  let l;
  if (a === "prepared" || c != null && c.supportsSimulation)
    l = o;
  else {
    const { request: p } = await gd(e, {
      ...o,
      account: n,
      chainId: r
    });
    l = p;
  }
  return await R(i, Cs, "writeContract")({
    ...l,
    ...n ? { account: n } : {},
    chain: r ? { id: r } : null
  });
}
function Jx(e) {
  return e;
}
const Zx = /(rabby|trustwallet)/, Xx = {
  coinbaseWallet: {
    id: "coinbaseWallet",
    name: "Coinbase Wallet",
    provider(e) {
      return e != null && e.coinbaseWalletExtension ? e.coinbaseWalletExtension : fr(e, "isCoinbaseWallet");
    }
  },
  metaMask: {
    id: "metaMask",
    name: "MetaMask",
    provider(e) {
      return fr(e, (t) => {
        if (!t.isMetaMask || t.isBraveWallet && !t._events && !t._state)
          return !1;
        const n = [
          "isApexWallet",
          "isAvalanche",
          "isBitKeep",
          "isBlockWallet",
          "isKuCoinWallet",
          "isMathWallet",
          "isOkxWallet",
          "isOKExWallet",
          "isOneInchIOSWallet",
          "isOneInchAndroidWallet",
          "isOpera",
          "isPortal",
          "isRabby",
          "isTokenPocket",
          "isTokenary",
          "isZerion"
        ];
        for (const r of n)
          if (t[r])
            return !1;
        return !0;
      });
    }
  },
  phantom: {
    id: "phantom",
    name: "Phantom",
    provider(e) {
      var t, n;
      return (t = e == null ? void 0 : e.phantom) != null && t.ethereum ? (n = e.phantom) == null ? void 0 : n.ethereum : fr(e, "isPhantom");
    }
  }
};
Pn.type = "injected";
function Pn(e = {}) {
  const { shimDisconnect: t = !0, unstable_shimAsyncInject: n } = e;
  function r() {
    const c = e.target;
    if (typeof c == "function") {
      const l = c();
      if (l)
        return l;
    }
    return typeof c == "object" ? c : typeof c == "string" ? {
      ...Xx[c] ?? {
        id: c,
        name: `${c[0].toUpperCase()}${c.slice(1)}`,
        provider: `is${c[0].toUpperCase()}${c.slice(1)}`
      }
    } : {
      id: "injected",
      name: "Injected",
      provider(l) {
        return l == null ? void 0 : l.ethereum;
      }
    };
  }
  let s, a, o, i;
  return (c) => ({
    get icon() {
      return r().icon;
    },
    get id() {
      return r().id;
    },
    get name() {
      return r().name;
    },
    get supportsSimulation() {
      return Zx.test(this.id.toLowerCase());
    },
    type: Pn.type,
    async setup() {
      const l = await this.getProvider();
      l && e.target && (o || (o = this.onConnect.bind(this), l.on("connect", o)), s || (s = this.onAccountsChanged.bind(this), l.on("accountsChanged", s)));
    },
    async connect({ chainId: l, isReconnecting: u } = {}) {
      var f, h, m, b, y, g;
      const d = await this.getProvider();
      if (!d)
        throw new oe();
      let p = [];
      if (u)
        p = await this.getAccounts().catch(() => []);
      else if (t)
        try {
          p = (b = (m = (h = (f = (await d.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          }))[0]) == null ? void 0 : f.caveats) == null ? void 0 : h[0]) == null ? void 0 : m.value) == null ? void 0 : b.map((v) => O(v));
        } catch (A) {
          const v = A;
          if (v.code === U.code)
            throw new U(v);
          if (v.code === re.code)
            throw v;
        }
      try {
        !(p != null && p.length) && !u && (p = (await d.request({
          method: "eth_requestAccounts"
        })).map((x) => O(x))), o && (d.removeListener("connect", o), o = void 0), s || (s = this.onAccountsChanged.bind(this), d.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), d.on("chainChanged", a)), i || (i = this.onDisconnect.bind(this), d.on("disconnect", i));
        let A = await this.getChainId();
        if (l && A !== l) {
          const v = await this.switchChain({ chainId: l }).catch((x) => {
            if (x.code === U.code)
              throw x;
            return { id: A };
          });
          A = (v == null ? void 0 : v.id) ?? A;
        }
        return t && await ((y = c.storage) == null ? void 0 : y.removeItem(`${this.id}.disconnected`)), e.target || await ((g = c.storage) == null ? void 0 : g.setItem("injected.connected", !0)), { accounts: p, chainId: A };
      } catch (A) {
        const v = A;
        throw v.code === U.code ? new U(v) : v.code === re.code ? new re(v) : v;
      }
    },
    async disconnect() {
      var u, d;
      const l = await this.getProvider();
      if (!l)
        throw new oe();
      a && (l.removeListener("chainChanged", a), a = void 0), i && (l.removeListener("disconnect", i), i = void 0), o || (o = this.onConnect.bind(this), l.on("connect", o));
      try {
        await Ke(() => (
          // TODO: Remove explicit type for viem@3
          l.request({
            // `'wallet_revokePermissions'` added in `viem@2.10.3`
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
          })
        ), { timeout: 100 });
      } catch {
      }
      t && await ((u = c.storage) == null ? void 0 : u.setItem(`${this.id}.disconnected`, !0)), e.target || await ((d = c.storage) == null ? void 0 : d.removeItem("injected.connected"));
    },
    async getAccounts() {
      const l = await this.getProvider();
      if (!l)
        throw new oe();
      return (await l.request({ method: "eth_accounts" })).map((d) => O(d));
    },
    async getChainId() {
      const l = await this.getProvider();
      if (!l)
        throw new oe();
      const u = await l.request({ method: "eth_chainId" });
      return Number(u);
    },
    async getProvider() {
      if (typeof window > "u")
        return;
      let l;
      const u = r();
      return typeof u.provider == "function" ? l = u.provider(window) : typeof u.provider == "string" ? l = fr(window, u.provider) : l = u.provider, l && !l.removeListener && ("off" in l && typeof l.off == "function" ? l.removeListener = l.off : l.removeListener = () => {
      }), l;
    },
    async isAuthorized() {
      var l, u;
      try {
        if (t && // If shim exists in storage, connector is disconnected
        await ((l = c.storage) == null ? void 0 : l.getItem(`${this.id}.disconnected`)) || !e.target && !await ((u = c.storage) == null ? void 0 : u.getItem("injected.connected")))
          return !1;
        if (!await this.getProvider()) {
          if (n !== void 0 && n !== !1) {
            const h = async () => (typeof window < "u" && window.removeEventListener("ethereum#initialized", h), !!await this.getProvider()), m = typeof n == "number" ? n : 1e3;
            if (await Promise.race([
              ...typeof window < "u" ? [
                new Promise((y) => window.addEventListener("ethereum#initialized", () => y(h()), { once: !0 }))
              ] : [],
              new Promise((y) => setTimeout(() => y(h()), m))
            ]))
              return !0;
          }
          throw new oe();
        }
        return !!(await $e(() => this.getAccounts())).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: l, chainId: u }) {
      var f, h, m, b;
      const d = await this.getProvider();
      if (!d)
        throw new oe();
      const p = c.chains.find((y) => y.id === u);
      if (!p)
        throw new G(new xe());
      try {
        return await Promise.all([
          d.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: S(u) }]
          }).then(async () => {
            await this.getChainId() === u && c.emitter.emit("change", { chainId: u });
          }),
          new Promise((y) => c.emitter.once("change", ({ chainId: g }) => {
            g === u && y();
          }))
        ]), p;
      } catch (y) {
        const g = y;
        if (g.code === 4902 || // Unwrapping for MetaMask Mobile
        // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
        ((h = (f = g == null ? void 0 : g.data) == null ? void 0 : f.originalError) == null ? void 0 : h.code) === 4902)
          try {
            const { default: A, ...v } = p.blockExplorers ?? {};
            let x;
            l != null && l.blockExplorerUrls ? x = l.blockExplorerUrls : A && (x = [
              A.url,
              ...Object.values(v).map((T) => T.url)
            ]);
            let C;
            (m = l == null ? void 0 : l.rpcUrls) != null && m.length ? C = l.rpcUrls : C = [((b = p.rpcUrls.default) == null ? void 0 : b.http[0]) ?? ""];
            const I = {
              blockExplorerUrls: x,
              chainId: S(u),
              chainName: (l == null ? void 0 : l.chainName) ?? p.name,
              iconUrls: l == null ? void 0 : l.iconUrls,
              nativeCurrency: (l == null ? void 0 : l.nativeCurrency) ?? p.nativeCurrency,
              rpcUrls: C
            };
            if (await d.request({
              method: "wallet_addEthereumChain",
              params: [I]
            }), await this.getChainId() !== u)
              throw new U(new Error("User rejected switch after adding network."));
            return p;
          } catch (A) {
            throw new U(A);
          }
        throw g.code === U.code ? new U(g) : new G(g);
      }
    },
    async onAccountsChanged(l) {
      var u;
      if (l.length === 0)
        this.onDisconnect();
      else if (c.emitter.listenerCount("connect")) {
        const d = (await this.getChainId()).toString();
        this.onConnect({ chainId: d }), t && await ((u = c.storage) == null ? void 0 : u.removeItem(`${this.id}.disconnected`));
      } else
        c.emitter.emit("change", {
          accounts: l.map((d) => O(d))
        });
    },
    onChainChanged(l) {
      const u = Number(l);
      c.emitter.emit("change", { chainId: u });
    },
    async onConnect(l) {
      const u = await this.getAccounts();
      if (u.length === 0)
        return;
      const d = Number(l.chainId);
      c.emitter.emit("connect", { accounts: u, chainId: d });
      const p = await this.getProvider();
      p && (o && (p.removeListener("connect", o), o = void 0), s || (s = this.onAccountsChanged.bind(this), p.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), p.on("chainChanged", a)), i || (i = this.onDisconnect.bind(this), p.on("disconnect", i)));
    },
    async onDisconnect(l) {
      const u = await this.getProvider();
      l && l.code === 1013 && u && (await this.getAccounts()).length || (c.emitter.emit("disconnect"), u && (a && (u.removeListener("chainChanged", a), a = void 0), i && (u.removeListener("disconnect", i), i = void 0), o || (o = this.onConnect.bind(this), u.on("connect", o))));
    }
  });
}
function fr(e, t) {
  function n(s) {
    return typeof t == "function" ? t(s) : typeof t == "string" ? s[t] : !0;
  }
  const r = e.ethereum;
  if (r != null && r.providers)
    return r.providers.find((s) => n(s));
  if (r && n(r))
    return r;
}
Is.type = "mock";
function Is(e) {
  const t = /* @__PURE__ */ new Map(), n = e.features ?? {};
  let r = !1, s;
  return (a) => ({
    id: "mock",
    name: "Mock Connector",
    type: Is.type,
    async setup() {
      s = a.chains[0].id;
    },
    async connect({ chainId: o } = {}) {
      if (n.connectError)
        throw typeof n.connectError == "boolean" ? new U(new Error("Failed to connect.")) : n.connectError;
      const c = await (await this.getProvider()).request({
        method: "eth_requestAccounts"
      });
      let l = await this.getChainId();
      return o && l !== o && (l = (await this.switchChain({ chainId: o })).id), r = !0, {
        accounts: c.map((u) => O(u)),
        chainId: l
      };
    },
    async disconnect() {
      r = !1;
    },
    async getAccounts() {
      if (!r)
        throw new Es();
      return (await (await this.getProvider()).request({ method: "eth_accounts" })).map((c) => O(c));
    },
    async getChainId() {
      const i = await (await this.getProvider()).request({ method: "eth_chainId" });
      return Zs(i, "number");
    },
    async isAuthorized() {
      return !n.reconnect || !r ? !1 : !!(await this.getAccounts()).length;
    },
    async switchChain({ chainId: o }) {
      const i = await this.getProvider(), c = a.chains.find((l) => l.id === o);
      if (!c)
        throw new G(new xe());
      return await i.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: S(o) }]
      }), c;
    },
    onAccountsChanged(o) {
      o.length === 0 ? this.onDisconnect() : a.emitter.emit("change", {
        accounts: o.map((i) => O(i))
      });
    },
    onChainChanged(o) {
      const i = Number(o);
      a.emitter.emit("change", { chainId: i });
    },
    async onDisconnect(o) {
      a.emitter.emit("disconnect"), r = !1;
    },
    async getProvider({ chainId: o } = {}) {
      const c = (a.chains.find((u) => u.id === o) ?? a.chains[0]).rpcUrls.default.http[0];
      return En({ request: async ({ method: u, params: d }) => {
        if (u === "eth_chainId")
          return S(s);
        if (u === "eth_requestAccounts")
          return e.accounts;
        if (u === "eth_signTypedData_v4" && n.signTypedDataError)
          throw typeof n.signTypedDataError == "boolean" ? new U(new Error("Failed to sign typed data.")) : n.signTypedDataError;
        if (u === "wallet_switchEthereumChain") {
          if (n.switchChainError)
            throw typeof n.switchChainError == "boolean" ? new U(new Error("Failed to switch chain.")) : n.switchChainError;
          s = Zs(d[0].chainId, "number"), this.onChainChanged(s.toString());
          return;
        }
        if (u === "wallet_getCapabilities")
          return {
            "0x2105": {
              paymasterService: {
                supported: d[0] === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
              },
              sessionKeys: {
                supported: !0
              }
            },
            "0x14A34": {
              paymasterService: {
                supported: d[0] === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
              }
            }
          };
        if (u === "wallet_sendCalls") {
          const m = [], b = d[0].calls;
          for (const g of b) {
            const { result: A, error: v } = await zs.http(c, {
              body: {
                method: "eth_sendTransaction",
                params: [g]
              }
            });
            if (v)
              throw new Xe({
                body: { method: u, params: d },
                error: v,
                url: c
              });
            m.push(A);
          }
          const y = V(Te(JSON.stringify(b)));
          return t.set(y, m), y;
        }
        if (u === "wallet_getCallsStatus") {
          const m = t.get(d[0]);
          if (!m)
            return null;
          const b = await Promise.all(m.map(async (y) => {
            const { result: g, error: A } = await zs.http(c, {
              body: {
                method: "eth_getTransactionReceipt",
                params: [y],
                id: 0
              }
            });
            if (A)
              throw new Xe({
                body: { method: u, params: d },
                error: A,
                url: c
              });
            return g ? {
              blockHash: g.blockHash,
              blockNumber: g.blockNumber,
              gasUsed: g.gasUsed,
              logs: g.logs,
              status: g.status,
              transactionHash: g.transactionHash
            } : null;
          }));
          return b.some((y) => !y) ? { status: "PENDING", receipts: [] } : { status: "CONFIRMED", receipts: b };
        }
        if (u === "wallet_showCallsStatus")
          return;
        if (u === "personal_sign") {
          if (n.signMessageError)
            throw typeof n.signMessageError == "boolean" ? new U(new Error("Failed to sign message.")) : n.signMessageError;
          u = "eth_sign", d = [d[1], d[0]];
        }
        const p = { method: u, params: d }, { error: f, result: h } = await zs.http(c, { body: p });
        if (f)
          throw new Xe({ body: p, error: f, url: c });
        return h;
      } })({ retryCount: 0 });
    }
  });
}
var Yx = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const eA = (e) => (t, n, r) => {
  const s = r.subscribe;
  return r.subscribe = (o, i, c) => {
    let l = o;
    if (i) {
      const u = (c == null ? void 0 : c.equalityFn) || Object.is;
      let d = o(r.getState());
      l = (p) => {
        const f = o(p);
        if (!u(d, f)) {
          const h = d;
          i(d = f, h);
        }
      }, c != null && c.fireImmediately && i(d, d);
    }
    return s(l);
  }, e(t, n, r);
}, tA = eA;
function nA(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (s) => {
      var a;
      const o = (c) => c === null ? null : JSON.parse(c, void 0), i = (a = n.getItem(s)) != null ? a : null;
      return i instanceof Promise ? i.then(o) : o(i);
    },
    setItem: (s, a) => n.setItem(
      s,
      JSON.stringify(a, void 0)
    ),
    removeItem: (s) => n.removeItem(s)
  };
}
const dn = (e) => (t) => {
  try {
    const n = e(t);
    return n instanceof Promise ? n : {
      then(r) {
        return dn(r)(n);
      },
      catch(r) {
        return this;
      }
    };
  } catch (n) {
    return {
      then(r) {
        return this;
      },
      catch(r) {
        return dn(r)(n);
      }
    };
  }
}, rA = (e, t) => (n, r, s) => {
  let a = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (b) => b,
    version: 0,
    merge: (b, y) => ({
      ...y,
      ...b
    }),
    ...t
  }, o = !1;
  const i = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  let l;
  try {
    l = a.getStorage();
  } catch {
  }
  if (!l)
    return e(
      (...b) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
        ), n(...b);
      },
      r,
      s
    );
  const u = dn(a.serialize), d = () => {
    const b = a.partialize({ ...r() });
    let y;
    const g = u({ state: b, version: a.version }).then(
      (A) => l.setItem(a.name, A)
    ).catch((A) => {
      y = A;
    });
    if (y)
      throw y;
    return g;
  }, p = s.setState;
  s.setState = (b, y) => {
    p(b, y), d();
  };
  const f = e(
    (...b) => {
      n(...b), d();
    },
    r,
    s
  );
  let h;
  const m = () => {
    var b;
    if (!l)
      return;
    o = !1, i.forEach((g) => g(r()));
    const y = ((b = a.onRehydrateStorage) == null ? void 0 : b.call(a, r())) || void 0;
    return dn(l.getItem.bind(l))(a.name).then((g) => {
      if (g)
        return a.deserialize(g);
    }).then((g) => {
      if (g)
        if (typeof g.version == "number" && g.version !== a.version) {
          if (a.migrate)
            return a.migrate(
              g.state,
              g.version
            );
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return g.state;
    }).then((g) => {
      var A;
      return h = a.merge(
        g,
        (A = r()) != null ? A : f
      ), n(h, !0), d();
    }).then(() => {
      y == null || y(h, void 0), o = !0, c.forEach((g) => g(h));
    }).catch((g) => {
      y == null || y(void 0, g);
    });
  };
  return s.persist = {
    setOptions: (b) => {
      a = {
        ...a,
        ...b
      }, b.getStorage && (l = b.getStorage());
    },
    clearStorage: () => {
      l == null || l.removeItem(a.name);
    },
    getOptions: () => a,
    rehydrate: () => m(),
    hasHydrated: () => o,
    onHydrate: (b) => (i.add(b), () => {
      i.delete(b);
    }),
    onFinishHydration: (b) => (c.add(b), () => {
      c.delete(b);
    })
  }, m(), h || f;
}, sA = (e, t) => (n, r, s) => {
  let a = {
    storage: nA(() => localStorage),
    partialize: (m) => m,
    version: 0,
    merge: (m, b) => ({
      ...b,
      ...m
    }),
    ...t
  }, o = !1;
  const i = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
  let l = a.storage;
  if (!l)
    return e(
      (...m) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
        ), n(...m);
      },
      r,
      s
    );
  const u = () => {
    const m = a.partialize({ ...r() });
    return l.setItem(a.name, {
      state: m,
      version: a.version
    });
  }, d = s.setState;
  s.setState = (m, b) => {
    d(m, b), u();
  };
  const p = e(
    (...m) => {
      n(...m), u();
    },
    r,
    s
  );
  let f;
  const h = () => {
    var m, b;
    if (!l)
      return;
    o = !1, i.forEach((g) => {
      var A;
      return g((A = r()) != null ? A : p);
    });
    const y = ((b = a.onRehydrateStorage) == null ? void 0 : b.call(a, (m = r()) != null ? m : p)) || void 0;
    return dn(l.getItem.bind(l))(a.name).then((g) => {
      if (g)
        if (typeof g.version == "number" && g.version !== a.version) {
          if (a.migrate)
            return a.migrate(
              g.state,
              g.version
            );
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return g.state;
    }).then((g) => {
      var A;
      return f = a.merge(
        g,
        (A = r()) != null ? A : p
      ), n(f, !0), u();
    }).then(() => {
      y == null || y(f, void 0), f = r(), o = !0, c.forEach((g) => g(f));
    }).catch((g) => {
      y == null || y(void 0, g);
    });
  };
  return s.persist = {
    setOptions: (m) => {
      a = {
        ...a,
        ...m
      }, m.storage && (l = m.storage);
    },
    clearStorage: () => {
      l == null || l.removeItem(a.name);
    },
    getOptions: () => a,
    rehydrate: () => h(),
    hasHydrated: () => o,
    onHydrate: (m) => (i.add(m), () => {
      i.delete(m);
    }),
    onFinishHydration: (m) => (c.add(m), () => {
      c.delete(m);
    })
  }, a.skipHydration || h(), f || p;
}, aA = (e, t) => "getStorage" in t || "serialize" in t || "deserialize" in t ? ((Yx ? "production" : void 0) !== "production" && console.warn(
  "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
), rA(e, t)) : sA(e, t), oA = aA;
var iA = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ji = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (c, l) => {
    const u = typeof c == "function" ? c(t) : c;
    if (!Object.is(u, t)) {
      const d = t;
      t = l ?? typeof u != "object" ? u : Object.assign({}, t, u), n.forEach((p) => p(t, d));
    }
  }, s = () => t, i = { setState: r, getState: s, subscribe: (c) => (n.add(c), () => n.delete(c)), destroy: () => {
    (iA ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } };
  return t = e(r, s, i), i;
}, Ws = (e) => e ? Ji(e) : Ji;
class cA {
  constructor(t) {
    Object.defineProperty(this, "uid", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }), Object.defineProperty(this, "_emitter", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Yi()
    });
  }
  on(t, n) {
    this._emitter.on(t, n);
  }
  once(t, n) {
    this._emitter.once(t, n);
  }
  off(t, n) {
    this._emitter.off(t, n);
  }
  emit(t, ...n) {
    const r = n[0];
    this._emitter.emit(t, { uid: this.uid, ...r });
  }
  listenerCount(t) {
    return this._emitter.listenerCount(t);
  }
}
function lA(e) {
  return new cA(e);
}
function Qo(e, t) {
  return JSON.parse(e, (n, r) => {
    let s = r;
    return (s == null ? void 0 : s.__type) === "bigint" && (s = BigInt(s.value)), (s == null ? void 0 : s.__type) === "Map" && (s = new Map(s.value)), (t == null ? void 0 : t(n, s)) ?? s;
  });
}
function Zi(e, t) {
  return e.slice(0, t).join(".") || ".";
}
function Xi(e, t) {
  const { length: n } = e;
  for (let r = 0; r < n; ++r)
    if (e[r] === t)
      return r + 1;
  return 0;
}
function uA(e, t) {
  const n = typeof e == "function", r = typeof t == "function", s = [], a = [];
  return function(i, c) {
    if (typeof c == "object")
      if (s.length) {
        const l = Xi(s, this);
        l === 0 ? s[s.length] = this : (s.splice(l), a.splice(l)), a[a.length] = i;
        const u = Xi(s, c);
        if (u !== 0)
          return r ? t.call(this, i, c, Zi(a, u)) : `[ref=${Zi(a, u)}]`;
      } else
        s[0] = c, a[0] = i;
    return n ? e.call(this, i, c) : c;
  };
}
function Cd(e, t, n, r) {
  return JSON.stringify(e, uA((s, a) => {
    let o = a;
    return typeof o == "bigint" && (o = { __type: "bigint", value: a.toString() }), o instanceof Map && (o = { __type: "Map", value: Array.from(a.entries()) }), (t == null ? void 0 : t(s, o)) ?? o;
  }, r), n ?? void 0);
}
function xd(e) {
  const { deserialize: t = Qo, key: n = "wagmi", serialize: r = Cd, storage: s = Vo } = e;
  function a(o) {
    return o instanceof Promise ? o.then((i) => i).catch(() => null) : o;
  }
  return {
    ...s,
    key: n,
    async getItem(o, i) {
      const c = s.getItem(`${n}.${o}`), l = await a(c);
      return l ? t(l) ?? null : i ?? null;
    },
    async setItem(o, i) {
      const c = `${n}.${o}`;
      i === null ? await a(s.removeItem(c)) : await a(s.setItem(c, r(i)));
    },
    async removeItem(o) {
      await a(s.removeItem(`${n}.${o}`));
    }
  };
}
const Vo = {
  getItem: () => null,
  setItem: () => {
  },
  removeItem: () => {
  }
}, ga = 256;
let or = ga, ir;
function dA(e = 11) {
  if (!ir || or + e > ga * 2) {
    ir = "", or = 0;
    for (let t = 0; t < ga; t++)
      ir += (256 + Math.random() * 256 | 0).toString(16).substring(1);
  }
  return ir.substring(or, or++ + e);
}
function pA(e) {
  const { multiInjectedProviderDiscovery: t = !0, storage: n = xd({
    storage: typeof window < "u" && window.localStorage ? window.localStorage : Vo
  }), syncConnectedChain: r = !0, ssr: s, ...a } = e, o = typeof window < "u" && t ? Nu() : void 0, i = Ws(() => a.chains), c = Ws(() => [
    ...a.connectors ?? [],
    ...s ? [] : (o == null ? void 0 : o.getProviders().map(u)) ?? []
  ].map(l));
  function l(v) {
    var I;
    const x = lA(dA()), C = {
      ...v({ emitter: x, chains: i.getState(), storage: n }),
      emitter: x,
      uid: x.uid
    };
    return x.on("connect", g), (I = C.setup) == null || I.call(C), C;
  }
  function u(v) {
    const { info: x } = v, C = v.provider;
    return Pn({ target: { ...x, id: x.rdns, provider: C } });
  }
  const d = /* @__PURE__ */ new Map();
  function p(v = {}) {
    const x = v.chainId ?? b.getState().chainId, C = i.getState().find((E) => E.id === x);
    if (v.chainId && !C)
      throw new xe();
    {
      const E = d.get(b.getState().chainId);
      if (E && !C)
        return E;
      if (!C)
        throw new xe();
    }
    {
      const E = d.get(x);
      if (E)
        return E;
    }
    let I;
    if (a.client)
      I = a.client({ chain: C });
    else {
      const E = C.id, T = i.getState().map((N) => N.id), M = {}, L = Object.entries(a);
      for (const [N, j] of L)
        if (!(N === "chains" || N === "client" || N === "connectors" || N === "transports"))
          if (typeof j == "object")
            if (E in j)
              M[N] = j[E];
            else {
              if (T.some((ge) => ge in j))
                continue;
              M[N] = j;
            }
          else
            M[N] = j;
      I = We({
        ...M,
        chain: C,
        batch: M.batch ?? { multicall: !0 },
        transport: (N) => a.transports[E]({ ...N, connectors: c })
      });
    }
    return d.set(x, I), I;
  }
  function f() {
    return {
      chainId: i.getState()[0].id,
      connections: /* @__PURE__ */ new Map(),
      current: null,
      status: "disconnected"
    };
  }
  let h;
  const m = "0.0.0-canary-";
  en.startsWith(m) ? h = Number.parseInt(en.replace(m, "")) : h = Number.parseInt(en.split(".")[0] ?? "0");
  const b = Ws(tA(
    // only use persist middleware if storage exists
    n ? oA(f, {
      migrate(v, x) {
        if (x === h)
          return v;
        const C = f(), I = v && typeof v == "object" && "chainId" in v && typeof v.chainId == "number" && i.getState().some((E) => E.id === v.chainId) ? v.chainId : C.chainId;
        return { ...C, chainId: I };
      },
      name: "store",
      partialize(v) {
        return {
          connections: {
            __type: "Map",
            value: Array.from(v.connections.entries()).map(([x, C]) => {
              const { id: I, name: E, type: T, uid: M } = C.connector;
              return [x, { ...C, connector: { id: I, name: E, type: T, uid: M } }];
            })
          },
          chainId: v.chainId,
          current: v.current
        };
      },
      skipHydration: s,
      storage: n,
      version: h
    }) : f
  ));
  r && b.subscribe(({ connections: v, current: x }) => {
    var C;
    return x ? (C = v.get(x)) == null ? void 0 : C.chainId : void 0;
  }, (v) => {
    if (i.getState().some((C) => C.id === v))
      return b.setState((C) => ({
        ...C,
        chainId: v ?? C.chainId
      }));
  }), o == null || o.subscribe((v) => {
    const x = /* @__PURE__ */ new Map();
    for (const I of c.getState())
      x.set(I.id, !0);
    const C = [];
    for (const I of v) {
      const E = l(u(I));
      x.has(E.id) || C.push(E);
    }
    n && !b.persist.hasHydrated() || c.setState((I) => [...I, ...C], !0);
  });
  function y(v) {
    b.setState((x) => {
      const C = x.connections.get(v.uid);
      return C ? {
        ...x,
        connections: new Map(x.connections).set(v.uid, {
          accounts: v.accounts ?? C.accounts,
          chainId: v.chainId ?? C.chainId,
          connector: C.connector
        })
      } : x;
    });
  }
  function g(v) {
    b.getState().status === "connecting" || b.getState().status === "reconnecting" || b.setState((x) => {
      const C = c.getState().find((I) => I.uid === v.uid);
      return C ? (C.emitter.listenerCount("connect") && C.emitter.off("connect", y), C.emitter.listenerCount("change") || C.emitter.on("change", y), C.emitter.listenerCount("disconnect") || C.emitter.on("disconnect", A), {
        ...x,
        connections: new Map(x.connections).set(v.uid, {
          accounts: v.accounts,
          chainId: v.chainId,
          connector: C
        }),
        current: v.uid,
        status: "connected"
      }) : x;
    });
  }
  function A(v) {
    b.setState((x) => {
      const C = x.connections.get(v.uid);
      if (C) {
        const E = C.connector;
        E.emitter.listenerCount("change") && C.connector.emitter.off("change", y), E.emitter.listenerCount("disconnect") && C.connector.emitter.off("disconnect", A), E.emitter.listenerCount("connect") || C.connector.emitter.on("connect", g);
      }
      if (x.connections.delete(v.uid), x.connections.size === 0)
        return {
          ...x,
          connections: /* @__PURE__ */ new Map(),
          current: null,
          status: "disconnected"
        };
      const I = x.connections.values().next().value;
      return {
        ...x,
        connections: new Map(x.connections),
        current: I.connector.uid
      };
    });
  }
  return {
    get chains() {
      return i.getState();
    },
    get connectors() {
      return c.getState();
    },
    storage: n,
    getClient: p,
    get state() {
      return b.getState();
    },
    setState(v) {
      let x;
      typeof v == "function" ? x = v(b.getState()) : x = v;
      const C = f();
      typeof x != "object" && (x = C), Object.keys(C).some((E) => !(E in x)) && (x = C), b.setState(x, !0);
    },
    subscribe(v, x, C) {
      return b.subscribe(v, x, C ? { ...C, fireImmediately: C.emitImmediately } : void 0);
    },
    _internal: {
      mipd: o,
      store: b,
      ssr: !!s,
      syncConnectedChain: r,
      transports: a.transports,
      chains: {
        setState(v) {
          const x = typeof v == "function" ? v(i.getState()) : v;
          if (x.length !== 0)
            return i.setState(x, !0);
        },
        subscribe(v) {
          return i.subscribe(v);
        }
      },
      connectors: {
        providerDetailToConnector: u,
        setup: l,
        setState(v) {
          return c.setState(typeof v == "function" ? v(c.getState()) : v, !0);
        },
        subscribe(v) {
          return c.subscribe(v);
        }
      },
      events: { change: y, connect: g, disconnect: A }
    }
  };
}
function fA(e, t) {
  const { initialState: n, reconnectOnMount: r } = t;
  return n && !e._internal.store.persist.hasHydrated() && e.setState({
    ...n,
    chainId: e.chains.some((s) => s.id === n.chainId) ? n.chainId : e.chains[0].id,
    connections: r ? n.connections : /* @__PURE__ */ new Map(),
    status: r ? "reconnecting" : "disconnected"
  }), {
    async onMount() {
      var s;
      if (e._internal.ssr) {
        await e._internal.store.persist.rehydrate();
        const a = (s = e._internal.mipd) == null ? void 0 : s.getProviders().map(e._internal.connectors.providerDetailToConnector).map(e._internal.connectors.setup);
        e._internal.connectors.setState((o) => [
          ...o,
          ...a ?? []
        ]);
      }
      r ? wd(e) : e.storage && e.setState((a) => ({
        ...a,
        connections: /* @__PURE__ */ new Map()
      }));
    }
  };
}
function hA(e, t = {}) {
  const { type: n } = e, { key: r = "connector", name: s = "Connector", retryDelay: a } = t;
  return (o) => {
    const { chain: i, connectors: c } = o, l = t.retryCount ?? o.retryCount;
    return Ht({
      key: r,
      name: s,
      request: async ({ method: d, params: p }) => {
        const f = c == null ? void 0 : c.getState().find((y) => y.type === n);
        if (!f)
          throw new Le(new Error(`Could not find connector of type "${n}" in \`connectors\` passed to \`createConfig\`.`));
        const h = await f.getProvider({
          chainId: i == null ? void 0 : i.id
        });
        if (!h)
          throw new Le(new Error("Provider is disconnected."));
        const m = Q(await $e(() => Ke(() => h.request({ method: "eth_chainId" }), {
          timeout: 100
        })));
        if (i && m !== i.id)
          throw new rt(new Error(`The current chain of the connector (id: ${m}) does not match the target chain for the request (id: ${i.id} – ${i.name}).`));
        const b = { method: d, params: p };
        return h.request(b);
      },
      retryCount: l,
      retryDelay: a,
      type: "connector"
    });
  };
}
function mA(e, t) {
  return Oo(e, t);
}
const bA = {
  getItem(e) {
    return typeof window > "u" ? null : Ko(document.cookie, e) ?? null;
  },
  setItem(e, t) {
    typeof window > "u" || (document.cookie = `${e}=${t};Path=/;SameSite=Lax`);
  },
  removeItem(e) {
    typeof window > "u" || (document.cookie = `${e}=;max-age=-1`);
  }
};
function yA(e, t) {
  var s;
  if (!t)
    return;
  const n = `${(s = e.storage) == null ? void 0 : s.key}.store`, r = Ko(t, n);
  if (r)
    return Qo(r).state;
}
function Ko(e, t) {
  const n = e.split("; ").find((r) => r.startsWith(`${t}=`));
  if (n)
    return n.substring(t.length + 1);
}
function wA(e) {
  if (typeof e == "string")
    return Number.parseInt(e, e.trim().substring(0, 2) === "0x" ? 16 : 10);
  if (typeof e == "bigint")
    return Number(e);
  if (typeof e == "number")
    return e;
  throw new Error(`Cannot normalize chainId "${e}" of type "${typeof e}"`);
}
const RA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseError: fe,
  ChainNotConfiguredError: xe,
  ConnectorAccountNotFoundError: pd,
  ConnectorAlreadyConnectedError: dd,
  ConnectorChainMismatchError: fd,
  ConnectorNotConnectedError: Es,
  ConnectorNotFoundError: ux,
  ProviderNotFoundError: oe,
  SwitchChainNotSupportedError: vd,
  call: cx,
  connect: dx,
  cookieStorage: bA,
  cookieToInitialState: yA,
  createConfig: pA,
  createConnector: Jx,
  createStorage: xd,
  custom: En,
  deepEqual: He,
  deployContract: px,
  deserialize: Qo,
  disconnect: fx,
  estimateFeesPerGas: mx,
  estimateGas: hx,
  estimateMaxPriorityFeePerGas: bx,
  fallback: mA,
  fetchBalance: ji,
  fetchBlockNumber: _i,
  fetchEnsAddress: $i,
  fetchEnsAvatar: Hi,
  fetchEnsName: Gi,
  fetchEnsResolver: qi,
  fetchToken: Qi,
  fetchTransaction: Vi,
  getAccount: Tn,
  getBalance: ji,
  getBlock: yx,
  getBlockNumber: _i,
  getBlockTransactionCount: wx,
  getBytecode: gx,
  getChainId: vx,
  getChains: Cx,
  getClient: qo,
  getConnections: bd,
  getConnectorClient: Fe,
  getConnectors: xx,
  getEnsAddress: $i,
  getEnsAvatar: Hi,
  getEnsName: Gi,
  getEnsResolver: qi,
  getEnsText: Ax,
  getFeeHistory: kx,
  getGasPrice: Ex,
  getProof: Ix,
  getPublicClient: yd,
  getStorageAt: Sx,
  getToken: Qi,
  getTransaction: Vi,
  getTransactionConfirmations: Tx,
  getTransactionCount: Px,
  getTransactionReceipt: Bx,
  getWalletClient: Ux,
  http: Xt,
  hydrate: fA,
  injected: Pn,
  mock: Is,
  multicall: hd,
  noopStorage: Vo,
  normalizeChainId: wA,
  parseCookie: Ko,
  prepareTransactionRequest: Mx,
  readContract: md,
  readContracts: Lr,
  reconnect: wd,
  sendTransaction: Fx,
  serialize: Cd,
  signMessage: Nx,
  signTypedData: Dx,
  simulateContract: gd,
  switchAccount: Ox,
  switchChain: Ki,
  switchNetwork: Ki,
  unstable_connector: hA,
  verifyMessage: Rx,
  verifyTypedData: zx,
  version: en,
  waitForTransaction: Wi,
  waitForTransactionReceipt: Wi,
  watchAccount: jx,
  watchBlockNumber: _x,
  watchBlocks: Lx,
  watchChainId: $x,
  watchClient: Hx,
  watchConnections: Gx,
  watchConnectors: qx,
  watchContractEvent: Qx,
  watchPendingTransactions: Vx,
  watchPublicClient: Kx,
  webSocket: Bu,
  writeContract: Wx
}, Symbol.toStringTag, { value: "Module" }));
Ss.type = "coinbaseWallet";
function Ss(e = {}) {
  return e.version === "3" || e.headlessMode ? vA(e) : gA(e);
}
function gA(e) {
  let t, n, r, s, a;
  return (o) => ({
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    supportsSimulation: !0,
    type: Ss.type,
    async connect({ chainId: i } = {}) {
      try {
        const c = await this.getProvider(), l = (await c.request({
          method: "eth_requestAccounts"
        })).map((d) => O(d));
        r || (r = this.onAccountsChanged.bind(this), c.on("accountsChanged", r)), s || (s = this.onChainChanged.bind(this), c.on("chainChanged", s)), a || (a = this.onDisconnect.bind(this), c.on("disconnect", a));
        let u = await this.getChainId();
        if (i && u !== i) {
          const d = await this.switchChain({ chainId: i }).catch((p) => {
            if (p.code === U.code)
              throw p;
            return { id: u };
          });
          u = (d == null ? void 0 : d.id) ?? u;
        }
        return { accounts: l, chainId: u };
      } catch (c) {
        throw /(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(c.message) ? new U(c) : c;
      }
    },
    async disconnect() {
      var c;
      const i = await this.getProvider();
      r && (i.removeListener("accountsChanged", r), r = void 0), s && (i.removeListener("chainChanged", s), s = void 0), a && (i.removeListener("disconnect", a), a = void 0), i.disconnect(), (c = i.close) == null || c.call(i);
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((c) => O(c));
    },
    async getChainId() {
      const c = await (await this.getProvider()).request({
        method: "eth_chainId"
      });
      return Number(c);
    },
    async getProvider() {
      if (!n) {
        const i = await (async () => {
          const { default: c } = await import("./index-D610BvVt.js").then((l) => l.i);
          return typeof c != "function" && typeof c.default == "function" ? c.default : c;
        })();
        t = new i({
          ...e,
          appChainIds: o.chains.map((c) => c.id)
        }), n = t.makeWeb3Provider({
          ...e,
          options: e.preference ?? "all"
        });
      }
      return n;
    },
    async isAuthorized() {
      try {
        return !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: i, chainId: c }) {
      var d, p, f, h;
      const l = o.chains.find((m) => m.id === c);
      if (!l)
        throw new G(new xe());
      const u = await this.getProvider();
      try {
        return await u.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: S(l.id) }]
        }), l;
      } catch (m) {
        if (m.code === 4902)
          try {
            let b;
            i != null && i.blockExplorerUrls ? b = i.blockExplorerUrls : b = (d = l.blockExplorers) != null && d.default.url ? [(p = l.blockExplorers) == null ? void 0 : p.default.url] : [];
            let y;
            (f = i == null ? void 0 : i.rpcUrls) != null && f.length ? y = i.rpcUrls : y = [((h = l.rpcUrls.default) == null ? void 0 : h.http[0]) ?? ""];
            const g = {
              blockExplorerUrls: b,
              chainId: S(c),
              chainName: (i == null ? void 0 : i.chainName) ?? l.name,
              iconUrls: i == null ? void 0 : i.iconUrls,
              nativeCurrency: (i == null ? void 0 : i.nativeCurrency) ?? l.nativeCurrency,
              rpcUrls: y
            };
            return await u.request({
              method: "wallet_addEthereumChain",
              params: [g]
            }), l;
          } catch (b) {
            throw new U(b);
          }
        throw new G(m);
      }
    },
    onAccountsChanged(i) {
      i.length === 0 ? this.onDisconnect() : o.emitter.emit("change", {
        accounts: i.map((c) => O(c))
      });
    },
    onChainChanged(i) {
      const c = Number(i);
      o.emitter.emit("change", { chainId: c });
    },
    async onDisconnect(i) {
      o.emitter.emit("disconnect");
      const c = await this.getProvider();
      r && (c.removeListener("accountsChanged", r), r = void 0), s && (c.removeListener("chainChanged", s), s = void 0), a && (c.removeListener("disconnect", a), a = void 0);
    }
  });
}
function vA(e) {
  let n, r, s, a, o;
  return (i) => ({
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    supportsSimulation: !0,
    type: Ss.type,
    async connect({ chainId: c } = {}) {
      try {
        const l = await this.getProvider(), u = (await l.request({
          method: "eth_requestAccounts"
        })).map((p) => O(p));
        s || (s = this.onAccountsChanged.bind(this), l.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), l.on("chainChanged", a)), o || (o = this.onDisconnect.bind(this), l.on("disconnect", o));
        let d = await this.getChainId();
        if (c && d !== c) {
          const p = await this.switchChain({ chainId: c }).catch((f) => {
            if (f.code === U.code)
              throw f;
            return { id: d };
          });
          d = (p == null ? void 0 : p.id) ?? d;
        }
        return { accounts: u, chainId: d };
      } catch (l) {
        throw /(user closed modal|accounts received is empty|user denied account)/i.test(l.message) ? new U(l) : l;
      }
    },
    async disconnect() {
      const c = await this.getProvider();
      s && (c.removeListener("accountsChanged", s), s = void 0), a && (c.removeListener("chainChanged", a), a = void 0), o && (c.removeListener("disconnect", o), o = void 0), c.disconnect(), c.close();
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((l) => O(l));
    },
    async getChainId() {
      const l = await (await this.getProvider()).request({
        method: "eth_chainId"
      });
      return Number(l);
    },
    async getProvider() {
      var c;
      if (!r) {
        const l = await (async () => {
          const { default: h } = await import("./index-CzV9n6og.js").then((m) => m.i);
          return typeof h != "function" && typeof h.default == "function" ? h.default : h;
        })();
        n = new l({ reloadOnDisconnect: !1, ...e });
        const u = (c = n.walletExtension) == null ? void 0 : c.getChainId(), d = i.chains.find((h) => e.chainId ? h.id === e.chainId : h.id === u) || i.chains[0], p = e.chainId || (d == null ? void 0 : d.id), f = e.jsonRpcUrl || (d == null ? void 0 : d.rpcUrls.default.http[0]);
        r = n.makeWeb3Provider(f, p);
      }
      return r;
    },
    async isAuthorized() {
      try {
        return !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: c, chainId: l }) {
      var p, f, h, m;
      const u = i.chains.find((b) => b.id === l);
      if (!u)
        throw new G(new xe());
      const d = await this.getProvider();
      try {
        return await d.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: S(u.id) }]
        }), u;
      } catch (b) {
        if (b.code === 4902)
          try {
            let y;
            c != null && c.blockExplorerUrls ? y = c.blockExplorerUrls : y = (p = u.blockExplorers) != null && p.default.url ? [(f = u.blockExplorers) == null ? void 0 : f.default.url] : [];
            let g;
            (h = c == null ? void 0 : c.rpcUrls) != null && h.length ? g = c.rpcUrls : g = [((m = u.rpcUrls.default) == null ? void 0 : m.http[0]) ?? ""];
            const A = {
              blockExplorerUrls: y,
              chainId: S(l),
              chainName: (c == null ? void 0 : c.chainName) ?? u.name,
              iconUrls: c == null ? void 0 : c.iconUrls,
              nativeCurrency: (c == null ? void 0 : c.nativeCurrency) ?? u.nativeCurrency,
              rpcUrls: g
            };
            return await d.request({
              method: "wallet_addEthereumChain",
              params: [A]
            }), u;
          } catch (y) {
            throw new U(y);
          }
        throw new G(b);
      }
    },
    onAccountsChanged(c) {
      c.length === 0 ? this.onDisconnect() : i.emitter.emit("change", {
        accounts: c.map((l) => O(l))
      });
    },
    onChainChanged(c) {
      const l = Number(c);
      i.emitter.emit("change", { chainId: l });
    },
    async onDisconnect(c) {
      i.emitter.emit("disconnect");
      const l = await this.getProvider();
      s && (l.removeListener("accountsChanged", s), s = void 0), a && (l.removeListener("chainChanged", a), a = void 0), o && (l.removeListener("disconnect", o), o = void 0);
    }
  });
}
Wo.type = "metaMask";
function Wo(e = {}) {
  let t, n, r, s, a, o, i, c;
  return (l) => ({
    id: "metaMaskSDK",
    name: "MetaMask",
    type: Wo.type,
    async setup() {
      const u = await this.getProvider();
      u && !o && (o = this.onConnect.bind(this), u.on("connect", o));
    },
    async connect({ chainId: u, isReconnecting: d } = {}) {
      const p = await this.getProvider();
      i || (i = this.onDisplayUri, p.on("display_uri", i));
      let f = [];
      d && (f = await this.getAccounts().catch(() => []));
      try {
        f != null && f.length || (f = (await t.connect()).map((b) => O(b)));
        let h = await this.getChainId();
        if (u && h !== u) {
          const m = await this.switchChain({ chainId: u }).catch((b) => {
            if (b.code === U.code)
              throw b;
            return { id: h };
          });
          h = (m == null ? void 0 : m.id) ?? h;
        }
        return i && (p.removeListener("display_uri", i), i = void 0), o && (p.removeListener("connect", o), o = void 0), s || (s = this.onAccountsChanged.bind(this), p.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), p.on("chainChanged", a)), c || (c = this.onDisconnect.bind(this), p.on("disconnect", c)), { accounts: f, chainId: h };
      } catch (h) {
        const m = h;
        throw m.code === U.code ? new U(m) : m.code === re.code ? new re(m) : m;
      }
    },
    async disconnect() {
      const u = await this.getProvider();
      s && (u.removeListener("accountsChanged", s), s = void 0), a && (u.removeListener("chainChanged", a), a = void 0), c && (u.removeListener("disconnect", c), c = void 0), o || (o = this.onConnect.bind(this), u.on("connect", o)), await t.terminate();
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((p) => O(p));
    },
    async getChainId() {
      const u = await this.getProvider(), d = u.getChainId() || await (u == null ? void 0 : u.request({ method: "eth_chainId" }));
      return Number(d);
    },
    async getProvider() {
      async function u() {
        const d = await (async () => {
          const { default: p } = await import("./metamask-sdk-BzMdF4y-.js").then((f) => f.m);
          return typeof p != "function" && typeof p.default == "function" ? p.default : p;
        })();
        return t = new d({
          dappMetadata: {},
          ...e,
          _source: "wagmi",
          readonlyRPCMap: Object.fromEntries(l.chains.map((p) => [
            p.id,
            p.rpcUrls.default.http[0]
          ])),
          useDeeplink: e.useDeeplink ?? !0
        }), await t.init(), t.getProvider();
      }
      return n || (r || (r = u()), n = await r), n;
    },
    async isAuthorized() {
      try {
        return !!(await $e(() => Ke(() => this.getAccounts(), { timeout: 200 }), {
          delay: 201,
          retryCount: 3
        })).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: u, chainId: d }) {
      var h, m, b, y;
      const p = await this.getProvider(), f = l.chains.find((g) => g.id === d);
      if (!f)
        throw new G(new xe());
      try {
        return await Promise.all([
          p.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: S(d) }]
          }),
          new Promise((g) => l.emitter.once("change", ({ chainId: A }) => {
            A === d && g();
          }))
        ]), f;
      } catch (g) {
        const A = g;
        if (A.code === 4902 || // Unwrapping for MetaMask Mobile
        // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
        ((m = (h = A == null ? void 0 : A.data) == null ? void 0 : h.originalError) == null ? void 0 : m.code) === 4902)
          try {
            const { default: v, ...x } = f.blockExplorers ?? {};
            let C;
            u != null && u.blockExplorerUrls ? C = u.blockExplorerUrls : v && (C = [
              v.url,
              ...Object.values(x).map((M) => M.url)
            ]);
            let I;
            (b = u == null ? void 0 : u.rpcUrls) != null && b.length ? I = u.rpcUrls : I = [((y = f.rpcUrls.default) == null ? void 0 : y.http[0]) ?? ""];
            const E = {
              blockExplorerUrls: C,
              chainId: S(d),
              chainName: (u == null ? void 0 : u.chainName) ?? f.name,
              iconUrls: u == null ? void 0 : u.iconUrls,
              nativeCurrency: (u == null ? void 0 : u.nativeCurrency) ?? f.nativeCurrency,
              rpcUrls: I
            };
            if (await p.request({
              method: "wallet_addEthereumChain",
              params: [E]
            }), await this.getChainId() !== d)
              throw new U(new Error("User rejected switch after adding network."));
            return f;
          } catch (v) {
            throw new U(v);
          }
        throw A.code === U.code ? new U(A) : new G(A);
      }
    },
    async onAccountsChanged(u) {
      if (u.length === 0)
        this.onDisconnect();
      else if (l.emitter.listenerCount("connect")) {
        const d = (await this.getChainId()).toString();
        this.onConnect({ chainId: d });
      } else
        l.emitter.emit("change", {
          accounts: u.map((d) => O(d))
        });
    },
    onChainChanged(u) {
      const d = Number(u);
      l.emitter.emit("change", { chainId: d });
    },
    async onConnect(u) {
      const d = await this.getAccounts();
      if (d.length === 0)
        return;
      const p = Number(u.chainId);
      l.emitter.emit("connect", { accounts: d, chainId: p });
      const f = await this.getProvider();
      o && (f.removeListener("connect", o), o = void 0), s || (s = this.onAccountsChanged.bind(this), f.on("accountsChanged", s)), a || (a = this.onChainChanged.bind(this), f.on("chainChanged", a)), c || (c = this.onDisconnect.bind(this), f.on("disconnect", c));
    },
    async onDisconnect(u) {
      const d = await this.getProvider();
      u && u.code === 1013 && d && (await this.getAccounts()).length || (typeof localStorage < "u" && (localStorage.removeItem("MMSDK_cached_address"), localStorage.removeItem("MMSDK_cached_chainId")), l.emitter.emit("disconnect"), s || (s = this.onAccountsChanged.bind(this), d.on("accountsChanged", s)), a && (d.removeListener("chainChanged", a), a = void 0), c && (d.removeListener("disconnect", c), c = void 0), o || (o = this.onConnect.bind(this), d.on("connect", o)));
    },
    onDisplayUri(u) {
      l.emitter.emit("message", { type: "display_uri", data: u });
    }
  });
}
Jo.type = "safe";
function Jo(e = {}) {
  const { shimDisconnect: t = !1 } = e;
  let n, r;
  return (s) => ({
    id: "safe",
    name: "Safe",
    type: Jo.type,
    async connect() {
      var c;
      const a = await this.getProvider();
      if (!a)
        throw new oe();
      const o = await this.getAccounts(), i = await this.getChainId();
      return r || (r = this.onDisconnect.bind(this), a.on("disconnect", r)), t && await ((c = s.storage) == null ? void 0 : c.removeItem("safe.disconnected")), { accounts: o, chainId: i };
    },
    async disconnect() {
      var o;
      const a = await this.getProvider();
      if (!a)
        throw new oe();
      r && (a.removeListener("disconnect", r), r = void 0), t && await ((o = s.storage) == null ? void 0 : o.setItem("safe.disconnected", !0));
    },
    async getAccounts() {
      const a = await this.getProvider();
      if (!a)
        throw new oe();
      return (await a.request({ method: "eth_accounts" })).map(O);
    },
    async getProvider() {
      if (typeof window < "u" && (window == null ? void 0 : window.parent) !== window) {
        if (!n) {
          const { default: o } = await import("./index-CZ2zgpwi.js").then((d) => d.i);
          let i;
          typeof o != "function" && typeof o.default == "function" ? i = o.default : i = o;
          const c = new i(e), l = await Ke(() => c.safe.getInfo(), {
            timeout: e.unstable_getInfoTimeout ?? 10
          });
          if (!l)
            throw new Error("Could not load Safe information");
          const { SafeAppProvider: u } = await import("./index-DgpNHFKa.js").then((d) => d.i);
          n = new u(l, c);
        }
        return n;
      }
    },
    async getChainId() {
      const a = await this.getProvider();
      if (!a)
        throw new oe();
      return Number(a.chainId);
    },
    async isAuthorized() {
      var a;
      try {
        return t && // If shim exists in storage, connector is disconnected
        await ((a = s.storage) == null ? void 0 : a.getItem("safe.disconnected")) ? !1 : !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    onAccountsChanged() {
    },
    onChainChanged() {
    },
    onDisconnect() {
      s.emitter.emit("disconnect");
    }
  });
}
Zo.type = "walletConnect";
function Zo(e) {
  const t = e.isNewChainsStale ?? !0;
  let n, r;
  const s = "eip155";
  let a, o, i, c, l, u;
  return (d) => ({
    id: "walletConnect",
    name: "WalletConnect",
    type: Zo.type,
    async setup() {
      const p = await this.getProvider().catch(() => null);
      p && (i || (i = this.onConnect.bind(this), p.on("connect", i)), l || (l = this.onSessionDelete.bind(this), p.on("session_delete", l)));
    },
    async connect({ chainId: p, ...f } = {}) {
      var h, m;
      try {
        const b = await this.getProvider();
        if (!b)
          throw new oe();
        c || (c = this.onDisplayUri, b.on("display_uri", c));
        let y = p;
        if (!y) {
          const x = await ((h = d.storage) == null ? void 0 : h.getItem("state")) ?? {};
          d.chains.some((I) => I.id === x.chainId) ? y = x.chainId : y = (m = d.chains[0]) == null ? void 0 : m.id;
        }
        if (!y)
          throw new Error("No chains found on connector.");
        const g = await this.isChainsStale();
        if (b.session && g && await b.disconnect(), !b.session || g) {
          const x = d.chains.filter((C) => C.id !== y).map((C) => C.id);
          await b.connect({
            optionalChains: [y, ...x],
            ..."pairingTopic" in f ? { pairingTopic: f.pairingTopic } : {}
          }), this.setRequestedChainsIds(d.chains.map((C) => C.id));
        }
        const A = (await b.enable()).map((x) => O(x)), v = await this.getChainId();
        return c && (b.removeListener("display_uri", c), c = void 0), i && (b.removeListener("connect", i), i = void 0), a || (a = this.onAccountsChanged.bind(this), b.on("accountsChanged", a)), o || (o = this.onChainChanged.bind(this), b.on("chainChanged", o)), u || (u = this.onDisconnect.bind(this), b.on("disconnect", u)), l || (l = this.onSessionDelete.bind(this), b.on("session_delete", l)), { accounts: A, chainId: v };
      } catch (b) {
        throw /(user rejected|connection request reset)/i.test(b == null ? void 0 : b.message) ? new U(b) : b;
      }
    },
    async disconnect() {
      const p = await this.getProvider();
      try {
        await (p == null ? void 0 : p.disconnect());
      } catch (f) {
        if (!/No matching key/i.test(f.message))
          throw f;
      } finally {
        o && (p == null || p.removeListener("chainChanged", o), o = void 0), u && (p == null || p.removeListener("disconnect", u), u = void 0), i || (i = this.onConnect.bind(this), p == null || p.on("connect", i)), a && (p == null || p.removeListener("accountsChanged", a), a = void 0), l && (p == null || p.removeListener("session_delete", l), l = void 0), this.setRequestedChainsIds([]);
      }
    },
    async getAccounts() {
      return (await this.getProvider()).accounts.map((f) => O(f));
    },
    async getProvider({ chainId: p } = {}) {
      var h;
      async function f() {
        const m = d.chains.map((y) => y.id);
        if (!m.length)
          return;
        const { EthereumProvider: b } = await import("./client-CWmvRiz4.js").then((y) => y.bp);
        return await b.init({
          ...e,
          disableProviderPing: !0,
          optionalChains: m,
          projectId: e.projectId,
          rpcMap: Object.fromEntries(d.chains.map((y) => [
            y.id,
            y.rpcUrls.default.http[0]
          ])),
          showQrModal: e.showQrModal ?? !0
        });
      }
      return n || (r || (r = f()), n = await r, n == null || n.events.setMaxListeners(Number.POSITIVE_INFINITY)), p && await ((h = this.switchChain) == null ? void 0 : h.call(this, { chainId: p })), n;
    },
    async getChainId() {
      return (await this.getProvider()).chainId;
    },
    async isAuthorized() {
      try {
        const [p, f] = await Promise.all([
          this.getAccounts(),
          this.getProvider()
        ]);
        return p.length ? await this.isChainsStale() && f.session ? (await f.disconnect().catch(() => {
        }), !1) : !0 : !1;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: p, chainId: f }) {
      var b, y, g;
      const h = await this.getProvider();
      if (!h)
        throw new oe();
      const m = d.chains.find((A) => A.id === f);
      if (!m)
        throw new G(new xe());
      try {
        await Promise.all([
          new Promise((v) => {
            const x = ({ chainId: C }) => {
              C === f && (d.emitter.off("change", x), v());
            };
            d.emitter.on("change", x);
          }),
          h.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: S(f) }]
          })
        ]);
        const A = await this.getRequestedChainsIds();
        return this.setRequestedChainsIds([...A, f]), m;
      } catch (A) {
        const v = A;
        if (/(user rejected)/i.test(v.message))
          throw new U(v);
        try {
          let x;
          p != null && p.blockExplorerUrls ? x = p.blockExplorerUrls : x = (b = m.blockExplorers) != null && b.default.url ? [(y = m.blockExplorers) == null ? void 0 : y.default.url] : [];
          let C;
          (g = p == null ? void 0 : p.rpcUrls) != null && g.length ? C = p.rpcUrls : C = [...m.rpcUrls.default.http];
          const I = {
            blockExplorerUrls: x,
            chainId: S(f),
            chainName: (p == null ? void 0 : p.chainName) ?? m.name,
            iconUrls: p == null ? void 0 : p.iconUrls,
            nativeCurrency: (p == null ? void 0 : p.nativeCurrency) ?? m.nativeCurrency,
            rpcUrls: C
          };
          await h.request({
            method: "wallet_addEthereumChain",
            params: [I]
          });
          const E = await this.getRequestedChainsIds();
          return this.setRequestedChainsIds([...E, f]), m;
        } catch (x) {
          throw new U(x);
        }
      }
    },
    onAccountsChanged(p) {
      p.length === 0 ? this.onDisconnect() : d.emitter.emit("change", {
        accounts: p.map((f) => O(f))
      });
    },
    onChainChanged(p) {
      const f = Number(p);
      d.emitter.emit("change", { chainId: f });
    },
    async onConnect(p) {
      const f = Number(p.chainId), h = await this.getAccounts();
      d.emitter.emit("connect", { accounts: h, chainId: f });
    },
    async onDisconnect(p) {
      this.setRequestedChainsIds([]), d.emitter.emit("disconnect");
      const f = await this.getProvider();
      a && (f.removeListener("accountsChanged", a), a = void 0), o && (f.removeListener("chainChanged", o), o = void 0), u && (f.removeListener("disconnect", u), u = void 0), l && (f.removeListener("session_delete", l), l = void 0), i || (i = this.onConnect.bind(this), f.on("connect", i));
    },
    onDisplayUri(p) {
      d.emitter.emit("message", { type: "display_uri", data: p });
    },
    onSessionDelete() {
      this.onDisconnect();
    },
    getNamespaceChainsIds() {
      var f, h, m;
      return n ? ((m = (h = (f = n.session) == null ? void 0 : f.namespaces[s]) == null ? void 0 : h.accounts) == null ? void 0 : m.map((b) => Number.parseInt(b.split(":")[1] || ""))) ?? [] : [];
    },
    async getRequestedChainsIds() {
      var p;
      return await ((p = d.storage) == null ? void 0 : p.getItem(this.requestedChainsStorageKey)) ?? [];
    },
    /**
     * Checks if the target chains match the chains that were
     * initially requested by the connector for the WalletConnect session.
     * If there is a mismatch, this means that the chains on the connector
     * are considered stale, and need to be revalidated at a later point (via
     * connection).
     *
     * There may be a scenario where a dapp adds a chain to the
     * connector later on, however, this chain will not have been approved or rejected
     * by the wallet. In this case, the chain is considered stale.
     */
    async isChainsStale() {
      if (!t)
        return !1;
      const p = d.chains.map((m) => m.id), f = this.getNamespaceChainsIds();
      if (f.length && !f.some((m) => p.includes(m)))
        return !1;
      const h = await this.getRequestedChainsIds();
      return !p.every((m) => h.includes(m));
    },
    async setRequestedChainsIds(p) {
      var f;
      await ((f = d.storage) == null ? void 0 : f.setItem(this.requestedChainsStorageKey, p));
    },
    get requestedChainsStorageKey() {
      return `${this.id}.requestedChains`;
    }
  });
}
const CA = "5.0.21", zA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coinbaseWallet: Ss,
  injected: Pn,
  metaMask: Wo,
  mock: Is,
  safe: Jo,
  version: CA,
  walletConnect: Zo
}, Symbol.toStringTag, { value: "Module" }));
export {
  UA as a,
  DA as b,
  zA as c,
  RA as d,
  OA as i,
  EA as r
};
