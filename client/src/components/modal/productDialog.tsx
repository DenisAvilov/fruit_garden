import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import {
	Product,
	productSuccess,
	// selectCategory,
	// selectSmak,
} from '@/store/slice/productSlice'
import { Grid, Input, MenuItem, Select, TextField } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { useDispatch } from 'react-redux'

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

type ProductDialogProps = {
	show: boolean
	onHide: () => void
}

interface Info {
	number: number
	title: string
	description: string
}
const validationSchema = yup.object({
	name: yup
		.string()
		.required(`Назва продукту обов'язкова`)
		.min(1, 'Мінімум 5 символів'),
	category: yup.string().required(`Категорія продукту обов'язкова`),
	smak: yup.string().required(`Смак продукту обов'язковий`),
	price: yup
		.number()
		.required(`Ціна продукту обов'язкова`)
		.min(2, 'Мінімум 2 символи'),
	description: yup
		.string()
		.required(`Відсутній опис продукту`)
		.min(3, 'Мінімальний опис продукту 30 символів'),
	img: yup.mixed().required('Обязательно выберите файл'),
	info: yup
		.array()
		.of(
			yup.object({
				title: yup.string().required('Відсутня назва свойства'),
				description: yup
					.string()
					.required('Відсутній опис свойства')
					.min(5, 'Мінімальний опис свойства 5 символів'),
				number: yup.number(),
			})
		)
		.required("Інформація про свойства обов'язкова")
		.test({
			test: function (value) {
				for (let i = 0; i < value.length; i++) {
					if (!value[i].title || !value[i].description) {
						return false
					}
				}
				return true
			},
			message: 'Некоректна інформація про свойства',
		}),
})

