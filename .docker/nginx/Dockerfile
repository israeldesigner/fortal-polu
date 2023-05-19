#FROM nginx:1.15.0-alpine
FROM nginx:1.23.2-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY .docker/nginx/timeout.conf /etc/nginx/conf.d/
COPY .docker/nginx/default.conf /etc/nginx/conf.d/

COPY .docker/nginx/fortalezacapacita.crt /etc/ssl/
COPY .docker/nginx/fortalezacapacita.key /etc/ssl/

COPY /public/ /usr/share/nginx/html/
