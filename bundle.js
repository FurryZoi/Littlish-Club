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

  // node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js
  var require_bcmodsdk = __commonJS({
    "node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js"(exports2) {
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
  var MOD_VERSION = "1.0.1";
  var MOD_NAME = "Littlish Club";
  var MOD_FULL_NAME = MOD_NAME;
  var REPO_URL = "https://github.com/FurryZoi/Littlish-Club";
  var MOD_BUTTON_POSITION = [1705, 800 - 115, 90, 90];
  var CANVAS_BABIES_APPEARANCES = [
    {
      name: "Little Baby",
      creator: "Zoi",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUFFUJ4fCWDAsm1HIeroiyCg9FAtinm+FJgkBfUUHuYBodqurcPq4IVXQVV3gmIVpaFdhuBZBBwOhtg4N1m6MPQO07YNw0YWNg4ALTfKq15TZ6VD5DgqVvPkFAPuobm+TmGA3Rwq0FGZgI9W5BQeWNAHSIw5gMtI5gAb+3x/LCzDA7+vz0Ay/7qu5nm2gdo36sw+7CuFYopnQHB4HcnXOfWhHWiCFk0QiMQcFAFBFKEVW6Bgj3WVAL1wG9H1fWZYWQXQFmBHABbsOseFtMVOhwLYFAAOSWAABNJnPqCrupamZbmWAEsYIMGk5gA9T1QFrAsqwUfAqwrcCzAoKsshQLJYDJ66tqg/2AwQxCgijzDMAyar+9IHC/N8aqwmHiPI7+xA+55+6ho9ZQxnAGCkOKpbJKQVVC0eMQ3l6LLqGQcBUGXZgNj+jCMAnYAl1X5dvAAWjAWDsAA8iG6ixg6TgTrG+pxZNqBVQ8GAYK8dZm1zPNveYtiYtJn065twJDejQOkKCINgxDUMw78cMAWD4K/GqRLsEnQOY5qI2YSguOhRBR5gKLBAODAliOraTxp4AC8MB0VDBgH+f8kw51QCTMmGAKYWgKFaNstNNj02MEzFmQ4wBs1QPPZ6GBXqgJXmvAWjh36Dk/mLCWpApbYnKLLeWStVbq3NpbDeaN9aG2NueU2HN2Ha2+tbW29tHbO1du7H6G5vY7z9gHX8QcQ5hwjlHGOoIL5XyJInORFDU7sQzlnTiZQRL5yuoXKCxdS7l0rtXFAtdwT10bs3au80O5d1IL3furoh58HDIOMeYkbgFyIWGO6dZpBJExAoDUFAXCb0pMwcEDYYRqgAowBksJ6AcDXGCcwvwiQNjPnvaQ9BvjmDPg/dC2NBxI0wcza04A8GGiiTEmw8S8YDhFjQ449CRhMIVsrFWch2nbC4QbSSvDXKjItjbC2Ls3YexOF7MEapL6wgZOCf2GSsk5P9vkwpcMw5lIqfDFOIY04oEMdnImF4864PMZQjwViW5QArq8+xdcG6kBca3Os7ie59ygAPCBsY/Gj0vOPB5XoZoPiXPNBwGIsAQAoBtT275t4A2Tpi32t9dFVKfkdFARIoVVUmH0BqiK5AOjkDecMnpTIJLBAyX43YGSQz3gyBuv52UAShDDDgaS94shFaK/aj9Dr6m0W/fGwscEwLivU7BTSrpqScjSul0YMCMs6QTVAotdS0NNrhBhMtzK6GYUMnAvA+54u4ZMmKdAIA2owCIi2YjCBOwWVIzezLWXSHZf7Llv4eXmH9vy74gr/airFecy5yBrnGNztwMxXoLHPJ+dYt5tjtjIAcU4zNry3Gd0Bd4weYKR4BMhUEmoHBeAPgauYJqY0WoxLHMpdFPUIQMmyUSB4AEHiDqHQOh4v4A1pLpAlYm9a8CBgCKePgWlzUyDjEyu+gx114qxbvMERI1QpN/BO3VcrwBY2fgaHCeFIxIJQRxEi/9nTkVVRxaiAYgyhn8VRFicYEwPtiBgHM1pTb0ukuwTwAGCCkhkK7JdMCwAIAbDmfSUKLImvCZZNDZzlkYtBEjegv5ik4oxlCnos9WiyFsJ1AguTfptk3WjbdRBJ2qTxPcOdC6oAKFyfNBoIqviWBvp2zcg6snR3poIIAA="
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
      name: "Cinnamorolls baby",
      creator: "Tiana",
      bundle: "NobwRA4gTg9grgBzALjACQKYEsDmALAFzABowA5AQwFsMV0AGATgDZ6SwBhGAGxihWABdAL7Fw0eElQAhGABMAngFUECDP1KUadADIUoOWqS69+qAIIBnLBQB27AAqw1UAgpTgAKgrUAlDADGfHIeYG5qIcj0omDeaii2cNzcwqLisIh05lBUljoYAGZEmtS0qGBpkBlSYNm5vriE7FplYBViVZJ0aHZyeYXF5KV07eldqD22fQ34gy0jlRKZMvIKOjAA7urNw6gAGnoGRpw8fFnWdqOdy+gUWFAAYrC2c7u3908wLwBMAKzsJjOyGAYAAxABmDj0X7MAAcYBEHSWNR692kFACAGsdtoJncoOisQAWb4A05mEEQqEw+GIsY3ACiCgwACNYBtLDjWkzWezLKTSE4YC43KE4hh/EEoJFwJyoqQpPRSGZoqQACJYAoFLABJKi+VgaS8LECQSkBlawJEYFm9BYORlISkND2jAASQIGCoptI5mSm3MAQIWAAblh9U7agQCFAsCy4J6fbEfK1LPQEPQoGxzQAPBBQDCWaxfBJJFKLap0Hmckq4sDVgCMDbJpgEYNh4KJjGkpNtQpF7mQ4AZeYLRawJeQiWSqSRldQ1YFQzrjebxnJbdBHa7PYRguc6n1w9HheL9inZdn9JqAFl4AQ8Fy6A8yy2gZTvg36ODwQB2dighQFC/CB/x9geriDl4KaSsEoTcCgSphIhMQalqOp6oOSFGjAJo2ualpBkmLoOsRroel6SZ+rwGyBsGYYRra5jRrG8aJvhybxKg3D0AQ2b1ie46TtO5ZzuM5BYKo3CFk+qBkJJCDSfyVzInQDhwEW7i1q06mac2FbiUKtjwLYNbLq0ADKeAYJg/AGTcmAUCE2l0GqhQUHqKnzoa3AaY+LkyL5lj+WA/aHlBAn5qeE7niJV7XDUDy+faZnzKgSVwClXniQyVAwMGQT2AF9Z5QVJb2TUHC8A+sm1HIeroiyChqmOynrq2wJgr+DyMLC0j/KQoJqr+arMAyDIAbCjCMA2jDmAiFV0FZMAycV5i2Ji0kWTGFAIMtq0nB1lIMt8J0MhwC1iTcVX5XggYBKefBaeZdAQNw4aehoh3vmC0jSGqRIPEuoJ/QDQN7qFEFHpxEqBHBQ5hCmkTMKki0yFAFC1RZGA5go0hYJiWC2FgS6AhSv3/YDvZo6FdjBgdaWGkkmLNTYLhvuToKMPQ5j0NI4IAWq4IAwDAHSMw0iA8wYuU+DdIJUtuGYpYMxNMV6wwJYGAWUrZlk5uoNUxDYWQWKMFw9KoThBgkTRPFqmoDrWL9EUWO60SHMG7L1NXTUPJWU5my1RwFAEDynudaCX7R2w4HCuFoQAPIIBi4ZYQAdLC9veRRVCTHI1ncM5L2O1QFDJAAanGGPBrYOAAOq9BHlK/IwHDgg8Hvyw7YBO8rtXQE5WAYC8Dh0woeCa8c+uRw80gPBwDxqjLYM+9er28CGDNvA8WDBbYGAEG9MBb3rG6R4bcs06iUD3Y9UAKEujO+BiQRfAy+iWGu32c5fa8K3JQIm0MTHEZutLANAID3G4GQIB3AQHNwpqvFeRtBp/0uuvPErw6zSAwHYYeiCQbewwQA94t8AgPSLE9AWxUP5QEbjkbY7UfqgnMMwcwDJpCMAAmwjhXCFqCCAA"
    }
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
  function setPreviousSubscreen() {
    setSubscreen(previousSubscreen);
  }
  function setSubscreen(subscreen) {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    if (currentSubscreen) currentSubscreen.load();
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
      icon
    }) {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.classList.add("lcButton");
      btn.setAttribute("data-lc-style", style);
      if (icon) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.left = "0";
        div.style.top = "0";
        div.style.display = "flex";
        div.style.alignItems = "center";
        const img = document.createElement("img");
        img.src = icon;
        img.style.height = "80%";
        if (text) {
          img.style.position = "absolute";
          img.style.left = "1vw";
        } else {
          div.style.justifyContent = "center";
        }
        div.append(img);
        btn.append(div);
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
      padding
    }) {
      const p = document.createElement("p");
      p.textContent = text;
      p.style.color = color ?? "var(--tmd-text, black)";
      if (withBackground) p.style.background = "var(--tmd-element,rgb(239, 239, 239))";
      p.style.fontFamily = "Emilys Candy";
      const setProperties = () => {
        setPosition(p, x, y, anchor);
        setSize(p, width, height);
        if (padding) setPadding(p, padding);
        if (fontSize === "auto") autosetFontSize(p);
        else setFontSize(p, fontSize);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      document.body.append(p);
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
      padding
    }) {
      const input = document.createElement(textArea ? "textarea" : "input");
      input.classList.add("lcInput");
      if (placeholder) input.placeholder = placeholder;
      if (value) input.value = value;
      const setProperties = () => {
        setPosition(input, x, y, anchor);
        setSize(input, width, height);
        if (padding) setPadding(input, padding);
        if (fontSize === "auto") autosetFontSize(input);
        else setFontSize(input, fontSize);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      document.body.append(input);
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
      anchor = "top-left"
    }) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isChecked;
      checkbox.classList.add("lcCheckbox");
      const p = document.createElement("p");
      p.textContent = text;
      p.style.color = "var(--tmd-text, black)";
      p.style.fontFamily = "Emilys Candy";
      const setProperties = () => {
        setPosition(checkbox, x, y, anchor);
        setPosition(p, x + 100, y, anchor);
        setSize(checkbox, 65, 65);
        if (width) setSize(p, width, null);
        setFontSize(p, 5);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      document.body.append(checkbox, p);
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
        setPosition(div, x, y, anchor);
        setSize(div, width, height);
      };
      setProperties();
      window.addEventListener("resize", setProperties);
      document.body.append(div);
      this.resizeEventListeners.push(setProperties);
      this.htmlElements.push(div);
      return div;
    }
  };

  // src/utils/chat.ts
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
\u2022 Cyber Diaper (BETA)
 \u2022 Fixed conflicts with MPA
 \u2022 Reset settings button
 \u2022 New rule condition
 \u2022 "Fall asleep after milk bottle" rule
 \u2022 Local notifications
 \u2022 Alternative baby speech algorithm
 \u2022 Rules strict mode
 \u2022 Fixed bugs

