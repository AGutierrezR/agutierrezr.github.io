import React from 'react';

import { Logo, Nav } from '@components'

import classes from '@CSSModules/header.module.scss';

const Header = () => (
  <header className={classes.header}>
    <div className={classes.logo}>
      <Logo />
    </div>
    <div>
      <Nav />
    </div>
  </header>
);

export default Header;