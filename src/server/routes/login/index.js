/* eslint-disable camelcase */
import express from 'express';
import linkedin from './linkedin';
import github from './github';
// import email from './email';

const router = express.Router();

router.use('/linkedin', linkedin);
router.use('/github', github);
// router.use('/email', email);

export default router;