These are the changes in the last 4 days.`);
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
      Content: "lcClubMsg",
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
        return C1.MemberNumber === C2.MemberNumber || isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1003 /* MANAGE_APPEARANCE */);
      case "DELETE_NOTES" /* DELETE_NOTES */:
        return isMommyOf(C1, C2) || isCaregiverOf(C1, C2) && isCaregiverAccessRightEnabled(C2, 1002 /* DELETE_NOTES */);
    }
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
    }
  }
  function putCyberDiaperOn() {
    const cyberDiaper = modStorage.cyberDiaper;
    const asset = AssetGet(Player.AssetFamily, "ItemPelvis", getCyberDiaperAssetName(cyberDiaper.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */));
    InventoryWear(Player, getCyberDiaperAssetName(cyberDiaper.model), "ItemPelvis", cyberDiaper.color, 10, 0, {
      Name: cyberDiaper.name ?? "[No Name]",
      Description: cyberDiaper.description ?? "[No Description]",
      MemberName: "Littlish Club Production",
      MemberNumber: 133997,
      Property: "Comfy",
      Color: (cyberDiaper.color ?? asset.DefaultColor).join(","),
      Lock: "",
      Item: getCyberDiaperAssetName(cyberDiaper.model ?? "BULKY_DIAPER" /* BULKY_DIAPER */),
      Private: true,
      ItemProperty: null
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
    if (!cyberDiaperItem) putCyberDiaperOn();
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
    chatSendModMessage("syncStorage", {
      storage: modStorage
    });
    hookFunction("ChatRoomMessage", 1 /* ADD_BEHAVIOR */, (args, next) => {
      const message = args[0];
      const sender = getPlayer(message.Sender);
      if (!sender) return next(args);
      if (message.Content === "lcClubMsg" && !sender.IsPlayer()) {
        const msg = message.Dictionary.msg;
        const data2 = message.Dictionary.data;
        if (msg === "syncStorage") {
          if (!sender.LITTLISH_CLUB) {
            chatSendModMessage("syncStorage", {
              storage: modStorage
            }, sender.MemberNumber);
          }
          sender.LITTLISH_CLUB = data2.storage;
          if (InformationSheetSelection && InformationSheetSelection.MemberNumber === sender.MemberNumber) {
            currentSubscreen.update();
          }
        }
        if (msg === "addBaby" && !hasMommy(Player) && modStorage.requestReciviedFrom?.id !== sender.MemberNumber) {
          modStorage.requestReciviedFrom = {
            name: CharacterNickname(sender),
            id: sender.MemberNumber
          };
          syncStorage();
          chatSendLocal(`${getNickname(sender)} wants to become your mommy, open Littlish Club menu`);
        }
        if (msg === "turnCanChangeCaregiversList" && hasAccessRightTo(sender, Player, "TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST" /* TURN_PREVENT_BABY_FROM_CHANGING_CAREGIVERS_LIST */)) {
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.canChangeList = !modStorage.caregivers.canChangeList;
          syncStorage();
        }
        if (msg === "changeCaregiversList" && hasAccessRightTo(sender, Player, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
          if (!Array.isArray(data2?.list)) return;
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.list = data2.list;
          syncStorage();
          chatSendLocal(`${getNickname(sender)} changed your caregivers list`);
        }
        if (msg === "turnCaregiversAccessRight" && hasAccessRightTo(sender, Player, "MANAGE_CAREGIVERS_ACCESS_RIGHTS" /* MANAGE_CAREGIVERS_ACCESS_RIGHTS */)) {
          if (!caregiverAccessRightsList.find((r) => r.id === data2?.accessRightId)) return;
          turnCaregiverAccessRight(data2.accessRightId);
          syncStorage();
          chatSendLocal(`${getNickname(sender)} turned ${isCaregiverAccessRightEnabled(Player, data2.accessRightId) ? "on" : "off"} caregiver access right "${caregiverAccessRightsList.find((r) => r.id === data2.accessRightId).name}"`);
        }
        if (msg === "changeRuleSettings" && hasAccessRightTo(sender, Player, "MANAGE_RULES" /* MANAGE_RULES */)) {
          if (!rulesList.find((r2) => r2.id === data2?.id)) return;
          if (isRuleStrict(Player, data2.id) && !isMommyOf(sender, Player)) return;
          if (!modStorage.rules) modStorage.rules = {};
          if (!modStorage.rules.list) modStorage.rules.list = [];
          let r = modStorage.rules.list.find((d) => d.id === data2.id);
          if (r) {
            if (typeof data2.state === "boolean") r.state = data2.state;
            if (typeof data2.strict === "boolean" && hasAccessRightTo(sender, Player, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */)) {
              r.strict = data2.strict;
            }
            validateRuleData(r, data2);
            validateRuleConditions(r, data2);
            r.changedBy = sender.MemberNumber;
            r.ts = Date.now();
          } else {
            let d = {
              id: data2.id,
              state: typeof data2.state === "boolean" ? data2.state : false,
              strict: typeof data2.strict === "boolean" && hasAccessRightTo(sender, Player, "TURN_RULE_STRICT_MODE" /* TURN_RULE_STRICT_MODE */) ? data2.strict : false,
              changedBy: sender.MemberNumber,
              ts: Date.now()
            };
            validateRuleData(d, data2);
            validateRuleConditions(d, data2);
            modStorage.rules.list.push(d);
          }
          syncStorage();
          chatSendLocal(`${getNickname(sender)} changed settings of "${rulesList.find((r2) => r2.id === data2?.id).name}" rule`);
        }
        if (msg === "addNote") {
          if (typeof data2?.text !== "string" || data2.text.trim() === "") return;
          if (!modStorage.notes) modStorage.notes = {};
          if (!modStorage.notes.list) modStorage.notes.list = [];
          const note = {
            text: data2.text,
            author: {
              name: CharacterNickname(sender),
              id: sender.MemberNumber
            },
            ts: Date.now()
          };
          modStorage.notes.list.push(note);
          syncStorage();
          chatSendLocal(`${getNickname(sender)} added note: ${data2.text}`);
        }
        if (msg === "deleteNote") {
          if (typeof data2?.key !== "number") return;
          const note = modStorage.notes?.list?.find((n, i) => i === data2.key - 1);
          if (!note) return;
          if (note.author.id !== sender.MemberNumber && !hasAccessRightTo(sender, Player, "DELETE_NOTES" /* DELETE_NOTES */)) return;
          modStorage.notes.list.splice(data2.key - 1, 1);
          syncStorage();
          chatSendLocal(`${getNickname(sender)} deleted note: ${note.text}`);
        }
        if (msg === "changeCyberDiaperSettings" && hasAccessRightTo(sender, Player, "MANAGE_DIAPER" /* MANAGE_DIAPER */)) {
          const { name, description, model, locked, color, changePermission } = data2;
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
          syncStorage();
          updateDiaperItem();
          chatSendLocal(`${getNickname(sender)} changed cyber diaper's settings`);
        }
      }
      next(args);
    });
    hookFunction("ChatRoomSync", 1 /* ADD_BEHAVIOR */, (args, next) => {
      next(args);
      chatSendModMessage("syncStorage", {
        storage: modStorage
      });
    });
  }
  function validateRuleConditions(r, data) {
    console.log(r, data);
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
    console.log(r, data);
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
  function syncStorage() {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.LITTLISH_CLUB = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("LITTLISH_CLUB");
    chatSendModMessage("syncStorage", {
      storage: modStorage
    });
  }
  function resetStorage() {
    modStorage = {
      version: MOD_VERSION
    };
    syncStorage();
  }

  // src/modules/rules.ts
  var dialogMenuButtonClickHooks = /* @__PURE__ */ new Map();
  var buttonLabels = /* @__PURE__ */ new Map();
  var imageRedirects = /* @__PURE__ */ new Map();
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
          text: "Size Multiplier",
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
        whenInRoomWithRoleCondition = conditions?.whenInRoomWithRole?.inRoom ?? true ? inRoomWithCaregiver(C) : !inRoomWithCaregiver(C);
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
    text = text.replaceAll("is", "ith");
    text = text.replaceAll("are", "aw");
    text = text.replaceAll("am", "amm");
    text = text.replaceAll("no", "ni");
    text = text.replaceAll("s", "th");
    text = text.replaceAll("h", "hh");
    const babyWords = ["ba-bye", "da-da", "ma-ma", "goo-goo", "wee", "ooh", "gu", "ga", "agu", "guga"];
    text = text.replace(/(\w+)\b/g, (word) => word + (getRandomNumber(1, text.split(" ").length) === 1 ? " " + babyWords[Math.floor(Math.random() * babyWords.length)] : ""));
    return text.trim();
  }
  function loadRules() {
    const attempt = () => {
      const item = InventoryGet(Player, Player.FocusGroup?.Name);
      if (!item) return;
      const itemName = item.Craft ? item.Craft.Name : item.Asset.Description;
      if (item?.Asset?.Category?.includes("ABDL") && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) {
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
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) || isSleeping(Player)) return false;
      return next(args);
    });
    hookFunction("PoseCanChangeUnaidedStatus", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (!args[0].IsPlayer()) return next(args);
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) || isSleeping(Player)) return PoseChangeStatus.NEVER;
      return next(args);
    });
    hookFunction("ChatRoomCanAttemptStand", 10 /* OVERRIDE_BEHAVIOR */, (args, next) => {
      if (isRuleActive(Player, 1005 /* WALK_LIKE_BABY */) || isSleeping(Player)) return false;
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
        if (!asset.Category?.includes("ABDL") && isRuleActive(Player, 1003 /* ABDL_INVENTORY */)) return;
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
          if (target.IsPlayer() && ["Spank", "FrenchKiss"].includes(activityName) && isSleeping(Player)) {
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
        return next(args) * sizeMultiplier;
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
      if (C.IsPlayer() && item && item?.Asset?.Category?.includes("ABDL") && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) {
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
      if (!item) return next(args);
      if (C.IsPlayer() && item && item?.Asset?.Category?.includes("ABDL") && isRuleActive(Player, 1e3 /* PREVENT_TAKING_ABDL_ITEMS_OFF */)) return;
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
  }

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
          text: `Mod Data Size: ${Math.round(new TextEncoder().encode(Player.ExtensionSettings?.LITTLISH_CLUB ?? "").byteLength / 100) / 10}KB`,
          x: 150,
          y: 240,
          fontSize: 6
        });
        const resetBtn = this.createButton({
          text: "Reset settings",
          x: 100,
          y: 825,
          width: 500,
          padding: 2,
          icon: "Icons/ServiceBell.png"
        });
        if (isRuleActive(Player, 1009 /* DISABLE_RESET_SETTINGS_BUTTON */)) resetBtn.classList.add("lcDisabled");
        resetBtn.addEventListener("click", () => {
          if (isRuleActive(Player, 1009 /* DISABLE_RESET_SETTINGS_BUTTON */)) return;
          resetStorage();
          this.exit();
        });
      }
    }
  };

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
    get name() {
      return "Family";
    }
    get icon() {
      return `Assets/Female3DCG/Emoticon/Hearts/Icon.png`;
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      const caregiversInput = this.createInput({
        placeholder: "Caregivers member numbers",
        value: getCaregiversOf(InformationSheetSelection).join(", "),
        x: 1e3,
        y: 200,
        width: 850,
        height: 600,
        textArea: true
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
        caregiversInput.classList.add("lcDisabled");
      }
      caregiversInput.addEventListener("change", () => {
        if (!hasAccessRightTo(Player, InformationSheetSelection, "CHANGE_CAREGIVERS_LIST" /* CHANGE_CAREGIVERS_LIST */)) {
          return caregiversInput.classList.add("lcDisabled");
        }
        const list = caregiversInput.value.split(",").map((c) => parseInt(c.trim())).filter((c) => typeof c === "number" && !Number.isNaN(c));
        if (InformationSheetSelection.IsPlayer()) {
          if (!modStorage.caregivers) modStorage.caregivers = {};
          modStorage.caregivers.list = list;
        } else {
          chatSendModMessage("changeCaregiversList", {
            list
          }, InformationSheetSelection.MemberNumber);
        }
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
        } else {
          chatSendModMessage("turnCanChangeCaregiversList", null, InformationSheetSelection.MemberNumber);
        }
      });
    }
    exit() {
      syncStorage();
      this.setSubscreen(new MainMenu());
    }
  };

  // src/subscreens/ruleSettingsMenu.ts
  var RuleSettingsMenu = class extends BaseSubscreen {
    rule;
    ruleSettings;
    canChangeSettings = () => hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_RULES" /* MANAGE_RULES */) && (!isRuleStrict(InformationSheetSelection, this.rule.id) || isMommyOf(Player, InformationSheetSelection) || InformationSheetSelection.IsPlayer() && isExploringModeEnabled());
    get name() {
      return `Rules > ${this.rule.name}`;
    }
    constructor(rule) {
      super();
      this.rule = rule;
      const storage = InformationSheetSelection.IsPlayer() ? modStorage : InformationSheetSelection.LITTLISH_CLUB;
      this.ruleSettings = storage.rules?.list?.find((r) => r.id === this.rule.id) ?? {
        id: this.rule.id,
        state: false,
        strict: false,
        changedBy: Player.MemberNumber,
        ts: Date.now()
      };
      this.ruleSettings = JSON.parse(JSON.stringify(this.ruleSettings));
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      const description = this.createText({
        text: `${this.rule.description}`,
        x: 1e3,
        y: 250,
        width: 800,
        fontSize: 6,
        withBackground: true,
        padding: 2
      });
      description.style.textAlign = "center";
      this.rule.data?.forEach((param, i) => {
        if (param.type !== "checkbox") {
          this.createText({
            text: param.text + ":",
            x: 1e3,
            y: 420 + i * 140,
            width: 400,
            fontSize: 5
          });
        }
        if (param.type === "number") {
          const input = this.createInput({
            value: getRuleParameter(InformationSheetSelection, this.rule.id, param.name)?.toString() ?? "",
            placeholder: param.type,
            x: 1350,
            y: 420,
            width: 500,
            height: 80
          });
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
        } else if (param.type === "checkbox") {
          const checkbox = this.createCheckbox({
            x: 1e3,
            y: 440,
            width: 800,
            isChecked: !!getRuleParameter(InformationSheetSelection, this.rule.id, param.name),
            text: param.text
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
        }
      });
      const turnStateBtn = this.createButton({
        text: isRuleEnabled(InformationSheetSelection, this.rule.id) ? "State: Enabled" : "State: Disabled",
        x: 150,
        y: 250,
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
        y: 365,
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
        y: 525,
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
        y: 650,
        isChecked: !!this.ruleSettings.conditions?.whenInRoomWithRole
      });
      if (!this.canChangeSettings()) {
        whenCheckbox.classList.add("lcDisabled");
      }
      const inRoomBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWithRole?.inRoom ?? true ? "in room" : "not in room",
        x: 395,
        y: 650,
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
        y: 650,
        fontSize: 5
      });
      const caregiverBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWithRole?.role ?? "caregiver",
        x: 805,
        y: 650,
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
        y: 650,
        fontSize: 5
      });
      const whenCheckbox2 = this.createCheckbox({
        text: "When in room where ABDL is",
        x: 150,
        y: 750,
        isChecked: !!this.ruleSettings.conditions?.whenInRoomWhereAbdl
      });
      if (!this.canChangeSettings()) {
        whenCheckbox2.classList.add("lcDisabled");
      }
      const isBlockedBtn = this.createButton({
        text: this.ruleSettings.conditions?.whenInRoomWhereAbdl?.blocked ?? true ? "blocked" : "not blocked",
        x: 930,
        y: 750,
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
          } else {
            modStorage.rules.list.push(this.ruleSettings);
          }
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
  };

  // src/subscreens/rulesMenu.ts
  var RulesMenu = class extends BaseSubscreen {
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
      rulesList.forEach((rule, i) => {
        const ruleBtn = this.createButton({
          text: rule.name,
          x: i > 4 ? 150 + 800 + 100 : 150,
          y: i > 4 ? 300 + (i - 5) * 115 : 300 + i * 115,
          width: 800,
          padding: 2,
          style: isRuleEnabled(InformationSheetSelection, rule.id) ? "green" : "default"
        });
        ruleBtn.style.fontWeight = "bold";
        ruleBtn.addEventListener("click", () => {
          this.setSubscreen(new RuleSettingsMenu(rule));
        });
      });
    }
    update() {
      this.unload();
      this.load();
    }
    exit() {
      this.setSubscreen(new MainMenu());
    }
  };

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

  // node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/lodash-es/_getRawTag.js
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

  // node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/lodash-es/_baseGetTag.js
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

  // node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/lodash-es/isObject.js
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/lodash-es/isFunction.js
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

  // node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/lodash-es/_isMasked.js
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/lodash-es/_toSource.js
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

  // node_modules/lodash-es/_baseIsNative.js
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

  // node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/lodash-es/_WeakMap.js
  var WeakMap = getNative_default(root_default, "WeakMap");
  var WeakMap_default = WeakMap;

  // node_modules/lodash-es/_baseCreate.js
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

  // node_modules/lodash-es/_copyArray.js
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default = copyArray;

  // node_modules/lodash-es/_defineProperty.js
  var defineProperty = function() {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  var defineProperty_default = defineProperty;

  // node_modules/lodash-es/_arrayEach.js
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

  // node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var isIndex_default = isIndex;

  // node_modules/lodash-es/_baseAssignValue.js
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

  // node_modules/lodash-es/eq.js
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_default = eq;

  // node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/lodash-es/_copyObject.js
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

  // node_modules/lodash-es/isLength.js
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  var isLength_default = isLength;

  // node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/lodash-es/_isPrototype.js
  var objectProto5 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/lodash-es/_baseIsArguments.js
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/lodash-es/isArguments.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments_default : function(value) {
    return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments_default = isArguments;

  // node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/lodash-es/isBuffer.js
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/lodash-es/_baseIsTypedArray.js
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

  // node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/lodash-es/_nodeUtil.js
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

  // node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/lodash-es/_arrayLikeKeys.js
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

  // node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/lodash-es/_nativeKeys.js
  var nativeKeys = overArg_default(Object.keys, Object);
  var nativeKeys_default = nativeKeys;

  // node_modules/lodash-es/_baseKeys.js
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

  // node_modules/lodash-es/keys.js
  function keys(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default = keys;

  // node_modules/lodash-es/_nativeKeysIn.js
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

  // node_modules/lodash-es/_baseKeysIn.js
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

  // node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
  }
  var keysIn_default = keysIn;

  // node_modules/lodash-es/_nativeCreate.js
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/lodash-es/_hashGet.js
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

  // node_modules/lodash-es/_hashHas.js
  var objectProto11 = Object.prototype;
  var hasOwnProperty9 = objectProto11.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/lodash-es/_hashSet.js
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/lodash-es/_Hash.js
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

  // node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/lodash-es/_assocIndexOf.js
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

  // node_modules/lodash-es/_listCacheDelete.js
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

  // node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/lodash-es/_listCacheSet.js
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

  // node_modules/lodash-es/_ListCache.js
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

  // node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/lodash-es/_isKeyable.js
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/lodash-es/_MapCache.js
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

  // node_modules/lodash-es/_arrayPush.js
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var arrayPush_default = arrayPush;

  // node_modules/lodash-es/_getPrototype.js
  var getPrototype = overArg_default(Object.getPrototypeOf, Object);
  var getPrototype_default = getPrototype;

  // node_modules/lodash-es/_stackClear.js
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default = stackClear;

  // node_modules/lodash-es/_stackDelete.js
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default = stackDelete;

  // node_modules/lodash-es/_stackGet.js
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default = stackGet;

  // node_modules/lodash-es/_stackHas.js
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default = stackHas;

  // node_modules/lodash-es/_stackSet.js
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

  // node_modules/lodash-es/_Stack.js
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

  // node_modules/lodash-es/_baseAssign.js
  function baseAssign(object, source) {
    return object && copyObject_default(source, keys_default(source), object);
  }
  var baseAssign_default = baseAssign;

  // node_modules/lodash-es/_baseAssignIn.js
  function baseAssignIn(object, source) {
    return object && copyObject_default(source, keysIn_default(source), object);
  }
  var baseAssignIn_default = baseAssignIn;

  // node_modules/lodash-es/_cloneBuffer.js
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

  // node_modules/lodash-es/_arrayFilter.js
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

  // node_modules/lodash-es/stubArray.js
  function stubArray() {
    return [];
  }
  var stubArray_default = stubArray;

  // node_modules/lodash-es/_getSymbols.js
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

  // node_modules/lodash-es/_copySymbols.js
  function copySymbols(source, object) {
    return copyObject_default(source, getSymbols_default(source), object);
  }
  var copySymbols_default = copySymbols;

  // node_modules/lodash-es/_getSymbolsIn.js
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

  // node_modules/lodash-es/_copySymbolsIn.js
  function copySymbolsIn(source, object) {
    return copyObject_default(source, getSymbolsIn_default(source), object);
  }
  var copySymbolsIn_default = copySymbolsIn;

  // node_modules/lodash-es/_baseGetAllKeys.js
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
  }
  var baseGetAllKeys_default = baseGetAllKeys;

  // node_modules/lodash-es/_getAllKeys.js
  function getAllKeys(object) {
    return baseGetAllKeys_default(object, keys_default, getSymbols_default);
  }
  var getAllKeys_default = getAllKeys;

  // node_modules/lodash-es/_getAllKeysIn.js
  function getAllKeysIn(object) {
    return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
  }
  var getAllKeysIn_default = getAllKeysIn;

  // node_modules/lodash-es/_DataView.js
  var DataView = getNative_default(root_default, "DataView");
  var DataView_default = DataView;

  // node_modules/lodash-es/_Promise.js
  var Promise2 = getNative_default(root_default, "Promise");
  var Promise_default = Promise2;

  // node_modules/lodash-es/_Set.js
  var Set2 = getNative_default(root_default, "Set");
  var Set_default = Set2;

  // node_modules/lodash-es/_getTag.js
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

  // node_modules/lodash-es/_initCloneArray.js
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

  // node_modules/lodash-es/_Uint8Array.js
  var Uint8Array2 = root_default.Uint8Array;
  var Uint8Array_default = Uint8Array2;

  // node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default = cloneArrayBuffer;

  // node_modules/lodash-es/_cloneDataView.js
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var cloneDataView_default = cloneDataView;

  // node_modules/lodash-es/_cloneRegExp.js
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var cloneRegExp_default = cloneRegExp;

  // node_modules/lodash-es/_cloneSymbol.js
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  var cloneSymbol_default = cloneSymbol;

  // node_modules/lodash-es/_cloneTypedArray.js
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var cloneTypedArray_default = cloneTypedArray;

  // node_modules/lodash-es/_initCloneByTag.js
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

  // node_modules/lodash-es/_initCloneObject.js
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
  }
  var initCloneObject_default = initCloneObject;

  // node_modules/lodash-es/_baseIsMap.js
  var mapTag4 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike_default(value) && getTag_default(value) == mapTag4;
  }
  var baseIsMap_default = baseIsMap;

  // node_modules/lodash-es/isMap.js
  var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
  var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
  var isMap_default = isMap;

  // node_modules/lodash-es/_baseIsSet.js
  var setTag4 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike_default(value) && getTag_default(value) == setTag4;
  }
  var baseIsSet_default = baseIsSet;

  // node_modules/lodash-es/isSet.js
  var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
  var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
  var isSet_default = isSet;

  // node_modules/lodash-es/_baseClone.js
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

  // node_modules/lodash-es/cloneDeep.js
  var CLONE_DEEP_FLAG2 = 1;
  var CLONE_SYMBOLS_FLAG2 = 4;
  function cloneDeep(value) {
    return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
  }
  var cloneDeep_default = cloneDeep;

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
        value: this.cyberDiaperSettings.description ?? "",
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
        x: 1200,
        y: 200,
        width: 700,
        height: 160
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
        x: 1200,
        y: 380,
        width: 700,
        height: 160
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
      buyBtn.addEventListener("click", () => {
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
          modStorage.notes.list.splice(this.key - 1, 1);
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
    console.log(key);
    const btn = subscreen.createButton({
      text: `${note.author.name} (${note.author.id}) noted: ${note.text}`,
      place: false,
      padding: 2
    });
    btn.style.wordBreak = "break-all";
    btn.style.width = "90%";
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
        } else {
          chatSendModMessage("addNote", {
            text: noteInput.value
          }, InformationSheetSelection.MemberNumber);
        }
        addNote(note, this, scrollView, scrollView.children.length, !InformationSheetSelection.IsPlayer());
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
      scrollView.style.rowGap = "1vw";
      ChatRoomCharacter?.forEach((C) => {
        const btn = this.createButton({
          text: isRequestedByPlayer(C) ? `${CharacterNickname(C)} (${C.MemberNumber}) [ Pending... ]` : `${CharacterNickname(C)} (${C.MemberNumber})`,
          place: false,
          padding: 2
        });
        btn.style.wordBreak = "break-all";
        btn.style.width = "90%";
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

  // src/subscreens/wardrobeMenu.ts
  var WardrobeMenu = class extends BaseSubscreen {
    canvasCharacter;
    currentAppearance = CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)];
    get name() {
      return "Littlish Wardrobe";
    }
    run() {
      DrawCharacter(this.canvasCharacter, 1100, 100, 0.8, false);
    }
    load() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 10
      });
      this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
      const appearanceBundle = JSON.parse(
        LZString.decompressFromBase64(
          this.currentAppearance.bundle
        )
      );
      this.canvasCharacter.Appearance = InformationSheetSelection.Appearance;
      ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, appearanceBundle, Player.MemberNumber);
      CharacterRefresh(this.canvasCharacter);
      const createrName = this.createText({
        text: `By ${this.currentAppearance.creator}`,
        x: 1500,
        y: 240,
        width: 400
      });
      createrName.style.textAlign = "center";
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
          padding: 2,
          icon: "Icons/Rectangle/Dress.png",
          place: false
        });
        btn.style.width = "95%";
        btn.style.position = "relative";
        btn.addEventListener("click", () => {
          this.currentAppearance = a;
          const appearanceBundle2 = JSON.parse(
            LZString.decompressFromBase64(
              a.bundle
            )
          );
          ServerAppearanceLoadFromBundle(this.canvasCharacter, this.canvasCharacter.AssetFamily, appearanceBundle2, Player.MemberNumber);
          CharacterRefresh(this.canvasCharacter);
          createrName.textContent = `By ${a.creator}`;
        });
        scrollView.append(btn);
      });
      const applyBtn = this.createButton({
        text: "Apply",
        x: 160,
        y: 800,
        width: 750,
        padding: 2,
        style: "inverted"
      });
      if (!hasAccessRightTo(Player, InformationSheetSelection, "MANAGE_APPEARANCE" /* MANAGE_APPEARANCE */)) {
        applyBtn.classList.add("lcDisabled");
      }
      applyBtn.addEventListener("click", () => {
        const appearanceBundle2 = ServerAppearanceBundle(this.canvasCharacter.Appearance);
        ServerAppearanceLoadFromBundle(InformationSheetSelection, this.canvasCharacter.AssetFamily, appearanceBundle2, Player.MemberNumber);
        ChatRoomCharacterUpdate(InformationSheetSelection);
        this.exit();
      });
    }
  };

  // src/subscreens/exploringModeMenu.ts
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
        width: 1200,
        x: 400,
        y: 350
      });
    }
  };

  // src/subscreens/mainMenu.ts
  var MainMenu = class extends BaseSubscreen {
    canvasCharacter;
    run() {
      DrawCharacter(this.canvasCharacter, 1600, 350, 0.6, false);
      DrawCircle(1650, 575, 6, 2, "Black");
      DrawCircle(1625, 550, 8, 2, "Black");
      DrawCircle(1600, 525, 10, 2, "Black");
    }
    load() {
      this.canvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
      const appearance = JSON.parse(
        LZString.decompressFromBase64(
          CANVAS_BABIES_APPEARANCES[getRandomNumber(0, CANVAS_BABIES_APPEARANCES.length - 1)].bundle
        )
      );
      this.canvasCharacter.Appearance = serverAppearanceBundleToAppearance(
        this.canvasCharacter.AssetFamily,
        appearance
      );
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
      if (InformationSheetSelection.IsPlayer()) {
        const addBabyBtn = this.createButton({
          text: "Add baby",
          x: 1e3,
          y: 820,
          width: 550,
          padding: 3,
          style: "inverted"
        });
        addBabyBtn.style.fontWeight = "bold";
        addBabyBtn.addEventListener("click", () => {
          this.setSubscreen(new AddBabyMenu());
        });
      }
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
        text: MOD_NAME + " (BETA)",
        x: 850,
        y: 120,
        fontSize: 10
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
          padding: 1,
          fontSize: 2,
          x: 160,
          y: 150,
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
        new NotesMenu()
      ].forEach((m, i) => {
        const btn = this.createButton({
          text: m.name,
          x: 150,
          y: (InformationSheetSelection.IsPlayer() && isExploringModeEnabled() ? 250 : 150) + 140 * i,
          width: 600,
          padding: 3,
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
        DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
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
        if (MouseIn(1815, 75, 90, 90)) currentSubscreen.exit();
        else currentSubscreen.click();
        return;
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
    background: rgb(89, 189, 89);
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

  // src/index.ts
  var init = () => {
    const style = document.createElement("style");
    style.innerHTML = styles_default;
    document.head.append(style);
    console.log(`${MOD_NAME} loaded`);
    initStorage();
    createApi();
    loadUI();
    loadRules();
    loadCyberDiaper();
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
