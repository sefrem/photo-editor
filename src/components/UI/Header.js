import React from 'react'

const Header = props => {
  const {
    progressText,
    messageText,
    classNameProgress,
    classNameMessage,
  } = props
  return (
    <div className="header mt-15">
      <div className={classNameProgress}>{progressText}</div>
      <div className={classNameMessage}>{messageText}</div>
    </div>
  )
}

export default Header
