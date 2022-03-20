var VueReactivity = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/reactivity/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    effect: () => effect,
    reactive: () => reactive
  });

  // packages/reactivity/src/effect.ts
  var activeEffect = void 0;
  var ReactiveEffect = class {
    constructor(fn) {
      this.fn = fn;
    }
    active = true;
    run() {
      if (!this.active) {
        this.fn();
      }
      try {
        activeEffect = this;
        return this.fn();
      } finally {
        activeEffect = void 0;
      }
    }
  };
  function effect(fn) {
    const _effect = new ReactiveEffect(fn);
  }

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };

  // packages/reactivity/src/baseHandler.ts
  var mutableHandler = {
    get(target, key, receiver) {
      if (key === "__v_isReactive" /* IS_REACTIVE */) {
        return true;
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      return true;
    }
  };

  // packages/reactivity/src/reactive.ts
  var targetMap = /* @__PURE__ */ new WeakMap();
  function reactive(target) {
    if (isObject(target)) {
      return;
    }
    if (target["__v_isReactive" /* IS_REACTIVE */]) {
      return target;
    }
    let existProxy = targetMap.get(target);
    if (existProxy) {
      return existProxy;
    }
    const proxy = new Proxy(target, mutableHandler);
    if (!targetMap[target]) {
      targetMap.set(target, proxy);
    }
    return proxy;
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.js.map
