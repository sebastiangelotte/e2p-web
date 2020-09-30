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
import { BsFillTagFill } from "react-icons/bs"

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
          <CourseList>
            {courses.map((course, i) => (
              <CourseListItem to={`/courses/${course.node.slug}`} key={i}>
                <Title>{course.node.title}</Title>
                {course.node.tags?.map(tag => {
                  console.log(course)
                  return (
                    <Tag key={tag}>
                      <BsFillTagFill /> {tag}
                    </Tag>
                  )
                })}
                {course.node.onlineCourse && <Tag>🟢 Online</Tag>}
              </CourseListItem>
            ))}
          </CourseList>
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

  h3 {
    font-size: 22px;
  }
`

const Title = styled.h3``

const FilterWrapper = styled.div`
  margin-bottom: 20px;
`
