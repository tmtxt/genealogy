# build frontend files
FROM node:8.10.0 as frontend
WORKDIR /usr/src/app
# install dependencies
COPY client/package.json .
COPY client/yarn.lock .
RUN yarn install
# build the src file
COPY client/src ./src
COPY client/public ./public
RUN yarn build

# build the backend server
FROM node:8.10.0
WORKDIR /usr/src/app
# copy the built frontend files
COPY --from=frontend /usr/src/app/build ./static
