FROM node:16-bullseye-slim
WORKDIR /app
COPY . .
RUN apt-get update \
    && apt-get -y install wait-for-it python3-minimal git \
    && rm -rf /var/lib/apt/lists/* \
    && yarn install \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --prod \
    && yarn cache clean
