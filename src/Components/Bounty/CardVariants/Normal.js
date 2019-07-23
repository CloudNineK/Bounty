import React, { useState, useEffect } from 'react';

import { Card, Typography, CardMedia, CardContent, CardActionArea, Grid, Fade, 
  CardHeader, Avatar, CardActions, IconButton} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

const useStyle = makeStyles(theme => ({
  date: {
    marginLeft: 'auto',
    marginRight: theme.spacing()
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 
  },
}));

function Normal(props) {
  const styles = useStyle();
  const { details } = props;

  const [fade, useFade] = useState(false)
  const [bgUrl, useBgUrl] = useState('')

  useEffect(() => {
    fetch(`https://source.unsplash.com/random/${Math.floor(Math.random()*100) + 300}x${Math.floor(Math.random()*100) + 300}`)
      .then(resp => {
        useBgUrl(resp.url)
        useFade(true)
      });
  }, []);

  return (
    <Grid item xs={12} md={3}> 

      <Fade in={fade} timeout={2000}>
        <Card>

          <CardHeader
            avatar={<Avatar>{details.user.charAt(0).toUpperCase()}</Avatar>}
            action={<IconButton><MoreVertIcon/></IconButton>}
            title = {details.subject}
            titleTypographyProps = {{color: 'primary'}}
            subheader = 'Some Date, 2019'
          />

          <CardActionArea
            onClick={() => props.history.push(`/Bounty:${details.id}`)}
          >
            <CardMedia
              className={styles.media}
              image={bgUrl}
              title="Lorem"
            />

            <CardContent>
              <Typography component="p">
                {details.description}
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
              className={styles.date}>
              <i>N days ago</i>
            </Typography>

          </CardActions>

        </Card>
      </Fade>
    </Grid>
  )
}

export default withRouter(Normal)