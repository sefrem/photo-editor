import React, { useContext } from 'react'
import { StoreContext } from '../../utils/store'
import { useDrop } from 'react-dnd'
import Dropzone from '../Dropzone/Dropzone'
import Preview from '../Preview/Preview'
import Header from '../Header/Header'

const Dashboard = () => {
  const {
    filesStore: [files],
    errorStore: [error],
  } = useContext(StoreContext)

  const [, drop] = useDrop({ accept: 'preview' })

  return (
    <>
      <Header />
      <div className="dashboard mt-15">
        <div className="dashboard__previews" ref={drop}>
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

export default Dashboard
