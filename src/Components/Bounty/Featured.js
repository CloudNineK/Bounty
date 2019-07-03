import React from 'react';
import { Fade, Paper, Typography } from '@material-ui/core';
import { grey} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  main: {
    backgroundImage: 'url(https://picsum.photos/1600/900)',
    backgroundSize: 'cover',
    margin: theme.spacing.unit*2,
    flex: 1,
  },
  gradient: {
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.2) 70%, #1c1c1c)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  textContainer: {
    marginTop: 'auto',
  },
  mainText: {
    color: grey[50],
    margin: theme.spacing.unit*3,
  }, 
});

class Featured extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      description: '', 
      userName: '',
      bounty: 0,
      fade: true,
      bgUrl: ''
  }
}

  randBounty() {
    return fetch('/api/bounties/random', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        this.setState({
            subject: data.subject,
            description: data.description,
            userName: data.user,
            bounty: data.bounty})
        })
    }

  render() {
    const { classes } = this.props;

    return (
      <Fade in={this.state.fade} timeout={2000}>
        <Paper className={classes.main}>
          <div className={classes.gradient}>
            <div className={classes.textContainer}>
              <Typography variant='h3' className={classes.mainText}>
                {this.state.subject}
              </Typography>
              <Typography variant='h5' className={classes.mainText}>
                {this.state.description}
              </Typography>
            </div>
          </div>
        </Paper>
      </Fade>
    );

  }

  componentDidMount() {
    this.randBounty();
    fetch('https://picsum.photos/1600/900}')
      .then(resp => {
        this.setState({ 
          bgUrl: resp.url,
          fadeIn: true});
      })
  }
}

export default withStyles(styles)(Featured);
