import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head"
import Layout from "../components/layout"
import ContactForm from "../components/contactForm"
import styled from "styled-components"
import RelatedGrid from "../components/relatedGrid"
import Share from "../components/share"
import bg from "../images/hero-bg.svg"
import {
  Section,
  Tag,
  Heading,
  SectionWithBackgroundImage,
  Inner,
  Button,
} from "../components/styledComponents"
import { options } from "../richTextRendererOptions"
import CourseLeader from "../components/course-leader/courseLeader"
import CourseItem from "../components/courseItem"
import Card from "../components/card"
import { BsArrowRightShort } from "react-icons/bs"
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

const CreatedAt = styled.p``

const StyledButton = styled(Button)`
  margin-top: auto;
  font-size: 16px;
  padding: 8px 10px 8px 20px;
  border-radius: 7px;

  > svg {
    margin: 0;
    margin-left: 7px;
  }
`

const TagsWrapper = styled.div`
  margin-top: -15px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  margin-bottom: 30px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`
