/* eslint-disable camelcase */
import express from 'express';
import linkedin from './linkedin';
import github from './github';
// import jsdrome from './jsdrome';

const router = express.Router();

router.use('/linkedin', linkedin);
router.use('/github', github);
// router.use('/jsdrome', jsdrome);

export default router;
