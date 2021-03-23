import React from 'react';

const NUMBER_OF_LIST_ITEMS = 30;
const PADDING = 3;
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
        }
    }
    
    render() {
        let bars = this.state.list.map((item, index) => {
            let divStyle = {
                background: 'red',
                height: item + "px",
                margin: PADDING + "px",
                width: BAR_WIDTH,
                float: "left",
            };
            return (
                <div style={divStyle} key={index}></div>
            );
        });
        return (
            <div className="SortingVisualizer">
                {bars}
            </div>
        )
    }
    
}


function randomNum(i) {
    return Math.floor(Math.random() * (i+1));
}
