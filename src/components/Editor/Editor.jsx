import React, { useRef, useContext, useEffect } from 'react'
import { StoreContext } from '../../context/store'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import ButtonGroup from './ButtonGroup/ButtonGroup'
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

const Editor = () => {
  const {
    files: { files },
    selectedFileId: [selectedFileId],
    editorTitle: [editorTitle, setEditorTitle],
  } = useContext(StoreContext)

  const path = files[selectedFileId].preview
  const name = files[selectedFileId].name
  const editorRef = useRef(null)

  const callback = mutationList => {
    mutationList.forEach(mutation => {
      if (mutation.type === 'attributes') {
        if (mutation.target.classList.contains('active')) {
          let targetName = mutation.target.id.substring(
            mutation.target.id.lastIndexOf('-') + 1
          )
          switch (targetName) {
            case 'crop':
              setEditorTitle('Crop image')
              break
            case 'rotate':
              setEditorTitle('Rotate image')
              break
            case 'draw':
              setEditorTitle('Draw a line')
              break
            default:
          }
        } else {
          setEditorTitle('Crop, rotate or draw')
        }
      }
    })
  }
  const config = { attributes: true }
  const observer = new MutationObserver(callback)

  useEffect(() => {
    const crop = document.getElementById('tie-btn-crop')
    const rotate = document.getElementById('tie-btn-rotate')
    const draw = document.getElementById('tie-btn-draw')
    observer.observe(crop, config)
    observer.observe(rotate, config)
    observer.observe(draw, config)
    return () => {
      observer.disconnect(crop, config)
      observer.disconnect(rotate, config)
      observer.disconnect(draw, config)
    }
  })

  return (
    <div className="editor">
      <div className="editor__header">{editorTitle}</div>
      <ImageEditor
        ref={editorRef}
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
      <ButtonGroup editorRef={editorRef} />
    </div>
  )
}

export default Editor
