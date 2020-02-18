import React, { useContext } from 'react'
import { StoreContext } from '../../context/store'
import { useDrop } from 'react-dnd'
import Dropzone from './Dropzone/Dropzone'
import Preview from './Preview/Preview'
import Send from './Send/Send'

const Gallery = () => {
  const {
    files: { files },
    error: [error],
  } = useContext(StoreContext)

  const [, drop] = useDrop({ accept: 'preview' })

  return (
    <>
      <div className="mt-15">
        <div className="header__progress">STEP 1/3</div>
        <div className="header__message">Drag or select photo</div>
      </div>
      <div className="gallery mt-15">
        <div className="gallery__previews" ref={drop}>
          {files.map((file, index) => (
            <Preview key={index} file={file} id={index} />
          ))}
          <Dropzone />
        </div>
      </div>
      {error ? <div className="mt-15 error">{error}</div> : null}
      <Send />
    </>
  )
}

export default Gallery
