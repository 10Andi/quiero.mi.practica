import { MailOutline, OpenInNew } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TaskIcon from '@mui/icons-material/Task'
import { Button, Collapse, Divider, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { doc, increment, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { firestore } from '../../firebase/client'

export default function BodyTableCollapse ({ row, idOffer }) {
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
          {/* {row.estado === 'Práctica finalizada' && <label style={{ background: '#e6e6e6' }}>Práctica finalizada</label>} */}
        </TableCell>
        <TableCell align='center'>
          {row.estado === 'Aprobado'
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
          {row.estado === 'Rechazado'
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
          {row.estado === 'Rechazado'
            ? (
              <IconButton
                size='small'
                disabled
              >
                <TaskIcon fontSize='large' />
              </IconButton>
              )
            : (
              <IconButton size='small'>
                <Link href={`/finalizarpractica/${row.id}-${idOffer}`}>
                  <TaskIcon fontSize='large' style={{ color: '#473198', cursor: 'pointer' }} />
                </Link>
              </IconButton>
              )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={openCollapse} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                Respuestas
              </Typography>
              <Table size='small'>
                <TableHead>
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
              <p>Nombre completo: asd asdasdasdasdasd asdasdasd</p>
              <p>Rut: 1231231231-1</p>
              <p>Comuna: asdasd asd asd</p>
              <p>Región: asd asd asdasdasdasd asd</p>
              <p>Nombre institución: asd asdasdasd</p>
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
              </Stack>
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
        `}
      </style>
    </>
  )
}
