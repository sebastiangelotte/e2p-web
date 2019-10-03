import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Item, Segment, Container, Header, Menu } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseCard from "../components/course-card/courseCard"
import Filter from "../components/filter"
import Hero from "../components/hero"

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

  const [activeItem, setActiveItem] = useState("Öppna kurser")

  return (
    <Layout transparentNavigation>
      <Head title="Kurser" />
      <Hero backgroundImage={data.file.childImageSharp.fluid}>
        <Header as="h1" inverted>
          Utvecklande kurser
        </Header>
        <p>
          Easy2perform utvecklar och genomför inspirerande kurser för din
          utveckling.
        </p>
        <p>
          Vi följer nyheter, trender och målgruppsbehov inom exempelvis
          ledarskap, personal, HR, projektledning och utvecklar kurser som ger
          ökad kunskap och kompetens. Vi handplockar kursledare med rätt
          kompetens, erfarenhet och pedagogisk förmåga, för att ge dig den bästa
          upplevelsen.
        </p>
        <Filter
          data={data.allContentfulCourse.edges}
          onChange={updateCourses}
        />
      </Hero>
      <Segment vertical style={{ border: "none" }}>
        <Container text>
          <Menu pointing secondary size="big">
            <Menu.Item
              active={activeItem === "Öppna kurser"}
              onClick={() => setActiveItem("Öppna kurser")}
            >
              Öppna kurser
            </Menu.Item>
            <Menu.Item
              active={activeItem === "Företagsinterna kurser"}
              onClick={() => setActiveItem("Företagsinterna kurser")}
            >
              Företagsinterna kurser
            </Menu.Item>
          </Menu>
        </Container>
      </Segment>
      <Segment vertical>
        <Container text>
          <Item.Group divided>
            {activeItem === "Öppna kurser" &&
              courses
                .filter(course => {
                  return course.node.companyInternalCourse === false
                })
                // .filter(course => new Date(course.node.rawDate) > new Date())
                .map((edge, index) => {
                  return <CourseCard key={index} data={edge.node} />
                })}
            {activeItem === "Företagsinterna kurser" &&
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
