export declare namespace Board {

    interface State {
        gameId: String;
        width: number;
        height: number;
        score: number;
        fruit: Fruit;
        snake: Snake;
    }

    interface VelocityVector {
        velX: number;
        velY: number;
    }

    interface Moveset extends State {
        ticks: VelocityVector[]
    }

    interface Coordinates {
        x: number;
        y: number;
    }

    interface Fruit extends Coordinates { }


    interface Snake extends Coordinates, VelocityVector { }
}
