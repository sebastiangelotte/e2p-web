import React from 'react'

const Footer = () => {
    return (
    <footer className="footer">
        <section className="section section--grid">
                <div className="section__column section__column--2">
                    <ul className="footer__menu">
                        <li><a href="/home/services">Tjänster</a></li>
                        <li><a href="/courses">Kurser</a></li>
                        <li><a href="/home/about">Om Easy2Perform</a></li>
                    </ul>
                </div>
                <div className="section__column section__column--6">
                    <ul className="footer__menu">
                        <li><a href="/account/register">Skapa konto</a></li>
                        <li><a href="/account/login">Logga in</a></li>
                    </ul>
                </div>
            <div className="section__column section__column--4">
                <h3>Läs vårt nyhetsbrev!</h3>
                <p>Anmäl dig till vårt nyhetsbrev för smarta checklistor, enkla råd &amp; tips.</p>
            </div>
        </section>
    </footer>
    )
}

export default Footer
