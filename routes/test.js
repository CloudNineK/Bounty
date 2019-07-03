const serviceAccount = require('./service-account.json');
const admin = require('firebase-admin');
const casual = require('casual');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://web-dev-a6.firebaseio.com'
});

const db = admin.firestore();

const users = db.collection('users');
const bounties = db.collection('bounties');


const addBounty = async () => {
  let card = {
    user: casual.first_name,
    subject: casual.title,
    description: casual.text,
    bounty: Math.floor(Math.random()*300)
  }
  let doc = await bounties.add(card)
  console.log(doc.id)
}

let i;
for (i = 0; i < 3; i++) {
  addBounty();
}