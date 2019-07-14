import React from "react"
import { Link } from "gatsby"

const Navigation = () => {
  return (
    <div>
      <div>
        <Link to="/">Hem</Link>
        <Link to="/courses">Kurser</Link>
        <Link to="/services">Tjänster</Link>
        <Link to="/tools">Verktyg</Link>
        <Link to="/webinars">Webinars</Link>
        <Link to="/account">Mitt konto</Link>
      </div>
    </div>
  )
}

export default Navigation
