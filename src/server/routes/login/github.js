import express from 'express';
import querystring from 'querystring';
import axios from 'axios';

import config from '../../../config';

const {
  urls: {
    github: {
      accessTokenUrl,
      apiUrl,
    },
  },
  secrets: {
    github: {
      clientId,
      clientSecret,
    },
  },
} = config;

import {
  getGithubLoginUrl,
  getGithubRedirectUrl,
  setSessionCookie,
  getAppRedirectUrlParams,
  getCurrentTimeStamp,
} from '../../server.utils';

const router = express.Router();

router.get('/', (req, res) => {
  const { originalUrl = '/' } = req.query;
  const url = getGithubLoginUrl(originalUrl);
  res.redirect(url);
});

router.get('/process', async (req, res) => {
  const { code, originalUrl = '/' } = req.query;
  try {
    const accessToken = await fetchAccessToken(code, originalUrl)
    const email = await fetchEmail(accessToken);
    // if (!await isEmailAlreadyPresentInDb(email)) await saveUserInDB(email, encrypt(email));
    setSessionCookie(res, email);
    return res.redirect(originalUrl + getAppRedirectUrlParams('github', 'login_success', 'success'));
  } catch (err) {
    return res.redirect(originalUrl + getAppRedirectUrlParams('github', 'data', 'error'));
  }
});

const fetchAccessToken = async (code, originalUrl) => {
  const { data } = await axios.post(accessTokenUrl, querystring.stringify({
    "code": code,
    "redirect_uri": getGithubRedirectUrl(originalUrl),
    "client_id": clientId,
    "client_secret": clientSecret,
    "state": getCurrentTimeStamp(),
  }));
  // eslint-disable-next-line no-magic-numbers
  return data.split('&')[0].split('=')[1];
};

const fetchEmail = async accessToken => {
  const { data: { email } } = await axios.get(apiUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return email.toLowerCase();
};

export default router;
