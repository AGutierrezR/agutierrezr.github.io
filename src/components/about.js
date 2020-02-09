import React from 'react';  

import { ContentBox } from '@components'
import Skills from '../components/skills'

import classes from '@CSSModules/about.module.scss';
import Container from './container';

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;

  return (
    <Container>
      <h1 className={classes.title}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>

      {/* <Skills data={frontmatter} /> */}

    </Container>

  )
}

export default About;