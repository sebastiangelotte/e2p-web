import React from "react"
import { Link } from "gatsby"

import { Menu, Icon } from "semantic-ui-react"

import { useUser } from "../../utils/user"

const Navigation = ({ transparent }) => {
  if (typeof window !== "undefined") {
    var { user, logout } = useUser()
  }

  return (
    <Menu
      as="nav"
      pointing
      secondary
      style={transparent ? style.transparentMenu : style.menu.wrapper}
    >
      <Menu.Item style={style.menu.item}>
        <Link
          to="/"
          activeStyle={{ textDecoration: "underline" }}
          style={transparent ? style.transparentLink : {}}
        >
          Hem
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
      {/* <Menu.Item style={style.menu.item}>
        <Link
          to="/webinars"
          activeStyle={{ textDecoration: "underline" }}
          style={transparent ? style.transparentLink : {}}
        >
          Webinars
        </Link>
      </Menu.Item> */}
      <Menu.Menu position="right">
        {/* <Menu.Item style={style.menu.item}>
          <span onClick={() => Auth.federatedSignIn()}>
          <Link
            to="/login"
            activeStyle={{ textDecoration: "underline" }}
            style={transparent ? style.transparentLink : {}}
          >
            Logga in <Icon name="user" />
          </Link>
          </span>
        </Menu.Item>
        <Menu.Item style={style.menu.item}>
          <span onClick={() => Auth.signOut()}>
            Logga ut <Icon name="user" />
          </span>
        </Menu.Item> */}
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
            <Link
              to="/login"
              activeStyle={{ textDecoration: "underline" }}
              style={transparent ? style.transparentLink : {}}
            >
              Logga in <Icon name="lock" />
            </Link>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
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
  },
  transparentMenu: {
    backgroundColor: "transparent",
    maxWidth: "1127px",
    margin: "0 auto",
    border: "none",
    position: "relative",
    top: "40px",
    zIndex: "1",
    marginTop: "-40px",
  },
  transparentLink: {
    color: "white",
  },
}
