import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, 
         Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  title: {
    padding: '5%'
  },
  menuItem: {
    fontWeight: 'bold'
  },
}));


function SideDrawer(props) {

    const { history, close } = props;

    const classes = useStyles();

    const drawerList = (
      <div className={classes.list}>
        <div className = {classes.title}>
          <Typography 
            variant='h4' 
            color="textSecondary">
            Bounty
          </Typography>
          <Typography 
            variant='subtitle1' 
            color="textSecondary">
            <i>Some tagline here...</i>
          </Typography>
        </div>

        <Divider/>

        <List>
          <ListItem button key='Home' 
            onClick={() => {history.push('/Home'); close()}}>
            <ListItemText 
              primary='Home'/>
          </ListItem>
          <ListItem button key='My Bounties' 
            onClick={() => {history.push('/Bounties'); close()}}>
            <ListItemText 
              primary='My Bounties'/>
          </ListItem>
        </List>

      </div>
    );

    return (
        <Drawer 
          open={props.isOpen}
          onClose={props.close}>
          {drawerList}
        </Drawer>
    )

}

export default withRouter(SideDrawer);
