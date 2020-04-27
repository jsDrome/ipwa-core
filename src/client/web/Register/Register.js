/* eslint-disable no-magic-numbers */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import HourGlassIcon from '@material-ui/icons/HourglassFull';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { setAlert } from '../../../store/app/appActions';

import styles from './Register.styles';

const Register = props => {
  const [ index, setIndex ] = useState(0);

  return <Fragment>
    <Expansion title="Social Login" isExpanded={index === 1} onChange={(e, expanded) => expanded && setIndex(1)}>
      <SocialLogin {...props} />
    </Expansion>
    <Expansion title="Email/Password" isExpanded={index === 2} onChange={(e, expanded) => expanded && setIndex(2)}>
      <EmailSignUpForm {...props} />
    </Expansion>
  </Fragment>
};

const Expansion = ({ title, children, isExpanded, onChange }) => <ExpansionPanel expanded={isExpanded} onChange={onChange} elevation={4}>
  <ExpansionPanelSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header">
    {title}
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    {children}
  </ExpansionPanelDetails>
</ExpansionPanel>;

const SocialLogin = ({ classes }) => {
  const [ isRegistering, setIsRegistering ] = useState(false);

  return isRegistering
    ? <Button disabled fullWidth>
      <HourGlassIcon />
    </Button>
    : <div className={classes.socialLogin}>
      <Button
        fullWidth
        href={"/login/linkedin"}
        onClick={() => setIsRegistering(true)}
        className={classes.socialButton}
        variant="contained"
        color="primary"
        startIcon={<LinkedInIcon />}>
        Linkedin
      </Button>
      <Button
        fullWidth
        href={"/login/github"}
        onClick={() => setIsRegistering(true)}
        className={classes.socialButton}
        variant="contained"
        color="primary"
        startIcon={<GitHubIcon />}>
        Github
      </Button>
    </div>
};

const EmailSignUpForm = ({ classes, setAlert }) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const signIn = async () => {
    try {
      const signInRes = await fetch('/login/email', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!signInRes.ok) throw new Error();
      else {
        const { login, type, message, duration } = await signInRes.json();
        setAlert({
          type,
          message,
          duration,
        });
        if (login === 'true') window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <form className={classes.form} noValidate autoComplete="off">
    <TextField className={classes.input} fullWidth label="Email" onChange={e => setEmail(e.target.value)} value={email} /><br />
    <TextField className={classes.input} fullWidth label="Password" type="password" onChange={e => setPassword(e.target.value)} value={password} />
    <Button
      fullWidth
      onClick={signIn}
      variant="contained"
      className={classes.signInButton}
      color="primary">Go</Button>
  </form>;
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setAlert: data => dispatch(setAlert(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Register));
