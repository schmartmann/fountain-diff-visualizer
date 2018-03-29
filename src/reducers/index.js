import { CombineReducers } from 'redux';

const defaultAuthState = {
  loggedIn: false,
  token: null,
  user: null
}

function auth( state = defaultAuthState, action ) {
  switch( action.type ) {
    case 'UPDATE_TOKEN':
      return {
        ...state
      };
    default:
      return state
  }
}

const RootReducer = CombineReducers( {
  auth: auth
} );

export default RootReducer;
