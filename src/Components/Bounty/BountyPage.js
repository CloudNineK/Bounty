import React, { useState, useEffect } from 'react'
import { Typography, Divider, CardMedia, Card} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root : {
    margin: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column'
  }, 
  subject : {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: 400
  },
  image: {
    width: '100%',
    height: 600
  },
  category: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  bounty : {
    margin: theme.spacing(3)
  },
  backers : {
    margin: theme.spacing(3)
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  }

}));

export default function BountyPage(props) {
  const loc = window.location.pathname;
  const id = loc.substring(loc.indexOf(':')+1,)

  const [details, useDetails] = useState({category: ''})
  const classes = useStyles();

  const update = id => {
    fetch(`/bounty?id=${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        Object.assign(details, data)
        useDetails(data)
      })
  }

  useEffect(() => {
    update(id)
  }, []);

  return (
    <div>
      <Card className={classes.root}>

        <Typography className={classes.subject} variant="h4">
          {details.subject}
        </Typography>

        <Typography color="primary" className={classes.category} variant="h6">
          <b>{details.category.toUpperCase()}</b>
        </Typography>

        <Divider/>

        <CardMedia
        className={classes.image}
        image='https://source.unsplash.com/random/900'/>


        <Typography className={classes.subject} variant="h6">
          {details.description}
        </Typography>


        <div className={classes.flex}>
          <Typography className={classes.bounty} color="primary" variant="h4">
            ${details.bounty}
          </Typography>

          <Typography className={classes.backers} color="textSecondary" variant="h4">
            {`${details.backers} people backing`}
          </Typography>

        </div>

      </Card>
    </div>
  )
}
