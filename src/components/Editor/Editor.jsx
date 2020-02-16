import React, { useRef, useContext } from 'react'
import { StoreContext } from '../../utils/store'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
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
  } = useContext(StoreContext)

  const path = files[id].preview
  const name = files[id].name
  const editorRef = useRef(null)

  // const onObject = e => {
  //   console.log(e)
  // }

  return (
    <>
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
    </>
  )
}

export default Editor
