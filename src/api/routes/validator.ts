import { Router } from 'express';
import { Game } from '../../models';
import { getLastTick } from '../../helpers';
import { Validator } from '../../services/validator';
import _ from 'lodash';
import { ERROR_CODE_TO_HTTP_STATUS } from '../../constants';

const validatorRouter = Router();

validatorRouter.all('/', async (req, res) => {

    try {
        if (req.method !== 'POST') {
            res.set('Allow', 'POST')
            res.status(405).send('Method not allowed');
            return
        }

        const validationService = new Validator();
        const body = req.body;
        const id: string = _.get(body, 'gameId');
        const game = await Game.findOne({ where: { id } })
        if (!game) {
            res.status(400).json({ message: 'Invalid game id' })
            return;
        }

        const moveSet = {
            width: game.width,
            height: game.height,
            fruit: game.fruit,
            snake: game.snake,
            ticks: body.ticks,
        }

        const isValid = validationService.validate(moveSet);

        if (isValid.valid) {
            const response = validationService.incrementScore(game, getLastTick(req.body));
            res.status(200).json(response);

        } else if (isValid.error) {
            res.status(ERROR_CODE_TO_HTTP_STATUS[isValid.error.code]).json({
                error: isValid.error.message
            })
        }
        return;

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = validatorRouter;