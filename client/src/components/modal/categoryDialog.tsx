import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import { useFormik } from 'formik'
import * as yup from 'yup'
import DeleteIcon from '@mui/icons-material/Delete'
import { Container, Grid, List, ListItem, styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
	categorySuccess,
	categoryRemove,
	categoryUpdate,
	Category,
	selectCategory,
	selectLoading,
	loadingStart,
	loadingEnd,
} from '@/store/slice/productSlice'

import { useSelector } from 'react-redux'
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

type FormValues = {
	name: string
}

type ProductDialogProps = {
	show: boolean
	onHide: () => void
}

const validationSchema = yup.object({
	category: yup
		.string()
		.required(`Назва смаку продукту обов'язкова`)
		.min(3, 'Мінімальна строка 3 символи'),
})

const CategoryDialog: React.FC<ProductDialogProps> = (props) => {
	const { show, onHide } = props
	const dispatch = useDispatch()
	const categoryData = useSelector(selectCategory)
	const loading = useSelector(selectLoading)
	const [active, setActive] = React.useState<boolean>(false)
	const [categoryList, setCategoryList] =
		React.useState<Category[]>(categoryData)
	const [activeId, setActiveId] = React.useState<number | null>(null)

	const formik = useFormik({
		initialValues: {
			category: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setErrors, resetForm }) => {
			dispatch(loadingStart())
			const category = { id: new Date().getTime(), name: values.category }
			dispatch(categorySuccess(category))
			dispatch(loadingEnd())
		},
	})
	const formikChange = useFormik({
		initialValues: {
			category: '',
			categoryId: 0,
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setErrors, resetForm }) => {
			const category = { id: values.categoryId, name: values.category }
			dispatch(categoryUpdate(category))
			setActive(false)
			resetForm()
		},
	})

	const dellCategory = (id: number) => {
		if (id) {
			dispatch(categoryRemove(id))
		}
	}

	const changeThisCategory = (id: number) => {
		formikChange.setFieldValue('categoryId', id)
		setActiveId(id)
		setActive(true)
	}

	React.useEffect(() => {
		setCategoryList(categoryData)
	}, [categoryData])

	return (
		<div>
			<Dialog
				fullScreen
				open={show}
				onClose={onHide}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
							{loading ? 'ЗАГРУЗКА' : 'Опрацювання категорії продукту'}
						</Typography>

						<Button
							variant='contained'
							sx={{ mt: 3, mb: 2, height: '50px' }}
							color='primary'
							onClick={() => {
								formik.resetForm()
								onHide()
							}}
						>
							<CloseIcon />
							Закрити
						</Button>
					</Toolbar>
				</AppBar>
				<Divider sx={{ position: 'relative', mb: 5 }} />
				<Container>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								md={6}
								sx={{ display: 'flex', alignItems: 'center' }}
							>
								<>
									<FormControl sx={{ width: '40ch', mr: 1 }}>
										<InputLabel htmlFor='сategory'>
											Нова категория продукту
										</InputLabel>
										<OutlinedInput
											id='category'
											startAdornment={
												<InputAdornment position='start'>✎</InputAdornment>
											}
											label='Нова категория продукту'
											fullWidth
											name='category'
											autoFocus
											value={formik.values.category}
											onChange={formik.handleChange}
											error={Boolean(formik.errors.category)}
										/>
										<Typography color='error'>
											{formik.errors.category}
										</Typography>
									</FormControl>
									<Button
										type='submit'
										variant='contained'
										sx={{ height: '36.5px' }}
									>
										Додати категорію
									</Button>
								</>
							</Grid>
						</Grid>
					</form>

					<Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
						{active
							? `Категорії які будемо змінювати`
							: `Категорії які є в наявності`}
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<List
								sx={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								{categoryList.map((category, index) =>
									category.id === activeId && active ? (
										<form
											onSubmit={formikChange.handleSubmit}
											key={category.id}
										>
											<ListItem
												sx={{ paddingLeft: 0, display: 'flex' }}
												key={category.id}
												secondaryAction={
													<>
														<Button type='submit' variant='contained'>
															{' '}
															Зберехти
														</Button>
														<Button
															sx={{ ml: 1 }}
															type='submit'
															variant='contained'
															onClick={() => {
																setActive(false)
															}}
														>
															{' '}
															X
														</Button>
													</>
												}
											>
												<FormControl sx={{ width: '40ch' }}>
													<InputLabel htmlFor={category.name}>
														{category.name}
													</InputLabel>
													<OutlinedInput
														key={category.id}
														id={category.name}
														startAdornment={
															<InputAdornment position='start'>
																✎
															</InputAdornment>
														}
														label={category.name}
														value={formikChange.values.category}
														name='category'
														onChange={(event) =>
															formikChange.setFieldValue(
																'category',
																event.target.value
															)
														}
														error={
															formikChange.touched.category &&
															Boolean(formikChange.errors.category)
														}
													></OutlinedInput>
													{formikChange.touched.category &&
														formikChange.errors.category && (
															<Typography color='error'>
																{formikChange.errors.category}
															</Typography>
														)}
												</FormControl>
												<input
													type='hidden'
													name='categoryId'
													value={category.id}
												/>
											</ListItem>
										</form>
									) : (
										<ListItem key={category.id} sx={{ paddingLeft: 0 }}>
											<Typography sx={{ minWidth: '150px' }} variant='h6'>
												{category.name}
											</Typography>
											<Button
												onClick={() => {
													changeThisCategory(category.id)
												}}
												variant='contained'
											>
												{' '}
												Змінити
											</Button>
											<Button
												onClick={() => {
													dellCategory(category.id)
												}}
											>
												<DeleteIcon />
											</Button>
										</ListItem>
									)
								)}
							</List>
						</Grid>
					</Grid>
				</Container>
			</Dialog>
		</div>
	)
}

export default CategoryDialog
