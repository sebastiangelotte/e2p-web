import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { BsSearch, BsEnvelope, BsChatDots } from "react-icons/bs"
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
import Profile from "../components/profile"
import decoration1 from "../images/decoration1.svg"
import decoration2 from "../images/decoration2.svg"
import decoration3 from "../images/decoration3.svg"
import decoration4 from "../images/decoration4.svg"

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

  const courseLeader = {
    image: {
      fixed: {
        src:
          "//images.ctfassets.net/on5mzd6mcavd/6Ur8ZSApaTdmHRjftJFeLB/74f9567ce4eecd4b697365fda5681ae5/woman6.jpg?w=400&q=50",
      },
    },
    name: "Kursledare matchas utifrån ert behov",
    slug: "tbd2",
  }

  return (
    <Layout>
      <Head
        title="Kurser"
        description="Vi utvecklar och genomför behovsanpassade kurser för medarbetare och chefer."
      />
      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <Heading as="h1" inverted>
            Färdiga kurspaket
          </Heading>
          <p>
            Vi hjälper företag och organisationer att ta fram och genomföra
            <b> företagsanpassade</b> kurser. <br />
            <b>Du väljer datum och tid som passar!</b>
          </p>
          <p>
            <Link to="/our-process">Läs mer om hur vi bygger din kurs.</Link>
          </p>
          <p>
            Hittar du inte vad du söker?{" "}
            <Link to="/customCourse">Forma din egen kurs</Link> med hjälp av
            våra utbildningsspecialister.
          </p>
          <Profile profile={courseLeader} />
          <Filter
            items={data.allContentfulCourse.edges}
            onChange={updateCourses}
          />
        </Inner>
      </SectionWithBackgroundImage>
      <Section background style={{ position: "relative", zIndex: "1" }}>
        <Decoration src={decoration1} alt="decoration" top={80} left={-50} />
        <Decoration src={decoration2} alt="decoration" top={300} left={200} />
        <Decoration src={decoration3} alt="decoration" top={50} left={200} />
        <Decoration
          src={decoration4}
          alt="decoration"
          bottom={50}
          right={-48}
        />
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

const Decoration = styled.img`
  pointer-events: none;
  position: absolute;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  z-index: -1;
`
