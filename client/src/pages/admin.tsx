import SmakDialog from '../components/modal/smakDialog'
import CategoryDialog from '@/components/modal/categoryDialog'
import ProductDialog from '@/components/modal/productDialog'
import AppMenu from '@/components/navigation/menu'
import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { admin } from './api/admin'
// import { selectUserData, selectLoading } from '@/store/slice/authSlice'
import { iUser } from '@/models/response/iUser'
import { useRouter } from 'next/router'

const Admin: React.FC = () => {
	const [productVisible, setProductVisible] = useState<boolean>(false)
	const [smakVisible, setSmakVisible] = useState<boolean>(false)
	const [categoryVisible, setCategoryVisible] = useState<boolean>(false)

	const dispatch = useDispatch()
	// const data = useSelector(selectUserData)
	const data = {
		userId: 1,
		role: 'ADMIN',
		email: 'string',
		isActivated: true,
	}
	const router = useRouter()

	const redirectToHomePage = () => {
		router.push('/')
	}
	if (data?.role !== 'ADMIN') {
		setTimeout(redirectToHomePage, 1500)
		return (
			<Container
				maxWidth='lg'
				sx={{
					position: 'relative',
					zIndex: 2,
					paddingBottom: '40px',
				}}
			>
				<Typography component='h1' variant='h5' about='center'>
					У вас нет доступа. Через 1.5 секунды вы будете перенаправлены на
					главную страницу.
				</Typography>
			</Container>
		)
	}

	return (
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
					<h1>Admin</h1>
				</Grid>
				<Grid item xs={8} md={8} lg={10}>
					<div>
						<Button
							sx={{ mb: '15px' }}
							variant='contained'
							onClick={() => setSmakVisible(true)}
						>
							Смаки
						</Button>
						<SmakDialog
							show={smakVisible}
							onHide={() => setSmakVisible(false)}
						/>
					</div>
					<div>
						<Button
							variant='contained'
							onClick={() => setCategoryVisible(true)}
							sx={{ mb: '15px' }}
						>
							Категориї
						</Button>
						<CategoryDialog
							show={categoryVisible}
							onHide={() => setCategoryVisible(false)}
						/>
					</div>
					<div>
						<Button
							variant='contained'
							onClick={() => setProductVisible(true)}
							sx={{ mb: '15px' }}
						>
							Додати продукт
						</Button>
						<ProductDialog
							show={productVisible}
							onHide={() => setProductVisible(false)}
						/>
					</div>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Admin
