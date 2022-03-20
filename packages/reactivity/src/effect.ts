export let activeEffect = undefined

class ReactiveEffect {
  public active =  true
  public parent = null
  public deps = []
  constructor (public fn) {

  }
  run () {
    if (!this.active) {
      this.fn()
    }

    try {
      this.parent = activeEffect
      activeEffect = this
      return this.fn()
    } finally {
      activeEffect = this.parent
    }
    
  }
}

const targetMap = new WeakMap()
export function effect (fn) {
  const _effect = new ReactiveEffect(fn)
}


export function track (target, type, key) {
  if (!activeEffect) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  const shouldTrack = !dep.has(activeEffect)
  if (shouldTrack) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger (target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return
  const effects = depsMap.get(key)

  effects && effects.forEach(effect => {
    if (effect !== activeEffect) {
      effect.run()
    }
  });
}