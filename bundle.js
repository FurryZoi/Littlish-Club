"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/bondage-club-mod-sdk@1.2.0/node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js
  var require_bcmodsdk = __commonJS({
    "node_modules/.pnpm/bondage-club-mod-sdk@1.2.0/node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js"(exports2) {
      var bcModSdk2 = (function() {
        "use strict";
        const o = "1.2.0";
        function e(o2) {
          alert("Mod ERROR:\n" + o2);
          const e2 = new Error(o2);
          throw console.error(e2), e2;
        }
        const t = new TextEncoder();
        function n(o2) {
          return !!o2 && "object" == typeof o2 && !Array.isArray(o2);
        }
        function r(o2) {
          const e2 = /* @__PURE__ */ new Set();
          return o2.filter(((o3) => !e2.has(o3) && e2.add(o3)));
        }
        const i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
        function c(o2) {
          a.has(o2) || (a.add(o2), console.warn(o2));
        }
        function s(o2) {
          const e2 = [], t2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set();
          for (const r3 of f.values()) {
            const i3 = r3.patching.get(o2.name);
            if (i3) {
              e2.push(...i3.hooks);
              for (const [e3, a2] of i3.patches.entries()) t2.has(e3) && t2.get(e3) !== a2 && c(`ModSDK: Mod '${r3.name}' is patching function ${o2.name} with same pattern that is already applied by different mod, but with different pattern:
Pattern:
${e3}
Patch1:
${t2.get(e3) || ""}
Patch2:
${a2}`), t2.set(e3, a2), n2.add(r3.name);
            }
          }
          e2.sort(((o3, e3) => e3.priority - o3.priority));
          const r2 = (function(o3, e3) {
            if (0 === e3.size) return o3;
            let t3 = o3.toString().replaceAll("\r\n", "\n");
            for (const [n3, r3] of e3.entries()) t3.includes(n3) || c(`ModSDK: Patching ${o3.name}: Patch ${n3} not applied`), t3 = t3.replaceAll(n3, r3);
            return (0, eval)(`(${t3})`);
          })(o2.original, t2);
          let i2 = function(e3) {
            var t3, i3;
            const a2 = null === (i3 = (t3 = m.errorReporterHooks).hookChainExit) || void 0 === i3 ? void 0 : i3.call(t3, o2.name, n2), c2 = r2.apply(this, e3);
            return null == a2 || a2(), c2;
          };
          for (let t3 = e2.length - 1; t3 >= 0; t3--) {
            const n3 = e2[t3], r3 = i2;
            i2 = function(e3) {
              var t4, i3;
              const a2 = null === (i3 = (t4 = m.errorReporterHooks).hookEnter) || void 0 === i3 ? void 0 : i3.call(t4, o2.name, n3.mod), c2 = n3.hook.apply(this, [e3, (o3) => {
                if (1 !== arguments.length || !Array.isArray(e3)) throw new Error(`Mod ${n3.mod} failed to call next hook: Expected args to be array, got ${typeof o3}`);
                return r3.call(this, o3);
              }]);
              return null == a2 || a2(), c2;
            };
          }
          return { hooks: e2, patches: t2, patchesSources: n2, enter: i2, final: r2 };
        }
        function l(o2, e2 = false) {
          let r2 = i.get(o2);
          if (r2) e2 && (r2.precomputed = s(r2));
          else {
            let e3 = window;
            const a2 = o2.split(".");
            for (let t2 = 0; t2 < a2.length - 1; t2++) if (e3 = e3[a2[t2]], !n(e3)) throw new Error(`ModSDK: Function ${o2} to be patched not found; ${a2.slice(0, t2 + 1).join(".")} is not object`);
            const c2 = e3[a2[a2.length - 1]];
            if ("function" != typeof c2) throw new Error(`ModSDK: Function ${o2} to be patched not found`);
            const l2 = (function(o3) {
              let e4 = -1;
              for (const n2 of t.encode(o3)) {
                let o4 = 255 & (e4 ^ n2);
                for (let e5 = 0; e5 < 8; e5++) o4 = 1 & o4 ? -306674912 ^ o4 >>> 1 : o4 >>> 1;
                e4 = e4 >>> 8 ^ o4;
              }
              return ((-1 ^ e4) >>> 0).toString(16).padStart(8, "0").toUpperCase();
            })(c2.toString().replaceAll("\r\n", "\n")), d2 = { name: o2, original: c2, originalHash: l2 };
            r2 = Object.assign(Object.assign({}, d2), { precomputed: s(d2), router: () => {
            }, context: e3, contextProperty: a2[a2.length - 1] }), r2.router = /* @__PURE__ */ (function(o3) {
              return function(...e4) {
                return o3.precomputed.enter.apply(this, [e4]);
              };
            })(r2), i.set(o2, r2), e3[r2.contextProperty] = r2.router;
          }
          return r2;
        }
        function d() {
          for (const o2 of i.values()) o2.precomputed = s(o2);
        }
        function p() {
          const o2 = /* @__PURE__ */ new Map();
          for (const [e2, t2] of i) o2.set(e2, { name: e2, original: t2.original, originalHash: t2.originalHash, sdkEntrypoint: t2.router, currentEntrypoint: t2.context[t2.contextProperty], hookedByMods: r(t2.precomputed.hooks.map(((o3) => o3.mod))), patchedByMods: Array.from(t2.precomputed.patchesSources) });
          return o2;
        }
        const f = /* @__PURE__ */ new Map();
        function u(o2) {
          f.get(o2.name) !== o2 && e(`Failed to unload mod '${o2.name}': Not registered`), f.delete(o2.name), o2.loaded = false, d();
        }
        function g(o2, t2) {
          o2 && "object" == typeof o2 || e("Failed to register mod: Expected info object, got " + typeof o2), "string" == typeof o2.name && o2.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o2.name);
          let r2 = `'${o2.name}'`;
          "string" == typeof o2.fullName && o2.fullName || e(`Failed to register mod ${r2}: Expected fullName to be non-empty string, got ${typeof o2.fullName}`), r2 = `'${o2.fullName} (${o2.name})'`, "string" != typeof o2.version && e(`Failed to register mod ${r2}: Expected version to be string, got ${typeof o2.version}`), o2.repository || (o2.repository = void 0), void 0 !== o2.repository && "string" != typeof o2.repository && e(`Failed to register mod ${r2}: Expected repository to be undefined or string, got ${typeof o2.version}`), null == t2 && (t2 = {}), t2 && "object" == typeof t2 || e(`Failed to register mod ${r2}: Expected options to be undefined or object, got ${typeof t2}`);
          const i2 = true === t2.allowReplace, a2 = f.get(o2.name);
          a2 && (a2.allowReplace && i2 || e(`Refusing to load mod ${r2}: it is already loaded and doesn't allow being replaced.
Was the mod loaded multiple times?`), u(a2));
          const c2 = (o3) => {
            let e2 = g2.patching.get(o3.name);
            return e2 || (e2 = { hooks: [], patches: /* @__PURE__ */ new Map() }, g2.patching.set(o3.name, e2)), e2;
          }, s2 = (o3, t3) => (...n2) => {
            var i3, a3;
            const c3 = null === (a3 = (i3 = m.errorReporterHooks).apiEndpointEnter) || void 0 === a3 ? void 0 : a3.call(i3, o3, g2.name);
            g2.loaded || e(`Mod ${r2} attempted to call SDK function after being unloaded`);
            const s3 = t3(...n2);
            return null == c3 || c3(), s3;
          }, p2 = { unload: s2("unload", (() => u(g2))), hookFunction: s2("hookFunction", ((o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            "number" != typeof t3 && e(`Mod ${r2} failed to hook function '${o3}': Expected priority number, got ${typeof t3}`), "function" != typeof n2 && e(`Mod ${r2} failed to hook function '${o3}': Expected hook function, got ${typeof n2}`);
            const s3 = { mod: g2.name, priority: t3, hook: n2 };
            return a3.hooks.push(s3), d(), () => {
              const o4 = a3.hooks.indexOf(s3);
              o4 >= 0 && (a3.hooks.splice(o4, 1), d());
            };
          })), patchFunction: s2("patchFunction", ((o3, t3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            n(t3) || e(`Mod ${r2} failed to patch function '${o3}': Expected patches object, got ${typeof t3}`);
            for (const [n2, i4] of Object.entries(t3)) "string" == typeof i4 ? a3.patches.set(n2, i4) : null === i4 ? a3.patches.delete(n2) : e(`Mod ${r2} failed to patch function '${o3}': Invalid format of patch '${n2}'`);
            d();
          })), removePatches: s2("removePatches", ((o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const t3 = l(o3);
            c2(t3).patches.clear(), d();
          })), callOriginal: s2("callOriginal", ((o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to call a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3);
            return Array.isArray(t3) || e(`Mod ${r2} failed to call a function: Expected args array, got ${typeof t3}`), i3.original.apply(null != n2 ? n2 : globalThis, t3);
          })), getOriginalHash: s2("getOriginalHash", ((o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to get hash: Expected function name string, got ${typeof o3}`);
            return l(o3).originalHash;
          })) }, g2 = { name: o2.name, fullName: o2.fullName, version: o2.version, repository: o2.repository, allowReplace: i2, api: p2, loaded: true, patching: /* @__PURE__ */ new Map() };
          return f.set(o2.name, g2), Object.freeze(p2);
        }
        function h() {
          const o2 = [];
          for (const e2 of f.values()) o2.push({ name: e2.name, fullName: e2.fullName, version: e2.version, repository: e2.repository });
          return o2;
        }
        let m;
        const y = void 0 === window.bcModSdk ? window.bcModSdk = (function() {
          const e2 = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) };
          return m = e2, Object.freeze(e2);
        })() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')
One of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk);
        return "undefined" != typeof exports2 && (Object.defineProperty(exports2, "__esModule", { value: true }), exports2.default = y), y;
      })();
    }
  });

  // src/constants.ts
  var MOD_NAME = "Littlish Club";
  var REPO_URL = "https://github.com/FurryZoi/Littlish-Club";
  var DISCORD_SERVER_INVITE_LINK = "https://discord.gg/aDUvte772D";
  var DISCORD_SERVER_LW_OUTFITS_CHANNEL_LINK = "https://discord.com/channels/1253391626378674289/1356326756105195622";
  var MOD_BUTTON_POSITION = [1700, 800 - 115, 90, 90];
  var MAX_NOTE_SIZE_IN_KBYTES = 0.2;
  var MY_APPEARANCE_BUNDLE = "NobwRAcghgtgpmAXGAEgBgJwDY1gDRgDiATgPYCuADkqnAJYDmAFgC75gDCpANqcUsAC6AXzzho8GgBkoxBggIkK1ZACFSAEwCeAVUqU4/Al179kAQQDOdKADt2ABTIHiLLUnAAVLQYBKcAGM+DQ8wNwMQxDRRMG8DJFtybm5hUXFYBGQADRk5BSIyKhp1bSlSAHdDdhM+GisbezTIDJoUKDpiADEyWxYAJgBWdiUi5DaO7tJe6p5axGAwAGIAZg40AawADjARMWbJMfbiVSgAgGsAFj7hwpVUI5PzmdMBJdX1rZ2miUywAFEtHAAEZkcqWa6KW40AHA0GWZ5zMAAETgADMoEk2AQnKQXG5QnE4P4gsRIuB4VECCo0AQzNECEi6KjUXQApj3JSwKpeE95oICH9mYE2HyCCg6BpMkIxRK4ABJFhwGACflgczJCrmAIsOgANzo+NFapYLGIdCB5EVKoIhJoljQlDQxFwqT2P2hgMsAEYvTdlB64PDjLMzAtFptlhcMKprrt0gdOFAWDC/aN/oCAMpMKAaCoI0NLPqqdYXP47bHOQyG8AAeUopwNHLQADpNq7478Yd7fZD/cguxDOCHXuHI9HY98WshOkluKm7gBZCgsJj5kd9L1oZbLADs7EWUCgA2PQ1VOLxHK8PiJgWCoTnnJF9ORTJZbO4hppXJ5Z2t/yF2p/uKkpAbKCpKn+6q8OUWo6vqhrSsaprmpaUqqrayDcGgLAupOCYQHQ+jcIGg4jHcBFEYGa7ICi6KYmAeG/A45CWJYWg9gUfZgMxrHuMGLw0WiGIfgxbpTmAWZwCgVS9mmOK2BQthBkOAnIkJ9GMTQtHCVinFptJObUWpdEiZpajcCxq6yXc3KWUZ2kaWJCadBZErKWRNAueQbn2epplOZ2MCkDqQT2NZ0JBSFUy+SZbBmWANZmgwdC2FAc7hWomhaBmbjEdRQjxfOdTEDAlhSGiuk1GYxk6aJHY0EVFglZYviMKwMW1YVGX3LYGhlRVHWOfVyCNT1fWtcwlXDoJsUMYIQA==";
  var CANVAS_BABIES_APPEARANCES = [
    {
      name: "Little Baby",
      creator: "Zoi",
      bundle: "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"
    },
    {
      name: "Purple Baby",
      creator: "Luna",
      bundle: "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"
    },
    {
      name: "White Baby",
      creator: "Luna",
      bundle: "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"
    },
    {
      name: "Christmas Baby",
      creator: "Daryn Dallan",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUFFUJ4fCWDAsm1HIeroiyCg9FAtinm+FJgkBfUUHuYBodqurcPq4IVXQVV3gmIVpaFGJYBAFA4N1m6wvQm2bQB3xEht23qu5nm2sNGFjYORKTagVWTH0DUOE5DpyDe4aeqZa3AmCjDglt/Ggt83ywr8B1giyYPgwB4MQydmojZhKBEvuwrhWKMGBHBQ5hCmkSqpxZRxVdhpQANxUcHgWCdZYGDSMTa4nK2n2gvQDKwowDb/nSCVqXYwYycV0hJJiCgahQLgfZSv6bUS9BEgBjCAw8sIPOwbkFB5Y0q0dGuc6pqBWTAfPmXQ+uFkugI9Vuv1sDr3kWZlBDrFsGhG6gDhYLwBB2+G4tfeC33fQBv7fN+35y2zDINgyAHmL+McxwihM0xiGDSa8dayBs6JTD7TMs6wUc2+JXtpzp7v5cXOcMr8VdVwBsKsJt/ykKCDbmBwP0cIHX4/cw0ffOY/e9kjA6o346PSqE4QYJEDYxOKdAAPIIBQACOcAYBAvAhobJGOrcUyciIhM9CXxs8xQdPm5uDLB1tmtq8dhMcB7c1vOYTVjS1wtjsp64MxLjB6CS3/M3Dg3xpAcAgQBBsDxfzA07oXBy+JAwBFPHwBQ4IGoNDBl8Swss/7vjBPQWEsI1TQgTmJG4z98p4BQWgqAWkXaGjjDnOBv0ALfl/E2fiqt1aDFBA8QRQjBphUgqPCU48ZRgCkA2UgOYUCz3VLDM6+psLGmxBxC0BQrRkVIhxXeVUqL+lokGUM4ZByRmYjGOMCZHS2k8BgHM1pOB4FjJYAgVAKBmQcU40kestgYF5uweeqAEANhzPpYQgggA"
    },
    {
      name: "Bee Baby",
      creator: "Daryn Dallan",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUFFUHUqVvBZMZ3AQ+T5fozknK2wJgt84Kfp+AHdb1a5dT1DZ9baaHarq3D6g24L7sK4VijBgRwUOYABAhyANqQQQoNtYC2FI+0hkdqGapNmGIaQOF4SCVXyVJMmkPdClKQ4WDqAEWC2DgZlVQAakkIYUOwANAxQ72fd9v2g56VDSAmgxVQ4GDcGGf1w54fCWDAsNeljUA40uVXSAWFCWEjcOTH0eNUNT1ncCEtoWgUVptjd2LXcamIAOqtbALK0LaJGOmA+RFNT7AzIQkvC+RcNtiTiPmLYFDcNIGBOcpz1w4DaMUP9cZQBQwY/RqjO4zrXp68Dbq2AU3AmxQLLSYbgvm3IltgGD+scNw4YWXAQYxRwmRW1QD2KYWehBibMXqVQSBMf6tHBwxg6RsxMZxgmjq2uKdAbQ2QQNodDYnfpFV0IH4ayaFWC8AQNeDICFJgowDawt89BDaC3f9/xff0AP/XD2PAEd13Pd7qFEFHpxEordKoThBgkSqgvpYzlXqDN+sWwaOZakN/lzdvm3oKT93vcD93E+d9f99T82dIJd0+KBgEp58AoS5pbULwMC2FVscVum4Gy/AbOYBsDwEQ71uK8Os6IphDTAZ1UEDwHgMiJPQNgr9VIyGNl/aSiDWiyA2MgtqaCPxjzvvg7yPNoa1SQRgDAjCfpmWoWCIksIWABHBABAIAQ5BEiJAUOBYkbgQF4CGJ6R88QFioNImAsjz6bkwdg3BAFcE6LwfAsggRMSOy/nXDgJtLCZQICYR2h8uFDxHvQwydhgxyP/gjbgmIFAagoC4NR6Cr7T1IPY8eQTb6Dw4LCaQzBwQMgkdeOgft8ohX/uYOQep0Qsi8WObW7V3ztl+L+Seo8R7qncp5EQgggA="
    },
    {
      name: "Angel Baby",
      creator: "Ginger",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOljgm+FJgmq0jMOYartaQoLdb1/UAcNfXtXSCVqXYwYycVDgwDABTNTYLgdZu/W/PQ5gcABHBEr+O3SGN4Lbbtp3nXt4HCuFYowYEcFDmEKaRA2MTimpS0rewJHup63rApw1V4OsWxQBZmL3AQA3A/loObOongYLYthYJYkPQ82IgVXQVXw4GASnnwWnmXQ0hxhtQOgtI0jbbu6ruZ5jMFB53CDKCDxc9ze6hRBR6cRKj3SqEUgNqQOYoO96qatqurs1hpA4XhkYWgUVpkaRHF/RRgORtRAZBqG4aDvrLFxgmjq2sjObWoaFBNQABHYhgIaQNsEKS5TuymdAIA2Ob6bjeL3ITxNQAosNpWAADqGByHIWC2DgABq2DcGuJyttTDzML8v5qswCLB4aUAULVSWIwSZdU5SDIwmqHAMgBDywkSDYcNdJcWbhmKpW8FkEL3Sc4JYRK12CDzgswDJqtj3d4DA81kxYtiYtJg9lwgVlL2ZgKdZzDy/GqDKTd3mUEGD2zFRZGDUEplgcBQBCWBfE+c9CDxqmqxdiTcEC8BDMvaODx0Z4FsBgAgACYBAL3huamDIDrMA4CdKaqlUAWTfjfO+VAH5PxflgrO74wSIN+Cg5ug1SHkN5mFSC90/DCxlC9CIKEfZcTiiXABFAizALeFwnhlgi7rmzmCcE35xHZRuFwKAlhIG1WkbIgg49hHEM5rCOE9df7Xm6M/eR7JbDKKIQfBkv5YSwjVA8LR01UAxxHv3Os5hk4YG4LY5OcDs513MB2B4vZhCCCAA=="
    },
    {
      name: "Princess Baby",
      creator: "Fuffa",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOlhricrbAmCjC/ow4J9QBjBEg24Kwg8AHMOC36/L2FVqXYwYycVGoUC4bVvhSYLML+TBEhwCJzagFm4ZiqVvMdWKWBZMaSRgcjtYCm2ghw5gcLCL0AWqDwNrC0jSAdYk3FV+V4IGASnnwWnmXQEDcOGnoaB175gmq9ANr85jtaCqPo5je6hRBR6cRKgRwUOYQppE0TxapqCwzAIZLdDdO8Izynrp1lLSA80gcLzAPXt0FCvHWHDsrY4IbW2bkFB53CDDLctEHSCV0DeFCWNixUOBgBBkDAljHI90vuZ56qm/L+NhZBYowaT0qhOeDakAEiGkBsKDfKQ3pRKhmrarq8tYaQOF4ZGFoFFaZGkRxJHup6PuRtRAZBqG4aDknLFxgmjq2uKdC2A2AT0Bs3xUGwNPedIUAYhg0ki60sgbOiUxS11oIMhw4INuYksq7Tho17VjmuJ4wpt5Sv5fr8RLjeBwrhaEADyjNQLGDpOBOsb6l+1OCEAA="
    },
    {
      name: "Hello Kitty Baby",
      creator: "Tiana",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOlhricrbAmCDzML+3x9QBDxDcNg0PAyDbjQiFV0NIUAULV0hYJiWC2Fg7WAhS3UNowDw7VNYk3A4djBjJxUahQLiWOCb6baCQ2MIwHBgdNqAWbhmKpW8b1YpYFkxpJGByOtG5dXdvX9UuoIMr8HDfLD+3XnQVX5XggYBKefBaeZdAQNw4aehoHXvmC9Ck2TAFk+T4HCuFYowYEcFDmEKaRMwMTinQf36JYsg1fFql4q8dbSBgdhYMcG2bg8227Q8CMJTNc3o9JQutLIGzolMN1S+DA10grqAUVQd4JiFaVgP4OCtYDN5YNw2IvfWzJWU5my1RwFAEDy2ug1+ftsNTA6hAA8ggGLhlhAB0sL895qJQGjGNQAo7XmwA0vjGC2Ay3PA51lLSzte2kKClOk/LAtgEbDgYNwYafXWDgwDABTNTYLg+wXMvF2C3Y7eY7Wgg9v7gowg89X1evqpq2q6tw+q/EhYWQXTfgM9KoThIDKANjEJHup63pdcjD7rFsUAWctrjXcY1V4Gf6ieFnq2/VfBDNiIwiCEAA==="
    },
    {
      name: "Latex Baby",
      creator: "Furude nya",
      bundle: "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"
    },
    {
      name: "Red Bow Baby",
      creator: "Zoi",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOynrq2wJgl+3X8aCv6MPQg29d8jDfL+Y0IhVdAUVQDgYNwYapW80hJJizU2C4b4UmC9Bqrtu0Ab8UJDQBsIBL+4KwkSAHSA84IPIw/62mh2q6tw+q/Kq17TZ6VB3gmIVpbcUC2KeDgYpqWDqBAFA4FtbZuQUHnvewiPI4MfW/vQ3UAU2ePNs9mqvZhKDMPuwrhaEADyIbqLGDpOBOsZHsDoNFohpA3hgBAUAhBrgwEkPqFTCbbMgRJIQLQtQG6tig2YEukOseHRPFqmoDN/0PkuQMNCyLJfGZgLbaCe1DWwhPoW9+rguTA5ijBgRwUOYQppEDYxBaBRWm2MM4DojRECIU2oFV+V4IGASnnwWnmXQK1ywoJjcPoHBwFqRsbp1oL0FjrDMABDwPObAFEsdg17qFEEs+KsHSqE4QYJEqsh7crx1rIcvc2uJwdZSX4l+q7meXSCV0BZuGYktdYT1ilgF+175deCDYr+CpcSydo/q2AVkwDJxU3voCh7wfvdL6C5ifYNDKTWJNwzZMfS1eDcgOnIN7hp6pnw9nzBYydUgoIGyflAadKE+cAJ/nBN8GBlcXoYXeoOIkdtKYu1rk7euLtG7uxiBZbmDgYCWEdIaCgxCVCbVtDhPCIIZqeD4JYGA7A6EMJgL2X0/paJBlDBgQhxC2zonIaobYwd741BYVARhOs3jmHqu9RqCgegg1PL/SkQF1EUHgUTRBNtUGQWprTKA9NeGxj4OGLCqRBBAA"
    },
    {
      name: "Pink Bow Baby",
      creator: "Zoi",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUFFUA4GDcGGqVvNISSYgoGoUC4b4UmCarMCBDJrmCjCwkSDyMBwAGwgEv7gsNAHSA84Kjf+tpodqurcPqvyqtedBVXeCYhWltxQLYp4OBimpYOoEAUDgnVtm5BQeRt7CPc9gyguY0LSIwjAAQ8AOA3uYCrRhG2Dsw+7CuFoQAPIhuosYOk4E6xkex2nUWiGkDeGAEBQCEGudASXeosMJtsyBEkhxOk1Abq2KdZjU6Q6x4dE8Wqage33ngS5HQ0LIsl8ZmAl1oIA4wDYLcDoPrfq4JQwOYowYEcFDmEKaRA2MQWgUVptjdOA6I0RAiBV3QUK8dayIzeMDWLm5qmqHYMkSr3uZ5dIJbtnpUJMfSyaFTkOnIN7hp6pn3cC3UPNNDJqgBQvJyyScp6npCgunqcrZqa2YSgRJKzDGvirB0qhOEGDazEFl4w4MCWI6hoUE3KgdbaOF4SCVWeHwlgwOwvf9zAva+v6tFBqGGAN03bbom3qjbObYk3MPUAD/zbzmHIeroiyCg9Cdp7R5SQHnxQst52DCvF5BcMI1ASMz7GfDhlhnPeRwvAPkHO97xQA+aoxyWHduuVsMdQQMiGtLB4CILaoG/vlPAgYAinj4FpcydBZAbEJJiVB6CoCYMdpAnszBzDmAZPA1eNQyCBExNwDExwjrmFsFgGgEB7jcDoViRhaDT5gg4MNDgIj/oPDVIweg/FPr0AbOYDgvYEFgCsjAGSxVWHsIwJwqA3BZD5VFhuSBEjmAcAeGBJRFlcKYganWc6LwFB4EbhgJcJDKQPD+AyGWIhBBAA==="
    },
    {
      name: "Cinnamorolls Baby",
      creator: "Tiana",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOynrq2wJgr+DyMLC0j/KQoJqr+arMAyDIAbCjCMA2jDmAiFV0FZMAycV5i2Ji0kWTGFAIMtq0nB1lIMt8J0MhwC1iTcVX5XggYBKefBaeZdAQNw4aehoh3vmC0jSGqRIPEuoJ/QDQN7qFEFHpxEqBHBQ5hCmkTMKki0yFAFC1RZGA5go0hYJiWC2FgS6AhSv3/YDvZo6FdjBgdaWGkkmLNTYLhvuToKMPQ5j0NI4IAWq4IAwDAHSMw0iA8wYuU+DdIJUtuGYpYMxNMV6wwJYGAWUrZlk5uoNUxDYWQWKMFw9KoThBgkTRPFqmoDrWL9EUWO60SHMG7L1NXTUPJWU5my1RwFAEDynudaCX7R2w4HCuFoQAPIIBi4ZYQAdLC9veRRVCTHI1ncM5L2O1QFDJAAanGGPBrYOAAOq9BHlK/IwHDgg8Hvyw7YBO8rtXQE5WAYC8Dh0woeCa8c+uRw80gPBwDxqjLYM+9er28CGDNvA8WDBbYGAEG9MBb3rG6R4bcs06iUD3Y9UAKEujO+BiQRfAy+iWGu32c5fa8K3JQIm0MTHEZutLANAID3G4GQIB3AQHNwpqvFeRtBp/0uuvPErw6zSAwHYYeiCQbewwQA94t8AgPSLE9AWxUP5QEbjkbY7UfqgnMMwcwDJpCMAAmwjhXCFqCCAA"
    },
    {
      name: "Ice Princess",
      creator: "Arelia",
      bundle: "NobwRAcghgtgpmAXGAEgBgJxrWANGAcQCcB7AVwAclU4BLAcwAsAXPMAYRIBsSilgAugF9c4aPGoBlGFC5c2xclWQAhEgBMAngFUKFOH3ycefRMDABiABwARAOwBRR2AH4ACqX1FmmpOAAqmvoASnAAxrzqfmA++lGIaEJJopCwCMgKpJTUAIJEMADOADJwAGasRty81DZlUGRcrCJiadSZSrn5BcEMLGzG1ci1pfWNYM2pEhn4itnIKFAAdurFZRUcVaZgw6NNKeLpYO1zqEsrPUzrA1s7DXstU2DSsvIzWcpgalpFJADuBv1NvxLLY7GC7C4JgdqAtaEQAGKkRbMACMdgARscPrCEUirkCzJYVAA2FQAZisDkh+1a8ygcJUUDCAGsUQBWTFvDp0hlM5mAkw1Op3cY0x4OTRwdGkX4FCFck4SqUygoCwbmCxsnJstA66kPQ5KgoorHUI1qm7CsZQ2lgI0mhUfI0AJgtQpGIptj3hDVehHe1AAsuRmIw3YTbmN8JHWK4wB4SF4fNFAiFwpFovIEvhWAkRNtaKVSrQwndfNnPjwWfw4w4i+Fc4J8ChaOp0k3UK24ABJZhwGA1/A5OR/HJhZi0AButGTZjjOWYzCItHRZD7NeSBuoEFoei4cAKrsd293FH3qsqgqGVvuk0ObjIBQKmgd/u58cfz/D2xvoq3yEkRg4BQAFj2QBNFnIRYLw2K8fw9KN408AxZ3AOtSgbYESigAow2EL1DhjU15jgKAokvQZ4N2P872oFQuEfMMwMrRjvyIgjqHhBjWxg2YPi4sgeLY38OOQBwYBICcIkWYi7QkqSSBkijLQQ29oSGWgoC8AoABZZLcJYJwPcMNQwBwzLMtgLAcHJHHhPT8Gsik2RsdgXHcZDvHLAIgjgUIIiIeJwFiOB4jJJJRMILgZz7Qw3xOdgeFDMcwgPApeF8ZTgQseFcryqy8vyuMEyTbywFTPz00C6IQviDB8wqmpJIKNRQ3GSKcnUO5GXRTQbCINLXz46hEskpjYPVSw7B0qxiQcHBHKsOwMBRFQbDYIjhDFQ5GWWI94uxKB8SvDUchUM6zv1WjkAITTkTUX4hoDHkiBStKMrJEzLBsNAfp+q71LAAB1KB8gIHhJ2M5jwZISGYOubLiTQJGkasmwcnR9H3KQxMULKir/IzRBgt8+JEnwAB5SGiGXNsPFoXgZzKwN6RkvNN2uu193oQyQNB5gIHCZkuCZBBmMFlkRdSr6csK+ECrlgHbTcWgkskQT1mGgCNZlqw2TsewrCs2aTeJY3iVN83LcWi3bexkq8ZTXzCeq4mYlJpBEg5wGVCIKAMFk32oF11ziXhNklceIpRd2lZA791L92OyaLHOtOcgKsOs8jw5ACN0wALhMAMM1AE7tFEAH0ijIAAvWhZKVQCyL+GXbKsFEw5z6gDORTRGBIAo4Ce99JBIFl4YJDU5flrb/0+EhmsHk5AJIKGJtMU7nRyNBN6suw2Qwff5cc+EbGP3LIQEIA"
    },
    {
      name: "Hooded Onesie",
      creator: "Amy",
      bundle: "NobwRAcghgtgpmAXGAEgezQEwJYIDRgDiATmgK4AOSYAwgDZoAuAFmATWg8UsGAMQBRAGzCAYgEE2/YWMkFBIoRKkLZKmUrnTFygLoEACqQpxijAJ5JwAFXMmASnADGaYpithWiAAwE6SbwBfAgARbAAzcOwnMjoLAIIAIQYnAGsefTABSOdGDIIUbEwERGBMwuKASUY4GHywcToGAHdxJ0ZsADdseNLM8UZGYmwAIzIa+oB5TtNh4qNsVx7LRHB0LBC0ZoA7a2G6xABmAEYCjExNncSoNKQAdjONre2AWSKkE4IAGRu4AGcPqdUOcAKoUN7uI7HQIwvDgaDwaiJUZSEjkKjIehMZhtJz/P6uSzsTiuHj8KBQAAc3mpKjuAE4GYkAKxSEJwcJQWJ5eT0w580QAJjAmSMaBMZhWNjscEcLjcHgxQIAHkhoaEIlEYnEVr4wMk0Lc+gRsuFcvUKiUygUinBqrV6o0Wm0Ot1etaGoNhmMJsawNY4Mq8sgXmgYDBzACCAGg8LkF9sHQAAQ0ca4KSTCg3ZZqgjTWa2hZLXqHILBeGwEr6hhkP5wY6o0iUagAZTIPSkHC4ZNUmhF5cgleoAGkehZEsQoA2CGjm8gJ1BOyTuKVtGpdAOEVWwlAJX9Do30dQDFBth1/kvu6u+OJvLfEkIRYZjKZeuB88Q5nAi8NesdmbCFaIsgLaGqkfyPjOTYYmAoFpFGtDLmS7KctybIclycRPmAYoSm+YAfl+P45qsYCiMMTRIIK0KAYOwGwWBfwtkM2AmJg05ENBraMfY2AAObMDyiFXrwfD0oK4kCHc6GoVhG5wnRVZweBzHDGxHGzjByl/F8HJCV2pLXuI4jUsZMmYXk8lAVW1zbOxh5zqgUD6Uh153KI7mJIk/YKVu1AoFA2DEKILSmBpXHIAFQW4vihIHsSIn8JSiTJSErKii+koeJm2Z/rRfnILxIwjGg2x/AALA5MFRcQMV/ASxDmBxBkrqJIQSaI7UqIk4g9QIIQ+dZ/nePS3jeFV/lwPxgmXoZZSbkOyAABo/MQfH4JxR7zlg5hghKs0rmAADqzA9BtuGvlK/oynKriQuAFhsQEMILfRE3IOIxAwDpekHdQKEWWAr1Vu9DRfX8vECS5V5gADaHA9QoMBXZP3hNDhmwxh8O+YtYBI6emAQ9N6OHXDWEI8tq3raDiQ7V8WymH9yBk3kFNOUF5GlYw9IjPjHOkGeTNtb1lJmVZin+YFxDXGkhyQZtjk1TL6QJXN/AhCLYtswI5hwCMpDNH8wpQVtWS6/rWwIS1yFY1hoS25Zz7ipdHi2A4zh3R4AI+AQGJ6iuQQapE0TcrqSQpOkfqmuafqWhatr2gcHpOlsLpdCRydeqM4xWhu2u638rIm45OsXqrh18IchwUhSQM4/RpeF6DjfG8JGOV9XNd10NhVwHxsRQNwxcwaG4ysOXNuyUJLPYRdWWkW7soewqpH+D7YDBoHsOaiHOoJNWYH1NH7Tx8Up92jUSf9E0qftOn7r9FnPq5/luMQKxFB0P8readQ78UJ/MubdSYO27hLZABhax/CaqDSB9UiTAP+qAtmLZmBwBQIzYex4BbkDKkzTGU8wEFQIYDLBkU4BQHcBPZmyD642ToLWceCsYLJEYfgmebMQrtkJqDLhRQrauRIdjHuWQYBMGiKVZuYiOguG2Ow0BTs8JXWPsGeagRdBAA=="
    },
    {
      name: "Sunflower Bab",
      creator: "Dawn",
      bundle: "NobwRAcghgtgpmAXGAClAxgSwGabgJwHEoBzMAGjEPwHsBXAByTAEkAXOGAWXrYAsKYAMI0ANjXxJgYAMQBOOQA4AjAGYArGAC6AX3Lho8ZgEEAJnVFsAQlABGATwAi+OAGdXqwdXpNkQ8fyCIuKSiNIyjnJWjuoAYoKOcNhQFmyCMopyAOwxAEzaegawCMgAyjToANauACxetIzM5VWuQWISUrJWAKLG6urKBfqQxcyEmFAAdtY0AO6DlN6NyAASUJj4xujobq4S9p6UwR1hsjFWqjX5usOGJWArAAxKj/U+zCtwmCR8aUftoTAiWSqTAhRGRmQABkoPgSAhFg1fGArDRTPYAKoMBgENohZgAdT4mA4ghQtBx+DY9iQ4AAKvYcQAlODoCSmWlgak4jmIR46AW3UbICASGBQURvZYotH2KFzXH/fHIIkkhDgu4fdb4WK0aZyKXItYbXU0aZ4k7hLJWABscnUrxuRUhD21osmCKoSK1GxsVQtgOBKUsYKFLu69jcCy972QEbcAc6MgGclUQhtQ2d93jrmjS2ROfySstshTaYzToh9xZJAssMNzB4dECxcDSWDf1QFII1M5DOZrPZnMlfMoaT5eiBOFw6FSNNHKPE/rCWko3Ww2FZ4+Aq4emFMJR3lBW+7g7E4Ul3xlE4lmWzYmAAbiT50ewMY2Gx8JhbM3D7oNWFSBMGxUQowbEUQIYMDWlbZgg1BQCXSsUQ6FcAREVjRc0Iw4QAXg9tELDe5YlQ/dYJjaVSLocjE2QBCQyQ7MYBoB82UmCCwG6Fi2LNOigUIxjiOYeNbFoWZc040TxIo442xBISswIhTO3zD44CgDk4PowS0iY5gUBoGhsCcCZKU4tBpjwWT8NOGRjGMORlBqA1KHsxznNc2QHKclz0h8zztEockaEpXtEHpRk4BZNl8F5cBuTgXl+UFJTkE44x8BgVwoSSTs5OUjtQzSsAMqy1wmW+X5+IYvThPSzDpTWSZTByvKat04qq2YTjmtayqfny2yBJUrrNWQFA0Ncew829CapppbSRqK/Syj4OBPkkRrkRCyZ6EmGzlWWoiSqZGhXDgIRxI47atSG5VwliWJuhqRRjHSc5LmuHQtCAA"
    },
    {
      name: "Onesie",
      creator: "Reese",
      bundle: "NobwRAcghgtgpmAXGAQgGwK4GcAWYA0YA4gE4D2GADkqprgWAMJlpkk0AicAZlBmgBcwAX3zho8GgDFMASwAmWBqQrVkMjAqWFmrdsi69+Q0eNgJkAURhkBsgMZkAdsvJUa12w+cNdbTjx8giJikOY0rqo0AIIkMFgAMjxCOiz+BoHGIWaSyJHuyLHxAEqyAOY4KUxp+mCGQSahEhZg+WpgABJQTopJ3FV+tfVZpmG5rYQqBZ3diqUVAzUBRsGjzTQdAAwAnJubbRtw5ZW+S4jAALpr4cgAyjBQaGgHyChk8gCeAKqUlHDsqT0NAA6jhZAIEIQAArkP4kAQfJDgAAqHz+xTgjhI8iRYARfxxiE2whJTRuYHuj2ekzc7TenwSZAA7v9TkDznVMsErmTxl1ZCQpOQnAJtgAjF4zAVC5yLdnAMAAYikHCk0TVYB5ORa/JIKCg9gA1gAWbaS3X6o1s9IK4bc67jSwfOBYACskqdLut+gVis2AEYAwHNQ6Wp63R7nVgAEzepC+zbRxOJkO8loQWS/NAu/2SjNZr2Am2clZCLVjMPOsXkJlYXM0qJWKs17TVeUlhqp7XLTsN6YdOBQHFFn0drLl9bIDFlfhQAHEWk0ACyFAEeBH8bHwUIdrL0Nh/wRuNR6MxbEJ4GeRMIQiJojqsm43AcxkR19oZCt5wuhEsT8xt6XIQHQKBYQGdKBACSEIwPGP5gNETzMtE9h2AAbuCb7gdEAgCCQshihgEJwaS3bIMitxgvCsZ9u0jCsGucYcsqADsLEAGwABxSAwu6avuZBwkeiAomicAYliF54mJhLEqRFY0Lcg4wNmWBYIwUACFgmhVFM7S3DpTG+owxquv6XEMIqJlmRZ8EwoJh5vqJp6Sbi+JwLJJKhpwshQHCWAAMySlC3R2IWbbFoqljmcanEsV2CnIFC2BYB89YLo2YDJWpiIbhyfETuSlFwAO856TQ9lOBQTitoMm4Fd5dyfoaWD7LRinNbVZy+lI0bsaa7pXBcQA=="
    },
    {
      name: "Diapered Dolly",
      creator: "En",
      bundle: "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",
      requiredMods: ["LSCG", "Echo"]
    },
    {
      name: "Little Helper",
      creator: "Shizu",
      bundle: "NobwRAcghgtgpmAXGAwgJwPYAcAq2wA0YA4pgK5ZKoA2GALgBaGoa1pLBgAicAZlGWp1mAYgBiEyWAC6RAAqYscNHQCeScAHksUAMYBLNRwAMBAIyywmgG7K0+gCZwF+jPaOIATAE4Avr4JwaHgqACEMADsIuDozZlIMCioACShhIhRWNw4wEQBBAFFCwtEADlKzAFYAZlCZAKDYBGRk429K43jySha4fQBzBnSWNioefkFhBsgmqgBlGChqai7EnrBwh1UAVSwldgys9mQAdQZDBHlFZQ9wHFUlACU4XTcHDTA1JXfEYwCwe5KJARQTUfyBGYhZALJYrIgJJLITaqAAyGAA7spmJlRshxgIhGBpsFmmBUvo0GJMBE6J4AGyrRFkqAUqmRYY47KITgiLgFTz0zrSYmzFostChPQAa0qcXh3RS4sluil2KOYz4BKmEJJVAKqjgAGdSoz1vqjWrcTyACxmOneApxYU60Vgc3G016g2GzyWrk8wpmADs1u89RdULAz36gigBxICuQAFlEow/ccefzKp5Sr7LApsDd1Ig7g84M9XmgfuAVr8iMJfv8uPpeLx9LpJsXTBtaCqOJYCq2Xg3gJZko5mqOiOOnABJOhwGD9oh5ZYYvK6Oj6ayGYtTsB5Oh0ewAIzIC+XALLVGoxjonXBjUjEH0e2oRrlCbWVBfb4th1xbhNUmIkI1JUJqDIQ0mHlb8kUg6D0w1CZCRFSMxEgxxDU9ZAMLILCkLxYDULAvUYHodtIhwt1yK3V4IkIoCUO1J9SXNE9MHRQ1PwRM0DQ4jFsIArkmK1UDWOQsTYKZZI4Cgd5hOOUSQLQ0k5gYOBZPjXiqALCJEgiISRhE/EQKuQsVGLcBB14YcchROTEOFVTdKgw1VB4xMwDkNz1EUySVNI5BqLyNAYENBzeA5dUiOY8TIVJEKwsNR4BiGRjTJIiTguk9ZUgiBwIr4aLAMyliEqoaj8sK1LBhKkziPK3VoQwFVDQZXL5laqUjM5DNcmtOkgzMMQwyIMrw2ysBADgVQBF5UAb6zPLgsBAAbTOaAH0UTIAAvfQMsa+LmrAQBZJVm31OuQFbTs2na9v82KxJcpFBClVRmygfZqLkKAaX0f9jP6kQgwKINvCDSoyk8YGgzqIgREGuljCDLhREkKRnSmlE0jgAAPPIsGpaiUFoRgN10I1DTcPyAZyERPC4Sp0fM/ZbivJ4XjeD4vjgH4zH8J6NgwLYUAYFkIggF4pWoPRLi/JkJZVaXycInkxBQNW1dR9XtZkZmiw+Gw7AnFw3F3JBqj+AXQn0KV9AifQlqZUI0CgFXcnpxmJEmirkFnAqMDcOZqFffYjJ06EGAwf6+tp0pHS4a1ztyPJKjya00+9o68nt+BiApOE5fWYn6AYdbAApvMvAGmwrbdrdumGakOGuGqTxjEqWHcmbrg6S4INRFCW0UGtApRAZgVKhRuHqm79WxH72U05H/Nrksg3bDQewnBN9wrI2TBWqYRALfGmIWWoOIj8tgWAE1BBiCcADU4GoWw6BOOMYDTC6aBL8uK+r26ScY7clyEGIa4DmATRPnFaBUllKElgWZeBwhl4WVZtoPQZtuRmAIKYPBuCCHGGckFQW6JlRSjJhTKmRMSYMEoYaSmaBVB/wAbXe6yDDqulSieE8kRuJVXFPQxhqhqgsJrndGmICRA928MYL2cMZFyLnsKaQQA=",
      requiredMods: ["LSCG", "Echo"]
    },
    {
      name: "Blessed cutie",
      creator: "Furude nya",
      bundle: "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="
    },
    {
      name: "Baby Cow",
      creator: "Theo",
      bundle: "NobwRAcghgtgpmAXGAEgBgJxrWANGAcQCcB7AVwAclU4BLAcwAsAXPMAYRIBsSilgAugF9c4aPGoANADJQi9BPmLkqyAEIkAJgE8AqhQpw++Tjz7IA6o1rNFYAAqlDRZtqTgAKtsMAlOAGNeTXcwV0NgxDQhaNFIWARkGTkFNmVKag0daRIAdyM2U15qABE4ADMoMi5WETF46hQoWiIAMVIAO2YANgAjVNJ05EbmtpJOgu4i5ABiODgMBYwwWriJIaaiNSh/AGsARj6lAdVUDa3dibMS8srq5djxBLAAUW04HtIcgGc9/pVqV7vT5fS5TMClCpVGoPerIQE/P6DF5vEEmSbmcE3KH3OprZFwBFHf5wlEAJlBGIht2huKeLSqXERJwAsuRmIwKfxMZC7vgqdiBPhHCRnK4Ql5fAEgiFGZF8KxIiJwbQymVaP4oW45WA1DwLohBPhnqqAgrDahaJoEuaUJa4ABJWwwfiCsAAQS4PBybv8zFoADcbFrzW7mMwiLQemRbC6YrTqBBaAYuATyUSkYnkwTOch+XcVo9qABlRhwFD5dMnYXtcjtVEcdHXHk01ZPPOsSsNOBQYJoq65rH5mF43VkL4czvqLhjicN/vc6k41vUFrTy31tInVdkdc5hfYguwl4wEh+wLtJkAk9nsZ79tsYWirXgY1lU2xw94y/IN1EGBfaRyg7OcwXvT8nm/d0/y+HwGBYO9BxbQtkEgxp2k0ACgIQ5sl2QsBUKgdCYLg4DCkpRDcKPewxy+bRfknBwaLcPtQIo8DqE4HJHFoTo4E0IsSF2DdjmLQSdnrMim0XdjkE47jeM0AgeH9bMGKUkgVIkxsBxwmSGxyZ45GE4lTmaH1/AJL5eG0NMQPMYB915RzWGEYcnjdTQoS2HptGKIhLNszcOJ4dkcwc6YMDdSLIrYaY9jQeL4tivYAA49gAdgysBXPjWTcnk2xNDUIgoEg4rSpY8jdLc6hdE6EqeKML4PGsC8GPsQi/VUuyuWmTQunKVVYrQNQRpG2KWgAFhaABmWaJowFpFqWfBpkmtAZpS7AJpaXbduyvS1EjSD2BCxhzMs6ywrAaY9r25LJr2R7JrYe8+Qo11HyMMVEE8bw4D8QIiAicBVEm/AAA8kD2JVihVNUNWqLU0HwDw4AhhUdSgHy2DRjHyTynI2F1MSXSNE1fTJi0rSp20rUdOBnQNV0PS9H0/UDH6QzDCMoxjZm42XZAixTdCjCLWw4C4UwuDkSCGZgCAAh2bDpJqvLPTkTi1ClxkGIVpXdgur4rIjbrJJ0tXcsgEgvgBnj6Hlp0IFtuwLech8nG+58wAlAGpWBkIwj4pAokFvDGiIdpLI6/wVVoIwCCgR39adVlo1nC3wru/bVtJGb8/zna7ti0k9jLsvspMEqygVcAFYaORo5N2P48T5O2Dwxgm8sgACChtloV6CX8CMKD9W8UMq6hbpz3BpkLguZvnnOWnnivy/ohwvZcLUbb/KA9bAbJ9XwoUI39KB+fDMg4HwBWvt39wlT9pB2gZVH/sB6VEHfz18GZIzHoRgIBkBgMA8wewACsXQUqTQwAAoBICjwtTgCQZYel7BjG0MyGwtg6xHTFsYQgIlkAKzQhha6cUN62TWsUSa9DijF3uqtbAbCcCrVXsNdaPDh44XejhT6O8fp/UlEDEGoR/oRBhvgIscBmBYLtlyc4OxnhcB6LkDw5B/AcldCTfUDkFa/n/FXZUqp1Samhijd0npcjswDHARR1osa7DURonIWiyA6LYCgEg9AurBFchwGudcwAN2QFg9oOC8FwAITxK0xCu4kBIGUXuPR4kVkxF8UeSYJ4Xinj1GYm8K7zwYWU4oK857THYdgSpd155oB4Y03A7YWkUXPiKb2CZeAwEPmwE+KsCncUvtfIgt975OkfiIl+/034f19l/AOEjg7SKVIA8BICwEQOhjAuBCCwDrIgXhVB6DogCCAA"
    },
    {
      name: "Skunk Diaper Suit",
      creator: "NikoRandoi",
      bundle: "NobwRAcghgtgpmAXGAElATgOzgZxwBSgGMBLAMxLnQHEoBzMAGjGvQHsBXAByTAEkALnBgBZTgIAWTMAGE2AGzbokwMABE4ZKB3kDpGrTr3MAxACYAnJcvSTADgCCjx2AC6zfOy5UBATyTgAPIAblToJAAmcJ4kSiR+AagY2HhIAAzMInACUPLpAL6FjODQ8LwAovIARmwA7gAycJh0kiLxQpg40qycPMiCwmiYEV3McorKiKomAIxqc3O2MwBCKyu2agCsW1u2MuX7+7YWFnYAzDMOtg6bNzduHl4+/ojgACq+3gBKcERKEYk/N4AYg0vlmChInABjBygAPIjyDhRFT8IQwIYRCRweQRABibDh+CROCkzBhmOxuOWHEwxI4pOkFKgwypEQA0hg8uT0ZScREAMoSDAAayZvJZWP5+Gy+DYOQEbAeYECXGI8RewBmjG1up1+r1utcRRKsAQyEC4ToJEwuW67G4vGWbAivgFfnkCDGCiUKmNxUgZt4ApguW5LAdfTAztdAFUuN5lN6JrwAOoSeJesCeNiJhKvMAfb6/f6Az5wEFgk2BsrIe29XgOdAwHCNMjGWQ+ybqTTaXRgcGm2tgeuO5BNltfEh0CQd8a+5AGPt6Qc180j5g9MdJYatzRzru8JdGAcB0rr0dRzE4Kczg8pxe9k+r8/B0PycNbqMx3z1OpUaR527dNM1PId13KXw4CqdhahwMxLwqKCYLqUZOwfVRj37ZgsL0dxsyedB83ecsfj+dAQXALpQWYPoMjASYwRw8gKCIIwXno5ZFCIMUpnw8oyDIX49D4iEoT9MSohhCSwAcD86gcIgBBIYINRkhwBAEcIqg4IQ/WrV9kEg3AZkQoyoPgwDD2QEwzjOKAHKgMC114H46B0DAzLAMRdLJdCF2mMxyiCoL9Cfft8JzPMXhI4tyMosA8hosARKY9QWJINjdA45guLYHiZIEoSlJkyEUVE1AoWkiq5MUWpFOU1T82AfCNK0kgdL0viDKDZAIBIBNPRwUzN0jXh+sG3ArIfHtDH7F9esLbFfDebEYC8nNME4TppoXWbl2cwz9pPUaG2QFA4CgAFkz23DDsWriGT8r8nRJPygKPcKVzPRa8SRSI0Je5A/o4AHdu7O6FuHcoYHlTK2EwLyYbhv5EZuyZpjxPE0hxtJlSi55EiK4T9Kh9d8AZHBfBGiMzuzSn/HRz65u+8DeBQNILBxryLunWdwf0n7hxDMNHvQdAKyRqChSuuoBZsmYLiV+7oYsmmgbAYy0I+my7McpyyfZqASHQZZiBFAAWCweeN03zfl475qF9c0BNvF2EwAQAHYENO7dXfQd2EfvAKwBMAA2GZI8jtxDeQAURVpEU3mNz8xuQFOSHkd10CgLhtes6YZjsYvi9sA4K5kWPnd4eooCEOEZHrnBQY7DWBVbv9agApmpjDtYHEuJZVkHq5TAHofIsI4jC1IksKLLYECh64dUzYBR5F8Z15RwFOPy8oU2Cm3vpjOL2znDi/q7Z5AaXkEVfDUEg8572nt0IT3KALjCw7SBw/7/rYL2pwLZ2GtqYOwaRIGQNsBbM4cC4F7C9g4cOZgzjXxcsgQA8DqAH9IwAoxFvC8jIRQkh5bTDSOUChFDbBUMoeUGhdDqGmFoUw3+jD6H+hvmAQAznKADeAwA5L6AGq4wAxhEH1bmQsOdg1AWHDhYMekiZAyLkbYKRSirhT1zITAsqp1TNW1BkGYxp8iuCAA",
      requiredMods: ["Echo"]
    },
    {
      name: "Bad girl in predicament",
      creator: "Ryna (rieko)",
      bundle: "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"
    }
  ];
  var extendedABDLItemNames = [
    "AdultBabyDress1",
    "AdultBabyDress2",
    "AdultBabyDress3",
    "AdultBabyDress4",
    "PaddedMittens",
    "PawMittens",
    "Bib",
    "BabydollDress1",
    "PuffyDress",
    "FlowerDress",
    "ChangingTable",
    "Crib",
    "FoxPlush",
    "BunPlush",
    "Shark",
    "CowPrintedSocks",
    "Socks5",
    "Socks6",
    "Bonnet1",
    "Bonnet2"
  ];

  // src/styles.css
  var styles_default = `@import url('https://fonts.googleapis.com/css2?family=Emilys+Candy&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.paciCheckbox::before {
	background-image: url("https://raw.githubusercontent.com/FurryZoi/Littlish-Club/refs/heads/main/src/images/pacifier.png") !important;
	background-size: cover !important;
    clip-path: none !important;
    background-color: unset !important;
}

.lcChangelog {
    font-family: Comfortaa, sans-serif;
    padding: 0.25em;
}

.lcChangelog ul {
    padding-left: 1em;
}

.lcChangelog ul li {
    padding: 0.5em 0;
}`;

  // package.json
  var version = "1.2.0";

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/styles.css
  var styles_default2 = "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n.zcInput {\n  background: var(--tmd-element, white);\n  color: var(--tmd-text, black);\n  padding: 2vw;\n  border: 2px solid var(--tmd-accent, black);\n  border-radius: 4px;\n}\n.zcInput::placeholder {\n  color: var(--tmd-text, black);\n}\n.zcTabs {\n  display: flex;\n}\n.zcTabs button {\n  cursor: pointer;\n  width: 100%;\n  color: var(--tmd-text, black);\n  background: none;\n  border: none;\n  border-bottom: 2px solid var(--tmd-element, rgb(214, 214, 214));\n  padding: 0.25em;\n}\n.zcTabs button[data-opened=true] {\n  font-weight: bold;\n  border-bottom: 2px solid var(--tmd-accent, rgb(81, 81, 231)) !important;\n}\n.zcTabs button:hover {\n  background: var(--tmd-element, rgb(235, 235, 235));\n  border-bottom: 2px solid var(--tmd-element-hover, rgb(149, 149, 149));\n}\n.zcCard {\n  border: 2px solid var(--tmd-accent, rgb(195, 195, 195));\n  border-radius: 0.4em;\n  background: var(--tmd-element, white);\n  color: var(--tmd-text, black);\n  padding: 0.4em 2.5em 0.4em 0.4em;\n}\n.zcCard:hover {\n  border: 2px solid var(--tmd-accent-hover, rgb(170, 170, 170));\n}\n.zcCard_name {\n  font-size: 0.5em;\n  color: var(--tmd-text, rgb(100, 100, 100));\n}\n.zcCard_value {\n  color: var(--tmd-text, black);\n  margin-top: 0.4em;\n  font-weight: bold;\n}\n.zcToastsContainer {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15vw;\n  cursor: pointer;\n  position: fixed;\n  z-index: 30;\n}\n@keyframes zcToast-progress {\n  0% {\n    width: 0;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@keyframes zcSlideInFromLeft {\n  from {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes zcSlideInFromRight {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes zcSlideOutToLeft {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n}\n@keyframes zcSlideOutToRight {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n}\n@keyframes pop {\n  0% {\n    transform: scale(0.9);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.zcToast {\n  display: flex;\n  column-gap: 0.6em;\n  align-items: center;\n  max-width: 25vw;\n  border-radius: 0.15em;\n  position: relative;\n}\n.zcToast p {\n  color: white;\n}\n.zcToast > svg {\n  flex-shrink: 0;\n}\n.zcDialog {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: rgb(57, 64, 77);\n  margin: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border: none;\n  border-radius: 4px;\n  min-width: 200px;\n  max-width: 450px;\n  width: 90%;\n  height: fit-content;\n  z-index: 100;\n  pointer-events: all !important;\n  box-shadow: 0px 0px 6px 1px #0000006e;\n}\n.zcDialog > p {\n  padding: 0.75em 0px;\n  user-select: none;\n  width: 90%;\n  color: white;\n}\n.zcDialog > input:focus {\n  outline: 2px solid rgb(0, 238, 255);\n}\n.zcDialog > div > button {\n  cursor: pointer;\n  padding: 6px 14px;\n  border: none;\n  border-radius: 4px;\n  font-weight: bold;\n}\n.zcDialog > div > button:first-child {\n  background: rgba(73, 82, 99, 1);\n  color: white;\n}\n.zcDialog > div > button:first-child:hover {\n  background: rgb(86, 94, 108);\n}\n.zcDialog > div > button:last-child {\n  background: #00eeffff;\n}\n.zcDialog > div > button:last-child:hover {\n  background: rgb(4, 203, 217);\n}\n@keyframes zcSpin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes zcCursorBlink {\n  from {\n    border-right-color: transparent;\n  }\n  to {\n    border-right-color: rgb(42, 42, 42);\n  }\n}\n.zcCursor {\n  border-right: 2px solid var(--tmd-text, rgb(42, 42, 42));\n  width: fit-content;\n}\n.zcDisabled {\n  pointer-events: none;\n  opacity: 0.6;\n}\n";

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/modSdk.js
  var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/logging.js
  var logs = [];
  var Logger = class {
    get logs() {
      return logs;
    }
    pushLog(level, message) {
      this.logs.push({
        level,
        message,
        timestamp: Date.now()
      });
      console[level](`%c${MOD_DATA.key}:`, "color: #00ffe7;", ...message);
    }
    debug(...message) {
      this.pushLog("debug", message);
    }
    log(...message) {
      this.pushLog("log", message);
    }
    warn(...message) {
      this.pushLog("warn", message);
    }
    error(...message) {
      this.pushLog("error", message);
    }
  };
  var logger = new Logger();

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/modSdk.js
  var HookPriority = /* @__PURE__ */ ((HookPriority2) => {
    HookPriority2[HookPriority2["OBSERVE"] = 0] = "OBSERVE";
    HookPriority2[HookPriority2["ADD_BEHAVIOR"] = 1] = "ADD_BEHAVIOR";
    HookPriority2[HookPriority2["MODIFY_BEHAVIOR"] = 5] = "MODIFY_BEHAVIOR";
    HookPriority2[HookPriority2["OVERRIDE_BEHAVIOR"] = 10] = "OVERRIDE_BEHAVIOR";
    HookPriority2[HookPriority2["TOP"] = 100] = "TOP";
    return HookPriority2;
  })(HookPriority || {});
  var modSdk;
  function createModSdk() {
    modSdk = import_bondage_club_mod_sdk.default.registerMod({
      name: MOD_DATA.name,
      fullName: MOD_DATA.fullName,
      version: MOD_DATA.version,
      repository: MOD_DATA.repository
    });
  }
  function hookFunction(functionName, priority, hook) {
    if (!modSdk) throw new Error("zois-core is not registered");
    try {
      return modSdk.hookFunction(functionName, priority, hook);
    } catch (e) {
      logger.error(e);
      return () => {
      };
    }
  }
  function findModByName(name) {
    return !!import_bondage_club_mod_sdk.default.getModsInfo().find((m) => m.name === name);
  }

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shard-modules/shardModule.js
  var ShardModule = class {
    overrideContext(context, target) {
      return context;
    }
    layoutEffect(context, target) {
    }
    effect(context, target) {
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shard-modules/styleModule.js
  var StyleModule = class extends ShardModule {
    constructor(style) {
      super();
      this.style = style;
    }
    style;
    applyStyle(target, style) {
      for (const styleProperty of Object.keys(style)) {
        if (!isNaN(styleProperty) || typeof style[styleProperty] === "function" || typeof style[styleProperty] === "undefined") continue;
        target.style[styleProperty] = style[styleProperty];
      }
    }
    layoutEffect(context, target) {
      this.applyStyle(target, this.style);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shard-modules/dynamicClassModule.js
  var DynamicClassModule = class extends ShardModule {
    constructor(style) {
      super();
      this.style = style;
    }
    style;
    layoutEffect(context, target) {
      addDynamicClass(target, this.style);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/shard.js
  var Shard = class {
    constructor(context) {
      this.context = context;
      this.body = this.generateBody();
      this.processModules("overrideContext");
      this.processModules("layoutEffect");
    }
    context;
    body = null;
    get mountReturnValue() {
      return this.body?.base ?? null;
    }
    mount(parentElement = this.context.parent ?? document.body) {
      parentElement.append(this.body.base);
      this.update();
      this.processModules("effect");
      window.addEventListener("resize", () => this.update());
      const onUnload = (event) => {
        if (!(event instanceof SubscreenUnloadedEvent)) return;
        this.body.base.remove();
        window.removeEventListener("zois-core:subscreenunloaded", onUnload);
      };
      window.addEventListener("zois-core:subscreenunloaded", onUnload);
      return this.mountReturnValue;
    }
    processModules(stage) {
      const modules = this.context.modules ?? {};
      if (stage === "overrideContext") {
        for (const key of Object.keys(modules)) {
          for (const module2 of modules[key] ?? []) {
            if (module2 instanceof ShardModule) {
              if (this.body?.[key]) {
                try {
                  this.context = module2.overrideContext(this.context, this.body[key]);
                } catch (e) {
                  logger.error("OverrideContext call failed in", module2, e);
                }
              }
            }
          }
        }
      }
      if (stage === "layoutEffect") {
        for (const key of Object.keys(modules)) {
          for (const module2 of modules[key] ?? []) {
            if (module2 instanceof ShardModule) {
              if (this.body?.[key]) {
                try {
                  module2.layoutEffect(this.context, this.body[key]);
                } catch (e) {
                  logger.error("LayoutEffect call failed in", module2, e);
                }
              }
            }
          }
        }
      }
      if (stage === "effect") {
        for (const key of Object.keys(modules)) {
          for (const module2 of modules[key] ?? []) {
            if (module2 instanceof ShardModule) {
              if (this.body?.[key]) {
                try {
                  module2.effect(this.context, this.body[key]);
                } catch (e) {
                  logger.error("Effect call failed in", module2, e);
                }
              }
            }
          }
        }
      }
    }
    update() {
      const { x, y, anchor, padding, width, height } = this.context;
      if (typeof x === "number" && typeof y === "number") setPosition(this.body.base, x, y, anchor);
      if (padding) setPadding(this.body.base, padding);
      if (width) this.body.base.style.width = getRelativeWidth(width) + "px";
      if (height) this.body.base.style.height = getRelativeHeight(height) + "px";
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/backNextButtonShard.js
  var BackNextButtonShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {
          display: "flex",
          columnGap: "2vw",
          justifyContent: "center",
          alignItems: "center",
          background: "var(--tmd- element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, black)",
          borderRadius: "4px"
        }
      };
    }
    get dynamicClassButton() {
      return {
        base: {
          cursor: "pointer",
          background: "var(--tmd-element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, rgb(34, 34, 34))",
          borderRadius: "6px"
        },
        hover: {
          background: "var(--tmd-element-hover, #ebf7fe)",
          borderColor: "var(--tmd-accent-hover, #7dd3fc)",
          color: "var(--tmd-accent-hover, #015a8c)"
        },
        disabled: {
          background: "var(--tmd-element-disabled, #ffa590)",
          pointerEvents: "none"
        }
      };
    }
    generateBody() {
      const { onChange, isDisabled } = this.context;
      const div = document.createElement("div");
      addDynamicClass(div, this.dynamicClassContainer);
      setFontFamily(div, MOD_DATA.fontFamily);
      let currentIndex = this.context.currentIndex;
      let items = this.context.items;
      const updateClasses = () => {
        if (currentIndex === 0 || typeof isDisabled === "function" && isDisabled(items[currentIndex - 1][1])) backBtn.disabled = true;
        else backBtn.disabled = false;
        if (currentIndex === items.length - 1 || typeof isDisabled === "function" && isDisabled(items[currentIndex + 1][1])) nextBtn.disabled = true;
        else nextBtn.disabled = false;
        ;
      };
      const backBtn = document.createElement("button");
      backBtn.style.cssText = `
                position: absolute; left: 1vw; font-size: 3.5vw; aspect-ratio: 1/1;
                height: 140%; background-image: url("Icons/Prev.png"); background-size: 100%;
                `;
      addDynamicClass(backBtn, this.dynamicClassButton);
      backBtn.addEventListener("click", () => {
        if (currentIndex === 0) return backBtn.classList.add("zcDisabled");
        if (typeof isDisabled === "function" && isDisabled(items[currentIndex - 1][1])) return backBtn.classList.add("zcDisabled");
        currentIndex--;
        text.textContent = items[currentIndex][0];
        if (typeof onChange === "function") onChange(items[currentIndex][1]);
        updateClasses();
      });
      const nextBtn = document.createElement("button");
      nextBtn.style.cssText = `
                position: absolute; right: 1vw; font-size: 3.5vw; aspect-ratio: 1/1;
                height: 140%; background-image: url("Icons/Next.png"); background-size: 100%;
                `;
      addDynamicClass(nextBtn, this.dynamicClassButton);
      nextBtn.addEventListener("click", () => {
        if (currentIndex === items.length - 1) return nextBtn.classList.add("zcDisabled");
        if (typeof isDisabled === "function" && isDisabled(items[currentIndex + 1][1])) return nextBtn.classList.add("zcDisabled");
        currentIndex++;
        text.textContent = items[currentIndex][0];
        if (typeof onChange === "function") onChange(items[currentIndex][1]);
        updateClasses();
      });
      updateClasses();
      const text = document.createElement("b");
      text.textContent = items[currentIndex][0];
      div.append(backBtn, text, nextBtn);
      return {
        base: div,
        backButton: backBtn,
        nextButton: nextBtn,
        text
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/defaultAttributes.mjs
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/createElement.mjs
  var createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children?.length) {
      children.forEach((child) => {
        const childElement = createSVGElement(child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  var createElement = (iconNode, customAttrs = {}) => {
    const tag = "svg";
    const attrs = {
      ...defaultAttributes,
      ...customAttrs
    };
    return createSVGElement([tag, attrs, iconNode]);
  };

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/book-text.mjs
  var BookText = [
    [
      "path",
      { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
    ],
    ["path", { d: "M8 11h8" }],
    ["path", { d: "M8 7h6" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/check.mjs
  var Check = [["path", { d: "M20 6 9 17l-5-5" }]];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/chevron-down.mjs
  var ChevronDown = [["path", { d: "m6 9 6 6 6-6" }]];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/circle-alert.mjs
  var CircleAlert = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/circle-check.mjs
  var CircleCheck = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m9 12 2 2 4-4" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/circle-x.mjs
  var CircleX = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "m9 9 6 6" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/external-link.mjs
  var ExternalLink = [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "M10 14 21 3" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/info.mjs
  var Info = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 16v-4" }],
    ["path", { d: "M12 8h.01" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/rotate-ccw.mjs
  var RotateCcw = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
    ["path", { d: "M3 3v5h5" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/terminal.mjs
  var Terminal = [
    ["path", { d: "M12 19h8" }],
    ["path", { d: "m4 17 6-6-6-6" }]
  ];

  // node_modules/.pnpm/lucide@1.28.0/node_modules/lucide/dist/esm/icons/trash-2.mjs
  var Trash2 = [
    ["path", { d: "M10 11v6" }],
    ["path", { d: "M14 11v6" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
  ];

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/buttonShard.js
  var ButtonShard = class extends Shard {
    get dynamicClassButton() {
      return {
        base: {
          cursor: "pointer",
          background: "var(--tmd-element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, rgb(34, 34, 34))",
          borderRadius: "6px"
        },
        hover: {
          background: "var(--tmd-element-hover, #ebf7fe)",
          borderColor: "var(--tmd-accent-hover, #7dd3fc)",
          color: "var(--tmd-accent-hover, #015a8c)"
        },
        "> .tooltip": {
          position: "absolute",
          color: "var(--tmd-text, black)",
          textAlign: "center",
          padding: "0.3em 0.6em",
          borderRadius: "4px",
          background: "var(--tmd-element-hint, #e6e6e6)",
          width: "max-content",
          visibility: "hidden",
          zIndex: "10"
        },
        "> .tooltip[position=left]": {
          right: "calc(100% + 1vw)"
        },
        "> .tooltip[position=right]": {
          left: "calc(100% + 1vw)"
        },
        ":hover .tooltip": {
          visibility: "visible"
        },
        "[data-zc-variant=filled]": {
          background: "var(--tmd-accent, #111)",
          border: "2px solid var(--tmd-accent, #111)",
          color: "var(--tmd-text, white)"
        },
        "[data-zc-variant=filled]:hover": {
          background: "var(--tmd-accent-hover, none)",
          color: "var(--tmd-text, black)"
        },
        "> .external-link-icon": {
          display: "flex",
          columnGap: "0.25em",
          position: "absolute",
          right: "-0.25em",
          top: "-0.25em",
          width: "0.75em",
          height: "0.75em",
          background: "var(--tmd-accent, #5b5bff)",
          color: "var(--tmd-text, white)",
          padding: "0.1em",
          borderRadius: "50%"
        },
        ":hover > .external-link-icon": {
          minWidth: "fit-content",
          padding: "0.1em 0.25em",
          borderRadius: "0.5em",
          bottom: "calc(100% + 0.25em)",
          top: "unset"
        },
        "> .external-link-icon > span": {
          display: "none",
          fontSize: "0.5em",
          whiteSpace: "nowrap"
        },
        ":hover > .external-link-icon > span": {
          display: "inline"
        }
      };
    }
    generateBody() {
      const { text, variant, icon, iconAbsolutePosition = true, tooltip, href, onClick, isDisabled } = this.context;
      let iconElement;
      let textElement;
      const btn = document.createElement("button");
      addDynamicClass(btn, this.dynamicClassButton);
      btn.setAttribute("data-zc-variant", variant);
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.columnGap = "1.25vw";
      setFontFamily(btn, MOD_DATA.fontFamily);
      if (icon) {
        if (typeof icon === "string") {
          iconElement = document.createElement("img");
          iconElement.src = icon;
        } else {
          iconElement = icon;
        }
        iconElement.style.height = "80%";
        iconElement.style.width = "auto";
        if (text && iconAbsolutePosition) {
          iconElement.style.position = "absolute";
          iconElement.style.left = "1vw";
        }
        if (text && !iconAbsolutePosition) btn.style.justifyContent = "";
        btn.append(iconElement);
      }
      if (text) {
        textElement = document.createElement("span");
        textElement.textContent = text;
        textElement.style.height = "100%";
        textElement.style.display = "grid";
        textElement.style.placeContent = "center";
        textElement.style.overflow = "scroll";
        btn.append(textElement);
      }
      if (tooltip) {
        const tooltipEl = document.createElement("span");
        tooltipEl.classList.add("tooltip");
        tooltipEl.setAttribute("position", tooltip.position);
        tooltipEl.textContent = tooltip.text;
        btn.append(tooltipEl);
      }
      if (href) {
        const externalLinkContainer = document.createElement("div");
        externalLinkContainer.classList.add("external-link-icon");
        const externalLinkIcon = createElement(ExternalLink);
        externalLinkIcon.style.width = "auto";
        externalLinkIcon.style.height = "100%";
        const externalLinkLabel = document.createElement("span");
        externalLinkLabel.textContent = href;
        externalLinkContainer.append(externalLinkIcon, externalLinkLabel);
        btn.append(externalLinkContainer);
      }
      if (typeof isDisabled === "function" && isDisabled()) btn.classList.add("zcDisabled");
      btn.addEventListener("click", () => {
        if (typeof isDisabled === "function" && isDisabled()) return btn.classList.add("zcDisabled");
        if (typeof onClick === "function") onClick();
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      });
      return {
        text: textElement,
        icon: iconElement,
        base: btn
      };
    }
    update() {
      super.update();
      if ((this.context.fontSize ?? "auto") === "auto") autosetFontSize(this.body.base);
      else if (typeof this.context.fontSize === "number") setFontSize(this.body.base, this.context.fontSize);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/cardShard.js
  var CardShard = class extends Shard {
    generateBody() {
      const { name, value, icon } = this.context;
      const cardEl = document.createElement("div");
      cardEl.classList.add("zcCard");
      setFontFamily(cardEl, MOD_DATA.fontFamily);
      const cardName = document.createElement("p");
      cardName.classList.add("zcCard_name");
      cardName.textContent = name;
      const cardValue = document.createElement("p");
      cardValue.classList.add("zcCard_value");
      cardValue.textContent = `${value}`;
      if (icon) {
        icon.style.cssText += "position: absolute; top: 0.4em; right: 0.4em; width: 1.2em; height: 1.2em;";
        cardEl.append(icon);
      }
      cardEl.append(cardName, cardValue);
      return {
        base: cardEl,
        name: cardName,
        value: cardValue,
        icon
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/checkboxShard.js
  var CheckboxShard = class extends Shard {
    get dynamicClassInput() {
      return {
        base: {
          width: "min(6dvh, 3dvw)",
          height: "min(6dvh, 3dvw)",
          borderRadius: "min(0.8dvh, 0.3dvw)",
          border: "var(--border-width, 2px) solid #333",
          backgroundColor: "var(--checkbox-color, #fff)",
          position: "relative",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0",
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          appearance: "none"
        },
        ":checked": {
          backgroundColor: "var(--tmd-accent, black)",
          borderColor: "var(--tmd-accent, black)"
        },
        ":checked > svg": {
          strokeDashoffset: "0"
        },
        ":checked:hover": {
          backgroundColor: "var(--tmd-accent-hover, black)"
        },
        ".zcDisabled": {
          opacity: "0.6",
          cursor: "not-allowed",
          backgroundColor: "var(--disabled-color, #e5e5e5)"
        },
        ".pop": {
          animation: "pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
        },
        "> .tooltip": {
          position: "absolute",
          color: "var(--tmd-text, black)",
          fontSize: "0.65em",
          textAlign: "center",
          padding: "0.3em 0.6em",
          borderRadius: "4px",
          background: "var(--tmd-element-hint, #e6e6e6)",
          width: "max-content",
          visibility: "hidden",
          zIndex: "10"
        },
        "> .tooltip[position=left]": {
          right: "calc(100% + 1vw)"
        },
        "> .tooltip[position=right]": {
          left: "calc(100% + 1vw)"
        },
        ":hover .tooltip": {
          visibility: "visible"
        }
      };
    }
    get dynamicClassCheckmark() {
      return {
        base: {
          width: "70%",
          height: "70%",
          stroke: "var(--tmd-text, white)",
          strokeWidth: "3.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "none",
          strokeDasharray: "24",
          strokeDashoffset: "24",
          transition: "stroke-dashoffset 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
        }
      };
    }
    get textColor() {
      return "var(--tmd-text, black)";
    }
    generateBody() {
      const { isChecked, text, tooltip, onChange, isDisabled } = this.context;
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.columnGap = "1vw";
      wrapper.style.padding = "0.25em";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = isChecked;
      input.classList.add("zcCheckbox");
      addDynamicClass(input, this.dynamicClassInput);
      const checkmark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      checkmark.setAttribute("viewBox", "0 0 24 24");
      checkmark.setAttribute("class", "checkmark");
      checkmark.innerHTML = `<path d="M5 13L9 17L19 7" />`;
      addDynamicClass(checkmark, this.dynamicClassCheckmark);
      const label = document.createElement("p");
      label.textContent = text;
      label.style.color = this.textColor;
      setFontFamily(label, MOD_DATA.fontFamily);
      if (typeof isDisabled === "function" && isDisabled()) {
        input.disabled = true;
        wrapper.classList.add("zcDisabled");
      }
      input.addEventListener("change", () => {
        if (typeof isDisabled === "function" && isDisabled()) {
          input.checked = !input.checked;
          return;
        }
        if (typeof onChange === "function") onChange();
        if (input.checked) {
        }
      });
      input.appendChild(checkmark);
      wrapper.append(input, label);
      if (tooltip) {
        const tooltipEl = document.createElement("span");
        tooltipEl.classList.add("tooltip");
        tooltipEl.setAttribute("position", tooltip.position);
        tooltipEl.textContent = tooltip.text;
        input.appendChild(tooltipEl);
      }
      return {
        base: wrapper,
        checkbox: input,
        label
      };
    }
    update() {
      super.update();
      if (this.body?.base) {
        autosetFontSize(this.body.base);
      }
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/containerShard.js
  var ContainerShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {},
        "> div:first-child::-webkit-scrollbar": {
          display: "none"
        },
        "> div:first-child": {
          scrollbarWidth: "none"
        }
      };
    }
    get mountReturnValue() {
      return this.body?.content ?? null;
    }
    generateBody() {
      const scrollMode = this.context.scroll ?? "auto";
      const container = document.createElement("div");
      container.style.position = "relative";
      addDynamicClass(container, this.dynamicClassContainer);
      const mayNeedVerticalScrollbar = scrollMode === "y" || scrollMode === "all" || scrollMode === "auto";
      const containerContent = document.createElement("div");
      containerContent.style.width = "100%";
      containerContent.style.height = "100%";
      containerContent.style.boxSizing = "border-box";
      switch (scrollMode) {
        case "all":
          containerContent.style.overflow = "scroll";
          break;
        case "x":
          containerContent.style.overflowX = "scroll";
          containerContent.style.overflowY = "hidden";
          break;
        case "y":
          containerContent.style.overflowY = "scroll";
          containerContent.style.overflowX = "hidden";
          break;
        case "none":
          containerContent.style.overflow = "unset";
          break;
        case "auto":
        default:
          containerContent.style.overflow = "auto";
          break;
      }
      const scrollbar = document.createElement("div");
      scrollbar.style.cssText = `
      position: absolute;
      right: 0;
      top: 50%;
      display: none;
      flex-direction: column;
      gap: calc(var(--size-unit) * 1.25px);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 10;
      width: calc(var(--size-unit) * 1.25px);
    `;
      const diamonds = [];
      for (let i = 0; i < 6; i++) {
        const diamond = document.createElement("div");
        diamond.style.cssText = `
        transform: rotate(45deg);
        width: 100%;
        aspect-ratio: 1/1;
        background: var(--tmd-element, gray);
        border: 1px solid var(--tmd-accent, black);
        transition: background 0.15s ease, transform 0.15s ease;
      `;
        scrollbar.append(diamond);
        diamonds.push(diamond);
      }
      const updateIndicators = () => {
        const maxScroll = containerContent.scrollHeight - containerContent.clientHeight;
        if (maxScroll <= 1) {
          diamonds.forEach((d) => {
            d.style.background = "var(--tmd-element, gray)";
            d.style.transform = "rotate(45deg) scale(1)";
          });
          return;
        }
        const progress = Math.min(1, Math.max(0, containerContent.scrollTop / maxScroll));
        const activeIndex = Math.round(progress * (diamonds.length - 1));
        diamonds.forEach((diamond, i) => {
          if (i === activeIndex) {
            diamond.style.background = "var(--tmd-accent, #fff)";
            diamond.style.transform = "rotate(45deg) scale(1.25)";
          } else if (i < activeIndex) {
            diamond.style.background = "var(--tmd-element, #aaa)";
            diamond.style.transform = "rotate(45deg) scale(1)";
          } else {
            diamond.style.background = "var(--tmd-element-hover, gray)";
            diamond.style.transform = "rotate(45deg) scale(1)";
          }
        });
      };
      containerContent.addEventListener("scroll", updateIndicators, { passive: true });
      const needsVerticalScrollbar = scrollMode === "y" || scrollMode === "all";
      const updateScrollbarVisibility = () => {
        const isOverflowing = containerContent.scrollHeight - containerContent.clientHeight > 1;
        const shouldShow = needsVerticalScrollbar || scrollMode === "auto" && isOverflowing;
        containerContent.style.paddingRight = shouldShow ? "min(2vw, 2vh)" : "";
        scrollbar.style.display = shouldShow ? "flex" : "none";
        updateIndicators();
      };
      if (mayNeedVerticalScrollbar) {
        const resizeObserver = new ResizeObserver(() => {
          requestAnimationFrame(updateScrollbarVisibility);
        });
        resizeObserver.observe(containerContent);
        const mutationObserver = new MutationObserver(() => {
          requestAnimationFrame(updateScrollbarVisibility);
        });
        mutationObserver.observe(containerContent, {
          childList: true,
          subtree: true,
          characterData: true
        });
        requestAnimationFrame(updateScrollbarVisibility);
      }
      container.append(containerContent, scrollbar);
      return {
        base: container,
        content: containerContent,
        scrollbar
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/imageShard.js
  var ImageShard = class extends Shard {
    modal = null;
    generateBody() {
      const { src, alt = "", width, height } = this.context;
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.style.cursor = "zoom-in";
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.addEventListener("click", () => this.openModal(src, alt));
      return {
        base: img
      };
    }
    openModal(src, alt) {
      this.closeModal();
      this.modal = document.createElement("div");
      this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
      const modalContent = document.createElement("div");
      modalContent.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            transform: scale(0.7);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
      const bigImg = document.createElement("img");
      bigImg.src = src;
      bigImg.alt = alt;
      bigImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        `;
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "\u2715";
      closeBtn.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            color: black;
            font-size: 20px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
        `;
      modalContent.appendChild(bigImg);
      modalContent.appendChild(closeBtn);
      this.modal.appendChild(modalContent);
      document.body.appendChild(this.modal);
      setTimeout(() => {
        this.modal.style.opacity = "1";
        modalContent.style.transform = "scale(1)";
      }, 10);
      const close = () => this.closeModal();
      closeBtn.addEventListener("click", close);
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      }, { once: true });
    }
    closeModal() {
      if (!this.modal) return;
      this.modal.style.opacity = "0";
      setTimeout(() => {
        this.modal?.remove();
        this.modal = null;
      }, 300);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/inputListShard.js
  var InputListShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {
          display: "flex",
          flexDirection: "column",
          gap: "1vw",
          border: "2px solid var(--tmd-accent, black)",
          borderRadius: "4px",
          padding: "0.75vw",
          background: "var(--tmd-element, none)"
        },
        "> div:first-child": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "0.75vw",
          width: "100%"
        },
        "> div:first-child > b": {
          fontSize: "clamp(10px, 2.4vw, 28px)",
          color: "var(--tmd-text, black)"
        },
        "> div:first-child > div:last-child": {
          display: "flex",
          columnGap: "0.75vw"
        },
        "> div:last-child": {
          display: "flex",
          gap: "0.25em",
          alignContent: "flex-start",
          flexWrap: "wrap",
          overflowY: "scroll",
          width: "100%"
        },
        "> div:last-child > div": {
          cursor: "pointer",
          background: "var(--tmd-element-hover, rgb(206, 206, 206))",
          color: "var(--tmd-text, black)",
          height: "fit-content",
          padding: "0.25em 0.45em",
          borderRadius: "0.25em",
          fontSize: "clamp(8px, 1.85vw, 24px)"
        }
      };
    }
    get dynamicClassInput() {
      return {
        base: {
          border: "none !important",
          outline: "none !important",
          background: "none !important",
          flexGrow: "1",
          width: "6vw",
          fontSize: "clamp(8px, 1.85vw, 20px)"
        }
      };
    }
    get dynamicClassToolsButton() {
      return {
        base: {
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          background: "var(--tmd-accent, #333)",
          color: "white",
          width: "2.5vw",
          aspectRatio: "1/1",
          borderRadius: "8px",
          border: "none"
        },
        hover: {
          background: "var(--tmd-accent-hover, #00c2cc)"
        }
      };
    }
    generateBody() {
      const { value, title, fontSize, numbersOnly, onChange, isDisabled } = this.context;
      const checkbox = document.createElement("div");
      const items = [];
      const div = document.createElement("div");
      addDynamicClass(div, this.dynamicClassContainer);
      setFontFamily(div, MOD_DATA.fontFamily);
      const headerElement = document.createElement("div");
      const toolsElement = document.createElement("div");
      const titleElement = document.createElement("b");
      titleElement.textContent = title + ":";
      const itemsElement = document.createElement("div");
      const input = document.createElement("input");
      addDynamicClass(input, this.dynamicClassInput);
      const addButton = (icon, onClick) => {
        const b = document.createElement("button");
        addDynamicClass(b, this.dynamicClassToolsButton);
        icon.style.cssText = "width: 80%; height: auto;";
        b.append(icon);
        b.addEventListener("click", onClick);
        toolsElement.append(b);
      };
      const addItem = (text) => {
        const item = document.createElement("div");
        item.textContent = text;
        itemsElement.insertBefore(item, input);
        item.addEventListener("click", (e) => {
          if (item.style.border === "") item.style.border = "2px solid red";
          else item.style.border = "";
          e.stopPropagation();
        });
        items.push(text);
      };
      addButton(createElement(RotateCcw), () => {
        if (typeof isDisabled === "function" && isDisabled()) return div.classList.add("zcDisabled");
        itemsElement.innerHTML = "";
        items.splice(0, items.length);
        itemsElement.append(input);
        value?.forEach((v) => addItem(String(v)));
        if (typeof onChange === "function") onChange(numbersOnly ? items.map((i) => parseInt(i)) : items);
      });
      addButton(createElement(Trash2), () => {
        if (typeof isDisabled === "function" && isDisabled()) return div.classList.add("zcDisabled");
        for (const c of [...itemsElement.children]) {
          if (c.getAttribute("style")?.includes("border: 2px solid red;")) {
            items.splice(items.indexOf(c.textContent), 1);
            c.remove();
          }
        }
        if (typeof onChange === "function") onChange(numbersOnly ? items.map((i) => parseInt(i)) : items);
      });
      if (typeof isDisabled === "function" && isDisabled()) div.classList.add("zcDisabled");
      input.addEventListener("keypress", (e) => {
        if (document.activeElement === input) {
          switch (e.key) {
            case "Enter":
              if (numbersOnly && Number.isNaN(parseInt(input.value))) return;
              if (input.value.trim() === "") return;
              if (typeof isDisabled === "function" && isDisabled()) return div.classList.add("zcDisabled");
              addItem(input.value);
              input.value = "";
              if (typeof onChange === "function") onChange(numbersOnly ? items.map((i) => parseInt(i)) : items);
              break;
          }
        }
      });
      div.addEventListener("click", (e) => {
        if (e.currentTarget == div) input.focus();
      });
      headerElement.append(titleElement, toolsElement);
      itemsElement.append(input);
      div.append(headerElement, itemsElement);
      value?.forEach((v) => addItem(String(v)));
      return {
        base: div,
        input
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/inputShard.js
  var InputShard = class extends Shard {
    generateBody() {
      const { textArea, placeholder, value, isDisabled, onChange, onInput } = this.context;
      const input = document.createElement(textArea ? "textarea" : "input");
      input.classList.add("zcInput");
      if (placeholder) input.placeholder = placeholder;
      if (value) input.value = value;
      setFontFamily(input, MOD_DATA.fontFamily);
      if (typeof isDisabled === "function" && isDisabled()) input.classList.add("zcDisabled");
      input.addEventListener("change", () => {
        if (typeof isDisabled === "function" && isDisabled()) return input.classList.add("zcDisabled");
        if (typeof onChange === "function") onChange();
      });
      input.addEventListener("input", () => {
        if (typeof isDisabled === "function" && isDisabled()) return input.classList.add("zcDisabled");
        if (typeof onInput === "function") onInput();
      });
      return {
        base: input
      };
    }
    update() {
      super.update();
      if ((this.context.fontSize ?? "auto") === "auto") autosetFontSize(this.body.base);
      else if (typeof this.context.fontSize === "number") setFontSize(this.body.base, this.context.fontSize);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/selectShard.js
  var SelectShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {
          cursor: "pointer",
          background: "var(--tmd-element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, rgb(195, 195, 195))",
          borderRadius: "0.4em",
          padding: "0.25em",
          zIndex: "10"
        },
        "[opened=true]": {
          borderColor: "var(--tmd-accent-hover, rgb(0, 96, 223))"
        },
        "[opened=false]:hover": {
          borderColor: "var(--tmd-accent-hover, rgb(170, 170, 170))"
        },
        ">svg": {
          position: "absolute",
          right: "0.45em",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1.5em",
          height: "1.5em",
          color: "var(--tmd-accent, rgb(0, 96, 223))"
        },
        ">div[data-zc-position='bottom']": {
          position: "absolute",
          top: "calc(100% + 0.45em)",
          left: "0",
          width: "100%",
          background: "var(--tmd-element, #f6f6f6)",
          border: "2px solid var(--tmd-element-hover, rgb(235 235 235))",
          borderRadius: "0.4em"
        },
        ">div[data-zc-position='top']": {
          position: "absolute",
          bottom: "calc(100% + 0.45em)",
          left: "0",
          width: "100%",
          background: "var(--tmd-element, #f6f6f6)",
          border: "2px solid var(--tmd-element-hover, rgb(235 235 235))",
          borderRadius: "0.4em"
        },
        ">div>div": {
          color: "var(--tmd-text, black)",
          width: "100%",
          padding: "0.25em",
          borderRadius: "0.25em"
        },
        ">div>div>svg": {
          width: "1.25em",
          height: "1.25em",
          color: "var(--tmd-accent, rgb(0, 96, 223))"
        },
        ">div>div:hover": {
          background: "var(--tmd-element-hover, #ededed)"
        }
      };
    }
    generateBody() {
      let { options, currentOption, x, y } = CommonCloneDeep(this.context);
      let isOpened = false;
      let optionsContainer;
      const select = document.createElement("div");
      addDynamicClass(select, this.dynamicClassContainer);
      setFontFamily(select, MOD_DATA.fontFamily);
      select.setAttribute("opened", false);
      select.addEventListener("click", () => {
        if (this.context.isDisabled && this.context.isDisabled()) return select.classList.add("zcDisabled");
        if (isOpened) {
          isOpened = false;
          optionsContainer.remove();
        } else {
          isOpened = true;
          optionsContainer = document.createElement("div");
          optionsContainer.setAttribute(
            "data-zc-position",
            typeof y === "number" && y > 500 - select.offsetHeight / 2 ? "top" : "bottom"
          );
          options.forEach((option) => {
            const e = document.createElement("div");
            e.style.cssText = "display: flex; align-items: center; column-gap: 0.5em;";
            if (option.icon) {
              option.icon.style.cssText = "color: #bcbcbc;";
              e.append(option.icon);
            }
            e.append(option.text);
            if (option.name === currentOption) {
              e.append(checkmark);
            }
            e.addEventListener("click", () => {
              currentOption = option.name;
              p.textContent = option.text;
              optionsContainer.remove();
              if (this.context.onChange) this.context.onChange(option.name);
            });
            optionsContainer.append(e);
          });
          select.append(optionsContainer);
        }
      });
      const p = document.createElement("p");
      p.textContent = options.find((option) => option.name === currentOption)?.text ?? "";
      const arrow = createElement(ChevronDown);
      const checkmark = createElement(Check);
      checkmark.style.cssText = "position: absolute; right: 0.25em;";
      select.append(p, arrow);
      if (this.context.isDisabled && this.context.isDisabled()) select.classList.add("zcDisabled");
      return {
        base: select
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/svgShard.js
  var SvgShard = class extends Shard {
    generateBody() {
      const { dataurl, size, fill = "var(--tmd-accent, black)", stroke = "var(--tmd-accent-hover, black)", strokeWidth = "2px" } = this.context;
      function dataURLToSVGElement(dataURL) {
        const svgEncoded = dataURL.replace("data:image/svg+xml,", "");
        const svgString = decodeURIComponent(svgEncoded);
        const div = document.createElement("div");
        div.innerHTML = svgString;
        return div.firstElementChild;
      }
      const svg = dataURLToSVGElement(dataurl);
      if (svg) {
        recolorSVG(svg, { fill, stroke });
        svg.setAttribute("stroke-width", strokeWidth);
      }
      return {
        base: svg
      };
    }
    update() {
      super.update();
      setSize(this.body.base, this.context.size, this.context.size);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/tabsShard.js
  var TabsShard = class extends Shard {
    tabHandlers = {};
    clearDrawProcessHook = null;
    constructor(context) {
      super(context);
    }
    generateBody() {
      this.tabHandlers ??= {};
      this.clearDrawProcessHook = null;
      const { tabs, currentTabName } = this.context;
      let tabElements = [];
      const tabsEl = document.createElement("div");
      tabsEl.classList.add("zcTabs");
      setFontFamily(tabsEl, MOD_DATA.fontFamily);
      tabs.forEach((tab) => {
        const switchTab = () => {
          for (const c of tabsEl.children) {
            c.removeAttribute("data-opened");
          }
          for (const c of tabElements) {
            if (c instanceof Node) document.body.removeChild(c);
          }
          tabElements = [];
          tabEl.setAttribute("data-opened", "true");
          const originalAppend = document.body.append.bind(document.body);
          document.body.append = (...nodes) => {
            tabElements.push(...nodes);
            originalAppend(...nodes);
          };
          this.clearDrawProcessHook?.();
          this.tabHandlers.unload?.();
          this.tabHandlers.exit?.();
          this.tabHandlers = {
            run: tab.run,
            load: tab.load,
            unload: tab.unload,
            exit: tab.exit
          };
          this.clearDrawProcessHook = null;
          this.tabHandlers.load?.();
          if (tab.run) {
            this.clearDrawProcessHook = hookFunction("DrawProcess", HookPriority.ADD_BEHAVIOR, (args, next) => {
              next(args);
              tab.run?.();
            });
          }
          document.body.append = originalAppend;
        };
        const tabEl = document.createElement("button");
        tabEl.textContent = tab.name;
        if (tab.name === currentTabName) switchTab();
        tabEl.addEventListener("click", switchTab);
        tabsEl.append(tabEl);
      });
      window.addEventListener("zois-core:subscreenunloaded", () => this.clearDrawProcessHook?.(), { once: true });
      return {
        base: tabsEl
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/shards/textShard.js
  var TextShard = class extends Shard {
    get defaultColor() {
      return "var(--tmd-text, black)";
    }
    generateBody() {
      const p = document.createElement("p");
      p.innerHTML = this.context.text ?? "";
      p.style.color = this.context.color ?? this.defaultColor;
      p.style.overflow = "scroll";
      if (this.context.withBackground) p.style.background = "var(--tmd-element,rgb(239, 239, 239))";
      if (this.context.withBorder) p.style.border = "2px solid var(--tmd-accent, rgb(236, 236, 236))";
      setFontFamily(p, MOD_DATA.fontFamily);
      return {
        base: p
      };
    }
    update() {
      super.update();
      if ((this.context.fontSize ?? "auto") === "auto") autosetFontSize(this.body.base);
      else if (typeof this.context.fontSize === "number") setFontSize(this.body.base, this.context.fontSize);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/assets/icons/exit.svg
  var exit_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" %0A     width="86" height="86" %0A     viewBox="0 0 86 86" %0A     fill="none">%0A  <g transform="translate(0.000000,86.000000) scale(0.100000,-0.100000)"%0A     fill="currentColor" stroke="none">%0A    <path d="M120 507 l0 -305 151 -81 c83 -45 160 -81 170 -81 18 0 19 12 19 281%0A            0 163 -4 288 -10 299 -11 20 -44 40 -212 129 l-118 62 0 -304z"/>%0A    <path d="M260 787 c31 -19 52 -23 180 -27 l145 -5 3 -72 3 -73 29 0 30 0 0 81%0A            c0 126 14 119 -223 119 l-202 0 35 -23z"/>%0A    <path d="M690 590 c0 -19 -7 -20 -90 -20 l-90 0 0 -60 0 -60 90 0 c83 0 90 -1%0A            90 -20 0 -11 3 -20 7 -20 14 0 93 84 93 99 0 16 -78 101 -92 101 -4 0 -8 -9%0A            -8 -20z"/>%0A    <path d="M590 336 l0 -76 -40 0 c-38 0 -40 -2 -40 -30 0 -29 1 -30 50 -30 77 0%0A            92 20 88 123 -3 81 -3 82 -30 85 l-28 3 0 -75z"/>%0A  </g>%0A</svg>';

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/ui.js
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  function recolorSVG(svgElement, { fill, stroke }) {
    const elements = svgElement.querySelectorAll("*");
    elements.forEach((element) => {
      if (element.getAttribute("fill") !== "none") {
        element.setAttribute("fill", fill);
      }
      if (element.getAttribute("stroke") !== "none") {
        element.setAttribute("stroke", stroke);
      }
    });
    if (svgElement.getAttribute("fill") !== "none") {
      svgElement.setAttribute("fill", fill);
    }
    if (svgElement.getAttribute("stroke") !== "none") {
      svgElement.setAttribute("stroke", stroke);
    }
    return svgElement;
  }
  function dataUrlSvgWithColor(dataUrl, newColor) {
    if (newColor.fill?.startsWith("#")) newColor.fill = hexToRgb(newColor.fill);
    if (newColor.stroke?.startsWith("#")) newColor.stroke = hexToRgb(newColor.stroke);
    if (newColor.fill) dataUrl = dataUrl.replace(/fill="[^"]*"/g, `fill="${newColor.fill}"`);
    if (newColor.stroke) dataUrl = dataUrl.replace(/stroke="[^"]*"/g, `stroke="${newColor.stroke}"`);
    return dataUrl;
  }
  function cssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }
  function getRelativeHeight(height) {
    return height * (MainCanvas.canvas.clientHeight / 1e3);
  }
  function getRelativeWidth(width) {
    return width * (MainCanvas.canvas.clientWidth / 2e3);
  }
  function getRelativeY(yPos, anchorPosition = "top") {
    const scaleY = MainCanvas.canvas.clientHeight / 1e3;
    return anchorPosition === "top" ? MainCanvas.canvas.offsetTop + yPos * scaleY : window.innerHeight - (MainCanvas.canvas.offsetTop + MainCanvas.canvas.clientHeight) + yPos * scaleY;
  }
  function getRelativeX(xPos, anchorPosition = "left") {
    const scaleX = MainCanvas.canvas.clientWidth / 2e3;
    return anchorPosition === "left" ? MainCanvas.canvas.offsetLeft + xPos * scaleX : window.innerWidth - (MainCanvas.canvas.offsetLeft + MainCanvas.canvas.clientWidth) + xPos * scaleX;
  }
  function setPosition(element, xPos, yPos, anchor = "top-left") {
    const yAnchor = anchor === "top-left" || anchor === "top-right" ? "top" : "bottom";
    const xAnchor = anchor === "top-left" || anchor === "bottom-left" ? "left" : "right";
    const y = getRelativeY(yPos, yAnchor);
    const x = getRelativeX(xPos, xAnchor);
    Object.assign(element.style, {
      position: "fixed",
      [xAnchor]: x + "px",
      [yAnchor]: y + "px"
    });
  }
  function setSize(element, width, height) {
    Object.assign(element.style, {
      width: getRelativeWidth(width) + "px",
      height: getRelativeHeight(height) + "px"
    });
  }
  function setFontSize(element, targetFontSize) {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;
    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
    const fontSize = targetFontSize * scaleFactor;
    Object.assign(element.style, {
      fontSize: fontSize + "px"
    });
  }
  function setFontFamily(element, fontFamily) {
    element.style.fontFamily = fontFamily ?? "sans-serif";
  }
  function setPadding(element, targetPadding) {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;
    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
    const paddingValue = targetPadding * scaleFactor;
    Object.assign(element.style, {
      padding: paddingValue + "px"
    });
  }
  function autosetFontSize(element) {
    const Font = MainCanvas.canvas.clientWidth <= MainCanvas.canvas.clientHeight * 2 ? MainCanvas.canvas.clientWidth / 50 : MainCanvas.canvas.clientHeight / 25;
    Object.assign(element.style, {
      fontSize: Font + "px"
    });
  }
  function setSizeUnitVariable() {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;
    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
    document.documentElement.style.setProperty("--size-unit", scaleFactor.toString());
  }
  var createdDynamicClasses = [];
  function generateDynamicClassCacheKey(styles) {
    const sortedStringify = (obj) => {
      if (!obj) return "null";
      return JSON.stringify(
        Object.keys(obj).sort().reduce((acc, key) => {
          acc[key] = obj[key];
          return acc;
        }, {})
      );
    };
    let cacheKey = "";
    for (const [key, value] of Object.entries(styles)) {
      if (value === void 0) continue;
      cacheKey += `${key}:=${sortedStringify(value)}|`;
    }
    return cacheKey;
  }
  function addDynamicClass(targetElement, styles) {
    const cacheKey = generateDynamicClassCacheKey(styles);
    const _class = createdDynamicClasses.find((g) => g.key === cacheKey);
    if (_class) return targetElement.classList.add(_class.className);
    let className;
    do {
      className = "dynamic-" + Math.random().toString(36).substring(2, 10);
    } while (createdDynamicClasses.find((g) => g.className === className));
    createdDynamicClasses.push({
      key: cacheKey,
      className
    });
    const buildCssBlock = (selector, styleRules) => {
      let css = `${selector} {`;
      for (const [property, value] of Object.entries(styleRules)) {
        css += `${property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()}: ${value};`;
      }
      css += "}";
      return css;
    };
    let cssRules = "";
    for (const [key, value] of Object.entries(styles)) {
      if (value === void 0) continue;
      if (key === "base") {
        cssRules += buildCssBlock(`.${className}`, value);
      } else if (["hover", "active", "focus", "disabled", "before", "after"].includes(key)) {
        cssRules += buildCssBlock(`.${className}:${key}`, value);
      } else {
        cssRules += buildCssBlock(`.${className}${key}`, value);
      }
    }
    let styleElement = document.getElementById(`${MOD_DATA.key ?? ""}-dynamic-classes`);
    if (styleElement) {
      styleElement.textContent += cssRules;
    } else {
      styleElement = document.createElement("style");
      styleElement.id = `${MOD_DATA.key ?? ""}-dynamic-classes`;
      styleElement.textContent = cssRules;
      document.head.appendChild(styleElement);
    }
    targetElement.classList.add(className);
  }
  function setPreviousSubscreen() {
    setSubscreen(previousSubscreen);
  }
  var previousSubscreen = null;
  var currentSubscreen = null;
  function setSubscreen(subscreen) {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    if (previousSubscreen) {
      try {
        previousSubscreen.unload();
      } catch (e) {
        logger.error("Failed to unload subscreen", previousSubscreen, e);
      }
      window.dispatchEvent(new SubscreenUnloadedEvent({ subscreen: previousSubscreen }));
    }
    if (subscreen) {
      try {
        subscreen.load();
      } catch (e) {
        logger.error("Failed to load subscreen", subscreen, e);
      }
      window.dispatchEvent(new SubscreenLoadedEvent({ subscreen }));
    }
  }
  function getCurrentSubscreen() {
    return currentSubscreen;
  }
  function getPreviousSubscreen() {
    return previousSubscreen;
  }
  var BaseSubscreen = class {
    setSubscreen = setSubscreen;
    get currentSubscreen() {
      return getCurrentSubscreen();
    }
    get previousSubscreen() {
      return getPreviousSubscreen();
    }
    run() {
    }
    load() {
      setSizeUnitVariable();
      this.createButton({
        x: 1815,
        y: 75,
        width: 90,
        height: 90,
        icon: dataUrlSvgWithColor(exit_default, { fill: cssVar("--tmd-text", "black") }),
        tooltip: {
          position: "left",
          text: "Back"
        },
        modules: {
          base: [
            new StyleModule({
              zIndex: "10"
            })
          ]
        }
      }).addEventListener("click", () => this.exit());
      if (this.name) {
        this.createText({
          text: this.name,
          x: 100,
          y: 60,
          fontSize: 8
        }).style.cssText += "max-width: 85%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0.1em;";
      }
    }
    unload() {
    }
    click() {
    }
    exit() {
      setPreviousSubscreen();
    }
    update() {
    }
    resize() {
      setSizeUnitVariable();
    }
    setPreviousSubscreen() {
      setPreviousSubscreen();
    }
    create(shard) {
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createButton(ctx) {
      const shard = new ButtonShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createText(ctx) {
      const shard = new TextShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createInput(ctx) {
      const shard = new InputShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createCheckbox(ctx) {
      const shard = new CheckboxShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createInputList(ctx) {
      const shard = new InputListShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createImage(ctx) {
      const shard = new ImageShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createSvg(ctx) {
      const shard = new SvgShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createBackNextButton(ctx) {
      const shard = new BackNextButtonShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createTabs(ctx) {
      const shard = new TabsShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    drawPolylineArrow({
      points,
      strokeColor = cssVar("--tmd-text", "black"),
      lineWidth = 2,
      circleRadius = 5,
      circleColor = cssVar("--tmd-text", "black")
    }) {
      if (points.length < 2) return;
      const ctx = MainCanvas.canvas.getContext("2d");
      if (!ctx) return;
      ctx.save();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = circleColor;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(points[points.length - 1].x, points[points.length - 1].y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    createCard(ctx) {
      const shard = new CardShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createSelect(ctx) {
      const shard = new SelectShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createContainer(ctx) {
      const shard = new ContainerShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/shards/coreButtonShard.js
  var CoreButtonShard = class extends ButtonShard {
    get dynamicClassButton() {
      return {
        ...super.dynamicClassButton,
        base: {
          ...super.dynamicClassButton.base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "1.25vw",
          border: "2px solid #33c633",
          outline: "none",
          cursor: "pointer",
          background: "#20a214",
          color: "#004800",
          borderRadius: "0.1em"
        },
        hover: {
          ...super.dynamicClassButton.hover,
          background: "#39bd2dff",
          color: "#76ff76ff",
          borderColor: "#76ff76ff"
        }
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/shards/coreTextShard.js
  var CoreTextShard = class extends TextShard {
    get defaultColor() {
      return "rgb(162, 255, 19)";
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/shards/coreSelectShard.js
  var CoreSelectShard = class extends SelectShard {
    get dynamicClassContainer() {
      return {
        ...super.dynamicClassContainer,
        base: {
          ...super.dynamicClassContainer.base,
          background: "#20a214",
          color: "rgb(162, 255, 19)",
          border: "2px solid #33c633"
        }
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/shards/coreCheckboxShard.js
  var CoreCheckboxShard = class extends CheckboxShard {
    get dynamicClassInput() {
      return {
        ...super.dynamicClassInput,
        base: {
          ...super.dynamicClassInput.base,
          border: "var(--border-width) solid #33c633 !important",
          backgroundColor: "#20a214 !important",
          color: "rgb(162, 255, 19) !important"
        },
        hover: {
          ...super.dynamicClassInput.hover,
          backgroundColor: "#39bd2dff !important",
          color: "#76ff76ff !important"
        },
        before: {
          ...super.dynamicClassInput.before,
          backgroundColor: "rgb(162, 255, 19) !important"
        },
        ".zcDisabled": {
          ...super.dynamicClassInput[".zcDisabled"],
          backgroundColor: "var(--disabled-color)"
        }
      };
    }
    get textColor() {
      return "rgb(162, 255, 19)";
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/shards/coreInputListShard.js
  var CoreInputListShard = class extends InputListShard {
    get dynamicClassContainer() {
      return {
        ...super.dynamicClassContainer,
        base: {
          ...super.dynamicClassContainer.base,
          background: "#20a214 !important",
          border: "2px solid #33c633"
        },
        "> div:first-child > b": {
          ...super.dynamicClassContainer["> div:first-child > b"],
          color: "rgb(155, 255, 0)"
        },
        "> div:last-child > div": {
          ...super.dynamicClassContainer["> div:last-child > div"],
          background: "rgb(112, 234, 68)",
          color: "black"
        }
      };
    }
    get dynamicClassToolsButton() {
      return {
        ...super.dynamicClassToolsButton,
        base: {
          ...super.dynamicClassToolsButton.base,
          background: "rgb(112, 234, 68)",
          color: "black"
        },
        hover: {
          background: "rgb(77, 221, 65)"
        }
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/coreSubscreen.js
  var CoreSubscreen = class extends BaseSubscreen {
    g = 40;
    h = 0.05;
    interval = null;
    run() {
      DrawRect(0, 0, 2e3, 1e3, "#008600ff");
      for (let x = 0; x <= 2e3; x += this.g) {
        DrawRect(x, 0, 5, 1e3, "#17a117ff");
      }
      for (let y = 0; y <= 1e3; y += this.g) {
        DrawRect(0, y, 2e3, 5, "#17a117ff");
      }
    }
    load() {
      this.createText({
        x: 60,
        y: 40,
        text: this.name,
        fontSize: 6,
        modules: {
          base: [
            new StyleModule({
              fontWeight: "bold"
            })
          ]
        }
      });
      this.createButton({
        anchor: "top-right",
        x: 40,
        y: 40,
        width: 90,
        height: 90,
        icon: "Icons/Exit.png",
        onClick: () => this.exit()
      });
      this.g = 40;
      this.h = 0.05;
      this.interval = setInterval(() => {
        this.g += this.h;
        if (this.g >= 60) this.h = -0.05;
        if (this.g <= 40) this.h = 0.05;
      }, 50);
    }
    createText(ctx) {
      const shard = new CoreTextShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createButton(ctx) {
      const shard = new CoreButtonShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createCheckbox(ctx) {
      const shard = new CoreCheckboxShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createInputList(ctx) {
      const shard = new CoreInputListShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createSelect(ctx) {
      const shard = new CoreSelectShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    unload() {
      super.unload();
      if (this.interval) clearInterval(this.interval);
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/generalSubscreen.js
  var GeneralSubscreen = class extends CoreSubscreen {
    get name() {
      return "General";
    }
    load() {
      super.load();
      this.createCheckbox({
        x: 60,
        y: 200,
        text: "Dev Mode",
        isChecked: !!coreSettings.devMode,
        onChange: () => {
          coreSettings.devMode = false;
          delete PreferenceExtensionsSettings.ZOIS_CORE;
        }
      });
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/toasts.js
  function createToastsContainer() {
    const container = document.createElement("div");
    container.classList.add("zcToastsContainer");
    container.addEventListener("click", () => {
      const pos = window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left";
      for (const toast of container.children) {
        if (toast instanceof HTMLElement) {
          toast.style.animation = `${pos.includes("left") ? "zcSlideOutToLeft" : "zcSlideOutToRight"} 0.3s ease-out forwards`;
        }
      }
      setTimeout(() => container.innerHTML = "", 300);
    });
    const update = () => {
      container.style.cssText = `font-family: ${CommonGetFontName()};`;
      setPosition(container, 5, 5, window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left");
    };
    window.addEventListener("resize", update);
    document.body.append(container);
    update();
    document.addEventListener("zois-core:coresettingschanged", update);
    return container;
  }
  function getToastIcon(type, theme) {
    let icon;
    switch (type) {
      case "info":
        icon = createElement(Info);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(68, 70, 202)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(148, 178, 217)";
        break;
      case "warning":
        icon = createElement(CircleAlert);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(198, 146, 25)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(244, 220, 147)";
        break;
      case "error":
        icon = createElement(CircleX);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(174, 1, 1)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(255, 163, 163)";
        break;
      case "success":
        icon = createElement(CircleCheck);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(49, 142, 68)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(122, 213, 162)";
        break;
      case "spinner":
        icon = document.createElement("div");
        icon.style.cssText = `
                box-sizing: border-box;
                border: 2px solid;
                border-radius: 100%;
                border-color: transparent ${theme ? theme.iconFillColor : "rgb(68, 70, 202)"};
                animation: zcSpin 0.65s linear infinite;
            `;
        break;
    }
    icon.style.cssText += `flex-shink: 0; width: 1.65em; height: 1.65em;`;
    return icon;
  }
  function createToast({ title, message, type, duration, theme, id }) {
    const pos = window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left";
    const backgroundColor = theme ? theme.backgroundColor : type === "success" ? "rgb(122, 213, 162)" : type === "warning" ? "rgb(244, 220, 147)" : type === "error" ? "rgb(255, 163, 163)" : "rgb(148, 178, 217)";
    const textColor = theme ? theme.titleColor : type === "info" || type === "spinner" ? "rgb(0, 2, 125)" : type === "success" ? "#244428" : type === "error" ? "rgb(128, 22, 22)" : "rgb(100, 74, 16)";
    const progressBarColor = theme ? theme.progressBarColor : "#00000014";
    const toastContainer = document.querySelector(".zcToastsContainer") ?? createToastsContainer();
    const toast = document.createElement("div");
    toast.classList.add("zcToast");
    toast.setAttribute("data-zc-toast-type", type);
    toast.setAttribute("data-zc-toast-id", id);
    const update = () => {
      const canvasWidth = MainCanvas.canvas.clientWidth;
      const canvasHeight = MainCanvas.canvas.clientHeight;
      const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
      toast.style.cssText = `width: 100%; font-size: ${2.85 * scaleFactor}px; padding: ${1 * scaleFactor}px; background: ${backgroundColor}; border: 1px solid #555;`;
      toast.style.animation = `${pos.includes("left") ? "zcSlideInFromLeft" : "zcSlideInFromRight"} 0.3s ease-out forwards`;
    };
    if (type !== "spinner") {
      const progressBar = document.createElement("div");
      progressBar.classList.add("zcToast-ProgressBar");
      progressBar.style.cssText = `animation: zcToast-progress ${duration}ms linear 0s 1 alternate none; position: absolute; top: 0; left: 0; height: 100%; border-radius: 4px; background: ${progressBarColor};`;
      toast.append(progressBar);
    }
    const textContainer = document.createElement("div");
    if (title) {
      const _title = document.createElement("p");
      _title.style.color = textColor;
      _title.style.fontWeight = "bold";
      _title.style.fontSize = "0.9em";
      _title.textContent = title;
      textContainer.append(_title);
    }
    const _message = document.createElement("p");
    _message.style.color = textColor;
    _message.style.fontSize = !!title ? "0.7em" : "0.9em";
    _message.style.overflowWrap = "anywhere";
    if (!title) {
      _message.style.fontWeight = "bold";
    } else {
      _message.style.marginTop = "0.15em";
    }
    _message.textContent = message;
    textContainer.append(_message);
    toast.append(getToastIcon(type, theme), textContainer);
    window.addEventListener("resize", update);
    toastContainer.append(toast);
    update();
    void toast.offsetHeight;
    setTimeout(() => {
      toast.style.animation = `${pos.includes("left") ? "zcSlideOutToLeft" : "zcSlideOutToRight"} 0.3s ease-out forwards`;
    }, duration);
    setTimeout(() => toast.remove(), duration + 300);
  }
  var ToastsManager = class {
    generateToastId() {
      return crypto.randomUUID();
    }
    process({ title, message, duration, type, id, theme }) {
      const coreSettings2 = window.ZOIS_CORE.getSettings();
      if (coreSettings2.toasts?.blacklist?.enabled && coreSettings2.toasts.blacklist.content?.length !== 0) {
        if (coreSettings2.toasts.blacklist.content?.some((v) => {
          const regexp = new RegExp(v);
          return regexp.test(title ?? "") || regexp.test(message);
        })) {
          logger.log("Toast message blocked due to blacklist settings");
          return;
        }
      }
      if (coreSettings2.toasts?.preventUsingSingleTheme) {
        createToast({
          id,
          title,
          message,
          duration,
          type
        });
      } else {
        createToast({
          id,
          title,
          message,
          duration,
          type,
          theme
        });
      }
    }
    info({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "info", id, theme });
    }
    success({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "success", id, theme });
    }
    warn({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "warning", id, theme });
    }
    error({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "error", id, theme });
    }
    spinner({ title, message }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration: 1e6, type: "spinner", id, theme });
      return id;
    }
    removeSpinner(id) {
      const toast = document.querySelector(`div[data-zc-toast-id="${id}"]`);
      if (!toast) return;
      const pos = window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left";
      toast.style.animation = `${pos.includes("left") ? "zcSlideOutToLeft" : "zcSlideOutToRight"} 0.3s ease-out forwards`;
      setTimeout(() => toast.remove(), 300);
    }
  };
  var toastsManager = new ToastsManager();

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/toastsSubscreen.js
  var ToastsSubscreen = class extends CoreSubscreen {
    get name() {
      return "Toasts";
    }
    load() {
      super.load();
      this.createCheckbox({
        x: 60,
        y: 200,
        text: "Blacklist Enabled",
        isChecked: !!coreSettings.toasts?.blacklist?.enabled,
        onChange: () => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.blacklist ??= {};
          coreSettings.toasts.blacklist.enabled = !coreSettings.toasts.blacklist.enabled;
        }
      });
      this.createCheckbox({
        x: 60,
        y: 280,
        text: "Prevent Using Single Theme",
        isChecked: !!coreSettings.toasts?.preventUsingSingleTheme,
        onChange: () => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.preventUsingSingleTheme = !coreSettings.toasts.preventUsingSingleTheme;
        }
      });
      this.createText({
        text: "Toasts Position:",
        x: 60,
        y: 380
      });
      this.createSelect({
        x: 400,
        y: 360,
        width: 500,
        options: [
          {
            name: "top-left",
            text: "Top Left"
          },
          {
            name: "top-right",
            text: "Top Right"
          },
          {
            name: "bottom-left",
            text: "Bottom Left"
          },
          {
            name: "bottom-right",
            text: "Bottom Right"
          }
        ],
        currentOption: coreSettings.toasts?.position ?? "bottom-left",
        onChange: (pos) => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.position = pos;
        }
      });
      this.createInputList({
        title: "Blacklist",
        x: 1100,
        y: 200,
        width: 800,
        height: 600,
        value: coreSettings.toasts?.blacklist?.content ?? [],
        onChange: (value) => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.blacklist ??= {};
          coreSettings.toasts.blacklist.content = value;
        }
      });
      this.createButton({
        text: "Test",
        x: 60,
        y: 850,
        padding: 1,
        width: 400,
        onClick: () => {
          document.dispatchEvent(new CoreSettingsChangedEvent());
          toastsManager.success({
            title: "Something was completed successfully",
            message: "Message details",
            duration: 8e3
          });
          toastsManager.info({
            title: "Very important announcement",
            message: "You have been informed that you have been informed",
            duration: 8e3
          });
          toastsManager.warn({
            title: "Don't look at me like that",
            message: "You were warned",
            duration: 8e3
          });
          toastsManager.error({
            title: "Critical bug found",
            message: "Catch him!",
            duration: 8e3
          });
        }
      });
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/developmentSubscreen.js
  var DevelopmentSubscreen = class extends CoreSubscreen {
    get name() {
      return "Development";
    }
    load() {
      super.load();
      this.createCheckbox({
        x: 60,
        y: 200,
        text: "Auto Connect To Dev Server",
        isChecked: localStorage.getItem("autoConnectToDevServer") === "true",
        onChange: () => {
          const prev = localStorage.getItem("autoConnectToDevServer");
          localStorage.setItem("autoConnectToDevServer", prev === "true" ? "false" : "true");
        }
      });
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core-subscreen/mainSubscreen.js
  var MainSubscreen = class extends CoreSubscreen {
    get name() {
      return "Zoi's Modding Core";
    }
    load() {
      super.load();
      this.createText({
        x: 60,
        y: 120,
        text: "Here are all the experimental settings and settings for developing and debugging my mods."
      });
      [new GeneralSubscreen(), new ToastsSubscreen(), new DevelopmentSubscreen()].forEach((s, i) => {
        this.createButton({
          x: 100,
          y: 240 + 115 * i,
          padding: 2,
          text: s.name,
          width: 600,
          fontSize: 5,
          onClick: () => {
            this.setSubscreen(s);
          }
        });
      });
      this.createButton({
        anchor: "bottom-right",
        x: 40,
        y: 40,
        width: 90,
        height: 90,
        icon: createElement(BookText),
        onClick: () => {
          window.open(`https://github.com/FurryZoi/zois-core`, "_blank");
        }
      });
      this.createText({
        text: "This place is in WIP stage",
        x: 1e3,
        y: 500,
        fontSize: 6
      });
    }
    exit() {
      super.exit();
      this.setSubscreen(null);
      PreferenceSubscreenExtensionsClear();
      syncSettings();
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/dialogs.js
  function createDialog(dialog) {
    return new Promise((resolve, reject) => {
      let inputOrSelectElement = null;
      const clear = () => {
        _dialog.remove();
        background.remove();
        document.removeEventListener("keydown", handleKeyDown, { capture: true });
      };
      const submit = () => {
        clear();
        if (dialog.type === "prompt") {
          resolve(inputOrSelectElement.value);
        }
        if (dialog.type === "confirm") {
          resolve(true);
        }
        if (dialog.type === "pick") {
          resolve(inputOrSelectElement.value);
        }
      };
      const cancel = () => {
        clear();
        resolve(false);
      };
      const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.key === "Enter") submit();
        if (e.key === "Escape") cancel();
      };
      document.addEventListener("keydown", handleKeyDown, { capture: true });
      const background = document.createElement("div");
      background.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 20; opacity: 0.5; background: black;";
      const _dialog = document.createElement("div");
      _dialog.classList.add("zcDialog");
      _dialog.setAttribute("data-zc-dialog-type", dialog.type);
      _dialog.style.fontFamily = CommonGetFontName();
      const message = document.createElement("p");
      message.textContent = dialog.message;
      _dialog.append(message);
      switch (dialog.type) {
        case "confirm": {
          break;
        }
        case "prompt": {
          const input = document.createElement("input");
          input.style.cssText = "color: white; margin-top: 1px; width: 90%; background: rgb(82, 89, 104); border: none; border-radius: 4px; padding: 0.45em;";
          inputOrSelectElement = input;
          _dialog.append(input);
          break;
        }
        case "pick": {
          const select = document.createElement("select");
          select.style.cssText = "cursor: pointer; width: 90%; background: rgb(82, 89, 104); border: none; padding: 0.4em; color: white; border-radius: 4px;";
          dialog.options.forEach((o) => {
            const option = document.createElement("option");
            option.setAttribute("key", o.name);
            option.text = o.name;
            select.append(option);
          });
          inputOrSelectElement = select;
          _dialog.append(select);
          break;
        }
      }
      const buttons = document.createElement("div");
      buttons.style.cssText = "display: flex; justify-content: end; column-gap: 0.75em; width: 90%; padding: 0.9em 0;";
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", cancel);
      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Ok";
      submitBtn.addEventListener("click", submit);
      buttons.append(cancelBtn, submitBtn);
      _dialog.append(buttons);
      document.body.append(_dialog, background);
      if (inputOrSelectElement) inputOrSelectElement.focus();
    });
  }
  var DialogsManager = class {
    process(dialogProps) {
      return createDialog(dialogProps);
    }
    prompt({ message }) {
      return this.process({
        type: "prompt",
        message
      });
    }
    confirm({ message }) {
      return this.process({
        type: "confirm",
        message
      });
    }
    pick({ message, options }) {
      return this.process({
        type: "pick",
        message,
        options
      });
    }
  };
  var dialogsManager = new DialogsManager();

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/core.js
  var coreSettings = {};
  function syncSettings() {
    if (typeof coreSettings !== "object") return;
    Player.ExtensionSettings.ZOIS_CORE = LZString.compressToBase64(JSON.stringify(coreSettings));
    ServerPlayerExtensionSettingsSync("ZOIS_CORE");
    document.dispatchEvent(new CoreSettingsChangedEvent());
  }
  function registerSubscreen() {
    PreferenceRegisterExtensionSetting({
      Identifier: "ZOIS_CORE",
      Image: () => {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(createElement(Terminal));
        return "data:image/svg+xml," + svgString;
      },
      ButtonText: () => "Zoi's Modding Core",
      load: () => {
        setSubscreen(new MainSubscreen());
      },
      run: () => {
        getCurrentSubscreen()?.run();
      },
      click: () => {
        getCurrentSubscreen()?.click();
      },
      exit: () => {
        getCurrentSubscreen()?.exit();
      }
    });
  }
  var loginScreenElements = [];
  async function registerCore() {
    const style = document.createElement("style");
    style.innerHTML = styles_default2;
    document.head.append(style);
    if (localStorage.getItem("autoConnectToDevServer") === "true") {
      hookFunction("CommonGetServer", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        return "https://bondage-club-server-test.herokuapp.com/";
      });
      const containerShard = new ContainerShard({
        x: 1250,
        y: 900,
        modules: {
          base: [
            new StyleModule({
              display: "flex"
            })
          ]
        }
      });
      const container = containerShard.mount();
      new ButtonShard({
        padding: 1,
        parent: container,
        text: "You connected to dev server"
      }).mount();
      new ButtonShard({
        width: 90,
        height: 90,
        padding: 1,
        icon: "Icons/Cancel.png",
        parent: container,
        onClick: () => {
          localStorage.removeItem("autoConnectToDevServer");
          location.reload();
        }
      }).mount();
      loginScreenElements.push(container);
      hookFunction("LoginUnload", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        loginScreenElements.forEach((e) => e.remove());
        return next(args);
      });
      ServerURL = CommonGetServer();
      ServerInit();
    }
    await waitFor(() => typeof Player?.MemberNumber === "number");
    if (typeof Player.ExtensionSettings.ZOIS_CORE === "string") {
      coreSettings = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.ZOIS_CORE) ?? "{}");
    }
    if (coreSettings.devMode) registerSubscreen();
    window.ZOIS_CORE = Object.freeze({
      version: version2,
      enableDevMode: () => {
        coreSettings.devMode = true;
        syncSettings();
        registerSubscreen();
      },
      getSettings: () => {
        return JSON.parse(JSON.stringify(coreSettings));
      }
    });
    hookFunction("ChatRoomMessageCreateReplyMessageElement", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const [msgId, displayMessage, data] = args;
      const r = formatString(displayMessage);
      if (!r.isBeatifulString) return next(args);
      if (!msgId) {
        return [displayMessage];
      }
      const metadata = ChatRoomGetMetadataElem(data.time, data.sender);
      metadata.setAttribute("aria-hidden", "true");
      return [
        ElementCreate({
          tag: "span",
          classList: ["chat-room-message-content"],
          attributes: { "msgid": msgId },
          innerHTML: r.html
        }),
        ElementMenu.Create(
          ElementGenerateID(),
          [
            metadata,
            ElementButton.Create(
              null,
              () => ChatRoomMessageSetReply(msgId),
              { noStyling: true, tooltip: "Reply" },
              { button: { attributes: { name: "reply" } } }
            )
          ],
          { direction: "rtl", role: "menu" },
          { menu: { classList: ["chat-room-message-popup"], attributes: { "aria-direction": "horizontal" } } }
        )
      ];
    });
    document.addEventListener("click", async (event) => {
      const link = event.target.closest("a");
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          if (url.protocol === "zc:") {
            event.preventDefault();
            if (link.href.startsWith("zc://open")) {
              const target = url.pathname.split("/").filter(Boolean)[1];
              if (target === void 0) return;
              switch (target) {
                case "Admin": {
                  if (await dialogsManager.confirm({ message: "This deep link wants to redirect you to Admin subscreen. Confirm the redirecting." })) {
                    ChatRoomOpenAdminScreen();
                  }
                  break;
                }
                case "Wardrobe": {
                  if (await dialogsManager.confirm({ message: "This deep link wants to redirect you to Wardrobe subscreen. Confirm the redirecting." })) {
                    ChatRoomOpenWardrobeScreen();
                  }
                  break;
                }
                case "Information": {
                  if (await dialogsManager.confirm({ message: "This deep link wants to redirect you to Information subscreen. Confirm the redirecting." })) {
                    ChatRoomOpenInformationScreen();
                  }
                  break;
                }
                default: {
                  window.dispatchEvent(new SetSubscreenEvent({ target, isTrusted: false }));
                }
              }
            }
          }
        } catch (e) {
        }
      }
    }, true);
  }

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/localization.js
  var translations = {};
  async function loadLocalization() {
    if (MOD_DATA.localization === void 0) {
      logger.log("Skip localization procedure because its not configured");
      return;
    }
    const supportedLocales = MOD_DATA.localization.locales.supported;
    const defaultLocale = MOD_DATA.localization.locales.default;
    const preferredLocale = TranslationLanguage.toLowerCase();
    if (!supportedLocales.includes(defaultLocale)) {
      logger.warn(`Default locale ${defaultLocale} isn't supported, fix configuration`);
      return;
    }
    hookFunction("TranslationSwitchLanguage", HookPriority.OBSERVE, (args, next) => {
      const value = next(args);
      if (supportedLocales.includes(TranslationLanguage.toLowerCase()) && !(TranslationLanguage.toLowerCase() in translations)) {
        fetchTranslationsForLocale(TranslationLanguage.toLowerCase());
      }
      return value;
    });
    await fetchTranslationsForLocale(defaultLocale);
    if (preferredLocale !== defaultLocale && supportedLocales.includes(preferredLocale)) {
      await fetchTranslationsForLocale(preferredLocale);
    }
  }
  async function fetchTranslationsForLocale(locale) {
    const response = await fetch(MOD_DATA.localization.translationsFolderPath + "/" + locale + ".json?=" + Date.now());
    if (!response.ok) return logger.error(`Failed to fetch ${locale} translations at ${response.url}` + locale);
    const data = await response.json();
    logger.log(`Fetched translations for locale: ${locale}`, data);
    translations[locale] = data;
  }

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/package.json
  var version2 = "2.0.4";

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/index.js
  var MOD_DATA;
  function bootstrap(modData) {
    if (!window.ZOIS_CORE) registerCore();
    MOD_DATA = modData;
    createModSdk();
    loadLocalization();
    hookFunction("GameKeyDown", HookPriority.ADD_BEHAVIOR, (args, next) => {
      const currentSubscreen2 = getCurrentSubscreen();
      if (CommonKey.IsPressed(args[0], "Escape") && !!currentSubscreen2) {
        currentSubscreen2.exit();
        return false;
      }
      const zcDialog = document.querySelector(".zcDialog");
      if (zcDialog instanceof HTMLDivElement) {
        zcDialog.focus();
        return false;
      }
      return next(args);
    });
    window.addEventListener(
      "zois-core:setsubscreen",
      async (_event) => {
        const event = _event;
        const target = event.detail.target;
        const isTrusted = event.detail.isTrusted;
        if (target === void 0) return;
        if (target.startsWith(MOD_DATA.key + ":")) {
          const currentSubscreen2 = getCurrentSubscreen();
          const mod = target.substring(0, MOD_DATA.key.length);
          const subscreen = target.substring(MOD_DATA.key.length + 1);
          if (currentSubscreen2?.constructor?.name === subscreen) return;
          const s = MOD_DATA.subscreens?.[subscreen];
          if (s === void 0) return;
          if (isTrusted || await dialogsManager.confirm({ message: `Confirm the redirecting to modded subscreen ${target}` })) {
            await PreferenceOpenSubscreen("Extensions");
            await PreferenceSubscreenExtensionsOpen(mod, ["Online", "ChatRoom"]);
            setSubscreen(new s());
          }
        }
      }
    );
    ServerIsLoggedInAsync().then(() => {
      if (modData.onReady) setTimeout(modData.onReady, getRandomNumber(3e3, 6e3));
    });
  }
  function formatString(text) {
    if (!text || typeof text !== "string") {
      return { isBeatifulString: false };
    }
    let result = text;
    let hasChanges = false;
    const markdownRegex = /\[([^\]]+?)\]\(([^)]+?)\)/g;
    const newResult = result.replace(markdownRegex, (match, linkText, url) => {
      hasChanges = true;
      const escapedText = linkText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${escapedText}</a>`;
    });
    if (newResult !== result) {
      result = newResult;
    }
    const zcRegex = /(?<!\S)zc:\/\/open[^\s<>"']*(?!\S)/gi;
    result = result.replace(zcRegex, (match) => {
      hasChanges = true;
      return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    if (hasChanges) {
      return {
        html: result,
        isBeatifulString: true
      };
    }
    return { isBeatifulString: false };
  }
  var SetSubscreenEvent = class extends CustomEvent {
    constructor(detail) {
      super(`zois-core:setsubscreen`, { detail });
    }
  };
  var SubscreenLoadedEvent = class extends CustomEvent {
    constructor(detail) {
      super(`zois-core:subscreenloaded`, { detail });
    }
  };
  var SubscreenUnloadedEvent = class extends CustomEvent {
    constructor(detail) {
      super(`zois-core:subscreenunloaded`, { detail });
    }
  };
  var CoreSettingsChangedEvent = class extends CustomEvent {
    constructor() {
      super(`zois-core:coresettingschanged`);
    }
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
      if (cancelFunc()) {
        return false;
      }
      await sleep(10);
    }
    return true;
  }
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function isVersionNewer(version1, version22) {
    const v1Parts = version1.split(".");
    const v2Parts = version22.split(".");
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = parseInt(v1Parts[i] || "0", 10);
      const v2Part = parseInt(v2Parts[i] || "0", 10);
      if (v1Part > v2Part) {
        return true;
      } else if (v1Part < v2Part) {
        return false;
      }
    }
    return false;
  }
  function colorsEqual(c1, c2) {
    if (!c1 && !c2) return true;
    if (!c1 && c2 === "Default" || !c2 && c1 === "Default") return true;
    if (c1 === "Default" && Array.isArray(c2) && c2.filter((d) => d === "Default").length === c2.length) return true;
    if (c2 === "Default" && Array.isArray(c1) && c1.filter((d) => d === "Default").length === c1.length) return true;
    return JSON.stringify(c1) === JSON.stringify(c2);
  }
  function getSizeInKbytes(b) {
    if (typeof b === "string") {
      return Math.round(new TextEncoder().encode(b).byteLength / 100) / 10;
    } else {
      return Math.round(new TextEncoder().encode(JSON.stringify(b)).byteLength / 100) / 10;
    }
  }
  function getPlayer(value) {
    if (!value) return null;
    return ChatRoomCharacter.find((Character) => {
      return Character.MemberNumber == value || Character.Name.toLowerCase() === value || Character.Nickname?.toLowerCase() === value;
    }) ?? null;
  }
  function getNickname(target) {
    return CharacterNickname(target);
  }
  function injectStyles(stylesToInject) {
    const style = document.createElement("style");
    style.innerHTML = stylesToInject;
    document.head.append(style);
  }
  function normalizeObject(obj) {
    if (!CommonIsObject(obj)) return obj;
    if (Array.isArray(obj)) {
      return obj.map(normalizeObject).sort();
    }
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = normalizeObject(obj[key]);
      return acc;
    }, {});
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/enums/transformation-type.enum.js
  var TransformationType;
  (function(TransformationType2) {
    TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
    TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
    TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
  })(TransformationType || (TransformationType = {}));

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/MetadataStorage.js
  var MetadataStorage = (
    /** @class */
    (function() {
      function MetadataStorage3() {
        this._typeMetadatas = /* @__PURE__ */ new Map();
        this._transformMetadatas = /* @__PURE__ */ new Map();
        this._exposeMetadatas = /* @__PURE__ */ new Map();
        this._excludeMetadatas = /* @__PURE__ */ new Map();
        this._ancestorsMap = /* @__PURE__ */ new Map();
      }
      MetadataStorage3.prototype.addTypeMetadata = function(metadata) {
        if (!this._typeMetadatas.has(metadata.target)) {
          this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      };
      MetadataStorage3.prototype.addTransformMetadata = function(metadata) {
        if (!this._transformMetadatas.has(metadata.target)) {
          this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
          this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
        }
        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
      };
      MetadataStorage3.prototype.addExposeMetadata = function(metadata) {
        if (!this._exposeMetadatas.has(metadata.target)) {
          this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      };
      MetadataStorage3.prototype.addExcludeMetadata = function(metadata) {
        if (!this._excludeMetadatas.has(metadata.target)) {
          this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      };
      MetadataStorage3.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        });
      };
      MetadataStorage3.prototype.findExcludeMetadata = function(target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
      };
      MetadataStorage3.prototype.findExposeMetadata = function(target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
      };
      MetadataStorage3.prototype.findExposeMetadataByCustomName = function(target, name) {
        return this.getExposedMetadatas(target).find(function(metadata) {
          return metadata.options && metadata.options.name === name;
        });
      };
      MetadataStorage3.prototype.findTypeMetadata = function(target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
      };
      MetadataStorage3.prototype.getStrategy = function(target) {
        var excludeMap = this._excludeMetadatas.get(target);
        var exclude = excludeMap && excludeMap.get(void 0);
        var exposeMap = this._exposeMetadatas.get(target);
        var expose = exposeMap && exposeMap.get(void 0);
        if (exclude && expose || !exclude && !expose)
          return "none";
        return exclude ? "excludeAll" : "exposeAll";
      };
      MetadataStorage3.prototype.getExposedMetadatas = function(target) {
        return this.getMetadata(this._exposeMetadatas, target);
      };
      MetadataStorage3.prototype.getExcludedMetadatas = function(target) {
        return this.getMetadata(this._excludeMetadatas, target);
      };
      MetadataStorage3.prototype.getExposedProperties = function(target, transformationType) {
        return this.getExposedMetadatas(target).filter(function(metadata) {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map(function(metadata) {
          return metadata.propertyName;
        });
      };
      MetadataStorage3.prototype.getExcludedProperties = function(target, transformationType) {
        return this.getExcludedMetadatas(target).filter(function(metadata) {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map(function(metadata) {
          return metadata.propertyName;
        });
      };
      MetadataStorage3.prototype.clear = function() {
        this._typeMetadatas.clear();
        this._exposeMetadatas.clear();
        this._excludeMetadatas.clear();
        this._ancestorsMap.clear();
      };
      MetadataStorage3.prototype.getMetadata = function(metadatas, target) {
        var metadataFromTargetMap = metadatas.get(target);
        var metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
            return meta.propertyName !== void 0;
          });
        }
        var metadataFromAncestors = [];
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
          var ancestor = _a[_i];
          var ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
              return meta.propertyName !== void 0;
            });
            metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
          }
        }
        return metadataFromAncestors.concat(metadataFromTarget || []);
      };
      MetadataStorage3.prototype.findMetadata = function(metadatas, target, propertyName) {
        var metadataFromTargetMap = metadatas.get(target);
        if (metadataFromTargetMap) {
          var metadataFromTarget = metadataFromTargetMap.get(propertyName);
          if (metadataFromTarget) {
            return metadataFromTarget;
          }
        }
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
          var ancestor = _a[_i];
          var ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            var ancestorResult = ancestorMetadataMap.get(propertyName);
            if (ancestorResult) {
              return ancestorResult;
            }
          }
        }
        return void 0;
      };
      MetadataStorage3.prototype.findMetadatas = function(metadatas, target, propertyName) {
        var metadataFromTargetMap = metadatas.get(target);
        var metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = metadataFromTargetMap.get(propertyName);
        }
        var metadataFromAncestorsTarget = [];
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
          var ancestor = _a[_i];
          var ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            if (ancestorMetadataMap.has(propertyName)) {
              metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
            }
          }
        }
        return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
      };
      MetadataStorage3.prototype.getAncestors = function(target) {
        if (!target)
          return [];
        if (!this._ancestorsMap.has(target)) {
          var ancestors = [];
          for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
            ancestors.push(baseClass);
          }
          this._ancestorsMap.set(target, ancestors);
        }
        return this._ancestorsMap.get(target);
      };
      return MetadataStorage3;
    })()
  );

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/storage.js
  var defaultMetadataStorage = new MetadataStorage();

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/utils/get-global.util.js
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof self !== "undefined") {
      return self;
    }
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/utils/is-promise.util.js
  function isPromise(p) {
    return p !== null && typeof p === "object" && typeof p.then === "function";
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/TransformOperationExecutor.js
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  function instantiateArrayType(arrayType) {
    var array = new arrayType();
    if (!(array instanceof Set) && !("push" in array)) {
      return [];
    }
    return array;
  }
  var TransformOperationExecutor = (
    /** @class */
    (function() {
      function TransformOperationExecutor2(transformationType, options) {
        this.transformationType = transformationType;
        this.options = options;
        this.recursionStack = /* @__PURE__ */ new Set();
      }
      TransformOperationExecutor2.prototype.transform = function(source, value, targetType, arrayType, isMap2, level) {
        var _this = this;
        if (level === void 0) {
          level = 0;
        }
        if (Array.isArray(value) || value instanceof Set) {
          var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
          value.forEach(function(subValue, index) {
            var subSource = source ? source[index] : void 0;
            if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
              var realTargetType = void 0;
              if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
                if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                  realTargetType = targetType.options.discriminator.subTypes.find(function(subType) {
                    return subType.name === subValue[targetType.options.discriminator.property];
                  });
                  var options = { newObject: newValue_1, object: subValue, property: void 0 };
                  var newType = targetType.typeFunction(options);
                  realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                  if (!targetType.options.keepDiscriminatorProperty)
                    delete subValue[targetType.options.discriminator.property];
                }
                if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                  realTargetType = subValue.constructor;
                }
                if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                  subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function(subType) {
                    return subType.value === subValue.constructor;
                  }).name;
                }
              } else {
                realTargetType = targetType;
              }
              var value_1 = _this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
              if (newValue_1 instanceof Set) {
                newValue_1.add(value_1);
              } else {
                newValue_1.push(value_1);
              }
            } else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
              if (newValue_1 instanceof Set) {
                newValue_1.add(subValue);
              } else {
                newValue_1.push(subValue);
              }
            }
          });
          return newValue_1;
        } else if (targetType === String && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return String(value);
        } else if (targetType === Number && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return Number(value);
        } else if (targetType === Boolean && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return Boolean(value);
        } else if ((targetType === Date || value instanceof Date) && !isMap2) {
          if (value instanceof Date) {
            return new Date(value.valueOf());
          }
          if (value === null || value === void 0)
            return value;
          return new Date(value);
        } else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return Buffer.from(value);
        } else if (isPromise(value) && !isMap2) {
          return new Promise(function(resolve, reject) {
            value.then(function(data) {
              return resolve(_this.transform(void 0, data, targetType, void 0, void 0, level + 1));
            }, reject);
          });
        } else if (!isMap2 && value !== null && typeof value === "object" && typeof value.then === "function") {
          return value;
        } else if (typeof value === "object" && value !== null) {
          if (!targetType && value.constructor !== Object)
            if (!Array.isArray(value) && value.constructor === Array) {
            } else {
              targetType = value.constructor;
            }
          if (!targetType && source)
            targetType = source.constructor;
          if (this.options.enableCircularCheck) {
            this.recursionStack.add(value);
          }
          var keys2 = this.getKeys(targetType, value, isMap2);
          var newValue = source ? source : {};
          if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
            if (isMap2) {
              newValue = /* @__PURE__ */ new Map();
            } else if (targetType) {
              newValue = new targetType();
            } else {
              newValue = {};
            }
          }
          var _loop_1 = function(key2) {
            if (key2 === "__proto__" || key2 === "constructor") {
              return "continue";
            }
            var valueKey = key2;
            var newValueKey = key2, propertyName = key2;
            if (!this_1.options.ignoreDecorators && targetType) {
              if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key2);
                if (exposeMetadata) {
                  propertyName = exposeMetadata.propertyName;
                  newValueKey = exposeMetadata.propertyName;
                }
              } else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key2);
                if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                  newValueKey = exposeMetadata.options.name;
                }
              }
            }
            var subValue = void 0;
            if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              subValue = value[valueKey];
            } else {
              if (value instanceof Map) {
                subValue = value.get(valueKey);
              } else if (value[valueKey] instanceof Function) {
                subValue = value[valueKey]();
              } else {
                subValue = value[valueKey];
              }
            }
            var type = void 0, isSubValueMap = subValue instanceof Map;
            if (targetType && isMap2) {
              type = targetType;
            } else if (targetType) {
              var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
              if (metadata_1) {
                var options = { newObject: newValue, object: value, property: propertyName };
                var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
                if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                  if (!(value[valueKey] instanceof Array)) {
                    if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                      type = metadata_1.options.discriminator.subTypes.find(function(subType) {
                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                          return subType.name === subValue[metadata_1.options.discriminator.property];
                        }
                      });
                      type === void 0 ? type = newType : type = type.value;
                      if (!metadata_1.options.keepDiscriminatorProperty) {
                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                          delete subValue[metadata_1.options.discriminator.property];
                        }
                      }
                    }
                    if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                      type = subValue.constructor;
                    }
                    if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                      if (subValue) {
                        subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function(subType) {
                          return subType.value === subValue.constructor;
                        }).name;
                      }
                    }
                  } else {
                    type = metadata_1;
                  }
                } else {
                  type = newType;
                }
                isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
              } else if (this_1.options.targetMaps) {
                this_1.options.targetMaps.filter(function(map) {
                  return map.target === targetType && !!map.properties[propertyName];
                }).forEach(function(map) {
                  return type = map.properties[propertyName];
                });
              } else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
                if (reflectedType) {
                  type = reflectedType;
                }
              }
            }
            var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : void 0;
            var subSource = source ? source[valueKey] : void 0;
            if (newValue.constructor.prototype) {
              var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
              if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
              (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
                return "continue";
            }
            if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
              var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key2;
              var finalValue = void 0;
              if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                finalValue = value[transformKey];
                finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                finalValue = value[transformKey] === finalValue ? subValue : finalValue;
                finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
              } else {
                if (subValue === void 0 && this_1.options.exposeDefaultValues) {
                  finalValue = newValue[newValueKey];
                } else {
                  finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                  finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                }
              }
              if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            } else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
              var finalValue = subValue;
              finalValue = this_1.applyCustomTransformations(finalValue, targetType, key2, value, this_1.transformationType);
              if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            }
          };
          var this_1 = this;
          for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
          }
          if (this.options.enableCircularCheck) {
            this.recursionStack.delete(value);
          }
          return newValue;
        } else {
          return value;
        }
      };
      TransformOperationExecutor2.prototype.applyCustomTransformations = function(value, target, key, obj, transformationType) {
        var _this = this;
        var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
        if (this.options.version !== void 0) {
          metadatas = metadatas.filter(function(metadata) {
            if (!metadata.options)
              return true;
            return _this.checkVersion(metadata.options.since, metadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          metadatas = metadatas.filter(function(metadata) {
            if (!metadata.options)
              return true;
            return _this.checkGroups(metadata.options.groups);
          });
        } else {
          metadatas = metadatas.filter(function(metadata) {
            return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
          });
        }
        metadatas.forEach(function(metadata) {
          value = metadata.transformFn({ value, key, obj, type: transformationType, options: _this.options });
        });
        return value;
      };
      TransformOperationExecutor2.prototype.isCircular = function(object) {
        return this.recursionStack.has(object);
      };
      TransformOperationExecutor2.prototype.getReflectedType = function(target, propertyName) {
        if (!target)
          return void 0;
        var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
        return meta ? meta.reflectedType : void 0;
      };
      TransformOperationExecutor2.prototype.getKeys = function(target, object, isMap2) {
        var _this = this;
        var strategy = defaultMetadataStorage.getStrategy(target);
        if (strategy === "none")
          strategy = this.options.strategy || "exposeAll";
        var keys2 = [];
        if (strategy === "exposeAll" || isMap2) {
          if (object instanceof Map) {
            keys2 = Array.from(object.keys());
          } else {
            keys2 = Object.keys(object);
          }
        }
        if (isMap2) {
          return keys2;
        }
        if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
          var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          var excludedProperties = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          keys2 = __spreadArray(__spreadArray([], exposedProperties, true), excludedProperties, true);
        }
        if (!this.options.ignoreDecorators && target) {
          var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
            exposedProperties = exposedProperties.map(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                return exposeMetadata.options.name;
              }
              return key;
            });
          }
          if (this.options.excludeExtraneousValues) {
            keys2 = exposedProperties;
          } else {
            keys2 = keys2.concat(exposedProperties);
          }
          var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          if (excludedProperties_1.length > 0) {
            keys2 = keys2.filter(function(key) {
              return !excludedProperties_1.includes(key);
            });
          }
          if (this.options.version !== void 0) {
            keys2 = keys2.filter(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
            });
          }
          if (this.options.groups && this.options.groups.length) {
            keys2 = keys2.filter(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return _this.checkGroups(exposeMetadata.options.groups);
            });
          } else {
            keys2 = keys2.filter(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
            });
          }
        }
        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
          keys2 = keys2.filter(function(key) {
            return _this.options.excludePrefixes.every(function(prefix) {
              return key.substr(0, prefix.length) !== prefix;
            });
          });
        }
        keys2 = keys2.filter(function(key, index, self2) {
          return self2.indexOf(key) === index;
        });
        return keys2;
      };
      TransformOperationExecutor2.prototype.checkVersion = function(since, until) {
        var decision = true;
        if (decision && since)
          decision = this.options.version >= since;
        if (decision && until)
          decision = this.options.version < until;
        return decision;
      };
      TransformOperationExecutor2.prototype.checkGroups = function(groups) {
        if (!groups)
          return true;
        return this.options.groups.some(function(optionGroup) {
          return groups.includes(optionGroup);
        });
      };
      return TransformOperationExecutor2;
    })()
  );

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/constants/default-options.constant.js
  var defaultOptions = {
    enableCircularCheck: false,
    enableImplicitConversion: false,
    excludeExtraneousValues: false,
    excludePrefixes: void 0,
    exposeDefaultValues: false,
    exposeUnsetFields: true,
    groups: void 0,
    ignoreDecorators: false,
    strategy: void 0,
    targetMaps: void 0,
    version: void 0
  };

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/ClassTransformer.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var ClassTransformer = (
    /** @class */
    (function() {
      function ClassTransformer2() {
      }
      ClassTransformer2.prototype.instanceToPlain = function(object, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.classToPlainFromExist = function(object, plainObject, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
        return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.plainToInstance = function(cls, plain, options) {
        var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.plainToClassFromExist = function(clsObject, plain, options) {
        var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.instanceToInstance = function(object, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.classToClassFromExist = function(object, fromObject, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.serialize = function(object, options) {
        return JSON.stringify(this.instanceToPlain(object, options));
      };
      ClassTransformer2.prototype.deserialize = function(cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      };
      ClassTransformer2.prototype.deserializeArray = function(cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      };
      return ClassTransformer2;
    })()
  );

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/index.js
  var classTransformer = new ClassTransformer();
  function plainToInstance(cls, plain, options) {
    return classTransformer.plainToInstance(cls, plain, options);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/metadata/ValidationMetadata.js
  var ValidationMetadata = (
    /** @class */
    /* @__PURE__ */ (function() {
      function ValidationMetadata2(args) {
        this.groups = [];
        this.each = false;
        this.context = void 0;
        this.type = args.type;
        this.name = args.name;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args === null || args === void 0 ? void 0 : args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
          this.message = args.validationOptions.message;
          this.groups = args.validationOptions.groups;
          this.always = args.validationOptions.always;
          this.each = args.validationOptions.each;
          this.context = args.validationOptions.context;
        }
      }
      return ValidationMetadata2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js
  var ValidationSchemaToMetadataTransformer = (
    /** @class */
    (function() {
      function ValidationSchemaToMetadataTransformer2() {
      }
      ValidationSchemaToMetadataTransformer2.prototype.transform = function(schema) {
        var metadatas = [];
        Object.keys(schema.properties).forEach(function(property) {
          schema.properties[property].forEach(function(validation) {
            var validationOptions = {
              message: validation.message,
              groups: validation.groups,
              always: validation.always,
              each: validation.each
            };
            var args = {
              type: validation.type,
              name: validation.name,
              target: schema.name,
              propertyName: property,
              constraints: validation.constraints,
              validationTypeOptions: validation.options,
              validationOptions
            };
            metadatas.push(new ValidationMetadata(args));
          });
        });
        return metadatas;
      };
      return ValidationSchemaToMetadataTransformer2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/utils/convert-to-array.util.js
  function convertToArray(val) {
    if (val instanceof Map) {
      return Array.from(val.values());
    }
    return Array.isArray(val) ? val : Array.from(val);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/utils/get-global.util.js
  function getGlobal2() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof self !== "undefined") {
      return self;
    }
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/utils/is-promise.util.js
  function isPromise2(p) {
    return p !== null && typeof p === "object" && typeof p.then === "function";
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/metadata/MetadataStorage.js
  var __values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var MetadataStorage2 = (
    /** @class */
    (function() {
      function MetadataStorage3() {
        this.validationMetadatas = /* @__PURE__ */ new Map();
        this.constraintMetadatas = /* @__PURE__ */ new Map();
      }
      Object.defineProperty(MetadataStorage3.prototype, "hasValidationMetaData", {
        get: function() {
          return !!this.validationMetadatas.size;
        },
        enumerable: false,
        configurable: true
      });
      MetadataStorage3.prototype.addValidationSchema = function(schema) {
        var _this = this;
        var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
        validationMetadatas.forEach(function(validationMetadata) {
          return _this.addValidationMetadata(validationMetadata);
        });
      };
      MetadataStorage3.prototype.addValidationMetadata = function(metadata) {
        var existingMetadata = this.validationMetadatas.get(metadata.target);
        if (existingMetadata) {
          existingMetadata.push(metadata);
        } else {
          this.validationMetadatas.set(metadata.target, [metadata]);
        }
      };
      MetadataStorage3.prototype.addConstraintMetadata = function(metadata) {
        var existingMetadata = this.constraintMetadatas.get(metadata.target);
        if (existingMetadata) {
          existingMetadata.push(metadata);
        } else {
          this.constraintMetadatas.set(metadata.target, [metadata]);
        }
      };
      MetadataStorage3.prototype.groupByPropertyName = function(metadata) {
        var grouped = {};
        metadata.forEach(function(metadata2) {
          if (!grouped[metadata2.propertyName])
            grouped[metadata2.propertyName] = [];
          grouped[metadata2.propertyName].push(metadata2);
        });
        return grouped;
      };
      MetadataStorage3.prototype.getTargetValidationMetadatas = function(targetConstructor, targetSchema, always, strictGroups, groups) {
        var e_1, _a;
        var includeMetadataBecauseOfAlwaysOption = function(metadata) {
          if (typeof metadata.always !== "undefined")
            return metadata.always;
          if (metadata.groups && metadata.groups.length)
            return false;
          return always;
        };
        var excludeMetadataBecauseOfStrictGroupsOption = function(metadata) {
          if (strictGroups) {
            if (!groups || !groups.length) {
              if (metadata.groups && metadata.groups.length)
                return true;
            }
          }
          return false;
        };
        var filteredForOriginalMetadatasSearch = this.validationMetadatas.get(targetConstructor) || [];
        var originalMetadatas = filteredForOriginalMetadatasSearch.filter(function(metadata) {
          if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
            return false;
          if (includeMetadataBecauseOfAlwaysOption(metadata))
            return true;
          if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
            return false;
          if (groups && groups.length > 0)
            return metadata.groups && !!metadata.groups.find(function(group) {
              return groups.indexOf(group) !== -1;
            });
          return true;
        });
        var filteredForInheritedMetadatasSearch = [];
        try {
          for (var _b = __values(this.validationMetadatas.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (targetConstructor.prototype instanceof key) {
              filteredForInheritedMetadatasSearch.push.apply(filteredForInheritedMetadatasSearch, __spreadArray2([], __read(value), false));
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        var inheritedMetadatas = filteredForInheritedMetadatasSearch.filter(function(metadata) {
          if (typeof metadata.target === "string")
            return false;
          if (metadata.target === targetConstructor)
            return false;
          if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
            return false;
          if (includeMetadataBecauseOfAlwaysOption(metadata))
            return true;
          if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
            return false;
          if (groups && groups.length > 0)
            return metadata.groups && !!metadata.groups.find(function(group) {
              return groups.indexOf(group) !== -1;
            });
          return true;
        });
        var uniqueInheritedMetadatas = inheritedMetadatas.filter(function(inheritedMetadata) {
          return !originalMetadatas.find(function(originalMetadata) {
            return originalMetadata.propertyName === inheritedMetadata.propertyName && originalMetadata.type === inheritedMetadata.type;
          });
        });
        return originalMetadatas.concat(uniqueInheritedMetadatas);
      };
      MetadataStorage3.prototype.getTargetValidatorConstraints = function(target) {
        return this.constraintMetadatas.get(target) || [];
      };
      return MetadataStorage3;
    })()
  );
  function getMetadataStorage() {
    var global2 = getGlobal2();
    if (!global2.classValidatorMetadataStorage) {
      global2.classValidatorMetadataStorage = new MetadataStorage2();
    }
    return global2.classValidatorMetadataStorage;
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationError.js
  var ValidationError = (
    /** @class */
    (function() {
      function ValidationError2() {
      }
      ValidationError2.prototype.toString = function(shouldDecorate, hasParent, parentPath, showConstraintMessages) {
        var _this = this;
        if (shouldDecorate === void 0) {
          shouldDecorate = false;
        }
        if (hasParent === void 0) {
          hasParent = false;
        }
        if (parentPath === void 0) {
          parentPath = "";
        }
        if (showConstraintMessages === void 0) {
          showConstraintMessages = false;
        }
        var boldStart = shouldDecorate ? "\x1B[1m" : "";
        var boldEnd = shouldDecorate ? "\x1B[22m" : "";
        var constraintsToString = function() {
          var _a;
          return (showConstraintMessages ? Object.values : Object.keys)((_a = _this.constraints) !== null && _a !== void 0 ? _a : {}).join(", ");
        };
        var propConstraintFailed = function(propertyName) {
          return " - property ".concat(boldStart).concat(parentPath).concat(propertyName).concat(boldEnd, " has failed the following constraints: ").concat(boldStart).concat(constraintsToString()).concat(boldEnd, " \n");
        };
        if (!hasParent) {
          return "An instance of ".concat(boldStart).concat(this.target ? this.target.constructor.name : "an object").concat(boldEnd, " has failed the validation:\n") + (this.constraints ? propConstraintFailed(this.property) : "") + (this.children ? this.children.map(function(childError) {
            return childError.toString(shouldDecorate, true, _this.property, showConstraintMessages);
          }).join("") : "");
        } else {
          var formattedProperty_1 = Number.isInteger(+this.property) ? "[".concat(this.property, "]") : "".concat(parentPath ? "." : "").concat(this.property);
          if (this.constraints) {
            return propConstraintFailed(formattedProperty_1);
          } else {
            return this.children ? this.children.map(function(childError) {
              return childError.toString(shouldDecorate, true, "".concat(parentPath).concat(formattedProperty_1), showConstraintMessages);
            }).join("") : "";
          }
        }
      };
      return ValidationError2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationTypes.js
  var ValidationTypes = (
    /** @class */
    (function() {
      function ValidationTypes2() {
      }
      ValidationTypes2.isValid = function(type) {
        var _this = this;
        return type !== "isValid" && type !== "getMessage" && Object.keys(this).map(function(key) {
          return _this[key];
        }).indexOf(type) !== -1;
      };
      ValidationTypes2.CUSTOM_VALIDATION = "customValidation";
      ValidationTypes2.NESTED_VALIDATION = "nestedValidation";
      ValidationTypes2.PROMISE_VALIDATION = "promiseValidation";
      ValidationTypes2.CONDITIONAL_VALIDATION = "conditionalValidation";
      ValidationTypes2.WHITELIST = "whitelistValidation";
      ValidationTypes2.IS_DEFINED = "isDefined";
      return ValidationTypes2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationUtils.js
  function constraintToString(constraint) {
    if (Array.isArray(constraint)) {
      return constraint.join(", ");
    }
    if (typeof constraint === "symbol") {
      constraint = constraint.description;
    }
    return "".concat(constraint);
  }
  var ValidationUtils = (
    /** @class */
    (function() {
      function ValidationUtils2() {
      }
      ValidationUtils2.replaceMessageSpecialTokens = function(message, validationArguments) {
        var messageString;
        if (message instanceof Function) {
          messageString = message(validationArguments);
        } else if (typeof message === "string") {
          messageString = message;
        }
        if (messageString && Array.isArray(validationArguments.constraints)) {
          validationArguments.constraints.forEach(function(constraint, index) {
            messageString = messageString.replace(new RegExp("\\$constraint".concat(index + 1), "g"), constraintToString(constraint));
          });
        }
        if (messageString && validationArguments.value !== void 0 && validationArguments.value !== null && ["string", "boolean", "number"].includes(typeof validationArguments.value))
          messageString = messageString.replace(/\$value/g, validationArguments.value);
        if (messageString)
          messageString = messageString.replace(/\$property/g, validationArguments.property);
        if (messageString)
          messageString = messageString.replace(/\$target/g, validationArguments.targetName);
        return messageString;
      };
      return ValidationUtils2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationExecutor.js
  var __read2 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var ValidationExecutor = (
    /** @class */
    (function() {
      function ValidationExecutor2(validator, validatorOptions) {
        this.validator = validator;
        this.validatorOptions = validatorOptions;
        this.awaitingPromises = [];
        this.ignoreAsyncValidations = false;
        this.metadataStorage = getMetadataStorage();
      }
      ValidationExecutor2.prototype.execute = function(object, targetSchema, validationErrors) {
        var _this = this;
        var _a, _b;
        if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) === null || _a === void 0 ? void 0 : _a.enableDebugMessages) === true) {
          console.warn("No validation metadata found. No validation will be  performed. There are multiple possible reasons:\n  - There may be multiple class-validator versions installed. You will need to flatten your dependencies to fix the issue.\n  - This validation runs before any file with validation decorator was parsed by NodeJS.");
        }
        var groups = this.validatorOptions ? this.validatorOptions.groups : void 0;
        var strictGroups = this.validatorOptions && this.validatorOptions.strictGroups || false;
        var always = this.validatorOptions && this.validatorOptions.always || false;
        var forbidUnknownValues = ((_b = this.validatorOptions) === null || _b === void 0 ? void 0 : _b.forbidUnknownValues) === void 0 || this.validatorOptions.forbidUnknownValues !== false;
        var targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(object.constructor, targetSchema, always, strictGroups, groups);
        var groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
        if (forbidUnknownValues && !targetMetadatas.length) {
          var validationError = new ValidationError();
          if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === true)
            validationError.target = object;
          validationError.value = void 0;
          validationError.property = void 0;
          validationError.children = [];
          validationError.constraints = { unknownValue: "an unknown value was passed to the validate function" };
          validationErrors.push(validationError);
          return;
        }
        if (this.validatorOptions && this.validatorOptions.whitelist)
          this.whitelist(object, groupedMetadatas, validationErrors);
        Object.keys(groupedMetadatas).forEach(function(propertyName) {
          var value = object[propertyName];
          var definedMetadatas = groupedMetadatas[propertyName].filter(function(metadata) {
            return metadata.type === ValidationTypes.IS_DEFINED;
          });
          var metadatas = groupedMetadatas[propertyName].filter(function(metadata) {
            return metadata.type !== ValidationTypes.IS_DEFINED && metadata.type !== ValidationTypes.WHITELIST;
          });
          if (value instanceof Promise && metadatas.find(function(metadata) {
            return metadata.type === ValidationTypes.PROMISE_VALIDATION;
          })) {
            _this.awaitingPromises.push(value.then(function(resolvedValue) {
              _this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
            }));
          } else {
            _this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
          }
        });
      };
      ValidationExecutor2.prototype.whitelist = function(object, groupedMetadatas, validationErrors) {
        var _this = this;
        var notAllowedProperties = [];
        Object.keys(object).forEach(function(propertyName) {
          if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
            notAllowedProperties.push(propertyName);
        });
        if (notAllowedProperties.length > 0) {
          if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
            notAllowedProperties.forEach(function(property) {
              var _a;
              var validationError = _this.generateValidationError(object, object[property], property);
              validationError.constraints = (_a = {}, _a[ValidationTypes.WHITELIST] = "property ".concat(property, " should not exist"), _a);
              validationError.children = void 0;
              validationErrors.push(validationError);
            });
          } else {
            notAllowedProperties.forEach(function(property) {
              return delete object[property];
            });
          }
        }
      };
      ValidationExecutor2.prototype.stripEmptyErrors = function(errors) {
        var _this = this;
        return errors.filter(function(error) {
          if (error.children) {
            error.children = _this.stripEmptyErrors(error.children);
          }
          if (Object.keys(error.constraints).length === 0) {
            if (error.children.length === 0) {
              return false;
            } else {
              delete error.constraints;
            }
          }
          return true;
        });
      };
      ValidationExecutor2.prototype.performValidations = function(object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
        var customValidationMetadatas = metadatas.filter(function(metadata) {
          return metadata.type === ValidationTypes.CUSTOM_VALIDATION;
        });
        var nestedValidationMetadatas = metadatas.filter(function(metadata) {
          return metadata.type === ValidationTypes.NESTED_VALIDATION;
        });
        var conditionalValidationMetadatas = metadatas.filter(function(metadata) {
          return metadata.type === ValidationTypes.CONDITIONAL_VALIDATION;
        });
        var validationError = this.generateValidationError(object, value, propertyName);
        validationErrors.push(validationError);
        var canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
        if (!canValidate) {
          return;
        }
        this.customValidations(object, value, definedMetadatas, validationError);
        this.mapContexts(object, value, definedMetadatas, validationError);
        if (value === void 0 && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
          return;
        }
        if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
          return;
        }
        if ((value === null || value === void 0) && this.validatorOptions && this.validatorOptions.skipMissingProperties === true) {
          return;
        }
        this.customValidations(object, value, customValidationMetadatas, validationError);
        this.nestedValidations(value, nestedValidationMetadatas, validationError);
        this.mapContexts(object, value, metadatas, validationError);
        this.mapContexts(object, value, customValidationMetadatas, validationError);
      };
      ValidationExecutor2.prototype.generateValidationError = function(object, value, propertyName) {
        var validationError = new ValidationError();
        if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === true)
          validationError.target = object;
        if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.value === void 0 || this.validatorOptions.validationError.value === true)
          validationError.value = value;
        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};
        return validationError;
      };
      ValidationExecutor2.prototype.conditionalValidations = function(object, value, metadatas) {
        return metadatas.map(function(metadata) {
          return metadata.constraints[0](object, value);
        }).reduce(function(resultA, resultB) {
          return resultA && resultB;
        }, true);
      };
      ValidationExecutor2.prototype.customValidations = function(object, value, metadatas, error) {
        var _this = this;
        metadatas.forEach(function(metadata) {
          _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach(function(customConstraintMetadata) {
            if (customConstraintMetadata.async && _this.ignoreAsyncValidations)
              return;
            if (_this.validatorOptions && _this.validatorOptions.stopAtFirstError && Object.keys(error.constraints || {}).length > 0)
              return;
            var validationArguments = {
              targetName: object.constructor ? object.constructor.name : void 0,
              property: metadata.propertyName,
              object,
              value,
              constraints: metadata.constraints
            };
            if (!metadata.each || !(Array.isArray(value) || value instanceof Set || value instanceof Map)) {
              var validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
              if (isPromise2(validatedValue)) {
                var promise = validatedValue.then(function(isValid) {
                  if (!isValid) {
                    var _a2 = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type2 = _a2[0], message2 = _a2[1];
                    error.constraints[type2] = message2;
                    if (metadata.context) {
                      if (!error.contexts) {
                        error.contexts = {};
                      }
                      error.contexts[type2] = Object.assign(error.contexts[type2] || {}, metadata.context);
                    }
                  }
                });
                _this.awaitingPromises.push(promise);
              } else {
                if (!validatedValue) {
                  var _a = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type = _a[0], message = _a[1];
                  error.constraints[type] = message;
                }
              }
              return;
            }
            var arrayValue = convertToArray(value);
            var validatedSubValues = arrayValue.map(function(subValue) {
              return customConstraintMetadata.instance.validate(subValue, validationArguments);
            });
            var validationIsAsync = validatedSubValues.some(function(validatedSubValue) {
              return isPromise2(validatedSubValue);
            });
            if (validationIsAsync) {
              var asyncValidatedSubValues = validatedSubValues.map(function(validatedSubValue) {
                return isPromise2(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue);
              });
              var asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(function(flatValidatedValues) {
                var validationResult2 = flatValidatedValues.every(function(isValid) {
                  return isValid;
                });
                if (!validationResult2) {
                  var _a2 = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type2 = _a2[0], message2 = _a2[1];
                  error.constraints[type2] = message2;
                  if (metadata.context) {
                    if (!error.contexts) {
                      error.contexts = {};
                    }
                    error.contexts[type2] = Object.assign(error.contexts[type2] || {}, metadata.context);
                  }
                }
              });
              _this.awaitingPromises.push(asyncValidationIsFinishedPromise);
              return;
            }
            var validationResult = validatedSubValues.every(function(isValid) {
              return isValid;
            });
            if (!validationResult) {
              var _b = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type = _b[0], message = _b[1];
              error.constraints[type] = message;
            }
          });
        });
      };
      ValidationExecutor2.prototype.nestedValidations = function(value, metadatas, error) {
        var _this = this;
        if (value === void 0) {
          return;
        }
        metadatas.forEach(function(metadata) {
          if (metadata.type !== ValidationTypes.NESTED_VALIDATION && metadata.type !== ValidationTypes.PROMISE_VALIDATION) {
            return;
          } else if (_this.validatorOptions && _this.validatorOptions.stopAtFirstError && Object.keys(error.constraints || {}).length > 0) {
            return;
          }
          if (Array.isArray(value) || value instanceof Set || value instanceof Map) {
            var arrayLikeValue = value instanceof Set ? Array.from(value) : value;
            arrayLikeValue.forEach(function(subValue, index) {
              _this.performValidations(value, subValue, index.toString(), [], metadatas, error.children);
            });
          } else if (value instanceof Object) {
            var targetSchema = typeof metadata.target === "string" ? metadata.target : metadata.target.name;
            _this.execute(value, targetSchema, error.children);
          } else {
            var _a = __read2(_this.createValidationError(metadata.target, value, metadata), 2), type = _a[0], message = _a[1];
            error.constraints[type] = message;
          }
        });
      };
      ValidationExecutor2.prototype.mapContexts = function(object, value, metadatas, error) {
        var _this = this;
        return metadatas.forEach(function(metadata) {
          if (metadata.context) {
            var customConstraint = void 0;
            if (metadata.type === ValidationTypes.CUSTOM_VALIDATION) {
              var customConstraints = _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
              customConstraint = customConstraints[0];
            }
            var type = _this.getConstraintType(metadata, customConstraint);
            if (error.constraints[type]) {
              if (!error.contexts) {
                error.contexts = {};
              }
              error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
            }
          }
        });
      };
      ValidationExecutor2.prototype.createValidationError = function(object, value, metadata, customValidatorMetadata) {
        var targetName = object.constructor ? object.constructor.name : void 0;
        var type = this.getConstraintType(metadata, customValidatorMetadata);
        var validationArguments = {
          targetName,
          property: metadata.propertyName,
          object,
          value,
          constraints: metadata.constraints
        };
        var message = metadata.message || "";
        if (!metadata.message && (!this.validatorOptions || this.validatorOptions && !this.validatorOptions.dismissDefaultMessages)) {
          if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
            message = customValidatorMetadata.instance.defaultMessage(validationArguments);
          }
        }
        var messageString = ValidationUtils.replaceMessageSpecialTokens(message, validationArguments);
        return [type, messageString];
      };
      ValidationExecutor2.prototype.getConstraintType = function(metadata, customValidatorMetadata) {
        var type = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
        return type;
      };
      return ValidationExecutor2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/Validator.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var Validator = (
    /** @class */
    (function() {
      function Validator2() {
      }
      Validator2.prototype.validate = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
      };
      Validator2.prototype.validateOrReject = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return __awaiter(this, void 0, void 0, function() {
          var errors;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions)];
              case 1:
                errors = _a.sent();
                if (errors.length)
                  return [2, Promise.reject(errors)];
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      Validator2.prototype.validateSync = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === "string" ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === "string" ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === "string" ? objectOrSchemaName : void 0;
        var executor = new ValidationExecutor(this, options);
        executor.ignoreAsyncValidations = true;
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return executor.stripEmptyErrors(validationErrors);
      };
      Validator2.prototype.coreValidate = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === "string" ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === "string" ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === "string" ? objectOrSchemaName : void 0;
        var executor = new ValidationExecutor(this, options);
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return Promise.all(executor.awaitingPromises).then(function() {
          return executor.stripEmptyErrors(validationErrors);
        });
      };
      return Validator2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/container.js
  var defaultContainer = new /** @class */
  ((function() {
    function class_1() {
      this.instances = [];
    }
    class_1.prototype.get = function(someClass) {
      var instance = this.instances.find(function(instance2) {
        return instance2.type === someClass;
      });
      if (!instance) {
        instance = { type: someClass, object: new someClass() };
        this.instances.push(instance);
      }
      return instance.object;
    };
    return class_1;
  })())();
  var userContainer;
  var userContainerOptions;
  function getFromContainer(someClass) {
    if (userContainer) {
      try {
        var instance = userContainer.get(someClass);
        if (instance)
          return instance;
        if (!userContainerOptions || !userContainerOptions.fallback)
          return instance;
      } catch (error) {
        if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
          throw error;
      }
    }
    return defaultContainer.get(someClass);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/index.js
  function validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === "string") {
      return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    } else {
      return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions);
    }
  }

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/validation.js
  async function validateData(data, dtoClass) {
    try {
      const dtoInstance = plainToInstance(dtoClass, data);
      const errors = await validate(dtoInstance);
      if (errors.length > 0) {
        const errorMessages = errors.flatMap(
          (error) => Object.values(error.constraints || {})
        );
        return {
          isValid: false,
          errors: errorMessages
        };
      }
      return {
        isValid: true,
        validatedData: dtoInstance
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ["Validation error: " + error.message]
      };
    }
  }

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/messaging.js
  function isZoiChatRoomMessage(m) {
    return m.Content === MOD_DATA.key;
  }
  function isClassConstructor(c) {
    return typeof c === "function" && c.prototype?.constructor == c;
  }
  var MessagesManager = class {
    sendBeep(data, targetId) {
      const beep = {
        IsSecret: true,
        BeepType: "Leash",
        MemberNumber: targetId,
        Message: JSON.stringify({
          ...data
        })
      };
      ServerSend("AccountBeep", beep);
    }
    sendPacket(msg, _data, targetNumber) {
      const data = {
        Content: MOD_DATA.key,
        Dictionary: {
          msg
        },
        Type: "Hidden"
      };
      if (_data) data.Dictionary.data = _data;
      if (targetNumber) data.Target = targetNumber;
      ServerSend("ChatRoomChat", data);
    }
    sendAction(msg, target = void 0, dictionary = []) {
      if (!msg || !ServerPlayerIsInChatRoom()) return;
      const isFemale = CharacterPronounDescription(Player) === "She/Her";
      const capPossessive = isFemale ? "Her" : "His";
      const capIntensive = isFemale ? "Her" : "Him";
      const capSelfIntensive = isFemale ? "Herself" : "Himself";
      const capPronoun = isFemale ? "She" : "He";
      msg = msg.replaceAll("<Possessive>", capPossessive).replaceAll("<possessive>", capPossessive.toLocaleLowerCase()).replaceAll("<Intensive>", capIntensive).replaceAll("<intensive>", capIntensive.toLocaleLowerCase()).replaceAll("<SelfIntensive>", capSelfIntensive).replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase()).replaceAll("<Pronoun>", capPronoun).replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());
      ServerSend("ChatRoomChat", {
        Content: "ZC_CUSTOM_ACTION",
        Type: "Action",
        Target: target ?? void 0,
        Dictionary: [
          { Tag: 'MISSING TEXT IN "Interface.csv": ZC_CUSTOM_ACTION', Text: msg },
          ...dictionary
        ]
      });
    }
    sendRequest({
      message,
      data = {},
      target,
      type = "packet"
    }) {
      const requestId = crypto.randomUUID();
      return new Promise((resolve) => {
        let deleteHook;
        if (type === "packet") {
          messagesManager.sendPacket("request", {
            requestId,
            message,
            data
          }, target);
          deleteHook = hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, (args, next) => {
            const _message = args[0];
            const sender = getPlayer(_message.Sender);
            if (!sender) return next(args);
            if (isZoiChatRoomMessage(_message) && !sender.IsPlayer()) {
              const msg = _message.Dictionary.msg;
              const data2 = _message.Dictionary.data;
              if (msg === "requestResponse" && data2.requestId === requestId) {
                deleteHook();
                resolve({
                  data: data2.data,
                  isError: false
                });
              }
            }
            return next(args);
          });
        } else {
          messagesManager.sendBeep({
            type: `${MOD_DATA.key}_request`,
            requestId,
            message,
            data
          }, target);
          deleteHook = hookFunction("ServerAccountBeep", HookPriority.ADD_BEHAVIOR, (args, next) => {
            const beep = args[0];
            if (beep.BeepType !== "Leash") return next(args);
            let data2;
            try {
              data2 = JSON.parse(beep.Message);
            } catch {
              return next(args);
            }
            if (data2.type === `${MOD_DATA.key}_requestResponse` && data2.requestId === requestId) {
              deleteHook();
              resolve({
                data: data2.data,
                isError: false
              });
            }
            return next(args);
          });
        }
        setTimeout(() => {
          deleteHook();
          resolve({
            isError: true
          });
        }, 6e3);
      });
    }
    sendLocal(message) {
      if (!ServerPlayerIsInChatRoom()) return;
      const div = document.createElement("div");
      div.setAttribute("class", "ChatMessage ChatMessageLocalMessage");
      div.setAttribute("data-time", ChatRoomCurrentTime());
      div.setAttribute("data-sender", `${Player.MemberNumber}`);
      setFontFamily(div, MOD_DATA.fontFamily);
      div.style.background = MOD_DATA.chatMessageBackground ?? "#55edc095";
      div.style.color = MOD_DATA.chatMessageColor ?? "black";
      div.style.margin = "0.15em 0";
      if (typeof message === "string") div.innerHTML = message;
      else div.appendChild(message);
      document.querySelector("#TextAreaChatLog")?.appendChild(div);
      ElementScrollToEnd("TextAreaChatLog");
    }
    sendChat(message) {
      ServerSend("ChatRoomChat", { Type: "Chat", Content: message });
    }
    onRequest(message, dtoOrListener, listener) {
      let _listener;
      let dto;
      if (isClassConstructor(dtoOrListener)) {
        dto = dtoOrListener;
        _listener = listener;
      } else {
        _listener = dtoOrListener;
      }
      const rm1 = hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, async (args, next) => {
        const _message = args[0];
        const sender = getPlayer(_message.Sender);
        if (!sender) return next(args);
        if (isZoiChatRoomMessage(_message) && !sender.IsPlayer()) {
          const msg = _message.Dictionary?.msg;
          const data = _message.Dictionary?.data;
          if (msg === "request" && data.message === message) {
            if (typeof data.requestId !== "string" || typeof data.message !== "string") return;
            const validationResult = await validateData(data.data, dto);
            if (dto && !validationResult.isValid) {
              logger.warn(`DTO Failure:`, validationResult);
              return next(args);
            }
            const _data = _listener?.(data.data, sender);
            if (_data !== void 0) {
              messagesManager.sendPacket("requestResponse", {
                requestId: data.requestId,
                message: data.message,
                data: _data
              }, sender.MemberNumber);
            }
          }
        }
        return next(args);
      });
      const rm2 = hookFunction("ServerAccountBeep", HookPriority.ADD_BEHAVIOR, async (args, next) => {
        const beep = args[0];
        if (beep.BeepType !== "Leash") return next(args);
        let data;
        try {
          data = JSON.parse(beep.Message);
        } catch {
          return next(args);
        }
        if (data.type === `${MOD_DATA.key}_request` && data.message === message) {
          if (typeof data.requestId !== "string") return;
          const validationResult = await validateData(data.data, dto);
          if (dto && !validationResult.isValid) {
            logger.warn(`DTO Failure:`, validationResult);
            return next(args);
          }
          const _data = _listener?.(data.data, beep.MemberNumber, beep.MemberName);
          if (_data !== void 0) {
            messagesManager.sendBeep({
              type: `${MOD_DATA.key}_requestResponse`,
              requestId: data.requestId,
              message: data.message,
              data: _data
            }, beep.MemberNumber);
          }
        }
        return next(args);
      });
      return () => {
        rm1();
        rm2();
      };
    }
    onPacket(message, dtoOrListener, listener) {
      return hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, async (args, next) => {
        let _listener;
        let dto;
        if (isClassConstructor(dtoOrListener)) {
          dto = dtoOrListener;
          _listener = listener;
        } else {
          _listener = dtoOrListener;
        }
        const _message = args[0];
        const sender = getPlayer(_message.Sender);
        if (!sender) return next(args);
        if (isZoiChatRoomMessage(_message) && _message.Dictionary.msg === message && !sender.IsPlayer()) {
          const validationResult = await validateData(_message.Dictionary.data, dto);
          if (dto && !validationResult.isValid) {
            logger.warn(`DTO Failure:`, validationResult);
            return next(args);
          }
          _listener?.(_message.Dictionary.data, sender);
        }
        return next(args);
      });
    }
  };
  var messagesManager = new MessagesManager();

  // src/images/pacifier.png
  var pacifier_default = "data:image/png;base64,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";

  // src/subscreens/common/itemListMenu.ts
  var ItemListMenu = class extends BaseSubscreen {
    get name() {
      return this.screenName;
    }
    screenName;
    items;
    columns;
    onExit;
    onClick;
    constructor({
      screenName,
      items,
      columns,
      onExit,
      onClick
    }) {
      super();
      this.screenName = screenName;
      this.items = items;
      this.columns = columns;
      this.onExit = onExit;
      this.onClick = onClick;
    }
    load() {
      super.load();
      const view = this.createContainer({
        scroll: "y",
        x: 200,
        y: 220,
        width: 1600,
        height: 650
      });
      view.style.display = "grid";
      view.style.gridTemplateColumns = this.columns;
      view.style.gap = "1vw";
      this.items.forEach((item) => {
        this.createButton({
          text: item.text,
          parent: view,
          padding: 2,
          onClick: () => {
            this.onClick(item.value);
          }
        });
      });
    }
    exit() {
      super.exit();
      this.onExit();
    }
  };

  // src/modules/logs.ts
  function addLog(message, push = true) {
    if (!modStorage.logs) modStorage.logs = {};
    if (!modStorage.logs.list) modStorage.logs.list = [];
    const l = modStorage.logs.list.push({
      message,
      ts: Date.now()
    });
    if (push) syncStorage();
    return modStorage.logs.list[l - 1];
  }

  // src/subscreens/introductions/aboutRulesSettingsMenu.ts
  var AboutRulesSettingsMenu = class extends BaseSubscreen {
    rule;
    ruleSettings;
    get name() {
      return "Rules > About Settings";
    }
    constructor(rule, ruleSettings) {
      super();
      this.rule = rule;
      this.ruleSettings = ruleSettings;
    }
    load() {
      super.load();
      this.createButton({
        text: this.ruleSettings.state ? "State: Enabled" : "State: Disabled",
        x: 150,
        y: 250,
        width: 600,
        padding: 2
      });
      this.createText({
        text: `- State of the rule, whether the rule can be triggered.`,
        x: 785,
        y: 250,
        padding: 2,
        width: 1e3
      });
      this.createButton({
        text: `Strict: ${this.ruleSettings.strict ? "Yes" : "No"}`,
        x: 150,
        y: 365,
        width: 600,
        padding: 2
      });
      this.createText({
        text: `- Strictness of the rule, if the rule is strict, then <b>only</b> mommy can change its settings.`,
        x: 785,
        y: 365,
        padding: 2,
        width: 1e3
      });
      this.createButton({
        text: (this.ruleSettings.conditions?.type ?? "any") === "any" ? "Trigger Conditions: Any" : "Trigger Conditions All",
        x: 150,
        y: 525,
        width: 600,
        padding: 2
      });
      this.createText({
        text: `- Trigger conditions of the rule. Conditions under which the rule is active, if the conditions are not set, then the rule is always active (if it is enabled)`,
        x: 785,
        y: 525,
        padding: 2,
        width: 1e3
      });
    }
    exit() {
      super.exit();
      this.setSubscreen(new RuleSettingsMenu(this.rule, this.ruleSettings));
    }
  };

  // src/subscreens/common/oneButtonMenu.ts
  var OneButtonMenu = class extends BaseSubscreen {
    get name() {
      return this.screenName;
    }
    screenName;
    content;
    buttonText;
    onClick;
    constructor({
      screenName,
      content,
      buttonText,
      onClick
    }) {
      super();
      this.screenName = screenName;
      this.content = content;
      this.buttonText = buttonText;
      this.onClick = onClick;
    }
    load() {
      super.load();
      this.createText({
        text: this.content,
        x: 400,
        y: 250,
        width: 1200,
        fontSize: 8
      }).style.textAlign = "center";
      this.createButton({
        text: this.buttonText,
        x: 100,
        y: 800,
        padding: 4,
        variant: "filled",
        onClick: () => {
          this.onClick();
          this.exit();
        }
      });
    }
  };

  // src/subscreens/globalMenu.ts
  var GlobalMenu = class extends BaseSubscreen {
    get name() {
      return "Global";
    }
    get icon() {
      return `Icons/General.png`;
    }
    load() {
      super.load();
      if (InformationSheetSelection === null) {
        logger.error("InformationSheetSelection is null at GlobalMenu loading");
        return;
      }
      if (InformationSheetSelection.IsPlayer()) {
        this.createText({
          text: `Mod Data Size: ${getSizeInKbytes(Player.ExtensionSettings?.LITTLISH_CLUB ?? "")}KB`,
          x: 150,
          y: 240,
          fontSize: 6
        });
        this.createText({
          text: `Littlish Club: v${version} (ZC v${version2})`,
          x: 150,
          y: 320,
          fontSize: 6
        });
        this.createButton({
          text: "Reset Settings",
          x: 100,
          y: 825,
          width: 500,
          height: 110,
          icon: "Icons/ServiceBell.png",
          isDisabled: () => isRuleActive(Player, 1009 /* DISABLE_RESET_SETTINGS_BUTTON */),
          onClick: () => {
            this.setSubscreen(
              new OneButtonMenu({
                screenName: "Global > Reset Settings",
                content: "Are you sure you want to reset all your mod data?",
                buttonText: "Reset Settings",
                onClick: resetStorage
              })
            );
          }
        });
      }
      this.createButton({
        text: "Release Baby",
        x: 1400,
        y: 825,
        width: 500,
        height: 110,
        padding: 2,
        icon: "Icons/Cancel.png",
        isDisabled: () => InformationSheetSelection === null || !hasAccessRightTo(Player, InformationSheetSelection, "RELEASE_BABY" /* RELEASE_BABY */) || !hasMommy(InformationSheetSelection),
        onClick: () => {
          this.setSubscreen(
            new OneButtonMenu({
              screenName: "Global > Release Baby",
              content: "Are you sure you want to release baby?",
              buttonText: "Release Baby",
              onClick: () => {
                if (InformationSheetSelection === null) return;
                messagesManager.sendPacket("releaseBaby", null, InformationSheetSelection.MemberNumber);
              }
            })
          );
        }
      });
    }
    exit() {
      super.exit();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/caregiversPermissionsMenu.ts
  var CaregiversPermissionsMenu = class extends BaseSubscreen {
    get name() {
      return "Family > Caregivers permissions";
    }
    load() {
      super.load();
      caregiverAccessRightsList.forEach((p, i) => {
        this.createCheckbox({
          text: p.name,
          width: 1200,
          x: 200,
          y: 250 + 90 * i,
          isChecked: InformationSheetSelection !== null && isCaregiverAccessRightEnabled(InformationSheetSelection, p.id),
          isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */),
          onChange: () => {
            if (InformationSheetSelection?.IsPlayer()) {
              turnCaregiverAccessRight(p.id);
              addLog(
                `${getNickname(Player)} (${Player.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, p.id) ? "on" : "off"} caregiver access right "${p.name}"`,
                false
              );
              syncStorage();
            } else {
              messagesManager.sendPacket("turnCaregiversAccessRight", {
                accessRightId: p.id
              }, InformationSheetSelection?.MemberNumber);
            }
          }
        });
      });
    }
  };

  // src/subscreens/familyMenu.ts
  var FamilyMenu = class extends BaseSubscreen {
    caregiversInputValue = [];
    oldCaregiversList = [];
    get name() {
      return "Family";
    }
    get icon() {
      return `Assets/Female3DCG/Emoticon/Hearts/Icon.png`;
    }
    load() {
      super.load();
      if (InformationSheetSelection === null) {
        logger.error("InformationSheetSelection is null at FamilyMenu loading");
        return;
      }
      this.oldCaregiversList = getCaregiversOf(InformationSheetSelection);
      this.caregiversInputValue = this.oldCaregiversList;
      this.createInputList({
        title: "Caregivers member numbers",
        value: getCaregiversOf(InformationSheetSelection),
        x: 1e3,
        y: 200,
        width: 850,
        height: 600,
        numbersOnly: true,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */),
        onChange: (value) => this.caregiversInputValue = value
      });
      const caregiversPermissionsBtn = this.createButton({
        text: "Caregivers permissions",
        x: 1e3,
        y: 825,
        width: 850,
        padding: 2
      });
      caregiversPermissionsBtn.addEventListener("click", () => {
        this.setSubscreen(new CaregiversPermissionsMenu());
      });
      this.createText({
        text: `Mommy: ${hasMommy(InformationSheetSelection) ? `${getMommyOf(InformationSheetSelection).name} (${getMommyOf(InformationSheetSelection).id})` : "-"}`,
        x: 150,
        y: 300
      }).style.fontWeight = "bold";
      this.createCheckbox({
        text: "Prevent baby from changing caregivers list",
        x: 150,
        y: 400,
        width: 800,
        isChecked: InformationSheetSelection.IsPlayer() ? !modStorage.caregivers?.canChangeList : !InformationSheetSelection.LITTLISH_CLUB?.caregivers?.canChangeList,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */),
        onChange: () => {
          if (InformationSheetSelection === null) return;
          if (InformationSheetSelection.IsPlayer()) {
            if (!modStorage.caregivers) modStorage.caregivers = {};
            modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
            addLog(
              `${getNickname(Player)} (${Player.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"} ${getNickname(Player)} to change caregivers list`,
              false
            );
          } else {
            messagesManager.sendPacket("turnCanChangeCaregiversList", null, InformationSheetSelection.MemberNumber);
          }
        }
      });
    }
    exit() {
      super.exit();
      const newCaregiversList = this.caregiversInputValue;
      if (this.oldCaregiversList.join(",") !== newCaregiversList.join(",") && InformationSheetSelection !== null && hasAccessRightTo(Player, InformationSheetSelection, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
        if (InformationSheetSelection.IsPlayer()) {
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.list = newCaregiversList;
          addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed caregivers list`, false);
        } else {
          messagesManager.sendPacket("changeCaregiversList", {
            list: newCaregiversList
          }, InformationSheetSelection.MemberNumber);
        }
      }
      syncStorage();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/modules/cyberDiaper.ts
  var CyberDiaperModel = /* @__PURE__ */ ((CyberDiaperModel2) => {
    CyberDiaperModel2["POOFY_DIAPER"] = "POOFY_DIAPER";
    CyberDiaperModel2["BULKY_DIAPER"] = "BULKY_DIAPER";
    CyberDiaperModel2["CRINKY_DIAPER"] = "CRINKY_DIAPER";
    return CyberDiaperModel2;
  })(CyberDiaperModel || {});
  var CyberDiaperChangePermission = /* @__PURE__ */ ((CyberDiaperChangePermission2) => {
    CyberDiaperChangePermission2["EVERYONE"] = "EVERYONE";
    CyberDiaperChangePermission2["EVERYONE_EXCEPT_WEARER"] = "EVERYONE_EXCEPT_WEARER";
    CyberDiaperChangePermission2["CAREGIVERS"] = "CAREGIVERS";
    CyberDiaperChangePermission2["MOMMY"] = "MOMMY";
    return CyberDiaperChangePermission2;
  })(CyberDiaperChangePermission || {});
  var cyberDiaperChangePermissionsHierarchy = [
    "EVERYONE" /* EVERYONE */,
    "EVERYONE_EXCEPT_WEARER" /* EVERYONE_EXCEPT_WEARER */,
    "CAREGIVERS" /* CAREGIVERS */,
    "MOMMY" /* MOMMY */
  ];
  function getNextCyberDiaperChangePermission(p) {
    if (cyberDiaperChangePermissionsHierarchy.indexOf(p) === cyberDiaperChangePermissionsHierarchy.length - 1) return cyberDiaperChangePermissionsHierarchy[0];
    return cyberDiaperChangePermissionsHierarchy[cyberDiaperChangePermissionsHierarchy.indexOf(p) + 1];
  }
  function getCyberDiaperModelName(model) {
    switch (model) {
      case "BULKY_DIAPER" /* BULKY_DIAPER */:
        return "Bulky Diaper";
      case "POOFY_DIAPER" /* POOFY_DIAPER */:
        return "Poofy Diaper";
      case "CRINKY_DIAPER" /* CRINKY_DIAPER */:
        return "Crinky Diaper";
      default:
        return "Bulky Diaper";
    }
  }
  function getCyberDiaperAssetName(model) {
    switch (model) {
      case "BULKY_DIAPER" /* BULKY_DIAPER */:
        return "BulkyDiaper";
      case "POOFY_DIAPER" /* POOFY_DIAPER */:
        return "PoofyDiaper";
      case "CRINKY_DIAPER" /* CRINKY_DIAPER */:
        return "UntrainersThin";
      default:
        return "BulkyDiaper";
    }
  }
  function putCyberDiaperOn() {
    const cyberDiaper = modStorage.cyberDiaper;
    if (cyberDiaper === void 0) return;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaper.model));
    if (!asset) {
      logger.error("Diaper asset not found");
      return;
    }
    const color = cyberDiaper.color ?? asset.DefaultColor;
    const colorString = Array.isArray(color) ? color.join(",") : color;
    InventoryWear(Player, getCyberDiaperAssetName(cyberDiaper.model), "ItemPelvis", cyberDiaper.color, 10, 0, {
      Name: cyberDiaper.name ?? "[No Name]",
      Description: cyberDiaper.description ?? "[No Description]",
      MemberName: "Littlish Club Production",
      MemberNumber: 133997,
      Property: cyberDiaper.property ?? "Comfy",
      Color: colorString,
      Lock: "",
      Effects: {},
      Item: getCyberDiaperAssetName(cyberDiaper.model),
      Private: true,
      TypeRecord: cyberDiaper.typeRecord ?? null,
      ItemProperty: cyberDiaper.drawingPriority ? {
        OverridePriority: cyberDiaper.drawingPriority
      } : null
    });
    ChatRoomCharacterItemUpdate(Player, "ItemPelvis");
  }
  function takeCyberDiaperOff() {
    InventoryRemove(Player, "ItemPelvis");
    ChatRoomCharacterItemUpdate(Player, "ItemPelvis");
  }
  function updateDiaperItem() {
    if (modStorage.cyberDiaper?.locked) putCyberDiaperOn();
    else takeCyberDiaperOff();
  }
  function checkCyberDiaper() {
    const cyberDiaperStorage = modStorage.cyberDiaper;
    const cyberDiaperItem = InventoryGet(Player, "ItemPelvis");
    if (!cyberDiaperStorage?.locked) return;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaperStorage.model));
    if (!cyberDiaperItem || cyberDiaperItem.Asset?.Name !== getCyberDiaperAssetName(cyberDiaperStorage.model) || //@ts-expect-error
    !colorsEqual(cyberDiaperStorage.color ?? asset.DefaultColor, cyberDiaperItem.Color ?? asset.DefaultColor)) putCyberDiaperOn();
  }
  function loadCyberDiaper() {
    hookFunction("ChatRoomCharacterItemUpdate", HookPriority.OBSERVE, (args, next) => {
      next(args);
      checkCyberDiaper();
    });
    hookFunction("ChatRoomSyncItem", HookPriority.OBSERVE, (args, next) => {
      next(args);
      checkCyberDiaper();
    });
    hookFunction("ChatRoomSyncSingle", HookPriority.OBSERVE, (args, next) => {
      next(args);
      checkCyberDiaper();
    });
  }

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/wardrobe.js
  var AppearanceComparer = class {
    seedsCache = /* @__PURE__ */ new Map();
    getSeed(arr) {
      const normalized = normalizeObject(ServerAppearanceBundle(arr));
      const key = JSON.stringify(normalized);
      if (!this.seedsCache.has(key)) {
        this.seedsCache.set(key, this.generateSeed(key));
      }
      return this.seedsCache.get(key);
    }
    generateSeed(str) {
      let seed = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        seed = (seed << 5) - seed + char;
        seed = seed & seed;
      }
      return seed;
    }
    compare(arr1, arr2) {
      return this.getSeed(arr1) === this.getSeed(arr2);
    }
    getDifference(arr1, arr2) {
      const diff = {
        added: [],
        modified: [],
        removed: []
      };
      if (this.compare(arr1, arr2)) return diff;
      const diffMap = ServerBuildAppearanceDiff("Female3DCG", arr1, ServerAppearanceBundle(arr2));
      for (const [group, diffResult] of Object.entries(diffMap)) {
        if (diffResult[0] === null && diffResult[1] !== null) {
          diff.added.push(diffResult[1].Asset.Description);
          continue;
        }
        if (diffResult[0] !== null && diffResult[1] === null) {
          diff.removed.push(diffResult[0].Asset.Description);
          continue;
        }
        if (diffResult[0].Asset.Name !== diffResult[1].Asset.Name) {
          diff.removed.push(diffResult[0].Asset.Description);
          diff.added.push(diffResult[1].Asset.Description);
          continue;
        }
        if (!this.compare([diffResult[0]], [diffResult[1]])) diff.modified.push(diffResult[0].Asset.Description);
      }
      return diff;
    }
  };
  var appearanceComparer = new AppearanceComparer();
  function smartGetAssetGroup(item) {
    const group = AssetGroup.includes(item) ? item : Asset.includes(item) ? item.Group : item.Asset.Group;
    if (!AssetGroup.includes(group)) {
      throw new Error("Failed to convert item to group");
    }
    return group;
  }
  function isCosplay(item) {
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && group.AllowNone && group.Clothing && group.BodyCosplay;
  }
  function isBody(item) {
    const group = smartGetAssetGroup(item);
    return group.Category === "Appearance" && !group.Clothing;
  }
  function isBind(item, excludeSlots = ["ItemNeck", "ItemNeckAccessories", "ItemNeckRestraints"]) {
    const group = smartGetAssetGroup(item);
    if (group.Category !== "Item" || group.BodyCosplay) return false;
    return !excludeSlots.includes(group.Name);
  }
  function importAppearance(C, bundleToAttach, include = ["Cosplay", "Binds", "Collar", "Locks"], characterValidate = C, ignoreAccessValidation = false) {
    bundleToAttach = bundleToAttach.filter((i) => !!i && !isBody(i));
    if (!include.includes("Cosplay")) bundleToAttach = bundleToAttach.filter((i) => !isCosplay(i));
    if (!include.includes("Binds")) bundleToAttach = bundleToAttach.filter((i) => !isBind(i));
    if (!include.includes("Collar")) bundleToAttach = bundleToAttach.filter((i) => i.Asset.Group.Name !== "ItemNeck");
    if (!include.includes("Locks")) bundleToAttach = bundleToAttach.map((i) => {
      if (i.Property?.LockedBy) delete i.Property.LockedBy;
      return i;
    });
    const blockedGroups = [];
    if (ignoreAccessValidation) {
      C.Appearance = C.Appearance.filter((a) => isBody(a));
    } else {
      const validationParams = ValidationCreateDiffParams(characterValidate, Player.MemberNumber);
      C.Appearance = C.Appearance.filter((a) => {
        if (isBody(a)) {
          blockedGroups.push(a.Asset.Group.Name);
          return true;
        }
        if (!ValidationCanRemoveItem(
          a,
          validationParams,
          !!bundleToAttach.find((b) => b?.Asset?.Group?.Name === a?.Asset?.Group?.Name)
        ) || a.Property?.LockedBy && !DialogCanUnlock(characterValidate, a) || a.Asset.Name === "SlaveCollar" && characterValidate.IsPlayer()) {
          blockedGroups.push(a.Asset.Group.Name);
          return true;
        }
        return false;
      });
    }
    for (const item of bundleToAttach) {
      if (!ignoreAccessValidation) {
        if (!validationCanAccessCheck(characterValidate, item.Asset.Group.Name, item.Asset)) continue;
        if (blockedGroups.includes(item.Asset.Group.Name)) continue;
      }
      const _item = CharacterAppearanceSetItem(C, item.Asset.Group.Name, item.Asset, item.Color);
      if (!_item) continue;
      if (item.Craft && CraftingValidate(item.Craft, item.Asset) !== CraftingStatusType.CRITICAL_ERROR) _item.Craft = item.Craft;
      if (item.Property) {
        ValidationSanitizeProperties(C, item);
        _item.Property = item.Property;
      }
    }
    CharacterRefresh(C);
    if (!C.IsNpc()) ChatRoomCharacterUpdate(C);
  }
  function validationCanAccessCheck(C, group, asset) {
    return !ValidationIsItemBlockedOrLimited(C, Player.MemberNumber, group, asset.Name) && ServerChatRoomGetAllowItem(Player, C);
  }
  function serverAppearanceBundleToAppearance(assetFamily, serverAppearanceBundle) {
    return serverAppearanceBundle.map((t) => {
      return ServerBundledItemToAppearanceItem(assetFamily, t);
    }).filter((i) => !!i);
  }

  // src/subscreens/cyberDiaperChangeColorMenu.ts
  var CyberDiaperChangeColorMenu = class extends BaseSubscreen {
    canvasCharacter = null;
    cyberDiaperSettings;
    get name() {
      return "Cyber Diaper > Settings > Change Color";
    }
    constructor(cyberDiaperSettings) {
      super();
      this.cyberDiaperSettings = cyberDiaperSettings;
    }
    run() {
      if (this.canvasCharacter) DrawCharacter(this.canvasCharacter, 1200, 250, 0.7, false);
    }
    async load() {
      super.load();
      if (InformationSheetSelection === null) {
        logger.error("InformationSheetSelection is null at CyberDiaperChangeColorMenu loading");
        return;
      }
      const asset = AssetGet(
        Player.AssetFamily,
        "ItemPelvis",
        getCyberDiaperAssetName(this.cyberDiaperSettings.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */)
      );
      if (asset === null) {
        logger.error("Can't get diaper asset at CyberDiaperChangeColorMenu loading");
        return;
      }
      if (!ItemColorLayerNames) {
        ItemColorLayerNames = new TextCache(`Assets/${Player.AssetFamily}/LayerNames.csv`);
        const loadingText = this.createText({
          text: "Loading LayerNames.csv...",
          x: 400,
          y: 400,
          width: 1200,
          fontSize: 6
        });
        loadingText.style.textAlign = "center";
        await waitFor(() => ItemColorLayerNames.loaded);
        loadingText.remove();
      }
      if (!this.cyberDiaperSettings.color) this.cyberDiaperSettings.color = JSON.parse(JSON.stringify(asset.DefaultColor));
      this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter2");
      this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
        this.canvasCharacter.AssetFamily,
        ServerAppearanceBundle(InformationSheetSelection.Appearance)
      );
      InventoryWear(this.canvasCharacter, asset.Name, asset.Group.Name, this.cyberDiaperSettings.color);
      CharacterRefresh(this.canvasCharacter);
      const defaultColor = JSON.parse(JSON.stringify(asset.DefaultColor));
      let layerN = 0;
      asset.Layer.forEach((l) => {
        if (!l.AllowColorize || !ItemColorLayerNames.cache[`${asset.Group.Name}${asset.Name}${l.Name}`]) return;
        const n = layerN;
        const layerName = this.createButton({
          text: ItemColorLayerNames.cache[`${asset.Group.Name}${asset.Name}${l.Name}`],
          x: 100,
          y: 220 + 100 * layerN,
          width: 500,
          height: 80,
          isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
          onClick: () => {
            if (this.canvasCharacter) {
              const item = InventoryGet(this.canvasCharacter, asset.Group.Name);
              if (item) {
                item.Color ??= defaultColor;
                item.Color[n] = defaultColor[n];
                CharacterRefresh(this.canvasCharacter);
              }
            }
            this.cyberDiaperSettings.color ??= [];
            this.cyberDiaperSettings.color[n] = defaultColor[n];
            layerColor.value = asset.DefaultColor[n];
          }
        });
        const layerColor = this.createInput({
          value: this.cyberDiaperSettings.color?.[layerN],
          x: 640,
          y: 220 + 100 * layerN,
          width: 200,
          height: 80,
          padding: 1,
          isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
          onInput: () => {
            if (this.canvasCharacter) {
              const item = InventoryGet(this.canvasCharacter, asset.Group.Name);
              if (item) {
                item.Color ??= defaultColor;
                item.Color[n] = layerColor.value;
                CharacterRefresh(this.canvasCharacter);
              }
            }
            this.cyberDiaperSettings.color ??= [];
            this.cyberDiaperSettings.color[n] = layerColor.value;
          }
        });
        layerColor.setAttribute("type", "color");
        layerN++;
      });
    }
    exit() {
      super.exit();
      this.setSubscreen(new CyberDiaperSettingsMenu(this.cyberDiaperSettings));
    }
  };

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObject.js
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isFunction.js
  var asyncTag = "[object AsyncFunction]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject_default(value)) {
      return false;
    }
    var tag = baseGetTag_default(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var isFunction_default = isFunction;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isMasked.js
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_toSource.js
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var toSource_default = toSource;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsNative.js
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype;
  var objectProto3 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto3.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject_default(value) || isMasked_default(value)) {
      return false;
    }
    var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value));
  }
  var baseIsNative_default = baseIsNative;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_WeakMap.js
  var WeakMap = getNative_default(root_default, "WeakMap");
  var WeakMap_default = WeakMap;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseCreate.js
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ (function() {
    function object() {
    }
    return function(proto) {
      if (!isObject_default(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  var baseCreate_default = baseCreate;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copyArray.js
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default = copyArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_defineProperty.js
  var defineProperty = (function() {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  var defineProperty_default = defineProperty;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayEach.js
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  var arrayEach_default = arrayEach;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var isIndex_default = isIndex;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssignValue.js
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty_default) {
      defineProperty_default(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  var baseAssignValue_default = baseAssignValue;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/eq.js
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_default = eq;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copyObject.js
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue_default(object, key, newValue);
      } else {
        assignValue_default(object, key, newValue);
      }
    }
    return object;
  }
  var copyObject_default = copyObject;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isLength.js
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  var isLength_default = isLength;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isPrototype.js
  var objectProto5 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsArguments.js
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArguments.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments_default : function(value) {
    return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments_default = isArguments;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isBuffer.js
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsTypedArray.js
  var argsTag2 = "[object Arguments]";
  var arrayTag = "[object Array]";
  var boolTag = "[object Boolean]";
  var dateTag = "[object Date]";
  var errorTag = "[object Error]";
  var funcTag2 = "[object Function]";
  var mapTag = "[object Map]";
  var numberTag = "[object Number]";
  var objectTag = "[object Object]";
  var regexpTag = "[object RegExp]";
  var setTag = "[object Set]";
  var stringTag = "[object String]";
  var weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]";
  var dataViewTag = "[object DataView]";
  var float32Tag = "[object Float32Array]";
  var float64Tag = "[object Float64Array]";
  var int8Tag = "[object Int8Array]";
  var int16Tag = "[object Int16Array]";
  var int32Tag = "[object Int32Array]";
  var uint8Tag = "[object Uint8Array]";
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  var uint16Tag = "[object Uint16Array]";
  var uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
  }
  var baseIsTypedArray_default = baseIsTypedArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nodeUtil.js
  var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess = moduleExports2 && freeGlobal_default.process;
  var nodeUtil = (function() {
    try {
      var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  })();
  var nodeUtil_default = nodeUtil;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayLikeKeys.js
  var objectProto7 = Object.prototype;
  var hasOwnProperty5 = objectProto7.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex_default(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var arrayLikeKeys_default = arrayLikeKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeKeys.js
  var nativeKeys = overArg_default(Object.keys, Object);
  var nativeKeys_default = nativeKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseKeys.js
  var objectProto8 = Object.prototype;
  var hasOwnProperty6 = objectProto8.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype_default(object)) {
      return nativeKeys_default(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty6.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeys_default = baseKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/keys.js
  function keys(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default = keys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeKeysIn.js
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var nativeKeysIn_default = nativeKeysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseKeysIn.js
  var objectProto9 = Object.prototype;
  var hasOwnProperty7 = objectProto9.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject_default(object)) {
      return nativeKeysIn_default(object);
    }
    var isProto = isPrototype_default(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeysIn_default = baseKeysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
  }
  var keysIn_default = keysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeCreate.js
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashGet.js
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto10 = Object.prototype;
  var hasOwnProperty8 = objectProto10.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate_default) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty8.call(data, key) ? data[key] : void 0;
  }
  var hashGet_default = hashGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashHas.js
  var objectProto11 = Object.prototype;
  var hasOwnProperty9 = objectProto11.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashSet.js
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Hash.js
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear_default;
  Hash.prototype["delete"] = hashDelete_default;
  Hash.prototype.get = hashGet_default;
  Hash.prototype.has = hashHas_default;
  Hash.prototype.set = hashSet_default;
  var Hash_default = Hash;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assocIndexOf.js
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_default(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var assocIndexOf_default = assocIndexOf;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheDelete.js
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  var listCacheDelete_default = listCacheDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheSet.js
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  var listCacheSet_default = listCacheSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_ListCache.js
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear_default;
  ListCache.prototype["delete"] = listCacheDelete_default;
  ListCache.prototype.get = listCacheGet_default;
  ListCache.prototype.has = listCacheHas_default;
  ListCache.prototype.set = listCacheSet_default;
  var ListCache_default = ListCache;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isKeyable.js
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_MapCache.js
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear_default;
  MapCache.prototype["delete"] = mapCacheDelete_default;
  MapCache.prototype.get = mapCacheGet_default;
  MapCache.prototype.has = mapCacheHas_default;
  MapCache.prototype.set = mapCacheSet_default;
  var MapCache_default = MapCache;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayPush.js
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var arrayPush_default = arrayPush;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getPrototype.js
  var getPrototype = overArg_default(Object.getPrototypeOf, Object);
  var getPrototype_default = getPrototype;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackClear.js
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default = stackClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackDelete.js
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default = stackDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackGet.js
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default = stackGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackHas.js
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default = stackHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackSet.js
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache_default) {
      var pairs = data.__data__;
      if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache_default(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var stackSet_default = stackSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Stack.js
  function Stack(entries) {
    var data = this.__data__ = new ListCache_default(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear_default;
  Stack.prototype["delete"] = stackDelete_default;
  Stack.prototype.get = stackGet_default;
  Stack.prototype.has = stackHas_default;
  Stack.prototype.set = stackSet_default;
  var Stack_default = Stack;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssign.js
  function baseAssign(object, source) {
    return object && copyObject_default(source, keys_default(source), object);
  }
  var baseAssign_default = baseAssign;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssignIn.js
  function baseAssignIn(object, source) {
    return object && copyObject_default(source, keysIn_default(source), object);
  }
  var baseAssignIn_default = baseAssignIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneBuffer.js
  var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
  var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
  var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  var cloneBuffer_default = cloneBuffer;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayFilter.js
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  var arrayFilter_default = arrayFilter;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/stubArray.js
  function stubArray() {
    return [];
  }
  var stubArray_default = stubArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getSymbols.js
  var objectProto12 = Object.prototype;
  var propertyIsEnumerable2 = objectProto12.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable2.call(object, symbol);
    });
  };
  var getSymbols_default = getSymbols;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copySymbols.js
  function copySymbols(source, object) {
    return copyObject_default(source, getSymbols_default(source), object);
  }
  var copySymbols_default = copySymbols;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getSymbolsIn.js
  var nativeGetSymbols2 = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
    var result = [];
    while (object) {
      arrayPush_default(result, getSymbols_default(object));
      object = getPrototype_default(object);
    }
    return result;
  };
  var getSymbolsIn_default = getSymbolsIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copySymbolsIn.js
  function copySymbolsIn(source, object) {
    return copyObject_default(source, getSymbolsIn_default(source), object);
  }
  var copySymbolsIn_default = copySymbolsIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetAllKeys.js
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
  }
  var baseGetAllKeys_default = baseGetAllKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getAllKeys.js
  function getAllKeys(object) {
    return baseGetAllKeys_default(object, keys_default, getSymbols_default);
  }
  var getAllKeys_default = getAllKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getAllKeysIn.js
  function getAllKeysIn(object) {
    return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
  }
  var getAllKeysIn_default = getAllKeysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_DataView.js
  var DataView = getNative_default(root_default, "DataView");
  var DataView_default = DataView;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Promise.js
  var Promise2 = getNative_default(root_default, "Promise");
  var Promise_default = Promise2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Set.js
  var Set2 = getNative_default(root_default, "Set");
  var Set_default = Set2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getTag.js
  var mapTag2 = "[object Map]";
  var objectTag2 = "[object Object]";
  var promiseTag = "[object Promise]";
  var setTag2 = "[object Set]";
  var weakMapTag2 = "[object WeakMap]";
  var dataViewTag2 = "[object DataView]";
  var dataViewCtorString = toSource_default(DataView_default);
  var mapCtorString = toSource_default(Map_default);
  var promiseCtorString = toSource_default(Promise_default);
  var setCtorString = toSource_default(Set_default);
  var weakMapCtorString = toSource_default(WeakMap_default);
  var getTag = baseGetTag_default;
  if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
    getTag = function(value) {
      var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag2;
          case mapCtorString:
            return mapTag2;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag2;
          case weakMapCtorString:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  var getTag_default = getTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneArray.js
  var objectProto13 = Object.prototype;
  var hasOwnProperty10 = objectProto13.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty10.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  var initCloneArray_default = initCloneArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Uint8Array.js
  var Uint8Array2 = root_default.Uint8Array;
  var Uint8Array_default = Uint8Array2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default = cloneArrayBuffer;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneDataView.js
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var cloneDataView_default = cloneDataView;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneRegExp.js
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var cloneRegExp_default = cloneRegExp;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneSymbol.js
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  var cloneSymbol_default = cloneSymbol;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneTypedArray.js
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var cloneTypedArray_default = cloneTypedArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneByTag.js
  var boolTag2 = "[object Boolean]";
  var dateTag2 = "[object Date]";
  var mapTag3 = "[object Map]";
  var numberTag2 = "[object Number]";
  var regexpTag2 = "[object RegExp]";
  var setTag3 = "[object Set]";
  var stringTag2 = "[object String]";
  var symbolTag = "[object Symbol]";
  var arrayBufferTag2 = "[object ArrayBuffer]";
  var dataViewTag3 = "[object DataView]";
  var float32Tag2 = "[object Float32Array]";
  var float64Tag2 = "[object Float64Array]";
  var int8Tag2 = "[object Int8Array]";
  var int16Tag2 = "[object Int16Array]";
  var int32Tag2 = "[object Int32Array]";
  var uint8Tag2 = "[object Uint8Array]";
  var uint8ClampedTag2 = "[object Uint8ClampedArray]";
  var uint16Tag2 = "[object Uint16Array]";
  var uint32Tag2 = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag2:
        return cloneArrayBuffer_default(object);
      case boolTag2:
      case dateTag2:
        return new Ctor(+object);
      case dataViewTag3:
        return cloneDataView_default(object, isDeep);
      case float32Tag2:
      case float64Tag2:
      case int8Tag2:
      case int16Tag2:
      case int32Tag2:
      case uint8Tag2:
      case uint8ClampedTag2:
      case uint16Tag2:
      case uint32Tag2:
        return cloneTypedArray_default(object, isDeep);
      case mapTag3:
        return new Ctor();
      case numberTag2:
      case stringTag2:
        return new Ctor(object);
      case regexpTag2:
        return cloneRegExp_default(object);
      case setTag3:
        return new Ctor();
      case symbolTag:
        return cloneSymbol_default(object);
    }
  }
  var initCloneByTag_default = initCloneByTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneObject.js
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
  }
  var initCloneObject_default = initCloneObject;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsMap.js
  var mapTag4 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike_default(value) && getTag_default(value) == mapTag4;
  }
  var baseIsMap_default = baseIsMap;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isMap.js
  var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
  var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
  var isMap_default = isMap;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsSet.js
  var setTag4 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike_default(value) && getTag_default(value) == setTag4;
  }
  var baseIsSet_default = baseIsSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isSet.js
  var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
  var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
  var isSet_default = isSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseClone.js
  var CLONE_DEEP_FLAG = 1;
  var CLONE_FLAT_FLAG = 2;
  var CLONE_SYMBOLS_FLAG = 4;
  var argsTag3 = "[object Arguments]";
  var arrayTag2 = "[object Array]";
  var boolTag3 = "[object Boolean]";
  var dateTag3 = "[object Date]";
  var errorTag2 = "[object Error]";
  var funcTag3 = "[object Function]";
  var genTag2 = "[object GeneratorFunction]";
  var mapTag5 = "[object Map]";
  var numberTag3 = "[object Number]";
  var objectTag3 = "[object Object]";
  var regexpTag3 = "[object RegExp]";
  var setTag5 = "[object Set]";
  var stringTag3 = "[object String]";
  var symbolTag2 = "[object Symbol]";
  var weakMapTag3 = "[object WeakMap]";
  var arrayBufferTag3 = "[object ArrayBuffer]";
  var dataViewTag4 = "[object DataView]";
  var float32Tag3 = "[object Float32Array]";
  var float64Tag3 = "[object Float64Array]";
  var int8Tag3 = "[object Int8Array]";
  var int16Tag3 = "[object Int16Array]";
  var int32Tag3 = "[object Int32Array]";
  var uint8Tag3 = "[object Uint8Array]";
  var uint8ClampedTag3 = "[object Uint8ClampedArray]";
  var uint16Tag3 = "[object Uint16Array]";
  var uint32Tag3 = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag3] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
  cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject_default(value)) {
      return value;
    }
    var isArr = isArray_default(value);
    if (isArr) {
      result = initCloneArray_default(value);
      if (!isDeep) {
        return copyArray_default(value, result);
      }
    } else {
      var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
      if (isBuffer_default(value)) {
        return cloneBuffer_default(value, isDeep);
      }
      if (tag == objectTag3 || tag == argsTag3 || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject_default(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag_default(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack_default());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet_default(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_default(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach_default(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var baseClone_default = baseClone;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/cloneDeep.js
  var CLONE_DEEP_FLAG2 = 1;
  var CLONE_SYMBOLS_FLAG2 = 4;
  function cloneDeep(value) {
    return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
  }
  var cloneDeep_default = cloneDeep;

  // src/subscreens/cyberDiaperSettingsMenu.ts
  var CyberDiaperSettingsMenu = class extends BaseSubscreen {
    constructor(cyberDiaperSettings) {
      super();
      this.cyberDiaperSettings = cyberDiaperSettings;
    }
    cyberDiaperSettings;
    get name() {
      return "Cyber Diaper > Settings";
    }
    load() {
      super.load();
      if (InformationSheetSelection === null) {
        logger.error("InformationSheetSelection is null at CyberDiaperSettingsMenu loading");
        return;
      }
      if (!this.cyberDiaperSettings) {
        this.cyberDiaperSettings = cloneDeep_default(
          (InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB)?.cyberDiaper
        );
        if (!this.cyberDiaperSettings) return;
      }
      const nameInput = this.createInput({
        placeholder: "Name",
        value: this.cyberDiaperSettings?.name ?? "",
        x: 130,
        y: 200,
        width: 800,
        padding: 2,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onChange: () => {
          if (!this.cyberDiaperSettings) return;
          this.cyberDiaperSettings.name = nameInput.value;
        }
      });
      const descriptionInput = this.createInput({
        placeholder: "Description",
        value: CraftingDescription.Decode(this.cyberDiaperSettings.description) ?? "",
        x: 130,
        y: 310,
        width: 800,
        height: 250,
        padding: 2,
        textArea: true,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onChange: () => {
          if (!this.cyberDiaperSettings) return;
          this.cyberDiaperSettings.description = descriptionInput.value;
        }
      });
      this.createButton({
        text: `Change Color`,
        x: 130,
        y: 620,
        width: 800,
        height: 140,
        onClick: () => {
          if (!this.cyberDiaperSettings) return;
          this.setSubscreen(
            new CyberDiaperChangeColorMenu(this.cyberDiaperSettings)
          );
        }
      });
      const putOnOffBtn = this.createButton({
        text: `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`,
        x: 130,
        y: 780,
        width: 800,
        height: 140,
        variant: "filled",
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onClick: () => {
          if (!this.cyberDiaperSettings) return;
          this.cyberDiaperSettings.locked = !this.cyberDiaperSettings.locked;
          putOnOffBtn.textContent = `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`;
        }
      });
      this.createText({
        text: "Model",
        x: 1e3,
        y: 200,
        width: 900,
        fontSize: 5
      }).style.textAlign = "center";
      const modelBtn = this.createBackNextButton({
        currentIndex: Object.values(CyberDiaperModel).indexOf(this.cyberDiaperSettings.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */),
        x: 1e3,
        y: 260,
        width: 900,
        height: 80,
        items: Object.values(CyberDiaperModel).map((i) => [getCyberDiaperModelName(i), i]),
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onChange: (model) => {
          if (!this.cyberDiaperSettings) return;
          this.cyberDiaperSettings.model = model;
          delete this.cyberDiaperSettings.color;
        }
      });
      const permissionsTexts = {
        ["EVERYONE" /* EVERYONE */]: "Everyone",
        ["EVERYONE_EXCEPT_WEARER" /* EVERYONE_EXCEPT_WEARER */]: "Everyone except wearer",
        ["CAREGIVERS" /* CAREGIVERS */]: "Caregivers",
        ["MOMMY" /* MOMMY */]: "Mommy"
      };
      const changePermissionBtn = this.createButton({
        text: `Change permission: ${permissionsTexts[this.cyberDiaperSettings.changePermission ?? "EVERYONE" /* EVERYONE */]}`,
        x: 1e3,
        y: 365,
        width: 900,
        height: 100,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onClick: () => {
          if (!this.cyberDiaperSettings) return;
          this.cyberDiaperSettings.changePermission = getNextCyberDiaperChangePermission(
            this.cyberDiaperSettings.changePermission ?? "EVERYONE" /* EVERYONE */
          );
          changePermissionBtn.textContent = `Change permission: ${permissionsTexts[this.cyberDiaperSettings.changePermission]}`;
        }
      });
      this.createText({
        text: "For Extended Settings",
        x: 1e3,
        y: 495,
        width: 900,
        fontSize: 5
      });
      const craftImport = this.createInput({
        placeholder: "Crafting code (Get it in crafting menu)",
        x: 1e3,
        y: 560,
        width: 900,
        padding: 2,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)
      });
      this.createButton({
        x: 1e3,
        y: 670,
        width: 900,
        padding: 2,
        text: "Import Settings From Craft",
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onClick: () => {
          if (!this.cyberDiaperSettings) return;
          const data = JSON.parse(LZString.decompressFromBase64(craftImport.value) ?? "{}");
          if (typeof data?.Name === "string") {
            this.cyberDiaperSettings.name = data.Name;
            nameInput.value = data.Name;
          }
          if (typeof data?.Description === "string") {
            const decodedDescription = CraftingDescription.Decode(data.Description);
            this.cyberDiaperSettings.description = data.Description;
            descriptionInput.value = decodedDescription;
          }
          if (typeof data?.Item === "string") {
            this.cyberDiaperSettings.model = data.Item === "BulkyDiaper" ? "BULKY_DIAPER" /* BULKY_DIAPER */ : "POOFY_DIAPER" /* POOFY_DIAPER */;
            modelBtn.textContent = `Model: ${getCyberDiaperModelName(this.cyberDiaperSettings.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */)}`;
          }
          if (typeof data?.Color === "string") {
            this.cyberDiaperSettings.color = data.Color === "Default" ? [...AssetGet(Player.AssetFamily, "ItemPelvis", data.Item).DefaultColor] : data.Color.split(",");
          }
          if (data?.TypeRecord) {
            this.cyberDiaperSettings.typeRecord = data.TypeRecord;
          }
          if (typeof data?.Property === "string") {
            this.cyberDiaperSettings.property = data.Property;
          }
          if (typeof data?.ItemProperty?.OverridePriority === "number" || Array.isArray(data?.ItemProperty?.OverridePriority)) {
            this.cyberDiaperSettings.drawingPriority = data.ItemProperty.OverridePriority;
          }
        }
      });
      const saveChangesBtn = this.createButton({
        text: "Save Changes",
        x: 1520,
        y: 790,
        width: 360,
        height: 140,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onClick: () => {
          if (InformationSheetSelection === null) return;
          if (InformationSheetSelection.IsPlayer()) {
            modStorage.cyberDiaper = this.cyberDiaperSettings;
            updateDiaperItem();
            addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed settings of cyber diaper`, false);
            syncStorage();
          } else {
            messagesManager.sendPacket(
              "changeCyberDiaperSettings",
              this.cyberDiaperSettings,
              InformationSheetSelection.MemberNumber
            );
          }
          this.exit();
        }
      });
      saveChangesBtn.style.fontWeight = "bold";
    }
    exit() {
      super.exit();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/cyberDiaperMenu.ts
  var CyberDiaperMenu = class extends BaseSubscreen {
    get name() {
      return "Cyber Diaper";
    }
    get icon() {
      return `Icons/Diaper.png`;
    }
    load() {
      super.load();
      this.createText({
        text: `I believe that babies should wear a reliable diaper 24/7 and that it should be convenient to change it. I present to you my latest development - CYBER DIAPER.`,
        x: 400,
        y: 200,
        width: 1200,
        fontSize: 6
      }).style.textAlign = "center";
      this.createText({
        text: `Cyber diaper is a high-tech diaper equipped with a large capacity and a system that allows you to lock it and change it without removing it.`,
        x: 400,
        y: 500,
        width: 1200,
        fontSize: 6
      }).style.textAlign = "center";
      this.createButton({
        text: "Buy Cyber Diaper for 499$",
        x: 500,
        y: 800,
        width: 1e3,
        padding: 2,
        fontSize: 8,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */),
        onClick: () => {
          if (Player.Money < 499) return toastsManager.error({ message: "Not enough money.", duration: 3e3 });
          CharacterChangeMoney(Player, -499);
          toastsManager.success({ message: "Successfully bought Cyber Diaper.", duration: 4e3 });
          modStorage.cyberDiaper = {
            name: "Default diaper name",
            description: "Default diaper description",
            model: "BULKY_DIAPER" /* BULKY_DIAPER */
          };
          syncStorage();
          this.setSubscreen(new CyberDiaperSettingsMenu());
        }
      });
    }
  };

  // src/subscreens/noteSettingsMenu.ts
  var NoteSettingsMenu = class extends BaseSubscreen {
    note;
    key;
    get name() {
      return `Notes > #${this.key}`;
    }
    constructor(note, key) {
      super();
      this.note = note;
      this.key = key;
    }
    load() {
      super.load();
      const text = this.createText({
        text: this.note.text,
        x: 200,
        y: 260,
        width: 1600
      });
      text.style.textAlign = "center";
      text.style.wordBreak = "break-all";
      const date = this.createText({
        text: new Date(this.note.ts).toUTCString(),
        x: 90,
        y: 835,
        width: 360,
        withBackground: true
      });
      date.style.textAlign = "center";
      this.createButton({
        text: "Delete",
        x: 1550,
        y: 850,
        width: 360,
        padding: 2,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "DELETE_NOTES" /* DELETE_NOTES */) && this.note.author.id !== Player.MemberNumber,
        onClick: () => {
          if (InformationSheetSelection === null) return;
          if (InformationSheetSelection.IsPlayer()) {
            const [note] = modStorage.notes.list.splice(this.key - 1, 1);
            addLog(`${getNickname(Player)} (${Player.MemberNumber}) deleted note: "${note.text}"`, false);
            this.exit();
          } else {
            messagesManager.sendPacket("deleteNote", {
              key: this.key
            }, InformationSheetSelection.MemberNumber);
            this.setPreviousSubscreen();
          }
        }
      });
    }
    exit() {
      super.exit();
      syncStorage();
    }
  };

  // src/subscreens/notesMenu.ts
  function addNote(note, subscreen, scrollView, key, pending = false) {
    const btn = subscreen.createButton({
      text: `${note.author.name} (${note.author.id}) added note "${note.text}" at ${new Date(note.ts).toUTCString()}`,
      parent: scrollView,
      padding: 2,
      isDisabled: () => pending,
      onClick: () => {
        setSubscreen(new NoteSettingsMenu(note, key));
      }
    });
    btn.style.wordBreak = "break-all";
    btn.style.width = "98%";
    scrollView.append(btn);
    scrollView.scrollTo(0, scrollView.scrollHeight);
  }
  var NotesMenu = class extends BaseSubscreen {
    scrollView;
    get name() {
      return "Notes";
    }
    get icon() {
      return `Icons/WinkNone.png`;
    }
    load() {
      super.load();
      const selection = InformationSheetSelection;
      if (selection === null) return;
      const notesList = selection.IsPlayer() ? modStorage.notes?.list ?? [] : selection.LITTLISH_CLUB?.notes?.list ?? [];
      const scrollView = this.createContainer({
        scroll: "y",
        x: 150,
        y: 260,
        width: 1700,
        height: 560
      });
      scrollView.style.display = "flex";
      scrollView.style.flexDirection = "column";
      scrollView.style.alignItems = "center";
      scrollView.style.rowGap = "1vw";
      this.scrollView = scrollView;
      notesList.forEach((note, i) => {
        addNote(note, this, scrollView, i + 1);
      });
      const noteInput = this.createInput({
        placeholder: "Type note here",
        x: 150,
        y: 840,
        width: 1400,
        padding: 2
      });
      this.createButton({
        text: "Add note",
        x: 1575,
        y: 840,
        width: 275,
        padding: 2,
        onClick: () => {
          if (noteInput.value.trim() === "") return;
          if (new TextEncoder().encode(noteInput.value).byteLength / 1024 > MAX_NOTE_SIZE_IN_KBYTES) {
            return toastsManager.error({
              message: `That note takes up more size than the set limit. You are evil.`,
              duration: 4500
            });
          }
          ;
          const note = {
            text: noteInput.value,
            author: {
              name: CharacterNickname(Player),
              id: Player.MemberNumber
            },
            ts: Date.now()
          };
          if (selection.IsPlayer()) {
            if (!modStorage.notes) modStorage.notes = {};
            if (!modStorage.notes.list) modStorage.notes.list = [];
            modStorage.notes.list.push(note);
            addLog(`${getNickname(Player)} (${Player.MemberNumber}) added note: "${note.text}" at ${new Date(note.ts).toUTCString()}`, false);
          } else {
            messagesManager.sendPacket("addNote", {
              text: noteInput.value
            }, selection.MemberNumber);
          }
          addNote(note, this, scrollView, scrollView.children.length + 1, !selection.IsPlayer());
          noteInput.value = "";
        }
      });
    }
    update() {
      const selection = InformationSheetSelection;
      if (selection === null) return;
      this.scrollView.innerHTML = "";
      const notesList = selection.IsPlayer() ? modStorage.notes?.list ?? [] : selection.LITTLISH_CLUB?.notes?.list ?? [];
      notesList.forEach((note, i) => {
        addNote(note, this, this.scrollView, i + 1);
      });
    }
    exit() {
      super.exit();
      syncStorage();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/addBabyMenu.ts
  var AddBabyMenu = class extends BaseSubscreen {
    get name() {
      return "Add baby";
    }
    load() {
      super.load();
      const container = this.createContainer({
        scroll: "y",
        x: 150,
        y: 200,
        width: 1700,
        height: 700
      });
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
      container.style.rowGap = "1vw";
      ChatRoomCharacter?.forEach((C) => {
        const btn = this.createButton({
          text: isRequestedByPlayer(C) ? `${CharacterNickname(C)} (${C.MemberNumber}) [ Pending... ]` : `${CharacterNickname(C)} (${C.MemberNumber})`,
          parent: container,
          padding: 2,
          isDisabled: () => !C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C) || isRequestedByPlayer(C),
          onClick: () => {
            messagesManager.sendPacket("addBaby", null, C.MemberNumber);
            this.exit();
          }
        });
        btn.style.wordBreak = "break-all";
        btn.style.width = "98%";
      });
    }
  };

  // src/subscreens/introductions/aboutWardrobeMenu.ts
  var AboutWardrobeMenu = class extends BaseSubscreen {
    currentAppearance;
    get name() {
      return "Littlish Wardrobe > About";
    }
    constructor(currentAppearance) {
      super();
      this.currentAppearance = currentAppearance;
    }
    load() {
      super.load();
      this.createText({
        text: `<b>Littlish Wardrobe</b> is library of cute ABDL-themed outfits. Want to see your outfit there? Join our discord and send the base64 code of the outfit in <a href="${DISCORD_SERVER_LW_OUTFITS_CHANNEL_LINK}" target="_blank">this channel</a> and don't forget to specify your name.`,
        width: 1e3,
        x: 500,
        y: 220,
        fontSize: 6
      }).style.textAlign = "center";
      this.createText({
        text: "Outfit can <b>always</b> be renamed, changed and deleted at the request of the author.",
        width: 1e3,
        x: 500,
        y: 650,
        fontSize: 6,
        padding: 2,
        withBackground: true
      }).style.textAlign = "center";
    }
    exit() {
      super.exit();
      this.setSubscreen(new WardrobeMenu(this.currentAppearance));
    }
  };

  // src/subscreens/wardrobeMenu.ts
  var WardrobeMenu = class extends BaseSubscreen {
    canvasCharacter;
    currentAppearance = CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)];
    includeTypes = ["Binds", "Cosplay", "Collar", "Locks"];
    requiredModsElement;
    creatorNameElement;
    isViewingMode = false;
    get name() {
      return "Littlish Wardrobe";
    }
    constructor(currentAppearance) {
      super();
      if (currentAppearance) this.currentAppearance = currentAppearance;
    }
    run() {
      DrawCharacter(this.canvasCharacter, 1e3, 100, 0.8, false);
    }
    load() {
      super.load();
      this.createButton({
        icon: "Icons/Notifications.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 175,
        onClick: () => {
          this.setSubscreen(new AboutWardrobeMenu(this.currentAppearance));
        }
      });
      this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
      this.creatorNameElement = this.createText({
        text: `<b>Creator:</b> ${this.currentAppearance.creator}`,
        x: 1400,
        y: 225,
        width: 425
      });
      this.creatorNameElement.style.textAlign = "center";
      this.includeTypes.forEach((d, i) => {
        this.createCheckbox({
          text: d,
          x: 1500,
          y: 360 + 80 * i,
          isChecked: true,
          onChange: () => {
            if (this.includeTypes.includes(d)) this.includeTypes.splice(this.includeTypes.indexOf(d), 1);
            else this.includeTypes.push(d);
            this.refresh();
          }
        });
      });
      this.createCheckbox({
        text: "Viewing Mode",
        x: 1500,
        y: 720,
        isChecked: false,
        onChange: () => {
          this.isViewingMode = !this.isViewingMode;
          if (InformationSheetSelection !== null && hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_APPEARANCE" /* MANAGE_APPEARANCE */)) applyBtn.classList.toggle("zcDisabled");
          this.refresh();
        }
      });
      const scrollView = this.createContainer({
        scroll: "y",
        x: 160,
        y: 260,
        width: 750,
        height: 500
      });
      scrollView.style.display = "flex";
      scrollView.style.flexDirection = "column";
      scrollView.style.alignItems = "center";
      scrollView.style.rowGap = "1vw";
      CANVAS_BABIES_APPEARANCES.forEach((a) => {
        const btn = this.createButton({
          text: a.name,
          padding: 2.5,
          icon: "Icons/Rectangle/Dress.png",
          parent: scrollView,
          onClick: () => {
            this.currentAppearance = a;
            this.refresh();
          }
        });
        btn.style.width = "95%";
        btn.style.position = "relative";
      });
      const applyBtn = this.createButton({
        text: "Apply",
        x: 160,
        y: 800,
        width: 750,
        padding: 3,
        variant: "filled",
        isDisabled: () => InformationSheetSelection == null || !hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_APPEARANCE" /* MANAGE_APPEARANCE */) || this.isViewingMode,
        onClick: () => {
          if (InformationSheetSelection === null) return;
          importAppearance(InformationSheetSelection, this.canvasCharacter.Appearance, this.includeTypes);
          this.exit();
        }
      });
      this.refresh();
    }
    loadRequiredModsWarning() {
      if (Array.isArray(this.currentAppearance.requiredMods) && this.currentAppearance.requiredMods.length > 0) {
        this.requiredModsElement = this.createText({
          text: `Required mods: ${this.currentAppearance.requiredMods.map((d) => `<b>${d}</b>`).join(", ")}`,
          x: 1400,
          y: 810,
          width: 525,
          padding: 2,
          withBackground: true
        });
      }
    }
    refresh() {
      if (InformationSheetSelection === null) return;
      const appearanceBundle = serverAppearanceBundleToAppearance(
        InformationSheetSelection.AssetFamily,
        JSON.parse(
          LZString.decompressFromBase64(this.currentAppearance.bundle) ?? "[]"
        )
      );
      ServerAppearanceLoadFromBundle(
        this.canvasCharacter,
        this.canvasCharacter.AssetFamily,
        ServerAppearanceBundle(InformationSheetSelection.Appearance)
      );
      importAppearance(this.canvasCharacter, appearanceBundle, this.includeTypes, InformationSheetSelection, this.isViewingMode);
      this.creatorNameElement.innerHTML = `<b>Creator:</b> ${this.currentAppearance.creator}`;
      if (typeof this.requiredModsElement !== "undefined") this.requiredModsElement.remove();
      this.loadRequiredModsWarning();
    }
    exit() {
      super.exit();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/introductions/exploringModeMenu.ts
  var ExploringModeMenu = class extends BaseSubscreen {
    get name() {
      return "Exploring Mode";
    }
    load() {
      super.load();
      this.createText({
        text: "As long as you don't have mommy, you are in exporing mode. This mode allows you to explore how all the mod's functions work. It removes all restrictions and allows you to fully manage all your mod settings. But you get excited early, as soon as you have a mommy, you will lose that freedom and your mommy will take control of you...",
        width: 1400,
        x: 300,
        y: 320,
        fontSize: 6
      });
    }
  };

  // src/subscreens/logsMenu.ts
  var LogsMenu = class extends BaseSubscreen {
    scrollView = null;
    get name() {
      return "Logs";
    }
    get icon() {
      return `Icons/Title.png`;
    }
    async load() {
      super.load();
      if (InformationSheetSelection === null) {
        logger.error("InformationSheetSelection is null at LogsMenu loading");
        return;
      }
      if (!hasAccessRightTo(Player, InformationSheetSelection, "READ_LOGS" /* READ_LOGS */)) {
        return this.createText({
          text: "403 | Not enough rights to read logs",
          x: 400,
          y: 400,
          width: 1200,
          fontSize: 8
        }).style.textAlign = "center";
      }
      let logs2;
      if (InformationSheetSelection.IsPlayer()) {
        logs2 = modStorage.logs?.list ?? [];
      } else {
        const statusText = this.createText({
          text: "Loading Logs...",
          x: 400,
          y: 400,
          width: 1200,
          fontSize: 8
        });
        statusText.style.textAlign = "center";
        const res = await messagesManager.sendRequest({
          message: "getLogs",
          type: "packet",
          target: InformationSheetSelection.MemberNumber ?? -1
        });
        if (res.isError || !Array.isArray(res.data)) return statusText.textContent = "Loading Error :(";
        statusText.remove();
        logs2 = res.data;
      }
      if (logs2.length === 0) return;
      const scrollView = this.createContainer({
        scroll: "y",
        x: 150,
        y: 240,
        width: 1700,
        height: 580
      });
      scrollView.style.display = "flex";
      scrollView.style.flexDirection = "column";
      scrollView.style.alignItems = "center";
      scrollView.style.rowGap = "1vw";
      this.scrollView = scrollView;
      logs2.forEach((log) => this.createLogButton(log));
      const deleteLogsInput = this.createInput({
        placeholder: "How much logs to delete",
        x: 150,
        y: 845,
        width: 840,
        padding: 2,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "DELETE_LOGS" /* DELETE_LOGS */),
        onInput: () => {
          if (parseInt(deleteLogsInput.value) > scrollView.children.length) deleteLogsInput.value = String(scrollView.children.length);
          if (parseInt(deleteLogsInput.value) < 0) deleteLogsInput.value = "0";
          for (const c of [...scrollView.children]) {
            const style = c.getAttribute("style") ?? "";
            if (style.includes("border: 2px solid red;")) {
              c.setAttribute("style", style.replaceAll("border: 2px solid red;", ""));
            }
          }
          for (let i = 0; i < parseInt(deleteLogsInput.value); i++) {
            const style = scrollView.children[i].getAttribute("style");
            scrollView.children[i].setAttribute("style", style + "border: 2px solid red;");
          }
        }
      });
      deleteLogsInput.setAttribute("type", "number");
      const deleteLogsBtn = this.createButton({
        text: "Delete",
        x: 1010,
        y: 845,
        width: 840,
        padding: 2,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "DELETE_LOGS" /* DELETE_LOGS */),
        onClick: () => {
          if (InformationSheetSelection === null) return;
          const count = parseInt(deleteLogsInput.value);
          if (count === 0 || Number.isNaN(count)) return;
          const children = [...scrollView.children];
          for (let i = 0; i < count; i++) children[i].remove();
          deleteLogsInput.value = "";
          if (InformationSheetSelection.IsPlayer()) {
            const logObject = addLog(`${getNickname(Player)} (${Player.MemberNumber}) deleted log entries (${count})`, false);
            this.createLogButton(logObject);
            modStorage.logs.list.splice(0, count);
            syncStorage();
          } else {
            messagesManager.sendPacket("deleteLogs", {
              count
            }, InformationSheetSelection.MemberNumber);
            this.createLogButton({
              message: `${getNickname(Player)} (${Player.MemberNumber}) deleted log entries (${count})`,
              ts: Date.now()
            });
          }
        }
      });
    }
    createLogButton(log) {
      if (!this.scrollView) return;
      const btn = this.createButton({
        text: `${log.message} at (${new Date(log.ts).toUTCString()})`,
        parent: this.scrollView,
        padding: 2
      });
      btn.style.wordBreak = "break-all";
      btn.style.width = "98%";
      this.scrollView.scrollTo(0, this.scrollView.scrollHeight);
    }
    exit() {
      super.exit();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/images/discord.png
  var discord_default = "data:image/png;base64,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";

  // src/images/rattle.png
  var rattle_default = "data:image/png;base64,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";

  // src/subscreens/attributionsMenu.ts
  var AttributionsMenu = class extends BaseSubscreen {
    get name() {
      return "Attributions";
    }
    load() {
      super.load();
      this.createButton({
        text: "Googlefonts",
        x: 200,
        y: 240,
        padding: 2,
        onClick: () => open("https://github.com/googlefonts/noto-emoji", "_blank")
      });
      this.createButton({
        text: "Freepik - Flaticon",
        x: 200,
        y: 350,
        padding: 2,
        onClick: () => open("https://www.flaticon.com", "_blank")
      });
    }
  };

  // src/subscreens/summoningRattleMenu.ts
  var SummoningRattleMenu = class extends BaseSubscreen {
    onlineFriendsList = [];
    get name() {
      return "Summoning Rattle (BETA)";
    }
    async load() {
      super.load();
      this.createText({
        withBackground: true,
        text: `You can summon your babies with a rattle. It attracts attention perfectly and is audible through the rooms :3 Keep in mind that summoning will only work if the target character has "Summoning rattle" rule active.`,
        width: 1600,
        x: 200,
        y: 200,
        padding: 1
      });
      let isLoading = true;
      const removeHook = hookFunction("ServerAccountQueryResult", HookPriority.OBSERVE, (args, next) => {
        const [data] = args;
        if (data.Query === "OnlineFriends") {
          this.onlineFriendsList = data.Result;
          isLoading = false;
          removeHook();
        }
        return next(args);
      });
      const loadingText = this.createText({
        text: "Loading...",
        x: 500,
        y: 550,
        width: 1e3,
        fontSize: 8
      });
      loadingText.style.textAlign = "center";
      ServerSend("AccountQuery", { Query: "OnlineFriends" });
      await waitFor(() => !isLoading);
      loadingText.remove();
      if (this.onlineFriendsList.length === 0) {
        return this.createText({
          text: "No friends online :c",
          x: 500,
          y: 550,
          width: 1e3,
          fontSize: 8
        }).style.textAlign = "center";
      }
      const scrollView = this.createContainer({
        scroll: "y",
        x: 200,
        y: 400,
        width: 1600,
        height: 510
      });
      this.onlineFriendsList.toSorted().forEach((f) => {
        const line = document.createElement("div");
        line.style.cssText = "display: flex; align-items: center; justify-content: space-between; column-gap: 1vw; width: 100%; margin-top: 1vw;";
        this.createText({
          text: `<b>${f.MemberName} (${f.MemberNumber})</b>`,
          parent: line
        });
        this.createButton({
          text: "Summon",
          padding: 1,
          parent: line,
          onClick: async () => {
            if (!ServerPlayerIsInChatRoom()) {
              toastsManager.warn({
                message: `You should be in chat room to summon ${f.MemberName}`,
                duration: 5e3
              });
              return;
            }
            const spinnerId = toastsManager.spinner({
              message: "Shaking the rattle..."
            });
            const res = await messagesManager.sendRequest({
              message: "summon",
              data: {
                roomName: ChatRoomData.Name
              },
              target: f.MemberNumber,
              type: "beep"
            });
            toastsManager.removeSpinner(spinnerId);
            if (res.isError) {
              return toastsManager.error({
                title: "Summon error",
                message: `No response was received. Make sure ${f.MemberName} has "Summoning rattle" rule active.`,
                duration: 6e3
              });
            }
            if (res.data?.success) {
              toastsManager.success({
                message: "Summon was completed successfully",
                duration: 4e3
              });
            }
          }
        });
        scrollView.append(line);
      });
    }
    exit() {
      super.exit();
      this.setSubscreen(new MainMenu());
    }
  };

  // node_modules/.pnpm/zois-core@2.0.4/node_modules/zois-core/dist/changelogs.js
  var TAGS = {
    fix: {
      name: "Fix",
      coloring: {
        text: "#771515",
        background: "#f9b4b4",
        border: "#ca6565"
      }
    },
    chore: {
      name: "Chore",
      coloring: {
        text: "#464646",
        background: "#f2f2f2",
        border: "#e2e2e2"
      }
    },
    feature: {
      name: "Feature",
      coloring: {
        text: "#147914",
        background: "#cbffcbc7",
        border: "#4eea4e"
      }
    },
    localization: {
      name: "Localization",
      coloring: {
        text: "#09093e",
        background: "#a1e0f4",
        border: "#66adec"
      }
    }
  };
  function showChangelogModal() {
    const changelog = MOD_DATA.changelog;
    const { data } = changelog;
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: ${CommonGetFontName()};
    `;
    const modal = document.createElement("div");
    modal.style.cssText = `
        background: #ffffff;
        color: #1f2937;
        width: 90%;
        max-width: 720px;
        max-height: 85vh;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;
    const header = document.createElement("div");
    header.style.cssText = `
        padding: 0.65em;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    const title = document.createElement("h2");
    title.textContent = `Changelog \xB7 ${MOD_DATA.name} v${MOD_DATA.version}`;
    title.style.cssText = "margin: 0; font-size: 1.5rem; font-weight: 600;";
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "\u2715";
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        padding: 4px 8px;
        border-radius: 6px;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = "#1f2937";
    closeBtn.onmouseout = () => closeBtn.style.color = "#6b7280";
    header.appendChild(title);
    header.appendChild(closeBtn);
    const content = document.createElement("div");
    content.style.cssText = `
        padding: 16px 24px;
        overflow-y: auto;
        flex: 1;
    `;
    const commitsList = document.createElement("div");
    commitsList.style.display = "flex";
    commitsList.style.flexDirection = "column";
    commitsList.style.gap = "16px";
    for (const commitData of data.changes) {
      const commitElement = createCommitElement(commitData);
      if (commitElement) commitsList.appendChild(commitElement);
    }
    content.appendChild(commitsList);
    modal.appendChild(header);
    modal.appendChild(content);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.onclick = (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    };
    closeBtn.onclick = () => document.body.removeChild(overlay);
    document.addEventListener("keydown", function handler(e) {
      if (e.key === "Escape") {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", handler);
      }
    });
  }
  function createCommitElement(changelogCommit) {
    try {
      const commitDiv = document.createElement("div");
      commitDiv.style.cssText = `
            display: flex;
            gap: 12px;
            align-items: center;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            transition: all 0.2s;
        `;
      commitDiv.onmouseover = () => commitDiv.style.borderColor = "#3b82f6";
      commitDiv.onmouseout = () => commitDiv.style.borderColor = "#e5e7eb";
      const avatar = document.createElement("img");
      avatar.src = changelogCommit.author.avatar_url;
      avatar.style.cssText = `
            width: 48px;
            height: 48px;
            border-radius: 50%;
            flex-shrink: 0;
        `;
      const info = document.createElement("div");
      info.style.flex = "1";
      info.style.position = "relative";
      const author = document.createElement("div");
      author.textContent = changelogCommit.author.name;
      author.style.fontWeight = "600";
      author.style.marginBottom = "4px";
      const message = document.createElement("div");
      message.textContent = changelogCommit.message;
      message.style.cssText = "color: #374151; line-height: 1.4;";
      const tags = document.createElement("div");
      tags.style.cssText = "display: flex; gap: 4px; position: absolute; right: 2px; top: 2px;";
      for (const tag of changelogCommit.tags) {
        const tagEl = document.createElement("p");
        tagEl.textContent = TAGS[tag].name;
        addDynamicClass(tagEl, {
          base: {
            fontSize: "0.85em",
            padding: "2px 6px",
            borderRadius: "6px",
            background: TAGS[tag].coloring.background,
            color: TAGS[tag].coloring.text,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: TAGS[tag].coloring.border
          }
        });
        tags.append(tagEl);
      }
      info.append(author, message, tags);
      commitDiv.style.cursor = "pointer";
      commitDiv.onclick = () => {
        window.open(changelogCommit.commit_url, "_blank");
      };
      commitDiv.appendChild(avatar);
      commitDiv.appendChild(info);
      return commitDiv;
    } catch (err) {
      logger.error(`Failed to load commit ${changelogCommit.sha}:`, err);
      return null;
    }
  }

  // src/subscreens/mainMenu.ts
  var MainMenu = class _MainMenu extends BaseSubscreen {
    canvasCharacter;
    circleColor;
    static characters = [];
    static createCharacters() {
      _MainMenu.characters = [];
      for (const outfit of CANVAS_BABIES_APPEARANCES) {
        const canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        const babyBundle = LZString.decompressFromBase64(outfit.bundle);
        if (!babyBundle) continue;
        const babyAppearance = serverAppearanceBundleToAppearance(Player.AssetFamily, JSON.parse(babyBundle));
        const myAppearanceBundle = LZString.decompressFromBase64(MY_APPEARANCE_BUNDLE);
        if (!myAppearanceBundle) continue;
        ServerAppearanceLoadFromBundle(canvasCharacter, canvasCharacter.AssetFamily, JSON.parse(myAppearanceBundle));
        importAppearance(canvasCharacter, babyAppearance);
        PoseSetActive(canvasCharacter, "Kneel");
        CharacterRefresh(canvasCharacter);
        _MainMenu.characters.push(canvasCharacter);
      }
    }
    get name() {
      return "";
    }
    run() {
      DrawCharacter(this.canvasCharacter, 1500, 350, 0.6, false);
      DrawCircle(1550, 575, 6, 2, this.circleColor);
      DrawCircle(1525, 550, 8, 2, this.circleColor);
      DrawCircle(1500, 525, 10, 2, this.circleColor);
      if (MouseIn(1580, 500, 150, 180) && document.body.style.cursor != "pointer") document.body.style.cursor = "pointer";
      if (!MouseIn(1580, 500, 150, 180) && document.body.style.cursor != "") document.body.style.cursor = "";
    }
    load() {
      super.load();
      const selection = InformationSheetSelection;
      if (selection === null) return;
      this.createCharacter();
      if (selection.IsPlayer()) {
        const addBabyBtn = this.createButton({
          text: "Add Baby",
          x: 900,
          y: 820,
          width: 550,
          height: 115,
          variant: "filled",
          onClick: () => {
            this.setSubscreen(new AddBabyMenu());
          }
        });
        addBabyBtn.style.fontWeight = "bold";
      }
      this.createButton({
        icon: discord_default,
        width: 90,
        height: 90,
        x: 1815,
        y: 235,
        href: DISCORD_SERVER_INVITE_LINK,
        modules: {
          base: [
            new StyleModule({
              zIndex: "10"
            })
          ]
        }
      });
      this.createButton({
        icon: "Icons/Rectangle/Dress.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 340,
        onClick: () => {
          this.setSubscreen(new WardrobeMenu());
        }
      });
      this.createButton({
        icon: "Icons/Graphics.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 445,
        onClick: () => {
          this.setSubscreen(new AttributionsMenu());
        }
      });
      this.createButton({
        icon: "Icons/Changelog.png",
        width: 90,
        height: 90,
        x: 95,
        y: 60,
        anchor: "bottom-right",
        variant: "filled",
        onClick: showChangelogModal
      });
      if (selection.IsPlayer()) {
        this.createButton({
          icon: rattle_default,
          width: 90,
          height: 90,
          x: 1815,
          y: 550,
          onClick: () => {
            this.setSubscreen(new SummoningRattleMenu());
          }
        });
      }
      this.createText({
        text: MOD_NAME,
        x: 940,
        y: 110,
        fontSize: 14
      });
      if (selection.IsPlayer() && isExploringModeEnabled()) {
        this.createText({
          text: "You are currently in Exploring mode!",
          x: 150,
          y: 90,
          width: 600,
          padding: 1,
          withBackground: true
        }).style.textAlign = "center";
        this.createButton({
          icon: "Icons/Notifications.png",
          fontSize: 2,
          x: 160,
          y: 145,
          width: 50,
          height: 50,
          onClick: () => {
            this.setSubscreen(new ExploringModeMenu());
          }
        });
      }
      [
        new GlobalMenu(),
        new FamilyMenu(),
        new RulesMenu(),
        new CyberDiaperMenu(),
        new NotesMenu(),
        new LogsMenu()
      ].forEach((m, i) => {
        const btn = this.createButton({
          text: m.name,
          x: 150,
          y: (selection.IsPlayer() && isExploringModeEnabled() ? 225 : 150) + 115 * i,
          width: 600,
          height: 100,
          icon: m.icon ?? null,
          onClick: () => {
            const storage = selection.IsPlayer() ? modStorage : selection.LITTLISH_CLUB;
            if (m.name === "Cyber Diaper" && storage?.cyberDiaper) {
              this.setSubscreen(new CyberDiaperSettingsMenu());
            } else this.setSubscreen(m);
          }
        });
        btn.style.fontWeight = "bold";
      });
    }
    createCharacter() {
      const selection = InformationSheetSelection;
      if (selection === null) return;
      this.canvasCharacter = _MainMenu.characters[getRandomNumber(0, _MainMenu.characters.length - 1)];
      this.circleColor = cssVar("--tmd-text", "black");
      let cloudText = `Littlish Club v${version}
Thanks for installing the mod!`;
      let cloudHtml = `Littlish Club <b>v${version}</b><br>Thanks for installing the mod!`;
      if (this.canvasCharacter.IsGagged()) cloudHtml = `${SpeechTransformBabyTalk(cloudText)}<br><br>(${cloudHtml})`;
      const cloudBtn = this.createButton({
        x: 900,
        y: 300,
        width: 550,
        height: 500
      });
      cloudBtn.innerHTML = cloudHtml;
      cloudBtn.style.pointerEvents = "none";
      cloudBtn.style.borderRadius = "4vw";
      cloudBtn.style.display = "block";
    }
    click() {
      if (MouseIn(1580, 500, 150, 180)) {
        CharacterSetFacialExpression(this.canvasCharacter, "Blush", "Medium");
        CharacterSetFacialExpression(this.canvasCharacter, "Eyes", "Daydream");
        CharacterSetFacialExpression(this.canvasCharacter, "Emoticon", "Tear");
        setTimeout(() => {
          CharacterSetFacialExpression(this.canvasCharacter, "Blush", null);
          CharacterSetFacialExpression(this.canvasCharacter, "Eyes", null);
          CharacterSetFacialExpression(this.canvasCharacter, "Emoticon", null);
        }, 2e3);
      }
    }
    async exit() {
      super.exit();
      this.setSubscreen(null);
      await InformationSheetLoad();
      InformationSheetResize();
    }
  };

  // src/images/rules-marking.png
  var rules_marking_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABeIAAAI9CAYAAABWsAhGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAP+lSURBVHhe7P0PXFzlnTf8f6JjnehYhy5pBxe7jDd2IcUuRHwaUvytoaZr0PQxxPRnSNNViW6V6FaJvVeJvp47xfS+I7H7U5J2lai3KdGfKeijhnirQfdOCvFJBNpQYA0LtKGdqaGd0VCZmDHn+V4zZ+DMmTMwwEz+mM/b1zEzh5kz5891zvle33Od68zSBIiIiIiIiIiIiIiIKCXO0f8lIiIiIiIiIiIiIqIUYCKeiIiIiIiIiIiIiCiFmIgnIiIiIiIiIiIiIkohJuKJiIiIiIiIiIiIiFKIiXgiIiIiIiIiIiIiohRiIp6IiIiIiIiIiIiIKIWYiCciIiIiIiIiIiIiSiEm4omIiIiIiIiIiIiIUoiJeCIiIiIiIiIiIiKiFGIinoiIiIiIiIiIiIgohWZpQn+dkO3bt+Pf/u3f8O677+LYsWP6WCIiIiIimsj555+Pr3/96/inf/onlJeX62OTj/E6EREREdHUpTpen1Iifu3atdi0aZP+joiIiIiIpqOqqgq1tbX6u+RhvE5ERERENHOpiNcTTsSrljUrV64Mvd68eTNWrVqFiy66KPSeiIiIiIgmdvToUWzbtg2VlZWh9w0NDUltacN4nYiIiIho+lIdryfcR7y6vVVRQf1dd93FoJ6IiIiIaApU/KziaBVPK5H4OlkYrxMRERERTV+q4/WEW8Tb7fZQH5MfffQRg3oiIiIiomlSLW0+//nPh/qgDAQC+tiZY7xORERERDRzqYrXE07Ez5o1K/Rvgh8nIiIiIqI4UhFbM14nIiIiIkqORGLr0dFR/OY3v8FXv/pVzJ49Wx8bX8Jd0xARERERERERERERne1UEv7AgQPw+Xyhf9X7yTART0RERERERERERESUgEgSPtJtjfo3kWQ8E/FERERERERERERERAmIJOFVH/JXXnklLrjggrFk/ESYiCciIiIiIiIiIiIiSkAkCV9YWIgvfOELoWS86iM+0kI+HibiiYiIiIiIiIiIiIgSYLfbQ0l41RLe+F79O5FZ2kSPfjVI5EmxREREREQ0uVTE1ozXiYiIiIiSY6LYWvUFr1rAm8UbH8FEPBERERHRScZEPBERERHR6SsVsTW7piEiIiIiIiIiIiIiSiEm4omIiIiIiIiIiIiIUoiJeCIiIiIiIiIiIiKiFGIinoiIiIiIiIiIiIgohZiIJyIiIiIiIiIiIiJKoVlago9+TcWTYomIiIiIzkapiK0ZrxMRERERJUcisfXvj/jhO/qX0Ou0iy7EX89xhl7HwxbxREREREREREREREQJUkn4P304ghMntNCgXqtxE2EinoiIiIiIiIiIiIgoQZGW8EZW44yYiCciIiIiIiIiIiIiSpBqBW9mNc6IiXgiIiIiIiIiIiIiohRiIp6IiIiIiIiIiIiIKIWYiCciIiIiIiIiIiIiSiEm4omIiIiIiIiIiIiIUoiJeCIiIiIiIiIiIiKiFGIinoiIiIiIiIiIiIgohZiIJyIiIiIiIiIiIiJKISbiiYiIiIiIiIiIiIhSiIl4IiIiIiIiIiIiIqIUYiKeiIiIiIiIiIiIiCiFmIgnIiIiIiIiIiIiIkohJuKJ6PQUDMA/or+eoYB3AD0HOtAzHNDHEJ2ZWJaJiIiIxIgXA50d6Ojz6yPorMDtTkRnuFma0F9PaNasWaF/E/w4nTEC8Pb2YMCQ1Bk9OoCePsCd50baefpIxelGQY4Ldpv+niiFvLvWYEHpZngW16H9xUrkOvQ/TCbgRctPKrByfTvcSyuwLKsHtT9ugjf0x1xUvdGK2kXO0DtKEv8AOnq9CAT194rNDld2Adzp+vsZ8Pd1oP2gHKe8Pvj9/vDvhI5D8huZGcjIdMN9qRsZLheciZaTMwHLMtFnWipia8brlAyBoR50DBqSXMd96O4awOzsXLgvmq2PFHan1Bdy4bLr74lSJoCBV9dh5W2b4b1iJSok/mnZuAktejEt2tCO5gcKwKjos4bbnYhOrcli61/3Demvon0tO1N/FYuJ+LNEqBXl/mY07/dgdGQAzc9sR8dMLiKnF6Fy/TpULi9Bbjqjb5q5SKVv9Eg32l7djHXPdIT/kF2F1v21KEoowpJg7ZmVmHtbk7yy5rpzJ3oeL4XzbLmgFPSj5cESXP8UUPFkI2qXu5HwHjvUgk0btqJ9ZDYy0oGB3m4MHPLC4x+Ad1j/zGTsbpSsqED5inKsXCi/PdF6l3nteLUBzW0daD8gv+XzoqdzIO62tOQoQNntEqjfUYnSnMSPTf6961Cy8BF0RC4myHw6M3Nhl3LpVWssaJoLWxFqO1pQlZeq4x/L8meevwPbn9iMrc9tRUufPg4ulN5fg5ofVqDAcBEr0NuMzY/LZ7c1oydyp5BTzsMbarDu1hImwc5QTMTTKTUi59iuVjS/2Q7fqB89Ens1del/m5bw8avqjmUoyWZajJIr0LkJJVetRZux0YdRXjVa99QkWF8gK6ou1rq/FR1dA/Acluh3YRXWrZBYWP/7qcDtTkSnWioS8WpiCVEfncLH6TQyerBOK7GFt1/yB7dWen+91jowqv8a0dR5mis1t2X5kiGnWmv16R+czGi/Vr/YYhqGwX3vbs13XP/82eBou1ZTqC//wjqtO+FddVTrf7I0Zv1NODjcWkGey/pvarAXaZVPtsZd/6OH6hM8VuVqpctLtZL5RVrR/AItN93qMzI45fce36m1H558oX0tVfHLoOWQq1XvSbRgTgPL8mfXcZ/WvqVCK4hXbkNDgVb9hkf2326t4e4SzWX5GX3IrtAaeQ4+I0W2YTKlYpr0GeRr1arzDceRJA+5K2q0hv0eiSSIkmFU695QYFnWxobCGq39qP5xSoDE+dvLJ44v8k/1OuV2J6JTL3K8iedXhw5bDhNhH/FnAXvmApStKkJBYRGKiktQdnsVqtfXoOb+ChRMeInbibLH2+E7rsF3sBHVywssrogPoPnR1ViQOw+rn2iDP97VakqdgBcdu5rRNjildsOJG+5B86stGEhhN3wTtpJ2zE68OyRbGtzZbv2NFTdKF887q1oQB4ZasfOA/magB56E+923w71qK3Y/XYua9dWoWp6rjzdxlKHxsKbOTNCO9qP9oAfaqA/dbzSg5s4SSIA/LtCGzXcsQMl92zFgMR/27JWof6UWleoY9VAVyvP0P5i47qxFw/ad2N3Wita2dnQf0TB6WJazqRH195eM357ql9+753rMy12AtS9N3LLeubAGrQdlent2o/72CcpQYRUa3pDPHWzBuuIUNr+ZcVkOYGBvM5oPeKd2RwGlWAAdTyzDgru2oiNyV0lWOWqbdmP3i3Wh83JJlhrZgUceeRI1/1iClU+06N0RSTldXCPlbzcaZb+svr0Uueqk3LcVNds6uJ2JKHEON0q+U4aiwgIUzS9CyYrKcN1Azr1lOfpn4nDf3oDuo3LO97Sj/t5SuC3OQz3Pr8PKq3JRcs929KQwfqR4PmsxgB1p2bkTdj9SUCbnxM9S94QpZ8ds+2wYOpqKkbuoCO5TescdtzsRfUaF8/GTUx+dwsfpTHDcp+28PX7rVfvSBq3f1JTFt79WK7L4bGTIvbsx5juUWp6mCk0CFA3zU9AiQMrI7nvd4W2byta3x0e1UTXt4x6tYbk9ulzlTaFFvBjtqI3bqtq+uP4sK58+rfWhXMM6KNJqD05vBXhe0cuZeZDt0x53+4xqnv0NWlVMqzunVrJhkvIkZaFxhdP0vfDgvr9Vliw+X0e9VuYyfc9epFU9155QGY67rHBplc0pbAVvMpOyrO4uKFXftZdq9T08KJ82RvvlGBddrgvWS3k+vFuryhkfFx5ytG98yfhelT+P5muriT0P51RN6ThJp4fI9kumVEyTzi79z5Vpdr0cxQyZFdpOj/7BiCNy/Mqz+GxkKK7Wdpu/Qyn1mYwBjkxwF4erXGucuPEhxeEbaNda29q17kPtWt0i43p1a1WpvPMzUdzuRHSKRY458Vi1hlfDRNgi/mxmsyPDlaa/MXOh4vaSmKvgzsIqtB73YOed1i01e56owNodU+zTmWYmOBpe352taPemYM3rdzn0tLVhIFUbVspiqNW7zQl3TmzZmkpjDHt+FRr316Pc3CWXsxR1j608xS07TrKhVmx9pkd/o7ShcVdy90+7e+4ED0i1w1VYjprn61Eatd79aHn4ETT2TTAnIwNo3W/djG7U7xsrl1ac+RVoeLMB5aGWxbpAGzZ9rwKb903eNM95qRuWRzjbXOSexAI0o7IcDIS3c6AVbWyOeNoIDLVg60vG7VGAZYtz4duzGZt79VFjhtH+R/2lkrUMZQVA+3N1siebnEV3+RBRaqW5MuK2QM29tQILom51E+klqD04iv7nyqy/t/cRrF7fDC/vmj15PosxQHoRana1onaxuZRJnXXLJpRN0BUvxefMUnfFFCA3PYCBAX1kiBNpjtOg0sTtTkSfQUzEkzVnCUquMEfaOpsLJfdUmxJrEX40PfgImlPVTQqZBODz6redZhdgrjPZAVMAXq8n9Mp1RQEyTkI8Zj9PfxEx7IVnipU3lYjduqsOJWPJKSfKH6/Dyik8vPOzYODtrWgwPTuk7ZXmaV1QGfV7wuXMJCPbhXiX8yLsWQtQkq+/iQi2yDaa4KLAiAeeOA+EDQT0CuYE7Hnl2PR4pSmh3oF1929G22R1Uocsk1ViMzP3pD+cetplWbZXeL+ReXbHS6nQyRbw9mDAeDyzu+GWMpXmnhdz8ef8vIsxqr8OyXQjw+FERu5cfcS4ou+tRAE3MxGllBulC+N1E2GHe8k6rJ2vvzUZ+Ola1O3hReGT5rMaA7iKULW9GdWGmNJ991bULIlTZ6XEjQxgINIPXkgakl6tnC5udyL6jGEi/mxnTnpGpGdIhV9/bcGevQyVt8Y5+Q1txeYkt7qlOIIBDPR0h19f6oYr2bG2BGXdPeEtmXG5+6T0rW63m6K+4KgM+uspsOesRM2GUqkw2lHyUAM2LXdPqWX9GS/oRU+bRb/RexvQ1DmNyrDNeu0509Im78PfloZciwt7A4fkOBFn2wZGPPDGm80Ey4NrYQUqCvU3EfvWYcHCtWiJqmxEs9tmW5cVl0qE6q9PoumUZc9AD0INm9LdyHWdVSX/tOYbGED40qYuUx237XAWVqDugaLx7frVVbjnq9EPUnC63UiT42PuqpqolmHuFXXYeqfVM1yIiJLJiYy0CY40zgKU31MW51jUg80/Zav4k+UzHQM4i7BmQzWKZLFcS2rR8GApXCehfjIjZ0C5D4z44I8KO6ZX/0qZM3G7ExHFwUT8Wc7uiJO5VbelThS32ZyYt8jwUEST9j09fHDrSeDvbMDWXXpG0eePm9ScngB6Xt2KJr27hMARmX74ZUrFLEN6Biaq98UlZbTo/p3waaPYvV6CtdOpHuLvQdOPluGyOWmYPWsWZuUuw5p71mJ7bxLXsOoC4/moe0x1HWh4Zar7ZwABv9X2t8OdnZFAAtAOuz32cVAB/wQt2yPdFVlJNPB2FKDqpzUo0N+O6dyEtU9N8HBL+W2n1cFttsyT/vKkmmpZ9rZg+7bW8PKN+CGrmU4LUt5le0RtDmda+O4LdafZhhYM9LSjdX8/fAc2Yv45x8Kf0aWlq0sxQiqjVa8MoL+jFe09HnRvr+SDyogoeeRcZ/kAR4cbGZM0kc24qhQL4pyj/ftb0c1G8al3FsQArsU1aB3V4HmlCkWnU6PooB8d29bim5fKuX22xPcXzcPKu9bgkUhd7TTmPzwQvngTkT43dMfe6eS03e5WAl40/2g1Vv+oGanoOZaIzmxMxJ/tgnHODCOBSZO6Totb6SP8Xg9Gzd9XJ6QHl+Gb5Y9M2Bp1QhLgeHt70LGvDT1Dp/CsNoP5CAy2YPOPNqFppklXfwca1q9F06D+ftiT1GA70NuEmge3okffjh7Zpgkn+g2fCwx7p5T0tdtNHZ34/fCdpE2dtG0zoQA6nlmDZQ83YWBYT8rJut78RCs8st8li7djJ1riVHh7Xm1Aa5xuX+KJuVMhxImMRK5wBD3o6bK4KDBBQt0uFYDcbP2NieqaJlH2nDKsLNbfGHQ8VoOmeH3U250qDxHDmZ6G2YleBDhVgl60PLUO6yKVvoAHnqkeGE6X4+xnkbrDxyjNabjTyA5XTgGKCsN3H5nLedTdJ+p5GvlFKMhxnZqLQ0R09gmoeGzic4I6dxcYn89iZBmnBtCzbQ2uL12NzQemm6UPwD8o56wDbejo1btrPCWmPx9Jiz+TEQMkQnUROIXY/pTz96D5J4+k/I5t/75aVHxvE1qG9AsgIx3Y/tOtaB/2zfx3jet7xAtv9E1zM+Z058JtjHFVC/kzaRtbOUnbPYrE0AP7mvDI90pw/cNbsXXD5unnPc50Uk4HujrQtq8DA1M9vCcjb0R0OtMf2jop9dEpfJzOCKNa/5MlY9s2asiv0dqP6h+LY/RgrVZk9V01zK/Vuk0P6R/tqNUKQn93ahWveDTPnjqtzKV/PqtEq9i4U+u2ejj7qEdrb6rVynP0zxqHnDKt+rlWzXNc/+zxUc1zqF/zmH5b88nveXyazzz+aL/WcHepVrK0Qqt+cqe2e0+r1tqmD/K6+7DhC1OZjwhfv9Y9IL/d067tfLJGq1xeouWmh79jX9qgdffs1urXV2gl2fp07G6tYH6JVnZvnbb7kHlmx40e3qlVFerfiQzp5dpOj/6BGfLtqdFK7KbpL67X+s3LF0PKVFOVVrq4VCvQlzM02FxawaLy0Drujtk40fqfK9Psxt81l8Wj3Vrjhmqt+qEqrepeGe6s0CrvrdTKFxVoTv3zrYZy5DvcrbW+UqdV3lqp1Txt2EYp2jaTOtyolYd+x6mVrCrXSgpzNZe+rp2rGmPL0HSM9mv1i/X5jjOUPtkvWytx/U+XWkwnV6vZP/lUfHuq9X0/eija2B5/HnytWpXVviaDc8VU1tOo1r6xwHI6BffutJ6OZ6dWETk2GYeE9oHUiVuWI9Tx7Ha3ab7dWtUeqwOryXSObxZGD+3W6u6t0Kq2yOdl4/oGZP96rlarWlGkubMKpMzXaI0HY+dn9HCrVv+Q7A/zCzSXTfbBvPBv9icy6/Ldhg2yrxYWyD5apJUskeO5Wj8z2E0nJet695O1Ws1j9VpDc7vmmex8OdCqNcrnqxY5o9etvUiruL8qtE1rm9U+Keew/Y1a/ePVWlmm4XNqyCvXqu6v1Cpul3XYk8qFo5Mlsm2TKRXTpLPL6P4ay3M2bCVa/WTHngnO3bCXag0D+uci1Of1OCv3ATluH9qp1Syyhz/vyNVK744Tc0m839/WoNUsdUX/Ruh7BVr5hsaoOoU6f/Yf0d9EjPo0z2GP5jOfZ477tPYn5ZyyqEyr3NCg7WwJ1wkidYP2Hs947DLF+QhJVfw5kxggUfIbOzeWa0WhGMmplTfNrOIxk/P36BFZj3satVpVD5Dt1B5ZTNmu/T1SFxwIx0zVt5dpRTl6mXJVaDt7urWdW6q18uLINnNquYXy26uqtYY2w7adqtFurW5ReL27l5RrZcUFmjtSF8qu0naby98U+A42aBVStyrN05cjNNg1d2GpVrG+QdvdM7VtPOqR8mda0NFD9VqpxF9j07eVavUTlTefrMeNEpM8IOtelk1tj9ZX6rWau8u0giwps4sr9LjGRMVPW6q0soVFWq4qR+myn6xv1FoHElvzp9V2P9Kq1RSHf8OVV6AVqTpdZP1FBvXbh7q13U/Lby/MHavjOvNKtPIH6rXWqexCCcSevrYarcgh85Pl0uxqe9qdmstYJx8bcrXKpm6tu0niTSmrubIPFsk+GBrktTtUN3VpZVu6tVGJ/31yXGp4rEarWa/q4DJI7Fq9QeZlQ41W96LMS2QFHlHruVIrMJYlfXAvrtLqWhKrf04rb6TWT2g9h48nRQvDx3BVPolmIlKG4/nVocOWw0SYiD+rSfC4JU4iPrNy0oDB11wRTnxaDF9c+dJ40kYFtC/WaBWF48GDK9MYSIwPrlUNWr/h6Dw6oAJyU+LCYnCvqpeDsU/bfX+u5d+Ng2tJjdaqL5uvpTL2hGkcMiu0RtmHpjQf+klx9FCDVua0/pwa7MUSpEWCbMvBrhXdKwG58SQ7KgHw+tL482xzhU6kBTm5WsHSam1ngkFNxKinVatdYQ7iDUO6TFemn5tToJWa5s3y4oDVkF6iVb8S/yTs2W5KxGdFl0VfS9XE2+y8S7Sr/qE0FAyNBcCRwRm+WJGSbROPClQfq9TKV5RrlffXaLXry7VcNY0cqWwsjS5TSUvEH5blM19IMQ/FtYnNf8io1m15rCjSag9OUsakTNUUm7+nhlyteqLKoVTOq+NU5l23xkmgx+F5sdz6WCUVI+NFmzHxEvGL6qOOTynla9fq7yzTypZOXJZDjsv2ebFKK4pbpu2hCkJBfq6WK2W7tiU66p/W8U3295pby0IVwJ3NO7XGp+UYv2S8ggFHqQTrpdH7snFwlWiVT7ZqPtmOnj21WqllJUEG5wTHi1CypFxzW31PBufCSq3m/hLNZXdp5c8lFvhPRlWGq4zLOTbIOl5UbXmRQRuY+HgzNuTXaG82TnJO0gf33btD647ObJHtmUypmCadXeIm4hO5+C7Hu9J48cfla7R3DIdIT1uDVr18PG63Z1kks9WQUxnd0ETiqsZ7i6w/axzyK7XGQ6MSA1RMflzNKdfqOvRlUw0mJjxm52pVLbIgU5wPJSXx5wxjgAmpCw37d2oNj1VrlStKNHdUcs2ulcq5dYxnt1Z3v8S7i1UyT+oKY3GUnIO3m87BUz1/y+dbN5ZrpUvLtBKV4M40xyz6BYej7VrtQuN40+Aq1SoWxyln+uBaLPWniRLQEZH6rcT3FXdWazUbIxfQi7TKe0smrMskLHRxZfK6rVr+so27J7+AMerRdst6LHAYvptTptU090t8UxfdwC5y4UzmofEBKZe312qNEu/tfLFOq75VysLYZ2UbybLHbZwn81Z6v5RZ2Twq3qzSE9exgyu8DMbY5nTc7gajPaZ1ZjVI3Vw1MLH8mxqyKrTGSerriceesr8+OUHsHTU4tbINdVplvAun+hCqm476tJ23T7z+ctfv0wZVstzciCRmkO38WDj+D5FjjM/YUjKyX00xb+RpkbqEVd1NDbL9qzdUyjHSruXeObU6JJESKUvxWCXh1TARJuLPcnETVFatVqLIiXHDRMHn57WcQnVFNTdush5Ol1Z0a7VWfW+FVha5Ou0qG2ttE0rs5hm/49RK5QTdL8HnaE+9VhaVuJGguHlQa59wnvQhvUxriJxoVWJ7g/z+Yr01tXnIKtH++adPa/88pfnQA1wJ5Cc7uYWGvHKt5jnVGn+31ijBRihJaxhyH2oNBa/9TZVawWTJ1ajBpVU0R07Mk5CT3u6HSuJvK6vBLutRLyOjA9HL6iqu0Gpf6Q7fgaBa2m6vMlXq3FpFnFY0nldMF3gc478TErraXatVrzK1cpaT7H/deL+2OM0wzjwsqgufsJO8bSzJfLY+XaWVxAtIMsu0amNw7SiRSmCC22sSah2GKp1SsaywTIKroSCh1uxhUsnbaLVvFWl1E7SOU4FjZdS+Exkk+FMtLPTPWZqoRfwUL1jEv3gj+4hVOTyyW6vMsvh8AncKJcvoQIN+50ScQS/L6hhk2Yp9gsFYbqd+nA2vr/iJmqkNrsKC8W2TV6ZVPVQtlSVzpbMg9LtR5UUdu+WYFals5K6o0Rqad2utbzRqdVJhNB8rix6fpLxNRlUMniw3lSOXVjBfKoamxETu4qqxpEuIzGvDvaXhxIQ5UeIMt4ivkEpm5XMyj7I9qpfGOXcWlmtV6ny5pEKra0vOsYJOrci2TaZUTJPOLqplbIll4sg5aVzpe6MqJlaKDOfI8MWvqlaXctw0JgKNg92puRdVatUPVMpxsUg/Drq1ysi5Wh1Pb41OCLlX1Wmt6g5WX7tWq7dIjgxFG1q1wV1VcRO+44P8RiR+VzHP9mqtfEmJlmsVd9tztdKHG7TN/zi1+QglnpIcf840BphYvEYYkSG6MUa/uSGNYchdb7gDcjrn71Br83gJXBmcZaGGU6pVev2KiROGocEh596N4bsddm+viU0eFtfF3Nk9RuKB7jfqtMrieA0YcuW8bowXptkYwLwsUiet3CLxmdoFQ3di1GsVpli14P4JLtJ7dms1i+PNs0sru1/qmVHjCrRqFWvEi4mnOmQVaQWRGEjdLXJ/jVZ1a4kprrJrJZF9RTmdtrsVqeO2Pl2jVd4ux6yNFnc9GgdZ5rI7Jd6LiXGh2RfL71rVL6YTe6ry2dyg1T3dqO1uljJivrDnKtPqmlu11oMSV8t6Hj3SrjWsslp3uRKX7h67k93X0ajVPlQRam1v/Jw9W47piyq0R59apxUZ58lWpFU3dcu2lLLaVBl9DM4sD+diVP7hflWfD9+dML28kSzv9vEW+PbCCq32RTmetOzWGh6v0spMx0d11xET8TRVkfITj1USXg0TYSL+LOd7I07ru0lvR2vXqi0TbDKcf6H1eONgL9Fq39it1cbcyhm+/Ui1GCk3XdW0LzW0RpUDd+tDpkRsYY3W7hvVfIdbtbpbLVoP6Ccey65RjEm/+ZVag54QnfZ8RE6m8vf+/a1a4/o4gezC2vFb6kIk6H3c9Fm9FcVYcjXeYJcTnpx0G5t2aju318sJOIGWERFqOR6YpMVFfqVW92J4+o1P12n1htsN1W1woeBNTqx1Le1ae0e36Xa5Ua19g2k9LbQOdmIS8ZYXhWQ9PT0e8LtvD7e0UHyHWrWdqnWuRev8qJbUSdw20eRzr9RqFfmGz6nB6Y5tEZFdqpXfXa3VPNagtSa8sSZx3KM1rggHggXrW7X2LVZdyoSHoscSTU6GW1jETqNAq2lu17tzapd9y6d59u/U6jeoZGq8OyukgmJuGWVFAv/I7eoxg+oiZgqra/z2RvNg18q2WyTi47WIV11unaREvJJIWZ6sdV0osb6hQfbbRm1nkwTmj6uyFp7+jI5vKhkyaSstp1byQL22c097KLGvbuGtjnPXjH2J8XelDK8yVWaksmU8DowerBtLFLlut2jdcrhRqxirYLm0ykQvSlo52h1bSVEtNPWuy1R3PPXq1vqodSkV2DfMZUuOg+tN6yxepU/Wb52pdVfiyRM6U0S2bTKlYpp0lpHjp/VddZN0RSLnjJ13xkuG2bXPWY43Dk6t7Gk57z0Q2zDEfX+r5pNjcd1iU1JOdftgmCXPK6aEj8SQ9V0+bdSnGt6UWSTk3VqFxMvthyzOEepcFEn6q7uzQkklGT/d+Yg0XEhi/DmTGCARnjfMDWmMQ5FWG7mLQFENZVRXOzEtj93hOwh00z5/H+nWdjfVa9UrLGKPHOMdjlIX7GnXdj8XZ94lnjB3sRTbhaJ1YxVfh7qLwxzfujS3OWZUF2tuVV131GmN021kI7FoZSgOVglRieelbtVvqiuohiZR5cwUK41RF4dMMYVzUaVWdXupVpQdL9GtYmR1x4PELlus9p3owbW8Rmt4Q+/WVfadnXfGqQe4ysPJ8xAp2zH1C7XNDYX0NNjuifK1VVtfiCysHrsb37rObdEwKEmxZ0yjS4tuksbq8cZBdUVmzgUdl9h/yXh5Kbhf9l/5iKfZdLyToegxw8U3WZZa0wUV9727Nd+olJO749UXDcNEeaPnX9WqI3XuPFnP5t1N4un6peO/zViapiNSfuKxSsKrYSJMxJ/lJuoHMn5L11Gt/+myOFcs7VpB9Tta55sNWu2GGq36XqsTtwTyL/Zr3dutpiEnwA6v1vqQ+QQlwYDx9kcRm1xT39XnWR10DSeK0OA0nviNDEnG9HIJYCLLrZJQM5wPnbp1LbZ1UW64pYFJ7PTU58LT83mkMhH6jMV2M14AmI7jo5rnSGjqlknX0AnTHCzrxvp1zykdbwGeLyd6Y6WkyRQIpMcGREpMIj7S2sEg1AJfT9LaF9VE/U6YRaVFhlBFTv9ERLK2TYRVazD3rZELBRbBl5S5RqugebpUEjm0DcLLEOrzMd6dFIsSbfkRLxE/9cG5uEbbGffYYjBBC5yp9RGvtnG81n1x+sr3xbkIcEr6iJ+8LI/6POF902qdWQXSIck5vqk+I+tvtQ6iXVLuzRdMRvdbPVtE9VMZvR1U5Sh6PzLOm8z7+sgFAut9Va03dVwKH0tmULGSCtPue83LV6TVWP2mR8qNseWNo1Sr22/83Gjs/m/xPJWQUam0mO5mUf0nWy0pnbki2zaZUjFNOsvEPf+qxFxMwDXGJ+eLeOdap8Qb7767U6vfWKPVPFRp2YWAijP7O6xisvC5erA5tkFKTCL3yHif85Fh/DyvnhljvrvPFZUkNhqPtY2t5VXSaabzEZas+HN6McAUWd6l6NIq34id15hnPUXNw8zP36NWyU6rc+nRdq3G3ChGBstGKIZnFUSGEvOddFL3KDe3oJa6TqQb0NgGU1JuLNZPosaexWYr0Eojre9tRVqtYZ3F3r1idcexxJGPmcr9/PFuWkMNKyxbREfHhKMe1Sd8nPp/TnSdL0Q1qLG4W6PoIVP3M2P1lvHBqgvKU7bdp8Kya1Ap56auOFX+xbws0Q1Skhh7mo8L5jvNFbXOYhrKWHQ/qu5QiMSm6i5h9TMqyR5z97X5u7JPm581pi4IqO+rFvMt088b/Uvd98f2u3gNzNS+FNlPSp+cwfals1akzMVjlYRXw0TOkQnS2czpQprxCekRNifSHBJGxQhgYMdaXH9bE6wefu1aUoOta/8ef3dtOaoeqEbN+nWoKNT/GOEowfVXAANtPbHTmL8MpWn92PlSjz4iIgNud5r+OszuysU8OfKO60F7jyf80u7GsgfXQYLWcSMDGPBazLWMb3quOfSy4L61KMvSl9vfM/P50NnT3XCn62909iVVqMiXU4qJ3Sm/EbXqB9BzKDw9p8uJ0J/ssn3M283vg28mT7e32eFKV1O3Y7ZT/x0D37A/7hPnM66YBwkogN5mtAyFRgGdDWjuGV/fdvts/ZVuuAUtB2O3h928XLI+nIaZ8R/YjJVFy7C5T94UVqNlezVKota/Ypd1HrsMzjQZr7+OSNa2CZFlqrlnk5QAg/xqNDxWjtzQ5JzI/XZZeF1FyHca9/Qk6Wn+sn++uhlb1TbIK8P1ObIOsq5HxfLYZQl5cxO2tlntyVaSM4f+Xetwfe5szMpdje1dE/y2bbaUGf21SSCQnHkJlROH/I7+bowtTY5/+msDpzMNplJ8Ekxelu1yHHeq/caehgzzpg764B3RXxsl6fjmzCnBslWliNkF4cbK20pN+4tML38l1iw3jSxciYpF7qhldOYswIJM/U1IAC27OuBVx7iAD91tHeHRMj9btzRjIKZI2JGRO0/mQvHA45temQn0NmDz8wP6uzD70gqUWxwf4FqAintK9DdipBlrVtSgZVh/r8Qctz3wx5k18zb3eH0IzOQYT0SUCHUuMcVFYRJ7GgMyA3/XVlQuXYsWq2NUdjlqH6vA//F/lKLi/mpUP1yDquXho/M4F0oWuhE42Ipu8zTspShbcAF+8+pOePVREe7LJUY0HlflfDgvN3oe2zskxgpN046CW2tQmRUarZO4qc9jEeH40fFiA0JnmsXVqFqon+WCfrTPeD7CkhV/TisGmCqpF2ZYxEUxMbusycCIqb4g350dCeiScf52yLrWX465KDZOgl3FNKaxrgqsXZ5r8VlZPlMg031wYHx7Bb1oergS2yN1HMVWgrptNSjV642uqyTujopbBtDyagu8cc7xk7FnFmBBtrwIdqB5rx4vB9vQ8LbMV/idrP/Z0eVO/ebb3fAb96HhVmx+vE1/o9hRdl8FiiJlT+rMZbJPllpsX2PMouLB0hUrUWoR/hTdthILzIFgusREdxliIkXWWcX3FsBlnOf0eSi5KnqLeN9uRre5inAqtvtUqfyJaSZD+3ShaaTss27TvhM42IEBfV9NauyptsNthozISAt27jcdwWS+XXP012MGMHDEVHiH5bij7wMld4TrtoFBqcfuDY8bkz4XuaGcQoQdaZfn6vu0rq9VpiXTt9nhXjjdvNH/ia/96d2x43Hbk5vH8xAGdlcBcvV90zPdHZIoyZiIP9sFAxi1OtkEWtG4ZTO2P78dW3+6GZsffQSPPLwWq0vcuOw7m6MTjSG5KN+4W4LWKhQYzxHqwB6d1wEyJfB0uVH68FbUFI8fpHOX12Dn81XI9bWiuUsfOUYFqzGnT9O8B9DRNjAWfKgEUUlO+HWIBC+1W1rDiRyDQF8TGkInkCKsXDx+kg4MJmc+QmxpcJrOnSVLS5ARO6nQCSk6WSNBrUwr6rQhn4n5akAC32SdW+T3zdMPjEhZ0V+b2bNLsbJYfzMmA2lphqmkuWSMkR8DQ77o5dJZrRbF+/YjWHb1GjSpM25OJXa+WjMeSJrMdqTFTMduldlN1raRylnbT9diU2/oD2Ocl8+F2xDcOnOWYWVUkOHF9rvWoakvCRsv4EHLS+GLSkXly8L7os2FBUuXWSRKFQnY940H9NNRsL4VniMe9EuFcPR46C6r8X893dj5ZBVKTOs3pHcrVl4xDyt/2hG9r0RIcGyuoEYE/D7r41ZccY5zIXFKtSlAPpUSLsvqUzHzLctucWBI5vHNfmkB5pp/t7jSMpmgzgkFRVGXSNXCxFbmZfqjptn2H/aELzYGvOgx1E+821bisovmYvWj29Hc6R0rz/bsMlTeWYqSFWuxMurElKBAD7bepx9vxriw8tbrYy4whEll4qqS6AvAfZux6VVDpXm26Yt+P6yvEcg6MV31CQz74x6DiYiSxuL4G+ZF6/NSJ5C6wXZVN3hiEx750TqsLV8A9xWrsX1Q/9gYOwpur0NrWwMq8gzHPoml0mIyxm7kujOQu2ITtt493lzBXliO2uatqPjrfrS8aU5/25GRmaHOfFFGpW5j5N0/nuCCcy5KI0n1ED+aHtuKDnOGx9+Dxh2qtmNH2QpDTDjSk5z5UJJdN1BzkGAMMGUyXauww3LKhvggROLjsXlIwvnbLjGRsXqhhBr7xCy7bG7TCnYtLo1NGIfIOfc8/aUuINsvMj/eN2uwdptpu2fmItdlmJH0BShfGn2BqeeJSqyLKS8JcsxD6dKopjshGemGZXI4Yy6aeQa98OmvFX9fC1qM+2Z6GSqujl4J9swSlF2tv5mI0425UReyhL0Ua6yS3Gq/uKoouvGRxPazVVk2Co7GllGvJ+YCxqnY7lMm+7TLtD2sGg/ZXQtQYk44S1zephLTSY895e+Llhm2g1+OYe1R+ZBAXzOa9utvxsjx/oCxjij13MfXYrMqS/lVqFoSbkDj2d8M42WeEJfU+S3n1agHrQejGy5OOW/081tw8aBhGr2bcf2ls7Hgns1oertnvK7ilPrmPeUoWVSBCn2+iU41JuLPdqYgcZwXTT9eg5XlK7H6rjVY88N1WPcjCY7fNgcTThTdXoudh9rRcH8JjPFIiJwcx1pBRKikkjpppheheo8PvgEPfKMaul+sDrUqCIx4Yq94ykk7NlHjl8/qr3UDbW3jLSucBVgmgYGR95kaNPYalzmAnjd3hlu8FF6PkuzxeU3afCgBDzxRq84Jp1VLXJ3dqlWCWcx86P+eCo4CVL3pQeuTlSgtLkLJ8kqpODWiKt+wPo/GBjbew7GtkHzDpvUeCtj8GNi1CVW3rUOL+kJeFXa/XYdS6+xymAR2ZpYtHJK2bXwY2G9xieqqAlMrKbcEAqbAeqQVrYfMa2LqAr1N2LpLXkhQXGEIil1Xl2OlalVjoeOVFvSYyq8lc+CsS5Ng15nugjvbNbZvjP2rWs/I8WH3QDfqlppqmyED2H5XCSp3RLf6CFH72kX6a7M48xKXBMHx127ibdz9U74AkCSJluUJltIsmce32BZZQNF3SqMuQBmZKyX2tIzY37WnxV6IUecrtdwyn7Gt/qTi8sOVuL7AjXnfWo1HdkgA7shFxZad2L29Ku4Fu4moixVNb+tvIjKvR9lV8Q88qsyH736JCKB5Rws8oUW2wykViqjSO+KzvhAl6zQjK/p3Aj62iCeik0E/1lro2bYOa6RusFLVDe5Zi3UPP4JNz7fFnE9ciypRv2cgFBdaHX9jLiar84gaZXOh9PFujHr64fFpGN3fgFBr9IAcK2NiFXvs3WsqiXZUfx3R2Yr2Yf28oxonLDc1TujdjNpd0XGIv6sRTerOS9sClBYZkuzJmg8l6XUDw7STzZYBd6753CfzakpihpliFolhxk77STh/B9T0TOVTjYsh4zxD0fXW2Q6LFtQ66wYOSgC+3naJWE2uKIDbuCw2J+YuKjG12vaidf80G7zI9Eo2tqP/jVpULC5C0aJyVG3Zja2rxuMI1UjKfDd0wDNguNMuAE9HW3QDupwF0fOtqDvJ19eiSH8bERNzyPZzmsqhffFKlGTGWXej/qiLAioHEHNTjS0NGZmmsqXiPVOsePK3+zSoO9bNk7Oo/4YubJnjXtUCXYLF5MeecmTJlrq54QKK99UGtI6tIikjbc1oNt69qet4u31sGhhqwdZtqiS5UblxHUpDLcxlfoejtnBYJNdjdNTcmMSPNtk3ohsuTjFv9DcXw55uztwH0PbEGiwrmQv3VddjzU/UXTdOFN3bgN1v1KPSqpEQ0SnARPzZTgWK+kszV14BigolyMh0o6BQAoD5MiwsQ8Xdlah8qA6NLRIcHFHJ1yqUGhLY0SSwdpkOeHKAHT84ywk9yxV1Ug7INGMO6bYABt5uwPYdTdj+xCN45EePYN3GRvSYA4ShAXjGAmQ7CsoqTEFFG9aub8JA5HsBqSS8qa7julDxcAUKDMFF8uZDSDBl1dWFFZUgG4iKH8LrK2oNj1i0onS5LW8bnY5Rvz+mUuV0uWA+1UWxu1B0ex12vtSA2jtL4ezdjk0/XI1lRZdh9qxZyPjWppggNpTUNK+7mFDJg5YHS3BZ6VpDayu7nKj1l/HIdM2ryO8x3S6rJGvbSMDoMd/CJ/wSeESTMh9TC/GiZ9Dq1ugpCPrR+vTmcKuEQAseWV6CBUXzMM89C7PmfBObVIXSyr5GtA5O/ssq2LcyIAHRpMlBZy4qtzSi2tz6I8SP7Q/LfMdkhWeHkvyWVIA+BapSYmpzEWYvQelV8X5D/9fIcNtoovwHNuH6NNkGJZvRM90NnGhZlvXiM8+fVJ4zLLoSSOrxTSoeMQmCeGVC5tEj827kzJR9UH9tFLN8kQsqUkEv/Z7pducx6uLqVqz7zlykXbEM67bFueNiUjKdl7bGdrNwRRFyJ0rqW7UWOyiVYH19zXaa7m4Y6ZFjikXBkMpumnw2ymBP9HonIkqJ2ITXmMwCFMwvQG6WG7n5Uk9QdYPiEpTdLnWDe2tQ/0or2gd88LxRh4piV/TxbozETummFuRyzDO2lLVLTGusPqj4y2ORKPJ17cTW55vQ9IxqnS/nrfWb0WRumR/sQY/hOOssWomVxjtm5Xjf9MNNaDYkpgbebgnFrLmyTMtMjXSSNR9JrxtMIQaYDtWVXzQf/DGVkQD8h00BnbF+kozzt1UMeMRrztvKss+Wc26Cyx7wY+Bw9ATsY+VRlin6ikmYLLt5P3HOMd/9K3FyrynZOCWqNXMV6puasHV9BRbYOrB1w1qsLp2HjPNmYbZ7GbabZy3qtyTmOhRd+3IX5CJjrB4+zi4x92zT+Ni1J+UuXiMZCz7VpZ7+OiTdqqW0fCJm/cReYDj5230a5Lsx60cqrFbrETEXsfyhCwi/SkHsqVqElxkbJ3qb0dyhF5zAAJqfD99NHePN7WhRrfSFt6MFLfIV+/IarFsYOTirmN5i3whK3X3HdjS9tD3cq8KP1qFmW3tMbsHTF333xpTzRnIMXfCdldF3Axj4O5ux+b7rcdml87DyR00w9JhLdMoxEX+2U1duLU7Gqg+3dTta0bq/Hf2H+9G+X163ydDSiPrH61C3vhJlCwssuzGYjDPDbf2bOqskcCixeMdqrPzOMqy8Zx3WPbwOjzwhB1TzicovQaHhfBrqMmWR/kYXkBNcs94qPtDbjK1vqldzUXB59IE/mfMRCo6jzvN+9AyagpOIEfPvSgAoE4v6rFWQkKH3EZkM6qSnv4zIuNTi6raBuq3tkTu+icsyLsO8kuux+j5ZP49uRdMEXZ+YAz4lZlzfdjzyVKQ/SV3XI1j3/CT9qttjWxWNqpYTFoFdUraNbJMMi/vwPH2e2AA8JmpUq9wqUJsCCaTa2iLBtlQiO9vQtq8DHeaKYIw2bH11sj7qZd4kQLeav4meHRDFtQDLFpvuBIjok4q7HuiNk2Ar5v5E3ZHYW1bjkyBxsAcWYSKQVYC5Vscw2V6WLd+HB6bY16pshzcb0KwKjcxz1DFhKhItyyJmH3VKpcfieR9JPb7Jb5r325gWLWNkn/GaLovItGJWjWr5ZB4pyxFePnvoltSamO6wTHqb8Mj35iG37JGxisSUWFT6XFkZE1+QVJUwc2JFtXrXV5g9zXzRwQfPUat5k/I/x1QZidd6nogomWzWz0lRx6Xyx5rR3taO7oF+dHe0h+sGe3aj8UmpGzxWjYolRSjIMh27EqES7xMlpSX+8sQc//xoenA1Vpcvw7LbVOt8OW/92KqP4FH4ja3TnblYttyUuhlqwNZI39v+DjQ8p+JOOdcUuKNbOCdzPpJdNxCJxgBTpmLcS2Nb5MbESrJMA32mZjfeJjTuj8z9zM/fdrtFfUTmI3a9jWLU1IhEzZtF+135vjpP6691/rERqgGNRWvkodiL41bdmjgd09gfIvw92P7wSiy4PANzi76JZXdI+VJ3qEeemWPFuG4CPgx0RW8PtU5i15WIiXmkjJk/q5LcpvhuojsJAn5vdLm1WD9KTPctUt7SYn7nZG/36ZDls2ikH0PWY1pM/UP1Vz8bn4vZDjOPPVXCel7ZyqjuaRqe2hm6u9Xf1STHPhmVXorqu03HxWA7WlS/XUHVLVkDBmQey5aXjPfxr7an1AliHNiENbetxDL5zVCvCqE7pzpitlUid3pOljey51WgxtCdmSU5pm9/eBnmXrUSm/fNZPsSJQ8T8Wc7OXBbUkmQSQ6MiVJBiZFfTgwTdu+gTib6SyNnjt7yRoaSJeWoWFoy9r6oMDd8m2nRAhQYrxg7JNi+szw6iA62YPPTrfDLfHk6WvRuaUqwwHxbXTLnQ04g5kRVzK1rEfK70SGbvHea5kWCE/P0Qg+SnOBENRWqVZJ59uI9oEsJdG7GykXXY91TLeN3G8iaKFlVjbrmdnhGNYwejL3l0TknNqiym1uMxtGycbPhtrpYoxIYxJzwpSJjHpe0bWPPQMHCBaGxRv63pdJq0Xoqmhu5l08YYk0q4G1Hu0q6O0pR07RbKsZSOe7ohudouL927bgHO2+3vq2x48XmxLqnsWBXyVH99WScbvPD2SIG0GNqkWK1XcZM5dik9nNjh6QGuUuuN93KGSGBpdVvBHrQPjSFAE5+23dYf5ja5XMnTjJMIPGyHHtcsLwNWEnm8U0qUOZGcar+ZFku5NwyaroiEbMciuqmIGZ9GeZZ3aL6Zj8a743XDmac99V1WP2YOubrIxIUOB47ZzF9m1qI+YRUpLvVMSDox0BHj6ky6JUKokXiJeBBR4/pACfTsWw9T0SUbJbnX5WYSyTLNBk5jqkEjv4uROoGE9Y7ZH4sj76uXBREzlGLylCxqhQlkfeq5b46VzkXoORy47edKPheJUqjltGPpse3h2Ih1TVES6RbGvNdc8mcD5lWUuLPiKnEAFNmR1r2XNM8yDY0Zx2DPnjG+rIY5zd+bobnb3V3gDnmsC4/Fkljh4zTX0eRmMOcyBzvZ9yOjKLrY1vdDrZIOZk8JnTnmh7km6jhNjxSvgArf7QdbYaLOu5FFah5eje6fRLb+1pRHXV3h0gzNsySfda8y8abF4v4xmeK10IxnCnJPVHXLpZJ2hhSjmMuFsk403ye/O0+DWpeTPOjuk6J2S9lP/HF7Cfh9ZD02FMX6p7G8DDhwKuqYaLEoHoXvfaFK7FsSYnUSI3kuPjMTvR4B9B+UJX1XMyLqjjJr1rOmx3u/MjxrwilKypQtmj8fUF++Fdyr54Xc3fGlPNGdhdKH2tH93MVpnm30Lcda+7ejI5p1nmJkomJ+LOc6ts35upyiBce88l3mmK6tLDqK81gtmViz4WVj7WEW97IsPuVBtS/2IitD16PNG+bHFDdWPlkKzzNVcg1nVBdC9egwhSk9Dy/Ha2DA2h5qSX0PnexnHhM30vqfFicQMzdM0QEPD2mh+HGJgXVw2ligjrL7Tg9VsnwuIGWBIqb7lxjugXXifLtsn6eq0Hl4oLQswPsTndMv5BRDxyKkBN69C+5ULG9G/2vVEafYAc3Y+2W2H5JI2K6gFCsTuRJ2zZ25C6tQoX51kBvy/jtf4pKxh2KbhFsX2zxRP2pkGl2PL0JTRJw2RetRIUEUkXFEuzk544nf1W/qLetiX5oUkRno1QmJt7f43UFFL/ls5lUEOMm7b1oVg/V0d+FyHr1xdQedAH/xEGZkXqw2ttWifgCrCzLNVUqDSynPyoBsv4yERJoD3jDS6X6+57upZaEy7JN9S+rv46wqpiL5B7fVGVcfx0i056oWJjnx+IOkRDTMjovzYheFrsbZRJ8jx5uRf3dRXHKVtiAuhMqgS6YjJwXxZaOSe8AkXmOqRQ6cjFXXeiV7VOwvBKlxosYoufQ+APqxsiyld5WZqpUqAtW8Y54RERJouKwODGlZ3jiGD5RMXUDeT/hxdLQQx711wa5t28dO2e1vtGI+ud2ovGna7Bg9gDa+uTvdzag/VAjyk1daNqzrkflKtMxfl8DGjvlOPtmY7iRztXqAY+mM0sy58NieWdSN5hKDDAdqmVq9DlJtpm5PEh8Ftt1j3zG3Hp/JufvOHdzx8aFsTFkIPLQdzO/bPeYroT0f4Uzvxxrl5tjgh40vxkdu/oGBqK7QkxX3yuYcPksBSUu3lCBdbuiy4P77p1ob65H9a0l4YYkdhfcl4b/FqHuJh3b5io+MyUdQzGlVZnwe63XTRTrxH7CyyfxXkLxuysj9gLSKdjuU2cq58KyqxvZLrHPmkiDc/b5yY89I9SDqhcZG2S1YevTW7H5ab2L3ltLkXv5AhSZ2mwF2lSXWzXY3CVv1PP0TA0XY7usEqpR2Kv68VCGndvr0djUgJrvuOHv7IA/rRR1b/SjfUNRTD5jqnmjEFnHuavq0X+0H7sfr0CuVfmOONCAhj0TtOQjOkmYiD/b2e1JaikxBaol5wQnObvT6vYrCeyirqoH0PFoCeZ+e50EZ/Kutxmb7lgAd/nW6IekKs4CVNxXGh0keBuw6fHN2Pyq+nAuVn67ICYhl9T5sMvJ1fQDvmHr1j+x42TOzScUhwTDhqvayoy7NjGwz3Gb+jgMJ9aspj+wqxY1+/Q3ETkVWLPYdF3akWF6+KJMUyoM5mkGVOsG/XWIfQFKinLhXliBClMf4x2P1qAh6uG74+wW/TT6JUCOCcSSuW0yJfB43HTBAAPY/MMaNKlKhL8Dm8sLcP1TxgCgAOseXoncmWw8bwu2Pq+qaBJI3V46fsugiTOvDBWWtwN3oLktfhdCqpzHvZVVmSjgMbJYp2NUaynT3+MmcyWQn+gYYhQYakWLCh5N7IsrUBbvgT0S0Fnfli/7/1AirXvCAkMt2B46xsiWudTigaQJSrgs22Yjw9TFVryVmMzjWyBg3SLJklQ+vEf01xFW62VEKkem2/pj7r6QaQ28KZWIba3Aos3oPiIB+EZz8lo32Ib2KbUmV63/TF0SCL8cGyauRErZNP9MvuEOAlW2TJskdMeDxTTtNvMFmED8i1NEREkjdYMp9AOdFEE/fOYEjIHqlsLcdbBijtf8b67FvIKV2PS2xFnDHWj60Up5vxpN5m5iVOOEu9ahKOr804PNGzej9snQ03ZQsjT2oeNJnY9k1w2mEANMi8PctZrMb8wFFXNf9mExn5vB+dsu9YkM0wVteK26Dpwd27pZzrdW7cxCD/20WO9j1IWDDZtRZvrdjvVVqFXbOOhFy4++iXnfa4qKlUvXr0OpuYFOAgK9Daj5SfSlF6AIlbeVRCcuZZunZUYvY1SsZHOqnHYUT5/E+zHLKttjT7hltFFMNysWiX0V11iTzx4xXVhSnzWX26CUGfMdgBYXvE7Jdp8qWT7zLueX346JG2W7uGP2VXeou8yUxJ6K/GZu0Tz9TVjHE+uwVd39U7gGFVc7Yc8qwZpVpr3Q3yz11GapIUgd84flKDDOnIppzd0oKuruBeMKD8ix9TuX4Zv3bUePzOjA25ux5luXoeTR2O5qYkySN4rwdzVj8xPb0eEoQ8OAD91N1Sgxl5eQHqkXynFWf0d0qjARf7aTA5v1gUhOJOYT5TTFtKSWk6bFXYtjnAXLUG6+zU7msqPD0M/ckBxsHw+HC+5Vtai7vyQUdARe2oStnebWJKo/wnVYF5XEDaDlic16tzQrLR82m9z5iF2fqj88q9Vg1Q1FzLaQk6m5dXmaRFrqcwGvBPxPbcIjj25Fc5d5XSRIgu3oW8Xkvf5UcnWi2/qTR/DIT5vQ4fWH+ns2z2/RHRXRJ2pFgqroAEoFK7HJupiErwSUoYtFjgJUrDcluQOy/p/rGN8eBnbLRGDsdg7NR5K2jX/vIygr2xx6wFeUrs1Y5p6NWWnzsGbHeLDpWlKL3YdbUT3fIohJWLgys1W16MgPB1JxOXKx8h5TV026lu3qqfL6GysxEV6YM82itXYcE3U75MyIbaETN/DydqNneKKZHefvaY/dHrYi1Ex08cOqVVmIlBWrlh9W1MNzn9w09sClhB5qG0fCZVkC4sh+OsaZEbojRSW2257fjE0/lmPT2wOwX5HE45tUzBJq4RQi2830WauLiOp25gn7Xg0MoOmOubjsW6ux9sG1WP3tebgsdw16Fm7G7raGmLugpOqJgcOJX0RRnBlzYy6AqAeDTdhqMyDzbWoNWPKdUrgjCyiVZnP9MG4lUI7D0R+V5Z9mGSIimop4Z9iYeHSaYuoGQc/Ed+K6FmDl0tju9bwdPeN9tst5oVFi+9A5v7ASdY9VokDN79BW1O6IfRaOM78C6+6MTjr5X92E7SoxZS9B2SJ37Jk2qfOR7LpB4jHAdM4l6s5WlzmxpRKrBt6DLWiNSYyazPT8rZKd5mVXy2Mep7aeeQOqeEV/GSXgt2ioM/71gMRD65auDN15GiXYhkdKMjDrvAx88+GW8fgpuxz1+33YeWduzCwkQj1Q31y3sS9dg7Ic09QstnnoTtXIulCJetOVo8Bhi3p4wIPWt81peCk+5pYDsv5iuoeJR9ZnTGwo8xYT0aq7KMwLK78T4xRs9ylT04pZtxbLIvtj69hzE3SFJSiQnTUlsWeIlJWCBZYPNi36Tpl+p6sTuYtKEXuEE5lSb1hovlRmR+6SlTFdz6pkd8fA+PL527Zi8y71yomy9XWo0Y+hbY9tDj0A1miqeSO1wnueWgb3FddjzYPrsPa26zHv0lzUjKxEQ9tu1K2IXRrPwPSOgUTJxET8WU+ObJYHIg+8U8tZxCEnFHNQqFo8T3RAdebi+qWxHWgMHGgfO/mrVtMDkRNO0I555ZVYGTrO+qIfhBThLELFgxWWCciicjn5WP0hmfMhQYK5a494lRkVQEV/NHz7WtQqU4GXO3amA6rF9fJ54Yf5/HA1rr96JTbHXJiYnGp14LY4Cwd6t2Jlkf4g1ruWYd5N/wOv7DUHbk7MzY5NuAa6mtAQ1XLebtHvvFRAzIl4eR8JPlwLq1C9JPo7Perp8lZdTsjHzFNX0V/MuCRtG/++TVi2aB3a1Lw6pLxtbMDOVxpQs0oCqxx9W7lyUbSkAtUb67HzoFQ6X6mKucVvymSbb30s/LT7Igm6zF0zmblUH4AW2xadreiY4IGWqkWHlZiAKa5AqBWOdWl0o+Tq2Aqv6jrLWg/aDyVQrr3NqHl4u+lBrXaUbtmKyhld/Jic99W1WPnoeGsmb2+P9W2xiZAVE7OWrcqyjHFeatGeLOhHy/rrsaB8TbjSW7IAFbvOxaJkHd/UPqq/HKNaGVlRlSFzMTNV5ENl5WCrbOVodvv4A4MHdsj6fcZ0iWW4BS2HpDTNlwpwWztqFxmnq45ppnPRZJzO2MpQ507r440uMNSBVmOLR1cFqmQ9j82JxW3kqr9/K/Z0t+kuIvlsnCQNEVHyyFEmziHcb27hOi12zE43X2iU80qc3wyxuTBvyfWxCaIuOVeMnaf88I49byYAe1EFKheHj75+q+yhzYmSe6pRaj4FCXXX3DKLRjpJnY9k1w2mEgM8P9lD+i043ZhnTpJHJUzl3N3Vbvlw/IChe4mknL/N6ylm/YTFNPhR37OKxSxaYI91p+NtwTrZ5ptCd1e6UHJ3LRqbd6L+gTKUFOqxq82NgoVlqHyoFg1vdMPX0zCDLifVeuyIiYHc2e7YZwgMt6NhR/S6DD1/S38danmda4r1+rphyJGGqDs4m/fEloiYh6hKbBfTIl7KQOw3w2KeISBxvbmMB4ba0darv4lwxDbOCTmZ2306ZFox1SIJes3TC6gucUx36ZR+ryx8B04qYk+dPbsEJTEXutxYUJgx9lnnFaVy7NPfGDgXlWCuRZG2Z8nnY+629qO1c7yhXmBY6ryhV3YEZF8pu3NluGGdusAYtV2mnjcKdG1GxR1NpnqIFy1tnlAL/8rnOrD7/ujLDxkzuEuZKFmYiD/LqQPjgGXLBXUL/LRPQ1EC5gc7qSvf5lsUozhRUF6JEvMBcn8L2vREoT37elTprVgGnl+LdU82hq+o2uaiIPry7xjXVaUxffOqbkGut0gAhiVxPuRE75qjv9Z532xBt0V9ZnTEH5PUUn3DRbG7UbQk3Do1wtPXg4E9W7F5rz5C8Tej5sn2ia+iW0lfgNLFxmqGFz29PWjdsRnNxvLyy5/gjY8/r7+JkADSXJtSt2w+vTXmlsdIUOQf7EGPuu1UgjnPIXPoaSDLff2tK6MrQL1bse6xFnjNyyjvY0qZT9at+XPJ2DaBHjRI5aZF/8GSjVtRd385SpeUo/q53Wjv8UE76kH3S1uxdUsdau6vQGleTDVuGlRr+DpsVZWDzEqsuzWBfiid81AWtW11I03Yumsgdp0parvoDx01mz1J4n/MyACat4efyRCjuAIrzd3EqItNuRYVyhCp5HolMNPfWVJl7qkabDYF965bG7B11WQtlCRottxn/BgYnOR3hfftTai4bWt0ZfSgVKosj7UJSLQsy1K5F5ZGt0wZkn2rtxlbnzHuV15s3/gK7EuSdXyTbRW1QgPoGZykP8so5k/K9K5YEPM8g4CcO8KfDMDbY5VEcCP3Un1GVJdkD1QapuFCxpxJ944o9pwK1D9dZiorbWhUrQn1d2YBz4Chf1g7Sh9WF9v0t4pqnWZqEq8efmiZf5J9wNxFkm+6ZYiIKFFyrB27CGvii0mcTE9sd3d+iafiHVnDXFdXoCJffxMx0jr+HB5HLsp/qN/1d0BiQ4nFmvaraUo8f8V4osnIninx7kL9jcGCRQVxH7CZtPlIdt1Appx4DNCAHovfmZDE4CXfik5odbzdOnY3ZaCvAevWh7v1MfMMRe4KTNL521wGR7zwmbN1Ko7MMMW7si7arBKasn7Nrbf9UkceDfrRtmUNNnWGxzlXbEbDY1USR5eiYkMjdu/vx+hxH/r3S2z5+GbUrq9C+aLcuGUnMXbY08cbHkTEdlskdYBdMj+mPs7Hct/DA+jpC4RaLJcYJ+ZvQUvowZu6kR5svWcNmizKQ2xjm9lwmurS3r6BKdwVKTNn+qw9cx6KzMlhlXy1mqZ5XMq2u/5mGmLme45sS1N58B9qQ7fxc84yrFwUPjakJPaMcMg+XGSqbzkKMM/YTY6rROow5nbzLixbssC661M53pXdURY+3hn0vNEylmNyLVqDtaGeCbxofnAdNj0vf1Nv8+bB3K5wqnmjwGHz8zPC3JfryXabCyX3rEOFoUhkuGL3L6KTjYn4s1oAno6W2ORoiPxNnfD1d9OmHlY4GJWOknEDEuBPPGV7zkrUrDfd6DTShKr1TeGATw6qoSdkN9ej5u5S+J7ZHjqg2xeVx29hLCeWlctNJ+bCUpRYtXjRJW8+YpMvKnll+QAli6v7gZgmpHISKVqGEkOSxt8mgZUKiEPvJBjXb18cT15Ngc0Z0+Kn/W2Z/p7IqU4C5lAgdgy2jLmm+Q2gfUcT2sYqcRIoPl+FlT+NbrEhcxwuY0NNqLxqLubKdJY98iLebDV/LpprUSXWmq6896g+7rqil9I/0G0ISnQXOS2C45lvG9USoWW/PkK03FWCeVctwIKiebhszizMmiXDRRmYW7QAcy+dHXqfdvVqPPJ8W5wLYQka7sDWjeEW364lpVgQc6HJgmxb9ZR6Ky33rcTabR3WF24sg1I7XOnxu5sZJ2Xg1RrUmp8loGRVoOGpKhTEJPRlXTviB0oTXihUtz3/cCVWPhxdIXQtr0PzxrLwbdrxBLzo2KUe2Ka/N+lp64h/+7xU2Hp2rENZ6Vo0mys03nZ0TNCaZSKJl2VZa+aWKYOtclxoGdsfnTn6xQ2puJy4PDnHN78Ewe2mRRs42GNdjqSCZG4BGHMXjFDTjDkSGKZnj2kW5kbF041YZ7jTwX6RoVWNxQOmJifH0VVbsdO0jtpUN05W+62qzD66eewCjHNJLWpjLvqoch09xumYrW5wiKW6sTHtF9bPLiAiSp6AOm+YW6jq/N5pxJQxAvAPmpNKEidMdqHbWYQ1G6tMF2m92PrDGjSHDrxyzF6xFT37G1H3UCXmHdwcHu+S86L5CYQR9lyUrjIlvVS3NHEb6YikzUfy6wZTiQGmvh3tyMifF90YRp2XQ+fmgMQ/W6Mb6xiE+rjWX8/0/B1qTRw50UbYnUiTdWRmd5rPrrIerdavxCYxZIYDI6rLlvE0n//5ZSi4al4ovp+nupxU8f15abisYAHmXZGB2er9pd/Emp+o7junv6ekuefFNEbw7mnAzt7x4DLQuRWrY1oCq4S9R+Z7AFu/dxnmXp6BBY98hNL/01jOvGh+M9JIS223GtTssp5X9WB/o4C/Gx3m5y4dkngtznaPaZku8V7M/bVWD0y1cFK3u/5yytTdAebY91AHeqLuOPZjQOrrxkUpWV+DsqzIvKQi9tRJXL9gVYWhbNlR+ngtyqKS9vL7hQui9/OF61Bl1YhL514qZch0xzr2rpM6pX7RTY6Z1W/3Y/fTNahaZUfjM+HsU1GZ6U7u6eSNpD5kvt+14N5GNBi7hZJyMrb95fheelXMPQdEJ5+WIPXRKXyczgRH2rW6xfaxbWse3Hfv1nzH9c9qo5rvUL/mGdXfTko+39Oq7X6uUiuwmDYKK7SqByq1invrtN2H40z0aLfWsMoV892CO+u0nXtatdaWRq323lJNQsrw35wlWu1+n/5la6M99VqJLTKtXK2qZeLPhyRjPo62azX50d+Xs5JWtKJcK11UplU+tju0bn0dDVrVQqfpczJkl2u1zf2yVg2O+7Sdd7sNn3Np5Q9Va2XZhu/JULC+Nfp7ifLJPBcapuUs1aofKtcK7IZx8puVr3Vq9cst5jm9QCtdWqqVFEbm0a6VbmzQqsemqd43ag0PFIXfu5Zo/7wqV/+bcSjQqrZ3G8qipnleqdAkHIj+nKtIK3+gUetX67GnUasyzntkcBRpFfdXaZX312o7B/S1koRt89//f1Vajnl8ooOjQKt4untq20i2fXtTnVa1xFAu7W6tqLhEK1kkw8JSrWLDztC6iDaqeQ62ag336+s8zuBaVKFVP/xftX+uKNNKZJrlG9/Q3qgylrXxoeixied9dGC3Vrvc+rvILNfqD8bfB31vVMZuZ31wRR2fImT5Wuq1Sovt5FxSp7Vb/dRxj7bz/gJNgrWY70w6ONxaQWGBlpvt1nKz4h9LI0PRxvYp74tTKsu6/u3lmlS5xj6be3uNJgF09PcX1Wnd6mszPr6Nau3rC2K+Hzq+bt+ttbZ1a56j+kfFaE+dVmL+rJSDujfatX412VGP1r1/p1a3Inae1PGm5M5qrWZDtfZ/1fyz9nf6eDWvuw96otatr2enVr0oUg5kXt7w6H+ZBpmnxrujj03uVfXj5en4qNbfJse2pYZynl+ttR7R/x4x6tN8Pilvt5uWbX6NtvtQdOEclc/5PK1adY7hczLk3t2odZunS2esyHZNplRMk84icrzbbXlM14f8mqhz6ainX+s/kviZbfRwt9baXKdVZFlMW84vlQ/Iee32aq0hXjyv4p/HS2PO2fbiKq3hDTlnte3WGjZWaiWuyN8kNp4sxlJxoOE8m9C5OhnzkYq6gZhSDDBVpnUVWq4tO7XGJyu13Mg4iU/Kl5jivnSpQzxeq1XfXqb9XYZDu1AfP+Xzt9Rd62+1iildWund1VqVDPV79M/LNtodVU8KD65F5Vr54hKt7N768HlazrV1d1qUeZvE5xtrtVv/2jQ+4cGpldwbrpdMncRWj5VYTNOlFS0p00qLC8biY9eqOq3+zvHldK2oM2yPXK16j+xLnt3RsaRL4m+J8Ro3lI6VldxVlVppuuEzMtgXVml1Te1j8Xa8uLxk/U4p8+1atzFRIPXI6jzzZ3O1yud2a+2q7i+xk6qTqHmwisHdSyq1mg01WvVGqc8MneTtviW8703ZaL9Wt9A0PTVklml1Mn9qkioXUeow/K24Rmu1OtwlK/Y0O7Jbq8jUP+8s0xoG9PFGPok/DduuYMPkx8TRgZ1apSlmBdxa+WON2m4pG61Sb61eblie+dXa7rFdewZ5I1meSj334ZTy2tDSrfmMH5FjRsO94/Xeog2tWpyzC1FckfITz68OHbYcJsJE/FnC09ao1T1Wo9Wsl5PVraVa0fwCzR2VUI03ODX32EnZrpU9169PcWK+PdXjAdlkQ161dYIsRE4yTdVaidPie4bBtaQmfkLfSJ0gF+nfkxNf/N81m+Z8qJNki1Q45lsE0MbBVqLVtezUqkxJ9KjBLp85aFrGw1YnPcPgqtB2TnwMmJBvT41WZDVdfbAvrQ8HmIcbx0/qcQb7Ygn6j8o099dGByChYbZ2btR7i0ECIxVMevbUauXzrYIxfTj/Qu18q/GmwVXxkvbum0naNuf/nVZkCl6nOrhvnTxY97XJ/C6aYNmNQ3q51qhve/W9ykW500s2q+HiXO3rf2sxXgbnIhUcVcuxRR1fDMNDVVrFkiLNPXbhK3pwL5V9JU5u1NezW6uXClvN7VYXZvQhXwVbu7Wd2+u0GgnOyhaNV0qiBleJVrV9vBIRI6ZSmcJBBcgJHXPkuPFGnVa1oiCqMh1vcN2+U/MYl0+Oc1bJ9fFBKraqYjZmGsc3lYR4UbbRvWVabpxtHBnsSxu07p4GrXySYwSyirSCSebBOLj/4RrtYuM4V65WEHNuc2qlj0+w/RMly9v62HiFdaLBuVAqF+bj7pFWrWYssRBnyKnSdksFytdRp5VZJakMg0uOF1HbnM5Ike2ZTKmYJn02qQvlDVvkOC7n7Oq7y7WSYjkGT3ac1gdX5vjxLOYcFI/ErJPFiuNDkVbXEz8o8h1s0ConO3dnl2t1bYmcdA0XlB2lWv0Ev2s2rflIdd1gyjHAVKh4oWL84rx5yCzXGg6Nap7m+A0p1PC5r+ZrFxnHTXL+Hu3ZqdWqeCORuqvUK9/4f3ZqNSsmi3udUq9tlXU10Xb4vLbgqvMtxk9hkHg1Xrw7IdmO9UsnaeThklhfNcbw7Naq58f+XTXGisQ/ox31WtnYhSHT5+5t1LqlLJdZxmBOrfzRzVrtQ5Va6SSxCTKl3nmoW6tbPFnZztVKYpL0EwznWIwzD0nd7rLM2xPLeUQZlWUvtppeeHBmuaLnLa9Cqzfvv0YzjT2tyDR33qkfH+JekBvVurdELgS5tMrmBI8X6kLuhrIJ932VTypRDecMjXRmmjcK5SuMdRG7S8stjD2fuW5tmOaFMTrbRcpQPFZJeDVMhIn4s4Fnp1Y+wyRhZCh9OrblhRVf23gC15mdq+XmqACrSCsqLtXK76wMJegKssPBhT3elWAjX7+2c0u1VrG4QHONHWidWu6iinBrkIQTEhJsP16mFRSWaTXTCUKnMh/HPVrjrfEDYVdOgVak1okaFldq9fvbtYbbJQjNKdJKb63SqkMJzWqtcmmJVpDj0pz5FaHg1kxdga6xCHjcy2slGJr52cazxyop5NJKH5KgzbgKfd1a48ZKrazQMC/ZJVrF/TVaQ6SVgk617qlericZ/zpX++rfRKY70SCBwCvtE67TqCEU1Ovr1zioFsxXlmr/eMOXrL8nw9S3zS3av/7b/xXTkmRqgwR9L04cqfdvLzMEcFLuFldoVQ+NJ79rn2zUdodaMe/WdndEWhhJEPeQKaFtCwcoJcsr9WWR7z4WroyHhnX/rF2X0DaZ4mDP1UrvrtN2m1pwG40eMrUUmebgWiHlX62DBI4No4fbtZ1PyvJvqNXqngu33DAGiGNk/29vUy3d5O+H+7Xu/fI6tL53ag2Py3q7v1IrX1GulS2OlDcpa8ZKj6owJXRhTLaZsUXiRGVZjmW1VomGo7I/3lsUWxmR40hdS3TrszFTOL55mqJb3E00OJfXa7u3lFr/zVjpk/JRFDnWSBlVy1yyolKrDF08Hl/ugny37KOlWs07g1r79ti7gMaGPDnOT+n8MDlfR2N066PIoPapheVa9XNxkv7qoulklU5VgZXyEapQTJJscEYugtIZLbI9kykV06TPoOP9Wv3i6OPKdAdnohcGVavcSOORdKkbSP2gQGKRovklElvJsX6VHOvl+B7+e2lsgtnsuE/rbqrVqlZILGY417oKS7WqJ1un1KJVHXdL84u08i1Tv3NtSvNxkuoG04oBEjaqdW+vNN0hCy13ac1YvcPXUhWVrHfK/IdiThWzbtkp9QfflM7fKrE/Nj0VH4TKjXkokHXydW3ZP/5/4scnmYZ4SuqkVS+2a61byrTcrFytZGkkpq7Wqm6Xsljo1pyuIm3NTzdrVcWT3/U40eC+1+ouzgSoROxzNRKXGZLLKpa+s1qrlXk3TnP0cKtWf29p+GKF3a0VLK2OaYw1qlqB3140lih15pVqlVt2h2PegTiJ+HP/i5Z7rsV4q0HimMbmGstWzXaXcR06ZRtG9gO75pZ9r2hxuVZ5Z7lWWhzZnkVa4eVzNFvkOyd5u1c1T+PqiVXjnqxSrWJ5ScxFpIL7d1rXNSxMO/aMw/NKeH8qeTz+3UKh+piqC6gLglO4OKmMDkhZXF+hlc53j5dbh6zrVTVao8Wd0MnIG3na6rXKRXGOrc4CreLxad7lQCQiZSkeqyS8GiYyS/1PJjop1QeakuDH6XSi+kt+cCUqftqGsa6N0wtQtqoClXdVhPpI93u9sKe7wv1nBbzo6RwI9R0X6stW9SOo+jtzuiFBn3Ufa9Pl98PvsO7r+MwXQMcTK1F6TxO8OWWoukteF2RgtlqPebIe9U8lS6if8jdbMGDLxYKFJSiYcn/IE/N3taD57Q6MZi1AydVFMQ9XiaEerGLqWzC+APx9HgRcbrj0vuIC3gF4ZBKBYW+43OrlD942NL3ULWUY8I2kITc3A2muXBRkO+F/rwF1O36HS6+/Ff/fqydax8neNgH0PCP70m3h/trHZJeGpl2S70baefq44z4MdHWgfU8jtu7oiOrb0b6kAd1N5XBPsD/4+3rgcbiRO2FH59ECQ21o2NGO2TnzUHBVAXLTE/juiBwHumQbHOlG29staO3yIyMvN/TgL09Q9XOdgdwsWed9siwDeo+PQT+8w7KpXE6kXToPRQW5cMt8zlYPQ7s6F84EfjYw1Iy1i6/HZr0PSnW8CUiZLiqUAjcygI5Ob7i/QbXNM52wp7kxr3Au3G55n+uGO69g8rJ5kgV6m7H56Rbg6kpULpmg31kjdRyW9e+3z/B4IeusTY4LrUOzUSDHhQVJOvYEepuw7uGtGJBzyTy3zKNss3myge1yvhkIOJGbnQZPZytaDtlRsrQEbrtfyn0PvKp/y/TwvhyeD/X8gE14ZJsHJQ/Xojxv+nPn72pG4x4PMlRfrfm5Ez8LYIYCoYegyd6u9sVpr9MAvHIsGFAHAZsdUvmIv28G/FIeesLHQpsT7hQvH50cqYitGa9TYlTcsgbL7lMP7QydVYULRVI3qLhjDVYWS7zll/Ot3RU+dwflWN3bAa86Xqn+yiN9IdvleCSxQVKPR3K88welbvCZfCbGya0bpCoGCJHzYIecBwMyRWemnAslJhujyouc39Q5355ZgIKx/q+tTX7+1s+XKr6Q8jZRPOnf+wiWLV2HlkAByu+txMqFc5F20eTfi8d/YJNMY210//f23NC0l0lsm3FRpD/yUfgOdaB1fyuanmlCT2S3UlwV2NlRj1LZrWZE1cklXkhqXdzAu3c7Gtp8yMhKw6js6/OWlKPA3oGtD9egaTgjFGfPLS5DyeWzZR5GMTAUQEaOxLWqDto2gIxFZSiS+qeqG/SoPvLl+JErdaBIPd/ftR21GxsRWFqLmqWJxMOnbrtPy0gHHlk4D+sO6O+VRXXof6US7uAAWrZtRbPfjRKJmUvyp74vJif2TJDU6Tp2bEVLcAFWriiyflDryZZg3ijglfL4aiv8Uv8sKjr96oV05pkstv5135D+KtrXsq2emhzGRDwR0Qx5334EK8sk+BvLqjtRKoFm3Z0lcE9QkQz0bcWygtXjwX2mBOr7kxCoExHRaY+JeCKi01dgsBnrVlyPTfv0EcK9qg4NGypCCee4RjqwafE8rN2rv0cuqttaUWN4IC19Bvk7sO7qeXjE8EBb+9IGDLxYfnoksoloWlKRiD9H/5eIiKZjcDsqo5LwQMH6ZjTcO3ESXrFnL8O6ewv0dyKFrVyIiIiIiCgBgR5svS06CW9fXIedWyonTsIrjgKsfLASxnY1syXGp8842cazTZs5EBjFqLp7iIjIgIl4IqIZULcJhrqWiHBVoOb2ogS7W5JoLTh+76prcSnmsbEMEREREdGpM+JBz4D+OiQXVQ+uRG6CXSbZEZD/dHlloa5g6TMu6MeosQsjYbfPBtjIiohMmIgnIpoB1fflAuNdR5luZCTar6m3BQ07esKv7SVYd1fJZ/R5CUREREREZwiHGwuuMrSOsWWEnnuUkMAAmrc16s+BcqL8wQoUsKHNZ1/AF36OhkHA41Fd+xMRRWEinohoJlwlqLivSH8jBtvRM6y/npAfbc/UYHOfeu1C+dP1qJjBgyqJiIiIiCgJ7G6U3lOJXP0tggPoOGTKssbh3bMZNc+HP5t7bwM2JfRgUjrTBbw96PbqbyKGPfD4/fD2taHlgHq4MRERE/FERDNkR8HtW1G/Su8JcrgJVbetwdZ91sFWYKgDzU+txbKr3FjwYJuMsaNkfQM2L2eQTkRERER0OnDOX4uGx0oRbsw+gM13VWDd8x3wW/X57R9A20ubsebbc+H+1iao+11dS+vQ8HApEm1IT2emwGALtv54DZYtWQtVs4vStwnfvDQNGZcvwDevKsG6XeZMPRGdjWZp8R79ajLZk2KJiM5qQT96nqnAgjua9FtRXShavgwlORmYDR8GejvQvr8VHYPG9LwdRQ/tRNPDJXyaPhHRWSYVsTXjdSKi5PLv24RlC9eiRQ/h3QvLUTp/LjJmj8I30IOOjla0dEYnWF1LatH0XBWK2CXNZ5wfbQ8uwIIf612NTqgINW3NqJ7PQkF0Jpkstv5135D+KtrXso39F0djIp6IKGkCGNixFsvKN6NjgifkuxZWYM2qcpQtWYDcdDaTISI6GzERT0R0Zgh0bUXF0tXYHupSMo6cUlR+byVWLi9FUTaTrWcHqfu9ugnrNjZiYM4ClBQVYF7+XGSkuZCbnwH0tqJxVwsG4EbJ0pV8aC/RGYiJeCKiM4G6PXVPC1rebkHr4GzkFuRKMFaAuXMy4M7LhSvRh7kSEdFnFhPxRERnkIAfPQf0+H6/B2l58+DOLUDB5RnIyJJYn33QEBF95jART0RERET0GcBEPBERERHR6SsViXg+rJWIiIiIiIiIiIiIKIWYiCciIiIiIiIiIiIiSiEm4omIiIiIiIiIiIiIUoiJeCIiIiIiIiIiIiKiFGIinoiIiIiIiIiIiIgohZiIJyIiIiIiIiIiIiJKISbiiYiIiIiIiIiIiIhSiIl4IiIiIiIiIiIiIqIUYiKeiIiIiIiIiIiIiCiFmIgnIiIiIiIiIiIiIkohJuKJiIiIiIiIiIiIiFKIiXgiIiIiIiIiIiIiohRiIp6IiIiIiIiIiIiIKIWYiCciIiIiIiIiIiIiSiEm4omIiIiIiIiIiIiIUoiJeCIiIiIiIiIiIiKiFGIinoiIiIiIiIiIiIgohZiIJyIiIiIiIiIiIiJKISbiiYiIiIiIiIiIiIhSiIl4IiIiIiIiIiIiIqIUYiKeiIiIiIiIiIiIiCiFmIgnIiIiIiIiIiIiIkohJuKJiIiIiIiIiIiIiFIo4UT8+eefH/r36NGjoX+JiIiIiGjqIvF0JL5OFsbrREREREQzl6p4PeFE/Ne//vXQv9u2bQv9S0REREREUxeJpyPxdbIwXiciIiIimrlUxesJJ+L/6Z/+KfRvZWUltmzZwpY2RERERERToOJnFUereFqJxNfJwnidiIiIiGj6Uh2vz9KE/npSa9euxaZNm/R3REREREQ0HVVVVaitrdXfJQ/jdSIiIiKimZssXv9135D+KtrXsjP1V7GmlIhXtm/fjn/7t3/Du+++i2PHjuljiYiIiIhoIqqPSXV7q2pZU15ero9NPsbrRERERERTN5V4/aQk4omIiIiIiIiIiIiIzlbTScQn3Ec8ERERERERERERERFNHRPxREREREREREREREQpxEQ8EREREREREREREVEKMRFPRERERERERERERJRCTMQTEREREREREREREaUQE/FERERERERERERERCnERDwRERERERERERERUQoxEU9ERERERERERERElEJMxBMRERERERERERERpRAT8UREREREREREREREKcREPBERERERERERERFRCjERT0RERERERERERESUQkzEExERERERERERERGlEBPxREREREREREREREQpxEQ8EREREREREREREVEKMRFPRERERERERERERJRCTMQTEREREREREREREaXQLE3orxOy58978MaRN3DoL4dwXDuujyUiIiIioomcN+s8XH7h5fjWnG/h6i9crY9NPsbrRERERERTN5V4/dd9Q/qraF/LztRfxZpSIv5/Dv1PvPLHV/R3REREREQ0Hd/+0rfxj5n/qL9LHsbrREREREQzN1m8ntJEvGpZ868D/xp6nfHlDFz8hYtxzrns2YaIiIiIKBEnPj2BD//8ITy/84Te/8D9g6S2jGe8TkREREQ0fVOJ16eTiE84Mle3tyoqqE+bk8agnoiIiIhoClT8rOJoFU8rkfg6WRivExERERFNX6rj9YSjc9XHpKJa1hARERER0fRE4ulIfJ0sjNeJiIiIiGYuVfF6won4yIOe2LKGiIiIiGj6IvF0sh+kynidiIiIiGjmUhWvM0onIiIiIiIiIiIiIkohJuKJiIiIiIiIiIiIiFKIiXgiIiIiIiIiIiIiohRiIp6IiIiIiIiIiIiIKIWYiCciIiIiIiIiIiIiSiEm4omIiIiIiIiIiIiIUoiJeCIiIiIiIiIiIiKiFGIinoiIiIiIiIiIiIgohZiIJyIiIiIiIiIiIiJKISbiiYiIiIiIiIiIiIhSiIl4IiIiIiIiIiIiIqIUYiKeiIiIiIiIiIiIiCiFmIgnIiIiIiIiIiIiIkohJuKJiIiIiIiIiIiIiFKIiXgiIiIiIiIiIiIiohRiIp6IiIiIiIiIiIiIKIWYiCciIiIiIiIi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xtkyUc8eY4iIiIioH5iI98Mdr8t+47V/rp9StPgv/FQ4zp4+i7MiRu/o6NAmlrG76yasrup3Ga+HR4RDjVbRHnmqK0Gv/ZT3WZJxOxERERFRH4KRiL94Uscy6BZbK6tf5M2iQsNDERrhGjoiOtBmbsPXY7+Gw9oOZ1IHOieeBZJVhF0uAvrUMIROCtHGnbnkDNpGn0RIpJiHeK+cl6x4YRKeiIiIiGgI3PG6jK0N8bojwoGTlpM4Nf4UTic6tLi8c2InQlKgxeoyZpePz05wwjG+HadjHa73inlo85MV8EzCExEREdF5xPQxEREREREREREREVEQMRFPRERERERERERERBRETMQTEREREREREREREQURE/FEREREREREREREREHERDwRERERERERERERURAxEU9EREREREREREREFERMxBMRERERERERERERBRET8UREREREREREREREQcREPBERERERERERERFREDERT0REREREREREREQUREzEExEREREREREREREFERPxRERERERERERERERBxEQ8EREREREREREREVEQMRFPRERERERERERERBRETMQTEREREREREREREQURE/FEREREREREREREREHERDwRERERERERERERURAxEU9EREREREREREREFERMxBMRERERERERERERBRET8UREREREREREREREQcREPBERERERERERERFREDERT0REREREREREREQUREzEExEREREREREREREFERPxRERERERERERERERBxEQ8EREREREREREREVEQ9TsRHx4Srv3sPNup/SQiIiIiooFzx9Pu+DpQGK8TEREREQ1dsOL1fifiJ8dM1n4e//tx7ScREREREQ2cO552x9eBwnidiIiIiGjoghWv9zsRf+PYG7WfzZ82o/VYKyttiIiIiIgGQMbPMo6W8bTkjq8DhfE6EREREdHgBTteD1EF/XGf/qvpv/DWF2/pz4iIiIiIaDC+M/47+Kekf9KfBQ7jdSIiIiKioesrXv+ovkl/5O3q1CT9ka8BJeKl3X/fjT8c+wMOf30YHWqHPpaIiIiIiHoj+5iUl7fKyprrRl+njw08xutERERERAM3kHj9nCTiiYiIiIiIiIiIiIguVoNJxPe7j3giIiIiIiIiIiIiIho4JuKJiIiIiIiIiIiIiIKIiXgiIiIiIiIiIiIioiBiIp6IiIiIiIiIiIiIKIiYiCciIiIiIiIiIiIiCiIm4omIiIiIiIiIiIiIgoiJeCIiIiIiIiIiIiKiIGIinoiIiIiIiIiIiIgoiJiIJyIiIiIiIiIiIiIKIibiiYiIiIiIiIiIiIiCiIl4IiIiIiIiIiIiIqIgYiKeiIiIiIiIiIiIiCiImIgnIiIiIiIiIiIiIgoiJuKJiIiIiIiIiIiIiIKIiXgiIiIiIiIiIiIioiBiIp6IiIiIiIiIiIiIKIiYiCciIiIiIiIiIiIiCiIm4omIiIiIiIiIiIiIgihEFfTH/bJx40b853/+J95//32cPn1aH0tERERERL2JjIzEtddei3/+539GYWGhPjbwGK8TEREREQ3cQOL1j+qb9Eferk5N0h/5GlAifvny5VizZo3+jIiIiIiIBmPZsmVYvXq1/ixwGK8TEREREQ1dX/F6UBPxsrJm0aJF2uN169bhrrvuQmxsrPaciIiIiIh6d/LkSbzyyitYunSp9ry4uDiglfGM14mIiIiIBm8g8fpgEvH97iNeXt4qyaD+gQceYFBPRERERDQAMn6WcbSMpyV3fB0ojNeJiIiIiAYv2PF6vyviFUXR+pg8ceIEg3oiIiIiokGSlTZxcXFaH5QOh0MfO3SM14mIiIiIhq4/8XpQK+LdN3piUE9ERERENHjueDrQN1JlvE5ERERENHTBitf7nYgnIiIiIiIiIiIiIqKBYyKeiIiIiIiIiIiIiCiImIgnIiIiIiIiIiIiIgoiJuKJiIiIiIiIiIiIiIKIiXgiIiIiIiIiIiIioiBiIp6IiIiIiIiIiIiIKIiYiCciIiIiIiIiIiIiCiIm4omIiIiIiIiIiIiIgoiJeCIiIiIiIiIiIiKiIGIinoiIiIiIiIiIiIion0JDQ/RH3fyN88REPBERERERERERERFRP8XHxuiPuvkb54mJeCIiIiIiIiIiIiKifrp0rAVjRpm1Kng5yMdyXG9CVEF/3KuQEFdpfT8nJyIiIiKiHgQjtma8TkREREQUGMGIrVkRT0REREREREREREQUREzEExEREREREREREREFERPxRERERERERERERERBxEQ8EREREREREREREVEQMRFPRERERERERERERBRETMQTEREREREREREREQURE/FEREREREREREREREHERDwRERERERERERERURAxEU9EREREREREREREFERMxBMRERERERERERERBRET8UREREREREREREREQRSiCvrjXoWEhGg/+zn5BS8/Px979uw5J/sjNDQUc+fOxYoVK5CVlaWPJSIiIqKRKhixNeN1IiIiIqLACEZszYr4Qfriiy/Q2dmpPwse+aGfPXsWTU1N+Pzzz9HR0aG/QkREREREREREREQjARPxgyAT4ydOnOg6MxJM7rMuMgn/ySef4Ouvv9aeExEREREREREREdHIwET8IPztb39De3u7/iz4ZML/+PHj2LdvHz777DNebkxEREREREREREQ0gjARPwgyES+r4s8lubz33nsPZWVlOHnypD6WiIiIiIiIiIiIiIY7JuIH4dixY+e8Kl1Wxcsq/DfffBMHDx48J/3TExEREREREREREdHQMRE/CJ9++uk5r4iXZDJedk8jK+O//PJLfSwRERERERERERERDWdMxA+CrEjv6OjQn51bshL/9ddfx65du3Dq1Cl9LBERERERERERERENV0zED8LRo0fPa9cwX3zxBV577TVUV1fD6XTqY4mIiIiIiIiIiIhoOGIifoBkFXpLS4v+7PyQVfEffPABSktLtaT8ue6vnoiIiIiIiIiIiIj6j4n4AWpsbMTXX3993pPfbW1teOedd7SEvLyJKxERERERERERERENT0zED9DHH3983vqHNzp8+DCKi4u1n+fj5rFERERERERERERE1Dcm4gfofN6o1Uj2U19WVoZXX30Vx44d08cSERERERERERER0XDCRPwAyBuj1tfXD5tEvHTmzBls2rQJb7/9Nk6ePKmPJSIiIiIiIiIiIqLhgon4AbDb7Vrl+XDqBiYkJARfffUVXnrpJVRVVQ2rkwRERERERERERERExET8gHz++ec4fvz4eb9Rqz+1tbV4/fXXtXUcjutHREREREREREREdLFiIn4AGhoacOLECa1v9uFGVsL/z//8D3bt2oWvv/5aH0tERERERERERERE5xsT8f0kq8wbGxu1RPxwrTj/8ssv8eKLL+Kzzz4blicLiIiIiIiIiIiIiC5GTMT3U1tbm3ajVofDoY8ZfuQJggMHDmjJeN64lYiIiIiIiIiIiGh4YCK+n1pbW7VE/HC+Gaq8cavT6cQbb7yh9Rk/nG4qS0RERERERERERHSxYiK+n44dO4Yvvvhi2Ce3ZTJedlHz61//mlXxRERERERERERERMMAE/H9IPtbl9Xwdrt92PYP7yYT8XLYtm0b3n//fa1CnoiIiIiIiIiIiIjOHybi+0Em4g8dOjSs+4d3c58okH3av/XWWzh9+rT2nIiIiIiIiIiIiIjODybi+0FWldfU1KC9vV0fMzJ89NFHOH78+LCv4ie6KLTZYR+25/IcsDfWoqqyFrbe1nFYbwMRERERXVScIoZt0x8PR202NByoQlW9XR/hj9gGBthERBcNJuL7Qd6o9ZNPPhkxNz+VXdPIKn7ZlY7s156JeAome2MVKrZtxronHsSSO27GzQWL8ODP1qH0QG8B50XGaUfFL/IQHxWCaT+rgP2c9BjlQMOW5Zg1Nh6zHi+DzXOZLVVYd8ckRI2dgoWPPoWnvj8N8SlTMG3GFCROXoLNjfp0ns7LNhARERHROeF0YNhcAO60oeyZm5EYPwUPbmoQUa1/tm3LMS02BFH561B7rhLyMo4uFHH05IXYUO25ZiL2flvG3lGYlLcETz2zHNdPSMSkrGmYNlnE489UwV/ryNG4GUsnRyEkcRE21jMhT0R0oQtR+5mllcld6WJM6v7ud7/DT37yE+0mqO79MNzJRPzEiRPx4osv4RvfmIHQUJ5zocByVG9G0RPL8dSWBn2MH6Z0FK7agDX358Cq6OMuCg7Y6mrR0NKK1oYqlL5YhHU7XaG35a4S1L5QAKtJexoYbQ0oe7sCDW3tYtE2VLxbjJJ3a7uD/cwi7N+9Allm8Vg0bEofyMLNz9tcr/lQULCxBiV3Jp7bbQgQe3Wp2PYqrbK//WQzGg6Uo+poM2rrgMWbq7B+gVWf8hyQn8WWEpRpVVDtaG6oxf6qWtgaxX5NE5/JNv0zIaKLUjBi64s5Xie6MDlQ++uFmPZAKRxKFgruzce0sVH6a90UEWc7TraiQcRuNQcbEH/7amx4It8Vq4k4sWLLBmx4W8QfdoeY1oHWYyJmdMp4tUrEj655aJQUFD63FRvuTRcRoWCrwMZXytDgzg93iHjGJmJIixWJsR7rYWpHu2kaFt6Zh6wkiz6yfxxNFSjdWYNWsR4OexXKNpdgc2V3nGq9fwdqn8uDRWyLo6kWVY12tB+rQcXb67DyxSrXRKnLUL5vNXIGtug+2SpLUVbbjFax/Y7aMpRs2oyKJvfOkDFzg4iZXbGl48Aa5M1YjoqeilUyVqB8dxFy0ICqOpv4vJpFfF6MdT/bjFptgiysrirHsszh12hy2ERbYEsZalvEtnfI46wK+8V+aaiuReIjO1C+yvX5nBPiuG3YuVkcIw1wONvFsdyA2n3iOLaJny15WF9VgsWpF1XDk4iCKCixtZhZv8hJBzD5BeWee+5RR48erZrN5mE+xIghVo2OjlEtltHqrFm56sGDB9WzZ8/qW0IUCO1q8+alarr+O0EO1sw8tfChFWrRk0ViWKEuXZCjipC063Uk5atFpUfEOy8CHa1q+ZM53dtuGKz3blWbO/RpA6JdrflVnt9ldQ0zV6s17p3fvFUtTPAzTddgUQtf+/gcb0OAHC1RC63+11k0ltSCl4/oE54L7er+VT3vQ6StUMtb9UmJ6KLk/n0QSMGYJxGdRx3N6tZ7rV3f7f4PWWpRlSv4a99X5BW39zXkPL1fj9n7EWMaByVfXX94ABG/2L6SOy3+56UPKY+VqzJkai5dqqb4eV0bghFXHduhLk32s6yuwaIufqtZn1jsq6ez/EzjMWQXqXv/WtxLrJqjrj44DFtL7UfU9fMUP+vrGmS7oPUctgtay5b1fBwM131IRCOW+/dLILFMug8dHR1oaGjAmTNn9DHDi/gM9UfyTE2oeA6YY2IxZnQCLrkkCRMnXsZqeAoo+941KLhjnatyw5KHotIjaKjageLnirDipyvEUIS1m8vR3NGK/RtXIE8WiTSVYuUdS7Bur78LMi8wJgVKjxfQAlFm+XogKUiZtwxFd+YhJ8MKJSEFPjXfsZbuZZoTMSVJf+xPQj4W5k48x9sQIOYUzJqXh6w0f+VQCuIT4vXH54YldRbyc7OQ4q9CyBIPC4t1iIiIqDcmK/KfLsf+3VtRvGoZCnP7urLPiry7l2GFiMsXp7kCDSWjEKufLkTezB5iEk0Wlr28FVsrjqD0sSw9zhMx5tylWDovBznyvb1cxackp7vmnZyCRFme319i+2Y9sBKLxTKykhRYxPuN77bEu+JOpbeKa3NU768PhmUaFj++1BXLiaDNmmqML8V6iZjY/Tg+NR29FeRnFeTjmjgxfU8V86ao4RkbivVKuS4fOdm+n40k4+uA7/teKInTkC+Ol3R/XwUlHoldnwkR0fDEDG0fPvjgAxw7dkx/NvzIJLu8VEL+jIiI1BLwo0bFIyzMhKumpMNkOod/FenC52hAyZMruy65zHtyLZbN8x+UwWRB1p1F2FG1AytyxfO2Miyfswgb6npO8F4YFGQ9Vq6dJFOP7cBSQ9K7PQidbyrJ+VixcQfKDzajvaEED2brL/hjTkfhwwU9NhRyHl2OfNEQOtfbEBCWLCx9YQf27ytDkc8+cKD1nN4ISzReF6zG1t37Uf5Goe/+FvvQwX72iYiIqC8JKcjKzUfhY6tRvNsV6y1N1V8zyl2Jtb9ajaKH8ru7hVRSkP+TYuyo2I/9f1iBdH20Nwfi0/OQPzPFq4sRJbUAa0vLUS7ee+Tofqy93Zj9VJD/bDmaD9fgSIeIG2vXijhSf6mfrLnLsF4sY//RdjRvW4FZPTRfLXNWo0Yuo6MZxbcbWh+O9sDHVbItc+9aLZY70tqOqqfze020W+c8iKWZ+hMjayFW3pUFJakAG46KbVDbUfNcnv6izim2YTiG2CYr8n5Soh0DWx9J0Ud2a7UHYd/3Qkkr1I7J/bvXI894rDhFvD9c2ylERDom4vtQXl6OkydP6s+GC/3qiJAQLdEeHRWDuLh4xFvGQNErEEymMMz/zi2IjIzQnhMFgr1iA9a8qz9BFvJyekjCe7LmoWjTDizLEI8dpXhq1ebufiYvVO5KIHMi0pNdD88pn2DYc4crSLm7GPvfWOrbEMtdjXX361VQ53sbhkIR6zzZT9XSeTovaZkwBb7NFiIiIqKBU5ILUPTbZf4T6s7eg2xLziIsnac/8eJAs+wIvTey4OHZDVjclYu3oOBX+1HySE5w+wd3x7XyqlO5HJMFKWm+kVWfbZJgS8hB0bvlWD3PGINasfhXa1Cgn6BwhdgKElPTDVexRolt0x8OR2L/p6T77veo87TOiiUF6X5O+pz344CIqA9MxPdCdksjK+KHWyJedkETGalgVKwFllFjECt+Rikx2ni98yJkZGRg0qQUhIWFud5ENFSOBpT+co1+MyEhIR3pvd6B1YGGLStx/YQoJD5ci7zHF2vBZsOWrahqcU1x4RP7J1x/qLPb7F5p8XPBkpBoCJJFIH37WmzdWNAdrCp5WPvLpcjyKfUZHtswIKKBlpicqD9xi0di4vkJzWV3QT6LnmBl1zREREQ0KJbrlmP13X765miSN2TVH/ujpGPhva6Y3FsDil8rh62vymZZna+fAVDmrUbR3fpNXQPFz/LjE3zr0BVDbIoWG5rPYVW2SyISYw1bb83Bso2lWOFRGZ/y0AYUzffzWfnsuGY0n9OrNwdKQXxSis9VAdYJieen2MWciBRjIt4iYm4G2EQ0zDER34v9+/fj888/h9N5zv+q+xGiJdplxbvFMkYMCYiONsNkihDj5V18O12TCTIRv6DgVvF6tD6GaOgcTRUoftcjOOyjaw1HfTGW3/cUypocsIkWQfzkHEyRQVoflToXFLG97sJyN4ejHe1B/ZWi+CyzJynzi7D2zhSxnrJLl7VYnOnnjedlG4ZOMTaM5H45H40ESf7eNqyOYorSHxERERENkOwu5PEi5Btjm6ZylDf2fk8my9Q8zPLNbcPe1NBnfOdoqkLZQfnIikX334z0fsac/aUoUf1K7LuvAu/ibPebxA8osW79YsnBg0+vQI5YRev81Sh+PB9WfzFouCJr4D2MgG4LxX73+XzOV3wt1sRi/EjO27oQEfUfE/E9kMnsiooKrX94+fh8cfX/HuaqgB81BpZRCVAioxAa4v7o3Osmk/HiWScwdlwCvvWtXPGeSG0cUSA4ju7Hfs8celspSrbV9lgZ7ThchXKt8j0Ly36ch/ZtG1Emg8uExN4rgR02lP5sCZb8rBS2kZ6z9xNMW63G6vQAk5ftGoPSnk5+mNOxeOMRqB37sfbOHiqazsc2BIC8CsCbBfHn6+ZNJrFsQ4PXkmAxNL6IiIiI+k9JykPBXP1Jl1pseKEc9l4SuvaDZSj3l6vfuRmljb0F3w7UblmLzTK+T1qIghl+qryHSsaxPuGa7zr5JKxF3Bcf5DBPJv+9F9HzvrLOK0J5u4rmt5Yhp6fd1KH/7GId9tXcSnwivCNsBYkJfpLz54IpCvFWY4BtDfpxQEQ0VEzE90B2R/PJJ5+gra3tvCTiZQI+PDwCUVHRiIsbhVGjRiNK/PF3Vb/3RsX1eXmIiYnRnxMFiNPhU7Wx+b6FWLnNpj/3pkzOwjQtEKrCmjtm4frHy7TxWXctwjQ/VThw2tGwdzOe+n4ebn5iAzY8vQ5l/mc9KA5bA2oPVKCisqHXxolfHtM7WmwDen+U2Xtj7S3Nwa0md9jRbLi/tF1WsOuPByOo29BmQ0N1FSr2VvV+KfWAyEtnEw2XzorG0lDX2fP94ni1tfTWWPXg59JZRz+vDHG0eUznsKG2sgpVdbWo2iuO5Z2l2PhaKWrdXT3J71B1LWrl/twjXncPBxrQUNcw8k9sERERUTclBTffXeiTBLVVlKO2TX/iQ8QK4nW/IbazBrVHewkW2mpR+kaF9jDr7kWY1VOCebDxkuBoa4bdsO7tfrZFUeL1Rzq7HX11cT9UDhH/eoeqQ7wxaLgxgS1i+IB1TeOAvVHEi5UVIm609XLKYGBkv+ze3S0GqIrfYx79bmvJrihFvO+lv1deG67stjeK2LmyO4Yu3bQRm/c0dE3jaBKvueNvd3wt2i619aJ92RSwBgwRXSSYiO/B4cOH8fHHH6O9fSjpq8GRN2CNjY3D6NEJGBU3GtFRZoSF9u+jih8dj3+46UZ2S0MBp0ww3lBIqsWaGxMRkr4IK1+p8Er0KamLsPblpcjyqJzOeaQEJY/nwGKvwFPXRWknlhKnTsOsGVOQGB6PSTkLsXKT3gu9JREWZy3KXlyJRXlTECWmldPHT70eix7fgIp+JOnt9WXY8Pj12nujEidhStYssaxJiA9PxPX3rUFpfV/Bmuznfjlu/s7NmDbWtfyosYmIj0rEtBvFNj9fitrespumKFgMVdiW5BTEe+wTR2Mp1jy+EisfX47lP16OB+9ZguWPLsHNM8R+Fcub9HDpwE4cOFt9GjAWc3zP1dciYLXVVWn7ecl9K7Fumwg69Zc0wdiGFtGQ+/WDmBYu9mlsIibJYyBnGibFi2nzl2PdTsM6BIRo7OjrLBsmtdUiyH5lI0oP9LNx0lKBdffcjJtvnKRtU4g4XhPHRiE+fRYWPrAGm/d2B+v9ociKL/lAOxEhAvudm7FxS4XHyQgHan99M+JjXd8TbRDH3ZQZ0zAtfQqm5YhjOe9mLCq8GVMWrEGt2KfrbhTfoalTMEXuz+vE6+4haxImpU9CYsGGC/9GyURERBcRy4ybkW8scKkuQ3lTD3/w2xpQtrvrjk8GNuw/0HMM5qgvRUmlfGQRcUi6T1/hmqHGS212tOoP3URT2EDEUAkW7yS2NQWJntO11WLzMyI2fULEpoZI7uMAAJm5SURBVI+K4YElePDRB7HoxmmIl+uV9RQqBpQ/daDVbrxHkgXxvuX7XRwtDajdsxlr5LKf2Ygqw/IUS7z3PjQlIiXBY35OO6pefEpsw0rXNjy8BEseEHH2HddjSqzct9djXbXHGomYvmHvRjxVIONvsc9TRLw4Y5aIGxMRFTsNi57ZjNoA5Iy9t7g7vta2V8S0FVs2YvPOWvTvnMJQ21r6TzcRX2vkCaA6Ee9XuopWqjyv9Ggpw4NToxAl2yF6jB2f4mqPumPom+9YhIXi54Pv2mDb9iBSJojX3PG3O74WbZcpk0X7csI0LN/GZDwRDYDaT3LSAUw+onV0dKgvvviimp6erprN5nM6jBkzRp08+Qp16tRMNT1tqjo5Nb3fQ+rlaeo999ynfvrpUbWzs1PfGqIAObZDXZrq+j3Q85CiFvy0WN1/tF1/k0v7sWa1uaFZdY9tr12r5vh9v8dgsqpWk5/x7iF5sVrS4L2cLh2t6v4XFqvp/t7nOZhz1BV/aNbf5K396FZ1Wbaf9xiHhDx1xVtHurbNi1iPHfdbvaa33FmiNnfor4t37X86y+t1n2HOWrWmh830S35Oyd7zsNzVvcz22mJ12e0FasH8PDUrLUW1Kt7TYt569Yjn8gK6De1q8+61akGSn2m8Bqta8Gy52tq1jIGTx1ie5zxNeerqzcXqinne2yIHy/zVavkx/Y1G8lj6VYFqNbzH35B+93p1v7/5iHlsNezDlPuL1ZLnxDHqc4ynq0vfcB1PzW8t7sdyLWreT7aqze2tavlPe/8c0h8R0w1hnxJRYLm/m4EUjHkS0TDmJ06TQ87T+/3Gplp81Et8bbm92DsO7NKu1jyX45rOuljdelQf7RaIeElo31ekZhmmz/utb5zdvLFAVTynS16q7vCYZ2vZst7XxVygFjfoE/eL2P5f5Rnmk6UW7dPXTGx/+apCNX9BgZqXm6WmJFkM06aoy3a3uqbV+cSqIgbsmp/UXKIWWjxfNw5WdWmpPs/WGrXkEf3z6W3IXKqWHPb7AfdP6351RYbnPC1q4W+3qusfyvH+POSQXKiuP9jzsgLR1vI5DrJXqCVvrFYLDG0hQFFzfrrDFQef3K+unmN83c+QVqiurWpV2w8Xq4VWP6+7B0u+uraX7SSikc39XQ8kJuL9OHbsmPrP//zP6vjx47XkeGxsrE/CPNBDXFycarUmagn47Okz1SuvuMpvsr23IT0tQ1237tfq8ePH9S0hCqR29cgLhmCnx8Gq5t27Wi2pEEGTv8Rfe7Na/kKRuvTepeqKVavVZXONwarHYM5SC+5fpi6el+7zmjJvrVpzUp+nW0e71hDwWs+MpWqxDKTEcnf8xDtZaZnvO4/2hhJ1aVr3NNbcxerqt2rUVhljiXns37jM0EhIURdv9pfQF0H5Yyke04kh1zux3n60XC1+VuyLXMVrOsucZerat8rVI94xe9/6SMQ3ly5VUzxeMw5ZTxobboHbhtbdRWqOZ+PPlKOu2Cz2q/jMjmw2rFdSoVo8lIbC0WK1wHiSwXMwe6+rdcFqdb/PvhaNylV53ceSKV0teGy9Wt7gmrD18A519QLvY1eZI+ZjPCbFHi3/qe/x6zlYvBrFWerSza4GR3tzjVoujjev/aYPec/VeH9WohFY89aK7mNT7N8i0ehrbz2iHjGcHCOi88/9XQ6kYMyTiIYzEfeu8pOAzSzyE4+IOHDzYtUiX08oUIse8ncCP0ddXeUnZmg/oq6d65om5aEdhmKJQMVLYjF+EvH5L/hJxL+lb4d7MCbWTx5Rd7ywWl1xl2Ebrfnqihe2qvt7KubpkYhV/STiu/ZVe43YP96xpddgKVBLjCcvGorVfK9Y1aoudifWJS2uW68WPVZgiN1T1MKni9UdB/UiJ/HZFN9tKPi4a61aLmO/1v3qav1zcw85Tw+h2EVuZ673/LwHi3cbLNV/Mj5Qba3W0t6LVhSvExmKmudOxot9e2TfVnX1nb4nsZC0VN1qOFEk2zprb++e1npXsXrkZLvafPjIkAqHiGj4c3/vA4mJeD8qKirUb33rW1py3F/SPNDDqFEW9bKJl6nZ06/VkvBXTJ7iN9He13DddXPUnTt3qadPn9a3hCjATorga14vQaafwTp/mbr+Dz0k5HWtFSv8V69nr+iuVJaVJj8xJjNFwOoZlMlpfKqC09UVHhUosqqhwKuqwaIWvuEd2LVW6I2ApEJ1bdl+dX9Vjdrs1VjwUwXut3LdXxJ7te90IuAsudcd3FnUgl/tH3xQd9RP9Yyscu+an2hIVGxVi1ctVfP8VNnIxo63wGyDvxMAOc96JP3FsbXa0IBJecTY0BuA5q3qYj/VK9YFRepWd4K/o1nd6nFixqdiXDZs7nQ1HHN+UqKW79uv1ohGpdemy/2d4LkMWZ1kbCi0qzXP+mkkK1nq0hfK1WZ9hu0H13cfm2bP6hp5XBuPfXHcbvTTIBHHruu7JD6D3xoS9UQ0rLi/z4EUjHkS0TAnYhHfmEfEvxXGCoP2rlhaub1YrXHHu4bBX+K7/eBq/WpWEXu/ZYg/AhYviTjGTyV71irfeMYnEa/k+6lwF/GXRxFRyr1im427pN/8XQFqqHI/VqPu2LxeXXGnn+KLtGVquWHZ7YfXq/lehRYW70S8rnWf2Pfu6bKXdcexkr+2mbxiwWPXNr9liMHFvlpfO8gIsUN81vP9tAVl9XiZ+7gRbY03FncvM7fIZ9sD1daSbUhj+0Lux7zHStQadxvyWLlHG0Mcvxu7j+/2BtEuNBven13kW5wj2gzFt+snkzKXqTt8D10iukC5fzcEEvuINzh79iy2b9+OhoYG7XFwqQgLC8OY0WOQmJgklteJ48ePy09Yf73/QkNDMWVKOiZNmoTw8HB9LFGAmdOx9IWtWJErQtp+sr29BktunIS8H/v2jehmSZqCdJ9ZpmPFL5YjJ0F/arIgq2CRGOvJhuIXt3b1e+1oKsXqX1S5nrilFeDmjO4eGJXkPCya59kjox2lb5fD5tFfZevh/dB6zzTbsfn70zAtawoSr1vucfNYBYlphr4xD5ah3LP/wZ5EGW/MJLZi91oUPe+aedZjxVh9dxYsxj4P+8ukyEV4OynWq2v7FKTMzEfhIyuxeK5xQgsSE3rsTb7bQLehrRbFT69Dg/7UJQcL56Z3z8ecgoI78/QnLg1vl2J/jzcb64MSD4vXByRC77uKUb5xBfJT9aWarMh/uAiL9Rup1v5iJTYc8DhIHTbUaAetmFF1EWbNmIYpKSlY9Hxtdx+hlhRMSdYfa2wo311j6Ndf7C+L4aZiyELRzjKsvTsHVn11lIxFKHpc3wdtpVi5qlQ/Li3Iua8IBV7bI47N17qPfY3TjvKX17qO3ZnLsfJOj/1LREREF6aELGRN1R93qcXGzbXeNxcV8VjZNlf/8OlZ6UhJy8fCbO2pl9JfbTT0Je5Aw7YSaLdptd6MghlWbWyXgMVLgmjGGiNRh4xj+6J091XuJu9htO7pzdo6KHOLsP7JQqQbYsOBUHz6g2+Hw/N2cgnpyFuwGCsfLjC0VwR576s+gzLfbZCfWcmq1aiQ+8lagLW/Xtkdxwq23WtQ9K73/rHOL8A0d/tJsOYsQkGq/kRylGLz7ubuz2ZAomBJMOzE1KXYsbMYS+ek6HGnaGvMX4GiBfp67lmJotc8jgUhUG0tedNe76NRQf6vyrF1lfgM3PsgIQeLn1ymfyY2bHhiDcpbtCeiXViAlT/Ocj1xqyxGcbXXFwCOuhJs2OI6xhc/sRx5hq8AEdFAMBFvUFdXhz/+8Y9obW3VbtwRTCEhoRg9egwuvXQCnM6z+Prrr/VXBi4iIgJZWZmwWCxBX2+6yFnzUPR2OdbePrAIpOIXizAtfSE21PkJ+0wWxBtiOmX+MizONoy0WJFiDLIPVqFBT9Y2V5Sg1Ji4nZzSlejUiGWlT/UOj+1V+7vmIckbyGpT1JWirEkbBRwoRqlHq0RRDM2EljKUHfQO2mQw2HXTIJ0lIRFR7m1wOlD72hLMuvEpyNMHKfdvRenT+UjxfsvAyHkbg/hYfzNUfANpMU4x3Jg1ENvgaCxDyR79iVvCFBEge85XQfxk0SjUn2nqy1Hb083G+uIUjSOvY0E0CO/zs28t6cjparxWYfWq0u7ktjkF02bIfWRHxdvuEzyiwbCpHM3uaeRNVw3zrHq3wnBTVIdYF8N2zFuKwkzf/Z+YldW1D+yvrMTaSv2YEo3s/Ou8F+TYWep902JbOYq3yBEKCh4oRJbPzc2IiIjogqMkIm9Bvv6kW8PbW70T6i0NqNHiWitmZadAETFQfoEhCSlVinjaM+Fpr8XmjVoaHpa5+V5JXk3A4iWxKXI6/bGbMeSWfBLWhkS3vXIdFuUsxLp68SR7Bco2rhh68tS4TET5XTeYxbroD7vEGm4uKygm8WaveSYiMd5jKlsZniqYhiWbRGyn5GHtu8VY6tk2ctqxX3zGnqGglDJZLN9zvqL9NM1Q8bS/qrb3m+b2wt7m3d7JuW8pZhn3rTgms3K6j63Sp9d5JNkD2NZytHqfbEoowNIFvoUoluRZmOU+buvX4amuEwMKUubkebc/UIvSUs+TWKKtI/Z9mdxfaUuxeA6z8EQ0NEzEe+js7MTbb7+NQ4cODaoqfaBGjbJg4sRksVwVJ06cGNIy40bF4pprpiI62l80QBRgliwsfaMBzWXrsXSOT6jZM9tmLLl7jW9lvCkeVkNQ73AYInNBsc5CnrFyp7EcFTJZ67ShaluZT3WHNSkF8cbA2WmYqr4K+z3uyK+k5mNRrv6kSyLiPYPjeKsY48mOhqZWn+X7Bu06ETxX/XoRZhVu0CrFZbX2jmfzYe1p+v4S+9Kn4qbV7htsi+XEm42/L6Jg8fcrZIjb0Lyv1FVF5ckq9p9xPX3Uovxgs/54qNphP+bz6YgPOx5TMrrDb/uWDd2NT5NoqC5YaKi0kase330iQuzvROOG2MR3o69K/labbxWYoFjTkd61/2qxceN+13RKCm6+e5F3w65tM1a/VtV1zDnsDbDJCh/RCFk0x7tJQURERBcqBekLlmKxMWCp24ANu7uzn7aDpa5kaEIe8rTScPG+O5ejwOfEfRWKN5Z3xSn2qmJsqJSPrFh4+yzfWDWQ8ZIS5ZNEtbc6fONroacw0rbzKSy87kFsltuathRb3y7qvsJ2CGT1tbdWv7GlYo6HZ5NB0pLKxv0m9LQNspp/+fzrsXKbnL+8irIESzMNU2tXOBjT8AoSkxJ95ttuaPvY9nUXMg2VvbnZT1JfQXzalO64takYxTu71zWgbS1PbXZxTPmZwpyCdI+rAspe2Nx1ksqSuRhLZ7oeu9U+v7b7BIHYd80NrnXP+v5CZA2g6UtE5A8T8R7q6+vx5z//GXa7PehV5WZzLJKTJyEs1ISWlhbtJMBQJF92GS655BKYTH7+whMFhQLrnMVYW9aK1tqtWPtYgUcCsRd7V2LxsxXe1QuKxSdgld2p+IRRYv4+FTBoQINWbtMOR4tv4BUlk82G99iNl7g6ylHuWTJkzsKybc0o/+1S5OfmIO/2pVhdWoJlHgGwvEzWuDTbUcNlnk47WkXA6EWuS5sNZc8vx6KHN2v7wXp3iVhW4dAq4d1MIvA1Boh20VAwBsjiebtP0Cy2y2e6oW6D2E8thvdLopHi81metItP0ZMdFfsa/Cas+yTm7V155fC7vXI/tNo9luqsQZVHtY11wXrU1pag6K485OTmY/FPi1H6bEF3I9Qhjn9jQ6al2acR4HM5c0/b5BD72+O1hn0VXQ0l64x85BtauVWlZfrrslpns1ato1x3M7IC0OAkIiKiESJhFgoXGFPhNmz4ZQlqZZzgtHVXT6fN6uq2Q0nKw8J5vgFo7SsbXd13yKrrLZtd3QsmLfTtlkYXqHgJZqtPAU27iGONcVOreK9XW0K7etOOhnfXYNk9K1EmZ5uxDDt2rvWJnQZHQVSCxVDp7hDb5B25Sg55VaZhfeU4I0eb2H7D5ismB+zVm1H0wGKskSc/TDkoqijDipl+sr+yGty4T2UC3HhixSli8ZP6Y7cD5djvp93UH8aYtqfKevm5dS/Bjqp9Hl0RBaqtZTxxI084+Fsf2Z7xPGDqxPa7i7DMKcjLN1wZ0lKG0ir9xIGtHJvflt+AdORf5+5+h4ho8JiI18nq261bt2pd0ww1Kd6XyEgFEydchiglGl988aXWF/1QEv9yfWfNmqVV2BOdD5a0fCxdVYL9DftR8lyRdklgb6qeWYmSeo8wSl6GGqs/dvPTD7kMLmXfkd7saJbVEQ4RfBujWamlHCUvbsTmTRuw5pmn8NQTK7Fhp7HKWry30VBhoViRc+9abN1SjNX358NStxFrfrwEC3MmIUp8XxNvXGPo81xPbHsFf2J9jclmezmK7kjH9Q9scPWNKInt76oYGioxL5+KeLFvekpCe2tFs09lz1C3wYHmZmO1juBsRtkm8bls2Yh1Pxefy89WouiV/d6NKqG53ibWahBkRYzXzBKRMsH3iJJdFU2bM8vjWLOhxHDPAEtaAVa8sBWbf70ShVNbUSp+Lv/+9ZiWGIKQ2Cl40NA3p9xmY6PELhqMnpQJKX77CpUN4rwM/Ym0twSl7u9KQhbyZhjetGcdNlSIDW2rRekbZWKEgvzb8wJzUoeIiIhGBhHPTJnvW5WObWuwTlbFtzWgTK9Izsqf1R0niPflzPW+R4/GJuKeChscsup6tyvizbpvkW8XJB4CES/JynHjfZJk937Gd2rxqRcRVz6eh0n5y7GxUR8lpvG5b9IQyHXznp0DdrFiPutmvPJWOib2pZ/RRg0bl2LW1IV46l09dhb7x7fbSBctka/3de6ptXorNry2GZtfXCPiaxFjP7kOm7v2ic5Zi1qPq4H7zdmO1hbvaN2akuinUEpE3jPyMEt/LNVu2Yz9nm8NQFvL0WrsmiYFif4CbHM6Znl2KeMoxcaufvIVpOQau6exofjXW1ErJrDtK0aJrI7PKMBCj/uOERENFhPxur/+9a/YuXMnvvrqK31McMibs44fP17rG15Wwp85c3pISXjZnU1MTAyypmXCbI7RxxKdA/YGVO2tQFV9d/ijJGWh4KEVWLu5Bq0Ht2L13T0k5GXVsVenkCLA9i0U8WWKQrxXv+KSBYlWERiLoNen0kZoeHE5ltyzCAvvWILlj6/Eyp+twYY93gGkZPcqkxBrVF+Kp+67HpMSJ2Fa3s1Y8qh47883YPPeBj+NARe/iWjDOPvbokG0zXtZtudXYoO7L/Chkpf+TjAEiYZGjkasV5SxSltuWQ/TehrQNsgqHFnJZFS5Bg/Kz6VgER78sdi3TzyFNR7drLjJALunSpteieV6Vwk1oNbYEanOeJLCfrihuyrdaUfF88tFoyARiVNn4fo7HnSt6ytlcBfK+OPdIBH7wHAVhuNwjZ8qJsn4GcgrPvT9qqQg7/Z8QyOwAcWbymGT/b7KflDFqz6VUERERHTBkzflXOR5U06NiBNEzFK7bytKtTghB4vmefahrSBl7iI/3dPYULKlHA3VZSirls+zsHB+lm/f524BiZcExSriev2xzuEnse0Tc9dvxFPPu/un11U/hZWGm4QOhTI2xdBViuCvK03Fz1WfIrbzmVIWsegPXaqw7ucbu4tcNBUoenoz/ObMZdGJT4xsx+bHl2BJ4UIsvGe5+AxEjP3Muu5uVrq0w26sku8XEV8b3tcg4ma/sbr43Lyad7YG2Dxi30C0tWQhlnEZDfLsiD+GdWw4bOtajiVrIQrT9Cc6x7sbUFpnQ3O13l+8v6t5iYgGgYl4QfbPvmPHDtTW1qKjo0MfG3gy4R4bGwurNRFtbW0+N2eV3crIYSCJedmt/FVXTYF1/HgtyU8UXA7Ydq7BIhFkR8WLoClnFqZNjkdI1PV4yqPfP8mSkY9lL8iEfAlWzDWG7TbUVntcWigDI0NwpCR49Cvp5mxFq0/Vu9JVKWJMK2tMVmRl5yBnphhy81Bwd6F2CaT2XAxZqfJdVsya0X2poePAOiyaezNWPl+Ghq71siLvrhVYW7ofze0q2g+uFk0Zb5axhgBNBNjxFmN/kv5UYfVzpf6D7EHw6QbF4SeZLZ63+iTIZfLacEZkyNsg1kXMw5do+GV2fw75dy5GwVyPzyXTVZeSft00JAYk6BXHid/5iBUWDRmv1XbfUMtpQ+nj+ci7bw02e5xkUMSxvXRVMcoPt0LtaMbWew0tRnlZdQ/VS118+ufXOUXDyGtluo9vyVhdJNm2laK8qhyyMF6ZsxyFPVw2TkRERBcwSxYW3WeMTgH7lrVY82s9wZs6C7OSDTGKVcRhc3zjFvsrS7Ho3iJUyBhSxD75xve5BTJeMkWJOFZ/rHOI2NRYr6OI2LSHtfFStmodyns5ETAgYsWMy2z1E7vLSnWf8W2+sbhM2Psr3vYpgHltNTYc6N6vXcR0fveBNR1ZejydM7cAi+8Sn437+cwsV7dEllnIm9yfPdi3eJ/CHp3DcCWDIuJrfdKAtbXEe72X4e+Kakmsi6EbJEu8x7TmdOT53IS1AqU796N8n/zmpGDxA/lIYbELEQXARZ+IlxXlf/nLX7Br1y6tQj2YwsMjYLVeonVN8/e/i4BELFsm3UePjkf+zfPwf/7PSjzxxArMyfu2+BsSqb+rb9dcczXi4uL0Z0TBY3t3JfLzlmPj3u4KAo2jDCvzCrCm2hh1iiAnowBFm8ux/k7v4Ga/CGq6+/42BGqC4i9561PlLIkgVl53KqtK/AVHM1eieHc5yivEsHsHSl4oRslra7B4qgO1lQ1Qclai5GAt1s/X16+lAmvuf9BwCacFhRvLsePlIiydlwWrWJxikZc+6i/rEhN864R8kr+WfKzddwQ7furdF6H9tZUoMpzMGDTjMuUlvYbgX04T7+/OrMaAVhjqNij+ks7mfBS9rX8uYti6cT1KNhej6I4U2A9UwR4vlvGHI9j/dI7PJcr9ofXF6bXNdthshu6HdLKB58mi3VzMgYZNy7D45xXe78kuEseRvCdCIXJSxedtsiAxxVAflZDocyPadmPFVJNvv6AacYx7X9kh5uVxAwUlOR+F8w0zb1yH5U8Ua5fvOppbA3oZNhEREY0UCtLn3AxDb9ciOKjAhi2uTj4sObN8k4nyirs7jVfcSTZU1bmClaw7FkK7v6uPwMZLks8oeVWhTxxrTLhasXhjDY68tdS7ixEZI/3KcG+qADJe8aiR977yE7v6dBPpZ5r0R7biSFUxCrzu9VOFlSLO0/r69ySW4+9q3PR7N3TF1+V/KMH6l7ei5NcPYlZUAyrqxev3F2P/4RIUasVIAyTiVGNI29BkaBfqHLIPe/2xxiLabHJ9A9nWMva97+ipIr4drXbvo8BrXrKrysJFhu5pgLInlmOddsPcBjQ7e0ryExENzEWfiP/yyy9RWlqKgwcPwuk0/nUMHJlwt1gsSLp0Ar766u84c+aMNm7ixAm4+54f4F/+5UEsKLhVG/7p+3dhxoxsmEx9V7jLCvr0Kekwx/L0LAVZWxU2PL1GhIJCaiFWl9agtb0dzRVrUaDlsCtQ2tXXnoE5HYueKEJ+T9GLDKYNr9ntrX4CVgtSJhsCMNF4mCKDVfGadaxrlBd7s3eFcdNmLM6ahSXPV8HutKHilZVYOHUWlu90BWcN765G0V7tYbe0xXhwniE0MycixStIFtsgvoZem6ElVQ17JCMfeRkpmFW41LA/GrDuiQ2oGnJLwXdfykaS7yWjCizGa3+FhqOGYHqo2yA+2/ixhs9MktVCnh+Moxbr7piE6x/diFoR4TfsXIcHb5yEvJ/7dlfTH4qsqDI0ThoOi+PTuB/E9slLaj0lJifCIo/3JzeKJqgnBfkPFCLLa3PEfrQaGpY+H4A8SWQYZ6tFs5+GgqOlFg2e54TNKUjxLJcSx/vN9y/26QO2odq1ptY5eUjnnwMiIqKLkpKWj0Uz9Sc+FOTNzeq+gaqHlJyFyO8xfkhH/pweblJpD2S8JMjCGuNomfzVH7o5ZIW5/lijzEJeTjpS5izG4mx9nK7q50Uo1k8oDIlcN+O+87NuimgjJHq1EQRDtyySw9HuUZQkWTFr7iykyHtv3WVod2xbiSJ3v/E6WVFv9RNit7Z4V9/bty3HtKxFWCOLZVqqsPlni8TzJdjs011NP4h9YKzid4g42l9xSWuDGK8/1qSkI1EcY4Fsa/n2298s2jJ+VqbNBrE6HqxISfK+qsKSvRjL5uhP3NpqtX7igTzk5/h0TERENCgXdSJedkPz3//933j77bdx/PhxfWzgycp3WQV/xeQrcOpUO1pbW7uS8IuX3IM77rgNKSkpiIiIENNFIiMjAzk5M2GJ7707CDlfiyUOl15yifZeomBy1JWiZI94oORj7WsrkV65Dqs3VaE9IaWr6qNdBKM9UVJvxqJ53eGOIqK4rmcyWDS+1U+fi/JGU+X7DJnq7DxkaWUTspqnwBCMCfVVaOh6iwNVr63GRpnoVPKw4rnVen+AtVj3y1LYxPrbbb4nE3LuW2xoTAiKxRBkywS4b+W3sdoasa7tVlIXYuVjhpqlyrVYV+EdZA+KT7K5h8/G5L97FOM+HNo2KEifv8jn0lK5z6u6PxjYKzZg3bvykQUFT65F0QJXqrni2XUoG8Qu0W5gZdhkWQnjsxeczag96LkAC7KyRGNTvN9mPCliXYSlxkaCEJWQ6N1nqvFGY047WpsM3QA5Ww1d0LjYG0TArz/WpE1zXULswTqjAAt9+oB1mZKV7nsFAxEREV0czFkoeMBPPCyZZiFvRg/JRO2G8Ppjo6RZmCWr2v0JZLwkaTGr/thNPjeMazfewNWsJ4jF9i9+0lAV7yjFuperAlMVb1gP30IXQRYY+dkunwp42b+51/vF/ogVP0wWzHqgCAVeO8uOjc8ZquKts7BIj5c92apqu/uOdzSg5JfrtKsmkb0Ua59diiy5Hk0bRDtuEP3ni3X2KhiR/HS7I9fXVus9/5TMdCSaAtvWam1pNnyudtjt7b7bJe9t5lmBb5qGLGPXPPqVIX4lp4t43O+3iohowC7qRPxbb72FF154AUePHtWS2sEgZxsWZkJySgriRsXjs88+Q+fZTowZMwYFC2/FzTfPQ7wh4R5jjsFlyZchISFBS9j3JmXSJDHf2D6nIxoqe3Ozq6ohJx95ShXWPb0OT31/FiZNvhkbtIqKLNwsgvseQxQRlKYku4N/BbOuS+8OvsVPn6KYdj/VLyKIqjVUb+R/v6DrEttEf9U8jv0oP6yHaE4HWo/qSVdFBGnWPDx4jytF7DjWKhZpR+0+w42eRJNhSqpvP5SO6s0o9qrmkH2p+0wFh/GEwkl9u0SQnXNfERZ7xc82bH1xq++lpwPkE3w6RYDsM1Luc99PS/EpQxr6NsjuVBbm6k+62FF+oDsQd4hA2lU1o8BhSkHB/frloXZ/wX0/GBtoggz8fRp3tlrs9wzMLXm4WbQEHE21vn2KiiA8xdhIcNpQ/lqJdyMg3urTALP7fADNaDjms4ZoqK7xmlfWvDzfS8gt05A/17fhJU+SFc7p5TtIREREF7zEqXmYZUz6SteJGD6phyjBLG8In6c/8ZZyeyFmGSu8dYGOl/xEsWJUq6FyXMR4xjhPPHdPY52zDCsM3fjVbtmAskY/8x4IMX9DaQra21q18T6M2yVibp8IW8SG3mvUfQNVJbUAKx83lLFUlqDYs9jFZMW0+Tf7XCWJ6nLUupPlTjtsXRXiDig5i7FUL4yy++vgvi9O0X4yvq2lAc3GtoujGfsPeJagW0XsOkW0qgLZ1vJzHAjNPmeGRLh/eD8aPCcU34VZspDLi2irinaub/GQ+A4sKMA04zFNRDRIF20ivqKiAi+//DIOHTqEzs5OfWzgyfz4KEscUpJT0Px5s/YHVya/vnHtDCxcWKDdvNUoNDQU8fEWjBaDfNwTefJgSnoaRo0apY8hCiIRUGlhzUk7HBZ5iapn8GJBwW+LsWxmLxGKZ0BmycfCHO9KGZ9k61iLbzLzcAVqPKezFGDR3O7Eo5Kch8XGSzlhQ9lOvT96WWFy3zJXdyr2Cqx5YjWK33UFgykz0hEvL7f06efdgWa7IewWjYmyFza4uunxpK+bvbEWtfKupWKba2t9g8Eu1lkovDNdf+Ji27QSRW83+ASV/eZsRoNXhbfg58ZXkk+CXbAfMyS+A7EN5nQU3FfgXQUl1P6hDA164G6d+yCWa5cSyxt+rcSa18Rr8mnGNN/GXJ8caKgq8/18mpsNN5N1oGrTamz02F3pDy133YzMbPFZX59ujgRHdQnWbTLsn3Z9Ioe8KXED7C01KJd3UvViR3OLoUq+qRwbnqvQnwji+F5+T47vesjjuHAxvPe6kDYL03waFURERHQxUdLyUGDsYkNIycjy2ye7i4LEqVk+fWTLe/qseGBWz/frCWS8JOPPtgbU1rtGd5Hdj3gu3yli88Ne1w96k9343b3IO0FdtwErny2DzTPGHSDH0VpXbOohyl+ALRmX02ZDqyHudhyt8ZlfN3lF6WLvLiAdFXjqiQ2o8KhIt163GIsz9SdubeUordKDWxGDF/640PUZVYp9sGoDNu+T62FB1tSBF284GitQ7tW3uyA+b2N3i3axrHXveoybsxJLtZuhBrCt1fQFanfvd43w0Czife+2TAO2/nqdxxWnVix9bKHfrhyV1Hw8uMC4VyzIyZnS83eAiGiALrpEvOwHvry8HP/xH/+hJeNl9zTBFB4ejpTkSXB2nMUXX3yhJdYnXjYR//iP8zF2rL8OrV3GjRuHxEsSERbmv594mYSPjolGWvqVMJv9/BUhCjBLyjRX4u9AOfY70rF0YzmKny3C6pd3oOZYK0ruTe8lmHOg9vnlWL7T9SzrUZnsdD3WiIDaJxF/uEoEWJ5BnR0NO8vhmWLOe7IIBTJp6mayIu/Hq1FoKA2pfWYZ1lW6gn8lYylKDst1X4HFE8qwbqdcRgoK5k+DRQTTKVOnGbbDgf2bNnsEvQ40vLYMi35tDJ1diVVH02YsnTEFUxKn4Nb/uxE7q/WXPXTNXyZUH1hmqOK3YeMT61BuvOyzv+Qlo4Y8vOSzf7VGjG/4r8THezV2HLb9KA/ANqQsKEKR8Saje1Zi+Sv6ZauWHKzYeQQ7XijCsrsUlLzoCr1zCvIH1ee5vILDR/U6rN3msXPsVSh52SPxbcrD0oIsrbGiJKRjmtZtkYf6MhTv9DjB0FKBonsfRJlx34oGiU00tqp+kY8pUychJf/f8IHP6jiw+dmNqPKoIGrYvQHFHquXcudi5CXpTwwsydN8LuFNn++nep6IiIguLko6Ft6rJ1+7KMjqI5loSZ6FHEPle97Tq7Gol5t6BjReuu5B/FflUe/KZcn4PkeDaMf3nMKWrHOXYrnhaszaX67EhmrjzPvLgVbZz7v+rItx3QTtCl7jhPIGrp5Je6cdNbt9byLrGYPLLiCXPWQou9i7EkVbPPatiJ8fXLXMUJxhw4YfF6FUWwfRtrlzA2r3lWDtT5di2sF1rvFWWRTl5+rKPjiONXj3+66pwJrflndftSC2rfzlYo/EtwUFd+cjRW6+vEI6UG2tCbn4vz6FLmLrn1+D4vruz9lRX4oNWzw+98zFWNTTtiuJSM8y7HP9alkiooBR+0lOOoDJh6XPP/9c/c///E/1+uuvV8eNG6eazeYgDrFqbGysOjl1svrd/7VIvfYb31RTL09Tp2Vdq/7rvxapdvtxfa38O378hPrzVWvUqRlZYh7pPoOc1/V5/6Du2vlH9cyZM/q7iILo5H519VzX7wGkFqir/9Cstusv9a5dPfLGMjXLpL/XWqgWHza8s/2IunaO/rrnkFSgrt3tWk577Xo13+zxWm6RWt7qertRc1mRmuNennuw5qtFb+xQyyvK1a0vFKmLs5Wu19LvL1Gb3ask1mX97Rbv98ohIUvNX5Cv5mWn6OMUNX9Vsboi2z2NfF6iFv8kx/V83PVqwYzuZXQNyYvV9RUe+66jVS3/SbrPdEp2gbrshf393Me69ma1/LeLVRFaGuYn1u3ZcrX56H61+Lm16vqyWrW2tEjN89yf7iGzUF32k2XqsqLX1T/9sURdlhu4bWhv2KouTfOeBkhRC58tUXdU7FfLN69VV9zuMZ+ZK9QdzfqbB6KjWS250+MztGapOUn64yRx/NW61qj5De99lf+rGq/93Vq2Qs3yeN09pMwpUAvm5qjpCfq4tKXq+ucKVRGidz9/Y61aqC/z2keWqte4XxNDem66Khog2uOcJ3eorR1yYfvVotzuaZC6VN3a27afrFFXe31nrOrS0h6+EEQ0LLm/v4EUjHkS0cjTWrFCTdd/H2iDKV9db4y/jUT8tPVua/d7lHy1uEF/rRcBi5f+daP60kO+8SSQo64oPaI2H9yq/vynP1H/5c4r/EyTpS7bWOOKqXTNb/mJia05auFPStQjfewKo1ax7BWecZp7ENtQUtus1pSuV1f/qkTd//F+df3d7raC52BV8x9aoS4Tw6/f+ZO6Q+wH33gdat6TW9UjHuFc++FitcAnXk9R8+4uUrce1TdCxOH7n8vvii3dg5K7TC3+Q7lo++xQi1ctVfOs7tesauEL3jFv/7SrNb/K81hGipqT7Y6309Vlb7kCV2ObzXJXsff+DlRb65J56i3u+F4MlswcNcX9eP5adb/cj2Lf7HjM85jKUosqeo+Xm0uXen82c9aqNQPfWUR0gXD/LgikCz4R//XXX6vvv/+++sQTT6hz5sxRU1JS1Pj4eD+J80APMeqYMQlqXt5c9dZ/vE1NuzJDvfKKq9Sb87+jlpXtUjs7O/U19E++vmHDi+r0ad/wScK7E/GLCr+v/uUvH6lOp1N/F1Fw+QRW2QXq0p8WqWs3ykSqCH7dQUrrEbVmd4m6+rHFakGuRzCatlgt8dcIaK9R1/oLbvXBkmz1Di4zFqvrD/YRER0rV9fe5S+Y9xhMWerSl72Dds3REnWxR2Dnb1DmiaDspNjUfau9TxBoQ5jhuZ9BBO5bj4rA+beL1bw0P8lufVAyC9W1Vb1tq+tER15Gik8A3tMQkegn+PUZQvyMMwyD2Yb2ZnXH0wV+Gx/dg6LmyUaS2L+DIpPU7qA9Y5m641i7aJAWdTcSzVlqwV35apZFfy4Gq7GRoGlX96/Sg/0ehxR12R9Ew0M0Kkru93MyQhwnf3pjsd7oVNSCF46o7WLa4ru6G7op8wq9vydKjlq0u++k+pEXCrobs9ZCteSo/gIRjQju73wgBWOeRDTytDfs8E4cz1vfj+Szd6I15SG9WKBPQ4+XQqKjfMYNahCx/QoRQzXvXq0WzvSXENeHhBx16UYRk+lb4JdoS6y+M0tN6Upg9zVY1PER/sYbhhA/47wGi5r/nGifNGxVVyzI6iVmtop4eavarH9GrQeL1aVdSesehlQRk/eRiO5Zq1r+mL5PTTnq6qpWEdZvVZemuudvUfPuLPRuE2TItoL+dk9DbmulqD9cv0bN1wuvrPfKoip5/HqckMgoUAsX5HjsP7lf+1Hk1FquLstwvwdqztMDLIwioguK+3dBIF1wiXiZwHY4HOq+ffvUxx57TM3MzFTHjx+vjh49Wo2Li/OTMA/OEBsbp6amXqEuvuc+9RszZmnJc1nd/r//9+NqR0e/Ihr19dd/p+Z+89s+SXg5XDF5ivr44z9Vm5qa9KmJzo3W2q0iKPWolunnkHJ3sRZM+XVyv1pkDByT89XFt+ep6Yr3+KzHtg4gQduuNu8rVoseKlBz0jySz8k5asFPitX9XWXwfrTWqCWrlqoFXZUeYkjNUxc/VqQW7/YuVW6tKlZX3J7lSopak9VLovTpexvMBWrxvh3qMp8KceNgURfrFSZ+yaqSeYb3WKyqNTldzZqZo+aIIctz2z0GS1qW9rpxuGbqpWpcfxoSQ9iG9oZydf2Ti9V80UjqCpjN6WreXUVqycHBNhB0evWLRV650ZXQFsH5G8vUHMPxJKtvFv92fy8NTXEMla1XV9ydp6Z0XWVhUbNuX6oWPbdVrfFc1ZNH1B3PLVXzkl3TpOcWastvP7xezbda1JyHiruP3WbZuPNtIKbMW6FubehfuN/6h+6KHctdogHSvz8tRDRMuL/3gRSMeRLRyNT8Rnf1edYAkonN+0rUkj/4KVTp1WDjpRg1Ltw9vWtQrCKOFTGqK47NUtP7nQiXg1Vd+tZ+tcSzsr+HIeWxcrW3iLP1D8u6KqzdgzXJqqZk6vFzdpbHtnoMJquale0dW7uGq9UrEmJ8p/czpP90h7r/t/l+X/MaZq72bl+JGLhm82p12Z15apbHfrNm56vLflvefQXwIDVvXqymWNK9YufWqvXqYo/EtWuwqnki7u2x7ScNtq2VlKXmPyJi6mPyalKLap0rYmf31QHtzerWJ/O7C1X0QckQbYKyXtpTnkTbaq37KnBZQb9viDuNiEY09++RQAqR/xMz7VOIvOuo0M/Jzyl5s9Xjx4+juroaf/jDH/Duu+/ib3/7G06fPt21vud6/eUNWefMvkEsD/jLX/6iLXfy5FQ888xTuCbzan2q3m3bth3P/cdafPzxIX1Mt8jISHz/n76HH/zg+732NU8UFE4HbNVlKNtZhfKKMpRXlaPKoy8+jSUdOTOyMGvmNKRfl4+Fc9J77peyrQpPzZmGlZX6c2nuWhx5aylSnA0oe2UDSu0pyJt3M/IyrYZ+Bc+RNrF95n4u2WlHQ2Mr4pNT9G12wF7fgFbx2G6za/21K9Z0ZKVaYK/cjOJ9DiSaW9FsSkF6SiISU9ORLiLIht2bUdqUgoW356DXe3DKvjLlTWen5iFHzLMn9voqNBzrwJmQs4iwZiHLs399o3O9DeeEAw3birFxr9iOhlo0Jy3Cyh8XDKwPeu1+Borfm98OmL0KG18sFZ9JM2oagVkPrMTSXKv+Yt8cB9YgL2s5KmDF4s1VWL+g/+8lovMvGLHpcI7XiegcE7Fc1aYNKHPOwqJzHYcNJF6yVWFzRatoL8xCekIPbxDza6j7C459NQoTp6fBqsduDlsDmkWI7mixuW4Qa0lBVpqIh2wV2LylBkgAWtvikZ6eiHh33FpdipLdDky7vQBZhj7xjeS0ZUcTMWtOVs/7T7vZ7N9wsqMTZ8MtSM8QbZ5etltbZyQixT3DNhsabO3afESIrd1/KSUzHVbZBtok4kRzPNDSjvjUKUhMtIrtSxHPq1D69n4oOQuRn9Fz7H+uOOpkP+xVaG6uQa1jChY/vgz5vbUz/BlIW6s3ThsqXitG2eFmNNQ3wzJ3OVbeldX/m62K95fel4WbX7QBM1dj/7ZlyOI9mIguWkGJ18XM+jW34RrYnzx5Uku+/+53v9NuvtrS0qLdEFWur3udzzW5jzIyrsa0admo3FeJr776CtHR0bj55pvwb//+jD5V3w4erMYvnv0P7NnzZ32MLkTFqLhReOjhpbj11n9EXFyc/gLReaQFoc1AUjrSBxrp26uw8rppeMrjpqDKgmI0vFEIa3+DJqKLjG3TEmTdsQE2cwGKD5ag0PMGyEQ07AUlsB+m8ToREdGIIAvE5k7Dyr1A+k/LUf5kjuHGx0R0MQlGbB2q/xxx5E5obGzEo48+igcffFCrgm9tbUV4eHhXIv58kOs1btxYZGVm4csvvsRXX7UgLCwMl1ySiO//0/f1qfonJiZGS+D7EJ9/VFQUEhISEBERoY8kOs8UK9KzswaehJdMCqIMb3M42tHuvvs+0cXIaUfFL5fg+utmYVbeQqx8rRZ293fCUYutm7bCJh4qcxcih8XwRERERER9ctRvxsoCEV/nzMLN961DWVP3ld32fSUo2SsfpaMgP51JeCIKuBGZiJfJbtn1zCOPPILXXnsNbW1t2niZfD/fFUAyMZ6ZOR0hoWE4cuSIWKdQLWmekzMT6elp+lT9I98nB18hiI2Nxfjx47UuaohGPKcd7a6vcRdFEcc+q+HpImbfuRIFD29A2Z4KVOzcjKcKp2DhL6sgmwq2bevw1CaZhk/HskfzkRKAK3mJiIiIiC5ojlpseGAhntoi4uu9FSh9/kFcP2c5SpvEa21V2PDMU6gSD5UFy7A4k2l4Igq8EZmIP3HiBJ5//nn8z//8z3mrfPdHVuJfcUUakpIm4KuWr7R+6+U4Wbmef/O8Aa9rXFwszLGyQzLv98n5xMbGaf3QD6ftJxo0R6urT0QPjuZmOLqLE4guOq1NDVrFu6eyzWWoPbARy+5bhwY5Ys5iLGIjgYiIiIiobw47GrQg2kN9MTZX1aLsF4uxfJscYcWiu29moQsRBcWIS8TLinebrRkvvfSS1uXL8OCqwh8/PhFXX30NQkPCxC/3Bi1JLrvKSU2dhCuvvEKbZiBk1zSjRsWJ7fT+mOR85Xh2S0MXCoetFjXGjGNLM5rtdtjqK1BWadOqgIkuJvGT05GiP+5SvQELcxZho/y+JC9G8a+WDuxms0REREREFyvZnWq6McNuR9mP83D9E7IWHsh7ejNWz2O/j0QUHCMuEd/R0YG6uo9htx+H7PbFXS1+PgvD5cmBMWMScO2112JUnEW7Oau7Gl7eSPXb3/42zObBZUoiIyMQERGuP3ORifiEsWMQZexUm2iEcTSWYcMzD2Lh/OWo0Md1qV+D6yfEI3HyLFw/Iw8r3zVm6okubJaMhSjM1J+42WvRoJ2VykHRa6tRmMa/A0RERERE/aKkIO/OfBgj6IY6V1vTencJ1j+SAwu7SCWiIBlxiXhXcnsURo9OQGzsKMREm6FERiE8PBImUzjCwkzaNHKQifrgd90SArM5DnPmXI9xY8fj7Nmz+PLLL7VX5DokJlpxTebVg67el1Xxsp94z77v5Xxl//BRUX5u5Eo0YthR9dsHseTxda4++XplQXw8E450kbHkYOWWrViW69H1jDUdOQuWofhgGVbMZJc0REREREQDkXL7BpT/qtDjylMFKdl5WPzsDtE+LWCXNEQUVCFqP+9u6k5o93PyoJHLb2z4G/Lz52tJb/d6dXZ2iuGs9vPsWSfOysfide2nGKd2qtp7VYjH2ibI566f+j+NO2/vbzu7k/oh2uPQkFCt65lJkyZj1jdnaTM5c+YMKisr8dVXLVof7jfeeCP+z//9KWK1vt4H7p13tuKXz61Dw5GGrpWTVfL/8i8P4fY7bte6qCEamRxoeHsNVq4qQcPYWcjLycK0zClIjLciPTMRqCtHybtlaBAhUt6CRchLZUREFy9HUy1qWxSkZ6RAYYUO0QUhGLH1cInXiYiIhj2nHQ3VDXBY05FuZVuTiHwFJV4XM+vX3IZTYN/cbMOiRd9H01H/ZbSuVdXXV/4n1lkm4mXiXkvYq2fFc5mQ11/TB9fUrnfp/7pvkypmKucrq+xlRbqscA83RWr7JSkpCdnZ2dq829rasG/fPpw69TUsFgvuvXcJltx7jz6Tgauo2Iv/94vnUFUl+ytzrY1MxP/k8f8Pt976HURHsyqeiIiIaKRhIp6IiIiIaPgKRmw94rqmkRQlEtdcc7WW+PZH7h/X4NpRIeI/mTyPCI/QqtSjo2IQExOrdSkjB9nFTVycRfy0IM49iOfdQ7w2Tr4upzXHxCFKiUGYKUxbhryZqntZDocDTqcTqlhmdEwMMrOu1sYPluyWRvYR39nZ/aGHhoaJdYpDuNgeIiIiIiIiIiIiIhreRmQiXianr712hv7MdXbCl5647s5fi4feFfDu5LmbPNPhGlz9y8uuZ9z9zGuDXJZ4S9d79bfLJL/bqVOntBvKholx8fEWXHXVVforgzN69GjExnl3PyO7w5Fd3YSHs38CIiIiIiIiIiIiouFuRCbiIyIicM3VVyM2zuyTTD8fZLLeTVbEyy5wZNc16Wlp2kmDoRg3biwSEhIQGtp9wkEm4sNCB3fzVyIiIiIiIiIiIiI6t0ZkIl5WoI8eMxpZmZlQVf/d05wr8kSAuyJedpVz+vRpbZw8WTBz5je08UMRGRmJmJhoLbHvFhWlwMRqeCIiIiIiIiIiIqIRYUQm4iWz2Yxvz/621uf7+ebuvF9WwstEvCT7sc/ImKo9Hgp3Ut8UHq6PgdY/fKQYR0RERERERERERETD34hNxMtK8bS0K2G1WodF9zSSTMTL/uFlYt5isSBpQpL+ytBER0drN5p1b+fYsWO1G8ESERERERERERER0fA3YhPxsquWxMREXHnl5K6K9PPFsyL+zJkz2rolJ18WkJupynnLG7NGR3f3NS+T/LLinoiIiIiIiIiIiIiGvxGbiJcJ6niLBZmZ13glqc8ldwJe9hEvq9VlH/GyIl4m4q++eujd0riZzbFiG2O05cnlRCqRMJnYRzwRERERERERERHRSDBiE/FSVHQUMrMyte5p3Enxc8ndVYx72bIi3ul0IiIiHN+4dug3anWT1e9ynpJM9ms3a2UinoiIiIiIiIiIiGhEGNGJeJmMlv2wX33NVK0q/XyTSXin8yzGjh2Hyy+fpI8dOu1mrWJbZeJfDlqf8bxZKxEREREREREREdGIMKIT8dLo+Hh8+9vf0rqDOZ9kglwm4qUr065AVFTgusuRFfHh4a6KeCkuLo6JeCIiIiIiIiIiIqIRYsQn4mVCeurVU3H9DXldfbWfL7J/eNlLTWrq5QE9MRClRCEi0nVzVjnfMaNHBzTRT0RERERERERERETBM+IT8bJ/9kSrFUuW3IP8/Ju0BPX5SsafOXMGkZGRSE9PD1hXOXL7LJZ4xMXGao9lIj4iMmJYdMVDRERERERERERERH27ILK5stuW9PQ0PLD0fvzzD+/F5Mmp2k1NOzuDn5CXSX/3zVplRXxMTAySki7tGhcIkUqE1j2NOxEfGsIkPBEREREREREREdFIccFkdOXNTCdNSsH3vleInxX9K/7pB3dh/PhxWjI+mBXy7oS7rIY/fvw4rrhisljueG1coISEhMIUbkJIaIhWCc9qeCIiIiIiIiIiIqKRI0TtZ5banXA+X92+DMTZs2dx6tQpfPnlMeyteB9btryJ2ro6dJ7t1F6X1fLu7ZA/3MXrchu7N89V6d69vXIi+dg1zrU/XK/J7nBkpboc9dhjy3DH/7o9oMnytrY2vFv6Hva+/4G2Fnd9/3u45pqrXS8SERER0YgTjNh6JMXrRERERETDWVDidTGzfs1tJAb2cl3PnOmAw9GOY8eO4ciRBtTXH0FDQwPsrXa0i/EdZ85o08iKdtm1TKd4j0zk6zPQ5iE3WfYGEyL/Ew8iIsIRG2tGdHQ0Ro2yIGXSZbjyyjRcddUUWK3jtRvIuvdXILi2Q66fUz5DZKSC8HCT60UiIiIiGnGYiCciIiIiGr6YiB8Cud6ufuNdg3zuuS2nT5+Gw+HQkvAdHWfFa2e1bm3kczmdrHAPCzPBZArTKuBjYqLFPgnV9ktoqN53u5jGvZ+IiIiIiHoSlMB+hMfrRERERETDRVDidTGzfs3tYgzsXZvavb1MshMRERFRIDART0REREQ0fAUjtuZdP3sh97fc6e6BiIiIiIiIiIiIiGigmIgnIiIiIiIiIiIiIgoiJuKJiIiIiIiIiIiIiIKIiXgiIiIiIiIiIiIioiBiIp6IiIiIiIiIiIiIKIiYiCciIiIiIiIiIiIiCiIm4omIiIiIiIiIiIiIgoiJeCIiIiIiIiIiIiKiIGIinoiIiIiIiIiIiIgoiJiIJyIiIiIiIiIiIiIKIibiiYiIiIiIiIiIiIiCiIl4IiIiIiIiIiIiIqIgYiKeiIiIiIiIiIiIiCiImIgnIiIiIiIiIiIiIgoiJuKJiIiIiIiIiIiIiIKIiXgiIiIiIiIiIiIioiBiIp6IiIiIiIiIiIiIKIiYiCciov+/vTuAbeNK8wT/ZVa9XVooMxRGmaUAZ2AGzq7pcw6mxrk2BQc4M3ADpuEGTJ/7YAlunJtOGg6dLBIpmUmkNA5uOplxpPQiLSXoREqwMaTcJivlEJ+YQ7xS7uCATMM5MQsbom8diD7YOHJgz5AYG2D1xcC775FFqepVkSIlMiPZ/x9QNkkVi1Xvvar3vVevqgAAAAAAAAAAoInQEQ8AAAAAAAAAAAAA0EToiAcAAAAAAAAAAAAAaCJ0xAMAAAAAAAAAAAAANBE64gEAAAAAAAAAAAAAmggd8QAAAAAAAAAAAAAATYSOeAAAAAAAAAAAAACAJkJHPAAAAAAAAAAAAABAE9XcEf/jH/+4+P/t27eL/wMAAAAAQP3K8XQ5vm4UxOsAAAAAAGvXrHi95o74n/zkJ8X/z549W/wfAAAAAADqV46ny/F1oyBeBwAAAABYu2bF6zV3xP/qV78q/h+JROjtt9/GSBsAAAAAgDrI+FnG0TKelsrxdaMgXgcAAAAAWL1mx+sPCGa8XlF/fz8NDw8b7wAAAAAAYDX6+vpoaGjIeNc4iNcBAAAAANauGfF6XR3x0uTkJP3+97+nP/zhD/THP/7R+BQAAAAAAKqR95iUl7fKkTU9PT3Gp42HeB0AAAAAoH7Njtfr7ogHAAAAAAAAAAAAAIDa1XyPeAAAAAAAAAAAAAAAqB864gEAAAAAAAAAAAAAmggd8QAAAAAAAAAAAAAATYSOeAAAAAAAAAAAAACAJkJHPAAAAAAAAAAAAABAE6EjHgAAAAAAAAAAAACgidARDwAAAAAAAAAAAADQROiIBwAAAAAAAAAAAABoInTEAwAAAAAAAAAAAAA0ETriAQAAAAAAAAAAAACaCB3xAAAAAAAAAAAAAABNhI54AAAAAAAAAAAAAIAmQkc8AAAAAAAAAAAAAEAToSMeAAAAAAAAAAAAAKCJ0BEPAAAAAAAAAAAAANBE6IgHAAAAAAAAAAAAAGgidMQDAAAAAAAAAAAAADQROuIBAAAAAAAAAAAAAJroAcGM1zWZnJyk3//+9/SHP/yB/vjHPxqfAgAAAABANT/+8Y/pJz/5Cf3qV7+inp4e49PGQ7wOAAAAAFC/ZsfrdXXE9/f30/DwsPEOAAAAAABWo6+vj4aGhox3jYN4HQAAAABg7ZoRr9fcES9H1vT29hZfj46O0tGjR+nBBx8svgcAAAAAgOpu375NZ8+epUgkUnw/MTHR0JE2iNcBAAAAAFav2fF6zfeIl5e3SjKof+aZZxDUAwAAAADUQcbPMo6W8bRUjq8bBfE6AAAAAMDqNTter3lEvKZpxXtM/tM//ROCegAAAACAVZIjbf70T/+0eA9KXdeNT9cO8ToAAAAAwNo1K16vuSP+gQceKP5f4+wAAAAAAFBBM2JrxOsAAAAAAI3RjNi65lvTAAAAAAAAAAAAAABA/dARDwAAAAAAAAAAAADQROiIBwAAAAAAAAAAAABoInTEAwAAAAAAAAAAAAA0ETriAQAAAAAAAAAAAACaCB3xAAAAAAAAAAAAAABNhI54AAAAAAAAAAAAAIAmQkc8AAAAAAAAAAAAAEAToSMeAAAAAAAAAAAAAKCJ0BEPAAAAAAAAAAAAANBE6IgHAAAAAAAAAAAAAGgidMQDAAAAAAAAAAAAADQROuIBAAAAAAAAAAAAAJoIHfEAAAAAAAAAAAAAAE2EjngAAAAAAAAAAAAAgCZCRzwAAAAAAAAAAAAAQBOhIx4AAAAAAAAAAAAAoInQEQ8AAAAAAAAAAAAA0EToiAcAAAAAAAAAAAAAaCJ0xAMAAAAAAAAAAAAANBE64gEAAAAAAAAAAAAAmggd8QAAAAAAAAAAAAAATYSOeAAAAAAAAAAAAACAJkJHPAAAAAAAAAAAAABAE6EjHgAAAAAAAAAAAACgidARDwAAAAAAAAAAAADQROiIBwAAAAAAAAAAAABoInTEA8B9QKf8tRQlv0lRVjc+AgAAAAAAgI3tTpbS3yYp+V3e+GAN7nK78Y7xGgCgCdARDwD3nltJGv35I9T60DY69MJpOv2LLmr3bKOux7dR56PHafqaMd9GJQPEa0lKfD5OJwOd9EDnIRq/fP+cYdCzaUp+FaPhX3K+tj5Cxz9JE86vNJJO6U/7qfuhdup+ZY6yd42PAQAAzO7opK+hjsjfSFM2m1/TMmxkDNjDMeCj1WMj/fIkHfe1UmdwmJIN6LtbF+5mae71/dTZvo1OIjaCexbHqedknNpKjwSO0+nX++nJhzvpEV8XdT3KsevrSXLcpWvcP7Ln+6nrwQeoNThKKXTINxHaG3D/ekAw43VVDzzwQPH/GmcH+GHlUxT7aJrmkvOUvJShQksrtbdrRJqHfH4fde/ZT4EdbuJPNqY7ad6+GOW9hyi0ewNvxw+Bg6zYMz7a/17W+EClUWhygaaOeIz3GwDn//RL++nQOynjA5WLej5O0cRht/H+HnI3T8kPIhR8epIq5ajn2VmafzNArhbjA6gdl625cwlK3ynIMxyU+HyCpj5PLTdgdkRp/sIA+dqM9wDQMM2IrRGvQ6Pkv5mk0c/mKXMtTZlbGUqnEpQsD2To8JJvs0b575KU1l2k6fk1dfpqu6NcFw2Q32V8UKPsNzGaS2Uoxz+up+Zo6pNpStwor4mM99I0dVij1PkYJbMFKnBMkU7EaPLTOUqXK7qWAI1cmqHI1o0VXes3EhT7coFyd/h1Pklz01M0/c1ypOQ+MUuptxAbNZ9O6fPjNPreOI1/YuoA3hGmodcGKLLPg3Zbg+nfDlPg8X5KVOq43T5A/8d/3E//8H/Vtn/oN1J8bMtT4eYCJc6N0uAHydJMW/oofnGo7uPSSvKXYxxrJ4tXaRdu87H12zglr2codYUoPJ2ksYP3YHsO7Q3YwJoSW/PCaiJnrWN2gB9Gbl5MPB8UXq1UPitPmvAfiYjoxwuiYHx1I8l83CM4BhC0MyrmbxsfgrPMjOjpUPPfPLlEz8cZY+aNoZAaEQHHbSlPfjF0aSOW7BrwPj6w3Wmby5Mmgh8uGjNDfQpi4e2AQ5qapl1DYuEeLVoA/9zK+1kjNWOZcB8qLIiRPaa6oNmTOyxmrhu/XaubsyKy2WFZS5NLhD/LiMLFqPA5/t2YWoJiIm0sc6P4PiOmjrict8eYPC/GRc6YHZqjkJ4RA/s8julfntyHx8QC2m4NxLHraz7HtF6a/upvxNDh2vaPTCwiPA5/L05bB0S80TvR9SnR43b4reKkidA92aZBewM2tnI5bSTcmgY2puIo2X7a/0Q39f42Rqny4JfNQYq8HKXomTGamJygkTMDFDnoIxfplPholAZ/vo1aH+ul0a8dL1hbtwp38qUzxu3uyiNb9CwlP49R4tpaxiTdA9o6adsm47WTjiAd8q/TkQYV8lDbGqGp9DzFL8Rp5v0I+dQy4PKQt+MeHW/j8tHgl4s0n4jT7GcjFN5qfL6kk7yeduM11Ecjz74+ih4JkH+7m7QOD9n2jAddGMkFAHC/0bzU++YUx9FDNPHZLMcfszTxVKUrCTUKnpmheTkyPVcgUchRJrVA88kFWrg4QyOnIhTcYszqyEfRT4coWC12c+LqovArvOzdPvK4NHJvUYetaqS18bQ1RP0vhsi/00uuNjd51Iqujeu5jTZqvMVN3c8MUnifn3ybNHJtto+6drXzthuvoQluxKh/7346/Xna+EAj//NjNPPFDE28WW5/EmU/GaTRC+V2p07pr2IU+ya7pitI7m8atW/hfdl458R36Of0PzxX2/5Rdd9va238saHNQ937AuTb6rQFvG0d66lNs4ryeitFsXOmK46K0N4AsDE65FckZ61jdoDmub0opl70Cz5YL5VLIrcIvTYrMpXOpBYyYvZMj/CW52/xi4FYZoOMjl8+i6wdnBCZ742PFZnpcGnU/K77fdR8QSy+HyqlhcPkf21+3eZ7TXlYWBRjBzTrdnX0iJmNNch/lXhfOOO3bjt5RN8FjPlqiNvzIrrTnLY87R0TixihAtAU5f2skZqxTIBi/fumWv+WJ7eIfLFCPfx9TixM9gm/y/59z/OzIlchtq3H0tWjSxOv15yyXrwes88qI5hdPWJqg8dQhatjItBi2iaefOs43r0X5BIDy+1KOblCYiLN5fztoNJGJeF+aqbYfpP5FJT5pAXFWAq5s2o342JghzWNlyY378/K1TVV94/vC6Igjz/fZ8TEYaV9tb0JI+LLnGJuOSJ+cv0cjOour/L4+nzp+OqtdlxHewM2mHI5bSSMiIeNRT5k5UwvHXojYTozq1Ho/ThNvBwgd6VTqZqbAi9O0Pz1GRrYze/vJuj0z0IUPV/prtPriTGih1/pury/ZelTm7uFUpp8G6d5edO5+5ZGnmOc1x9HiANkq91DNHrCt37PuNeSh/L5By5lC/gz2mijuVZJc6kjRXjfaFm3Obrx2I4v9/OxBAAAynS9Un3QShqHIVW1uMh7ZIjmLs3SkOX+xz4K/6L7n/k+5rxd9+JDAvHgw+a5m+d2xiSZn9zk2tdLgbY0Tb8bqxw53dVLf9PjlEhtrKuz15UOP0U/j9PQPnVUuZvCbw9TqJara8r7B7chiqPe+Rjl2Wq/6qdpLQytk7yPqutvrMt6sZryaqRrKpGgdMUdgaG9Afc5dMTDBqJT6myE9v8mYbwv8b8Wp4ljtT0IR9sUpOhHMxTZzm9kZ/xz3Ci4VfrbetZq7mh0rKB1ymWNy8a2+Gib2lF739HIc3iEZiZDy+VCC9DI7yLkU2OedaPWPNTI1ab8zeWm9vuiI16jVuOk1DIXtePBPk3j6ujk44/xBgAA7l+Fyh0ltXYeaZsC1DcZp7GDRk3e1FvrdVLngzUs29VJGz5sduh0b+9YtwHvPSBH6e/Kt6Qp6dzcSVpbJ3lsnave4skmt9xH8hnKFPPKS14P8mdN3H4+lsRoYIfxnnmeHafoAYfbj9a4f2g/Ml6U3coa+dUELa5imbFqp87OdXQwqru86pTNZoqv3I/5qJ5NQXsD7jfoiIeN40aMhl+ZLnVUlm2N0OCxOkc4bwrS0KdjFJRfujJO4xc2wKj4tvbSNsrRSE4BwV2d0qmF0uuHPeT+547tmhW01MlzIEojRzwc7Pgo8v4IhXeso+BGVU8eqkPP7qfARVM74vkj439YK05bJCYAANjoVUbEu6ldHSBQjeah/UdDpXs851OUutGgkcErDstnHC+13oP1nMbbjur7B3QnS+mrxmuDx+PmfHBT6NdDFNpsfMilPPjaOPXvKgX1mXSKit33HR7yVryMG2rm8tPJ1wbIz0npPjBEE68ESyc8FLXuH5oaBN8tNLVNq9lOFK6vEfF1l9c7aVowHtzX+ainypVOaG8AoCMeNgY9TZPPhWlc6TMPvtBHAYcT3yvRNh+iyDH5xTxNvjm1/LDX9Uo3blnyvWwK2eW/naDxz43EyeVJ/wE7wrNfjdJxfye1tz9ADzzQTk/+8iSd/O0c5ddDZ3ybl8KTiyS+n6eRI9513UipPQ91yt/KGa/vNzoVbhkPLl7v9CzFfnOcjv8mRhvmTlHy8ly1H+PuRll5AABoGo5JKt4asaWdOuvpiGdaeYAJpWjqfNoxtq2X7ESzroXTUnketfNrPcSrayXrb1sWbJD6eyPGS3cLlLesq4tcHaXOXm17mKYuLdJ8Ik4L1zM087K/1CGZnaPJs/FSrtzhWHajbOs6594XpXhBUOazPvJX6hOocf+wtb06uH1r+17jyFHgVvIq3yb+YD3qLq86pc6N0/QV491NbsuWXtqhvQGAjnjYGLLnT1Pfp0r3mxak3j2dtXWu3s1T8tNRGnxhkEbPpSjPFV33L06ST/7t62mK36hw8DdVyPqt7Ko7l/VrczT6m2GunFZTyZhuWfIj2YRQ5JM0caqfpq8Z729lfrjg7kaMosdO0vjXnDbF7MnT3AejNJWqUvmuazplvx6n069PUvKHvGVRnXloG5X2EDdoGz6CQqf8tRQlv0lQ8kodT8tvMl0N1Fx8DFgnMWsRH2vSfEw5/YsA7f/1OI2/NkpzP+RFN5ZjFOdhto59Uc9T5qbx2pCXz6UwXjddPkWx356m0c8b0yljIUevXU5S4uskpTfEmRwAgPWkyiAAecu4emOQVo3K/TCZ6xzzlOuuNcTduoydjNclHD+r8RLHEJmMsh08T0MHsKxhG1ZLv8Pbfsd4Yygo7ytrTLynZ9OU+jZBiW/StW3zRo6XeE5r0dKsz29q85Bvl5+8m4zP5DPO3hukwfKAGz1Dmboba2vLp/w3o3Q8uJ9Onk3V/d2Nrtb9Q9OU51Bx4zbXtMTiMrOps3Rl0BL+sR/geLGiVZRX/co0RV8Zp5Sx/plspvJxdY3tjbqPNQDrEDriYf27k6KJM+Nki822d9d4WZ9OqXcOUVfoJJ3+7Wk6+bNDNPRNnlxb/NQtLx28O0+Jq2rlolP6037a/7P91PWQHOn9ALU+1EntrZ3U9dNeGnwvRqlKwzbyXDlcy1L2SpJi7/Hv/fxJ6nr8STr5637qfWWaUlfmaPw3x+nJR0vLfaD1EeryP0mHXuAA9LsKy6zQwNFvxKh/bxedPGf6Xj7TxKDBTKfkB4M0+h2/3B6ingMccG4uhRPZD6I0frnySug3EjTJeTH83iTFvm5yJcqNLpkXc7yux5/m9TWNvNJvpCh9I0vpb+do8nXOn2A3+fzHafCVXoqcTVL6q0k6/dx+2tZq5NXDXdQdOEQnf8v536DOvLrz8C4HKmowlDGCnWKjJkbjnLanXx+mUZm+XyYoVelEk4rTKv01b3Ook7e3ldo927jsdlOXt5NaH+yi3te5/DawE7NYDl7nfeHxLt4HuunJn3Haf5CoOiJKzysNaE6rUnJwPl+eo+n3hnnbuWy9M07Tn89RYjWNSk7H1LlRGn5jlMY/mau8r99K0OknWotlo/MxLhuPb6POH7XTI/5DNPiJ8Qgvee/Zu6li+esNbKNWWY54an/sST4ejFOikY1OnQPn1w/Rk1yOO4u/w3nY2U6tndvoyZ/30+i5ZPXRZndztoaKq42/b7yuqtY0K+MgPH0lTVluVCb4e4NPH6Jufxftf2GQTv7yNM1dSVHsHU6zJ2RZlNvSTtu4LD75i0Ga/LrGPL0ll3GSun7E33+wkx6RecS/8Uj7A/RIkNPjyyZ0+AMA3ItaNHJ1qA9LN7TVf491/XZ+qdOltTiSfQ1xd5FOubzakeqidtuZep2rH2U5qzmR4Git22CQ9enno9Qf4viL673uJzheeGGFwTx38qSeJmmt9vycBsV7+e+4TfPKk8XYprXzEdrm4/V9/BFq/1EnPfn0MMXK7Zp7JV4q5s0kjb4zTXHL+mQp9rtB6n/uOB1/aZKS5rS7k6bJZzh++bX5GWd5ytyppSw0KC6XHatvDdL45zEafTtG6WyKpl/oKqavjK+6fs5/+6oBg244fZIfnabjz5wulVdO59RX0zTK7d79j3H54Pw++c6cPW2LMeQwnZRl3tvO69RJ3bL8fFvbOum3uO3NvzP8zHE6KQdTqWlS0/7Bx4EOl3XAm9tDneb57nC6vT5Ig9ym73+BJ/l7L5yk3p92UbtMS99pSqypnbR8LJInXVKXExQ7y225GtPBgsvdnGwT/XacJj/n8lzriblVlNf8V6dpv6+XJm8YHzB54rZix/oq2hs1H2sANgpRIzlrHbMDNExmOizcRvkzT+5jUyLzvTFTNbcXxNBO43uaR/iPREX8phCFi1HhKy7LL4YuFYyZ+fPrM6KvPH+1qSMgBj5bFMvf5O9enRAhl8O8xqTt7hGhLc5/K02a8D8/IRZuGws0LL4fLP1915BYkD9YWBQzp4KO6VKcWtzCu9MnfFu9wndwQMykzWu5WgWRSUyIgWM9oudYRAy8NiT69rr49zQRfDFipGV58oloUv3NglicjorQDvkd87w8aW7hf3ZCzGfWvp6F1IToOxwSoQMB3n6PcGvKb+0bE4v8M5nPnMtVefId6RG+Fue/FacWnwi/Oy9ytZRBJ6vNQ/7eyB5l3q19YubChIjsdkhbY/KemBCLSrmyyC2Iqef9jt+1TDsiYurqGvPp+5yYf7dHeJyWz5NrT0REXwxw3rlFz4fmfawg5k95lfl5/52bFSPHfMrny5O2m9Pveg3rfDMuRk4EhMch311bQmLoC14XU34XUiPCr8xnmzgf3dXK0eawmGrA/pm5EBWBNoflK5O2KyImLuWMbyluzorIZuv8rqMrHGfrTLOi2/NiSC3D5skdFOF9bue/GZN7H+dpxXLIx6oLIyK0yfm7y5NbhN6Mr34fBlijcllspGYsE4CDBBF/0bNUvizT9gEx71CtFK7PiqGngqLnNYfjbCEjZt8dEiMfx8W171Yfdy8riIW3A8p3OBa9qMz9fUZMHVFipc0RMcvtgrVYS9vBrJCeEQN7NOfvkkf0vBoV4e0a1+UDIm5K8+U2zfIUeLfC7zQi3pNx3Pth4XX6nnlq84uBLzL3SLzE+8CrlWPN5cklej7OcBpxmfy4T/grtgs14d7Ocf4Or/By+3Bojr9jttp8yuUs+1shzTHyi6b2RodHuMzfX5r8IpqoEB+qivkfEaHDETEyPSNmpif4N3qE3728PO+zQyKy1bx886QJ7+FoKY7jdvrECTW2X568R0esxxf+7fiZHhE8GBKB3T7h2aS2fTyi74J1O2rdPzKTIaGZ51OODbm5vqptR2oLiYm0MXMN5H4RMH+/JSCGOC0HHGJg14GhYv/FSnKXuB18wGvdjuLE5W3vgJiq1AZYRXktZOJi6EiFekFOHdyG5basd6tPBM39G/W0N+o81gA0Q7mcNRI64mF9KyyKsQPOAan31HzFQNaisCBG9hrfkx1ylxbFYmJKDOwufza0VDEU0lOWoMG9OyyGPlsQOflD3GiYn+xTKnKPCE+bDvrXrd+vOG3vEdEPZ8TshVkxxcGEWrl4X41btm2pI57X9Yv/GBE+tXO56uQW4ViNgVUFuUszYuioz6FSL03+Z/tE0FRxe5+dsVamTkGWyyv8Oz3WZcoTJSe4ol7D6mZikYodvHLyGeUmNzcg/NUCfmPyHBwQY5/NivjcjBg5oQbgbhFZRdouTq8hD2VHfLk8V5g8OzhQcuiE1PaNlE7kqHiZE8esQZ+HA9+47LzOzYsh5ff8To3qWskTEK8GlvLdeyQqJmKcvl9MiZGXe2zp4n9rwbQvyI746o0gbQtv+3aHTlx3DzfgjMU4yFwYsjXM3Dv9wmdqVMjJtT0korJRKb/Ex4T4+1EReSoiBs6UT0xZ51+a2nwidKJPhPfZGxvFfKl2kmQFmS8GTCeNNOHjNJ26yOso8+jmgpg5pXROdITEWMqhINTZEb+qNJP4mDx2pHpHe3HioDp8ZkLMzMXF7GTU3rG+27k857iRbdm3Wzg4n+bjODcy5L5nOT5s6hETaz2xBLBK5XLYSM1YJoCsf+MvV+gsk3G0w2F0qVOrSkf3muPuJXx8d+iIH1IHhTh1xG/ps3Rq16tR25C7OCbC5eV0BETf21PFdsLMh0MislepM91hMWNKU6eOxuD7Dh3xjYj3uC6df1vpsNweERPJnCjIEywvW+M01wGuq2/eG/FSjuOenj0c5+ywxzDew32i70RIBI9GxedfjomeWtqDpsnS9ltlPhVSYyLUwZ9t4lh4F09KTLc8acK1NST6Xh0QkaNB4TVib9/Ls7XF90770WomjduCS+nkEoGnBsTA89YOfTm5Dpo644vt+konq3hyhcTUdWNeQ637hxykZTlJoXas314Us+8PiQFuE5uXJQeQDLw/I+brPVF0fUKEqrUH26zb6T445HjSs8gY5GQ9UeAulgPrYBlNePf1WU7eyHJTb3n9yyf+qsIJnQqTZkrLWtsbqznWrOH4AFBJuYw1EjriYX1zOFCXJ8cAs4LFyZ4KlYXPcvY/lzAq6k09YmRuXswnF0TGckDnCuE1pfLdo3QGcUW4eDEuptRgbml+tRItiIW3lHmVRsvih0YltCMqzn9cfSQ3aX4OBqbElByhMDkmRt6fFaseaJ6JizHzKApjcm9Wgy+X8B8Oc0AXFSOxBcsIWDm6Rz054T5aHp1dGmU/9GzQ2jm2ZS2jXrgxlpgRE2ciIuBwVl+WmyUcUM1fmBFDB52DSe+LSkAqA+PD1nldR2q8MsNkpdH4VfOQ18E2It6YtH2mssXlUA1Qih36auPvNge0+5SAVjbwTLNlPlM6L7Wgc0duDQqXRkTACAjdTyknbKTrUyK81OGqnuhwGhFvTO4e0zrJDld7GtvyU5KB65tBa5AnjwvlkUk5bpi9OyB6dpnzXROBM/bGaS4x4DxiY+fA8igW/j17Z4ZDvtRs+fjh4vyfucjHrdSirdyO7TP/XqnBZ4vlOe171H1GXkHSlDQriFxqXsx+qHZQGBM3pNQylrvADWjLfPbRjk4n4vxvmk7ayiuklAac5/kaG54ADVYug43UjGUCFOsaW0d3adIOcExnO4YunzivFic1JO4ucpjPYWRssT5UBzN09Fhinno1qu0wc8IYWdpivVK3hJdxxjQ6WjkR7TRS13fGPJCBNSLekzGMbVS4VwyY0rl4dbClI9UYIW5yL8RLIctABGu8utIV0jJNgq9NcJw/VRpN/taEiJc3aw35VIyxaxjo4zkxJeKTDoOC5JXXNXZkykEPQdnpb/6+Om0Pi6GPZ0U8JU92cGz+YaX2OO+rc6b0c+g4950y5cPNBTE7PSYGjji0CbbaT6zVtH8wW0c8p6t9hDuXo/eXO4c9T61hAFlmRoSVkw5ych80rhaQvs+IGVN7zvu8Q9tJDng7qpwc2hpZuhq4cHVWjL0WFgHLb/mWRpDXXV7//Xvi3ecqtMfK046IGPm41Jaden9EjMVM/Ta1tDcadKwBaIRyGWskdMTDuma7ZMs0WTpUV8KVWPwt62hb1+6IGLtgPVgvdXhvDYpAuTNwR5+YNQc/00oQUWF0aXHdLWeg5cQViMNlf4XkkBJwyPmWl7lojCrSjNuq5DK5YmVWSNoDFdoZFfM1BlFVyVGr6tUI3DiQnW3F35aVnzIaVgZJlpS4PS+iu6zzyADJnJ5lsiFjuWx114DjfDXjPJ84rKw/V9Dhz+wLzXysnG2X0yZr0FvCQWT56oSl+VZ3SfOq85DzZUhNU+M7thFdMtBRAjzP0TFLkJ2J2TusbR3kN+OiT7mlUrDSJc9VcVC1NKLdeV8opjHvh6V9TO1o5e+/6BD4aQExojZai40pJf+3R2wneDIfq40CjbfNHpzL5U1ZRifJ2+Yo8zmObLEGjZJsYKgNUO1Aad+um2y8P1VaL/fe4NJyPU9NLS+P55l93mjgG5MmTwiqZcypQcCNfXW9Gppm8hixw7ys0uR/02F5OXs5DJivmJCd7OUrnZYmtUPDYR/ewsckp6II0GTlMthIzVgmgGS7bUN5kqNad/tF4ECP6DkYEP5dfp6Wr8zzvOjQkWloXNxdEAtvqrfxcIvIF8ovf78oJtTYVrOPoK1HQ7YhvdwRph2ccI4HuA4cMOpLdfRo7kKf7SS091XrlcONiPcKcj3V27pstd4mpzha+pgyaEUd7brR4yVOh6Bl/bl9EbM2Ggq5TKmT32lQWUtAjFW4Gm+t+VTIzIupt6MiempAhHer7SCeZHshvVyWzFO1qyAd3c6I+emoc+e/bDOqcX6xbCgdxjzJEyOWQWocP04cVNbdoYO94HRCp3wbV5Na9g/J1hHvNLpeXgFjpL22N7q2tqqMa50Gq9lWjOPzpUFKsm1kSgiHMlvxNkOZWevvtQXFiLGsusvr9wWRuVkscWLxXSWu5qnqIJca2hsNO9YANEC5fDUSHtYK61o+Fad547VK1/XaH1zS4ib/sxM0fztHixfjFL+UocyXIxTezaGOiXyAEFfoRFdiNFd+4Mi3ExQzPQlH05RHidyao7lL9iezaB0e8nQYbwzagT4K7+AqXqG5OsnDUfyyNKWuZozXRJ4DURp/MUzRF/cX53O5jYfJaC5qVx8wlc9Rbs0PP9Updbbf+gBR/sXQhxM0sMdd/G1tk58O7bOsNCVjM6aHF+mUPjdK418bbw3+p3up25rsRa6dYTp5xJQ2X5+mQy9NU3bV2yIfLKamtUZam3WdJe1hL3GAZuF/LkIB23pq1O5WnnB/Y56StTx8S7GWPHR6qFjglyHyqZvr8tK2TcZrQ/rsME1cNsrr3TzNn5uxPQjZ8yhvo/k3XG7q8lrTbT6Zqvw0/Er0HC0kksabFI3LB0bZkk6jTm+XkR+8n1qeWsvrYM8+ch0M06Gtyh+0dvJs7TTeGC6P0tCnpgd03krQ+DvTZNl7N/VSZJ/X/jOah4LPnCSf8VY+mGvyF700/I1p/Vo4L5U8KO7zO5UPOT09Sh7ql5KUrvVBSmYtGnkf7yq+zJ6PcaqWpD+ZouQt4w3P06qUe/1CjObVcivXSS1bDyop0eg00/jYZz34EbnD1H/YaXku6lT2yYVLnJ9GOdSvzdHUV6XXSzq2kbfDvCTehx9V9vfv4rU/0BgA4D6ludqdqmA++KYo8VWC5s5N0uSnc5T4OsFTkpLlOFovcLxhvFY0Mu621V/USupX5We2+eTDYm3frV0jtiGf5ljSeKt/OkKT3zhsX5uHY7FSPJHPZqhgSlON63k1byw/2aB4L5OYopgaqzzqIbf5KxwLeR8rpsiSfHLeGuPcA/GSda48ZbLWR1NqvO7FtOV4tFPZLPmwSseHZzYgnzS3j0InBmjg1ShFnwtZ2yzMuzdA7ltc3r4zPljiouCBbnIr6V1Vm5t8+3oo9ITx3kTbF6Yetc3L7fHA0+HS/rKEf/epXmsbhmND357l6LFI7l/qAznlg6KNl0seVB64ylbcPwy244B8gLDpi/lvRqnXf4hGZdrtHKC5yQGHtmId7hZIt5QDD/U+HVT6BBi35/yPGa8pSUNnlttP+pUJGv0oXXpj0LhdZEt7yd1N4ecCxht2J8Zt7yjNcfmvu7xymrqL8TXvMy57muduqQ/PNpG/o6a10t5o2LEGYJ1CRzysa4Uqne2Fikf3KviA7dnpJ/92t2PQrW0JUu9u482STmpvNx312938iVme0jdy9vVsaSeulywCBwPUqdZUEldm1gqJt5uDqaVltnmp58wY9e1RanuHwIJ0rvhWkzYm+rVpiv46pmwTNwA8pi3XPOQ/qAR4X5+mk28lSp1012I0+Nw4WUIDLUgnDzh0sEmcN74nSgFyWf7sEE1cXuXGcHq2t6lRViu5nAKvNs4r43WJnw7trbCessFmvCzh9avQwKxJ3XnotFZ+Cvo99r/IzmiPGk2lKJkyyuudFM2dV8N9jTo3ddqWVbhrXaHsxVU0hPQspUwFInu2lx55cBsdf2OSYt9ml8qbtiVEkRNBChzpp17l7ILT1nfv9Ts0HHg7OGBTpbihki/ml07JdyI0+KV1u7xHwtStnLwo0zb7qXuz8aYoSSNvx5ZPFvE+71ZOvskThiqNA+HATuNN2bU4JVbVGczbuSdEQTVh5Akj02euh5STEnfTlL6l/J48ZqnLyXFZXCrfTUgz5lIOlO59QceTdXJbtR8ZLw06l8vy2mQuxihhvF7i5uO1U6GxSBVPzgIAQBUPuqjdeGmm7QrTwKkoRc3TqxEKGsdxNX4wa2TcrXHMY5Wj/E37b9sGZNzJU+ZO5XVcSSO2IXcjRcu1UIIGn2inzmA/jX+aWI61WtzUfbSfQnuDFDkWtNZtWqstPsrnTG2oRsR7d7OUPD9nS3f3Jo99QIma598lrZ3ZGz1ekvGIspxcvlKblWe0xah6sY1r0+C4XOvgcmi8LtHI43VzWzjMsVjP8qCEDj9F3p2j0YOr6FXmvPRuVeNtN/U+VRo8pnJt6VZiPI1a1cSUbMmTo7SyP8v2m3k3k4onvdT0Xmn/MHFYk6Lsl6fp0BMnaVpmz9YIzZyLkl8pw2tXcDxmyfbctu3LaZz/dJxi13g+PUXjLxjrtITT/phz2sut8zweMA2QYd+N0vA50yAlmQK1ltcynl/9OZ2PqdZTUyYrtTcaeawBWKfQEQ/rGFeQVc6mZtMZUwdRg7T5qO98huLvcgNit58ChyM0FJuivh3LtYV+215xZ6/zuhivl+gZylgqRhe52uyBQJnWZryol61CMv5fA/3GPCXUOLCjm3ybrWvv8e+nbmWDUhfmKcOJkb04RbHyCBODtq+X/JsqpgB1bvVx+GCWoInPUxXLQFWcDubRQmVOZUa/mbGOPmlptQcISzhgNF41TL15qHRGcmpTzilAauGAa4vSoGCZcoNC50aqrTNdo3a1LHKQo982Xpd9G6d5W8NkBbw+9lEWHES+1Ev7fR7q+ulxOv1JivJtXgq/PUOzk332INe27ZUaP7wdmz22kTL5W7lSYMiNndhn5dH5ZV4Khbz20TVlbR7yPWq8NmTPTS1fBSKvblDLjcPxohiwqnlO3NCTO84qaFvCNHN9niZeDlFgd4BCJ6I09ckgBcppx/mXv6OGw9ygUX+P80cdoSavziiduGDNSLO7BcrcsB5sWtvsI2vKNKfGWpGsL3LGaxNupNnS+nZeaRzkKXExvbydAABgI6/edOqm84X6aPBVOQLXNP16kMJ7jZrhTr7yVX4Ni7s5NuvgONt4V6JTzlb3yasllQ77u1zPra76LWnANrS22Ttas58P0/FQNz3yaBcdemGU5m7o5N43QFNfzNDIEWXwRZvb1kFV4Pp7KZ5sSLxX4HrWnlCtctCL8tt53l4LPU5x0xUCGz5e4vzyKDtDPudwFUNRHeva6Li8VU1kLv/FQUrcPjg6QYu3M7SYKZC4GaeRp3zWUfe14tixVW00bdpPIX+FTn1ur1gudpWDpB40Xi7RSHOr+wR/ibfbTJcjypVji/zMZqX9w5C7lSkNJivjbZMxYpr3xb5fDtKc/PntfTT75cjSicY1keXbspG6Y9tVrmcub9quuwuUvJQn/Vqcpr80PiuTaf945ZXT3F4yLqwx6BT7ZK7Ydi+xpnFTrNTeaOSxBmCdQkc8rGN8kOagWg0hymTnTVOqCs1N/qdGaObTCRo6ESTXlUkafuk4HfI/Qq0PPECdPx22jvJmxUpTrTjlZZc1dq7rdzKUtvRFcQAiK2fjXUWycaMmgttDnavt1DfoHEzaurRkcKj+VpuLOtWO0mspyvxDimbOKrevYF6/r+roVK3TQ9uUCjZ1sTyCeRVs38tRxml01IMVLrd2oGfTplFLEn9TWee6rCIP7Y0SDoKLwaKKy5F6axETWe4yyskSKXd5hsY/mqbpD4bp9G9O0+lTozR9zfhj2d0UpeodcdDmpeAvTJdEWuiUOj9Ogz/fRu2PHaLBs0nnfHfYTls7wyA7bSttfT4xQRPfGG/KOnzUvblilzL/djt5tijB7a0kzZdHZvG6aWpjglfOvg78ie2EQp6PaQ5X1tSK173ntSmaOjtE/Qc8lDk3SoPPHaJubzs98KN26n5FHSvOjTjbMYsbaOrK6vmlRkFz0qzV3oCrhNclfd2aQvJy4xKdMtYznyV3MzT3ySRNfzpJo29wWf7NIEXPztuOTZnvsvZjHgAALOO6wKmOUm/lUVS8ZUBpBGf20yn74A6zBsXdciSsdU30YtxqWWeuM+zry/Wh04bVY43b4H6ih3otV4+ZZJM0/duT9OTDHup+ephi6u05mNx2tRNVjkgtz9mQeE/WwU4d4LfiNPUB17OfjNPw67yMXw/S+JfqVWb83WumGGejx0vyRIIS+mSuVDihf1eeEDJel7V0UqdD7NPouFyOGFevGLWMPm9zk8dyr4/V0dRA3CkdDHo+o7Qn5a1cndZBzWE5Ktt4WaZ0zBfdzNr255X2j2XqenAM+UqAHgn20+RSevMxZO1JViKvxrEEpJ3kedhh4Xw87drTbVq7LE2d+z/pq6lxmlPT+jE/eauN1HdxW1s91lxKUKpcRusor2WFfN4WV7vcbscrqIpWaG809FgDsE6hIx7WNc1jv3f3Er2wfMBuIP27GJ1++kl6pPMR6grsp+MvDNLgG+M0/bX5si2rVqeOWFmRWb6Qp1SlioErYmsFxo0Hx1G+iqVOKJNO4x5va6DZLqFldxwuzeT0twVF3MCRncIywLHSyLOpeoe3vKzYFijdzNg7qmvBy7Ff6sgLcigzuq7ky900pRzOxMvv2+95x+9Xs35lDclDbrxUmN9pBLEcmVUkA0BbeuRp+pXjdLznEB36ZT8NcpAz+LociWX8eUmB8uponBVp5D0cpajtEm7FlWk6/Ysu8oZOF0eArWS5M1bR6nAZvRxxVdxmzsviBybyBEi1Asq/0+qyX/qevVnee3nZDgNxbFpaqd3W6JD3P698xUx1OmXPj9LJn22jTk8XdQd76eQrg3T6d9OUuKKGxmUOZaalnTofVlqWlvLRjDTj47hyrEh/l3buFJejFpXNyZc/4OOtLkc3qb4ZppO/7KVDIU6Tl7gs//o0DX+UVPZh3rIcHwMcjg0AAFDmXB87xx8ade4IlGJ4rgOqnW9tVNytPcT1kfF6iUOA5upU56owCrUOa96Gjm6KnOpxvOJgWZYS7/XTfm83nTyrDFLROG5Xvixv3bakEfGeUwcdS3/QT8dlPfvz49TPscfgb4Zp/Ct77GEdMb7R4yWNXA8Zrw35fOV2qe37Ls4vpxNYzYjLLcvrJM9Dq0u5amxtjSoDYWQnq7WP1T6qXeaT3Het+479JJpsN9rSlpdl2+dW2j8MtuPKd5N0+j3lStDLp2nwo1Vera3idbBeAcHtT/vDs4rUspW/eo3+6f+zz+verN6OSMFl13YV/h0ZXy8vq+byWuaQ350PO+RN2UrtjYYeawDWJ3TEw7rm2tRFvgpndfXUKh/WU4X+7Sj17t1Pg+/NUXqpQnBT4OgAjcTmKVMQVLg0RH7jL2WuhxwqG36vVui2yzDLZEBnvCzh99xqqVLllXDFp/6Gixs8Tg2Uesj79wVsI3OSNHOhcoOiTHvUS+4f81zfGx8scQhkVU5/v5ZWArYacf7lbB1zTpec8prJoMR4XSLX1Tn15b1FrX9xyWxYvbrzkLehjg5wp3tuLj3omH/DcdXdXvLt8pNfTntDFD4apED5/S5faaSFi8vIo6vY8A4/DZxfpKnnlYcwOcieG6Tjb8ZNjU1e73qCq4LDlR3lwNshAJcNvhWvbrD9Pbs88kKupzmQZFqHQ17ezVHOVqi5XFULcivSKf3RSQoET9LoOVPDoMNHoReHaOpihgrfC1r8MGQr406jW2yNKXmSqrxNzUgzarWdMNPa+DPjtQX/ltp4WL6/PC/DcZ/VyLOjXHb9FDwSptDe5fe+HaVTvd4nuqhzpe0AALivOR1jiTJZ53rZtXeIFoUgcX2s4m0cGhp3c12irqF9IAfPYwvaOLZwqt9q1Jht0Mh7dIJSiREKVe+N57o4SaO/PElT5pHxsn5UNkvneHcp4uXfccy9OuM9x2W0uMknn78lvyNv93Ksp3iLnqV6dov8lpu6HzfdTmeDx0t6NmV55lFROkWOF4pybGLbLvlsKqdNaFA+LeE0tq6SzvuE00quja2twYWxUjtGv815arxeopSFYipo6lXxnO/KMuUVBLZ9/I7DwIqV9g9DxQdSK+bOjC7fYrGh7NtYwht5RxkI9uCfkfjenpfOV0hb2ebIp2ihfCVGPeXVIH9T/XN7tS+wqu0N5vjt1RxrANYpdMTD+iZve1Cpv86poq2DfitrHU1yK0HDJ04ql/q5qGcyTrMfRimyz1d8Urfm8tjuc93ZoXwgOaxbxnr92RI9wwGd8bpENgqMl1U4XWq3YqdYLdwB61PVDYnPuZFhOvmh30pR2nIJpYcizx4iD1eumu2sQ56yt8qdbxXwNtu2+1Hv6m61w+nQ7vRkVvkbxssy+zplKFuhwzd71eFkRA15VUn9echp67BZ9ewLLs6bYu5wkOsUKHufGqd4Il6avpiisQ9naOqdk9TdmqbEd/z3ExM0f3WKeooBzypoHgq9OU+F63Eae9ZfNVhKlx9IVMTr7XCrnYoN6LscTBovl7Qbgf2DvO3FD0zyK119wX+0NWDc5N1Svo+lOnqH19gpIOb1td8DlIPcVVzrql8ep5NPj1PKnP8tARq5EKepM30U2ll6MHX7pk7lZJ/yILkytTzIS3fLy25KmtlPjOnXeZlO5TmfppTtUmzjfyY78G3aghQ9Z5RlnmYmx2hqeoKiP/dQ/tsk5duDNPLFIs2/5l/zlUQAAPe0CnWt7tAZVJNGx90Olq4ANLN1GhVqG53tpMHb4NoVoanrOVr4LEqhLcaHTu7GafwT6y38bDW63Pby3xsR78kOOqd4fNcgTXDMUVzGhVmaen+Cpj4apvBjOqW+SZPmH6SpSykaO2A+w7Cx4yVtU4B6e5QG6jVuEzk1HVrkM8KM12UyLZ1ijkbH5eoVv7Ks130168ps+5lTXppYo7Xa2rwyHzrVuFXeIsghvZyuTLCtkXn/KLMdG9wUnlygxc8i1iv0r41S/9sJbtmuTfF+9pZ14LZy1rmtLE8cmLnc7fQXf2Y/htiv3Fbw79nSu81L28rPcKunvBqcTmA4XZFtoS7P3N6Qv9ewYw3A+oSOeFjftHbqMkYs2tyqdPuQleW/HqSuhziwevQ4xYxL+9KfD1H069LrJVvDdHKf8vvyAT2WUfpcaXNlYatu5G1WlPoxJzui1cqP2T/jpVWp8Ja0ecizyXhtkBXfClVfDTTyPTVEQ3uVJZ0fpP73ZOCvU/rTfur29ZP5Toquo1Hqf4I3mrfd6SGh8qGa1dhuEcO8u7oqPPl9JRq51OsQWfq6/dkC8h6K1qzSOa+cWmX8TaeGaC15Vckq8nCl2GbJ3Txl0uq982RfdGkB8pJOtz2Gs5XT/Pl+6vL10vCXWd7vkjT9m15+f5ymbZfF1kiWn/PjNHo2TrR3lBZuLtLsmZDzbaiuJaxPv18huDfL2e7nz2XUuNqg+LAiNd8sDwpywH+z3YpJ66Lu8lOPZACvrF6el2lrEHCQ63lUSXjNQ9sqXP1TEefv3FtRiimNVPfRPjqkNMa0dvWSfd4/bOXWvv6yzJfLQlPSjJtjy6PaDXKZDruZvcFiwmnf/pBDYZajpcwL01M0+vNH6MkXJimlczn8cpRO/vQRCrxhv10NAAAs03MZW51aVK0OqKLhcbdTZxHHG+qx3em2hasdEd/obdDl/eDfkff/9lDkHKd3coIiu2xbynRKJBaWRxbLbVdnM217Q+I9jl3cyu1YitR7ft+YprCvm44X2wtZSpwdpEOPdVP/l6Zuyw0fL/Gn3HawuJujjO22nKyllTpt2+CUp/LjZsfl3C5wWse14HJWuKOMcZcj0B3STJL3iLeNiLfNq1P2qnr7F3uZ0Xi/sj2rjGP/rHryZoX9o0yXg/yM10VaNwX8XvLsCVN4p/GZIflGlCaurC0tNYd0Sl/NWPK6iNc1fdV6CUbn5r+kv/w3HqX9yjnMZaXSLZJKeLvV1d7RvXwHgjrKa5n9tmClvKr8LXteFtervN6NPNYArFPoiId1zkW+ngg5D4pPUCzBlZXxrh76TePBfFkOcosBiU55fq0uy/90mHxqDaepDyiVlYnDSEz5uVK5Lt0SRCGf3K5+XimAseCKSh1h0y6fMs/fLQbz7w3T6TfGKXa5zgpJT9Pkc0HqP6+uVZ5iL3RR+49a6ZHQMCWXKnofRSYXKP1+T3Hkj9z2zkft3aqZjDWQtLHdG9FLoZ95q1TkK+BgwolteTJAM16WlIIUW17xulmeWm9Y9fpJ9eahvK/eZjVtKz1lv+Bwybi87ZExcsHdTb0H7ScrssnUcj5wWZj63WjpIWM7IzTyJu+PsmzeGKehT1Zxj0Re3vTT2+iRn8r7+/XT8Z910SPek5TaM0qziQkKbzXmW5Kh9PVyyM7rztuu7pLOASfnocM+rblKI+Ll6DSPuul3spSperKIGwZZa/PBdaCX/OXlyPVQv26LdtmdNMUvKvmyM0C+eh+YJRt9tvz1UviX3baHc2kubqyYF8/lyDGuVtOS3xeMDoqmpJnMDXU9ZKPOeGmh5+0j5Ze+rpFXLrf42ixFSdMQtXxinEY/l69cFDo1QlGj/CfeHKW5plxmDABwb8jdyjiOAE1fTjvc13olzYi7mbIejjGnUadZ1L3+UmO3If/1aQo83EWHnhukwed66UlvJwXed1Hfp/M081rQqOtMrps6HHn9bbGQfF/+rBHxnuahwBH1ti3su6RpJLhOyY+GaFJeLasFaOCtIeopxnUpGv1djLLl35L/qwm3oeIlzr8O9dYpFXAbo7ND6bTn3yhuAm9f4qNRGn59mMa/TJPe0eC4nMuYdR31tT3o1hHH27arFqrg7bD+vsOJDt5Hc0rsWPxWOQ3K5Akd23d5cvis6v5hkM8ssqxbG6+bTMA2H4VPKaPi9RiNfphc06j44sN5lczI5R1GtN/NUOqSOUh1kc/noX/duU3pAGc3lSv+VTrvC8oDgQM/Dy4PequnvJZ/p42Pb5Y0l8e70jLyl2M0/tvTdPqdaUqaB1Y55Ee5vSFPtjXsWAOwTqEjHtY9bWuIIgfViLYkfclUCdTqbpbmzk6RrM7cRyO0X46EuJun1EXlYSxciWzbYr/USr88TROW0S+a833QuEJSz75X6lyXo3Oss5YuxbRVxCpZWXrsaaPnkzR6mIP5p/tp8KXjtP+JXhr9tsZQQXaUPvck9X5QqvA9B/toZHqGpt6KUGi3j0rhoUYeDoR7no3SyMdxWrw9TyNHvKZASqaJPUDNno8tP5XdhoPDZNxyix6Nfzu8wznva+F0WZztyf4Sp6M1aHOYx2Bv/HFerZhRVdSdhxxAXVNvTJmjvG3YMeOAJu848sXo5mxxU9eB/UaemlzmfCgHabxvZK+Xl6GT5g9TZF8pffKreIpu+pN+LlvK+t+ao7mrXNZ29dBYYl65EqOTPO5yQMgB8o20LejVnTJAbrvj7YWMeblhpQ7Elpd6z110HO9XwgHofNK8TC9FnjMHr7J8GK/LOF/UtdPlLVaUUUvBX4TI43QZZjW8PsmksnQ5UmyTumGlKxBi5lk5aG53uMeqLSW58brUNm5GmjHbPiX3RafjusMl2zLvy6unbQ7SIduDgPMU/3a5o0S/VR7RqZHe4qHQid5Sw0qeDEXQDgBQAdep1+ydzpKeXnC4fcgKmhF3y44c42VZcaSucmy3n+iVDwZ0PP1bXSO3IZ+g6LFBSijrmvoyTnnNS8GXp2jh47C1I/BhjzH4RXLIGd10xVqD4r1O/yEKqrGKPk/xq0Y9LztQrxsdhlqBdHeATv6ydIpcv2kaqXsPxEvtnP7WTtC847kEmdcunteG03vu1H7q7jlZGpgS6KbwJzn6bxoZl7e5bbducW4XrE3+jhJvK/f7NivYEoljQGUd6U6K4kl1dESFASTqd21taslhm837RxGXP7Ujnt+X53Hv6aOBA9Ylpz4dp7ml22eugvp7TJ7cs500yKZo3nz7K1eA9suzfRyU2zriv52puk76jSTFzfuUO0x9B82D3uoor8ZDa+WVCbaBOky/Mk69fuPh1c8coq7Dw5QwyrFtDc3tDdawYw3AOoWOeFj/OFAKvzVBEdtIWeJgqVrHrhMOsM5GKPKJPIj7qf/pgDESgisd270adcqoo59lJ/7746SG3eUgP38tRany2V7NfllV9vwcLSixilTgAEb9WN7jbUWcNv4DAUvAkfkuRekL4zT6lfGBlI9R9N356mfIDdkvhynyntFRujlCY+8OUeRgkELPjtDUhXnKCEG5q3GaeGeERs8MUOSw3zEgdh8epamnlFr5SoxmqlzGl71u7qD10eBL8n7zxttVcHpQaZ4rZzU4LAYQluzXKX4+4ZBeMkhTG2t5yq2iQ3rJavJQDTotD780yXPgZiusy6MUJPcTYQrvMN6U3YlTrBwAt3mp56Ue/hb7ZpwGz4zT9EX5Sy7yPVa+z3etdI4lnUbRe8j7sLEkl4/CL0fIW3rH3NT5kPlX7L+YTqftecUB3cI31icvSO2dpasN5O8Mnh0ivyUtdYp9mqg8ioIbhOZnIriPDlJ4p/W4YWt4POSynYDLX03Qgnk+V4h699ablqxF3tbFeF0mR7qojaxbSRp/d854Y5D7hlwHDmSzV1KlUXV3M5S2jLhh8rLZ8oo1I83kiSj1FlJ8nEg4NSL4OKkG1vlbpgYLl9XQ06FSWTVJfbH8bAv3Xm5AFC8vzlLslUEa/oj/Jt9u71KOAQAAsER2OidtAUXJDY5Z6u2I5xqv0XG3fp3Xo/hqmdNtaOxxiH10em0auA1X/yvHcaX3Ztqj24yHJGrkOTBg6Qh0uzuXT07fSVPqO+N1mRwNbaqvGxHvaZsDFD6qdtLx9n2ZMuJTF3U/3UdBOXM+QcO/HqKJz0tb7nnca+kU3tDxEpO3kbEuUq/wIFTOuz1B6xV7vM+kONYZ/8Acp2Zp8swE/eN/28C4XLfHTTmHdtBayasILOStIWs9Jih5XsTb2O1Te3atHbVL1G25k7XnQw37h8zfzFV7u2EJt9f2H+u1niS5wun/5twqR1/rlE7O2Y8LmYzy0F+dkp8M0aQpPPc+20/BzXzc2hqmsffVkeMJmpKj1Y13Kj3DeWO8lmUz+Os+ClhukVpfeU3J7oqObgruM6dMludPUfyTUevtoL6K0tB53pCV2huskccagPUIHfGwMWwKUN8pZSSIdGWOpi4qB/Iq9CvT1P/SdLHT232sn3p3GEf8Fq50HutSKjKd5j+ZXjpzW6wwP+qj3nfUMD9PGXnvvhvTFHl8G23r3EaHXpeVcmtxVLgF1zCODztxOHuvO41wdiDPGAdMHeH5xBxXUnGjMcLbtbW0ZJ2DsRWXyA2t9AVed+OtfBjNfn8Xdfu7qYuDu9YHHqAHeGp/lD/jbW1v5fc/4u19iSta9fY3LW4KnonRiOVqhhRNTztfxqd/N01Dv1uu4P2vjVJE6eSsSzGgUvOKU6S93Rboy/yX9+q0cBj9ItPTHjAW1hzQ1pWHHGCm7ZtVHMWhkiOJnB4cZdl+l59OnukzdXxLWRp/KUqxYkHg3z8yTqmLUzTyaoS6LnFey8/dQTq0fH+Rmtkf4uuh8PtTNLhrOa+1B02XRO7czwGi8R3OU9nprnLadtI5CLxuvDYxb7u2I8Ll0brt+ucTNOPUCcz7RuL9KE2X03NTD42eCllPFPH62crC1SSlbpiXx/sY5635qBU4FaUQB9R1a/PQNltDJUmxj3n55Z+8m6XYqV46/Y3xvkzPFG8pk78wSN3ebdTpfZIG/9cFuupwODVvU8PTjGm2hyrz/uh0nJRXrqgK/PvGS8lzMEpRZcQSfTVI/WeNjhcu7wNfLtIsr1ffUY2mPigF7f5QkLwOJxQBAIDJTsu0w3FeyscplnCoPKppeNz9v9N//X/Tlrq1SK2TuV7KXFOv4uLtWk0c18ht+O/+mi7+C+NPBm1PlGbeMtWZLa2mEwsuCuz1Lt1WRV7tZcsedZsaEe9xbB94aYh6lNAj9XofjX5Tquy17RGakgN23hyg8MNzNPqlXDEPhQ50LV85u9HjpXNp0jX1yl+N2m0nfkpsV+xdi3OcP7dUTlxbjRauzunyZ42Ly2Wnq63kXUs7PxB/tfjYkE4qv5I3DUxT2K4Cv+vwXCB5K5bvzDnvrHjFhDob54uaDzXtH3qaEgl7G8PMvTdC/cqVl6nfDdL4ZedtXUk+43BF6eVRGpGd1WX5JE19aHoiW0uAIiGfcRKIy8LRcZo5Zb0xY2Iy5nxy9E6Kxt8YXdqnXAeGaOio/RawdZVX+X+Ly3bFzTzPP3eh3K73kLd4ay6eXz4Zm9uzaYfstRwTGnWsAVivRI3krHXMDtAUmS8GhM8oi0uTu0dMpY0ZqiikpkTfbq30nQ6H7xQWxdhhl3XZxXl9IngwKAI7PcZnmgiemRADO8vzyPdTYuJlf+n9prCYuc7Luz0vojvK85Qnl/Af6RHBvSEReXNWZApC5JITom+Pw+9u6RFDsUXBs1T3fU7MPFteNzm5Rc+rAyK0xbQsnnyn4jUsKyMmDhtptIrJsy8qZuW2m92cFQO7zPO5Ob3ixW0vKmTE/PSQ6NluWs5TMyLzvfH3VSmIxVhUBNrMv2tMO3pE38t9ou+1KbFw25g7NSYCLcp8mk+EjoZE4EBYRD/jfPi+IBamoyK4SZmPJ/eBATF1KVda2GrUmof/8xfi8xd9ls+Wpi1BEeb1DZ0YE/PGqmSmw4IDNWVenxhKKiWBf3/+raDgQMwyr7a7T0x8ERfxxKyYOBMRAXf5b7x+7y+sXJ4cFC5Gl/Zh34kRMXspY1lOLjUjBvaW9wev6PsiY/xFiMWPw4JDP+NvpqnFK0LHekTocJ+YulpamszToGafN/iuuk9xvn7YIzjOW55vR0RMpJbnyl2dFWPPB5bnaQnY01DiY8jIHtNyytOmkBi5UNrO4nqZy+XuqIivoeiI6zMivNm0PGPStgdE6EBA+LaU92efGPhwSASW0sQvBianRHRfKa21nw2L/zQatqZDceLj25u8v16fFxNvjYixOZl+DUwzLnuzlrJfmtx7e0TPPt6G58dE/CbPl4mLkRMOZb/FJ8Jvl46lZYX0jIhsVeYjj+h5c0rMJuZFfHpEDBz2Lv9t14CYXS5mAD+YchlspGYsE6CQHBJ+o2w5Tppf9L07IUZeDoueZ5fjkKoaGHd//J85dthd/rtp2hoRU6mMWIiNiaGR/0Wc+2RIBDvs87mP8jpfXxTxD0fEyKQpRl1Jw7ahRwwcMpbDMUP047hYNKchx8rxd8PCW/wuCdfBseUYNsP187OmOm1p4nqe2xGZSzNi5K0xMZPiBTYo3svMRYVfjZvdQV7vWV5GXMy8HxXhncvtCe+JKWuabuR4idP+2xs5br+p+4RMq/mKZWdxsscSk3ufioq+fW7T93naOyIW5PfXmk+3F8X8hRkxdNChbPK8wWcHRN9T3L75eEHk1tTeYtenRMil/oYsoyNi5kJczF/NLa+XbO+cULaZJ/+rUyIu2wO8Lrn0gohP9tnb+3LaHuL2W1REX+X2w3/5Wowds8ePS9vH05gsSzXsH2+8+rL4d0f+jcM8PtE3aU2jzGcOsbLbL3penhKLFfLeEbe5p46Y8sftE/5yG5OPB+WYOsNtH/PvBd92aH/x8WFK2UaPPKaV9xduwy4m+Phz0JReOwZK8XUFdZVXKTcvokvHN55cQTHwao/wWdpibhH53/7v4rGstvZGA441AA1QLl+NhI542HBylzgYOqhW4m7hP9wnRooH5QWRMYLTXCbDFbrswPGbOoQ4wIpV6HXhYCLs0NFqnrR9XOnw8nMXOZi3dfR6ROTcNbE4NyLCu5yCH9PUEhAjczOiT+lstUwaz3OphtqEg0t7x5NpchsnB1ZUEAtvGo2C1U4tfjGUUCLl2wti7KhTsGSffM/WGciYcVATf39AhPfYgzz7pInQ+B94/j4RWCHPZbAy+8VyB7LjtHPtDYSqefivD4kTTzh87jAF34qL2TMBWwBvnTTh5SCt3JCTcpcmRMQcRDlNW3rEiJq/9ZCNi7dD1hMEbq/w7fIJjyVYc/F2zBvBb07EX61wAkKZXEcmxHysQgBvmlw7uXGeXi5o8iSf36Hj3jZx8Gcr32WFBTHi1BFgTK7NbmuebA+LsVr27xXk5vqWGueVJv9rcU5L3r/fVzrQ5dTSJn6kflZhch3jANdokKw1zeRJl+gR7wrl1CVCH8bFxNFqx1OX6JlcNJZq4EbJ7Gshh0DfPGkiIBtOpn0A4IdULouN1Ixlwv2nkJ4VY68NiMiRgPDL+lntCKk6cXw1WePZzTXH3f9S/Gm7+tkapy199cVzjWg7cLukwHFgn2UAjyY8O/zCv12p/7b3iZnvronZU0Hh3bJCW8M0Bd9fricbEu/d5PbVUacOTtPEba7Ihw6dvRs1XnL/j+Lfv/E/CW/V/UETwXedOksXOZap1j7xir4L1vReVT7Jk0MHax1UVce+qigfI1Zuc3nFwIVFEX9tpfalJny7a2sr1jz9y1rTYYVJ9h1w3mQuDImeXVXWscMvIhyP1lRSuW08VM5b3qdnbxZELmFqa7bJAWFB4TOd5HAfnajcRub2VfzNoMMALPvk2sPt2pX6BVZTXi9Eq56w/ZM/7RA/dvjcaTK3N9Z0rAFogHI5ayR0xMPGJDvzPo6K8D5vTRXO0rQ1LCZWGrmcWxBTZyIitNMU3G4JiPCLUTFxwRqsyNHsA4d9pXXY5BPBfzcq3vlF5UrLvdXHDRoOquW0LyLGLs6Liae4gbPVL4LH+sTAqaiInuKGz8GA8G11C9cOXl9jhO9K5CjQ8mgN8+Q5PCRmalxG0c15MfbUCpXdStPOqJhXO7c4zxY+4wDGqbO5w1s8kVIcuWDMvioysN+3vFyXOb1Nk2+nV3if7BWH/61pHSyTS3h3Ls8fODYi4pe4gcQBondXUPQ8O8D5xHn1ckT07PUL7yae/8hIbSPAqqiWh5/+53eWR+27ZMe1aZv29YjIy7LsRMXI9LzIFXj/OFXquC6nwfJIH9OkBcWEemWIzKfpIdHHjW/f0kgbLrs7g6Lv3TpGiVUj999J+4j/pWl7SETl1SDlYEpeXbLUEHFb8sa/m/Pj+VJ+DL07IxZyHMh+ESmNnC928PO273AKml0iHLNmWOF6vDiK235MkY1hPgbIqyiq5bFlPY1pc1CEDweEV+mw9r0409AO4MLVGTHyYs/yaBqe3Lt7RN9rY2LWdMKhvB+Gd5eOU//qQet6kcst3JuXy5dvq7k8ukRIGRm3ujTjBu67VRoLm0zlm/O37+N5EX87JLy8XoGDYdH3auk42fdUUPh3eoTL7Rd9FU6uFtK8fqfCIsgNp6VGfRsv52h0bVexADRAucw3UjOWCfcZridmTtTRIdbC8arlfYUroCpZbdzd8RfiX5XnNyb3JjfXPUbst7PSCQQXz8fxXDmW4HrE3OnrecrUAVSrtbQdnl/uXJOdm0NP+SvUj24RkFcbyFGs16dEjzKyX3Nz/c0xX6n+9AmvKYYrDpK5qNR5DYn3CiJzcUJEnw0Jvzle2OwXoZcnxHylhWzAeMm1nfPz3a/F12+t3NnpPzPv3J65zeXkeb99AAK390bmKrSB6s0nOTq63IHK+6Z3qyzrpX1CxlCREyER2OU1TjJ4RLjWjmMzp/yrOHnFwGfchnJq/3HMaU4LN5fbctoW2y97uEw8y/sVt7WK+ypPO7c+tDx4hLfPZ24TlKcuj2j/F8vLlVPV/WPFyS0in82LqWPVOqZLk+fFuKgpuuR8nX3RK1xbQmJoqUOb4+OP++yDXDp8XPbKg5OqyyWnrCPfy5MsC3t6xMCHtS2naBXlNXNhRIRsV548JB5T23x1tjdWfawBaIByeWukB+Q/vNAVyftCSzXODvDD0bOU+HSCpj6fo/jVDOWvJW33i3PvClH46X46ecRPbq5N6iLvP+14v3AnOiV/10vB56YpuzVEfc/wa18ntbo85Nvutt2DrRnk09Dnzs9RusVL3XsC5CvfX7tW2TkaPPgknf7aeF/kIv+xfgof8JPnoVb5fPuiws0FSlxM0NxH8qnxxodFHhpIzFPUdN9vs1Ie6eTa5CNvveu3knyakle4ALh95Kt2H0k9TZPP7KfeD1Kle/4dC1L3w+2k8TpV/d4PwDkPdU63PK8fl6Na7nt3l+e/wzlXesqXTf7yHM3f8VDXTs8/+3308pdjNHUhQ52+bura4XXcR/VsmvK8H9W6/+r5vNx4x31OzyYpniLa9riP3E73BZf3l7/Mv0du8m7n9KnxN+lOkk7v6aJB8/1F947Q4mcR8txN09zZcYrlPRTYt58CO5p7PJD3zddqOW7Je2LKhxs9FiD/Fuf9Vcp/l6S03snpUWG960yz/Fen6dDBQZrTfdTzfIR692yj9gdd/F1v7ekNsME1I7ZGvA6NkP96lPrPzFGhrZ06N3vI86ifAnu7yWtUwvJh+Jp6P+xiPZDhutdD3ir1yYrqiLtl/DB3vZNjJa7PK33lzv9D5//Df6Ib/zZER/57T8UYSr+VohTHsp5G1EN1tR0qkO2bczM0f9dD3f4ujk2VNOVYZjqRI+8TnC8dFX5LPlvnSor0Ni95/5ljW4uNGC9VY7Q9ive4bnNzm69yOSu6w7EXx/nxG63k4zi/+wdqI1qs0E6o6i6XzXcGKXqeyLuDjw/eAAWf8FArLyonn8Gw2VvMx/iXcco/eohCO11cnFOU5HYM8Za6t/qWH5CfTdD4mRGaeyhMwy8Glp57UJlO2csyJl0hZqx5//gvdPMf/oz+8q+2LrUJZJsjw7uwfitbun+9bMdvdRfXdfrTBaIO3s477eT1dlK720s+Pt6V2jI6dR0Oka94P/TV4nU6P0GTX6cpl05RZlMvDb4Uqvs5Rvot+YBabg+38fF4reVrFeVVtjNjXyapsLmbAk/4yaM1qL0B8M+gKfE6Lwwd8XBvKj4ISLM8gRtWcCdFky8cot73TE9F3x6hiQ8GOYiqUiHezdPcK9305BvL3wu8tUAzz9ofAANwz8onafCJLjp92XjPtIMTlP64p4aGBQDcb9ARDwD3JcRLAACwQTQjtv4T43+Ae08LOuHro1PijNIJ39FDE58OUU+1TnipxUXdzwxSyHyCG4E03G/4mCNHA5npeoEKcoQUAAAAACBeAgCA+xo64gGg5G6eMt9ljDcl/lcGKbSltrMZci5dXr4ntQQo9IQHo+Hh/sL7UOGO8dqgaa04KQUAAABQhngJAADuY+iIB4CSFhd5/V3GG8lFns3tNXam65Q6N0ExoyPec6KPDm1FNzzcZ/QcZeXtL030TGb5BBUAAADA/Q7xEgAA3MfQEQ8ABo28B/sovMl4S3nj4Ysr06/FaPhMrPRmV5Qmfh3EPR7hviMfRLWgPCiabmUok89T9rsEzX2TJbQxAQAA4H6GeAkAAO5neFgrAFhkvzxNoZ8OUkLep7HFSz2nhmjwRJC86gPO7+Yp9XWMpj8cp/EP5igt598SpolzI9SD0fBwH9GvzdHER9M0/fYoxW4YHzryUl9sjob2uY33AHA/w8NaAeB+gngJAAA2mqbE67wwdMQDgIV+I0aDB/bT8LfGB1uDFN7nI097KxVuLlAymaT4VynraPktPTT26TiFt6MTHu4neUq80k3dr5seclyRn6KJGA3sUs9qAcD9CB3xAHD/QLwEAAAbDzriAeCHk0/Q8C9C1H9OvXbUxOWl0LEw9f48RMGdHtJwOxq47+iUPjdMg2emKP1QNwX8PurasY06293k3dFJdCVOU5/PUZo8FDjYS4EaH34MAPc+dMQDwP0D8RIAAGw86IgHgB+YTtnLcZr7co7iF5KUc/to26PbyOfzUKfbS74tGKkCAACwGuiIBwAAAABYv9ARDwAAAABwD0BHPAAAAADA+tWM2PpPjP8BAAAAAAAAAAAAAKAJ0BEPAAAAAAAAAAAAANBE6IgHAAAAAAAAAAAAAGgidMQDAAAAAAAAAAAAADQROuIBAAAAAAAAAAAAAJoIHfEAAAAAAAAAAAAAAE2EjngAAAAAAAAAAAAAgCZCRzwAAAAAAAAAAAAAQBOhIx4AAAAAAAAAAAAAoInQEQ8AAAAAAAAAAAAA0EToiAcAAAAAAAAAAAAAaCJ0xAMAAAAAAAAAAAAANBE64gEAAAAAAAAAAAAAmggd8QAAAAAAAAAAAAAATYSOeAAAAAAAAAAAAACAJkJHPAAAAAAAAAAAAABAE6EjHgAAAAAAAAAAAACgidARDwAAAAAAAAAAAADQROiIBwAAAAAAAAAAAABoInTEAwAAAAAAAAAAAAA0ETriAQAAAAAAAAAAAACaCB3xAAAAAAAAAAAAAABNhI54AAAAAAAAAAAAAIAmqrkj/sc//nHx/9u3bxf/BwAAAACA+pXj6XJ83SiI1wEAAAAA1q5Z8XrNHfE/+clPiv+fPXu2+D8AAAAAANSvHE+X4+tGQbwOAAAAALB2zYrXa+6I/9WvflX8PxKJ0Ntvv42RNgAAAAAAdZDxs4yjZTwtlePrRkG8DgAAAACwes2O1x8QzHi9ov7+fhoeHjbeAQAAAADAavT19dHQ0JDxrnEQrwMAAAAArF0z4vW6OuKlyclJ+v3vf09/+MMf6I9//KPxKQAAAAAAVCPvMSkvb5Uja3p6eoxPGw/xOgAAAABA/WqN12/dukUdHR3Gu2WVPi+ruyMeAAAAAAAAAAAAAOB+JEfL//Vf/zX9xV/8hfEJ0T/8wz/Q3/7t39Ibb7xhfGJX8z3iAQAAAAAAAAAAAADuZ//4j/9Y7HT/+7//++L7XC5Hf/d3f1ccEV8NOuIBAAAAAAAAAAAAAGrw53/+58XOd9kZf+XKlWIn/M2bN4ufV4Nb0wAAAAAAAAAAAAAA1ECOfJed8PJ2NGWyE/5v/uZvqt4jHiPiAQAAAAAAAAAAAABqIDvbZad7eQR8LZ3wEkbEAwAAAAAAAAAAAADUQY6MHxsbo+PHj6/YCS+hIx4AAAAAAAAAAAAAoIlwaxoAAAAAAAAAAAAAgCZCRzwAAAAAAAAAAAAAQBOhIx4AAAAAAAAAAAAAoInQEQ8AAAAAAAAAAAAA0EToiAcAAAAAAAAAAAAAaCJ0xAMAAAAAAAAAAAAANA3R/w90HXTGFQAduQAAAABJRU5ErkJggg==";

  // src/subscreens/introductions/rulesMarkingMenu.ts
  var RulesMarkingMenu = class extends BaseSubscreen {
    get name() {
      return "Rules > Marking";
    }
    load() {
      super.load();
      this.createImage({
        src: rules_marking_default,
        x: 350,
        y: 225,
        width: 1300
      });
      this.createText({
        text: `If the rule is highlighted in <span style="background: rgb(124, 255, 124);">green</span>, it means that it is enabled, if the rule's text color is <span style="background: red;">red</span>, it means that it is inactive at the moment due to trigger conditions. The heel icon means that the rule is strict (Strict rules can only be edited by mommy).`,
        x: 350,
        y: 725,
        padding: 2,
        width: 1300
      });
    }
  };

  // src/subscreens/rulesMenu.ts
  var scrollTop = null;
  var RulesMenu = class extends BaseSubscreen {
    rulesBlock;
    get name() {
      return "Rules";
    }
    get icon() {
      return `Icons/Management.png`;
    }
    load() {
      super.load();
      const rulesMarkingBtn = this.createButton({
        icon: "Icons/Notifications.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 175
      });
      rulesMarkingBtn.style.zIndex = "10";
      rulesMarkingBtn.addEventListener("click", () => {
        this.setSubscreen(new RulesMarkingMenu());
      });
      const searchInput = this.createInput({
        x: 400,
        y: 170,
        width: 1200,
        padding: 2,
        placeholder: "Search rule"
      });
      searchInput.addEventListener("input", (e) => this.refreshRules(e.target.value));
      this.rulesBlock = this.createContainer({
        scroll: "y",
        x: 200,
        y: 300,
        width: 1600,
        height: 600
      });
      this.rulesBlock.style.display = "grid";
      this.rulesBlock.style.gridTemplateColumns = "1fr 1fr";
      this.rulesBlock.style.gap = "1vw";
      this.refreshRules();
      if (scrollTop) this.rulesBlock.scrollBy({ top: scrollTop });
    }
    refreshRules(searchFilter) {
      if (InformationSheetSelection === null) return;
      const selection = InformationSheetSelection;
      this.rulesBlock.innerHTML = "";
      rulesList.forEach((rule) => {
        if (searchFilter && !rule.name.toLowerCase().includes(searchFilter.toLowerCase())) return;
        const ruleBtn = this.createButton({
          text: rule.name,
          padding: 2,
          parent: this.rulesBlock,
          icon: isRuleStrict(selection, rule.id) ? "Icons/Management.png" : void 0,
          iconAbsolutePosition: false,
          modules: {
            base: [
              ...isRuleEnabled(selection, rule.id) ? [new DynamicClassModule({
                base: {
                  background: "#cbffc0 !important",
                  borderColor: "#6bbd18 !important"
                }
              })] : []
            ],
            icon: [
              new StyleModule({
                width: "12.5%"
              })
            ]
          }
        });
        if (isRuleEnabled(selection, rule.id) && !isRuleActive(selection, rule.id)) {
          ruleBtn.style.color = "red";
        }
        ruleBtn.style.fontWeight = "bold";
        ruleBtn.style.position = "relative";
        ruleBtn.setAttribute("data-lc-ruleId", rule.id);
        ruleBtn.addEventListener("click", () => {
          scrollTop = this.rulesBlock.scrollTop;
          this.setSubscreen(new RuleSettingsMenu(rule));
        });
      });
    }
    update() {
      this.refreshRules();
      if (scrollTop) this.rulesBlock.scrollBy({ top: scrollTop });
    }
    exit() {
      super.exit();
      scrollTop = null;
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/ruleSettingsMenu.ts
  var RuleSettingsMenu = class extends BaseSubscreen {
    rule;
    ruleSettings;
    canChangeSettings() {
      if (InformationSheetSelection === null) return false;
      return hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_RULES" /* MANAGE_RULES */) && (!isRuleStrict(InformationSheetSelection, this.rule.id) || isMommyOf(Player, InformationSheetSelection) || InformationSheetSelection.IsPlayer() && isExploringModeEnabled());
    }
    get name() {
      return `Rules > ${this.rule.name}`;
    }
    constructor(rule, ruleSettings) {
      super();
      this.rule = rule;
      if (ruleSettings) this.ruleSettings = ruleSettings;
      else {
        const storage = InformationSheetSelection?.IsPlayer() ? modStorage : InformationSheetSelection?.LITTLISH_CLUB;
        this.ruleSettings = storage?.rules?.list?.find((r) => r.id === this.rule.id) ?? {
          id: this.rule.id,
          state: false,
          strict: false,
          changedBy: -1,
          ts: -1
        };
        this.ruleSettings = JSON.parse(JSON.stringify(this.ruleSettings));
      }
    }
    load() {
      super.load();
      const openIntroBtn = this.createButton({
        icon: "Icons/Notifications.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 175,
        onClick: () => {
          this.setSubscreen(new AboutRulesSettingsMenu(this.rule, this.ruleSettings));
        }
      });
      openIntroBtn.style.zIndex = "10";
      const description = this.createText({
        text: `${this.rule.description}`,
        x: 850,
        y: 215,
        width: 900,
        height: 125,
        fontSize: 4,
        withBackground: true,
        padding: 1
      });
      description.style.overflowY = "scroll";
      const paramsView = this.createContainer({
        x: 850,
        y: 360,
        width: 1050,
        height: 375,
        scroll: "y"
      });
      paramsView.style.display = "flex";
      paramsView.style.flexDirection = "column";
      paramsView.style.rowGap = "1vw";
      this.rule.data?.forEach((param) => {
        const paramBlock = document.createElement("div");
        paramBlock.style.cssText = "display: flex; align-items: center; column-gap: 0.8vw; width: 100%;";
        if (!["checkbox", "list"].includes(param.type)) {
          const paramText = this.createText({
            text: param.text + ":",
            fontSize: 4,
            parent: paramBlock
          });
          paramText.style.whiteSpace = "nowrap";
        }
        if (param.type === "number") {
          const input = this.createInput({
            value: this.ruleSettings.data?.[param.name]?.toString() ?? "",
            placeholder: param.type,
            width: 500,
            height: 70,
            parent: paramBlock,
            isDisabled: () => !this.canChangeSettings(),
            onChange: () => {
              if (param.min && parseFloat(input.value) < param.min) return;
              if (param.max && parseFloat(input.value) > param.max) return;
              if (!this.ruleSettings.data) this.ruleSettings.data = {};
              this.ruleSettings.data[param.name] = param.type === "number" ? parseFloat(input.value) : input.value;
            }
          });
          input.style.width = "100%";
          input.setAttribute("type", param.type);
          if (param.min) input.setAttribute("min", param.min);
          if (param.max) input.setAttribute("max", param.max);
          if (param.step) input.setAttribute("step", param.step);
        } else if (param.type === "text") {
          const input = this.createInput({
            value: this.ruleSettings.data?.[param.name]?.toString() ?? "",
            placeholder: param.type,
            width: 500,
            height: 70,
            parent: paramBlock,
            isDisabled: () => !this.canChangeSettings(),
            onChange: () => {
              if (!this.ruleSettings.data) this.ruleSettings.data = {};
              this.ruleSettings.data[param.name] = input.value;
            }
          });
          input.style.width = "100%";
          input.setAttribute("type", param.type);
        } else if (param.type === "checkbox") {
          const checkbox = this.createCheckbox({
            width: 800,
            isChecked: !!this.ruleSettings.data?.[param.name],
            text: param.text,
            parent: paramBlock,
            isDisabled: () => !this.canChangeSettings(),
            onChange: () => {
              if (!this.ruleSettings.data) this.ruleSettings.data = {};
              this.ruleSettings.data[param.name] = !this.ruleSettings.data[param.name];
            }
          });
        } else if (param.type === "color") {
          const input = this.createInput({
            width: 500,
            height: 70,
            value: this.ruleSettings.data?.[param.name]?.toString(),
            padding: 1,
            parent: paramBlock,
            isDisabled: () => !this.canChangeSettings(),
            onChange: () => {
              if (!this.ruleSettings.data) this.ruleSettings.data = {};
              this.ruleSettings.data[param.name] = input.value;
            }
          });
          input.style.width = "100%";
          input.setAttribute("type", param.type);
        } else if (param.type === "list") {
          this.createInputList({
            title: param.text,
            width: 1050,
            height: 400,
            value: this.ruleSettings.data?.[param.name] ?? [],
            numbersOnly: param.listNumbersOnly,
            parent: paramBlock,
            padding: 1,
            isDisabled: () => !this.canChangeSettings(),
            onChange: (value) => {
              if (!this.ruleSettings.data) this.ruleSettings.data = {};
              this.ruleSettings.data[param.name] = value;
            }
          });
        } else if (param.type === "extended") {
          this.createButton({
            text: this.ruleSettings.data?.[param.name] ? "Assigned" : "Not assigned",
            parent: paramBlock,
            padding: 1,
            isDisabled: () => !this.canChangeSettings(),
            onClick: () => {
              param.get?.(this.rule, this.ruleSettings);
            }
          });
        }
        paramsView.append(paramBlock);
      });
      const lastTimeWasChanged = this.createText({
        text: `Last time it was changed by ${this.ruleSettings.changedBy === -1 ? "-" : this.ruleSettings.changedBy} at ${this.ruleSettings.ts === -1 ? "-" : new Date(this.ruleSettings.ts).toUTCString()}`,
        x: 150,
        y: 215,
        width: 600,
        height: 145,
        padding: 1,
        fontSize: 4
      });
      lastTimeWasChanged.style.background = "var(--tmd-element, rgb(235, 235, 255))";
      lastTimeWasChanged.style.borderLeft = "0.4vw solid var(--tmd-accent, rgb(199 199 241))";
      lastTimeWasChanged.style.overflowY = "scroll";
      const turnStateBtn = this.createButton({
        text: this.ruleSettings.state ? "State: Enabled" : "State: Disabled",
        x: 150,
        y: 380,
        width: 600,
        padding: 2,
        isDisabled: () => !this.canChangeSettings(),
        onClick: () => {
          this.ruleSettings.state = !this.ruleSettings.state;
          turnStateBtn.textContent = this.ruleSettings.state ? "State: Enabled" : "State: Disabled";
        }
      });
      const turnStrictBtn = this.createButton({
        text: `Strict: ${this.ruleSettings.strict ? "Yes" : "No"}`,
        x: 150,
        y: 490,
        width: 600,
        padding: 2,
        isDisabled: () => InformationSheetSelection !== null && !hasAccessRightTo(Player, InformationSheetSelection, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */),
        onClick: () => {
          this.ruleSettings.strict = !this.ruleSettings.strict;
          turnStrictBtn.textContent = this.ruleSettings.strict ? "Strict: Yes" : "Strict: No";
        }
      });
      const triggerConditionsBtn = this.createButton({
        text: (this.ruleSettings.conditions?.type ?? "any") === "any" ? "Trigger Conditions: Any" : "Trigger Conditions All",
        x: 150,
        y: 625,
        width: 600,
        padding: 2,
        isDisabled: () => !this.canChangeSettings(),
        onClick: () => {
          if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
          this.ruleSettings.conditions.type = (this.ruleSettings.conditions?.type ?? "any") === "any" ? "all" : "any";
          triggerConditionsBtn.textContent = (this.ruleSettings.conditions?.type ?? "any") === "any" ? "Trigger Conditions: Any" : "Trigger Conditions All";
        }
      });
      const whenCheckbox = this.createCheckbox({
        text: "When",
        x: 150,
        y: 750,
        isChecked: !!this.ruleSettings.conditions?.whenInRoomWithRole,
        isDisabled: () => !this.canChangeSettings(),
        onChange: () => {
          const whenRole = this.ruleSettings.conditions?.whenInRoomWithRole;
          if (whenRole) {
            delete this.ruleSettings.conditions.whenInRoomWithRole;
          } else {
            if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
            this.ruleSettings.conditions.whenInRoomWithRole = {
              inRoom: true,
              role: "caregiver"
            };
          }
          const updatedWhenRole = this.ruleSettings.conditions?.whenInRoomWithRole;
          inRoomBtn.textContent = updatedWhenRole?.inRoom ?? true ? "in room" : "not in room";
          inRoomBtn.classList.toggle("zcDisabled", !this.canChangeSettings() || !updatedWhenRole);
          withRoleBtn.textContent = updatedWhenRole?.role ?? "caregiver";
          withRoleBtn.classList.toggle("zcDisabled", !this.canChangeSettings() || !updatedWhenRole);
        }
      });
      const inRoomBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true ? "in room" : "not in room",
        x: 380,
        y: 750,
        width: 180,
        height: 65,
        fontSize: 3,
        isDisabled: () => !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWithRole,
        onClick: () => {
          if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
          const whenRole = this.ruleSettings.conditions.whenInRoomWithRole ?? { inRoom: true, role: "caregiver" };
          this.ruleSettings.conditions.whenInRoomWithRole = whenRole;
          whenRole.inRoom = !(whenRole.inRoom ?? true);
          inRoomBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true ? "in room" : "not in room";
        }
      });
      this.createText({
        text: "with role",
        x: 600,
        y: 750,
        fontSize: 5
      }).classList.toggle("zcDisabled", !this.canChangeSettings());
      const withRoleBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver",
        x: 805,
        y: 750,
        width: 180,
        height: 65,
        fontSize: 3,
        isDisabled: () => !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWithRole,
        onClick: () => {
          if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
          const whenRole = this.ruleSettings.conditions.whenInRoomWithRole ?? { inRoom: true, role: "caregiver" };
          this.ruleSettings.conditions.whenInRoomWithRole = whenRole;
          whenRole.role = (whenRole.role ?? "caregiver") === "caregiver" ? "mommy" : "caregiver";
          withRoleBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver";
        }
      });
      this.createText({
        text: "and higher",
        x: 1e3,
        y: 750,
        fontSize: 5
      }).classList.toggle("zcDisabled", !this.canChangeSettings());
      const whenCheckbox2 = this.createCheckbox({
        text: "When in room where ABDL is",
        x: 150,
        y: 850,
        isChecked: !!this.ruleSettings.conditions?.whenInRoomWhereAbdl,
        isDisabled: () => !this.canChangeSettings(),
        onChange: () => {
          const whereAbdl = this.ruleSettings.conditions?.whenInRoomWhereAbdl;
          if (whereAbdl) {
            delete this.ruleSettings.conditions.whenInRoomWhereAbdl;
          } else {
            if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
            this.ruleSettings.conditions.whenInRoomWhereAbdl = { blocked: true };
          }
          const updatedWhereAbdl = this.ruleSettings.conditions?.whenInRoomWhereAbdl;
          isBlockedBtn.textContent = updatedWhereAbdl?.blocked ?? true ? "blocked" : "not blocked";
          isBlockedBtn.classList.toggle("zcDisabled", !this.canChangeSettings() || !updatedWhereAbdl);
        }
      });
      const isBlockedBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true ? "blocked" : "not blocked",
        x: 915,
        y: 850,
        width: 200,
        height: 65,
        fontSize: 3,
        isDisabled: () => !this.canChangeSettings() || !this.ruleSettings.conditions?.whenInRoomWhereAbdl,
        onClick: () => {
          if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
          const whereAbdl = this.ruleSettings.conditions.whenInRoomWhereAbdl ?? { blocked: true };
          this.ruleSettings.conditions.whenInRoomWhereAbdl = whereAbdl;
          whereAbdl.blocked = !(whereAbdl.blocked ?? true);
          isBlockedBtn.textContent = this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true ? "blocked" : "not blocked";
        }
      });
      const saveChangesBtn = this.createButton({
        text: "Save Changes",
        x: 1520,
        y: 790,
        width: 400,
        height: 150,
        isDisabled: () => !this.canChangeSettings(),
        onClick: () => {
          if (InformationSheetSelection === null) return;
          if (InformationSheetSelection.IsPlayer()) {
            if (!modStorage.rules) modStorage.rules = {};
            if (!modStorage.rules.list) modStorage.rules.list = [];
            let r = modStorage.rules.list.find((d) => d.id === this.rule.id);
            if (r) {
              Object.assign(r, this.ruleSettings, {
                changedBy: Player.MemberNumber,
                ts: Date.now()
              });
            } else {
              modStorage.rules.list.push({ ...this.ruleSettings, changedBy: Player.MemberNumber, ts: Date.now() });
            }
            addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed settings of "${this.rule.name}" rule`, false);
            syncStorage();
          } else {
            let dataToSend = {
              id: this.ruleSettings.id,
              state: this.ruleSettings.state,
              strict: this.ruleSettings.strict
            };
            if (this.ruleSettings.data) dataToSend.data = this.ruleSettings.data;
            if (this.ruleSettings.conditions) dataToSend.conditions = this.ruleSettings.conditions;
            messagesManager.sendPacket("changeRuleSettings", dataToSend, InformationSheetSelection.MemberNumber);
          }
          this.exit();
        }
      });
      saveChangesBtn.style.fontWeight = "bold";
    }
    exit() {
      super.exit();
      this.setSubscreen(new RulesMenu());
    }
  };

  // src/subscreens/common/dictMenu.ts
  function addItemToDict(subscreen, view, item) {
    const dictLine = document.createElement("div");
    dictLine.style.cssText = "display: flex; align-items: center; column-gap: 1vw; margin-top: 1vw;";
    subscreen.createButton({
      text: String(item[0]),
      parent: dictLine,
      width: 855,
      padding: 2
    });
    subscreen.createButton({
      text: String(item[1]),
      parent: dictLine,
      width: 855,
      padding: 2
    });
    subscreen.createButton({
      parent: dictLine,
      width: 90,
      height: 90,
      icon: "Icons/Cancel.png",
      onClick: () => {
        dictLine.remove();
        delete subscreen.items[item[0]];
      }
    });
    view.append(dictLine);
  }
  var DictMenu = class extends BaseSubscreen {
    get name() {
      return this.screenName;
    }
    screenName;
    keyName;
    valueName;
    keyNumberOnly;
    valueNumberOnly;
    items;
    onExit;
    onSave;
    constructor({
      screenName,
      keyName,
      valueName,
      keyNumberOnly,
      valueNumberOnly,
      items,
      onExit,
      onSave
    }) {
      super();
      this.screenName = screenName;
      this.keyName = keyName;
      this.valueName = valueName;
      this.keyNumberOnly = keyNumberOnly;
      this.valueNumberOnly = valueNumberOnly;
      this.items = items;
      this.onExit = onExit;
      this.onSave = onSave;
    }
    load() {
      super.load();
      this.createText({
        text: this.keyName,
        x: 100,
        y: 210,
        width: 855
      }).style.textAlign = "center";
      this.createText({
        text: this.valueName,
        x: 950,
        y: 210,
        width: 855
      }).style.textAlign = "center";
      const view = this.createContainer({
        scroll: "y",
        x: 100,
        y: 260,
        width: 1800,
        height: 480
      });
      Object.keys(this.items).forEach((key2) => {
        addItemToDict(this, view, [key2, this.items[key2]]);
      });
      const key = this.createInput({
        placeholder: this.keyName,
        x: 100,
        y: 745,
        width: 600,
        padding: 2
      });
      key.setAttribute("type", this.keyNumberOnly ? "number" : "text");
      const value = this.createInput({
        placeholder: this.valueName,
        x: 750,
        y: 745,
        width: 600,
        padding: 2
      });
      value.setAttribute("type", this.valueNumberOnly ? "number" : "text");
      this.createButton({
        text: "Add",
        x: 1400,
        y: 745,
        width: 500,
        padding: 2,
        onClick: () => {
          if (key.value.trim() === "" || value.value.trim() === "") return;
          this.items[key.value] = value.value;
          addItemToDict(this, view, [key.value, value.value]);
          key.value = "";
          value.value = "";
        }
      });
      this.createButton({
        text: "Save",
        x: 1400,
        y: 850,
        width: 500,
        padding: 3,
        variant: "filled",
        onClick: () => {
          this.onSave(this.items);
        }
      });
    }
    exit() {
      super.exit();
      this.onExit();
    }
  };

  // src/modules/rules.ts
  var dialogMenuButtonClickHooks = /* @__PURE__ */ new Map();
  var buttonLabels = /* @__PURE__ */ new Map();
  var imageRedirects = /* @__PURE__ */ new Map();
  var timerLastRulesCycleCall = 0;
  var rulesList = [
    {
      id: 1e3,
      name: "Prevent taking ABDL items off",
      description: "Prevents baby from taking ABDL items off"
    },
    {
      id: 1001,
      name: "Prevent using admin powers",
      description: "Prevents baby from using room administration"
    },
    {
      id: 1002,
      name: "Prevent resisting urges",
      description: "Prevents baby from resisting any urges"
    },
    {
      id: 1003,
      name: "ABDL inventory",
      description: "Takes all the items from the baby except the ABDL"
    },
    {
      id: 1004,
      name: "Speak like baby",
      description: "Force baby to speak like little baby",
      data: [
        {
          name: "altSpeech",
          text: "Alternative baby speech algorithm",
          type: "checkbox"
        }
      ]
    },
    {
      id: 1005,
      name: "Walk like baby",
      description: "Prevents baby from standing"
    },
    {
      id: 1006,
      name: "Can't go in the shop alone",
      description: "Prevents baby from going to the club shop"
    },
    {
      id: 1007,
      name: "Fall asleep after milk bottle",
      description: "Baby will fall asleep after drinking the milk (if it doesn't have another effect)"
    },
    // {
    //     id: 1008,
    // },
    {
      id: 1009,
      name: "Disable reset settings button",
      description: "Disables button to reset mod settings"
    },
    {
      id: 1010,
      name: "Pacifier-checkboxes",
      description: "Replaces the default checkbox with the pacifier-checkbox in ALL places where possible"
    },
    {
      id: 1011,
      name: "Force nickname",
      description: "Force nickname",
      data: [
        {
          name: "nickname",
          text: "Nickname",
          type: "text"
        },
        {
          name: "color",
          text: "Label color",
          type: "color"
        }
      ]
    },
    {
      id: 1012,
      name: "Prevent using bondage on other",
      description: "Prevents baby from using bondage items on other characters",
      data: [
        {
          name: "allowAbdlItems",
          type: "checkbox",
          text: "Allow using ABDL items"
        }
      ]
    },
    {
      id: 1013,
      name: "Prevent joining ABDL blocked rooms",
      description: "Prevents baby from joining rooms with blocked ABDL category"
    },
    {
      id: 1014,
      name: "Prevent using Littlish Wardrobe on self",
      description: "Prevents baby from applying outfits from Littlish Wardrobe on self"
    },
    {
      id: 1015,
      name: "Prevent joining certain rooms",
      description: "Prevents baby from joining rooms with certain names",
      data: [
        {
          name: "roomNames",
          type: "list",
          listNumbersOnly: false,
          text: "Room names"
        },
        {
          name: "whitelistMode",
          type: "checkbox",
          text: "Whitelist mode"
        }
      ]
    },
    {
      id: 1016,
      name: "Force title",
      description: "Forces title for baby",
      data: [
        {
          name: "title",
          type: "extended",
          text: "Title",
          get: async (rule, ruleSettings) => {
            let titles = [];
            if (InformationSheetSelection?.IsPlayer()) {
              titles = TitleList.filter((t) => t.Requirement()).map((t) => t.Name);
            } else {
              const spinnerId = toastsManager.spinner({
                message: "Loading titles"
              });
              const res = await messagesManager.sendRequest({
                message: "getValidTitles",
                target: InformationSheetSelection?.MemberNumber ?? -1,
                type: "packet"
              });
              toastsManager.removeSpinner(spinnerId);
              if (res.isError) {
                return toastsManager.error({
                  message: "Loading error",
                  duration: 4e3
                });
              }
              if (res.data) titles = res.data;
            }
            setSubscreen(
              new ItemListMenu({
                screenName: "Pick title you want to force",
                items: titles.map((t) => {
                  return {
                    text: TextGetInScope("Screens/Character/Title/Text_Title.csv", "Title" + t),
                    value: t
                  };
                }),
                columns: "1fr 1fr 1fr",
                onExit: () => {
                  setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                },
                onClick: (title) => {
                  if (!ruleSettings.data) ruleSettings.data = {};
                  ruleSettings.data.title = title;
                  setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                }
              })
            );
          },
          validate: (value) => typeof value === "string" && !!TitleList.find((t) => t.Name === value)
        }
      ]
    },
    {
      id: 1017,
      name: "Show custom names",
      description: "Replaces characters real name with custom ones",
      data: [
        {
          name: "customNames",
          text: "Custom names",
          type: "extended",
          get: (rule, ruleSettings) => {
            setSubscreen(
              new DictMenu({
                screenName: "Enter custom names",
                keyName: "Member number",
                valueName: "Custom name",
                keyNumberOnly: true,
                valueNumberOnly: false,
                items: ruleSettings.data?.customNames ?? {},
                onExit: () => {
                  setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                },
                onSave: (customNames) => {
                  if (!ruleSettings.data) ruleSettings.data = {};
                  ruleSettings.data.customNames = customNames;
                  setSubscreen(new RuleSettingsMenu(rule, ruleSettings));
                }
              })
            );
          },
          validate: (value) => {
            return typeof value === "object" && value !== null && Object.keys(value)?.every((d) => !Number.isNaN(parseInt(d))) && Object.values(value)?.every((d) => typeof d === "string");
          }
        }
      ]
    },
    {
      id: 1018,
      name: "Prevent freeing self",
      description: "Prevents baby from removing restraints from themselves"
    },
    {
      id: 1019,
      name: "Prevent using certain chat commands",
      description: "Prevents baby using certain chat commands",
      data: [
        {
          name: "commands",
          text: "Commands",
          type: "list",
          listNumbersOnly: false
        }
      ]
    },
    {
      id: 1020,
      name: "Summoning rattle",
      description: "Activates the feature to summon baby from any chat room",
      data: [
        {
          name: "timeout",
          text: "Timeout in seconds (Default: 5)",
          type: "number",
          min: 1
        }
      ]
    }
  ];
  function isRuleActive(C, ruleId) {
    if (!isRuleEnabled(C, ruleId)) return false;
    const conditions = getRuleConditions(C, ruleId);
    if (!conditions?.whenInRoomWithRole && !conditions?.whenInRoomWhereAbdl) return true;
    let whenInRoomWithRoleCondition = false;
    let whenInRoomWhereAbdlCondition = false;
    if (conditions.whenInRoomWithRole) {
      if ((conditions?.whenInRoomWithRole?.role ?? "caregiver") === "caregiver") {
        whenInRoomWithRoleCondition = conditions?.whenInRoomWithRole?.inRoom ?? true ? inRoomWithCaregiver(C) || inRoomWithMommy(C) : !(inRoomWithCaregiver(C) || inRoomWithMommy(C));
      } else {
        whenInRoomWithRoleCondition = conditions?.whenInRoomWithRole?.inRoom ?? true ? inRoomWithMommy(C) : !inRoomWithMommy(C);
      }
    }
    if (conditions.whenInRoomWhereAbdl) {
      whenInRoomWhereAbdlCondition = conditions?.whenInRoomWhereAbdl?.blocked ?? true ? inRoomWhereAbdlIsBlocked() : !inRoomWhereAbdlIsBlocked();
    }
    const conditionsValues = [];
    if (conditions?.whenInRoomWithRole) conditionsValues.push(whenInRoomWithRoleCondition);
    if (conditions?.whenInRoomWhereAbdl) conditionsValues.push(whenInRoomWhereAbdlCondition);
    return (conditions?.type ?? "any") === "all" ? conditionsValues.every((b) => b) : conditionsValues.some((b) => b);
  }
  function isRuleEnabled(C, ruleId) {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.state ?? false;
  }
  function isRuleStrict(C, ruleId) {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
  }
  function getRuleParameter2(C, ruleId, parameter) {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.data?.[parameter] ?? null;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.data?.[parameter] ?? null;
  }
  function getRuleConditions(C, ruleId) {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.conditions ?? null;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.conditions ?? null;
  }
  function isSleeping(C) {
    if (C.IsPlayer()) return modStorage.sleepState ?? false;
    return C.LITTLISH_CLUB?.sleepState ?? false;
  }
  function inRoomWithCaregiver(C) {
    let storage;
    if (C.IsPlayer()) storage = modStorage;
    else storage = C.LITTLISH_CLUB;
    for (const c of ChatRoomCharacter) {
      if (storage?.caregivers?.list?.includes(c.MemberNumber ?? -1)) return true;
    }
    return false;
  }
  function inRoomWithMommy(C) {
    let storage;
    if (C.IsPlayer()) storage = modStorage;
    else storage = C.LITTLISH_CLUB;
    for (const c of ChatRoomCharacter) {
      if (storage?.mommy?.id === c.MemberNumber) return true;
    }
    return false;
  }
  function inRoomWhereAbdlIsBlocked() {
    return ChatRoomData?.BlockCategory?.includes("ABDL") ?? false;
  }
  function registerButton(name, label, icon, fn) {
    imageRedirects.set(`Icons/${name}.png`, icon);
    buttonLabels.set(name, label);
    const hooks = dialogMenuButtonClickHooks.get(name) ?? [];
    hooks.push(fn);
    dialogMenuButtonClickHooks.set(name, hooks);
  }
  function alternativeBabyTalk(text) {
    text = text.toLowerCase();
    text = text.replaceAll("s", "th");
    text = text.replaceAll("h", "hh");
    text = text.replaceAll("is", "ith");
    text = text.replaceAll("are", "aw");
    text = text.replaceAll("am", "amm");
    text = text.replaceAll("no", "ni");
    text = text.replaceAll("yeth", "yeshs");
    text = text.replaceAll("sorry", "sowwy");
    text = text.replaceAll("thanks", "tanks");
    text = text.replaceAll("this", "dis");
    text = text.replaceAll("the", "da");
    text = text.replaceAll("hello", "hewo");
    text = text.replaceAll("so", "sho");
    const babyWords = ["ba-ba", "da-da", "ma-ma", "goo-goo", "wee", "ooh", "gu", "ga", "agu", "guga"];
    text = text.replace(/(\w+)\b/g, (word) => word + (getRandomNumber(1, text.split(" ").length) === 1 ? " " + babyWords[Math.floor(Math.random() * babyWords.length)] : ""));
    return text.trim();
  }
  function chatRoomSearchCanJoinRoom(room) {
    if (isRuleActive(Player, 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */) && room?.BlockCategory?.includes("ABDL")) {
      return [
        false,
        `Rule "${rulesList.find((r) => r.id === 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */).name}" prevented you from joining that room`
      ];
    }
    if (!isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */)) return [true, ""];
    const roomNames = (getRuleParameter2(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */, "roomNames") ?? []).map((n) => n.trim().toLowerCase());
    const whitelistMode = getRuleParameter2(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */, "whitelistMode");
    if (whitelistMode ? !roomNames.includes(room.Name.toLowerCase()) : roomNames.includes(room.Name.toLowerCase())) {
      return [
        false,
        `Rule "${rulesList.find((r) => r.id === 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */).name}" prevented you from joining that room`
      ];
    }
    return [true, ""];
  }
  function loadRules() {
    const attempt = () => {
      const item = InventoryGet(Player, Player.FocusGroup?.Name);
      if (!item) return;
      const itemName = item.Craft ? item.Craft.Name : item.Asset.Description;
      if (isRuleActive(Player, 1018 /* PREVENT_FREEING_SELF */) && item?.Asset?.IsRestraint) {
        messagesManager.sendAction(
          `Baby ${CharacterNickname(
            Player
          )} helplessly tried to remove ${itemName}`
        );
      } else if ((item?.Asset?.Category?.includes("ABDL") || extendedABDLItemNames.includes(item?.Asset?.Name)) && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) {
        messagesManager.sendAction(
          `Baby ${CharacterNickname(
            Player
          )} tried to remove ${itemName} without mommy's permission`
        );
      }
    };
    registerButton(
      "LC_Remove",
      `Blocked by ${MOD_NAME}`,
      `Icons/Remove.png`,
      attempt
    );
    registerButton(
      "LC_Escape",
      `Blocked by ${MOD_NAME}`,
      `Icons/Escape.png`,
      attempt
    );
    registerButton(
      "LC_Struggle",
      `Blocked by ${MOD_NAME}`,
      `Icons/Struggle.png`,
      attempt
    );
    registerButton(
      "LC_Dismount",
      `Blocked by ${MOD_NAME}`,
      `Icons/Dismount.png`,
      attempt
    );
    messagesManager.onRequest("getValidTitles", (data, sender) => {
      const senderC = typeof sender === "number" ? getPlayer(sender) : sender;
      if (senderC === null) return;
      if (!hasAccessRightTo(senderC, Player, "MANAGE_RULES" /* MANAGE_RULES */)) return;
      const titles = TitleList.filter((t) => t.Requirement()).map((t) => t.Name);
      return titles;
    });
    messagesManager.onRequest("summon", (data, sender, senderName) => {
      const senderNumber = typeof sender === "number" ? sender : sender.MemberNumber ?? -1;
      if (getMommyOf(Player)?.id !== senderNumber && !getCaregiversOf(Player).includes(senderNumber)) return;
      if (!isRuleActive(Player, 1020 /* SUMMONING_RATTLE */)) return;
      if (typeof data?.roomName !== "string") return;
      toastsManager.info({
        title: "Summoning",
        message: `${senderName} summoned you, you will be moved in ${getRuleParameter2(Player, 1020 /* SUMMONING_RATTLE */, "timeout") ?? "5"}s`,
        duration: 6e3
      });
      setTimeout(() => {
        if (ServerPlayerIsInChatRoom()) {
          messagesManager.sendChat(`${CharacterNickname(Player)} was summoned.`);
          ChatRoomLeave();
          CommonSetScreen("Online", "ChatSearch");
        }
        ChatSearchLastQueryJoinTime = CommonTime();
        ChatSearchLastQueryJoin = data.roomName;
        ServerSend("ChatRoomJoin", { Name: data.roomName });
      }, (getRuleParameter2(Player, 1020 /* SUMMONING_RATTLE */, "timeout") ?? 5) * 1e3);
      return {
        success: true
      };
    });
    hookFunction("Player.CanChangeToPose", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !Player.Effect.includes("OnBed") || isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("PoseCanChangeUnaidedStatus", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!args[0].IsPlayer()) return next(args);
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !Player.Effect.includes("OnBed") || isSleeping(Player)) return PoseChangeStatus.NEVER;
      return next(args);
    });
    hookFunction("ChatRoomCanAttemptStand", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !Player.Effect.includes("OnBed") || isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("ChatAdminCanEdit", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isRuleActive(Player, 1001 /* PREVENT_USING_ADMIN_POWERS */) && CurrentScreen === "ChatAdmin" && next(args) === true) {
        return ChatAdminMode === "create";
      }
      return next(args);
    });
    hookFunction("ServerSend", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const message = args[0];
      const params = args[1];
      if (message === "ChatRoomChat" && ["Chat", "Whisper"].includes(params.Type) && params.Content[0] !== "(") {
        if (isSleeping(Player)) return messagesManager.sendLocal("You are asleep, use OOC to speak");
        if (isRuleActive(Player, 1004 /* SPEAK_LIKE_BABY */)) {
          if (getRuleParameter2(Player, 1004 /* SPEAK_LIKE_BABY */, "altSpeech")) {
            params.Content = alternativeBabyTalk(params.Content);
          } else {
            params.Content = SpeechTransformBabyTalk(params.Content);
          }
        }
      }
      return next(args);
    });
    hookFunction("DialogInventoryAdd", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const [C, item, isWorn, sortOrder] = args;
      const asset = item.Asset;
      if (DialogMenuMode !== "permissions") {
        if (!asset.Category?.includes("ABDL") && !extendedABDLItemNames.includes(asset.Name) && isRuleActive(Player, 1003 /* ABDL_INVENTORY */)) return;
      }
      next(args);
    });
    hookFunction("ShopLoad", HookPriority.OVERRIDE_BEHAVIOR, async (args, next) => {
      if (!isRuleActive(Player, 1006 /* CANT_GO_SHOP_ALONE */)) return next(args);
      window.ShopLCLeave = () => {
        CommonSetScreen("Room", "MainHall");
        DialogLeave();
        delete window.ShopLeave;
      };
      ShopVendor = CharacterLoadNPC("NPC_Shop_Vendor");
      InventoryWear(ShopVendor, "H1000", "Height", "Default");
      ShopVendor.Stage = "LC_BabyCantShopAlone1";
      ShopVendor.CurrentDialog = "Oh? Cutie, aren't you lost? Where are your parents?";
      CharacterSetCurrent(ShopVendor);
      DialogChangeMode("dialog");
    });
    hookFunction("ShopRun", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!isRuleActive(Player, 1006 /* CANT_GO_SHOP_ALONE */)) return next(args);
      DrawCharacter(Player, 0, 0, 1);
      DrawCharacter(ShopVendor, 500, 0, 1);
      DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
      DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
    });
    hookFunction("CharacterBuildDialog", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const C = args[0];
      if (C.CharacterID === "NPC_Shop_Vendor" && isRuleActive(Player, 1006 /* CANT_GO_SHOP_ALONE */)) {
        const stage1 = "LC_BabyCantShopAlone1";
        const stage2 = "LC_BabyCantShopAlone2";
        const stage3 = "LC_BabyCantShopAlone3";
        C.Dialog.push(
          {
            Stage: stage1,
            NextStage: stage2,
            Option: "Huh? I am adult!",
            Result: "(She starts laughing)",
            Function: null,
            Prerequisite: null,
            Group: null,
            Trait: null
          },
          {
            Stage: stage1,
            NextStage: null,
            Option: "(Leave shop)",
            Function: "LCLeave();",
            Prerequisite: null,
            Group: null,
            Trait: null,
            Result: null
          },
          {
            Stage: stage2,
            NextStage: stage3,
            Option: "I'm old enough to go to the shop!",
            Result: "Baby, please leave this shop, it's for adults only.",
            Function: null,
            Prerequisite: null,
            Group: null,
            Trait: null
          },
          {
            Stage: stage2,
            NextStage: null,
            Option: "(Leave shop)",
            Function: "LCLeave();",
            Prerequisite: null,
            Group: null,
            Trait: null,
            Result: null
          },
          {
            Stage: stage3,
            NextStage: null,
            Option: "(Leave shop)",
            Function: "LCLeave();",
            Prerequisite: null,
            Group: null,
            Trait: null,
            Result: null
          }
        );
        return;
      }
      return next(args);
    });
    hookFunction("Player.CanChangeOwnClothes", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("Player.IsDeaf", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return true;
      return next(args);
    });
    hookFunction("Player.IsBlind", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return true;
      return next(args);
    });
    hookFunction("Player.GetDeafLevel", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return 4;
      return next(args);
    });
    hookFunction("Player.GetBlindLevel", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return 3;
      return next(args);
    });
    hookFunction("Player.CanInteract", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("InventoryGroupIsBlockedForCharacter", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return true;
      return next(args);
    });
    hookFunction("DialogSelfMenuMapping.Expression.Click", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("CharacterAppearanceSetItem", HookPriority.OBSERVE, (args, next) => {
      const createdItem = next(args);
      const [C, Group, ItemAsset] = args;
      if (C.IsPlayer() && ["ItemMouth", "ItemMouth2", "itemMouth3"].includes(Group) && ItemAsset?.Name === "MilkBottle" && isRuleActive(Player, 1007 /* FALL_SLEEP_AFTER_MILK_BOTTLE */) && !isSleeping(Player)) {
        CharacterSetFacialExpression(Player, "Blush", "High");
        ChatRoomCharacterUpdate(Player);
        setTimeout(() => {
          document.body.style.filter = "blur(4px)";
          CharacterSetFacialExpression(Player, "Eyes", "Dazed");
          CharacterSetFacialExpression(Player, "Eyebrows", null);
          ChatRoomCharacterUpdate(Player);
          setTimeout(() => {
            document.body.style.filter = "";
            PoseSetActive(Player, "Kneel");
            CharacterSetFacialExpression(Player, "Emoticon", "Sleep");
            CharacterSetFacialExpression(Player, "Eyes", "Closed");
            ChatRoomCharacterUpdate(Player);
            modStorage.sleepState = true;
            syncStorage();
            messagesManager.sendLocal("You fall asleep");
            messagesManager.sendAction(`${getNickname(Player)} fell asleep, only spank or french kiss can wake <intensive> up`);
          }, getRandomNumber(6e3, 8e3));
        }, getRandomNumber(6e3, 1e4));
      }
      return createdItem;
    });
    ChatRoomRegisterMessageHandler({
      Priority: 10,
      Callback: (data, sender) => {
        if (!sender) return false;
        if (data.Type === "Activity" && !!data.Dictionary?.find) {
          const activityName = data.Dictionary.find((e) => {
            return !!e.ActivityName;
          })?.ActivityName;
          const target = getPlayer(
            data.Dictionary.find((e) => {
              return !!e.TargetCharacter;
            })?.TargetCharacter
          );
          if (target?.IsPlayer() && ["Spank", "FrenchKiss"].includes(activityName) && isSleeping(Player)) {
            CharacterSetFacialExpression(Player, "Emoticon", null);
            CharacterSetFacialExpression(Player, "Eyes", "Open");
            ChatRoomCharacterUpdate(Player);
            modStorage.sleepState = false;
            syncStorage();
          }
        }
        return false;
      }
    });
    hookFunction("DialogMenuButtonBuild", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      next(args);
      const C = args[0];
      const item = InventoryGet(C, C?.FocusGroup?.Name);
      if (C.IsPlayer() && item && ((item?.Asset?.Category?.includes("ABDL") || extendedABDLItemNames.includes(item?.Asset?.Name)) && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */) || isRuleActive(Player, 1018 /* PREVENT_FREEING_SELF */) && item?.Asset?.IsRestraint)) {
        {
          const removeIndex = DialogMenuButton.indexOf("Remove");
          const struggleIndex = DialogMenuButton.indexOf("Struggle");
          const dismountIndex = DialogMenuButton.indexOf("Dismount");
          const escapeIndex = DialogMenuButton.indexOf("Escape");
          if (removeIndex >= 0) {
            DialogMenuButton[removeIndex] = "LC_Remove";
          }
          if (struggleIndex >= 0) {
            DialogMenuButton[struggleIndex] = "LC_Struggle";
          }
          if (dismountIndex >= 0) {
            DialogMenuButton[dismountIndex] = "LC_Dismount";
          }
          if (escapeIndex >= 0) {
            DialogMenuButton[escapeIndex] = "LC_Escape";
          }
        }
      }
    });
    hookFunction("DialogItemClick", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const C = CharacterGetCurrent();
      if (C === null) return next(args);
      const focusGroup = C.FocusGroup;
      const item = InventoryGet(C, focusGroup?.Name);
      const clickedItem = args[0];
      if (DialogMenuMode !== "items") return next(args);
      if (C.IsPlayer() && (item?.Asset?.Category?.includes("ABDL") || item?.Asset?.Name && extendedABDLItemNames.includes(item.Asset.Name)) && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) return;
      if (!C.IsPlayer() && clickedItem?.Asset?.IsRestraint && isRuleActive(Player, 1012 /* PREVENT_USING_BONDAGE_ON_OTHER */)) {
        if (getRuleParameter2(Player, 1012 /* PREVENT_USING_BONDAGE_ON_OTHER */, "allowAbdlItems") && clickedItem.Asset.Category?.includes("ABDL")) return next(args);
        return;
      }
      return next(args);
    });
    hookFunction("InterfaceTextGet", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const label = buttonLabels.get(args[0]?.replace("DialogMenu", ""));
      if (label) return label;
      return next(args);
    });
    hookFunction("DrawGetImage", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const redirect = imageRedirects.get(args[0]);
      if (redirect) {
        args[0] = redirect;
      }
      return next(args);
    });
    hookFunction("DialogIsMenuButtonDisabled", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (args[0]?.startsWith("LC_")) return true;
      return next(args);
    });
    hookFunction("DialogMenuButtonClick", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const C = CharacterGetCurrent();
      for (let I = 0; I < DialogMenuButton.length; I++) {
        if (MouseIn(1885 - I * 110, 15, 90, 90) && C) {
          const hooks = dialogMenuButtonClickHooks.get(DialogMenuButton[I]);
          if (hooks?.some((hook) => hook(C))) return true;
        }
      }
      return next(args);
    });
    hookFunction("DrawButton", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const [Left, Top, Width, Height, Label, Color, Image] = args;
      if (isRuleActive(Player, 1010 /* PACIFIER_CHECKBOXES */) && Width === Height && Width === 64 && Image === "Icons/Checked.png") args[6] = pacifier_default;
      return next(args);
    });
    hookFunction("ElementCreate", HookPriority.OBSERVE, (args, next) => {
      const [options] = args;
      if (!isRuleActive(Player, 1010 /* PACIFIER_CHECKBOXES */)) return next(args);
      if (options.tag !== "input" || options.attributes?.type !== "checkbox") return next(args);
      logger.debug("ElementCreate", options);
      const el = next(args);
      el.classList.add("paciCheckbox");
      return el;
    });
    hookFunction("TimerProcess", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (timerLastRulesCycleCall + 2e3 <= CommonTime()) {
        if (isRuleActive(Player, 1011 /* CONTROL_NICKNAME */) && Player.Nickname !== (getRuleParameter2(Player, 1011 /* CONTROL_NICKNAME */, "nickname") ?? "")) {
          const status = CharacterSetNickname(Player, getRuleParameter2(Player, 1011 /* CONTROL_NICKNAME */, "nickname") ?? "");
          if (typeof status === "string") {
            modStorage.rules.list.find((r) => r.id === 1011 /* CONTROL_NICKNAME */).data.nickname = CharacterNickname(Player);
            syncStorage();
          }
        }
        if (isRuleActive(Player, 1011 /* CONTROL_NICKNAME */) && Player.LabelColor !== (getRuleParameter2(Player, 1011 /* CONTROL_NICKNAME */, "color") ?? Player.LabelColor)) {
          Player.LabelColor = getRuleParameter2(Player, 1011 /* CONTROL_NICKNAME */, "color") ?? Player.LabelColor;
          ServerAccountUpdate.QueueData({ LabelColor: Player.LabelColor });
        }
        if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !DialogIsKneeling(Player) && PoseAvailable(Player, "BodyLower", "Kneel") && !Player.Effect.includes("OnBed")) {
          PoseSetActive(Player, "Kneel", true);
          ChatRoomCharacterUpdate(Player);
        }
        const titleName = getRuleParameter2(Player, 1016 /* FORCE_TITLE */, "title");
        if (isRuleActive(Player, 1016 /* FORCE_TITLE */) && titleName !== null && Player.Title !== titleName) {
          TitleSet(titleName);
        }
        timerLastRulesCycleCall = CommonTime();
      }
      return next(args);
    });
    hookFunction("ChatSearchJoin", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!isRuleActive(Player, 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */) && !isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */)) return next(args);
      const [roomName] = args;
      const roomResult = ChatSearchResult.find((r) => r.Name === roomName);
      if (!roomResult) return next(args);
      const canJoinResult = chatRoomSearchCanJoinRoom(roomResult);
      if (!canJoinResult[0]) return toastsManager.error({
        message: canJoinResult[1],
        duration: 5e3
      });
      return next(args);
    });
    hookFunction("ElementButton.Create", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!isRuleActive(Player, 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */) && !isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */)) return next(args);
      if (ChatSearchMode === "Filter") return next(args);
      if (typeof args[0] !== "string") return next(args);
      if (!args[0].startsWith("chat-search-room-join-button-")) return next(args);
      const roomOrder = parseInt(args[0].replace("chat-search-room-join-button-", ""), 10);
      const roomResult = ChatSearchResult.find((r) => r.Order === roomOrder);
      if (!roomResult) return next(args);
      const canJoinResult = chatRoomSearchCanJoinRoom(roomResult);
      if (!canJoinResult[0]) {
        const buttonElement = next(args);
        buttonElement.style.backgroundColor = "rgb(237 204 255)";
        return buttonElement;
      }
      return next(args);
    });
    hookFunction("ChatSearchCreateGridRoomTooltip", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!isRuleActive(Player, 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */) && !isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */)) return next(args);
      const tooltips = next(args) ?? ElementCreate({
        tag: "div",
        attributes: { id: `chat-search-room-tooltip-${args[1]}` },
        classList: ["chat-search-room-tooltip"],
        children: []
      });
      const [roomResult] = args;
      const canJoinResult = chatRoomSearchCanJoinRoom(roomResult);
      if (!canJoinResult[0]) {
        tooltips.appendChild(
          ElementCreate({
            tag: "span",
            classList: ["chat-search-room-tooltip-entry", "chat-search-room-tooltip-lc-blocked"],
            children: [
              "Blocked by Littlish Club"
            ],
            style: {
              "background-color": "rgb(237 204 255)"
            }
          })
        );
      }
      return tooltips;
    });
    hookFunction("TitleIsForced", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!!InformationSheetSelection && isRuleActive(InformationSheetSelection, 1016 /* FORCE_TITLE */)) return true;
      return next(args);
    });
    hookFunction("CommandExecute", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!isRuleActive(Player, 1019 /* PREVENT_USING_CERTAIN_CHAT_COMMANDS */)) return next(args);
      let trigger = false;
      (getRuleParameter2(Player, 1019 /* PREVENT_USING_CERTAIN_CHAT_COMMANDS */, "commands") ?? []).forEach((c) => {
        if (args[0].startsWith(c)) {
          messagesManager.sendAction(
            `${getNickname(
              Player
            )} tried to use blocked command ${c}`
          );
          trigger = true;
          return;
        }
      });
      if (trigger) return false;
      return next(args);
    });
    hookFunction("CharacterNickname", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const [C] = args;
      if (!isRuleActive(Player, 1017 /* SHOW_CUSTOM_NAMES */)) return next(args);
      const customNames = getRuleParameter2(Player, 1017 /* SHOW_CUSTOM_NAMES */, "customNames");
      if (typeof customNames?.[C.MemberNumber ?? -1] === "string") {
        return customNames[C.MemberNumber ?? -1];
      }
      return next(args);
    });
  }

  // src/modules/access.ts
  function validateRuleConditions(r, data) {
    if (data.conditions) {
      if (!r.conditions) r.conditions = {};
      if (data.conditions.type && ["any", "all"].includes(data.conditions.type)) r.conditions.type = data.conditions.type;
      else r.conditions.type = "any";
      if (data.conditions.whenInRoomWithRole) {
        if (!r.conditions.whenInRoomWithRole) r.conditions.whenInRoomWithRole = {};
        if (typeof data.conditions.whenInRoomWithRole?.inRoom === "boolean") {
          r.conditions.whenInRoomWithRole.inRoom = data.conditions.whenInRoomWithRole.inRoom;
        }
        if (["mommy", "caregiver"].includes(data.conditions.whenInRoomWithRole?.role)) {
          r.conditions.whenInRoomWithRole.role = data.conditions.whenInRoomWithRole.role;
        }
      } else delete r.conditions.whenInRoomWithRole;
      if (data.conditions.whenInRoomWhereAbdl) {
        if (!r.conditions.whenInRoomWhereAbdl) r.conditions.whenInRoomWhereAbdl = {};
        if (typeof data.conditions.whenInRoomWhereAbdl?.blocked === "boolean") {
          r.conditions.whenInRoomWhereAbdl.blocked = data.conditions.whenInRoomWhereAbdl.blocked;
        }
      } else delete r.conditions.whenInRoomWhereAbdl;
    }
  }
  function validateRuleData(r, data) {
    const ruleParams = rulesList.find((g) => g.id === r.id)?.data ?? [];
    for (const param of ruleParams) {
      const p = data.data?.[param.name];
      if (param.type === "number" && typeof p !== "number") continue;
      if (param.type === "text" && typeof p !== "string") continue;
      if (param.type === "checkbox" && typeof p !== "boolean") continue;
      if (param.type === "color" && typeof p !== "string") continue;
      if (param.type === "list") {
        if (param.listNumbersOnly && (!Array.isArray(p) || !p.every((a) => typeof a === "number"))) continue;
        if (!param.listNumbersOnly && (!Array.isArray(p) || !p.every((a) => typeof a === "string" || typeof a === "number"))) continue;
      }
      if (param.type === "extended" && !param.validate?.(p)) continue;
      if (!r.data) r.data = {};
      r.data[param.name] = p;
    }
  }
  function isExploringModeEnabled() {
    return !hasMommy(Player);
  }
  function hasMommy(C) {
    if (C?.IsPlayer?.()) return typeof modStorage.mommy?.id === "number";
    return typeof C?.LITTLISH_CLUB?.mommy?.id === "number";
  }
  function getMommyOf(C) {
    if (C?.IsPlayer?.()) return modStorage.mommy ?? null;
    return C?.LITTLISH_CLUB?.mommy ?? null;
  }
  function getCaregiversOf(C) {
    if (C?.IsPlayer?.()) return modStorage.caregivers?.list ?? [];
    return C?.LITTLISH_CLUB?.caregivers?.list ?? [];
  }
  function isMommyOf(C1, C2) {
    if (C2?.IsPlayer?.()) return modStorage.mommy?.id === C1.MemberNumber;
    return C2?.LITTLISH_CLUB?.mommy?.id === C1.MemberNumber;
  }
  function isCaregiverOf(C1, C2) {
    return getCaregiversOf(C2)?.includes(C1.MemberNumber ?? -1);
  }
  function isRequestedByPlayer(C) {
    if (C?.IsPlayer()) return false;
    return C?.LITTLISH_CLUB?.requestReciviedFrom?.id === Player.MemberNumber;
  }
  var caregiverAccessRightsList = [
    {
      id: 1e3,
      name: "Manage Diaper",
      description: ""
    },
    {
      id: 1001,
      name: "Manage Rules",
      description: ""
    },
    {
      id: 1002,
      name: "Delete Notes",
      description: ""
    },
    {
      id: 1003,
      name: "Change Appearance",
      description: ""
    },
    {
      id: 1004,
      name: "Read Logs",
      description: ""
    },
    {
      id: 1005,
      name: "Manage ABCL Settings",
      description: ""
    }
  ];
  function isCaregiverAccessRightEnabled(C, accessRightId) {
    if (C?.IsPlayer?.()) return modStorage.caregivers?.accessRights?.includes(String.fromCharCode(accessRightId)) ?? false;
    return C?.LITTLISH_CLUB?.caregivers?.accessRights?.includes(String.fromCharCode(accessRightId)) ?? false;
  }
  function turnCaregiverAccessRight(accessRightId) {
    if (typeof modStorage.caregivers?.accessRights !== "string") {
      if (!modStorage.caregivers) modStorage.caregivers = {};
      modStorage.caregivers.accessRights = String.fromCharCode(accessRightId);
      return;
    }
    if (modStorage.caregivers.accessRights.includes(String.fromCharCode(accessRightId))) {
      modStorage.caregivers.accessRights = modStorage.caregivers.accessRights.replaceAll(String.fromCharCode(accessRightId), "");
    } else {
      modStorage.caregivers.accessRights += String.fromCharCode(accessRightId);
    }
  }
  function hasAccessRightTo(C1, C2, accessRight) {
    const c1ModStorage = C1.IsPlayer() ? modStorage : C1.LITTLISH_CLUB;
    const c2ModStorage = C2.IsPlayer() ? modStorage : C2.LITTLISH_CLUB;
    if (C1.IsPlayer() && C2.IsPlayer()) {
      if (isExploringModeEnabled()) return true;
    }
    switch (accessRight) {
      case "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */:
        return isMommyOf(C1, C2) || C1.MemberNumber === C2.MemberNumber && (c1ModStorage?.caregivers?.canChangeList ?? false);
      case "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */:
        return isMommyOf(C1, C2);
      case "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */:
        return isMommyOf(C1, C2);
      case "MANAGE_RULES" /* MANAGE_RULES */:
        return isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1001 /* MANAGE_RULES */);
      case "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */:
        return isMommyOf(C1, C2);
      case "MANAGE_DIAPER" /* MANAGE_DIAPER */:
        return isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1e3 /* MANAGE_DIAPER */);
      case "MANAGE_APPEARANCE" /* MANAGE_APPEARANCE */:
        return C1.MemberNumber === C2.MemberNumber && !isRuleActive(C1, 1014 /* PREVENT_APPLYING_OUTFITS_FROM_LITTLISH_WARDROBE_ON_SELF */) || isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1003 /* MANAGE_APPEARANCE */);
      case "DELETE_NOTES" /* DELETE_NOTES */:
        return isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1002 /* DELETE_NOTES */);
      case "READ_LOGS" /* READ_LOGS */:
        return C1.MemberNumber === C2.MemberNumber || isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1004 /* READ_LOGS */);
      case "DELETE_LOGS" /* DELETE_LOGS */:
        return isMommyOf(C1, C2);
      case "RELEASE_BABY" /* RELEASE_BABY */:
        return isMommyOf(C1, C2);
      case "SUMMON" /* SUMMON */:
        return isMommyOf(C1, C2) || isCaregiverOf(C1, C2);
      case "MANAGE_ABCL_SETTINGS" /* MANAGE_ABCL_SETTINGS */:
        return isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1005 /* MANAGE_ABCL_SETTINGS */);
    }
  }
  function loadAccess() {
    messagesManager.onRequest("getLogs", (_data, sender) => {
      const senderC = typeof sender === "number" ? getPlayer(sender) : sender;
      if (!senderC) return;
      if (!hasAccessRightTo(senderC, Player, "READ_LOGS" /* READ_LOGS */)) return;
      return modStorage.logs?.list ?? [];
    });
    messagesManager.onPacket("addBaby", (data, sender) => {
      if (hasMommy(Player) || modStorage.requestReciviedFrom?.id === sender.MemberNumber) return;
      if (sender.MemberNumber === void 0) return;
      modStorage.requestReciviedFrom = {
        name: CharacterNickname(sender),
        id: sender.MemberNumber
      };
      syncStorage();
      messagesManager.sendLocal(`${getNickname(sender)} (${sender.MemberNumber}) wants to become your mommy, open Littlish Club menu`);
    });
    messagesManager.onPacket("turnCanChangeCaregiversList", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */)) return;
      if (!modStorage.caregivers) modStorage.caregivers = {};
      modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
      addLog(
        `${getNickname(sender)} (${sender.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"} ${getNickname(Player)} to change caregivers list`,
        false
      );
      syncStorage();
    });
    messagesManager.onPacket("changeCaregiversList", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) return;
      if (!Array.isArray(data?.list)) return;
      if (!modStorage.caregivers) modStorage.caregivers = {};
      modStorage.caregivers.list = data.list;
      messagesManager.sendLocal(`${getNickname(sender)} (${sender.MemberNumber}) changed your caregivers list`);
      addLog(
        `${getNickname(sender)} (${sender.MemberNumber}) changed caregivers list`,
        false
      );
      syncStorage();
    });
    messagesManager.onPacket("turnCaregiversAccessRight", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */)) return;
      if (!caregiverAccessRightsList.find((r) => r.id === data?.accessRightId)) return;
      turnCaregiverAccessRight(data.accessRightId);
      const _message = `${getNickname(sender)} (${sender.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, data.accessRightId) ? "on" : "off"} caregiver access right "${caregiverAccessRightsList.find((r) => r.id === data.accessRightId).name}"`;
      addLog(
        _message,
        false
      );
      syncStorage();
      messagesManager.sendLocal(_message);
    });
    messagesManager.onPacket("changeRuleSettings", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "MANAGE_RULES" /* MANAGE_RULES */)) return;
      if (!rulesList.find((r2) => r2.id === data?.id)) return;
      if (isRuleStrict(Player, data.id) && !isMommyOf(sender, Player)) return;
      if (!modStorage.rules) modStorage.rules = {};
      if (!modStorage.rules.list) modStorage.rules.list = [];
      let r = modStorage.rules.list.find((d) => d.id === data.id);
      if (r) {
        if (typeof data.state === "boolean") r.state = data.state;
        if (typeof data.strict === "boolean" && hasAccessRightTo(sender, Player, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */)) {
          r.strict = data.strict;
        }
        validateRuleData(r, data);
        validateRuleConditions(r, data);
        r.changedBy = sender.MemberNumber ?? -1;
        r.ts = Date.now();
      } else {
        let d = {
          id: data.id,
          state: typeof data.state === "boolean" ? data.state : false,
          strict: typeof data.strict === "boolean" && hasAccessRightTo(sender, Player, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */) ? data.strict : false,
          changedBy: sender.MemberNumber ?? -1,
          ts: Date.now()
        };
        validateRuleData(d, data);
        validateRuleConditions(d, data);
        modStorage.rules.list.push(d);
      }
      const _message = `${getNickname(sender)} (${sender.MemberNumber}) changed settings of "${rulesList.find((r2) => r2.id === data?.id).name}" rule`;
      addLog(
        _message,
        false
      );
      syncStorage();
      messagesManager.sendLocal(_message);
    });
    messagesManager.onPacket("addNote", (data, sender) => {
      if (typeof data?.text !== "string" || data.text.trim() === "") return;
      if (new TextEncoder().encode(data.text).byteLength / 1024 > MAX_NOTE_SIZE_IN_KBYTES) {
        return messagesManager.sendLocal(
          `${getNickname(sender)} (${sender.MemberNumber}) tried to add note that takes up more size than the set limit. Probably it was attempt to break the account.`
        );
      }
      ;
      if (!modStorage.notes) modStorage.notes = {};
      if (!modStorage.notes.list) modStorage.notes.list = [];
      const note = {
        text: data.text,
        author: {
          name: CharacterNickname(sender),
          id: sender.MemberNumber ?? -1
        },
        ts: Date.now()
      };
      modStorage.notes.list.push(note);
      const _message = `${getNickname(sender)} (${sender.MemberNumber}) added note "${data.text}"`;
      addLog(_message, false);
      syncStorage();
      messagesManager.sendLocal(_message);
    });
    messagesManager.onPacket("deleteNote", (data, sender) => {
      if (typeof data?.key !== "number") return;
      const note = modStorage.notes?.list?.find((n, i) => i === data.key - 1);
      if (!note) return;
      if (note.author.id !== sender.MemberNumber && !hasAccessRightTo(sender, Player, "DELETE_NOTES" /* DELETE_NOTES */)) return;
      modStorage.notes.list.splice(data.key - 1, 1);
      const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted note "${note.text}"`;
      addLog(_message, false);
      syncStorage();
      messagesManager.sendLocal(_message);
    });
    messagesManager.onPacket("changeCyberDiaperSettings", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) return;
      const {
        name,
        description,
        model,
        locked,
        color,
        changePermission,
        property,
        typeRecord,
        drawingPriority
      } = data;
      if (!modStorage.cyberDiaper) {
        if (typeof name !== "string" || typeof description !== "string" || !Object.values(CyberDiaperModel).includes(model)) return;
        modStorage.cyberDiaper = { name, description, model };
        messagesManager.sendLocal(`${getNickname(sender)} bought cyber diaper for you`);
      }
      if (typeof name === "string") modStorage.cyberDiaper.name = name;
      if (typeof description === "string") modStorage.cyberDiaper.description = description;
      if (typeof model === "string") modStorage.cyberDiaper.model = model;
      if (typeof locked === "boolean") modStorage.cyberDiaper.locked = locked;
      if (Array.isArray(color)) modStorage.cyberDiaper.color = color;
      if (changePermission && Object.values(CyberDiaperChangePermission).includes(changePermission)) modStorage.cyberDiaper.changePermission = changePermission;
      if (typeof property === "string") modStorage.cyberDiaper.property = property;
      if (typeRecord) modStorage.cyberDiaper.typeRecord = typeRecord;
      if (drawingPriority) modStorage.cyberDiaper.drawingPriority = drawingPriority;
      const _message = `${getNickname(sender)} (${sender.MemberNumber}) changed cyber diaper's settings`;
      addLog(_message, false);
      syncStorage();
      updateDiaperItem();
      messagesManager.sendLocal(_message);
    });
    messagesManager.onPacket("releaseBaby", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "RELEASE_BABY" /* RELEASE_BABY */)) return;
      delete modStorage.mommy;
      syncStorage();
      messagesManager.sendLocal(`${getNickname(sender)} (${sender.MemberNumber}) released you`);
    });
    messagesManager.onPacket("deleteLogs", (data, sender) => {
      if (!hasAccessRightTo(sender, Player, "DELETE_LOGS" /* DELETE_LOGS */)) return;
      if (typeof data.count !== "number") return;
      const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted log entries (${data.count})`;
      modStorage.logs?.list?.splice(0, data.count);
      addLog(_message, false);
      messagesManager.sendLocal(_message);
      syncStorage();
    });
  }

  // src/modules/storage.ts
  var modStorage;
  function initStorage() {
    if (typeof Player.ExtensionSettings.LITTLISH_CLUB === "string") {
      modStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.LITTLISH_CLUB) ?? "{}") ?? { version };
    } else modStorage = { version };
    if (modStorage.version === void 0) {
      modStorage.version = version;
    }
    migrateModStorage();
    try {
      const bccStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.BCC) ?? "{}");
      if ((bccStorage?.abdl?.mommy || bccStorage?.abdl?.caretakers || bccStorage?.abdl?.notes?.list) && !findModByName("BCC")) bccAbdlPartSync(bccStorage.abdl);
    } catch (e) {
    }
    syncStorage();
    hookFunction("ChatRoomSync", HookPriority.ADD_BEHAVIOR, async (args, next) => {
      await next(args);
      messagesManager.sendPacket("syncStorage", {
        storage: deleteProtectedProperties(modStorage)
      });
    });
    messagesManager.onPacket("syncStorage", (data, sender) => {
      if (!sender.LITTLISH_CLUB) {
        messagesManager.sendPacket("syncStorage", {
          storage: deleteProtectedProperties(modStorage)
        }, sender.MemberNumber);
      }
      sender.LITTLISH_CLUB = data.storage;
      if (InformationSheetSelection && InformationSheetSelection.MemberNumber === sender.MemberNumber && window.LITTLISH_CLUB.inModSubscreen()) {
        getCurrentSubscreen()?.update();
      }
    });
  }
  function migrateModStorage() {
  }
  function bccAbdlPartSync(oldAbdlData) {
    if (!hasMommy(Player) && typeof oldAbdlData?.mommy?.id === "number") {
      modStorage.mommy = {
        name: oldAbdlData.mommy.name ?? "?",
        id: oldAbdlData.mommy.id
      };
    }
    if (Array.isArray(oldAbdlData?.caretakers?.list)) {
      const caregiversList = getCaregiversOf(Player);
      for (const memberNumber of oldAbdlData.caretakers.list) {
        if (!caregiversList.includes(memberNumber)) caregiversList.push(memberNumber);
      }
      if (!modStorage.caregivers) modStorage.caregivers = {};
      modStorage.caregivers.list = caregiversList;
    }
    if (Array.isArray(oldAbdlData?.notes?.list) && oldAbdlData.notes.list.length > 0) {
      if (!modStorage.notes) modStorage.notes = {};
      if (!modStorage.notes.list) modStorage.notes.list = [];
      for (const note of oldAbdlData.notes.list) {
        if (typeof note.text !== "string" || typeof note.author?.name !== "string" || typeof note.author?.id !== "number" || typeof note.time !== "number") continue;
        modStorage.notes.list.push({
          text: note.text,
          author: {
            name: note.author?.name,
            id: note.author?.id
          },
          ts: note.time
        });
      }
    }
    let bccStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.BCC) ?? "{}");
    delete bccStorage.abdl;
    Player.ExtensionSettings.BCC = LZString.compressToBase64(JSON.stringify(bccStorage));
    ServerPlayerExtensionSettingsSync("BCC");
    syncStorage();
    messagesManager.sendLocal("Littlish Club was synced with BCC's ABDL module");
  }
  function deleteProtectedProperties(data) {
    let _data = cloneDeep_default(data);
    delete _data.logs;
    return _data;
  }
  function syncStorage() {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.LITTLISH_CLUB = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("LITTLISH_CLUB");
    messagesManager.sendPacket("syncStorage", {
      storage: deleteProtectedProperties(modStorage)
    });
  }
  function resetStorage() {
    modStorage = {
      version
    };
    syncStorage();
  }

  // src/modules/api.ts
  function createApi() {
    window.LITTLISH_CLUB = Object.freeze({
      inModSubscreen: () => getCurrentSubscreen() instanceof BaseSubscreen,
      getCaregiversOf,
      getMommyOf,
      isCaregiverOf,
      isMommyOf,
      hasAccessRightTo,
      isRuleActive,
      isSleeping
    });
  }

  // src/images/milk-bottle.png
  var milk_bottle_default = "data:image/png;base64,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";

  // src/subscreens/acceptRequestMenu.ts
  var AcceptRequestMenu = class extends BaseSubscreen {
    get name() {
      return "Request to become your mommy";
    }
    load() {
      super.load();
      this.createText({
        text: `${modStorage.requestReciviedFrom.name} (${modStorage.requestReciviedFrom.id}) wants to become your mommy :3`,
        x: 200,
        y: 240,
        width: 1600,
        fontSize: 6
      }).style.textAlign = "center";
      this.createButton({
        text: "Accept",
        x: 550,
        y: 800,
        width: 400,
        padding: 2,
        onClick: () => {
          modStorage.mommy = {
            name: modStorage.requestReciviedFrom.name,
            id: modStorage.requestReciviedFrom.id
          };
          delete modStorage.requestReciviedFrom;
          this.exit();
        }
      });
      this.createButton({
        text: "Reject",
        x: 1050,
        y: 800,
        width: 400,
        padding: 2,
        onClick: () => {
          delete modStorage.requestReciviedFrom;
          this.exit();
        }
      });
    }
    exit() {
      super.exit();
      syncStorage();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/modules/ui.ts
  function loadUI() {
    hookFunction("InformationSheetRun", HookPriority.TOP, (args, next) => {
      if ((InformationSheetSelection?.IsPlayer() || InformationSheetSelection?.LITTLISH_CLUB) && !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) && !window.LSCG_REMOTE_WINDOW_OPEN && !window.LITTLISH_CLUB.inModSubscreen() && !window.MPA?.menuLoaded) {
        DrawButton(
          ...MOD_BUTTON_POSITION,
          "",
          "White",
          milk_bottle_default,
          MOD_NAME
        );
      }
      if (window.LITTLISH_CLUB.inModSubscreen()) {
        return getCurrentSubscreen()?.run();
      }
      next(args);
    });
    hookFunction("InformationSheetClick", HookPriority.OBSERVE, (args, next) => {
      if ((InformationSheetSelection?.IsPlayer() || InformationSheetSelection?.LITTLISH_CLUB) && !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) && !window.LSCG_REMOTE_WINDOW_OPEN && !window.LITTLISH_CLUB.inModSubscreen() && !window.MPA?.menuLoaded && MouseIn(...MOD_BUTTON_POSITION)) {
        InformationSheetUnload();
        if (typeof modStorage.requestReciviedFrom?.id === "number") {
          setSubscreen(new AcceptRequestMenu());
        } else {
          setSubscreen(new MainMenu());
        }
      }
      if (window.LITTLISH_CLUB.inModSubscreen()) {
        return getCurrentSubscreen()?.click();
      }
      next(args);
    });
    hookFunction("InformationSheetExit", HookPriority.OBSERVE, (args, next) => {
      if (window.LITTLISH_CLUB.inModSubscreen()) {
        return getCurrentSubscreen()?.exit();
      }
      next(args);
    });
  }

  // changelog.json
  var changelog_default = {
    generated_at: "2026-08-01T09:53:07.043Z",
    changes: [
      {
        message: "Switch to manual workflow trigger",
        sha: "2b567de610932280af0dafcb6054581b3d5f0bd5",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-08-01T08:34:34Z",
        tags: ["chore"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/2b567de610932280af0dafcb6054581b3d5f0bd5"
      },
      {
        message: "Optimize and improve main subscreen",
        sha: "ade55a72fd5c6c11b2136098c473594c27396278",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-08-01T08:29:26Z",
        tags: ["fix", "feature"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/ade55a72fd5c6c11b2136098c473594c27396278"
      },
      {
        message: "Adapt BC's DOMified checkboxes to the 'Pacifier-checkboxes' rule",
        sha: "29dc90e2e8c28b8f68148f57535298a6ba32b87e",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-07-31T21:22:21Z",
        tags: ["fix"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/29dc90e2e8c28b8f68148f57535298a6ba32b87e"
      },
      {
        message: "Fix pick title screen",
        sha: "3a89b687bdb6d90e8ce11f31934bd94e2c04b7bf",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-07-31T20:53:16Z",
        tags: ["fix"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/3a89b687bdb6d90e8ce11f31934bd94e2c04b7bf"
      },
      {
        message: 'Add "Bad girl in predicament" outfit',
        sha: "8658514b24a10341d16b293bbdd2d35aa756888f",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-07-31T18:20:18Z",
        tags: ["feature"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/8658514b24a10341d16b293bbdd2d35aa756888f"
      },
      {
        message: "Refactoring and fixing types",
        sha: "2a145fe7f6d35cba3f48a291df655b93bedc6478",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-07-31T18:09:08Z",
        tags: ["chore", "fix"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/2a145fe7f6d35cba3f48a291df655b93bedc6478"
      },
      {
        message: "Migrate to zois-core v2",
        sha: "d9e18b4f3610cb525df4eacf89fd57383d3a7f55",
        author: {
          name: "FurryZoi",
          avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4"
        },
        date: "2026-07-30T12:33:41Z",
        tags: ["chore"],
        commit_url: "https://github.com/FurryZoi/Littlish-Club/commit/d9e18b4f3610cb525df4eacf89fd57383d3a7f55"
      }
    ]
  };

  // src/index.ts
  bootstrap({
    name: "Littlish Club",
    fullName: "Littlish Club",
    key: "LC",
    version,
    repository: REPO_URL,
    fontFamily: "Emilys Candy",
    changelog: {
      data: changelog_default
    },
    onReady: () => {
      injectStyles(styles_default);
      initStorage();
      createApi();
      loadRules();
      loadCyberDiaper();
      loadUI();
      loadAccess();
      try {
        MainMenu.createCharacters();
        logger.log("Created MainMenu preview characters");
      } catch (e) {
        logger.error("Failed to create MainMenu preview characters", e);
      }
      logger.log(`v${version} loaded`);
      setTimeout(() => {
        toastsManager.success({
          title: "Littlish Club loaded",
          message: `v${version}`,
          duration: 4e3
        });
      }, 1e3);
      if (isVersionNewer(version, modStorage.version)) {
        waitFor(() => !!document.getElementById("InputChat")).then(() => {
          modStorage.version = version;
          syncStorage();
          const text = document.createElement("p");
          text.textContent = "Littlish Club was updated, click here to read changelog";
          text.onclick = showChangelogModal;
          messagesManager.sendLocal(text);
        });
      }
    }
  });
})();
/*! Bundled license information:

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/icons/book-text.mjs:
lucide/dist/esm/icons/check.mjs:
lucide/dist/esm/icons/chevron-down.mjs:
lucide/dist/esm/icons/circle-alert.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/circle-x.mjs:
lucide/dist/esm/icons/external-link.mjs:
lucide/dist/esm/icons/info.mjs:
lucide/dist/esm/icons/rotate-ccw.mjs:
lucide/dist/esm/icons/terminal.mjs:
lucide/dist/esm/icons/trash-2.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.28.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --repo lodash/lodash#4.18.1 -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=bundle.js.map
