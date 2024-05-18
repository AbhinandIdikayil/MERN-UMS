ARG NODE_VER=20.9.0

FROM node:${NODE_VER}-alpine

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm","start" ]