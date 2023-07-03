import React, { useState, useRef, useEffect } from 'react'
import Badge from '@mui/material/Badge'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { BrighterIconButton } from './navigation/appMenu'
import theme from '@/theme'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.8),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.8),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: theme.palette.text.primary,
	// '&:hover': {
	// 	backgroundColor: '#000000',
	// },
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',

		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))

const CustomSearch: React.FC = () => {
	const [showInput, setShowInput] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const toggle = (): void => {
		setShowInput(!showInput)
	}

	const handleClickOutside = (event: MouseEvent): void => {
		if (
			inputRef.current &&
			!inputRef.current.contains(event.target as Node) &&
			!(event.target as HTMLElement).closest('.MuiIconButton-root')
		) {
			setShowInput(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		if (showInput && inputRef.current) {
			inputRef.current.focus()
		}
	}, [showInput])

	const handleSearch = (): void => {
		if (inputRef.current?.value) {
			console.log('Запрос отправлен:', inputRef.current.value)
		}
	}

	return (
		<>
			<Search>
				{showInput ? (
					<StyledInputBase
						placeholder='Пошук солодощей…'
						inputProps={{ 'aria-label': 'search' }}
						inputRef={inputRef}
						onKeyUp={(event) => {
							if (event.key === 'Enter') {
								handleSearch()
							}
						}}
					/>
				) : null}
			</Search>
			<BrighterIconButton
				size='large'
				aria-label='search'
				color='secondary'
				sx={{
					'&:hover': { backgroundColor: `${theme.palette.secondary.light}` },
				}}
				onClick={() => {
					if (inputRef.current?.value) {
						handleSearch()
					} else {
						toggle()
					}
				}} // Call the toggle function here
			>
				<Badge badgeContent={0} color='error'>
					<SearchOutlinedIcon />
				</Badge>
			</BrighterIconButton>
		</>
	)
}

export default CustomSearch
