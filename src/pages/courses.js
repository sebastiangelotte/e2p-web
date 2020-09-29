import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Head from "../components/head"
import Layout from "../components/layout"
import { Link } from "gatsby"
import bg from "../images/hero-bg.svg"
import {
  Heading,
  SectionWithBackgroundImage,
  Inner,
} from "../components/new/styledComponents"

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
    </Layout>
  )
}

export default Courses
