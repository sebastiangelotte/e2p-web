import React from "react"
import { Segment, Container, Header } from "semantic-ui-react"
import Head from "../components/head"
import Layout from "../components/layout"

const style = {
  segment: {
    paddingTop: "6em",
    paddingBottom: "6em",
  },
}

const Account = () => {
  return (
    <Layout>
      <Head title="Verktyg" />
      <Segment
        style={style.segment}
        textAlign="center"
        vertical
        color="blue"
        inverted
      >
        <Container text>
          <Header as="h1" inverted>
            Mina sidor
          </Header>
        </Container>
      </Segment>
      <Segment style={style.segment} vertical center>
        <Container text>Under utveckling..</Container>
      </Segment>
    </Layout>
  )
}
export default Account
