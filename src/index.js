import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main'
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core/styles';
import { brown, deepPurple } from '@material-ui/core/colors/';

// Redux
import { combineReducers, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './reducers'

// Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';



// Firebase init
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


// Redux init
const storeEnhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  allReducers, 
  {
    user: null,
    firebaseApp: firebaseApp,
    firebaseAppAuth: firebaseAppAuth,
    providers: providers
  },
  storeEnhancers
);


const theme = createMuiTheme({
  palette: {
    primary: brown,
    secondary: deepPurple,
  },
  typography: {
    useNextVariants: true,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme = {theme}>
      <Main/>
    </MuiThemeProvider> 
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
