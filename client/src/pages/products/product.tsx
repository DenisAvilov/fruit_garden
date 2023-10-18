import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Product, Category } from '@/store/slice/productSlice'
import { Box, Button, Grid, Paper, Typography, styled } from '@mui/material'
import Image from 'next/image'

type PropsProduct = {
	product: Product
	category?: Category
	categoryRoute?: string
}

const ProductOnePage: React.FC<PropsProduct> = ({ product }) => {
	const router = useRouter()

	const handleClick = () => {
		router.push('/categories')
	}

	return (
		<>
			<Box sx={{ flexGrow: 1, marginTop: '40px' }}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={6} alignContent={'flex-start'}>
						<div
							style={{
								width: '100%',
								height: 'auto',
								textAlign: 'left',
								marginLeft: '17px',
							}}
						>
							<Image
								src={'/product/zefir_tree.jpeg'}
								width={450}
								height={400}
								alt='Зевір'
							/>
						</div>
					</Grid>
					<Grid item xs={6} md={6}>
						<Typography
							component={'h1'}
							variant={'h5'}
							fontWeight={600}
							align='center'
							mb={5}
						>
							{product.name}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
							mb={1}
						>
							<Typography variant='h6' fontWeight={600} mr={2}>
								Смак:
							</Typography>
							<Typography variant='body2'> {product.smak}</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
							mb={1}
						>
							<Typography variant='h6' fontWeight={600} mr={2}>
								Опис:
							</Typography>
							<Typography variant='body2'> product.description</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
							mb={4}
						>
							<Typography variant='h6' fontWeight={600} mr={2}>
								Ціна:
							</Typography>
							<Typography color='red' fontSize='27px' fontWeight={600}>
								{product.price} грн.
							</Typography>
						</Box>
						<Button
							sx={{ marginBottom: '20px' }}
							fullWidth
							variant='contained'
							size='medium'
						>
							В корзину
						</Button>
						<Button
							fullWidth
							variant='contained'
							size='medium'
							onClick={() => handleClick()}
						>
							Продовжити покупки
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default ProductOnePage
