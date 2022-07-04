import * as React from "react"

const WaveFooter = (props) => (
    <>
  <svg
    width={1280}
    height={470}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1280 47.663-42.67 62.617c-42.66 62.031-128 188.145-213.33 195.478-85.333 7.332-170.667-101.185-256-125.089-85.333-23.023-170.667 38.568-256 70.39-85.333 31.235-170.667 31.235-256-15.691S85.333 94.588 42.667 47.662L0 .736V470h1280V47.663Z"
      fill="#473198"
    />
  </svg>
  <style jsx>{`
    svg {
        width: 100%;
    }
  `}</style>
  </>
)

export default WaveFooter
