import { DataTypes, Model } from "sequelize";
import { Board } from "../types";
import { sequelizeConnection } from './config';

export interface GameAttr {
    id: string;
    width: number;
    height: number;
    score: number;
    fruit: Board.Fruit;
    snake: Board.Snake;
}

export interface GameCreateAttr {
    width: number;
    height: number;
    fruit: Board.Fruit;
    snake: Board.Snake;
}
export class Game extends Model<GameAttr, GameCreateAttr> {
    declare id?: string;
    declare width: number;
    declare height: number;
    declare score: number;
    declare fruit: Board.Fruit;
    declare snake: Board.Snake;
}

Game.init({
    id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fruit: {
        type: DataTypes.JSONB,
    },
    snake: {
        type: DataTypes.JSONB,
    },
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    freezeTableName: true,
    tableName: 'game'
});