# jsDrome configurations

This project uses `dotenv` and `rc` for setting configurables.

1. Set these values in `./.env/.env`

```
config_secrets__linkedin__clientId
config_secrets__linkedin__clientSecret
config_secrets__github__clientId
config_secrets__github__clientSecret
config_secrets_jsdrome_encryptKey
config_props__gtmId
```

2. Set these values in `./.env/env.sh`

```shell
export IMAGE_NAME
export CODECOV_TOKEN
export HEROKU_APP_NAME
export HEROKU_API_KEY
export CYPRESS_TOKEN
export CYPRESS_PROJECT_ID
export PERCY_TOKEN
```

3. Create the following Github secrets

```
config_props__url
IMAGE_NAME
CODECOV_TOKEN
HEROKU_APP_NAME
HEROKU_API_KEY
CYPRESS_TOKEN
CYPRESS_PROJECT_ID
PERCY_TOKEN
```

4. Override values in Heroku by setting config vars

## Run app locally

```shell
npm run dev
npm run nodemon
```

## Run app as docker container

```shell
npm run build:docker
```

## Unit tests

```shell
npm run test
```

## Cypress tests

```shell
npm run test:cypress:open
```

## Puppeteer tests

```shell
npm run test:puppeteer
```
