import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === "production") {
  module.exports = {
    dialect: process.env.DB_P,
    host: process.env.DB_HOST_P,
    username: process.env.DB_USER_P,
    password: process.env.DB_PASS_P,
    database: process.env.DB_NAME_P,
    define: {
      timestamps: false,
      underscored: true,
      underscoredAll: true
    }
  };
} else {
  module.exports = {
    dialect: process.env.DB,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
      timestamps: false,
      underscored: true,
      underscoredAll: true
    }
  };
}
