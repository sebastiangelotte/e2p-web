import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Card, Icon } from 'semantic-ui-react'
import Head from '../components/head'
import Layout from '../components/layout'

const Tools = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulTool {
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
        </Layout>
    )
}

export default Tools
