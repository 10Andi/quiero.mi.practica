import MailIcon from '@mui/icons-material/Mail'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { IconButton, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Ring } from '@uiball/loaders'
import { collection, onSnapshot, query } from 'firebase/firestore'
// import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DialogStudentsTalent from '../componets/dialog/dialogStudentsTalent'
import MenuCompany from '../componets/menu/menucompany'
import { useAuth } from '../context/AuthContext'
import { firestore } from '../firebase/client'

export default function Talentos () {
  const [loading, setLoading] = useState(true)
  const [offerList, setOfferList] = useState(null)
  const [offerSelected, setOfferSelected] = useState(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function getOfferts () {
      setLoading(true)

      const unsubscribe = onSnapshot(query(collection(firestore, 'EVA_ESTUDIANTE')), querySnapshot => {
        setOfferList(querySnapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          console.log(data)
          const { fechaFinalizacion, adaptabilidad, aplicacion, asistencia, capacidad, capacidadDecision, capacidadNegociar, confianza, conocimientos, creatividad, escrita, ingles, iniciativa, liderazgo, oral, organizacion, responsabilidad, trabajoEquipo, valoresEticosMorales } = data
          const arr = [adaptabilidad, aplicacion, asistencia, capacidad, capacidadDecision, capacidadNegociar, confianza, conocimientos, creatividad, escrita, ingles, iniciativa, liderazgo, oral, organizacion, responsabilidad, trabajoEquipo, valoresEticosMorales]
          // console.log(arr)
          let sumaCalificaciones = 0
          arr.forEach(ele => {
            if (ele === 0) return
            sumaCalificaciones = sumaCalificaciones + ele
          })
          const promedio = sumaCalificaciones / arr.filter(ele => ele !== 0).length
          // console.log(promedio)
          // console.log(data)

          const date = new Date(fechaFinalizacion.seconds * 1000)
          const normalizedCreatedAt = new Intl.DateTimeFormat('ES-CL', { dateStyle: 'long', timeStyle: 'medium' }).format(date)

          return {
            ...data,
            id,
            fechaFinalizacion: normalizedCreatedAt,
            promedio
          }
        }))
      })
      return () => unsubscribe()
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
                <h1>Base de datos de talentos</h1>
                {/* <Link href='/crearpublicacion'>
                  <Tooltip title='Crear una nueva oferta' arrow placement='top'>
                    <AddBoxIcon fontSize='large' style={{ color: '#ADFC92', cursor: 'pointer' }} />
                  </Tooltip>
                </Link> */}
              </header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell align='right'>Categoría</TableCell>
                      <TableCell align='right'>Fecha de evaluación</TableCell>
                      {/* <TableCell align='center'>Ver</TableCell> */}
                      <TableCell align='center'>E-mail</TableCell>
                      <TableCell align='center'>Calificación</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {offerList && offerList.map((row) => (
                      <TableRow key={row.id} id={row.id} hover>
                        <TableCell component='th' scope='row'>
                          <DialogStudentsTalent row={row} />
                        </TableCell>
                        <TableCell align='right'>{row.categoria}</TableCell>
                        <TableCell align='right'>{row.fechaFinalizacion}</TableCell>
                        {/* <TableCell align='center'>
                          <IconButton onClick={() => {
                            setOfferSelected(row)
                          }}
                          >
                            <VisibilityIcon style={{ color: '#473198', cursor: 'pointer' }} />
                          </IconButton>
                        </TableCell> */}
                        <TableCell align='center'>
                          <IconButton>
                            <Link href={`mailto:${row.estudianteEmail}`}>
                              <MailIcon style={{ color: '#473198', cursor: 'pointer' }} />
                            </Link>
                          </IconButton>
                        </TableCell>
                        <TableCell align='center'>
                          <Rating precision={0.5} value={row.promedio} readOnly />
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
                    <span>Políticas de trabajo:</span>
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
