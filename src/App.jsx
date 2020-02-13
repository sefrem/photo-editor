import React from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Dash from "./Dash";

const App = () => {
	return (
		<div className="step_1">
			<div>STEP 1/3</div>
			<div>Drag or select photo</div>
			<DndProvider backend={Backend}>
				<Dash />
			</DndProvider>
		</div>
	);
};

export default App;
