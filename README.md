## Typable React

Typable is a [React PropTypes][1] wrapper that allows for easy extraction of your type metadata.

### WHY?
PropTypes is great for regular use but when building components that need to be documented, it
does not give any information about the prop types that can be easily extracted into the
documentation. Documentation tools currently use [react-docgen][2] or similar implementation
to extract by reading the entire source file to parse PropTypes syntax. This is not always straightforward to use as it may require raw loading components to be parsed as strings.

## Installation

```sh
npm i typable-react
```

## Usage

```jsx
import typed from 'typable-react'

export default function MyComponent({ name, bananaCount }) {
  return <h1>Hello {name}, I ate {bananaCount} bananas</h1>
}

typed(MyComponent, {
  name: {
    type: typable.string,
    required: true,
    description: 'The name to be greeted'
  },
  bananaCount: {
    type: typable.number,
    description: 'The number of bananas I ate'
  },
})
```

[1]: https://github.com/facebook/prop-types
[2]: https://github.com/reactjs/react-docgen/
