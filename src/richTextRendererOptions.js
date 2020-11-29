import React from "react"
import { BLOCKS } from "@contentful/rich-text-types"
import EmbeddedCourseItem from "./components/embeddedCourseItem"
import EmbeddedToolItem from "./components/embeddedToolItem"

export const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      console.log(node)
      const fields = node.data.target.fields
      const contentType = node.data.target.sys.contentType.sys.id

      switch (contentType) {
        case "course":
          console.log(fields)
          const course = {
            slug: fields.slug.sv,
            title: fields.title.sv,
            shortDescription: fields.shortDescription.sv,
          }
          return <EmbeddedCourseItem course={course} />
        case "tool":
          const tool = {
            slug: fields.slug.sv,
            title: fields.title.sv,
            shortDescription: fields.shortDescription.sv,
          }
          return <EmbeddedToolItem tool={tool} />
        default:
          return <pre>Content type not supported: {contentType}</pre>
      }
    },
    "embedded-asset-block": node => {
      const alt = node.data.target.fields.title.sv
      const url = node.data.target.fields.file.sv.url
      return <img alt={alt} src={url} />
    },
  },
}
