import React from "react"
import { Link } from "gatsby"

import { Menu, Icon } from "semantic-ui-react"

const style = {
  menu: {
    wrapper: {
      marginBottom: 0,
      borderColor: "white",
    },
    item: {
      fontSize: "12px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
  },
}

const Navigation = () => {
  return (
    <Menu as="nav" pointing secondary style={style.menu.wrapper}>
      <Menu.Item style={style.menu.item}>
        <Link to="/" activeStyle={{ textDecoration: "underline" }}>
          Hem
        </Link>
      </Menu.Item>
      <Menu.Item style={style.menu.item}>
        <Link to="/courses" activeStyle={{ textDecoration: "underline" }}>
          Kurser
        </Link>
      </Menu.Item>
      <Menu.Item style={style.menu.item}>
        <Link to="/services" activeStyle={{ textDecoration: "underline" }}>
          Tjänster
        </Link>
      </Menu.Item>
      <Menu.Item style={style.menu.item}>
        <Link to="/tools" activeStyle={{ textDecoration: "underline" }}>
          Verktyg
        </Link>
      </Menu.Item>
      <Menu.Item style={style.menu.item}>
        <Link to="/webinars" activeStyle={{ textDecoration: "underline" }}>
          Webinars
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item style={style.menu.item}>
          <Link to="/account" activeStyle={{ textDecoration: "underline" }}>
            Mitt konto <Icon name="user" />
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Navigation
