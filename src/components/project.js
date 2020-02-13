import React from "react"
import classes from "@CSSModules/project.module.scss"

const Project = ({ title, url, tech, html }) => {
  return (
    <div className={classes.project}>
      <header >
        <h4 className={classes.title}><a href={url}>{title}</a></h4>
      </header>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <footer>
        <ul className={classes.techList}>
          {tech.map((item, key) => {
            return <li key={key}>{item}</li>
          })}
        </ul>
      </footer>
    </div>
  )
}

export default Project
