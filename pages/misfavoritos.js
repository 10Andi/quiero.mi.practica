import { useRouter } from 'next/router'
import DetailedOffert from '../componets/detailedoffert'
import FavoritesListOffers from '../componets/listoffers/favoriteslistoffers'
import Menu from '../componets/menu'
import { useAuth } from '../context/AuthContext'
import { OffertContextProvider } from '../context/offertContext'

export default function MisFavoritos () {
  const { user } = useAuth()
  const router = useRouter()

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'estudiante') {
    router.push('/login')
    return
  }

  return (
    <>
      <section>
        <Menu />
        <OffertContextProvider>
          <FavoritesListOffers />
          <DetailedOffert />
        </OffertContextProvider>
      </section>

      <style jsx>{`
          section {
            height: 100vh;
            padding: 0 42px;
            padding: 0 200px;
            display: grid;
            grid-template-columns: .7fr 2fr 1.1fr;
            //grid-template-columns: 1fr 2fr 1.3fr;
          }
          {/* rgb(247, 249, 249) */}
        `}
      </style>
    </>
  )
}
