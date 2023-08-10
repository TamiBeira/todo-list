#!/bin/bash

# Instala as dependências do projeto
yarn install

# Caso queira rodar as migrations durante o processo de construção
npx sequelize-cli db:migrate
