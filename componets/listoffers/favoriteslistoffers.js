import { FilteredContextProvider } from '../../context/searchedContext'
import Searchbar from '../searchbar'
import FavoritesShowOfferts from '../showofferts/favoritesshowofferts'
import SortOfferts from '../sortofferts'

export default function FavoritesListOffers () {
  return (
    <>
      <main>
        <FilteredContextProvider>
          <Searchbar primary />
          <SortOfferts title='Prácticas guardadas' />
          <FavoritesShowOfferts />
        </FilteredContextProvider>
      </main>
      <style jsx>
        {`
          main {
            border-right: 1px solid rgb(239, 243, 244);
            border-left: 1px solid rgb(239, 243, 244);
            padding: 0 18px;
          }
        `}
      </style>
    </>
  )
}
