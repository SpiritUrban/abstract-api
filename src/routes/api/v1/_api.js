const express = require('express');
const router = express.Router();
const path_ctr_api = '../../../controllers/_api';
const { u, as, sas, mas } = require('./lib/guards');

///////////////////////////////////////////////////////
//                      Feron                        //
///////////////////////////////////////////////////////

// msgs
router.post('/msgs', u, require(`${path_ctr_api}/msgs/add-msgs`));
router.get(['/msgs', '/msgs/:flow'], u, require(`${path_ctr_api}/msgs/get-msgs`));
router.delete('/msgs/:_id', u, require(`${path_ctr_api}/msgs/del-msgs`));
router.put(['/msgs', '/msgs/:_id'], u, require(`${path_ctr_api}/msgs/edit-msgs`));

// translate
// router.get('/languages', as, require(`${path_ctr_api}/translate/get-languages`)); /// ???
router.post('/translate/action/translate', as, require(`${path_ctr_api}/translate/actions/translate`)); // ???
router.post('/translate/procedure/translate-lang-in-phrase', as, require(`${path_ctr_api}/translate/procedures/translate-lang-in-phrase`));
router.post('/translate/procedure/translate-lang-in-advertising', as, require(`${path_ctr_api}/translate/procedures/translate-lang-in-advertising`));
router.post('/translate/procedure/translate-lang-in-alarm', as, require(`${path_ctr_api}/translate/procedures/translate-lang-in-alarm`));

//speech
router.post('/speech/procedure/text-to-sound-file', as, require(`${path_ctr_api}/speech/procedures/text-to-sound-file`)); // ???

// tasks
router.post('/tasks', as, require(`${path_ctr_api}/tasks/add-tasks`));
router.get(['/tasks', '/tasks/:flow'], as, require(`${path_ctr_api}/tasks/get-tasks`));
router.delete('/tasks/:_id', as, require(`${path_ctr_api}/tasks/del-tasks`));
router.put(['/tasks', '/tasks/:_id'], as, require(`${path_ctr_api}/tasks/edit-tasks`));

// phrases
router.post('/phrases', u, require(`${path_ctr_api}/phrases/add-phrases`));
router.get(['/phrases', '/phrases/:phrase'], u, require(`${path_ctr_api}/phrases/get-phrases`));
router.delete('/phrases/:_id', u, require(`${path_ctr_api}/phrases/del-phrases`));
router.put('/phrases/:_id', u, require(`${path_ctr_api}/phrases/edit-phrases`));
// phrases / track
router.delete('/phrases/tracks/:_id', u, require(`${path_ctr_api}/phrases/tracks/del-phrases-trrack`));

// Get User Data
// router.post('/get-user-data', require(`${path_ctr_api}/get-user-data`));

// ui
// router.post('/msgs', u, require(`${path_ctr_api}/msgs/add-msgs`));
router.get(['/ui', '/ui/:uiContext'], u, require(`${path_ctr_api}/ui/get-ui`));
// router.delete('/msgs/:_id', u, require(`${path_ctr_api}/msgs/del-msgs`));
// router.put(['/msgs', '/msgs/:_id'], u, require(`${path_ctr_api}/msgs/edit-msgs`));
router.post('/ui/procedure/make-translation', u, require(`${path_ctr_api}/ui/procedures/make-translation`));

export default router;
