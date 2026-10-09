import React from 'react'

const Option = ({onClick, children}) => {
  return (
    <li>
        <button type="button" onClick={onClick}>{children}</button>
    </li>
  )
}

export default Option