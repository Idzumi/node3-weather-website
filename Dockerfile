FROM node:14.19.0-alpine
RUN apk add --no-cache git
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3902
CMD [ "npm", "run-script", "start" ]
