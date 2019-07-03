const express = require('express');
const serviceAccount = require('./service-account.json.js');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('firebase/auth')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://web-dev-a6.firebaseio.com'
});

const db = admin.firestore();
const bounties = db.collection('bounties');


app.post('/auth/signUp', async (req, res) => {
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

app.post('/auth/logIn', async (req, res) => {
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


// BOUNTIES
app.get('/api/bounties/all', async (_, res) => {
  const allBounties = await bounties.get();
  res.status(200).json(allBounties.docs.map(
    doc => ({created: doc.createTime.toDate,...doc.data()})
  ));
});

app.get('/api/bounties/random', async (_, res) => {
  const b = await bounties.get();
  const doc = b.docs[0]
  res.status(200).json({created: doc.createTime.toDate,...doc.data()})
});

app.post('/api/bounties/add', async (req, res) => {
  let doc = await bounties.add(req.body);
  res.status(200).send({id: doc.id, ...req.body});
});

app.listen(port, () => console.log(`Listening on port ${port}`));