import typed from '../typable'

describe('Typable', () => {

  describe('basic types property constants', () => {
    it('has a string property', () => {
      expect(typed.string).toEqual('string')
    })
    it('has a number property', () => {
      expect(typed.number).toEqual('number')
    })
    it('has a bool property', () => {
      expect(typed.bool).toEqual('bool')
    })
    it('has a func property', () => {
      expect(typed.func).toEqual('func')
    })
    it('has a symbol property', () => {
      expect(typed.symbol).toEqual('symbol')
    })
    it('has a node property', () => {
      expect(typed.node).toEqual('node')
    })
    it('has an element property', () => {
      expect(typed.element).toEqual('element')
    })
    it('has an elementType property', () => {
      expect(typed.elementType).toEqual('elementType')
    })
    it('has an object property', () => {
      expect(typed.object).toEqual('object')
    })
    it('has an array property', () => {
      expect(typed.array).toEqual('array')
    })
    it('has an any property', () => {
      expect(typed.any).toEqual('any')
    })
  })

})

