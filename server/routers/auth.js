const config = require('../config');
const logger = require('log4js').getLogger('routers/auth');

const bcrypt = require('bcrypt-as-promised');
const _ = require('lodash');
const moment = require('moment');
const utilities = require('../lib/utilities');
const redis = require('promise-redis')();

const redisClient = redis.createClient(_.extend(config.redis, {
  retry_strategy: utilities.redis_retry_strategy,
}));

const express = require('express');

const router = express.Router();

const user = {
  username: 'Jim',
  password: 'myson',
  portrait: 'https://avatars2.githubusercontent.com/u/1813586',
};

// curl -X POST http://localhost:3000/auth/login  -H "Content-Type: application/json" -d '{"username": "zhaolei", "password": "it is a good day"}'
router.post('/login', async(req, res, next) => {
  if (req.$userInfo) {
    const user = req.$userInfo;
    user.token = req.$token;
    return res.json({
      success: true,
      user,
    });
  }

  const { username, password } = req.body;
  const token = new Buffer(await bcrypt.hash(username + moment().unix(), config.saltRounds)).toString('base64');
  user.token = token;
  await redisClient.setex(token, 60 * 60 * 24, JSON.stringify(user));

  res.json({
    success: true,
    user,
  });
});

router.get('/logout', async(req, res, next) => {
  await redisClient.del(req.$token);
  res.json({
    success: true,
  });
});

router.get('/userinfo', async(req, res, next) => {
  const username = req.$userInfo.username;
  const user = { username };
  logger.debug('user', user);
  res.json(user);
});

router.post('/register', async(req, res, next) => {
  const { username, email, password } = req.body;
  const token = new Buffer(await bcrypt.hash(username + moment().unix(), config.saltRounds)).toString('base64');
  user.token = token;
  await redisClient.setex(token, 60 * 60 * 24, JSON.stringify(user));

  res.json({
    success: true,
    user,
  });
});

module.exports = router;
