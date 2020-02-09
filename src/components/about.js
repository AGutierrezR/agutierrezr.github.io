import React from 'react';  

import { Title } from './styled-components'

import classes from '@CSSModules/about.module.scss';
import Container from './container';

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;

  return (
    <Container>
      <Title>{title}</Title>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </Container>

  )
}

export default About;