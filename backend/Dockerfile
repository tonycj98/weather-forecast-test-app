FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY ./ .
RUN yarn build

FROM node:18-alpine AS production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app
EXPOSE 3000
CMD ["node", "bundle.js"]