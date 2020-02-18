import React, { useContext } from 'react'
import { StoreContext } from '../../../../context/store'

const Remove = props => {
  const { id } = props

  const {
    files: { removeFile },
  } = useContext(StoreContext)

  return (
    <div className="remove mt--8 ml--16" onClick={e => removeFile(e, id)}></div>
  )
}

export default Remove
