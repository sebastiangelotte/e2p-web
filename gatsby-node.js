const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const companyInternalCourseTemplate = path.resolve(
    "./src/templates/companyInternalCourse.js"
  )
  const openCourseTemplate = path.resolve("./src/templates/openCourse.js")

  const toolTemplate = path.resolve("./src/templates/tool.js")
  const serviceTemplate = path.resolve("./src/templates/service.js")
  const profileTemplate = path.resolve("./src/templates/profile.js")

  const res = await graphql(`
    query {
      companyInternalCourses: allContentfulCourse(
        filter: { companyInternalCourse: { eq: true } }
      ) {
        edges {
          node {
            slug
          }
        }
      }
      openCourses: allContentfulCourse(filter: { openCourse: { eq: true } }) {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulTool {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulService {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulCourseLeader {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  res.data.companyInternalCourses.edges.forEach(edge => {
    createPage({
      component: companyInternalCourseTemplate,
      path: `/courses/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  res.data.openCourses.edges.forEach(edge => {
    createPage({
      component: openCourseTemplate,
      path: `/openCourses/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  res.data.allContentfulTool.edges.forEach(edge => {
    createPage({
      component: toolTemplate,
      path: `/tools/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  res.data.allContentfulService.edges.forEach(edge => {
    createPage({
      component: serviceTemplate,
      path: `/services/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })

  res.data.allContentfulCourseLeader.edges.forEach(edge => {
    createPage({
      component: profileTemplate,
      path: `/profile/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
