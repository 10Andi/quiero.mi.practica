import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import { Ring } from '@uiball/loaders'
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import { useFiltered } from '../../context/searchedContext'
import { firestore } from '../../firebase/client'
import OffertCard from '../offertcard'

export default function ShowOfferts () {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState([])
  const { setOfferStatus, offerList, setOfferList } = useOffert()
  const { sortedResults, searchedResults, searchBarInUse } = useFiltered()

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
          timestamp: fecha_creacion,
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
        }
      }))
    })

    return () => unsubscribe()
  }, [setOfferStatus, user.uid])

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
      {loading && (
        <div>
          <Ring size={40} lineWeight={5} speed={2} color='#473198' />
        </div>
      )}
      <section>
        {(() => {
          if (searchBarInUse) {
            if (searchedResults.length > 1) {
              return (
                searchedResults.map(({
                  id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                  logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
                }) => {
                  const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                  // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                  return (
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
                      beneficios={beneficios}
                      categoria={categoria}
                      condicion={condicion}
                      descripcion={descripcion}
                      politica_trabajo={politica_trabajo}
                      requerimiento={requerimiento}
                      bookmark={bookmark}
                      checkboxEmpresa={checkboxEmpresa}
                      promedio={empresa.promedio}
                    />
                  )
                }
                )
              )
            } else {
              return (
                <article><SentimentDissatisfiedIcon /><p>Lo sentimos, no se han encontrado resultados.</p></article>
                // <h1>Sorry, no results found</h1>
              )
            }
          } else if (offerList && sortedResults === 'Más nuevos') {
            const nuevos = offerList.sort((a, b) => b.timestamp - a.timestamp)
            return (
              nuevos.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Más vistos') {
            const vistos = offerList.sort((a, b) => b.vistas - a.vistas)
            return (
              vistos.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Más cupos disponibles') {
            const cupos = offerList.sort((a, b) => b.cupos - a.cupos)
            return (
              cupos.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Diseño / UX') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Programación') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Data Science | Analytics') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Desarrollo Mobile') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Marketing Digital') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'SysAdmin | DevOps | QA') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Comercial y Ventas') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList && sortedResults === 'Innovación y Agilidad') {
            const categoria = offerList.filter(ele => ele.categoria === sortedResults)
            return (
              categoria.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )
            )
          } else if (offerList) {
            return (
              offerList.map(({
                id, beneficios, cargo, categoria, ciudad, comuna, condicion, cupos, descripcion, ejercer, fecha_creacion, horario,
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    idEmpresa={idEmpresa}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa?.promedio}
                  />
                )
              }
              )
            )
          }
        })()}
      </section>

      {/* {loading
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
                logo, nombre_empresa, politica_trabajo, requerimiento, vistas, bookmark, checkboxEmpresa, idEmpresa
              }) => {
                const empresa = rating.find(ele => idEmpresa === ele.id) || {}
                // console.log('🚀 ~ file: index.js:353 ~ ShowOfferts ~ promedio', empresa.id, empresa.promedio)

                return (
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
                    beneficios={beneficios}
                    categoria={categoria}
                    condicion={condicion}
                    descripcion={descripcion}
                    politica_trabajo={politica_trabajo}
                    requerimiento={requerimiento}
                    bookmark={bookmark}
                    checkboxEmpresa={checkboxEmpresa}
                    promedio={empresa.promedio}
                  />
                )
              }
              )}
            </section>
            )} */}

      <style jsx>
        {`
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
          div {
            padding: 50px;
            display: grid;
            place-content: center;
          }
          section {
            max-height: 75vh;
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
