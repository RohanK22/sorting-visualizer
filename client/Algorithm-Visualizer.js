import React from 'react';

class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array:[],
			width: 10,
		};
	}

	componentDidMount() {
		console.log('Made Component sortingVisualizer');
	}

	render() {
		return (<div id="sorting-visualizer">
				<div>
					This is a bar
				</div>	
			</div>
		);
	}
}

function randomNum(i) {
	return Math.floor(Math.random() * (i + 1));
}

