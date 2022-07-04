import Searchbar from "../searchbar";
import ShowOfferts from "../showofferts";
import SortOfferts from "../sortofferts";
import { SearchedContextProvider } from '../../context/searchedContext'

export default function ListOffers() {
    return (
        <>
            <main>
            <SearchedContextProvider>
                <Searchbar primary />
                <SortOfferts />
                <ShowOfferts />
            </SearchedContextProvider>
            </main>
            <style jsx>{`
                main {
                    border-right: 1px solid rgb(239, 243, 244);
                    border-left: 1px solid rgb(239, 243, 244);
                    padding: 0 18px;
                }
            `}</style>
        </>
    )
    
}