FROM node:14-alpine as install
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

FROM install AS build
COPY . ./

ENV INLINE_RUNTIME_CHUNK=false
ENV REACT_APP_API /arasaac/api
ENV REACT_APP_API_IMAGES /arasaac/images

RUN yarn build:app

FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]