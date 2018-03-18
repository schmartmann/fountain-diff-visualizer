const { ipcMain } = require( 'electron' );

export default function Renderer() {

  ipcMain.on( 'asynchronous-message', ( e, arg ) => {
    console.log( arg );
    e.sender.send( 'asynchronous-reply', 'pong' )
  } );

  ipcMain.on( 'synchronous-message', ( e, arg ) => {
    console.log( arg );
    e.returnValue = 'pong';
  } )

  return ipcMain;
}


