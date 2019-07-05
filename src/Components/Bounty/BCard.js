import React, { useState, useEffect } from 'react';

import { Card, Typography, CardMedia, CardContent, CardActionArea, Grid, Fade, 
  CardHeader, Avatar, CardActions, IconButton, Paper } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { makeStyles } from '@material-ui/core/styles';
import { grey} from '@material-ui/core/colors'


const normalStyle = makeStyles(theme => ({
  date: {
    marginLeft: 'auto',
    marginRight: theme.spacing()
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 
  },
}));

const featuredStyle = makeStyles(theme => ({
  main: {
    backgroundImage: 'url(https://picsum.photos/1600/900)',
    backgroundSize: 'cover',
    margin: theme.spacing(2),
    flex: 1,
  },
  gradient: {
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.2) 70%, #1c1c1c)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  textContainer: {
    marginTop: 'auto',
  },
  mainText: {
    color: grey[50],
    margin: theme.spacing(3),
  }, 
}));

const jumboStyle = makeStyles(theme => ({
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

const recommendedStyle = makeStyles(theme => ({
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


let init = {
  subject: '',
  description: '', 
  user: '',
  created: '',
  bounty: 0,
  image: '',
}

function BCard(props) {

  const [details, useDetails] = useState(init)
  const [fade, useFade] = useState(false)
  const [bgUrl, useBgUrl] = useState('')

  let nStyle = normalStyle()
  let jStyle = jumboStyle()
  let rStyle =  recommendedStyle()
  let fStyle = featuredStyle()

  let normal = (

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

          <CardActionArea>
            <CardMedia
              className={nStyle.media}
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
              className={nStyle.date}>
              <i>N days ago</i>
            </Typography>

          </CardActions>

        </Card>
      </Fade>
    </Grid>
  );

  let jumbo = (
    <Grid item xs={12}>
      <Fade in={true} timeout={2000}>
        <Card className={jStyle.card}>

          <CardMedia
            className={jStyle.media}
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

            <Typography align='right' color='textSecondary' className={jStyle.author}>
              <b>{details.user}</b>
            </Typography>

            <Typography align='right' color='textSecondary' className={jStyle.author}>
              <i>{details.bounty}</i>
            </Typography>

            <Typography align='right' color='textSecondary' className={jStyle.author}>
              <i>N days ago</i>
            </Typography>
          </CardContent>

        </Card>
      </Fade>
    </Grid>
  );

  let featured = (
    <Fade in={fade} timeout={2000}>
      <Paper className={fStyle.main}>
        <div className={fStyle.gradient}>
          <div className={fStyle.textContainer}>
            <Typography variant='h3' className={fStyle.mainText}>
              {details.subject}
            </Typography>
            <Typography variant='h5' className={fStyle.mainText}>
              {details.description}
            </Typography>
          </div>
        </div>
      </Paper>
    </Fade>
  );

  let recommended = (
    <Fade in={fade} timeout={2000}>
      <Card className={rStyle.card}>

        <CardMedia
          className={rStyle.img}
          image={bgUrl}/>

        <div className={rStyle.details}>
          <CardContent className={rStyle.content}>
            <Typography variant="h6">
              {details.subject}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" 
              className={rStyle.description}>
              {details.description}
            </Typography>
          </CardContent>
        </div>

      </Card>
    </Fade>
  );

  const variants = {
    'Jumbo': jumbo,
    'Recommended': recommended,
    'Featured': featured,
  }

  let variant = props.variant ? variants[props.variant] : normal

  let update = id => {
    fetch(`/bounty?id=${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        Object.assign(details, data)
        useDetails(data)
        useFade(true);
      })
  }

  // fix this mess
  useEffect(() => {
    if (bgUrl === '') {
      fetch(`https://source.unsplash.com/random/${Math.floor(Math.random()*100) + 300}x${Math.floor(Math.random()*100) + 300}`)
        .then(resp => {
          update(props.id)
          useBgUrl(resp.url);
        });
    }
  });

  return (
    <>
      {variant}
    </>
  );
  
}

export default BCard;
