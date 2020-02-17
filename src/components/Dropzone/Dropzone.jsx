import React, { useContext } from 'react'
import { StoreContext } from '../../utils/store'
import { useDropzone } from 'react-dropzone'
// const store = require('store')

const Dropzone = () => {
  const {
    filesStore: [files, setFiles],
    errorStore: [, setError],
  } = useContext(StoreContext)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setError(null)
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

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
    </div>
  )
}

export default Dropzone
