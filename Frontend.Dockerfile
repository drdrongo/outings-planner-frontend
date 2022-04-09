FROM node:12.18.3

WORKDIR /outing-planner

COPY package.json /outing-planner/package.json
COPY build /outing-planner/build

# RUN yarn install --production
# RUN yarn install

EXPOSE 3001

CMD ["yarn", "start"]

# FROM node:latest AS build
# WORKDIR /build

# COPY package.json package.json
# COPY yarn.lock yarn.lock
# # RUN yarn install

# COPY public/ public
# COPY src/ src
# # RUN yarn run build

# FROM httpd:alpine
# WORKDIR /var/www/html
# COPY --from=build /build/build/ .


# EXPOSE 3001

# CMD ["yarn", "start"]
