const express = require('express');
const level = '../../';
const path_ctr_admin = '../../controllers/sys';
const router = express.Router();
const SETTINGS = require(`${level}SETTINGS.js`);

///////////////////////////////////////////////////////
//                                                   //
//            Satellite for Super API                //
//                                                   //
///////////////////////////////////////////////////////

//  Safe - Is this our satellite?
const isSuper = (req, res, next) => {
    console.log(req.headers.authorization);
    // http://localhost
    if (SETTINGS.SUPER_SERVER_URL == req.url) {
        console.log('88888888');
    }
    next();
    // if (req.user && (req.user.role == 'satellite')) next()
    // else res.json({ ok: false, msg: 'Not logged or not Satellite' });
};

router.get('/app-settings', isSuper, require(`${path_ctr_admin}/app-settings/get-app-settings.js`));

router.post('/main-admin-changing', isSuper, require(`${path_ctr_admin}/main-admin/edit-main-admin.js`));


// hotels
// router.post('/hotels', isSatellite, require(`${path_ctr_admin}/hotels/add-hotels`));
// router.get('/hotels', isSatellite, require(`${path_ctr_admin}/hotels/get-hotels`));
// router.put('/hotels', isSatellite, require(`${path_ctr_admin}/hotels/edit-hotels`));
// router.delete('/hotels/:_id', isSatellite, require(`${path_ctr_admin}/hotels/del-hotels`));

export default router;

