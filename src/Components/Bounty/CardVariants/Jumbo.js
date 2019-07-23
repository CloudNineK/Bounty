import React, { useState, useEffect } from 'react';

import { Card, Typography, CardMedia, CardContent, Grid, Fade, 
  CardHeader, Avatar, } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  card: {
    // minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing()
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
}));

export default function Jumbo(props) {
  const styles = useStyle();
  const { details } = props;

  const [fade, useFade] = useState(false)
  const [bgUrl, useBgUrl] = useState('')

  useEffect(() => {
    fetch(`https://source.unsplash.com/random/900`)
      .then(resp => {
        useFade(true)
      });
  }, []);

  return (
    <Grid item xs={12}>
      <Fade in={fade} timeout={2000}>
        <Card className={styles.card}>

          <CardMedia
            className={styles.media}
            image="/images/vecArt.jpg"
            title="Temp Image"
          />

          <CardHeader
            avatar={<Avatar>{details.user.charAt(0).toUpperCase()}</Avatar>}
            title = {details.subject}
            titleTypographyProps = {{color: 'primary'}}
            subheader = 'Some Date, 2019'
          />

          <CardContent>
            <Typography component="p">
              {details.description}
            </Typography>

            <Typography align='right' color='textSecondary' className={styles.author}>
              <b>{details.user}</b>
            </Typography>

            <Typography align='right' color='textSecondary' className={styles.author}>
              <i>{details.bounty}</i>
            </Typography>

            <Typography align='right' color='textSecondary' className={styles.author}>
              <i>N days ago</i>
            </Typography>
          </CardContent>

        </Card>
      </Fade>
    </Grid>
  )
}
