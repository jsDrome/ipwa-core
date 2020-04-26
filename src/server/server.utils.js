import md5 from 'md5';
import get from 'lodash/get';

import config from './config';

const {
  alerts,
  urls: {
    linkedin: {
      authUrl : linkedinAuthUrl,
    },
    github: {
      authUrl: githubAuthUrl,
    },
  },
  secrets: {
    linkedin: {
      clientId: linkedinClientId,
    },
    github: {
      clientId: githubClientId,
    },
    jsdrome: {
      encryptKey,
    },
  },
  props: {
    url,
  },
} = config;

export const isUserLoggedIn = cookies => !!cookies.__session;

export const getEmailFromCookies = cookies => get(cookies, '__session.email');

export const getLinkedinLoginUrl = originalUrl => {
  let _linkedinAuthUrl = linkedinAuthUrl.replace('<redirectUrl>', getLinkedInRedirectUrl(originalUrl));
  _linkedinAuthUrl = _linkedinAuthUrl.replace('<clientId>', linkedinClientId);
  return _linkedinAuthUrl;
};

export const getLinkedInRedirectUrl = originalUrl => {
  // eslint-disable-next-line no-undef
  return `${url}/login/linkedin/process?originalUrl=${originalUrl}`;
};

export const getAppRedirectUrlParams = (provider, type, errorType) => `?message=${encodeURIComponent(getMessage(provider, type))}&type=${errorType}&duration=${getDuration(provider, type)}`;

export const setSessionCookie = (res, email) => res.cookie('__session', JSON.stringify({
  accessToken: encrypt(email),
  email,
}), getCookieSettings());

export const getGithubLoginUrl = originalUrl => {
  let _githubAuthUrl = githubAuthUrl.replace('<redirectUrl>', getGithubRedirectUrl(originalUrl));
  _githubAuthUrl = _githubAuthUrl.replace('<clientId>', githubClientId);
  _githubAuthUrl = _githubAuthUrl.replace('<state>', getCurrentTimeStamp());
  return _githubAuthUrl;
};

export const getGithubRedirectUrl = originalUrl => {
  // eslint-disable-next-line no-undef
  return `${url}/login/github/process?originalUrl=${originalUrl}`;
};

/*=============*/

export const getMessage = (provider, type) => alerts[provider][type].message;

export const getDuration = (provider, type) => alerts[provider][type].duration;

export const encrypt = val => md5(val + encryptKey);

export const getCookieSettings = () => ({
  // eslint-disable-next-line no-magic-numbers
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  // eslint-disable-next-line no-undef
  ...BUILD_NODE_ENV === 'production' && { secure: true, sameSite: 'None' },
});

export const getCurrentTimeStamp = () => new Date().getTime();

// export const getRedirectUrlForError = (provider, type) => getFinalRedirectUrl('error', provider, type);

// export const getRedirectUrlForInfo = (provider, type) => getFinalRedirectUrl('info', provider, type);
