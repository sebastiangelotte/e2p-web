import React from 'react'
import { Link } from 'gatsby'

import { elastic as Menu } from 'react-burger-menu'

// import FirebaseContext from '../FirebaseContext'
// import SignOut from '../signOut'

const Navigation = () => {
    return (
        <div>
            {/* <FirebaseContext.Consumer>
                {({ authenticated }) => ( */}
                    <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                        <Link to="/">Hem</Link>
                        <Link to="/courses">Kurser</Link>
                        <Link to="/services">Tjänster</Link>
                        <Link to="/webinars">Webinars</Link>
                        <Link to="/account">Mitt konto</Link>
                        <Link to="/login">Logga in</Link>
                    </Menu>
                {/* )}
            </FirebaseContext.Consumer> */}
        </div>
    )
}

export default Navigation
