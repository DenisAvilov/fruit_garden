import * as React from 'react'
import { Box } from '@mui/system'
import Link from './cCustomLink'

import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
export default function FooterCategory() {
	const { pathname } = useRouter()
	const pages = [
		{
			name: 'Про нас',
			path: '/about',
		},
		{
			name: 'Контакти',
			path: '/contact',
		},
	]

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
				}}
			>
				{pages.map(({ path, name }) => (
					<Link
						href={path}
						key={name}
						style={path === pathname ? 'active' : 'none'}
						// className={path === pathname ? 'active' : 'none'}
					>
						<Typography variant='h6'>{name}</Typography>
					</Link>
				))}
			</Box>
			<Typography variant='h6'>
				Зефірна магія | {new Date().getFullYear()}
			</Typography>
		</Box>
	)
}
