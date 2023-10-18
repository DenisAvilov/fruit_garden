import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material'
import React from 'react'
import style from './cardsProducts.module.scss'
import theme from '@/theme'
import { useRouter } from 'next/router'
import basketClient from './../../pages/api/basket/basket'

function MediaCard(props: any) {
	const { id, name, description, price, userID } = props

	const router = useRouter()

	const productPage = (id?: number) => {
		// router.push(`${router.route}/${id}`)
		// router.push(`${router.route}/${id}`)
		if (router.asPath === '/') {
			router.push(`/categories/${id}`)
		}
		if (router.asPath == '/lending') {
			router.push(`/categories/${id}`)
		}
		if (router.asPath == '/categories') {
			router.push(`/categories/${id}`)
		}
	}

	return (
		<Card
			key={id}
			sx={{
				transform: 'scale(1.01)',
				transition: 'all 0.2s ease-out',
				minHeight: '200px',
				display: 'flex',
				flexDirection: 'column',
				paddingBottom: '15px',

				'&:hover': { boxShadow: '0 0 1em 0px rgba(0, 0, 0, 0.4)' },
			}}
		>
			<CardMedia
				sx={{
					objectFit: 'fill',
					height: '170px',
				}}
				image='/product/zefir_tree.jpeg'
				title={name}
			/>
			<CardContent
				// component={'a'}
				// href={`/` + id}
				onClick={() => productPage(id)}
				sx={{
					cursor: 'pointer',

					textDecoration: 'none',
					color: `${theme.palette.secondary.dark}`,
				}}
			>
				<Typography
					gutterBottom
					fontWeight={700}
					height={'45px'}
					overflow={'hidden'}
					align='center'
					variant='body1'
					marginBottom={'10px'}
				>
					{name}
				</Typography>
				<Typography
					variant='body2'
					color='text.secondary'
					marginBottom={2}
					height={'100px'}
					overflow={'hidden'}
				>
					{description}
				</Typography>

				<Typography variant='body2' align='center' color='text.secondary'>
					<span className={style.costIcon}>&#x20b4;</span>
					<span className={style.cost}>{price}</span>
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					margin: 'auto',
				}}
			>
				<Button
					variant='contained'
					sx={{ fontSize: '0.7rem' }}
					onClick={() => {
						basketClient.addBasket(id, 2)
					}}
				>
					В корзину
				</Button>
				<Button
					variant='contained'
					sx={{ fontSize: '0.7rem' }}
					onClick={() => productPage(id)}
				>
					Детально
				</Button>
			</CardActions>
		</Card>
	)
}

const CardCustom: React.FC = () => {
	const products = [{ item: 1, index: 2 }]

	return (
		<>
			<Grid
				container
				spacing={{ xs: 2, md: 2 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{products.map((item, index) => (
					<Grid
						item
						xs={2}
						sm={4}
						md={3}
						key={index}
						sx={{ alignItems: 'stretch' }}
					>
						<MediaCard
							id={1}
							name={'item.name'}
							description={'item.description'}
							price={'item.price'}
							userID={1}
						/>
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default CardCustom
