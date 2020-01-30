import React from "react"

import Layout from "../components/layout"
import SEO from "../components/SEO"
import Hero from "../components/hero"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout className="content-centered" >
      <SEO />
      <Hero data={data.hero.edges} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            contactText
          }
          html
        }
      }
    }
  }
`
