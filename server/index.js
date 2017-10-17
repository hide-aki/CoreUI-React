const config = require('./config');
const logger = require('log4js').getLogger('app');
logger.level = 'debug';

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

const utilities = require('./lib/utilities');
const _ = require('lodash');
const redis = require('promise-redis')();

const redisClient = redis.createClient(_.extend(config.redis, {
  retry_strategy: utilities.redis_retry_strategy,
}));

// uncomment after placing your favicon in /public
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
  next();
});

// logger
app.use((req, res, next) => {
  logger.info('\n----------- New Request ---------\n%s: %s\nquery: %s\nbody: %s\n--------------------------------- ', req.method, req.originalUrl, JSON.stringify(req.query), JSON.stringify(req.body));
  next();
});

// authorization
app.use(async(req, res, next) => {
  logger.debug('authorization:', req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.substring('Bearer '.length).trim();

    req.$token = token;
    req.$userInfo = JSON.parse(await redisClient.get(token));
    logger.debug('userInfo:', token, req.$userInfo);
  }
  next();
});

// load router
fs.readdirSync(path.join(__dirname, 'routers')).forEach((file) => {
  if (file.endsWith('.js')) {
    const name = file.split('.')[0];
    let p = '/';
    if (name !== 'index') {
      p = `/${name}`;
    }
    app.use(p, require(`./routers/${name}`)); // name
  }
});

app.use(express.static(path.join(__dirname, 'public')));
server.listen(config.port);
