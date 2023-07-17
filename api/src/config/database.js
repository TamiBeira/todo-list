import 'dotenv/config';


const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "production") {
return {
dialect: "postgres",
url: process.env.DATABASE_URL,
//entities: [entitiesPath],
//migrations: [migrationsPath],
};
}


module.exports = {
    dialect: process.env.DB,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define:{
        timestamps: false,
        underscored: true,
        underscoredAll: true
    }
}