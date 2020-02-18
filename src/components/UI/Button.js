import React from 'react'

const Button = props => {
  const { className, onClick, value, svg } = props

  return (
    <button className={className} onClick={onClick}>
      {value}
      {svg}
    </button>
  )
}

export default Button
