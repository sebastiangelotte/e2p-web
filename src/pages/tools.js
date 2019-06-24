import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

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
                    }
                }
            }
        }
    `)
    return (
        <Layout>
            <Head title="Verktyg" />
            <ul>
                {data.allContentfulTool.edges.map((edge, index) => {
                    return <li><Link to={`/tools/${edge.node.slug}`} key={index}>{edge.node.title}</Link></li>
                })}
            </ul>
        </Layout>
    )
}

export default Tools
