import React, { Component } from 'react';
// import Renderer from './Renderer.js';

class Drag extends Component {
  constructor() {
    super();

    this.state = {
      drag: false
    };
    this.startDrag = this.startDrag.bind( this );
    this.endDrag =   this.endDrag.bind( this );
    this.dragLeave = this.dragLeave.bind( this );
    this.dragOver =  this.dragOver.bind( this );
    this.onDrop =    this.onDrop.bind( this );
  };
  startDrag( e ) {
    this.setState( { drag: true } );
  };
  endDrag( e ) {
    this.setState( { drag: false } );
  };
  dragLeave( e ) {
    this.setState( { drag: false } );
  };
  dragOver( e ) {
    this.setState( { drag: false } );
  };
  onDrop( e ) {
    this.setState( { drag: false } );
  };
  render() {
    return (
      <div>
        <a href="#"
          onDragStart={ this.startDrag }
          onDragEnd={ this.endDrag }
          onDrop={ this.onDrop }
          onDragLeave={ this.dragLeave }
          onDragOver={ this.dragOver }>
          item
        </a>
      </div>
    )
  }
};

export default Drag;
