import React, { useState, createContext } from 'react'

export const StoreContext = createContext(null)

export default ({ children }) => {
  const [files, setFiles] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [error, setError] = useState(null)
  const [editorShow, setEditorShow] = useState(false)
  const [editorHeader, setEditorHeader] = useState(null)

  const store = {
    filesStore: [files, setFiles],
    selectedIdStore: [selectedId, setSelectedId],
    errorStore: [error, setError],
    editorShowStore: [editorShow, setEditorShow],
    editorHeaderStore: [editorHeader, setEditorHeader]
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
