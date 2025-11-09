import {
  d as G,
  u as F,
  a as L,
  b as y,
  c as u,
  e as D,
  t as C,
  j as s,
  B as w,
  C as O,
  f as j,
  g as v,
  h as g,
  l as k,
  m as q,
  r as S,
  S as N,
  D as Q,
  n as R,
  G as l,
  o as h,
  F as z,
  H as E,
  I as T,
  R as U,
  p as H,
  J as W,
  q as J,
  v as K,
  w as M,
  x as V,
  s as X,
  k as Y,
  i as Z,
  y as _,
  K as $,
  L as ss,
  E as es,
  A as ts,
} from "./index-DTKnr6h1.js";
import {
  s as is,
  a as I,
  b as ns,
  c as os,
  d as cs,
  e as as,
  f as rs,
  g as ds,
  F as us,
  S as ls,
  A as ms,
  I as gs,
  h as ps,
  B as hs,
  i as bs,
  j as xs,
  G as ys,
} from "./SimpleGridForm-BUsQPU4Z.js";
function Ps(d) {
  const { gridLines: o, symbolId: e, exchangeAccountId: i, botName: n } = d,
    { currencyPairSymbol: c } = G(e);
  return { botId: d.botId, data: { name: n, settings: { gridLines: o }, symbol: c, exchangeAccountId: i } };
}
const Ss = () => {
    const { showSnackbar: d } = F(),
      o = L(),
      e = y(),
      i = u(is),
      { mutate: n, isPending: c } = D(
        e.gridBot.update.mutationOptions({
          onSuccess(r) {
            d("Bot updated successfully"),
              setTimeout(() => {
                o({ to: C("grid-bot/:id", r.id) });
              }, 1e3);
          },
        }),
      ),
      a = () => {
        const r = Ps(i);
        n(r);
      };
    return s.jsx(w, {
      color: "primary",
      disabled: c,
      onClick: a,
      startDecorator: c ? s.jsx(O, { size: "md" }) : null,
      type: "submit",
      variant: "outlined",
      children: "Update",
    });
  },
  js = () => {
    const d = y(),
      o = j(),
      e = u(I),
      i = u(ns),
      { data: n } = v(d.symbol.getOne.queryOptions({ symbolId: e, isDemoAccount: i }, { refetchOnWindowFocus: !1 })),
      c = u(os),
      a = u(cs),
      r = u(as),
      t = u(rs);
    if ([g(c), g(a), g(r), g(t), g(n)].includes(!0) && n) {
      const m = ds(c, a, r, Number(t), n.filters);
      o(k(m));
    }
    return s.jsxs(q, {
      sx: { padding: 0 },
      children: [
        s.jsx(us, {
          advancedForm: s.jsx(S.Suspense, {
            fallback: s.jsx(N, { height: 60, variant: "rectangular", width: "100%" }),
            children: s.jsx(ms, {}),
          }),
          simpleForm: s.jsx(ls, {}),
        }),
        s.jsx(Q, {}),
        s.jsx(R, {
          sx: { px: 2, pt: 1, pb: 2 },
          children: s.jsxs(l, {
            container: !0,
            spacing: 2,
            children: [
              s.jsx(l, {
                xs: 12,
                children: s.jsx(S.Suspense, { fallback: s.jsx(ps, { withLabel: !0 }), children: s.jsx(gs, {}) }),
              }),
              s.jsx(l, { xs: 12, children: s.jsx(hs, {}) }),
              s.jsx(l, { xs: 12, children: s.jsx(Ss, {}) }),
            ],
          }),
        }),
      ],
    });
  };
function Is(d) {
  var m, p;
  const o = y(),
    { data: e } = h(o.gridBot.getOne.queryOptions(d)),
    { data: i } = h(o.exchangeAccount.getOne.queryOptions(e.exchangeAccountId)),
    n = z(i.exchangeCode, T(e.symbol), E(e.symbol)),
    { data: c } = h(o.symbol.getOne.queryOptions({ symbolId: n, isDemoAccount: i.isDemoAccount })),
    { data: a } = h(o.symbol.price.queryOptions({ symbolId: c.symbolId, isDemoAccount: i.isDemoAccount })),
    r = a.price * 0.3,
    t = (m = e.settings.gridLines[0]) == null ? void 0 : m.price,
    b = (p = e.settings.gridLines[e.settings.gridLines.length - 1]) == null ? void 0 : p.price;
  return {
    bot: e,
    exchangeAccount: i,
    symbol: c,
    currentPrice: a,
    lowPrice: t || a.price - r,
    highPrice: b || a.price + r,
  };
}
function Bs() {
  var P;
  const { id: d } = U.useParams(),
    o = Number(d),
    { bot: e, exchangeAccount: i, symbol: n, lowPrice: c, highPrice: a, currentPrice: r } = Is(o),
    t = j();
  if (H()) {
    const x = (P = n.filters.limits.amount) != null && P.min ? n.filters.limits.amount.min * 10 : "",
      B = W(e.settings.gridLines) || x || "";
    t(J(i.id)),
      t(K(i.exchangeCode)),
      t(M(i.isDemoAccount)),
      t(V(n.symbolId)),
      t(X(B.toString())),
      t(Y(c)),
      t(Z(a)),
      t(_(e.name)),
      t($(e.id)),
      t(ss(e.settings.gridLines));
  }
  const m = u(I),
    p = u(bs),
    A = (x) => t(ts(x)),
    f = u(xs);
  return s.jsx(l, {
    container: !0,
    spacing: 2,
    children: s.jsxs(es, {
      children: [
        s.jsx(l, {
          md: 9,
          children: s.jsx(ys, {
            barSize: p,
            defaultPrice: r,
            gridLines: f,
            onBarSizeChange: A,
            symbolId: m,
            isDemoAccount: i.isDemoAccount,
          }),
        }),
        s.jsx(l, { md: 3, children: s.jsx(js, {}) }),
      ],
    }),
  });
}
export { Bs as default };
