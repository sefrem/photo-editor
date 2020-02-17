import React from 'react'

const Header = props => {
  const {
    progressText,
    messageText,
    className,
    classNameProgress,
    classNameMessage,
  } = props
  return (
    <div className={className}>
      <div className={classNameProgress}>{progressText}</div>
      <div className={classNameMessage}>{messageText}</div>
    </div>
  )
}

export default Header
