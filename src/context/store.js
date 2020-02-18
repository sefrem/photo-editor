import React, { useState, createContext } from 'react'

export const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
  const [files, setFiles] = useState([])
  const [selectedFileId, setSelectedFileId] = useState(null)
  const [error, setError] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editorTitle, setEditorTitle] = useState(null)

  const store = {
    selectedFileId: [selectedFileId, setSelectedFileId],
    error: [error, setError],
    showEditor: [showEditor, setShowEditor],
    editorTitle: [editorTitle, setEditorTitle],

    files: {
      files,
      setFiles,
      removeFile: (e, id) =>  {
        e.stopPropagation()
        setFiles(files.filter((file, index) => index !== id))
      },
      addFilesToLocalStorage: () => {
        const images = []
        files.forEach(file => {
          let url = file.path
          let preview = URL.createObjectURL(file)
          let image = { url: url, preview: preview }
          images.push(image)
        })
        localStorage.setItem('images', JSON.stringify(images))
        console.log('Added to LocalStorage')
      },
    },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
