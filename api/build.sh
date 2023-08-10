// build.sh
#!/usr/bin/env bash
# exit on error
# yarn sequelize migration:create --name=create-users
set -o errexit

yarn
yarn build
yarn sequelize db:migrate
