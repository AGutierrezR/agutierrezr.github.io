import React from "react"
import Header from './main-header';
import Footer from './main-footer';

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
