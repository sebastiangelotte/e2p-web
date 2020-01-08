import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Card } from "semantic-ui-react"

const SimpleCard = ({ title, link }) => {
  return (
    <StyledCard>
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
    </StyledCard>
  )
}

export default SimpleCard

const StyledCard = styled(Card)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23030301' stroke-width='67.7' stroke-opacity='0.15' %3E%3Ccircle fill='%23179dc2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%231794ba' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23178bb2' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%231882a9' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%231979a1' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23197098' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%231a688f' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%231a5f87' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%231a577e' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%231a4f75' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%2319476c' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23183f63' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2317375a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23153051' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23132948' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2310223f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230e1b36' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230b142e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 150%;
`
