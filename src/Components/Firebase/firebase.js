import app from 'firebase/app'
import 'firebaseui'
import 'firebase/auth'

var firebase = require('firebase');
var firebaseui = require('firebaseui');


const firebaseConfig = {
  apiKey: "AIzaSyBkaBHJAa21c832GhMtZgkQbUW1ahIwkD0",
  authDomain: "favor-ae1d2.firebaseapp.com",
  databaseURL: "https://favor-ae1d2.firebaseio.com",
  projectId: "favor-ae1d2",
  storageBucket: "favor-ae1d2.appspot.com",
  messagingSenderId: "1076971744330",
  appId: "1:1076971744330:web:e36189fdddfac848"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth()
  }

  initUi = () => {
    firebaseui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});
  }

}

export default Firebase