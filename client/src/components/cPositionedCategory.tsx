import * as React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import theme from '@/theme'
import Link from './../components/cCustomLink'

export default function PositionedCategory() {
	const pages = [
		{
			category: '🍏 Пастела',
			src: '/test',
		},
		{
			category: '🍢  Зефір',
			src: '/test',
		},
		{
			category: '🍌  Снеки',
			src: '/test',
		},
	]

	return (
		<div>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{pages.map((page) => (
					<Link href={page.src} key={page.category}>
						<Button
							sx={{
								my: 2,
								color: `${theme.palette.text.primary}`,
								display: 'block',
								'&:hover': {
									backgroundColor: `${theme.palette.secondary.light}`,
								},
							}}
						>
							{page.category}
						</Button>
					</Link>
				))}
			</Box>
		</div>
	)
}
