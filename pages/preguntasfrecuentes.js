import CardRequest from '../componets/cardrequest'
import Footer from '../componets/footer'
import Nav from '../componets/nav'
import Title from '../componets/title'

const contents = {
  tittle: {
    text: 'FAQ - ',
    textHighlight: 'Preguntas frecuentes'
  },
  card: [
    {
      title: '¿Por qué utilizar está plataforma?',
      paragraph: 'QUIEROMIPRÁCTICA está pensado para los estudiantes, ya que queremos que consigas la mayor ayuda posible para conseguir tu práctica, contamos con un sistema de bookmark para guardar tus practicas favoritas, un sistema de valorización de empresas y un sistema de reseñas hecho por los mismos practicantes. Con esto te ofrecemos un feedback hecho por y para estudiantes para poder ayudarte a encontrar tu mejor pasantía posible.'
    },
    {
      title: '¿Cómo publico una oferta de trabajo?',
      paragraph: 'Primero tienes que registrar tu empresa , luego seleccionar un plan más conveniente y finalmente pagar para publicar tu oferta.'
    },
    {
      title: '¿Cómo postulo a una práctica?',
      paragraph: 'Primero tienes que crearte una cuenta de estudiante y luego seleccionar la práctica que más te guste.'
    },
    {
      title: '¿Cómo puedo comunicarme para conseguir asistencia?',
      paragraph: 'Lo que tienes que hacer es ir a la sección de contacto que está en la parte inferior de nuestra página web.'
    },
    {
      title: '¿Por qué solamente pasantías de área informática?',
      paragraph: 'Para comenzar con nuestro proyecto solamente vamos a incluir informática, pero en un futuro no muy lejano, vamos a incluir otras áreas.'
    },
    {
      title: '¿En qué consiste el proceso de moderación?',
      paragraph: 'La empresa contratante siempre debe identificarse. En QUIEROMIPRÁCTICA las empresas reclutadoras siempre deben identificar la empresa final en la cual trabajará el profesional.'
    },
    {
      title: '¿Cómo recupero mi contraseña?',
      paragraph: 'Para recuperar tu contraseña lo único que tienes que hacer es ir al apartado “olvidaste tu contraseña” en la página de inicio de sesión, a lo cual te pedirá tu correo electrónico para enviarte los datos de recuperación...'
    }
  ]

}

export default function PreguntasFrecuentes () {
  return (
    <>
      <section className='container'>
        <Nav />
        <Title text={contents.tittle.text} textHighlight={contents.tittle.textHighlight} />
        <div className='card-request-container'>
          {contents.card.map(content =>
            <CardRequest key={content.title} title={content.title} paragraph={content.paragraph} />
          )}
        </div>
      </section>
      <Footer />

      <style jsx>{`
          .container {
            padding: 0 42px;
          }
          .card-request-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 120px;
          }
        `}
      </style>
    </>
  )
}
