#!/usr/bin/env sh

# $1 is the version
docker push tmtxt/genealogy:$1
docker push tmtxt/genealogy:latest
