import React, { useContext } from 'react'
import Gallery from '../Gallery/Gallery'
import Editor from '../Editor/Editor'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { StoreContext } from '../../context/store'

const App = () => {
  const {
    showEditor: [showEditor],
  } = useContext(StoreContext)

  return (
    <div className="container">
      {showEditor ? (
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
