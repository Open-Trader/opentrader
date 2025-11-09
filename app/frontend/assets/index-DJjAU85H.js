import "./index-DTKnr6h1.js";
function u() {
  const { stack: r } = new Error();
  return typeof r != "string"
    ? !1
    : r
        .split(
          `
`,
        )
        .some((t) => t.indexOf("(https.js:") !== -1 || t.indexOf("node:https:") !== -1);
}
const e = Symbol("AgentBaseInternalState");
class d extends (void 0) {
  constructor(t) {
    super(t), (this[e] = {});
  }
  createSocket(t, n, c) {
    let o = typeof n.secureEndpoint == "boolean" ? n.secureEndpoint : void 0;
    typeof o > "u" && typeof n.protocol == "string" && (o = n.protocol === "https:"), typeof o > "u" && (o = u());
    const i = { ...n, secureEndpoint: o };
    Promise.resolve()
      .then(() => this.connect(t, i))
      .then((s) => {
        if (s instanceof void 0) return s.addRequest(t, i);
        (this[e].currentSocket = s), super.createSocket(t, n, c);
      }, c);
  }
  createConnection() {
    const t = this[e].currentSocket;
    if (((this[e].currentSocket = void 0), !t)) throw new Error("No socket was returned in the `connect()` function");
    return t;
  }
  get defaultPort() {
    return this[e].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
  }
  set defaultPort(t) {
    this[e] && (this[e].defaultPort = t);
  }
  get protocol() {
    return this[e].protocol ?? (u() ? "https:" : "http:");
  }
  set protocol(t) {
    this[e] && (this[e].protocol = t);
  }
}
export { d as A };
