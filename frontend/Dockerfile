FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY ./ .
RUN yarn build

FROM nginx AS production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf