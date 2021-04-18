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

  describe('advanced types methods', () => {
    it('has arrayOf method', () => {
      expect(typed.arrayOf(typed.string)).toEqual({
        name: 'arrayOf',
        params: 'string'
      })
    })

    it('has objectOf method', () => {
      expect(typed.objectOf(typed.string)).toEqual({
        name: 'objectOf',
        params: 'string'
      })
    })

    it('has instanceOf method', () => {
      expect(typed.instanceOf(String)).toEqual({
        name: 'instanceOf',
        params: String
      })
    })

    it('has oneOf method', () => {
      expect(typed.oneOf(['one', 'two'])).toEqual({
        name: 'oneOf',
        params: ['one', 'two']
      })
    })

    it('has oneOfType method', () => {
      expect(typed.oneOfType([typed.string, typed.number])).toEqual({
        name: 'oneOfType',
        params: ['string', 'number']
      })
    })

    it('has exact method', () => {
      expect(typed.exact({
        firstProperty: typed.string,
        secondProperty: typed.number
      })).toEqual({
        name: 'exact',
        params: {
          firstProperty: 'string',
          secondProperty: 'number'
        }
      })
    })

    it('has shape method', () => {
      expect(typed.shape({
        firstProperty: typed.string,
        secondProperty: typed.number,
        thirdProperty: typed.instanceOf(String)
      })).toEqual({
        name: 'shape',
        params: {
          firstProperty: 'string',
          secondProperty: 'number',
          thirdProperty: { name: 'instanceOf', params: String }
        }
      })
    })
  })

})

