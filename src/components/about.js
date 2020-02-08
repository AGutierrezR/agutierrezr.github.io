import React from 'react';  

import { ContentBox } from '@components'
import Skills from '../components/skills'

import classes from '@CSSModules/about.module.scss';

const About = ({ data }) => {


  const { frontmatter, html } = data[0].node;

  const { title, languages, frameworks, tools, design } = frontmatter;

    
  return (
    <ContentBox>
      <h1 className={classes.title}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>

      <Skills data={frontmatter} />

    </ContentBox>

  )
}

export default About;