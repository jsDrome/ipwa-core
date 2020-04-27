import express from 'express';
import querystring from 'querystring';
import axios from 'axios';

import config from '../../../config';

const {
  urls: {
    linkedin: {
      accessTokenUrl,
      apiUrl,
    },
  },
  secrets: {
    linkedin: {
      clientId,
      clientSecret,
    },
  },
} = config;

import {
  getLinkedinLoginUrl,
  getLinkedInRedirectUrl,
  setSessionCookie,
  getAppRedirectUrlParams,
} from '../../server.utils';

const router = express.Router();

router.get('/', (req, res) => {
  const { originalUrl = '/' } = req.query;
  const url = getLinkedinLoginUrl(originalUrl);
  res.redirect(url);
});

router.get('/process', async (req, res) => {
  const { code, originalUrl = '/' } = req.query;
  try {
    if (!code) throw new Error();
    const accessToken = await fetchAccessToken(code, originalUrl);
    const email = await fetchEmail(accessToken);
    // if (!await isEmailAlreadyPresentInDb(email)) await saveUserInDB(email, encrypt(email));
    setSessionCookie(res, email);
    return res.redirect(originalUrl + getAppRedirectUrlParams('linkedin', 'login_success', 'success'));
  } catch (err) {
    return res.redirect(originalUrl + getAppRedirectUrlParams('linkedin', 'access_token', 'error'));
  }
});

const fetchAccessToken = async (code, originalUrl) => {
  // eslint-disable-next-line camelcase
  const { data: { access_token: accessToken } } = await axios.post(accessTokenUrl, querystring.stringify({
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": getLinkedInRedirectUrl(originalUrl),
    "client_id": clientId,
    "client_secret": clientSecret,
  }));
  return accessToken;
};

const fetchEmail = async accessToken => {
  const data = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // eslint-disable-next-line no-magic-numbers
  return data.data.elements[0]['handle~'].emailAddress.toLowerCase();
};

export default router;
