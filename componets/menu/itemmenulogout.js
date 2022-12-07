import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
// import LogoutIcon from '../icons/logouticon'
import LogoutIcon from '@mui/icons-material/Logout'

export default function ItemMenuLogout () {
  const router = useRouter()
  const { logOut } = useAuth()

  // const logout = async () => {
  //     await signOut(auth)
  //     router.push('/login')

  // }

  return (
    <>
      <li className='nav-item'>
        <a
          className='nav-link' onClick={() => {
            logOut()
            router.push('/login')
          }}
        >
          <LogoutIcon />
          <span className='link-active'>Cerrar sesión</span>
        </a>
      </li>
      <style jsx>{`
            li {
                display: flex;
                align-items: center;
                text-decoration: none;
                font-size: 16px;
                color: #7B7B7B;
                margin-bottom: 16px;
                border-radius: 10px 0 0 10px;
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
                padding: 16px 32px;
                width: 100%;
                cursor: pointer;
            }
            li:hover {
              background: rgb(239, 243, 244);
            }
            li a:hover {
              color: #473198;
            }
            li a:hover > :global(svg) {
              fill: #473198;
            }
        `}
      </style>
    </>
  )
}
