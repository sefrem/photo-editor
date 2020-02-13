import React from 'react'
import Remove from './Remove'
import { useDrag, useDrop } from 'react-dnd'

const Preview = props => {
  const { file, id, files, setFiles, moveFile, findFile } = props

  const originalIndex = findFile(id).index
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'preview', id, originalIndex },
  })
  const [, drop] = useDrop({
    accept: 'preview',
    drop({ id: draggedId }) {
      const { index: overIndex } = findFile(id)
      moveFile(draggedId, overIndex)
    },
  })

  return (
    <div className="preview" id={id} ref={node => drag(drop(node))}>
      <div className="preview__thumb">
        <img src={file.preview} alt="" className="preview__img" />
      </div>
      <Remove files={files} setFiles={setFiles} id={id} />
    </div>
  )
}

export default Preview
