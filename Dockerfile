FROM node:12-stretch-slim AS base
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . ./
