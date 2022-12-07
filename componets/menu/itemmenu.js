import Link from 'next/link'

export default function ItemMenu ({ name, img, href, selected }) {
  return (
    selected
      ? (
        <>
          <li className='nav-item'>
            <Link href={href}>
              <a className='nav-link'>
                {img}
                <span className='link-active'>{name}</span>
              </a>
            </Link>
          </li>

          <style jsx>
            {`
              li {
                display: flex;
                align-items: center;
                text-decoration: none;
                font-size: 16px;
                //font-weight: bold;
                //color: #473198;
                color: #7B7B7B;
                margin-bottom: 16px;
                background: rgb(239,243,244);
                border-radius: 10px 0 0 10px;
              }
              img {
                margin-right: 37px;
              }
              span {
                margin-left: 37px;
                color: #473198;
                font-weight: 700;
              }
              span:hover {
                color: #473198;
              }
              a {
                display: flex;
                align-items: center;
                padding: 16px 32px;
                width: 100%;
              }
              li a:hover > :global(svg) {
                fill: #473198;
              }
              li a > :global(svg) {
                fill: #473198;
              }
            `}
          </style>
        </>
        )
      : (
        <>
          <li className='nav-item'>
            <Link href={href}>
              <a className='nav-link'>
                {img}
                <span className='link-active'>{name}</span>
              </a>
            </Link>
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

  )
}
