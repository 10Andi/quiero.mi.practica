import { useState, useEffect } from "react";
import { Ring } from '@uiball/loaders'
import { firestore } from "../../firebase/client"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import SavedOffertCard from "../offertcard/savedoffertcard";
import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "../../context/AuthContext";


export default function SavedShowOfferts() {
    const {user} = useAuth()
    const [offerList, setOfferList] = useState(null)
    // const [selectedOffert, setSelectedOffert] = useState(null)
    const [loading, setLoading] = useState(false)



    // Extraer de user.ofertasGuardadas la fecha_postulacion para ordenar 'desc' y ver si bookmark esta en true
    // Schema de ofertasGuardadas:
    //  uid -> para buscar las ofertas
    //  fecha_postulacion -> para ordernar
    //  bookmark -> para marcar si está en favoritos

    

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
        getOfferts().then(setOfferList).finally(setLoading(false))
    }, [])
    



    return (
        <>
            {loading ?
                <div>
                    <Ring size={40} lineWeight={5} speed={2} color="#473198"/>
                </div>
            : 
                <section>
                    {offerList && offerList.map(({
                        id, beneficios, cargo, categoria, ciudad, comuna, condicion , cupos, descripcion, ejercer, fecha_creacion, horario, 
                        logo, nombre_empresa, poloticas_trabajo, requerimiento, vistas
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
                            poloticas_trabajo={poloticas_trabajo}
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