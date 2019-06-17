import React from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'

import '../styles/main.scss'

const firebase = require("firebase/app")
require("firebase/auth")

if (typeof window !== 'undefined') {
  
  const firebaseConfig = {
    apiKey: 'AIzaSyAb0XyD6AgOfybvYqAE-pkS4sPyrMdqh38',
    authDomain: 'e2p-web.firebaseapp.com',
    databaseURL: 'https://e2p-web.firebaseio.com',
    projectId: 'e2p-web',
    storageBucket: 'e2p-web.appspot.com',
    messagingSenderId: '226326778642',
  }
  
  firebase.initializeApp(firebaseConfig)

  var provider = new firebase.auth.GoogleAuthProvider()

}

var token
var user = 'poo'

const signIn = () => {
  console.log(user)
  firebase.auth().signInWithPopup(provider).then(result => {
    token = result.credential.accessToken
    user = result.user
  }).catch(error => {
    console.error(error.code, error.message)
  })
  console.log(user)
}

const signOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('Loggedout!')
  }).catch(error => {
    console.error(error)
  })
}

const Layout = props => {
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
          : <button onClick={signIn}>Sign in with Google</button>
      }
      {props.children}
      <Footer />
    </main>
  </div>
  )
}

export default Layout
