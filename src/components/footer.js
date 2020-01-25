import React from "react"

import { socialMedia, name } from '@config';

import classes from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <div>
          <span>Diseñado y Desarrollado por</span>
        </div>
        <div>
          <span>{name}</span>
          <span> 2020</span>
        </div>
      </div>
      <div className={classes.links}>
        {
          socialMedia.map(({name, url}, i) => (
            <a key={i} href={url}>
              {name}
            </a>
          )) 
        }
      </div>
    </footer>
  )
}

export default Footer
