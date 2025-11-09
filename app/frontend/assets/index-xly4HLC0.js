import { b6 as l } from "./index-DTKnr6h1.js";
import { r as y, b as x } from "./browser-CsINfYrj.js";
import { A as m } from "./index-DJjAU85H.js";
import "./__vite-browser-external-v7f2oYTb.js";
var g = y();
function H(s) {
  return typeof s == "string" ? /^https:?$/i.test(s) : !1;
}
class P extends m {
  constructor(t, e) {
    super(e),
      (this.proxy = typeof t == "string" ? new URL(t) : t),
      (this.proxyHeaders = (e == null ? void 0 : e.headers) ?? {});
    const o = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
      a = this.proxy.port ? parseInt(this.proxy.port, 10) : this.secureProxy ? 443 : 80;
    this.connectOpts = { ...(e ? $(e, "headers") : null), host: o, port: a };
  }
  get secureProxy() {
    return H(this.proxy.protocol);
  }
  async connect(t, e) {
    const { proxy: o } = this,
      a = e.secureEndpoint ? "https:" : "http:",
      d = t.getHeader("host") || "localhost",
      f = `${a}//${d}`,
      p = new URL(t.path, f);
    e.port !== 80 && (p.port = String(e.port)), (t.path = String(p)), (t._header = null);
    const n = typeof this.proxyHeaders == "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
    if (o.username || o.password) {
      const i = `${decodeURIComponent(o.username)}:${decodeURIComponent(o.password)}`;
      n["Proxy-Authorization"] = `Basic ${l.from(i).toString("base64")}`;
    }
    n["Proxy-Connection"] || (n["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close");
    for (const i of Object.keys(n)) {
      const u = n[i];
      u && t.setHeader(i, u);
    }
    let r;
    this.secureProxy ? (r = (void 0)(this.connectOpts)) : (r = x.connect(this.connectOpts));
    let c, h;
    return (
      t._implicitHeader(),
      t.outputData &&
        t.outputData.length > 0 &&
        ((c = t.outputData[0].data),
        (h =
          c.indexOf(`\r
\r
`) + 4),
        (t.outputData[0].data = t._header + c.substring(h))),
      await g.once(r, "connect"),
      r
    );
  }
}
P.protocols = ["http", "https"];
function $(s, ...t) {
  const e = {};
  let o;
  for (o in s) t.includes(o) || (e[o] = s[o]);
  return e;
}
export { P as HttpProxyAgent };
