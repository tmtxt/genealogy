########################################
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

########################################
# build the backend dependencies
FROM node:8.10.0 as backend
WORKDIR /usr/src/app
COPY server/package.json .
COPY server/yarn.lock .
RUN yarn install

########################################
# build the app
FROM node:8.10.0
WORKDIR /usr/src/app

# copy the backend dependencies
COPY --from=backend /usr/src/app/node_modules ./node_modules

# copy backend server files
COPY server/ ./

# copy the built frontend files
COPY --from=frontend /usr/src/app/build ./static

CMD ["npm", "start"]
EXPOSE 80
