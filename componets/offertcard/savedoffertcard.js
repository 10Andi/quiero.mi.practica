import { useEffect, useState } from "react";
import { useOffert } from "../../context/offertContext";
import useTimeAgo from "../../hooks/useTimeAgo";
import Dot from "../icons/dot";
import Locate from "../icons/locate";
import Views from "../icons/views";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { firestore } from "../../firebase/client";
import Bookmark from "../icons/bookmark";
import { useAuth } from "../../context/AuthContext";

export default function SavedOffertCard(props) {
    const {user} = useAuth()

    // { id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer,}
    // const offert = {id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer}
    const {id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer} = props
    const {offertSelected, setOffertSelected, offerStatus, setOfferStatus} = useOffert()

    const timeAgo = useTimeAgo(fecha_creacion)

    const handleClickBookmark = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const docRef = doc(firestore, 'USUARIO', user.uid)
        updateDoc(docRef, {
            bookmark: arrayUnion(id)
        })
        // .then()
        // .finally(setIsBookmark(true))
        // setIsBookmark(true)
        // alert('AGREGAR')
        
    }
    const handleClickUnbookmark = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // alert('QUITAR')
        const docRef = doc(firestore, 'USUARIO', user.uid)
        updateDoc(docRef, {
            bookmark: arrayRemove(id)
        })
        // .then()
        // .finally(setIsBookmark(true))
    }

    const handleClick = (props) => {
        vistas + 1
        setOffertSelected(props)
        // console.log(offertSelected)
        
    }

    useEffect(() => {
        const btnFocus = document.getElementById(id)

        const keyDownHandler = event => {
    
          if (event.key === 'Escape') {
            event.preventDefault();
    
            // 👇️ your logic here
            setOffertSelected(null)
            btnFocus.blur()
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        // 👇️ clean up event listener
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, [id, setOffertSelected]);


    return (
        <>
        <button className="offer" key={id} id={id} style={{backgroundColor: id === offertSelected?.id ? 'rgb(247, 249, 249)' : 'white'}} onClick={() => handleClick(props)}>
            <div className="offerLogo">
                <img loading="lazy" src={logo} alt={nombre_empresa} draggable="false" />
            </div>
            <div className="offerInfo">
                <h4>{nombre_empresa}</h4>
                <span>{cargo}, {ejercer}</span>
                <div className="infoItemsTop">
                    <div className="infoItem">
                        <Locate />
                        <span>{comuna}, {ciudad}</span>
                    </div>
                    <div className="infoItem">
                        <Views />
                        {vistas === 1 ?
                            <span>{vistas} visita</span>
                        :
                            <span>{vistas} visitas</span>
                        }
                    </div>
                </div>
                <div className="infoItemsBottom">
                    <div className="infoItem">
                        <span>{timeAgo}</span>
                        <Dot/>
                    </div>
                    <div className="infoItem">
                        <span>{horario}</span>
                        <Dot/>
                    </div>
                    <div className="infoItem">
                        {cupos === 1 ?
                            <span>{cupos} cupo restante</span>
                        :
                            <span>{cupos} cupos restantes</span>
                        }
                    </div>
                    
                    {user.postulado?.includes(id) ?
                        
                        <div className="estado">
                            <p>Estado: 
                                {/* {console.log(offerStatus)} */}
                                {offerStatus.map(ele => {
                                    {console.log(ele.estado)}
                                    {if(ele.estado === 'Aporbado') return (<label key={ele.id} style={{background: '#adfc92'}}>Aporbado</label>)}
                                    {if(ele.estado === 'Rechazado') return (<label key={ele.id} style={{background: '#FC9292'}}>Rechazado</label>)}
                                    {if(ele.estado === 'En espera') return (<label key={ele.id} style={{background: '#e6e6e6'}}>En espera</label>)}
                                })}
                            </p>
                            {/*
                                {offerStatus.find(ele => {
                                return (console.log(ele.estado))
                                // ele.estado === 'Aporbado' && <label style={{background: '#adfc92'}}>En espera</label>
                                // ele.estado === 'Rechazado' && <label style={{background: '#FC9292'}}>En espera</label>
                                // ele.estado === 'En espera' && <label style={{background: '#e6e6e6'}}>En espera</label>
                            })}

                            if(estado === 'Aporbado') <label style={{background: '#adfc92'}}>Aporbado</label>
                            if(estado === 'Rechazado') <label style={{background: '#FC9292'}}>Rechazado</label>
                            if(estado === 'En espera') <label style={{background: '#e6e6e6'}}>En espera</label>

                            if(ele.estado === 'Aporbado') return (<label style={{background: '#adfc92'}}>Aporbado</label>)
                            if(ele.estado === 'Rechazado') return (<label style={{background: '#FC9292'}}>Rechazado</label>)
                            if(ele.estado === 'En espera') return (<label style={{background: '#e6e6e6'}}>En espera</label>)
                            
                            offerStatus.estado === 'Aporbado' && <label style={{background: '#adfc92'}}>En espera</label>
                            offerStatus.estado === 'Rechazado' && <label style={{background: '#FC9292'}}>En espera</label>
                            offerStatus.estado === 'En espera' && <label style={{background: '#e6e6e6'}}>En espera</label>

                            {ele.estado === 'Aporbado' && <label key={ele.id} style={{background: '#adfc92'}}>Aporbado</label>}
                            {ele.estado === 'Rechazado' && <label key={ele.id} style={{background: '#FC9292'}}>Rechazado</label>}
                            {ele.estado === 'En espera' && <label key={ele.id} style={{background: '#e6e6e6'}}>En espera</label>}

                            colores
                            aporbado: #adfc92
                            en espera: #e6e6e6
                            rechazado: #FC9292
                            */}
                        </div>
                    :
                        null
                    }
                </div>
                {user.postulado?.includes(id) ?
                    <div className="selfInfo">
                        <div className="fecha">
                                {offerStatus.map(ele => {
                                    return <p key={id}>Fecha de postulación: {ele.fecha_postulacion}</p>
                                })}
                        </div>
                    </div>
                :
                    null
                }
            </div>
            <div className="right-col-end">
                {/* <Bookmark width={27} height={27} /> */}
                {user.bookmark?.includes(id) ?
                    <Bookmark width={27} height={27} fill={'#473198'} stroke={'#473198'} onClick={handleClickUnbookmark} />
                :
                    <Bookmark width={27} height={27} onClick={handleClickBookmark} />
                }
            </div>
        </button>

        <style jsx>{`
            label {
                background: #e6e6e6;
                border-radius: 5px;
                padding: 5px 8px;
                cursor: pointer;
                margin-left: 8px;
            }
            .estado {
                font-size: 14px;
                margin-left: auto;
            }
            .estado p {
                margin: 0;
                
            }
            .selfInfo {
                border-top: 1px solid rgb(175 175 175);
                margin-top:10px;
                display: flex;
                justify-content: space-between;
                padding-top: 10px;
            }
            .selfInfo p {
                font-size: 14px;
                margin: 0;
            }
            .offerInfo {
                width: 100%;
            }
            button {
                width: 100%;
                padding: 21px;
                display: flex;
                cursor: pointer;

                background: none;
                border: none;
                border-radius: 10px;
                text-align: start;


                margin: 16px 0;
            }
            
            button:focus {
                outline: 1px solid #9BF3F0;
                outline: 1px solid rgb(239, 243, 244);
                outline: none;
                background-color: rgb(247, 249, 249);
            }
            button:hover {
                border: 1px thin #4A0D67;
                background: rgb(239, 243, 244);
            }
            .offer .offerLogo img {
                height: 77px;
                width: 77px;
                margin-right: 21px;
                border-radius: 10px;
            }
            .offer .offerInfo h4 {
                font-size: 24px;
                //margin-bottom: 7px;
                margin: 0 0 7px 0;
            }
            .offer .offerInfo span {
                font-size: 16px;
                color: #444444;
                
            }
            .offer .offerInfo .infoItemsTop {
                display: flex;
            }
            .offer .offerInfo .infoItemsTop .infoItem {
                margin: 12px 0 7px 0;
            }
            .offer .offerInfo .infoItemsTop .infoItem span {
                font-size: 12px;
                margin: 0 10px;
            }
            .offer .offerInfo .infoItemsTop .infoItem img {
                margin-right: 10px;
            }
            .offer .offerInfo .infoItemsBottom {
                display: flex;
                padding-bottom: 10px;

            }
            .offer .offerInfo .infoItemsBottom .infoItem span {
                font-size: 12px;
            }
            .offer .offerInfo .infoItemsBottom .infoItem img {
                margin-right: 12px;
            }
            .offer .offerTools {
                flex-grow: 1
            }
            .offer .offerTools .options {
                display: flex;
                justify-content: flex-end;
            }
            .offer .offerTools .options img {
                margin-left: 14px;
            }
            .right-col-end {
                margin-left: auto;
            }
        `}</style>
        </>
    )
}