FROM node:18

WORKDIR /src/app

COPY package*.json ./

COPY pm2.json ./

COPY server.js ./

COPY .env ./

COPY dist /src/app/dist

RUN npm i pm2 -g

RUN npm install

EXPOSE 5000

CMD ["pm2-runtime","npm run production", "pm2.json"]
