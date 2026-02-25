#!/usr/bin/env bash

echo "Loading .env explicitly..."
export $(grep -v '^#' .env | xargs)   # this exports every KEY=VALUE line

echo "OPENWEATHER_API_KEY is now:" ${OPENWEATHER_API_KEY:0:4}...

echo "Starting PocketBase..."
./pocketbase/pocketbase serve --http=0.0.0.0:8090