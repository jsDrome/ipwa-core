import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './Copyright.styles';

const CopyrightInfo = ({ classes, url, title }) => <div className={classes.copyRightInfo}>
  <Typography variant="caption">
    <span>&copy;</span>
    <span>&nbsp;</span>
    <Link href={url}>{title}</Link>
    <span>&nbsp;</span>
    <span>{new Date().getFullYear()} | All rights reserved</span>
  </Typography>
</div>;

CopyrightInfo.propTypes = {
  classes: PropTypes.object,
  url: PropTypes.string,
  title: PropTypes.string,
};

CopyrightInfo.defaultProps = {
  classes: null,
  url: '',
  title: '',
};

export default withStyles(styles, { withTheme: true })(CopyrightInfo);
