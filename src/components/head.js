import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Head = ({ title, description }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Helmet>
      <title>{`${title} | ${data.site.siteMetadata.title}`}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {/* <meta property="og:type" content="article" /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content="LINK TO THE IMAGE FILE" /> */}
      {/* <meta property="og:url" content="PERMALINK" /> */}
      <meta property="og:site_name" content="easy2perform.se" />
      <meta
        name="twitter:title"
        content={`${title} | ${data.site.siteMetadata.title}`}
      />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content="LINK TO IMAGE" /> */}
      <meta name="twitter:site" content="@easy2perform" />
      <meta name="twitter:creator" content="@easy2perform" />
    </Helmet>
  )
}

export default Head
