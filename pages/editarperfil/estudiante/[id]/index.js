import { OpenInNew } from '@mui/icons-material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Button, Tooltip } from '@mui/material'
import { Ring } from '@uiball/loaders'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Select from 'react-select'
import Locate from '../../../../componets/icons/locate'
import Menu from '../../../../componets/menu'
import { useAuth } from '../../../../context/AuthContext'
import { firestore, storage } from '../../../../firebase/client'
import comunas from '../../../../helper/comunas'

registerPlugin(FilePondPluginFileValidateType)

export default function EditarPerfil () {
  const { user } = useAuth()
  // console.log('🚀 ~ file: index.js:6 ~ EditarPerfil ~ user', user)
  const router = useRouter()
  const { register, handleSubmit, control, setValue } = useForm()
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  // console.log('🚀 ~ file: index.js:13 ~ EditarPerfil ~ userData', userData)
  const { region, comuna, certificadoAlumnoRegular, nom_institucion, password } = userData
  const currentDataUser = { region, comuna, certificadoAlumnoRegular, nom_institucion, password }
  // console.log('🚀 ~ file: index.js:29 ~ EditarPerfil ~ currentDataUser', currentDataUser)
  const { id } = router.query

  useEffect(() => {
    async function getUserData () {
      const docSnap = await getDoc(doc(firestore, 'USUARIO', id))
      const dataUser = docSnap.data()
      return dataUser
    }

    function setUseForm (dataUser) {
      Object.entries(dataUser).forEach(entry => {
        const [key, value] = entry
        if (key === 'certificadoAlumnoRegular' || key === 'password') return
        setValue(key, value, { shouldTouch: true })
        // console.log(key, '->', value)
      })
      return dataUser
    }

    getUserData().then(setUseForm).then(setUserData)
  }, [id, setValue])

  if (user === null && user?.uid !== id) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'estudiante') {
    router.push('/login')
    return
  }

  async function uploadFileAndURL (uidUsuario, file, fileName) {
    const fileRef = ref(storage, `certificadosAlumnoRegular/${uidUsuario}/${fileName}`)
    // const fileRef = ref(storage, `certificadosAlumnoRegular/${uid}/${data.certificadoAlumnoRegular[0].filename}`)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)
    return url
  }

  // async function editEmpresa (data, currentDataUser) {
  //   const docnRef = doc(firestore, 'USUARIO', id)

  //   // await updateDoc(docnRef, {
  //   //   capital: true
  //   // })
  // }

  async function editEstudiante (data, currentDataUser) {
    setLoading(true)
    const docnRef = doc(firestore, 'USUARIO', id)
    // console.log('🚀 ~ file: index.js:87 ~ editEstudiante ~ data', data)

    if (data.certificadoAlumnoRegular && data.certificadoAlumnoRegular?.length !== 0) {
      // console.log(data.certificadoAlumnoRegular)
      const URL = await uploadFileAndURL(id, data.certificadoAlumnoRegular[0].file, data.certificadoAlumnoRegular[0].filename)
      console.log(URL)
      Object.assign(currentDataUser, { certificadoAlumnoRegular: URL })
    }

    Object.entries(data).forEach(async (entry) => {
      const [key, value] = entry

      if (value) {
        if (key === 'certificadoAlumnoRegular') return

        if (key === 'comuna' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // console.log(value)
          Object.assign(currentDataUser, { comuna: value.value })
          Object.assign(currentDataUser, { region: value.region })
        } else {
          Object.assign(currentDataUser, { [key]: value })
        }
      }
    })
    console.log('🚀 ~ file: index.js:89 ~ editEstudiante ~ currentDataUser', currentDataUser)

    await updateDoc(docnRef, {
      comuna: currentDataUser.comuna,
      region: currentDataUser.region,
      password: currentDataUser.password,
      nom_institucion: currentDataUser.nom_institucion,
      certificadoAlumnoRegular: currentDataUser.certificadoAlumnoRegular
    }).finally(() => {
      setLoading(false)
      toast.success('Se ha editado tu perfil correctamente')
    })
  }

  async function onSubmit (data) {
    console.log('🚀 ~ file: index.js:85 ~ onSubmit ~ data', data)
    const { region, comuna, certificadoAlumnoRegular, nom_institucion, password } = data
    const editableData = { region, comuna, certificadoAlumnoRegular, nom_institucion, password }
    // console.log('🚀 ~ file: index.js:87 ~ onSubmit ~ editableData', editableData)
    // user.type === 'estudiante'
    //   ? editEstudiante(editableData, currentDataUser)
    //   : editEmpresa(editableData, currentDataUser)
    editEstudiante(editableData, currentDataUser)
  }

  return (
    <>
      <section>
        <Menu />
        <div className='container'>
          <header>
            <Toaster />
            <header className='banner' />
            <img src={userData.avatar} alt={user.displayName} />
            <header className='heaeder-info'>
              <strong>{user.displayName}</strong>
              <div className='header-info-row'>
                <div className='header-info-row-items'>
                  <MailOutlineIcon fontSize='small' />
                  <small>{user.email}</small>
                </div>
                <div className='header-info-row-items'>
                  <Locate />
                  <small>{userData.comuna}, {userData.region}</small>
                </div>
                <Button style={{ marginLeft: 'auto' }} size='small' href={userData?.certificadoAlumnoRegular} startIcon={<OpenInNew />} target='_blank'>
                  Link Certificado Alumno Regular
                </Button>
              </div>

            </header>
          </header>
          <main>
            <h1>Editar perfil</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='textarea'>
                <strong>Comuna: </strong>
                <Controller
                  control={control}
                  name='comuna'
                  render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Select
                      // {...field}
                      isClearable
                      placeholder='Busca tu comuna ...'
                      options={comunas}
                      defaultOptions
                      onChange={(val) => onChange(val)}
                    />
                  )}
                />
              </div>
              <div className='textarea'>
                <strong>Nombre de la Institución: </strong>
                <Tooltip title='Ingresa el nombre de tu institución educacional (universidad, instituto profesional, CFT, escuela técnica , etc)' placement='top' arrow>
                  <input
                    type='text' {...register('nom_institucion', {
                    })}
                  />
                </Tooltip>
              </div>
              <div className='textarea'>
                <strong>Contraseña: </strong>
                <Tooltip title={<>Tu contraseña debe tener <strong>mínimo 6 caracteres</strong><br />Por tu seguiridad te recomendamos:<br />* Incluir al menos un número<br />* Incluir al menos una letra en mayúscula<br />* Incluir al menos un carácter especial <strong>! @ # $% & *() - + = ^ .</strong></>} placement='top' arrow>
                  <input
                    placeholder='Ingresa una nueva contraseña'
                    type='password' {...register('password', {
                      minLength: 6
                    })}
                  />
                </Tooltip>
              </div>
              <div className='textarea'>
                <strong>Certificado de alumno regular: </strong>
                <Controller
                  name='certificadoAlumnoRegular'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FilePond
                      files={value}
                      allowMultiple={false}
                      onupdatefiles={onChange}
                      allowFileTypeValidation
                      acceptedFileTypes={['application/pdf']}
                      labelFileTypeNotAllowed='El tipo de archivo es inválido'
                      fileValidateTypeLabelExpectedTypes='Debe ser PDF'
                      labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action">Búscalo</span>'
                    />
                  )}
                />
              </div>

              <div className='registro-btn'>
                <button type='submit'>Guardar cambios</button>
              </div>
            </form>
          </main>
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
          .container {
            max-height: 100%;
          }
          section {
            height: 100vh;
            min-height: 100vh;
            max-height: 100vh;
            padding: 0 42px;
            padding: 0 200px;
            display: grid;
            grid-template-columns: 280px 1fr; 
            //grid-template-columns: .7fr 2fr 1.1fr;
            //grid-template-columns: 1fr 2fr 1.3fr;
          }
          .container {
            border-left: 1px solid rgb(239, 243, 244);

          }
          .banner {
            position: relative;
            width: 100%;
            height: 70px;
            background-image: url( '/wave-haikei.svg' );
          }
          header img {
            border-radius: 100px;
            border: solid 5px white;
            position: absolute;
            top: 30px;
            margin-left: 30px;
          }
          .heaeder-info {
            display: flex;
            flex-direction: column;
            margin-left: 188px;
          }
          .header-info-row {
            display: flex;
            gap: 15px
          }
          .header-info-row-items {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .heaeder-info strong {
            color: #473198;
            font-size: 24px;
          }
          .heaeder-info small {

          }


          main {
            //display: grid;
            //grid-template-columns: repeat(2, 1fr);
            //grid-column-gap: 0px;
            //grid-row-gap: 0px;
          }
          h1 {
            margin-left: 35px;
            margin-top: 60px;
          }
          form {
            width: 700px;
            margin: auto;
          }
          .textarea {
                  padding: 24px 98px;
                  display: flex;
                  flex-direction: column;
                }
                .textarea strong {
                    margin-bottom: 10px;
                }
                label {
                  font-size: 16px;
                line-height: 19px;
                color: #7B7B7B;
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
                font-size: 22px;
                font-weight: bold;
                cursor: pointer;
            }
        `}
      </style>
    </>
  )
}
