import { Ring } from '@uiball/loaders'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '../componets/footer'
import Nav from '../componets/nav'

export default function Contacto () {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  console.log('🚀 ~ file: contacto.js:8 ~ Contacto ~ errors', errors)

  async function onSubmit (values) {
    console.log(values)

    const config = {
      method: 'POST',
      url: 'api/contact',
      headers: {
        'Content-Type': 'application/json'
      },
      data: values
    }

    try {
      setLoading(true)
      const response = await axios(config)
      if (response.status === 200) {
        setLoading(false)
        toast.success('Envio realizado con exito')
        reset()
      }
      console.log('🚀 ~ file: contacto.js:25 ~ onSubmit ~ response', response)
    } catch (err) {
      console.error('🚀 ~ file: contacto.js:26 ~ onSubmit ~ err', err)
      toast.error(err.message)
      setLoading(false)
    }
  }
  return (
    <>
      <section className='container'>
        <Nav />
        <div>
          <h2>Contáctanos</h2>
          <main>
            <Toaster />
            <form onSubmit={handleSubmit(onSubmit)}>
              <article>
                <label htmlFor='name'>
                  Nombre Completo
                </label>
                <input
                  type='text'
                  name='name'
                  {...register('name', {
                    required: 'Debes ingresar tu nombre'
                  })}
                  style={errors.name && { border: 'thin solid #FC9292' }}
                  placeholder='Nombre Completo'
                />
                <small>{errors?.name?.message}</small>
              </article>
              <article>
                <label htmlFor='email'>
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  {...register('email', {
                    required: 'Debes ingresar un email valido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email invalido'
                    }
                  })}
                  style={errors.email && { border: 'thin solid #FC9292' }}
                  placeholder='Email'
                />
                <small>{errors?.email?.message}</small>
              </article>
              <article>
                <label htmlFor='mensaje'>
                  Mensaje
                </label>
                <textarea
                  name='mensaje'
                  row='4'
                  {...register('mensaje', {
                    required: 'Debes ingresar un mensaje'
                  })}
                  style={errors.mensaje && { border: 'thin solid #FC9292' }}
                  placeholder='Mensaje'
                />
                <small>{errors?.mensaje?.message}</small>
              </article>
              <footer>
                <button>Enviar mensaje</button>
              </footer>
            </form>
          </main>
        </div>
      </section>
      <Footer />
      {
        loading
          ? (
            <div className='loading'>
              <Ring
                size={100}
                lineWeight={5}
                speed={2}
                color='#473198'
              />
            </div>
            )
          : null
      }

      <style jsx>{`
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
          small {
            padding-top: 5px;
            color: #FC9292;
          }
          .container {
            padding: 0 42px;
            margin-bottom: 180px;
          }
          article {
            padding: 10px 500px;
            display: flex;
            flex-direction: column;
          }
          label {
            margin-bottom: 10px
          }
          input {
            border-radius: 10px;
            font-size: 14px;
            padding: 10px;
            border: thin solid #9E9EA7;
            outline: none;
            width: 100%;
            //max-width: 400px;
          }
          input:focus {
              border: thin solid #473198;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px white inset !important;
          }

          textarea {
            height: 150px;
            resize: none;
            border-radius: 10px;
            font-size: 14px;
            padding: 10px;
            border: thin solid #9E9EA7;
            outline: none;
          }
          textarea:focus {
            border: thin solid #473198;
          }
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover, 
          textarea:-webkit-autofill:focus, 
          textarea:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px white inset !important;
          }
          footer {
            display: flex;
            justify-content: center;
          }
          button {
            width: 269px;
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
        `}
      </style>
    </>
  )
}
