import { b8 as dr, b9 as j, ba as Be, b7 as Ar } from "./index-DTKnr6h1.js";
import { z as ie } from "./__vite-browser-external-v7f2oYTb.js";
import { j as pt, a as dt, k as yt, l as ke, g as Kr, d as Vr, b as mt } from "./browser-CsINfYrj.js";
var ce = pt();
const ye = dr(ce);
var ge = dt();
class We extends Error {
  constructor(t, e) {
    super(t), Error.captureStackTrace(this, this.constructor), (this.type = e);
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
class de extends We {
  constructor(t, e, n) {
    super(t, e), n && ((this.code = this.errno = n.code), (this.erroredSysCall = n.syscall));
  }
}
const Ue = Symbol.toStringTag,
  Gr = (r) =>
    typeof r == "object" &&
    typeof r.append == "function" &&
    typeof r.delete == "function" &&
    typeof r.get == "function" &&
    typeof r.getAll == "function" &&
    typeof r.has == "function" &&
    typeof r.set == "function" &&
    typeof r.sort == "function" &&
    r[Ue] === "URLSearchParams",
  _e = (r) =>
    r &&
    typeof r == "object" &&
    typeof r.arrayBuffer == "function" &&
    typeof r.type == "string" &&
    typeof r.stream == "function" &&
    typeof r.constructor == "function" &&
    /^(Blob|File)$/.test(r[Ue]),
  gt = (r) => typeof r == "object" && (r[Ue] === "AbortSignal" || r[Ue] === "EventTarget"),
  vt = (r, t) => {
    const e = new URL(t).hostname,
      n = new URL(r).hostname;
    return e === n || e.endsWith(`.${n}`);
  },
  wt = (r, t) => {
    const e = new URL(t).protocol,
      n = new URL(r).protocol;
    return e === n;
  },
  St = ge.promisify(ye.pipeline),
  oe = Symbol("Body internals");
class Ie {
  constructor(t, { size: e = 0 } = {}) {
    let n = null;
    t === null
      ? (t = null)
      : Gr(t)
        ? (t = j.from(t.toString()))
        : _e(t) ||
          j.isBuffer(t) ||
          (ge.types.isAnyArrayBuffer(t)
            ? (t = j.from(t))
            : ArrayBuffer.isView(t)
              ? (t = j.from(t.buffer, t.byteOffset, t.byteLength))
              : t instanceof ye || (t = j.from(String(t))));
    let a = t;
    j.isBuffer(t) ? (a = ye.Readable.from(t)) : _e(t) && (a = ye.Readable.from(t.stream())),
      (this[oe] = { body: t, stream: a, boundary: n, disturbed: !1, error: null }),
      (this.size = e),
      t instanceof ye &&
        t.on("error", (p) => {
          const S =
            p instanceof We
              ? p
              : new de(`Invalid response body while trying to fetch ${this.url}: ${p.message}`, "system", p);
          this[oe].error = S;
        });
  }
  get body() {
    return this[oe].stream;
  }
  get bodyUsed() {
    return this[oe].disturbed;
  }
  async arrayBuffer() {
    const { buffer: t, byteOffset: e, byteLength: n } = await je(this);
    return t.slice(e, e + n);
  }
  async blob() {
    const t = (this.headers && this.headers.get("content-type")) || (this[oe].body && this[oe].body.type) || "",
      e = await this.arrayBuffer();
    return new Blob([e], { type: t });
  }
  async json() {
    const t = await this.text();
    return JSON.parse(t);
  }
  async text() {
    const t = await je(this);
    return new TextDecoder().decode(t);
  }
  buffer() {
    return je(this);
  }
}
Ie.prototype.buffer = ge.deprecate(
  Ie.prototype.buffer,
  "Please use 'response.arrayBuffer()' instead of 'response.buffer()'",
  "node-fetch#buffer",
);
Object.defineProperties(Ie.prototype, {
  body: { enumerable: !0 },
  bodyUsed: { enumerable: !0 },
  arrayBuffer: { enumerable: !0 },
  blob: { enumerable: !0 },
  json: { enumerable: !0 },
  text: { enumerable: !0 },
  data: {
    get: ge.deprecate(
      () => {},
      "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
      "https://github.com/node-fetch/node-fetch/issues/1000 (response)",
    ),
  },
});
async function je(r) {
  if (r[oe].disturbed) throw new TypeError(`body used already for: ${r.url}`);
  if (((r[oe].disturbed = !0), r[oe].error)) throw r[oe].error;
  const { body: t } = r;
  if (t === null) return j.alloc(0);
  if (!(t instanceof ye)) return j.alloc(0);
  const e = [];
  let n = 0;
  try {
    for await (const a of t) {
      if (r.size > 0 && n + a.length > r.size) {
        const p = new de(`content size at ${r.url} over limit: ${r.size}`, "max-size");
        throw (t.destroy(p), p);
      }
      (n += a.length), e.push(a);
    }
  } catch (a) {
    throw a instanceof We
      ? a
      : new de(`Invalid response body while trying to fetch ${r.url}: ${a.message}`, "system", a);
  }
  if (t.readableEnded === !0 || t._readableState.ended === !0)
    try {
      return e.every((a) => typeof a == "string") ? j.from(e.join("")) : j.concat(e, n);
    } catch (a) {
      throw new de(`Could not create Buffer from response body for ${r.url}: ${a.message}`, "system", a);
    }
  else throw new de(`Premature close of server response while trying to fetch ${r.url}`);
}
const yr = (r, t) => {
    let e,
      n,
      { body: a } = r[oe];
    if (r.bodyUsed) throw new Error("cannot clone body after it is used");
    return (
      a instanceof ye &&
        typeof a.getBoundary != "function" &&
        ((e = new ce.PassThrough({ highWaterMark: t })),
        (n = new ce.PassThrough({ highWaterMark: t })),
        a.pipe(e),
        a.pipe(n),
        (r[oe].stream = e),
        (a = n)),
      a
    );
  },
  bt = ge.deprecate(
    (r) => r.getBoundary(),
    "form-data doesn't follow the spec and requires special treatment. Use alternative package",
    "https://github.com/node-fetch/node-fetch/issues/1167",
  ),
  Qr = (r, t) =>
    r === null
      ? null
      : typeof r == "string"
        ? "text/plain;charset=UTF-8"
        : Gr(r)
          ? "application/x-www-form-urlencoded;charset=UTF-8"
          : _e(r)
            ? r.type || null
            : j.isBuffer(r) || ge.types.isAnyArrayBuffer(r) || ArrayBuffer.isView(r)
              ? null
              : r && typeof r.getBoundary == "function"
                ? `multipart/form-data;boundary=${bt(r)}`
                : r instanceof ye
                  ? null
                  : "text/plain;charset=UTF-8",
  xt = (r) => {
    const { body: t } = r[oe];
    return t === null
      ? 0
      : _e(t)
        ? t.size
        : j.isBuffer(t)
          ? t.length
          : t && typeof t.getLengthSync == "function" && t.hasKnownLength && t.hasKnownLength()
            ? t.getLengthSync()
            : null;
  },
  Et = async (r, { body: t }) => {
    t === null ? r.end() : await St(t, r);
  },
  qe =
    typeof ie.validateHeaderName == "function"
      ? ie.validateHeaderName
      : (r) => {
          if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(r)) {
            const t = new TypeError(`Header name must be a valid HTTP token [${r}]`);
            throw (Object.defineProperty(t, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), t);
          }
        },
  lr =
    typeof ie.validateHeaderValue == "function"
      ? ie.validateHeaderValue
      : (r, t) => {
          if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(t)) {
            const e = new TypeError(`Invalid character in header content ["${r}"]`);
            throw (Object.defineProperty(e, "code", { value: "ERR_INVALID_CHAR" }), e);
          }
        };
