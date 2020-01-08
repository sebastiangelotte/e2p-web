import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Item, Segment, Container, Header, Menu, Grid } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseCard from "../components/course-card/courseCard"
import Filter from "../components/filter"
import Hero from "../components/hero"
import HighlightedCard from "../components/highlightedCard"
import { Link } from "gatsby"

const Courses = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse(sort: { fields: title, order: ASC }) {
        edges {
          node {
            title
            slug
            price
            numberOfDays
            tags
            companyInternalCourse
            courseLeader {
              name
              image {
                title
                fixed(width: 200) {
                  width
                  height
                  src
                }
              }
              title
            }
            kurstillflle {
              city
              date(formatString: "D/M/YYYY")
              title
              location {
                lat
                lon
              }
            }
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
      file(relativePath: { eq: "courses.jpg" }) {
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

  const [courses, setCourses] = useState(data.allContentfulCourse.edges)

  const updateCourses = courses => {
    if (courses.length > 0) {
      setCourses(courses)
    } else {
      setCourses(data.allContentfulCourse.edges) // reset state
    }
  }

  const [activeItem, setActiveItem] = useState(
    "Mest efterfrågade företagsinterna kurser"
  )

  return (
    <Layout transparentNavigation>
      <Head title="Kurser" />
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
        <Header as="h1" inverted>
          Behovsanpassade kurser
        </Header>
        <p>
          Kunskap är färskvara. Även om man har lång erfarenhet inom sitt område
          behöver man ibland uppdatera, fylla på och komplettera med ny kunskap
          för att kunna prestera optimalt i det dagliga arbetet.
        </p>
        <p>
          Vi utvecklar och genomför behovsanpassade kurser för medarbetare och
          chefer.
        </p>
      </Hero>
      <Container>
        <Grid stackable>
          <Grid.Row>
            {data.highlightedCourses.edges.map((course, i) => (
              <Grid.Column width={8}>
                <Segment vertical>
                  <Link to={`/courses/${course.node.slug}`}>
                    <HighlightedCard key={i} data={course.node} />
                  </Link>
                </Segment>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Container>
      <Segment vertical style={{ border: "none" }}>
        <Container>
          {/* <Filter
            data={data.allContentfulCourse.edges}
            onChange={updateCourses}
          /> */}
          <Menu pointing secondary size="big">
            <Menu.Item
              active={activeItem === "Mest efterfrågade företagsinterna kurser"}
              onClick={() =>
                setActiveItem("Mest efterfrågade företagsinterna kurser")
              }
            >
              Mest efterfrågade företagsinterna kurser
            </Menu.Item>
            <Menu.Item
              active={activeItem === "Mest efterfrågade öppna kurser"}
              onClick={() => setActiveItem("Mest efterfrågade öppna kurser")}
            >
              Mest efterfrågade öppna kurser
            </Menu.Item>
          </Menu>
        </Container>
      </Segment>
      <Segment vertical>
        <Container>
          {activeItem === "Mest efterfrågade öppna kurser" && (
            <p>
              Vi genomför ett mindre urval öppna kurser i Stockholm och Göteborg
              som komplement till våra företagsinterna kurser.
            </p>
          )}
          {activeItem === "Mest efterfrågade företagsinterna kurser" && (
            <p>
              Kurserna anpassas till företagets och deltagarnas verkliga behov
              genom en webbaserad förstudie där vi kartlägger behov,
              erfarenheter och förväntningar inom det aktuella området. Därefter
              formas innehållet och matchas mot kursledare med rätt kompetens
              och pedagogisk förmåga att utveckla deltagarna. Vi genomför kursen
              hos dig, oavsett var i Sverige företaget finns.
            </p>
          )}

          <Item.Group divided>
            {activeItem === "Mest efterfrågade öppna kurser" &&
              courses
                .filter(course => {
                  return course.node.companyInternalCourse === false
                })
                // .filter(course => new Date(course.node.rawDate) > new Date())
                .map((edge, index) => {
                  return <CourseCard key={index} data={edge.node} />
                })}
            {activeItem === "Mest efterfrågade företagsinterna kurser" &&
              courses
                .filter(course => {
                  return course.node.companyInternalCourse === true
                })
                .map((edge, index) => {
                  return <CourseCard key={index} data={edge.node} />
                })}
          </Item.Group>
        </Container>
      </Segment>
    </Layout>
  )
}

export default Courses
