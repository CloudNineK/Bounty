import React from 'react';
import Featured from './Bounty/Featured'
import Recommended from './Bounty/Recommended'
import CardDisplay from './Bounty/CardDisplay'
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider, Typography} from '@material-ui/core';
import { brown } from '@material-ui/core/colors'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    marginTop: theme.spacing.unit,
    display: 'flex'
  },
  pad: {
    marginLeft: theme.spacing.unit*3,
    marginRight: theme.spacing.unit*3,
  },
  main: {
    display: 'flex',
    margin: theme.spacing.unit * 2,
    alignItems: 'stretch',
    height: 500
  },
  featured: {
    flexGrow: 7,
    minWidth: 140,
    marginRight: theme.spacing.unit*2,
    display: 'flex',
    flexDirection: 'column',
  },
  recommended: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 3,
    minWidth: 60,
    marginLeft: theme.spacing.unit*2
  },
  mainText: {
    textColor: brown[500],
  },

});

class Landing extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    const { classes } = this.props
    const cats = ['Technology', 'Crafts', 'Gaming', 
                  'Art', 'Music', 'Misc.']
    const buttons = cats.map((label) => (
      <Button color="primary" className={classes.button} key={label}>
        {label}
      </Button>
    ));

    return (
      <div className={classes.pad}>
        <div className={classes.header}>
          {buttons}
        </div>

        <Divider variant='middle'/>

        {/* Topline */}
        <div className={classes.main}>
          {/* Featured Bounty */}
          <div className={classes.featured}>
            <Typography variant='h5' color='primary'>
              Featured 
            </Typography>
            <Featured/>
          </div>

          {/* Recommended Bounties */}
          <div className={classes.recommended}>
            <Typography variant='h5' color='primary'>
              Trending
            </Typography>
            <Recommended/>
            <Recommended/>
            <Recommended/>
          </div>
        </div>

        <Divider variant='middle'/>

        <CardDisplay />

      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default withStyles(styles)(Landing);
