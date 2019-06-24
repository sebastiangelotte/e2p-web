import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Head from '../components/head'
import Layout from '../components/layout'
import CourseLeader from '../components/course-leader/courseLeader'

export const query = graphql`
    query($slug: String!) {
        contentfulCourse(slug: { eq: $slug }) {
            title
            date(formatString: "MMM Do, YYYY")
            description {
                json
            }
            courseLeader {
                name
                title
                description {
                    json
                }
                # image {
                #     title
                #     fixed(width: 400) {
                #         width
                #         height
                #         src
                #     }
                # }
            }
        }
    }
`

const Course = (props) => {
    const options = {
        renderNode: {
            "embedded-asset-block": (node) => {
                const alt = node.data.target.fields.title['sv-SE']
                const url = node.data.target.fields.file['sv-SE'].url
                return <img alt={alt} src={url} />
            }
        }
    }

    return (
        <Layout>
            <Head title={`Kurs: ${props.data.contentfulCourse.title}`} />
            <div className="course">
                <div className="background--white">
                    <section className="section section--extra-top-padding">
                        <div className="heading">
                            <h1 className="heading__headline">Kurs:</h1>
                            <span className="heading__text">
                                <p>{props.data.contentfulCourse.title}</p>
                            </span>
                        </div>
                        <button className="button button--centered">
                            <i className="fas fa-plus"></i>&nbsp;
                            <a href="/">Anmäl dig här</a>
                        </button>
                    </section>
                </div>
                <div className="background--white-opaque">
                    <section className="section section--grid">
                        <div className="section__column section__column--8 wysiwyg-content">
                            <section className="section section--grid section--wrap section--no-vertical-padding">
                                <div className="section__column section__column--12">
                                    <div className="backlink"><a href="/courses">&lt; Tillbaka till kurser</a></div>
                                    <p>{props.data.contentfulCourse.date}</p>
                                    {documentToReactComponents(props.data.contentfulCourse.description.json, options)}
                                    <button className="button">
                                        <i className="fas fa-plus"></i>&nbsp;
                                        <a href="/">Anmäl dig här</a>
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div className="section__column section__column--4 wysiwyg-content">
                            <CourseLeader data={props.data.contentfulCourse.courseLeader} />
                            <div className="teaser">
                                <h3 className="teaser__heading">Vad ingår i kursen?</h3>
                            </div>

                            <div className="teaser">
                                <h3 className="teaser__heading">Praktisk information</h3>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
     )
}
 
export default Course
