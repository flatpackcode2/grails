export const dbConfig = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "password",
    DB: "local_db",
    dialect: "postgres",
    logging: console.log,
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};