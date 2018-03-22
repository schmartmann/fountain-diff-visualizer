import React, { Component } from 'react';
import '../stylesheets/Style.css';
import Differ from '../components/Differ.js';

var loadDiff = function( repo, base, head, token ) {
  fetch(
    `https://api.github.com/repos/schmartmann/${ repo }/compare/${ base }...${ head }?access_token=${ token }`,
    {
      headers: { 'accept': 'application/vnd.github.v3+json'},
      method: 'GET'
    }
  )
  .then( response => response.json() )
  .then( response => {
    return response;
  } )
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      githubToken: null,
      currentDiff: null
    };
  };
  componentWillMount() {
    var token = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
    this.setState( { githubToken: token } );
  };
  componentDidMount() {
    if ( this.state.githubToken ) {
      var currentDiff = loadDiff( 'trivia', 'master', 'feature/add-git-diff-tool', this.state.githubToken );
      this.setState( { currentDiff: currentDiff } );
    };
  }
  render() {
    return (
      <div className="App">
        <Differ githubToken={ this.state.githubToken } currentDiff = { this.state.currentDiff }/>
      </div>
    );
  }
}

export default App;
