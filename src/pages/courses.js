import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import {
  Item,
  Segment,
  Container,
  Header
} from 'semantic-ui-react'

import Head from '../components/head'
import Layout from '../components/layout'
import CourseCard from '../components/course-card/courseCard'

const style = {
  segment: {
      paddingTop: '6em',
      paddingBottom: '6em'
  },
  link: {
      paddingTop: '2em',
      display: 'inline-block'
  }
}

const Courses = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse (
        sort: {
          fields: date,
          order: ASC
        }
      ) {
        edges {
          node {
            title
            slug
            date(formatString: "MMMM Do, YYYY")
            price
            numberOfDays,
            courseLeader {
              name
              image {
                    title
                    fixed(width: 26) {
                        width
                        height
                        src
                    }
                }
            }
          }
        }
      }
    }
  `)

    return (
      <Layout>
        <Head title="Kurser" />
        <Segment style={style.segment} textAlign="center" vertical color="blue" inverted>
            <Container text>
                <Header as="h1" inverted>Utvecklande kurser</Header>
                <div>
                  <p>Easy2perform utvecklar och genomför inspirerande kurser för din utveckling.</p>
                  <p>Vi följer nyheter, trender och målgruppsbehov inom exempelvis ledarskap, personal, HR, projektledning och utvecklar kurser som ger ökad kunskap och kompetens. Vi handplockar kursledare med rätt kompetens, erfarenhet och pedagogisk förmåga, för att ge dig den bästa upplevelsen.</p>
                </div>
            </Container>
        </Segment>
        <Segment style={style.segment} vertical center>
          <Container text>
            <Item.Group divided>
              {data.allContentfulCourse.edges.map((edge, index) => {
                return <CourseCard key={index} data={edge.node} />
              })}
            </Item.Group>
          </Container>
        </Segment>
      </Layout>
    )
}

export default Courses
