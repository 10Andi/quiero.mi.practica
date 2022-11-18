export default function CardRequest ({ title, paragraph }) {
  return (
    <>
      <div className='card-request'>
        <h3 className='titulo'>{title}</h3>
        <p className='parrafo'><span className='dot'>·</span> {paragraph}</p>
      </div>

      <style jsx>{`
          .card-request {
            border-radius: 10px;
            background: #F8F1FF;
            padding: 12px, 40px, 40px, 40px;
            width: 80%;
            margin-bottom: 60px;
          }
          .card-request h3{
            font-size: 24px;
            color: #000000;
            margin-bottom: 40px;
          }
          .card-request label {
            font-size: 18px;
            font-weight: bold;
            color: #444;
          }
          .card-request p {
            font-size: 18px;
            color: #444;
            text-align: start;
            margin: 0;
            width: 100%;
            margin: 10px 0;
          }
          .card-request p span {
            font-size: 18px;
            font-weight: bold;
            color: #444;
          }
          .dot {
            font-size: 24px;
            font-weight: bolder;
            color: #000;
          }
        `}
      </style>
    </>
  )
}
