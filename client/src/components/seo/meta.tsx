import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { Imeta } from './meta.interface'

const Meta: FC<PropsWithChildren<Imeta>> = ({
	title,
	description,
	children,
}) => {
	const getTile = (title: string) => `${title} | Зефірна Магія`
	console.log(description ? 'es' : 'no')
	return (
		<>
			<Head>
				{getTile(title)}
				{description ? (
					<>
						<meta name='description' content={description} />
						<meta name='od:title' content={getTile(title)} />
						<meta name='od:description' content={description} />
					</>
				) : (
					// <meta name='robots' content='noindex nofollow' />
					<meta name='noname' />
				)}
			</Head>
			{children}
		</>
	)
}
export default Meta
