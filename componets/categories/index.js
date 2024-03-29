import Link from 'next/link'

export default function Categories () {
  return (
    <>
      <section>
        <h2>Buscar prácticas <br /> por categorías</h2>
        <div className='allCategory'>
          <Link href='login'><a><div className='eachCategory'><span>Diseño / UX</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>Programación</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>Data Science | Analytics</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>Desarrollo Mobile</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>Marketing Digital</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>SysAdmin | DevOps | QA</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>Comercial y Ventas</span></div></a></Link>
          <Link href='login'><a><div className='eachCategory'><span>Innovación y Agilidad</span></div></a></Link>
        </div>
      </section>

      <style jsx>{`
        section {
            height: 520px;
        }
        section h2 {
            font-size: 48px;
            color: #444444;
            margin-bottom: 5%;
        }
        .allCategory {
            display: grid;
            grid-template-columns: repeat(3, 320px);
            column-gap: 5%;
            row-gap: 30%;
        }
        .allCategory a {
            text-decoration: none;
            padding: 20px 0;
            background-color: #ADFC92;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        // section .allCategory {
        //     padding: 20px 0;
        //     background-color: #ADFC92;
        //     border-radius: 10px;
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     cursor: pointer;
        
        //     -webkit-touch-callout: none; /* iOS Safari */
        //     -webkit-user-select: none; /* Safari */
        //      -khtml-user-select: none; /* Konqueror HTML */
        //        -moz-user-select: none; /* Old versions of Firefox */
        //         -ms-user-select: none; /* Internet Explorer/Edge */
        //             user-select: none;
        // }
        section div span {
            color: #fff;
            font-size: 24px;
            font-weight: bold;
        }
        `}
      </style>
    </>
  )
}
