import Footer from '../componets/footer'
import Nav from '../componets/nav'

export default function SobreNosotros () {
  return (
    <>
      <section className='container'>
        <Nav />
        <div className='sobreNosotrosContainer'>
          <h1>La primera iniciativa estudiantil para <span>buscar prácticas a los estudiantes</span></h1>
          <div className='imagenes-sobrenosotros'>
            <img className='img-izquierda' src='/img-izquierda.jpeg' alt='' draggable='false' />
            <img className='img-centro-arriba' src='/img-centro-arriba.jpeg' alt='' draggable='false' />
            <img className='img-centro-abajo' src='/img-centro-abajo.jpeg' alt='' draggable='false' />
            <img className='img-derecha' src='/img-derecha.jpeg' alt='' draggable='false' />
          </div>
          {/* <h1>Nuestra <span>historia</span></h1>
          <p>Nosotros somos estudiantes de Inacap que escogimos crear un proyecto para un ramo universitario el cual consiste en ayudar a los estudiantes informáticos en busca de prácticas, y a empresas que requieran practicantes. Empezamos modelando nuestro esquema haciéndonos preguntas tales como, ¿Qué es lo que busca una empresa de un practicante?, ¿Por qué a los estudiantes informáticos en Chile les cuesta encontrar su práctica laboral?, Etc. Con estas preguntas y haciendo encuestas, llegamos a la respuesta y solución de realizar nuestro proyecto llamado QUIERO MI PRÁCTICA. Llevamos ya 5 meses realizando esto y queremos abarcar gran parte de estudiantes y empresas, es por eso que estamos trabajando arduamente para poder presentarlo finalmente.</p> */}
          <h1>Nuestra <span>Historia</span></h1>
          <p>Fundada en 2021, la organización a cargo de “QuieroMiPráctica” cuenta con 4 estudiantes en busca del desarrollo de un emprendimiento plasmado en una aplicación web, la cual en la actualidad aun no cuenta con estadísticas como renta, inversión y producción, tampoco bienes inmuebles tales como sedes o sucursales debido al corto periodo de tiempo que lleva operando.</p>
          <h1>Mi<span>sión</span></h1>
          <p>La inserción laboral no tiene por qué ser un mundo desconocido, los primeros pasos no tienen que estar cubiertos de incertidumbre, convertir una plataforma en una comunidad creadora de conexiones en el ámbito laboral. Promover la valoración de los talentos “juniors” en el área de la tecnología.</p>
          <h1>Vi<span>sión</span></h1>
          <p>Crear oportunidades laborales que aumenten el crecimiento de manera exponencial. Aplica para empresas y estudiantes.</p>
          <h1>Futuro <span>& Sociedad</span></h1>
          <p>Quiero Mi Practica cree en el talento de los jóvenes, pero se debe trabajar para que se conviertan en profesionales. Se quiere lograr realizar un sentido de responsabilidad social y una visión de aumentar la experiencia en el talento de los estudiantes, se espera que las prácticas profesionales adecuadas contribuyan y aumenten la inserción laboral. Unir mentores capaces de incentivar el interés y desarrollo de un profesional en entrenamiento. Se cree en las ventajas de la era tecnológica y el provecho que puede significar juntar personas que puedan enseñar y guiar a otras que tengan ambición de aprendizaje y crecimiento.</p>
          <h1>Va<span>lores</span></h1>
          <p>Inspirar un futuro con inserción laboral sin experiencia.</p>
          <p>Generar equipos de trabajo en pro del crecimiento colectivo.</p>
          <p>Vincular a los mejores con los mejores.</p>
          <p>Impulsar el crecimiento profesional.</p>
          <h1>Somos<span>QuieroMiPráctica</span></h1>
        </div>
      </section>
      <Footer />

      <style jsx>
        {`
          .container {
            padding: 0 42px;
            margin-bottom: 100px;
          }
          .sobreNosotrosContainer h1 {
            font-size: 48px;
            text-align: center;
            margin-bottom: 25px;
            width: 830px;
            margin: auto;
          }
          .sobreNosotrosContainer span {
            font-size: 48px;
            font-weight: bold;
            color: #473198;
          }
          .sobreNosotrosContainer p {
            font-size: 24px;
            line-height: 28px;
            text-align: center;
            color: #444444;
            width: 700px;
            margin: 50px auto;
          }
          .sobreNosotrosContainer .imagenes-sobrenosotros {
            margin: 50px 0;
            display: grid;
            justify-content: center;
            grid-template-columns: 350px 468px 350px;
            grid-template-rows: 278px 278px;
            column-gap: 14px;
            row-gap: 14px;
          }
          .sobreNosotrosContainer .imagenes-sobrenosotros .img-izquierda{
            border-radius: 10px 0 0 10px;
            grid-row: 1/2;
            grid-column: 1;
            width:100%;
            height:570px;
            object-fit: cover;
          }
          .sobreNosotrosContainer .imagenes-sobrenosotros .img-centro-arriba{
            grid-row: 1;
            grid-column: 2;
            width:100%;
            height:100%;
            object-fit: cover;
            
          }
          .sobreNosotrosContainer .imagenes-sobrenosotros .img-centro-abajo{
            grid-row: 2;
            grid-column: 2;
            width:100%;
            height:100%;
            object-fit: cover;

          }
          .sobreNosotrosContainer .imagenes-sobrenosotros .img-derecha{
            border-radius: 0 10px 10px 0;
            grid-row: 1/2;
            grid-column: 3;
            width:100%;
            height:570px;
            object-fit: cover;

          }
        `}
      </style>
    </>
  )
}
