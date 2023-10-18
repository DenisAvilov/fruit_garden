import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import LinkMagic from './asd'
import { Box, Typography } from '@mui/material'
import styles from './../../styles/listDividers.module.scss'

const style = {
	width: '100%',
	maxWidth: 360,
	bgcolor: 'background.paper',
}
// className={styles.test}
type ListItemData = {
	href: string
	name: string
	id: number
}
type ListDividersProps = {
	items: ListItemData[]
}

export default function ListDividers({ items }: ListDividersProps) {
	return (
		<List sx={style} component='nav' aria-label='mailbox folders'>
			{items.map((items, index) => (
				<Box key={index}>
					<ListItem key={index} button>
						<LinkMagic href={items.href}>
							<ListItemText primary={items.name} />
						</LinkMagic>
					</ListItem>
					<Divider />
				</Box>
			))}
		</List>
	)
}
