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
                <p>
                  Lorem ipsum dolor si amet, an dus situ sint pertinacia consti
                  tuto, mir dignsius quo great.
                </p>
              </Card>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <Card>
                <Coaching />
                <h3>Skräddarsy coaching</h3>
                <p>
                  Lorem ipsum dolor si amet, an dus situ sint pertinacia consti
                  tuto, mir dignsius quo great.
                </p>
              </Card>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <Card>
                <Online />
                <h3>Onlinekurs</h3>
                <p>
                  Lorem ipsum dolor si amet, an dus situ sint pertinacia consti
                  tuto, mir dignsius quo great.
                </p>
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
                <h4>Anna Johansson</h4>
                <p>Helt suverän kurs!</p>
              </ReviewCard>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <ReviewCard rating={5}>
                <h4>Freddy Hejochhå</h4>
                <p>
                  HelJohan var väldigt engagerad och fick hela gruppen att
                  engagera sig. Väldigt kunnig.
                </p>
              </ReviewCard>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <ReviewCard rating={5}>
                <h4>Hopplan Hejsan</h4>
                <p>
                  Jättebra att den var uppdelad på två halvdagar, svårt att
                  hålla fokus via webben en hel dag.
                </p>
              </ReviewCard>
            </ScaleBox>
          </IntersectionObserver>
        </Grid>
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
