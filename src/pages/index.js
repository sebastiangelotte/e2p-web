import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import Hero from "../components/new/hero"
import Notice from "../components/new/notice"
import styled from "styled-components"

const IndexPage = () => {
  return (
    <Layout transparentNavigation>
      <Head title="Startsida" />
      <Hero />
      <NoticePositioner>
        <Notice />
      </NoticePositioner>
    </Layout>
  )
}

export default IndexPage

const NoticePositioner = styled.div`
  position: relative;
  top: -90px;
  margin-left: auto;
  margin-right: auto;
  max-width: 818px;
  padding-left: 10px;
  padding-right: 10px;
`
