import {
  d as F,
  u as C,
  a as w,
  b,
  c as r,
  e as O,
  t as L,
  j as s,
  B as q,
  C as v,
  f as j,
  g as P,
  h as u,
  s as A,
  i as B,
  k as I,
  l as k,
  m as N,
  r as S,
  S as z,
  D as Q,
  n as T,
  G as l,
  o as y,
  p as E,
  q as R,
  v as W,
  w as H,
  x as M,
  y as U,
  z as J,
  E as K,
  A as V,
} from "./index-DTKnr6h1.js";
import {
  s as X,
  a as G,
  b as D,
  c as Y,
  d as Z,
  e as _,
  f as $,
  g as ss,
  F as es,
  S as ts,
  A as is,
  I as ns,
  h as os,
  B as cs,
  i as rs,
  j as as,
  G as ds,
} from "./SimpleGridForm-BUsQPU4Z.js";
function us(t) {
  const { gridLines: o, symbolId: n, exchangeAccountId: c, botName: i } = t,
    { currencyPairSymbol: e } = F(n);
  return { exchangeAccountId: c, data: { name: i, settings: { gridLines: o }, symbol: e } };
}
const ls = () => {
    const { showSnackbar: t } = C(),
      o = w(),
      n = b(),
      c = r(X),
      { mutate: i, isPending: e } = O(
        n.gridBot.create.mutationOptions({
          onSuccess(a) {
            t("Bot created successfully"),
              setTimeout(() => {
                o({ to: L("grid-bot/:id", a.id) });
              }, 1e3);
          },
        }),
      ),
      d = () => {
        const a = us(c);
        i(a);
      };
    return s.jsx(q, {
      color: "primary",
      disabled: e,
      onClick: d,
      startDecorator: e ? s.jsx(v, { size: "md" }) : null,
      type: "submit",
      variant: "outlined",
      children: "Create",
    });
  },
  ms = () => {
    var p;
    const t = j(),
      o = b(),
      n = r(G),
      c = r(D),
      { data: i } = P(o.symbol.getOne.queryOptions({ symbolId: n, isDemoAccount: c }, { refetchOnWindowFocus: !1 }));
    if (u(i) && i) {
      const x =
        ((p = i.filters.limits.amount) != null && p.min ? i.filters.limits.amount.min * 10 : "").toString() || "";
      t(A(x));
    }
    const { data: e } = P(
      o.gridBot.formOptions.queryOptions({ symbolId: n, isDemoAccount: c }, { refetchOnWindowFocus: !1 }),
    );
    u(e) && e && (t(B(e.highPrice)), t(I(e.lowPrice)));
    const d = r(Y),
      a = r(Z),
      m = r(_),
      g = r($);
    if ([u(d), u(a), u(m), u(g), u(i)].includes(!0) && i) {
      const h = ss(d, a, m, Number(g), i.filters);
      t(k(h));
    }
    return s.jsxs(N, {
      sx: { padding: 0 },
      children: [
        s.jsx(es, {
          advancedForm: s.jsx(S.Suspense, {
            fallback: s.jsx(z, { height: 60, variant: "rectangular", width: "100%" }),
            children: s.jsx(is, {}),
          }),
          simpleForm: s.jsx(ts, {}),
        }),
        s.jsx(Q, {}),
        s.jsx(T, {
          sx: { px: 2, pt: 1, pb: 2 },
          children: s.jsxs(l, {
            container: !0,
            spacing: 2,
            children: [
              s.jsx(l, {
                xs: 12,
                children: s.jsx(S.Suspense, { fallback: s.jsx(os, { withLabel: !0 }), children: s.jsx(ns, {}) }),
              }),
              s.jsx(l, { xs: 12, children: s.jsx(cs, {}) }),
              s.jsx(l, { xs: 12, children: s.jsx(ls, {}) }),
            ],
          }),
        }),
      ],
    });
  };
function hs() {
  const t = b(),
    { data: o } = y(t.exchangeAccount.list.queryOptions()),
    n = o[0],
    { data: c } = y(t.symbol.list.queryOptions({ exchangeCode: n.exchangeCode, isDemoAccount: n.isDemoAccount })),
    i = c.find((m) => m.currencyPair === "BTC/USDT") || c[0],
    { data: e } = y(t.symbol.price.queryOptions({ symbolId: i.symbolId, isDemoAccount: n.isDemoAccount })),
    {
      data: { lowPrice: d, highPrice: a },
    } = y(t.gridBot.formOptions.queryOptions({ symbolId: i.symbolId, isDemoAccount: n.isDemoAccount }));
  return { exchangeAccount: n, symbol: i, currentPrice: e, lowPrice: d, highPrice: a };
}
function ps() {
  var h;
  const { exchangeAccount: t, symbol: o, lowPrice: n, highPrice: c, currentPrice: i } = hs(),
    e = j();
  if (E()) {
    const x = (h = o.filters.limits.amount) != null && h.min ? o.filters.limits.amount.min * 10 : "";
    e(R(t.id)),
      e(W(t.exchangeCode)),
      e(H(t.isDemoAccount)),
      e(M(o.symbolId)),
      e(A(x.toString() || "")),
      e(I(n)),
      e(B(c)),
      e(U(J()));
  }
  const a = r(G),
    m = r(D),
    g = r(rs),
    f = (x) => e(V(x)),
    p = r(as);
  return s.jsx(l, {
    container: !0,
    spacing: 2,
    children: s.jsxs(K, {
      children: [
        s.jsx(l, {
          md: 9,
          children: s.jsx(ds, {
            barSize: g,
            defaultPrice: i,
            gridLines: p,
            onBarSizeChange: f,
            symbolId: a,
            isDemoAccount: m,
          }),
        }),
        s.jsx(l, { md: 3, children: s.jsx(ms, {}) }),
      ],
    }),
  });
}
export { ps as default };
