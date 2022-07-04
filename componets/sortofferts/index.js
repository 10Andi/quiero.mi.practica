import Select from 'react-select'
import sortOptions from '../../helper/sortOfferts'


export default function SortOfferts() {
    return (
        
        <>
        <section>
            <span>Prácticas para ti</span>
            <div>
                {/*<span>Mostrar por:</span>
                <select name="sort" id="sort" className="round">
                    <option value="nuevos">Nuevos</option>
                    <option value="visitas">Visitas</option>
                    <option value="calificacion">Calificación</option>
                    <option value="cupos">Cupos</option>
                </select> */}
                <Select
                    isClearable
                    isMulti
                    defaultOptions
                    defaultValue={sortOptions[0].options[0]}
                    // placeholder={[0]}
                    options={sortOptions}
                    onChange={(e) => {
                        console.log(e)
                    }}
                />
            </div>
        </section>

        <style jsx>{`
            section {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            span {
                font-size: 16px;
                font-weight: bold;
            }
            div {
                //display: flex;
                //flex-direction: row;
                //align-items: center;
                
                max-width: 300px;
                width: 100%;
            }
            select {
                width: 125px;
                outline: none;
                margin-left: 12px;
                padding: 14px 23px;
                border-radius: 10px;
                border: thin 1px #000;

                appearance:none;
                -moz-appearance:none;
                -webkit-appearance:none;

                background:url(imagenes/iconDownArrow.svg) 90% 50%  no-repeat scroll transparent;
            }


        `}</style>
    </>
    )
    
}