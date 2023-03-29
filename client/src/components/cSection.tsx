import * as React from 'react'
import { Box } from '@mui/system'

interface Props {
	imagePath?: string
	backgroundColor?: string
	children?: React.ReactNode
	sx?: object
	afterBackgroundImage?: string
	className?: string
}

const CSection: React.FC<Props> = ({
	imagePath,
	backgroundColor,
	children,
	afterBackgroundImage,
	sx,
	className,
}) => {
	return (
		<Box
			component={'section'}
			className={className}
			sx={{
				position: 'relative',
				backgroundImage: `url(${imagePath})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundColor: { backgroundColor },
				backgroundPosition: 'center',
				minHeight: '100vh',

				// '&:after': {
				// 	position: 'absolute',
				// 	content: `' '`,
				// 	top: 0,
				// 	left: 0,
				// 	bottom: 0,
				// 	right: 0,
				// 	backgroundImage: `url(${afterBackgroundImage})`,
				// 	backgroundSize: 'cover',
				// 	backgroundRepeat: 'no-repeat',
				// 	backgroundPositionY: '-115px',
				// },
				...sx,
			}}
		>
			{children}
		</Box>
	)
}

export default CSection
