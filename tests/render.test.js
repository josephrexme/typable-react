import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TestComponent } from './component.test'

describe('typable default renders', () => {
  it('renders default values through typed', () => {
    render(
      <TestComponent
      count={10}
      activities={['brocolli', 'steak']}
      >
      . The content.
      </TestComponent>
    )
    expect(screen.getByTestId('root')).toHaveTextContent(`
    Hello John Doe, 10 of the people at the party last night ate muffins. It is a good day today! I tell myself the glass is Now let's cook these things: brocolli,steak,. The content. My dog has a subtle bark.
    `.trim())
  })
})
