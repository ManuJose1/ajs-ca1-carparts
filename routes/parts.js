const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpoad');

const { 
    readAll, 
    readOne,
    createData,
    updateData,
    deleteData
} = require('../controllers/part.controller');

const { loginRequired } = require('../controllers/user.controller');


router.get('/', readAll);
router.get('/:id', readOne);
// router.post('/', imageUpload.single('image'), createData);
// router.put('/:id', imageUpload.single('image'), updateData);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;