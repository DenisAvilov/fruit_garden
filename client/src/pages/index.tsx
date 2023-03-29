import React, { useState } from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import AppMenu from '../components/appMenu'
import CSection from '@/components/cSection'
import PageGallery from '@/components/mainPageTopProduct/mainPageGallery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import '@fontsource/roboto/700.css'
import style from './../styles/index.module.scss'
import Image from 'next/image'
import ScrollToHide01 from '@/components/scrollToHide/scrollToHide01'
import ScrollToTopButton from '@/components/scrollToHide/scrollToTopButtom'
import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material'
import CardsCustom from '@/components/card/cardsProducts'
import theme from '@/theme'

const Home: NextPage = () => {
	const buttons = [
		<Button key='two' variant='contained' color='secondary' sx={{ mb: 2 }}>
			Зателефонувати зараз
		</Button>,
		<Button key='one' variant='contained' color='secondary' sx={{ mb: 2 }}>
			Замов зворотній звонок
		</Button>,
		<Button key='three' variant='contained' color='secondary'>
			Перейти до магазину
		</Button>,
	]
	return (
		<>
			<CSection
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					maxHeight: '100vh',
					padding: '80px 0 50px 0',
					// '&:after': {
					// 	position: 'absolute',
					// 	content: `' '`,
					// 	top: 0,
					// 	left: 0,
					// 	bottom: 0,
					// 	right: 0,
					// 	// backgroundColor: '#f4e1e1ff',
					// 	backgroundImage: `url('/product/loonapix.png')`,
					// 	backgroundSize: '35%',
					// 	backgroundRepeat: 'no-repeat',
					// 	backgroundPositionX: 'right',
					// 	backgroundPositionY: 'center',
					// 	opacity: '0.5',
					// },
				}}
				backgroundColor='linear-gradient(0deg, #749299ff, #f4e1e1ff, #c4c5baff, #83a6b1ff, #747478ff)'
				imagePath='/product/top-fon.jpeg'
				// imagePath='/product/prozra4nost.jpg'
				// afterBackgroundImage='/product/top-fon.jpeg'
			>
				<Container
					maxWidth='lg'
					sx={{
						position: 'relative',
						zIndex: 2,
					}}
				>
					<ScrollToHide01 threshold={0}>
						<div>
							<AppMenu />
						</div>
					</ScrollToHide01>

					<Box component={'div'} sx={{ height: '70vh' }}>
						<Typography
							component='h1'
							variant='h2'
							sx={{
								fontSize: '2.5em',
								fontWeight: 800,
								maxWidth: '60%',
							}}
							padding={'20px'}
						>
							Ласкаво просимо до родинного українського магазину
						</Typography>
						<Typography
							component='h2'
							variant='h5'
							padding={'20px'}
							sx={{
								fontSize: '2em',
								fontWeight: 800,
							}}
						>
							солодкого та корисного
						</Typography>
						<Typography
							component='h2'
							variant='h5'
							padding={'20px'}
							sx={{ maxWidth: '60%' }}
						>
							Fruit Garden пропонує чудовий вибір крафтових виробів з
							натуральних продуктів
						</Typography>{' '}
					</Box>

					<PageGallery />
				</Container>
			</CSection>
			<CSection backgroundColor='linear-gradient(0deg, #749299ff, #f4e1e1ff, #c4c5baff, #83a6b1ff, #747478ff)'>
				<Container
					maxWidth='lg'
					sx={{
						position: 'relative',
						// padding: '80px 0 50px 0',
					}}
				>
					<Typography
						component='h2'
						variant='h5'
						padding={'20px'}
						sx={{
							fontSize: '2em',
							fontWeight: 800,
						}}
					>
						На ринку ми з 2023 року, але пригощяємо друзів вже досить давно
					</Typography>
					<Typography
						component='h2'
						variant='h5'
						padding={'20px'}
						align='center'
						textTransform='uppercase'
						mb={4}
					>
						Пропонуємо спробувати
					</Typography>{' '}
					<CardsCustom item={3} />
				</Container>
			</CSection>
			<CSection
				// imagePath='/product/carpathians.jpg'
				imagePath='/fon.jpg'
				backgroundColor='linear-gradient(0deg, #749299ff, #f4e1e1ff, #c4c5baff, #83a6b1ff, #747478ff)'
				className={style.parallax}
				sx={{
					padding: '80px 0 50px 0',
					// '&:after': {
					// 	position: 'absolute',
					// 	content: `' '`,
					// 	top: 0,
					// 	left: 0,
					// 	bottom: 0,
					// 	right: 0,
					// 	backgroundColor: '#f4e1e1ff',
					// 	opacity: '0.5',
					// },
				}}
			>
				<Container
					maxWidth='lg'
					sx={{
						position: 'relative',
						zIndex: 1,
						padding: '80px 0 50px 0',
					}}
				>
					<Typography
						component='h2'
						variant='h2'
						mb={5}
						align='center'
						sx={{ fontSize: '2.5em', fontWeight: 800 }}
					>
						Солодощі з натуральних продуктів це гарна можливість подарувати
						чудовий настрій вашим рідним та близьким
					</Typography>
					<Box
						component={'div'}
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							border: `4px solid ${theme.palette.secondary.dark}`,
							padding: '0 25px',
						}}
					>
						<Box
							component={'div'}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<Typography
								component='h3'
								variant='h6'
								padding={'20px'}
								sx={{
									maxWidth: '60%',
									fontSize: '2em',
									fontWeight: 800,
								}}
							>
								Подарункові набори доступні за різною вагою та смаками.
							</Typography>

							{/* <ButtonGroup
								orientation='vertical'
								aria-label='vertical contained button group'
								variant='text'
							>
								{buttons}
							</ButtonGroup> */}
						</Box>
						{/* <Box sx={{}}>
							<Image
								height='400'
								width='400'
								alt='Pastila'
								src='/product/loonapix_167941152993579600.png'
							></Image> */}
						{/* </Box> */}
					</Box>
				</Container>
			</CSection>
			<CSection
				backgroundColor='linear-gradient(315deg, #749299ff, #747478ff)'
				// imagePath='/happy_1280.jpg'
				sx={
					{
						// position: 'relative',
					}
				}
			>
				<Container
					className={style.parallax}
					maxWidth='lg'
					sx={{
						// position: 'relative',
						// backgroundImage: `url('/product/white-zephyr.jpg')`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						padding: '80px 0 50px 0',
						height: '100vh',

						// color: '#ffff',
						'&:after': {
							position: 'absolute',
							content: `' '`,
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center',
							backgroundImage: `url('/product/white-zephyr.jpg')`,
							zIndex: -1,
							opacity: '0.5',
						},
					}}
				>
					<Typography
						component={'h2'}
						sx={{ fontSize: '36px', marginBottom: '20px' }}
					>
						Зефір - ласощі для здорового харчування
					</Typography>
					<Typography sx={{ fontSize: '24px', lineHeight: '1.5' }}>
						Насолоджуйтесь смаком натурального зефіру,<br></br> який містить
						багато вітамінів та мінералів,<br></br> не містить штучних добавок
						та є низькокалорійним продуктом.<br></br> Замовте наш зефір прямо
						зараз і насолоджуйтесь його ніжним смаком та корисними
						властивостями!
					</Typography>
				</Container>
			</CSection>

			<CSection
				backgroundColor='linear-gradient(315deg, #749299ff, #f4e1e1ff, #c4c5baff, #83a6b1ff, #747478ff)'
				className={style.parallax}
				imagePath='/happy_1280.jpg'
				sx={
					{
						// '&:after': {
						// 	position: 'absolute',
						// 	content: `' '`,
						// 	top: 0,
						// 	left: 0,
						// 	bottom: 0,
						// 	right: 0,
						// 	backgroundColor: '#000000',
						// 	opacity: '0.5',
						// },
						// '&:before': {
						// 	position: 'absolute',
						// 	content: `' '`,
						// 	top: '100px',
						// 	left: '100px',
						// 	bottom: '100px',
						// 	right: '100px',
						// 	border: '10px solid #ffffff',
						// 	// opacity: '0.5',
						// },
					}
				}
			>
				<Container
					maxWidth='lg'
					sx={{
						position: 'relative',
						zIndex: 2,
						padding: '80px 0 50px 0',
					}}
				>
					<Box component={'div'}>
						<Typography
							component='h2'
							variant='h5'
							padding={'20px'}
							sx={{
								fontSize: '2em',
								fontWeight: 800,
								color: '#ffffff',
							}}
						>
							Піклуйся про здоров'я близьких
						</Typography>
						<Typography
							component='h2'
							variant='h5'
							padding={'20px'}
							sx={{
								fontSize: '2em',
								fontWeight: 800,
								color: '#ffffff',
							}}
						>
							Подаруй смачні спогади
						</Typography>
						<Typography
							component='h2'
							variant='h5'
							padding={'20px'}
							sx={{
								fontSize: '2em',
								fontWeight: 800,
								color: '#ffffff',
							}}
						>
							<span className='accent100'>100%</span> природній продукт
						</Typography>
						<Typography
							component='h2'
							variant='h5'
							padding={'20px'}
							sx={{
								fontSize: '2em',
								fontWeight: 800,
								color: '#ffffff',
							}}
						></Typography>
					</Box>

					<Paper
						variant='outlined'
						sx={{
							display: 'inline-flex',
							flexDirection: 'column',
							padding: '20px',
							alignItems: 'center',
						}}
					>
						{buttons}
					</Paper>
				</Container>
			</CSection>
			<CSection backgroundColor='linear-gradient(270deg, #749299ff, #f4e1e1ff, #c4c5baff, #83a6b1ff, #747478ff)'>
				<Container
					maxWidth='lg'
					sx={{
						position: 'relative',
						padding: '80px 0 50px 0',
					}}
				>
					<CardsCustom item={6} /> <ScrollToTopButton />
				</Container>
			</CSection>
		</>
	)
}

export default Home
