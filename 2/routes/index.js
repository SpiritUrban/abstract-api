import { log, } from '../../../high-level/index.js';
import express from 'express';
var router = express.Router();
import { RegisterController } from '../controllers/auth.js';

async function mediator(req, res, next) {
  const DTO = await this.go(req, res);
  res.json(DTO);
};

router.get('/', function (req, res, next) {
  res.json({
    api: 'Abstract-API'
  });
});

[
  { path: '/register', method: 'post', controller: RegisterController }
].forEach(
  // it is like - router.post('/register', mediator.bind(new RegisterController()));
  item => router[item.method](item.path, mediator.bind(new item.controller()))
);

export default router;
