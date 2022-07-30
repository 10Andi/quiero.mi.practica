import LogoutIcon from "../icons/logouticon"
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";



export default function ItemMenuLogout() {
    const router = useRouter()
    const { logOut } = useAuth()

    // const logout = async () => {
    //     await signOut(auth)
    //     router.push('/login')
        
    // }

    return (
        <>
            <li className="nav-item">
                <a className="nav-link" onClick={() => {
                    logOut()
                    router.push('/login')
                }}>
                    <LogoutIcon />
                    <span className="link-active">Cerrar sesión</span>
                </a>
            </li>
            <style jsx>{`
                li {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    font-size: 16px;
                    color: #7B7B7B;
                    margin-bottom: 40px;
                    cursor: pointer;
                }
                img {
                    margin-right: 37px;
                }
                span {
                    margin-left: 37px;
                }
                a {
                    display: flex;
                    align-items: center;
                }
                .link-active {
                    .link-active{
                    font-weight: bold;
                    font-size: 16px;
                    /* line-height: 19px;  ERROR*/
                    color: #473198;
                }
            `}</style>
        </>
    )
}