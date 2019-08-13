#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

# add files
git init
git add -A
git commit -m 'chore: explorer'

# deploy
git push -f git@github.com:ArkEcosystem/arkecosystem.github.io.git master

cd -