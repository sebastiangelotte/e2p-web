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
} from "../components/styledComponents"
import RelatedGrid from "../components/relatedGrid"
import ExpandableCard from "../components/expandableCard"
import { BsClock, BsTag, BsCalendar, BsBuilding } from "react-icons/bs"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"
import Modal from "../components/modal"

export const query = graphql`
  query($slug: String!) {
    contentfulCourse(slug: { eq: $slug }) {
      id
      title
      numberOfDays
      price
      shortDescription
      companyInternalCourse
      openCourse
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
  const [showOpenSignupModal, setShowOpenSignupModal] = useState(false)
  const [
    showCompanyInternalSignupModal,
    setShowCompanyInternalSignupModal,
  ] = useState(false)
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

  const course = props.data.contentfulCourse

  const services = course.linkedServices || []
  const courses = course.linkedCourses || []
  const tools = course.linkedTools || []

  const relatedItems = [...services, ...courses, ...tools]

  return (
    <Layout>
      <Head
        title={`Kurs: ${course.title}`}
        description={course.shortDescription}
      />

      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <StyledHeading as="h1" inverted>
            {course.title}
          </StyledHeading>
          <p>{course.shortDescription}</p>
          <IntersectionObserver>
            <ScaleBox>
              <h4 style={{ fontSize: "22px", paddingTop: "20px" }}>
                Kurs på företaget?
              </h4>
              <p style={{ fontSize: "18px" }}>
                Önskar du få kursen genomförd som företagsintern utbildning?
              </p>
              {course.companyInternalCourse && (
                <QuoteButton
                  onClick={() => setShowCompanyInternalSignupModal(true)}
                  autoWidth
                >
                  Begär offert
                </QuoteButton>
              )}
              {course.companyInternalCourse && (
                <Modal
                  isOpen={showCompanyInternalSignupModal}
                  closeModal={() => setShowCompanyInternalSignupModal(false)}
                >
                  <>
                    <h3>Begär offert</h3>
                    <p>
                      Beskriv dina önskemål, så sänder vi dig en offert
                      kostnadsfritt.
                    </p>
                    <ContactForm source={course.title} />
                  </>
                </Modal>
              )}
            </ScaleBox>
          </IntersectionObserver>
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
            {course.courseLeader && (
              <ExpandableCard heading="Kursledare" forceOpen>
                <CourseLeader data={course.courseLeader} />
              </ExpandableCard>
            )}
            <ExpandableCard heading="Kursbeskrivning" forceOpen>
              {documentToReactComponents(course.description.json, options)}
            </ExpandableCard>
            {course.includedInfo && (
              <ExpandableCard heading="Vad som ingår">
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
                        {course.kurstillflle.length > 0 ? (
                          course.kurstillflle.map((tillfalle, i) => {
                            return (
                              <li key={i}>
                                <BsCalendar />{" "}
                                {`${tillfalle.title}: ${tillfalle.date}`}
                              </li>
                            )
                          })
                        ) : (
                          <li>Fråga oss för bokning.</li>
                        )}
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
                      {course.onlineCourse && (
                        <li>
                          <span role="img" aria-label="online">
                            🟢 Online
                          </span>
                        </li>
                      )}
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

              <IntersectionObserver>
                <ScaleBox>
                  {course.openCourse && (
                    <BookButton onClick={() => setShowOpenSignupModal(true)}>
                      Boka
                    </BookButton>
                  )}
                  <AskButton onClick={() => setShowContactModal(true)}>
                    Fråga oss
                  </AskButton>
                </ScaleBox>
              </IntersectionObserver>
              {course.openCourse && (
                <Modal
                  isOpen={showOpenSignupModal}
                  closeModal={() => setShowOpenSignupModal(false)}
                >
                  <>
                    <CourseSignup
                      courseName={course.title}
                      courseID={course.id}
                      courseDates={course.kurstillflle}
                    />
                  </>
                </Modal>
              )}
              <Modal
                isOpen={showContactModal}
                closeModal={() => setShowContactModal(false)}
              >
                <h3>Fråga oss</h3>
                <ContactForm source={course.title} />
              </Modal>
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

const QuoteButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-size: 18px;
  font-weight: bold;
  padding: 18px 45px 16px 45px;
  width: 100%;
  ${props =>
    props.autoWidth &&
    `
    width: auto;
  `}
`

const AskButton = styled(Button)`
  border: none;
  font-size: 18px;
  font-weight: bold;
  padding: 18px 45px 16px 45px;
  width: 100%;
`
