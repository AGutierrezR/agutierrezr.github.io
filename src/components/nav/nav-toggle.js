import React from "react";

import classes from './nav-toggle.module.scss';

const NavToggle = (props) => {
  let toggleClasses = [classes.navToggle]
  let divStyle = {
    display: 'inline-block',
    cursor: 'pointer',
    lineHeight: '1',
    height: '21px'
  }

  if(props.showMenu) {
    toggleClasses.push(classes.isOpen)
  }

  return (
    <div onClick={props.clicked} style={divStyle}>
      <label className={toggleClasses.join(' ')} >
        <div className={classes.layer}></div>
      </label>
    </div>
  );
}

export default NavToggle;
