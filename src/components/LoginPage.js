import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');
import { authGithub } from '../utils/Helpers';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {}

    this.handleClick = this.handleClick.bind( this );
  };
  handleClick( e ) {
    console.log( ipcRenderer.sendSync( 'synchronous-message', 'auth' ) )
    ipcRenderer.on( 'asynchronous-reply', ( event, arg ) => {
      console.log( arg )
    } )
    ipcRenderer.send( 'asynchronous-reply', 'ping' )
  }
  render() {
    return(
      <div className="Oauth">
        <h1 onClick={ this.handleClick }>You need to log in</h1>
      </div>
    )
  }
};

export default Oauth;
