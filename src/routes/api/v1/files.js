const express = require('express');
const router = express.Router();
const path_ctr_files = '../../../controllers/files';
 
// upload file
router.post('/upload', require(`${path_ctr_files}/upload-3`));

// get files
router.post('/get-files', require(`${path_ctr_files}/get-files`));

// del file
router.post('/del-file', require(`${path_ctr_files}/del-file`));

// del user files
router.post('/del-user-files', require(`${path_ctr_files}/del-user-files`));

// del file
router.post('/del-any-files', require(`${path_ctr_files}/del-any-files`));

export default router;

