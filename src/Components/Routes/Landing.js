import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import { brown, grey } from '@material-ui/core/colors'
import BCard from '../Bounty/BCard'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  hide: {
    overflow: 'hidden',
  },
  root: {
    padding: '1%',
    height: '100%',
    width: '100%',
    background: brown[500],
    boxShadow: '0px 0px',
  },
  innerText: {
    padding: '5%',
    marginTop: '20%'
  },
  inner: {
    padding: '5%',
  },
  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
    padding: '2%',
    background: 'linear-gradient(45deg, #8D6B94, #D39EC7 70%)'
  },
  white: {
    color: grey[50], 
    marginBottom: '10%'
  },
  grey: {
    color: grey[300], 
    marginBottom: '10%'
  }
});

class Landing extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    const { classes, history } = this.props

    return (
      <div className={classes.hide}>
      <Paper className={classes.root} square={true}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <div className={classes.innerText}>
              <Typography variant='h2' className={classes.white}>
                A modern solution for reward based crowdfunding.
              </Typography>

              <Typography variant='h4' className={classes.grey}>
                Create, coordinate, and manage the crowdfunding of personal
                and community driven tasks.

              </Typography>

              <Button 
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => history.push('/Home')}>
                Explore
               </Button>
            </div>
          </Grid>

          <Grid item xs={7}>
            <div className={classes.inner}>
              <BCard id='Nz5Ukws8BHioDu7m7Xe5' variant='Jumbo'/>
            </div>
          </Grid>
        </Grid>
      </Paper>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default withRouter(withStyles(styles)(Landing));
