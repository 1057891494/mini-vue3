export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

let activeEffect
const targetMap = new Map()
export function track(target, key) {
  let keyMap = targetMap.get(target)
  if (!keyMap) { 
    keyMap = new Map()
    targetMap.set(target, keyMap)
  }
  let depSet = keyMap.get(key)
  if (!depSet) { 
    depSet = new Set()
    keyMap.set(key, depSet)
  }
  if (activeEffect) {
    depSet.add(activeEffect)
  }
}

export function trigger(target, key, value) {
  const keyMap = targetMap.get(target)
  const depSet = keyMap.get(key)
  depSet.forEach(dep => dep.run())
}

class ReactiveEffect {
  private _fn
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
    activeEffect = null
  }
}