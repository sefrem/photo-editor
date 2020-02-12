import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
const store = require("store");

function Dash(props) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState([]);



    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: acceptedFiles => {
        setError("");
        if (files.length + acceptedFiles.length > 5) {
          return setError("Не больше 5 файлов");
        }
		acceptedFiles.map(file => console.log(file));
		
        // const images = [];
        // acceptedFiles.forEach(file => {
        //   let url = file.path;
        //   let preview = URL.createObjectURL(file);
        //   let image = {url: url, preview: preview}
        //   images.push(image)
        // })
        // store.set('images', JSON.stringify(images))

        setFiles(
          files.concat(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          )
        );

        console.log(files);
      }
    });

    //JSON { images: [{url: ‘’, preview: ‘’}] }

    const thumbs = files.map(file => (
      <div className="preview" key={file.name}>
        <div className="preview__thumb">
          <img src={file.preview} alt="" className="preview__img" />
        </div>
      </div>
    ));

    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      },
      [files]
    );

//   https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/


  return (
    <div className="dashboard">
      <div className="previews">
        {thumbs} 
         <div {...getRootProps({ className: "file-selection" })}>
          <input {...getInputProps()} /> 
        </div>
		<div>{error}</div>
      </div>
	</div>


  );
}

export default Dash;

