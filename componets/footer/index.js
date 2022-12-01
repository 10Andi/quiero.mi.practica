import Link from 'next/link'

export default function Footer () {
  return (
    <>
      <footer>
        <div>
          <h2>QUIEROMIPRÁCTICA</h2>
        </div>
        <ul>
          <li><Link href='/sobrenosotros'><a>Sobre nosostros</a></Link></li>
          <li><Link href='/preguntasfrecuentes'><a>FAQ</a></Link></li>
          <li><Link href='/precios'><a>Precios</a></Link></li>
          <li><Link href='/privacidad'><a>Privacidad</a></Link></li>
          {/* <li><Link href='/contacto'><a>Contacto</a></Link></li> */}
          <li><a href='mailto:hola@quieromipractica.cl'>Contacto</a></li>
        </ul>
      </footer>
      <style jsx>{`
            footer {
                heigth: 7vh;
                width: 100%;
                padding: 0 42px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #473198;
            }
            div h2 {
                color: #fff;
            }
            // footer .footerText .nav-links {
            //     width: 35%;
            // }
            ul {
                display: flex;
                gap: 40px;
            }
            li {
                list-style: none;
            }
            a {
                color: #fff;
                text-decoration: none;
                font-size: 14px;
            }
            span {
                color: #fff;
                text-decoration: none;
                font-size: 14px;
            }
            `}
      </style>
    </>
  )
}
