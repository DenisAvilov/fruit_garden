import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import ListDividers from './navigation/listDividers'

type Category = {
	name: string
	href: string
	id: number
}

type DataItem = {
	[key: string]: Category[]
}

type BasicAccordionProps = {
	data: DataItem[]
}

export default function BasicAccordion({ data }: BasicAccordionProps) {
	// Створюємо об'єкт для групування даних за ім'ям категорії
	const groupedData: { [key: string]: Category[] } = {}

	data.forEach((category) => {
		const categoryName = Object.keys(category)[0]
		const categoryItems = category[categoryName]

		if (!groupedData[categoryName]) {
			groupedData[categoryName] = []
		}

		groupedData[categoryName].push(...categoryItems)
	})

	// Сортуємо імена категорій за алфавітом
	const sortedCategoryNames = Object.keys(groupedData).sort()

	return (
		<>
			{sortedCategoryNames.map((categoryName) => (
				<Accordion key={categoryName}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography variant='h6' fontSize={18}>
							{categoryName}
						</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{ padding: '0px 16px 16px' }}>
						<ListDividers items={groupedData[categoryName]} />
					</AccordionDetails>
				</Accordion>
			))}
		</>
	)
}
