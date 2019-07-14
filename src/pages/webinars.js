import React from "react"

import { Player } from "video-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Checkout from "../components/checkout"

const Account = () => (
  <Layout>
    <Head title="Kurser" />
    <div className="courses">
      <div className="background--white">
        <section className="section section--extra-top-padding">
          <div className="heading">
            <h1 className="heading__headline">Webinarer</h1>
            <span className="heading__text">
              <p>
                Hinner du inte gå en lång kurs? Ta en titt på våra webinarer!
              </p>
            </span>
          </div>
        </section>
      </div>
      <div className="background--white-opaque">
        <section className="section section--grid">
          <div className="section__column section__column--6 wysiwyg-content">
            <section className="section section--grid section--wrap section--no-vertical-padding">
              <div className="section__column">
                <h2>Webinar: Att leda utan att vara chef</h2>
                <p>
                  Kursen riktar sig till dig som idag har en roll där du
                  förväntas engagera, driva och styra en grupp, men där din
                  arbetsbeskrivning ej innehåller ett formellt chefsmandat. Du
                  arbetar troligtvis som team-, arbets- eller projektledare,
                  samordnare, koordinator eller på annat sätt ansvar för en
                  grupp/team av personer.
                </p>
                <h3>Vem bör deltaga?</h3>
                <p>
                  Easy2perform samarbetar enbart med pedagogiskt skickliga
                  kursledare, alla med lång erfarenhet av att anpassa utbildning
                  och kompetensutveckling till deltagarnas behov. Vi vet att en
                  ökad individuell anpassning ger deltagaren ännu mer behållning
                  av kursen.
                </p>
                <p>
                  <Checkout />
                </p>
              </div>
            </section>
          </div>
          <div className="section__column section__column--6">
            <Player
              autoPlay
              playsInline
              width="300"
              poster="/logo.svg"
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
          </div>
        </section>
      </div>
      <div className="background--blue">
        <section className="section section--grid section--center-content">
          <div className="section__column">
            <div className="pitch pitch--centered pitch--inverted">
              <h2 className="pitch__heading">
                Easy2perform – vi vill göra det enklare att prestera i
                yrkesrollen!
              </h2>
              <p className="pitch__text">
                Vi som jobbar med Easy2perform fokuserar på att ge stöd och
                vägledning till företag, chefer och medarbetare. Oavsett om det
                sker genom våra gratislösningar på mobil &amp; webb, kurser
                eller konsulttjänster, levererar vi kunskap som gör det enklare
                att prestera i yrkesrollen.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
)

export default Account
