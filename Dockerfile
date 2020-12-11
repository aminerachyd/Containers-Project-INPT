FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install mocha --save-dev

COPY . .

EXPOSE 5000

CMD ["node","index"]