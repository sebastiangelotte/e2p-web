import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import Hero from "../components/new/hero"
import Notice from "../components/new/notice"
import styled from "styled-components"
import Card from "../components/new/card"
import MegaPhone from "../components/new/icons/megaphone"
import Coaching from "../components/new/icons/coaching"
import Online from "../components/new/icons/online"
import ReviewCard from "../components/new/reviewCard"
import LogoList from "../components/new/logoList"
import Newsletter from "../components/new/newsletter"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"
import FullWidthCard from "../components/new/fullWidthCard"
import ImageTextSection from "../components/new/imageTextSection"
import Avatar from "../components/new/avatar"
import { Button } from "../components/new/styledComponents"

const IndexPage = () => {
  return (
    <Layout transparentNavigation>
      <Head title="Startsida" />
      <Hero />
      <NoticePositioner>
        <Notice />
      </NoticePositioner>
      <Section>
        <Tag>
          <span>Kurser</span>
        </Tag>
        <Heading primary>Vad passar dig bäst?</Heading>
        <Grid>
          <IntersectionObserver>
            <ScaleBox>
              <Card>
                <MegaPhone />
                <h3>Grupputbildning</h3>
                <p>Små och stora grupper.</p>
                <p>
                  Färdiga moduler eller behovsanpassad utbildning. Online (live)
                  eller on-site. När det passar dig.
                </p>
              </Card>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <Card>
                <Coaching />
                <h3>Individuell coaching</h3>
                <p>Vi matchar ihop dig med en konsult.</p>
                <p>
                  Individuell coaching innebär att du är i fokus. Målet med
                  coachingen är att ge dig stöd och utveckling i din yrkesroll.
                </p>
              </Card>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <Card>
                <Online />
                <h3>Praktiska checklistor</h3>
                <p>
                  Att ha en användbar checklista till hands när man skall utföra
                  viktiga och svåra uppgifter i rollen som chef och ledare är
                  ovärderligt.
                </p>
                <p>Alla våra checklistor är gratis.</p>
              </Card>
            </ScaleBox>
          </IntersectionObserver>
        </Grid>
      </Section>
      <Section>
        <ImageTextSection />
      </Section>
      <Section gradient>
        <Tag>
          <span>Recensioner</span>
        </Tag>
        <Heading secondary>Vad våra kursdeltagare säger...</Heading>
        <Grid>
          <IntersectionObserver>
            <ScaleBox>
              <ReviewCard rating={5}>
                <h4>
                  <Avatar round preset="man1" /> Kursdeltagare
                </h4>
                <p>Man hade verkligen fokus på vårt företag och vårt behov.</p>
                <p>
                  Kommer ha mycket nytta av det vi gick igenom om hur man
                  coachar och stöttar teamet.
                </p>
              </ReviewCard>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <ReviewCard rating={5}>
                <h4>
                  <Avatar round preset="woman1" /> Kursdeltagare
                </h4>
                <p>
                  Kursledaren gav personlig feedback och var lyhörd för våra
                  utmaningar. Bra med liten grupp.
                </p>
              </ReviewCard>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <ReviewCard rating={5}>
                <h4>
                  <Avatar round preset="woman2" /> Kursdeltagare
                </h4>
                <p>
                  Tack för bra dag. Stärkte mig oerhört inför några jobbiga
                  samtal jag skall ha snart.
                </p>
              </ReviewCard>
            </ScaleBox>
          </IntersectionObserver>
        </Grid>
        <a
          href="https://www.utbildning.se/kurser/easy2perform/recensioner"
          target="_blank"
        >
          <Button>Fler recensioner på utbildning.se</Button>
        </a>
      </Section>
      <Section background>
        <Heading secondary>Några kunder vi jobbat med...</Heading>
        <LogoList />
      </Section>
      <Newsletter />
      <Section gradient>
        <IntersectionObserver>
          <ScaleBox>
            <FullWidthCard />
          </ScaleBox>
        </IntersectionObserver>
      </Section>
    </Layout>
  )
}

export default IndexPage

const NoticePositioner = styled.div`
  position: relative;
  top: -90px;
  margin-left: auto;
  margin-right: auto;
  max-width: 818px;
  padding-left: 10px;
  padding-right: 10px;
`

const Section = styled.section`
  padding-top: 132px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 400px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  ${props =>
    props.gradient &&
    `
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F9FF 100%);
  `}
  ${props =>
    props.background &&
    `
    background-color: #F2F9FF;
  `}
`

const Tag = styled.div`
  > span {
    color: #ff2e6a;
    background-color: #f9f3fe;
    padding: 15px 55px 18px 55px;
    border-radius: 7px;
    font-size: 22px;
  }
`

const Heading = styled.h2`
  color: #1e266d;
  margin-bottom: 82px;
  margin-top: 39px;

  ${props =>
    props.primary &&
    `
  font-size: 48px;
  `}
  ${props =>
    props.secondary &&
    `
    font-size: 38px;
    font-style: italic;
  `}
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`
