import React from "react"

import { Layout, SEO } from "@components"
import { socialMedia } from '@config'

import {
  IconEnv,
  IconGithub,
  IconLinkedin,
  IconInstagram,
} from "@components/icons"

import { Title, Container } from '../components/styled-components';

import classes from '@CSSModules/contact.module.scss'

const ContactPage = () => {
  return (
    <Layout>
      <SEO />
      <Container>

        <Title>Contacto</Title>

        <p>Puedes contactarme por:</p>

        <ul>
        {socialMedia.map(({name, url, slug}) => {
          return (
            <li>
              <a className={classes.contactLink} href={url}>
                {name === "Email" ? (
                  <IconEnv />
                ) : name === "Github" ? (
                  <IconGithub />
                ) : name === "LinkedIn" ? (
                  <IconLinkedin />
                ) : name === "Instagram" ? (
                  <IconInstagram />
                ) : (
                  <IconEnv />
                )}
                <span>{slug}</span>
              </a>
            </li>
          )
        })}
        </ul>

      </Container>
    </Layout>
  )
}

export default ContactPage
