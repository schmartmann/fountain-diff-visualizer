const electron = require( 'electron' );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require( 'path' );
const url = require( 'url' );

let mainWindow;
let authWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 600
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

function createAuthWindow() {
  authWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      show: false,
      'node-integration': false
    }
  );

  var githubUrl = 'https://github.com/login/oauth/authorize?';
  var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;

  authWindow.loadUrl( authUrl );
  authWindow.show();

  function handleCallback( url ) {
    var options = {
      client_id: process.env.REACT_APP_CLIENT_ID || 'your_client_id',
      client_secret: process.env.REACT_APP_CLIENT_SECRET || 'your_client_secret',
      scopes: [ "user:email", "notifications" ]
    };

    var rawCode = /code=([^&]*)/.exec(newUrl) || null,
        code = ( rawCode && rawCode.length > 1 ) ? rawCode[ 1 ] : null,
        error = /\?error=(.+)&/.exec( newUrl );

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
    apiRequests
      .post( 'https://github.com/login/oauth/access_token', {
        client_id: options.client_id,
        client_secret: options.client_secret,
        code: code
      } )
      .end( function( err, response ) {
        if ( response && response.ok ) {
          // success -- received token
          // store in local storage?
          window.localStorage.setItem( 'githubtoken', response.body.access_token );
        } else {
          //error
          console.log( err );
        }
      } )
  }

  authWindow.webContents.on( 'will-navigate', function( event, url ) {
    handleCallback( url );
  } )

  authWindow.webContents.on( 'did-get-redirect-request', function( event, oldUrl, newUrl ) {
    handleCallback( newUrl );
  } )

  authWindow.on( 'close', function() {
    authWindow = null;
  }, false )
}


app.on( 'ready', createWindow );
app.on( 'window-all-closed', function() {
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
} );

app.on( 'activate', function() {
  if ( mainWindow === null ) {
    createWindow()
  }
} );
