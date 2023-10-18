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
	smakSuccess,
	removeSmak,
	updateSmak,
	Smak,
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

const Demo = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}))

const validationSchema = yup.object({
	smakName: yup
		.string()
		.required(`Назва смаку продукту обов'язкова`)
		.min(3, 'Мінімальна строка 3 символи'),
})

const SmakDialog: React.FC<ProductDialogProps> = (props) => {
	const { show, onHide } = props
	const dispatch = useDispatch()
	// const smakData = useSelector(selectSmak)
	const [active, setActive] = React.useState<boolean>(false)
	const [smakList, setSmakList] = React.useState<Smak[]>([])
	const [activeId, setActiveId] = React.useState<number | null>(null)

	const formik = useFormik({
		initialValues: {
			smakName: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setErrors, resetForm }) => {
			alert(values.smakName)
			const smak = { id: new Date().getTime(), name: values.smakName }
			dispatch(smakSuccess(smak))
		},
	})
	const formikChange = useFormik({
		initialValues: {
			smakName: '',
			smakId: 0,
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setErrors, resetForm }) => {
			const smak = { id: values.smakId, name: values.smakName }
			dispatch(updateSmak(smak))
			setActive(false)
			resetForm()
		},
	})

	const dellSmak = (id: number) => {
		if (id) {
			dispatch(removeSmak(id))
		}
	}

	const changeThisSmak = (id: number) => {
		formikChange.setFieldValue('smakId', id)
		setActiveId(id)
		setActive(true)
	}

	React.useEffect(() => {
		setSmakList(smakData)
	}, [smakData])

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
							Опрацювання смаку продукту
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
										<InputLabel htmlFor='smakName'>
											Новий смак продукту
										</InputLabel>
										<OutlinedInput
											id='smakName'
											startAdornment={
												<InputAdornment position='start'>✎</InputAdornment>
											}
											label='Новий смак продукту'
											fullWidth
											name='smakName'
											autoFocus
											value={formik.values.smakName}
											onChange={formik.handleChange}
											error={Boolean(formik.errors.smakName)}
										/>
										<Typography color='error'>
											{formik.errors.smakName}
										</Typography>
									</FormControl>
									<Button
										type='submit'
										variant='contained'
										sx={{ height: '36.5px' }}
									>
										Додати смак
									</Button>
								</>
							</Grid>
						</Grid>
					</form>

					<Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
						{active ? `Смаки які будемо змінювати` : `Смаки які є в наявності`}
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<List
								sx={{
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								{smakList.map((smak, index) =>
									smak.id === activeId && active ? (
										<form onSubmit={formikChange.handleSubmit} key={smak.id}>
											<ListItem
												sx={{ paddingLeft: 0, display: 'flex' }}
												key={smak.id}
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
													<InputLabel htmlFor={smak.name}>
														{smak.name}
													</InputLabel>
													<OutlinedInput
														key={smak.id}
														id={smak.name}
														startAdornment={
															<InputAdornment position='start'>
																✎
															</InputAdornment>
														}
														label={smak.name}
														value={formikChange.values.smakName}
														name='smakName'
														onChange={(event) =>
															formikChange.setFieldValue(
																'smakName',
																event.target.value
															)
														}
														error={
															formikChange.touched.smakName &&
															Boolean(formikChange.errors.smakName)
														}
													></OutlinedInput>
													{formikChange.touched.smakName &&
														formikChange.errors.smakName && (
															<Typography color='error'>
																{formikChange.errors.smakName}
															</Typography>
														)}
												</FormControl>
												<input type='hidden' name='smakId' value={smak.id} />
											</ListItem>
										</form>
									) : (
										<ListItem key={smak.id} sx={{ paddingLeft: 0 }}>
											<Typography sx={{ minWidth: '150px' }} variant='h6'>
												{smak.name}
											</Typography>
											<Button
												onClick={() => {
													changeThisSmak(smak.id)
												}}
												variant='contained'
											>
												{' '}
												Изменить
											</Button>
											<Button
												onClick={() => {
													dellSmak(smak.id)
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

export default SmakDialog
