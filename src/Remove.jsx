import React from 'react'

const Remove = props => {
  const { id, files, setFiles } = props

  const remove = () => {
    setFiles(files.filter((file, index) => index !== id))
  }

  return <div className="remove" onClick={remove}></div>
}

export default Remove
