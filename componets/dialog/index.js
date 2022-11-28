import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MailOutline, OpenInNew } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TaskIcon from '@mui/icons-material/Task'
import { collection, doc, increment, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { firestore } from '../../firebase/client'
import BodyTableCollapse from './bodytablecollapse'

export default function DialogStudents ({ row }) {
  // const { user } = useAuth()
  const idOffer = row.id
  // const [ loading, setLoading ] = useState(false)
  const [open, setOpen] = useState(false)
  // const [openCollapse, setOpenCollapse] = useState(false)
  const [studentsList, setStudentsList] = useState()
  // Rechazado, Aprobado, En espera

  // async function acceptStudent (idStudent) {
  //   // setLoading(true)
  //   const now = new Date()
  //   const decrementRef = doc(firestore, 'test', idOffer)

  //   await updateDoc(decrementRef, {
  //     cupos: increment(-1)
  //   })
  //   await updateDoc(doc(firestore, `test/${idOffer}/POSTULANTES/${idStudent}`), {
  //     fecha_aprobacion: now,
  //     estado: 'Aprobado'
  //   })
  //     .then(
  //       updateDoc(doc(firestore, `USUARIO/${idStudent}/POSTULACIONES/${idOffer}`), {
  //         fecha_aprobacion: now,
  //         estado: 'Aprobado'
  //       })
  //     )
  // }

  // async function rejectStudent (idStudent) {
  //   // setLoading(true)
  //   const now = new Date()
  //   const incrementRef = doc(firestore, 'test', idOffer)

  //   await updateDoc(incrementRef, {
  //     cupos: increment(1)
  //   })
  //   await updateDoc(doc(firestore, `test/${idOffer}/POSTULANTES/${idStudent}`), {
  //     fecha_rechazo: now,
  //     estado: 'Rechazado'
  //   })
  //     .then(
  //       updateDoc(doc(firestore, `USUARIO/${idStudent}/POSTULACIONES/${idOffer}`), {
  //         fecha_rechazo: now,
  //         estado: 'Rechazado'
  //       })
  //     )
  // }

  useEffect(() => {
    async function getStudent (row) {
      // 'test'/${idOffer}/'POSTULANTES'/
      await onSnapshot(query(collection(firestore, `test/${idOffer}/POSTULANTES/`)), querySnapshot => {
        setStudentsList(querySnapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          const { fechaPostulacion } = data

          // console.log(data)

          const date = new Date(fechaPostulacion.seconds * 1000)
          const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL', { dateStyle: 'long', timeStyle: 'medium' }).format(date)

          return {
            ...data,
            id,
            fechaPostulacion: normalizedCreatedAt
          }
        }))
      })
    }
    getStudent().then(setStudentsList)
  }, [idOffer])

  return (
    <>
      <Tooltip title='Haz click para ver más información de esta oferta' arrow placement='top'>
        <a onClick={() => {
          setOpen(true)
        }}
        >
          {row.cargo}, {row.ejercer}
          <Toaster />
        </a>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll='paper'
        maxWidth='xl'
        fullWidth
      >
        <DialogTitle>Postulantes para <span>{row.cargo}, {row.ejercer}</span></DialogTitle>
        <DialogContent>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Nombre completo</TableCell>
                  <TableCell align='right'>RUT</TableCell>
                  <TableCell align='right'>Fecha de postulación</TableCell>
                  <TableCell align='center'>Estado</TableCell>
                  <TableCell align='center'>Aceptar</TableCell>
                  <TableCell align='center'>Rechazar</TableCell>
                  <TableCell align='center'>Finalizar práctica</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsList && studentsList.map((row) => (
                  // <React.Fragment key={row.id}>
                  //   <TableRow key={row.id} id={row.id} hover>
                  //     <TableCell style={{ width: '62px' }}>
                  //       <IconButton
                  //         aria-label='expand row'
                  //         size='small'
                  //         onClick={() => setOpenCollapse(!openCollapse)}
                  //       >
                  //         {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  //       </IconButton>
                  //     </TableCell>
                  //     <TableCell component='th' scope='row'>{row.nombres} {row.apellidoPaterno} {row.apellidoMaterno}</TableCell>
                  //     <TableCell align='right'>{row.rut}</TableCell>
                  //     <TableCell align='right'>{row.fechaPostulacion}</TableCell>
                  //     <TableCell align='center'>
                  //       {row.estado === 'Aprobado' && <label style={{ background: '#adfc92' }}>Aprobado</label>}
                  //       {row.estado === 'Rechazado' && <label style={{ background: '#FC9292' }}>Rechazado</label>}
                  //       {row.estado === 'En espera' && <label style={{ background: '#e6e6e6' }}>En espera</label>}
                  //       {/* {row.estado === 'Práctica finalizada' && <label style={{ background: '#e6e6e6' }}>Práctica finalizada</label>} */}
                  //     </TableCell>
                  //     <TableCell align='center'>
                  //       {row.estado === 'Aprobado'
                  //         ? (
                  //           <IconButton
                  //             size='small'
                  //             disabled
                  //           >
                  //             <CheckCircleIcon fontSize='large' />
                  //           </IconButton>
                  //           )
                  //         : (
                  //           <IconButton
                  //             size='small'
                  //             onClick={(e) => {
                  //               e.stopPropagation()
                  //               acceptStudent(row.id)
                  //                 .finally(toast.success(`Haz aceptado a ${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`))
                  //             }}
                  //           >
                  //             <CheckCircleIcon fontSize='large' style={{ color: '#ADFC92', cursor: 'pointer' }} />
                  //           </IconButton>)}
                  //     </TableCell>
                  //     <TableCell align='center'>
                  //       {row.estado === 'Rechazado'
                  //         ? (
                  //           <IconButton
                  //             size='small'
                  //             disabled
                  //           >
                  //             <DoDisturbOnIcon fontSize='large' />
                  //           </IconButton>
                  //           )
                  //         : (
                  //           <IconButton
                  //             size='small'
                  //             onClick={(e) => {
                  //               e.stopPropagation()
                  //               rejectStudent(row.id)
                  //                 .finally(toast.error(`Haz rechazado a ${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`))
                  //             }}
                  //           >
                  //             <DoDisturbOnIcon fontSize='large' style={{ color: '#FC9292', cursor: 'pointer' }} />
                  //           </IconButton>
                  //           )}
                  //     </TableCell>
                  //     <TableCell align='center'>
                  //       {row.estado === 'Rechazado'
                  //         ? (
                  //           <IconButton
                  //             size='small'
                  //             disabled
                  //           >
                  //             <TaskIcon fontSize='large' />
                  //           </IconButton>
                  //           )
                  //         : (
                  //           <IconButton size='small'>
                  //             <Link href={`/finalizarpractica/${row.id}`}>
                  //               <TaskIcon fontSize='large' style={{ color: '#473198', cursor: 'pointer' }} />
                  //             </Link>
                  //           </IconButton>
                  //           )}
                  //     </TableCell>
                  //   </TableRow>

                  //   <TableRow>
                  //     <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                  //       <Collapse in={openCollapse} timeout='auto' unmountOnExit>
                  //         <Box sx={{ margin: 1 }}>
                  //           <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                  //             Respuestas
                  //           </Typography>
                  //           <Table size='small'>
                  //             <TableHead>
                  //               <TableRow>
                  //                 <TableCell>Pregunta 1</TableCell>
                  //                 <TableCell>Pregunta 2</TableCell>
                  //               </TableRow>
                  //             </TableHead>
                  //             <TableBody>
                  //               <TableRow>
                  //                 <TableCell component='th' scope='row'>{row.infoPersonal}</TableCell>
                  //                 <TableCell>{row.infoEstudio}</TableCell>
                  //               </TableRow>
                  //             </TableBody>
                  //           </Table>
                  //           <Typography variant='h6' gutterBottom component='div' marginTop={2}>
                  //             Información
                  //           </Typography>
                  //           <p>Nombre completo: asd asdasdasdasdasd asdasdasd</p>
                  //           <p>Rut: 1231231231-1</p>
                  //           <p>Comuna: asdasd asd asd</p>
                  //           <p>Región: asd asd asdasdasdasd asd</p>
                  //           <p>Nombre institución: asd asdasdasd</p>
                  //           <Stack
                  //             direction='row'
                  //             divider={<Divider orientation='vertical' flexItem />}
                  //             spacing={2}
                  //           >
                  //             {/* <Button size="small" href='' endIcon={<OpenInNew />}>
                  //               Link CV
                  //             </Button> */}
                  //             <Button size='small' href={row.certificadoAlumnoRegular} endIcon={<OpenInNew />}>
                  //               Link Certificado Alumno Regular
                  //             </Button>
                  //             <Button size='small' href={`mailto:${row.email}`} endIcon={<MailOutline />}>
                  //               Correo electronico
                  //             </Button>
                  //           </Stack>
                  //         </Box>
                  //       </Collapse>
                  //     </TableCell>
                  //   </TableRow>
                  // </React.Fragment>
                  <BodyTableCollapse key={row.id} row={row} idOffer={idOffer} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
          `}
      </style>
    </>
  )
}
