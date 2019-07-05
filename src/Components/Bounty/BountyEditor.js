import React from 'react';
import { Dialog, Button, TextField, } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

// TODO: Make this a responsive full screen component where the paper
//       is scrollable

const styles = theme => ({
  main: {
    margin: theme.spacing(3),
    width: '80%',
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    padding: '10%',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  bounty: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    maxWidth: '30%',
  },
  button: { 
    margin: theme.spacing(),
  },
});

class FavorEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      description: '',
      user: '',
      bounty: 0 
    };
  }

  onChangeSubject = (e) => {
    this.setState({subject: e.target.value});
  }

  onChangeDescription = (e) => {
    this.setState({description: e.target.value});
  }

  onChangeBounty = (e) => {
    this.setState({bounty: e.target.value});
  }

  submit = () => {
    if (this.state.subject === '' || this.state.password === '') {
      alert('Username and Password Required');
      return;
    }

    let data = {
      user: this.props.userName,
      subject: this.state.subject,
      description: this.state.description,
      bounty: this.state.bounty,
    }

    fetch('/api/bounties/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(this.props.update())
    .then(this.props.close())

  }

  render() {
    const { classes, isOpen, close} = this.props;

    return (
        <Dialog fullWidth disableAutoFocus={true}
          open={isOpen} onClose={close}>
            <TextField
              required
              className={classes.textField}
              id="Subject"
              label="Subject"
              margin="normal"
              onChange={this.onChangeSubject.bind(this)}
            />

            <TextField
              required
              className={classes.textField}
              id="Description"
              label="Description"
              margin="normal"
              fullWidth
              multiline
              rows='6'
              variant='outlined'
              onChange={this.onChangeDescription.bind(this)}
            />

            <TextField
              required
              className={classes.bounty}
              id="Bounty"
              label="Bounty"
              margin="normal"
              variant='outlined'
              type="number"
              onChange={this.onChangeBounty.bind(this)}
            />

            <div align='right'>
            <Button
              className={classes.button}
              color="primary"
              onClick={this.submit}
            >
              Submit
            </Button>
            </div>
        </Dialog>
    );
  }

  componentDidMount() {
  }
}

export default withStyles(styles)(FavorEditor);