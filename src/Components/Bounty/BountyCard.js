import React from 'react';
import { Card, Typography, CardMedia, CardContent, CardActionArea, Grid, Fade, CardHeader, Avatar, CardActions, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  card: {
    // minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    margin: theme.spacing.unit,
  },
  grow: {
    display: 'inline-block',
    flexGrow: 1,
  },
  date: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 
  },
  inline: {
  },
  pos: {
    marginBottom: 12,
  },

});

class BountyCard extends React.Component {
  constructor() {
    super();
    this.state = { 
      subject: '',
      description: '', 
      userName: '',
      bounty: 0,
      image: '',

      fade: false,
      bgUrl: '',
    };
  }


  render() {
    const { classes, userName, subject, description, bounty } = this.props;

    let normal = (
      <Grid item xs={12} md={3}> 
        <Fade in={this.state.fadeIn} timeout={2000}>
          <Card className={classes.card}>

            <CardHeader
              avatar={<Avatar>{userName.charAt(0).toUpperCase()}</Avatar>}
              action={<IconButton><MoreVertIcon/></IconButton>}
              title = {subject}
              titleTypographyProps = {{color: 'primary'}}
              subheader = 'Some Date, 2019'
            />

            <CardActionArea>

              <CardMedia
                className={classes.media}
                image={this.state.image}
                title="Lorem"
              />

              <CardContent>
                <Typography component="p">
                  {description}
                </Typography>
              </CardContent>

            </CardActionArea>

            <CardActions>

              <IconButton>
                <FavoriteIcon/>
              </IconButton>

              <IconButton>
                <ShareIcon/>
              </IconButton>

              <Typography align='right' color='textSecondary' 
                className={classes.date}>
                <i>N days ago</i>
              </Typography>

            </CardActions>

          </Card>
        </Fade>
      </Grid>
    )

    return (
      <>
        {normal}
      </>
    );

  }

  componentDidMount() {
    fetch(`https://picsum.photos/${Math.floor(Math.random()*100) + 300}`)
      .then(resp => {
        this.setState({ 
          image: resp.url,
          fadeIn: true});
      })
  }
}

export default withStyles(styles)(BountyCard);
