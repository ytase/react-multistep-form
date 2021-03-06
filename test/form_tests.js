import React from 'react'
import expect from 'expect'
import enzymify from 'expect-enzyme'
import { MultiStepForm } from '../module/form'
import { Step } from '../module/step'
import { shallow } from 'enzyme'

expect.extend(enzymify())

const BasicForm = () => <form></form>

const BasicComponent = (props) => props.children

describe('MultiStepForm component', () => {
	it('should only return the current step', () => {
		const wrapper = shallow(<MultiStepForm>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.find(Step).length).toBe(1)
		expect(wrapper).toBeA(Step)
	})

	it('should render the first step if there is no initial value', () => {
		const wrapper = shallow(<MultiStepForm>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.prop('name')).toBe('email')
		expect(wrapper).toBeA(Step)
	})

	it('should render the right step if there an initial value', () => {
		const wrapper = shallow(<MultiStepForm initialStep="password">
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.prop('name')).toBe('password')
		expect(wrapper).toBeA(Step)
	})

	it('should not return anything if the step doesn\'t match any of the children', () => {
		const wrapper = shallow(<MultiStepForm initialStep="phone">
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.children()).toNotExist()
	})

	it('should return the right component if provided', () => {
		const wrapper = shallow(<MultiStepForm component={BasicComponent}>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper).toBeA(BasicComponent)
		expect(wrapper.children().length).toBe(1)
		expect(wrapper.childAt(0)).toBeA(Step)
	})
})

describe('MultiStepForm interaction', () => {
	it('should handle changing the values from the form', () => {
		const wrapper = shallow(<MultiStepForm initialState={{email: null}}>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.prop('context')).toIncludeKey('changeValue')
		wrapper.prop('context').changeValue('email', 'gourlaouen.mikael@gmail.com')
		expect(wrapper.state('formState')).toInclude({email: 'gourlaouen.mikael@gmail.com'})
		expect(wrapper.prop('context')).toInclude({formState: {email: 'gourlaouen.mikael@gmail.com'}})
	})

	it('should handle changing the step', () => {
		const wrapper = shallow(<MultiStepForm initialStep="email" initialState={{email: null}}>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.prop('name')).toBe('email')
		expect(wrapper.prop('context')).toIncludeKey('goToStep')
		wrapper.prop('context').goToStep('password')
		expect(wrapper.prop('name')).toBe('password')
	})

	it('should handle dynamically set children to add/remove steps', () => {
		const wrapper = shallow(<MultiStepForm>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		expect(wrapper.state('steps')).toEqual(['email', 'password'])
		wrapper.setProps({children: [<Step name="phone" component={BasicForm} />]})
		expect(wrapper.state('steps')).toEqual(['phone'])
	})
})

describe('MultiStepForm events handler', () => {
	it('onChange should be triggered when a value is changed', () => {
		let lastState = {}
		const onChange = (newState) => lastState = newState
		const wrapper = shallow(<MultiStepForm onChange={onChange}>
			<Step name="email" component={BasicForm} />
			<Step name="password" component={BasicForm} />
		</MultiStepForm>)

		wrapper.setState({ formState: {password: 'qwerty'} })
		expect(lastState).toEqual({password: 'qwerty'})
	})

	it('onStepChange should be triggered when the step is changed', () => {
		let lastStep = 'email'
		const onStepChange = newStep => lastStep = newStep
		const wrapper = shallow(<MultiStepForm onStepChange={onStepChange}>
				<Step name="email" component={BasicForm} />
				<Step name="password" component={BasicForm} />
			</MultiStepForm>)
		wrapper.setState({ currentStep: 'password' })
		expect(lastStep).toBe('password')
	})
})