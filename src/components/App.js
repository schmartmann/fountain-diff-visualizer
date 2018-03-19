import React, { Component } from 'react';
import '../stylesheets/Style.css';
import Differ from '../components/Differ.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      githubToken: null
    };
  };
  componentWillMount() {
    var token = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
    this.setState( { githubToken: token } );
  };
  render() {
    return (
      <div className="App">
        <Differ githubToken={ this.state.githubToken }/>
      </div>
    );
  }
}

export default App;
