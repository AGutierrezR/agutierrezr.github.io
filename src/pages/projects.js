import React from "react"

import { Layout, SEO } from "@components"
import { graphql } from "gatsby"

import { Title } from '../components/styled-components';

import Project from "../components/project"
import { Container } from "../components/styled-components"

const ProjectsPage = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <Container>

        <Title>Proyectos</Title>

        <div>
          {data.projects.edges.map(({ node }) => {
            const { frontmatter, html } = node
            const { title, url, tech } = frontmatter

            return <Project title={title} url={url} tech={tech} html={html} />
          })}
        </div>
      </Container>
    </Layout>
  )
}

export default ProjectsPage

export const PageQuery = graphql`
  {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            github
            url
            tech
          }
          html
        }
      }
    }
  }
`
