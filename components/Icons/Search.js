import * as React from "react"
const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 21 21"
    {...props}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={8.5} cy={8.5} r={5} />
      <path d="M17.571 17.5 12 12" />
    </g>
  </svg>
)
export default Search
