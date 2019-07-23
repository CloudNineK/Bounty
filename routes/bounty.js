const express = require('express');
let router = express.Router();

const serviceAccount = require('./service-account.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bounty-crowd-app.firebaseio.com"
});

const db = admin.firestore();
const bounties = db.collection('bounties');

// router.get('/all', async (_, res) => {
//   const allBounties = await bounties.get();
//   console.log('proc')
//   res.status(200).json(allBounties.docs.map(
//     doc => ({created: doc.createTime.toDate,...doc.data()})
//   ));
// });

router.get('/all', async (_, res) => {
  const allBounties = await bounties.get();
  res.status(200).json(allBounties.docs.map(
    doc => (doc.id)
  ));
});

router.get('/', async (req, res) => {
  if (!req.query.id) {
    res.status(400);
    console.log("no ID")
  }

  console.log(req.query.id)
  const bountyRef = bounties.doc(req.query.id)
  let _ = bountyRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such doc');
        res.status(400);
      } else {
        console.log(doc.createTime.toDate())
        res.status(200).json({created: doc.createTime,...doc.data()});
      }
    })
    .catch(err => {
      console.log(`Error getting doc`, err)
    })
});

router.get('/random', async (_, res) => {
  const b = await bounties.get();
  const doc = b.docs[0]
  res.status(200).json({created: doc.createTime.toDate,...doc.data()})
});

router.post('/add', async (req, res) => {
  let data = {
    ...req.body,
    backers: 0
  }

  let doc = await bounties.add(data);
  res.status(200).send({id: doc.id, ...data});
});

module.exports = router