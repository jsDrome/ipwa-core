set -e
npm run build:client:prod
npm run build:server:firebase
node ./scripts/package-copier.js
# npm i --prefix dist
npx firebase use $FIREBASE_APP_NAME
npx firebase deploy --token $FIREBASE_TOKEN
npm run clean
