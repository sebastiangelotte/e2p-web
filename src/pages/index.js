import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { Segment, Container, Grid, Button } from "semantic-ui-react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import HighlightedCard from "../components/highlightedCard"
import HomepageHeading from "../components/homepageHeading"

const FixedHero = styled.div`
  position: relative;
  max-height: 500px;
  height: 500px;
  overflow: hidden;

  img {
    object-fit: cover;
  }

  @media only screen and (max-width: 600px) {
    max-height: 600px;
    height: 800px;
  }
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulHomepageSection {
        edges {
          node {
            heading
            description {
              json
            }
            buttonText
            buttonLink
            theme
          }
        }
      }
      file(relativePath: { eq: "courses.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      highlightedCourses: allContentfulCourse(
        filter: { highlight: { eq: true } }
      ) {
        edges {
          node {
            title
            shortDescription
            numberOfDays
            slug
            tags
          }
        }
      }
      highlightedTools: allContentfulTool(filter: { highlight: { eq: true } }) {
        edges {
          node {
            title
            shortDescription
            slug
            tags
          }
        }
      }
    }
  `)

  return (
    <Layout transparentNavigation>
      <Head title="Startsida" />
      <FixedHero>
        <Img
          fluid={data.file.childImageSharp.fluid}
          style={{ position: "static" }} // fill entire height
          objectFit="cover"
        />
        <HomepageHeading />
      </FixedHero>

      <Container>
        <SectionHeading>
          <h2>Populära kurser</h2>
          <Link to="/courses">Se alla</Link>
        </SectionHeading>
        <Grid stackable>
          <Grid.Row>
            {data.highlightedCourses.edges.map((course, i) => (
              <Grid.Column width={8}>
                <Segment vertical style={{ height: "100%" }}>
                  <Link to={`/courses/${course.node.slug}`}>
                    <HighlightedCard key={i} data={course.node} highlighted />
                  </Link>
                </Segment>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
      <FullWidthWrapper>
        <h2>Bygg din egen kurs</h2>
        <p>
          Har ni medarbetare som behöver gå kurs för att vidareutveckla sina
          kunskaper?
        </p>
        <p>
          Vill ni anpassa kursinnehållet efter era specifika behov och
          utmaningar?
        </p>
        <p>
          Vill ni öka verkningsgraden hos kursen genom att genomföraden internt
          och ge fler på företaget möjligheten att delta, utbyta erfarenheter
          och utvecklas?
        </p>
        <Link to="/bygg">
          <Button
            secondary
            content="Läs mer"
            icon="arrow right"
            labelPosition="left"
          />
        </Link>
      </FullWidthWrapper>
      <Container>
        <SectionHeading>
          <h2>Populära verktyg</h2>
          <Link to="/tools">Se alla</Link>
        </SectionHeading>
        <Grid stackable>
          <Grid.Row>
            {data.highlightedTools.edges.map((tool, i) => (
              <Grid.Column width={8}>
                <Segment vertical style={{ height: "100%" }}>
                  <Link to={`/tools/${tool.node.slug}`}>
                    <HighlightedCard key={i} data={tool.node} highlighted />
                  </Link>
                </Segment>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
      <FullWidthWrapper>
        <h2>
          Easy2perform – vi vill göra det enklare att prestera i yrkesrollen!
        </h2>
        <p>
          Vi som jobbar med Easy2perform fokuserar på att ge stöd och vägledning
          till företag, chefer och medarbetare. Oavsett om det sker genom våra
          gratislösningar på mobil & webb, kurser eller konsulttjänster,
          levererar vi kunskap som gör det enklare att prestera i yrkesrollen.
        </p>
      </FullWidthWrapper>
    </Layout>
  )
}

export default IndexPage

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 10px 0;

  h2 {
    margin-bottom: 0;
  }

  a {
    color: black;
    font-size: 16px;
    text-decoration: none;
    border-bottom: 1px solid black;
    text-transform: uppercase;
    font-weight: bold;
  }
`
const FullWidthWrapper = styled.div`
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23030301' stroke-width='67.7' stroke-opacity='0.15' %3E%3Ccircle fill='%23179dc2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%231794ba' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23178bb2' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%231882a9' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%231979a1' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23197098' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%231a688f' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%231a5f87' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%231a577e' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%231a4f75' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%2319476c' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23183f63' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2317375a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23153051' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23132948' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2310223f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230e1b36' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230b142e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
  color: white; */
  text-align: center;
  padding: 50px 10px;
  margin-top: 30px;
  background-color: #ececec;

  h2 {
    font-size: 30px;
  }

  p {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
  }
`
