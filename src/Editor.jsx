import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
// import ImageEditor from '@toast-ui/react-image-editor'
var ImageEditor = require('tui-image-editor')

const Editor = props => {
  const { files, id } = props
  const path = files[id].preview
  const name = files[id].name

  var imageEditor = new ImageEditor(
    document.querySelector('#tui-image-editor'),
    {
      includeUI: {
        loadImage: {
          path: `${path}`,
          name: `${name}`,
        },
      },
      menu: ['crop', 'rotate', 'draw'],
      initMenu: 'crop',
      uiSize: {
        width: '375px',
        height: '810px',
      },
      menuBarPosition: 'bottom',

      cssMaxHeight: 420,
      cssMaxWidth: 335,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    }
  )

  return <></>
}

export default Editor
