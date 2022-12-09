import { Warning } from '@mui/icons-material'
import { Ring } from '@uiball/loaders'
import { collection, documentId, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import { firestore } from '../../firebase/client'
import SavedOffertCard from '../offertcard/savedoffertcard'

export default function SavedShowOfferts () {
  const { user } = useAuth()
  const [offerList, setOfferList] = useState(null)
  const [rating, setRating] = useState([])
  // const { offertSelected, setOffertSelected, offerStatus, setOfferStatus } = useOffert()
  const { setOfferStatus } = useOffert()
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(query(collection(firestore, 'test'), orderBy('fecha_creacion', 'desc')), querySnapshot => {
  //     setData(querySnapshot.docs.map(doc => {
  //       const data = doc.data()
  //       const id = doc.id
  //       const { fecha_creacion } = data

  //       return {
  //         ...data,
  //         id,
  //         fecha_creacion: +fecha_creacion.toDate()
  //       }
  //     }))
  //   })

  //   return () => unsubscribe()
  // }, [])

  // console.log(data)
  useEffect(() => {
    if (!user.postulado) {
      return
    }
    setLoading(true)

    // const bookmark = data.forEach(ele => ele.bookmark) // sacar de useEffect          <----------------------------!!!
    // let ofertas

    // if (bookmark && postulado) {
    //   ofertas = [...bookmark, ...postulado].reduce((accArr, valor) => {
    //     if (accArr.indexOf(valor) < 0) {
    //       accArr.push(valor)
    //     }

    //     return accArr
    //   }, [])
    // }
    // if (bookmark && !postulado) {
    //   ofertas = bookmark
    // }
    // if (!bookmark && postulado) {
    //   ofertas = postulado
    // }

    // console.log(ofertas)

    const unsubscribe = onSnapshot(query(collection(firestore, 'test'), where(documentId(), 'in', user.postulado)), querySnapshot => {
      setOfferList(querySnapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const { fecha_creacion } = data

        return {
          ...data,
          id,
          fecha_creacion: +fecha_creacion.toDate()
        }
      }))
    })
    setLoading(false)
    // onGetOfferts()

    return () => unsubscribe()
  }, [user.bookmark, user.postulado])

  useEffect(() => {
    if (!user.postulado) {
      return
    }
    setLoading(true)

    const unsubscribe = onSnapshot(query(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`)), querySnapshot => {
      setOfferStatus(querySnapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const { fecha_postulacion, fecha_aprobacion = false, fecha_rechazo = false, fecha_finalizacion = false } = data
        // console.log(data)

        const format = (date, locale, options) =>
          new Intl.DateTimeFormat(locale, options).format(date)

        // const date = new Date(fecha_postulacion.seconds * 1000)
        // const formatDate = format(date, 'es', { dateStyle: 'long'})

        function formatDate (dateFromData) {
          const date = new Date(dateFromData.seconds * 1000)
          return format(date, 'es', { dateStyle: 'long' })
        }
        const format_fecha_postulacion = formatDate(fecha_postulacion)
        let format_fecha_aprobacion = false
        let format_fecha_rechazo = false
        let format_fecha_finalizacion = false
        if (fecha_aprobacion) {
          format_fecha_aprobacion = formatDate(fecha_aprobacion)
        }
        if (fecha_rechazo) {
          format_fecha_rechazo = formatDate(fecha_rechazo)
        }
        if (fecha_finalizacion) {
          format_fecha_finalizacion = formatDate(fecha_finalizacion)
        }

        return {
          ...data,
          id,
          fecha_postulacion: format_fecha_postulacion,
          fecha_aprobacion: format_fecha_aprobacion,
          fecha_rechazo: format_fecha_rechazo,
          fecha_finalizacion: format_fecha_finalizacion
        }
      }))
    })

    // onSubColection()
    setLoading(false)

    return () => unsubscribe()
  }, [setOfferStatus, user.postulado, user.uid])

  useEffect(() => {
    const q = query(collection(firestore, 'EVA_EMPRESA'))
    const getRating = async () => {
      const querySnapshot = await getDocs(q)
      const sumaCalificaciones = querySnapshot.docs.map((doc) => {
        let counter = 0
        return {
          id: doc.id,
          promedio: (Object.values(doc.data()).reduce((accumulator, currentValue) => {
            if (currentValue === 0) return accumulator
            counter++
            return accumulator + parseFloat(currentValue)
          }, 0) / counter)
        }
      })
      return sumaCalificaciones
    }
    getRating().then(setRating)
  }, [])

  return (
    <>
      {loading
        ? (
          <div>
            <Ring size={40} lineWeight={5} speed={2} color='#473198' />
          </div>
          )
        : (
          <section>
            {offerList && offerList.map(({
              id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
              logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, idEmpresa
            }) => {
              const empresa = rating.find(ele => idEmpresa === ele.id) || {}
              console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

              return (
                <SavedOffertCard
                  key={id}
                  id={id}
                  logo={logo}
                  nombre_empresa={nombre_empresa}
                  cargo={cargo}
                  ejercer={ejercer}
                  comuna={comuna}
                  ciudad={ciudad}
                  vistas={vistas}
                  fecha_creacion={fecha_creacion}
                  horario={horario}
                  cupos={cupos}
                  beneficios={beneficios}
                  categoria={categoria}
                  condicion={condicion}
                  descripcion={descripcion}
                  politica_trabajo={politica_trabajo}
                  requerimiento={requerimiento}
                  bookmark={bookmark}
                  // checkboxEmpresa={checkboxEmpresa}
                  promedio={empresa.promedio}
                />
              )
            }
            )}
            {!offerList && <article><Warning /><p>Aun no has postulado a alguna oferta.</p></article>}
          </section>
          )}

      <style jsx>{`
          div {
            padding: 50px;
            display: grid;
            place-content: center;
          }
          article {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background: rgb(239, 243, 244);
            border: none;
            padding: 21px;
            margin: 16px 0;
            border-radius: 10px;
            gap: 8px;
          }
          section: {
            height: 100%;
            overflow-y: auto;
          }
          section::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          section::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
          }
          section::-webkit-scrollbar-thumb:hover {
            background: #b3b3b3;
          }
          section::-webkit-scrollbar-thumb:active {
            background-color: #999999;
          }
        `}
      </style>
    </>
  )
}
