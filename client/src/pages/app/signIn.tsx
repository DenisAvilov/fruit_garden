import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'

import theme from '@/theme'
import signIn from '../api/user/signin'

type MyFormValues = {
	email: string
	password: string
}

function Copyright(props: any) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link color='inherit' href='http://localhost:3000/'>
				Fruit Garden
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const validationSchema = yup.object({
	email: yup
		.string()
		.email('Напишить валідний email')
		.required(`Пошта обов'язкове поле`),
	password: yup
		.string()
		.min(3, 'Мінімальна строка 3 символи')
		.required(`Пароль обов'язкове поле`),
})

const SignInSide: React.FC<MyFormValues> = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				const rez = await signIn.authIn(values)
				if (rez) {
					alert('Успешная авторизация!')
				}
			} catch (error: any) {
				alert(`Ошибка: ${error.message}`)
			}
		},
	})
	return (
		<>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/random)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: `${theme.palette.primary}` }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Вхід
						</Typography>

						<form onSubmit={formik.handleSubmit}>
							<TextField
								margin='normal'
								fullWidth
								id='email'
								label='Пошта'
								name='email'
								// autoComplete='email'
								autoFocus
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								margin='normal'
								fullWidth
								name='password'
								label='Пароль'
								type='password'
								id='password'
								// autoComplete='current-password'
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2, height: '56px' }}
								color='primary'
								// disabled={formik.isSubmitting}
							>
								Войти
							</Button>
							<Grid container justifyContent='flex-end'>
								<Grid item>
									<Link href='http://localhost:3000/app/signUp'>
										Нема облікового запису? Зарееструватись?
									</Link>
								</Grid>
							</Grid>
						</form>
					</Box>
					<Copyright sx={{ mt: 5 }} />
				</Grid>
			</Grid>
		</>
	)
}

export default SignInSide
