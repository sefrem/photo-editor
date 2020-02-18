import React, { useContext } from 'react'
import { StoreContext } from '../../../context/store'
import { useDropzone } from 'react-dropzone'

const normalizeFilesWithPreview = files => {
  return files.map(file =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
  )
}

const Dropzone = () => {
  const {
    files: { files, setFiles },
    error: [, setError],
  } = useContext(StoreContext)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      if (files.length + acceptedFiles.length > 5) {
        return setError('Не больше 5 файлов')
      } else {
        setError(null)
        setFiles([...files, ...normalizeFilesWithPreview(acceptedFiles)])
      }
    },
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
    </div>
  )
}

export default Dropzone
