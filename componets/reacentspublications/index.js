import CardReacentPublication from "./cardreacentpublication";

export default function ReacentsPublications() {
    return (
<>
    <div className="recent">
        <h2>Publicaciones <br /> recientes</h2>
        <div className="allRecentPublications">
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
            <CardReacentPublication />
        </div>
    </div>
    <style jsx>{`
        .recent {
            height: 900px;
            margin-top: 10%;
            margin-bottom: 60px;
        }
        .recent h2 {
            font-size: 48px;
            color: #444444;
            margin-bottom: 5%;
        }
        .allRecentPublications {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 5%;
            row-gap: 5%;
        }
        .allRecentPublications a {
            text-decoration: none;
        }
        .allRecentPublications h3 {
            color: #000;
        }
    `}</style>
    </>
    )
    
}