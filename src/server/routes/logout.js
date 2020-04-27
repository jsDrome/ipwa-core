import express from 'express';

import { getAppRedirectUrlParams, sessionKey } from '../server.utils';

const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie(sessionKey);
  return res.redirect('/' + getAppRedirectUrlParams('general', 'logout', 'success'));
});

export default router;
