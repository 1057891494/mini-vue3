import { reactive } from '../reactive'
import { effect } from '../effect'

it('init', () => {
  const a = reactive({ a: 1 })
  expect(a.a).toBe(1)
  let b
  effect(() => {
    b = a.a + 1
  })
  expect(b).toBe(2)
  a.a = 2
  expect(a.a).toBe(2)
  expect(b).toBe(3)
})