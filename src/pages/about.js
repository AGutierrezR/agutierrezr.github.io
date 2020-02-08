import React from "react"

import { Layout, SEO, About } from '@components'
import { graphql } from "gatsby"

const AboutPage = ({data}) => {  
  return (
    <Layout className="content-centered" >
      <SEO />
      <About data={data.about.edges} />
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  {
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            languages
            frameworks
            tools
            design
          }
          html
        }
      }
    }
  }
`
