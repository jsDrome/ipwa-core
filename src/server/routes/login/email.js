import express from 'express';

import {
  isEmailAlreadyPresentInDb,
  getUserDetailsFromDB,
  saveUserInDB,
  // isUsernameAlreadyPresentInDb,
} from '../../firebase';

import {
  isValidEmail,
  encrypt,
  getMessage,
  getDuration,
  setSessionCookie,
  // isValidUsername,
} from '../../server.utils';

const { props: { name, email, url } } = require('../../../config');

import mailer from './mailer';

const router = express.Router();

/*
  if (!validEmail) respond with error;
  if (!validPassword) respond with error;
  if (technical glitch) respond with error;
  if (!email exists) {
    Save in DB
    Trigger activation email
    Respond with error
  }
  if (!password exists) respond with error;
  if (!password correct) respond with error;
  if (!user active) respond with error;

  Return success;
*/

router.post('/', async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { password } = req.body;

  const isValidGivenEmail = isValidEmail(email);

  if (!isValidGivenEmail) return res.send({
    login: 'false',
    type: 'error',
    message: getMessage('error', 'login', 'invalid_email'),
    duration: getDuration('error', 'login', 'invalid_email'),
  });

  if (!password) return res.send({
    login: 'false',
    type: 'error',
    message: getMessage('error', 'login', 'empty_password'),
    duration: getDuration('error', 'login', 'empty_password'),
  });

  try {
    if (!await isEmailAlreadyPresentInDb(email)) {
      if(!await saveUserInDB(email, encrypt(email), false, password)) {
        return res.send({
          login: 'false',
          type: 'error',
          message: getMessage('error', 'login', 'technical'),
          duration: getDuration('error', 'login', 'technical'),
        });
      }
      // eslint-disable-next-line no-undef
      if (BUILD_NODE_ENV === 'production') mailer(getActivationMailParams(email));

      return res.send({
        login: 'false',
        type: 'success',
        message: getMessage('success', 'login', 'activate'),
        duration: getDuration('success', 'login', 'activate'),
      });
    }

    const { password: usersPassword, active: isGivenUserActive } = await getUserDetailsFromDB(email);

    if (!usersPassword) return res.send({
      login: 'false',
      type: 'error',
      message: getMessage('error', 'login', 'no_password'),
      duration: getDuration('error', 'login', 'no_password'),
    });

    const isGivenPasswordCorrect = encrypt(password) === usersPassword;

    if (!isGivenPasswordCorrect) return res.send({
      login: 'false',
      type: 'error',
      message: getMessage('error', 'login', 'password_wrong'),
      duration: getDuration('error', 'login', 'password_wrong'),
    });

    if (!isGivenUserActive) return res.send({
      login: 'false',
      type: 'warning',
      message: getMessage('error', 'login', 'inactive'),
      duration: getDuration('error', 'login', 'inactive'),
    });

    setSessionCookie(res, email);

    return res.send({
      login: 'true',
      type: 'success',
      message: getMessage('success', 'login', 'success'),
      duration: getDuration('success', 'login', 'success'),
    });

  } catch (err) {
    return res.send({
      login: 'false',
      type: 'error',
      message: getMessage('error', 'login', 'technical'),
      duration: getDuration('error', 'login', 'technical'),
    });
  }
});

/*
  if (!validUsername) respond with error;
  if (!validPassword) respond with error;
  if (technical glitch) respond with error;
  if (!username exists) {
    Save in DB
    Return success
  }
  if (!password correct) respond with error;
  Return success;
*/

// router.post('/username', async (req, res) => {
//   const username = req.body.username.toLowerCase();
//   const { password } = req.body;
//   const isValidGivenUsername = isValidUsername(username);

//   if (!isValidGivenUsername) return res.send({
//     login: 'false',
//     type: 'error',
//     message: getMessage('error', 'login', 'invalid_username'),
//     duration: getDuration('error', 'login', 'invalid_username'),
//   });

//   if (!password) return res.send({
//     login: 'false',
//     type: 'error',
//     message: getMessage('error', 'login', 'empty_password'),
//     duration: getDuration('error', 'login', 'empty_password'),
//   });

//   try {
//     if (!await isUsernameAlreadyPresentInDb(username)) {
//       if(!await saveUserInDB(username, encrypt(username), true, password)) {
//         return res.send({
//           login: 'false',
//           type: 'error',
//           message: getMessage('error', 'login', 'technical'),
//           duration: getDuration('error', 'login', 'technical'),
//         });
//       }

//       setSessionCookie(res, username);

//       return res.send({
//         login: 'true',
//         type: 'success',
//         message: getMessage('success', 'login', 'success'),
//         duration: getDuration('success', 'login', 'success'),
//       });
//     }

//     const { password: usersPassword } = await getUserDetailsFromDB(username);
//     const isGivenPasswordCorrect = encrypt(password) === usersPassword;
//     if (!isGivenPasswordCorrect) return res.send({
//       login: 'false',
//       type: 'error',
//       message: getMessage('error', 'login', 'password_wrong'),
//       duration: getDuration('error', 'login', 'password_wrong'),
//     });

//     setSessionCookie(res, username);

//     return res.send({
//       login: 'true',
//       type: 'success',
//       message: getMessage('success', 'login', 'success'),
//       duration: getDuration('success', 'login', 'success'),
//     });

//   } catch (err) {
//     return res.send({
//       login: 'false',
//       type: 'error',
//       message: getMessage('error', 'login', 'technical'),
//       duration: getDuration('error', 'login', 'technical'),
//     });
//   }

// });

export default router;

const getActivationMailParams = to => ({
  from: `"${name}" <${email}>`,
  to,
  subject: 'iPWA activation',
  text: `Here is the activation link: ${url}/activate/?token=${encrypt(to)}.`,
});
