FROM node:24.0.2-alpine AS install
WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./

# https://yarnpkg.com/corepack
RUN corepack enable
RUN yarn install --frozen-lockfile

FROM install AS development
ENV INLINE_RUNTIME_CHUNK=false

FROM install AS build
COPY src src
COPY public public
COPY config config
COPY tsconfig.json ./
COPY index.html ./
COPY vite.config.js ./
COPY LICENSE ./
# only links to public websites
COPY .env ./
COPY arasaac-pictogram-viewer.php ./

ENV INLINE_RUNTIME_CHUNK=false
ENV REACT_APP_API=/arasaac/api
ENV REACT_APP_API_IMAGES=/arasaac/images

RUN yarn build:app

FROM nginxinc/nginx-unprivileged:stable-alpine3.19-slim AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
