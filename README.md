# React Basic Dropdown
[![Build Status](https://travis-ci.org/rlesniak/react-basic-dropdown.svg?branch=master)](https://travis-ci.org/rlesniak/react-basic-dropdown) [![npm version](https://badge.fury.io/js/react-basic-dropdown.svg)](https://badge.fury.io/js/react-basic-dropdown)

The minimal and simple React dropdown.

## Installation

```shell
yarn add react-basic-dropdown
```
or
```shell
npm install react-basic-dropdown --save
```

## Basic Usage
```js
import Select from 'react-basic-dropdown'
// to have default stylesheets. Optional
import 'react-basic-dropdown/dist/styles.css'

class Example extends Component {
  handleValueChange(option) {
    console.log('change', option)
  }

  render() {
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Another option', value: 2 },
    ]

    return (
      <Select
        value={2}
        options={options}
        onChange={this.handleValueChange}
      />
    )
  }
}
```

## TODO:
  - This readme
  - More configuration options
