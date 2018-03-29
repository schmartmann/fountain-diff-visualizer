// import { parse } from 'url';
import { requestGithubToken } from '../actions';
const eletron = window.require( 'electron' );
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;


export function authGithub( dispatch ) {
  //build oauth page url
  var options = {
    client_id: process.env.REACT_APP_CLIENT_ID || 'your_client_id',
    client_secret: process.env.REACT_APP_CLIENT_SECRET || 'your_client_secret',
    scopes: [ "user:email", "notifications" ]
  };

  let authWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: false
    }
  } )

  var githubUrl = 'https://github.com/login/oauth/authorize?';
  var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;

  authWindow.loadURL( authUrl );
  authWindow.show();

  function handleCallback( url ) {
    console.log( "asdfasdfasdfafd" )
    var rawCode = /code=([^&]*)/.exec( url ) || null,
        code = ( rawCode && rawCode.length > 1 ) ? rawCode[ 1 ] : null,
        error = /\?error=(.+)&/.exec( url );

    if ( code ||  error ) {
      // close BrowserWindow if code found or error
      authWindow.destroy();
    }

    // If there is a code, get token from GitHub
    if ( code ) {
      console.log( code )
      dispatch( requestGithubToken( options, code ) );
    } else if ( error ) {
      alert( 'Oops! Something went wrong and we couldn\'t' +
        'log you in using GitHub. Please try again.'
      );
    }
  }

  authWindow.webContents.on( 'will-navigate', function( event, url ) {
    handleCallback( url, options );
  } )

  authWindow.webContents.on( 'did-get-redirect-request', function( event, oldUrl, newUrl ) {
    handleCallback( newUrl, options );
  } )

  authWindow.on( 'close', function() {
    authWindow = null;
  }, false )
};
