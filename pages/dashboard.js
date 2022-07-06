import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router";
import MenuCompany from "../componets/menu/menucompany";

export default function Dashboard() {
    const {user} = useAuth()
    const router = useRouter()
    

    if (user === null) {
        router.push('/login')
        return
    }
    if (user && user.type !== 'empresa') {
        router.push('/login')
        return
    }

    return(
        <>
            <section>
                <MenuCompany />
            </section>

            <style jsx>{`
                section {
                    height: 100vh;
                    padding: 0 42px;
                    //padding: 0 200px;
                    display: grid;
                    //grid-template-columns: 1fr 3fr;
                    grid-template-columns: 1fr 4fr;
                    //grid-template-columns: .6fr 2fr .9fr;
                }
                {/* rgb(247, 249, 249) */}
            `}</style>
        </>
    )
}