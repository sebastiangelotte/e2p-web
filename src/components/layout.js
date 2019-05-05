import React from "react"
import '../styles/main.scss'

import Navigation from './navigation/navigation'
import Footer from './footer/footer'

const Layout = ({children}) => (
  <div>
    <Navigation />
    {children}
    <Footer />
  </div>
)

export default Layout
