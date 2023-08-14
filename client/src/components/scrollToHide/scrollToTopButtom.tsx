import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
// import { makeStyles } from '@mui/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

// const useStyles = makeStyles({
// 	root: {
// 		position: 'fixed',
// 		bottom: '10px',
// 		right: '10px',
// 		zIndex: 9999,
// 	},
// })

const ScrollToTopButton = () => {
	// const classes = useStyles()
	const [showButton, setShowButton] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > 100) {
				setShowButton(true)
			} else {
				setShowButton(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleClick = () => {
		const scrollToTop = () => {
			const c = document.documentElement.scrollTop || document.body.scrollTop
			if (c > 0) {
				window.requestAnimationFrame(scrollToTop)
				window.scrollTo(0, c - c / 8)
			}
		}
		scrollToTop()
	}

	return (
		<Box>
			{showButton && (
				<Button
					variant='contained'
					color='primary'
					// className={classes.root}
					onClick={handleClick}
				>
					<KeyboardArrowUpIcon />
				</Button>
			)}
		</Box>
	)
}

export default ScrollToTopButton
