import React from "react"
import classes from "@CSSModules/job.module.scss"

const Job = ({ company, url, time, position }) => {
  return (
    <div className={classes.job}>
      <div className={classes.timePlace}>
        <div className={classes.jobCompany}>
          <a href={url}>{company}</a>
        </div>
        <div className={classes.jobTime}>{time}</div>
      </div>
      <div>{position}</div>
    </div>
  )
}

export default Job
