import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
const store = require('store')

const Dropzone = props => {
  const { files, setFiles, setError } = props

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setError('')
      if (files.length + acceptedFiles.length > 5) {
        return setError('Не больше 5 файлов')
      }

      //JSON { images: [{url: ‘’, preview: ‘’}] }

      // const images = [];
      // acceptedFiles.forEach(file => {
      //   let url = file.path;
      //   let preview = URL.createObjectURL(file);
      //   let image = {url: url, preview: preview}
      //   images.push(image)
      // })
      // store.set('images', JSON.stringify(images))

      setFiles(
        files.concat(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      )
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <div {...getRootProps()} className="file-selection">
      <input {...getInputProps()} />
    </div>
  )
}

export default Dropzone
