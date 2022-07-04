import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.production.min";

export default function ProtectedRoute({children}) {
    const {user} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(!user) {
            router.push('/login')
        }
    }, [router, user])
    return(
        <>
            {user ? children : null}
        </>
    )
}