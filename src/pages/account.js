import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Segment, Container, Header, Item, Menu, Icon } from "semantic-ui-react"
import Head from "../components/head"
import Layout from "../components/layout"
import CourseCard from "../components/course-card/courseCard"

// import { useUser } from "../utils/user"

import * as queries from "../graphql/queries"
import { graphqlOperation, API, Auth } from "aws-amplify"
import ChangePassword from "../components/changePassword"

const Account = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse(sort: { fields: title, order: ASC }) {
        edges {
          node {
            id
            title
            slug
            # date(formatString: "D/M/YYYY")
            # rawDate: date
            price
            numberOfDays
            tags
            # city
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
  const [activeItem, setActiveItem] = useState("Mina kurser")

  //   if (typeof window !== "undefined") {
  //     var { user } = useUser()
  //   }

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
      <Segment vertical style={{ border: "none" }}>
        <Container text>
          <Menu pointing secondary size="big">
            <Menu.Item
              active={activeItem === "Mina kurser"}
              onClick={() => setActiveItem("Mina kurser")}
            >
              Mina kurser
            </Menu.Item>
            {/* <Menu.Item
              active={activeItem === "Avklarade kurser"}
              onClick={() => setActiveItem("Avklarade kurser")}
            >
              Avklarade kurser
            </Menu.Item> */}
            <Menu.Menu position="right">
              <Menu.Item
                name="settings"
                active={activeItem === "Inställningar"}
                onClick={() => setActiveItem("Inställningar")}
              >
                <Icon name="setting" />
                Inställningar
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
      <Segment vertical>
        <Container text>
          <Segment>
            <Item.Group divided>
              {userCourses &&
                activeItem === "Mina kurser" &&
                userCourses
                  //   .filter(course => new Date(course.node.rawDate) > new Date())
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
              {/* {userCourses &&
                activeItem === "Avklarade kurser" &&
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
                  })} */}
              {activeItem === "Inställningar" && (
                <Container>
                  <h3>Ändra lösenord</h3>
                  <ChangePassword />
                </Container>
              )}
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
