import React from 'react';
import { Card, Typography, CardContent, Grid, Fade, CardHeader, Avatar, CardMedia } from '@material-ui/core';
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
  grow: {
    display: 'inline-block',
    flexGrow: 1,
  },
  inline: {
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

});

class BountyCard extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    const { classes, userName, subject, description, bounty } = this.props;

    return (
      <Grid item xs={12}>
        <Fade in={true} timeout={2000}>
          <Card className={classes.card}>

            <CardMedia
              className={classes.media}
              image="/images/vecArt.jpg"
              title="Temp Image"
            />

            <CardHeader
              avatar={<Avatar>{userName.charAt(0).toUpperCase()}</Avatar>}
              title = {subject}
              titleTypographyProps = {{color: 'primary'}}
              subheader = 'Some Date, 2019'
            />

            <CardContent>
              <Typography component="p">
                {description}
              </Typography>

              <Typography align='right' color='textSecondary' className={classes.author}>
                <b>{userName}</b>
              </Typography>

              <Typography align='right' color='textSecondary' className={classes.author}>
                <i>{bounty}</i>
              </Typography>

              <Typography align='right' color='textSecondary' className={classes.author}>
                <i>N days ago</i>
              </Typography>
            </CardContent>

          </Card>
        </Fade>
      </Grid>
    );

  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default withStyles(styles)(BountyCard);
