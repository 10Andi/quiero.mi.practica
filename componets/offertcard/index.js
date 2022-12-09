import { IconButton, Rating } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { arrayRemove, arrayUnion, doc, increment, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import { firestore } from '../../firebase/client'
import useTimeAgo from '../../hooks/useTimeAgo'
import ProgressProvider from '../../utility/progressProvider'
import Bookmark from '../icons/bookmark'
import Dot from '../icons/dot'
import Locate from '../icons/locate'
import Views from '../icons/views'

export default function OffertCard (props) {
  const { user } = useAuth()
  // const [isHover, setIsHover] = useState(false)
  const { id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer, checkboxEmpresa, promedio } = props
  const match = user.checkboxAlumno?.filter(prop => checkboxEmpresa?.indexOf(prop) >= 0)
  const porcentaje = Math.floor((match.length / checkboxEmpresa?.length) * 100)
  const { offertSelected, setOffertSelected } = useOffert()

  const timeAgo = useTimeAgo(fecha_creacion)

  const handleClickBookmark = (e, userId, offertId) => {
    e.preventDefault()
    e.stopPropagation()

    const docRef = doc(firestore, 'test', offertId)
    updateDoc(docRef, {
      bookmark: arrayUnion(userId)
    })
  }
  const handleClickUnbookmark = (e, userId, offertId) => {
    e.preventDefault()
    e.stopPropagation()

    const docRef = doc(firestore, 'test', offertId)
    updateDoc(docRef, {
      bookmark: arrayRemove(userId)
    })
  }

  const handleClick = async (props) => {
    setOffertSelected(props)

    const docRef = doc(firestore, 'test', id)
    await updateDoc(docRef, {
      vistas: increment(1)
    })
  }

  useEffect(() => {
    const btnFocus = document.getElementById(id)

    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault()

        // 👇️ your logic here
        setOffertSelected(null)
        btnFocus?.blur()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [id, setOffertSelected])

  // const handleMouseEnter = () => {
  //   setIsHover(true)
  // }
  // const handleMouseLeave = () => {
  //   setIsHover(false)
  // }

  // const boxStyle = {
  //   backgroundColor: isHover ? 'lightblue' : 'rgb(0, 191, 255)',
  //   backgroundColor: id === offertSelected?.id ? 'rgb(247, 249, 249)' : 'white'
  // }

  return (
    <>
      <article key={id} className='offer' id={id} style={{ backgroundColor: id === offertSelected?.id ? 'rgb(247, 249, 249)' : 'white' }} onClick={() => handleClick(props)}>
        <div className='offerLogo'>
          <img loading='lazy' src={logo} alt={nombre_empresa} draggable='false' />
        </div>
        <div className='offerInfo'>
          <header>
            <h4>{nombre_empresa}</h4>
            <Rating name='size-small' defaultValue={promedio} precision={0.5} size='small' readOnly />
          </header>
          <span>{cargo}, {ejercer}</span>
          <div className='infoItemsTop'>
            <div className='infoItem'>
              <Locate />
              <span>{comuna}, {ciudad}</span>
            </div>
            <div className='infoItem'>
              <Views />
              {vistas === 1
                ? <span>{vistas} visita</span>
                : <span>{vistas} visitas</span>}
            </div>
          </div>
          <div className='infoItemsBottom'>
            <div className='infoItem'>
              <span>{timeAgo}</span>
              <Dot />
            </div>
            <div className='infoItem'>
              <span>{horario}</span>
              <Dot />
            </div>
            <div className='infoItem'>
              {cupos === 1
                ? <span>{cupos} cupo restante</span>
                : <span>{cupos} cupos restantes</span>}
            </div>
          </div>
        </div>
        <div className='right-col-end'>
          {/* <IconButton>
            {user.bookmark?.includes(id)
              ? <Bookmark width={27} height={27} fill='#473198' stroke='#473198' onClick={handleClickUnbookmark} />
              : <Bookmark width={27} height={27} onClick={handleClickBookmark} />}
          </IconButton> */}
          {props.bookmark?.includes(user.uid)
            ? (
              <Tooltip title='Eliminar de favoritos' placement='top' arrow>
                <IconButton onClick={e => handleClickUnbookmark(e, user.uid, id)}><Bookmark width={27} height={27} fill='#473198' stroke='#473198' /></IconButton>
              </Tooltip>
              )

            : (
              <Tooltip title='Agregar a favoritos' placement='top' arrow>
                <IconButton onClick={e => handleClickBookmark(e, user.uid, id)}><Bookmark width={27} height={27} /></IconButton>
              </Tooltip>
              )}
          <Tooltip title={`Tienes un ${porcentaje}% de afinidad con esta publicación`} placement='right' arrow>
            <div style={{ width: 50, height: 50, marginTop: 20 }}>
              <ProgressProvider valueStart={0} valueEnd={porcentaje}>
                {porcentaje => <CircularProgressbar
                  value={porcentaje} text={`${porcentaje}%`} styles={buildStyles({
                    textColor: '#473198',
                    pathColor: '#473198'
                  })}
                               />}
              </ProgressProvider>
            </div>
          </Tooltip>

        </div>
      </article>

      <style jsx>{`
          header {
            display: flex;
            align-items: center;
            gap: 21px;
          }
          article {
            width: 100%;
            padding: 21px;
            display: flex;
            cursor: pointer;

            background: none;
            border: none;
            border-radius: 10px;
            text-align: start;


            margin: 16px 0;
          }
          
          article:focus {
            outline: 1px solid #9BF3F0;
            outline: 1px solid rgb(239, 243, 244);
            outline: none;
            background-color: rgb(247, 249, 249);
          }
          article:hover {
            border: 1px thin #4A0D67;
            background: rgb(239, 243, 244);
          }
          .offer .offerLogo img {
            height: 77px;
            width: 77px;
            margin-right: 21px;
            border-radius: 10px;
            object-fit: contain;
          }
          .offer .offerInfo h4 {
            font-size: 24px;
            //margin-bottom: 7px;
            margin: 0 0 2px 0;
          }
          .offer .offerInfo span {
            font-size: 16px;
            color: #444444;
          }
          .offer .offerInfo .infoItemsTop {
            display: flex;
          }
          .offer .offerInfo .infoItemsTop .infoItem {
            margin: 8px 0 0;
          }
          .offer .offerInfo .infoItemsTop .infoItem span {
            font-size: 12px;
            margin: 0 10px;
          }
          .offer .offerInfo .infoItemsTop .infoItem img {
            margin-right: 10px;
          }
          .offer .offerInfo .infoItemsBottom {
            display: flex;
          }
          .offer .offerInfo .infoItemsBottom .infoItem span {
            font-size: 12px;
          }
          .offer .offerInfo .infoItemsBottom .infoItem img {
            margin-right: 12px;
          }
          .offer .offerTools {
            flex-grow: 1
          }
          .offer .offerTools .options {
            display: flex;
            justify-content: flex-end;
          }
          .offer .offerTools .options img {
            margin-left: 14px;
          }
          .right-col-end {
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            {/* z-index: 10; */}
          }
        `}
      </style>
    </>
  )
}
