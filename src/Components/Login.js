import React from 'react';
import { Paper, Grid, Button, Typography, TextField} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from './Firebase'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  createAcc: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    display: 'block'
  },
  center: {
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    padding: theme.spacing.unit * 3,
  },
  block: {
    display: 'inline-block'
  },
  vertCenter:  {
    width: '20%',
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
});

class Login extends React.Component {
  constructor() {
    super();
    this.state = { 
      isLogin: true,
      userName: null,
      password: null,
    };
  }

  onChangeUsername(e) {
    this.setState({userName: e.target.value});
  }
  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  onLogin() {
    this.props.firebase.initUI()
  }

  onSignUp() {
    // handle empty forms
    if (this.state.userName === null || this.state.password === null) {
      alert('Username and Password Required');
      return;
    }

    let user = {
      name: this.state.userName,
      password: this.state.password,
    }

    fetch('/auth/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)})
      .then(resp => {
        if (resp.status === 200) {
          resp.json()
            .then(resp => {
              this.props.handleClose()
            })
          }
      })
      console.log('authed')
  }

  toggle() {
    this.setState({isLogin: !this.state.isLogin})
  }

  render() {
    const { classes } = this.props;

    let login = (
      <Paper className={classes.vertCenter}>

        <div className={classes.center}>
          <Typography color="primary" variant="h5">
            {(this.state.isLogin ? <b>Log In</b> : <b>Sign Up</b>)}
          </Typography>
        </div>

        <div className={classes.column}>

        <TextField
          id="UserName"
          label="Username"
          margin="normal"
          fullWidth
          onChange={this.onChangeUsername.bind(this)}
        />

        <TextField
          id="Password"
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          onChange={this.onChangePassword.bind(this)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={this.onLogin.bind(this)}
          className={classes.submit}>
          Sign in
        </Button>

        <Grid container spacing={24}>

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
                onClick={this.toggle.bind(this)}
                className={classes.smallButton}>
                Sign up </Button>
            </div>
          </Grid>
        </Grid>

        </div>
      </Paper>
    );

    return (
      <div className={classes.main}>
        {login}
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default withStyles(styles)(withFirebase(Login));