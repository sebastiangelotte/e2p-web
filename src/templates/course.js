import React from 'react'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Card, Icon } from 'semantic-ui-react'
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
            linkedServices {
                slug
                title
            }
            linkedCourses {
                slug
                title
            }
            linkedTools {
                slug
                title
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
                                    <div className="backlink"><Link to="/courses">&lt; Tillbaka till kurser</Link></div>
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

            {/* LINKED SERVICES */}
            {props.data.contentfulCourse.linkedServices &&
                <>
                    <h3>Relaterade tjänster</h3>
                    <Card.Group>
                        {props.data.contentfulCourse.linkedServices.map((service, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link to={`/services/${service.slug}`}>
                                                {service.title}
                                            </Link>
                                        </Card.Header>
                                    </Card.Content>
                                    {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                                    <Card.Content extra>
                                        <Icon name='user' />
                                        Extra info
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </Card.Group>
                </>
            }

            {/* LINKED COURSES */}
            {props.data.contentfulCourse.linkedCourses &&
                <>
                    <h3>Relaterade Kurser</h3>
                    <Card.Group>
                        {props.data.contentfulCourse.linkedCourses.map((course, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link to={`/courses/${course.slug}`}>
                                                {course.title}
                                            </Link>
                                        </Card.Header>
                                    </Card.Content>
                                    {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                                    <Card.Content extra>
                                        <Icon name='user' />
                                        Extra info
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </Card.Group>
                </>
            }

            {/* LINKED TOOLS */}
            {props.data.contentfulCourse.linkedTools &&
                <>
                    <h3>Relaterade verktyg</h3>
                    <Card.Group>
                        {props.data.contentfulCourse.linkedTools.map((tool, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link to={`/tools/${tool.slug}`}>
                                                {tool.title}
                                            </Link>
                                        </Card.Header>
                                    </Card.Content>
                                    {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
                                    <Card.Content extra>
                                        <Icon name='user' />
                                        Extra info
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </Card.Group>
                </>
            }
        </Layout>
     )
}
 
export default Course
