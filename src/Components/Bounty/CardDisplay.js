import React from 'react';
import BCard from './BCard'
import BFab from './BFab';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  main: {
    margin: theme.spacing(3),
  },
  fab: {
    margin: theme.spacing(),
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
});

class CardDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      editorIsOpen: false,
      cards: []
    };
  }

  handleFabOpen = () => {
    this.setState({editorIsOpen: true})
  };

  handleFabClose= () => {
    this.setState({editorIsOpen: false});
  }

  update() {
    let cards = [];
    fetch('/bounty/all', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        // add cards from response to array
        data.forEach(
          id => cards.push(
          <BCard 
            id={id}
            key={id}
            />)
        )
        // set card array as state
        this.setState({cards: cards});
      })
  }

  render() {
    const { classes } = this.props;

    let normal = (
      <div className={classes.main}>
        <Grid container spacing={3}>
          {this.state.cards}
        </Grid>

        <BFab update={this.update.bind(this)}/>
      </div>
    );

    return (
      normal
    );
  }

  componentDidMount() {
    this.update();
  }
}

export default withStyles(styles)(CardDisplay);
