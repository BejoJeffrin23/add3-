FROM node:16-alpine3.16

# Working directory be app
WORKDIR app

COPY package*.json ./

# ###  Installing dependencies

RUN npm install

# # copy local files to app folder
COPY src src
COPY public public
COPY tailwind.config.js .
COPY .env .

EXPOSE 3000

CMD ["npm","start"]

