import React from 'react';
import {Avatar, Button, Modal} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face';
import Login from './Login.js'
import { withStyles } from '@material-ui/core/styles'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary[500]
  }
});

class UserBarIndicator extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    const {
      handleLoginOpen, handleLoginClose, 
      handleLogin, handleLogout,
      loginOpen, showUser,
      name, classes
    } = this.props;

    const { user, signOut, signInWithGoogle, } = this.props;

    let loginModal =
      <>
        <Button 
          color="inherit"
          onClick={handleLoginOpen}>
          Login
        </Button>

        <Modal
          open={loginOpen}
          onClose={handleLoginClose}>
          <Login 
          google={signInWithGoogle}
          handleLogin={handleLogin}
          handleClose={handleLoginClose}/>
        </Modal>
      </>

    let userButton =
      <>
      <Avatar className={classes.avatar}>
        <FaceIcon/>
      </Avatar>
      <Button 
        color="inherit"
        onClick={handleLogout}>
        Logout
      </Button>
      </>

    return (showUser ? loginModal : userButton);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default withStyles(styles) (
  withFirebaseAuth({
    providers,
    firebaseAppAuth,}) (UserBarIndicator)
  );