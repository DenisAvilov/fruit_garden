import * as React from 'react'
import style from './overflowTopY.module.scss'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined'
import theme from '@/theme'
type TitlebarImage = {
	onMouseLeave?: () => void
}

const TitlebarImageList: React.FC<TitlebarImage> = ({ onMouseLeave }) => {
	return (
		<ImageList
			sx={{ width: 250, height: '100vh', marginTop: 0 }}
			className={style.scrollbar}
			onMouseLeave={onMouseLeave}
		>
			<ImageListItem cols={4}>
				<ListSubheader
					component='div'
					sx={{
						textAlign: 'center',
						textTransform: 'uppercase',
						color: theme.palette.text.primary,
						fontSize: theme.typography.h6,
						backgroundColor: theme.palette.primary.main,
						fontWeight: 500,
					}}
				>
					СОЛОдощі
				</ListSubheader>
			</ImageListItem>
			{itemData.map((item) => (
				<ImageListItem key={item.img} cols={4} className={style.zoomIn}>
					<a href={item.href} className={style.grow}>
						<img
							src={`${item.img}?w=248&fit=crop&auto=format`}
							srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
							alt={item.title}
							loading='lazy'
						/>
					</a>
					<ImageListItemBar
						title={item.title}
						subtitle={item.author}
						actionIcon={
							<IconButton
								sx={{
									color: '#ffffff',
									'&:hover': {
										color: theme.palette.secondary.light,
									},
								}}
								aria-label={`Детальниши про ${item.title}`}
							>
								<InfoIcon />
							</IconButton>
						}
					/>
				</ImageListItem>
			))}
			<ImageListItem cols={4}>
				<ListSubheader
					component='div'
					sx={{
						textAlign: 'center',
						textTransform: 'uppercase',
						color: theme.palette.text.primary,
						fontSize: theme.typography.h6,
						backgroundColor: theme.palette.primary.main,
						fontWeight: 500,
					}}
				>
					Кінец списку
				</ListSubheader>
			</ImageListItem>
		</ImageList>
	)
}
export default TitlebarImageList
const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		title: 'Зефір',
		author: '@зефірлимоний',
		rows: 1,
		cols: 1,
		featured: true,
		href: 'zefir',
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
		author: '@rollelflex_graphy726',
		href: 'zefir/1',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
		author: '@helloimnik',
		href: 'zefir/2',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
		author: '@nolanissac',
		cols: 2,
		href: 'zefir/3',
	},
	{
		img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
		title: 'Hats',
		author: '@hjrc33',
		cols: 2,
	},
	{
		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
		title: 'Honey',
		author: '@arwinneil',
		rows: 2,
		cols: 2,
		featured: true,
	},
	{
		img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
		title: 'Basketball',
		author: '@tjdragotta',
	},
	{
		img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
		title: 'Fern',
		author: '@katie_wasserman',
	},
	{
		img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
		title: 'Mushrooms',
		author: '@silverdalex',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
		title: 'Tomato basil',
		author: '@shelleypauls',
	},
	{
		img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
		title: 'Sea star',
		author: '@peterlaster',
	},
	{
		img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
		title: 'Bike',
		author: '@southside_customs',
		cols: 2,
	},
]
