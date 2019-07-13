import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import { 
    Card,
    Icon,
    Segment,
    Container,
    Header
} from 'semantic-ui-react'

import Head from '../components/head'
import Layout from '../components/layout'
import Filter from '../components/filter'

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

const Tools = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulTool {
                edges {
                    node {
                        slug
                        title
                        tags
                        description {
                            json
                        }
                    }
                }
            }
        }
    `)

    const [tools, setTools] = useState(data.allContentfulTool.edges)

    const updateTools = tools => {
        if (tools.length > 0) {
            setTools(tools)
        } else {
            setTools(data.allContentfulTool.edges) // reset state
        }
    }

    return (
        <Layout>
            <Head title="Verktyg" />
            <Segment style={style.segment} textAlign="center" vertical color="blue" inverted>
                <Container text>
                    <Header as="h1" inverted>Gratis checklistor och mallar</Header>
                    <div>
                        <p>Easy2perform utvecklar kontinuerligt praktiska checklistor och mallar för att ge stöd och vägledning till svåra och komplexa arbetsuppgifter i det dagliga arbetet. Våra enkla och effektiva verktyg gör det enklare för dig att prestera i yrkesrollen.</p>
                        <Filter data={data.allContentfulTool.edges} onChange={updateTools} />
                    </div>
                </Container>
            </Segment>
            <Segment style={style.segment} vertical center>
                <Container text>
                    <Card.Group centered>
                        {data.allContentfulTool.edges.map((edge, index) => {
                            return (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link to={`/tools/${edge.node.slug}`} key={index}>
                                                {edge.node.title}
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
                </Container>
            </Segment>
        </Layout>
    )
}

export default Tools
