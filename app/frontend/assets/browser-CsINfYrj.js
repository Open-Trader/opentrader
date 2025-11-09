import { ba as Re, b7 as Z, bb as gi, b6 as ze } from "./index-DTKnr6h1.js";
import { h as vi } from "./__vite-browser-external-v7f2oYTb.js";
var Ye = {},
  De = { exports: {} },
  St;
function pt() {
  if (St) return De.exports;
  St = 1;
  var i = typeof Reflect == "object" ? Reflect : null,
    m =
      i && typeof i.apply == "function"
        ? i.apply
        : function (p, _, R) {
            return Function.prototype.apply.call(p, _, R);
          },
    w;
  i && typeof i.ownKeys == "function"
    ? (w = i.ownKeys)
    : Object.getOwnPropertySymbols
      ? (w = function (p) {
          return Object.getOwnPropertyNames(p).concat(Object.getOwnPropertySymbols(p));
        })
      : (w = function (p) {
          return Object.getOwnPropertyNames(p);
        });
  function A(s) {
    console && console.warn && console.warn(s);
  }
  var M =
    Number.isNaN ||
    function (p) {
      return p !== p;
    };
  function c() {
    c.init.call(this);
  }
  (De.exports = c),
    (De.exports.once = f),
    (c.EventEmitter = c),
    (c.prototype._events = void 0),
    (c.prototype._eventsCount = 0),
    (c.prototype._maxListeners = void 0);
  var S = 10;
  function u(s) {
    if (typeof s != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof s);
  }
  Object.defineProperty(c, "defaultMaxListeners", {
    enumerable: !0,
    get: function () {
      return S;
    },
    set: function (s) {
      if (typeof s != "number" || s < 0 || M(s))
        throw new RangeError(
          'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + s + ".",
        );
      S = s;
    },
  }),
    (c.init = function () {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (c.prototype.setMaxListeners = function (p) {
      if (typeof p != "number" || p < 0 || M(p))
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + p + ".");
      return (this._maxListeners = p), this;
    });
  function l(s) {
    return s._maxListeners === void 0 ? c.defaultMaxListeners : s._maxListeners;
  }
  (c.prototype.getMaxListeners = function () {
    return l(this);
  }),
    (c.prototype.emit = function (p) {
      for (var _ = [], R = 1; R < arguments.length; R++) _.push(arguments[R]);
      var x = p === "error",
        k = this._events;
      if (k !== void 0) x = x && k.error === void 0;
      else if (!x) return !1;
      if (x) {
        var V;
        if ((_.length > 0 && (V = _[0]), V instanceof Error)) throw V;
        var J = new Error("Unhandled error." + (V ? " (" + V.message + ")" : ""));
        throw ((J.context = V), J);
      }
      var E = k[p];
      if (E === void 0) return !1;
      if (typeof E == "function") m(E, this, _);
      else for (var Q = E.length, re = G(E, Q), R = 0; R < Q; ++R) m(re[R], this, _);
      return !0;
    });
  function O(s, p, _, R) {
    var x, k, V;
    if (
      (u(_),
      (k = s._events),
      k === void 0
        ? ((k = s._events = Object.create(null)), (s._eventsCount = 0))
        : (k.newListener !== void 0 && (s.emit("newListener", p, _.listener ? _.listener : _), (k = s._events)),
          (V = k[p])),
      V === void 0)
    )
      (V = k[p] = _), ++s._eventsCount;
    else if (
      (typeof V == "function" ? (V = k[p] = R ? [_, V] : [V, _]) : R ? V.unshift(_) : V.push(_),
      (x = l(s)),
      x > 0 && V.length > x && !V.warned)
    ) {
      V.warned = !0;
      var J = new Error(
        "Possible EventEmitter memory leak detected. " +
          V.length +
          " " +
          String(p) +
          " listeners added. Use emitter.setMaxListeners() to increase limit",
      );
      (J.name = "MaxListenersExceededWarning"), (J.emitter = s), (J.type = p), (J.count = V.length), A(J);
    }
    return s;
  }
  (c.prototype.addListener = function (p, _) {
    return O(this, p, _, !1);
  }),
    (c.prototype.on = c.prototype.addListener),
    (c.prototype.prependListener = function (p, _) {
      return O(this, p, _, !0);
    });
  function L() {
    if (!this.fired)
      return (
        this.target.removeListener(this.type, this.wrapFn),
        (this.fired = !0),
        arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
      );
  }
  function I(s, p, _) {
    var R = { fired: !1, wrapFn: void 0, target: s, type: p, listener: _ },
      x = L.bind(R);
    return (x.listener = _), (R.wrapFn = x), x;
  }
  (c.prototype.once = function (p, _) {
    return u(_), this.on(p, I(this, p, _)), this;
  }),
    (c.prototype.prependOnceListener = function (p, _) {
      return u(_), this.prependListener(p, I(this, p, _)), this;
    }),
    (c.prototype.removeListener = function (p, _) {
      var R, x, k, V, J;
      if ((u(_), (x = this._events), x === void 0)) return this;
      if (((R = x[p]), R === void 0)) return this;
      if (R === _ || R.listener === _)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete x[p], x.removeListener && this.emit("removeListener", p, R.listener || _));
      else if (typeof R != "function") {
        for (k = -1, V = R.length - 1; V >= 0; V--)
          if (R[V] === _ || R[V].listener === _) {
            (J = R[V].listener), (k = V);
            break;
          }
        if (k < 0) return this;
        k === 0 ? R.shift() : y(R, k),
          R.length === 1 && (x[p] = R[0]),
          x.removeListener !== void 0 && this.emit("removeListener", p, J || _);
      }
      return this;
    }),
    (c.prototype.off = c.prototype.removeListener),
    (c.prototype.removeAllListeners = function (p) {
      var _, R, x;
      if (((R = this._events), R === void 0)) return this;
      if (R.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : R[p] !== void 0 && (--this._eventsCount === 0 ? (this._events = Object.create(null)) : delete R[p]),
          this
        );
      if (arguments.length === 0) {
        var k = Object.keys(R),
          V;
        for (x = 0; x < k.length; ++x) (V = k[x]), V !== "removeListener" && this.removeAllListeners(V);
        return (
          this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this
        );
      }
      if (((_ = R[p]), typeof _ == "function")) this.removeListener(p, _);
      else if (_ !== void 0) for (x = _.length - 1; x >= 0; x--) this.removeListener(p, _[x]);
      return this;
    });
  function P(s, p, _) {
    var R = s._events;
    if (R === void 0) return [];
    var x = R[p];
    return x === void 0 ? [] : typeof x == "function" ? (_ ? [x.listener || x] : [x]) : _ ? B(x) : G(x, x.length);
  }
  (c.prototype.listeners = function (p) {
    return P(this, p, !0);
  }),
    (c.prototype.rawListeners = function (p) {
      return P(this, p, !1);
    }),
    (c.listenerCount = function (s, p) {
      return typeof s.listenerCount == "function" ? s.listenerCount(p) : q.call(s, p);
    }),
    (c.prototype.listenerCount = q);
  function q(s) {
    var p = this._events;
    if (p !== void 0) {
      var _ = p[s];
      if (typeof _ == "function") return 1;
      if (_ !== void 0) return _.length;
    }
    return 0;
  }
  c.prototype.eventNames = function () {
    return this._eventsCount > 0 ? w(this._events) : [];
  };
  function G(s, p) {
    for (var _ = new Array(p), R = 0; R < p; ++R) _[R] = s[R];
    return _;
  }
  function y(s, p) {
    for (; p + 1 < s.length; p++) s[p] = s[p + 1];
    s.pop();
  }
  function B(s) {
    for (var p = new Array(s.length), _ = 0; _ < p.length; ++_) p[_] = s[_].listener || s[_];
    return p;
  }
  function f(s, p) {
    return new Promise(function (_, R) {
      function x(V) {
        s.removeListener(p, k), R(V);
      }
      function k() {
        typeof s.removeListener == "function" && s.removeListener("error", x), _([].slice.call(arguments));
      }
      d(s, p, k, { once: !0 }), p !== "error" && h(s, x, { once: !0 });
    });
  }
  function h(s, p, _) {
    typeof s.on == "function" && d(s, "error", p, _);
  }
  function d(s, p, _, R) {
    if (typeof s.on == "function") R.once ? s.once(p, _) : s.on(p, _);
    else if (typeof s.addEventListener == "function")
      s.addEventListener(p, function x(k) {
        R.once && s.removeEventListener(p, x), _(k);
      });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof s);
  }
  return De.exports;
}
var Ue = { exports: {} },
  At;
function Be() {
  return (
    At ||
      ((At = 1),
      typeof Object.create == "function"
        ? (Ue.exports = function (m, w) {
            w &&
              ((m.super_ = w),
              (m.prototype = Object.create(w.prototype, {
                constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 },
              })));
          })
        : (Ue.exports = function (m, w) {
            if (w) {
              m.super_ = w;
              var A = function () {};
              (A.prototype = w.prototype), (m.prototype = new A()), (m.prototype.constructor = m);
            }
          })),
    Ue.exports
  );
}
var Je, Rt;
function Yn() {
  return Rt || ((Rt = 1), (Je = pt().EventEmitter)), Je;
}
var Ke = {},
  Bt;
