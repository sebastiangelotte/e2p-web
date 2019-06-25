import React from 'react'
import { graphql } from 'gatsby'

import Head from '../components/head'
import Layout from '../components/layout'

export const query = graphql`
    query($slug: String!) {
        contentfulService(slug: { eq: $slug }) {
            title
        }
    }
`

const Service = (props) => {
    return (
        <Layout>
            <Head title={`Verktyg: ${props.data.contentfulService.title}`} />
            <div>{props.data.contentfulService.title}</div>
        </Layout>
     )
}
 
export default Service
