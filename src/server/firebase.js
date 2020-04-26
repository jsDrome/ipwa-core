import firebase from 'firebase-admin';
import { runWith } from 'firebase-functions';

import config from './config';
import server from './server';

const {
  firebase: {
    authDomain,
    databaseURL,
    storageBucket,
  },
} = config;

const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: BUILD_SECRETS_FIREBASE_APIKEY,
  authDomain,
  databaseURL,
  storageBucket,
};

firebase.initializeApp(firebaseConfig);

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '2GB',
};

export const myExpressApp = runWith(runtimeOpts).https.onRequest(server);
