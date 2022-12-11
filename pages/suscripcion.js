import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// import { Ring } from '@uiball/loaders'
import { useRouter } from 'next/router'
// import { useState } from 'react'
import MenuCompany from '../componets/menu/menucompany'
import { useAuth } from '../context/AuthContext'

export default function Suscripcion () {
  // const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  // const API_KEY = '31AFDEDE-E95A-4E6E-8C8E-22L12A95CF34'
  // const SECRET_KEY = '161bccd2a5c0afecd16e8b796316276989616b56'
  // const sign = cryptoJs.HmacSHA256('stringToSign', SECRET_KEY)
  // const BASE_URL = 'https://api.mercadopago.com'

  if (user === null) {
    router.push('/login')
    return
  }
  if (user && user.type !== 'empresa') {
    router.push('/login')
    return
  }

  // const submitSub = async () => {
  //   // const date = new Date()
  //   setLoading(true)
  //   // const res = await fetch('https://www.flow.cl/api/subscription/create', {
  //   //   mode: 'no-cors',
  //   //   method: 'POST',
  //   //   body: {
  //   //     apiKey: API_KEY,
  //   //     planId: 'EP2',
  //   //     customerId: user.uid_empresa,
  //   //     s: sign
  //   //   },
  //   //   headers: {
  //   //     'Content-Type': 'application/x-www-form-urlencoded'
  //   //   }
  //   // })
  //   const res = await fetch('https://www.flow.cl/api/subscription/create', {
  //     mode: 'no-cors',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     body: {
  //       apiKey: API_KEY,
  //       planId: 'EP2',
  //       customerId: user.uid_empresa,
  //       s: sign
  //     }
  //   })
  //   console.log('🚀 ~ file: suscripcion.js:42 ~ submitSub ~ res', res)
  //   setLoading(false)
  //   const data = await res.json()
  //   console.log('🚀 ~ file: suscripcion.js:43 ~ submitSub ~ data', data)
  // }

  return (
    <>
      {/* {loading
        ? (
          <div>
            <Ring size={40} lineWeight={5} speed={2} color='#473198' />
          </div>
          )
        : ( */}
      <section>
        <MenuCompany />
        <main>
          <header>
            <h1>Mi suscripción</h1>
            {/* <Link href='/crearpublicacion'>
                  <Tooltip title='Crear una nueva oferta' arrow placement='top'>
                    <AddBoxIcon fontSize='large' style={{ color: '#ADFC92', cursor: 'pointer' }} />
                  </Tooltip>
                </Link> */}
          </header>
          <div className='cards'>
            <div className='card' style={{ height: '526px' }}>
              <div className='price-basic'>
                <div className='basic'>
                  <label>Gratis</label>
                  <small>Ilimitado</small>
                </div>
                <div className='info-card'>
                  <label>Basic</label>
                  <span>Pensado para empresas pequeñas o start up.</span>
                </div>
              </div>
              <div className='bottom-card'>
                <div className='bottom-card-item'>
                  <CheckCircleIcon style={{ color: '#ADFC92' }} />
                  <strong>10 publicaciones al mes</strong>
                </div>
                <div className='bottom-card-item'>
                  <CheckCircleIcon style={{ color: '#ADFC92' }} />
                  <strong>Chatbot</strong>
                </div>
                <div className='bottom-card-item'>
                  <CheckCircleIcon style={{ color: '#ADFC92' }} />
                  <strong>Cuentas de equipo ilimitadas</strong>
                </div>
              </div>
              <div className='plan-estado' style={{ display: 'flex', justifyContent: 'center' }}>
                <a className='plan-estado-link-desactivado'>Actual</a>
                {/* <a className='plan-estado-link' href='https://www.flow.cl/btn.php?token=2xmymaj'>Contratar</a> */}
              </div>
            </div>
            <div className='card' style={{ height: '526px' }}>
              <div className='price-premium'>
                <div className='basic'>
                  <label>$30.000</label>
                  <small>mensuales</small>
                </div>
                <div className='info-card'>
                  <label>Premium</label>
                  <span>Pensado para empresas medianas y grandes.</span>
                </div>
              </div>
              <div className='bottom-card'>
                <div className='bottom-card-item'>
                  <CheckCircleIcon style={{ color: '#ADFC92' }} />
                  <strong>10 publicaciones al mes</strong>
                </div>
                <div className='bottom-card-item'>
                  <CheckCircleIcon style={{ color: '#ADFC92' }} />
                  <strong>Base de Talentos</strong>
                </div>
                <div className='bottom-card-item'>
                  <CheckCircleIcon style={{ color: '#ADFC92' }} />
                  <strong>Cuentas de equipo ilimitadas</strong>
                </div>
              </div>
              <div className='plan-estado' style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <a className='plan-estado-link-desactivado'>Actual</a> */}
                <a className='plan-estado-link' href='https://www.mercadopago.cl/subscriptions/checkout?preapproval_plan_id=2c93808484ed6a680184ffa1c143102d'>Contratar</a>
              </div>
            </div>
          </div>
        </main>
        {/* {!offerSelected
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
                )} */}
      </section>
      {/* )} */}

      <style jsx>
        {`
          .cards {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 100px;
          }
          .card {
            box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
          }
          .price-basic {
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #F8F1FF;
            padding: 20px;
            border-radius: 10px 10px 0px 0px;
          }
          .price-premium {
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #9BF3F0;
            padding: 20px;
            border-radius: 10px 10px 0px 0px;
          }
          .basic {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 30px;
          }
          small {
            color: #473198;
          }
          .basic label {
            font-size: 32px;
            color: #473198;
            font-weight: 700;
          }
          .info-card {
            display: flex;
            flex-direction: column;
          }
          .info-card label {
            font-weight: 700;
            font-size: 48px;
            line-height: 56px;
            color: #473198;
          }
          .info-card span {
            font-size: 16px;
            color: #7B7B7B;
          }
          .bottom-card {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .bottom-card .bottom-card-item {
            display: flex;
            gap: 5px;
          }
          .plan-estado {
            margin-top: auto;
            padding-bottom: 20px;
          }
          .plan-estado-link {
            width: 90%;
            padding: 13px 0;
            /* margin: 40px 0; */
            /* margin-bottom: 40px; */
            background: #473198;
            background: -webkit-linear-gradient(to right, #4A0D67, #473198);
            background: linear-gradient(to right, #4A0D67, #473198);
            border: none;
            outline: none;
            border-radius: 10px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
          }
          .plan-estado-link-desactivado {
            width: 90%;
            padding: 13px 0;
            /* margin: 40px 0; */
            /* margin-bottom: 40px; */
            background: #7B7B7B;
            /* background: -webkit-linear-gradient(to right, #4A0D67, #473198); */
            /* background: linear-gradient(to right, #4A0D67, #473198); */
            border: none;
            outline: none;
            border-radius: 10px;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            cursor: default;
            text-align: center;
            text-decoration: none;
          }

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
