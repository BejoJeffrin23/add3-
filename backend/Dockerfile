FROM node:16-alpine3.16

# Working directory be app
WORKDIR app

COPY package*.json ./

# ###  Installing dependencies

RUN npm install

# # copy local files to app folder
COPY controller controller
COPY routes routes
COPY index.js index.js

EXPOSE 3001

CMD ["npm","start"]