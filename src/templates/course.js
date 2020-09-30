import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseLeader from "../components/course-leader/courseLeader"
import SimpleCard from "../components/cards/simpleCard"
import CourseSignup from "../components/courseSignup"
import ContactForm from "../components/contactForm"
import styled from "styled-components"
import bg from "../images/hero-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
  Tag,
  Button,
} from "../components/new/styledComponents"
import RelatedGrid from "../components/new/relatedGrid"

const style = {
  segment: {
    paddingTop: "2em",
    paddingBottom: "6em",
    backgroundColor: "#f7f7f7",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

export const query = graphql`
  query($slug: String!) {
    contentfulCourse(slug: { eq: $slug }) {
      id
      title
      numberOfDays
      price
      companyInternalCourse

      description {
        json
      }
      practicalInfo {
        json
      }
      includedInfo {
        json
      }
      courseLeader {
        name
        title
        description {
          json
        }
        image {
          title
          fixed(width: 400) {
            width
            height
            src
          }
        }
      }
      linkedServices {
        slug
        title
        tags
        internal {
          type
        }
      }
      linkedCourses {
        slug
        title
        tags
        internal {
          type
        }
      }
      linkedTools {
        slug
        title
        tags
        internal {
          type
        }
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
`

const locationLink = (lat, lon) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
}

const Course = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["sv-SE"]
        const url = node.data.target.fields.file["sv-SE"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  const services = props.data.contentfulCourse.linkedServices || []
  const courses = props.data.contentfulCourse.linkedCourses || []
  const tools = props.data.contentfulCourse.linkedTools || []

  const relatedItems = [...services, ...courses, ...tools]

  const course = props.data.contentfulCourse

  return (
    <Layout transparentNavigation>
      <Head title={`Kurs: ${course.title}`} />

      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <Heading as="h1" inverted>
            {course.title}
          </Heading>
        </Inner>
      </SectionWithBackgroundImage>
      <Section>
        <Inner>
          {!course.companyInternalCourse && (
            <div>
              {course.kurstillflle &&
                course.kurstillflle.map(tillfalle => {
                  return <Tag>{`${tillfalle.city}: ${tillfalle.date}`}</Tag>
                })}
              <Tag>
                {course.numberOfDays} dag
                {course.numberOfDays > 1 ? "ar" : ""}
              </Tag>
              <Tag>{Number(course.price).toLocaleString()} SEK exkl. moms</Tag>
            </div>
          )}
        </Inner>
        <StyledInner>
          <Description>
            {documentToReactComponents(course.description.json, options)}
            {course.companyInternalCourse && (
              <div>
                <h2>Önskar du prisförslag för företagsintern kurs?</h2>
                <p>
                  Beskriv dina önskemål, så sänder vi dig en offert
                  kostnadsfritt.
                </p>
              </div>
            )}
            {!course.companyInternalCourse && (
              <div>
                Önskar du få kursen genomförd som företagsintern utbildning?
                <p>
                  <i>
                    Vi anpassar kursen utifrån gruppens behov och genomför när
                    det passar er och på den ort ni önskar. Beskriv dina
                    önskemål, så sänder vi dig kostnadsfri offert.
                  </i>
                </p>
                <ContactForm source={course.title} />
              </div>
            )}
          </Description>
          <ExtraInfo>
            {course.courseLeader && <CourseLeader data={course.courseLeader} />}
            {course.practicalInfo && (
              <div>
                {documentToReactComponents(course.practicalInfo.json, options)}
                {!course.companyInternalCourse &&
                  course.kurstillflle &&
                  course.kurstillflle.map(tillfalle => {
                    return (
                      <a
                        href={locationLink(
                          tillfalle.location.lat,
                          tillfalle.location.lon
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>
                          {tillfalle.city} {tillfalle.date}
                        </Button>
                      </a>
                    )
                  })}
              </div>
            )}
            {course.includedInfo && (
              <div>
                {documentToReactComponents(course.includedInfo.json, options)}
              </div>
            )}

            <div style={{ display: "none" }}>
              <CourseSignup
                courseName={course.title}
                courseID={course.id}
                courseDates={course.kurstillflle}
              />
            </div>
          </ExtraInfo>
        </StyledInner>
      </Section>
      {relatedItems.length !== 0 && (
        <Section gradient>
          <RelatedGrid items={relatedItems} title="Mer från easy2perform" />
        </Section>
      )}
    </Layout>
  )
}

export default Course

const StyledInner = styled(Inner)`
  display: flex;
  justify-content: space-between;
`

const Description = styled.div`
  flex-basis: 680px;
  padding-right: 40px;
`

const ExtraInfo = styled.div`
  flex-basis: 300px;
`
