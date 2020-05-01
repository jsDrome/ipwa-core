import React, { useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import {
  Navbar,
  Toolbar,
  Sidebar,
  SocialLinks,
  CopyrightInfo,
} from '@jsdrome/components';

import styles from './Auth.styles';

const NormalLayout = ({ classes, children, sidebarContent }) => {
  const [ isSidebarOpen, setSidebarOpen ] = useState(false);

  return <div className={classes.normalLayout}>
    <Navbar
      isUserLoggedIn={get(window._ipwa, 'isUserLoggedIn')}
      onMenuButtonClick={() => setSidebarOpen(true)} />
    <Toolbar />
    <div className={classes.normalLayoutContents}>
      {children}
      <SocialLinks />
      <CopyrightInfo />
    </div>
    <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
      {sidebarContent}
    </Sidebar>
  </div>;
}

export default withStyles(styles)(NormalLayout);
