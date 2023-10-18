import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Custom404 = () => {
	const router = useRouter()
	useEffect(() => {
		setTimeout(() => {
			router.push('/')
		}, 3000)
	}, [router])
	return <h3>404 - Сторінку не знайдено</h3>
}

export default Custom404
