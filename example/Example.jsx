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
      { label: 'asdasd 1', value: 2 },
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
