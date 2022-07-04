import { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/client";
import Footer from "../componets/footer";
import Nav from "../componets/nav";
import ResetPassImg from "../componets/icons/resetpassimg"
import Link from 'next/link'

export default function Recuperarclave() {
    const [email, setEmail] = useState('')

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault()

        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            alert('Se ha enviado ')
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
        <>
        <section className="container">
            <Nav />
            <div className="logIn">
                <ResetPassImg />
                <div className="formContainer">
                    <h1>Recupera tu contraseña</h1>
                    <form method="POST">
                        <input name="email" type="email" required placeholder="Email" onChange={handleChangeEmail}
                        onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Email"} />
                        <p>Te enviaremos un correo electronico con el que podras recuperar tu contraseña</p>
                        <button type="submit" onClick={submitHandler}>Recuperar</button>
                        <span className="register">¿Aún no eres miembro? <br /> <Link href={"/registro"}><a>Haz click aquí</a></Link></span>
                    </form>
                </div>
            </div>


        </section>
        <Footer />
            <style jsx>{`
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