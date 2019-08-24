import React from "react"
import { Link } from "gatsby"

import { Card } from "semantic-ui-react"

const SimpleCard = ({ title, link }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link to={link}>{title}</Link>
        </Card.Header>
      </Card.Content>
      {/* <Card.Content description={documentToReactComponents(edge.node.description.json)} /> */}
      {/* <Card.Content extra>
        <Icon name="user" />
        Extra info
      </Card.Content> */}
    </Card>
  )
}

export default SimpleCard
