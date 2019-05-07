import React from 'react'

import Layout from '../components/layout'
import SignIn from '../components/SignIn'
import Head from '../components/head'

const LogIn = () => {
    return ( 
        <Layout>
            <Head title="Logga in" />
            <div className="courses">
                <div className="background--white">
                    <section className="section section--extra-top-padding">
                    <div className="heading">
                        <h1 className="heading__headline">Logga in</h1>
                        <span className="heading__text"><p>Logga in för att få tillgång till ditt personliga material.</p></span>
                    </div>
                    </section>
                </div>
                <div className="background--white-light">
                    <section className="section">
                    <div className="section__column">
                        <section className="section section--no-vertical-padding">
                            <div className="courses-list">
                                <SignIn />
                            </div>
                        </section>
                    </div>
                    </section>
                </div>
                <div className="background--blue">
                    <section className="section section--grid section--center-content">
                    <div className="section__column">
                        <div className="pitch pitch--centered pitch--inverted">
                        <h2 className="pitch__heading">
                            Easy2perform – vi vill göra det enklare att prestera i yrkesrollen!
                        </h2>
                        <p className="pitch__text">
                            Vi som jobbar med Easy2perform fokuserar på att ge stöd och vägledning till företag, chefer och medarbetare. Oavsett om det sker genom våra gratislösningar på mobil &amp; webb, kurser eller konsulttjänster, levererar vi kunskap som gör det enklare att
                            prestera i yrkesrollen.
                        </p>
                        </div>
                    </div>
                    </section>
                </div>
            </div>
        </Layout>
    )
}
 
export default LogIn
