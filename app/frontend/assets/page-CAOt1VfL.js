import {
  b as p,
  o as l,
  F as N,
  H as T,
  I as k,
  u as v,
  a as q,
  c as o,
  az as R,
  e as z,
  t as Q,
  d as w,
  aA as G,
  f as H,
  p as M,
  aB as U,
  aC as J,
  aD as K,
  aE as V,
  aF as W,
  aG as X,
  aH as Y,
  aI as Z,
  aJ as _,
  aK as $,
  aL as ee,
  aM as te,
  aN as se,
  aO as ae,
  aP as ne,
  aQ as oe,
  aR as ce,
  aS as re,
  aT as ie,
  aU as de,
  aV as ue,
  aW as le,
  j as s,
  G as m,
  E as me,
  aX as ye,
  aY as I,
  r as be,
  aZ as ge,
  a_ as pe,
  a$ as he,
  b0 as xe,
  S as Se,
  n as fe,
  b1 as Ie,
  b2 as Pe,
  b3 as Ae,
  m as Oe,
  D as je,
  b4 as Be,
  b5 as Ee,
} from "./index-DTKnr6h1.js";
function De(r) {
  const n = p(),
    { data: a } = l(n.dcaBot.getOne.queryOptions(r)),
    { data: t } = l(n.exchangeAccount.getOne.queryOptions(a.exchangeAccountId)),
    c = N(t.exchangeCode, k(a.symbol), T(a.symbol)),
    { data: i } = l(n.symbol.getOne.queryOptions({ symbolId: c, isDemoAccount: t.isDemoAccount })),
    { data: u } = l(n.symbol.price.queryOptions({ symbolId: i.symbolId, isDemoAccount: t.isDemoAccount }));
  return { bot: a, exchangeAccount: t, symbol: i, currentPrice: u };
}
function Ce() {
  const { showSnackbar: r } = v(),
    n = q(),
    a = o(R),
    t = p(),
    { mutate: c, isPending: i } = z(
      t.dcaBot.update.mutationOptions({
        onSuccess(e) {
          r("Bot created successfully"),
            setTimeout(() => {
              n({ to: Q("dca-bot/:id", e.id) });
            }, 1e3);
        },
      }),
    );
  return {
    isPending: i,
    handleSubmit: () => {
      const e = Fe(a);
      c(e);
    },
  };
}
function Fe(r) {
  const {
      entryOrderType: n,
      entryOrderQuantity: a,
      entryConditions: t,
      takeProfitPercent: c,
      stopLossPercent: i,
      stopLossEnabled: u,
      safetyOrders: e,
      symbolId: h,
      exchangeAccountId: b,
      botName: g,
    } = r,
    { currencyPairSymbol: y } = w(h);
  return {
    botId: r.botId,
    data: {
      name: g,
      settings: {
        entry: { type: n, quantity: Number(a), conditions: t },
        tp: { percent: c },
        sl: u ? { percent: i } : void 0,
        safetyOrders: e,
      },
      symbol: y,
      exchangeAccountId: b,
    },
  };
}
function Ne() {
  var S, f;
  const { id: r } = G.useParams(),
    n = Number(r),
    a = p(),
    { bot: t, exchangeAccount: c, symbol: i, currentPrice: u } = De(n),
    e = H();
  M() &&
    (e(U(t.id)),
    e(J(c.id)),
    e(K(c.exchangeCode)),
    e(V(c.isDemoAccount)),
    e(W(i.symbolId)),
    e(X(t.name)),
    e(Y(t.settings.entry.quantity.toString())),
    e(Z(t.settings.entry.type)),
    e(_(t.settings.entry.conditions)),
    e($(t.settings.tp.percent)),
    e(ee(((S = t.settings.sl) == null ? void 0 : S.percent) || 0)),
    e(te(!!((f = t.settings.sl) != null && f.percent))),
    e(se(t.settings.safetyOrders)));
  const b = o(ae),
    { data: g } = l(a.exchangeAccount.getOne.queryOptions(b)),
    y = o(ne),
    x = o(oe),
    { data: P } = l(a.symbol.getOne.queryOptions({ symbolId: y, isDemoAccount: x })),
    A = o(ce),
    O = o(re),
    j = (d) => e(Ee(d)),
    B = o(ie),
    E = o(de),
    D = o(ue),
    C = o(le),
    { handleSubmit: F, isPending: L } = Ce();
  return s.jsx(m, {
    container: !0,
    spacing: 2,
    children: s.jsxs(me, {
      children: [
        s.jsx(m, {
          md: 9,
          children: s.jsx(ye, {
            barSize: O,
            defaultPrice: u,
            safetyOrders: B,
            takeProfitPercent: E,
            stopLossPercent: C ? D : void 0,
            onBarSizeChange: j,
            symbolId: y,
            isDemoAccount: x,
          }),
        }),
        s.jsxs(m, {
          md: 3,
          children: [
            s.jsx(I, { level: "h2", sx: { mb: 1 }, children: "Bot settings" }),
            s.jsx(be.Suspense, {
              fallback: s.jsx(Se, {
                animation: "wave",
                height: 300,
                sx: { borderRadius: 8 },
                variant: "rectangular",
                width: "100%",
              }),
              children: s.jsx(ge, {
                hideTimeframe: !0,
                defaultBot: t,
                isLoading: L,
                onSubmit: F,
                botName: A,
                onBotNameChange: (d) => e(xe(d)),
                exchangeAccount: g,
                onExchangeAccountChange: ({ id: d }) => e(he(d)),
                symbol: P,
                onSymbolChange: ({ symbolId: d }) => e(pe(d)),
              }),
            }),
          ],
        }),
        s.jsx(m, {
          md: 9,
          children: s.jsxs(fe, {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            children: [
              s.jsx(Ie, {}),
              s.jsx(Pe, {}),
              s.jsx(Ae, {}),
              s.jsxs(Oe, {
                children: [s.jsx(I, { level: "title-lg", children: "Safety orders" }), s.jsx(je, {}), s.jsx(Be, {})],
              }),
            ],
          }),
        }),
        s.jsx(m, { md: 3 }),
      ],
    }),
  });
}
export { Ne as default };
