import Link from 'next/link'

export default function Logo () {
  return (
    <>
      <div>
        <h2><Link href='/'><a>QUIEROMI<span>PRÁCTICA</span></a></Link></h2>
      </div>

      <style jsx>{`
            h2 {
                margin-top: 40px;
            }
            div a {
                color: #000;
                text-decoration: none;
            }
            div span {
                color: #473198;
            }
            `}
      </style>
    </>
  )
}
