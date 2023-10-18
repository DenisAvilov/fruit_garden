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
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './../../store/slice/authSlice'

import theme from '@/theme'
import { signIn, singUp } from '../../pages/api/user/signin'
import { useRouter } from 'next/router'

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
		// .label('email')
		.email('Напишить валідний email')
		.required(`Пошта обов'язкове поле`),
	password: yup
		.string()
		.min(3, 'Мінімальна строка 3 символи')
		.required(`Пароль обов'язкове поле`),
	serverError: yup.string(),
})
type Props = {
	props?: {}
}
const SignInSide: React.FC<Props> = (props: Props) => {
	const router = useRouter()
	const isLogin = router.route === '/login'
	const dispatch = useDispatch()

	// console.log('isLogin:', isLogin)

	// const status = useSelector(selectStatus)
	const status = false
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			serverError: ' ',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setErrors, resetForm }) => {
			const click = async (value: { email: string; password: string }) => {
				try {
					if (!isLogin) {
						const user = await singUp(value.email, value.password)

						if (typeof user === 'string') {
							return setErrors({ serverError: user })
						}
						// dispatch(loginSuccess(user))
					} else {
						const user = await signIn(value)
						if (typeof user === 'string') {
							return setErrors({ serverError: user })
						}
						// dispatch(loginSuccess(user))
					}
				} catch (e: any) {
					console.log('e auth', e)
				}
			}
			click(values)
		},
	})
	if (status) {
		router.push('/')
		return null
	}
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
							{isLogin ? 'Вхід' : 'Реєстрація'}
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
							<Box component={'div'}>
								<TextField
									margin='normal'
									fullWidth
									sx={{
										input: { display: 'none' },
										fieldset: { display: 'none' },
									}}
									error={Boolean(formik.errors.serverError)}
									helperText={formik.errors.serverError}
								/>
							</Box>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2, height: '56px' }}
								color='primary'
								// disabled={loading}
							>
								{isLogin ? 'Войти' : 'Далі'}
							</Button>
							<Grid container justifyContent='flex-end'>
								<Grid item>
									{isLogin ? (
										<Link href='http://localhost:3000/registration'>
											Нема облікового запису? Зарееструватись?
										</Link>
									) : (
										<Link href='http://localhost:3000/login'>
											Маете обліковий запис? Увійти
										</Link>
									)}
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
