import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"
import Head from "../components/head"
import Layout from "../components/layout"
import {
  Heading,
  SectionWithBackgroundImage,
  Section,
  Inner,
  Button,
  Tag,
} from "../components/new/styledComponents"
import bg from "../images/hero-bg.svg"
import { BsFillTagFill } from "react-icons/bs"

const Services = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulService {
        edges {
          node {
            slug
            title
            tags
            shortDescription {
              shortDescription
            }
            description {
              json
            }
          }
        }
      }
    }
  `)

  const [services, setServices] = useState(data.allContentfulService.edges)

  return (
    <Layout transparentNavigation>
      <Head title="Verktyg" />
      <SectionWithBackgroundImage backgroundImage={bg} inverted firstSection>
        <Inner>
          <Heading as="h1" inverted>
            Organisation & ledarutveckling
          </Heading>
          <p>
            Genom vårt omfattande konsultnätverk kan vi erbjuda konsulttjänster
            för utveckling av organisation och ledare.
          </p>
        </Inner>
      </SectionWithBackgroundImage>

      <Section background>
        <StyledInner>
          {services.map((service, index) => {
            return (
              <div>
                {service.node.tags &&
                  service.node.tags.map(tag => {
                    return (
                      <Tag key={tag}>
                        <BsFillTagFill /> {tag}
                      </Tag>
                    )
                  })}
                <h3>{service.node.title}</h3>
                <p>{service.node.shortDescription.shortDescription}</p>
                <Link to={`/services/${service.node.slug}`}>
                  <Button>Läs mer</Button>
                </Link>
              </div>
            )
          })}
        </StyledInner>
      </Section>
    </Layout>
  )
}

export default Services

const StyledInner = styled(Inner)`
  display: grid;
  grid-gap: 50px;

  > div {
    box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
      0px 6px 41px rgba(135, 146, 161, 0.11);
    border-radius: 18px;
    margin-bottom: 20px;
    background-color: #fff;
    color: var(--color-heading);
    text-align: center;
    padding: 20px 30px 15px 30px;
  }

  p {
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 600px) {
    h3 {
      font-size: 24px;
    }
  }
`
