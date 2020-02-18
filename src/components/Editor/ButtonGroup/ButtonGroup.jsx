import React, { useContext } from 'react'
import { StoreContext } from '../../../context/store'

const dataURItoBlob = dataURI => {
  const byteString = atob(dataURI.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab])
  return blob
}

const convertCanvasToBlob = canvas => {
  const base64 = canvas.toDataURL()
  return URL.createObjectURL(dataURItoBlob(base64))
}

const ButtonGroup = props => {
  const {
    files: { files, setFiles },
    selectedFileId: [selectedFileId],
    showEditor: [, setShowEditor],
  } = useContext(StoreContext)

  const submitEditedPicture = () => {
    const blob = convertCanvasToBlob(props.editorRef.current.getInstance())
    updateFilePreview(selectedFileId, blob)
    setShowEditor(false)
  }

  const updateFilePreview = (selectedFileId, preview) => {
    const newFiles = [...files]
    newFiles[selectedFileId].preview = preview
    setFiles(newFiles)
  }

  return (
    <div className="buttonGroup">
      <div className="buttonGroup__container">
        <button className="button-cancel" onClick={() => setShowEditor(false)}>
          Cancel
        </button>
        <button className="button-submit" onClick={submitEditedPicture}>
          Done
          <svg
            className="button-submit__icon"
            width="32"
            height="27"
            viewBox="0 0 32 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.37035 26.3342L31.877 3.82753L28.3415 0.291992L9.37042 19.2631L3.72383 13.6165L0.188293 17.152L5.83489 22.7986L5.83481 22.7987L9.37035 26.3342Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ButtonGroup
