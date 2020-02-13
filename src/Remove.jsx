import React from "react";

const Remove = props => {
	const { id, files, setFiles } = props;

	const remove = (id, files, setFiles) => {
		setFiles(files.filter((file, index) => index !== id));
	};

	const rm = () => remove(id, files, setFiles);

	return <div className="remove" onClick={rm}></div>;
};

export default Remove;
