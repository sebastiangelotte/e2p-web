// import React from "react"
// import '../styles/main.scss'

// import Navigation from './navigation/navigation'
// import Footer from './footer/footer'

// const Layout = ({children}) => (
//   <div>
//     <Navigation />
//     {children}
//     <Footer />
//   </div>
// )

// export default Layout


import React, { Component } from 'react'

import getFirebase from '../firebase'
import FirebaseContext from '../components/FirebaseContext'

import Navigation from './navigation/navigation'
import Footer from './footer/footer'

import '../styles/main.scss'

class Layout extends Component {
  state = {
    firebase: null,
    authenticated: false,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const database = import('firebase/database')

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0])
      this.setState({ firebase })

      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.setState({ authenticated: false })
        } else {
          this.setState({ authenticated: true })
        }
      })
    })
  }

  render = () => {
    // eslint-disable-next-line
    const { firebase, authenticated } = this.state

    if (!firebase) return null

    return (
      <FirebaseContext.Provider value={firebase}>
        <div id="outer-container">
          <Navigation />
          <main id="page-wrap">
            {/* {authenticated ? <h1>INLOGGAD!</h1> : <h1>UTLOGGAD!</h1>} */}
            {this.props.children}
            <Footer />
          </main>
        </div>
      </FirebaseContext.Provider>
    )
  }
}

export default Layout
