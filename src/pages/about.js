import React from "react"

import { Layout, SEO, About } from '@components'
import { graphql } from "gatsby"
import Skills from "../components/skills";
import Experience from "../components/experience";

const AboutPage = ({data}) => { 
  
  return (
    <Layout className="content-centered" >
      <SEO />
      <About data={data.about.edges} />
      <Skills data={data.skills.edges} />
      <Experience data={data.experience.edges} />
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
    skills: allDataYaml {
      edges {
        node {
          languages
          frameworks
          tools
          design
        }
      }
    }
    experience: allExperienceYaml {
      edges {
        node {
          company
          url
          time
          position
        }
      }
    }
  }
`
