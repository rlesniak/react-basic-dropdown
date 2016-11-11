import React, { Component } from 'react'
import Select from './Select'

export default class Example extends Component {
  constructor(props) {
    super(props)

    this.handleValueChange = this.handleValueChange.bind(this)
  }

  handleValueChange(val) {
    console.log('change', val, this)
  }

  render() {
    const options = [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 },
      { label: 'Option 4', value: 4 },
      { label: 'Option 5', value: 5 },
      { label: 'Option 6', value: 6 },
      { label: 'Option 7', value: 7 },
      { label: 'Option 8', value: 8 },
    ]

    return (
      <Select
        options={options}
        onChange={this.handleValueChange}
      />
    )
  }
}
