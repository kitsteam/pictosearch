ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.21
ARG PNPM_VERSION=10.33.4

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS install
WORKDIR /app

# --- build deps for node-gyp & canvas on Alpine ---
RUN apk add --no-cache \
  python3 \
  build-base \
  pkgconfig \
  cairo-dev pango-dev pixman-dev \
  libjpeg-turbo-dev giflib-dev librsvg-dev

# make sure node-gyp sees python
ENV PYTHON=/usr/bin/python3

ENV PATH=/app/node_modules/.bin:$PATH

# https://pnpm.io/installation#using-corepack
ARG PNPM_VERSION
RUN corepack enable \
 && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy manifests + lockfile first for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

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

RUN pnpm run build:app

FROM nginxinc/nginx-unprivileged:stable-alpine3.19-slim AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
