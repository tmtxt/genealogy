#!/usr/bin/env sh

# $1 is the version
docker build -t tmtxt/genealogy:$1 .
docker tag tmtxt/genealogy:$1 tmtxt/genealogy:latest
