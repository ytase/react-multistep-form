# react-multistep-form

## Installation

Requirements: tested with React 15.5.

To install the library, just run `yarn add react-multistep-form` (or `npm install --save react-multistep-form`).

## Usage

## MultiStepForm

`MultiStepForm` is the main component for the form. All its children MUST be `Step` components. Any other child will not be rendered. No parameter is required for MultiStepForm but it accepts several optional parameters:
- `initialStep`: the first step to display before any user interaction. If `null`, the first step in order of appearance will be selected. Default: `null`
- `component`: a custom component that you want to use for the layout of the form. Useful for instance to show the progress in the form or providing back  buttons etc. If not provided, the steps will just be rendered without any wrapper.
- `initialState`: the initial values for the form. Default: `{}`
- `onChange`: a function that will be called when any value in the form changes, with an object containing all the keys and values as a unique parameter. Default: `null`

## Step

The `Step` component has two parameters, both required:
- `name`: a unique identifier for this step
- `component`: the React component to render when the step is active. The React component will receive props from`the form when rendered (see below).

## Properties injected to the components

The `Step` component injects several properties to its `component`, so that you can use current values from the main form. THose properties are:

- `steps`: an object containing:
  - current: the name of the current step
  - all: an array containing the names of all the steps for this form, in the right order
- `formState`: an object containing the current keys and values for the form. Ex: `{email: 'john@doe.com'}`
- `changeValue`: the function you should call to change a value in the form. Use it this way: `changeValue(key, value)`
- `goToStep`: the function you should call to change the current step. You can use it to go back to the first one, previous, next or any other step you think is useful.
