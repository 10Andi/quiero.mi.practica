import { Ring } from '@uiball/loaders'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { cleanRut, formatRut, validateRut } from 'rutlib'
import Footer from '../../componets/footer'
import NavRegister from '../../componets/nav/navregister'
import { auth, firestore, storage } from '../../firebase/client'
import comunas from '../../helper/comunas'

registerPlugin(FilePondPluginFileValidateType)

export default function Usuario () {
  const userType = 'estudiante'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, control } = useForm()
  // const { register, handleSubmit, formState: { errors }, watch, control } = useForm()

  async function uploadFileAndURL (uidUsuario, file, fileName) {
    const fileRef = ref(storage, `certificadosAlumnoRegular/${uidUsuario}/${fileName}`)
    // const fileRef = ref(storage, `certificadosAlumnoRegular/${uid}/${data.certificadoAlumnoRegular[0].filename}`)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)
    return url
  }

  async function submitHandler (data) {
    // e.preventDefault()
    setLoading(true)

    const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)

    const uid = newUser.user.uid
    const avatar = `https://ui-avatars.com/api/?name=${data.nombres}+${data.apellidoPaterno}&size=128`
    // const fechaCreacion = undefined // obtener de user.metadata.creationTime.millisecondsSinceEpoch o hacer TIMESTAMP

    const docRef = doc(firestore, `USUARIO/${uid}`)

    // const fileRef = ref(storage, `certificadosAlumnoRegular/${uid}/${data.certificadoAlumnoRegular[0].filename}`)

    const URL = await uploadFileAndURL(uid, data.certificadoAlumnoRegular[0].file, data.certificadoAlumnoRegular[0].filename)
    console.log(URL)

    await setDoc(docRef, {
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      rut: formatRut(data.rut),
      comuna: data.comuna.value,
      region: data.comuna.region,
      email: data.email,
      password: data.password, // MINIMO 6 CARACTERES
      nom_institucion: data.nom_institucion,
      certificadoAlumnoRegular: URL,
      tipo: userType,
      avatar
      // fechaCreacion: fechaCreacion // ( ? ) -> sera necesario; teniendo esta info en FirebaseAuth
    })
    // .then(await uploadBytes(fileRef, data.certificadoAlumnoRegular[0].file))
      .finally(() => {
        setLoading(false)
        router.push('/login')
      })
    // console.log(newUser)
    // console.log(user)
  }

  // const onSubmit = (data) => {
  //     console.log(data.certificadoAlumnoRegular[0])
  //     const fileRef = ref(storage, `certificadosAlumnoRegular/01/${data.certificadoAlumnoRegular[0].filename}`)
  //     uploadBytes(fileRef, data.certificadoAlumnoRegular[0].file).then(() => {
  //         alert('PDF SUBIDO!')
  //     })

  //     // console.log(data.comuna)

  //     // {errors.nombres?.type === 'required' && accion a mostrar -> toast}
  // }

  return (
    <>
      <section className='container'>
        <NavRegister />
        <div className='logIn'>
          <h1>Ingresa tu información y encuentra <span>tu futura práctica</span></h1>
          <form className='from-postulacion' onSubmit={handleSubmit(submitHandler)}>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Nombres</span>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='text' {...register('nombres', {
                    required: true
                  })}
                />
              </div>
            </div>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Apellido paterno</span>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='text' {...register('apellidoPaterno', {
                    required: true
                  })}
                />
              </div>
            </div>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Apellido materno</span>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='text' {...register('apellidoMaterno', {
                    required: true
                  })}
                />
              </div>
            </div>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Rut</span>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='text' {...register('rut', {
                    required: true,
                    validate: () => {
                      const valueRut = watch('rut')
                      const cleanedRut = cleanRut(valueRut)
                      return validateRut(cleanedRut)
                    }
                  })}
                />
              </div>
            </div>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Comuna</span>
              </div>
              <div className='card-postulacion-componets'>
                <Controller
                  control={control}
                  name='comuna'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      defaultOptions
                      placeholder='Busca tu comuna ...'
                      options={comunas}
                    />
                  )}
                />
              </div>
            </div>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>E-mail</span>
                <label className='card-postulacion-info-subtitulo'>Con este e-mail podrás iniciar sesión una vez que te hayas registrado</label>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='email' {...register('email', {
                    required: true,
                    pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                  })}
                />
              </div>
            </div>

            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Contraseña</span>
                <label className='card-postulacion-info-subtitulo'>Tu contraseña debe tener <strong>minimo 6 caracteres</strong></label>
                <label className='card-postulacion-info-subtitulo'>Por tu seguiridad te recomendamos:</label>
                <label className='card-postulacion-info-subtitulo'>* Incluir al menos un numero</label>
                <label className='card-postulacion-info-subtitulo'>* Incluir al menos una letra en mayuscula</label>
                <label className='card-postulacion-info-subtitulo'>* Incluir al menos un caracter especial <strong>! @ # $% & *() - + = ^ .</strong></label>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='password' {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                />
              </div>
            </div>
            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Nombre de la Institución</span>
                <label className='card-postulacion-info-subtitulo'>Ingresa el nombre de tu institución educacional (universidad, instituto profecional, CFT, escuela tecnica , etc)</label>
              </div>
              <div className='card-postulacion-inputs'>
                <input
                  type='text' {...register('nom_institucion', {
                    required: true
                  })}
                />
              </div>
            </div>

            <div className='card-postulacion'>
              <div className='card-postulacion-info'>
                <span className='card-postulacion-info-titulo'>Certificado de alumno regular</span>
                <label className='card-postulacion-info-subtitulo'>Se necesita certificado de alumno regular para acreditar tu institución educacional y virificar estado academico</label>
                <label className='card-postulacion-info-subtitulo'>* El formato debe ser PDF</label>
              </div>
              <div className='card-postulacion-componets'>
                <Controller
                  name='certificadoAlumnoRegular'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <FilePond
                      files={value}
                      allowMultiple={false}
                      onupdatefiles={onChange}
                      required
                      allowFileTypeValidation
                      acceptedFileTypes={['application/pdf']}
                      labelFileTypeNotAllowed='El tipo de archivo es inválido'
                      fileValidateTypeLabelExpectedTypes='Debe ser PDF'
                      labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action">Búscalo</span>'
                    />
                  )}
                />
              </div>
            </div>

            <div className='registro-btn'>
              <button type='submit'>Regristrarse</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
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
            .container {
                padding: 0 42px;
                position: relative;
                min-height: calc(100vh - 71.813px);
            }
            .card-postulacion {
                display: flex;
                margin-bottom: 50px;
                padding: 0 100px;
                padding: 29px 0 !important;
                border-bottom: 1px solid rgb(239, 243, 244);
            }
            .card-postulacion .card-postulacion-info {
                display: flex;
                flex-direction: column;
                width: 33.3333%;
                padding-right: 25px;
            }
            .card-postulacion .card-postulacion-info span{
                font-weight: bold;
                font-size: 24px;
                line-height: 28px;
                color: #444444;
            }
            .card-postulacion .card-postulacion-info label {
                font-size: 16px;
                line-height: 19px;
                color: #7B7B7B;
            }
            .card-postulacion-inputs {
                width: 66.6666%;
            }
            .card-postulacion-componets {
                max-width: 400px;
                width: 66.6666%;

            }
            .addl-class::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            .addl-class::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 4px;
            }
            .addl-class::-webkit-scrollbar-thumb:hover {
                background: #b3b3b3;
            }
            .addl-class::-webkit-scrollbar-thumb:active {
                background-color: #999999;
            }
            form {
                padding: 0 158px;
            }
            h1 {
                font-size: 48px;
                font-size: 36px;
                text-align: center;
                padding-bottom: 25px;
                width: 595px;
                margin: auto;
            }
            span {
                font-size: 48px;
                font-size: 36px;
                font-weight: bold;
                color: #473198;
            }
            input {
                border-radius: 10px;
                font-size: 14px;
                padding: 10px;
                border: thin solid #9E9EA7;
                outline: none;
                width: 100%;
                max-width: 400px;
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
