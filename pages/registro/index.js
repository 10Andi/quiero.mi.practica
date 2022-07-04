import Footer from "../../componets/footer";
import Nav from "../../componets/nav";
import Link from 'next/link'
import User from "../../componets/icons/user";
import Company from "../../componets/icons/company";

export default function Registro() {
    return (
        <>
        <section className="container">
            <Nav />
                <div className="cards">
                    <div className="student-card">
                        <h3>Estudiante</h3>
                        <User />
                        <Link href={"/registro/usuario"}>
                            <a>Regisrarse</a>
                        </Link>
                    </div>
                    <div className="company-card">
                        <h3>Empresa</h3>
                        <Company />
                        <Link href={"/registro/empresa"}>
                                <a>Regisrarse</a>
                            </Link>
                    </div>
                </div>
        </section>
        <Footer />
            <style jsx>{`
                {/* .logIn {
                    min-height: 74vh;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                } */}
                .container {
                    padding: 0 42px;
                    position: relative;
                    min-height: calc(100vh - 71.813px);
                }

                .cards {
                    min-height: 74vh;
                    display: flex;
                    /* padding-bottom: 8%; */
                    padding-bottom: 3%;
                    justify-content: space-evenly;
                    align-items: center;
                }
                .cards h3 {
                    font-size: 36px;
                    /* margin: 5% 0; */
                    margin-top: 5%;
                }
                .cards .student-card {
                    border-radius: 10px;
                    width: 30%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: rgb(233 233 233 / 14%);;
                    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
                }
                .cards .company-card {
                    border-radius: 10px;
                    width: 30%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: rgb(233 233 233 / 14%);;
                    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
                }
                .cards a {
                    width: 60%;
                    padding: 10px 0;
                    margin: 40px 0;
                    /* margin-bottom: 40px; */
                    background: #473198;  /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #4A0D67, #473198);  /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #4A0D67, #473198); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    border: none;
                    outline: none;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    text-align: center;
                }
            `}</style>

        </>
    )
}