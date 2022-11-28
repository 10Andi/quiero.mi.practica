import { Warning } from '@mui/icons-material'
import { Ring } from '@uiball/loaders'
import { collection, documentId, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import { firestore } from '../../firebase/client'
import SavedOffertCard from '../offertcard/savedoffertcard'

export default function SavedShowOfferts () {
  const { user } = useAuth()
  const [offerList, setOfferList] = useState([])
  // const { offertSelected, setOffertSelected, offerStatus, setOfferStatus } = useOffert()
  const { setOfferStatus } = useOffert()
  const [loading, setLoading] = useState(false)

  // Extraer de user.ofertasGuardadas la fecha_postulacion para ordenar 'desc' y ver si bookmark esta en true
  // Schema de ofertasGuardadas:
  //  uid -> para buscar las ofertas
  //  fecha_postulacion -> para ordernar
  //  bookmark -> para marcar si está en favoritos

  // useEffect(() => {
  //   async function getOfferts () {
  //     setLoading(true)

  //     const bookmark = user.bookmark
  //     const postulado = user.postulado
  //     let ofertas

  //     if (bookmark && postulado) {
  //       ofertas = [...bookmark, ...postulado].reduce((accArr, valor) => {
  //         if (accArr.indexOf(valor) < 0) {
  //           accArr.push(valor)
  //         }

  //         return accArr
  //       }, [])
  //     }
  //     if (bookmark && !postulado) {
  //       ofertas = bookmark
  //     }
  //     if (!bookmark && postulado) {
  //       ofertas = postulado
  //     }

  //     // const querySnapshot = await getDocs(collection(firestore, 'test'))
  //     if (!ofertas) {
  //       return
  //     }
  //     const querySnapshot = await getDocs(query(collection(firestore, 'test'), where(documentId(), 'in', ofertas)))
  //     // , orderBy("fecha_creacion", 'desc')

  //     return querySnapshot.docs.map(doc => {
  //       const data = doc.data()
  //       const id = doc.id
  //       const { fecha_creacion } = data
  //       // console.log(data)

  //       // const date = new Date(fecha_creacion.seconds * 1000)
  //       // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

  //       return {
  //         ...data,
  //         id,
  //         fecha_creacion: +fecha_creacion.toDate()
  //       }
  //     })
  //   }

  //   async function getSubColection () {
  //     setLoading(true)
  //     // console.log(user.uid)
  //     // const qSnap = await getDocs(query(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`), where(documentId(), 'in', ofertas)))
  //     const querySnapshot = await getDocs(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`))
  //     // return console.log(qSnap.docs.map(d => ({id: d.id, ...d.data()})))
  //     return querySnapshot.docs.map(doc => {
  //       const data = doc.data()
  //       const id = doc.id
  //       const { fecha_postulacion, fecha_aprobacion = false, fecha_rechazo = false } = data
  //       console.log(data)

  //       const format = (date, locale, options) =>
  //         new Intl.DateTimeFormat(locale, options).format(date)

  //       // const date = new Date(fecha_postulacion.seconds * 1000)
  //       // const formatDate = format(date, 'es', { dateStyle: 'long'})

  //       function formatDate (dateFromData) {
  //         const date = new Date(dateFromData.seconds * 1000)
  //         return format(date, 'es', { dateStyle: 'long' })
  //       }
  //       const format_fecha_postulacion = formatDate(fecha_postulacion)
  //       let format_fecha_aprobacion = false
  //       let format_fecha_rechazo = false
  //       if (fecha_aprobacion) {
  //         format_fecha_aprobacion = formatDate(fecha_aprobacion)
  //       }
  //       if (fecha_rechazo) {
  //         format_fecha_rechazo = formatDate(fecha_rechazo)
  //       }

  //       return {
  //         ...data,
  //         id,
  //         fecha_postulacion: format_fecha_postulacion,
  //         fecha_aprobacion: format_fecha_aprobacion,
  //         fecha_rechazo: format_fecha_rechazo
  //         // fecha_aprobacion: 123

  //       }
  //     })
  //   }
  //   // user && getOfferts().then(setOfferList).finally(setLoading(false))
  //   getSubColection().then(setOfferStatus)
  //   getOfferts().then(setOfferList).finally(setLoading(false))
  // }, [setOfferStatus, user])

  useEffect(() => {
    // setLoading(true)
    async function getOfferts () {
      // setLoading(true)

      const bookmark = user.bookmark
      const postulado = user.postulado
      let ofertas

      if (bookmark && postulado) {
        ofertas = [...bookmark, ...postulado].reduce((accArr, valor) => {
          if (accArr.indexOf(valor) < 0) {
            accArr.push(valor)
          }

          return accArr
        }, [])
      }
      if (bookmark && !postulado) {
        ofertas = bookmark
      }
      if (!bookmark && postulado) {
        ofertas = postulado
      }

      if (!ofertas) {
        return
      }

      const onGetOfferts = async () => {
        await onSnapshot(query(collection(firestore, 'test'), where(documentId(), 'in', ofertas)), querySnapshot => {
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
      }
      onGetOfferts().finally(setLoading(false))
      // onGetOfferts()
    }

    async function getSubColection () {
      setLoading(true)

      const onSubColection = async () => {
        await onSnapshot(query(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`)), querySnapshot => {
          setOfferStatus(querySnapshot.docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            const { fecha_postulacion, fecha_aprobacion = false, fecha_rechazo = false } = data
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
            if (fecha_aprobacion) {
              format_fecha_aprobacion = formatDate(fecha_aprobacion)
            }
            if (fecha_rechazo) {
              format_fecha_rechazo = formatDate(fecha_rechazo)
            }

            return {
              ...data,
              id,
              fecha_postulacion: format_fecha_postulacion,
              fecha_aprobacion: format_fecha_aprobacion,
              fecha_rechazo: format_fecha_rechazo
              // fecha_aprobacion: 123

            }
          }))
        })
      }
      // onSubColection()
      onSubColection().finally(setLoading(false))
    }

    getOfferts()
    getSubColection()
    setLoading(false)
  }, [setOfferStatus, user])

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
              logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark
            }) => (
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
                beneficios={beneficios} //
                categoria={categoria}
                condicion={condicion}
                descripcion={descripcion}
                politica_trabajo={politica_trabajo}
                requerimiento={requerimiento}
                bookmark={bookmark}
              />
            ))}
            {!offerList && <article><Warning /><p>Aun no has postulado a alguna oferta o agregado alguna oferta a tu bookmark</p></article>}
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
