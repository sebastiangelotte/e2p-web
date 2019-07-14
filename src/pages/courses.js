import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Item, Segment, Container, Header } from "semantic-ui-react"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseCard from "../components/course-card/courseCard"
import Filter from "../components/filter"

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
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
            date(formatString: "MMMM Do, YYYY")
            price
            numberOfDays
            tags
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

  return (
    <Layout>
      <Head title="Kurser" />
      <Segment
        style={style.segment}
        textAlign="center"
        vertical
        color="blue"
        inverted
      >
        <Container text>
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
      </Segment>
      <Segment style={style.segment} vertical>
        <Container text>
          <Item.Group divided>
            {courses.map((edge, index) => {
              return <CourseCard key={index} data={edge.node} />
            })}
          </Item.Group>
        </Container>
      </Segment>
    </Layout>
  )
}

export default Courses
