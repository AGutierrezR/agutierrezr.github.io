import React, { Component } from "react"

import { socialMedia, siteAuthor } from '@config';

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <span>Diseñado y Desarrollado por</span>
        </div>
        <div>
          <span>{siteAuthor}</span>
          <span> 2020</span>
        </div>
      </div>
      <div>
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
