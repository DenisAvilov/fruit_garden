import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Icon,
	Stack,
	Typography,
} from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles'
import React from 'react'
import Paper from '@mui/material/Paper'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import style from './cardsProducts.module.scss'

function MediaCard() {
	return (
		<Card
			sx={{
				maxWidth: 345,
				transform: 'scale(1.01)',
				transition: 'all 0.2s ease-out',
				marginBottom: '70px',
				paddingBottom: '15px',
				'&:hover': { boxShadow: '0 0 4em 0px rgba(0, 0, 0, 0.4)' },
			}}
		>
			<CardMedia
				sx={{
					cursor: 'pointer',
					objectFit: 'fill',
					height: '200px',
					width: 'auto',
				}}
				image='/product/zefir_tree.jpeg'
				title='Зефір слівочний'
			/>
			<CardContent>
				<Typography
					gutterBottom
					fontWeight={500}
					align='center'
					variant='h5'
					component='div'
				>
					Зефір
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>

				<Typography variant='body2' align='center' color='text.secondary'>
					<span className={style.costIcon}>&#x20b4;</span>{' '}
					<span className={style.cost}>300</span>
				</Typography>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Button variant='contained'>В корзину</Button>
				<Button variant='outlined'>Детально</Button>
			</CardActions>
		</Card>
	)
}

type Props = {
	item: number
}

const CardCustom: React.FC<Props> = ({ item }: Props) => {
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.primary,
	}))

	return (
		<>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{Array.from(Array(item)).map((_, index) => (
					<Grid item xs={2} sm={4} md={4} key={index}>
						<MediaCard />
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default CardCustom

// <div className={`${style.cardBody}`}>
// 					<div className='line'>TEXT LINE LINE</div>
// 					<div style={{ textAlign: 'right' }}>Text textAlign: right</div>
// 				</div>
