import React, { Component } from 'react';
import '../stylesheets/Style.css';
import Differ from '../components/Differ.js';


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
      this.loadDiff( 'trivia', '9704fae0418c783e0ae10fdfa2ea88d8b97986a3', 'ac9a2c7dc9a7a85f64ef4b051ae463a65b742d6c', this.state.githubToken );
    };
  }
  loadDiff( repo, base, head, token ) {
    fetch(
      `https://api.github.com/repos/schmartmann/${ repo }/compare/${ base }...${ head }?access_token=${ token }`,
      {
        headers: { 'accept': 'application/vnd.github.v3+json'},
        method: 'GET'
      }
    )
    .then( response => response.json() )
    .then( response => {
      debugger
      this.setState( { currentDiff: response } );
    } )
  };
  render() {
    return (
      <div className="App">
        <Differ githubToken={ this.state.githubToken } currentDiff = { this.state.currentDiff }/>
      </div>
    );
  }
}

export default App;
