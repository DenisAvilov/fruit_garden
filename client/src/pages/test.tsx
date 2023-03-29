// import Link from '../components/LinkGPT'
// import Link from 'next/link'
import CustomLink from '../components/cCustomLink'
// import Link from '@mui/material/Link'
import React from 'react'
import AnimeSound from '../components/buttunAnime/animeSound'

const Test: React.FC = () => {
	const out = () => {
		console.log('out')
	}
	const move = () => {
		console.log('move')
	}
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
