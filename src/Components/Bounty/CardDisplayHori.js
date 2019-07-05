import React from 'react';
import BCard from './BCard'
import BFab from './BFab';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  main: {
    margin: theme.spacing(3),
  },
});

class CardDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
  }

  update() {
    let cards = [];
    fetch('/api/bounties/all', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        // add cards from response to array
        data.forEach(
          data => cards.push(<BCard 
            subject={data.subject}
            description={data.description}
            userName={data.user}
            bounty={data.bounty}
            key={data.userName+data.subject}/>)
        )
        // set card array as state
        this.setState({cards: cards});
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Grid container spacing={3}>
          {this.state.cards}
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this.update();
  }
}

export default withStyles(styles)(CardDisplay);
