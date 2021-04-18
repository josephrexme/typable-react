import React from 'react'
import typed from '../typable'

export const TestComponent = ({
  name,
  count,
  isHappy,
  mindset,
  activities,
  animal,
  children,
}) => {
  return (
    <div data-testid="root">
      <h1>Hello {name}, </h1>
      <p>{count} of the people at the party last night ate muffins. </p>
      {
        isHappy ? (
          <p>It is a good day today! </p>
        ) : (
          <p>It is just another day </p>
        )
      }
      <p>I tell myself the glass is {mindset}</p>
      <p>Now let's cook these things: </p>
      <ul>
        {activities.map(activity => (
          <li key={activity}>{activity},</li>
        ))}
      </ul>
      {children}
      <p> My {animal.identity} has a subtle {animal.sound}.</p>
    </div>
  )
}

typed(TestComponent, {
  name: {
    type: typed.string,
    default: 'John Doe'
  },
  count: {
    type: typed.number,
    required: true
  },
  isHappy: {
    type: typed.bool,
    default: true,
    required: true,
  },
  mindset: {
    type: typed.oneOf(['half full', 'half empty'])
  },
  activities: {
    type: typed.arrayOf(typed.string)
  },
  animal: {
    type: typed.shape({
      identity: typed.string,
      sound: typed.string,
      age: typed.number
    }),
    default: { identity: 'dog', sound: 'bark' },
    description: 'The animal info'
  },
  children: {
    type: typed.oneOfType([
      typed.node,
      typed.array,
      typed.string,
      typed.instanceOf(String)
    ])
  }
})

describe('typed()', () => {
  it('has accurate types object', () => {
    expect(TestComponent.types).toEqual({
      name: {
        type: 'string',
        default: 'John Doe'
      },
      count: {
        type: 'number',
        required: true
      },
      isHappy: {
        type: 'bool',
        default: true,
        required: true
      },
      mindset: {
        type: {
          name: 'oneOf',
          params: ['half full', 'half empty']
        }
      },
      activities: {
        type: {
          name: 'arrayOf',
          params: 'string'
        }
      },
      animal: {
        type: {
          name: 'shape',
          params: {
            identity: 'string',
            sound: 'string',
            age: 'number'
          }
        },
        default: { identity: 'dog', sound: 'bark' },
        description: 'The animal info'
      },
      children: {
        type: {
          name: 'oneOfType',
          params: [
            'node',
            'array',
            'string',
            { name: 'instanceOf', params: String }
          ]
        }
      },
    })
  })

  it('has accurate default props', () => {
    expect(TestComponent.defaultProps).toEqual({
      name: 'John Doe',
      isHappy: true,
      animal: { identity: 'dog', sound: 'bark' },
    })
  })
})