import React from 'react';
import BountyEditor from './BountyEditor';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Dialog} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
});

class BountyFab extends React.Component {
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

  render() {
    const { classes, update} = this.props;

    return (
      <>
        <Fab onClick={this.handleFabOpen} color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>

        <BountyEditor 
          close={this.handleFabClose}
          userName={"USN from Cookie"}
          isOpen={this.state.editorIsOpen} 
          update={update}/>
      </>
    );
  }

  componentDidMount() {
  }
}

export default withStyles(styles)(BountyFab);
