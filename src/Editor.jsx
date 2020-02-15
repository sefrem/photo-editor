import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import update from 'immutability-helper'
// import 'tui-image-editor/dist/tui-image-editor.css'
// const ImageEditor = require('tui-image-editor')
const icona = require('tui-image-editor/dist/svg/icon-a.svg')
const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
const icond = require('tui-image-editor/dist/svg/icon-d.svg')
const blackTheme = {
  // main icons
  'menu.normalIcon.path': icond,
  'menu.activeIcon.path': iconb,
  'menu.disabledIcon.path': icona,
  'menu.hoverIcon.path': iconc,
}

class Editor extends React.Component {
  editorRef = React.createRef()

  handleClickButton = () => {
    const base64 = this.editorRef.current.getInstance().toDataURL()
    const blob = URL.createObjectURL(this.dataURItoBlob(base64))
    //  console.log(this.props.files[this.props.id].preview)
    console.log(blob)
    let newFiles = [...this.props.files]
    newFiles[this.props.id].preview = blob;
    this.props.setFiles(
      newFiles
    )
    
    //   update(this.props.files, {
    //     [this.props.id]: {
    //       ...this.props.files[this.props.id],
          
    //       'preview': {
    //         $set: blob
    //       }

    //     }
    //   }
    // )
    
    return blob
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab])
    return blob
  }

  render() {
    const { files, id } = this.props
    const path = files[id].preview
    const name = files[id].name

    return (
      <div>
        <ImageEditor
          ref={this.editorRef}
          includeUI={{
            loadImage: {
              path: `${path}`,
              name: `${name}`,
            },
            theme: blackTheme,
            menu: ['crop', 'rotate', 'draw'],
            initMenu: 'crop',
            uiSize: {
              width: '375px',
              height: '700px',
            },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={500}
          cssMaxWidth={375}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
        />
        <button onClick={this.handleClickButton}></button>
      </div>
    )
  }
}

export default Editor
