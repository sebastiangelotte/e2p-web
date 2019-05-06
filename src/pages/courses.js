import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Head from '../components/head'
import Layout from '../components/layout'
import CourseCard from '../components/course-card/courseCard'

const Courses = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCourse (
        sort: {
          fields: date,
          order: ASC
        }
      ) {
        edges {
          node {
            title
            slug
            date(formatString: "MMMM Do, YYYY")
            price
            numberOfDays
          }
        }
      }
    }
  `)

    return (
      <Layout>
        <Head title="Kurser" />
        <div className="courses">
          <div className="background--white">
            <section className="section section--extra-top-padding">
              <div className="heading">
                <h1 className="heading__headline">Kurser</h1>
                <span className="heading__text"><p>Här kan ni läsa mer om de kurser vi erbjuder under respektive område.</p></span>
              </div>
            </section>
          </div>
          <div className="background--white-light">
            <section className="section">
              <div className="section__column">
                <section className="section section--no-vertical-padding">
                  <div className="courses-list">
                    <h3>maj 2019</h3>
                    {data.allContentfulCourse.edges.map((edge, index) => {
                      return <CourseCard key={index} data={edge.node} />
                    })}
                  </div>
                </section>
              </div>
            </section>
          </div>
          <div className="background--blue">
            <section className="section section--grid section--center-content">
              <div className="section__column">
                <div className="pitch pitch--centered pitch--inverted">
                  <h2 className="pitch__heading">
                    Easy2perform – vi vill göra det enklare att prestera i yrkesrollen!
                  </h2>
                  <p className="pitch__text">
                    Vi som jobbar med Easy2perform fokuserar på att ge stöd och vägledning till företag, chefer och medarbetare. Oavsett om det sker genom våra gratislösningar på mobil &amp; webb, kurser eller konsulttjänster, levererar vi kunskap som gör det enklare att
                    prestera i yrkesrollen.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    )
}

export default Courses
