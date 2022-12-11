import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Footer from '../componets/footer'
import Nav from '../componets/nav'

export default function Precios () {
  return (
    <>
      <section className='container'>
        <Nav />
        <div>
          <header>
            <h1>Planes</h1>
            <p>Familiarízate con los precios de nuestros planes, hay distintos tipos pensados en el tamaño de cada empresa, descubre cual es el que más se acomoda a tus necesidades.</p>
          </header>
          <main>
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
                <div className='' style={{ display: 'flex', justifyContent: 'center' }}>
                  <a id='btnEstado_plan' className='plan-estado-link-desactivado'>Actual</a>
                  <a id='btnEstado_plan' className='plan-estado-link' href='https://www.flow.cl/btn.php?token=2xmymaj'>Contratar</a>
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
                <div className='' style={{ display: 'flex', justifyContent: 'center' }}>
                  <a id='btnEstado_plan' className='plan-estado-link-desactivado'>Actual</a>
                  <a id='btnEstado_plan' className='plan-estado-link' href='https://www.flow.cl/btn.php?token=2xmymaj'>Contratar</a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
      <Footer />

      <style jsx>{`
        .cards {
          display: flex;
          justify-content: center;
          gap: 40px;
        }
        .card {
          box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
          border-radius: 10px;
                
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

        
        main {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;"
        }
          .loading {
            display: grid;
            place-content: center;
            align-items: center;
            position:fixed;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.5);
            backdrop-filter: blur(1px);
          }
          .container {
            padding: 0 42px;
            margin-bottom: 180px;
          }
          header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 50px;
          }
          h1 {
            font-size: 48px;
            text-align: center;
            margin: 0;
          }
          p {
            font-style: normal;
            color: #444444;
            font-size: 24px;
            text-align: center;
            max-width: 700px; 
          }
        `}
      </style>
    </>
  )
}
