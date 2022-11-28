import * as React from 'react'

const BtnBuscar = (props) => (
  <svg
    width={48}
    height={48}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M0 0h38c5.523 0 10 4.477 10 10v28c0 5.523-4.477 10-10 10H0V0Z'
      fill='#ADFC92'
    />
    <path
      d='M23 15c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 31 23c0-4.411-3.589-8-8-8Z'
      fill='#fff'
    />
  </svg>
)

export default BtnBuscar
