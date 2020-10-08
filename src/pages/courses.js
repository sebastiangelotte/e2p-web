import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Head from "../components/head"
import Layout from "../components/layout"
import { Link } from "gatsby"
import styled from "styled-components"
import bg from "../images/hero-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
  Tag,
} from "../components/new/styledComponents"
import Filter from "../components/filter"
import {
  BsFillTagFill,
  BsSearch,
  BsEnvelope,
  BsChatDots,
  BsBuilding,
} from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"

const Courses = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse(sort: { fields: title, order: ASC }) {
        edges {
          node {
            title
            slug
            price
            numberOfDays
            tags
            companyInternalCourse
            onlineCourse
            onSite
            shortDescription

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
      }
    }
  `)

  const [courses, setCourses] = useState(data.allContentfulCourse.edges)

  const updateCourses = courses => {
    if (courses.length > 0) {
      setCourses(courses)
    } else {
      setCourses([]) // reset state
    }
  }

  return (
    <Layout>
      <Head title="Kurser" />
      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <Heading as="h1" inverted>
            Kurser
          </Heading>
          <p>
            Kunskap är färskvara. Även om man har lång erfarenhet inom sitt
            område behöver man ibland uppdatera, fylla på och komplettera med ny
            kunskap för att kunna prestera optimalt i det dagliga arbetet.
          </p>
          <p>
            Vi utvecklar och genomför behovsanpassade kurser för medarbetare och
            chefer.
          </p>
        </Inner>
      </SectionWithBackgroundImage>
      <Section background>
        <Inner>
          <FilterWrapper>
            <Filter
              courses={data.allContentfulCourse.edges}
              onChange={updateCourses}
            />
          </FilterWrapper>
          <Grid>
            <CourseList>
              <AnimatePresence>
                {courses.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CourseListItem to={`/courses/${course.node.slug}`}>
                      <Title>{course.node.title}</Title>
                      <ShortDescription>
                        {course.node.shortDescription}
                      </ShortDescription>
                      <TagWrapper>
                        {course.node.tags?.map(tag => {
                          return (
                            <span key={tag}>
                              <BsFillTagFill /> {tag}
                            </span>
                          )
                        })}
                      </TagWrapper>
                      <TagWrapper>
                        <span>Tillgänglighet: </span>
                        {course.node.onlineCourse && <span>🟢 Online</span>}
                        {course.node.onSite && (
                          <span>
                            <BsBuilding /> On-site
                          </span>
                        )}
                      </TagWrapper>
                    </CourseListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CourseList>
            <HowTo>
              <h3>Så här går du vidare</h3>
              <ul>
                <li>
                  <p>
                    <BsSearch />
                  </p>
                  <p>Hitta en kurs som passar dig</p>
                </li>
                <li>
                  <p>
                    <BsChatDots />
                  </p>
                  <p>Boka direkt eller ställ frågor till oss</p>
                </li>
                <li>
                  <p>
                    <BsEnvelope />
                  </p>
                  <p>Du blir kontaktad av kursansvarig</p>
                </li>
              </ul>
            </HowTo>
          </Grid>
        </Inner>
      </Section>
    </Layout>
  )
}

export default Courses

const CourseList = styled.div``

const CourseListItem = styled(Link)`
  display: block;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  border-radius: 18px;
  padding: 15px 30px;
  margin-bottom: 20px;
  background-color: #fff;
  color: var(--color-heading);
`

const Title = styled.h3`
  font-size: 20px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`

const FilterWrapper = styled.div`
  margin-bottom: 20px;
`

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  > * {
    margin-right: 20px;
    margin-bottom: 10px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 30px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const HowTo = styled.div`
  padding: 0 15px;
  color: var(--color-heading);
  text-align: center;

  h3 {
    font-style: italic;
  }

  ul {
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-gap: 30px;
  }

  svg {
    font-size: 30px;
  }
`

const ShortDescription = styled.div`
  color: var(--color-text);
  margin-bottom: 25px;
`
