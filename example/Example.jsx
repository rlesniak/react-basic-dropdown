import React, { Component } from 'react'
import Select from '../src/Select'
import '../src/styles.scss'

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
      { label: 'Another option', value: 2 },
      { label: 'Best option', value: 3 },
      { label: 'Awesome option', value: 4 },
      { label: 'Yolo option', value: 5 },
      { label: 'Better option', value: 6 },
      { label: 'Big option', value: 7 },
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
