import { MailOutline, OpenInNew } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Ring } from '@uiball/loaders'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
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
  const router = useRouter()
  const { id } = router.query
  const [studentId, offertId] = id.split('-')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  console.log(user)

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
  console.log(offer)

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'empresa') {
    router.push('/login')
    return
  }

  async function onSubmit (data) {
    console.log(data)
    setLoading(true)
    const now = new Date()
    const docRef = doc(firestore, `EVA_ESTUDIANTE/${studentId}`)

    await setDoc(docRef, {
      adaptabilidad: +data.adaptabilidad,
      aplicacion: +data.aplicacion,
      asistencia: +data.asistencia,
      capacidad: +data.capacidad,
      capacidadDecision: +data.capacidadDecision,
      capacidadNegociar: +data.capacidadNegociar,
      comentarios: data.comentarios,
      confianza: +data.confianza,
      conocimientos: +data.conocimientos,
      creatividad: +data.creatividad,
      escrita: +data.escrita,
      ingles: +data.ingles,
      iniciativa: +data.iniciativa,
      liderazgo: +data.liderazgo,
      oral: +data.oral,
      organizacion: +data.organizacion,
      preguntaCuatro: data.preguntaCuatro,
      preguntaDos: data.preguntaDos,
      preguntaTres: data.preguntaTres,
      preguntaUno: data.preguntaUno,
      responsabilidad: +data.responsabilidad,
      trabajoEquipo: +data.trabajoEquipo,
      valoresEticosMorales: +data.valoresEticosMorales,
      fechaFinalizacion: now,
      nomnreResponsable: user.displayName,
      estudianteNombres: student.nombres,
      estudianteApellidoPaterno: student.apellidoPaterno,
      estudianteApellidoMaterno: student.apellidoMaterno,
      estudianteNom_institucion: student.nom_institucion,
      estudianteEmail: student.email,
      categoria: offer.categoria
    })
      .then(
        updateDoc(doc(firestore, `USUARIO/${studentId}/POSTULACIONES/${offertId}`), {
          fecha_finalizacion: now,
          estado: 'Finalizado'
        })
      )
      .then(
        updateDoc(doc(firestore, `test/${offertId}/POSTULANTES/${studentId}`), {
          fecha_finalizacion: now,
          estado: 'Finalizado'
        })
      )
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
              <img loading='lazy' src={offer?.logo} alt='' />
              {/* <img loading='lazy' src='https://icons-for-free.com/download-icon-google+logo+new+icon-1320185797820629294_128.png' alt='' /> */}
              <div>
                <h1><span>{offer?.cargo}, {offer?.ejercer}</span></h1>
                <span>Estas por dar como finalizado el proceso de práctica de <strong>{student?.nombres} {student?.apellidoPaterno}</strong>. Necesitamos que califiques su desempeño.</span>
                {/* <span>{offer?.cargo}, {offer?.ejercer}</span> */}
              </div>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                <div className='textarea'>
                  <strong>Capacidad:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidad')}
                      name='capacidad'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidad')}
                      name='capacidad'
                      type='radio'
                      value={2}
                    />
                    Necesita ayuda detallada para realizar los trabajos
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidad')}
                      name='capacidad'
                      type='radio'
                      value={3}
                    />
                    Necesita ayuda. Aprende metódicamente.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidad')}
                      name='capacidad'
                      type='radio'
                      value={4}
                    />
                    Necesita ayuda esporádica para realizar su trabajo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidad')}
                      name='capacidad'
                      type='radio'
                      value={5}
                    />
                    Rara vez necesita ayuda. Aprende rápido.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Responsabilidad:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('responsabilidad')}
                      name='responsabilidad'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('responsabilidad')}
                      name='responsabilidad'
                      type='radio'
                      value={2}
                    />
                    No finaliza el trabajo dentro del plazo otorgado.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('responsabilidad')}
                      name='responsabilidad'
                      type='radio'
                      value={3}
                    />
                    Comúnmente termina el trabajo dentro del plazo otorgado.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('responsabilidad')}
                      name='responsabilidad'
                      type='radio'
                      value={4}
                    />
                    Generalmente completa el trabajo dentro del plazo otorgado.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('responsabilidad')}
                      name='responsabilidad'
                      type='radio'
                      value={5}
                    />
                    Completa su trabajo dentro del plazo otorgado.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Confianza:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('confianza')}
                      name='confianza'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('confianza')}
                      name='confianza'
                      type='radio'
                      value={2}
                    />
                    Necesita monitoreo para evitar errores frecuentes.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('confianza')}
                      name='confianza'
                      type='radio'
                      value={3}
                    />
                    Necesita monitoreo para evitar uno que otro error.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('confianza')}
                      name='confianza'
                      type='radio'
                      value={4}
                    />
                    Comete errores esporádicamente.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('confianza')}
                      name='confianza'
                      type='radio'
                      value={5}
                    />
                    Termina su trabajo con precisión y buen criterio. Siempre revisa su trabajo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Aplicación:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('aplicacion')}
                      name='aplicacion'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('aplicacion')}
                      name='aplicacion'
                      type='radio'
                      value={2}
                    />
                    Necesita supervisión permanente de manera de asegurar su atención al trabajo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('aplicacion')}
                      name='aplicacion'
                      type='radio'
                      value={3}
                    />
                    Trabaja irregularmente. Normalmente pone atención al trabajo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('aplicacion')}
                      name='aplicacion'
                      type='radio'
                      value={4}
                    />
                    Generalmente coloca esfuerzo y atención.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('aplicacion')}
                      name='aplicacion'
                      type='radio'
                      value={5}
                    />
                    Siempre coloca esfuerzo y gran atención.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Adaptabilidad:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('adaptabilidad')}
                      name='adaptabilidad'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('adaptabilidad')}
                      name='adaptabilidad'
                      type='radio'
                      value={2}
                    />
                    Le cuesta adaptarse. Es indeciso y resistente a los cambios.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('adaptabilidad')}
                      name='adaptabilidad'
                      type='radio'
                      value={3}
                    />
                    Generalmente se adapta pero con dificultades.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('adaptabilidad')}
                      name='adaptabilidad'
                      type='radio'
                      value={4}
                    />
                    Se adapta a variadas situaciones con escasa dificultad.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('adaptabilidad')}
                      name='adaptabilidad'
                      type='radio'
                      value={5}
                    />
                    Cambia con facilidad y poco esfuerzo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Iniciativa:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('iniciativa')}
                      name='iniciativa'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('iniciativa')}
                      name='iniciativa'
                      type='radio'
                      value={2}
                    />
                    Evita responsabilidades. Espera que le asignen el trabajo. Alguien debe
                    explicárselo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('iniciativa')}
                      name='iniciativa'
                      type='radio'
                      value={3}
                    />
                    Espera que le asignen el trabajo. Alguien debe explicárselo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('iniciativa')}
                      name='iniciativa'
                      type='radio'
                      value={4}
                    />
                    Emprende el trabajo a medida que es necesitado.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('iniciativa')}
                      name='iniciativa'
                      type='radio'
                      value={5}
                    />
                    Realiza su trabajo sin preguntar y va más allá de lo solicitado.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Liderazgo:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={2}
                    />
                    Se limita a realizar sus tareas. No expresa su opinión.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={3}
                    />
                    Realiza sus tareas. Ocasionalmente, expresa su opinión.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={4}
                    />
                    Realiza sus tareas. Generalmente, se destaca por su opinión y por
                    liderar el trabajo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('liderazgo')}
                      name='liderazgo'
                      type='radio'
                      value={5}
                    />
                    Lidera su equipo de trabajo.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Organización:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('organizacion')}
                      name='organizacion'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('organizacion')}
                      name='organizacion'
                      type='radio'
                      value={2}
                    />
                    Es incapaz de organizar sus tareas. Requiere de un guía permanente.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('organizacion')}
                      name='organizacion'
                      type='radio'
                      value={3}
                    />
                    Ocasionalmente organiza sus tareas. Requiere de supervisión.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('organizacion')}
                      name='organizacion'
                      type='radio'
                      value={4}
                    />
                    Generalmente organiza sus tareas. Rara vez requiere de supervisión.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('organizacion')}
                      name='organizacion'
                      type='radio'
                      value={5}
                    />
                    Siempre organiza sus actividades sin requerir apoyo alguno.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Capacidad de decisión:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadDecision')}
                      name='capacidadDecision'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadDecision')}
                      name='capacidadDecision'
                      type='radio'
                      value={2}
                    />
                    Jamás toma una decisión por si sólo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadDecision')}
                      name='capacidadDecision'
                      type='radio'
                      value={3}
                    />
                    Ocasionalmente dirime con buen juicio y criterio.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadDecision')}
                      name='capacidadDecision'
                      type='radio'
                      value={4}
                    />
                    Generalmente dirime con buen juicio y criterio.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadDecision')}
                      name='capacidadDecision'
                      type='radio'
                      value={5}
                    />
                    Dirime con buen juicio y criterio.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Creatividad:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('creatividad')}
                      name='creatividad'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('creatividad')}
                      name='creatividad'
                      type='radio'
                      value={2}
                    />
                    Sólo desarrolla tareas conocidas.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('creatividad')}
                      name='creatividad'
                      type='radio'
                      value={3}
                    />
                    Es capaz de resolver algunos problemas novedosos.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('creatividad')}
                      name='creatividad'
                      type='radio'
                      value={4}
                    />
                    Generalmente resuelve problemas novedosos.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('creatividad')}
                      name='creatividad'
                      type='radio'
                      value={5}
                    />
                    Resuelve problemas novedosos en forma elegante.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Capacidad para negociar:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadNegociar')}
                      name='capacidadNegociar'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadNegociar')}
                      name='capacidadNegociar'
                      type='radio'
                      value={2}
                    />
                    Casi nunca negocia las actividades a desarrollar por el equipo. Asume toda las
                    tareas que deban desarrollarse.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadNegociar')}
                      name='capacidadNegociar'
                      type='radio'
                      value={3}
                    />
                    Ocasionalmente negocia las actividades a desarrollar por el equipo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadNegociar')}
                      name='capacidadNegociar'
                      type='radio'
                      value={4}
                    />
                    Generalmente negocia las actividades a desarrollar por el equipo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('capacidadNegociar')}
                      name='capacidadNegociar'
                      type='radio'
                      value={5}
                    />
                    Siempre discute y negocia las actividades a desarrollar.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Valores éticos y morales:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('valoresEticosMorales')}
                      name='valoresEticosMorales'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('valoresEticosMorales')}
                      name='valoresEticosMorales'
                      type='radio'
                      value={2}
                    />
                    Posee serios problemas éticos y morales dentro de la organización.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('valoresEticosMorales')}
                      name='valoresEticosMorales'
                      type='radio'
                      value={3}
                    />
                    Ocasionalmente comete actos faltos de ética y moral.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('valoresEticosMorales')}
                      name='valoresEticosMorales'
                      type='radio'
                      value={4}
                    />
                    Comete actos aislados faltos de ética y moral.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('valoresEticosMorales')}
                      name='valoresEticosMorales'
                      type='radio'
                      value={5}
                    />
                    Posee un comportamiento intachable.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Trabajo en equipo:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('trabajoEquipo')}
                      name='trabajoEquipo'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('trabajoEquipo')}
                      name='trabajoEquipo'
                      type='radio'
                      value={2}
                    />
                    Trabaja sólo y no colabora con los demás.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('trabajoEquipo')}
                      name='trabajoEquipo'
                      type='radio'
                      value={3}
                    />
                    Sólo coopera cuando acepta hacerlo.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('trabajoEquipo')}
                      name='trabajoEquipo'
                      type='radio'
                      value={4}
                    />
                    Generalmente coopera con otros.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('trabajoEquipo')}
                      name='trabajoEquipo'
                      type='radio'
                      value={5}
                    />
                    Siempre coopera. Le interesa el bien de la organización.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Conocimientos:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('conocimientos')}
                      name='conocimientos'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('conocimientos')}
                      name='conocimientos'
                      type='radio'
                      value={2}
                    />
                    Posee conocimientos elementales incompletos.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('conocimientos')}
                      name='conocimientos'
                      type='radio'
                      value={3}
                    />
                    Posee conocimientos parciales.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('conocimientos')}
                      name='conocimientos'
                      type='radio'
                      value={4}
                    />
                    Posee conocimientos generales y técnicos satisfactorias.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('conocimientos')}
                      name='conocimientos'
                      type='radio'
                      value={5}
                    />
                    Posee los conocimientos técnicos suficientes para desarrollarse profesionalmente.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Asistencia:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('asistencia')}
                      name='asistencia'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('asistencia')}
                      name='asistencia'
                      type='radio'
                      value={2}
                    />
                    Se ausenta reiteradamente.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('asistencia')}
                      name='asistencia'
                      type='radio'
                      value={3}
                    />
                    Ocasionalmente se ausenta. Generalmente por buenas razones.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('asistencia')}
                      name='asistencia'
                      type='radio'
                      value={4}
                    />
                    Es muy regular y puntual. Rara vez se ausenta.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('asistencia')}
                      name='asistencia'
                      type='radio'
                      value={5}
                    />
                    No se ausenta ni registra atrasos.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Comunicación escrita:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('escrita')}
                      name='escrita'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('escrita')}
                      name='escrita'
                      type='radio'
                      value={2}
                    />
                    Posee serias dificultades para comunicarse.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('escrita')}
                      name='escrita'
                      type='radio'
                      value={3}
                    />
                    Los informes generados poseen redacción con reparos.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('escrita')}
                      name='escrita'
                      type='radio'
                      value={4}
                    />
                    Los informes escritos están bien redactados salvo algunas faltas de ortografía.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('escrita')}
                      name='escrita'
                      type='radio'
                      value={5}
                    />
                    Posee buena redacción y ortografía.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Comunicación oral:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('oral')}
                      name='oral'
                      type='radio'
                      value={0}
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('oral')}
                      name='oral'
                      type='radio'
                      value={2}
                    />
                    Posee serias dificultades para comunicarse.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('oral')}
                      name='oral'
                      type='radio'
                      value={3}
                    />
                    Le cuesta expresar sus ideas.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('oral')}
                      name='oral'
                      type='radio'
                      value={4}
                    />
                    Casi siempre logra expresar sus ideas en forma clara y precisa.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('oral')}
                      name='oral'
                      type='radio'
                      value={5}
                    />
                    Comunica sus ideas en forma oral sin dificultades.
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>Comunicación en inglés:</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('ingles')}
                      type='radio'
                      value={0}
                      name='ingles'
                    />
                    No fue evaluado
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('ingles')}
                      type='radio'
                      value={2}
                      name='ingles'
                    />
                    Posee serias dificultades para comunicarse.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('ingles')}
                      type='radio'
                      value={3}
                      name='ingles'
                    />
                    Los informes generados poseen redacción con reparos y le cuesta comunicarse en forma oral.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('ingles')}
                      type='radio'
                      value={4}
                      name='ingles'
                    />
                    Los informes escritos están bien redactados salvo errores de ortografía y casi siempre puede comunicar sus ideas oralmente.
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('ingles')}
                      type='radio'
                      value={5}
                      name='ingles'
                    />
                    Posee buena redacción, ortografía y comunica sus ideas en forma oral sin dificultades.
                  </label>
                </div>
              </fieldset>

              <h2 className='textarea'>Opinión del empleador con respecto del practicante</h2>
              <fieldset>
                <div className='textarea'>
                  <strong>1. ¿Volvería a contratar al mismo estudiante en la práctica?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaUno')}
                      type='radio'
                      value='Sí'
                      name='preguntaUno'
                    />
                    Sí
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaUno')}
                      type='radio'
                      value='No'
                      name='preguntaUno'
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <div className='textarea'>
                  <strong>2. Si existiera la posibilidad ¿Contrataría al estudiante para trabajar en la empresa?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaDos')}
                      type='radio'
                      value='Sí'
                      name='preguntaDos'
                    />
                    Sí
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaDos')}
                      type='radio'
                      value='No'
                      name='preguntaDos'
                    />
                    No
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>3. ¿El practicante generó conflictos dentro de la organización?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaTres')}
                      type='radio'
                      value='Sí'
                      name='preguntaTres'
                    />
                    Sí
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaTres')}
                      type='radio'
                      value='No'
                      name='preguntaTres'
                    />
                    No
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <div className='textarea'>
                  <strong>4. ¿El practicante fue un aporte dentro de la organización?</strong>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaCuatro')}
                      type='radio'
                      value='Sí'
                      name='preguntaCuatro'
                    />
                    Sí
                  </label>
                  <label className='checkbox-text'>
                    <input
                      {...register('preguntaCuatro')}
                      type='radio'
                      value='No'
                      name='preguntaCuatro'
                    />
                    No
                  </label>
                </div>
              </fieldset>

              <div className='textarea'>
                <strong>Opinión o comentarios del Empleador respecto del practicante:</strong>
                <textarea
                  cols='30' rows='10' {...register('comentarios', {
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
              <p>{student?.nom_institucion}</p>
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
            object-fit: contain;
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
