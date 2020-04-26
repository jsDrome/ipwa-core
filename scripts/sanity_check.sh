set -e
npm run clean
npm run lint
npm run test
npm run build:client:prod
npm run build:server:prod
