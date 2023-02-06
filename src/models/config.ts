import { Sequelize, Dialect } from "sequelize";
import { dbConfig } from "../config/db.config";

export const sequelizeConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    port: dbConfig.port,
    pool: {
        ...dbConfig.pool
    },
    define: {
        freezeTableName: true
    }

});