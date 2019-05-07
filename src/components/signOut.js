import React, { Component } from 'react'
import { withFirebase } from '../components/FirebaseContext'

class Signout extends Component {
  signOut = () => {
    this.props.firebase.auth().signOut()
  }
  render() {
    return (
      // eslint-disable-next-line
      <a href="#" onClick={this.signOut}>Logga ut</a>
    )
  }
}

export default withFirebase(Signout)
