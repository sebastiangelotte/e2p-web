import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

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
                    }
                }
            }
        }
    `)
    return (
        <Layout>
            <Head title="Verktyg" />
            <ul>
                {data.allContentfulService.edges.map((edge, index) => {
                    return <li><Link to={`/services/${edge.node.slug}`} key={index}>{edge.node.title}</Link></li>
                })}
            </ul>
        </Layout>
    )
}

export default Services
