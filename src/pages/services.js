import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Card, Icon } from 'semantic-ui-react'
import Head from '../components/head'
import Layout from '../components/layout'

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
            {/* <ul>
                {data.allContentfulService.edges.map((edge, index) => {
                    return <li><Link to={`/services/${edge.node.slug}`} key={index}>{edge.node.title}</Link></li>
            </ul> */}
            <Card.Group centered>
            {data.allContentfulService.edges.map((edge, index) => {
                return (
                    <Card>
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
        </Layout>
    )
}

export default Services
