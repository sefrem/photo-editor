import React, { useContext } from 'react'
import { StoreContext } from '../../../utils/store'
import Button from '../../UI/Button'

const ButtonGroup = props => {
  const {
    filesStore: [files, setFiles],
    selectedIdStore: [id],
    editorShowStore: [, setEditorShow],
  } = useContext(StoreContext)

  const submitEditedPicture = () => {
    const base64 = props.editorRef.current.getInstance().toDataURL()
    const blob = URL.createObjectURL(dataURItoBlob(base64))
    let newFiles = [...files]
    newFiles[id].preview = blob
    setFiles(newFiles)
    setEditorShow(false)
  }

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

  const cancelEditing = () => {
    setEditorShow(false)
  }

  return (
    <div className="buttonGroup">
      <div className="buttonGroup__container">
        <Button
          className="button-cancel"
          value="Cancel"
          onClick={cancelEditing}
        />
        <Button
          className="button-submit"
          value="Done"
          onClick={submitEditedPicture}
          svg={
            <svg
              className="button-submit__icon"
              width="32"
              height="27"
              viewBox="0 0 32 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.37035 26.3342L31.877 3.82753L28.3415 0.291992L9.37042 19.2631L3.72383 13.6165L0.188293 17.152L5.83489 22.7986L5.83481 22.7987L9.37035 26.3342Z"
                fill="white"
              />
            </svg>
          }
        ></Button>
      </div>
    </div>
  )
}

export default ButtonGroup
