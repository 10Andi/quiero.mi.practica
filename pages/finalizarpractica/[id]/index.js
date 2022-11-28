import { MailOutline, OpenInNew } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Ring } from '@uiball/loaders'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import NavRegister from '../../../componets/nav/navregister'
import { useAuth } from '../../../context/AuthContext'
import { firestore } from '../../../firebase/client'

export default function FinalizarPractica () {
  const { user } = useAuth()
  const [offer, setOffer] = useState(null)
  const [student, setStundet] = useState(null)
  console.log('🚀 ~ file: index.js ~ line 14 ~ FinalizarPractica ~ student', student)
  const router = useRouter()
  const { id } = router.query
  const [studentId, offertId] = id.split('-')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    setLoading(true)

    async function getOffer () {
      const docRef = doc(firestore, `test/${offertId}`)
      const docSnap = await getDoc(docRef)
      const offertDataFirestore = docSnap.data()
      // console.log(offertDataFirestore)
      return offertDataFirestore
    }

    async function getStudent () {
      const docRef = doc(firestore, `USUARIO/${studentId}`)
      const docSnap = await getDoc(docRef)
      const studentDataFirestore = docSnap.data()
      // console.log(studentDataFirestore)
      return studentDataFirestore
    }

    getOffer().then(setOffer).then(getStudent).then(setStundet).finally(setLoading(false))
  }, [offertId, studentId])

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'empresa') {
    router.push('/login')
    return
  }

  async function onSubmit (data) {
    // console.log(data)
    // console.log(user)
    setLoading(true)

    // const docRef = doc(firestore, 'test', id)

    // await updateDoc(docRef, {
    //   beneficios: data.beneficios,
    //   categoria: data.categoria.value,
    //   cargo: data.cargo,
    //   // ciudad: user.region_empresa,
    //   // comuna: user.comuna_empresa,
    //   condicion: data.condicion,
    //   // cupos: cupos,
    //   descripcion: data.descripcion,
    //   ejercer: data.ejercer,
    //   // fecha_creacion: fechaCreacion,
    //   horario: data.horario.value,
    //   // logo: user.logo_empresa,
    //   // nombre_empresa: user.nombre_empresa,
    //   politica_trabajo: data.politica_trabajo,
    //   requerimiento: data.requerimiento
    //   // vistas: visitas
    // })
    //   .finally(() => {
    //     setLoading(false)
    //     router.push('/dashboard')
    //   })
  }

  return (
    <>
      <section>
        <NavRegister />
        <div className='layout'>
          <main>
            <header>
              <img loading='lazy' src={offer?.logo} alt='' />
              {/* <img loading='lazy' src='https://icons-for-free.com/download-icon-google+logo+new+icon-1320185797820629294_128.png' alt='' /> */}
              <div>
                <h1><span>{offer?.cargo}, {offer?.ejercer}</span></h1>
                <span>Estas por dar como finalizado el proceso de práctica de <strong>{student?.nombres} {student?.apellidoPaterno}</strong>. Necesitamos que califiques su desempeño.</span>
                {/* <span>{offer?.cargo}, {offer?.ejercer}</span> */}
              </div>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type='submit'>Finalizar práctica</button>
              </div>
            </form>

          </main>
          <aside>
            <div>
              <strong>Nombre completo:</strong>
              <p>{student?.nombres} {student?.apellidoPaterno} {student?.apellidoMaterno}</p>
              <strong>Fecha de aceptación:</strong>
              <p>20/29/20</p>
              <strong>Institución:</strong>
              <p>Inacap</p>
              <Button size='small' href={`mailto:${student?.email}`} startIcon={<MailOutline />}>
                Correo electronico
              </Button>
              <Button size='small' href={student?.certificadoAlumnoRegular} startIcon={<OpenInNew />}>
                Link Certificado Alumno Regular
              </Button>
            </div>
            <img src={student?.avatar} alt='' />

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
      <style jsx>
        {`
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
            display: flex;
            justify-content: space-between;
          }
          aside span {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          aside p {
            font-size: 14px;
            color: #444444;
            margin-top: 8px;
            margin-bottom: 14px;
            white-space: pre-line;
          }
          aside img {
            width: 73px;
            height: 73px;
            margin-right: 30px;
            border-radius: 100px;
          }
          aside div {
            
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

          form {
            margin-top: 16px;
          }
          .textarea {
            padding: 20px 98px;
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
            margin-top: 26px;
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
