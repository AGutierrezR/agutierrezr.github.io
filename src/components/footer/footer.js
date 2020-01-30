import React from "react"

import { socialMedia, name } from "@config"
import {
  IconEnv,
  IconGithub,
  IconLinkedin,
  IconInstagram,
} from "@components/icons"

import classes from "@CSSModules/footer.module.scss"

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        <div className={classes.top}>
          <span>Diseñado y Desarrollado por	</span>
        </div>
        <div className={classes.bottom}>
          <span>&nbsp;{name}&nbsp;</span>
          <span>2020</span>
        </div>
      </div>
      <div className={classes.links}>
        {socialMedia.map(({ name, url }, i) => (
          <a key={i} href={url}>
            {name === "Github" ? (
              <IconGithub />
            ) : name === "LinkedIn" ? (
              <IconLinkedin />
            ) : name === "Email" ? (
              <IconEnv />
            ) : name === "Instagram" ? (
              <IconInstagram />
            ) : (
              <IconGithub />
            )}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
