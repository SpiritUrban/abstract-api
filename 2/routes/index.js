import { log, } from '../../../high-level/index.js';
import express from 'express';
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    api: 'Abstract-API'
  });
});

async function mediator(req, res, next) {
  log('M: ', this)
  res.json({ m: 5 });

};
import { RegisterController } from '../controllers/auth.js';

router.post('/register', mediator.bind(RegisterController));


router.post('/register', async (req, res) => {

  const ctrl = new RegisterController();
  const DTO = await ctrl.go(req, res);
  log('DTO')
  res.json(DTO);

});



export default router;
