#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build --base https://arkecosystem.github.io/explorer/

# navigate into the build output directory
cd dist

# add files
git init
git add -A
git commit -m 'chore: explorer [ci skip]'

# deploy
git push -f git@github.com:ArkEcosystem/explorer.git master:gh-pages

cd -