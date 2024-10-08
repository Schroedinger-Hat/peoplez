#!/bin/sh
cp .env.docker .env
exec "$@"
