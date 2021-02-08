import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { BsSearch, BsEnvelope, BsChatDots, BsCheckCircle } from "react-icons/bs"
import Layout from "../components/layout"
import Head from "../components/head"
import bg from "../images/hero-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
} from "../components/styledComponents"
import Filter from "../components/filter"
import Newsletter from "../components/forms/newsletter"
import CourseItem from "../components/courseItem"

const Courses = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse(
        filter: { companyInternalCourse: { eq: true } }
        sort: { fields: title, order: ASC }
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
      <Head
        title="Kurser"
        description="Vi utvecklar och genomför behovsanpassade kurser för medarbetare och
            chefer."
      />
      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <Heading as="h1" inverted>
            Företagsinterna kurser
          </Heading>
          <p>
            Vi hjälper företag och organisationer att ta fram och genomföra
            <b> företagsanpassade</b> kurser. Utifrån kundens behov tar vi fram
            förslag på kursinnehåll och <b>matchar</b> mot kursledare med rätt
            erfarenhet. Vi genomför <b>behovsanalys</b> digitalt,{" "}
            <b>kvalitetssäkrar </b>
            kursinnehåll och kursledare samt genomför kursen företagsinternt (på
            plats) eller digitalt (live).
          </p>
          <p>
            <b>Du väljer datum och tid som passar!</b>
          </p>
          <Filter
            items={data.allContentfulCourse.edges}
            onChange={updateCourses}
          />
        </Inner>
      </SectionWithBackgroundImage>
      <Section background>
        <Inner>
          <Grid>
            <CourseList>
              <Total>
                Visar:{" "}
                {courses.length > 1
                  ? `${courses.length} kurser`
                  : `${courses.length} kurs`}
              </Total>
              <AnimatePresence>
                {courses.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CourseItem course={course.node} companyInternalCourse />
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
                  <p>Skicka förfrågan direkt eller ställ frågor till oss</p>
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
      <Newsletter />
    </Layout>
  )
}

export default Courses

const CourseList = styled.div`
  position: relative;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 30px;

  @media screen and (max-width: 900px) {
    display: block;
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

const Total = styled.div`
  color: var(--color-heading);
  font-weight: bold;
  position: absolute;
  top: -40px;
`
