import React, { useRef, useContext, useEffect } from 'react'
import { StoreContext } from '../../utils/store'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import ButtonGroup from './ButtonGroup/ButtonGroup'
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

  // const headerUpdate = () => {
  //   const selectedTool = editorRef.current.getInstance().ui.submenu;
  //   switch (selectedTool) {
  //     case 'crop':
  //       setEditorHeader('Crop image')
  //       break
  //     case 'rotate':
  //       setEditorHeader('Rotate image')
  //       break
  //     case 'draw':
  //       setEditorHeader('Draw a line')
  //       break
  //     default:
  //   }
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

//   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//   svg.innerHTML = <svg className="icon-crop" width="57" height="56" viewBox="0 0 57 56" fill="none" 
//   xmlns="http://www.w3.org/2000/svg">
//   <path d="M7.54098 0V7.34426H0V13.2459H7.54098V41.1148C7.54098 45.2459 10.9508 48.6557 15.082 48.6557H42.7541V56H48.6557V48.6557H56.1967V42.7541H48.6557V14.8852C48.6557 10.7541 45.2459 7.34426 41.1148 7.34426H13.4426V0H7.54098ZM41.1148 13.2459C42.0328 13.2459 42.7541 13.9672 42.7541 14.8852V42.7541H15.082C14.1639 42.7541 13.4426 42.0328 13.4426 41.1148V13.2459H41.1148Z" fill="white"/>
// </svg>

  useEffect(() => {
    // headerUpdate();
    // editorRef.current.getInstance().ui
    const crop = document.getElementById('tie-btn-crop')
    const rotate = document.getElementById('tie-btn-rotate')
    const draw = document.getElementById('tie-btn-draw')
    // const cropIcon = document.getElementById('icon-b-ic-crop')
    // crop.appendChild(svg)
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
