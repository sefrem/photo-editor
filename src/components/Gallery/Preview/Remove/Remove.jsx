import React, { useContext } from 'react'
import { StoreContext } from '../../../../utils/store'

const Remove = props => {
  const { id } = props

  const {
    filesStore: [files, setFiles],
  } = useContext(StoreContext)

  const remove = e => {
    e.stopPropagation()
    setFiles(files.filter((file, index) => index !== id))
  }

  return <div className="remove mt--8 ml--16" onClick={remove}></div>
}

export default Remove
