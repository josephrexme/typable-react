import PropTypes from "prop-types"

const mapValues = (object, callback) => {
  const newObject = {}
  for(let item in object) {
    newObject[item] = callback(object[item])
  }
  return newObject
}

const basicTypeList = [
  'any',
  'array',
  'bool',
  'element',
  'elementType',
  'func',
  'node',
  'number',
  'object',
  'string',
  'symbol',
]

const advancedTypeList = [
  'arrayOf',
  'exact',
  'instanceOf',
  'objectOf',
  'oneOf',
  'oneOfType',
  'shape',
]

const toPropTyped = (propType, required = false, params = null) => {
  if(!propType.name) {
    return required ? PropTypes[propType].isRequired : PropTypes[propType]
  }
  if(required) {
    return PropTypes[propType.name](params ?? propType.params).isRequired
  }
  return PropTypes[propType.name](params ?? propType.params)
}

export default function typed(component, types) {
  component.propTypes = {}
  component.defaultProps = {}
  component.types = types

  for (let propType in types) {
    if(typeof propType.type === 'string' && !basicTypeList.includes(propType.type)) {
      throw new Error(`${propType.type} is not a valid prop-type. See allowed types at https://github.com/facebook/prop-types`)
    }
    if(types[propType].type.name && !advancedTypeList.includes(types[propType].type.name)) {
      throw new Error(`${propType.type} is not a valid prop-type. See allowed types at https://github.com/facebook/prop-types`)
    }

    /*
    * Set default prop
    */
   if(typeof types[propType].default) {
     component.defaultProps[propType] = types[propType].default
   }

    /*
    * When it is a qualified basic type string
    */
    if(typeof types[propType].type === 'string') {
      component.propTypes[propType] = toPropTyped(types[propType].type, types[propType].required)
      continue
    }

    /*
    * Handle advanced types
    */
    switch (types[propType].type.name) {
      case 'arrayOf': {
        component.propTypes[propType] = PropTypes.arrayOf(toPropTyped(types[propType].type.params))
        break
      }
      case 'exact': {
        const propTypedParams = mapValues(types[propType].type.params, v => toPropTyped(v))
        component.propTypes[propType] = PropTypes.exact(propTypedParams)
        break
      }
      case 'instanceOf': {
        component.propTypes[propType] = PropTypes.instanceOf(types[propType].type.params)
        break
      }
      case 'objectOf': {
        component.propTypes[propType] = PropTypes.objectOf(toPropTyped(types[propType].type.params))
        break
      }
      case 'oneOf': {
        component.propTypes[propType] = PropTypes.oneOf(types[propType].type.params)
        break
      }
      case 'oneOfType': {
        const propTypedParams = types[propType].type.params.map(param => toPropTyped(param))
        component.propTypes[propType] = PropTypes.oneOfType(propTypedParams)
        break
      }
      case 'shape': {
        const propTypedParams = mapValues(types[propType].type.params, v => toPropTyped(v))
        component.propTypes[propType] = PropTypes.shape(propTypedParams)
        break
      }
      default: {
        break
      }
    }

  }
}

basicTypeList.forEach(type => {
  typed[type] = type
})

advancedTypeList.forEach(type => {
  typed[type] = params => ({
    name: type,
    params
  })
})
