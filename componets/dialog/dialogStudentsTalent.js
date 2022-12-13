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
              <strong>Capacidad:</strong>
              <p>
                {filteredData.capacidad.text}
              </p>
              <strong>Responsabilidad:</strong>
              <p>
                {filteredData.responsabilidad.text}
              </p>
              <strong>Confianza:</strong>
              <p>
                {filteredData.confianza.text}
              </p>
              <strong>Aplicación:</strong>
              <p>
                {filteredData.aplicacion.text}
              </p>
              <strong>Adaptabilidad:</strong>
              <p>
                {filteredData.adaptabilidad.text}
              </p>
              <strong>Iniciativa:</strong>
              <p>
                {filteredData.iniciativa.text}
              </p>
              <strong>Liderazgo:</strong>
              <p>
                {filteredData.liderazgo.text}
              </p>
              <strong>Organización:</strong>
              <p>
                {filteredData.organizacion.text}
              </p>
              <strong>Capacidad de decisión:</strong>
              <p>
                {filteredData.capacidadDecision.text}
              </p>
              <strong>Creatividad:</strong>
              <p>
                {filteredData.creatividad.text}
              </p>
              <strong>Capacidad para negociar:</strong>
              <p>
                {filteredData.capacidadNegociar.text}
              </p>
              <strong>Valores éticos y morales:</strong>
              <p>
                {filteredData.valoresEticosMorales.text}
              </p>
              <strong>Trabajo en equipo:</strong>
              <p>
                {filteredData.trabajoEquipo.text}
              </p>
              <strong>Conocimientos:</strong>
              <p>
                {filteredData.conocimientos.text}
              </p>
              <strong>Asistencia:</strong>
              <p>
                {filteredData.asistencia.text}
              </p>
              <strong>Comunicación escrita:</strong>
              <p>
                {filteredData.escrita.text}
              </p>
              <strong>Comunicación oral:</strong>
              <p>
                {filteredData.oral.text}
              </p>
              <strong>Comunicación en inglés:</strong>
              <p>
                {filteredData.ingles.text}
              </p>
              <strong>1. ¿Volvería a contratar al mismo estudiante en la práctica?</strong> <p>{row.preguntaUno}</p>
              <strong>2. Si existiera la posibilidad ¿Contrataría al estudiante para trabajar en la empresa?</strong> <p>{row.preguntaDos}</p>
              <strong>3. ¿El practicante generó conflictos dentro de la organización?</strong> <p>{row.preguntaTres}</p>
              <strong>4. ¿El practicante fue un aporte dentro de la organización?</strong> <p>{row.preguntaCuatro}</p>
              <strong>Opinión o comentarios del Empleador respecto del practicante:</strong> <p>{row.comentarios}</p>
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
                //display: flex;
                //width: 100%;
                //justify-content: space-between;
                display: grid;
                grid-template-columns: 3fr 1fr;
                grid-template-rows: 1fr;
                grid-column-gap: 0px;
                grid-row-gap: 0px;
              }
              section strong {
                display: flex;
              }
              article p {
                margin: 0;
                margin-bottom: 10px;
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
