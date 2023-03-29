import * as React from 'react'
import MyLink from '@/Link'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import CustomSearch from './cSearch'
import { Avatar, ListItemAvatar, Slide, useScrollTrigger } from '@mui/material'
import PositionedCategory from './cPositionedCategory'
import theme from '@/theme'
import Link from './../components/cCustomLink'
export const BrighterIconButton = styled(IconButton)(({ theme }) => ({
	'&:hover': {
		backgroundColor: theme.palette.primary.main,
	},
}))

export default function AppMenu(props: any) {
	// console.log('children :' + children, +' ' + 'window :' + window)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null)

	const isMenuOpen = Boolean(anchorEl)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const menuId = 'primary-search-account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			id={menuId}
			keepMounted
			// transformOrigin={{
			// 	vertical: 'bottom',
			// 	horizontal: 'left',
			// }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link href={'/app/signUp'}>
				<MenuItem onClick={handleMenuClose}>Реєстрація</MenuItem>
			</Link>
			<Link href='/app/signIn'>
				<MenuItem onClick={handleMenuClose}>Вхід</MenuItem>
			</Link>
		</Menu>
	)

	const mobileMenuId = 'primary-search-account-menu-mobile'
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<BrighterIconButton
					size='large'
					aria-label='show 4 new mails'
					color='inherit'
				>
					<Badge badgeContent={0} color='error'>
						<SearchIcon />
					</Badge>
				</BrighterIconButton>
				<p>Search</p>
			</MenuItem>
			<MenuItem>
				<BrighterIconButton
					size='large'
					aria-label='show 17 new notifications'
					color='inherit'
				>
					<Badge badgeContent={10} color='error'>
						<ShoppingCartOutlinedIcon color='secondary' />
					</Badge>
				</BrighterIconButton>
				<p>Shopping</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<BrighterIconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='secondary'
				>
					<InsertEmoticonOutlinedIcon />
				</BrighterIconButton>
				<p>Вхід</p>
			</MenuItem>
		</Menu>
	)

	const logoImg = '/LOGO.svg'

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar
					position='fixed'
					elevation={1}
					sx={{
						top: 0,
						left: 0,
						width: '100%',
						margin: '0 auto',
						zIndex: 1,
						maxWidth: '1200px',
						borderBottomLeftRadius: '7px',
						borderBottomRightRadius: '7px',
					}}
				>
					<Toolbar>
						<Box component={'a'} href={'#'} sx={{ marginRight: 2.5 }}>
							<Avatar
								alt='Profile Picture'
								src={logoImg}
								sx={{ height: 50, width: 200, borderRadius: 0 }}
							/>
						</Box>
						<PositionedCategory />
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: 'none', md: 'flex', pl: '2' } }}>
							<CustomSearch />
							<BrighterIconButton
								size='large'
								aria-label='show 17 new notifications'
								color='secondary'
								sx={{
									'&:hover': {
										backgroundColor: `${theme.palette.secondary.light}`,
									},
								}}
							>
								<Badge badgeContent={10} color='error'>
									<ShoppingCartOutlinedIcon />
								</Badge>
							</BrighterIconButton>

							<BrighterIconButton
								size='large'
								edge='end'
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								onClick={handleProfileMenuOpen}
								color='secondary'
								sx={{
									'&:hover': {
										backgroundColor: `${theme.palette.secondary.light}`,
									},
								}}
							>
								<InsertEmoticonOutlinedIcon />
							</BrighterIconButton>
						</Box>
					</Toolbar>
				</AppBar>

				{renderMobileMenu}
				{renderMenu}
			</Box>
		</>
	)
}
