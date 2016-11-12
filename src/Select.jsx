import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import cx from 'classnames'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || null,
      label: null,
      isOpen: false,
    }

    this.handleShow = this.handleShow.bind(this)
    this.hide = this.hide.bind(this)
    this.move = this.move.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.move)
    document.removeEventListener('click', this.hide)
  }

  getCurrentIndex() {
    return _.findIndex(this.props.options, { value: this.state.value })
  }

  handleSelect(item) {
    this.setState({
      value: item.value,
      label: item.label,
    })

    if (this.props.onChange) {
      this.props.onChange.bind(this)(item)
    }
  }

  scrollIntoView() {
    if (this.activeDOMRef) {
      this.activeDOMRef.scrollIntoView()
    }
  }

  selectNext() {
    const next = this.props.options[this.getCurrentIndex() + 1]

    if (next) {
      this.setState({
        value: next.value,
      })
    }
  }

  selectPrev() {
    const prev = this.props.options[this.getCurrentIndex() - 1]

    if (prev) {
      this.setState({
        value: prev.value,
      })
    }
  }

  move(e) {
    e.preventDefault()
    e.stopPropagation()

    this.scrollIntoView()

    switch (e.keyCode) {
      case 40:
        this.selectNext(e)
        break
      case 38:
        this.selectPrev(e)
        break
      case 13:
        this.hide()
        break
      default:
    }
  }

  handleShow() {
    if (this.props.disabled === true) {
      return
    }

    this.setState({
      isOpen: true,
    }, () => {
      this.scrollIntoView()
    })

    if (this.props.onOpen) {
      this.props.onOpen.call(this)
    }

    document.addEventListener('click', this.hide)
    document.addEventListener('keydown', this.move)
  }

  hide() {
    this.setState({
      isOpen: false,
    })

    if (this.props.onClose) {
      this.props.onClose.call(this)
    }

    document.removeEventListener('click', this.hide)
    document.removeEventListener('keydown', this.move)
  }

  renderOption(option, i) {
    if (option.disabled) {
      return null
    }

    const { value } = this.state
    const handleSelect = this.handleSelect.bind(this, option)
    const isSelected = value === option.value
    const DOMReference = (ref) => {
      if (isSelected) {
        this.activeDOMRef = ref
      }
    }

    const optionClass = cx('option', { selected: isSelected })
    return (
      <div key={`option-${i}`} onClick={handleSelect} className={optionClass} ref={DOMReference}>
        <span>{option.label}</span>
      </div>
    )
  }

  renderOptions() {
    if (this.props.disabled === true) {
      return null
    }

    return this.props.options.map(this.renderOption.bind(this))
  }

  renderLabel() {
    if (!this.state.value) {
      return this.props.placeholder
    }

    return _.find(this.props.options, { value: this.state.value }).label
  }

  render() {
    const containerClass = cx('container', {
      show: this.state.isOpen,
      disabled: this.props.disabled,
    })

    return (
      <div className={containerClass}>
        <div className="display" onClick={this.handleShow}>
          <span>{this.renderLabel()}</span>
        </div>
        <div className="list">
          <div>
            {this.renderOptions()}
          </div>
        </div>
      </div>
    )
  }
}

Select.defaultProps = {
  placeholder: 'Select',
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
}

export default Select
