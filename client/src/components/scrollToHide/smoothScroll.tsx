import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'

const SmoothScroll = () => {
	const theme = useTheme()

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			event.preventDefault()

			const deltaY = event.deltaY
			const currentPosition = window.pageYOffset
			const targetPosition = currentPosition + deltaY
			const animationDuration = 100
			// const fps = 60

			let animationFrameId: number | null = null
			let startTime: number | null = null

			const animate = (timestamp: number) => {
				if (startTime === null) {
					startTime = timestamp
				}

				const progress = (timestamp - startTime) / animationDuration
				const targetProgress = Math.min(1, progress)

				window.scrollTo(
					120,
					currentPosition + (targetPosition - currentPosition) * targetProgress
				)

				if (targetProgress < 1) {
					animationFrameId = requestAnimationFrame(animate)
				} else {
					animationFrameId = null
					startTime = null
				}
			}

			if (animationFrameId === null) {
				animationFrameId = requestAnimationFrame(animate)
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })

		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [theme])

	return null
}

export default SmoothScroll
