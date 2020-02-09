import React from "react"

import classes from '@CSSModules/experience.module.scss'
import Job from "./job";
import Container from "./container";

const Experience = ({ data }) => {

  return (
    <Container>
      <section>
        <h3 className={classes.title}>Experiencia</h3>
        <div>
          {data.map(({node}, key) => {
            const {company, url, time, position} = node
            return (
              <Job 
                key={key}
                company={company} 
                url={url} 
                time={time} 
                position={position}/>
            )
          })}
        </div>
      </section>
    </Container>
  )
}

export default Experience
