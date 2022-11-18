import { Ring } from '@uiball/loaders'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import NavRegister from '../../../componets/nav/navregister'
import { useAuth } from '../../../context/AuthContext'
import { firestore } from '../../../firebase/client'

export default function Postular (props) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [offer, setOffer] = useState(null)
  const { register, handleSubmit } = useForm()
  // const { register, handleSubmit, formState: { errors } } = useForm()

  const router = useRouter()
  const { id } = router.query

  // console.log(id)

  useEffect(() => {
    async function getOffert () {
      setLoading(true)

      const docRef = doc(firestore, 'test', id)
      const querySnapshot = await getDoc(docRef)

      if (querySnapshot.exists()) {
        // console.log("Document data:", querySnapshot.data());
      } else {
        // doc.data() will be undefined in this case

        console.log('No such document!')
      }

      const data = querySnapshot.data()
      // const id = doc.id
      const { fecha_creacion } = data

      // const date = new Date(fecha_creacion.seconds * 1000)
      // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

      return {
        ...data,
        // id,
        fecha_creacion: +fecha_creacion.toDate()
      }
    }
    // user && getOfferts().then(setOfferList).finally(setLoading(false))

    getOffert().then(setOffer).finally(setLoading(false))
  }, [id])

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'estudiante') {
    router.push('/login')
    return
  }
  if (user.postulado?.includes(id)) {
    router.push('/home')
    return
  }

  const onSubmit = async (data) => {
    // console.log(user)
    // console.log(data)
    setLoading(true)

    // const docRef = doc(firestore, 'USUARIO', user.uid);
    const querySnapshot = await getDoc(doc(firestore, 'USUARIO', user.uid))
    const dataUser = querySnapshot.data()
    // console.log(dataUser)

    const now = new Date()
    // const format = (date, locale, options) =>
    //     new Intl.DateTimeFormat(locale, options).format(date)

    // const formatDate = format(now, 'es', { dateStyle: 'long'})

    const uidUser = user.uid

    const docRef = doc(firestore, `test/${id}/POSTULANTES/${uidUser}`)

    await setDoc(docRef, {
      // uidUser: {
      nombres: dataUser.nombres,
      apellidoPaterno: dataUser.apellidoPaterno,
      apellidoMaterno: dataUser.apellidoMaterno,
      rut: dataUser.rut,
      comuna: dataUser.comuna,
      region: dataUser.region,
      email: dataUser.email,
      nom_institucion: dataUser.nom_institucion,
      certificadoAlumnoRegular: dataUser.certificadoAlumnoRegular,
      // certificadoAlumnoRegularURL: dataUser.certificadoAlumnoRegularURL,
      avatar: dataUser.avatar,
      infoPersonal: data.info_personal,
      infoEstudio: data.info_estudio,
      fechaPostulacion: now,
      estado: 'En espera'
      // }
    })
      .then(
        updateDoc(doc(firestore, 'USUARIO', user.uid), {
          postulado: arrayUnion(id)
        })
      )
      .then(
        setDoc(doc(firestore, `USUARIO/${uidUser}/POSTULACIONES/${id}`), {
          id,
          fecha_postulacion: now,
          estado: 'En espera'
        })
      )
      .finally(() => {
        setLoading(false)
        router.push('/home')
      })
    // console.log(newUser)
  }

  return (
    <>
      <section>
        <NavRegister />
        <div className='layout'>
          <main>
            <header>
              <img loading='lazy' src={offer?.logo} alt={offer?.nombre_empresa} />
              <div>
                <h1>Postula a {offer?.cargo}, {offer?.ejercer}</h1>
                <span>{offer?.nombre_empresa} recibirá una notificación de tu postulación. La mayoría de las empresas responden en unos cuantos días.</span>
              </div>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='textarea'>
                <strong>Cuéntanos sobre tu experiencia y perfil profesional.</strong>
                <textarea
                  cols='30' rows='10' {...register('info_personal', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Cuéntanos sobre tu formación académica y estudios.</strong>
                <textarea
                  cols='30' rows='10' {...register('info_estudio', {
                    required: true
                  })}
                />
              </div>
              <div className='registro-btn'>
                <button type='submit'>Postular</button>
              </div>
            </form>

          </main>
          <aside>
            <span>Lugar:</span>
            <p>{offer?.comuna}, {offer?.ciudad}.</p>
            <span>Requerimientos:</span>
            <p>{offer?.requerimiento}</p>
            <span>Sobre el trabajo:</span>
            <p>{offer?.descripcion}</p>
            <span>Conocimientos:</span>
            <p>{offer?.condicion}</p>
            <span>Beneficios:</span>
            <p>{offer?.beneficios}</p>
            <span>Policas de trabajo:</span>
            <p>{offer?.politica_trabajo}</p>
          </aside>
        </div>

      </section>
      {
                loading
                  ? (
                    <div className='loading'>
                      <Ring
                        size={100}
                        lineWeight={5}
                        speed={2}
                        color='#473198'
                      />
                    </div>
                    )
                  : null
}
      <style jsx>{`
                    .loading {
                        display: grid;
                        place-content: center;
                        align-items: center;
                        position:fixed;
                        top:0;
                        left:0;
                        width: 100%;
                        height: 100%;
                        background: rgba(255,255,255,0.5);
                        backdrop-filter: blur(1px);
                    }
                    
                    section {
                        padding: 0 42px;
                        padding: 0 200px;
                        position: relative;
                        min-height: calc(100vh - 71.813px);
                    }
                    .layout {
                        display: grid;
                        grid-template-columns: 2.4fr 1fr;
                        column-gap: 18px;
                        margin-bottom: 60px;
                    }

                    aside {
                        background-color: rgb(247, 249, 249);
                        border-radius: 10px;
                        padding: 18px;
                        height: max-content;
                    }
                    aside span {
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    aside p {
                        font-size: 14px;
                        color: #444444;
                        margin-top: 20px;
                        margin-bottom: 30px;
                        white-space: pre-line;
                    }

                    main {
                        border-right: 1px solid rgb(239, 243, 244);
                        padding-right: 18px;
                    }

                    header {
                        display: flex;
                        flex-direction: row;
                    }
                    header img {
                        height: 77px;
                        width: 77px;
                        margin-right: 21px;
                        border-radius: 10px;
                        
                    }
                    header h1 {
                        margin: 0 0 7px 0;

                    }
                    header span {
                        color: #444444;

                    }

                    .textarea {
                        padding: 50px 98px;
                        display: flex;
                        flex-direction: column;
                    }
                    .textarea strong {
                        margin-bottom: 10px;
                    }



                    .registro-btn {
                        display: flex;
                        justify-content: center;
                    }
                    button {
                        width: 269px;
                        margin-bottom: 70px;
                        padding: 12px 0;
                        background: #473198;
                        background: -webkit-linear-gradient(to right, #4A0D67, #473198);  /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to right, #4A0D67, #473198); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                        border: none;
                        outline: none;
                        border-radius: 10px;
                        color: #fff;
                        font-size: 24px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                `}
      </style>
    </>
  )
}
