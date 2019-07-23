import React, { useState, useEffect } from 'react';

import { Typography, Fade, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey} from '@material-ui/core/colors'


const useStyle = makeStyles(theme => ({
  main: {
    backgroundImage: 'url(https://source.unsplash.com/random/900)',
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

export default function Featured(props) {
  const styles = useStyle();
  const { details } = props;

  const [fade, useFade] = useState(false)

  useEffect(() => {
    fetch(`https://source.unsplash.com/random/900`)
      .then(resp => {
        useFade(true)
      });
  }, []);

  return (
    <Fade in={fade} timeout={2000}>
      <Paper className={styles.main}>
        <div className={styles.gradient}>
          <div className={styles.textContainer}>
            <Typography variant='h3' className={styles.mainText}>
              {details.subject}
            </Typography>
            <Typography variant='h5' className={styles.mainText}>
              {details.description}
            </Typography>
          </div>
        </div>
      </Paper>
    </Fade>
  )
}
