import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'
import Script from 'next/script'

const noAuthRequired = ['/', '/login', 'recuperarclave', '/preguntasfrecuentes', '/registro']

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


import React from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'

import createEmotionCache from '../utility/createEmotionCache'
import lightTheme from '../styles/theme/lightTheme'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AuthContextProvider>
        <Script 
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-H1X3SPW9P1" 
        />
        <Script id="my-script" strategy="lazyOnload">
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
  );
};

export default MyApp