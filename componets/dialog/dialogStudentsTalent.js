import { MailOutline } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, Rating, Tooltip } from '@mui/material'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import evaluacion from '../../helper/evaluacion'

export default function DialogStudentsTalent ({ row }) {
  console.log('🚀 ~ file: dialogStudentsTalent.js:10 ~ DialogStudentsTalent ~ row', row)
  // const idOffer = row.id
  const [open, setOpen] = useState(false)
  // ESTADOS: Rechazado, Aprobado, En espera, Finalizado

  const dataNumeric = []
  const data = Object.entries(row)
  data.forEach(ele => {
    if (!isNaN(ele[1]) && ele) dataNumeric.push(ele)
  })
  const withoutLast = dataNumeric.slice(0, -1)
  const filteredData = withoutLast.reduce((acc, d) => {
    const evaluacion_data = evaluacion.find((e) => e[d[0]])
    const value = evaluacion_data[d[0]].find((e) => e.value === d[1])
    acc[d[0]] = value
    return acc
  }, {})
  console.log('🚀 ~ file: dialogStudentsTalent.js:69 ~ filteredData ~ filteredData', filteredData)

  return (
    <>
      <Tooltip title='Haz click para ver más información de esta oferta' arrow placement='top'>
        <a onClick={() => {
          setOpen(true)
        }}
        >
          {row.estudianteNombres} {row.estudianteApellidoPaterno} {row.estudianteApellidoMaterno}
          <Toaster />
        </a>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll='paper'
        maxWidth='lg'
        fullWidth
      >
        <DialogTitle>Detalle de evaluación <span>{row.estudianteNombres} {row.estudianteApellidoPaterno} {row.estudianteApellidoMaterno}</span></DialogTitle>
        <DialogContent>
          <section>
            <article>
              <strong>Capacidad:</strong> {filteredData.capacidad.text}
              <strong>Responsabilidad:</strong> {filteredData.responsabilidad.text}
              <strong>Confianza:</strong> {filteredData.confianza.text}
              <strong>Aplicación:</strong> {filteredData.aplicacion.text}
              <strong>Adaptabilidad:</strong> {filteredData.adaptabilidad.text}
              <strong>Iniciativa:</strong> {filteredData.iniciativa.text}
              <strong>Liderazgo:</strong> {filteredData.liderazgo.text}
              <strong>Organización:</strong> {filteredData.organizacion.text}
              <strong>Capacidad de decisión:</strong> {filteredData.capacidadDecision.text}
              <strong>Creatividad:</strong> {filteredData.creatividad.text}
              <strong>Capacidad para negociar:</strong> {filteredData.capacidadNegociar.text}
              <strong>Valores éticos y morales:</strong> {filteredData.valoresEticosMorales.text}
              <strong>Trabajo en equipo:</strong> {filteredData.trabajoEquipo.text}
              <strong>Conocimientos:</strong> {filteredData.conocimientos.text}
              <strong>Asistencia:</strong> {filteredData.asistencia.text}
              <strong>Comunicación escrita:</strong> {filteredData.escrita.text}
              <strong>Comunicación oral:</strong> {filteredData.oral.text}
              <strong>Comunicación en inglés:</strong> {filteredData.ingles.text}
              <strong>1. ¿Volvería a contratar al mismo estudiante en la práctica?</strong> {row.preguntaUno}
              <strong>2. Si existiera la posibilidad ¿Contrataría al estudiante para trabajar en la empresa?</strong> {row.preguntaDos}
              <strong>3. ¿El practicante generó conflictos dentro de la organización?</strong> {row.preguntaTres}
              <strong>4. ¿El practicante fue un aporte dentro de la organización?</strong> {row.preguntaCuatro}
              <strong>Opinión o comentarios del Empleador respecto del practicante:</strong> {row.comentarios}
            </article>
            <aside>
              <div>
                <Rating precision={0.5} value={row.promedio} readOnly />
                <strong>Nombre completo:</strong>
                <p>{row.estudianteNombres} {row.estudianteApellidoPaterno} {row.estudianteApellidoMaterno}</p>
                <strong>Área de práctica:</strong>
                <p>{row.categoria}</p>
                <strong>Fecha de evaluación:</strong>
                <p>{row.fechaFinalizacion}</p>
                <Button size='small' href={`mailto:${row.estudianteEmail}`} startIcon={<MailOutline />}>
                  Correo electronico
                </Button>
              </div>
              {/* <img src={student?.avatar} alt='' /> */}

            </aside>
          </section>
        </DialogContent>
      </Dialog>

      <style jsx>{`
              a {
                color: #473198;
                font-weight: bold;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
                cursor: pointer;
              }
              span {
                color: #473198;
                font-weight: bold;
              }
              label {
                border-radius: 5px;
                padding: 5px 8px;
              }
              section {
                display: flex;
                width: 100%;
                justify-content: space-between;
              }
              section strong {
                display: flex;
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
          `}
      </style>
    </>
  )
}
