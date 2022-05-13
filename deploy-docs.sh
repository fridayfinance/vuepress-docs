#!/usr/bin/env sh
# abort on errors
set -e

cd docs

# build
yarn run build
# navigate into the build output directory
cd src/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:joinairbank/airbank.git master:gh-pages
cd -