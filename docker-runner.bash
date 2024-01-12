#!/bin/bash

cd app
if [[ $1 == "client" ]]; then
  npm i
  npm run build
  npm run preview
elif [[ $1 == "server" ]]; then
  npm i
  npm start
fi
