import BookmarksIcon from '@mui/icons-material/Bookmarks'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
// import HelpIcon from '../icons/helpicon'
// import Logo from '../icons/logo'
// import PostulationsIcon from '../icons/postulationsicon'
// import SearchIcon from '../icons/searchicon'
import BallotIcon from '@mui/icons-material/Ballot'
import SearchIcon from '@mui/icons-material/Search'
import { Tooltip } from '@mui/material'
import Link from 'next/link'
import LogoApp from '../icons/logoApp'
import ItemMenu from './itemmenu'
import ItemMenuLogout from './itemmenulogout'

const MENU_ITEMS_CONTENTS = {
  contents: [
    {
      name: 'Buscar práctica',
      href: '/home',
      img: <SearchIcon />
    },
    {
      name: 'Mis postulaciones',
      href: '/mispostulaciones',
      img: <BallotIcon />
    },
    {
      name: 'Mis favoritos',
      href: '/misfavoritos',
      img: <BookmarksIcon />
    }
  ]
}

export default function Menu () {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <>
      <aside>
        <LogoApp />
        <ul>
          {MENU_ITEMS_CONTENTS.contents.map(content =>
            router.pathname === content.href
              ? <ItemMenu key={content.name} name={content.name} img={content.img} href={content.href} selected />
              : <ItemMenu key={content.name} name={content.name} img={content.img} href={content.href} selected={false} />
          )}
          <ItemMenuLogout />
        </ul>
        <Link href={`/editarperfil/estudiante/${user.uid}`}>
          <Tooltip title='Editar perfil' placement='top' arrow>
            <div className={router.asPath === `/editarperfil/estudiante/${user.uid}` ? 'active' : ''}>
              <img loading='lazy' src={`https://ui-avatars.com/api/?name=${user?.names}+${user?.lastName}&size=128`} alt='' draggable='false' />
              <span>{user?.displayName}</span>
            </div>
          </Tooltip>
        </Link>
      </aside>

      <style jsx>{`
          .active {
            background: rgb(239,243,244);
            border-radius: 10px 0 0 10px;
          }
          aside {
            max-height: 100vh;
            height: 100vh;
            display: grid;
            /* grid-template-rows: 15% 1fr 20%; */
            align-content: space-between;
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
            padding: 10px;

          }
          div:hover {
            background: rgb(239,243,244);
            border-radius: 10px 0 0 10px;
            cursor: pointer;
          }
          div img {
            width: 73px;
            height: 73px;
            margin-right: 30px;
            border-radius: 100px;

          }
          div span {
            font-size: 18px;
            font-weight: bold;
            color: #4A0D67;
            margin-right: 10px;
            margin-top: 10px;
          }
        `}
      </style>
    </>
  )
}
