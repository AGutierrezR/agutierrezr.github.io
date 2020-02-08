import React from "react"
import classes from '@CSSModules/list.module.scss'

const List = ({title, list}) => {

  return (
    <div className={classes.listContainer}>
      <h4 className={classes.listTitle}>{title}</h4> 
      <ul>
        {list.map((item, key) => {
          return <li className={classes.listItem} key={key}>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default List
