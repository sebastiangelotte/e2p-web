import React from 'react'
import Navigation from './navigation/navigation'
import Footer from './footer/footer'
import IdentityModal, { useIdentityContext } from 'react-netlify-identity-widget'
import 'react-netlify-identity-widget/styles.css'

import '../styles/main.scss'

const Layout = ({ children }) => {
  return (
    <div id="outer-container">
      <Navigation />
      <main id="page-wrap">
        {children}
        <Footer />
      </main>
    </div>
  )
}

export default Layout
