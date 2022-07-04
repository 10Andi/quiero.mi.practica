import Link from "next/link"


export default function ItemMenu({ name, img, href, selected }) {
    return (
        selected
            ? <>
            <li className="nav-item">
                <Link href={href}>
                    <a className="nav-link">
                        {img}
                        <span className="link-active">{name}</span>
                    </a>
                </Link>
            </li>

            <style jsx>{`
                li {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    font-size: 16px;
                    //font-weight: bold;
                    //color: #473198;
                    color: #7B7B7B;
                    margin-bottom: 40px;
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
                {/* li a:hover {
                    color: red;
                } */}
                li a:hover > :global(svg) {
                    fill: red;
                }
            `}</style>
        </>
        : <>
        <li className="nav-item">
            <Link href={href}>
                <a className="nav-link">
                    {img}
                    <span className="link-active">{name}</span>
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
                margin-bottom: 40px;
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
                {/* .link-active{
                font-weight: bold;
                font-size: 16px; */}
                /* line-height: 19px;  ERROR*/
                {/* color: #473198; */}
            }
            {/* li a:hover > :global(svg) {
                fill: red;
            } */}
        `}</style>
    </>
        
    )
}