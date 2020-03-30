require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import ProfileRouter from './app/routes/profile.routes';

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', e => console.log(e));
db.on('open', () => console.log('connected to database'));

const app = express();

app.use(bodyParser.json());

app.use('/api', ProfileRouter);

const port = process.env.API_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
