import Link from 'next/link'
import useTimeAgo from '../../hooks/useTimeAgo'
import Locate from '../icons/locate'

export default function CardReacentPublication (props) {
  const { id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, ejercer } = props
  const timeAgo = useTimeAgo(fecha_creacion)

  return (
    <>
      <Link href='login'>
        <a key={id} id={id}>
          <div className='recentPublications'>
            <div className='titleRecentPublications'>
              <img src={logo} alt={nombre_empresa} draggable='false' />
              <h3>{cargo}, {ejercer}</h3>
            </div>
            <div className='locate'>
              <Locate /><span>{comuna}, {ciudad}</span>
            </div>
            <span className='date'>{timeAgo}</span>
          </div>
        </a>
      </Link>
      {/* <a href='/practicas?id=6'>
        <div className='recentPublications'>
          <div className='titleRecentPublications'>
            <img src='' alt='' draggable='false' />
            <h3>Analista de Marketing, Performance </h3>
          </div>
          <div className='locate'>
            <Locate /><span>Santiago, Chile</span>
          </div>
          <span className='date'>Hace 5 horas</span>
        </div>
      </a> */}

      <style jsx>{`
          .recentPublications {
            background-color: #F8F1FF;
            padding: 25px;
            border-radius: 10px;
          }
          .titleRecentPublications {
            display: flex;
            margin-bottom: 30px;
          }
          .titleRecentPublications img{
            height: 88px;
            width: 92.82px;
            margin-right: 30px;
            border-radius: 10px;
            object-fit: contain;
          }
          .titleRecentPublications h3{
            font-size: 24px;
            margin: 0;
          }
          // .recentPublications .locate img {
          //     margin-right: 10px;
          // }
          .recentPublications .locate span {
            color: #444444;
            margin-left: 10px;
          }
          .recentPublications .date {
            font-weight: bold;
            color: #444444;
          }
        `}
      </style>
    </>
  )
}
