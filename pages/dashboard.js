import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { Ring } from '@uiball/loaders'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
// import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DialogStudents from '../componets/dialog'
import MenuCompany from '../componets/menu/menucompany'
import { useAuth } from '../context/AuthContext'
import { firestore } from '../firebase/client'

export default function Dashboard () {
  const [loading, setLoading] = useState(true)
  const [offerList, setOfferList] = useState(null)
  const [offerSelected, setOfferSelected] = useState(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function getOfferts () {
      setLoading(true)

      // const querySnapshot = await getDocs(collection(firestore, 'test'))
      // const querySnapshot = await getDocs(query(collection(firestore, 'test'), orderBy("fecha_creacion", 'desc')))

      // return querySnapshot.docs.map(doc => {
      //     const data = doc.data()
      //     const id = doc.id
      //     const {fecha_creacion} = data

      //     // const date = new Date(fecha_creacion.seconds * 1000)
      //     // const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL').format(date)

      //     return {
      //         ...data,
      //         id,
      //         fecha_creacion: +fecha_creacion.toDate()
      //     }
      // })

      await onSnapshot(query(collection(firestore, 'test'), where('nombre_empresa', '==', user.nombre_empresa)), querySnapshot => {
        setOfferList(querySnapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          const { fecha_creacion } = data

          // console.log(data)

          const date = new Date(fecha_creacion.seconds * 1000)
          const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL', { dateStyle: 'long', timeStyle: 'medium' }).format(date)

          return {
            ...data,
            id,
            fecha_creacion: normalizedCreatedAt
          }
        }))
      })
    }

    // getOfferts().then(setOfferList).finally(() => setLoading(false)) -> ya seteo la oferta en el map
    getOfferts().finally(() => setLoading(false))
  }, [user])

  // const handleClick = (props) => {
  //   setOffertSelected(props)

  //   const newVisits = vistas + 1

  //   const docRef = doc(firestore, 'test', id)
  //   updateDoc(docRef, {
  //     vistas: newVisits
  //   })
  // }

  useEffect(() => {
    const btnFocus = document.getElementById(offerSelected?.id)

    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault()

        // 👇️ your logic here
        setOfferSelected(null)
        btnFocus?.blur()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [offerSelected, setOfferSelected])

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'empresa') {
    router.push('/login')
    return
  }

  const deleteOffert = async (idOffert) => {
    await deleteDoc(doc(firestore, 'test', idOffert))
    // console.log(idOffert)
  }

  return (
    <>
      {loading
        ? (
          <div>
            <Ring size={40} lineWeight={5} speed={2} color='#473198' />
          </div>
          )
        : (
          <section>
            <MenuCompany />
            <main>
              <header>
                <h1>Mis publicaciones</h1>
                <Link href='/crearpublicacion'>
                  <Tooltip title='Crear una nueva oferta' arrow placement='top'>
                    <AddBoxIcon fontSize='large' style={{ color: '#ADFC92', cursor: 'pointer' }} />
                  </Tooltip>
                </Link>
              </header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Titulo de publicación</TableCell>
                      <TableCell align='right'>Cupos disponibles</TableCell>
                      {/* <TableCell align="right">Cantidad de postulantes</TableCell> */}
                      <TableCell align='right'>Fecha de creación</TableCell>
                      {/* <TableCell align="right">Postulantes aceptados</TableCell> */}
                      <TableCell align='center'>Ver</TableCell>
                      <TableCell align='center'>Editar</TableCell>
                      <TableCell align='center'>Eliminar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {offerList && offerList.map((row) => (
                      <TableRow key={row.id} id={row.id} hover>
                        <TableCell component='th' scope='row'>
                          <DialogStudents row={row} />
                        </TableCell>
                        <TableCell align='right'>{row.cupos}</TableCell>
                        <TableCell align='right'>{row.fecha_creacion}</TableCell>
                        <TableCell align='center'>
                          <IconButton onClick={() => {
                            setOfferSelected(row)
                          }}
                          >
                            <VisibilityIcon style={{ color: '#473198', cursor: 'pointer' }} />
                          </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton>
                            <Link href={`/editarpublicacion/${row.id}`}>
                              <EditIcon style={{ color: '#FCE592', cursor: 'pointer' }} />
                            </Link>
                          </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton onClick={() => {
                            deleteOffert(row.id)
                          }}
                          >
                            <DeleteForeverIcon style={{ color: '#FC9292', cursor: 'pointer' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </main>
            {!offerSelected
              ? null
              : (
                <aside key={offerSelected.id}>
                  <div className='infoCompany'>
                    <img loading='lazy' src={offerSelected.logo} alt={offerSelected.nombre_empresa} />
                    <h4>{offerSelected.cargo}<br />{offerSelected.ejercer}</h4>
                    <strong>{offerSelected.nombre_empresa}</strong>
                    <span>{offerSelected.comuna}, {offerSelected.ciudad}</span>
                  </div>

                  <div className='infoOffert'>
                    <span>Requerimientos:</span>
                    <p>{offerSelected.requerimiento}</p>
                    <span>Sobre el trabajo:</span>
                    <p>{offerSelected.descripcion}</p>
                    <span>Conocimientos:</span>
                    <p>{offerSelected.condicion}</p>
                    <span>Beneficios:</span>
                    <p>{offerSelected.beneficios}</p>
                    <span>Policas de trabajo:</span>
                    <p>{offerSelected.politica_trabajo}</p>
                  </div>
                </aside>
                )}
          </section>
          )}

      <style jsx>
        {`
          section {
            height: 100vh;
            padding: 0 42px;
            //padding: 0 200px;
            display: grid;
            //grid-template-columns: 1fr 3fr;
            //grid-template-columns: 1fr 4fr;
            grid-template-columns: .6fr 2fr .9fr;
          }

          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          main {
            border-right: 1px solid rgb(239, 243, 244);
            border-left: 1px solid rgb(239, 243, 244);
            padding-top: 56px;
            padding-left: 18px;
            padding: 56px 49px 0 49px;
            overflow: auto;
          }
          main::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          main::-webkit-scrollbar-thumb {
            padding-right: 56px;
            background: #ccc;
            border-radius: 4px;
          }
          main::-webkit-scrollbar-thumb:hover {
            background: #b3b3b3;
          }
          main::-webkit-scrollbar-thumb:active {
            background-color: #999999;
          }
          {/* rgb(247, 249, 249) */}
          aside {
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
            margin-bottom: 80px;
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
          a:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
