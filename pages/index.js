import Categories from '../componets/categories'
import Footer from '../componets/footer'
import Hero from '../componets/hero'
import Nav from '../componets/nav'
import ReacentsPublications from '../componets/reacentspublications/index'
import Searchbar from '../componets/searchbar'
import ShowCompanies from '../componets/showcompanies'
// import { useAuth } from '../context/AuthContext'

export default function Landing () {
  // const { logOut } = useAuth()
  return (
    <>
      <section className='container'>
        <Nav />
        {/* <button onClick={logOut}>CERRAR SESION</button> */}
        <Hero />
        <Searchbar />
        <ShowCompanies />
        <Categories />
        <ReacentsPublications />
      </section>
      <Footer />

      <style jsx>{`
                .container {
                    padding: 0 42px;
                    margin-bottom: 100px;
                }
            `}
      </style>
    </>
  )
}
