import { createContext, useContext, useEffect, useState } from 'react'

const OffertContext = createContext({})
export const useOffert = () => useContext(OffertContext)

export const OffertContextProvider = ({children}) => {
    const [offertSelected, setOffertSelected] = useState(null)
    const [isBookmark, setIsBookmark] = useState(null)
    const [offerStatus, setOfferStatus] = useState(null)


    return <OffertContext.Provider value={{ offertSelected, setOffertSelected, isBookmark, setIsBookmark, offerStatus, setOfferStatus }}>
                {children} 
    </OffertContext.Provider>
}