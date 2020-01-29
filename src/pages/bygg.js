import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import { Segment, Header } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import Hero from "../components/hero"
import HighlightedCard from "../components/highlightedCard"
import ContactForm from "../components/contactForm"

const Bygg = () => {
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

  const cardData = {
    title: "🔨 Bygg din egen kurs",
    shortDescription: "",
  }

  return (
    <Layout transparentNavigation>
      <Head title="Bygg din egen kurs" />
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
        <Header as="h1" inverted>
          Bygg din egen kurs
        </Header>
      </Hero>
      <Segment vertical>
        <TopWrapper>
          <HighlightedCard data={cardData}>
            <ul>
              <li>
                Har ni medarbetare som behöver gå kurs för att vidareutveckla
                sina kunskaper?
              </li>
              <li>
                Vill ni anpassa kursinnehållet efter era specifika behov och
                utmaningar?
              </li>
              <li>
                Vill ni öka verkningsgraden hos kursen genom att genomföraden
                internt och ge fler på företaget möjligheten att delta, utbyta
                erfarenheter och utvecklas?
              </li>
            </ul>
          </HighlightedCard>
        </TopWrapper>
        <BottomWrapper>
          <Left>
            <h2>Då kan Easy2perform kan hjälpa till.</h2>
            <p>
              <b>
                Vi och våra kursledare har lång erfarenhet av att utveckla och
                genomföra behovsanpassade företagsinterna kurser för medarbetare
                och chefer inom exempelvis ledarskap, coaching, målstyrning,
                kommunikation & bemötande, personlig effektivitet &
                tidsplanering m.m
              </b>
            </p>
            <p>
              Kurserna anpassas till företagets och deltagarnas behov genom en
              webbaserad förstudie där vi kartlägger behov, erfarenheter och
              förväntningar inom det aktuella området. Därefter formas
              innehållet och matchas mot kursledare med rätt kompetens och
              pedagogisk förmåga att utveckla deltagarna. Vi genomför kursen hos
              dig, oavsett var i Sverige ditt företag finns.
            </p>
          </Left>
          <Right>
            <h3>👉 Kostnadsfri offert</h3>
            <p>
              <b>Berätta kort om ditt behov så tar vi fram förslag till dig.</b>
            </p>
            <ContactForm source="bygg-landing-page" />
          </Right>
        </BottomWrapper>
      </Segment>
    </Layout>
  )
}

export default Bygg

const TopWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px 30px 20px;

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }

  ul {
    margin-bottom: -20px;

    li {
      padding-bottom: 15px;
    }
  }
`

const BottomWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 50px 20px;
  display: flex;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 30px;
  }
`

const Left = styled.div`
  flex: 0 1 auto;
  padding-right: 30px;
  padding: 15px;

  @media only screen and (max-width: 900px) {
    padding-right: 0;
    padding-bottom: 30px;
  }
`

const Right = styled.div`
  flex: 0 0 50%;
  background-color: #dedede;
  padding: 15px;
  border-radius: 10px;

  @media only screen and (max-width: 900px) {
    flex-basis: auto;
  }
`
