import React from "react";

import classes from '@CSSModules/nav-toggle.module.scss';

const NavToggle = (props) => {
  let toggleClasses = [classes.navToggle]

  if(props.showMenu) {
    toggleClasses.push(classes.isOpen)
  }

  return (
    <div onClick={props.clicked} role="navigation" className={classes.div}>
      <div className={toggleClasses.join(' ')} >
        <div className={classes.layer}></div>
      </div>
    </div>
  );
}

export default NavToggle;
