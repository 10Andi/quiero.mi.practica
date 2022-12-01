import { useState } from 'react'
import Footer from '../../componets/footer'
import NavRegister from '../../componets/nav/navregister'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, firestore, storage } from '../../firebase/client'

import Tooltip from '@mui/material/Tooltip'
import { Ring } from '@uiball/loaders'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { useRouter } from 'next/router'
import { FilePond, registerPlugin } from 'react-filepond'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { cleanRut, formatRut, validateRut } from 'rutlib'
// import { useAuth } from '../../context/AuthContext'
import comunas from '../../helper/comunas'

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function Empresa () {
  const userType = 'empresa'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, control } = useForm()
  // const { register, handleSubmit, formState: { errors }, watch, control, trigger } = useForm()
  // const { logOut } = useAuth()

  async function uploadFileAndURL (uidEmpresa, file, fileName) {
    const fileRef = ref(storage, `logo/${uidEmpresa}/${fileName}`)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)
    return url
  }

  async function submitHandler (data) {
    // e.preventDefault()
    setLoading(true)

    const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)

    const uid = newUser.user.uid
    const uidEmpresa = Math.random().toString(36).slice(2)
    const avatar = `https://ui-avatars.com/api/?name=${data.nombres}+${data.apellidoPaterno}&size=128`
    const fechaCreacion = new Date() // TIMESTAMP

    const docRefUser = doc(firestore, `USUARIO/${uid}`)
    const docRefCompany = doc(firestore, `EMPRESA/${uidEmpresa}`)
    // const fileRef = ref(storage, `logo/${uidEmpresa}/${data.logo[0].filename}`)

    // const storageRef = ref(storage, `logo/${data.logo[0].filename}`);

    // await uploadBytes(fileRef, data.logo[0].file)
    // .then(response => getDownloadURL(response.ref)
    // .then(url => {
    //     setLogoUrl(url)
    // }))

    // uploadBytes(fileRef, data.logo[0].file).then( (snapshot) => {
    //     if (snapshot.exists) {
    //         const blob = snapshot.val()
    //         const url = URL.createObjectURL(blob)
    //         setLogoUrl(url)
    //     }
    //   })

    // uploadBytes(fileRef, data.logo[0].file).then((snapshot) => {
    //     getDownloadURL(fileRef).then((url) => {
    //         setLogoUrl(url)
    //     })
    // })

    // await uploadBytes(fileRef, data.logo[0].file)
    // .then(getDownloadURL(ref(storage, fileRef))
    // .then(async (url) => {
    //     setLogoUrl(url)
    // }))

    // const gsRef = ref(storage, `gs://quieromipractica.appspot.com/${fileRef}`)
    // uploadBytesResumable(fileRef, data.logo[0].file).then(
    //     () =>{
    //       getDownloadURL(gsRef).then(async function(url){
    //         setLogoUrl(url)

    //         await setDoc(docRefUser, {
    //             nombres: data.nombres,
    //             apellidoPaterno: data.apellidoPaterno,
    //             apellidoMaterno: data.apellidoMaterno,
    //             rut: formatRut(data.rut),
    //             comuna: data.comuna_usuario.value,
    //             region: data.comuna_usuario.region,
    //             email: data.email,
    //             password: data.password,
    //             uid_empresa: uidEmpresa,
    //             nombre_empresa: data.nombre_empresa,
    //             tipo: userType,
    //             avatar: avatar
    //         })
    //         await setDoc(docRefCompany, {
    //             uid_empresa: uidEmpresa,
    //             nombre_empresa: data.nombre_empresa,
    //             logo: logoUrl,
    //             rut_empresa: formatRut(data.rut_empresa),
    //             comuna_empresa: data.comuna_empresa.value,
    //             region_empresa: data.comuna_empresa.region,
    //             fecha_creacion_empresa: fechaCreacion,
    //             uid_admin: uid,
    //             email_admin: data.email,
    //             nombres_admin: data.nombres,
    //             apellidoPaterno_admin: data.apellidoPaterno,
    //             apellidoMaterno_admin: data.apellidoMaterno,
    //             avatar_admin: avatar,
    //         })
    //     }
    //   );
    //   })

    const URL = await uploadFileAndURL(uidEmpresa, data.logo[0].file, data.logo[0].filename)
    console.log(URL)
    await setDoc(docRefUser, {
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      rut: formatRut(data.rut),
      comuna: data.comuna_usuario.value,
      region: data.comuna_usuario.region,
      email: data.email,
      password: data.password,
      uid_empresa: uidEmpresa,
      nombre_empresa: data.nombre_empresa,
      tipo: userType,
      avatar,
      logo_empresa: URL,
      region_empresa: data.comuna_empresa.region,
      comuna_empresa: data.comuna_empresa.value
    })
    await setDoc(docRefCompany, {
      uid_empresa: uidEmpresa,
      nombre_empresa: data.nombre_empresa,
      logo: URL,
      rut_empresa: formatRut(data.rut_empresa),
      comuna_empresa: data.comuna_empresa.value,
      region_empresa: data.comuna_empresa.region,
      fecha_creacion_empresa: fechaCreacion,
      uid_admin: uid,
      email_admin: data.email,
      nombres_admin: data.nombres,
      apellidoPaterno_admin: data.apellidoPaterno,
      apellidoMaterno_admin: data.apellidoMaterno,
      avatar_admin: avatar
    })
    // .then(logOut())
    // .then(await uploadBytes(fileRef, data.logo[0].file))
      .finally(() => {
        setLoading(false)
        router.push('/login')
      })
    // console.log(newUser)
    // console.log(user)
  }

  // const onSubmit = async (data) => {
  //     // console.log(data.logo[0])
  //     // const fileRef = ref(storage, `logo/01/${data.logo[0].filename}`)
  //     // uploadBytes(fileRef, data.logo[0].file).then(() => {
  //     //     alert('PDF SUBIDO!')
  //     // })
  //     const uidEmpresa = Math.random().toString(36).slice(2)

  //     const fileRef = ref(storage, `logo/${uidEmpresa}/${data.logo[0].filename}`)
  //     await uploadBytes(fileRef, data.logo[0].file)
  //     .then(getDownloadURL(ref(storage, fileRef))
  //     .then(async (url) => {
  //         setLogoUrl(url)
  //     }))

  //     console.log(logoUrl)
  //     // {errors.nombres?.type === 'required' && accion a mostrar -> toast}
  // }

  return (
    <>
      <section className='container'>
        <NavRegister />
        <h1>Registrate para reclutar y ayudar a estudiantes <span>practicantes emergentes</span></h1>
        <form className='from-postulacion' onSubmit={handleSubmit(submitHandler)}>
          <div className='card-postulacion'>
            <div className='card-postulacion-info'>
              <span className='card-postulacion-info-titulo'>Nombre de la empresa</span>
            </div>
            <div className='card-postulacion-inputs'>
              <input
                type='text' {...register('nombre_empresa', {
                  required: true
                })}
              />
              <Tooltip title='Debes ponerte en contacto con tu administrador de tu cuenta para que seas agregado como miembro del equipo. Si no conoces al administrador o necesitas recuperar acceso a una cuenta de empresa que ya existe, contáctanos.' arrow>
                <label className='test'>¿Tu empresa ya existe en QUIERO MI PRACTICA? No crees un duplicado.</label>
              </Tooltip>
            </div>
          </div>
          <div className='card-postulacion'>
            <div className='card-postulacion-info'>
              <span className='card-postulacion-info-titulo'>Rut de la empresa</span>
              {/* <label className="card-postulacion-info-subtitulo">Informacion sobre su instancia en el instituto o universidad</label> */}
            </div>
            <div className='card-postulacion-inputs'>
              <input
                type='text' {...register('rut_empresa', {
                  required: true,
                  validate: () => {
                    const valueRut = watch('rut_empresa')
                    const cleanedRut = cleanRut(valueRut)
                    return validateRut(cleanedRut)
                  }
                })}
              />
            </div>
          </div>
          <div className='card-postulacion'>
            <div className='card-postulacion-info'>
              <span className='card-postulacion-info-titulo'>Logo de la empresa</span>
              <label className='card-postulacion-info-subtitulo'>Mínimo 200x200 px, en formato cuadrado (por ejemplo, el logo que usas para Twitter o Facebook)</label>
              <label className='card-postulacion-info-subtitulo'>* El formato debe ser PNG o JPG/JPEG</label>

            </div>
            <div className='card-postulacion-componets'>
              <Controller
                name='logo'
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FilePond
                    files={value}
                    allowMultiple={false}
                    onupdatefiles={onChange}
                    required
                    allowFileTypeValidation
                    acceptedFileTypes={['image/png', 'image/jpeg']}
                    labelFileTypeNotAllowed='El tipo de archivo es inválido'
                    fileValidateTypeLabelExpectedTypes='Debe ser PNG o JPG/JPEG'
                    fileValidateTypeLabelExpectedTypesMap={{ 'image/jpeg': '.jpg' }}
                    labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action">Búscalo</span>'
                  />
                )}
              />
            </div>
          </div>
          <div className='card-postulacion'>
            <div className='card-postulacion-info'>
              <span className='card-postulacion-info-titulo'>Comuna</span>
              <label className='card-postulacion-info-subtitulo'>Comuna en donde se encuentra la empresa</label>
            </div>
            <div className='card-postulacion-componets'>
              <Controller
                control={control}
                name='comuna_empresa'
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
              <span className='card-postulacion-info-titulo'>E-mail de la cuenta de administrador</span>
              <label className='card-postulacion-info-subtitulo'>Con esta cuenta tendrás acceso completo de administrador de la empresa y podrás agregar nuevos miembros al equipo</label>
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
              <span className='card-postulacion-info-titulo'>Nombres</span>
              <label className='card-postulacion-info-subtitulo'>Este campo debe contener <strong>tu información personal</strong></label>
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
              <label className='card-postulacion-info-subtitulo'>Este campo debe contener <strong>tu información personal</strong></label>
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
              <label className='card-postulacion-info-subtitulo'>Este campo debe contener <strong>tu información personal</strong></label>
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
              <label className='card-postulacion-info-subtitulo'>Este campo debe contener <strong>tu información personal</strong></label>
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
              <label className='card-postulacion-info-subtitulo'>Este campo debe contener <strong>tu información personal</strong></label>
            </div>
            <div className='card-postulacion-componets'>
              <Controller
                control={control}
                name='comuna_usuario'
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

          <div className='registro-btn'>
            {/* <button type="submit" className="disable">Anterior</button> */}
            <button type='submit'>Registrarse</button>
          </div>
        </form>

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
                .test {
                    display: block;
                    font-size: 16px;
                    color: #473198;
                    width: fit-content;
                    // text-decoration-line: underline;
                    // text-decoration-style: dotted;
                }
                .disable {
                    background: #9E9EA7;
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
                    gap: 100px
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
