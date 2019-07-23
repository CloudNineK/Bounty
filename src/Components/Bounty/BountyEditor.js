import React, { useState } from 'react';
import { Dialog, DialogContent, Button, TextField, DialogTitle, FormControl, 
  MenuItem, Select, InputLabel} from '@material-ui/core'
import { makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    padding: '10%',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    display: 'flex'
  },
  bounty: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    maxWidth: '30%',
  },
  button: { 
    margin: theme.spacing(),
  },
}));


export default function BountyEditor(props) {
  const [values, useValues] = useState({
    subject: '',
    description: '',
    user: '',
    bounty: 0,
    category: ''
  });

  const submit = () => {

    fetch('/api/bounties/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(values)
    })
    .then(props.close())
  }

  const handleChange = event => {
    useValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values)
  }

  const { isOpen, close } = props;
  const classes = useStyles();

  return (
      <Dialog fullWidth disableAutoFocus={true}
        open={isOpen} onClose={close} className={classes.main}>

          <DialogTitle>
            Create a Bounty
          </DialogTitle>

          <DialogContent dividers>

          <TextField
            required
            className={classes.textField}
            name='subject'
            id="Subject"
            label="Subject"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            required
            className={classes.textField}
            id="Description"
            name="description"
            label="Description"
            margin="normal"
            multiline
            rows='6'
            variant='outlined'
            onChange={handleChange}
          />

          <FormControl fullWidth className={classes.textField}>
            <InputLabel> Category</InputLabel>
            <Select
              value={values.category}
              onChange={handleChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"Crafts"}>Crafts</MenuItem>
              <MenuItem value={"Gaming"}>Gaming</MenuItem>
              <MenuItem value={"Art"}>Arts</MenuItem>
              <MenuItem value={"Music"}>Music</MenuItem>
              <MenuItem value={"Misc."}>Misc.</MenuItem>
            </Select>
          </FormControl>


          <TextField
            required
            className={classes.bounty}
            id="Bounty"
            name="bounty"
            label="Bounty"
            margin="normal"
            variant='outlined'
            type="number"
            onChange={handleChange}
          />

        </DialogContent>

          <div align='right'>
          <Button
            className={classes.button}
            color="primary"
            onClick={submit}
          >
            Submit
          </Button>
          </div>
      </Dialog>
  );
}
