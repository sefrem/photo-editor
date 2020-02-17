import React, { useContext } from 'react'
import { StoreContext } from '../../utils/store'
import { useDrop } from 'react-dnd'
import Dropzone from '../Dropzone/Dropzone'
import Preview from '../Preview/Preview'
import Header from '../UI/Header'

const Gallery = () => {
  const {
    filesStore: [files],
    errorStore: [error],
  } = useContext(StoreContext)

  const [, drop] = useDrop({ accept: 'preview' })

  return (
    <>
      <Header
        progressText="STEP 1/3"
        messageText="Drag or select photo"
        className="mt-15"
        classNameProgress="header__progress"
        classNameMessage="header__message"
      />
      <div className="gallery mt-15">
        <div className="gallery__previews" ref={drop}>
          {files.map((file, index) => (
            <Preview key={file.name} file={file} index={index} />
          ))}
          <Dropzone />
        </div>
        <div>{error}</div>
      </div>
    </>
  )
}

export default Gallery
