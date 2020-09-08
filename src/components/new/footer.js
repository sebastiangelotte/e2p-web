import React from "react"
import styled from "styled-components"
import fb from "../../images/fb.svg"
import { Link } from "gatsby"
import logo from "../../images/logo-dark.svg"

const Footer = () => {
  return (
    <Wrapper>
      <Grid>
        <div>
          <img src={logo} height="42px" />
          <Text>
            Vi som jobbar med Easy2perform fokuserar på att ge stöd och
            vägledning till företag, chefer och medarbetare. Oavsett om det sker
            genom våra gratislösningar på mobil & webb, kurser eller
            konsulttjänster, levererar vi kunskap som gör det enklare att
            prestera i yrkesrollen.
          </Text>
        </div>
        <LinkColumn>
          <h3>Sidor</h3>
          <ul>
            <li>
              <Link to="/">Hem</Link>
            </li>
            <li>
              <Link to="/courses">Kurser</Link>
            </li>
            <li>
              <Link to="/services">Tjänster</Link>
            </li>
            <li>
              <Link to="/tools">Verktyg</Link>
            </li>
          </ul>
        </LinkColumn>
        <LinkColumn>
          <h3>Kurser</h3>
          <ul>
            <li>
              <Link to="/courses">Grupputbildningar</Link>
            </li>
            <li>
              <Link to="/courses">Skräddarsydd coaching</Link>
            </li>
            <li>
              <Link to="/courses">Onlinekurser</Link>
            </li>
          </ul>
        </LinkColumn>
        <LinkColumn>
          <h3>Kontakta oss</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/easy2perform">
                <img src={fb} alt="Facebook" />
              </a>
            </li>
            <li>
              <Link to="/about">Om oss</Link>
            </li>
          </ul>
        </LinkColumn>
      </Grid>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.div`
  background-color: #f2f9ff;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 124px;
  padding-bottom: 75px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(212px, auto) minmax(212px, auto) minmax(
      212px,
      auto
    );
  grid-gap: 34px;
  max-width: 1184px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 1100px) {
    grid-template-columns: auto;
  }
`

const LinkColumn = styled.div`
  > h3 {
    font-size: 22px;
    color: #1e266d;
    margin-bottom: 26px;
  }

  > ul {
    list-style: none;
    padding-left: 0;
  }

  a {
    color: #455880;
    font-size: 18px;
    line-height: 225%;
  }
`

const Text = styled.p`
  max-width: 310px;
  line-height: 145%;
  color: #455880;
  font-size: 18px;
  padding-top: 15px;
`
