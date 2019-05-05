import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Head from '../components/head'
import Layout from '../components/layout'

export const query = graphql`
    query($slug: String!) {
        contentfulCourse(slug: { eq: $slug }) {
            title
            date(formatString: "MMM Do, YYYY")
            description {
                json
            }
        }
    }
`

const Course = (props) => {
    const options = {
        renderNode: {
            "embedded-asset-block": (node) => {
                const alt = node.data.target.fields.title['en-US']
                const url = node.data.target.fields.file['en-US'].url
                return <img alt={alt} src={url} />
            }
        }
    }

    return (
        <Layout>
            <Head title={`Kurs: ${props.data.contentfulCourse.title}`} />
            <h1>{props.data.contentfulCourse.title}</h1>
            <p>{props.data.contentfulCourse.date}</p>
            {documentToReactComponents(props.data.contentfulCourse.description.json, options)}
        </Layout>
     )
}
 
export default Course
