import React from 'react';

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="Toolbar">
                <div className="ToolbarItem">
                    <div className="ToolbarTitle">
                        SortingVisualizer
                    </div>
                </div>
                <div className="ToolbarItem">
                    <button type="button" className="ToolBarItem" onClick={() => {
                        this.props.changeState("bubble", false);
                    }}>Bubble Sort</button>
                </div>
                <div className="ToolbarItem">
                    Selected: {this.props.selectedMenu}
                </div>
                
            </div>
        );
    }
}

export default ToolBar;