import React, { useContext } from 'react'
import { StoreContext } from '../../../utils/store'
import classNames from 'classnames'
import Button from '../../UI/Button'
const store = require('store')

const Send = () => {
  const {
    filesStore: [files],
  } = useContext(StoreContext)

  const addToLocalStorage = () => {
    const images = []
    files.forEach(file => {
      let url = file.path
      let preview = URL.createObjectURL(file)
      let image = { url: url, preview: preview }
      images.push(image)
    })
    store.set('images', JSON.stringify(images))
    console.log('Added to LocalStorage')
  }

  return (
    <Button
      onClick={addToLocalStorage}
      className={classNames('mt-15 send', { 'send_disabled': !files.length })}
      value="Send"
      disabled={files.length ? false : true}
    />
  )
}

export default Send
