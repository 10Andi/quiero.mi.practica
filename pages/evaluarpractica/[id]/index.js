
// import { Button } from '@mui/material'
import { Ring } from '@uiball/loaders'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useForm } from 'react-hook-form'
import NavRegister from '../../../componets/nav/navregister'
import { useAuth } from '../../../context/AuthContext'
import { firestore } from '../../../firebase/client'

export default function EvaluarPractica () {
  const { user } = useAuth()
  const [offer, setOffer] = useState(null)
  console.log('🚀 ~ file: index.js:16 ~ EvaluarPractica ~ offer', offer)
  // console.log('🚀 ~ file: index.js:16 ~ EvaluarPractica ~ offer.idEmpresa', offer.idEmpresa)
  // const [student, setStundet] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const [offerId, companyId] = id.split('-')
  console.log('🚀 ~ file: index.js:21 ~ EvaluarPractica ~ offerId, companyId', offerId, companyId)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  console.log(user)

  useEffect(() => {
    setLoading(true)

    async function getOffer () {
      const docRef = doc(firestore, `test/${offerId}`)
      const docSnap = await getDoc(docRef)
      const offertDataFirestore = docSnap.data()
      // console.log(offertDataFirestore)
      return offertDataFirestore
    }

    getOffer().then(setOffer).finally(setLoading(false))
  }, [offerId])
  console.log(offer)

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'estudiante') {
    router.push('/login')
    return
  }

  async function onSubmit (data) {
    console.log(data)
    setLoading(true)
    const now = new Date()
    const docRef = doc(firestore, `EVA_EMPRESA/${companyId}`)
    const dataNum = [
      +data.material,
      +data.capacitacion,
      +data.tutor,
      +data.contrato,
      +data.pago,
      +data.horarios,
      +data.liderazgo,
      +data.companeros,
      +data.inclusividad,
      +data.recomendarias]
    let sumaCalificaciones = 0
    dataNum.forEach(ele => {
      if (ele === 0) return
      sumaCalificaciones = sumaCalificaciones + ele
    })
    const promedio = sumaCalificaciones / dataNum.filter(ele => ele !== 0).length

    // [user.uid]: {
    //   material: +data.material,
    //   capacitacion: +data.capacitacion,
    //   tutor: +data.tutor,
    //   contrato: +data.contrato,
    //   pago: +data.pago,
    //   horarios: +data.horarios,
    //   comentarios: data.comentarios,
    //   liderazgo: +data.liderazgo,
    //   companeros: +data.companeros,
    //   inclusividad: +data.inclusividad,
    //   recomendarias: +data.recomendarias,
    //   fechaEvaluacion: now,
    //   idPractica: id
    //   // nomnreResponsable: user.displayName,
    //   // estudianteNombres: student.nombres,
    //   // estudianteApellidoPaterno: student.apellidoPaterno,
    //   // estudianteApellidoMaterno: student.apellidoMaterno,
    //   // estudianteNom_institucion: student.nom_institucion,
    //   // estudianteEmail: student.email,
    //   // categoria: offer.categoria
    // }
    await setDoc(docRef, {
      [user.uid]: promedio
    })
      .then(
        updateDoc(doc(firestore, `USUARIO/${user.uid}/POSTULACIONES/${offerId}`), {
          fecha_finalizacion: now,
          estado: 'Finalizado',
          evaluacionEmpresa: true
        })
      )
      // .then(
      //   updateDoc(doc(firestore, `test/${offertId}/POSTULANTES/${studentId}`), {
      //     fecha_finalizacion: now,
      //     estado: 'Finalizado'
      //   })
      // )
      .finally(() => {
        setLoading(false)
        router.push('/mispostulaciones')
      })
  }

  return (
    <>
      <section>
        <NavRegister />
        {/* <Button size='large' startIcon={<ArrowBackIcon />}>Volver</Button> */}
        <div className='layout'>
          <main>
            <header>
              <img loading='lazy' src={offer?.logo} alt='' />
              <div>
                <h1>Estas por evaluar como fue tu práctica como  <span>{offer?.cargo}, {offer?.ejercer}</span></h1>
                <span>Necesitamos que califiques como fue tu experiencia en <b>{offer?.nombre_empresa}</b> durante tu práctica, con el fin de que podamos compartir este feedback con los próximos interesados en postular a esta empresa.</span>
              </div>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <div className='textarea'>
                  <strong>¿La empresa entregó el material necesario para realizar tu trabajo?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('material')}
                      name='material'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('material')}
                      name='material'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('material')}
                      name='material'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('material')}
                      name='material'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('material')}
                      name='material'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿La empresa entregó servicios de capacitación profesional?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacitacion')}
                      name='capacitacion'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacitacion')}
                      name='capacitacion'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacitacion')}
                      name='capacitacion'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacitacion')}
                      name='capacitacion'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacitacion')}
                      name='capacitacion'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿Se te asigno un tutor?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('tutor')}
                      name='tutor'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('tutor')}
                      name='tutor'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('tutor')}
                      name='tutor'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('tutor')}
                      name='tutor'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('tutor')}
                      name='tutor'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿La empresa cumple con lo ofrecido en el contrato?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('contrato')}
                      name='contrato'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('contrato')}
                      name='contrato'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('contrato')}
                      name='contrato'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('contrato')}
                      name='contrato'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('contrato')}
                      name='contrato'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿La empresa respeto las fechas de pago?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('pago')}
                      name='pago'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('pago')}
                      name='pago'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('pago')}
                      name='pago'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('pago')}
                      name='pago'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('pago')}
                      name='pago'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿La empresa cumple con los horarios estipulados?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('horarios')}
                      name='horarios'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('horarios')}
                      name='horarios'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('horarios')}
                      name='horarios'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('horarios')}
                      name='horarios'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('horarios')}
                      name='horarios'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿Los jefes directos demuestran liderazgo?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿Tus compañeros de trabajo son éticos?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('companeros')}
                      name='companeros'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('companeros')}
                      name='companeros'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('companeros')}
                      name='companeros'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('companeros')}
                      name='companeros'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('companeros')}
                      name='companeros'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿La empresa cumple con los estándares de inclusividad?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('inclusividad')}
                      name='inclusividad'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('inclusividad')}
                      name='inclusividad'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('inclusividad')}
                      name='inclusividad'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('inclusividad')}
                      name='inclusividad'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('inclusividad')}
                      name='inclusividad'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>¿Recomendarías esta empresa a otro practicante?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('recomendarias')}
                      name='recomendarias'
                      type='radio'
                      value={0}
                    />
                    No aplica.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('recomendarias')}
                      name='recomendarias'
                      type='radio'
                      value={2}
                    />
                    En desacuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('recomendarias')}
                      name='recomendarias'
                      type='radio'
                      value={3}
                    />
                    Neutro.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('recomendarias')}
                      name='recomendarias'
                      type='radio'
                      value={4}
                    />
                    De acuerdo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('recomendarias')}
                      name='recomendarias'
                      type='radio'
                      value={5}
                    />
                    Completamente de acuerdo.
                  </label>
                </div>
              </fieldset>
              <div className='textarea'>
                <strong>Opinión o comentarios a la práctica:</strong>
                <textarea
                  cols='30' rows='10' {...register('comentarios', {
                    required: true
                  })}
                />
              </div>

              <div className='registro-btn'>
                <button type='submit'>Finalizar evaluación</button>
              </div>
            </form>

          </main>
          {/* <aside>
            <div>
              <strong>Nombre completo:</strong>
              <p>{student?.nombres} {student?.apellidoPaterno} {student?.apellidoMaterno}</p>
              <strong>Fecha de aceptación:</strong>
              <p>20/29/20</p>
              <strong>Institución:</strong>
              <p>{student?.nom_institucion}</p>
              <Button size='small' href={`mailto:${student?.email}`} startIcon={<MailOutline />}>
                Correo electronico
              </Button>
              <Button size='small' href={student?.certificadoAlumnoRegular} startIcon={<OpenInNew />}>
                Link Certificado Alumno Regular
              </Button>
            </div>
            <img src={student?.avatar} alt='' />

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
            <span>Políticas de trabajo:</span>
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
      <style jsx>
        {`
          fieldset {
            border: none;
          }
          .checkbox-text {
              display: flex;
              gap: 10px;
              margin-bottom: 10px;
            }
            input[type="checkbox"] {
              width: min-content;
            }
            input[type="radio"] {
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
            object-fit: contain;

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
