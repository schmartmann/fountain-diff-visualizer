import React, { Component } from 'react';
import '../stylesheets/Style.css';
import Differ from '../components/Differ.js';
import Drag from '../actions/Drag.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  };
  // printDiff() {
  //   var diff = Differ('develop', 'feature/add-git-diff-tool');
  //   if ( diff.files ) {
  //     debugger
  //     var files = diff.files;
  //     return files.map( file => {
  //       return(
  //         <div key={ file[ "sha" ] }>
  //           { file[ "patch" ] }
  //         </div>
  //       )
  //     } )
  //   }
  // };
  render() {
    return (
      <div className="App">
        <Differ/>
        <Drag/>
      </div>
    );
  }
}

export default App;
