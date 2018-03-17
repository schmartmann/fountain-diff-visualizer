import React, { Component } from 'react';
import logo from '../logo.svg';
import '../stylesheets/Style.css';
import Differ from './Differ.js';

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
