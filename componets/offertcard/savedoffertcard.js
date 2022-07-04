import { useEffect, useState } from "react";
import { useOffert } from "../../context/offertContext";
import useTimeAgo from "../../hooks/useTimeAgo";
import Dot from "../icons/dot";
import Locate from "../icons/locate";
import Views from "../icons/views";
import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../../firebase/client";
import Bookmark from "../icons/bookmark";

export default function OffertCard(props) {
    // { id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer,}
    // const offert = {id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer}
    const {id, logo, nombre_empresa, cargo, ciudad, comuna, fecha_creacion, horario, vistas, cupos, ejercer} = props
    const {offertSelected, setOffertSelected} = useOffert()

    const timeAgo = useTimeAgo(fecha_creacion)
    // const newVisits = vistas

    const handleClick = (props) => {
        vistas + 1
        setOffertSelected(props)
        console.log(offertSelected)
        // .then(() ==>if(props.id !== offertSelected.id) {
        //     const newVisits = vistas + 1
        //     console.log(newVisits)




            // const newVisits = vistas + 1
            // console.log(newVisits)
            // const docRef = doc(firestore, 'test', id)
            // updateDoc(docRef, {
            //     vistas: newVisits
            // })




        // })
        

        
        // .then(() => {
            // newVisits = vistas + 1
            // console.log(newVisits)
        // })
        
        // console.log(offert)
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
        <button className="offer" key={id} id={id} onClick={() => handleClick(props)}>
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
                    <div className="estado">
                        <p>Estado: <label>En espera</label></p>
                        {/* 
                        colores
                        aporbado: #adfc92
                        en espera: #e6e6e6
                        rechazado: #FC9292
                        */}
                    </div>
                </div>
                <div className="selfInfo">
                    <div className="fecha">
                        <p>Fecha de postulación: 29 de junio de 2022</p>
                        {/* <p>Fecha de aceptación: 29 de junio de 2022 -> en RunJS tengo este formato de fecha </p> */}

                        {/* <p>29 de junio de 2022</p> */}
                    </div>
                    {/* <div className="estado">
                        <p>Estado:</p>
                        <p>En espera</p>
                    </div> */}
                </div>
            </div>
            <div className="right-col-end">
                <Bookmark width={27} height={27} />
            </div>
        </button>

    <style jsx>{`
        label {
            background: #e6e6e6;
            border-radius: 5px;
            padding: 5px 8px;
            cursor: pointer;
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