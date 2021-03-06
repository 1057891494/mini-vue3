import { track, trigger } from './effect'

export function reactive(target) { 
  return new Proxy(target, {
    get(target, key) {
      track(target, key)
      const res = Reflect.get(target, key)
      return res
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      trigger(target, key, value)
      return value
    }
  })
}