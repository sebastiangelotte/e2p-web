import React from 'react'
import { Link } from 'gatsby'

import { elastic as Menu } from 'react-burger-menu'

const Navigation = () => {
    return (
        <div>
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                <Link to="/">Hem</Link>
                <Link to="/courses">Kurser</Link>
                <Link to="/services">Tjänster</Link>
                <Link to="/tools">Verktyg</Link>
                <Link to="/webinars">Webinars</Link>
                <Link to="/account">Mitt konto</Link>
            </Menu>
        </div>
    )
}

export default Navigation
