import React from 'react'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Card, Icon } from 'semantic-ui-react'
import Head from '../components/head'
import Layout from '../components/layout'

export const query = graphql`
    query($slug: String!) {
        contentfulTool(slug: { eq: $slug }) {
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

const Tool = (props) => {
    return (
        <Layout>
            <Head title={`Verktyg: ${props.data.contentfulTool.title}`} />
            <div className="backlink"><Link to="/tools">&lt; Tillbaka till verktyg</Link></div>
            <h1>{props.data.contentfulTool.title}</h1>
            <div>{documentToReactComponents(props.data.contentfulTool.description.json)}</div>
            {/* LINKED SERVICES */}
            {props.data.contentfulTool.linkedServices &&
                <>
                    <h3>Relaterade tjänster</h3>
                    <Card.Group>
                        {props.data.contentfulTool.linkedServices.map((service, index) => {
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
            {props.data.contentfulTool.linkedCourses &&
                <>
                    <h3>Relaterade Kurser</h3>
                    <Card.Group>
                        {props.data.contentfulTool.linkedCourses.map((course, index) => {
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
            {props.data.contentfulTool.linkedTools &&
                <>
                    <h3>Relaterade verktyg</h3>
                    <Card.Group>
                        {props.data.contentfulTool.linkedTools.map((tool, index) => {
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
 
export default Tool
