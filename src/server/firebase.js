import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import server from './';
// import config from '../config';

// const {
//   firebase: {
//     apiKey,
//     authDomain,
//     databaseURL,
//     storageBucket,
//   },
// } = config;

// const firebaseConfig = {
//   apiKey,
//   authDomain,
//   databaseURL,
//   storageBucket,
// };

admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 60,
  // memory: '2GB',
};

export const myExpressApp = functions.runWith(runtimeOpts).https.onRequest(server);
