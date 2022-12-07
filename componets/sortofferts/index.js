import Select from 'react-select'
import { useOffert } from '../../context/offertContext'
import { useFiltered } from '../../context/searchedContext'
import sortOptions from '../../helper/sortOfferts'

export default function SortOfferts () {
  const { offerList } = useOffert()
  const { setSortedResults } = useFiltered()

  const sortItems = (e) => {
    const { value, categorias } = e
    console.log('🚀 ~ file: index.js ~ line 11 ~ sortItems ~ value, categorias', value, categorias)
    if (categorias) {
      const sortData = offerList.filter(ele => ele.categoria === value)
      console.log('🚀 ~ file: index.js:23 ~ sortItems ~ sortData', sortData)
      setSortedResults(sortData)
    } else {
      if (value === 'Más nuevos') {
        const sortData = offerList.sort(ele => ele.categoria === value)
        setSortedResults(sortData)
      }
      if (value === 'Más vistos') {
        const sortData = offerList.sort(ele => ele.vistas)
        console.log('🚀 ~ file: index.js ~ line 32 ~ sortItems ~ sortData', sortData)
        setSortedResults(sortData)
      }
      if (value === 'Más cupos disponibles') {
        const sortData = offerList.reverse((a, b) => a.cupos - b.cupos)
        console.log('🚀 ~ file: index.js ~ line 36 ~ sortItems ~ sortData', sortData)
        setSortedResults(sortData)
      }

      // const filteredData = offerList.filter(ele => Object.values(ele).join('').toLowerCase().includes(value))
      // setFilteredResults(filteredData)
    }
  }

  const styles = {
    menuList: (base) => ({
      ...base,

      '::-webkit-scrollbar': {
        width: '8px',
        height: '0px'
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#ccc',
        borderRadius: '4px'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#b3b3b3'
      },
      '::-webkit-scrollbar-thumb:active': {
        background: '#999999'
      }
    })
  }

  return (
    <>
      <section>
        <span>Prácticas para ti</span>
        <div>
          {/* <small>Mostrar por:</small> */}
          <Select
            styles={styles}
            defaultOptions
            defaultValue={sortOptions[0].options[0]}
            placeholder='Mostrar por:'
            options={sortOptions}
            onChange={(e) => {
              sortItems(e)
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
            {/* select {
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
            } */}


        `}
      </style>
    </>
  )
}
