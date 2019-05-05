import React from "react"
import { graphql, useStaticQuery } from 'gatsby'

import Layout from "../components/layout"
import Head from '../components/head'
import HomepageSection from '../components/homepage-section/homepageSection'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulHomepageSection {
        edges {
          node {
            heading
            buttonText
            buttonLink
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Startsida" />
      {data.allContentfulHomepageSection.edges.map((edge) => {
        return <HomepageSection data={edge.node} />
      })}
      <div className="startpage">
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
            <section className="section section--grid section--no-top-padding">
                <div className="section__column">
                    <a href="#tools" className="card">
                        <i className="card__icon fas fa-arrow-right"></i>
                        <h3 className="card__heading">
                            Praktiska checklistor &amp; mallar
                        </h3>
                        <p className="card__text">
                            Effektiv vägledning i det dagliga arbetet. Gratis.
                        </p>
                        <button className="card__button">
                            <i className="fas fa-list-ul"></i> Läs mer
                        </button>
                    </a>
                </div>
                <div className="section__column">
                    <a href="/courses" className="card">
                        <i className="card__icon fas fa-arrow-right"></i>
                        <h3 className="card__heading">
                            Öppna &amp; företagsinterna kurser
                        </h3>
                        <p className="card__text">
                            Kunskap och kompetens som stärker chefer och ledare.
                        </p>
                        <button className="card__button">
                            <i className="fas fa-list-ul"></i> Läs mer
                        </button>
                    </a>
                </div>
                <div className="section__column">
                    <a href="/home/services" className="card">
                        <i className="card__icon fas fa-arrow-right"></i>
                        <h3 className="card__heading">
                            Skräddarsydda konsulttjänster
                        </h3>
                        <p className="card__text">
                            Behovsanpassad utveckling av organisation, chefer &amp; medarbetare!
                        </p>
                        <button className="card__button">
                            <i className="fas fa-list-ul"></i> Läs mer
                        </button>
                    </a>
                </div>
            </section>
        </div>
        <div className="background--light-blue" id="newsletter">
            <section className="section section--grid section--center-content">
                <div className="section__column">
                    <div className="pitch pitch--centered pitch--inverted">
                        <h2 className="pitch__heading">
                            Aktuella nyheter, nyttiga checklistor och praktiska tips för chefer &amp; ledare - anmäl dig till vårt kostnadsfria nyhetsbrev nu!
                        </h2>
                        <p className="pitch__text">
                            Easy2performs nyhetsbrev utkommer 2-3 gånger per månad och innehåller aktuell information för dig som jobbar som chef och ledare. Vi kompletterar informationen med användbara checklistor, mallar och dokument du har nytta av i din yrkesroll. På webb och
                            i mobilen. Helt gratis. Anmäl dig här.
                        </p>
                    </div>
                    <i className="fas fa-envelope"></i>
                </div>
            </section>
        </div>
    </div>
  </Layout>
  )
}

export default IndexPage
