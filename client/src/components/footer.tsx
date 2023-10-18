import { AppBar, Toolbar } from '@mui/material'
import FooterCategory from './../components/footerCategory'

const Footer = () => {
	return (
		<>
			<AppBar sx={{ position: 'static' }}>
				<Toolbar>
					<FooterCategory />
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Footer
