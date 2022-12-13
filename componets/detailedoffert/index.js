import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useOffert } from '../../context/offertContext'
import DeletePostulation from '../icons/deletepostulation'
import Locate from '../icons/locate'

export default function DetailedOffert () {
  const { user } = useAuth()
  const { offertSelected, offerStatus } = useOffert()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {!offertSelected
        ? null
        : (
          <>
            <section key={offertSelected.id}>
              <div className='infoCompany'>
                <img loading='lazy' src={offertSelected.logo} alt={offertSelected.nombre_empresa} />
                <h4>{offertSelected.cargo}<br />{offertSelected.ejercer}</h4>
                <strong>{offertSelected.nombre_empresa}</strong>
                <div className='location'>
                  <Locate />
                  <span>{offertSelected.comuna}, {offertSelected.ciudad}</span>
                </div>
                <Rating name='size-small' defaultValue={offertSelected.promedio} precision={0.5} size='small' readOnly />
              </div>

              <div className='infoOffert'>
                <span>Requerimientos:</span>
                <p>{offertSelected.requerimiento}</p>
                <span>Sobre el trabajo:</span>
                <p>{offertSelected.descripcion}</p>
                <span>Conocimientos:</span>
                <p>{offertSelected.condicion}</p>
                <span>Beneficios:</span>
                <p>{offertSelected.beneficios}</p>
                <span>Políticas de trabajo:</span>
                <p>{offertSelected.politica_trabajo}</p>
                {/* <a href="">Leer más</a> */}
              </div>

              <div className='postulate'>
                {!user.postulado?.includes(offertSelected.id) &&
                  <Link href={`/postular/${offertSelected.id}`}>
                    <a>
                      <button className='postularBtn'>Postular</button>
                    </a>
                  </Link>}
                {offerStatus?.map(ele => {
                  if (ele.id === offertSelected.id && ele.estado === 'Aprobado') return (<button key={`${ele.id}-${ele.estado}`} disabled className='aprobadoBtn'>Aprobado</button>)
                  if (ele.id === offertSelected.id && ele.estado === 'Rechazado') return (<button key={`${ele.id}-${ele.estado}`} disabled className='rechazadoBtn'>Rechazado</button>)
                  if (ele.id === offertSelected.id && ele.estado === 'En espera') return (<button key={`${ele.id}-${ele.estado}`} disabled className='enEsperaBtn'>En espera</button>)
                  if (ele.id === offertSelected.id && ele.estado === 'Finalizado') {
                    return (
                    // <button key={`${ele.id}-${ele.estado}`} className='enEsperaBtn'>En espera</button>
                      <Link key={`${ele.id}-${ele.estado}`} href={`/evaluarpractica/${offertSelected.id}`}>
                        <a>
                          <button className='evaluarBtn'>Evaluar práctica</button>
                        </a>
                      </Link>
                    )
                  }
                  return null
                })}
                {user.postulado?.includes(offertSelected.id) &&
                  <>
                    <Tooltip title='Puedes elimiar tu postulación cuando lo desees.' placement='top' arrow>
                      <button className='commentBtn' onClick={handleClickOpen}>
                        <DeletePostulation stroke='white' />
                      </button>
                    </Tooltip>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='alert-dialog-title'
                      aria-describedby='alert-dialog-description'
                    >
                      <DialogTitle id='alert-dialog-title'>
                        Estas seguro de quererar eliminar tu postulación?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                          Let Google help apps determine location. This means sending anonymous
                          location data to Google, even when no apps are running.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button color='error' onClick={handleClose} autoFocus>Eliminar postulación</Button>
                      </DialogActions>
                    </Dialog>
                  </>}
              </div>
            </section>

            <style jsx>{`
                .location {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 6px;
                }
                strong {
                  margin-bottom: 10px;
                }
                section {
                  height: 100vh;
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                  margin-left: 5%;
                }

                .infoCompany {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding-bottom: 48px;
                  margin-top: 8%;
                }
                .infoCompany img {
                  height: 126px;
                  width: 126px;
                  border-radius: 10px;
                  object-fit: contain;
                }
                .infoCompany h4 {
                  font-size: 24px;
                  margin: 12px 0;
                  text-align: center;
                }
                .infoCompany span {
                  font-size: 14px;
                  color: #444444;
                }

                .infoOffert {
                  height: 50%;
                  overflow-y: auto;
                  padding-right: 10px;
                }
                .infoOffert::-webkit-scrollbar {
                  width: 8px;
                  height: 8px;
                }
                .infoOffert::-webkit-scrollbar-thumb {
                  background: #ccc;
                  border-radius: 4px;
                }
                .infoOffert::-webkit-scrollbar-thumb:hover {
                  background: #b3b3b3;
                }
                .infoOffert::-webkit-scrollbar-thumb:active {
                  background-color: #999999;
                }
                .infoOffert span {
                  font-size: 14px;
                  font-weight: bold;
                  margin-bottom: 20px;
                }
                .infoOffert p {
                  font-size: 14px;
                  color: #444444;
                  margin-top: 20px;
                  margin-bottom: 30px;
                  white-space: pre-line;
                }
                .infoOffert a {
                  font-size: 14px;
                  font-weight: bold;
                  text-decoration: none;
                  color: #473198;
                  margin-top: 20px;
                  margin-bottom: 30px;
                }

                .postulate {
                  display: flex;
                  margin-top: auto;
                  margin-bottom: 42px;
                }
                .postulate a {
                  width: 100%; 
                  margin-right: 5%;
                }
                .postulate .postularBtn {
                  width: 100%;
                  //margin-right: 5%;
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
                  position: relative;
                }
                {/* .postularBtn::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: -1;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    45deg,
                    red, blue, deeppink, blue, red, blue, deeppik, blue
                  );
                  background-size: 800%;
                  border-radius: 9px;
                  filter: blur(8px);
                } */}
                .postulate .enEsperaBtn {
                  width: 100%;
                  margin-right: 5%;
                  padding: 12px 0;
                  background: #9E9EA7;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  //cursor: pointer;
                  pointer-events: none;
                }
                .postulate .aprobadoBtn {
                  width: 100%;
                  margin-right: 5%;
                  padding: 12px 0;
                  background: #adfc92;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  //cursor: pointer;
                  pointer-events: none;
                }
                .postulate .rechazadoBtn {
                  width: 100%;
                  margin-right: 5%;
                  padding: 12px 0;
                  background: #FC9292;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  //cursor: pointer;
                  pointer-events: none;
                }
                .postulate .commentBtn {
                  width: 49.83px;
                  height: 52px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #473198;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  cursor: pointer;
                }
                .postulate .evaluarBtn {
                  width: 100%;
                  //margin-right: 5%;
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
                .postulate .commentBtn > :global(svg) {
                  transition: all .3s ease-in-out;
                }
                .postulate .commentBtn:hover > :global(svg) {
                  transform: scale(1.4);
                }
                .en-espera {
                  width: 83%;
                  margin-right: 5%;
                  padding: 12px 0;
                  background: #9E9EA7;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  cursor: pointer;
                }
                .aprobado {
                  width: 83%;
                  margin-right: 5%;
                  padding: 12px 0;
                  background: #ADFC92;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  cursor: pointer;
                }
                .rechazado {
                  width: 83%;
                  margin-right: 5%;
                  padding: 12px 0;
                  background: #FC9292;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  color: #fff;
                  font-size: 24px;
                  font-weight: bold;
                  cursor: pointer;
                }
                .cancelPostulacionBtn {
                  width: 49.83px;
                  height: 52px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #FC9292;
                  border: none;
                  outline: none;
                  border-radius: 10px;
                  cursor: pointer;
                }
              `}
            </style>
          </>
          )}
    </>

  )
}
