import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => {
    return (
        <div className="section section--no-vertical-padding">
            <ul className="navigation">
                <li>
                    <Link to="/"><img alt="Hem" className="navigation__logo" src="/logo.svg" /></Link>
                </li>
                <li>
                    <Link to="/courses">Kurser</Link>
                </li>
                <li>
                    <Link to="/services">Tjänster</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation
