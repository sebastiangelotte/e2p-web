import React, { Component } from 'react'
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

function signIn() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken
    console.log(result)
  })
}


class Layout extends Component {
  render() {
    return (
      <div id="outer-container">
      <Navigation />
      <main id="page-wrap">
        <button onClick={signIn}>Logga in</button>
        {this.props.children}
        <Footer />
      </main>
    </div>
    )
  }
}

export default Layout
