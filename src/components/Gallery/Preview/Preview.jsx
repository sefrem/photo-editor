import React, { useContext } from 'react'
import { StoreContext } from '../../../context/store'
import Remove from './Remove/Remove'
import { useDrag, useDrop } from 'react-dnd'

const Preview = props => {
  const { file, id } = props

  const {
    files: { files, setFiles },
    selectedFileId: [, setSelectedFileId],
    showEditor: [, setShowEditor],
  } = useContext(StoreContext)

  const [, drag] = useDrag({
    item: { type: 'preview', id },
  })
  const [, drop] = useDrop({
    accept: 'preview',
    drop({ id: draggedId }) {
      moveFile(draggedId, id)
    },
  })

  const moveFile = (fromIndex, toIndex) => {
    let newFiles = [...files]
    newFiles.splice(toIndex, 0, newFiles.splice(fromIndex, 1)[0])
    setFiles(newFiles)
  }

  const selectAndEdit = e => {
    setSelectedFileId(e.currentTarget.id)
    setShowEditor(true)
  }

  return (
    <div
      className="preview mr-12 mb-12"
      id={id}
      onClick={selectAndEdit}
      ref={node => drag(drop(node))}
    >
      <div className="preview__thumb">
        <img src={file.preview} alt="" className="preview__img" />
      </div>
      <Remove id={id} />
    </div>
  )
}

export default Preview
