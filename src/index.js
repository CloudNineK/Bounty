import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main'
import * as serviceWorker from './serviceWorker';

import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core/styles';
import { brown, deepPurple } from '@material-ui/core/colors/';


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
  <MuiThemeProvider theme = {theme}>
    <Main/>
  </MuiThemeProvider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
