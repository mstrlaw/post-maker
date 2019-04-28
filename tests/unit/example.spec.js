import { shallowMount } from '@vue/test-utils'

describe('FakeTest', () => {
  const value = 'fake-test'
  test('accepts initial value', () => {
    expect(value).toMatch(value)
  })
})
