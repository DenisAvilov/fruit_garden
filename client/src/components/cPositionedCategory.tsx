import * as React from 'react'
import { Box } from '@mui/system'
import Link from './../components/cCustomLink'

import { useRouter } from 'next/router'
export default function FooterCategory() {
	const { pathname } = useRouter()
	const pages = [{ path: '', name: '' }]

	return (
		<Box>
			{pages.map(({ path, name }) => (
				<Link
					href={path}
					key={name}
					style={path === pathname ? 'active' : 'none'}
					// className={path === pathname ? 'active' : 'none'}
				>
					{name}
				</Link>
			))}
		</Box>
	)
}
