import React, { useRef, useContext, useEffect } from 'react'
import { StoreContext } from '../../utils/store'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Header from '../UI/Header'
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
    filesStore: [files],
    selectedIdStore: [id],
    editorHeaderStore: [editorHeader, setEditorHeader],
  } = useContext(StoreContext)

  const path = files[id].preview
  const name = files[id].name
  const editorRef = useRef(null)

  // const onObject = e => {
  //   console.log(e)
  // }

  const callback = mutationList => {
    mutationList.forEach(mutation => {
      if (mutation.type === 'attributes') {
        if (mutation.target.classList.contains('active')) {
          let targetName = mutation.target.id.substring(
            mutation.target.id.lastIndexOf('-') + 1
          )
          switch (targetName) {
            case 'crop':
              setEditorHeader('Crop image')
              break
            case 'rotate':
              setEditorHeader('Rotate image')
              break
            case 'draw':
              setEditorHeader('Draw a line')
              break
            default:
          }
        } else {
          setEditorHeader('Crop, rotate or draw')
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
      <Header messageText={editorHeader} className="editor__header" />
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
        // onObjectActivated={onObject}
      />
      <ButtonGroup editorRef={editorRef} />
    </div>
  )
}

export default Editor
