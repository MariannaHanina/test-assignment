#!/usr/bin/env sh

# abort on errors
set -env

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:MariannaHanina/test-assignment.git main:gh-pages

cd -