import Link from 'next/link'
import Logo from '../icons/logo'

export default function Nav () {
  return (
    <>
      <nav>
        <Logo />
        <ul className='nav-links'>
          <li><Link href='/preguntasfrecuentes'><a>FAQ</a></Link></li>
          <li><Link href='/login'><a>Iniciar sesión</a></Link></li>
          <li><Link href='/registro'><a>Registarse</a></Link></li>
        </ul>
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 16vh;
        }
        .nav-links {
          display: flex;
          gap: 20px;
          justify-content: space-between;
        }
        
        .nav-links li {
          list-style: none;
          font-size: 18px;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #000;
          font-weight: 500;
        }
        `}
      </style>
    </>
  )
}
