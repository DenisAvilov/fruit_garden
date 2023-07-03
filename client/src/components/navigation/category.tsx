import * as React from 'react'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import { useSelector } from 'react-redux'
import {
	selectCategory,
	idCategory,
	sliceIdCategory,
	Category,
	Smak,
	selectSmak,
} from '@/store/slice/productSlice'
import { useDispatch } from 'react-redux'
import theme from '@/theme'
import { lighten } from '@mui/system'

export default function IconMenu() {
	//  sx={{ width: 195, position: 'fixed' }}
	const category = useSelector(selectCategory)

	const [activeId, setActiveId] = React.useState<
		Array<{ id: number; name: string }>
	>([{ id: 0, name: '' }])
	const [activeCategory, setActiveCategory] = React.useState<number>(-1)

	const selectedCategory = useSelector(sliceIdCategory)
	const smak = useSelector(selectSmak)
	const [activeSmak, setActiveSmak] = React.useState<number>(-1)
	const dispatch = useDispatch()

	const selectedId = (item: number, name: string, type: string) => {
		dispatch(idCategory({ idCategory: item }))
		// setActiveId(item)
		if (type === 'category') {
			// setActiveSmak(-1)
			setActiveCategory(item)
		} else if (type === 'smak') {
			// setActiveCategory(-1)
			setActiveSmak(item)
		}
	}
	React.useEffect(() => {}, [selectedCategory])

	const Items = (id: number, name: string, type: string) => {
		let isActive = false
		if (type === 'category') {
			isActive = id === activeCategory
		} else if (type === 'smak') {
			isActive = id === activeSmak
		}
		return (
			<MenuItem
				key={id}
				onClick={() => {
					selectedId(id, name, type)
				}}
				// divider={item.id === selectedCategory ?? true}
				sx={{
					backgroundColor: isActive
						? `${lighten(theme.palette.secondary.light, 0.8)}`
						: '',
					'&:hover': {
						backgroundColor: `${theme.palette.secondary.light}`,
					},
				}}
			>
				<ListItemText>{name}</ListItemText>

				<Divider />
			</MenuItem>
		)
	}
	const ItemsName = (name: string) => {
		return (
			<Typography
				fontWeight={700}
				overflow={'hidden'}
				variant='body1'
				sx={{ pl: '18px' }}
			>
				{name}
			</Typography>
		)
	}
	return (
		<Paper>
			<MenuList>
				{ItemsName('Категориї')}
				{category.map((item: any) => {
					return Items(item.id, item.name, 'category')
				})}
				{ItemsName('Смаки')}
				{smak.map((item: any) => {
					return Items(item.id, item.name, 'smak')
				})}
			</MenuList>
		</Paper>
	)
}
