import Footer from '../componets/footer'
import Nav from '../componets/nav'

export default function Contacto () {
  return (
    <>
      <section className='container'>
        <Nav />
        <div>
          <h2>Contactanos</h2>

        </div>
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
