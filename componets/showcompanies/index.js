export default function ShowCompanies() {
    return (
        <>
            <div>
                <img src="" alt="" draggable="false" />
                <img src="" alt="" draggable="false" />
                <img src="" alt="" draggable="false" />
                <img src="" alt="" draggable="false" />
                <img src="" alt="" draggable="false" />
                <img src="" alt="" draggable="false" />
            </div>
            <style jsx>{`
                div {
                    margin: 10% 0;
                    display: grid;
                    grid-template-columns: repeat(6, 126px);
                    justify-content: space-between;
                    /* column-gap: 10%; */
                    /* grid-auto-columns: 126px; */
                }
                div img {
                    height: 119px;
                    width: 126px;
                    border-radius: 10px;
                }
            `}</style>
        </>
    )
}