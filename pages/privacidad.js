import Footer from '../componets/footer'
import Nav from '../componets/nav'
import Title from '../componets/title'

const contents = {
  tittle: {
    text: 'Privacidad y Protección de ',
    textHighlight: 'Datos Personales'
  }
}

export default function Privacidad () {
  return (
    <>
      <section className='container'>
        <Nav />
        <Title text={contents.tittle.text} textHighlight={contents.tittle.textHighlight} />
        <div className='card-request-container'>
          <div className='card-request'>
            <h3 className='titulo1'>Información Legal</h3>
            <p className='parrafo'><span className='dot'>· QUIEROMIPRÁCTICA</span> de conformidad a lo dispuesto en el artículo 19 Nº 4 de la Constitución Política de la República y la Ley Nº 19.628, Workib! pone en conocimiento de todos quienes acceden a su plataforma digital, la siguiente política de privacidad, a fin de resguardar la seguridad, confidencialidad y privacidad de sus usuarios</p>
            <p className='parrafo'><span className='dot'>· ¿Qué información recopilamos?</span> Esta política de privacidad cubre únicamente los datos que se recopilen ya sea través del sitio https://quiero-mi-practica.vercel.app/, o bien a partir de los datos que le suministren las empresas relacionadas a la empresa QuieroMiPráctica, todo lo cual deberá ser previamente aceptado por cada usuario. Al aceptar nuestra política de privacidad de datos, el usuario podrá recibir información relacionada con todos los productos, noticias e iniciativas de QuieroMiPráctica.</p>
            <p className='parrafo'><span className='dot'>· ¿Cómo protegemos su información?</span> QuieroMiPráctica será responsable de la base de datos y de los datos personales contenidos en ella. Con el objeto de evitar toda pérdida, mal uso, alteración, acceso no autorizado y/o robo de datos personales o información confidencial facilitados por los usuarios, QuieroMiPráctica ha adoptado niveles de seguridad y de protección de datos personales según los estándares de la industria, garantizando su resguardo bajo el grado de diligencia legalmente exigido.</p>
            <p className='parrafo'><span className='dot'>· ¿La información recopilada a través del Servicio Quiero Mi Practica es segura?</span> Tomamos precauciones para proteger la seguridad de su información. Contamos con procedimientos físicos, electrónicos y administrativos para ayudar a salvaguardar, prevenir el acceso no autorizado, mantener la seguridad de los datos y usar correctamente su información. Sin embargo, ni las personas ni los sistemas de seguridad son infalibles, incluidos los sistemas de cifrado. Además, las personas pueden cometer delitos intencionales, cometer errores o no seguir las políticas. Por lo tanto, aunque hacemos todos los esfuerzos razonables para proteger su información personal, no podemos garantizar su seguridad absoluta. Si la ley aplicable impone algún deber irrenunciable de proteger su información personal, usted acepta que la mala conducta intencional serán los estándares utilizados para medir nuestro cumplimiento con ese deber.</p>
            <p className='parrafo'><span className='dot'>· Cookies</span> QuieroMiPráctica utiliza "cookies" para identificar las áreas de nuestro sitio web que ha visitado. Una cookie es una pequeña porción de datos que su navegador web almacena en su computadora o dispositivo móvil. Usamos cookies para mejorar el rendimiento y la funcionalidad de nuestra plataforma, pero no son esenciales para su uso. Sin embargo, sin estas cookies, es posible que ciertas funciones, como los videos, no estén disponibles o se le solicitará que ingrese sus datos de inicio de sesión cada vez que visite la plataforma, ya que no podríamos recordar que había iniciado sesión anteriormente. La mayoría de los navegadores web se pueden configurar para desactivar el uso de cookies. Sin embargo, si desactiva las cookies, es posible que no pueda acceder a la funcionalidad de nuestro sitio web correctamente o en absoluto. Nunca colocamos información de identificación personal en cookies.</p>
            <p className='parrafo'><span className='dot'>· Cambios en nuestra Política de Privacidad</span> Podemos cambiar nuestro Servicio y nuestras políticas, y es posible que debamos realizar cambios en esta Política de privacidad para que reflejen con precisión nuestro Servicio y nuestras políticas. A menos que la ley exija lo contrario, le notificaremos (por ejemplo, a través de nuestro Servicio) antes de realizar cambios en esta Política de privacidad y le daremos la oportunidad de revisarlos antes de que entren en vigencia. Luego, si continúa utilizando el Servicio, estará sujeto a la Política de privacidad actualizada. Si no desea aceptar esta o cualquier Política de privacidad actualizada, puede eliminar su cuenta.</p>
            <p className='parrafo'><span className='dot'>· Servicios de Terceros</span> Podemos mostrar, incluir o poner a disposición contenida de terceros (incluidos datos, información, aplicaciones y otros servicios de productos) o proporcionar enlaces a sitios web o servicios de terceros ("Servicios de terceros"). Usted reconoce y acepta que Quiero Mi Práctica no será responsable de ningún Servicio de terceros, incluida su precisión, integridad, puntualidad, validez, cumplimiento de los derechos de autor, legalidad, decencia, calidad o cualquier otro aspecto de los mismos. Quiero Mi Práctica no asume ni tendrá ninguna obligación o responsabilidad ante usted o cualquier otra persona o entidad por los Servicios de terceros. Los Servicios de terceros y los enlaces a los mismos se brindan únicamente para su conveniencia y usted accede a ellos y los usa completamente bajo su propio riesgo y sujeto a los términos y condiciones de dichos terceros.</p>
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
          .titulo1 {
            font-weight: bolder;
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