class ve extends URLSearchParams {
  constructor(t) {
    let e = [];
    if (t instanceof ve) {
      const n = t.raw();
      for (const [a, p] of Object.entries(n)) e.push(...p.map((S) => [a, S]));
    } else if (t != null)
      if (typeof t == "object" && !ge.types.isBoxedPrimitive(t)) {
        const n = t[Symbol.iterator];
        if (n == null) e.push(...Object.entries(t));
        else {
          if (typeof n != "function") throw new TypeError("Header pairs must be iterable");
          e = [...t]
            .map((a) => {
              if (typeof a != "object" || ge.types.isBoxedPrimitive(a))
                throw new TypeError("Each header pair must be an iterable object");
              return [...a];
            })
            .map((a) => {
              if (a.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
              return [...a];
            });
        }
      } else
        throw new TypeError(
          "Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)",
        );
    return (
      (e = e.length > 0 ? e.map(([n, a]) => (qe(n), lr(n, String(a)), [String(n).toLowerCase(), String(a)])) : void 0),
      super(e),
      new Proxy(this, {
        get(n, a, p) {
          switch (a) {
            case "append":
            case "set":
              return (S, u) => (
                qe(S), lr(S, String(u)), URLSearchParams.prototype[a].call(n, String(S).toLowerCase(), String(u))
              );
            case "delete":
            case "has":
            case "getAll":
              return (S) => (qe(S), URLSearchParams.prototype[a].call(n, String(S).toLowerCase()));
            case "keys":
              return () => (n.sort(), new Set(URLSearchParams.prototype.keys.call(n)).keys());
            default:
              return Reflect.get(n, a, p);
          }
        },
      })
    );
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(t) {
    const e = this.getAll(t);
    if (e.length === 0) return null;
    let n = e.join(", ");
    return /^content-encoding$/i.test(t) && (n = n.toLowerCase()), n;
  }
  forEach(t, e = void 0) {
    for (const n of this.keys()) Reflect.apply(t, e, [this.get(n), n, this]);
  }
  *values() {
    for (const t of this.keys()) yield this.get(t);
  }
  *entries() {
    for (const t of this.keys()) yield [t, this.get(t)];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((t, e) => ((t[e] = this.getAll(e)), t), {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((t, e) => {
      const n = this.getAll(e);
      return e === "host" ? (t[e] = n[0]) : (t[e] = n.length > 1 ? n : n[0]), t;
    }, {});
  }
}
Object.defineProperties(
  ve.prototype,
  ["get", "entries", "forEach", "values"].reduce((r, t) => ((r[t] = { enumerable: !0 }), r), {}),
);
function Tt(r = []) {
  return new ve(
    r
      .reduce((t, e, n, a) => (n % 2 === 0 && t.push(a.slice(n, n + 2)), t), [])
      .filter(([t, e]) => {
        try {
          return qe(t), lr(t, String(e)), !0;
        } catch {
          return !1;
        }
      }),
  );
}
const Ot = new Set([301, 302, 303, 307, 308]),
  Jr = (r) => Ot.has(r),
  le = Symbol("Response internals");
class se extends Ie {
  constructor(t = null, e = {}) {
    super(t, e);
    const n = e.status != null ? e.status : 200,
      a = new ve(e.headers);
    if (t !== null && !a.has("Content-Type")) {
      const p = Qr(t);
      p && a.append("Content-Type", p);
    }
    this[le] = {
      type: "default",
      url: e.url,
      status: n,
      statusText: e.statusText || "",
      headers: a,
      counter: e.counter,
      highWaterMark: e.highWaterMark,
    };
  }
  get type() {
    return this[le].type;
  }
  get url() {
    return this[le].url || "";
  }
  get status() {
    return this[le].status;
  }
  get ok() {
    return this[le].status >= 200 && this[le].status < 300;
  }
  get redirected() {
    return this[le].counter > 0;
  }
  get statusText() {
    return this[le].statusText;
  }
  get headers() {
    return this[le].headers;
  }
  get highWaterMark() {
    return this[le].highWaterMark;
  }
  clone() {
    return new se(yr(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark,
    });
  }
  static redirect(t, e = 302) {
    if (!Jr(e)) throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    return new se(null, { headers: { location: new URL(t).toString() }, status: e });
  }
  static error() {
    const t = new se(null, { status: 0, statusText: "" });
    return (t[le].type = "error"), t;
  }
  static json(t = void 0, e = {}) {
    const n = JSON.stringify(t);
    if (n === void 0) throw new TypeError("data is not JSON serializable");
    const a = new ve(e && e.headers);
    return a.has("content-type") || a.set("content-type", "application/json"), new se(n, { ...e, headers: a });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
}
Object.defineProperties(se.prototype, {
  type: { enumerable: !0 },
  url: { enumerable: !0 },
  status: { enumerable: !0 },
  ok: { enumerable: !0 },
  redirected: { enumerable: !0 },
  statusText: { enumerable: !0 },
  headers: { enumerable: !0 },
  clone: { enumerable: !0 },
});
var Le = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */ var Rt = Le.exports,
  Pr;
function Ct() {
  return (
    Pr ||
      ((Pr = 1),
      (function (r, t) {
        (function (e) {
          var n = t && !t.nodeType && t,
            a = r && !r.nodeType && r,
            p = typeof Be == "object" && Be;
          (p.global === p || p.window === p || p.self === p) && (e = p);
          var S,
            u = 2147483647,
            w = 36,
            d = 1,
            x = 26,
            O = 38,
            b = 700,
            l = 72,
            h = 128,
            E = "-",
            o = /^xn--/,
            c = /[^\x20-\x7E]/,
            i = /[\x2E\u3002\uFF0E\uFF61]/g,
            m = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input",
            },
            y = w - d,
            g = Math.floor,
            v = String.fromCharCode,
            L;
          function R(T) {
            throw new RangeError(m[T]);
          }
          function $(T, P) {
            for (var D = T.length, U = []; D--; ) U[D] = P(T[D]);
            return U;
          }
          function C(T, P) {
            var D = T.split("@"),
              U = "";
            D.length > 1 && ((U = D[0] + "@"), (T = D[1])), (T = T.replace(i, "."));
            var N = T.split("."),
              W = $(N, P).join(".");
            return U + W;
          }
          function B(T) {
            for (var P = [], D = 0, U = T.length, N, W; D < U; )
              (N = T.charCodeAt(D++)),
                N >= 55296 && N <= 56319 && D < U
                  ? ((W = T.charCodeAt(D++)),
                    (W & 64512) == 56320 ? P.push(((N & 1023) << 10) + (W & 1023) + 65536) : (P.push(N), D--))
                  : P.push(N);
            return P;
          }
          function A(T) {
            return $(T, function (P) {
              var D = "";
              return (
                P > 65535 && ((P -= 65536), (D += v(((P >>> 10) & 1023) | 55296)), (P = 56320 | (P & 1023))),
                (D += v(P)),
                D
              );
            }).join("");
          }
          function V(T) {
            return T - 48 < 10 ? T - 22 : T - 65 < 26 ? T - 65 : T - 97 < 26 ? T - 97 : w;
          }
          function K(T, P) {
            return T + 22 + 75 * (T < 26) - ((P != 0) << 5);
          }
          function G(T, P, D) {
            var U = 0;
            for (T = D ? g(T / b) : T >> 1, T += g(T / P); T > (y * x) >> 1; U += w) T = g(T / y);
            return g(U + ((y + 1) * T) / (T + O));
          }
          function ee(T) {
            var P = [],
              D = T.length,
              U,
              N = 0,
              W = h,
              q = l,
              H,
              Q,
              X,
              J,
              z,
              Z,
              re,
              te,
              ne;
            for (H = T.lastIndexOf(E), H < 0 && (H = 0), Q = 0; Q < H; ++Q)
              T.charCodeAt(Q) >= 128 && R("not-basic"), P.push(T.charCodeAt(Q));
            for (X = H > 0 ? H + 1 : 0; X < D; ) {
              for (
                J = N, z = 1, Z = w;
                X >= D && R("invalid-input"),
                  (re = V(T.charCodeAt(X++))),
                  (re >= w || re > g((u - N) / z)) && R("overflow"),
                  (N += re * z),
                  (te = Z <= q ? d : Z >= q + x ? x : Z - q),
                  !(re < te);
                Z += w
              )
                (ne = w - te), z > g(u / ne) && R("overflow"), (z *= ne);
              (U = P.length + 1),
                (q = G(N - J, U, J == 0)),
                g(N / U) > u - W && R("overflow"),
                (W += g(N / U)),
                (N %= U),
                P.splice(N++, 0, W);
            }
            return A(P);
          }
          function fe(T) {
            var P,
              D,
              U,
              N,
              W,
              q,
              H,
              Q,
              X,
              J,
              z,
              Z = [],
              re,
              te,
              ne,
              Ce;
            for (T = B(T), re = T.length, P = h, D = 0, W = l, q = 0; q < re; ++q) (z = T[q]), z < 128 && Z.push(v(z));
            for (U = N = Z.length, N && Z.push(E); U < re; ) {
              for (H = u, q = 0; q < re; ++q) (z = T[q]), z >= P && z < H && (H = z);
              for (te = U + 1, H - P > g((u - D) / te) && R("overflow"), D += (H - P) * te, P = H, q = 0; q < re; ++q)
                if (((z = T[q]), z < P && ++D > u && R("overflow"), z == P)) {
                  for (Q = D, X = w; (J = X <= W ? d : X >= W + x ? x : X - W), !(Q < J); X += w)
                    (Ce = Q - J), (ne = w - J), Z.push(v(K(J + (Ce % ne), 0))), (Q = g(Ce / ne));
                  Z.push(v(K(Q, 0))), (W = G(D, te, U == N)), (D = 0), ++U;
                }
              ++D, ++P;
            }
            return Z.join("");
          }
          function F(T) {
            return C(T, function (P) {
              return o.test(P) ? ee(P.slice(4).toLowerCase()) : P;
            });
          }
          function pe(T) {
            return C(T, function (P) {
              return c.test(P) ? "xn--" + fe(P) : P;
            });
          }
          if (
            ((S = {
              version: "1.4.1",
              ucs2: { decode: B, encode: A },
              decode: ee,
              encode: fe,
              toASCII: pe,
              toUnicode: F,
            }),
            n && a)
          )
            if (r.exports == n) a.exports = S;
            else for (L in S) S.hasOwnProperty(L) && (n[L] = S[L]);
          else e.punycode = S;
        })(Rt);
      })(Le, Le.exports)),
    Le.exports
  );
}
var At = Ct();
const Pt = dr(At);
var er, $r;
function ze() {
  if ($r) return er;
  $r = 1;
  var r = typeof Map == "function" && Map.prototype,
    t = Object.getOwnPropertyDescriptor && r ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null,
    e = r && t && typeof t.get == "function" ? t.get : null,
    n = r && Map.prototype.forEach,
    a = typeof Set == "function" && Set.prototype,
    p = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null,
    S = a && p && typeof p.get == "function" ? p.get : null,
    u = a && Set.prototype.forEach,
    w = typeof WeakMap == "function" && WeakMap.prototype,
    d = w ? WeakMap.prototype.has : null,
    x = typeof WeakSet == "function" && WeakSet.prototype,
    O = x ? WeakSet.prototype.has : null,
    b = typeof WeakRef == "function" && WeakRef.prototype,
    l = b ? WeakRef.prototype.deref : null,
    h = Boolean.prototype.valueOf,
    E = Object.prototype.toString,
    o = Function.prototype.toString,
    c = String.prototype.match,
    i = String.prototype.slice,
    m = String.prototype.replace,
    y = String.prototype.toUpperCase,
    g = String.prototype.toLowerCase,
    v = RegExp.prototype.test,
    L = Array.prototype.concat,
    R = Array.prototype.join,
    $ = Array.prototype.slice,
    C = Math.floor,
    B = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
    A = Object.getOwnPropertySymbols,
    V = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null,
    K = typeof Symbol == "function" && typeof Symbol.iterator == "object",
    G =
      typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === K || !0)
        ? Symbol.toStringTag
        : null,
    ee = Object.prototype.propertyIsEnumerable,
    fe =
      (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
      ([].__proto__ === Array.prototype
        ? function (s) {
            return s.__proto__;
          }
        : null);
  function F(s, f) {
    if (s === 1 / 0 || s === -1 / 0 || s !== s || (s && s > -1e3 && s < 1e3) || v.call(/e/, f)) return f;
    var M = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof s == "number") {
      var _ = s < 0 ? -C(-s) : C(s);
      if (_ !== s) {
        var k = String(_),
          I = i.call(f, k.length + 1);
        return m.call(k, M, "$&_") + "." + m.call(m.call(I, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return m.call(f, M, "$&_");
  }
  var pe = yt,
    T = pe.custom,
    P = te(T) ? T : null,
    D = { __proto__: null, double: '"', single: "'" },
    U = { __proto__: null, double: /(["\\])/g, single: /(['\\])/g };
  er = function s(f, M, _, k) {
    var I = M || {};
    if (me(I, "quoteStyle") && !me(D, I.quoteStyle))
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (
      me(I, "maxStringLength") &&
      (typeof I.maxStringLength == "number"
        ? I.maxStringLength < 0 && I.maxStringLength !== 1 / 0
        : I.maxStringLength !== null)
    )
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var Se = me(I, "customInspect") ? I.customInspect : !0;
    if (typeof Se != "boolean" && Se !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (
      me(I, "indent") &&
      I.indent !== null &&
      I.indent !== "	" &&
      !(parseInt(I.indent, 10) === I.indent && I.indent > 0)
    )
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (me(I, "numericSeparator") && typeof I.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var xe = I.numericSeparator;
    if (typeof f > "u") return "undefined";
    if (f === null) return "null";
    if (typeof f == "boolean") return f ? "true" : "false";
    if (typeof f == "string") return vr(f, I);
    if (typeof f == "number") {
      if (f === 0) return 1 / 0 / f > 0 ? "0" : "-0";
      var ae = String(f);
      return xe ? F(f, ae) : ae;
    }
    if (typeof f == "bigint") {
      var be = String(f) + "n";
      return xe ? F(f, be) : be;
    }
    var Ve = typeof I.depth > "u" ? 5 : I.depth;
    if ((typeof _ > "u" && (_ = 0), _ >= Ve && Ve > 0 && typeof f == "object")) return H(f) ? "[Array]" : "[Object]";
    var Ee = lt(I, _);
    if (typeof k > "u") k = [];
    else if (gr(k, f) >= 0) return "[Circular]";
    function ue(Te, Ne, ht) {
      if ((Ne && ((k = $.call(k)), k.push(Ne)), ht)) {
        var Cr = { depth: I.depth };
        return me(I, "quoteStyle") && (Cr.quoteStyle = I.quoteStyle), s(Te, Cr, _ + 1, k);
      }
      return s(Te, I, _ + 1, k);
    }
    if (typeof f == "function" && !X(f)) {
      var Sr = rt(f),
        br = Fe(f, ue);
      return (
        "[Function" + (Sr ? ": " + Sr : " (anonymous)") + "]" + (br.length > 0 ? " { " + R.call(br, ", ") + " }" : "")
      );
    }
    if (te(f)) {
      var xr = K ? m.call(String(f), /^(Symbol\(.*\))_[^)]*$/, "$1") : V.call(f);
      return typeof f == "object" && !K ? Ae(xr) : xr;
    }
    if (st(f)) {
      for (var Pe = "<" + g.call(String(f.nodeName)), Ge = f.attributes || [], Me = 0; Me < Ge.length; Me++)
        Pe += " " + Ge[Me].name + "=" + N(W(Ge[Me].value), "double", I);
      return (
        (Pe += ">"),
        f.childNodes && f.childNodes.length && (Pe += "..."),
        (Pe += "</" + g.call(String(f.nodeName)) + ">"),
        Pe
      );
    }
    if (H(f)) {
      if (f.length === 0) return "[]";
      var Qe = Fe(f, ue);
      return Ee && !ut(Qe) ? "[" + Ke(Qe, Ee) + "]" : "[ " + R.call(Qe, ", ") + " ]";
    }
    if (J(f)) {
      var Je = Fe(f, ue);
      return !("cause" in Error.prototype) && "cause" in f && !ee.call(f, "cause")
        ? "{ [" + String(f) + "] " + R.call(L.call("[cause]: " + ue(f.cause), Je), ", ") + " }"
        : Je.length === 0
          ? "[" + String(f) + "]"
          : "{ [" + String(f) + "] " + R.call(Je, ", ") + " }";
    }
    if (typeof f == "object" && Se) {
      if (P && typeof f[P] == "function" && pe) return pe(f, { depth: Ve - _ });
      if (Se !== "symbol" && typeof f.inspect == "function") return f.inspect();
    }
    if (tt(f)) {
      var Er = [];
      return (
        n &&
          n.call(f, function (Te, Ne) {
            Er.push(ue(Ne, f, !0) + " => " + ue(Te, f));
          }),
        wr("Map", e.call(f), Er, Ee)
      );
    }
    if (ot(f)) {
      var Tr = [];
      return (
        u &&
          u.call(f, function (Te) {
            Tr.push(ue(Te, f));
          }),
        wr("Set", S.call(f), Tr, Ee)
      );
    }
    if (nt(f)) return He("WeakMap");
    if (it(f)) return He("WeakSet");
    if (at(f)) return He("WeakRef");
    if (Z(f)) return Ae(ue(Number(f)));
    if (ne(f)) return Ae(ue(B.call(f)));
    if (re(f)) return Ae(h.call(f));
    if (z(f)) return Ae(ue(String(f)));
    if (typeof window < "u" && f === window) return "{ [object Window] }";
    if ((typeof globalThis < "u" && f === globalThis) || (typeof Be < "u" && f === Be))
      return "{ [object globalThis] }";
    if (!Q(f) && !X(f)) {
      var Ze = Fe(f, ue),
        Or = fe ? fe(f) === Object.prototype : f instanceof Object || f.constructor === Object,
        Ye = f instanceof Object ? "" : "null prototype",
        Rr = !Or && G && Object(f) === f && G in f ? i.call(we(f), 8, -1) : Ye ? "Object" : "",
        ct = Or || typeof f.constructor != "function" ? "" : f.constructor.name ? f.constructor.name + " " : "",
        Xe = ct + (Rr || Ye ? "[" + R.call(L.call([], Rr || [], Ye || []), ": ") + "] " : "");
      return Ze.length === 0 ? Xe + "{}" : Ee ? Xe + "{" + Ke(Ze, Ee) + "}" : Xe + "{ " + R.call(Ze, ", ") + " }";
    }
    return String(f);
  };
  function N(s, f, M) {
    var _ = M.quoteStyle || f,
      k = D[_];
    return k + s + k;
  }
  function W(s) {
    return m.call(String(s), /"/g, "&quot;");
  }
  function q(s) {
    return !G || !(typeof s == "object" && (G in s || typeof s[G] < "u"));
  }
  function H(s) {
    return we(s) === "[object Array]" && q(s);
  }
  function Q(s) {
    return we(s) === "[object Date]" && q(s);
  }
  function X(s) {
    return we(s) === "[object RegExp]" && q(s);
  }
  function J(s) {
    return we(s) === "[object Error]" && q(s);
  }
  function z(s) {
    return we(s) === "[object String]" && q(s);
  }
  function Z(s) {
    return we(s) === "[object Number]" && q(s);
  }
  function re(s) {
    return we(s) === "[object Boolean]" && q(s);
  }
  function te(s) {
    if (K) return s && typeof s == "object" && s instanceof Symbol;
    if (typeof s == "symbol") return !0;
    if (!s || typeof s != "object" || !V) return !1;
    try {
      return V.call(s), !0;
    } catch {}
    return !1;
  }
  function ne(s) {
    if (!s || typeof s != "object" || !B) return !1;
    try {
      return B.call(s), !0;
    } catch {}
    return !1;
  }
  var Ce =
    Object.prototype.hasOwnProperty ||
    function (s) {
      return s in this;
    };
  function me(s, f) {
    return Ce.call(s, f);
  }
  function we(s) {
    return E.call(s);
  }
  function rt(s) {
    if (s.name) return s.name;
    var f = c.call(o.call(s), /^function\s*([\w$]+)/);
    return f ? f[1] : null;
  }
  function gr(s, f) {
    if (s.indexOf) return s.indexOf(f);
    for (var M = 0, _ = s.length; M < _; M++) if (s[M] === f) return M;
    return -1;
  }
  function tt(s) {
    if (!e || !s || typeof s != "object") return !1;
    try {
      e.call(s);
      try {
        S.call(s);
      } catch {
        return !0;
      }
      return s instanceof Map;
    } catch {}
    return !1;
  }
  function nt(s) {
    if (!d || !s || typeof s != "object") return !1;
    try {
      d.call(s, d);
      try {
        O.call(s, O);
      } catch {
        return !0;
      }
      return s instanceof WeakMap;
    } catch {}
    return !1;
  }
  function at(s) {
    if (!l || !s || typeof s != "object") return !1;
    try {
      return l.call(s), !0;
    } catch {}
    return !1;
  }
  function ot(s) {
    if (!S || !s || typeof s != "object") return !1;
    try {
      S.call(s);
      try {
        e.call(s);
      } catch {
        return !0;
      }
      return s instanceof Set;
    } catch {}
    return !1;
  }
  function it(s) {
    if (!O || !s || typeof s != "object") return !1;
    try {
      O.call(s, O);
      try {
        d.call(s, d);
      } catch {
        return !0;
      }
      return s instanceof WeakSet;
    } catch {}
    return !1;
  }
  function st(s) {
    return !s || typeof s != "object"
      ? !1
      : typeof HTMLElement < "u" && s instanceof HTMLElement
        ? !0
        : typeof s.nodeName == "string" && typeof s.getAttribute == "function";
  }
  function vr(s, f) {
    if (s.length > f.maxStringLength) {
      var M = s.length - f.maxStringLength,
        _ = "... " + M + " more character" + (M > 1 ? "s" : "");
      return vr(i.call(s, 0, f.maxStringLength), f) + _;
    }
    var k = U[f.quoteStyle || "single"];
    k.lastIndex = 0;
    var I = m.call(m.call(s, k, "\\$1"), /[\x00-\x1f]/g, ft);
    return N(I, "single", f);
  }
  function ft(s) {
    var f = s.charCodeAt(0),
      M = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[f];
    return M ? "\\" + M : "\\x" + (f < 16 ? "0" : "") + y.call(f.toString(16));
  }
  function Ae(s) {
    return "Object(" + s + ")";
  }
  function He(s) {
    return s + " { ? }";
  }
  function wr(s, f, M, _) {
    var k = _ ? Ke(M, _) : R.call(M, ", ");
    return s + " (" + f + ") {" + k + "}";
  }
  function ut(s) {
    for (var f = 0; f < s.length; f++)
      if (
        gr(
          s[f],
          `
`,
        ) >= 0
      )
        return !1;
    return !0;
  }
  function lt(s, f) {
    var M;
    if (s.indent === "	") M = "	";
    else if (typeof s.indent == "number" && s.indent > 0) M = R.call(Array(s.indent + 1), " ");
    else return null;
    return { base: M, prev: R.call(Array(f + 1), M) };
  }
  function Ke(s, f) {
    if (s.length === 0) return "";
    var M =
      `
` +
      f.prev +
      f.base;
    return (
      M +
      R.call(s, "," + M) +
      `
` +
      f.prev
    );
  }
  function Fe(s, f) {
    var M = H(s),
      _ = [];
    if (M) {
      _.length = s.length;
      for (var k = 0; k < s.length; k++) _[k] = me(s, k) ? f(s[k], s) : "";
    }
    var I = typeof A == "function" ? A(s) : [],
      Se;
    if (K) {
      Se = {};
      for (var xe = 0; xe < I.length; xe++) Se["$" + I[xe]] = I[xe];
    }
    for (var ae in s)
      me(s, ae) &&
        ((M && String(Number(ae)) === ae && ae < s.length) ||
          (K && Se["$" + ae] instanceof Symbol) ||
          (v.call(/[^\w$]/, ae) ? _.push(f(ae, s) + ": " + f(s[ae], s)) : _.push(ae + ": " + f(s[ae], s))));
    if (typeof A == "function")
      for (var be = 0; be < I.length; be++) ee.call(s, I[be]) && _.push("[" + f(I[be]) + "]: " + f(s[I[be]], s));
    return _;
  }
  return er;
}
var rr, Lr;
function $t() {
  if (Lr) return rr;
  Lr = 1;
  var r = ze(),
    t = ke(),
    e = function (u, w, d) {
      for (var x = u, O; (O = x.next) != null; x = O)
        if (O.key === w) return (x.next = O.next), d || ((O.next = u.next), (u.next = O)), O;
    },
    n = function (u, w) {
      if (u) {
        var d = e(u, w);
        return d && d.value;
      }
    },
    a = function (u, w, d) {
      var x = e(u, w);
      x ? (x.value = d) : (u.next = { key: w, next: u.next, value: d });
    },
    p = function (u, w) {
      return u ? !!e(u, w) : !1;
    },
    S = function (u, w) {
      if (u) return e(u, w, !0);
    };
  return (
    (rr = function () {
      var w,
        d = {
          assert: function (x) {
            if (!d.has(x)) throw new t("Side channel does not contain " + r(x));
          },
          delete: function (x) {
            var O = w && w.next,
              b = S(w, x);
            return b && O && O === b && (w = void 0), !!b;
          },
          get: function (x) {
            return n(w, x);
          },
          has: function (x) {
            return p(w, x);
          },
          set: function (x, O) {
            w || (w = { next: void 0 }), a(w, x, O);
          },
        };
      return d;
    }),
    rr
  );
}
var tr, Ir;
function Zr() {
  if (Ir) return tr;
  Ir = 1;
  var r = Kr(),
    t = Vr(),
    e = ze(),
    n = ke(),
    a = r("%Map%", !0),
    p = t("Map.prototype.get", !0),
    S = t("Map.prototype.set", !0),
    u = t("Map.prototype.has", !0),
    w = t("Map.prototype.delete", !0),
    d = t("Map.prototype.size", !0);
  return (
    (tr =
      !!a &&
      function () {
        var O,
          b = {
            assert: function (l) {
              if (!b.has(l)) throw new n("Side channel does not contain " + e(l));
            },
            delete: function (l) {
              if (O) {
                var h = w(O, l);
                return d(O) === 0 && (O = void 0), h;
              }
              return !1;
            },
            get: function (l) {
              if (O) return p(O, l);
            },
            has: function (l) {
              return O ? u(O, l) : !1;
            },
            set: function (l, h) {
              O || (O = new a()), S(O, l, h);
            },
          };
        return b;
      }),
    tr
  );
}
var nr, Dr;
function Lt() {
  if (Dr) return nr;
  Dr = 1;
  var r = Kr(),
    t = Vr(),
    e = ze(),
    n = Zr(),
    a = ke(),
    p = r("%WeakMap%", !0),
    S = t("WeakMap.prototype.get", !0),
    u = t("WeakMap.prototype.set", !0),
    w = t("WeakMap.prototype.has", !0),
    d = t("WeakMap.prototype.delete", !0);
  return (
    (nr = p
      ? function () {
          var O,
            b,
            l = {
              assert: function (h) {
                if (!l.has(h)) throw new a("Side channel does not contain " + e(h));
              },
              delete: function (h) {
                if (p && h && (typeof h == "object" || typeof h == "function")) {
                  if (O) return d(O, h);
                } else if (n && b) return b.delete(h);
                return !1;
              },
              get: function (h) {
                return p && h && (typeof h == "object" || typeof h == "function") && O ? S(O, h) : b && b.get(h);
              },
              has: function (h) {
                return p && h && (typeof h == "object" || typeof h == "function") && O ? w(O, h) : !!b && b.has(h);
              },
              set: function (h, E) {
                p && h && (typeof h == "object" || typeof h == "function")
                  ? (O || (O = new p()), u(O, h, E))
                  : n && (b || (b = n()), b.set(h, E));
              },
            };
          return l;
        }
      : n),
    nr
  );
}
var ar, Fr;
function It() {
  if (Fr) return ar;
  Fr = 1;
  var r = ke(),
    t = ze(),
    e = $t(),
    n = Zr(),
    a = Lt(),
    p = a || n || e;
  return (
    (ar = function () {
      var u,
        w = {
          assert: function (d) {
            if (!w.has(d)) throw new r("Side channel does not contain " + t(d));
          },
          delete: function (d) {
            return !!u && u.delete(d);
          },
          get: function (d) {
            return u && u.get(d);
          },
          has: function (d) {
            return !!u && u.has(d);
          },
          set: function (d, x) {
            u || (u = p()), u.set(d, x);
          },
        };
      return w;
    }),
    ar
  );
}
var or, Mr;
function mr() {
  if (Mr) return or;
  Mr = 1;
  var r = String.prototype.replace,
    t = /%20/g,
    e = { RFC1738: "RFC1738", RFC3986: "RFC3986" };
  return (
    (or = {
      default: e.RFC3986,
      formatters: {
        RFC1738: function (n) {
          return r.call(n, t, "+");
        },
        RFC3986: function (n) {
          return String(n);
        },
      },
      RFC1738: e.RFC1738,
      RFC3986: e.RFC3986,
    }),
    or
  );
}
var ir, Nr;
function Yr() {
  if (Nr) return ir;
  Nr = 1;
  var r = mr(),
    t = Object.prototype.hasOwnProperty,
    e = Array.isArray,
    n = (function () {
      for (var o = [], c = 0; c < 256; ++c) o.push("%" + ((c < 16 ? "0" : "") + c.toString(16)).toUpperCase());
      return o;
    })(),
    a = function (c) {
      for (; c.length > 1; ) {
        var i = c.pop(),
          m = i.obj[i.prop];
        if (e(m)) {
          for (var y = [], g = 0; g < m.length; ++g) typeof m[g] < "u" && y.push(m[g]);
          i.obj[i.prop] = y;
        }
      }
    },
    p = function (c, i) {
      for (var m = i && i.plainObjects ? Object.create(null) : {}, y = 0; y < c.length; ++y)
        typeof c[y] < "u" && (m[y] = c[y]);
      return m;
    },
    S = function o(c, i, m) {
      if (!i) return c;
      if (typeof i != "object") {
        if (e(c)) c.push(i);
        else if (c && typeof c == "object")
          ((m && (m.plainObjects || m.allowPrototypes)) || !t.call(Object.prototype, i)) && (c[i] = !0);
        else return [c, i];
        return c;
      }
      if (!c || typeof c != "object") return [c].concat(i);
      var y = c;
      return (
        e(c) && !e(i) && (y = p(c, m)),
        e(c) && e(i)
          ? (i.forEach(function (g, v) {
              if (t.call(c, v)) {
                var L = c[v];
                L && typeof L == "object" && g && typeof g == "object" ? (c[v] = o(L, g, m)) : c.push(g);
              } else c[v] = g;
            }),
            c)
          : Object.keys(i).reduce(function (g, v) {
              var L = i[v];
              return t.call(g, v) ? (g[v] = o(g[v], L, m)) : (g[v] = L), g;
            }, y)
      );
    },
    u = function (c, i) {
      return Object.keys(i).reduce(function (m, y) {
        return (m[y] = i[y]), m;
      }, c);
    },
    w = function (o, c, i) {
      var m = o.replace(/\+/g, " ");
      if (i === "iso-8859-1") return m.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(m);
      } catch {
        return m;
      }
    },
    d = 1024,
    x = function (c, i, m, y, g) {
      if (c.length === 0) return c;
      var v = c;
      if (
        (typeof c == "symbol" ? (v = Symbol.prototype.toString.call(c)) : typeof c != "string" && (v = String(c)),
        m === "iso-8859-1")
      )
        return escape(v).replace(/%u[0-9a-f]{4}/gi, function (V) {
          return "%26%23" + parseInt(V.slice(2), 16) + "%3B";
        });
      for (var L = "", R = 0; R < v.length; R += d) {
        for (var $ = v.length >= d ? v.slice(R, R + d) : v, C = [], B = 0; B < $.length; ++B) {
          var A = $.charCodeAt(B);
          if (
            A === 45 ||
            A === 46 ||
            A === 95 ||
            A === 126 ||
            (A >= 48 && A <= 57) ||
            (A >= 65 && A <= 90) ||
            (A >= 97 && A <= 122) ||
            (g === r.RFC1738 && (A === 40 || A === 41))
          ) {
            C[C.length] = $.charAt(B);
            continue;
          }
          if (A < 128) {
            C[C.length] = n[A];
            continue;
          }
          if (A < 2048) {
            C[C.length] = n[192 | (A >> 6)] + n[128 | (A & 63)];
            continue;
          }
          if (A < 55296 || A >= 57344) {
            C[C.length] = n[224 | (A >> 12)] + n[128 | ((A >> 6) & 63)] + n[128 | (A & 63)];
            continue;
          }
          (B += 1),
            (A = 65536 + (((A & 1023) << 10) | ($.charCodeAt(B) & 1023))),
            (C[C.length] =
              n[240 | (A >> 18)] + n[128 | ((A >> 12) & 63)] + n[128 | ((A >> 6) & 63)] + n[128 | (A & 63)]);
        }
        L += C.join("");
      }
      return L;
    },
    O = function (c) {
      for (var i = [{ obj: { o: c }, prop: "o" }], m = [], y = 0; y < i.length; ++y)
        for (var g = i[y], v = g.obj[g.prop], L = Object.keys(v), R = 0; R < L.length; ++R) {
          var $ = L[R],
            C = v[$];
          typeof C == "object" && C !== null && m.indexOf(C) === -1 && (i.push({ obj: v, prop: $ }), m.push(C));
        }
      return a(i), c;
    },
    b = function (c) {
      return Object.prototype.toString.call(c) === "[object RegExp]";
    },
    l = function (c) {
      return !c || typeof c != "object" ? !1 : !!(c.constructor && c.constructor.isBuffer && c.constructor.isBuffer(c));
    },
    h = function (c, i) {
      return [].concat(c, i);
    },
    E = function (c, i) {
      if (e(c)) {
        for (var m = [], y = 0; y < c.length; y += 1) m.push(i(c[y]));
        return m;
      }
      return i(c);
    };
  return (
    (ir = {
      arrayToObject: p,
      assign: u,
      combine: h,
      compact: O,
      decode: w,
      encode: x,
      isBuffer: l,
      isRegExp: b,
      maybeMap: E,
      merge: S,
    }),
    ir
  );
}
var sr, qr;
function Dt() {
  if (qr) return sr;
  qr = 1;
  var r = It(),
    t = Yr(),
    e = mr(),
    n = Object.prototype.hasOwnProperty,
    a = {
      brackets: function (o) {
        return o + "[]";
      },
      comma: "comma",
      indices: function (o, c) {
        return o + "[" + c + "]";
      },
      repeat: function (o) {
        return o;
      },
    },
    p = Array.isArray,
    S = Array.prototype.push,
    u = function (E, o) {
      S.apply(E, p(o) ? o : [o]);
    },
    w = Date.prototype.toISOString,
    d = e.default,
    x = {
      addQueryPrefix: !1,
      allowDots: !1,
      allowEmptyArrays: !1,
      arrayFormat: "indices",
      charset: "utf-8",
      charsetSentinel: !1,
      delimiter: "&",
      encode: !0,
      encodeDotInKeys: !1,
      encoder: t.encode,
      encodeValuesOnly: !1,
      format: d,
      formatter: e.formatters[d],
      indices: !1,
      serializeDate: function (o) {
        return w.call(o);
      },
      skipNulls: !1,
      strictNullHandling: !1,
    },
    O = function (o) {
      return (
        typeof o == "string" ||
        typeof o == "number" ||
        typeof o == "boolean" ||
        typeof o == "symbol" ||
        typeof o == "bigint"
      );
    },
    b = {},
    l = function E(o, c, i, m, y, g, v, L, R, $, C, B, A, V, K, G, ee, fe) {
      for (var F = o, pe = fe, T = 0, P = !1; (pe = pe.get(b)) !== void 0 && !P; ) {
        var D = pe.get(o);
        if (((T += 1), typeof D < "u")) {
          if (D === T) throw new RangeError("Cyclic object value");
          P = !0;
        }
        typeof pe.get(b) > "u" && (T = 0);
      }
      if (
        (typeof $ == "function"
          ? (F = $(c, F))
          : F instanceof Date
            ? (F = A(F))
            : i === "comma" &&
              p(F) &&
              (F = t.maybeMap(F, function (ne) {
                return ne instanceof Date ? A(ne) : ne;
              })),
        F === null)
      ) {
        if (g) return R && !G ? R(c, x.encoder, ee, "key", V) : c;
        F = "";
      }
      if (O(F) || t.isBuffer(F)) {
        if (R) {
          var U = G ? c : R(c, x.encoder, ee, "key", V);
          return [K(U) + "=" + K(R(F, x.encoder, ee, "value", V))];
        }
        return [K(c) + "=" + K(String(F))];
      }
      var N = [];
      if (typeof F > "u") return N;
      var W;
      if (i === "comma" && p(F))
        G && R && (F = t.maybeMap(F, R)), (W = [{ value: F.length > 0 ? F.join(",") || null : void 0 }]);
      else if (p($)) W = $;
      else {
        var q = Object.keys(F);
        W = C ? q.sort(C) : q;
      }
      var H = L ? c.replace(/\./g, "%2E") : c,
        Q = m && p(F) && F.length === 1 ? H + "[]" : H;
      if (y && p(F) && F.length === 0) return Q + "[]";
      for (var X = 0; X < W.length; ++X) {
        var J = W[X],
          z = typeof J == "object" && typeof J.value < "u" ? J.value : F[J];
        if (!(v && z === null)) {
          var Z = B && L ? J.replace(/\./g, "%2E") : J,
            re = p(F) ? (typeof i == "function" ? i(Q, Z) : Q) : Q + (B ? "." + Z : "[" + Z + "]");
          fe.set(o, T);
          var te = r();
          te.set(b, fe),
            u(N, E(z, re, i, m, y, g, v, L, i === "comma" && G && p(F) ? null : R, $, C, B, A, V, K, G, ee, te));
        }
      }
      return N;
    },
    h = function (o) {
      if (!o) return x;
      if (typeof o.allowEmptyArrays < "u" && typeof o.allowEmptyArrays != "boolean")
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      if (typeof o.encodeDotInKeys < "u" && typeof o.encodeDotInKeys != "boolean")
        throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
      if (o.encoder !== null && typeof o.encoder < "u" && typeof o.encoder != "function")
        throw new TypeError("Encoder has to be a function.");
      var c = o.charset || x.charset;
      if (typeof o.charset < "u" && o.charset !== "utf-8" && o.charset !== "iso-8859-1")
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      var i = e.default;
      if (typeof o.format < "u") {
        if (!n.call(e.formatters, o.format)) throw new TypeError("Unknown format option provided.");
        i = o.format;
      }
      var m = e.formatters[i],
        y = x.filter;
      (typeof o.filter == "function" || p(o.filter)) && (y = o.filter);
      var g;
      if (
        (o.arrayFormat in a
          ? (g = o.arrayFormat)
          : "indices" in o
            ? (g = o.indices ? "indices" : "repeat")
            : (g = x.arrayFormat),
        "commaRoundTrip" in o && typeof o.commaRoundTrip != "boolean")
      )
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      var v = typeof o.allowDots > "u" ? (o.encodeDotInKeys === !0 ? !0 : x.allowDots) : !!o.allowDots;
      return {
        addQueryPrefix: typeof o.addQueryPrefix == "boolean" ? o.addQueryPrefix : x.addQueryPrefix,
        allowDots: v,
        allowEmptyArrays: typeof o.allowEmptyArrays == "boolean" ? !!o.allowEmptyArrays : x.allowEmptyArrays,
        arrayFormat: g,
        charset: c,
        charsetSentinel: typeof o.charsetSentinel == "boolean" ? o.charsetSentinel : x.charsetSentinel,
        commaRoundTrip: o.commaRoundTrip,
        delimiter: typeof o.delimiter > "u" ? x.delimiter : o.delimiter,
        encode: typeof o.encode == "boolean" ? o.encode : x.encode,
        encodeDotInKeys: typeof o.encodeDotInKeys == "boolean" ? o.encodeDotInKeys : x.encodeDotInKeys,
        encoder: typeof o.encoder == "function" ? o.encoder : x.encoder,
        encodeValuesOnly: typeof o.encodeValuesOnly == "boolean" ? o.encodeValuesOnly : x.encodeValuesOnly,
        filter: y,
        format: i,
        formatter: m,
        serializeDate: typeof o.serializeDate == "function" ? o.serializeDate : x.serializeDate,
        skipNulls: typeof o.skipNulls == "boolean" ? o.skipNulls : x.skipNulls,
        sort: typeof o.sort == "function" ? o.sort : null,
        strictNullHandling: typeof o.strictNullHandling == "boolean" ? o.strictNullHandling : x.strictNullHandling,
      };
    };
  return (
    (sr = function (E, o) {
      var c = E,
        i = h(o),
        m,
        y;
      typeof i.filter == "function" ? ((y = i.filter), (c = y("", c))) : p(i.filter) && ((y = i.filter), (m = y));
      var g = [];
      if (typeof c != "object" || c === null) return "";
      var v = a[i.arrayFormat],
        L = v === "comma" && i.commaRoundTrip;
      m || (m = Object.keys(c)), i.sort && m.sort(i.sort);
      for (var R = r(), $ = 0; $ < m.length; ++$) {
        var C = m[$];
        (i.skipNulls && c[C] === null) ||
          u(
            g,
            l(
              c[C],
              C,
              v,
              L,
              i.allowEmptyArrays,
              i.strictNullHandling,
              i.skipNulls,
              i.encodeDotInKeys,
              i.encode ? i.encoder : null,
              i.filter,
              i.sort,
              i.allowDots,
              i.serializeDate,
              i.format,
              i.formatter,
              i.encodeValuesOnly,
              i.charset,
              R,
            ),
          );
      }
      var B = g.join(i.delimiter),
        A = i.addQueryPrefix === !0 ? "?" : "";
      return (
        i.charsetSentinel && (i.charset === "iso-8859-1" ? (A += "utf8=%26%2310003%3B&") : (A += "utf8=%E2%9C%93&")),
        B.length > 0 ? A + B : ""
      );
    }),
    sr
  );
}
var fr, Br;
function Ft() {
  if (Br) return fr;
  Br = 1;
  var r = Yr(),
    t = Object.prototype.hasOwnProperty,
    e = Array.isArray,
    n = {
      allowDots: !1,
      allowEmptyArrays: !1,
      allowPrototypes: !1,
      allowSparse: !1,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: !1,
      comma: !1,
      decodeDotInKeys: !1,
      decoder: r.decode,
      delimiter: "&",
      depth: 5,
      duplicates: "combine",
      ignoreQueryPrefix: !1,
      interpretNumericEntities: !1,
      parameterLimit: 1e3,
      parseArrays: !0,
      plainObjects: !1,
      strictDepth: !1,
      strictNullHandling: !1,
    },
    a = function (b) {
      return b.replace(/&#(\d+);/g, function (l, h) {
        return String.fromCharCode(parseInt(h, 10));
      });
    },
    p = function (b, l) {
      return b && typeof b == "string" && l.comma && b.indexOf(",") > -1 ? b.split(",") : b;
    },
    S = "utf8=%26%2310003%3B",
    u = "utf8=%E2%9C%93",
    w = function (l, h) {
      var E = { __proto__: null },
        o = h.ignoreQueryPrefix ? l.replace(/^\?/, "") : l;
      o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
      var c = h.parameterLimit === 1 / 0 ? void 0 : h.parameterLimit,
        i = o.split(h.delimiter, c),
        m = -1,
        y,
        g = h.charset;
      if (h.charsetSentinel)
        for (y = 0; y < i.length; ++y)
          i[y].indexOf("utf8=") === 0 &&
            (i[y] === u ? (g = "utf-8") : i[y] === S && (g = "iso-8859-1"), (m = y), (y = i.length));
      for (y = 0; y < i.length; ++y)
        if (y !== m) {
          var v = i[y],
            L = v.indexOf("]="),
            R = L === -1 ? v.indexOf("=") : L + 1,
            $,
            C;
          R === -1
            ? (($ = h.decoder(v, n.decoder, g, "key")), (C = h.strictNullHandling ? null : ""))
            : (($ = h.decoder(v.slice(0, R), n.decoder, g, "key")),
              (C = r.maybeMap(p(v.slice(R + 1), h), function (A) {
                return h.decoder(A, n.decoder, g, "value");
              }))),
            C && h.interpretNumericEntities && g === "iso-8859-1" && (C = a(C)),
            v.indexOf("[]=") > -1 && (C = e(C) ? [C] : C);
          var B = t.call(E, $);
          B && h.duplicates === "combine" ? (E[$] = r.combine(E[$], C)) : (!B || h.duplicates === "last") && (E[$] = C);
        }
      return E;
    },
    d = function (b, l, h, E) {
      for (var o = E ? l : p(l, h), c = b.length - 1; c >= 0; --c) {
        var i,
          m = b[c];
        if (m === "[]" && h.parseArrays)
          i = h.allowEmptyArrays && (o === "" || (h.strictNullHandling && o === null)) ? [] : [].concat(o);
        else {
          i = h.plainObjects ? Object.create(null) : {};
          var y = m.charAt(0) === "[" && m.charAt(m.length - 1) === "]" ? m.slice(1, -1) : m,
            g = h.decodeDotInKeys ? y.replace(/%2E/g, ".") : y,
            v = parseInt(g, 10);
          !h.parseArrays && g === ""
            ? (i = { 0: o })
            : !isNaN(v) && m !== g && String(v) === g && v >= 0 && h.parseArrays && v <= h.arrayLimit
              ? ((i = []), (i[v] = o))
              : g !== "__proto__" && (i[g] = o);
        }
        o = i;
      }
      return o;
    },
    x = function (l, h, E, o) {
      if (l) {
        var c = E.allowDots ? l.replace(/\.([^.[]+)/g, "[$1]") : l,
          i = /(\[[^[\]]*])/,
          m = /(\[[^[\]]*])/g,
          y = E.depth > 0 && i.exec(c),
          g = y ? c.slice(0, y.index) : c,
          v = [];
        if (g) {
          if (!E.plainObjects && t.call(Object.prototype, g) && !E.allowPrototypes) return;
          v.push(g);
        }
        for (var L = 0; E.depth > 0 && (y = m.exec(c)) !== null && L < E.depth; ) {
          if (((L += 1), !E.plainObjects && t.call(Object.prototype, y[1].slice(1, -1)) && !E.allowPrototypes)) return;
          v.push(y[1]);
        }
        if (y) {
          if (E.strictDepth === !0)
            throw new RangeError("Input depth exceeded depth option of " + E.depth + " and strictDepth is true");
          v.push("[" + c.slice(y.index) + "]");
        }
        return d(v, h, E, o);
      }
    },
    O = function (l) {
      if (!l) return n;
      if (typeof l.allowEmptyArrays < "u" && typeof l.allowEmptyArrays != "boolean")
        throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
      if (typeof l.decodeDotInKeys < "u" && typeof l.decodeDotInKeys != "boolean")
        throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
      if (l.decoder !== null && typeof l.decoder < "u" && typeof l.decoder != "function")
        throw new TypeError("Decoder has to be a function.");
      if (typeof l.charset < "u" && l.charset !== "utf-8" && l.charset !== "iso-8859-1")
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      var h = typeof l.charset > "u" ? n.charset : l.charset,
        E = typeof l.duplicates > "u" ? n.duplicates : l.duplicates;
      if (E !== "combine" && E !== "first" && E !== "last")
        throw new TypeError("The duplicates option must be either combine, first, or last");
      var o = typeof l.allowDots > "u" ? (l.decodeDotInKeys === !0 ? !0 : n.allowDots) : !!l.allowDots;
      return {
        allowDots: o,
        allowEmptyArrays: typeof l.allowEmptyArrays == "boolean" ? !!l.allowEmptyArrays : n.allowEmptyArrays,
        allowPrototypes: typeof l.allowPrototypes == "boolean" ? l.allowPrototypes : n.allowPrototypes,
        allowSparse: typeof l.allowSparse == "boolean" ? l.allowSparse : n.allowSparse,
        arrayLimit: typeof l.arrayLimit == "number" ? l.arrayLimit : n.arrayLimit,
        charset: h,
        charsetSentinel: typeof l.charsetSentinel == "boolean" ? l.charsetSentinel : n.charsetSentinel,
        comma: typeof l.comma == "boolean" ? l.comma : n.comma,
        decodeDotInKeys: typeof l.decodeDotInKeys == "boolean" ? l.decodeDotInKeys : n.decodeDotInKeys,
        decoder: typeof l.decoder == "function" ? l.decoder : n.decoder,
        delimiter: typeof l.delimiter == "string" || r.isRegExp(l.delimiter) ? l.delimiter : n.delimiter,
        depth: typeof l.depth == "number" || l.depth === !1 ? +l.depth : n.depth,
        duplicates: E,
        ignoreQueryPrefix: l.ignoreQueryPrefix === !0,
        interpretNumericEntities:
          typeof l.interpretNumericEntities == "boolean" ? l.interpretNumericEntities : n.interpretNumericEntities,
        parameterLimit: typeof l.parameterLimit == "number" ? l.parameterLimit : n.parameterLimit,
        parseArrays: l.parseArrays !== !1,
        plainObjects: typeof l.plainObjects == "boolean" ? l.plainObjects : n.plainObjects,
        strictDepth: typeof l.strictDepth == "boolean" ? !!l.strictDepth : n.strictDepth,
        strictNullHandling: typeof l.strictNullHandling == "boolean" ? l.strictNullHandling : n.strictNullHandling,
      };
    };
  return (
    (fr = function (b, l) {
      var h = O(l);
      if (b === "" || b === null || typeof b > "u") return h.plainObjects ? Object.create(null) : {};
      for (
        var E = typeof b == "string" ? w(b, h) : b,
          o = h.plainObjects ? Object.create(null) : {},
          c = Object.keys(E),
          i = 0;
        i < c.length;
        ++i
      ) {
        var m = c[i],
          y = x(m, E[m], h, typeof b == "string");
        o = r.merge(o, y, h);
      }
      return h.allowSparse === !0 ? o : r.compact(o);
    }),
    fr
  );
}
var ur, Ur;
function Mt() {
  if (Ur) return ur;
  Ur = 1;
  var r = Dt(),
    t = Ft(),
    e = mr();
  return (ur = { formats: e, parse: t, stringify: r }), ur;
}
var Nt = Mt();
const qt = dr(Nt);
var Bt = Pt;
function he() {
  (this.protocol = null),
    (this.slashes = null),
    (this.auth = null),
    (this.host = null),
    (this.port = null),
    (this.hostname = null),
    (this.hash = null),
    (this.search = null),
    (this.query = null),
    (this.pathname = null),
    (this.path = null),
    (this.href = null);
}
var Ut = /^([a-z0-9.+-]+:)/i,
  _t = /:[0-9]*$/,
  kt = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,
  Wt = [
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    `
`,
    "	",
  ],
  zt = ["{", "}", "|", "\\", "^", "`"].concat(Wt),
  cr = ["'"].concat(zt),
  _r = ["%", "/", "?", ";", "#"].concat(cr),
  kr = ["/", "?", "#"],
  Ht = 255,
  Wr = /^[+a-z0-9A-Z_-]{0,63}$/,
  Kt = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  Vt = { javascript: !0, "javascript:": !0 },
  hr = { javascript: !0, "javascript:": !0 },
  Re = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0,
  },
  pr = qt;
function Xr(r, t, e) {
  if (r && typeof r == "object" && r instanceof he) return r;
  var n = new he();
  return n.parse(r, t, e), n;
}
he.prototype.parse = function (r, t, e) {
  if (typeof r != "string") throw new TypeError("Parameter 'url' must be a string, not " + typeof r);
  var n = r.indexOf("?"),
    a = n !== -1 && n < r.indexOf("#") ? "?" : "#",
    p = r.split(a),
    S = /\\/g;
  (p[0] = p[0].replace(S, "/")), (r = p.join(a));
  var u = r;
  if (((u = u.trim()), !e && r.split("#").length === 1)) {
    var w = kt.exec(u);
    if (w)
      return (
        (this.path = u),
        (this.href = u),
        (this.pathname = w[1]),
        w[2]
          ? ((this.search = w[2]),
            t ? (this.query = pr.parse(this.search.substr(1))) : (this.query = this.search.substr(1)))
          : t && ((this.search = ""), (this.query = {})),
        this
      );
  }
  var d = Ut.exec(u);
  if (d) {
    d = d[0];
    var x = d.toLowerCase();
    (this.protocol = x), (u = u.substr(d.length));
  }
  if (e || d || u.match(/^\/\/[^@/]+@[^@/]+/)) {
    var O = u.substr(0, 2) === "//";
    O && !(d && hr[d]) && ((u = u.substr(2)), (this.slashes = !0));
  }
  if (!hr[d] && (O || (d && !Re[d]))) {
    for (var b = -1, l = 0; l < kr.length; l++) {
      var h = u.indexOf(kr[l]);
      h !== -1 && (b === -1 || h < b) && (b = h);
    }
    var E, o;
    b === -1 ? (o = u.lastIndexOf("@")) : (o = u.lastIndexOf("@", b)),
      o !== -1 && ((E = u.slice(0, o)), (u = u.slice(o + 1)), (this.auth = decodeURIComponent(E))),
      (b = -1);
    for (var l = 0; l < _r.length; l++) {
      var h = u.indexOf(_r[l]);
      h !== -1 && (b === -1 || h < b) && (b = h);
    }
    b === -1 && (b = u.length),
      (this.host = u.slice(0, b)),
      (u = u.slice(b)),
      this.parseHost(),
      (this.hostname = this.hostname || "");
    var c = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!c)
      for (var i = this.hostname.split(/\./), l = 0, m = i.length; l < m; l++) {
        var y = i[l];
        if (y && !y.match(Wr)) {
          for (var g = "", v = 0, L = y.length; v < L; v++) y.charCodeAt(v) > 127 ? (g += "x") : (g += y[v]);
          if (!g.match(Wr)) {
            var R = i.slice(0, l),
              $ = i.slice(l + 1),
              C = y.match(Kt);
            C && (R.push(C[1]), $.unshift(C[2])),
              $.length && (u = "/" + $.join(".") + u),
              (this.hostname = R.join("."));
            break;
          }
        }
      }
    this.hostname.length > Ht ? (this.hostname = "") : (this.hostname = this.hostname.toLowerCase()),
      c || (this.hostname = Bt.toASCII(this.hostname));
    var B = this.port ? ":" + this.port : "",
      A = this.hostname || "";
    (this.host = A + B),
      (this.href += this.host),
      c && ((this.hostname = this.hostname.substr(1, this.hostname.length - 2)), u[0] !== "/" && (u = "/" + u));
  }
  if (!Vt[x])
    for (var l = 0, m = cr.length; l < m; l++) {
      var V = cr[l];
      if (u.indexOf(V) !== -1) {
        var K = encodeURIComponent(V);
        K === V && (K = escape(V)), (u = u.split(V).join(K));
      }
    }
  var G = u.indexOf("#");
  G !== -1 && ((this.hash = u.substr(G)), (u = u.slice(0, G)));
  var ee = u.indexOf("?");
  if (
    (ee !== -1
      ? ((this.search = u.substr(ee)),
        (this.query = u.substr(ee + 1)),
        t && (this.query = pr.parse(this.query)),
        (u = u.slice(0, ee)))
      : t && ((this.search = ""), (this.query = {})),
    u && (this.pathname = u),
    Re[x] && this.hostname && !this.pathname && (this.pathname = "/"),
    this.pathname || this.search)
  ) {
    var B = this.pathname || "",
      fe = this.search || "";
    this.path = B + fe;
  }
  return (this.href = this.format()), this;
};
function Gt(r) {
  return typeof r == "string" && (r = Xr(r)), r instanceof he ? r.format() : he.prototype.format.call(r);
}
he.prototype.format = function () {
  var r = this.auth || "";
  r && ((r = encodeURIComponent(r)), (r = r.replace(/%3A/i, ":")), (r += "@"));
  var t = this.protocol || "",
    e = this.pathname || "",
    n = this.hash || "",
    a = !1,
    p = "";
  this.host
    ? (a = r + this.host)
    : this.hostname &&
      ((a = r + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]")),
      this.port && (a += ":" + this.port)),
    this.query &&
      typeof this.query == "object" &&
      Object.keys(this.query).length &&
      (p = pr.stringify(this.query, { arrayFormat: "repeat", addQueryPrefix: !1 }));
  var S = this.search || (p && "?" + p) || "";
  return (
    t && t.substr(-1) !== ":" && (t += ":"),
    this.slashes || ((!t || Re[t]) && a !== !1)
      ? ((a = "//" + (a || "")), e && e.charAt(0) !== "/" && (e = "/" + e))
      : a || (a = ""),
    n && n.charAt(0) !== "#" && (n = "#" + n),
    S && S.charAt(0) !== "?" && (S = "?" + S),
    (e = e.replace(/[?#]/g, function (u) {
      return encodeURIComponent(u);
    })),
    (S = S.replace("#", "%23")),
    t + a + e + S + n
  );
};
he.prototype.resolve = function (r) {
  return this.resolveObject(Xr(r, !1, !0)).format();
};
he.prototype.resolveObject = function (r) {
  if (typeof r == "string") {
    var t = new he();
    t.parse(r, !1, !0), (r = t);
  }
  for (var e = new he(), n = Object.keys(this), a = 0; a < n.length; a++) {
    var p = n[a];
    e[p] = this[p];
  }
  if (((e.hash = r.hash), r.href === "")) return (e.href = e.format()), e;
  if (r.slashes && !r.protocol) {
    for (var S = Object.keys(r), u = 0; u < S.length; u++) {
      var w = S[u];
      w !== "protocol" && (e[w] = r[w]);
    }
    return (
      Re[e.protocol] && e.hostname && !e.pathname && ((e.pathname = "/"), (e.path = e.pathname)),
      (e.href = e.format()),
      e
    );
  }
  if (r.protocol && r.protocol !== e.protocol) {
    if (!Re[r.protocol]) {
      for (var d = Object.keys(r), x = 0; x < d.length; x++) {
        var O = d[x];
        e[O] = r[O];
      }
      return (e.href = e.format()), e;
    }
    if (((e.protocol = r.protocol), !r.host && !hr[r.protocol])) {
      for (var m = (r.pathname || "").split("/"); m.length && !(r.host = m.shift()); );
      r.host || (r.host = ""),
        r.hostname || (r.hostname = ""),
        m[0] !== "" && m.unshift(""),
        m.length < 2 && m.unshift(""),
        (e.pathname = m.join("/"));
    } else e.pathname = r.pathname;
    if (
      ((e.search = r.search),
      (e.query = r.query),
      (e.host = r.host || ""),
      (e.auth = r.auth),
      (e.hostname = r.hostname || r.host),
      (e.port = r.port),
      e.pathname || e.search)
    ) {
      var b = e.pathname || "",
        l = e.search || "";
      e.path = b + l;
    }
    return (e.slashes = e.slashes || r.slashes), (e.href = e.format()), e;
  }
  var h = e.pathname && e.pathname.charAt(0) === "/",
    E = r.host || (r.pathname && r.pathname.charAt(0) === "/"),
    o = E || h || (e.host && r.pathname),
    c = o,
    i = (e.pathname && e.pathname.split("/")) || [],
    m = (r.pathname && r.pathname.split("/")) || [],
    y = e.protocol && !Re[e.protocol];
  if (
    (y &&
      ((e.hostname = ""),
      (e.port = null),
      e.host && (i[0] === "" ? (i[0] = e.host) : i.unshift(e.host)),
      (e.host = ""),
      r.protocol &&
        ((r.hostname = null),
        (r.port = null),
        r.host && (m[0] === "" ? (m[0] = r.host) : m.unshift(r.host)),
        (r.host = null)),
      (o = o && (m[0] === "" || i[0] === ""))),
    E)
  )
    (e.host = r.host || r.host === "" ? r.host : e.host),
      (e.hostname = r.hostname || r.hostname === "" ? r.hostname : e.hostname),
      (e.search = r.search),
      (e.query = r.query),
      (i = m);
  else if (m.length) i || (i = []), i.pop(), (i = i.concat(m)), (e.search = r.search), (e.query = r.query);
  else if (r.search != null) {
    if (y) {
      (e.host = i.shift()), (e.hostname = e.host);
      var g = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
      g && ((e.auth = g.shift()), (e.hostname = g.shift()), (e.host = e.hostname));
    }
    return (
      (e.search = r.search),
      (e.query = r.query),
      (e.pathname !== null || e.search !== null) &&
        (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")),
      (e.href = e.format()),
      e
    );
  }
  if (!i.length)
    return (e.pathname = null), e.search ? (e.path = "/" + e.search) : (e.path = null), (e.href = e.format()), e;
  for (
    var v = i.slice(-1)[0],
      L = ((e.host || r.host || i.length > 1) && (v === "." || v === "..")) || v === "",
      R = 0,
      $ = i.length;
    $ >= 0;
    $--
  )
    (v = i[$]), v === "." ? i.splice($, 1) : v === ".." ? (i.splice($, 1), R++) : R && (i.splice($, 1), R--);
  if (!o && !c) for (; R--; R) i.unshift("..");
  o && i[0] !== "" && (!i[0] || i[0].charAt(0) !== "/") && i.unshift(""),
    L && i.join("/").substr(-1) !== "/" && i.push("");
  var C = i[0] === "" || (i[0] && i[0].charAt(0) === "/");
  if (y) {
    (e.hostname = C ? "" : i.length ? i.shift() : ""), (e.host = e.hostname);
    var g = e.host && e.host.indexOf("@") > 0 ? e.host.split("@") : !1;
    g && ((e.auth = g.shift()), (e.hostname = g.shift()), (e.host = e.hostname));
  }
  return (
    (o = o || (e.host && i.length)),
    o && !C && i.unshift(""),
    i.length > 0 ? (e.pathname = i.join("/")) : ((e.pathname = null), (e.path = null)),
    (e.pathname !== null || e.search !== null) &&
      (e.path = (e.pathname ? e.pathname : "") + (e.search ? e.search : "")),
    (e.auth = r.auth || e.auth),
    (e.slashes = e.slashes || r.slashes),
    (e.href = e.format()),
    e
  );
};
he.prototype.parseHost = function () {
  var r = this.host,
    t = _t.exec(r);
  t && ((t = t[0]), t !== ":" && (this.port = t.substr(1)), (r = r.substr(0, r.length - t.length))),
    r && (this.hostname = r);
};
var Qt = Gt,
  jr = (function (r) {
    function t() {
      var n = this || self;
      return delete r.prototype.__magic__, n;
    }
    if (typeof globalThis == "object") return globalThis;
    if (this) return t();
    r.defineProperty(r.prototype, "__magic__", { configurable: !0, get: t });
    var e = __magic__;
    return e;
  })(Object),
  Jt = Qt,
  zr = jr.URL;
jr.URLSearchParams;
var Zt = function (t, e) {
  var n, a, p, S;
  if ((e === void 0 && (e = {}), !(t instanceof zr))) return Jt(t);
  if (typeof e != "object" || e === null) throw new TypeError('The "options" argument must be of type object.');
  var u = (n = e.auth) != null ? n : !0,
    w = (a = e.fragment) != null ? a : !0,
    d = (p = e.search) != null ? p : !0;
  (S = e.unicode) != null;
  var x = new zr(t.toString());
  return u || ((x.username = ""), (x.password = "")), w || (x.hash = ""), d || (x.search = ""), x.toString();
};
const Yt = (r) => {
  if (r.search) return r.search;
  const t = r.href.length - 1,
    e = r.hash || (r.href[t] === "#" ? "#" : "");
  return r.href[t - e.length] === "?" ? "?" : "";
};
function Hr(r, t = !1) {
  return r == null || ((r = new URL(r)), /^(about|blob|data):$/.test(r.protocol))
    ? "no-referrer"
    : ((r.username = ""), (r.password = ""), (r.hash = ""), t && ((r.pathname = ""), (r.search = "")), r);
}
const et = new Set([
    "",
    "no-referrer",
    "no-referrer-when-downgrade",
    "same-origin",
    "origin",
    "strict-origin",
    "origin-when-cross-origin",
    "strict-origin-when-cross-origin",
    "unsafe-url",
  ]),
  Xt = "strict-origin-when-cross-origin";
function jt(r) {
  if (!et.has(r)) throw new TypeError(`Invalid referrerPolicy: ${r}`);
  return r;
}
function en(r) {
  if (/^(http|ws)s:$/.test(r.protocol)) return !0;
  const t = r.host.replace(/(^\[)|(]$)/g, ""),
    e = mt.isIP(t);
  return (e === 4 && /^127\./.test(t)) || (e === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(t))
    ? !0
    : r.host === "localhost" || r.host.endsWith(".localhost")
      ? !1
      : r.protocol === "file:";
}
function Oe(r) {
  return /^about:(blank|srcdoc)$/.test(r) || r.protocol === "data:" || /^(blob|filesystem):$/.test(r.protocol)
    ? !0
    : en(r);
}
function rn(r, { referrerURLCallback: t, referrerOriginCallback: e } = {}) {
  if (r.referrer === "no-referrer" || r.referrerPolicy === "") return null;
  const n = r.referrerPolicy;
  if (r.referrer === "about:client") return "no-referrer";
  const a = r.referrer;
  let p = Hr(a),
    S = Hr(a, !0);
  p.toString().length > 4096 && (p = S), t && (p = t(p)), e && (S = e(S));
  const u = new URL(r.url);
  switch (n) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return S;
    case "unsafe-url":
      return p;
    case "strict-origin":
      return Oe(p) && !Oe(u) ? "no-referrer" : S.toString();
    case "strict-origin-when-cross-origin":
      return p.origin === u.origin ? p : Oe(p) && !Oe(u) ? "no-referrer" : S;
    case "same-origin":
      return p.origin === u.origin ? p : "no-referrer";
    case "origin-when-cross-origin":
      return p.origin === u.origin ? p : S;
    case "no-referrer-when-downgrade":
      return Oe(p) && !Oe(u) ? "no-referrer" : p;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${n}`);
  }
}
function tn(r) {
  const t = (r.get("referrer-policy") || "").split(/[,\s]+/);
  let e = "";
  for (const n of t) n && et.has(n) && (e = n);
  return e;
}
const Y = Symbol("Request internals"),
  $e = (r) => typeof r == "object" && typeof r[Y] == "object",
  nn = ge.deprecate(
    () => {},
    ".data is not a valid RequestInit property, use .body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (request)",
  );
class De extends Ie {
  constructor(t, e = {}) {
    let n;
    if (($e(t) ? (n = new URL(t.url)) : ((n = new URL(t)), (t = {})), n.username !== "" || n.password !== ""))
      throw new TypeError(`${n} is an url with embedded credentials.`);
    let a = e.method || t.method || "GET";
    if (
      (/^(delete|get|head|options|post|put)$/i.test(a) && (a = a.toUpperCase()),
      !$e(e) && "data" in e && nn(),
      (e.body != null || ($e(t) && t.body !== null)) && (a === "GET" || a === "HEAD"))
    )
      throw new TypeError("Request with GET/HEAD method cannot have body");
    const p = e.body ? e.body : $e(t) && t.body !== null ? yr(t) : null;
    super(p, { size: e.size || t.size || 0 });
    const S = new ve(e.headers || t.headers || {});
    if (p !== null && !S.has("Content-Type")) {
      const d = Qr(p);
      d && S.set("Content-Type", d);
    }
    let u = $e(t) ? t.signal : null;
    if (("signal" in e && (u = e.signal), u != null && !gt(u)))
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    let w = e.referrer == null ? t.referrer : e.referrer;
    if (w === "") w = "no-referrer";
    else if (w) {
      const d = new URL(w);
      w = /^about:(\/\/)?client$/.test(d) ? "client" : d;
    } else w = void 0;
    (this[Y] = {
      method: a,
      redirect: e.redirect || t.redirect || "follow",
      headers: S,
      parsedURL: n,
      signal: u,
      referrer: w,
    }),
      (this.follow = e.follow === void 0 ? (t.follow === void 0 ? 20 : t.follow) : e.follow),
      (this.compress = e.compress === void 0 ? (t.compress === void 0 ? !0 : t.compress) : e.compress),
      (this.counter = e.counter || t.counter || 0),
      (this.agent = e.agent || t.agent),
      (this.highWaterMark = e.highWaterMark || t.highWaterMark || 16384),
      (this.insecureHTTPParser = e.insecureHTTPParser || t.insecureHTTPParser || !1),
      (this.referrerPolicy = e.referrerPolicy || t.referrerPolicy || "");
  }
  get method() {
    return this[Y].method;
  }
  get url() {
    return Zt(this[Y].parsedURL);
  }
  get headers() {
    return this[Y].headers;
  }
  get redirect() {
    return this[Y].redirect;
  }
  get signal() {
    return this[Y].signal;
  }
  get referrer() {
    if (this[Y].referrer === "no-referrer") return "";
    if (this[Y].referrer === "client") return "about:client";
    if (this[Y].referrer) return this[Y].referrer.toString();
  }
  get referrerPolicy() {
    return this[Y].referrerPolicy;
  }
  set referrerPolicy(t) {
    this[Y].referrerPolicy = jt(t);
  }
  clone() {
    return new De(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
}
Object.defineProperties(De.prototype, {
  method: { enumerable: !0 },
  url: { enumerable: !0 },
  headers: { enumerable: !0 },
  redirect: { enumerable: !0 },
  clone: { enumerable: !0 },
  signal: { enumerable: !0 },
  referrer: { enumerable: !0 },
  referrerPolicy: { enumerable: !0 },
});
const an = (r) => {
  const { parsedURL: t } = r[Y],
    e = new ve(r[Y].headers);
  e.has("Accept") || e.set("Accept", "*/*");
  let n = null;
  if ((r.body === null && /^(post|put)$/i.test(r.method) && (n = "0"), r.body !== null)) {
    const u = xt(r);
    typeof u == "number" && !Number.isNaN(u) && (n = String(u));
  }
  n && e.set("Content-Length", n),
    r.referrerPolicy === "" && (r.referrerPolicy = Xt),
    r.referrer && r.referrer !== "no-referrer" ? (r[Y].referrer = rn(r)) : (r[Y].referrer = "no-referrer"),
    r[Y].referrer instanceof URL && e.set("Referer", r.referrer),
    e.has("User-Agent") || e.set("User-Agent", "node-fetch"),
    r.compress && !e.has("Accept-Encoding") && e.set("Accept-Encoding", "gzip, deflate, br");
  let { agent: a } = r;
  typeof a == "function" && (a = a(t)), !e.has("Connection") && !a && e.set("Connection", "close");
  const p = Yt(t),
    S = {
      path: t.pathname + p,
      method: r.method,
      headers: e[Symbol.for("nodejs.util.inspect.custom")](),
      insecureHTTPParser: r.insecureHTTPParser,
      agent: a,
    };
  return { parsedURL: t, options: S };
};
class on extends We {
  constructor(t, e = "aborted") {
    super(t, e);
  }
}
const sn = new Set(["data:", "http:", "https:"]);
async function fn(r, t) {
  return new Promise((e, n) => {
    const a = new De(r, t),
      { parsedURL: p, options: S } = an(a);
    if (!sn.has(p.protocol))
      throw new TypeError(
        `node-fetch cannot load ${r}. URL scheme "${p.protocol.replace(/:$/, "")}" is not supported.`,
      );
    const u = (p.protocol === "https:" ? ie : ie).request,
      { signal: w } = a;
    let d = null;
    const x = () => {
      const h = new on("The operation was aborted.");
      n(h), a.body && a.body instanceof ye.Readable && a.body.destroy(h), !(!d || !d.body) && d.body.emit("error", h);
    };
    if (w && w.aborted) {
      x();
      return;
    }
    const O = () => {
        x(), l();
      },
      b = u(p.toString(), S);
    w && w.addEventListener("abort", O);
    const l = () => {
      b.abort(), w && w.removeEventListener("abort", O);
    };
    b.on("error", (h) => {
      n(new de(`request to ${a.url} failed, reason: ${h.message}`, "system", h)), l();
    }),
      un(b, (h) => {
        d && d.body && d.body.destroy(h);
      }),
      Ar.version < "v14" &&
        b.on("socket", (h) => {
          let E;
          h.prependListener("end", () => {
            E = h._eventsCount;
          }),
            h.prependListener("close", (o) => {
              if (d && E < h._eventsCount && !o) {
                const c = new Error("Premature close");
                (c.code = "ERR_STREAM_PREMATURE_CLOSE"), d.body.emit("error", c);
              }
            });
        }),
      b.on("response", (h) => {
        b.setTimeout(0);
        const E = Tt(h.rawHeaders);
        if (Jr(h.statusCode)) {
          const y = E.get("Location");
          let g = null;
          try {
            g = y === null ? null : new URL(y, a.url);
          } catch {
            if (a.redirect !== "manual") {
              n(new de(`uri requested responds with an invalid redirect URL: ${y}`, "invalid-redirect")), l();
              return;
            }
          }
          switch (a.redirect) {
            case "error":
              n(
                new de(
                  `uri requested responds with a redirect, redirect mode is set to error: ${a.url}`,
                  "no-redirect",
                ),
              ),
                l();
              return;
            case "manual":
              break;
            case "follow": {
              if (g === null) break;
              if (a.counter >= a.follow) {
                n(new de(`maximum redirect reached at: ${a.url}`, "max-redirect")), l();
                return;
              }
              const v = {
                headers: new ve(a.headers),
                follow: a.follow,
                counter: a.counter + 1,
                agent: a.agent,
                compress: a.compress,
                method: a.method,
                body: yr(a),
                signal: a.signal,
                size: a.size,
                referrer: a.referrer,
                referrerPolicy: a.referrerPolicy,
              };
              if (!vt(a.url, g) || !wt(a.url, g))
                for (const R of ["authorization", "www-authenticate", "cookie", "cookie2"]) v.headers.delete(R);
              if (h.statusCode !== 303 && a.body && t.body instanceof ye.Readable) {
                n(new de("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), l();
                return;
              }
              (h.statusCode === 303 || ((h.statusCode === 301 || h.statusCode === 302) && a.method === "POST")) &&
                ((v.method = "GET"), (v.body = void 0), v.headers.delete("content-length"));
              const L = tn(E);
              L && (v.referrerPolicy = L), e(fn(new De(g, v))), l();
              return;
            }
            default:
              return n(new TypeError(`Redirect option '${a.redirect}' is not a valid value of RequestRedirect`));
          }
        }
        w &&
          h.once("end", () => {
            w.removeEventListener("abort", O);
          });
        let o = ce.pipeline(h, new ce.PassThrough(), (y) => {
          y && n(y);
        });
        Ar.version < "v12.10" && h.on("aborted", O);
        const c = {
            url: a.url,
            status: h.statusCode,
            statusText: h.statusMessage,
            headers: E,
            size: a.size,
            counter: a.counter,
            highWaterMark: a.highWaterMark,
          },
          i = E.get("Content-Encoding");
        if (!a.compress || a.method === "HEAD" || i === null || h.statusCode === 204 || h.statusCode === 304) {
          (d = new se(o, c)), e(d);
          return;
        }
        const m = { flush: ie.Z_SYNC_FLUSH, finishFlush: ie.Z_SYNC_FLUSH };
        if (i === "gzip" || i === "x-gzip") {
          (o = ce.pipeline(o, ie.createGunzip(m), (y) => {
            y && n(y);
          })),
            (d = new se(o, c)),
            e(d);
          return;
        }
        if (i === "deflate" || i === "x-deflate") {
          const y = ce.pipeline(h, new ce.PassThrough(), (g) => {
            g && n(g);
          });
          y.once("data", (g) => {
            (g[0] & 15) === 8
              ? (o = ce.pipeline(o, ie.createInflate(), (v) => {
                  v && n(v);
                }))
              : (o = ce.pipeline(o, ie.createInflateRaw(), (v) => {
                  v && n(v);
                })),
              (d = new se(o, c)),
              e(d);
          }),
            y.once("end", () => {
              d || ((d = new se(o, c)), e(d));
            });
          return;
        }
        if (i === "br") {
          (o = ce.pipeline(o, ie.createBrotliDecompress(), (y) => {
            y && n(y);
          })),
            (d = new se(o, c)),
            e(d);
          return;
        }
        (d = new se(o, c)), e(d);
      }),
      Et(b, a).catch(n);
  });
}
function un(r, t) {
  const e = j.from(`0\r
\r
`);
  let n = !1,
    a = !1,
    p;
  r.on("response", (S) => {
    const { headers: u } = S;
    n = u["transfer-encoding"] === "chunked" && !u["content-length"];
  }),
    r.on("socket", (S) => {
      const u = () => {
          if (n && !a) {
            const d = new Error("Premature close");
            (d.code = "ERR_STREAM_PREMATURE_CLOSE"), t(d);
          }
        },
        w = (d) => {
          (a = j.compare(d.slice(-5), e) === 0),
            !a && p && (a = j.compare(p.slice(-3), e.slice(0, 3)) === 0 && j.compare(d.slice(-2), e.slice(3)) === 0),
            (p = d);
        };
      S.prependListener("close", u),
        S.on("data", w),
        r.on("close", () => {
          S.removeListener("close", u), S.removeListener("data", w);
        });
    });
}
export {
  on as AbortError,
  de as FetchError,
  ve as Headers,
  De as Request,
  se as Response,
  fn as default,
  Jr as isRedirect,
};
