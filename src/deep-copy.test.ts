import deepCopy from './deep-copy'

const deepObject = {
  foo: 1,
  bar: {
    foo: {
      foo: [0, 1, 2],
      bar: {
        foo: {
          foo: true,
          bar: ['foo', 'bar'],
        },
      },
    },
  },
}

describe('deepCopy', () => {
  test('引数と値が同じオブジェクトを返す', () => {
    expect(deepCopy(deepObject)).toEqual(deepObject)
  })
  test('引数と参照が異なるオブジェクトを返す', () => {
    expect(deepCopy(deepObject)).not.toBe(deepObject)
  })
})
