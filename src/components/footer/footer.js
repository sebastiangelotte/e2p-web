import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Container, Grid, List, Header } from "semantic-ui-react"
import MailchimpSignup from "../mailchimpSignup"

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
  },
}

const Footer = () => {
  return (
    <Wrapper style={style.segment} vertical inverted>
      <Container>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <List link>
                <List.Item>
                  <Link to="/services">Tjänster</Link>
                </List.Item>
                <List.Item>
                  <Link to="/courses">Kurser</Link>
                </List.Item>
                <List.Item>
                  <Link to="/tools">Verktyg</Link>
                </List.Item>
                {/* <List.Item>
                  <Link to="/webinars">Webinars</Link>
                </List.Item> */}
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <List link>
                <List.Item>
                  <Link to="/about">Om oss</Link>
                </List.Item>
                <List.Item>
                  <Link to="/contact">Kontakt</Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Header as="h4">Läs vårt nyhetsbrev!</Header>
              <p>
                Anmäl dig till vårt nyhetsbrev för smarta checklistor, enkla råd
                & tips.
              </p>
              <MailchimpSignup />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.div`
  color: #1e266d;

  a {
    color: #1e266d !important;
  }
`
