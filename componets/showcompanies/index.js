export default function ShowCompanies () {
  return (
    <>
      <div>
        <img src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png' alt='' draggable='false' />
        <img src='https://s.cornershopapp.com/static/landings/img/apple-touch-icon.png' alt='' draggable='false' />
        <img src='https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png' alt='' draggable='false' />
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png' alt='' draggable='false' />
        <img src='https://cdn-icons-png.flaticon.com/512/6033/6033716.png' alt='' draggable='false' />
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/245px-Uber_logo_2018.svg.png' alt='' draggable='false' />
      </div>
      <style jsx>
        {`
          div {
            margin: 10% 0;
            display: grid;
            grid-template-columns: repeat(6, 126px);
            justify-content: space-evenly;
            /* column-gap: 10%; */
            /* grid-auto-columns: 126px; */
          }
          div img {
            height: 119px;
            width: 126px;
            border-radius: 10px;
            object-fit: contain;
          }
            `}
      </style>
    </>
  )
}
