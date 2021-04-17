import PropTypes from "prop-types"

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

const toPropTyped = (propType) => {
  return propType.required ? PropTypes[propType.type].isRequired : PropTypes[propType.type]
}

export default function typed(component, types) {
  component.propTypes = {}
  component.types = types

  for (let propType in types) {
    if(typeof propType.type === 'string' && !basicTypeList.includes(propType.type)) {
      throw new Error(`${propType.type} is not a valid prop-type. See allowed types at https://github.com/facebook/prop-types`)
    }
    if(propType.type.name && !advancedTypeList.includes(propType.type.name)) {
      throw new Error(`${propType.type} is not a valid prop-type. See allowed types at https://github.com/facebook/prop-types`)
    }
    /*
    * When it is a qualified basic type string
    */
    if(typeof propType.type === 'string') {
      component.propTypes[propType] = toPropTyped(types[propType])
      continue
    }

    /*
    * Handle advanced types
    */
    switch (propType.type.name) {
      case 'arrayOf': {
        const propTyped = propType.params.map(paramType => toPropTyped(types[paramType]))
        component.propTypes[propType] = PropTypes[types[propType.type]](...propTyped)
        break
      }
      case 'exact': {
        const propTyped = propType.params.map(paramType => toPropTyped(types[paramType]))
        component.propTypes[propType] = PropTypes[types[propType.type]](...propTyped)
        break
      }
      case 'instanceOf': {
        component.propTypes[propType] = PropTypes[types[propType.type]](...propType.params)
        break
      }
      case 'objectOf': {
        const propTyped = propType.params.map(paramType => toPropTyped(types[paramType]))
        component.propTypes[propType] = PropTypes[types[propType.type]](...propTyped)
        break
      }
      case 'oneOf': {
        component.propTypes[propType] = PropTypes[types[propType.type]](...propType.params)
        break
      }
      case 'oneOfType': {
        const propTyped = propType.params.map(paramType => toPropTyped(types[paramType]))
        component.propTypes[propType] = PropTypes[types[propType.type]](...propTyped)
        break
      }
      case 'shape': {
        const propTyped = propType.params.map(paramType => toPropTyped(types[paramType]))
        component.propTypes[propType] = PropTypes[types[propType.type]](...propTyped)
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
