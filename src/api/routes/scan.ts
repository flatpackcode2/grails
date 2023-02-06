import { Router } from 'express';
import Joi from 'joi';

const scanRouter = Router();

const newGameSchema = Joi.object({
    w: Joi.string().pattern(new RegExp(`^[1-9][0-9]*$`)).required(),
    h: Joi.string().pattern(new RegExp(`^[1-9][0-9]*$`)).required(),
})

scanRouter.all('/', async (req, res) => {
})

export default scanRouter;