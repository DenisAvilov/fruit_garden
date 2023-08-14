import { Slide, useScrollTrigger } from '@mui/material'
import React from 'react'

interface Props {
	window?: () => Window
	children: React.ReactElement
	threshold?: number
}

const ScrollToHide01 = (props: Props) => {
	const { window, threshold, children } = props
	const trigger = useScrollTrigger({
		// disableHysteresis: true,
		// threshold: threshold,
		target: window ? window() : undefined,
	})

	if (!children || trigger) {
		return null
	}
	return (
		<Slide appear={false} direction='down' in={!trigger}>
			<div>{children}</div>
		</Slide>
	)
}

export default ScrollToHide01
