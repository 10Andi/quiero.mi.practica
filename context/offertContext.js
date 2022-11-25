import { createContext, useContext, useState } from 'react'

const OffertContext = createContext({})
export const useOffert = () => useContext(OffertContext)

export const OffertContextProvider = ({ children }) => {
  const [offertSelected, setOffertSelected] = useState(null)
  const [offerStatus, setOfferStatus] = useState(null)

  return (
    <OffertContext.Provider value={{ offertSelected, setOffertSelected, offerStatus, setOfferStatus }}>
      {children}
    </OffertContext.Provider>
  )
}
