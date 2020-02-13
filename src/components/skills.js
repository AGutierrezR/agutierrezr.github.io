import React from "react"
import List from "./list"

import classes from '@CSSModules/skills.module.scss'
import { Container } from "./styled-components"

const Skills = ({ data }) => {

  return (
    <Container>
      <section className={classes.skillsSection}>
        <div className={classes.skills}>
          {data.map(({node}, key) => {
            const {title, list} = node;
            return (
              <List key={key} title={title} list={list} />
            )
          })}
        </div>
      </section>

    </Container>
  )
}

export default Skills
