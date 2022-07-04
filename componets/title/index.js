export default function Title({text, textHighlight}) {
    return (
        <>
            <h1>{text}<span>{textHighlight}</span></h1>
            <style jsx>{`
                h1 {
                    font-size: 48px;
                    text-align: center;
                    padding-bottom: 25px;
                    // width: 595px;
                    margin: auto;
                }
                span {
                    font-size: 48px;
                    color: #473198;
                }
            `}</style>
        </>
    )
}