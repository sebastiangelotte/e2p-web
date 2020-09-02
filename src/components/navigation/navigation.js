import React, { useState } from "react"
import { Link } from "gatsby"
import { Menu, Icon, Sidebar } from "semantic-ui-react"
import styled from "styled-components"
import logo from "../../images/logo.svg"

const DesktopNav = styled.div`
  display: none;
  background-color: transparent;
  border: none;
  position: absolute;
  width: 100%;
  z-index: 2;
  padding: 20px 0;

  @media only screen and (min-width: 600px) {
    display: block;
  }

  a {
    color: white;

    &:hover,
    &:active,
    &:focus {
      color: white;
    }
  }
`

const MobileNav = styled.div`
  display: none;
  background-color: transparent;
  max-width: 1127px;
  margin: 0 auto;
  border: none;
  position: relative;
  z-index: 2;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`

const Hamburger = styled(Icon)`
  position: absolute;
  padding: 1rem;
`

const BottomMenuItems = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const MobileLogo = styled(Link)`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 15px;
  transform: translateX(-50%);

  @media only screen and (min-width: 600px) {
    display: none;
  }
`

const Wrapper = styled.div`
  position: relative;
  z-index: 3;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 30px;
`

const DesktopMenuItem = styled(Menu.Item)`
  font-size: 16px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  padding-left: 40px !important;
  padding-right: 0 !important;
`

const MobileMenuItem = styled(Menu.Item)`
  font-size: 20px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 3px !important;
`

const Navigation = () => {
  const Logo = styled.img`
    width: 50px;

    @media only screen and (max-width: 600px) {
      width: 90px;
    }
  `

  const [sidebarOpened, setSidebarOpened] = useState(false)

  const handleSidebarHide = () => setSidebarOpened(false)
  const handleSidebarToggle = () => setSidebarOpened(!sidebarOpened)

  return (
    <Wrapper>
      <DesktopNav>
        <Menu as="nav" secondary>
          <Link to="/" activeStyle={{ textDecoration: "underline" }}>
            <Logo src={logo} alt="Easy2perform" />
          </Link>
          <DesktopMenuItem>
            <Link to="/courses" activeStyle={{ textDecoration: "underline" }}>
              Kurser
            </Link>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <Link to="/program" activeStyle={{ textDecoration: "underline" }}>
              Utbildningsprogram
            </Link>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <Link to="/tools" activeStyle={{ textDecoration: "underline" }}>
              Checklistor
            </Link>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <Link to="/services" activeStyle={{ textDecoration: "underline" }}>
              Övriga tjänster
            </Link>
          </DesktopMenuItem>
          <Menu.Menu position="right"></Menu.Menu>
        </Menu>
      </DesktopNav>
      <MobileNav>
        <Hamburger
          name="sidebar"
          inverted
          size="big"
          onClick={() => handleSidebarToggle()}
        />
        <Sidebar
          as={Menu}
          animation="push"
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <MobileMenuItem>
            <Link to="/" activeStyle={{ textDecoration: "underline" }}>
              <Icon name="home" /> Hem
            </Link>
          </MobileMenuItem>
          <MobileMenuItem>
            <Link to="/courses" activeStyle={{ textDecoration: "underline" }}>
              Kurser
            </Link>
          </MobileMenuItem>
          <MobileMenuItem>
            <Link to="/program" activeStyle={{ textDecoration: "underline" }}>
              Utbildnings-program
            </Link>
          </MobileMenuItem>
          <MobileMenuItem>
            <Link to="/tools" activeStyle={{ textDecoration: "underline" }}>
              Checklistor
            </Link>
          </MobileMenuItem>
          <MobileMenuItem>
            <Link to="/services" activeStyle={{ textDecoration: "underline" }}>
              Övriga tjänster
            </Link>
          </MobileMenuItem>
          <BottomMenuItems></BottomMenuItems>
        </Sidebar>
      </MobileNav>
      <MobileLogo to="/" activeStyle={{ textDecoration: "underline" }}>
        <Logo src={logo} alt="Easy2perform" />
      </MobileLogo>
    </Wrapper>
  )
}

export default Navigation
