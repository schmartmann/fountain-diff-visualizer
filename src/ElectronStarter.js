const electron = require( 'electron' );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = require( 'electron' );
const Datastore = require( 'nedb' );
const db = new Datastore();

const path = require( 'path' );
const url = require( 'url' );

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      show: false,
      'node-integration': true
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
} )

app.on( 'activate', function() {
  if ( mainWindow === null ) {
    createWindow()
  }
} );
