import React from 'react';

import { contentBox } from '@CSSModules/contentBox.module.scss'

const ContentBox = ({ children }) => (
  <div className={contentBox}>
    {children}
  </div>
)

export default ContentBox 