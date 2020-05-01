import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider as ReduxProvider } from 'react-redux';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import config from '../../config';
import App from '../../client/web/App/App';
import Home from '../../client/web/Home/Home';
import Auth from '../../client/web/Auth/Auth';
import theme from '../../client/web/theme';
import store from '../../store/store';

import { isUserLoggedIn, getEmailFromCookies } from '../server.utils';

const { props: { gtmId } } = config;

const router = express.Router();

router.get('/', (req, res) => {
  const sheets = new ServerStyleSheets();
  const _isUserLoggedIn = isUserLoggedIn(req.cookies);
  const _user = getEmailFromCookies(req.cookies);
  const app = ReactDOMServer.renderToString(
    sheets.collect(
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <App>
            {_isUserLoggedIn ? <Auth /> : <Home />}
          </App>
        </ThemeProvider>
      </ReduxProvider>
    )
  );

  const css = sheets.toString();
  const helmet = Helmet.renderStatic();
  return res.send(template(helmet, app, css, _isUserLoggedIn, _user));
});

const template = (helmet, html, css, isUserLoggedIn, user) => `
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.style.toString()}
      ${helmet.script.toString()}
      <style id="jss-server-side">${css}</style>
    </head>
    <script>
      window._ipwa = {
        isUserLoggedIn: ${isUserLoggedIn},
        user: '${user}',
        gtmId: '${gtmId}',
      };
    </script>
    <body>
      <div id="root">${html}</div>
      <script type="text/javascript" src="/app.bundle.js"></script>
      <script type="text/javascript" src="/npm.bundle.js"></script>
    </body>
  </html>
`;

export default router;
