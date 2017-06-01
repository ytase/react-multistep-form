import React from 'react'
import { Step } from './step'


const getStepsFromChildren = children => {
	return React.Children.map(children, child => child.type === Step ? child.props.name || null : null).filter(value => value !== null)
}


class MultiStepForm extends React.Component {
	constructor(props) {
		super(props)
		const steps = getStepsFromChildren(props.children)
		this.state = {
			currentStep: props.initialStep || steps[0],
			stepHistory: props.initialEntries,
			formState: props.initialState,
			steps,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.children !== this.props.children) {
			this.setState({ steps: getStepsFromChildren(nextProps.children) })
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.props.onChange && nextState.formState !== this.state.formState) {
			this.props.onChange(nextState.formState)
		}
	}

	handleChangeValue(key, value) {
		const formState = Object.assign({}, this.state.formState, {[key]: value})
		this.setState({ formState })
	}

	handleChangeStep(step) {
		if (this.state.steps.indexOf(step) > -1) {
			this.setState({ currentStep: step })
		}
		else {
			console.error(`Step ${step} was not found among the children.`)
		}
	}

	stepProperties() {
		return {
			steps: {
				current: this.state.currentStep,
				history: this.state.stepHistory,
				all: this.state.steps,
			},
			formState: this.state.formState,
			changeValue: this.handleChangeValue.bind(this),
			goToStep: this.handleChangeStep.bind(this),
		}
	}

	render() {
		const children = React.Children.toArray(this.props.children)
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			if (child.type === Step && child.props.name === this.state.currentStep) {
				return React.cloneElement(child, {context: this.stepProperties()})
			}
		}
		return null
	}
}

MultiStepForm.defaultProps = {
	initialState: {},
	initialEntries: [],
	initialStep: null,
	onChange: null,
}


export { MultiStepForm }