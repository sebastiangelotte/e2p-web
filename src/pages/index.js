import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import Hero from "../components/hero"
import Notice from "../components/notice"
import styled from "styled-components"
import Card from "../components/card"
import MegaPhone from "../components/icons/megaphone"
import Coaching from "../components/icons/coaching"
import Online from "../components/icons/online"
import ReviewCard from "../components/reviewCard"
import LogoList from "../components/logoList"
import Newsletter from "../components/forms/newsletter"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"
import FullWidthCard from "../components/fullWidthCard"
import ImageTextSection from "../components/imageTextSection"
import Avatar from "../components/avatar"
import { Button, Section } from "../components/styledComponents"
import { graphql, useStaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulReview(filter: { showOnStartpage: { eq: true } }) {
        edges {
          node {
            id
            rating
            image {
              fixed(height: 100) {
                src
              }
            }
            name
            text {
              json
            }
          }
        }
      }
    }
  `)

  const reviews = data.allContentfulReview.edges

  return (
    <Layout transparentNavigation>
      <Head
        title="Din flexibla kursleverantör"
        description="Vi hjälper medarbetare och chefer att prestera bättre i sin yrkesroll. Genom behovsanpassad utbildning, individuell coaching och praktiska checklistor ger vi stöd i det dagliga arbetet."
      />
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
              <Card link="/courses">
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
              <Card link="/coaching">
                <Coaching />
                <h3>Individuell coaching</h3>
                <p>Individuell coaching innebär att du är i fokus.</p>
                <p>
                  Målet med coachingen är att ge dig stöd och utveckling i din
                  yrkesroll.
                </p>
              </Card>
            </ScaleBox>
          </IntersectionObserver>
          <IntersectionObserver>
            <ScaleBox>
              <Card link="/tools">
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
          {reviews.map((review, i) => (
            <IntersectionObserver key={i}>
              <ScaleBox>
                <ReviewCard rating={review.node.rating}>
                  <h4>
                    <Avatar round customImage={review.node.image.fixed.src} />{" "}
                    {review.node.name}
                  </h4>
                  {documentToReactComponents(review.node.text.json, options)}
                </ReviewCard>
              </ScaleBox>
            </IntersectionObserver>
          ))}
        </Grid>
        <a
          href="https://www.utbildning.se/kurser/easy2perform/recensioner"
          target="_blank"
          rel="noreferrer"
        >
          <StyledButton>Fler recensioner på utbildning.se</StyledButton>
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
  text-align: center;

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

const StyledButton = styled(Button)`
  margin-top: 50px;
`
