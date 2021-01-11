import React from "react"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import bg from "../images/hero-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Inner,
} from "../components/styledComponents"
import { BsPersonBoundingBox } from "react-icons/bs"
import { FaHandHoldingHeart, FaMagic } from "react-icons/fa"
import Card from "../components/card"
import CoachingForm from "../components/forms/coachingForm"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"

const Coaching = () => {
  return (
    <Layout>
      <Head
        title="Coaching"
        description="Individuell coaching innebär att du är i fokus. Målet med
              coachingen är att ge dig stöd och utveckling i din yrkesroll. Vi
              matchar ditt behov med våra konsulters erfarenhet av liknande
              uppdrag."
      />

      <SectionWithBackgroundImage background backgroundImage={bg} firstSection>
        <StyledInner>
          <div>
            <Heading as="h1" inverted italic>
              Individuell coaching
            </Heading>
            <p>
              Individuell coaching innebär att du är i fokus. Målet med
              coachingen är att ge dig stöd och utveckling i din yrkesroll. Vi
              matchar ditt behov med våra konsulters erfarenhet av liknande
              uppdrag.
            </p>
            <p>
              Du väljer själv i vilken omfattning du önskar coaching, från något
              enstaka tillfälle till ett antal möten under en 6- till
              12-månadersperiod.
            </p>
          </div>
          <IntersectionObserver>
            <ScaleBox>
              <CoachingForm source="Coaching" />
            </ScaleBox>
          </IntersectionObserver>
        </StyledInner>
        <IntersectionObserver>
          <ScaleBox>
            <Grid>
              <CardWrapper withBackground>
                <FaMagic />
                <h3>Få ut ännu mer</h3>
                <p>
                  Få individuell coaching som anpassas efter dina behov,
                  önskemål och uppsatta mål
                </p>
              </CardWrapper>
              <CardWrapper withBackground>
                <BsPersonBoundingBox />
                <h3>All fokus på dig</h3>
                <p>
                  All fokus på dig och gott om tid för dina frågor och
                  utmaningar
                </p>
              </CardWrapper>
              <CardWrapper withBackground>
                <FaHandHoldingHeart />
                <h3>Handplockad kompetens</h3>
                <p>
                  Vi handplockar en konsult med lång erfarenhet inom området
                </p>
              </CardWrapper>
            </Grid>
          </ScaleBox>
        </IntersectionObserver>
      </SectionWithBackgroundImage>
    </Layout>
  )
}

export default Coaching

const StyledInner = styled(Inner)`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 2fr 1fr;
  padding-bottom: 100px;

  p {
    font-size: 20px;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Grid = styled(Inner)`
  padding-bottom: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const CardWrapper = styled(Card)`
  text-align: center;
  padding: 65px 50px 40px 50px;
  align-items: center;

  svg {
    font-size: 60px;
    margin-bottom: 25px;
  }

  h3 {
    font-size: 25px;
  }

  p {
    font-size: 18px;
  }
`
