import * as React from 'react'

const Bookmark = (props) => (
  <>
    <svg
      height={21}
      viewBox='0 0 21 21'
      width={21}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='m1.5.5h6c.55228475 0 1 .44771525 1 1v12l-4-4-4 4v-12c0-.55228475.44771525-1 1-1z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        transform='translate(6 4)'
        {...props}
      />
    </svg>
    <style jsx>{`
    {/* path {
      stroke: selected ? 'red';
    } */}
  `}
    </style>
  </>
)

export default Bookmark
