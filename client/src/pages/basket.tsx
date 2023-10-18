import BasketComponent from '@/components/basket/basketComponent'
import AppMenu from '@/components/navigation/menu'
import CustomizedBreadcrumbs from '@/components/navigation/breadcrumbs'
// import { selectStatus } from '@/store/slice/authSlice'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Basket: React.FC = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	// const status = useSelector(selectStatus)
	const status = true

	if (status) {
		router.push('/')
		return null
	}
	return (
		<>
			<Container
				maxWidth='lg'
				sx={{
					position: 'relative',
					zIndex: 2,
					paddingBottom: '40px',
				}}
			>
				<AppMenu sx={{}} />
				<CustomizedBreadcrumbs />
				<BasketComponent />
			</Container>
		</>
	)
}

export default Basket
