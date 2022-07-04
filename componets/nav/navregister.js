import Logo from "../icons/logo";

export default function Nav() {
    return(
        <>
        <nav>
            <Logo />
        </nav>

        <style jsx>{`
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 16vh;
        }
        .nav-links {
            display: flex;
            width: 20%;
            justify-content: space-between;
        }
        
        .nav-links li {
            list-style: none;
            font-size: 18px;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #000;
            font-weight: 500;
        }
        `}</style>
        </>
    )
    
}