import React from 'react';
import { Helmet } from 'react-helmet';

import { siteTitle } from '@config'

const SEO = () => {  
  return (
    <Helmet 
      title={siteTitle}
      />
  )
}

export default SEO;