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

import theme from '@/theme'
import { lighten } from '@mui/system'

export default function IconMenu() {
	const category = ['']
	const [activeId, setActiveId] = React.useState<
		Array<{ id: number; name: string }>
	>([{ id: 0, name: '' }])
	const [activeCategory, setActiveCategory] = React.useState<number>(-1)

	const [activeSmak, setActiveSmak] = React.useState<number>(-1)
	const selectedId = (item: number, name: string, type: string) => {
		if (type === 'category') {
			setActiveCategory(item)
		} else if (type === 'smak') {
			setActiveSmak(item)
		}
	}

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
				{ItemsName('Смаки')}
				{ItemsName('Бренд')}
			</MenuList>
		</Paper>
	)
}
