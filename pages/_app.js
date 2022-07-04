import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'

const noAuthRequired = ['/', '/login', 'recuperarclave', '/preguntasfrecuentes', '/registro']

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
