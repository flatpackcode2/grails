import express from "express";
import logger from 'morgan';

const app = express();
const port = 1337;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})

module.exports = app;