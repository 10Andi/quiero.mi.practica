import { Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { firestore } from '../../firebase/client'
import BodyTableCollapse from './bodytablecollapse'

export default function DialogStudents ({ row }) {
  const idOffer = row.id
  const [open, setOpen] = useState(false)
  const [studentsList, setStudentsList] = useState()
  // Rechazado, Aprobado, En espera, Finalizado

  useEffect(() => {
    // async function getStudent (row) {
    // 'test'/${idOffer}/'POSTULANTES'/
    const unsubscribe = onSnapshot(query(collection(firestore, `test/${idOffer}/POSTULANTES/`)), querySnapshot => {
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
    // }
    return () => unsubscribe()

    // getStudent().then(setStudentsList)
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
