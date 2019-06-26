import React from 'react'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { 
    Card,
    Icon,
    Segment,
    Container,
    Header,
    Button
} from 'semantic-ui-react'

import Head from '../components/head'
import Layout from '../components/layout'
import CourseLeader from '../components/course-leader/courseLeader'

const style = {
    segment: {
        paddingTop: '6em',
        paddingBottom: '6em'
    },
    link: {
        paddingTop: '2em',
        display: 'inline-block'
    }
  }

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
            <Segment style={style.segment} textAlign="center" vertical color="blue" inverted>
                <Container text>
                    <Header as="h1" inverted>{props.data.contentfulCourse.title}</Header>
                    <p>{props.data.contentfulCourse.date}</p>
                    <a href="/"></a>
                    <Link style={style.link} to="/">
                        <Button content="Anmäl dig här" icon="arrow right" labelPosition="left" />
                    </Link>
                </Container>
            </Segment>
            <Segment style={style.segment} vertical center>
                <Container text>
                    {documentToReactComponents(props.data.contentfulCourse.description.json, options)}
                    <a href="/">Anmäl dig här</a>
                </Container>
            </Segment>
            <CourseLeader data={props.data.contentfulCourse.courseLeader} />

            Vad ingår i kursen?
            Praktisk information

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
