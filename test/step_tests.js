import React from 'react'
import expect from 'expect'
import enzymify from 'expect-enzyme'
import { Step } from '../module/step'
import { shallow } from 'enzyme'

expect.extend(enzymify())

const BasicForm = () => <form></form>

describe('Step Component', () => {
	it('Should inject the right properties to the component', () => {
		const context = {
			steps: {
				current: 'email',
				all: ['password', 'email'],
			},
			formState: {
				email: 'john@doe.com'
			},
			changeValue: () => true,
			goToStep: () => true
		}
		const wrapper = shallow(<Step component={BasicForm} context={context} name="email" />)
		expect(wrapper.props()).toIncludeKeys(['steps', 'formState', 'changeValue', 'goToStep'])
		expect(wrapper.prop('formState')).toEqual({email: 'john@doe.com'})
	})
})