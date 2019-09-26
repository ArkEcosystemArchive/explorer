#!/usr/bin/env sh

# abort on errors
set -e

# build
export RELEASE_TYPE="gh-pages"
yarn build

# navigate into the build output directory
cd dist

# identify who pushed
git config --global user.name "${GITHUB_ACTOR}"
git config --global user.email "${GITHUB_ACTOR}@users.noreply.github.com"

# add files
git init
git add -A
git commit -m 'deploy [ci skip]'

# deploy
git push -f https://${GH_PAGES_TOKEN}@github.com/ArkEcosystem/explorer.git master:gh-pages
