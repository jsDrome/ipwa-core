import express from 'express';

import { getAppRedirectUrlParams } from '../server.utils';

const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie("__session");
  return res.redirect('/' + getAppRedirectUrlParams('general', 'logout', 'success'));
});

export default router;
