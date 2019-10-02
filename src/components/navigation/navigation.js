import React, { useState } from "react"
import { Link } from "gatsby"
import { Menu, Icon, Modal, Sidebar } from "semantic-ui-react"
import styled from "styled-components"
// import { Breakpoint } from "react-socks"
// import useViewportSizes from "use-viewport-sizes"

import { useUser } from "../../utils/user"
import LogIn from "../login"
import logo from "../../images/logo.svg"

const DesktopNav = styled.div`
  display: none;
  @media only screen and (min-width: 600px) {
    display: block;
  }
`

const MobileNav = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`

const Hamburger = styled(Icon)`
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
  top: 10px;
  transform: translateX(-50%);

  @media only screen and (min-width: 600px) {
    display: none;
  }
`

const Navigation = ({ transparent }) => {
  if (typeof window !== "undefined") {
    var { user, logout } = useUser()
  }

  const [sidebarOpened, setSidebarOpened] = useState(false)

  const handleSidebarHide = () => setSidebarOpened(false)
  const handleSidebarToggle = () => setSidebarOpened(!sidebarOpened)

  return (
    <>
      <MobileLogo
        to="/"
        activeStyle={{ textDecoration: "underline" }}
        style={transparent ? style.transparentLink : {}}
      >
        <img src={logo} alt="Easy2perform" style={{ width: "50px" }} />
      </MobileLogo>
      <MobileNav style={style.transparentMenu}>
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
          <Menu.Item style={style.menu.mobileItem}>
            <Link to="/" activeStyle={{ textDecoration: "underline" }}>
              <Icon name="home" /> Hem
            </Link>
          </Menu.Item>
          <Menu.Item style={style.menu.mobileItem}>
            <Link to="/courses" activeStyle={{ textDecoration: "underline" }}>
              Kurser
            </Link>
          </Menu.Item>
          <Menu.Item style={style.menu.mobileItem}>
            <Link to="/services" activeStyle={{ textDecoration: "underline" }}>
              Tjänster
            </Link>
          </Menu.Item>
          <Menu.Item style={style.menu.mobileItem}>
            <Link to="/tools" activeStyle={{ textDecoration: "underline" }}>
              Verktyg
            </Link>
          </Menu.Item>
          <BottomMenuItems>
            {user ? (
              <>
                <Menu.Item style={style.menu.mobileItem}>
                  <Link
                    to="/account"
                    activeStyle={{ textDecoration: "underline" }}
                  >
                    <Icon name="user" /> Mina sidor
                  </Link>
                </Menu.Item>
                <Menu.Item style={style.menu.mobileItem}>
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
              <Menu.Item style={style.menu.mobileItem}>
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
                  <Modal.Content>
                    <LogIn />
                  </Modal.Content>
                </Modal>
              </Menu.Item>
            )}
          </BottomMenuItems>
        </Sidebar>
      </MobileNav>
      <DesktopNav>
        <Menu
          as="nav"
          secondary
          style={transparent ? style.transparentMenu : style.menu.wrapper}
        >
          <Menu.Item style={style.menu.item}>
            <Link
              to="/"
              activeStyle={{ textDecoration: "underline" }}
              style={transparent ? style.transparentLink : {}}
            >
              <img src={logo} alt="Easy2perform" style={{ width: "50px" }} />
            </Link>
          </Menu.Item>
          <Menu.Item style={style.menu.item}>
            <Link
              to="/courses"
              activeStyle={{ textDecoration: "underline" }}
              style={transparent ? style.transparentLink : {}}
            >
              Kurser
            </Link>
          </Menu.Item>
          <Menu.Item style={style.menu.item}>
            <Link
              to="/services"
              activeStyle={{ textDecoration: "underline" }}
              style={transparent ? style.transparentLink : {}}
            >
              Tjänster
            </Link>
          </Menu.Item>
          <Menu.Item style={style.menu.item}>
            <Link
              to="/tools"
              activeStyle={{ textDecoration: "underline" }}
              style={transparent ? style.transparentLink : {}}
            >
              Verktyg
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            {user ? (
              <>
                <Menu.Item style={style.menu.item}>
                  <Link
                    to="/"
                    onClick={e => {
                      e.preventDefault()
                      logout()
                    }}
                    activeStyle={{ textDecoration: "underline" }}
                    style={transparent ? style.transparentLink : {}}
                  >
                    Logga ut
                  </Link>
                </Menu.Item>
                <Menu.Item style={style.menu.item}>
                  <Link
                    to="/account"
                    activeStyle={{ textDecoration: "underline" }}
                    style={transparent ? style.transparentLink : {}}
                  >
                    Mina sidor <Icon name="user" />
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item style={style.menu.item}>
                <Modal
                  size="mini"
                  trigger={
                    <Link
                      to="#"
                      onClick={e => e.preventDefault()}
                      activeStyle={{ textDecoration: "underline" }}
                      style={transparent ? style.transparentLink : {}}
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
    </>
  )
}

export default Navigation

const style = {
  menu: {
    wrapper: {
      marginBottom: 0,
      borderColor: "white",
      maxWidth: "1127px",
      margin: "0 auto",
    },
    item: {
      fontSize: "12px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    mobileItem: {
      fontSize: "20px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "3px",
    },
  },
  transparentMenu: {
    backgroundColor: "transparent",
    maxWidth: "1127px",
    margin: "0 auto",
    border: "none",
    position: "relative",
    top: "74px",
    zIndex: "2",
    marginTop: "-74px",
  },
  transparentLink: {
    color: "white",
  },
}
