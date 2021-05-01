import React from 'react';

const NUMBER_OF_LIST_ITEMS = 50;
const PADDING = 1;
const BAR_WIDTH = window.innerWidth / NUMBER_OF_LIST_ITEMS - 2 * PADDING;
const MAX_BAR_HEIGHT = window.innerHeight / 1.5;

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		let l = [];
		for (let i = 0; i < NUMBER_OF_LIST_ITEMS; i++) {
			l.push(randomNum(MAX_BAR_HEIGHT));
		}
		this.state = {
			list: l,
			selectedMenu: null,
		};
		this.generateRandomNumbers = this.generateRandomNumbers.bind(this);
		this.changeMenu = this.changeMenu.bind(this);
		this.generateRandomNumbers = this.generateRandomNumbers.bind(this);
		this.bubbleSort = this.bubbleSort.bind(this);
		this.insertionSort = this.insertionSort.bind(this);
		this.selectionSort = this.selectionSort.bind(this);
		this.partition = this.partition.bind(this);
		this.quickSort = this.quickSort.bind(this);
	}

	generateRandomNumbers() {
		let l = [];
		for (let i = 0; i < NUMBER_OF_LIST_ITEMS; i++) {
			l.push(randomNum(MAX_BAR_HEIGHT));
		}
		this.setState({ list: l });
	}

	async bubbleSort() {
		let l = this.state.list;
		const bars = document.getElementsByClassName('bar');
		let t;
		for (let i = 0; i < l.length; i++) {
			for (let j = 0; j < l.length - 1 - i; j++) {
				if (l[j] > l[j + 1]) {
					t = l[j];
					l[j] = l[j + 1];
					l[j + 1] = t;
				}
				bars[j + 1].style.backgroundColor = 'red';
				bars[j].style.backgroundColor = 'red';
				await timeout(0.1);
				bars[j + 1].style.backgroundColor = 'blue';
				bars[j].style.backgroundColor = 'blue';
				this.setState({ list: l });
			}
		}
		this.changeMenu('');
	}

	async insertionSort() {
		let l = this.state.list;
		const bars = document.getElementsByClassName('bar');
		let i, key, j;
		for (i = 1; i < l.length; i++) {
			key = l[i];
			j = i - 1;
			while (j >= 0 && l[j] > key) {
				// Animation
				bars[j + 1].style.backgroundColor = 'red';
				bars[j].style.backgroundColor = 'red';
				await timeout(0.1);
				bars[j + 1].style.backgroundColor = 'blue';
				bars[j].style.backgroundColor = 'blue';
				this.setState({ list: l });

				l[j + 1] = l[j];
				j--;
			}
			l[j + 1] = key;
		}
		this.changeMenu('');
	}

	async selectionSort() {
		let l = this.state.list;
		const bars = document.getElementsByClassName('bar');
		let i, j, min_idx, t;
		for (i = 0; i < l.length - 1; i++) {
			min_idx = i;
			for (j = i + 1; j < l.length; j++) {
				if (l[j] < l[min_idx]) min_idx = j;
				// Animation
				bars[j].style.backgroundColor = 'red';
				bars[i].style.backgroundColor = 'purple';
				await timeout(0.1);
				bars[j].style.backgroundColor = 'blue';
				bars[i].style.backgroundColor = 'blue';

				this.setState({ list: l });
			}
			t = l[min_idx];
			l[min_idx] = l[i];
			l[i] = t;
		}
		this.changeMenu('');
	}

	async partition(arr, l, h) {
		const bars = document.getElementsByClassName('bar');
		let x = arr[h];
		let i = l - 1;

		for (let k = l; k <= h; k++) {
			if (bars[k]) {
				bars[k].style.backgroundColor = 'green';
			}
		}
		await timeout(1000);
		for (let k = l; k <= h; k++) {
			if (bars[k]) {
				bars[k].style.backgroundColor = 'blue';
			}
		}

		for (let j = l; j <= h - 1; j++) {
			if (bars[j]) {
				bars[j].style.backgroundColor = 'red';
				await timeout(1);
				bars[j].style.backgroundColor = 'blue';
			}
			if (arr[j] < x) {
				i++;
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
			this.setState({ list: arr });
		}
		[arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];

		return i + 1;
	}

	async quickSort(A, l, h) {
		// Algorithm used can be found at https://www.geeksforgeeks.org/sorting-algorithm-visualization-quick-sort/
		console.log(A);
		if (l < h) {
			let p = await this.partition(A, l, h);
			await this.quickSort(A, l, p - 1);
			await this.quickSort(A, p + 1, h);
		}
	}

	async cocktailSort(A) {
		const bars = document.getElementsByClassName('bar');
		let len = A.length;
		let swapped = true;
		let start = 0;
		let end = len - 1;
		while (swapped === true) {
			swapped = false;
			for (let i = start; i < end; i++) {
				if (bars[i]) {
					this.setState({ list: A });
					bars[i].style.backgroundColor = 'red';
					await timeout(1);
					bars[i].style.backgroundColor = 'blue';
				}
				if (A[i] > A[i + 1]) {
					[A[i], A[i + 1]] = [A[i + 1], A[i]];
					swapped = true;
				}
			}
			if (!swapped) {
				break;
			}
			swapped = false;
			end = end - 1;
			for (let i = end - 1; i >= start; i--) {
				if (bars[i]) {
					this.setState({ list: A });
					bars[i].style.backgroundColor = 'red';
					await timeout(1);
					bars[i].style.backgroundColor = 'blue';
				}
				if (A[i] > A[i + 1]) {
					[A[i], A[i + 1]] = [A[i + 1], A[i]];
					swapped = true;
				}
			}
			start = start + 1;
		}
		this.changeMenu('');
	}

	changeMenu(s) {
		this.setState({ selectedMenu: s });
		this.render();
	}

	render() {
		let bars =
			Array.isArray(this.state.list) &&
			this.state.list.map((item, index) => {
				let divStyle = {
					height: item + 'px',
					margin: PADDING + 'px',
					width: BAR_WIDTH,
					background: 'blue',
					float: 'left',
					border: '1px',
					borderRadius: '10px',
				};
				return <div className="bar" style={divStyle} key={index}></div>;
			});
		return (
			<div className="SortingVisualizer">
				<div className="Toolbar">
					<div className="ToolbarItem">
						<div className="ToolbarTitle">SortingVisualizer</div>
					</div>
					<div className="ToolbarItem">
						<button
							type="button"
							className="ToolBarItem"
							onClick={() => {
								this.bubbleSort();
								this.changeMenu('bubble');
							}}
						>
							Bubble Sort
						</button>
					</div>
					<div className="ToolbarItem">
						<button
							type="button"
							className="ToolBarItem"
							onClick={() => {
								this.insertionSort();
								this.changeMenu('insertion');
							}}
						>
							Insertion Sort
						</button>
					</div>
					<div className="ToolbarItem">
						<button
							type="button"
							className="ToolBarItem"
							onClick={() => {
								this.selectionSort();
								this.changeMenu('selection');
							}}
						>
							Selection Sort
						</button>
					</div>

					<div className="ToolbarItem">
						<button
							type="button"
							className="ToolBarItem"
							onClick={() => {
								let copy = copyArr(this.state.list);
								this.quickSort(copy, 0, copy.length - 1);
								this.changeMenu('quick');
							}}
						>
							Quick Sort
						</button>
					</div>

					<div className="ToolbarItem">
						<button
							type="button"
							className="ToolBarItem"
							onClick={() => {
								let copy = copyArr(this.state.list);
								this.cocktailSort(copy);
								this.changeMenu('cocktail');
							}}
						>
							Cocktail Sort
						</button>
					</div>

					<div className="ToolbarItem">
						Selected: {this.state.selectedMenu}
					</div>
					<div className="ToolbarItem">
						<button
							type="button"
							className="ToolBarItem"
							onClick={() => {
								this.generateRandomNumbers();
							}}
						>
							Generate Array
						</button>
					</div>
				</div>
				<div className="bars">{bars}</div>
			</div>
		);
	}
}

function randomNum(i) {
	return Math.floor(Math.random() * (i + 1));
}

function timeout(delay) {
	return new Promise((res) => setTimeout(res, delay));
}

function copyArr(orig) {
	let copy = [];
	for (let i = 0; i < orig.length; i++) {
		copy[i] = orig[i];
	}
	return copy;
}
