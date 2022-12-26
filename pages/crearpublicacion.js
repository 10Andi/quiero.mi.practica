import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { firestore } from '../firebase/client'

import { Ring } from '@uiball/loaders'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import NavRegister from '../componets/nav/navregister'
import categorias from '../helper/categorias'
import horarios from '../helper/horarios'

export default function CrearPublicacion () {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [empresa, setEmpresa] = useState(false)
  const { register, handleSubmit, control } = useForm()
  // const { register, handleSubmit, formState: { errors }, watch, control, trigger } = useForm()
  console.log(user)

  useEffect(() => {
    async function getEmpresa () {
      const docSnap = await getDoc(doc(firestore, 'EMPRESA', user.uid_empresa))
      const dataEmpresa = docSnap.data()
      return dataEmpresa
    }
    getEmpresa().then(setEmpresa)
  }, [user.uid_empresa])

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'empresa') {
    router.push('/login')
    return
  }

  const cupos = 15
  const visitas = 0

  async function onSubmit (data) {
    // console.log(data)
    // console.log(user)
    setLoading(true)

    const fechaCreacion = new Date()
    /*
    user.uid
    user.uid_empresa
    user.nombre_empresa
    user.logo_empresa // agregarlo en el authcontext
    user.comuna_empresa // agregarlo en el authcontext
    user.region_empresa // agregarlo en el authcontext
    */

    // const docRefOffer = doc(firestore, `test`)
    // const docRefInternalInfo = doc(firestore, `EMPRESA/${user.uid_empresa}/INFO_OFERTAS/${id}`)

    const { id } = await addDoc(collection(firestore, 'test'), {
      beneficios: data.beneficios,
      categoria: data.categoria.value,
      cargo: data.cargo,
      ciudad: empresa.region_empresa,
      comuna: empresa.comuna_empresa,
      condicion: data.conocimientos,
      cupos,
      descripcion: data.sobre_trabajo,
      ejercer: data.ejercer,
      fecha_creacion: fechaCreacion,
      horario: data.horario.value,
      logo: user.logo_empresa,
      idEmpresa: user.uid_empresa,
      nombre_empresa: user.nombre_empresa,
      politica_trabajo: data.politica_trabajo,
      requerimiento: data.requerimiento,
      vistas: visitas,
      checkboxEmpresa: data.checkboxEmpresa
    })
    // get the id of the document saved setDoc() method
    await setDoc(doc(firestore, `EMPRESA/${user.uid_empresa}/INFO_OFERTAS/${id}`), {
      fecha_creacion: fechaCreacion,
      creada_por: user.displayName,
      id_creada_por: user.uid,
      id_oferta: id

    })

      .finally(() => {
        setLoading(false)
        router.push('/dashboard')
      })
  }

  return (
    <>
      <section>
        <NavRegister />
        <div className='layout'>
          <main>
            <header>
              <img loading='lazy' src={user?.logo_empresa} alt='' />
              <div>
                <h1>Crea una nueva oferta de práctica</h1>
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
                <strong>Elige una categoría:</strong>
                <Controller
                  control={control}
                  name='categoria'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      defaultOptions
                      placeholder='Busca la categoría ...'
                      options={categorias}
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
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      defaultOptions
                      placeholder='Busca el horario ...'
                      options={horarios}
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
                  cols='30' rows='10' {...register('sobre_trabajo', {
                    required: true
                  })}
                />
              </div>
              <div className='textarea'>
                <strong>Conocimientos:</strong>
                <textarea
                  cols='30' rows='10' {...register('conocimientos', {
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
                <strong>Políticas de trabajo:</strong>
                <textarea
                  cols='30' rows='10' {...register('politica_trabajo', {
                    required: true
                  })}
                />
              </div>

              <div className='textarea'>
                <strong className='card-postulacion-info-titulo'>Categorías de trabajo</strong>
                {/* <label className='card-postulacion-info-subtitulo'>Selecciona 1 categoria para poder hacer un match con tu futura práctica</label> */}
                <div className='card-postulacion-componets'>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Diseño / UX'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Diseño / UX
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Programación'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Programación
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Data Science | Analytics'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Data Science | Analytics
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Desarrollo Mobile'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Desarrollo Mobile
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Marketing Digital'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Marketing Digital
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='SysAdmin | DevOps | QA'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    SysAdmin | DevOps | QA
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Comercial y Ventas'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Comercial y Ventas
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='categorias'
                      type='checkbox'
                      value='Innovación y Agilidad'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Innovación y Agilidad
                  </label>
                </div>

              </div>

              <div className='textarea'>
                <strong className='card-postulacion-info-titulo'>Modalidad de trabajo</strong>
                {/* <label className='card-postulacion-info-subtitulo'>Selecciona 1 categoria para poder hacer un match con tu futura práctica</label> */}
                <div className='card-postulacion-componets'>
                  <label className='checkbox-text'>
                    <input
                      name='modalidad'
                      type='checkbox'
                      value='Presencial'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Presencial
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='modalidad'
                      type='checkbox'
                      value='Mixto'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Mixto
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='modalidad'
                      type='checkbox'
                      value='Teletrabajo'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Teletrabajo
                  </label>
                </div>

              </div>

              <div className='textarea'>
                <strong className='card-postulacion-info-titulo'>Horario de trabajo</strong>
                {/* <label className='card-postulacion-info-subtitulo'>Selecciona 1 categoria para poder hacer un match con tu futura práctica</label> */}
                <div className='card-postulacion-componets'>
                  <label className='checkbox-text'>
                    <input
                      name='horarioTrabajo'
                      type='checkbox'
                      value='Full-Time'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Full-Time
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='horarioTrabajo'
                      type='checkbox'
                      value='Part-Time'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Part-Time
                  </label>
                </div>

              </div>

              <div className='textarea'>
                <strong className='card-postulacion-info-titulo'>Metodologías de trabajo</strong>
                {/* <label className='card-postulacion-info-subtitulo'>Selecciona 1 categoria para poder hacer un match con tu futura práctica</label> */}
                <div className='card-postulacion-componets'>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='SCRUM'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    SCRUM
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='Xtreme Programming (XP)'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Xtreme Programming (XP)
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='Kanban'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Kanban
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='ScrumBan'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    ScrumBan
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='Lean'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Lean
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='PMBOK'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    PMBOK
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='Cascada'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Cascada
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='Ruta Crítica'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Ruta Crítica
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='metodologias'
                      type='checkbox'
                      value='Agíl'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Agíl
                  </label>
                </div>

              </div>

              <div className='textarea'>
                <strong className='card-postulacion-info-titulo'>Horario de estudio</strong>
                {/* <label className='card-postulacion-info-subtitulo'>Selecciona 1 categoria para poder hacer un match con tu futura práctica</label> */}
                <div className='card-postulacion-componets'>
                  <label className='checkbox-text'>
                    <input
                      name='horarioEstudiante'
                      type='checkbox'
                      value='Diurno'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Diurno
                  </label>
                  <label className='checkbox-text'>
                    <input
                      name='horarioEstudiante'
                      type='checkbox'
                      value='Vespertino'
                      // ref={register({ required: 'Please select fruits' })}
                      {...register('checkboxEmpresa')}
                    />
                    Vespertino
                  </label>
                </div>

              </div>

              <div className='registro-btn'>
                <button type='submit'>Publicar oferta</button>
              </div>
            </form>

          </main>
          {/*
                        cupos
                        vistas

                        <aside>

                        </aside> */}
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
      <style jsx>
        {`
          .checkbox-text {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
          }
          input[type="checkbox"] {
            width: min-content;
            
          }
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
              object-fit: contain;
          }
          header h1 {
              margin: 0 0 7px 0;

          }
          header span {
              color: #444444;

          }

          .textarea {
            padding: 24px 98px;
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
        `}
      </style>
    </>
  )
}
