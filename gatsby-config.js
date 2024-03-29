require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `e2p`,
    description: `e2p`,
    author: `Sebastian Gelotte`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://easy2perform.us17.list-manage.com/subscribe/post?u=bcd516fbabfad6023116c3f82&id=5873d8195e",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `easy2perform`,
        short_name: `easy2perform`,
        start_url: `/`,
        background_color: `#2185d0`,
        theme_color: `#2185d0`,
        display: `standalone`,
        icon: `src/images/logo-circle.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    /*     {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-8120970-6",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
      },
    }, */
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-YZD3EEBL7R", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1621963837942974",
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Crimson Text:400,600`, `Lato:400,400i,700,700i`],
      },
    },
    {
      resolve: "gatsby-plugin-crisp-chat",
      options: {
        websiteId: "fab1efa6-8c31-4066-b280-8ab46230ec88",
        enableDuringDevelop: true, // Optional. Disables Crisp Chat during gatsby develop. Defaults to true.
        defer: false, // Optional. Sets the Crisp loading script to defer instead of async. Defaults to false.
        enableImprovedAccessibility: false, // Optional. Sets aria-label attribute on pop-up icon for screen readers. Defaults to true.
      },
    },
    {
      resolve: `gatsby-plugin-portal`,
      options: {
        key: "modal",
        id: "modal",
      },
    },
    "gatsby-plugin-readingtime-contentful",
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`flex-gap-polyfill`)()],
      },
    },
  ],
}
