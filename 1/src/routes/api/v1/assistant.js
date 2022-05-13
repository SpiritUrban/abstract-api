const express = require('express');
const router = express.Router();
const path_ctr_admin = '../../../controllers/assistant';

///////////////////////////////////////////////////////
//                      Feron                        //
///////////////////////////////////////////////////////

// assistant
router.get('/exchange', require(`${path_ctr_admin}/assistant/get-exchange`)); // /api/assistant/exchange
router.get('/audio-message', require(`${path_ctr_admin}/assistant/audio-message`)); // ?url=xxxx&room=xxxx

router.get('/user-data', require(`${path_ctr_admin}/assistant/user-data`)); // ?url=xxxx&room=xxxx

export default router;
