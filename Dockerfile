FROM node:8.15

WORKDIR /usr/src/app

COPY . .

RUN npm install \
    && npm run-script build \
    && mv .deploy/config.docker.json ./config.json


CMD [ "npm", "start" ]