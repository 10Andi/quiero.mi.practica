import { createContext, useContext, useState } from 'react'

const FilteredContext = createContext({})
export const useFiltered = () => useContext(FilteredContext)

export const FilteredContextProvider = ({ children }) => {
  const [sortedResults, setSortedResults] = useState([])
  const [searchedResults, setSearchedResults] = useState([])

  return (
    <FilteredContext.Provider value={{ sortedResults, setSortedResults, searchedResults, setSearchedResults }}>
      {children}
    </FilteredContext.Provider>
  )
}
