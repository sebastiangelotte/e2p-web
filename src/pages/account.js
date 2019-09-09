import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Segment, Container, Header, Item } from "semantic-ui-react"
import Head from "../components/head"
import Layout from "../components/layout"
import CourseCard from "../components/course-card/courseCard"

import { useUser } from "../utils/user"

import * as queries from "../graphql/queries"
import { graphqlOperation, API, Auth } from "aws-amplify"

const Account = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse(sort: { fields: date, order: ASC }) {
        edges {
          node {
            id
            title
            slug
            date(formatString: "D/M/YYYY")
            rawDate: date
            price
            numberOfDays
            tags
            city
            courseMaterial {
              title
              file {
                url
              }
            }
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

  const [courses] = useState(data.allContentfulCourse.edges)

  if (typeof window !== "undefined") {
    var { user } = useUser()
  }

  const [userData, setUserData] = useState()
  const userCourses = courses.filter(course => {
    return (
      userData &&
      userData.data.getUserData &&
      userData.data.getUserData.courses.indexOf(course.node.id) !== -1
    )
  })

  useEffect(() => {
    let isSubscribed = true
    Auth.currentAuthenticatedUser().then(user => {
      API.graphql(
        graphqlOperation(queries.getUserData, {
          id: user.attributes.email,
        })
      ).then(data => {
        if (isSubscribed) {
          setUserData(data)
        }
      })
    })

    return () => (isSubscribed = false) // https://juliangaramendy.dev/use-promise-subscription/
  }, [])

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />
      <Segment
        style={style.segment}
        textAlign="center"
        vertical
        color="blue"
        inverted
      >
        <Container text>
          <Header as="h1" inverted>
            Mina sidor
          </Header>
        </Container>
      </Segment>
      <Segment style={style.segment} vertical>
        <Container text>Email: {user && user.attributes.email}</Container>
        <Container text>
          <h2>Mina kommande kurser:</h2>
          <Segment>
            <Item.Group divided>
              {userCourses &&
                userCourses
                  .filter(course => new Date(course.node.rawDate) > new Date())
                  .map((edge, index) => {
                    return <CourseCard key={index} data={edge.node} simple />
                  })}
            </Item.Group>
          </Segment>
        </Container>
        <Container text>
          <h2 style={{ marginTop: "4rem" }}>Mina avklarade kurser:</h2>
          <Segment>
            <Item.Group divided>
              {userCourses &&
                userCourses
                  .filter(course => new Date(course.node.rawDate) < new Date())
                  .map((edge, index) => {
                    return (
                      <CourseCard
                        key={index}
                        data={edge.node}
                        simple
                        showFiles
                      />
                    )
                  })}
            </Item.Group>
          </Segment>
        </Container>
      </Segment>
    </Layout>
  )
}
export default Account

const style = {
  segment: {
    paddingTop: "10em",
    paddingBottom: "6em",
    backgroundColor: "#f7f7f7",
  },
}
