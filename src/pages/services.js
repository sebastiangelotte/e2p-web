import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { 
    Card,
    Icon,
    Segment,
    Container,
    Header
} from 'semantic-ui-react'

import Head from '../components/head'
import Layout from '../components/layout'

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

const Services = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulService {
                edges {
                    node {
                        slug
                        title
                        description {
                            json
                        }
                    }
                }
            }
        }
    `)
    return (
        <Layout>
            <Head title="Verktyg" />
            <Segment style={style.segment} textAlign="center" vertical color="blue" inverted>
                <Container text>
                    <Header as="h1" inverted>Problemlösande tjänster</Header>
                    <div>
                        <p>Easy2perform erbjuder konsulttjänster för utveckling av organisation, chefer & medarbetare.</p>
                    </div>
                </Container>
            </Segment>
            <Segment style={style.segment} vertical center>
                <Container text>
                    <Card.Group centered>
                        {data.allContentfulService.edges.map((edge, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link to={`/services/${edge.node.slug}`} key={index}>
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

export default Services
