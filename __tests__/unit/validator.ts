import { Validator } from "../../src/services/validator";
import { Board } from "../../src/types";

describe('validation test', () => {

    test('if moveset is valid, should return true', () => {
        const validData: Board.Moveset = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        }
        const val = new Validator();
        const isValid = val.validate(validData);
        expect(isValid.valid).toBe(true)
    });

    test('if moveset is invalid ie snake and fruit do not coincide, validate should return false', () => {
        const invalidData = {
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 0, velY: 0 },
                { velX: 0, velY: 1 },
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatSnakeFinishesAtFruit'](invalidData.snake, invalidData.fruit, invalidData.ticks)
        expect(isValid).toBe(false);
    });

    test('should not allow abrupt reverse direction in horizontal direction', () => {
        const invalidData = {
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: -1, velY: 0 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatThereIsNoAbruptChangeInDirection'](invalidData.snake, invalidData.ticks)
        expect(isValid).toBeFalsy();
    });

    test('should not allow abrupt reverse direction in vertical direction', () => {
        const invalidData = {
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 0, velY: 1 },
                { velX: 0, velY: -1 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatThereIsNoAbruptChangeInDirection'](invalidData.snake, invalidData.ticks);
        expect(isValid).toBeFalsy();
    });
    test('should not allow to cross horizontal board borders -0', () => {
        const invalidData = {
            width: 250,
            height: 250,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: -1, velY: 0 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatSnakeIsWithinBoundaries'](invalidData.snake, invalidData.ticks, invalidData.width, invalidData.height)
        expect(isValid).toBeFalsy();
    });

    test('should not allow to cross horizontal board borders +width', () => {
        const invalidData = {
            width: 250,
            height: 250,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 250,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 1, velY: 0 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatSnakeIsWithinBoundaries'](invalidData.snake, invalidData.ticks, invalidData.width, invalidData.height)
        expect(isValid).toBeFalsy();
    });

    test('should not allow to cross vertical board borders -0', () => {
        const invalidData = {
            width: 250,
            height: 250,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 0,
                y: 0,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: -0, velY: -1 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatSnakeIsWithinBoundaries'](invalidData.snake, invalidData.ticks, invalidData.width, invalidData.height)
        expect(isValid).toBeFalsy();
    });

    test('should not allow to cross vertical board borders +width', () => {
        const invalidData = {
            gameId: 'testId',
            width: 250,
            height: 250,
            score: 0,
            fruit: {
                x: 5,
                y: 10
            },
            snake: {
                x: 250,
                y: 250,
                velX: 1,
                velY: 0
            },
            ticks: [
                { velX: 0, velY: 1 },
            ]
        };
        const val = new Validator();
        const isValid = val['checkThatSnakeIsWithinBoundaries'](invalidData.snake, invalidData.ticks, invalidData.width, invalidData.height)
        expect(isValid).toBeFalsy();
    });

    test('velX values should be -1, 0 or 1', () => {
        const ticks = [
            { velX: -1, velY: 0 },
            { velX: 0, velY: 0 },
            { velX: 1, velY: 0 },
            { velX: 2, velY: 0 },
        ]
        const val = new Validator();
        const isValid = val['stepSizeIsValid'](ticks);
        expect(isValid).toBeFalsy();
    });

    test('velY values should be -1, 0 or 1', () => {
        const ticks = [
            { velX: 0, velY: -1 },
            { velX: 0, velY: 0 },
            { velX: 0, velY: 1 },
            { velX: 0, velY: 2 },
        ]
        const val = new Validator();
        const isValid = val['stepSizeIsValid'](ticks);
        expect(isValid).toBeFalsy();
    });


})