import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV;
module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};
