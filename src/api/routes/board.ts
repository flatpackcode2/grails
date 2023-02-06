import { Router } from 'express';
import { Board } from '../../services/board';
import Joi from 'joi';
import { generateErrorObject } from '../../helpers';

const boardRouter = Router();

const newGameSchema = Joi.object({
    w: Joi.string().pattern(new RegExp(`^[1-9][0-9]*$`)).required(),
    h: Joi.string().pattern(new RegExp(`^[1-9][0-9]*$`)).required(),
})

boardRouter.all('/', async (req, res) => {
    if (req.method !== 'GET') {
        res.set('Allow', 'GET')
        res.status(405).send('Method not allowed');
        return
    }
    try {
        const data = req.query;
        const result = newGameSchema.validate(data, { abortEarly: false });
        if (result.error) {
            const error = generateErrorObject(result.error.details)
            res.status(400).json({ error })
        }
        if (!result.error) {
            const { w, h } = data;
            if (typeof w === 'string' && typeof h === 'string') {
                const board = new Board()
                const game = await board.create({ w: parseInt(w), h: parseInt(h) });
                res.status(200).json({ game: game.toJSON() });
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong.' })
    }
})

module.exports = boardRouter;