import React from 'react';

const NUMBER_OF_LIST_ITEMS = 5;
const BAR_WIDTH  = 10;
const MAX_BAR_HEIGHT = 20;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        let l = [];
        for(let i=0; i<NUMBER_OF_LIST_ITEMS; i++) {
            l.push(randomNum(20));
        }
        this.state = {
            list: l,
            width: 10,
            number:5,
        }
    }
    
    render() {
        let bars = this.state.list.map()
        return (
            <div className="SortingVisualizer">
                {this.state.list}
            </div>
        )
    }
    
}


function randomNum(i) {
    return Math.floor(Math.random() * (i+1));
}
