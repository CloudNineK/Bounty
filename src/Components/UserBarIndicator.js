import React, { useState } from 'react';
import {Avatar, Button, Modal} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face';
import AuthForm from './AuthForm.js'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, } from 'react-redux'


const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary[500]
  }
}));

export default function UserBarIndicator(props) {
  const [modalState, useModal] = useState(false)

  const classes = useStyles();
  const user = useSelector(state => state.user);

    let loginModal =
      <>
        <Button 
          color="inherit"
          onClick={() => useModal(true)}>
          Login
        </Button>

        <Modal
          open={modalState}
          onClose={() => useModal(false)}>
          <AuthForm/>
        </Modal>
      </>

    let userButton =
        <Avatar 
          src={user == null ? 'none' : user.user.photoURL} 
          className={classes.avatar}/>

    return (user == null ? loginModal : userButton)
  }