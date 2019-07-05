import React from 'react';
import SideDrawer from './SideDrawer.js'
import {AppBar, Typography, IconButton, Toolbar, InputBase, ButtonBase,} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import UserBarIndicator from './UserBarIndicator.js';



const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    transition: '0.2s',
    marginRight: 20
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class Bar extends React.Component {

  constructor() {
    super();
    this.state = { 
      loginOpen: false,
      drawerOpen: false,
      user: {
        name: '',
        password: ''
      },
      name: '',
    };
  }

  handleLoginOpen = () => this.setState({loginOpen: true})
  handleLoginClose = () => this.setState({loginOpen: false})

  handleLogin = userObj => this.setState({user: userObj, name: userObj.name})
  handleLogout = () => this.setState({
    user: {
      name: '',
      password: ''
    }
  })

  openDrawer = () => this.setState({drawerOpen: true})
  closeDrawer= () => this.setState({drawerOpen: false})


  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.openDrawer}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>

            <ButtonBase
              onClick={() => history.push('/')}>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Bounty
            </Typography>
            </ButtonBase>

            <div className={classes.grow} />

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>

            <UserBarIndicator
              handleLoginOpen={this.handleLoginOpen.bind(this)}
              handleLoginClose={this.handleLoginClose.bind(this)}
              handleLogin={this.handleLogin.bind(this)}
              handleLogout={this.handleLogout.bind(this)}
              loginOpen={this.state.loginOpen}
              showUser={this.state.user.name === ''}
              name={this.state.name}/>

          </Toolbar>
        </AppBar>

        <SideDrawer isOpen={this.state.drawerOpen} close={this.closeDrawer.bind(this)}/>

      </div>
    );
  }

}

export default withStyles(styles) (Bar)