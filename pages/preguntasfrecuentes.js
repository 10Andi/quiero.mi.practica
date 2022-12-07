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
      title: '¿Es necesario el conocimiento previo en informática o computación para operar la plataforma web?',
      paragraph: 'QuieroMiPráctica está creado para que cualquier persona pueda utilizar nuestra plataforma, ya que es intuitiva y simple para navegar.'
    },
    {
      title: '¿Cuánto tardará una postulación',
      paragraph: 'Eso dependerá de la empresa a la cual postules. Este proceso no afecta en que puedas postular a nuevas ofertas que QuieroMiPráctica te puede ofrecer.'
    },
    {
      title: '¿Cómo postulo a una práctica?',
      paragraph: 'Para postular en QuieroMiPráctica tienes que registrarte como Profesional, luego seleccionar la oferta que más te guste!'
    },
    {
      title: '¿Cómo puedo comunicarme para conseguir asistencia?',
      paragraph: 'Te puedes comunicar con el equipo de QuieroMiPráctica a través del botón Ayuda o tambien puedes escribirnos a hola@quieromipractica.cl'
    },
    {
      title: '¿Qué requisitos necesita una empresa para registrarse?',
      paragraph: 'Las empresas asociadas a QuieroMiPráctica están verificadas por el equipo a cargo y ante el SII, verificando que la empresa existe y es legal.'
    },
    {
      title: '¿Cuantas ofertás labores puedo publicar?',
      paragraph: 'Si tiene el plan Free tendras publicaciones limitadas. El plan premium te ofrece ilimitadas públicaciones y más herramientas como nuestra base de talentos.'
    },
    {
      title: '¿Qué es la Base de Talentos?',
      paragraph: 'La base de talentos ofrece a los estudiantes que resaltán dentro de los procesos de práctica, de esta forma potenciamos la contrataciones de buenos talentos a empresas interesadas'
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
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            grid-column-gap: 0px;
            grid-row-gap: 0px;
            padding: 0 120px;
            justify-items: center;
            margin-top: 120px;
          }
        `}
      </style>
    </>
  )
}
