import AppMenu from '@/components/navigation/appMenu'
import CardCustom from '@/components/card/cardsProducts'
import IconMenu from '@/components/navigation/category'
import { Container, Grid } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import theme from '@/theme'

const Categories: React.FC = () => {
	const dispatch = useDispatch()

	return (
		<>
			<Container
				maxWidth='lg'
				sx={{
					position: 'relative',
					zIndex: 2,
					paddingBottom: '40px',
				}}
			>
				<AppMenu sx={{ position: 'relative' }} />
				<Grid
					container
					justifyContent={'space-between'}
					sx={{ flexWrap: 'nowrap', paddingTop: 2 }}
				>
					<Grid item xs={2} md={2} lg={2} sx={{ marginRight: '20px' }}>
						<IconMenu />
					</Grid>
					<Grid item xs={8} md={8} lg={10}>
						<CardCustom />
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default Categories
