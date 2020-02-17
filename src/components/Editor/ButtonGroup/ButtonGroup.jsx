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
          className="buttonGroup__cancel"
          value="Cancel"
          onClick={cancelEditing}
        />
        <Button
          className="buttonGroup__submit"
          value="Done"
          onClick={submitEditedPicture}
        />
      </div>
    </div>
  )
}

export default ButtonGroup
