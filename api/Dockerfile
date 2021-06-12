# must change to node alpine for tiny size
FROM node:latest

WORKDIR /app
ADD package*.json .
ADD yarn.lock .
RUN yarn add
ADD . .

RUN yarn build
CMD [ "yarn", "start"]