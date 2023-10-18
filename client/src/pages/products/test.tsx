import { useRouter } from 'next/router'

import Categories from '.'

import { wrapper } from '@/store/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) => async (ctx) => {
		console.log(store.getState())
		return {
			props: {},
		}
	})

export default function ProductPage(
	props: any
): InferGetServerSidePropsType<typeof getServerSideProps> {
	const router = useRouter()
	const { slug } = router.query as { slug: string[] }
	const { asPath } = router as { asPath: string }

	const products = [{ id: 1 }]
	const id = slug !== undefined ? +slug[0] : undefined
	const product =
		id !== undefined ? products.find((obj) => obj.id === id) : undefined

	if (asPath === '/categories') {
		return <Categories />
	}
	if (id !== undefined && product === undefined) {
		return <h1>Страница не найдена 12 </h1>
	}

	return (
		<>
			<h1> Здесь будет один продукт </h1>
		</>
	)
}
