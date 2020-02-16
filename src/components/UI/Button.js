import React from 'react'

const Button = props => {
  const { className, onClick, value } = props

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
