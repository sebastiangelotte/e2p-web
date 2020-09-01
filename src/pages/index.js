import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import Hero from "../components/new/hero"

const IndexPage = () => {
  return (
    <Layout transparentNavigation>
      <Head title="Startsida" />
      <Hero />
    </Layout>
  )
}

export default IndexPage
