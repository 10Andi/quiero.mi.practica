import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../firebase/client'
import CardReacentPublication from './cardreacentpublication'

export default function ReacentsPublications () {
  const [offerList, setOfferList] = useState(null)

  useEffect(() => {
    // const onGetOfferts = async () => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'test'), orderBy('fecha_creacion', 'desc'), limit(9)), querySnapshot => {
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
    // }
    // onGetOfferts()
    return () => unsubscribe()
  }, [])

  return (
    <>
      <div className='recent'>
        <h2>Publicaciones <br /> recientes</h2>
        <div className='allRecentPublications'>
          {offerList && offerList.map(({
            id, cargo, ciudad, comuna, ejercer, fecha_creacion, logo, nombre_empresa
          }) => (
            <CardReacentPublication
              key={id}
              id={id}
              logo={logo}
              nombre_empresa={nombre_empresa}
              cargo={cargo}
              ejercer={ejercer}
              comuna={comuna}
              ciudad={ciudad}
              fecha_creacion={fecha_creacion}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
          .recent {
            height: 900px;
            margin-top: 10%;
            margin-bottom: 60px;
          }
          .recent h2 {
            font-size: 48px;
            color: #444444;
            margin-bottom: 5%;
          }
          .allRecentPublications {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 5%;
            row-gap: 5%;
          }
          .allRecentPublications a {
            text-decoration: none;
          }
          .allRecentPublications h3 {
            color: #000;
          }
        `}
      </style>
    </>
  )
}
