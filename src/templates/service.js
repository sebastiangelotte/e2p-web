import React from 'react'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Card, Icon } from 'semantic-ui-react'
import Head from '../components/head'
import Layout from '../components/layout'

export const query = graphql`
    query($slug: String!) {
        contentfulService(slug: { eq: $slug }) {
            title
            description {
                json
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

const Service = (props) => {
    return (
        <Layout>
            <Head title={`Tjänst: ${props.data.contentfulService.title}`} />
            <div className="backlink"><Link to="/services">&lt; Tillbaka till tjänster</Link></div>
            <h1>{props.data.contentfulService.title}</h1>
            <div>{documentToReactComponents(props.data.contentfulService.description.json)}</div>

            {/* LINKED SERVICES */}
            {props.data.contentfulService.linkedServices &&
                <>
                    <h3>Relaterade tjänster</h3>
                    <Card.Group>
                        {props.data.contentfulService.linkedServices.map((service, index) => {
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
            {props.data.contentfulService.linkedCourses &&
                <>
                    <h3>Relaterade Kurser</h3>
                    <Card.Group>
                        {props.data.contentfulService.linkedCourses.map((course, index) => {
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
            {props.data.contentfulService.linkedTools &&
                <>
                    <h3>Relaterade verktyg</h3>
                    <Card.Group>
                        {props.data.contentfulService.linkedTools.map((tool, index) => {
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
 
export default Service
