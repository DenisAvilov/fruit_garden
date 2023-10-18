import React, { useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import zefir from './../../public/product/zefir-one.jpeg'
import { Typography } from '@mui/material'
import Meta from '@/components/seo/meta'
import { GetServerSideProps } from 'next'
import category from './api/category/category'
import { CategoryAndSubCategories } from './api/category/category.interface'
import { useDispatch } from 'react-redux'
import {
	dbCategoryAndSubCategories,
	subCategories,
} from '@/store/slice/categoriesSlice'

interface MainPageProps {
	categories: CategoryAndSubCategories[]
}

const Home: React.FC<MainPageProps> = ({ categories }) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(subCategories(categories))
	}, [categories, dispatch])

	return (
		<Meta
			title='Головна сторінка'
			description='Купить натуральний зефір, букет з зефіру на падарунок'
		>
			<section className='pageContent'>
				<aside
				// 	sx={{
				// 		padding: '80px 0 50px 0',
				// 	}}
				// 	backgroundColor='linear-gradient(0deg, #749299ff, #f4e1e1ff, #c4c5baff, #83a6b1ff, #747478ff)'
				// 	imagePath='/product/top-fon.jpeg'
				>
					<article>
						<Typography component='h1' variant='h5' align='center'>
							Ласкаво просимо до родинного українського магазину
						</Typography>
						<Typography variant='h6' align='center'>
							солодкого та корисного
						</Typography>
					</article>

					{/* <Image
						src={zefir}
						alt='zefirna-magia'
						width={320}
						height={320}
					></Image> */}
				</aside>
				<main>
					<div className='croha'>Песочні крохи</div>
					<div className='content'>
						<div>CARDS 1</div>
						<div>CARDS 2</div>
						<div>CARDS 3</div>
						<div>CARDS 4</div>
						<div>CARDS 5</div>
						<div>CARDS 6</div>
						<div>CARDS 7</div>
						<div>CARDS 8</div>
						<div>CARDS 9</div>
						<div>CARDS 10</div>
						<div>CARDS 11</div>
						<div>CARDS 12</div>
					</div>
					<div className='pagination'>PAGINATION</div>
				</main>
			</section>
		</Meta>
	)
}

export const getServerSideProps: GetServerSideProps<{
	categories: CategoryAndSubCategories
}> = async () => {
	const categories = await category.categoryAndSubcategory()
	return { props: { categories } }
	// , revalidate: 60
}
export default Home
