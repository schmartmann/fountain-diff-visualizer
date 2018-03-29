import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authGithub } from '../utils/Helpers';
const { ipcRenderer } = window.require('electron');

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {}

    this.handleClick = this.handleClick.bind( this );
  };
  handleClick( e ) {
    authGithub();
    // console.log( ipcRenderer.sendSync( 'synchronous-message', 'auth' ) )
    // ipcRenderer.on( 'asynchronous-reply', ( event, arg ) => {
    //   console.log( arg )
    // } )
    // ipcRenderer.send( 'asynchronous-reply', 'ping' )
  }
  render() {
    return(
      <div className="Oauth">
        <h1 onClick={ this.handleClick }>You need to log in</h1>
      </div>
    )
  }
};

function mapStateToProps( state, ownProps ) {
  return {
    user_auth: state.auth
  };
};

function mapDispatchToProps( dispatch, ownProps ) {
  return {
    authGithub: () => dispatch( authGithub() )
  }
};

export default connect( mapStateToProps, mapDispatchToProps)( LoginPage );
