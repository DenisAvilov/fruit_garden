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
import { height } from '@mui/system'
import theme from '@/theme'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectProduct } from '@/store/slice/productSlice'
import { selectUserData } from '@/store/slice/authSlice'
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

type Props = {
	item: number
}

const CardCustom: React.FC = () => {
	const products = useSelector(selectProduct)
	const userID = useSelector(selectUserData)

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
							id={item.id}
							name={item.name}
							description={item.description}
							price={item.price}
							userID={userID}
						/>
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default CardCustom
// Array.from(Array(item))

const itemsProduct = [
	{
		id: 1,
		name: 'Класичний зефір',
		description:
			"це ідеальний вибір для любителів традиційного зефіру. Цей зефір має м'яку та повітряну текстуру, а також солодкий смак, який точно сподобається всім.",
		price: '220 ',
	},
	{
		id: 2,
		name: "Зефір з м'ятою та лимоном",
		description:
			"це відмінний вибір для тих, хто любить освіжаючі та яскраві смаки. Цей зефір містить натуральні екстракти м'яти та лимона, які додають йому освіжаючий та яскравий смак.",
		price: '225 ',
	},
	{
		id: 3,
		name: 'Зефір з ваніллю',
		description:
			'це ідеальний вибір для любителів ванільного смаку. Цей зефір містить натуральні екстракти ванілі, які додають йому ніжного та солодкого смаку.',
		price: '230 ',
	},
	{
		id: 4,
		name: 'Зефір з кокосовою стружкою',
		description:
			'це чудовий вибір для тих, хто любить екзотичні уподобання. Цей зефір покритий кокосовою стружкою, яка надає йому неповторного смаку і аромату.',
		price: '220 ',
	},
	{
		id: 5,
		name: "Зефір зі смаком м'яти",
		description:
			"це чудовий вибір для тих, хто любить свіжість м'яти. Цей зефір містить натуральні екстракти м'яти, які додають йому освіжаючий смак.",
		price: '215 ',
	},
	{
		id: 6,
		name: "Зефір із шоколадною глазур'ю",
		description:
			"це ідеальний вибір для любителів шоколаду. Цей зефір покритий шоколадною глазур'ю, яка надає йому неповторного смаку і аромату.",
		price: '210 ',
	},
	{
		id: 7,
		name: 'Зефір із фруктовим смаком',
		description:
			'це відмінний вибір для тих, хто любить фруктові смаки. Цей зефір містить натуральні екстракти фруктів, які додають йому яскравого та свіжого смаку. ',
		price: '200 ',
	},
]
