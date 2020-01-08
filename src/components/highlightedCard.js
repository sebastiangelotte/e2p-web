import React from "react"
import styled from "styled-components"
import { Label, Icon } from "semantic-ui-react"

const HighlightedCard = ({ data, highlighted }) => {
  return (
    <Wrapper highlighted={highlighted}>
      {highlighted && (
        <h4>
          <span role="img" aria-label="heart">
            ❤️
          </span>
          Populär
        </h4>
      )}
      <h3>{data.title}</h3>
      <Text>{data.shortDescription}</Text>
      <Tags>
        {data.tags &&
          data.tags.map((tag, index) => {
            return (
              <Label key={index} size="tiny" floated="left">
                <Icon name="tag" />
                {tag}
              </Label>
            )
          })}
      </Tags>
      {data.numberOfDays && (
        <Days>
          <Label basic>
            <Icon name="clock outline" />
            {data.numberOfDays} dag
            {data.numberOfDays > 1 ? "ar" : ""}
          </Label>
        </Days>
      )}
    </Wrapper>
  )
}

export default HighlightedCard

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #fff;

  ${props =>
    props.highlighted
      ? `
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='69.9' stroke-opacity='0.28' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23fb8d17' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23f47d24' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23ed6e2d' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23e35f34' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23d85239' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23cc453e' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23be3941' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23b02f43' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a02644' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23901e44' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23801843' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%236f1341' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%235e0f3d' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%234e0c38' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%233e0933' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%232e062c' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 200%;
  `
      : `
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23030301' stroke-width='67.7' stroke-opacity='0.15' %3E%3Ccircle fill='%23179dc2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%231794ba' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23178bb2' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%231882a9' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%231979a1' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23197098' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%231a688f' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%231a5f87' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%231a577e' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%231a4f75' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%2319476c' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23183f63' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2317375a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23153051' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23132948' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2310223f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230e1b36' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230b142e' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");        
      background-size: 150%;
  `}
`
const Tags = styled.div``

const Days = styled.div`
  margin-top: 10px;
`

const Text = styled.p`
  margin-bottom: auto;
  padding-bottom: 20px;
`
