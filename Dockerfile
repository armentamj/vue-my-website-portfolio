# Build stage
FROM node:24-slim AS buildenv

WORKDIR /generator

ENV projectName="vue_my_website_portfolio"

RUN npm install -g npm@latest
RUN npm install -g npm@11.6.2

COPY ./ .

RUN npm i
RUN npm run build


FROM alpine:latest

ARG PB_VERSION=0.36.2

RUN apk add --no-cache \
    unzip \
    ca-certificates
RUN update-ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
RUN rm /tmp/pb.zip

RUN mkdir /pb/pb_public
COPY --from=buildenv /generator/dist /pb/pb_public

RUN mkdir /pb/pb_migrations
COPY ./pocketbase/pb_migrations /pb/pb_migrations

RUN mkdir /pb/pb_hooks
COPY ./pocketbase/pb_hooks /pb/pb_hooks

COPY entrypoint.sh /pb/
RUN chmod +x /pb/entrypoint.sh

EXPOSE 8090

# start PocketBase
ENTRYPOINT ["/pb/entrypoint.sh"]