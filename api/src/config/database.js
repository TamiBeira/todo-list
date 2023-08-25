import 'dotenv/config';

const useSSL = process.env.NODE_ENV === 'production';
module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true
  },
  dialectOptions: {
    ssl: useSSL ? {
      require: true,
      rejectUnauthorized: false
    } : null
  }
};

