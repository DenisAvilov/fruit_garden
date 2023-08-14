import * as React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
	Button,
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material'
import { Smak } from '@/store/slice/productSlice'
// import { Smak } from './brandDialog'

const validationSchema = yup.object({
	smakName: yup
		.string()
		.required(`Назва смаку обов'язкова`)
		.min(3, 'Мінімальна строка 3 символи'),
})

type BrandDialogListProps = {
	smakList: Smak[]
	onAddSmak: (smakName: string) => void
}

const SmakDialogList: React.FC<BrandDialogListProps> = (props) => {
	const { smakList, onAddSmak } = props

	const formik = useFormik({
		initialValues: {
			smakName: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setErrors, resetForm }) => {
			onAddSmak(values.smakName)
			// resetForm()
		},
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<FormControl sx={{ m: 1, width: '40ch' }}>
					<InputLabel htmlFor='smakName'>Новий смак продукту</InputLabel>
					<OutlinedInput
						id='smakName'
						startAdornment={<InputAdornment position='start'>✎</InputAdornment>}
						label='Новий смак продукту'
						fullWidth
						name='smakName'
						autoFocus
						value={formik.values.smakName}
						onChange={formik.handleChange}
						error={Boolean(formik.errors.smakName)}
					/>
					<Typography color='error'>{formik.errors.smakName}</Typography>
				</FormControl>
				<Button type='submit' variant='contained' sx={{ mt: 2 }}>
					Додати вкус
				</Button>
			</form>
			<Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
				Смаки які є в наявності
			</Typography>
			<ul>
				{smakList.map((smak, index) => (
					<li key={index}>{smak.name}</li>
				))}
			</ul>
		</div>
	)
}

export default SmakDialogList
