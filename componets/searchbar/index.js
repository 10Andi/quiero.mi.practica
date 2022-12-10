import { useState } from 'react'
import { useOffert } from '../../context/offertContext'
import { useFiltered } from '../../context/searchedContext'
import BtnBuscar from '../icons/btnbuscar'

export default function Searchbar (props) {
  const [searchInput, setSearchInput] = useState('')
  const { offerList } = useOffert()
  const { searchBarInUse, setSearchBarInUse, setSearchedResults } = useFiltered()

  const searchItems = (searchValue) => {
    // console.log('🚀 ~ file: index.js:15 ~ searchItems ~ searchValue', searchValue)
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = offerList.filter(ele => Object.values(ele).join('').toLowerCase().includes(searchInput.toLowerCase()))
      console.log('🚀 ~ file: index.js:16 ~ searchItems ~ filteredData', filteredData)
      setSearchedResults(filteredData)
      setSearchBarInUse(true)
    } else {
      setSearchedResults(offerList)
      setSearchBarInUse(false)
    }
  }
  console.log('🚀 ~ file: index.js:23 ~ searchItems ~ searchBarInUse', searchBarInUse)

  return (
    <>
      <div>
        <input
          type='text'
          name='search'
          id=''
          placeholder='Busca por categoría, empresa, ciudad, o ...'
          // onFocus={(e) => { e.target.placeholder = '' }}
          // onBlur={(e) => { e.target.placeholder = 'Busca por categoría, empresa, ciudad, o ...' }}
          onChange={(e) => searchItems(e.target.value)}
        />
        <button>
          <BtnBuscar />
        </button>
      </div>

      <style jsx>
        {`
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
            //border: 1px solid rgb(239,243,244);
          }
          div button {
            border: none;
            cursor: pointer;
            background-color: #fff;
          }
        `}
      </style>
    </>
  )
}
