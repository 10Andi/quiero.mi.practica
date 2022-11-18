import Script from 'next/script'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return (
//     <AuthContextProvider>
//       <Script
//         strategy="lazyOnload"
//         src="https://www.googletagmanager.com/gtag/js?id=G-H1X3SPW9P1"
//       />
//       <Script id="my-script" strategy="lazyOnload">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());

//           gtag('config', 'G-H1X3SPW9P1');
//         `}
//       </Script>
//       <Component {...pageProps} />
//     </AuthContextProvider>
//   )
// }

// export default MyApp

import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

import lightTheme from '../styles/theme/lightTheme'
import createEmotionCache from '../utility/createEmotionCache'

// const noAuthRequired = ['/', '/login', 'recuperarclave', '/preguntasfrecuentes', '/registro']

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AuthContextProvider>
          <Script
            strategy='lazyOnload'
            src='https://www.googletagmanager.com/gtag/js?id=G-H1X3SPW9P1'
          />
          <Script id='my-script' strategy='lazyOnload'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', 'G-H1X3SPW9P1');
          `}
          </Script>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
