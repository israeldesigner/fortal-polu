FROM node:18.16.0

WORKDIR /src/app

COPY package*.json ./

RUN npm ci --omit=dev

RUN npm i pm2 -g

COPY .env ./

COPY pm2.json ./

COPY route.js ./

COPY server.js ./

COPY src /src/app/src

COPY uploads /src/app/uploads

COPY dist /src/app/dist

EXPOSE 3000

CMD ["pm2-runtime","start", "pm2.json"]
