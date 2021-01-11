import React from "react"
import { graphql } from "gatsby"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import bg from "../images/hero-bg.svg"
import {
  Section,
  Heading,
  SectionWithBackgroundImage,
  Inner,
} from "../components/styledComponents"
import CourseLeader from "../components/course-leader/courseLeader"
import CourseItem from "../components/courseItem"
import ArticleItem from "../components/articleItem"

export const query = graphql`
  query($slug: String!) {
    contentfulCourseLeader(slug: { eq: $slug }) {
      name
      title
      image {
        title
        fixed(width: 400) {
          width
          height
          src
        }
      }
      description {
        json
      }
    }
    allContentfulCourse(
      filter: { courseLeaders: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          title
          slug
          price
          tags
          companyInternalCourse
          openCourse
          onlineCourse
          onSite
          shortDescription
          kurstillflle {
            city
            shortDate: date(formatString: "DD/MM/YYYY")
            fullDate: date(formatString: "DD MMMM YYYY")
            title
            location {
              lat
              lon
            }
          }
          courseLeaders {
            slug
            name
            title
            image {
              title
              fixed(width: 400) {
                width
                height
                src
              }
            }
          }
        }
      }
    }
    allContentfulTool(filter: { author: { slug: { eq: $slug } } }) {
      edges {
        node {
          slug
          title
          shortDescription
          tags
          description {
            json
            fields {
              readingTime {
                minutes
              }
            }
          }
          shortDate: createdAt(formatString: "DD MMM")
          fullDate: createdAt(formatString: "DD MMMM YYYY")
          author {
            slug
            name
            title
            image {
              title
              fixed(width: 400) {
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
`

const Profile = props => {
  const profile = props.data.contentfulCourseLeader
  const courses = props.data.allContentfulCourse.edges
  const articles = props.data.allContentfulTool.edges

  return (
    <Layout transparentNavigation>
      <Head title={`Profil: ${profile.name}`} description={profile.title} />
      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <CourseLeader data={profile} />
        </StyledInner>
      </SectionWithBackgroundImage>
      <StyledSection>
        <StyledInner>
          {articles.length > 0 && (
            <>
              <Heading>Artiklar</Heading>
              <Grid>
                {articles.map((article, i) => (
                  <ArticleItem key={i} article={article.node} />
                ))}
              </Grid>
            </>
          )}
          {courses.length > 0 && (
            <>
              <Heading>Kurser</Heading>
              {courses.map((course, i) => (
                <CourseItem course={course.node} />
              ))}
            </>
          )}
        </StyledInner>
      </StyledSection>
    </Layout>
  )
}

export default Profile

const StyledSection = styled(Section)``

const StyledInner = styled(Inner)``

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  margin-bottom: 30px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`
