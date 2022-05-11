const express = require('express');
const router = express.Router();
const path_ctr_admin = '../../../controllers/admin';
const { u, as, sas, mas } = require('./lib/guards');

///////////////////////////////////////////////////////
//                      Feron                        //
///////////////////////////////////////////////////////

// hotels
router.post('/hotels', sas, require(`${path_ctr_admin}/hotels/add-hotels`));
// router.get('/hotels', require(`${path_ctr_admin}/hotels/get-hotels`));
router.get(['/hotels', '/hotels/:_id'], require(`${path_ctr_admin}/hotels/get-hotels`));
router.delete('/hotels/:_id', sas, require(`${path_ctr_admin}/hotels/del-hotels`));
router.put('/hotels', sas, require(`${path_ctr_admin}/hotels/edit-hotels`));
// rooms
router.post('/rooms', as, require(`${path_ctr_admin}/rooms/add-rooms`));
router.get(['/rooms', '/rooms/:flow'], as, require(`${path_ctr_admin}/rooms/get-rooms`));
router.delete('/rooms/:_id', as, require(`${path_ctr_admin}/rooms/del-rooms`));
router.put('/rooms', as, require(`${path_ctr_admin}/rooms/edit-rooms`));
// visitors
router.post('/visitors', as, require(`${path_ctr_admin}/visitors/add-visitors`));
router.get(['/visitors', '/visitors/:_id'], as, require(`${path_ctr_admin}/visitors/get-visitors`));
router.delete('/visitors/:_id', as, require(`${path_ctr_admin}/visitors/del-visitors`));
router.put('/visitors', as, require(`${path_ctr_admin}/visitors/edit-visitors`));
// administrators
router.post('/administrators', as, require(`${path_ctr_admin}/administrators/add-administrators`));
router.get('/administrators', as, require(`${path_ctr_admin}/administrators/get-administrators`));
router.delete('/administrators/:_id', as, require(`${path_ctr_admin}/administrators/del-administrators`));
router.put('/administrators', as, require(`${path_ctr_admin}/administrators/edit-administrators`));
// languages
router.post('/languages', as, require(`${path_ctr_admin}/languages/add-languages`));
router.get(['/languages', '/languages/:code'], as, require(`${path_ctr_admin}/languages/get-languages`));
router.delete('/languages/:_id', as, require(`${path_ctr_admin}/languages/del-languages`));
router.put('/languages', as, require(`${path_ctr_admin}/languages/edit-languages`));
// advertising
router.post('/advertising', as, require(`${path_ctr_admin}/advertising/add-advertising`));
router.get(['/advertising', '/advertising/:_id'], as, require(`${path_ctr_admin}/advertising/get-advertising`));
router.delete('/advertising/:_id', as, require(`${path_ctr_admin}/advertising/del-advertising`));
router.put('/advertising/:_id', as, require(`${path_ctr_admin}/advertising/edit-advertising`));
// advertising / track
router.delete('/advertising/tracks/:_id', as, require(`${path_ctr_admin}/advertising/tracks/del-advertising-track`));
// alarm
router.post('/alarm', as, require(`${path_ctr_admin}/alarm/add-alarm`));
router.get(['/alarm', '/alarm/:_id'], as, require(`${path_ctr_admin}/alarm/get-alarm`));
router.delete('/alarm/:_id', as, require(`${path_ctr_admin}/alarm/del-alarm`));
router.put('/alarm/:_id', as, require(`${path_ctr_admin}/alarm/edit-alarm`));
// alarm / track
router.delete('/alarm/tracks/:_id', as, require(`${path_ctr_admin}/alarm/tracks/del-alarm-track`));

// broadcast
router.post('/broadcast/for-all', as, require(`${path_ctr_admin}/broadcast/for-all`));
// map
router.post('/map-save', as, require(`${path_ctr_admin}/map/save-map`));
router.get('/map-get-info', as, require(`${path_ctr_admin}/map/get-map-info`));
// app
router.post('/app-save', as, require(`${path_ctr_admin}/app/save-app`));
router.get('/app-get-info', as, require(`${path_ctr_admin}/app/get-app-info`));
router.get('/app-get-info-safe', require(`${path_ctr_admin}/app/get-app-info-safe`));
// testing
router.post('/drop-collection', as, require(`${path_ctr_admin}/testing/drop-collection`));
// metrics
router.get('/metrics', as, require(`${path_ctr_admin}/metrics/get-metrics`));


///////////////////////////////////////////////////////
//                    admin-msgs                     //
///////////////////////////////////////////////////////
// router.get('/admin-msgs', as, require(`${path_ctr_admin}/get-admin-msgs`));
// router.post('/admin-msg', as, require(`${path_ctr_admin}/post-admin-msg`));
// router.delete('/admin-msg/:_id', as, require(`${path_ctr_admin}/del-admin-msg`));

///////////////////////////////////////////////////////
//                        app                        //
///////////////////////////////////////////////////////
// // app_status
// router.get('/app-status', as, require(`${path_ctr_admin}/app-status`));
// // APP SETTINGS
// router.get('/app-settings-get', as, require(`${path_ctr_admin}/app-settings-get`));
// // add fee
// router.post('/app-settings-fee-add', as, require(`${path_ctr_admin}/app-settings-fee-add`));
// // del fee
// router.post('/app-settings-fee-del', as, require(`${path_ctr_admin}/app-settings-fee-del`));
// // change fee
// router.post('/app-settings-fee-change', as, require(`${path_ctr_admin}/app-settings-fee-change`));

///////////////////////////////////////////////////////
//                       users                       //
///////////////////////////////////////////////////////
// get-all-users
// router.post('/get-all-users', as, require(`${path_ctr_admin}/get-all-users`));
// // del-user
// router.post('/del-user/:idx', as, require(`${path_ctr_admin}/del-user`));

export default router;
