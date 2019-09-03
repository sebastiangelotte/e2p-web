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
    <Layout>
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
          <h2>Kommande kurser:</h2>
          <Segment vertical>
            <Container text>
              <Item.Group divided>
                {userCourses &&
                  userCourses.map((edge, index) => {
                    return <CourseCard key={index} data={edge.node} />
                  })}
              </Item.Group>
            </Container>
          </Segment>
        </Container>
      </Segment>
    </Layout>
  )
}
export default Account

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
  },
}
