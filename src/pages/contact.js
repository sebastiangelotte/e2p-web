import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import { Segment, Container, Header } from "semantic-ui-react"
import Head from "../components/head"
import ContactForm from "../components/contactForm"
import PageHeader from "../components/page-header/pageHeader"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
    backgroundColor: "#f7f7f7",
  },
  link: {
    paddingTop: "2em",
    display: "inline-block",
  },
}

const Contact = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage(filter: { title: { eq: "Kontakta oss" } }) {
        edges {
          node {
            title
            content {
              json
            }
          }
        }
      }
    }
  `)

  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["sv-SE"]
        const url = node.data.target.fields.file["sv-SE"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout transparentNavigation>
      <Head title={data.allContentfulPage.edges[0].node.title} />
      <PageHeader title={data.allContentfulPage.edges[0].node.title} />

      <Segment style={style.segment} vertical>
        <Container>
          {data.allContentfulPage.edges[0].node.content &&
            documentToReactComponents(
              data.allContentfulPage.edges[0].node.content.json,
              options
            )}
          <ContactForm source={data.allContentfulPage.edges[0].node.title} />
        </Container>
      </Segment>
    </Layout>
  )
}

export default Contact
