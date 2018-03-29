import { parse } from 'url';

export function requestGithubToken( options, code ) {
  const options = Object.assign( options, code );

  return function( dispatch ) {
    return fetch( 'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        body: JSON.stringify( options ),
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
      .then( response => {
        dispatch( updateToken( response ) );
      } )
      .catch( message => dispatch( error( message ) ) );
  }
};

export function updateToken( response ) {
  return {
    type: 'UPDATE_TOKEN',
    data: response
  }
};

export function error( message ) {
  return {
    type: 'ERROR',
    data: message
  }
};
