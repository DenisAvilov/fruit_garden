import * as React from 'react'
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
import CustomSearch from '../cSearch'
import {
	Avatar,
	Button,
	ClickAwayListener,
	Grow,
	MenuList,
	Paper,
	Popper,
} from '@mui/material'
import PositionedCategory from '../cPositionedCategory'
import theme from '@/theme'
import Link from '../cCustomLink'
import MenuIcon from '@mui/icons-material/Menu'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useRouter } from 'next/router'
import { logOut } from '@/pages/api/user/signin'
// import styles from './../../styles/menu.module.scss'
import BasicAccordion from '../accordion'
import { CategoryAndSubCategories } from '@/pages/api/category/category.interface'

export const BrighterIconButton = styled(IconButton)(({ theme }) => ({}))

interface Categories {
	categories: CategoryAndSubCategories[]
}

const AppMenu: React.FC = () => {
	// console.log('categories', categories)

	/* {categories.map((category) => (
					<li key={category.id}>{category.name}</li>
				))} */

	const router = useRouter()

	const basketRoute = () => {
		router.push('/basket')
	}

	const data = {
		userId: 1,
		role: 'ADMIN',
		email: 'string',
		isActivated: true,
	}

	const status = false

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [anchorBurger, setAnchorBurger] = React.useState<null | HTMLElement>(
		null
	)

	const isMenuOpen = Boolean(anchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const burgerClose = () => {
		setAnchorBurger(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		burgerClose()
	}

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			keepMounted
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link
				href={
					data?.role === 'ADMIN'
						? '/admin'
						: data?.role === 'USER'
						? '/user'
						: '/registration'
				}
			>
				<MenuItem onClick={handleMenuClose}>
					{status ? 'Мій кабінет' : 'Реєстрація'}
				</MenuItem>
			</Link>

			{status ? (
				<Link href='/'>
					<MenuItem
						onClick={() => {
							logOut()
							const iUser = {
								userId: 0,
								role: 'USER',
								email: ' ',
								isActivated: false,
							}
						}}
					>
						Вихід
					</MenuItem>
				</Link>
			) : (
				<Link href='/login'>
					<MenuItem onClick={handleMenuClose}>Вхід</MenuItem>
				</Link>
			)}
		</Menu>
	)

	const logo = '/logo.svg'

	const [isOpen, setIsOpen] = React.useState(false)

	//START
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef<HTMLButtonElement>(null)

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
		setIsOpen(!isOpen)
	}

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return
		}

		setOpen(false)
	}

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		} else if (event.key === 'Escape') {
			setOpen(false)
		}
	}
	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open)
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus()
		}

		prevOpen.current = open
	}, [open])

	// Данні про категорії

	type Category = {
		name: string
		href: string
		id: number
	}

	type DataItem = {
		[key: string]: Category[]
	}

	const category: DataItem[] = [
		{
			Зефір: [
				{
					name: 'Класичний',
					href: 'https://посилання-на-зефір-з-полуничкою.com',
					id: 0,
				},
				{
					name: 'Зефір зі смаком малини',
					href: 'https://посилання-на-зефір-з-малиною.com',
					id: 1,
				},
				{
					name: 'Зефір зі смаком апельсина',
					href: 'https://посилання-на-зефір-з-апельсином.com',
					id: 2,
				},
			],
		},
		{
			Букети: [
				{
					name: 'Зефір зі смаком полуниці',
					href: 'https://посилання-на-зефір-з-полуничкою.com',
					id: 4,
				},
				{
					name: 'Зефір зі смаком малини',
					href: 'https://посилання-на-зефір-з-малиною.com',
					id: 5,
				},
				{
					name: 'Зефір зі смаком апельсина',
					href: 'https://посилання-на-зефір-з-апельсином.com',
					id: 6,
				},
			],
		},
	]

	return (
		<>
			<AppBar sx={{ position: 'static' }}>
				<Toolbar>
					<IconButton
						ref={anchorRef}
						size='large'
						edge='start'
						color='inherit'
						aria-label='Зефірна магія'
						id='composition-button'
						aria-controls={open ? 'composition-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-haspopup='true'
						onClick={handleToggle}
					>
						{open ? <CloseOutlinedIcon /> : <MenuIcon />}
					</IconButton>
					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						placement='bottom-start'
						transition
						disablePortal
						sx={{
							'&.MuiPopper-root': {
								zIndex: 1,
								transform: 'translate3d(2px, 73.6px, 0px)!important',
							},
						}}
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
										placement === 'bottom-start' ? 'left top' : 'left bottom',
									width: '99vw',
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={handleClose}>
										<MenuList
											autoFocusItem={open}
											id='composition-menu'
											aria-labelledby='composition-button'
											onKeyDown={handleListKeyDown}
											sx={{ paddingBottom: '175px' }}
										>
											<BasicAccordion data={category} />
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>

					<Box onClick={() => router.push('/')}>
						<Link href='/' key='Zefirna magia'>
							<Avatar
								alt='Profile Picture'
								src={logo}
								sx={{ height: 60, width: 60, borderRadius: 0 }}
							/>
						</Link>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { md: 'flex' } }}>
						{/* <CustomSearch /> */}
						<BrighterIconButton
							size='large'
							aria-label='Карзина'
							color='secondary'
							onClick={() => basketRoute()}
						>
							<Badge badgeContent={10} color='error'>
								<ShoppingCartOutlinedIcon />
							</Badge>
						</BrighterIconButton>

						<BrighterIconButton
							size='large'
							edge='end'
							aria-label='Вхід в акаунт корестувача'
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='secondary'
						>
							<InsertEmoticonOutlinedIcon />
						</BrighterIconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMenu}
		</>
	)
}

export default AppMenu
