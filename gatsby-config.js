module.exports = {
  siteMetadata: {
    title: `e2p`,
    description: `e2p`,
    author: `Sebastian Gelotte`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-stripe-checkout', // why is this needed?
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://pedantic-morse-58901e.netlify.com/` // required!
      }
    }
  ]
}
