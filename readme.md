![Build](https://github.com/jsDrome/jsDrome/workflows/Build/badge.svg?branch=master)

# jsDrome

## 1. Set these runtime env vars in `.env`.

```shell
config_secrets__linkedin__clientId
config_secrets__linkedin__clientSecret
config_secrets__github__clientId
config_secrets__github__clientSecret
const config_secrets__sendInBlue__user
const config_secrets__sendInBlue__pass
config_secrets_jsdrome_encryptKey
config_props__gtmId
```

## 2. Set these build time env vars in `.env` and in Github secrets

```
CODECOV_TOKEN
IMAGE_NAME
HEROKU_APP_NAME
HEROKU_API_KEY
CYPRESS_TOKEN
CYPRESS_PROJECT_ID
PERCY_TOKEN
FIREBASE_APP_NAME
FIREBASE_TOKEN
config_props__url
```

## 3. Change defaults in `.configrc` as necessary.

# Development

## Run app locally

```shell
npm run dev
npm run nodemon
```

## Run app as docker container

```shell
npm run build:docker
```

## Run unit tests

```shell
npm run test
```

## Run cypress tests

```shell
npm run test:cypress
```

## Run puppeteer tests

```shell
npm run test:puppeteer
```
