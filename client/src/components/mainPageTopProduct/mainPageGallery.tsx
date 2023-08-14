import { styled } from '@mui/material'
import { useState, useEffect, useRef, MouseEvent } from 'react'
import classes from './mainPageGallery.module.scss'
import TitlebarImageList from '../overflow/overflowTopY'
import AnimeSound from '../buttunAnime/animeSound'

type CustomProps = {
	children?: React.ReactNode
}

const WarperDiv = styled('div')(({ theme }) => ({
	position: 'fixed',
	borderLeft: '2px solid #000000',
	right: '118px',
	top: 0,
	bottom: 0,
	width: 0,
	zIndex: 2,
	'&:hover': {
		// borderRight: `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
	},
	// 	 @media (min-height: 768px) {
	//    height: 80vh;
	//    /* for screens with height >= 768px */
	//  }

	//  @media (min-height: 1024px) {
	//    height: 60vh;
	//    /* for screens with height >= 1024px */
	//  }
}))

const WarperGallery = ({ children }: CustomProps) => {
	return <WarperDiv>{children}</WarperDiv>
}

function OpenWrapSlider(): JSX.Element {
	const [openWrapSlider, setOpenWrapSlider] = useState(false)
	const sliderRef = useRef<HTMLDivElement>(null)

	function toggleWrapSlider() {
		setOpenWrapSlider((prevState) => !prevState)
	}

	return (
		<>
			<AnimeSound
				className={classes.iconButton}
				onMouseEnter={toggleWrapSlider}
			/>
			<div
				className={`${classes.wrapSlider} ${
					openWrapSlider ? classes.open : ''
				}`}
			>
				<TitlebarImageList onMouseLeave={toggleWrapSlider} />
			</div>
		</>
	)
}

export default function PageGallery({ children }: CustomProps) {
	return (
		<WarperGallery>
			<OpenWrapSlider />
			{children}
		</WarperGallery>
	)
}
