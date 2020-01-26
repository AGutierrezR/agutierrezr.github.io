import React, { Component } from "react";

import { navLinks } from '@config';
import { NavToggle } from '@components';


class Nav extends Component {
  state = {
    showMenu: false
  }

  toggleMenuHandler = () => {
    const doesShow = this.state.showMenu;
    this.setState({ showMenu: !doesShow });
  };

  render() {
    return (
      <nav>
        <ul>
          {navLinks.map(({name, url}, key) => (
            <li>
              <a key={key} href={url}>{name}</a>
            </li>
          ))}
          <li>
            <NavToggle 
              showMenu={this.state.showMenu} 
              clicked={this.toggleMenuHandler}/>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
