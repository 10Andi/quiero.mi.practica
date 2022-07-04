import * as React from "react"

const Dot = (props) => (
  <>
  <svg
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 0C1.794 0 0 1.794 0 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4Z"
      fill="#444"
    />
  </svg>
  <style jsx>{`
    svg {
      margin: 0 10px;
    }
  `}</style>
  </>
)

export default Dot
