import Footer from "../componets/footer";
import LoginImg from "../componets/icons/loginimg";
import Nav from "../componets/nav";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Link from 'next/link'
import { Ring } from "@uiball/loaders";

export default function Login() {
    const { user, signIn } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault()
        setLoading(true)

        try {
            await signIn(email, password)
        } catch (error) {
            console.log(error)
        } 
    }
    
    useEffect(() => {
        if ((user && user.type === 'estudiante')) {
            router.push('/home').finally(() => setLoading(false))
        }
        if ((user && user.type === 'empresa')) {
            router.push('/dashboard').finally(() => setLoading(false))
        }
      }, [router, user])

    return (
        <>
        { loading ? 
              <div className='loading'>
                  <Ring 
                      size={100}
                      lineWeight={5}
                      speed={2} 
                      color="#473198"
                  />
              </div>
            : 
                <>
                    <section className="container">
                    <Nav />
                        <div className="logIn">
                            <LoginImg />
                            <div className="formContainer">
                                <h1>¡Qué bueno que volviste!</h1>
                                <form method="POST">
                                    <input name="email" type="email" required placeholder="Email" onChange={handleChangeEmail}
                                    onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Email"} />
                                    <input name="password" type="password" placeholder="Contraseña" onChange={handleChangePassword} require="true"
                                    onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Contraseña"} />
                                    <Link href="/recuperarclave">
                                        <a className="forgot">¿Olvidaste tu contraseña?</a>
                                    </Link> 
                                    <button type="submit" onClick={submitHandler}>Iniciar sesión</button>
                                    <span className="register">¿Aún no eres miembro? <br /> <a href="registro">Haz click aquí</a></span>
                                </form>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </>
        }
        {/* <>
        <section className="container">
            <Nav />
            <div className="logIn">
                <LoginImg />
                <div className="formContainer">
                    <h1>¡Qué bueno que volviste!</h1>
                    <form method="POST">
                        <input name="email" type="email" required placeholder="Email" onChange={handleChangeEmail}
                        onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Email"} />
                        <input name="password" type="password" placeholder="Contraseña" onChange={handleChangePassword} require="true"
                        onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Contraseña"} />
                        <Link href="/recuperarclave">
                            <a className="forgot">¿Olvidaste tu contraseña?</a>
                        </Link> 
                        <button type="submit" onClick={submitHandler}>Iniciar sesión</button>
                        <span className="register">¿Aún no eres miembro? <br /> <a href="registro">Haz click aquí</a></span>
                    </form>
                </div>
            </div>
        </section>
        <Footer /> */}
        
        <style jsx>{`
            .loading {
                display: grid;
                place-content: center;
                align-items: center;
                height : 100vh;
            }
            .container {
                padding: 0 42px;
                position: relative;
                min-height: calc(100vh - 71.813px);
            }
            .logIn {
                min-height: 74vh;
                display: flex;
                align-items: center;
                /* justify-content: space-between; */
                justify-content: space-evenly;
            }
            .logIn .formContainer p {
                width: 407.612px;
                font-style: italic;
                font-weight: 300;
                font-size: 14px;
                line-height: 16px;
                color: #444444;
            }
            .formContainer {
                display: flex;
                flex-direction: column;
            }
            .formContainer h1 {
                font-size: 48px;
                margin-bottom: 10%;
            }
            .formContainer form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .formContainer form input {
                border-radius: 10px;
                text-align: center;
                font-size: 14px;
                padding: 10px 0;
                /* border: none; */
                border: thin solid #9E9EA7;
                outline: none;
                margin-bottom: 25px;
                width: 80%;
            }
            .formContainer .forgot {
                color: #473198;
                text-decoration: none;
                transform: translate(65%, 0%);

            }
            .formContainer form button {
                width: 80%;
                padding: 10px 0;
                margin: 40px 0;
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
                
            }
            .formContainer .register {
                transform: translate(-75%, 0%);
            }
            .formContainer .register a {
                color: #4A0D67;
                font-weight: bold;
                text-decoration: none;
            }
        `}</style>
        </>
    )
}