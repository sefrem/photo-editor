import React, { useContext } from 'react'
import { StoreContext } from '../../../utils/store'
import Remove from './Remove/Remove'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'

const Preview = props => {
  const { file, index: id } = props

  const {
    filesStore: [files, setFiles],
    selectedIdStore: [, setSelectedId],
    editorShowStore: [, setEditorShow],
  } = useContext(StoreContext)

  const findFile = id => {
    const file = files.filter((file, index) => index === id)
    return {
      file,
      index: files.indexOf(file[0]),
    }
  }

  const originalIndex = findFile(id).index
  const [, drag] = useDrag({
    item: { type: 'preview', id, originalIndex },
  })
  const [, drop] = useDrop({
    accept: 'preview',
    drop({ id: draggedId }) {
      const { index: overIndex } = findFile(id)
      moveFile(draggedId, overIndex)
    },
  })

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

  const selectAndEdit = e => {
    setSelectedId(e.currentTarget.id)
    setEditorShow(true)
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
