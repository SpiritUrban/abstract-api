const express = require('express');
const router = express.Router();
const path_ctr_admin = '../../controllers/super-api';

///////////////////////////////////////////////////////
//                                                   //
//                 Feron Super API                   //
//                                                   //
///////////////////////////////////////////////////////

//  Safe - Is this our satellite?
const isSatellite = (req, res, next) => {
    console.log(req.headers.authorization);
    next();
    // if (req.user && (req.user.role == 'satellite')) next()
    // else res.json({ ok: false, msg: 'Not logged or not Satellite' });
};

// router.get('/test', isSatellite, require(`${path_ctr_admin}/test/test`));
// router.get('/map', isSatellite, require(`${path_ctr_admin}/map-free/get-map`));

// hotels
router.post('/hotels', isSatellite, require(`${path_ctr_admin}/hotels/add-hotels`));
router.get('/hotels', isSatellite, require(`${path_ctr_admin}/hotels/get-hotels`));
router.put('/hotels', isSatellite, require(`${path_ctr_admin}/hotels/edit-hotels`));
router.delete('/hotels/:_id', isSatellite, require(`${path_ctr_admin}/hotels/del-hotels`));

export default router;

