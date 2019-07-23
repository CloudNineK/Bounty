import React, { useState } from 'react';

import { Paper, Grid, Button, Typography, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../actions/userAction'

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px ${theme.spacing(3)}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),  },
  submit: {
    marginTop: theme.spacing(3),
  },
  createAcc: {
    marginTop: theme.spacing(3),
    width: '100%',
    display: 'block'
  },
  center: {
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    padding: theme.spacing(3),
  },
  block: {
    display: 'inline-block'
  },
  vertCenter:  {
    width: '30%',
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden'
  },
  smallButton: {
    fontSize: 10,
  },
  gridCenter: {
    textAlign: 'center'
  }
}));

export default function LoginForm(props) {
  const [isLogin, toggleLogin] = useState(false);
  const [email, useEmail] = useState('');
  const [pass, usePass] = useState('');

  const firebase = useSelector(state => state.firebaseApp);
  const providers = useSelector(state => state.providers);
  const dispatch = useDispatch();

  const classes = useStyles();

  const googleAuth = () => {
    firebase.auth().signInWithPopup(providers.googleProvider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token)
        // The signed-in user info.
        var user = result.user;
        dispatch(updateUser(user))
        console.log(user)
      })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
  }

  return (
    <div className={classes.main}>
      <Paper className={classes.vertCenter}>

        <div className={classes.center}>
          <Typography color="primary" variant="h5">
            {(isLogin ? <b>Log In</b> : <b>Sign Up</b>)}
          </Typography>
        </div>

        <div className={classes.column}>

          <TextField
            id="Email"
            label="Email Address"
            margin="normal"
            fullWidth
            onChange={e => useEmail(e.target.value)}
          />

          <TextField
            id="Password"
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            onChange={e => usePass(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => console.log('nothing')}
            className={classes.submit}>
            Sign in
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={googleAuth}
            className={classes.submit}>
            Google
          </Button>

          <Grid container spacing={3}>

            <Grid item xs={5}>
            </Grid>

            <Grid item xs={7}>
              <div className={classes.gridCenter}>
                <Typography 
                  display='block' 
                  variant="caption"
                  color="textSecondary"
                  className={classes.createAcc}>
                  Don't have an account? </Typography>
                <Button
                  type="submit"
                  color="primary"
                  onClick={() => {
                    if (isLogin) {toggleLogin(false)}
                    else {toggleLogin(true)}
                  }}
                  className={classes.smallButton}>
                  Sign up </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  )
}
