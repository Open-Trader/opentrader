import {
  M as x,
  X as C,
  N as te,
  O as W,
  P as ne,
  r as d,
  Q as se,
  T as re,
  _ as P,
  U as oe,
  V as ae,
  W as ie,
  Y as ce,
  Z as le,
  $ as ue,
  a0 as de,
  j as s,
  a1 as A,
  a2 as he,
  b as v,
  f as y,
  o as j,
  c as h,
  a3 as me,
  q as pe,
  v as xe,
  w as ge,
  x as fe,
  a4 as be,
  a5 as ye,
  S as G,
  a6 as je,
  g as ve,
  a7 as Ce,
  a8 as Ie,
  a9 as Pe,
  aa as Fe,
  n as Se,
  ab as we,
  ac as Be,
  ad as Ge,
  ae as Ae,
  af as V,
  ag as Te,
  ah as qe,
  ai as L,
  aj as N,
  ak as D,
  al as Le,
  am as Ne,
  an as H,
  ao as M,
  z as De,
  B as _,
  ap as Ee,
  aq as E,
  ar as Oe,
  as as U,
  at as ze,
  G as b,
  au as Re,
  d as Z,
  av as $e,
  aw as ke,
  ax as Ve,
  ay as Me,
} from "./index-DTKnr6h1.js";
function Qe(e, n, t) {
  return x(e)
    .minus(n)
    .div(t - 1)
    .toNumber();
}
function We(e, n, t, r) {
  const o = Qe(e, n, t);
  return Array.from({ length: t }).map((a, i) => ({ price: x(n).plus(x(o).mul(i)).toNumber(), quantity: r }));
}
function X(e, n) {
  return (
    (e = String(e)),
    n != null && n.ignoreTrailingZeros && (e = new x(e).toString()),
    e.includes(".") ? e.split(".")[1].length : 0
  );
}
function q(e, n) {
  const t = n.decimals.price,
    r = X(e, { ignoreTrailingZeros: !0 });
  return t === void 0 ? new x(e).toFixed(r) : r > t ? new x(e).toFixed(t, x.roundDown) : new x(e).toFixed(r);
}
function He(e, n) {
  const t = n.decimals.amount,
    r = X(e, { ignoreTrailingZeros: !0 });
  return t === void 0 ? new x(e).toFixed(r) : r > t ? new x(e).toFixed(t, x.roundDown) : new x(e).toFixed(r);
}
function At(e, n, t, r, o) {
  return We(e, n, t, r).map((i) => {
    const c = q(i.price, o);
    return { ...i, price: new x(c).toNumber() };
  });
}
function _e(e) {
  const n = e.reduce(
      (r, o) => (o.buy.status === C.Filled && o.sell.status === C.Idle ? x(r).plus(o.sell.quantity).toNumber() : r),
      0,
    ),
    t = e.reduce((r, o) => {
      if (o.buy.status === C.Idle && o.sell.status === C.Idle) {
        const i = x(o.buy.quantity).times(o.buy.price);
        return x(r).plus(i).toNumber();
      }
      return r;
    }, 0);
  return { baseCurrencyAmount: n, quoteCurrencyAmount: t };
}
function Ue(e, n, t) {
  const r = n.findIndex((l) => l.price === e.price && l.quantity === e.quantity);
  if (r === -1) throw new Error(`Cannot find grid line index of { price: ${e.price}, quantity: ${e.quantity} }`);
  const o = n[r],
    a = n[r - 1],
    i = n[r + 1],
    c = x(t).minus(o.price).abs();
  if (a) {
    const l = x(t).minus(a.price).abs();
    if (x(l).lt(c)) return !1;
  }
  if (i) {
    const l = x(t).minus(i.price).abs();
    if (x(l).lte(c)) return !1;
  }
  return !0;
}
function Ze(e, n) {
  const t = e[n + 1];
  if (!t) throw new Error(`nextGridLinePrice: Grid line at index ${n} doesn't exists`);
  return t.price;
}
function Xe(e, n) {
  return e.flatMap((t, r) => {
    if (r === e.length - 1) return [];
    const o = Ze(e, r);
    return Ue(t, e, n) || t.price > n
      ? [
          {
            buy: { price: t.price, quantity: t.quantity, status: C.Filled },
            sell: { price: o, quantity: t.quantity, status: C.Idle },
          },
        ]
      : [
          {
            buy: { price: t.price, quantity: t.quantity, status: C.Idle },
            sell: { price: o, quantity: t.quantity, status: C.Idle },
          },
        ];
  });
}
function Je(e, n, t) {
  const r = Xe(n, t),
    { baseCurrencyAmount: o, quoteCurrencyAmount: a } = _e(r),
    i = a + o * t;
  return {
    baseCurrencyAmount: He(o, e.filters),
    quoteCurrencyAmount: q(a, e.filters),
    totalInQuoteCurrency: q(i, e.filters),
  };
}
function Ye(e, n) {
  return `${e.toUpperCase()}${te}${n}`;
}
const Tt = (e) => e.gridBotForm,
  Ke = (e) => e.gridBotForm.type,
  et = (e) => e.gridBotForm.exchangeAccountId,
  tt = (e) => e.gridBotForm.exchangeCode,
  F = (e) => e.gridBotForm.isDemoAccount,
  I = (e) => e.gridBotForm.symbolId,
  nt = (e) => e.gridBotForm.highPrice,
  st = (e) => e.gridBotForm.lowPrice,
  rt = (e) => e.gridBotForm.gridLinesNumber,
  ot = (e) => e.gridBotForm.quantityPerGrid,
  at = (e) => e.gridBotForm.botName,
  O = (e) => e.gridBotForm.gridLines,
  J = (e) => (n) => n.gridBotForm.gridLines[e],
  qt = (e) => e.gridBotForm.barSize;
