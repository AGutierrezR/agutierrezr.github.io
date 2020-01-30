import React from "react"

import { Header, Footer } from '@components';

import '../scss/styles.scss';
import classes from '@CSSModules/layout.module.scss';

const Layout = ({children, className}) => {

  let mainClasses = [classes.siteContent]

  if(className === 'content-centered') {
    mainClasses.push(classes.contentCentered)
  }

  return (
    <div className={classes.site} >
      <Header />
      <main className={mainClasses.join(' ')}>
          { children }
      </main>
      <Footer />
    </div>
  )
}


export default Layout
