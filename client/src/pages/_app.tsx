// pages/_app.tsx

import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache, Global } from '@emotion/react'
import theme from '../theme'
import createEmotionCache from '../createEmotionCache'
import SmoothScroll from '@/components/scrollToHide/smoothScroll'
const globalStyles = require('../styles/globals.css')
import { Provider, useDispatch } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { store } from '../store'
import { loginSuccess } from '@/store/slice/authSlice'
import { check } from './api/user/signin'
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache
}

const wrapper = createWrapper(() => store)

function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
	const dispatch = useDispatch()

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await check()
				// localStorage.setItem('token', data.token)
				console.log('_app', data)
				// dispatch(loginSuccess(data))
			} catch (error) {
				// Обработка ошибки проверки токена
			}
		}

		fetchData()
	}, [dispatch])
	return (
		<Provider store={store}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>

				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					{/* <SmoothScroll /> */}
					<Global styles={globalStyles} />
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</Provider>
	)
}

// const makeStore = () => store

export default wrapper.withRedux(MyApp)
