import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Dropzone from "./Dropzone";
import Preview from "./Preview";
import update from "immutability-helper";

const Dash = () => {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState([]);

	const moveFile = (id, atIndex) => {
		const { file, index } = findFile(id);
		// let draggedFile = files.splice(index, 1);

		// let newFiles = files.splice(atIndex, 0, ...draggedFile);
		setFiles(
			update(files, {
				$splice: [
					[index, 1],
					[atIndex, 0, ...file],
				],
			})
		);
	};

	const findFile = id => {
		const file = files.filter((file, index) => index === id);
		return {
			file,
			index: files.indexOf(file[0]),
		};
	};
	const [, drop] = useDrop({ accept: "preview" });
	return (
		<div className="dashboard">
			<div className="previews" ref={drop}>
				{files.map((file, index) => (
					<Preview
						id={index}
						key={file.name}
						file={file}
						index={index}
						files={files}
						setFiles={setFiles}
						moveFile={moveFile}
						findFile={findFile}
					/>
				))}
        
				<Dropzone files={files} setFiles={setFiles} setError={setError} />
			</div>
			<div>{error}</div>
		</div>
	);
};

export default Dash;
