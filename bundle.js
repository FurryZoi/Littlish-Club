(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
      var bcModSdk2 = function() {
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
          return o2.filter((o3) => !e2.has(o3) && e2.add(o3));
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
          e2.sort((o3, e3) => e3.priority - o3.priority);
          const r2 = function(o3, e3) {
            if (0 === e3.size) return o3;
            let t3 = o3.toString().replaceAll("\r\n", "\n");
            for (const [n3, r3] of e3.entries()) t3.includes(n3) || c(`ModSDK: Patching ${o3.name}: Patch ${n3} not applied`), t3 = t3.replaceAll(n3, r3);
            return (0, eval)(`(${t3})`);
          }(o2.original, t2);
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
            const l2 = function(o3) {
              let e4 = -1;
              for (const n2 of t.encode(o3)) {
                let o4 = 255 & (e4 ^ n2);
                for (let e5 = 0; e5 < 8; e5++) o4 = 1 & o4 ? -306674912 ^ o4 >>> 1 : o4 >>> 1;
                e4 = e4 >>> 8 ^ o4;
              }
              return ((-1 ^ e4) >>> 0).toString(16).padStart(8, "0").toUpperCase();
            }(c2.toString().replaceAll("\r\n", "\n")), d2 = { name: o2, original: c2, originalHash: l2 };
            r2 = Object.assign(Object.assign({}, d2), { precomputed: s(d2), router: () => {
            }, context: e3, contextProperty: a2[a2.length - 1] }), r2.router = /* @__PURE__ */ function(o3) {
              return function(...e4) {
                return o3.precomputed.enter.apply(this, [e4]);
              };
            }(r2), i.set(o2, r2), e3[r2.contextProperty] = r2.router;
          }
          return r2;
        }
        function d() {
          for (const o2 of i.values()) o2.precomputed = s(o2);
        }
        function p() {
          const o2 = /* @__PURE__ */ new Map();
          for (const [e2, t2] of i) o2.set(e2, { name: e2, original: t2.original, originalHash: t2.originalHash, sdkEntrypoint: t2.router, currentEntrypoint: t2.context[t2.contextProperty], hookedByMods: r(t2.precomputed.hooks.map((o3) => o3.mod)), patchedByMods: Array.from(t2.precomputed.patchesSources) });
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
          }, p2 = { unload: s2("unload", () => u(g2)), hookFunction: s2("hookFunction", (o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            "number" != typeof t3 && e(`Mod ${r2} failed to hook function '${o3}': Expected priority number, got ${typeof t3}`), "function" != typeof n2 && e(`Mod ${r2} failed to hook function '${o3}': Expected hook function, got ${typeof n2}`);
            const s3 = { mod: g2.name, priority: t3, hook: n2 };
            return a3.hooks.push(s3), d(), () => {
              const o4 = a3.hooks.indexOf(s3);
              o4 >= 0 && (a3.hooks.splice(o4, 1), d());
            };
          }), patchFunction: s2("patchFunction", (o3, t3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            n(t3) || e(`Mod ${r2} failed to patch function '${o3}': Expected patches object, got ${typeof t3}`);
            for (const [n2, i4] of Object.entries(t3)) "string" == typeof i4 ? a3.patches.set(n2, i4) : null === i4 ? a3.patches.delete(n2) : e(`Mod ${r2} failed to patch function '${o3}': Invalid format of patch '${n2}'`);
            d();
          }), removePatches: s2("removePatches", (o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const t3 = l(o3);
            c2(t3).patches.clear(), d();
          }), callOriginal: s2("callOriginal", (o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to call a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3);
            return Array.isArray(t3) || e(`Mod ${r2} failed to call a function: Expected args array, got ${typeof t3}`), i3.original.apply(null != n2 ? n2 : globalThis, t3);
          }), getOriginalHash: s2("getOriginalHash", (o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to get hash: Expected function name string, got ${typeof o3}`);
            return l(o3).originalHash;
          }) }, g2 = { name: o2.name, fullName: o2.fullName, version: o2.version, repository: o2.repository, allowReplace: i2, api: p2, loaded: true, patching: /* @__PURE__ */ new Map() };
          return f.set(o2.name, g2), Object.freeze(p2);
        }
        function h() {
          const o2 = [];
          for (const e2 of f.values()) o2.push({ name: e2.name, fullName: e2.fullName, version: e2.version, repository: e2.repository });
          return o2;
        }
        let m;
        const y = void 0 === window.bcModSdk ? window.bcModSdk = function() {
          const e2 = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) };
          return m = e2, Object.freeze(e2);
        }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')
One of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk);
        return "undefined" != typeof exports2 && (Object.defineProperty(exports2, "__esModule", { value: true }), exports2.default = y), y;
      }();
    }
  });

  // src/constants.ts
  var MOD_VERSION = "1.0.4";
  var MOD_NAME = "Littlish Club";
  var MOD_FULL_NAME = MOD_NAME;
  var REPO_URL = "https://github.com/FurryZoi/Littlish-Club";
  var MOD_MESSAGE_KEY = "lcMsg";
  var DISCORD_SERVER_INVITE_LINK = "https://discord.gg/aDUvte772D";
  var DISCORD_SERVER_LW_OUTFITS_CHANNEL_LINK = "https://discord.com/channels/1253391626378674289/1356326756105195622";
  var MOD_BUTTON_POSITION = [1700, 800 - 115, 90, 90];
  var MAX_NOTE_SIZE_IN_KBYTES = 0.2;
  var MY_APPEARANCE_BUNDLE = "NobwRAcghgtgpmAXGAmgVwNZQC5QIxgA0YA4gE4D2aADkmAMIA2F2AFkQxc2UsGAMQAmAJwAGAMziAgmAC6AX0Lho8OvVYBLAHZwAznAAKULdg16CxclVrIjJs7o70uFHsgAicAGZQ0jbGCKyrAIyORQACZmJnbYAJ6sFPocVjR0AMoUAMYYjsTO3LwCACwAQqLCAGzFHPx4YuKCMgpKkCFqaLrYFDAAEnBwjHmklGnI6Yl6Ti5ufPzFAKKiAOwArJW1UvTCAGIAHDLE/Fu7B5vb+4dgnj5+AbLEBpTUcGTxSOAAKnEvAEpwWVcEQ+YBgSFExC04OIFHBimuGi8Xg0WTucWhYFKzByvAeYAWSIBAUQwDxvQ0EVCpOI5MpAElsHAwSS8VJGMwAO5SLKmABuGneLOIUmw2DIGgARmhGbj5EE2qpkL0KpVRClRjYwP0NABzVgBfIzWWtFShMAAGSgZB1CEsGropQoETiAFVqC8eIbCsgpLoNMYOE8KB7BV8fnB/oCyMDEOB4i8Y6J4d8XkgtH5GHKTe1kAANS3W20jawOp1xc0UDmvabesC+/1Q+Wmui9KAaMg7SgmQSrdUlpVtjtdg2cb1zcT0UTrPZyJs5rWD0pQHLFQR9sYL9tLnFe1xFfgTqeVGctYKK/FxOASygc3Rru39i9Xm/DAp7jzeXz+QPPV6hsAphGAJAiCjiIBCYA2BBbhJsQ7iIsiqL+Oi4HEFi2QYLixAEl4RJYVqFJUmShEMky+Fspy3J8gKKHUnWorilKMpCgB4Z0LoojUKIZBqlmZ5mgsl66HgFjFhuglTLuswCHs4jFMIpRrqeCpmvQOASeumoSRMkSVjW75zII5SrIsciPL+bwoeAADy1DLjR4IAHR7HxKl0BJwmiakWlCfeo4GTJckKUpc7njsGaaXQACyVBsPp0lCHgEjiMstRQFAqyZb2eJBiGVmsX8wHRiCjAYsSsEIkiKJohi6E4ixOF4SxtJETSJGMsydEUZWVEaPygpdQxkrSq1BVmowojYLxoVmhAGjuoweh+d5dBzQtkn+W41yfncgTZueBidLocRefathHeiUl0DcX4BDNGSsHA/SemJmpBloVBaK+Rofrc373b9t2RUqcCRPF107f9+1mlinTsA+G6w7o8ObRDf13dDdA7IwaAUsMK3INjuMRN9tY3btAP4jALAohQUII1p1OmIC9Oo4DFOY8gvxJHA9A3qzBMLiOb4JXgpTLAsYu1AsxSrMIUhqspzaExoyM6NgJDMLyG2C5rFDa6TAX8JUqw9pls6c2AADSqu6DAVqYQz0VQLojts4ZEj1Ir5nBn++WAZGIGxmAWRIHgxBuOHYBeBiUKoWApXgfC8FVUhgoQXVmENYSPL4S1eftWRLHdVyPJ9Q5xdDUxRGucrkAAhgjDLnANRO8gEAN03WRFiLaNA5TwN1mQMC6Oa3jCz923o3t/F0IPUjD7ovy6vq4Ps1Ds/IIPrZaCTY9eBPZOQxjm9gNvxgk8veqH++U/97IQA==";
  var CANVAS_BABIES_APPEARANCES = [
    {
      name: "Little Baby",
      creator: "Zoi",
      bundle: "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"
    },
    {
      name: "Purple Baby",
      creator: "Luna",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUFFUA4GDcGGqVvNISSYgoGoUC4b4UmC3wPPQapEhwAGwvQw3DUNAS/uCsJEgB0gPOCDyMP+tpodqurcPqvyqtedAcLwD6ybUch6uiLKtWOlhricrbAmC4L0EwW0Af1L0zaQoJfp9bB0gldAWbhmINXWFkEADWC2Dglhvdd75gl9X4IhVf14DAMnFeYtiYtJINQO1Vmo2ZgJdR99BfYjYkORQrx1rIti2BgBBXUTm7w/xbkFB5G3kztcmBFjGLHGlhq9HYFCdSzpOS9zv2oBZmXU5ZGAM3gGT4HL4bi7dEIPYwT3vfdj3ffuwrhWKKaljOSOy/L6xbBo5l/UrD6q3g6uDMzWscNIv5qhwarS6pqAQPonpQEDrTB646jSLV7sblrBu6/x2uG3uoUQUenFlHFVvvFAgYBKefAKOCh0NCyLJfFDmuUgyHDmN8DIMgH3nSLjhfSQrugC+iUyE/HlKvf1AEPBwjAcA8Dwt+Je35XgBdF1AWkOzIcY1+2v6wpvy3GwOoSrRhG1YaQOF4ZGFoFFaZGkRxJHup63ocdRAZBqG4aDpGzExnGCaOrangYBzNaUKTkHTOViIAggpJUBOHBoXIs7BxR0AQA2HM+lc43goJYbExUADSWAixUH0DgmGxMG7DWYL2XepshxgAPutfU2FjTYg4hfK+t9XTX3vpRJ+/paKvwYh/JiLEf7sUjEg1AAQGxQAbAUBsth6A8QqLnKqd4Ex4CXELHoUB6ZFgcBiTUWB1DBxwOvdmnNBjmM8uqdy1i6G2K5itTUa1MIoGYNQyCoQADyIZ1CxgdLAvg79QjaN0XKAAtF+UgN4GYUAQsgSJs5OC4yKKEKq3R9BhP0QEQxxiKCmI8fqMAFkiHJHYOsPCbRiolLidwAABJYCgl86kIAMewNylgAixgQMGScVTSGuQcQQYgViNojKGeMjmdjYEhipmUDm3BLAYFIBIkSpAqphU8bQnxfjXSBNjJnUJp4UCRKQjEggcSTkNiSTEqgLJ1BkDgHc7YyAGw/kYEtaJXp7lQCFgALRgFgZRgggA"
    },
    {
      name: "White Baby",
      creator: "Luna",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOynrq2wJgmqHBqr+aqMABHBdgy5gPINTC/OYtIVWpdjBjJxUODAMAFM1NguG+FJghwDKMA80j/qQoI7XtB2Dbt+2HdtF1neBwrhWKKaljOM2oBZuGYqlbzvViljMJtm4MmqarSCDAEMrCv4Ng85gIq9YAUVQDgYNwYZfXW0hJJia0UBt7XvmCDzgrCDIcEuW70LClP8aCDxqg8v4PGNR1M9IDIjXuYBodqurcPqvyqtedCI54fCWDAtXmPVfONQoPRQLYp4A51gFAWrnPcxhfODuC8Mi2LMBLmldUNRQTXy4rRbK5Savq7amu8/q4L7vdkGhAA8iG6ixg6TgTrGTvRPD0hQBiKMYK8dZ6AEGDolMZmAlttPmIwRIPOTTOZ2NdIJXQFmZQQ6xbBo5l5xgEd4Bk+D5+G1vbQd3VqnDYkORQketLItiKwQa4nB1lIcJNDbSP8R3SBwjANinzdC3i9yBjHRZ8Ao4K1Q0LIsl8lhEnXoJqsw0hEhwHAz7nqAQLwXvo60F8wFfS6J5uarmGTarNjnqmoFV+V4Avp7L7VaQcZd6Q1AVdNyBQPJ83YBAqBgxQRH1+OCcwO87oDlCA7TCiFSA4TwpGC0BQrRkVIhxEi7pPTeg4tRAMQZQzhkHJGZiMY4wJkdLaTwGAczWjADocMBBpIAAJ8xYFsIvMyHCuGklQCtARch1rqHEU9VACBfg5n0nrChd4Ex4CNm8BwGIsAQAoDgOusDPLqncuYrmljoH201DzLByAiQu3QUOHhH0MByGkIOdxXsoCWH0XIY02JSDrCxDeL0LJ1BkDgFQKJZgGw/kYIwX8BFCFEU6mE7EiJOChyKKERGs0AiGOMY4CC+owAWSoBQZI7Asm6DvgowJwTao6DgLYCggBMAksEIgxMDCwBFjAgYMk42j4zMNYyBepiBmL5jMmxgw/YhjbmUSB3BLAYFIOKZ63BSCIzCm7IcMQIlxOibE+JKBEngmSaksAJz4nGwAFowCwBUDRXotEPlXsVAA0lgIs1SoAhL7gTUE9Bvj0C/L2YQgggA=="
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

  // src/modules/bcModSdk.ts
  var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());
  var modSdk = import_bondage_club_mod_sdk.default.registerMod({
    name: MOD_NAME,
    fullName: MOD_FULL_NAME,
    version: MOD_VERSION,
    repository: REPO_URL
  });
  function hookFunction(functionName, priority, hook) {
    return modSdk.hookFunction(functionName, priority, hook);
  }
  function findModByName(name) {
    return !!import_bondage_club_mod_sdk.default.getModsInfo().find((m) => m.name === name);
  }

  // src/images/milk-bottle.png
  var milk_bottle_default = "data:image/png;base64,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";

  // src/subscreens/baseSubscreen.ts
  function getRelativeHeight(height) {
    return height * (MainCanvas.canvas.clientHeight / 1e3);
  }
  function getRelativeWidth(width) {
    return width * (MainCanvas.canvas.clientWidth / 2e3);
  }
  function getRelativeY(yPos, anchorPosition = "top") {
    const scaleY = MainCanvas.canvas.clientHeight / 1e3;
    return anchorPosition === "top" ? MainCanvas.canvas.offsetTop + yPos * scaleY : MainCanvas.canvas.offsetTop + MainCanvas.canvas.clientHeight - yPos * scaleY;
  }
  function getRelativeX(xPos, anchorPosition = "left") {
    const scaleX = MainCanvas.canvas.clientWidth / 2e3;
    return anchorPosition === "left" ? MainCanvas.canvas.offsetLeft + xPos * scaleX : MainCanvas.canvas.offsetLeft + MainCanvas.canvas.clientWidth - xPos * scaleX;
  }
  function setPosition(element, xPos, yPos, anchorPosition = "top-left") {
    const yAnchor = anchorPosition === "top-left" || anchorPosition === "top-right" ? "top" : "bottom";
    const xAnchor = anchorPosition === "top-left" || anchorPosition === "bottom-left" ? "left" : "right";
    const y = getRelativeY(yPos, yAnchor);
    const x = getRelativeX(xPos, xAnchor);
    Object.assign(element.style, {
      position: "fixed",
      [xAnchor]: x + "px",
      [yAnchor]: y + "px"
    });
  }
  function setSize(element, width, height) {
    const w = getRelativeWidth(width);
    const h = getRelativeHeight(height);
    Object.assign(element.style, {
      "width": w + "px",
      "height": h + "px"
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
  function loadSubscreen(subscreen) {
    subscreen.createButton({
      x: 1815,
      y: 75,
      width: 90,
      height: 90,
      icon: "Icons/Exit.png"
    }).addEventListener("click", () => subscreen.exit());
    subscreen.load();
  }
  function setPreviousSubscreen() {
    setSubscreen(previousSubscreen);
  }
  function setSubscreen(subscreen) {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    if (currentSubscreen) loadSubscreen(currentSubscreen);
    if (previousSubscreen) previousSubscreen.unload();
  }
  var currentSubscreen;
  var previousSubscreen = null;
  var BaseSubscreen = class {
    htmlElements = [];
    resizeEventListeners = [];
    get currentSubscreen() {
      return currentSubscreen;
    }
    get name() {
      return "";
    }
    run() {
    }
    load() {
    }
    unload() {
      this.htmlElements.forEach((e) => {
        e.remove();
      });
      this.resizeEventListeners.forEach((e) => {
        removeEventListener("resize", e);
      });
    }
    click() {
    }
    exit() {
      setPreviousSubscreen();
    }
    update() {
    }
    setPreviousSubscreen() {
      setPreviousSubscreen();
    }
    setSubscreen(subscreen) {
      setSubscreen(subscreen);
    }
    createButton({
      text,
      x,
      y,
      width,
      height,
      fontSize = "auto",
      anchor = "top-left",
      padding,
      style = "default",
      place = true,
      icon,
      iconAbsolutePosition = true,
      iconWidth
    }) {
      const btn = document.createElement("button");
      btn.classList.add("lcButton");
      btn.setAttribute("data-lc-style", style);
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.columnGap = "1.25vw";
      if (icon) {
        const img = document.createElement("img");
        img.src = icon;
        if (iconWidth) img.style.width = iconWidth;
        else img.style.height = "80%";
        if (text && iconAbsolutePosition) {
          img.style.position = "absolute";
          img.style.left = "1vw";
        }
        if (text && !iconAbsolutePosition) btn.style.justifyContent = "";
        btn.append(img);
      }
      if (text) {
        const span = document.createElement("span");
        span.textContent = text;
        if (icon && !iconAbsolutePosition && iconWidth) {
          span.style.width = "100%";
          span.style.marginRight = iconWidth;
        }
        btn.append(span);
      }
      const setProperties = () => {
        if (x && y) setPosition(btn, x, y, anchor);
        setSize(btn, width, height);
        if (padding) setPadding(btn, padding);
        if (fontSize === "auto") autosetFontSize(btn);
        else setFontSize(btn, fontSize);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      if (place) document.body.append(btn);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(btn);
      return btn;
    }
    createText({
      text,
      color,
      x,
      y,
      width,
      height,
      withBackground = false,
      fontSize = "auto",
      anchor = "top-left",
      padding,
      place = true
    }) {
      const p = document.createElement("p");
      p.innerHTML = text;
      p.style.color = color ?? "var(--tmd-text, black)";
      if (withBackground) p.style.background = "var(--tmd-element,rgb(239, 239, 239))";
      p.style.fontFamily = "Emilys Candy";
      const setProperties = () => {
        if (x && y) setPosition(p, x, y, anchor);
        setSize(p, width, height);
        if (padding) setPadding(p, padding);
        if (fontSize === "auto") autosetFontSize(p);
        else setFontSize(p, fontSize);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      if (place) document.body.append(p);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(p);
      return p;
    }
    createInput({
      value,
      placeholder,
      x,
      y,
      width,
      height,
      textArea = false,
      fontSize = "auto",
      anchor = "top-left",
      padding,
      place = true
    }) {
      const input = document.createElement(textArea ? "textarea" : "input");
      input.classList.add("lcInput");
      if (placeholder) input.placeholder = placeholder;
      if (value) input.value = value;
      const setProperties = () => {
        if (x && y) setPosition(input, x, y, anchor);
        setSize(input, width, height);
        if (padding) setPadding(input, padding);
        if (fontSize === "auto") autosetFontSize(input);
        else setFontSize(input, fontSize);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      if (place) document.body.append(input);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(input);
      return input;
    }
    createCheckbox({
      text,
      x,
      y,
      isChecked,
      width,
      anchor = "top-left",
      place = true
    }) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isChecked;
      checkbox.classList.add("lcCheckbox", "checkbox");
      const p = document.createElement("p");
      p.textContent = text;
      p.style.color = "var(--tmd-text, black)";
      p.style.fontFamily = "Emilys Candy";
      const setProperties = () => {
        if (x && y) setPosition(checkbox, x, y, anchor);
        setPosition(p, x + 100, y, anchor);
        setSize(checkbox, 65, 65);
        if (width) setSize(p, width, null);
        setFontSize(p, 5);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      if (place) document.body.append(checkbox, p);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(checkbox, p);
      return checkbox;
    }
    createScrollView({
      scroll,
      x,
      y,
      width,
      height,
      anchor = "top-left"
    }) {
      const div = document.createElement("div");
      if (scroll === "all") div.style.overflow = "scroll";
      if (scroll === "x") div.style.overflowX = "scroll";
      if (scroll === "y") div.style.overflowY = "scroll";
      const setProperties = () => {
        if (x && y) setPosition(div, x, y, anchor);
        setSize(div, width, height);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      document.body.append(div);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(div);
      return div;
    }
    createInputList({
      x,
      y,
      width,
      height,
      title,
      value,
      anchor = "top-left",
      place = true,
      numbersOnly = false
    }) {
      const items = [];
      const div = document.createElement("div");
      div.style.cssText = `
        display: flex; flex-direction: column; gap: 1vw; border: 2px solid var(--tmd-accent, black);
        font-family: Emilys Candy; border-radius: 4px; padding: 0.75vw;
        `;
      const buttonsElement = document.createElement("div");
      buttonsElement.style.cssText = "display: flex; justify-content: center; column-gap: 1vw; width: 100%;";
      const titleElement = document.createElement("b");
      titleElement.textContent = title + ":";
      titleElement.style.cssText = "width: 100%; font-size: clamp(10px, 2.4vw, 24px); color: var(--tmd-text, black);";
      const itemsElement = document.createElement("div");
      itemsElement.style.cssText = `display: flex; gap: 1vw; flex-wrap: wrap; align-content: flex-start;
        overflow-y: scroll;`;
      const input = document.createElement("input");
      input.style.cssText = "border: none; outline: none; background: none; height: fit-content; flex-grow: 1; padding: 0.8vw; width: 6vw; font-size: clamp(8px, 2vw, 20px);";
      const addButton = (icon, onClick) => {
        const b = document.createElement("button");
        b.style.cssText = "cursor: pointer; display: grid; place-items: center; background: var(--tmd-element-hover, #e0e0e0); width: 10%; max-width: 40px; aspect-ratio: 1/1; border-radius: 8px; border: none;";
        const img = DrawGetImage(icon);
        img.style.cssText = "width: 90%;";
        b.append(img);
        buttonsElement.append(b);
        b.addEventListener("click", onClick);
      };
      const addItem = (text) => {
        const item = document.createElement("div");
        item.style.cssText = "cursor: pointer; background: var(--tmd-element-hover, rgb(206, 206, 206)); color: var(--tmd-text, black); height: fit-content; padding: 0.8vw; border-radius: 0.8vw; font-size: clamp(8px, 2vw, 20px);";
        item.textContent = text;
        itemsElement.insertBefore(item, input);
        item.addEventListener("click", (e) => {
          if (item.style.border === "") item.style.border = "2px solid red";
          else item.style.border = "";
          e.stopPropagation();
        });
        items.push(text);
      };
      const setProperties = () => {
        if (x && y) setPosition(div, x, y, anchor);
        setSize(div, width, height);
      };
      addButton("Icons/Cancel.png", () => {
        itemsElement.innerHTML = "";
        items.splice(0, items.length);
        itemsElement.append(input);
        value.forEach((v) => addItem(String(v)));
      });
      addButton("Icons/Trash.png", () => {
        for (const c of [...itemsElement.children]) {
          if (c.getAttribute("style").includes("border: 2px solid red;")) {
            items.splice(items.indexOf(c.textContent), 1);
            c.remove();
          }
        }
      });
      setProperties();
      window.addEventListener("resize", setProperties);
      input.addEventListener("keypress", (e) => {
        if (document.activeElement === input) {
          switch (e.key) {
            case "Enter":
              if (numbersOnly && Number.isNaN(parseInt(input.value))) return;
              if (!numbersOnly && input.value.trim() === "") return;
              addItem(input.value);
              input.value = "";
              break;
          }
        }
      });
      div.addEventListener("click", (e) => {
        if (e.currentTarget == div) input.focus();
      });
      itemsElement.append(input);
      div.append(buttonsElement, titleElement, itemsElement);
      document.body.append(div);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(div);
      value.forEach((v) => addItem(String(v)));
      return [
        div,
        () => numbersOnly ? items.map((i) => parseInt(i)) : items
      ];
    }
    createImage({
      x,
      y,
      width,
      src
    }) {
      const img = document.createElement("img");
      img.src = src;
      const setProperties = () => {
        if (x && y) setPosition(img, x, y);
        setSize(img, width, 0);
        img.style.height = "auto";
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      document.body.append(img);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(img);
      return img;
    }
  };

  // src/modules/access.ts
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
    return getCaregiversOf(C2)?.includes(C1.MemberNumber);
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
    }
  ];
  function isCaregiverAccessRightEnabled(C, accessRightId) {
    if (C?.IsPlayer?.()) return modStorage.caregivers?.accessRights?.includes(String.fromCharCode(accessRightId));
    return C?.LITTLISH_CLUB?.caregivers?.accessRights?.includes(String.fromCharCode(accessRightId));
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
        return isMommyOf(C1, C2) || C1.MemberNumber === C2.MemberNumber && c1ModStorage.caregivers?.canChangeList;
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
    }
  }

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getRawTag.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGetTag.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isObject.js
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isFunction.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isMasked.js
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_toSource.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsNative.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_WeakMap.js
  var WeakMap = getNative_default(root_default, "WeakMap");
  var WeakMap_default = WeakMap;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseCreate.js
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ function() {
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
  }();
  var baseCreate_default = baseCreate;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copyArray.js
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default = copyArray;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_defineProperty.js
  var defineProperty = function() {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  var defineProperty_default = defineProperty;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayEach.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var isIndex_default = isIndex;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssignValue.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/eq.js
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_default = eq;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copyObject.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isLength.js
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  var isLength_default = isLength;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isPrototype.js
  var objectProto5 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsArguments.js
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isArguments.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments_default : function(value) {
    return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments_default = isArguments;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isBuffer.js
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsTypedArray.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nodeUtil.js
  var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess = moduleExports2 && freeGlobal_default.process;
  var nodeUtil = function() {
    try {
      var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeUtil_default = nodeUtil;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayLikeKeys.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nativeKeys.js
  var nativeKeys = overArg_default(Object.keys, Object);
  var nativeKeys_default = nativeKeys;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseKeys.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/keys.js
  function keys(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default = keys;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nativeKeysIn.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseKeysIn.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
  }
  var keysIn_default = keysIn;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_nativeCreate.js
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashGet.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashHas.js
  var objectProto11 = Object.prototype;
  var hasOwnProperty9 = objectProto11.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_hashSet.js
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Hash.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_assocIndexOf.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheDelete.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_listCacheSet.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_ListCache.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_isKeyable.js
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_MapCache.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayPush.js
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var arrayPush_default = arrayPush;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getPrototype.js
  var getPrototype = overArg_default(Object.getPrototypeOf, Object);
  var getPrototype_default = getPrototype;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackClear.js
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default = stackClear;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackDelete.js
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default = stackDelete;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackGet.js
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default = stackGet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackHas.js
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default = stackHas;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_stackSet.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Stack.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssign.js
  function baseAssign(object, source) {
    return object && copyObject_default(source, keys_default(source), object);
  }
  var baseAssign_default = baseAssign;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseAssignIn.js
  function baseAssignIn(object, source) {
    return object && copyObject_default(source, keysIn_default(source), object);
  }
  var baseAssignIn_default = baseAssignIn;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneBuffer.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_arrayFilter.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/stubArray.js
  function stubArray() {
    return [];
  }
  var stubArray_default = stubArray;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getSymbols.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copySymbols.js
  function copySymbols(source, object) {
    return copyObject_default(source, getSymbols_default(source), object);
  }
  var copySymbols_default = copySymbols;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getSymbolsIn.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_copySymbolsIn.js
  function copySymbolsIn(source, object) {
    return copyObject_default(source, getSymbolsIn_default(source), object);
  }
  var copySymbolsIn_default = copySymbolsIn;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseGetAllKeys.js
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
  }
  var baseGetAllKeys_default = baseGetAllKeys;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getAllKeys.js
  function getAllKeys(object) {
    return baseGetAllKeys_default(object, keys_default, getSymbols_default);
  }
  var getAllKeys_default = getAllKeys;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getAllKeysIn.js
  function getAllKeysIn(object) {
    return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
  }
  var getAllKeysIn_default = getAllKeysIn;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_DataView.js
  var DataView = getNative_default(root_default, "DataView");
  var DataView_default = DataView;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Promise.js
  var Promise2 = getNative_default(root_default, "Promise");
  var Promise_default = Promise2;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Set.js
  var Set2 = getNative_default(root_default, "Set");
  var Set_default = Set2;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_getTag.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneArray.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_Uint8Array.js
  var Uint8Array2 = root_default.Uint8Array;
  var Uint8Array_default = Uint8Array2;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default = cloneArrayBuffer;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneDataView.js
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var cloneDataView_default = cloneDataView;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneRegExp.js
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var cloneRegExp_default = cloneRegExp;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneSymbol.js
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  var cloneSymbol_default = cloneSymbol;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_cloneTypedArray.js
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var cloneTypedArray_default = cloneTypedArray;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneByTag.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_initCloneObject.js
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
  }
  var initCloneObject_default = initCloneObject;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsMap.js
  var mapTag4 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike_default(value) && getTag_default(value) == mapTag4;
  }
  var baseIsMap_default = baseIsMap;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isMap.js
  var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
  var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
  var isMap_default = isMap;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseIsSet.js
  var setTag4 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike_default(value) && getTag_default(value) == setTag4;
  }
  var baseIsSet_default = baseIsSet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/isSet.js
  var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
  var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
  var isSet_default = isSet;

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/_baseClone.js
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

  // node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/cloneDeep.js
  var CLONE_DEEP_FLAG2 = 1;
  var CLONE_SYMBOLS_FLAG2 = 4;
  function cloneDeep(value) {
    return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
  }
  var cloneDeep_default = cloneDeep;

  // src/modules/storage.ts
  var modStorage;
  function initStorage() {
    const data = {
      version: MOD_VERSION
    };
    if (typeof Player.ExtensionSettings.LITTLISH_CLUB === "string") {
      modStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.LITTLISH_CLUB)) ?? data;
    } else modStorage = data;
    Object.keys(data).forEach((key) => {
      if (modStorage[key] === void 0) {
        modStorage[key] = data[key];
      }
    });
    migrateModStorage();
    try {
      const bccStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.BCC));
      if ((bccStorage?.abdl?.mommy || bccStorage?.abdl?.caretakers || bccStorage?.abdl?.notes?.list) && !findModByName("BCC")) bccAbdlPartSync(bccStorage.abdl);
    } catch (e) {
    }
    syncStorage();
    hookFunction("ChatRoomSync", 1 /* ADD_BEHAVIOR */, (args, next) => {
      next(args);
      chatSendModMessage("syncStorage", {
        storage: deleteProtectedProperties(modStorage)
      });
    });
  }
  function migrateModStorage() {
  }
  function bccAbdlPartSync(oldAbdlData) {
    console.log(oldAbdlData);
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
    let bccStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.BCC));
    delete bccStorage.abdl;
    Player.ExtensionSettings.BCC = LZString.compressToBase64(JSON.stringify(bccStorage));
    ServerPlayerExtensionSettingsSync("BCC");
    syncStorage();
    chatSendLocal("Littlish Club was synced with BCC's ABDL module");
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
    chatSendModMessage("syncStorage", {
      storage: deleteProtectedProperties(modStorage)
    });
  }
  function resetStorage() {
    modStorage = {
      version: MOD_VERSION
    };
    syncStorage();
  }

  // src/utils/main.ts
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

  // src/utils/chat.ts
  var pendingRequests = /* @__PURE__ */ new Map();
  function chatSendLocal(message) {
    if (!ServerPlayerIsInChatRoom()) return;
    const div = document.createElement("div");
    div.setAttribute("class", "ChatMessage ChatMessageLocalMessage");
    div.setAttribute("data-time", ChatRoomCurrentTime());
    div.setAttribute("data-sender", `${Player.MemberNumber}`);
    div.style.background = "#55edc095";
    div.style.margin = "0.15em 0";
    if (typeof message === "string") div.textContent = message;
    else div.appendChild(message);
    document.querySelector("#TextAreaChatLog").appendChild(div);
    ElementScrollToEnd("TextAreaChatLog");
  }
  function chatSendChangelog() {
    chatSendLocal(`${MOD_NAME} v${MOD_VERSION}

Changelog:
\u2022 Fixed bug with "in room/not in room with role caregiver and higher" condition where mommy's presence in the room did not make the condition active
\u2022 Added access validation in Littlish Wardrobe
\u2022 Added extended list of ABDL items to make certain rules work better
\u2022 Other fixes`);
  }
  function chatSendActionMessage(msg, target = void 0, dictionary = []) {
    if (!msg || !ServerPlayerIsInChatRoom()) return;
    const isFemale = CharacterPronounDescription(Player) === "She/Her";
    const capPossessive = isFemale ? "Her" : "His";
    const capIntensive = isFemale ? "Her" : "Him";
    const capSelfIntensive = isFemale ? "Herself" : "Himself";
    const capPronoun = isFemale ? "She" : "He";
    msg = msg.replaceAll("<Possessive>", capPossessive).replaceAll("<possessive>", capPossessive.toLocaleLowerCase()).replaceAll("<Intensive>", capIntensive).replaceAll("<intensive>", capIntensive.toLocaleLowerCase()).replaceAll("<SelfIntensive>", capSelfIntensive).replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase()).replaceAll("<Pronoun>", capPronoun).replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());
    ServerSend("ChatRoomChat", {
      Content: "LittlishClub_CUSTOM_ACTION",
      Type: "Action",
      Target: target ?? void 0,
      Dictionary: [
        { Tag: 'MISSING TEXT IN "Interface.csv": LittlishClub_CUSTOM_ACTION', Text: msg },
        ...dictionary
      ]
    });
  }
  function chatSendModMessage(msg, _data = null, targetNumber = null) {
    const data = {
      Content: MOD_MESSAGE_KEY,
      Dictionary: {
        // @ts-ignore
        msg
      },
      Type: "Hidden"
    };
    if (_data) data.Dictionary.data = _data;
    if (targetNumber) data.Target = targetNumber;
    ServerSend("ChatRoomChat", data);
  }
  function sendRequest(message, data, target) {
    return new Promise((resolve, reject) => {
      const requestId = parseInt(`${Date.now()}${getRandomNumber(1e3, 1e4)}`);
      pendingRequests.set(requestId, {
        message,
        data,
        target,
        resolve,
        reject
      });
      chatSendModMessage("request", {
        requestId,
        message,
        data
      }, target);
      setTimeout(() => {
        pendingRequests.delete(requestId);
        resolve({
          isError: true
        });
      }, 6e3);
    });
  }
  function handleRequestResponse2(requestId, data) {
    const request = pendingRequests.get(requestId);
    if (!request) return;
    request.resolve({
      data
    });
  }
  function handleRequest2(requestId, message, data, sender) {
    switch (message) {
      case "getLogs":
        if (!hasAccessRightTo(sender, Player, "READ_LOGS" /* READ_LOGS */)) return;
        chatSendModMessage("requestResponse", {
          requestId,
          message,
          data: modStorage.logs?.list ?? []
        }, sender.MemberNumber);
        return;
    }
  }

  // src/utils/characters.ts
  function getPlayer(value) {
    if (!value) return;
    return ChatRoomCharacter.find((Character) => {
      return Character.MemberNumber == value || Character.Name.toLowerCase() === value || Character.Nickname?.toLowerCase() === value;
    });
  }
  function getNickname(target) {
    return CharacterNickname(target);
  }
  function serverAppearanceBundleToAppearance(assetFamily, serverAppearanceBundle) {
    return serverAppearanceBundle.map((t) => {
      return ServerBundledItemToAppearanceItem(assetFamily, t);
    });
  }

  // src/images/pacifier.png
  var pacifier_default = "data:image/png;base64,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";

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
    {
      id: 1008,
      name: "Decrease size",
      description: "Decreases baby's size",
      data: [
        {
          name: "multiplier",
          text: "Size multiplier",
          type: "number",
          min: 0.25,
          max: 1,
          step: 0.01
        }
      ]
    },
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
      name: "Control nickname",
      description: "Control nickname",
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
          type: "text",
          text: "Room names"
        },
        {
          name: "whitelistMode",
          type: "checkbox",
          text: "Whitelist mode"
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
  function isRuleStrict2(C, ruleId) {
    if (C.IsPlayer()) return modStorage.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
    return C.LITTLISH_CLUB?.rules?.list?.find((r) => r.id === ruleId)?.strict ?? false;
  }
  function getRuleParameter(C, ruleId, parameter) {
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
      if (storage?.caregivers?.list?.includes(c.MemberNumber)) return true;
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
    return ChatRoomData?.BlockCategory?.includes("ABDL");
  }
  function registerButton(name, label, icon, fn) {
    imageRedirects.set(`Icons/${name}.png`, icon);
    buttonLabels.set(name, label);
    let hooks = dialogMenuButtonClickHooks.get(name);
    if (!hooks) {
      hooks = [];
      dialogMenuButtonClickHooks.set(name, hooks);
    }
    if (!hooks.includes(fn)) {
      hooks.push(fn);
    }
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
    if (isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */) && getRuleParameter(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */, "whitelistMode") ? !getRuleParameter(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */, "roomNames")?.split(",").map((n) => n.trim().toLowerCase()).includes(room.Name.toLowerCase()) : getRuleParameter(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */, "roomNames")?.split(",").map((n) => n.trim().toLowerCase()).includes(room.Name.toLowerCase())) {
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
      if ((item?.Asset?.Category?.includes("ABDL") || extendedABDLItemNames.includes(item?.Asset?.Name)) && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) {
        chatSendActionMessage(
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
    hookFunction("Player.CanChangeToPose", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !Player.Effect.includes("OnBed") || isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("PoseCanChangeUnaidedStatus", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (!args[0].IsPlayer()) return next(args);
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !Player.Effect.includes("OnBed") || isSleeping(Player)) return PoseChangeStatus.NEVER;
      return next(args);
    });
    hookFunction("ChatRoomCanAttemptStand", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !Player.Effect.includes("OnBed") || isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("ChatAdminCanEdit", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isRuleActive(Player, 1001 /* PREVENT_USING_ADMIN_POWERS */) && CurrentScreen === "ChatAdmin" && next(args) === true) {
        return ChatAdminMode === "create";
      }
      return next(args);
    });
    hookFunction("ServerSend", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const message = args[0];
      const params = args[1];
      if (message === "ChatRoomChat" && ["Chat", "Whisper"].includes(params.Type) && params.Content[0] !== "(") {
        if (isSleeping(Player)) return chatSendLocal("You are asleep, use OOC to speak");
        if (isRuleActive(Player, 1004 /* SPEAK_LIKE_BABY */)) {
          if (getRuleParameter(Player, 1004 /* SPEAK_LIKE_BABY */, "altSpeech")) {
            params.Content = alternativeBabyTalk(params.Content);
          } else {
            params.Content = SpeechTransformBabyTalk(params.Content);
          }
        }
      }
      return next(args);
    });
    hookFunction("DialogInventoryAdd", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const [C, item, isWorn, sortOrder] = args;
      const asset = item.Asset;
      if (DialogMenuMode !== "permissions") {
        if (!asset.Category?.includes("ABDL") && !extendedABDLItemNames.includes(asset.Name) && isRuleActive(Player, 1003 /* ABDL_INVENTORY */)) return;
      }
      next(args);
    });
    hookFunction("ShopLoad", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (!isRuleActive(Player, 1006 /* CANT_GO_SHOP_ALONE */)) return next(args);
      window.ShopLCLeave = () => {
        CommonSetScreen("Room", "MainHall");
        DialogLeave();
        delete window.ShopLeave;
      };
      window.ShopVendor = CharacterLoadNPC("NPC_Shop_Vendor");
      InventoryWear(ShopVendor, "H1000", "Height", "Default");
      ShopVendor.Stage = "LC_BabyCantShopAlone1";
      ShopVendor.CurrentDialog = "Oh? Cutie, aren't you lost? Where are your parents?";
      CharacterSetCurrent(ShopVendor);
      DialogChangeMode("dialog");
    });
    hookFunction("ShopRun", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (!isRuleActive(Player, 1006 /* CANT_GO_SHOP_ALONE */)) return next(args);
      DrawCharacter(Player, 0, 0, 1);
      DrawCharacter(ShopVendor, 500, 0, 1);
      DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
      DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
    });
    hookFunction("CharacterBuildDialog", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
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
            Result: "(She starts laughing)"
          },
          {
            Stage: stage1,
            Option: "(Leave shop)",
            Function: "LCLeave();"
          },
          {
            Stage: stage2,
            NextStage: stage3,
            Option: "I'm old enough to go to the shop!",
            Result: "Baby, please leave this shop, it's for adults only."
          },
          {
            Stage: stage2,
            Option: "(Leave shop)",
            Function: "LCLeave();"
          },
          {
            Stage: stage3,
            Option: "(Leave shop)",
            Function: "LCLeave();"
          }
        );
        return;
      }
      return next(args);
    });
    hookFunction("Player.CanChangeOwnClothes", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("Player.IsDeaf", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return true;
      return next(args);
    });
    hookFunction("Player.IsBlind", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return true;
      return next(args);
    });
    hookFunction("Player.GetDeafLevel", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return 4;
      return next(args);
    });
    hookFunction("Player.GetBlindLevel", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return 3;
      return next(args);
    });
    hookFunction("Player.CanInteract", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("InventoryGroupIsBlockedForCharacter", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return true;
      return next(args);
    });
    hookFunction("DialogClickExpressionMenu", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("CharacterAppearanceSetItem", 0 /* OBSERVE */, (args, next) => {
      const createdItem = next(args);
      const [C, Group, ItemAsset] = args;
      if (C.IsPlayer() && ["ItemMouth", "ItemMouth2", "itemMouth3"].includes(Group) && ItemAsset.Name === "MilkBottle" && isRuleActive(Player, 1007 /* FALL_SLEEP_AFTER_MILK_BOTTLE */) && !isSleeping(Player)) {
        CharacterSetFacialExpression(Player, "Blush", "High");
        ChatRoomCharacterUpdate(Player);
        setTimeout(() => {
          document.body.style.filter = "blur(4px)";
          CharacterSetFacialExpression(Player, "Eyes", "Dazed");
          CharacterSetFacialExpression(Player, "Eyebrows", null);
          ChatRoomCharacterUpdate(Player);
          setTimeout(() => {
            document.body.style.filter = null;
            PoseSetActive(Player, "Kneel");
            CharacterSetFacialExpression(Player, "Emoticon", "Sleep");
            CharacterSetFacialExpression(Player, "Eyes", "Closed");
            ChatRoomCharacterUpdate(Player);
            modStorage.sleepState = true;
            syncStorage();
            chatSendLocal("You fall asleep");
            chatSendActionMessage(`${getNickname(Player)} fell asleep, only spank or french kiss can wake <intensive> up`);
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
    hookFunction("CharacterAppearanceGetCurrentValue", 1 /* ADD_BEHAVIOR */, (args, next) => {
      const [C, Group, Type] = args;
      if (!C || !(C.LITTLISH_CLUB || C.IsPlayer()) || Group !== "Height" || Type !== "Zoom" || (Player.VisualSettings?.ForceFullHeight ?? false)) return next(args);
      const sizeMultiplier = getRuleParameter(C, 1008 /* DECREASE_SIZE */, "multiplier") ?? 1;
      if (sizeMultiplier > 1 || sizeMultiplier < 0.25) return next(args);
      if (isRuleActive(C, 1008 /* DECREASE_SIZE */)) {
        return sizeMultiplier;
      }
      return next(args);
    });
    hookFunction("CommonDrawAppearanceBuild", 1 /* ADD_BEHAVIOR */, (args, next) => {
      args[0].HeightRatio = CharacterAppearanceGetCurrentValue(args[0], "Height", "Zoom");
      return next(args);
    });
    hookFunction("DrawCharacter", 1 /* ADD_BEHAVIOR */, (args, next) => {
      args[0].HeightRatio = CharacterAppearanceGetCurrentValue(args[0], "Height", "Zoom");
      return next(args);
    });
    hookFunction("DialogMenuButtonBuild", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      next(args);
      const C = args[0];
      const item = InventoryGet(C, C?.FocusGroup?.Name);
      if (C.IsPlayer() && item && (item?.Asset?.Category?.includes("ABDL") || extendedABDLItemNames.includes(item?.Asset?.Name)) && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) {
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
    hookFunction("DialogItemClick", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const C = CharacterGetCurrent();
      const focusGroup = C?.FocusGroup;
      const item = InventoryGet(C, focusGroup?.Name);
      const clickedItem = args[0];
      if (DialogMenuMode !== "items") return next(args);
      console.log(C, clickedItem, isRuleActive(Player, 1012 /* PREVENT_USING_BONDAGE_ON_OTHER */));
      if (C.IsPlayer() && (item?.Asset?.Category?.includes("ABDL") || extendedABDLItemNames.includes(item?.Asset?.Name)) && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) return;
      if (!C.IsPlayer() && clickedItem?.Asset?.IsRestraint && isRuleActive(Player, 1012 /* PREVENT_USING_BONDAGE_ON_OTHER */)) {
        if (getRuleParameter(Player, 1012 /* PREVENT_USING_BONDAGE_ON_OTHER */, "allowAbdlItems") && clickedItem.Asset.Category?.includes("ABDL")) return next(args);
        return;
      }
      return next(args);
    });
    hookFunction("InterfaceTextGet", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const label = buttonLabels.get(args[0]?.replace("DialogMenu", ""));
      if (label) return label;
      return next(args);
    });
    hookFunction("DrawGetImage", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const redirect = imageRedirects.get(args[0]);
      if (redirect) {
        args[0] = redirect;
      }
      return next(args);
    });
    hookFunction("DialogIsMenuButtonDisabled", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (args[0]?.startsWith("LC_")) return true;
      return next(args);
    });
    hookFunction("DialogMenuButtonClick", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const C = CharacterGetCurrent();
      for (let I = 0; I < DialogMenuButton.length; I++) {
        if (MouseIn(1885 - I * 110, 15, 90, 90) && C) {
          const hooks = dialogMenuButtonClickHooks.get(DialogMenuButton[I]);
          if (hooks?.some((hook) => hook(C))) return true;
        }
      }
      return next(args);
    });
    hookFunction("DrawButton", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      const [Left, Top, Width, Height, Label, Color, Image] = args;
      if (isRuleActive(Player, 1010 /* PACIFIER_CHECKBOXES */) && Width === Height && Width === 64 && Image === "Icons/Checked.png") args[6] = pacifier_default;
      return next(args);
    });
    const observer = new MutationObserver((mutationList, observer2) => {
      if (!isRuleActive(Player, 1010 /* PACIFIER_CHECKBOXES */)) return;
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "INPUT") {
              if (node.classList.contains("checkbox")) {
                node.classList.add("paciCheckbox");
              }
            }
          });
        }
      }
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    hookFunction("TimerProcess", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (timerLastRulesCycleCall + 2e3 <= CommonTime()) {
        if (isRuleActive(Player, 1011 /* CONTROL_NICKNAME */) && Player.Nickname !== (getRuleParameter(Player, 1011 /* CONTROL_NICKNAME */, "nickname") ?? "")) {
          const status = CharacterSetNickname(Player, getRuleParameter(Player, 1011 /* CONTROL_NICKNAME */, "nickname"));
          if (typeof status === "string") {
            modStorage.rules.list.find((r) => r.id === 1011 /* CONTROL_NICKNAME */).data.nickname = CharacterNickname(Player);
            syncStorage();
          }
        }
        if (isRuleActive(Player, 1011 /* CONTROL_NICKNAME */) && Player.LabelColor !== (getRuleParameter(Player, 1011 /* CONTROL_NICKNAME */, "color") ?? Player.LabelColor)) {
          Player.LabelColor = getRuleParameter(Player, 1011 /* CONTROL_NICKNAME */, "color");
          ServerAccountUpdate.QueueData({ LabelColor: getRuleParameter(Player, 1011 /* CONTROL_NICKNAME */, "color") });
        }
        if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) && !DialogIsKneeling(Player) && PoseAvailable(Player, "BodyLower", "Kneel") && !Player.Effect.includes("OnBed")) {
          PoseSetActive(Player, "Kneel", true);
          ChatRoomCharacterUpdate(Player);
        }
        timerLastRulesCycleCall = CommonTime();
      }
      return next(args);
    });
    hookFunction("ChatSearchJoin", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (!isRuleActive(Player, 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */) && !isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */)) return next(args);
      CommonGenerateGrid(ChatSearchResult, ChatSearchResultOffset, ChatSearchListParams, (room, x, y, width, height) => {
        if (!MouseIn(x, y, width, height)) return false;
        const canJoinResult = chatRoomSearchCanJoinRoom(room);
        if (!canJoinResult[0]) {
          notify(canJoinResult[1], 5e3);
          return false;
        }
        const RoomName = room.Name;
        if (ChatSearchLastQueryJoin != RoomName || ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1e3 < CommonTime()) {
          ChatSearchLastQueryJoinTime = CommonTime();
          ChatSearchLastQueryJoin = RoomName;
          ServerSend("ChatRoomJoin", { Name: RoomName });
        }
        return true;
      });
    });
    hookFunction("ChatSearchNormalDraw", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (!isRuleActive(Player, 1013 /* PREVENT_jOINING_ABDL_BLOCKED_ROOMS */) && !isRuleActive(Player, 1015 /* PREVENT_JOINING_CERTAIN_ROOMS */)) return next(args);
      next(args);
      CommonGenerateGrid(ChatSearchResult, ChatSearchResultOffset, ChatSearchListParams, (room, x, y, width, height) => {
        if (!chatRoomSearchCanJoinRoom(room)[0]) {
          DrawButton(x, y, width, height, "", "#fa7db1", void 0, "Blocked by Littlish Club", true);
          DrawTextFit((room.Friends != null && room.Friends.length > 0 ? "(" + room.Friends.length + ") " : "") + ChatSearchMuffle(room.Name) + " - " + ChatSearchMuffle(room.Creator) + " " + room.MemberCount + "/" + room.MemberLimit, x + 315, y + 25, 620, "black");
          DrawTextFit(ChatSearchMuffle(room.Description), x + 315, y + 62, 620, "black");
        }
        return false;
      });
    });
  }

  // src/subscreens/shared/oneButtonMenu.ts
  var OneButtonMenu = class extends BaseSubscreen {
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
      this.createText({
        text: this.screenName,
        x: 100,
        y: 60,
        fontSize: 10
      });
      this.createText({
        text: this.content,
        x: 400,
        y: 250,
        width: 1200,
        fontSize: 8
      }).style.textAlign = "center";
      const btn = this.createButton({
        text: this.buttonText,
        x: 100,
        y: 800,
        padding: 4,
        style: "inverted"
      });
      btn.addEventListener("click", () => {
        this.onClick();
        this.exit();
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      if (InformationSheetSelection.IsPlayer()) {
        this.createText({
          text: `Mod Data Size: ${getSizeInKbytes(Player.ExtensionSettings?.LITTLISH_CLUB ?? "")}KB`,
          x: 150,
          y: 240,
          fontSize: 6
        });
        const resetBtn = this.createButton({
          text: "Reset Settings",
          x: 100,
          y: 825,
          width: 500,
          height: 110,
          icon: "Icons/ServiceBell.png"
        });
        if (isRuleActive(Player, 1009 /* DISABLE_RESET_SETTINGS_BUTTON */)) resetBtn.classList.add("lcDisabled");
        resetBtn.addEventListener("click", () => {
          if (isRuleActive(Player, 1009 /* DISABLE_RESET_SETTINGS_BUTTON */)) return;
          this.setSubscreen(
            new OneButtonMenu({
              screenName: "Global > Reset Settings",
              content: "Are you sure you want to reset all your mod data?",
              buttonText: "Reset Settings",
              onClick: resetStorage
            })
          );
        });
      }
      const releaseBtn = this.createButton({
        text: "Release Baby",
        x: 1400,
        y: 825,
        width: 500,
        height: 110,
        icon: "Icons/Cancel.png"
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "RELEASE_BABY" /* RELEASE_BABY */) || !hasMommy(InformationSheetSelection)) releaseBtn.classList.add("lcDisabled");
      releaseBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "RELEASE_BABY" /* RELEASE_BABY */) || !hasMommy(InformationSheetSelection)) return releaseBtn.classList.add("lcDisabled");
        this.setSubscreen(
          new OneButtonMenu({
            screenName: "Global > Release Baby",
            content: "Are you sure you want to release baby?",
            buttonText: "Release Baby",
            onClick: () => {
              chatSendModMessage("releaseBaby", null, InformationSheetSelection.MemberNumber);
            }
          })
        );
      });
    }
    exit() {
      this.setSubscreen(new MainMenu());
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

  // src/subscreens/caregiversPermissionsMenu.ts
  var CaregiversPermissionsMenu = class extends BaseSubscreen {
    get name() {
      return "Family > Caregivers permissions";
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      caregiverAccessRightsList.forEach((p, i) => {
        const btn = this.createButton({
          text: p.name,
          width: 1200,
          x: 400,
          y: 250 + 110 * i,
          padding: 2,
          style: isCaregiverAccessRightEnabled(InformationSheetSelection, p.id) ? "green" : "default"
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */)) {
          btn.classList.add("lcDisabled");
        }
        btn.addEventListener("click", () => {
          if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */)) {
            return btn.classList.add("lcDisabled");
          }
          if (InformationSheetSelection.IsPlayer()) {
            turnCaregiverAccessRight(p.id);
            addLog(
              `${getNickname(Player)} (${Player.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, p.id) ? "on" : "off"} caregiver access right "${p.name}"`,
              false
            );
            syncStorage();
          } else {
            chatSendModMessage("turnCaregiversAccessRight", {
              accessRightId: p.id
            }, InformationSheetSelection.MemberNumber);
          }
          btn.setAttribute("data-lc-style", btn.getAttribute("data-lc-style") === "default" ? "green" : "default");
        });
      });
    }
  };

  // src/subscreens/familyMenu.ts
  var FamilyMenu = class extends BaseSubscreen {
    getCaregiversInputValue;
    oldCaregiversList;
    get name() {
      return "Family";
    }
    get icon() {
      return `Assets/Female3DCG/Emoticon/Hearts/Icon.png`;
    }
    load() {
      this.oldCaregiversList = getCaregiversOf(InformationSheetSelection);
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      const [caregiversInput, getCaregiversInputValue] = this.createInputList({
        title: "Caregivers member numbers",
        value: getCaregiversOf(InformationSheetSelection),
        x: 1e3,
        y: 200,
        width: 850,
        height: 600,
        numbersOnly: true
      });
      this.getCaregiversInputValue = getCaregiversInputValue;
      if (!hasAccessRightTo(Player, InformationSheetSelection, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
        caregiversInput.classList.add("lcDisabled");
      }
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
      const checkBox = this.createCheckbox({
        text: "Prevent baby from changing caregivers list",
        x: 150,
        y: 400,
        width: 600,
        isChecked: InformationSheetSelection.IsPlayer() ? !modStorage.caregivers?.canChangeList : !InformationSheetSelection.LITTLISH_CLUB?.caregivers?.canChangeList
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */)) {
        checkBox.classList.add("lcDisabled");
      }
      checkBox.addEventListener("change", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */)) {
          return checkBox.classList.add("lcDisabled");
        }
        if (InformationSheetSelection.IsPlayer()) {
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
          addLog(
            `${getNickname(Player)} (${Player.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"} ${getNickname(Player)} to change caregivers list`,
            false
          );
        } else {
          chatSendModMessage("turnCanChangeCaregiversList", null, InformationSheetSelection.MemberNumber);
        }
      });
    }
    exit() {
      const newCaregiversList = this.getCaregiversInputValue();
      if (this.oldCaregiversList.join(",") !== newCaregiversList.join(",") && hasAccessRightTo(Player, InformationSheetSelection, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
        if (InformationSheetSelection.IsPlayer()) {
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.list = newCaregiversList;
          addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed caregivers list`, false);
        } else {
          chatSendModMessage("changeCaregiversList", {
            list: newCaregiversList
          }, InformationSheetSelection.MemberNumber);
        }
      }
      syncStorage();
      this.setSubscreen(new MainMenu());
    }
  };

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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
      this.setSubscreen(new RuleSettingsMenu(this.rule, this.ruleSettings));
    }
  };

  // src/subscreens/ruleSettingsMenu.ts
  var RuleSettingsMenu = class extends BaseSubscreen {
    rule;
    ruleSettings;
    canChangeSettings = () => hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_RULES" /* MANAGE_RULES */) && (!isRuleStrict2(InformationSheetSelection, this.rule.id) || isMommyOf(Player, InformationSheetSelection) || InformationSheetSelection.IsPlayer() && isExploringModeEnabled());
    get name() {
      return `Rules > ${this.rule.name}`;
    }
    constructor(rule, ruleSettings) {
      super();
      this.rule = rule;
      if (ruleSettings) this.ruleSettings = ruleSettings;
      else {
        const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
        this.ruleSettings = storage.rules?.list?.find((r) => r.id === this.rule.id) ?? {
          id: this.rule.id,
          state: false,
          strict: false,
          changedBy: null,
          ts: null
        };
        this.ruleSettings = JSON.parse(JSON.stringify(this.ruleSettings));
      }
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      }).style.cssText += "max-width: 85%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";
      const openIntroBtn = this.createButton({
        icon: "Icons/Notifications.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 175
      });
      openIntroBtn.style.zIndex = "10";
      openIntroBtn.addEventListener("click", () => {
        this.setSubscreen(new AboutRulesSettingsMenu(this.rule, this.ruleSettings));
      });
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
      const paramsView = this.createScrollView({
        x: 850,
        y: 360,
        width: 1050,
        height: 400,
        scroll: "y"
      });
      paramsView.style.display = "flex";
      paramsView.style.flexDirection = "column";
      paramsView.style.rowGap = "1vw";
      this.rule.data?.forEach((param) => {
        const paramBlock = document.createElement("div");
        paramBlock.style.cssText = "display: flex; align-items: center; column-gap: 0.8vw; width: 100%;";
        if (param.type !== "checkbox") {
          const paramText = this.createText({
            text: param.text + ":",
            fontSize: 4,
            place: false
          });
          paramText.style.whiteSpace = "nowrap";
          paramBlock.append(paramText);
        }
        if (param.type === "number") {
          const input = this.createInput({
            value: getRuleParameter(InformationSheetSelection, this.rule.id, param.name)?.toString() ?? "",
            placeholder: param.type,
            width: 500,
            height: 70,
            place: false
          });
          input.style.width = "100%";
          input.setAttribute("type", param.type);
          if (param.min) input.setAttribute("min", param.min);
          if (param.max) input.setAttribute("max", param.max);
          if (param.step) input.setAttribute("step", param.step);
          if (!this.canChangeSettings()) {
            input.classList.add("lcDisabled");
          }
          input.addEventListener("change", () => {
            if (!this.canChangeSettings()) {
              return input.classList.add("lcDisabled");
            }
            if (param.min && parseFloat(input.value) < param.min) return;
            if (param.max && parseFloat(input.value) > param.max) return;
            if (!this.ruleSettings.data) this.ruleSettings.data = {};
            this.ruleSettings.data[param.name] = param.type === "number" ? parseFloat(input.value) : input.value;
          });
          paramBlock.append(input);
        } else if (param.type === "text") {
          const input = this.createInput({
            value: getRuleParameter(InformationSheetSelection, this.rule.id, param.name) ?? "",
            placeholder: param.type,
            width: 500,
            height: 70,
            place: false
          });
          input.style.width = "100%";
          input.setAttribute("type", param.type);
          if (!this.canChangeSettings()) {
            input.classList.add("lcDisabled");
          }
          input.addEventListener("change", () => {
            if (!this.canChangeSettings()) {
              return input.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.data) this.ruleSettings.data = {};
            this.ruleSettings.data[param.name] = input.value;
          });
          paramBlock.append(input);
        } else if (param.type === "checkbox") {
          const checkbox = this.createCheckbox({
            width: 800,
            isChecked: !!getRuleParameter(InformationSheetSelection, this.rule.id, param.name),
            text: param.text,
            place: false
          });
          if (!this.canChangeSettings()) {
            checkbox.classList.add("lcDisabled");
          }
          checkbox.addEventListener("change", () => {
            if (!this.canChangeSettings()) {
              return checkbox.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.data) this.ruleSettings.data = {};
            this.ruleSettings.data[param.name] = checkbox.checked;
          });
          paramBlock.append(checkbox);
          paramBlock.append(
            this.createText({
              text: param.text,
              fontSize: 4
            })
          );
        } else if (param.type === "color") {
          const input = this.createInput({
            width: 500,
            height: 70,
            value: getRuleParameter(InformationSheetSelection, this.rule.id, param.name),
            padding: 1,
            place: false
          });
          input.style.width = "100%";
          input.setAttribute("type", param.type);
          if (!this.canChangeSettings()) {
            input.classList.add("lcDisabled");
          }
          input.addEventListener("change", () => {
            if (!this.canChangeSettings()) {
              return input.classList.add("lcDisabled");
            }
            if (!this.ruleSettings.data) this.ruleSettings.data = {};
            this.ruleSettings.data[param.name] = input.value;
          });
          paramBlock.append(input);
        }
        paramsView.append(paramBlock);
      });
      const lastTimeWasChanged = this.createText({
        text: `Last time it was changed by ${this.ruleSettings.changedBy ?? "-"} at ${this.ruleSettings.ts ? new Date(this.ruleSettings.ts).toUTCString() : "-"}`,
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
        padding: 2
      });
      if (!this.canChangeSettings()) {
        turnStateBtn.classList.add("lcDisabled");
      }
      turnStateBtn.addEventListener("click", () => {
        if (!this.canChangeSettings()) {
          return turnStateBtn.classList.add("lcDisabled");
        }
        this.ruleSettings.state = !this.ruleSettings.state;
        turnStateBtn.textContent = this.ruleSettings.state ? "State: Enabled" : "State: Disabled";
      });
      const turnStrictBtn = this.createButton({
        text: `Strict: ${this.ruleSettings.strict ? "Yes" : "No"}`,
        x: 150,
        y: 490,
        width: 600,
        padding: 2
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */)) {
        turnStrictBtn.classList.add("lcDisabled");
      }
      turnStrictBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */)) {
          return turnStrictBtn.classList.add("lcDisabled");
        }
        this.ruleSettings.strict = !this.ruleSettings.strict;
        turnStrictBtn.textContent = this.ruleSettings.strict ? "Strict: Yes" : "Strict: No";
      });
      const triggerConditionsBtn = this.createButton({
        text: (this.ruleSettings.conditions?.type ?? "any") === "any" ? "Trigger Conditions: Any" : "Trigger Conditions All",
        x: 150,
        y: 625,
        width: 600,
        padding: 2
      });
      if (!this.canChangeSettings()) {
        triggerConditionsBtn.classList.add("lcDisabled");
      }
      triggerConditionsBtn.addEventListener("click", () => {
        if (!this.canChangeSettings()) {
          return triggerConditionsBtn.classList.add("lcDisabled");
        }
        if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
        this.ruleSettings.conditions.type = (this.ruleSettings.conditions?.type ?? "any") === "any" ? "all" : "any";
        triggerConditionsBtn.textContent = (this.ruleSettings.conditions?.type ?? "any") === "any" ? "Trigger Conditions: Any" : "Trigger Conditions All";
      });
      const whenCheckbox = this.createCheckbox({
        text: "When",
        x: 150,
        y: 750,
        isChecked: !!this.ruleSettings.conditions?.whenInRoomWithRole
      });
      if (!this.canChangeSettings()) {
        whenCheckbox.classList.add("lcDisabled");
      }
      const inRoomBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true ? "in room" : "not in room",
        x: 395,
        y: 750,
        width: 180,
        height: 65,
        fontSize: 3
      });
      if (!this.canChangeSettings()) {
        inRoomBtn.classList.add("lcDisabled");
      }
      inRoomBtn.addEventListener("click", () => {
        if (!this.canChangeSettings()) {
          return inRoomBtn.classList.add("lcDisabled");
        }
        if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
        if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
        this.ruleSettings.conditions.whenInRoomWithRole.inRoom = !(this.ruleSettings.conditions.whenInRoomWithRole.inRoom ?? true);
        inRoomBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true ? "in room" : "not in room";
      });
      this.createText({
        text: "with role",
        x: 600,
        y: 750,
        fontSize: 5
      });
      const caregiverBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver",
        x: 805,
        y: 750,
        width: 180,
        height: 65,
        fontSize: 3
      });
      if (!this.canChangeSettings()) {
        caregiverBtn.classList.add("lcDisabled");
      }
      caregiverBtn.addEventListener("click", () => {
        if (!this.canChangeSettings()) {
          caregiverBtn.classList.add("lcDisabled");
        }
        if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
        if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
        this.ruleSettings.conditions.whenInRoomWithRole.role = (this.ruleSettings.conditions.whenInRoomWithRole.role ?? "caregiver") === "caregiver" ? "mommy" : "caregiver";
        caregiverBtn.textContent = this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver";
      });
      this.createText({
        text: "and higher",
        x: 1e3,
        y: 750,
        fontSize: 5
      });
      const whenCheckbox2 = this.createCheckbox({
        text: "When in room where ABDL is",
        x: 150,
        y: 850,
        isChecked: !!this.ruleSettings.conditions?.whenInRoomWhereAbdl
      });
      if (!this.canChangeSettings()) {
        whenCheckbox2.classList.add("lcDisabled");
      }
      const isBlockedBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true ? "blocked" : "not blocked",
        x: 930,
        y: 850,
        width: 200,
        height: 65,
        fontSize: 3
      });
      if (!this.canChangeSettings()) {
        isBlockedBtn.classList.add("lcDisabled");
      }
      isBlockedBtn.addEventListener("click", () => {
        if (!this.canChangeSettings()) {
          return isBlockedBtn.classList.add("lcDisabled");
        }
        if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
        if (!this.ruleSettings.conditions.whenInRoomWhereAbdl) this.ruleSettings.conditions.whenInRoomWhereAbdl = {};
        this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked = !(this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked ?? true);
        isBlockedBtn.textContent = this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true ? "blocked" : "not blocked";
      });
      const saveChangesBtn = this.createButton({
        text: "Save Changes",
        x: 1520,
        y: 790,
        width: 400,
        height: 150,
        style: "green"
      });
      saveChangesBtn.style.fontWeight = "bold";
      if (!this.canChangeSettings()) {
        saveChangesBtn.classList.add("lcDisabled");
      }
      saveChangesBtn.addEventListener("click", () => {
        if (!this.canChangeSettings()) return saveChangesBtn.classList.add("lcDisabled");
        if (whenCheckbox.checked) {
          if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
          if (!this.ruleSettings.conditions.whenInRoomWithRole) this.ruleSettings.conditions.whenInRoomWithRole = {};
          if (typeof this.ruleSettings.conditions.whenInRoomWithRole.inRoom !== "boolean") {
            this.ruleSettings.conditions.whenInRoomWithRole.inRoom = true;
          }
          if (typeof this.ruleSettings.conditions.whenInRoomWithRole.role !== "string") {
            this.ruleSettings.conditions.whenInRoomWithRole.role = "caregiver";
          }
        } else delete this.ruleSettings.conditions?.whenInRoomWithRole;
        if (whenCheckbox2.checked) {
          if (!this.ruleSettings.conditions) this.ruleSettings.conditions = {};
          if (!this.ruleSettings.conditions.whenInRoomWhereAbdl) this.ruleSettings.conditions.whenInRoomWhereAbdl = {};
          if (typeof this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked !== "boolean") {
            this.ruleSettings.conditions.whenInRoomWhereAbdl.blocked = true;
          }
        } else delete this.ruleSettings.conditions?.whenInRoomWhereAbdl;
        if (InformationSheetSelection.IsPlayer()) {
          if (!modStorage.rules) modStorage.rules = {};
          if (!modStorage.rules.list) modStorage.rules.list = [];
          let r = modStorage.rules.list.find((d) => d.id === this.rule.id);
          if (r) {
            for (let i in r) delete r[i];
            for (let i in this.ruleSettings) r[i] = this.ruleSettings[i];
            r.changedBy = Player.MemberNumber;
            r.ts = Date.now();
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
          chatSendModMessage("changeRuleSettings", dataToSend, InformationSheetSelection.MemberNumber);
        }
        this.exit();
      });
    }
    exit() {
      this.setSubscreen(new RulesMenu());
    }
  };

  // src/images/rules-marking.png
  var rules_marking_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABeIAAAJYCAIAAACB6wH4AAAgAElEQVR4Aey9D5BbyX3n9+qOOeI0Qy5WoiTIoiTCouSBRUeEPLIGFs07who7A4u2CBe9ImSWTEO8Mw9LS2N4pOWCI+vmUHMOD8XEDEjXMQjj4gVMhSmMXcxh7jI+8KylC2ObNmiHV6BSjEFdRqnnaE73kp3zPseQhVS/v939XgMPD8BwwPmytnbeA/rvpxvdv/71r38tdfAPBEAABEAABEAABEAABEAABEAABEAABEBgBxCQdkAZUAQQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAIEO1DToBCAAAiAAAiAAAiAAAiAAAiAAAiAAAiCwIwhATbMjmgGFAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAGoadAHQAAEQAAEQAAEQAAEQAAEQAAEQAAEQGBHEICaZkc0AwoBAiAAAiAAAiAAAiAAAiAAAiAAAiAAAlDToA+AAAiAAAiAAAiAAAiAAAiAAAiAAAiAwI4gADXNjmgGFAIEQAAEQAAEQAAEQAAEQAAEQAAEQAAEoKZBHwABEAABEAABEAABEAABEAABEAABEACBHUEAapod0QwoBAiAAAiAAAiAAAiAAAiAAAiAAAiAAAhATYM+AAIgAAIgAAIgAAIgAAIgAAIgAAIgAAI7goAnNU25XD5+/PjevXsl/AMBEAABEAABEACBURLYu3fv8ePHy+XyUAQlyDCjbCukDQIgAAIgAAIgYBMYlgzTW02TzWbtbPEEAiAAAiAAAiAAAttCIJvNDqipgQyzLQ2FTEAABEAABEAABBgCA8owPdQ05XJZz+369etvvvnmgNISooMACIAACIAACIBAdwJvvvnm9evXdfFjEJsayDDdOeNbEAABEAABEACB4RIYlgzTQ01z/PhxSZKuX78+3NIjNRAAARAAARAAARDoQkDX1Bw/frxLmO5fQYbpzgffggAIgAAIgAAIjILA4DJMDzWN7o8GdjSjaDykCQIgAAIgAAIgICLw5ptvSpK0d+9eUYCen0OG6YkIAUAABEAABEAABIZOYHAZpoeaRjc5Hnq5kSAIgAAIgAAIgAAIdCcwoBAyYPTuZcO3IAACIAACIAACICAi0EUIeeuttx4+fPjWW2+J4nY6HahpusDBVyAAAiAAAiAAAs+NQBcRx0uZBozuJQuEAQEQAAEQAAEQAAEnAZEQ8tZbb73xxhtra2tvvPFGF00N1DROpPgEBEAABEAABEDg+RMQiTgeSzZgdI+5IBgIgAAIgAAIgAAIcARchRBLR7Om/euiqYGahuOJVxAAARAAARAAgR1BwFXE8V6yAaN7zwghQQAEQAAEQAAEQIAm4CqE6HY0X//617/zne/8/u//vm5TQ8eynqGmsVDgAQRAAARAAARAYAcRcBVxvJdvwOjeM0JIEAABEAABEAABEKAJuAoha2trX//61//yL/+y0+moqvrgwYO1tTU6lvUMNY2FAg8gAAIgAAIgAAI7iICriOO9fANG954RQoIACIAACIAACIAATcBVCHnjjTd0HY0eUlXVN954g45lPUNNY6HAAwiAAAiAAAiAwA4i4CrieC/fgNG9Z4SQIAACIAACIAACIEATcBVCnD6DnZ/oiUBNQ8PEMwiAAAiAAAiAwE4h4CrieC/cgNG9Z4SQIAACIAACIAACIEATGFAIgZqGholnEAABEAABEACBnUJgUBFHi79TKoNygAAIgAAIgAAI7BoCg8ow3UENmHr3xPEtCIAACIAACIAACIgIDCiEDBhdVCp8DgIgAAIgAAIgAALdCQwohMCapjtefAsCIAACIAACIPB8CAwq4mjxn0/RkSsIgAAIgAAIgMAuJjCoDNMd3YCpd08c34IACIAACIAACICAiMCAQsiA0UWlwucgAAIgAAIgAAIg0J3AgEIIrGm648W3IAACIAACIAACz4fAoCKOFv/5FB25ggAIgAAIgAAI7GICg8ow3dENmHr3xPEtCIAACIAACIAACIgIDCiEDBhdVCp8DgIgAAIgAAIgAALdCXQRQr71beXxn3/r8Z9/61vfVkSJwJpGRAafgwAIgAAIgAAIPE8CXUQcL8UaMLqXLBAGBEAABEAABEAABJwERELIt76t/NnTDes/kaYGahonUnwCAiAAAiAAAiDw/AmIRByPJRswusdcEAwEQAAEQAAEQAAEOAIiIeTxn3/L0tH82dONx3/+LS6i/go1jSsWfAgCIAACIAACIPCcCYhEHI/FGjC6x1wQDARAAARAAARAAAQ4AiIhhNbR6M9cRP0VahpXLPgQBEAABEAABEDgORMQiTgeizVgdI+5IBgIgAAIgAAIgAAIcAREQgjUNBwovIIACIAACIAACIwTAZGI47EOA0b3mAuC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48ePS5J0/fp130VERBAAARAAARAAARDol8D169clSTp+/Hi/Ea3wkGEsFHgAARAAARAAARDYNgJdZJjhqGnK5bJurnP9+nXY1GxbuyIjEAABEAABENi1BN58801dvpEkqVwu++YAGcY3OkQEARAAARAAARDwQaCnDDMcNU2n08lms7qmBv8HARAAARAAARAAgW0jkM1mfUhIdBTIMNvWWMgIBEAABEAABEDAIiCSYYampul0OuVy+fjx4/oZbytjPIAACIAACIAACIDA0Ans3bv3+PHjg9jR0JoayDBDbyAkCAIgAAIgAAIg4EqgpwwzTDUNLe7gGQRAAARAAARAAARAAARAAARAAARAAARAoC8CUNP0hQuBQQAEQAAEQAAEQAAEQAAEQAAEQAAEQGBUBKCmGRVZpAsCIAACIAACIAACIAACIAACIAACIAACfRGAmqYvXAgMAiAAAiAAAiAAAiAAAiAAAiAAAiAAAqMiADXNqMgiXRAAARAAARAAARAAARAAARAAARAAARDoiwDUNH3hQmAQAAEQAAEQAAEQAAEQAAEQAAEQAAEQGBUBqGlGRRbpggAIgAAIgAAIgAAIgAAIgAAIgAAIgEBfBKCm6QsXAoMACIAACIAACIAACIAACIAACIAACIDAqAhATTMqskgXBEAABEAABEAABEAABEAABEAABEAABPoiADVNX7gQGARAAARAAARAAARAAARAAARAAARAAARGRQBqmlGRRbogAAIgAAIgAAIgAAIgAAIgAAIgAAIg0BcBqGn6woXAIAACIAACIAACIAACIAACIAACIAACIDAqAlDTjIos0gUBEAABEAABEAABEAABEAABEAABEACBvghATdMXLgQGARAAARAAARAAARAAARAAARAAARAAgVERgJpmVGSRLgiAAAiAAAiAAAiAAAiAAAiAAAiAAAj0RQBqmr5wITAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIjIoA1DSjIot0QQAEQAAEQAAEQAAEQAAEQAAEQAAEQKAvAlDT9IULgUEABEAABEAABEAABEAABEAABEAABEBgVASGqaZ54ztvXP7G5Vf+5JXkHyfxHwiAAAiAAAiAAAiMjsArf/LK5W9cfuM7bwxFRIIMM7qWQsogAAIgAAIgAAI0gZ4yzNDUNL+18Vt0xngGARAAARAAARAAgW0g8FsbvzWg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IIBAqQUev/S4Ft90Ptv5zH8+k2NSJnM3YphSXynqRwABBBBAAAGjwLgxTHHSNIlE4mtnv6Zlavg/AggggAACCCAwYQJfO/u1zORLXp8Qw0zYxeJACCCAAAIIIJASsIthipamSSQSz/znM088/4Q2xjt1YF4ggAACCCCAAAJFF3jgxw888fwTIv1ojKkcYpiiXyAqRAABBBBAAIGsAuPGMMVM0xjDHV4jgAACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlQJomLy52RgABBBBAAAEEEEAAAQQQQAABBEolQJqmVLLUiwACCCCAAAIIIIAAAggggAACCOQlUMw0TSAQWLly5cyZMyX+IIAAAggggAACpRSYOXPmypUrA4FAXnGP3c7EMKW8VtSNAAIIIIAAAmmBcWOYoqVpfD5f+rC8QgABBBBAAAEEJkTA5/PZJV9y/JwYZkIuFAdBAAEEEEAAAZOAXQxTnDRNIBDQjrZ3796RkZEcoyJ2QwABBBBAAAEEChMYGRnZu3evFn6I9KkhhinMn1IIIIAAAgggUJjAuDFMcdI0K1eulCRp7969hbWSUggggAACCCCAQAECWqZm5cqVBZTVihDDFExHQQQQQAABBBAoWMAhhilO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hCAAAiAAAiAAAhEIXJYOc4GZZjgcVqtVZqnBvyAAAiAAAiAAAiDw3QhUq9UIGhKfBDrMd2ssFAQCIAACIAACIOASiKnDXGymGQ6Hqqr+9NNPbI23WzAOQAAEQAAEQAAEQODSCfzwww8//fRTHD8a3lIDHebSGwgZggAIgAAIgAAIBBII12HOzs54FWU4HPrPsBvGMtNIeeEnCIAACIAACIAACIAACIAACIAACIAACIDAmAR+53d+5y/+4i/cm//yL//yd3/3d92f/AHMNDwNHIMACIAACIAACIAACIAACIAACIAACIDAJRP4+eefX7x48ed//ufD4fCv/uqvXr58+fPPPweWATNNIBacBAEQAAEQAAEQAAEQAAEQAAEQAAEQAIHLIVCtVn/++eff/u3fPj4+/r3f+72ff/55VAgbmGkuhzhyAQEQAAEQAAEQAAEQAAEQAAEQAAEQAIFAAmdnZ8xS87P1X7VaRWyaQFA4CQIgAAIgAAIgAAIgAAIgAAIgAAIgAALfnIBrqQmx0QyHQ3jTfPOWQAEgAAIgAAIgAAIgAAIgAAIgAAIgAAIgcHZ29vu///uj/GgYH5hp0E9AAARAAARAAARAAARAAARAAARAAARAYCoIwEwzFc0AIUAABEAABEAABEAABEAABEAABEAABEAAZhr0ARAAARAAARAAARAAARAAARAAARAAARCYCgIw00xFM0AIEAABEAABEAABEAABEAABEAABEAABEICZBn0ABEAABEAABEAABEAABEAABEAABEAABKaCAMw0U9EMEAIEQAAEQAAEQAAEQAAEQAAEQAAEQAAEYKZBHwABEAABEAABEAABEAABEAABEAABEACBqSAAM81UNAOEAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAGYadAHQAAEQAAEQAAEQAAEQAAEQAAEQAAEQGAqCMBMMxXNACFAAARAAARAAARAAARAAARAAARAAARAAGYa9AEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQmAoCMNNMRTNACBAAARAAARAAARAAARAAARAAARAAARCAmQZ9AARAAARAAARAAARAAARAAARAAARAAASmggDMNFPRDBACBEAABEAABEAABEAABEAABEAABEAABGCmQR8AARAAARAAARAAARAAARAAARAAARAAgakgADPNVDQDhAABEAABEAABEAABEAABEAABEAABEAABmGnQB0AABEAABEAABEAABEAABEAABEAABEBgKgjATDMVzQAhQAAEQAAEQAAEQAAEQAAEQAAEQAAEQABmGvQBEAABEAABEAABEAABEAABEAABEAABEJgKAjDTTEUzQAgQAAEQAAEQAAEQAAEQAAEQAAEQAAEQgJkGfQAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEpoIAzDRT0QwQAgRAAARAAARAAARAAARAAARAAARAAARgpkEfAAEQAAEQAAEQAAEQAAEQAAEQAAEQAIGpIAAzzVQ0A4QAARAAARAAARAAARAAARAAARAAARAAAZhp0AdAAARAAARAAARAAARAAARAAARAAARAYCoIwEwzFc0AIUAABEAABEAABEAABEAABEAABEAABEAAZhr0ARAAARAAARAAARAAARAAARAAARAAARCYCgIw00xFM0AIEAABEAABEAABEAABEAABEAABEAABEICZBn0ABEAABEAABEAABEAABEAABEAABEAABKaCAMw0U9EMEAIEQAAEQAAEQAAEQAAEQAAEQAAEQAAEYKZBHwABEAABEAABEAABEAABEAABEAABEACBqSAAM81UNAOEAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAGYadAHQAAEQAAEQAAEQAAEQAAEQAAEQAAEQGAqCMBMMxXNACFAAARAAARAAARAAARAAARAAARAAARA4D8BIdaONodsS2wAAAAASUVORK5CYII=";

  // src/subscreens/introductions/rulesMarkingMenu.ts
  var RulesMarkingMenu = class extends BaseSubscreen {
    get name() {
      return "Rules > Marking";
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
      this.rulesBlock = this.createScrollView({
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
      this.rulesBlock.innerHTML = "";
      rulesList.forEach((rule) => {
        if (searchFilter && !rule.name.toLowerCase().includes(searchFilter.toLowerCase())) return;
        const ruleBtn = this.createButton({
          text: rule.name,
          padding: 3,
          style: isRuleEnabled(InformationSheetSelection, rule.id) ? "green" : "default",
          place: false,
          icon: isRuleStrict2(InformationSheetSelection, rule.id) ? "Icons/Management.png" : null,
          iconAbsolutePosition: false,
          iconWidth: "12.5%"
        });
        if (isRuleEnabled(InformationSheetSelection, rule.id) && !isRuleActive(InformationSheetSelection, rule.id)) {
          ruleBtn.style.color = "red";
        }
        ruleBtn.style.fontWeight = "bold";
        ruleBtn.style.position = "relative";
        ruleBtn.setAttribute("data-lc-ruleId", rule.id);
        ruleBtn.addEventListener("click", () => {
          scrollTop = this.rulesBlock.scrollTop;
          this.setSubscreen(new RuleSettingsMenu(rule));
        });
        this.rulesBlock.append(ruleBtn);
      });
    }
    update() {
      this.refreshRules();
      if (scrollTop) this.rulesBlock.scrollBy({ top: scrollTop });
    }
    exit() {
      scrollTop = null;
      this.setSubscreen(new MainMenu());
    }
  };

  // src/modules/cyberDiaper.ts
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
    }
  }
  function getCyberDiaperAssetName(model) {
    switch (model) {
      case "BULKY_DIAPER" /* BULKY_DIAPER */:
        return "BulkyDiaper";
      case "POOFY_DIAPER" /* POOFY_DIAPER */:
        return "PoofyDiaper";
      default:
        return "BulkyDiaper";
    }
  }
  function putCyberDiaperOn() {
    const cyberDiaper = modStorage.cyberDiaper;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaper.model));
    InventoryWear(Player, getCyberDiaperAssetName(cyberDiaper.model), "ItemPelvis", cyberDiaper.color, 10, 0, {
      Name: cyberDiaper.name ?? "[No Name]",
      Description: cyberDiaper.description ?? "[No Description]",
      MemberName: "Littlish Club Production",
      MemberNumber: 133997,
      Property: cyberDiaper.property ?? "Comfy",
      Color: (cyberDiaper.color ?? asset.DefaultColor).join(","),
      Lock: "",
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
    if (modStorage.cyberDiaper.locked) putCyberDiaperOn();
    else takeCyberDiaperOff();
  }
  function checkCyberDiaper() {
    const cyberDiaperStorage = modStorage.cyberDiaper;
    const cyberDiaperItem = InventoryGet(Player, "ItemPelvis");
    if (!cyberDiaperStorage?.locked) return;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaperStorage.model));
    if (!cyberDiaperItem || cyberDiaperItem.Asset?.Name !== getCyberDiaperAssetName(cyberDiaperStorage.model) || // @ts-ignore
    !colorsEqual(cyberDiaperStorage.color ?? asset.DefaultColor, cyberDiaperItem.Color ?? asset.DefaultColor)) putCyberDiaperOn();
  }
  function loadCyberDiaper() {
    hookFunction("ChatRoomCharacterItemUpdate", 0 /* OBSERVE */, (args, next) => {
      next(args);
      checkCyberDiaper();
    });
    hookFunction("ChatRoomSyncItem", 0 /* OBSERVE */, (args, next) => {
      next(args);
      checkCyberDiaper();
    });
    hookFunction("ChatRoomSyncSingle", 0 /* OBSERVE */, (args, next) => {
      next(args);
      checkCyberDiaper();
    });
  }

  // src/subscreens/cyberDiaperChangeColorMenu.ts
  var CyberDiaperChangeColorMenu = class extends BaseSubscreen {
    canvasCharacter;
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
      const asset = AssetGet(
        Player.AssetFamily,
        "ItemPelvis",
        getCyberDiaperAssetName(this.cyberDiaperSettings.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */)
      );
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      let layerN = 0;
      asset.Layer.forEach((l) => {
        if (!l.AllowColorize || !ItemColorLayerNames.cache[`${asset.Group.Name}${asset.Name}${l.Name}`]) return;
        const n = layerN;
        const layerName = this.createButton({
          text: ItemColorLayerNames.cache[`${asset.Group.Name}${asset.Name}${l.Name}`],
          x: 100,
          y: 220 + 100 * layerN,
          width: 500,
          height: 80
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          layerName.classList.add("lcDisabled");
        }
        layerName.addEventListener("click", () => {
          if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
            return layerName.classList.add("lcDisabled");
          }
          const defaultColor = JSON.parse(JSON.stringify(asset.DefaultColor[n]));
          InventoryGet(this.canvasCharacter, asset.Group.Name).Color[n] = defaultColor;
          CharacterRefresh(this.canvasCharacter);
          this.cyberDiaperSettings.color[n] = defaultColor;
          layerColor.value = asset.DefaultColor[n];
        });
        const layerColor = this.createInput({
          value: this.cyberDiaperSettings.color[layerN],
          x: 640,
          y: 220 + 100 * layerN,
          width: 200,
          height: 80,
          padding: 1
        });
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          layerColor.classList.add("lcDisabled");
        }
        layerColor.setAttribute("type", "color");
        layerColor.addEventListener("change", () => {
          if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
            return layerColor.classList.add("lcDisabled");
          }
          InventoryGet(this.canvasCharacter, asset.Group.Name).Color[n] = layerColor.value;
          CharacterRefresh(this.canvasCharacter);
          this.cyberDiaperSettings.color[n] = layerColor.value;
        });
        layerN++;
      });
    }
    exit() {
      this.setSubscreen(new CyberDiaperSettingsMenu(this.cyberDiaperSettings));
    }
  };

  // src/subscreens/cyberDiaperSettingsMenu.ts
  var CyberDiaperSettingsMenu = class extends BaseSubscreen {
    cyberDiaperSettings;
    get name() {
      return "Cyber Diaper > Settings";
    }
    constructor(cyberDiaperSettings) {
      super();
      if (cyberDiaperSettings) this.cyberDiaperSettings = cyberDiaperSettings;
    }
    load() {
      if (!this.cyberDiaperSettings) {
        this.cyberDiaperSettings = cloneDeep_default(
          (InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB)?.cyberDiaper ?? {}
        );
      }
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      const nameInput = this.createInput({
        placeholder: "Name",
        value: this.cyberDiaperSettings.name ?? "",
        x: 130,
        y: 200,
        width: 800,
        padding: 2
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        nameInput.classList.add("lcDisabled");
      }
      nameInput.addEventListener("change", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return nameInput.classList.add("lcDisabled");
        }
        this.cyberDiaperSettings.name = nameInput.value;
      });
      const descriptionInput = this.createInput({
        placeholder: "Description",
        value: CraftingDescription.Decode(this.cyberDiaperSettings.description) ?? "",
        x: 130,
        y: 310,
        width: 800,
        height: 250,
        padding: 2,
        textArea: true
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        descriptionInput.classList.add("lcDisabled");
      }
      descriptionInput.addEventListener("change", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return descriptionInput.classList.add("lcDisabled");
        }
        this.cyberDiaperSettings.description = descriptionInput.value;
      });
      const changeColorBtn = this.createButton({
        text: `Change Color`,
        x: 130,
        y: 620,
        width: 800,
        height: 140
      });
      changeColorBtn.addEventListener("click", () => {
        this.setSubscreen(
          new CyberDiaperChangeColorMenu(this.cyberDiaperSettings)
        );
      });
      const putOnOffBtn = this.createButton({
        text: `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`,
        x: 130,
        y: 780,
        width: 800,
        height: 140,
        style: "inverted"
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        putOnOffBtn.classList.add("lcDisabled");
      }
      putOnOffBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return putOnOffBtn.classList.add("lcDisabled");
        }
        this.cyberDiaperSettings.locked = !this.cyberDiaperSettings.locked;
        putOnOffBtn.textContent = `${this.cyberDiaperSettings.locked ? "Unlock it and take it off" : "Put it on and lock it"}`;
      });
      const modelBtn = this.createButton({
        text: `Model: ${getCyberDiaperModelName(this.cyberDiaperSettings.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */)}`,
        x: 1e3,
        y: 200,
        width: 900,
        height: 100
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        modelBtn.classList.add("lcDisabled");
      }
      modelBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return modelBtn.classList.add("lcDisabled");
        }
        this.cyberDiaperSettings.model = (this.cyberDiaperSettings.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */) === "BULKY_DIAPER" /* BULKY_DIAPER */ ? "POOFY_DIAPER" /* POOFY_DIAPER */ : "BULKY_DIAPER" /* BULKY_DIAPER */;
        delete this.cyberDiaperSettings.color;
        modelBtn.textContent = "Model: " + getCyberDiaperModelName(this.cyberDiaperSettings.model);
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
        y: 320,
        width: 900,
        height: 100
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        changePermissionBtn.classList.add("lcDisabled");
      }
      changePermissionBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return changePermissionBtn.classList.add("lcDisabled");
        }
        this.cyberDiaperSettings.changePermission = getNextCyberDiaperChangePermission(
          this.cyberDiaperSettings.changePermission ?? "EVERYONE" /* EVERYONE */
        );
        changePermissionBtn.textContent = `Change permission: ${permissionsTexts[this.cyberDiaperSettings.changePermission]}`;
      });
      this.createText({
        text: "For Extended Settings",
        x: 1e3,
        width: 900,
        y: 460,
        fontSize: 5
      });
      const craftImport = this.createInput({
        placeholder: "Crafting code (Get it in crafting menu)",
        x: 1e3,
        y: 525,
        width: 900,
        padding: 2
      });
      const importCraftBtn = this.createButton({
        x: 1e3,
        y: 635,
        width: 900,
        padding: 2,
        text: "Import Settings From Craft"
      });
      importCraftBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return importCraftBtn.classList.add("lcDisabled");
        }
        const data = JSON.parse(LZString.decompressFromBase64(craftImport.value));
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
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        craftImport.classList.add("lcDisabled");
        importCraftBtn.classList.add("lcDisabled");
      }
      const saveChangesBtn = this.createButton({
        text: "Save Changes",
        x: 1520,
        y: 790,
        width: 400,
        height: 150,
        style: "green"
      });
      saveChangesBtn.style.fontWeight = "bold";
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        saveChangesBtn.classList.add("lcDisabled");
      }
      saveChangesBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return saveChangesBtn.classList.add("lcDisabled");
        }
        if (InformationSheetSelection.IsPlayer()) {
          modStorage.cyberDiaper = this.cyberDiaperSettings;
          updateDiaperItem();
          addLog(`${getNickname(Player)} (${Player.MemberNumber}) changed settings of cyber diaper`, false);
          syncStorage();
        } else {
          chatSendModMessage(
            "changeCyberDiaperSettings",
            this.cyberDiaperSettings,
            InformationSheetSelection.MemberNumber
          );
        }
        this.exit();
      });
    }
    exit() {
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
      const buyBtn = this.createButton({
        text: "Buy Cyber Diaper for 499$",
        x: 500,
        y: 800,
        width: 1e3,
        padding: 2,
        fontSize: 8
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
        buyBtn.classList.add("lcDisabled");
      }
      buyBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          return buyBtn.classList.add("lcDisabled");
        }
        if (Player.Money < 499) return notify("Not enough money.");
        CharacterChangeMoney(Player, -499);
        notify("Successfully bought Cyber Diaper.");
        modStorage.cyberDiaper = {
          name: "Default diaper name",
          description: "Default diaper description",
          model: "BULKY_DIAPER" /* BULKY_DIAPER */
        };
        syncStorage();
        this.setSubscreen(new CyberDiaperSettingsMenu());
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
      const deleteBtn = this.createButton({
        text: "Delete",
        x: 1550,
        y: 850,
        width: 360,
        padding: 2
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "DELETE_NOTES" /* DELETE_NOTES */) && this.note.author.id !== Player.MemberNumber) {
        deleteBtn.classList.add("lcDisabled");
      }
      deleteBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "DELETE_NOTES" /* DELETE_NOTES */) && this.note.author.id !== Player.MemberNumber) {
          deleteBtn.classList.add("lcDisabled");
        }
        if (InformationSheetSelection.IsPlayer()) {
          const [note] = modStorage.notes.list.splice(this.key - 1, 1);
          addLog(`${getNickname(Player)} (${Player.MemberNumber}) deleted note: "${note.text}"`, false);
          this.exit();
        } else {
          chatSendModMessage("deleteNote", {
            key: this.key
          }, InformationSheetSelection.MemberNumber);
          this.setPreviousSubscreen();
        }
      });
    }
    exit() {
      syncStorage();
      this.setPreviousSubscreen();
    }
  };

  // src/subscreens/notesMenu.ts
  function addNote(note, subscreen, scrollView, key, pending = false) {
    const btn = subscreen.createButton({
      text: `${note.author.name} (${note.author.id}) added note "${note.text}" at ${new Date(note.ts).toUTCString()}`,
      place: false,
      padding: 2
    });
    btn.style.wordBreak = "break-all";
    btn.style.width = "98%";
    if (pending) btn.classList.add("lcDisabled");
    btn.addEventListener("click", () => {
      subscreen.setSubscreen(new NoteSettingsMenu(note, key));
    });
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
      const notesList = InformationSheetSelection.IsPlayer() ? modStorage.notes?.list ?? [] : InformationSheetSelection.LITTLISH_CLUB?.notes?.list ?? [];
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      const scrollView = this.createScrollView({
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
      const placeNoteBtn = this.createButton({
        text: "Add note",
        x: 1575,
        y: 840,
        width: 275,
        padding: 2
      });
      placeNoteBtn.addEventListener("click", () => {
        if (noteInput.value.trim() === "") return;
        if (new TextEncoder().encode(noteInput.value).byteLength / 1024 > MAX_NOTE_SIZE_IN_KBYTES) {
          return notify(
            `That note takes up more size than the set limit. You are evil.`,
            4500
          );
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
        if (InformationSheetSelection.IsPlayer()) {
          if (!modStorage.notes) modStorage.notes = {};
          if (!modStorage.notes.list) modStorage.notes.list = [];
          modStorage.notes.list.push(note);
          addLog(`${getNickname(Player)} (${Player.MemberNumber}) added note: "${note.text}" at ${new Date(note.ts).toUTCString()}`, false);
        } else {
          chatSendModMessage("addNote", {
            text: noteInput.value
          }, InformationSheetSelection.MemberNumber);
        }
        addNote(note, this, scrollView, scrollView.children.length + 1, !InformationSheetSelection.IsPlayer());
        noteInput.value = "";
      });
    }
    update() {
      this.scrollView.innerHTML = "";
      const notesList = InformationSheetSelection.IsPlayer() ? modStorage.notes?.list ?? [] : InformationSheetSelection.LITTLISH_CLUB?.notes?.list ?? [];
      notesList.forEach((note, i) => {
        addNote(note, this, this.scrollView, i + 1);
      });
    }
    exit() {
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      const scrollView = this.createScrollView({
        scroll: "y",
        x: 150,
        y: 200,
        width: 1700,
        height: 700
      });
      scrollView.style.display = "flex";
      scrollView.style.flexDirection = "column";
      scrollView.style.alignItems = "center";
      scrollView.style.rowGap = "1vw";
      ChatRoomCharacter?.forEach((C) => {
        const btn = this.createButton({
          text: isRequestedByPlayer(C) ? `${CharacterNickname(C)} (${C.MemberNumber}) [ Pending... ]` : `${CharacterNickname(C)} (${C.MemberNumber})`,
          place: false,
          padding: 2
        });
        btn.style.wordBreak = "break-all";
        btn.style.width = "98%";
        btn.addEventListener("click", () => {
          if (!C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C)) return;
          chatSendModMessage("addBaby", null, C.MemberNumber);
          this.exit();
        });
        if (!C.LITTLISH_CLUB || C.IsPlayer() || hasMommy(C) || isRequestedByPlayer(C)) btn.classList.add("lcDisabled");
        scrollView.append(btn);
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
      this.setSubscreen(new WardrobeMenu(this.currentAppearance));
    }
  };

  // src/utils/wardrobe.ts
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
      CharacterAppearanceSetItem(C, item.Asset.Group.Name, item.Asset, item.Color);
      const _item = InventoryGet(C, item.Asset.Group.Name);
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
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      this.createButton({
        icon: "Icons/Notifications.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 175
      }).addEventListener("click", () => {
        this.setSubscreen(new AboutWardrobeMenu(this.currentAppearance));
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
          isChecked: true
        }).addEventListener("click", () => {
          if (this.includeTypes.includes(d)) this.includeTypes.splice(this.includeTypes.indexOf(d), 1);
          else this.includeTypes.push(d);
          this.refresh();
        });
      });
      this.createCheckbox({
        text: "Viewing Mode",
        x: 1500,
        y: 720,
        isChecked: false
      }).addEventListener("click", () => {
        this.isViewingMode = !this.isViewingMode;
        if (hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_APPEARANCE" /* MANAGE_APPEARANCE */)) applyBtn.classList.toggle("lcDisabled");
        this.refresh();
      });
      const scrollView = this.createScrollView({
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
          place: false
        });
        btn.style.width = "95%";
        btn.style.position = "relative";
        btn.addEventListener("click", () => {
          this.currentAppearance = a;
          this.refresh();
        });
        scrollView.append(btn);
      });
      const applyBtn = this.createButton({
        text: "Apply",
        x: 160,
        y: 800,
        width: 750,
        padding: 3,
        style: "inverted"
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_APPEARANCE" /* MANAGE_APPEARANCE */) || this.isViewingMode) {
        applyBtn.classList.add("lcDisabled");
      }
      applyBtn.addEventListener("click", () => {
        importAppearance(InformationSheetSelection, this.canvasCharacter.Appearance, this.includeTypes);
        this.exit();
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
      const appearanceBundle = serverAppearanceBundleToAppearance(
        InformationSheetSelection.AssetFamily,
        JSON.parse(
          LZString.decompressFromBase64(this.currentAppearance.bundle)
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
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/introductions/exploringModeMenu.ts
  var ExploringModeMenu = class extends BaseSubscreen {
    get name() {
      return "Exploring Mode";
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
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
    scrollView;
    get name() {
      return "Logs";
    }
    get icon() {
      return `Icons/Title.png`;
    }
    async load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "READ_LOGS" /* READ_LOGS */)) {
        return this.createText({
          text: "403 | Not enough rights to read logs",
          x: 400,
          y: 400,
          width: 1200,
          fontSize: 8
        }).style.textAlign = "center";
      }
      let logs;
      if (InformationSheetSelection.IsPlayer()) {
        logs = modStorage.logs?.list ?? [];
      } else {
        const statusText = this.createText({
          text: "Loading Logs...",
          x: 400,
          y: 400,
          width: 1200,
          fontSize: 8
        });
        statusText.style.textAlign = "center";
        const res = await sendRequest("getLogs", null, InformationSheetSelection.MemberNumber);
        if (res.isError) return statusText.textContent = "Loading Error :(";
        statusText.remove();
        logs = res.data;
      }
      if (logs.length === 0) return;
      const scrollView = this.createScrollView({
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
      logs.forEach((log) => this.createLogButton(log));
      const deleteLogsInput = this.createInput({
        placeholder: "How much logs to delete",
        x: 150,
        y: 845,
        width: 840,
        padding: 2
      });
      deleteLogsInput.setAttribute("type", "number");
      deleteLogsInput.addEventListener("input", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "DELETE_LOGS" /* DELETE_LOGS */)) {
          return deleteLogsInput.classList.add("lcDisabled");
        }
        if (parseInt(deleteLogsInput.value) > scrollView.children.length) deleteLogsInput.value = String(scrollView.children.length);
        if (parseInt(deleteLogsInput.value) < 0) deleteLogsInput.value = "0";
        for (const c of [...scrollView.children]) {
          const style = c.getAttribute("style");
          if (style.includes("border: 2px solid red;")) {
            c.setAttribute("style", style.replaceAll("border: 2px solid red;", ""));
          }
        }
        for (let i = 0; i < parseInt(deleteLogsInput.value); i++) {
          const style = scrollView.children[i].getAttribute("style");
          scrollView.children[i].setAttribute("style", style + "border: 2px solid red;");
        }
      });
      const deleteLogsBtn = this.createButton({
        text: "Delete",
        x: 1010,
        y: 845,
        width: 840,
        padding: 2
      });
      deleteLogsBtn.addEventListener("click", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "DELETE_LOGS" /* DELETE_LOGS */)) {
          return deleteLogsBtn.classList.add("lcDisabled");
        }
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
          chatSendModMessage("deleteLogs", {
            count
          }, InformationSheetSelection.MemberNumber);
          this.createLogButton({
            message: `${getNickname(Player)} (${Player.MemberNumber}) deleted log entries (${count})`,
            ts: Date.now()
          });
        }
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "DELETE_LOGS" /* DELETE_LOGS */)) {
        deleteLogsInput.classList.add("lcDisabled");
        deleteLogsBtn.classList.add("lcDisabled");
      }
    }
    createLogButton(log) {
      const btn = this.createButton({
        text: `${log.message} at (${new Date(log.ts).toUTCString()})`,
        place: false,
        padding: 2
      });
      btn.style.wordBreak = "break-all";
      btn.style.width = "98%";
      this.scrollView.append(btn);
      this.scrollView.scrollTo(0, this.scrollView.scrollHeight);
    }
    exit() {
      this.setSubscreen(new MainMenu());
    }
  };

  // src/images/discord.png
  var discord_default = "data:image/png;base64,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";

  // src/subscreens/mainMenu.ts
  var MainMenu = class extends BaseSubscreen {
    canvasCharacter;
    run() {
      DrawCharacter(this.canvasCharacter, 1600, 350, 0.6, false);
      DrawCircle(1650, 575, 6, 2, "Black");
      DrawCircle(1625, 550, 8, 2, "Black");
      DrawCircle(1600, 525, 10, 2, "Black");
      if (MouseIn(1680, 500, 150, 180) && document.body.style.cursor != "pointer") document.body.style.cursor = "pointer";
      if (!MouseIn(1680, 500, 150, 180) && document.body.style.cursor != "") document.body.style.cursor = "";
    }
    load() {
      this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
      const baseAppearance = serverAppearanceBundleToAppearance(InformationSheetSelection.AssetFamily, JSON.parse(
        LZString.decompressFromBase64(
          MY_APPEARANCE_BUNDLE
        )
      ));
      const babyAppearance = serverAppearanceBundleToAppearance(InformationSheetSelection.AssetFamily, JSON.parse(
        LZString.decompressFromBase64(
          CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)].bundle
        )
      ));
      ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, JSON.parse(
        LZString.decompressFromBase64(
          MY_APPEARANCE_BUNDLE
        )
      ));
      importAppearance(this.canvasCharacter, babyAppearance);
      PoseSetActive(this.canvasCharacter, "Kneel");
      CharacterRefresh(this.canvasCharacter);
      let cloudText = `Littlish Club v${MOD_VERSION}
Thanks for installing the mod!`;
      let cloudHtml = `Littlish Club <b>v${MOD_VERSION}</b><br>Thanks for installing the mod!`;
      if (this.canvasCharacter.IsGagged()) cloudHtml = `${SpeechTransformBabyTalk(cloudText)}<br><br>(${cloudHtml})`;
      const cloudBtn = this.createButton({
        x: 1e3,
        y: 300,
        width: 550,
        height: 500
      });
      cloudBtn.innerHTML = cloudHtml;
      cloudBtn.style.pointerEvents = "none";
      cloudBtn.style.borderRadius = "4vw";
      cloudBtn.style.display = "block";
      if (InformationSheetSelection.IsPlayer()) {
        const addBabyBtn = this.createButton({
          text: "Add Baby",
          x: 1e3,
          y: 820,
          width: 550,
          height: 115,
          style: "inverted"
        });
        addBabyBtn.style.fontWeight = "bold";
        addBabyBtn.addEventListener("click", () => {
          this.setSubscreen(new AddBabyMenu());
        });
      }
      const joinDiscordBtn = this.createButton({
        icon: discord_default,
        width: 90,
        height: 90,
        x: 1815,
        y: 235
      });
      joinDiscordBtn.addEventListener("click", () => open(DISCORD_SERVER_INVITE_LINK));
      const openWardrobeBtn = this.createButton({
        icon: "Icons/Rectangle/Dress.png",
        width: 90,
        height: 90,
        x: 1815,
        y: 340
      });
      openWardrobeBtn.addEventListener("click", () => {
        this.setSubscreen(new WardrobeMenu());
      });
      this.createText({
        text: MOD_NAME,
        x: 940,
        y: 110,
        fontSize: 14
      });
      if (InformationSheetSelection.IsPlayer() && isExploringModeEnabled()) {
        this.createText({
          text: "You are currently in Exploring mode!",
          x: 150,
          y: 90,
          width: 600,
          padding: 1,
          withBackground: true
        }).style.textAlign = "center";
        const exploringModeBtn = this.createButton({
          icon: "Icons/Notifications.png",
          fontSize: 2,
          x: 160,
          y: 145,
          width: 50,
          height: 50
        });
        exploringModeBtn.addEventListener("click", () => {
          this.setSubscreen(new ExploringModeMenu());
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
          y: (InformationSheetSelection.IsPlayer() && isExploringModeEnabled() ? 225 : 150) + 115 * i,
          width: 600,
          height: 100,
          icon: m.icon ?? null
        });
        btn.style.fontWeight = "bold";
        btn.addEventListener("click", () => {
          const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
          if (m.name === "Cyber Diaper" && storage.cyberDiaper) {
            this.setSubscreen(new CyberDiaperSettingsMenu());
          } else this.setSubscreen(m);
        });
      });
    }
    click() {
      if (MouseIn(1680, 500, 150, 180)) {
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
    exit() {
      this.setSubscreen(null);
    }
  };

  // src/subscreens/acceptRequestMenu.ts
  var AcceptRequestMenu = class extends BaseSubscreen {
    get name() {
      return "Request to become your mommy";
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      this.createText({
        text: `${modStorage.requestReciviedFrom.name} (${modStorage.requestReciviedFrom.id}) wants to become your mommy :3`,
        x: 200,
        y: 240,
        width: 1600,
        fontSize: 6
      }).style.textAlign = "center";
      const acceptBtn = this.createButton({
        text: "Accept",
        x: 550,
        y: 800,
        width: 400,
        padding: 2
      });
      acceptBtn.addEventListener("click", () => {
        modStorage.mommy = {
          name: modStorage.requestReciviedFrom.name,
          id: modStorage.requestReciviedFrom.id
        };
        delete modStorage.requestReciviedFrom;
        this.exit();
      });
      const rejectBtn = this.createButton({
        text: "Reject",
        x: 1050,
        y: 800,
        width: 400,
        padding: 2
      });
      rejectBtn.addEventListener("click", () => {
        delete modStorage.requestReciviedFrom;
        this.exit();
      });
    }
    exit() {
      syncStorage();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/modules/ui.ts
  function notify(message, time = 4e3) {
    ServerBeep = {
      Message: message,
      Timer: Date.now() + time
    };
  }
  function loadUI() {
    hookFunction("InformationSheetRun", 100 /* TOP */, (args, next) => {
      if ((InformationSheetSelection.IsPlayer() || InformationSheetSelection.LITTLISH_CLUB) && !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) && !window.LSCG_REMOTE_WINDOW_OPEN && !window.LITTLISH_CLUB.inModSubscreen() && !window.MPA?.menuLoaded) {
        DrawButton(
          ...MOD_BUTTON_POSITION,
          "",
          "White",
          milk_bottle_default,
          MOD_NAME
        );
      }
      if (window.LITTLISH_CLUB.inModSubscreen()) {
        return currentSubscreen.run();
      }
      next(args);
    });
    hookFunction("InformationSheetClick", 0 /* OBSERVE */, (args, next) => {
      if ((InformationSheetSelection.IsPlayer() || InformationSheetSelection.LITTLISH_CLUB) && !(window.bcx?.inBcxSubscreen && window.bcx.inBcxSubscreen()) && !window.LSCG_REMOTE_WINDOW_OPEN && !window.LITTLISH_CLUB.inModSubscreen() && !window.MPA?.menuLoaded && MouseIn(...MOD_BUTTON_POSITION)) {
        if (typeof modStorage.requestReciviedFrom?.id === "number") setSubscreen(new AcceptRequestMenu());
        else setSubscreen(new MainMenu());
      }
      if (window.LITTLISH_CLUB.inModSubscreen()) {
        return currentSubscreen.click();
      }
      next(args);
    });
    hookFunction("InformationSheetExit", 0 /* OBSERVE */, (args, next) => {
      if (window.LITTLISH_CLUB.inModSubscreen()) {
        return currentSubscreen.exit();
      }
      next(args);
    });
  }

  // src/styles.css
  var styles_default = `/* @font-face {
    font-family: HellooDarling;
    src: url("http://127.0.0.1:5500/dist/BabyCrab.otf");
} */
@import url('https://fonts.googleapis.com/css2?family=Emilys+Candy&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.lcButton {
    cursor: pointer;
    background: var(--tmd-element, white);
    font-family: "Emilys Candy";
    color: var(--tmd-text, black);
    border: 2px solid var(--tmd-accent, black);
    border-radius: 4px;
}

.lcButton:hover {
    background: var(--tmd-element-hover, #ebf7fe);
    border-color: var(--tmd-accent-hover, #7dd3fc);
    color: var(--tmd-accent-hover, #015a8c);
}

.lcButton[data-lc-style="green"] {
    background: rgb(124, 255, 124);
    border-color: rgb(82, 204, 82);
    color: black;
}

.lcButton[data-lc-style="green"]:hover {
    background: rgb(94, 197, 94);
    color: black;
}

.lcButton[data-lc-style="inverted"] {
    background: var(--tmd-accent, #303030);
    border: none;
    color: var(--tmd-text, white);
}

.lcButton[data-lc-style="inverted"]:hover {
    background: var(--tmd-accent-hover, #474747);
}

.lcInput {
    background: var(--tmd-element, white);
    font-family: Emilys Candy;
    color: var(--tmd-text, black);
    padding: 2vw;
    border: 2px solid var(--tmd-accent, black);
    border-radius: 4px;
}

.lcInput::placeholder {
    color: var(--tmd-text, black);
}

.lcDisabled {
    pointer-events: none;
    opacity: 0.6;
}

.paciCheckbox::before {
	background-image: url("https://raw.githubusercontent.com/FurryZoi/Littlish-Club/refs/heads/main/src/images/pacifier.png") !important;
	background-size: cover !important;
    clip-path: none !important;
    background-color: unset !important;
}`;

  // src/modules/api.ts
  function createApi() {
    window.LITTLISH_CLUB = Object.freeze({
      inModSubscreen: () => !!currentSubscreen,
      getCaregiversOf,
      getMommyOf,
      isCaregiverOf,
      isMommyOf,
      hasAccessRightTo,
      isRuleActive,
      isSleeping
    });
  }

  // src/modules/messaging.ts
  function validateRuleConditions(r, data) {
    if (data.conditions) {
      if (!r.conditions) r.conditions = {};
      if (["any", "all"].includes(data.conditions.type)) r.conditions.type = data.conditions.type;
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
    const ruleParams = rulesList.find((g) => g.id === r.id).data ?? [];
    for (const param of ruleParams) {
      const p = data.data?.[param.name];
      if (param.type === "number" && typeof p !== "number") continue;
      if (param.type === "text" && typeof p !== "string") continue;
      if (param.type === "checkbox" && typeof p !== "boolean") continue;
      if (!r.data) r.data = {};
      r.data[param.name] = p;
    }
  }
  function loadMessaging() {
    hookFunction("ChatRoomMessage", 1 /* ADD_BEHAVIOR */, (args, next) => {
      const message = args[0];
      const sender = getPlayer(message.Sender);
      if (!sender) return next(args);
      if (message.Content === MOD_MESSAGE_KEY && !sender.IsPlayer()) {
        const msg = message.Dictionary.msg;
        const data = message.Dictionary.data;
        if (msg === "request") {
          if (typeof data.requestId !== "number" || typeof data.message !== "string") return;
          handleRequest2(data.requestId, data.message, data.data, sender);
        }
        if (msg === "requestResponse") {
          if (typeof data.requestId !== "number") return;
          handleRequestResponse2(data.requestId, data.data);
        }
        if (msg === "syncStorage") {
          if (!sender.LITTLISH_CLUB) {
            chatSendModMessage("syncStorage", {
              storage: deleteProtectedProperties(modStorage)
            }, sender.MemberNumber);
          }
          sender.LITTLISH_CLUB = data.storage;
          if (InformationSheetSelection && InformationSheetSelection.MemberNumber === sender.MemberNumber && window.LITTLISH_CLUB.inModSubscreen()) {
            currentSubscreen.update();
          }
        }
        if (msg === "addBaby" && !hasMommy(Player) && modStorage.requestReciviedFrom?.id !== sender.MemberNumber) {
          modStorage.requestReciviedFrom = {
            name: CharacterNickname(sender),
            id: sender.MemberNumber
          };
          syncStorage();
          chatSendLocal(`${getNickname(sender)} (${sender.MemberNumber}) wants to become your mommy, open Littlish Club menu`);
        }
        if (msg === "turnCanChangeCaregiversList" && hasAccessRightTo(sender, Player, "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */)) {
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
          addLog(
            `${getNickname(sender)} (${sender.MemberNumber}) ${modStorage.caregivers.canChangeList ? "allowed" : "forbade"} ${getNickname(Player)} to change caregivers list`,
            false
          );
          syncStorage();
        }
        if (msg === "changeCaregiversList" && hasAccessRightTo(sender, Player, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
          if (!Array.isArray(data?.list)) return;
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.list = data.list;
          chatSendLocal(`${getNickname(sender)} (${sender.MemberNumber}) changed your caregivers list`);
          addLog(
            `${getNickname(sender)} (${sender.MemberNumber}) changed caregivers list`,
            false
          );
          syncStorage();
        }
        if (msg === "turnCaregiversAccessRight" && hasAccessRightTo(sender, Player, "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */)) {
          if (!caregiverAccessRightsList.find((r) => r.id === data?.accessRightId)) return;
          turnCaregiverAccessRight(data.accessRightId);
          const _message = `${getNickname(sender)} (${sender.MemberNumber}) turned ${isCaregiverAccessRightEnabled(Player, data.accessRightId) ? "on" : "off"} caregiver access right "${caregiverAccessRightsList.find((r) => r.id === data.accessRightId).name}"`;
          addLog(
            _message,
            false
          );
          syncStorage();
          chatSendLocal(_message);
        }
        if (msg === "changeRuleSettings" && hasAccessRightTo(sender, Player, "MANAGE_RULES" /* MANAGE_RULES */)) {
          if (!rulesList.find((r2) => r2.id === data?.id)) return;
          if (isRuleStrict2(Player, data.id) && !isMommyOf(sender, Player)) return;
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
            r.changedBy = sender.MemberNumber;
            r.ts = Date.now();
          } else {
            let d = {
              id: data.id,
              state: typeof data.state === "boolean" ? data.state : false,
              strict: typeof data.strict === "boolean" && hasAccessRightTo(sender, Player, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */) ? data.strict : false,
              changedBy: sender.MemberNumber,
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
          chatSendLocal(_message);
        }
        if (msg === "addNote") {
          if (typeof data?.text !== "string" || data.text.trim() === "") return;
          if (new TextEncoder().encode(data.text).byteLength / 1024 > MAX_NOTE_SIZE_IN_KBYTES) {
            return chatSendLocal(
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
              id: sender.MemberNumber
            },
            ts: Date.now()
          };
          modStorage.notes.list.push(note);
          const _message = `${getNickname(sender)} (${sender.MemberNumber}) added note: "${data.text}"`;
          addLog(_message, false);
          syncStorage();
          chatSendLocal(_message);
        }
        if (msg === "deleteNote") {
          if (typeof data?.key !== "number") return;
          const note = modStorage.notes?.list?.find((n, i) => i === data.key - 1);
          if (!note) return;
          if (note.author.id !== sender.MemberNumber && !hasAccessRightTo(sender, Player, "DELETE_NOTES" /* DELETE_NOTES */)) return;
          modStorage.notes.list.splice(data.key - 1, 1);
          const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted note: "${note.text}"`;
          addLog(_message, false);
          syncStorage();
          chatSendLocal(_message);
        }
        if (msg === "changeCyberDiaperSettings" && hasAccessRightTo(sender, Player, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
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
            modStorage.cyberDiaper = {};
            chatSendLocal(`${getNickname(sender)} bought cyber diaper for you`);
          }
          if (typeof name === "string") modStorage.cyberDiaper.name = name;
          if (typeof description === "string") modStorage.cyberDiaper.description = description;
          if (typeof model === "string") modStorage.cyberDiaper.model = model;
          if (typeof locked === "boolean") modStorage.cyberDiaper.locked = locked;
          if (Array.isArray(color)) modStorage.cyberDiaper.color = color;
          if (Object.values(CyberDiaperChangePermission).includes(changePermission)) modStorage.cyberDiaper.changePermission = changePermission;
          if (typeof property === "string") modStorage.cyberDiaper.property = property;
          if (typeRecord) modStorage.cyberDiaper.typeRecord = typeRecord;
          if (drawingPriority) modStorage.cyberDiaper.drawingPriority = drawingPriority;
          const _message = `${getNickname(sender)} (${sender.MemberNumber}) changed cyber diaper's settings`;
          addLog(_message, false);
          syncStorage();
          updateDiaperItem();
          chatSendLocal(_message);
        }
        if (msg === "releaseBaby" && hasAccessRightTo(sender, Player, "RELEASE_BABY" /* RELEASE_BABY */)) {
          delete modStorage.mommy;
          syncStorage();
          chatSendLocal(`${getNickname(sender)} (${sender.MemberNumber}) released you`);
        }
        if (msg === "deleteLogs" && hasAccessRightTo(sender, Player, "DELETE_LOGS" /* DELETE_LOGS */)) {
          if (typeof data.count !== "number") return;
          const _message = `${getNickname(sender)} (${sender.MemberNumber}) deleted log entries (${data.count})`;
          modStorage.logs.list.splice(0, data.count);
          addLog(_message, false);
          chatSendLocal(_message);
          syncStorage();
        }
      }
      next(args);
    });
  }

  // src/index.ts
  var init = () => {
    const style = document.createElement("style");
    style.innerHTML = styles_default;
    document.head.append(style);
    initStorage();
    loadMessaging();
    createApi();
    loadUI();
    loadRules();
    loadCyberDiaper();
    console.log(`${MOD_NAME} loaded`);
    if (MOD_VERSION !== modStorage.version) {
      waitFor(() => !!document.getElementById("InputChat")).then(() => {
        modStorage.version = MOD_VERSION;
        syncStorage();
        chatSendChangelog();
      });
    }
  };
  if (CurrentScreen == null || CurrentScreen === "Login") {
    hookFunction("LoginResponse", 0 /* OBSERVE */, (args, next) => {
      next(args);
      const response = args[0];
      if (typeof response?.Name === "string" && typeof response?.AccountName === "string") init();
    });
  } else init();
})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=bundle.js.map
