# jsDrome configurations

## Basic configurations

`.configrc`

## Sanity checks

`./.github/workflows/build-master.yml`

  - `CODECOV_TOKEN`

## Heroku staging

`./.github/workflows/build-master.yml`

  - `IMAGE_NAME`
  - `HEROKU_APP_NAME`
  - `HEROKU_API_KEY`

## Regression tests

 `./.github/workflows/build-master.yml`

  - `CYPRESS_TOKEN`
  - `CYPRESS_PROJECT_ID`
  - `PERCY_TOKEN`


## Run app locally

```shell
npm run dev
npm run nodemon
```

## Run app as docker container

Set the following environment variables.
  - `IMAGE_NAME`

```shell
npm run build:docker
```

## Unit tests

```shell
npm run test
```

## Run Codecov

Set the following environment variables.
  - `CODECOV_TOKEN`

```shell
npm run test:codecov
```

## Run Cypress tests

Set the following environment variables.
  - `CYPRESS_PROJECT_ID`
  - `CYPRESS_TOKEN`

```shell
npm run test:cypress:open
```

## Run Percy

Set the following environment variables.
  - `PERCY_TOKEN`

```shell
npm run test:percy
```

## Run Puppeteer

```shell
npm run test:puppeteer
```

## Deploy on Heroku

Set the following environment variables.

  - `HEROKU_APP_NAME`
  - `HEROKU_API_KEY`

```shell
npm run release:heroku
