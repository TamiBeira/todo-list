import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === "production") {
  module.exports = {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
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
