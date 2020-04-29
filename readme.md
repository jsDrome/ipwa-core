![Build](https://github.com/jsDrome/jsDrome/workflows/Build/badge.svg?branch=master)

# jsDrome

## How this works

Usually, when a product grows, it becomes inevitable that there are 2 apps - for web and for native. You will then need a web frontend team, native frontend team, a design team, a backend team, a devops team and QA. This repository aims to automate and abstract most of those things so that you can focus on only one thing - create stuff.

iPWA's purpose is to spin up a new project with everything setup. All you need to do is configure it and everything else is magic.

## How we use it

When code is merged to master, we perform the following:

 - `Sanity Check` - Builing, linting, unit tests
 - `Staging in Heroku` - Build a docker image and deploy it in Heroku
 - `Regression tests` - Run unit tests, Cypress tests, Puppeteer tests and Percy tests.
 - `Release docker image` - Deploy the docker image to Dockerhub or GCR.
 - `Release Firebase` - Deploy the isomorphic progressive web app to Firebase.
 - `Expo publish` - Deploy the native app as OTA update.

## Install

Install ipwa globally

```shell
npm i -g @jsdrome/ipwa
```

Create a new ipwa app

```shell
ipwa my-app install
```
This will create a new project called my-app in the current directory and install npm dependencies.


## Set these runtime env vars in `./.env/env.sh`.

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

## Set these build time env vars in `./.env/env.sh` and in Github secrets

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

## Change defaults in `.configrc` as necessary.


# Development

## Run app locally

```shell
npm run dev
npm run nodemon
```

## Run app as docker container

Make appropriate changes to `./infra/docker/docker-compose.yml` and `./infra/docker/Dockerfile`.

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

<h2 align="center">Core Team</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/sreeramofficial.png?s=150">
        <br>
        <a href="https://github.com/sreeramofficial">Sreeram Padmanabhan</a>
        <p>Founder of ipwa</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/revathynattamai.png?s=150">
        <br>
        <a href="https://github.com/revathynattamai">Revathy Nattamai Gopinath</a>
        <p>Developer, Tester</p>
      </td>
     </tr>
  </tbody>
</table>

⭐️ Star us on GitHub — it helps!
