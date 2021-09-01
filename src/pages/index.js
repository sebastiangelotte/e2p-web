import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import Hero from "../components/hero"
import styled from "styled-components"
import ReviewCard from "../components/reviewCard"
import LogoList from "../components/logoList"
import Newsletter from "../components/forms/newsletter"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"
import FullWidthCard from "../components/fullWidthCard"
import ImageTextSection from "../components/imageTextSection"
import Avatar from "../components/avatar"
import { Section } from "../components/styledComponents"
import { graphql, useStaticQuery } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
import animation from "../animations/hero.json"

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
            subtitle
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
        title="Företagsanpassade kurser för medarbetare och chefer"
        description="Alla kurser anpassas utifrån kundens behov. Genomförandet sker antingen på plats hos er, digitalt eller en mix, det avgör ni. Kursledarna är duktiga pedagoger och vana att utbilda i olika miljöer, små och stora grupper, på plats eller digitalt. Vi har mer än 25 års erfarenhet av att utveckla och genomföra kundspecfika företagsinterna kurser"
      />
      <Hero
        title={"Företagsanpassade kurser för medarbetare och chefer"}
        text={
          "Alla kurser anpassas utifrån kundens behov. Genomförandet sker antingen på plats hos er, digitalt eller en mix, det avgör ni. Kursledarna är duktiga pedagoger och vana att utbilda i olika miljöer, små och stora grupper, på plats eller digitalt. Vi har mer än 25 års erfarenhet av att utveckla och genomföra kundspecfika företagsinterna kurser."
        }
        animation={animation}
        showButtons
      />
      <Section>
        <Container>
          <SmallText>Ett urval av kunder:</SmallText>
          <LogoList />
        </Container>
        <Grid>
          {reviews.map((review, i) => (
            <IntersectionObserver key={i}>
              <ScaleBox>
                <ReviewCard rating={review.node.rating}>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "20px",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <Avatar round customImage={review.node.image.fixed.src} />{" "}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <h4 style={{ marginBottom: "0" }}>
                          {review.node.name}
                        </h4>
                      </div>
                    </div>
                    <span style={{ color: "#455880" }}>
                      {review.node.subtitle}
                    </span>
                  </div>
                  {documentToReactComponents(review.node.text.json, options)}
                </ReviewCard>
              </ScaleBox>
            </IntersectionObserver>
          ))}
        </Grid>
      </Section>
      <Section>
        <ImageTextSection />
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
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const SmallText = styled.span`
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
  padding-left: 20px;

  @media screen and (max-width: 1100px) {
    text-align: center;
    display: block;
  }
`
