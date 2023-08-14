import AppMenu from '@/components/navigation/appMenu'
import CustomizedBreadcrumbs from '@/components/navigation/breadcrumbs'
import { Product, selectProduct } from '@/store/slice/productSlice'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Categories from './categories'
import ProductOnePage from './product'

interface ProductPageProps {
	hasPage: boolean
}

export default function ProductPage() {
	const router = useRouter()
	const { slug } = router.query as { slug: string[] }
	const { asPath } = router as { asPath: string }

	const products = useSelector(selectProduct)
	const id = slug !== undefined ? +slug[0] : undefined
	const product =
		id !== undefined ? products.find((obj) => obj.id === id) : undefined

	// console.log(router)
	if (asPath === '/categories') {
		return <Categories />
	}
	if (id !== undefined && product === undefined) {
		return <h1>Страница не найдена 12 </h1>
	}
	// categoryRoute = { router }
	return (
		<>
			{product !== undefined && (
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
					<ProductOnePage product={product} />
				</Container>
			)}
		</>
	)
}
