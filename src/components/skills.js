import React from "react"
import List from "./list"

import classes from '@CSSModules/skills.module.scss'
import Container from "./container"

const Skills = ({ data }) => {

  
  const { languages, frameworks, tools, design } = data[0].node

  return (
    <Container>
      <section className={classes.skillsSection}>
        <div className={classes.skills}>
          <List title="Lenguajes" list={languages} />
          <List title="Frameworks" list={frameworks} />
          <List title="Herramientas" list={tools} />
          <List title="Diseño" list={design} />
        </div>
      </section>

    </Container>
  )
}

export default Skills
