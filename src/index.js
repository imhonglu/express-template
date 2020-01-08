/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import middlewares from '~/middlewares';
import routes from '~/routes';
import {
    sequelize,
    associations,
} from '~/models';
import {
    BASE,
    MORGAN,
} from '~/settings';

const app = express();

app.set('trust proxy', true);
app.use(express.json(BASE.jsonOption));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan(MORGAN));

app.use(BASE.path, routes);
app.use(middlewares.responseHandler);
app.use(middlewares.errorHandler);

async function sequelizeSync() {
    await associations();
    await sequelize.sync();
}

async function run() {
    await sequelizeSync();
    await app.listen(BASE.port, '0.0.0.0');
    console.log(`listening on port ${BASE.port}`);
}

run();
