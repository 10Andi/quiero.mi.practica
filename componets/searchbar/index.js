import BtnBuscar from "../icons/btnbuscar";

export default function Searchbar(props) {
    return (
        <>
            <div>
                <input type="text" name="search" id="" placeholder="Busca por categoría, empresa, ciudad, o ..."
                onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Busca por categoría, empresa, ciudad, o ..."} /> 
                <button >
                    <BtnBuscar />
                </button>
            </div>
            
            <style jsx>{`
                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 90px;
                    background-color: #fff;
                    border-radius: 10px;
                
                    margin: ${props.primary ? '40px' : 'null'};

                    width: ${props.primary ? 'null' : '590px'};
                    position: ${props.primary ? 'null' : 'absolute'};  
                    left: ${props.primary ? 'null' : '50%'};                        
                    top: ${props.primary ? 'null' : '95%'};
                    transform: ${props.primary ? 'null' : 'translate(-50%, -50%)'};
                    z-index: ${props.primary ? 'null' : '3'};
                }
                div input {
                    border: none;
                    outline: none;
                    height: 48px;
                    width: 500px;
                    text-align: center;
                    
                }
                div button {
                    border: none;
                    cursor: pointer;
                    background-color: #fff;
                }
                
            `}</style>
        </>
    )
}