import { createContext, useContext, useEffect, useState } from 'react'

const SearchedContext = createContext({})
export const useSearched = () => useContext(SearchedContext)

export const SearchedContextProvider = ({children}) => {
    const [searched, setSearched] = useState(null)

    return <SearchedContext.Provider value={{ searched, setSearched }}>
                {children} 
    </SearchedContext.Provider>
}