FROM node:8
RUN mkdir -p /opt/app
WORKDIR /opt/app

# ARG config_login__linkedin__clientId
# ARG config_login__linkedin__clientSecret
# ARG config_login__github__clientId
# ARG config_login__github__clientSecret
ARG config_props__gtmId

# ARG config_login__linkedin__clientId=$config_login__linkedin__clientId
# ARG config_login__linkedin__clientSecret=$config_login__linkedin__clientSecret
# ARG config_login__github__clientId=$config_login__github__clientId
# ARG config_login__github__clientSecret=$config_login__github__clientSecret
ENV config_props__gtmId=$config_props__gtmId

ADD assets /opt/app/assets
ADD src /opt/app/src
ADD .configrc /opt/app/.configrc
ADD babel.config.js /opt/app/babel.config.js
ADD package.json /opt/app/package.json
ADD package-lock.json /opt/app/package-lock.json

RUN npm ci
RUN npm run build:client:prod
RUN npm run build:server:prod

RUN rm -r src assets node_modules
RUN rm babel.config.js

CMD [ "npm", "start" ]
