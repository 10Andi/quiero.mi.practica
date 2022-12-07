import { Ring } from '@uiball/loaders'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
// import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import { useFiltered } from '../../context/searchedContext'
import { firestore } from '../../firebase/client'
import OffertCard from '../offertcard'

export default function ShowOfferts () {
  const { user } = useAuth()
  const { setOfferStatus, offerList, setOfferList } = useOffert()
  const [loading, setLoading] = useState(false)
  // const searched = false
  // const [searched, setSearched] = useState(false)
  // const [rating, setRating] = useState([])
  const { sortedResults, searchedResults } = useFiltered()

  // useEffect(() => {
  //   async function getOfferts () {
  //     setLoading(true)

  //     // const querySnapshot = await getDocs(collection(firestore, 'test'))
  //     const querySnapshot = await getDocs(query(collection(firestore, 'test'), orderBy('fecha_creacion', 'desc')))

  //     return querySnapshot.docs.map(doc => {
  //       const data = doc.data()
  //       const id = doc.id
  //       const { fecha_creacion } = data

  //       // const date = new Date(fecha_creacion.seconds * 1000)
  //       // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

  //       return {
  //         ...data,
  //         id,
  //         fecha_creacion: +fecha_creacion.toDate()
  //       }
  //     })
  //   }
  //   // user && getOfferts().then(setOfferList).finally(setLoading(false))
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

  /*  Ultimo
  useEffect(() => {
    setLoading(true)
    const onGetOfferts = async () => {
      await onSnapshot(query(collection(firestore, 'test'), orderBy('fecha_creacion', 'desc')), querySnapshot => {
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
    async function getSubColection () {
      // setLoading(true)

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
      onSubColection()
    }
    getSubColection()
    onGetOfferts().finally(setLoading(false))
    // async function onGetOfferts() {
    // const unsubscribe = onSnapshot(collection(firestore, 'test'), (querySnapshot) => {
    //     querySnapshot.docs.map(doc => {
    //         const data = doc.data()
    //         console.log(data)
    //         const id = doc.id
    //         const {fecha_creacion} = data

    //         // const date = new Date(fecha_creacion.seconds * 1000)
    //         // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

    //         setOfferList({
    //             ...data,
    //             id,
    //             fecha_creacion: +fecha_creacion.toDate()
    //         })
    //         // return {
    //         //     ...data,
    //         //     id,
    //         //     fecha_creacion: +fecha_creacion.toDate()
    //         // }
    //     })

    //     querySnapshot.forEach((doc) => {
    //         const data = doc.data()
    //         const id = doc.id
    //         const {fecha_creacion} = data

    //         setOfferList({
    //             ...data,
    //             id,
    //             fecha_creacion: +fecha_creacion.toDate()
    //         })
    //     })
    // })
    // return unsubscribe;
    // }

    // onGetOfferts().then(setOfferList)
  }, [setOfferList, setOfferStatus, user.uid])
  */

  // async function onGetOfferts() {

  //     onSnapshot(collection(firestore, 'test'), (querySnapshot) => {
  //         querySnapshot.docs.map(doc => {
  //             const data = doc.data()
  //             const id = doc.id
  //             const {fecha_creacion} = data

  //             // const date = new Date(fecha_creacion.seconds * 1000)
  //             // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

  //             return {
  //                 ...data,
  //                 id,
  //                 fecha_creacion: +fecha_creacion.toDate()
  //             }
  //         })
  //     })
  // }

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onSnapshot(query(collection(firestore, 'test'), orderBy('fecha_creacion', 'desc')), querySnapshot => {
      setOfferList(querySnapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const { fecha_creacion } = data
        setLoading(false)

        return {
          ...data,
          id,
          fecha_creacion: +fecha_creacion.toDate()
        }
      }))
    })

    return () => unsubscribe()
  }, [setOfferList])

  useEffect(() => {
    setLoading(true)
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
        setLoading(false)

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

  // useEffect(() => {
  //   const q = query(collection(firestore, 'EVA_EMPRESA'))
  //   const getRating = async () => {
  //     const querySnapshot = await getDocs(q)
  //     //   querySnapshot.forEach((doc) => {
  //     //   // doc.data() is never undefined for query doc snapshots
  //     //     console.log(doc.id, ' => ', doc.data())
  //     //   })
  //     // }

  //     setRating(querySnapshot.docs.map((doc) => {
  //       // setOfferList(querySnapshot.docs.map((doc) => {
  //       const data = doc.data()
  //       const id = doc.id
  //       // const arrData = []
  //       //  const arrData = Object.entries(data).forEach(entrie => )
  //       const output = Object.entries(data).reduce((acc, curr) => {
  //         const matchingNode = acc.find(node => node[0] === curr[0])
  //         if (!matchingNode) {
  //           acc.push(curr)
  //         }
  //         return acc
  //       }, [])
  //       console.log('🚀 ~ file: index.js:306 ~ output ~ output', output)

  //       return {
  //         ...offerList,
  //         ...output,
  //         id
  //       }
  //     }))
  //   }
  //   getRating()
  // }, [offerList])
  // }, [offerList, setOfferList])

  return (
    <>
      {loading
        ? (
          <div>
            <Ring size={40} lineWeight={5} speed={2} color='#473198' />
          </div>
          )
        : searchedResults.length
          ? (
            // <section>
            //   {searchedResults.map(({
            //     id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
            //     logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa
            //   }) => (
            //     <OffertCard
            //       key={id}
            //       id={id}
            //       logo={logo}
            //       nombre_empresa={nombre_empresa}
            //       cargo={cargo}
            //       ejercer={ejercer}
            //       comuna={comuna}
            //       ciudad={ciudad}
            //       vistas={vistas}
            //       fecha_creacion={fecha_creacion}
            //       horario={horario}
            //       cupos={cupos}
            //       beneficios={beneficios} //
            //       categoria={categoria}
            //       condicion={condicion}
            //       descripcion={descripcion}
            //       politica_trabajo={politica_trabajo}
            //       requerimiento={requerimiento}
            //       bookmark={bookmark}
            //       checkboxEmpresa={checkboxEmpresa}
            //     />
            //   ))}
            // </section>
              null
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

      <style jsx>{`
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
