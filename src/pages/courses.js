import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Item, Segment, Container, Header, Menu } from "semantic-ui-react"
import styled from "styled-components"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseCard from "../components/course-card/courseCard"
import Filter from "../components/filter"
import backgroundImage from "../images/meeting.jpg"

const StyledSegment = styled(Segment)`
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #000000aa;
  }
`

const style = {
  segment: {
    paddingTop: "10em",
    paddingBottom: "6em",
    backgroundColor: "#00000055",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

const Courses = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse(sort: { fields: date, order: ASC }) {
        edges {
          node {
            title
            slug
            date(formatString: "D/M/YYYY")
            rawDate: date
            price
            numberOfDays
            tags
            city
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
      <StyledSegment
        style={style.segment}
        textAlign="center"
        vertical
        // color="blue"
        inverted
      >
        <Container text style={{ position: "relative", zIndex: "1" }}>
          <Header as="h1" inverted>
            Utvecklande kurser
          </Header>
          <div>
            <p>
              Easy2perform utvecklar och genomför inspirerande kurser för din
              utveckling.
            </p>
            <p>
              Vi följer nyheter, trender och målgruppsbehov inom exempelvis
              ledarskap, personal, HR, projektledning och utvecklar kurser som
              ger ökad kunskap och kompetens. Vi handplockar kursledare med rätt
              kompetens, erfarenhet och pedagogisk förmåga, för att ge dig den
              bästa upplevelsen.
            </p>
            <Filter
              data={data.allContentfulCourse.edges}
              onChange={updateCourses}
            />
          </div>
        </Container>
      </StyledSegment>
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
                .filter(course => new Date(course.node.rawDate) > new Date())
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
