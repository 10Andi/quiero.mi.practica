import { useState, useEffect } from "react";
import OffertCard from "../offertcard";
import { Ring } from '@uiball/loaders'
import { firestore } from "../../firebase/client"
import { collection, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
import { useSearched } from "../../context/searchedContext";
import { useOffert } from "../../context/offertContext";
import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../../context/AuthContext";


export default function ShowOfferts() {
    const {user} = useAuth()

    const {offertSelected, setOffertSelected, offerStatus, setOfferStatus} = useOffert()
    const {isBookmark, setIsBookmark} = useOffert()

    const { searched, setSearched } = useSearched()
    const [ offerList, setOfferList ] = useState(null)
    // const [selectedOffert, setSelectedOffert] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        async function getOfferts() {
            setLoading(true)

            // const querySnapshot = await getDocs(collection(firestore, 'test'))
            const querySnapshot = await getDocs(query(collection(firestore, 'test'), orderBy("fecha_creacion", 'desc')))


            return querySnapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                const {fecha_creacion} = data
                
                // const date = new Date(fecha_creacion.seconds * 1000)
                // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

                return {
                    ...data,
                    id,
                    fecha_creacion: +fecha_creacion.toDate()
                }
            })
        }
        // user && getOfferts().then(setOfferList).finally(setLoading(false))
        async function getSubColection() {
            setLoading(true)
            // console.log(user.uid)
            // const qSnap = await getDocs(query(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`), where(documentId(), 'in', ofertas)))
            const querySnapshot = await getDocs(collection(firestore, `USUARIO/${user.uid}/POSTULACIONES/`))
            // return console.log(qSnap.docs.map(d => ({id: d.id, ...d.data()})))
            return querySnapshot.docs.map(doc => {
                const data = doc.data()
                const id = doc.id
                const {fecha_postulacion, fecha_aprobacion = false, fecha_rechazo = false} = data
                console.log(data)
        
                const format = (date, locale, options) =>
                    new Intl.DateTimeFormat(locale, options).format(date)
                
                // const date = new Date(fecha_postulacion.seconds * 1000)
                // const formatDate = format(date, 'es', { dateStyle: 'long'})
                
                function formatDate(dateFromData) {
                    const date = new Date(dateFromData.seconds * 1000)
                    return format(date, 'es', { dateStyle: 'long'})
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
            })
        }
        // user && getOfferts().then(setOfferList).finally(setLoading(false))
        getSubColection().then(setOfferStatus)
        getOfferts().then(setOfferList).finally(setLoading(false))
    }, [setOfferStatus, user])

    useEffect(() => {

        const onGetOfferts = async () => {
            await onSnapshot(query(collection(firestore, 'test'), orderBy("fecha_creacion", 'desc')), querySnapshot => {
                setOfferList(querySnapshot.docs.map(doc => {
                    const data = doc.data()
                    const id = doc.id
                    const {fecha_creacion} = data

                    return {
                        ...data,
                        id,
                        fecha_creacion: +fecha_creacion.toDate()
                    }
                }))
            })
        }
        onGetOfferts()
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
    }, [offertSelected, isBookmark])
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



    return (
        <>
            {loading ?
                <div>
                    <Ring size={40} lineWeight={5} speed={2} color="#473198"/>
                </div>
            : searched ?
                <section>
                    {searched}
                </section>
            : 
                <section>
                    {offerList && offerList.map(({
                        id, beneficios, cargo, categoria, ciudad, comuna, condicion , cupos, descripcion, ejercer, fecha_creacion, horario, 
                        logo, nombre_empresa, politica_trabajo, requerimiento, vistas
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
                            
                        />
                    ))}
                </section>
            }
            

            <style jsx>{`
                div {
                    padding: 50px;
                    display: grid;
                    place-content: center;
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
                
            `}</style>
        </>
    )
}