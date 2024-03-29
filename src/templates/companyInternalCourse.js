import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { options } from "../richTextRendererOptions"
import Head from "../components/head"
import Layout from "../components/layout"
import styled from "styled-components"
import bg from "../images/section-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
} from "../components/styledComponents"
import RelatedGrid from "../components/relatedGrid"
import ExpandableCard from "../components/expandableCard"
import { IntersectionObserver } from "../components/intersectionObserver"
import { ScaleBox } from "../components/scaleBox"
import Share from "../components/share"
import CourseInstance from "../components/courseInstance"
import Profile from "../components/profile"
import { BsArrowLeftShort } from "react-icons/bs"

export const query = graphql`
  query($slug: String!) {
    contentfulCourse(slug: { eq: $slug }) {
      id
      title
      duration
      price
      shortDescription
      companyInternalCourse
      onlineCourse
      onSite

      description {
        json
      }
      infoBoxesCompanyInternalCourse {
        title
        description {
          json
        }
      }
      courseLeaders {
        slug
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
        title
        slug
        tags
        companyInternalCourse
        onlineCourse
        onSite
        shortDescription

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
        internal {
          type
        }
      }
      linkedTools {
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
        internal {
          type
        }
        createdAt(formatString: "DD MMM, YYYY")
      }
    }
  }
`

const companyInternalCourse = {
  date: "Du väljer datum",
  online: false,
  city: "Du väljer plats",
}

const Course = props => {
  const course = props.data.contentfulCourse
  const services = course.linkedServices || []
  const courses = course.linkedCourses || []
  const tools = course.linkedTools || []

  const relatedItems = [...services, ...courses, ...tools]

  console.log(course)

  return (
    <Layout>
      <Head
        title={`Kurs: ${course.title}`}
        description={course.shortDescription}
      />

      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <BackButton to="/courses">
            <BsArrowLeftShort /> Alla kurser
          </BackButton>
          <StyledHeading as="h1" inverted>
            {course.title}
          </StyledHeading>
          <p>{course.shortDescription}</p>
          {course.courseLeaders?.map((courseLeader, i) => (
            <Profile profile={courseLeader} key={i} />
          ))}
        </Inner>
      </SectionWithBackgroundImage>
      <Section background>
        <StyledInner>
          <Description>
            <ExpandableCard heading="Kursbeskrivning" forceOpen>
              {documentToReactComponents(course.description.json, options)}
            </ExpandableCard>
            {course.infoBoxesCompanyInternalCourse?.map((box, i) => (
              <ExpandableCard heading={box.title} key={i}>
                <div>
                  {documentToReactComponents(box.description.json, options)}
                </div>
              </ExpandableCard>
            ))}
          </Description>
          <ExtraInfo>
            <IntersectionObserver>
              <ScaleBox>
                <List>
                  <li>
                    <div>
                      <CourseInstance
                        instance={companyInternalCourse}
                        course={course}
                        customRequest
                      />
                    </div>
                  </li>
                </List>
                <StyledShare title="Kurser" />
              </ScaleBox>
            </IntersectionObserver>
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
  grid-gap: 10px 50px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Description = styled.div``

const ExtraInfo = styled.div`
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
  @media screen and (max-width: 900px) {
    order: -1;
  }
`

const StyledHeading = styled(Heading)``

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  font-size: 18px;
  color: var(--color-heading);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;

    li {
      flex: 1 0 250px;
    }
  }
`

const StyledShare = styled(Share)``

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }

  > svg {
    font-size: 24px;
  }
`
