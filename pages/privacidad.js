import Footer from '../componets/footer'
import Nav from '../componets/nav'
import Title from '../componets/title'

const contents = {
  tittle: {
    text: 'Privacidad y protección de ',
    textHighlight: 'datos personales'
  },
  card: [
    {
      title: 'Definiciones clave',
      paragraph: `QUIEROMIPRÁCTICA: Somos una organización destinada a entregar un servicio que es brindar pasantías a los estudiantes del área tecnológica.
      Los Servicios: Todos los servicios provistos por QUIEROMIPRÁCTICA, sitio web, servicios API, aplicaciones y otros, tanto los públicos y abiertos como los que requieren un registro de usuario.
      Organización publicante: Entidad de cualquier índole que oferta una vacante de empleo en QUIEROMIPRÁCTICA. En dicha denominación incluimos también a reclutadores que actúan de forma individual en nombre de una empresa, y las cuentas de miembros de equipo que actúan en nombre de la organización y que pueden o no tener una relación de vínculo laboral o contractual con ella.
      Profesional postulante: Persona natural que postula a una vacante de pasantía publicada en QUIEROMIPRÁCTICA, o que se registra en QUIEROMIPRÁCTICA con dicha intención. En adelante, podremos referirnos también a un profesional postulante como "pasante", "candidato" o "postulante".
      Empleo: Oferta o vacante laboral compartida públicamente por una organización, y que incluye una convocatoria a personas calificadas a postular. Dicha convocatoria puede tener requerimientos o restricciones relacionadas con el perfil profesional, la ubicación geográfica o la situación migratoria de los candidatos.
      Postulación: Comunicación de un usuario hacia una organización, manifestando su interés por un empleo y compartiendo información personal y profesional que permita a la organización evaluar la candidatura. "Postular" incluye tanto el llenado de formularios de postulación, así como la aceptación de invitaciones directas enviadas por una empresa.
      `
    },
    {
      title: '¿Qué datos recopilamos?',
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

export default function Privacidad () {
  return (
    <>
      <section className='container'>
        <Nav />
        <Title text={contents.tittle.text} textHighlight={contents.tittle.textHighlight} />
        <div className='card-request-container'>
          <div className='card-request'>
            <h3 className='titulo'>Definiciones clave</h3>
            <p className='parrafo'><span className='dot'>· QUIEROMIPRÁCTICA:</span> Somos una organización destinada a entregar un servicio que es brindar pasantías a los estudiantes del área tecnológica.</p>
            <p className='parrafo'><span className='dot'>· Los Servicios:</span> Todos los servicios provistos por QUIEROMIPRÁCTICA, sitio web, servicios API, aplicaciones y otros, tanto los públicos y abiertos como los que requieren un registro de usuario.</p>
            <p className='parrafo'><span className='dot'>· Organización publicante:</span> Entidad de cualquier índole que oferta una vacante de empleo en QUIEROMIPRÁCTICA. En dicha denominación incluimos también a reclutadores que actúan de forma individual en nombre de una empresa, y las cuentas de miembros de equipo que actúan en nombre de la organización y que pueden o no tener una relación de vínculo laboral o contractual con ella.</p>
            <p className='parrafo'><span className='dot'>· Profesional postulante:</span> Persona natural que postula a una vacante de pasantía publicada en QUIEROMIPRÁCTICA, o que se registra en QUIEROMIPRÁCTICA con dicha intención. En adelante, podremos referirnos también a un profesional postulante como "pasante", "candidato" o "postulante".</p>
            <p className='parrafo'><span className='dot'>· Empleo:</span> Oferta o vacante laboral compartida públicamente por una organización, y que incluye una convocatoria a personas calificadas a postular. Dicha convocatoria puede tener requerimientos o restricciones relacionadas con el perfil profesional, la ubicación geográfica o la situación migratoria de los candidatos.</p>
            <p className='parrafo'><span className='dot'>· Postulación:</span> Comunicación de un usuario hacia una organización, manifestando su interés por un empleo y compartiendo información personal y profesional que permita a la organización evaluar la candidatura. "Postular" incluye tanto el llenado de formularios de postulación, así como la aceptación de invitaciones directas enviadas por una empresa.</p>
          </div>
        </div>
      </section>
      <Footer />

      <style jsx>
        {`
          .container {
            padding: 0 42px;
          }
          .card-request-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 78px;
          }
          .card-request {
            border-radius: 10px;
            background: #F8F1FF;
            padding: 12px 40px 40px 40px;
            width: 80%;
            margin-bottom: 60px;
          }
          .card-request h3{
            font-size: 24px;
            color: #000000;
            margin-bottom: 40px;
          }
          .card-request label {
            font-size: 18px;
            font-weight: bold;
            color: #444;
          }
          .card-request p {
            font-size: 18px;
            color: #444;
            text-align: start;
            margin: 0;
            width: 100%;
            margin: 10px 0;
          }
          .card-request p span {
            font-size: 18px;
            font-weight: bold;
            color: #444;
          }
          .dot {
            font-size: 24px;
            font-weight: bolder;
            color: #000;
          }
        `}
      </style>
    </>
  )
}
