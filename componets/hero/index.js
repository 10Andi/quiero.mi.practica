import HeroImg from "../icons/heroimg";

export default function Hero() {
    return (
        <>
            <div>
                <h1>Únete a la <span>comunidad más grande</span> de prácticas laborales</h1>
                {/* <img src="imagenes/heroImg.svg" alt="" draggable="false" /> */}
                <HeroImg />
            </div>
            <style jsx>{`
            div {
                /* display: flex;
                justify-content: space-between;
                align-items: center */
                min-height: 84vh;
            }
            div h1 {
                font-size: 64px;
                position: absolute;
                width: 680px;
                color: #444444;
                top: 27%;
                z-index: 2;
            }
            div h1 span {
                color: #473198;
            }
            div img {
                position: absolute;
                right: 3%;
                z-index: 1;
            }
            `}</style>
        </>
    )
}