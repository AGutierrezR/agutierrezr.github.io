import React, { Component } from "react"

import { navLinks } from "@config"
import { NavToggle } from "@components"
import {
  IconHome,
  IconPencil,
  IconSuitcase,
  IconEnv,
  IconFile,
  IconUser,
} from "@components/icons"

import classes from "./nav.module.scss"

class Nav extends Component {
  state = {
    showMenu: false,
  }

  toggleMenuHandler = () => {
    const doesShow = this.state.showMenu
    this.setState({ showMenu: !doesShow })
  }

  render() {
    let navLinksClasses = [classes.navLinks]
    let toggleClasses = [classes.navLink, classes.navLinkToggle]
    let menuMobile = null

    if (this.state.showMenu) {
      navLinksClasses.push(classes.isHidden)
      menuMobile = (
        <ul className={classes.navLinksMobile}>
          {navLinks.map(({ name, url }, key) => (
            <li key={key}>
              <a className={classes.navLink} href={url}>
                {name === "Inicio" ? (
                  <IconHome />
                ) : name === "Portafolio" ? (
                  <IconSuitcase />
                ) : name === "Blog" ? (
                  <IconPencil />
                ) : name === "Sobre mi" ? (
                  <IconUser />
                ) : name === "Contacto" ? (
                  <IconEnv />
                ) : name === "CV" ? (
                  <IconFile />
                ) : (
                  <IconHome />
                )}
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <nav className={classes.navContainer}>
        <ul className={navLinksClasses.join(" ")}>
          {navLinks.map(({ name, url }, key) => (
            <li key={key} className={classes.navItem}>
              <a className={classes.navLink} href={url}>
                {name === "Inicio" ? (
                  <IconHome />
                ) : name === "Portafolio" ? (
                  <IconSuitcase />
                ) : name === "Blog" ? (
                  <IconPencil />
                ) : name === "Sobre mi" ? (
                  <IconUser />
                ) : name === "Contacto" ? (
                  <IconEnv />
                ) : name === "CV" ? (
                  <IconFile />
                ) : (
                  <IconHome />
                )}
                <span>{name}</span>
              </a>
            </li>
          ))}
          <li className={toggleClasses.join(" ")}>
            <NavToggle
              showMenu={this.state.showMenu}
              clicked={this.toggleMenuHandler}
            />
          </li>
        </ul>

        {menuMobile}
      </nav>
    )
  }
}

export default Nav
