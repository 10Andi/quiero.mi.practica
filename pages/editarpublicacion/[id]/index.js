import { doc, getDoc, updateDoc } from 'firebase/firestore'
// import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { firestore } from '../../../firebase/client'

import { Ring } from '@uiball/loaders'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import NavRegister from '../../../componets/nav/navregister'
import categorias from '../../../helper/categorias'
import horarios from '../../../helper/horarios'

export default function EditarPublicacion () {
  const { user } = useAuth()
  const [offer, setOffer] = useState(null)
  const router = useRouter()
  const { id } = router.query
  // const data = router.query
  // console.log(id)

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control, setValue } = useForm()
  // const { register, handleSubmit, formState: { errors }, watch, control, trigger, setValue } = useForm()

  useEffect(() => {
    setLoading(true)
    async function getOffer () {
      const docRef = doc(firestore, `test/${id}`)
      const docSnap = await getDoc(docRef)
      const offertDataFirestore = docSnap.data()
      // console.log(userDataFirestore)
      return offertDataFirestore
    }

    function setUseForm (dataOffert) {
      console.log(dataOffert)
      Object.entries(dataOffert).forEach(entry => {
        const [key, value] = entry
        setValue(key, value, { shouldTouch: true })
        // console.log(key,'->' , value)
      })
      return dataOffert
    }

    getOffer().then(setUseForm).then(setOffer).finally(setLoading(false))
  }, [id, setValue])

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'empresa') {
    router.push('/login')
    return
  }

  // const cupos = 15
  // const visitas = 0

  async function onSubmit (data) {
    console.log(data)
    // console.log(user)
    setLoading(true)
    // const finish = () => {
    //   setLoading(false)
    //   router.push('/dashboard')
    // }

    // const fechaModificacion = new Date()
    // user.uid
    // user.displayName

    // posiblemente guardar valor antiguo y valor nuevo
    // user.uid_empresa
    // user.nombre_empresa
    // user.logo_empresa
    // user.comuna_empresa
    // user.region_empresa

    // const docRefOffer = doc(firestore, `test`)
    // const docRefInternalInfo = doc(firestore, `EMPRESA/${user.uid_empresa}/INFO_OFERTAS/${id}`)
    const docRef = doc(firestore, 'test', id)

    // const { id } = await addDoc(collection(firestore, 'test'), {
    await updateDoc(docRef, {
      beneficios: data.beneficios,
      categoria: data.categoria,
      cargo: data.cargo,
      // ciudad: user.region_empresa,
      // comuna: user.comuna_empresa,
      condicion: data.condicion,
      // cupos: cupos,
      descripcion: data.descripcion,
      ejercer: data.ejercer,
      // fecha_creacion: fechaCreacion,
      horario: data.horario,
      // logo: user.logo_empresa,
      // nombre_empresa: user.nombre_empresa,
      politica_trabajo: data.politica_trabajo,
      requerimiento: data.requerimiento
      // vistas: visitas
    })
      .finally(() => {
        setLoading(false)
        router.push('/dashboard')
      })
      // .finally(finish)
  }

  return (
    <>
      <section>
        <NavRegister />
        <div className='layout'>
          <main>
            <header>
              <img loading='lazy' src='https://icons-for-free.com/download-icon-google+logo+new+icon-1320185797820629294_128.png' alt='' />
              <div>
                <h1>Estas editando la oferta <span>{offer?.cargo}, {offer?.ejercer}</span></h1>
                <span>Tú y los demás miembros del equipo recibirán una notificación cuando se postule un nuevo practicante.</span>
              </div>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className='textarea'>
                <strong>Cargo: </strong>
                <input
                  type='text' {...register('cargo', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Ejerce: </strong>
                <input
                  type='text' {...register('ejercer', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Elige una categoria:</strong>
                <Controller
                  control={control}
                  name='categoria'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Select
                      // {...field}
                      isClearable
                      // defaultOptions
                      placeholder='Busca la categoría ...'
                      options={categorias}
                      value={categorias.find((c) => c.value === value)}
                      onChange={(val) => onChange(val.value)}
                    />
                  )}
                />
              </div>
              <div className='textarea'>
                <strong>Elige un tipo de horario:</strong>
                <Controller
                  control={control}
                  name='horario'
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Select
                      // {...field}
                      isClearable
                      // defaultOptions
                      placeholder='Busca el horario ...'
                      options={horarios}
                      value={horarios.find((h) => h.value === value)}
                      onChange={(val) => onChange(val.value)}
                    />
                  )}
                />
              </div>
              <div className='textarea'>
                <strong>Requerimientos:</strong>
                <textarea
                  cols='30' rows='10' {...register('requerimiento', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Sobre el trabajo:</strong>
                <textarea
                  cols='30' rows='10' {...register('descripcion', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Conocimientos:</strong>
                <textarea
                  cols='30' rows='10' {...register('condicion', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Beneficios:</strong>
                <textarea
                  cols='30' rows='10' {...register('beneficios', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Policas de trabajo:</strong>
                <textarea
                  cols='30' rows='10' {...register('politica_trabajo', {
                    required: true
                  })}
                />
              </div>

              <div className='registro-btn'>
                <button type='submit'>Editar oferta</button>
              </div>
            </form>

          </main>
          {/*
                    cupos
                    vistas

                    <aside>

                    </aside> */}
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
                    //border-right: 1px solid rgb(239, 243, 244);
                    //padding-right: 18px;
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
                header h1 span {
                    color: #473198;
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
                input {
                    border-radius: 10px;
                    font-size: 14px;
                    padding: 10px;
                    border: thin solid #9E9EA7;
                    outline: none;
                    width: 100%;
                    //max-width: 400px;
                }
                input:focus {
                    border: thin solid #473198;
                }
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active{
                    -webkit-box-shadow: 0 0 0 30px white inset !important;
                }

                textarea {
                    resize: none;
                    border-radius: 10px;
                    font-size: 14px;
                    padding: 10px;
                    border: thin solid #9E9EA7;
                    outline: none;
                }
                textarea:focus {
                    border: thin solid #473198;
                }
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover, 
                textarea:-webkit-autofill:focus, 
                textarea:-webkit-autofill:active{
                    -webkit-box-shadow: 0 0 0 30px white inset !important;
                }
                textarea::-webkit-scrollbar {
                    width: 8px;
                    height: 0px;
                }
                textarea::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                textarea::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 4px;
                }
                textarea::-webkit-scrollbar-thumb:hover {
                    background: #b3b3b3;
                }
                textarea::-webkit-scrollbar-thumb:active {
                    background: #999999;
                }
            `}
      </style>
    </>
  )
}
