import React from "react";

import classes from './nav-toggle.module.scss';

const NavToggle = (props) => {
  let toggleClasses = [classes.navToggle]

  if(props.showMenu) {
    toggleClasses.push(classes.isOpen)
  }

  return (
    <div onClick={props.clicked} className={classes.div}>
      <label className={toggleClasses.join(' ')} >
        <div className={classes.layer}></div>
      </label>
    </div>
  );
}

export default NavToggle;