function it(e) {
  return e.size;
}
function ct(e) {
  const { value: n, id: t, rootRef: r } = e,
    o = W();
  if (o === null) throw new Error("No TabContext provided");
  const { value: a, getTabId: i } = o,
    c = ne(t),
    l = d.useRef(null),
    u = se(l, r),
    m = d.useMemo(() => ({ id: c, ref: l }), [c]),
    { id: p } = re(n ?? it, m),
    g = p !== a,
    f = p !== void 0 ? i(p) : void 0;
  return {
    hidden: g,
    getRootProps: (T = {}) => P({ "aria-labelledby": f ?? void 0, hidden: g, id: c ?? void 0 }, T, { ref: u }),
    rootRef: u,
  };
}
function lt(e) {
  return oe("MuiTabPanel", e);
}
ae("MuiTabPanel", [
  "root",
  "hidden",
  "sizeSm",
  "sizeMd",
  "sizeLg",
  "horizontal",
  "vertical",
  "colorPrimary",
  "colorNeutral",
  "colorDanger",
  "colorSuccess",
  "colorWarning",
  "colorContext",
  "variantPlain",
  "variantOutlined",
  "variantSoft",
  "variantSolid",
]);
const ut = ["children", "value", "component", "color", "variant", "size", "slots", "slotProps", "keepMounted"],
  dt = (e) => {
    const { hidden: n, size: t, variant: r, color: o, orientation: a } = e,
      i = {
        root: [
          "root",
          n && "hidden",
          t && `size${A(t)}`,
          a,
          r && `variant${A(r)}`,
          o && `color${A(o)}`,
          t && `size${A(t)}`,
        ],
      };
    return he(i, lt, {});
  },
  ht = de("div", { name: "JoyTabPanel", slot: "Root", overridesResolver: (e, n) => n.root })(
    ({ theme: e, ownerState: n }) => {
      var t;
      return P(
        {
          display: n.hidden ? "none" : "block",
          padding: "var(--Tabs-spacing)",
          flexGrow: 1,
          fontFamily: e.vars.fontFamily.body,
        },
        e.typography[`body-${n.size}`],
        (t = e.variants[n.variant]) == null ? void 0 : t[n.color],
      );
    },
  ),
  Q = d.forwardRef(function (n, t) {
    const r = ie({ props: n, name: "JoyTabPanel" }),
      { orientation: o } = W() || { orientation: "horizontal" },
      a = d.useContext(ce),
      {
        children: i,
        value: c = 0,
        component: l,
        color: u = "neutral",
        variant: m = "plain",
        size: p,
        slots: g = {},
        slotProps: f = {},
        keepMounted: S = !1,
      } = r,
      T = le(r, ut),
      { hidden: z, getRootProps: Y } = ct(P({}, r, { value: c })),
      R = P({}, r, { orientation: o, hidden: z, size: p ?? a, color: u, variant: m }),
      K = dt(R),
      ee = P({}, T, { component: l, slots: g, slotProps: f }),
      [$, k] = ue("root", {
        ref: t,
        elementType: ht,
        getSlotProps: Y,
        externalForwardedProps: ee,
        additionalProps: { role: "tabpanel", ref: t, as: l },
        ownerState: R,
        className: K.root,
      });
    return S ? s.jsx($, P({}, k, { children: i })) : s.jsx($, P({}, k, { children: !z && i }));
  }),
  mt = ({ disabled: e }) => {
    const n = v(),
      t = y(),
      { data: r } = j(n.exchangeAccount.list.queryOptions()),
      o = h(et),
      a = (c) => {
        if (c === null) throw new Error("ExchangeAccountField: Cannot reset exchange account input");
        t(pe(c.id)), t(xe(c.exchangeCode)), t(ge(c.isDemoAccount)), t(fe(Ye(c.exchangeCode, "BTC/USDT")));
      },
      i = r.find((c) => c.id === o);
    return s.jsx(me, { onChange: a, value: i, disabled: e });
  },
  pt = ({ disabled: e }) => {
    const n = v(),
      t = y(),
      r = h(tt),
      o = h(F),
      { data: a } = j(n.symbol.list.queryOptions({ exchangeCode: r, isDemoAccount: o })),
      i = h(I),
      c = (u) => {
        if (u === null) throw new Error("PairField: Cannot reset symbol input");
        t(ye(u.symbolId));
      },
      l = a.find((u) => u.symbolId === i);
    return s.jsx(be, { exchangeCode: r, isDemoAccount: o, onChange: c, value: l || null, disabled: e });
  },
  xt = 36,
  B = ({ width: e = "100%", withLabel: n }) => {
    const t = s.jsx(G, { animation: "wave", height: xt, variant: "rectangular", width: e });
    return n
      ? s.jsxs(s.Fragment, {
          children: [s.jsx(G, { animation: "wave", height: 20, sx: { mb: "6px" }, variant: "text", width: 72 }), t],
        })
      : t;
  };
