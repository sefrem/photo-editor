import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Dropzone from './Dropzone'
import Preview from './Preview'
import update from 'immutability-helper'
import Editor from './Editor'

const Dash = () => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(Number)

  const moveFile = (id, atIndex) => {
    const { file, index } = findFile(id)
    setFiles(
      update(files, {
        $splice: [
          [index, 1],
          [atIndex, 0, ...file],
        ],
      })
    )
  }

  const onClick = e => {
    setSelectedId(e.currentTarget.id)
  }

  const findFile = id => {
    const file = files.filter((file, index) => index === id)
    return {
      file,
      index: files.indexOf(file[0]),
    }
  }
  const [, drop] = useDrop({ accept: 'preview' })
  console.log("files", files)
  return (
    <>
      <div className="dashboard">
        <div className="previews" ref={drop}>
          {files.map((file, index) => (
            <Preview
              id={index}
              key={file.name}
              file={file}
              index={index}
              files={files}
              setFiles={setFiles}
              moveFile={moveFile}
              findFile={findFile}
              onClick={onClick}
            />
          ))}

          <Dropzone files={files} setFiles={setFiles} setError={setError} />
        </div>
        <div>{error}</div>
      </div>
      {/* <div id="tui-image-editor"></div> */}
      {selectedId ? <Editor files={files} id={selectedId} setFiles={setFiles}/> : null}
    </>
  )
}

export default Dash
