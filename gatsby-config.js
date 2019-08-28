module.exports = {
  siteMetadata: {
    title: `e2p`,
    description: `e2p`,
    author: `Sebastian Gelotte`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-stripe-checkout", // why is this needed?
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: "on5mzd6mcavd",
        accessToken: "HKkUw5FREJp_HT06MwFUc0SCdHPVrzWRULzv8PYxTRQ",
      },
    },
  ],
}
