FROM arm64v8/node:16-alpine
WORKDIR /code

COPY ./tsconfig.json ./tsconfig.json
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./src ./src

RUN yarn --frozen-lockfile
RUN yarn build

FROM arm64v8/node:16-alpine
WORKDIR /code

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn --frozen-lockfile --production

FROM arm64v8/node:16-alpine
WORKDIR /code

ARG TWITTER_API_KEY
ENV TWITTER_API_KEY=$TWITTER_API_KEY
ARG TWITTER_API_SECRET
ENV TWITTER_API_SECRET=$TWITTER_API_SECRET
ARG TWITTER_ACCESS_TOKEN
ENV TWITTER_ACCESS_TOKEN=$TWITTER_ACCESS_TOKEN
ARG TWITTER_ACCESS_TOKEN_SECRET
ENV TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET

COPY --from=0 /code/dist /code
COPY --from=1 /code/node_modules /code/node_modules

CMD ["node", "-r", "./bootstrap.js", "./crons"]
