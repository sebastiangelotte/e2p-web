import React, { useState } from "react"
import { Link } from "gatsby"
import { Menu, Icon, Modal, Sidebar } from "semantic-ui-react"
import styled from "styled-components"

import { useUser } from "../../utils/user"
import LogIn from "../login"
import logo from "../../images/logo.svg"

const DesktopNav = styled.div`
  display: none;
  background-color: transparent;
  border: none;
  position: absolute;
  width: 100%;
  z-index: 2;

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
`

const Navigation = ({ transparent }) => {
  if (typeof window !== "undefined") {
    var { user, logout } = useUser()
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
          {/* <Container center> */}
          <Menu.Item>
            <Link to="/" activeStyle={{ textDecoration: "underline" }}>
              <Logo src={logo} alt="Easy2perform" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/courses" activeStyle={{ textDecoration: "underline" }}>
              Kurser
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/services" activeStyle={{ textDecoration: "underline" }}>
              Tjänster
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tools" activeStyle={{ textDecoration: "underline" }}>
              Verktyg
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            {user ? (
              <>
                <Menu.Item>
                  <Link
                    to="/"
                    onClick={e => {
                      e.preventDefault()
                      logout()
                    }}
                    activeStyle={{ textDecoration: "underline" }}
                  >
                    Logga ut
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/account"
                    activeStyle={{ textDecoration: "underline" }}
                  >
                    Mina sidor <Icon name="user" />
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                <Modal
                  size="mini"
                  trigger={
                    <Link
                      to="#"
                      onClick={e => e.preventDefault()}
                      activeStyle={{ textDecoration: "underline" }}
                    >
                      Logga in <Icon name="lock" />
                    </Link>
                  }
                  closeIcon
                >
                  <Modal.Content>
                    <LogIn />
                  </Modal.Content>
                </Modal>
              </Menu.Item>
            )}
          </Menu.Menu>
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
          <Menu.Item>
            <Link to="/" activeStyle={{ textDecoration: "underline" }}>
              <Icon name="home" /> Hem
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/courses" activeStyle={{ textDecoration: "underline" }}>
              Kurser
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/services" activeStyle={{ textDecoration: "underline" }}>
              Tjänster
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tools" activeStyle={{ textDecoration: "underline" }}>
              Verktyg
            </Link>
          </Menu.Item>
          <BottomMenuItems>
            {user ? (
              <>
                <Menu.Item>
                  <Link
                    to="/account"
                    activeStyle={{ textDecoration: "underline" }}
                  >
                    <Icon name="user" /> Mina sidor
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/"
                    onClick={e => {
                      e.preventDefault()
                      logout()
                    }}
                    activeStyle={{ textDecoration: "underline" }}
                  >
                    Logga ut
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                <Modal
                  size="mini"
                  trigger={
                    <Link
                      to="#"
                      onClick={e => e.preventDefault()}
                      activeStyle={{ textDecoration: "underline" }}
                    >
                      <Icon name="lock" /> Logga in
                    </Link>
                  }
                  closeIcon
                >
                  {/* <Header icon="lock" content={`Logga in`} /> */}
                  <Modal.Content>
                    <LogIn />
                  </Modal.Content>
                </Modal>
              </Menu.Item>
            )}
          </BottomMenuItems>
        </Sidebar>
      </MobileNav>
      <MobileLogo to="/" activeStyle={{ textDecoration: "underline" }}>
        <Logo src={logo} alt="Easy2perform" />
      </MobileLogo>
    </Wrapper>
  )
}

export default Navigation
