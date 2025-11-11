import { b7 as ae, b8 as wt, b6 as yt } from "./index-DTKnr6h1.js";
import { a as Oe, c as Ot, d as St, e as jt, f as We, g as qt, h as Pt, i as Rt, b as je } from "./browser-CsINfYrj.js";
import { A as At } from "./index-DJjAU85H.js";
import "./__vite-browser-external-v7f2oYTb.js";
var Pe = { exports: {} },
  Re = {},
  ke;
function gt() {
  if (ke) return Re;
  ke = 1;
  function l(i) {
    "@babel/helpers - typeof";
    return (
      (l =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (a) {
              return typeof a;
            }
          : function (a) {
              return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype
                ? "symbol"
                : typeof a;
            }),
      l(i)
    );
  }
  function E(i, a, g) {
    return Object.defineProperty(i, "prototype", { writable: !1 }), i;
  }
  function v(i, a) {
    if (!(i instanceof a)) throw new TypeError("Cannot call a class as a function");
  }
  function y(i, a) {
    if (typeof a != "function" && a !== null) throw new TypeError("Super expression must either be null or a function");
    (i.prototype = Object.create(a && a.prototype, { constructor: { value: i, writable: !0, configurable: !0 } })),
      Object.defineProperty(i, "prototype", { writable: !1 }),
      a && A(i, a);
  }
  function A(i, a) {
    return (
      (A = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (P, M) {
            return (P.__proto__ = M), P;
          }),
      A(i, a)
    );
  }
  function N(i) {
    var a = L();
    return function () {
      var P = $(i),
        M;
      if (a) {
        var R = $(this).constructor;
        M = Reflect.construct(P, arguments, R);
      } else M = P.apply(this, arguments);
      return j(this, M);
    };
  }
  function j(i, a) {
    if (a && (l(a) === "object" || typeof a == "function")) return a;
    if (a !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return H(i);
  }
  function H(i) {
    if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return i;
  }
  function L() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch {
      return !1;
    }
  }
  function $(i) {
    return (
      ($ = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (g) {
            return g.__proto__ || Object.getPrototypeOf(g);
          }),
      $(i)
    );
  }
  var D = {},
    T,
    q;
  function b(i, a, g) {
    g || (g = Error);
    function P(R, W, B) {
      return typeof a == "string" ? a : a(R, W, B);
    }
    var M = (function (R) {
      y(B, R);
      var W = N(B);
      function B(te, re, C) {
        var Q;
        return v(this, B), (Q = W.call(this, P(te, re, C))), (Q.code = i), Q;
      }
      return E(B);
    })(g);
    D[i] = M;
  }
  function k(i, a) {
    if (Array.isArray(i)) {
      var g = i.length;
      return (
        (i = i.map(function (P) {
          return String(P);
        })),
        g > 2
          ? "one of ".concat(a, " ").concat(i.slice(0, g - 1).join(", "), ", or ") + i[g - 1]
          : g === 2
            ? "one of ".concat(a, " ").concat(i[0], " or ").concat(i[1])
            : "of ".concat(a, " ").concat(i[0])
      );
    } else return "of ".concat(a, " ").concat(String(i));
  }
  function X(i, a, g) {
    return i.substr(0, a.length) === a;
  }
  function J(i, a, g) {
    return (g === void 0 || g > i.length) && (g = i.length), i.substring(g - a.length, g) === a;
  }
  function F(i, a, g) {
    return typeof g != "number" && (g = 0), g + a.length > i.length ? !1 : i.indexOf(a, g) !== -1;
  }
  return (
    b("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError),
    b(
      "ERR_INVALID_ARG_TYPE",
      function (i, a, g) {
        T === void 0 && (T = ze()), T(typeof i == "string", "'name' must be a string");
        var P;
        typeof a == "string" && X(a, "not ") ? ((P = "must not be"), (a = a.replace(/^not /, ""))) : (P = "must be");
        var M;
        if (J(i, " argument")) M = "The ".concat(i, " ").concat(P, " ").concat(k(a, "type"));
        else {
          var R = F(i, ".") ? "property" : "argument";
          M = 'The "'.concat(i, '" ').concat(R, " ").concat(P, " ").concat(k(a, "type"));
        }
        return (M += ". Received type ".concat(l(g))), M;
      },
      TypeError,
    ),
    b(
      "ERR_INVALID_ARG_VALUE",
      function (i, a) {
        var g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "is invalid";
        q === void 0 && (q = Oe());
        var P = q.inspect(a);
        return (
          P.length > 128 && (P = "".concat(P.slice(0, 128), "...")),
          "The argument '".concat(i, "' ").concat(g, ". Received ").concat(P)
        );
      },
      TypeError,
    ),
    b(
      "ERR_INVALID_RETURN_VALUE",
      function (i, a, g) {
        var P;
        return (
          g && g.constructor && g.constructor.name
            ? (P = "instance of ".concat(g.constructor.name))
            : (P = "type ".concat(l(g))),
          "Expected ".concat(i, ' to be returned from the "').concat(a, '"') + " function but got ".concat(P, ".")
        );
      },
      TypeError,
    ),
    b(
      "ERR_MISSING_ARGS",
      function () {
        for (var i = arguments.length, a = new Array(i), g = 0; g < i; g++) a[g] = arguments[g];
        T === void 0 && (T = ze()), T(a.length > 0, "At least one arg needs to be specified");
        var P = "The ",
          M = a.length;
        switch (
          ((a = a.map(function (R) {
            return '"'.concat(R, '"');
          })),
          M)
        ) {
          case 1:
            P += "".concat(a[0], " argument");
            break;
          case 2:
            P += "".concat(a[0], " and ").concat(a[1], " arguments");
            break;
          default:
            (P += a.slice(0, M - 1).join(", ")), (P += ", and ".concat(a[M - 1], " arguments"));
            break;
        }
        return "".concat(P, " must be specified");
      },
      TypeError,
    ),
    (Re.codes = D),
    Re
  );
}
var Ae, Xe;
function It() {
  if (Xe) return Ae;
  Xe = 1;
  function l(c, u) {
    var w = Object.keys(c);
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(c);
      u &&
        (d = d.filter(function (I) {
          return Object.getOwnPropertyDescriptor(c, I).enumerable;
        })),
        w.push.apply(w, d);
    }
    return w;
  }
  function E(c) {
    for (var u = 1; u < arguments.length; u++) {
      var w = arguments[u] != null ? arguments[u] : {};
      u % 2
        ? l(Object(w), !0).forEach(function (d) {
            v(c, d, w[d]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(w))
          : l(Object(w)).forEach(function (d) {
              Object.defineProperty(c, d, Object.getOwnPropertyDescriptor(w, d));
            });
    }
    return c;
  }
  function v(c, u, w) {
    return (
      (u = j(u)),
      u in c ? Object.defineProperty(c, u, { value: w, enumerable: !0, configurable: !0, writable: !0 }) : (c[u] = w),
      c
    );
  }
  function y(c, u) {
    if (!(c instanceof u)) throw new TypeError("Cannot call a class as a function");
  }
  function A(c, u) {
    for (var w = 0; w < u.length; w++) {
      var d = u[w];
      (d.enumerable = d.enumerable || !1),
        (d.configurable = !0),
        "value" in d && (d.writable = !0),
        Object.defineProperty(c, j(d.key), d);
    }
  }
  function N(c, u, w) {
    return u && A(c.prototype, u), Object.defineProperty(c, "prototype", { writable: !1 }), c;
  }
  function j(c) {
    var u = H(c, "string");
    return i(u) === "symbol" ? u : String(u);
  }
  function H(c, u) {
    if (i(c) !== "object" || c === null) return c;
    var w = c[Symbol.toPrimitive];
    if (w !== void 0) {
      var d = w.call(c, u);
      if (i(d) !== "object") return d;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(c);
  }
  function L(c, u) {
    if (typeof u != "function" && u !== null) throw new TypeError("Super expression must either be null or a function");
    (c.prototype = Object.create(u && u.prototype, { constructor: { value: c, writable: !0, configurable: !0 } })),
      Object.defineProperty(c, "prototype", { writable: !1 }),
      u && J(c, u);
  }
  function $(c) {
    var u = k();
    return function () {
      var d = F(c),
        I;
      if (u) {
        var n = F(this).constructor;
        I = Reflect.construct(d, arguments, n);
      } else I = d.apply(this, arguments);
      return D(this, I);
    };
  }
  function D(c, u) {
    if (u && (i(u) === "object" || typeof u == "function")) return u;
    if (u !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return T(c);
  }
  function T(c) {
    if (c === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return c;
  }
  function q(c) {
    var u = typeof Map == "function" ? new Map() : void 0;
    return (
      (q = function (d) {
        if (d === null || !X(d)) return d;
        if (typeof d != "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof u < "u") {
          if (u.has(d)) return u.get(d);
          u.set(d, I);
        }
        function I() {
          return b(d, arguments, F(this).constructor);
        }
        return (
          (I.prototype = Object.create(d.prototype, {
            constructor: { value: I, enumerable: !1, writable: !0, configurable: !0 },
          })),
          J(I, d)
        );
      }),
      q(c)
    );
  }
  function b(c, u, w) {
    return (
      k()
        ? (b = Reflect.construct.bind())
        : (b = function (I, n, t) {
            var o = [null];
            o.push.apply(o, n);
            var p = Function.bind.apply(I, o),
              f = new p();
            return t && J(f, t.prototype), f;
          }),
      b.apply(null, arguments)
    );
  }
  function k() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch {
      return !1;
    }
  }
  function X(c) {
    return Function.toString.call(c).indexOf("[native code]") !== -1;
  }
  function J(c, u) {
    return (
      (J = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (d, I) {
            return (d.__proto__ = I), d;
          }),
      J(c, u)
    );
  }
  function F(c) {
    return (
      (F = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (w) {
            return w.__proto__ || Object.getPrototypeOf(w);
          }),
      F(c)
    );
  }
  function i(c) {
    "@babel/helpers - typeof";
    return (
      (i =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (u) {
              return typeof u;
            }
          : function (u) {
              return u && typeof Symbol == "function" && u.constructor === Symbol && u !== Symbol.prototype
                ? "symbol"
                : typeof u;
            }),
      i(c)
    );
  }
  var a = Oe(),
    g = a.inspect,
    P = gt(),
    M = P.codes.ERR_INVALID_ARG_TYPE;
  function R(c, u, w) {
    return (w === void 0 || w > c.length) && (w = c.length), c.substring(w - u.length, w) === u;
  }
  function W(c, u) {
    if (((u = Math.floor(u)), c.length == 0 || u == 0)) return "";
    var w = c.length * u;
    for (u = Math.floor(Math.log(u) / Math.log(2)); u; ) (c += c), u--;
    return (c += c.substring(0, w - c.length)), c;
  }
  var B = "",
    te = "",
    re = "",
    C = "",
    Q = {
      deepStrictEqual: "Expected values to be strictly deep-equal:",
      strictEqual: "Expected values to be strictly equal:",
      strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
      deepEqual: "Expected values to be loosely deep-equal:",
      equal: "Expected values to be loosely equal:",
      notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
      notStrictEqual: 'Expected "actual" to be strictly unequal to:',
      notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
      notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
      notEqual: 'Expected "actual" to be loosely unequal to:',
      notIdentical: "Values identical but not reference-equal:",
    },
    he = 10;
  function ye(c) {
    var u = Object.keys(c),
      w = Object.create(Object.getPrototypeOf(c));
    return (
      u.forEach(function (d) {
        w[d] = c[d];
      }),
      Object.defineProperty(w, "message", { value: c.message }),
      w
    );
  }
  function ie(c) {
    return g(c, {
      compact: !1,
      customInspect: !1,
      depth: 1e3,
      maxArrayLength: 1 / 0,
      showHidden: !1,
      breakLength: 1 / 0,
      showProxy: !1,
      sorted: !0,
      getters: !0,
    });
  }
  function ge(c, u, w) {
    var d = "",
      I = "",
      n = 0,
      t = "",
      o = !1,
      p = ie(c),
      f = p.split(`
`),
      h = ie(u).split(`
`),
      O = 0,
      G = "";
    if (
      (w === "strictEqual" &&
        i(c) === "object" &&
        i(u) === "object" &&
        c !== null &&
        u !== null &&
        (w = "strictEqualObject"),
      f.length === 1 && h.length === 1 && f[0] !== h[0])
    ) {
      var z = f[0].length + h[0].length;
      if (z <= he) {
        if ((i(c) !== "object" || c === null) && (i(u) !== "object" || u === null) && (c !== 0 || u !== 0))
          return (
            "".concat(
              Q[w],
              `

`,
            ) +
            "".concat(f[0], " !== ").concat(
              h[0],
              `
`,
            )
          );
      } else if (w !== "strictEqualObject") {
        var Y = ae.stderr && ae.stderr.isTTY ? ae.stderr.columns : 80;
        if (z < Y) {
          for (; f[0][O] === h[0][O]; ) O++;
          O > 2 &&
            ((G = `
  `.concat(W(" ", O), "^")),
            (O = 0));
        }
      }
    }
    for (
      var K = f[f.length - 1], se = h[h.length - 1];
      K === se &&
      (O++ < 2
        ? (t = `
  `
            .concat(K)
            .concat(t))
        : (d = K),
      f.pop(),
      h.pop(),
      !(f.length === 0 || h.length === 0));

    )
      (K = f[f.length - 1]), (se = h[h.length - 1]);
    var ve = Math.max(f.length, h.length);
    if (ve === 0) {
      var le = p.split(`
`);
      if (le.length > 30) for (le[26] = "".concat(B, "...").concat(C); le.length > 27; ) le.pop();
      return ""
        .concat(
          Q.notIdentical,
          `

`,
        )
        .concat(
          le.join(`
`),
          `
`,
        );
    }
    O > 3 &&
      ((t = `
`
        .concat(B, "...")
        .concat(C)
        .concat(t)),
      (o = !0)),
      d !== "" &&
        ((t = `
  `
          .concat(d)
          .concat(t)),
        (d = ""));
    var ne = 0,
      be =
        Q[w] +
        `
`
          .concat(te, "+ actual")
          .concat(C, " ")
          .concat(re, "- expected")
          .concat(C),
      Se = " ".concat(B, "...").concat(C, " Lines skipped");
    for (O = 0; O < ve; O++) {
      var oe = O - n;
      if (f.length < O + 1)
        oe > 1 &&
          O > 2 &&
          (oe > 4
            ? ((I += `
`
                .concat(B, "...")
                .concat(C)),
              (o = !0))
            : oe > 3 &&
              ((I += `
  `.concat(h[O - 2])),
              ne++),
          (I += `
  `.concat(h[O - 1])),
          ne++),
          (n = O),
          (d += `
`
            .concat(re, "-")
            .concat(C, " ")
            .concat(h[O])),
          ne++;
      else if (h.length < O + 1)
        oe > 1 &&
          O > 2 &&
          (oe > 4
            ? ((I += `
`
                .concat(B, "...")
                .concat(C)),
              (o = !0))
            : oe > 3 &&
              ((I += `
  `.concat(f[O - 2])),
              ne++),
          (I += `
  `.concat(f[O - 1])),
          ne++),
          (n = O),
          (I += `
`
            .concat(te, "+")
            .concat(C, " ")
            .concat(f[O])),
          ne++;
      else {
        var pe = h[O],
          ue = f[O],
          e = ue !== pe && (!R(ue, ",") || ue.slice(0, -1) !== pe);
        e && R(pe, ",") && pe.slice(0, -1) === ue && ((e = !1), (ue += ",")),
          e
            ? (oe > 1 &&
                O > 2 &&
                (oe > 4
                  ? ((I += `
`
                      .concat(B, "...")
                      .concat(C)),
                    (o = !0))
                  : oe > 3 &&
                    ((I += `
  `.concat(f[O - 2])),
                    ne++),
                (I += `
  `.concat(f[O - 1])),
                ne++),
              (n = O),
              (I += `
`
                .concat(te, "+")
                .concat(C, " ")
                .concat(ue)),
              (d += `
`
                .concat(re, "-")
                .concat(C, " ")
                .concat(pe)),
              (ne += 2))
            : ((I += d),
              (d = ""),
              (oe === 1 || O === 0) &&
                ((I += `
  `.concat(ue)),
                ne++));
      }
      if (ne > 20 && O < ve - 2)
        return (
          ""
            .concat(be)
            .concat(
              Se,
              `
`,
            )
            .concat(
              I,
              `
`,
            )
            .concat(B, "...")
            .concat(C)
            .concat(
              d,
              `
`,
            ) + "".concat(B, "...").concat(C)
        );
    }
    return ""
      .concat(be)
      .concat(
        o ? Se : "",
        `
`,
      )
      .concat(I)
      .concat(d)
      .concat(t)
      .concat(G);
  }
  var ce = (function (c, u) {
    L(d, c);
    var w = $(d);
    function d(I) {
      var n;
      if ((y(this, d), i(I) !== "object" || I === null)) throw new M("options", "Object", I);
      var t = I.message,
        o = I.operator,
        p = I.stackStartFn,
        f = I.actual,
        h = I.expected,
        O = Error.stackTraceLimit;
      if (((Error.stackTraceLimit = 0), t != null)) n = w.call(this, String(t));
      else if (
        (ae.stderr &&
          ae.stderr.isTTY &&
          (ae.stderr && ae.stderr.getColorDepth && ae.stderr.getColorDepth() !== 1
            ? ((B = "\x1B[34m"), (te = "\x1B[32m"), (C = "\x1B[39m"), (re = "\x1B[31m"))
            : ((B = ""), (te = ""), (C = ""), (re = ""))),
        i(f) === "object" &&
          f !== null &&
          i(h) === "object" &&
          h !== null &&
          "stack" in f &&
          f instanceof Error &&
          "stack" in h &&
          h instanceof Error &&
          ((f = ye(f)), (h = ye(h))),
        o === "deepStrictEqual" || o === "strictEqual")
      )
        n = w.call(this, ge(f, h, o));
      else if (o === "notDeepStrictEqual" || o === "notStrictEqual") {
        var G = Q[o],
          z = ie(f).split(`
`);
        if ((o === "notStrictEqual" && i(f) === "object" && f !== null && (G = Q.notStrictEqualObject), z.length > 30))
          for (z[26] = "".concat(B, "...").concat(C); z.length > 27; ) z.pop();
        z.length === 1
          ? (n = w.call(this, "".concat(G, " ").concat(z[0])))
          : (n = w.call(
              this,
              ""
                .concat(
                  G,
                  `

`,
                )
                .concat(
                  z.join(`
`),
                  `
`,
                ),
            ));
      } else {
        var Y = ie(f),
          K = "",
          se = Q[o];
        o === "notDeepEqual" || o === "notEqual"
          ? ((Y = ""
              .concat(
                Q[o],
                `

`,
              )
              .concat(Y)),
            Y.length > 1024 && (Y = "".concat(Y.slice(0, 1021), "...")))
          : ((K = "".concat(ie(h))),
            Y.length > 512 && (Y = "".concat(Y.slice(0, 509), "...")),
            K.length > 512 && (K = "".concat(K.slice(0, 509), "...")),
            o === "deepEqual" || o === "equal"
              ? (Y = ""
                  .concat(
                    se,
                    `

`,
                  )
                  .concat(
                    Y,
                    `

should equal

`,
                  ))
              : (K = " ".concat(o, " ").concat(K))),
          (n = w.call(this, "".concat(Y).concat(K)));
      }
      return (
        (Error.stackTraceLimit = O),
        (n.generatedMessage = !t),
        Object.defineProperty(T(n), "name", {
          value: "AssertionError [ERR_ASSERTION]",
          enumerable: !1,
          writable: !0,
          configurable: !0,
        }),
        (n.code = "ERR_ASSERTION"),
        (n.actual = f),
        (n.expected = h),
        (n.operator = o),
        Error.captureStackTrace && Error.captureStackTrace(T(n), p),
        n.stack,
        (n.name = "AssertionError"),
        D(n)
      );
    }
    return (
      N(d, [
        {
          key: "toString",
          value: function () {
            return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
          },
        },
        {
          key: u,
          value: function (n, t) {
            return g(this, E(E({}, t), {}, { customInspect: !1, depth: 0 }));
          },
        },
      ]),
      d
    );
  })(q(Error), g.custom);
  return (Ae = ce), Ae;
}
var Ie, Je;
function dt() {
  if (Je) return Ie;
  Je = 1;
  var l = Object.prototype.toString;
  return (
    (Ie = function (v) {
      var y = l.call(v),
        A = y === "[object Arguments]";
      return (
        A ||
          (A =
            y !== "[object Array]" &&
            v !== null &&
            typeof v == "object" &&
            typeof v.length == "number" &&
            v.length >= 0 &&
            l.call(v.callee) === "[object Function]"),
        A
      );
    }),
    Ie
  );
}
var Ne, Qe;
function Nt() {
  if (Qe) return Ne;
  Qe = 1;
  var l;
  if (!Object.keys) {
    var E = Object.prototype.hasOwnProperty,
      v = Object.prototype.toString,
      y = dt(),
      A = Object.prototype.propertyIsEnumerable,
      N = !A.call({ toString: null }, "toString"),
      j = A.call(function () {}, "prototype"),
      H = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor",
      ],
      L = function (q) {
        var b = q.constructor;
        return b && b.prototype === q;
      },
      $ = {
        $applicationCache: !0,
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $onmozfullscreenchange: !0,
        $onmozfullscreenerror: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0,
      },
      D = (function () {
        if (typeof window > "u") return !1;
        for (var q in window)
          try {
            if (!$["$" + q] && E.call(window, q) && window[q] !== null && typeof window[q] == "object")
              try {
                L(window[q]);
              } catch {
                return !0;
              }
          } catch {
            return !0;
          }
        return !1;
      })(),
      T = function (q) {
        if (typeof window > "u" || !D) return L(q);
        try {
          return L(q);
        } catch {
          return !1;
        }
      };
    l = function (b) {
      var k = b !== null && typeof b == "object",
        X = v.call(b) === "[object Function]",
        J = y(b),
        F = k && v.call(b) === "[object String]",
        i = [];
      if (!k && !X && !J) throw new TypeError("Object.keys called on a non-object");
      var a = j && X;
      if (F && b.length > 0 && !E.call(b, 0)) for (var g = 0; g < b.length; ++g) i.push(String(g));
      if (J && b.length > 0) for (var P = 0; P < b.length; ++P) i.push(String(P));
      else for (var M in b) !(a && M === "prototype") && E.call(b, M) && i.push(String(M));
      if (N)
        for (var R = T(b), W = 0; W < H.length; ++W) !(R && H[W] === "constructor") && E.call(b, H[W]) && i.push(H[W]);
      return i;
    };
  }
  return (Ne = l), Ne;
}
var xe, Ze;
function vt() {
  if (Ze) return xe;
  Ze = 1;
  var l = Array.prototype.slice,
    E = dt(),
    v = Object.keys,
    y = v
      ? function (j) {
          return v(j);
        }
      : Nt(),
    A = Object.keys;
  return (
    (y.shim = function () {
      if (Object.keys) {
        var j = (function () {
          var H = Object.keys(arguments);
          return H && H.length === arguments.length;
        })(1, 2);
        j ||
          (Object.keys = function (L) {
            return E(L) ? A(l.call(L)) : A(L);
          });
      } else Object.keys = y;
      return Object.keys || y;
    }),
    (xe = y),
    xe
  );
}
var Te, Ke;
function xt() {
  if (Ke) return Te;
  Ke = 1;
  var l = vt(),
    E = Ot()(),
    v = St(),
    y = jt(),
    A = v("Array.prototype.push"),
    N = v("Object.prototype.propertyIsEnumerable"),
    j = E ? y.getOwnPropertySymbols : null;
  return (
    (Te = function (L, $) {
      if (L == null) throw new TypeError("target must be an object");
      var D = y(L);
      if (arguments.length === 1) return D;
      for (var T = 1; T < arguments.length; ++T) {
        var q = y(arguments[T]),
          b = l(q),
          k = E && (y.getOwnPropertySymbols || j);
        if (k)
          for (var X = k(q), J = 0; J < X.length; ++J) {
            var F = X[J];
            N(q, F) && A(b, F);
          }
        for (var i = 0; i < b.length; ++i) {
          var a = b[i];
          if (N(q, a)) {
            var g = q[a];
            D[a] = g;
          }
        }
      }
      return D;
    }),
    Te
  );
}
var $e, et;
function Tt() {
  if (et) return $e;
  et = 1;
  var l = xt(),
    E = function () {
      if (!Object.assign) return !1;
      for (var y = "abcdefghijklmnopqrst", A = y.split(""), N = {}, j = 0; j < A.length; ++j) N[A[j]] = A[j];
      var H = Object.assign({}, N),
        L = "";
      for (var $ in H) L += $;
      return y !== L;
    },
    v = function () {
      if (!Object.assign || !Object.preventExtensions) return !1;
      var y = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(y, "xy");
      } catch {
        return y[1] === "y";
      }
      return !1;
    };
  return (
    ($e = function () {
      return !Object.assign || E() || v() ? l : Object.assign;
    }),
    $e
  );
}
var De, tt;
function bt() {
  if (tt) return De;
  tt = 1;
  var l = function (E) {
    return E !== E;
  };
  return (
    (De = function (v, y) {
      return v === 0 && y === 0 ? 1 / v === 1 / y : !!(v === y || (l(v) && l(y)));
    }),
    De
  );
}
var _e, rt;
function Ye() {
  if (rt) return _e;
  rt = 1;
  var l = bt();
  return (
    (_e = function () {
      return typeof Object.is == "function" ? Object.is : l;
    }),
    _e
  );
}
var Le, nt;
function $t() {
  if (nt) return Le;
  nt = 1;
  var l = qt(),
    E = We(),
    v = E(l("String.prototype.indexOf"));
  return (
    (Le = function (A, N) {
      var j = l(A, !!N);
      return typeof j == "function" && v(A, ".prototype.") > -1 ? E(j) : j;
    }),
    Le
  );
}
var Fe, ot;
function qe() {
  if (ot) return Fe;
  ot = 1;
  var l = vt(),
    E = typeof Symbol == "function" && typeof Symbol("foo") == "symbol",
    v = Object.prototype.toString,
    y = Array.prototype.concat,
    A = Pt(),
    N = function ($) {
      return typeof $ == "function" && v.call($) === "[object Function]";
    },
    j = Rt()(),
    H = function ($, D, T, q) {
      if (D in $) {
        if (q === !0) {
          if ($[D] === T) return;
        } else if (!N(q) || !q()) return;
      }
      j ? A($, D, T, !0) : A($, D, T);
    },
    L = function ($, D) {
      var T = arguments.length > 2 ? arguments[2] : {},
        q = l(D);
      E && (q = y.call(q, Object.getOwnPropertySymbols(D)));
      for (var b = 0; b < q.length; b += 1) H($, q[b], D[q[b]], T[q[b]]);
    };
  return (L.supportsDescriptors = !!j), (Fe = L), Fe;
}
var Me, it;
function Dt() {
  if (it) return Me;
  it = 1;
  var l = Ye(),
    E = qe();
  return (
    (Me = function () {
      var y = l();
      return (
        E(
          Object,
          { is: y },
          {
            is: function () {
              return Object.is !== y;
            },
          },
        ),
        y
      );
    }),
    Me
  );
}
var Be, at;
function _t() {
  if (at) return Be;
  at = 1;
  var l = qe(),
    E = We(),
    v = bt(),
    y = Ye(),
    A = Dt(),
    N = E(y(), Object);
  return l(N, { getPolyfill: y, implementation: v, shim: A }), (Be = N), Be;
}
var Ue, ct;
function mt() {
  return (
    ct ||
      ((ct = 1),
      (Ue = function (E) {
        return E !== E;
      })),
    Ue
  );
}
var Ge, ut;
function Et() {
  if (ut) return Ge;
  ut = 1;
  var l = mt();
  return (
    (Ge = function () {
      return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : l;
    }),
    Ge
  );
}
var Ve, ft;
function Lt() {
  if (ft) return Ve;
  ft = 1;
  var l = qe(),
    E = Et();
  return (
    (Ve = function () {
      var y = E();
      return (
        l(
          Number,
          { isNaN: y },
          {
            isNaN: function () {
              return Number.isNaN !== y;
            },
          },
        ),
        y
      );
    }),
    Ve
  );
}
var He, st;
function Ft() {
  if (st) return He;
  st = 1;
  var l = We(),
    E = qe(),
    v = mt(),
    y = Et(),
    A = Lt(),
    N = l(y(), Number);
  return E(N, { getPolyfill: y, implementation: v, shim: A }), (He = N), He;
}
var Ce, lt;
function Mt() {
  if (lt) return Ce;
  lt = 1;
  function l(e, r) {
    return N(e) || A(e, r) || v(e, r) || E();
  }
  function E() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function v(e, r) {
    if (e) {
      if (typeof e == "string") return y(e, r);
      var s = Object.prototype.toString.call(e).slice(8, -1);
      if ((s === "Object" && e.constructor && (s = e.constructor.name), s === "Map" || s === "Set"))
        return Array.from(e);
      if (s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)) return y(e, r);
    }
  }
  function y(e, r) {
    (r == null || r > e.length) && (r = e.length);
    for (var s = 0, m = new Array(r); s < r; s++) m[s] = e[s];
    return m;
  }
  function A(e, r) {
    var s = e == null ? null : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (s != null) {
      var m,
        S,
        _,
        x,
        U = [],
        V = !0,
        Z = !1;
      try {
        if (((_ = (s = s.call(e)).next), r !== 0))
          for (; !(V = (m = _.call(s)).done) && (U.push(m.value), U.length !== r); V = !0);
      } catch (ee) {
        (Z = !0), (S = ee);
      } finally {
        try {
          if (!V && s.return != null && ((x = s.return()), Object(x) !== x)) return;
        } finally {
          if (Z) throw S;
        }
      }
      return U;
    }
  }
  function N(e) {
    if (Array.isArray(e)) return e;
  }
  function j(e) {
    "@babel/helpers - typeof";
    return (
      (j =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype
                ? "symbol"
                : typeof r;
            }),
      j(e)
    );
  }
  var H = /a/g.flags !== void 0,
    L = function (r) {
      var s = [];
      return (
        r.forEach(function (m) {
          return s.push(m);
        }),
        s
      );
    },
    $ = function (r) {
      var s = [];
      return (
        r.forEach(function (m, S) {
          return s.push([S, m]);
        }),
        s
      );
    },
    D = Object.is ? Object.is : _t(),
    T = Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols
      : function () {
          return [];
        },
    q = Number.isNaN ? Number.isNaN : Ft();
  function b(e) {
    return e.call.bind(e);
  }
  var k = b(Object.prototype.hasOwnProperty),
    X = b(Object.prototype.propertyIsEnumerable),
    J = b(Object.prototype.toString),
    F = Oe().types,
    i = F.isAnyArrayBuffer,
    a = F.isArrayBufferView,
    g = F.isDate,
    P = F.isMap,
    M = F.isRegExp,
    R = F.isSet,
    W = F.isNativeError,
    B = F.isBoxedPrimitive,
    te = F.isNumberObject,
    re = F.isStringObject,
    C = F.isBooleanObject,
    Q = F.isBigIntObject,
    he = F.isSymbolObject,
    ye = F.isFloat32Array,
    ie = F.isFloat64Array;
  function ge(e) {
    if (e.length === 0 || e.length > 10) return !0;
    for (var r = 0; r < e.length; r++) {
      var s = e.charCodeAt(r);
      if (s < 48 || s > 57) return !0;
    }
    return e.length === 10 && e >= Math.pow(2, 32);
  }
  function ce(e) {
    return Object.keys(e)
      .filter(ge)
      .concat(T(e).filter(Object.prototype.propertyIsEnumerable.bind(e)));
  }
  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */ function c(e, r) {
    if (e === r) return 0;
    for (var s = e.length, m = r.length, S = 0, _ = Math.min(s, m); S < _; ++S)
      if (e[S] !== r[S]) {
        (s = e[S]), (m = r[S]);
        break;
      }
    return s < m ? -1 : m < s ? 1 : 0;
  }
  var u = !0,
    w = !1,
    d = 0,
    I = 1,
    n = 2,
    t = 3;
  function o(e, r) {
    return H
      ? e.source === r.source && e.flags === r.flags
      : RegExp.prototype.toString.call(e) === RegExp.prototype.toString.call(r);
  }
  function p(e, r) {
    if (e.byteLength !== r.byteLength) return !1;
    for (var s = 0; s < e.byteLength; s++) if (e[s] !== r[s]) return !1;
    return !0;
  }
  function f(e, r) {
    return e.byteLength !== r.byteLength
      ? !1
      : c(
          new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
          new Uint8Array(r.buffer, r.byteOffset, r.byteLength),
        ) === 0;
  }
  function h(e, r) {
    return e.byteLength === r.byteLength && c(new Uint8Array(e), new Uint8Array(r)) === 0;
  }
  function O(e, r) {
    return te(e)
      ? te(r) && D(Number.prototype.valueOf.call(e), Number.prototype.valueOf.call(r))
      : re(e)
        ? re(r) && String.prototype.valueOf.call(e) === String.prototype.valueOf.call(r)
        : C(e)
          ? C(r) && Boolean.prototype.valueOf.call(e) === Boolean.prototype.valueOf.call(r)
          : Q(e)
            ? Q(r) && BigInt.prototype.valueOf.call(e) === BigInt.prototype.valueOf.call(r)
            : he(r) && Symbol.prototype.valueOf.call(e) === Symbol.prototype.valueOf.call(r);
  }
  function G(e, r, s, m) {
    if (e === r) return e !== 0 ? !0 : s ? D(e, r) : !0;
    if (s) {
      if (j(e) !== "object") return typeof e == "number" && q(e) && q(r);
      if (j(r) !== "object" || e === null || r === null || Object.getPrototypeOf(e) !== Object.getPrototypeOf(r))
        return !1;
    } else {
      if (e === null || j(e) !== "object") return r === null || j(r) !== "object" ? e == r : !1;
      if (r === null || j(r) !== "object") return !1;
    }
    var S = J(e),
      _ = J(r);
    if (S !== _) return !1;
    if (Array.isArray(e)) {
      if (e.length !== r.length) return !1;
      var x = ce(e),
        U = ce(r);
      return x.length !== U.length ? !1 : Y(e, r, s, m, I, x);
    }
    if (S === "[object Object]" && ((!P(e) && P(r)) || (!R(e) && R(r)))) return !1;
    if (g(e)) {
      if (!g(r) || Date.prototype.getTime.call(e) !== Date.prototype.getTime.call(r)) return !1;
    } else if (M(e)) {
      if (!M(r) || !o(e, r)) return !1;
    } else if (W(e) || e instanceof Error) {
      if (e.message !== r.message || e.name !== r.name) return !1;
    } else if (a(e)) {
      if (!s && (ye(e) || ie(e))) {
        if (!p(e, r)) return !1;
      } else if (!f(e, r)) return !1;
      var V = ce(e),
        Z = ce(r);
      return V.length !== Z.length ? !1 : Y(e, r, s, m, d, V);
    } else {
      if (R(e)) return !R(r) || e.size !== r.size ? !1 : Y(e, r, s, m, n);
      if (P(e)) return !P(r) || e.size !== r.size ? !1 : Y(e, r, s, m, t);
      if (i(e)) {
        if (!h(e, r)) return !1;
      } else if (B(e) && !O(e, r)) return !1;
    }
    return Y(e, r, s, m, d);
  }
  function z(e, r) {
    return r.filter(function (s) {
      return X(e, s);
    });
  }
  function Y(e, r, s, m, S, _) {
    if (arguments.length === 5) {
      _ = Object.keys(e);
      var x = Object.keys(r);
      if (_.length !== x.length) return !1;
    }
    for (var U = 0; U < _.length; U++) if (!k(r, _[U])) return !1;
    if (s && arguments.length === 5) {
      var V = T(e);
      if (V.length !== 0) {
        var Z = 0;
        for (U = 0; U < V.length; U++) {
          var ee = V[U];
          if (X(e, ee)) {
            if (!X(r, ee)) return !1;
            _.push(ee), Z++;
          } else if (X(r, ee)) return !1;
        }
        var me = T(r);
        if (V.length !== me.length && z(r, me).length !== Z) return !1;
      } else {
        var de = T(r);
        if (de.length !== 0 && z(r, de).length !== 0) return !1;
      }
    }
    if (_.length === 0 && (S === d || (S === I && e.length === 0) || e.size === 0)) return !0;
    if (m === void 0) m = { val1: new Map(), val2: new Map(), position: 0 };
    else {
      var Ee = m.val1.get(e);
      if (Ee !== void 0) {
        var fe = m.val2.get(r);
        if (fe !== void 0) return Ee === fe;
      }
      m.position++;
    }
    m.val1.set(e, m.position), m.val2.set(r, m.position);
    var we = oe(e, r, s, _, m, S);
    return m.val1.delete(e), m.val2.delete(r), we;
  }
  function K(e, r, s, m) {
    for (var S = L(e), _ = 0; _ < S.length; _++) {
      var x = S[_];
      if (G(r, x, s, m)) return e.delete(x), !0;
    }
    return !1;
  }
  function se(e) {
    switch (j(e)) {
      case "undefined":
        return null;
      case "object":
        return;
      case "symbol":
        return !1;
      case "string":
        e = +e;
      case "number":
        if (q(e)) return !1;
    }
    return !0;
  }
  function ve(e, r, s) {
    var m = se(s);
    return m ?? (r.has(m) && !e.has(m));
  }
  function le(e, r, s, m, S) {
    var _ = se(s);
    if (_ != null) return _;
    var x = r.get(_);
    return (x === void 0 && !r.has(_)) || !G(m, x, !1, S) ? !1 : !e.has(_) && G(m, x, !1, S);
  }
  function ne(e, r, s, m) {
    for (var S = null, _ = L(e), x = 0; x < _.length; x++) {
      var U = _[x];
      if (j(U) === "object" && U !== null) S === null && (S = new Set()), S.add(U);
      else if (!r.has(U)) {
        if (s || !ve(e, r, U)) return !1;
        S === null && (S = new Set()), S.add(U);
      }
    }
    if (S !== null) {
      for (var V = L(r), Z = 0; Z < V.length; Z++) {
        var ee = V[Z];
        if (j(ee) === "object" && ee !== null) {
          if (!K(S, ee, s, m)) return !1;
        } else if (!s && !e.has(ee) && !K(S, ee, s, m)) return !1;
      }
      return S.size === 0;
    }
    return !0;
  }
  function be(e, r, s, m, S, _) {
    for (var x = L(e), U = 0; U < x.length; U++) {
      var V = x[U];
      if (G(s, V, S, _) && G(m, r.get(V), S, _)) return e.delete(V), !0;
    }
    return !1;
  }
  function Se(e, r, s, m) {
    for (var S = null, _ = $(e), x = 0; x < _.length; x++) {
      var U = l(_[x], 2),
        V = U[0],
        Z = U[1];
      if (j(V) === "object" && V !== null) S === null && (S = new Set()), S.add(V);
      else {
        var ee = r.get(V);
        if ((ee === void 0 && !r.has(V)) || !G(Z, ee, s, m)) {
          if (s || !le(e, r, V, Z, m)) return !1;
          S === null && (S = new Set()), S.add(V);
        }
      }
    }
    if (S !== null) {
      for (var me = $(r), de = 0; de < me.length; de++) {
        var Ee = l(me[de], 2),
          fe = Ee[0],
          we = Ee[1];
        if (j(fe) === "object" && fe !== null) {
          if (!be(S, e, fe, we, s, m)) return !1;
        } else if (!s && (!e.has(fe) || !G(e.get(fe), we, !1, m)) && !be(S, e, fe, we, !1, m)) return !1;
      }
      return S.size === 0;
    }
    return !0;
  }
  function oe(e, r, s, m, S, _) {
    var x = 0;
    if (_ === n) {
      if (!ne(e, r, s, S)) return !1;
    } else if (_ === t) {
      if (!Se(e, r, s, S)) return !1;
    } else if (_ === I)
      for (; x < e.length; x++)
        if (k(e, x)) {
          if (!k(r, x) || !G(e[x], r[x], s, S)) return !1;
        } else {
          if (k(r, x)) return !1;
          for (var U = Object.keys(e); x < U.length; x++) {
            var V = U[x];
            if (!k(r, V) || !G(e[V], r[V], s, S)) return !1;
          }
          return U.length === Object.keys(r).length;
        }
    for (x = 0; x < m.length; x++) {
      var Z = m[x];
      if (!G(e[Z], r[Z], s, S)) return !1;
    }
    return !0;
  }
  function pe(e, r) {
    return G(e, r, w);
  }
  function ue(e, r) {
    return G(e, r, u);
  }
  return (Ce = { isDeepEqual: pe, isDeepStrictEqual: ue }), Ce;
}
var pt;
function ze() {
  if (pt) return Pe.exports;
  pt = 1;
  function l(n) {
    "@babel/helpers - typeof";
    return (
      (l =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      l(n)
    );
  }
  function E(n, t, o) {
    return Object.defineProperty(n, "prototype", { writable: !1 }), n;
  }
  function v(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
  }
  var y = gt(),
    A = y.codes,
    N = A.ERR_AMBIGUOUS_ARGUMENT,
    j = A.ERR_INVALID_ARG_TYPE,
    H = A.ERR_INVALID_ARG_VALUE,
    L = A.ERR_INVALID_RETURN_VALUE,
    $ = A.ERR_MISSING_ARGS,
    D = It(),
    T = Oe(),
    q = T.inspect,
    b = Oe().types,
    k = b.isPromise,
    X = b.isRegExp,
    J = Tt()(),
    F = Ye()(),
    i = $t()("RegExp.prototype.test"),
    a,
    g;
  function P() {
    var n = Mt();
    (a = n.isDeepEqual), (g = n.isDeepStrictEqual);
  }
  var M = !1,
    R = (Pe.exports = C),
    W = {};
  function B(n) {
    throw n.message instanceof Error ? n.message : new D(n);
  }
  function te(n, t, o, p, f) {
    var h = arguments.length,
      O;
    if (h === 0) O = "Failed";
    else if (h === 1) (o = n), (n = void 0);
    else {
      if (M === !1) {
        M = !0;
        var G = ae.emitWarning ? ae.emitWarning : console.warn.bind(console);
        G(
          "assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.",
          "DeprecationWarning",
          "DEP0094",
        );
      }
      h === 2 && (p = "!=");
    }
    if (o instanceof Error) throw o;
    var z = { actual: n, expected: t, operator: p === void 0 ? "fail" : p, stackStartFn: f || te };
    o !== void 0 && (z.message = o);
    var Y = new D(z);
    throw (O && ((Y.message = O), (Y.generatedMessage = !0)), Y);
  }
  (R.fail = te), (R.AssertionError = D);
  function re(n, t, o, p) {
    if (!o) {
      var f = !1;
      if (t === 0) (f = !0), (p = "No value argument passed to `assert.ok()`");
      else if (p instanceof Error) throw p;
      var h = new D({ actual: o, expected: !0, message: p, operator: "==", stackStartFn: n });
      throw ((h.generatedMessage = f), h);
    }
  }
  function C() {
    for (var n = arguments.length, t = new Array(n), o = 0; o < n; o++) t[o] = arguments[o];
    re.apply(void 0, [C, t.length].concat(t));
  }
  (R.ok = C),
    (R.equal = function n(t, o, p) {
      if (arguments.length < 2) throw new $("actual", "expected");
      t != o && B({ actual: t, expected: o, message: p, operator: "==", stackStartFn: n });
    }),
    (R.notEqual = function n(t, o, p) {
      if (arguments.length < 2) throw new $("actual", "expected");
      t == o && B({ actual: t, expected: o, message: p, operator: "!=", stackStartFn: n });
    }),
    (R.deepEqual = function n(t, o, p) {
      if (arguments.length < 2) throw new $("actual", "expected");
      a === void 0 && P(), a(t, o) || B({ actual: t, expected: o, message: p, operator: "deepEqual", stackStartFn: n });
    }),
    (R.notDeepEqual = function n(t, o, p) {
      if (arguments.length < 2) throw new $("actual", "expected");
      a === void 0 && P(),
        a(t, o) && B({ actual: t, expected: o, message: p, operator: "notDeepEqual", stackStartFn: n });
    }),
    (R.deepStrictEqual = function n(t, o, p) {
      if (arguments.length < 2) throw new $("actual", "expected");
      a === void 0 && P(),
        g(t, o) || B({ actual: t, expected: o, message: p, operator: "deepStrictEqual", stackStartFn: n });
    }),
    (R.notDeepStrictEqual = Q);
  function Q(n, t, o) {
    if (arguments.length < 2) throw new $("actual", "expected");
    a === void 0 && P(),
      g(n, t) && B({ actual: n, expected: t, message: o, operator: "notDeepStrictEqual", stackStartFn: Q });
  }
  (R.strictEqual = function n(t, o, p) {
    if (arguments.length < 2) throw new $("actual", "expected");
    F(t, o) || B({ actual: t, expected: o, message: p, operator: "strictEqual", stackStartFn: n });
  }),
    (R.notStrictEqual = function n(t, o, p) {
      if (arguments.length < 2) throw new $("actual", "expected");
      F(t, o) && B({ actual: t, expected: o, message: p, operator: "notStrictEqual", stackStartFn: n });
    });
  var he = E(function n(t, o, p) {
    var f = this;
    v(this, n),
      o.forEach(function (h) {
        h in t && (p !== void 0 && typeof p[h] == "string" && X(t[h]) && i(t[h], p[h]) ? (f[h] = p[h]) : (f[h] = t[h]));
      });
  });
  function ye(n, t, o, p, f, h) {
    if (!(o in n) || !g(n[o], t[o])) {
      if (!p) {
        var O = new he(n, f),
          G = new he(t, f, n),
          z = new D({ actual: O, expected: G, operator: "deepStrictEqual", stackStartFn: h });
        throw ((z.actual = n), (z.expected = t), (z.operator = h.name), z);
      }
      B({ actual: n, expected: t, message: p, operator: h.name, stackStartFn: h });
    }
  }
  function ie(n, t, o, p) {
    if (typeof t != "function") {
      if (X(t)) return i(t, n);
      if (arguments.length === 2) throw new j("expected", ["Function", "RegExp"], t);
      if (l(n) !== "object" || n === null) {
        var f = new D({ actual: n, expected: t, message: o, operator: "deepStrictEqual", stackStartFn: p });
        throw ((f.operator = p.name), f);
      }
      var h = Object.keys(t);
      if (t instanceof Error) h.push("name", "message");
      else if (h.length === 0) throw new H("error", t, "may not be an empty object");
      return (
        a === void 0 && P(),
        h.forEach(function (O) {
          (typeof n[O] == "string" && X(t[O]) && i(t[O], n[O])) || ye(n, t, O, o, h, p);
        }),
        !0
      );
    }
    return t.prototype !== void 0 && n instanceof t ? !0 : Error.isPrototypeOf(t) ? !1 : t.call({}, n) === !0;
  }
  function ge(n) {
    if (typeof n != "function") throw new j("fn", "Function", n);
    try {
      n();
    } catch (t) {
      return t;
    }
    return W;
  }
  function ce(n) {
    return k(n) || (n !== null && l(n) === "object" && typeof n.then == "function" && typeof n.catch == "function");
  }
  function c(n) {
    return Promise.resolve().then(function () {
      var t;
      if (typeof n == "function") {
        if (((t = n()), !ce(t))) throw new L("instance of Promise", "promiseFn", t);
      } else if (ce(n)) t = n;
      else throw new j("promiseFn", ["Function", "Promise"], n);
      return Promise.resolve()
        .then(function () {
          return t;
        })
        .then(function () {
          return W;
        })
        .catch(function (o) {
          return o;
        });
    });
  }
  function u(n, t, o, p) {
    if (typeof o == "string") {
      if (arguments.length === 4) throw new j("error", ["Object", "Error", "Function", "RegExp"], o);
      if (l(t) === "object" && t !== null) {
        if (t.message === o)
          throw new N("error/message", 'The error message "'.concat(t.message, '" is identical to the message.'));
      } else if (t === o) throw new N("error/message", 'The error "'.concat(t, '" is identical to the message.'));
      (p = o), (o = void 0);
    } else if (o != null && l(o) !== "object" && typeof o != "function")
      throw new j("error", ["Object", "Error", "Function", "RegExp"], o);
    if (t === W) {
      var f = "";
      o && o.name && (f += " (".concat(o.name, ")")), (f += p ? ": ".concat(p) : ".");
      var h = n.name === "rejects" ? "rejection" : "exception";
      B({
        actual: void 0,
        expected: o,
        operator: n.name,
        message: "Missing expected ".concat(h).concat(f),
        stackStartFn: n,
      });
    }
    if (o && !ie(t, o, p, n)) throw t;
  }
  function w(n, t, o, p) {
    if (t !== W) {
      if ((typeof o == "string" && ((p = o), (o = void 0)), !o || ie(t, o))) {
        var f = p ? ": ".concat(p) : ".",
          h = n.name === "doesNotReject" ? "rejection" : "exception";
        B({
          actual: t,
          expected: o,
          operator: n.name,
          message:
            "Got unwanted ".concat(h).concat(
              f,
              `
`,
            ) + 'Actual message: "'.concat(t && t.message, '"'),
          stackStartFn: n,
        });
      }
      throw t;
    }
  }
  (R.throws = function n(t) {
    for (var o = arguments.length, p = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) p[f - 1] = arguments[f];
    u.apply(void 0, [n, ge(t)].concat(p));
  }),
    (R.rejects = function n(t) {
      for (var o = arguments.length, p = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) p[f - 1] = arguments[f];
      return c(t).then(function (h) {
        return u.apply(void 0, [n, h].concat(p));
      });
    }),
    (R.doesNotThrow = function n(t) {
      for (var o = arguments.length, p = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) p[f - 1] = arguments[f];
      w.apply(void 0, [n, ge(t)].concat(p));
    }),
    (R.doesNotReject = function n(t) {
      for (var o = arguments.length, p = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) p[f - 1] = arguments[f];
      return c(t).then(function (h) {
        return w.apply(void 0, [n, h].concat(p));
      });
    }),
    (R.ifError = function n(t) {
      if (t != null) {
        var o = "ifError got unwanted exception: ";
        l(t) === "object" && typeof t.message == "string"
          ? t.message.length === 0 && t.constructor
            ? (o += t.constructor.name)
            : (o += t.message)
          : (o += q(t));
        var p = new D({ actual: t, expected: null, operator: "ifError", message: o, stackStartFn: n }),
          f = t.stack;
        if (typeof f == "string") {
          var h = f.split(`
`);
          h.shift();
          for (
            var O = p.stack.split(`
`),
              G = 0;
            G < h.length;
            G++
          ) {
            var z = O.indexOf(h[G]);
            if (z !== -1) {
              O = O.slice(0, z);
              break;
            }
          }
          p.stack = ""
            .concat(
              O.join(`
`),
              `
`,
            )
            .concat(
              h.join(`
`),
            );
        }
        throw p;
      }
    });
  function d(n, t, o, p, f) {
    if (!X(t)) throw new j("regexp", "RegExp", t);
    var h = f === "match";
    if (typeof n != "string" || i(t, n) !== h) {
      if (o instanceof Error) throw o;
      var O = !o;
      o =
        o ||
        (typeof n != "string"
          ? 'The "string" argument must be of type string. Received type ' + "".concat(l(n), " (").concat(q(n), ")")
          : (h
              ? "The input did not match the regular expression "
              : "The input was expected to not match the regular expression ") +
            ""
              .concat(
                q(t),
                `. Input:

`,
              )
              .concat(
                q(n),
                `
`,
              ));
      var G = new D({ actual: n, expected: t, message: o, operator: f, stackStartFn: p });
      throw ((G.generatedMessage = O), G);
    }
  }
  (R.match = function n(t, o, p) {
    d(t, o, p, n, "match");
  }),
    (R.doesNotMatch = function n(t, o, p) {
      d(t, o, p, n, "doesNotMatch");
    });
  function I() {
    for (var n = arguments.length, t = new Array(n), o = 0; o < n; o++) t[o] = arguments[o];
    re.apply(void 0, [I, t.length].concat(t));
  }
  return (
    (R.strict = J(I, R, {
      equal: R.strictEqual,
      deepEqual: R.deepStrictEqual,
      notEqual: R.notStrictEqual,
      notDeepEqual: R.notDeepStrictEqual,
    })),
    (R.strict.strict = R.strict),
    Pe.exports
  );
}
var Bt = ze();
const Ut = wt(Bt);
function Gt(l) {
  return new Promise((E, v) => {
    let y = 0;
    const A = [];
    function N() {
      const T = l.read();
      T ? D(T) : l.once("readable", N);
    }
    function j() {
      l.removeListener("end", L),
        l.removeListener("error", $),
        l.removeListener("close", H),
        l.removeListener("readable", N);
    }
    function H(T) {}
    function L() {}
    function $(T) {
      j(), v(T);
    }
    function D(T) {
      A.push(T), (y += T.length);
      const q = yt.concat(A, y);
      if (
        q.indexOf(`\r
\r
`) === -1
      ) {
        N();
        return;
      }
      const k = q.toString("ascii").split(`\r
`),
        X = k.shift();
      if (!X) throw new Error("No header received");
      const J = X.split(" "),
        F = +J[1],
        i = J.slice(2).join(" "),
        a = {};
      for (const g of k) {
        if (!g) continue;
        const P = g.indexOf(":");
        if (P === -1) throw new Error(`Invalid header: "${g}"`);
        const M = g.slice(0, P).toLowerCase(),
          R = g.slice(P + 1).trimStart(),
          W = a[M];
        typeof W == "string" ? (a[M] = [W, R]) : Array.isArray(W) ? W.push(R) : (a[M] = R);
      }
      j(), E({ connect: { statusCode: F, statusText: i, headers: a }, buffered: q });
    }
    l.on("error", $), l.on("close", H), l.on("end", L), N();
  });
}
class Vt extends At {
  constructor(E, v) {
    super(v),
      (this.options = { path: void 0 }),
      (this.proxy = typeof E == "string" ? new URL(E) : E),
      (this.proxyHeaders = (v == null ? void 0 : v.headers) ?? {});
    const y = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
      A = this.proxy.port ? parseInt(this.proxy.port, 10) : this.secureProxy ? 443 : 80;
    this.connectOpts = { ALPNProtocols: ["http/1.1"], ...(v ? ht(v, "headers") : null), host: y, port: A };
  }
  get secureProxy() {
    return Ct(this.proxy.protocol);
  }
  async connect(E, v) {
    const { proxy: y, secureProxy: A } = this;
    if (!v.host) throw new TypeError('No "host" provided');
    let N;
    A ? (N = (void 0)(this.connectOpts)) : (N = je.connect(this.connectOpts));
    const j = typeof this.proxyHeaders == "function" ? this.proxyHeaders() : { ...this.proxyHeaders },
      H = je.isIPv6(v.host) ? `[${v.host}]` : v.host;
    let L = `CONNECT ${H}:${v.port} HTTP/1.1\r
`;
    if (y.username || y.password) {
      const b = `${decodeURIComponent(y.username)}:${decodeURIComponent(y.password)}`;
      j["Proxy-Authorization"] = `Basic ${yt.from(b).toString("base64")}`;
    }
    (j.Host = `${H}:${v.port}`),
      j["Proxy-Connection"] || (j["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close");
    for (const b of Object.keys(j))
      L += `${b}: ${j[b]}\r
`;
    const $ = Gt(N);
    N.write(`${L}\r
`);
    const { connect: D, buffered: T } = await $;
    if ((E.emit("proxyConnect", D), this.emit("proxyConnect", D, E), D.statusCode === 200)) {
      if ((E.once("socket", Ht), v.secureEndpoint)) {
        const b = v.servername || v.host;
        return (void 0)({ ...ht(v, "host", "path", "port"), socket: N, servername: je.isIP(b) ? void 0 : b });
      }
      return N;
    }
    N.destroy();
    const q = new je.Socket({ writable: !1 });
    return (
      (q.readable = !0),
      E.once("socket", (b) => {
        Ut(b.listenerCount("data") > 0), b.push(T), b.push(null);
      }),
      q
    );
  }
}
Vt.protocols = ["http", "https"];
function Ht(l) {
  l.resume();
}
function Ct(l) {
  return typeof l == "string" ? /^https:?$/i.test(l) : !1;
}
function ht(l, ...E) {
  const v = {};
  let y;
  for (y in l) E.includes(y) || (v[y] = l[y]);
  return v;
}
export { Vt as HttpsProxyAgent };
