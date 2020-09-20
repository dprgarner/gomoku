FROM node:12-stretch-slim AS base
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . ./


FROM base AS client-build
RUN yarn build-client


FROM base AS server-build
RUN yarn build-server


FROM node:12-stretch-slim AS production
ENV NODE_ENV=production
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn --production
COPY --from=server-build /app/dist_server /app/dist_server
COPY --from=client-build /app/dist_client /app/dist_client
CMD ["node", "/app/dist_server/server.js"]
