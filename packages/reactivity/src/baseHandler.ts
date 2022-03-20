import { activeEffect, track, trigger } from './effect'

export { activeEffect } from './effect'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export const mutableHandler = {
  get (target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
      track(target, 'get', key)
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    const oldValue = target[key]

    if (oldValue !== value) {
      trigger(target, 'set', key, value, oldValue)
    }
    let result = Reflect.set(target, key, value, receiver)
    return result
  }
}