import SavedShowOfferts from '../showofferts/savedshowofferts'

export default function SavedListOffers () {
  return (
    <>
      <main>
        {/* <div>
            <span className="left">Mostrar ofertas disponibles</span>
            <ToggleSwitch />
            <span className="right">Mostrar todas las ofertas</span>
        </div> */}
        <SavedShowOfferts />
      </main>
      <style jsx>{`
                div {
                    margin: 40px 0;
                    display: flex;
                }
                .left {
                    margin-right: 10px
                }
                .right {
                    margin-left: 10px
                }
                main {
                    border-right: 1px solid rgb(239, 243, 244);
                    border-left: 1px solid rgb(239, 243, 244);
                    padding: 0 18px;
                }
            `}
      </style>
    </>
  )
}
