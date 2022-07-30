import Select from 'react-select'
import sortOptions from '../../helper/sortOfferts'


export default function SortOfferts() {
    const styles = {
        menuList: (base) => ({
          ...base,
      
          "::-webkit-scrollbar": {
            width: "8px",
            height: "0px",
          },
          "::-webkit-scrollbar-track": {
            background: "#f1f1f1"
          },
          "::-webkit-scrollbar-thumb": {
            background: '#ccc',
            borderRadius: '4px'
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: '#b3b3b3'
          },
          "::-webkit-scrollbar-thumb:active": {
            background: '#999999'
          }
        })
      }

    return (
        
        <>
        <section>
            <span>Prácticas para ti</span>
            <div>
                {/*<span>Mostrar por:</span>*/}
                <Select
                    styles={styles}
                    defaultOptions
                    defaultValue={sortOptions[0].options[0]}
                    placeholder={'Mostrar por:'}
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