const ProductDialog: React.FC<ProductDialogProps> = (props) => {
	// const categories = useSelector(selectCategory)
	const categories = [{ id: 1, name: 'string' }]
	// const smak = useSelector(selectSmak)
	const smak = [{ id: 1, name: 'string' }]
	const [info, setInfo] = React.useState<Info[]>([])

	const dispatch = useDispatch()

	const { show, onHide } = props
	const initialValues: Product = {
		id: 0,
		name: '',
		price: '0',
		category: '',
		Product: '',
		smak: '',
		img: 'undefined',
		rating: 3,
		info: [],
	}

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values: Product, { setErrors, resetForm }) => {
			values.id = new Date().getMilliseconds()

			dispatch(productSuccess(values))
		},
	})

	const addInfo = () => {
		const newInfo = {
			title: '',
			description: '',
			number: new Date().getMilliseconds(),
		}

		setInfo((prevInfo) => [...prevInfo, newInfo])
		formik.setFieldValue('info', [...formik.values.info, newInfo])
	}

	const removeInfo = (id: number) => {
		const updatedInfo = info.filter((i) => i.number !== id)
		const updatedValues = formik.values.info.filter((i: any) => i.number !== id)

		setInfo(updatedInfo)
		formik.setFieldValue('info', updatedValues)
	}

	return (
		<div>
			<Dialog
				fullScreen
				open={show}
				onClose={onHide}
				TransitionComponent={Transition}
			>
				<form onSubmit={formik.handleSubmit}>
					<AppBar sx={{ position: 'relative' }}>
						<Toolbar>
							<IconButton
								edge='start'
								color='inherit'
								onClick={() => {
									formik.resetForm()
									onHide()
								}}
								aria-label='close'
							>
								<CloseIcon />
							</IconButton>
							<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
								Новий продукт
							</Typography>
							<Button autoFocus color='inherit' type='submit'>
								Зберегти
							</Button>
						</Toolbar>
					</AppBar>
					<Divider />

					<Box
						sx={{
							mt: '50px',
							ml: 'auto',
							mr: 'auto',
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Box
							sx={{
								mt: '50px',
								display: 'flex',
								flexWrap: 'wrap',
								flexDirection: 'column',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FormControl sx={{ m: 1, width: '25ch' }}>
									<InputLabel htmlFor='category'>Категория продукту</InputLabel>
									<Select
										labelId='category'
										id='category'
										name='category'
										label='Категория продукту'
										startAdornment={
											<InputAdornment position='start'>🍭</InputAdornment>
										}
										value={formik.values.category}
										onChange={formik.handleChange}
									>
										{categories.map((option) => (
											<MenuItem key={option.id} value={option.name}>
												{option.name}
											</MenuItem>
										))}
									</Select>
									<Typography color='error'>
										{formik.touched.category && formik.errors.category}
									</Typography>
								</FormControl>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FormControl sx={{ m: 1, width: '25ch' }}>
									<InputLabel htmlFor='smak'>Смак продукту</InputLabel>
									<Select
										labelId='smak'
										id='smak'
										name='smak'
										label='Смак продукту'
										startAdornment={
											<InputAdornment position='start'>🍍</InputAdornment>
										}
										value={formik.values.smak}
										onChange={formik.handleChange}
									>
										{smak.map((option) => (
											<MenuItem key={option.id} value={option.name}>
												{option.name}
											</MenuItem>
										))}
									</Select>
									<Typography color='error'>
										{formik.touched.smak && formik.errors.smak}
									</Typography>
								</FormControl>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FormControl sx={{ m: 1, width: '25ch' }}>
									<InputLabel htmlFor='name'>Назва продукту</InputLabel>
									<OutlinedInput
										id='name'
										name='name'
										autoFocus
										value={formik.values.name}
										onChange={formik.handleChange}
										error={formik.touched.name && Boolean(formik.errors.name)}
										startAdornment={
											<InputAdornment position='start'>✎</InputAdornment>
										}
										label='Назва продукту'
									/>
									<Typography color='error'>
										{formik.touched.name && formik.errors.name}
									</Typography>
								</FormControl>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FormControl sx={{ m: 1, width: '25ch' }}>
									<InputLabel htmlFor='price'>Вартість продукту</InputLabel>
									<OutlinedInput
										id='price'
										startAdornment={
											<InputAdornment position='start'>₴</InputAdornment>
										}
										label='Вартість продукту'
										fullWidth
										name='price'
										value={formik.values.price}
										onChange={formik.handleChange}
									/>
									<Typography color='error'>
										{formik.touched.price && formik.errors.price}
									</Typography>
								</FormControl>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FormControl sx={{ m: 1, width: '25ch' }}>
									<InputLabel htmlFor='description'>Опис продукту</InputLabel>
									<OutlinedInput
										id='description'
										startAdornment={
											<InputAdornment position='start'>✒</InputAdornment>
										}
										maxRows={4}
										multiline
										label='Опис продукту'
										name='description'
										inputComponent='textarea'
										value={formik.values.description}
										onChange={formik.handleChange}
									/>
									<Typography color='error'>
										{formik.touched.description && formik.errors.description}
									</Typography>
								</FormControl>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div>
									<FormControl
										sx={{
											m: 3,
											width: '25ch',
											display: 'flex',
											flexDirection: 'row',
										}}
									>
										<Button variant='contained' component='label'>
											Загрузить фото
											<input
												hidden
												accept=' .jpg, .jpeg'
												// multiple
												type='file'
												id='img'
												name='img'
												onChange={formik.handleChange}
											/>
										</Button>
									</FormControl>
									<Typography
										color='error'
										sx={{
											m: 3,
											width: '25ch',
										}}
									>
										{formik.touched.img && formik.errors.img}
									</Typography>
								</div>
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								mb: '50px',
							}}
						>
							<Button onClick={addInfo} color='inherit' variant='contained'>
								{' '}
								Додати свойство:
							</Button>

							{info.map((i, index) => (
								<Box
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										justifyContent: 'center',
										alignItems: 'center',
										mb: '30px',
									}}
									key={i.number}
								>
									<FormControl sx={{ mr: 1 }}>
										<TextField
											id={'info[' + index + '].title'}
											label={'Свойство'}
											variant='standard'
											name={'info[' + index + '].title'}
											value={formik.values.info[index]?.title}
											onChange={formik.handleChange}
										/>
										<Typography color='error'>
											{formik.touched.info?.[index]?.title &&
												(formik.errors.info?.[index] as unknown as Info)?.title}
										</Typography>
									</FormControl>

									<FormControl>
										<TextField
											id={'info[' + index + '].description'}
											label='Опис'
											variant='standard'
											name={'info[' + index + '].description'}
											value={formik.values.info[index]?.description}
											onChange={formik.handleChange}
										/>
										<Typography color='error'>
											{formik.touched.info?.[index]?.description &&
												(formik.errors.info?.[index] as unknown as Info)
													?.description}
										</Typography>
									</FormControl>

									<Button
										onClick={() => removeInfo(i.number)}
										variant='contained'
										color='warning'
										sx={{ ml: 1 }}
									>
										Удалить
									</Button>
								</Box>
							))}
						</Box>
					</Box>
				</form>
			</Dialog>
		</div>
	)
}

export default ProductDialog
