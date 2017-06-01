import React from 'react'

function Step({ component, name, context }) {
	return React.createElement(component, context)
}

export { Step }