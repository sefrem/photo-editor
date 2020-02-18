import React from 'react'

const Button = props => {
  const { className, onClick, value, svg, disabled } = props

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {value}
      {svg}
    </button>
  )
}

export default Button
