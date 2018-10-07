# genealogy

Docker Repo https://hub.docker.com/r/tmtxt/genealogy/

# Dev

## server

Setup

```
$ cd server
$ yarn install
```

Run dev server

```
$ cd server
$ yarn dev-server
```

## client

Setup

```
$ cd client
$ yarn install
```

Run dev server

```
$ cd client
$ yarn start
```

# Build

Use the `build.sh` script and `push.sh` script to build and push the docker image

```
$ ./build.sh $VERSION
$ ./push.sh $VERSION
```

# Deploy

Run docker image `neo4j:3.4.7`
Run docker image `tmtxt/genealogy:latest` with these env
- `BACKEND_PORT`: web server port
- `ENSURE_DATA_ENABLED`: whether to ensure data the app, required for first time
- `LOG_LEVEL`: default to `info`
- `NEO4J_SERVER`: neo4j server address
- `NEO4J_PORT`: neo4j bolt port
- `NEO4J_USER`: default to `neo4j`
- `NEO4J_PASSWORD`: empty for no authentication
