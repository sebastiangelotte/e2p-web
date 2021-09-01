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
import ArticleItem from "../components/articleItem"
import CourseLeaderCard from "../components/course-leader/courseLeaderCard"
import decoration1 from "../images/decoration1.svg"
import decoration2 from "../images/decoration2.svg"
import decoration3 from "../images/decoration3.svg"
import decoration4 from "../images/decoration4.svg"

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
      courseLeaders {
        image {
          fixed {
            src
          }
        }
        description {
          json
        }
        name
        title
        slug
      }
    }
    allContentfulCourse(
      filter: {
        courseLeadersOpenCourse: { elemMatch: { slug: { eq: $slug } } }
      }
    ) {
      edges {
        node {
          title
          slug
          price
          tags
          companyInternalCourse
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
          courseLeaders: courseLeadersOpenCourse {
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
  const articles = props.data.allContentfulTool.edges
  const connectedCourseLeaders = props.data.contentfulCourseLeader.courseLeaders

  return (
    <Layout transparentNavigation>
      <Head title={`Profil: ${profile.name}`} description={profile.title} />
      <SectionWithBackgroundImage backgroundImage={bg} firstSection>
        <StyledInner>
          <CourseLeader data={profile} />
        </StyledInner>
      </SectionWithBackgroundImage>
      <StyledSection>
        <Decoration src={decoration1} alt="decoration" top={80} left={-50} />
        <Decoration src={decoration2} alt="decoration" top={300} left={200} />
        <Decoration src={decoration3} alt="decoration" top={50} left={200} />
        <Decoration
          src={decoration4}
          alt="decoration"
          bottom={50}
          right={-48}
        />
        <StyledInner>
          {connectedCourseLeaders && (
            <Heading>Träffa några av våra ✨fantastiska✨ kursledare</Heading>
          )}
          <Grid>
            {connectedCourseLeaders?.map((connectedCourseLeader, i) => (
              <CourseLeaderCard key={i} courseLeader={connectedCourseLeader} />
            ))}
          </Grid>
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
        </StyledInner>
      </StyledSection>
    </Layout>
  )
}

export default Profile

const StyledSection = styled(Section)`
  position: relative;
`

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

const Decoration = styled.img`
  pointer-events: none;
  position: absolute;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  z-index: -1;
`
