import React from 'react';

const NUMBER_OF_LIST_ITEMS = 50;
const PADDING = 1;
const BAR_WIDTH  = window.innerWidth/NUMBER_OF_LIST_ITEMS - 2 * PADDING;
const MAX_BAR_HEIGHT = window.innerHeight / 1.5;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        let l = [];
        for(let i=0; i<NUMBER_OF_LIST_ITEMS; i++) {
            l.push(randomNum(MAX_BAR_HEIGHT));
        }
        this.state = {
            list: l,
            selectedMenu: null,
        }
        this.generateRandomNumbers = this.generateRandomNumbers.bind(this);
        this.changeMenu = this.changeMenu.bind(this);
        this.generateRandomNumbers = this.generateRandomNumbers.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
    }

    generateRandomNumbers() {
        let l = [];
        for(let i=0; i<NUMBER_OF_LIST_ITEMS; i++) {
            l.push(randomNum(MAX_BAR_HEIGHT));
        }
        this.setState({list:l});
    }

    async bubbleSort() {
        let l = this.state.list;
        const bars = document.getElementsByClassName("bar");
        let t;
        for(let i = 0; i< l.length; i++) {
            for(let j = 0; j< l.length - 1 - i; j++) {
                if(l[j] > l[j+1]) {
                    t = l[j];
                    l[j] = l[j+1];
                    l[j+1] = t;
                }
                bars[j+1].style.backgroundColor = 'red';
                bars[j].style.backgroundColor = 'red';
                await timeout(0.1);
                bars[j+1].style.backgroundColor = 'blue';
                bars[j].style.backgroundColor = 'blue';
                this.setState({list: l});
            }
        }  
    }

    async insertionSort() {
        let l = this.state.list;
        const bars = document.getElementsByClassName("bar");
        let t;
        for(let i = 0; i< l.length; i++) {
            for(let j = 0; j< l.length - 1 - i; j++) {
                if(l[j] > l[j+1]) {
                    t = l[j];
                    l[j] = l[j+1];
                    l[j+1] = t;
                    
                }
                bars[j+1].style.backgroundColor = 'red';
                bars[j].style.backgroundColor = 'red';
                await timeout(0.1);
                bars[j+1].style.backgroundColor = 'blue';
                bars[j].style.backgroundColor = 'blue';
                this.setState({list: l});
            }
        }  
    }

    changeMenu(s) {
        this.setState({selectedMenu: s});
        this.render();
    }

    render() {
        let bars = this.state.list.map((item, index) => {
            let divStyle = {
                height: item + "px",
                margin: PADDING + "px",
                width: BAR_WIDTH,
                background: 'blue',
                float: "left",
                border: "1px",
                "border-radius": "10px"
            };
            return (
                <div className="bar" style={divStyle} key={index}></div>
            );
        });
        return (
            <div className="SortingVisualizer">
                <div className="Toolbar">
                    <div className="ToolbarItem">
                        <div className="ToolbarTitle">
                            SortingVisualizer
                        </div>
                    </div>
                    <div className="ToolbarItem">
                        <button type="button" className="ToolBarItem" onClick={() => {
                            console.log("bubble");
                            this.bubbleSort();
                            this.changeMenu("bubble");
                        }}>Bubble Sort</button>
                    </div>
                    <div className="ToolbarItem">
                        Selected: {this.state.selectedMenu}
                    </div>
                    <div className="ToolbarItem">
                        <button type="button" className="ToolBarItem" onClick={() => {
                            this.generateRandomNumbers();
                        }}>Generate Array</button>
                    </div>
                    
                </div>
                {bars}
            </div>
        );
    }
    
}


function randomNum(i) {
    return Math.floor(Math.random() * (i+1));
}

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}
