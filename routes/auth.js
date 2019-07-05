const express = require('express');
let router = express.Router();

const serviceAccount = require('./service-account.json');
const admin = require('firebase-admin');
require('firebase/auth')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bounty-crowd-app.firebaseio.com"
}, 'auth');

router.post('/signUp', async (req, res) => {
  const email = req.body.name
  const pass = req.body.pass

  admin.auth().createUser({
      email: email,
      password: pass
  })
    .then(userRecord => {
      console.log('Created new user:', userRecord.id)
    })
    .catch(error =>{
      console.log(error.message)
    })

  res.status(200).json({conf: 'yes'})
});

router.post('/logIn', async (req, res) => {
  const email = req.body.name
  const pass = req.body.pass

  admin.auth().getUserByEmail(email)
    .then(userRecord => {
    })
    .catch(error =>{
      console.log(error.message)
      res.status(400)
    })

});

module.exports = router