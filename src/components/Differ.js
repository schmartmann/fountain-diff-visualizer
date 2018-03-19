import React, { Component } from 'react';

class Differ extends Component {
  constructor() {
    super(); 
    this.state = {
      diff: []
    };
    this.renderDiffs = this.renderDiffs.bind( this );
  };
  componentDidMount() {
    this.loadDiff( 'trivia', 'master', 'feature/test-changes' );
  }
  loadDiff( repo, base, head ) {
    fetch(
      `https://api.github.com/repos/schmartmann/${ repo }/compare/${ base }...${ head }?access_token=${ this.props.githubToken }`,
      {
        headers: { 'accept': 'application/vnd.github.v3+json'},
        method: 'GET'
      }
    )
    .then( response => response.json() )
    .then( response => {
      this.updateDiff( response );
    } )
  };
  updateDiff( response ) {
    var files = response.files;
    this.setState( { diff: files } );
  };
  renderDiffs() {
    var diff = this.state.diff;
    return diff.map( diffs => {
      return (
        <div key={ diffs.sha }>
          { diffs.patch }
        </div>
      )
    } )
  }
  render() {
    return (
      <div className="Differ">
        { this.renderDiffs() }
      </div>
    )
  }
};

export default Differ;
