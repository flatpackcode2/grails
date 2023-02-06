import Joi from 'joi';
import { Board } from '../types';

export const generateRandomPosition = (length: number) => {
    return Math.floor(Math.random() * length)
}

export const mapError = (type: string, key: string, value?: string) => {
    switch (type) {
        case `string.pattern.base`:
            return `Invalid value of ${value} provided for ${key}. Please make sure it is a non-zero positive number`
        case `any.required`:
            return `Missing value ${key}`;
        case `object.unknown`:
            return `Unknown parameter ${key} provided`;
        default:
            return `Invalid value provided for ${key}`;
    }
}

export const generateErrorObject = (errorArray: {
    type: string,
    context?: Joi.Context
}[]) => {
    const errorObject = errorArray.reduce((a, c) => {
        if (c.context && c.context.key) {
            const { value, key } = c.context;
            a[key] = mapError(c.type, key, value);
        }
        return a;
    }, {})

    return errorObject;
}

export const getLastTick = (ticks: Board.VelocityVector[]) => {
    return ticks.slice(ticks.length - 1)[0];
}