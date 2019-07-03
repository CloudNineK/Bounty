import React from 'react';
import { Card, CardMedia, Fade, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  card: {
    display: 'flex',
    margin: theme.spacing.unit*2,
    flex: 1,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    width: 151,
    flexShrink: 0,
  },
  content: {
    flex: 1
  },
  description: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },
 
});

class Recommended extends React.Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      description: '', 
      userName: '',
      bounty: 0,
      bgUrl: '',
      fade: false
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
      <Fade in={this.state.fadeIn} timeout={2000}>
        <Card className={classes.card}>

          <CardMedia
            className={classes.img}
            image={this.state.bgUrl}/>

          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6">
                {this.state.subject}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" 
                className={classes.description}>
                {this.state.description}
              </Typography>
            </CardContent>
          </div>

        </Card>
      </Fade>
    );

  }

  componentDidMount() {
    this.randBounty();
    fetch(`https://picsum.photos/${500+Math.floor(Math.random()*100)}`)
      .then(resp => {
        this.setState({ 
          bgUrl: resp.url,
          fadeIn: true});
      })
  }
}

export default withStyles(styles)(Recommended);
