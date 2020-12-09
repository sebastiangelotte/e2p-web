import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import getShareImage from "@jlengstorf/get-share-image"

const Head = ({ title, description }) => {
  const socialImage = getShareImage({
    title: title,
    tagline: description,
    cloudName: "e2p",
    imagePublicID: "share-image",
    titleFont: "Lato",
    taglineFont: "Lato",
    textColor: "11033E",
    textAreaWidth: 631,
    textLeftOffset: 567,
    titleFontSize: 44,
    taglineFontSize: 30,
    titleBottomOffset: 310,
    taglineTopOffset: 310,
    imageWidth: 1280,
    imageHeight: 576,
    titleExtraConfig: "_bold",
  })

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
      <meta name="image" content={socialImage} />
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
