const electron = require( 'electron' );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = require( 'electron' );

const path = require( 'path' );
const url = require( 'url' );

let mainWindow;
let authWindow;

function loadAuthWindow() {
  authWindow = mainWindow;

  var options = {
    client_id: process.env.REACT_APP_CLIENT_ID || 'your_client_id',
    client_secret: process.env.REACT_APP_CLIENT_SECRET || 'your_client_secret',
    scopes: [ "user:email", "notifications" ]
  };

  var githubUrl = 'https://github.com/login/oauth/authorize?';
  var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;

  authWindow.loadURL( authUrl );
  authWindow.show();

  function handleCallback( url ) {
    var rawCode = /code=([^&]*)/.exec( url ) || null,
        code = ( rawCode && rawCode.length > 1 ) ? rawCode[ 1 ] : null,
        error = /\?error=(.+)&/.exec( url );

    if ( code || error ) {
      // close BrowserWindow if code found or error
      authWindow.destroy();
    }

    // If there is a code, get token from GitHub
    if ( code ) {
      self.requestGithubToken( options, code );
    } else if ( error ) {
      alert( 'Oops! Something went wrong and we couldn\'t' +
        'log you in using GitHub. Please try again.'
      );
    }
  }

  function requestGithubToken( options, code ) {
    Object.assign( options, code );

    fetch( 'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        body: JSON.stringify( options )
      }
    )
    .then( response => response.json() )
    .then( response => {
        //success - received token
        console.log( response );
        window.localStorage.setItem( 'githubtoken', response.body.access_token )
        reloadMain();
    } )
    .catch( error => console.log( error ))
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

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      // show: false,
      // 'node-integration': false,
    }
  );

  const startUrl = process.env.ELECTRON_START_URL || url.format(
    {
      pathname: path.join(__dirname, '/../build/index.html' ),
      protocol: 'file:',
      slashes: true
    }
  );

  mainWindow.loadURL( startUrl );
  mainWindow.webContents.openDevTools();

  mainWindow.on( 'closed', function() {
    mainWindow = null
  } )
};

function reloadMain() {
  const startUrl = process.env.ELECTRON_START_URL || url.format(
    {
      pathname: path.join(__dirname, '/../build/index.html' ),
      protocol: 'file:',
      slashes: true
    }
  );

  mainWindow.loadURL( startUrl );
}


app.on( 'ready', createWindow );
app.on( 'window-all-closed', function() {
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
} );

ipcMain.on( 'synchronous-message', ( event, arg ) => {
  console.log( arg );
  event.returnValue = 'auth';
  loadAuthWindow();
} )

app.on( 'activate', function() {
  if ( mainWindow === null ) {
    createWindow()
  }
} );
