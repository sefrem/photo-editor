import React from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
// import ImageEditor from '@toast-ui/react-image-editor'
var ImageEditor = require('tui-image-editor');

const Editor = props => {
  // imageEditor.addImageObject('path/fileName.jpg').then(objectProps => {
  //     console.log(ojectProps.id);
  // });
  const { files, id } = props
  const path = files[id].preview
  const name = files[id].name


var imageEditor = new ImageEditor(document.querySelector('#tui-image-editor'), {
//   includeUI: {
//     loadImage: {
//       path: `${path}`,
//       name: `${name}`
//     }},
//     menu: ['crop', 'rotate', 'draw'],
//     undo: false,
//     initMenu: 'crop',
//     uiSize: {
//         width: '375px',
//         height: '810px'
//     },
//     // menuBarPosition: 'bottom'
//   },
  cssMaxWidth: 375,
  cssMaxHeight: 500,
  selectionStyle: {
    cornerSize: 20,
    rotatingPointOffset: 70
  }
});
// let image;
// let str = path.substring(path.indexOf('h'))
// let file = new File(str, name)

// imageEditor.loadImageFromURL(path, 'FilterImage');


// instance.crop(instance.getCropzoneRect())

  return (
    <>
      {/* <ImageEditor
        includeUI={{
          loadImage: {
            path: `${path}`,
            name: `${name}`,
          },
          menu: ['crop', 'rotate', 'draw'],
          initMenu: 'crop',
          uiSize: {
            width: '375px',
            height: '810px',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={420}
        cssMaxWidth={335}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
      /> */}
      {/* {image} */}
      <button>Skip</button>
      <button>Save</button>
    </>
  )
}

export default Editor
