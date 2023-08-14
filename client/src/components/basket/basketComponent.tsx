import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Category, Product } from '@/store/slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button, ButtonGroup } from '@mui/material'
import PlusOneIcon from '@mui/icons-material/PlusOne'
import RemoveIcon from '@mui/icons-material/Remove'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import basketStore from '@/store/slice/basketSlice'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

function createData(
	id: number,
	img: string,
	name: string,
	price: number,
	count: number,
	sumItem?: number
) {
	return { id, img, name, price, count, sumItem }
}

// type Basket = {
// 	id: number
// 	name: string
// 	price: number
// 	img: string
// 	count: number
// }

// const items: Basket[] = [
// 	{
// 		id: 1,
// 		name: 'Зефір класичний',
// 		price: 120,
// 		img: '/product/zefir_tree.jpeg',
// 		count: 8,
// 	},
// 	{
// 		id: 2,
// 		name: 'Шоколад молочный',
// 		price: 80,
// 		img: '/product/zefir_tree.jpeg',
// 		count: 1,
// 	},
// 	{
// 		id: 3,
// 		name: 'Конфеты "Ромашка"',
// 		price: 50,
// 		img: '/product/zefir_tree.jpeg',
// 		count: 3,
// 	},
// ]

// const rows = items.map((item) => {
// 	return createData(item.id, item.img, item.name, item.price, item.count)
// })
const rows = [
	{
		id: 3,
		name: 'Конфеты "Ромашка"',
		price: 50,
		img: '/product/zefir_tree.jpeg',
		count: 3,
	},
]

// type PropsProduct = {
// 	product: Product
// 	category?: Category
// 	categoryRoute?: string
// }

export default function BasketPage() {
	const dispatch = useDispatch()
	const test = useSelector((i: any) => i.basket.product)

	const [cost, setCost] = React.useState<number>(0)

	// function countSum(itemCost: number) {}

	// const [increment, setIncrement] = React.useState<{ [id: number]: number }>(
	// 	items.reduce<{ [id: number]: number }>((acc, item) => {
	// 		acc[item.id] = item.count
	// 		return acc
	// 	}, {})
	// )

	const plus = (id: number, price: number) => {
		setCost((prevCount) => prevCount + price)
		// setIncrement((prevIncrement) => ({
		// 	...prevIncrement,
		// 	[id]: prevIncrement[id] + 1,
		// }))
	}

	const minus = (id: number, price: number) => {
		setCost((prevCount) => prevCount - price)
		// setIncrement((prevIncrement) => ({
		// 	...prevIncrement,
		// 	[id]: prevIncrement[id] - 1,
		// }))
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Фото</StyledTableCell>
						<StyledTableCell>Назва</StyledTableCell>
						<StyledTableCell align='right'>Вартість</StyledTableCell>
						<StyledTableCell align='right'>Кількість</StyledTableCell>
						<StyledTableCell align='right'>Сумма</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.id}>
							<StyledTableCell component='th' scope='row'>
								<div
									style={{
										width: '100%',
										height: 'auto',
										textAlign: 'left',
									}}
								>
									<Image src={row.img} width={150} height={150} alt='Зевір' />
								</div>
							</StyledTableCell>
							<StyledTableCell component='th' scope='row'>
								{row.name}
							</StyledTableCell>
							<StyledTableCell align='right'>{row.price}</StyledTableCell>
							<StyledTableCell align='right'>
								{' '}
								<ButtonGroup
									size='small'
									disableElevation
									variant='contained'
									aria-label=''
									sx={{ alignItems: 'center' }}
								>
									<Button
										sx={{ marginRight: '5px' }}
										onClick={() => plus(row.id, row.price)}
									>
										<PlusOneIcon />
									</Button>
									{/* {increment[`${row.count}`]} */}
									<Button
										sx={{ marginLeft: '5px' }}
										// disabled={increment === 1}
										onClick={() => minus(row.id, row.price)}
									>
										<RemoveIcon />
									</Button>
									<Button
										sx={{ marginLeft: '5px' }}
										// disabled={increment === 1}
										// onClick={() => onDelete(row.id)}
									>
										<HighlightOffOutlinedIcon />
									</Button>
								</ButtonGroup>
							</StyledTableCell>
							<StyledTableCell align='right'>{row.price}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
			<Table sx={{ minWidth: 700 }}>
				<TableHead>
					<TableRow>
						<StyledTableCell>Сумма</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<StyledTableRow>
						<TableCell align='right'>{cost}</TableCell>
						<StyledTableCell>
							<Button sx={{ marginRight: '5px' }} variant='contained'>
								Замовити
							</Button>
						</StyledTableCell>
					</StyledTableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}
