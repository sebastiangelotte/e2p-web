import React, { Component } from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'

import '../styles/main.scss'

import withFirebaseAuth from 'react-with-firebase-auth'

var firebase = require("firebase/app")
require("firebase/auth")

const firebaseConfig = {
  apiKey: 'AIzaSyAb0XyD6AgOfybvYqAE-pkS4sPyrMdqh38',
  authDomain: 'e2p-web.firebaseapp.com',
  databaseURL: 'https://e2p-web.firebaseio.com',
  projectId: 'e2p-web',
  storageBucket: 'e2p-web.appspot.com',
  messagingSenderId: '226326778642',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

class Layout extends Component {

  render = () => {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props

    return (
      <div id="outer-container">
        <Navigation />
        <main id="page-wrap">
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }
          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
          {this.props.children}
          <Footer />
        </main>
      </div>
    )
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Layout);
