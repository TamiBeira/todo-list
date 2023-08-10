// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn sequelize-cli db:migrate