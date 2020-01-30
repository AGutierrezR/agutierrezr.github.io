import React from 'react';
import { email } from '@config';

import ContentBox from './contentBox';

import classes from '@CSSModules/hero.module.scss';

const Hero = ({ data }) => {
  const { frontmatter, html } = data[0].node;

  return (
    <ContentBox>
      <h2 className={classes.greetings}>{frontmatter.title}</h2>
      <h1 className={classes.subtitle}>{frontmatter.subtitle}</h1>
      <div className={classes.description} dangerouslySetInnerHTML={{ __html: html }}></div>
      <div className={classes.contact}>
        <span>{frontmatter.contactText}</span>
        <span> 👉 </span>
        <span>
          <a href={`mailto:${email}`}>{email}</a>
        </span>
      </div>
    </ContentBox>

  )
}

export default Hero;