import React from 'react'
import { Link } from 'gatsby'

import { elastic as Menu } from 'react-burger-menu'

import FirebaseContext from '../FirebaseContext'
import SignOut from '../signOut'

const Navigation = () => {
    return (
        <div>
            <FirebaseContext.Consumer>
                {({ authenticated }) => (
                    <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                        <Link to="/">Hem</Link>
                        <Link to="/courses">Kurser</Link>
                        <Link to="/services">Tjänster</Link>
                        <Link to="/webinars">Webinars</Link>
                        <Link to="/account">Mitt konto</Link>
                        <Link to="/login">Logga in</Link>
                    </Menu>
                )}
            </FirebaseContext.Consumer>
        </div>
        // <div className="section section--no-vertical-padding">
        //     <ul className="navigation">
        //         <li>
        //             <Link to="/"><img alt="Hem" className="navigation__logo" src="/logo.svg" /></Link>
        //         </li>
        //         <li>
        //             <Link to="/courses">Kurser</Link>
        //         </li>
        //         <li>
        //             <Link to="/services">Tjänster</Link>
        //         </li>
        //         <li>
        //             <Link to="/login">Logga in</Link>
        //         </li>
        //         <li>
        //             <SignOut />
        //         </li>
        //     </ul>
        // </div>
    )
}

export default Navigation