function ke() {
  return (
    Bt ||
      ((Bt = 1),
      (function (i) {
        Object.defineProperties(i, { __esModule: { value: !0 }, [Symbol.toStringTag]: { value: "Module" } });
        var m = {},
          w = {};
        (w.byteLength = L), (w.toByteArray = P), (w.fromByteArray = y);
        for (
          var A = [],
            M = [],
            c = typeof Uint8Array < "u" ? Uint8Array : Array,
            S = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            u = 0,
            l = S.length;
          u < l;
          ++u
        )
          (A[u] = S[u]), (M[S.charCodeAt(u)] = u);
        (M[45] = 62), (M[95] = 63);
        function O(h) {
          var d = h.length;
          if (d % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
          var s = h.indexOf("=");
          s === -1 && (s = d);
          var p = s === d ? 0 : 4 - (s % 4);
          return [s, p];
        }
        function L(h) {
          var d = O(h),
            s = d[0],
            p = d[1];
          return ((s + p) * 3) / 4 - p;
        }
        function I(h, d, s) {
          return ((d + s) * 3) / 4 - s;
        }
        function P(h) {
          var d,
            s = O(h),
            p = s[0],
            _ = s[1],
            R = new c(I(h, p, _)),
            x = 0,
            k = _ > 0 ? p - 4 : p,
            V;
          for (V = 0; V < k; V += 4)
            (d =
              (M[h.charCodeAt(V)] << 18) |
              (M[h.charCodeAt(V + 1)] << 12) |
              (M[h.charCodeAt(V + 2)] << 6) |
              M[h.charCodeAt(V + 3)]),
              (R[x++] = (d >> 16) & 255),
              (R[x++] = (d >> 8) & 255),
              (R[x++] = d & 255);
          return (
            _ === 2 && ((d = (M[h.charCodeAt(V)] << 2) | (M[h.charCodeAt(V + 1)] >> 4)), (R[x++] = d & 255)),
            _ === 1 &&
              ((d = (M[h.charCodeAt(V)] << 10) | (M[h.charCodeAt(V + 1)] << 4) | (M[h.charCodeAt(V + 2)] >> 2)),
              (R[x++] = (d >> 8) & 255),
              (R[x++] = d & 255)),
            R
          );
        }
        function q(h) {
          return A[(h >> 18) & 63] + A[(h >> 12) & 63] + A[(h >> 6) & 63] + A[h & 63];
        }
        function G(h, d, s) {
          for (var p, _ = [], R = d; R < s; R += 3)
            (p = ((h[R] << 16) & 16711680) + ((h[R + 1] << 8) & 65280) + (h[R + 2] & 255)), _.push(q(p));
          return _.join("");
        }
        function y(h) {
          for (var d, s = h.length, p = s % 3, _ = [], R = 16383, x = 0, k = s - p; x < k; x += R)
            _.push(G(h, x, x + R > k ? k : x + R));
          return (
            p === 1
              ? ((d = h[s - 1]), _.push(A[d >> 2] + A[(d << 4) & 63] + "=="))
              : p === 2 &&
                ((d = (h[s - 2] << 8) + h[s - 1]), _.push(A[d >> 10] + A[(d >> 4) & 63] + A[(d << 2) & 63] + "=")),
            _.join("")
          );
        }
        var B = {};
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ (B.read = function (
          h,
          d,
          s,
          p,
          _,
        ) {
          var R,
            x,
            k = _ * 8 - p - 1,
            V = (1 << k) - 1,
            J = V >> 1,
            E = -7,
            Q = s ? _ - 1 : 0,
            re = s ? -1 : 1,
            ie = h[d + Q];
          for (Q += re, R = ie & ((1 << -E) - 1), ie >>= -E, E += k; E > 0; R = R * 256 + h[d + Q], Q += re, E -= 8);
          for (x = R & ((1 << -E) - 1), R >>= -E, E += p; E > 0; x = x * 256 + h[d + Q], Q += re, E -= 8);
          if (R === 0) R = 1 - J;
          else {
            if (R === V) return x ? NaN : (ie ? -1 : 1) * (1 / 0);
            (x = x + Math.pow(2, p)), (R = R - J);
          }
          return (ie ? -1 : 1) * x * Math.pow(2, R - p);
        }),
          (B.write = function (h, d, s, p, _, R) {
            var x,
              k,
              V,
              J = R * 8 - _ - 1,
              E = (1 << J) - 1,
              Q = E >> 1,
              re = _ === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              ie = p ? 0 : R - 1,
              ue = p ? 1 : -1,
              he = d < 0 || (d === 0 && 1 / d < 0) ? 1 : 0;
            for (
              d = Math.abs(d),
                isNaN(d) || d === 1 / 0
                  ? ((k = isNaN(d) ? 1 : 0), (x = E))
                  : ((x = Math.floor(Math.log(d) / Math.LN2)),
                    d * (V = Math.pow(2, -x)) < 1 && (x--, (V *= 2)),
                    x + Q >= 1 ? (d += re / V) : (d += re * Math.pow(2, 1 - Q)),
                    d * V >= 2 && (x++, (V /= 2)),
                    x + Q >= E
                      ? ((k = 0), (x = E))
                      : x + Q >= 1
                        ? ((k = (d * V - 1) * Math.pow(2, _)), (x = x + Q))
                        : ((k = d * Math.pow(2, Q - 1) * Math.pow(2, _)), (x = 0)));
              _ >= 8;
              h[s + ie] = k & 255, ie += ue, k /= 256, _ -= 8
            );
            for (x = (x << _) | k, J += _; J > 0; h[s + ie] = x & 255, ie += ue, x /= 256, J -= 8);
            h[s + ie - ue] |= he * 128;
          });
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */ (function (h) {
          const d = w,
            s = B,
            p =
              typeof Symbol == "function" && typeof Symbol.for == "function"
                ? Symbol.for("nodejs.util.inspect.custom")
                : null;
          (h.Buffer = E), (h.SlowBuffer = T), (h.INSPECT_MAX_BYTES = 50);
          const _ = 2147483647;
          h.kMaxLength = _;
          const { Uint8Array: R, ArrayBuffer: x, SharedArrayBuffer: k } = globalThis;
          (E.TYPED_ARRAY_SUPPORT = V()),
            !E.TYPED_ARRAY_SUPPORT &&
              typeof console < "u" &&
              typeof console.error == "function" &&
              console.error(
                "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
              );
          function V() {
            try {
              const t = new R(1),
                e = {
                  foo: function () {
                    return 42;
                  },
                };
              return Object.setPrototypeOf(e, R.prototype), Object.setPrototypeOf(t, e), t.foo() === 42;
            } catch {
              return !1;
            }
          }
          Object.defineProperty(E.prototype, "parent", {
            enumerable: !0,
            get: function () {
              if (E.isBuffer(this)) return this.buffer;
            },
          }),
            Object.defineProperty(E.prototype, "offset", {
              enumerable: !0,
              get: function () {
                if (E.isBuffer(this)) return this.byteOffset;
              },
            });
          function J(t) {
            if (t > _) throw new RangeError('The value "' + t + '" is invalid for option "size"');
            const e = new R(t);
            return Object.setPrototypeOf(e, E.prototype), e;
          }
          function E(t, e, r) {
            if (typeof t == "number") {
              if (typeof e == "string")
                throw new TypeError('The "string" argument must be of type string. Received type number');
              return ue(t);
            }
            return Q(t, e, r);
          }
          E.poolSize = 8192;
          function Q(t, e, r) {
            if (typeof t == "string") return he(t, e);
            if (x.isView(t)) return pe(t);
            if (t == null)
              throw new TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                  typeof t,
              );
            if (me(t, x) || (t && me(t.buffer, x)) || (typeof k < "u" && (me(t, k) || (t && me(t.buffer, k)))))
              return ae(t, e, r);
            if (typeof t == "number")
              throw new TypeError('The "value" argument must not be of type number. Received type number');
            const a = t.valueOf && t.valueOf();
            if (a != null && a !== t) return E.from(a, e, r);
            const v = ve(t);
            if (v) return v;
            if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
              return E.from(t[Symbol.toPrimitive]("string"), e, r);
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof t,
            );
          }
          (E.from = function (t, e, r) {
            return Q(t, e, r);
          }),
            Object.setPrototypeOf(E.prototype, R.prototype),
            Object.setPrototypeOf(E, R);
          function re(t) {
            if (typeof t != "number") throw new TypeError('"size" argument must be of type number');
            if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
          }
          function ie(t, e, r) {
            return re(t), t <= 0 ? J(t) : e !== void 0 ? (typeof r == "string" ? J(t).fill(e, r) : J(t).fill(e)) : J(t);
          }
          E.alloc = function (t, e, r) {
            return ie(t, e, r);
          };
          function ue(t) {
            return re(t), J(t < 0 ? 0 : de(t) | 0);
          }
          (E.allocUnsafe = function (t) {
            return ue(t);
          }),
            (E.allocUnsafeSlow = function (t) {
              return ue(t);
            });
          function he(t, e) {
            if (((typeof e != "string" || e === "") && (e = "utf8"), !E.isEncoding(e)))
              throw new TypeError("Unknown encoding: " + e);
            const r = N(t, e) | 0;
            let a = J(r);
            const v = a.write(t, e);
            return v !== r && (a = a.slice(0, v)), a;
          }
          function ce(t) {
            const e = t.length < 0 ? 0 : de(t.length) | 0,
              r = J(e);
            for (let a = 0; a < e; a += 1) r[a] = t[a] & 255;
            return r;
          }
          function pe(t) {
            if (me(t, R)) {
              const e = new R(t);
              return ae(e.buffer, e.byteOffset, e.byteLength);
            }
            return ce(t);
          }
          function ae(t, e, r) {
            if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
            let a;
            return (
              e === void 0 && r === void 0 ? (a = new R(t)) : r === void 0 ? (a = new R(t, e)) : (a = new R(t, e, r)),
              Object.setPrototypeOf(a, E.prototype),
              a
            );
          }
          function ve(t) {
            if (E.isBuffer(t)) {
              const e = de(t.length) | 0,
                r = J(e);
              return r.length === 0 || t.copy(r, 0, 0, e), r;
            }
            if (t.length !== void 0) return typeof t.length != "number" || Ve(t.length) ? J(0) : ce(t);
            if (t.type === "Buffer" && Array.isArray(t.data)) return ce(t.data);
          }
          function de(t) {
            if (t >= _)
              throw new RangeError(
                "Attempt to allocate Buffer larger than maximum size: 0x" + _.toString(16) + " bytes",
              );
            return t | 0;
          }
          function T(t) {
            return +t != t && (t = 0), E.alloc(+t);
          }
          (E.isBuffer = function (e) {
            return e != null && e._isBuffer === !0 && e !== E.prototype;
          }),
            (E.compare = function (e, r) {
              if (
                (me(e, R) && (e = E.from(e, e.offset, e.byteLength)),
                me(r, R) && (r = E.from(r, r.offset, r.byteLength)),
                !E.isBuffer(e) || !E.isBuffer(r))
              )
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
              if (e === r) return 0;
              let a = e.length,
                v = r.length;
              for (let F = 0, U = Math.min(a, v); F < U; ++F)
                if (e[F] !== r[F]) {
                  (a = e[F]), (v = r[F]);
                  break;
                }
              return a < v ? -1 : v < a ? 1 : 0;
            }),
            (E.isEncoding = function (e) {
              switch (String(e).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return !0;
                default:
                  return !1;
              }
            }),
            (E.concat = function (e, r) {
              if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
              if (e.length === 0) return E.alloc(0);
              let a;
              if (r === void 0) for (r = 0, a = 0; a < e.length; ++a) r += e[a].length;
              const v = E.allocUnsafe(r);
              let F = 0;
              for (a = 0; a < e.length; ++a) {
                let U = e[a];
                if (me(U, R))
                  F + U.length > v.length
                    ? (E.isBuffer(U) || (U = E.from(U)), U.copy(v, F))
                    : R.prototype.set.call(v, U, F);
                else if (E.isBuffer(U)) U.copy(v, F);
                else throw new TypeError('"list" argument must be an Array of Buffers');
                F += U.length;
              }
              return v;
            });
          function N(t, e) {
            if (E.isBuffer(t)) return t.length;
            if (x.isView(t) || me(t, x)) return t.byteLength;
            if (typeof t != "string")
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t,
              );
            const r = t.length,
              a = arguments.length > 2 && arguments[2] === !0;
            if (!a && r === 0) return 0;
            let v = !1;
            for (;;)
              switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                  return r;
                case "utf8":
                case "utf-8":
                  return He(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return r * 2;
                case "hex":
                  return r >>> 1;
                case "base64":
                  return _t(t).length;
                default:
                  if (v) return a ? -1 : He(t).length;
                  (e = ("" + e).toLowerCase()), (v = !0);
              }
          }
          E.byteLength = N;
          function W(t, e, r) {
            let a = !1;
            if (
              ((e === void 0 || e < 0) && (e = 0),
              e > this.length ||
                ((r === void 0 || r > this.length) && (r = this.length), r <= 0) ||
                ((r >>>= 0), (e >>>= 0), r <= e))
            )
              return "";
            for (t || (t = "utf8"); ; )
              switch (t) {
                case "hex":
                  return be(this, e, r);
                case "utf8":
                case "utf-8":
                  return K(this, e, r);
                case "ascii":
                  return ye(this, e, r);
                case "latin1":
                case "binary":
                  return D(this, e, r);
                case "base64":
                  return z(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return ge(this, e, r);
                default:
                  if (a) throw new TypeError("Unknown encoding: " + t);
                  (t = (t + "").toLowerCase()), (a = !0);
              }
          }
          E.prototype._isBuffer = !0;
          function g(t, e, r) {
            const a = t[e];
            (t[e] = t[r]), (t[r] = a);
          }
          (E.prototype.swap16 = function () {
            const e = this.length;
            if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let r = 0; r < e; r += 2) g(this, r, r + 1);
            return this;
          }),
            (E.prototype.swap32 = function () {
              const e = this.length;
              if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
              for (let r = 0; r < e; r += 4) g(this, r, r + 3), g(this, r + 1, r + 2);
              return this;
            }),
            (E.prototype.swap64 = function () {
              const e = this.length;
              if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
              for (let r = 0; r < e; r += 8)
                g(this, r, r + 7), g(this, r + 1, r + 6), g(this, r + 2, r + 5), g(this, r + 3, r + 4);
              return this;
            }),
            (E.prototype.toString = function () {
              const e = this.length;
              return e === 0 ? "" : arguments.length === 0 ? K(this, 0, e) : W.apply(this, arguments);
            }),
            (E.prototype.toLocaleString = E.prototype.toString),
            (E.prototype.equals = function (e) {
              if (!E.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
              return this === e ? !0 : E.compare(this, e) === 0;
            }),
            (E.prototype.inspect = function () {
              let e = "";
              const r = h.INSPECT_MAX_BYTES;
              return (
                (e = this.toString("hex", 0, r)
                  .replace(/(.{2})/g, "$1 ")
                  .trim()),
                this.length > r && (e += " ... "),
                "<Buffer " + e + ">"
              );
            }),
            p && (E.prototype[p] = E.prototype.inspect),
            (E.prototype.compare = function (e, r, a, v, F) {
              if ((me(e, R) && (e = E.from(e, e.offset, e.byteLength)), !E.isBuffer(e)))
                throw new TypeError(
                  'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e,
                );
              if (
                (r === void 0 && (r = 0),
                a === void 0 && (a = e ? e.length : 0),
                v === void 0 && (v = 0),
                F === void 0 && (F = this.length),
                r < 0 || a > e.length || v < 0 || F > this.length)
              )
                throw new RangeError("out of range index");
              if (v >= F && r >= a) return 0;
              if (v >= F) return -1;
              if (r >= a) return 1;
              if (((r >>>= 0), (a >>>= 0), (v >>>= 0), (F >>>= 0), this === e)) return 0;
              let U = F - v,
                X = a - r;
              const se = Math.min(U, X),
                oe = this.slice(v, F),
                le = e.slice(r, a);
              for (let te = 0; te < se; ++te)
                if (oe[te] !== le[te]) {
                  (U = oe[te]), (X = le[te]);
                  break;
                }
              return U < X ? -1 : X < U ? 1 : 0;
            });
          function b(t, e, r, a, v) {
            if (t.length === 0) return -1;
            if (
              (typeof r == "string"
                ? ((a = r), (r = 0))
                : r > 2147483647
                  ? (r = 2147483647)
                  : r < -2147483648 && (r = -2147483648),
              (r = +r),
              Ve(r) && (r = v ? 0 : t.length - 1),
              r < 0 && (r = t.length + r),
              r >= t.length)
            ) {
              if (v) return -1;
              r = t.length - 1;
            } else if (r < 0)
              if (v) r = 0;
              else return -1;
            if ((typeof e == "string" && (e = E.from(e, a)), E.isBuffer(e)))
              return e.length === 0 ? -1 : C(t, e, r, a, v);
            if (typeof e == "number")
              return (
                (e = e & 255),
                typeof R.prototype.indexOf == "function"
                  ? v
                    ? R.prototype.indexOf.call(t, e, r)
                    : R.prototype.lastIndexOf.call(t, e, r)
                  : C(t, [e], r, a, v)
              );
            throw new TypeError("val must be string, number or Buffer");
          }
          function C(t, e, r, a, v) {
            let F = 1,
              U = t.length,
              X = e.length;
            if (
              a !== void 0 &&
              ((a = String(a).toLowerCase()), a === "ucs2" || a === "ucs-2" || a === "utf16le" || a === "utf-16le")
            ) {
              if (t.length < 2 || e.length < 2) return -1;
              (F = 2), (U /= 2), (X /= 2), (r /= 2);
            }
            function se(le, te) {
              return F === 1 ? le[te] : le.readUInt16BE(te * F);
            }
            let oe;
            if (v) {
              let le = -1;
              for (oe = r; oe < U; oe++)
                if (se(t, oe) === se(e, le === -1 ? 0 : oe - le)) {
                  if ((le === -1 && (le = oe), oe - le + 1 === X)) return le * F;
                } else le !== -1 && (oe -= oe - le), (le = -1);
            } else
              for (r + X > U && (r = U - X), oe = r; oe >= 0; oe--) {
                let le = !0;
                for (let te = 0; te < X; te++)
                  if (se(t, oe + te) !== se(e, te)) {
                    le = !1;
                    break;
                  }
                if (le) return oe;
              }
            return -1;
          }
          (E.prototype.includes = function (e, r, a) {
            return this.indexOf(e, r, a) !== -1;
          }),
            (E.prototype.indexOf = function (e, r, a) {
              return b(this, e, r, a, !0);
            }),
            (E.prototype.lastIndexOf = function (e, r, a) {
              return b(this, e, r, a, !1);
            });
          function $(t, e, r, a) {
            r = Number(r) || 0;
            const v = t.length - r;
            a ? ((a = Number(a)), a > v && (a = v)) : (a = v);
            const F = e.length;
            a > F / 2 && (a = F / 2);
            let U;
            for (U = 0; U < a; ++U) {
              const X = parseInt(e.substr(U * 2, 2), 16);
              if (Ve(X)) return U;
              t[r + U] = X;
            }
            return U;
          }
          function H(t, e, r, a) {
            return Ne(He(e, t.length - r), t, r, a);
          }
          function n(t, e, r, a) {
            return Ne(hi(e), t, r, a);
          }
          function o(t, e, r, a) {
            return Ne(_t(e), t, r, a);
          }
          function j(t, e, r, a) {
            return Ne(pi(e, t.length - r), t, r, a);
          }
          (E.prototype.write = function (e, r, a, v) {
            if (r === void 0) (v = "utf8"), (a = this.length), (r = 0);
            else if (a === void 0 && typeof r == "string") (v = r), (a = this.length), (r = 0);
            else if (isFinite(r))
              (r = r >>> 0), isFinite(a) ? ((a = a >>> 0), v === void 0 && (v = "utf8")) : ((v = a), (a = void 0));
            else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            const F = this.length - r;
            if (((a === void 0 || a > F) && (a = F), (e.length > 0 && (a < 0 || r < 0)) || r > this.length))
              throw new RangeError("Attempt to write outside buffer bounds");
            v || (v = "utf8");
            let U = !1;
            for (;;)
              switch (v) {
                case "hex":
                  return $(this, e, r, a);
                case "utf8":
                case "utf-8":
                  return H(this, e, r, a);
                case "ascii":
                case "latin1":
                case "binary":
                  return n(this, e, r, a);
                case "base64":
                  return o(this, e, r, a);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return j(this, e, r, a);
                default:
                  if (U) throw new TypeError("Unknown encoding: " + v);
                  (v = ("" + v).toLowerCase()), (U = !0);
              }
          }),
            (E.prototype.toJSON = function () {
              return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
            });
          function z(t, e, r) {
            return e === 0 && r === t.length ? d.fromByteArray(t) : d.fromByteArray(t.slice(e, r));
          }
          function K(t, e, r) {
            r = Math.min(t.length, r);
            const a = [];
            let v = e;
            for (; v < r; ) {
              const F = t[v];
              let U = null,
                X = F > 239 ? 4 : F > 223 ? 3 : F > 191 ? 2 : 1;
              if (v + X <= r) {
                let se, oe, le, te;
                switch (X) {
                  case 1:
                    F < 128 && (U = F);
                    break;
                  case 2:
                    (se = t[v + 1]), (se & 192) === 128 && ((te = ((F & 31) << 6) | (se & 63)), te > 127 && (U = te));
                    break;
                  case 3:
                    (se = t[v + 1]),
                      (oe = t[v + 2]),
                      (se & 192) === 128 &&
                        (oe & 192) === 128 &&
                        ((te = ((F & 15) << 12) | ((se & 63) << 6) | (oe & 63)),
                        te > 2047 && (te < 55296 || te > 57343) && (U = te));
                    break;
                  case 4:
                    (se = t[v + 1]),
                      (oe = t[v + 2]),
                      (le = t[v + 3]),
                      (se & 192) === 128 &&
                        (oe & 192) === 128 &&
                        (le & 192) === 128 &&
                        ((te = ((F & 15) << 18) | ((se & 63) << 12) | ((oe & 63) << 6) | (le & 63)),
                        te > 65535 && te < 1114112 && (U = te));
                }
              }
              U === null
                ? ((U = 65533), (X = 1))
                : U > 65535 && ((U -= 65536), a.push(((U >>> 10) & 1023) | 55296), (U = 56320 | (U & 1023))),
                a.push(U),
                (v += X);
            }
            return ee(a);
          }
          const Y = 4096;
          function ee(t) {
            const e = t.length;
            if (e <= Y) return String.fromCharCode.apply(String, t);
            let r = "",
              a = 0;
            for (; a < e; ) r += String.fromCharCode.apply(String, t.slice(a, (a += Y)));
            return r;
          }
          function ye(t, e, r) {
            let a = "";
            r = Math.min(t.length, r);
            for (let v = e; v < r; ++v) a += String.fromCharCode(t[v] & 127);
            return a;
          }
          function D(t, e, r) {
            let a = "";
            r = Math.min(t.length, r);
            for (let v = e; v < r; ++v) a += String.fromCharCode(t[v]);
            return a;
          }
          function be(t, e, r) {
            const a = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > a) && (r = a);
            let v = "";
            for (let F = e; F < r; ++F) v += di[t[F]];
            return v;
          }
          function ge(t, e, r) {
            const a = t.slice(e, r);
            let v = "";
            for (let F = 0; F < a.length - 1; F += 2) v += String.fromCharCode(a[F] + a[F + 1] * 256);
            return v;
          }
          E.prototype.slice = function (e, r) {
            const a = this.length;
            (e = ~~e),
              (r = r === void 0 ? a : ~~r),
              e < 0 ? ((e += a), e < 0 && (e = 0)) : e > a && (e = a),
              r < 0 ? ((r += a), r < 0 && (r = 0)) : r > a && (r = a),
              r < e && (r = e);
            const v = this.subarray(e, r);
            return Object.setPrototypeOf(v, E.prototype), v;
          };
          function ne(t, e, r) {
            if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
          }
          (E.prototype.readUintLE = E.prototype.readUIntLE =
            function (e, r, a) {
              (e = e >>> 0), (r = r >>> 0), a || ne(e, r, this.length);
              let v = this[e],
                F = 1,
                U = 0;
              for (; ++U < r && (F *= 256); ) v += this[e + U] * F;
              return v;
            }),
            (E.prototype.readUintBE = E.prototype.readUIntBE =
              function (e, r, a) {
                (e = e >>> 0), (r = r >>> 0), a || ne(e, r, this.length);
                let v = this[e + --r],
                  F = 1;
                for (; r > 0 && (F *= 256); ) v += this[e + --r] * F;
                return v;
              }),
            (E.prototype.readUint8 = E.prototype.readUInt8 =
              function (e, r) {
                return (e = e >>> 0), r || ne(e, 1, this.length), this[e];
              }),
            (E.prototype.readUint16LE = E.prototype.readUInt16LE =
              function (e, r) {
                return (e = e >>> 0), r || ne(e, 2, this.length), this[e] | (this[e + 1] << 8);
              }),
            (E.prototype.readUint16BE = E.prototype.readUInt16BE =
              function (e, r) {
                return (e = e >>> 0), r || ne(e, 2, this.length), (this[e] << 8) | this[e + 1];
              }),
            (E.prototype.readUint32LE = E.prototype.readUInt32LE =
              function (e, r) {
                return (
                  (e = e >>> 0),
                  r || ne(e, 4, this.length),
                  (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + this[e + 3] * 16777216
                );
              }),
            (E.prototype.readUint32BE = E.prototype.readUInt32BE =
              function (e, r) {
                return (
                  (e = e >>> 0),
                  r || ne(e, 4, this.length),
                  this[e] * 16777216 + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                );
              }),
            (E.prototype.readBigUInt64LE = Ae(function (e) {
              (e = e >>> 0), Pe(e, "offset");
              const r = this[e],
                a = this[e + 7];
              (r === void 0 || a === void 0) && Me(e, this.length - 8);
              const v = r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24,
                F = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + a * 2 ** 24;
              return BigInt(v) + (BigInt(F) << BigInt(32));
            })),
            (E.prototype.readBigUInt64BE = Ae(function (e) {
              (e = e >>> 0), Pe(e, "offset");
              const r = this[e],
                a = this[e + 7];
              (r === void 0 || a === void 0) && Me(e, this.length - 8);
              const v = r * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e],
                F = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + a;
              return (BigInt(v) << BigInt(32)) + BigInt(F);
            })),
            (E.prototype.readIntLE = function (e, r, a) {
              (e = e >>> 0), (r = r >>> 0), a || ne(e, r, this.length);
              let v = this[e],
                F = 1,
                U = 0;
              for (; ++U < r && (F *= 256); ) v += this[e + U] * F;
              return (F *= 128), v >= F && (v -= Math.pow(2, 8 * r)), v;
            }),
            (E.prototype.readIntBE = function (e, r, a) {
              (e = e >>> 0), (r = r >>> 0), a || ne(e, r, this.length);
              let v = r,
                F = 1,
                U = this[e + --v];
              for (; v > 0 && (F *= 256); ) U += this[e + --v] * F;
              return (F *= 128), U >= F && (U -= Math.pow(2, 8 * r)), U;
            }),
            (E.prototype.readInt8 = function (e, r) {
              return (e = e >>> 0), r || ne(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
            }),
            (E.prototype.readInt16LE = function (e, r) {
              (e = e >>> 0), r || ne(e, 2, this.length);
              const a = this[e] | (this[e + 1] << 8);
              return a & 32768 ? a | 4294901760 : a;
            }),
            (E.prototype.readInt16BE = function (e, r) {
              (e = e >>> 0), r || ne(e, 2, this.length);
              const a = this[e + 1] | (this[e] << 8);
              return a & 32768 ? a | 4294901760 : a;
            }),
            (E.prototype.readInt32LE = function (e, r) {
              return (
                (e = e >>> 0),
                r || ne(e, 4, this.length),
                this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
              );
            }),
            (E.prototype.readInt32BE = function (e, r) {
              return (
                (e = e >>> 0),
                r || ne(e, 4, this.length),
                (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
              );
            }),
            (E.prototype.readBigInt64LE = Ae(function (e) {
              (e = e >>> 0), Pe(e, "offset");
              const r = this[e],
                a = this[e + 7];
              (r === void 0 || a === void 0) && Me(e, this.length - 8);
              const v = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (a << 24);
              return (
                (BigInt(v) << BigInt(32)) + BigInt(r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
              );
            })),
            (E.prototype.readBigInt64BE = Ae(function (e) {
              (e = e >>> 0), Pe(e, "offset");
              const r = this[e],
                a = this[e + 7];
              (r === void 0 || a === void 0) && Me(e, this.length - 8);
              const v = (r << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
              return (
                (BigInt(v) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + a)
              );
            })),
            (E.prototype.readFloatLE = function (e, r) {
              return (e = e >>> 0), r || ne(e, 4, this.length), s.read(this, e, !0, 23, 4);
            }),
            (E.prototype.readFloatBE = function (e, r) {
              return (e = e >>> 0), r || ne(e, 4, this.length), s.read(this, e, !1, 23, 4);
            }),
            (E.prototype.readDoubleLE = function (e, r) {
              return (e = e >>> 0), r || ne(e, 8, this.length), s.read(this, e, !0, 52, 8);
            }),
            (E.prototype.readDoubleBE = function (e, r) {
              return (e = e >>> 0), r || ne(e, 8, this.length), s.read(this, e, !1, 52, 8);
            });
          function fe(t, e, r, a, v, F) {
            if (!E.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > v || e < F) throw new RangeError('"value" argument is out of bounds');
            if (r + a > t.length) throw new RangeError("Index out of range");
          }
          (E.prototype.writeUintLE = E.prototype.writeUIntLE =
            function (e, r, a, v) {
              if (((e = +e), (r = r >>> 0), (a = a >>> 0), !v)) {
                const X = Math.pow(2, 8 * a) - 1;
                fe(this, e, r, a, X, 0);
              }
              let F = 1,
                U = 0;
              for (this[r] = e & 255; ++U < a && (F *= 256); ) this[r + U] = (e / F) & 255;
              return r + a;
            }),
            (E.prototype.writeUintBE = E.prototype.writeUIntBE =
              function (e, r, a, v) {
                if (((e = +e), (r = r >>> 0), (a = a >>> 0), !v)) {
                  const X = Math.pow(2, 8 * a) - 1;
                  fe(this, e, r, a, X, 0);
                }
                let F = a - 1,
                  U = 1;
                for (this[r + F] = e & 255; --F >= 0 && (U *= 256); ) this[r + F] = (e / U) & 255;
                return r + a;
              }),
            (E.prototype.writeUint8 = E.prototype.writeUInt8 =
              function (e, r, a) {
                return (e = +e), (r = r >>> 0), a || fe(this, e, r, 1, 255, 0), (this[r] = e & 255), r + 1;
              }),
            (E.prototype.writeUint16LE = E.prototype.writeUInt16LE =
              function (e, r, a) {
                return (
                  (e = +e),
                  (r = r >>> 0),
                  a || fe(this, e, r, 2, 65535, 0),
                  (this[r] = e & 255),
                  (this[r + 1] = e >>> 8),
                  r + 2
                );
              }),
            (E.prototype.writeUint16BE = E.prototype.writeUInt16BE =
              function (e, r, a) {
                return (
                  (e = +e),
                  (r = r >>> 0),
                  a || fe(this, e, r, 2, 65535, 0),
                  (this[r] = e >>> 8),
                  (this[r + 1] = e & 255),
                  r + 2
                );
              }),
            (E.prototype.writeUint32LE = E.prototype.writeUInt32LE =
              function (e, r, a) {
                return (
                  (e = +e),
                  (r = r >>> 0),
                  a || fe(this, e, r, 4, 4294967295, 0),
                  (this[r + 3] = e >>> 24),
                  (this[r + 2] = e >>> 16),
                  (this[r + 1] = e >>> 8),
                  (this[r] = e & 255),
                  r + 4
                );
              }),
            (E.prototype.writeUint32BE = E.prototype.writeUInt32BE =
              function (e, r, a) {
                return (
                  (e = +e),
                  (r = r >>> 0),
                  a || fe(this, e, r, 4, 4294967295, 0),
                  (this[r] = e >>> 24),
                  (this[r + 1] = e >>> 16),
                  (this[r + 2] = e >>> 8),
                  (this[r + 3] = e & 255),
                  r + 4
                );
              });
          function we(t, e, r, a, v) {
            Et(e, a, v, t, r, 7);
            let F = Number(e & BigInt(4294967295));
            (t[r++] = F), (F = F >> 8), (t[r++] = F), (F = F >> 8), (t[r++] = F), (F = F >> 8), (t[r++] = F);
            let U = Number((e >> BigInt(32)) & BigInt(4294967295));
            return (t[r++] = U), (U = U >> 8), (t[r++] = U), (U = U >> 8), (t[r++] = U), (U = U >> 8), (t[r++] = U), r;
          }
          function Te(t, e, r, a, v) {
            Et(e, a, v, t, r, 7);
            let F = Number(e & BigInt(4294967295));
            (t[r + 7] = F), (F = F >> 8), (t[r + 6] = F), (F = F >> 8), (t[r + 5] = F), (F = F >> 8), (t[r + 4] = F);
            let U = Number((e >> BigInt(32)) & BigInt(4294967295));
            return (
              (t[r + 3] = U),
              (U = U >> 8),
              (t[r + 2] = U),
              (U = U >> 8),
              (t[r + 1] = U),
              (U = U >> 8),
              (t[r] = U),
              r + 8
            );
          }
          (E.prototype.writeBigUInt64LE = Ae(function (e, r = 0) {
            return we(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"));
          })),
            (E.prototype.writeBigUInt64BE = Ae(function (e, r = 0) {
              return Te(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"));
            })),
            (E.prototype.writeIntLE = function (e, r, a, v) {
              if (((e = +e), (r = r >>> 0), !v)) {
                const se = Math.pow(2, 8 * a - 1);
                fe(this, e, r, a, se - 1, -se);
              }
              let F = 0,
                U = 1,
                X = 0;
              for (this[r] = e & 255; ++F < a && (U *= 256); )
                e < 0 && X === 0 && this[r + F - 1] !== 0 && (X = 1), (this[r + F] = (((e / U) >> 0) - X) & 255);
              return r + a;
            }),
            (E.prototype.writeIntBE = function (e, r, a, v) {
              if (((e = +e), (r = r >>> 0), !v)) {
                const se = Math.pow(2, 8 * a - 1);
                fe(this, e, r, a, se - 1, -se);
              }
              let F = a - 1,
                U = 1,
                X = 0;
              for (this[r + F] = e & 255; --F >= 0 && (U *= 256); )
                e < 0 && X === 0 && this[r + F + 1] !== 0 && (X = 1), (this[r + F] = (((e / U) >> 0) - X) & 255);
              return r + a;
            }),
            (E.prototype.writeInt8 = function (e, r, a) {
              return (
                (e = +e),
                (r = r >>> 0),
                a || fe(this, e, r, 1, 127, -128),
                e < 0 && (e = 255 + e + 1),
                (this[r] = e & 255),
                r + 1
              );
            }),
            (E.prototype.writeInt16LE = function (e, r, a) {
              return (
                (e = +e),
                (r = r >>> 0),
                a || fe(this, e, r, 2, 32767, -32768),
                (this[r] = e & 255),
                (this[r + 1] = e >>> 8),
                r + 2
              );
            }),
            (E.prototype.writeInt16BE = function (e, r, a) {
              return (
                (e = +e),
                (r = r >>> 0),
                a || fe(this, e, r, 2, 32767, -32768),
                (this[r] = e >>> 8),
                (this[r + 1] = e & 255),
                r + 2
              );
            }),
            (E.prototype.writeInt32LE = function (e, r, a) {
              return (
                (e = +e),
                (r = r >>> 0),
                a || fe(this, e, r, 4, 2147483647, -2147483648),
                (this[r] = e & 255),
                (this[r + 1] = e >>> 8),
                (this[r + 2] = e >>> 16),
                (this[r + 3] = e >>> 24),
                r + 4
              );
            }),
            (E.prototype.writeInt32BE = function (e, r, a) {
              return (
                (e = +e),
                (r = r >>> 0),
                a || fe(this, e, r, 4, 2147483647, -2147483648),
                e < 0 && (e = 4294967295 + e + 1),
                (this[r] = e >>> 24),
                (this[r + 1] = e >>> 16),
                (this[r + 2] = e >>> 8),
                (this[r + 3] = e & 255),
                r + 4
              );
            }),
            (E.prototype.writeBigInt64LE = Ae(function (e, r = 0) {
              return we(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            })),
            (E.prototype.writeBigInt64BE = Ae(function (e, r = 0) {
              return Te(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
            }));
          function Se(t, e, r, a, v, F) {
            if (r + a > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range");
          }
          function Ee(t, e, r, a, v) {
            return (e = +e), (r = r >>> 0), v || Se(t, e, r, 4), s.write(t, e, r, a, 23, 4), r + 4;
          }
          (E.prototype.writeFloatLE = function (e, r, a) {
            return Ee(this, e, r, !0, a);
          }),
            (E.prototype.writeFloatBE = function (e, r, a) {
              return Ee(this, e, r, !1, a);
            });
          function _e(t, e, r, a, v) {
            return (e = +e), (r = r >>> 0), v || Se(t, e, r, 8), s.write(t, e, r, a, 52, 8), r + 8;
          }
          (E.prototype.writeDoubleLE = function (e, r, a) {
            return _e(this, e, r, !0, a);
          }),
            (E.prototype.writeDoubleBE = function (e, r, a) {
              return _e(this, e, r, !1, a);
            }),
            (E.prototype.copy = function (e, r, a, v) {
              if (!E.isBuffer(e)) throw new TypeError("argument should be a Buffer");
              if (
                (a || (a = 0),
                !v && v !== 0 && (v = this.length),
                r >= e.length && (r = e.length),
                r || (r = 0),
                v > 0 && v < a && (v = a),
                v === a || e.length === 0 || this.length === 0)
              )
                return 0;
              if (r < 0) throw new RangeError("targetStart out of bounds");
              if (a < 0 || a >= this.length) throw new RangeError("Index out of range");
              if (v < 0) throw new RangeError("sourceEnd out of bounds");
              v > this.length && (v = this.length), e.length - r < v - a && (v = e.length - r + a);
              const F = v - a;
              return (
                this === e && typeof R.prototype.copyWithin == "function"
                  ? this.copyWithin(r, a, v)
                  : R.prototype.set.call(e, this.subarray(a, v), r),
                F
              );
            }),
            (E.prototype.fill = function (e, r, a, v) {
              if (typeof e == "string") {
                if (
                  (typeof r == "string"
                    ? ((v = r), (r = 0), (a = this.length))
                    : typeof a == "string" && ((v = a), (a = this.length)),
                  v !== void 0 && typeof v != "string")
                )
                  throw new TypeError("encoding must be a string");
                if (typeof v == "string" && !E.isEncoding(v)) throw new TypeError("Unknown encoding: " + v);
                if (e.length === 1) {
                  const U = e.charCodeAt(0);
                  ((v === "utf8" && U < 128) || v === "latin1") && (e = U);
                }
              } else typeof e == "number" ? (e = e & 255) : typeof e == "boolean" && (e = Number(e));
              if (r < 0 || this.length < r || this.length < a) throw new RangeError("Out of range index");
              if (a <= r) return this;
              (r = r >>> 0), (a = a === void 0 ? this.length : a >>> 0), e || (e = 0);
              let F;
              if (typeof e == "number") for (F = r; F < a; ++F) this[F] = e;
              else {
                const U = E.isBuffer(e) ? e : E.from(e, v),
                  X = U.length;
                if (X === 0) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (F = 0; F < a - r; ++F) this[F + r] = U[F % X];
              }
              return this;
            });
          const Oe = {};
          function Ge(t, e, r) {
            Oe[t] = class extends r {
              constructor() {
                super(),
                  Object.defineProperty(this, "message", {
                    value: e.apply(this, arguments),
                    writable: !0,
                    configurable: !0,
                  }),
                  (this.name = `${this.name} [${t}]`),
                  this.stack,
                  delete this.name;
              }
              get code() {
                return t;
              }
              set code(v) {
                Object.defineProperty(this, "code", { configurable: !0, enumerable: !0, value: v, writable: !0 });
              }
              toString() {
                return `${this.name} [${t}]: ${this.message}`;
              }
            };
          }
          Ge(
            "ERR_BUFFER_OUT_OF_BOUNDS",
            function (t) {
              return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
            },
            RangeError,
          ),
            Ge(
              "ERR_INVALID_ARG_TYPE",
              function (t, e) {
                return `The "${t}" argument must be of type number. Received type ${typeof e}`;
              },
              TypeError,
            ),
            Ge(
              "ERR_OUT_OF_RANGE",
              function (t, e, r) {
                let a = `The value of "${t}" is out of range.`,
                  v = r;
                return (
                  Number.isInteger(r) && Math.abs(r) > 2 ** 32
                    ? (v = mt(String(r)))
                    : typeof r == "bigint" &&
                      ((v = String(r)),
                      (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (v = mt(v)),
                      (v += "n")),
                  (a += ` It must be ${e}. Received ${v}`),
                  a
                );
              },
              RangeError,
            );
          function mt(t) {
            let e = "",
              r = t.length;
            const a = t[0] === "-" ? 1 : 0;
            for (; r >= a + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
            return `${t.slice(0, r)}${e}`;
          }
          function si(t, e, r) {
            Pe(e, "offset"), (t[e] === void 0 || t[e + r] === void 0) && Me(e, t.length - (r + 1));
          }
          function Et(t, e, r, a, v, F) {
            if (t > r || t < e) {
              const U = typeof e == "bigint" ? "n" : "";
              let X;
              throw (
                (e === 0 || e === BigInt(0)
                  ? (X = `>= 0${U} and < 2${U} ** ${(F + 1) * 8}${U}`)
                  : (X = `>= -(2${U} ** ${(F + 1) * 8 - 1}${U}) and < 2 ** ${(F + 1) * 8 - 1}${U}`),
                new Oe.ERR_OUT_OF_RANGE("value", X, t))
              );
            }
            si(a, v, F);
          }
          function Pe(t, e) {
            if (typeof t != "number") throw new Oe.ERR_INVALID_ARG_TYPE(e, "number", t);
          }
          function Me(t, e, r) {
            throw Math.floor(t) !== t
              ? (Pe(t, r), new Oe.ERR_OUT_OF_RANGE("offset", "an integer", t))
              : e < 0
                ? new Oe.ERR_BUFFER_OUT_OF_BOUNDS()
                : new Oe.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${e}`, t);
          }
          const li = /[^+/0-9A-Za-z-_]/g;
          function ci(t) {
            if (((t = t.split("=")[0]), (t = t.trim().replace(li, "")), t.length < 2)) return "";
            for (; t.length % 4 !== 0; ) t = t + "=";
            return t;
          }
          function He(t, e) {
            e = e || 1 / 0;
            let r;
            const a = t.length;
            let v = null;
            const F = [];
            for (let U = 0; U < a; ++U) {
              if (((r = t.charCodeAt(U)), r > 55295 && r < 57344)) {
                if (!v) {
                  if (r > 56319) {
                    (e -= 3) > -1 && F.push(239, 191, 189);
                    continue;
                  } else if (U + 1 === a) {
                    (e -= 3) > -1 && F.push(239, 191, 189);
                    continue;
                  }
                  v = r;
                  continue;
                }
                if (r < 56320) {
                  (e -= 3) > -1 && F.push(239, 191, 189), (v = r);
                  continue;
                }
                r = (((v - 55296) << 10) | (r - 56320)) + 65536;
              } else v && (e -= 3) > -1 && F.push(239, 191, 189);
              if (((v = null), r < 128)) {
                if ((e -= 1) < 0) break;
                F.push(r);
              } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                F.push((r >> 6) | 192, (r & 63) | 128);
              } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                F.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (r & 63) | 128);
              } else if (r < 1114112) {
                if ((e -= 4) < 0) break;
                F.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (r & 63) | 128);
              } else throw new Error("Invalid code point");
            }
            return F;
          }
          function hi(t) {
            const e = [];
            for (let r = 0; r < t.length; ++r) e.push(t.charCodeAt(r) & 255);
            return e;
          }
          function pi(t, e) {
            let r, a, v;
            const F = [];
            for (let U = 0; U < t.length && !((e -= 2) < 0); ++U)
              (r = t.charCodeAt(U)), (a = r >> 8), (v = r % 256), F.push(v), F.push(a);
            return F;
          }
          function _t(t) {
            return d.toByteArray(ci(t));
          }
          function Ne(t, e, r, a) {
            let v;
            for (v = 0; v < a && !(v + r >= e.length || v >= t.length); ++v) e[v + r] = t[v];
            return v;
          }
          function me(t, e) {
            return (
              t instanceof e ||
              (t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name)
            );
          }
          function Ve(t) {
            return t !== t;
          }
          const di = (function () {
            const t = "0123456789abcdef",
              e = new Array(256);
            for (let r = 0; r < 16; ++r) {
              const a = r * 16;
              for (let v = 0; v < 16; ++v) e[a + v] = t[r] + t[v];
            }
            return e;
          })();
          function Ae(t) {
            return typeof BigInt > "u" ? yi : t;
          }
          function yi() {
            throw new Error("BigInt not supported");
          }
        })(m);
        const f = m.Buffer;
        (i.Blob = m.Blob),
          (i.BlobOptions = m.BlobOptions),
          (i.Buffer = m.Buffer),
          (i.File = m.File),
          (i.FileOptions = m.FileOptions),
          (i.INSPECT_MAX_BYTES = m.INSPECT_MAX_BYTES),
          (i.SlowBuffer = m.SlowBuffer),
          (i.TranscodeEncoding = m.TranscodeEncoding),
          (i.atob = m.atob),
          (i.btoa = m.btoa),
          (i.constants = m.constants),
          (i.default = f),
          (i.isAscii = m.isAscii),
          (i.isUtf8 = m.isUtf8),
          (i.kMaxLength = m.kMaxLength),
          (i.kStringMaxLength = m.kStringMaxLength),
          (i.resolveObjectURL = m.resolveObjectURL),
          (i.transcode = m.transcode);
      })(Ke)),
    Ke
  );
}
var Xe = {},
  Ze = {},
  Qe,
  Tt;
function Jn() {
  return (
    Tt ||
      ((Tt = 1),
      (Qe = function () {
        if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function") return !1;
        if (typeof Symbol.iterator == "symbol") return !0;
        var m = {},
          w = Symbol("test"),
          A = Object(w);
        if (
          typeof w == "string" ||
          Object.prototype.toString.call(w) !== "[object Symbol]" ||
          Object.prototype.toString.call(A) !== "[object Symbol]"
        )
          return !1;
        var M = 42;
        m[w] = M;
        for (var c in m) return !1;
        if (
          (typeof Object.keys == "function" && Object.keys(m).length !== 0) ||
          (typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(m).length !== 0)
        )
          return !1;
        var S = Object.getOwnPropertySymbols(m);
        if (S.length !== 1 || S[0] !== w || !Object.prototype.propertyIsEnumerable.call(m, w)) return !1;
        if (typeof Object.getOwnPropertyDescriptor == "function") {
          var u = Object.getOwnPropertyDescriptor(m, w);
          if (u.value !== M || u.enumerable !== !0) return !1;
        }
        return !0;
      })),
    Qe
  );
}
var er, Ot;
function We() {
  if (Ot) return er;
  Ot = 1;
  var i = Jn();
  return (
    (er = function () {
      return i() && !!Symbol.toStringTag;
    }),
    er
  );
}
var rr, Pt;
function Kn() {
  return Pt || ((Pt = 1), (rr = Object)), rr;
}
var tr, It;
function bi() {
  return It || ((It = 1), (tr = Error)), tr;
}
var nr, Ft;
function wi() {
  return Ft || ((Ft = 1), (nr = EvalError)), nr;
}
var ir, xt;
function mi() {
  return xt || ((xt = 1), (ir = RangeError)), ir;
}
var or, Mt;
function Ei() {
  return Mt || ((Mt = 1), (or = ReferenceError)), or;
}
var ar, Lt;
function Xn() {
  return Lt || ((Lt = 1), (ar = SyntaxError)), ar;
}
var fr, jt;
function Le() {
  return jt || ((jt = 1), (fr = TypeError)), fr;
}
var ur, Ct;
function _i() {
  return Ct || ((Ct = 1), (ur = URIError)), ur;
}
var sr, Nt;
function Si() {
  return Nt || ((Nt = 1), (sr = Math.abs)), sr;
}
var lr, Dt;
function Ai() {
  return Dt || ((Dt = 1), (lr = Math.floor)), lr;
}
var cr, Ut;
function Ri() {
  return Ut || ((Ut = 1), (cr = Math.max)), cr;
}
var hr, qt;
function Bi() {
  return qt || ((qt = 1), (hr = Math.min)), hr;
}
var pr, kt;
function Ti() {
  return kt || ((kt = 1), (pr = Math.pow)), pr;
}
var dr, Wt;
function Oi() {
  return Wt || ((Wt = 1), (dr = Math.round)), dr;
}
var yr, $t;
function Pi() {
  return (
    $t ||
      (($t = 1),
      (yr =
        Number.isNaN ||
        function (m) {
          return m !== m;
        })),
    yr
  );
}
var gr, Gt;
function Ii() {
  if (Gt) return gr;
  Gt = 1;
  var i = Pi();
  return (
    (gr = function (w) {
      return i(w) || w === 0 ? w : w < 0 ? -1 : 1;
    }),
    gr
  );
}
var vr, Ht;
function Fi() {
  return Ht || ((Ht = 1), (vr = Object.getOwnPropertyDescriptor)), vr;
}
var br, Vt;
function Fe() {
  if (Vt) return br;
  Vt = 1;
  var i = Fi();
  if (i)
    try {
      i([], "length");
    } catch {
      i = null;
    }
  return (br = i), br;
}
var wr, zt;
function $e() {
  if (zt) return wr;
  zt = 1;
  var i = Object.defineProperty || !1;
  if (i)
    try {
      i({}, "a", { value: 1 });
    } catch {
      i = !1;
    }
  return (wr = i), wr;
}
var mr, Yt;
function xi() {
  if (Yt) return mr;
  Yt = 1;
  var i = typeof Symbol < "u" && Symbol,
    m = Jn();
  return (
    (mr = function () {
      return typeof i != "function" ||
        typeof Symbol != "function" ||
        typeof i("foo") != "symbol" ||
        typeof Symbol("bar") != "symbol"
        ? !1
        : m();
    }),
    mr
  );
}
var Er, Jt;
function Zn() {
  return Jt || ((Jt = 1), (Er = (typeof Reflect < "u" && Reflect.getPrototypeOf) || null)), Er;
}
var _r, Kt;
function Qn() {
  if (Kt) return _r;
  Kt = 1;
  var i = Kn();
  return (_r = i.getPrototypeOf || null), _r;
}
var Sr, Xt;
function Mi() {
  if (Xt) return Sr;
  Xt = 1;
  var i = "Function.prototype.bind called on incompatible ",
    m = Object.prototype.toString,
    w = Math.max,
    A = "[object Function]",
    M = function (l, O) {
      for (var L = [], I = 0; I < l.length; I += 1) L[I] = l[I];
      for (var P = 0; P < O.length; P += 1) L[P + l.length] = O[P];
      return L;
    },
    c = function (l, O) {
      for (var L = [], I = O, P = 0; I < l.length; I += 1, P += 1) L[P] = l[I];
      return L;
    },
    S = function (u, l) {
      for (var O = "", L = 0; L < u.length; L += 1) (O += u[L]), L + 1 < u.length && (O += l);
      return O;
    };
  return (
    (Sr = function (l) {
      var O = this;
      if (typeof O != "function" || m.apply(O) !== A) throw new TypeError(i + O);
      for (
        var L = c(arguments, 1),
          I,
          P = function () {
            if (this instanceof I) {
              var f = O.apply(this, M(L, arguments));
              return Object(f) === f ? f : this;
            }
            return O.apply(l, M(L, arguments));
          },
          q = w(0, O.length - L.length),
          G = [],
          y = 0;
        y < q;
        y++
      )
        G[y] = "$" + y;
      if (
        ((I = Function("binder", "return function (" + S(G, ",") + "){ return binder.apply(this,arguments); }")(P)),
        O.prototype)
      ) {
        var B = function () {};
        (B.prototype = O.prototype), (I.prototype = new B()), (B.prototype = null);
      }
      return I;
    }),
    Sr
  );
}
var Ar, Zt;
function je() {
  if (Zt) return Ar;
  Zt = 1;
  var i = Mi();
  return (Ar = Function.prototype.bind || i), Ar;
}
var Rr, Qt;
function dt() {
  return Qt || ((Qt = 1), (Rr = Function.prototype.call)), Rr;
}
var Br, en;
function yt() {
  return en || ((en = 1), (Br = Function.prototype.apply)), Br;
}
var Tr, rn;
function Li() {
  return rn || ((rn = 1), (Tr = typeof Reflect < "u" && Reflect && Reflect.apply)), Tr;
}
var Or, tn;
function ei() {
  if (tn) return Or;
  tn = 1;
  var i = je(),
    m = yt(),
    w = dt(),
    A = Li();
  return (Or = A || i.call(w, m)), Or;
}
var Pr, nn;
function gt() {
  if (nn) return Pr;
  nn = 1;
  var i = je(),
    m = Le(),
    w = dt(),
    A = ei();
  return (
    (Pr = function (c) {
      if (c.length < 1 || typeof c[0] != "function") throw new m("a function is required");
      return A(i, w, c);
    }),
    Pr
  );
}
var Ir, on;
function ji() {
  if (on) return Ir;
  on = 1;
  var i = gt(),
    m = Fe(),
    w;
  try {
    w = [].__proto__ === Array.prototype;
  } catch (S) {
    if (!S || typeof S != "object" || !("code" in S) || S.code !== "ERR_PROTO_ACCESS") throw S;
  }
  var A = !!w && m && m(Object.prototype, "__proto__"),
    M = Object,
    c = M.getPrototypeOf;
  return (
    (Ir =
      A && typeof A.get == "function"
        ? i([A.get])
        : typeof c == "function"
          ? function (u) {
              return c(u == null ? u : M(u));
            }
          : !1),
    Ir
  );
}
var Fr, an;
function vt() {
  if (an) return Fr;
  an = 1;
  var i = Zn(),
    m = Qn(),
    w = ji();
  return (
    (Fr = i
      ? function (M) {
          return i(M);
        }
      : m
        ? function (M) {
            if (!M || (typeof M != "object" && typeof M != "function")) throw new TypeError("getProto: not an object");
            return m(M);
          }
        : w
          ? function (M) {
              return w(M);
            }
          : null),
    Fr
  );
}
var xr, fn;
function ri() {
  if (fn) return xr;
  fn = 1;
  var i = Function.prototype.call,
    m = Object.prototype.hasOwnProperty,
    w = je();
  return (xr = w.call(i, m)), xr;
}
var Mr, un;
function ti() {
  if (un) return Mr;
  un = 1;
  var i,
    m = Kn(),
    w = bi(),
    A = wi(),
    M = mi(),
    c = Ei(),
    S = Xn(),
    u = Le(),
    l = _i(),
    O = Si(),
    L = Ai(),
    I = Ri(),
    P = Bi(),
    q = Ti(),
    G = Oi(),
    y = Ii(),
    B = Function,
    f = function ($) {
      try {
        return B('"use strict"; return (' + $ + ").constructor;")();
      } catch {}
    },
    h = Fe(),
    d = $e(),
    s = function () {
      throw new u();
    },
    p = h
      ? (function () {
          try {
            return arguments.callee, s;
          } catch {
            try {
              return h(arguments, "callee").get;
            } catch {
              return s;
            }
          }
        })()
      : s,
    _ = xi()(),
    R = vt(),
    x = Qn(),
    k = Zn(),
    V = yt(),
    J = dt(),
    E = {},
    Q = typeof Uint8Array > "u" || !R ? i : R(Uint8Array),
    re = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError > "u" ? i : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? i : ArrayBuffer,
      "%ArrayIteratorPrototype%": _ && R ? R([][Symbol.iterator]()) : i,
      "%AsyncFromSyncIteratorPrototype%": i,
      "%AsyncFunction%": E,
      "%AsyncGenerator%": E,
      "%AsyncGeneratorFunction%": E,
      "%AsyncIteratorPrototype%": E,
      "%Atomics%": typeof Atomics > "u" ? i : Atomics,
      "%BigInt%": typeof BigInt > "u" ? i : BigInt,
      "%BigInt64Array%": typeof BigInt64Array > "u" ? i : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array > "u" ? i : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? i : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": w,
      "%eval%": eval,
      "%EvalError%": A,
      "%Float16Array%": typeof Float16Array > "u" ? i : Float16Array,
      "%Float32Array%": typeof Float32Array > "u" ? i : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? i : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? i : FinalizationRegistry,
      "%Function%": B,
      "%GeneratorFunction%": E,
      "%Int8Array%": typeof Int8Array > "u" ? i : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? i : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? i : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": _ && R ? R(R([][Symbol.iterator]())) : i,
      "%JSON%": typeof JSON == "object" ? JSON : i,
      "%Map%": typeof Map > "u" ? i : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !_ || !R ? i : R(new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": m,
      "%Object.getOwnPropertyDescriptor%": h,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? i : Promise,
      "%Proxy%": typeof Proxy > "u" ? i : Proxy,
      "%RangeError%": M,
      "%ReferenceError%": c,
      "%Reflect%": typeof Reflect > "u" ? i : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? i : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !_ || !R ? i : R(new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? i : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": _ && R ? R(""[Symbol.iterator]()) : i,
      "%Symbol%": _ ? Symbol : i,
      "%SyntaxError%": S,
      "%ThrowTypeError%": p,
      "%TypedArray%": Q,
      "%TypeError%": u,
      "%Uint8Array%": typeof Uint8Array > "u" ? i : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? i : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? i : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? i : Uint32Array,
      "%URIError%": l,
      "%WeakMap%": typeof WeakMap > "u" ? i : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? i : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? i : WeakSet,
      "%Function.prototype.call%": J,
      "%Function.prototype.apply%": V,
      "%Object.defineProperty%": d,
      "%Object.getPrototypeOf%": x,
      "%Math.abs%": O,
      "%Math.floor%": L,
      "%Math.max%": I,
      "%Math.min%": P,
      "%Math.pow%": q,
      "%Math.round%": G,
      "%Math.sign%": y,
      "%Reflect.getPrototypeOf%": k,
    };
  if (R)
    try {
      null.error;
    } catch ($) {
      var ie = R(R($));
      re["%Error.prototype%"] = ie;
    }
  var ue = function $(H) {
      var n;
      if (H === "%AsyncFunction%") n = f("async function () {}");
      else if (H === "%GeneratorFunction%") n = f("function* () {}");
      else if (H === "%AsyncGeneratorFunction%") n = f("async function* () {}");
      else if (H === "%AsyncGenerator%") {
        var o = $("%AsyncGeneratorFunction%");
        o && (n = o.prototype);
      } else if (H === "%AsyncIteratorPrototype%") {
        var j = $("%AsyncGenerator%");
        j && R && (n = R(j.prototype));
      }
      return (re[H] = n), n;
    },
    he = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    },
    ce = je(),
    pe = ri(),
    ae = ce.call(J, Array.prototype.concat),
    ve = ce.call(V, Array.prototype.splice),
    de = ce.call(J, String.prototype.replace),
    T = ce.call(J, String.prototype.slice),
    N = ce.call(J, RegExp.prototype.exec),
    W = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    g = /\\(\\)?/g,
    b = function (H) {
      var n = T(H, 0, 1),
        o = T(H, -1);
      if (n === "%" && o !== "%") throw new S("invalid intrinsic syntax, expected closing `%`");
      if (o === "%" && n !== "%") throw new S("invalid intrinsic syntax, expected opening `%`");
      var j = [];
      return (
        de(H, W, function (z, K, Y, ee) {
          j[j.length] = Y ? de(ee, g, "$1") : K || z;
        }),
        j
      );
    },
    C = function (H, n) {
      var o = H,
        j;
      if ((pe(he, o) && ((j = he[o]), (o = "%" + j[0] + "%")), pe(re, o))) {
        var z = re[o];
        if ((z === E && (z = ue(o)), typeof z > "u" && !n))
          throw new u("intrinsic " + H + " exists, but is not available. Please file an issue!");
        return { alias: j, name: o, value: z };
      }
      throw new S("intrinsic " + H + " does not exist!");
    };
  return (
    (Mr = function (H, n) {
      if (typeof H != "string" || H.length === 0) throw new u("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof n != "boolean") throw new u('"allowMissing" argument must be a boolean');
      if (N(/^%?[^%]*%?$/, H) === null)
        throw new S("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var o = b(H),
        j = o.length > 0 ? o[0] : "",
        z = C("%" + j + "%", n),
        K = z.name,
        Y = z.value,
        ee = !1,
        ye = z.alias;
      ye && ((j = ye[0]), ve(o, ae([0, 1], ye)));
      for (var D = 1, be = !0; D < o.length; D += 1) {
        var ge = o[D],
          ne = T(ge, 0, 1),
          fe = T(ge, -1);
        if ((ne === '"' || ne === "'" || ne === "`" || fe === '"' || fe === "'" || fe === "`") && ne !== fe)
          throw new S("property names with quotes must have matching quotes");
        if (((ge === "constructor" || !be) && (ee = !0), (j += "." + ge), (K = "%" + j + "%"), pe(re, K))) Y = re[K];
        else if (Y != null) {
          if (!(ge in Y)) {
            if (!n) throw new u("base intrinsic for " + H + " exists, but the property is not available.");
            return;
          }
          if (h && D + 1 >= o.length) {
            var we = h(Y, ge);
            (be = !!we), be && "get" in we && !("originalValue" in we.get) ? (Y = we.get) : (Y = Y[ge]);
          } else (be = pe(Y, ge)), (Y = Y[ge]);
          be && !ee && (re[K] = Y);
        }
      }
      return Y;
    }),
    Mr
  );
}
var Lr, sn;
function Ce() {
  if (sn) return Lr;
  sn = 1;
  var i = ti(),
    m = gt(),
    w = m([i("%String.prototype.indexOf%")]);
  return (
    (Lr = function (M, c) {
      var S = i(M, !!c);
      return typeof S == "function" && w(M, ".prototype.") > -1 ? m([S]) : S;
    }),
    Lr
  );
}
var jr, ln;
function Ci() {
  if (ln) return jr;
  ln = 1;
  var i = We()(),
    m = Ce(),
    w = m("Object.prototype.toString"),
    A = function (u) {
      return i && u && typeof u == "object" && Symbol.toStringTag in u ? !1 : w(u) === "[object Arguments]";
    },
    M = function (u) {
      return A(u)
        ? !0
        : u !== null &&
            typeof u == "object" &&
            "length" in u &&
            typeof u.length == "number" &&
            u.length >= 0 &&
            w(u) !== "[object Array]" &&
            "callee" in u &&
            w(u.callee) === "[object Function]";
    },
    c = (function () {
      return A(arguments);
    })();
  return (A.isLegacyArguments = M), (jr = c ? A : M), jr;
}
var Cr, cn;
function Ni() {
  if (cn) return Cr;
  cn = 1;
  var i = Ce(),
    m = We()(),
    w = ri(),
    A = Fe(),
    M;
  if (m) {
    var c = i("RegExp.prototype.exec"),
      S = {},
      u = function () {
        throw S;
      },
      l = { toString: u, valueOf: u };
    typeof Symbol.toPrimitive == "symbol" && (l[Symbol.toPrimitive] = u),
      (M = function (P) {
        if (!P || typeof P != "object") return !1;
        var q = A(P, "lastIndex"),
          G = q && w(q, "value");
        if (!G) return !1;
        try {
          c(P, l);
        } catch (y) {
          return y === S;
        }
      });
  } else {
    var O = i("Object.prototype.toString"),
      L = "[object RegExp]";
    M = function (P) {
      return !P || (typeof P != "object" && typeof P != "function") ? !1 : O(P) === L;
    };
  }
  return (Cr = M), Cr;
}
var Nr, hn;
function Di() {
  if (hn) return Nr;
  hn = 1;
  var i = Ce(),
    m = Ni(),
    w = i("RegExp.prototype.exec"),
    A = Le();
  return (
    (Nr = function (c) {
      if (!m(c)) throw new A("`regex` must be a RegExp");
      return function (u) {
        return w(c, u) !== null;
      };
    }),
    Nr
  );
}
var Dr, pn;
function Ui() {
  if (pn) return Dr;
  pn = 1;
  var i = Ce(),
    m = Di(),
    w = m(/^\s*(?:function)?\*/),
    A = We()(),
    M = vt(),
    c = i("Object.prototype.toString"),
    S = i("Function.prototype.toString"),
    u = function () {
      if (!A) return !1;
      try {
        return Function("return function*() {}")();
      } catch {}
    },
    l;
  return (
    (Dr = function (L) {
      if (typeof L != "function") return !1;
      if (w(S(L))) return !0;
      if (!A) {
        var I = c(L);
        return I === "[object GeneratorFunction]";
      }
      if (!M) return !1;
      if (typeof l > "u") {
        var P = u();
        l = P ? M(P) : !1;
      }
      return M(L) === l;
    }),
    Dr
  );
}
var Ur, dn;
function qi() {
  if (dn) return Ur;
  dn = 1;
  var i = Function.prototype.toString,
    m = typeof Reflect == "object" && Reflect !== null && Reflect.apply,
    w,
    A;
  if (typeof m == "function" && typeof Object.defineProperty == "function")
    try {
      (w = Object.defineProperty({}, "length", {
        get: function () {
          throw A;
        },
      })),
        (A = {}),
        m(
          function () {
            throw 42;
          },
          null,
          w,
        );
    } catch (h) {
      h !== A && (m = null);
    }
  else m = null;
  var M = /^\s*class\b/,
    c = function (d) {
      try {
        var s = i.call(d);
        return M.test(s);
      } catch {
        return !1;
      }
    },
    S = function (d) {
      try {
        return c(d) ? !1 : (i.call(d), !0);
      } catch {
        return !1;
      }
    },
    u = Object.prototype.toString,
    l = "[object Object]",
    O = "[object Function]",
    L = "[object GeneratorFunction]",
    I = "[object HTMLAllCollection]",
    P = "[object HTML document.all class]",
    q = "[object HTMLCollection]",
    G = typeof Symbol == "function" && !!Symbol.toStringTag,
    y = !(0 in [,]),
    B = function () {
      return !1;
    };
  if (typeof document == "object") {
    var f = document.all;
    u.call(f) === u.call(document.all) &&
      (B = function (d) {
        if ((y || !d) && (typeof d > "u" || typeof d == "object"))
          try {
            var s = u.call(d);
            return (s === I || s === P || s === q || s === l) && d("") == null;
          } catch {}
        return !1;
      });
  }
  return (
    (Ur = m
      ? function (d) {
          if (B(d)) return !0;
          if (!d || (typeof d != "function" && typeof d != "object")) return !1;
          try {
            m(d, null, w);
          } catch (s) {
            if (s !== A) return !1;
          }
          return !c(d) && S(d);
        }
      : function (d) {
          if (B(d)) return !0;
          if (!d || (typeof d != "function" && typeof d != "object")) return !1;
          if (G) return S(d);
          if (c(d)) return !1;
          var s = u.call(d);
          return s !== O && s !== L && !/^\[object HTML/.test(s) ? !1 : S(d);
        }),
    Ur
  );
}
var qr, yn;
function ki() {
  if (yn) return qr;
  yn = 1;
  var i = qi(),
    m = Object.prototype.toString,
    w = Object.prototype.hasOwnProperty,
    A = function (l, O, L) {
      for (var I = 0, P = l.length; I < P; I++) w.call(l, I) && (L == null ? O(l[I], I, l) : O.call(L, l[I], I, l));
    },
    M = function (l, O, L) {
      for (var I = 0, P = l.length; I < P; I++) L == null ? O(l.charAt(I), I, l) : O.call(L, l.charAt(I), I, l);
    },
    c = function (l, O, L) {
      for (var I in l) w.call(l, I) && (L == null ? O(l[I], I, l) : O.call(L, l[I], I, l));
    };
  function S(u) {
    return m.call(u) === "[object Array]";
  }
  return (
    (qr = function (l, O, L) {
      if (!i(O)) throw new TypeError("iterator must be a function");
      var I;
      arguments.length >= 3 && (I = L), S(l) ? A(l, O, I) : typeof l == "string" ? M(l, O, I) : c(l, O, I);
    }),
    qr
  );
}
var kr, gn;
function Wi() {
  return (
    gn ||
      ((gn = 1),
      (kr = [
        "Float16Array",
        "Float32Array",
        "Float64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigInt64Array",
        "BigUint64Array",
      ])),
    kr
  );
}
var Wr, vn;
function $i() {
  if (vn) return Wr;
  vn = 1;
  var i = Wi(),
    m = typeof globalThis > "u" ? Re : globalThis;
  return (
    (Wr = function () {
      for (var A = [], M = 0; M < i.length; M++) typeof m[i[M]] == "function" && (A[A.length] = i[M]);
      return A;
    }),
    Wr
  );
}
var $r = { exports: {} },
  Gr,
  bn;
function Gi() {
  if (bn) return Gr;
  bn = 1;
  var i = $e(),
    m = Xn(),
    w = Le(),
    A = Fe();
  return (
    (Gr = function (c, S, u) {
      if (!c || (typeof c != "object" && typeof c != "function")) throw new w("`obj` must be an object or a function`");
      if (typeof S != "string" && typeof S != "symbol") throw new w("`property` must be a string or a symbol`");
      if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
        throw new w("`nonEnumerable`, if provided, must be a boolean or null");
      if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
        throw new w("`nonWritable`, if provided, must be a boolean or null");
      if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
        throw new w("`nonConfigurable`, if provided, must be a boolean or null");
      if (arguments.length > 6 && typeof arguments[6] != "boolean")
        throw new w("`loose`, if provided, must be a boolean");
      var l = arguments.length > 3 ? arguments[3] : null,
        O = arguments.length > 4 ? arguments[4] : null,
        L = arguments.length > 5 ? arguments[5] : null,
        I = arguments.length > 6 ? arguments[6] : !1,
        P = !!A && A(c, S);
      if (i)
        i(c, S, {
          configurable: L === null && P ? P.configurable : !L,
          enumerable: l === null && P ? P.enumerable : !l,
          value: u,
          writable: O === null && P ? P.writable : !O,
        });
      else if (I || (!l && !O && !L)) c[S] = u;
      else
        throw new m(
          "This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.",
        );
    }),
    Gr
  );
}
var Hr, wn;
function Hi() {
  if (wn) return Hr;
  wn = 1;
  var i = $e(),
    m = function () {
      return !!i;
    };
  return (
    (m.hasArrayLengthDefineBug = function () {
      if (!i) return null;
      try {
        return i([], "length", { value: 1 }).length !== 1;
      } catch {
        return !0;
      }
    }),
    (Hr = m),
    Hr
  );
}
var Vr, mn;
function Vi() {
  if (mn) return Vr;
  mn = 1;
  var i = ti(),
    m = Gi(),
    w = Hi()(),
    A = Fe(),
    M = Le(),
    c = i("%Math.floor%");
  return (
    (Vr = function (u, l) {
      if (typeof u != "function") throw new M("`fn` is not a function");
      if (typeof l != "number" || l < 0 || l > 4294967295 || c(l) !== l)
        throw new M("`length` must be a positive 32-bit integer");
      var O = arguments.length > 2 && !!arguments[2],
        L = !0,
        I = !0;
      if ("length" in u && A) {
        var P = A(u, "length");
        P && !P.configurable && (L = !1), P && !P.writable && (I = !1);
      }
      return (L || I || !O) && (w ? m(u, "length", l, !0, !0) : m(u, "length", l)), u;
    }),
    Vr
  );
}
var zr, En;
function zi() {
  if (En) return zr;
  En = 1;
  var i = je(),
    m = yt(),
    w = ei();
  return (
    (zr = function () {
      return w(i, m, arguments);
    }),
    zr
  );
}
var _n;
function Yi() {
  return (
    _n ||
      ((_n = 1),
      (function (i) {
        var m = Vi(),
          w = $e(),
          A = gt(),
          M = zi();
        (i.exports = function (S) {
          var u = A(arguments),
            l = S.length - (arguments.length - 1);
          return m(u, 1 + (l > 0 ? l : 0), !0);
        }),
          w ? w(i.exports, "apply", { value: M }) : (i.exports.apply = M);
      })($r)),
    $r.exports
  );
}
var Yr, Sn;
function ni() {
  if (Sn) return Yr;
  Sn = 1;
  var i = ki(),
    m = $i(),
    w = Yi(),
    A = Ce(),
    M = Fe(),
    c = vt(),
    S = A("Object.prototype.toString"),
    u = We()(),
    l = typeof globalThis > "u" ? Re : globalThis,
    O = m(),
    L = A("String.prototype.slice"),
    I =
      A("Array.prototype.indexOf", !0) ||
      function (B, f) {
        for (var h = 0; h < B.length; h += 1) if (B[h] === f) return h;
        return -1;
      },
    P = { __proto__: null };
  u && M && c
    ? i(O, function (y) {
        var B = new l[y]();
        if (Symbol.toStringTag in B && c) {
          var f = c(B),
            h = M(f, Symbol.toStringTag);
          if (!h && f) {
            var d = c(f);
            h = M(d, Symbol.toStringTag);
          }
          P["$" + y] = w(h.get);
        }
      })
    : i(O, function (y) {
        var B = new l[y](),
          f = B.slice || B.set;
        f && (P["$" + y] = w(f));
      });
  var q = function (B) {
      var f = !1;
      return (
        i(P, function (h, d) {
          if (!f)
            try {
              "$" + h(B) === d && (f = L(d, 1));
            } catch {}
        }),
        f
      );
    },
    G = function (B) {
      var f = !1;
      return (
        i(P, function (h, d) {
          if (!f)
            try {
              h(B), (f = L(d, 1));
            } catch {}
        }),
        f
      );
    };
  return (
    (Yr = function (B) {
      if (!B || typeof B != "object") return !1;
      if (!u) {
        var f = L(S(B), 8, -1);
        return I(O, f) > -1 ? f : f !== "Object" ? !1 : G(B);
      }
      return M ? q(B) : null;
    }),
    Yr
  );
}
var Jr, An;
function Ji() {
  if (An) return Jr;
  An = 1;
  var i = ni();
  return (
    (Jr = function (w) {
      return !!i(w);
    }),
    Jr
  );
}
var Rn;
function Ki() {
  return (
    Rn ||
      ((Rn = 1),
      (function (i) {
        var m = Ci(),
          w = Ui(),
          A = ni(),
          M = Ji();
        function c(D) {
          return D.call.bind(D);
        }
        var S = typeof BigInt < "u",
          u = typeof Symbol < "u",
          l = c(Object.prototype.toString),
          O = c(Number.prototype.valueOf),
          L = c(String.prototype.valueOf),
          I = c(Boolean.prototype.valueOf);
        if (S) var P = c(BigInt.prototype.valueOf);
        if (u) var q = c(Symbol.prototype.valueOf);
        function G(D, be) {
          if (typeof D != "object") return !1;
          try {
            return be(D), !0;
          } catch {
            return !1;
          }
        }
        (i.isArgumentsObject = m), (i.isGeneratorFunction = w), (i.isTypedArray = M);
        function y(D) {
          return (
            (typeof Promise < "u" && D instanceof Promise) ||
            (D !== null && typeof D == "object" && typeof D.then == "function" && typeof D.catch == "function")
          );
        }
        i.isPromise = y;
        function B(D) {
          return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(D) : M(D) || T(D);
        }
        i.isArrayBufferView = B;
        function f(D) {
          return A(D) === "Uint8Array";
        }
        i.isUint8Array = f;
        function h(D) {
          return A(D) === "Uint8ClampedArray";
        }
        i.isUint8ClampedArray = h;
        function d(D) {
          return A(D) === "Uint16Array";
        }
        i.isUint16Array = d;
        function s(D) {
          return A(D) === "Uint32Array";
        }
        i.isUint32Array = s;
        function p(D) {
          return A(D) === "Int8Array";
        }
        i.isInt8Array = p;
        function _(D) {
          return A(D) === "Int16Array";
        }
        i.isInt16Array = _;
        function R(D) {
          return A(D) === "Int32Array";
        }
        i.isInt32Array = R;
        function x(D) {
          return A(D) === "Float32Array";
        }
        i.isFloat32Array = x;
        function k(D) {
          return A(D) === "Float64Array";
        }
        i.isFloat64Array = k;
        function V(D) {
          return A(D) === "BigInt64Array";
        }
        i.isBigInt64Array = V;
        function J(D) {
          return A(D) === "BigUint64Array";
        }
        i.isBigUint64Array = J;
        function E(D) {
          return l(D) === "[object Map]";
        }
        E.working = typeof Map < "u" && E(new Map());
        function Q(D) {
          return typeof Map > "u" ? !1 : E.working ? E(D) : D instanceof Map;
        }
        i.isMap = Q;
        function re(D) {
          return l(D) === "[object Set]";
        }
        re.working = typeof Set < "u" && re(new Set());
        function ie(D) {
          return typeof Set > "u" ? !1 : re.working ? re(D) : D instanceof Set;
        }
        i.isSet = ie;
        function ue(D) {
          return l(D) === "[object WeakMap]";
        }
        ue.working = typeof WeakMap < "u" && ue(new WeakMap());
        function he(D) {
          return typeof WeakMap > "u" ? !1 : ue.working ? ue(D) : D instanceof WeakMap;
        }
        i.isWeakMap = he;
        function ce(D) {
          return l(D) === "[object WeakSet]";
        }
        ce.working = typeof WeakSet < "u" && ce(new WeakSet());
        function pe(D) {
          return ce(D);
        }
        i.isWeakSet = pe;
        function ae(D) {
          return l(D) === "[object ArrayBuffer]";
        }
        ae.working = typeof ArrayBuffer < "u" && ae(new ArrayBuffer());
        function ve(D) {
          return typeof ArrayBuffer > "u" ? !1 : ae.working ? ae(D) : D instanceof ArrayBuffer;
        }
        i.isArrayBuffer = ve;
        function de(D) {
          return l(D) === "[object DataView]";
        }
        de.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && de(new DataView(new ArrayBuffer(1), 0, 1));
        function T(D) {
          return typeof DataView > "u" ? !1 : de.working ? de(D) : D instanceof DataView;
        }
        i.isDataView = T;
        var N = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
        function W(D) {
          return l(D) === "[object SharedArrayBuffer]";
        }
        function g(D) {
          return typeof N > "u"
            ? !1
            : (typeof W.working > "u" && (W.working = W(new N())), W.working ? W(D) : D instanceof N);
        }
        i.isSharedArrayBuffer = g;
        function b(D) {
          return l(D) === "[object AsyncFunction]";
        }
        i.isAsyncFunction = b;
        function C(D) {
          return l(D) === "[object Map Iterator]";
        }
        i.isMapIterator = C;
        function $(D) {
          return l(D) === "[object Set Iterator]";
        }
        i.isSetIterator = $;
        function H(D) {
          return l(D) === "[object Generator]";
        }
        i.isGeneratorObject = H;
        function n(D) {
          return l(D) === "[object WebAssembly.Module]";
        }
        i.isWebAssemblyCompiledModule = n;
        function o(D) {
          return G(D, O);
        }
        i.isNumberObject = o;
        function j(D) {
          return G(D, L);
        }
        i.isStringObject = j;
        function z(D) {
          return G(D, I);
        }
        i.isBooleanObject = z;
        function K(D) {
          return S && G(D, P);
        }
        i.isBigIntObject = K;
        function Y(D) {
          return u && G(D, q);
        }
        i.isSymbolObject = Y;
        function ee(D) {
          return o(D) || j(D) || z(D) || K(D) || Y(D);
        }
        i.isBoxedPrimitive = ee;
        function ye(D) {
          return typeof Uint8Array < "u" && (ve(D) || g(D));
        }
        (i.isAnyArrayBuffer = ye),
          ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function (D) {
            Object.defineProperty(i, D, {
              enumerable: !1,
              value: function () {
                throw new Error(D + " is not supported in userland");
              },
            });
          });
      })(Ze)),
    Ze
  );
}
var Kr, Bn;
function Xi() {
  return (
    Bn ||
      ((Bn = 1),
      (Kr = function (m) {
        return (
          m &&
          typeof m == "object" &&
          typeof m.copy == "function" &&
          typeof m.fill == "function" &&
          typeof m.readUInt8 == "function"
        );
      })),
    Kr
  );
}
var Tn;
function bt() {
  return (
    Tn ||
      ((Tn = 1),
      (function (i) {
        var m = {},
          w =
            Object.getOwnPropertyDescriptors ||
            function (N) {
              for (var W = Object.keys(N), g = {}, b = 0; b < W.length; b++)
                g[W[b]] = Object.getOwnPropertyDescriptor(N, W[b]);
              return g;
            },
          A = /%[sdj%]/g;
        (i.format = function (T) {
          if (!_(T)) {
            for (var N = [], W = 0; W < arguments.length; W++) N.push(u(arguments[W]));
            return N.join(" ");
          }
          for (
            var W = 1,
              g = arguments,
              b = g.length,
              C = String(T).replace(A, function (H) {
                if (H === "%%") return "%";
                if (W >= b) return H;
                switch (H) {
                  case "%s":
                    return String(g[W++]);
                  case "%d":
                    return Number(g[W++]);
                  case "%j":
                    try {
                      return JSON.stringify(g[W++]);
                    } catch {
                      return "[Circular]";
                    }
                  default:
                    return H;
                }
              }),
              $ = g[W];
            W < b;
            $ = g[++W]
          )
            d($) || !V($) ? (C += " " + $) : (C += " " + u($));
          return C;
        }),
          (i.deprecate = function (T, N) {
            if (typeof Z < "u" && Z.noDeprecation === !0) return T;
            if (typeof Z > "u")
              return function () {
                return i.deprecate(T, N).apply(this, arguments);
              };
            var W = !1;
            function g() {
              if (!W) {
                if (Z.throwDeprecation) throw new Error(N);
                Z.traceDeprecation ? console.trace(N) : console.error(N), (W = !0);
              }
              return T.apply(this, arguments);
            }
            return g;
          });
        var M = {},
          c = /^$/;
        if (m.NODE_DEBUG) {
          var S = m.NODE_DEBUG;
          (S = S.replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
            .replace(/\*/g, ".*")
            .replace(/,/g, "$|^")
            .toUpperCase()),
            (c = new RegExp("^" + S + "$", "i"));
        }
        i.debuglog = function (T) {
          if (((T = T.toUpperCase()), !M[T]))
            if (c.test(T)) {
              var N = Z.pid;
              M[T] = function () {
                var W = i.format.apply(i, arguments);
                console.error("%s %d: %s", T, N, W);
              };
            } else M[T] = function () {};
          return M[T];
        };
        function u(T, N) {
          var W = { seen: [], stylize: O };
          return (
            arguments.length >= 3 && (W.depth = arguments[2]),
            arguments.length >= 4 && (W.colors = arguments[3]),
            h(N) ? (W.showHidden = N) : N && i._extend(W, N),
            x(W.showHidden) && (W.showHidden = !1),
            x(W.depth) && (W.depth = 2),
            x(W.colors) && (W.colors = !1),
            x(W.customInspect) && (W.customInspect = !0),
            W.colors && (W.stylize = l),
            I(W, T, W.depth)
          );
        }
        (i.inspect = u),
          (u.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39],
          }),
          (u.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red",
          });
        function l(T, N) {
          var W = u.styles[N];
          return W ? "\x1B[" + u.colors[W][0] + "m" + T + "\x1B[" + u.colors[W][1] + "m" : T;
        }
        function O(T, N) {
          return T;
        }
        function L(T) {
          var N = {};
          return (
            T.forEach(function (W, g) {
              N[W] = !0;
            }),
            N
          );
        }
        function I(T, N, W) {
          if (
            T.customInspect &&
            N &&
            Q(N.inspect) &&
            N.inspect !== i.inspect &&
            !(N.constructor && N.constructor.prototype === N)
          ) {
            var g = N.inspect(W, T);
            return _(g) || (g = I(T, g, W)), g;
          }
          var b = P(T, N);
          if (b) return b;
          var C = Object.keys(N),
            $ = L(C);
          if (
            (T.showHidden && (C = Object.getOwnPropertyNames(N)),
            E(N) && (C.indexOf("message") >= 0 || C.indexOf("description") >= 0))
          )
            return q(N);
          if (C.length === 0) {
            if (Q(N)) {
              var H = N.name ? ": " + N.name : "";
              return T.stylize("[Function" + H + "]", "special");
            }
            if (k(N)) return T.stylize(RegExp.prototype.toString.call(N), "regexp");
            if (J(N)) return T.stylize(Date.prototype.toString.call(N), "date");
            if (E(N)) return q(N);
          }
          var n = "",
            o = !1,
            j = ["{", "}"];
          if ((f(N) && ((o = !0), (j = ["[", "]"])), Q(N))) {
            var z = N.name ? ": " + N.name : "";
            n = " [Function" + z + "]";
          }
          if (
            (k(N) && (n = " " + RegExp.prototype.toString.call(N)),
            J(N) && (n = " " + Date.prototype.toUTCString.call(N)),
            E(N) && (n = " " + q(N)),
            C.length === 0 && (!o || N.length == 0))
          )
            return j[0] + n + j[1];
          if (W < 0)
            return k(N) ? T.stylize(RegExp.prototype.toString.call(N), "regexp") : T.stylize("[Object]", "special");
          T.seen.push(N);
          var K;
          return (
            o
              ? (K = G(T, N, W, $, C))
              : (K = C.map(function (Y) {
                  return y(T, N, W, $, Y, o);
                })),
            T.seen.pop(),
            B(K, n, j)
          );
        }
        function P(T, N) {
          if (x(N)) return T.stylize("undefined", "undefined");
          if (_(N)) {
            var W = "'" + JSON.stringify(N).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return T.stylize(W, "string");
          }
          if (p(N)) return T.stylize("" + N, "number");
          if (h(N)) return T.stylize("" + N, "boolean");
          if (d(N)) return T.stylize("null", "null");
        }
        function q(T) {
          return "[" + Error.prototype.toString.call(T) + "]";
        }
        function G(T, N, W, g, b) {
          for (var C = [], $ = 0, H = N.length; $ < H; ++$)
            pe(N, String($)) ? C.push(y(T, N, W, g, String($), !0)) : C.push("");
          return (
            b.forEach(function (n) {
              n.match(/^\d+$/) || C.push(y(T, N, W, g, n, !0));
            }),
            C
          );
        }
        function y(T, N, W, g, b, C) {
          var $, H, n;
          if (
            ((n = Object.getOwnPropertyDescriptor(N, b) || { value: N[b] }),
            n.get
              ? n.set
                ? (H = T.stylize("[Getter/Setter]", "special"))
                : (H = T.stylize("[Getter]", "special"))
              : n.set && (H = T.stylize("[Setter]", "special")),
            pe(g, b) || ($ = "[" + b + "]"),
            H ||
              (T.seen.indexOf(n.value) < 0
                ? (d(W) ? (H = I(T, n.value, null)) : (H = I(T, n.value, W - 1)),
                  H.indexOf(`
`) > -1 &&
                    (C
                      ? (H = H.split(
                          `
`,
                        )
                          .map(function (o) {
                            return "  " + o;
                          })
                          .join(
                            `
`,
                          )
                          .slice(2))
                      : (H =
                          `
` +
                          H.split(
                            `
`,
                          ).map(function (o) {
                            return "   " + o;
                          }).join(`
`))))
                : (H = T.stylize("[Circular]", "special"))),
            x($))
          ) {
            if (C && b.match(/^\d+$/)) return H;
            ($ = JSON.stringify("" + b)),
              $.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                ? (($ = $.slice(1, -1)), ($ = T.stylize($, "name")))
                : (($ = $.replace(/'/g, "\\'")
                    .replace(/\\"/g, '"')
                    .replace(/(^"|"$)/g, "'")),
                  ($ = T.stylize($, "string")));
          }
          return $ + ": " + H;
        }
        function B(T, N, W) {
          var g = T.reduce(function (b, C) {
            return (
              C.indexOf(`
`) >= 0,
              b + C.replace(/\u001b\[\d\d?m/g, "").length + 1
            );
          }, 0);
          return g > 60
            ? W[0] +
                (N === ""
                  ? ""
                  : N +
                    `
 `) +
                " " +
                T.join(`,
  `) +
                " " +
                W[1]
            : W[0] + N + " " + T.join(", ") + " " + W[1];
        }
        i.types = Ki();
        function f(T) {
          return Array.isArray(T);
        }
        i.isArray = f;
        function h(T) {
          return typeof T == "boolean";
        }
        i.isBoolean = h;
        function d(T) {
          return T === null;
        }
        i.isNull = d;
        function s(T) {
          return T == null;
        }
        i.isNullOrUndefined = s;
        function p(T) {
          return typeof T == "number";
        }
        i.isNumber = p;
        function _(T) {
          return typeof T == "string";
        }
        i.isString = _;
        function R(T) {
          return typeof T == "symbol";
        }
        i.isSymbol = R;
        function x(T) {
          return T === void 0;
        }
        i.isUndefined = x;
        function k(T) {
          return V(T) && ie(T) === "[object RegExp]";
        }
        (i.isRegExp = k), (i.types.isRegExp = k);
        function V(T) {
          return typeof T == "object" && T !== null;
        }
        i.isObject = V;
        function J(T) {
          return V(T) && ie(T) === "[object Date]";
        }
        (i.isDate = J), (i.types.isDate = J);
        function E(T) {
          return V(T) && (ie(T) === "[object Error]" || T instanceof Error);
        }
        (i.isError = E), (i.types.isNativeError = E);
        function Q(T) {
          return typeof T == "function";
        }
        i.isFunction = Q;
        function re(T) {
          return (
            T === null ||
            typeof T == "boolean" ||
            typeof T == "number" ||
            typeof T == "string" ||
            typeof T == "symbol" ||
            typeof T > "u"
          );
        }
        (i.isPrimitive = re), (i.isBuffer = Xi());
        function ie(T) {
          return Object.prototype.toString.call(T);
        }
        function ue(T) {
          return T < 10 ? "0" + T.toString(10) : T.toString(10);
        }
        var he = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        function ce() {
          var T = new Date(),
            N = [ue(T.getHours()), ue(T.getMinutes()), ue(T.getSeconds())].join(":");
          return [T.getDate(), he[T.getMonth()], N].join(" ");
        }
        (i.log = function () {
          console.log("%s - %s", ce(), i.format.apply(i, arguments));
        }),
          (i.inherits = Be()),
          (i._extend = function (T, N) {
            if (!N || !V(N)) return T;
            for (var W = Object.keys(N), g = W.length; g--; ) T[W[g]] = N[W[g]];
            return T;
          });
        function pe(T, N) {
          return Object.prototype.hasOwnProperty.call(T, N);
        }
        var ae = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
        (i.promisify = function (N) {
          if (typeof N != "function") throw new TypeError('The "original" argument must be of type Function');
          if (ae && N[ae]) {
            var W = N[ae];
            if (typeof W != "function")
              throw new TypeError('The "util.promisify.custom" argument must be of type Function');
            return Object.defineProperty(W, ae, { value: W, enumerable: !1, writable: !1, configurable: !0 }), W;
          }
          function W() {
            for (
              var g,
                b,
                C = new Promise(function (n, o) {
                  (g = n), (b = o);
                }),
                $ = [],
                H = 0;
              H < arguments.length;
              H++
            )
              $.push(arguments[H]);
            $.push(function (n, o) {
              n ? b(n) : g(o);
            });
            try {
              N.apply(this, $);
            } catch (n) {
              b(n);
            }
            return C;
          }
          return (
            Object.setPrototypeOf(W, Object.getPrototypeOf(N)),
            ae && Object.defineProperty(W, ae, { value: W, enumerable: !1, writable: !1, configurable: !0 }),
            Object.defineProperties(W, w(N))
          );
        }),
          (i.promisify.custom = ae);
        function ve(T, N) {
          if (!T) {
            var W = new Error("Promise was rejected with a falsy value");
            (W.reason = T), (T = W);
          }
          return N(T);
        }
        function de(T) {
          if (typeof T != "function") throw new TypeError('The "original" argument must be of type Function');
          function N() {
            for (var W = [], g = 0; g < arguments.length; g++) W.push(arguments[g]);
            var b = W.pop();
            if (typeof b != "function") throw new TypeError("The last argument must be of type Function");
            var C = this,
              $ = function () {
                return b.apply(C, arguments);
              };
            T.apply(this, W).then(
              function (H) {
                Z.nextTick($.bind(null, null, H));
              },
              function (H) {
                Z.nextTick(ve.bind(null, H, $));
              },
            );
          }
          return Object.setPrototypeOf(N, Object.getPrototypeOf(T)), Object.defineProperties(N, w(T)), N;
        }
        i.callbackify = de;
      })(Xe)),
    Xe
  );
}
var Xr, On;
function Zi() {
  if (On) return Xr;
  On = 1;
  function i(G, y) {
    var B = Object.keys(G);
    if (Object.getOwnPropertySymbols) {
      var f = Object.getOwnPropertySymbols(G);
      y &&
        (f = f.filter(function (h) {
          return Object.getOwnPropertyDescriptor(G, h).enumerable;
        })),
        B.push.apply(B, f);
    }
    return B;
  }
  function m(G) {
    for (var y = 1; y < arguments.length; y++) {
      var B = arguments[y] != null ? arguments[y] : {};
      y % 2
        ? i(Object(B), !0).forEach(function (f) {
            w(G, f, B[f]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(G, Object.getOwnPropertyDescriptors(B))
          : i(Object(B)).forEach(function (f) {
              Object.defineProperty(G, f, Object.getOwnPropertyDescriptor(B, f));
            });
    }
    return G;
  }
  function w(G, y, B) {
    return (
      (y = S(y)),
      y in G ? Object.defineProperty(G, y, { value: B, enumerable: !0, configurable: !0, writable: !0 }) : (G[y] = B),
      G
    );
  }
  function A(G, y) {
    if (!(G instanceof y)) throw new TypeError("Cannot call a class as a function");
  }
  function M(G, y) {
    for (var B = 0; B < y.length; B++) {
      var f = y[B];
      (f.enumerable = f.enumerable || !1),
        (f.configurable = !0),
        "value" in f && (f.writable = !0),
        Object.defineProperty(G, S(f.key), f);
    }
  }
  function c(G, y, B) {
    return y && M(G.prototype, y), Object.defineProperty(G, "prototype", { writable: !1 }), G;
  }
  function S(G) {
    var y = u(G, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function u(G, y) {
    if (typeof G != "object" || G === null) return G;
    var B = G[Symbol.toPrimitive];
    if (B !== void 0) {
      var f = B.call(G, y);
      if (typeof f != "object") return f;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(G);
  }
  var l = ke(),
    O = l.Buffer,
    L = bt(),
    I = L.inspect,
    P = (I && I.custom) || "inspect";
  function q(G, y, B) {
    O.prototype.copy.call(G, y, B);
  }
  return (
    (Xr = (function () {
      function G() {
        A(this, G), (this.head = null), (this.tail = null), (this.length = 0);
      }
      return (
        c(G, [
          {
            key: "push",
            value: function (B) {
              var f = { data: B, next: null };
              this.length > 0 ? (this.tail.next = f) : (this.head = f), (this.tail = f), ++this.length;
            },
          },
          {
            key: "unshift",
            value: function (B) {
              var f = { data: B, next: this.head };
              this.length === 0 && (this.tail = f), (this.head = f), ++this.length;
            },
          },
          {
            key: "shift",
            value: function () {
              if (this.length !== 0) {
                var B = this.head.data;
                return (
                  this.length === 1 ? (this.head = this.tail = null) : (this.head = this.head.next), --this.length, B
                );
              }
            },
          },
          {
            key: "clear",
            value: function () {
              (this.head = this.tail = null), (this.length = 0);
            },
          },
          {
            key: "join",
            value: function (B) {
              if (this.length === 0) return "";
              for (var f = this.head, h = "" + f.data; (f = f.next); ) h += B + f.data;
              return h;
            },
          },
          {
            key: "concat",
            value: function (B) {
              if (this.length === 0) return O.alloc(0);
              for (var f = O.allocUnsafe(B >>> 0), h = this.head, d = 0; h; )
                q(h.data, f, d), (d += h.data.length), (h = h.next);
              return f;
            },
          },
          {
            key: "consume",
            value: function (B, f) {
              var h;
              return (
                B < this.head.data.length
                  ? ((h = this.head.data.slice(0, B)), (this.head.data = this.head.data.slice(B)))
                  : B === this.head.data.length
                    ? (h = this.shift())
                    : (h = f ? this._getString(B) : this._getBuffer(B)),
                h
              );
            },
          },
          {
            key: "first",
            value: function () {
              return this.head.data;
            },
          },
          {
            key: "_getString",
            value: function (B) {
              var f = this.head,
                h = 1,
                d = f.data;
              for (B -= d.length; (f = f.next); ) {
                var s = f.data,
                  p = B > s.length ? s.length : B;
                if ((p === s.length ? (d += s) : (d += s.slice(0, B)), (B -= p), B === 0)) {
                  p === s.length
                    ? (++h, f.next ? (this.head = f.next) : (this.head = this.tail = null))
                    : ((this.head = f), (f.data = s.slice(p)));
                  break;
                }
                ++h;
              }
              return (this.length -= h), d;
            },
          },
          {
            key: "_getBuffer",
            value: function (B) {
              var f = O.allocUnsafe(B),
                h = this.head,
                d = 1;
              for (h.data.copy(f), B -= h.data.length; (h = h.next); ) {
                var s = h.data,
                  p = B > s.length ? s.length : B;
                if ((s.copy(f, f.length - B, 0, p), (B -= p), B === 0)) {
                  p === s.length
                    ? (++d, h.next ? (this.head = h.next) : (this.head = this.tail = null))
                    : ((this.head = h), (h.data = s.slice(p)));
                  break;
                }
                ++d;
              }
              return (this.length -= d), f;
            },
          },
          {
            key: P,
            value: function (B, f) {
              return I(this, m(m({}, f), {}, { depth: 0, customInspect: !1 }));
            },
          },
        ]),
        G
      );
    })()),
    Xr
  );
}
var Zr, Pn;
function ii() {
  if (Pn) return Zr;
  Pn = 1;
  function i(S, u) {
    var l = this,
      O = this._readableState && this._readableState.destroyed,
      L = this._writableState && this._writableState.destroyed;
    return O || L
      ? (u
          ? u(S)
          : S &&
            (this._writableState
              ? this._writableState.errorEmitted || ((this._writableState.errorEmitted = !0), Z.nextTick(M, this, S))
              : Z.nextTick(M, this, S)),
        this)
      : (this._readableState && (this._readableState.destroyed = !0),
        this._writableState && (this._writableState.destroyed = !0),
        this._destroy(S || null, function (I) {
          !u && I
            ? l._writableState
              ? l._writableState.errorEmitted
                ? Z.nextTick(w, l)
                : ((l._writableState.errorEmitted = !0), Z.nextTick(m, l, I))
              : Z.nextTick(m, l, I)
            : u
              ? (Z.nextTick(w, l), u(I))
              : Z.nextTick(w, l);
        }),
        this);
  }
  function m(S, u) {
    M(S, u), w(S);
  }
  function w(S) {
    (S._writableState && !S._writableState.emitClose) ||
      (S._readableState && !S._readableState.emitClose) ||
      S.emit("close");
  }
  function A() {
    this._readableState &&
      ((this._readableState.destroyed = !1),
      (this._readableState.reading = !1),
      (this._readableState.ended = !1),
      (this._readableState.endEmitted = !1)),
      this._writableState &&
        ((this._writableState.destroyed = !1),
        (this._writableState.ended = !1),
        (this._writableState.ending = !1),
        (this._writableState.finalCalled = !1),
        (this._writableState.prefinished = !1),
        (this._writableState.finished = !1),
        (this._writableState.errorEmitted = !1));
  }
  function M(S, u) {
    S.emit("error", u);
  }
  function c(S, u) {
    var l = S._readableState,
      O = S._writableState;
    (l && l.autoDestroy) || (O && O.autoDestroy) ? S.destroy(u) : S.emit("error", u);
  }
  return (Zr = { destroy: i, undestroy: A, errorOrDestroy: c }), Zr;
}
var Qr = {},
  In;
function xe() {
  if (In) return Qr;
  In = 1;
  function i(u, l) {
    (u.prototype = Object.create(l.prototype)), (u.prototype.constructor = u), (u.__proto__ = l);
  }
  var m = {};
  function w(u, l, O) {
    O || (O = Error);
    function L(P, q, G) {
      return typeof l == "string" ? l : l(P, q, G);
    }
    var I = (function (P) {
      i(q, P);
      function q(G, y, B) {
        return P.call(this, L(G, y, B)) || this;
      }
      return q;
    })(O);
    (I.prototype.name = O.name), (I.prototype.code = u), (m[u] = I);
  }
  function A(u, l) {
    if (Array.isArray(u)) {
      var O = u.length;
      return (
        (u = u.map(function (L) {
          return String(L);
        })),
        O > 2
          ? "one of ".concat(l, " ").concat(u.slice(0, O - 1).join(", "), ", or ") + u[O - 1]
          : O === 2
            ? "one of ".concat(l, " ").concat(u[0], " or ").concat(u[1])
            : "of ".concat(l, " ").concat(u[0])
      );
    } else return "of ".concat(l, " ").concat(String(u));
  }
  function M(u, l, O) {
    return u.substr(0, l.length) === l;
  }
  function c(u, l, O) {
    return (O === void 0 || O > u.length) && (O = u.length), u.substring(O - l.length, O) === l;
  }
  function S(u, l, O) {
    return typeof O != "number" && (O = 0), O + l.length > u.length ? !1 : u.indexOf(l, O) !== -1;
  }
  return (
    w(
      "ERR_INVALID_OPT_VALUE",
      function (u, l) {
        return 'The value "' + l + '" is invalid for option "' + u + '"';
      },
      TypeError,
    ),
    w(
      "ERR_INVALID_ARG_TYPE",
      function (u, l, O) {
        var L;
        typeof l == "string" && M(l, "not ") ? ((L = "must not be"), (l = l.replace(/^not /, ""))) : (L = "must be");
        var I;
        if (c(u, " argument")) I = "The ".concat(u, " ").concat(L, " ").concat(A(l, "type"));
        else {
          var P = S(u, ".") ? "property" : "argument";
          I = 'The "'.concat(u, '" ').concat(P, " ").concat(L, " ").concat(A(l, "type"));
        }
        return (I += ". Received type ".concat(typeof O)), I;
      },
      TypeError,
    ),
    w("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
    w("ERR_METHOD_NOT_IMPLEMENTED", function (u) {
      return "The " + u + " method is not implemented";
    }),
    w("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
    w("ERR_STREAM_DESTROYED", function (u) {
      return "Cannot call " + u + " after a stream was destroyed";
    }),
    w("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
    w("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
    w("ERR_STREAM_WRITE_AFTER_END", "write after end"),
    w("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError),
    w(
      "ERR_UNKNOWN_ENCODING",
      function (u) {
        return "Unknown encoding: " + u;
      },
      TypeError,
    ),
    w("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"),
    (Qr.codes = m),
    Qr
  );
}
var et, Fn;
function oi() {
  if (Fn) return et;
  Fn = 1;
  var i = xe().codes.ERR_INVALID_OPT_VALUE;
  function m(A, M, c) {
    return A.highWaterMark != null ? A.highWaterMark : M ? A[c] : null;
  }
  function w(A, M, c, S) {
    var u = m(M, S, c);
    if (u != null) {
      if (!(isFinite(u) && Math.floor(u) === u) || u < 0) {
        var l = S ? c : "highWaterMark";
        throw new i(l, u);
      }
      return Math.floor(u);
    }
    return A.objectMode ? 16 : 16 * 1024;
  }
  return (et = { getHighWaterMark: w }), et;
}
var rt, xn;
function Qi() {
  if (xn) return rt;
  (xn = 1), (rt = i);
  function i(w, A) {
    if (m("noDeprecation")) return w;
    var M = !1;
    function c() {
      if (!M) {
        if (m("throwDeprecation")) throw new Error(A);
        m("traceDeprecation") ? console.trace(A) : console.warn(A), (M = !0);
      }
      return w.apply(this, arguments);
    }
    return c;
  }
  function m(w) {
    try {
      if (!Re.localStorage) return !1;
    } catch {
      return !1;
    }
    var A = Re.localStorage[w];
    return A == null ? !1 : String(A).toLowerCase() === "true";
  }
  return rt;
}
var tt, Mn;
function ai() {
  if (Mn) return tt;
  (Mn = 1), (tt = x);
  function i(g) {
    var b = this;
    (this.next = null),
      (this.entry = null),
      (this.finish = function () {
        W(b, g);
      });
  }
  var m;
  x.WritableState = _;
  var w = { deprecate: Qi() },
    A = Yn(),
    M = ke().Buffer,
    c =
      (typeof Re < "u" ? Re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array ||
      function () {};
  function S(g) {
    return M.from(g);
  }
  function u(g) {
    return M.isBuffer(g) || g instanceof c;
  }
  var l = ii(),
    O = oi(),
    L = O.getHighWaterMark,
    I = xe().codes,
    P = I.ERR_INVALID_ARG_TYPE,
    q = I.ERR_METHOD_NOT_IMPLEMENTED,
    G = I.ERR_MULTIPLE_CALLBACK,
    y = I.ERR_STREAM_CANNOT_PIPE,
    B = I.ERR_STREAM_DESTROYED,
    f = I.ERR_STREAM_NULL_VALUES,
    h = I.ERR_STREAM_WRITE_AFTER_END,
    d = I.ERR_UNKNOWN_ENCODING,
    s = l.errorOrDestroy;
  Be()(x, A);
  function p() {}
  function _(g, b, C) {
    (m = m || Ie()),
      (g = g || {}),
      typeof C != "boolean" && (C = b instanceof m),
      (this.objectMode = !!g.objectMode),
      C && (this.objectMode = this.objectMode || !!g.writableObjectMode),
      (this.highWaterMark = L(this, g, "writableHighWaterMark", C)),
      (this.finalCalled = !1),
      (this.needDrain = !1),
      (this.ending = !1),
      (this.ended = !1),
      (this.finished = !1),
      (this.destroyed = !1);
    var $ = g.decodeStrings === !1;
    (this.decodeStrings = !$),
      (this.defaultEncoding = g.defaultEncoding || "utf8"),
      (this.length = 0),
      (this.writing = !1),
      (this.corked = 0),
      (this.sync = !0),
      (this.bufferProcessing = !1),
      (this.onwrite = function (H) {
        ue(b, H);
      }),
      (this.writecb = null),
      (this.writelen = 0),
      (this.bufferedRequest = null),
      (this.lastBufferedRequest = null),
      (this.pendingcb = 0),
      (this.prefinished = !1),
      (this.errorEmitted = !1),
      (this.emitClose = g.emitClose !== !1),
      (this.autoDestroy = !!g.autoDestroy),
      (this.bufferedRequestCount = 0),
      (this.corkedRequestsFree = new i(this));
  }
  (_.prototype.getBuffer = function () {
    for (var b = this.bufferedRequest, C = []; b; ) C.push(b), (b = b.next);
    return C;
  }),
    (function () {
      try {
        Object.defineProperty(_.prototype, "buffer", {
          get: w.deprecate(
            function () {
              return this.getBuffer();
            },
            "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
            "DEP0003",
          ),
        });
      } catch {}
    })();
  var R;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function"
    ? ((R = Function.prototype[Symbol.hasInstance]),
      Object.defineProperty(x, Symbol.hasInstance, {
        value: function (b) {
          return R.call(this, b) ? !0 : this !== x ? !1 : b && b._writableState instanceof _;
        },
      }))
    : (R = function (b) {
        return b instanceof this;
      });
  function x(g) {
    m = m || Ie();
    var b = this instanceof m;
    if (!b && !R.call(x, this)) return new x(g);
    (this._writableState = new _(g, this, b)),
      (this.writable = !0),
      g &&
        (typeof g.write == "function" && (this._write = g.write),
        typeof g.writev == "function" && (this._writev = g.writev),
        typeof g.destroy == "function" && (this._destroy = g.destroy),
        typeof g.final == "function" && (this._final = g.final)),
      A.call(this);
  }
  x.prototype.pipe = function () {
    s(this, new y());
  };
  function k(g, b) {
    var C = new h();
    s(g, C), Z.nextTick(b, C);
  }
  function V(g, b, C, $) {
    var H;
    return (
      C === null
        ? (H = new f())
        : typeof C != "string" && !b.objectMode && (H = new P("chunk", ["string", "Buffer"], C)),
      H ? (s(g, H), Z.nextTick($, H), !1) : !0
    );
  }
  (x.prototype.write = function (g, b, C) {
    var $ = this._writableState,
      H = !1,
      n = !$.objectMode && u(g);
    return (
      n && !M.isBuffer(g) && (g = S(g)),
      typeof b == "function" && ((C = b), (b = null)),
      n ? (b = "buffer") : b || (b = $.defaultEncoding),
      typeof C != "function" && (C = p),
      $.ending ? k(this, C) : (n || V(this, $, g, C)) && ($.pendingcb++, (H = E(this, $, n, g, b, C))),
      H
    );
  }),
    (x.prototype.cork = function () {
      this._writableState.corked++;
    }),
    (x.prototype.uncork = function () {
      var g = this._writableState;
      g.corked && (g.corked--, !g.writing && !g.corked && !g.bufferProcessing && g.bufferedRequest && pe(this, g));
    }),
    (x.prototype.setDefaultEncoding = function (b) {
      if (
        (typeof b == "string" && (b = b.toLowerCase()),
        !(
          ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf(
            (b + "").toLowerCase(),
          ) > -1
        ))
      )
        throw new d(b);
      return (this._writableState.defaultEncoding = b), this;
    }),
    Object.defineProperty(x.prototype, "writableBuffer", {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    });
  function J(g, b, C) {
    return !g.objectMode && g.decodeStrings !== !1 && typeof b == "string" && (b = M.from(b, C)), b;
  }
  Object.defineProperty(x.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  });
  function E(g, b, C, $, H, n) {
    if (!C) {
      var o = J(b, $, H);
      $ !== o && ((C = !0), (H = "buffer"), ($ = o));
    }
    var j = b.objectMode ? 1 : $.length;
    b.length += j;
    var z = b.length < b.highWaterMark;
    if ((z || (b.needDrain = !0), b.writing || b.corked)) {
      var K = b.lastBufferedRequest;
      (b.lastBufferedRequest = { chunk: $, encoding: H, isBuf: C, callback: n, next: null }),
        K ? (K.next = b.lastBufferedRequest) : (b.bufferedRequest = b.lastBufferedRequest),
        (b.bufferedRequestCount += 1);
    } else Q(g, b, !1, j, $, H, n);
    return z;
  }
  function Q(g, b, C, $, H, n, o) {
    (b.writelen = $),
      (b.writecb = o),
      (b.writing = !0),
      (b.sync = !0),
      b.destroyed ? b.onwrite(new B("write")) : C ? g._writev(H, b.onwrite) : g._write(H, n, b.onwrite),
      (b.sync = !1);
  }
  function re(g, b, C, $, H) {
    --b.pendingcb,
      C
        ? (Z.nextTick(H, $), Z.nextTick(T, g, b), (g._writableState.errorEmitted = !0), s(g, $))
        : (H($), (g._writableState.errorEmitted = !0), s(g, $), T(g, b));
  }
  function ie(g) {
    (g.writing = !1), (g.writecb = null), (g.length -= g.writelen), (g.writelen = 0);
  }
  function ue(g, b) {
    var C = g._writableState,
      $ = C.sync,
      H = C.writecb;
    if (typeof H != "function") throw new G();
    if ((ie(C), b)) re(g, C, $, b, H);
    else {
      var n = ae(C) || g.destroyed;
      !n && !C.corked && !C.bufferProcessing && C.bufferedRequest && pe(g, C),
        $ ? Z.nextTick(he, g, C, n, H) : he(g, C, n, H);
    }
  }
  function he(g, b, C, $) {
    C || ce(g, b), b.pendingcb--, $(), T(g, b);
  }
  function ce(g, b) {
    b.length === 0 && b.needDrain && ((b.needDrain = !1), g.emit("drain"));
  }
  function pe(g, b) {
    b.bufferProcessing = !0;
    var C = b.bufferedRequest;
    if (g._writev && C && C.next) {
      var $ = b.bufferedRequestCount,
        H = new Array($),
        n = b.corkedRequestsFree;
      n.entry = C;
      for (var o = 0, j = !0; C; ) (H[o] = C), C.isBuf || (j = !1), (C = C.next), (o += 1);
      (H.allBuffers = j),
        Q(g, b, !0, b.length, H, "", n.finish),
        b.pendingcb++,
        (b.lastBufferedRequest = null),
        n.next ? ((b.corkedRequestsFree = n.next), (n.next = null)) : (b.corkedRequestsFree = new i(b)),
        (b.bufferedRequestCount = 0);
    } else {
      for (; C; ) {
        var z = C.chunk,
          K = C.encoding,
          Y = C.callback,
          ee = b.objectMode ? 1 : z.length;
        if ((Q(g, b, !1, ee, z, K, Y), (C = C.next), b.bufferedRequestCount--, b.writing)) break;
      }
      C === null && (b.lastBufferedRequest = null);
    }
    (b.bufferedRequest = C), (b.bufferProcessing = !1);
  }
  (x.prototype._write = function (g, b, C) {
    C(new q("_write()"));
  }),
    (x.prototype._writev = null),
    (x.prototype.end = function (g, b, C) {
      var $ = this._writableState;
      return (
        typeof g == "function" ? ((C = g), (g = null), (b = null)) : typeof b == "function" && ((C = b), (b = null)),
        g != null && this.write(g, b),
        $.corked && (($.corked = 1), this.uncork()),
        $.ending || N(this, $, C),
        this
      );
    }),
    Object.defineProperty(x.prototype, "writableLength", {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function ae(g) {
    return g.ending && g.length === 0 && g.bufferedRequest === null && !g.finished && !g.writing;
  }
  function ve(g, b) {
    g._final(function (C) {
      b.pendingcb--, C && s(g, C), (b.prefinished = !0), g.emit("prefinish"), T(g, b);
    });
  }
  function de(g, b) {
    !b.prefinished &&
      !b.finalCalled &&
      (typeof g._final == "function" && !b.destroyed
        ? (b.pendingcb++, (b.finalCalled = !0), Z.nextTick(ve, g, b))
        : ((b.prefinished = !0), g.emit("prefinish")));
  }
  function T(g, b) {
    var C = ae(b);
    if (C && (de(g, b), b.pendingcb === 0 && ((b.finished = !0), g.emit("finish"), b.autoDestroy))) {
      var $ = g._readableState;
      (!$ || ($.autoDestroy && $.endEmitted)) && g.destroy();
    }
    return C;
  }
  function N(g, b, C) {
    (b.ending = !0),
      T(g, b),
      C && (b.finished ? Z.nextTick(C) : g.once("finish", C)),
      (b.ended = !0),
      (g.writable = !1);
  }
  function W(g, b, C) {
    var $ = g.entry;
    for (g.entry = null; $; ) {
      var H = $.callback;
      b.pendingcb--, H(C), ($ = $.next);
    }
    b.corkedRequestsFree.next = g;
  }
  return (
    Object.defineProperty(x.prototype, "destroyed", {
      enumerable: !1,
      get: function () {
        return this._writableState === void 0 ? !1 : this._writableState.destroyed;
      },
      set: function (b) {
        this._writableState && (this._writableState.destroyed = b);
      },
    }),
    (x.prototype.destroy = l.destroy),
    (x.prototype._undestroy = l.undestroy),
    (x.prototype._destroy = function (g, b) {
      b(g);
    }),
    tt
  );
}
var nt, Ln;
function Ie() {
  if (Ln) return nt;
  Ln = 1;
  var i =
    Object.keys ||
    function (O) {
      var L = [];
      for (var I in O) L.push(I);
      return L;
    };
  nt = S;
  var m = fi(),
    w = ai();
  Be()(S, m);
  for (var A = i(w.prototype), M = 0; M < A.length; M++) {
    var c = A[M];
    S.prototype[c] || (S.prototype[c] = w.prototype[c]);
  }
  function S(O) {
    if (!(this instanceof S)) return new S(O);
    m.call(this, O),
      w.call(this, O),
      (this.allowHalfOpen = !0),
      O &&
        (O.readable === !1 && (this.readable = !1),
        O.writable === !1 && (this.writable = !1),
        O.allowHalfOpen === !1 && ((this.allowHalfOpen = !1), this.once("end", u)));
  }
  Object.defineProperty(S.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    },
  }),
    Object.defineProperty(S.prototype, "writableBuffer", {
      enumerable: !1,
      get: function () {
        return this._writableState && this._writableState.getBuffer();
      },
    }),
    Object.defineProperty(S.prototype, "writableLength", {
      enumerable: !1,
      get: function () {
        return this._writableState.length;
      },
    });
  function u() {
    this._writableState.ended || Z.nextTick(l, this);
  }
  function l(O) {
    O.end();
  }
  return (
    Object.defineProperty(S.prototype, "destroyed", {
      enumerable: !1,
      get: function () {
        return this._readableState === void 0 || this._writableState === void 0
          ? !1
          : this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function (L) {
        this._readableState === void 0 ||
          this._writableState === void 0 ||
          ((this._readableState.destroyed = L), (this._writableState.destroyed = L));
      },
    }),
    nt
  );
}
var it = {},
  qe = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ var jn;
function eo() {
  return (
    jn ||
      ((jn = 1),
      (function (i, m) {
        var w = ke(),
          A = w.Buffer;
        function M(S, u) {
          for (var l in S) u[l] = S[l];
        }
        A.from && A.alloc && A.allocUnsafe && A.allocUnsafeSlow ? (i.exports = w) : (M(w, m), (m.Buffer = c));
        function c(S, u, l) {
          return A(S, u, l);
        }
        (c.prototype = Object.create(A.prototype)),
          M(A, c),
          (c.from = function (S, u, l) {
            if (typeof S == "number") throw new TypeError("Argument must not be a number");
            return A(S, u, l);
          }),
          (c.alloc = function (S, u, l) {
            if (typeof S != "number") throw new TypeError("Argument must be a number");
            var O = A(S);
            return u !== void 0 ? (typeof l == "string" ? O.fill(u, l) : O.fill(u)) : O.fill(0), O;
          }),
          (c.allocUnsafe = function (S) {
            if (typeof S != "number") throw new TypeError("Argument must be a number");
            return A(S);
          }),
          (c.allocUnsafeSlow = function (S) {
            if (typeof S != "number") throw new TypeError("Argument must be a number");
            return w.SlowBuffer(S);
          });
      })(qe, qe.exports)),
    qe.exports
  );
}
var Cn;
function Nn() {
  if (Cn) return it;
  Cn = 1;
  var i = eo().Buffer,
    m =
      i.isEncoding ||
      function (f) {
        switch (((f = "" + f), f && f.toLowerCase())) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
  function w(f) {
    if (!f) return "utf8";
    for (var h; ; )
      switch (f) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return f;
        default:
          if (h) return;
          (f = ("" + f).toLowerCase()), (h = !0);
      }
  }
  function A(f) {
    var h = w(f);
    if (typeof h != "string" && (i.isEncoding === m || !m(f))) throw new Error("Unknown encoding: " + f);
    return h || f;
  }
  it.StringDecoder = M;
  function M(f) {
    this.encoding = A(f);
    var h;
    switch (this.encoding) {
      case "utf16le":
        (this.text = I), (this.end = P), (h = 4);
        break;
      case "utf8":
        (this.fillLast = l), (h = 4);
        break;
      case "base64":
        (this.text = q), (this.end = G), (h = 3);
        break;
      default:
        (this.write = y), (this.end = B);
        return;
    }
    (this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = i.allocUnsafe(h));
  }
  (M.prototype.write = function (f) {
    if (f.length === 0) return "";
    var h, d;
    if (this.lastNeed) {
      if (((h = this.fillLast(f)), h === void 0)) return "";
      (d = this.lastNeed), (this.lastNeed = 0);
    } else d = 0;
    return d < f.length ? (h ? h + this.text(f, d) : this.text(f, d)) : h || "";
  }),
    (M.prototype.end = L),
    (M.prototype.text = O),
    (M.prototype.fillLast = function (f) {
      if (this.lastNeed <= f.length)
        return (
          f.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
          this.lastChar.toString(this.encoding, 0, this.lastTotal)
        );
      f.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, f.length), (this.lastNeed -= f.length);
    });
  function c(f) {
    return f <= 127 ? 0 : f >> 5 === 6 ? 2 : f >> 4 === 14 ? 3 : f >> 3 === 30 ? 4 : f >> 6 === 2 ? -1 : -2;
  }
  function S(f, h, d) {
    var s = h.length - 1;
    if (s < d) return 0;
    var p = c(h[s]);
    return p >= 0
      ? (p > 0 && (f.lastNeed = p - 1), p)
      : --s < d || p === -2
        ? 0
        : ((p = c(h[s])),
          p >= 0
            ? (p > 0 && (f.lastNeed = p - 2), p)
            : --s < d || p === -2
              ? 0
              : ((p = c(h[s])), p >= 0 ? (p > 0 && (p === 2 ? (p = 0) : (f.lastNeed = p - 3)), p) : 0));
  }
  function u(f, h, d) {
    if ((h[0] & 192) !== 128) return (f.lastNeed = 0), "�";
    if (f.lastNeed > 1 && h.length > 1) {
      if ((h[1] & 192) !== 128) return (f.lastNeed = 1), "�";
      if (f.lastNeed > 2 && h.length > 2 && (h[2] & 192) !== 128) return (f.lastNeed = 2), "�";
    }
  }
  function l(f) {
    var h = this.lastTotal - this.lastNeed,
      d = u(this, f);
    if (d !== void 0) return d;
    if (this.lastNeed <= f.length)
      return f.copy(this.lastChar, h, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    f.copy(this.lastChar, h, 0, f.length), (this.lastNeed -= f.length);
  }
  function O(f, h) {
    var d = S(this, f, h);
    if (!this.lastNeed) return f.toString("utf8", h);
    this.lastTotal = d;
    var s = f.length - (d - this.lastNeed);
    return f.copy(this.lastChar, 0, s), f.toString("utf8", h, s);
  }
  function L(f) {
    var h = f && f.length ? this.write(f) : "";
    return this.lastNeed ? h + "�" : h;
  }
  function I(f, h) {
    if ((f.length - h) % 2 === 0) {
      var d = f.toString("utf16le", h);
      if (d) {
        var s = d.charCodeAt(d.length - 1);
        if (s >= 55296 && s <= 56319)
          return (
            (this.lastNeed = 2),
            (this.lastTotal = 4),
            (this.lastChar[0] = f[f.length - 2]),
            (this.lastChar[1] = f[f.length - 1]),
            d.slice(0, -1)
          );
      }
      return d;
    }
    return (
      (this.lastNeed = 1),
      (this.lastTotal = 2),
      (this.lastChar[0] = f[f.length - 1]),
      f.toString("utf16le", h, f.length - 1)
    );
  }
  function P(f) {
    var h = f && f.length ? this.write(f) : "";
    if (this.lastNeed) {
      var d = this.lastTotal - this.lastNeed;
      return h + this.lastChar.toString("utf16le", 0, d);
    }
    return h;
  }
  function q(f, h) {
    var d = (f.length - h) % 3;
    return d === 0
      ? f.toString("base64", h)
      : ((this.lastNeed = 3 - d),
        (this.lastTotal = 3),
        d === 1
          ? (this.lastChar[0] = f[f.length - 1])
          : ((this.lastChar[0] = f[f.length - 2]), (this.lastChar[1] = f[f.length - 1])),
        f.toString("base64", h, f.length - d));
  }
  function G(f) {
    var h = f && f.length ? this.write(f) : "";
    return this.lastNeed ? h + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : h;
  }
  function y(f) {
    return f.toString(this.encoding);
  }
  function B(f) {
    return f && f.length ? this.write(f) : "";
  }
  return it;
}
var ot, Dn;
function wt() {
  if (Dn) return ot;
  Dn = 1;
  var i = xe().codes.ERR_STREAM_PREMATURE_CLOSE;
  function m(c) {
    var S = !1;
    return function () {
      if (!S) {
        S = !0;
        for (var u = arguments.length, l = new Array(u), O = 0; O < u; O++) l[O] = arguments[O];
        c.apply(this, l);
      }
    };
  }
  function w() {}
  function A(c) {
    return c.setHeader && typeof c.abort == "function";
  }
  function M(c, S, u) {
    if (typeof S == "function") return M(c, null, S);
    S || (S = {}), (u = m(u || w));
    var l = S.readable || (S.readable !== !1 && c.readable),
      O = S.writable || (S.writable !== !1 && c.writable),
      L = function () {
        c.writable || P();
      },
      I = c._writableState && c._writableState.finished,
      P = function () {
        (O = !1), (I = !0), l || u.call(c);
      },
      q = c._readableState && c._readableState.endEmitted,
      G = function () {
        (l = !1), (q = !0), O || u.call(c);
      },
      y = function (d) {
        u.call(c, d);
      },
      B = function () {
        var d;
        if (l && !q) return (!c._readableState || !c._readableState.ended) && (d = new i()), u.call(c, d);
        if (O && !I) return (!c._writableState || !c._writableState.ended) && (d = new i()), u.call(c, d);
      },
      f = function () {
        c.req.on("finish", P);
      };
    return (
      A(c)
        ? (c.on("complete", P), c.on("abort", B), c.req ? f() : c.on("request", f))
        : O && !c._writableState && (c.on("end", L), c.on("close", L)),
      c.on("end", G),
      c.on("finish", P),
      S.error !== !1 && c.on("error", y),
      c.on("close", B),
      function () {
        c.removeListener("complete", P),
          c.removeListener("abort", B),
          c.removeListener("request", f),
          c.req && c.req.removeListener("finish", P),
          c.removeListener("end", L),
          c.removeListener("close", L),
          c.removeListener("finish", P),
          c.removeListener("end", G),
          c.removeListener("error", y),
          c.removeListener("close", B);
      }
    );
  }
  return (ot = M), ot;
}
var at, Un;
function ro() {
  if (Un) return at;
  Un = 1;
  var i;
  function m(d, s, p) {
    return (
      (s = w(s)),
      s in d ? Object.defineProperty(d, s, { value: p, enumerable: !0, configurable: !0, writable: !0 }) : (d[s] = p),
      d
    );
  }
  function w(d) {
    var s = A(d, "string");
    return typeof s == "symbol" ? s : String(s);
  }
  function A(d, s) {
    if (typeof d != "object" || d === null) return d;
    var p = d[Symbol.toPrimitive];
    if (p !== void 0) {
      var _ = p.call(d, s);
      if (typeof _ != "object") return _;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (s === "string" ? String : Number)(d);
  }
  var M = wt(),
    c = Symbol("lastResolve"),
    S = Symbol("lastReject"),
    u = Symbol("error"),
    l = Symbol("ended"),
    O = Symbol("lastPromise"),
    L = Symbol("handlePromise"),
    I = Symbol("stream");
  function P(d, s) {
    return { value: d, done: s };
  }
  function q(d) {
    var s = d[c];
    if (s !== null) {
      var p = d[I].read();
      p !== null && ((d[O] = null), (d[c] = null), (d[S] = null), s(P(p, !1)));
    }
  }
  function G(d) {
    Z.nextTick(q, d);
  }
  function y(d, s) {
    return function (p, _) {
      d.then(function () {
        if (s[l]) {
          p(P(void 0, !0));
          return;
        }
        s[L](p, _);
      }, _);
    };
  }
  var B = Object.getPrototypeOf(function () {}),
    f = Object.setPrototypeOf(
      ((i = {
        get stream() {
          return this[I];
        },
        next: function () {
          var s = this,
            p = this[u];
          if (p !== null) return Promise.reject(p);
          if (this[l]) return Promise.resolve(P(void 0, !0));
          if (this[I].destroyed)
            return new Promise(function (k, V) {
              Z.nextTick(function () {
                s[u] ? V(s[u]) : k(P(void 0, !0));
              });
            });
          var _ = this[O],
            R;
          if (_) R = new Promise(y(_, this));
          else {
            var x = this[I].read();
            if (x !== null) return Promise.resolve(P(x, !1));
            R = new Promise(this[L]);
          }
          return (this[O] = R), R;
        },
      }),
      m(i, Symbol.asyncIterator, function () {
        return this;
      }),
      m(i, "return", function () {
        var s = this;
        return new Promise(function (p, _) {
          s[I].destroy(null, function (R) {
            if (R) {
              _(R);
              return;
            }
            p(P(void 0, !0));
          });
        });
      }),
      i),
      B,
    ),
    h = function (s) {
      var p,
        _ = Object.create(
          f,
          ((p = {}),
          m(p, I, { value: s, writable: !0 }),
          m(p, c, { value: null, writable: !0 }),
          m(p, S, { value: null, writable: !0 }),
          m(p, u, { value: null, writable: !0 }),
          m(p, l, { value: s._readableState.endEmitted, writable: !0 }),
          m(p, L, {
            value: function (x, k) {
              var V = _[I].read();
              V ? ((_[O] = null), (_[c] = null), (_[S] = null), x(P(V, !1))) : ((_[c] = x), (_[S] = k));
            },
            writable: !0,
          }),
          p),
        );
      return (
        (_[O] = null),
        M(s, function (R) {
          if (R && R.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var x = _[S];
            x !== null && ((_[O] = null), (_[c] = null), (_[S] = null), x(R)), (_[u] = R);
            return;
          }
          var k = _[c];
          k !== null && ((_[O] = null), (_[c] = null), (_[S] = null), k(P(void 0, !0))), (_[l] = !0);
        }),
        s.on("readable", G.bind(null, _)),
        _
      );
    };
  return (at = h), at;
}
var ft, qn;
function to() {
  return (
    qn ||
      ((qn = 1),
      (ft = function () {
        throw new Error("Readable.from is not available in the browser");
      })),
    ft
  );
}
var ut, kn;
function fi() {
  if (kn) return ut;
  (kn = 1), (ut = k);
  var i;
  (k.ReadableState = x), pt().EventEmitter;
  var m = function (o, j) {
      return o.listeners(j).length;
    },
    w = Yn(),
    A = ke().Buffer,
    M =
      (typeof Re < "u" ? Re : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array ||
      function () {};
  function c(n) {
    return A.from(n);
  }
  function S(n) {
    return A.isBuffer(n) || n instanceof M;
  }
  var u = bt(),
    l;
  u && u.debuglog ? (l = u.debuglog("stream")) : (l = function () {});
  var O = Zi(),
    L = ii(),
    I = oi(),
    P = I.getHighWaterMark,
    q = xe().codes,
    G = q.ERR_INVALID_ARG_TYPE,
    y = q.ERR_STREAM_PUSH_AFTER_EOF,
    B = q.ERR_METHOD_NOT_IMPLEMENTED,
    f = q.ERR_STREAM_UNSHIFT_AFTER_END_EVENT,
    h,
    d,
    s;
  Be()(k, w);
  var p = L.errorOrDestroy,
    _ = ["error", "close", "destroy", "pause", "resume"];
  function R(n, o, j) {
    if (typeof n.prependListener == "function") return n.prependListener(o, j);
    !n._events || !n._events[o]
      ? n.on(o, j)
      : Array.isArray(n._events[o])
        ? n._events[o].unshift(j)
        : (n._events[o] = [j, n._events[o]]);
  }
  function x(n, o, j) {
    (i = i || Ie()),
      (n = n || {}),
      typeof j != "boolean" && (j = o instanceof i),
      (this.objectMode = !!n.objectMode),
      j && (this.objectMode = this.objectMode || !!n.readableObjectMode),
      (this.highWaterMark = P(this, n, "readableHighWaterMark", j)),
      (this.buffer = new O()),
      (this.length = 0),
      (this.pipes = null),
      (this.pipesCount = 0),
      (this.flowing = null),
      (this.ended = !1),
      (this.endEmitted = !1),
      (this.reading = !1),
      (this.sync = !0),
      (this.needReadable = !1),
      (this.emittedReadable = !1),
      (this.readableListening = !1),
      (this.resumeScheduled = !1),
      (this.paused = !0),
      (this.emitClose = n.emitClose !== !1),
      (this.autoDestroy = !!n.autoDestroy),
      (this.destroyed = !1),
      (this.defaultEncoding = n.defaultEncoding || "utf8"),
      (this.awaitDrain = 0),
      (this.readingMore = !1),
      (this.decoder = null),
      (this.encoding = null),
      n.encoding && (h || (h = Nn().StringDecoder), (this.decoder = new h(n.encoding)), (this.encoding = n.encoding));
  }
  function k(n) {
    if (((i = i || Ie()), !(this instanceof k))) return new k(n);
    var o = this instanceof i;
    (this._readableState = new x(n, this, o)),
      (this.readable = !0),
      n &&
        (typeof n.read == "function" && (this._read = n.read),
        typeof n.destroy == "function" && (this._destroy = n.destroy)),
      w.call(this);
  }
  Object.defineProperty(k.prototype, "destroyed", {
    enumerable: !1,
    get: function () {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function (o) {
      this._readableState && (this._readableState.destroyed = o);
    },
  }),
    (k.prototype.destroy = L.destroy),
    (k.prototype._undestroy = L.undestroy),
    (k.prototype._destroy = function (n, o) {
      o(n);
    }),
    (k.prototype.push = function (n, o) {
      var j = this._readableState,
        z;
      return (
        j.objectMode
          ? (z = !0)
          : typeof n == "string" &&
            ((o = o || j.defaultEncoding), o !== j.encoding && ((n = A.from(n, o)), (o = "")), (z = !0)),
        V(this, n, o, !1, z)
      );
    }),
    (k.prototype.unshift = function (n) {
      return V(this, n, null, !0, !1);
    });
  function V(n, o, j, z, K) {
    l("readableAddChunk", o);
    var Y = n._readableState;
    if (o === null) (Y.reading = !1), ue(n, Y);
    else {
      var ee;
      if ((K || (ee = E(Y, o)), ee)) p(n, ee);
      else if (Y.objectMode || (o && o.length > 0))
        if ((typeof o != "string" && !Y.objectMode && Object.getPrototypeOf(o) !== A.prototype && (o = c(o)), z))
          Y.endEmitted ? p(n, new f()) : J(n, Y, o, !0);
        else if (Y.ended) p(n, new y());
        else {
          if (Y.destroyed) return !1;
          (Y.reading = !1),
            Y.decoder && !j
              ? ((o = Y.decoder.write(o)), Y.objectMode || o.length !== 0 ? J(n, Y, o, !1) : pe(n, Y))
              : J(n, Y, o, !1);
        }
      else z || ((Y.reading = !1), pe(n, Y));
    }
    return !Y.ended && (Y.length < Y.highWaterMark || Y.length === 0);
  }
  function J(n, o, j, z) {
    o.flowing && o.length === 0 && !o.sync
      ? ((o.awaitDrain = 0), n.emit("data", j))
      : ((o.length += o.objectMode ? 1 : j.length),
        z ? o.buffer.unshift(j) : o.buffer.push(j),
        o.needReadable && he(n)),
      pe(n, o);
  }
  function E(n, o) {
    var j;
    return (
      !S(o) &&
        typeof o != "string" &&
        o !== void 0 &&
        !n.objectMode &&
        (j = new G("chunk", ["string", "Buffer", "Uint8Array"], o)),
      j
    );
  }
  (k.prototype.isPaused = function () {
    return this._readableState.flowing === !1;
  }),
    (k.prototype.setEncoding = function (n) {
      h || (h = Nn().StringDecoder);
      var o = new h(n);
      (this._readableState.decoder = o), (this._readableState.encoding = this._readableState.decoder.encoding);
      for (var j = this._readableState.buffer.head, z = ""; j !== null; ) (z += o.write(j.data)), (j = j.next);
      return (
        this._readableState.buffer.clear(),
        z !== "" && this._readableState.buffer.push(z),
        (this._readableState.length = z.length),
        this
      );
    });
  var Q = 1073741824;
  function re(n) {
    return (
      n >= Q ? (n = Q) : (n--, (n |= n >>> 1), (n |= n >>> 2), (n |= n >>> 4), (n |= n >>> 8), (n |= n >>> 16), n++), n
    );
  }
  function ie(n, o) {
    return n <= 0 || (o.length === 0 && o.ended)
      ? 0
      : o.objectMode
        ? 1
        : n !== n
          ? o.flowing && o.length
            ? o.buffer.head.data.length
            : o.length
          : (n > o.highWaterMark && (o.highWaterMark = re(n)),
            n <= o.length ? n : o.ended ? o.length : ((o.needReadable = !0), 0));
  }
  k.prototype.read = function (n) {
    l("read", n), (n = parseInt(n, 10));
    var o = this._readableState,
      j = n;
    if (
      (n !== 0 && (o.emittedReadable = !1),
      n === 0 && o.needReadable && ((o.highWaterMark !== 0 ? o.length >= o.highWaterMark : o.length > 0) || o.ended))
    )
      return l("read: emitReadable", o.length, o.ended), o.length === 0 && o.ended ? C(this) : he(this), null;
    if (((n = ie(n, o)), n === 0 && o.ended)) return o.length === 0 && C(this), null;
    var z = o.needReadable;
    l("need readable", z),
      (o.length === 0 || o.length - n < o.highWaterMark) && ((z = !0), l("length less than watermark", z)),
      o.ended || o.reading
        ? ((z = !1), l("reading or ended", z))
        : z &&
          (l("do read"),
          (o.reading = !0),
          (o.sync = !0),
          o.length === 0 && (o.needReadable = !0),
          this._read(o.highWaterMark),
          (o.sync = !1),
          o.reading || (n = ie(j, o)));
    var K;
    return (
      n > 0 ? (K = b(n, o)) : (K = null),
      K === null ? ((o.needReadable = o.length <= o.highWaterMark), (n = 0)) : ((o.length -= n), (o.awaitDrain = 0)),
      o.length === 0 && (o.ended || (o.needReadable = !0), j !== n && o.ended && C(this)),
      K !== null && this.emit("data", K),
      K
    );
  };
  function ue(n, o) {
    if ((l("onEofChunk"), !o.ended)) {
      if (o.decoder) {
        var j = o.decoder.end();
        j && j.length && (o.buffer.push(j), (o.length += o.objectMode ? 1 : j.length));
      }
      (o.ended = !0), o.sync ? he(n) : ((o.needReadable = !1), o.emittedReadable || ((o.emittedReadable = !0), ce(n)));
    }
  }
  function he(n) {
    var o = n._readableState;
    l("emitReadable", o.needReadable, o.emittedReadable),
      (o.needReadable = !1),
      o.emittedReadable || (l("emitReadable", o.flowing), (o.emittedReadable = !0), Z.nextTick(ce, n));
  }
  function ce(n) {
    var o = n._readableState;
    l("emitReadable_", o.destroyed, o.length, o.ended),
      !o.destroyed && (o.length || o.ended) && (n.emit("readable"), (o.emittedReadable = !1)),
      (o.needReadable = !o.flowing && !o.ended && o.length <= o.highWaterMark),
      g(n);
  }
  function pe(n, o) {
    o.readingMore || ((o.readingMore = !0), Z.nextTick(ae, n, o));
  }
  function ae(n, o) {
    for (; !o.reading && !o.ended && (o.length < o.highWaterMark || (o.flowing && o.length === 0)); ) {
      var j = o.length;
      if ((l("maybeReadMore read 0"), n.read(0), j === o.length)) break;
    }
    o.readingMore = !1;
  }
  (k.prototype._read = function (n) {
    p(this, new B("_read()"));
  }),
    (k.prototype.pipe = function (n, o) {
      var j = this,
        z = this._readableState;
      switch (z.pipesCount) {
        case 0:
          z.pipes = n;
          break;
        case 1:
          z.pipes = [z.pipes, n];
          break;
        default:
          z.pipes.push(n);
          break;
      }
      (z.pipesCount += 1), l("pipe count=%d opts=%j", z.pipesCount, o);
      var K = (!o || o.end !== !1) && n !== Z.stdout && n !== Z.stderr,
        Y = K ? ye : Se;
      z.endEmitted ? Z.nextTick(Y) : j.once("end", Y), n.on("unpipe", ee);
      function ee(Ee, _e) {
        l("onunpipe"), Ee === j && _e && _e.hasUnpiped === !1 && ((_e.hasUnpiped = !0), ge());
      }
      function ye() {
        l("onend"), n.end();
      }
      var D = ve(j);
      n.on("drain", D);
      var be = !1;
      function ge() {
        l("cleanup"),
          n.removeListener("close", we),
          n.removeListener("finish", Te),
          n.removeListener("drain", D),
          n.removeListener("error", fe),
          n.removeListener("unpipe", ee),
          j.removeListener("end", ye),
          j.removeListener("end", Se),
          j.removeListener("data", ne),
          (be = !0),
          z.awaitDrain && (!n._writableState || n._writableState.needDrain) && D();
      }
      j.on("data", ne);
      function ne(Ee) {
        l("ondata");
        var _e = n.write(Ee);
        l("dest.write", _e),
          _e === !1 &&
            (((z.pipesCount === 1 && z.pipes === n) || (z.pipesCount > 1 && H(z.pipes, n) !== -1)) &&
              !be &&
              (l("false write response, pause", z.awaitDrain), z.awaitDrain++),
            j.pause());
      }
      function fe(Ee) {
        l("onerror", Ee), Se(), n.removeListener("error", fe), m(n, "error") === 0 && p(n, Ee);
      }
      R(n, "error", fe);
      function we() {
        n.removeListener("finish", Te), Se();
      }
      n.once("close", we);
      function Te() {
        l("onfinish"), n.removeListener("close", we), Se();
      }
      n.once("finish", Te);
      function Se() {
        l("unpipe"), j.unpipe(n);
      }
      return n.emit("pipe", j), z.flowing || (l("pipe resume"), j.resume()), n;
    });
  function ve(n) {
    return function () {
      var j = n._readableState;
      l("pipeOnDrain", j.awaitDrain),
        j.awaitDrain && j.awaitDrain--,
        j.awaitDrain === 0 && m(n, "data") && ((j.flowing = !0), g(n));
    };
  }
  (k.prototype.unpipe = function (n) {
    var o = this._readableState,
      j = { hasUnpiped: !1 };
    if (o.pipesCount === 0) return this;
    if (o.pipesCount === 1)
      return n && n !== o.pipes
        ? this
        : (n || (n = o.pipes),
          (o.pipes = null),
          (o.pipesCount = 0),
          (o.flowing = !1),
          n && n.emit("unpipe", this, j),
          this);
    if (!n) {
      var z = o.pipes,
        K = o.pipesCount;
      (o.pipes = null), (o.pipesCount = 0), (o.flowing = !1);
      for (var Y = 0; Y < K; Y++) z[Y].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var ee = H(o.pipes, n);
    return ee === -1
      ? this
      : (o.pipes.splice(ee, 1),
        (o.pipesCount -= 1),
        o.pipesCount === 1 && (o.pipes = o.pipes[0]),
        n.emit("unpipe", this, j),
        this);
  }),
    (k.prototype.on = function (n, o) {
      var j = w.prototype.on.call(this, n, o),
        z = this._readableState;
      return (
        n === "data"
          ? ((z.readableListening = this.listenerCount("readable") > 0), z.flowing !== !1 && this.resume())
          : n === "readable" &&
            !z.endEmitted &&
            !z.readableListening &&
            ((z.readableListening = z.needReadable = !0),
            (z.flowing = !1),
            (z.emittedReadable = !1),
            l("on readable", z.length, z.reading),
            z.length ? he(this) : z.reading || Z.nextTick(T, this)),
        j
      );
    }),
    (k.prototype.addListener = k.prototype.on),
    (k.prototype.removeListener = function (n, o) {
      var j = w.prototype.removeListener.call(this, n, o);
      return n === "readable" && Z.nextTick(de, this), j;
    }),
    (k.prototype.removeAllListeners = function (n) {
      var o = w.prototype.removeAllListeners.apply(this, arguments);
      return (n === "readable" || n === void 0) && Z.nextTick(de, this), o;
    });
  function de(n) {
    var o = n._readableState;
    (o.readableListening = n.listenerCount("readable") > 0),
      o.resumeScheduled && !o.paused ? (o.flowing = !0) : n.listenerCount("data") > 0 && n.resume();
  }
  function T(n) {
    l("readable nexttick read 0"), n.read(0);
  }
  k.prototype.resume = function () {
    var n = this._readableState;
    return n.flowing || (l("resume"), (n.flowing = !n.readableListening), N(this, n)), (n.paused = !1), this;
  };
  function N(n, o) {
    o.resumeScheduled || ((o.resumeScheduled = !0), Z.nextTick(W, n, o));
  }
  function W(n, o) {
    l("resume", o.reading),
      o.reading || n.read(0),
      (o.resumeScheduled = !1),
      n.emit("resume"),
      g(n),
      o.flowing && !o.reading && n.read(0);
  }
  k.prototype.pause = function () {
    return (
      l("call pause flowing=%j", this._readableState.flowing),
      this._readableState.flowing !== !1 && (l("pause"), (this._readableState.flowing = !1), this.emit("pause")),
      (this._readableState.paused = !0),
      this
    );
  };
  function g(n) {
    var o = n._readableState;
    for (l("flow", o.flowing); o.flowing && n.read() !== null; );
  }
  (k.prototype.wrap = function (n) {
    var o = this,
      j = this._readableState,
      z = !1;
    n.on("end", function () {
      if ((l("wrapped end"), j.decoder && !j.ended)) {
        var ee = j.decoder.end();
        ee && ee.length && o.push(ee);
      }
      o.push(null);
    }),
      n.on("data", function (ee) {
        if (
          (l("wrapped data"),
          j.decoder && (ee = j.decoder.write(ee)),
          !(j.objectMode && ee == null) && !(!j.objectMode && (!ee || !ee.length)))
        ) {
          var ye = o.push(ee);
          ye || ((z = !0), n.pause());
        }
      });
    for (var K in n)
      this[K] === void 0 &&
        typeof n[K] == "function" &&
        (this[K] = (function (ye) {
          return function () {
            return n[ye].apply(n, arguments);
          };
        })(K));
    for (var Y = 0; Y < _.length; Y++) n.on(_[Y], this.emit.bind(this, _[Y]));
    return (
      (this._read = function (ee) {
        l("wrapped _read", ee), z && ((z = !1), n.resume());
      }),
      this
    );
  }),
    typeof Symbol == "function" &&
      (k.prototype[Symbol.asyncIterator] = function () {
        return d === void 0 && (d = ro()), d(this);
      }),
    Object.defineProperty(k.prototype, "readableHighWaterMark", {
      enumerable: !1,
      get: function () {
        return this._readableState.highWaterMark;
      },
    }),
    Object.defineProperty(k.prototype, "readableBuffer", {
      enumerable: !1,
      get: function () {
        return this._readableState && this._readableState.buffer;
      },
    }),
    Object.defineProperty(k.prototype, "readableFlowing", {
      enumerable: !1,
      get: function () {
        return this._readableState.flowing;
      },
      set: function (o) {
        this._readableState && (this._readableState.flowing = o);
      },
    }),
    (k._fromList = b),
    Object.defineProperty(k.prototype, "readableLength", {
      enumerable: !1,
      get: function () {
        return this._readableState.length;
      },
    });
  function b(n, o) {
    if (o.length === 0) return null;
    var j;
    return (
      o.objectMode
        ? (j = o.buffer.shift())
        : !n || n >= o.length
          ? (o.decoder
              ? (j = o.buffer.join(""))
              : o.buffer.length === 1
                ? (j = o.buffer.first())
                : (j = o.buffer.concat(o.length)),
            o.buffer.clear())
          : (j = o.buffer.consume(n, o.decoder)),
      j
    );
  }
  function C(n) {
    var o = n._readableState;
    l("endReadable", o.endEmitted), o.endEmitted || ((o.ended = !0), Z.nextTick($, o, n));
  }
  function $(n, o) {
    if (
      (l("endReadableNT", n.endEmitted, n.length),
      !n.endEmitted && n.length === 0 && ((n.endEmitted = !0), (o.readable = !1), o.emit("end"), n.autoDestroy))
    ) {
      var j = o._writableState;
      (!j || (j.autoDestroy && j.finished)) && o.destroy();
    }
  }
  typeof Symbol == "function" &&
    (k.from = function (n, o) {
      return s === void 0 && (s = to()), s(k, n, o);
    });
  function H(n, o) {
    for (var j = 0, z = n.length; j < z; j++) if (n[j] === o) return j;
    return -1;
  }
  return ut;
}
var st, Wn;
function ui() {
  if (Wn) return st;
  (Wn = 1), (st = u);
  var i = xe().codes,
    m = i.ERR_METHOD_NOT_IMPLEMENTED,
    w = i.ERR_MULTIPLE_CALLBACK,
    A = i.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    M = i.ERR_TRANSFORM_WITH_LENGTH_0,
    c = Ie();
  Be()(u, c);
  function S(L, I) {
    var P = this._transformState;
    P.transforming = !1;
    var q = P.writecb;
    if (q === null) return this.emit("error", new w());
    (P.writechunk = null), (P.writecb = null), I != null && this.push(I), q(L);
    var G = this._readableState;
    (G.reading = !1), (G.needReadable || G.length < G.highWaterMark) && this._read(G.highWaterMark);
  }
  function u(L) {
    if (!(this instanceof u)) return new u(L);
    c.call(this, L),
      (this._transformState = {
        afterTransform: S.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null,
      }),
      (this._readableState.needReadable = !0),
      (this._readableState.sync = !1),
      L &&
        (typeof L.transform == "function" && (this._transform = L.transform),
        typeof L.flush == "function" && (this._flush = L.flush)),
      this.on("prefinish", l);
  }
  function l() {
    var L = this;
    typeof this._flush == "function" && !this._readableState.destroyed
      ? this._flush(function (I, P) {
          O(L, I, P);
        })
      : O(this, null, null);
  }
  (u.prototype.push = function (L, I) {
    return (this._transformState.needTransform = !1), c.prototype.push.call(this, L, I);
  }),
    (u.prototype._transform = function (L, I, P) {
      P(new m("_transform()"));
    }),
    (u.prototype._write = function (L, I, P) {
      var q = this._transformState;
      if (((q.writecb = P), (q.writechunk = L), (q.writeencoding = I), !q.transforming)) {
        var G = this._readableState;
        (q.needTransform || G.needReadable || G.length < G.highWaterMark) && this._read(G.highWaterMark);
      }
    }),
    (u.prototype._read = function (L) {
      var I = this._transformState;
      I.writechunk !== null && !I.transforming
        ? ((I.transforming = !0), this._transform(I.writechunk, I.writeencoding, I.afterTransform))
        : (I.needTransform = !0);
    }),
    (u.prototype._destroy = function (L, I) {
      c.prototype._destroy.call(this, L, function (P) {
        I(P);
      });
    });
  function O(L, I, P) {
    if (I) return L.emit("error", I);
    if ((P != null && L.push(P), L._writableState.length)) throw new M();
    if (L._transformState.transforming) throw new A();
    return L.push(null);
  }
  return st;
}
var lt, $n;
function no() {
  if ($n) return lt;
  ($n = 1), (lt = m);
  var i = ui();
  Be()(m, i);
  function m(w) {
    if (!(this instanceof m)) return new m(w);
    i.call(this, w);
  }
  return (
    (m.prototype._transform = function (w, A, M) {
      M(null, w);
    }),
    lt
  );
}
var ct, Gn;
function io() {
  if (Gn) return ct;
  Gn = 1;
  var i;
  function m(P) {
    var q = !1;
    return function () {
      q || ((q = !0), P.apply(void 0, arguments));
    };
  }
  var w = xe().codes,
    A = w.ERR_MISSING_ARGS,
    M = w.ERR_STREAM_DESTROYED;
  function c(P) {
    if (P) throw P;
  }
  function S(P) {
    return P.setHeader && typeof P.abort == "function";
  }
  function u(P, q, G, y) {
    y = m(y);
    var B = !1;
    P.on("close", function () {
      B = !0;
    }),
      i === void 0 && (i = wt()),
      i(P, { readable: q, writable: G }, function (h) {
        if (h) return y(h);
        (B = !0), y();
      });
    var f = !1;
    return function (h) {
      if (!B && !f) {
        if (((f = !0), S(P))) return P.abort();
        if (typeof P.destroy == "function") return P.destroy();
        y(h || new M("pipe"));
      }
    };
  }
  function l(P) {
    P();
  }
  function O(P, q) {
    return P.pipe(q);
  }
  function L(P) {
    return !P.length || typeof P[P.length - 1] != "function" ? c : P.pop();
  }
  function I() {
    for (var P = arguments.length, q = new Array(P), G = 0; G < P; G++) q[G] = arguments[G];
    var y = L(q);
    if ((Array.isArray(q[0]) && (q = q[0]), q.length < 2)) throw new A("streams");
    var B,
      f = q.map(function (h, d) {
        var s = d < q.length - 1,
          p = d > 0;
        return u(h, s, p, function (_) {
          B || (B = _), _ && f.forEach(l), !s && (f.forEach(l), y(B));
        });
      });
    return q.reduce(O);
  }
  return (ct = I), ct;
}
var ht, Hn;
function oo() {
  if (Hn) return ht;
  (Hn = 1), (ht = w);
  var i = pt().EventEmitter,
    m = Be();
  m(w, i),
    (w.Readable = fi()),
    (w.Writable = ai()),
    (w.Duplex = Ie()),
    (w.Transform = ui()),
    (w.PassThrough = no()),
    (w.finished = wt()),
    (w.pipeline = io()),
    (w.Stream = w);
  function w() {
    i.call(this);
  }
  return (
    (w.prototype.pipe = function (A, M) {
      var c = this;
      function S(q) {
        A.writable && A.write(q) === !1 && c.pause && c.pause();
      }
      c.on("data", S);
      function u() {
        c.readable && c.resume && c.resume();
      }
      A.on("drain", u), !A._isStdio && (!M || M.end !== !1) && (c.on("end", O), c.on("close", L));
      var l = !1;
      function O() {
        l || ((l = !0), A.end());
      }
      function L() {
        l || ((l = !0), typeof A.destroy == "function" && A.destroy());
      }
      function I(q) {
        if ((P(), i.listenerCount(this, "error") === 0)) throw q;
      }
      c.on("error", I), A.on("error", I);
      function P() {
        c.removeListener("data", S),
          A.removeListener("drain", u),
          c.removeListener("end", O),
          c.removeListener("close", L),
          c.removeListener("error", I),
          A.removeListener("error", I),
          c.removeListener("end", P),
          c.removeListener("close", P),
          A.removeListener("close", P);
      }
      return c.on("end", P), c.on("close", P), A.on("close", P), A.emit("pipe", c), A;
    }),
    ht
  );
}
const Vn = gi(vi);
var zn;
function ao() {
  return (
    zn ||
      ((zn = 1),
      (function (i) {
        var m = oo(),
          w = bt(),
          A = Vn,
          M = Vn,
          c = w.debuglog("net"),
          S = {
            protocol: window.location.protocol == "https:" ? "wss" : "ws",
            hostname: window.location.hostname,
            port: window.location.port,
            path: "/api/vm/net",
          };
        function u() {
          return S;
        }
        function l() {
          var y = u().hostname;
          return u().port && (y += ":" + u().port), y;
        }
        function O() {
          return u().protocol + "://" + l();
        }
        (i.setProxy = function (y) {
          (y = y || {}),
            y.protocol && (S.protocol = y.protocol),
            y.hostname && (S.hostname = y.hostname),
            y.port && (S.port = y.port),
            y.path && (S.path = y.path);
        }),
          (i.createServer = function () {
            throw new Error("Cannot create server in a browser");
          }),
          (i.connect = i.createConnection =
            function () {
              var y = P(arguments);
              c("createConnection", y);
              var B = new q(y[0]);
              return q.prototype.connect.apply(B, y);
            });
        function L(y) {
          return (y = Number(y)) >= 0 ? y : !1;
        }
        function I(y) {
          return w.isString(y) && L(y) === !1;
        }
        function P(y) {
          var B = {};
          w.isObject(y[0])
            ? (B = y[0])
            : I(y[0])
              ? (B.path = y[0])
              : ((B.port = y[0]), w.isString(y[1]) && (B.host = y[1]));
          var f = y[y.length - 1];
          return w.isFunction(f) ? [B, f] : [B];
        }
        i._normalizeConnectArgs = P;
        function q(y) {
          if (!(this instanceof q)) return new q(y);
          (this._connecting = !1),
            (this._host = null),
            w.isNumber(y) ? (y = { fd: y }) : w.isUndefined(y) && (y = {}),
            m.Duplex.call(this, y),
            (this.readable = this.writable = !1),
            (this._writableState.decodeStrings = !1),
            (this.allowHalfOpen = (y && y.allowHalfOpen) || !1);
        }
        w.inherits(q, m.Duplex),
          (i.Socket = q),
          (i.Stream = q),
          (q.prototype.listen = function () {
            throw new Error("Cannot listen in a browser");
          }),
          (q.prototype.setTimeout = function (y, B) {
            y > 0 && isFinite(y)
              ? (A.enroll(this, y), B && this.once("timeout", B))
              : y === 0 && (A.unenroll(this), B && this.removeListener("timeout", B));
          }),
          (q.prototype._onTimeout = function () {
            c("_onTimeout"), this.emit("timeout");
          }),
          (q.prototype.setNoDelay = function (y) {}),
          (q.prototype.setKeepAlive = function (y, B) {}),
          (q.prototype.address = function () {
            return { address: this.remoteAddress, port: this.remotePort, family: this.remoteFamily };
          }),
          Object.defineProperty(q.prototype, "readyState", {
            get: function () {
              return this._connecting
                ? "opening"
                : this.readable && this.writable
                  ? "open"
                  : this.readable && !this.writable
                    ? "readOnly"
                    : !this.readable && this.writable
                      ? "writeOnly"
                      : "closed";
            },
          }),
          (q.prototype.bufferSize = void 0),
          (q.prototype._read = function () {}),
          (q.prototype.end = function (y, B) {
            m.Duplex.prototype.end.call(this, y, B),
              (this.writable = !1),
              this._ws && this._ws.close(),
              this.readable && !this._readableState.endEmitted ? this.read(0) : G(this);
          });
        function G(y) {
          !y.readable && !y.writable && !y.destroyed && !y._connecting && !y._writableState.length && y.destroy();
        }
        (q.prototype.destroySoon = function () {
          this.writable && this.end(),
            this._writableState.finished ? this.destroy() : this.once("finish", this.destroy);
        }),
          (q.prototype.destroy = function (y) {
            c("destroy", y),
              !this.destroyed &&
                ((this._connecting = !1),
                (this.readable = this.writable = !1),
                A.unenroll(this),
                c("close"),
                (this.destroyed = !0));
          }),
          (q.prototype.remoteAddress = null),
          (q.prototype.remoteFamily = null),
          (q.prototype.remotePort = null),
          (q.prototype.localAddress = null),
          (q.prototype.localPort = null),
          (q.prototype.bytesRead = 0),
          (q.prototype.bytesWritten = 0),
          (q.prototype._write = function (y, B, f) {
            var h = this;
            if (((f = f || function () {}), this._connecting)) {
              (this._pendingData = y),
                (this._pendingEncoding = B),
                this.once("connect", function () {
                  this._write(y, B, f);
                });
              return;
            }
            (this._pendingData = null),
              (this._pendingEncoding = ""),
              B == "binary" && typeof y == "string" && (y = new ze(y, B)),
              this._ws.send(y),
              Z.nextTick(function () {
                (h.bytesWritten += y.length), f();
              });
          }),
          (q.prototype.write = function (y, B, f) {
            if (!w.isString(y) && !w.isBuffer(y)) throw new TypeError("invalid data");
            return m.Duplex.prototype.write.apply(this, arguments);
          }),
          (q.prototype.connect = function (y, B) {
            var f = this;
            if (!w.isObject(y)) {
              var h = P(arguments);
              return q.prototype.connect.apply(this, h);
            }
            if (
              ((B = B || function () {}), this.write !== q.prototype.write && (this.write = q.prototype.write), y.path)
            )
              throw new Error("options.path not supported in the browser");
            (f._connecting = !0), (f.writable = !0), (f._host = y.host);
            var d = M.request(
              { hostname: u().hostname, port: u().port, path: u().path + "/connect", method: "POST" },
              function (s) {
                var p = "";
                s.on("data", function (_) {
                  p += _;
                }),
                  s.on("end", function () {
                    var _ = null;
                    try {
                      _ = JSON.parse(p);
                    } catch {
                      _ = { code: s.statusCode, error: p };
                    }
                    if (_.error) {
                      f.emit("error", "Cannot open TCP connection [" + s.statusCode + "]: " + _.error), f.destroy();
                      return;
                    }
                    (f.remoteAddress = _.remote.address),
                      (f.remoteFamily = _.remote.family),
                      (f.remotePort = _.remote.port),
                      f._connectWebSocket(_.token, function (R) {
                        if (R) {
                          B(R);
                          return;
                        }
                        B();
                      });
                  });
              },
            );
            return d.setHeader("Content-Type", "application/json"), d.write(JSON.stringify(y)), d.end(), this;
          }),
          (q.prototype._connectWebSocket = function (y, B) {
            var f = this;
            if (f._ws) {
              Z.nextTick(function () {
                B();
              });
              return;
            }
            (this._ws = new WebSocket(O() + u().path + "/socket?token=" + y)),
              this._handleWebsocket(),
              B && f.on("connect", B);
          }),
          (q.prototype._handleWebsocket = function () {
            var y = this;
            this._ws.addEventListener("open", function () {
              (y._connecting = !1), (y.readable = !0), y.emit("connect"), y.read(0);
            }),
              this._ws.addEventListener("error", function (B) {
                console.warn("TCP error", B), y.emit("error", "An error occured with the WebSocket");
              }),
              this._ws.addEventListener("message", function (B) {
                var f = B.data,
                  h = function (p) {
                    (y.bytesRead += p.length), y.push(p);
                  };
                if (typeof f == "string") {
                  var d = new ze(f);
                  h(d);
                } else if (window.Blob && f instanceof Blob) {
                  var s = new FileReader();
                  s.addEventListener("load", function (p) {
                    var _ = s.result,
                      R = new Uint8Array(_);
                    h(new ze(R));
                  }),
                    s.readAsArrayBuffer(f);
                } else console.warn("Cannot read TCP stream: unsupported message type", f);
              }),
              this._ws.addEventListener("close", function () {
                y.readyState == "open" && y.destroy();
              });
          }),
          (i.isIP = function (y) {
            return i.isIPv4(y) ? 4 : i.isIPv6(y) ? 6 : 0;
          }),
          (i.isIPv4 = function (y) {
            return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
              y,
            );
          }),
          (i.isIPv6 = function (y) {
            return /^(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))$/.test(
              y,
            );
          });
      })(Ye)),
    Ye
  );
}
var lo = ao();
export {
  bt as a,
  lo as b,
  Jn as c,
  Ce as d,
  Kn as e,
  Yi as f,
  ti as g,
  Gi as h,
  Hi as i,
  oo as j,
  Vn as k,
  Le as l,
  pt as r,
};
