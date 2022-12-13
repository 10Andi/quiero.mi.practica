import { MailOutline, OpenInNew } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TaskIcon from '@mui/icons-material/Task'
import { Button, Collapse, Divider, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { doc, increment, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { firestore } from '../../firebase/client'

export default function BodyTableCollapse ({ row, idOffer }) {
  // console.log('🚀 ~ file: bodytablecollapse.js:16 ~ BodyTableCollapse ~ row', row)
  const [openCollapse, setOpenCollapse] = useState(false)

  async function acceptStudent (idStudent) {
    // setLoading(true)
    const now = new Date()
    const decrementRef = doc(firestore, 'test', idOffer)

    await updateDoc(decrementRef, {
      cupos: increment(-1)
    })
    await updateDoc(doc(firestore, `test/${idOffer}/POSTULANTES/${idStudent}`), {
      fecha_aprobacion: now,
      estado: 'Aprobado'
    })
      .then(
        updateDoc(doc(firestore, `USUARIO/${idStudent}/POSTULACIONES/${idOffer}`), {
          fecha_aprobacion: now,
          estado: 'Aprobado'
        })
      )
  }

  async function rejectStudent (idStudent) {
    // setLoading(true)
    const now = new Date()
    const incrementRef = doc(firestore, 'test', idOffer)

    await updateDoc(incrementRef, {
      cupos: increment(1)
    })
    await updateDoc(doc(firestore, `test/${idOffer}/POSTULANTES/${idStudent}`), {
      fecha_rechazo: now,
      estado: 'Rechazado'
    })
      .then(
        updateDoc(doc(firestore, `USUARIO/${idStudent}/POSTULACIONES/${idOffer}`), {
          fecha_rechazo: now,
          estado: 'Rechazado'
        })
      )
  }

  return (
    <>
      <TableRow key={row.id} id={row.id} hover>
        <TableCell style={{ width: '62px' }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>{row.nombres} {row.apellidoPaterno} {row.apellidoMaterno}</TableCell>
        <TableCell align='right'>{row.rut}</TableCell>
        <TableCell align='right'>{row.fechaPostulacion}</TableCell>
        <TableCell align='center'>
          {row.estado === 'Aprobado' && <label style={{ background: '#adfc92' }}>Aprobado</label>}
          {row.estado === 'Rechazado' && <label style={{ background: '#FC9292' }}>Rechazado</label>}
          {row.estado === 'En espera' && <label style={{ background: '#e6e6e6' }}>En espera</label>}
          {/* {row.estado === 'Finalizado' && <label style={{ background: '#e6e6e6' }}>Práctica finalizada</label>} */}
          {row.estado === 'Finalizado' && <label style={{ background: '#473198', color: 'white' }}>Práctica finalizada</label>}
        </TableCell>
        <TableCell align='center'>
          {row.estado === 'Aprobado' || row.estado === 'Finalizado'
            ? (
              <IconButton
                size='small'
                disabled
              >
                <CheckCircleIcon fontSize='large' />
              </IconButton>
              )
            : (
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation()
                  acceptStudent(row.id)
                    .finally(toast.success(`Haz aceptado a ${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`))
                }}
              >
                <CheckCircleIcon fontSize='large' style={{ color: '#ADFC92', cursor: 'pointer' }} />
              </IconButton>)}
        </TableCell>
        <TableCell align='center'>
          {row.estado === 'Rechazado' || row.estado === 'Finalizado'
            ? (
              <IconButton
                size='small'
                disabled
              >
                <DoDisturbOnIcon fontSize='large' />
              </IconButton>
              )
            : (
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation()
                  rejectStudent(row.id)
                    .finally(toast.error(`Haz rechazado a ${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`))
                }}
              >
                <DoDisturbOnIcon fontSize='large' style={{ color: '#FC9292', cursor: 'pointer' }} />
              </IconButton>
              )}
        </TableCell>
        <TableCell align='center'>
          {row.estado === 'Aprobado'
            ? (
              <IconButton size='small'>
                <Link href={`/finalizarpractica/${row.id}-${idOffer}`}>
                  <TaskIcon fontSize='large' style={{ color: '#473198', cursor: 'pointer' }} />
                </Link>
              </IconButton>
              )
            : (
              <IconButton
                size='small'
                disabled
              >
                <TaskIcon fontSize='large' />
              </IconButton>
              )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={openCollapse} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                Respuestas
              </Typography>
              <Table size='small'>
                <TableHead style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)'
                }}
                >
                  <TableRow>
                    <TableCell>Cuéntanos sobre tu experiencia y perfil profesional.</TableCell>
                    <TableCell>Cuéntanos sobre tu formación académica y estudios.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>{row.infoPersonal}</TableCell>
                    <TableCell>{row.infoEstudio}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                Información
              </Typography>
              <p>Nombre completo: {row.nombres} {row.apellidoPaterno} {row.apellidoMaterno}</p>
              <p>Rut: {row.rut}</p>
              <p>Comuna: {row.comuna}</p>
              <p>Región: {row.region}</p>
              <p>Nombre institución: {row.nom_institucion}</p>
              <Stack
                direction='row'
                divider={<Divider orientation='vertical' flexItem />}
                spacing={2}
              >
                <Button size='small' href={row.certificadoAlumnoRegular} endIcon={<OpenInNew />}>
                  Link Certificado Alumno Regular
                </Button>
                <Button size='small' href={`mailto:${row.email}`} endIcon={<MailOutline />}>
                  Correo electronico
                </Button>
              </Stack> */}
              <section>
                <article>
                  <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                    Respuestas
                  </Typography>
                  <strong>
                    Cuéntanos sobre tu experiencia y perfil profesional
                  </strong>
                  <p>
                    {row.infoPersonal}
                  </p>
                  <strong>
                    Cuéntanos sobre tu formación académica y estudios
                  </strong>
                  <p>
                    {row.infoEstudio}
                  </p>
                </article>
                <aside>
                  <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                    Información
                  </Typography>
                  <p><b>Nombre completo:</b> {row.nombres} {row.apellidoPaterno} {row.apellidoMaterno}</p>
                  <p><b>Rut:</b> {row.rut}</p>
                  <p><b>Comuna:</b> {row.comuna}</p>
                  <p><b>Región:</b> {row.region}</p>
                  <p><b>Nombre institución:</b> {row.nom_institucion}</p>
                  <Stack
                    direction='row'
                    divider={<Divider orientation='vertical' flexItem />}
                    spacing={2}
                  >
                    <Button size='small' href={row.certificadoAlumnoRegular} target='_blank' rel='noopener noreferrer' endIcon={<OpenInNew />}>
                      Link Certificado Alumno Regular
                    </Button>
                    <Button size='small' href={`mailto:${row.email}`} endIcon={<MailOutline />}>
                      Correo electronico
                    </Button>
                  </Stack>
                </aside>
              </section>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <style jsx>
        {`
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
            flex-direction: column;
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
        `}
      </style>
    </>
  )
}
