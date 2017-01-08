import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Select from '../src/Select'

describe('<Select/>', () => {
  const defProps = {
    options: [
      { label: 'Value', value: 1 },
      { label: 'Option', value: 2 },
    ]
  }

  it('renders proper number of options', () => {
    const wrapper = mount(<Select {...defProps} />)
    wrapper.find('.display').simulate('click')
    expect(wrapper.find('.option')).to.have.length(2)
  })

  it('shows dropdown on click', () => {
    const wrapper = mount(<Select {...defProps} />)
    wrapper.find('.display').simulate('click')

    expect(wrapper.state().isOpen).to.equal(true)
    expect(wrapper.find('.container').hasClass('show')).to.equal(true)
  })

  describe('placeholder', () => {
    it('sets placeholder', () => {
      const props = {
        ...defProps,
        placeholder: 'placeholder',
      }
      const wrapper = shallow(<Select {...props} />)

      expect(wrapper.find('.display span').text()).to.equal('placeholder')
    })

    it('uses default placeholder', () => {
      const wrapper = shallow(<Select {...defProps} />)

      expect(wrapper.find('.display span').text()).to.equal('Select')
    })
  })

  describe('when default value passed to component', () => {
    const props = {
      ...defProps,
      value: 2,
    }

    it('higlights selected value', () => {
      const wrapper = shallow(<Select {...props} />)
      wrapper.find('.display').simulate('click')

      expect(wrapper.find('.option.selected')).to.have.length(1)
      expect(wrapper.find('.option.selected').text()).to.equal('Option')
    })

    it('displays selected value as placeholder', () => {
      const wrapper = shallow(<Select {...props} />)

      expect(wrapper.find('.display span').text()).to.equal('Option')
    })
  })
})
