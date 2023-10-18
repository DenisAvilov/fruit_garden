import { FC, ReactNode } from 'react'
import AppMenu from './navigation/menu'
import Footer from './footer'
import styles from './../styles/layout.module.scss'
import { CategoryAndSubCategories } from '@/pages/api/category/category.interface'

interface LayoutI {
	children: ReactNode
}

const Layout: FC<LayoutI> = ({ children }) => {
	return (
		<div className={styles.root}>
			<div>
				<AppMenu />
			</div>
			<section>{children}</section>
			<section>
				<Footer />
			</section>
		</div>
	)
}

export default Layout
