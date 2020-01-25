import React from "react"

import { Header, Footer } from '@components';

import '../scss/styles.scss';

const Layout = (props) => (
  <div>
    <Header />
    <div >
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
