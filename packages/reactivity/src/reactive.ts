import { isObject } from "@vue/shared";
import {  ReactiveFlags, mutableHandler } from './baseHandler'

const targetMap = new WeakMap()


export function reactive (target) {
  if (isObject(target)) {
    return
  }

  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  let existProxy = targetMap.get(target)
  if (existProxy) {
    return existProxy
  }

  const proxy = new Proxy(target, mutableHandler)
  if (!targetMap[target]) {
    targetMap.set(target, proxy)
  }

  return proxy
}