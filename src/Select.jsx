import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import cx from 'classnames'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.getOptions(),
      value: this.getValue(),
      label: null,
      isOpen: false,
    }

    // index in array which represents filtered options based on first letter
    // FIXME: maybe more clear variable name
    this.activeLetterMapIndex = -1

    this.handleShow = this.handleShow.bind(this)
    this.hide = this.hide.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('click', this.hide)
  }

  onKeyDown(e) {
    e.preventDefault()
    e.stopPropagation()

    this.scrollIntoView()

    switch (e.keyCode) {
      case 40:
        this.selectNext()
        break
      case 38:
        this.selectPrev()
        break
      case 13:
        this.hide()
        break
      default:
        this.selectByLetter(e.keyCode)
    }
  }

  getOptions() {
    const firstOption = [{ label: this.props.placeholder, value: '', disabled: true }]

    return firstOption.concat(this.props.options)
  }

  getValue() {
    const { options, value } = this.props
    const active = _.find(options, { value })

    return active && active.locked ? '' : active.value
  }

  getCurrentIndex() {
    return _.findIndex(this.state.options, { value: this.state.value })
  }

  selectByLetter(keyCode) {
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57)) {
      const { options } = this.props

      if (this.lastKeyCode === keyCode) {
        const matchingLetterIndexesMap = []
        _.each(options, (option, i) => {
          if (option.label.toUpperCase().charCodeAt(0) === keyCode && !option.locked) {
            matchingLetterIndexesMap.push(i)
          }
        })

        if (matchingLetterIndexesMap.length === 0) {
          return
        }

        // means that user touched second time the same letter
        // so we're starting from second matching element
        if (this.activeLetterMapIndex === -1) {
          this.activeLetterMapIndex = 1
        }

        let selectedOption = options[matchingLetterIndexesMap[this.activeLetterMapIndex]]
        if (selectedOption) {
          this.activeLetterMapIndex = this.activeLetterMapIndex + 1
        } else {
          selectedOption = options[matchingLetterIndexesMap[0]]
          this.activeLetterMapIndex = 1
        }

        this.selectOptionAndScrollToView(selectedOption)
      } else {
        this.activeLetterMapIndex = -1

        const selectedOption = _.find(options, (option) => {
          const firstLetter = option.label[0]

          if (firstLetter.toUpperCase().charCodeAt(0) === keyCode && !option.locked) {
            return true
          }
          return false
        })

        if (selectedOption) {
          this.selectOptionAndScrollToView(selectedOption)
        }
      }
      this.lastKeyCode = keyCode
    }
  }

  handleSelect(item) {
    if (item.locked) {
      return
    }

    this.setState({
      value: item.value,
      label: item.label,
    })

    if (this.props.onChange) {
      this.props.onChange(item)
    }
  }

  scrollIntoView() {
    if (this.activeDOMRef) {
      this.activeDOMRef.scrollIntoView()
    }
  }

  selectOptionAndScrollToView(option) {
    const filtered = _.pick(option, ['label', 'value'])
    this.setState(filtered, () => this.scrollIntoView())
  }

  selectNext() {
    this.findNextOption(1)
  }

  selectPrev() {
    this.findNextOption(-1)
  }

  findNextOption(delta) {
    const { options } = this.state
    let nextIndex = this.getCurrentIndex() + delta

    while (options[nextIndex]) {
      if (!options[nextIndex].locked && !options[nextIndex].disabled) {
        this.selectOptionAndScrollToView(options[nextIndex])
        break
      }
      nextIndex += delta
    }
  }

  handleShow() {
    if (this.props.disabled === true) {
      return
    }

    this.setState({
      isOpen: true,
    }, () => this.scrollIntoView())

    if (this.props.onOpen) {
      this.props.onOpen.call(this)
    }

    document.addEventListener('click', this.hide)
    document.addEventListener('keydown', this.onKeyDown)
  }

  hide() {
    this.setState({
      isOpen: false,
    })

    if (this.props.onClose) {
      this.props.onClose.call(this)
    }

    document.removeEventListener('click', this.hide)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  renderOption(option, i) {
    if (option.disabled) {
      return null
    }

    const { value } = this.state
    const handleSelect = this.handleSelect.bind(this, option)
    const isSelected = (value === option.value && !option.locked)
    const DOMReference = (ref) => {
      if (isSelected) {
        this.activeDOMRef = ref
      }
    }

    const classNames = cx('option', {
      selected: isSelected,
      locked: option.locked,
    })

    return (
      <div key={`option-${i}`} onClick={handleSelect} className={classNames} ref={DOMReference}>
        <span>{option.label}</span>
      </div>
    )
  }

  renderOptions() {
    if (this.props.disabled === true) {
      return null
    }

    return this.state.options.map(this.renderOption.bind(this))
  }

  renderLabel() {
    return _.find(this.state.options, { value: this.state.value }).label
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
  options: [],
  value: '',
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    disabled: PropTypes.bool,
    locked: PropTypes.bool,
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
