import Footer from "../../componets/footer";
import NavRegister from "../../componets/nav/navregister"
import { useState } from 'react'
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"
import { cleanRut , validateRut, formatRut } from 'rutlib'
import Select from 'react-select'
import comunas from '../../helper/comunas'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import { Ring } from '@uiball/loaders'

registerPlugin(FilePondPluginFileValidateType)


export default function Empresa() {
    const userType = 'empresa'
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch, control, trigger } = useForm()

    async function submitHandler(data) {
        // e.preventDefault()
        setLoading(true)

        const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)

        const uid = newUser.user.uid
        const avatar = `https://ui-avatars.com/api/?name=${data.nombres}+${data.apellidoPaterno}&size=128`
        const fechaCreacion = undefined // obtener de user.metadata.creationTime.millisecondsSinceEpoch o hacer TIMESTAMP
        
        const docRef = doc(firestore, `USUARIO/${uid}`)
        const fileRef = ref(storage, `certificadosAlumnoRegular/${uid}/${data.certificadoAlumnoRegular[0].filename}`)

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
            certificadoAlumnoRegular: data.certificadoAlumnoRegular[0].filename,
            tipo: userType,
            avatar: avatar,
            // fechaCreacion: fechaCreacion // ( ? ) -> sera necesario; teniendo esta info en FirebaseAuth 
        })
        .then(await uploadBytes(fileRef, data.certificadoAlumnoRegular[0].file))
        .finally(() => {
            setLoading(false)
            router.push('/login')
        })
        console.log(newUser)
        // console.log(user)
    }
    
    const onSubmit = (data) => {
        console.log(data.certificadoAlumnoRegular[0])
        const fileRef = ref(storage, `certificadosAlumnoRegular/01/${data.certificadoAlumnoRegular[0].filename}`)
        uploadBytes(fileRef, data.certificadoAlumnoRegular[0].file).then(() => {
            alert('PDF SUBIDO!')
        })


        // console.log(data.comuna)
        
        // {errors.nombres?.type === 'required' && accion a mostrar -> toast}
    }


    return (
        <>
        <section className="container">
            <NavRegister />
            <h1>Registrate para reclutar y ayudar a estudiantes <span>practicantes emergentes</span></h1>
                <form className="from-postulacion" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Nombre de la empresa</span>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="text" {...register('nombre_empresa', {
                                required: true
                            })}/>
                            <label className="test">¿Tu empresa ya existe en QUIERO MI PRACTICA? No crees un duplicado.</label>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Rut de la empresa</span>
                            {/* <label className="card-postulacion-info-subtitulo">Informacion sobre su instancia en el instituto o universidad</label> */}
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="text" {...register('rut_empresa', {
                                required: true,
                                validate: () => {
                                    const valueRut = watch('rut_empresa')
                                    const cleanedRut = cleanRut(valueRut)
                                    return validateRut(cleanedRut)
                                }
                            })}/>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Logo de la empresa</span>
                            <label className="card-postulacion-info-subtitulo">Mínimo 200x200 px, en formato cuadrado (por ejemplo, el logo que usas para Twitter o Facebook)</label>
                        </div>
                        <div className="card-postulacion-componets">
                            <Controller
                                name="certificadoAlumnoRegular"
                                control={control}
                                rules={{required: true}}
                                render={({ field:{onChange, value} }) => (
                                <FilePond
                                    files={value}
                                    allowMultiple={false}
                                    onupdatefiles={onChange}
                                    required
                                    allowFileTypeValidation={true}
                                    acceptedFileTypes={['application/pdf']}
                                    labelFileTypeNotAllowed={'El tipo de archivo es inválido'}
                                    fileValidateTypeLabelExpectedTypes={'Debe ser PDF'}
                                    labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action">Búscalo</span>'
                                />
                                )}
                            />
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Comuna</span>
                            <label className="card-postulacion-info-subtitulo">Comunaen en donde se encuentra la empresa</label>
                        </div>
                        <div className="card-postulacion-componets">
                            <Controller
                                control={control}
                                name="comuna"
                                rules={{required: true}}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        defaultOptions
                                        placeholder={"Busca tu comuna ..."}
                                        options={comunas}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">E-mail de la cuenta de administrador</span>
                            <label className="card-postulacion-info-subtitulo">Con esta cuenta tendrás acceso completo de administrador de la empresa y podrás agregar nuevos miembros al equipo.</label>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="email" {...register('email', {
                                required: true,
                                pattern:  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                            })}/>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Contraseña</span>
                            <label className="card-postulacion-info-subtitulo">Tu contraseña debe tener <strong>minimo 6 caracteres</strong></label>
                            <label className="card-postulacion-info-subtitulo">Por tu seguiridad te recomendamos</label>
                            <label className="card-postulacion-info-subtitulo">* Incluir al menos un numero</label>
                            <label className="card-postulacion-info-subtitulo">* Incluir al menos una letra en mayuscula</label>
                            <label className="card-postulacion-info-subtitulo">* Incluir al menos un caracter especial <strong>! @ # $% & *() - + = ^ .</strong></label>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="password" {...register('password', {
                                required: true,
                                minLength: 6
                            })}/>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Nombres</span>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="text" {...register('nombres', {
                                required: true
                            })}/>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Apellido paterno</span>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="text" {...register('apellidoPaterno', {
                                required: true
                            })}/>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Apellido materno</span>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="text" {...register('apellidoMaterno', {
                                required: true
                            })}/>
                        </div>
                    </div>
                    
                    
                    
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Contraseña</span>
                            <label className="card-postulacion-info-subtitulo">Tu contraseña debe tener <strong>minimo 6 caracteres</strong></label>
                            <label className="card-postulacion-info-subtitulo">Por tu seguiridad te recomendamos</label>
                            <label className="card-postulacion-info-subtitulo">* Incluir al menos un numero</label>
                            <label className="card-postulacion-info-subtitulo">* Incluir al menos una letra en mayuscula</label>
                            <label className="card-postulacion-info-subtitulo">* Incluir al menos un caracter especial <strong>! @ # $% & *() - + = ^ .</strong></label>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="password" {...register('password', {
                                required: true,
                                minLength: 6
                            })}/>
                        </div>
                    </div>
                    <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Comuna</span>
                            {/* <label className="card-postulacion-info-subtitulo">Con este e-mail podrás iniciar sesión una vez que te hayas registrado</label> */}
                        </div>
                        <div className="card-postulacion-componets">
                            <Controller
                                control={control}
                                name="comuna"
                                rules={{required: true}}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        defaultOptions
                                        placeholder={"Busca tu comuna ..."}
                                        options={comunas}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {/* <div className="card-postulacion">
                        <div className="card-postulacion-info">
                            <span className="card-postulacion-info-titulo">Nombre de la Institución</span>
                            <label className="card-postulacion-info-subtitulo">Ingresa el nombre de tu institución educacional (universidad, instituto profecional, CFT, escuela tecnica , etc)</label>
                        </div>
                        <div className="card-postulacion-inputs">
                            <input type="text" {...register('nom_institucion', {
                                required: true
                            })}/>
                        </div>
                    </div> */}
                    

                    <div className="registro-btn">
                        {/* <button type="submit" className="disable">Anterior</button> */}
                        <button type="submit">Regristrarse</button>
                    </div>
                </form>


        </section>
        <Footer />
            <style jsx>{`
                .test {
                    display: block;
                    font-size: 16px;
                    color: #473198;
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
            `}</style>

        </>
    )
}