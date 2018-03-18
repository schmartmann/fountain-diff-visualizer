import React, { Component } from 'react';
import '../stylesheets/Style.css';
import Differ from '../actions/Differ.js';
import Drag from '../actions/Drag.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  };
  printDiff() {
    var str = Differ();
    return(
      <div>
        <h1>{ str }</h1>
        <Drag/>
     </div>
    )
  }
  render() {
    return (
      <div className="App">
        { this.printDiff() }
      </div>
    );
  }
}

export default App;
