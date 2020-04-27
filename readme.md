# jsDrome

## Runtime config

### Local

1. Change defaults in `.configrc` as necessary.

2. Set these values in `./.env/env.sh`.

```shell
export config_secrets__linkedin__clientId
export config_secrets__linkedin__clientSecret
export config_secrets__github__clientId
export config_secrets__github__clientSecret
export const config_secrets__sendInBlue__user
export const config_secrets__sendInBlue__pass
export config_props__gtmId
```

3. Also make appropriate changes to `./infra/docker/docker-compose.yml` and `./infra/docker/Dockerfile`. (This is required only if you are using docker for local development)

### Staging

Override runtime variables in Heroku by setting config vars.

### Production

Override runtime variables in Firebase by setting environment variables.

## Build-time config

1. Create the following Github secrets.

```
IMAGE_NAME
CODECOV_TOKEN
HEROKU_APP_NAME
HEROKU_API_KEY
CYPRESS_TOKEN
CYPRESS_PROJECT_ID
PERCY_TOKEN
config_props__url
```

## Run app locally

```shell
npm run dev
npm run nodemon
```

## Run app as docker container

Set `IMAGE_NAME` environment variable

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
