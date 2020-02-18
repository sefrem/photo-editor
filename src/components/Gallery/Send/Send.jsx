import React, { useContext } from 'react'
import { StoreContext } from '../../../context/store'
import classNames from 'classnames'

const Send = () => {
  const {
    files: { files, addFilesToLocalStorage },
  } = useContext(StoreContext)

  return (
    <button
      onClick={addFilesToLocalStorage}
      className={classNames('mt-15 send', { 'send_disabled': !files.length })}
      disabled={files.length ? false : true}
    >
      Send
    </button>
  )
}

export default Send
