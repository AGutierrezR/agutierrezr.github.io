import React from "react"

import { Header, Footer } from '@components';

import '../scss/styles.scss';
import classes from './layout.module.scss';

const Layout = (props) => (
  <div className={classes.site} >
    <Header />
    <div className={classes.siteContent}>
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
