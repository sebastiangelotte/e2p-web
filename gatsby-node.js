const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const courseTemplate = path.resolve('./src/templates/course.js')
    const toolTemplate = path.resolve('./src/templates/tool.js')
    const serviceTemplate = path.resolve('./src/templates/service.js')

    const res = await graphql(`
        query {
            allContentfulCourse {
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
        }
    `)

    res.data.allContentfulCourse.edges.forEach((edge) => {
        createPage({
            component: courseTemplate,
            path: `/courses/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })

    res.data.allContentfulTool.edges.forEach((edge) => {
        createPage({
            component: toolTemplate,
            path: `/tools/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })

    res.data.allContentfulService.edges.forEach((edge) => {
        createPage({
            component: serviceTemplate,
            path: `/services/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })
}
