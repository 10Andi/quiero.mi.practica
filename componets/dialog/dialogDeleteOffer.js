import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { firestore } from '../../firebase/client'

export default function DialogDeleteOffer ({ row }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (isDelete, id, cargo, ejercer) => {
    // console.log(isDelete)
    // console.log(idOffert)
    if (isDelete) {
      deleteOffert(id)
        .finally(toast.error(`Has eliminado la oferta: ${cargo}, ${ejercer}`))

      setOpen(false)
    } else {
      setOpen(false)
    }
  }

  const deleteOffert = async (idOffert) => {
    await deleteDoc(doc(firestore, 'test', idOffert))
  }

  return (
    <>
      <IconButton onClick={() => handleClickOpen()}>
        <DeleteForeverIcon style={{ color: '#FC9292', cursor: 'pointer' }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Estas seguro de quererar eliminar la oferta: {row.cargo}, {row.ejercer}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Una vez eliminada la oferta se perderá toda la información.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancelar</Button>
          <Button color='error' onClick={() => handleClose(true, row.id, row.cargo, row.ejercer)} autoFocus>Eliminar oferta</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
