import React, { useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';

import {
  Navbar,
  Toolbar,
  Modal,
  SocialLinks,
  CopyrightInfo,
} from '@jsdrome/components';

import Register from '../Register/Register';

import styles from './Home.styles';

const MODAL_TYPES = {
  REGISTER: 'Login / Register',
};

const modalContent = type => {
  switch (type) {
  case MODAL_TYPES.REGISTER:
    return <Register />;
  default:
    return null;
  }
};

const HomeLayout = ({ classes, children }) => {
  const [ isModalOpen, setModalOpen ] = useState(false);

  const appBarProps = {
    elevation: 0,
  };

  return <div className={classes.homeLayout}>
    <Modal
      isModalOpen={isModalOpen}
      title={isModalOpen || ''}
      handleModalClose={() => setModalOpen(false)}>
      {modalContent(isModalOpen)}
    </Modal>
    <Navbar
      isUserLoggedIn={get(window._ipwa, 'isUserLoggedIn')}
      appBarProps={appBarProps}
      onRegisterClick={() => setModalOpen(MODAL_TYPES.REGISTER)} />
    <Toolbar />
    <div className={classes.homeLayoutContents}>
      {children}
      <SocialLinks />
      <CopyrightInfo />
    </div>
  </div>;
}

export default withStyles(styles)(HomeLayout);
