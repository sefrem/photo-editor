import React, { useContext } from 'react'
import Gallery from '../Gallery/Gallery'
import Editor from '../Editor/Editor'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { StoreContext } from '../../utils/store'

const App = () => {
  const {
    editorShowStore: [editorShow],
  } = useContext(StoreContext)

  return (
    <div className="container">
      {editorShow ? (
        <Editor />
      ) : (
        <DndProvider backend={Backend}>
          <Gallery />
        </DndProvider>
      )}
    </div>
  )
}

export default App
