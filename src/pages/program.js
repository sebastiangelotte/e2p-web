import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import { Segment, Header } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Hero from "../components/hero"
import scienceSVG from "../images/undraw-science.svg"
import communitySVG from "../images/undraw-community.svg"
import financeSVG from "../images/undraw-finance.svg"

const Program = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "services.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
        <Header as="h1" inverted>
          Skräddarsydd kompetensutveckling
        </Header>
        <div>
          <p>
            Behöver du hjälp att skräddarsy ett helt utbildningsprogram för en
            viss målgrupp, exempelvis ett introduktionsprogram för nya ledare,
            säljare, projektledare mfl?
          </p>
          <p>
            Vi tar tillsammans med dig som kund fram en kravspecifikation
            utifrån det specifika behovet. Du får sedan kostnadsfritt ett
            förslag på innehållsmoduler, struktur samt utbildarprofiler för
            respektive modul. Vill du gå vidare projektleder vi hela processen,
            från förstudie och behovsanpassning, till genomförande, utvärdering
            och underhåll av utbildningsprogrammet över tid.
          </p>
        </div>
      </Hero>
      <Segment vertical style={{ padding: "0 20px" }}>
        <TopWrapper>
          <h2>5 stegs projektmodell för utveckling</h2>
          <p>
            Vi har en 5 stegs projektmodell som möjliggör kostnadseffektiv
            utveckling av merkomplexa utbildningsprogram, från idé till färdig
            lösning.
          </p>
          <p>
            Vi börjar med en förstudie <b>(1)</b> innehållande en GAP-analys{" "}
            <b>(1)</b> för att fastställa det potentiella kunskapslyftet hos den
            grupp av individer som man önskar utveckla. Utvecklas en
            kravspecifikation <b>(2)</b>, med tydliga effektmål och
            fokusområden, allt utifrån kundens förutsättningar och budget.
            Aktuella utvecklingskonsulter kontaktas och kvalitetssäkras{" "}
            <b>(3)</b> utifrån önskat behov av kompetens- & erfarenhetsprofil.
            En tid- & projektplan <b>(4)</b> fastställs och struktur och
            innehållsblock i det planerade utbildningsprogrammet utformas{" "}
            <b>(5)</b>.
          </p>
        </TopWrapper>
        <div style={{ backgroundColor: "#f7f7f7" }}>
          <ExampleWrapper>
            <img src={scienceSVG} alt="Utbildningsprogram" />
            <div>
              <h3>Utbildningsprogram för 1:a och 2:a linjens chefer</h3>
              <p>
                Utveckling av ledarutbildning för chefer och ledare verksamma
                inom kemiindustrin. Målsättningen var att stärka kompetensen
                inom tre huvudsakliga områden,
              </p>
              <ul>
                <li>Ledarskap</li>
                <li>Målstyrning</li>
                <li>Coaching</li>
              </ul>
              <p>
                Utbildningen genomfördes som i tre etapper á 2-3 dagar under en
                6 månaders period med diskussioner och uppgifter emellan.
              </p>
            </div>
          </ExampleWrapper>
          <ExampleWrapper>
            <div>
              <h3>Ledarutveckling och individuell coaching för enhetschefer</h3>
              <p>
                Utveckling av upplägg för coaching och stöttning av enhetschefer
                inom Transportindustrin. Målsättningen var att,
              </p>
              <ul>
                <li>
                  Utveckla och stärka chefer och ledare inom organisationen
                </li>
                <li>
                  Möjliggöra erfarenhetsutbyte och kunskapsspridning mellan
                  enheterna
                </li>
              </ul>
              <p>
                Utbildningen genomfördes som grupputveckling och individuell
                coaching under en 8 månaders period.
              </p>
            </div>
            <img src={communitySVG} alt="Ledarutveckling" />
          </ExampleWrapper>
          <ExampleWrapper>
            <img src={financeSVG} alt="Utveckling av kursupplägg" />
            <div>
              <h3>Utbildning inom entreprenadjuridik för jurister</h3>
              <p>
                Utveckling av kursupplägg för företagsekonomer och jurister
                verksamma inom petrokemindustrin. Målsättningen var att skapa en
                nischad utbildning med fokus på spelregler och tolkning av
                avtal.
              </p>
              <p>
                Utbildningen genomfördes som grupputveckling applicerat på ett
                antal praktiska case där möjlighet till juridiskt stöd och
                konsultation efteråt fanns att tillgå.
              </p>
            </div>
          </ExampleWrapper>
        </div>
      </Segment>
    </Layout>
  )
}

export default Program

const TopWrapper = styled.div`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;

  p {
    font-size: 120%;
    line-height: 1.7em;
  }
`

const ExampleWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 120%;

  > * {
    padding-right: 80px;
  }

  img {
    width: 50%;
    max-height: 500px;
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`