function gt(e, n) {
  if (e.length === 0) return -1;
  if (e.length === 1) return e[0];
  const t = e.map((a) => Math.abs(a - n)),
    r = Math.min(...t),
    o = t.indexOf(r);
  return e[o];
}
function ft(e, n) {
  const t = e.map((o) => o.price),
    r = gt(t, n);
  return t.map((o) => je(o, t, r));
}
const Lt = ({ symbolId: e, isDemoAccount: n, barSize: t, onBarSizeChange: r, gridLines: o, defaultPrice: a }) => {
    const i = v(),
      c = d.useDeferredValue(e),
      l = d.useDeferredValue(n),
      u = e !== c || n !== l,
      {
        data: { price: m },
      } = ve(i.symbol.price.queryOptions({ symbolId: e, isDemoAccount: n }, { initialData: a })),
      p = d.useMemo(() => ft(o, m), [o, m]),
      [g, f] = d.useState(!0);
    return s.jsx(d.Suspense, {
      fallback: s.jsx(G, { animation: "wave", height: Be, variant: "rectangular", width: "100%" }),
      children: s.jsxs(Ce, {
        barSize: t,
        dimmed: u,
        priceLines: p,
        showPriceLines: g,
        symbolId: c,
        isDemoAccount: n,
        children: [
          s.jsx(d.Suspense, { fallback: s.jsx(B, { width: 232 }), children: s.jsx(mt, {}) }),
          s.jsx(d.Suspense, { fallback: s.jsx(B, { width: 232 }), children: s.jsx(pt, {}) }),
          s.jsx(Ie, {
            onChange: (S) => {
              r && r(S);
            },
            value: t,
            whitelist: Pe,
          }),
          s.jsx(Fe, {}),
          s.jsx(Se, {
            display: "flex",
            children: s.jsx(we, { gridVisible: g, hideTradesButton: !0, onGridVisibleChange: f }),
          }),
        ],
      }),
    });
  },
  w = { simple: "simple", advanced: "advanced" },
  Nt = ({ simpleForm: e, advancedForm: n }) => {
    const t = h(Ke),
      r = y(),
      o = (a, i) => {
        i !== null && r(qe(i));
      };
    return s.jsxs(Ge, {
      defaultValue: w.simple,
      onChange: (a, i) => {
        o(a, i);
      },
      sx: { borderRadius: "md", overflow: "auto", boxShadow: "sm" },
      value: t,
      children: [
        s.jsxs(Ae, {
          disableUnderline: !0,
          sx: {
            [`& .${Te.root}`]: {
              bgcolor: "background.backdrop",
              '&[aria-selected="true"]': { bgcolor: "background.surface", fontWeight: "lg" },
            },
          },
          tabFlex: "auto",
          children: [
            s.jsx(V, { disableIndicator: !0, value: w.simple, children: "Easy form" }),
            s.jsx(V, { disableIndicator: !0, value: w.advanced, children: "Advanced form" }),
          ],
        }),
        s.jsx(Q, { value: w.simple, children: e }),
        s.jsx(Q, { value: w.advanced, children: n }),
      ],
    });
  },
  Dt = () => {
    const e = y(),
      n = h(at),
      [t, r] = d.useState(n);
    d.useEffect(() => {
      r(n);
    }, [n]);
    const o = (l) => {
        r(l.target.value);
      },
      a = () => {
        t.length > 0 ? e(M(t)) : r(n);
      },
      i = () => {
        e(M(De()));
      },
      c = t.length === 0 ? "Must be defined" : null;
    return s.jsxs(L, {
      error: !!c,
      children: [
        s.jsx(N, { children: "Bot name" }),
        s.jsx(D, {
          endDecorator: s.jsx(Le, { onClick: i, children: s.jsx(Ne, {}) }),
          onBlur: a,
          onChange: o,
          value: t,
        }),
        c ? s.jsx(H, { children: c }) : null,
      ],
    });
  },
  bt = (e) => {
    const { className: n, gridLineIndex: t } = e,
      r = y(),
      o = () => {
        r(Ee(t));
      };
    return s.jsx(_, { className: n, color: "danger", onClick: o, size: "sm", children: "Remove" });
  },
  yt = (e) => {
    const { className: n, gridLineIndex: t } = e,
      r = v(),
      o = y(),
      { price: a } = h(J(t)),
      [i, c] = d.useState(String(a));
    d.useEffect(() => {
      c(`${a}`);
    }, [a]);
    const l = h(I),
      u = h(F),
      { data: m } = j(r.symbol.getOne.queryOptions({ symbolId: l, isDemoAccount: u })),
      p = (f) => {
        c(f.target.value);
      },
      g = () => {
        i.length > 0 ? o(Oe({ gridLineIndex: t, price: Number(i) })) : c(String(a));
      };
    return s.jsx(E, {
      className: n,
      filter: m.filters,
      fullWidth: !0,
      label: "Price",
      onBlur: g,
      onChange: p,
      size: "sm",
      value: i,
    });
  },
  jt = (e) => {
    const { className: n, gridLineIndex: t, disabled: r } = e,
      o = v(),
      a = y(),
      i = h(I),
      c = h(F),
      { data: l } = j(o.symbol.getOne.queryOptions({ symbolId: i, isDemoAccount: c })),
      { quantity: u } = h(J(t)),
      [m, p] = d.useState(`${u}`);
    d.useEffect(() => {
      p(`${u}`);
    }, [u]);
    const g = (S) => {
        p(S.target.value);
      },
      f = () => {
        isNaN(Number(m)) ? p(`${u}`) : a(ze({ gridLineIndex: t, quantity: Number(m) }));
      };
    return s.jsx(U, {
      className: n,
      disabled: r,
      filter: l.filters,
      fullWidth: !0,
      label: "Quantity",
      onBlur: f,
      onChange: g,
      size: "sm",
      value: m,
    });
  },
  vt = (e) => {
    const { gridLineIndex: n } = e,
      t = h(O),
      r = n === t.length - 1;
    return s.jsxs(b, {
      alignItems: "flex-end",
      container: !0,
      spacing: 2,
      children: [
        s.jsx(b, {
          xs: !0,
          children: s.jsx(d.Suspense, {
            fallback: s.jsx(G, { height: 36, variant: "rectangular", width: 200 }),
            children: s.jsx(yt, { gridLineIndex: n }),
          }),
        }),
        s.jsx(b, {
          xs: !0,
          children: s.jsx(d.Suspense, {
            fallback: s.jsx(G, { height: 36, variant: "rectangular", width: 200 }),
            children: s.jsx(jt, { disabled: r, gridLineIndex: n }),
          }),
        }),
        s.jsx(b, { xs: "auto", children: s.jsx(bt, { gridLineIndex: n }) }),
      ],
    });
  },
  Et = () => {
    const e = y(),
      n = h(O),
      t = () => {
        e(Re({ price: 1, quantity: 1 }));
      },
      r = (o) => n.length - 1 - o;
    return s.jsxs(b, {
      container: !0,
      spacing: 2,
      children: [
        s.jsx(b, { xs: 12, children: n.map((o, a) => s.jsx(vt, { gridLineIndex: r(a) }, a)) }),
        s.jsx(b, { xs: 12, children: s.jsx(_, { onClick: t, children: "Add" }) }),
      ],
    });
  },
  Ct = ({ baseCurrencyAmount: e, quoteCurrencyAmount: n, totalInQuoteCurrency: t }) => {
    const r = h(I),
      { baseCurrency: o, quoteCurrency: a } = Z(r);
    return s.jsxs(H, {
      children: [
        s.jsxs("span", { children: [e, " ", o] }),
        s.jsx("span", { children: " + " }),
        s.jsxs("span", { children: [n, " ", a] }),
        s.jsx("span", { children: " ≈ " }),
        s.jsxs("span", { children: [t, " ", a] }),
      ],
    });
  },
  Ot = (e) => {
    const { className: n } = e,
      t = v(),
      r = h(I),
      { quoteCurrency: o } = Z(r),
      a = h(F),
      { data: i } = j(t.symbol.price.queryOptions({ symbolId: r, isDemoAccount: a })),
      { data: c } = j(t.symbol.getOne.queryOptions({ symbolId: r, isDemoAccount: a })),
      l = h(O),
      { baseCurrencyAmount: u, quoteCurrencyAmount: m, totalInQuoteCurrency: p } = Je(c, l, i.price),
      g = "investment-field";
    return s.jsxs(L, {
      className: n,
      children: [
        s.jsx(N, { htmlFor: g, children: "Investment" }),
        s.jsx(D, { disabled: !0, endDecorator: s.jsx(s.Fragment, { children: o }), id: g, type: "number", value: p }),
        s.jsx(Ct, { baseCurrencyAmount: u, quoteCurrencyAmount: m, totalInQuoteCurrency: p }),
      ],
    });
  },
  It = (e) => {
    const { disabled: n, readOnly: t } = e,
      r = v(),
      o = h(I),
      a = h(F),
      { data: i } = j(r.symbol.getOne.queryOptions({ symbolId: o, isDemoAccount: a })),
      c = y(),
      l = h(ot),
      [u, m] = d.useState(l);
    d.useEffect(() => {
      m(l);
    }, [l]);
    const p = (f) => {
        m(f.target.value);
      },
      g = () => {
        isNaN(Number(u)) ? m(l) : c($e(u));
      };
    return s.jsx(U, {
      disabled: n,
      filter: i.filters,
      fullWidth: !0,
      label: "Quantity per grid",
      onBlur: g,
      onChange: p,
      readOnly: t,
      required: !0,
      value: u,
    });
  },
  Pt = "gridLevels",
  Ft = (e) => {
    const { disabled: n, readOnly: t } = e,
      r = y(),
      o = h(rt),
      [a, i] = d.useState(o),
      c = (u) => {
        i(u.target.valueAsNumber);
      },
      l = () => {
        Number.isInteger(a) ? r(ke(a)) : i(o);
      };
    return s.jsxs(L, {
      children: [
        s.jsx(N, { children: "Grid levels" }),
        s.jsx(D, {
          autoComplete: "off",
          disabled: n,
          name: Pt,
          onBlur: l,
          onChange: c,
          readOnly: t,
          required: !0,
          type: "number",
          value: a,
        }),
      ],
    });
  },
  St = (e) => {
    const { disabled: n, readOnly: t } = e,
      r = v(),
      o = h(I),
      a = h(F),
      { data: i } = j(r.symbol.getOne.queryOptions({ symbolId: o, isDemoAccount: a })),
      c = y(),
      l = h(nt),
      [u, m] = d.useState(`${l}`);
    d.useEffect(() => {
      m(`${l}`);
    }, [l]);
    const p = (f) => {
        m(f.target.value);
      },
      g = () => {
        u.length > 0 ? c(Ve(Number(u))) : m(`${l}`);
      };
    return s.jsx(E, {
      disabled: n,
      filter: i.filters,
      fullWidth: !0,
      label: "High price",
      onBlur: g,
      onChange: p,
      readOnly: t,
      value: u,
    });
  },
  wt = (e) => {
    const { disabled: n, readOnly: t } = e,
      r = v(),
      o = h(I),
      a = h(F),
      { data: i } = j(r.symbol.getOne.queryOptions({ symbolId: o, isDemoAccount: a })),
      c = y(),
      l = h(st),
      [u, m] = d.useState(`${l}`);
    d.useEffect(() => {
      m(`${l}`);
    }, [l]);
    const p = (f) => {
        m(f.target.value);
      },
      g = () => {
        u.length > 0 ? c(Me(Number(u))) : m(`${l}`);
      };
    return s.jsx(E, {
      disabled: n,
      filter: i.filters,
      fullWidth: !0,
      label: "Low price",
      onBlur: g,
      onChange: p,
      readOnly: t,
      value: u,
    });
  },
  zt = () =>
    s.jsxs(b, {
      container: !0,
      spacing: 2,
      children: [
        s.jsx(b, {
          md: 6,
          xs: 12,
          children: s.jsx(d.Suspense, { fallback: s.jsx(B, { withLabel: !0 }), children: s.jsx(St, {}) }),
        }),
        s.jsx(b, {
          md: 6,
          xs: 12,
          children: s.jsx(d.Suspense, { fallback: s.jsx(B, { withLabel: !0 }), children: s.jsx(wt, {}) }),
        }),
        s.jsx(b, {
          md: 6,
          xs: 12,
          children: s.jsx(d.Suspense, { fallback: s.jsx(B, { withLabel: !0 }), children: s.jsx(It, {}) }),
        }),
        s.jsx(b, { md: 6, xs: 12, children: s.jsx(Ft, {}) }),
      ],
    });
export {
  Et as A,
  Dt as B,
  Nt as F,
  Lt as G,
  Ot as I,
  zt as S,
  I as a,
  F as b,
  nt as c,
  st as d,
  rt as e,
  ot as f,
  At as g,
  B as h,
  qt as i,
  O as j,
  Tt as s,
};
