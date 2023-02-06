import { Game } from "../models"
import { generateRandomPosition } from "../helpers";
import { Board as BoardType } from "../types";
export class Board {

    private game: Game;

    constructor() {
        this.game = new Game();
    }

    public create = async (args: {
        w: number;
        h: number;
    }) => {
        const { w, h } = args;
        const defaultSnakeStart = { x: 0, y: 0, velX: 1, velY: 0 }
        const game = await Game.create({
            width: w,
            height: h,
            fruit: this.generateNewFruitPosition({ w, h, snake: defaultSnakeStart }),
            snake: defaultSnakeStart
        })
        return game;
    }

    public generateNewFruitPosition = (args: {
        w: number;
        h: number;
        snake: BoardType.Snake;
    }) => {

        const { w, h, snake } = args;

        let x = snake.x;
        let y = snake.y;

        while (x === snake.x && y === snake.y) {
            x = generateRandomPosition(w);
            y = generateRandomPosition(h)
        }

        return { x, y }

    }

}