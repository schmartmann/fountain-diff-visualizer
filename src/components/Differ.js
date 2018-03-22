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
    debugger
  }
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
