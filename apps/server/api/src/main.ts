require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as Keycloak from 'keycloak-connect';
import * as session from 'express-session';

import ProfileRouter from './app/routes/profile.routes';

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true
});

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak(
  {
    store: memoryStore
  },
  {
    realm: process.env.KEYCLOAK_REALM,
    'auth-server-url': process.env.AUTH_SERVER_URL,
    resource: process.env.RESOURCE,
    'bearer-only': false,
    'ssl-required': process.env.SSL_REQUIRED,
    'confidential-port': process.env.CONFIDENTIAL_PORT
  }
);

const db = mongoose.connection;
db.on('error', e => console.log(e));
db.on('open', () => console.log('connected to database'));

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

app.use(keycloak.middleware());

app.use(bodyParser.json());

function grabUserId(req, res, next) {
  let userId = null;
  try {
    userId = req.kauth.grant.access_token.content.sub;
  } catch (e) {
    console.error('something went wrong here.');
  }
  res.userId = userId;
  next();
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/api', ProfileRouter);

app.get('/test', [keycloak.protect('realm:user'), grabUserId], (req, res) => {
  res.json({ userId: res.userId });
});

const port = process.env.API_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
