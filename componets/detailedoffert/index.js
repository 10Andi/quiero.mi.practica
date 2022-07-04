import { useAuth } from "../../context/AuthContext";
import { useOffert } from "../../context/offertContext";
import Link from "next/link";

export default function DetailedOffert() {
    const { user } = useAuth()
    const { offertSelected, setOffertSelected } = useOffert()

    return (
        <>
            { !offertSelected ? 
                null
            : 
                <>
                    <section key={offertSelected.id}>
                        <div className="infoCompany">
                                <img loading="lazy" src={offertSelected.logo} alt={offertSelected.nombre_empresa} />
                                <h4>{offertSelected.cargo}<br />{offertSelected.ejercer}</h4>
                                <strong>{offertSelected.nombre_empresa}</strong>
                                <span>{offertSelected.comuna}, {offertSelected.ciudad}</span>
                            </div>
                            
                            <div className="infoOffert">
                                <span>Requerimientos:</span>
                                <p>{offertSelected.requerimiento}</p>
                                <span>Sobre el trabajo:</span>
                                <p>{offertSelected.descripcion}</p>
                                <span>Conocimientos:</span>
                                <p>{offertSelected.condicion}</p>
                                <span>Beneficios:</span>
                                <p>{offertSelected.beneficios}</p>
                                <span>Policas de trabajo:</span>
                                <p>{offertSelected.politica_trabajo}</p>
                                {/* <a href="">Leer más</a> */}
                            </div>

                            <div className="postulate">
                                {user.postulado?.includes(offertSelected.id) ?
                                    <button disabled className="enEsperaBtn">En espera</button>
                                :
                                    <Link href={`/postular/${offertSelected.id}`}>
                                        <a>
                                            <button className="postularBtn">Postular</button>
                                        </a>
                                    </Link>
                                }
                                <button className="commentBtn">
                                    {/* <img src="{{asset('imagenes/comentOffertIcon.svg')}}" alt="" draggable="false" /> */}
                                </button>
                            </div>
                    </section>

                    <style jsx>{`
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
                            margin-bottom: 42px;
                        }
                        .postulate a {
                            width: 83%; 
                            margin-right: 5%;
                        }
                        .postulate .postularBtn {
                            width: 100%;
                            margin-right: 5%;
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
                        .postulate .commentBtn {
                            width: 49.83px;
                            height: 52px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #ADFC92;
                            border: none;
                            outline: none;
                            border-radius: 10px;
                            cursor: pointer;
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
                    `}</style>
                </>
            }
        </>

    )
}