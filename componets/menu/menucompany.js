import { useAuth } from "../../context/AuthContext";
import HelpIcon from "../icons/helpicon";
import HomeIcon from "../icons/homeicon";
import Logo from "../icons/logo";
// import LogoutIcon from "../Icons/LogoutIcon";
import PostulationsIcon from "../icons/postulationsicon";
import SearchIcon from "../icons/searchicon";
import ItemMenu from "./itemmenu";
import ItemMenuLogout from "./itemmenulogout";
import { useRouter } from "next/router";


const MENU_ITEMS_CONTENTS = {
    contents: [
        {
            name: 'Inicio',
            href: '#',
            img: <HomeIcon />
        },
        {
            name: 'Buscar práctica',
            href: '/home',
            img: <SearchIcon />
        },
        {
            name: 'Mis postulaciones',
            href: '/mispostulaciones',
            img: <PostulationsIcon />
        },
        {
            name: 'Ayuda',
            href: '/ayuda',
            img: <HelpIcon />
        }
    ]
}

export default function MenuCompany() {
    const { user } = useAuth()
    const router = useRouter()
    // MENU_ITEMS_CONTENTS.contents.map(content =>
    //     router.pathname === content.href
    //         ? <style jsx>{`
    //             :global(svg) {
    //                 fill: red;
    //             }
    //         `}</style>
    //         : <ItemMenu key={content.name} name={content.name} img={content.img} href={content.href} selected={false}/>
    // )

    return (
        <>
            <aside>
                <Logo />
                <ul>
                    {MENU_ITEMS_CONTENTS.contents.map(content =>
                        router.pathname === content.href
                            ? <ItemMenu key={content.name} name={content.name} img={content.img} href={content.href} selected={true} />
                            : <ItemMenu key={content.name} name={content.name} img={content.img} href={content.href} selected={false}/>
                    )}
                    <ItemMenuLogout />
                </ul>
                <div className="user">
                        <img loading="lazy" src={`https://ui-avatars.com/api/?name=${user?.names}+${user?.lastName}&size=128`} alt="" draggable="false" />
                        <div className="text">
                            <span>{user?.displayName}</span>
                            <span className="company">de {user?.nombre_empresa}</span>
                        </div>
                        {/* <span>{user?.displayName}</span> */}
                </div>
            </aside>

            <style jsx>{`
                aside {
                    max-height: 100vh;
                    height: 100vh;
                    display: grid;
                    /* grid-template-rows: 15% 1fr 20%; */
                    align-content: space-between;
                    border-right: 1px solid rgb(239, 243, 244);

                }
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                div {
                    display: flex;
                    margin-bottom: 42px;
                }
                div img {
                    width: 73px;
                    height: 73px;
                    margin-right: 30px;
                    border-radius: 100px;

                }
                span {
                    font-size: 18px;
                    font-weight: bold;
                    color: #4A0D67;
                    margin-right: 10px;
                    margin-top: 10px;
                }
                .text {
                    display: flex;
                    flex-direction: column;
                }
                .company {
                    color: #473198;
                }
            `}</style>
        </>
    )
}