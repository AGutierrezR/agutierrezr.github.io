import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from "gatsby"

const SEO = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
		`
  )
  
  return (
    <Helmet 
      title={`${site.siteMetadata.author} | ${site.siteMetadata.title}`}
      />
  )
}

export default SEO;