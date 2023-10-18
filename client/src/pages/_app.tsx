import Head from 'next/head'
import * as React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache, Global } from '@emotion/react'
import theme from '../theme'
import createEmotionCache from '../createEmotionCache'
import { wrapper } from '../store' // Импортируйте wrapper из вашего файла index.ts
import { Provider } from 'react-redux' // Импортируйте Provider из Redux Toolkit
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
const clientSideEmotionCache = createEmotionCache()
import '../styles/globals.scss'

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

const App = ({ Component, ...rest }: MyAppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest)
	const { emotionCache = clientSideEmotionCache, pageProps } = props
	const { pathname } = useRouter()

	const routes = ['/registration', '/login', '/lending']

	return (
		<Provider store={store}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>

				<ThemeProvider theme={theme}>
					<CssBaseline />
					{routes.includes(pathname) ? (
						<Component {...pageProps} />
					) : (
						<Layout>
							<Component {...pageProps} />
						</Layout>
					)}
				</ThemeProvider>
			</CacheProvider>
		</Provider>
	)
}

export default App
