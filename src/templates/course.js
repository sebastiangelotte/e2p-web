import React, { useState } from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Head from "../components/head"
import Layout from "../components/layout"
import CourseLeader from "../components/course-leader/courseLeader"
import CourseSignup from "../components/courseSignup"
import ContactForm from "../components/contactForm"
import styled from "styled-components"
import bg from "../images/hero-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
  Button,
} from "../components/new/styledComponents"
import RelatedGrid from "../components/new/relatedGrid"
import ExpandableCard from "../components/new/expandableCard"
import { BsClock, BsTag, BsCalendar, BsBuilding } from "react-icons/bs"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"
import Modal from "../components/new/modal"

export const query = graphql`
  query($slug: String!) {
    contentfulCourse(slug: { eq: $slug }) {
      id
      title
      numberOfDays
      price
      companyInternalCourse
      shortDescription
      onlineCourse
      onSite

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

const Course = props => {
  const [showCourseSignupModal, setShowCourseSignupModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

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
    <Layout>
      <Head title={`Kurs: ${course.title}`} />

      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <StyledHeading as="h1" inverted>
            {course.title}
          </StyledHeading>
          <p>{course.shortDescription}</p>
        </Inner>
      </SectionWithBackgroundImage>
      <Section background>
        <StyledInner>
          <Description>
            {course.practicalInfo && (
              <ExpandableCard heading="Praktisk information">
                {documentToReactComponents(course.practicalInfo.json, options)}
              </ExpandableCard>
            )}
            <ExpandableCard heading="Kursbeskrivning" forceOpen>
              {documentToReactComponents(course.description.json, options)}
            </ExpandableCard>
            {course.courseLeader && (
              <ExpandableCard heading="Kursledare">
                <CourseLeader data={course.courseLeader} />
              </ExpandableCard>
            )}
            {course.includedInfo && (
              <ExpandableCard heading="Mer info">
                <div>
                  {documentToReactComponents(course.includedInfo.json, options)}
                </div>
              </ExpandableCard>
            )}
          </Description>
          <ExtraInfo>
            <StickyWrapper>
              <List>
                {course.kurstillflle && (
                  <li>
                    <div>
                      <ul>
                        <li>
                          <b>Kommande tillfällen:</b>
                        </li>
                        {course.kurstillflle.map((tillfalle, i) => {
                          return (
                            <li key={i}>
                              <BsCalendar />{" "}
                              {`${tillfalle.city}: ${tillfalle.date}`}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </li>
                )}
                <li>
                  <BsClock />
                  {course.numberOfDays} dag
                  {course.numberOfDays > 1 ? "ar" : ""}
                </li>
                {Number(course.price) !== 0 && (
                  <li>
                    <BsTag /> {Number(course.price).toLocaleString()} SEK exkl.
                    moms
                  </li>
                )}
                <li>
                  <div>
                    <ul>
                      <li>
                        <b>Tillgänglighet:</b>
                      </li>
                      {course.onlineCourse && <li>🟢 Online</li>}
                      {course.onSite && (
                        <li>
                          <span>
                            <BsBuilding /> On-site
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              </List>

              <Modal
                isOpen={showCourseSignupModal}
                closeModal={() => setShowCourseSignupModal(false)}
              >
                <CourseSignup
                  courseName={course.title}
                  courseID={course.id}
                  courseDates={course.kurstillflle}
                />
              </Modal>
              <Modal
                isOpen={showContactModal}
                closeModal={() => setShowContactModal(false)}
              >
                <h3>Fråga oss</h3>
                <ContactForm source={course.title} />
              </Modal>
              <IntersectionObserver>
                <ScaleBox>
                  <BookButton onClick={() => setShowCourseSignupModal(true)}>
                    Boka
                  </BookButton>
                  <AskButton onClick={() => setShowContactModal(true)}>
                    Fråga oss
                  </AskButton>
                </ScaleBox>
              </IntersectionObserver>
            </StickyWrapper>
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
  display: grid;
  grid-template-columns: 1fr minmax(auto, 250px);
  grid-gap: 50px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`

const Description = styled.div``

const ExtraInfo = styled.div`
  @media screen and (max-width: 900px) {
    order: -1;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 34px;
`

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 30px;
  font-size: 18px;
  color: var(--color-heading);
  line-height: 1.5;

  ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > svg {
      margin-right: 10px;
    }
  }
`

const BookButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-size: 18px;
  font-weight: bold;
  padding: 18px 45px 16px 45px;
  width: 100%;
`

const AskButton = styled(Button)`
  border: none;
  font-size: 18px;
  font-weight: bold;
  padding: 18px 45px 16px 45px;
  width: 100%;
`
