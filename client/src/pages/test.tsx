// import Link from '../components/LinkGPT'
// import Link from 'next/link'
import CustomLink from '../components/cCustomLink'
// import Link from '@mui/material/Link'
import React from 'react'
import AnimeSound from '../components/buttunAnime/animeSound'
import { useDispatch, useSelector } from 'react-redux'

const Test: React.FC = () => {
	const out = () => {}
	const move = () => {}

	const dispatch = useDispatch()

	return (
		<>
			<h1>Привет, я функциональная компонента</h1>
			<CustomLink href='/'>
				<h2>Home My Link</h2>
			</CustomLink>
			<div></div>
			<CustomLink href='/'>
				<h3>Home My Live</h3>
			</CustomLink>
			<div>LINIU</div>

			<AnimeSound onMouseEnter={move} onMouseLeave={out} />
		</>
	)
}

export default Test
