import React from 'react'
import { graphql } from 'gatsby'

import Head from '../components/head'
import Layout from '../components/layout'

export const query = graphql`
    query($slug: String!) {
        contentfulTool(slug: { eq: $slug }) {
            title
        }
    }
`

const Tool = (props) => {
    return (
        <Layout>
            <Head title={`Verktyg: ${props.data.contentfulTool.title}`} />
            <div>{props.data.contentfulTool.title}</div>
        </Layout>
     )
}
 
export default Tool
