import SortingVisualizer from './SortingVisualizer';
import Toolbar from './Toolbar';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
            selectedMenu: null,
            finishedSorting: null,
      };
    
  }

  changeState(selectedM, finSort) {
    this.setState({selectedMenu: selectedM, finishedSorting: finSort});
    
  }

  render() {
    console.log("Re rendering with :" + this.state.selectedMenu);
    return (
      <div className="App">
        <Toolbar changeState={this.changeState.bind(this)} finishedSorting={this.state.finishedSorting} selectedMenu={this.state.selectedMenu}/>
        <SortingVisualizer selectedMenu={this.state.selectedMenu} finishedSorting={this.state.finishedSorting}/>
      </div>
    );
  }
}

export default App;
