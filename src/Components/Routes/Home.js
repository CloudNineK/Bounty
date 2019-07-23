import React from 'react';
import CardDisplay from '../Bounty/CardDisplay'
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider, Typography} from '@material-ui/core';
import { brown } from '@material-ui/core/colors'
import BCard from '../Bounty/BCard';


const styles = theme => ({
  button: {
    margin: theme.spacing(),
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    marginTop: theme.spacing(),
    display: 'flex'
  },
  pad: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  main: {
    display: 'flex',
    margin: theme.spacing(2),
    alignItems: 'stretch',
    height: 500
  },
  featured: {
    flexGrow: 7,
    minWidth: 140,
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  recommended: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 3,
    minWidth: 60,
    marginLeft: theme.spacing(2)
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
            <BCard id='3qiVYfoDTcs3QbnQ45PN' variant='Featured'/>
          </div>

          {/* Recommended Bounties */}
          <div className={classes.recommended}>
            <Typography variant='h5' color='primary'>
              Trending
            </Typography>
            <BCard id='3qiVYfoDTcs3QbnQ45PN' variant='Recommended'/>
            <BCard id='3qiVYfoDTcs3QbnQ45PN' variant='Recommended'/>
            <BCard id='3qiVYfoDTcs3QbnQ45PN' variant='Recommended'/>
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
