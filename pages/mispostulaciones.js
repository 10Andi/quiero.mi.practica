import DetailedOffert from "../componets/detailedoffert";
import SavedListOffers from "../componets/listoffers/savedlistoffers";
import Menu from "../componets/menu";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { OffertContextProvider } from '../context/offertContext'


// const test = true
export default function Mispostulaciones() {
    const {user} = useAuth()
    const router = useRouter()
    

    if (user === null) {
        router.push('/login')
        return
    }
    if (user && user.type !== 'estudiante') {
        router.push('/login')
        return
    }

    return (
        <>
            <section>
                <Menu />
                <OffertContextProvider>
                    <SavedListOffers />
                    <DetailedOffert />
                </OffertContextProvider>
            </section>

            <style jsx>{`
                section {
                    height: 100vh;
                    padding: 0 42px;
                    padding: 0 200px;
                    display: grid;
                    grid-template-columns: .7fr 2fr 1.1fr;
                    //grid-template-columns: 1fr 2fr 1.3fr;
                }
                {/* rgb(247, 249, 249) */}

            `}</style>
        </>
    )
}