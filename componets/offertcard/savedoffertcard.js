import { IconButton } from '@mui/material'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import { firestore } from '../../firebase/client'
import useTimeAgo from '../../hooks/useTimeAgo'
import Bookmark from '../icons/bookmark'
import Dot from '../icons/dot'
import Locate from '../icons/locate'
import Views from '../icons/views'

export default function SavedOffertCard (props) {
  const { user } = useAuth()

  const { id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer } = props
  const { offertSelected, setOffertSelected, offerStatus } = useOffert()

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

  const handleClick = (props) => {
    setOffertSelected(props)
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

  return (
    <>
      <article key={id} className='offer' id={id} style={{ backgroundColor: id === offertSelected?.id ? 'rgb(247, 249, 249)' : 'white' }} onClick={() => handleClick(props)}>
        <div className='offerLogo'>
          <img loading='lazy' src={logo} alt={nombre_empresa} draggable='false' />
        </div>
        <div className='offerInfo'>
          <h4>{nombre_empresa}</h4>
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

            {user.postulado?.includes(id)
              ? (
                <div className='estado'>
                  <p>Estado:
                    {offerStatus && offerStatus.map(ele => {
                      if (ele.id === id && ele.estado === 'Aprobado') return (<label style={{ background: '#adfc92' }}>Aprobado</label>)
                      if (ele.id === id && ele.estado === 'Rechazado') return (<label style={{ background: '#FC9292' }}>Rechazado</label>)
                      if (ele.id === id && ele.estado === 'En espera') return (<label style={{ background: '#e6e6e6' }}>En espera</label>)
                      return null
                    })}
                  </p>
                </div>
                )
              : null}
          </div>
          {user.postulado?.includes(id)
            ? (
              <div className='selfInfo'>
                <div className='fecha'>
                  {offerStatus && offerStatus.map(ele => {
                    if (ele.id === id && ele.fecha_postulacion) return (<small key={Math.random()}>Fecha de postulación: {ele.fecha_postulacion}</small>)
                    return null
                  })}
                  {offerStatus && offerStatus.map(ele => {
                    if (ele.id === id && ele.fecha_aprobacion) return (<small key={Math.random()}>Fecha de aprobación: {ele.fecha_aprobacion}</small>)
                    return null
                  })}
                  {offerStatus && offerStatus.map(ele => {
                    if (ele.id === id && ele.fecha_rechazo) return (<small key={Math.random()}>Fecha de rechazo: {ele.fecha_rechazo}</small>)
                    return null
                  })}
                </div>
              </div>
              )
            : null}
        </div>
        <div className='right-col-end'>
          {props.bookmark?.includes(user.uid)
            ? <IconButton onClick={e => handleClickUnbookmark(e, user.uid, id)}><Bookmark width={27} height={27} fill='#473198' stroke='#473198' /></IconButton>
            : <IconButton onClick={e => handleClickBookmark(e, user.uid, id)}><Bookmark width={27} height={27} /></IconButton>}
        </div>
      </article>

      <style jsx>{`
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
            label {
                background: #e6e6e6;
                border-radius: 5px;
                padding: 5px 8px;
                cursor: pointer;
                margin-left: 8px;
            }
            .estado {
                font-size: 14px;
                margin-left: auto;
            }
            .estado p {
                margin: 0;
                
            }
            .selfInfo {
                border-top: 1px solid rgb(175 175 175);
                margin-top:10px;
                display: flex;
                justify-content: space-between;
                padding-top: 10px;
            }
            .selfInfo .fecha {
              display: flex;
              flex-direction: column;
            }
            {/* .selfInfo p {
                font-size: 14px;
                margin: 0;
            } */}
            .selfInfo p {
              display: block;
              margin: 0;
            }
            .offerInfo {
                width: 100%;
            }
          
            .offer .offerLogo img {
            height: 77px;
            width: 77px;
            margin-right: 21px;
            border-radius: 10px;
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
            {/* z-index: 10; */}
          }
        `}
      </style>
    </>
  )
}
