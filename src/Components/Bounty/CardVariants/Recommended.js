import React, { useState, useEffect } from 'react';

import { Card, Typography, CardMedia, CardContent, CardActionArea, Fade, } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Featured from './Featured';

const useStyle = makeStyles(theme => ({
  card: {
    display: 'flex',
    margin: theme.spacing(2),
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
 
}));

function Recommended(props) {
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
    <Fade in={fade} timeout={2000}>
      <Card className={styles.card}>
        <CardMedia
          className={styles.img}
          image={bgUrl}/>

        <CardActionArea
          onClick={() => props.history.push(`/Bounty:${details.id}`)}>

          <div className={styles.details}>
            <CardContent className={styles.content}>
              <Typography variant="h6">
                {details.subject}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" 
                className={styles.description}>
                {details.description}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Fade>
  )
}

export default withRouter(Recommended)