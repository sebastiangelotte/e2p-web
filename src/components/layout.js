import React, { Component } from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'

import '../styles/main.scss'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../firebaseConfig'

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
