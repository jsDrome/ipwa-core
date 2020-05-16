import React, { Fragment, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from '@jsdrome/components';

import Meta from '../Meta/Meta';
import { checkForMessage } from '../../../store/app/appActions';

const App = ({ children, checkForMessage, alert }) => {

  useEffect(checkForMessage, []);

  return <Fragment>
    <Meta />
    {alert && <Alert type={alert.type} duration={alert.duration}>{alert.message}</Alert>}
    {children}
  </Fragment>;
}

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  alert: alertSelector(state),
});

const alertSelector = state => state.app.alert;

const mapDispatchToProps = dispatch => ({
  checkForMessage: data => checkForMessage(data)(dispatch),
})

export {
  App,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
