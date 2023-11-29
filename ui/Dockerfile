# Build
FROM node:18.13.0-alpine as build

WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build:dev

FROM nginx:latest as ngi

COPY --from=build /dist/src/app/dist/web /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
