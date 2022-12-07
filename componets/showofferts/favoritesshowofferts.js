import { Ring } from '@uiball/loaders'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
// import { useFiltered } from '../../context/searchedContext'
import { firestore } from '../../firebase/client'
import OffertCard from '../offertcard'

export default function FavoritesShowOfferts () {
  const { user } = useAuth()
  const { setOfferStatus, offerList, setOfferList } = useOffert()
  const [loading, setLoading] = useState(false)
  // const { sortedResults, searchedResults } = useFiltered()

  useEffect(() => {
    setLoading(true)

    const unsubscribe = onSnapshot(query(collection(firestore, 'test'), where('bookmark', 'array-contains', user.uid)), querySnapshot => {
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
    return () => unsubscribe()
  }, [setOfferList, user.uid])

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`)), querySnapshot => {
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

    return () => unsubscribe()
  }, [setOfferStatus, user.uid])

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
              logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa
            }) => (
              <OffertCard
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
                checkboxEmpresa={checkboxEmpresa}
              />
            ))}
          </section>
          )}

      <style jsx>
        {`
          div {
            padding: 50px;
            display: grid;
            place-content: center;
          }
          section {
            max-height: 76vh;
            margin-top: 20px;
            overflow-y: auto;
          }
          section::-webkit-scrollbar {
            width: 8px;
            height: 8px;
            margin-left: 18px;
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
