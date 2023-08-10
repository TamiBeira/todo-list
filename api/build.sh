#!/usr/bin/env bash
# exit on error
set -o errexit

# Instala as dependências do projeto
yarn install
yarn build

# Caso queira rodar as migrations durante o processo de construção
npx sequelize-cli db:migrate